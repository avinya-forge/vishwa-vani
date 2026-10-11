import {
  RuleEngine,
  SchemaRule,
  PlaceholderRule,
  SanskritGroundingRule,
  CommentaryDepthRule,
  ScholarDiversityRule,
  DiamondTaxonomyRule,
  VALID_SCIENTIFIC_DOMAINS,
} from '../lib/engine/rules';
import type { NVFVerseRecord, ChapterShard } from '../lib/engine/types';

describe('VishwaVani Universal Rule-Sets Engine', () => {
  const validVerse: NVFVerseRecord = {
    id: 'test_1_1',
    text_slug: 'test-scripture',
    chapter: 1,
    verse: 1,
    original: 'ॐ तत् सत् इति निर्देशो ब्रह्मणस्त्रिविधः स्मृतः ।',
    transliteration: 'om tat sat iti nirdeśo brahmaṇas tri-vidhaḥ smṛtaḥ |',
    translation: 'OM, TAT, SAT — this is declared as the threefold symbolic designation of the supreme Brahman.',
    meaning: 'The threefold formula purifies action, dedicating sacrifice, austerity, and charity directly to the eternal.',
    commentaries: {
      'adi-shankara': {
        en: 'Shankara explains that OM TAT SAT removes blemishes from Vedic rituals, consecrating them to the Absolute.',
        hi: 'शंकराचार्य स्पष्ट करते हैं कि ॐ तत् सत् सभी क्रियाओं को ब्रह्मार्पण करता है।',
        mr: 'शंकराचार्य सांगतात की ॐ तत् सत् हे सर्व कर्मांना परब्रह्माशी जोडते.',
      },
      'sant-dnyaneshwar': {
        en: 'Dnyaneshwar reveals that OM is the name, TAT is the transcendence, and SAT is the presence of the Divine.',
        hi: 'ज्ञानेश्वर महाराज बताते हैं कि ॐ नाम है, तत् पारलौकिक सत्य है और सत् नित्य अस्तित्व है।',
        mr: 'ज्ञानेश्वर माउली म्हणतात ॐ हे नाम, तत् हे परब्रह्म आणि सत् हे विश्वाचे नित्य अस्तित्व.',
      },
    },
  };

  describe('SchemaRule', () => {
    const rule = new SchemaRule();

    it('passes for a well-formed verse', () => {
      const violations = rule.evaluateVerse(validVerse);
      expect(violations).toHaveLength(0);
    });

    it('flags missing id and invalid chapter/verse numbers', () => {
      const badVerse = { ...validVerse, id: '', chapter: 0, verse: -1 };
      const violations = rule.evaluateVerse(badVerse);
      expect(violations.length).toBeGreaterThanOrEqual(3);
      expect(violations.some(v => v.field === 'id')).toBe(true);
      expect(violations.some(v => v.field === 'chapter')).toBe(true);
      expect(violations.some(v => v.field === 'verse')).toBe(true);
    });

    it('permits invocatory shanti mantras with verse index 0', () => {
      const invocatoryVerse = { ...validVerse, verse: 0 };
      const violations = rule.evaluateVerse(invocatoryVerse);
      expect(violations).toHaveLength(0);
    });
  });

  describe('PlaceholderRule', () => {
    const rule = new PlaceholderRule();

    it('passes for clean authentic text', () => {
      const violations = rule.evaluateVerse(validVerse);
      expect(violations).toHaveLength(0);
    });

    it('detects placeholder tags in translation and meaning', () => {
      const badVerse = {
        ...validVerse,
        translation: '[PLACEHOLDER_TRANSLATION_1_1]',
        meaning: 'TODO_LAYER: meaning to be added later',
      };
      const violations = rule.evaluateVerse(badVerse);
      expect(violations.length).toBe(2);
      expect(violations[0].field).toBe('translation');
      expect(violations[1].field).toBe('meaning');
    });

    it('detects placeholders in nested map commentary layers', () => {
      const badVerse: NVFVerseRecord = {
        ...validVerse,
        commentaries: {
          'test-author': {
            en: 'LOREM IPSUM dolor sit amet text',
          },
        },
      };
      const violations = rule.evaluateVerse(badVerse);
      expect(violations.length).toBe(1);
      expect(violations[0].message).toContain('placeholder marker');
    });

    it('detects placeholders in array commentary layers', () => {
      const badVerse = {
        ...validVerse,
        commentaries: undefined,
        layers: [
          { author: 'test-author', lang: 'en', content: '[PLACEHOLDER_COMMENTARY]' },
        ],
      } as unknown as NVFVerseRecord;
      const violations = rule.evaluateVerse(badVerse);
      expect(violations.length).toBe(1);
      expect(violations[0].message).toContain('placeholder marker');
    });
  });

  describe('SanskritGroundingRule', () => {
    const rule = new SanskritGroundingRule();

    it('passes for authentic Sanskrit with transliteration', () => {
      const violations = rule.evaluateVerse(validVerse);
      expect(violations).toHaveLength(0);
    });

    it('fails when Sanskrit original is missing', () => {
      const badVerse = { ...validVerse, original: '' };
      const violations = rule.evaluateVerse(badVerse);
      expect(violations.length).toBe(1);
      expect(violations[0].field).toBe('original');
    });

    it('warns when IAST transliteration is missing', () => {
      const badVerse = { ...validVerse, transliteration: '' };
      const violations = rule.evaluateVerse(badVerse);
      expect(violations.length).toBe(1);
      expect(violations[0].severity).toBe('warning');
      expect(violations[0].field).toBe('transliteration');
    });
  });

  describe('CommentaryDepthRule', () => {
    const rule = new CommentaryDepthRule();

    it('passes for full substantive verse', () => {
      const violations = rule.evaluateVerse(validVerse);
      expect(violations).toHaveLength(0);
    });

    it('flags too short translation', () => {
      const badVerse = { ...validVerse, translation: 'Short' };
      const violations = rule.evaluateVerse(badVerse);
      expect(violations.length).toBe(1);
      expect(violations[0].field).toBe('translation');
    });

    it('resolves translation from array layers if missing at root', () => {
      const arrayVerse = {
        ...validVerse,
        translation: '',
        layers: [
          { lang: 'en', content: 'Substantive English translation from array layer.' },
        ],
      } as unknown as NVFVerseRecord;
      const violations = rule.evaluateVerse(arrayVerse);
      expect(violations.some(v => v.field === 'translation')).toBe(false);
    });
  });

  describe('ScholarDiversityRule', () => {
    const rule = new ScholarDiversityRule();

    it('passes when chapter contains 2 or more distinct scholars', () => {
      const shard: ChapterShard = {
        book_id: 'test',
        chapter: 1,
        total_verses: 1,
        verses: [validVerse],
      };
      const violations = rule.evaluateChapter(shard);
      expect(violations).toHaveLength(0);
    });

    it('warns when chapter has fewer than 2 scholars', () => {
      const singleScholarVerse: NVFVerseRecord = {
        ...validVerse,
        commentaries: {
          'single-scholar': { en: 'Only one perspective' },
        },
      };
      const shard: ChapterShard = {
        book_id: 'test',
        chapter: 1,
        total_verses: 1,
        verses: [singleScholarVerse],
      };
      const violations = rule.evaluateChapter(shard);
      expect(violations).toHaveLength(1);
      expect(violations[0].severity).toBe('warning');
    });
  });

  describe('DiamondTaxonomyRule', () => {
    it('validates all 10 canonical scientific domains', () => {
      expect(VALID_SCIENTIFIC_DOMAINS).toHaveLength(10);
      expect(DiamondTaxonomyRule.isValidDomain('astronomy')).toBe(true);
      expect(DiamondTaxonomyRule.isValidDomain('ayurveda')).toBe(true);
      expect(DiamondTaxonomyRule.isValidDomain('psychology')).toBe(true);
      expect(DiamondTaxonomyRule.isValidDomain('cosmology')).toBe(true);
      expect(DiamondTaxonomyRule.isValidDomain('governance')).toBe(true);
      expect(DiamondTaxonomyRule.isValidDomain('mathematics')).toBe(true);
      expect(DiamondTaxonomyRule.isValidDomain('ecology')).toBe(true);
      expect(DiamondTaxonomyRule.isValidDomain('epistemology')).toBe(true);
      expect(DiamondTaxonomyRule.isValidDomain('linguistics')).toBe(true);
      expect(DiamondTaxonomyRule.isValidDomain('sociology')).toBe(true);
      expect(DiamondTaxonomyRule.isValidDomain('invalid-domain')).toBe(false);
    });
  });

  describe('RuleEngine Integration', () => {
    it('audits a complete book shard and generates readiness score', () => {
      const engine = new RuleEngine();
      const shard: ChapterShard = {
        book_id: 'test-scripture',
        chapter: 1,
        total_verses: 1,
        verses: [validVerse],
      };

      const report = engine.auditBook([shard]);
      expect(report.isReadyForGold).toBe(true);
      expect(report.readinessScore).toBe(100);
      expect(report.totalVersesAudited).toBe(1);
      expect(report.errorsCount).toBe(0);
      expect(report.authorsFound).toContain('adi-shankara');
      expect(report.authorsFound).toContain('sant-dnyaneshwar');
    });
  });
});
