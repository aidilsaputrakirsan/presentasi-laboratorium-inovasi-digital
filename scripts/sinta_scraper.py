"""
SINTA Data Scraper for ITK Lecturers (Enhanced Version 2.3)
============================================================
Script untuk mengambil data lengkap dari SINTA:
- Profil & Statistik Utama
- Publikasi (Scopus Q1-Q4, SINTA S1-S6, WoS)
- Penelitian & Pengabdian (dengan detail pendanaan)
- Buku & IPR/HKI (Hak Cipta, Paten)

Update 2.3:
- BARU: Scrape detail penelitian & pengabdian untuk keperluan akreditasi:
  - Leader (ketua peneliti/pengabdian)
  - Personils/members (anggota tim)
  - Grant type (jenis hibah: internal/eksternal)
  - Funding amount (jumlah dana dalam Rupiah)
  - Status (Approved/etc)
  - Source (INTERNAL SOURCE/BIMA SOURCE/etc)
- Data bisa digunakan untuk menghitung rasio per prodi dan per dosen

Update 2.2:
- Perbaikan URL IPR (plural view=iprs) yang lebih konsisten
- Perbaikan selektor untuk judul dokumen agar tidak "Untitled"
- Deteksi rank SINTA (S1-S6) yang lebih akurat dari halaman Garuda
- Penambahan penanganan error untuk koneksi timeout
"""

import json
import os
import time
import re
from datetime import datetime

import requests
from bs4 import BeautifulSoup

# Konfigurasi
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LECTURERS_FILE = os.path.join(BASE_DIR, 'src', 'data', 'lecturers.json')
OUTPUT_FILE = os.path.join(BASE_DIR, 'src', 'data', 'sinta_data.json')

SINTA_BASE_URL = "https://sinta.kemdiktisaintek.go.id/authors/profile"

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
}

def load_lecturers():
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

def scrape_main_page(sinta_id):
    """Scrape data dari halaman utama profil (summary)"""
    url = f"{SINTA_BASE_URL}/{sinta_id}"
    stats = {
        'articles': 0, 'citations': 0, 'hIndex': 0, 'i10Index': 0, 'gIndex': 0,
        'scopus': 0, 'wos': 0, 'garuda': 0, 'google': 0, 'sinta': 0,
        'research': 0, 'service': 0, 'ipr': 0, 'book': 0,
        # Detailed stats per source
        'scopusArticles': 0, 'scopusCitations': 0, 'scopusHIndex': 0,
        'googleArticles': 0, 'googleCitations': 0, 'googleHIndex': 0,
        'wosArticles': 0, 'wosCitations': 0, 'wosHIndex': 0
    }

    try:
        response = requests.get(url, headers=HEADERS, timeout=30)
        if response.status_code != 200: return stats
        soup = BeautifulSoup(response.text, 'html.parser')

        # SINTA 3 structure typically has nav-items with badges
        nav_tabs = soup.find_all('a', class_='nav-link')
        for nav in nav_tabs:
            text = nav.get_text(strip=True).lower()
            badge = nav.find('span', class_='badge')
            count = 0
            if badge:
                c_text = re.sub(r'[^\d]', '', badge.get_text(strip=True))
                count = int(c_text) if c_text else 0

            if 'scopus' in text: stats['scopus'] = count
            elif 'wos' in text: stats['wos'] = count
            elif 'garuda' in text: stats['garuda'] = count
            elif 'google' in text: stats['google'] = count
            elif 'research' in text: stats['research'] = count
            elif 'service' in text: stats['service'] = count
            elif 'ipr' in text: stats['ipr'] = count
            elif 'book' in text: stats['book'] = count

        # Main metrics table with columns: Label | Scopus | GScholar | WOS
        tables = soup.find_all('table')
        for table in tables:
            rows = table.find_all('tr')
            for row in rows:
                cols = row.find_all(['td', 'th'])
                if len(cols) >= 3:
                    label = cols[0].get_text(strip=True).lower()

                    # Extract values from each column
                    def get_int(col):
                        txt = col.get_text(strip=True)
                        m = re.search(r'\d+', txt)
                        return int(m.group()) if m else 0

                    scopus_val = get_int(cols[1]) if len(cols) > 1 else 0
                    google_val = get_int(cols[2]) if len(cols) > 2 else 0
                    wos_val = get_int(cols[3]) if len(cols) > 3 else 0

                    if 'article' in label:
                        stats['scopusArticles'] = scopus_val
                        stats['googleArticles'] = google_val
                        stats['wosArticles'] = wos_val
                        # Use Google Scholar as primary (more comprehensive for Indonesian researchers)
                        stats['articles'] = google_val if google_val > 0 else scopus_val
                    elif 'citation' in label and 'cited' not in label:
                        stats['scopusCitations'] = scopus_val
                        stats['googleCitations'] = google_val
                        stats['wosCitations'] = wos_val
                        # Use Google Scholar citations as primary
                        stats['citations'] = google_val if google_val > 0 else scopus_val
                    elif 'h-index' in label:
                        stats['scopusHIndex'] = scopus_val
                        stats['googleHIndex'] = google_val
                        stats['wosHIndex'] = wos_val
                        # Use highest H-Index
                        stats['hIndex'] = max(scopus_val, google_val, wos_val)
                    elif 'i10' in label:
                        stats['i10Index'] = google_val if google_val > 0 else scopus_val
                    elif 'g-index' in label:
                        stats['gIndex'] = google_val if google_val > 0 else scopus_val

        return stats
    except Exception as e:
        print(f"  Error scraping main page {sinta_id}: {e}")
        return stats

