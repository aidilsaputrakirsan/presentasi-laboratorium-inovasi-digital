
import requests
from bs4 import BeautifulSoup
import re

SINTA_BASE_URL = "https://sinta.kemdiktisaintek.go.id/authors/profile"
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
}

def debug_sinta_pagination(sinta_id):
    print(f"DEBUGGING SINTA ID: {sinta_id}")
    
    # Try 'start' parameter simulation
    # If items per page is 10, page 2 starts at 10 (0-indexed) or 11
    offsets = [0, 10, 20] 
    for off in offsets:
        url = f"{SINTA_BASE_URL}/{sinta_id}/?view=googlescholar&start={off}"
        print(f"\n--- Fetching Offset {off}: {url} ---")
        
        try:
            response = requests.get(url, headers=HEADERS, timeout=30)
            print(f"Status Code: {response.status_code}")
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Debug: count items using same regex as main script
            items = soup.find_all(['div', 'li', 'article'], class_=re.compile(r'ar-list-item|list-group-item|document-item|article-item|mb-'))
            if not items: 
                items = soup.find_all('div', class_=re.compile(r'mb-3|mb-4|card'))
                print("Using fallback selector mb-3/4/card")
            
            print(f"Raw Items Found: {len(items)}")
            
            valid_items = []
            for i, item in enumerate(items):
                title_elem = item.find(['a', 'h5', 'h6', 'div'], class_=re.compile(r'title|ar-title|item-name'))
                if not title_elem:
                    title_elem = item.find('a', href=re.compile(r'scholar\.google'))
                if not title_elem: title_elem = item.find('a')
                
                if title_elem:
                    title = title_elem.get_text(strip=True)
                    if title and len(title) >= 4:
                        valid_items.append(title[:30])
                        # print(f"  {i+1}. {title[:50]}...")
            
            print(f"Valid Parsed Items: {len(valid_items)}")
            
            # Check for ANY pagination controls (broad search)
            all_links = soup.find_all('a')
            for link in all_links:
                txt = link.get_text(strip=True)
                href = link.get('href', '')
                # Look for single digits or "Next"
                if (txt.isdigit() and int(txt) < 10) or 'next' in txt.lower() or 'page' in href.lower():
                     print(f"Potential Page Link: '{txt}' -> {href}")

        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    # Sri Rahayu Natasia ID
    debug_sinta_pagination("5983406")
