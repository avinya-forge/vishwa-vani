/**
 * Tests for APP-708 (TimeConsciousnessWheel), APP-709 (DivineQualitiesAssessment),
 * APP-712 (MeditationStateTracker) registry entries, and LAB-806 + MBH-205 exports.
 */

import { VEDIC_LABS_REGISTRY, getAppsForContext } from '@/lib/vedic-labs-registry'

describe('Vedic Labs Registry — sprint 2 apps', () => {
  it('APP-708: time-consciousness-wheel available in registry', () => {
    const e = VEDIC_LABS_REGISTRY.find(a => a.id === 'time-consciousness-wheel')
    expect(e).toBeDefined()
    expect(e!.available).toBe(true)
    expect(e!.chapters).toContain(8)
    expect(e!.chapters).toContain(10)
    expect(e!.topics).toContain('cosmology')
  })

  it('APP-709: divine-qualities-assessment available in registry', () => {
    const e = VEDIC_LABS_REGISTRY.find(a => a.id === 'divine-qualities-assessment')
    expect(e).toBeDefined()
    expect(e!.available).toBe(true)
    expect(e!.chapters).toContain(16)
    expect(e!.topics).toContain('daivi')
    expect(e!.topics).toContain('asuri')
  })

  it('APP-712: meditation-state-tracker available in registry', () => {
    const e = VEDIC_LABS_REGISTRY.find(a => a.id === 'meditation-state-tracker')
    expect(e).toBeDefined()
    expect(e!.available).toBe(true)
    expect(e!.chapters).toContain(6)
    expect(e!.topics).toContain('dhyana')
  })

  it('getAppsForContext returns time-wheel for gita ch 8', () => {
    const apps = getAppsForContext('bhagavad-gita', 8)
    expect(apps.map(a => a.id)).toContain('time-consciousness-wheel')
  })

  it('getAppsForContext returns divine-qualities for gita ch 16', () => {
    const apps = getAppsForContext('bhagavad-gita', 16)
    expect(apps.map(a => a.id)).toContain('divine-qualities-assessment')
  })

  it('getAppsForContext returns meditation-tracker for gita ch 6', () => {
    const apps = getAppsForContext('bhagavad-gita', 6)
    expect(apps.map(a => a.id)).toContain('meditation-state-tracker')
  })
})

describe('ReadingProgress exports', () => {
  it('exports default component and useReadingProgress hook', async () => {
    const mod = await import('@/components/shloka/reading-progress')
    expect(mod.default).toBeDefined()
    expect(typeof mod.default).toBe('function')
    expect(mod.useReadingProgress).toBeDefined()
    expect(typeof mod.useReadingProgress).toBe('function')
  })
})
