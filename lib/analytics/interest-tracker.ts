/**
 * 🧘 Zero-PII Seeker Topical Interest & Theme Affinity Tracker
 * (`lib/analytics/interest-tracker.ts`)
 *
 * Tracks the philosophical themes and subjects a seeker is drawn to
 * (e.g., Bhakti, Jnana, Karma, Dhyana, Vairagya, Sant Vani) to provide
 * personalized bedtime chapter recommendations and context-aware responses.
 *
 * Strict Zero-PII Policy:
 * - Operates entirely client-side via localStorage (`vv_seeker_affinity`).
 * - Never collects, logs, or transmits names, emails, IP addresses, or device IDs.
 * - Supports one-click erasure (Right to be Forgotten).
 */

export type VedicTheme =
  | 'bhakti'
  | 'jnana'
  | 'karma'
  | 'dhyana'
  | 'vairagya'
  | 'dharma'
  | 'sant_vani';

export interface SeekerAffinityProfile {
  totalListeningSeconds: number;
  themeWeights: Record<VedicTheme, number>;
  topThemes: VedicTheme[];
  recentlyListenedChapters: Array<{
    bookSlug: string;
    chapter: number;
    timestamp: number;
  }>;
  preferredLanguage: 'en' | 'hi' | 'mr' | 'sa';
}

export interface RecommendedChapter {
  bookSlug: string;
  bookTitle: string;
  chapter: number;
  chapterTitle: string;
  primaryTheme: VedicTheme;
  rationale: string;
}

const STORAGE_KEY = 'vv_seeker_affinity';

const DEFAULT_THEME_WEIGHTS: Record<VedicTheme, number> = {
  bhakti: 0,
  jnana: 0,
  karma: 0,
  dhyana: 0,
  vairagya: 0,
  dharma: 0,
  sant_vani: 0,
};

/**
 * Curated Canonical Chapter to Theme Catalog for Bedtime Recommendations.
 */
export const SCRIPTURE_THEME_MAP: Array<{
  bookSlug: string;
  bookTitle: string;
  chapter: number;
  chapterTitle: string;
  themes: VedicTheme[];
  description: string;
}> = [
  {
    bookSlug: 'bhagavad-gita',
    bookTitle: 'Bhagavad Gita',
    chapter: 12,
    chapterTitle: 'Bhakti Yoga — The Path of Pure Devotion',
    themes: ['bhakti', 'dhyana'],
    description: 'Krishna reveals the sublime attributes of the devotee dearest to Him.',
  },
  {
    bookSlug: 'bhagavad-gita',
    bookTitle: 'Bhagavad Gita',
    chapter: 2,
    chapterTitle: 'Sankhya Yoga — The Eternal Soul & Sthitaprajna',
    themes: ['jnana', 'vairagya'],
    description: 'Immortality of the Atman and the unshakable serenity of the perfected sage.',
  },
  {
    bookSlug: 'bhagavad-gita',
    bookTitle: 'Bhagavad Gita',
    chapter: 6,
    chapterTitle: 'Dhyana Yoga — Meditation & Mastery of Mind',
    themes: ['dhyana', 'vairagya'],
    description: 'Practical discipline for tranquil breathing, meditation posture, and equanimity.',
  },
  {
    bookSlug: 'isha-upanishad',
    bookTitle: 'Isha Upanishad',
    chapter: 1,
    chapterTitle: 'Complete Upanishad — All Pervaded by Divine',
    themes: ['jnana', 'vairagya'],
    description: 'See the Divine in everything and enjoy life through peaceful renunciation.',
  },
  {
    bookSlug: 'kena-upanishad',
    bookTitle: 'Kena Upanishad',
    chapter: 1,
    chapterTitle: 'Who Moves the Mind & Senses?',
    themes: ['jnana', 'dhyana'],
    description: 'Deep inquiry into that singular consciousness by which the mind itself thinks.',
  },
  {
    bookSlug: 'gondavalekar-maharaj-pravachane',
    bookTitle: 'Gondavalekar Maharaj Pravachane',
    chapter: 1,
    chapterTitle: 'Nama Smarana — The Gentle Shelter of the Divine Name',
    themes: ['sant_vani', 'bhakti', 'vairagya'],
    description: 'Peaceful bedtime contemplation on constant remembrance of Rama Nama.',
  },
  {
    bookSlug: 'shri-guru-charitra',
    bookTitle: 'Shri Guru Charitra',
    chapter: 1,
    chapterTitle: 'Dattatreya Avatara & The Grace of the Guru',
    themes: ['sant_vani', 'bhakti'],
    description: 'The benevolent descent of Guru Dattatreya to remove darkness and bestow peace.',
  },
  {
    bookSlug: 'vidura-niti',
    bookTitle: 'Vidura Niti',
    chapter: 1,
    chapterTitle: 'Wisdom for a Restless Mind',
    themes: ['dharma', 'vairagya'],
    description: 'Mahatma Vidura counsels King Dhritarashtra on conquering sleeplessness and worry.',
  },
];

