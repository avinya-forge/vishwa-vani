const Database = require('better-sqlite3');
const { createClient } = require('@libsql/client');
require('dotenv').config({ path: '.env.local' });

async function sync() {
  const tursoUrl = process.env.TURSO_DATABASE_URL;
  const tursoAuthToken = process.env.TURSO_AUTH_TOKEN;

  if (!tursoUrl || !tursoAuthToken) {
    console.error('Missing Turso credentials in .env.local');
    process.exit(1);
  }

  console.log('Connecting to Local SQLite DB (public/vedic-lake.db)...');
  const localDb = new Database('public/vedic-lake.db');

  console.log('Connecting to Remote Turso DB...');
  const tursoClient = createClient({
    url: tursoUrl,
    authToken: tursoAuthToken,
  });

  console.log('Creating schema in Turso...');
  await tursoClient.execute(`
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
  await tursoClient.execute('CREATE INDEX IF NOT EXISTS idx_verses_slok ON verses(slok)');
  await tursoClient.execute('CREATE INDEX IF NOT EXISTS idx_verses_translit ON verses(transliteration)');
  await tursoClient.execute('CREATE INDEX IF NOT EXISTS idx_text_chapter ON verses(text_slug, chapter)');

  console.log('Fetching local rows...');
  const rows = localDb.prepare('SELECT id, text_slug, chapter, verse, slok, transliteration, content FROM verses').all();
  console.log(`Found ${rows.length} rows to sync.`);

  // Batch insert into Turso
  const batchSize = 100;
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    
    const statements = batch.map(row => ({
      sql: 'INSERT OR REPLACE INTO verses (id, text_slug, chapter, verse, slok, transliteration, content) VALUES (?, ?, ?, ?, ?, ?, ?)',
      args: [
        row.id, 
        row.text_slug, 
        row.chapter, 
        row.verse, 
        row.slok || null, 
        row.transliteration || null, 
        row.content
      ]
    }));

    try {
      await tursoClient.batch(statements, 'write');
      process.stdout.write(`\rSynced Verses: ${Math.min(i + batchSize, rows.length)} / ${rows.length}`);
    } catch (e) {
      console.error(`\nError syncing batch ${i}:`, e.message);
    }
  }

  // Sync knowledge_tokens (ADR-008)
  console.log('\nCreating knowledge_tokens schema in Turso...');
  await tursoClient.execute(`
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
    )
  `);
  await tursoClient.execute('CREATE INDEX IF NOT EXISTS idx_kt_domain ON knowledge_tokens(domain)');
  await tursoClient.execute('CREATE INDEX IF NOT EXISTS idx_kt_scripture ON knowledge_tokens(scripture_slug, chapter)');

  console.log('Fetching local knowledge_tokens rows...');
  const tokenRows = localDb.prepare('SELECT * FROM knowledge_tokens').all();
  console.log(`Found ${tokenRows.length} knowledge tokens to sync.`);

  if (tokenRows.length > 0) {
    const tokenStatements = tokenRows.map(row => ({
      sql: `INSERT OR REPLACE INTO knowledge_tokens (
        id, domain, domain_label, title, sanskrit_term,
        scripture_slug, scripture_name, chapter, verse_range,
        ancient_observation, modern_corroboration, empirical_fact,
        key_citations, tags
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        row.id, row.domain, row.domain_label, row.title, row.sanskrit_term,
        row.scripture_slug, row.scripture_name, row.chapter, row.verse_range,
        row.ancient_observation, row.modern_corroboration, row.empirical_fact,
        row.key_citations, row.tags
      ]
    }));
    await tursoClient.batch(tokenStatements, 'write');
    console.log(`Synced ${tokenRows.length} knowledge tokens to Turso.`);
  }

  console.log('\nSync completed successfully!');
}

sync().catch(console.error);
