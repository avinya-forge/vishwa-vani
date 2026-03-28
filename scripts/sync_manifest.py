import os
import json

GOLD_DIR = "d:/Code/avinya-forge/vishwa-vani/data/3-gold"
MANIFEST_PATH = "d:/Code/avinya-forge/vishwa-vani/data/manifest.json"

def sync_manifest():
    print("--- Syncing Universal Scriptural Manifest ---")
    
    # Load existing manifest to preserve metadata
    with open(MANIFEST_PATH, 'r', encoding='utf-8') as f:
        manifest = json.load(f)

    # Dictionary for books by slug
    book_map = {b['slug']: b for b in manifest['books']}

    # Iterate over directories in gold
    for book_slug in os.listdir(GOLD_DIR):
        book_path = os.path.join(GOLD_DIR, book_slug)
        if not os.path.isdir(book_path): continue
        
        if book_slug not in book_map:
            print(f"Adding new book profile: {book_slug}")
            book_map[book_slug] = {
                "slug": book_slug,
                "total_chapters": 0,
                "total_verses": 0,
                "languages": ["en"],
                "shards": [],
                "completeness": 0
            }

        book = book_map[book_slug]
        shards = []
        total_verses = 0
        total_chapters = 0

        # Special handling for Mahabharata (Nested Parvas)
        if book_slug == "mahabharata":
            for parva_dir in sorted(os.listdir(book_path)):
                parva_path = os.path.join(book_path, parva_dir)
                if not os.path.isdir(parva_path): continue
                
                for adhyaya_file in sorted(os.listdir(parva_path), key=lambda x: int(re.search(r'\d+', x).group()) if re.search(r'\d+', x) else 0):
                    if not adhyaya_file.endswith(".json"): continue
                    
                    with open(os.path.join(parva_path, adhyaya_file), 'r', encoding='utf-8') as f:
                        verses = json.load(f)
                    
                    v_count = len(verses)
                    shards.append({
                        "id": f"{parva_dir}_{adhyaya_file.replace('.json', '')}",
                        "file": f"{parva_dir}/{adhyaya_file}",
                        "verses": v_count
                    })
                    total_verses += v_count
                    total_chapters += 1
        else:
            # Handle standard flat books (like Bhagavad Gita)
            for shard_file in sorted(os.listdir(book_path)):
                if not shard_file.endswith(".json"): continue
                
                with open(os.path.join(book_path, shard_file), 'r', encoding='utf-8') as f:
                    verses = json.load(f)
                
                v_count = len(verses)
                shards.append({
                    "file": shard_file,
                    "verses": v_count
                })
                total_verses += v_count
                total_chapters += 1

        book['shards'] = shards
        book['total_verses'] = total_verses
        book['total_chapters'] = total_chapters
        book['completeness'] = 100.0 if total_verses > 0 else 0

    manifest['books'] = list(book_map.values())
    
    with open(MANIFEST_PATH, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)
        
    print(f"Manifest Synchronized: {len(manifest['books'])} books tracked.")

if __name__ == "__main__":
    import re
    sync_manifest()
