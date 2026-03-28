import json
import os

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def check_gita():
    print("=== Bhagavad Gita Chapter 1 ===")
    path = os.path.join(BASE, "data", "3-gold", "bhagavad-gita", "bhagavad-gita-chapter-1.json")
    with open(path, "r", encoding="utf-8") as f:
        ch1 = json.load(f)
    
    v1 = ch1[0]
    print(f"Total verses: {len(ch1)}")
    print(f"First verse ID: {v1.get('id')}")
    print(f"Has original Sanskrit: {bool(v1.get('original'))}")
    print(f"Has transliteration: {bool(v1.get('transliteration'))}")
    
    authors = [l["author"] for l in v1.get("layers", [])]
    print(f"Layers in verse 1: {authors}")
    
    all_authors = set()
    for v in ch1:
        for l in v.get("layers", []):
            all_authors.add(l["author"])
    print(f"All unique authors across chapter: {sorted(all_authors)}")
    print()

def check_mahabharata():
    print("=== Mahabharata Sabha Parva (Book 2) ===")
    parva2 = os.path.join(BASE, "data", "3-gold", "mahabharata", "parva-2")
    files = [f for f in os.listdir(parva2) if f.endswith(".json")]
    print(f"Total adhyayas in Sabha Parva: {len(files)}")
    
    with open(os.path.join(parva2, "adhyaya-1.json"), "r", encoding="utf-8") as f:
        adh1 = json.load(f)
    
    v1 = adh1[0]
    print(f"Adhyaya 1 verse count: {len(adh1)}")
    print(f"First verse ID: {v1.get('id')}")
    print(f"Has Sanskrit: {bool(v1.get('original'))}")
    print(f"Has transliteration: {bool(v1.get('transliteration'))}")
    print(f"Layers: {[l['author'] for l in v1.get('layers', [])]}")
    print()
    
    print("=== Mahabharata Aranya Parva (Book 3) ===")
    parva3 = os.path.join(BASE, "data", "3-gold", "mahabharata", "parva-3")
    files3 = [f for f in os.listdir(parva3) if f.endswith(".json")]
    print(f"Total adhyayas in Aranya Parva: {len(files3)}")
    print()

def check_manifest():
    print("=== Manifest Summary ===")
    path = os.path.join(BASE, "data", "manifest.json")
    with open(path, "r", encoding="utf-8") as f:
        manifest = json.load(f)
    
    for book in manifest["books"]:
        print(f"  {book['slug']}: {book.get('total_verses', 0)} verses, {book.get('total_chapters', 0)} chapters, {len(book.get('shards', []))} shards")

if __name__ == "__main__":
    check_gita()
    check_mahabharata()
    check_manifest()
    print("=== Audit Complete ===")
