# Ultra-Lean Standards

## Technical Stack
1.  **Framework**: Next.js 16 (App Router).
2.  **Language**: TypeScript (Strict mode).
3.  **UI Library**: React 19 (Server Components by default).
4.  **Styling**: Tailwind CSS v4 (No custom CSS if possible, use utilities).
5.  **Database/Auth**: Supabase (PostgreSQL).
6.  **State**: React Hooks (use-debounce, etc.) for local; URL search params for global state where applicable.

## Coding Guidelines
1.  **Server vs Client**:
    *   Default to Server Components (`async function Page()`).
    *   Add `'use client'` at the top ONLY if using hooks (`useState`, `useEffect`) or event listeners.
2.  **Data Fetching**:
    *   Fetch data directly in Server Components using `await supabase.from(...).select()`.
    *   Use Server Actions (`'use server'`) for mutations (form submissions).
3.  **Tailwind v4**:
    *   Use the new v4 engine features. 
    *   Avoid `@apply` in CSS files; keep styles in JSX classNames.
4.  **Supabase**:
    *   Use the Supabase JS Client for database interactions.
    *   Ensure Row Level Security (RLS) policies are considered when designing tables.
