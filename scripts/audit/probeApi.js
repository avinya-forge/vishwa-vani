const https = require('https');
const fs = require('fs');
const path = require('path');

https.get('https://vedicscriptures.github.io/slok/1/1/', (resp) => {
  let data = '';
  resp.on('data', (chunk) => { data += chunk; });
  resp.on('end', () => {
    fs.writeFileSync(path.join(__dirname, 'fullProbe.json'), JSON.stringify(JSON.parse(data), null, 2), 'utf8');
    console.log('Results saved to fullProbe.json');
  });
}).on('error', (err) => {
  console.log('Error:', err.message);
});
