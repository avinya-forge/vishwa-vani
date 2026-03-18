# 🏛️ Vishwa-Vani: High-Performance "Vedic Lake" Architecture

Based on the vision to scale to **millions of verses** (Mahabharata, Vedas, Puranas) while maintaining **Zero hosting costs** and **High Security**, here is the refined Architectural Proposal.

---

## 1. Data Storage: "Vedic Lake" Strategy 🌊
Storing thousands of individual JSON files will inevitably slow down Git and build performance. We will transition to a **Hybrid Binary approach** for larger texts.

### **Current (Small Scale - Gita/Stotras)**
- **Format**: `JSON Sharding` (Chapter-based).
- **Pros**: Easy to read/edit, fast for small books.
- **Cons**: High file count overhead at scale.

### **Proposal (Massive Scale - Mahabharata/Vedas)**
- **Format**: **DuckDB WASM** or **SQLite WASM** (compressed binary files).
- **Strategy**:
    - Build a single `.db` file per major scripture (e.g., `mahabharata.db`).
    - The client uses **HTTP Range Requests** to fetch only the specific bytes (Shlokas) needed.
    - **Compression**: Up to 80% size reduction compared to raw JSON.
    - **Indexing**: Instant full-text search across the entire Mahabharata (100k+ verses) without loading it all.

---

## 2. Intelligence: The "Local Professor" AI 🧠
To provide personal summaries based on "user-selected authors" for free, we cannot use centralized server-side LLMs (too expensive).

- **The Engine**: **WebLLM** or **Transformers.js**.
- **The Workflow**:
    1. User selects 4 authors (e.g., Shankara, Prabhupada, Chinmaya, Dnyaneshwar).
    2. Client collects their texts from the local "Vedic Lake".
    3. A **Small LLM (Qwen-2-0.5B / Llama-3-1B)** running in the user's browser processes these texts.
    4. **Result**: A custom summary generated for $0 cost to us, with 100% privacy.

---

## 3. Security: "Fortress" Model 🏰
The user requested security against malicious software and "inspect element" obfuscation.

- **Content Security Policy (CSP)**: We will implement a strict policy that prevents scripts from any unauthorized domains, stopping XSS and bot-injection.
- **Obfuscation**:
    - We will use **Terser**-based mangling for our production build.
    - The most sensitive data mapping will happen inside **WASM (WebAssembly)**, which is significantly harder to reverse-engineer than standard JavaScript.
- **Binary Obfuscation**: SQLite files will be pre-processed with a lightweight XOR-mask to prevent casual data scraping.

---

## 4. UI/UX: The "One-Screen" Philosophy 📱
- **Adaptive Density**: The UI intelligently shrinks font size based on the number of selected authors, ensuring everything fits on one mobile screen.
- **Creative Professor**: The AI output will be rendered as **"Sketch-style" SVG diagrams** (using Mermaid or Rough.js) to make wisdom feel human-explained, not robot-text.

---

## 📊 Backlog Transition Table

| Feature | Old Approach | New "Premium Free" Approach |
| :--- | :--- | :--- |
| **Storage** | 10k JSON files | 5-10 Sharded Binary DBs (SQLite WASM) |
| **Search** | Client-side keyword loop | SQL Full-Text Search (indexed) |
| **AI Summary** | Pre-generated static text | Real-time Local LLM (WebLLM) |
| **Cost** | Free (GitHub) | Free (GitHub) |
| **Security** | None (Open JSON) | WASM-Isolated Logic + CSP |

### **Recommendation**
I suggest we **keep the current JSON structure for the Bhagavad Gita** (since it's already working and small) but **introduce the "Vedic Lake" (SQLite) for the Mahabharata integration** starting next.
