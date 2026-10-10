import { NextResponse } from 'next/server'
import type { z } from 'zod'
import { checkRateLimit } from './rate-limit'

export const MAX_BODY_SIZE = 1048576; // 1MB

export async function validateApiRequest<T>(
  request: Request,
  schema: z.ZodType<T>,
  options?: { requireSameOrigin?: boolean }
): Promise<{ data?: T; error?: NextResponse }> {
  // 1. Rate Limiting Check (DDoS protection)
  // Retrieve client IP from standard headers, defaulting to 'anonymous'
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const clientIp = forwardedFor?.split(',')[0] || realIp || 'anonymous';

  const rateLimitResult = await checkRateLimit(clientIp);

  if (!rateLimitResult.success) {
    return {
      error: NextResponse.json(
        { error: 'Too Many Requests', code: 'RATE_LIMIT_EXCEEDED' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
          }
        }
      )
    };
  }

  // 2. Same-Origin Check (CSRF protection)
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

  // 3. Content-Type Check
  const contentType = request.headers.get('content-type') || ''
  if (!contentType.includes('application/json') && request.method !== 'GET') {
    return { error: NextResponse.json({ error: 'Content-Type must be application/json', code: 'UNSUPPORTED_MEDIA_TYPE' }, { status: 415 }) }
  }

  // 4. Body Size Cap & JSON Parsing
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

  // 5. Schema Validation
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
