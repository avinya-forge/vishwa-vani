# 🤖 AI Agent Guidelines

This project utilizes autonomous AI agents to build code, scrape data, and write documentation. All agents operating in this repository must follow these core principles:

## 1. Execute Without Halting
Do not stop after a single file edit. Measure your work using git diff. If you have not completed a substantial chunk of work (e.g., a full feature or 200+ lines of code), automatically pull the next priority task from docs/backlog.md and continue.

## 2. Single Source of Truth
Never hallucinate project status. Always refer to and update:
*   docs/backlog.md for tasks.
*   docs/PROJECT_STATUS.md for book readiness scores.

## 3. Circuit Breaker (Anti-Stuck)
If a test or build fails 3 times in a row, immediately revert the code, mark the task as [BLOCKED] in the backlog, and pivot to the next task. Do not get stuck in infinite debugging loops.

## 4. No "AI Slop"
Keep UI text, summaries, and documentation clean and straightforward. Avoid overly enthusiastic AI language (e.g., "Delve into", "Tapestry", "Let's embark"). Speak simply and professionally.
