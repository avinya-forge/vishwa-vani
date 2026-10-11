# ADR-005: Local LLM Strategy, Conversational Search ("Vedic Saṁvāda") & Server Concurrency Under Load

> **Status:** Proposed & Evaluated  
> **Date:** 2026-10-11  
> **Domain:** AI Engineering, Conversational RAG, System Architecture & Concurrency  
> **Authors:** AI Agent Systems Architect & Antigravity Engineering

---

## 1. Problem Statement & Strategic Questions

The Vishwa-Vani platform aims to integrate a purpose-built, lightweight Language Model (LLM) to empower users to search, query, and converse with the sacred Vedic corpus.

Key architectural questions raised:
1. **Model Selection & Size:** How lightweight and specialized can a local model be while preserving high philosophical nuance and Sanskrit comprehension?
2. **Serverless Deployment Realities:** How can this LLM run efficiently within the memory and compute budget of our deployed infrastructure (e.g., Vercel / edge serverless)?
3. **Behavior Under Load:** What happens when 10, 100, or 1,000 concurrent users query the model? If run naively on server nodes, CPU and memory spikes will cause Out-Of-Memory (OOM) crashes and 504 Gateway Timeouts.
4. **Conversational Search UX ("Vedic Saṁvāda"):** How should the traditional keyword search bar at `/search` be elevated into an interactive, citation-grounded conversational dialogue interface?

---

## 2. Resource Constraints & Server Load Analysis

### A. Current Production Server Constraints (Vercel Edge / Serverless)
* **Memory Limit:** 1024 MB RAM default per invocation.
* **Timeout Limit:** 10 to 15 seconds max execution window.
* **Pricing & Cost:** Serverless CPU scales with billable millisecond execution time; running CPU-bound model matrix multiplications on serverless nodes is financially and architecturally non-viable.

### B. The Breakdown Under Load (What Happens If Run On Server?)
If an LLM (even quantized 4-bit, e.g., Qwen-2.5-1.5B or LLaMA-3.2-1B) is hosted directly on a server node:
* **Memory footprint:** Base weights require ~1.1 GB to 2.2 GB RAM. KV Cache requires an additional 200–500 MB per active generation stream.
* **Single User:** 1 query consumes 100% of 1 CPU core for 3–8 seconds.
* **5 Concurrent Users:** CPU spikes to 100%, generation latency multiplies from 3s to 25s, hitting the 15-second serverless timeout.
* **20+ Concurrent Users:** Server processes trigger OOM (Out Of Memory) fatal exit code 137, dropping all incoming HTTP requests.

---

## 3. The 3-Tier Architectural Solution

To achieve infinite scalability with **zero server crashes and zero cloud cost runaway**, we adopt a **Tiered Hybrid Architecture**:

