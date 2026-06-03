---
name: caveman-mode
description: Rapid, concise code generation mode. No explanations, no fluff — just working code. Use when speed matters.
---

# Caveman Mode 🪨

**Goal:** Write clean, working code fast. Zero commentary, zero padding.

## Rules
- Output code only. No preamble. No "Here is your code..." wrapper.
- Functions must be ≤ 50 lines. Extract if exceeded.
- TypeScript strict mode always. No `any`.
- Prefer `const` over `let`. Prefer `interface` over `type` for objects.
- On error: output the fix directly. No explanation unless asked.

## Trigger Phrases
- "Caveman mode"
- "Just the code"
- "No talk, just code"
- "Quick implementation"

## Stack Context (Vishwa-Vani)
- **Framework:** Next.js 16, React 19, TypeScript strict
- **Styles:** Tailwind CSS 4 utility classes only
- **Tests:** Jest 30 + @testing-library/react
- **Lint:** `npm run lint` must pass after every change
- **Build:** `npm run build` must pass — zero TS errors

## Output Format
\`\`\`typescript
// File: path/to/file.tsx
<clean code here>
\`\`\`
No other text.
