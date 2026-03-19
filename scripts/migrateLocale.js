const fs = require('fs');
const path = require('path');

const rootDir = 'd:/Code/avinya-forge/vishwa-vani';
const appDir = path.join(rootDir, 'app');
const localeDir = path.join(appDir, '[locale]');

function forceMove(src, dest) {
    try {
        if (fs.lstatSync(src).isDirectory()) {
            if (!fs.existsSync(dest)) fs.mkdirSync(dest);
            fs.readdirSync(src).forEach(item => forceMove(path.join(src, item), path.join(dest, item)));
            fs.rmSync(src, { recursive: true, force: true });
        } else {
            fs.copyFileSync(src, dest);
            fs.unlinkSync(src);
        }
        console.log(`Successfully moved ${src} to ${dest}`);
    } catch (e) {
        console.error(`Failed to move ${src}:`, e.message);
    }
}

if (!fs.existsSync(localeDir)) {
  console.log('[locale] directory not found at', localeDir);
  process.exit(0);
}

const items = fs.readdirSync(localeDir);
items.forEach(item => {
  const src = path.join(localeDir, item);
  const dest = path.join(appDir, item);
  forceMove(src, dest);
});

console.log('Migration attempt complete.');
