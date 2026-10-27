/**
 * Zero-PII Social OAuth Authentication Gateway
 * 
 * Strict Zero-PII Policy:
 * 1. Raw emails, user names, avatars, and social graphs are strictly discarded at the threshold.
 * 2. User identity is hashed into an irreversible cryptographic SHA-256 digest:
 *    SHA256(provider + ':' + provider_account_id + ':' + salt)
 * 3. Issues stateless signed session tokens with optional 2FA status.
 */

import crypto from 'crypto'
import { isFeatureEnabled } from '../flags'

export type AuthProvider = 'google' | 'meta' | 'github' | 'apple' | 'anonymous'

export interface ZeroPiiSessionPayload {
  userHash: string
  provider: AuthProvider
  alias: string
  has2FA: boolean
  iat: number
  exp: number
}

const isProd = process.env.NODE_ENV === 'production';

if (isProd && (!process.env.AUTH_SALT || !process.env.AUTH_SESSION_SECRET)) {
  throw new Error('Missing AUTH_SALT or AUTH_SESSION_SECRET environment variables in production');
}

const DEFAULT_SALT = process.env.AUTH_SALT || crypto.randomBytes(32).toString('hex');
const DEFAULT_SESSION_SECRET = process.env.AUTH_SESSION_SECRET || crypto.randomBytes(32).toString('hex');

/**
 * Encodes a string or buffer into URL-safe Base64 without padding.
 */
function base64UrlEncode(data: string | Buffer): string {
  const buf = typeof data === 'string' ? Buffer.from(data, 'utf8') : data
  return buf.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

/**
 * Decodes a URL-safe Base64 string into a Buffer.
 */
function base64UrlDecode(str: string): Buffer {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/')
  while (base64.length % 4 !== 0) {
    base64 += '='
  }
  return Buffer.from(base64, 'base64')
}

/**
 * Computes an irreversible one-way SHA-256 hash of the external OAuth provider identifier.
 * Zero-PII Invariant: The original provider account id can never be reversed without brute force.
 */
export function hashUserIdentifier(
  provider: AuthProvider | string,
  providerAccountId: string,
  customSalt: string = DEFAULT_SALT
): string {
  if (!provider || !providerAccountId) {
    throw new Error('Provider and providerAccountId are required to generate user hash.')
  }
  const cleanProvider = provider.toLowerCase().trim()
  const cleanId = providerAccountId.trim()
  return crypto
    .createHash('sha256')
    .update(`${cleanProvider}:${cleanId}:${customSalt}`)
    .digest('hex')
}

/**
 * Generates an anonymous, respectful reader alias from the user hash.
 * Example: "Sādhaka-3F8A"
 */
export function getAnonymousReaderAlias(userHash: string): string {
  const shortId = (userHash || '').slice(0, 4).toUpperCase()
  return `Sādhaka-${shortId || 'VANI'}`
}

/**
 * Sanitizes incoming OAuth credentials at the network threshold,
 * permanently dropping any incoming emails, full names, or avatar URLs.
 */
export function sanitizeIncomingOAuthProfile(
  provider: AuthProvider,
  rawProfile: { id?: string | number; sub?: string | number; [key: string]: unknown }
): { provider: AuthProvider; providerAccountId: string } {
  const accountId = String(rawProfile.sub || rawProfile.id || '').trim()
  if (!accountId) {
    throw new Error(`Invalid OAuth profile: missing sub/id for provider ${provider}`)
  }

  // Explicitly return only the provider and providerAccountId; all other properties are discarded
  return {
    provider,
    providerAccountId: accountId
  }
}

/**
 * Creates a signed, stateless session token using HMAC-SHA256.
 */
export function createStatelessSession(
  userHash: string,
  provider: AuthProvider,
  options?: {
    has2FA?: boolean
    expiresInSeconds?: number
    secret?: string
  }
): string {
  const secret = options?.secret || DEFAULT_SESSION_SECRET
  const now = Math.floor(Date.now() / 1000)
  const exp = now + (options?.expiresInSeconds || 7 * 24 * 60 * 60) // Default 7 days

  const payload: ZeroPiiSessionPayload = {
    userHash,
    provider,
    alias: getAnonymousReaderAlias(userHash),
    has2FA: Boolean(options?.has2FA),
    iat: now,
    exp
  }

  const header = { alg: 'HS256', typ: 'JWT' }
  const encodedHeader = base64UrlEncode(JSON.stringify(header))
  const encodedPayload = base64UrlEncode(JSON.stringify(payload))
  const dataToSign = `${encodedHeader}.${encodedPayload}`

  const signature = crypto.createHmac('sha256', secret).update(dataToSign).digest()
  const encodedSignature = base64UrlEncode(signature)

  return `${dataToSign}.${encodedSignature}`
}

/**
 * Verifies a signed stateless session token.
 * Returns the decoded payload or null if invalid, expired, or tampered.
 */
export function verifyStatelessSession(
  token: string,
  secret: string = DEFAULT_SESSION_SECRET
): ZeroPiiSessionPayload | null {
  if (!isFeatureEnabled('enableAuth')) {
    // If auth feature flag is disabled, reject token validation
    return null
  }

  if (!token || typeof token !== 'string') {
    return null
  }

  const parts = token.split('.')
  if (parts.length !== 3) {
    return null
  }

  const [encodedHeader, encodedPayload, encodedSignature] = parts
  const dataToSign = `${encodedHeader}.${encodedPayload}`

  try {
    const expectedSignature = crypto.createHmac('sha256', secret).update(dataToSign).digest()
    const providedSignature = base64UrlDecode(encodedSignature)

    if (
      expectedSignature.length !== providedSignature.length ||
      !crypto.timingSafeEqual(expectedSignature, providedSignature)
    ) {
      return null
    }

    const payloadJson = base64UrlDecode(encodedPayload).toString('utf8')
    const payload = JSON.parse(payloadJson) as ZeroPiiSessionPayload

    const now = Math.floor(Date.now() / 1000)
    if (payload.exp && payload.exp < now) {
      return null // Expired
    }

    return payload
  } catch {
    return null
  }
}
