import initSqlJs from 'sql.js';

let LAKES: Record<string, any> = {};

/**
 * Vedic Lake Worker 🪷
 * 
 * Handles all binary database operations in the background.
 * Prevents UI blockage during massive scripture queries.
 */
self.onmessage = async (event: MessageEvent) => {
  const { type, id, payload } = event.data;

  try {
    switch (type) {
      case 'INIT_LAKE': {
        const { lakeFile } = payload;
        const db = await getOrInitLake(lakeFile);
        self.postMessage({ type: 'INIT_LAKE_SUCCESS', id, payload: { lakeFile, ready: !!db } });
        break;
      }

      case 'QUERY_VERSES': {
        const { textSlug, chapter, lakeFile } = payload;
        const db = await getOrInitLake(lakeFile);
        if (!db) throw new Error(`Lake not found: ${lakeFile}`);

        const stmt = db.prepare('SELECT content FROM verses WHERE text_slug = :slug AND chapter = :ch ORDER BY verse ASC');
        stmt.bind({ ':slug': textSlug, ':ch': chapter });

        const verses: any[] = [];
        while (stmt.step()) {
          const row = stmt.getAsObject();
          if (row.content) verses.push(JSON.parse(row.content as string));
        }
        stmt.free();

        self.postMessage({ type: 'QUERY_SUCCESS', id, payload: { verses } });
        break;
      }

      case 'SEARCH_LAKE': {
        const { query, lakeFile } = payload;
        const db = await getOrInitLake(lakeFile);
        if (!db) throw new Error(`Lake not found: ${lakeFile}`);

        // Milestone 2 will use FTS-enabled search. For now, LIKE-based fallback in worker.
        const results = db.exec(`
          SELECT text_slug, chapter, verse, slok, transliteration 
          FROM verses 
          WHERE slok LIKE :q OR transliteration LIKE :q
          LIMIT 30
        `, { ':q': `%${query}%` });

        const searchResults = (results && results[0]) 
          ? results[0].values.map((v: any) => ({
              textSlug: v[0],
              chapter: v[1],
              verse: v[2],
              slok: v[3],
              transliteration: v[4]
            }))
          : [];

        self.postMessage({ type: 'SEARCH_SUCCESS', id, payload: { results: searchResults } });
        break;
      }

      default:
        console.warn('Unknown message type to LakeWorker:', type);
    }
  } catch (error: any) {
    self.postMessage({ type: 'ERROR', id, error: error.message });
  }
};

async function getOrInitLake(lakeFile: string = 'vedic-lake.db') {
  if (LAKES[lakeFile]) return LAKES[lakeFile];

  // Pointing to absolute public path for WASM
  const SQL = await initSqlJs({
    locateFile: (file: string) => `/${file}`
  });

  const response = await fetch(`/${lakeFile}`);
  if (!response.ok) throw new Error(`Could not fetch lake file: ${lakeFile}`);
  
  const bytes = await response.arrayBuffer();
  LAKES[lakeFile] = new SQL.Database(new Uint8Array(bytes));
  console.log(`ॐ Background Lake [${lakeFile}] ready.`);
  return LAKES[lakeFile];
}
