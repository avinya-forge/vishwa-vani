import urllib.request
import json
import ssl
import os
import time

def ingest_chapter_1():
    ssl._create_default_https_context = ssl._create_unverified_context
    base_url = "https://vedicscriptures.github.io/slok/1/{}/"
    
    output_dir = os.path.dirname(os.path.abspath(__file__))
    verses = []
    
    # Chapter 1 has 47 verses
    for i in range(1, 48):
        url = base_url.format(i)
        print(f"Fetching verse {i}...")
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            response = urllib.request.urlopen(req)
            data = json.loads(response.read().decode('utf-8'))
            verses.append(data)
            
            # Save individual verse
            with open(os.path.join(output_dir, f"verse_{i}.json"), "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
                
            time.sleep(0.5) # rate limit politeness
        except Exception as e:
            print(f"Error fetching verse {i}:", e)
            
    # Save combined
    with open(os.path.join(output_dir, "chapter_1.json"), "w", encoding="utf-8") as f:
        json.dump(verses, f, ensure_ascii=False, indent=2)
        
    print("Ingestion complete.")

if __name__ == "__main__":
    ingest_chapter_1()
