const { exec } = require('child_process');
const fs = require('fs');

exec('npm run build', (error, stdout, stderr) => {
  fs.writeFileSync('build_debug.txt', stdout + '\n\nSTDERR:\n\n' + stderr);
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
});
