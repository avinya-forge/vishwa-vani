import re

with open("docs/backlog.md", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace("- [ ] `UX-014`", "- [x] `UX-014`")

with open("docs/backlog.md", "w", encoding="utf-8") as f:
    f.write(text)

with open("docs/release-notes.md", "a", encoding="utf-8") as f:
    f.write("- `UX-014` **Footer Refactor**: Streamline footer content and reduce visual bloat.\n")
