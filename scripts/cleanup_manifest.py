import json
import os

manifest_path = r'd:\Code\avinya-forge\vishwa-vani\data\manifest.json'
gold_dir = r'd:\Code\avinya-forge\vishwa-vani\data\3-gold'

def cleanup_manifest():
    with open(manifest_path, 'r', encoding='utf-8') as f:
        manifest = json.load(f)

    for book in manifest['books']:
        if book['book_id'] == 'mahabharata':
            # Only keep chapters where the file actually exists
            valid_chapters = []
            for ch in book['chapters']:
                # The file path in manifest is relative to 3-gold or contains it?
                # Usually it's relative to 3-gold/mahabharata if the book path is mahabharata
                # But looking at manifest.json, "file": "mahabharata-chapter-1.json"
                # Let's check where it expects it to be.
                file_path = os.path.join(gold_dir, 'mahabharata', ch['file'])
                if os.path.exists(file_path):
                    valid_chapters.append(ch)
                else:
                    # Check if it's in the parva-X subdirs
                    alt_path = os.path.join(gold_dir, 'mahabharata', ch['file'])
                    if os.path.exists(alt_path):
                        valid_chapters.append(ch)
            
            book['chapters'] = valid_chapters
            book['total_chapters'] = len(valid_chapters)
            book['total_verses'] = sum(ch.get('verse_count', 0) for ch in valid_chapters)
            book['status'] = 'SILVER' # Downgrading because it's incomplete
            print(f"Cleaned Mahabharata: {len(valid_chapters)} valid chapters found.")

    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    cleanup_manifest()
