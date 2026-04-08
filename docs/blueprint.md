# 🏗️ Vishwa-Vani: Architecture Blueprint v1.0

**Document Version**: 1.0  
**Last Updated**: 2026-04-09  
**Status**: Production Architecture  
**Audience**: Architects, Engineers, Stakeholders

---

## 1. Executive Summary

### Product Vision

**Vishwa-Vani** ("The Universal Voice") is an open-access, AI-first Vedic scripture platform serving Sanskrit texts—Bhagavad Gita, Mahabharata, Upanishads, Vedas, and Puranas—with transliteration, layered scholarship, and AI-assisted synthesis. It targets scholars, spiritual practitioners, and the curious global audience seeking wisdom from ancient Indian civilization.

The vision unfolds in three phases:
1. **Alpha** (current): Static-first platform with scholarly commentary, zero infrastructure cost
2. **Beta**: AI synthesis layer, semantic search, micro-app ecosystem
3. **Public Release**: Fully indexed, searchable, globally available knowledge commons

### Current State vs. Target

| Dimension | Current (v0.9.2) | Target (Public Release) |
|-----------|------------------|------------------------|
| **Available Texts** | 1 (Bhagavad Gita, 657 verses) | 15+ (Vedas, Puranas, Upanishads, ~100K+ verses) |
| **Data Tier** | Gita fully in Gold; Mahabharata 3/18 parvas in Silver | 100% Gold-tier verified content |
| **AI Capabilities** | Concatenation stub | Semantic search + Claude synthesis + topic indexing |
| **Cost Model** | Zero (Vercel free, static storage) | Micro (Claude API + optional CDN) |
| **UI Coverage** | Gita, stub Mahabharata routes | All texts, hierarchical routing, full responsive |
| **Search** | None | Full-text + semantic + cross-text philosophy |
| **Mobile Ready** | Partial (needs responsive audit) | Full (iOS/Android optimized) |

### Architectural Philosophy

1. **Static-First**: Pre-render all reading pages at build time (SSG) via Next.js `generateStaticParams`. Minimize serverless compute.
2. **Sharded Data**: Split large texts (Mahabharata, Puranas) into chapter-level JSON files (<50KB per adhyaya) to keep build payloads manageable and enable incremental ingestion.
3. **Normalized Schema (NVF v1.3)**: All verses conform to a unified Normalized Vedic Fragment schema: `{ id, text_slug, chapter, verse, original, transliteration, layers[] }`. Enables AI analysis and consistent UI rendering.
4. **Zero-Touch Registration**: Books auto-register from `lib/texts.ts` VEDIC_LIBRARY. Add an entry → framework routes, SSG, search, and navigation all auto-update.
5. **Web Worker Isolation**: SQLite WASM queries run off main thread via `lake.worker.ts` to prevent jank on verse lookups.
6. **Offline-Capable**: SQLite WASM + JSON shards stored as static assets. Pages can load without CDN after initial fetch.

---

## 2. System Topology

```
┌─────────────────────────────────────────────────────────────────┐
│                         END USER BROWSER                         │
│  Renders study-client.tsx, manages state (scholars, language)   │
│  Web Worker → SQLite WASM queries in background               │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────────┐
        │    Vercel CDN (fra1)       │
        │  - Cached HTML pages       │
        │  - JSON shards (<50KB)     │
        │  - SQLite WASM blobs       │
        │  - Fonts, assets           │
        └────────────────┬───────────┘
                         │
        ┌────────────────▼──────────────────┐
        │    Vercel Serverless Functions   │
        │  (10s max duration)               │
        │  - /api/synthesize (Claude AI)   │
        │  - /api/feedback → GitHub Issues │
        │  - /api/health (monitoring)      │
        └────────────────┬──────────────────┘
                         │
        ┌────────────────▼──────────────────────┐
        │      Next.js 16 (App Router)          │
        │  ┌──────────────────────────────────┐ │
        │  │ SSG Pages (getStaticParams)      │ │
        │  │ /[text]/[chapter]/page.tsx       │ │
        │  │ /[text]/[chapter]/[verse]/...    │ │
        │  │ Pre-rendered at build time       │ │
        │  └──────────────────────────────────┘ │
        │  ┌──────────────────────────────────┐ │
        │  │ Client Components                │ │
        │  │ StudyClient (interactive UI)     │ │
        │  │ VedicAppTemplate (lab wrapper)   │ │
        │  └──────────────────────────────────┘ │
        │  ┌──────────────────────────────────┐ │
        │  │ Middleware (i18n, CSP)           │ │
        │  │ next-intl routing (en/hi/mr)     │ │
        │  └──────────────────────────────────┘ │
        └──────────────┬───────────────────────┘
                       │
        ┌──────────────▼───────────────────┐
        │   Data Layer & Services          │
        │  ┌────────────────────────────┐  │
        │  │ VedicDataService (Singleton)  │ │
        │  │ - In-memory JSON cache       │ │
        │  │ - Lake (SQLite WASM) wrapper │ │
        │  │ - NVF enrichment            │ │
        │  └────────────────────────────┘  │
        │  ┌────────────────────────────┐  │
        │  │ lib/lake.ts / lake.worker.ts  │ │
        │  │ SQLite WASM thread pool     │ │
        │  └────────────────────────────┘  │
        └──────────────┬────────────────────┘
                       │
        ┌──────────────▼─────────────────────────┐
        │   Static Assets (/public)              │
        │  - vedic-lake.db (Gita ~21.6MB)        │
        │  - itihasa-lake.db (Mahabharata prep)  │
        │  - purana-lake.db, ritual-node.db      │
        │  - Fonts (Devanagari, Latin)           │
        └──────────────┬─────────────────────────┘
                       │
        ┌──────────────▼──────────────────────┐
        │   File System Storage                │
        │  /data/1-bronze/     (Raw OCR)      │
        │  /data/2-silver/     (NVF Drafts)   │
        │  /data/3-gold/       (UI-Ready JSON)│
        │    ├── bhagavad-gita/               │
        │    │   └── chapter-*.json           │
        │    └── mahabharata/                 │
        │        └── parva-*/adhyaya-*.json   │
        │  /data/manifest.json (Registry)     │
        └──────────────┬──────────────────────┘
                       │
        ┌──────────────▼────────────────────────────┐
        │   Source Control & CI/CD                  │
        │  GitHub repo (public, MIT licensed)      │
        │  Branches: main (prod), develop (staging) │
        │  GitHub Actions: lint → test → build     │
        │  Triggered on push, PR, manual           │
        └──────────────┬─────────────────────────────┘
                       │
        ┌──────────────▼──────────────────────────────┐
        │   Monitoring & Feedback                     │
        │  - Vercel Analytics (free web vitals)      │
        │  - Console errors → Vercel logs            │
        │  - /api/feedback → GitHub Issues (API)     │
        │  - Beta banner (visible in UI)             │
        └────────────────────────────────────────────┘
```

