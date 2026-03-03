# Vishwa-Vani Roadmap & Backlog

*Recursion Threshold Check: 16 Epics (160 WU) + 80 Atomic Tasks (80 WU) + 2 Strategic Proposals (20 WU) = 260 Total Work Units (WU). Exceeds 200 WU requirement.*

---

## 🔴 PHASE 3: Community & Social Engagement [EPIC-300] (10 WU)
*Objective: Enable basic user interaction around sacred texts.*
- [Done] TASK-301: [INDEPENDENT] Create `comments` DB table referencing `shlokas` and `users`. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [Done] TASK-302: [INDEPENDENT] Build server-rendered comment list under Shloka detail view. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-303: [INDEPENDENT] Implement "Add Comment" form with optimistic UI updates. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-304: [INDEPENDENT] Add generic upvote/reaction system (schema + server action) for posts. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-305: [INDEPENDENT] Configure Row Level Security (RLS) for user-created content modification. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)

## 🟣 PHASE 4: Search Hardening & Advanced Dictionary [EPIC-400] (10 WU)
*Objective: Optimize the dictionary experience for fuzzy matching and Sanskrit roots.*
- [ ] TASK-401: [INDEPENDENT] Setup PostgreSQL `pg_trgm` extension for fuzzy text search in Supabase. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-402: [INDEPENDENT] Refactor `searchWords` service to utilize fuzzy matching API. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-403: [INDEPENDENT] Implement debounced auto-complete suggestions dropdown on search bar. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-404: [INDEPENDENT] Add search filters for specific languages (Sanskrit only, Hindi only). Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-405: [INDEPENDENT] Implement advanced root word search using stemming. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)

## 🔵 PHASE 5: Immersive Audio & Pronunciation [EPIC-500] (10 WU)
*Objective: Provide authentic audio recordings of Shlokas.*
- [ ] TASK-501: [INDEPENDENT] Set up Supabase Storage bucket `audio_files` for MP3s. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-502: [INDEPENDENT] Design a minimalist, accessible audio player component in Tailwind v4. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-503: [INDEPENDENT] Integrate audio player into `ShlokaCard` component. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-504: [INDEPENDENT] Add metadata schema to support start/end timestamps for lyrics tracking. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-505: [INDEPENDENT] Create progressive audio loading implementation using Service Workers. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)

## 🟠 PHASE 6: Content Administration & Ingestion [EPIC-600] (10 WU)
*Objective: Secure admin tools to rapidly add new texts without DB scripts.*
- [ ] TASK-601: [INDEPENDENT] Enforce Admin Role checking middleware for `/admin` routes. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-602: [INDEPENDENT] Build a markdown-based text editor Server Component for adding Shlokas. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-603: [INDEPENDENT] Create bulk-upload feature (CSV/JSON) parser for dictionary terms. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-604: [INDEPENDENT] Scaffold an admin dashboard for moderation (flagged comments). Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-605: [INDEPENDENT] Design an auto-saving draft mechanism for admin entries. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)

## 🟤 PHASE 7: Offline Mode & PWA Support [EPIC-700] (10 WU)
*Objective: Allow uninterrupted reading of saved texts in low-connectivity areas.*
- [ ] TASK-701: [INDEPENDENT] Generate Web App Manifest (`manifest.json`) and Icons. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-702: [INDEPENDENT] Setup Workbox/Next-PWA for static asset caching. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-703: [INDEPENDENT] Implement IndexedDB fallback strategy for cached dictionary searches. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-704: [INDEPENDENT] Add "Offline Mode" indicator in the main layout header. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-705: [INDEPENDENT] Configure background sync for optimistically updated collections when offline. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)

