import { GET } from '@/app/api/health/route'

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

describe('GET /api/health', () => {
  it('returns a successful health status', async () => {
    const response = await GET() as unknown as { status: number, json: () => Promise<unknown> }
    const data = await response.json() as Record<string, unknown>

    expect(response.status).toBe(200)
    expect(data.status).toBe('ok')
    expect(data).toHaveProperty('version')
    expect(data).toHaveProperty('timestamp')
  })
})
