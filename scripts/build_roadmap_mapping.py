"""
Build roadmap_mapping.json - Pemetaan Judul Penelitian Prodi -> Roadmap FSTI
============================================================================
Memetakan setiap judul penelitian dosen prodi (sumber: sinta_data.json) ke
4 Pilar Strategis Roadmap Penelitian & PkM FSTI ITK 2025-2029, sebagai bukti
dokumen untuk butir AMI: "Pemetaan judul penelitian terhadap roadmap
penelitian jurusan / ITK".

Referensi pilar: Roadmap_FSTI.pdf Bab 4 (Pilar Strategis Integratif).
Aturan pemetaan ditulis eksplisit di bawah agar dapat diaudit dan direvisi
oleh koorpro (bukan black-box).

Usage:
  python scripts/build_roadmap_mapping.py                  # semua prodi berdata
  python scripts/build_roadmap_mapping.py sistem-informasi # 1 prodi

Output:
  src/data/prodi/{slug}/roadmap_mapping.json
"""

import io
import json
import os
import sys
from datetime import datetime

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRODI_DIR = os.path.join(BASE_DIR, 'src', 'data', 'prodi')

# -----------------------------------------------------------------------------
# Definisi 4 Pilar Strategis FSTI 2025-2029 (Roadmap_FSTI.pdf, Bab 4)
# -----------------------------------------------------------------------------
PILLARS = {
    'P1': {
        'name': 'Smart Governance dan Transformasi Digital Perkotaan',
        'flagship': 'GovTech Nusantara',
        'siRole': ('Merancang enterprise architecture dan memodelkan integrasi '
                   'layanan e-Government agar ramah pengguna (user-centric)'),
    },
    'P2': {
        'name': 'Smart Education (Edukasi Cerdas dan Inklusif)',
        'flagship': 'AI-based Learning Management System',
        'siRole': ('Rekayasa perangkat lunak sistem informasi akademik dan '
                   'media pembelajaran adaptif/inklusif'),
    },
    'P3': {
        'name': 'Smart Living dan Lingkungan Kesehatan Cerdas',
        'flagship': 'Bio-Smart Living System',
        'siRole': ('Platform informasi layanan kesehatan, analitik data '
                   'lingkungan, dan sistem pemantauan berbasis IoT'),
    },
    'P4': {
        'name': 'Smart Grid, Energi Cerdas, dan Mobilitas Berkelanjutan',
        'flagship': 'Microgrid & EV Charging',
        'siRole': ('Sistem monitoring dan visualisasi data energi serta '
                   'antarmuka pengguna aplikasi energi'),
    },
}

# -----------------------------------------------------------------------------
# Aturan pemetaan: (pilar, bobot, daftar kata kunci judul)
# Judul dicocokkan case-insensitive. Pilar dengan skor tertinggi menjadi
# pilar utama; pilar lain yang tetap tersentuh dicatat sebagai pilar pendukung.
# -----------------------------------------------------------------------------
RULES = [
    ('P1', 3, ['E-GOVERNMENT', 'PEMERINTAH', 'KELURAHAN', 'PERIZINAN', 'DPMPTSP',
               'PELAYANAN SATU PINTU', 'UNIT LAYANAN TERPADU', 'LAYANAN MASYARAKAT',
               'TATA KELOLA', 'COBIT', 'TOGAF', 'ARSITEKTUR SISTEM', 'ENTERPRISE',
               'MANAJEMEN RISIKO', 'ISO 31000', 'JUSTIFIKASI TEKNIS', 'DATA CENTER',
               'DISASTER RECOVERY', 'PROSES BISNIS', 'BUSINESS PROCESS',
               'E-READINESS', 'TRANSPARANSI', 'TJSLP', 'PAJAK DAERAH',
               'KRIPTOSISTEM', 'KEAMANAN DATA',
               'COMPANY PROFILE PEMERINTAHAN', 'HUKUM']),
    ('P1', 2, ['SISTEM INFORMASI PROFIL', 'SIMPAS', 'SIMLAB', 'ADMINISTRASI',
               'CUTI PEGAWAI', 'EMPLOYEE INFORMATION SYSTEM', 'APPROVAL WORKFLOW',
               'PENDAFTARAN SANTRI', 'PENELITIAN DAN PENGABDIAN MASYARAKAT', 'PARIWISATA', 'FESTIVAL', 'E-COMMERCE',
               'UMKM', 'MOBILE PAYMENT', 'FINANCIAL TECHNOLOGY', 'SMART ECONOMY']),
    ('P2', 3, ['PEMBELAJARAN', 'BELAJAR MENGAJAR', 'LEARNING MANAGEMENT',
               'E-LEARNING', 'SEKOLAH', 'SMART-SCHOOL', 'SIAKAD', 'AKADEMIK',
               'TUGAS AKHIR', 'PENJADWALAN PEMBELAJARAN', 'GAMIFICATION',
               'MEDIA PEMBELAJARAN', 'ADAPTIVE LEARNING', 'DISABILITAS',
               'PESERTA DIDIK', 'LITERASI', 'DISCRETE TRIAL TRAINING',
               'SISTEM INFORMASI COURSE', 'PERPUSTAKAAN', 'SMART LIBRARY',
               'HERBARIUM', 'METAVERSE', 'BEL SEKOLAH',
               'SIMSIS', 'PUBLISHING APPS']),
    ('P3', 3, ['KESEHATAN', 'KLINIK', 'GIZI', 'BALITA', 'POSTPARTUM', 'REKAM MEDIS',
               'KEMATIAN IBU', 'SAMPAH', 'TPS 3R', 'TEMPAT PEMBUANGAN AKHIR', 'KUALITAS UDARA', 'KUALITAS AIR',
               'KOMPOS', 'LIMBAH', 'KEBISINGAN', 'KEBAKARAN', 'KESELAMATAN',
               'LIVABLE HOME', 'BATIMETRI', 'KESEHATAN MENTAL']),
    ('P4', 3, ['ENERGI LISTRIK', 'ENERGI HIJAU', 'TURBIN ANGIN', 'ELECTRICITY',
               'SAKELAR LISTRIK', 'SAKLAR LISTRIK', 'MONITORING DATA ENERGI']),
    # Konteks pendukung lintas pilar
    ('P3', 1, ['IOT', 'SMART HOME', 'MONITORING']),
    ('P1', 1, ['IKN', 'IBU KOTA NEGARA', 'SMART CITY', 'SMART SOCIETY', 'AGILE', 'SCRUM', 'WATERFALL', 'EXTREME PROGRAMMING',
               'ICONIX', 'PROTOTYPING', 'RAPID APPLICATION DEVELOPMENT', 'UI/UX']),
]


