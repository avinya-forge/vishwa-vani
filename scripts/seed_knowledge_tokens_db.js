/**
 * Universal Vedic Knowledge Graph (ADR-008) DB Migration & Seeding Engine
 * 
 * Synchronizes knowledge_tokens schema and indices to public/vedic-lake.db,
 * creates idx_text_chapter on verses, and dumps data/knowledge_tokens.json.
 */

const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const swc = require('@swc/core');

const DB_PATH = path.join(__dirname, '..', 'public', 'vedic-lake.db');
const TS_FILE = path.join(__dirname, '..', 'lib', 'vedic-science.ts');
const JSON_OUT = path.join(__dirname, '..', 'data', 'knowledge_tokens.json');

function migrateAndSeed() {
  console.log('[DB Sync] Extracting 17 canonical Empirical Knowledge Tokens from lib/vedic-science.ts...');
  const tsCode = fs.readFileSync(TS_FILE, 'utf8');
  const { code } = swc.transformSync(tsCode, {
    module: { type: 'commonjs' },
    jsc: { parser: { syntax: 'typescript' } }
  });

  const m = { exports: {} };
  const fn = new Function('module', 'exports', code);
  fn(m, m.exports);

  const tokens = m.exports.VEDIC_KNOWLEDGE_TOKENS || [];
  console.log(`[DB Sync] Extracted ${tokens.length} tokens successfully.`);

  // Write canonical JSON backup
  fs.writeFileSync(JSON_OUT, JSON.stringify(tokens, null, 2), 'utf8');
  console.log(`[DB Sync] Wrote authoritative tokens to ${JSON_OUT}`);

  // Connect to Local SQLite DB
  console.log(`[DB Sync] Connecting to SQLite DB: ${DB_PATH}`);
  const db = new Database(DB_PATH);

  // 1. Create index on verses(text_slug, chapter) if not exists
  console.log('[DB Sync] Optimizing verses table indexing (idx_text_chapter)...');
  db.exec('CREATE INDEX IF NOT EXISTS idx_text_chapter ON verses(text_slug, chapter);');

  // 2. Create knowledge_tokens table & indices
  console.log('[DB Sync] Creating knowledge_tokens table & indices...');
  db.exec(`
    CREATE TABLE IF NOT EXISTS knowledge_tokens (
      id TEXT PRIMARY KEY,
      domain TEXT NOT NULL,
      domain_label TEXT NOT NULL,
      title TEXT NOT NULL,
      sanskrit_term TEXT NOT NULL,
      scripture_slug TEXT NOT NULL,
      scripture_name TEXT NOT NULL,
      chapter INTEGER NOT NULL,
      verse_range TEXT NOT NULL,
      ancient_observation TEXT NOT NULL,
      modern_corroboration TEXT NOT NULL,
      empirical_fact TEXT NOT NULL,
      key_citations JSON NOT NULL,
      tags JSON NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS idx_kt_domain ON knowledge_tokens(domain);
    CREATE INDEX IF NOT EXISTS idx_kt_scripture ON knowledge_tokens(scripture_slug, chapter);
  `);

  // 3. Insert or replace tokens
  console.log('[DB Sync] Seeding tokens into SQLite knowledge_tokens table...');
  const insertStmt = db.prepare(`
    INSERT OR REPLACE INTO knowledge_tokens (
      id, domain, domain_label, title, sanskrit_term,
      scripture_slug, scripture_name, chapter, verse_range,
      ancient_observation, modern_corroboration, empirical_fact,
      key_citations, tags
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const tx = db.transaction((rows) => {
    for (const t of rows) {
      insertStmt.run(
        t.id,
        t.domain,
        t.domainLabel,
        t.title,
        t.sanskritTerm,
        t.scriptureSlug,
        t.scriptureName,
        t.chapter,
        t.verseRange,
        t.ancientObservation,
        t.modernCorroboration,
        t.empiricalFact,
        JSON.stringify(t.keyCitations),
        JSON.stringify(t.tags)
      );
    }
  });

  tx(tokens);

  const countRow = db.prepare('SELECT count(*) as count FROM knowledge_tokens').get();
  console.log(`[DB Sync] Migration complete! Total rows in knowledge_tokens: ${countRow.count}`);
  db.close();
}

migrateAndSeed();
