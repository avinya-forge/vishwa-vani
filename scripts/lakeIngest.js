const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../public/vedic-lake.db');
const DATA_DIR = path.join(__dirname, '../data');

// Delete existing DB to start fresh for PoC
if (fs.existsSync(DB_PATH)) fs.unlinkSync(DB_PATH);

const db = new sqlite3.Database(DB_PATH);

db.serialize(() => {
  console.log('Creating Vedic Lake table...');
  db.run(`
    CREATE TABLE IF NOT EXISTS verses (
      id TEXT PRIMARY KEY,
      text_slug TEXT,
      chapter INTEGER,
      verse INTEGER,
      slok TEXT,
      transliteration TEXT,
      content JSON
    )
  `);

  const stmt = db.prepare('INSERT INTO verses VALUES (?, ?, ?, ?, ?, ?, ?)');

  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
  console.log(`Found ${files.length} JSON files for ingestion.`);

  files.forEach(file => {
    // Example filename: bhagavad_gita_chapter_1.json
    const slugMatch = file.match(/^(.+)_chapter_(\d+)\.json$/);
    if (!slugMatch) return;

    const textSlug = slugMatch[1].replace(/_/g, '-');
    const chapter = parseInt(slugMatch[2]);

    const rawData = fs.readFileSync(path.join(DATA_DIR, file), 'utf8');
    const verses = JSON.parse(rawData);

    verses.forEach(v => {
      const id = `${textSlug}_${chapter}_${v.verse}`;
      stmt.run(
        id,
        textSlug,
        chapter,
        v.verse,
        v.slok,
        v.transliteration,
        JSON.stringify(v)
      );
    });
    console.log(`Ingested ${verses.length} verses from ${file}`);
  });

  stmt.finalize();
  console.log('Vedic Lake population complete.');
});

db.close();
