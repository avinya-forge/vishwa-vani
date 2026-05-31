import json
import os
from scrapling import Fetcher
import time

def ensure_dir(path):
    if not os.path.exists(path):
        os.makedirs(path)

# Example script using Python Scrapling for fetching the texts
def fetch_text(url, output_file, title_selector="title", content_selector="p"):
    print(f"Fetching: {url}")
    fetcher = Fetcher()
    page = fetcher.get(url)

    if page.status != 200:
        print(f"Failed to fetch. Status: {page.status}")
        return

    title = page.css(title_selector)[0].text if page.css(title_selector) else "Unknown"
    paragraphs = [p.text.strip() for p in page.css(content_selector) if len(p.text.strip()) > 20]

    data = {
        "url": url,
        "title": title,
        "content": paragraphs
    }

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)
    print(f"Saved to {output_file}")

if __name__ == "__main__":
    out_dir = os.path.join(os.path.dirname(__file__), "..", "..", "data", "1-bronze", "scrapling-tests")
    ensure_dir(out_dir)

    print("Testing Scrapling fetching...")
    fetch_text("https://www.sacred-texts.com/hin/sbe01/sbe01166.htm", os.path.join(out_dir, "test.json"))
