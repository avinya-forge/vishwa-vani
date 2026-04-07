// Mock Next.js modules
jest.mock('next/server', () => ({
  NextResponse: {
    json: (data: any, options?: any) => ({
      status: options?.status || 200,
      json: async () => data
    })
  }
}))

import { POST } from '@/app/api/synthesize/route'

const mockRequest = (body: any) => ({ json: async () => body })

describe('/api/synthesize', () => {
  describe('success (200)', () => {
    it('returns synthesis with synthesisMode on valid input', async () => {
      const res = await POST(mockRequest({
        verseId: '1.1',
        contextTexts: ['Sample meaning', 'Commentary text'],
        language: 'en'
      }) as any)
      const data = await res.json()

      expect(res.status).toBe(200)
      expect(data.success).toBe(true)
      expect(typeof data.synthesis).toBe('string')
      expect(data.synthesis.length).toBeGreaterThan(0)
      expect(data.synthesisMode).toBe('concatenation-fallback')
      expect(data.metadata).toHaveProperty('verseId', '1.1')
      expect(data.metadata).toHaveProperty('language', 'en')
    })

    it('defaults language to en when omitted', async () => {
      const res = await POST(mockRequest({
        verseId: 'gita.2.47',
        contextTexts: ['Meaning only']
      }) as any)
      const data = await res.json()

      expect(res.status).toBe(200)
      expect(data.metadata.language).toBe('en')
    })

    it('includes meaning-only synthesis when no commentaries provided', async () => {
      const res = await POST(mockRequest({
        verseId: 'gita.1.1',
        contextTexts: ['Only meaning text here'],
        language: 'hi'
      }) as any)
      const data = await res.json()

      expect(res.status).toBe(200)
      expect(data.synthesis).toBe('Only meaning text here')
    })

    it('caps synthesis at 2048 characters', async () => {
      const longText = 'a'.repeat(3000)
      const res = await POST(mockRequest({
        verseId: 'x.1',
        contextTexts: [longText],
        language: 'en'
      }) as any)
      const data = await res.json()

      expect(res.status).toBe(200)
      expect(data.synthesis.length).toBeLessThanOrEqual(2048)
    })
  })

  describe('validation errors (400)', () => {
    it('rejects missing verseId', async () => {
      const res = await POST(mockRequest({ contextTexts: ['text'], language: 'en' }) as any)
      const data = await res.json()

      expect(res.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data).not.toHaveProperty('synthesisMode')
    })

    it('rejects empty contextTexts array', async () => {
      const res = await POST(mockRequest({ verseId: '1.1', contextTexts: [] }) as any)
      const data = await res.json()

      expect(res.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data).not.toHaveProperty('synthesisMode')
    })

    it('rejects non-array contextTexts', async () => {
      const res = await POST(mockRequest({ verseId: '1.1', contextTexts: 'not-array' }) as any)
      const data = await res.json()

      expect(res.status).toBe(400)
      expect(data).not.toHaveProperty('synthesisMode')
    })

    it('rejects unsupported language', async () => {
      const res = await POST(mockRequest({
        verseId: '1.1',
        contextTexts: ['text'],
        language: 'fr'
      }) as any)
      const data = await res.json()

      expect(res.status).toBe(400)
      expect(data.message).toMatch(/unsupported language/i)
      expect(data).not.toHaveProperty('synthesisMode')
    })

    it('rejects contextTexts containing only empty strings', async () => {
      const res = await POST(mockRequest({
        verseId: '1.1',
        contextTexts: ['', '   ', ''],
        language: 'en'
      }) as any)
      const data = await res.json()

      expect(res.status).toBe(400)
      expect(data.message).toMatch(/empty/i)
      expect(data).not.toHaveProperty('synthesisMode')
    })

    it('rejects null body', async () => {
      const res = await POST(mockRequest(null) as any)
      const data = await res.json()

      expect(res.status).toBe(400)
      expect(data.success).toBe(false)
    })
  })
})
