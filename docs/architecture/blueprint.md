# 🏗️ Vishwa-Vani: Architecture Blueprint

## 5. Architecture Principles
- **Static-first**: prefer SSG; client-side intelligence only when needed.
- **Sharded data**: use chapter-level JSON for large scriptures.
- **NVF compliance**: normalize and version data.
- **Data service**: use `lib/data-service.ts` for unified access.
- **Search**: prefer build-time indexes or lightweight local search.
- **Navigation**: auto-register books from filesystem metadata.

## 6. API Expectations
- `GET /v1/manifest` — list scriptures and metadata.
- `GET /v1/verse/{slug}/{chapter}/{verse}` — verse data with commentary layers.
- `POST /v1/search` — semantic search input.
- `POST /v1/synthesize` — AI synthesis using meaning plus up to 2 commentaries.
- Security: bearer tokens or OAuth2 where required.
- Rate limits should be defined per consumer tier.
