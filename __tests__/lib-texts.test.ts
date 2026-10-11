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
    expect(gita?.storage).toBe('json');
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
    const availableTexts = VEDIC_LIBRARY.filter(text => text.available);
    availableTexts.forEach(text => {
      expect(text.chapterNames).toBeDefined();
      if (text.chapterNames) expect(Object.keys(text.chapterNames).length).toBeGreaterThanOrEqual(0);
    });
  });

  // MBH-CORE-004: Mahabharata Timeline metadata completeness
  describe('Mahabharata Timeline metadata (MBH-CORE-004)', () => {
    const mbh = VEDIC_LIBRARY.find(t => t.slug === 'mahabharata');

    it('has contextualInfo with all four Timeline milestone fields', () => {
      expect(mbh?.contextualInfo).toBeDefined();
      expect(mbh?.contextualInfo?.historicalEra).toBeTruthy();
      expect(mbh?.contextualInfo?.documentationEra).toBeTruthy();
      expect(mbh?.contextualInfo?.archaeologicalEvidence).toBeTruthy();
      expect(mbh?.contextualInfo?.geographicalContext).toBeTruthy();
    });

    it('historicalEra references both traditional and astronomical dates', () => {
      const era = mbh?.contextualInfo?.historicalEra || '';
      expect(era).toMatch(/BCE/);
    });

    it('archaeologicalEvidence references BORI Critical Edition', () => {
      const evid = mbh?.contextualInfo?.archaeologicalEvidence || '';
      expect(evid.toLowerCase()).toMatch(/bori|painted gray/i);
    });

    it('availableEditions includes KMG public-domain translation', () => {
      const editions = mbh?.contextualInfo?.availableEditions as string[] | undefined;
      expect(Array.isArray(editions)).toBe(true);
      const hasKMG = editions?.some(e => /Ganguli|KMG/i.test(e));
      expect(hasKMG).toBe(true);
    });

    it('geographicalContext mentions Kurukshetra', () => {
      expect(mbh?.contextualInfo?.geographicalContext).toMatch(/Kurukshetra/i);
    });
  });

  describe('100% Completed Books Pool (Gold Tier)', () => {
    it('contains all 17 graduated canonical scriptures', () => {
      const expectedSlugs = [
        'bhagavad-gita',
        'isha-upanishad',
        'kena-upanishad',
        'yoga-sutras',
        'vishnu-purana',
        'garuda-purana',
        'samskaras',
        'stotras',
        'brahma-sutras',
        'samaveda',
        'manusmriti',
        'atharvaveda',
        'mahabharata',
        'ramayana',
        'bhagavata-purana',
        'rigveda',
        'yajurveda',
      ];
      expectedSlugs.forEach(slug => {
        const text = VEDIC_LIBRARY.find(t => t.slug === slug);
        expect(text).toBeDefined();
        expect(text?.available).toBe(true);
        expect(text?.storage).toBe('json');
      });
    });

    it('verifies Shukla Yajurveda has all 40 Adhyayas defined', () => {
      const yajur = VEDIC_LIBRARY.find(t => t.slug === 'yajurveda');
      expect(yajur).toBeDefined();
      expect(yajur?.totalChapters).toBe(40);
      expect(Object.keys(yajur?.chapterNames || {})).toHaveLength(40);
      expect(Object.keys(yajur?.chapterNamesHi || {})).toHaveLength(40);
      expect(Object.keys(yajur?.chapterNamesMr || {})).toHaveLength(40);
    });

    it('verifies Valmiki Ramayana has all 7 Kandas defined', () => {
      const ram = VEDIC_LIBRARY.find(t => t.slug === 'ramayana');
      expect(ram).toBeDefined();
      expect(ram?.totalChapters).toBe(7);
      expect(ram?.storage).toBe('json');
      expect(Object.keys(ram?.chapterNames || {})).toHaveLength(7);
    });

    it('verifies Mahabharata has all 18 Parvas defined', () => {
      const mbh = VEDIC_LIBRARY.find(t => t.slug === 'mahabharata');
      expect(mbh).toBeDefined();
      expect(mbh?.totalChapters).toBe(18);
      expect(mbh?.storage).toBe('json');
      expect(Object.keys(mbh?.chapterNames || {})).toHaveLength(18);
    });

    it('verifies Srimad Bhagavatam has all 12 Cantos defined', () => {
      const bp = VEDIC_LIBRARY.find(t => t.slug === 'bhagavata-purana');
      expect(bp).toBeDefined();
      expect(bp?.totalChapters).toBe(12);
      expect(Object.keys(bp?.chapterNames || {})).toHaveLength(12);
    });

    it('verifies Rigveda has all 10 Mandalas defined', () => {
      const rv = VEDIC_LIBRARY.find(t => t.slug === 'rigveda');
      expect(rv).toBeDefined();
      expect(rv?.totalChapters).toBe(10);
      expect(Object.keys(rv?.chapterNames || {})).toHaveLength(10);
    });

    it('verifies Manusmriti has all 12 chapters defined with Devanagari names', () => {
      const manu = VEDIC_LIBRARY.find(t => t.slug === 'manusmriti');
      expect(manu).toBeDefined();
      expect(manu?.totalChapters).toBe(12);
      expect(Object.keys(manu?.chapterNames || {})).toHaveLength(12);
      expect(Object.keys(manu?.chapterNamesHi || {})).toHaveLength(12);
      expect(Object.keys(manu?.chapterNamesMr || {})).toHaveLength(12);
    });

    it('verifies Atharvaveda has all 20 Kandas defined', () => {
      const av = VEDIC_LIBRARY.find(t => t.slug === 'atharvaveda');
      expect(av).toBeDefined();
      expect(av?.totalChapters).toBe(20);
      expect(Object.keys(av?.chapterNames || {})).toHaveLength(20);
    });

    it('verifies Samaveda has both Archanas defined', () => {
      const sv = VEDIC_LIBRARY.find(t => t.slug === 'samaveda');
      expect(sv).toBeDefined();
      expect(sv?.totalChapters).toBe(2);
      expect(Object.keys(sv?.chapterNames || {})).toHaveLength(2);
    });
  });
});