import { VEDIC_LIBRARY } from '@/lib/texts';
import type { VedicText } from '@/lib/texts';

describe('VEDIC_LIBRARY', () => {
  it('should contain valid VedicText entries', () => {
    expect(VEDIC_LIBRARY).toBeDefined();
    expect(Array.isArray(VEDIC_LIBRARY)).toBe(true);
    expect(VEDIC_LIBRARY.length).toBeGreaterThan(0);

    VEDIC_LIBRARY.forEach((text: VedicText) => {
      expect(text).toHaveProperty('slug');
      expect(text).toHaveProperty('name');
      expect(text).toHaveProperty('totalChapters');
      expect(text).toHaveProperty('category');
      expect(text).toHaveProperty('available');
      expect(typeof text.slug).toBe('string');
      expect(typeof text.name).toBe('string');
      expect(typeof text.totalChapters).toBe('number');
      expect(['itihas', 'upanishad', 'veda', 'purana', 'other']).toContain(text.category);
    });
  });

  it('should have Bhagavad Gita properly configured', () => {
    const gita = VEDIC_LIBRARY.find(text => text.slug === 'bhagavad-gita');
    expect(gita).toBeDefined();
    expect(gita?.name).toBe('Bhagavad Gita');
    expect(gita?.totalChapters).toBe(18);
    expect(gita?.category).toBe('itihas');
    expect(gita?.available).toBe(true);
    expect(gita?.storage).toBe('lake');
    expect(gita?.lakeFile).toBe('vedic-lake.db');
  });

  it('should have Mahabharata as parent of Bhagavad Gita', () => {
    const gita = VEDIC_LIBRARY.find(text => text.slug === 'bhagavad-gita');
    const mahabharata = VEDIC_LIBRARY.find(text => text.slug === 'mahabharata');

    expect(gita?.parent).toBe('mahabharata');
    expect(mahabharata?.children).toContain('bhagavad-gita');
  });

  it('should have unique slugs', () => {
    const slugs = VEDIC_LIBRARY.map(text => text.slug);
    const uniqueSlugs = [...new Set(slugs)];
    expect(slugs.length).toBe(uniqueSlugs.length);
  });

  it('should have valid chapter names for available texts', () => {
    const availableTexts = VEDIC_LIBRARY.filter(text => text.available && text.slug !== 'samaveda' && text.slug !== 'yajurveda' && text.slug !== 'atharvaveda');
    availableTexts.forEach(text => {
      expect(text.chapterNames).toBeDefined();
      expect(Object.keys(text.chapterNames).length).toBeGreaterThan(0);
    });
  });
});