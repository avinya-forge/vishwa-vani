# JULES: Autonomous Co-Pilot for vishwa-vani

> **Mission**: Maintain high-integrity development via scheduled skill execution.

## 1. Core Directives
1. **SSOT**: Keep backlog.md updated.
2. **Purity**: Atomic changes only.


## 5. Scheduled Skill Workflow (Sequential Protocol)
To ensure zero-drift implementation, utilize skills one at a time in this order:

1. 🗓️ **PHASE 1: GROOMING** (Skill: scrum-master)
   - Analyze acklog.md and prioritize the next atomic task.
   - Ensure the task is well-defined and has clear success criteria.

2. 📐 **PHASE 2: SPECIFICATION** (Skill: prd or rch-critic)
   - Create a mini-spec for the task.
   - Verify against "Core Directives" (Zero-Cost, SSOT, etc.).

3. 🛠️ **PHASE 3: IMPLEMENTATION** (Skill: implementer)
   - Execute the code changes atomically.
   - Adhere to the project's specific coding standards.

4. 🧪 **PHASE 4: VERIFICATION** (Skill: qa-expert)
   - Run 
pm test, 
pm run lint, or project-specific validation.
   - Update acklog.md and .state to reflect completion.
