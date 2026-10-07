import os
import sys
import json

def compile_gold(chapter_num):
    silver_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "data", "2-silver", "bhagavad-gita", f"chapter-{chapter_num}"))
    gold_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "data", "3-gold", "bhagavad-gita"))
    
    os.makedirs(gold_dir, exist_ok=True)
    
    meta_path = os.path.join(silver_dir, "chapter_meta.json")
    if not os.path.exists(meta_path):
        print(f"No metadata found in silver for chapter {chapter_num}")
        sys.exit(1)
        
    with open(meta_path, "r", encoding="utf-8") as f:
        meta = json.load(f)
        
    verses_count = meta.get("verses_count", 0)
    print(f"Compiling Chapter {chapter_num} - {verses_count} verses to Gold...")
    
    verses_path = os.path.join(silver_dir, "all_verses.json")
    if not os.path.exists(verses_path):
        print(f"No verses found in silver for chapter {chapter_num}")
        sys.exit(1)
        
    with open(verses_path, "r", encoding="utf-8") as f:
        verses = json.load(f)
        
    if len(verses) != verses_count:
        print(f"ERROR: Verse count mismatch! Expected {verses_count}, got {len(verses)}")
        sys.exit(1)
        
    # Create Markdown Compilation
    md_lines = []
    md_lines.append(f"# Chapter {meta['chapter_number']}: {meta['name']} ({meta['translation']})")
    md_lines.append(f"\n**Meaning**: {meta['meaning']['en']} / {meta['meaning']['hi']}")
    md_lines.append(f"\n**Summary**: {meta['summary']['en']}\n")
    
    for verse in verses:
        md_lines.append(f"## Verse {verse['chapter']}.{verse['verse']}")
        md_lines.append(f"\n**Sanskrit**:\n{verse['sanskrit']}\n")
        md_lines.append(f"**Transliteration**:\n{verse['transliteration']}\n")
        
        # Add English translation if available
        en_translations = [t for t in verse['translations'] if t['lang'] == 'en']
        if en_translations:
            md_lines.append(f"**Translation ({en_translations[0]['author']})**:\n{en_translations[0]['text']}\n")
            
        md_lines.append("---\n")
        
    md_content = "\n".join(md_lines)
    
    md_file = os.path.join(gold_dir, f"chapter_{chapter_num}.md")
    with open(md_file, "w", encoding="utf-8") as f:
        f.write(md_content)
        
    # Also save gold JSON
    gold_json = {
        "chapter_metadata": meta,
        "verses": verses
    }
    json_file = os.path.join(gold_dir, f"chapter_{chapter_num}.json")
    with open(json_file, "w", encoding="utf-8") as f:
        json.dump(gold_json, f, ensure_ascii=False, indent=2)
        
    print(f"Chapter {chapter_num} Gold compilation complete. Validated {len(verses)} verses.")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python compile_gita_gold.py <chapter_number>")
        sys.exit(1)
        
    chapter = int(sys.argv[1])
    compile_gold(chapter)
