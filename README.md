# 🕉️ Vishwa-Vani: The Universal Voice of Vedic Wisdom

[![Version](https://img.shields.io/badge/version-v1.1.0-orange.svg)](./docs/release-notes.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://github.com/avinya-forge/vishwa-vani/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/avinya-forge/vishwa-vani/actions)

**Vishwa-Vani** is a high-performance, open-source digital sanctuary for exploring the depth of Vedic literature. It serves as a unified repository, providing an immersive, scholarly experience for texts like the **Bhagavad Gita**, the **Mahabharata**, the **Upanishads**, and the **Puranas**.

Built with an unwavering focus on **accessibility**, **performance**, and **design aesthetics**, Vishwa-Vani combines centuries of ancient wisdom with the cutting edge of modern web architecture (Next.js 14 App Router, React Server Components, and Edge computing).

---

## ✨ Core Capabilities

- 📚 **Comprehensive Library**: Multi-layered reading experience for the Bhagavad Gita, Mahabharata, and more.
- 🧘 **Vedic Labs**: Interactive experimental modules for meditation (Pranayama Timer), Cosmic visualization, and consciousness mapping.
- ⚡ **High-Performance Architecture**: SSR-first, edge-optimized routing, and minimal client payloads for instant loading.
- 💾 **Vedic-Lake**: A custom-built, lightweight SQLite data lake for rapid semantic querying of over 30,000 verses.
- 🌐 **Multilingual Support**: Read and search seamlessly across English, Hindi (हिंदी), Marathi (मराठी), and Sanskrit (संस्कृत).
- 🛡️ **Enterprise Security**: Rate limiting, API guards, strict CSP, and WAF protection built directly into the application layer.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.17.x or higher
- **npm**: v10.x or higher

### Installation & Local Development
```bash
git clone https://github.com/avinya-forge/vishwa-vani.git
cd vishwa-vani
npm install

# Start the local development server
npm run dev
```
Navigate to `http://localhost:3000` in your browser.

### Production Build
```bash
npm run build
npm start
```

---

## 📖 Documentation Hub

Welcome to the Vishwa-Vani knowledge base. We maintain a strict "Documentation as Code" philosophy. All architectural decisions, backlogs, and standards are cleanly consolidated in the [`/docs`](./docs) directory.

### 🧭 Product & Strategy
- [**Vision & Scope**](./docs/vision.md) – Core product vision, features, target audience, future auth goals, and launch announcements.
- [**Status Report**](./docs/status_report.md) – Executive overview and live AI-loop tracking.
- [**Release Notes**](./docs/release-notes.md) – Version history and changelog.
- [**Master Backlog**](./docs/backlog.md) – Highly prioritized list of bugs, technical debt, and upcoming features.

### 🏛️ Engineering & Architecture
- [**Architecture Blueprint**](./docs/blueprint.md) – High-level system design, data models (NVF), and deployment infrastructure.
- [**Engineering Standards**](./docs/standards.md) – Coding conventions, accessibility (WCAG) rules, security guidelines, and UI/UX aesthetic principles.

### 🎨 Data & Portfolio
- [**Data Ingestion Runbook**](./docs/ingestion-runbook.md) – Guidelines for transforming raw scripture into the Normalized Vedic Fragment (NVF) format.
- [**Resume Guide**](./docs/resume-guide.md) – Project impact metrics and highlights for developer portfolios.

---

## 🤝 Contributing

Contributions are welcome! Please ensure you read our [Engineering Standards](./docs/standards.md) before submitting a Pull Request. We strictly follow the **Conventional Commits** specification and enforce an 80% unit test coverage gate in our CI/CD pipelines.

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
