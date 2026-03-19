const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const targets = [
  path.join(root, 'app', '[locale]'),
  path.join(root, 'data'),
  path.join(root, 'tmp'),
];

targets.forEach(t => {
  if (fs.existsSync(t)) {
    console.log(`DELETING: ${t}`);
    fs.rmSync(t, { recursive: true, force: true });
  } else {
    console.log(`NOT FOUND: ${t}`);
  }
});