def scrape_documents(sinta_id):
    """Scrape documents dengan kategori Scopus/SINTA secara spesifik"""
    docs = {
        'scopus': {'q1': 0, 'q2': 0, 'q3': 0, 'q4': 0, 'noq': 0, 'total': 0},
        'sinta': {'s1': 0, 's2': 0, 's3': 0, 's4': 0, 's5': 0, 's6': 0, 'unknown': 0, 'total': 0},
        'list': []
    }

    # 1. Scrape Scopus - Find divs with mb- class containing scopus links
    try:
        url_scopus = f"{SINTA_BASE_URL}/{sinta_id}/?view=scopus"
        response = requests.get(url_scopus, headers=HEADERS, timeout=30)
        soup = BeautifulSoup(response.text, 'html.parser')

        # Find all divs with mb- class (Bootstrap margin-bottom)
        items = soup.find_all('div', class_=re.compile(r'mb-'))
        processed_titles = set()

        for item in items:
            # Only process items that have scopus link
            scopus_link = item.find('a', href=lambda h: h and 'scopus.com' in str(h))
            if not scopus_link:
                continue

            title = scopus_link.get_text(strip=True)
            if not title or len(title) < 10 or title in processed_titles:
                continue
            processed_titles.add(title)

            # Get full text from the div for Q detection
            text = item.get_text(' ', strip=True).upper()

            # Detect Q ranking - look for "Q1 AS", "Q2 AS" patterns
            q = ''
            if 'Q1 AS' in text or 'Q1AS' in text: q = 'Q1'; docs['scopus']['q1'] += 1
            elif 'Q2 AS' in text or 'Q2AS' in text: q = 'Q2'; docs['scopus']['q2'] += 1
            elif 'Q3 AS' in text or 'Q3AS' in text: q = 'Q3'; docs['scopus']['q3'] += 1
            elif 'Q4 AS' in text or 'Q4AS' in text: q = 'Q4'; docs['scopus']['q4'] += 1
            elif 'NO-Q' in text or 'NOQ' in text: docs['scopus']['noq'] += 1
            else: docs['scopus']['noq'] += 1

            docs['scopus']['total'] += 1
            docs['list'].append({'title': title[:200], 'category': 'scopus', 'q': q})
    except Exception as e:
        print(f"  Error scraping Scopus for {sinta_id}: {e}")

    # 2. Scrape SINTA (via Garuda view) - Improved parsing
    try:
        url_sinta = f"{SINTA_BASE_URL}/{sinta_id}/?view=garuda"
        response = requests.get(url_sinta, headers=HEADERS, timeout=30)
        soup = BeautifulSoup(response.text, 'html.parser')

        # Find article entries
        items = soup.find_all(['div', 'li', 'article'], class_=re.compile(r'ar-list-item|list-group-item|document-item|article-item|mb-'))
        if not items:
            items = soup.find_all('div', class_=re.compile(r'mb-3|mb-4|card'))

        for item in items:
            # Look for Garuda links
            title_elem = item.find('a', href=re.compile(r'garuda\.kemdiktisaintek'))
            if not title_elem:
                title_elem = item.find(['a', 'h5', 'h6', 'div'], class_=re.compile(r'title|ar-title|item-name'))
            if not title_elem:
                title_elem = item.find('a')

            title = title_elem.get_text(strip=True) if title_elem else ""
            if not title or len(title) < 5:
                continue

            text = item.get_text(strip=True).upper()

            # Better SINTA rank detection - look for "SINTA X" or "ACCRED: SINTA X" pattern
            rank = ''
            sinta_match = re.search(r'SINTA\s*(\d)', text)
            accred_match = re.search(r'ACCRED[:\s]*SINTA\s*(\d)', text)

            if accred_match:
                rank_num = accred_match.group(1)
                rank = f'S{rank_num}'
            elif sinta_match:
                rank_num = sinta_match.group(1)
                rank = f'S{rank_num}'

            if rank == 'S1': docs['sinta']['s1'] += 1
            elif rank == 'S2': docs['sinta']['s2'] += 1
            elif rank == 'S3': docs['sinta']['s3'] += 1
            elif rank == 'S4': docs['sinta']['s4'] += 1
            elif rank == 'S5': docs['sinta']['s5'] += 1
            elif rank == 'S6': docs['sinta']['s6'] += 1
            else: docs['sinta']['unknown'] += 1

            docs['sinta']['total'] += 1
            docs['list'].append({'title': title[:200], 'category': 'sinta', 'rank': rank})
    except Exception as e:
        print(f"  Error scraping Garuda for {sinta_id}: {e}")

    return docs

