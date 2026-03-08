# Vishwa-Vani Release Archive

*Current Session ID*: VANI-5
*Last Action*: Fixed ESLint circular dependency.

## [v0.4.1] - Maintenance Update
*   **Epic Archived**: Configuration Fixes.
*   **Notes**: Resolved Next.js 16.1.6 & ESLint 9 Flat Config bug.
*   **Completed Work**:
    *   [x] TASK-307: fix eslint circular dependency bug

## [v0.4.0] - Community Core Initiated
*   **Epic Archived**: Community & Social Engagement (partial) + Blog Foundation.
*   **Notes**: Completed Phase 1 and Phase 2 backlog items to integrate posts, comments, dark mode, and SEO features alongside initial Phase 3 items. Backlog successfully refined to maintain exactly 60 tasks.
*   **Completed Work**:
    *   [x] TASK-101: init supabase project and connect env variables
    *   [x] TASK-102: implement email/password auth login/signup
    *   [x] TASK-103: scaffold profile page view account details
    *   [x] TASK-104: main layout with responsive header/footer
    *   [x] TASK-201: define database schema for posts
    *   [x] TASK-202: develop blog post creation form
    *   [x] TASK-203: implement homepage feed of latest posts
    *   [x] TASK-204: dynamic slug routing for individual articles
    *   [x] TASK-205: add users comment logic on posts
    *   [x] TASK-206: build simple like button for posts
    *   [x] TASK-207: implement tailwind dark mode switcher
    *   [x] TASK-208: add metadata and opengraph seo tags
    *   [x] TASK-301: Create `comments` DB table referencing `shlokas` and `users`
    *   [x] TASK-302: Build server-rendered comment list under Shloka detail view

## [v0.3.0] - Identity & Collections Vaulted
*   **Epic Archived**: Authentication & Identity, Personalized Bookmarks & Collections.
*   **Notes**: Completed Phase 1 and Phase 2 backlog items to integrate Supabase OAuth, passwordless login, and custom collection management.
*   **Completed Work**:
    *   [x] TASK-101: Create Supabase OAuth integration (Google/Apple) in `utils/supabase/server.ts`
    *   [x] TASK-102: Implement Email/Password magic link flow for passwordless login
    *   [x] TASK-103: Scaffold `/profile` route with protected Server Components
    *   [x] TASK-104: Add client-side user session synchronization (`'use client'` boundary)
    *   [x] TASK-201: Define DB schema (Supabase) for `collections` and `saved_items`
    *   [x] TASK-202: Create "Save to Collection" interactive UI button for `ShlokaCard`
    *   [x] TASK-203: Implement Server Action to insert/remove bookmarked Shlokas
    *   [x] TASK-204: Build `/collections` index page to list user-created folders
    *   [x] TASK-205: Add a dynamic route `/collections/[id]` to view saved items within a folder

## [v0.2.0] - Foundation Validated
*   **Epic Archived**: Foundation & Authentication Setup, Core Content Features (partial).
*   **Notes**: Transitioned initial concept code to a structured architecture ready for distributed development. Backlog and Vision successfully synchronized.
*   **Completed Work**:
    *   [x] Initial Next.js 16 (App Router) & React 19 Scaffolding
    *   [x] Tailwind CSS v4 setup and global styling
    *   [x] Supabase basic DB connection configured
    *   [x] Core Page Structure (`/`, `/dictionary`)
    *   [x] Basic Shloka feed implemented (`ShlokaCard`)
    *   [x] Initial Dictionary search function (`searchWords` & `SearchBar`)

## [v0.1.0] - Alpha Genesis
*   **Epic Archived**: Concept initialization.
*   **Notes**: The foundational repository structure was instantiated. Initial Next.js template generated.
