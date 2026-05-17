/**
 * Tests for SCHOLAR-005: Scholars Registry — philosophical-school metadata
 * for the BG commentary corpus.
 */

import {
  SCHOLARS_REGISTRY,
  getScholarsByTier,
  getScholarsBySchool,
  getScholarsByLanguage,
  getLiveScholars,
  getAcquisitionQueue,
} from '@/lib/scholars'

describe('SCHOLARS_REGISTRY structure', () => {
  it('contains both Tier 0 (live) and Tier 1 (queued) entries', () => {
    expect(SCHOLARS_REGISTRY.some(s => s.tier === 0)).toBe(true)
    expect(SCHOLARS_REGISTRY.some(s => s.tier === 1)).toBe(true)
  })

  it('every entry has required metadata fields', () => {
    for (const s of SCHOLARS_REGISTRY) {
      expect(s.id.length).toBeGreaterThan(0)
      expect(s.displayName.length).toBeGreaterThan(0)
      expect(s.dates.length).toBeGreaterThan(0)
      expect(s.schoolSummary.length).toBeGreaterThan(20)
      expect(s.publicDomainSource.length).toBeGreaterThan(20)
      expect(s.availableLanguages.length).toBeGreaterThanOrEqual(1)
    }
  })

  it('Tier 1 queued entries carry a rank in 1..10', () => {
    const tier1Queued = SCHOLARS_REGISTRY.filter(s => s.tier === 1 && s.acquisitionStatus === 'queued')
    for (const s of tier1Queued) {
      expect(s.rank).not.toBeNull()
      if (s.rank !== null) {
        expect(s.rank >= 1 && s.rank <= 10).toBe(true)
      }
    }
  })

  it('Tier 0 entries have rank null', () => {
    const tier0 = SCHOLARS_REGISTRY.filter(s => s.tier === 0)
    for (const s of tier0) {
      expect(s.rank).toBeNull()
    }
  })

  it('philosophical schools cover the four Vedānta sub-schools + modern', () => {
    const schools = new Set(SCHOLARS_REGISTRY.map(s => s.philosophicalSchool))
    expect(schools.has('advaita')).toBe(true)
    expect(schools.has('vishishtadvaita')).toBe(true)
    expect(schools.has('dvaita')).toBe(true)
    expect(schools.has('kashmir-shaiva')).toBe(true)
  })
})

describe('getScholarsByTier()', () => {
  it('returns the 2 currently-live scholars at tier 0', () => {
    const live = getScholarsByTier(0)
    expect(live.length).toBe(2)
    expect(live.map(s => s.id)).toContain('adi-shankara')
    expect(live.map(s => s.id)).toContain('sant-dnyaneshwar')
  })

  it('returns 11 queued scholars at tier 1', () => {
    const queue = getScholarsByTier(1)
    expect(queue.length).toBe(11)
  })
})

describe('getScholarsBySchool()', () => {
  it('finds Advaita scholars', () => {
    const advaita = getScholarsBySchool('advaita')
    expect(advaita.map(s => s.id)).toContain('adi-shankara')
  })

  it('finds Viśiṣṭādvaita scholars', () => {
    const visistadvaita = getScholarsBySchool('vishishtadvaita')
    expect(visistadvaita.map(s => s.id)).toContain('ramanuja')
  })
})

describe('getScholarsByLanguage()', () => {
  it('Sanskrit primary scholars include the four Bhāṣya authors', () => {
    const sa = getScholarsByLanguage('sa')
    const ids = sa.map(s => s.id)
    expect(ids).toContain('adi-shankara')
    expect(ids).toContain('ramanuja')
    expect(ids).toContain('madhva')
    expect(ids).toContain('abhinavagupta')
  })

  it('Marathi includes Sant Dnyāneshwar and Tilak', () => {
    const mr = getScholarsByLanguage('mr')
    expect(mr.map(s => s.id)).toContain('sant-dnyaneshwar')
    expect(mr.map(s => s.id)).toContain('tilak-gita-rahasya')
  })

  it('Gujarati currently surfaces 0 scholars (since Gandhi was excised)', () => {
    const gu = getScholarsByLanguage('gu')
    expect(gu.length).toBe(0)
  })
})

describe('getLiveScholars() and getAcquisitionQueue()', () => {
  it('live + queued + deferred sums to total registry count', () => {
    const live = SCHOLARS_REGISTRY.filter(s => s.acquisitionStatus === 'live').length
    const queued = SCHOLARS_REGISTRY.filter(s => s.acquisitionStatus === 'queued').length
    const deferred = SCHOLARS_REGISTRY.filter(s => s.acquisitionStatus === 'deferred').length
    expect(live + queued + deferred).toBe(SCHOLARS_REGISTRY.length)
  })

  it('live scholars are exactly Tier 0', () => {
    const live = getLiveScholars()
    expect(live.every(s => s.tier === 0)).toBe(true)
  })

  it('acquisition queue is sorted by rank ascending', () => {
    const queue = getAcquisitionQueue()
    for (let i = 1; i < queue.length; i++) {
      const r1 = queue[i].rank
      const r0 = queue[i - 1].rank
      if (r1 !== null && r0 !== null) {
        expect(r1 >= r0).toBe(true)
      }
    }
  })

  it('acquisition queue starts with Tilak (rank 2)', () => {
    const queue = getAcquisitionQueue()
    expect(queue[0].id).toBe('tilak-gita-rahasya')
  })
})
