import {
  calculateReadingTime,
  calculateBookReadTime,
  getChapterSummariesBySlug,
  getAllChapterSummaries,
  CHAPTER_SUMMARIES_REGISTRY
} from '@/lib/chapter-summaries'

describe('Multi-Tier Chapter Summaries Engine (ADR-007)', () => {
  describe('Dynamic Reading Time Calculator', () => {
    it('handles empty and whitespace-only text gracefully with minimum 1 min', () => {
      expect(calculateReadingTime('')).toBe(1)
      expect(calculateReadingTime('   ')).toBe(1)
      // @ts-expect-error testing invalid input runtime safety
      expect(calculateReadingTime(null)).toBe(1)
    })

    it('calculates dynamic reading time accurately at 200 WPM', () => {
      const words50 = new Array(50).fill('dharma').join(' ')
      expect(calculateReadingTime(words50)).toBe(1) // 50/200 = 0.25 -> ceil = 1

      const words350 = new Array(350).fill('jnana').join(' ')
      expect(calculateReadingTime(words350)).toBe(2) // 350/200 = 1.75 -> ceil = 2

      const words650 = new Array(650).fill('bhakti').join(' ')
      expect(calculateReadingTime(words650)).toBe(4) // 650/200 = 3.25 -> ceil = 4
    })

    it('supports custom WPM speeds', () => {
      const words300 = new Array(300).fill('moksha').join(' ')
      expect(calculateReadingTime(words300, 100)).toBe(3) // 300 / 100 = 3
      expect(calculateReadingTime(words300, 300)).toBe(1) // 300 / 300 = 1
    })
  })

  describe('calculateBookReadTime across Granularity Tiers', () => {
    it('computes reading time for each granularity tier with progressive time expansion', () => {
      const gita = getChapterSummariesBySlug('bhagavad-gita')
      expect(gita).toBeDefined()
      if (!gita) return

      const timeVeryShort = calculateBookReadTime(gita, 'very_short')
      const timeShort = calculateBookReadTime(gita, 'short')
      const timeLong = calculateBookReadTime(gita, 'long')
      const timeVeryLong = calculateBookReadTime(gita, 'very_long')

      expect(timeVeryShort).toBeGreaterThanOrEqual(1)
      expect(timeShort).toBeGreaterThanOrEqual(timeVeryShort)
      expect(timeLong).toBeGreaterThanOrEqual(timeShort)
      expect(timeVeryLong).toBeGreaterThanOrEqual(timeLong)
    })
  })

  describe('Chapter Summaries Registry & Retrieval', () => {
    it('loads all registered scripture summaries', () => {
      const all = getAllChapterSummaries()
      expect(all.length).toBeGreaterThanOrEqual(3)
      expect(Object.keys(CHAPTER_SUMMARIES_REGISTRY).length).toBeGreaterThanOrEqual(3)
    })

    it('retrieves Bhagavad Gita chapter summaries with multi-scholar perspectives', () => {
      const gita = getChapterSummariesBySlug('bhagavad-gita')
      expect(gita).not.toBeNull()
      expect(gita?.bookSlug).toBe('bhagavad-gita')
      expect(gita?.chapters.length).toBeGreaterThanOrEqual(3)

      const ch2 = gita?.chapters.find(c => c.chapter === 2)
      expect(ch2).toBeDefined()
      expect(ch2?.title).toBe('The Yoga of Knowledge')
      expect(ch2?.sanskritTitle).toContain('साङ्ख्ययोग')
      expect(ch2?.veryShort.length).toBeGreaterThan(20)

      // Short tier validation
      expect(ch2?.short.topics.length).toBeGreaterThanOrEqual(3)
      expect(ch2?.short.coreDilemma.length).toBeGreaterThan(10)
      expect(ch2?.short.philosophicalResolution.length).toBeGreaterThan(10)
      expect(ch2?.short.anchorVerse.sanskrit.length).toBeGreaterThan(10)
      expect(ch2?.short.anchorVerse.deepDiveUrl).toMatch(/^\/bhagavad-gita\/2#/)

      // Long tier validation
      expect(ch2?.long.thematicSections.length).toBeGreaterThanOrEqual(3)
      expect(ch2?.long.scholarPerspectives.length).toBeGreaterThanOrEqual(3)
      const traditions = ch2?.long.scholarPerspectives.map(p => p.tradition).join(' ')
      expect(traditions).toContain('Advaita')
      expect(traditions).toContain('Vishishtadvaita')

      // Very Long tier validation
      expect(ch2?.veryLong.purvapaksha.length).toBeGreaterThanOrEqual(2)
      expect(ch2?.veryLong.siddhanta.length).toBeGreaterThanOrEqual(2)
      expect(ch2?.veryLong.sadhanaInstructions.length).toBeGreaterThanOrEqual(1)
      expect(ch2?.veryLong.etymologicalNotes.length).toBeGreaterThanOrEqual(1)
    })

    it('retrieves Isha Upanishad summaries correctly', () => {
      const isha = getChapterSummariesBySlug('isha-upanishad')
      expect(isha).not.toBeNull()
      expect(isha?.bookSlug).toBe('isha-upanishad')
      expect(isha?.chapters.length).toBe(1)
      expect(isha?.chapters[0].short.anchorVerse.deepDiveUrl).toBe('/isha-upanishad/1#1')
    })

    it('retrieves Yoga Sutras summaries correctly', () => {
      const yoga = getChapterSummariesBySlug('yoga-sutras')
      expect(yoga).not.toBeNull()
      expect(yoga?.bookSlug).toBe('yoga-sutras')
      expect(yoga?.chapters[0].title).toContain('Samadhi Pada')
      expect(yoga?.chapters[0].short.anchorVerse.deepDiveUrl).toBe('/yoga-sutras/1#2')
    })

    it('returns null for nonexistent book slug', () => {
      expect(getChapterSummariesBySlug('nonexistent-scripture')).toBeNull()
    })

    it('ensures every chapter summary across all books has valid anchor verse links and Sanskrit', () => {
      const allBooks = getAllChapterSummaries()
      allBooks.forEach(book => {
        expect(book.chapters.length).toBeGreaterThan(0)
        book.chapters.forEach(ch => {
          expect(ch.chapter).toBeGreaterThan(0)
          expect(ch.title.length).toBeGreaterThan(0)
          expect(ch.sanskritTitle.length).toBeGreaterThan(0)
          expect(ch.totalVerses).toBeGreaterThan(0)
          expect(ch.short.anchorVerse.sanskrit.length).toBeGreaterThan(5)
          expect(ch.short.anchorVerse.translation.length).toBeGreaterThan(10)
          expect(ch.short.anchorVerse.deepDiveUrl).toMatch(/^\/[a-z0-9-]+/i)
        })
      })
    })
  })
})