def scrape_list_items(sinta_id, view_type):
    """Scrape Buku (simple format)"""
    url = f"{SINTA_BASE_URL}/{sinta_id}/?view={view_type}"
    results = []
    try:
        response = requests.get(url, headers=HEADERS, timeout=30)
        soup = BeautifulSoup(response.text, 'html.parser')
        items = soup.find_all(['div', 'li', 'tr'], class_=re.compile(r'ar-list-item|list-group-item'))
        for item in items:
            title_elem = item.find(['a', 'h5', 'div'], class_=re.compile(r'title|ar-title|item-name'))
            if not title_elem: title_elem = item.find('a')
            if title_elem:
                title = title_elem.get_text(strip=True)
                year_match = re.search(r'20\d{2}', item.get_text())
                year = year_match.group() if year_match else ''
                results.append({'title': title[:300], 'year': year})
        return results
    except: return []


def parse_funding_amount(text):
    """Parse funding amount from text like 'Rp. 17.000.000' to integer"""
    match = re.search(r'Rp\.?\s*([\d.,]+)', text)
    if match:
        amount_str = match.group(1).replace('.', '').replace(',', '')
        try:
            return int(amount_str)
        except ValueError:
            return 0
    return 0


def scrape_research_detailed(sinta_id):
    """Scrape penelitian dengan detail lengkap untuk keperluan akreditasi"""
    url = f"{SINTA_BASE_URL}/{sinta_id}/?view=researches"
    results = []

    try:
        response = requests.get(url, headers=HEADERS, timeout=30)
        soup = BeautifulSoup(response.text, 'html.parser')

        # Find all research items with class ar-list-item
        items = soup.find_all('div', class_='ar-list-item')

        for item in items:
            research = {
                'title': '',
                'leader': '',
                'members': [],
                'grantType': '',
                'grantCategory': '',
                'year': '',
                'fundingAmount': 0,
                'fundingFormatted': '',
                'status': '',
                'source': ''
            }

            # Title - from ar-title div
            title_elem = item.find('div', class_='ar-title')
            if title_elem:
                title_link = title_elem.find('a')
                research['title'] = title_link.get_text(strip=True) if title_link else title_elem.get_text(strip=True)

            # Get all ar-meta divs
            meta_divs = item.find_all('div', class_='ar-meta')

            for meta in meta_divs:
                text = meta.get_text(' ', strip=True)

                # Leader - contains "Leader :"
                if 'Leader :' in text or 'Leader:' in text:
                    leader_match = re.search(r'Leader\s*:\s*([^P]+?)(?:Penelitian|HIBAH|$)', text)
                    if leader_match:
                        research['leader'] = leader_match.group(1).strip()
                    else:
                        # Try getting from first link after "Leader :"
                        links = meta.find_all('a')
                        for link in links:
                            link_text = link.get_text(strip=True)
                            if link_text.startswith('Leader'):
                                continue
                            if 'Penelitian' in link_text or 'HIBAH' in link_text:
                                # This is grant type
                                research['grantType'] = link_text
                                # Parse grant category from parentheses
                                cat_match = re.search(r'\(([^)]+)\)', link_text)
                                if cat_match:
                                    research['grantCategory'] = cat_match.group(1).strip()
                            elif link_text and not research['leader']:
                                research['leader'] = link_text

                # Grant type - contains "Penelitian" or "HIBAH"
                pub_elem = meta.find('a', class_='ar-pub')
                if pub_elem:
                    grant_text = pub_elem.get_text(strip=True)
                    research['grantType'] = grant_text
                    cat_match = re.search(r'\(([^)]+)\)', grant_text)
                    if cat_match:
                        research['grantCategory'] = cat_match.group(1).strip()

                # Personils/Members - contains "Personils :"
                if 'Personils :' in text or 'Personils:' in text:
                    member_links = meta.find_all('a', href=re.compile(r'/authors/profile/'))
                    for ml in member_links:
                        member_name = ml.get_text(strip=True)
                        if member_name and member_name not in research['members']:
                            research['members'].append(member_name)

                # Year, Funding, Status, Source - look for specific patterns
                year_elem = meta.find('a', class_='ar-year')
                if year_elem:
                    year_match = re.search(r'20\d{2}', year_elem.get_text())
                    if year_match:
                        research['year'] = year_match.group()

                # Find all ar-quartile elements for funding, status, source
                quartile_elems = meta.find_all('a', class_='ar-quartile')
                for qe in quartile_elems:
                    qe_text = qe.get_text(strip=True)

                    if 'Rp' in qe_text:
                        research['fundingAmount'] = parse_funding_amount(qe_text)
                        research['fundingFormatted'] = qe_text
                    elif qe_text in ['Approved', 'Pending', 'Rejected', 'On Going']:
                        research['status'] = qe_text
                    elif 'SOURCE' in qe_text.upper():
                        research['source'] = qe_text

            # Only add if we have a title
            if research['title']:
                results.append(research)

        return results
    except Exception as e:
        print(f"  Error scraping research details for {sinta_id}: {e}")
        return []


