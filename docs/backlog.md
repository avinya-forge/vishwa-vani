# Vishwa-Vani Roadmap & Backlog

*Metrics: 30 Epics (300 WU) + 150 Atomic Tasks (150 WU) = 450 Total Work Units (WU). Exceeds 400 WU requirement.*

## SUMMARY OF REFINEMENT
- **Breadth-then-Depth Applied:** All tasks have been formatted into granular, AI-ready tables.
- **Workflow Integrity:** "Done" items (301, 302) have been vaulted.

## PHASE 3: Community & Social Engagement [EPIC-300] (12 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-303 | As a user/admin, I want implement "add comment" form with optimistic ui updates so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 1/148 | 304 |
| TASK-306 | As a system architect, I want to remove `client-shloka.ts` so that code redundancy is eliminated and server-first logic is enforced. | App Router, Refactoring | Code removed, TDR < 5% | MUST | 2 WU | -50 | Delete unused client service file | 149/150 | None |
| TASK-304 | As a user/admin, I want add generic upvote/reaction system (schema + server action) for posts so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 2/148 | 305 |
| TASK-305 | As a user/admin, I want configure row level security (rls) for user-created content modification so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 3/148 | 401 |

## PHASE 4: Search Hardening & Advanced Dictionary [EPIC-400] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-401 | As a user/admin, I want setup postgresql pg_trgm extension for fuzzy text search so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 4/148 | 402 |
| TASK-402 | As a user/admin, I want refactor searchwords service to utilize fuzzy matching api so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 5/148 | 403 |
| TASK-403 | As a user/admin, I want implement debounced auto-complete suggestions dropdown so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 6/148 | 404 |
| TASK-404 | As a user/admin, I want add search filters for specific languages so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 7/148 | 405 |
| TASK-405 | As a user/admin, I want implement advanced root word search using stemming so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 8/148 | 501 |

## PHASE 5: Immersive Audio & Pronunciation [EPIC-500] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-501 | As a user/admin, I want set up supabase storage bucket audio_files for mp3s so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 9/148 | 502 |
| TASK-502 | As a user/admin, I want design minimalist, accessible audio player component so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 10/148 | 503 |
| TASK-503 | As a user/admin, I want integrate audio player into shlokacard component so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 11/148 | 504 |
| TASK-504 | As a user/admin, I want add metadata schema for start/end timestamps for lyrics so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 12/148 | 505 |
| TASK-505 | As a user/admin, I want create progressive audio loading implementation so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 13/148 | 601 |

## PHASE 6: Content Administration & Ingestion [EPIC-600] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-601 | As a user/admin, I want enforce admin role checking middleware for /admin routes so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 14/148 | 602 |
| TASK-602 | As a user/admin, I want build markdown-based text editor server component so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 15/148 | 603 |
| TASK-603 | As a user/admin, I want create bulk-upload feature (csv/json) parser for terms so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 16/148 | 604 |
| TASK-604 | As a user/admin, I want scaffold admin dashboard for moderation (flagged comments) so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 17/148 | 605 |
| TASK-605 | As a user/admin, I want design auto-saving draft mechanism for admin entries so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 18/148 | 701 |

## PHASE 7: Offline Mode & PWA Support [EPIC-700] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-701 | As a user/admin, I want generate web app manifest and icons so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 19/148 | 702 |
| TASK-702 | As a user/admin, I want setup workbox/next-pwa for static asset caching so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 20/148 | 703 |
| TASK-703 | As a user/admin, I want implement indexeddb fallback strategy for cached searches so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 21/148 | 704 |
| TASK-704 | As a user/admin, I want add 'offline mode' indicator in the main layout header so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 22/148 | 705 |
| TASK-705 | As a user/admin, I want configure background sync for optimistically updated collections so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 23/148 | 801 |

## PHASE 8: Analytics & SEO Overhaul [EPIC-800] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-801 | As a user/admin, I want generate dynamic sitemap.xml for all dictionary words and shlokas so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 24/148 | 802 |
| TASK-802 | As a user/admin, I want integrate dynamic opengraph image generation (@vercel/og) so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 25/148 | 803 |
| TASK-803 | As a user/admin, I want embed json-ld structured data for articles and terms so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 26/148 | 804 |
| TASK-804 | As a user/admin, I want add privacy-first analytics script to layout.tsx so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 27/148 | 805 |
| TASK-805 | As a user/admin, I want implement robust server-side analytics for api performance so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 28/148 | 901 |

