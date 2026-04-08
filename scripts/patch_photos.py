"""
Patch foto profil dosen ke sinta_data.json yang sudah ada.
Ambil foto dari halaman SINTA (sumber: Google Scholar).

Usage:
  python scripts/patch_photos.py
"""

import json
import glob
import time
import os
import sys

import requests
from bs4 import BeautifulSoup

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRODI_DIR = os.path.join(BASE_DIR, 'src', 'data', 'prodi')

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def get_photo_url(sinta_id):
    url = f"https://sinta.kemdiktisaintek.go.id/authors/profile/{sinta_id}"
    try:
        resp = requests.get(url, headers=HEADERS, timeout=15)
        if resp.status_code != 200:
            return None
        soup = BeautifulSoup(resp.text, 'html.parser')
        img = soup.find('img', class_='img-thumbnail')
        return img['src'] if img else None
    except Exception as e:
        print(f"  ERROR fetching {sinta_id}: {e}")
        return None

def main():
    files = glob.glob(os.path.join(PRODI_DIR, '*', 'sinta_data.json'))
    if not files:
        print("Tidak ada sinta_data.json ditemukan.")
        return

    for filepath in files:
        prodi_slug = os.path.basename(os.path.dirname(filepath))
        print(f"\nProdi: {prodi_slug}")

        with open(filepath, encoding='utf-8') as f:
            data = json.load(f)

        changed = False
        for lec in data.get('lecturers', []):
            if lec.get('photo'):
                print(f"  [SKIP] {lec['name']} - sudah ada foto")
                continue

            print(f"  Scraping foto: {lec['name']} ({lec['sintaId']})...")
            photo = get_photo_url(lec['sintaId'])
            if photo:
                lec['photo'] = photo
                print(f"    -> {photo[:80]}...")
                changed = True
            else:
                lec['photo'] = None
                print(f"    -> Tidak ditemukan foto")
            time.sleep(0.8)

        if changed:
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            print(f"  Saved: {filepath}")

    print("\nSelesai patch foto profil.")

if __name__ == '__main__':
    main()
