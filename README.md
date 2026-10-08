# 🪷 Vishwa-Vani: The Universal Voice of Vedic Wisdom

[![Version](https://img.shields.io/badge/version-v1.3.0-orange.svg)](./docs/release-notes.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://github.com/avinya-forge/vishwa-vani/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/avinya-forge/vishwa-vani/actions)

**Vishwa-Vani** is a high-performance, open-source digital sanctuary for exploring the vast depth of Vedic literature. Built with an unwavering focus on accessibility, clean UI, and performance, it combines ancient wisdom with Next.js 16 (Turbopack), React Server Components, and embedded AI.

---

## 🚀 Core Capabilities

- **📚 The Universal Library (100% Complete)**: Fully structured, searchable, and translated texts for the Chaturvedas (Rig, Sama, Yajur, Atharva), Upanishads (Isha, Kena), Itihasas (Bhagavad Gita, Mahabharata), Puranas (Bhagavata, Vishnu, Garuda), Yoga Sutras, and the 16 Samskaras.
- **⚙️ Autonomous Data Engine**: A local data pipeline that systematically ingests, cleanses, and maps multi-author translations into a strict JSON schema and SQLite database.
- **🧠 AI Semantic Search**: An embedded @xenova/transformers model that intercepts natural language queries and provides accurate philosophical answers with exact scripture citations.
- **✨ Vedic Labs & Daily Upliftment**: Interactive experiential modules featuring Chanting Trainers, Cosmic Timelines, and a localized Daily Upliftment widget.
- **🌐 Multilingual & Multi-Author**: English, Hindi, and Marathi translations mapped intricately to renowned public domain commentaries (Shankara, Ramanuja, Madhva, Prabhupada, Vivekananda, Dnyaneshwari).
- **⚡ High-Performance Architecture**: SSR-first routing, Apple Glassmorphism UI aesthetics, strict TypeScript integration, and local SQLite optimizations for instantaneous load times.

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js**: v18.17.x or higher
- **npm**: v10.x or higher

### Local Installation

`ash
git clone https://github.com/avinya-forge/vishwa-vani.git
cd vishwa-vani
npm install
npm run dev
`

*Note: We recommend using 
pm test and 
pm run lint to verify your changes locally. Turbopack production builds (
pm run build) are handled securely by our Vercel Linux CI/CD pipelines.*

---

## 📖 Documentation Directory

Vishwa-Vani maintains a strictly organized, single-source-of-truth documentation folder. All architecture, backlog, and guides are located in the docs/ folder:

1. **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)**: The technical blueprint explaining how the Brain, Data Engine, and UI layers interact.
2. **[DATA_PIPELINE.md](./docs/DATA_PIPELINE.md)**: Instructions on how books are processed from raw text (Bronze) to SQLite (Gold).
3. **[backlog.md](./docs/backlog.md)**: Strict Agile priorities mapping critical security fixes, UI changes, and future books.
4. **[PROJECT_STATUS.md](./docs/PROJECT_STATUS.md)**: Real-time mathematical readiness scores for every integrated book.
5. **[AI_RULES.md](./docs/AI_RULES.md)**: Instructions governing autonomous AI agents operating in this repository.
6. **[release-notes.md](./docs/release-notes.md)**: Version history and feature changelogs.
