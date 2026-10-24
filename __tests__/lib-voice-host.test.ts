import {
  buildVoiceHostPrompt,
  synthesizeCompanionResponse,
  type VoiceHostPromptPayload,
} from '@/lib/audio/voice-host';

describe('Hierarchical Dual-Context Voice Host (lib/audio/voice-host.ts)', () => {
  const mockPayload: VoiceHostPromptPayload = {
    query: 'Why should one act without desiring the fruits?',
    anchor: {
      bookSlug: 'bhagavad-gita',
      bookTitle: 'Bhagavad Gita',
      chapter: 2,
      chapterTitle: 'Sankhya Yoga',
      activeVerses: [
        {
          verse: 47,
          original: 'कर्मण्येवाधिकारस्ते...',
          translation: 'You have a right to perform your duty, but not to the fruits.',
          meaning: 'Selfless action without attachment purifies the mind.',
        },
      ],
      chapterSummary: 'Krishna instructs Arjuna on the nature of duty, detachment, and the steady intellect.',
    },
    crossCorpusMatches: [
      {
        bookTitle: 'Isha Upanishad',
        chapter: 1,
        verse: 2,
        text: 'Performing karma in this world without selfish craving, one lives a hundred years in freedom.',
      },
    ],
    language: 'en',
  };

  test('buildVoiceHostPrompt places the active chapter in highest-priority primary position', () => {
    const prompt = buildVoiceHostPrompt(mockPayload);

    expect(prompt).toContain('SEEKER\'S QUESTION:');
    expect(prompt).toContain('Why should one act without desiring the fruits?');
    expect(prompt).toContain('PRIMARY ANCHOR CONTEXT (The Chapter Being Listened To - HIGHEST PRIORITY):');
    expect(prompt).toContain('Bhagavad Gita (Chapter 2: Sankhya Yoga)');
    expect(prompt).toContain('SECONDARY GLOBAL CORPUS CONTEXT');
    expect(prompt).toContain('Isha Upanishad');
    expect(prompt).toContain('2 to 4 sentences maximum');
  });

  test('buildVoiceHostPrompt supports Hindi and Marathi target languages', () => {
    const promptHi = buildVoiceHostPrompt({ ...mockPayload, language: 'hi' });
    expect(promptHi).toContain('in Hindi');

    const promptMr = buildVoiceHostPrompt({ ...mockPayload, language: 'mr' });
    expect(promptMr).toContain('in Marathi');
  });

  test('synthesizeCompanionResponse generates deterministic anchor response when offline or keyless', async () => {
    const response = await synthesizeCompanionResponse(mockPayload, '');

    expect(response).toBeDefined();
    expect(response.mode).toBe('deterministic_anchor');
    expect(response.primaryCitations[0]).toContain('Bhagavad Gita Chapter 2');
    expect(response.crossCorpusCitations[0]).toContain('Isha Upanishad 1.2');
    expect(response.answer.length).toBeGreaterThan(30);
    expect(response.answer).toContain('Bhagavad Gita');
  });

  test('synthesizeCompanionResponse generates localized fallback in Hindi and Marathi', async () => {
    const responseHi = await synthesizeCompanionResponse({ ...mockPayload, language: 'hi' }, '');
    expect(responseHi.answer).toContain('अध्याय 2');
    expect(responseHi.answer).toContain('शांति');

    const responseMr = await synthesizeCompanionResponse({ ...mockPayload, language: 'mr' }, '');
    expect(responseMr.answer).toContain('अध्याय 2');
    expect(responseMr.answer).toContain('विश्राम');
  });
});
