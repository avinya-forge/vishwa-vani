import { getActiveDailyShlokas, getTodaysShloka, ALL_WISDOM_CORPUS, registerDailyVerse } from '@/lib/daily-shloka'
import { isTextCompleted } from '@/lib/texts'

describe('Daily Shloka ("दैनिक श्लोक") Engine', () => {
  it('contains wisdom corpus entries spanning multiple canonical scriptures', () => {
    expect(ALL_WISDOM_CORPUS.length).toBeGreaterThanOrEqual(17)
  })

  it('filters active shlokas strictly by 100% completed scriptures', () => {
    const active = getActiveDailyShlokas()
    expect(active.length).toBeGreaterThan(0)

    active.forEach(v => {
      expect(isTextCompleted(v.bookSlug)).toBe(true)
    })
  })

  it('guarantees complete authentic fields for every verse', () => {
    const active = getActiveDailyShlokas()

    active.forEach(v => {
      expect(v.id).toBeTruthy()
      expect(v.bookSlug).toBeTruthy()
      expect(v.bookName).toBeTruthy()
      expect(v.bookNameDevanagari).toBeTruthy()
      expect(v.chapter).toBeGreaterThan(0)
      expect(v.verse).toBeGreaterThan(0)
      expect(v.sanskrit.trim().length).toBeGreaterThan(5)
      expect(v.transliteration.trim().length).toBeGreaterThan(5)
      expect(v.translation.trim().length).toBeGreaterThan(10)
      expect(v.commentaries.length).toBeGreaterThan(0)

      v.commentaries.forEach(c => {
        expect(c.scholar.trim().length).toBeGreaterThan(2)
        expect(c.lineage.trim().length).toBeGreaterThan(2)
        expect(c.content.trim().length).toBeGreaterThan(10)
      })
    })
  })

  it('returns a valid daily verse from getTodaysShloka()', () => {
    const today = getTodaysShloka()
    expect(today).toBeDefined()
    expect(today.sanskrit).toBeTruthy()
    expect(today.translation).toBeTruthy()
    expect(isTextCompleted(today.bookSlug)).toBe(true)
  })

  it('allows registering and updating daily verses dynamically', () => {
    const testVerse = {
      id: 'dynamic-test-shloka-1',
      bookSlug: 'bhagavad-gita',
      bookName: 'Bhagavad Gita',
      bookNameDevanagari: 'भगवद्गीता',
      chapter: 18,
      verse: 66,
      theme: 'Sharanagati',
      category: 'Itihasa',
      sanskrit: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज ।',
      transliteration: 'sarva-dharmān parityajya mām ekaṃ śaraṇaṃ vraja |',
      translation: 'Abandon all varieties of dharma and simply surrender unto Me alone.',
      commentaries: [],
    }

    // Insert new
    registerDailyVerse(testVerse)
    expect(ALL_WISDOM_CORPUS.some(v => v.id === 'dynamic-test-shloka-1')).toBe(true)

    // Update existing
    registerDailyVerse({ ...testVerse, translation: 'Updated translation text.' })
    const updated = ALL_WISDOM_CORPUS.find(v => v.id === 'dynamic-test-shloka-1')
    expect(updated?.translation).toBe('Updated translation text.')
  })
})