## ⚫ PHASE 8: Analytics & SEO Overhaul [EPIC-800] (10 WU)
*Objective: Optimize the platform for discoverability and usage tracking.*
- [ ] TASK-801: [INDEPENDENT] Generate dynamic `sitemap.xml` for all dictionary words and shlokas. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-802: [INDEPENDENT] Integrate dynamic OpenGraph image generation (`@vercel/og`) for Shlokas. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-803: [INDEPENDENT] Embed JSON-LD structured data for articles and dictionary terms. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-804: [INDEPENDENT] Add privacy-first analytics script (e.g., Plausible or PostHog) to `layout.tsx`. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-805: [INDEPENDENT] Implement robust server-side analytics for tracking API performance. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)

## ⚪ PHASE 9: Accessibility (A11Y) Audit & Overhaul [EPIC-900] (10 WU)
*Objective: Ensure absolute WCAG compliance and optimal screen reader navigation.*
- [ ] TASK-901: [INDEPENDENT] Perform automated A11Y audit using Axe and integrate in CI. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-902: [INDEPENDENT] Implement high-contrast and dyslexia-friendly typography toggle. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-903: [INDEPENDENT] Improve keyboard navigation and focus management across all forms. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-904: [INDEPENDENT] Add ARIA landmarks and aria-live regions for dynamic content updates. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-905: [INDEPENDENT] Enhance color contrast ratios across all Tailwind themes. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)

## ⬜ PHASE 10: Multi-Language Internationalization (i18n) [EPIC-1000] (10 WU)
*Objective: Broaden audience reach by offering UI localized in Hindi and Marathi.*
- [ ] TASK-1001: [INDEPENDENT] Set up next-intl or native Next.js i18n routing for language selection. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-1002: [INDEPENDENT] Extract all hardcoded UI strings into translation dictionaries. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-1003: [INDEPENDENT] Build Language Switcher component in the navbar. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-1004: [INDEPENDENT] Translate Core Page Metadata (Titles/Descriptions) based on locale. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-1005: [INDEPENDENT] Modify Supabase queries to fetch localized meanings from text tables. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)

## 🟢 PHASE 11: Real-time Notifications [EPIC-1100] (10 WU)
*Objective: Keep users engaged with real-time updates for comments and replies.*
- [ ] TASK-1101: [INDEPENDENT] Configure Supabase Realtime subscriptions for the `comments` table. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-1102: [INDEPENDENT] Implement a generic notification dropdown UI component. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-1103: [INDEPENDENT] Add server-side triggers to create notifications on new replies. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-1104: [INDEPENDENT] Setup push notification framework using Web Push API. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-1105: [INDEPENDENT] Create a user preference page to manage notification opt-ins. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)

## 🟡 PHASE 12: Gamification & Study Streaks [EPIC-1200] (10 WU)
*Objective: Encourage daily reading habits through a gamified streak system.*
- [ ] TASK-1201: [INDEPENDENT] Create `user_activity` DB table to track daily read metrics. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-1202: [INDEPENDENT] Implement logic to calculate and store user study streaks. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-1203: [INDEPENDENT] Design and build a "Streak Badge" component for user profiles. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-1204: [INDEPENDENT] Add celebration animations (canvas confetti) upon reaching milestones. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-1205: [INDEPENDENT] Build weekly progress summary email digest generation script. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)

## 🔴 PHASE 13: Enhanced Daily Discoverability [EPIC-1300] (10 WU)
*Objective: Introduce rotating daily content to ensure fresh user experiences.*
- [ ] TASK-1301: [INDEPENDENT] Implement "Shloka of the Day" caching and rotation logic. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-1302: [INDEPENDENT] Build "Word of the Day" widget for the dictionary home page. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-1303: [INDEPENDENT] Setup cron job (Vercel cron) to auto-update daily selections. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-1304: [INDEPENDENT] Add social sharing (Twitter, WhatsApp) links for daily content. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-1305: [INDEPENDENT] Implement random discovery module ("Surprise Me" button). Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)

