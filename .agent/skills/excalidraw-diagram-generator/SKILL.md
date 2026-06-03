---
name: excalidraw-diagram-generator
description: Generate Excalidraw-compatible JSON diagrams for architecture, data flow, ER, sequence, and mindmaps using text descriptions.
---

# Excalidraw Diagram Generator

**Goal:** Convert text descriptions into valid Excalidraw JSON diagrams for visual documentation.

## Trigger Phrases
- "Draw a diagram of..."
- "Create an architecture diagram"
- "Sequence diagram for..."
- "ER diagram for..."
- "Mindmap of..."

## Diagram Types Supported
1. **Architecture / System Design** — boxes, arrows, services, DBs
2. **Sequence Diagram** — actor lanes, message arrows with labels
3. **Data Flow Diagram** — process nodes, data stores, external entities
4. **Entity-Relationship (ER)** — entities, attributes, relationships
5. **Flowchart** — decision diamonds, process boxes, start/end ovals
6. **Mindmap** — central concept, radial branches

## Output Format
Always output a valid Excalidraw JSON file that can be directly pasted into [excalidraw.com](https://excalidraw.com):

\`\`\`json
{
  "type": "excalidraw",
  "version": 2,
  "source": "vishwa-vani-agent",
  "elements": [...],
  "appState": { "viewBackgroundColor": "#1e1e2e", "gridSize": 20 }
}
\`\`\`

## Design Principles
- **Dark mode by default:** background `#1e1e2e`, text `#cdd6f4`, boxes `#313244`
- **Clear labels:** all nodes must have descriptive text
- **Consistent spacing:** 160px between sibling nodes, 120px between layers
- **Arrow labels:** include verb labels on connecting arrows (e.g., "fetches", "returns", "triggers")

## Vishwa-Vani Context
Key components to use when asked:
- **Browser** → `lib/lake.ts` (SQLite WASM) → `data/3-gold/*.db`
- **Next.js App Router** → `app/[text]/[chapter]/[verse]/page.tsx`
- **Data pipeline:** Bronze → Silver → Gold via `scripts/`
- **AI synthesis:** `app/api/synthesize/route.ts` → Gemini API
