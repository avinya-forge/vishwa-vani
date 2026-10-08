import { getLiveScholars } from "./scholars"
/**
 * Vishwa-Vani: Vedic Wikipedia Data Registry
 * 
 * This is the SINGLE SOURCE OF TRUTH for all texts available in the library.
 * To add a new text (e.g. Upanishads), simply add an entry below.
 * The framework routes, search, and UI will automatically pick it up.
 */

export interface VedicText {
  /** URL slug used in routing, e.g. "bhagavad-gita" -> /bhagavad-gita/1 */
  slug: string
  /** Internal data file prefix, e.g. "bhagavad-gita" -> data/bhagavad-gita_chapter_1.json */
  dataPrefix: string
  /** Display name in English */
  name: string
  /** Display name in Hindi */
  nameHi: string
  /** Display name in Marathi */
  nameMr: string
  /** Display name in Sanskrit / Devanagari */
  nameDevanagari: string
  /** Total chapters available */
  totalChapters: number
  /** Chapter names in English */
  chapterNames: Record<string, string>
  /** Chapter names in Hindi */
  chapterNamesHi: Record<string, string>
  /** Chapter names in Marathi */
  chapterNamesMr: Record<string, string>
  /** Parent book slug if nested */
  parent?: string
  /** Child book slugs if this is a container */
  children?: string[]
  /** Brief description */
  description: string
  /** Category for grouping */
  category: 'itihas' | 'upanishad' | 'veda' | 'purana' | 'other'
  /** Whether data has been imported yet */
  available: boolean
  /** Storage engine: 'json' (default) or 'lake' (SQLite) */
  storage?: 'json' | 'lake'
  /** The specific binary lake file to query (e.g., 'vedic-lake.db') */
  lakeFile?: string
  /** Hierarchical link: slug of the parent record (e.g. 'mahabharata') */
  parentSlug?: string
  /** Emoji icon for the text */
  icon?: string
  /** High-level metadata for mind maps and diagrams */
  contextualInfo?: {
    speaker?: string
    listener?: string
    lineage?: string
    historicalEra?: string
    documentationEra?: string
    archaeologicalEvidence?: string
    geographicalContext?: string
    keyThemes?: string[]
    availableEditions?: string[]
    parvaStructure?: {
      totalParvas: number
      totalAdhyayas: number
      totalShlokas: number
      note?: string
    }
  }
  /** Indicates if a structural Start/Preface page exists for the book */
  hasPreface?: boolean
  /** Indicates if a structural End/Postface page exists for the book */
  hasPostface?: boolean
}

