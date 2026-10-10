import { promises as fs } from 'fs';
import path from 'path';
import { getAvailableTexts, COMPLETED_BOOKS_SLUGS } from './texts';
import { getLiveScholars } from './scholars';
import { getClient } from './server-lake';

export async function getDynamicLibraryStats() {
  const manifestPath = path.join(process.cwd(), 'data', 'manifest.json');
  let manifestBooks: any[] = [];
  try {
    const manifestRaw = await fs.readFile(manifestPath, 'utf8');
    const manifest = JSON.parse(manifestRaw);
    manifestBooks = manifest.books || [];
  } catch (error) {
    console.error('Failed to read manifest.json', error);
  }

  let completedVerses = 0;
  let completedChapters = 0;

  let pipelineVerses = 0;
  let pipelineChapters = 0;
  let pipelineBooksCount = 0;

  for (const book of manifestBooks) {
    if (book.status === 'GOLD' && COMPLETED_BOOKS_SLUGS.includes(book.book_id)) {
      completedVerses += book.total_verses || 0;
      completedChapters += book.total_chapters || 0;
    } else {
      pipelineVerses += book.total_verses || 0;
      pipelineChapters += book.total_chapters || 0;
      pipelineBooksCount++;
    }
  }

  let databaseVerses = 0;
  try {
    const client = getClient('vedic-lake.db');
    const result = await client.execute('SELECT COUNT(*) as count FROM verses');
    databaseVerses = Number(result.rows[0].count) || 0;
  } catch (error) {
    console.error('Failed to query database verses from lake', error);
  }

  const completedBooks = COMPLETED_BOOKS_SLUGS.length;

  const available = getAvailableTexts();

  return {
    completedBooks,
    completedChapters,
    completedVerses,
    pipelineBooks: pipelineBooksCount,
    pipelineChapters,
    pipelineVerses,
    databaseVerses,
    totalBooks: available.length,
    totalChapters: available.reduce((acc, t) => acc + t.totalChapters, 0),
    totalVerses: `${(completedVerses + pipelineVerses).toLocaleString()}+`,
    targetVerses: '100,000+',
    totalAuthors: getLiveScholars().length,
    totalLangs: 4, // Sanskrit, English, Hindi, Marathi
    categories: Array.from(new Set(available.map(t => t.category)))
  };
}
