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
  [key: string]: any;
}

const MANDATORY_FIELDS = ['_id', 'chapter', 'verse', 'slok', 'transliteration'];

/**
 * Validates the integrity of a verse object.
 */
export function validateVerse(verse: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  MANDATORY_FIELDS.forEach(field => {
    if (verse[field] === undefined || verse[field] === null || verse[field] === '') {
      errors.push(`Missing mandatory field: ${field}`);
    }
  });

  if (typeof verse.chapter !== 'number') errors.push('Chapter must be a number');
  if (typeof verse.verse !== 'number') errors.push('Verse must be a number');

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
