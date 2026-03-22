const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../public/itihasa-lake.db');
const DATA_DIR = path.join(__dirname, '../data');

async function ingest() {
  const db = new sqlite3.Database(DB_PATH);
  
  db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS verses`);
    db.run(`CREATE TABLE verses (
      id TEXT PRIMARY KEY,
      text_slug TEXT,
      chapter INTEGER,
      verse INTEGER,
      slok TEXT,
      transliteration TEXT,
      content JSON
    )`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_verses_lookup ON verses(text_slug, chapter, verse)`);
  });

  for (let chapterId = 1; chapterId <= 18; chapterId++) {
    const filePath = path.join(DATA_DIR, `mahabharata_chapter_${chapterId}.json`);
    if (!fs.existsSync(filePath)) {
      console.log(`Skipping Chapter ${chapterId} - not found`);
      continue;
    }

    console.log(`Ingesting Chapter ${chapterId}...`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    await new Promise((resolve, reject) => {
      db.serialize(() => {
        db.run('BEGIN TRANSACTION');
        const stmt = db.prepare(`REPLACE INTO verses (id, text_slug, chapter, verse, slok, transliteration, content) VALUES (?, ?, ?, ?, ?, ?, ?)`);
        
        data.forEach(v => {
          stmt.run(
            v.id,
            'mahabharata',
            v.chapter,
            v.verse,
            v.original || "",
            v.transliteration || "",
            JSON.stringify(v)
          );
        });
        
        stmt.finalize();
        db.run('COMMIT', (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    });
    console.log(`Finished Chapter ${chapterId}`);
  }

  db.close();
  console.log('Ingestion of Mahabharata complete.');
}

ingest().catch(console.error);
