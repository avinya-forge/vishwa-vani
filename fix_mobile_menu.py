with open("components/layout/Header.tsx", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace("<span className=\"text-xl opacity-80\">{book.icon || '📜'}</span>", "")
text = text.replace(">🔍 Deep Search<", ">Deep Search<")
text = text.replace(">🧪 Vedic Labs<", ">Vedic Labs<")
text = text.replace(">🛣️ Roadmap<", ">Roadmap<")
text = text.replace(">📜 Begin Reading<", ">Begin Reading<")

with open("components/layout/Header.tsx", "w", encoding="utf-8") as f:
    f.write(text)
