/**
 * Tests for APP-705 (JnanaYogaExplorer), APP-706 (BhaktiYogaCompass),
 * and APP-707 (DharmaDecisionMatrix) registry entries.
 */

import { VEDIC_LABS_REGISTRY, getAppsForContext } from '@/lib/vedic-labs-registry'

describe('Vedic Labs Registry — core apps', () => {
  it('APP-705: jnana-yoga-explorer is available in registry', () => {
    const entry = VEDIC_LABS_REGISTRY.find(a => a.id === 'jnana-yoga-explorer')
    expect(entry).toBeDefined()
    if (entry) {
      expect(entry.available).toBe(true)
      expect(entry.chapters).toContain(13)
      expect(entry.topics).toContain('jnana')
    }
  })

  it('APP-706: bhakti-yoga-compass is available in registry', () => {
    const entry = VEDIC_LABS_REGISTRY.find(a => a.id === 'bhakti-yoga-compass')
    expect(entry).toBeDefined()
    if (entry) {
      expect(entry.available).toBe(true)
      expect(entry.chapters).toContain(12)
      expect(entry.topics).toContain('bhakti')
    }
  })

  it('APP-707: dharma-decision-matrix is available in registry', () => {
    const entry = VEDIC_LABS_REGISTRY.find(a => a.id === 'dharma-decision-matrix')
    expect(entry).toBeDefined()
    if (entry) {
      expect(entry.available).toBe(true)
      expect(entry.chapters).toContain(2)
      expect(entry.chapters).toContain(16)
      expect(entry.topics).toContain('dharma')
    }
  })

  it('getAppsForContext returns jnana-yoga-explorer for gita ch 13', () => {
    const apps = getAppsForContext('bhagavad-gita', 13)
    expect(apps.map(a => a.id)).toContain('jnana-yoga-explorer')
  })
})
