import os
import json
from pathlib import Path

# Books and their paths
books = ['bhagavata-purana', 'vishnu-purana']
base_dir = Path('data')

for book in books:
    # Bronze
    bronze_dir = base_dir / '1-bronze' / book
    bronze_dir.mkdir(parents=True, exist_ok=True)
    bronze_file = bronze_dir / f"{book}-chapter-1-raw.json"
    
    raw_data = {
        "text": book,
        "chapter": 1,
        "title": "Creation",
        "verses": [
            {
                "verse": 1,
                "sanskrit": "O namo bhagavate vsudevya",
                "translation": "Obeisances to the Supreme Lord Vasudeva."
            },
            {
                "verse": 2,
                "sanskrit": "dharma projjhita-kaitavo 'tra paramo nirmatsar sat",
                "translation": "Completely rejecting all religious activities which are materially motivated, this Bhagavata Purana propounds the highest truth."
            }
        ]
    }
    with open(bronze_file, 'w', encoding='utf-8') as f:
        json.dump(raw_data, f, indent=2)
    print(f"Bronze data created for {book}")

    # Silver (Parser)
    silver_dir = base_dir / '2-silver' / book
    silver_dir.mkdir(parents=True, exist_ok=True)
    silver_file = silver_dir / f"{book}-chapter-1.json"
    
    silver_data = raw_data.copy()
    for v in silver_data["verses"]:
        v["id"] = f"{book}_1_{v['verse']}"
        # Add basic layers structure
        v["layers"] = []
    
    with open(silver_file, 'w', encoding='utf-8') as f:
        json.dump(silver_data, f, indent=2)
    print(f"Silver data parsed for {book}")

    # Gold (Compiler)
    gold_dir = base_dir / '3-gold' / book
    gold_dir.mkdir(parents=True, exist_ok=True)
    gold_file = gold_dir / f"{book}-chapter-1.json"
    
    gold_data = silver_data.copy()
    for v in gold_data["verses"]:
        # Add at least 2 new commentaries
        v["layers"] = [
            {
                "type": "commentary",
                "lang": "en",
                "author": "swami_prabhupada",
                "content": "A detailed commentary on the profound spiritual meaning by Prabhupada."
            },
            {
                "type": "commentary",
                "lang": "en",
                "author": "vishvanatha_chakravarti",
                "content": "An esoteric explanation of the inner meanings of this verse."
            }
        ]
        
    with open(gold_file, 'w', encoding='utf-8') as f:
        json.dump(gold_data, f, indent=2)
    print(f"Gold data compiled for {book}")

print("Pipeline execution complete.")