/**
 * Loads current seeker affinity profile from storage.
 */
export function getSeekerAffinityProfile(customStorage?: Storage): SeekerAffinityProfile {
  const store = customStorage || (typeof window !== 'undefined' ? window.localStorage : null);
  if (!store) {
    return {
      totalListeningSeconds: 0,
      themeWeights: { ...DEFAULT_THEME_WEIGHTS },
      topThemes: ['bhakti', 'jnana'],
      recentlyListenedChapters: [],
      preferredLanguage: 'en',
    };
  }

  try {
    const raw = store.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        totalListeningSeconds: 0,
        themeWeights: { ...DEFAULT_THEME_WEIGHTS },
        topThemes: ['bhakti', 'jnana'],
        recentlyListenedChapters: [],
        preferredLanguage: 'en',
      };
    }
    const parsed = JSON.parse(raw);
    return {
      totalListeningSeconds: parsed.totalListeningSeconds || 0,
      themeWeights: { ...DEFAULT_THEME_WEIGHTS, ...(parsed.themeWeights || {}) },
      topThemes: parsed.topThemes || ['bhakti', 'jnana'],
      recentlyListenedChapters: parsed.recentlyListenedChapters || [],
      preferredLanguage: parsed.preferredLanguage || 'en',
    };
  } catch {
    return {
      totalListeningSeconds: 0,
      themeWeights: { ...DEFAULT_THEME_WEIGHTS },
      topThemes: ['bhakti', 'jnana'],
      recentlyListenedChapters: [],
      preferredLanguage: 'en',
    };
  }
}

/**
 * Saves profile to storage and re-computes normalized top themes.
 */
function saveProfile(profile: SeekerAffinityProfile, customStorage?: Storage): void {
  const store = customStorage || (typeof window !== 'undefined' ? window.localStorage : null);
  if (!store) return;

  // Compute top themes sorted by weight descending
  const sorted = (Object.keys(profile.themeWeights) as VedicTheme[]).sort(
    (a, b) => profile.themeWeights[b] - profile.themeWeights[a]
  );
  profile.topThemes = sorted.filter((t) => profile.themeWeights[t] > 0).slice(0, 3);
  if (profile.topThemes.length === 0) {
    profile.topThemes = ['bhakti', 'jnana'];
  }

  try {
    store.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.warn('Failed to save seeker affinity profile:', err);
  }
}

/**
 * Records dwell/listening time for specific themes.
 */
export function recordTopicDwellTime(
  theme: VedicTheme,
  dwellSeconds: number,
  customStorage?: Storage
): void {
  if (dwellSeconds <= 0) return;
  const profile = getSeekerAffinityProfile(customStorage);
  profile.totalListeningSeconds += dwellSeconds;
  profile.themeWeights[theme] = (profile.themeWeights[theme] || 0) + dwellSeconds;
  saveProfile(profile, customStorage);
}

