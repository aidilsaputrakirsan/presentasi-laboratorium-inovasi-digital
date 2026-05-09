"""
Repository ITK (EPrints) — Thesis Supervision Scraper
======================================================
Scrape repository.itk.ac.id, kumpulkan kontributor (pembimbing/penguji) per
thesis, lalu attribute ke dosen prodi target via email institusional ATAU
nama lengkap (case-insensitive, full token match).

Strategi:
  1. List semua thesis ID via OAI-PMH set=thesis
  2. Fetch halaman tiap item, ekstrak meta eprints.contributors_*
     (type/name/id) — tangkap SEMUA role (THS/REV/ADP/...) karena repo
     tidak konsisten
  3. Aggregate per dosen target: match by email (priority) atau nama strict

Output:
  - cache/itk_repo_raw.jsonl      : raw extraction per item (resumable)
  - src/data/prodi/{slug}/supervision_data.json : aggregated per dosen

Usage:
  python scripts/repository_itk_scraper.py
  python scripts/repository_itk_scraper.py --aggregate-only
"""

import json
import os
import re
import sys
import time
from datetime import datetime

import requests
from bs4 import BeautifulSoup

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE_DIR = os.path.join(BASE_DIR, 'cache')
PRODI_DIR = os.path.join(BASE_DIR, 'src', 'data', 'prodi')
RAW_FILE = os.path.join(CACHE_DIR, 'itk_repo_raw.jsonl')
ID_LIST_FILE = os.path.join(CACHE_DIR, 'itk_repo_ids.txt')

REPO_BASE = "https://repository.itk.ac.id"
OAI_URL = f"{REPO_BASE}/cgi/oai2"
THESIS_SET = "74797065733D746865736973"

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (compatible; ITK-Repo-Indexer/1.0; akreditasi-tool)',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
}

# Email yang sudah terkonfirmasi dari sample PoC (case-insensitive).
# Dosen tanpa entry akan match by name only.
KNOWN_EMAILS = {
    'Yuyun Tri Wiranti': ['yuyun@lecturer.itk.ac.id'],
    'Aidil Saputra Kirsan': ['aidil@lecturer.itk.ac.id'],
    'Lovinta Happy Atrinawati': ['lovinta@lecturer.itk.ac.id'],
    'Sri Rahayu Natasia': ['natasia.ayu@lecturer.itk.ac.id', 'natasia.ayu@lecturer.it.ac.id'],
    'Nursanti Novi Arisa': ['nursanti.novi@lecturer.itk.ac.id'],
    'Dwi Arief Prambudi': ['dwiariefprambudi@lecturer.itk.ac.id'],
    'I Putu Deny Arthawan Sugih Prabowo': ['putudeny.asp@lecturer.itk.ac.id'],
    'M. Ihsan Alfani Putera': ['ihsanalfani@lecturer.itk.ac.id'],
    'M. Gilvy Langgawan Putra': ['gilvy.langgawan@lecturer.itk.ac.id'],
}


def list_thesis_ids():
    if os.path.exists(ID_LIST_FILE):
        with open(ID_LIST_FILE, 'r', encoding='utf-8') as f:
            ids = [l.strip() for l in f if l.strip()]
        print(f"Reusing cached id list: {len(ids)} thesis IDs")
        return ids

    print("Fetching thesis identifiers via OAI-PMH...")
    ids, token, page = [], None, 0
    while True:
        page += 1
        url = (f"{OAI_URL}?verb=ListIdentifiers&metadataPrefix=oai_dc&set={THESIS_SET}"
               if token is None else
               f"{OAI_URL}?verb=ListIdentifiers&resumptionToken={token}")
        r = requests.get(url, headers=HEADERS, timeout=60, verify=False)
        soup = BeautifulSoup(r.text, 'xml')
        for el in soup.find_all('identifier'):
            m = re.search(r':(\d+)$', el.get_text(strip=True))
            if m:
                ids.append(m.group(1))
        token_el = soup.find('resumptionToken')
        token = token_el.get_text(strip=True) if token_el and token_el.get_text(strip=True) else None
        print(f"  page {page}: total {len(ids)}")
        if not token:
            break
        time.sleep(0.3)

    os.makedirs(CACHE_DIR, exist_ok=True)
    with open(ID_LIST_FILE, 'w', encoding='utf-8') as f:
        f.write('\n'.join(ids))
    return ids


