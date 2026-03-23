const fs = require('fs');
const path = require('path');
const https = require('https');

const chapterVerseCounts = [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 35, 27, 20, 24, 28, 78];

async function fetchVerse(chapter, verse) {
  return new Promise((resolve) => {
    https.get(`https://vedicscriptures.github.io/slok/${chapter}/${verse}/`, (resp) => {
      let data = '';
      resp.on('data', (chunk) => { data += chunk; });
      resp.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', (err) => {
      console.log(`Failed Ch ${chapter} V ${verse}:`, err.message);
      resolve(null);
    });
  });
}

async function fetchAllChapters() {
  const outDir = path.join(__dirname, '../data');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  for (let c = 1; c <= 18; c++) {
    const outPath = path.join(outDir, `bhagavad_gita_chapter_${c}.json`);
    if (fs.existsSync(outPath)) {
      console.log(`Chapter ${c} already exists, skipping.`);
      continue;
    }
    console.log(`Fetching Chapter ${c}...`);
    const versesToFetch = chapterVerseCounts[c - 1];
    
    const promises = [];
    for (let v = 1; v <= versesToFetch; v++) {
      promises.push(fetchVerse(c, v));
    }
    
    let chapterData = await Promise.all(promises);
    chapterData = chapterData.filter(d => d !== null); // remove failed ones
    chapterData.sort((a, b) => a.verse - b.verse); // sort them just in case
    
    fs.writeFileSync(outPath, JSON.stringify(chapterData, null, 2));
    console.log(`Successfully wrote ${chapterData.length} verses for Chapter ${c}`);
  }
}

fetchAllChapters();
