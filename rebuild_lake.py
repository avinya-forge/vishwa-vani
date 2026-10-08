import os
import json
import sqlite3
import glob

def rebuild():
    db_path = 'public/vedic-lake.db'
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS verses (
        id TEXT PRIMARY KEY,
        text_slug TEXT,
        chapter INTEGER,
        verse INTEGER,
        slok TEXT,
        transliteration TEXT,
        content JSON
    )
    """)
    
    cursor.execute("DELETE FROM verses")
    
    count = 0
    for file_path in glob.glob('data/3-gold/**/*.json', recursive=True):
        if 'book.meta.json' in file_path:
            continue
            
        with open(file_path, 'r', encoding='utf-8-sig') as f:
            try:
                data = json.load(f)
                verses = []
                text_slug = ""
                chapter = 0

                if isinstance(data, list):
                    verses = data
                elif isinstance(data, dict):
                    verses = data.get('verses', [])
                    text_slug = data.get('text', '')
                    chapter = data.get('chapter', 0)
                
                for v in verses:
                    v_text = v.get('text_slug') or text_slug
                    v_chapter = v.get('chapter') or chapter
                    verse_id = v.get('id', f"{v_text}_{v_chapter}_{v.get('verse', 0)}")
                    slok = v.get('slok') or v.get('original') or v.get('sanskrit') or ''
                    trans = v.get('transliteration', '')
                    content = json.dumps(v, ensure_ascii=False)
                    
                    cursor.execute("""
                        INSERT OR REPLACE INTO verses (id, text_slug, chapter, verse, slok, transliteration, content)
                        VALUES (?, ?, ?, ?, ?, ?, ?)
                    """, (verse_id, v_text, v_chapter, v.get('verse', 0), slok, trans, content))
                    count += 1
            except Exception as e:
                print(f"Error reading {file_path}: {e}")
                
    conn.commit()
    conn.close()
    print(f"Successfully rebuilt vedic-lake.db with {count} verses from 3-gold!")

if __name__ == '__main__':
    rebuild()