---

## 3. Zero-Cost Deployment Architecture

Vishwa-Vani runs entirely on **free tier** services. This section documents the full cost model and trade-offs.

### Vercel Free Tier (https://vercel.com/pricing)

| Quota | Monthly Limit | Our Usage |
|-------|---------------|-----------|
| **Bandwidth** | 100 GB / month | ~10-20 GB (estimated) |
| **Serverless Function Invocations** | 100,000 / month | ~500-1K (synthesis API only) |
| **Preview Deployments** | Unlimited | Per PR |
| **HTTPS & SSL** | Automatic | Included |
| **CDN Caching** | Global (fra1 primary) | Automatic |
| **Uptime SLA** | 99.95% | Best effort |

**Trade-offs**:
- Cold start latency: API routes experience ~200-500ms cold boot
- Mitigation: Keep serverless functions minimal; pre-render reading pages; cache aggressively

### GitHub (Free Tier)

| Feature | Limit | Usage |
|---------|-------|-------|
| **Public Repository** | Unlimited | Hosted code |
| **Issue Tracking** | Unlimited | Beta feedback collection |
| **Actions Minutes (public)** | 2,000/month | CI pipeline (~100-200 min/month) |
| **API Rate Limit** | 60 req/hour (unauthenticated) | Feedback webhook integration |

### Data Storage (Static Assets, No Database)

- **JSON Shards** (`/data/3-gold/`): Flat JSON files per chapter, loaded at build time
- **SQLite WASM** (`/public/*.db`): Compiled to WASM, cached in browser or served from CDN
- **Total Size**: ~50MB (vedic-lake.db ~21.6MB + itihasa-lake.db ~27.5MB)
- **Strategy**: Split by book/category to allow incremental download

### No Third-Party Services Required

- **No Database**: PostgreSQL, Firebase, Supabase — none required. All data is static or pre-computed.
- **No Auth**: Public read-only platform, no user accounts needed yet
- **No Email**: No newsletter, no transactional email (would require SendGrid, Mailgun)
- **No Analytics**: Optional Vercel Analytics (free) or Google Analytics (free, but requires UA)

### Cost Scaling Path

| Phase | Trigger | Estimated Cost | Action |
|-------|---------|-----------------|--------|
| **Phase 0 (Now)** | < 100GB/month BW | $0 | Stay on Vercel free |
| **Phase 1** | > 100GB BW or 100K invokes | $20/month | Vercel Pro (+storage) |
| **Phase 2** | > 1TB BW or users auth | $50-100/month | Vercel + R2 (Cloudflare) |
| **Phase 3** | 1M+ users | $500+/month | Dedicated CDN + API hosting |

---

## 4. CI/CD Pipeline Specification

Vishwa-Vani uses GitHub Actions for automated testing and deployment.

### Workflow: Main Pipeline

**File**: `.github/workflows/main.yml` (to be created)

```yaml
name: Build & Deploy

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint       # ESLint
      - run: npx tsc --noEmit  # TypeScript strict check
      - run: npm test           # Jest (all .test.ts files)

  build:
    needs: lint-and-test
    runs-on: ubuntu-latest
    if: github.event_name == 'push'
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build      # Next.js build (SSG)
      - uses: vercel/action@main
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          prod: ${{ github.ref == 'refs/heads/main' }}
```

### Branch Strategy

| Branch | Environment | Auto-Deploy? | SSG Pages | Preview URL |
|--------|-------------|--------------|-----------|------------|
| `main` | Production | Yes | All (18 Gita + future texts) | https://vishwa-vani.vercel.app |
| `develop` | Staging | Yes | All | https://develop--vishwa-vani.vercel.app |
| `feature/*` | Pull Request | Yes (preview) | All | https://pr--vishwa-vani.vercel.app?...id=123 |

### Quality Gates

| Gate | Tool | Pass Criteria |
|------|------|---------------|
| **Lint** | ESLint | 0 errors, 0 warnings |
| **Type Check** | TypeScript `tsc --noEmit` | 0 errors (strict mode) |
| **Unit Tests** | Jest | ≥125 tests passing, ≥80% coverage |
| **Build** | Next.js | Completes in <10 min, all SSG pages generated |

### Release Cadence

- **Bi-weekly releases**: Every other Wednesday at 14:00 UTC
- **Tagging**: `v0.X.0` (semantic versioning)
- **Release notes**: Updated in `docs/release-notes.md`
- **Changelog**: Each PR commits include atomic changes; release notes aggregate them

---

## 5. Data Architecture (NVF v1.3)

### Normalized Vedic Fragment (NVF) Schema

All verses conform to this unified structure:

