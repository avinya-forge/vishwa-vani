const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../public/vedic-lake.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY);

db.all(`
  SELECT chapter, verse, text_slug, COUNT(*) as count 
  FROM verses 
  GROUP BY chapter, verse, text_slug 
  HAVING count > 1
`, (err, rows) => {
  if (err) {
    console.error('Audit failed:', err);
  } else {
    console.log('Duplicate verses found:');
    rows.forEach(row => {
      console.log(` - Ch ${row.chapter} V ${row.verse} (${row.text_slug}): ${row.count} times`);
    });
    if (rows.length === 0) console.log('None.');
  }
  db.close();
});
