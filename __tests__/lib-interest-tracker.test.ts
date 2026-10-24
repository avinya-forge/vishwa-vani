import {
  getSeekerAffinityProfile,
  recordTopicDwellTime,
  recordChapterInteraction,
  recordQueryTopic,
  getRecommendedBedtimeChapters,
  clearSeekerAffinity,
} from '@/lib/analytics/interest-tracker';

describe('Seeker Topical Interest & Theme Affinity Tracker (lib/analytics/interest-tracker.ts)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('getSeekerAffinityProfile returns default profile when storage is empty', () => {
    const profile = getSeekerAffinityProfile();
    expect(profile).toBeDefined();
    expect(profile.totalListeningSeconds).toBe(0);
    expect(profile.topThemes).toEqual(['bhakti', 'jnana']);
    expect(profile.recentlyListenedChapters).toHaveLength(0);
  });

  test('recordTopicDwellTime increments theme weight and reorders top themes', () => {
    recordTopicDwellTime('dhyana', 300);
    recordTopicDwellTime('vairagya', 200);

    const profile = getSeekerAffinityProfile();
    expect(profile.totalListeningSeconds).toBe(500);
    expect(profile.themeWeights.dhyana).toBe(300);
    expect(profile.themeWeights.vairagya).toBe(200);
    expect(profile.topThemes[0]).toBe('dhyana');
    expect(profile.topThemes[1]).toBe('vairagya');
  });

  test('recordChapterInteraction logs recent chapter and applies theme boost', () => {
    recordChapterInteraction('bhagavad-gita', 12, ['bhakti']);

    const profile = getSeekerAffinityProfile();
    expect(profile.recentlyListenedChapters).toHaveLength(1);
    expect(profile.recentlyListenedChapters[0].bookSlug).toBe('bhagavad-gita');
    expect(profile.recentlyListenedChapters[0].chapter).toBe(12);
    expect(profile.themeWeights.bhakti).toBeGreaterThanOrEqual(60);
    expect(profile.topThemes).toContain('bhakti');
  });

  test('recordQueryTopic maps spiritual inquiry keywords to themes', () => {
    recordQueryTopic('How to practice silent meditation and breath focus for sleep?');

    const profile = getSeekerAffinityProfile();
    expect(profile.themeWeights.dhyana).toBeGreaterThan(0);
  });

  test('getRecommendedBedtimeChapters prioritizes chapters matching seeker affinity', () => {
    // Seeker who loves Sant Vani and Bhakti
    recordTopicDwellTime('sant_vani', 400);
    recordTopicDwellTime('bhakti', 300);

    const profile = getSeekerAffinityProfile();
    const recommendations = getRecommendedBedtimeChapters(profile, 3);

    expect(recommendations).toHaveLength(3);
    const topThemesInRecs = recommendations.map((r) => r.primaryTheme);
    expect(topThemesInRecs.some((t) => t === 'sant_vani' || t === 'bhakti')).toBe(true);
  });

  test('clearSeekerAffinity resets all interest data adhering to Right to be Forgotten', () => {
    recordTopicDwellTime('jnana', 500);
    expect(getSeekerAffinityProfile().themeWeights.jnana).toBe(500);

    clearSeekerAffinity();
    expect(getSeekerAffinityProfile().themeWeights.jnana).toBe(0);
    expect(getSeekerAffinityProfile().totalListeningSeconds).toBe(0);
  });
});
