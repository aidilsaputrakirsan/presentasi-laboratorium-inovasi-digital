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
import time
from datetime import datetime

import requests
from bs4 import BeautifulSoup

# Konfigurasi
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LECTURERS_FILE = os.path.join(BASE_DIR, 'src', 'data', 'lecturers.json')
OUTPUT_FILE = os.path.join(BASE_DIR, 'src', 'data', 'sinta_data.json')

SINTA_BASE_URL = "https://sinta.kemdiktisaintek.go.id/authors/profile"

session = requests.Session()
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
    'Referer': 'https://sinta.kemdiktisaintek.go.id/authors',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-User': '?1',
}
session.headers.update(HEADERS)

def scrape_google_scholar_direct(gs_id):
    """Scrape langsung dari Google Scholar menggunakan ID"""
    if not gs_id:
        return {'total': 0, 'list': []}
    
    print(f"   [GS Direct] Scraping Google Scholar ID: {gs_id}")
    all_articles = []
    start = 0
    page_size = 100
    max_retries = 3
    
    while True:
        url = f"https://scholar.google.co.id/citations?user={gs_id}&hl=en&cstart={start}&pagesize={page_size}"
        try:
            time.sleep(2) # Delay to be polite
            response = session.get(url, headers=HEADERS, timeout=30)
            if response.status_code != 200:
                print(f"   [GS Direct] Error {response.status_code}")
                break
                
            soup = BeautifulSoup(response.text, 'html.parser')
            rows = soup.find_all('tr', class_='gsc_a_tr')
            
            if not rows:
                break
                
            for row in rows:
                title_link = row.find('a', class_='gsc_a_at')
                year_elem = row.find('span', class_='gsc_a_h gsc_a_hc')
                cite_elem = row.find('a', class_='gsc_a_ac')
                
                title = title_link.get_text(strip=True) if title_link else "Untitled"
                year = year_elem.get_text(strip=True) if year_elem else ""
                citations = cite_elem.get_text(strip=True) if cite_elem else "0"
                
                # Check for empty year/citations which sometimes happens
                if not citations: citations = "0"
                
                all_articles.append({
                    'title': title,
                    'year': year,
                    'citation': citations,
                    'source': 'Google Scholar'
                })
            
            print(f"   [GS Direct] Fetched {len(rows)} items (Total so far: {len(all_articles)})")
            
            if len(rows) < page_size:
                break
                
            start += page_size
            
        except Exception as e:
            print(f"   [GS Direct] Exception: {e}")
            break
            
    return {
        'total': len(all_articles),
        'list': all_articles
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
                    'scholarId': lecturer.get('scholarId'),
                    'prodi': prodi_data['name']
                })
    return lecturers

