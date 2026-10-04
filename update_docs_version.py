import re

with open("README.md", "r", encoding="utf-8") as f:
    readme = f.read()

# Bump version to 1.1.0
readme = re.sub(r'version-v1\.0\.0-orange', r'version-v1.1.0-orange', readme)

with open("README.md", "w", encoding="utf-8") as f:
    f.write(readme)

with open("docs/PROJECT_STATUS.md", "r", encoding="utf-8") as f:
    status = f.read()

# Update status
status = re.sub(
    r'\*\*Verdict:\*\* NOT production-hardened.*',
    "**Verdict:** Partially hardened (v1.1.0). Recent loop execution fixed 8 critical audit items (Security headers, Zod validation, missing OG tags, footer contrast, tracking consent fallback). Still blocked on apex domain routing (OPS-001).",
    status,
    flags=re.DOTALL | re.MULTILINE
)

# Update implemented so far
status = status.replace("Implemented so far: 0/20.", "Implemented so far: 8/20.")

with open("docs/PROJECT_STATUS.md", "w", encoding="utf-8") as f:
    f.write(status)
