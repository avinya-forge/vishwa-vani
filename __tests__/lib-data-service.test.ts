// VedicDataService unit tests — STAB-606 coverage remediation
// Tests use the singleton so cache must be cleared between cases

import { VedicDataService, vedicDataService } from '@/lib/data-service'
import * as fs from 'fs'

// Prevent real filesystem / lake reads in unit tests
jest.mock('@/lib/server-lake', () => ({
  getVersesFromLakeServer: jest.fn().mockResolvedValue([])
}))

jest.mock('fs', () => {
  const actual = jest.requireActual('fs')
  return {
    ...actual,
    existsSync: jest.fn().mockReturnValue(false),
    readFileSync: jest.fn().mockReturnValue('[]'),
  }
})

const clearCache = () => {
  // Access private cache via any cast to reset between tests
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(vedicDataService as any).dataCache.clear()
}

describe('VedicDataService', () => {
  beforeEach(() => {
    clearCache()
  })

  describe('getInstance()', () => {
    it('returns the same singleton instance', () => {
      const a = VedicDataService.getInstance()
      const b = VedicDataService.getInstance()
      expect(a).toBe(b)
    })
  })

  describe('getChapterData()', () => {
    it('returns null for unknown textSlug', async () => {
      const result = await vedicDataService.getChapterData('nonexistent-text', 1)
      expect(result).toBeNull()
    })

    it('returns ChapterData shape for known text (bhagavad-gita)', async () => {
      const result = await vedicDataService.getChapterData('bhagavad-gita', 1)
      expect(result).not.toBeNull()
      expect(result?.metadata.slug).toBe('bhagavad-gita')
      expect(result?.navigation).toHaveProperty('totalChapters')
      expect(result?.navigation).toHaveProperty('currentChapter', 1)
    })

    it('returns cached result on second call', async () => {
      const first = await vedicDataService.getChapterData('bhagavad-gita', 1)
      const second = await vedicDataService.getChapterData('bhagavad-gita', 1)
      expect(first).toBe(second) // same object reference (from cache)
    })

    it('includes aiInsights when includeAI is true', async () => {
      const result = await vedicDataService.getChapterData('bhagavad-gita', 2, { includeAI: true })
      expect(result?.aiInsights).toBeDefined()
      expect(result?.aiInsights).toHaveProperty('chapterSummary')
      expect(result?.aiInsights).toHaveProperty('keyThemes')
    })

    it('omits aiInsights when includeAI is false (default)', async () => {
      const result = await vedicDataService.getChapterData('bhagavad-gita', 3)
      expect(result?.aiInsights).toBeUndefined()
    })
  })

  describe('generateNavigation()', () => {
    it('returns no prevChapter for chapter 1', async () => {
      const result = await vedicDataService.getChapterData('bhagavad-gita', 1)
      expect(result?.navigation.prevChapter).toBeUndefined()
    })

    it('returns prevChapter for chapter > 1', async () => {
      const result = await vedicDataService.getChapterData('bhagavad-gita', 5)
      expect(result?.navigation.prevChapter).toBeDefined()
      expect(result?.navigation.prevChapter?.slug).toContain('bhagavad-gita')
    })

    it('returns no nextChapter for the last chapter', async () => {
      const result = await vedicDataService.getChapterData('bhagavad-gita', 18) // 18 is last
      expect(result?.navigation.nextChapter).toBeUndefined()
    })
  })

  describe('enrichVerses() — private helpers via enriched output', () => {
    const makeVerse = (overrides: Record<string, unknown> = {}) => ({
      id: 'test.1.1',
      original: 'ॐ',
      transliteration: 'om',
      layers: [
        { type: 'commentary', lang: 'en', content: 'Commentary in English', author: 'test' },
        { type: 'commentary', lang: 'hi', content: 'Hindi commentary', author: 'test2' },
      ],
      ...overrides
    })

    function injectVerseViaFs(verse: ReturnType<typeof makeVerse>) {
      ;(fs.readFileSync as jest.Mock).mockReturnValueOnce(JSON.stringify({ books: [] }))
      ;(fs.existsSync as jest.Mock).mockReturnValueOnce(true)
      ;(fs.readFileSync as jest.Mock).mockReturnValueOnce(JSON.stringify([verse]))
    }

    it('enriched verse has uiMetadata with hasCommentary = true', async () => {
      injectVerseViaFs(makeVerse())

      const result = await vedicDataService.getChapterData('bhagavad-gita', 7)
      expect(result?.verses[0].uiMetadata?.hasCommentary).toBe(true)
    })

    it('enriched verse hasCommentary = false when no commentary layers', async () => {
      injectVerseViaFs(makeVerse({ layers: [] }))

      const result = await vedicDataService.getChapterData('bhagavad-gita', 8)
      expect(result?.verses[0].uiMetadata?.hasCommentary).toBe(false)
    })

    it('languageCount counts distinct languages in layers', async () => {
      injectVerseViaFs(makeVerse()) // 2 layers: en + hi

      const result = await vedicDataService.getChapterData('bhagavad-gita', 9)
      expect(result?.verses[0].uiMetadata?.languageCount).toBe(2)
    })

    it('includes aiContext fields when includeAI is true', async () => {
      injectVerseViaFs(makeVerse({ original: 'dharma धर्म karma कर्म' }))

      const result = await vedicDataService.getChapterData('bhagavad-gita', 10, { includeAI: true })
      const aiCtx = result?.verses[0].aiContext
      expect(aiCtx).toBeDefined()
      expect(aiCtx?.themes).toContain('Dharma')
      expect(aiCtx?.themes).toContain('Karma')
      expect(['beginner', 'intermediate', 'advanced']).toContain(aiCtx?.difficulty)
    })
  })
})