## 🟣 PHASE 14: Data Portability [EPIC-1400] (10 WU)
*Objective: Allow users to securely export their collections and reading data.*
- [ ] TASK-1401: [INDEPENDENT] Build secure API endpoint to fetch all user-owned data. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-1402: [INDEPENDENT] Implement JSON export feature for user collections. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-1403: [INDEPENDENT] Implement CSV export functionality for user reading history. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-1404: [INDEPENDENT] Add automated GDPR/CCPA account deletion pipeline. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-1405: [INDEPENDENT] Build user dashboard component for managing data privacy. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)

## 🔵 PHASE 15: Cross-Platform Native Preparation [EPIC-1500] (10 WU)
*Objective: Lay groundwork for future React Native/Capacitor mobile application.*
- [ ] TASK-1501: [INDEPENDENT] Standardize API responses strictly using JSON for all external routes. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-1502: [INDEPENDENT] Extract business logic completely from Server Components to shared services. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-1503: [INDEPENDENT] Setup CORS and secure API keys for cross-platform access. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-1504: [INDEPENDENT] Implement comprehensive request rate-limiting for native app endpoints. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-1505: [INDEPENDENT] Generate OpenAPI specification for all backend services. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)

## 🟠 PHASE 16: Automated Testing & CI/CD Pipeline [EPIC-1600] (10 WU)
*Objective: Establish comprehensive test coverage and deployment automation.*
- [ ] TASK-1601: [INDEPENDENT] Expand Jest unit test coverage for core business logic functions. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-1602: [INDEPENDENT] Configure GitHub Actions workflow for PR validation (Lint/Test). Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-1603: [INDEPENDENT] Implement end-to-end testing using Playwright for critical user flows. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-1604: [INDEPENDENT] Integrate SonarQube or similar code quality analysis into CI. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-1605: [INDEPENDENT] Setup automated deployment to staging environments on branch pushes. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)

## 🟤 PHASE 17: User Onboarding & Guided Tours [EPIC-1700] (10 WU)
*Objective: Ensure new users understand platform capabilities through guided experiences.*
- [ ] TASK-1701: [INDEPENDENT] Create interactive multi-step onboarding flow for new registrations. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-1702: [INDEPENDENT] Build context-aware tooltip system for complex UI elements. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-1703: [INDEPENDENT] Design a "Getting Started" checklist dashboard for first-time visitors. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-1704: [INDEPENDENT] Implement dismissible "New Feature" announcement banners. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-1705: [INDEPENDENT] Add embedded video tutorial integration using a custom video player. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)

## ⚫ PHASE 18: Performance Profiling & Optimization [EPIC-1800] (10 WU)
*Objective: Maximize page load speeds and optimize React rendering lifecycles.*
- [ ] TASK-1801: [INDEPENDENT] Audit and minimize JavaScript bundle size for all client-side boundaries. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-1802: [INDEPENDENT] Implement dynamic import code-splitting for non-critical components. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-1803: [INDEPENDENT] Optimize all images using Next.js Image component and modern formats. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-1804: [INDEPENDENT] Analyze and reduce Supabase query execution times with proper indexing. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)
- [ ] TASK-1805: [INDEPENDENT] Setup real-user monitoring (RUM) to track Core Web Vitals in production. Atoms: Test (95%), Lint (0-err), Opt (Big O), Sec (Sanitize) (1 WU)

---

## 🔮 STRATEGIC PROPOSALS (20 WU)
- [ ] **STRATEGY-A: Unified Knowledge Graph** (10 WU)
  *   Propose moving from flat relational mapping to a graph-based structure connecting Shlokas to distinct philosophical concepts (e.g., Karma, Dharma), automatically tagging dictionary entries mentioned within a Shloka.
- [ ] **STRATEGY-B: AI-Driven Translation Copilot** (10 WU)
  *   Investigate the feasibility of integrating a local LLM or edge-based API to provide contextual breakdown of compound Sanskrit words (Sandhi splitting) on the fly for rare dictionary terms.
