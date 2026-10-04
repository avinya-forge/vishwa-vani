with open("docs/backlog.md", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace("- [ ] `BUG-084`", "- [x] `BUG-084`")
text = text.replace("- [ ] `UX-007`", "- [x] `UX-007`")
text = text.replace("- [ ] `BUG-085`", "- [x] `BUG-085`")

with open("docs/backlog.md", "w", encoding="utf-8") as f:
    f.write(text)
