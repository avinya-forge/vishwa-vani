import {
  TATTVA_SAMGRAHA_DIGESTS,
  getAllTattvaDigests,
  getTattvaDigestBySlug
} from '@/lib/speed-reader'

describe('Tattva Samgraha Speed Reader Engine (ADR-006)', () => {
  it('loads all digests successfully', () => {
    expect(Object.keys(TATTVA_SAMGRAHA_DIGESTS).length).toBeGreaterThanOrEqual(5)
    const digests = getAllTattvaDigests()
    expect(digests.length).toBeGreaterThanOrEqual(5)
  })

  it('retrieves Bhagavad Gita digest with valid fields', () => {
    const gita = getTattvaDigestBySlug('bhagavad-gita')
    expect(gita).toBeDefined()
    expect(gita?.slug).toBe('bhagavad-gita')
    expect(gita?.estimatedReadMinutes).toBe(50)
    expect(gita?.totalOriginalVerses).toBe(701)
    expect(gita?.signpostVerses.length).toBeGreaterThanOrEqual(4)
    expect(gita?.philosophicalPillars.length).toBeGreaterThanOrEqual(3)
    expect(gita?.sadhanaTakeaways.length).toBeGreaterThanOrEqual(2)
  })

  it('every signpost verse contains authentic Devanagari Sanskrit and deep dive URL', () => {
    const digests = getAllTattvaDigests()
    digests.forEach(digest => {
      expect(digest.signpostVerses.length).toBeGreaterThan(0)
      digest.signpostVerses.forEach(verse => {
        expect(verse.chapter).toBeGreaterThan(0)
        expect(verse.verse).toBeGreaterThan(0)
        expect(verse.sanskrit.length).toBeGreaterThan(5)
        expect(verse.transliteration.length).toBeGreaterThan(5)
        expect(verse.translation.length).toBeGreaterThan(10)
        expect(verse.essence.length).toBeGreaterThan(10)
        expect(verse.actionableTakeaway.length).toBeGreaterThan(10)
        expect(verse.deepDiveUrl).toMatch(/^\/[a-z-]+/i)
      })
    })
  })

  it('returns null for unknown book slug', () => {
    const missing = getTattvaDigestBySlug('unknown-ancient-text')
    expect(missing).toBeNull()
  })
})
