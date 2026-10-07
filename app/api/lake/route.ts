/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { validateApiRequest } from '@/lib/api-guard';
import { z } from 'zod';
import Database from 'better-sqlite3';
import path from 'path';
import { pipeline } from '@xenova/transformers';

// Schema for search request
const searchSchema = z.object({
  action: z.enum(['QUERY_VERSES', 'SEARCH_LAKE']),
  query: z.string().optional(),
  textSlug: z.string().optional(),
  chapter: z.number().optional(),
  lakeFile: z.string().default('vedic-lake.db'),
});

function getDb(lakeFile: string) {
  const dbPath = path.join(process.cwd(), 'public', lakeFile);
  return new Database(dbPath, { readonly: true });
}

class PipelineSingleton {
  static task = 'text2text-generation' as any;
  static model = 'Xenova/LaMini-Flan-T5-77M';
  static instance: any = null;

  static async getInstance(progress_callback: any = null) {
      if (this.instance === null) {
          this.instance = pipeline(this.task, this.model, { quantized: true, progress_callback });
      }
      return this.instance;
  }
}

export async function POST(request: Request) {
  try {
    const guardResult = await validateApiRequest(request, searchSchema);
    if (guardResult.error || !guardResult.data) return guardResult.error || NextResponse.json({error: 'Invalid'}, {status: 400});

    const { action, query, textSlug, chapter, lakeFile } = guardResult.data;
    const db = getDb(lakeFile);

    if (action === 'QUERY_VERSES') {
      const stmt = db.prepare('SELECT * FROM verses WHERE text_slug = ? AND chapter = ? ORDER BY verse ASC');
      const verses = stmt.all(textSlug, chapter);
      // Map back to expected properties
      const mappedVerses = verses.map((v: any) => ({
        id: v.id,
        verse: v.verse,
        chapter: v.chapter,
        sanskrit: v.slok,
        transliteration: v.transliteration,
        ...JSON.parse(v.content)
      }));
      return NextResponse.json({ verses: mappedVerses });
    }

    if (action === 'SEARCH_LAKE') {
      const stmt = db.prepare('SELECT * FROM verses WHERE content LIKE ? OR slok LIKE ? OR transliteration LIKE ? LIMIT 50');
      const likeQuery = `%${query}%`;
      const results = stmt.all(likeQuery, likeQuery, likeQuery) as any[];
      
      const mappedResults = results.map((v: any) => ({
        id: v.id,
        text_slug: v.text_slug,
        verse: v.verse,
        chapter: v.chapter,
        sanskrit: v.slok,
        transliteration: v.transliteration,
        ...JSON.parse(v.content)
      }));

      let summary = null;
      if (query && query.trim().split(' ').length > 2 && mappedResults.length > 0) {
        try {
          const generator = await PipelineSingleton.getInstance();
          const context = mappedResults.slice(0, 3).map((r) => r.translation || r.meaning || '').join(' ');
          const prompt = `Answer the question "${query}" in one sentence based on this context: ${context}`;
          const output = await generator(prompt, { max_new_tokens: 40 });
          summary = output[0]?.generated_text || null;
        } catch (err) {
          console.error("NLP error:", err);
        }
      }

      return NextResponse.json({ results: mappedResults, summary });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Lake API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
