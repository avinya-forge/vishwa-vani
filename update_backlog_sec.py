with open("docs/backlog.md", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace("- [ ] `SEC-007`", "- [x] `SEC-007`")
text = text.replace("- [ ] `SEC-008`", "- [x] `SEC-008`")

with open("docs/backlog.md", "w", encoding="utf-8") as f:
    f.write(text)
