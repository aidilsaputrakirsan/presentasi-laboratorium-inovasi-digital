
import requests
from bs4 import BeautifulSoup

SINTA_BASE_URL = "https://sinta.kemdiktisaintek.go.id/authors/profile"
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def save_html(sinta_id):
    url = f"{SINTA_BASE_URL}/{sinta_id}/?view=googlescholar"
    print(f"Fetching {url}")
    response = requests.get(url, headers=HEADERS)
    with open("sinta_gs_dump.html", "w", encoding="utf-8") as f:
        f.write(response.text)
    print("Saved to sinta_gs_dump.html")

if __name__ == "__main__":
    save_html("5983406")
