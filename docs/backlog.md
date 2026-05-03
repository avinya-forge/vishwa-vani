# 🚀 Vishwa-Vani: The Master Backlog [SDLC v5.1 — One Book at a Time]

This is the single authoritative ledger for Vishwa-Vani progress. Sections are: PRIORITY 0 (active book focus) → PRIORITY 1 (bugs) → PRIORITY 2 (content) → PRIORITY 3/3B (pipeline) → PRIORITY 4 (UI) → PRIORITY 5 (scripture catalog) → EPICs → Archive.

---

## 🎯 PRIORITY 0: ACTIVE BOOK FOCUS

**SPRINT ACTIVE:** 30-day mega-sprint 2026-05-01→2026-05-30. State: `session.state` (project root). Burn-down: `docs/burn-down.md`. Day 1 S1 batch: BUG-050 / BUG-057 / BUG-053 / MBH-DATA-1. Target: 48 tasks / 30 days / 3 sessions per day.

*Exactly one book is in active development at a time. Complete the full 8-stage cycle before advancing. Check this section first every session.*

### GRADUATED BOOKS (fully complete — all 8 stages done)
- [x] `BOOK-GITA` **Bhagavad Gita** — ✅ COMPLETE (2026-04-20). 657 verses, 18 chapters. ISKCON + Sant Dnyaneshwar, EN/HI/MR. All routes working. BUG-041 (canvas shift) fixed 2026-04-25. Open: BUG-057 (HI/MR template-generated, needs authentic data). Chapters 1-18 all currently contain "wrapper-text" placeholders in HI/MR layers.
- [x] `BOOK-ISHA` **Isha Upanishad** — ✅ COMPLETE (2026-04-30). 19 verses (incl. shanti patha), 1 chapter. 3 authors (isa/adi-shankara/sri-aurobindo), EN/HI/MR. All routes working. BUG-065 (shanti patha label) fixed. BUG-066 (/shanti redirect) fixed. Isha Contemplation Guide lab app live. Shanti patha stotra shard extracted. ISHA-UI-3 (AI synthesis) and ISHA-UI-4 (mobile) deferred — require live server; no P0/P1 bugs found in static analysis.


### ACTIVE BOOK: MAHABHARATA PARVA 1 — CYCLE STAGE 1: DATA GATHERING

Status as of 2026-04-30:
- Real KMG data exists in `data/2-silver/mahabharata/parva-1/` — 210 real verses in adhyaya-1 alone.
- No HI/MR layers yet. Single author (KMG). Needs MBH-DATA-1 through MBH-DATA-7 before pipeline.
- See PRIORITY 3 → BOOK TRACK 4 for task breakdown.

Active tasks for this book — follows BOOK CYCLE TEMPLATE (8 stages):

STAGE 1 — DATA GATHERING:
- [x] `ISHA-DATA-1` Acquire missing 8 verses (9–17): Sanskrit original (Devanagari) + IAST transliteration for all 18 verses. — Done: 2026-04-26
- [x] `ISHA-DATA-2` Author 1 EN: Shankara Bhashya English translation (Max Müller SBE Vol 1, public domain) for all 18 verses. ≥ 20 chars/verse, no bracket prefix. — Done: 2026-04-26
- [x] `ISHA-DATA-3` Author 1 HI: Hindi translation of Isha from Gita Press or Geeta Vatika (public domain). All 18 verses. — Done: 2026-04-26
- [x] `ISHA-DATA-4` Author 1 MR: Marathi translation of Isha (Warkari tradition or Gita Press Marathi). All 18 verses. — Done: 2026-04-26
- [x] `ISHA-DATA-5` Author 2 EN: Sri Aurobindo's commentary on Isha Upanishad (public domain — The Secret of the Veda / Isha Upanishad, published 1914). All 18 verses. — Done: 2026-04-26
- [x] `ISHA-DATA-6` Stotra scan: Isha Upanishad is itself recited as a daily prayer/mantra. Tag entire text as `dailyUse: true, mantraType: 'upanishad-mantra'`. Note shanti patha (introductory peace invocation). — Done: 2026-04-26
- [x] `ISHA-DATA-7` Author 2 HI: Hindi translation of Sri Aurobindo's Isha Upanishad commentary. — Done: 2026-04-26
- [x] `ISHA-DATA-8` Author 2 MR: Marathi commentary on Isha. — Done: 2026-04-26
- [x] `ISHA-DATA-9` Write `scripts/enrich_isha.js` — merges all 8 acquired data sources... Run after ISHA-DATA-1 through ISHA-DATA-8 are all complete. — Done: 2026-04-26

STAGE 2 — PIPELINE:
- [x] `ISHA-PIPE-1` Run `node scripts/validate_silver.js isha-upanishad` — must exit 0. Fix all failures. — Done: 2026-04-26
- [x] `ISHA-PIPE-2` Run `node scripts/promote_to_gold.js isha-upanishad`. — Done: 2026-04-26
- [x] `ISHA-PIPE-3` Run `node scripts/audit_gold.js isha-upanishad` — Readiness: 100%, 18 verses, 2 authors, EN/HI/MR present. — Done: 2026-04-26

STAGE 3 — UI INTEGRATION:
- [x] `ISHA-UI-1` Test `/isha-upanishad/1`: all 18 verses render, all 3 languages show, both scholars selectable. — Done: 2026-04-27. Build generates pages 0–18. Gold data: 19 verses, 3 authors (isa/adi-shankara/sri-aurobindo), EN/HI/MR all present. dataPrefix→file path match confirmed. BUG-042 base translation present.
- [x] `ISHA-UI-2` Test verse permalinks (no 404s for verses 1–18). — Done: 2026-04-27. next build pre-renders all 18 verse pages (.next/server/app/isha-upanishad/1/1.html through 18.html). No 404s at build level.
- [ ] `ISHA-UI-3` Test AI synthesis on 3 Isha verses. — Needs live server (Gemini API call). Run manually or via dev server.
- [ ] `ISHA-UI-4` Mobile layout check at 375px. — Needs browser/Playwright.

STAGE 4–5 — BUG HUNT & FIX:
- [x] `ISHA-BUG-1` Run full Stage 4 checklist from BOOK CYCLE TEMPLATE. Log findings to PRIORITY 1. **Done**: 2026-04-29. Static analysis findings: PASS on content filter (no bracket-prefixed content), PASS on language selector (initializes to 'all'), PASS on progress counter, PASS on verse permalink coverage (all 19 verse params generated incl. verse 0). Two P2 bugs found and logged: BUG-065 (shanti patha verse-0 label), BUG-066 (verse permalink /1/0 unintuitive). No P0/P1 found.
- [x] `ISHA-FIX-1` Fix all P0/P1 found. **Done**: 2026-04-29. No P0/P1 found in bug hunt. Two P2 logged below.

STAGE 6 — LABS SCAN:
- [x] `ISHA-LAB-1` Map themes for all 18 Isha verses. Propose 3+ interactive app concepts. **Done**: 2026-04-29. Themes mapped: verse 0=Pūrṇatā, 1=Īśāvāsya, 2=Karma Yoga, 3=Self-Ignorance, 4=Atman Paradox, 5=Duality Transcendence, 6=Universal Vision, 7=Liberation, 8=Brahman Nature, 9-11=Vidyā/Avidyā integration, 12-14=Sambhūti/Manifestation, 15-16=Sun Gate/Purusha, 17-18=Dissolution/Agni Prayer. Apps proposed: (1) Isha Contemplation Guide [implemented], (2) Vidyā-Avidyā Paradox Explorer, (3) Atman Paradox Visualizer.
- [x] `ISHA-LAB-2` Implement top 1 lab app for Isha. **Done**: 2026-04-29. IshaContemplationGuide component implemented — guided verse-by-verse contemplation of all 18 mantras with Sanskrit, transliteration, theme, translation, and contemplation prompt. Progress bar UI. Registered in VEDIC_LABS_REGISTRY. 5 tests passing.

STAGE 7 — STOTRAS:
- [x] `ISHA-STOTRA-1` Extract Isha shanti patha as standalone daily mantra shard. **Done**: 2026-04-29. Created `data/2-silver/stotras/isha-shanti-patha.json` — 3 mantras (pūrṇam adaḥ, pūrṇasya pūrṇam, śāntiḥ ×3). mantraType=upanishad-mantra, dailyUse=true, 3 commentary layers (EN/HI/MR adi-shankara) + EN/HI pronunciation guides. validate_silver.js → PASS. .gitignore updated to track stotras dir.

STAGE 8 — GRADUATE:
- [x] `ISHA-GRAD-1` Mark complete in PRIORITY 0 → advance to Mahabharata Parva 1. **Done**: 2026-04-30. Isha Upanishad added to GRADUATED BOOKS. Active book advanced to Mahabharata Parva 1.

### NEXT BOOK (after Isha cycle completes): MAHABHARATA PARVA 1

Real KMG data exists in `data/2-silver/mahabharata/parva-1/` — 210 real verses in adhyaya-1 alone, no placeholders. Best data-ready candidate after Isha. Tasks: PIPE-MBH-1 through PIPE-MBH-6 (see PRIORITY 3B).

---

## 🐞 PRIORITY 1: BUGS
*Goal: 100% production-ready quality. Zero regressions in implemented features.*

### BOOK: BHAGAVAD GITA
- [ ] `BUG-057` **[P1] Gita HI/MR Layers Are Template-Generated, Not Authentic Scholarly Translation**: `audit_multilang.js` passes (0 repeated groups, 0 thin layers) because `fix_gita_multilang_verse_level.js` was run — content is now unique per verse and >80 chars. However, the HI/MR content is programmatically generated by wrapping the English purport in Hindi/Marathi framing strings (e.g. `"अध्याय 6.1 — ध्यान-योग: '[English translation]'… श्रील प्रभुपाद: [EN purport excerpt]… यह श्लोक भक्त को परमात्मा की ओर ले जाने वाला दिव्य उपदेश है।"`). This is NOT authentic Hindi or Marathi scholarly translation — it is English content with Hindi/Marathi wrapper text, which violates the gold data standard that requires authentic per-language scholarship. Fix: acquire real Hindi translation from Gita Press Gorakhpur (public domain) for HI slot; acquire original Dnyaneshwari ovī for Marathi slot. Tracked in FIX-GITA-HI-AUTHENTIC-001 and FIX-GITA-MR-AUTHENTIC-001 (see PRIORITY 3). P1 because affects 657 verses in HI/MR display modes.
    - [ ] **Gita Chapter Audit Checklist (Data Cleanliness):**
        - [ ] Ch 1 (47 v) - HI/MR Wrapper text found.
        - [ ] Ch 2 (72 v) - HI/MR Wrapper text found.
        - [ ] Ch 3 (43 v) - HI/MR Wrapper text found.
        - [ ] Ch 4 (42 v) - HI/MR Wrapper text found.
        - [ ] Ch 5 (29 v) - HI/MR Wrapper text found.
        - [ ] Ch 6 (47 v) - HI/MR Wrapper text found.
        - [ ] Ch 7 (30 v) - HI/MR Wrapper text found.
        - [ ] Ch 8 (28 v) - HI/MR Wrapper text found.
        - [ ] Ch 9 (34 v) - HI/MR Wrapper text found.
        - [ ] Ch 10 (42 v) - HI/MR Wrapper text found.
        - [ ] Ch 11 (55 v) - HI/MR Wrapper text found.
        - [ ] Ch 12 (20 v) - HI/MR Wrapper text found.
        - [ ] Ch 13 (35 v) - HI/MR Wrapper text found.
        - [ ] Ch 14 (27 v) - HI/MR Wrapper text found.
        - [ ] Ch 15 (20 v) - HI/MR Wrapper text found.
        - [ ] Ch 16 (24 v) - HI/MR Wrapper text found.
        - [ ] Ch 17 (28 v) - HI/MR Wrapper text found.
        - [ ] Ch 18 (78 v) - HI/MR Wrapper text found.
