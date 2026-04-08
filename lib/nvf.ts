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
export function migrateToNVF(legacy: unknown, textSlug: string, fallbackChapter?: number): NVFFragment {
  const legacyData = legacy as Record<string, unknown>
  const AUTHOR_KEYS = ['siva', 'rams', 'chinmay', 'sankar', 'prabhu', 'tej', 'gambir', 'raman', 'abhyankar']
  const layers: FragmentLayer[] = []

  const chapter = (legacyData.chapter || fallbackChapter || 0) as number
  const verse = (legacyData.verse || 0) as number
  const original = (legacyData.original || legacyData.slok || "") as string
  const transliteration = (legacyData.transliteration || "") as string

  AUTHOR_KEYS.forEach(key => {
    if (legacyData[key]) {
      const item = legacyData[key] as Record<string, unknown>
      if (item.et) layers.push({ author: key, lang: 'en', type: 'translation', content: item.et as string })
      if (item.ec) layers.push({ author: key, lang: 'en', type: 'commentary', content: item.ec as string })
      if (item.ht) layers.push({ author: key, lang: 'hi', type: 'translation', content: item.ht as string })
      if (item.hc) layers.push({ author: key, lang: 'hi', type: 'commentary', content: item.hc as string })
      if (item.sc) layers.push({ author: key, lang: 'sa', type: 'commentary', content: item.sc as string })
    }
  })

  // Handle cases where layers are already in the new format
  if (legacyData.layers && Array.isArray(legacyData.layers)) {
    (legacyData.layers as unknown[]).forEach((l: unknown) => {
      const layer = l as Record<string, unknown>
      if (layer.author && layer.content) {
        layers.push(layer as unknown as FragmentLayer)
      }
    })
  }

  return {
    id: (legacyData.id as string) || `${textSlug}_${chapter}_${verse}`,
    text_slug: textSlug,
    chapter,
    verse,
    original,
    transliteration,
    anvaya: (legacyData.anvaya || legacyData.word_meanings) as AnvayaToken[] | undefined,
    layers,
    ai_metadata: (legacyData.ai_metadata as Record<string, unknown>) || {
        topics: []
    }
  }
}
