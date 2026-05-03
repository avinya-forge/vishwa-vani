/**
 * Tests for LAB-GITA-013: Consciousness State Mapper registry entry.
 */

import { VEDIC_LABS_REGISTRY, getAppsForContext } from '@/lib/vedic-labs-registry'

describe('LAB-GITA-013: ConsciousnessStateMapper registry entry', () => {
  const app = VEDIC_LABS_REGISTRY.find(a => a.id === 'consciousness-state-mapper')

  it('is registered in VEDIC_LABS_REGISTRY', () => {
    expect(app).toBeDefined()
  })

  it('is available and not a prototype', () => {
    expect(app?.available).toBe(true)
    expect(app?.isPrototype).not.toBe(true)
  })

  it('is scoped to bhagavad-gita chapters 7, 13, 15', () => {
    expect(app?.books).toContain('bhagavad-gita')
    expect(app?.chapters).toContain(7)
    expect(app?.chapters).toContain(13)
    expect(app?.chapters).toContain(15)
  })

  it('carries the four-state topic set', () => {
    expect(app?.topics).toContain('jagrat')
    expect(app?.topics).toContain('svapna')
    expect(app?.topics).toContain('sushupti')
    expect(app?.topics).toContain('turiya')
    expect(app?.topics).toContain('mandukya')
  })

  it('getAppsForContext returns it for ch 13 (kṣetra/kṣetrajña)', () => {
    const apps = getAppsForContext('bhagavad-gita', 13)
    expect(apps.map(a => a.id)).toContain('consciousness-state-mapper')
  })

  it('getAppsForContext does NOT return it for ch 1 (no consciousness-state context there)', () => {
    const apps = getAppsForContext('bhagavad-gita', 1)
    expect(apps.map(a => a.id)).not.toContain('consciousness-state-mapper')
  })
})
