---
name: task-observer
description: Monitors task execution for skill creation and improvement opportunities. Captures patterns, user corrections, workflow insights, and methodology to continuously observe and improvise tasks. Also known as "One Skill to Rule Them All".
---

# Task Observer 👁️✨

**Goal:** Monitor live task execution, capture user feedback, corrections, and execution patterns, and turn them into actionable skill improvements and new skill discoveries.

## Core Directives

1. **Continuous Execution Observation**:
   - Watch agent tool usage, error handling, code modifications, and user interactions during multi-step tasks.
   - Detect user corrections, preferences, manual steps, or recurring workflow patterns.

2. **Capture Skill Signals**:
   - **Corrections & Adjustments**: Any user override, instruction refinement, or guidance is a signal that an existing skill or instruction can be clarified.
   - **Gaps & Missing Skills**: Any manual or repetitive sequence executed without existing skill guidance indicates a candidate for a new skill.
   - **Methodology Refinements**: Effective debugging steps or structural patterns discovered during task execution should be preserved.

3. **Log & Improvise**:
   - Record findings directly into `.jules/task-observer-log.md` (or task session logs).
   - Format entries with timestamp/task context, observed gap or feedback, and recommended skill enhancement.
   - Use the feedback loop to update agent instructions, rules, or skill files (`.agent/skills/` / `.agents/skills/`).

## Observation Log Format

```markdown
### [YYYY-MM-DD] - Task Observation
- **Context**: <Brief description of the active task>
- **Observation / Signal**: <Correction, pattern, or gap observed during execution>
- **Actionable Improvement**: <Specific update to skill, rule, or workflow>
```
