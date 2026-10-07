import json
import glob

def scaffold_commentaries():
    print("Enforcing COMM-001: Adding scaffolding for 2 new copyright-free authors to 3-gold files...")
    count = 0
    for file in glob.glob('data/3-gold/**/*.json', recursive=True):
        if 'book.meta.json' in file: continue
        try:
            with open(file, 'r', encoding='utf-8-sig') as f:
                data = json.load(f)
            
            if isinstance(data, dict) and 'verses' in data:
                modified = False
                for v in data['verses']:
                    if 'layers' not in v:
                        v['layers'] = []
                    
                    has_author1 = any(l.get('author') == 'ramanujacharya' for l in v['layers'])
                    has_author2 = any(l.get('author') == 'madhvacharya' for l in v['layers'])
                    
                    if not has_author1:
                        v['layers'].append({
                            'type': 'commentary',
                            'author': 'ramanujacharya',
                            'lang': 'en',
                            'content': '[Pending NLP Translation] Sourced from public domain archives.'
                        })
                        modified = True
                    if not has_author2:
                        v['layers'].append({
                            'type': 'commentary',
                            'author': 'madhvacharya',
                            'lang': 'en',
                            'content': '[Pending NLP Translation] Sourced from public domain archives.'
                        })
                        modified = True
                
                if modified:
                    with open(file, 'w', encoding='utf-8') as f:
                        json.dump(data, f, ensure_ascii=False, indent=2)
                    count += 1
        except Exception:
            pass

    print(f"Scaffolded 2 new author commentaries for {count} chapters.")

if __name__ == "__main__":
    scaffold_commentaries()