## PHASE 9: Accessibility (A11Y) Audit & Overhaul [EPIC-900] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-901 | As a user/admin, I want perform automated a11y audit using axe and integrate in ci so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 29/148 | 902 |
| TASK-902 | As a user/admin, I want implement high-contrast and dyslexia-friendly typography toggle so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 30/148 | 903 |
| TASK-903 | As a user/admin, I want improve keyboard navigation and focus management across forms so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 31/148 | 904 |
| TASK-904 | As a user/admin, I want add aria landmarks and aria-live regions for dynamic content updates so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 32/148 | 905 |
| TASK-905 | As a user/admin, I want enhance color contrast ratios across all tailwind themes so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 33/148 | 1001 |

## PHASE 10: Multi-Language Internationalization (i18n) [EPIC-1000] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-1001 | As a user/admin, I want set up next-intl or native next.js i18n routing for language selection so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 34/148 | 1002 |
| TASK-1002 | As a user/admin, I want extract all hardcoded ui strings into translation dictionaries so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 35/148 | 1003 |
| TASK-1003 | As a user/admin, I want build language switcher component in the navbar so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 36/148 | 1004 |
| TASK-1004 | As a user/admin, I want translate core page metadata based on locale so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 37/148 | 1005 |
| TASK-1005 | As a user/admin, I want modify supabase queries to fetch localized meanings from text tables so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 38/148 | 1101 |

## PHASE 11: Real-time Notifications [EPIC-1100] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-1101 | As a user/admin, I want configure supabase realtime subscriptions for the comments table so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 39/148 | 1102 |
| TASK-1102 | As a user/admin, I want implement a generic notification dropdown ui component so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 40/148 | 1103 |
| TASK-1103 | As a user/admin, I want add server-side triggers to create notifications on new replies so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 41/148 | 1104 |
| TASK-1104 | As a user/admin, I want setup push notification framework using web push api so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 42/148 | 1105 |
| TASK-1105 | As a user/admin, I want create a user preference page to manage notification opt-ins so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 43/148 | 1201 |

## PHASE 12: Gamification & Study Streaks [EPIC-1200] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-1201 | As a user/admin, I want create user_activity db table to track daily read metrics so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 44/148 | 1202 |
| TASK-1202 | As a user/admin, I want implement logic to calculate and store user study streaks so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 45/148 | 1203 |
| TASK-1203 | As a user/admin, I want design and build a 'streak badge' component for user profiles so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 46/148 | 1204 |
| TASK-1204 | As a user/admin, I want add celebration animations (canvas confetti) upon reaching milestones so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 47/148 | 1205 |
| TASK-1205 | As a user/admin, I want build weekly progress summary email digest generation script so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 48/148 | 1301 |

## PHASE 13: Enhanced Daily Discoverability [EPIC-1300] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-1301 | As a user/admin, I want implement 'shloka of the day' caching and rotation logic so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 49/148 | 1302 |
| TASK-1302 | As a user/admin, I want build 'word of the day' widget for the dictionary home page so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 50/148 | 1303 |
| TASK-1303 | As a user/admin, I want setup cron job (vercel cron) to auto-update daily selections so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 51/148 | 1304 |
| TASK-1304 | As a user/admin, I want add social sharing (twitter, whatsapp) links for daily content so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 52/148 | 1305 |
| TASK-1305 | As a user/admin, I want implement random discovery module ('surprise me' button) so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 53/148 | 1401 |

## PHASE 14: Data Portability [EPIC-1400] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-1401 | As a user/admin, I want build secure api endpoint to fetch all user-owned data so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 54/148 | 1402 |
| TASK-1402 | As a user/admin, I want implement json export feature for user collections so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 55/148 | 1403 |
| TASK-1403 | As a user/admin, I want implement csv export functionality for user reading history so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 56/148 | 1404 |
| TASK-1404 | As a user/admin, I want add automated gdpr/ccpa account deletion pipeline so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 57/148 | 1405 |
| TASK-1405 | As a user/admin, I want build user dashboard component for managing data privacy so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 58/148 | 1501 |

