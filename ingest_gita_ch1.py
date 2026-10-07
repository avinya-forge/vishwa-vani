import os
import json
import urllib.request
import time

def ingest_gita_chapter_1():
    base_dir = "data/1-bronze/bhagavad-gita/chapter-1"
    os.makedirs(base_dir, exist_ok=True)
    
    # Bhagavad Gita API provides chapter/verse data.
    # The API might be at https://bhagavadgitaapi.in/slok/{chapter}/{verse}/
    # Chapter 1 has 47 verses.
    
    chapter = 1
    total_verses = 47
    
    for verse in range(1, total_verses + 1):
        url = f"https://bhagavadgitaapi.in/slok/{chapter}/{verse}/"
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response:
                data = json.loads(response.read().decode('utf-8'))
                
            file_path = os.path.join(base_dir, f"verse_{verse}.json")
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=4)
            print(f"Ingested verse {verse}")
        except Exception as e:
            print(f"Failed to ingest verse {verse}: {e}")
        time.sleep(0.5)

if __name__ == "__main__":
    ingest_gita_chapter_1()
