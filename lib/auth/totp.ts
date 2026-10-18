/**
 * RFC 6238 TOTP (Time-Based One-Time Password) Engine
 * 
 * Complies with RFC 6238 / RFC 4226 standards.
 * Compatible with Google Authenticator, Microsoft Authenticator, Authy, and Apple Keychain.
 * Zero-PII Policy: Never incorporates email addresses or personal phone numbers.
 */

import crypto from 'crypto'
import { isFeatureEnabled } from '../flags'

const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'

/**
 * Encodes a buffer into RFC 4648 Base32.
 */
export function base32Encode(buffer: Buffer): string {
  let bits = 0
  let value = 0
  let output = ''

  for (let i = 0; i < buffer.length; i++) {
    value = (value << 8) | buffer[i]
    bits += 8
    while (bits >= 5) {
      output += BASE32_ALPHABET[(value >>> (bits - 5)) & 31]
      bits -= 5
    }
  }

  if (bits > 0) {
    output += BASE32_ALPHABET[(value << (5 - bits)) & 31]
  }

  return output
}

/**
 * Decodes an RFC 4648 Base32 string into a Buffer.
 */
export function base32Decode(base32: string): Buffer {
  const clean = base32.toUpperCase().replace(/=+$/, '').replace(/\s+/g, '')
  let bits = 0
  let value = 0
  const bytes: number[] = []

  for (let i = 0; i < clean.length; i++) {
    const idx = BASE32_ALPHABET.indexOf(clean[i])
    if (idx === -1) {
      throw new Error(`Invalid Base32 character: ${clean[i]}`)
    }
    value = (value << 5) | idx
    bits += 5

    if (bits >= 8) {
      bytes.push((value >>> (bits - 8)) & 255)
      bits -= 8
    }
  }

  return Buffer.from(bytes)
}

/**
 * Generates a cryptographically secure Base32 secret for TOTP enrollment.
 * Default is 20 random bytes (160 bits, standard for SHA-1 TOTP).
 */
export function generateTotpSecret(byteLength: number = 20): string {
  const buffer = crypto.randomBytes(byteLength)
  return base32Encode(buffer)
}

/**
 * Computes an RFC 6238 TOTP code for a secret at a given timestamp.
 */
export function generateTotpCode(
  secret: string,
  timestampMs: number = Date.now(),
  stepSeconds: number = 30,
  digits: number = 6
): string {
  const counter = Math.floor(timestampMs / 1000 / stepSeconds)
  const counterBuffer = Buffer.alloc(8)
  counterBuffer.writeBigInt64BE(BigInt(counter), 0)

  const key = base32Decode(secret)
  const hmac = crypto.createHmac('sha1', key).update(counterBuffer).digest()

  // Dynamic truncation (RFC 4226 Section 5.4)
  const offset = hmac[hmac.length - 1] & 0x0f
  const binary =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff)

  const token = (binary % 10 ** digits).toString().padStart(digits, '0')
  return token
}

/**
 * Verifies a TOTP code against a secret with clock drift window tolerance.
 * Window = 1 checks: [current - 1 step, current, current + 1 step] (±30 seconds).
 */
export function verifyTotpCode(
  code: string,
  secret: string,
  options?: {
    window?: number
    timestampMs?: number
    stepSeconds?: number
    digits?: number
  }
): boolean {
  if (!isFeatureEnabled('enable2FA')) {
    // If 2FA feature flag is disabled, bypass or reject depending on strictness
    return false
  }

  const window = options?.window ?? 1
  const timestampMs = options?.timestampMs ?? Date.now()
  const stepSeconds = options?.stepSeconds ?? 30
  const digits = options?.digits ?? 6

  const cleanCode = code.trim()
  if (cleanCode.length !== digits || !/^\d+$/.test(cleanCode)) {
    return false
  }

  for (let offset = -window; offset <= window; offset++) {
    const checkTime = timestampMs + offset * stepSeconds * 1000
    try {
      const expectedCode = generateTotpCode(secret, checkTime, stepSeconds, digits)
      if (crypto.timingSafeEqual(Buffer.from(cleanCode), Buffer.from(expectedCode))) {
        return true
      }
    } catch {
      return false
    }
  }

  return false
}

/**
 * Generates standard otpauth:// URI for authenticator QR codes.
 * Zero-PII Guarantee: Uses reader alias or hash slice, never an email or name.
 */
export function generateOtpAuthUri(options: {
  accountHash: string
  secret: string
  issuer?: string
  digits?: number
  period?: number
}): string {
  const issuer = options.issuer || 'Vishwa-Vani'
  const digits = options.digits || 6
  const period = options.period || 30
  const shortAlias = `Reader-${options.accountHash.slice(0, 8)}`

  const encodedIssuer = encodeURIComponent(issuer)
  const encodedLabel = encodeURIComponent(`${issuer}:${shortAlias}`)

  return `otpauth://totp/${encodedLabel}?secret=${options.secret}&issuer=${encodedIssuer}&algorithm=SHA1&digits=${digits}&period=${period}`
}
