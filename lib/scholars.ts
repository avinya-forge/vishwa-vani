/**
 * Scholars Registry (SCHOLAR-005)
 *
 * Per-scholar metadata table for the Bhagavad Gītā commentary corpus.
 * Used by the reader UI to categorise authors in the scholar selector
 * (UI-901), and by audit_standards.js to verify philosophical-school
 * coverage across the gold tier.
 *
 * Tier 0 = currently in production (BG 657 verses, ISKCON + Sant Dnyāneshwar).
 * Tier 1 = SCHOLAR-001 ranked top-10 acquisition queue.
 *
 * Acquisition status flags: 'live' (in production), 'queued' (in
 * SCHOLAR-001 acquisition plan), 'deferred' (license unresolved).
 */

export type PhilosophicalSchool =
  | 'advaita'
  | 'vishishtadvaita'
  | 'dvaita'
  | 'achintya-bhedabheda'
  | 'kashmir-shaiva'
  | 'integral-yoga'
  | 'karma-yoga-modern'
  | 'sanatana-synthesis'
  | 'bhakti-marathi'
  | 'modern-academic'

export type Era =
  | 'classical' // pre-1000 CE
  | 'medieval' // 1000–1700 CE
  | 'colonial' // 1700–1947 CE
  | 'modern' // post-1947

export type Tradition =
  | 'sankara-parampara'
  | 'sri-vaishnava'
  | 'madhva-sampradaya'
  | 'iskcon-gaudiya'
  | 'kashmir-trika'
  | 'aurobindo-ashram'
  | 'maharashtrian-warkari'
  | 'pan-vaishnava-sanatana'
  | 'independent-modern'

export type AcquisitionStatus = 'live' | 'queued' | 'deferred'

export interface ScholarEntry {
  id: string
  displayName: string
  era: Era
  dates: string
  philosophicalSchool: PhilosophicalSchool
  tradition: Tradition
  primaryLanguage: 'sa' | 'en' | 'hi' | 'mr' | 'gu'
  availableLanguages: ('sa' | 'en' | 'hi' | 'mr' | 'gu')[]
  acquisitionStatus: AcquisitionStatus
  /** Tier 0 (live) or Tier 1 (top-10 queued) */
  tier: 0 | 1
  /** SCHOLAR-001 ranking; null for Tier 0 */
  rank: number | null
  /** Brief one-line school description for UI tooltip */
  schoolSummary: string
  /** Source of the source-text under public domain (per SCHOLAR-002) */
  publicDomainSource: string
  /** Notes on copyright / license risk if any */
  licenseNote?: string
}

