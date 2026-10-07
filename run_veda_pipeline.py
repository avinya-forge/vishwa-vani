import os
import json
from pathlib import Path

books = ["rigveda", "samaveda", "yajurveda", "atharvaveda"]
base_dir = Path("data")

for book in books:
    # Bronze
    bronze_dir = base_dir / "1-bronze" / book
    bronze_dir.mkdir(parents=True, exist_ok=True)
    bronze_file = bronze_dir / f"chapter-1.json"
    
    raw_data = {
        "text": book,
        "chapter": 1,
        "title": "Creation",
        "verses": [
            {
                "verse": 1,
                "sanskrit": "agni\u1e41 \u012b\u1e0de purohita\u1e41 yaj\u00f1asya devam \u1e5btvijam",
                "translation": "I praise Agni, the chosen priest, god, minister of sacrifice."
            },
            {
                "verse": 2,
                "sanskrit": "agnih p\u016brvebhir \u1e5b\u1e63ibhir \u012b\u1e0dyo n\u016btanair uta",
                "translation": "Agni, worthy to be praised by ancient and modern seers."
            }
        ]
    }
    with open(bronze_file, "w", encoding="utf-8") as f:
        json.dump(raw_data, f, indent=2)
    print(f"Bronze data created for {book}")

    # Silver (Parser)
    silver_dir = base_dir / "2-silver" / book
    silver_dir.mkdir(parents=True, exist_ok=True)
    silver_file = silver_dir / f"chapter-1.json"
    
    silver_data = raw_data.copy()
    for v in silver_data["verses"]:
        v["id"] = f"{book}_1_{v['verse']}"
        v["layers"] = []
    
    with open(silver_file, "w", encoding="utf-8") as f:
        json.dump(silver_data, f, indent=2)
    print(f"Silver data parsed for {book}")

    # Gold (Compiler)
    gold_dir = base_dir / "3-gold" / book
    gold_dir.mkdir(parents=True, exist_ok=True)
    gold_file = gold_dir / f"chapter-1.json"
    
    gold_data = silver_data.copy()
    for v in gold_data["verses"]:
        v["layers"] = [
            {
                "type": "commentary",
                "lang": "en",
                "author": "sayana",
                "content": "Commentary on the verse."
            }
        ]
        
    with open(gold_file, "w", encoding="utf-8") as f:
        json.dump(gold_data, f, indent=2)
    print(f"Gold data compiled for {book}")

print("Pipeline execution complete.")
