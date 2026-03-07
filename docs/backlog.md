# Vishwa-Vani Roadmap & Backlog

*Metrics: 60 Atomic Tasks = 60 Total Work Units (WU). Maintained strict density of 60 items.*

## SUMMARY OF REFINEMENT
- **Breadth-then-Depth Applied:** All tasks have been formatted into granular, AI-ready tables.
- **Workflow Integrity:** "Done" items (301, 302) have been vaulted.

## PHASE 1: Foundation & Authentication (High Priority)
| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-101 | As a developer, I want to initialize Supabase project and connect env variables so that database is available. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement connection | 1 | 102 |
| TASK-102 | As a user, I want implement Email/Password login and signup using Supabase Auth so that I can authenticate. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Auth | 2 | 103 |
| TASK-103 | As a user, I want create a simple profile page to view account details so that I can manage my info. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement UI | 3 | 104 |
| TASK-104 | As a user, I want establish the main layout with a responsive Header and Footer so that I can navigate. | App Router, UI | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement UI | 4 | 201 |

## PHASE 2: Core Content Features (Medium Priority)
| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-201 | As a developer, I want define Database Schema for Posts so that content is structured. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Schema | 5 | 202 |
| TASK-202 | As a user, I want develop a form to create new blog posts so that I can write content. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Form | 6 | 203 |
| TASK-203 | As a user, I want create a homepage feed displaying latest posts so that I can discover content. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Feed | 7 | 204 |
| TASK-204 | As a user, I want a dynamic route `[slug]` to view individual articles so that I can read posts. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Route | 8 | 205 |

## PHASE 2.5: Interaction & Polish (Low Priority)
| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-205 | As a user, I want to allow users to comment on posts so that discussion is possible. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Comments | 9 | 206 |
| TASK-206 | As a user, I want a simple like button for posts so that I can react to content. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Likes | 10 | 207 |
| TASK-207 | As a user, I want implement Tailwind dark mode switcher so that I can use dark mode. | App Router, UI | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Dark Mode | 11 | 208 |
| TASK-208 | As a user, I want add metadata and OpenGraph tags so that SEO is optimized. | App Router, SEO | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement SEO | 12 | 303 |


## PHASE 3: Community & Social Engagement [EPIC-300] (12 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-303 | As a user/admin, I want implement "add comment" form with optimistic ui updates so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 1/60 | 304 |
| TASK-306 | As a system architect, I want to remove `client-shloka.ts` so that code redundancy is eliminated and server-first logic is enforced. | App Router, Refactoring | Code removed, TDR < 5% | MUST | 2 WU | -50 | Delete unused client service file | 149/150 | None |
| TASK-304 | As a user/admin, I want add generic upvote/reaction system (schema + server action) for posts so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 2/60 | 305 |
| TASK-305 | As a user/admin, I want configure row level security (rls) for user-created content modification so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 3/60 | 401 |

## PHASE 4: Search Hardening & Advanced Dictionary [EPIC-400] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-401 | As a user/admin, I want setup postgresql pg_trgm extension for fuzzy text search so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 4/60 | 402 |
| TASK-402 | As a user/admin, I want refactor searchwords service to utilize fuzzy matching api so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 5/60 | 403 |
| TASK-403 | As a user/admin, I want implement debounced auto-complete suggestions dropdown so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 6/60 | 404 |
| TASK-404 | As a user/admin, I want add search filters for specific languages so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 7/60 | 405 |
| TASK-405 | As a user/admin, I want implement advanced root word search using stemming so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 8/60 | 501 |

## PHASE 5: Immersive Audio & Pronunciation [EPIC-500] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-501 | As a user/admin, I want set up supabase storage bucket audio_files for mp3s so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 9/60 | 502 |
| TASK-502 | As a user/admin, I want design minimalist, accessible audio player component so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 10/60 | 503 |
| TASK-503 | As a user/admin, I want integrate audio player into shlokacard component so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 11/60 | 504 |
| TASK-504 | As a user/admin, I want add metadata schema for start/end timestamps for lyrics so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 12/60 | 505 |
| TASK-505 | As a user/admin, I want create progressive audio loading implementation so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 13/60 | 601 |

## PHASE 6: Content Administration & Ingestion [EPIC-600] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-601 | As a user/admin, I want enforce admin role checking middleware for /admin routes so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 14/60 | 602 |
| TASK-602 | As a user/admin, I want build markdown-based text editor server component so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 15/60 | 603 |
| TASK-603 | As a user/admin, I want create bulk-upload feature (csv/json) parser for terms so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 16/60 | 604 |
| TASK-604 | As a user/admin, I want scaffold admin dashboard for moderation (flagged comments) so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 17/60 | 605 |
| TASK-605 | As a user/admin, I want design auto-saving draft mechanism for admin entries so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 18/60 | 701 |

## PHASE 7: Offline Mode & PWA Support [EPIC-700] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-701 | As a user/admin, I want generate web app manifest and icons so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 19/60 | 702 |
| TASK-702 | As a user/admin, I want setup workbox/next-pwa for static asset caching so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 20/60 | 703 |
| TASK-703 | As a user/admin, I want implement indexeddb fallback strategy for cached searches so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 21/60 | 704 |
| TASK-704 | As a user/admin, I want add 'offline mode' indicator in the main layout header so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 22/60 | 705 |
| TASK-705 | As a user/admin, I want configure background sync for optimistically updated collections so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 23/60 | 801 |

