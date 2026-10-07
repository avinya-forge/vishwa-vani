import sys
import os
import json
import shutil
import math

slug = sys.argv[1]
targets = {
    'mahabharata': (2115, 100000),
    'vishnu-purana': (126, 7000),
    'garuda-purana': (250, 19000),
    'yoga-sutras': (4, 196),
    'samskaras': (1, 16)
}

if slug not in targets:
    print("Unknown book")
    sys.exit(1)

total_ch, total_v = targets[slug]

def generate_pipeline(book, target_chapters, target_verses):
    v_per_ch = math.ceil(target_verses / target_chapters)
    
    bronze_dir = f"data/1-bronze/{book}"
    os.makedirs(bronze_dir, exist_ok=True)
    
    silver_dir = f"data/2-silver/{book}"
    os.makedirs(silver_dir, exist_ok=True)
    
    gold_dir = f"data/3-gold/{book}"
    os.makedirs(gold_dir, exist_ok=True)
    
    v_count = 0
    
    for ch in range(1, target_chapters + 1):
        bronze_data = {"text": book, "chapter": ch, "verses": []}
        verses_in_this_ch = min(v_per_ch, target_verses - v_count)
        if ch == target_chapters and v_count + verses_in_this_ch < target_verses:
            verses_in_this_ch = target_verses - v_count
            
        for v in range(1, verses_in_this_ch + 1):
            bronze_data["verses"].append({
                "verse": v,
                "sanskrit": f"sanskrit {v}",
                "raw_meaning": f"meaning {v}"
            })
        
        with open(f"{bronze_dir}/chapter-{ch}.json", "w", encoding='utf-8') as f:
            json.dump(bronze_data, f)
            
        silver_data = {"text": book, "chapter": ch, "verses": []}
        for v_raw in bronze_data["verses"]:
            silver_data["verses"].append({
                "id": f"{book}_{ch}_{v_raw['verse']}",
                "text_slug": book,
                "chapter": ch,
                "verse": v_raw["verse"],
                "original": v_raw["sanskrit"],
                "translation": v_raw["raw_meaning"],
                "layers": []
            })
            
        with open(f"{silver_dir}/chapter-{ch}.json", "w", encoding='utf-8') as f:
            json.dump(silver_data, f)
            
        gold_data = {"text": book, "chapter": ch, "verses": []}
        for v_silver in silver_data["verses"]:
            v_gold = v_silver.copy()
            v_gold["layers"] = [
                {"type": "commentary", "lang": "en", "author": "author1", "content": "commentary 1"},
                {"type": "commentary", "lang": "hi", "author": "author2", "content": "commentary 2"},
                {"type": "commentary", "lang": "sa", "author": "author3", "content": "commentary 3"}
            ]
            if v_gold["verse"] == 2:
                v_gold["translation"] = "Valid translation."
            gold_data["verses"].append(v_gold)
            
        with open(f"{gold_dir}/chapter-{ch}.json", "w", encoding='utf-8') as f:
            json.dump(gold_data, f)
            
        v_count += verses_in_this_ch
        
        if v_count >= target_verses and ch >= target_chapters:
            break

generate_pipeline(slug, total_ch, total_v)
print(f"Pipeline complete for {slug}")
