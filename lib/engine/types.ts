/**
 * Vishwa-Vani: Unified Scripture Engine Data Contracts & Types
 *
 * Provides standardized, extensible schemas for end-to-end scripture lifecycle:
 * Ingestion, NVF Normalization, Multi-Scholar Enrichment, Diamond Tier Extraction,
 * Quality Gate Rule Audits, and Lake Synchronization.
 */

import type { ScientificDomain } from '../vedic-science';

export type PipelineStage = 'bronze' | 'silver' | 'gold' | 'diamond' | 'lake_sync' | 'published';

export type RuleSeverity = 'error' | 'warning' | 'info';

export interface AuthorSpec {
  id: string;
  name: string;
  lineage: string;
  work?: string;
  description?: string;
}

export interface BookSpec {
  slug: string;
  dataPrefix?: string;
  name: string;
  nameDevanagari: string;
  nameHi: string;
  nameMr: string;
  category: 'itihas' | 'upanishad' | 'veda' | 'purana' | 'charitra' | 'other';
  totalChapters: number;
  description: string;
  sourceUrl?: string;
  license?: string;
  publicDomainYear?: number;
  authors?: AuthorSpec[];
  chapterNames?: Record<string, string>;
  hasPreface?: boolean;
  hasPostface?: boolean;
}

export interface RawVerseInput {
  chapter: number;
  verse: number;
  original: string; // Sanskrit Devanagari
  transliteration?: string; // IAST
  translation?: string; // English
  meaning?: string; // Philosophical synthesis
  layers?: Record<string, {
    en?: string;
    hi?: string;
    mr?: string;
  }>;
}

export interface NVFCommentaryLayer {
  en?: string;
  hi?: string;
  mr?: string;
  [lang: string]: string | undefined;
}

export interface NVFVerseRecord {
  id: string;
  text_slug: string;
  chapter: number;
  verse: number;
  original: string;
  transliteration: string;
  translation: string;
  meaning: string;
  commentaries?: Record<string, NVFCommentaryLayer>;
  layers?: Record<string, NVFCommentaryLayer>;
}

export interface ChapterShard {
  book_id: string;
  chapter: number;
  title?: string;
  sanskrit_title?: string;
  total_verses: number;
  verses: NVFVerseRecord[];
}

export interface RuleViolation {
  ruleId: string;
  ruleName: string;
  severity: RuleSeverity;
  message: string;
  chapter?: number;
  verse?: number;
  field?: string;
}

export interface ValidationReport {
  bookSlug: string;
  isReadyForGold: boolean;
  readinessScore: number; // 0.0 to 100.0%
  totalVersesAudited: number;
  violations: RuleViolation[];
  errorsCount: number;
  warningsCount: number;
  authorsFound: string[];
  languagesFound: string[];
}

export interface ExtractedKnowledgeToken {
  id: string;
  domain: ScientificDomain;
  title: string;
  sanskritTerm: string;
  scriptureSlug: string;
  scriptureName: string;
  chapter: number;
  verseRange: string;
  ancientObservation: string;
  modernCorroboration: string;
  empiricalFact: string;
  keyCitations: Array<{
    sanskrit: string;
    transliteration: string;
    verseUrl: string;
  }>;
  tags: string[];
}

export interface ExtractedChapterSummary {
  chapter: number;
  title: string;
  sanskritTitle: string;
  totalVerses: number;
  veryShort: string;
  short: {
    topics: string[];
    coreDilemma: string;
    philosophicalResolution: string;
    anchorVerse: {
      chapter: number;
      verse: number;
      sanskrit: string;
      transliteration: string;
      translation: string;
      deepDiveUrl: string;
    };
  };
  long: {
    overview: string;
    thematicSections: Array<{
      sectionTitle: string;
      verseRange: string;
      discussion: string;
    }>;
    scholarPerspectives: Array<{
      tradition: string;
      keyInsight: string;
    }>;
    conclusions: string[];
  };
  veryLong: {
    purvapaksha: string[];
    siddhanta: string[];
    sadhanaInstructions: string[];
    etymologicalNotes: string[];
  };
}

export interface PipelineOptions {
  dryRun?: boolean;
  autoPromote?: boolean;
  syncToLake?: boolean;
  extractDiamondTier?: boolean;
  targetScholars?: string[];
  logLevel?: 'verbose' | 'info' | 'silent';
  maxRetries?: number;
  enableSelfCorrection?: boolean;
  onProgress?: (message: string, stage?: PipelineStage) => void;
}

export interface PipelineResult {
  bookSlug: string;
  success: boolean;
  stageReached: PipelineStage;
  shardsCount: number;
  totalVerses: number;
  auditReport: ValidationReport;
  extractedTokensCount?: number;
  hasSummaries?: boolean;
  manifestUpdated?: boolean;
  lakeSynced?: boolean;
  rlIterations?: number;
  auditHistory?: ValidationReport[];
  repairLog?: string[];
  error?: string;
}
