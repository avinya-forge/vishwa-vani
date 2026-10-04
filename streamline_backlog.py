import re
from datetime import datetime

# Read backlog
with open("docs/backlog.md", "r", encoding="utf-8") as f:
    backlog_lines = f.readlines()

completed_items = []
new_backlog = []

for line in backlog_lines:
    if line.strip().startswith("- [x]"):
        completed_items.append(line.strip()[5:].strip())
    else:
        new_backlog.append(line)

# Add UX-014
ux_014_line = "- [ ] `UX-014` **Footer Refactor**: Streamline footer content and reduce visual bloat.\n"
# Find a place to insert it (maybe end of EPIC 2)
for i, line in enumerate(new_backlog):
    if "## EPIC 5" in line:
        new_backlog.insert(i-1, ux_014_line)
        break
else:
    new_backlog.append(ux_014_line)

with open("docs/backlog.md", "w", encoding="utf-8") as f:
    f.writelines(new_backlog)

# Read or create release-notes.md
try:
    with open("docs/release-notes.md", "r", encoding="utf-8") as f:
        release_notes = f.read()
except FileNotFoundError:
    release_notes = "# Release Notes\n\nAll notable changes to this project will be documented in this file.\n"

date_str = datetime.now().strftime("%Y-%m-%d")
version_header = f"## [v1.1.0] - {date_str}\n"

# If version header not in release notes, add it at the top
if version_header not in release_notes:
    release_notes = release_notes.replace("# Release Notes\n", f"# Release Notes\n\n{version_header}\n")

# Append completed items to the version block
# For simplicity, we just inject them right after the version header
new_items_text = ""
for item in completed_items:
    new_items_text += f"- {item}\n"

release_notes = release_notes.replace(version_header, f"{version_header}\n{new_items_text}")

with open("docs/release-notes.md", "w", encoding="utf-8") as f:
    f.write(release_notes)
