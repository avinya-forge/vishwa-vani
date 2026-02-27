# Vishwa-Vani Constitution & Vision

## 🌟 North Star
To orchestrate a transcendent and friction-free digital sanctuary for exploring Vedic wisdom. Vishwa-Vani must provide an immersive, highly performant, and deeply interconnected experience of Shlokas, Mantras, and Sanskrit definitions across languages (English, Hindi, Marathi).

## 🏔 Ideal State
- **Performance**: Sub-100ms LCP on all text-heavy routes, leveraging Next.js App Router (React 19 Server Components by default).
- **Aesthetic**: Minimalist, culturally resonant design powered by Tailwind CSS v4, focusing on readability and accessibility.
- **Data Integrity**: Absolute SSoT mapping between English transliterations, Devanagari script, and localized meanings via Supabase.
- **User Journey**: Seamless transition from casual exploration (homepage feeds) to deep study (dictionary lookups, personalized bookmarks/saves).

## ⚖️ Pipeline Laws
1. **Server-First Execution**: Default to Server Components (`async function Page()`). Client boundaries (`'use client'`) are strictly reserved for local state (e.g., `use-debounce`) or DOM event listeners.
2. **Atomic Independence**: Every task must be deployable independently within 1-2 hours of effort (1 Work Unit).
3. **Adversarial Triad Review**:
    *   **Optimizer**: "Is this query cached? Are we over-fetching from Supabase?"
    *   **Hardener**: "What happens if Supabase Auth is down? Is the fallback UI graceful?"
    *   **Pragmatist**: "Does the user actually need a complex editor, or will a simple textarea with Server Actions suffice?"
4. **Latest Stable Env Only**: The codebase respects standard Next.js 16 + React 19 conventions. Avoid deprecated patterns (e.g., Pages router paradigms).
5. **No Custom CSS**: Utility classes (Tailwind v4) rule supreme.

## 🎯 Definition of Done (DoD)
- Code compiles locally without TS or ESLint errors (`npm run lint`, `npm run build`).
- Relevant `.md` documentation (vision, backlog, release notes) are synchronized.
- Feature is broken down into independent atomic tasks (1-2 hours).
- Visual regressions verified (Frontend verification complete).
- Version strings are bumped when moving items from Backlog to Vault (Release Notes).
