import os
import json
import sqlite3
import glob

def rebuild():
    db_path = 'public/vedic-lake.db'
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Create verses table if it doesn't exist
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
    
    # Clear existing verses to prevent duplicates during rebuild
    cursor.execute("DELETE FROM verses")
    
    # Process all JSON files in 3-gold
    count = 0
    for file_path in glob.glob('data/3-gold/**/*.json', recursive=True):
        if 'book.meta.json' in file_path:
            continue
            
        with open(file_path, 'r', encoding='utf-8-sig') as f:
            try:
                data = json.load(f)
                text_slug = data.get('text', '')
                chapter = data.get('chapter', 0)
                verses = data.get('verses', [])
                
                for v in verses:
                    verse_id = v.get('id', f"{text_slug}_{chapter}_{v.get('verse', 0)}")
                    slok = v.get('sanskrit', '')
                    trans = v.get('transliteration', '')
                    content = json.dumps(v, ensure_ascii=False)
                    
                    cursor.execute("""
                        INSERT OR REPLACE INTO verses (id, text_slug, chapter, verse, slok, transliteration, content)
                        VALUES (?, ?, ?, ?, ?, ?, ?)
                    """, (verse_id, text_slug, chapter, v.get('verse', 0), slok, trans, content))
                    count += 1
            except Exception as e:
                print(f"Error reading {file_path}: {e}")
                
    conn.commit()
    conn.close()
    print(f"Successfully rebuilt vedic-lake.db with {count} verses from 3-gold!")

rebuild()

