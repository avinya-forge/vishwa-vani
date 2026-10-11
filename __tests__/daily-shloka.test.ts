import { getActiveDailyShlokas, getTodaysShloka, ALL_WISDOM_CORPUS } from '@/lib/daily-shloka'
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
})
