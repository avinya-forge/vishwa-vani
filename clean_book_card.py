import re

with open("app/page.tsx", "r", encoding="utf-8") as f:
    text = f.read()

# Replace the coming soon block
text = re.sub(
    r'\{isAvailable\s*\?\s*<span className="text-\[9px\] font-bold text-green-600 bg-green-50 px-2 py-0\.5 rounded-md">Available</span>\s*:\s*<span className="text-\[9px\] font-bold text-stone-400 bg-stone-50 px-2 py-0\.5 rounded-md">Coming Soon</span>\s*\}',
    r"""{isAvailable && <span className="text-[9px] font-bold text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 rounded-md">100% GOLD</span>}""",
    text
)

# Remove childBooks block
child_block_pattern = r'\{childBooks\.length > 0 && \(.*?</div>\s*\)\}'
text = re.sub(child_block_pattern, '', text, flags=re.DOTALL)

# Remove parentBook block
parent_block_pattern = r'\{parentBook && parentBook\.available && \(.*?</div>\s*\)\}'
text = re.sub(parent_block_pattern, '', text, flags=re.DOTALL)

with open("app/page.tsx", "w", encoding="utf-8") as f:
    f.write(text)
