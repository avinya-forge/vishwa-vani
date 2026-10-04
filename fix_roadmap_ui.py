import re

with open("app/roadmap/page.tsx", "r", encoding="utf-8") as f:
    text = f.read()

# Add Lucide react imports if not exist
if "import { ArrowUp, ArrowDown, Search, BookOpen, AlertCircle } from 'lucide-react'" not in text:
    text = text.replace("import Link from 'next/link'", "import Link from 'next/link'\nimport { ArrowUp, ArrowDown, Search, BookOpen, AlertCircle } from 'lucide-react'")

# Replace emojis with Lucide React components
text = re.sub(r'dY\?\>\?,?', '<BookOpen className="w-5 h-5 text-orange-600" />', text)
text = re.sub(r'dY"\? Search roadmap\.\.\.', 'Search roadmap...', text)
text = re.sub(r'<span className="text-xl sm:text-2xl mr-2">.*?</span>', '<Search className="w-5 h-5 text-stone-400 mr-2" />', text)
text = re.sub(r'dY"- Begin Reading', '<BookOpen className="w-4 h-4" /> Begin Reading', text)
text = re.sub(r'>\s*-\s*</button>', '><ArrowUp className="w-5 h-5" /></button>', text)
text = re.sub(r'>\s*-\s*</button>', '><ArrowDown className="w-5 h-5" /></button>', text)
text = re.sub(r'<span className="text-4xl block mb-4">.*?</span>', '<AlertCircle className="w-12 h-12 text-stone-300 dark:text-stone-700 mx-auto mb-4" />', text)

with open("app/roadmap/page.tsx", "w", encoding="utf-8") as f:
    f.write(text)