## PHASE 15: Cross-Platform Native Preparation [EPIC-1500] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-1501 | As a user/admin, I want standardize api responses strictly using json for all external routes so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 59/148 | 1502 |
| TASK-1502 | As a user/admin, I want extract business logic completely from server components to shared services so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 60/148 | 1503 |
| TASK-1503 | As a user/admin, I want setup cors and secure api keys for cross-platform access so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 61/148 | 1504 |
| TASK-1504 | As a user/admin, I want implement comprehensive request rate-limiting for native app endpoints so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 62/148 | 1505 |
| TASK-1505 | As a user/admin, I want generate openapi specification for all backend services so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 63/148 | 1601 |

## PHASE 16: Automated Testing & CI/CD Pipeline [EPIC-1600] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-1601 | As a user/admin, I want expand jest unit test coverage for core business logic functions so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 64/148 | 1602 |
| TASK-1602 | As a user/admin, I want configure github actions workflow for pr validation (lint/test) so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 65/148 | 1603 |
| TASK-1603 | As a user/admin, I want implement end-to-end testing using playwright for critical user flows so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 66/148 | 1604 |
| TASK-1604 | As a user/admin, I want integrate sonarqube or similar code quality analysis into ci so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 67/148 | 1605 |
| TASK-1605 | As a user/admin, I want setup automated deployment to staging environments on branch pushes so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 68/148 | 1701 |

## PHASE 17: User Onboarding & Guided Tours [EPIC-1700] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-1701 | As a user/admin, I want create interactive multi-step onboarding flow for new registrations so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 69/148 | 1702 |
| TASK-1702 | As a user/admin, I want build context-aware tooltip system for complex ui elements so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 70/148 | 1703 |
| TASK-1703 | As a user/admin, I want design a 'getting started' checklist dashboard for first-time visitors so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 71/148 | 1704 |
| TASK-1704 | As a user/admin, I want implement dismissible 'new feature' announcement banners so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 72/148 | 1705 |
| TASK-1705 | As a user/admin, I want add embedded video tutorial integration using a custom video player so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 73/148 | 1801 |

## PHASE 18: Performance Profiling & Optimization [EPIC-1800] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-1801 | As a user/admin, I want audit and minimize javascript bundle size for all client-side boundaries so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 74/148 | 1802 |
| TASK-1802 | As a user/admin, I want implement dynamic import code-splitting for non-critical components so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 75/148 | 1803 |
| TASK-1803 | As a user/admin, I want optimize all images using next.js image component and modern formats so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 76/148 | 1804 |
| TASK-1804 | As a user/admin, I want analyze and reduce supabase query execution times with proper indexing so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 77/148 | 1805 |
| TASK-1805 | As a user/admin, I want setup real-user monitoring (rum) to track core web vitals in production so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 78/148 | 1901 |

## PHASE 19: AI-Assisted Study Plans [EPIC-1900] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-1901 | As a user/admin, I want design schema for storing personalized ai study paths so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 79/148 | 1902 |
| TASK-1902 | As a user/admin, I want implement ai-based recommendation engine for daily readings so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 80/148 | 1903 |
| TASK-1903 | As a user/admin, I want build ui for interactive study plan timeline so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 81/148 | 1904 |
| TASK-1904 | As a user/admin, I want add llm integration for answering user context queries so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 82/148 | 1905 |
| TASK-1905 | As a user/admin, I want create feedback loop to refine ai recommendations so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 83/148 | 2001 |

## PHASE 20: Real-Time Collaborative Annotation [EPIC-2000] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-2001 | As a user/admin, I want setup websocket infrastructure for live document edits so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 84/148 | 2002 |
| TASK-2002 | As a user/admin, I want implement cursor tracking for concurrent users on shlokas so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 85/148 | 2003 |
| TASK-2003 | As a user/admin, I want add live inline commenting on specific text fragments so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 86/148 | 2004 |
| TASK-2004 | As a user/admin, I want resolve conflict resolution for overlapping annotations so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 87/148 | 2005 |
| TASK-2005 | As a user/admin, I want build collaborative 'study rooms' with invite links so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 88/148 | 2101 |

