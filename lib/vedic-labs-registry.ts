/**
 * Vedic Labs Registry (APP-702)
 *
 * Maps each educational micro-app to the book, chapter, and verse context
 * where it is most relevant. Used by the reading interface to surface
 * contextual app suggestions without hard-coding them in component logic.
 */

export interface LabAppEntry {
  /** Unique identifier matching the component file name */
  id: string
  /** Display name shown to the reader */
  name: string
  /** Short description of what the app does */
  description: string
  /** Route path within the /labs section */
  path: string
  /** Books where this app is relevant (slug array; empty = all books) */
  books: string[]
  /** Chapter numbers where this app is especially relevant (empty = all chapters) */
  chapters?: number[]
  /** Key philosophical topic tags for semantic matching */
  topics: string[]
  /** Whether the app is ready for users (false = prototype/coming soon) */
  available: boolean
  /** True if the app is a PoC / placeholder algorithm */
  isPrototype?: boolean
}

export const VEDIC_LABS_REGISTRY: LabAppEntry[] = [
  {
    id: 'karma-yoga-simulator',
    name: 'Karma Yoga Simulator',
    description: 'Practice detached action through interactive scenarios drawn from Gita Chapter 3.',
    path: '/labs/karma-yoga',
    books: ['bhagavad-gita'],
    chapters: [3],
    topics: ['karma', 'action', 'detachment', 'duty'],
    available: true,
    isPrototype: false,
  },
  {
    id: 'chhanda-analyzer',
    name: 'Meter Analyzer',
    description: 'Detect Sanskrit verse meter (Anushtubh, Gayatri, Trishtubh) from Devanagari input.',
    path: '/labs/chhanda',
    books: [],
    topics: ['metre', 'chhanda', 'prosody', 'Sanskrit'],
    available: true,
    isPrototype: true,
  },
  {
    id: 'grammar-tokenizer',
    name: 'Sanskrit Tokenizer',
    description: 'Tokenize Sanskrit words and identify parts of speech using Paninian grammar.',
    path: '/labs/grammar',
    books: [],
    topics: ['grammar', 'Sanskrit', 'morphology', 'Panini'],
    available: true,
    isPrototype: true,
  },
  {
    id: 'pranayama-timer',
    name: 'Pranayama Timer',
    description: 'Guided breathing sessions inspired by Yoga teachings from Gita Chapter 6.',
    path: '/labs/pranayama',
    books: ['bhagavad-gita'],
    chapters: [6],
    topics: ['yoga', 'meditation', 'breathing', 'dhyana'],
    available: true,
    isPrototype: false,
  },
  {
    id: 'akshauhini-calc',
    name: 'Akshauhini Calculator',
    description: 'Visualise ancient army compositions from the Mahabharata with historical context.',
    path: '/labs/akshauhini',
    books: ['mahabharata'],
    topics: ['battle', 'military', 'history', 'Mahabharata'],
    available: true,
    isPrototype: false,
  },
  {
    id: 'astro-explorer',
    name: 'Vedic Astro Explorer',
    description: 'Explore Vedic numerology and astrology concepts referenced in scripture.',
    path: '/labs/astro',
    books: ['bhagavad-gita', 'mahabharata'],
    topics: ['astrology', 'numerology', 'Jyotisha'],
    available: true,
    isPrototype: true,
  },
  {
    id: 'vedic-instruments',
    name: 'Vedic Instruments',
    description: 'Listen to traditional Vedic instruments mentioned in the Mahabharata.',
    path: '/labs/instruments',
    books: ['mahabharata'],
    topics: ['music', 'instruments', 'sound', 'conch'],
    available: true,
    isPrototype: false,
  },
  {
    id: 'jnana-yoga-explorer',
    name: 'Jnana Yoga Explorer',
    description: 'Self-inquiry framework with discrimination exercises from Gita Chapter 13.',
    path: '/labs/jnana',
    books: ['bhagavad-gita'],
    chapters: [13],
    topics: ['jnana', 'knowledge', 'self-inquiry', 'discrimination'],
    available: true,
  },
  {
    id: 'bhakti-yoga-compass',
    name: 'Bhakti Yoga Compass',
    description: 'Devotional practice scenarios testing surrender and equanimity from Gita Chapter 12.',
    path: '/labs/bhakti',
    books: ['bhagavad-gita'],
    chapters: [12],
    topics: ['bhakti', 'devotion', 'surrender', 'equanimity'],
    available: true,
  },
  {
    id: 'dharma-decision-matrix',
    name: 'Dharma Decision Matrix',
    description: 'Ethical decision-making framework derived from Gita Chapters 2 and 16.',
    path: '/labs/dharma',
    books: ['bhagavad-gita'],
    chapters: [2, 16],
    topics: ['dharma', 'ethics', 'decision', 'duty'],
    available: true,
  },
  {
    id: 'moksha-path-navigator',
    name: 'Moksha Path Navigator',
    description: 'Interactive journey through liberation paths from Gita Chapters 8, 12, and 13.',
    path: '/labs/moksha',
    books: ['bhagavad-gita'],
    chapters: [8, 12, 13],
    topics: ['moksha', 'liberation', 'yoga', 'devotion'],
    available: false,
  },
  {
    id: 'time-consciousness-wheel',
    name: 'Time Consciousness Wheel',
    description: 'Explore Vedic time cycles from Nimesha to Brahma\'s lifespan and discover the eternal Self beyond time.',
    path: '/labs/time-wheel',
    books: ['bhagavad-gita'],
    chapters: [8, 10],
    topics: ['time', 'cosmology', 'Brahma', 'eternity', 'Gita'],
    available: true,
  },
  {
    id: 'divine-qualities-assessment',
    name: 'Divine Qualities Assessment',
    description: 'Self-evaluate the 16 daivi and asuri qualities from Gita Chapter 16 to understand your current disposition.',
    path: '/labs/qualities',
    books: ['bhagavad-gita'],
    chapters: [16],
    topics: ['dharma', 'daivi', 'asuri', 'qualities', 'self-assessment'],
    available: true,
  },
  {
    id: 'meditation-state-tracker',
    name: 'Meditation State Tracker',
    description: 'Log your daily meditation state (Kshipta to Nirodha) and receive guidance from Gita Chapter 6.',
    path: '/labs/meditation',
    books: ['bhagavad-gita'],
    chapters: [6],
    topics: ['meditation', 'dhyana', 'yoga', 'mind', 'practice'],
    available: true,
  },
]

/**
 * Return apps relevant to a given book and chapter.
 * Returns only available apps unless `includePrototypes` is true.
 */
export function getAppsForContext(
  bookSlug: string,
  chapterNumber?: number,
  options: { includePrototypes?: boolean } = {}
): LabAppEntry[] {
  return VEDIC_LABS_REGISTRY.filter(app => {
    if (!app.available) return false
    if (!options.includePrototypes && app.isPrototype) return false

    const bookMatch = app.books.length === 0 || app.books.includes(bookSlug)
    if (!bookMatch) return false

    if (chapterNumber && app.chapters && app.chapters.length > 0) {
      return app.chapters.includes(chapterNumber)
    }

    return true
  })
}

/**
 * Return apps matching any of the provided topic tags.
 */
export function getAppsByTopics(topics: string[]): LabAppEntry[] {
  const lower = topics.map(t => t.toLowerCase())
  return VEDIC_LABS_REGISTRY.filter(
    app => app.available && app.topics.some(t => lower.includes(t.toLowerCase()))
  )
}
