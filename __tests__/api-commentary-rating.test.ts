import { POST } from '@/app/api/commentary-rating/route'

jest.mock('next/server', () => {
  return {
    NextResponse: {
      json: (body: unknown, init?: unknown) => {
        return {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          status: (init as any)?.status || 200,
          json: async () => body
        }
      }
    }
  }
})

describe('POST /api/commentary-rating', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
    global.fetch = jest.fn()
  })

  afterAll(() => {
    process.env = originalEnv
  })

  const mockRequest = (body: unknown) => ({
    json: async () => body
  } as Request)

  it('returns 400 if required fields are missing', async () => {
    const res = await POST(mockRequest({ scriptureId: 'bhagavad-gita', scholarId: 'adi-shankara' })) as unknown as { status: number, json: () => Promise<unknown> }
    expect(res.status).toBe(400)
    const data = await res.json() as { error: string }
    expect(data.error).toContain('are required')
  })

  it('returns 400 if rating is out of bounds', async () => {
    const payload = {
      scriptureId: 'bhagavad-gita',
      chapter: 1,
      verse: 1,
      scholarId: 'adi-shankara',
      rating: 6
    }
    const res = await POST(mockRequest(payload)) as unknown as { status: number, json: () => Promise<unknown> }
    expect(res.status).toBe(400)
    const data = await res.json() as { error: string }
    expect(data.error).toBe('Rating must be an integer between 1 and 5')
  })

  it('returns 400 if rating is less than 1', async () => {
    const payload = {
      scriptureId: 'bhagavad-gita',
      chapter: 1,
      verse: 1,
      scholarId: 'adi-shankara',
      rating: 0
    }
    const res = await POST(mockRequest(payload)) as unknown as { status: number, json: () => Promise<unknown> }
    expect(res.status).toBe(400)
    const data = await res.json() as { error: string }
    expect(data.error).toBe('Rating must be an integer between 1 and 5')
  })

  it('returns 200 in test mode (or missing GITHUB_TOKEN)', async () => {
    const payload = {
      scriptureId: 'bhagavad-gita',
      chapter: 1,
      verse: 1,
      scholarId: 'adi-shankara',
      rating: 5,
      feedbackText: 'Beautiful translation.'
    }
    const res = await POST(mockRequest(payload)) as unknown as { status: number, json: () => Promise<unknown> }
    expect(res.status).toBe(200)
    const data = await res.json() as { success: boolean, mocked: boolean }
    expect(data.success).toBe(true)
    expect(data.mocked).toBe(true)
  })

  it('submits successfully to GitHub issues when token is present in production env', async () => {
    Object.defineProperty(process.env, 'NODE_ENV', { value: 'production' })
    process.env.GITHUB_TOKEN = 'fake-telemetry-token'

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ html_url: 'https://github.com/mock/rating/123' })
    })

    const payload = {
      scriptureId: 'bhagavad-gita',
      chapter: 1,
      verse: 1,
      scholarId: 'adi-shankara',
      rating: 4,
      feedbackText: 'Very deep and authentic commentary!'
    }

    const res = await POST(mockRequest(payload)) as unknown as { status: number, json: () => Promise<unknown> }

    expect(res.status).toBe(200)
    const data = await res.json() as { success: boolean, url: string }
    expect(data.success).toBe(true)
    expect(data.url).toBe('https://github.com/mock/rating/123')

    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith('https://api.github.com/repos/avinya-forge/vishwa-vani/issues', expect.objectContaining({
      method: 'POST',
      headers: expect.objectContaining({
        'Authorization': 'Bearer fake-telemetry-token'
      })
    }))
  })

  it('returns 502 if GitHub API fails in production env', async () => {
    Object.defineProperty(process.env, 'NODE_ENV', { value: 'production' })
    process.env.GITHUB_TOKEN = 'fake-telemetry-token'

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Bad credentials' })
    })

    const payload = {
      scriptureId: 'bhagavad-gita',
      chapter: 1,
      verse: 1,
      scholarId: 'adi-shankara',
      rating: 3
    }

    const res = await POST(mockRequest(payload)) as unknown as { status: number, json: () => Promise<unknown> }

    expect(res.status).toBe(502)
    const data = await res.json() as { error: string }
    expect(data.error).toBe('Failed to submit rating telemetry')
  })
})
