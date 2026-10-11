import {
  getOrCreateVisitorId,
  trackEvent,
  trackSearch,
  trackZeroResultSearch,
  trackScholarSelection,
  trackLanguagePreference,
  trackBookmarkToggle,
  trackKnowledgeTokenView,
  trackChapterRead,
  trackNewsletterSubscribe
} from '@/lib/analytics'

describe('lib/analytics Telemetry Engine', () => {
  beforeEach(() => {
    localStorage.clear()
    delete (window as unknown as { gtag?: unknown }).gtag
    jest.clearAllMocks()
  })

  test('getOrCreateVisitorId generates and persists a UUID in localStorage', () => {
    const id1 = getOrCreateVisitorId()
    expect(id1).toBeTruthy()
    expect(typeof id1).toBe('string')
    expect(localStorage.getItem('vv_visitor_id')).toBe(id1)

    // Second call reuses existing ID
    const id2 = getOrCreateVisitorId()
    expect(id2).toBe(id1)
  })

  test('trackEvent safely degrades when window.gtag is not defined', () => {
    expect(() => {
      trackEvent('test_event', { key: 'val' })
    }).not.toThrow()
  })

  test('trackEvent calls window.gtag with visitor_id and timestamp when available', () => {
    const mockGtag = jest.fn()
    window.gtag = mockGtag

    trackEvent('custom_action', { foo: 'bar' })

    expect(mockGtag).toHaveBeenCalledTimes(1)
    expect(mockGtag).toHaveBeenCalledWith(
      'event',
      'custom_action',
      expect.objectContaining({
        foo: 'bar',
        visitor_id: expect.any(String),
        client_timestamp: expect.any(String)
      })
    )
  })

  test('trackSearch dispatches search event with sanitized query', () => {
    const mockGtag = jest.fn()
    window.gtag = mockGtag

    trackSearch('  Karma Yoga  ', 'bhagavad-gita', 12)

    expect(mockGtag).toHaveBeenCalledWith(
      'event',
      'search',
      expect.objectContaining({
        search_term: 'karma yoga',
        scripture_filter: 'bhagavad-gita',
        results_count: 12
      })
    )
  })

  test('trackSearch fires zero_result_search when resultsCount is 0', () => {
    const mockGtag = jest.fn()
    window.gtag = mockGtag

    trackSearch('unknown scripture', 'all', 0)

    expect(mockGtag).toHaveBeenCalledTimes(2)
    expect(mockGtag).toHaveBeenNthCalledWith(
      1,
      'event',
      'search',
      expect.objectContaining({
        search_term: 'unknown scripture',
        results_count: 0
      })
    )
    expect(mockGtag).toHaveBeenNthCalledWith(
      2,
      'event',
      'zero_result_search',
      expect.objectContaining({
        search_term: 'unknown scripture',
        scripture_filter: 'all'
      })
    )
  })

  test('trackZeroResultSearch directly dispatches zero_result_search event', () => {
    const mockGtag = jest.fn()
    window.gtag = mockGtag

    trackZeroResultSearch('chanakya niti', 'itihas')

    expect(mockGtag).toHaveBeenCalledWith(
      'event',
      'zero_result_search',
      expect.objectContaining({
        search_term: 'chanakya niti',
        scripture_filter: 'itihas'
      })
    )
  })

  test('trackScholarSelection records scripture, chapter, and scholar lineage', () => {
    const mockGtag = jest.fn()
    window.gtag = mockGtag

    trackScholarSelection('bhagavad-gita', 2, 'adi-shankara')

    expect(mockGtag).toHaveBeenCalledWith(
      'event',
      'scholar_selection',
      expect.objectContaining({
        scripture: 'bhagavad-gita',
        chapter: 2,
        scholar: 'adi-shankara'
      })
    )
  })

  test('trackLanguagePreference records language code', () => {
    const mockGtag = jest.fn()
    window.gtag = mockGtag

    trackLanguagePreference('mr')

    expect(mockGtag).toHaveBeenCalledWith(
      'event',
      'language_selection',
      expect.objectContaining({
        language: 'mr'
      })
    )
  })

  test('trackBookmarkToggle records bookmark addition and removal', () => {
    const mockGtag = jest.fn()
    window.gtag = mockGtag

    trackBookmarkToggle('bg-2-47', true)
    expect(mockGtag).toHaveBeenCalledWith(
      'event',
      'bookmark_toggle',
      expect.objectContaining({
        verse_id: 'bg-2-47',
        action: 'added'
      })
    )

    trackBookmarkToggle('bg-2-47', false)
    expect(mockGtag).toHaveBeenCalledWith(
      'event',
      'bookmark_toggle',
      expect.objectContaining({
        verse_id: 'bg-2-47',
        action: 'removed'
      })
    )
  })

  test('trackKnowledgeTokenView records domain and token id', () => {
    const mockGtag = jest.fn()
    window.gtag = mockGtag

    trackKnowledgeTokenView('Astronomy', 'KT-ASTR-001')

    expect(mockGtag).toHaveBeenCalledWith(
      'event',
      'knowledge_token_view',
      expect.objectContaining({
        domain: 'Astronomy',
        token_id: 'KT-ASTR-001'
      })
    )
  })

  test('trackChapterRead records scripture and chapter completion', () => {
    const mockGtag = jest.fn()
    window.gtag = mockGtag

    trackChapterRead('katha-upanishad', 1)

    expect(mockGtag).toHaveBeenCalledWith(
      'event',
      'chapter_read',
      expect.objectContaining({
        scripture: 'katha-upanishad',
        chapter: 1
      })
    )
  })

  test('trackNewsletterSubscribe records language and scripture preferences', () => {
    const mockGtag = jest.fn()
    window.gtag = mockGtag

    trackNewsletterSubscribe('hi', 'bhagavad-gita')

    expect(mockGtag).toHaveBeenCalledWith(
      'event',
      'newsletter_subscribe',
      expect.objectContaining({
        preferred_language: 'hi',
        scripture_preference: 'bhagavad-gita'
      })
    )
  })
})
