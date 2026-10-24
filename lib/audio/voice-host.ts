/**
 * 🎙️ Hierarchical Dual-Context Voice Companion Host (`lib/audio/voice-host.ts`)
 *
 * Implements the interactive voice companion for podcast listeners.
 *
 * Core Architectural Invariant:
 * - Priority 1 (Anchor Context): The specific chapter and verses the seeker is actively
 *   listening to. When asking questions, this chapter is ALWAYS the primary source of truth.
 * - Priority 2 (Global Corpus Context): Broader cross-scriptural insights across the
 *   33 canonical texts to enrich the answer without losing the active chapter's focus.
 * - Persona: Serene, bedtime-calm, compassionate, succinct (2-4 sentences max).
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

export interface AnchorContext {
  bookSlug: string;
  bookTitle: string;
  chapter: number;
  chapterTitle: string;
  currentVerse?: number;
  activeVerses: Array<{
    verse: number;
    original: string;
    translation: string;
    meaning?: string;
  }>;
  chapterSummary?: string;
}

export interface CorpusVerseContext {
  bookTitle: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface VoiceHostPromptPayload {
  query: string;
  anchor: AnchorContext;
  crossCorpusMatches?: CorpusVerseContext[];
  language?: 'en' | 'hi' | 'mr';
}

export interface VoiceCompanionResponse {
  answer: string;
  primaryCitations: string[];
  crossCorpusCitations: string[];
  mode: 'live_llm' | 'deterministic_anchor';
}

/**
 * Builds the structured prompt enforcing the Hierarchical Dual-Context RAG model.
 */
export function buildVoiceHostPrompt(payload: VoiceHostPromptPayload): string {
  const { query, anchor, crossCorpusMatches = [], language = 'en' } = payload;
  const targetLang = language === 'hi' ? 'Hindi' : language === 'mr' ? 'Marathi' : 'English';

  const anchorVerseLines = anchor.activeVerses
    .slice(0, 10)
    .map((v) => `[Verse ${v.verse}]: ${v.translation || v.meaning}`)
    .join('\n');

  const crossCorpusLines = crossCorpusMatches.length > 0
    ? crossCorpusMatches
        .slice(0, 3)
        .map((c) => `[${c.bookTitle} Ch ${c.chapter} v${c.verse}]: ${c.text}`)
        .join('\n')
    : 'None';

  return `
You are the serene, soothing Voice Host of the Vishwa-Vani Bedtime Scripture Podcast.
A seeker is listening to ${anchor.bookTitle}, ${anchor.chapterTitle} as they prepare to rest.
They have paused the audio to ask a question.

SEEKER'S QUESTION:
"${query}"

PRIMARY ANCHOR CONTEXT (The Chapter Being Listened To - HIGHEST PRIORITY):
Book: ${anchor.bookTitle} (Chapter ${anchor.chapter}: ${anchor.chapterTitle})
${anchor.chapterSummary ? `Summary: ${anchor.chapterSummary}\n` : ''}
Key Verses in this Chapter:
${anchorVerseLines}

SECONDARY GLOBAL CORPUS CONTEXT (Broader Cross-Scriptural Connections):
${crossCorpusLines}

STRICT INSTRUCTIONS:
1. Speak in a gentle, tranquil, bedtime-friendly tone in ${targetLang}.
2. Keep your answer brief and profound (2 to 4 sentences maximum) so as not to disrupt their restful mindset.
3. Anchor your response primarily in ${anchor.bookTitle} Chapter ${anchor.chapter}.
4. If relevant, weave in a seamless one-sentence thread from the secondary context, but DO NOT divert attention away from the current chapter.
5. Provide pure, authentic wisdom without preamble ("Certainly", "As an AI") or conversational filler.
`.trim();
}

/**
 * Synthesizes the Voice Host response.
 * Uses Gemini if configured; falls back to deterministic chapter-anchored synthesis.
 */
export async function synthesizeCompanionResponse(
  payload: VoiceHostPromptPayload,
  apiKey?: string
): Promise<VoiceCompanionResponse> {
  const key = apiKey || process.env.GEMINI_API_KEY || '';
  const primaryCitations = [`${payload.anchor.bookTitle} Chapter ${payload.anchor.chapter}`];
  const crossCorpusCitations = (payload.crossCorpusMatches || []).map(
    (c) => `${c.bookTitle} ${c.chapter}.${c.verse}`
  );

  if (key) {
    try {
      const genAI = new GoogleGenerativeAI(key);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const prompt = buildVoiceHostPrompt(payload);

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Voice Host Gemini timeout after 8s')), 8000)
      );

      const result = await Promise.race([model.generateContent(prompt), timeoutPromise]);
      const answer = result.response.text().trim().replace(/<[^>]*>?/gm, '');

      if (answer) {
        return {
          answer,
          primaryCitations,
          crossCorpusCitations,
          mode: 'live_llm',
        };
      }
    } catch (err) {
      console.warn('Voice Host Live LLM synthesis failed, using deterministic anchor:', err);
    }
  }

  // Deterministic Fallback based on Active Chapter
  const lang = payload.language || 'en';
  const firstMeaning = payload.anchor.activeVerses[0]?.translation || payload.anchor.activeVerses[0]?.meaning || '';
  const summary = payload.anchor.chapterSummary || firstMeaning;

  let fallback = '';
  if (lang === 'hi') {
    fallback = `इस अध्याय (${payload.anchor.bookTitle}, अध्याय ${payload.anchor.chapter}) में मूल सिद्धांत यह सिखाता है: ${summary.slice(0, 160)}। अपने चित्त को इस सत्य में स्थिर करते हुए शांति का अनुभव करें।`;
  } else if (lang === 'mr') {
    fallback = `या अध्यायात (${payload.anchor.bookTitle}, अध्याय ${payload.anchor.chapter}) मुख्य संदेश हा आहे: ${summary.slice(0, 160)}. अंतःकरणात ही शांती साठवून शांतपणे विश्राम करा.`;
  } else {
    fallback = `In ${payload.anchor.bookTitle}, Chapter ${payload.anchor.chapter}, the essential teaching resolves your question: ${summary.slice(0, 160)}. Settle your mind into this truth and rest in peaceful awareness.`;
  }

  return {
    answer: fallback,
    primaryCitations,
    crossCorpusCitations,
    mode: 'deterministic_anchor',
  };
}
