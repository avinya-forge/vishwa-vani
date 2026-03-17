# Vishwa-Vani Master Backlog (Vedic Wikipedia Architecture)

*Note: Backlog has been actively re-prioritized based on the directive to build the core solution/hosting framework first, implement AI understanding features, and finally aggregate massive scale data and crowdsourcing.*

---

## 🟥 PRIORITY 0: The Core Solution Framework (Highest)
*Objective: Build the scalable UI, routing, and hosting skeleton first so data can simply be poured in later.*

**TASK [1801]: Hyper-Optimized 1-Screen Shloka UI** | [TODO] | [UI/UX]
**SPEC:** Reduce overall UI margins, padding, and font sizes even further. Ensure that at a minimum, one full Shloka, its Sanskrit text, English meaning, regional meaning, and short commentaries all perfectly fit within a single mobile viewport without requiring any scrolling.

**TASK [1701]: Implement Wikipedia-Style Semantic URL Routing** | [TODO] | [Architecture]
**SPEC:** Migrate from the hardcoded `/study/[chapter]` routing to a generic, scalable `/[text-slug]/[chapter-slug]/[verse-slug]` format. E.g., `/bhagavad-gita/chapter-1/verse-1` or `/upanishads/isha/verse-1`.

**TASK [1702]: Standardize Native i18n Translation Handlers** | [TODO] | [Architecture]
**SPEC:** Integrate an industry-standard i18n library to map `/[locale]/[text-slug]` so the entire menu and shell is translated natively (e.g., `/hi/bhagavad-gita`).

**TASK [1703]: Assess & Integrate Modern Scalable Database (Static JSON / Vector)** | [TODO] | [Database]
**SPEC:** Establish a scalable, free-hosting compatible data storage approach (like partitioned JSON files on a CDN or a free Vector DB tier) capable of organizing infinite texts.

**TASK [1501]: Implement Robust API Throttling & Security** | [TODO] | [Security]
**SPEC:** Configure an API strategy using edge middleware to enable rate-limiting, CORS lockdown, and IP-based throttling.

**TASK [1705]: Universal API Construction for Public Integration** | [TODO] | [Backend]
**SPEC:** Build a standard GraphQL or RESTful Next.js API layer exposing all stored Vedic content publicly (`GET /api/v1/texts/...`).

---

## 🟧 PRIORITY 1: AI Concepts & Advanced Understanding
*Objective: Make the wisdom deeply understandable, engaging, and creatively explained.*

**TASK [1802]: "AI Professor" Creative Explanations** | [TODO] | [Feature]
**SPEC:** Build a module where an AI acts as a dedicated professor explaining complex Sanskrit concepts. This includes generating or rendering creative mediums like diagrams, philosophical flowcharts, or styled "handwritten notes" to ensure absolute layman comprehension.

**TASK [1407]: GPS/Locale-Based Default Language Detection** | [TODO] | [Architecture]
**SPEC:** Implement a hook to flawlessly default the target language to Hindi or Marathi based on user location, falling back to English.

**TASK [1402]: Implement Global Shloka Semantic Search** | [TODO] | [UI/UX]
**SPEC:** Build a search UI that translates layman queries ("What does the Gita say about duty?") into exact Shlokas using the Vector backend.

---

## 🟨 PRIORITY 2: Massive Data Collection & Aggregation
*Objective: Gather infinite Vedic texts once the framework is ready.*

**TASK [1704]: Curate Massive Multi-Author Legal Content Aggregation** | [TODO] | [Data Quality]
**SPEC:** Source diverse interpretations across the ages. Automatically or manually crawl legal/open texts from Saint Dnyaneshwar's Dnyaneshwari, Adi Shankaracharya, Madhvacharya, up to modern scholars.

**TASK [1401]: Populate Bhagavad Gita Chapters 1-18** | [TODO] | [Database]
**SPEC:** Cleanly pipe in all 18 chapters of the Gita into the newly minted framework DB setup.

**TASK [1408]: Aggregate and Deduplicate Expanded Commentaries** | [TODO] | [Data Validation]
**SPEC:** De-duplicate sentiments. If ISKCON and Chinmaya mention the exact same concept, cluster them to preserve UI real estate.

**TASK [1503]: Translation & Cross-Reference Verification Pass** | [TODO] | [Data Quality]
**SPEC:** Run AI/Manual verification to ensure translation intents strictly match the original Sanskrit philosopher's intention.

---

## 🟩 PRIORITY 3: Wikipedia Crowdsourcing & Maintenance (Lowest)
*Objective: Community tools and final codebase lock.*

**TASK [1803]: Wikipedia-Style User Corrections & Moderation** | [TODO] | [Crowdsourcing]
**SPEC:** Allow authenticated users or the public to flag typos, suggest edits to translations, or submit better interpretations into a moderation queue.

**TASK [1505]: Google Analytics & Donation Integration** | [TODO] | [Integration]
**SPEC:** Integrate sub-level Google Analytics for traffic observation and Wikipedia-style donation footnotes.

**TASK [1601]: Final Codebase Pruning** | [TODO] | [Refactoring]
**SPEC:** Comprehensive dead-code audit. Remove every file not actively utilized in the final static production compile.

---
_Legacy & Completed Milestone 1 initialization Tasks have been safely archived._
