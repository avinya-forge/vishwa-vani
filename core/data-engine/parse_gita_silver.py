import os
import sys
import json
import glob

def parse_silver(chapter_num):
    bronze_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "data", "1-bronze", "bhagavad-gita", f"chapter-{chapter_num}"))
    silver_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "data", "2-silver", "bhagavad-gita", f"chapter-{chapter_num}"))
    
    os.makedirs(silver_dir, exist_ok=True)
    
    # Read metadata
    meta_path = os.path.join(bronze_dir, "chapter_meta.json")
    if os.path.exists(meta_path):
        with open(meta_path, "r", encoding="utf-8") as f:
            meta = json.load(f)
        with open(os.path.join(silver_dir, "chapter_meta.json"), "w", encoding="utf-8") as f:
            json.dump(meta, f, ensure_ascii=False, indent=2)
            
        verses_count = meta.get("verses_count", 0)
    else:
        print(f"No metadata found for chapter {chapter_num}")
        sys.exit(1)
        
    print(f"Parsing Chapter {chapter_num} - {verses_count} verses to Silver...")
    
    parsed_verses = []
    
    for i in range(1, verses_count + 1):
        verse_file = os.path.join(bronze_dir, f"verse_{i}.json")
        if not os.path.exists(verse_file):
            print(f"Missing verse {i}")
            continue
            
        with open(verse_file, "r", encoding="utf-8") as f:
            raw = json.load(f)
            
        translations = []
        commentaries = []
        
        for key, val in raw.items():
            if isinstance(val, dict) and "author" in val:
                author = val["author"]
                if "et" in val:
                    translations.append({"author": author, "lang": "en", "text": val["et"]})
                if "ht" in val:
                    translations.append({"author": author, "lang": "hi", "text": val["ht"]})
                if "ec" in val:
                    commentaries.append({"author": author, "lang": "en", "text": val["ec"]})
                if "hc" in val:
                    commentaries.append({"author": author, "lang": "hi", "text": val["hc"]})
                    
        parsed = {
            "chapter": raw.get("chapter", chapter_num),
            "verse": raw.get("verse", i),
            "sanskrit": raw.get("slok", ""),
            "transliteration": raw.get("transliteration", ""),
            "translations": translations,
            "commentaries": commentaries
        }
        
        parsed_verses.append(parsed)
        
        with open(os.path.join(silver_dir, f"verse_{i}.json"), "w", encoding="utf-8") as f:
            json.dump(parsed, f, ensure_ascii=False, indent=2)
            
    with open(os.path.join(silver_dir, "all_verses.json"), "w", encoding="utf-8") as f:
        json.dump(parsed_verses, f, ensure_ascii=False, indent=2)
        
    print(f"Chapter {chapter_num} Silver parsing complete. Validated {len(parsed_verses)} verses.")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python parse_gita_silver.py <chapter_number>")
        sys.exit(1)
        
    chapter = int(sys.argv[1])
    parse_silver(chapter)
