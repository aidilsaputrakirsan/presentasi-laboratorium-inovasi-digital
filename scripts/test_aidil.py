"""Quick PoC: cari thesis yang dibimbing Aidil Saputra Kirsan.
Sample 300 random items dari id list, parse meta, filter by name match.
"""
import json, os, random, re, sys, time
import requests
from bs4 import BeautifulSoup
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

BASE = "https://repository.itk.ac.id"
THS = "http://www.loc.gov/loc.terms/relators/THS"
HEADERS = {'User-Agent': 'Mozilla/5.0 ITK-PoC'}

with open('cache/itk_repo_ids.txt') as f:
    ids = [l.strip() for l in f if l.strip()]

random.seed(42)
sample = random.sample(ids, 300)
print(f"Sampling 300/{len(ids)} thesis items for Aidil Kirsan...")

target_tokens = {'aidil', 'kirsan', 'saputra'}
matches = []
ths_count = 0
rev_count = 0
no_meta = 0

for i, eid in enumerate(sample, 1):
    try:
        r = requests.get(f"{BASE}/{eid}/", headers=HEADERS, timeout=20, verify=False)
        if r.status_code != 200: continue
        soup = BeautifulSoup(r.text, 'html.parser')
        types, names, emails = [], [], []
        title = ''
        year = ''
        for m in soup.find_all('meta'):
            n = m.get('name', '')
            c = m.get('content', '')
            if n == 'eprints.contributors_type': types.append(c)
            elif n == 'eprints.contributors_name': names.append(c)
            elif n == 'eprints.contributors_id': emails.append(c)
            elif n == 'eprints.title': title = c
            elif n == 'eprints.date':
                ym = re.search(r'(\d{4})', c)
                if ym: year = ym.group(1)
        if not types: no_meta += 1; continue
        for j, t in enumerate(types):
            if t == THS: ths_count += 1
            elif 'REV' in t: rev_count += 1
            nm = names[j] if j < len(names) else ''
            em = emails[j] if j < len(emails) else ''
            tokens = set(re.findall(r'[a-z]+', nm.lower()))
            if target_tokens & tokens:
                matches.append({
                    'eprintId': eid, 'title': title, 'year': year,
                    'role': t.rsplit('/', 1)[-1],
                    'supervisorName': nm, 'supervisorEmail': em
                })
    except Exception as e:
        pass
    time.sleep(0.3)
    if i % 50 == 0:
        print(f"  {i}/300 — THS={ths_count} REV={rev_count} no-meta={no_meta} matches-aidil={len(matches)}")

print(f"\n=== HASIL ===")
print(f"Items tanpa contributor metadata: {no_meta}/300 ({no_meta*100//300}%)")
print(f"Total THS entries: {ths_count}")
print(f"Total REV entries: {rev_count}")
print(f"Aidil Kirsan ditemukan di {len(matches)} item:")
for m in matches:
    print(f"  [{m['eprintId']}] {m['year']} — {m['role']} — {m['supervisorName']} ({m['supervisorEmail']})")
    print(f"      {m['title'][:90]}")
