/**
 * 🕉️ Normalized Vedic Fragment (NVF) v1.1
 * 
 * The omni-schema for all Vedic texts (Vedas, Puranas, Gita, Upanishads).
 * Designed for agility, scalability, and AI interpretation.
 */

export type FragmentType = 'translation' | 'commentary' | 'analysis' | 'original' | 'summary'
export type LangCode = 'en' | 'hi' | 'mr' | 'sa'

export interface FragmentLayer {
  /** The source author/scholar key (e.g., 'sankar', 'siva', 'prabhu') */
  author: string
  /** The language of this specific layer */
  lang: LangCode
  /** Content type */
  type: FragmentType
  /** The actual text content */
  content: string
}

export interface AnvayaToken {
  /** The Sanskrit word in Devanagari */
  san: string
  /** Transliteration */
  trn: string
  /** Meaning in English */
  en?: string
  /** Meaning in Hindi */
  hi?: string
  /** Grammatical metadata (optional) */
  pos?: string
}

export interface NVFFragment {
  /** Unique ID, e.g., 'bg_1_1' */
  id: string
  /** Scripture slug, e.g., 'bhagavad-gita' */
  text_slug: string
  chapter: number
  /** Verse/Sutra number */
  verse: number
  /** The original Sanskrit text (Devanagari) */
  original: string
  /** Romanized Sanskrit */
  transliteration: string
  /** Anvaya (word-by-word) mapping for ExplainShell interaction */
  anvaya?: AnvayaToken[]
  /** Array of localized layers (Translations/Commentaries) */
  layers: FragmentLayer[]
  /** Optional metadata for AI and UI visualization */
  ai_metadata?: {
    /** High-level concepts for analytics, e.g., ["dharma", "maya"] */
    topics?: string[]
    /** UI Component hint, e.g., "astro_chart", "genealogy" */
    viz_type?: string
  }
}

/**
 * Migration Helper: Converts legacy GitaVerse format to NVF.
 * Ensures the system remains operational during the schema transition.
 */
export function migrateToNVF(legacy: any, textSlug: string, fallbackChapter?: number): NVFFragment {
  const AUTHOR_KEYS = ['siva', 'rams', 'chinmay', 'sankar', 'prabhu', 'tej', 'gambir', 'raman', 'abhyankar']
  const layers: FragmentLayer[] = []

  const chapter = legacy.chapter || fallbackChapter || 0
  const verse = legacy.verse || 0
  const original = legacy.original || legacy.slok || ""
  const transliteration = legacy.transliteration || ""

  AUTHOR_KEYS.forEach(key => {
    if (legacy[key]) {
      const item = legacy[key]
      if (item.et) layers.push({ author: key, lang: 'en', type: 'translation', content: item.et })
      if (item.ec) layers.push({ author: key, lang: 'en', type: 'commentary', content: item.ec })
      if (item.ht) layers.push({ author: key, lang: 'hi', type: 'translation', content: item.ht })
      if (item.hc) layers.push({ author: key, lang: 'hi', type: 'commentary', content: item.hc })
      if (item.sc) layers.push({ author: key, lang: 'sa', type: 'commentary', content: item.sc })
    }
  })

  // Handle cases where layers are already in the new format
  if (legacy.layers && Array.isArray(legacy.layers)) {
    legacy.layers.forEach((l: any) => {
      if (l.author && l.content) {
        layers.push(l as FragmentLayer)
      }
    })
  }

  return {
    id: legacy.id || `${textSlug}_${chapter}_${verse}`,
    text_slug: textSlug,
    chapter,
    verse,
    original,
    transliteration,
    anvaya: legacy.anvaya || legacy.word_meanings || undefined,
    layers,
    ai_metadata: legacy.ai_metadata || {
        topics: []
    }
  }
}
