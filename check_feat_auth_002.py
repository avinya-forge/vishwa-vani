import re

with open("docs/backlog.md", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace("- [ ] `FEAT-AUTH-002`", "- [x] `FEAT-AUTH-002`")

with open("docs/backlog.md", "w", encoding="utf-8") as f:
    f.write(text)

with open("docs/release-notes.md", "a", encoding="utf-8") as f:
    f.write("- `FEAT-AUTH-002` **Resume Reading**: Automatically tracks your read position and dynamically renders a 'Resume' button on the landing page.\n")
