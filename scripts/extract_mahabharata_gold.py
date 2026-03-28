import os
import json
import re
import csv
import argparse
import ast
from bs4 import BeautifulSoup

# Paths
BRONZE_DIR = "d:/Code/avinya-forge/vishwa-vani/data/1-bronze"
GOLD_DIR = "d:/Code/avinya-forge/vishwa-vani/data/3-gold/mahabharata"
MAPPING_FILE = os.path.join(BRONZE_DIR, "mahabharata-full-mapping.tsv")
KMG_FILE = os.path.join(BRONZE_DIR, "mahabharata-kmg-vol1.html") # Currently only Books 1-3

# Metadata for NVF 1.2
KMG_META = {
    "author": "km_ganguli",
    "author_name": "Kisari Mohan Ganguli",
    "author_bio": "An Indian translator known for being the first to provide a complete English translation of the Mahabharata (1883-1896).",
    "author_label": "KMG Translation",
    "author_icon": "📜",
    "publication": "1883-1896 Edition",
    "organization": "Project Gutenberg / Sacred-Texts"
}

def parse_mapping(parva_num):
    """
    Parses the new Shreevatsa mapping TSV.
    Format: Book, Skt_List, Chapter_my_name (KMG Sect), ISTA_name, URL
    Skt_List example: [(13, '1', '28')]
    """
    mapping = {} # (Parva, CE_Ch, CE_V) -> KMG_Sect
    with open(MAPPING_FILE, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f, delimiter='\t')
        for row in reader:
            book = int(row['Book'])
            if book != parva_num: continue
            
            kmg_sect_str = row['Chapter_my_name']
            # Sometimes it has '128gap129', we try to take the first number
            match = re.search(r'\d+', kmg_sect_str)
            if not match: continue
            kmg_sect = int(match.group())
            
            skt_list_str = row['Skt_List']
            if not skt_list_str or skt_list_str == "[]": continue
            
            try:
                # Safely parse the list of tuples string
                skt_list = ast.literal_eval(skt_list_str)
                for entry in skt_list:
                    # entry: (chapter, start_v, end_v)
                    ce_ch = entry[0]
                    v_start = entry[1]
                    v_end = entry[2]
                    
                    if v_start is None:
                        # Map the whole chapter
                        mapping[(ce_ch, "all")] = kmg_sect
                    else:
                        # Map a specific range
                        for v in range(int(v_start), int(v_end) + 1):
                            mapping[(ce_ch, v)] = kmg_sect
            except Exception as e:
                print(f"Error parsing Skt_List for KMG {kmg_sect}: {e}")
                
    return mapping

def parse_sanskrit(parva_num):
    """Parses GRETIL HTML for Sanskrit shlokas for a specific Parva."""
    # Filename mapping
    filenam_map = {
        1: "mahabharata-adi-parva-sanskrit-gretil.html",
        2: "mahabharata-sabha-parva-sanskrit-gretil.html",
        3: "mahabharata-aranya-parva-sanskrit-gretil.html"
    }
    
    file_path = os.path.join(BRONZE_DIR, filenam_map.get(parva_num, f"mbh_{parva_num:02}_u.htm"))
    if not os.path.exists(file_path):
        print(f"Sanskrit source not found: {file_path}")
        return {}

    with open(file_path, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, "html.parser")
        text = soup.get_text()

    # Regex for 01,001.001a or 02,001.001a
    pattern = re.compile(r'(\d+),(\d{3})\.(\d{3})([a-z])\s+(.+)')
    
    verses = {} # (chapter, verse) -> [lines]
    
    for line in text.splitlines():
        match = pattern.match(line.strip())
        if match:
            parva = int(match.group(1))
            chapter = int(match.group(2))
            verse_num = int(match.group(3))
            line_id = match.group(4)
            content = match.group(5).replace('<BR>', '').strip()
            
            if parva != parva_num: continue
            
            key = (chapter, verse_num)
            if key not in verses:
                verses[key] = []
            verses[key].append(content)
    
    final_verses = {}
    for key, lines in verses.items():
        final_verses[key] = " / ".join(lines)
    
    return final_verses

def parse_english():
    """Parses KMG Gutenberg HTML for prose sections (Books 1-3)."""
    if not os.path.exists(KMG_FILE):
        print(f"KMG source not found: {KMG_FILE}")
        return {}

    with open(KMG_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    sections = {}
    # Split by SECTION header
    parts = re.split(r'SECTION\s+([I|V|X|L|C|D|M]+)', content)
    
    def roman_to_int(s):
        rom_val = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
        int_val = 0
        for i in range(len(s)):
            if i > 0 and rom_val[s[i]] > rom_val[s[i - 1]]:
                int_val += rom_val[s[i]] - 2 * rom_val[s[i - 1]]
            else:
                int_val += rom_val[s[i]]
        return int_val

    for i in range(1, len(parts), 2):
        num_str = parts[i]
        text_raw = parts[i+1]
        
        soup = BeautifulSoup(text_raw, "html.parser")
        clean_text = soup.get_text(separator=' ').strip()
        clean_text = re.sub(r'\[\d+\]', '', clean_text)
        
        try:
            num = roman_to_int(num_str)
            sections[num] = clean_text
        except:
            continue
            
    return sections

def generate_gold(parva_num):
    print(f"--- Ingesting Mahabharata Parva {parva_num} ---")
    mapping = parse_mapping(parva_num)
    sanskrit = parse_sanskrit(parva_num)
    english = parse_english()
    
    print(f"Loaded {len(sanskrit)} Sanskrit verses and {len(english)} English sections.")
    
    if not sanskrit:
        print("No Sanskrit data extracted. Check patterns.")
        return

    # Group by Chapter
    all_data = {}
    
    for (ch, v), skt in sanskrit.items():
        if ch not in all_data:
            all_data[ch] = []
            
        # Find mapping
        # 1. Check specific verse mapping
        kmg_sect = mapping.get((ch, v))
        # 2. Check general chapter mapping
        if kmg_sect is None:
            kmg_sect = mapping.get((ch, "all"))
        
        kmg_content = "Translation pending alignment."
        if kmg_sect:
            kmg_content = english.get(kmg_sect, f"Section {kmg_sect} not found in KMG source.")

        verse_obj = {
            "id": f"mahabharata_{parva_num}_{ch}_{v}",
            "text_slug": "mahabharata",
            "parva": parva_num,
            "chapter": ch,
            "verse": v,
            "original": skt,
            "meaning": "See KMG Translation layer.",
            "layers": [
                {
                    **KMG_META,
                    "lang": "en",
                    "type": "translation",
                    "content": kmg_content
                }
            ]
        }
        all_data[ch].append(verse_obj)

    # Save to Gold
    parva_dir = os.path.join(GOLD_DIR, f"parva-{parva_num}")
    os.makedirs(parva_dir, exist_ok=True)
    
    for ch, verses in all_data.items():
        file_path = os.path.join(parva_dir, f"adhyaya-{ch}.json")
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(verses, f, indent=2, ensure_ascii=False)
        if ch % 10 == 0:
            print(f"  Processed Adhyaya {ch}")
            
    print(f"Successfully processed Parva {parva_num}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.print_help() # rule 4.2
    parser.add_argument("--parva", type=int, default=1, help="Parva number to process")
    args = parser.parse_args()
    
    generate_gold(args.parva)