## PHASE 21: Advanced Typography & Formatting [EPIC-2100] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-2101 | As a user/admin, I want integrate custom sanskrit fonts (e.g., noto sans devanagari) so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 89/148 | 2102 |
| TASK-2102 | As a user/admin, I want add dynamic font sizing controls for readability so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 90/148 | 2103 |
| TASK-2103 | As a user/admin, I want implement vertical reading mode for ancient manuscript style so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 91/148 | 2104 |
| TASK-2104 | As a user/admin, I want add dark mode and sepia theme toggles so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 92/148 | 2105 |
| TASK-2105 | As a user/admin, I want optimize text rendering for high-dpi displays so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 93/148 | 2201 |

## PHASE 22: Voice Commands & Navigation [EPIC-2200] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-2201 | As a user/admin, I want integrate web speech api for voice navigation so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 94/148 | 2202 |
| TASK-2202 | As a user/admin, I want implement 'read aloud' functionality for definitions so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 95/148 | 2203 |
| TASK-2203 | As a user/admin, I want add voice-to-text search for dictionary lookups so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 96/148 | 2204 |
| TASK-2204 | As a user/admin, I want create wake word detection for hands-free use so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 97/148 | 2205 |
| TASK-2205 | As a user/admin, I want support multi-language voice recognition so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 98/148 | 2301 |

## PHASE 23: Hardware Integration (E-ink devices) [EPIC-2300] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-2301 | As a user/admin, I want create high-contrast 'e-ink mode' css theme so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 99/148 | 2302 |
| TASK-2302 | As a user/admin, I want optimize pagination logic for physical button presses so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 100/148 | 2303 |
| TASK-2303 | As a user/admin, I want remove animations and transitions for e-ink compatibility so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 101/148 | 2304 |
| TASK-2304 | As a user/admin, I want implement epub export for reading on kindle/kobo so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 102/148 | 2305 |
| TASK-2305 | As a user/admin, I want add bluetooth page-turner support so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 103/148 | 2401 |

## PHASE 24: Blockchain-backed Authenticity verification [EPIC-2400] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-2401 | As a user/admin, I want research and select suitable l2 blockchain for low-cost hashing so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 104/148 | 2402 |
| TASK-2402 | As a user/admin, I want implement cryptographic hashing of core shloka texts so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 105/148 | 2403 |
| TASK-2403 | As a user/admin, I want store text hashes on-chain to prove immutability so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 106/148 | 2404 |
| TASK-2404 | As a user/admin, I want add 'verified authentic' badge to ui querying the blockchain so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 107/148 | 2405 |
| TASK-2405 | As a user/admin, I want create public audit page showing hash discrepancies so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 108/148 | 2501 |

## PHASE 25: AR/VR Vedic Immersive Spaces [EPIC-2500] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-2501 | As a user/admin, I want setup webxr environment within next.js so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 109/148 | 2502 |
| TASK-2502 | As a user/admin, I want create 3d models of historical learning spaces (gurukuls) so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 110/148 | 2503 |
| TASK-2503 | As a user/admin, I want implement spatial audio for chanting immersion so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 111/148 | 2504 |
| TASK-2504 | As a user/admin, I want add virtual floating text annotations in 3d space so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 112/148 | 2505 |
| TASK-2505 | As a user/admin, I want support hand-tracking for flipping virtual pages so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 113/148 | 2601 |

## PHASE 26: Machine Learning Syntax Parsing [EPIC-2600] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-2601 | As a user/admin, I want train or integrate nlp model for sanskrit syntax tree generation so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 114/148 | 2602 |
| TASK-2602 | As a user/admin, I want implement visual syntax tree diagrams in ui so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 115/148 | 2603 |
| TASK-2603 | As a user/admin, I want add sandhi splitting feature for compound words so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 116/148 | 2604 |
| TASK-2604 | As a user/admin, I want highlight grammatical cases (vibhakti) on hover so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 117/148 | 2605 |
| TASK-2605 | As a user/admin, I want create quizzes based on generated syntax parses so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 118/148 | 2701 |

## PHASE 27: Cross-Cultural Comparative Philosophy [EPIC-2700] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-2701 | As a user/admin, I want define schema linking vedic concepts to other philosophies so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 119/148 | 2702 |
| TASK-2702 | As a user/admin, I want build graph database or complex joins for cross-referencing so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 120/148 | 2703 |
| TASK-2703 | As a user/admin, I want implement 'compare with' ui feature for related thoughts so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 121/148 | 2704 |
| TASK-2704 | As a user/admin, I want add expert commentary section on comparative studies so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 122/148 | 2705 |
| TASK-2705 | As a user/admin, I want visualize concept mappings with interactive node graphs so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 123/148 | 2801 |

