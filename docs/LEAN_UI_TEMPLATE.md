# 🎯 Lean UI Template Specification - Vedic Scholarly Interface

## Overview
The **Lean UI Template** is a minimalist-by-default scholarly interface that emphasizes clean reading of sacred texts with progressive revelation of commentary and AI analysis on demand. This template is the foundation for UI-LEAN-701 (EPIC 7) and applies to all future books (Gita, Mahabharata, Upanishads, Puranas, etc.).

### Philosophy
- **Lean defaults**: Sanskrit + English meaning only; no commentary clutter
- **Opt-in depth**: Users actively choose scholarly perspectives
- **2-author max**: Prevents cognitive overload with parallel interpretations
- **AI on-click**: Synthesis always includes meaning + up to 2 commentaries
- **Responsive discovery**: Progressive revelation as user deepens engagement

---

## Core UI Components

### 1. **Main Study Card (Always Visible)**
```
┌─────────────────────────────────────┐
│ BG 2.1 (Verse number badge)         │
├─────────────────────────────────────┤
│ [Sanskrit script]                   │ ← Always centered, main focus
│ dhṛtarāṣṭra uvāca                   │ ← Transliteration below
├─────────────────────────────────────┤
│ **Meaning**                         │
│ "Here begins the knowledge..."      │ ← English meaning, always shown
└─────────────────────────────────────┘
```
- **Content**: Sanskrit original + Transliteration + English meaning
- **Status**: Always visible on page load
- **Purpose**: Establishes base layer for all text engagement

### 2. **Author Selector (Opt-In Commentary)**
```
┌─────────────────────────────────────────────────────┐
│ Scholars (0/2)  [📜 Shankara] [🔱 Prabhupada] ...   │
└─────────────────────────────────────────────────────┘
```
- **Type**: Multi-select checkbox buttons (max 2)
- **Default**: None selected (commentary hidden)
- **Interaction**: Click to toggle; highlights selected authors in orange/gold
- **Counter**: Shows "0/2", "1/2", "2/2" to indicate selections
- **Behavior**: 
  - Min: 0 (no commentary)
  - Max: 2 (prevents cognitive overload)
  - Upon 3rd selection, replaces 1st selected (FIFO)
- **Storage**: Preferences persisted in localStorage as JSON array

### 3. **Commentary Section (Conditional)**
```
┌─────────────────────────────────────┐
│ 📜 Shankara (if selected)           │
├─────────────────────────────────────┤
│ "From My perspective..."            │
│ [Author commentary content]         │
├─────────────────────────────────────┤
│ 🔱 Prabhupada (if selected)         │
├─────────────────────────────────────┤
│ "The Lord explains..."              │
│ [Author commentary content]         │
└─────────────────────────────────────┘
```
- **Visibility**: Only renders if `scholarSelection.length > 0`
- **Author metadata**: Icon + name + language filter
- **Content**: Full commentary text, cleaned and formatted
- **Styling**: Orange/saffron highlight background
- **Max display**: Up to 2 commentaries per verse (enforced)

### 4. **AI Synthesis Card (Always Available)**
```
┌─────────────────────────────────────┐
│ ✨ AI Analysis                      │ ← Synthesis toggle
├─────────────────────────────────────┤
│ "This verse synthesizes..."         │ ← AI-generated summary
│ [Combines meaning + 2 commentaries] │ ← Always includes meaning
└─────────────────────────────────────┘
```
- **Trigger**: "AI Analysis" button (🧠 icon)
- **Inputs**: 
  - Always: English meaning
  - Always: Up to 2 commentaries (from selected authors OR top 2 available if none selected)
- **Processing**: Calls `/api/synthesize` with text context
- **Output**: VedicManuscriptCard with synthesis result
- **Loading state**: "Synthesising wisdom..." during processing

---

## Language & Author Selection

### Language Filter
```
Language: [All Languages ▼]
```
- **Default**: "all" (shows all available translations of commentary)
- **Options**: All, English, Hindi, Marathi, Sanskrit
- **Scope**: Applies to commentary only (meaning is always English)
- **Storage**: localStorage key `vishwa_language_pref`

### Scholar Preferences
- **Storage**: localStorage key `vishwa_scholar_pref` (JSON array)
- **Format**: `["shankara", "prabhupada"]` (empty array on load)
- **Persistence**: Survives page reload and navigation within book

---

## Toolbar Layout (Sticky at top)

```
┌─────────────────────────────────────────────────────────────┐
│ Scholars (0/2) [Button] [Button] [Button]  Language [Select]  │  🧠 AI Analysis
└─────────────────────────────────────────────────────────────┘
```
- **Position**: Sticky, just below main header
- **Responsiveness**: 
  - Desktop: All elements inline, sorted left-to-right
  - Mobile: Buttons wrap, select dropdowns stack
  - AI button always visible on right, hidden text on mobile

---

## State Management

### React Hooks in StudyClient
```typescript
// Multi-author selection (max 2): string[]
const [scholarSelection, setScholarSelection] = useState<string[]>([])

// Language filtering: single select
const [languageSelection, setLanguageSelection] = useState<string>('all')

// AI synthesis results: Map<verseId, {text, loading}>
const [synthesisMap, setSynthesisMap] = useState<Record<string, {text, loading}>>({})
```

