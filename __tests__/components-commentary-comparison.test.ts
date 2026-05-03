/**
 * Tests for LAB-GITA-011: Commentary Comparison Tool registry entry.
 */

import { VEDIC_LABS_REGISTRY, getAppsForContext } from '@/lib/vedic-labs-registry'

describe('LAB-GITA-011: CommentaryComparisonTool registry entry', () => {
  const app = VEDIC_LABS_REGISTRY.find(a => a.id === 'commentary-comparison-tool')

  it('is registered in VEDIC_LABS_REGISTRY', () => {
    expect(app).toBeDefined()
  })

  it('is available and not a prototype', () => {
    expect(app?.available).toBe(true)
    expect(app?.isPrototype).not.toBe(true)
  })

  it('is scoped to bhagavad-gita across multiple chapters', () => {
    expect(app?.books).toContain('bhagavad-gita')
    expect(app?.chapters?.length).toBeGreaterThanOrEqual(5)
  })

  it('has comparison and lineage topics', () => {
    expect(app?.topics).toContain('commentary')
    expect(app?.topics).toContain('comparison')
    expect(app?.topics).toContain('iskcon')
    expect(app?.topics).toContain('dnyaneshwar')
  })

  it('getAppsForContext returns it for ch 18 (carama-śloka)', () => {
    const apps = getAppsForContext('bhagavad-gita', 18)
    expect(apps.map(a => a.id)).toContain('commentary-comparison-tool')
  })

  it('getAppsForContext does NOT return it for chapters outside its scope', () => {
    const apps = getAppsForContext('bhagavad-gita', 8)
    expect(apps.map(a => a.id)).not.toContain('commentary-comparison-tool')
  })
})
