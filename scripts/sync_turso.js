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
      process.stdout.write(`\rSynced ${Math.min(i + batchSize, rows.length)} / ${rows.length}`);
    } catch (e) {
      console.error(`\nError syncing batch ${i}:`, e.message);
    }
  }

  console.log('\nSync completed successfully!');
}

sync().catch(console.error);
