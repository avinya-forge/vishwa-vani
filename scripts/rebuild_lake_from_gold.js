#!/usr/bin/env node
/**
 * rebuild_lake_from_gold.js
 *
 * Rebuilds the search-index portion of vedic-lake.db from the gold JSON files.
 * Replaces all bhagavad-gita rows with accurate, complete data including both
 * ISKCON and Dnyaneshwari layers.
 *
 * Run: node scripts/rebuild_lake_from_gold.js
 */

'use strict';

const fs      = require('fs');
const path    = require('path');
const sqlite3 = require(path.join(__dirname, '..', 'node_modules', 'sqlite3'));

const DB_PATH  = path.join(__dirname, '..', 'public', 'vedic-lake.db');
const GOLD_DIR = path.join(__dirname, '..', 'data', '3-gold', 'bhagavad-gita');

const db = new sqlite3.Database(DB_PATH, err => {
  if (err) { console.error('Cannot open DB:', err.message); process.exit(1); }
  run();
});

function run() {
  db.serialize(() => {
    // Delete existing bhagavad-gita rows
    db.run('DELETE FROM verses WHERE text_slug = ?', ['bhagavad-gita'], function(err) {
      if (err) { console.error('Delete error:', err.message); return; }
      console.log(`Deleted ${this.changes} stale bhagavad-gita rows.`);
      insertAllChapters();
    });
  });
}

function insertAllChapters() {
  const stmt = db.prepare(
    'INSERT OR REPLACE INTO verses (id, text_slug, chapter, verse, slok, transliteration, content) VALUES (?, ?, ?, ?, ?, ?, ?)'
  );

  let totalInserted = 0;

  db.serialize(() => {
    db.run('BEGIN TRANSACTION');

    for (let ch = 1; ch <= 18; ch++) {
      const filePath = path.join(GOLD_DIR, `bhagavad-gita-chapter-${ch}.json`);
      if (!fs.existsSync(filePath)) {
        console.warn(`  SKIP: chapter ${ch} file not found`);
        continue;
      }

      const verses = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      let chInserted = 0;

      verses.forEach(verse => {
        if (!verse || typeof verse !== 'object') return;

        const id             = verse.id || `bhagavad-gita_${ch}_${verse.verse}`;
        const verseNum       = String(verse.verse);
        const slok           = verse.original || '';
        const transliteration = verse.transliteration || '';
        // Store full NVF content as JSON — includes all layers
        const content        = JSON.stringify(verse);

        stmt.run(id, 'bhagavad-gita', ch, verseNum, slok, transliteration, content);
        chInserted++;
        totalInserted++;
      });

      console.log(`  Ch${String(ch).padStart(2,'0')} ✓  ${chInserted} verses inserted`);
    }

    db.run('COMMIT', err => {
      if (err) { console.error('Commit error:', err.message); return; }
      stmt.finalize();

      db.get('SELECT COUNT(*) as n FROM verses WHERE text_slug = "bhagavad-gita"', (e, r) => {
        console.log('\n═════════════════════════════════════════');
        console.log(`  Lake rebuild complete.`);
        console.log(`  Inserted : ${totalInserted} rows`);
        console.log(`  DB count : ${r?.n} bhagavad-gita rows`);
        console.log('═════════════════════════════════════════\n');
        db.close();
      });
    });
  });
}
