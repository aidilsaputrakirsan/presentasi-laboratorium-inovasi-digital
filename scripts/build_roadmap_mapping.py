# -*- coding: utf-8 -*-
"""
Build pemetaan judul penelitian prodi -> roadmap (FSTI dan/atau ITK)
====================================================================
Bukti dokumen untuk butir AMI: "Apakah program studi memiliki pemetaan judul
penelitian terhadap roadmap penelitian jurusan / ITK?"

Definisi kategori dan aturan kata kunci tiap acuan ada di scripts/roadmap_refs.py
agar terkumpul di satu tempat dan dapat diaudit/direvisi koorpro.

Usage:
  python scripts/build_roadmap_mapping.py                       # semua prodi, semua acuan
  python scripts/build_roadmap_mapping.py sistem-informasi      # 1 prodi, semua acuan
  python scripts/build_roadmap_mapping.py sistem-informasi ITK  # 1 prodi, 1 acuan

Output:
  src/data/prodi/{slug}/roadmap_mapping.json       (acuan FSTI)
  src/data/prodi/{slug}/roadmap_mapping_itk.json   (acuan ITK)
"""

import io
import json
import os
import sys
from datetime import datetime

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from roadmap_refs import REFERENCES

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRODI_DIR = os.path.join(BASE_DIR, 'src', 'data', 'prodi')


def classify(title, rules):
    """Kembalikan (kategori_utama, [kategori_pendukung], skor, bukti_kata_kunci).

    `evidence` mencatat kata kunci mana pada judul yang memicu tiap kategori,
    sehingga setiap keputusan pemetaan dapat ditelusuri dan dibantah oleh
    auditor AMI (bukan sekadar angka skor).
    """
    up = title.upper()
    scores = {}
    evidence = {}
    for code, weight, keywords in rules:
        for kw in keywords:
            if kw in up:
                scores[code] = scores.get(code, 0) + weight
                evidence.setdefault(code, []).append({'keyword': kw, 'weight': weight})
    if not scores:
        return None, [], {}, {}
    ranked = sorted(scores.items(), key=lambda kv: (-kv[1], kv[0]))
    primary = ranked[0][0]
    supporting = [c for c, s in ranked[1:] if s >= 2]
    return primary, supporting, scores, evidence


def reason_text(primary, evidence, categories):
    """Kalimat alasan siap tampil di web / lembar AMI."""
    if not primary:
        return ('Judul tidak memuat satu pun kata kunci dari kategori manapun. '
                'Penelitian ini tergolong riset dasar (keilmuan murni) yang berada '
                'di luar bidang fokus roadmap yang bersifat terapan.')
    kws = [e['keyword'] for e in evidence.get(primary, [])]
    cat = categories[primary]
    return 'Judul memuat kata kunci %s yang merupakan penanda kategori %s (%s). Acuan: %s.' % (
        ', '.join('"%s"' % k for k in kws), primary, cat['name'], cat['source'])


def load_roster(slug):
    """Nama dosen yang terdaftar resmi pada prodi (lecturers.json)."""
    path = os.path.join(PRODI_DIR, slug, 'lecturers.json')
    if not os.path.exists(path):
        return set(), ''
    cfg = json.load(io.open(path, encoding='utf-8'))
    return set(l['name'] for l in cfg.get('lecturers', [])), cfg.get('code', '')


def collect_unique_research(data, roster, prodi_code):
    """Dedup judul: satu penelitian bisa muncul di beberapa dosen (ketua+anggota)."""
    unique = {}
    for lec in data['lecturers']:
        for r in lec.get('research', []):
            key = r['title'].strip().upper()
            if key not in unique:
                unique[key] = {
                    'title': r['title'].strip(),
                    'year': r.get('year'),
                    'leader': r.get('leader'),
                    'grantType': r.get('grantType'),
                    'grantCategory': r.get('grantCategory'),
                    'fundingAmount': r.get('fundingAmount', 0),
                    'lecturers': [],
                }
            unique[key]['lecturers'].append(lec['name'])

    for rec in unique.values():
        # Dasar kepemilikan judul oleh prodi: ketua dan/atau anggota ada di roster.
        #
        # Judul dijaring dari profil SINTA dosen prodi, sehingga judul yang
        # ketuanya dosen prodi lain tetap sah dihitung selama ada dosen prodi
        # sebagai anggota - dan itu wajib terlihat agar tidak dianggap klaim.
        members = sorted(set(rec['lecturers']))
        rec['siMembers'] = members
        rec['leaderIsInternal'] = rec['leader'] in roster
        rec['prodiCode'] = prodi_code
        if rec['leaderIsInternal']:
            rec['affiliationBasis'] = (
                'Ketua peneliti adalah dosen program studi %s.' % prodi_code)
        else:
            rec['affiliationBasis'] = (
                'Ketua peneliti berasal dari program studi lain. Program studi %s '
                'terlibat melalui anggota peneliti berikut: %s.'
                % (prodi_code, ', '.join(members)))
    return unique


