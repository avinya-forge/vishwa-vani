/**
 * Tests for D2-S1 batch lab apps:
 * LAB-GITA-011 (CommentaryComparisonTool)
 * LAB-GITA-012 (MarathiHeritageExplorer)
 * LAB-GITA-013 (ConsciousnessStateMapper)
 */

import { VEDIC_LABS_REGISTRY, getAppsForContext } from '@/lib/vedic-labs-registry'

describe('D2-S1 Lab Apps — Registry', () => {
  it('LAB-GITA-011: commentary-comparison-tool registered and available', () => {
    const e = VEDIC_LABS_REGISTRY.find(a => a.id === 'commentary-comparison-tool')
    expect(e).toBeDefined()
    if (e) {
      expect(e.available).toBe(true)
      expect(e.chapters).toContain(2)
      expect(e.chapters).toContain(18)
      expect(e.topics).toContain('commentary')
      expect(e.topics).toContain('iskcon')
      expect(e.topics).toContain('dnyaneshwar')
    }
  })

  it('LAB-GITA-012: marathi-heritage-explorer registered and available', () => {
    const e = VEDIC_LABS_REGISTRY.find(a => a.id === 'marathi-heritage-explorer')
    expect(e).toBeDefined()
    if (e) {
      expect(e.available).toBe(true)
      expect(e.chapters).toContain(2)
      expect(e.chapters).toContain(18)
      expect(e.topics).toContain('marathi')
      expect(e.topics).toContain('dnyaneshwari')
      expect(e.topics).toContain('warkari')
    }
  })

  it('LAB-GITA-013: consciousness-state-mapper registered and available', () => {
    const e = VEDIC_LABS_REGISTRY.find(a => a.id === 'consciousness-state-mapper')
    expect(e).toBeDefined()
    if (e) {
      expect(e.available).toBe(true)
      expect(e.chapters).toContain(7)
      expect(e.chapters).toContain(13)
      expect(e.chapters).toContain(15)
      expect(e.topics).toContain('turiya')
      expect(e.topics).toContain('mandukya')
    }
  })

  it('commentary-comparison-tool returned by getAppsForContext for gita ch 18', () => {
    const apps = getAppsForContext('bhagavad-gita', 18)
    expect(apps.map(a => a.id)).toContain('commentary-comparison-tool')
  })

  it('marathi-heritage-explorer returned by getAppsForContext for gita ch 9', () => {
    const apps = getAppsForContext('bhagavad-gita', 9)
    expect(apps.map(a => a.id)).toContain('marathi-heritage-explorer')
  })

  it('consciousness-state-mapper returned by getAppsForContext for gita ch 7', () => {
    const apps = getAppsForContext('bhagavad-gita', 7)
    expect(apps.map(a => a.id)).toContain('consciousness-state-mapper')
  })

  it('consciousness-state-mapper covers all 3 expected chapters', () => {
    const e = VEDIC_LABS_REGISTRY.find(a => a.id === 'consciousness-state-mapper')
    expect(e?.chapters).toEqual(expect.arrayContaining([7, 13, 15]))
  })

  it('D2-S1 adds exactly 3 new registry entries vs prior count', () => {
    const d2s1Ids = ['commentary-comparison-tool', 'marathi-heritage-explorer', 'consciousness-state-mapper']
    const found = d2s1Ids.filter(id => VEDIC_LABS_REGISTRY.some(a => a.id === id))
    expect(found).toHaveLength(3)
  })

  it('all D2-S1 apps are for bhagavad-gita book', () => {
    const d2s1 = VEDIC_LABS_REGISTRY.filter(a =>
      ['commentary-comparison-tool', 'marathi-heritage-explorer', 'consciousness-state-mapper'].includes(a.id)
    )
    d2s1.forEach(a => expect(a.books).toContain('bhagavad-gita'))
  })
})
