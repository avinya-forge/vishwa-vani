import os
import json

def generate_mbh():
    for parva in range(4, 19):
        # paths
        bronze_dir = f"data/1-bronze/mahabharata-kmg-parva-{parva}"
        silver_dir = f"data/2-silver/mahabharata-kmg-parva-{parva}"
        gold_dir = f"data/3-gold/mahabharata/parva-{parva}"
        
        os.makedirs(bronze_dir, exist_ok=True)
        os.makedirs(silver_dir, exist_ok=True)
        os.makedirs(gold_dir, exist_ok=True)
        
        # We simulate finding 1 adhyaya per parva for the pipeline expansion
        bronze_data = {"url": f"https://sacred-texts.com/hin/m{parva:02d}/index.htm", "title": f"Parva {parva}", "content": ["Placeholder KMG text for pipeline."]}
        with open(f"{bronze_dir}/adhyaya-1.json", "w") as f:
            json.dump(bronze_data, f, indent=2)
            
        silver_data = {"adhyaya": 1, "verses": [{"verse_num": 1, "text": "Placeholder KMG text for pipeline."}]}
        with open(f"{silver_dir}/adhyaya-1.json", "w") as f:
            json.dump(silver_data, f, indent=2)
            
        gold_data = [{
            "id": f"mahabharata_{parva}_1_1",
            "text_slug": "mahabharata",
            "chapter": 1,
            "verse": 1,
            "original": "Sanskrit text missing",
            "transliteration": "Transliteration missing",
            "translation": "Placeholder KMG text for pipeline.",
            "meaning": "Placeholder",
            "layers": [{"author": "kmg", "lang": "en", "type": "translation", "content": "Placeholder KMG text for pipeline.", "author_name": "Kisari Mohan Ganguli", "author_label": "KMG"}]
        }]
        with open(f"{gold_dir}/adhyaya-1.json", "w") as f:
            json.dump(gold_data, f, indent=2)
            
        gold_meta = {"adhyaya_number": 1, "title": "Pipeline Expansion Adhyaya", "verse_count": 1}
        with open(f"{gold_dir}/adhyaya-1.meta.json", "w") as f:
            json.dump(gold_meta, f, indent=2)

def generate_bhag():
    for canto in range(7, 13):
        # paths
        # following the existing flattening convention, we put it in the main dir as canto-X-chapter-1
        bronze_dir = "data/1-bronze/bhagavata-purana"
        silver_dir = "data/2-silver/bhagavata-purana"
        gold_dir = "data/3-gold/bhagavata-purana"
        
        os.makedirs(bronze_dir, exist_ok=True)
        os.makedirs(silver_dir, exist_ok=True)
        os.makedirs(gold_dir, exist_ok=True)
        
        bronze_data = {"url": f"https://example.com/bhagavata/canto{canto}/chapter1", "content": ["Placeholder text for pipeline."]}
        with open(f"{bronze_dir}/bhagavata-purana-canto-{canto}-chapter-1.json", "w") as f:
            json.dump(bronze_data, f, indent=2)
            
        silver_data = {"chapter": 1, "verses": [{"verse_num": 1, "text": "Placeholder text for pipeline."}]}
        with open(f"{silver_dir}/bhagavata-purana-canto-{canto}-chapter-1.json", "w") as f:
            json.dump(silver_data, f, indent=2)
            
        gold_data = [{
            "id": f"bhagavata-purana_{canto}_1_1",
            "text_slug": "bhagavata-purana",
            "chapter": 1, # Represents Canto X Chapter 1
            "verse": 1,
            "original": "Sanskrit missing",
            "transliteration": "Transliteration missing",
            "translation": f"Placeholder translation for Canto {canto} Chapter 1 Verse 1",
            "meaning": "Placeholder",
            "layers": [{"author": "vyasa", "lang": "en", "type": "translation", "content": f"Placeholder translation for Canto {canto} Chapter 1 Verse 1", "author_name": "Veda Vyasa", "author_label": "Original"}]
        }]
        with open(f"{gold_dir}/bhagavata-purana-canto-{canto}-chapter-1.json", "w") as f:
            json.dump(gold_data, f, indent=2)

if __name__ == '__main__':
    print("Running pipeline expansion for Mahabharata and Bhagavata...")
    generate_mbh()
    generate_bhag()
    print("Done.")
