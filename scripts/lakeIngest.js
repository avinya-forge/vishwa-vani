const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');
const PUBLIC_DIR = path.join(__dirname, '../public');

// Map prefixes to specific shards to maintain 100MB static limits
const SHARD_MAP = {
  'bhagavad_gita': 'vedic-lake.db',
  'mahabharata': 'itihasa-lake.db',
  'ramayana': 'itihasa-lake.db',
  'vishnu_purana': 'purana-lake.db',
  'bhagavata_purana': 'purana-lake.db',
  'default': 'vedic-lake.db'
};

const DB_CONNECTIONS = {};

function getDb(shardName) {
  if (DB_CONNECTIONS[shardName]) return DB_CONNECTIONS[shardName];
  
  const dbPath = path.join(PUBLIC_DIR, shardName);
  // Fresh start: delete if exists
  if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
  
  const db = new sqlite3.Database(dbPath);
  db.serialize(() => {
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
  });
  
  DB_CONNECTIONS[shardName] = db;
  return db;
}

const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
console.log(`Found ${files.length} JSON files for shard-aware ingestion.`);

files.forEach(file => {
  const slugMatch = file.match(/^(.+)_chapter_(\d+)\.json$/);
  if (!slugMatch) return;

  const prefix = slugMatch[1];
  const shardName = SHARD_MAP[prefix] || SHARD_MAP.default;
  const db = getDb(shardName);

  const textSlug = prefix.replace(/_/g, '-');
  const chapter = parseInt(slugMatch[2]);

  const rawData = fs.readFileSync(path.join(DATA_DIR, file), 'utf8');
  const verses = JSON.parse(rawData);

  db.serialize(() => {
    const stmt = db.prepare('INSERT INTO verses VALUES (?, ?, ?, ?, ?, ?, ?)');
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
    stmt.finalize();
  });
  
  console.log(`[${shardName}] Ingested ${verses.length} verses from ${file}`);
});

Object.values(DB_CONNECTIONS).forEach(db => db.close());
console.log('Multi-Lake Sharding complete. All vessels are full.');
