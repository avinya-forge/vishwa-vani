jest.mock('next/server', () => ({
  NextResponse: {
    json: (data: unknown, options?: { status?: number }) => ({
      status: options?.status || 200,
      json: async () => data
    })
  }
}))

import { POST, GET } from '@/app/api/newsletter/subscribe/route'
import type { NextRequest } from 'next/server'

const createMockRequest = (body: unknown) => ({
  json: async () => body,
  headers: {
    get: () => 'application/json'
  }
} as unknown as NextRequest)

describe('API: /api/newsletter/subscribe', () => {
  it('subscribes a new email successfully with valid inputs', async () => {
    const testEmail = `seeker_${Date.now()}@vedic.org`
    const req = createMockRequest({
      email: testEmail,
      language: 'hi',
      visitorId: 'vv_test_123',
      scripturePreference: 'bhagavad-gita'
    })

    const res = await POST(req)
    const json = await (res as unknown as { json: () => Promise<Record<string, unknown>> }).json()

    expect((res as unknown as { status: number }).status).toBe(200)
    expect(json.success).toBe(true)
    expect(json.isNew).toBe(true)
  })

  it('updates preferences idempotently when subscribing an existing email', async () => {
    const testEmail = `seeker_repeat_${Date.now()}@vedic.org`
    const req1 = createMockRequest({
      email: testEmail,
      language: 'en'
    })
    await POST(req1)

    const req2 = createMockRequest({
      email: testEmail,
      language: 'mr',
      scripturePreference: 'upanishad'
    })
    const res2 = await POST(req2)
    const json2 = await (res2 as unknown as { json: () => Promise<Record<string, unknown>> }).json()

    expect((res2 as unknown as { status: number }).status).toBe(200)
    expect(json2.success).toBe(true)
    expect(json2.isNew).toBe(false)
  })

  it('rejects missing or non-string email with 400', async () => {
    const req = createMockRequest({ email: '' })
    const res = await POST(req)
    const json = await (res as unknown as { json: () => Promise<Record<string, unknown>> }).json()

    expect((res as unknown as { status: number }).status).toBe(400)
    expect(json.error).toMatch(/valid email/i)
  })

  it('rejects invalid email formats with 400', async () => {
    const req = createMockRequest({ email: 'not-an-email-at-all' })
    const res = await POST(req)
    const json = await (res as unknown as { json: () => Promise<Record<string, unknown>> }).json()

    expect((res as unknown as { status: number }).status).toBe(400)
    expect(json.error).toMatch(/valid email/i)
  })

  it('rejects malformed or empty payloads with 400', async () => {
    const req = {
      json: async () => { throw new Error('Malformed JSON') },
      headers: { get: () => 'application/json' }
    } as unknown as NextRequest

    const res = await POST(req)
    const json = await (res as unknown as { json: () => Promise<Record<string, unknown>> }).json()

    expect((res as unknown as { status: number }).status).toBe(400)
    expect(json.error).toMatch(/invalid json/i)
  })

  it('GET returns active subscribers telemetry count', async () => {
    const res = await GET()
    const json = await (res as unknown as { json: () => Promise<Record<string, unknown>> }).json()

    expect((res as unknown as { status: number }).status).toBe(200)
    expect(json.success).toBe(true)
    expect(typeof json.activeSubscribers).toBe('number')
  })
})
