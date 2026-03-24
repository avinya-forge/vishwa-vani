const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

/**
 * Vishwa-Vani JS Core (v1.0)
 * Handles Database Ingestion, Indexing, and Search Generation.
 * This script is called by the Python CLI (vishwa.py).
 */

const BASE_DIR = path.join(__dirname, '..');
const DATA_DIR = path.join(BASE_DIR, 'data', '3-gold');
const PUBLIC_DIR = path.join(BASE_DIR, 'public');

const SHARD_MAP = {
  'bhagavad-gita': 'vedic-lake.db',
  'mahabharata': 'itihasa-lake.db',
  'ramayana': 'itihasa-lake.db',
  'vishnu_purana': 'purana-lake.db',
  'bhagavata_purana': 'purana-lake.db',
  'samskaras': 'ritual-node.db',
  'default': 'vedic-lake.db'
};

const DB_CONNECTIONS = {};

function getDb(shardName, reset = false) {
  if (DB_CONNECTIONS[shardName]) return DB_CONNECTIONS[shardName];
  const dbPath = path.join(PUBLIC_DIR, shardName);
  
  if (reset && fs.existsSync(dbPath)) {
    console.log(`[INIT] Resetting shard: ${shardName}`);
    fs.unlinkSync(dbPath);
  }
  
  const db = new sqlite3.Database(dbPath);
  db.serialize(() => {
    db.exec(`
      CREATE TABLE IF NOT EXISTS verses (
        id TEXT PRIMARY KEY,
        text_slug TEXT,
        chapter INTEGER,
        verse INTEGER,
        slok TEXT,
        transliteration TEXT,
        content JSON
      );
      CREATE INDEX IF NOT EXISTS idx_verses_slok ON verses(slok);
      CREATE INDEX IF NOT EXISTS idx_verses_translit ON verses(transliteration);
    `);
  });
  DB_CONNECTIONS[shardName] = db;
  return db;
}

const actions = {
  ingest: () => {
    function getFilesRecursive(dir) {
      let results = [];
      const list = fs.readdirSync(dir);
      list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
          results = results.concat(getFilesRecursive(file));
        } else if (file.endsWith('.json')) {
          results.push(file);
        }
      });
      return results;
    }

    const files = getFilesRecursive(DATA_DIR);
    console.log(`Ingesting ${files.length} JSON files into SQLite shards...`);

    files.forEach(filePath => {
      const file = path.basename(filePath);
      const slugMatch = file.match(/^(.+)[-_]chapter[-_](\d+)\.json$/);
      if (!slugMatch) return;

      const prefix = slugMatch[1].replace(/-/g, '_'); // normalize for shard map
      const shardName = SHARD_MAP[prefix] || SHARD_MAP.default;
      const db = getDb(shardName);

      const textSlug = prefix.replace(/_/g, '-');
      const chapter = parseInt(slugMatch[2]);

      const rawData = fs.readFileSync(filePath, 'utf8');
      const verses = JSON.parse(rawData);

      db.serialize(() => {
        const stmt = db.prepare('INSERT OR REPLACE INTO verses VALUES (?, ?, ?, ?, ?, ?, ?)');
        verses.forEach(v => {
          const id = v.id || `${textSlug}_${chapter}_${v.verse}`;
          stmt.run(
            id,
            v.text_slug || textSlug,
            v.chapter || chapter,
            v.verse,
            v.original || v.slok || "",
            v.transliteration || "",
            JSON.stringify(v)
          );
        });
        stmt.finalize();
      });
      console.log(`  [${shardName}] Ingested ${verses.length} verses from ${file}`);
    });
    console.log("Ingestion complete.");
  },

  index: () => {
    console.log("Building Reverse Search Index...");
    function getFilesRecursive(dir) {
      let results = [];
      const list = fs.readdirSync(dir);
      list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
          results = results.concat(getFilesRecursive(file));
        } else if (file.endsWith('.json')) {
          results.push(file);
        }
      });
      return results;
    }
    const files = getFilesRecursive(DATA_DIR);
    const reverseIndex = {};
    
    files.forEach(filePath => {
      try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        data.forEach(v => {
          const text = [(v.original || ''), (v.transliteration || ''), v.meaning || ''].join(' ');
          const tokens = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(t => t.length > 3);
          tokens.forEach(token => {
            if (!reverseIndex[token]) reverseIndex[token] = [];
            if (!reverseIndex[token].includes(v.id)) reverseIndex[token].push(v.id);
          });
        });
      } catch (e) {
        console.log(`Error indexing ${filePath}: ${e.message}`);
      }
    });
    
    fs.writeFileSync(path.join(PUBLIC_DIR, 'static_search_fallback.json'), JSON.stringify(reverseIndex));
    console.log(`Index built: ${Object.keys(reverseIndex).length} tokens.`);
  },

  status: () => {
    const shards = [...new Set(Object.values(SHARD_MAP))];
    shards.forEach(shard => {
      const dbPath = path.join(PUBLIC_DIR, shard);
      if (!fs.existsSync(dbPath)) return;
      const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY);
      db.get('SELECT COUNT(*) as count FROM verses', (err, row) => {
        if (!err) console.log(` - ${shard}: ${row.count} verses`);
        db.close();
      });
    });
  }
};

const cmd = process.argv[2];
if (actions[cmd]) {
  actions[cmd]();
} else {
  console.log(`Unknown action: ${cmd}`);
}

// Ensure connections are closed if still open after a delay
setTimeout(() => {
  Object.values(DB_CONNECTIONS).forEach(db => db.close());
}, 2000);