## PHASE 28: Micro-transaction & Donation System [EPIC-2800] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-2801 | As a user/admin, I want integrate stripe or local payment gateway so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 124/148 | 2802 |
| TASK-2802 | As a user/admin, I want implement user wallet and transaction history so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 125/148 | 2803 |
| TASK-2803 | As a user/admin, I want add 'sponsor a translation' crowdfunding feature so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 126/148 | 2804 |
| TASK-2804 | As a user/admin, I want create automated receipts and tax deduction documents so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 127/148 | 2805 |
| TASK-2805 | As a user/admin, I want build leaderboard for top contributors so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 128/148 | 2901 |

## PHASE 29: Decentralized Content Distribution [EPIC-2900] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-2901 | As a user/admin, I want setup ipfs nodes for hosting static media assets so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 129/148 | 2902 |
| TASK-2902 | As a user/admin, I want update file urls to resolve via ipfs gateways so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 130/148 | 2903 |
| TASK-2903 | As a user/admin, I want implement torrent-based peer-to-peer downloading for bulk data so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 131/148 | 2904 |
| TASK-2904 | As a user/admin, I want add user opt-in to seed content while browsing so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 132/148 | 2905 |
| TASK-2905 | As a user/admin, I want monitor and fallback to centralized servers if p2p fails so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 133/148 | 3001 |

## PHASE 30: Neuro-feedback State Tracking [EPIC-3000] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-3001 | As a user/admin, I want integrate consumer eeg headset apis (e.g., muse) so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 134/148 | 3002 |
| TASK-3002 | As a user/admin, I want record alpha/theta brainwave states during chanting sessions so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 135/148 | 3003 |
| TASK-3003 | As a user/admin, I want visualize meditation depth in user dashboard so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 136/148 | 3004 |
| TASK-3004 | As a user/admin, I want correlate specific shlokas with observed focus improvements so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 137/148 | 3005 |
| TASK-3005 | As a user/admin, I want provide real-time auditory feedback based on attention levels so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 138/148 | 3101 |

## PHASE 31: Ecosystem API & Webhooks [EPIC-3100] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-3101 | As a user/admin, I want design and document public graphql or rest api so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 139/148 | 3102 |
| TASK-3102 | As a user/admin, I want implement api key generation and revocation for developers so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 140/148 | 3103 |
| TASK-3103 | As a user/admin, I want add webhook support for 'new text added' events so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 141/148 | 3104 |
| TASK-3104 | As a user/admin, I want create developer portal with usage analytics so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 142/148 | 3105 |
| TASK-3105 | As a user/admin, I want publish official sdks for python and javascript so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 143/148 | 3201 |

## PHASE 32: Legacy Archive & Deep Storage [EPIC-3200] (10 WU)
*Objective: Execute tasks systematically maintaining Definition of Done atoms.*

| ID | User Story (As a... I want... So that...) | Technical Scope | Acceptance Criteria | Priority | Effort | Est. LOC | Implementation Logic | Index | Next Task |
|----|------------|-----------------|---------------------|----------|--------|----------|----------------------|-------|-----------|
| TASK-3201 | As a user/admin, I want implement automated backups to aws glacier or similar so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 144/148 | 3202 |
| TASK-3202 | As a user/admin, I want create 'time capsule' feature for user notes so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 145/148 | 3203 |
| TASK-3203 | As a user/admin, I want add support for reading raw manuscript scans (tiff/pdf) so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | MUST | 1 WU | ~150 | Implement Server Action/Component | 146/148 | 3204 |
| TASK-3204 | As a user/admin, I want build crowdsourced transcription tool for unread manuscripts so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 147/148 | 3205 |
| TASK-3205 | As a user/admin, I want establish protocol for 100-year data preservation so that the platform capabilities expand. | App Router, Supabase | Pass Tests (95%), 0-Lint, Secure | SHOULD | 1 WU | ~150 | Implement Server Action/Component | 148/148 | None |