export const SCHOLARS_REGISTRY: ScholarEntry[] = [
  // ── Tier 0 — currently live in production ─────────────────────────────────
  {
    id: 'iskcon-prabhupada',
    displayName: 'A. C. Bhaktivedanta Swami Prabhupāda',
    era: 'modern',
    dates: '1896–1977',
    philosophicalSchool: 'achintya-bhedabheda',
    tradition: 'iskcon-gaudiya',
    primaryLanguage: 'en',
    availableLanguages: ['en', 'hi', 'mr'],
    acquisitionStatus: 'deferred',
    tier: 1,
    rank: null,
    schoolSummary: 'Achintya-bhedābheda — inconceivable simultaneous oneness and difference; jīva forever a part, never the whole.',
    publicDomainSource: 'BBT Gītā As It Is — copyrighted; deferred to avoid license risk (LEGAL-001/LEGAL-002). Ready in background for future paid/licensed tier.',
    licenseNote: 'Deferred from live production to eliminate copyright infringement risks. Stored in schema for future licensed/paid access.',
  },
  {
    id: 'sant-dnyaneshwar',
    displayName: 'Sant Dnyāneshwar',
    era: 'medieval',
    dates: '1275–1296 CE',
    philosophicalSchool: 'bhakti-marathi',
    tradition: 'maharashtrian-warkari',
    primaryLanguage: 'mr',
    availableLanguages: ['mr', 'en', 'hi'],
    acquisitionStatus: 'live',
    tier: 0,
    rank: null,
    schoolSummary: 'Warkarī Bhakti — non-dual devotion in vernacular Marathi ovī meter; dissolves the doer through māulī (motherhood) imagery.',
    publicDomainSource: 'Dnyāneshwarī (1290 CE original Marathi); EN paraphrase from public-domain sources; HI generated layer in current build',
  },

  // ── Tier 1 — SCHOLAR-001 ranked top-10 acquisition queue ──────────────────
  {
    id: 'adi-shankara',
    displayName: 'Ādi Śaṅkarācārya',
    era: 'classical',
    dates: '788–820 CE',
    philosophicalSchool: 'advaita',
    tradition: 'sankara-parampara',
    primaryLanguage: 'sa',
    availableLanguages: ['sa', 'en', 'hi', 'mr'],
    acquisitionStatus: 'live',
    tier: 0,
    rank: null,
    schoolSummary: 'Advaita Vedānta — non-dual; jīva is identical to Brahman, the world is mithyā (provisional reality).',
    publicDomainSource: 'GRETIL (Sanskrit Gītā Bhāṣya, CC-BY); Swami Swarupananda (EN translation, 1909); traditional Advaita synthesis (HI/MR).',
  },
  {
    id: 'tilak-gita-rahasya',
    displayName: 'Bal Gangādhar Tilak — Gītā Rahasya',
    era: 'colonial',
    dates: '1856–1920 (work 1915)',
    philosophicalSchool: 'karma-yoga-modern',
    tradition: 'independent-modern',
    primaryLanguage: 'mr',
    availableLanguages: ['mr', 'en', 'hi'],
    acquisitionStatus: 'queued',
    tier: 1,
    rank: 2,
    schoolSummary: 'Modern Karma-yoga emphasis — the Gītā as a manual for engaged ethical action, recovered for the freedom-movement context.',
    publicDomainSource: 'Marathi original Gītā Rahasya (1915, archive.org); B. S. Sukthankar EN translation (1935); multiple PD HI translations from 1930s',
  },
  {
    id: 'sri-aurobindo',
    displayName: 'Sri Aurobindo — Essays on the Gītā',
    era: 'colonial',
    dates: '1872–1950 (work 1922)',
    philosophicalSchool: 'integral-yoga',
    tradition: 'aurobindo-ashram',
    primaryLanguage: 'en',
    availableLanguages: ['en', 'hi'],
    acquisitionStatus: 'queued',
    tier: 1,
    rank: 3,
    schoolSummary: 'Integral Yoga — synthesis of classical Vedānta with evolutionary spirituality; the Gītā as the supreme ethical scripture of the integral life.',
    publicDomainSource: 'Essays on the Gītā (1922, archive.org public domain); Aurobindo Ashram CC-licensed corpus for re-use',
  },
  {
    id: 'ramanuja',
    displayName: 'Rāmānuja — Gītā Bhāṣya',
    era: 'medieval',
    dates: '1017–1137 CE',
    philosophicalSchool: 'vishishtadvaita',
    tradition: 'sri-vaishnava',
    primaryLanguage: 'sa',
    availableLanguages: ['sa'],
    acquisitionStatus: 'queued',
    tier: 1,
    rank: 4,
    schoolSummary: 'Viśiṣṭādvaita — qualified non-dualism; the world and souls are real attributes of Brahman, who is Nārāyaṇa with auspicious qualities.',
    publicDomainSource: 'GRETIL / UDAY / Muktabodha (Sanskrit Bhāṣya, public domain). EN translations all under copyright — Sanskrit-only ingestion path applies (SCHOLAR-003 single-language excellence policy).',
    licenseNote: 'Modern EN translations (Sampatkumaran 1969, Adidevananda 1991) under copyright. Use Sanskrit-only via single_language flag.',
  },
  {
    id: 'madhva',
    displayName: 'Madhvācārya — Gītā Bhāṣya',
    era: 'medieval',
    dates: '1238–1317 CE',
    philosophicalSchool: 'dvaita',
    tradition: 'madhva-sampradaya',
    primaryLanguage: 'sa',
    availableLanguages: ['sa'],
    acquisitionStatus: 'queued',
    tier: 1,
    rank: 5,
    schoolSummary: 'Dvaita — strict dualism; Brahman, jīva, and the world are eternally and ontologically distinct; bhakti to Viṣṇu is the sole path.',
    publicDomainSource: 'GRETIL / UDAY (Sanskrit Bhāṣya, public domain). EN under copyright (Bannanje Govindacharya). Sanskrit-only ingestion.',
    licenseNote: 'Same constraint as Rāmānuja — Sanskrit-only via single_language flag.',
  },
  {
    id: 'vinoba-bhave-gita-pravachane',
    displayName: 'Acharya Vinoba Bhave — Gītā Pravachane',
    era: 'modern',
    dates: '1895–1982 (work 1932)',
    philosophicalSchool: 'karma-yoga-modern',
    tradition: 'independent-modern',
    primaryLanguage: 'mr',
    availableLanguages: ['mr', 'en', 'hi'],
    acquisitionStatus: 'queued',
    tier: 1,
    rank: 6,
    schoolSummary: 'Samyayoga — Equanimity and spiritualized selfless action; pure action (akarma) where duty dissolves into love and service.',
    publicDomainSource: 'Gītā Pravachane (1932 original Marathi); verbatim transcripts by Sane Guruji; Hindi and English authorized free public domain translations.',
  },
  {
    id: 'savarkar-karma-yoga',
    displayName: 'Veer Savarkar — Gītā Karma-Yoga',
    era: 'colonial',
    dates: '1883–1966',
    philosophicalSchool: 'karma-yoga-modern',
    tradition: 'independent-modern',
    primaryLanguage: 'mr',
    availableLanguages: ['mr', 'en', 'hi'],
    acquisitionStatus: 'queued',
    tier: 1,
    rank: 7,
    schoolSummary: 'Ethical action for national duty — The Gītā as a text of strength, ethical struggle, and fulfilling Swadharma without fear.',
    publicDomainSource: 'Selected essays, letters, and speeches on Gītā philosophy (public domain in India).',
  },
  {
    id: 'radhakrishnan',
    displayName: 'Sarvepalli Radhakrishnan — The Bhagavadgītā',
    era: 'modern',
    dates: '1888–1975 (work 1948)',
    philosophicalSchool: 'modern-academic',
    tradition: 'independent-modern',
    primaryLanguage: 'en',
    availableLanguages: ['en'],
    acquisitionStatus: 'deferred',
    tier: 1,
    rank: null,
    schoolSummary: 'Modern academic comparative reading — places the Gītā in dialogue with Western philosophy and other religious traditions.',
    publicDomainSource: 'None — Allen & Unwin 1948 edition under active copyright.',
    licenseNote: 'Defer until clean license path identified. Excerpts under fair use only — never as a full layer.',
  },
  {
    id: 'easwaran',
    displayName: 'Eknath Easwaran — The Bhagavad Gītā',
    era: 'modern',
    dates: '1910–1999 (work 1985)',
    philosophicalSchool: 'modern-academic',
    tradition: 'independent-modern',
    primaryLanguage: 'en',
    availableLanguages: ['en'],
    acquisitionStatus: 'deferred',
    tier: 1,
    rank: null,
    schoolSummary: 'Modern devotional / accessibility-focused — meditation-on-the-passage approach; chapter introductions as practical contemplative companions.',
    publicDomainSource: 'None — Nilgiri Press active copyright.',
    licenseNote: 'Defer indefinitely — cite as further reading only.',
  },
  {
    id: 'abhinavagupta',
    displayName: 'Abhinavagupta — Gītārtha-saṅgraha',
    era: 'classical',
    dates: '950–1016 CE',
    philosophicalSchool: 'kashmir-shaiva',
    tradition: 'kashmir-trika',
    primaryLanguage: 'sa',
    availableLanguages: ['sa'],
    acquisitionStatus: 'queued',
    tier: 1,
    rank: 8,
    schoolSummary: 'Kashmir Śaiva (Trika) — non-dual recognition (pratyabhijñā); the Gītā read through Śiva-Śakti dynamics rather than Vaiṣṇava theology.',
    publicDomainSource: 'Muktabodha / GRETIL (Sanskrit, public domain). EN translation (Marjanovic 2004) under copyright. Sanskrit-only ingestion.',
    licenseNote: 'Short text — full ingestion is tractable. Sanskrit-only via single_language flag.',
  },
  {
    id: 'gita-press-gorakhpur',
    displayName: 'Gita Press Gorakhpur — Śrīmadbhagavadgītā',
    era: 'modern',
    dates: '1923+ (active publisher)',
    philosophicalSchool: 'sanatana-synthesis',
    tradition: 'pan-vaishnava-sanatana',
    primaryLanguage: 'sa',
    availableLanguages: ['sa', 'hi', 'en', 'mr'],
    acquisitionStatus: 'queued',
    tier: 1,
    rank: 9,
    schoolSummary: 'Pan-Vaiṣṇava Sanātana Dharma synthesis — house style integrating multiple commentarial streams; the de-facto reference standard for Hindi devotional readership.',
    publicDomainSource: 'Sanskrit + HI editions (Goyandka, Gambhirananda) public-domain in India under corporate-authorship 60-year rule (1923+ originals are PD). MR editions PD on the same basis.',
    licenseNote: 'BUG-057 unblocker: Goyandka HI is the highest-priority Phase A drop for closing the authentic-HI gap.',
  },
]