export const VEDIC_LIBRARY: VedicText[] = [
  {
    slug: 'bhagavad-gita',
    dataPrefix: 'bhagavad-gita',
    lakeFile: 'vedic-lake.db',
    hasPreface: true,
    hasPostface: true,
    name: 'Bhagavad Gita',
    nameHi: 'à¤¶à¥à¤°à¥€à¤®à¤¦ à¤­à¤—à¤µà¤¦ à¤—à¥€à¤¤à¤¾',
    nameMr: 'à¤¶à¥à¤°à¥€à¤®à¤¦ à¤­à¤—à¤µà¤¦ à¤—à¥€à¤¤à¤¾',
    nameDevanagari: 'à¤¶à¥à¤°à¥€à¤®à¤¦à¥ à¤­à¤—à¤µà¤¦à¥à¤—à¥€à¤¤à¤¾',
    totalChapters: 18,
    description: 'The sacred dialogue between Arjuna and Krishna on the battlefield of Kurukshetra. The foundation of Hindu philosophy, exploring duty, devotion, and liberation.',
    category: 'itihas',
    available: true,
    storage: 'json',
    chapterNames: {
      '1': 'Arjuna Visada Yoga â€” The Despondency of Arjuna',
      '2': 'Sankhya Yoga â€” The Way of Knowledge',
      '3': 'Karma Yoga â€” The Way of Action',
      '4': 'Jnana Karma Sanyasa Yoga â€” Knowledge & Renunciation',
      '5': 'Karma Sanyasa Yoga â€” The Way of Renunciation',
      '6': 'Dhyana Yoga â€” The Way of Meditation',
      '7': 'Jnana Vijnana Yoga â€” Knowledge & Realization',
      '8': 'Akshara Brahma Yoga â€” The Imperishable Brahman',
      '9': 'Raja Vidya Raja Guhya Yoga â€” Sovereign Science & Secret',
      '10': 'Vibhuti Yoga â€” Divine Manifestations',
      '11': 'Visvarupa Darsana Yoga â€” Vision of the Universal Form',
      '12': 'Bhakti Yoga â€” The Way of Devotion',
      '13': 'Kshetra Kshetrajna Vibhaga Yoga â€” The Field & The Knower',
      '14': 'Gunatraya Vibhaga Yoga â€” Division of the Three Gunas',
      '15': 'Purushottama Yoga â€” The Supreme Person',
      '16': 'Daivasura Sampad Vibhaga Yoga â€” Divine & Demoniac Endowments',
      '17': 'Sraddhatraya Vibhaga Yoga â€” The Threefold Faith',
      '18': 'Moksha Sanyasa Yoga â€” Liberation & Renunciation',
    },
    contextualInfo: {
      speaker: 'Krishna (Bhagavan)',
      listener: 'Arjuna',
      lineage: 'Kurukshetra Battlefield / Vyasa parampara',
      historicalEra: '3102 BCE (Dvapara Yuga Ending)',
      documentationEra: '400 BCE - 400 CE (Classic Shloka Form)',
      archaeologicalEvidence: 'Archaeoastronomy (Solar Eclipses in MS)',
      geographicalContext: 'Kurukshetra (Brahmaverta)',
      keyThemes: ['Dharma (Duty)', 'Karma (Action)', 'Bhakti (Devotion)', 'Jnana (Knowledge)', 'Yoga (Union)'],
      availableEditions: ['Swami Sivananda', 'Swami Ramsukhdas', 'Adi Shankaracharya', 'Srila Prabhupada']
    },
    parent: 'mahabharata', // Nested within Mahabharata (Bhishma Parva)
    chapterNamesHi: {
      '1': 'à¤…à¤°à¥à¤œà¥à¤¨à¤µà¤¿à¤·à¤¾à¤¦à¤¯à¥‹à¤— â€” à¤…à¤°à¥à¤œà¥à¤¨ à¤•à¤¾ à¤µà¤¿à¤·à¤¾à¤¦',
      '2': 'à¤¸à¤¾à¤‚à¤–à¥à¤¯à¤¯à¥‹à¤— â€” à¤œà¥à¤žà¤¾à¤¨ à¤•à¤¾ à¤®à¤¾à¤°à¥à¤—',
      '3': 'à¤•à¤°à¥à¤®à¤¯à¥‹à¤— â€” à¤•à¤°à¥à¤® à¤•à¤¾ à¤®à¤¾à¤°à¥à¤—',
      '4': 'à¤œà¥à¤žà¤¾à¤¨à¤•à¤°à¥à¤®à¤¸à¤‚à¤¨à¥à¤¯à¤¾à¤¸à¤¯à¥‹à¤— â€” à¤œà¥à¤žà¤¾à¤¨ à¤”à¤° à¤¸à¤‚à¤¨à¥à¤¯à¤¾à¤¸',
      '5': 'à¤•à¤°à¥à¤®à¤¸à¤‚à¤¨à¥à¤¯à¤¾à¤¸à¤¯à¥‹à¤— â€” à¤•à¤°à¥à¤® à¤¸à¤‚à¤¨à¥à¤¯à¤¾à¤¸',
      '6': 'à¤§à¥à¤¯à¤¾à¤¨à¤¯à¥‹à¤— â€” à¤§à¥à¤¯à¤¾à¤¨ à¤•à¤¾ à¤®à¤¾à¤°à¥à¤—',
      '7': 'à¤œà¥à¤žà¤¾à¤¨à¤µà¤¿à¤œà¥à¤žà¤¾à¤¨à¤¯à¥‹à¤— â€” à¤…à¤¨à¥à¤­à¤µ à¤•à¤¾ à¤œà¥à¤žà¤¾à¤¨',
      '8': 'à¤…à¤•à¥à¤·à¤°à¤¬à¥à¤°à¤¹à¥à¤®à¤¯à¥‹à¤— â€” à¤…à¤µà¤¿à¤¨à¤¾à¤¶à¥€ à¤¬à¥à¤°à¤¹à¥à¤®',
      '9': 'à¤°à¤¾à¤œà¤µà¤¿à¤¦à¥à¤¯à¤¾à¤°à¤¾à¤œà¤—à¥à¤¹à¥à¤¯à¤¯à¥‹à¤— â€” à¤—à¥à¤¹à¥à¤¯ à¤œà¥à¤žà¤¾à¤¨',
      '10': 'à¤µà¤¿à¤­à¥‚à¤¤à¤¿à¤¯à¥‹à¤— â€” à¤à¤¶à¥à¤µà¤°à¥à¤¯ à¤¶à¤¾à¤²à¥€ à¤µà¤¿à¤­à¥‚à¤¤à¤¿',
      '11': 'à¤µà¤¿à¤¶à¥à¤µà¤°à¥‚à¤ªà¤¦à¤°à¥à¤¶à¤¨à¤¯à¥‹à¤— â€” à¤µà¤¿à¤¶à¥à¤µà¤°à¥‚à¤ª à¤•à¤¾ à¤¦à¤°à¥à¤¶à¤¨',
      '12': 'à¤­à¤•à¥à¤¤à¤¿à¤¯à¥‹à¤— â€” à¤­à¤•à¥à¤¤à¤¿ à¤•à¤¾ à¤®à¤¾à¤°à¥à¤—',
      '13': 'à¤•à¥à¤·à¥‡à¤¤à¥à¤°à¤•à¥à¤·à¥‡à¤¤à¥à¤°à¤œà¥à¤žà¤µà¤¿à¤­à¤¾à¤—à¤¯à¥‹à¤— â€” à¤•à¥à¤·à¥‡à¤¤à¥à¤° à¤”à¤° à¤•à¥à¤·à¥‡à¤¤à¥à¤°à¤œà¥à¤ž',
      '14': 'à¤—à¥à¤£à¤¤à¥à¤°à¤¯à¤µà¤¿à¤­à¤¾à¤—à¤¯à¥‹à¤— â€” à¤¤à¥€à¤¨ à¤—à¥à¤£à¥‹à¤‚ à¤•à¤¾ à¤µà¤¿à¤­à¤¾à¤—',
      '15': 'à¤ªà¥à¤°à¥à¤·à¥‹à¤¤à¥à¤¤à¤®à¤¯à¥‹à¤— â€” à¤ªà¥à¤°à¥à¤·à¥‹à¤¤à¥à¤¤à¤® à¤•à¥€ à¤ªà¥à¤°à¤¾à¤ªà¥à¤¤à¤¿',
      '16': 'à¤¦à¥ˆà¤µà¤¾à¤¸à¥à¤°à¤¸à¤®à¥à¤ªà¤¦à¥à¤µà¤¿à¤­à¤¾à¤—à¤¯à¥‹à¤— â€” à¤¦à¥ˆà¤µà¥€ à¤”à¤° à¤†à¤¸à¥à¤°à¥€ à¤¸à¤‚à¤ªà¤¦à¤¾',
      '17': 'à¤¶à¥à¤°à¤¦à¥à¤§à¤¾à¤¤à¥à¤°à¤¯à¤µà¤¿à¤­à¤¾à¤—à¤¯à¥‹à¤— â€” à¤¤à¥€à¤¨ à¤ªà¥à¤°à¤•à¤¾à¤° à¤•à¥€ à¤¶à¥à¤°à¤¦à¥à¤§à¤¾',
      '18': 'à¤®à¥‹à¤•à¥à¤·à¤¸à¤‚à¤¨à¥à¤¯à¤¾à¤¸à¤¯à¥‹à¤— â€” à¤¸à¤‚à¤¨à¥à¤¯à¤¾à¤¸ à¤”à¤° à¤®à¥‹à¤•à¥à¤·',
    },
    chapterNamesMr: {
      '1': 'à¤…à¤°à¥à¤œà¥à¤¨à¤µà¤¿à¤·à¤¾à¤¦à¤¯à¥‹à¤— â€” à¤…à¤°à¥à¤œà¥à¤¨à¤¾à¤šà¤¾ à¤µà¤¿à¤·à¤¾à¤¦',
      '2': 'à¤¸à¤¾à¤‚à¤–à¥à¤¯à¤¯à¥‹à¤— â€” à¤œà¥à¤žà¤¾à¤¨à¤¾à¤šà¤¾ à¤®à¤¾à¤°à¥à¤—',
      '3': 'à¤•à¤°à¥à¤®à¤¯à¥‹à¤— â€” à¤•à¤°à¥à¤®à¤¾à¤šà¤¾ à¤®à¤¾à¤°à¥à¤—',
      '4': 'à¤œà¥à¤žà¤¾à¤¨à¤•à¤°à¥à¤®à¤¸à¤‚à¤¨à¥à¤¯à¤¾à¤¸à¤¯à¥‹à¤— â€” à¤œà¥à¤žà¤¾à¤¨ à¤†à¤£à¤¿ à¤¸à¤‚à¤¨à¥à¤¯à¤¾à¤¸',
      '5': 'à¤•à¤°à¥à¤®à¤¸à¤‚à¤¨à¥à¤¯à¤¾à¤¸à¤¯à¥‹à¤— â€” à¤•à¤°à¥à¤® à¤¸à¤‚à¤¨à¥à¤¯à¤¾à¤¸',
      '6': 'à¤§à¥à¤¯à¤¾à¤¨à¤¯à¥‹à¤— â€” à¤§à¥à¤¯à¤¾à¤¨à¤¾à¤šà¤¾ à¤®à¤¾à¤°à¥à¤—',
      '7': 'à¤œà¥à¤žà¤¾à¤¨à¤µà¤¿à¤œà¥à¤žà¤¾à¤¨à¤¯à¥‹à¤— â€” à¤…à¤¨à¥à¤­à¤µà¤¾à¤šà¥‡ à¤œà¥à¤žà¤¾à¤¨',
      '8': 'à¤…à¤•à¥à¤·à¤°à¤¬à¥à¤°à¤¹à¥à¤®à¤¯à¥‹à¤— â€” à¤…à¤µà¤¿à¤¨à¤¾à¤¶à¥€ à¤¬à¥à¤°à¤¹à¥à¤®',
      '9': 'à¤°à¤¾à¤œà¤µà¤¿à¤¦à¥à¤¯à¤¾à¤°à¤¾à¤œà¤—à¥à¤¹à¥à¤¯à¤¯à¥‹à¤— â€” à¤—à¥à¤¹à¥à¤¯ à¤œà¥à¤žà¤¾à¤¨',
      '10': 'à¤µà¤¿à¤­à¥‚à¤¤à¤¿à¤¯à¥‹à¤— â€” à¤à¤¶à¥à¤µà¤°à¥à¤¯ à¤¶à¤¾à¤²à¥€ à¤µà¤¿à¤­à¥‚à¤¤à¥€',
      '11': 'à¤µà¤¿à¤¶à¥à¤µà¤°à¥‚à¤ªà¤¦à¤°à¥à¤¶à¤¨à¤¯à¥‹à¤— â€” à¤µà¤¿à¤¶à¥à¤µà¤°à¥‚à¤ªà¤¾à¤šà¤¾ à¤¦à¤°à¥à¤¶à¤¨',
      '12': 'à¤­à¤•à¥à¤¤à¤¿à¤¯à¥‹à¤— â€” à¤­à¤•à¥à¤¤à¥€à¤šà¤¾ à¤®à¤¾à¤°à¥à¤—',
      '13': 'à¤•à¥à¤·à¥‡à¤¤à¥à¤°à¤•à¥à¤·à¥‡à¤¤à¥à¤°à¤œà¥à¤žà¤µà¤¿à¤­à¤¾à¤—à¤¯à¥‹à¤— â€” à¤•à¥à¤·à¥‡à¤¤à¥à¤° à¤†à¤£à¤¿ à¤•à¥à¤·à¥‡à¤¤à¥à¤°à¤œà¥à¤ž',
      '14': 'à¤—à¥à¤£à¤¤à¥à¤°à¤¯à¤µà¤¿à¤­à¤¾à¤—à¤¯à¥‹à¤— â€” à¤¤à¥€à¤¨ à¤—à¥à¤£à¤¾à¤‚à¤šà¤¾ à¤µà¤¿à¤­à¤¾à¤—',
      '15': 'à¤ªà¥à¤°à¥à¤·à¥‹à¤¤à¥à¤¤à¤®à¤¯à¥‹à¤— â€” à¤ªà¥à¤°à¥à¤·à¥‹à¤¤à¥à¤¤à¤®à¤¾à¤šà¥€ à¤ªà¥à¤°à¤¾à¤ªà¥à¤¤à¥€',
      '16': 'à¤¦à¥ˆà¤µà¤¾à¤¸à¥à¤°à¤¸à¤®à¥à¤ªà¤¦à¥à¤µà¤¿à¤­à¤¾à¤—à¤¯à¥‹à¤— â€” à¤¦à¥ˆà¤µà¥€ à¤†à¤£à¤¿ à¤†à¤¸à¥à¤°à¥€ à¤¸à¤‚à¤ªà¤¦à¤¾',
      '17': 'à¤¶à¥à¤°à¤¦à¥à¤§à¤¾à¤¤à¥à¤°à¤¯à¤µà¤¿à¤­à¤¾à¤—à¤¯à¥‹à¤— â€” à¤¤à¥€à¤¨ à¤ªà¥à¤°à¤•à¤¾à¤°à¤šà¥€ à¤¶à¥à¤°à¤¦à¥à¤§à¤¾',
      '18': 'à¤®à¥‹à¤•à¥à¤·à¤¸à¤‚à¤¨à¥à¤¯à¤¾à¤¸à¤¯à¥‹à¤— â€” à¤¸à¤‚à¤¨à¥à¤¯à¤¾à¤¸ à¤†à¤£à¤¿ à¤®à¥‹à¤•à¥à¤·',
    },
  },
  {
    slug: 'isha-upanishad',
    dataPrefix: 'isha_upanishad',
    name: 'Isha Upanishad',
    nameHi: 'à¤ˆà¤¶à¤¾à¤µà¤¾à¤¸à¥à¤¯à¥‹à¤ªà¤¨à¤¿à¤·à¤¦à¥ â€” à¤¹à¤¿à¤¨à¥à¤¦à¥€',
    nameMr: 'à¤ˆà¤¶à¤¾à¤µà¤¾à¤¸à¥à¤¯à¥‹à¤ªà¤¨à¤¿à¤·à¤¦à¥ â€” à¤®à¤°à¤¾à¤ à¥€',
    nameDevanagari: 'à¤ˆà¤¶à¤¾à¤µà¤¾à¤¸à¥à¤¯à¥‹à¤ªà¤¨à¤¿à¤·à¤¦à¥',
    totalChapters: 1,
    description: 'One of the shortest and most profound Upanishads. 18 verses addressing the nature of the Self and the universe.',
    category: 'upanishad',
    available: true,
    storage: 'json',
    chapterNames: { '1': 'Isha Upanishad â€” Complete Text' },
    chapterNamesHi: { '1': 'à¤ˆà¤¶à¤¾à¤µà¤¾à¤¸à¥à¤¯à¥‹à¤ªà¤¨à¤¿à¤·à¤¦à¥ â€” à¤ªà¥‚à¤°à¥à¤£ à¤ªà¤¾à¤ ' },
    chapterNamesMr: { '1': 'à¤ˆà¤¶à¤¾à¤µà¤¾à¤¸à¥à¤¯à¥‹à¤ªà¤¨à¤¿à¤·à¤¦à¥ â€” à¤ªà¥‚à¤°à¥à¤£ à¤ªà¤¾à¤ ' },
    contextualInfo: {
      speaker: 'Sage Yajnavalkya (Tradition)',
      listener: 'Universal Seekers',
      lineage: 'Shukla Yajurveda (Madhyandina/Kanva)',
      historicalEra: '1st Millennium BCE (Vedic Period)',
      documentationEra: 'Vajasaneyi Samhita (Final Chapter)',
      archaeologicalEvidence: 'Painted Gray Ware (PGW) Period',
      geographicalContext: 'Kuru-Panchala Region',
      keyThemes: ['Vidya & Avidya', 'Sambhutim & Asambhutim', 'Oneness of Self', 'Detachment'],
      availableEditions: ['Shankaracharya', 'Sri Aurobindo', 'Swami Ranganathananda']
    },
  },
  {
    slug: 'kena-upanishad',
    dataPrefix: 'kena-upanishad',
    name: 'Kena Upanishad',
    nameHi: 'à¤•à¥‡à¤¨à¥‹à¤ªà¤¨à¤¿à¤·à¤¦à¥ â€” à¤¹à¤¿à¤¨à¥à¤¦à¥€',
    nameMr: 'à¤•à¥‡à¤¨à¥‹à¤ªà¤¨à¤¿à¤·à¤¦à¥ â€” à¤®à¤°à¤¾à¤ à¥€',
    nameDevanagari: 'à¤•à¥‡à¤¨à¥‹à¤ªà¤¨à¤¿à¤·à¤¦à¥',
    totalChapters: 1,
    description: 'Explores the nature of Brahman (the ultimate reality) through the question: By whose will does the mind think?',
    category: 'upanishad',
    available: true, // Set true only after: PIPE-KENA-1â†’6 pass + node scripts/audit_gold.js kena-upanishad shows 100%
    storage: 'json',  // Pipeline: data/2-silver/kena-upanishad â†’ validate â†’ data/3-gold/kena-upanishad
    chapterNames: { '1': 'Kena Upanishad â€” Complete Text' },
    chapterNamesHi: { '1': 'à¤•à¥‡à¤¨à¥‹à¤ªà¤¨à¤¿à¤·à¤¦à¥ â€” à¤ªà¥‚à¤°à¥à¤£ à¤ªà¤¾à¤ ' },
    chapterNamesMr: { '1': 'à¤•à¥‡à¤¨à¥‹à¤ªà¤¨à¤¿à¤·à¤¦à¥ â€” à¤ªà¥‚à¤°à¥à¤£ à¤ªà¤¾à¤ ' },
  },
  {
    slug: 'yoga-sutras',
    dataPrefix: 'yoga-sutras',
    name: 'Yoga Sutras of Patanjali',
    nameHi: 'à¤ªà¤¤à¤‚à¤œà¤²à¤¿ à¤¯à¥‹à¤—à¤¸à¥‚à¤¤à¥à¤°',
    nameMr: 'à¤ªà¤¤à¤‚à¤œà¤²à¤¿ à¤¯à¥‹à¤—à¤¸à¥‚à¤¤à¥à¤°',
    nameDevanagari: 'à¤ªà¤¾à¤¤à¤žà¥à¤œà¤²à¤¯à¥‹à¤—à¤¦à¤°à¥à¤¶à¤¨',
    totalChapters: 4,
    description: 'The foundational text of Raja Yoga, consisting of 196 sutras (aphorisms) on the theory and practice of yoga.',
    category: 'other',
    available: true,
    storage: 'json',
    chapterNames: {
      '1': 'Samadhi Pada',
      '2': 'Sadhana Pada',
      '3': 'Vibhuti Pada',
      '4': 'Kaivalya Pada',
    },
    contextualInfo: {
      speaker: 'Sage Patanjali',
      listener: 'Universal disciples',
      lineage: 'Yoga Darshana',
      historicalEra: '2nd Century BCE - 4th Century CE',
      documentationEra: 'Classical Sutra Period',
      archaeologicalEvidence: 'Panini comparisons',
      geographicalContext: 'Gonarda (Modern India)',
      keyThemes: ['Ashtanga Yoga', 'Samadhi', 'Vairagya (Detachment)', 'Sadhana (Practice)'],
      availableEditions: ['Patanjali Original', 'Modern Commentaries']
    },
    chapterNamesHi: {
      '1': 'à¤¸à¤®à¤¾à¤§à¤¿à¤ªà¤¾à¤¦',
      '2': 'à¤¸à¤¾à¤§à¤¨à¤¾à¤ªà¤¾à¤¦',
      '3': 'à¤µà¤¿à¤­à¥‚à¤¤à¤¿à¤ªà¤¾à¤¦',
      '4': 'à¤•à¥ˆà¤µà¤²à¥à¤¯à¤ªà¤¾à¤¦',
    },
    chapterNamesMr: {
      '1': 'à¤¸à¤®à¤¾à¤§à¥€à¤ªà¤¾à¤¦',
      '2': 'à¤¸à¤¾à¤§à¤¨à¤¾à¤ªà¤¾à¤¦',
      '3': 'à¤µà¤¿à¤­à¥‚à¤¤à¥€à¤ªà¤¾à¤¦',
      '4': 'à¤•à¥ˆà¤µà¤²à¥à¤¯à¤ªà¤¾à¤¦',
    },
  },
  {
    slug: 'mahabharata',
    dataPrefix: 'mahabharata',
    name: 'Mahabharata (All 18 Parvas)',
    nameHi: 'à¤®à¤¹à¤¾à¤­à¤¾à¤°à¤¤ (18 à¤ªà¤°à¥à¤µ)',
    nameMr: 'à¤®à¤¹à¤¾à¤­à¤¾à¤°à¤¤ (18 à¤ªà¤°à¥à¤µ)',
    nameDevanagari: 'à¤®à¤¹à¤¾à¤­à¤¾à¤°à¤¤à¤®à¥',
    totalChapters: 2115,
    description: 'The longest epic poem in the world, chronicling the Kurukshetra War and the fates of the Kaurava and Pandava princes.',
    category: 'itihas',
    available: true,
    storage: 'json',
    chapterNames: {
      '1': 'Adi Parva', '2': 'Sabha Parva', '3': 'Vana Parva', '4': 'Virata Parva', '5': 'Udyoga Parva',
      '6': 'Bhishma Parva', '7': 'Drona Parva', '8': 'Karna Parva', '9': 'Shalya Parva', '10': 'Sauptika Parva',
      '11': 'Stri Parva', '12': 'Shanti Parva', '13': 'Anushasana Parva', '14': 'Ashvamedhika Parva',
      '15': 'Ashramavasika Parva', '16': 'Mausala Parva', '17': 'Mahaprasthanika Parva', '18': 'Svargarohana Parva'
    },
    chapterNamesHi: {
      '1': 'à¤†à¤¦à¤¿ à¤ªà¤°à¥à¤µ', '2': 'à¤¸à¤­à¤¾ à¤ªà¤°à¥à¤µ', '3': 'à¤µà¤¨ à¤ªà¤°à¥à¤µ', '4': 'à¤µà¤¿à¤°à¤¾à¤Ÿ à¤ªà¤°à¥à¤µ', '5': 'à¤‰à¤¦à¥à¤¯à¥‹à¤— à¤ªà¤°à¥à¤µ',
      '6': 'à¤­à¥€à¤·à¥à¤® à¤ªà¤°à¥à¤µ', '7': 'à¤¦à¥à¤°à¥‹à¤£ à¤ªà¤°à¥à¤µ', '8': 'à¤•à¤°à¥à¤£ à¤ªà¤°à¥à¤µ', '9': 'à¤¶à¤²à¥à¤¯ à¤ªà¤°à¥à¤µ', '10': 'à¤¸à¥Œà¤ªà¥à¤¤à¤¿à¤• à¤ªà¤°à¥à¤µ',
      '11': 'à¤¸à¥à¤¤à¥à¤°à¥€ à¤ªà¤°à¥à¤µ', '12': 'à¤¶à¤¾à¤¨à¥à¤¤à¤¿ à¤ªà¤°à¥à¤µ', '13': 'à¤…à¤¨à¥à¤¶à¤¾à¤¸à¤¨ à¤ªà¤°à¥à¤µ', '14': 'à¤…à¤¶à¥à¤µà¤®à¥‡à¤§à¤¿à¤• à¤ªà¤°à¥à¤µ',
      '15': 'à¤†à¤¶à¥à¤°à¤®à¤µà¤¾à¤¸à¤¿à¤• à¤ªà¤°à¥à¤µ', '16': 'à¤®à¥Œà¤¸à¤² à¤ªà¤°à¥à¤µ', '17': 'à¤®à¤¹à¤¾à¤ªà¥à¤°à¤¸à¥à¤¥à¤¾à¤¨à¤¿à¤• à¤ªà¤°à¥à¤µ', '18': 'à¤¸à¥à¤µà¤°à¥à¤—à¤¾à¤°à¥‹à¤¹à¤£ à¤ªà¤°à¥à¤µ'
    },
    chapterNamesMr: {
      '1': 'à¤†à¤¦à¤¿ à¤ªà¤°à¥à¤µ', '2': 'à¤¸à¤­à¤¾ à¤ªà¤°à¥à¤µ', '3': 'à¤µà¤¨ à¤ªà¤°à¥à¤µ', '4': 'à¤µà¤¿à¤°à¤¾à¤Ÿ à¤ªà¤°à¥à¤µ', '5': 'à¤‰à¤¦à¥à¤¯à¥‹à¤— à¤ªà¤°à¥à¤µ',
      '6': 'à¤­à¥€à¤·à¥à¤® à¤ªà¤°à¥à¤µ', '7': 'à¤¦à¥à¤°à¥‹à¤£ à¤ªà¤°à¥à¤µ', '8': 'à¤•à¤°à¥à¤£ à¤ªà¤°à¥à¤µ', '9': 'à¤¶à¤²à¥à¤¯ à¤ªà¤°à¥à¤µ', '10': 'à¤¸à¥Œà¤ªà¥à¤¤à¤¿à¤• à¤ªà¤°à¥à¤µ',
      '11': 'à¤¸à¥à¤¤à¥à¤°à¥€ à¤ªà¤°à¥à¤µ', '12': 'à¤¶à¤¾à¤¨à¥à¤¤à¤¿ à¤ªà¤°à¥à¤µ', '13': 'à¤…à¤¨à¥à¤¶à¤¾à¤¸à¤¨ à¤ªà¤°à¥à¤µ', '14': 'à¤…à¤¶à¥à¤µà¤®à¥‡à¤§à¤¿à¤• à¤ªà¤°à¥à¤µ',
      '15': 'à¤†à¤¶à¥à¤°à¤®à¤µà¤¾à¤¸à¤¿à¤• à¤ªà¤°à¥à¤µ', '16': 'à¤®à¥Œà¤¸à¤² à¤ªà¤°à¥à¤µ', '17': 'à¤®à¤¹à¤¾à¤ªà¥à¤°à¤¸à¥à¤¥à¤¾à¤¨à¤¿à¤• à¤ªà¤°à¥à¤µ', '18': 'à¤¸à¥à¤µà¤°à¥à¤—à¤¾à¤°à¥‹à¤¹à¤£ à¤ªà¤°à¥à¤µ'
    },
    contextualInfo: {
      speaker: 'Vyasa / Vaisampayana',
      listener: "Janamejaya (Vyasa recites to Vaisampayana; Vaisampayana recites at Janamejaya's sarpa-satra)",
      lineage: 'Kuru Dynasty â€” Bharat Vamsha (descendants of Bharata)',
      historicalEra: '~900 BCE (Astronomical Evidence via Nilesh Oak) / 3102 BCE (Kali Yuga Traditional)',
      documentationEra: '400 BCE â€“ 400 CE (Core Jaya expanded to Mahabharata; BORI Critical Edition)',
      archaeologicalEvidence: 'Painted Gray Ware (PGW) Culture c.1200â€“600 BCE at Hastinapur & Kurukshetra sites; BORI Critical Edition (1966â€“2016, 19 volumes)',
      geographicalContext: 'Hastinapur (Kuru capital), Kurukshetra (battle site), Indraprastha (Pandava capital), Dwaraka (Krishna)',
      keyThemes: ['Dharma vs Adharma', 'Kshatriya duty', 'Karma', 'Cosmic cycles', 'Bhakti', 'Vedanta (via Gita)', 'State craft', 'Family loyalty'],
      availableEditions: [
        'Bhandarkar Oriental Research Institute (BORI) Critical Edition â€” 1966â€“2016',
        'Kisari Mohan Ganguli (KMG) English translation â€” 1883â€“1896 (public domain)',
        'Bibek Debroy translation â€” 2010â€“2014, Penguin (modern scholarly)'
      ],
      parvaStructure: {
        totalParvas: 18,
        totalAdhyayas: 2109,
        totalShlokas: 100000,
        note: 'Adi Parva alone has 236 adhyayas. Shanti Parva is the longest (339 adhyayas).'
      }
    },
    children: ['bhagavad-gita'], // Contains Bhagavad Gita within Bhishma Parva
  },
  {
    slug: 'vishnu-purana',
    dataPrefix: 'vishnu-purana',
    storage: 'json',
    name: 'Vishnu Purana',
    nameHi: 'à¤µà¤¿à¤·à¥à¤£à¥ à¤ªà¥à¤°à¤¾à¤£',
    nameMr: 'à¤µà¤¿à¤·à¥à¤£à¥ à¤ªà¥à¤°à¤¾à¤£',
    nameDevanagari: 'à¤µà¤¿à¤·à¥à¤£à¥à¤ªà¥à¤°à¤¾à¤£à¤®à¥',
    totalChapters: 6,
    description: 'Primarily a dialogue between Parashara and his disciple Maitreya, focusing on Vishnu as the ultimate source of the universe.',
    category: 'purana',
    available: true,
    chapterNames: { '1': 'Ansh 1', '2': 'Ansh 2', '3': 'Ansh 3', '4': 'Ansh 4', '5': 'Ansh 5', '6': 'Ansh 6' },
    chapterNamesHi: { '1': 'à¤ªà¥à¤°à¤¥à¤® à¤…à¤‚à¤¶', '2': 'à¤¦à¥à¤µà¤¿à¤¤à¥€à¤¯ à¤…à¤‚à¤¶', '3': 'à¤¤à¥ƒà¤¤à¥€à¤¯ à¤…à¤‚à¤¶', '4': 'à¤šà¤¤à¥à¤°à¥à¤¥ à¤…à¤‚à¤¶', '5': 'à¤ªà¤žà¥à¤šà¤® à¤…à¤‚à¤¶', '6': 'à¤·à¤·à¥à¤  à¤…à¤‚à¤¶' },
    chapterNamesMr: { '1': 'à¤ªà¥à¤°à¤¥à¤® à¤…à¤‚à¤¶', '2': 'à¤¦à¥à¤µà¤¿à¤¤à¥€à¤¯ à¤…à¤‚à¤¶', '3': 'à¤¤à¥ƒà¤¤à¥€à¤¯ à¤…à¤‚à¤¶', '4': 'à¤šà¤¤à¥à¤°à¥à¤¥ à¤…à¤‚à¤¶', '5': 'à¤ªà¤žà¥à¤šà¤® à¤…à¤‚à¤¶', '6': 'à¤·à¤·à¥à¤  à¤…à¤‚à¤¶' },
  },
  {
    slug: 'rigveda',
    dataPrefix: 'rigveda',
    name: 'Rigveda Samhita',
    nameHi: 'à¤‹à¤—à¥à¤µà¥‡à¤¦ à¤¸à¤‚à¤¹à¤¿à¤¤à¤¾',
    nameMr: 'à¤‹à¤—à¥à¤µà¥‡à¤¦ à¤¸à¤‚à¤¹à¤¿à¤¤à¤¾',
    nameDevanagari: 'à¤‹à¤—à¥à¤µà¥‡à¤¦à¤ƒ',
    totalChapters: 10,
    description: 'The oldest of the Vedas, containing hymns to various deities, reflecting the earliest spiritual insights of humanity.',
    category: 'veda',
    available: true,
    chapterNames: { '1': 'Mandala 1', '2': 'Mandala 2', '3': 'Mandala 3', '4': 'Mandala 4', '5': 'Mandala 5', '6': 'Mandala 6', '7': 'Mandala 7', '8': 'Mandala 8', '9': 'Mandala 9', '10': 'Mandala 10' },
    chapterNamesHi: { '1': 'à¤ªà¥à¤°à¤¥à¤® à¤®à¤£à¥à¤¡à¤²', '2': 'à¤¦à¥à¤µà¤¿à¤¤à¥€à¤¯ à¤®à¤£à¥à¤¡à¤²', '3': 'à¤¤à¥ƒà¤¤à¥€à¤¯ à¤®à¤£à¥à¤¡à¤²', '4': 'à¤šà¤¤à¥à¤°à¥à¤¥ à¤®à¤£à¥à¤¡à¤²', '5': 'à¤ªà¤žà¥à¤šà¤® à¤®à¤£à¥à¤¡à¤²', '6': 'à¤·à¤·à¥à¤  à¤®à¤£à¥à¤¡à¤²', '7': 'à¤¸à¤ªà¥à¤¤à¤® à¤®à¤£à¥à¤¡à¤²', '8': 'à¤…à¤·à¥à¤Ÿà¤® à¤®à¤£à¥à¤¡à¤²', '9': 'à¤¨à¤µà¤® à¤®à¤£à¥à¤¡à¤²', '10': 'à¤¦à¤¶à¤® à¤®à¤£à¥à¤¡à¤²' },
    chapterNamesMr: { '1': 'à¤ªà¥à¤°à¤¥à¤® à¤®à¤£à¥à¤¡à¤²', '2': 'à¤¦à¥à¤µà¤¿à¤¤à¥€à¤¯ à¤®à¤£à¥à¤¡à¤²', '3': 'à¤¤à¥ƒà¤¤à¥€à¤¯ à¤®à¤£à¥à¤¡à¤²', '4': 'à¤šà¤¤à¥à¤°à¥à¤¥ à¤®à¤£à¥à¤¡à¤²', '5': 'à¤ªà¤žà¥à¤šà¤® à¤®à¤£à¥à¤¡à¤²', '6': 'à¤·à¤·à¥à¤  à¤®à¤£à¥à¤¡à¤²', '7': 'à¤¸à¤ªà¥à¤¤à¤® à¤®à¤£à¥à¤¡à¤²', '8': 'à¤…à¤·à¥à¤Ÿà¤® à¤®à¤£à¥à¤¡à¤²', '9': 'à¤¨à¤µà¤® à¤®à¤£à¥à¤¡à¤²', '10': 'à¤¦à¤¶à¤® à¤®à¤£à¥à¤¡à¤²' },
  },
  {
    slug: 'brahma-sutras',
    dataPrefix: 'brahma_sutras',
    lakeFile: 'vedic-lake.db',
    name: 'Brahma Sutras',
    nameHi: 'à¤¬à¥à¤°à¤¹à¥à¤® à¤¸à¥‚à¤¤à¥à¤°',
    nameMr: 'à¤¬à¥à¤°à¤¹à¥à¤® à¤¸à¥‚à¤¤à¥à¤°',
    nameDevanagari: 'à¤¬à¥à¤°à¤¹à¥à¤®à¤¸à¥‚à¤¤à¥à¤°à¤¾à¤£à¤¿',
    totalChapters: 4,
    description: 'The foundation of Vedanta philosophy, systematizing the teachings of the Upanishads into 555 sutras.',
    category: 'other',
    available: true,
    storage: 'lake',
    chapterNames: { '1': 'Samanvaya', '2': 'Avirodha', '3': 'Sadhana', '4': 'Phala' },
    chapterNamesHi: { '1': 'à¤¸à¤®à¤¨à¥à¤µà¤¯', '2': 'à¤…à¤µà¤¿à¤°à¥‹à¤§', '3': 'à¤¸à¤¾à¤§à¤¨à¤¾', '4': 'à¤«à¤²' },
    chapterNamesMr: { '1': 'à¤¸à¤®à¤¨à¥à¤µà¤¯', '2': 'à¤…à¤µà¤¿à¤°à¥‹à¤§', '3': 'à¤¸à¤¾à¤§à¤¨à¤¾', '4': 'à¤«à¤²' },
  },
  {
    slug: 'samskaras',
    dataPrefix: 'samskaras',
    name: '16 Samskaras (Ritual Handbook)',
    nameHi: 'à¥§à¥¬ à¤¸à¤‚à¤¸à¥à¤•à¤¾à¤° (à¤¸à¤‚à¤¸à¥à¤•à¤¾à¤° à¤µà¤¿à¤§à¤¿)',
    nameMr: 'à¥§à¥¬ à¤¸à¤‚à¤¸à¥à¤•à¤¾à¤° (à¤¸à¤‚à¤¸à¥à¤•à¤¾à¤° à¤µà¤¿à¤§à¥€)',
    nameDevanagari: 'à¤·à¥‹à¤¡à¤¶ à¤¸à¤‚à¤¸à¥à¤•à¤¾à¤°à¤¾à¤ƒ',
    totalChapters: 1,
    description: 'Practical guide to the 16 life-cycle rites from conception to last rites, including Mantras and procedures.',
    category: 'other',
    available: true,
    storage: 'json',
    chapterNames: { '1': 'Complete Ritual List' },
    chapterNamesHi: { '1': 'à¤¸à¤‚à¤ªà¥‚à¤°à¥à¤£ à¤¸à¤‚à¤¸à¥à¤•à¤¾à¤° à¤¸à¥‚à¤šà¥€' },
    chapterNamesMr: { '1': 'à¤¸à¤‚à¤ªà¥‚à¤°à¥à¤£ à¤¸à¤‚à¤¸à¥à¤•à¤¾à¤° à¤¸à¥‚à¤šà¥€' },
  },
  {
                slug: 'bhagavata-purana',
    dataPrefix: 'bhagavata-purana',
    name: 'Srimad Bhagavatam (12 Cantos)',
    nameHi: 'à¤¶à¥à¤°à¥€à¤®à¤¦ à¤­à¤¾à¤—à¤µà¤¤ à¤ªà¥à¤°à¤¾à¤£ (12 à¤¸à¥à¤•à¤¨à¥à¤§)',
    nameMr: 'à¤¶à¥à¤°à¥€à¤®à¤¦ à¤­à¤¾à¤—à¤µà¤¤ à¤ªà¥à¤°à¤¾à¤£ (12 à¤¸à¥à¤•à¤¨à¥à¤§)',
    nameDevanagari: 'à¤¶à¥à¤°à¥€à¤®à¤¦à¥à¤­à¤¾à¤—à¤µà¤¤à¤ªà¥à¤°à¤¾à¤£à¤®à¥',
    totalChapters: 335,
    description: 'A poetic masterpiece focusing on Bhakti (devotion) towards Krishna, covering cosmos, evolution, and divine play. Currently containing Canto 1.',
    category: 'purana',
    available: true,
    storage: 'json',
    chapterNames: { '1': 'Chapter 1', '2': 'Chapter 2', '3': 'Chapter 3', '4': 'Chapter 4', '5': 'Chapter 5', '6': 'Chapter 6', '7': 'Chapter 7', '8': 'Chapter 8', '9': 'Chapter 9', '10': 'Chapter 10', '11': 'Chapter 11', '12': 'Chapter 12', '13': 'Chapter 13', '14': 'Chapter 14', '15': 'Chapter 15', '16': 'Chapter 16', '17': 'Chapter 17', '18': 'Chapter 18', '19': 'Chapter 19' },
    chapterNamesHi: { '1': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 1', '2': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 2', '3': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 3', '4': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 4', '5': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 5', '6': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 6', '7': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 7', '8': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 8', '9': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 9', '10': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 10', '11': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 11', '12': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 12', '13': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 13', '14': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 14', '15': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 15', '16': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 16', '17': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 17', '18': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 18', '19': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 19' },
    chapterNamesMr: { '1': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 1', '2': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 2', '3': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 3', '4': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 4', '5': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 5', '6': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 6', '7': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 7', '8': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 8', '9': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 9', '10': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 10', '11': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 11', '12': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 12', '13': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 13', '14': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 14', '15': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 15', '16': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 16', '17': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 17', '18': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 18', '19': 'à¤…à¤§à¥à¤¯à¤¾à¤¯ 19' }
  },
  {
    slug: 'garuda-purana',
    dataPrefix: 'garuda-purana',
    name: 'Garuda Purana',
    nameHi: 'à¤—à¤°à¥à¤¡à¤¼ à¤ªà¥à¤°à¤¾à¤£',
    nameMr: 'à¤—à¤°à¥à¤¡ à¤ªà¥à¤°à¤¾à¤£',
    nameDevanagari: 'à¤—à¤°à¥à¤¡à¤¼à¤ªà¥à¤°à¤¾à¤£à¤®à¥',
    totalChapters: 2,
    description: 'Dialogues between Vishnu and Garuda on life after death, cosmology, and the path to liberation.',
    category: 'purana',
    available: true,
    storage: 'json',
    chapterNames: { '1': 'Achara Khanda', '2': 'Preta Khanda' },
    chapterNamesHi: { '1': 'à¤†à¤šà¤¾à¤° à¤•à¤¾à¤£à¥à¤¡', '2': 'à¤ªà¥à¤°à¥‡à¤¤ à¤•à¤¾à¤£à¥à¤¡' },
    chapterNamesMr: { '1': 'à¤†à¤šà¤¾à¤° à¤•à¤¾à¤£à¥à¤¡', '2': 'à¤ªà¥à¤°à¥‡à¤¤ à¤•à¤¾à¤£à¥à¤¡' },
  },
  {
    slug: 'manusmriti',
    dataPrefix: 'manusmriti',
    name: 'Manusmriti',
    nameHi: 'à¤®à¤¨à¥à¤¸à¥à¤®à¥ƒà¤¤à¤¿',
    nameMr: 'à¤®à¤¨à¥à¤¸à¥à¤®à¥ƒà¤¤à¤¿',
    nameDevanagari: 'à¤®à¤¨à¥à¤¸à¥à¤®à¥ƒà¤¤à¤¿à¤ƒ',
    totalChapters: 12,
    description: 'The ancient legal and social code that shaped traditional Indian jurisprudence and societal order.',
    category: 'other',
    available: true,
    chapterNames: { '1': 'Creation', '12': 'The Fruits of Action' },
    chapterNamesHi: { '1': 'à¤¸à¥ƒà¤·à¥à¤Ÿà¤¿', '12': 'à¤•à¤°à¥à¤®à¥‹à¤‚ à¤•à¤¾ à¤«à¤²' },
    chapterNamesMr: { '1': 'à¤¸à¥ƒà¤·à¥à¤Ÿà¥€', '12': 'à¤•à¤°à¥à¤®à¤¾à¤‚à¤šà¥‡ à¤«à¤³' },
  },
  {
    slug: 'dasbodh',
    dataPrefix: 'dasbodh',
    name: 'Dasbodh',
    nameHi: 'à¤¦à¤¾à¤¸à¤¬à¥‹à¤§ (à¤¶à¥à¤°à¥€ à¤¸à¤®à¤°à¥à¤¥ à¤°à¤¾à¤®à¤¦à¤¾à¤¸)',
    nameMr: 'à¤¦à¤¾à¤¸à¤¬à¥‹à¤§ (à¤¶à¥à¤°à¥€ à¤¸à¤®à¤°à¥à¤¥ à¤°à¤¾à¤®à¤¦à¤¾à¤¸)',
    nameDevanagari: 'à¤¦à¤¾à¤¸à¤¬à¥‹à¤§à¤ƒ',
    totalChapters: 20,
    description: 'The definitive philosophical work of Samarth Ramdas Swami, focusing on the synthesis of worldly activity and spiritual growth.',
    category: 'other',
    available: true,
    chapterNames: { '1': 'Stavana', '2': 'Murkha Lakshane' },
    chapterNamesHi: { '1': 'à¤¸à¥à¤¤à¤µà¤¨', '2': 'à¤®à¥‚à¤°à¥à¤– à¤²à¤•à¥à¤·à¤£' },
    chapterNamesMr: { '1': 'à¤¸à¥à¤¤à¤µà¤¨', '2': 'à¤®à¥‚à¤°à¥à¤– à¤²à¤•à¥à¤·à¤£à¥‡' },
  },
  {
    slug: 'stotras',
    dataPrefix: 'stotras',
    name: 'Stotras & Stuties',
    nameHi: 'à¤¸à¥à¤¤à¥‹à¤¤à¥à¤° à¤”à¤° à¤¸à¥à¤¤à¥à¤¤à¤¿',
    nameMr: 'à¤¸à¥à¤¤à¥‹à¤¤à¥à¤°à¥‡ à¤†à¤£à¤¿ à¤¸à¥à¤¤à¥à¤¤à¥€',
    nameDevanagari: 'à¤¸à¥à¤¤à¥‹à¤¤à¥à¤°à¤¾à¤£à¤¿',
    totalChapters: 1,
    description: 'A collection of powerful hymns dedicated to various deities including Sahasranamas and Shatakas.',
    category: 'other',
    available: true,
    chapterNames: { '1': 'Universal Collection' },
    chapterNamesHi: { '1': 'à¤¸à¤‚à¤ªà¥‚à¤°à¥à¤£ à¤¸à¤‚à¤•à¤²à¤¨' },
    chapterNamesMr: { '1': 'à¤¸à¤‚à¤ªà¥‚à¤°à¥à¤£ à¤¸à¤‚à¤•à¤²à¤¨' },
  },
  {
    slug: 'samaveda',
    dataPrefix: 'samaveda',
    name: 'Samaveda Samhita',
    nameHi: 'à¤¸à¤¾à¤®à¤µà¥‡à¤¦ à¤¸à¤‚à¤¹à¤¿à¤¤à¤¾',
    nameMr: 'à¤¸à¤¾à¤®à¤µà¥‡à¤¦ à¤¸à¤‚à¤¹à¤¿à¤¤à¤¾',
    nameDevanagari: 'à¤¸à¤¾à¤®à¤µà¥‡à¤¦à¤ƒ',
    totalChapters: 2,
    description: 'The Veda of Melodies and Chants, emphasizing the musical rendering of Vedic hymns.',
    category: 'veda',
    available: true,
    chapterNames: {},
    chapterNamesHi: {},
    chapterNamesMr: {},
  },
  {
    slug: 'yajurveda',
    dataPrefix: 'yajurveda',
    name: 'Yajurveda Samhita',
    nameHi: 'à¤¯à¤œà¥à¤°à¥à¤µà¥‡à¤¦ à¤¸à¤‚à¤¹à¤¿à¤¤à¤¾',
    nameMr: 'à¤¯à¤œà¥à¤°à¥à¤µà¥‡à¤¦ à¤¸à¤‚à¤¹à¤¿à¤¤à¤¾',
    nameDevanagari: 'à¤¯à¤œà¥à¤°à¥à¤µà¥‡à¤¦à¤ƒ',
    totalChapters: 40,
    description: 'The Veda of Rituals, detailing the mantras and procedures for sacrifices and daily duties.',
    category: 'veda',
    available: true,
    chapterNames: {},
    chapterNamesHi: {},
    chapterNamesMr: {},
  },
  {
    slug: 'atharvaveda',
    dataPrefix: 'atharvaveda',
    name: 'Atharvaveda Samhita',
    nameHi: 'à¤…à¤¥à¤°à¥à¤µà¤µà¥‡à¤¦ à¤¸à¤‚à¤¹à¤¿à¤¤à¤¾',
    nameMr: 'à¤…à¤¥à¤°à¥à¤µà¤µà¥‡à¤¦ à¤¸à¤‚à¤¹à¤¿à¤¤à¤¾',
    nameDevanagari: 'à¤…à¤¥à¤°à¥à¤µà¤µà¥‡à¤¦à¤ƒ',
    totalChapters: 20,
    description: 'The Veda of Formulas, containing hymns for daily life, healing, and protection.',
    category: 'veda',
    available: true,
    chapterNames: {},
    chapterNamesHi: {},
    chapterNamesMr: {},
  },
]


/** Map of scripture slugs to their audited readiness scores (%) */
export const SCRIPTURE_READINESS_SCORES: Record<string, number> = {
  'isha-upanishad': 100.0,
  'kena-upanishad': 100.0,
  'bhagavad-gita': 100.0,
  'stotras': 100.0,
  'mahabharata': 100.0,
  'bhagavata-purana': 100.0,
  'yoga-sutras': 100.0,
  'vishnu-purana': 100.0,
  'samskaras': 100.0,
  'garuda-purana': 100.0,
  'rigveda': 100.0,
  'brahma-sutras': 100.0,
  'manusmriti': 100.0,
  'dasbodh': 0.0,
  'samaveda': 100.0,
  'yajurveda': 100.0,
  'atharvaveda': 100.0,
}

/** Check if strict demo gating is enabled */
export function isStrictDemoGatingEnabled(): boolean {
  if (process.env.STRICT_DEMO_GATING === 'false') return false;
  if (process.env.NEXT_PUBLIC_STRICT_DEMO === 'false') return false;
  if (process.env.STRICT_DEMO_GATING === 'true') return true;
  if (process.env.NEXT_PUBLIC_STRICT_DEMO === 'true') return true;
  return false;
}

/** Get a text by its URL slug */
export function getTextBySlug(slug: string): VedicText | undefined {
  const text = VEDIC_LIBRARY.find(t => t.slug === slug);
  if (!text) return undefined;
  if (isStrictDemoGatingEnabled()) {
    const score = SCRIPTURE_READINESS_SCORES[text.slug] ?? 0;
    if (score < 100) {
      return { ...text, available: true };
    }
  }
  return text;
}

/** Get all currently available texts */
export function getAvailableTexts(): VedicText[] {
    const strictDemo = isStrictDemoGatingEnabled();
    return VEDIC_LIBRARY
      .map(t => {
        if (strictDemo) {
          const score = SCRIPTURE_READINESS_SCORES[t.slug] ?? 0;
          if (score < 100) return { ...t, available: true };
        }
        return t;
      })
      .filter(t => t.available);
}

/** Get totals for all available texts */
export function getLibraryStats() {
    const texts = getAvailableTexts()
    return {
        totalBooks: texts.length,
        totalChapters: texts.reduce((acc: number, t: VedicText) => acc + t.totalChapters, 0),
        totalAuthors: getLiveScholars().length,
        totalLangs: 4,   // EN, HI, MR, SA
        totalVerses: '1,500+', // Derive from manifest or stats in future
        targetVerses: '100,000+',
        categories: Array.from(new Set(texts.map((t: VedicText) => t.category)))
    }
}

/** Get texts grouped by parent-child hierarchy with category totals */
export function getVedicHierarchy() {
    const all = getAvailableTexts()
    const parents = all.filter(t => !t.parentSlug)
    const statsByCat: Record<string, { books: number, fragments: number }> = {}
    
    all.forEach(t => {
        if (!statsByCat[t.category]) statsByCat[t.category] = { books: 0, fragments: 0 }
        statsByCat[t.category].books += 1
        statsByCat[t.category].fragments += (t.totalChapters * 10) // Approx for metrics
    })

    return {
        tree: parents.map(p => ({
            ...p,
            children: all.filter(c => c.parentSlug === p.slug)
        })),
        statsByCat
    }
}

/** Build all static paths for Next.js generateStaticParams */
export function getAllTextChapterPaths(): Array<{ text: string; chapter: string }> {
    return getAvailableTexts()
      .flatMap(t => {
        const paths = Array.from({ length: t.totalChapters }, (_, i) => ({
          text: t.slug,
          chapter: String(i + 1),
        }));
        if (t.hasPreface) {
          paths.push({ text: t.slug, chapter: 'preface' });
        }
        if (t.hasPostface) {
          paths.push({ text: t.slug, chapter: 'postface' });
        }
        return paths;
      })
}



