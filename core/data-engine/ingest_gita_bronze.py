import urllib.request
import json
import ssl
import os
import sys
import time

def ingest_chapter(chapter_num):
    ssl._create_default_https_context = ssl._create_unverified_context
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "data", "1-bronze", "bhagavad-gita", f"chapter-{chapter_num}"))
    os.makedirs(base_dir, exist_ok=True)
    
    # Get chapter metadata
    try:
        chapter_url = f"https://vedicscriptures.github.io/chapter/{chapter_num}/"
        req = urllib.request.Request(chapter_url, headers={'User-Agent': 'Mozilla/5.0'})
        response = urllib.request.urlopen(req)
        chapter_data = json.loads(response.read().decode('utf-8'))
        
        with open(os.path.join(base_dir, "chapter_meta.json"), "w", encoding="utf-8") as f:
            json.dump(chapter_data, f, ensure_ascii=False, indent=2)
            
        verses_count = chapter_data["verses_count"]
    except Exception as e:
        print(f"Error fetching chapter metadata: {e}")
        sys.exit(1)

    print(f"Ingesting Chapter {chapter_num} - {verses_count} verses...")
    
    # Fetch verses
    base_url = "https://vedicscriptures.github.io/slok/{}/{}/"
    verses = []
    
    for i in range(1, verses_count + 1):
        url = base_url.format(chapter_num, i)
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            response = urllib.request.urlopen(req)
            data = json.loads(response.read().decode('utf-8'))
            verses.append(data)
            
            with open(os.path.join(base_dir, f"verse_{i}.json"), "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
                
            time.sleep(0.1)
        except Exception as e:
            print(f"Error fetching verse {i}:", e)
            
    with open(os.path.join(base_dir, "all_verses.json"), "w", encoding="utf-8") as f:
        json.dump(verses, f, ensure_ascii=False, indent=2)
        
    print(f"Chapter {chapter_num} ingestion complete.")
    
if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python ingest_gita_bronze.py <chapter_number>")
        sys.exit(1)
    
    chapter = int(sys.argv[1])
    ingest_chapter(chapter)
