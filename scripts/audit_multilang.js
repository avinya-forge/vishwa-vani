#!/usr/bin/env node
/**
 * audit_multilang.js — Per-verse multilingual content quality audit
 *
 * Checks Gold-tier data for two failure modes that pass isValidCommentaryContent()
 * but indicate poor data quality:
 *   1. REPEATED CONTENT — same HI or MR layer text shared across multiple verses
 *      in the same chapter (chapter-level summary repeated, not verse-specific)
 *   2. THIN CONTENT — layers < 80 chars (technically pass the 20-char gate but
 *      are too brief to be meaningful commentary)
 *
 * Usage:
 *   node scripts/audit_multilang.js <book-slug>
 *   node scripts/audit_multilang.js bhagavad-gita
 *   node scripts/audit_multilang.js --all
 *
 * Exit codes:
 *   0 — all layers unique and ≥ 80 chars
 *   1 — violations found (see output for details)
 */

'use strict';
const fs = require('fs');
const path = require('path');

const BASE_DIR = path.resolve(__dirname, '..');
const GOLD_DIR = path.join(BASE_DIR, 'data', '3-gold');

const THIN_THRESHOLD = 80;
const LANGS_TO_CHECK = ['hi', 'mr'];

function getAllJsonFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = require('path').join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllJsonFiles(filePath, fileList);
    } else if (file.endsWith('.json') && !file.endsWith('.meta.json')) {
      fileList.push(filePath);
    }
  }
  return fileList.sort();
}

