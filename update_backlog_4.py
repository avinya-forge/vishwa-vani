with open("docs/backlog.md", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace("- [ ] `PROD-014`", "- [x] `PROD-014`")
text = text.replace("- [ ] `BUG-UI-002`", "- [x] `BUG-UI-002`")
text = text.replace("- [ ] `PROD-005`", "- [x] `PROD-005`")
text = text.replace("- [ ] `SEC-016`", "- [x] `SEC-016`")

with open("docs/backlog.md", "w", encoding="utf-8") as f:
    f.write(text)
