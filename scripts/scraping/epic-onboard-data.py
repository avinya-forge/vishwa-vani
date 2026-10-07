import os
import json

base_dir = "data/3-gold"
texts = {
    "yoga-sutras": 4,
    "vishnu-purana": 6,
    "samskaras": 1
}

def generate_mock_json(text_slug, chapter):
    data = []
    for v in range(1, 3):
        item = {
            "id": f"{text_slug}_{chapter}_{v}",
            "text_slug": text_slug,
            "chapter": chapter,
            "verse": v,
            "original": f"Sanskrit for {text_slug} {chapter}.{v}",
            "transliteration": f"Transliteration for {text_slug} {chapter}.{v}",
            "translation": f"English translation for {text_slug} {chapter}.{v}",
            "meaning": f"Meaning for {text_slug} {chapter}.{v}",
            "layers": [
                {
                    "author": "commentary-1",
                    "author_name": "Author 1",
                    "author_bio": "Bio 1",
                    "author_label": "Commentary 1",
                    "author_icon": "C1",
                    "publication": "Pub 1",
                    "organization": "Org 1",
                    "type": "commentary",
                    "lang": "en",
                    "content": f"Commentary 1 for {text_slug} {chapter}.{v}"
                },
                {
                    "author": "commentary-2",
                    "author_name": "Author 2",
                    "author_bio": "Bio 2",
                    "author_label": "Commentary 2",
                    "author_icon": "C2",
                    "publication": "Pub 2",
                    "organization": "Org 2",
                    "type": "commentary",
                    "lang": "hi",
                    "content": f"Commentary 2 for {text_slug} {chapter}.{v} in Hindi"
                },
                {
                    "author": "translation-marathi",
                    "author_name": "Translator MR",
                    "author_bio": "Translator Bio",
                    "author_label": "Marathi Translation",
                    "author_icon": "TR",
                    "publication": "Pub 3",
                    "organization": "Org 3",
                    "type": "translation",
                    "lang": "mr",
                    "content": f"Marathi translation for {text_slug} {chapter}.{v}"
                }
            ]
        }
        data.append(item)
    return data

def main():
    for text, num_chapters in texts.items():
        text_dir = os.path.join(base_dir, text)
        os.makedirs(text_dir, exist_ok=True)
        
        for ch in range(1, num_chapters + 1):
            file_path = os.path.join(text_dir, f"{text}-chapter-{ch}.json")
            with open(file_path, "w", encoding="utf-8") as f:
                json.dump(generate_mock_json(text, ch), f, indent=2, ensure_ascii=False)
            print(f"Generated {file_path}")

if __name__ == "__main__":
    main()
