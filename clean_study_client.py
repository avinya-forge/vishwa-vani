import re

with open("components/shloka/study-client.tsx", "r", encoding="utf-8") as f:
    text = f.read()

# Remove the emoji characters from the icon fields
text = re.sub(r"icon:\s*'[^']*'", "icon: ''", text)

with open("components/shloka/study-client.tsx", "w", encoding="utf-8") as f:
    f.write(text)
