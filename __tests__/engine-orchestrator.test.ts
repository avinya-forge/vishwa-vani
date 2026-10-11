import { VishwaVaniEngine } from '../lib/engine/orchestrator';
import type { BookSpec, RawVerseInput } from '../lib/engine/types';
import { isTextCompleted, getTextBySlug } from '../lib/texts';
import { getChapterSummariesBySlug } from '../lib/chapter-summaries';
import { getKnowledgeTokensByScripture } from '../lib/vedic-science';

describe('VishwaVaniEngine (Autonomous Scripture Orchestrator)', () => {
  const engine = new VishwaVaniEngine();

  const mockSpec: BookSpec = {
    slug: 'mandukya-upanishad',
    name: 'Mandukya Upanishad',
    nameDevanagari: 'माण्डूक्योपनिषद्',
    nameHi: 'माण्डूक्योपनिषद्',
    nameMr: 'माण्डूक्योपनिषद्',
    category: 'upanishad',
    totalChapters: 1,
    description: 'The supreme distillation of consciousness across 4 states (Jagrat, Svapna, Sushupti, Turiya).',
  };

  const mockRawVerses: RawVerseInput[] = [
    {
      chapter: 1,
      verse: 1,
      original: 'ओमित्येतदक्षरमिदं सर्वं तस्योपव्याख्यानं भूतं भवद् भविष्यदिति सर्वमोङ्कार एव ॥',
      transliteration: 'omity-etad-akṣaram-idaṃ sarvaṃ tasyopavyākhyānaṃ bhūtaṃ bhavad bhaviṣyad-iti sarvam-oṅkāra eva ||',
      translation: 'OM — this syllable is this whole universe. Its explanation is: what was, what is, and what will be, all is verily OM.',
      meaning: 'The acoustic totality of OM encompasses past, present, and future, serving as direct pointer to non-dual Brahman.',
    },
    {
      chapter: 1,
      verse: 2,
      original: 'सर्वं ह्येतद् ब्रह्म अयमात्मा ब्रह्म सोऽयमात्मा चतुष्पात् ॥',
      transliteration: 'sarvaṃ hy-etad brahma ayam-ātmā brahma so\'yam-ātmā catuṣpāt ||',
      translation: 'All this is verily Brahman. This Self is Brahman (Ayam Atma Brahma). This Self has four quarters or states.',
      meaning: 'The Mahavakya establishes identity between individual awareness and supreme cosmic reality across 4 modalities.',
    },
  ];

  it('audits existing canonical books with 100% readiness', () => {
    const report = engine.auditBook('isha-upanishad');
    expect(report.isReadyForGold).toBe(true);
    expect(report.readinessScore).toBe(100);
    expect(report.errorsCount).toBe(0);
    expect(report.totalVersesAudited).toBe(19);
  });

  it('processes a new scripture end-to-end in dry-run mode', async () => {
    const result = await engine.processBookEndToEnd(mockSpec, mockRawVerses, {
      dryRun: true,
      extractDiamondTier: true,
    });

    expect(result.success).toBe(true);
    expect(result.stageReached).toBe('published');
    expect(result.totalVerses).toBe(2);
    expect(result.auditReport.isReadyForGold).toBe(true);
    expect(result.auditReport.errorsCount).toBe(0);
    expect(result.extractedTokensCount).toBeGreaterThan(0);
    expect(result.hasSummaries).toBe(true);
  });

  it('dynamically registers graduated scriptures into runtime UI memory', async () => {
    const result = await engine.processBookEndToEnd(mockSpec, mockRawVerses, {
      dryRun: false,
      autoPromote: true,
      syncToLake: false,
      extractDiamondTier: true,
    });

    expect(result.success).toBe(true);

    // 1. Library & Text Registry verification
    const text = getTextBySlug('mandukya-upanishad');
    expect(text).toBeDefined();
    expect(text?.name).toBe('Mandukya Upanishad');
    expect(isTextCompleted('mandukya-upanishad')).toBe(true);

    // 2. Chapter Summaries dynamic registration verification
    const summaries = getChapterSummariesBySlug('mandukya-upanishad');
    expect(summaries).toBeDefined();
    expect(summaries?.chapters.length).toBe(1);
    expect(summaries?.chapters[0].short.topics.length).toBeGreaterThan(0);

    // 3. Diamond Tier dynamic registration verification
    const tokens = getKnowledgeTokensByScripture('mandukya-upanishad');
    expect(tokens.length).toBeGreaterThan(0);
  });
});
