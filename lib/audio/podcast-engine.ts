/**
 * 🎙️ Chapter-Level Bedtime Scripture Podcast Narration Engine
 *
 * Transforms full chapter verse records and multi-scholar commentaries into
 * structured, soothing, speech-optimized audio podcast manifests.
 *
 * Features:
 * - Soothing Bedtime Pacing (110 wpm, extended pauses for relaxation & sleep)
 * - Sanskrit Verse Chanting followed by Vernacular Meaning (English / Hindi / Marathi)
 * - Sage Commentary Integration & Chapter Intro/Outro Reflections
 * - Cleaned phonetic text formatting for TTS engines (Web Speech API, Edge-TTS, Kokoro)
 */

import type { NVFVerseRecord, NVFCommentaryLayer } from '../engine/types';

export type PodcastLanguage = 'en' | 'hi' | 'mr' | 'sa';
export type PodcastPacingMode = 'bedtime_relaxing' | 'study' | 'chant_only';

export interface PodcastVerseInput {
  id?: string;
  text_slug?: string;
  chapter: number;
  verse: number;
  original: string;
  transliteration?: string;
  translation?: string;
  meaning?: string;
  translationHi?: string;
  translationMr?: string;
  layers?: Record<string, NVFCommentaryLayer>;
  commentaries?: Record<string, NVFCommentaryLayer>;
}

export interface PodcastSegment {
  id: string;
  type: 'intro' | 'verse_chant' | 'verse_meaning' | 'commentary_insight' | 'reflection' | 'outro';
  verseNumber?: number;
  speaker: 'Narrator' | 'Sage' | 'Scholar';
  language: PodcastLanguage;
  text: string;
  pauseAfterMs: number;
  audioUrl?: string;
}

export interface ChapterPodcastManifest {
  bookSlug: string;
  bookTitle: string;
  chapter: number;
  chapterTitle: string;
  language: PodcastLanguage;
  pacingMode: PodcastPacingMode;
  totalVerses: number;
  estimatedDurationSeconds: number;
  segments: PodcastSegment[];
  themes: string[];
}

export interface BuildPodcastOptions {
  bookSlug: string;
  bookTitle?: string;
  chapter: number;
  chapterTitle?: string;
  verses: Array<NVFVerseRecord | PodcastVerseInput>;
  language?: PodcastLanguage;
  pacingMode?: PodcastPacingMode;
  includeCommentary?: boolean;
}

/**
 * Strips technical brackets, citations, markdown artifacts, and formats
 * scripture text into serene, speech-friendly strings.
 */
