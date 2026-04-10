import { VEDIC_LIBRARY } from '../lib/texts'

describe('Vishwa-Vani E2E Smoke Test (PUB-013)', () => {
  it('Validates library structure', () => {
    expect(VEDIC_LIBRARY.length).toBeGreaterThan(0)
    const gita = VEDIC_LIBRARY.find(t => t.slug === 'bhagavad-gita')
    expect(gita).toBeDefined()
    if (gita) {
      expect(gita.available).toBe(true)
    }
  })

  it('Verifies book categories', () => {
    const categories = new Set(VEDIC_LIBRARY.map(t => t.category))
    expect(categories.has('itihas')).toBe(true)
    expect(categories.has('upanishad')).toBe(true)
  })
})
