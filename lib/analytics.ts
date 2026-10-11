/**
 * Vishwa-Vani: Client-Side Telemetry & Visitor Intelligence Engine
 * 
 * Compliant with Google Analytics 4 (GA4), India DPDP Act (2023), and GDPR.
 * Does NOT send unhashed PII (emails, names) to external analytics platforms.
 * Manages an anonymous, persistent client-side visitor ID ('vv_visitor_id')
 * to track reading depth, search queries, scholar selection, and topic trends.
 */

declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: Record<string, unknown>) => void;
  }
}

const VISITOR_ID_STORAGE_KEY = 'vv_visitor_id';

/**
 * Returns or generates a persistent anonymous UUID for the current device/browser session.
 * Stores in localStorage without collecting personal identity.
 */
export function getOrCreateVisitorId(): string {
  if (typeof window === 'undefined') {
    return 'ssr_session';
  }

  try {
    let visitorId = localStorage.getItem(VISITOR_ID_STORAGE_KEY);
    if (!visitorId) {
      if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        visitorId = crypto.randomUUID();
      } else {
        visitorId = 'vv_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 9);
      }
      localStorage.setItem(VISITOR_ID_STORAGE_KEY, visitorId);
    }
    return visitorId;
  } catch {
    return 'fallback_visitor';
  }
}

/**
 * Low-level safe dispatcher for GA4 custom events.
 */
export function trackEvent(eventName: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;

  try {
    const visitorId = getOrCreateVisitorId();
    const eventPayload: Record<string, unknown> = {
      ...params,
      client_timestamp: new Date().toISOString(),
      visitor_id: visitorId,
    };

    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, eventPayload);
    }
  } catch (err) {
    // Graceful silent degradation if analytics is blocked or unavailable
    console.debug('[Telemetry] Event dispatch omitted:', eventName, err);
  }
}

/**
 * Track an internal scripture / lake search query.
 */
export function trackSearch(
  query: string,
  scriptureFilter: string = 'all',
  resultsCount: number = 0
): void {
  const sanitizedQuery = (query || '').trim().toLowerCase();
  if (!sanitizedQuery) return;

  trackEvent('search', {
    search_term: sanitizedQuery,
    scripture_filter: scriptureFilter,
    results_count: resultsCount,
  });

  if (resultsCount === 0) {
    trackZeroResultSearch(sanitizedQuery, scriptureFilter);
  }
}

/**
 * Track when a seeker searches for concepts or scriptures not currently in the lake.
 * Invaluable signal for what texts or topics should be onboarded next.
 */
export function trackZeroResultSearch(query: string, scriptureFilter: string = 'all'): void {
  const sanitizedQuery = (query || '').trim().toLowerCase();
  if (!sanitizedQuery) return;

  trackEvent('zero_result_search', {
    search_term: sanitizedQuery,
    scripture_filter: scriptureFilter,
  });
}

/**
 * Track which philosophical tradition / scholar commentary a reader expands.
 */
export function trackScholarSelection(
  scriptureSlug: string,
  chapter: number,
  scholarKey: string
): void {
  trackEvent('scholar_selection', {
    scripture: scriptureSlug,
    chapter: chapter,
    scholar: scholarKey,
  });
}

/**
 * Track when a user switches linguistic preference (Sanskrit, Hindi, Marathi, English).
 */
export function trackLanguagePreference(languageCode: string): void {
  trackEvent('language_selection', {
    language: languageCode,
  });
}

/**
 * Track reader bookmark activity.
 */
export function trackBookmarkToggle(verseId: string, isBookmarked: boolean): void {
  trackEvent('bookmark_toggle', {
    verse_id: verseId,
    action: isBookmarked ? 'added' : 'removed',
  });
}

/**
 * Track when a seeker views an Empirical Knowledge Token (💎 Vaidika Vijñāna).
 */
export function trackKnowledgeTokenView(domain: string, tokenId: string): void {
  trackEvent('knowledge_token_view', {
    domain: domain,
    token_id: tokenId,
  });
}

/**
 * Track chapter completion / deep reading progress.
 */
export function trackChapterRead(scriptureSlug: string, chapter: number): void {
  trackEvent('chapter_read', {
    scripture: scriptureSlug,
    chapter: chapter,
  });
}

/**
 * Track newsletter / Daily Shloka opt-in subscription.
 */
export function trackNewsletterSubscribe(
  language: string,
  scripturePreference: string = 'all'
): void {
  trackEvent('newsletter_subscribe', {
    preferred_language: language,
    scripture_preference: scripturePreference,
  });
}