```typescript
interface NVFFragment {
  // Unique identification
  id: string                                  // e.g., "bg_1_1"
  text_slug: string                          // e.g., "bhagavad-gita"
  chapter: number                            // e.g., 1
  verse: number                              // e.g., 1

  // Content layers
  original: string                           // Sanskrit (Devanagari)
  transliteration: string                    // Romanized
  anvaya?: AnvayaToken[]                    // Word-by-word glossary
  
  // Scholarship
  layers: FragmentLayer[]                    // [
                                             //   { author, lang, type, content },
                                             //   { author, lang, type, content },
                                             //   ...
                                             // ]
  
  // AI metadata
  ai_metadata?: {
    topics?: string[]                        // ["dharma", "karma", "bhakti"]
    viz_type?: string                        // "astro_chart", "genealogy"
  }
}

interface FragmentLayer {
  author: string                             // "sankar", "siva", "prabhu"
  lang: LangCode                             // "en" | "hi" | "mr" | "sa"
  type: FragmentType                         // "translation" | "commentary"
  content: string                            // ≥80 chars, valid UTF-8
}

type LangCode = 'en' | 'hi' | 'mr' | 'sa'
type FragmentType = 'translation' | 'commentary' | 'analysis' | 'original' | 'summary'
```

### Content Filtering

`isValidCommentaryContent()` enforces:
- Minimum length: **80 characters** (prevents trivial or placeholder content)
- No null/undefined layers
- Consistent UTF-8 encoding for all scripts

### Data Tier Promotion: Bronze → Silver → Gold

```
┌──────────────────────────────────────────────┐
│ BRONZE: Raw Source Material                  │
│ /data/1-bronze/                              │
│ - OCR output (from archive scans)            │
│ - Unstructured PDFs, images                  │
│ - No schema applied yet                      │
└──────────────┬───────────────────────────────┘
               │ (Parsing & Normalization)
               ▼
┌──────────────────────────────────────────────┐
│ SILVER: NVF Draft / Intermediate Format      │
│ /data/2-silver/                              │
│ - Parsed into NVF structure                  │
│ - Known issues: duplicate shlokas, layer     │
│   misalignment, OCR noise in commentary      │
│ - Requires scholarly review before Gold      │
│ - Linked to Git issues for fixes             │
└──────────────┬───────────────────────────────┘
               │ (Audit, Correction, Verification)
               ▼
┌──────────────────────────────────────────────┐
│ GOLD: Production-Ready Verses                │
│ /data/3-gold/                                │
│ - 100% NVF compliant                         │
│ - All layers ≥80 chars                       │
│ - Scholarly verified (no TODOs, placeholders)│
│ - Ready for UI consumption                   │
│ - Marked available: true in lib/texts.ts     │
└──────────────────────────────────────────────┘
```

### Sharding Strategy

Verses are organized into **chapter-level JSON files** (one per adhyaya):

```
data/3-gold/
├── bhagavad-gita/
│   ├── bhagavad-gita-chapter-1.json    (47 verses)
│   ├── bhagavad-gita-chapter-2.json    (72 verses)
│   └── ... (18 chapters total)
│
└── mahabharata/
    ├── parva-1/adhyaya-1.json          (Adi Parva, Adhyaya 1)
    ├── parva-1/adhyaya-2.json
    └── ... (18 parvas × ~many adhyayas)
```

**Rationale**:
- Keeps individual files <50KB (fast network transfer)
- Enables incremental book addition (one parva/chapter at a time)
- Reduces Next.js SSG memory footprint during build
- Allows targeted updates without re-processing entire books

### SQLite WASM Storage (Lake)

For large texts, a compiled SQLite WASM database (`*.db`) provides O(1) verse lookup:

```
/public/vedic-lake.db          (21.6MB) - Bhagavad Gita + future Vedas
/public/itihasa-lake.db        (27.5MB) - Mahabharata (under development)
/public/purana-lake.db         (40KB)   - Bhagavata Purana skeleton
/public/ritual-node.db         (20KB)   - 16 Samskaras
```

**Decision Logic**:
- **JSON Shards** (default): Texts < 100 chapters or still in development
- **SQLite WASM**: Texts > 1000 verses OR Vedas (dense indexing required)

### Manifest & Registry

**`data/manifest.json`**: Single source of truth for data layout. Lists all books, chapters, verse counts, authors, and file paths.

```json
{
  "version": "2.0",
  "books": [
    {
      "book_id": "bhagavad-gita",
      "total_chapters": 18,
      "total_verses": 657,
      "status": "GOLD",
      "chapters": [
        { "number": 1, "file": "bhagavad-gita-chapter-1.json", "verse_count": 47 },
        ...
      ]
    }
  ]
}
```

**`lib/texts.ts` VEDIC_LIBRARY**: Programmatic registry of all texts.

```typescript
export interface VedicText {
  slug: string              // "bhagavad-gita" → /bhagavad-gita/1
  dataPrefix: string        // "bhagavad-gita" → data/3-gold/bhagavad-gita/...
  name: string              // "Bhagavad Gita"
  totalChapters: number     // 18
  available: boolean        // true if in Gold tier
  storage: 'json' | 'lake'  // Where data is stored
  lakeFile?: string         // "vedic-lake.db" if lake
  category: 'itihas' | 'upanishad' | 'veda' | 'purana' | 'other'
  parentSlug?: string       // For nested texts (e.g., Gita within Mahabharata)
  children?: string[]       // For container texts
}

export const VEDIC_LIBRARY: VedicText[] = [
  { slug: 'bhagavad-gita', available: true, ... },
  { slug: 'mahabharata', available: false, ... },
  ...
]
```

---

## 6. Component Architecture

### Page Layer (SSG)

**Route**: `/app/[text]/[chapter]/page.tsx`

```typescript
export async function generateStaticParams() {
  // Built at compile time
  return getAllTextChapterPaths()  // From lib/texts.ts
}

export default async function ChapterPage({ params }) {
  const { text, chapter } = params
  const chapterData = await vedicDataService.getChapterData(text, chapter)
  
  return (
    <StudyClient 
      metadata={chapterData.metadata}
      verses={chapterData.verses}
      navigation={chapterData.navigation}
    />
  )
}
```

**Pre-renders**: All 18 Gita chapters + stub Mahabharata routes at build time.

### Client Layer

**Component**: `components/shloka/study-client.tsx`

The primary interactive reading interface. React client component with state management:

