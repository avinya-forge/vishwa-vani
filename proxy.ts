import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// In-memory store for rate limiting (pseudo-limiter for edge)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>()

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // SEC-016: Drop internal headers
  const responseHeaders = new Headers(request.headers)
  responseHeaders.delete('X-Vishwa-Vani-Tier')
  
  // Enforce lowercase URLs for SEO (PROD-003)
  if (pathname !== pathname.toLowerCase() && !pathname.startsWith('/_next') && !pathname.startsWith('/api')) {
    return NextResponse.redirect(new URL(pathname.toLowerCase(), request.url), 308)
  }

  // Only apply to API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for') || 'anonymous'
    const now = Date.now()
    const windowMs = 60000 // 1 minute
    const maxRequests = 100 // 100 requests per minute

    const currentRecord = rateLimitMap.get(ip)

    if (currentRecord) {
      if (now - currentRecord.timestamp < windowMs) {
        if (currentRecord.count >= maxRequests) {
          return new NextResponse(
            JSON.stringify({ error: 'Too Many Requests', message: 'Rate limit exceeded.' }),
            { status: 429, headers: { 'Content-Type': 'application/json' } } // Removed inaccurate headers
          )
        }
        currentRecord.count += 1
      } else {
        rateLimitMap.set(ip, { count: 1, timestamp: now })
      }
    } else {
      rateLimitMap.set(ip, { count: 1, timestamp: now })
    }

    const response = NextResponse.next()
    return response
  }

  // Locale Language Detection fallback
  if (request.nextUrl.pathname === '/') {
    const country = request.headers.get('x-vercel-ip-country')
    const region = request.headers.get('x-vercel-ip-country-region')
    
    if (!request.cookies.has('NEXT_LOCALE') && country === 'IN') {
      let defaultLocale = 'hi'
      if (region === 'MH' || region === 'Maharashtra') {
        defaultLocale = 'mr'
      }
      
      const response = NextResponse.next()
      // SEC-016: Harden cookie
      response.cookies.set('NEXT_LOCALE', defaultLocale, {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 31536000 // 1 year
      })
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  runtime: 'nodejs',
  // SEC-016: Narrow matcher to exclude all static assets and images
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
