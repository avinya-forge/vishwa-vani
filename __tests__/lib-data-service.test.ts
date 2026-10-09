// VedicDataService unit tests — STAB-606 coverage remediation
// Tests use the singleton so cache must be cleared between cases

import { VedicDataService, vedicDataService } from '@/lib/data-service'
import * as fs from 'fs'

// Prevent real filesystem / lake reads in unit tests
jest.mock('@/lib/server-lake', () => ({
  getVersesFromLakeServer: jest.fn().mockResolvedValue([])
}))

// Default manifest supplies bhagavad-gita as GOLD so the GOLD-GATE passes
// in tests that don't call injectVerseViaFs. existsSync returns false so
// loadFromJson falls through to an empty verses array — result is non-null
// but has no verses.
const GOLD_MANIFEST = JSON.stringify({
  books: [{ book_id: 'bhagavad-gita', status: 'GOLD', chapters: [] }]
})

jest.mock('fs', () => {
  const actual = jest.requireActual('fs')
  // Inline JSON so the factory doesn't reference an outer const (jest.mock is hoisted)
  const defaultManifest = JSON.stringify({
    books: [{ book_id: 'bhagavad-gita', status: 'GOLD', chapters: [] }]
  })
  return {
    ...actual,
    existsSync: jest.fn().mockReturnValue(false),
    readFileSync: jest.fn().mockReturnValue(defaultManifest),
    promises: {
      ...actual.promises,
      access: jest.fn().mockRejectedValue(new Error('ENOENT')),
      readFile: jest.fn().mockResolvedValue(defaultManifest),
    }
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
    // Reset to the default GOLD_MANIFEST after each injectVerseViaFs call
    ;(fs.promises.readFile as jest.Mock).mockResolvedValue(GOLD_MANIFEST)
    ;(fs.promises.access as jest.Mock).mockRejectedValue(new Error('ENOENT'))
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
      expect(result?.navigation.nextChapter?.slug).toBe('/bhagavad-gita/postface')
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

    // Injects a verse via mocked FS.
    // getChapterData makes exactly 2 readFile calls (isBookGoldTier + loadFromJson manifest)
    // and 1 access + 1 readFile (actual data file) when the file is found.
    function injectVerseViaFs(verse: ReturnType<typeof makeVerse>) {
      ;(fs.promises.readFile as jest.Mock)
        .mockResolvedValueOnce(GOLD_MANIFEST)     // isBookGoldTier: manifest
        .mockResolvedValueOnce(GOLD_MANIFEST)     // loadFromJson: manifest
        .mockResolvedValueOnce(JSON.stringify([verse])); // loadFromJson: file data
      ;(fs.promises.access as jest.Mock).mockResolvedValueOnce(undefined); // file exists
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
      injectVerseViaFs(makeVerse({ original: 'dharma धर्म karma कर्म bhakti ज्ञान yoga' }))

      const result = await vedicDataService.getChapterData('bhagavad-gita', 10, { includeAI: true })
      const aiCtx = result?.verses[0].aiContext
      expect(aiCtx).toBeDefined()
      expect(aiCtx?.themes).toContain('Dharma')
      expect(aiCtx?.themes).toContain('Karma')
      expect(aiCtx?.themes).toContain('Bhakti')
      expect(aiCtx?.themes).toContain('Jnana')
      expect(aiCtx?.themes).toContain('Yoga')
      expect(['beginner', 'intermediate', 'advanced']).toContain(aiCtx?.difficulty)
    })

    it('covers all cross references', async () => {
      injectVerseViaFs(makeVerse({ original: 'krishna arjuna veda' }))
      const result = await vedicDataService.getChapterData('bhagavad-gita', 11, { includeAI: true })
      const aiCtx = result?.verses[0].aiContext
      expect(aiCtx?.crossReferences).toContain('Krishna')
      expect(aiCtx?.crossReferences).toContain('Arjuna')
      expect(aiCtx?.crossReferences).toContain('Vedas')
    })

    it('covers emotional tones', async () => {
      injectVerseViaFs(makeVerse({ original: 'fear' }))
      let result = await vedicDataService.getChapterData('bhagavad-gita', 12, { includeAI: true })
      expect(result?.verses[0].aiContext?.emotionalTone).toBe('contemplative')

      clearCache()
      injectVerseViaFs(makeVerse({ original: 'love' }))
      result = await vedicDataService.getChapterData('bhagavad-gita', 13, { includeAI: true })
      expect(result?.verses[0].aiContext?.emotionalTone).toBe('devotional')

      clearCache()
      injectVerseViaFs(makeVerse({ original: 'duty' }))
      result = await vedicDataService.getChapterData('bhagavad-gita', 14, { includeAI: true })
      expect(result?.verses[0].aiContext?.emotionalTone).toBe('ethical')

      clearCache()
      injectVerseViaFs(makeVerse({ original: 'something else' }))
      result = await vedicDataService.getChapterData('bhagavad-gita', 15, { includeAI: true })
      expect(result?.verses[0].aiContext?.emotionalTone).toBe('philosophical')
    })
  })
})
