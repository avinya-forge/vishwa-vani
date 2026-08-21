import initSqlJs from 'sql.js';

const LAKES = {};

/**
 * Prunes the payload to enforce the "Max 2" scholar limit.
 */
function prunePayload(verses) {
  return verses.map((verse) => {
    if (verse.layers && Array.isArray(verse.layers)) {
      const allowedAuthors = new Set();
      const prunedLayers = [];
      for (const layer of verse.layers) {
        if (!layer.author) {
           prunedLayers.push(layer);
           continue;
        }
        const author = String(layer.author);
        if (allowedAuthors.has(author)) {
          prunedLayers.push(layer);
        } else if (allowedAuthors.size < 2) {
          allowedAuthors.add(author);
          prunedLayers.push(layer);
        }
      }
      return { ...verse, layers: prunedLayers };
    }
    return verse;
  });
}

/**
 * Vedic Lake Worker 🪷
 * 
 * Handles all binary database operations in the background.
 * Prevents UI blockage during massive scripture queries.
 */
self.onmessage = async (event) => {
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

        const verses = [];
        while (stmt.step()) {
          const row = stmt.getAsObject();
          if (row.content) verses.push(JSON.parse(row.content));
        }
        stmt.free();

        // Dynamically prune layers to enforce Max 2 limits before sending payload to UI
        const prunedVerses = prunePayload(verses);

        self.postMessage({ type: 'QUERY_SUCCESS', id, payload: { verses: prunedVerses } });
        break;
      }

      case 'SEARCH_LAKE': {
        const { query, lakeFile } = payload;
        const db = await getOrInitLake(lakeFile);
        if (!db) throw new Error(`Lake not found: ${lakeFile}`);

        let results;
        try {
          results = db.exec(`
            SELECT text_slug, chapter, verse, slok, transliteration, 1 as relevance
            FROM verses_fts 
            WHERE verses_fts MATCH :q
            LIMIT 40
          `, { ':q': query });
        } catch {
          results = db.exec(`
            SELECT text_slug, chapter, verse, slok, transliteration, 0 as relevance
            FROM verses 
            WHERE slok LIKE :prefixQ OR transliteration LIKE :prefixQ OR slok LIKE :fallbackQ OR content LIKE :fallbackQ
            LIMIT 30
          `, { 
            ':prefixQ': `${query}%`, 
            ':fallbackQ': `%${query}%` 
          });
        }

        const searchResults = (results && results[0])
          ? results[0].values.map((row) => {
              return {
                textSlug: row[0],
                chapter: row[1],
                verse: row[2],
                slok: row[3],
                transliteration: row[4],
                relevance: row[5]
              };
            })
          : [];

        self.postMessage({ type: 'SEARCH_SUCCESS', id, payload: { results: searchResults } });
        break;
      }

      case 'HYDRATE_VECTOR_INDEX': {
          // Placeholder for Edge Vector Index Hydration
          // Will map Cloudflare Vectorize endpoints to return coordinates that the client Web Worker instantly hydrates
          const { query } = payload;
          console.log('Hydrating vector index for query:', query);
          self.postMessage({ type: 'HYDRATE_VECTOR_SUCCESS', id, payload: { status: 'placeholder', query } });
          break;
      }

      default:
        console.warn('Unknown message type to LakeWorker:', type);
    }
  } catch (error) {
    self.postMessage({ type: 'ERROR', id, error: error.message });
  }
};

async function getOrInitLake(lakeFile = 'vedic-lake.db') {
  if (LAKES[lakeFile]) return LAKES[lakeFile];

  // Pointing to absolute public path for WASM
  const SQL = await initSqlJs({
    locateFile: (file) => `${self.location.origin}/${file}`
  });

  const response = await fetch(`/${lakeFile}`);
  if (!response.ok) throw new Error(`Could not fetch lake file: ${lakeFile}`);
  
  const bytes = await response.arrayBuffer();
  const db = new SQL.Database(new Uint8Array(bytes));
  
  try {
    const res = db.exec("SELECT value FROM _vishwa_metadata WHERE key = 'version'");
    if (!res || !res[0] || !res[0].values || res[0].values[0][0] !== '1.0') {
      throw new Error(`Incompatible Lake Version. Hard reload required (Ctrl+Shift+R).`);
    }
  } catch (e) {
    throw new Error(`Corrupted or Outdated Lake detected [${lakeFile}]: ${e.message}`);
  }

  LAKES[lakeFile] = db;
  console.log(`ॐ Background Lake [${lakeFile}] ready (v1.0)`);
  return db;
}
