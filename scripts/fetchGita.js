const fs = require('fs');
const path = require('path');

async function fetchChapter1() {
  const chapter1Data = [];
  const maxVerses = 47; // Chapter 1 has 47 verses

  console.log("Fetching Chapter 1...");

  for (let i = 1; i <= maxVerses; i++) {
    try {
      const response = await fetch(`https://vedicscriptures.github.io/slok/1/${i}/`);
      if (response.ok) {
        const data = await response.json();
        chapter1Data.push(data);
        console.log(`Fetched verse ${i}`);
      } else {
        console.log(`Failed to fetch verse ${i}: Status ${response.status}`);
      }
    } catch (e) {
      console.log(`Error fetching verse ${i}: ${e.message}`);
    }
  }

  const outDir = path.join(__dirname, '../data');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outPath = path.join(outDir, 'bhagavad_gita_chapter_1.json');
  fs.writeFileSync(outPath, JSON.stringify(chapter1Data, null, 2));
  console.log(`Successfully wrote ${chapter1Data.length} verses to ${outPath}`);
}

fetchChapter1();
