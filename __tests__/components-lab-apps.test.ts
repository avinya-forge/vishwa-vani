/**
 * Tests for APP-705 (JnanaYogaExplorer), APP-706 (BhaktiYogaCompass), APP-707 (DharmaDecisionMatrix)
 * and registry entries for all three.
 */

import { VEDIC_LABS_REGISTRY, getAppsForContext } from '@/lib/vedic-labs-registry'

describe('Vedic Labs Registry — new app entries', () => {
  it('APP-705: jnana-yoga-explorer is available in registry', () => {
    const entry = VEDIC_LABS_REGISTRY.find(a => a.id === 'jnana-yoga-explorer')
    expect(entry).toBeDefined()
    expect(entry!.available).toBe(true)
    expect(entry!.chapters).toContain(13)
    expect(entry!.topics).toContain('jnana')
  })

  it('APP-706: bhakti-yoga-compass is available in registry', () => {
    const entry = VEDIC_LABS_REGISTRY.find(a => a.id === 'bhakti-yoga-compass')
    expect(entry).toBeDefined()
    expect(entry!.available).toBe(true)
    expect(entry!.chapters).toContain(12)
    expect(entry!.topics).toContain('bhakti')
  })

  it('APP-707: dharma-decision-matrix is available in registry', () => {
    const entry = VEDIC_LABS_REGISTRY.find(a => a.id === 'dharma-decision-matrix')
    expect(entry).toBeDefined()
    expect(entry!.available).toBe(true)
    expect(entry!.chapters).toContain(2)
    expect(entry!.chapters).toContain(16)
    expect(entry!.topics).toContain('dharma')
  })

  it('getAppsForContext returns jnana-yoga-explorer for gita ch 13', () => {
    const apps = getAppsForContext('bhagavad-gita', 13)
    const ids = apps.map(a => a.id)
    expect(ids).toContain('jnana-yoga-explorer')
  })

  it('getAppsForContext returns bhakti-yoga-compass for gita ch 12', () => {
    const apps = getAppsForContext('bhagavad-gita', 12)
    const ids = apps.map(a => a.id)
    expect(ids).toContain('bhakti-yoga-compass')
  })

  it('getAppsForContext returns dharma-decision-matrix for gita ch 2', () => {
    const apps = getAppsForContext('bhagavad-gita', 2)
    const ids = apps.map(a => a.id)
    expect(ids).toContain('dharma-decision-matrix')
  })

  it('getAppsForContext returns dharma-decision-matrix for gita ch 16', () => {
    const apps = getAppsForContext('bhagavad-gita', 16)
    const ids = apps.map(a => a.id)
    expect(ids).toContain('dharma-decision-matrix')
  })
})
