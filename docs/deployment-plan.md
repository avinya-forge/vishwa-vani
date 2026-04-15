# Zero-Cost Production Stack Plan

For Vishwa-Vani to run fully on a $0/mo production deployment stack while handling data and auth needs effectively, the architecture will be structured as follows:

## Architecture Stack

| LAYER | TOOL | FREE LIMIT | PROJECTED USAGE | COST ($0) |
|-------|------|------------|-----------------|-----------|
| **Hosting / Edge** | Cloudflare Pages / Workers | 100k requests/day | ~10k page views/day | $0 |
| **Database** | Supabase (PostgreSQL) | 500MB DB space, 2GB Bandwidth/mo | ~50MB data, 1GB bandwidth | $0 |
| **Alternative DB** | Cloudflare D1 (SQLite) | 5M read/day, 100k write/day | ~50k read/day | $0 |
| **Auth** | Clerk | 10k Monthly Active Users | ~1k MAU | $0 |
| **AI API** | Google Gemini Flash | 15 RPM / 1M tokens per min | ~50-100 queries/day | $0 |

## Integration Steps:

1. Migrate the Next.js deployment from Vercel to Cloudflare Pages using the `@cloudflare/next-on-pages` adapter.
2. Initialize Supabase Free Tier for any relational data that requires complex queries beyond the static NVF json (e.g. feedback widget data, user bookmarks). Alternatively, Cloudflare D1 can be used entirely at the edge.
3. Integrate Clerk for user authentication to allow saving favorite verses or customized reading progress.
4. Update the synthesis and ask APIs to utilize Gemini Flash instead of Anthropic API to keep costs at zero, adhering to the generous free tier.