def parse_item(html, eprint_id):
    soup = BeautifulSoup(html, 'html.parser')
    types, names, emails = [], [], []
    creators_names, creators_ids = [], []
    title, year, item_type = '', '', ''
    subjects, divisions = [], []

    for m in soup.find_all('meta'):
        n = m.get('name', ''); c = m.get('content', '')
        if n == 'eprints.title': title = c
        elif n == 'eprints.date':
            ym = re.search(r'(\d{4})', c)
            if ym: year = ym.group(1)
        elif n == 'eprints.type': item_type = c
        elif n == 'eprints.subjects': subjects.append(c)
        elif n == 'eprints.divisions': divisions.append(c)
        elif n == 'eprints.contributors_type': types.append(c)
        elif n == 'eprints.contributors_name': names.append(c)
        elif n == 'eprints.contributors_id': emails.append(c)
        elif n == 'eprints.creators_name': creators_names.append(c)
        elif n == 'eprints.creators_id': creators_ids.append(c)

    n = max(len(types), len(names), len(emails))
    types += [''] * (n - len(types))
    names += [''] * (n - len(names))
    emails += [''] * (n - len(emails))
    contributors = [{
        'roleUrl': types[i],
        'role': types[i].rsplit('/', 1)[-1] if types[i] else '',
        'name': names[i],
        'email': emails[i],
    } for i in range(n)]
    creators_ids += [''] * (len(creators_names) - len(creators_ids))
    students = [{'name': nm, 'id': cid} for nm, cid in zip(creators_names, creators_ids)]

    return {
        'eprintId': eprint_id, 'title': title, 'year': year,
        'type': item_type, 'subjects': subjects, 'divisions': divisions,
        'students': students, 'contributors': contributors,
    }


def scrape_items(ids):
    os.makedirs(CACHE_DIR, exist_ok=True)
    done = set()
    if os.path.exists(RAW_FILE):
        with open(RAW_FILE, 'r', encoding='utf-8') as f:
            for line in f:
                try: done.add(json.loads(line)['eprintId'])
                except: pass
        print(f"Resuming: {len(done)} items already cached")

    todo = [i for i in ids if i not in done]
    print(f"Scraping {len(todo)} items (delay 0.5s, ETA ~{len(todo)*0.5/60:.1f} min)")

    with open(RAW_FILE, 'a', encoding='utf-8') as f:
        for i, eid in enumerate(todo, 1):
            try:
                r = requests.get(f"{REPO_BASE}/{eid}/", headers=HEADERS, timeout=30, verify=False)
                if r.status_code != 200:
                    f.write(json.dumps({'eprintId': eid, 'error': f'HTTP {r.status_code}'}) + '\n')
                else:
                    f.write(json.dumps(parse_item(r.text, eid), ensure_ascii=False) + '\n')
                if i % 100 == 0:
                    f.flush()
                    print(f"  [{i}/{len(todo)}] last={eid}")
            except Exception as e:
                f.write(json.dumps({'eprintId': eid, 'error': str(e)}) + '\n')
            time.sleep(0.5)
    print(f"Cache: {RAW_FILE}")


def normalize_tokens(s):
    s = s.lower()
    s = re.sub(r'\b(prof|dr|m\.?sc|s\.?t|s\.?kom|m\.?kom|m\.?t|s\.?si|m\.?si|ph\.?d|ir|st|mt|ssi|tr\.?kom)\b\.?', '', s)
    s = re.sub(r'[^a-z]+', ' ', s)
    return [t for t in s.split() if len(t) >= 3]


def is_match(contributor, lecturer_name, known_emails):
    """Match if email is in known list (case-insensitive) OR full-name strict match."""
    em = (contributor.get('email') or '').strip().lower()
    if em and known_emails:
        if em in {e.lower() for e in known_emails}:
            return True
    # Strict name match: ALL major tokens of lecturer name (>=3 chars) appear in contributor name
    cn_tokens = set(normalize_tokens(contributor.get('name', '')))
    ln_tokens = set(normalize_tokens(lecturer_name))
    if not ln_tokens or not cn_tokens:
        return False
    # require ALL lecturer tokens present (so "Aidil Saputra Kirsan" requires aidil+saputra+kirsan all match)
    return ln_tokens.issubset(cn_tokens)


