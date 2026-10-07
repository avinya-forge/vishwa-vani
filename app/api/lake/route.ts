import { NextResponse } from 'next/server';
import { validateApiRequest } from '@/lib/api-guard';
import { z } from 'zod';
import Database from 'better-sqlite3';
import path from 'path';

// Schema for search request
const searchSchema = z.object({
  action: z.enum(['QUERY_VERSES', 'SEARCH_LAKE']),
  query: z.string().optional(),
  textSlug: z.string().optional(),
  chapter: z.number().optional(),
  lakeFile: z.string().default('vedic-lake.db'),
});

// Reuse server-lake.ts or just open DB here
// We'll open it from process.cwd() / data / lakeFile or wherever it is.
// Actually, it might still be in public/ for now until SEC-010 phase 2.
// Let's assume it's in public/.
function getDb(lakeFile: string) {
  const dbPath = path.join(process.cwd(), 'public', lakeFile);
  return new Database(dbPath, { readonly: true });
}

export async function POST(request: Request) {
  try {
    const guardResult = await validateApiRequest(request, searchSchema);
    if (guardResult.error || !guardResult.data) return guardResult.error || NextResponse.json({error: 'Invalid'}, {status: 400});

    const { action, query, textSlug, chapter, lakeFile } = guardResult.data;
    const db = getDb(lakeFile);

    if (action === 'QUERY_VERSES') {
      const stmt = db.prepare('SELECT * FROM verses WHERE textSlug = ? AND chapter = ? ORDER BY verse ASC');
      const verses = stmt.all(textSlug, chapter);
      return NextResponse.json({ verses });
    }

    if (action === 'SEARCH_LAKE') {
      const stmt = db.prepare('SELECT * FROM verses WHERE meaning LIKE ? OR sanskrit LIKE ? OR transliteration LIKE ? LIMIT 50');
      const likeQuery = `%${query}%`;
      const results = stmt.all(likeQuery, likeQuery, likeQuery);
      return NextResponse.json({ results });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Lake API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
