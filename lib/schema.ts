/**
 * Vishwa-Vani: Vedic Schema Protocol 📜
 * 
 * Defines the strict structure for all scripture data.
 * Version: v1 (Initial Release)
 */

export interface VerseCommentary {
  author: string;
  ht?: string; // Hindi Translation
  hc?: string; // Hindi Commentary
  et?: string; // English Translation
  ec?: string; // English Commentary
  sc?: string; // Sanskrit Commentary
}

export interface ScriptureVerse {
  /** Global ID: {slug}_{chapter}_{verse} */
  _id: string;
  chapter: number;
  verse: number;
  slok: string;
  transliteration: string;
  /** Authors and Commentaries are dynamic keys */
  [key: string]: unknown;
}

const MANDATORY_FIELDS = ['_id', 'chapter', 'verse', 'slok', 'transliteration'];

/**
 * Validates the integrity of a verse object.
 */
export function validateVerse(verse: unknown): { valid: boolean; errors: string[] } {
  const v = verse as Record<string, unknown>
  const errors: string[] = [];

  MANDATORY_FIELDS.forEach(field => {
    if (v[field] === undefined || v[field] === null || v[field] === '') {
      errors.push(`Missing mandatory field: ${field}`);
    }
  });

  if (typeof v.chapter !== 'number') errors.push('Chapter must be a number');
  if (typeof v.verse !== 'number') errors.push('Verse must be a number');

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Cleans and sanitizes a verse for ingestion.
 */
export function sanitizeVerse(verse: ScriptureVerse): ScriptureVerse {
  return {
    ...verse,
    slok: verse.slok.trim().replace(/\r\n/g, '\n'),
    transliteration: verse.transliteration.trim().replace(/\r\n/g, '\n'),
  };
}
