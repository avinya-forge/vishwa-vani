---
name: prd
description: Generate high-quality Product Requirements Documents (PRDs) for software systems and AI-powered features, tailored to Vishwa-Vani's scripture reading platform.
---

# PRD Generator — Product Requirements Document

**Goal:** Produce a clear, actionable PRD that any engineer can implement without ambiguity.

## Trigger Phrases
- "Write a PRD for..."
- "Product requirements for..."
- "Spec out this feature"

## PRD Template

\`\`\`markdown
# PRD: [Feature Name]
**Version:** 1.0  
**Status:** Draft | Review | Approved  
**Author:** [Agent/User]  
**Date:** YYYY-MM-DD

---

## Executive Summary
One paragraph. What problem does this solve? Who benefits?

## Problem Statement
- Current pain point (with evidence if possible)
- Impact on users

## Goals & Non-Goals
**Goals:**
- [ ] Goal 1 (measurable)
- [ ] Goal 2

**Non-Goals (explicitly out of scope):**
- X is not being addressed in this iteration

## User Stories
| ID | Role | Want | So That |
|---|---|---|---|
| US-01 | Sanskrit scholar | compare two commentaries side-by-side | I can spot philosophical differences |
| US-02 | Casual reader | see AI synthesis without toggling commentaries | I get the essence quickly |

## Functional Requirements
| ID | Requirement | Priority |
|---|---|---|
| FR-01 | System shall... | P0 (must-have) |
| FR-02 | System should... | P1 (high value) |
| FR-03 | System may... | P2 (nice-to-have) |

## Technical Specification
- **Components affected:** (e.g., `components/shloka/study-client.tsx`)
- **API changes:** (new endpoints, modified payloads)
- **Data model changes:** (NVF schema additions, new fields)
- **Performance targets:** (e.g., < 200ms TTFB, < 3s AI synthesis)

## Acceptance Criteria
- [ ] AC-01: Given X, when Y, then Z
- [ ] AC-02: ...

## Definition of Done
- [ ] All acceptance criteria met
- [ ] `npm run lint` exits 0
- [ ] `npm run build` exits 0
- [ ] `npm test` exits 0, coverage ≥ 80%
- [ ] QA audit passed (visual + API + accessibility)
- [ ] `docs/release-notes.md` updated
\`\`\`

## Vishwa-Vani Product Principles
- **Lean UI Template is law:** max 2 scholars, commentary hidden by default, AI always available
- **Gold Standard Only:** no feature ships with placeholder data
- **Stability Gate first:** no new features before EPIC 7 stability tasks complete
- **Progressive enhancement:** features work without JS (SSG), enhanced with JS
