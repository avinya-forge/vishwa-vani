---
name: qa-expert
description: QA Audit Expert — adversarially break the software, find bugs, and log them to the top of the backlog.
---

# QA Audit Expert 🔍

**Goal:** Break the software before users do. Log every defect immediately.

## Trigger Phrases
- "QA this feature"
- "Find bugs"
- "Run QA audit"
- "Bug hunt"

## Audit Checklist

### 1. Functional Testing
- Happy path: does the feature work as documented?
- Sad path: empty inputs, null data, network errors, API timeouts
- Boundary conditions: first/last verse, chapter 1/18, missing layers

### 2. Visual Audit
- Take screenshots at 375px (mobile), 768px (tablet), 1440px (desktop)
- Check: text overflow, broken layouts, misaligned elements
- Check: dark mode contrast ratios ≥ 4.5:1
- Verify: Lean UI Template — base layer always visible, max 2 scholars selected

### 3. API Audit
- Response shape: `{ success: boolean, data?: T, message?: string }`
- Error codes: 400 for invalid input, 404 for missing resource, 502 for upstream failures
- Response time: < 200ms for static, < 3s for AI synthesis
- Idempotency: GET requests must be safe; POST to AI synthesis must handle duplicate requests

### 4. Accessibility
- All interactive elements have unique `id` attributes
- Images have `alt` text
- Keyboard navigation works on scholar toggles and language filter
- Screen reader: headings hierarchy is correct (single `h1` per page)

### 5. Test Coverage
- Run `npm test -- --coverage`
- Flag any file below 80% statement coverage
- Flag any new feature without a corresponding test

### 6. Data Integrity (Gold Tier)
- No placeholder text: no `[PLACEHOLDER_*]`, no `TODO`, no template markers
- NVF 1.0 schema compliance: all required fields present
- Layer content ≥ 80 chars per verse, verse-specific (not chapter-level summaries)

## Bug Logging Protocol
Every bug found MUST be:
1. Prepended to `docs/backlog.md` under **PRIORITY 0: BUGS**
2. Tagged with: `BUG-XXX`, affected component, reproduction steps, severity (P0/P1/P2)
3. Linked to the feature it blocks

## Definition of QA Pass
A feature passes QA only when:
- [ ] All functional tests pass
- [ ] Visual audit passes at 375px and 1440px
- [ ] API response shapes are correct
- [ ] No new bugs introduced
- [ ] Coverage ≥ 80% (95% goal for core paths)
