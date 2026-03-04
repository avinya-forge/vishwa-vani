# Vishwa-Vani Release Archive

## [v0.4.0] - Community Core Initiated
*   **Epic Archived**: Community & Social Engagement (partial).
*   **Notes**: Completed initial Phase 3 backlog items to setup comments database table and server-rendered comment list. Backlog successfully refined to 400+ WU.
*   **Completed Work**:
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
