import re
with open("components/layout/Header.tsx", "r", encoding="utf-8") as f:
    text = f.read()

text = re.sub(r"<span.*?book\.icon.*?</span>\s*<div>", "<div className=\"w-full\">", text)
text = re.sub(r"<span className=\"text-\[13px\]\">.*?</span>\s*", "", text)
text = re.sub(r"<span.*?</span> Begin Reading", "Begin Reading", text)

with open("components/layout/Header.tsx", "w", encoding="utf-8") as f:
    f.write(text)