def build(slug, ref):
    path = os.path.join(PRODI_DIR, slug, 'sinta_data.json')
    if not os.path.exists(path):
        print('  [skip] %s: sinta_data.json tidak ada' % slug)
        return
    data = json.load(io.open(path, encoding='utf-8'))
    roster, prodi_code = load_roster(slug)
    categories = ref['categories']

    unique = collect_unique_research(data, roster, prodi_code)

    items, unmapped = [], []
    counts = dict((c, 0) for c in categories)
    for rec in unique.values():
        rec = dict(rec)
        primary, supporting, scores, evidence = classify(rec['title'], ref['rules'])
        rec['pillar'] = primary
        rec['supportingPillars'] = supporting
        rec['matchScore'] = scores
        rec['evidence'] = evidence
        rec['reason'] = reason_text(primary, evidence, categories)
        if primary:
            counts[primary] += 1
        else:
            unmapped.append(rec['title'])
        items.append(rec)

    items.sort(key=lambda x: (x['pillar'] or 'ZZ', -int(x['year'] or 0)))

    # Rekap per level di atas kategori (tema / pusat penelitian), bila ada
    per_theme, per_center = {}, {}
    for code, cat in categories.items():
        if cat.get('theme'):
            per_theme[cat['theme']] = per_theme.get(cat['theme'], 0) + counts[code]
        if cat.get('center'):
            per_center[cat['center']] = per_center.get(cat['center'], 0) + counts[code]

    out = {
        'metadata': {
            'generatedAt': datetime.now().isoformat(),
            'prodi': data['metadata'].get('prodi', slug),
            'source': 'sinta_data.json',
            'sourceGeneratedAt': data['metadata'].get('generatedAt'),
            'referenceKey': ref['key'],
            'referenceLabel': ref['label'],
            'reference': ref['reference'],
            'referenceDoc': ref['referenceDoc'],
            'referenceScope': ref['scope'],
            'categoryLabel': ref['categoryLabel'],
            'keywordBasis': ref['keywordBasis'],
            'ownershipRule': ('Judul penelitian diambil dari profil SINTA seluruh dosen yang '
                              'tercatat pada daftar dosen resmi program studi. Sebuah judul '
                              'dihitung sebagai luaran program studi apabila ketua ATAU minimal '
                              'satu anggota peneliti adalah dosen program studi; peran tersebut '
                              'dicantumkan pada setiap judul.'),
            'method': ('Setiap judul dicocokkan dengan daftar kata kunci penanda milik tiap '
                       'kategori roadmap. Kata kunci yang lebih khas diberi bobot lebih tinggi '
                       '(skala 1 sampai 3). Kategori dengan nilai tertinggi ditetapkan sebagai '
                       'kategori utama, sedangkan kategori lain yang nilainya minimal 2 dicatat '
                       'sebagai kategori pendukung. Kata kunci yang menjadi pemicu ditampilkan '
                       'pada setiap judul sehingga hasilnya dapat diperiksa ulang dan dikoreksi.'),
            'description': 'Pemetaan judul penelitian prodi terhadap %s' % ref['reference'],
        },
        'pillars': categories,
        'summary': {
            'totalUniqueResearch': len(items),
            'mapped': len(items) - len(unmapped),
            'unmapped': len(unmapped),
            'perPillar': counts,
            'perTheme': per_theme,
            'perCenter': per_center,
            'coveragePercent': round((len(items) - len(unmapped)) / len(items) * 100, 1) if items else 0,
        },
        'items': items,
    }

    dest = os.path.join(PRODI_DIR, slug, ref['outputFile'])
    with io.open(dest, 'w', encoding='utf-8') as f:
        json.dump(out, f, ensure_ascii=False, indent=2)

    print('  [%s] %s: %d judul unik, %d terpetakan (%s%%)' % (
        ref['key'], slug, len(items), out['summary']['mapped'],
        out['summary']['coveragePercent']))
    for c in sorted(categories):
        if counts[c]:
            print('    %-8s %-55s: %d' % (c, categories[c]['name'][:55], counts[c]))
    if unmapped:
        print('    BELUM TERPETAKAN (%d):' % len(unmapped))
        for t in unmapped:
            print('      - %s' % t[:100])


def main():
    args = sys.argv[1:]
    ref_keys = [a for a in args if a.upper() in REFERENCES]
    slugs = [a for a in args if a.upper() not in REFERENCES]

    if not ref_keys:
        ref_keys = list(REFERENCES)
    if not slugs:
        slugs = [d for d in os.listdir(PRODI_DIR)
                 if os.path.isdir(os.path.join(PRODI_DIR, d))]

    for key in ref_keys:
        for slug in slugs:
            build(slug, REFERENCES[key.upper()])
    print('Done.')


if __name__ == '__main__':
    main()
