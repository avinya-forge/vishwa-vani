import { AIAgentScriptureAdapter } from '../lib/engine/ai-adapter';
import type { NVFVerseRecord } from '../lib/engine/types';
import { calculateReadingTime } from '../lib/chapter-summaries';

describe('AIAgentScriptureAdapter (Intelligence Extraction Engine)', () => {
  const adapter = new AIAgentScriptureAdapter();

  const mockVerses: NVFVerseRecord[] = [
    {
      id: 'katha_1_1',
      text_slug: 'katha-upanishad',
      chapter: 1,
      verse: 1,
      original: 'उशन् ह वै वाजश्रवसः सर्ववेदसं ददौ । तस्य ह नचिकेता नाम पुत्र आस ॥',
      transliteration: 'uśan ha vai vājaśravasaḥ sarva-vedasaṃ dadau | tasya ha naciketā nāma putra āsa ||',
      translation: 'Desiring celestial fruits, Vajashravasa gave away all his possessions in sacrifice. He had a son named Nachiketa.',
      meaning: 'The narrative opens with ritual sacrifice contrasted against authentic spiritual thirst for truth beyond ephemeral wealth.',
    },
    {
      id: 'katha_1_2',
      text_slug: 'katha-upanishad',
      chapter: 1,
      verse: 2,
      original: 'तं ह कुमारं सन्तं दक्षिणासु नीयमानासु श्रद्धाविवेश सोऽमन्यत ॥',
      transliteration: 'taṃ ha kumāraṃ santaṃ dakṣiṇāsu nīyamānāsu śraddhāviveśa so\'manyata ||',
      translation: 'As the barren sacrificial cows were being led away as offerings, faith and spiritual conviction entered the boy Nachiketa.',
      meaning: 'Shraddha is an awakening of cognitive discernment, questioning superficial formal rites in pursuit of eternal Atman consciousness.',
    },
  ];

  it('generates a complete 4-tier chapter summary', async () => {
    const summary = await adapter.generateChapterSummary(
      'katha-upanishad',
      1,
      mockVerses,
      'Katha Upanishad'
    );

    expect(summary.chapter).toBe(1);
    expect(summary.totalVerses).toBe(2);

    // Tier 1: veryShort
    expect(summary.veryShort).toBeDefined();
    expect(summary.veryShort.length).toBeGreaterThan(20);

    // Tier 2: short
    expect(summary.short.topics.length).toBeGreaterThanOrEqual(1);
    expect(summary.short.coreDilemma).toBeDefined();
    expect(summary.short.philosophicalResolution).toBeDefined();
    expect(summary.short.anchorVerse.verse).toBeDefined();
    expect(summary.short.anchorVerse.deepDiveUrl).toContain('/katha-upanishad/1#');

    // Tier 3: long
    expect(summary.long.overview).toBeDefined();
    expect(summary.long.thematicSections.length).toBeGreaterThanOrEqual(1);
    expect(summary.long.scholarPerspectives.length).toBeGreaterThanOrEqual(2);
    expect(summary.long.conclusions.length).toBeGreaterThanOrEqual(1);

    // Tier 4: veryLong
    expect(summary.veryLong.purvapaksha.length).toBeGreaterThanOrEqual(1);
    expect(summary.veryLong.siddhanta.length).toBeGreaterThanOrEqual(1);
    expect(summary.veryLong.sadhanaInstructions.length).toBeGreaterThanOrEqual(1);
    expect(summary.veryLong.etymologicalNotes.length).toBeGreaterThanOrEqual(1);

    // Dynamic WPM verification
    const readTime = calculateReadingTime(summary.veryShort);
    expect(readTime).toBeGreaterThanOrEqual(1);
  });

  it('extracts Diamond Tier empirical knowledge tokens from verse keywords', async () => {
    const tokens = await adapter.extractDiamondKnowledgeTokens(
      'katha-upanishad',
      1,
      mockVerses,
      'Katha Upanishad'
    );

    expect(tokens.length).toBeGreaterThan(0);
    const psychologyToken = tokens.find(t => t.domain === 'psychology');
    expect(psychologyToken).toBeDefined();
    expect(psychologyToken?.title).toContain('Cognitive Science');
    expect(psychologyToken?.sanskritTerm).toContain('Citta');
    expect(psychologyToken?.keyCitations[0].verseUrl).toContain('/katha-upanishad/1#2');
  });

  it('synthesizes multi-scholar commentary layers in trilingual format', async () => {
    const layers = await adapter.synthesizeMultiScholarLayer(mockVerses[0], [
      'Adi Shankara (Advaita)',
      'Sri Ramanuja (Vishishtadvaita)',
    ]);

    expect(Object.keys(layers).length).toBe(2);
    const shankaraLayer = Object.values(layers)[0];
    expect(shankaraLayer.en).toBeDefined();
    expect(shankaraLayer.hi).toBeDefined();
    expect(shankaraLayer.mr).toBeDefined();
    expect(shankaraLayer.en?.length).toBeGreaterThan(40);
  });
});
