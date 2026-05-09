"""
PDDikti Data Fetcher for ITK Lecturers (Per-Prodi)
===================================================
Mengambil data dosen dari API publik PDDikti (tanpa autentikasi):
  - Profil identitas + jabatan akademik
  - Riwayat pendidikan formal
  - Riwayat mengajar (mata kuliah per semester)
  - HKI / Paten

Sumber: https://api-pddikti.kemdiktisaintek.go.id/
Catatan: tidak ada field SKS, jumlah mahasiswa, atau bimbingan TA di
endpoint publik. Field-field tersebut hanya ada di SISTER (perlu kredensial).

Usage:
  python scripts/pddikti_scraper.py                    # semua prodi yg punya pddiktiId
  python scripts/pddikti_scraper.py sistem-informasi   # 1 prodi

Input:  src/data/prodi/{slug}/lecturers.json (butuh field pddiktiId)
Output: src/data/prodi/{slug}/pddikti_data.json
"""

import json
import os
import sys
import time
from datetime import datetime

import requests

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRODI_DIR = os.path.join(BASE_DIR, 'src', 'data', 'prodi')

API_BASE = "https://api-pddikti.kemdiktisaintek.go.id"
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json, text/plain, */*',
    'Origin': 'https://pddikti.kemdiktisaintek.go.id',
    'Referer': 'https://pddikti.kemdiktisaintek.go.id/',
}


def fetch(path):
    """GET helper. Returns parsed JSON, or None on 404/error."""
    url = f"{API_BASE}/{path}"
    try:
        r = requests.get(url, headers=HEADERS, timeout=30, verify=False)
        if r.status_code != 200:
            return None
        data = r.json()
        # API sometimes returns {"message": "Not Found"} with 200
        if isinstance(data, dict) and data.get('message') == 'Not Found':
            return None
        return data
    except Exception as e:
        print(f"    ! fetch error {path}: {e}")
        return None


def fetch_dosen(pddikti_id):
    """Pull all 4 endpoints for a single dosen."""
    profile = fetch(f"dosen/profile/{pddikti_id}") or {}
    study = fetch(f"dosen/study-history/{pddikti_id}") or []
    teaching = fetch(f"dosen/teaching-history/{pddikti_id}") or []
    paten = fetch(f"dosen/portofolio/paten/{pddikti_id}") or []

    # Dedupe study history (PDDikti often returns duplicates)
    seen = set()
    study_unique = []
    for s in study:
        key = (s.get('jenjang'), s.get('nama_prodi'), s.get('nama_pt'),
               s.get('tahun_masuk'), s.get('tahun_lulus'))
        if key not in seen:
            seen.add(key)
            study_unique.append(s)

    # Group teaching by semester for easier UI consumption
    by_semester = {}
    for t in teaching:
        sem = t.get('nama_semester', 'Unknown')
        by_semester.setdefault(sem, []).append({
            'kode_matkul': t.get('kode_matkul', ''),
            'nama_matkul': t.get('nama_matkul', ''),
            'nama_kelas': t.get('nama_kelas', ''),
        })
    # Sort semesters descending (newest first) by string compare — works for "YYYY/YYYY Semester"
    teaching_grouped = [
        {'semester': sem, 'classes': sorted(cls, key=lambda c: (c['nama_matkul'], c['nama_kelas']))}
        for sem, cls in sorted(by_semester.items(), reverse=True)
    ]

    return {
        'profile': profile,
        'studyHistory': study_unique,
        'teachingHistory': teaching,
        'teachingBySemester': teaching_grouped,
        'paten': paten,
        'stats': {
            'totalSemestersTaught': len(by_semester),
            'totalClassesTaught': len(teaching),
            'totalUniqueCourses': len({(t.get('kode_matkul'), t.get('nama_matkul')) for t in teaching}),
            'totalPaten': len(paten),
        }
    }


def get_prodi_folders():
    folders = []
    if not os.path.exists(PRODI_DIR):
        return folders
    for slug in os.listdir(PRODI_DIR):
        lect_file = os.path.join(PRODI_DIR, slug, 'lecturers.json')
        if os.path.isdir(os.path.join(PRODI_DIR, slug)) and os.path.exists(lect_file):
            folders.append(slug)
    return sorted(folders)


def scrape_prodi(slug):
    lect_file = os.path.join(PRODI_DIR, slug, 'lecturers.json')
    with open(lect_file, 'r', encoding='utf-8') as f:
        meta = json.load(f)

    prodi_name = meta.get('name', slug)
    out = {
        'metadata': {
            'generatedAt': datetime.now().isoformat(),
            'source': 'PDDikti (api-pddikti.kemdiktisaintek.go.id)',
            'prodi': prodi_name,
            'description': 'Data publik PDDikti: profil, riwayat pendidikan, riwayat mengajar, HKI/Paten'
        },
        'lecturers': []
    }

    targets = [l for l in meta.get('lecturers', []) if l.get('pddiktiId')]
    print(f"  {len(targets)} dosen punya pddiktiId di prodi {slug}")

    for i, lec in enumerate(targets, 1):
        print(f"  [{i}/{len(targets)}] {lec['name']}")
        data = fetch_dosen(lec['pddiktiId'])
        out['lecturers'].append({
            'name': lec['name'],
            'pddiktiId': lec['pddiktiId'],
            'fetchedAt': datetime.now().isoformat(),
            **data,
        })
        time.sleep(1)  # politeness delay

    output_file = os.path.join(PRODI_DIR, slug, 'pddikti_data.json')
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
    print(f"  Saved: {output_file}")
    return out


def main():
    # Suppress InsecureRequestWarning since we use verify=False
    import urllib3
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

    folders = get_prodi_folders()
    target = sys.argv[1] if len(sys.argv) > 1 else None
    if target:
        if target not in folders:
            print(f"Prodi '{target}' tidak ditemukan. Tersedia: {', '.join(folders)}")
            return
        folders = [target]

    print("=" * 60)
    print("PDDikti Fetcher — Per Prodi")
    print(f"Target: {', '.join(folders)}")
    print("=" * 60)

    for slug in folders:
        print(f"\nProdi: {slug}")
        scrape_prodi(slug)

    print("\nDONE!")


if __name__ == "__main__":
    main()
