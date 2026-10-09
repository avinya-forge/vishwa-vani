/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { validateApiRequest } from '@/lib/api-guard';
import { z } from 'zod';
import { createClient, Client } from '@libsql/client';
import path from 'path';
import fs from 'fs';
import { pipeline } from '@xenova/transformers';

// Schema for search request
const searchSchema = z.object({
  action: z.enum(['QUERY_VERSES', 'SEARCH_LAKE']),
  query: z.string().optional(),
  textSlug: z.string().optional(),
  chapter: z.number().optional(),
  lakeFile: z.string().default('vedic-lake.db'),
});

let cachedClient: Client | null = null;

function getDb(lakeFile: string): Client {
  if (cachedClient) return cachedClient;

  if (process.env.TURSO_DATABASE_URL) {
    cachedClient = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
    return cachedClient;
  }

  const dbPath = path.join(process.cwd(), 'public', lakeFile);
  cachedClient = createClient({
    url: \ile:\\
  });
  return cachedClient;
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
      const result = await db.execute({
        sql: 'SELECT * FROM verses WHERE text_slug = ? AND chapter = ? ORDER BY verse ASC',
        args: [textSlug || '', chapter || 0]
      });
      
      const mappedVerses = result.rows.map((v: any) => ({
        id: v.id,
        verse: v.verse,
        chapter: v.chapter,
        sanskrit: v.slok,
        transliteration: v.transliteration,
        ...(typeof v.content === 'string' ? JSON.parse(v.content) : v.content)
      }));
      return NextResponse.json({ verses: mappedVerses });
    }

    if (action === 'SEARCH_LAKE') {
      const searchPattern = \%\%\;
      const result = await db.execute({
        sql: 'SELECT * FROM verses WHERE content LIKE ? OR slok LIKE ? OR transliteration LIKE ? LIMIT 50',
        args: [searchPattern, searchPattern, searchPattern]
      });

      const mappedVerses = result.rows.map((v: any) => ({
        id: v.id,
        text_slug: v.text_slug,
        chapter: v.chapter,
        verse: v.verse,
        sanskrit: v.slok,
        transliteration: v.transliteration,
        ...(typeof v.content === 'string' ? JSON.parse(v.content) : v.content)
      }));

      return NextResponse.json({ results: mappedVerses });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (e: any) {
    console.error('API Error', e);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
