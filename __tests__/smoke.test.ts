import { VEDIC_LIBRARY } from '@/lib/texts'

describe('Vishwa-Vani Smoke Test (PUB-013)', () => {
  it('Core Library has required scriptures', () => {
    const slugs = VEDIC_LIBRARY.map(t => t.slug)
    expect(slugs).toContain('bhagavad-gita')
    expect(slugs).toContain('mahabharata')
    expect(slugs).toContain('isha-upanishad')
  })

  it('Bhagavad Gita has 18 chapters configured', () => {
    const gita = VEDIC_LIBRARY.find(t => t.slug === 'bhagavad-gita')
    expect(gita?.totalChapters).toBe(18)
  })
})
