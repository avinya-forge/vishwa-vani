import json
import os
from pathlib import Path
import re

def is_placeholder(text):
    if not text: return True
    text = text.strip()
    placeholders = [
        r"^\[.*\]$", # Matches [Continuation], [SECTION I], [SANSKRIT_VERSE]
        r"^SANSKRIT_MISSING$",
        r"^Loading\.\.\.$"
    ]
    for p in placeholders:
        if re.match(p, text, re.IGNORECASE):
            return True
    return False

def consolidate_book(slug):
    root = Path("d:/Code/avinya-forge/vishwa-vani")
    gold_dir = root / "data/3-gold" / slug
    if not gold_dir.exists(): 
        print(f"Directory {gold_dir} not found.")
        return

    for json_file in gold_dir.glob("*.json"):
        print(f"Consolidating: {json_file.name}")
        with open(json_file, 'r', encoding='utf-8') as f:
            try:
                data = json.load(f)
            except Exception as e:
                print(f"  Error loading {json_file.name}: {e}")
                continue

        if not isinstance(data, list): continue

        new_data = []
        current_block = None

        for verse in data:
            if not isinstance(verse, dict): continue
            
            original = verse.get("original") or ""
            is_prose = is_placeholder(original)
            
            if is_prose:
                # Store the placeholder in ai_metadata if it was a section title
                placeholder_val = original.strip()
                
                if current_block is None:
                    current_block = verse
                    current_block["original"] = "" # Clear placeholder
                    current_block["type"] = "narrative_block"
                else:
                    # Merge layers
                    for layer in verse.get("layers", []):
                        if not isinstance(layer, dict): continue
                        
                        target = next((l for l in current_block["layers"] 
                                     if l.get("author") == layer.get("author") and l.get("lang") == layer.get("lang")), None)
                        if target:
                            content_to_add = layer.get("content", "").strip()
                            # Basic de-duplication of sentence fragments
                            if content_to_add and content_to_add not in target["content"]:
                                # If the target content ends with a fragment of the new content, merge intelligently
                                target["content"] += " " + content_to_add
                        else:
                            current_block["layers"].append(layer)
            else:
                if current_block:
                    new_data.append(current_block)
                    current_block = None
                new_data.append(verse)
        
        if current_block:
            new_data.append(current_block)

        # Final pass to clean up merged text (remove double spaces, fix common PDF artifacts)
        for v in new_data:
            for l in v.get("layers", []):
                l["content"] = re.sub(r'\s+', ' ', l["content"]).strip()

        # Update IDs and Verses
        final_list = []
        for i, v in enumerate(new_data):
            v["verse"] = i + 1
            v["id"] = f"{slug}_{v['chapter']}_{i}"
            final_list.append(v)

        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(final_list, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    consolidate_book("mahabharata")
