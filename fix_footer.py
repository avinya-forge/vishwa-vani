import re

with open("components/layout/Footer.tsx", "r", encoding="utf-8") as f:
    text = f.read()

# Replace low contrast classes
text = text.replace("!text-stone-500", "!text-stone-300")
text = text.replace("!text-stone-400", "!text-stone-300")
text = text.replace("text-stone-400", "text-stone-300")
text = text.replace("text-stone-300", "text-stone-200") # bump the existing 300 to 200 for better hierarchy

with open("components/layout/Footer.tsx", "w", encoding="utf-8") as f:
    f.write(text)
