import {
  cleanForSpeech,
  calculateEstimatedDuration,
  buildChapterPodcastManifest,
  type PodcastVerseInput,
} from '@/lib/audio/podcast-engine';

describe('Chapter Podcast Narration Engine (lib/audio/podcast-engine.ts)', () => {
  const mockVerses: PodcastVerseInput[] = [
    {
      id: 'bg_2_47',
      text_slug: 'bhagavad-gita',
      chapter: 2,
      verse: 47,
      original: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥ ४७ ॥',
      transliteration: 'karmaṇy-evādhikāras te mā phaleṣu kadācana |',
      translation: 'You have a right to perform your prescribed duty, but not to the fruits of action.',
      meaning: 'Perform your duties without selfish craving for the outcome.',
      translationHi: 'तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं।',
      translationMr: 'तुझा अधिकार केवळ कर्म करण्यावरच आहे, फळावर कधीही नाही.',
      layers: {
        shankara: {
          en: '[Adi Shankara] Action performed with expectation binds the soul to samsara.',
          hi: '[आदि शंकराचार्य] फल की इच्छा से किया गया कर्म बंधन उत्पन्न करता है।',
          mr: '[आद्य शंकराचार्य] फळाची आसक्ती ठेवून केलेले कर्म आत्म्याला संसारात बांधून ठेवते.',
        },
      },
    },
    {
      chapter: 2,
      verse: 48,
      original: 'योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय । सिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते ॥ ४८ ॥',
      transliteration: 'yoga-sthaḥ kuru karmāṇi saṅgaṁ tyaktvā dhanañjaya |',
      translation: 'Perform your duty equipoised, O Arjuna, abandoning all attachment to success or failure.',
      meaning: 'Equanimity in success and failure is called Yoga.',
    },
  ];

  test('cleanForSpeech strips citations, bracketed names, markdown, and danda marks', () => {
    const raw = '[1.2] **कर्मण्येवाधिकारस्ते** | [Adi Shankara] *Wisdom* ॥ ४७ ॥';
    const cleaned = cleanForSpeech(raw);

    expect(cleaned).not.toContain('[1.2]');
    expect(cleaned).not.toContain('[Adi Shankara]');
    expect(cleaned).not.toContain('**');
    expect(cleaned).not.toContain('*');
    expect(cleaned).not.toContain('|');
    expect(cleaned).toContain('कर्मण्येवाधिकारस्ते');
    expect(cleaned).toContain('Wisdom');
  });

  test('calculateEstimatedDuration reflects bedtime pacing and pauses', () => {
    const segments = [
      {
        id: 's1',
        type: 'verse_chant' as const,
        speaker: 'Sage' as const,
        language: 'sa' as const,
        text: 'Om Namo Bhagavate Vasudevaya',
        pauseAfterMs: 2000,
      },
    ];

    const bedtimeSec = calculateEstimatedDuration(segments, 'bedtime_relaxing');
    const studySec = calculateEstimatedDuration(segments, 'study');

    expect(bedtimeSec).toBeGreaterThan(0);
    expect(bedtimeSec).toBeGreaterThanOrEqual(studySec);
  });

  test('buildChapterPodcastManifest builds a complete bedtime playlist with intro and outro', () => {
    const manifest = buildChapterPodcastManifest({
      bookSlug: 'bhagavad-gita',
      bookTitle: 'Bhagavad Gita',
      chapter: 2,
      chapterTitle: 'Sankhya Yoga',
      verses: mockVerses,
      language: 'en',
      pacingMode: 'bedtime_relaxing',
      includeCommentary: true,
    });

    expect(manifest.bookSlug).toBe('bhagavad-gita');
    expect(manifest.chapter).toBe(2);
    expect(manifest.totalVerses).toBe(2);
    expect(manifest.estimatedDurationSeconds).toBeGreaterThan(0);

    // Intro check
    expect(manifest.segments[0].type).toBe('intro');
    expect(manifest.segments[0].text).toContain('Welcome to chapter 2');

    // Chants & meanings present
    const chants = manifest.segments.filter((s) => s.type === 'verse_chant');
    const meanings = manifest.segments.filter((s) => s.type === 'verse_meaning');
    const commentaries = manifest.segments.filter((s) => s.type === 'commentary_insight');

    expect(chants).toHaveLength(2);
    expect(meanings).toHaveLength(2);
    expect(commentaries.length).toBeGreaterThanOrEqual(1);

    // Outro check
    const outro = manifest.segments[manifest.segments.length - 1];
    expect(outro.type).toBe('outro');
    expect(outro.text).toContain('Om Shanti');
  });

  test('buildChapterPodcastManifest supports Hindi and Marathi localized narrations', () => {
    const manifestHi = buildChapterPodcastManifest({
      bookSlug: 'bhagavad-gita',
      chapter: 2,
      verses: mockVerses,
      language: 'hi',
    });

    expect(manifestHi.segments[0].text).toContain('स्वागत');
    const hiMeaning = manifestHi.segments.find((s) => s.type === 'verse_meaning');
    expect(hiMeaning?.text).toContain('तुम्हारा अधिकार केवल कर्म करने में है');

    const manifestMr = buildChapterPodcastManifest({
      bookSlug: 'bhagavad-gita',
      chapter: 2,
      verses: mockVerses,
      language: 'mr',
    });

    expect(manifestMr.segments[0].text).toContain('स्वागत');
    const mrMeaning = manifestMr.segments.find((s) => s.type === 'verse_meaning');
    expect(mrMeaning?.text).toContain('तुझा अधिकार केवळ कर्म करण्यावरच आहे');
  });

  test('buildChapterPodcastManifest respects chant_only mode', () => {
    const manifest = buildChapterPodcastManifest({
      bookSlug: 'bhagavad-gita',
      chapter: 2,
      verses: mockVerses,
      pacingMode: 'chant_only',
    });

    expect(manifest.segments.every((s) => s.type === 'verse_chant')).toBe(true);
    expect(manifest.segments).toHaveLength(2);
  });
});
