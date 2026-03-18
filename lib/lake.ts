import initSqlJs from 'sql.js';

let DB: any = null;

/**
 * Vishwa-Vani: Vedic Lake Interface 🪷
 * 
 * Provides high-performance, indexed access to the centralized scripture database.
 * This is the foundation for scaling to millions of verses on a static site.
 */
export async function initLake() {
  if (DB) return DB;

  try {
    const SQL = await initSqlJs({
      locateFile: (file: string) => `/${file}` // Pointing to public/sql-wasm.wasm
    });

    // Fetch the Vedic Lake binary
    const response = await fetch('/vedic-lake.db');
    const bytes = await response.arrayBuffer();
    
    DB = new SQL.Database(new Uint8Array(bytes));
    console.log('ॐ Vedic Lake initialized successfully.');
    return DB;
  } catch (err) {
    console.error('Failed to initialize Vedic Lake:', err);
    return null;
  }
}

/**
 * Query the lake for verses from a specific scripture and chapter.
 * Uses SQL indexing for O(1) retrieval speed even at scale.
 */
export async function getVersesFromLake(textSlug: string, chapter: number) {
  const db = await initLake();
  if (!db) return [];

  const stmt = db.prepare('SELECT content FROM verses WHERE text_slug = :slug AND chapter = :ch ORDER BY verse ASC');
  stmt.bind({ ':slug': textSlug, ':ch': chapter });

  const verses: any[] = [];
  while (stmt.step()) {
    const row = stmt.getAsObject();
    if (row.content) {
      verses.push(JSON.parse(row.content as string));
    }
  }

  stmt.free();
  return verses;
}

/**
 * Global Search across the entire scripture corpus.
 */
export async function searchLake(query: string) {
  const db = await initLake();
  if (!db) return [];

  // Simple LIKE search for PoC. Milestone 2 will use Full-Text Search indexing.
  const results = db.exec(`
    SELECT text_slug, chapter, verse, slok, transliteration 
    FROM verses 
    WHERE slok LIKE '%${query}%' OR transliteration LIKE '%${query}%'
    LIMIT 20
  `);

  if (!results || results.length === 0) return [];
  
  const columns = results[0].columns;
  return results[0].values.map((row: any[]) => {
    const obj: Record<string, any> = {};
    columns.forEach((col: string, idx: number) => { 
      obj[col] = row[idx]; 
    });
    return obj;
  });
}
