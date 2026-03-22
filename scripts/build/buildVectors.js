const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// PoC for AI-301 NLP Vector Pipeline
// In a real environment, this would call HuggingFace/Transformers.js to create the 384d float array for each verse's English translation.
// For the PoC, we will create the DB schema and populate it with zero/random arrays to demonstrate architecture readiness.

const DATA_DIR = path.join(__dirname, '../data');
const PUBLIC_DIR = path.join(__dirname, '../public');
const DB_PATH = path.join(PUBLIC_DIR, 'vedic-vectors.db');

if (fs.existsSync(DB_PATH)) fs.unlinkSync(DB_PATH);

const db = new sqlite3.Database(DB_PATH);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS verse_embeddings (
      id TEXT PRIMARY KEY,
      text_slug TEXT,
      chapter INTEGER,
      verse INTEGER,
      embedding BLOB
    );
  `);

  console.log('Generating dummy 384d vector embeddings for all verses...');
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));

  db.run('BEGIN TRANSACTION');
  
  const stmt = db.prepare('INSERT INTO verse_embeddings VALUES (?, ?, ?, ?, ?)');
  let count = 0;

  files.forEach(file => {
    const rawData = fs.readFileSync(path.join(DATA_DIR, file), 'utf8');
    let verses;
    try { verses = JSON.parse(rawData); } catch (e) { return; }

    const slugMatch = file.match(/^(.+)_chapter_(\d+)\.json$/);
    if (!slugMatch) return;
    const textSlug = slugMatch[1].replace(/_/g, '-');
    const chapter = parseInt(slugMatch[2]);

    verses.forEach(v => {
      // Create a mock 384d Float32Array
      const vec = new Float32Array(384);
      for(let i=0; i<384; i++) vec[i] = Math.random(); // Mock embedding
      
      const buffer = Buffer.from(vec.buffer);
      
      stmt.run(
        `${textSlug}_${chapter}_${v.verse}`,
        textSlug,
        chapter,
        v.verse,
        buffer
      );
      count++;
    });
  });

  stmt.finalize();
  db.run('COMMIT', () => {
    console.log(`Successfully embedded ${count} verses into vedic-vectors.db (384d schema)`);
    db.close();
  });
});