def scrape_main_page(sinta_id):
    """Scrape data dari halaman utama profil (summary)"""
    url = f"{SINTA_BASE_URL}/{sinta_id}"
    stats = {
        'articles': 0, 'citations': 0, 'hIndex': 0, 'i10Index': 0, 'gIndex': 0,
        'scopus': 0, 'wos': 0, 'garuda': 0, 'google': 0, 'sinta': 0, 'rama': 0,
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
            elif 'rama' in text: stats['rama'] = count

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

def scrape_with_pagination(sinta_id, view_type, parser_func, max_pages=50):
    """Generic helper to scrape paginated SINTA lists with improved pagination"""
    all_items = []
    seen_titles = set()
    consecutive_duplicate_pages = 0  # Track consecutive pages with all duplicates
    
    for page in range(1, max_pages + 1):
        # SINTA uses different pagination URL format
        url = f"{SINTA_BASE_URL}/{sinta_id}/?view={view_type}&page={page}"
        try:
            # Add delay to be polite and avoid rate limits
            if page > 1: time.sleep(1.5)  # Slightly longer delay for reliability
            
            response = session.get(url, headers=HEADERS, timeout=30)
            if response.status_code != 200: 
                print(f"      Page {page}: HTTP {response.status_code}, stopping")
                break
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Check if pagination exists on page - look for pagination element
            pagination_elem = soup.find('ul', class_='pagination')
            total_records_text = soup.find(string=re.compile(r'Total Records\s*:?\s*\d+', re.I))
            
            # Extract total records count if available
            total_records = 0
            if total_records_text:
                match = re.search(r'(\d+)', total_records_text)
                if match: 
                    total_records = int(match.group(1))

            page_items = parser_func(soup)
            
            if not page_items:
                print(f"      Page {page}: No items found, stopping")
                break
            
            # Filter duplicates (pagination cycle detection)
            new_unique = []
            for item in page_items:
                # Use title as unique key (normalized) - use more characters for better uniqueness
                key = item.get('title', '').strip().lower()[:150]  # Increased from 100 to 150
                if not key: key = str(item)
                
                if key not in seen_titles:
                    seen_titles.add(key)
                    new_unique.append(item)
            
            # Track consecutive duplicate pages
            if not new_unique and page > 1:
                consecutive_duplicate_pages += 1
                print(f"      Page {page}: All duplicates ({consecutive_duplicate_pages} consecutive)")
                # Only stop after 2 consecutive all-duplicate pages to avoid false positives
                if consecutive_duplicate_pages >= 2:
                    print(f"      Stopping after {consecutive_duplicate_pages} consecutive duplicate pages")
                    break
            else:
                consecutive_duplicate_pages = 0  # Reset counter
                all_items.extend(new_unique)
                print(f"      Page {page}: Found {len(page_items)} items, {len(new_unique)} new (Total: {len(all_items)})")
            
            # Check for next page link - if no "Next" or page number > current, we're done
            if pagination_elem:
                # Look for next page link or higher page numbers
                next_link = pagination_elem.find('a', string=re.compile(r'Next|»|›'))
                page_links = pagination_elem.find_all('a', href=re.compile(r'page='))
                max_page_in_pagination = 1
                for link in page_links:
                    page_match = re.search(r'page=(\d+)', link.get('href', ''))
                    if page_match:
                        max_page_in_pagination = max(max_page_in_pagination, int(page_match.group(1)))
                
                # If current page >= max page in pagination, we're done
                if page >= max_page_in_pagination and not next_link:
                    print(f"      Reached last page ({page} of {max_page_in_pagination})")
                    break
            
            # If fewer items than expected, likely the last page
            if len(page_items) < 10:
                break
                
        except Exception as e:
            print(f"  Error scraping {view_type} page {page}: {e}")
            break
            
    final_total = max(total_records, len(all_items))
    return all_items, final_total


def scrape_documents(sinta_id, gs_id=None):
    """Scrape documents dengan kategori Scopus/SINTA secara spesifik"""
    docs = {
        'scopus': {'q1': 0, 'q2': 0, 'q3': 0, 'q4': 0, 'noq': 0, 'total': 0},
        'sinta': {'s1': 0, 's2': 0, 's3': 0, 's4': 0, 's5': 0, 's6': 0, 'unknown': 0, 'total': 0},
        'googlescholar': {'total': 0, 'list': []},
        'rama': {'total': 0},
        'list': []
    }

    # --- Improved Parsers for each category ---
    
    def parse_scopus(soup):
        """Parse Scopus items using ar-list-item class (more reliable)"""
        # Primary: look for ar-list-item divs
        items = soup.find_all('div', class_='ar-list-item')
        
        # Fallback: look for divs with scopus links
        if not items:
            items = soup.find_all('div', class_=re.compile(r'mb-'))
        
        results = []
        for item in items:
            # Find Scopus link
            scopus_link = item.find('a', href=lambda h: h and 'scopus.com' in str(h))
            if not scopus_link: 
                continue
            
            title = scopus_link.get_text(strip=True)
            if not title or len(title) < 5: 
                continue
            
            # Find Q-index
            text = item.get_text(' ', strip=True).upper()
            q = 'No-Q'
            
            # Look for Q-index pattern
            q_match = re.search(r'Q([1-4])\s*(AS|ARTICLE|CONFERENCE)', text)
            if q_match:
                q = f'Q{q_match.group(1)}'
            elif 'Q1' in text: q = 'Q1'
            elif 'Q2' in text: q = 'Q2'
            elif 'Q3' in text: q = 'Q3'
            elif 'Q4' in text: q = 'Q4'
            elif 'NO-Q' in text or 'NOQ' in text: q = 'No-Q'
            
            # Extract year - look for 4-digit year pattern (2000-2030)
            year = ''
            text_raw = item.get_text(' ', strip=True)
            year_match = re.search(r'(?:📅\s*)?(\b20[0-3]\d\b)', text_raw)
            if year_match:
                year = year_match.group(1)
            
            results.append({'title': title[:200], 'category': 'scopus', 'q': q, 'year': year})
        return results

    def parse_sinta(soup):
        """Parse SINTA/Garuda items using ar-list-item class"""
        # Primary: look for ar-list-item divs
        items = soup.find_all('div', class_='ar-list-item')
        
        # Fallback
        if not items:
            items = soup.find_all(['div', 'li'], class_=re.compile(r'list-group-item|document-item|mb-'))
        
        results = []
        for item in items:
            # Find title - prefer Garuda link
            title_elem = item.find('a', href=re.compile(r'garuda\.kemdiktisaintek'))
            if not title_elem:
                # Try ar-title class
                ar_title = item.find('div', class_='ar-title')
                if ar_title:
                    title_elem = ar_title.find('a')
            if not title_elem:
                title_elem = item.find('a')
            
            if not title_elem:
                continue
                
            title = title_elem.get_text(strip=True)
            if not title or len(title) < 5: 
                continue

            # Find SINTA rank
            text = item.get_text(' ', strip=True).upper()
            rank = ''
            
            # Look for "Accred : Sinta X" pattern (most reliable)
            accred_match = re.search(r'ACCRED\s*:\s*SINTA\s*(\d)', text)
            if accred_match: 
                rank = f'S{accred_match.group(1)}'
            else:
                # Fallback: look for "SINTA X" pattern
                sinta_match = re.search(r'SINTA\s*(\d)', text)
                if sinta_match: 
                    rank = f'S{sinta_match.group(1)}'
            
            # Extract year - look for 4-digit year pattern (2000-2030)
            year = ''
            text_raw = item.get_text(' ', strip=True)
            year_match = re.search(r'(?:📅\s*)?(\b20[0-3]\d\b)', text_raw)
            if year_match:
                year = year_match.group(1)
            
            results.append({'title': title[:200], 'category': 'sinta', 'rank': rank, 'year': year})
        return results

    # Helper for GS Parser (used only if fallback needed)
    def parse_google(soup):
        items = soup.find_all('div', class_='ar-list-item')
        if not items: 
            items = soup.find_all(['div', 'li'], class_=re.compile(r'list-group-item|mb-'))
        results = []
        for item in items:
            title_elem = item.find('div', class_='ar-title')
            if title_elem:
                title_elem = title_elem.find('a')
            if not title_elem:
                title_elem = item.find('a', href=re.compile(r'scholar\.google'))
            if not title_elem:
                title_elem = item.find('a')
            
            if title_elem:
                title = title_elem.get_text(strip=True)
                if title and len(title) >= 4:
                    results.append({'title': title[:300], 'category': 'googlescholar'})
        return results

    def parse_rama(soup):
        items = soup.find_all('div', class_='ar-list-item')
        if not items:
            items = soup.find_all(['div', 'li'], class_=re.compile(r'list-group-item|mb-'))
        results = []
        for item in items:
            title_elem = item.find('div', class_='ar-title')
            if title_elem:
                title_elem = title_elem.find('a')
            if not title_elem:
                title_elem = item.find('a')
            
            if title_elem:
                title = title_elem.get_text(strip=True)
                if title and len(title) >= 4:
                    results.append({'title': title[:300], 'category': 'rama'})
        return results

    # --- Execute Scraping with Pagination ---

    # 1. Scopus
    print("   [Scopus] Scraping with pagination...")
    scopus_list, scopus_total = scrape_with_pagination(sinta_id, 'scopus', parse_scopus)
    docs['scopus']['total'] = scopus_total # Use true total from pagination
    for item in scopus_list:
        q = item.get('q', 'NO-Q')
        # Normalize
        if 'Q1' in q: q = 'Q1'
        elif 'Q2' in q: q = 'Q2'
        elif 'Q3' in q: q = 'Q3'
        elif 'Q4' in q: q = 'Q4'
        else: q = 'No-Q'

        if q == 'Q1': docs['scopus']['q1'] += 1
        elif q == 'Q2': docs['scopus']['q2'] += 1
        elif q == 'Q3': docs['scopus']['q3'] += 1
        elif q == 'Q4': docs['scopus']['q4'] += 1
        else: docs['scopus']['noq'] += 1
        
        # docs['scopus']['total'] += 1  <-- REMOVED, already set to true total
        year = item.get('year', '')
        docs['list'].append({'title': item['title'], 'category': f"Scopus {q}", 'year': year})
        # Add to scopus list for year filtering
        if 'scopusList' not in docs['scopus']:
            docs['scopus']['scopusList'] = []
        docs['scopus']['scopusList'].append({'title': item['title'], 'q': q, 'year': year})

    # 2. SINTA (Garuda)
    print("   [SINTA/Garuda] Scraping with pagination...")
    sinta_list, sinta_total = scrape_with_pagination(sinta_id, 'garuda', parse_sinta)
    docs['sinta']['total'] = sinta_total # Use true total
    for item in sinta_list:
        rank = item.get('rank', '').replace('S', '')
        if rank == '1': docs['sinta']['s1'] += 1
        elif rank == '2': docs['sinta']['s2'] += 1
        elif rank == '3': docs['sinta']['s3'] += 1
        elif rank == '4': docs['sinta']['s4'] += 1
        elif rank == '5': docs['sinta']['s5'] += 1
        elif rank == '6': docs['sinta']['s6'] += 1
        else: docs['sinta']['unknown'] += 1
        
        # docs['sinta']['total'] += 1 <-- REMOVED
        year = item.get('year', '')
        docs['list'].append({'title': item['title'], 'category': f"SINTA S{rank}" if rank else "SINTA", 'year': year})
        # Add to sinta list for year filtering
        if 'sintaList' not in docs['sinta']:
            docs['sinta']['sintaList'] = []
        docs['sinta']['sintaList'].append({'title': item['title'], 'rank': f"S{rank}" if rank else "", 'year': year})

    # 3. Google Scholar
    if gs_id:
        print(f"   [Google Scholar] Switching to Direct Mode (ID: {gs_id})")
        gs_data = scrape_google_scholar_direct(gs_id)
        docs['googlescholar'] = gs_data
        # Add to main list
        for item in gs_data['list']:
             docs['list'].append({
                'title': item['title'],
                'category': 'Google Scholar',
                'year': item['year']
             })
    else:
        print("   [Google Scholar] Scraping via SINTA (Limited)...")
        google_list, google_total = scrape_with_pagination(sinta_id, 'googlescholar', parse_google)
        docs['googlescholar']['total'] = google_total
        docs['googlescholar']['list'] = google_list
        for item in google_list:
            docs['list'].append({'title': item['title'], 'category': 'Google Scholar', 'year': ''})

    # 4. RAMA
    print("   [RAMA] Scraping...")
    rama_list, rama_total = scrape_with_pagination(sinta_id, 'rama', parse_rama)
    docs['rama']['total'] = rama_total
    for item in rama_list:
        docs['rama']['total'] += 1
        docs['list'].append({'title': item['title'], 'category': 'RAMA', 'year': ''})
    
    return docs

def scrape_list_items(sinta_id, view_type):
    """Scrape Buku (simple format)"""
    url = f"{SINTA_BASE_URL}/{sinta_id}/?view={view_type}"
    results = []
    try:
        response = session.get(url, headers=HEADERS, timeout=30)
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


def parse_research_item(item):
    """Parse a single research item from the page"""
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
                        research['grantType'] = link_text
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

    return research


def scrape_research_detailed(sinta_id):
    """Scrape penelitian dengan detail lengkap untuk keperluan akreditasi (WITH PAGINATION)"""
    
    def parse_research_page(soup):
        """Parser function for scrape_with_pagination"""
        items = soup.find_all('div', class_='ar-list-item')
        results = []
        for item in items:
            research = parse_research_item(item)
            if research['title']:
                results.append(research)
        return results
    
    print("   [Research] Scraping with pagination...")
    return scrape_with_pagination(sinta_id, 'researches', parse_research_page)


def parse_service_item(item):
    """Parse a single service item from the page"""
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

    return service


def scrape_services_detailed(sinta_id):
    """Scrape pengabdian dengan detail lengkap untuk keperluan akreditasi (WITH PAGINATION)"""
    
    def parse_service_page(soup):
        """Parser function for scrape_with_pagination"""
        items = soup.find_all('div', class_='ar-list-item')
        results = []
        for item in items:
            service = parse_service_item(item)
            if service['title']:
                results.append(service)
        return results
    
    print("   [Services] Scraping with pagination...")
    return scrape_with_pagination(sinta_id, 'services', parse_service_page)

def scrape_ipr(sinta_id):
    """Scrape IPR (Hak Cipta/Paten) menggunakan view=iprs atau view=ipr"""
    ipr = {'hakCipta': 0, 'paten': 0, 'other': 0, 'total': 0, 'list': []}

    for view in ['iprs', 'ipr']:
        if ipr['total'] > 0:
            break
        url = f"{SINTA_BASE_URL}/{sinta_id}/?view={view}"
        try:
            response = session.get(url, headers=HEADERS, timeout=30)
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
        docs = scrape_documents(lec['sintaId'], lec.get('scholarId'))

        # Scrape detailed research & services for accreditation
        print(f"  - Scraping detailed research...")
        research, research_total = scrape_research_detailed(lec['sintaId'])
        print(f"  - Scraping detailed services...")
        services, services_total = scrape_services_detailed(lec['sintaId'])

        # books = scrape_list_items(lec['sintaId'], 'books') # Commented out
        books = []
        books_total = stats.get('book', 0)
        ipr = scrape_ipr(lec['sintaId'])
        
        # --- CORRECT TOTALS FROM SUMMARY STATS IF HIGHER ---
        # Sometimes detailed pagination doesn't show 'Total Records' text but summary does
        docs['sinta']['total'] = max(docs['sinta']['total'], stats.get('garuda', 0))
        docs['scopus']['total'] = max(docs['scopus']['total'], stats.get('scopus', 0))
        docs['rama']['total'] = max(docs['rama']['total'], stats.get('rama', 0))
        
        research_total = max(research_total, stats.get('research', 0))
        services_total = max(services_total, stats.get('service', 0))
        # ---------------------------------------------------

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
            'researchTotal': research_total,
            'services': services,
            'servicesTotal': services_total,
            'books': books,
            'booksTotal': books_total,
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