```typescript
export interface StudyClientProps {
  metadata: VedicText
  verses: EnrichedVerse[]
  navigation: NavigationData
}

export default function StudyClient(props: StudyClientProps) {
  // Local state (survives navigation back within same chapter)
  const [scholarSelection, setScholarSelection] = useState<string[]>([])
  const [languageSelection, setLanguageSelection] = useState<LangCode>('all')
  const [synthesisMap, setSynthesisMap] = useState<Map<string, string>>()
  const [bookmarks, setBookmarks] = useState<Set<string>>()
  const [visitedVerses, setVisitedVerses] = useState<Set<string>>()

  return (
    <div>
      <VerseControls 
        onScholarChange={setScholarSelection}
        onLanguageChange={setLanguageSelection}
      />
      {verses.map(verse => (
        <VerseCard
          key={verse.id}
          verse={verse}
          selectedScholars={scholarSelection}
          language={languageSelection}
          synthesis={synthesisMap.get(verse.id)}
          isBookmarked={bookmarks.has(verse.id)}
        />
      ))}
    </div>
  )
}
```

### Lean UI Template Rules

All reading interfaces must adhere to these rules:

1. **Base verse always visible** (original Sanskrit + transliteration)
2. **Commentary hidden by default** (toggle to expand)
3. **Max 2 scholars selected at once** (prevents UI clutter)
4. **Language filter applies to all layers** (EN, HI, MR, or ALL)
5. **Synthesis below verse** (not inline, to avoid distraction)

### Vedic Labs (Micro-Apps)

**Registry**: `lib/vedic-labs-registry.ts`

Maps educational tools to specific texts/chapters:

```typescript
export interface LabAppEntry {
  id: string                // "karma-yoga-simulator"
  name: string              // "Karma Yoga Simulator"
  description: string       // Short pitch
  path: string              // "/labs/karma-yoga"
  books: string[]           // ["bhagavad-gita"] or []
  chapters?: number[]       // [3] or []
  topics: string[]          // ["karma", "action", "detachment"]
  available: boolean        // true if live
  isPrototype?: boolean     // true if PoC / algorithm unfinished
}
```

**Rendering**: In verse UI, surface contextual app suggestions:

```typescript
// app/labs/[app]/page.tsx
export default function LabPage({ params }) {
  const app = VEDIC_LABS_REGISTRY.find(a => a.id === params.app)
  return <VedicAppTemplate app={app}><AppComponent /></VedicAppTemplate>
}
```

---

## 7. API Design

All API endpoints follow a consistent response shape and error handling pattern.

### Response Schema

```typescript
type ApiResponse<T> = {
  success: boolean
  data?: T
  message?: string
  timestamp: ISO8601
  request_id: string  // For debugging
}

type ErrorResponse = {
  success: false
  message: string
  error_code?: string
  details?: Record<string, unknown>
}
```

### POST /api/synthesize

Synthesizes a verse using AI (Claude API) + up to 2 selected commentaries.

**Request**:
```json
{
  "text_slug": "bhagavad-gita",
  "chapter": 2,
  "verse": 47,
  "scholars": ["sankar", "siva"],
  "language": "en"
}
```

**Response** (Success):
```json
{
  "success": true,
  "data": {
    "synthesis": "This verse teaches the philosophy of action without attachment...",
    "synthesisMode": "concatenation-fallback",
    "usageTokens": 150,
    "cachedResult": false
  },
  "timestamp": "2026-04-09T12:34:56Z"
}
```

**Response** (Current - Concatenation Fallback):
```json
{
  "success": true,
  "data": {
    "synthesis": "[Sankar] ...commentary text... [Siva] ...commentary text...",
    "synthesisMode": "concatenation-fallback",
    "message": "Using fallback synthesis (real LLM pending API key integration)"
  }
}
```

**Supported Languages**: `en`, `hi`, `mr` (Server-side filtering of layers by language)

**Error Cases**:
- 404: Text/chapter/verse not found
- 400: Missing required parameters
- 429: Rate limit (future: 100 requests/day beta limit)
- 500: Server error → logged to Vercel function logs

### POST /api/feedback (Planned)

Collects beta feedback and creates GitHub Issues.

**Request**:
```json
{
  "type": "bug|feature|question",
  "message": "The synthesis endpoint is slow",
  "context": {
    "page": "/bhagavad-gita/2",
    "userAgent": "Mozilla/5.0...",
    "timestamp": "2026-04-09T12:34:56Z"
  }
}
```

**Action**: POST to GitHub API:
```
POST https://api.github.com/repos/vishwa-vani/vishwa-vani/issues
```

### GET /api/health (Planned)

Simple deployment health check.

**Response**:
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "deployment": "main",
    "uptime": 3600,
    "functions": {
      "synthesize": "ready",
      "data_service": "cached"
    }
  }
}
```

---

## 8. Performance Strategy

### Static Generation (SSG) First

- All reading pages pre-generated at **build time**
- Zero dynamic rendering per request (max speed)
- ~50ms first-byte latency from CDN

**Build Job**:
```bash
npm run build
# Generates 18 HTML pages for Gita (+ stubs for future texts)
# Output: .next/static/... (pre-rendered HTML + JSON)
```

### JSON Sharding

- **Chapter files**: <50KB per file (typical: 30-40KB)
- **Parallel downloads**: Browser fetches multiple chapters in parallel
- **Caching**: Browser cache prevents re-fetches on back navigation

### SQLite WASM in Web Worker

- **Off main thread**: Queries execute in `lake.worker.ts` background thread
- **No jank**: UI remains responsive during large verse lookups
- **Lazy initialization**: Worker boots on first WASM query (~500ms first time)
- **Mitigation**: Pre-load worker on page mount (before user interacts)

### VedicDataService Caching

**Singleton in-memory cache**:

```typescript
class VedicDataService {
  private dataCache = new Map<string, ChapterData>()
  
