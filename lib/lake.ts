import initSqlJs from 'sql.js';

let LAKES: Record<string, any> = {};

/**
 * Vishwa-Vani: Multi-Lake Database Interface 🪷
 * 
 * Provides high-performance, indexed access to specific binary scripture lakes.
 * This sharding architecture allows us to host thousands of texts across
 * separate shards to bypass static file limits.
 */
export async function initLake(lakeFile: string = 'vedic-lake.db') {
  if (LAKES[lakeFile]) return LAKES[lakeFile];

  try {
    const SQL = await initSqlJs({
      locateFile: (file: string) => `/${file}` // Pointing to public/sql-wasm.wasm
    });

    // Fetch the specific shard binary
    const response = await fetch(`/${lakeFile}`);
    const bytes = await response.arrayBuffer();
    
    LAKES[lakeFile] = new SQL.Database(new Uint8Array(bytes));
    console.log(`ॐ ${lakeFile} initialized successfully.`);
    return LAKES[lakeFile];
  } catch (err) {
    console.error(`Failed to initialize ${lakeFile}:`, err);
    return null;
  }
}

/**
 * Query the specific lake for verses from a scripture and chapter.
 */
export async function getVersesFromLake(textSlug: string, chapter: number, lakeFile?: string) {
  const db = await initLake(lakeFile);
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
