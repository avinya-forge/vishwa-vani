import { POST } from '@/app/api/feedback/route'

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

describe('POST /api/feedback', () => {
  const originalEnv = process.env
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
    global.fetch = jest.fn()
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  })

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  })

  afterAll(() => {
    process.env = originalEnv
  })

  const mockRequest = (body: unknown) => ({
    json: async () => body
  } as Request)

  it('returns 400 if type or message is missing', async () => {
    const res = await POST(mockRequest({ type: 'Bug' })) as unknown as { status: number, json: () => Promise<unknown> }
    expect(res.status).toBe(400)
    const data = await res.json() as { error: string }
    expect(data.error).toBe('Type and message are required')
  })

  it('returns 400 if message is too short', async () => {
    const res = await POST(mockRequest({ type: 'Bug', message: 'Too short' })) as unknown as { status: number, json: () => Promise<unknown> }
    expect(res.status).toBe(400)
    const data = await res.json() as { error: string }
    expect(data.error).toBe('Message must be at least 200 characters long')
  })

  it('simulates success in test env (or when missing token)', async () => {
    const validMessage = 'a'.repeat(200)
    const res = await POST(mockRequest({ type: 'Bug', message: validMessage })) as unknown as { status: number, json: () => Promise<unknown> }

    expect(res.status).toBe(200)
    const data = await res.json() as { success: boolean, mocked: boolean }
    expect(data.success).toBe(true)
    expect(data.mocked).toBe(true)
  })

  it('calls GitHub API when token is present and not in test env', async () => {
    Object.defineProperty(process.env, 'NODE_ENV', { value: 'production' })
    process.env.GITHUB_TOKEN = 'fake-token'

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ html_url: 'https://github.com/mock/issue/2' })
    })

    const validMessage = 'a'.repeat(200)
    const res = await POST(mockRequest({ type: 'Bug', message: validMessage, email: 'test@example.com' })) as unknown as { status: number, json: () => Promise<unknown> }

    expect(res.status).toBe(200)
    const data = await res.json() as { success: boolean, url: string }
    expect(data.success).toBe(true)
    expect(data.url).toBe('https://github.com/mock/issue/2')

    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith('https://api.github.com/repos/avinya-forge/vishwa-vani/issues', expect.objectContaining({
      method: 'POST',
      headers: expect.objectContaining({
        'Authorization': 'Bearer fake-token'
      })
    }))
  })

  it('handles GitHub API failure', async () => {
    Object.defineProperty(process.env, 'NODE_ENV', { value: 'production' })
    process.env.GITHUB_TOKEN = 'fake-token'

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Bad credentials' })
    })

    const validMessage = 'a'.repeat(200)
    const res = await POST(mockRequest({ type: 'Bug', message: validMessage })) as unknown as { status: number, json: () => Promise<unknown> }

    expect(res.status).toBe(502)
    const data = await res.json() as { error: string }
    expect(data.error).toBe('Failed to create GitHub issue')
  })
})
