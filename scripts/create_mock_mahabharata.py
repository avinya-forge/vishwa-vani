import os
import json

os.makedirs('data/3-gold/mahabharata', exist_ok=True)
for i in range(1, 19):
    file_path = f'data/3-gold/mahabharata/mahabharata-chapter-{i}.json'
    with open(file_path, 'w') as f:
        json.dump([
            {
                "id": f"mahabharata_{i}_1",
                "text_slug": "mahabharata",
                "chapter": i,
                "verse": 1,
                "original": f"Mock Verse {i}.1",
                "transliteration": f"Mock Transliteration {i}.1",
                "layers": []
            }
        ], f)
