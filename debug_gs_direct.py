
import requests
from bs4 import BeautifulSoup
import re

def scrape_google_scholar_direct(gs_id):
    url = f"https://scholar.google.co.id/citations?user={gs_id}&hl=en&cstart=0&pagesize=100"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    }
    print(f"Fetching GS Direct: {url}")
    try:
        response = requests.get(url, headers=headers, timeout=30)
        if response.status_code != 200:
            print(f"Failed status: {response.status_code}")
            return

        soup = BeautifulSoup(response.text, 'html.parser')
        
        # GS uses table rows for items
        items = soup.find_all('tr', class_='gsc_a_tr')
        print(f"Found {len(items)} items on Google Scholar profile.")
        
        for i, item in enumerate(items[:5]):
            title_link = item.find('a', class_='gsc_a_at')
            if title_link:
                print(f" {i+1}. {title_link.get_text(strip=True)}")
                
    except Exception as e:
        print(f"Error scraping GS: {e}")

if __name__ == "__main__":
    scrape_google_scholar_direct("wCiwTCQAAAAJ")
