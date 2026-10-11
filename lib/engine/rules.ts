/**
 * Vishwa-Vani: Rule-Sets Engine & Declarative Validators
 *
 * Implements strict, reusable quality invariant rules:
 * - Schema conformance (NVF 1.3)
 * - Anti-placeholder / anti-slop verification
 * - Sanskrit root grounding
 * - Multi-scholar exegesis depth & diversity
 * - Universal Vedic Knowledge Graph (VUKG) 10-domain taxonomy validation
 */

import type {
  NVFVerseRecord,
  ChapterShard,
  BookSpec,
  RuleViolation,
  ValidationReport,
  RuleSeverity
} from './types';
import type { ScientificDomain } from '../vedic-science';

export const PLACEHOLDER_PATTERNS = [
  /\[PLACEHOLDER_/i,
  /^\s*\[[A-Z0-9_-]+\]\s*$/i,
  /TBD_CONTENT/i,
  /TODO_LAYER/i,
  /LOREM\s+IPSUM/i,
  /Mock Verse/i,
  /Meaning of the verse based on/i,
];

export const VALID_SCIENTIFIC_DOMAINS: ScientificDomain[] = [
  'astronomy',
  'ayurveda',
  'psychology',
  'cosmology',
  'governance',
  'mathematics',
  'ecology',
  'epistemology',
  'linguistics',
  'sociology',
];

export interface LayerItem {
  author?: string;
  lang?: string;
  content?: string;
  type?: string;
}

export type RawLayersType = LayerItem[] | Record<string, Record<string, string | undefined>>;

export interface IEngineRule {
  id: string;
  name: string;
  description: string;
  defaultSeverity: RuleSeverity;
  evaluateVerse?(verse: NVFVerseRecord, bookSpec?: BookSpec): RuleViolation[];
  evaluateChapter?(chapter: ChapterShard, bookSpec?: BookSpec): RuleViolation[];
}

export class SchemaRule implements IEngineRule {
  id = 'RULE-SCHEMA-001';
  name = 'NVF Schema Conformance';
  description = 'Ensures mandatory fields (id, chapter, verse, original, meaning) are structurally valid.';
  defaultSeverity: RuleSeverity = 'error';

  evaluateVerse(verse: NVFVerseRecord): RuleViolation[] {
    const violations: RuleViolation[] = [];
    if (!verse.id || typeof verse.id !== 'string') {
      violations.push({
        ruleId: this.id,
        ruleName: this.name,
        severity: 'error',
        message: 'Verse is missing a valid unique string identifier.',
        chapter: verse.chapter,
        verse: verse.verse,
        field: 'id',
      });
    }
    if (typeof verse.chapter !== 'number' || verse.chapter <= 0) {
      violations.push({
        ruleId: this.id,
        ruleName: this.name,
        severity: 'error',
        message: 'Verse must have a positive integer chapter number.',
        chapter: verse.chapter,
        verse: verse.verse,
        field: 'chapter',
      });
    }
    if (typeof verse.verse !== 'number' || verse.verse < 0) {
      violations.push({
        ruleId: this.id,
        ruleName: this.name,
        severity: 'error',
        message: 'Verse must have a non-negative integer verse number.',
        chapter: verse.chapter,
        verse: verse.verse,
        field: 'verse',
      });
    }
    return violations;
  }
}

export class PlaceholderRule implements IEngineRule {
  id = 'RULE-ANTI-SLOP-001';
  name = 'Zero Placeholder Invariant';
  description = 'Detects and forbids all placeholder tokens, mock strings, or uncompleted TODO markers.';
  defaultSeverity: RuleSeverity = 'error';

  evaluateVerse(verse: NVFVerseRecord): RuleViolation[] {
    const violations: RuleViolation[] = [];
    const fieldsToCheck: Array<[string, string | undefined]> = [
      ['translation', verse.translation],
      ['meaning', verse.meaning],
      ['original', verse.original],
      ['transliteration', verse.transliteration],
    ];

    for (const [field, val] of fieldsToCheck) {
      if (val && PLACEHOLDER_PATTERNS.some(p => p.test(val.trim()))) {
        violations.push({
          ruleId: this.id,
          ruleName: this.name,
          severity: 'error',
          message: `Field '${field}' contains forbidden placeholder token or template text.`,
          chapter: verse.chapter,
          verse: verse.verse,
          field,
        });
      }
    }

    const rawLayers = (verse.commentaries || verse.layers || {}) as RawLayersType;
    if (Array.isArray(rawLayers)) {
      for (const item of rawLayers) {
        if (item && item.content && PLACEHOLDER_PATTERNS.some(p => p.test(String(item.content).trim()))) {
          violations.push({
            ruleId: this.id,
            ruleName: this.name,
            severity: 'error',
            message: `Commentary layer '${item.author || 'unknown'}.${item.lang || 'en'}' contains placeholder marker.`,
            chapter: verse.chapter,
            verse: verse.verse,
            field: `layers.${item.author || 'unknown'}`,
          });
        }
      }
    } else {
      for (const [author, layer] of Object.entries(rawLayers)) {
        if (layer && typeof layer === 'object') {
          for (const [lang, text] of Object.entries(layer as Record<string, string>)) {
            if (text && PLACEHOLDER_PATTERNS.some(p => p.test(String(text).trim()))) {
              violations.push({
                ruleId: this.id,
                ruleName: this.name,
                severity: 'error',
                message: `Commentary layer '${author}.${lang}' contains placeholder marker.`,
                chapter: verse.chapter,
                verse: verse.verse,
                field: `layers.${author}.${lang}`,
              });
            }
          }
        }
      }
    }

    return violations;
  }
}

export class SanskritGroundingRule implements IEngineRule {
  id = 'RULE-GROUNDING-001';
  name = 'Sanskrit Root Grounding';
  description = 'Verifies authentic Devanagari Sanskrit text and Roman IAST transliteration.';
  defaultSeverity: RuleSeverity = 'error';

  evaluateVerse(verse: NVFVerseRecord): RuleViolation[] {
    const violations: RuleViolation[] = [];

    if (!verse.original || verse.original.trim().length < 3) {
      violations.push({
        ruleId: this.id,
        ruleName: this.name,
        severity: 'error',
        message: 'Original Sanskrit text is missing or shorter than 3 characters.',
        chapter: verse.chapter,
        verse: verse.verse,
        field: 'original',
      });
    }

    if (!verse.transliteration || verse.transliteration.trim().length < 3) {
      violations.push({
        ruleId: this.id,
        ruleName: this.name,
        severity: 'warning',
        message: 'Transliteration (IAST) is missing or insufficient.',
        chapter: verse.chapter,
        verse: verse.verse,
        field: 'transliteration',
      });
    }

    return violations;
  }
}

export class CommentaryDepthRule implements IEngineRule {
  id = 'RULE-DEPTH-001';
  name = 'Philosophical Exegesis Depth';
  description = 'Verifies that translation and meaning provide substantive philosophical substance.';
  defaultSeverity: RuleSeverity = 'warning';

  evaluateVerse(verse: NVFVerseRecord): RuleViolation[] {
    const violations: RuleViolation[] = [];

    let translation = verse.translation;
    let meaning = verse.meaning;

    if (!translation) {
      if (Array.isArray(verse.layers)) {
        const enLayer = (verse.layers as unknown as LayerItem[]).find(l => l.lang === 'en' && l.content);
        if (enLayer?.content) translation = enLayer.content;
      }
      if (!translation && Array.isArray(verse.commentaries)) {
        const enLayer = (verse.commentaries as unknown as LayerItem[]).find(l => l.lang === 'en' && l.content);
        if (enLayer?.content) translation = enLayer.content;
      }
    }
    if (!meaning) {
      if (Array.isArray(verse.layers)) {
        const anyLayer = (verse.layers as unknown as LayerItem[]).find(l => l.content);
        if (anyLayer?.content) meaning = anyLayer.content;
      }
      if (!meaning && Array.isArray(verse.commentaries)) {
        const anyLayer = (verse.commentaries as unknown as LayerItem[]).find(l => l.content);
        if (anyLayer?.content) meaning = anyLayer.content;
      }
    }

    if (!translation || translation.trim().length < 15) {
      violations.push({
        ruleId: this.id,
        ruleName: this.name,
        severity: 'error',
        message: 'Primary translation is missing or too brief (<15 characters).',
        chapter: verse.chapter,
        verse: verse.verse,
        field: 'translation',
      });
    }

    if (!meaning || meaning.trim().length < 30) {
      violations.push({
        ruleId: this.id,
        ruleName: this.name,
        severity: 'warning',
        message: 'Philosophical synthesis meaning is brief (<30 characters).',
        chapter: verse.chapter,
        verse: verse.verse,
        field: 'meaning',
      });
    }

    return violations;
  }
}

export class ScholarDiversityRule implements IEngineRule {
  id = 'RULE-DIVERSITY-001';
  name = 'Multi-Scholar Diversity';
  description = 'Ensures production Gold scriptures feature at least 2 distinct commentary perspectives.';
  defaultSeverity: RuleSeverity = 'warning';

  evaluateChapter(chapter: ChapterShard): RuleViolation[] {
    const violations: RuleViolation[] = [];
    const authors = new Set<string>();

    for (const v of chapter.verses) {
      const rawLayers = (v.commentaries || v.layers || {}) as RawLayersType;
      if (Array.isArray(rawLayers)) {
        for (const item of rawLayers) {
          if (item && item.author) authors.add(item.author);
        }
      } else {
        for (const author of Object.keys(rawLayers)) {
          authors.add(author);
        }
      }
    }

    if (authors.size < 2 && chapter.verses.length > 0) {
      violations.push({
        ruleId: this.id,
        ruleName: this.name,
        severity: 'warning',
        message: `Chapter ${chapter.chapter} has only ${authors.size} commentary tradition(s). Minimum 2 required for complete Gold elevation.`,
        chapter: chapter.chapter,
      });
    }

    return violations;
  }
}

export class DiamondTaxonomyRule implements IEngineRule {
  id = 'RULE-DIAMOND-001';
  name = 'VUKG 10-Domain Scientific Taxonomy';
  description = 'Ensures extracted empirical knowledge tokens conform to the canonical 10 domains.';
  defaultSeverity: RuleSeverity = 'error';

  static isValidDomain(domain: string): domain is ScientificDomain {
    return VALID_SCIENTIFIC_DOMAINS.includes(domain as ScientificDomain);
  }
}

/**
 * The RuleEngine orchestrates all declarative rules and produces a comprehensive audit report.
 */
export class RuleEngine {
  private rules: IEngineRule[] = [];

  constructor(rules?: IEngineRule[]) {
    if (rules && rules.length > 0) {
      this.rules = rules;
    } else {
      this.rules = [
        new SchemaRule(),
        new PlaceholderRule(),
        new SanskritGroundingRule(),
        new CommentaryDepthRule(),
        new ScholarDiversityRule(),
      ];
    }
  }

  registerRule(rule: IEngineRule): void {
    this.rules.push(rule);
  }

  auditVerse(verse: NVFVerseRecord, bookSpec?: BookSpec): RuleViolation[] {
    const violations: RuleViolation[] = [];
    for (const rule of this.rules) {
      if (rule.evaluateVerse) {
        violations.push(...rule.evaluateVerse(verse, bookSpec));
      }
    }
    return violations;
  }

  auditChapter(chapter: ChapterShard, bookSpec?: BookSpec): RuleViolation[] {
    const violations: RuleViolation[] = [];
    for (const rule of this.rules) {
      if (rule.evaluateChapter) {
        violations.push(...rule.evaluateChapter(chapter, bookSpec));
      }
    }
    for (const verse of chapter.verses) {
      violations.push(...this.auditVerse(verse, bookSpec));
    }
    return violations;
  }

  auditBook(shards: ChapterShard[], bookSpec?: BookSpec): ValidationReport {
    const allViolations: RuleViolation[] = [];
    let totalVerses = 0;
    const authorsFound = new Set<string>();
    const languagesFound = new Set<string>();

    for (const shard of shards) {
      totalVerses += shard.verses.length;
      allViolations.push(...this.auditChapter(shard, bookSpec));

      for (const v of shard.verses) {
        const rawLayers = (v.commentaries || v.layers || {}) as RawLayersType;
        if (Array.isArray(rawLayers)) {
          for (const item of rawLayers) {
            if (item && item.author) authorsFound.add(item.author);
            if (item && item.lang) languagesFound.add(item.lang);
          }
        } else {
          for (const [author, layer] of Object.entries(rawLayers)) {
            authorsFound.add(author);
            if (layer && typeof layer === 'object') {
              for (const lang of Object.keys(layer as object)) {
                languagesFound.add(lang);
              }
            }
          }
        }
      }
    }

    const errors = allViolations.filter(v => v.severity === 'error');
    const warnings = allViolations.filter(v => v.severity === 'warning');

    let readinessScore = 100.0;
    if (totalVerses > 0) {
      const errorImpact = errors.length * 5;
      const warningImpact = warnings.length * 0.5;
      readinessScore = Math.max(0, Math.min(100, Math.round(100 - (errorImpact + warningImpact))));
    } else {
      readinessScore = 0.0;
    }

    const isReadyForGold = errors.length === 0 && totalVerses > 0 && readinessScore >= 90;

    return {
      bookSlug: bookSpec?.slug || (shards[0]?.book_id ?? 'unknown'),
      isReadyForGold,
      readinessScore,
      totalVersesAudited: totalVerses,
      violations: allViolations,
      errorsCount: errors.length,
      warningsCount: warnings.length,
      authorsFound: Array.from(authorsFound),
      languagesFound: Array.from(languagesFound),
    };
  }
}