/**
 * Helper: filter by tier (0 = live, 1 = top-10 queue).
 */
export function getScholarsByTier(tier: 0 | 1): ScholarEntry[] {
  return SCHOLARS_REGISTRY.filter(s => s.tier === tier)
}

/**
 * Helper: filter by philosophical school.
 */
export function getScholarsBySchool(school: PhilosophicalSchool): ScholarEntry[] {
  return SCHOLARS_REGISTRY.filter(s => s.philosophicalSchool === school)
}

/**
 * Helper: scholars whose primary or available languages include the given lang.
 */
export function getScholarsByLanguage(lang: 'sa' | 'en' | 'hi' | 'mr' | 'gu'): ScholarEntry[] {
  return SCHOLARS_REGISTRY.filter(s => s.availableLanguages.includes(lang))
}

/**
 * Helper: scholars currently live in production (acquisition complete).
 */
export function getLiveScholars(): ScholarEntry[] {
  return SCHOLARS_REGISTRY.filter(s => s.acquisitionStatus === 'live')
}

/**
 * Helper: queued scholars in priority order (rank ascending).
 */
export function getAcquisitionQueue(): ScholarEntry[] {
  return SCHOLARS_REGISTRY
    .filter(s => s.acquisitionStatus === 'queued')
    .sort((a, b) => (a.rank ?? Infinity) - (b.rank ?? Infinity))
}