function auditBook(bookSlug) {
  const bookDir = path.join(GOLD_DIR, bookSlug);
  if (!fs.existsSync(bookDir)) {
    console.error(`  ✗ Book not found in gold tier: ${bookSlug}`);
    return { violations: 1 };
  }

  const files = getAllJsonFiles(bookDir);

  if (files.length === 0) {
    console.error(`  ✗ No JSON files found in ${bookDir}`);
    return { violations: 1 };
  }

  let totalVerses = 0;
  let totalViolations = 0;
  const bookRepeatedMap = {};
  const bookThinMap = {};

  for (const file of files) {
    const filePath = file;
    let verses;
    try {
      verses = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {
      console.error(`  ✗ JSON parse error in ${file}: ${e.message}`);
      totalViolations++;
      continue;
    }

    if (!Array.isArray(verses)) {
      console.error(`  ✗ Expected array in ${file}`);
      totalViolations++;
      continue;
    }

    totalVerses += verses.length;

    // Build per-chapter, per-lang, per-author content fingerprint map
    // Structure: { chapterKey -> { lang -> { author -> [ { verse, content } ] } } }
    const chapterMap = {};

    for (const verse of verses) {
      const chapterKey = `ch${verse.chapter}`;
      if (!chapterMap[chapterKey]) chapterMap[chapterKey] = {};

      for (const layer of (verse.layers || [])) {
        if (!LANGS_TO_CHECK.includes(layer.lang)) continue;
        if (!layer.content || typeof layer.content !== 'string') continue;

        const lang = layer.lang;
        const author = layer.author || 'unknown';

        if (!chapterMap[chapterKey][lang]) chapterMap[chapterKey][lang] = {};
        if (!chapterMap[chapterKey][lang][author]) chapterMap[chapterKey][lang][author] = [];

        chapterMap[chapterKey][lang][author].push({
          verse: verse.verse,
          content: layer.content.trim()
        });
      }
    }

    // Check for repeated content within same chapter/lang/author group
    const fileRepeated = [];
    const fileThin = [];

    for (const [chapterKey, langMap] of Object.entries(chapterMap)) {
      for (const [lang, authorMap] of Object.entries(langMap)) {
        for (const [author, entries] of Object.entries(authorMap)) {
          // Check thin layers
          for (const entry of entries) {
            if (entry.content.length < THIN_THRESHOLD) {
              fileThin.push({
                chapter: chapterKey,
                verse: entry.verse,
                lang,
                author,
                length: entry.content.length
              });
            }
          }

          // Check repeated content
          const contentGroups = {};
          for (const entry of entries) {
            if (!contentGroups[entry.content]) contentGroups[entry.content] = [];
            contentGroups[entry.content].push(entry.verse);
          }

          for (const [content, verseNums] of Object.entries(contentGroups)) {
            if (verseNums.length > 1) {
              fileRepeated.push({
                chapter: chapterKey,
                lang,
                author,
                count: verseNums.length,
                verses: verseNums,
                preview: content.slice(0, 80) + (content.length > 80 ? '…' : '')
              });
            }
          }
        }
      }
    }

    const fileViolations = fileRepeated.length + fileThin.length;
    const statusIcon = fileViolations === 0 ? '✓' : '✗';
    console.log(`  ${statusIcon} ${file} — ${verses.length} verses`);

    if (fileRepeated.length > 0) {
      console.log(`      REPEATED CONTENT (${fileRepeated.length} groups):`);
      for (const r of fileRepeated) {
        console.log(`        [${r.chapter}] lang:${r.lang} author:${r.author} — "${r.preview}"`);
        console.log(`          shared by ${r.count} verses: ${r.verses.slice(0, 10).join(', ')}${r.verses.length > 10 ? '…' : ''}`);
      }
      bookRepeatedMap[file] = fileRepeated;
    }

    if (fileThin.length > 0) {
      console.log(`      THIN LAYERS (<${THIN_THRESHOLD} chars, ${fileThin.length} layers):`);
      for (const t of fileThin.slice(0, 5)) {
        console.log(`        [${t.chapter}] verse:${t.verse} lang:${t.lang} author:${t.author} length:${t.length}`);
      }
      if (fileThin.length > 5) {
        console.log(`        ... and ${fileThin.length - 5} more thin layers`);
      }
      bookThinMap[file] = fileThin;
    }

    totalViolations += fileViolations;
  }

  const repeatedGroups = Object.values(bookRepeatedMap).reduce((sum, a) => sum + a.length, 0);
  const thinLayers = Object.values(bookThinMap).reduce((sum, a) => sum + a.length, 0);

  console.log('');
  console.log(`  Summary: ${totalVerses} verses | repeated-content groups: ${repeatedGroups} | thin layers: ${thinLayers}`);

  if (totalViolations === 0) {
    console.log('  ✓ PASS — all HI/MR layers are unique and ≥ 80 chars');
  } else {
    console.log(`  ✗ FAIL — ${totalViolations} violations found`);
    if (repeatedGroups > 0) {
      console.log('    → Fix: replace chapter-summary content with verse-specific commentary');
      console.log('    → Use: node scripts/fix_multilang_verse_level.js --book <book-slug>');
    }
    if (thinLayers > 0) {
      console.log('    → Fix: expand thin layers to ≥ 80 chars per gold standard');
    }
  }

  return { violations: totalViolations, repeatedGroups, thinLayers, totalVerses };
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: node scripts/audit_multilang.js <book-slug> | --all');
    console.log('');
    console.log('Checks HI/MR layers for repeated chapter-summaries and thin content.');
    console.log('Exit 0 = all unique + ≥80 chars. Exit 1 = violations found.');
    console.log('');
    if (fs.existsSync(GOLD_DIR)) {
      console.log('Available gold books:');
      fs.readdirSync(GOLD_DIR).forEach(b => {
        if (fs.statSync(path.join(GOLD_DIR, b)).isDirectory()) {
          console.log(`  ${b}`);
        }
      });
    }
    process.exit(0);
  }

  const books = args[0] === '--all'
    ? fs.readdirSync(GOLD_DIR).filter(b => fs.statSync(path.join(GOLD_DIR, b)).isDirectory())
    : args;

  console.log('audit_multilang.js — HI/MR per-verse content uniqueness audit');
  console.log(`Checking langs: ${LANGS_TO_CHECK.join(', ')} | thin threshold: ${THIN_THRESHOLD} chars`);
  console.log('');

  let totalViolations = 0;

  for (const book of books) {
    console.log(`Book: ${book}`);
    const result = auditBook(book);
    totalViolations += result.violations;
    console.log('');
  }

  if (totalViolations === 0) {
    console.log('All books PASSED multilang audit.');
    process.exit(0);
  } else {
    console.log(`FAILED: ${totalViolations} total violations across all audited books.`);
    process.exit(1);
  }
}

main();
