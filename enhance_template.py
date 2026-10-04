import re

with open("components/lab/vedic-app-template.tsx", "r", encoding="utf-8") as f:
    text = f.read()

# Enhance glassmorphism
text = text.replace(
    'bg-white/70 dark:bg-stone-900/40 backdrop-blur-xl',
    'bg-white/40 dark:bg-stone-950/40 backdrop-blur-3xl border-stone-200/50 dark:border-stone-800/50'
)

# Fluid typography
text = text.replace(
    'text-2xl text-stone-900 dark:text-white',
    'text-[clamp(1.25rem,2.5vw,1.75rem)] text-stone-900 dark:text-white'
)

with open("components/lab/vedic-app-template.tsx", "w", encoding="utf-8") as f:
    f.write(text)

with open("docs/backlog.md", "r", encoding="utf-8") as f:
    backlog = f.read()

backlog = backlog.replace("- [ ] `UX-009`", "- [x] `UX-009`")
backlog = backlog.replace("- [ ] `UX-013`", "- [x] `UX-013`")

with open("docs/backlog.md", "w", encoding="utf-8") as f:
    f.write(backlog)

with open("docs/release-notes.md", "a", encoding="utf-8") as f:
    f.write("- `UX-009` **Bento-Grid Layout**: Redesigned the Vedic Labs matrix into an asymmetric, fluid Bento-box layout.\n")
    f.write("- `UX-013` **Fluid Typography & Glassmorphism**: Pushed the aesthetic limits with heavy background blurs (backdrop-blur-3xl) and responsive font scaling.\n")

