# User Registration & Data Collection Strategy (Phase 1)

## Primary Goals for User Registration
The introduction of user accounts (`next-auth`) is designed to move Vishwa-Vani from a static library to a personalized spiritual and educational platform. 

### 1. Personalized Learning & Reading Progress
* **Goal**: Allow users to pick up exactly where they left off.
* **Data to Collect**: 
  - `last_read_verse` (Book, Chapter, Verse).
  - `bookmarks` (Saved verses for later reference).
  - `reading_history` (Timestamped log of completed chapters).
* **Benefit**: Deepens user engagement; users don't lose their place in massive texts like the Mahabharata.

### 2. Preference & Customization Memory
* **Goal**: Persist user UI/UX and localization preferences across devices.
* **Data to Collect**: 
  - `preferred_language` (e.g., English, Hindi, Sanskrit).
  - `preferred_script` (e.g., Devanagari vs IAST vs ITRANS).
  - `theme` (Dark/Light/Sepia).
  - `preferred_commentary` (e.g., Defaulting to Prabhupada or Sankaracharya).
* **Benefit**: Creates a frictionless, instantly familiar experience on every login.

### 3. Community Curation & Feedback
* **Goal**: Understand which translations or purports are resonating or if there are errors.
* **Data to Collect**: 
  - `verse_upvotes` / `commentary_helpful_votes`.
  - `error_reports` (Reported typos or translation issues linked to user ID to prevent spam).
* **Benefit**: Crowdsources quality control and highlights the most impactful verses.

### 4. Roadmap Prioritization & Engagement
* **Goal**: Use real user demand to drive our data acquisition pipeline.
* **Data to Collect**: 
  - `book_votes` (Which scripture users want next, tied to authenticated accounts to prevent manipulation).
* **Benefit**: Aligns our development roadmap (like focusing on Bhagavata Purana vs Garuda Purana) with actual user demand.

## Step 1 Execution Plan
1. **Schema Design**: Update Prisma/Drizzle schema to include `User`, `Session`, `ReadingProgress`, and `UserPreferences` tables.
2. **OAuth Integration**: Implement Google and Facebook providers via `next-auth` to ensure one-click, low-friction sign-ups.
3. **Telemetry & Analytics**: Anonymously aggregate reading completion rates to understand drop-off points in large texts.
