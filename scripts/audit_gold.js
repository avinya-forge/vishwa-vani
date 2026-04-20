#!/usr/bin/env node
/**
 * PIPE-003: Gold-tier Completeness Audit
 *
 * Post-promotion report: verse counts, layer coverage per author/language,
 * placeholder detection, and readiness score. Run before flipping available:true.
 *
 * Usage:
 *   node scripts/audit_gold.js <book-slug>
 *   node scripts/audit_gold.js --all
 *
 * Exit codes: 0 = audit complete (check output), 1 = error reading data
 */

const fs = require('fs');
const path = require('path');

const GOLD_DIR  = path.join(__dirname, '..', 'data', '3-gold');
const MANIFEST  = path.join(__dirname, '..', 'data', 'manifest.json');

const PLACEHOLDER_PATTERNS = [
  /^\[/,
  /\[PLACEHOLDER_/i,
  /TBD_CONTENT/i,
  /TODO_LAYER/i,
  /LOREM IPSUM/i,
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function isPlaceholder(str) {
  if (!str || typeof str !== 'string') return false;
  return PLACEHOLDER_PATTERNS.some(p => p.test(str.trim()));
}

function auditFile(filePath) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const verses = Array.isArray(data) ? data : (data.verses || []);

  const stats = {
    verseCount: verses.length,
    authorsFound: new Set(),
    languagesFound: new Set(),
    layerCoverage: {},   // author -> { total, valid, placeholder }
    versesWithNoValidLayer: 0,
    versesWithMissingOriginal: 0,
    versesWithMissingTranslit: 0,
  };

  for (const verse of verses) {
    if (!verse.original || isPlaceholder(verse.original)) stats.versesWithMissingOriginal++;
    if (!verse.transliteration || isPlaceholder(verse.transliteration)) stats.versesWithMissingTranslit++;

    const layers = Array.isArray(verse.layers) ? verse.layers : [];
    let hasValidLayer = false;

    for (const layer of layers) {
      const author = layer.author || 'unknown';
      const lang   = layer.lang   || 'unknown';
      stats.authorsFound.add(author);
      stats.languagesFound.add(lang);

      if (!stats.layerCoverage[author]) {
        stats.layerCoverage[author] = { total: 0, valid: 0, placeholder: 0, langs: new Set() };
      }
      stats.layerCoverage[author].total++;
      stats.layerCoverage[author].langs.add(lang);

      const content = String(layer.content || '');
      if (isPlaceholder(content) || content.trim().length < 20) {
        stats.layerCoverage[author].placeholder++;
      } else {
        stats.layerCoverage[author].valid++;
        hasValidLayer = true;
      }
    }

    if (!hasValidLayer) stats.versesWithNoValidLayer++;
  }

  return stats;
}

function printBookAudit(bookSlug) {
  const bookDir = path.join(GOLD_DIR, bookSlug);
  if (!fs.existsSync(bookDir)) {
    console.error(`✗ No gold data for ${bookSlug} at: ${bookDir}`);
    return false;
  }

  const files = fs.readdirSync(bookDir)
    .filter(f => f.endsWith('.json') && !f.endsWith('.meta.json'))
    .sort();

  if (files.length === 0) {
    console.error(`✗ ${bookSlug}: no JSON shards in gold directory`);
    return false;
  }

  console.log(`\n${'═'.repeat(60)}`);
  console.log(` GOLD AUDIT: ${bookSlug}`);
  console.log(`${'═'.repeat(60)}`);

  const combined = {
    totalVerses: 0,
    allAuthors: new Set(),
    allLanguages: new Set(),
    allLayerCoverage: {},
    versesWithNoValidLayer: 0,
    versesWithMissingOriginal: 0,
    versesWithMissingTranslit: 0,
  };

  for (const file of files) {
    const stats = auditFile(path.join(bookDir, file));
    combined.totalVerses += stats.verseCount;
    combined.versesWithNoValidLayer += stats.versesWithNoValidLayer;
    combined.versesWithMissingOriginal += stats.versesWithMissingOriginal;
    combined.versesWithMissingTranslit += stats.versesWithMissingTranslit;

    stats.authorsFound.forEach(a => combined.allAuthors.add(a));
    stats.languagesFound.forEach(l => combined.allLanguages.add(l));

    for (const [author, cov] of Object.entries(stats.layerCoverage)) {
      if (!combined.allLayerCoverage[author]) {
        combined.allLayerCoverage[author] = { total: 0, valid: 0, placeholder: 0, langs: new Set() };
      }
      combined.allLayerCoverage[author].total       += cov.total;
      combined.allLayerCoverage[author].valid        += cov.valid;
      combined.allLayerCoverage[author].placeholder  += cov.placeholder;
      cov.langs.forEach(l => combined.allLayerCoverage[author].langs.add(l));
    }
  }

  // Check manifest
  let manifestStatus = 'NOT IN MANIFEST';
  let manifestVerseCount = '?';
  try {
    const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
    const entry = manifest.books.find(b => b.book_id === bookSlug);
    if (entry) {
      manifestStatus = entry.status || 'NO STATUS';
      manifestVerseCount = entry.total_verses ?? '?';
    }
  } catch {}

  // Print summary
  console.log(`\n  Manifest status : ${manifestStatus}`);
  console.log(`  Manifest verses : ${manifestVerseCount}`);
  console.log(`  Actual verses   : ${combined.totalVerses}`);
  console.log(`  Files audited   : ${files.length}`);

  if (String(manifestVerseCount) !== String(combined.totalVerses)) {
    console.log(`  ⚠ Verse count MISMATCH — manifest says ${manifestVerseCount}, files have ${combined.totalVerses}`);
  }

  console.log(`\n  Languages found : ${[...combined.allLanguages].join(', ')}`);
  console.log(`  Authors found   : ${[...combined.allAuthors].join(', ')}`);

  console.log(`\n  Layer Coverage by Author:`);
  for (const [author, cov] of Object.entries(combined.allLayerCoverage)) {
    const validPct  = combined.totalVerses > 0
      ? Math.round((cov.valid  / combined.totalVerses) * 100)
      : 0;
    const phPct     = cov.total > 0
      ? Math.round((cov.placeholder / cov.total) * 100)
      : 0;
    const langs = [...cov.langs].join('/');
    const status = phPct > 50 ? '✗ PLACEHOLDER-HEAVY' : validPct >= 90 ? '✓' : '⚠ PARTIAL';
    console.log(`    ${status.padEnd(20)} ${author.padEnd(25)} valid: ${String(validPct + '%').padEnd(5)}  placeholder: ${phPct}%  langs: ${langs}`);
  }

  console.log(`\n  Verses with no valid layer   : ${combined.versesWithNoValidLayer}`);
  console.log(`  Verses missing 'original'    : ${combined.versesWithMissingOriginal}`);
  console.log(`  Verses missing transliteration: ${combined.versesWithMissingTranslit}`);

  // Readiness score
  const issues = combined.versesWithNoValidLayer + combined.versesWithMissingOriginal;
  const readyPct = combined.totalVerses > 0
    ? Math.round(((combined.totalVerses - issues) / combined.totalVerses) * 100)
    : 0;

  console.log(`\n  ── Readiness: ${readyPct}% ──`);
  if (readyPct === 100) {
    console.log(`  ✓ READY — safe to set available:true in lib/texts.ts`);
  } else if (readyPct >= 80) {
    console.log(`  ⚠ PARTIAL — review issues above before setting available:true`);
  } else {
    console.log(`  ✗ NOT READY — ${100 - readyPct}% of verses have critical issues`);
  }

  return true;
}

// ── Main ──────────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: node scripts/audit_gold.js <book-slug> | --all');
    console.log('');
    console.log('Available gold books:');
    if (fs.existsSync(GOLD_DIR)) {
      fs.readdirSync(GOLD_DIR).forEach(b => console.log(`  ${b}`));
    }
    process.exit(0);
  }

  const booksToAudit = args[0] === '--all'
    ? fs.readdirSync(GOLD_DIR).filter(b => fs.statSync(path.join(GOLD_DIR, b)).isDirectory())
    : args;

  console.log('PIPE-003: audit_gold.js');
  console.log('Post-promotion completeness report for Gold-tier data.');

  for (const book of booksToAudit) {
    printBookAudit(book);
  }

  console.log('\n');
}

main();
