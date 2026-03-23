const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../public/vedic-lake.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY);

db.all(`
  SELECT chapter, COUNT(*) as count 
  FROM verses 
  WHERE text_slug = 'bhagavad-gita'
  GROUP BY chapter
  ORDER BY chapter
`, (err, rows) => {
  if (err) {
    console.error('Audit failed:', err);
  } else {
    console.log('BG Verse Counts per Chapter:');
    rows.forEach(row => {
      console.log(` - Ch ${row.chapter}: ${row.count} verses`);
    });
  }
  db.close();
});
