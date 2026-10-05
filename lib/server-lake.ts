import Database from 'better-sqlite3';
import path from 'path';
import crypto from 'crypto';
import type { NVFFragment } from './nvf';
import { migrateToNVF } from './nvf';

const isProd = process.env.NODE_ENV === 'production';
const keySource = process.env.LAKE_KEY || process.env.LAKE_SECRET_KEY || (!isProd ? 'default-insecure-key-for-local-dev-only--' : '');
const SECRET_KEY = Buffer.from(keySource, 'utf-8').slice(0, 32);

function decrypt(encryptedText: string): string {
  if (encryptedText.startsWith('{')) return encryptedText; // Already plain text
  if (isProd && !keySource) throw new Error('Decryption disabled in production: missing LAKE_KEY');

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
    if (isProd) throw new Error('SERVER LAKE: Decrypt failed. Failing closed.');
    console.warn('SERVER LAKE: Decrypt failed. Returning raw value.', e);
    return encryptedText;
  }
}

/**
 * Vishwa-Vani: Server-Side Lake Engine (Normalized) dYOS
 * 
 * Extracts data from binary SQLite stores and normalizes it into 
 * Normalized Vedic Fragment (NVF) format for the UI.
 */
export async function getVersesFromLakeServer(textSlug: string, chapter: number, lakeFile: string = 'vedic-lake.db'): Promise<NVFFragment[]> {
  const dbPath = path.join(process.cwd(), 'public', lakeFile);
  
  try {
    const db = new Database(dbPath, { readonly: true });
    const query = `SELECT content FROM verses WHERE text_slug = ? AND chapter = ? ORDER BY verse ASC`;
    const rows = db.prepare(query).all(textSlug, chapter);
    db.close();

    const fragments = rows.map((row: unknown) => {
      try {
        const decrypted = decrypt((row as { content: string }).content);
        const raw = JSON.parse(decrypted);
        return migrateToNVF(raw, textSlug, chapter);
      } catch (e) {
        console.error(`SERVER LAKE: JSON parse fail`, e);
        return null;
      }
    }).filter((f: unknown) => f !== null) as NVFFragment[];
    
    return fragments;
  } catch (err) {
    console.error('SERVER LAKE: Connection or Query error', err);
    return [];
  }
}
