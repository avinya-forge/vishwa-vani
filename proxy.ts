import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// In-memory fallback if no distributed KV is available. 
// Note: This resets on cold start in serverless.
const ipRequests = new Map<string, { count: number, resetTime: number }>()

function getRateLimit(ip: string, routeName: string, maxRequests: number, windowMs: number) {
  const key = `${ip}:${routeName}`
  const now = Date.now()
  const record = ipRequests.get(key)

  if (!record || now > record.resetTime) {
    ipRequests.set(key, { count: 1, resetTime: now + windowMs })
    return { limited: false }
  }

  if (record.count >= maxRequests) {
    return { limited: true }
  }

  record.count += 1
  ipRequests.set(key, record)
  return { limited: false }
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const ip = (request as unknown as { ip: string }).ip || request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1'

  // SEC-016: Drop internal headers
  const requestHeaders = new Headers(request.headers)
  requestHeaders.delete('X-Vishwa-Vani-Tier')
  
  // Enforce lowercase URLs for SEO (PROD-003)
  if (pathname !== pathname.toLowerCase() && !pathname.startsWith('/api')) {
    return NextResponse.redirect(new URL(pathname.toLowerCase(), request.url), 308)
  }

  // Apply rate limits
  if (pathname.startsWith('/api/synthesize')) {
    // Kill switch
    if (process.env.SYNTHESIS_ENABLED === 'false') {
      return NextResponse.json({ error: 'Synthesis is disabled', code: 'DISABLED' }, { status: 403 })
    }

    const { limited } = getRateLimit(ip, 'synthesize', 5, 60000) // 5 per minute
    if (limited) {
      return NextResponse.json({ error: 'Too many synthesis requests', code: 'RATE_LIMITED' }, { status: 429 })
    }
  } else if (pathname.startsWith('/api/feedback') || pathname.startsWith('/api/commentary-rating')) {
    const { limited } = getRateLimit(ip, 'feedback', 3, 60000) // 3 per minute
    if (limited) {
      return NextResponse.json({ error: 'Too many feedback requests', code: 'RATE_LIMITED' }, { status: 429 })
    }
  } else if (pathname.startsWith('/api/')) {
    // General API rate limit (from old proxy.ts)
    const { limited } = getRateLimit(ip, 'general_api', 100, 60000) // 100 per minute
    if (limited) {
      return new NextResponse(
        JSON.stringify({ error: 'Too Many Requests', message: 'Rate limit exceeded.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      )
    }
  }
  
  // SEC-015: CSP Headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    }
  })
  
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-random123' 'strict-dynamic' https:;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    connect-src 'self' https://vitals.vercel-insights.com;
  `.replace(/\s{2,}/g, ' ').trim()

  response.headers.set('Content-Security-Policy-Report-Only', cspHeader)

  // Locale Language Detection fallback (from old proxy.ts)
  if (pathname === '/') {
    const country = request.headers.get('x-vercel-ip-country')
    const region = request.headers.get('x-vercel-ip-country-region')
    
    if (!request.cookies.has('NEXT_LOCALE') && country === 'IN') {
      let defaultLocale = 'hi'
      if (region === 'MH' || region === 'Maharashtra') {
        defaultLocale = 'mr'
      }
      
      // SEC-016: Harden cookie
      response.cookies.set('NEXT_LOCALE', defaultLocale, {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 31536000 // 1 year
      })
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
