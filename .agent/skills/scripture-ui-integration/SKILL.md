---
name: scripture-ui-integration
description: Registers scholars, integrates scripture reading views, adds dynamic Vedic Lab components, and executes visual quality gates.
---

# Scripture UI & Lab Integration 🎨⚛️

**Goal:** Integrate processed scripture metadata into UI registries, dynamic labs, and test components.

## Workflow & Process

1. **Scholar Registry Update**:
   - Register scholar metadata inside `lib/scholars.ts` (Single Source of Truth).

2. **Vedic Lab Component Integration**:
   - Create lab component under `components/lab/`.
   - Register in `lib/vedic-labs-registry.ts`.
   - Import dynamically in `app/lab/page.tsx` with `ssr: false` and `<LabSkeleton />`:
     ```tsx
     const NewLabComponent = dynamic(() => import('@/components/lab/new-lab-component'), {
       ssr: false,
       loading: () => <LabSkeleton />
     });
     ```
   - Insert inside `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">` container in `app/lab/page.tsx`.

3. **Dedicated Unit Testing**:
   - Add unit test suite in `__tests__/` verifying scholar registration, JSON loading, or lab rendering.

4. **Visual Quality Gates**:
   - Mobile responsive check down to 320px viewport.
   - Cumulative Layout Shift (CLS) check.
   - Dark mode contrast (`dark:bg-stone-800` pulse elements against `dark:bg-stone-900`).
