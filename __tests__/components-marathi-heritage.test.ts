/**
 * Tests for LAB-GITA-012: Marathi Heritage Explorer registry entry.
 */

import { VEDIC_LABS_REGISTRY, getAppsForContext } from '@/lib/vedic-labs-registry'

describe('LAB-GITA-012: MarathiHeritageExplorer registry entry', () => {
  const app = VEDIC_LABS_REGISTRY.find(a => a.id === 'marathi-heritage-explorer')

  it('is registered in VEDIC_LABS_REGISTRY', () => {
    expect(app).toBeDefined()
  })

  it('is available and not a prototype', () => {
    expect(app?.available).toBe(true)
    expect(app?.isPrototype).not.toBe(true)
  })

  it('is scoped to bhagavad-gita with Warkari/Dnyaneshwari topics', () => {
    expect(app?.books).toContain('bhagavad-gita')
    expect(app?.topics).toContain('marathi')
    expect(app?.topics).toContain('dnyaneshwari')
    expect(app?.topics).toContain('warkari')
    expect(app?.topics).toContain('vernacular')
  })

  it('covers chapters spanning the 3-layer reading set', () => {
    expect(app?.chapters?.length).toBeGreaterThanOrEqual(5)
    expect(app?.chapters).toContain(12)
    expect(app?.chapters).toContain(18)
  })

  it('getAppsForContext returns it for ch 12 (bhakti centerpiece)', () => {
    const apps = getAppsForContext('bhagavad-gita', 12)
    expect(apps.map(a => a.id)).toContain('marathi-heritage-explorer')
  })

  it('getAppsForContext does NOT return it for ch 5 (outside its scope)', () => {
    const apps = getAppsForContext('bhagavad-gita', 5)
    expect(apps.map(a => a.id)).not.toContain('marathi-heritage-explorer')
  })
})
