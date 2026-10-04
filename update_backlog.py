with open("docs/backlog.md", "r", encoding="utf-8") as f:
    text = f.read()

epic_str = "## EPIC 6: UI Redesign & UX Simplification (Priority 1)\n*Modernize the interface, remove excessive styling, and fix critical scrolling layout bugs.*\n\n- [ ] `UX-007` **Landing Page Simplification**: Strip out excessive styling. Keep fundamental modern UI techniques, reduce heavy shadows, eliminate visual clutter.\n- [ ] `UX-008` **Reading Page Redesign**: Complete page-by-page UI overhaul starting with the core reading experience. Remove complex navigation layers and fix fundamental layout constraints.\n- [ ] `BUG-085` **IntersectionObserver Cleanup**: Finalize performance audits on scroll tracking; ensure single firing events per verse.\n\n"

text = text.replace("## EPIC 1: Security", epic_str + "## EPIC 1: Security")

with open("docs/backlog.md", "w", encoding="utf-8") as f:
    f.write(text)
