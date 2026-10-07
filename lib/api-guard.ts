import { NextResponse } from 'next/server'
import type { z } from 'zod'

export const MAX_BODY_SIZE = 1048576; // 1MB

export async function validateApiRequest<T>(
  request: Request,
  schema: z.ZodType<T>,
  options?: { requireSameOrigin?: boolean }
): Promise<{ data?: T; error?: NextResponse }> {
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