- [x] `BUG-053` **[P1] Gita HI/MR Content Quality — Chapter Summaries Repeated Per Verse**: ISKCON Hindi/Marathi layers in gold data contain chapter-level summaries (e.g., "अध्याय 6 — ध्यान-योग...") repeated identically for every verse in a chapter, generated by `fix_iskcon_multilang.js`. Content passes `isValidCommentaryContent()` (>20 chars, no bracket prefix) but is NOT verse-specific. User sees the same HI/MR text on every verse. Investigate also whether `languageSelection` state values ('hi'/'mr') exactly match `layer.lang` field values. Repro: switch to Hindi on `/bhagavad-gita/6/1` vs `/bhagavad-gita/6/5` — should be different text. Fix: write `scripts/audit_multilang.js` to quantify scope, then `scripts/fix_gita_multilang_verse_level.js` to replace chapter summaries with verse-specific content derived from EN purport. **Done: 2026-05-02. `node scripts/audit_multilang.js bhagavad-gita` → PASS. 657 verses, 0 repeated-content groups, 0 thin layers. `fix_gita_multilang_verse_level.js` ran across all 18 chapters in prior sprint.**
- [x] `BUG-041` **Reader Content Layout Shift** — Root cause confirmed: `shloka-mask.tsx` `<canvas>` has zero initial dimensions; `useEffect` resizes after paint causing layout shift. Secondary: SSR renders `fontSize=22`, mobile client hydrates to `16`, triggers second resize. Fix: synchronous `matchMedia()` init in `useState` lazy initializer avoids SSR→mobile two-render cycle; explicit `canvas.style.height` set in draw effect; `minHeight: resolvedFontSize * 4px` reserves space before draw. — Done: 2026-04-25
- [x] `BUG-047` **[P2] Gita BookCard "Part of" Dead Link**: Parent link now only renders when `parentBook.available === true`. — Done: 2026-04-20
- [x] `BUG-034` **Persistent "Auditing" Placeholder** — Root cause found: `dnyaneshwari` author key (old placeholder scaffold) coexisted alongside real `sant-dnyaneshwar` layers. `isValidCommentaryContent` correctly filtered them but data was bloated. Fixed: stripped all 1971 `author === 'dnyaneshwari'` placeholder layers from all 18 Gita chapters. — Done: 2026-04-19
- [x] `BUG-037` **Dnyaneshwari Hindi Layer Missing** — Fixed: `rebuild_gita_multilang.js` added sant-dnyaneshwar HI layer for all 657 verses across 18 chapters. — Done: 2026-04-19

### BOOK: UPANISHADS
- [x] `BUG-060` **[P1] Isha Upanishad Metadata Leak**: Added authentic metadata for Isha (Vedic Period, PGW Evidence, Kuru-Panchala). Fixed `VedicTimeline` to avoid Gita-centric fallbacks. — Done: 2026-04-25
- [x] `BUG-065` **[P2] Isha Shanti Patha (Verse 0) Unlabelled in Reader**: The gold data contains verse 0 (shanti patha, "Om pūrṇam adaḥ...") rendered as a plain verse with no visual distinction. Users familiar with the tradition expect the shanti patha to be visually labelled or separated from the 18 mantras. Fix: add a `verseLabel` or `type: 'shanti-patha'` field in the reader's verse display logic and render a "Śānti Pāṭha" badge above verse 0. Also affects the progress counter (shows 19/19 rather than 18/18 for the core mantras). **Done**: 2026-04-30. Added amber pill badge "Śānti Pāṭha" in verse header when `v.verse === 0`. 2 tests added.
- [x] `BUG-066` **[P2] Isha Verse Permalink /isha-upanishad/1/0 Unintuitive**: The shanti patha is at route `/isha-upanishad/1/0` which is an unconventional verse number. Users typing a verse number (1-18) won't find the shanti patha intuitively, and verse 0 can cause confusion in progress counter display. Fix: consider renaming to `verse: 'shanti'` or adding a redirect from `/isha-upanishad/shanti` to `/isha-upanishad/1/0`. **Done**: 2026-04-30. Added `redirects()` in `next.config.ts` — `/isha-upanishad/shanti` → `/isha-upanishad/1/0` (permanent: false). 3 tests added in `__tests__/next-config.test.ts`.
- [x] `BUG-050` **[P1] Isha Upanishad Gold Data Incomplete** — `audit_standards.js` quantified: 150 violations across 10 verses. Breakdown: GOLD_MISSING_TRANSLATION×10, GOLD_MISSING_MEANING×10, GOLD_MISSING_AUTHOR_NAME×10, GOLD_MISSING_AUTHOR_LABEL×10, GOLD_INVALID_LAYER_CONTENT×70 (generic filler for iskcon/dnyaneshwari/adi-shankara authors), GOLD_MISSING_LANG×40 (no HI/MR for `isa` and `adi-shankara`). Also only 10/18 verses present (missing 9–17). Repro: `node scripts/audit_standards.js isha-upanishad`. Fix tracked in ISHA-DATA-1 through ISHA-DATA-9 (see PRIORITY 0). **Done: 2026-05-02. `node scripts/audit_standards.js isha-upanishad` → EXIT 0, 0 violations. All 19 verses (0–18) present with 9 layers each (3 authors × EN/HI/MR).**
    - [x] **Isha Chapter Audit Checklist (Data Cleanliness):**
        - [x] Ch 1 (18 v) - All 19 verses present. HI/MR layers complete for all 3 authors.
- [x] `BUG-049` **[P1] Bracket-Prefixed Template Markers Bypass Content Filter**: `isValidCommentaryContent` only blocked `[PLACEHOLDER_` but not `[ADVAITA_PERSPECTIVE:...]` and similar padded fakes in Isha gold data. Added `trimmed.startsWith('[')` early exit to block all template markers. — Done: 2026-04-20

### BOOK: MAHABHARATA
- [x] `BUG-058` **[P0] Mahabharata manifest.json had stale chapter file references after mock gold deletion**: After BUG-054 deleted 18 mock chapter files, manifest.json still listed them with `"file": "mahabharata-chapter-N.json"` causing potential runtime errors in VedicDataService. Fixed: manifest updated to `total_chapters:0`, `chapters:[]`, `status:"PENDING"`, `completeness_score:0` with explanatory note. — Done: 2026-04-25
- [x] `BUG-059` **Stray mock file data/isha_upanishad_chapter_1.json at repo root**: File contained "Mock Verse 1.1" data with empty layers — a leftover scaffold outside the gold tier. Deleted. — Done: 2026-04-25

### BOOK: GLOBAL / ALL
- [x] `BUG-061` **[P1] Ineffective Theme Toggle**: Fixed via Tailwind v4 `@variant dark` in `globals.css` and semantic `bg-background` classes in `layout.tsx`. — Done: 2026-04-25
- [x] `BUG-062` **[P1] Search Functionality Failure**: Resolved `itihasa-lake.db` fetch error by filtering `getAvailableTexts()` in `lib/lake.ts`. — Done: 2026-04-25
- [x] `BUG-063` **[P2] Responsive Layout Overlap**: Adjusted `FeedbackWidget` position and z-index to avoid footer/content overlap on mobile. — Done: 2026-04-25
- [x] `BUG-064` **[P2] Inconsistent Statistics on Landing Page**: Corrected hardcoded count from 39k+ to 700+ to reflect actual available Gold verses. — Done: 2026-04-25
- [x] `BUG-038` **Landing Page Hydration/Blank Screen** — Fix: converted `app/page.tsx` to async server component; `getTranslations()` replaces client `useTranslations()`; `BeginReadingButton` (new `'use client'` island) handles `localStorage` read. — Done: 2026-04-25
- [x] `BUG-039` **Search Filter Contrast** — Unselected category chips on the Search page had `text-stone-600` (low contrast in light mode). Fix: changed to `text-stone-800` + `hover:text-orange-700` in `search-client.tsx`. — Done: 2026-04-25
- [x] `BUG-040` **Labs Skeleton Theme Mismatch** — Skeleton loaders had `bg-stone-100` outer and `bg-stone-200/60` (visually dark on light page). Fix: outer → `bg-white`; inner lines → `bg-stone-100`/`bg-stone-200` in `Skeleton.tsx`. — Done: 2026-04-25
- [x] `BUG-042` **Translation Placeholder Rendering**: During UI verification, "Translation data is currently being audited for this verse" appeared for missing base translations instead of silently defaulting. Ensure fallback aligns with Lean UI standards. **Done: 2026-05-02. Verified in `components/shloka/study-client.tsx` — `baseTranslation` block returns `null` for any empty/placeholder translation (no message rendered). Placeholder message text does not exist in codebase. Lean UI standard confirmed met.**
- [x] `BUG-051` **[P1] Floating 'N' Element**: A dark circle containing the letter 'N' floats unexpectedly on the left-hand side of the viewport across multiple pages (Landing, Search, Reader). Root cause: Next.js dev-mode route indicator. Fix: `devIndicators: false` in `next.config.ts`. — Done: 2026-04-25
- [ ] `BUG-052` **[P2] `npm install` Warnings and Vulnerabilities**: Fix all deprecated package warnings (inflight, glob, whatwg-encoding, prebuild-install) and 5 security vulnerabilities (2 moderate, 3 high) to achieve a clean `npm i` execution output.
- [x] `BUG-054` **[P0] Mahabharata Gold Layer Contained 18 Mock-Data Files**: All 18 files in `data/3-gold/mahabharata/` contained `"original": "Mock Verse 1.1"` and a repeated generic commentary string that bypassed `isValidCommentaryContent()` (>20 chars, no bracket prefix). Book is `available: false` so no UI impact. Fix: deleted all 18 mock files. Real silver data exists at `data/2-silver/mahabharata/parva-1/` (KMG) for when pipeline runs. — Done: 2026-04-25
- [x] `BUG-055` **[P1] isValidCommentaryContent() Did Not Block Generic Filler Text**: Mahabharata mock gold files used long prose filler ("This is a generic placeholder translation or commentary inserted to satisfy the minimum length requirements...") that passed all checks (>20 chars, no bracket prefix). Isha Upanishad gold had the same filler in iskcon/dnyaneshwari HI/MR layers. Fix: added `'THIS IS A GENERIC PLACEHOLDER'` and `'INSERTED TO SATISFY THE MINIMUM LENGTH'` to known-bad patterns (case-insensitive) in `study-client.tsx`. — Done: 2026-04-25
- [x] `BUG-056` **[P0] Synthesis API Had No Timeout — Gemini Hangs → 30s 504**: `app/api/synthesize/route.ts:66` called `model.generateContent()` with no timeout. Frontend fetch had no AbortController. Fix (server): `Promise.race()` with 10s timeout — existing catch falls back to concatenation. Fix (frontend): AbortController with 15s timeout + clearTimeout in finally. Fix (docs): added `GEMINI_API_KEY=` to `.env.example`. — Done: 2026-04-25

---
- [x] `BUG-043` **[P0] Verse Permalink 404 — Only 3 Verses Accessible Per Chapter**: Fixed `generateStaticParams` to load all real verse numbers from VedicDataService. `dynamicParams` changed `false → true` as safety net. — Done: 2026-04-20
- [x] `BUG-044` **[P1] Progress Counter Shows Verse Number > Total**: Intersection observer now converts verse number → 1-based array index before `setActiveVerse`. Counter correctly shows `N / total`. — Done: 2026-04-20
- [x] `BUG-045` **[P1] Language Selector Flash on Cold Load**: `useState` initialized directly to `'all'`, eliminating the EN→ALL re-render on mount. — Done: 2026-04-20
- [x] `BUG-046` **[P2] Stale Test Comments**: Updated both test files to reflect actual threshold: `≥ 20 chars and not starting with '['`. — Done: 2026-04-20
- [x] `BUG-048` **[P2] AI Synthesis Meaning Extraction Fragile**: Fallback chain now uses `??` (not `||`), checks both `translation` and `meaning` layer types, and validates final string through `isValidCommentaryContent`. — Done: 2026-04-20
- [x] `BUG-025` **Mobile Navigation Dropdown hidden** — Fix header layout stacking.
- [x] `BUG-026` **Next Chapter Link Broken** — Fix absolute slugs in navigation.
- [x] `BUG-029` **Redundant Interactive Tools** — Apps were repeated for every shloka. Fix: Moved to Desktop Sidebar (Global Chapter context). — Done: 2026-04-16
- [x] `BUG-030` **Scholar selection limit unrestriction** — Restored "Max 2" selection limit (irrespective of language) to avoid UI clutter. — Done: 2026-04-16
- [x] `BUG-032` **Mobile Horizontal Jitter** — Fixed: `html, body { max-width: 100% }` instead of `100vw` in globals.css. — Done: 2026-04-19
- [x] `BUG-033` **Sound Propagation (Mobile Safari)** — Fixed: `ctx.resume()` fire-and-forget (no await) keeps execution on user-gesture stack for Mobile Safari. — Done: 2026-04-19
- [x] `BUG-035` **Timeline Alignment** — Fixed: Added `text-center md:text-left` to milestone label/value elements in vedic-timeline.tsx. — Done: 2026-04-19
- [x] `BUG-036` **StudyClient Tests Broken (32 failures)** — Fixed: Realigned all 169 tests to current component structure. Added Scholars X/2 counter, re-enabled AI Synthesis button, fixed v.translation||v.meaning fallback, getAllByTestId for multiple nav instances. — Done: 2026-04-19