## PHASE 8: Analytics & SEO Overhaul [EPIC-800] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-801 | As a user/admin, I want generate dynamic sitemap.xml for all dictionary words and shlokas so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 24/60 | 802 |
| TASK-802 | As a user/admin, I want integrate dynamic opengraph image generation (@vercel/og) so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 25/60 | 803 |
| TASK-803 | As a user/admin, I want embed json-ld structured data for articles and terms so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 26/60 | 804 |
| TASK-804 | As a user/admin, I want add privacy-first analytics script to layout.tsx so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 27/60 | 805 |
| TASK-805 | As a user/admin, I want implement robust server-side analytics for api performance so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 28/60 | 901 |

## PHASE 9: Accessibility (A11Y) Audit & Overhaul [EPIC-900] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-901 | As a user/admin, I want perform automated a11y audit using axe and integrate in ci so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 29/60 | 902 |
| TASK-902 | As a user/admin, I want implement high-contrast and dyslexia-friendly typography toggle so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 30/60 | 903 |
| TASK-903 | As a user/admin, I want improve keyboard navigation and focus management across forms so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 31/60 | 904 |
| TASK-904 | As a user/admin, I want add aria landmarks and aria-live regions for dynamic content updates so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 32/60 | 905 |
| TASK-905 | As a user/admin, I want enhance color contrast ratios across all tailwind themes so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 33/60 | 1001 |

## PHASE 10: Multi-Language Internationalization (i18n) [EPIC-1000] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-1001 | As a user/admin, I want set up next-intl or native next.js i18n routing for language selection so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 34/60 | 1002 |
| TASK-1002 | As a user/admin, I want extract all hardcoded ui strings into translation dictionaries so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 35/60 | 1003 |
| TASK-1003 | As a user/admin, I want build language switcher component in the navbar so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 36/60 | 1004 |
| TASK-1004 | As a user/admin, I want translate core page metadata based on locale so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 37/60 | 1005 |
| TASK-1005 | As a user/admin, I want modify supabase queries to fetch localized meanings from text tables so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 38/60 | 1101 |

## PHASE 11: Real-time Notifications [EPIC-1100] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-1101 | As a user/admin, I want configure supabase realtime subscriptions for the comments table so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 39/60 | 1102 |
| TASK-1102 | As a user/admin, I want implement a generic notification dropdown ui component so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 40/60 | 1103 |
| TASK-1103 | As a user/admin, I want add server-side triggers to create notifications on new replies so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 41/60 | 1104 |
| TASK-1104 | As a user/admin, I want setup push notification framework using web push api so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 42/60 | 1105 |
| TASK-1105 | As a user/admin, I want create a user preference page to manage notification opt-ins so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 43/60 | 1201 |

## PHASE 12: Gamification & Study Streaks [EPIC-1200] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-1201 | As a user/admin, I want create user_activity db table to track daily read metrics so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 44/60 | 1202 |
| TASK-1202 | As a user/admin, I want implement logic to calculate and store user study streaks so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 45/60 | 1203 |
| TASK-1203 | As a user/admin, I want design and build a 'streak badge' component for user profiles so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 46/60 | 1204 |
| TASK-1204 | As a user/admin, I want add celebration animations (canvas confetti) upon reaching milestones so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 47/60 | 1205 |
| TASK-1205 | As a user/admin, I want build weekly progress summary email digest generation script so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 48/60 | 1301 |

## PHASE 13: Enhanced Daily Discoverability [EPIC-1300] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-1301 | As a user/admin, I want implement 'shloka of the day' caching and rotation logic so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 49/60 | 1302 |
| TASK-1302 | As a user/admin, I want build 'word of the day' widget for the dictionary home page so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 50/60 | 1303 |
| TASK-1303 | As a user/admin, I want setup cron job (vercel cron) to auto-update daily selections so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 51/60 | 1304 |
| TASK-1304 | As a user/admin, I want add social sharing (twitter, whatsapp) links for daily content so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 52/60 | 1305 |
| TASK-1305 | As a user/admin, I want implement random discovery module ('surprise me' button) so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 53/60 | 1401 |

## PHASE 14: Data Portability [EPIC-1400] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-1401 | As a user/admin, I want build secure api endpoint to fetch all user-owned data so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 54/60 | 1402 |
| TASK-1402 | As a user/admin, I want implement json export feature for user collections so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 55/60 | 1403 |
| TASK-1403 | As a user/admin, I want implement csv export functionality for user reading history so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 56/60 | 1404 |
| TASK-1404 | As a user/admin, I want add automated gdpr/ccpa account deletion pipeline so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 57/60 | 1405 |
| TASK-1405 | As a user/admin, I want build user dashboard component for managing data privacy so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 58/60 | 1501 |

## PHASE 15: Cross-Platform Native Preparation [EPIC-1500] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-1501 | As a user/admin, I want standardize api responses strictly using json for all external routes so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 59/60 | 1502 |
| TASK-1502 | As a user/admin, I want extract business logic completely from server components to shared services so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 60/60 | None |
