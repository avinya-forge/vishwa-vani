# 📋 Vishwa-Vani: Global Project Backlog

## 🔴 P0: CRITICAL (Security & Bugs)
### EPIC-SECURITY-AND-BUGS [ACTIVE]
- [ ] SEC-001: Implement Scraping Protection - Secure the edic-lake.db and API routes from malicious public scraping.
- [ ] SEC-002: Data Encryption Mechanisms - Audit and implement robust encryption for sensitive data at rest and in transit.
- [ ] BUG-001: Resolve any lingering UI glitches in the commentary dropdowns or Next.js App Router navigation.

## 🟠 P1: HIGH PRIORITY (AI Brain, Data Engine, UI Optimization)
### EPIC-AI-BRAIN-ENHANCEMENT (LLM & Symbolic Extraction) [ACTIVE]
- [ ] AI-001: [SPIKE] Evaluate Model Upgrades - Determine the exact architecture to hot-swap or upgrade the integrated LLM based on production load.
- [ ] AI-002: Enhance LLM Contextual Output - Map exactly where the integrated LLM should be used vs. static rendering. Add more intelligent features to the "Brain".
- [ ] AI-003: Deep Shloka Symbolic Decoding - Use the LLM to extract scientific and symbolic meanings from Puranas (ensure manual review gates are established to prevent wrong content).
- [ ] AI-004: Concept Generalization - Translate symbolic outputs into generic concepts to uplift day-to-day human life.

### EPIC-DATA-ENGINE-OPTIMIZATION [ACTIVE]
- [ ] DATA-001: Optimize Codebase Size - Segregate and modularize the data engine to ensure the overall codebase remains lightweight and fast.
- [ ] DATA-002: Enhance Data Gathering - Upgrade the Bronze ingestion pipeline to be more robust for obscure texts.

### EPIC-UI-UX-LIGHTWEIGHT [ACTIVE]
- [ ] UI-001: Lightweight UI Overhaul - Optimize all React Server Components for maximum speed and minimal DOM size.
- [ ] UI-002: Chapter Top Bar Redesign - Perfect the 'Back' button, current chapter name, and 'Next Chapter' flow.
- [ ] UI-003: AI Synthesis Note - Clarify and beautifully render the "AI synthesis note" in the chapter UI.
- [ ] UI-004: Commentary & Language Selector - Polish the UI for switching between the 4+ authors and 3+ languages per shloka.

## 🟡 P2: MEDIUM PRIORITY (Books & Learning Paths)
### EPIC-LEARNING-PATHS [QUEUED]
- [ ] PATH-001: Extract 'Satyanarayan Pooja' logic (Requires Skanda Purana onboarding).
- [ ] PATH-002: Define 'Hindu Calendar & Festivals' dynamically from Puranic data.

### EPIC-BOOK-ONBOARDING: SKANDA PURANA [QUEUED]
- [ ] ACQ-001: Bronze ingestion of Skanda Purana.
- [ ] ACQ-002: Silver Regex Parse & Gold Translation.

### EPIC-BOOK-ONBOARDING: DASBODH [QUEUED]
- [ ] ACQ-003: Bronze ingestion of Dasbodh.
- [ ] ACQ-004: Silver Regex Parse & Gold Translation.

## 🔵 P3: LOW PRIORITY / IDEATION (Auth & Monetization)
### EPIC-USER-ACCOUNTS-AUTH [BACKGROUND DEV]
- [ ] AUTH-001: Sign-Up/Login Architecture - Spike NextAuth.js or Clerk integration.
- [ ] AUTH-002: OAuth Integrations - Allow users to link Gmail, Facebook, and Apple accounts.
- [ ] AUTH-003: User Profiles - Store user preferences, reading history, and saved shlokas.

### EPIC-SUBSCRIPTION-TIERS [EVALUATION STAGE]
- [ ] MON-001: [EVALUATE] Subscription Tiers - Analyze the feasibility of Free, Basic, and Pro tiers.
- [ ] MON-002: Feature Gating - Map which advanced LLM features or deep learning paths belong to Basic vs Pro.

## ✅ COMPLETED (Archived)
- [x] EPIC-ONBOARD-ALL-PRIMARY-BOOKS: Gita, Upanishads, Mahabharata, Puranas, Vedas.
- [x] EPIC-CI-CD-PIPELINE: Fixed all 259 tests, passing green.
- [x] EPIC-BOOK-CONTEXT: Added fluff-free historical contexts (Preface/Postface).
- [x] EPIC-COMMENTARY-EXPANSION: Added Prabhupada, Vishvanatha, Vivekananda.
- [x] EPIC-UI-NAVIGATION: Streamlined Navbar and added Daily Upliftment widget.


## [P1-UI] Feature: Vedic Learning Paths
- Build a UI module for "Daily Pooja Path" dynamically generated from Stotras and Samskaras.
- Build a UI module for "Festivals & Calendar" generated dynamically from the Puranas.

## [P1-ARCH] Database & AI Brain Scaling
- **Evaluate Turso Edge Database Migration**: Move edic-lake.db to an Edge-hosted SQLite provider (like Turso) to keep the repository size small and query latency low. 
  - *Constraints:* Must support end-to-end encryption, maintain absolute ownership/control of our data, and remain at zero (or near-zero) cost.
- **Vectorize Gold Data**: Convert all Gold JSON shlokas into vector embeddings to power semantic AI search.
  - *Constraints:* Use cost-free, self-hosted, or zero-cost tier vector solutions (e.g., local ChromaDB, Qdrant, or embedded vector search) to guarantee data privacy and zero cloud overhead.
