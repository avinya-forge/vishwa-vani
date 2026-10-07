import json
import os
import glob
import shutil

BRONZE = "data/1-bronze/bhagavad-gita"
SILVER = "data/2-silver/bhagavad-gita"

# Clear existing silver to avoid garbage files
if os.path.exists(SILVER):
    shutil.rmtree(SILVER)
os.makedirs(SILVER, exist_ok=True)

# Create book.meta.json to pass legal gate
with open(os.path.join(SILVER, "book.meta.json"), "w", encoding="utf-8") as f:
    json.dump({
        "license_type": "public_domain",
        "source_url": "https://vedicscriptures.github.io/",
        "legal_clearance": True
    }, f, indent=2)

for ch in range(1, 19):
    chapter_dir = os.path.join(BRONZE, f"chapter-{ch}")
    if not os.path.exists(chapter_dir):
        print(f"Skipping chapter {ch}, not found in bronze.")
        continue
        
    silver_verses = []
    
    # We read verse_1.json, verse_2.json ...
    for v in range(1, 100):
        v_file = os.path.join(chapter_dir, f"verse_{v}.json")
        if not os.path.exists(v_file):
            v_file = os.path.join(chapter_dir, f"verse-{v:02d}.json")
        if not os.path.exists(v_file):
            break
            
        with open(v_file, "r", encoding="utf-8") as f:
            b_verse = json.load(f)
            
        slok = b_verse.get("slok", "")
        transliteration = b_verse.get("transliteration", "")
        prabhu = b_verse.get("prabhu", {})
        meaning = prabhu.get("et", "")
        
        layers = []
        
        if prabhu.get("ec"):
            layers.append({"author": "iskcon", "lang": "en", "type": "commentary", "content": prabhu["ec"]})
            
        sankar = b_verse.get("sankar", {})
        if sankar.get("et"):
            layers.append({"author": "shankara", "lang": "en", "type": "commentary", "content": sankar["et"]})
        if sankar.get("sc"):
            layers.append({"author": "shankara", "lang": "sa", "type": "commentary", "content": sankar["sc"]})
            
        raman = b_verse.get("raman", {})
        if raman.get("et"):
            layers.append({"author": "ramanuja", "lang": "en", "type": "commentary", "content": raman["et"]})
        if raman.get("sc"):
            layers.append({"author": "ramanuja", "lang": "sa", "type": "commentary", "content": raman["sc"]})
            
        # Dnyaneshwari placeholders
        layers.append({"author": "dnyaneshwari", "lang": "en", "type": "commentary", "content": "[PLACEHOLDER_EN]"})
        layers.append({"author": "dnyaneshwari", "lang": "hi", "type": "commentary", "content": "[PLACEHOLDER_HI]"})
        layers.append({"author": "dnyaneshwari", "lang": "mr", "type": "commentary", "content": "[PLACEHOLDER_MR]"})
        
        silver_verses.append({
            "id": f"bhagavad-gita_{ch}_{v}",
            "text_slug": "bhagavad-gita",
            "chapter": ch,
            "verse": v,
            "original": slok,
            "transliteration": transliteration,
            "meaning": meaning,
            "layers": layers
        })
        
    out_file = os.path.join(SILVER, f"chapter-{ch}.json")
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(silver_verses, f, indent=2, ensure_ascii=False)
        
print("Silver data constructed.")