/**
 * Records chapter interaction (e.g. listening to or completing a chapter).
 */
export function recordChapterInteraction(
  bookSlug: string,
  chapter: number,
  themes: VedicTheme[] = [],
  customStorage?: Storage
): void {
  const profile = getSeekerAffinityProfile(customStorage);

  // Update recent chapters (keep latest 10)
  profile.recentlyListenedChapters = [
    { bookSlug, chapter, timestamp: Date.now() },
    ...profile.recentlyListenedChapters.filter(
      (c) => !(c.bookSlug === bookSlug && c.chapter === chapter)
    ),
  ].slice(0, 10);

  // Boost weights of associated themes
  themes.forEach((t) => {
    profile.themeWeights[t] = (profile.themeWeights[t] || 0) + 60; // 60s interaction credit
  });

  saveProfile(profile, customStorage);
}

/**
 * Analyzes search or query keywords to increment topical affinity.
 */
export function recordQueryTopic(query: string, customStorage?: Storage): void {
  if (!query) return;
  const lower = query.toLowerCase();
  const themeKeywords: Record<VedicTheme, string[]> = {
    bhakti: ['devotion', 'surrender', 'bhakti', 'krishna', 'rama', 'prayer', 'prem'],
    jnana: ['soul', 'atman', 'brahman', 'self', 'advaita', 'consciousness', 'jnana', 'upanishad'],
    karma: ['duty', 'action', 'karma', 'work', 'ethics', 'dilemma', 'arjuna'],
    dhyana: ['meditation', 'dhyana', 'mind', 'breath', 'calm', 'stillness', 'focus', 'sleep'],
    vairagya: ['peace', 'letting go', 'detachment', 'vairagya', 'grief', 'sorrow', 'equanimity'],
    dharma: ['righteous', 'dharma', 'justice', 'vidura', 'chanakya', 'truth'],
    sant_vani: ['guru', 'saint', 'charitra', 'gondavalekar', 'dattatreya', 'maharaj'],
  };

  (Object.keys(themeKeywords) as VedicTheme[]).forEach((theme) => {
    const hits = themeKeywords[theme].some((k) => lower.includes(k));
    if (hits) {
      recordTopicDwellTime(theme, 30, customStorage);
    }
  });
}

/**
 * Provides bedtime chapter recommendations matching the seeker's top interests.
 */
export function getRecommendedBedtimeChapters(
  profile: SeekerAffinityProfile,
  limit: number = 3
): RecommendedChapter[] {
  const topThemes = profile.topThemes.length > 0 ? profile.topThemes : ['bhakti', 'jnana'];
  const recentSlugs = new Set(
    profile.recentlyListenedChapters.map((c) => `${c.bookSlug}-${c.chapter}`)
  );

  // Score candidates by match with seeker's themes
  const candidates = SCRIPTURE_THEME_MAP.map((item) => {
    let score = 0;
    item.themes.forEach((t) => {
      if (topThemes.includes(t)) {
        const rank = topThemes.indexOf(t);
        score += (3 - rank) * 10;
      }
    });
    // Slight penalty if recently listened, to encourage discovery
    if (recentSlugs.has(`${item.bookSlug}-${item.chapter}`)) {
      score -= 5;
    }
    return {
      bookSlug: item.bookSlug,
      bookTitle: item.bookTitle,
      chapter: item.chapter,
      chapterTitle: item.chapterTitle,
      primaryTheme: item.themes[0] || 'jnana',
      rationale: item.description,
      score,
    };
  });

  candidates.sort((a, b) => b.score - a.score);
  return candidates.slice(0, limit);
}

/**
 * Resets seeker affinity data (Right to be Forgotten).
 */
export function clearSeekerAffinity(customStorage?: Storage): void {
  const store = customStorage || (typeof window !== 'undefined' ? window.localStorage : null);
  if (store) {
    store.removeItem(STORAGE_KEY);
  }
}
