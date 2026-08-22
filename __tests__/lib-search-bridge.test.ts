import type { SearchResult, SearchWorkerMessage } from '@/lib/search-bridge';

describe('SearchBridge Interfaces & Payload Pruning', () => {
  it('instantiates valid SearchResult interface shapes', () => {
    const mockResult: SearchResult = {
      textSlug: 'bhagavad-gita',
      chapter: 2,
      verse: 47,
      slok: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन',
      transliteration: 'karmaṇy-evādhikāras te',
      relevance: 1,
    };

    expect(mockResult.textSlug).toBe('bhagavad-gita');
    expect(mockResult.chapter).toBe(2);
    expect(mockResult.verse).toBe(47);
  });

  it('instantiates valid SearchWorkerMessage interfaces', () => {
    const msg: SearchWorkerMessage = {
      type: 'QUERY_SUCCESS',
      id: 123,
      payload: { results: [] },
    };

    expect(msg.type).toBe('QUERY_SUCCESS');
    expect(msg.id).toBe(123);
  });
});
