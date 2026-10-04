import re
with open("app/page.tsx", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace(
    "text-[clamp(2.25rem,5vw+1rem,4.5rem)]",
    "text-[clamp(1.5rem,3.5vw,2.75rem)] whitespace-nowrap"
)

text = text.replace(
    "text-lg md:text-xl text-stone-600 dark:text-stone-400 max-w-3xl",
    "text-base md:text-[1.05rem] text-stone-600 dark:text-stone-400 max-w-7xl"
)

with open("app/page.tsx", "w", encoding="utf-8") as f:
    f.write(text)
