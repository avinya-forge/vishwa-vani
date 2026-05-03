/**
 * Tests for LAB-GITA-STOTRA-1: Gītā chapter-as-stotra registry.
 */

import {
  GITA_CHAPTER_STOTRAS,
  getDailyUseChapters,
  isChapterStandaloneStotra,
  getChaptersByOccasion,
  getChapterStotraMeta,
} from '@/lib/gita-chapter-stotras'

describe('GITA_CHAPTER_STOTRAS', () => {
  it('contains the 4 traditionally-recited chapters (11, 12, 15, 18)', () => {
    const chapters = GITA_CHAPTER_STOTRAS.map(c => c.chapter).sort((a, b) => a - b)
    expect(chapters).toEqual([11, 12, 15, 18])
  })

  it('every entry carries Sanskrit + IAST yoga name + verse count + invocation ref', () => {
    for (const c of GITA_CHAPTER_STOTRAS) {
      expect(c.yogaName.length).toBeGreaterThan(0)
      expect(c.yogaNameIast.length).toBeGreaterThan(0)
      expect(c.verseCount).toBeGreaterThan(0)
      expect(c.invocationVerseRef).toMatch(/^BG \d+\.\d+$/)
      expect(c.tradition.length).toBeGreaterThan(20)
      expect(c.note.length).toBeGreaterThan(50)
    }
  })

  it('Chapter 15 (Puruṣottama Yoga) is the canonical standalone stotra', () => {
    const ch15 = GITA_CHAPTER_STOTRAS.find(c => c.chapter === 15)
    expect(ch15).toBeDefined()
    expect(ch15?.yogaNameIast).toBe('Puruṣottama Yoga')
    expect(ch15?.dailyUse).toBe(true)
    expect(ch15?.verseCount).toBe(20)
    expect(ch15?.occasions).toContain('daily-evening')
    expect(ch15?.occasions).toContain('before-meal')
  })

  it('Chapter 12 (Bhakti Yoga) is also dailyUse', () => {
    const ch12 = GITA_CHAPTER_STOTRAS.find(c => c.chapter === 12)
    expect(ch12?.dailyUse).toBe(true)
    expect(ch12?.verseCount).toBe(20)
  })

  it('Chapter 11 (Viśvarūpa) is occasion-based, not daily', () => {
    const ch11 = GITA_CHAPTER_STOTRAS.find(c => c.chapter === 11)
    expect(ch11?.dailyUse).toBe(false)
    expect(ch11?.occasions).toContain('crisis-moments')
  })
})

describe('getDailyUseChapters()', () => {
  it('returns exactly the dailyUse-tagged chapters', () => {
    const daily = getDailyUseChapters()
    expect(daily.length).toBeGreaterThanOrEqual(2)
    expect(daily.every(c => c.dailyUse)).toBe(true)
    expect(daily.map(c => c.chapter)).toContain(15)
    expect(daily.map(c => c.chapter)).toContain(12)
  })
})

describe('isChapterStandaloneStotra()', () => {
  it('returns true for tagged chapters', () => {
    expect(isChapterStandaloneStotra(15)).toBe(true)
    expect(isChapterStandaloneStotra(12)).toBe(true)
    expect(isChapterStandaloneStotra(11)).toBe(true)
  })

  it('returns false for untagged chapters', () => {
    expect(isChapterStandaloneStotra(1)).toBe(false)
    expect(isChapterStandaloneStotra(7)).toBe(false)
  })
})

describe('getChaptersByOccasion()', () => {
  it('finds chapters for daily-evening occasion', () => {
    const evening = getChaptersByOccasion('daily-evening')
    expect(evening.map(c => c.chapter)).toContain(15)
  })

  it('finds chapters for before-meal occasion', () => {
    const meal = getChaptersByOccasion('before-meal')
    expect(meal.map(c => c.chapter)).toContain(15)
  })

  it('returns empty array for an unused occasion', () => {
    const weekly = getChaptersByOccasion('weekly-thursday')
    expect(weekly).toEqual([])
  })
})

describe('getChapterStotraMeta()', () => {
  it('returns metadata for a tagged chapter', () => {
    const meta = getChapterStotraMeta(15)
    expect(meta).not.toBeNull()
    expect(meta?.yogaNameIast).toBe('Puruṣottama Yoga')
  })

  it('returns null for untagged chapters', () => {
    expect(getChapterStotraMeta(7)).toBeNull()
    expect(getChapterStotraMeta(99)).toBeNull()
  })
})
