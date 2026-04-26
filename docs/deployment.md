# Deployment and Domain Configuration

## Domain Configuration (PUB-001)

The production domain is configured to **vishwavani.app**.

### Vercel Integration
- **A Records**: Point `@` to `76.76.21.21`
- **CNAME**: Point `www` to `cname.vercel-dns.com`

## DNS & Security Layer (PUB-002)

Cloudflare is used as the DNS and CDN layer.

### Configuration
- **SSL/TLS**: Set to "Full (Strict)"
- **DDoS Protection**: Enabled (Under Attack Mode available)
- **Edge Caching**: Configured for static assets in `public/` and `_next/static/`
- **WAF Rules**: Basic SQL injection and XSS protection enabled

### CDN Settings
- **Brotli**: Enabled
- **Auto Minify**: HTML, CSS, and JS enabled
- **Rocket Loader**: Disabled (to avoid issues with Hydration)

---

## Future Zero-Cost Architecture Plan

To maintain a $0/mo footprint as scale increases, the following stack migration is planned:

| LAYER | TOOL | FREE LIMIT | PURPOSE |
|-------|------|------------|---------|
| **Hosting** | Cloudflare Pages | 100k requests/day | Edge-rendered Next.js via `@cloudflare/next-on-pages` |
| **Database** | Supabase / D1 | 500MB / 5M reads | Relational storage for user bookmarks and feedback |
| **Auth** | Clerk | 10k MAU | User authentication and persistence |
| **AI API** | Google Gemini Flash | 15 RPM / 1M TPM | Free-tier synthesis and analysis |

### Key Migration Steps:
1. Initialize Supabase/D1 for dynamic features (bookmarks, progress).
2. Integrate Clerk for auth.
3. Switch synthesis API from Anthropic/OpenAI to Gemini Flash.
4. Final migration of compute from Vercel to Cloudflare Workers/Pages.
