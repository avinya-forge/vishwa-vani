import {
  VEDIC_LABS_REGISTRY,
  getAppsForContext,
  getAppsByTopics,
  LabAppEntry,
} from '@/lib/vedic-labs-registry'

describe('VEDIC_LABS_REGISTRY', () => {
  it('has at least 8 entries', () => {
    expect(VEDIC_LABS_REGISTRY.length).toBeGreaterThanOrEqual(8)
  })

  it('every entry has required fields', () => {
    VEDIC_LABS_REGISTRY.forEach((app: LabAppEntry) => {
      expect(typeof app.id).toBe('string')
      expect(app.id.length).toBeGreaterThan(0)
      expect(typeof app.name).toBe('string')
      expect(typeof app.path).toBe('string')
      expect(Array.isArray(app.books)).toBe(true)
      expect(Array.isArray(app.topics)).toBe(true)
      expect(typeof app.available).toBe('boolean')
    })
  })

  it('all available apps have non-empty topics', () => {
    VEDIC_LABS_REGISTRY.filter(a => a.available).forEach(app => {
      expect(app.topics.length).toBeGreaterThan(0)
    })
  })
})

describe('getAppsForContext()', () => {
  it('returns karma-yoga for bhagavad-gita chapter 3', () => {
    const apps = getAppsForContext('bhagavad-gita', 3)
    const ids = apps.map(a => a.id)
    expect(ids).toContain('karma-yoga-simulator')
  })

  it('returns akshauhini for mahabharata', () => {
    const apps = getAppsForContext('mahabharata')
    expect(apps.map(a => a.id)).toContain('akshauhini-calc')
  })

  it('excludes unavailable apps', () => {
    const apps = getAppsForContext('bhagavad-gita', 13)
    expect(apps.every(a => a.available)).toBe(true)
  })

  it('excludes prototype apps by default', () => {
    const apps = getAppsForContext('bhagavad-gita')
    expect(apps.every(a => !a.isPrototype)).toBe(true)
  })

  it('includes prototype apps when includePrototypes is true', () => {
    const apps = getAppsForContext('bhagavad-gita', undefined, { includePrototypes: true })
    const hasPrototype = apps.some(a => a.isPrototype)
    expect(hasPrototype).toBe(true)
  })

  it('returns global apps (empty books list) for any book', () => {
    const apps = getAppsForContext('isha-upanishad', undefined, { includePrototypes: true })
    // chhanda-analyzer and grammar-tokenizer have books: [] so should appear
    const ids = apps.map(a => a.id)
    expect(ids).toContain('chhanda-analyzer')
    expect(ids).toContain('grammar-tokenizer')
  })
})

describe('getAppsByTopics()', () => {
  it('returns karma-yoga for topic "karma"', () => {
    const apps = getAppsByTopics(['karma'])
    expect(apps.map(a => a.id)).toContain('karma-yoga-simulator')
  })

  it('is case-insensitive', () => {
    const lower = getAppsByTopics(['karma'])
    const upper = getAppsByTopics(['KARMA'])
    expect(lower.map(a => a.id)).toEqual(upper.map(a => a.id))
  })

  it('returns empty array for unknown topic', () => {
    expect(getAppsByTopics(['nonexistent-topic-xyz'])).toEqual([])
  })
})
