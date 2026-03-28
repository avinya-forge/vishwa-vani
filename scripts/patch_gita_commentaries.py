import os
import json
import time
import requests
from bs4 import BeautifulSoup

BASE_URL = "https://www.gitasupersite.iitk.ac.in/srimad"
DATA_DIR = "d:/Code/avinya-forge/vishwa-vani/data/3-gold/bhagavad-gita"

def fetch_commentaries(chapter, verse):
    """
    Fetches Shankara and Ramanuja commentaries for a specific verse.
    """
    params = {
        "field_chapter_value": chapter,
        "field_nsutra_value": verse,
        "scsh": "1",
        "scram": "1",
        "choose": "1"
    }
    
    print(f"  Fetching extra layers for BG {chapter}.{verse}...")
    try:
        response = requests.get(BASE_URL, params=params, timeout=15)
        if response.status_code != 200:
            print(f"    Error: Status code {response.status_code}")
            return None
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Selectors from browser analysis
        shankara_div = soup.select_one('.commentary-sh .field-item')
        ramanuja_div = soup.select_one('.commentary-ram .field-item')
        
        shankara_text = shankara_div.get_text(separator="\n").strip() if shankara_div else ""
        ramanuja_text = ramanuja_div.get_text(separator="\n").strip() if ramanuja_div else ""
        
        # Clean placeholders
        if "Sri Sankaracharya did not comment" in shankara_text:
            shankara_text = ""
        if "Ramanuja did not comment" in ramanuja_text:
            ramanuja_text = ""
            
        return {
            "shankara": shankara_text,
            "ramanuja": ramanuja_text
        }
    except Exception as e:
        print(f"    Exception: {e}")
        return None

def patch_chapter(chapter_num):
    file_path = os.path.join(DATA_DIR, f"bhagavad-gita-chapter-{chapter_num}.json")
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        verses = json.load(f)

    updated_verses = []
    for verse_obj in verses:
        ch = verse_obj['chapter']
        v = verse_obj['verse']
        
        # Handle ranges like '16-18' by taking the first number for the query
        query_v = v.split('-')[0] if '-' in v else v
        
        extra_data = fetch_commentaries(ch, query_v)
        
        if extra_data:
            # Check if layer already exists to avoid duplicates
            existing_authors = [l['author'] for l in verse_obj.get('layers', [])]
            
            if extra_data['shankara'] and 'shankara' not in existing_authors:
                verse_obj['layers'].append({
                    "author": "shankara",
                    "lang": "en", # Often translation of the original bhashya
                    "type": "commentary",
                    "content": extra_data['shankara']
                })
            
            if extra_data['ramanuja'] and 'ramanuja' not in existing_authors:
                verse_obj['layers'].append({
                    "author": "ramanuja",
                    "lang": "en",
                    "type": "commentary",
                    "content": extra_data['ramanuja']
                })
        
        # Update metadata stats
        verse_obj['ai_metadata']['stats']['layers_count'] = len(verse_obj['layers'])
        updated_verses.append(verse_obj)
        
        # Rate limit safety
        time.sleep(1.2)

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(updated_verses, f, indent=2, ensure_ascii=False)
    print(f"Successfully patched Chapter {chapter_num}")

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        patch_chapter(int(sys.argv[1]))
    else:
        # Patch all 18 chapters
        for i in range(1, 19):
            print(f"Processing Bhagavad Gita Chapter {i}...")
            patch_chapter(i)
