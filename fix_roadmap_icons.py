import re

with open("app/roadmap/page.tsx", "r", encoding="utf-8") as f:
    text = f.read()

# Add ArrowUp inside empty upvote button
text = re.sub(
    r'(title="Upvote to raise priority"\s*>\s*)</button>',
    r'\1<ArrowUp className="w-5 h-5" /></button>',
    text
)

# Add ArrowDown inside empty downvote button
text = re.sub(
    r'(title="Downvote to lower priority"\s*>\s*)</button>',
    r'\1<ArrowDown className="w-5 h-5" /></button>',
    text
)

# Replace remaining dY"- Begin Reading
text = re.sub(
    r'dY"-\s*Begin Reading',
    r'<BookOpen className="w-4 h-4" /> Begin Reading',
    text
)

with open("app/roadmap/page.tsx", "w", encoding="utf-8") as f:
    f.write(text)
