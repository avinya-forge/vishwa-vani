/**
 * Tests for LAB-GITA-STOTRA-2: Gita Dhyana Shlokas silver shard.
 * Validates structure, count, daily-use tagging, and pronunciation guide presence.
 */

import * as fs from 'fs'
import * as path from 'path'

const SHARD_PATH = path.join(process.cwd(), 'data', '2-silver', 'stotras', 'gita-dhyana-shlokas.json')

interface Layer {
  author: string
  author_name: string
  author_label: string
  lang: string
  type: string
  content: string
}

interface Verse {
  id: string
  verse: number
  original: string
  transliteration: string
  translation: string
  meaning: string
  layers: Layer[]
  pronunciation_guide: { en: string; hi: string }
}

interface Shard {
  id: string
  slug: string
  mantraType: string
  deity: string
  dailyUse: boolean
  sourceBook: string
  totalMantras: number
  verses: Verse[]
}

describe('LAB-GITA-STOTRA-2: Gita Dhyana Shlokas silver shard', () => {
  let shard: Shard

  beforeAll(() => {
    const raw = fs.readFileSync(SHARD_PATH, 'utf-8')
    shard = JSON.parse(raw) as Shard
  })

  it('shard file exists and parses as JSON', () => {
    expect(shard).toBeDefined()
    expect(shard.id).toBe('gita-dhyana-shlokas')
  })

  it('is tagged as a stotra and dailyUse', () => {
    expect(shard.mantraType).toBe('stotra')
    expect(shard.dailyUse).toBe(true)
  })

  it('cross-references the source book (bhagavad-gita)', () => {
    expect(shard.sourceBook).toBe('bhagavad-gita')
  })

  it('contains exactly 9 dhyana shlokas', () => {
    expect(shard.totalMantras).toBe(9)
    expect(shard.verses.length).toBe(9)
  })

  it('every verse has Sanskrit, transliteration, translation, meaning', () => {
    for (const v of shard.verses) {
      expect(v.original.length).toBeGreaterThan(0)
      expect(v.transliteration.length).toBeGreaterThan(0)
      expect(v.translation.length).toBeGreaterThan(0)
      expect(v.meaning.length).toBeGreaterThanOrEqual(80)
    }
  })

  it('every verse carries at least one EN commentary layer ≥ 80 chars', () => {
    for (const v of shard.verses) {
      const enLayers = v.layers.filter(l => l.lang === 'en')
      expect(enLayers.length).toBeGreaterThanOrEqual(1)
      for (const l of enLayers) {
        expect(l.content.length).toBeGreaterThanOrEqual(80)
      }
    }
  })

  it('every verse carries at least one HI commentary layer ≥ 80 chars', () => {
    for (const v of shard.verses) {
      const hiLayers = v.layers.filter(l => l.lang === 'hi')
      expect(hiLayers.length).toBeGreaterThanOrEqual(1)
      for (const l of hiLayers) {
        expect(l.content.length).toBeGreaterThanOrEqual(80)
      }
    }
  })

  it('every verse has EN + HI pronunciation guide', () => {
    for (const v of shard.verses) {
      expect(v.pronunciation_guide).toBeDefined()
      expect(v.pronunciation_guide.en.length).toBeGreaterThan(20)
      expect(v.pronunciation_guide.hi.length).toBeGreaterThan(20)
    }
  })

  it('no commentary content starts with [ (no template markers)', () => {
    for (const v of shard.verses) {
      for (const l of v.layers) {
        expect(l.content.trim().startsWith('[')).toBe(false)
      }
    }
  })
})
