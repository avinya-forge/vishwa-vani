const https = require('https');
const fs = require('fs');
const path = require('path');

const URL = 'https://raw.githubusercontent.com/Anishnemali/Chat-with-author/main/data/maha_chunks.json';
const DEST = path.join(__dirname, '../data/mahabharata_full.json');

console.log(`Downloading ${URL} to ${DEST}...`);

const file = fs.createWriteStream(DEST);
https.get(URL, (response) => {
  response.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Download complete.');
    process.exit(0);
  });
}).on('error', (err) => {
  fs.unlink(DEST);
  console.error(`Error downloading: ${err.message}`);
  process.exit(1);
});
