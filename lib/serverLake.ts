import sqlite3 from 'sqlite3';
import path from 'path';
import crypto from 'crypto';
import { migrateToNVF, NVFFragment } from './nvf';

// SECURE: Shared decryption key (PoC). In production, this would be obfuscated in WASM.
const SECRET_KEY = Buffer.from('4eeeb3a1-5752-4f34-b49f-4eeb23d3210e', 'utf-8').slice(0, 32);

function decrypt(encryptedText: string): string {
  if (encryptedText.startsWith('{')) return encryptedText; // Already plain text

  try {
    const [ivHex, authTagHex, encryptedData] = encryptedText.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-gcm', SECRET_KEY, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (e) {
    console.warn('SERVER LAKE: Decrypt failed. Returning raw value.', e);
    return encryptedText;
  }
}

/**
 * Vishwa-Vani: Server-Side Lake Engine (Normalized) 🌊
 * 
 * Extracts data from binary SQLite stores and normalizes it into 
 * Normalized Vedic Fragment (NVF) format for the UI.
 */
export async function getVersesFromLakeServer(textSlug: string, chapter: number, lakeFile: string = 'vedic-lake.db'): Promise<NVFFragment[]> {
  const dbPath = path.join(process.cwd(), 'public', lakeFile);
  
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
      if (err) {
        console.error('SERVER LAKE: Connection error', err);
        return resolve([]); // Fallback to empty for build safety
      }
    });

    const query = `SELECT content FROM verses WHERE text_slug = ? AND chapter = ? ORDER BY verse ASC`;
    
    db.all(query, [textSlug, chapter], (err, rows) => {
      db.close();
      if (err) {
        console.error('SERVER LAKE: Query error', err);
        return resolve([]);
      }
      
      const fragments = rows.map((row: any) => {
        try {
          const decrypted = decrypt(row.content);
          const raw = JSON.parse(decrypted);
          return migrateToNVF(raw, textSlug);
        } catch (e) {
          console.error(`SERVER LAKE: JSON parse fail`, e);
          return null;
        }
      }).filter(f => f !== null) as NVFFragment[];

      resolve(fragments);
    });
  });
}