export function cleanForSpeech(raw: string): string {
  if (!raw) return '';
  return raw
    .replace(/\[\s*\d+[\d\s.,–-]*\s*\]/g, '') // remove [1.2] or [4]
    .replace(/\[[^\]]+\]/g, '') // remove bracketed scholar names e.g. [Adi Shankara]
    .replace(/[#*_~`]/g, '') // remove markdown styling
    .replace(/\|{1,2}/g, ' ') // convert Sanskrit danda || into a pause
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Resolves vernacular meaning across direct translations and commentary layers.
 */
function resolveVernacularMeaning(v: PodcastVerseInput, language: PodcastLanguage): string {
  const layers = v.layers || v.commentaries;
  const firstScholarKey = layers ? Object.keys(layers)[0] : undefined;
  const firstScholar = firstScholarKey && layers ? layers[firstScholarKey] : undefined;

  if (language === 'hi') {
    return v.translationHi || firstScholar?.hi || v.translation || v.meaning || '';
  }
  if (language === 'mr') {
    return v.translationMr || firstScholar?.mr || v.translation || v.meaning || '';
  }
  return v.translation || v.meaning || '';
}

/**
 * Computes estimated speech duration in seconds.
 * Bedtime pace: ~110 words/minute (slow, calming, sleep-conducive)
 * Study pace: ~140 words/minute
 */
export function calculateEstimatedDuration(
  segments: PodcastSegment[],
  pacing: PodcastPacingMode = 'bedtime_relaxing'
): number {
  const wpm = pacing === 'bedtime_relaxing' ? 110 : 140;
  let totalSeconds = 0;

  for (const seg of segments) {
    const wordCount = seg.text.trim().split(/\s+/).filter(Boolean).length;
    const speechSec = (wordCount / wpm) * 60;
    const pauseSec = (seg.pauseAfterMs || 0) / 1000;
    totalSeconds += speechSec + pauseSec;
  }

  return Math.ceil(totalSeconds);
}

/**
 * Builds a complete Chapter Podcast Manifest.
 */
export function buildChapterPodcastManifest(options: BuildPodcastOptions): ChapterPodcastManifest {
  const {
    bookSlug,
    bookTitle = 'Sacred Scripture',
    chapter,
    chapterTitle = `Chapter ${chapter}`,
    verses = [],
    language = 'en',
    pacingMode = 'bedtime_relaxing',
    includeCommentary = true,
  } = options;

  const segments: PodcastSegment[] = [];
  const pauseBetweenVerses = pacingMode === 'bedtime_relaxing' ? 2200 : 1200;
  const pauseAfterChant = pacingMode === 'bedtime_relaxing' ? 1600 : 900;

  // 1. Soothing Introduction
  if (pacingMode !== 'chant_only') {
    let introText = `Welcome to chapter ${chapter} of ${bookTitle}. Allow your breath to settle and your awareness to turn inward as we listen to these sacred verses.`;
    if (language === 'hi') {
      introText = `${bookTitle} के अध्याय ${chapter} में आपका स्वागत है। विश्राम की स्थिति में आकर, इन पवित्र श्लोकों और उनके गूढ़ भाव का श्रवण करें।`;
    } else if (language === 'mr') {
      introText = `${bookTitle} च्या अध्याय ${chapter} मध्ये आपले स्वागत आहे. मन शांत ठेवून या पवित्र श्लोकांचे आणि त्यांच्या भावार्थाचे शांतपणे श्रवण करा.`;
    }

    segments.push({
      id: `intro-${bookSlug}-${chapter}`,
      type: 'intro',
      speaker: 'Narrator',
      language,
      text: introText,
      pauseAfterMs: pacingMode === 'bedtime_relaxing' ? 2500 : 1500,
    });
  }

  // 2. Iterate through Verses
  verses.forEach((v) => {
    const verseNum = v.verse || 0;

    // A. Sanskrit Verse Chanting
    const chantText = cleanForSpeech(v.original || v.transliteration || '');
    if (chantText) {
      segments.push({
        id: `chant-${bookSlug}-${chapter}-${verseNum}`,
        type: 'verse_chant',
        verseNumber: verseNum,
        speaker: 'Sage',
        language: 'sa',
        text: chantText,
        pauseAfterMs: pauseAfterChant,
      });
    }

    if (pacingMode === 'chant_only') return;

    // B. Vernacular Meaning
    const meaningText = resolveVernacularMeaning(v, language);
    const cleanMeaning = cleanForSpeech(meaningText);
    if (cleanMeaning) {
      segments.push({
        id: `meaning-${bookSlug}-${chapter}-${verseNum}`,
        type: 'verse_meaning',
        verseNumber: verseNum,
        speaker: 'Narrator',
        language,
        text: cleanMeaning,
        pauseAfterMs: includeCommentary ? 1400 : pauseBetweenVerses,
      });
    }

    // C. Sage Commentary Insight (if available and enabled)
    if (includeCommentary && v.layers) {
      const scholarKeys = Object.keys(v.layers);
      if (scholarKeys.length > 0) {
        const firstScholar = v.layers[scholarKeys[0]];
        const rawCommentary =
          language === 'hi' && firstScholar.hi
            ? firstScholar.hi
            : language === 'mr' && firstScholar.mr
            ? firstScholar.mr
            : firstScholar.en || '';

        const cleanCommentary = cleanForSpeech(rawCommentary);
        if (cleanCommentary && cleanCommentary.length > 20) {
          // Take first 2 sentences max to keep it peaceful and concise
          const sentences = cleanCommentary.split(/[.!?।]+/).filter(Boolean);
          const conciseInsight = sentences.slice(0, 2).join('. ') + '.';

          segments.push({
            id: `commentary-${bookSlug}-${chapter}-${verseNum}`,
            type: 'commentary_insight',
            verseNumber: verseNum,
            speaker: 'Scholar',
            language,
            text: conciseInsight,
            pauseAfterMs: pauseBetweenVerses,
          });
        }
      }
    }
  });

  // 3. Meditative Outro & Sleep Departure
  if (pacingMode !== 'chant_only') {
    let outroText = `You have completed chapter ${chapter} of ${bookTitle}. May the peace and profound wisdom of this discourse remain with your awareness. Rest peacefully. Om Shanti, Shanti, Shanti.`;
    if (language === 'hi') {
      outroText = `${bookTitle} का अध्याय ${chapter} यहाँ संपन्न होता है। यह शांति और आत्म-बोध आपकी चेतना में सदैव बना रहे। शांतिपूर्वक विश्राम करें। ॐ शान्तिः शान्तिः शान्तिः।`;
    } else if (language === 'mr') {
      outroText = `${bookTitle} चा अध्याय ${chapter} येथे पूर्ण होतो. हे आत्मज्ञान आणि मनःशांती आपल्या अंतःकरणात स्थिर राहो. सुखद निद्रा आणि विश्राम लाभो. ॐ शान्तिः शान्तिः शान्तिः.`;
    }

    segments.push({
      id: `outro-${bookSlug}-${chapter}`,
      type: 'outro',
      speaker: 'Narrator',
      language,
      text: outroText,
      pauseAfterMs: 3000,
    });
  }

  const estimatedDurationSeconds = calculateEstimatedDuration(segments, pacingMode);

  return {
    bookSlug,
    bookTitle,
    chapter,
    chapterTitle,
    language,
    pacingMode,
    totalVerses: verses.length,
    estimatedDurationSeconds,
    segments,
    themes: ['vedic_wisdom', 'contemplation', 'peace'],
  };
}
