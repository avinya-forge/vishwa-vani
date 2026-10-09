import type { Client } from '@libsql/client';
import { createClient } from '@libsql/client';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';
import type { NVFFragment } from './nvf';
import { migrateToNVF } from './nvf';

const isProd = process.env.NODE_ENV === 'production';
const keySource = process.env.LAKE_KEY || process.env.LAKE_SECRET_KEY || '';
const SECRET_KEY = Buffer.from(keySource, 'utf-8').slice(0, 32);

function decrypt(encryptedText: string): string {
  if (encryptedText.startsWith('{')) return encryptedText; // Already plain text
  if (!keySource) {
    if (isProd) throw new Error('Decryption disabled in production: missing LAKE_KEY');
    return encryptedText; // Fallback to raw encrypted text in dev if no key
  }

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
 * Vishwa-Vani: Server-Side Lake Engine (Normalized) 🌊
 * 
 * Extracts data from Turso Edge / LibSQL store and normalizes it into 
 * Normalized Vedic Fragment (NVF) format for the UI.
 */

let cachedClient: Client | null = null;

function getClient(lakeFile: string): Client {
  if (cachedClient) return cachedClient;

  // DB-001: Connect to Turso if environment variables are provided
  if (process.env.TURSO_DATABASE_URL) {
    console.log('[ServerLake] Connecting to Remote Turso Edge Database...');
    cachedClient = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
    return cachedClient;
  }

  // Fallback to local SQLite file for local dev / unmigrated states
  let dbPath = path.join(process.cwd(), 'public', lakeFile);
  
  if (!fs.existsSync(/*turbopackIgnore: true*/ dbPath)) {
    const fallbacks = [
      path.join(process.cwd(), '..', 'public', lakeFile),
      path.join(process.cwd(), '..', '..', 'public', lakeFile),
      path.join('/vercel/path0/public', lakeFile)
    ];
    for (const fb of fallbacks) {
      if (fs.existsSync(/*turbopackIgnore: true*/ fb)) {
        dbPath = fb;
        break;
      }
    }
  }

  if (!fs.existsSync(/*turbopackIgnore: true*/ dbPath)) {
    console.error('[ServerLake] FATAL: vedic-lake.db NOT FOUND locally and TURSO_DATABASE_URL is missing.');
    throw new Error('SQLITE_CANTOPEN: DB missing and no Turso URL provided.');
  }

  console.log(`[ServerLake] Connecting to Local LibSQL file: ` + dbPath);
  cachedClient = createClient({
    url: `file:` + dbPath
  });
  
  return cachedClient;
}

export async function getVersesFromLakeServer(textSlug: string, chapter: number, lakeFile: string = 'vedic-lake.db'): Promise<NVFFragment[]> {
  try {
    const client = getClient(lakeFile);
    
    // LibSQL uses async execute
    const query = `SELECT content FROM verses WHERE text_slug = ? AND chapter = ? ORDER BY verse ASC`;
    const result = await client.execute({
      sql: query,
      args: [textSlug, chapter]
    });

    const fragments = result.rows.map((row) => {
      try {
        const decrypted = decrypt(row.content as string);
        const raw = JSON.parse(decrypted);
        return migrateToNVF(raw, textSlug, chapter);
      } catch (e) {
        console.error(`SERVER LAKE: JSON parse fail`, e);
        return null;
      }
    }).filter(f => f !== null) as NVFFragment[];
    
    return fragments;
  } catch (err) {
    console.error('SERVER LAKE: Connection or Query error', err);
    throw err;
  }
}
