const fs = require('fs');
const path = require('path');

// 1. Patch test-exclude/index.js for Glob v10+ compatibility
const testExcludePath = path.join(__dirname, '..', 'node_modules', 'test-exclude', 'index.js');
if (fs.existsSync(testExcludePath)) {
  let content = fs.readFileSync(testExcludePath, 'utf8');
  if (content.includes("const glob = promisify(require('glob'));")) {
    content = content.replace(
      "const glob = promisify(require('glob'));",
      "const _glob = require('glob');\nconst glob = typeof _glob === 'function' ? promisify(_glob) : _glob.glob;\nif (glob && !glob.sync && _glob.sync) glob.sync = _glob.sync;"
    );
    fs.writeFileSync(testExcludePath, content, 'utf8');
    console.log('[Patch] Patched test-exclude/index.js for glob v10+ compatibility');
  }
}

// 2. Patch @jest/reporters/build/CoverageReporter.js for Glob v10+ compatibility
const coverageReporterPath = path.join(__dirname, '..', 'node_modules', '@jest', 'reporters', 'build', 'CoverageReporter.js');
if (fs.existsSync(coverageReporterPath)) {
  let content = fs.readFileSync(coverageReporterPath, 'utf8');
  if (content.includes(".default.sync(absoluteThresholdGroup)")) {
    content = content.replace(
      "_glob()\n                  .default.sync(absoluteThresholdGroup)",
      "((_glob().default && _glob().default.sync) || _glob().sync || _glob().globSync)(absoluteThresholdGroup)"
    );
    fs.writeFileSync(coverageReporterPath, content, 'utf8');
    console.log('[Patch] Patched @jest/reporters CoverageReporter.js for glob v10+ compatibility');
  }
}
