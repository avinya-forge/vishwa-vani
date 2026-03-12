# Architectural Standards & Governance

## 1. Modularity & Reusability (Anti-"One-Off" Policy)
*   **Reject One-Off Components:** Every component must be built with reusability in mind. If a UI element is created, it must be modularized and placed in the appropriate `components/` subfolder.
*   **Strict Props Typing:** All components must have strictly typed generic props using TypeScript interfaces.
*   **Atomic Design:** Break down components into their smallest verifiable pieces. Use composition instead of creating monolithic client components.

## 2. Server Components as North Star
*   **Default Execution:** All components must default to React 19 Server Components (`async function Component()`).
*   **Client Boundaries:** `'use client'` is strictly reserved for:
    *   `useState`, `useEffect`, or custom hooks like `useDebounce`.
    *   Interactivity requiring DOM event listeners (`onClick`, `onChange`).
    *   Stateful integrations (e.g., specific audio players or rich text editors).
*   **Data Fetching:** Isolate database calls to Server Components. Do not use client-side fetching unless absolutely necessary (e.g., infinite scroll or real-time sockets).

## 3. Schema-First API Contracts
*   **No API Without Documentation:** Any external API route created under `/api` MUST have a documented contract in `docs/swagger.yaml` BEFORE implementation.
*   **Mock Data Mandate:** Swagger definitions must include robust mock data models to ensure clear expectations between backend and client-side logic.

## 4. Pruning Mandate
*   **Continuous Cleanup:** Sessions must actively seek out dead code, unused files (e.g., legacy client fetchers replaced by Server Actions), and redundant utilities.
*   **Zero-Bloat Enforcement:** Keep the Tech Debt Ratio (TDR) below 5%.

## 5. Styling
*   **Tailwind v4 Supremacy:** Only Tailwind v4 utility classes are permitted.
*   **No Custom CSS:** The creation of custom CSS files or the use of `@apply` in global stylesheets is strictly prohibited unless addressing a specific browser bug that utility classes cannot solve.