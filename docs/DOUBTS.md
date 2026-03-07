# DOUBTS.md

## ESLint 9 + Next.js 16.1.6 Circular JSON Bug

**Date:** 2026-03-07
**Task:** [307]: fix eslint circular dependency bug

**Context:**
The Next.js 16.1.6 setup with ESLint 9 using `@eslint/eslintrc` `FlatCompat` results in a `TypeError: Converting circular structure to JSON` during `npm run lint`. This crash occurs within the `config-validator.js` of `@eslint/eslintrc` because it cannot serialize the loaded circular configuration object.

**Attempts:**
1. **Upgrading `@eslint/eslintrc` to `^3.3.5`:** This suppresses the circular structure crash but exposes an invalid configuration structure returned by `eslint-config-next/core-web-vitals` (e.g., `Property "" is the wrong type (expected object but got '[object Object]...')`).
2. **Replacing `FlatCompat` with Native ESLint 9 Flat Config:** Exporting an array spreading `nextVitals` throws a runtime error (`TypeError: nextVitals is not iterable`) because the Next.js recommended config remains a legacy JavaScript object instead of a flat array, and drops the TypeScript configurations entirely.
3. **Monkey-patching `config-validator.js`:** Changing `JSON.stringify` to `String()` avoids the serialization crash but also exposes the same underlying configuration incompatibility.

**Blocker / Pause Justification:**
The current `eslint-config-next@16.1.6` legacy config object does not correctly map to ESLint 9's Flat Config expectations when using the `FlatCompat` adapter, or without it. We need architectural clarification on whether to drop `eslint-config-next` and build a manual flat config for Next.js/React/TypeScript, or if there's a specific undocumented setup for Next.js 16 with ESLint 9.

Following the Stall Protocol, we are pausing further arbitrary modifications to `eslint.config.mjs` to avoid regressions and waiting for explicit instruction. Other minor linting errors within the codebase have been fixed successfully.