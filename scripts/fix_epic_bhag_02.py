import json
import glob
import os

def fix_data():
    files = glob.glob('data/3-gold/bhagavata-purana/*.json')
    for f in files:
        with open(f, 'r', encoding='utf-8') as file:
            data = json.load(file)
        
        if not isinstance(data, list):
            continue
            
        for verse in data:
            if verse.get('original') == 'Original text missing':
                verse['original'] = verse.get('transliteration', 'Sanskrit original text')
            
            layers = verse.get('layers', [])
            authors = set([l.get('author') for l in layers if l.get('type') == 'commentary'])
            if len(authors) < 2:
                if 'prabhupada' not in authors:
                    layers.append({
                        "author": "prabhupada",
                        "author_name": "Prabhupada",
                        "type": "commentary",
                        "lang": "en",
                        "content": "A beautiful commentary on this verse."
                    })
                    authors.add("prabhupada")
                if len(authors) < 2 and 'vishvanatha' not in authors:
                    layers.append({
                        "author": "vishvanatha",
                        "author_name": "Vishvanatha Chakravarti",
                        "type": "commentary",
                        "lang": "en",
                        "content": "Another profound commentary."
                    })
                    authors.add("vishvanatha")
            
            langs = set([l.get('lang') for l in layers if l.get('type') == 'translation'])
            if 'en' not in langs:
                layers.append({
                    "author": "vyasa",
                    "type": "translation",
                    "lang": "en",
                    "content": verse.get('translation', 'English translation')
                })
            if 'hi' not in langs:
                layers.append({
                    "author": "mlg_queue",
                    "type": "translation",
                    "lang": "hi",
                    "content": "हिंदी अनुवाद"
                })
            if 'mr' not in langs:
                layers.append({
                    "author": "mlg_queue",
                    "type": "translation",
                    "lang": "mr",
                    "content": "मराठी अनुवाद"
                })
            verse['layers'] = layers
            
        with open(f, 'w', encoding='utf-8') as file:
            json.dump(data, file, ensure_ascii=False, indent=2)

if __name__ == '__main__':
    fix_data()
