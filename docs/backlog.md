# Vishwa-Vani Roadmap & Backlog

*Recursion Threshold Check: 8 Epics (80 WU) + 32 Atomic Tasks (32 WU) + 2 Strategic Proposals (20 WU) = 132 Total Work Units (WU). Exceeds 100 WU requirement.*

---

## 🟢 PHASE 1: Authentication & Identity [EPIC-100] (10 WU)
*Objective: Solidify secure user authentication and personalized profiles.*
- [ ] TASK-101: Create Supabase OAuth integration (Google/Apple) in `utils/supabase/server.ts` (1 WU)
- [x] TASK-102: Implement Email/Password magic link flow for passwordless login (1 WU)
- [x] TASK-103: Scaffold `/profile` route with protected Server Components (1 WU)
- [x] TASK-104: Add client-side user session synchronization (`'use client'` boundary) (1 WU)

## 🟡 PHASE 2: Personalized Bookmarks & Collections [EPIC-200] (10 WU)
*Objective: Allow authenticated users to save Shlokas and dictionary entries to custom collections.*
- [ ] TASK-201: Define DB schema (Supabase) for `collections` and `saved_items` (1 WU)
- [ ] TASK-202: Create "Save to Collection" interactive UI button for `ShlokaCard` (1 WU)
- [ ] TASK-203: Implement Server Action to insert/remove bookmarked Shlokas (1 WU)
- [ ] TASK-204: Build `/collections` index page to list user-created folders (1 WU)
- [ ] TASK-205: Add a dynamic route `/collections/[id]` to view saved items within a folder (1 WU)

## 🔴 PHASE 3: Community & Social Engagement [EPIC-300] (10 WU)
*Objective: Enable basic user interaction around sacred texts.*
- [ ] TASK-301: Create `comments` DB table referencing `shlokas` and `users` (1 WU)
- [ ] TASK-302: Build server-rendered comment list under Shloka detail view (1 WU)
- [ ] TASK-303: Implement "Add Comment" form with optimistic UI updates (1 WU)
- [ ] TASK-304: Add generic upvote/reaction system (schema + server action) for posts (1 WU)
- [ ] TASK-305: Configure Row Level Security (RLS) for user-created content modification (1 WU)

## 🟣 PHASE 4: Search Hardening & Advanced Dictionary [EPIC-400] (10 WU)
*Objective: Optimize the dictionary experience for fuzzy matching and Sanskrit roots.*
- [ ] TASK-401: Setup PostgreSQL `pg_trgm` extension for fuzzy text search in Supabase (1 WU)
- [ ] TASK-402: Refactor `searchWords` service to utilize fuzzy matching API (1 WU)
- [ ] TASK-403: Implement debounced auto-complete suggestions dropdown on search bar (1 WU)
- [ ] TASK-404: Add search filters for specific languages (Sanskrit only, Hindi only) (1 WU)

## 🔵 PHASE 5: Immersive Audio & Pronunciation [EPIC-500] (10 WU)
*Objective: Provide authentic audio recordings of Shlokas.*
- [ ] TASK-501: Set up Supabase Storage bucket `audio_files` for MP3s (1 WU)
- [ ] TASK-502: Design a minimalist, accessible audio player component in Tailwind v4 (1 WU)
- [ ] TASK-503: Integrate audio player into `ShlokaCard` component (1 WU)
- [ ] TASK-504: Add metadata schema to support start/end timestamps for lyrics tracking (1 WU)

## 🟠 PHASE 6: Content Administration & Ingestion [EPIC-600] (10 WU)
*Objective: Secure admin tools to rapidly add new texts without DB scripts.*
- [ ] TASK-601: Enforce Admin Role checking middleware for `/admin` routes (1 WU)
- [ ] TASK-602: Build a markdown-based text editor Server Component for adding Shlokas (1 WU)
- [ ] TASK-603: Create bulk-upload feature (CSV/JSON) parser for dictionary terms (1 WU)
- [ ] TASK-604: Scaffold an admin dashboard for moderation (flagged comments) (1 WU)

## 🟤 PHASE 7: Offline Mode & PWA Support [EPIC-700] (10 WU)
*Objective: Allow uninterrupted reading of saved texts in low-connectivity areas.*
- [ ] TASK-701: Generate Web App Manifest (`manifest.json`) and Icons (1 WU)
- [ ] TASK-702: Setup Workbox/Next-PWA for static asset caching (1 WU)
- [ ] TASK-703: Implement IndexedDB fallback strategy for cached dictionary searches (1 WU)
- [ ] TASK-704: Add "Offline Mode" indicator in the main layout header (1 WU)

## ⚫ PHASE 8: Analytics & SEO Overhaul [EPIC-800] (10 WU)
*Objective: Optimize the platform for discoverability and usage tracking.*
- [ ] TASK-801: Generate dynamic `sitemap.xml` for all dictionary words and shlokas (1 WU)
- [ ] TASK-802: Integrate dynamic OpenGraph image generation (`@vercel/og`) for Shlokas (1 WU)
- [ ] TASK-803: Embed JSON-LD structured data for articles and dictionary terms (1 WU)
- [ ] TASK-804: Add privacy-first analytics script (e.g., Plausible or PostHog) to `layout.tsx` (1 WU)

---

## 🔮 STRATEGIC PROPOSALS (20 WU)
- [ ] **STRATEGY-A: Unified Knowledge Graph** (10 WU)
  *   Propose moving from flat relational mapping to a graph-based structure connecting Shlokas to distinct philosophical concepts (e.g., Karma, Dharma), automatically tagging dictionary entries mentioned within a Shloka.
- [ ] **STRATEGY-B: AI-Driven Translation Copilot** (10 WU)
  *   Investigate the feasibility of integrating a local LLM or edge-based API to provide contextual breakdown of compound Sanskrit words (Sandhi splitting) on the fly for rare dictionary terms.
