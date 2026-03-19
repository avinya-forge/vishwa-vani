const sqlite3 = require('sqlite3');
const crypto = require('crypto');
const path = require('path');

/**
 * 🛰️ Vishwa-Vani: Lake Encryption Tool (PoC)
 * 
 * This script reads a Lake DB and encrypts the 'content' column 
 * using AES-256-GCM to prevent bot-crawling of binary blobs.
 */

const ALGORITHM = 'aes-256-gcm';
const SECRET_KEY = Buffer.from('4eeeb3a1-5752-4f34-b49f-4eeb23d3210e', 'utf-8').slice(0, 32); // 32-byte key

function encrypt(text) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');
  return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}

const dbPath = path.join(__dirname, '../../public/vedic-lake.db');
const db = new sqlite3.Database(dbPath);

console.log('--- VISHWA-VANI DATA PROTECTOR: ENCRYPTING LAKE ---');

db.all(`SELECT id, content FROM verses`, [], (err, rows) => {
  if (err) throw err;

  console.log(`Analyzing ${rows.length} verses...`);
  
  db.serialize(() => {
    const stmt = db.prepare(`UPDATE verses SET content = ? WHERE id = ?`);
    
    rows.forEach(row => {
        try {
            // Check if already encrypted (very basic check)
            if (row.content.startsWith('{')) {
                const encrypted = encrypt(row.content);
                stmt.run(encrypted, row.id);
            }
        } catch (e) {
            console.error(`Fail: ${row.id}`, e);
        }
    });

    stmt.finalize(() => {
        console.log('✅ ENCRYPTION COMPLETE: All fragments are now protected blobs.');
        db.close();
    });
  });
});
