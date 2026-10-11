import type { Client } from '@libsql/client';
import { createClient } from '@libsql/client';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';
import type { NVFFragment } from './nvf';
import { migrateToNVF } from './nvf';

const isProd = process.env.NODE_ENV === 'production';
const keySource = process.env.LAKE_KEY || process.env.LAKE_SECRET_KEY || '';
const SECRET_KEY = crypto.createHash('sha256').update(keySource || 'vishwa-vani-dev-key').digest();

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

export async function getDynamicDatabaseVersesCount(lakeFile: string = 'vedic-lake.db'): Promise<number> {
  try {
    const client = getClient(lakeFile);
    const query = `SELECT count(*) as count FROM verses`;
    const result = await client.execute(query);
    if (result.rows.length > 0) {
      return Number(result.rows[0].count) || 0;
    }
    return 0;
  } catch (err) {
    console.error('SERVER LAKE: Connection or Query error while fetching count', err);
    return 0;
  }
}

export async function getKnowledgeTokensFromLakeServer(lakeFile: string = 'vedic-lake.db') {
  try {
    const client = getClient(lakeFile);
    const result = await client.execute('SELECT * FROM knowledge_tokens ORDER BY domain ASC, chapter ASC');
    return result.rows.map(row => ({
      id: row.id as string,
      domain: row.domain as string,
      domainLabel: row.domain_label as string,
      title: row.title as string,
      sanskritTerm: row.sanskrit_term as string,
      scriptureSlug: row.scripture_slug as string,
      scriptureName: row.scripture_name as string,
      chapter: Number(row.chapter),
      verseRange: row.verse_range as string,
      ancientObservation: row.ancient_observation as string,
      modernCorroboration: row.modern_corroboration as string,
      empiricalFact: row.empirical_fact as string,
      keyCitations: typeof row.key_citations === 'string' ? JSON.parse(row.key_citations) : row.key_citations,
      tags: typeof row.tags === 'string' ? JSON.parse(row.tags) : row.tags,
    }));
  } catch (err) {
    console.warn('SERVER LAKE: Failed to fetch knowledge tokens from DB, fallback available', err);
    return [];
  }
}


import { COMPLETED_BOOK_STATS, PIPELINE_BOOK_STATS, COMPLETED_BOOKS_SLUGS, getAvailableTexts } from './texts';
import { getLiveScholars } from './scholars';

export async function getDynamicLibraryStats() {
  const dbCount = await getDynamicDatabaseVersesCount().catch(() => 0);

  const completedVerses = Object.values(COMPLETED_BOOK_STATS).reduce((acc, b) => acc + b.verses, 0);
  const completedChapters = Object.values(COMPLETED_BOOK_STATS).reduce((acc, b) => acc + b.chapters, 0);
  const completedBooks = COMPLETED_BOOKS_SLUGS.length;

  const pipelineEntries = Object.entries(PIPELINE_BOOK_STATS);
  const silverEntries = pipelineEntries.filter(([, b]) => b.tier === 'silver');
  const bronzeEntries = pipelineEntries.filter(([, b]) => b.tier === 'bronze');

  const silverBooks = silverEntries.length;
  const silverChapters = silverEntries.reduce((acc, [, b]) => acc + b.chapters, 0);
  const silverVerses = silverEntries.reduce((acc, [, b]) => acc + b.verses, 0);

  const bronzeBooks = bronzeEntries.length;
  const bronzeChapters = bronzeEntries.reduce((acc, [, b]) => acc + b.chapters, 0);
  const bronzeVerses = bronzeEntries.reduce((acc, [, b]) => acc + b.verses, 0);

  const pipelineBooks = pipelineEntries.length;
  const pipelineVerses = silverVerses + bronzeVerses;
  const pipelineChapters = silverChapters + bronzeChapters;

  const available = getAvailableTexts();

  const databaseVerses = dbCount > 0 ? dbCount : 126306;

  return {
    completedBooks,
    completedChapters,
    completedVerses,
    silverBooks,
    silverChapters,
    silverVerses,
    bronzeBooks,
    bronzeChapters,
    bronzeVerses,
    pipelineBooks,
    pipelineChapters,
    pipelineVerses,
    databaseVerses,
    totalBooks: available.length,
    totalChapters: available.reduce((acc, t) => acc + t.totalChapters, 0),
    totalVerses: `${(completedVerses + pipelineVerses).toLocaleString()}+`,
    targetVerses: '100,000+',
    totalAuthors: getLiveScholars().length,
    totalLangs: 4,
    categories: Array.from(new Set(available.map(t => t.category)))
  };
}