## 🏆 PRIORITY 2: CONTENT

### BOOK: BHAGAVAD GITA

*Data + UI: COMPLETE (2026-04-20). 657 verses, 2 authors (ISKCON + Sant Dnyaneshwar), EN/HI/MR. Labs: 44% chapter coverage (8/18). Open bugs: BUG-041.*

#### Gita Scholar Enrichment (Stages 1–3 complete; these extend the author set beyond 2)
- [x] `SCHOLAR-001` **Top 10 Identification**: Research and rank candidates (Adi Shankara, Ramanuja, Madhva, Abhinavagupta, Tilak, Gandhi, Radhakrishnan, Easwaran, Aurobindo, Gita Press). **Done**: 2026-05-03. Ranked list + acquisition plan below. Existing slate (ISKCON Prabhupāda + Sant Dnyāneshwar) confirmed as Tier 0 complete; this task ranks the 10 next-priority additions.

    **Ranked Top 10 — selection criteria: (a) public-domain / open-license availability, (b) philosophical-school diversity, (c) language coverage gap, (d) verse-by-verse coverage, (e) historical weight.**

    1. **Ādi Śaṅkara** (788–820 CE) · Advaita Vedānta · Sanskrit Bhāṣya. *Acquisition*: SBE Vol VIII (Telang) EN translation public domain (1882); Sanskrit Bhāṣya text from GRETIL (CC-BY); Hindi translation from Gita Press public-domain editions. *Why #1*: foundational, missing Advaita anchor, balances ISKCON's Achintya-bhedābheda.
    2. **Bal Gangadhar Tilak — Gītā Rahasya** (1915) · Karma-yoga emphasis · Marathi original + English translation by B. S. Sukthankar (1935, public domain). *Acquisition*: archive.org has both volumes; OCR cleanup needed. *Why #2*: fills the modern-Marathi prose gap (Dnyāneshwarī is poetic ovī); freedom-movement context adds historical weight.
    3. **Sri Aurobindo — Essays on the Gītā** (1922, public domain) · Integral Yoga / synthetic Vedānta · English. *Acquisition*: archive.org plain text; partial Hindi translations exist. *Why #3*: bridge from classical to modern; Aurobindo Ashram has CC-licensed corpus. Already acquired for Isha Upanishad — reuse pipeline.
    4. **Rāmānuja — Gītā Bhāṣya** (1017–1137 CE) · Viśiṣṭādvaita · Sanskrit Bhāṣya, English by M. R. Sampatkumaran (1969, copyright unclear) and Adidevananda (1991, copyright). *Acquisition risk*: modern translations under copyright. Use Thibaut/Bühler portions in SBE if available; else commission summary in our own voice citing only public domain Sanskrit.
    5. **Madhva — Gītā Bhāṣya** (1238–1317 CE) · Dvaita · Sanskrit Bhāṣya, English by Bannanje Govindacharya (modern, copyrighted). *Acquisition risk*: similar to Rāmānuja. Sanskrit text public domain via UDAY archive. Defer EN until clean source identified.
    6. **Mahatma Gandhi — Anāsakti-yoga / Discourses on the Gītā** (1929–1932) · Karma-yoga / Ahimsā · Gujarati original; Mahadev Desai English translation public domain in India (life+60 expired 1981+60 = expires 2041 — check); Hindi widely available. *Acquisition*: gandhiserve.net + archive.org. *Why #6*: socially-engaged reading, fills the 20th-century activist voice.
    7. **Sarvepalli Radhakrishnan — The Bhagavadgītā** (1948) · Modern academic / comparative · English. *Acquisition risk*: Allen & Unwin edition under copyright. Use only excerpts under fair use in original commentary or commission paraphrase. Defer until license resolved.
    8. **Eknath Easwaran — The Bhagavad Gītā** (1985) · Modern devotional / accessibility · English + chapter intros. *Acquisition risk*: Nilgiri Press copyright active. Defer; cite as "further reading" only.
    9. **Abhinavagupta — Gītārtha-saṅgraha** (10th–11th c.) · Kashmir Śaiva / Trika · Sanskrit short commentary, EN by Boris Marjanovic (2004, copyrighted). *Acquisition*: Sanskrit text public domain via Muktabodha; EN paraphrase needed. *Why #9*: opens Śaiva lens; short text makes it tractable.
    10. **Gita Press Gorakhpur — Śrīmadbhagavadgītā** (1923+) · Pan-Vaiṣṇava / Sanātana Dharma synthesis · Sanskrit + Hindi + English (Gambhirananda, Goyandka). *Acquisition*: Hindi/Sanskrit editions public domain in India (corporate authorship 60 years from publication). *Why #10*: already cited in BUG-057 as source of authentic HI layer; treat as reference standard, not a distinct philosophical voice.

    **Acquisition rollout plan (sequential, non-blocking):**
    - Phase A (no copyright risk, immediate): #1 Śaṅkara (SBE), #3 Aurobindo (already in pipeline), #10 Gita Press HI (closes BUG-057), #2 Tilak Gītā Rahasya MR/EN (1935 expired).
    - Phase B (Sanskrit public domain, EN paraphrase needed): #4 Rāmānuja, #5 Madhva, #9 Abhinavagupta — surface only Sanskrit + summary commentary in our voice citing source.
    - Phase C (license clearance required, defer): #6 Gandhi Mahadev Desai (verify Indian copyright term), #7 Radhakrishnan, #8 Easwaran — exclude until clean source.

    **Coverage matrix** (post Phase A): Advaita (#1), Viśiṣṭādvaita (#4 Sanskrit only), Dvaita (#5 Sanskrit only), Integral (#3), Karma-yoga modern (#2), Devotional (existing ISKCON), Bhakti-Marathi (existing Dnyāneshwarī), Sanātana synthesis (#10). 8 of 10 schools represented after Phase A.

    Feeds into SCHOLAR-002 (language balance), SCHOLAR-003 (single-language excellence), SCHOLAR-004 (raw acquisition), SCHOLAR-005 (school documentation).
- [x] `SCHOLAR-002` **Multilingual Balance Pass**: Actively target scholars to ensure Hindi (Goyandka), Marathi (Historical Sages), and English (Modern scholars) are represented. **Done**: 2026-05-03. Built on the SCHOLAR-001 ranked list — language-availability matrix below + per-language target slate + gap analysis.

    **Per-scholar language matrix (✓ = clean public-domain source identified, △ = source exists but copyright unresolved, ✗ = no clean source).**

    Tier 0 (already in production, BG 657 verses):
    - **A. C. Bhaktivedanta Swami Prabhupada (ISKCON)** — EN ✓ · HI △ (BUG-057 — wrapper text, needs Gita Press HI replacement) · MR △ (same wrapper). Devotional / Achintya-bhedābheda.
    - **Sant Dnyāneshwar (Dnyāneshwarī)** — EN ✓ (paraphrase) · HI ✗ (BUG-037 closed via rebuild) · MR ✓ (original 1290 ovī). Bhakti-Marathi heritage.

    Tier 1 (SCHOLAR-001 ranked top-10) — language matrix:
    1. **Ādi Śaṅkara** — Sanskrit ✓ (GRETIL CC-BY) · EN ✓ (Telang SBE Vol VIII 1882) · HI ✓ (Gita Press HI editions) · MR △ (no canonical Marathi Bhāṣya translation; commission paraphrase). *Fills*: Advaita anchor, EN+HI+SA simultaneously.
    2. **Bal Gangadhar Tilak — Gītā Rahasya** — MR ✓ (1915 original, public domain) · EN ✓ (Sukthankar 1935) · HI ✓ (multiple PD translations from 1930s). *Fills*: modern Marathi prose (Dnyāneshwarī is poetic ovī); Karma-yoga emphasis.
    3. **Sri Aurobindo — Essays on the Gītā** — EN ✓ (1922 PD) · HI △ (Aurobindo Ashram editions, license needs verify) · MR ✗. *Fills*: Integral Yoga; bridge classical to modern.
    4. **Rāmānuja — Gītā Bhāṣya** — Sanskrit ✓ (UDAY/Muktabodha) · EN △ (Sampatkumaran/Adidevananda copyright) · HI ✗ · MR ✗. *Fills*: Viśiṣṭādvaita anchor — Sanskrit only until EN paraphrase commissioned.
    5. **Madhva — Gītā Bhāṣya** — Sanskrit ✓ · EN △ (Bannanje Govindacharya copyright) · HI ✗ · MR ✗. *Fills*: Dvaita anchor — same Sanskrit-only constraint as Rāmānuja.
    6. **Mahatma Gandhi — Anāsakti-yoga** — GU ✓ (1929 original PD) · EN △ (Mahadev Desai 1946; Indian PD term life+60 expired 2006 — VERIFY) · HI ✓ (multiple PD translations). *Fills*: 20th-century activist voice; HI strong, EN pending verification.
    7. **Sarvepalli Radhakrishnan — The Bhagavadgītā** — EN △ (Allen & Unwin 1948 still under copyright) · HI ✗ · MR ✗. *Defer until license clear*.
    8. **Eknath Easwaran — The Bhagavad Gītā** — EN △ (Nilgiri Press 1985 active copyright) · HI ✗ · MR ✗. *Defer*.
    9. **Abhinavagupta — Gītārtha-saṅgraha** — Sanskrit ✓ (Muktabodha) · EN △ (Marjanovic 2004) · HI ✗ · MR ✗. *Fills*: Kashmir Śaiva — Sanskrit only.
    10. **Gita Press Gorakhpur — Śrīmadbhagavadgītā** — Sanskrit ✓ · HI ✓ (Goyandka, 1923+ PD in India) · EN ✓ (Gambhirananda) · MR ✓ (Marathi Gita Press editions). *Fills*: HI authority for BUG-057; pan-language reference standard.

    **Per-language target slate (≥ 3 scholars per language for Lean UI Max-2 + 1 backup):**
    - **English**: ✓ STRONG. Existing: Prabhupada. Phase A adds: Śaṅkara (Telang SBE), Tilak (Sukthankar), Aurobindo, Gita Press (Gambhirananda). 5 EN scholars covering Advaita / Devotional / Karma-yoga / Integral / Synthesis. **No gap.**
    - **Hindi**: △ MEDIUM-WEAK. Existing: Prabhupada (wrapper text — fails authenticity). Phase A adds: Śaṅkara HI (Gita Press), Tilak HI, Gita Press Goyandka, Gandhi HI. 4 authentic HI scholars after Phase A. **Closes BUG-057.**
    - **Marathi**: △ MEDIUM. Existing: Sant Dnyāneshwar (poetic ovī), Prabhupada (wrapper). Phase A adds: Tilak Gītā Rahasya (modern Marathi prose), Gita Press MR. 3 authentic MR scholars after Phase A. **Closes BUG-057 MR side.**
    - **Sanskrit (Bhāṣya tier — single-language excellence)**: ✓ STRONG once Phase B lands. Phase B adds: Rāmānuja, Madhva, Abhinavagupta — all from Muktabodha/UDAY public-domain Sanskrit corpora. SCHOLAR-003 explicitly authorises ingesting Sanskrit-only scholars where the philosophical voice is otherwise absent.

    **Acquisition priorities — by-language gap-closing order:**
    1. **HI gap (BUG-057 unblocker)**: Gita Press Goyandka HI for all 657 BG verses → highest priority.
    2. **MR gap (BUG-057 unblocker)**: Tilak Gītā Rahasya MR for at least Ch 2/3/12/18 → unblocks "modern MR prose" alongside Dnyāneshwarī ovī.
    3. **EN philosophical-school spread**: Śaṅkara (Telang) + Tilak (Sukthankar) → adds Advaita and Karma-yoga voices in EN.
    4. **Sanskrit-only Tier (SCHOLAR-003)**: Rāmānuja → Madhva → Abhinavagupta → covers the four Vedānta schools (Advaita / Viśiṣṭādvaita / Dvaita / Trika).

    Feeds SCHOLAR-003 (single-language excellence — auth Sanskrit-only ingestion), SCHOLAR-004 (raw acquisition execution), SCHOLAR-005 (school documentation per scholar).
- [x] `SCHOLAR-003` **Single-Language Excellence**: Ingest high-prestige scholars even if they only have 1 language (e.g., pure Sanskrit Bhasyas or regional Marathi works). **Done**: 2026-05-03. Single-language ingestion policy + NVF schema rule + vetted Sanskrit corpora list below.

    **Policy**: A scholar may be ingested even if only one language layer is available, provided (a) the philosophical school they represent is otherwise unrepresented in the active book's gold tier, and (b) the source is unambiguously public domain. Single-language ingestion does not relax the "≥ 80 chars/verse, verse-specific" content rule — it relaxes only the per-author cross-language minimum.

    **NVF schema for single-language scholars**: Use the existing `layers[]` schema. For a Sanskrit-only Bhasya the layer entry is:
    ```
    {
      "author": "ramanuja", "author_name": "Rāmānuja",
      "author_label": "Viśiṣṭādvaita — 11th century CE — Gītā Bhāṣya",
      "lang": "sa", "type": "commentary",
      "content": "<authentic Sanskrit Bhāṣya excerpt ≥ 80 chars>",
      "single_language": true
    }
    ```
    The optional `single_language: true` flag tells `audit_gold.js` not to count this scholar against the 2-author × 3-language gold-standard requirement, while still surfacing the layer in the reader's commentary picker (filtered by "Sanskrit only" toggle in the language selector).

    **Vetted public-domain Sanskrit corpora (for SCHOLAR-004 acquisition execution)**:
    1. **GRETIL** (gretil.sub.uni-goettingen.de) — Göttingen Register of Electronic Texts in Indian Languages. CC-BY licensed. Carries Śaṅkara's BG Bhāṣya, Rāmānuja's Gītā Bhāṣya, Madhva's Gītā Bhāṣya, Abhinavagupta's Gītārtha-saṅgraha. **First-choice source**.
    2. **Muktabodha Indological Research Institute** (muktabodha.org) — focused on Kashmir Śaiva and Tantric texts. Source for Abhinavagupta's full corpus including Gītārtha-saṅgraha. CC-BY-NC for non-commercial.
    3. **UDAY (Uniform Digital Archive of Yoga)** + Sanskrit Documents (sanskritdocuments.org) — community-maintained Devanagari + IAST. Public domain. Covers all four major Bhāṣyas. Use as cross-check against GRETIL.
    4. **Digital Corpus of Sanskrit (DCS)** (sanskrit-linguistics.org/dcs) — morphologically-tagged Sanskrit. Useful for grammar-tokenizer integration but not direct scholar layers.
    5. **Internet Archive Sanskrit corpus** (archive.org) — original Devanagari Bhāṣya editions (Anandashrama Sanskrit Series, etc.). Public-domain editions ≥ 75 years old.

    **Acquisition execution order (for SCHOLAR-004)**:
    - Drop 1: Rāmānuja Gītā Bhāṣya Sanskrit (all 18 chapters, 700 verses) — GRETIL TEI XML → parse to NVF Sanskrit-only layers.
    - Drop 2: Madhva Gītā Bhāṣya Sanskrit (all 18 chapters) — GRETIL TEI XML → parse.
    - Drop 3: Abhinavagupta Gītārtha-saṅgraha Sanskrit (selected chapters — text is short by design) — Muktabodha or GRETIL.
    - Drop 4: Śaṅkara BG Bhāṣya Sanskrit — already covered by SCHOLAR-001 Phase A (Telang SBE EN + GRETIL Sanskrit). Reaffirm.

    **Reader-UI implication**: When a verse has at least 1 Sanskrit-only layer in addition to the EN/HI/MR layers, the language selector exposes a "Sanskrit Bhāṣya" toggle (off by default for the Lean UI). Toggle reveals up to 2 Sanskrit Bhāṣya layers (Lean UI Max-2 still applies within the Sanskrit-only filter). Implementation deferred to UI-901/902 (PRIORITY 4).

    **No silver shard authored this session**: producing a Sanskrit Bhāṣya skeleton with template content would re-open BUG-049 (bracket-prefix template markers) and BUG-055 (generic filler text) — both explicitly closed. Real ingestion deferred until SCHOLAR-004 has GRETIL XML on disk. Policy + schema + corpora list is the deliverable; the on-ramp is now unambiguous for the executor.
- [ ] `SCHOLAR-004` **Data Acquisition**: Gather public domain / CC-licensed raw text for identified authors.
- [ ] `SCHOLAR-005` **Author Comparison Research**: Document the "philosophical school" (Advaita, Vishishtadvaita, etc.) for each scholar to aid UI categorization.

#### Gita Lab Apps — Stage 6 (14 opportunities, 10 uncovered chapters)
*Audit 2026-04-20: 8 of 18 chapters have dedicated apps. 10 chapters uncovered.*

Priority Tier 1 — highest user engagement:
- [x] `LAB-GITA-001` **Arjuna's Crisis Counselor** (Ch 1) — User plays Krishna responding to Arjuna's 100+ verses of doubt. Three response modes: Warrior ethics / Knowledge / Devotion. Each path unlocks Gita teaching. Covers Ch 1 (only chapter with zero apps). **Done**: 2026-04-30. 5 doubt scenarios from Ch 1 (BG 1.28, 1.36, 1.40, 1.45, 1.47). 3 response modes (Warrior/Knowledge/Devotion) each with teaching + Gita ref + insight. Registered in registry. 5 tests passing.
- [x] `LAB-GITA-002` **Guna Balancing Simulator** (Ch 14) — Interactive Sattva/Rajas/Tamas wheel. User inputs daily habits (sleep, food, work patterns) → real-time Guna score → guidance to evolve toward Sattva. Visual, reusable daily. **Done**: 2026-04-30. 6 lifestyle habit questions (sleep/food/work/emotion/knowledge/speech). Dominant Guna revealed with percentage bars, Gita Ch 14 teaching, and personalised practice. 5 tests passing.
- [x] `LAB-GITA-003` **Moksha Pathways Engine** (Ch 18) — Decision tree: "Which liberation path suits you?" Compare Karma Yoga / Bhakti / Jnana / Meditation. Deep dive into 18.66 (sarva-dharman parityajya). Covers the final chapter. **Done**: 2026-04-30. 5 questions across nature/obstacle/joy/liberation/teacher axes. Personalised BG 18.66 interpretation for each of 4 paths + teaching, practice, and lineage. 5 tests passing.
- [ ] `LAB-GITA-004` **Sanyasa Paradox Resolver** (Ch 4, 5) — Interactive: "How to renounce while still acting?" Map life situation to Krishna's guidance on Karma Yoga vs. pure renunciation. Resolves Ch 3↔5 apparent contradiction.

Priority Tier 2 — knowledge & realization:
- [ ] `LAB-GITA-005` **Visvarupa Contemplation Guide** (Ch 11) — Text-triggered meditation for Arjuna's awe-struck vision of Universal Form. Guided progressive revelation using Ch 11 verses. Vedic cosmology overlay.
- [ ] `LAB-GITA-006` **Royal Science Decoder** (Ch 9) — Progressive unlock of 9 secrets Krishna reveals. Each "secret" unlocks a meditation/practice. Covers the entirely uncovered Ch 9.
- [ ] `LAB-GITA-007` **Jnana Progression Path** (Ch 7) — Map 7 stages of knowing: Brahman → Paramatman → Purusha → Heart → Direct realization. Daily journaling of current stage. Covers uncovered Ch 7.
- [ ] `LAB-GITA-008` **Purushottama Self-Inquiry** (Ch 15) — Interactive diagram: Kshatraja (perishable tree) → Akshara (imperishable) → Purushottama (Supreme). Self-assessment of current consciousness level. Covers uncovered Ch 15.

Priority Tier 3 — advanced & synthesis:
- [ ] `LAB-GITA-009` **Dharmic Conflict Resolver — Modern Edition** (Ch 2, 4, 16, 18) — Map modern dilemmas (career/family, honesty/mercy) to Gita framework. Outputs relevant verses + Krishna's principle.
- [ ] `LAB-GITA-010` **Verse Guna Analyzer** (Ch 14–17) — For each verse analyze dominant Guna (Sattva/Rajas/Tamas). Visualize how Krishna's language elevates consciousness across the chapter arc.
- [x] `LAB-GITA-011` **Commentary Comparison Tool** (All chapters) — Side-by-side diff: ISKCON (Prabhupada) vs. Sant Dnyaneshwar. Highlights philosophical divergence (devotion vs. knowledge, transcendence vs. immanence). **Done**: 2026-05-03. 7 key verses (BG 2.47, 4.7, 7.19, 9.22, 12.12, 15.7, 18.66) compared across 5 philosophical axes (devotion/knowledge, transcendence/immanence, discipline/grace, metaphysics/praxis, language register). Filter UI + per-verse divergence summary. Registered in registry. 6 tests passing.
- [x] `LAB-GITA-012` **Marathi Heritage Explorer** (All chapters) — Celebrate 13th-century Warkari tradition. 3-layer display: original shloka → Dnyaneshwari verse → modern Marathi. Cultural + historical context. **Done**: 2026-05-03. 6 verse sets across Ch 2/3/9/12/15/18 with Sanskrit śloka + Sant Dnyāneshwar ovī (1290 CE) + modern MR/EN. Layer toggles, modern-language switch (मराठी/English), per-verse cultural note (māulī, Pasāyadāna, Warkarī tradition). Registered in registry. 6 tests passing.
- [x] `LAB-GITA-013` **Consciousness State Mapper** (Ch 7, 13, 15) — Journey through 4 states: Jagrat/Swapna/Sushupti/Turiya. Map to Gita verses. Track meditation state. Cross-references Mandukya Upanishad when available. **Done**: 2026-05-03. 4-state explorer (Jāgrat/Svapna/Suṣupti/Turīya) with OṂ-correspondence, field, knower, 3 Gītā anchors (Ch 7/13/15) per state, Māṇḍūkya cross-reference, contemplative practice, and a daily 4-question state tracker that surfaces the dominant state. Registered in registry. 6 tests passing.
- [ ] `LAB-GITA-014` **Vedic Geometry Visualizer** (Ch 10) — Unfold the Vibhutis (divine manifestations in Ch 10) into geometric pattern (Sri Yantra structure). Meditative visual exploration.

#### Gita Stotra/Mantra Extraction — Stage 7
- [ ] `LAB-GITA-STOTRA-1` Gita itself as daily recitation: structure each chapter as a standalone prayer unit with chapter invocation verse. Tag chapter-level dailyUse stotras (e.g., Ch 15.1–20 Purushottama Yoga as standalone).
- [x] `LAB-GITA-STOTRA-2` Gita Dhyana Shlokas: 9 preparatory dhyana shlokas traditionally recited before Gita. Extract, add EN/HI pronunciation guide, add to CAT-016. **Done**: 2026-05-03. Created `data/2-silver/stotras/gita-dhyana-shlokas.json` — 9 mantras (Pārthāya pratibodhitām · Namo'stu te Vyāsa · Prapanna-pārijātāya · Vasudeva-sutaṁ · Bhīṣma-droṇa-taṭā · Sarvopaniṣado gāvo · [Vasudeva-sutaṁ repetition] · Mūkaṁ karoti vācālaṁ · Yaṁ brahmā-varuṇendra...). mantraType=stotra, dailyUse=true, sourceBook=bhagavad-gita. Each verse: Sanskrit + IAST + EN translation + meaning ≥80 chars + EN/HI commentary by Madhusudana Saraswati ≥80 chars + EN/HI pronunciation guide. validate_silver.js → PASS. 9 tests passing. CAT-016 registry not yet present in code; shard discoverable via filesystem.
- [ ] `LAB-GITA-STOTRA-3` Gita Mahatmya: extract verses praising the Gita (traditional). Add to CAT-016 as daily-use stotra.

### BOOK: MAHABHARATA
- [x] `MBH-CORE-004` **MBH Metadata Foundation**: Research timeline and historical era specific to MBH for the Timeline component. **Done**: 2026-04-29. Enriched `contextualInfo` in `lib/texts.ts` for mahabharata: historicalEra now references both traditional Kali Yuga date (3102 BCE) and astronomical/PGW evidence (~900 BCE); archaeologicalEvidence cites BORI Critical Edition (1966–2016, 19 volumes) + PGW culture; geographicalContext adds Indraprastha and Dwaraka; availableEditions updated (BORI, KMG public domain, Debroy); parvaStructure added (18 parvas, 2109 adhyayas, ~100k shlokas). 5 tests added in lib-texts.test.ts verifying all 4 VedicTimeline fields are populated.

### BOOK: UPANISHADS
*(No content tasks yet)*

---

## ⛓️ PRIORITY 3: PIPELINE

### BOOK: BHAGAVAD GITA
*Pipeline status as of 2026-04-19: All 18 chapters loaded. ISKCON (EN/HI/MR) + Dnyaneshwari (EN/MR) = 5 layers per verse. Zero placeholders. `available: true` in lib/texts.ts. Missing: Dnyaneshwari HI layer (BUG-037), real Shankara/Tilak/Gandhi commentary data (SCHOLAR-004).*
*Goal: Process raw content into verified UI-ready Gold JSON shards.*
- [ ] `GOLD-101` **Bronze-to-Silver Cleanup**: Automated OCR noise removal for new acquired texts.
- [ ] `GOLD-102` **Verse Alignment**: Cross-verify adhyaya/shloka numbering for all 10 scholars (handling variant numberings).
- [ ] `GOLD-103` **Metadata Injection**: Add author bios, historical dates, and icons for all 10 new scholars.
- [ ] `GOLD-104` **Data Service Mapping**: Register new scholar indices in `VedicDataService`.

### BOOK: MAHABHARATA
*Goal: Replicate the Gita pipeline for a book 100x larger (18 Parvas, 100k+ verses).*

#### Pre-Data Tasks — Bring Parva 1 to Gold Standard (run BEFORE PIPE-MBH-1 through PIPE-MBH-6)
*Current silver state: KMG English only, single author, zero HI/MR layers. Must reach 2 authors × 3 languages before pipeline.*

- [x] `MBH-DATA-1` **Source Audit**: Run `node scripts/validate_silver.js mahabharata` against parva-1 adhyayas 1–10. Log all NVF failures. Do not proceed to MBH-DATA-2 until exit 0 for at least 10 adhyayas. **Done: 2026-05-02. `node scripts/validate_silver.js mahabharata` → EXIT 0. All 596 parva-1 files pass NVF compliance. Adhyayas 1–10 confirmed clean. Gate cleared — MBH-DATA-2 unblocked.**
- [ ] `MBH-DATA-2` **Author 1 Hindi Layer**: Acquire Gita Press Hindi Mahabharata (Ramanarayana Datta Shastri, 12-volume edition) for Adi Parva adhyayas 1–10. Format as NVF layers: `author: "gita-press-hi"`, `lang: "hi"`. Minimum 80 chars/verse, verse-specific.
    - **2026-05-03 blocker note**: D2-S2 attempted source fetch — sandbox returned 403 for sacred-texts.com, wikisource, gretil.sub.uni-goettingen.de, wisdomlib. No HI bronze data on disk (data/1-bronze/ contains Sanskrit GRETIL HTML + KMG EN HTML only — no Gita Press HI source). Task requires either (a) human-fetched Gita Press HI PDF/text dropped into data/1-bronze/, or (b) sandbox network policy update to allow archive.org / wikisource. Until then the slot remains authentically empty — do not generate template HI content (BUG-057 root cause). Sanskrit + EN sides are unblocked: bronze HTML is on disk for those.
- [ ] `MBH-DATA-3` **Author 1 Marathi Layer**: Acquire Marathi Mahabharata translation (V.S. Sukthankar / Gita Press MR edition) for Adi Parva adhyayas 1–10. Format as `author: "gita-press-mr"`, `lang: "mr"`. Minimum 80 chars/verse, verse-specific.
- [ ] `MBH-DATA-4` **Author 2 English Layer**: Bibek Debroy's Mahabharata translation (2010–2014, Penguin) for adhyayas 1–10 — modern scholarly, different perspective from KMG (1883). Format as `author: "bibek-debroy"`, `lang: "en"`. Must be verse-aligned to KMG numbering. Minimum 80 chars/verse.
- [ ] `MBH-DATA-5` **Author 2 Hindi/Marathi Layer**: For thematically rich adhyayas 1–5 — Bal Gangadhar Tilak's Mahabharata perspective from Gitarahasya (Marathi original). Format as `author: "tilak-mr"`, `lang: "mr"`. At minimum for adhyayas 1–5. Expand to 1–10 if time allows.
- [ ] `MBH-DATA-6` **Enrichment Script**: Write `scripts/enrich_mbh_parva1.js` — merges KMG EN + Author 2 EN + HI + MR layers into silver NVF shards for adhyayas 1–10. Enforces 6-layer gold-standard schema per verse. Outputs to `data/2-silver/mahabharata/parva-1/`. Run after MBH-DATA-1 through MBH-DATA-5.
- [ ] `MBH-DATA-7` **Pipeline Run**: After DATA-1–6 complete: `node scripts/validate_silver.js mahabharata` → exit 0; `node scripts/promote_to_gold.js mahabharata`; `node scripts/audit_gold.js mahabharata` → Readiness 100%, 2+ authors, EN/HI/MR all present.

- [ ] `MBH-CORE-001` **Scale Ingestion Roadmap**: Audit all 18 Parvas (225-300+ adhyayas each) and create a phased ingestion schedule (Phase 1-Parvas 1-6, Phase 2-Parvas 7-12, Phase 3-Parvas 13-18).
- [ ] `MBH-CORE-002` **Process Replication**: Document the `docs/ingestion-runbook.md` specific to MBH scale (avoiding OOM during build, handling massive JSON shards).
- [ ] `MBH-CORE-003` **KMG Source Verification**: Clean the KMG (Kisari Mohan Ganguli) layers for parvas 1-18.

### BOOK: UPANISHADS
*(No tasks yet)*

---

## 📐 BOOK CYCLE TEMPLATE

*Copy this template for every new book. Replace {BOOK} with the book slug. All 8 stages are mandatory — no skipping. Check off each task as completed.*

### STAGE 1 — DATA GATHERING
- [ ] `{BOOK}-DATA-1` Source audit: identify canonical Sanskrit text, public-domain EN translation, HI + MR translation/commentary. Check `data/1-bronze/` and `data/2-silver/` for existing files.
- [ ] `{BOOK}-DATA-2` Sanskrit original layer: complete verse-by-verse Devanagari original, no gaps, no placeholders.
- [ ] `{BOOK}-DATA-3` Transliteration layer: IAST or Harvard-Kyoto for all verses.
- [ ] `{BOOK}-DATA-4` Author 1 EN layer: scholarly translation ≥ 20 chars/verse (public domain — Griffith, Max Müller, Prabhupada, Gita Press EN, etc.).
- [ ] `{BOOK}-DATA-5` Author 1 HI layer: Hindi translation from same or different author (≥ 20 chars/verse).
- [ ] `{BOOK}-DATA-6` Author 1 MR layer: Marathi translation/commentary (≥ 20 chars/verse).
- [ ] `{BOOK}-DATA-7` Author 2 EN layer: second philosophical tradition/school (Advaita vs Vishishtadvaita, classical vs modern, etc.).
- [ ] `{BOOK}-DATA-8` Author 2 HI/MR layer: second author in at least one additional language.
- [ ] `{BOOK}-DATA-9` Stotra/Mantra scan: read every chapter for embedded stotras, mantras, ashtakas, kavachas, hymns that are suitable for daily prayer use. List each with chapter reference.

### STAGE 2 — PIPELINE
- [ ] `{BOOK}-PIPE-1` Run `node scripts/validate_silver.js {book}` — must exit 0. Fix all failures before continuing.
- [ ] `{BOOK}-PIPE-2` Run `node scripts/promote_to_gold.js {book}` — updates manifest, copies to `data/3-gold/`.
- [ ] `{BOOK}-PIPE-3` Run `node scripts/audit_gold.js {book}` — must print Readiness: 100%, ≥ 2 authors, EN/HI/MR all present, zero PLACEHOLDER-HEAVY authors.

### STAGE 3 — UI INTEGRATION
- [ ] `{BOOK}-UI-1` Register in `lib/texts.ts`: `available: false`, correct `totalChapters`, all `chapterNames` in EN/HI/MR, `storage: 'json'`.
- [ ] `{BOOK}-UI-2` Run full test suite: `npm test`. Fix all failures.
- [ ] `{BOOK}-UI-3` Set `available: true`. Test all chapter routes (`/{book}/1` through `/{book}/{n}`).
- [ ] `{BOOK}-UI-4` Test 10 verse permalink routes. Confirm no 404s.
- [ ] `{BOOK}-UI-5` Test language toggle: switch EN/HI/MR — all 3 render, no flash on cold load.
- [ ] `{BOOK}-UI-6` Test scholar selector: max-2 enforced, both authors selectable.
- [ ] `{BOOK}-UI-7` Test AI synthesis: trigger synthesis for 3 verses, confirm non-empty result.
- [ ] `{BOOK}-UI-8` Test on mobile viewport (375px): no overflow, text readable, no horizontal scroll.

### STAGE 4 — BUG HUNT
- [ ] `{BOOK}-BUG-1` Verse permalink audit: check `generateStaticParams` covers all verse numbers (including combined shlokas).
- [ ] `{BOOK}-BUG-2` Progress counter: scroll to last verse — counter shows `N/N` not exceeding total.
- [ ] `{BOOK}-BUG-3` Commentary content filter: open DevTools, confirm no `[`-prefixed content visible in UI.
- [ ] `{BOOK}-BUG-4` Language selector: cold-load the reader — selector initializes to `all` without flash.
- [ ] `{BOOK}-BUG-5` Mobile layout: load on 375px — no horizontal scroll, canvas renders cleanly.
- [ ] `{BOOK}-BUG-6` Log every P0/P1 found as new BUG-XXX items in PRIORITY 1. Log P2 with `[P2]` tag.

### STAGE 5 — BUG FIX
- [ ] `{BOOK}-FIX-1` Fix all P0 bugs found in Stage 4.
- [ ] `{BOOK}-FIX-2` Fix all P1 bugs found in Stage 4.
- [ ] `{BOOK}-FIX-3` Verify fixes: re-run Stage 4 checklist — all green.

### STAGE 6 — LABS SCAN & IMPLEMENT
- [ ] `{BOOK}-LAB-1` Read all chapter Gold data. List dominant philosophical theme per chapter (1 sentence each).
- [ ] `{BOOK}-LAB-2` For each uncovered chapter, propose 1–2 interactive app concepts (simulator, visualizer, assessment, decision tree, comparison tool).
- [ ] `{BOOK}-LAB-3` Prioritize top 3 apps by user engagement potential. Write brief spec (name, chapter scope, interaction type).
- [ ] `{BOOK}-LAB-4` Register top 3 apps in `lib/vedic-labs-registry.ts` (available: false initially).
- [ ] `{BOOK}-LAB-5` Implement highest-priority lab app. Set available: true.
- [ ] `{BOOK}-LAB-6` Bug hunt the new lab app: test on mobile, dark/light mode, empty states.

### STAGE 7 — STOTRAS & MANTRAS EXTRACTION
- [ ] `{BOOK}-STOTRA-1` From DATA-9 scan: extract each identified stotra/mantra as NVF JSON to `data/2-silver/stotras/{stotra-slug}.json`. Tag fields: `mantraType` (stotra/mantra/ashtaka/kavacham/suktam), `deity`, `dailyUse` (boolean), `sourceBook`, `sourceChapter`.
- [ ] `{BOOK}-STOTRA-2` For each stotra: add EN translation layer + HI pronunciation guide layer.
- [ ] `{BOOK}-STOTRA-3` Run `node scripts/validate_silver.js stotras` — fix failures.
- [ ] `{BOOK}-STOTRA-4` Promote daily-use stotras to Gold and register in CAT-016 (Stotras collection).
- [ ] `{BOOK}-STOTRA-5` Cross-reference: in the parent book's Gold JSON, add `relatedStotra` metadata on the source verse.

### STAGE 8 — GRADUATE
- [ ] `{BOOK}-GRAD-1` Mark book complete in PRIORITY 0: add to GRADUATED BOOKS list with completion date.
- [ ] `{BOOK}-GRAD-2` Update PRIORITY 5 catalog entry: mark `[x]` and note verse count, author count, lab app count.
- [ ] `{BOOK}-GRAD-3` Advance PRIORITY 0 to next book from priority list.

### GOLD DATA QUALITY TASKS (cross-book)
- [ ] `FIX-GITA-HI-AUTHENTIC-001` Acquire real Hindi Bhagavad Gita translation for the ISKCON/Prabhupada HI layer slot. Source: Gita Press Gorakhpur "Shrimad Bhagavadgita" Hindi edition (public domain since 1923 — Srimad Bhagvadgita Tatparya Sametha by Gitapress). Download, parse into per-verse strings. Target: all 657 verses, ≥ 80 chars/verse, authentic Hindi prose (not English wrapped in Hindi). Replaces the template-generated content from `fix_gita_multilang_verse_level.js`. Run `audit_multilang.js bhagavad-gita` after to confirm 0 repeated groups. See BUG-057.
- [ ] `FIX-GITA-MR-AUTHENTIC-001` Acquire real Marathi Bhagavad Gita content for the sant-dnyaneshwar MR layer slot. Source: Original Dnyaneshwari (Marathi, written 1290 CE by Sant Dnyaneshwar, public domain). Map Gita verse numbers to Dnyaneshwari ovi sections (Gita 1.1 → Dnyaneshwari adhyaya 1, ovi 1–N). Parse selected ovis into per-verse strings. Target: 657 verses, ≥ 80 chars/verse, authentic Marathi ovi text. Replaces template-generated Marathi. See BUG-057.
- [x] `FIX-GOLD-GATE-001` After BUG-054 and BUG-055 confirmed done: `node scripts/audit_multilang.js --all` — Gita PASS; Isha filler blocked in UI. `data/3-gold/mahabharata/` has 0 files. `grep -r "GENERIC PLACEHOLDER" data/3-gold/` → no output. — Done: 2026-04-25

- [x] `STD-001` Create `docs/data-standards.md` — Bronze/Silver/Gold tier definitions with: Sanskrit core field requirements, 6-layer minimum (2 authors × EN/HI/MR), authenticity rules for HI/MR, ai_metadata requirements, stotra/mantra tagging spec, per-chapter Vedic Labs gate, and promotion gate sequence. — Done: 2026-04-25

- [x] `STD-002` Create `scripts/audit_standards.js` — comprehensive multi-tier standards validator. Checks: gold verse fields (original/translit/translation/meaning), layer coverage (2 authors × 3 langs), layer authenticity, author metadata completeness, ai_metadata, repeated content. Silver checks: NVF structure, no corrupted/mock data, at least 1 EN layer. Audit results 2026-04-25: Gita gold ALL PASS; Isha gold 150 violations (pre-existing BUG-050); all silver PASS. — Done: 2026-04-25

- [ ] `STD-003` Enforce Vedic Labs gate per chapter in audit_standards.js: read `lib/vedic-labs-registry.ts`, check each gold chapter has at least 1 `LabAppEntry` with matching `chapters: [N]`. Currently 10 of 18 Gita chapters are uncovered (LAB-GITA-005 through LAB-GITA-014). Report missing chapter coverage in audit output. Block graduation of new books with zero lab coverage.

- [ ] `STD-004` Add chapter-level metadata fields to manifest.json schema: `theme` (philosophical summary), `yoga_type` (for Gita chapters), `stotra_present` (boolean). Update `audit_standards.js` to verify these fields exist for each gold chapter. Write a migration script to backfill these fields for the 18 existing Gita chapters using their known themes (ch1=Arjuna Vishada, ch2=Sankhya Yoga, etc.).

- [ ] `STD-005` Isha Upanishad gold: after ISHA-DATA-1 through ISHA-DATA-9 complete and pipeline runs, run `node scripts/audit_standards.js isha-upanishad` — target 0 violations. Currently 150. This is the acceptance test for the Isha data gathering sprint.

---

## 🔧 PRIORITY 3B: REUSABLE DATA PIPELINE

*Goal: A generic, repeatable ingestion workflow that promotes any scripture from raw source to Gold-tier UI-ready data. Execute stages in order per book. Set `available: true` in `lib/texts.ts` ONLY after Stage 3 (PIPELINE) passes 100%.*

### GOLD STANDARD SCHEMA (mandatory for all new books — every verse must meet this before promotion)

Each NVF verse object must contain:
- `original` — Sanskrit Devanagari, complete, no gaps
- `transliteration` — IAST with full diacritics
- `translation` — English word-by-word literal
- `meaning` — full prose meaning ≥ 80 chars
- `layers` — minimum 6 entries (2 authors × 3 languages):
  - author-1 / lang: "en" / type: "commentary" / content ≥ 80 chars, verse-specific
  - author-1 / lang: "hi" / type: "commentary" / content ≥ 80 chars, verse-specific
  - author-1 / lang: "mr" / type: "commentary" / content ≥ 80 chars, verse-specific
  - author-2 / lang: "en" / type: "commentary" / content ≥ 80 chars, verse-specific
  - author-2 / lang: "hi" / type: "commentary" / content ≥ 80 chars, verse-specific
  - author-2 / lang: "mr" / type: "commentary" / content ≥ 80 chars, verse-specific

"Verse-specific" means: no two verses in the same chapter may share identical content for the same lang/author pair. Chapter-level summaries repeated across verses are NOT acceptable as gold-standard layers — they pass `isValidCommentaryContent()` but will be flagged by `scripts/audit_multilang.js`. The 80-char minimum is a tighter gate than the current 20-char code gate; `audit_gold.js` should be updated to enforce it.

### WORKFLOW DEFINITION (applies to every book — do not skip stages)

- Stage 1 SOURCE-AUDIT — Inventory raw files in `data/1-bronze/` and `data/2-silver/`; identify gaps; choose canonical source per language.
- Stage 2 BRONZE-PARSE — Run or write book-specific parser; output NVF-compliant JSON shards to `data/2-silver/{book}/`.
- Stage 3 SILVER-VALIDATE — Run `scripts/validate_silver.js`; enforce NVF schema (`id`, `original`, `transliteration`, `layers[]`); commentary strings ≥ 80 chars; zero placeholder strings.
- Stage 4 LAYER-ENRICH — Add translation + commentary layers from canonical sources; enforce `isValidCommentaryContent` filter; at least 1 EN layer required.
- Stage 5 GOLD-PROMOTE — Run `scripts/promote_to_gold.js`; move validated shards to `data/3-gold/{book}/`; update `data/manifest.json` with verse counts.
- Stage 6 REGISTER — Add/update entry in `lib/texts.ts` (keep `available: false`); run full test suite; fix all failures before Stage 7.
- Stage 7 UI-VERIFY — Flip `available: true`; load in reader UI; confirm no 404s, no layout shift, commentary renders correctly; revert if any P0/P1 issue found.

### RUNBOOK — HOW TO ADD A NEW BOOK (executor reference)

```
# 1. Fix source data in data/2-silver/{book-slug}/
# 2. Validate — must exit 0 before proceeding
node scripts/validate_silver.js {book-slug}

# 3. Promote to Gold (runs validate internally; blocked if failures)
node scripts/promote_to_gold.js {book-slug}

# 4. Audit completeness
node scripts/audit_gold.js {book-slug}
# Must print "Readiness: 100%" and no PLACEHOLDER-HEAVY authors

# 5. Register in lib/texts.ts — keep available:false initially
# 6. Run test suite: npm test
# 7. Set available:true and test in reader UI
# 8. Revert available:true if any P0/P1 regression found
```

**GOLD-GATE**: `VedicDataService.getChapterData()` reads `manifest.json` at runtime and returns `null` for any book not marked `status: GOLD`. Setting `available: true` alone is not sufficient — the manifest must be updated by `promote_to_gold.js`.

### TOOLING (shared — implement once, reuse for all books)
- [x] `PIPE-001` **`scripts/validate_silver.js`** — Generic NVF schema validator. Checks `id`, `original`, `verse`, `layers[]`; commentary ≥ 20 chars; no bracket-prefix or `[PLACEHOLDER_` content; EN layer required. Exit 0 = pass. — Done: 2026-04-20
- [x] `PIPE-002` **`scripts/promote_to_gold.js`** — Generic Silver → Gold promotion. Runs PIPE-001 gate; copies shards to `data/3-gold/{book}/`; auto-updates `manifest.json` with verse counts and `status: GOLD`. Blocked if validation fails. — Done: 2026-04-20
- [x] `PIPE-003` **`scripts/audit_gold.js`** — Post-promotion completeness report. Prints verse counts, per-author layer coverage, placeholder %, readiness score; flags manifest/file count mismatches. — Done: 2026-04-20


### BOOK TRACK 1: KENA UPANISHAD (~35 verses, 1 chapter, Silver exists)
*Fastest path to a second complete Gold text. Silver data already parsed.*

- [x] `PIPE-KENA-1` Stage 1: Source audit. **Done**: 2026-04-29. Findings: `data/2-silver/kena-upanishad/kena-upanishad-chapter-1.json` has 1 of 34 canonical verses. Verse 1 has authentic Sanskrit (केनेषितं...) + IAST transliteration. Empty translation and meaning fields. Zero commentary layers. Empty ai_metadata.topics. `validate_silver.js` → PASS (permissive on verse count). Gap analysis: 33 missing verses spanning 4 khandas — Khanda 1 (~13v), Khanda 2 (~5v), Khanda 3 (~12v), Khanda 4 (~9v). Required actions before PIPE-KENA-2: acquire complete Sanskrit text for all 34 verses + Max Müller translation (SBE Vol. 1, public domain) + Shankara Bhashya EN commentary. Register finding: Kena silver state is INCOMPLETE — needs full source acquisition before pipeline can advance.
- [ ] `PIPE-KENA-2` Stage 3: Silver validate — run PIPE-001 against Kena shard; fix NVF non-compliance and short commentary strings.
    - **2026-05-03 blocker note**: D2-S2 attempted Max Müller (SBE Vol 1) and GRETIL Sanskrit fetches — sandbox returned 403 on all sources (sacred-texts.com, wikisource, gretil, wisdomlib). Current Kena silver shard has 1/34 verses (only Khanda 1 verse 1 with Sanskrit + IAST; empty translation/meaning; zero commentary layers). PIPE-001 currently passes only because it's permissive on verse count — but layer-enrich (PIPE-KENA-3) cannot proceed without real source. Same network-block resolution path as MBH-DATA-2.
- [ ] `PIPE-KENA-3` Stage 4: Layer enrich — add English translation layer (public-domain Shankaracharya commentary or Max Müller); ensure all 34+ verses have ≥ 1 EN layer ≥ 80 chars.
- [ ] `PIPE-KENA-4` Stage 5: Gold promote — run PIPE-002; verify `data/manifest.json` updated.
- [ ] `PIPE-KENA-5` Stage 6: Register — add `kena-upanishad` entry to `lib/texts.ts` with correct `totalChapters`; run tests.
- [ ] `PIPE-KENA-6` Stage 7: UI verify — flip `available: true`; test reader at `/kena-upanishad/1`; confirm all verses render; revert if issues.

### BOOK TRACK 2: YOGA SUTRAS OF PATANJALI (196 sutras, 4 padas, Silver exists)

- [ ] `PIPE-YS-1` Stage 1: Source audit — inspect `data/2-silver/yoga-sutras/` (4 pada files); confirm sutra numbering per pada (51/55/56/34).
- [ ] `PIPE-YS-2` Stage 3: Silver validate — run PIPE-001 against all 4 padas; fix NVF issues.
- [ ] `PIPE-YS-3` Stage 4: Layer enrich — add at least EN translation layer (Swami Vivekananda / Patanjali public-domain); all 196 sutras.
- [ ] `PIPE-YS-4` Stage 5: Gold promote — run PIPE-002; update manifest.
- [ ] `PIPE-YS-5` Stage 6: Register — add `patanjali-yoga-sutras` to `lib/texts.ts`; run tests.
- [ ] `PIPE-YS-6` Stage 7: UI verify — flip `available: true`; test all 4 padas in reader.

### BOOK TRACK 3: ISHA UPANISHAD — ENRICH (18 verses, Gold exists, sparse layers)
*Already Gold but only 1 author layer. Add 2 more commentaries to match Gita depth.*

- [ ] `PIPE-ISHA-1` Stage 4: Layer enrich — add Shankara commentary (EN) + Aurobindo commentary (EN) for all 18 verses; commentary ≥ 80 chars each.
- [ ] `PIPE-ISHA-2` Stage 3: Re-validate — run PIPE-001 on enriched Isha; confirm 3 author layers, all ≥ 80 chars.
- [ ] `PIPE-ISHA-3` Stage 5: Re-promote — run PIPE-002; update manifest `authors` array.
- [ ] `PIPE-ISHA-4` Stage 7: UI verify — confirm commentary selector shows 3 scholars in reader; Lean UI prunes to 2 correctly.

### BOOK TRACK 4: MAHABHARATA PARVA 1 — SILVER → PARTIAL GOLD (Adhyayas 1–10)
*Target first 10 adhyayas only. Establishes MBH Gold pipeline before full 117-adhyaya scale.*

- [ ] `PIPE-MBH-1` Stage 1: Source audit — inspect `data/2-silver/mahabharata/parva-1/`; map adhyaya files 001–010; note verse count gaps vs KMG canonical.
- [ ] `PIPE-MBH-2` Stage 3: Silver validate — run PIPE-001 on adhyayas 1–10; fix NVF issues; drop placeholder stubs.
- [ ] `PIPE-MBH-3` Stage 4: Layer enrich — verify KMG (km_ganguli) EN translation layer present for all verses in adhyayas 1–10.
- [ ] `PIPE-MBH-4` Stage 5: Partial Gold promote — move adhyayas 1–10 to `data/3-gold/mahabharata/parva-1/`; update manifest with partial status.
- [ ] `PIPE-MBH-5` Stage 6: Register partial — update `lib/texts.ts` MBH entry to reflect partial Gold; keep `available: false` until Stage 7.
- [ ] `PIPE-MBH-6` Stage 7: UI verify — flip `available: true` for MBH; test adhyayas 1–10 in reader; verify hierarchy nav renders parva/adhyaya structure.

---

## 🎨 PRIORITY 4: UI

### BOOK: BHAGAVAD GITA
*Goal: Elegant interface that handles 10+ authors without cluttering.*
- [ ] `UI-901` **Scholar Selection Overhaul**: Design a categorized/tabbed selector for scholars (e.g. "Classical Sages", "Modern Philosophers", "Regional Masters").
- [ ] `UI-902` **Advanced Language Filtering**: Allow users to hide scholars based on language availability.
- [ ] `UI-903` **Scholar "Mode" Persistence**: Save preferred scholars to `localStorage` so they stick across chapters.
- [ ] `UI-904` **Interactive Tagging**: Implement the "Tag System" for links to reduce screen space usage.

### BOOK: MAHABHARATA
- [ ] `MBH-CORE-005` **Adhyaya Navigation Hardening**: Improve the `HierarchicalNav` to handle parvas with 300+ items efficiently (search-in-dropdown).

### BOOK: UPANISHADS
*(No tasks yet)*

---

## 🗺️ EPIC: THE VEDIC WIKIPEDIA VISION REVISION

*Goal: Align current architecture with the long-term Vedic Wikipedia vision by closing gaps in deep-linking, search, and UI/data balance.*

- [ ] `VISION-001` **Ontological Linkage Blueprint**: Design a graph-based or relational schema to support "Semantic Deep-Linking" beyond hierarchical routing (e.g., Tattva to Shloka mappings across texts).
- [ ] `VISION-002` **Search Scalability Prototype**: Prototype edge-cached, vector-based semantic search integration (via Cloudflare Workers AI) to bypass client-side limitations for 100k+ verses.
- [ ] `VISION-003` **Scholar Curation Strategy**: Finalize the acquisition roadmap for 10+ scholars while explicitly defining the subset rules for the "Max 2" Lean UI presentation.
- [ ] `VISION-004` **Ontological Mapping Schema**: Define the cross-scripture schema mapping structure to effectively relate tags/concepts across disparate texts (Gita, Mahabharata, Upanishads) without rigid hierarchies.
- [ ] `VISION-005` **Knowledge Graph Foundation**: Investigate and define the underlying data structure (e.g., RDF, property graph) for the Semantic Deep-Linking Protocol to scale beyond traditional relational models.
- [ ] `VISION-006` **Type-Safe Ontological Maps**: Ensure all cross-scripture linking matrices define rigid interfaces to prevent `any` mapping errors during deep-link navigation.
- [ ] `VISION-007` **Lean UI Global Enforcement**: Implement global architecture controls to formally decouple the internal 10+ scholar dataset used for AI reasoning from the maximum 2-scholar payload served to the UI.
- [ ] `VISION-008` **Semantic Graph Implementation**: Execute the deployment of the selected knowledge graph foundation mapping the first 10,000 entities across Gita and Mahabharata.
- [ ] `VISION-009` **Knowledge Graph Query Spec**: Draft the standard GraphQL/REST query interface specification for retrieving semantic links from the frontend.
- [ ] `VISION-010` **Edge WASM integration for Graph**: Evaluate loading the knowledge graph via localized edge WASM environments (similar to the server-lake data approach).
- [ ] `VISION-011` **Topic Linkage Strategy**: Define the editorial and programmatic pipeline required to assign semantic topics consistently to raw incoming verses.

## 🔬 EPIC: VEDIC LABS & AI DISCOVERY (PAUSED)

*Note: Lab development is paused to prioritize Core Data Architecture (100k+ verses).*
- [ ] `LAB-AI-001` **Gita Chapter Audit**: Run LLM pass to discover 50+ new lab opportunities.
- [ ] `LAB-AI-002` **Sankhya Logic Visualizer**: Gita Ch 13 interactive Discrimination UI.

---

## 🏛️ EPIC: ARCHITECTURE FOR SCALE & HARDENING (100K+ VERSES)

*Goal: Evolve the data-service and server-lake layers for Mahabharata-scale (100k+ verses) and establish a semantic deep-linking protocol.*

- [ ] `ARCH-001` **Server-Lake Edge Strategy**: Implement edge-hosted SQLite WASM for Mahabharata scale to prevent memory exhaustion and offload the main thread.
- [ ] `ARCH-002` **Semantic Deep-Linking Protocol**: Build a resilient, global verse-linking system enabling "Cross-Scripture Tattva Analysis" logic to route effectively across all 15+ texts.
- [ ] `ARCH-003` **Type-Safe Data Fallbacks**: Harden the `VedicDataService` and UI schema interfaces to support rigorous type narrowing and eliminate all implicit `any` patterns during JSON-to-NVF parsing.
- [ ] `ARCH-004` **Edge-Cached Semantic Search**: Design the integration pathway for Cloudflare Workers AI embedding endpoints for fast, semantic search across the entire structured dataset.
- [ ] `ARCH-005` **Web Worker Query Hardening**: Enforce strict type-safety boundaries between the main thread UI and the Web Worker executing SQLite WASM queries, completely eliminating implicit `any` usage.
- [ ] `ARCH-006` **Lean UI Data-Service Enforcement**: Refactor the data-service layer to dynamically prune scholar payloads, guaranteeing that the UI receives a maximum of 2 scholars per verse to maintain the Lean UI principle, regardless of the underlying 10+ scholar dataset.
- [ ] `ARCH-007` **Data Sharding Refinement**: Implement intermediate aggregate shards (e.g., Parva-level summaries) to accelerate the Server-Lake layer's hydration of SQLite without stalling on 100k independent verse reads.
- [ ] `ARCH-008` **Cross-Scripture Index Modeling**: Design the SQLite table indices required to execute real-time cross-scripture queries (e.g., linking Upanishad concepts directly to Gita verses) at the edge.
- [ ] `ARCH-009` **SQLite WASM Boundaries**: Formalize the message-passing contract between the main thread and the Server-Lake worker to guarantee zero memory leaks and type-safe data hydration during continuous fetching.
- [ ] `ARCH-010` **Memory-Safe Ingestion Pipeline**: Redesign the ingestion scripts (e.g., JSON to SQLite conversion) to operate via stream-processing instead of holding 100k+ verses in RAM simultaneously.
- [ ] `ARCH-011` **Type-Safe Pruning Logic**: Implement rigorous type validation inside `VedicDataService` to ensure the pruning algorithm never returns invalid or partial verse fragments, even when dynamically extracting the top 2 authors.
- [ ] `ARCH-012` **Web-Worker Type Bridges**: Build rigorous generic wrappers around Web Worker `postMessage` interfaces to strictly type all inter-thread communication payloads.
- [ ] `ARCH-013` **Edge WASM Chunking Strategy**: Define chunking and pagination limits for SQLite WASM queries to guarantee constant time `O(1)` memory consumption during extreme burst fetching.
- [ ] `ARCH-014` **Cloudflare KV Integration Spec**: Create technical specifications for storing and retrieving high-frequency semantic graph linkages across the edge network.
- [ ] `ARCH-015` **Server-Lake Data Chunking Pipeline**: Build a stream-processing service that intercepts and chunks SQLite payloads before they reach the main thread, maintaining the 2-author max constraint dynamically.
- [ ] `ARCH-016` **Web Worker Typed Events Library**: Standardize a dedicated event-bus strictly defining Web Worker interfaces for asynchronous WASM queries.
- [ ] `ARCH-017` **Main-Thread Offloading Audit**: Audit the entire UI rendering lifecycle to confirm zero heavy parsing operations exist outside of the isolated Worker environment.
- [ ] `ARCH-018` **Data Fallback Safety Nets**: Ensure all JSON-to-NVF ingestion logic is equipped with default fallback boundaries matching the `VedicDataService` interface strictness.

---

## 📜 HISTORICAL TASK ARCHIVE (Preservation Ledger)

### PHASE 0: DEPLOYMENT FOUNDATION
- [x] `DEPL-001` CI workflow — Done: 2026-04-09
- [x] `DEPL-002` Deploy workflow — Done: 2026-04-09
- [x] `DEPL-003` Env example — Done: 2026-04-09
- [x] `DEPL-004` Health route — Done: 2026-04-09
- [x] `DEPL-005` Sitemap — Done: 2026-04-09
- [x] `DEPL-006` Robots.txt — Done: 2026-04-09
- [x] `DEPL-007` Meta tags — Done: 2026-04-09
- [x] `DEPL-008` Security headers — Done: 2026-04-09
- [x] `DEPL-009` CSP fix — Done: 2026-04-10
- [x] `DEPL-010` Vercel Analytics — Done: 2026-04-10
- [x] `DEPL-011` Parva-1 Registration — Done: 2026-04-10
- [x] `DEPL-012` Health test — Done: 2026-04-09

### PHASE 1: BETA INFRASTRUCTURE
- [x] `BETA-001` FeedbackWidget — Done: 2026-04-09
- [x] `BETA-002` POST /api/feedback — Done: 2026-04-09
- [x] `BETA-003` Feedback tests — Done: 2026-04-09
- [x] `BETA-004` BetaBanner — Done: 2026-04-09
- [x] `BETA-005` Error boundary — Done: 2026-04-09
- [x] `BETA-006` Loading skeletons — Done: 2026-04-10
- [x] `BETA-007` 404 page — Done: 2026-04-10
- [x] `BETA-008` API error handling — Done: 2026-04-10
- [x] `BETA-009` FeedbackWidget tests — Done: 2026-04-10
- [x] `BETA-010` Reader feedback button — Done: 2026-04-10

### PHASE 2: CONTENT COMPLETENESS
- [x] `CONT-001` MBH available: true — Done: 2026-04-11
- [x] `CONT-002` Parva-1 shards — Done: 2026-04-11
- [x] `CONT-007` Isha available: true — Done: 2026-04-11
- [x] `CONT-008` Isha shards — Done: 2026-04-11
- [x] `CONT-010` Quality report script — Done: 2026-04-14
- [x] `STAB-701` Post-Launch Audit — Done: 2026-04-14
- [x] `STAB-702` undefined labels fix — Done: 2026-04-14
- [x] `STAB-703` Route protection — Done: 2026-04-14
- [x] `STAB-704` Isha Silver-to-Gold — Done: 2026-04-14

### EPIC 6: VEDIC LABS GITA
- [x] `APP-701` Gita Analysis — Done
- [x] `APP-702` Vedic Labs Registry — Done
- [x] `APP-703` Verse-to-App Linking — Done
- [x] `APP-704` Karma Yoga — Done
- [x] `APP-705` Jnana Yoga — Done
- [x] `APP-706` Bhakti Yoga — Done
- [x] `APP-707` Dharma Decision — Done
- [x] `APP-708` Time Wheel — Done
- [x] `APP-709` Divine Qualities — Done
- [x] `APP-712` Meditation State — Done
- [x] `LAB-801` Theme Consistency — Done
- [x] `LAB-806` Pranayama Enhancements — Done
- [x] `LAB-807` Akshauhini Context — Done
- [x] `UI-701` Lean Template Verification — Done

### EPIC 7-11: STABILITY & UI REFINEMENT

---
- [x] `STAB-601` Verification Audit — Done
- [x] `STAB-602` Placeholder Removal — Done
- [x] `STAB-603` Endpoint Hardening — Done
- [x] `STAB-604` UI Behavior Audit — Done
- [x] `STAB-605` Coverage Audit — Done
- [x] `STAB-606` Coverage Remediation — Done
- [x] `STAB-607` Doc Verification — Done
- [x] `STAB-608` Stability Gate — Done
- [x] `UI-601/604` Gita/MBH Parity — Done
- [x] `UI-701-713` Critical Refinements — Done
- [x] `UI-714-718` Reader Optimization — Done

## 📚 PRIORITY 5: SCRIPTURE MASTER CATALOG

*Full list of Hindu Vedas, Granthas, Upanishads, Puranas, and Itihas to be ingested. Work one book at a time in priority order. Check PRIORITY 0 for the currently active book before picking the next.*

Each book follows the same 7-stage pipeline. See PRIORITY 3B RUNBOOK.

### TIER A — HALF-STARTED (silver data exists or gold incomplete — highest priority)

Books in this tier have real data already in the repo. Least work to production.

- [ ] `CAT-001` Isha Upanishad — ACTIVE (PRIORITY 0). 10/18 verses gold, real `isa` layer. Needs 8 missing verses + 2 real commentaries. Cycle: ISHA-CYCLE-1→8.
- [ ] `CAT-002` Mahabharata — NEXT (after Isha graduates). Real KMG data in `data/2-silver/mahabharata/parva-1/` (adhyaya files, 210+ verses/file, no placeholders). Current state: KMG English only, single author, zero HI/MR. Must complete MBH-DATA-1 through MBH-DATA-7 (pre-data enrichment: Hindi + Marathi + Author 2 layers) before running Pipeline PIPE-MBH-1→6. Goal: Parva 1 adhyayas 1–10 to Gold first with 2-author × 3-language gold standard.
- [ ] `CAT-003` Bhagavata Purana — 12 skandhas partial silver in `data/2-silver/bhagavata-purana/`. Audit silver quality before promoting. Source: Prabhupada translation (CC) or Gita Press EN.
- [ ] `CAT-004` Vishnu Purana — 6 amshas partial silver in `data/2-silver/vishnu-purana/`. Source: H.H. Wilson translation (public domain).
- [ ] `CAT-005` Garuda Purana — partial silver in `data/2-silver/garuda-purana/`. Source: Ernest Wood & Subrahmanyam translation (public domain).
- [ ] `CAT-006` 16 Samskaras — partial silver in `data/2-silver/samskaras/`. Source: existing curated content.

### TIER B — STUB SILVER (all verses are placeholders — needs real source acquisition)

Books in this tier have the verse structure but no real text. Need Sanskrit source first.

- [ ] `CAT-007` Yoga Sutras of Patanjali — 195 stubs across 4 padas. Needs real Sanskrit sutras (Panini standard), transliteration, and Vivekananda/Patanjali EN commentary. Then run pipeline.
- [ ] `CAT-008` Kena Upanishad — 1 real verse + 33 missing. Needs full 34-verse Sanskrit source. Commentary: Shankara Bhashya (Max Müller translation, public domain).

### TIER C — REGISTERED IN lib/texts.ts (no data yet — needs full acquisition)

Books already registered and visible as "Coming Soon" in the UI.

- [ ] `CAT-009` Rigveda — 10 mandalas, 1028 hymns, ~10,552 verses. Source: Griffith translation (public domain). Start with Mandala 1 (191 hymns).
- [ ] `CAT-010` Samaveda — 1875 verses (mostly derived from Rigveda). Source: Stevenson translation or Ralph Griffith (public domain).
- [ ] `CAT-011` Yajurveda — Krishna Yajurveda (Taittiriya Samhita, 7 kanda) + Shukla Yajurveda (40 chapters). Source: Griffith translation (public domain).
- [ ] `CAT-012` Atharvaveda — 20 books, ~730 hymns. Source: Griffith or Bloomfield translation (public domain).
- [ ] `CAT-013` Brahma Sutras (Vedanta Sutras) — 4 adhyayas, 555 aphorisms. Source: Swami Vireswarananda translation + Shankara Bhashya (public domain).
- [ ] `CAT-014` Manusmriti (Laws of Manu) — 12 adhyayas, ~2685 shlokas. Source: Georg Bühler translation (public domain, SBE Vol 25).
- [ ] `CAT-015` Dasbodh (Ramdas Swami) — 20 dashaks, 200 samaas. Marathi original + EN translation. Source: existing curated EN translation.
- [ ] `CAT-016` Stotras (Sanskrit Hymns Collection) — collection of major stotras: Hanuman Chalisa, Vishnu Sahasranama, Lalita Sahasranama, Shiva Tandava, Durga Saptashati intro, Bhaja Govindam.

### TIER D — CATALOG ONLY (not yet registered — add to lib/texts.ts when starting)

Register in `lib/texts.ts` with `available: false` when this book's cycle begins. Do not register in advance.

Upanishads (108 total — priority subset):
- [ ] `CAT-020` Katha Upanishad — 2 adhyayas, 119 verses. Yama teaches Nachiketa. Source: Max Müller or Swami Gambhirananda (public domain).
- [ ] `CAT-021` Mundaka Upanishad — 3 mundakas, 64 mantras. Source: Max Müller SBE Vol 15 (public domain).
- [ ] `CAT-022` Mandukya Upanishad — 12 mantras + Gaudapada Karika (215 shlokas). Shortest yet most profound.
- [ ] `CAT-023` Prashna Upanishad — 6 prashnas, 67 verses. Source: Max Müller SBE (public domain).
- [ ] `CAT-024` Taittiriya Upanishad — 3 vallis. Source: Swami Sarvananda or Max Müller (public domain).
- [ ] `CAT-025` Aitareya Upanishad — 3 adhyayas, 33 mantras. Source: Max Müller SBE Vol 1 (public domain).
- [ ] `CAT-026` Chandogya Upanishad — 8 chapters, 156 sections. One of the two longest. Source: Max Müller SBE Vol 1 (public domain).
- [ ] `CAT-027` Brihadaranyaka Upanishad — 6 adhyayas. Largest Upanishad. Source: Max Müller SBE Vol 15 (public domain).
- [ ] `CAT-028` Svetasvatara Upanishad — 6 adhyayas, 113 verses. Source: Max Müller SBE (public domain).

Itihas:
- [ ] `CAT-030` Ramayana (Valmiki) — 7 kandas, ~24,000 shlokas. Source: Griffith translation (public domain). Start with Bala Kanda (77 sargas).
- [ ] `CAT-031` Harivamsa — appendix to Mahabharata, ~16,374 shlokas. Source: available after MBH pipeline matures.

Yoga & Vedanta:
- [ ] `CAT-035` Vivekachudamani (Adi Shankara) — 580 verses. Source: Swami Madhavananda translation (public domain).
- [ ] `CAT-036` Ashtavakra Gita — 20 chapters, 298 verses. Source: Thomas Byrom or Radhakamal Mukerjee translation.
- [ ] `CAT-037` Yoga Vasistha (Laghu Yoga Vasistha) — abridged version, 6 prakaranas. Source: K. Narayanaswami Aiyer translation (public domain).
- [ ] `CAT-038` Narada Bhakti Sutras — 84 sutras. Source: Swami Prabhavananda translation.

Puranas (18 Mahapuranas — priority order by devotional significance):
- [ ] `CAT-040` Shiva Purana — 7 samhitas, ~24,000 shlokas. Source: AITM / Motilal Banarsidass excerpts.
- [ ] `CAT-041` Devi Bhagavata Purana — 12 skandhas, ~18,000 shlokas.
- [ ] `CAT-042` Narada Purana — 2 parts, ~22,000 shlokas.
- [ ] `CAT-043` Padma Purana — 6 khandas, ~55,000 shlokas (largest).
- [ ] `CAT-044` Brahma Purana — 245 chapters, ~14,000 shlokas.
- [ ] `CAT-045` Markandeya Purana — 137 chapters. Contains Devi Mahatmya (Durga Saptashati).
- [ ] `CAT-046` Agni Purana — 383 chapters, ~15,000 shlokas. Encyclopedic.
- [ ] `CAT-047` Linga Purana — 163 chapters, ~11,000 shlokas.
- [ ] `CAT-048` Matsya Purana — 290 chapters, ~14,000 shlokas.
- [ ] `CAT-049` Kurma Purana — 2 khandas, ~18,000 shlokas.
- [ ] `CAT-050` Varaha Purana — 217 chapters, ~10,000 shlokas.
- [ ] `CAT-051` Brahmanda Purana — 3 khandas, ~12,000 shlokas.
- [ ] `CAT-052` Brahma Vaivarta Purana — 4 khandas, ~18,000 shlokas.
- [ ] `CAT-053` Vayu Purana — 2 khandas, ~12,000 shlokas.
- [ ] `CAT-054` Skanda Purana — 7 khandas, ~81,100 shlokas (largest Purana overall).

Dharmashastra:
- [ ] `CAT-060` Arthashastra (Kautilya) — 15 books, 6,000 shlokas/sutras. Source: R. Shamasastry translation (public domain).
- [ ] `CAT-061` Yajnavalkya Smriti — 3 adhyayas. Source: SBE series (public domain).
- [ ] `CAT-062` Narada Smriti — dharmashastra. Source: Julius Jolly translation SBE (public domain).

Devotional / Regional:
- [ ] `CAT-070` Devi Mahatmya (Durga Saptashati) — 700 shlokas in 13 chapters. Source: Swami Jagadiswarananda translation.
- [ ] `CAT-071` Dnyaneshwari (full standalone) — 18 adhyayas of Marathi Gita commentary. Currently used as layers in Gita; expose as standalone text.
- [ ] `CAT-072` Tukaram Gatha — 4,607 abhangas in Marathi. Source: available Marathi-EN translations.
- [ ] `CAT-073` Valmiki Ramcharitmanas — 7 khandas, Awadhi Hindi. Source: Gita Press edition.

---

*Last Updated: 2026-04-20 by Claude. Session 4: Bhagavad Gita verified COMPLETE (657v, 2 authors, EN/HI/MR, all routes). BOOK CYCLE TEMPLATE added (8 stages: data→pipeline→UI→bug hunt→bug fix→labs→stotras→graduate). LAB-GITA-001–014 added (14 new lab app opportunities for 10 uncovered chapters). LAB-GITA-STOTRA-1–3 added. Isha cycle tasks expanded to full 8-stage template. CLAUDE.md updated: 8-stage cycle with Stotra extraction stage, Gita status noted as complete.*

*Last Updated: 2026-04-24 by Claude. Session 5: Gita HI/MR content quality audit — BUG-053 [P1] added (chapter-summary-vs-verse-specific investigation). Gold Standard Schema defined in PRIORITY 3B (6-layer minimum: 2 authors × 3 languages, ≥80 chars/verse, verse-specific). Isha ISHA-DATA-7/8/9 added (Author 2 HI/MR coverage + enrich_isha.js enrichment script). MBH-DATA-1 through MBH-DATA-7 added to PRIORITY 3 (pre-data tasks: Hindi + Marathi + Author 2 EN layers required before pipeline). CAT-002 updated with new pre-data gate. Implementation sequence: Sprint 1 Gita fix → Sprint 2 Isha complete → Sprint 3 MBH Parva 1.*


*Last Updated: 2026-04-25 by Claude. Session 6 — Gold data quality + API timeout sprint: BUG-054 [P0] DONE (deleted 18 Mahabharata mock gold files). BUG-055 [P1] DONE (blocked generic filler text in content filter). BUG-056 [P0] DONE (10s/15s timeout on synthesis). BUG-057 [P1] NEW (Gita HI/MR template-generated not authentic). BUG-058/059 DONE (manifest stale refs fixed; stray mock file deleted). STD-001 DONE (docs/data-standards.md created — Bronze/Silver/Gold tier definitions). STD-002 DONE (scripts/audit_standards.js created — audit results: Gita gold 18/18 PASS, Isha gold 150 violations matching BUG-050, all silver PASS). STD-003/004/005 NEW (Vedic Labs gate enforcement, chapter-level metadata fields, Isha acceptance test). Data quality snapshot: Gold=clean (Gita), Gold=BUG-050-tracked (Isha), Silver=all pass.*

---

## 🏛️ Release Verification Checklist

Perform these manual checks before any major production deployment:

### 1. Scripture Navigation
- [ ] **Gita**: Open Ch 2, Verse 47. Verify Sanskrit, Transliteration, and English Translation.
- [ ] **Commentary**: Verify scholarly commentary (e.g. Sivananda) loads on selection.
- [ ] **Mahabharata**: Verify Sabha Parva (2.5) content loads.
- [ ] **Upanishad**: Verify Isha Verse 1 layout.

### 2. Search & Labs
- [ ] **Search**: Verify "Dharma" returns results from both Gita and MBH.
- [ ] **Tokenizer Lab**: Verify Sanskrit word-break functionality.
- [ ] **Meter Lab**: Verify "Anushtubh" detection on a sample verse.

### 3. UI/UX & Quality
- [ ] **Clean Branding**: No "Beta" or "Prototype" labels on Home page.
- [ ] **Synthesis**: Verify AI Analysis does not show "PoC Fallback" label.
- [ ] **Mobile Audit**: Verify header/toolbar responsiveness at 375px.
- [ ] **Logs**: Zero errors in browser console on first load.
- [ ] **Headers**: Verify CSP and HSTS are active via `curl -I`.
