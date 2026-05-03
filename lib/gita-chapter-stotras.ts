/**
 * Gītā-as-Stotra Registry (LAB-GITA-STOTRA-1)
 *
 * Some Bhagavad Gītā chapters have a long-standing devotional tradition
 * of being recited as standalone prayer-units — independent of the Gītā
 * as a whole. The most universally-recognised is Chapter 15 (Puruṣottama
 * Yoga, 20 verses), traditionally recited every evening before food in
 * many Vaiṣṇava households. Chapter 12 (Bhakti Yoga) is similarly
 * recited as a daily contemplation. Chapter 11 (Viśvarūpa Darśana) is
 * recited at moments of crisis or major life transitions.
 *
 * This registry tags those chapters with `dailyUse: true` and supplies
 * the contextual metadata the reader UI needs to surface a "Recite as
 * standalone stotra" affordance (deferred to UI-901+).
 *
 * Schema is deliberately separate from `data/2-silver/stotras/` because
 * those shards are extracted standalone texts; chapters-as-stotras are
 * cross-references back to the parent BG verses, not duplicate content.
 */

export type RecitationOccasion =
  | 'daily-evening'
  | 'daily-morning'
  | 'weekly-thursday'
  | 'crisis-moments'
  | 'life-transitions'
  | 'meditation-session'
  | 'before-meal'
  | 'gita-jayanti'

export interface ChapterAsStotra {
  /** Bhagavad Gītā chapter number (1–18) */
  chapter: number
  /** Sanskrit chapter name */
  yogaName: string
  /** IAST transliteration */
  yogaNameIast: string
  /** Total verse count of the chapter */
  verseCount: number
  /** True if recited as a standalone daily prayer-unit */
  dailyUse: boolean
  /** Recitation occasions in this tradition */
  occasions: RecitationOccasion[]
  /** Chapter's invocation verse (first verse functioning as opener) */
  invocationVerseRef: string
  /** Tradition / lineage where this chapter is recited standalone */
  tradition: string
  /** Brief note on why this chapter functions as standalone stotra */
  note: string
}

export const GITA_CHAPTER_STOTRAS: ChapterAsStotra[] = [
  {
    chapter: 11,
    yogaName: 'विश्वरूपदर्शनयोग',
    yogaNameIast: 'Viśvarūpa-darśana Yoga',
    verseCount: 55,
    dailyUse: false,
    occasions: ['crisis-moments', 'life-transitions'],
    invocationVerseRef: 'BG 11.1',
    tradition: 'Pan-Vaiṣṇava — recited at moments of major life transition (illness, death, ordination); often paired with Viṣṇu Sahasranāma.',
    note: 'The Universal Form chapter. Not daily-use due to its overwhelming scale (55 verses, sustained cosmic vision). Reserved for moments when the seeker needs to be recalled to the larger frame — by tradition, recited during illness, before major decisions, and at the close of life.',
  },
  {
    chapter: 12,
    yogaName: 'भक्तियोग',
    yogaNameIast: 'Bhakti Yoga',
    verseCount: 20,
    dailyUse: true,
    occasions: ['daily-morning', 'meditation-session'],
    invocationVerseRef: 'BG 12.1',
    tradition: 'Universal across all Vaiṣṇava lineages, particularly central to Warkarī tradition (where Sant Dnyāneshwar\'s 36 ovīs on this chapter are most-recited at Pandharpur).',
    note: 'The shortest devotional chapter at exactly 20 verses, structured as a dialogue on the qualities of the devotee. Daily morning recitation is widespread because the chapter\'s closing verses (12.13–20) describe the qualities the seeker is asked to cultivate — a daily reading is itself a re-orientation toward those qualities.',
  },
  {
    chapter: 15,
    yogaName: 'पुरुषोत्तमयोग',
    yogaNameIast: 'Puruṣottama Yoga',
    verseCount: 20,
    dailyUse: true,
    occasions: ['daily-evening', 'before-meal'],
    invocationVerseRef: 'BG 15.1',
    tradition: 'Universal across Vaiṣṇava lineages — most prescribed as the standalone evening recitation before food (the chapter contains BG 15.14 on Vaiśvānara, the digestive fire, which is offered to before eating).',
    note: 'The most universally-recited Gītā chapter as standalone stotra. 20 verses, complete in itself: opens with the inverted Aśvattha tree (15.1–4), traverses the soul\'s movement through bodies (15.7–11), closes with the Puruṣottama declaration (15.16–20). BG 15.14 ("ahaṃ vaiśvānaro bhūtvā") is recited before each meal as offering to the digestive fire.',
  },
  {
    chapter: 18,
    yogaName: 'मोक्षसंन्यासयोग',
    yogaNameIast: 'Mokṣa-sannyāsa Yoga',
    verseCount: 78,
    dailyUse: false,
    occasions: ['gita-jayanti'],
    invocationVerseRef: 'BG 18.1',
    tradition: 'Recited in full only on Gītā Jayanti (Mārgaśīrṣa Śukla Ekādaśī) and during full Gītā parāyaṇa.',
    note: 'The longest chapter (78 verses) and the closing summary of the entire Gītā. Not daily-use due to length, but the closing 6 verses (18.73–78) — which contain Sanjaya\'s benediction (BG 18.78) — are recited daily across most Vaiṣṇava traditions as a closing mantra. Those 6 verses are effectively a sub-stotra; see also gita-mahatmya.json verse 5.',
  },
]

/**
 * Returns chapters tagged dailyUse: true.
 */
export function getDailyUseChapters(): ChapterAsStotra[] {
  return GITA_CHAPTER_STOTRAS.filter(c => c.dailyUse)
}

/**
 * Returns chapters that have any standalone-stotra metadata (daily or
 * occasion-based). Used by the reader UI to know when to offer the
 * "Recite as standalone" affordance.
 */
export function isChapterStandaloneStotra(chapter: number): boolean {
  return GITA_CHAPTER_STOTRAS.some(c => c.chapter === chapter)
}

/**
 * Returns chapters appropriate for a given recitation occasion.
 */
export function getChaptersByOccasion(occasion: RecitationOccasion): ChapterAsStotra[] {
  return GITA_CHAPTER_STOTRAS.filter(c => c.occasions.includes(occasion))
}

/**
 * Returns the metadata for a specific chapter, or null if it is not
 * tagged as a standalone stotra.
 */
export function getChapterStotraMeta(chapter: number): ChapterAsStotra | null {
  return GITA_CHAPTER_STOTRAS.find(c => c.chapter === chapter) ?? null
}
