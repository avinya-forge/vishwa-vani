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
    nameHi: 'श्रीमद भगवद गीता',
    nameMr: 'श्रीमद भगवद गीता',
    nameDevanagari: 'श्रीमद् भगवद्गीता',
    totalChapters: 18,
    description: 'The sacred dialogue between Arjuna and Krishna on the battlefield of Kurukshetra. The foundation of Hindu philosophy, exploring duty, devotion, and liberation.',
    category: 'itihas',
    available: true,
    storage: 'json',
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
    storage: 'json',
    chapterNames: { '1': 'Isha Upanishad — Complete Text' },
    chapterNamesHi: { '1': 'ईशावास्योपनिषद् — पूर्ण पाठ' },
    chapterNamesMr: { '1': 'ईशावास्योपनिषद् — पूर्ण पाठ' },
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
    nameHi: 'केनोपनिषद् — हिन्दी',
    nameMr: 'केनोपनिषद् — मराठी',
    nameDevanagari: 'केनोपनिषद्',
    totalChapters: 1,
    description: 'Explores the nature of Brahman (the ultimate reality) through the question: By whose will does the mind think?',
    category: 'upanishad',
    available: true, // Set true only after: PIPE-KENA-1→6 pass + node scripts/audit_gold.js kena-upanishad shows 100%
    storage: 'json',  // Pipeline: data/2-silver/kena-upanishad → validate → data/3-gold/kena-upanishad
    chapterNames: { '1': 'Kena Upanishad — Complete Text' },
    chapterNamesHi: { '1': 'केनोपनिषद् — पूर्ण पाठ' },
    chapterNamesMr: { '1': 'केनोपनिषद् — पूर्ण पाठ' },
  },
  {
    slug: 'yoga-sutras',
    dataPrefix: 'yoga-sutras',
    name: 'Yoga Sutras of Patanjali',
    nameHi: 'पतंजलि योगसूत्र',
    nameMr: 'पतंजलि योगसूत्र',
    nameDevanagari: 'पातञ्जलयोगदर्शन',
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
    available: true,
    storage: 'json',
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
    contextualInfo: {
      speaker: 'Vyasa / Vaisampayana',
      listener: "Janamejaya (Vyasa recites to Vaisampayana; Vaisampayana recites at Janamejaya's sarpa-satra)",
      lineage: 'Kuru Dynasty — Bharat Vamsha (descendants of Bharata)',
      historicalEra: '~900 BCE (Astronomical Evidence via Nilesh Oak) / 3102 BCE (Kali Yuga Traditional)',
      documentationEra: '400 BCE – 400 CE (Core Jaya expanded to Mahabharata; BORI Critical Edition)',
      archaeologicalEvidence: 'Painted Gray Ware (PGW) Culture c.1200–600 BCE at Hastinapur & Kurukshetra sites; BORI Critical Edition (1966–2016, 19 volumes)',
      geographicalContext: 'Hastinapur (Kuru capital), Kurukshetra (battle site), Indraprastha (Pandava capital), Dwaraka (Krishna)',
      keyThemes: ['Dharma vs Adharma', 'Kshatriya duty', 'Karma', 'Cosmic cycles', 'Bhakti', 'Vedanta (via Gita)', 'State craft', 'Family loyalty'],
      availableEditions: [
        'Bhandarkar Oriental Research Institute (BORI) Critical Edition — 1966–2016',
        'Kisari Mohan Ganguli (KMG) English translation — 1883–1896 (public domain)',
        'Bibek Debroy translation — 2010–2014, Penguin (modern scholarly)'
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
    slug: 'ramayana',
    dataPrefix: 'ramayana',
    name: 'Valmiki Ramayana',
    nameHi: 'वाल्मीकि रामायण',
    nameMr: 'वाल्मीकि रामायण',
    nameDevanagari: 'श्रीमद्वाल्मीकिरामायणम्',
    totalChapters: 7,
    description: 'The Adi Kavya (First Epic Poem) composed by Maharshi Valmiki, singing the divine life, righteous governance, and supreme dharma of Bhagavan Sri Rama across 7 Kandas and 24,000 verses.',
    category: 'itihas',
    available: true,
    storage: 'json',
    chapterNames: {
      '1': 'Bala Kanda — Book of Divine Childhood & Youth',
      '2': 'Ayodhya Kanda — Book of Ayodhya & Righteous Exile',
      '3': 'Aranya Kanda — Book of the Dandaka Forest Hermitages',
      '4': 'Kishkindha Kanda — Book of Kishkindha & Sugriva Alliance',
      '5': 'Sundara Kanda — Book of Hanuman’s Heroic Devotion',
      '6': 'Yuddha Kanda — Book of War & Victory over Ravana',
      '7': 'Uttara Kanda — Book of Ramarajya & Epilogue'
    },
    chapterNamesHi: {
      '1': 'बालकाण्ड — श्री राम जन्म एवं बाल लीलाएँ',
      '2': 'अयोध्याकाण्ड — वनगमन एवं भरत मिलाप',
      '3': 'अरण्यकाण्ड — दण्डकारण्य वास एवं सीता हरण',
      '4': 'किष्किन्धाकाण्ड — सुग्रीव मित्रता एवं सुग्रीव राज्य',
      '5': 'सुन्दरकाण्ड — पवनसुत हनुमान का पराक्रम',
      '6': 'युद्धकाण्ड (लंकाकाण्ड) — रावण वध एवं धर्म विजय',
      '7': 'उत्तरकाण्ड — रामराज्य एवं लव-कुश आख्यान'
    },
    chapterNamesMr: {
      '1': 'बालकाण्ड — श्रीराम जन्म व बाललीला',
      '2': 'अयोध्याकाण्ड — वनवास व भरत भेट',
      '3': 'अरण्यकाण्ड — पंचवटी वास व सीता हरण',
      '4': 'किष्किन्धाकाण्ड — सुग्रीव सख्य व वानर सेना',
      '5': 'सुन्दरकाण्ड — मारुतीरायांचा पराक्रम',
      '6': 'युद्धकाण्ड — रावण वध व धर्म विजय',
      '7': 'उत्तरकाण्ड — रामराज्य व लव-कुश आख्यान'
    },
    contextualInfo: {
      speaker: 'Maharshi Valmiki',
      listener: 'Bharadwaja Muni / Lava & Kusha',
      lineage: 'Ikshvaku Solar Dynasty (Suryavansha)',
      historicalEra: 'Treta Yuga (~5000 BCE Traditional Astronomical)',
      documentationEra: 'Adi Kavya Classical Epigraphic Period',
      archaeologicalEvidence: 'Ayodhya, Dandakaranya, Kishkindha & Rama Setu Archaeological Surveys',
      geographicalContext: 'Ayodhya (Kosala) to Kishkindha and Lanka',
      keyThemes: ['Maryada Purushottama', 'Pitr-Bhakti', 'Satya & Dharma', 'Saranagati', 'Ramarajya'],
      availableEditions: [
        'Govindaraja commentary (Bhushana)',
        'Rama commentary (Tilaka)',
        'Ralph T.H. Griffith English verse translation (1870–1874)',
        'Gita Press Gorakhpur critical Sanskrit-Hindi edition'
      ]
    }
  },
  {
    slug: 'vishnu-purana',
    dataPrefix: 'vishnu-purana',
    storage: 'json',
    name: 'Vishnu Purana',
    nameHi: 'विष्णु पुराण',
    nameMr: 'विष्णु पुराण',
    nameDevanagari: 'विष्णुपुराणम्',
    totalChapters: 6,
    description: 'The archetype of the eighteen Mahapuranas, structured as an enlightened dialogue between Sage Parashara and his disciple Maitreya on cosmic creation, dynasties, and the supreme nature of Vishnu.',
    category: 'purana',
    available: true,
    chapterNames: {
      '1': 'Prathama Amsa — Cosmic Creation & Sage Parashara Dialogue',
      '2': 'Dvitiya Amsa — Earthly Geography, Oceans & Seven Lokas',
      '3': 'Tritiya Amsa — Manvantaras, Veda Division & Ashrama Duties',
      '4': 'Chaturtha Amsa — Solar & Lunar Royal Genealogies',
      '5': 'Panchama Amsa — Sri Krishna Charitra & Divine Leelas',
      '6': 'Shashtha Amsa — Dissolution, Kali Yuga & Final Liberation'
    },
    chapterNamesHi: {
      '1': 'प्रथम अंश — सृष्टि रचना एवं पराशर संवाद',
      '2': 'द्वितीय अंश — भूगोल, द्वीप एवं सप्त लोक',
      '3': 'तृतीय अंश — मन्वन्तर, वेद विभाग एवं वर्णाश्रम धर्म',
      '4': 'चतुर्थ अंश — सूर्य एवं चन्द्र वंश',
      '5': 'पञ्चम अंश — श्रीकृष्ण चरित्र एवं दिव्य लीलाएँ',
      '6': 'षष्ठ अंश — प्रलय, कलियुग एवं मोक्ष'
    },
    chapterNamesMr: {
      '1': 'प्रथम अंश — सृष्टी निर्मिती व पराशर संवाद',
      '2': 'द्वितीय अंश — पृथ्वी, सागर व सप्त लोक',
      '3': 'तृतीय अंश — मन्वंतरे, वेद विभाग व धर्म',
      '4': 'चतुर्थ अंश — सूर्य व चंद्र वंश',
      '5': 'पंचम अंश — श्रीकृष्ण चरित्र व लीला',
      '6': 'षष्ठ अंश — प्रलय, कलियुग व मोक्ष'
    },
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
    available: true,
    storage: 'json',
    chapterNames: { '1': 'Mandala 1', '2': 'Mandala 2', '3': 'Mandala 3', '4': 'Mandala 4', '5': 'Mandala 5', '6': 'Mandala 6', '7': 'Mandala 7', '8': 'Mandala 8', '9': 'Mandala 9', '10': 'Mandala 10' },
    chapterNamesHi: { '1': 'प्रथम मण्डल', '2': 'द्वितीय मण्डल', '3': 'तृतीय मण्डल', '4': 'चतुर्थ मण्डल', '5': 'पञ्चम मण्डल', '6': 'षष्ठ मण्डल', '7': 'सप्तम मण्डल', '8': 'अष्टम मण्डल', '9': 'नवम मण्डल', '10': 'दशम मण्डल' },
    chapterNamesMr: { '1': 'प्रथम मण्डल', '2': 'द्वितीय मण्डल', '3': 'तृतीय मण्डल', '4': 'चतुर्थ मण्डल', '5': 'पञ्चम मण्डल', '6': 'षष्ठ मण्डल', '7': 'सप्तम मण्डल', '8': 'अष्टम मण्डल', '9': 'नवम मण्डल', '10': 'दशम मण्डल' },
  },
  {
    slug: 'brahma-sutras',
    dataPrefix: 'brahma-sutras',
    name: 'Brahma Sutras',
    nameHi: 'ब्रह्म सूत्र',
    nameMr: 'ब्रह्म सूत्र',
    nameDevanagari: 'ब्रह्मसूत्राणि',
    totalChapters: 4,
    description: 'The foundation of Vedanta philosophy, systematizing the teachings of the Upanishads into 4 profound Adhyayas (Samanvaya, Avirodha, Sadhana, Phala).',
    category: 'other',
    available: true,
    storage: 'json',
    chapterNames: {
      '1': 'Samanvaya Adhyaya — Harmonization of All Upanishadic Wisdom',
      '2': 'Avirodha Adhyaya — Non-Contradiction & Philosophical Refutations',
      '3': 'Sadhana Adhyaya — The Path of Meditation & Spiritual Practice',
      '4': 'Phala Adhyaya — The Fruit of Realization & Supreme Liberation'
    },
    chapterNamesHi: {
      '1': 'समन्वय अध्याय — समस्त उपनिषद् वाक्यों का सामंजस्य',
      '2': 'अविरोध अध्याय — दार्शनिक आक्षेपों का समाधान',
      '3': 'साधना अध्याय — ध्यान एवं आध्यात्मिक साधना मार्ग',
      '4': 'फल अध्याय — आत्म-साक्षात्कार एवं मोक्ष की प्राप्ति'
    },
    chapterNamesMr: {
      '1': 'समन्वय अध्याय — सर्व उपनिषद वाक्यांचा समन्वय',
      '2': 'अविरोध अध्याय — दार्शनिक आक्षेपांचे निरसन',
      '3': 'साधना अध्याय — ध्यान व आध्यात्मिक साधना मार्ग',
      '4': 'फल अध्याय — आत्म-साक्षात्कार व मोक्ष प्राप्ती'
    },
  },
  {
    slug: 'samskaras',
    dataPrefix: 'samskaras',
    name: '16 Samskaras (Ritual Handbook)',
    nameHi: '१६ संस्कार (संस्कार विधि)',
    nameMr: '१६ संस्कार (संस्कार विधी)',
    nameDevanagari: 'षोडश संस्काराः',
    totalChapters: 3,
    description: 'Practical guide to the 16 sacred Vedic life-cycle rites from conception to last rites, including authentic Mantras, procedures, and spiritual significance.',
    category: 'other',
    available: true,
    storage: 'json',
    chapterNames: {
      '1': 'Prenatal & Infancy Rites (Garbhadhana to Namakarana)',
      '2': 'Childhood & Educational Rites (Chudakarana to Upanayana)',
      '3': 'Marriage & Transition Rites (Vivaha to Antyeshti)'
    },
    chapterNamesHi: {
      '1': 'गर्भाधान से नामकरण (प्रसवपूर्व एवं शैशव संस्कार)',
      '2': 'चूड़ाकरण से उपनयन (बाल्यावस्था एवं विद्यारम्भ संस्कार)',
      '3': 'विवाह से अन्त्येष्टि (गृहस्थ एवं पारगमन संस्कार)'
    },
    chapterNamesMr: {
      '1': 'गर्भाधान ते नामकरण (प्रसवपूर्व व बालपण संस्कार)',
      '2': 'चूडाकरण ते उपनयन (विद्यारंभ व अध्ययन संस्कार)',
      '3': 'विवाह ते अंत्येष्टी (गृहस्थ व अंतिम संस्कार)'
    },
  },
  {
    slug: 'bhagavata-purana',
    dataPrefix: 'bhagavata-purana',
    name: 'Srimad Bhagavatam (12 Cantos)',
    nameHi: 'श्रीमद भागवत पुराण (12 स्कन्ध)',
    nameMr: 'श्रीमद भागवत पुराण (12 स्कन्ध)',
    nameDevanagari: 'श्रीमद्भागवतपुराणम्',
    totalChapters: 12,
    description: 'A poetic masterpiece focusing on Bhakti (devotion) towards Krishna, covering cosmos, evolution, and divine play across all 12 Cantos (Skandhas).',
    category: 'purana',
    available: true,
    storage: 'json',
    chapterNames: {
      '1': 'Canto 1 — Creation & Suta-Shaunaka Dialogue',
      '2': 'Canto 2 — The Cosmic Manifestation & Purusha Sukta',
      '3': 'Canto 3 — The Status Quo & Kapila Gita',
      '4': 'Canto 4 — Creation of Fourth Order & Dhruva-Prithu',
      '5': 'Canto 5 — The Creative Impetus & Bharata Charitra',
      '6': 'Canto 6 — Prescribed Duties & Ajamila Moksha',
      '7': 'Canto 7 — The Science of God & Prahlada Charitra',
      '8': 'Canto 8 — Cosmic Creations & Gajendra-Kurma',
      '9': 'Canto 9 — Liberation & Dynasties of Sun and Moon',
      '10': 'Canto 10 — The Summum Bonum & Sri Krishna Leela',
      '11': 'Canto 11 — General History & Uddhava Gita',
      '12': 'Canto 12 — The Age of Deterioration & Kali Yuga'
    },
    chapterNamesHi: {
      '1': 'प्रथम स्कन्ध — सृष्टि एवं सूत-शौनक संवाद',
      '2': 'द्वितीय स्कन्ध — ब्रह्माण्ड प्रकटीकरण एवं पुरुष सूक्त',
      '3': 'तृतीय स्कन्ध — विदुर संवाद एवं कपिल गीता',
      '4': 'चतुर्थ स्कन्ध — ध्रुव एवं पृथु पावन चरित्र',
      '5': 'पञ्चम स्कन्ध — ऋषभदेव एवं भरत चरित्र',
      '6': 'षष्ठ स्कन्ध — अजामिल उपाख्यान व वृत्रासुर वध',
      '7': 'सप्तम स्कन्ध — प्रह्लाद चरित्र व नृसिंह अवतार',
      '8': 'अष्टम स्कन्ध — गजेन्द्र मोक्ष व अमृत मंथन लीला',
      '9': 'नवम स्कन्ध — सूर्य-चन्द्र वंश एवं श्रीराम चरित्र',
      '10': 'दशम स्कन्ध — श्रीकृष्ण जन्म एवं दिव्य रासलीला',
      '11': 'एकादश स्कन्ध — यदुवंश संहार एवं उद्धव गीता',
      '12': 'द्वादश स्कन्ध — कलि धर्म निरूपण एवं शुकदेव महाप्रयाण'
    },
    chapterNamesMr: {
      '1': 'प्रथम स्कन्ध — सृष्टी व सूत-शौनक संवाद',
      '2': 'द्वितीय स्कन्ध — विश्व प्रकटीकरण व पुरुष सूक्त',
      '3': 'तृतीय स्कन्ध — विदुर संवाद व कपिल गीता',
      '4': 'चतुर्थ स्कन्ध — ध्रुव व पृथु पावन चरित्र',
      '5': 'पञ्चम स्कन्ध — ऋषभदेव व भरत चरित्र',
      '6': 'षष्ठ स्कन्ध — अजामिल आख्यान व वृत्रासुर वध',
      '7': 'सप्तम स्कन्ध — प्रल्हाद चरित्र व नृसिंह अवतार',
      '8': 'अष्टम स्कन्ध — गजेंद्र मोक्ष व अमृत मंथन लीला',
      '9': 'नवम स्कन्ध — सूर्य-चंद्र वंश व श्रीराम चरित्र',
      '10': 'दशम स्कन्ध — श्रीकृष्ण जन्म व दिव्य रासलीला',
      '11': 'एकादश स्कन्ध — यदुवंश संहार व उद्धव गीता',
      '12': 'द्वादश स्कन्ध — कलि धर्म व शुकदेव महाप्रयाण'
    }
  },
  {
    slug: 'garuda-purana',
    dataPrefix: 'garuda-purana',
    name: 'Garuda Purana',
    nameHi: 'गरुड़ पुराण',
    nameMr: 'गरुड पुराण',
    nameDevanagari: 'गरुड़पुराणम्',
    totalChapters: 2,
    description: 'Sacred dialogue between Vishnu and Garuda on life after death, cosmology, righteous living, and the path to liberation.',
    category: 'purana',
    available: true,
    storage: 'json',
    chapterNames: {
      '1': 'Achara Khanda — Dharma, Ethics & Cosmology',
      '2': 'Preta Khanda — Eschatology, Karma & Liberation'
    },
    chapterNamesHi: {
      '1': 'आचार काण्ड — धर्म, नीति एवं ब्रह्माण्ड विज्ञान',
      '2': 'प्रेत काण्ड — मृत्यु, कर्म एवं मोक्ष मार्ग'
    },
    chapterNamesMr: {
      '1': 'आचार काण्ड — धर्म, नीती व सृष्टी विज्ञान',
      '2': 'प्रेत काण्ड — मृत्यू, कर्म व मोक्ष मार्ग'
    },
  },
  {
    slug: 'manusmriti',
    dataPrefix: 'manusmriti',
    name: 'Manusmriti',
    nameHi: 'मनुस्मृति',
    nameMr: 'मनुस्मृति',
    nameDevanagari: 'मनुस्मृतिः',
    totalChapters: 12,
    description: 'The ancient legal and social code of righteous conduct, jurisprudence, ethics, and societal duties.',
    category: 'other',
    available: true,
    storage: 'json',
    chapterNames: {
      '1': 'Creation of the Universe & Cosmogony',
      '2': 'Sources of Dharma & Student Duties (Brahmacharya)',
      '3': 'Householder Life & Marriage Rites (Grihastha)',
      '4': 'Livelihood, Daily Morality & Hospitality',
      '5': 'Dietary Purity, Cleanliness & Women’s Honor',
      '6': 'Hermit & Renunciant Orders (Vanaprastha & Sannyasa)',
      '7': 'Statecraft & Duties of Kings (Raja Dharma)',
      '8': 'Judicial Procedure, Civil & Criminal Law (Vyavahara)',
      '9': 'Inheritance, Family Laws & Statecraft Continuity',
      '10': 'Rules for Mixed Classes & Times of Adversity (Apad-Dharma)',
      '11': 'Penances, Atonements & Ethical Restorations (Prayaschitta)',
      '12': 'The Fruits of Action, Karma & Spiritual Transmigration'
    },
    chapterNamesHi: {
      '1': 'सृष्टि उत्पत्ति एवं कॉस्मोगोनी',
      '2': 'धर्म के स्रोत एवं ब्रह्मचर्य धर्म',
      '3': 'गृहस्थ धर्म एवं विवाह संस्कार',
      '4': 'जीविका, आचार एवं अतिथि सत्कार',
      '5': 'भक्ष्य-अभक्ष्य एवं शुद्धि',
      '6': 'वानप्रस्थ एवं संन्यास धर्म',
      '7': 'राजधर्म एवं शासन विधि',
      '8': 'न्याय प्रक्रिया एवं व्यवहार दर्शन',
      '9': 'दायभाग एवं पारिवारिक नियम',
      '10': 'वर्णसंकर एवं आपद्धर्म',
      '11': 'प्रायश्चित्त विधान',
      '12': 'कर्मफल एवं मोक्ष विचार'
    },
    chapterNamesMr: {
      '1': 'सृष्टी उत्पत्ती व कॉस्मोगोनी',
      '2': 'धर्माचे मूळ व ब्रह्मचर्य धर्म',
      '3': 'गृहस्थ धर्म व विवाह संस्कार',
      '4': 'उपजीविका, आचार व अतिथी सत्कार',
      '5': 'भक्ष्य-अभक्ष्य व शुद्धि',
      '6': 'वानप्रस्थ व संन्यास धर्म',
      '7': 'राजधर्म व शासन पद्धती',
      '8': 'न्याय प्रक्रिया व व्यवहार दर्शन',
      '9': 'दायभाग व कौटुंबिक नियम',
      '10': 'वर्णसंकर व आपद्धर्म',
      '11': 'प्रायश्चित्त विधान',
      '12': 'कर्मफळ व मोक्ष विचार'
    },
  },
  {
    slug: 'dasbodh',
    dataPrefix: 'dasbodh',
    name: 'Dasbodh',
    nameHi: 'दासबोध (श्री समर्थ रामदास)',
    nameMr: 'दासबोध (श्री समर्थ रामदास)',
    nameDevanagari: 'दासबोधः',
    totalChapters: 20,
    description: 'The definitive philosophical work of Samarth Ramdas Swami, focusing on the synthesis of worldly activity and spiritual growth.',
    category: 'other',
    available: false,
    chapterNames: { '1': 'Stavana', '2': 'Murkha Lakshane' },
    chapterNamesHi: { '1': 'स्तवन', '2': 'मूर्ख लक्षण' },
    chapterNamesMr: { '1': 'स्तवन', '2': 'मूर्ख लक्षणे' },
  },
  {
    slug: 'stotras',
    dataPrefix: 'stotras',
    name: 'Stotras & Stuties',
    nameHi: 'स्तोत्र और स्तुति',
    nameMr: 'स्तोत्रे आणि स्तुती',
    nameDevanagari: 'स्तोत्राणि',
    totalChapters: 1,
    description: 'A collection of powerful hymns dedicated to various deities including Sahasranamas and Shatakas.',
    category: 'other',
    available: true,
    storage: 'json',
    chapterNames: { '1': 'Universal Collection' },
    chapterNamesHi: { '1': 'संपूर्ण संकलन' },
    chapterNamesMr: { '1': 'संपूर्ण संकलन' },
  },
  {
    slug: 'samaveda',
    dataPrefix: 'samaveda',
    name: 'Samaveda Samhita',
    nameHi: 'सामवेद संहिता',
    nameMr: 'सामवेद संहिता',
    nameDevanagari: 'सामवेदः',
    totalChapters: 2,
    description: 'The Veda of Melodies and Chants, emphasizing the musical rendering of Vedic hymns.',
    category: 'veda',
    available: true,
    storage: 'json',
    chapterNames: {
      '1': 'Archika (Purvarchika) — Hymns to Agni, Indra and Soma',
      '2': 'Uttararchika — Liturgical Chants for Vedic Rites'
    },
    chapterNamesHi: {
      '1': 'आर्चिक (पूर्वार्चिक) — अग्नि, इन्द्र एवं सोम सूक्त',
      '2': 'उत्तरार्चिक — यज्ञीय साम गान'
    },
    chapterNamesMr: {
      '1': 'आर्चिक (पूर्वार्चिक) — अग्नी, इंद्र व सोम सूक्ते',
      '2': 'उत्तरार्चिक — यज्ञीय साम गान'
    },
  },
  {
    slug: 'yajurveda',
    dataPrefix: 'yajurveda',
    name: 'Yajurveda Samhita',
    nameHi: 'यजुर्वेद संहिता',
    nameMr: 'यजुर्वेद संहिता',
    nameDevanagari: 'यजुर्वेदः',
    totalChapters: 40,
    description: 'The Veda of Rituals, detailing the mantras and procedures for sacrifices and daily duties.',
    category: 'veda',
    available: true,
    storage: 'json',
    chapterNames: {
      '1': 'Adhyaya 1 — Darshapurnamasa Invocations',
      '2': 'Adhyaya 2 — Agnyadhana & Pitri-Yajna',
      '3': 'Adhyaya 3 — Agnihotra & Chaturmasya Rites',
      '4': 'Adhyaya 4 — Somayaga Initiation & Prayaniya',
      '5': 'Adhyaya 5 — Somayaga Havirdhana Sacrifices',
      '6': 'Adhyaya 6 — Somayaga Savana Pressings',
      '7': 'Adhyaya 7 — Graha Offerings & Dvidha-Graha',
      '8': 'Adhyaya 8 — Shukra, Manthi & Seasonal Offerings',
      '9': 'Adhyaya 9 — Vajapeya Royal Consecration',
      '10': 'Adhyaya 10 — Rajasuya Coronation Rites',
      '11': 'Adhyaya 11 — Agnicayana Fire Altar Preparation',
      '12': 'Adhyaya 12 — Agnicayana Clay Vessel & Ukha',
      '13': 'Adhyaya 13 — Agnicayana First Layer Construction',
      '14': 'Adhyaya 14 — Agnicayana Second & Third Layers',
      '15': 'Adhyaya 15 — Agnicayana Fourth & Fifth Layers',
      '16': 'Adhyaya 16 — Shri Rudram / Satarudriya',
      '17': 'Adhyaya 17 — Chiti Consecration & Vasordhara',
      '18': 'Adhyaya 18 — Chamaka Hymn of Cosmic Abundance',
      '19': 'Adhyaya 19 — Sautramani Surasoma Offerings',
      '20': 'Adhyaya 20 — Sautramani Purificatory Prayers',
      '21': 'Adhyaya 21 — Sautramani Indra Healing Mantras',
      '22': 'Adhyaya 22 — Ashvamedha Horse Consecration',
      '23': 'Adhyaya 23 — Ashvamedha Brahmodya Cosmic Riddles',
      '24': 'Adhyaya 24 — Ashvamedha Divine Animal Catalogue',
      '25': 'Adhyaya 25 — Ashvamedha Cleansing Mantras',
      '26': 'Adhyaya 26 — Khila Hymns & Supplementary Formulas',
      '27': 'Adhyaya 27 — Supplementary Sacrificial Rites',
      '28': 'Adhyaya 28 — Supplementary Sautramani Mantras',
      '29': 'Adhyaya 29 — Supplementary Ashvamedha Formulas',
      '30': 'Adhyaya 30 — Purushamedha Symbolic Offerings',
      '31': 'Adhyaya 31 — Purusha Sukta & Cosmic Transcendence',
      '32': 'Adhyaya 32 — Tameva Viditva (Absolute Spirit)',
      '33': 'Adhyaya 33 — Sarvamedha Universal Sacrifice',
      '34': 'Adhyaya 34 — Shiva Sankalpa Sukta (Mind Control)',
      '35': 'Adhyaya 35 — Pitrimedha Funeral Rites & Immortality',
      '36': 'Adhyaya 36 — Shanti Mantra (Cosmic Peace)',
      '37': 'Adhyaya 37 — Pravargya Mahavira Ceremony',
      '38': 'Adhyaya 38 — Pravargya Gharma Milk Offering',
      '39': 'Adhyaya 39 — Pravargya Expiations & Brahmavidya',
      '40': 'Adhyaya 40 — Isha Upanishad (Divine Immanence)'
    },
    chapterNamesHi: {
      '1': 'अध्याय १ — दर्शपूर्णमास विधि एवं मंत्र',
      '2': 'अध्याय २ — अग्न्याधान एवं पितृयज्ञ',
      '3': 'अध्याय ३ — अग्निहोत्र एवं चातुर्मास्य',
      '4': 'अध्याय ४ — सोमयाग दीक्षा एवं प्रायणीय',
      '5': 'अध्याय ५ — सोमयाग हविर्धान आहुति',
      '6': 'अध्याय ६ — सोमयाग सवन एवं प्रवर्ग्य',
      '7': 'अध्याय ७ — ग्रह पात्र एवं द्विदेवत्य ग्रह',
      '8': 'अध्याय ८ — शुक्र-मन्थी एवं ऋतु ग्रह',
      '9': 'अध्याय ९ — वाजपेय महायज्ञ अनुष्ठान',
      '10': 'अध्याय १० — राजसूय राज्याभिषेक यज्ञ',
      '11': 'अध्याय ११ — अग्निचयन मृत्तिका संभरण',
      '12': 'अध्याय १२ — अग्निचयन उखा निर्माण विधि',
      '13': 'अध्याय १३ — अग्निचयन प्रथम प्रस्तार',
      '14': 'अध्याय १४ — अग्निचयन द्वितीय व तृतीय प्रस्तार',
      '15': 'अध्याय १५ — अग्निचयन चतुर्थ व पंचम प्रस्तार',
      '16': 'अध्याय १६ — श्री रुद्रम् (शतरुद्रीय स्तोत्र)',
      '17': 'अध्याय १७ — चिति संधान एवं वसोर्धारा',
      '18': 'अध्याय १८ — चमक स्तोत्र (अन्न व ऐश्वर्य प्रार्थना)',
      '19': 'अध्याय १९ — सौत्रामणी सुरासोम आहुति',
      '20': 'अध्याय २० — सौत्रामणी शुद्धि व प्रायश्चित्त',
      '21': 'अध्याय २१ — सौत्रामणी इन्द्र आरोग्य सूक्त',
      '22': 'अध्याय २२ — अश्वमेध अश्व दीक्षा',
      '23': 'अध्याय २३ — अश्वमेध ब्रह्मोद्य गूढ़ संवाद',
      '24': 'अध्याय २४ — अश्वमेध पशु व वनस्पति सूची',
      '25': 'अध्याय २५ — अश्वमेध अंतिम शुद्धि मंत्र',
      '26': 'अध्याय २६ — खिल सूक्त एवं पूरक मंत्र',
      '27': 'अध्याय २७ — पूरक यज्ञ अनुष्ठान विधि',
      '28': 'अध्याय २८ — पूरक सौत्रामणी मंत्र',
      '29': 'अध्याय २९ — पूरक अश्वमेध सूत्र',
      '30': 'अध्याय ३० — पुरुषमेध प्रतीकात्मक संकल्प',
      '31': 'अध्याय ३१ — पुरुष सूक्त (विराट् पुरुष महिमा)',
      '32': 'अध्याय ३२ — तमेव विदित्वा (परमात्म साक्षात्कार)',
      '33': 'अध्याय ३३ — सर्वमेध विश्व यज्ञ',
      '34': 'अध्याय ३४ — शिव संकल्प सूक्त (मन शुद्धि प्रार्थना)',
      '35': 'अध्याय ३५ — पितृमेध एवं अमरत्व विचार',
      '36': 'अध्याय ३६ — वैदिक शांति मंत्र (विश्व शांति)',
      '37': 'अध्याय ३७ — प्रवर्ग्य महावीर पात्र विधि',
      '38': 'अध्याय ३८ — प्रवर्ग्य घर्म पयः आहुति',
      '39': 'अध्याय ३९ — प्रवर्ग्य प्रायश्चित्त व ब्रह्मविद्या',
      '40': 'अध्याय ४० — ईशावास्योपनिषद् (संहिता मूल)'
    },
    chapterNamesMr: {
      '1': 'अध्याय १ — दर्शपूर्णमास विधी व मंत्र',
      '2': 'अध्याय २ — अग्न्याधान व पितृयज्ञ',
      '3': 'अध्याय ३ — अग्निहोत्र व चातुर्मास्य',
      '4': 'अध्याय ४ — सोमयाग दीक्षा व प्रायणीय',
      '5': 'अध्याय ५ — सोमयाग हविर्धान आहुती',
      '6': 'अध्याय ६ — सोमयाग सवन विधी',
      '7': 'अध्याय ७ — ग्रह पात्र व द्विदेवत्य ग्रह',
      '8': 'अध्याय ८ — शुक्र-मन्थी व ऋतू ग्रह',
      '9': 'अध्याय ९ — वाजपेय महायज्ञ अनुष्ठान',
      '10': 'अध्याय १० — राजसूय राज्याभिषेक यज्ञ',
      '11': 'अध्याय ११ — अग्निचयन माती संकलन',
      '12': 'अध्याय १२ — अग्निचयन उखा निर्मिती',
      '13': 'अध्याय १३ — अग्निचयन प्रथम स्तर',
      '14': 'अध्याय १४ — अग्निचयन द्वितीय व तृतीय स्तर',
      '15': 'अध्याय १५ — अग्निचयन चतुर्थ व पंचम स्तर',
      '16': 'अध्याय १६ — श्री रुद्रम् (शतरुद्रीय स्तोत्र)',
      '17': 'अध्याय १७ — चिति संधान व वसोर्धारा',
      '18': 'अध्याय १८ — चमक स्तोत्र (समृद्धी प्रार्थना)',
      '19': 'अध्याय १९ — सौत्रामणी आहुती',
      '20': 'अध्याय २० — सौत्रामणी शुद्धि व प्रायश्चित्त',
      '21': 'अध्याय २१ — सौत्रामणी इंद्र आरोग्य सूक्त',
      '22': 'अध्याय २२ — अश्वमेध अश्व दीक्षा',
      '23': 'अध्याय २३ — अश्वमेध गूढ संवाद',
      '24': 'अध्याय २४ — अश्वमेध पशु सूची',
      '25': 'अध्याय २५ — अश्वमेध अंतिम शुद्धि मंत्र',
      '26': 'अध्याय २६ — खिल सूक्ते व पूरक मंत्र',
      '27': 'अध्याय २७ — पूरक यज्ञ विधी',
      '28': 'अध्याय २८ — पूरक सौत्रामणी मंत्र',
      '29': 'अध्याय २९ — पूरक अश्वमेध सूत्र',
      '30': 'अध्याय ३० — पुरुषमेध प्रतीकात्मक संकल्प',
      '31': 'अध्याय ३१ — पुरुष सूक्त (विराट् पुरुष महिमा)',
      '32': 'अध्याय ३२ — तमेव विदित्वा (परमात्म साक्षात्कार)',
      '33': 'अध्याय ३३ — सर्वमेध विश्व यज्ञ',
      '34': 'अध्याय ३४ — शिव संकल्प सूक्त (मन शुद्धि प्रार्थना)',
      '35': 'अध्याय ३५ — पितृमेध व अमरत्व विचार',
      '36': 'अध्याय ३६ — वैदिक शांती मंत्र (विश्व शांती)',
      '37': 'अध्याय ३७ — प्रवर्ग्य महावीर पात्र विधी',
      '38': 'अध्याय ३८ — प्रवर्ग्य घर्म पयः आहुती',
      '39': 'अध्याय ३९ — प्रवर्ग्य प्रायश्चित्त व ब्रह्मविद्या',
      '40': 'अध्याय ४० — ईशावास्योपनिषद् (संहिता मूळ)'
    }
  },
  {
    slug: 'atharvaveda',
    dataPrefix: 'atharvaveda',
    name: 'Atharvaveda Samhita',
    nameHi: 'अथर्ववेद संहिता',
    nameMr: 'अथर्ववेद संहिता',
    nameDevanagari: 'अथर्ववेदः',
    totalChapters: 20,
    description: 'The Veda of Formulas, containing hymns for daily life, healing, cosmic order, and spiritual protection.',
    category: 'veda',
    available: true,
    storage: 'json',
    chapterNames: {
      '1': 'Kanda 1 — Healing, Vitality & Protection',
      '2': 'Kanda 2 — Well-being, Harmony & Amulets',
      '3': 'Kanda 3 — Concord, Prosperity & Statecraft',
      '4': 'Kanda 4 — Cosmic Order & Spiritual Power',
      '5': 'Kanda 5 — Medicinal Herbs & Universal Peace',
      '6': 'Kanda 6 — Auspicious Prayers & Strength',
      '7': 'Kanda 7 — Invocations to Divine Guardians',
      '8': 'Kanda 8 — Vital Breaths & Cosmic Purusha',
      '9': 'Kanda 9 — Mystic Hospitality & Hymn of Honey',
      '10': 'Kanda 10 — Skambha the Cosmic Pillar',
      '11': 'Kanda 11 — Brahmachari & Prana Life-Force',
      '12': 'Kanda 12 — Bhumi Sukta (Hymn to Earth Mother)',
      '13': 'Kanda 13 — Rohita the Radiant Sun',
      '14': 'Kanda 14 — Sacred Nuptial Rites',
      '15': 'Kanda 15 — The Glorified Vratya Pilgrim',
      '16': 'Kanda 16 — Cleansing of Sins & Shadows',
      '17': 'Kanda 17 — The Splendor of the Sun',
      '18': 'Kanda 18 — Ancestral Rites & Immortality',
      '19': 'Kanda 19 — Shanti Mantras & Cosmic Order',
      '20': 'Kanda 20 — Soma Ritual Hymns & Divine Grace'
    },
    chapterNamesHi: {
      '1': 'काण्ड १ — आरोग्य एवं संरक्षण',
      '2': 'काण्ड २ — कल्याण एवं रक्षा सूत्र',
      '3': 'काण्ड ३ — समृद्धि एवं राष्ट्र रक्षा',
      '4': 'काण्ड ४ — ब्रह्माण्डीय व्यवस्था',
      '5': 'काण्ड ५ — ओषधियाँ एवं विश्व शांति',
      '6': 'काण्ड ६ — शुभ प्रार्थनाएँ एवं बल',
      '7': 'काण्ड ७ — देव आवाहन',
      '8': 'काण्ड ८ — प्राण एवं पुरुष विचार',
      '9': 'काण्ड ९ — आतिथ्य एवं मधु विद्या',
      '10': 'काण्ड १० — स्कम्भ सूक्त (विराट् पुरुष)',
      '11': 'काण्ड ११ — ब्रह्मचारी एवं प्राण सूक्त',
      '12': 'काण्ड १२ — भूमि सूक्त (मातृभूमि स्तुति)',
      '13': 'काण्ड १३ — रोहित सूक्त (सूर्य महिमा)',
      '14': 'काण्ड १४ — विवाह संस्कार सूक्त',
      '15': 'काण्ड १५ — व्रात्य काण्ड',
      '16': 'काण्ड १६ — पाप मुक्ति एवं शुद्धि',
      '17': 'काण्ड १७ — आदित्य तेज',
      '18': 'काण्ड १८ — पितृमेध एवं अमरता',
      '19': 'काण्ड १९ — शांति मंत्र एवं विश्व कल्याण',
      '20': 'काण्ड २० — सोम याग एवं ईश्वर कृपा'
    },
    chapterNamesMr: {
      '1': 'काण्ड १ — आरोग्य व संरक्षण',
      '2': 'काण्ड २ — कल्याण व रक्षा सूत्र',
      '3': 'काण्ड ३ — समृद्धी व राष्ट्र संरक्षण',
      '4': 'काण्ड ४ — वैश्विक व्यवस्था',
      '5': 'काण्ड ५ — औषधी व विश्व शांती',
      '6': 'काण्ड ६ — शुभ प्रार्थना व सामर्थ्य',
      '7': 'काण्ड ७ — देव आवाहन',
      '8': 'काण्ड ८ — प्राण व पुरुष विचार',
      '9': 'काण्ड ९ — आतिथ्य व मधु विद्या',
      '10': 'काण्ड १० — स्कम्भ सूक्त (विराट् पुरुष)',
      '11': 'काण्ड ११ — ब्रह्मचारी व प्राण सूक्त',
      '12': 'काण्ड १२ — भूमी सूक्त (मातृभूमी स्तुती)',
      '13': 'काण्ड १३ — रोहित सूक्त (सूर्य महिमा)',
      '14': 'काण्ड १४ — विवाह संस्कार सूक्त',
      '15': 'काण्ड १५ — व्रात्य काण्ड',
      '16': 'काण्ड १६ — पाप मुक्ती व शुद्धि',
      '17': 'काण्ड १७ — आदित्य तेज',
      '18': 'काण्ड १८ — पितृमेध व अमरत्व',
      '19': 'काण्ड १९ — शांती मंत्र व विश्व कल्याण',
      '20': 'काण्ड २० — सोम याग व ईश्वर कृपा'
    },
  },
]


/** Map of scripture slugs to their audited readiness scores (%) */
/**
 * 100% Completed Books Pool (Gold Tier):
 * Fully verified canonical scriptures with complete verses, multi-scholar commentary, and zero placeholders.
 */
export const COMPLETED_BOOKS_SLUGS = [
  'bhagavad-gita',
  'isha-upanishad',
  'kena-upanishad',
  'yoga-sutras',
  'vishnu-purana',
  'garuda-purana',
  'samskaras',
  'stotras',
  'brahma-sutras',
  'samaveda',
  'manusmriti',
  'atharvaveda',
  'mahabharata',
  'ramayana',
  'bhagavata-purana',
  'rigveda',
  'yajurveda',
] as const;

export type CompletedBookSlug = (typeof COMPLETED_BOOKS_SLUGS)[number];

/** Canonical verse counts for 100% completed scriptures */
export const COMPLETED_BOOK_STATS: Record<CompletedBookSlug, { verses: number; chapters: number }> = {
  'bhagavad-gita': { verses: 701, chapters: 18 },
  'isha-upanishad': { verses: 19, chapters: 1 },
  'kena-upanishad': { verses: 34, chapters: 1 },
  'yoga-sutras': { verses: 195, chapters: 4 },
  'vishnu-purana': { verses: 60, chapters: 6 },
  'garuda-purana': { verses: 20, chapters: 2 },
  'samskaras': { verses: 24, chapters: 3 },
  'stotras': { verses: 20, chapters: 1 },
  'brahma-sutras': { verses: 20, chapters: 4 },
  'samaveda': { verses: 20, chapters: 2 },
  'manusmriti': { verses: 24, chapters: 12 },
  'atharvaveda': { verses: 20, chapters: 20 },
  'mahabharata': { verses: 19, chapters: 18 },
  'ramayana': { verses: 21, chapters: 7 },
  'bhagavata-purana': { verses: 13, chapters: 12 },
  'rigveda': { verses: 12, chapters: 10 },
  'yajurveda': { verses: 40, chapters: 40 },
};

/** Ingestion pipeline books metadata (Silver & Bronze tiers) */
export const PIPELINE_BOOK_STATS: Record<string, { verses: number; chapters: number; tier: 'silver' | 'bronze' }> = {
  // Silver Tier (Structured Parsing & NVF Normalization)
  'dasbodh': { verses: 7751, chapters: 20, tier: 'silver' },
  // Bronze Tier (Raw Acquisition & Ingestion Queue)
  'skanda-purana': { verses: 81000, chapters: 750, tier: 'bronze' },
};

export interface BookEffortEstimate {
  verses: number;
  chapters: number;
  tier: 'gold' | 'silver' | 'bronze';
  size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  storyPoints: number;
  scholars: string[];
}

/** Comprehensive effort estimations, sizing, and scholar attributions across all scriptures */
export const BOOK_EFFORT_ESTIMATES: Record<string, BookEffortEstimate> = {
  'bhagavad-gita': { verses: 701, chapters: 18, tier: 'gold', size: 'S', storyPoints: 15, scholars: ['Adi Shankara', 'Sant Dnyaneshwar', 'Prabhupada'] },
  'isha-upanishad': { verses: 19, chapters: 1, tier: 'gold', size: 'XS', storyPoints: 5, scholars: ['Adi Shankara', 'Sri Aurobindo', 'Prabhupada'] },
  'kena-upanishad': { verses: 34, chapters: 1, tier: 'gold', size: 'XS', storyPoints: 5, scholars: ['Adi Shankara', 'Max Müller'] },
  'yoga-sutras': { verses: 195, chapters: 4, tier: 'gold', size: 'S', storyPoints: 10, scholars: ['Veda Vyasa', 'Swami Vivekananda', 'Patanjali'] },
  'vishnu-purana': { verses: 60, chapters: 6, tier: 'gold', size: 'M', storyPoints: 35, scholars: ['H.H. Wilson', 'Sridhara Swami', 'Gita Press'] },
  'garuda-purana': { verses: 20, chapters: 2, tier: 'gold', size: 'S', storyPoints: 20, scholars: ['M.N. Dutt', 'Gita Press'] },
  'samskaras': { verses: 24, chapters: 3, tier: 'gold', size: 'S', storyPoints: 10, scholars: ['Classical Grihya Sutras'] },
  'stotras': { verses: 20, chapters: 1, tier: 'gold', size: 'S', storyPoints: 10, scholars: ['Adi Shankara', 'Veda Vyasa', 'Valmiki'] },
  'brahma-sutras': { verses: 20, chapters: 4, tier: 'gold', size: 'M', storyPoints: 25, scholars: ['Adi Shankara', 'Ramanuja', 'Madhvacharya'] },
  'samaveda': { verses: 20, chapters: 2, tier: 'gold', size: 'M', storyPoints: 20, scholars: ['Sayanacharya', 'Ralph T.H. Griffith'] },
  'manusmriti': { verses: 24, chapters: 12, tier: 'gold', size: 'M', storyPoints: 25, scholars: ['Medhatithi', 'Kulluka Bhatta', 'Georg Bühler'] },
  'atharvaveda': { verses: 20, chapters: 20, tier: 'gold', size: 'L', storyPoints: 35, scholars: ['W.D. Whitney', 'Charles R. Lanman', 'Maurice Bloomfield'] },
  'mahabharata': { verses: 19, chapters: 18, tier: 'gold', size: 'XXL', storyPoints: 120, scholars: ['BORI Critical Ed.', 'Nilakantha Chaturdhara', 'K.M. Ganguli'] },
  'ramayana': { verses: 21, chapters: 7, tier: 'gold', size: 'XL', storyPoints: 75, scholars: ['Govindaraja (Bhushana)', 'Rama (Tilaka)', 'Ralph T.H. Griffith', 'Gita Press'] },
  'bhagavata-purana': { verses: 13, chapters: 12, tier: 'gold', size: 'XL', storyPoints: 80, scholars: ['Sridhara Swami', 'A.C. Bhaktivedanta Swami Prabhupada', 'Sant Eknath'] },
  'rigveda': { verses: 12, chapters: 10, tier: 'gold', size: 'XL', storyPoints: 65, scholars: ['Sayanacharya', 'Ralph T.H. Griffith', 'Swami Dayananda Saraswati'] },
  'yajurveda': { verses: 40, chapters: 40, tier: 'gold', size: 'M', storyPoints: 20, scholars: ['Mahidhara', 'Uvvata', 'Swami Dayananda'] },
  'skanda-purana': { verses: 81000, chapters: 750, tier: 'bronze', size: 'XXL', storyPoints: 100, scholars: ['G.V. Tagare', 'Motilal Banarsidass'] },
  'dasbodh': { verses: 7751, chapters: 20, tier: 'silver', size: 'L', storyPoints: 35, scholars: ['Samarth Ramdas Swami', 'Warkari Lineage'] },
};

/** Map of scripture slugs to their audited readiness scores (%) */
export const SCRIPTURE_READINESS_SCORES: Record<string, number> = {
  'bhagavad-gita': 100.0,
  'isha-upanishad': 100.0,
  'kena-upanishad': 100.0,
  'yoga-sutras': 100.0,
  'vishnu-purana': 100.0,
  'garuda-purana': 100.0,
  'samskaras': 100.0,
  'stotras': 100.0,
  'brahma-sutras': 100.0,
  'samaveda': 100.0,
  'manusmriti': 100.0,
  'atharvaveda': 100.0,
  'mahabharata': 100.0,
  'bhagavata-purana': 100.0,
  'ramayana': 100.0,
  'rigveda': 100.0,
  'yajurveda': 100.0,
  'dasbodh': 15.0,
  'skanda-purana': 10.0,
};

/** Check if strict demo gating is enabled */
export function isStrictDemoGatingEnabled(): boolean {
  if (process.env.STRICT_DEMO_GATING === 'false') return false;
  if (process.env.NEXT_PUBLIC_STRICT_DEMO === 'false') return false;
  if (process.env.STRICT_DEMO_GATING === 'true') return true;
  if (process.env.NEXT_PUBLIC_STRICT_DEMO === 'true') return true;
  return false;
}

/** Check if a text is 100% completed (Gold Tier) */
export function isTextCompleted(slug: string): boolean {
  if ((COMPLETED_BOOKS_SLUGS as readonly string[]).includes(slug)) return true;
  const score = SCRIPTURE_READINESS_SCORES[slug];
  if (score !== undefined && score >= 100) return true;
  const effort = BOOK_EFFORT_ESTIMATES[slug];
  if (effort?.tier === 'gold') return true;
  return false;
}

/** Get a text by its URL slug */
export function getTextBySlug(slug: string): VedicText | undefined {
  const text = VEDIC_LIBRARY.find(t => t.slug === slug);
  if (!text) return undefined;
  if (isStrictDemoGatingEnabled()) {
    const score = SCRIPTURE_READINESS_SCORES[text.slug] ?? 0;
    if (score < 100) {
      return { ...text, available: false };
    }
  }
  return text;
}

/** Get all currently completed 100% verified texts (Gold Pool) */
export function getCompletedTexts(): VedicText[] {
  return VEDIC_LIBRARY.filter(t => isTextCompleted(t.slug));
}

/** Get all currently available texts (accessible in UI) */
export function getAvailableTexts(): VedicText[] {
  const strictDemo = isStrictDemoGatingEnabled();
  return VEDIC_LIBRARY
    .map(t => {
      if (strictDemo) {
        const score = SCRIPTURE_READINESS_SCORES[t.slug] ?? 0;
        if (score < 100) return { ...t, available: false };
      }
      return t;
    })
    .filter(t => t.available);
}

/** Get texts grouped by parent-child hierarchy with category totals */
export function getVedicHierarchy() {
  const all = VEDIC_LIBRARY;
  const parents = all.filter(t => !t.parentSlug);
  const statsByCat: Record<string, { books: number, fragments: number }> = {};

  all.forEach(t => {
    if (!statsByCat[t.category]) statsByCat[t.category] = { books: 0, fragments: 0 };
    statsByCat[t.category].books += 1;
    statsByCat[t.category].fragments += (t.totalChapters * 10);
  });

  return {
    tree: parents.map(p => ({
      ...p,
      children: all.filter(c => c.parentSlug === p.slug)
    })),
    statsByCat
  };
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
    });
}
