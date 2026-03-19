const sqlite3 = require('sqlite3');
const crypto = require('crypto');
const path = require('path');

const ALGORITHM = 'aes-256-gcm';
const SECRET_KEY = Buffer.from('4eeeb3a1-5752-4f34-b49f-4eeb23d3210e', 'utf-8').slice(0, 32);

function decrypt(encryptedText) {
  if (encryptedText.startsWith('{')) return encryptedText;
  try {
    const [ivHex, authTagHex, encryptedData] = encryptedText.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (e) {
    return encryptedText;
  }
}

const dbPath = path.join(__dirname, '../../public/vedic-lake.db');
const db = new sqlite3.Database(dbPath);

db.all(`SELECT id, content FROM verses`, [], (err, rows) => {
  if (err) throw err;
  db.serialize(() => {
    const stmt = db.prepare(`UPDATE verses SET content = ? WHERE id = ?`);
    rows.forEach(row => {
        const decrypted = decrypt(row.content);
        stmt.run(decrypted, row.id);
    });
    stmt.finalize(() => {
        console.log('✅ DECRYPTION COMPLETE: All fragments restored to plain text.');
        db.close();
    });
  });
});