def aggregate_for_prodi(slug='sistem-informasi'):
    lect_file = os.path.join(PRODI_DIR, slug, 'lecturers.json')
    with open(lect_file, 'r', encoding='utf-8') as f:
        meta = json.load(f)
    lecturers = meta.get('lecturers', [])

    if not os.path.exists(RAW_FILE):
        print(f"Cache file missing: {RAW_FILE}")
        return

    per_lec = {l['name']: [] for l in lecturers}
    discovered_email_per_lec = {l['name']: {} for l in lecturers}  # email → count
    role_per_lec = {l['name']: {} for l in lecturers}  # role → count

    total_items, items_with_meta = 0, 0
    with open(RAW_FILE, 'r', encoding='utf-8') as f:
        for line in f:
            try: rec = json.loads(line)
            except: continue
            if 'error' in rec: continue
            total_items += 1
            if rec.get('contributors'): items_with_meta += 1

            contribs = rec.get('contributors', [])
            # Position among supervisor-like roles (THS/ADP/UNKNOWN), excluding REV
            sup_idx = 0
            for pos, c in enumerate(contribs):
                role = c.get('role') or 'UNKNOWN'
                is_supervisor_role = role in ('THS', 'ADP', 'UNKNOWN', '')
                slot = None
                if is_supervisor_role:
                    sup_idx += 1
                    slot = 'Pembimbing 1' if sup_idx == 1 else ('Pembimbing 2' if sup_idx == 2 else f'Pembimbing {sup_idx}')
                elif role == 'REV':
                    slot = 'Penguji'
                else:
                    slot = role

                for l in lecturers:
                    known = KNOWN_EMAILS.get(l['name'], [])
                    if is_match(c, l['name'], known):
                        per_lec[l['name']].append({
                            'eprintId': rec['eprintId'],
                            'title': rec['title'],
                            'year': rec['year'],
                            'role': role,
                            'slot': slot,
                            'position': pos,
                            'students': [s['name'] for s in rec.get('students', [])],
                            'matchedAs': c.get('name'),
                            'matchedEmail': c.get('email'),
                            'url': f"{REPO_BASE}/{rec['eprintId']}/",
                        })
                        em = (c.get('email') or '').lower()
                        if em:
                            discovered_email_per_lec[l['name']][em] = \
                                discovered_email_per_lec[l['name']].get(em, 0) + 1
                        role_per_lec[l['name']][slot] = role_per_lec[l['name']].get(slot, 0) + 1
                        break

    out_lecs = []
    for l in lecturers:
        items = per_lec[l['name']]
        # dedupe by eprintId
        seen, unique = set(), []
        for it in items:
            if it['eprintId'] not in seen:
                seen.add(it['eprintId'])
                unique.append(it)
        unique.sort(key=lambda x: (x['year'] or '0', x['title']), reverse=True)
        by_year = {}
        for it in unique:
            y = it['year'] or 'unknown'
            by_year[y] = by_year.get(y, 0) + 1
        out_lecs.append({
            'name': l['name'],
            'pddiktiId': l.get('pddiktiId'),
            'totalSupervised': len(unique),
            'byYear': dict(sorted(by_year.items(), reverse=True)),
            'byRole': role_per_lec[l['name']],
            'discoveredEmails': discovered_email_per_lec[l['name']],
            'theses': unique,
        })

    out = {
        'metadata': {
            'generatedAt': datetime.now().isoformat(),
            'source': 'repository.itk.ac.id (EPrints OAI-PMH + per-item meta)',
            'prodi': meta.get('name', slug),
            'description': 'Bimbingan/peran dosen pada Tugas Akhir mahasiswa di repository ITK',
            'totalRecordsScanned': total_items,
            'itemsWithContributorMeta': items_with_meta,
            'matchingPolicy': 'email-first (KNOWN_EMAILS) + strict full-name token match',
        },
        'lecturers': out_lecs,
    }

    out_path = os.path.join(PRODI_DIR, slug, 'supervision_data.json')
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
    print(f"\nSaved: {out_path}")
    print(f"Total items scanned: {total_items} ({items_with_meta} with contributor meta)")
    print("\nPer dosen:")
    for l in out_lecs:
        em = ','.join(l['discoveredEmails'].keys()) or '-'
        roles = ','.join(f"{k}:{v}" for k, v in sorted(l['byRole'].items(), key=lambda x: -x[1]))
        print(f"  {l['name']:42} {l['totalSupervised']:3d} TA  roles=[{roles}]  emails={em}")


def main():
    if '--aggregate-only' not in sys.argv[1:]:
        ids = list_thesis_ids()
        scrape_items(ids)
    aggregate_for_prodi('sistem-informasi')


if __name__ == "__main__":
    main()
