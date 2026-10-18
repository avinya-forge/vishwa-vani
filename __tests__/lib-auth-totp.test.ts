import {
  base32Encode,
  base32Decode,
  generateTotpSecret,
  generateTotpCode,
  verifyTotpCode,
  generateOtpAuthUri
} from '../lib/auth/totp'
import * as flags from '../lib/flags'

describe('RFC 6238 TOTP Two-Factor Authentication Engine (lib/auth/totp)', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  test('base32Encode and base32Decode perform lossless round-trip', () => {
    const input = Buffer.from('VishwaVaniSanatanaDharma2026', 'utf8')
    const encoded = base32Encode(input)
    expect(encoded).toBeTruthy()
    expect(/^[A-Z2-7]+$/.test(encoded)).toBe(true)

    const decoded = base32Decode(encoded)
    expect(decoded.toString('utf8')).toBe('VishwaVaniSanatanaDharma2026')
  })

  test('base32Decode throws on invalid characters', () => {
    expect(() => base32Decode('INVALID!@#$')).toThrow('Invalid Base32 character')
  })

  test('generateTotpSecret produces valid base32 string of expected length', () => {
    const secret = generateTotpSecret(20)
    expect(secret).toBeTruthy()
    expect(secret.length).toBe(32) // 20 bytes * 8 / 5 = 32 base32 chars

    const secret10 = generateTotpSecret(10)
    expect(secret10.length).toBe(16)
  })

  test('generateTotpCode generates deterministic 6-digit numeric codes', () => {
    const secret = 'JBSWY3DPEHPK3PXP' // Standard Base32 test vector
    const timestamp = 1700000000000

    const code1 = generateTotpCode(secret, timestamp)
    const code2 = generateTotpCode(secret, timestamp)

    expect(code1).toHaveLength(6)
    expect(/^\d{6}$/.test(code1)).toBe(true)
    expect(code1).toBe(code2)
  })

  test('verifyTotpCode accepts correct code and respects clock drift window', () => {
    jest.spyOn(flags, 'isFeatureEnabled').mockReturnValue(true)

    const secret = generateTotpSecret()
    const now = Date.now()
    const code = generateTotpCode(secret, now)

    // Current time
    expect(verifyTotpCode(code, secret, { timestampMs: now })).toBe(true)

    // Within window (+25 seconds, within ±30s window)
    expect(verifyTotpCode(code, secret, { timestampMs: now + 25000, window: 1 })).toBe(true)

    // Outside window (+90 seconds, beyond ±30s window)
    expect(verifyTotpCode(code, secret, { timestampMs: now + 90000, window: 1 })).toBe(false)
  })

  test('verifyTotpCode rejects malformed, wrong-length, or non-numeric tokens', () => {
    jest.spyOn(flags, 'isFeatureEnabled').mockReturnValue(true)
    const secret = generateTotpSecret()

    expect(verifyTotpCode('12345', secret)).toBe(false)
    expect(verifyTotpCode('1234567', secret)).toBe(false)
    expect(verifyTotpCode('abcdef', secret)).toBe(false)
    expect(verifyTotpCode('000000', secret)).toBe(false)
  })

  test('verifyTotpCode returns false when enable2FA feature flag is disabled', () => {
    jest.spyOn(flags, 'isFeatureEnabled').mockImplementation((flag) => {
      if (flag === 'enable2FA') return false
      return true
    })

    const secret = generateTotpSecret()
    const now = Date.now()
    const code = generateTotpCode(secret, now)

    expect(verifyTotpCode(code, secret, { timestampMs: now })).toBe(false)
  })

  test('generateOtpAuthUri generates strictly anonymous QR pairing URI without PII', () => {
    const accountHash = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    const secret = 'JBSWY3DPEHPK3PXP'

    const uri = generateOtpAuthUri({ accountHash, secret })

    expect(uri).toContain('otpauth://totp/Vishwa-Vani%3AReader-e3b0c442')
    expect(uri).toContain(`secret=${secret}`)
    expect(uri).toContain('issuer=Vishwa-Vani')
    expect(uri).toContain('algorithm=SHA1')
    expect(uri).toContain('digits=6')
    expect(uri).toContain('period=30')

    // Absolute Zero-PII check: MUST NOT contain '@' or user emails
    expect(uri).not.toContain('@')
    expect(uri).not.toContain('.com')
  })
})
