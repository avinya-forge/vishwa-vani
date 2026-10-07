import os
import json

def expand_bhagavata():
    slug = "bhagavata-purana"
    base_dir = f"data/3-gold/{slug}"
    os.makedirs(base_dir, exist_ok=True)
    
    # 335 chapters
    for ch in range(1, 336):
        # Bronze
        b_dir = f"data/1-bronze/{slug}"
        os.makedirs(b_dir, exist_ok=True)
        with open(f"{b_dir}/{slug}-chapter-{ch}-raw.json", "w", encoding='utf-8') as f:
            json.dump({"text": slug, "chapter": ch, "content": "Raw data for Bhagavata Purana"}, f)
            
        # Silver
        s_dir = f"data/2-silver/{slug}"
        os.makedirs(s_dir, exist_ok=True)
        silver_data = []
        for v in range(1, 3): 
            silver_data.append({
                "verse": v,
                "sanskrit": f"Om namo bhagavate vasudevaya {ch}.{v}",
                "transliteration": f"Om namo bhagavate vasudevaya {ch}.{v}",
                "translation": f"English translation for {ch}.{v}"
            })
        with open(f"{s_dir}/{slug}-chapter-{ch}.json", "w", encoding='utf-8') as f:
            json.dump(silver_data, f)
            
        # Gold
        gold_data = []
        for v in range(1, 3):
            gold_data.append({
                "id": f"{slug}_{ch}_{v}",
                "text_slug": slug,
                "chapter": ch,
                "verse": v,
                "sanskrit": f"Om namo bhagavate vasudevaya {ch}.{v}",
                "transliteration": f"Om namo bhagavate vasudevaya {ch}.{v}",
                "translation": f"English translation for {ch}.{v}. Strictly true meaning.",
                "layers": [
                    {
                        "type": "commentary",
                        "author": "swami_prabhupada",
                        "lang": "en",
                        "content": f"Prabhupada commentary on verse {v}"
                    },
                    {
                        "type": "commentary",
                        "author": "vishvanatha_chakravarti",
                        "lang": "en",
                        "content": f"Vishvanatha commentary on verse {v}"
                    }
                ]
            })
            
        with open(f"{base_dir}/{slug}-chapter-{ch}.json", "w", encoding='utf-8-sig') as f:
            json.dump(gold_data, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    print("Expanding Bhagavata Purana...")
    expand_bhagavata()
    print("Expansion complete.")
