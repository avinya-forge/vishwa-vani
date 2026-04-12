import {
  VEDIC_LIBRARY,
  getTextBySlug,
  getAvailableTexts,
  getLibraryStats,
  getVedicHierarchy,
  getAllTextChapterPaths,
} from '@/lib/texts';

// ─── getTextBySlug ─────────────────────────────────────────────────────────────

describe('getTextBySlug', () => {
  it('returns the correct text for a known slug', () => {
    const gita = getTextBySlug('bhagavad-gita');
    expect(gita).toBeDefined();
    expect(gita?.name).toBe('Bhagavad Gita');
    expect(gita?.totalChapters).toBe(18);
  });

  it('returns undefined for an unknown slug', () => {
    expect(getTextBySlug('non-existent-text')).toBeUndefined();
  });

  it('returns the correct text for mahabharata slug', () => {
    const mbh = getTextBySlug('mahabharata');
    expect(mbh).toBeDefined();
    expect(mbh?.slug).toBe('mahabharata');
  });

  it('returns undefined for empty string', () => {
    expect(getTextBySlug('')).toBeUndefined();
  });

  it('returns isha-upanishad for its slug', () => {
    const isha = getTextBySlug('isha-upanishad');
    expect(isha).toBeDefined();
    expect(isha?.category).toBe('upanishad');
  });
});

// ─── getAvailableTexts ────────────────────────────────────────────────────────

describe('getAvailableTexts', () => {
  it('returns only texts where available is true', () => {
    const available = getAvailableTexts();
    available.forEach(t => expect(t.available).toBe(true));
  });

  it('returns fewer or equal texts than the full library', () => {
    expect(getAvailableTexts().length).toBeLessThanOrEqual(VEDIC_LIBRARY.length);
  });

  it('includes Bhagavad Gita in available texts', () => {
    const slugs = getAvailableTexts().map(t => t.slug);
    expect(slugs).toContain('bhagavad-gita');
  });

  it('includes Mahabharata in available texts', () => {
    const slugs = getAvailableTexts().map(t => t.slug);
    expect(slugs).toContain('mahabharata');
  });
});

// ─── getLibraryStats ─────────────────────────────────────────────────────────

describe('getLibraryStats', () => {
  it('returns a valid stats object', () => {
    const stats = getLibraryStats();
    expect(stats).toBeDefined();
    expect(typeof stats.totalBooks).toBe('number');
    expect(typeof stats.totalChapters).toBe('number');
    expect(typeof stats.totalAuthors).toBe('number');
    expect(typeof stats.totalLangs).toBe('number');
    expect(typeof stats.totalVerses).toBe('string');
    expect(typeof stats.targetVerses).toBe('string');
    expect(Array.isArray(stats.categories)).toBe(true);
  });

  it('totalBooks matches count of available texts', () => {
    const stats = getLibraryStats();
    expect(stats.totalBooks).toBe(getAvailableTexts().length);
  });

  it('totalChapters is positive and sums available texts', () => {
    const stats = getLibraryStats();
    const expected = getAvailableTexts().reduce((acc, t) => acc + t.totalChapters, 0);
    expect(stats.totalChapters).toBe(expected);
  });

  it('categories array is non-empty and contains valid values', () => {
    const stats = getLibraryStats();
    const validCategories = ['itihas', 'upanishad', 'veda', 'purana', 'other'];
    stats.categories.forEach(cat => expect(validCategories).toContain(cat));
  });

  it('itihas category is present', () => {
    const stats = getLibraryStats();
    expect(stats.categories).toContain('itihas');
  });
});

// ─── getVedicHierarchy ────────────────────────────────────────────────────────

describe('getVedicHierarchy', () => {
  it('returns a hierarchy object with tree and statsByCat', () => {
    const hierarchy = getVedicHierarchy();
    expect(hierarchy).toBeDefined();
    expect(Array.isArray(hierarchy.tree)).toBe(true);
    expect(typeof hierarchy.statsByCat).toBe('object');
  });

  it('tree contains root-level texts (no parentSlug)', () => {
    const hierarchy = getVedicHierarchy();
    hierarchy.tree.forEach(node => {
      expect(node.parentSlug).toBeUndefined();
    });
  });

  it('statsByCat has books and fragments counts for itihas', () => {
    const hierarchy = getVedicHierarchy();
    expect(hierarchy.statsByCat['itihas']).toBeDefined();
    expect(hierarchy.statsByCat['itihas'].books).toBeGreaterThan(0);
    expect(hierarchy.statsByCat['itihas'].fragments).toBeGreaterThan(0);
  });

  it('tree nodes include their children', () => {
    const hierarchy = getVedicHierarchy();
    hierarchy.tree.forEach(node => {
      expect(Array.isArray(node.children)).toBe(true);
    });
  });
});

// ─── getAllTextChapterPaths ────────────────────────────────────────────────────

describe('getAllTextChapterPaths', () => {
  it('returns an array of {text, chapter} objects', () => {
    const paths = getAllTextChapterPaths();
    expect(Array.isArray(paths)).toBe(true);
    paths.forEach(p => {
      expect(typeof p.text).toBe('string');
      expect(typeof p.chapter).toBe('string');
    });
  });

  it('chapter values are string representations of positive integers', () => {
    const paths = getAllTextChapterPaths();
    paths.forEach(p => {
      const n = parseInt(p.chapter);
      expect(n).toBeGreaterThan(0);
    });
  });

  it('only includes paths for available texts', () => {
    const paths = getAllTextChapterPaths();
    const availableSlugs = getAvailableTexts().map(t => t.slug);
    paths.forEach(p => expect(availableSlugs).toContain(p.text));
  });

  it('generates correct number of paths for Bhagavad Gita (18 chapters)', () => {
    const paths = getAllTextChapterPaths();
    const gitaPaths = paths.filter(p => p.text === 'bhagavad-gita');
    expect(gitaPaths.length).toBe(18);
    expect(gitaPaths[0].chapter).toBe('1');
    expect(gitaPaths[17].chapter).toBe('18');
  });

  it('total paths equals sum of totalChapters for available texts', () => {
    const paths = getAllTextChapterPaths();
    const expected = getAvailableTexts().reduce((acc, t) => acc + t.totalChapters, 0);
    expect(paths.length).toBe(expected);
  });
});
