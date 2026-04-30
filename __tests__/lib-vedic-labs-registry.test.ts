import type {
  LabAppEntry} from '@/lib/vedic-labs-registry';
import {
  VEDIC_LABS_REGISTRY,
  getAppsForContext,
  getAppsByTopics
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

// ISHA-LAB-2: Isha Contemplation Guide registration checks
describe('isha-contemplation-guide registry entry', () => {
  const ishaApp = VEDIC_LABS_REGISTRY.find(a => a.id === 'isha-contemplation-guide')

  it('is registered in VEDIC_LABS_REGISTRY', () => {
    expect(ishaApp).toBeDefined()
  })

  it('is available and not a prototype', () => {
    expect(ishaApp?.available).toBe(true)
    expect(ishaApp?.isPrototype).not.toBe(true)
  })

  it('is scoped to isha-upanishad book', () => {
    expect(ishaApp?.books).toContain('isha-upanishad')
  })

  it('getAppsForContext returns it for isha-upanishad chapter 1', () => {
    const apps = getAppsForContext('isha-upanishad', 1)
    expect(apps.map(a => a.id)).toContain('isha-contemplation-guide')
  })

  it('getAppsForContext does NOT return it for bhagavad-gita', () => {
    const apps = getAppsForContext('bhagavad-gita', 1)
    expect(apps.map(a => a.id)).not.toContain('isha-contemplation-guide')
  })
})

describe('LAB-GITA-001: ArjunasCrisisCounselor registry entry', () => {
  const app = VEDIC_LABS_REGISTRY.find(a => a.id === 'arjunas-crisis-counselor')

  it('is registered in VEDIC_LABS_REGISTRY', () => {
    expect(app).toBeDefined()
  })

  it('is available and not a prototype', () => {
    expect(app?.available).toBe(true)
    expect(app?.isPrototype).not.toBe(true)
  })

  it('is scoped to bhagavad-gita chapter 1', () => {
    expect(app?.books).toContain('bhagavad-gita')
    expect(app?.chapters).toContain(1)
  })

  it('getAppsForContext returns it for bhagavad-gita chapter 1', () => {
    const apps = getAppsForContext('bhagavad-gita', 1)
    expect(apps.map(a => a.id)).toContain('arjunas-crisis-counselor')
  })

  it('getAppsForContext does NOT return it for bhagavad-gita chapter 2', () => {
    const apps = getAppsForContext('bhagavad-gita', 2)
    expect(apps.map(a => a.id)).not.toContain('arjunas-crisis-counselor')
  })
})
