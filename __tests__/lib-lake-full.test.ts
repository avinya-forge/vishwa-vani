import { VEDIC_LIBRARY } from '@/lib/texts';
import {
  getKnowledgeTokensFromLakeServer,
  getDynamicLibraryStats,
  getDynamicDatabaseVersesCount
} from '@/lib/server-lake';

describe('Vedic Library', () => {
  it('should contain yoga-sutras', () => {
    const text = VEDIC_LIBRARY.find(v => v.slug === 'yoga-sutras');
    expect(text).toBeDefined();
  });
});

describe('Server Lake Database Operations (LibSQL / SQLite ADR-008)', () => {
  it('retrieves knowledge tokens from public/vedic-lake.db', async () => {
    const tokens = await getKnowledgeTokensFromLakeServer();
    expect(tokens.length).toBeGreaterThanOrEqual(17);
    const firstToken = tokens[0] as Record<string, unknown>;
    expect(firstToken).toHaveProperty('id');
    expect(firstToken).toHaveProperty('domain');
    expect(firstToken).toHaveProperty('sanskritTerm');
    expect(firstToken).toHaveProperty('empiricalFact');
  });

  it('computes dynamic library stats correctly', async () => {
    const stats = await getDynamicLibraryStats();
    expect(stats.completedBooks).toBeGreaterThanOrEqual(19);
    expect(stats.totalBooks).toBeGreaterThanOrEqual(19);
    expect(stats.completedVerses).toBeGreaterThan(1200);
    expect(stats.totalAuthors).toBeGreaterThan(0);
  });

  it('returns dynamic database verses count', async () => {
    const count = await getDynamicDatabaseVersesCount();
    expect(typeof count).toBe('number');
  });
});
