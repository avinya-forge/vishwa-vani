const fs = require('fs');
const path = require('path');

const dataDir = path.join(process.cwd(), 'data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));

let summary = {
  total: files.length,
  legacy: 0,
  nvf: 0,
  mixed: 0,
  errors: 0,
  details: []
};

files.forEach(file => {
  try {
    const content = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));
    if (!Array.isArray(content)) {
      summary.errors++;
      summary.details.push({ file, error: 'Not an array' });
      return;
    }

    let nvfCount = 0;
    let legacyCount = 0;

    content.forEach(v => {
      if (v.id && v.original && v.layers) nvfCount++;
      else if (v.slok || v.siva || v.rams) legacyCount++;
    });

    if (nvfCount === content.length) {
      summary.nvf++;
    } else if (legacyCount === content.length) {
      summary.legacy++;
    } else {
      summary.mixed++;
    }
  } catch (e) {
    summary.errors++;
    summary.details.push({ file, error: e.message });
  }
});

console.log(JSON.stringify(summary, null, 2));
