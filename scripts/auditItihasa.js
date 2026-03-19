const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../public/itihasa-lake.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY);

db.serialize(() => {
  db.all('SELECT DISTINCT text_slug FROM verses', (err, rows) => {
    if (err) {
      console.log('Itihasa Lake might be empty or missing.');
    } else {
      console.log('Scriptures in Itihasa Lake:');
      rows.forEach(row => {
        db.get('SELECT COUNT(*) as count FROM verses WHERE text_slug = ?', [row.text_slug], (err, countRow) => {
           console.log(` - ${row.text_slug}: ${countRow.count} verses`);
        });
      });
    }
  });
});
db.close();
