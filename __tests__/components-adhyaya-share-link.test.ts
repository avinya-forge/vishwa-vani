import { buildAdhyayaLink } from '@/components/shloka/adhyaya-share-link'

describe('buildAdhyayaLink()', () => {
  it('builds a correct deep link URL', () => {
    expect(buildAdhyayaLink('mahabharata', 1, 5)).toBe('/mahabharata/1?adhyaya=5')
  })

  it('handles parva 18 adhyaya 3', () => {
    expect(buildAdhyayaLink('mahabharata', 18, 3)).toBe('/mahabharata/18?adhyaya=3')
  })

  it('works with other text slugs', () => {
    expect(buildAdhyayaLink('bhagavad-gita', 6, 1)).toBe('/bhagavad-gita/6?adhyaya=1')
  })

  it('adhyaya=1 is a valid deep link', () => {
    const url = buildAdhyayaLink('mahabharata', 2, 1)
    expect(url).toContain('adhyaya=1')
    expect(url).toContain('/mahabharata/2')
  })
})
