import {
  getTextBySlug,
  getAvailableTexts,
  isStrictDemoGatingEnabled,
} from '@/lib/texts';

describe('Strict UI Gating Logic (DEMO-LOC-003)', () => {
  const originalEnv = process.env.STRICT_DEMO_GATING;

  afterEach(() => {
    process.env.STRICT_DEMO_GATING = originalEnv;
  });

  it('detects when strict demo gating is disabled by default', () => {
    delete process.env.STRICT_DEMO_GATING;
    delete process.env.NEXT_PUBLIC_STRICT_DEMO;
    expect(isStrictDemoGatingEnabled()).toBe(false);
  });

  it('detects when strict demo gating is enabled via STRICT_DEMO_GATING', () => {
    process.env.STRICT_DEMO_GATING = 'true';
    expect(isStrictDemoGatingEnabled()).toBe(true);
  });

  it('returns all default available texts when strict demo gating is off', () => {
    delete process.env.STRICT_DEMO_GATING;
    delete process.env.NEXT_PUBLIC_STRICT_DEMO;
    const available = getAvailableTexts();
    expect(available.length).toBeGreaterThan(2);
    expect(available.map(t => t.slug)).toContain('bhagavad-gita');
  });

  it('filters out incomplete scriptures (<100% readiness) when strict demo gating is enabled', () => {
    process.env.STRICT_DEMO_GATING = 'true';
    const available = getAvailableTexts();

    // Only scriptures with 100% readiness score should be available
    expect(available.length).toBe(2);
    const availableSlugs = available.map(t => t.slug);
    expect(availableSlugs).toContain('isha-upanishad');
    expect(availableSlugs).toContain('kena-upanishad');
    expect(availableSlugs).not.toContain('bhagavad-gita');
    expect(availableSlugs).not.toContain('mahabharata');
  });

  it('overrides available attribute to false in getTextBySlug when strict demo gating is enabled', () => {
    process.env.STRICT_DEMO_GATING = 'true';

    const isha = getTextBySlug('isha-upanishad');
    expect(isha).toBeDefined();
    expect(isha?.available).toBe(true);

    const gita = getTextBySlug('bhagavad-gita');
    expect(gita).toBeDefined();
    expect(gita?.available).toBe(false);
  });
});