```
                              ┌──────────────────────────────────────────────┐
                              │           User Query at /search              │
                              └──────────────────────┬───────────────────────┘
                                                     │
                                                     ▼
                              ┌──────────────────────────────────────────────┐
                              │  Client Feature Detection (WebGPU / Browser) │
                              └──────┬────────────────────────────────┬──────┘
                                     │                                │
                       [WebGPU Available (80%+ Users)]   [Legacy / Mobile Low-Spec]
                                     │                                │
                                     ▼                                ▼
┌────────────────────────────────────────────────────────┐ ┌───────────────────────────────────────────┐
│               TIER 1: In-Browser WebLLM                │ │          TIER 2: Decoupled Edge API         │
│  - Engine: WebGPU / WebAssembly via @mlc-ai/web-llm   │ │  - Server: Oracle Cloud Always-Free ARM  │
│  - Model: Qwen-2.5-0.5B-Instruct / SmolLM-135M         │ │             (4 OCPU, 24 GB RAM, 0 cost) │
│  - Execution: Directly on User Device / GPU           │ │  - Engine: Ollama / vLLM (INT4 Quantized) │
│  - Server Load: 0% (Zero server RAM/CPU consumed!)     │ │  - Concurrency: Token-Bucket Queue      │
└────────────────────────────────────────────────────────┘ └───────────────────────────────────────────┘
                                     ▲                                ▲
                                     │                                │
                                     └────────────────┬───────────────┘
                                                      │
                                                      ▼
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 TIER 3: Pre-Baked Offline Knowledge Base                               │
│  - "Tattva Saṁgraha" (1-Hour Speed Reader Executive Summaries for All 17 Scriptures)                  │
│  - Chapter digests, thematic indexes, and cross-commentary syntheses pre-computed during ingestion     │
│  - Response latency: < 5 ms from static JSON CDN / Edge Cache                                          │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Deep Dive: The Three Tiers

### Tier 1: Client-Side WebGPU WebLLM (Zero Server Load)
* **Technology:** `@mlc-ai/web-llm` or `@xenova/transformers` running directly in the user's browser via WebGPU.
* **Candidate Models:**
  1. `Qwen2.5-0.5B-Instruct-q4f16_1-MLC` (~380 MB total download, cached in browser IndexedDB). Highly adept at multilingual translation (Sanskrit, Hindi, English).
  2. `SmolLM-135M-Instruct` (~90 MB download). Ultra-fast, ideal for low-end laptops.
* **Load Dynamics:**
  * 1 user = 0 server load.
  * 10,000 concurrent users = **0 server load**.
  * Inference latency: 25–60 tokens/sec directly on user's hardware.
* **Privacy:** User questions and reflections never leave their browser.

### Tier 2: Decoupled Edge LLM Service (With Graceful Concurrency Queuing)
* For mobile users without WebGPU support:
* Host `vLLM` or `Ollama` on the **Oracle Cloud Always-Free ARM instance** (4 OCPUs, 24 GB RAM, 200 GB NVMe — permanently free).
* **Concurrency Protection (Leaky Bucket Queue):**
  * Maximum concurrent streaming slots: 4.
  * In-memory priority queue caps wait time at 5 seconds.
  * If queue exceeds 10 requests, the system gracefully degrades to **Instant Hybrid RAG** (returning retrieved canonical verses and synthesized excerpt matches without runtime LLM generation).

### Tier 3: Pre-Computed Static Synthesis ("Offline Bake")
* For high-frequency queries ("Summary of Chapter 2", "What is Nishkama Karma?", "Essence of Isha Upanishad"):
* The LLM runs **during the ingestion/build phase** ("Offline Bake"), storing verified structured insights into `aiContext` inside each chapter JSON.
* Served instantly with 0 ms generation latency and zero server CPU usage.

---

## 5. Redesigning `/search` into "Vedic Saṁvāda" (Conversational Scripture Guide)

### UX Transformation:
1. **Unified Dual Mode:**
   * **Tab 1: Conversational Saṁvāda (Chat)** — Natural philosophical dialogue with citations.
   * **Tab 2: Classical Keyword Index** — Instant millisecond filter across all 126,000+ verses.
2. **Grounding & Anti-Hallucination Protocol:**
   * The model is strictly prohibited from inventing Sanskrit or commentaries.
   * Every answer must cite exact verse references: e.g. `[BG 2.47]`, `[Īśā 1.1]`.
   * Each citation renders as an interactive card linking directly into the full Study Canvas (`/[book]/[chapter]#verse-[v]`).

---

## 6. Implementation Milestones (Backlog Tasks)

* [ ] `LLM-EVAL-001` [Spike] Benchmark `Qwen2.5-0.5B` vs `SmolLM-135M` in browser WebGPU for Sanskrit vocabulary coverage and response latency.
* [ ] `LLM-UI-001` [Frontend] Redesign `/search` with modern conversational chat interface ("Vedic Saṁvāda") with streaming output and citation badges.
* [ ] `LLM-RAG-001` [RAG] Build client-side vector/BM25 retrieval pipeline passing top 3 canonical verses to the in-browser model prompt.
* [ ] `LLM-LOAD-001` [Resilience] Implement token-bucket concurrency queue and fallback heuristics for low-spec non-WebGPU devices.
