/**
 * Tests for LAB-GITA-STOTRA-3: Gītā Māhātmya silver shard.
 * Validates structure, daily-use tagging, source attribution, and
 * pronunciation guide presence on every verse.
 */

import * as fs from 'fs'
import * as path from 'path'

const SHARD_PATH = path.join(process.cwd(), 'data', '2-silver', 'stotras', 'gita-mahatmya.json')

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

describe('LAB-GITA-STOTRA-3: Gītā Māhātmya silver shard', () => {
  let shard: Shard

  beforeAll(() => {
    const raw = fs.readFileSync(SHARD_PATH, 'utf-8')
    shard = JSON.parse(raw) as Shard
  })

  it('shard file exists and parses as JSON', () => {
    expect(shard).toBeDefined()
    expect(shard.id).toBe('gita-mahatmya')
  })

  it('is tagged as a stotra and dailyUse', () => {
    expect(shard.mantraType).toBe('stotra')
    expect(shard.dailyUse).toBe(true)
  })

  it('cross-references the source book (bhagavad-gita)', () => {
    expect(shard.sourceBook).toBe('bhagavad-gita')
  })

  it('contains 5 curated verses with totalMantras matching', () => {
    expect(shard.totalMantras).toBe(5)
    expect(shard.verses.length).toBe(5)
  })

  it('every verse has Sanskrit, transliteration, translation, meaning ≥80 chars', () => {
    for (const v of shard.verses) {
      expect(v.original.length).toBeGreaterThan(0)
      expect(v.transliteration.length).toBeGreaterThan(0)
      expect(v.translation.length).toBeGreaterThan(0)
      expect(v.meaning.length).toBeGreaterThanOrEqual(80)
    }
  })

  it('every verse carries EN + HI commentary layers ≥ 80 chars', () => {
    for (const v of shard.verses) {
      const en = v.layers.filter(l => l.lang === 'en')
      const hi = v.layers.filter(l => l.lang === 'hi')
      expect(en.length).toBeGreaterThanOrEqual(1)
      expect(hi.length).toBeGreaterThanOrEqual(1)
      for (const l of [...en, ...hi]) {
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

  it('every layer carries explicit source attribution (no anonymous content)', () => {
    for (const v of shard.verses) {
      for (const l of v.layers) {
        expect(l.author_name.length).toBeGreaterThan(0)
        expect(l.author_label.length).toBeGreaterThan(0)
      }
    }
  })

  it('the closing verse is BG 18.78 (Yatra yogeśvaraḥ)', () => {
    const last = shard.verses[shard.verses.length - 1]
    expect(last.transliteration).toContain('yatra yogeśvaraḥ kṛṣṇo')
  })
})
