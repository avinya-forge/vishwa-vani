import { GET } from '@/app/api/health/route'

jest.mock('next/server', () => {
  return {
    NextResponse: {
      json: (body: any, init?: any) => {
        return {
          status: init?.status || 200,
          json: async () => body
        }
      }
    }
  }
})

describe('GET /api/health', () => {
  it('returns a successful health status', async () => {
    const response = await GET() as any
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.status).toBe('ok')
    expect(data).toHaveProperty('version')
    expect(data).toHaveProperty('timestamp')
  })
})
