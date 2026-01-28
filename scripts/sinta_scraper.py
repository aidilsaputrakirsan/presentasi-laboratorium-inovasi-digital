"""
SINTA Data Scraper for ITK Lecturers
=====================================
Script untuk mengambil data HKI, Penelitian, Pengabdian, dan Buku dari SINTA

Instalasi:
    pip install sinta-scraper requests beautifulsoup4

Penggunaan:
    python sinta_scraper.py

Output:
    - src/data/sinta_data.json (data lengkap semua dosen)
"""

import json
import os
import time
from datetime import datetime

try:
    import sinta
    SINTA_AVAILABLE = True
except ImportError:
    SINTA_AVAILABLE = False
    print("Warning: sinta-scraper tidak terinstall. Jalankan: pip install sinta-scraper")

import requests
from bs4 import BeautifulSoup

# Konfigurasi
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LECTURERS_FILE = os.path.join(BASE_DIR, 'src', 'data', 'lecturers.json')
OUTPUT_FILE = os.path.join(BASE_DIR, 'src', 'data', 'sinta_data.json')

# Headers untuk request
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
}

def load_lecturers():
    """Load data dosen dari lecturers.json"""
    with open(LECTURERS_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)

    lecturers = []
    for prodi_key, prodi_data in data['studyPrograms'].items():
        for lecturer in prodi_data['lecturers']:
            if lecturer.get('sintaId'):
                lecturers.append({
                    'name': lecturer['name'],
                    'sintaId': lecturer['sintaId'],
                    'prodi': prodi_data['name']
                })

    return lecturers

def scrape_sinta_profile(sinta_id):
    """
    Scrape data profil dari SINTA menggunakan library sinta-scraper
    """
    if not SINTA_AVAILABLE:
        return None

    try:
        # Menggunakan sinta-scraper library
        author_data = sinta.author(int(sinta_id), output_format='dict')
        return author_data
    except Exception as e:
        print(f"  Error scraping profile {sinta_id}: {e}")
        return None

def scrape_sinta_ipr(sinta_id):
    """
    Scrape data IPR/HKI dari halaman SINTA
    """
    url = f"https://sinta.kemdiktisaintek.go.id/authors/profile/{sinta_id}/?view=ipr"

    try:
        response = requests.get(url, headers=HEADERS, timeout=30)
        if response.status_code != 200:
            return []

        soup = BeautifulSoup(response.text, 'html.parser')
        ipr_list = []

        # Cari tabel atau list IPR
        # Struktur bisa berbeda tergantung versi SINTA
        tables = soup.find_all('table')
        for table in tables:
            rows = table.find_all('tr')
            for row in rows[1:]:  # Skip header
                cols = row.find_all('td')
                if len(cols) >= 3:
                    ipr_list.append({
                        'title': cols[0].get_text(strip=True) if cols[0] else '',
                        'category': cols[1].get_text(strip=True) if len(cols) > 1 else '',
                        'year': cols[2].get_text(strip=True) if len(cols) > 2 else '',
                        'type': 'IPR'
                    })

        return ipr_list
    except Exception as e:
        print(f"  Error scraping IPR {sinta_id}: {e}")
        return []

def scrape_sinta_research(sinta_id):
    """
    Scrape data penelitian dari halaman SINTA
    """
    url = f"https://sinta.kemdiktisaintek.go.id/authors/profile/{sinta_id}/?view=researches"

    try:
        response = requests.get(url, headers=HEADERS, timeout=30)
        if response.status_code != 200:
            return []

        soup = BeautifulSoup(response.text, 'html.parser')
        research_list = []

        # Cari item penelitian
        items = soup.find_all('div', class_='ar-list-item') or soup.find_all('li', class_='list-group-item')

        for item in items:
            title_elem = item.find('a') or item.find('h5') or item.find('div', class_='ar-title')
            year_elem = item.find('span', class_='ar-year') or item.find('small')

            if title_elem:
                research_list.append({
                    'title': title_elem.get_text(strip=True),
                    'year': year_elem.get_text(strip=True) if year_elem else '',
                    'type': 'Research'
                })

        return research_list
    except Exception as e:
        print(f"  Error scraping research {sinta_id}: {e}")
        return []

def scrape_sinta_services(sinta_id):
    """
    Scrape data pengabdian masyarakat dari halaman SINTA
    """
    url = f"https://sinta.kemdiktisaintek.go.id/authors/profile/{sinta_id}/?view=services"

    try:
        response = requests.get(url, headers=HEADERS, timeout=30)
        if response.status_code != 200:
            return []

        soup = BeautifulSoup(response.text, 'html.parser')
        service_list = []

        # Cari item pengabdian
        items = soup.find_all('div', class_='ar-list-item') or soup.find_all('li', class_='list-group-item')

        for item in items:
            title_elem = item.find('a') or item.find('h5') or item.find('div', class_='ar-title')
            year_elem = item.find('span', class_='ar-year') or item.find('small')

            if title_elem:
                service_list.append({
                    'title': title_elem.get_text(strip=True),
                    'year': year_elem.get_text(strip=True) if year_elem else '',
                    'type': 'Community Service'
                })

        return service_list
    except Exception as e:
        print(f"  Error scraping services {sinta_id}: {e}")
        return []