def scrape_services_detailed(sinta_id):
    """Scrape pengabdian dengan detail lengkap untuk keperluan akreditasi"""
    url = f"{SINTA_BASE_URL}/{sinta_id}/?view=services"
    results = []

    try:
        response = requests.get(url, headers=HEADERS, timeout=30)
        soup = BeautifulSoup(response.text, 'html.parser')

        # Find all service items with class ar-list-item
        items = soup.find_all('div', class_='ar-list-item')

        for item in items:
            service = {
                'title': '',
                'leader': '',
                'members': [],
                'grantType': '',
                'grantCategory': '',
                'year': '',
                'fundingAmount': 0,
                'fundingFormatted': '',
                'status': '',
                'source': ''
            }

            # Title - from ar-title div
            title_elem = item.find('div', class_='ar-title')
            if title_elem:
                title_link = title_elem.find('a')
                service['title'] = title_link.get_text(strip=True) if title_link else title_elem.get_text(strip=True)

            # Get all ar-meta divs
            meta_divs = item.find_all('div', class_='ar-meta')

            for meta in meta_divs:
                text = meta.get_text(' ', strip=True)

                # Leader - contains "Leader :"
                if 'Leader :' in text or 'Leader:' in text:
                    leader_match = re.search(r'Leader\s*:\s*([^P]+?)(?:Pengabdian|HIBAH|PKM|$)', text)
                    if leader_match:
                        service['leader'] = leader_match.group(1).strip()
                    else:
                        links = meta.find_all('a')
                        for link in links:
                            link_text = link.get_text(strip=True)
                            if link_text.startswith('Leader'):
                                continue
                            if 'Pengabdian' in link_text or 'HIBAH' in link_text or 'PKM' in link_text:
                                service['grantType'] = link_text
                                cat_match = re.search(r'\(([^)]+)\)', link_text)
                                if cat_match:
                                    service['grantCategory'] = cat_match.group(1).strip()
                            elif link_text and not service['leader']:
                                service['leader'] = link_text

                # Grant type
                pub_elem = meta.find('a', class_='ar-pub')
                if pub_elem:
                    grant_text = pub_elem.get_text(strip=True)
                    service['grantType'] = grant_text
                    cat_match = re.search(r'\(([^)]+)\)', grant_text)
                    if cat_match:
                        service['grantCategory'] = cat_match.group(1).strip()

                # Personils/Members
                if 'Personils :' in text or 'Personils:' in text:
                    member_links = meta.find_all('a', href=re.compile(r'/authors/profile/'))
                    for ml in member_links:
                        member_name = ml.get_text(strip=True)
                        if member_name and member_name not in service['members']:
                            service['members'].append(member_name)

                # Year
                year_elem = meta.find('a', class_='ar-year')
                if year_elem:
                    year_match = re.search(r'20\d{2}', year_elem.get_text())
                    if year_match:
                        service['year'] = year_match.group()

                # Funding, Status, Source
                quartile_elems = meta.find_all('a', class_='ar-quartile')
                for qe in quartile_elems:
                    qe_text = qe.get_text(strip=True)

                    if 'Rp' in qe_text:
                        service['fundingAmount'] = parse_funding_amount(qe_text)
                        service['fundingFormatted'] = qe_text
                    elif qe_text in ['Approved', 'Pending', 'Rejected', 'On Going']:
                        service['status'] = qe_text
                    elif 'SOURCE' in qe_text.upper():
                        service['source'] = qe_text

            # Only add if we have a title
            if service['title']:
                results.append(service)

        return results
    except Exception as e:
        print(f"  Error scraping service details for {sinta_id}: {e}")
        return []

