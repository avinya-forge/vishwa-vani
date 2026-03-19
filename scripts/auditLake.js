const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../public/vedic-lake.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY);

function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

async function audit() {
  try {
    const slugs = await query('SELECT DISTINCT text_slug FROM verses');
    console.log('Scriptures found in Vedic Lake:');
    for (const row of slugs) {
      const counts = await query('SELECT COUNT(*) as count FROM verses WHERE text_slug = ?', [row.text_slug]);
      console.log(` - ${row.text_slug}: ${counts[0].count} verses`);
    }
  } catch (err) {
    console.error('Audit failed:', err);
  } finally {
    db.close();
  }
}

audit();
