/**
 * 🚩 Vishwa-Vani: Enterprise Feature Flags Engine (`lib/flags.ts`)
 *
 * Deterministic, type-safe feature toggles for zero-downtime deployment,
 * progressive feature rollout (Auth, 2FA, Ramayana Multiverse, Local LLM),
 * and client-side admin overrides with zero hydration mismatch.
 */

export interface FeatureFlags {
  /** Enables Zero-PII Social OAuth Authentication Gateway */
  enableAuth: boolean;
  /** Enables RFC 6238 TOTP Two-Factor Authentication */
  enable2FA: boolean;
  /** Enables In-Browser WebGPU Local LLM Inference (`@mlc-ai/web-llm`) */
  enableLocalLLM: boolean;
  /** Enables Autonomous Background Ingestion Cron */
  enableCronIngestion: boolean;
  /** Enables Strict Demo Gating (restricts view to 100% Gold verified scriptures) */
  strictDemo: boolean;
  /** Enables Ramayana Multiverse Comparative Episode Canvas */
  enableRamayanaMultiverse: boolean;
  /** Enables Chapter-Level Bedtime Scripture Podcast & Voice Companion */
  enableBedtimePodcast: boolean;
}

export type FeatureFlagKey = keyof FeatureFlags;

const DEFAULT_FLAGS: FeatureFlags = {
  enableAuth: false,
  enable2FA: false,
  enableLocalLLM: false,
  enableCronIngestion: false,
  strictDemo: false,
  enableRamayanaMultiverse: false,
  enableBedtimePodcast: false,
};

/**
 * Resolves static environment defaults.
 */
function getEnvDefaults(): FeatureFlags {
  return {
    enableAuth: process.env.NEXT_PUBLIC_ENABLE_AUTH === 'true',
    enable2FA: process.env.NEXT_PUBLIC_ENABLE_2FA === 'true',
    enableLocalLLM: process.env.NEXT_PUBLIC_ENABLE_LOCAL_LLM === 'true',
    enableCronIngestion: process.env.ENABLE_CRON_INGESTION === 'true',
    strictDemo:
      process.env.STRICT_DEMO_GATING === 'true' ||
      process.env.NEXT_PUBLIC_STRICT_DEMO === 'true',
    enableRamayanaMultiverse:
      process.env.NEXT_PUBLIC_ENABLE_RAMAYANA_MULTIVERSE === 'true',
    enableBedtimePodcast:
      process.env.NEXT_PUBLIC_ENABLE_BEDTIME_PODCAST === 'true',
  };
}

/**
 * Read client overrides from localStorage if running in browser.
 */
function getClientOverrides(): Partial<FeatureFlags> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem('vv_feature_flags');
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

/**
 * Get all active feature flags resolved against environment defaults and local overrides.
 */
export function getAllFeatureFlags(): FeatureFlags {
  const envDefaults = getEnvDefaults();
  const overrides = getClientOverrides();
  return {
    ...DEFAULT_FLAGS,
    ...envDefaults,
    ...overrides,
  };
}

/**
 * Check if a specific feature flag is currently active.
 */
export function isFeatureEnabled(key: FeatureFlagKey): boolean {
  const flags = getAllFeatureFlags();
  return Boolean(flags[key]);
}

/**
 * Set a client-side feature flag override (stored in browser localStorage).
 */
export function setFeatureFlagOverride(key: FeatureFlagKey, enabled: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getClientOverrides();
    const updated = { ...current, [key]: enabled };
    localStorage.setItem('vv_feature_flags', JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save feature flag override:', err);
  }
}

/**
 * Clear all client-side feature flag overrides.
 */
export function clearFeatureFlagOverrides(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem('vv_feature_flags');
  } catch (err) {
    console.error('Failed to clear feature flag overrides:', err);
  }
}