def scrape_ipr(sinta_id):
    """Scrape IPR (Hak Cipta/Paten) menggunakan view=iprs atau view=ipr"""
    ipr = {'hakCipta': 0, 'paten': 0, 'other': 0, 'total': 0, 'list': []}

    for view in ['iprs', 'ipr']:
        if ipr['total'] > 0:
            break
        url = f"{SINTA_BASE_URL}/{sinta_id}/?view={view}"
        try:
            response = requests.get(url, headers=HEADERS, timeout=30)
            soup = BeautifulSoup(response.text, 'html.parser')

            # Try multiple selectors for IPR items
            items = soup.find_all(['div', 'li', 'tr', 'article'], class_=re.compile(r'ar-list-item|list-group-item|document-item|ipr-item|mb-'))
            if not items:
                items = soup.find_all('div', class_=re.compile(r'mb-3|mb-4|card'))

            # Also try table rows
            table_rows = soup.find_all('tr')
            items = list(items) + list(table_rows)

            for item in items:
                if item.find('th'):
                    continue
                text = item.get_text(strip=True).lower()

                # Skip navigation/header/metric elements
                skip_keywords = ['article', 'citation', 'h-index', 'i10-index', 'g-index',
                               'document', 'scopus', 'garuda', 'google scholar', 'wos',
                               'research', 'service', 'book', 'menu', 'home', 'author',
                               'affiliation', 'department', 'overall', 'score', 'metric',
                               'index', 'total', 'sinta score', 'profile']
                if any(x in text for x in skip_keywords):
                    continue

                # Find title element
                title_elem = item.find(['a', 'h5', 'h6', 'div', 'td'], class_=re.compile(r'title|item-name'))
                if not title_elem:
                    cols = item.find_all('td')
                    if cols and len(cols) >= 1:
                        title_elem = cols[0]
                if not title_elem:
                    title_elem = item.find('a')

                if title_elem:
                    title = title_elem.get_text(strip=True)
                    if not title or len(title) < 5:
                        continue

                    # Determine IPR category
                    cat = 'other'
                    if any(x in text for x in ['hak cipta', 'copyright', 'ciptaan']):
                        ipr['hakCipta'] += 1
                        cat = 'hakCipta'
                    elif any(x in text for x in ['paten', 'patent']):
                        ipr['paten'] += 1
                        cat = 'paten'
                    else:
                        ipr['other'] += 1

                    ipr['total'] += 1
                    ipr['list'].append({'title': title[:200], 'category': cat})
        except Exception as e:
            print(f"  Error scraping IPR for {sinta_id}: {e}")
            continue

    return ipr