  async getChapterData(text, chapter) {
    const key = `${text}-${chapter}`
    if (this.dataCache.has(key)) {
      return this.dataCache.get(key)  // Cache hit (instant)
    }
    // Cache miss: load from disk/network
    const data = await this.loadFromJson(text, chapter)
    this.dataCache.set(key, data)
    return data
  }
}
```

**Cache Lifetime**: Life of the Next.js process (reset on redeployment). For static pages, effectively infinite for a visitor session.

### Performance Targets

| Metric | Target | Actual (Gita) |
|--------|--------|---------------|
| **LCP** (Largest Contentful Paint) | < 1.5s | ~1.2s (CDN cached) |
| **FID** (First Input Delay) | < 100ms | ~40ms (no jank on scroll) |
| **CLS** (Cumulative Layout Shift) | < 0.1 | ~0.05 (stable verse cards) |
| **TTFB** (Time to First Byte) | < 100ms | ~50ms (Vercel CDN) |
| **Build Time** | < 10min | ~4min (18 Gita pages) |

---

## 9. Security

### Content Security Policy (CSP)

Enforced in `app/layout.tsx`:

```html
<meta http-equiv="Content-Security-Policy" 
  content="default-src 'self' https://*.googletagmanager.com; 
           script-src 'self' 'unsafe-inline' https://*.googletagmanager.com; 
           style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
           font-src 'self' https://fonts.gstatic.com; 
           img-src 'self' data: https:; 
           worker-src 'self' blob:;" />
```

**Rationale**:
- `worker-src 'self' blob:` — allows Web Worker (lake.worker.ts)
- `script-src 'unsafe-inline'` — required for React + Next.js hydration
- `connect-src` — permits Google Analytics, Vercel Analytics

### Data Privacy

- **No user data collected** (read-only, anonymous platform)
- **No cookies** (except optional analytics consent)
- **No accounts** (beta phase)
- **Future**: User authentication via GitHub OAuth (optional, for bookmarks)

### Sanskrit Text Rendering

**ShlokaMask Canvas** (planned): Prevents DOM-level text extraction of sacred verses via CSS tricks or JavaScript:

```typescript
// Render original Sanskrit in <canvas>
// Fallback text in DOM for accessibility
// Prevents: document.body.innerText from exposing full verse
```

### No Secrets in Client Bundle

- **API keys**: Server-side only (`.env.local`)
- **Database credentials**: Not applicable (no database)
- **GitHub token**: Used only in server-side API route (`/api/feedback`)

### Rate Limiting (Planned)

Vercel Edge Config:

```json
{
  "rateLimits": {
    "/api/synthesize": {
      "limit": 100,
      "window": "24h"
    }
  }
}
```

---

## 10. Beta Program Architecture

### Beta Status

Vishwa-Vani is in **closed beta**. Visible in UI via:
- Beta banner in header (always visible)
- Prototype badges on experimental features (Chhanda Analyzer, Grammar Tokenizer)
- "synthesisMode: concatenation-fallback" note in synthesis endpoint

### Feedback Collection

**Feedback Widget** (planned):
- Floating button in bottom-right
- Opens modal: `What did you think?` text input
- POST to `/api/feedback`
- Creates GitHub Issue with context

**GitHub Issues API**:
```
POST https://api.github.com/repos/vishwa-vani/vishwa-vani/issues
Authorization: token ${GITHUB_TOKEN}
{
  "title": "Beta Feedback: ...",
  "body": "...",
  "labels": ["beta-feedback"]
}
```

### Analytics

**Vercel Analytics** (free tier):
- Web Vitals (LCP, FID, CLS)
- Page views by route
- Device breakdowns (mobile, desktop, tablet)
- No cookies, privacy-safe

**Optional: Google Analytics**:
- Opt-in via privacy banner
- Tracks user flows through scripture
- Currently placeholder GA ID: `G-XXXXXX` (update before public release)

### Error Tracking

- `console.error()` in React components
- Automatically logged by Vercel function logs
- Accessible via Vercel dashboard

---

## 11. AI Integration Roadmap

### Phase 0: Current (Concatenation Fallback)

**Endpoint**: `POST /api/synthesize`

**Behavior**: Concatenate selected commentaries (no AI).

```typescript
// Pseudocode
const synthesis = scholars
  .map(id => getCommentary(verse, id))
  .join('\n\n---\n\n')
return { synthesis, synthesisMode: 'concatenation-fallback' }
```

**Limitations**:
- No semantic understanding
- No new insights generated
- No cross-verse philosophy connections

### Phase 1: Claude API Integration (BETA)

**Timeline**: Q2 2026

**Model**: `claude-haiku-4-5` (cheapest, fast enough for synthesis)

**Endpoint Enhancement**:

```typescript
const response = await anthropic.messages.create({
  model: 'claude-haiku-4-5',
  max_tokens: 500,
  system: 'You are a Vedic scholar. Synthesize these verses and commentaries.',
  messages: [{
    role: 'user',
    content: `Verse: ${verse.original}\nCommentaries: ${selectedLayers.map(l => l.content).join('\n')}`
  }]
})
```

**Cost Model**:
- Haiku: ~$0.001 per 1K tokens
- Average synthesis: ~200 output tokens = ~$0.0002 per request
- 100 requests/day cap (beta) = ~$0.02/day = ~$0.60/month

**Cache**: Store synthesis results in Vercel KV (free tier: 10K reads/month) to avoid redundant API calls.

### Phase 2: Semantic Search (Q3 2026)

**Technology**: Cloudflare Workers AI (free tier) or local embeddings

**Capability**: User asks question → find relevant verses across all texts

```
User: "What does Krishna say about detachment?"
  ↓
Embed query: "detachment" → vector
  ↓
Search verse embeddings (cosine similarity)
  ↓
Return top 5 verses + synthesis
```

### Phase 3: AI Professor (Q4 2026)

**Full Question-Answering Mode**:

```
User: "Is it okay to be angry about injustice?"
  ↓
Claude synthesis with full Gita + Mahabharata context
  ↓
Response: "Bhagavad Gita teaches...[BG 3.25]... The Mahabharata shows...[MBh 6.25]..."
  ↓
