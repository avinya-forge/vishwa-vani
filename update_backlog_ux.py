with open("docs/backlog.md", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace("- [ ] `UX-004`", "- [x] `UX-004`")
text = text.replace("- [ ] `UX-006`", "- [x] `UX-006`")

with open("docs/backlog.md", "w", encoding="utf-8") as f:
    f.write(text)
