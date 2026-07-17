import { getTextBySlug, getAvailableTexts, getLibraryStats, getVedicHierarchy, getAllTextChapterPaths } from '@/lib/texts';

describe('Texts Library', () => {
  describe('getTextBySlug', () => {
    it('returns the correct text for a valid slug', () => {
      const text = getTextBySlug('bhagavad-gita');
      expect(text).toBeDefined();
      expect(text?.slug).toBe('bhagavad-gita');
    });

    it('returns undefined for an invalid slug', () => {
      const text = getTextBySlug('invalid-slug');
      expect(text).toBeUndefined();
    });
  });

  describe('getAvailableTexts', () => {
    it('returns only available texts', () => {
      const texts = getAvailableTexts();
      texts.forEach((t) => {
        expect(t.available).toBe(true);
      });
    });
  });

  describe('getLibraryStats', () => {
    it('returns correct library stats', () => {
      const stats = getLibraryStats();
      expect(stats.totalBooks).toBe(getAvailableTexts().length);
      expect(stats.totalChapters).toBeGreaterThan(0);
      expect(stats.totalAuthors).toBeGreaterThan(0);
      expect(stats.totalLangs).toBe(4);
      expect(stats.totalVerses).toBeDefined();
      expect(stats.targetVerses).toBeDefined();
      expect(stats.categories.length).toBeGreaterThan(0);
    });
  });

  describe('getVedicHierarchy', () => {
    it('returns the correct hierarchy structure', () => {
      const hierarchy = getVedicHierarchy();
      expect(hierarchy.tree).toBeDefined();
      expect(hierarchy.statsByCat).toBeDefined();
    });
  });

  describe('getAllTextChapterPaths', () => {
    it('returns paths only for available texts', () => {
      const paths = getAllTextChapterPaths();
      const availableSlugs = getAvailableTexts().map((t) => t.slug);
      paths.forEach((p) => {
        expect(availableSlugs).toContain(p.text);
      });
    });
  });
});
