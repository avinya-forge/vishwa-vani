import sqlite3 from 'sqlite3';
import path from 'path';

/**
 * Vishwa-Vani: Server-Side Lake Engine 🛠️
 * 
 * Used during CI/CD and 'next build' to extract scripture metadata 
 * from binary SQLite stores into static static props.
 */
export async function getVersesFromLakeServer(textSlug: string, chapter: number): Promise<any[]> {
  const dbPath = path.join(process.cwd(), 'public', 'vedic-lake.db');
  
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
      
      const verses = rows.map((row: any) => JSON.parse(row.content));
      resolve(verses);
    });
  });
}