def scrape_sinta_books(sinta_id):
    """
    Scrape data buku dari halaman SINTA
    """
    url = f"https://sinta.kemdiktisaintek.go.id/authors/profile/{sinta_id}/?view=books"

    try:
        response = requests.get(url, headers=HEADERS, timeout=30)
        if response.status_code != 200:
            return []

        soup = BeautifulSoup(response.text, 'html.parser')
        book_list = []

        # Cari item buku
        items = soup.find_all('div', class_='ar-list-item') or soup.find_all('li', class_='list-group-item')

        for item in items:
            title_elem = item.find('a') or item.find('h5') or item.find('div', class_='ar-title')
            year_elem = item.find('span', class_='ar-year') or item.find('small')
            isbn_elem = item.find('span', class_='ar-isbn')

            if title_elem:
                book_list.append({
                    'title': title_elem.get_text(strip=True),
                    'year': year_elem.get_text(strip=True) if year_elem else '',
                    'isbn': isbn_elem.get_text(strip=True) if isbn_elem else '',
                    'type': 'Book'
                })

        return book_list
    except Exception as e:
        print(f"  Error scraping books {sinta_id}: {e}")
        return []

def scrape_all_data(lecturer):
    """
    Scrape semua data untuk satu dosen
    """
    sinta_id = lecturer['sintaId']
    print(f"\nScraping data for: {lecturer['name']} (SINTA ID: {sinta_id})")

    result = {
        'name': lecturer['name'],
        'sintaId': sinta_id,
        'prodi': lecturer['prodi'],
        'scrapedAt': datetime.now().isoformat(),
        'profile': None,
        'ipr': [],
        'research': [],
        'services': [],
        'books': []
    }

    # Scrape profile (jika library tersedia)
    print("  - Fetching profile...")
    result['profile'] = scrape_sinta_profile(sinta_id)
    time.sleep(1)  # Rate limiting

    # Scrape IPR/HKI
    print("  - Fetching IPR/HKI...")
    result['ipr'] = scrape_sinta_ipr(sinta_id)
    time.sleep(1)

    # Scrape Research
    print("  - Fetching Research...")
    result['research'] = scrape_sinta_research(sinta_id)
    time.sleep(1)

    # Scrape Community Services
    print("  - Fetching Community Services...")
    result['services'] = scrape_sinta_services(sinta_id)
    time.sleep(1)

    # Scrape Books
    print("  - Fetching Books...")
    result['books'] = scrape_sinta_books(sinta_id)
    time.sleep(1)

    # Summary
    print(f"  Results: IPR={len(result['ipr'])}, Research={len(result['research'])}, " +
          f"Services={len(result['services'])}, Books={len(result['books'])}")

    return result

def main():
    print("=" * 60)
    print("SINTA Data Scraper for ITK Lecturers")
    print("=" * 60)

    # Load lecturers
    print("\nLoading lecturers data...")
    lecturers = load_lecturers()
    print(f"Found {len(lecturers)} lecturers with SINTA ID")

    if not lecturers:
        print("No lecturers with SINTA ID found. Exiting.")
        return

    # Scrape all data
    all_data = {
        'metadata': {
            'generatedAt': datetime.now().isoformat(),
            'totalLecturers': len(lecturers),
            'source': 'SINTA (sinta.kemdikbud.go.id)'
        },
        'lecturers': []
    }

    for lecturer in lecturers:
        data = scrape_all_data(lecturer)
        all_data['lecturers'].append(data)

    # Calculate totals
    total_ipr = sum(len(l['ipr']) for l in all_data['lecturers'])
    total_research = sum(len(l['research']) for l in all_data['lecturers'])
    total_services = sum(len(l['services']) for l in all_data['lecturers'])
    total_books = sum(len(l['books']) for l in all_data['lecturers'])

    all_data['metadata']['totals'] = {
        'ipr': total_ipr,
        'research': total_research,
        'services': total_services,
        'books': total_books
    }

    # Save to file
    print(f"\nSaving data to {OUTPUT_FILE}...")
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(all_data, f, indent=2, ensure_ascii=False)

    # Print summary
    print("\n" + "=" * 60)
    print("SCRAPING COMPLETE!")
    print("=" * 60)
    print(f"Total IPR/HKI     : {total_ipr}")
    print(f"Total Research    : {total_research}")
    print(f"Total Services    : {total_services}")
    print(f"Total Books       : {total_books}")
    print(f"\nOutput saved to: {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
