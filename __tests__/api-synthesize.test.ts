jest.mock('next/server', () => ({
  NextResponse: {
    json: (data: unknown, options?: { status?: number }) => ({
      status: options?.status || 200,
      json: async () => data
    })
  }
}))

// Mock Gemini
const mockGenerateContent = jest.fn()
jest.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: jest.fn().mockImplementation(() => {
      return {
        getGenerativeModel: jest.fn().mockReturnValue({
          generateContent: mockGenerateContent
        })
      }
    })
  }
})

// Set env var BEFORE importing the route, so genAI is initialized
process.env.GEMINI_API_KEY = 'fake-key'

import { POST, GET } from '@/app/api/synthesize/route'

const mockRequest = (body: unknown, throwError = false) => ({ 
  json: async () => {
    if (throwError) throw new Error('Simulated network error')
    return body
  } 
} as unknown as Request)

interface MockResponse {
  status: number;
  json: () => Promise<Record<string, unknown>>;
}

describe('/api/synthesize', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv, GEMINI_API_KEY: 'fake-key' }
    mockGenerateContent.mockReset()
  })

  afterAll(() => {
    process.env = originalEnv
  })

  describe('success (200)', () => {
    it('returns synthesis with synthesisMode on valid input via fallback when gemini fails', async () => {
      mockGenerateContent.mockRejectedValue(new Error('API Down'))
      const res = await POST(mockRequest({
        verseId: '1.1',
        contextTexts: ['Sample meaning', 'Commentary text'],
        language: 'en'
      })) as unknown as MockResponse
      const data = await res.json()

      expect(res.status).toBe(200)
      expect(data.success).toBe(true)
      expect(typeof data.synthesis).toBe('string')
      expect((data.synthesis as string).length).toBeGreaterThan(0)
      expect(data.synthesisMode).toBe('concatenation-fallback')
      expect(data.metadata).toHaveProperty('verseId', '1.1')
      expect(data.metadata).toHaveProperty('language', 'en')
    })

    it('returns gemini synthesis when successful', async () => {
      mockGenerateContent.mockResolvedValue({
        response: { text: () => 'Gemini synthetic response.' }
      })
      const res = await POST(mockRequest({
        verseId: '1.2',
        contextTexts: ['Sample meaning'],
        language: 'hi'
      })) as unknown as MockResponse
      const data = await res.json()

      expect(res.status).toBe(200)
      expect(data.synthesis).toBe('Gemini synthetic response.')
      expect(data.synthesisMode).toBe('generative-gemini')
      expect(data.metadata).toHaveProperty('language', 'hi')
    })

    it('falls back if gemini times out', async () => {
      const originalSetTimeout = global.setTimeout
      // Immediately trigger the timeout callback
      global.setTimeout = ((cb: (...args: unknown[]) => void) => cb()) as unknown as typeof setTimeout

      mockGenerateContent.mockImplementation(() => new Promise(() => {})) // Never resolves
      const res = await POST(mockRequest({
        verseId: '1.3',
        contextTexts: ['Sample meaning'],
        language: 'en'
      })) as unknown as MockResponse
      const data = await res.json()

      expect(res.status).toBe(200)
      expect(data.synthesisMode).toBe('concatenation-fallback')

      global.setTimeout = originalSetTimeout
    })

    it('defaults language to en when omitted', async () => {
      const res = await POST(mockRequest({
        verseId: 'gita.2.47',
        contextTexts: ['Meaning only']
      })) as unknown as MockResponse
      const data = await res.json()

      expect(res.status).toBe(200)
      expect((data.metadata as Record<string, string>).language).toBe('en')
    })

    it('includes meaning-only synthesis when no commentaries provided', async () => {
      const res = await POST(mockRequest({
        verseId: 'gita.1.1',
        contextTexts: ['Only meaning text here'],
        language: 'hi'
      })) as unknown as MockResponse
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
      })) as unknown as MockResponse
      const data = await res.json()

      expect(res.status).toBe(200)
      expect((data.synthesis as string).length).toBeLessThanOrEqual(2048)
    })
  })

  describe('validation errors (400)', () => {
    it('rejects missing verseId', async () => {
      const res = await POST(mockRequest({ contextTexts: ['text'], language: 'en' })) as unknown as MockResponse
      const data = await res.json()

      expect(res.status).toBe(400)
      expect(data.error).toBe('Missing or invalid verseId.')
      expect(data).not.toHaveProperty('synthesisMode')
    })

    it('rejects empty contextTexts array', async () => {
      const res = await POST(mockRequest({ verseId: '1.1', contextTexts: [] })) as unknown as MockResponse
      const data = await res.json()

      expect(res.status).toBe(400)
      expect(data.error).toBe('No context text provided for synthesis.')
      expect(data).not.toHaveProperty('synthesisMode')
    })

    it('rejects non-array contextTexts', async () => {
      const res = await POST(mockRequest({ verseId: '1.1', contextTexts: 'not-array' })) as unknown as MockResponse
      const data = await res.json()

      expect(res.status).toBe(400)
      expect(data.error).toBe('No context text provided for synthesis.')
      expect(data).not.toHaveProperty('synthesisMode')
    })

    it('rejects unsupported language', async () => {
      const res = await POST(mockRequest({
        verseId: '1.1',
        contextTexts: ['text'],
        language: 'fr'
      })) as unknown as MockResponse
      const data = await res.json()

      expect(res.status).toBe(400)
      expect(data.error as string).toMatch(/unsupported language/i)
      expect(data).not.toHaveProperty('synthesisMode')
    })

    it('rejects contextTexts containing only empty strings', async () => {
      const res = await POST(mockRequest({
        verseId: '1.1',
        contextTexts: ['', '   ', ''],
        language: 'en'
      })) as unknown as MockResponse
      const data = await res.json()

      expect(res.status).toBe(400)
      expect(data.error as string).toMatch(/empty/i)
      expect(data).not.toHaveProperty('synthesisMode')
    })

    it('rejects null body', async () => {
      const res = await POST(mockRequest(null)) as unknown as MockResponse
      const data = await res.json()

      expect(res.status).toBe(400)
      expect(data.error).toBe('Missing or invalid verseId.')
    })
  })

  describe('server errors (500/503)', () => {
    it('returns 503 on unhandled exception', async () => {
      const res = await POST(mockRequest({}, true)) as unknown as MockResponse
      const data = await res.json()

      expect(res.status).toBe(503)
      expect(data.error).toBe('Synthesis service temporarily unavailable.')
    })
  })

  describe('GET method', () => {
    it('returns 405 Method Not Allowed', async () => {
      const res = await GET() as unknown as MockResponse
      const data = await res.json()
      expect(res.status).toBe(405)
      expect(data.error).toBe('Method not allowed')
    })
  })
})
