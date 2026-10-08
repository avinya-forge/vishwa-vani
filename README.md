# 🪷 Vishwa-Vani: The Universal Voice of Vedic Wisdom

[![Version](https://img.shields.io/badge/version-v1.3.0-orange.svg)](./docs/release-notes.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://github.com/avinya-forge/vishwa-vani/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/avinya-forge/vishwa-vani/actions)

**Vishwa-Vani** is a high-performance, open-source digital sanctuary for exploring the vast depth of Vedic literature. Built with an unwavering focus on accessibility, modern design (Apple Glassmorphism), and performance, it combines ancient wisdom with Next.js 16 (Turbopack), React Server Components, and embedded AI.

---

## 🚀 Core Capabilities

- **📚 The Universal Library (100% Gold)**: Fully structured, searchable, and translated texts for the Chaturvedas (Rig, Sama, Yajur, Atharva), Upanishads (Isha, Kena), Itihasas (Bhagavad Gita, Mahabharata), Puranas (Bhagavata, Vishnu, Garuda), Yoga Sutras, and the 16 Samskaras.
- **⚙️ Autonomous AI Data Engine**: Powered by a highly optimized local AI-driven pipeline that systematically ingests, cleanses, and maps multi-author translations into the stringent Gold NVF 1.3 Schema.
- **🧠 AI Semantic Search & Analysis**: Embedded @xenova/transformers intercepts natural language queries, providing synthesized philosophical answers alongside exact scripture citations.
- **✨ Vedic Labs & Daily Upliftment**: Interactive experiential modules featuring Chanting Trainers, Cosmic Timelines, and a localized semantic widget designed for immediate, practical human benefit.
- **🌐 Multilingual & Multi-Author**: English, Hindi, and Marathi translations mapped intricately to renowned public domain commentaries (Shankara, Ramanuja, Madhva, Prabhupada, Vivekananda, Dnyaneshwari).
- **⚡ High-Performance Architecture**: SSR-first routing, Apple Glass UI aesthetics, robust CI/CD typing, and an evolving LLM architecture designed to scale seamlessly under load.

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

*Note: We highly recommend using 
pm run lint and 
pm test to verify logic locally. Next.js Turbopack production builds (
pm run build) are handled securely by our Vercel Linux CI/CD pipelines.*

---

## 📖 Single Source of Truth (SSOT) Documentation

Vishwa-Vani strictly adheres to a Single Source of Truth methodology to prevent logic drift. Please consult the following core documents before contributing:

- **[Global Backlog](./docs/backlog.md)**: Strict Agile priorities mapping critical security fixes, AI Brain enhancements, and the UI roadmap.
- **[Project Status Matrix](./docs/PROJECT_STATUS.md)**: Real-time mathematical readiness scores and pipeline statuses for every integrated book.
- **[Onboarding Playbook](./docs/ONBOARDING_PLAYBOOK.md)**: The precise Bronze → Silver → Gold ingestion rules governing our Data Engine.
- **[AI System Directives](./AGENTS.md)**: The strict rules, circuit-breakers, and architectural directives managing our autonomous agent fleet.
