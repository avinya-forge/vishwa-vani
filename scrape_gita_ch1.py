import os
import json
import urllib.request
import time

BRONZE_DIR = "data/1-bronze/bhagavad-gita/chapter-1"

os.makedirs(BRONZE_DIR, exist_ok=True)

CHAPTER = 1
VERSES_COUNT = 47
API_BASE_URL = "https://vedicscriptures.github.io/slok/{}/{}/"

print(f"Starting to ingest Bhagavad Gita Chapter {CHAPTER}...")

all_verses = []

for verse in range(1, VERSES_COUNT + 1):
    url = API_BASE_URL.format(CHAPTER, verse)
    print(f"Fetching {url}...")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode('utf-8'))
            
            # Save individual verse
            verse_file = os.path.join(BRONZE_DIR, f"verse-{verse:02d}.json")
            with open(verse_file, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
                
            all_verses.append(data)
            
    except Exception as e:
        print(f"Error fetching verse {verse}: {e}")
    time.sleep(0.5)

# Save combined
combined_file = os.path.join(BRONZE_DIR, "chapter-1-full.json")
with open(combined_file, 'w', encoding='utf-8') as f:
    json.dump({"chapter": CHAPTER, "verses": all_verses}, f, ensure_ascii=False, indent=2)

print(f"Successfully ingested {len(all_verses)} verses to {BRONZE_DIR}")