def classify(title):
    """Kembalikan (pilar_utama, [pilar_pendukung], skor_per_pilar)."""
    up = title.upper()
    scores = {}
    for pillar, weight, keywords in RULES:
        for kw in keywords:
            if kw in up:
                scores[pillar] = scores.get(pillar, 0) + weight
    if not scores:
        return None, [], {}
    ranked = sorted(scores.items(), key=lambda kv: (-kv[1], kv[0]))
    primary = ranked[0][0]
    supporting = [p for p, s in ranked[1:] if s >= 2]
    return primary, supporting, scores


def build(slug):
    path = os.path.join(PRODI_DIR, slug, 'sinta_data.json')
    if not os.path.exists(path):
        print('  [skip] %s: sinta_data.json tidak ada' % slug)
        return
    data = json.load(io.open(path, encoding='utf-8'))

    # Dedup judul: satu penelitian bisa muncul di beberapa dosen (ketua+anggota)
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

    items, unmapped = [], []
    counts = dict((p, 0) for p in PILLARS)
    for rec in unique.values():
        primary, supporting, scores = classify(rec['title'])
        rec['pillar'] = primary
        rec['supportingPillars'] = supporting
        rec['matchScore'] = scores
        if primary:
            counts[primary] += 1
        else:
            unmapped.append(rec['title'])
        items.append(rec)

    items.sort(key=lambda x: (x['pillar'] or 'ZZ', -int(x['year'] or 0)))

    out = {
        'metadata': {
            'generatedAt': datetime.now().isoformat(),
            'prodi': data['metadata'].get('prodi', slug),
            'source': 'sinta_data.json',
            'sourceGeneratedAt': data['metadata'].get('generatedAt'),
            'reference': 'Roadmap Penelitian, PkM, dan Renstra FSTI ITK 2025-2029',
            'description': 'Pemetaan judul penelitian prodi terhadap 4 Pilar Strategis Roadmap FSTI',
        },
        'pillars': PILLARS,
        'summary': {
            'totalUniqueResearch': len(items),
            'mapped': len(items) - len(unmapped),
            'unmapped': len(unmapped),
            'perPillar': counts,
            'coveragePercent': round((len(items) - len(unmapped)) / len(items) * 100, 1) if items else 0,
        },
        'items': items,
    }

    dest = os.path.join(PRODI_DIR, slug, 'roadmap_mapping.json')
    with io.open(dest, 'w', encoding='utf-8') as f:
        json.dump(out, f, ensure_ascii=False, indent=2)

    print('  %s: %d judul unik, %d terpetakan (%s%%)' % (
        slug, len(items), out['summary']['mapped'], out['summary']['coveragePercent']))
    for p in sorted(PILLARS):
        print('    %s %-45s: %d' % (p, PILLARS[p]['name'][:45], counts[p]))
    if unmapped:
        print('    BELUM TERPETAKAN (%d):' % len(unmapped))
        for t in unmapped:
            print('      - %s' % t[:100])


def main():
    targets = sys.argv[1:] or [d for d in os.listdir(PRODI_DIR)
                               if os.path.isdir(os.path.join(PRODI_DIR, d))]
    for slug in targets:
        build(slug)
    print('Done.')


if __name__ == '__main__':
    main()
