/**
 * @jest-environment node
 */
import { validateApiRequest } from '@/lib/api-guard';
import { checkRateLimit } from '@/lib/rate-limit';
import { z } from 'zod';
import { NextRequest } from 'next/server';

jest.mock('@/lib/rate-limit', () => ({
  checkRateLimit: jest.fn(),
}));

const mockSchema = z.object({
  name: z.string(),
});

describe('validateApiRequest with Rate Limiting', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 429 when rate limit is exceeded', async () => {
    // Mock the rate limiter to return failure
    (checkRateLimit as jest.Mock).mockResolvedValue({
      success: false,
      limit: 10,
      remaining: 0,
      reset: 1234567890,
    });

    const mockRequest = new NextRequest('http://localhost:3000/api/test', {
      method: 'POST',
      headers: new Headers({
        'x-forwarded-for': '192.168.1.1',
      }),
    });

    const result = await validateApiRequest(mockRequest, mockSchema);

    expect(checkRateLimit).toHaveBeenCalledWith('192.168.1.1');
    expect(result.error).toBeDefined();

    // Verify response format
    const responseData = await result.error?.json();
    expect(result.error?.status).toBe(429);
    expect(responseData.error).toBe('Too Many Requests');
    expect(responseData.code).toBe('RATE_LIMIT_EXCEEDED');

    // Verify headers
    expect(result.error?.headers.get('X-RateLimit-Limit')).toBe('10');
    expect(result.error?.headers.get('X-RateLimit-Remaining')).toBe('0');
    expect(result.error?.headers.get('X-RateLimit-Reset')).toBe('1234567890');
  });

  it('should process request when rate limit is not exceeded', async () => {
    (checkRateLimit as jest.Mock).mockResolvedValue({
      success: true,
      limit: 10,
      remaining: 9,
      reset: 1234567890,
    });

    const mockRequest = new NextRequest('http://localhost:3000/api/test', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
        origin: 'http://localhost:3000',
        host: 'localhost:3000',
      }),
      body: JSON.stringify({ name: 'test user' }),
    });

    const result = await validateApiRequest(mockRequest, mockSchema);

    expect(checkRateLimit).toHaveBeenCalledWith('anonymous'); // No x-forwarded-for or x-real-ip
    expect(result.error).toBeUndefined();
    expect(result.data).toEqual({ name: 'test user' });
  });

  it('should extract client IP from x-real-ip if x-forwarded-for is missing', async () => {
    (checkRateLimit as jest.Mock).mockResolvedValue({
      success: true,
      limit: 10,
      remaining: 9,
      reset: 1234567890,
    });

    const mockRequest = new NextRequest('http://localhost:3000/api/test', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
        origin: 'http://localhost:3000',
        host: 'localhost:3000',
        'x-real-ip': '10.0.0.1'
      }),
      body: JSON.stringify({ name: 'test user' }),
    });

    await validateApiRequest(mockRequest, mockSchema);

    expect(checkRateLimit).toHaveBeenCalledWith('10.0.0.1');
  });
});