### Helper Functions
```typescript
// Toggle author with max 2 limit
const toggleScholar = (author: string) => {
  if (selected.includes(author)) remove it
  else if (selected.length < 2) add it
  else replace first with new author
}

// Synthesize with meaning + up to 2 commentaries
const synthesizeEntireChapter = async () => {
  for each verse:
    - Get meaning (English translation)
    - Get up to 2 commentaries (from selectedAuthors OR top 2 available)
    - Call /api/synthesize with combined context
    - Store result in synthesisMap
}
```

---

## Commentary Filtering Logic

### Filter Criteria
```typescript
const commentaries = verse.layers?.filter((l) => {
  if (scholarSelection.length === 0) return false      // Lean: hide by default
  if (l.type !== 'commentary') return false
  if (languageSelection !== 'all' && l.lang !== languageSelection) return false
  return scholarSelection.includes(l.author)          // Only selected authors
}) || []
```

### Example Flow
1. **Initial load**: scholarSelection = [], commentaries hidden, meaning visible
2. **User clicks "Shankara"**: scholarSelection = ["shankara"], Shankara commentaries shown
3. **User clicks "Prabhupada"**: scholarSelection = ["shankara", "prabhupada"], both shown
4. **User clicks "Ramanuja" (3rd)**:  scholarSelection = ["ramanuja", "prabhupada"], Shankara replaced
5. **User unclicks "Ramanuja"**: scholarSelection = ["prabhupada"], only Prabhupada shown
6. **User unclicks "Prabhupada"**: scholarSelection = [], commentaries hidden again

---

## Implementation Checklist (UI-LEAN-701 through UI-LEAN-704)

### UI-LEAN-701: Spec Out Lean Template ✅
- [x] Define default state (commentaries off, meaning on)
- [x] Define max 2 authors rule
- [x] Define AI synthesis inputs (meaning + up to 2 commentaries)
- [x] Document component layout

### UI-LEAN-702: Refactor StudyClient ✅
- [x] Change default scholar from first available → empty array []
- [x] Hide commentaries when scholarSelection.length === 0
- [x] Update useEffect to initialize with empty selection
- [x] Test build succeeds (125 static pages)
- [x] All tests pass (15/15)

### UI-LEAN-703: Multi-Author Selector (max 2) ✅
- [x] Replace dropdown with checkbox buttons
- [x] Implement toggleScholar with 2-author limit
- [x] Add counter badge (0/2, 1/2, 2/2)
- [x] Add visual selection states (selected = orange, disabled = grayed)
- [x] Persist to localStorage as JSON array
- [x] Responsive button layout for mobile/desktop

### UI-LEAN-704: AI Synthesis Logic ✅
- [x] Always include English meaning in synthesis input
- [x] Include up to 2 commentaries (from selected OR top 2 available)
- [x] Update synthesizeEntireChapter function
- [x] Pass combined context text to /api/synthesize
- [x] Handle both user-selected and auto-selected commentaries

---

## Deployment Notes

### Build
- Next.js 16: 125 static pages pre-rendered
- Build time: ~5s with TypeScript check
- ENVIRONMENT_FALLBACK warnings: Non-blocking

### Testing
- Jest: 15/15 tests passing
- Coverage: StudyClient multi-author logic fully tested
- Test suite: ~6.4s runtime

### Browser Storage
- Key: `vishwa_scholar_pref` → JSON string array
- Key: `vishwa_language_pref` → string ("all", "en", "hi", "mr", "sa")
- Scope: Per book (managed by component state)
- Persistence: Survives page reload and navigation

---

## Future Extensions

### For Each New Book
1. **Verify template adoption**: UI-LEAN-901 (Gita) ✓
2. **Apply to book**: UI-LEAN-902 (Mahabharata)
3. **Document book-specific themes**: APP-701 (Gita chapters → recommend micro-apps)
4. **Densify content**: MBH-802 (Mahabharata long chapters → pagination)

### Advanced Features (Post-MVP)
- [ ] **3-way commentary view**: Single/dual/triple scholarly comparison
- [ ] **Commentary intensity slider**: Show 0/1/2/3+ commentaries
- [ ] **Author profiles**: Click scholar name → bio + historical context
- [ ] **Verse bookmarking**: Save notes + your selected authors per verse
- [ ] **Export commentary bundle**: Download meaning + selected commentaries as PDF

---

## Validation Criteria

- [ ] Commentary **hidden by default** on page load
- [ ] Meaning **always visible** alongside Sanskrit
- [ ] Author selector **limits to 2 selections**
- [ ] AI synthesis **includes meaning + up to 2 commentaries**
- [ ] Preferences **persist** across page reloads
- [ ] Mobile layout **responsive** (buttons wrap correctly)
- [ ] **No broken styles** or console errors
- [ ] All tests **pass** (15/15)
- [ ] Build **succeeds** (125 static pages)

---

## Version History

| Version | Date       | Change                                                      |
|---------|------------|------------------------------------------------------------|
| 1.0     | 2024-01-XX | Initial lean template spec + StudyClient refactoring       |
|         |            | Deployed to Gita with multi-author (max 2) + AI synthesis  |

