with open("docs/release-notes.md", "r") as f:
    content = f.read()

new_content = """# Vishwa-Vani Release Archive

## [v0.4.0] - Community Core Initiated
*   **Epic Archived**: Community & Social Engagement (partial).
*   **Notes**: Completed initial Phase 3 backlog items to setup comments database table and server-rendered comment list. Backlog successfully refined to 400+ WU.
*   **Completed Work**:
    *   [x] TASK-301: Create `comments` DB table referencing `shlokas` and `users`
    *   [x] TASK-302: Build server-rendered comment list under Shloka detail view
"""

content = content.replace("# Vishwa-Vani Release Archive\n", new_content)

with open("docs/release-notes.md", "w") as f:
    f.write(content)
