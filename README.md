# 🕉️ Vishwa-Vani: The Universal Voice of Vedic Wisdom

[![Version](https://img.shields.io/badge/version-v1.3.0-orange.svg)](./docs/release-notes.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://github.com/avinya-forge/vishwa-vani/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/avinya-forge/vishwa-vani/actions)

**Vishwa-Vani** is a high-performance, open-source digital sanctuary for exploring the vast depth of Vedic literature. Built with an unwavering focus on accessibility, clean UI, and performance, it combines ancient wisdom with Next.js 16 (Turbopack), React Server Components, and embedded AI.

---

## 🚀 Core Capabilities

- **📚 The Universal Library (100% Complete)**: Fully structured, searchable, and translated texts for the Chaturvedas, Upanishads, Itihasas (Gita, Mahabharata), Puranas, Yoga Sutras, and Samskaras.
- **⚙️ Autonomous Data Engine**: A local data pipeline that systematically ingests, cleanses, and maps multi-author translations into a strict JSON schema and SQLite database.
- **🧠 AI Semantic Search**: An embedded @xenova/transformers model that intercepts natural language queries and provides accurate philosophical answers with exact scripture citations.
- **🔬 Vedic Labs & Daily Upliftment**: Interactive experiential modules featuring Chanting Trainers, Cosmic Timelines, and a localized Daily Upliftment widget.
- **🌐 Multilingual & Multi-Author**: English, Hindi, and Marathi translations mapped intricately to renowned public domain commentaries.
- **⚡ High-Performance Architecture**: SSR-first routing, Apple Glassmorphism UI aesthetics, strict TypeScript integration, and local SQLite optimizations.

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js**: v18.17.x or higher
- **npm**: v10.x or higher

### Local Installation
\\\ash
git clone https://github.com/avinya-forge/vishwa-vani.git
cd vishwa-vani
npm install
npm run dev
\\\
*Note: We recommend using 
pm run verify to run the strict verification suite (Lint, TSC, Jest) locally before pushing.*

---

## 📂 Documentation (Single Source of Truth)

Vishwa-Vani maintains a strictly organized, single-source-of-truth documentation folder.

1. **[Global Project Backlog](./docs/backlog.md)**: Strict Agile priorities mapping critical security fixes, UI changes, and book onboarding.
2. **[Architecture Blueprint](./docs/architecture.md)**: The technical blueprint explaining how the Brain, Data Engine, and UI layers interact.
3. **[Massive Data Architecture (ADR-004)](./docs/ADR-004-Massive-Data-Architecture.md)**: Decisions on handling the 10GB dataset scaling via Oracle/Turso/CDN decoupling.
4. **[Data Pipeline Guide](./docs/data-pipeline.md)**: Instructions on how books are processed from raw text (Bronze) to SQLite (Gold).
5. **[Project Status](./docs/project-status.md)** & **[Release Notes](./docs/release-notes.md)**: High-level metrics, progress tracking, and semantic versioning history.
6. **[AI Prompts & Guidelines](./docs/prompts/)**: Developer loop and architect planner prompts for AI agents. Note: Core model instructions (JULES.md, CLAUDE.md, GEMINI.md, AGENTS.md) remain at the repository root.

---

<p align="center">Made with ❤️ by Avinya Forge</p>
