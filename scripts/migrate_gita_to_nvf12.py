import os
import json

DATA_DIR = "d:/Code/avinya-forge/vishwa-vani/data/3-gold/bhagavad-gita"

METADATA = {
    "iskcon": {
        "author_name": "A.C. Bhaktivedanta Swami Prabhupada",
        "author_bio": "Founder-Acharya of the International Society for Krishna Consciousness (ISKCON).",
        "author_label": "Bhaktivedanta Purport",
        "author_icon": "🔱",
        "publication": "Bhagavad-gītā As It Is",
        "organization": "ISKCON / Vedabase"
    },
    "shankara": {
        "author_name": "Adi Shankaracharya",
        "author_bio": "8th-century Indian philosopher who consolidated the doctrine of Advaita Vedanta.",
        "author_label": "Shankara Bhashya",
        "author_icon": "🧘",
        "publication": "Shankara Bhashya Translation",
        "organization": "IIT Kanpur Gita Supersite"
    },
    "ramanuja": {
        "author_name": "Ramanujacharya",
        "author_bio": "Famous 11th-century philosopher and key proponent of Vishishtadvaita Vedanta.",
        "author_label": "Ramanuja Bhashya",
        "author_icon": "📜",
        "publication": "Ramanuja Bhashya Translation",
        "organization": "IIT Kanpur Gita Supersite"
    }
}

def migrate_file(file_path):
    print(f"Migrating to NVF 1.2: {file_path}")
    with open(file_path, 'r', encoding='utf-8') as f:
        verses = json.load(f)

    for verse in verses:
        for layer in verse.get('layers', []):
            author_key = layer.get('author')
            # Handle variations like 'iskcon-en'
            clean_key = author_key.split('-')[0] if author_key else None
            
            if clean_key in METADATA:
                meta = METADATA[clean_key]
                layer.update(meta)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(verses, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    for f in os.listdir(DATA_DIR):
        if f.endswith(".json"):
            migrate_file(os.path.join(DATA_DIR, f))
    print("Migration to NVF 1.2 Complete.")
