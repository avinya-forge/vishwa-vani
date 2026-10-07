import os
import json
import urllib.request

def fetch_gita_chapter_1():
    url = "https://raw.githubusercontent.com/bhavykhatri/DharmicData/main/SrimadBhagvadGita/bhagavad_gita_chapter_1.json"
    print(f"Fetching {url}...")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    
    output_dir = "data/1-bronze/bhagavad-gita/chapter-1"
    os.makedirs(output_dir, exist_ok=True)
    
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            
        output_file = os.path.join(output_dir, "scraped_chapter_1.json")
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
        print(f"Successfully saved Chapter 1 data to {output_file}")
    except Exception as e:
        print(f"Error fetching data: {e}")

if __name__ == "__main__":
    fetch_gita_chapter_1()