def main():
    lecturers = load_lecturers()
    all_data = {
        'metadata': {
            'generatedAt': datetime.now().isoformat(),
            'source': 'SINTA 3',
            'version': '2.3',
            'description': 'Data SINTA dengan detail pendanaan untuk akreditasi'
        },
        'lecturers': []
    }

    for lec in lecturers:
        print(f"Scraping {lec['name']} ({lec['sintaId']})...")
        stats = scrape_main_page(lec['sintaId'])
        docs = scrape_documents(lec['sintaId'])

        # Scrape detailed research & services for accreditation
        print(f"  - Scraping detailed research...")
        research = scrape_research_detailed(lec['sintaId'])
        print(f"  - Scraping detailed services...")
        services = scrape_services_detailed(lec['sintaId'])

        books = scrape_list_items(lec['sintaId'], 'books')
        ipr = scrape_ipr(lec['sintaId'])

        # Calculate funding summary for this lecturer
        total_research_funding = sum(r.get('fundingAmount', 0) for r in research)
        total_service_funding = sum(s.get('fundingAmount', 0) for s in services)

        all_data['lecturers'].append({
            'name': lec['name'],
            'sintaId': lec['sintaId'],
            'prodi': lec['prodi'],
            'scrapedAt': datetime.now().isoformat(),
            'stats': stats,
            'documents': docs,
            'research': research,
            'services': services,
            'books': books,
            'ipr': ipr,
            'fundingSummary': {
                'totalResearchFunding': total_research_funding,
                'totalServiceFunding': total_service_funding,
                'totalFunding': total_research_funding + total_service_funding,
                'researchCount': len(research),
                'serviceCount': len(services)
            }
        })
        time.sleep(2)

    # Calculate prodi-level summary
    prodi_summary = {}
    for lec in all_data['lecturers']:
        prodi = lec['prodi']
        if prodi not in prodi_summary:
            prodi_summary[prodi] = {
                'lecturerCount': 0,
                'totalResearchFunding': 0,
                'totalServiceFunding': 0,
                'totalResearchCount': 0,
                'totalServiceCount': 0
            }
        prodi_summary[prodi]['lecturerCount'] += 1
        prodi_summary[prodi]['totalResearchFunding'] += lec['fundingSummary']['totalResearchFunding']
        prodi_summary[prodi]['totalServiceFunding'] += lec['fundingSummary']['totalServiceFunding']
        prodi_summary[prodi]['totalResearchCount'] += lec['fundingSummary']['researchCount']
        prodi_summary[prodi]['totalServiceCount'] += lec['fundingSummary']['serviceCount']

    # Calculate per-lecturer averages
    for prodi, data in prodi_summary.items():
        if data['lecturerCount'] > 0:
            data['avgResearchFundingPerLecturer'] = data['totalResearchFunding'] / data['lecturerCount']
            data['avgServiceFundingPerLecturer'] = data['totalServiceFunding'] / data['lecturerCount']
            data['avgResearchCountPerLecturer'] = data['totalResearchCount'] / data['lecturerCount']
            data['avgServiceCountPerLecturer'] = data['totalServiceCount'] / data['lecturerCount']

    all_data['prodiSummary'] = prodi_summary

    print(f"Saving to {OUTPUT_FILE}...")
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(all_data, f, indent=2, ensure_ascii=False)

    # Print summary
    print("\n" + "="*60)
    print("SUMMARY PER PRODI (untuk Akreditasi)")
    print("="*60)
    for prodi, data in prodi_summary.items():
        print(f"\n{prodi}:")
        print(f"  Jumlah Dosen: {data['lecturerCount']}")
        print(f"  Total Dana Penelitian: Rp {data['totalResearchFunding']:,.0f}")
        print(f"  Total Dana Pengabdian: Rp {data['totalServiceFunding']:,.0f}")
        print(f"  Rata-rata Penelitian/Dosen: {data.get('avgResearchCountPerLecturer', 0):.2f}")
        print(f"  Rata-rata Pengabdian/Dosen: {data.get('avgServiceCountPerLecturer', 0):.2f}")
        print(f"  Rata-rata Dana Penelitian/Dosen: Rp {data.get('avgResearchFundingPerLecturer', 0):,.0f}")
        print(f"  Rata-rata Dana Pengabdian/Dosen: Rp {data.get('avgServiceFundingPerLecturer', 0):,.0f}")

    print("\nDONE!")

if __name__ == "__main__":
    main()
