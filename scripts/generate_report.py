import json

with open('.status', 'r') as f:
    report = json.load(f)

lines = [
    '# 🗺️ Vishwa-Vani: Master Project Status Tracker',
    '',
    'This document is the **Single Source of Truth** for project readiness. It tracks books across structural, linguistic, and scholarly dimensions. Books with placeholders are penalized in their score.',
    '',
    '## 📊 Project Completion Summary',
    '',
    '| Book Name | Stage | UI | Score (%) | Chapters | Verses | Langs | Authors |',
    '| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |'
]

for b in report:
    p = b['progress']
    score_display = f"**{b['score']}%**"
    if b['flags']['placeholders']:
        score_display += " ⚠️"

    lines.append(f"| {b['name']} | {b['stage']} | {b['ui']} | {score_display} | {p['chapters']} | {p['verses']} | {p['langs']} | {p['authors']} |")

lines.append('\n---\n')
lines.append('## 🔍 Granular Book Audits & Pending Tasks\n')

for b in report:
    lines.append(f"### {b['name']} (`{b['slug']}`) ")
    lines.append(f"> {b['description']}")
    lines.append('')
    lines.append(f"- **Composite Score:** {b['score']}%")
    lines.append(f"- **Pipeline Stage:** {b['stage']}")
    lines.append(f"- **UI Integration:** {b['ui']}")

    lines.append('- **Current Progress:**')
    lines.append(f"  - Chapters: {b['progress']['chapters']}")
    lines.append(f"  - Verses: {b['progress']['verses']}")
    lines.append(f"  - Language Layers: {b['progress']['langs']}")
    lines.append(f"  - Scholar Coverage: {b['progress']['authors']}")

    if b['pending_tasks']:
        lines.append('- **🚨 Pending Tasks:**')
        for task in b['pending_tasks']:
            lines.append(f"  - [ ] {task}")
    else:
        lines.append('- **✅ Status:** Fully complete and verified.')

    lines.append('')

lines.append('---')
lines.append('**⚠️ Warning:** Scores marked with ⚠️ contain placeholder or generated content that MUST be replaced with authentic scholarship to reach 100%.')
lines.append('')
lines.append('*Last Master Audit: 2026-07-06*')

with open('docs/PROJECT_STATUS.md', 'w') as f:
    f.write('\n'.join(lines))