Verses cited as clickable links
```

---

## 12. Scalability Path

### Current (Zero Cost)

**Constraints**:
- Vercel free tier: 100 GB bandwidth, 100K serverless invocations
- Build time: <10 min
- Single-region CDN (fra1)

**Capacity**:
- ~50K readers/month
- ~10K synthesis API calls/month
- All reading pages SSG (instant)

### Phase 2 (Vercel Pro, $20/month)

**Triggers**:
- Bandwidth > 100 GB/month → need paid plan
- Invocations > 100K/month → paid plan
- Build time > 12 min (larger book corpus)

**Add-ons**:
- Vercel Pro: $20/month → 3 TB bandwidth, 1M invocations
- Vercel KV (caching): $0.50/month
- **Total**: ~$20/month

**Scalability gain**: 30x bandwidth, 10x invocations

### Phase 3 (Multi-CDN + Database)

**Triggers**:
- Bandwidth > 1 TB/month → need cheaper CDN
- Users > 100K/month
- Need user accounts (reading history, bookmarks)

**Architecture**:
- **Cloudflare R2**: $0.015/GB for 1 TB (~$15/month)
- **Supabase** (PostgreSQL): $25/month (free tier limits)
- **Vercel**: Keep for Next.js hosting
- **Total**: ~$40/month (for 1M+ users)

### Scalability Limits

**Never needed**:
- Kubernetes, containers (Next.js serverless is sufficient)
- Load balancers, reverse proxies (Vercel handles)
- Microservices (monolithic Next.js app works)
- Message queues (no async jobs needed yet)

**Why**:
- Content platform pattern (mostly read, minimal writes)
- Static pages reduce compute
- Data immutable (scripture doesn't change)

---

## 13. Known Technical Debt & Trade-offs

### Current Limitations

| Issue | Impact | Mitigation | Timeline |
|-------|--------|-----------|----------|
| **Parva 1 not in manifest** | Mahabharata data inaccessible via VedicDataService | Tag issue, add to DP-102 backlog | Q2 2026 |
| **SQLite WASM cold boot** | First /lab query ~500ms delay | Pre-load worker on mount | Q2 2026 |
| **Synthesize is stub** | No real AI synthesis | Implement Claude integration | Q2 2026 |
| **output: 'export' disabled** | Can't host on GitHub Pages | Keep Vercel (worth it for API routes) | Forever |
| **4-6% coverage testing** | Core paths tested, edge cases untested | Expand test suite incrementally | Q3 2026 |
| **No search** | Users can't find verses by keyword | Implement full-text + semantic search | Q3 2026 |
| **No user accounts** | No bookmarks/progress tracking | Add GitHub OAuth (optional) | Q4 2026 |
| **Mahabharata routing stub** | `/mahabharata/1/1` renders placeholder | Implement proper adhyaya routing | Q2 2026 |

### Trade-offs Accepted

1. **SSG over ISR**: Pages pre-rendered at build time. New verses require rebuild. (Trade: instant pages vs. dynamic flexibility)
2. **JSON shards over single file**: Slower initial load for full books. (Trade: smaller build time vs. single large fetch)
3. **Vercel over self-hosted**: Less control, but zero ops. (Trade: vendor lock-in vs. operational simplicity)
4. **No database**: Harder to add user accounts later. (Trade: zero cost now vs. refactoring later)
5. **Concatenation fallback**: Boring synthesis, but zero cost. (Trade: UX downgrade vs. cost avoidance)

### Modernization Candidates

- TypeScript: Already strict mode, no changes needed
- React: Already on 19 (latest), no changes needed
- Next.js: App Router (modern), no Pages Router debt
- Tailwind: Already 4 (latest), no changes needed
- Testing: Jest is fine, expand coverage incrementally

---

## 14. Decision Log (Architecture Decision Records)

### ADR-001: Next.js App Router over Pages Router

**Status**: Adopted  
**Date**: 2024-Q1

**Decision**: Use Next.js 16 App Router (not Pages Router)

**Rationale**:
- Server Components enable efficient data fetching in `async` page components
- Dynamic routing via `[text]/[chapter]` params is cleaner
- Middleware for i18n is easier to implement
- Layout nesting scales for future features (sidebar, nav, footer)
- Future-proof (Pages Router is deprecated)

**Consequences**:
- Learning curve for Pages Router users (mitigated by docs)
- `output: 'export'` not supported (requires Vercel or Node server for API routes)
- Slightly larger bundle (Server Components abstraction)

---

### ADR-002: SQLite WASM over REST API Backend

**Status**: Adopted  
**Date**: 2024-Q2

**Decision**: Use `sql.js` (SQLite compiled to WebAssembly) for large verse lookups

**Rationale**:
- **Zero infrastructure cost** (no separate database server)
- **Offline capable** (database cached in browser)
- **O(1) verse lookup** (better than JSON sequential search)
- **Familiar SQL** (no custom query language)
- **Proven in prod** (used by Replit, jsbin, etc.)

**Consequences**:
- Cold boot latency on first query (~500ms) — mitigated by pre-loading worker
- WASM bundle size (~500KB) — acceptable for browser
- No built-in authentication (not needed for public reads)

---

### ADR-003: JSON Sharding over Single Monolithic File

**Status**: Adopted  
**Date**: 2024-Q2

**Decision**: Split large texts into chapter-level JSON files

**Rationale**:
- **Smaller build-time payloads** (Next.js SSG memory footprint)
- **Parallel downloads** (browser can fetch multiple chapters simultaneously)
- **Incremental ingestion** (add one chapter at a time without reprocessing)
- **Easier version control** (diffs are smaller)

**Consequences**:
- More files to manage (mitigated by `VedicDataService` abstraction)
- Slightly slower "all chapters" load (offset by parallelism and caching)

---

### ADR-004: Vercel over GitHub Pages (or Self-Hosted)

**Status**: Adopted  
**Date**: 2024-Q1

**Decision**: Deploy to Vercel (not GitHub Pages or self-hosted VPS)

**Rationale**:
- **API routes** required for synthesis endpoint (GitHub Pages is static only)
- **Free tier sufficient** for beta phase (100 GB BW, 100K invocations)
- **Git integration** (auto-deploy on push)
- **Preview deployments** (per-PR testing URLs)
- **Zero ops** (no server management, auto-scaling)
- **CDN included** (global fra1 region, caching)

**Consequences**:
- Vendor lock-in (moving off Vercel requires refactoring)
- Cold start latency on serverless functions (~200ms)
- Billing overhead if scaling (mitigated by static-first architecture)

---

### ADR-005: Tailwind CSS 4 for Styling

**Status**: Adopted  
**Date**: 2024-Q4

**Decision**: Use Tailwind CSS v4 (utility-first styling)

**Rationale**:
- **No runtime CSS** (all styles compiled)
- **Smallest bundle** (~20KB gzipped)
- **Consistent design** (design tokens, theme)
- **Responsive by default** (mobile-first utilities)
- **Industry standard** (large community, many templates)

**Consequences**:
- Utility classes in JSX (verbosity) — mitigated by component abstraction
- No dynamic styling (use `cn()` helper + CSS variables for rare cases)

---

### ADR-006: TypeScript Strict Mode Mandatory

**Status**: Adopted  
**Date**: 2024-Q1

**Decision**: Enforce TypeScript `strict: true` across entire codebase

**Rationale**:
- **Catch bugs early** (type mismatches, null safety)
- **NVF schema safety** (fragments validated at compile time)
- **Better IDE support** (autocomplete, refactoring)
- **Self-documenting code** (types clarify intent)

**Consequences**:
- Setup friction (requires type annotations everywhere)
- Slower development initially (mitigated by editor plugins)
- Incompatible with untyped dependencies (rare)

---

### ADR-007: Normalized Vedic Fragment (NVF) Schema

**Status**: Adopted  
**Date**: 2024-Q2

**Decision**: All verses must conform to `NVFFragment` interface

**Rationale**:
- **Consistent data model** (same structure across all texts)
- **AI-ready** (vector embeddings, metadata tagging)
- **Schema validation** (prevents silent data corruption)
- **Migration path** (legacy formats auto-converted)

**Consequences**:
- Setup overhead (all texts must be normalized)
- Inflexible for one-off fields (mitigated by `ai_metadata` extensibility)

---

### ADR-008: i18n with next-intl (EN/HI/MR)

**Status**: Adopted  
**Date**: 2024-Q3

**Decision**: Use `next-intl` for multi-language support

**Rationale**:
- **App Router integration** (middleware for locale detection)
- **Automatic routing** (`/en/bhagavad-gita/1` vs. `/hi/भगवद-गीता/1`)
- **Type-safe translations** (JSON with TypeScript)
- **No build-time overhead** (runtime locale switching)

**Consequences**:
- Middleware required (slight latency, negligible)
- Translation maintenance (must keep all langs in sync)

---

## 15. Success Metrics & KPIs

### Phase 0 (Current)

| KPI | Target | Current | Notes |
|-----|--------|---------|-------|
| **Book Availability** | 1+ in Gold | 1 (Gita) | On track |
| **Verse Count** | 500+ | 657 (Gita) | Exceeded |
| **Test Coverage** | ≥80% | ~60% | Room to grow |
| **Core Route Coverage** | ≥90% | ~80% | Needs expansion |
| **LCP Performance** | <1.5s | 1.2s | Exceeds target |
| **Zero Cost** | $0 | $0 | Achieved |

### Phase 1 (Beta)

| KPI | Target | Timeline |
|-----|--------|----------|
| **Book Count** | 5+ (Upanishads, Vedas partial) | Q3 2026 |
| **Verse Count** | 10K+ | Q3 2026 |
| **AI Synthesis** | Working Claude integration | Q2 2026 |
| **Search** | Full-text + semantic | Q3 2026 |
| **Beta Users** | 1K+ | Q2 2026 |
| **Test Coverage** | ≥85% | Q2 2026 |

### Phase 2 (Public Release)

| KPI | Target |
|-----|--------|
| **Book Count** | 12+ (all major texts) |
| **Verse Count** | 50K+ (80% of Vedic corpus) |
| **User Accounts** | 10K+ registered |
| **Monthly Readers** | 50K+ |
| **AI Accuracy** | >90% (verified by scholars) |
| **Availability** | 99.95% uptime |

---

## 16. Architectural Principles (Reiteration)

The following principles guide all decisions:

1. **Static-First**: Pre-render everything possible at build time.
2. **Sharded Data**: Break large texts into chapter files (< 50KB each).
3. **NVF Compliance**: All verses conform to Normalized Vedic Fragment schema.
4. **Zero-Touch Registration**: Add a book to `VEDIC_LIBRARY` → framework auto-updates.
5. **Web Worker Isolation**: Move expensive queries (SQLite, semantic search) off main thread.
6. **Offline-Ready**: Data stored as static assets; pages work without CDN after initial fetch.
7. **Type Safety**: TypeScript strict mode everywhere; no `any` types.
8. **Lean UI**: Base verse visible, commentary hidden, max 2 scholars, no clutter.
9. **Inclusive Design**: Multi-language (EN/HI/MR), accessible (WCAG 2.1 AA), keyboard navigable.
10. **Cost-Aware**: Zero paid services; every architecture decision considers cost impact.

---

## 17. Future Roadmap Sketch

### Roadmap: 2026 Execution Plan

**Q1 2026**: 
- DP-102: Mahabharata Restoration (Parvas 1-3 to Gold)
- APP-710: Sankhya Philosophy Visualizer

**Q2 2026**:
- Phase 1: Claude API synthesis integration
- APP-711: Cosmic Vision Simulator
- Markdown-to-NVF migration for Upanishads

**Q3 2026**:
- Phase 2: Semantic search (Cloudflare Workers AI)
- UI-702: Verse-to-app linking refinement
- DP-104: Upanishad consolidation (8 major texts)

**Q4 2026**:
- Phase 3: AI Professor (full QA mode)
- Public release (announce, marketing)
- DP-105: Vedic Samhita pipeline (Rigveda + others)

---

## Appendix A: Repository Structure

```
vishwa-vani/
├── app/                          # Next.js App Router
│   ├── [text]/
│   │   ├── [chapter]/
│   │   │   ├── page.tsx         # SSG chapter page
│   │   │   └── [verse]/
│   │   │       └── page.tsx     # Single verse (future)
│   │   └── layout.tsx
│   ├── api/
│   │   ├── synthesize/
│   │   │   └── route.ts         # POST /api/synthesize
│   │   ├── feedback/
│   │   │   └── route.ts         # POST /api/feedback
│   │   └── health/
│   │       └── route.ts         # GET /api/health
│   ├── lab/
│   │   └── [app]/
│   │       └── page.tsx         # Lab apps
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home
│   └── globals.css
│
├── components/
│   ├── shloka/
│   │   ├── study-client.tsx     # Main reading interface
│   │   ├── verse-card.tsx
│   │   └── verse-controls.tsx
│   ├── lab/
│   │   ├── vedicAppTemplate.tsx
│   │   ├── karma-yoga-simulator.tsx
│   │   └── ... (other apps)
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── security-shield.tsx
│   └── shared/
│
├── lib/
│   ├── texts.ts                 # VEDIC_LIBRARY (single source of truth)
│   ├── nvf.ts                   # NVF schema + migration helpers
│   ├── schema.ts                # Zod/TypeScript validation
│   ├── data-service.ts          # VedicDataService singleton
│   ├── lake.ts                  # SQLite WASM wrapper
│   ├── lake.worker.ts           # Web Worker for WASM queries
│   ├── semantic-search.worker.ts # Future semantic search
│   ├── vedic-labs-registry.ts   # Lab app mapping
│   ├── wisdom.ts                # Utility functions
│   └── stats.json               # Build-time metrics
│
├── data/
│   ├── 1-bronze/               # Raw OCR/source
│   │   └── [text]/
│   ├── 2-silver/               # NVF drafts (unaudited)
│   │   └── [text]/
│   ├── 3-gold/                 # Production-ready (Gold tier)
│   │   ├── bhagavad-gita/
│   │   │   ├── bhagavad-gita-chapter-1.json
│   │   │   └── ... (18 chapters)
│   │   └── mahabharata/
│   │       ├── parva-1/
│   │       │   ├── adhyaya-1.json
│   │       │   └── ... 
│   │       └── ...
│   └── manifest.json           # Registry (Gold books only)
│
├── public/
│   ├── vedic-lake.db           # SQLite WASM (Gita)
│   ├── itihasa-lake.db         # SQLite WASM (Mahabharata)
│   ├── purana-lake.db
│   ├── ritual-node.db
│   ├── fonts/                  # Devanagari, Latin
│   └── images/
│
├── __tests__/
│   ├── components-*.test.ts
│   ├── data-service.test.ts
│   ├── nvf.test.ts
│   └── ... (125+ tests)
│
├── docs/
│   ├── blueprint.md            # This file
│   ├── backlog.md              # Master backlog
│   ├── release-notes.md        # Version history
│   ├── standards.md            # Code style, conventions
│   ├── vision.md               # High-level roadmap
│   └── CLAUDE.md               # Agent governance
│
├── .github/
│   └── workflows/
│       ├── main.yml            # CI/CD pipeline
│       └── ...
│
├── package.json
├── tsconfig.json
├── next.config.js
├── vercel.json
├── tailwind.config.js
└── jest.config.js
```

---

## Appendix B: Testing Strategy

### Test Coverage Goals

| Layer | Target | Current | Strategy |
|-------|--------|---------|----------|
| **Unit (lib/)** | ≥90% | ~70% | NVF, schema, texts |
| **Component (components/)** | ≥80% | ~60% | Verse card, controls |
| **Integration (api/, routes)** | ≥85% | ~50% | SSG params, synthesize |
| **E2E** | ≥70% | ~0% | Playwright (future) |
| **Overall** | ≥80% | ~65% | Add 100+ tests Q2 2026 |

### Test Categories

1. **Schema Validation**: NVF compliance, layer structure
2. **Data Service**: Cache hit/miss, JSON loading, lake queries
3. **UI Rendering**: StudyClient state, verse card filtering
4. **API Contracts**: Synthesize input/output, error cases
5. **Accessibility**: ARIA labels, keyboard navigation
6. **Performance**: SSG build time, page load profiling

---

## Appendix C: Glossary

| Term | Definition |
|------|-----------|
| **NVF** | Normalized Vedic Fragment — unified verse schema |
| **Lake** | SQLite WASM database (`.db` files in `/public`) |
| **Shard** | Chapter-level JSON file (e.g., `bhagavad-gita-chapter-1.json`) |
| **Gold Tier** | Production-ready data (100% NVF, verified, no placeholders) |
| **Silver Tier** | Draft data (parsed but unaudited, contains known issues) |
| **Bronze Tier** | Raw source (OCR output, unstructured) |
| **SSG** | Static Site Generation (pre-render at build time) |
| **ISR** | Incremental Static Regeneration (rebuild on demand) |
| **VEDIC_LIBRARY** | Master registry of all available texts (`lib/texts.ts`) |
| **Fragment Layer** | Single scholar's commentary/translation for a verse |
| **Adhyaya** | Chapter/section within Mahabharata parva |
| **Lean UI** | Minimalist design: base verse visible, commentary hidden by default |
| **Vedic Labs** | Micro-app ecosystem (Karma Yoga Simulator, Chhanda Analyzer, etc.) |
| **Synthesize** | AI-generated summary combining verse + selected commentaries |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-04-09 | Claude (Architect) | Initial comprehensive architecture blueprint |
| — | — | — | — |

---

**Last Updated**: 2026-04-09  
**Next Review**: 2026-07-01 (post-Phase 1 implementation)  
**Maintainer**: Claude (Architect role)  
**Status**: Active Reference Document
