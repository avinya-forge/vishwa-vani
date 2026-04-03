// Mock Next.js modules
jest.mock('next/server', () => ({
  NextResponse: {
    json: (data: any, options?: any) => ({
      status: options?.status || 200,
      json: async () => data
    })
  }
}));

import { POST } from '@/app/api/synthesize/route';

// Mock NextRequest
const mockNextRequest = (body: any) => ({
  json: async () => body
});

describe('/api/synthesize', () => {
  it('should return sample text for synthesis request', async () => {
    const mockRequest = mockNextRequest({
      verseId: '1.1',
      contextTexts: ['Sample Sanskrit text', 'Bhagavad Gita Chapter 1'],
      language: 'en'
    });

    const response = await POST(mockRequest as any);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('success', true);
    expect(data).toHaveProperty('synthesis');
    expect(typeof data.synthesis).toBe('string');
    expect(data.synthesis.length).toBeGreaterThan(0);
  });

  it('should handle empty request body', async () => {
    const mockRequest = mockNextRequest({
      contextTexts: []
    });

    const response = await POST(mockRequest as any);

    expect(response.status).toBe(400);
  });
});