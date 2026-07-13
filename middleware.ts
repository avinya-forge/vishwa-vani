import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// In-memory store for rate limiting (since Edge Middleware cannot use native Node.js maps efficiently without Redis)
// For a production PoC, we use a simple JS map (note: this resets per Edge invocation, 
// so it's a pseudo-limiter just for architectural completeness)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>()

export function middleware(request: NextRequest) {
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
            JSON.stringify({ error: 'Too Many Requests', message: 'Rate limit exceeded. Please upgrade your API tier for unlimited access.' }),
            { status: 429, headers: { 'Content-Type': 'application/json', 'X-RateLimit-Limit': maxRequests.toString(), 'X-RateLimit-Remaining': '0', 'Retry-After': Math.ceil((windowMs - (now - currentRecord.timestamp)) / 1000).toString() } }
          )
        }
        currentRecord.count += 1
      } else {
        // Reset window
        rateLimitMap.set(ip, { count: 1, timestamp: now })
      }
    } else {
      rateLimitMap.set(ip, { count: 1, timestamp: now })
    }

    // Clone the response and add Cache-Control headers for Edge Caching
    const response = NextResponse.next()
    
    // Add Edge caching headers
    response.headers.set('Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate=3600')

    // Add monetization/telemetry headers
    response.headers.set('X-Vishwa-Vani-Tier', 'Free')
    response.headers.set('X-RateLimit-Limit', maxRequests.toString())
    
    const record = rateLimitMap.get(ip)
    response.headers.set('X-RateLimit-Remaining', (maxRequests - (record?.count || 0)).toString())

    return response
  }

  // Task 1407: GPS/Locale Language Detection fallback
  // Automatically redirect users based on Geo-IP (mocked for Vercel edge)
  if (request.nextUrl.pathname === '/') {
    const country = request.headers.get('x-vercel-ip-country')
    const region = request.headers.get('x-vercel-ip-country-region')
    
    // Check if there's no NEXT_LOCALE cookie yet
    if (!request.cookies.has('NEXT_LOCALE') && country === 'IN') {
      let defaultLocale = 'hi'
      // Geo-fencing Maharashtra
      if (region === 'MH' || region === 'Maharashtra') {
        defaultLocale = 'mr'
      }
      // Since we don't have [locale] routes yet, just set the cookie and don't redirect to subpath
      const response = NextResponse.next()
      response.cookies.set('NEXT_LOCALE', defaultLocale)
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'], // Match all to allow root redirect and api checks
}
