import {
  getAllFeatureFlags,
  isFeatureEnabled,
  setFeatureFlagOverride,
  clearFeatureFlagOverrides,
} from '@/lib/flags';

describe('Feature Flags Engine (lib/flags.ts)', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    localStorage.clear();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test('resolves default flags as false when env variables are unset', () => {
    delete process.env.NEXT_PUBLIC_ENABLE_AUTH;
    delete process.env.NEXT_PUBLIC_ENABLE_2FA;
    delete process.env.NEXT_PUBLIC_ENABLE_LOCAL_LLM;
    delete process.env.NEXT_PUBLIC_ENABLE_BEDTIME_PODCAST;

    const flags = getAllFeatureFlags();
    expect(flags.enableAuth).toBe(false);
    expect(flags.enable2FA).toBe(false);
    expect(flags.enableLocalLLM).toBe(false);
    expect(flags.enableBedtimePodcast).toBe(false);
    expect(isFeatureEnabled('enableAuth')).toBe(false);
    expect(isFeatureEnabled('enableBedtimePodcast')).toBe(false);
  });

  test('respects environment variables when set to true', () => {
    process.env.NEXT_PUBLIC_ENABLE_AUTH = 'true';
    process.env.NEXT_PUBLIC_ENABLE_2FA = 'true';
    process.env.NEXT_PUBLIC_ENABLE_RAMAYANA_MULTIVERSE = 'true';
    process.env.NEXT_PUBLIC_ENABLE_BEDTIME_PODCAST = 'true';

    expect(isFeatureEnabled('enableAuth')).toBe(true);
    expect(isFeatureEnabled('enable2FA')).toBe(true);
    expect(isFeatureEnabled('enableRamayanaMultiverse')).toBe(true);
    expect(isFeatureEnabled('enableBedtimePodcast')).toBe(true);
  });

  test('allows client-side localStorage overrides to take precedence', () => {
    process.env.NEXT_PUBLIC_ENABLE_AUTH = 'false';
    expect(isFeatureEnabled('enableAuth')).toBe(false);

    // Override to true
    setFeatureFlagOverride('enableAuth', true);
    expect(isFeatureEnabled('enableAuth')).toBe(true);

    // Clear overrides
    clearFeatureFlagOverrides();
    expect(isFeatureEnabled('enableAuth')).toBe(false);
  });

  test('handles corrupted localStorage data gracefully without throwing', () => {
    localStorage.setItem('vv_feature_flags', 'invalid-json{{{');
    expect(() => getAllFeatureFlags()).not.toThrow();
    expect(isFeatureEnabled('enableAuth')).toBe(false);
  });
});
