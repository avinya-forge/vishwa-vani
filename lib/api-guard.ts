import { NextResponse } from 'next/server'
import type { z } from 'zod'

export const MAX_BODY_SIZE = 1048576; // 1MB

// In-memory sliding-window rate limiter (OWASP A04: Anti-Scraping / Token Bucket)
interface RateLimitBucket {
  count: number;
  resetTime: number;
}
const rateLimitMap = new Map<string, RateLimitBucket>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 60; // 60 requests per minute per IP

export function checkRateLimit(clientIdentifier: string, maxRequests: number = MAX_REQUESTS_PER_WINDOW): boolean {
  const now = Date.now();
  const bucket = rateLimitMap.get(clientIdentifier);

  if (!bucket || now > bucket.resetTime) {
    rateLimitMap.set(clientIdentifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    if (rateLimitMap.size > 5_000) {
      for (const [key, b] of rateLimitMap.entries()) {
        if (now > b.resetTime) rateLimitMap.delete(key);
      }
    }
    return true;
  }

  if (bucket.count >= maxRequests) {
    return false;
  }

  bucket.count++;
  return true;
}

export async function validateApiRequest<T>(
  request: Request,
  schema: z.ZodType<T>,
  options?: { requireSameOrigin?: boolean; maxRequestsPerMinute?: number }
): Promise<{ data?: T; error?: NextResponse }> {
  // 0. Rate-limiting check (OWASP A04 / LLM04)
  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                   request.headers.get('x-real-ip') || 
                   'client-anonymous';
  if (!checkRateLimit(clientIp, options?.maxRequestsPerMinute ?? MAX_REQUESTS_PER_WINDOW)) {
    return {
      error: NextResponse.json(
        { error: 'Rate limit exceeded. Please try again in 1 minute.', code: 'RATE_LIMIT_EXCEEDED' },
        { status: 429, headers: { 'Retry-After': '60' } }
      )
    };
  }

  // 1. Same-Origin Check (CSRF protection)
  if (options?.requireSameOrigin !== false && request.method !== 'GET') {
    const origin = request.headers.get('origin')
    const host = request.headers.get('host')
    
    // In production, require strict match. In dev, allow localhost.
    if (origin && host) {
      try {
        const originUrl = new URL(origin)
        if (originUrl.host !== host) {
          return { error: NextResponse.json({ error: 'Invalid Origin', code: 'FORBIDDEN' }, { status: 403 }) }
        }
      } catch {
        return { error: NextResponse.json({ error: 'Malformed Origin', code: 'BAD_REQUEST' }, { status: 400 }) }
      }
    }
  }

  // 2. Content-Type Check
  const contentType = request.headers.get('content-type') || ''
  if (!contentType.includes('application/json') && request.method !== 'GET') {
    return { error: NextResponse.json({ error: 'Content-Type must be application/json', code: 'UNSUPPORTED_MEDIA_TYPE' }, { status: 415 }) }
  }

  // 3. Body Size Cap & JSON Parsing
  let body;
  try {
    const rawBody = await request.text()
    if (rawBody.length > MAX_BODY_SIZE) {
      return { error: NextResponse.json({ error: 'Payload Too Large', code: 'PAYLOAD_TOO_LARGE' }, { status: 413 }) }
    }
    if (rawBody) {
      body = JSON.parse(rawBody)
    }
  } catch {
    return { error: NextResponse.json({ error: 'Malformed JSON', code: 'BAD_REQUEST' }, { status: 400 }) }
  }

  // 4. Schema Validation
  if (body) {
    const parseResult = schema.safeParse(body)
    if (!parseResult.success) {
      return { 
        error: NextResponse.json(
          { error: parseResult.error.issues[0]?.message || 'Validation Error', code: 'VALIDATION_ERROR', details: parseResult.error.format() },
          { status: 400 }
        ) 
      }
    }
    return { data: parseResult.data }
  }

  return { error: NextResponse.json({ error: 'Empty body', code: 'BAD_REQUEST' }, { status: 400 }) }
}
