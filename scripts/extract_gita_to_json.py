import requests
from bs4 import BeautifulSoup
import json
import os
import time
from pathlib import Path

# Configuration
BASE_URL = "https://vedabase.io/en/library/bg"
OUTPUT_DIR = Path("d:/Code/avinya-forge/vishwa-vani/data/3-gold/bhagavad-gita")
CHAPTER_COUNTS = {
    1: 47, 2: 72, 3: 43, 4: 42, 5: 29, 6: 47, 7: 30, 8: 28, 9: 34, 10: 42, 
    11: 55, 12: 20, 13: 35, 14: 27, 15: 20, 16: 24, 17: 28, 18: 78
}

def get_verse_data(chapter, verse):
    url = f"{BASE_URL}/{chapter}/{verse}/"
    print(f"Fetching BG {chapter}.{verse}...")
    try:
        response = requests.get(url, timeout=10)
        if response.status_code != 200:
            print(f"  Error {response.status_code}")
            return None
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        def extract_content(parent_class):
            section = soup.find(class_=parent_class)
            if not section: return ""
            # The actual text is usually in a div with 'user-select-text' 
            # and specifically inside the innermost div that has the text.
            content_wrapper = section.find(class_='user-select-text')
            if content_wrapper:
                # Get text from the nested div to avoid duplicates
                target = content_wrapper.find('div') or content_wrapper
                return target.get_text(separator="\n").strip()
            return ""

        original_text = extract_content('av-devanagari')
        translit_text = extract_content('av-verse_text')
        translation_text = extract_content('av-translation')
        
        # Synonyms need special handling to avoid being too messy
        syn_div = soup.find(class_='av-synonyms')
        synonyms_text = ""
        if syn_div:
            content_wrapper = syn_div.find(class_='user-select-text')
            if content_wrapper:
                target = content_wrapper.find('div') or content_wrapper
                synonyms_text = " ".join(target.get_text().split())
        
        # Purport spans multiple blocks
        purport_div = soup.find(class_='av-purport')
        purport_text = ""
        if purport_div:
            # Blocks are sibling divs with class user-select-text
            p_blocks = purport_div.find_all(class_='user-select-text', recursive=True)
            # Use a set to avoid duplicates if nested
            seen_texts = set()
            clean_blocks = []
            for b in p_blocks:
                txt = b.get_text().strip()
                if txt and txt not in seen_texts:
                    # Also check if this block is a child of an already seen block
                    is_child = False
                    for existing in seen_texts:
                        if txt in existing and len(txt) < len(existing):
                            is_child = True
                            break
                    if not is_child:
                        clean_blocks.append(txt)
                        seen_texts.add(txt)
            purport_text = "\n\n".join(clean_blocks)

        return {
            "id": f"bhagavad-gita_{chapter}_{verse}",
            "text_slug": "bhagavad-gita",
            "chapter": chapter,
            "verse": verse,
            "original": original_text,
            "transliteration": translit_text,
            "translation": translation_text, # English Verse
            "meaning": synonyms_text,      # English Meaning (word-for-word)
            "layers": [
                {
                    "author": "iskcon",
                    "lang": "en",
                    "type": "commentary",
                    "content": purport_text
                }
            ],
            "ai_metadata": {
                "topics": [],
                "correlations": {},
                "stats": {
                    "original_words": len(original_text.split()),
                    "translit_words": len(translit_text.split()),
                    "layers_count": 1
                }
            }
        }
    except Exception as e:
        print(f"  Exception: {e}")
        return None

def get_verse_links(chapter):
    url = f"{BASE_URL}/{chapter}/"
    print(f"Fetching BG Chapter {chapter} index...")
    try:
        response = requests.get(url, timeout=10)
        if response.status_code != 200:
            print(f"  Failed: HTTP {response.status_code}")
            return []
        soup = BeautifulSoup(response.content, 'html.parser')
        # Updated selector based on debugging
        links = soup.select('a.text-vb-link.font-medium')
        verse_links = []
        for a in links:
            href = a['href']
            # Expected pattern: /en/library/bg/1/1/ or /en/library/bg/1/16-18/
            parts = href.strip('/').split('/')
            if len(parts) >= 4 and parts[0] == 'en' and parts[1] == 'library' and parts[2] == 'bg':
                verse_links.append(parts[4]) # This is the verse part for /en/library/bg/1/1/
            elif len(parts) >= 1 and ('/' not in href): # Relative link?
                 verse_links.append(href.strip('/'))

        # Refined link extraction specifically for the chapter page structure
        verse_links = []
        for a in links:
            href = a.get('href', '')
            if f'/bg/{chapter}/' in href:
                # Extract the last part of the path
                v_part = href.strip('/').split('/')[-1]
                verse_links.append(v_part)

        return sorted(list(set(verse_links)))
    except Exception as e:
        print(f"Index fetch failed: {e}")
        return []

def process_chapter(chapter):
    verse_ranges = get_verse_links(chapter)
    if not verse_ranges:
        print(f"No verses found for chapter {chapter}")
        return

    chapter_data = []
    for v_range in verse_ranges:
        data = get_verse_data(chapter, v_range)
        if data:
            # If it's a range like "16-18", map it to the first verse for ID but 
            # we should technically handle splitting if needed. 
            # For now, we'll keep the ID as the range.
            chapter_data.append(data)
        time.sleep(0.5)
    
    output_file = OUTPUT_DIR / f"bhagavad-gita-chapter-{chapter}.json"
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(chapter_data, f, ensure_ascii=False, indent=2)
    print(f"Saved Chapter {chapter} to {output_file}")

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        chapter = int(sys.argv[1])
        process_chapter(chapter)
    else:
        # Default: Process Chapter 1 for test
        process_chapter(1)
