import path from 'path';
import fs from 'fs';
import { UniversalLakeSyncer } from '../lib/engine/lake-sync';
import type { ChapterShard, ExtractedKnowledgeToken, ExtractedChapterSummary } from '../lib/engine/types';

describe('UniversalLakeSyncer (Data Lake Persistence Engine)', () => {
  const syncer = new UniversalLakeSyncer();
  const testDbPath = path.join(__dirname, 'test-temp-lake.db');

  afterAll(() => {
    if (fs.existsSync(testDbPath)) {
      try {
        fs.unlinkSync(testDbPath);
      } catch {}
    }
  });

  const mockShard: ChapterShard = {
    book_id: 'test-lake-book',
    chapter: 1,
    total_verses: 1,
    verses: [
      {
        id: 'test_1_1',
        text_slug: 'test-lake-book',
        chapter: 1,
        verse: 1,
        original: 'सत्यमेव जयते नानृतम् ॥',
        transliteration: 'satyameva jayate nānṛtam ||',
        translation: 'Truth alone triumphs, not falsehood.',
        meaning: 'Upanishadic declaration on the eternal ontological supremacy of truth.',
        commentaries: {
          'test-author': {
            en: 'Truth dissolves all empirical illusions.',
          },
        },
      },
    ],
  };

  const mockToken: ExtractedKnowledgeToken = {
    id: 'test-token-1',
    domain: 'epistemology',
    title: 'Ontological Supremacy of Truth',
    sanskritTerm: 'Satya-Pramāṇa (सत्य-प्रमाण)',
    scriptureSlug: 'test-lake-book',
    scriptureName: 'Test Lake Scripture',
    chapter: 1,
    verseRange: '1',
    ancientObservation: 'Truth alone triumphs.',
    modernCorroboration: 'Corroborated by epistemological verifiability.',
    empiricalFact: 'Truth is invariant reality.',
    keyCitations: [
      {
        sanskrit: 'सत्यमेव जयते',
        transliteration: 'satyameva jayate',
        verseUrl: '/test-lake-book/1#1',
      },
    ],
    tags: ['epistemology', 'satya'],
  };

  const mockSummary: ExtractedChapterSummary = {
    chapter: 1,
    title: 'Chapter 1: The Supreme Truth',
    sanskritTitle: 'सत्य-प्रकरणम्',
    totalVerses: 1,
    veryShort: 'Truth alone triumphs.',
    short: {
      topics: ['Satya'],
      coreDilemma: 'Truth vs falsehood',
      philosophicalResolution: 'Truth is eternal',
      anchorVerse: {
        chapter: 1,
        verse: 1,
        sanskrit: 'सत्यमेव जयते',
        transliteration: 'satyameva jayate',
        translation: 'Truth triumphs',
        deepDiveUrl: '/test-lake-book/1#1',
      },
    },
    long: {
      overview: 'Overview of truth',
      thematicSections: [],
      scholarPerspectives: [],
      conclusions: ['Truth wins'],
    },
    veryLong: {
      purvapaksha: [],
      siddhanta: [],
      sadhanaInstructions: [],
      etymologicalNotes: [],
    },
  };

  it('initializes SQLite database tables and batch syncs data', () => {
    const stats = syncer.syncToLocalSqlite(
      'test-lake-book',
      [mockShard],
      [mockToken],
      [mockSummary],
      testDbPath
    );

    expect(stats.localSqliteSuccess).toBe(true);
    expect(stats.versesSynced).toBe(1);
    expect(stats.tokensSynced).toBe(1);
    expect(stats.summariesSynced).toBe(1);
    expect(fs.existsSync(testDbPath)).toBe(true);
  });

  it('loads existing gold shards from disk with normalization', () => {
    const ishaShards = syncer.loadGoldShardsFromDisk('isha-upanishad');
    expect(ishaShards.length).toBeGreaterThan(0);
    const firstShard = ishaShards[0];
    expect(firstShard.verses.length).toBe(19);
    expect(firstShard.verses[0].original).toBeDefined();
    expect(firstShard.verses[0].chapter).toBe(1);
    expect(firstShard.verses[0].text_slug).toBe('isha-upanishad');
  });
});
