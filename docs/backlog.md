# ?? Vishwa-Vani: Global Project Backlog

## ?? ACTIVE SPRINT (P0/P1 High Priority)

### EPIC-ARCHITECTURE-EVOLUTION (LLM Strategy & Code Modularity) [NOT STARTED]
- [ ] ARCH-001: [SPIKE] Analyze LLM Usage - Identify exactly *where* to use the integrated LLM (e.g., data engine, UI synthesis, symbolic decoding) and map the evolving architecture.
- [ ] ARCH-002: [SPIKE] Model Selection & Scalability - Evaluate which LLM model is best suited for max load scenarios; establish decision gates to switch/upgrade the local LLM safely without breaking the system.
- [ ] ARCH-003: Code Segregation & Optimization - Refactor and modularize existing codebase (especially the data engine) to ensure smaller bundle sizes and highly optimized local performance, keeping everything natively within the monolith.

### EPIC-DEEP-KNOWLEDGE-EXTRACTION (Scientific & Symbolic Analysis) [NOT STARTED]
- [ ] DATA-010: Shloka-wise Contextual Decoding - Deeply analyze Puranic data using the local LLM to extract symbolic/scientific meanings.
- [ ] DATA-011: Concept Generalization Engine - Translate extracted symbolic concepts into generic, cross-applicable principles (to feed into new features).
- [ ] DATA-012: Manual Review Gates - Implement a strict UI/backend workflow for manual human review of AI-generated scientific/symbolic interpretations before public promotion.

### EPIC-UI-NAVIGATION & ROADMAP [NOT STARTED]
- [ ] UI-009: Streamline Navbar - Analyze and redesign the main Navbar to be more apt, reducing clutter.
- [ ] UI-010: Roadmap Representation - Consolidate page counts; ensure a prominent, highly efficient "Roadmap" page exists so users clearly see queued, next, and current items.


### EPIC-UI-ENHANCEMENTS [IN-PROGRESS]
- [ ] UI-006: Chapter Top Bar Redesign - Accommodate 'Back' button, current chapter name & title, and 'Next Chapter' button.
- [ ] UI-007: Commentary & Language Selector - Provide a clear, intuitive UI to select and toggle between various authors and languages.
- [ ] UI-008: AI Synthesis Note - Improvise and clarify the purpose and presentation of the "AI synthesis note" on the chapter UI.

### EPIC-BOOK-CONTEXT (Preface & Postface) [IN-PROGRESS]
- [x] CTX-001: Start/Preface Pages - For each book (starting with Bhagavad Gita), add a short, fluff-free historical context page (timeline, real-world evidence, how it was formed).
- [x] CTX-002: End/Postface Pages - Add concluding context detailing what the book led to and its post-context impact.

### EPIC-LEARNING-PATHS [IN-PROGRESS]
- [x] PATH-001: Extract 'Daily Pooja Path' referencing Stotras & Samskaras.
- [ ] PATH-002: Extract 'Satyanarayan Pooja' logic (Requires Skanda Purana onboarding).
- [ ] PATH-003: Define 'Hindu Calendar & Festivals' dynamically from Puranic data.
- [x] PATH-004: Organize books strictly into Prasthanatrayi, Vedas, Itihasas, Puranas, Dharma Shastras.
- [x] PATH-005: Advanced Daily Pooja Compilation - Emulate Kavishwar Dutta Maharaj / Shankar Abhyankar structures. Extract powerful mantras (Purusha Sukta, Shri Sukta, Vishnu Sahasranama, Rudram, Nirvana Shatkam) *only* if they exist within currently scanned 3-gold books.

### EPIC-COMMENTARY-EXPANSION & AUDIT [IN-PROGRESS]
- [x] COMM-001: Add at least 2 more copyright-free author commentaries for EVERY existing book epic.
- [x] COMM-002: Re-run strict data correctness scan (Sanskrit -> English Meaning -> Commentary correlation) to verify the new authors.

## ?? UPCOMING SPRINT (Data Acquisition)

### EPIC-ONBOARD-DASBODH [NOT STARTED]
- [ ] ACQ-001: Bronze ingestion of Dasbodh.
- [ ] ACQ-002: Silver Regex Parse.
- [ ] ACQ-003: Gold Translation Layer (Ensure 2+ commentaries).
- [ ] ACQ-004: Push to UI and Vedic Lake.

## ?? COMPLETED IN LATEST SPRINT
- [x] EPIC-ONBOARD-SAMAVEDA: Book 1 of Samaveda integrated.
- [x] EPIC-ONBOARD-YAJURVEDA: Chapter 1 of Yajurveda integrated.
- [x] EPIC-ONBOARD-ATHARVAVEDA: Kanda 1 of Atharvaveda integrated.
- [x] EPIC-ONBOARD-GARUDA-PURANA: Fully integrated into 3-gold and UI.
- [x] EPIC-ONBOARD-RIGVEDA: First Mandala of Rigveda integrated.
- [x] EPIC-ONBOARD-BRAHMA: Brahma Sutras (Adhyaya 1) integrated.
- [x] EPIC-ONBOARD-MANUSMRITI: Chapter 1 of Manusmriti integrated.
- [x] EPIC-ARCHITECTURE-01: Reorganized `core/brain`, `core/data-engine`, and `app/`.



