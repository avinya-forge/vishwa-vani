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
  /** Internal data file prefix, e.g. "bhagavad_gita" -> data/bhagavad_gita_chapter_1.json */
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
}

export const VEDIC_LIBRARY: VedicText[] = [
  {
    slug: 'bhagavad-gita',
    dataPrefix: 'bhagavad_gita',
    lakeFile: 'vedic-lake.db',
    name: 'Bhagavad Gita',
    nameHi: 'श्रीमद भगवद गीता',
    nameMr: 'श्रीमद भगवद गीता',
    nameDevanagari: 'श्रीमद् भगवद्गीता',
    totalChapters: 18,
    description: 'The sacred dialogue between Arjuna and Krishna on the battlefield of Kurukshetra. The foundation of Hindu philosophy, exploring duty, devotion, and liberation.',
    category: 'itihas',
    available: true,
    storage: 'lake',
    chapterNames: {
      '1': 'Arjuna Visada Yoga — The Despondency of Arjuna',
      '2': 'Sankhya Yoga — The Way of Knowledge',
      '3': 'Karma Yoga — The Way of Action',
      '4': 'Jnana Karma Sanyasa Yoga — Knowledge & Renunciation',
      '5': 'Karma Sanyasa Yoga — The Way of Renunciation',
      '6': 'Dhyana Yoga — The Way of Meditation',
      '7': 'Jnana Vijnana Yoga — Knowledge & Realization',
      '8': 'Akshara Brahma Yoga — The Imperishable Brahman',
      '9': 'Raja Vidya Raja Guhya Yoga — Sovereign Science & Secret',
      '10': 'Vibhuti Yoga — Divine Manifestations',
      '11': 'Visvarupa Darsana Yoga — Vision of the Universal Form',
      '12': 'Bhakti Yoga — The Way of Devotion',
      '13': 'Kshetra Kshetrajna Vibhaga Yoga — The Field & The Knower',
      '14': 'Gunatraya Vibhaga Yoga — Division of the Three Gunas',
      '15': 'Purushottama Yoga — The Supreme Person',
      '16': 'Daivasura Sampad Vibhaga Yoga — Divine & Demoniac Endowments',
      '17': 'Sraddhatraya Vibhaga Yoga — The Threefold Faith',
      '18': 'Moksha Sanyasa Yoga — Liberation & Renunciation',
    },
    chapterNamesHi: {
      '1': 'अर्जुनविषादयोग — अर्जुन का विषाद',
      '2': 'सांख्ययोग — ज्ञान का मार्ग',
      '3': 'कर्मयोग — कर्म का मार्ग',
      '4': 'ज्ञानकर्मसंन्यासयोग — ज्ञान और संन्यास',
      '5': 'कर्मसंन्यासयोग — कर्म संन्यास',
      '6': 'ध्यानयोग — ध्यान का मार्ग',
      '7': 'ज्ञानविज्ञानयोग — अनुभव का ज्ञान',
      '8': 'अक्षरब्रह्मयोग — अविनाशी ब्रह्म',
      '9': 'राजविद्याराजगुह्ययोग — गुह्य ज्ञान',
      '10': 'विभूतियोग — ऐश्वर्य शाली विभूति',
      '11': 'विश्वरूपदर्शनयोग — विश्वरूप का दर्शन',
      '12': 'भक्तियोग — भक्ति का मार्ग',
      '13': 'क्षेत्रक्षेत्रज्ञविभागयोग — क्षेत्र और क्षेत्रज्ञ',
      '14': 'गुणत्रयविभागयोग — तीन गुणों का विभाग',
      '15': 'पुरुषोत्तमयोग — पुरुषोत्तम की प्राप्ति',
      '16': 'दैवासुरसम्पद्विभागयोग — दैवी और आसुरी संपदा',
      '17': 'श्रद्धात्रयविभागयोग — तीन प्रकार की श्रद्धा',
      '18': 'मोक्षसंन्यासयोग — संन्यास और मोक्ष',
    },
    chapterNamesMr: {
      '1': 'अर्जुनविषादयोग — अर्जुनाचा विषाद',
      '2': 'सांख्ययोग — ज्ञानाचा मार्ग',
      '3': 'कर्मयोग — कर्माचा मार्ग',
      '4': 'ज्ञानकर्मसंन्यासयोग — ज्ञान आणि संन्यास',
      '5': 'कर्मसंन्यासयोग — कर्म संन्यास',
      '6': 'ध्यानयोग — ध्यानाचा मार्ग',
      '7': 'ज्ञानविज्ञानयोग — अनुभवाचे ज्ञान',
      '8': 'अक्षरब्रह्मयोग — अविनाशी ब्रह्म',
      '9': 'राजविद्याराजगुह्ययोग — गुह्य ज्ञान',
      '10': 'विभूतियोग — ऐश्वर्य शाली विभूती',
      '11': 'विश्वरूपदर्शनयोग — विश्वरूपाचा दर्शन',
      '12': 'भक्तियोग — भक्तीचा मार्ग',
      '13': 'क्षेत्रक्षेत्रज्ञविभागयोग — क्षेत्र आणि क्षेत्रज्ञ',
      '14': 'गुणत्रयविभागयोग — तीन गुणांचा विभाग',
      '15': 'पुरुषोत्तमयोग — पुरुषोत्तमाची प्राप्ती',
      '16': 'दैवासुरसम्पद्विभागयोग — दैवी आणि आसुरी संपदा',
      '17': 'श्रद्धात्रयविभागयोग — तीन प्रकारची श्रद्धा',
      '18': 'मोक्षसंन्यासयोग — संन्यास आणि मोक्ष',
    },
  },
  // --- PLACEHOLDER: Future texts to be imported ---
  {
    slug: 'isha-upanishad',
    dataPrefix: 'isha_upanishad',
    name: 'Isha Upanishad',
    nameHi: 'ईशावास्योपनिषद् — हिन्दी',
    nameMr: 'ईशावास्योपनिषद् — मराठी',
    nameDevanagari: 'ईशावास्योपनिषद्',
    totalChapters: 1,
    description: 'One of the shortest and most profound Upanishads. 18 verses addressing the nature of the Self and the universe.',
    category: 'upanishad',
    available: true,
    storage: 'lake',
    chapterNames: { '1': 'Isha Upanishad — Complete Text' },
    chapterNamesHi: { '1': 'ईशावास्योपनिषद् — पूर्ण पाठ' },
    chapterNamesMr: { '1': 'ईशावास्योपनिषद् — पूर्ण पाठ' },
  },
  {
    slug: 'kena-upanishad',
    dataPrefix: 'kena_upanishad',
    name: 'Kena Upanishad',
    nameHi: 'केनोपनिषद् — हिन्दी',
    nameMr: 'केनोपनिषद् — मराठी',
    nameDevanagari: 'केनोपनिषद्',
    totalChapters: 1,
    description: 'Explores the nature of Brahman (the ultimate reality) through the question: By whose will does the mind think?',
    category: 'upanishad',
    available: true,
    storage: 'lake',
    chapterNames: { '1': 'Kena Upanishad — Complete Text' },
    chapterNamesHi: { '1': 'केनोपनिषद् — पूर्ण पाठ' },
    chapterNamesMr: { '1': 'केनोपनिषद् — पूर्ण पाठ' },
  },
  {
    slug: 'patanjali-yoga-sutras',
    dataPrefix: 'yoga_sutras',
    name: 'Yoga Sutras of Patanjali',
    nameHi: 'पतंजलि योगसूत्र — हिन्दी',
    nameMr: 'पतंजलि योगसूत्र — मराठी',
    nameDevanagari: 'पातञ्जलयोगदर्शन',
    totalChapters: 4,
    description: 'The foundational text of Raja Yoga, consisting of 196 sutras (aphorisms) on the theory and practice of yoga.',
    category: 'other',
    available: true,
    storage: 'lake',
    chapterNames: {
      '1': 'Samadhi Pada',
      '2': 'Sadhana Pada',
      '3': 'Vibhuti Pada',
      '4': 'Kaivalya Pada',
    },
    chapterNamesHi: {
      '1': 'समाधिपाद',
      '2': 'साधनापाद',
      '3': 'विभूतिपाद',
      '4': 'कैवल्यपाद',
    },
    chapterNamesMr: {
      '1': 'समाधीपाद',
      '2': 'साधनापाद',
      '3': 'विभूतीपाद',
      '4': 'कैवल्यपाद',
    },
  },
  {
    slug: 'mahabharata',
    dataPrefix: 'mahabharata',
    name: 'Mahabharata (All 18 Parvas)',
    nameHi: 'महाभारत (18 पर्व)',
    nameMr: 'महाभारत (18 पर्व)',
    nameDevanagari: 'महाभारतम्',
    totalChapters: 18,
    description: 'The longest epic poem in the world, chronicling the Kurukshetra War and the fates of the Kaurava and Pandava princes.',
    category: 'itihas',
    available: false,
    storage: 'lake',
    chapterNames: {
      '1': 'Adi Parva', '2': 'Sabha Parva', '3': 'Vana Parva', '4': 'Virata Parva', '5': 'Udyoga Parva',
      '6': 'Bhishma Parva', '7': 'Drona Parva', '8': 'Karna Parva', '9': 'Shalya Parva', '10': 'Sauptika Parva',
      '11': 'Stri Parva', '12': 'Shanti Parva', '13': 'Anushasana Parva', '14': 'Ashvamedhika Parva',
      '15': 'Ashramavasika Parva', '16': 'Mausala Parva', '17': 'Mahaprasthanika Parva', '18': 'Svargarohana Parva'
    },
    chapterNamesHi: {
      '1': 'आदि पर्व', '2': 'सभा पर्व', '3': 'वन पर्व', '4': 'विराट पर्व', '5': 'उद्योग पर्व',
      '6': 'भीष्म पर्व', '7': 'द्रोण पर्व', '8': 'कर्ण पर्व', '9': 'शल्य पर्व', '10': 'सौप्तिक पर्व',
      '11': 'स्त्री पर्व', '12': 'शान्ति पर्व', '13': 'अनुशासन पर्व', '14': 'अश्वमेधिक पर्व',
      '15': 'आश्रमवासिक पर्व', '16': 'मौसल पर्व', '17': 'महाप्रस्थानिक पर्व', '18': 'स्वर्गारोहण पर्व'
    },
    chapterNamesMr: {
      '1': 'आदि पर्व', '2': 'सभा पर्व', '3': 'वन पर्व', '4': 'विराट पर्व', '5': 'उद्योग पर्व',
      '6': 'भीष्म पर्व', '7': 'द्रोण पर्व', '8': 'कर्ण पर्व', '9': 'शल्य पर्व', '10': 'सौप्तिक पर्व',
      '11': 'स्त्री पर्व', '12': 'शान्ति पर्व', '13': 'अनुशासन पर्व', '14': 'अश्वमेधिक पर्व',
      '15': 'आश्रमवासिक पर्व', '16': 'मौसल पर्व', '17': 'महाप्रस्थानिक पर्व', '18': 'स्वर्गारोहण पर्व'
    },
  },
  {
    slug: 'vishnu-purana',
    dataPrefix: 'vishnu_purana',
    name: 'Vishnu Purana',
    nameHi: 'विष्णु पुराण',
    nameMr: 'विष्णु पुराण',
    nameDevanagari: 'विष्णुपुराणम्',
    totalChapters: 6,
    description: 'Primarily a dialogue between Parashara and his disciple Maitreya, focusing on Vishnu as the ultimate source of the universe.',
    category: 'purana',
    available: false,
    chapterNames: { '1': 'Ansh 1', '2': 'Ansh 2', '3': 'Ansh 3', '4': 'Ansh 4', '5': 'Ansh 5', '6': 'Ansh 6' },
    chapterNamesHi: { '1': 'प्रथम अंश', '2': 'द्वितीय अंश', '3': 'तृतीय अंश', '4': 'चतुर्थ अंश', '5': 'पञ्चम अंश', '6': 'षष्ठ अंश' },
    chapterNamesMr: { '1': 'प्रथम अंश', '2': 'द्वितीय अंश', '3': 'तृतीय अंश', '4': 'चतुर्थ अंश', '5': 'पञ्चम अंश', '6': 'षष्ठ अंश' },
  },
  {
    slug: 'rigveda',
    dataPrefix: 'rigveda',
    name: 'Rigveda Samhita',
    nameHi: 'ऋग्वेद संहिता',
    nameMr: 'ऋग्वेद संहिता',
    nameDevanagari: 'ऋग्वेदः',
    totalChapters: 10,
    description: 'The oldest of the Vedas, containing hymns to various deities, reflecting the earliest spiritual insights of humanity.',
    category: 'veda',
    available: false,
    chapterNames: { '1': 'Mandala 1', '2': 'Mandala 2', '3': 'Mandala 3', '4': 'Mandala 4', '5': 'Mandala 5', '6': 'Mandala 6', '7': 'Mandala 7', '8': 'Mandala 8', '9': 'Mandala 9', '10': 'Mandala 10' },
    chapterNamesHi: { '1': 'प्रथम मण्डल', '2': 'द्वितीय मण्डल', '3': 'तृतीय मण्डल', '4': 'चतुर्थ मण्डल', '5': 'पञ्चम मण्डल', '6': 'षष्ठ मण्डल', '7': 'सप्तम मण्डल', '8': 'अष्टम मण्डल', '9': 'नवम मण्डल', '10': 'दशम मण्डल' },
    chapterNamesMr: { '1': 'प्रथम मण्डल', '2': 'द्वितीय मण्डल', '3': 'तृतीय मण्डल', '4': 'चतुर्थ मण्डल', '5': 'पञ्चम मण्डल', '6': 'षष्ठ मण्डल', '7': 'सप्तम मण्डल', '8': 'अष्टम मण्डल', '9': 'नवम मण्डल', '10': 'दशम मण्डल' },
  },
  {
    slug: 'brahma-sutras',
    dataPrefix: 'brahma_sutras',
    lakeFile: 'itihasa-lake.db',
    name: 'Brahma Sutras',
    nameHi: 'ब्रह्म सूत्र',
    nameMr: 'ब्रह्म सूत्र',
    nameDevanagari: 'ब्रह्मसूत्राणि',
    totalChapters: 4,
    description: 'The foundation of Vedanta philosophy, systematizing the teachings of the Upanishads into 555 sutras.',
    category: 'other',
    available: false,
    storage: 'lake',
    chapterNames: { '1': 'Samanvaya', '2': 'Avirodha', '3': 'Sadhana', '4': 'Phala' },
    chapterNamesHi: { '1': 'समन्वय', '2': 'अविरोध', '3': 'साधना', '4': 'फल' },
    chapterNamesMr: { '1': 'समन्वय', '2': 'अविरोध', '3': 'साधना', '4': 'फल' },
  },
  {
    slug: '16-samskaras',
    dataPrefix: 'samskaras',
    lakeFile: 'ritual-node.db',
    name: '16 Samskaras (Ritual Handbook)',
    nameHi: '१६ संस्कार (संस्कार विधि)',
    nameMr: '१६ संस्कार (संस्कार विधी)',
    nameDevanagari: 'षोडश संस्काराः',
    totalChapters: 1,
    description: 'Practical guide to the 16 life-cycle rites from conception to last rites, including Mantras and procedures.',
    category: 'other',
    available: false,
    storage: 'lake',
    chapterNames: { '1': 'Complete Ritual List' },
    chapterNamesHi: { '1': 'संपूर्ण संस्कार सूची' },
    chapterNamesMr: { '1': 'संपूर्ण संस्कार सूची' },
  },
  {
    slug: 'bhagavata-purana',
    dataPrefix: 'bhagavata_purana',
    lakeFile: 'purana-lake.db',
    name: 'Srimad Bhagavatam',
    nameHi: 'श्रीमद भागवत पुराण',
    nameMr: 'श्रीमद भागवत पुराण',
    nameDevanagari: 'श्रीमद्भागवतपुराणम्',
    totalChapters: 12,
    description: 'A poetic masterpiece focusing on Bhakti (devotion) towards Krishna, covering cosmos, evolution, and divine play.',
    category: 'purana',
    available: false,
    storage: 'lake',
    chapterNames: { '1': 'Canto 1', '2': 'Canto 2', '3': 'Canto 3', '4': 'Canto 4', '5': 'Canto 5' },
    chapterNamesHi: { '1': 'प्रथम स्कन्ध', '2': 'द्वितीय स्कन्ध', '3': 'तृतीय स्कन्ध', '4': 'चतुर्थ स्कन्ध', '5': 'पञ्चम स्कन्ध' },
    chapterNamesMr: { '1': 'प्रथम स्कन्ध', '2': 'द्वितीय स्कन्ध', '3': 'तृतीय स्कन्ध', '4': 'चतुर्थ स्कन्ध', '5': 'पञ्चम स्कन्ध' },
  },
  {
    slug: 'garuda-purana',
    dataPrefix: 'garuda_purana',
    lakeFile: 'purana-lake.db',
    name: 'Garuda Purana',
    nameHi: 'गरुड़ पुराण',
    nameMr: 'गरुड पुराण',
    nameDevanagari: 'गरुड़पुराणम्',
    totalChapters: 2,
    description: 'Dialogues between Vishnu and Garuda on life after death, cosmology, and the path to liberation.',
    category: 'purana',
    available: false,
    storage: 'lake',
    chapterNames: { '1': 'Achara Khanda', '2': 'Preta Khanda' },
    chapterNamesHi: { '1': 'आचार काण्ड', '2': 'प्रेत काण्ड' },
    chapterNamesMr: { '1': 'आचार काण्ड', '2': 'प्रेत काण्ड' },
  },
]


/** Get a text by its URL slug */
export function getTextBySlug(slug: string): VedicText | undefined {
  return VEDIC_LIBRARY.find(t => t.slug === slug)
}

/** Get all currently available texts */
export function getAvailableTexts(): VedicText[] {
  return VEDIC_LIBRARY.filter(t => t.available)
}

/** Build all static paths for Next.js generateStaticParams */
export function getAllTextChapterPaths(): Array<{ text: string; chapter: string }> {
  return VEDIC_LIBRARY
    .filter(t => t.available)
    .flatMap(t =>
      Array.from({ length: t.totalChapters }, (_, i) => ({
        text: t.slug,
        chapter: String(i + 1),
      }))
    )
}
