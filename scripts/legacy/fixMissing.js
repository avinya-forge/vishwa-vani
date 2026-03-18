const fs = require('fs');
const path = require('path');
const https = require('https');

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

async function fixMissing() {
  const missing = [
    { c: 12, v: 17 }, { c: 12, v: 6 }, { c: 12, v: 5 },
    { c: 13, v: 27 }, { c: 13, v: 25 },
    { c: 15, v: 20 }, { c: 15, v: 12 }
  ];

  for (const item of missing) {
    const filePath = path.join(__dirname, `../data/bhagavad_gita_chapter_${item.c}.json`);
    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Check if verse is already there somehow
    if (!data.find(d => d.verse === item.v)) {
      console.log(`Fetching missing Ch ${item.c} V ${item.v}...`);
      const vData = await fetchVerse(item.c, item.v);
      if (vData) {
        data.push(vData);
        data.sort((a, b) => a.verse - b.verse);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`Fixed Ch ${item.c} V ${item.v}!`);
      } else {
        console.log(`Still failed Ch ${item.c} V ${item.v}...`);
      }
    }
  }
}

fixMissing();
