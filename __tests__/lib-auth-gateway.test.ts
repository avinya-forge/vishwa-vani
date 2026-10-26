import {
  hashUserIdentifier,
  getAnonymousReaderAlias,
  sanitizeIncomingOAuthProfile,
  createStatelessSession,
  verifyStatelessSession
} from '../lib/auth/gateway'
import * as flags from '../lib/flags'

describe('Zero-PII Social OAuth Authentication Gateway (lib/auth/gateway)', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test('throws in production if secrets are missing', () => {
    Object.defineProperty(process.env, 'NODE_ENV', { value: 'production', configurable: true });
    delete process.env.AUTH_SALT;
    delete process.env.AUTH_SESSION_SECRET;

    expect(() => {
      require('../lib/auth/gateway');
    }).toThrow('Missing AUTH_SALT or AUTH_SESSION_SECRET environment variables in production');
  });
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  test('hashUserIdentifier generates deterministic irreversible SHA-256 hash', () => {
    const hash1 = hashUserIdentifier('google', '109823471029384710293')
    const hash2 = hashUserIdentifier('google', '109823471029384710293')

    expect(hash1).toHaveLength(64)
    expect(/^[a-f0-9]{64}$/.test(hash1)).toBe(true)
    expect(hash1).toBe(hash2)

    // Different provider or account id yields different hash
    const hashOther = hashUserIdentifier('meta', '109823471029384710293')
    expect(hash1).not.toBe(hashOther)
  })

  test('hashUserIdentifier respects custom salt', () => {
    const hashA = hashUserIdentifier('google', 'user-123', 'salt-alpha')
    const hashB = hashUserIdentifier('google', 'user-123', 'salt-beta')
    expect(hashA).not.toBe(hashB)
  })

  test('hashUserIdentifier throws when provider or accountId is missing', () => {
    expect(() => hashUserIdentifier('', 'user-123')).toThrow('Provider and providerAccountId are required')
    expect(() => hashUserIdentifier('google', '')).toThrow('Provider and providerAccountId are required')
  })

  test('getAnonymousReaderAlias produces respectful non-identifying pseudonym', () => {
    const alias = getAnonymousReaderAlias('a3f8c129e')
    expect(alias).toBe('Sādhaka-A3F8')

    const fallback = getAnonymousReaderAlias('')
    expect(fallback).toBe('Sādhaka-VANI')
  })

  test('sanitizeIncomingOAuthProfile strictly purges emails, names, and profile pictures', () => {
    const dirtyProfile = {
      sub: 'google-oauth2-987654321',
      email: 'sensitive-user@personal-domain.com',
      name: 'Confidential Seeker',
      given_name: 'Confidential',
      family_name: 'Seeker',
      picture: 'https://lh3.googleusercontent.com/avatar123.jpg',
      locale: 'en-US',
      friends: ['friend1', 'friend2']
    }

    const sanitized = sanitizeIncomingOAuthProfile('google', dirtyProfile)

    expect(sanitized).toEqual({
      provider: 'google',
      providerAccountId: 'google-oauth2-987654321'
    })

    // Strict Zero-PII check: ensure no leaked properties
    expect((sanitized as Record<string, unknown>).email).toBeUndefined()
    expect((sanitized as Record<string, unknown>).name).toBeUndefined()
    expect((sanitized as Record<string, unknown>).picture).toBeUndefined()
  })

  test('sanitizeIncomingOAuthProfile throws if both id and sub are missing', () => {
    expect(() => sanitizeIncomingOAuthProfile('meta', { email: 'bad@example.com' })).toThrow(
      'Invalid OAuth profile: missing sub/id'
    )
  })

  test('createStatelessSession and verifyStatelessSession round-trip correctly', () => {
    jest.spyOn(flags, 'isFeatureEnabled').mockReturnValue(true)

    const userHash = hashUserIdentifier('github', 'gh-user-888')
    const token = createStatelessSession(userHash, 'github', { has2FA: true, expiresInSeconds: 3600 })

    expect(token).toBeTruthy()
    expect(token.split('.')).toHaveLength(3)

    const payload = verifyStatelessSession(token)
    expect(payload).not.toBeNull()
    expect(payload?.userHash).toBe(userHash)
    expect(payload?.provider).toBe('github')
    expect(payload?.has2FA).toBe(true)
    expect(payload?.alias).toBe('Sādhaka-' + userHash.slice(0, 4).toUpperCase())
    expect(payload?.exp).toBeGreaterThan(Math.floor(Date.now() / 1000))
  })

  test('verifyStatelessSession rejects tampered tokens', () => {
    jest.spyOn(flags, 'isFeatureEnabled').mockReturnValue(true)

    const userHash = hashUserIdentifier('google', 'g-user-111')
    const token = createStatelessSession(userHash, 'google')

    const parts = token.split('.')
    const tamperedPayload = Buffer.from(JSON.stringify({ userHash: 'attacker', provider: 'google' })).toString('base64url')
    const tamperedToken = `${parts[0]}.${tamperedPayload}.${parts[2]}`

    expect(verifyStatelessSession(tamperedToken)).toBeNull()
  })

  test('verifyStatelessSession rejects expired tokens', () => {
    jest.spyOn(flags, 'isFeatureEnabled').mockReturnValue(true)

    const userHash = hashUserIdentifier('meta', 'fb-user-222')
    // Expired 1 hour ago
    const expiredToken = createStatelessSession(userHash, 'meta', { expiresInSeconds: -3600 })

    expect(verifyStatelessSession(expiredToken)).toBeNull()
  })

  test('verifyStatelessSession rejects invalid token formats', () => {
    jest.spyOn(flags, 'isFeatureEnabled').mockReturnValue(true)

    expect(verifyStatelessSession('')).toBeNull()
    expect(verifyStatelessSession('single-string')).toBeNull()
    expect(verifyStatelessSession('header.payload')).toBeNull()
  })

  test('verifyStatelessSession returns null when enableAuth feature flag is disabled', () => {
    jest.spyOn(flags, 'isFeatureEnabled').mockImplementation((flag) => {
      if (flag === 'enableAuth') return false
      return true
    })

    const userHash = hashUserIdentifier('google', 'user-xyz')
    const token = createStatelessSession(userHash, 'google')

    expect(verifyStatelessSession(token)).toBeNull()
  })
})
