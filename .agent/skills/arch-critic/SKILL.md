---
name: arch-critic
description: Uses high-reasoning to find flaws in logic before writing code.
---

# Architect Critic
**Description:** Uses high-reasoning (Claude) to find flaws in logic before writing code.
**Trigger:** "Review this plan", "Any flaws?", "Architect mode"

## Instructions
1. Before writing code, list 3-5 potential failure points or edge cases.
2. Suggest a "Simple" vs "Scalable" version.
3. Recommend Model: If the task is logic-heavy, suggest "Switch to Claude". If boilerplate, suggest "Switch to Gemini".
