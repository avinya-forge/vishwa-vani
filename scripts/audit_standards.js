#!/usr/bin/env node
/**
 * audit_standards.js — Vishwa-Vani comprehensive data standards checker
 *
 * Validates data files against docs/data-standards.md for each tier.
 * For gold tier: enforces all gold-checklist requirements.
 * For silver tier: enforces minimum NVF structure + blocks corrupted filler.
 *
 * Usage:
 *   node scripts/audit_standards.js                  # audit all gold books
 *   node scripts/audit_standards.js --all            # audit all tiers
 *   node scripts/audit_standards.js bhagavad-gita    # one gold book
 *   node scripts/audit_standards.js --silver         # silver tier only
 *   node scripts/audit_standards.js --silver bhagavata-purana
 *
 * Exit codes:
 *   0 — all checks pass
 *   1 — violations found (check output)
 */

'use strict';
const fs   = require('fs');
const path = require('path');

const BASE     = path.resolve(__dirname, '..');
const GOLD_DIR = path.join(BASE, 'data', '3-gold');
const SILV_DIR = path.join(BASE, 'data', '2-silver');
const REGISTRY_PATH = path.join(BASE, 'lib', 'vedic-labs-registry.ts');

// ─── Vedic Labs Registry parser (STD-003) ───────────────────────────────────

/**
 * Parse the VEDIC_LABS_REGISTRY from the TypeScript source file.
 * Returns array of { id, books, chapters, available } objects.
 * Uses text extraction — no runtime TS compilation needed.
 */
function loadLabRegistry() {
  if (!fs.existsSync(REGISTRY_PATH)) return [];
  const src = fs.readFileSync(REGISTRY_PATH, 'utf8');

  const entries = [];
  // Match each object block between { ... } inside the array literal
  // Strategy: split on top-level commas between object entries
  const arrayMatch = src.match(/VEDIC_LABS_REGISTRY[^=]*=\s*\[([\s\S]*?)\];?\s*\n\/\*\*/);
  if (!arrayMatch) return [];

  const arrayText = arrayMatch[1];
  // Split into individual entry blocks by matching '{' ... '}'
  const entryRegex = /\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g;
  let m;
  while ((m = entryRegex.exec(arrayText)) !== null) {
    const block = m[1];

    const idM      = block.match(/\bid\s*:\s*['"]([^'"]+)['"]/);
    const availM   = block.match(/\bavailable\s*:\s*(true|false)/);
    const booksM   = block.match(/\bbooks\s*:\s*\[([^\]]*)\]/);
    const chapsM   = block.match(/\bchapters\s*:\s*\[([^\]]*)\]/);

    if (!idM) continue;

    const books = booksM
      ? booksM[1].split(',').map(s => s.trim().replace(/['"]/g, '')).filter(Boolean)
      : [];
    const chapters = chapsM
      ? chapsM[1].split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n))
      : [];

    const protoM = block.match(/\bisPrototype\s*:\s*(true|false)/);

    entries.push({
      id: idM[1],
      available: availM ? availM[1] === 'true' : false,
      isPrototype: protoM ? protoM[1] === 'true' : false,
      books,
      chapters,
    });
  }
  return entries;
}

let _labRegistry = null;
function getLabRegistry() {
  if (!_labRegistry) _labRegistry = loadLabRegistry();
  return _labRegistry;
}

/**
 * STD-003: For a given book slug, check every chapter in goldFiles for lab coverage.
 * Returns an array of { chapter, type: 'LABS_NO_COVERAGE' } violations.
 */
function auditLabsCoverage(slug, chapterNumbers) {
  const registry = getLabRegistry();
  // Only non-prototype, available apps count as real lab coverage
  const appsForBook = registry.filter(app =>
    app.available && !app.isPrototype && (app.books.length === 0 || app.books.includes(slug))
  );

  const violations = [];
  for (const ch of chapterNumbers) {
    const hasApp = appsForBook.some(app => app.chapters.length === 0 || app.chapters.includes(ch));
    if (!hasApp) {
      violations.push({ ref: `${slug}/ch${ch}`, type: 'LABS_NO_COVERAGE', chapter: ch });
    }
  }
  return violations;
}

// ─── Violation constants ────────────────────────────────────────────────────

// Blocked at ALL tiers — indicate corrupted/mock data
const CORRUPTED_PATTERNS = [
  /^Mock Verse/i,
  /^Mock Transliteration/i,
  /THIS IS A GENERIC PLACEHOLDER/i,
  /INSERTED TO SATISFY THE MINIMUM LENGTH/i,
];

// Blocked at GOLD tier (allowed at silver as in-progress markers)
const PLACEHOLDER_PATTERNS = [
  /^\s*\[/,              // any bracket-prefix content
  /\[PLACEHOLDER_/i,
  /TBD_CONTENT/i,
  /TODO_LAYER/i,
  /LOREM IPSUM/i,
];

const GOLD_MIN_ORIGINAL_LEN    = 10;
const GOLD_MIN_TRANSLIT_LEN    = 10;
const GOLD_MIN_TRANSLATION_LEN = 20;
const GOLD_MIN_MEANING_LEN     = 20;
const GOLD_MIN_LAYER_LEN       = 80;
const GOLD_MIN_AUTHORS         = 2;
const GOLD_REQUIRED_LANGS      = ['en', 'hi', 'mr'];

// ─── Helpers ────────────────────────────────────────────────────────────────

function isCorrupted(str) {
  if (!str || typeof str !== 'string') return false;
  return CORRUPTED_PATTERNS.some(p => p.test(str.trim()));
}

function isPlaceholder(str) {
  if (!str || typeof str !== 'string') return false;
  return PLACEHOLDER_PATTERNS.some(p => p.test(str.trim()));
}

function isInvalidContent(str) {
  return isCorrupted(str) || isPlaceholder(str);
}

const SCHOLARS_CONTENT = fs.readFileSync(path.join(__dirname, '..', 'lib', 'scholars.ts'), 'utf8');
const SINGLE_LANGUAGE_AUTHORS = new Set();
const entryRegex = /\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g;
let m;
while ((m = entryRegex.exec(SCHOLARS_CONTENT)) !== null) {
    const block = m[1];
    const idM = block.match(/\bid\s*:\s*['"]([^'"]+)['"]/);
    const isSingleLanguage = /single_language\s*:\s*true/.test(block);
    if (idM && isSingleLanguage) {
        SINGLE_LANGUAGE_AUTHORS.add(idM[1]);
    }
}

function short(str, n = 60) {
  const s = String(str || '').trim().replace(/\s+/g, ' ');
  return s.length > n ? s.slice(0, n) + '…' : s;
}

// ─── Silver audit ───────────────────────────────────────────────────────────

function auditSilverFile(filePath) {
  const violations = [];
  let verses;
  try {
    const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    verses = Array.isArray(raw) ? raw : (raw.verses || []);
  } catch (e) {
    return [{ type: 'PARSE_ERROR', msg: e.message }];
  }

  for (const verse of verses) {
    const ref = `v${verse.chapter}.${verse.verse}`;

    // Required fields
    if (!verse.id)              violations.push({ ref, type: 'MISSING_ID' });
    if (!verse.chapter)         violations.push({ ref, type: 'MISSING_CHAPTER' });
    if (verse.verse === undefined) violations.push({ ref, type: 'MISSING_VERSE_NUM' });

    // Original Sanskrit
    if (!verse.original || verse.original.trim().length < 5) {
      violations.push({ ref, type: 'MISSING_ORIGINAL', val: short(verse.original) });
    } else if (isCorrupted(verse.original)) {
      violations.push({ ref, type: 'CORRUPTED_ORIGINAL', val: short(verse.original) });
    }

    // Transliteration
    if (!verse.transliteration || verse.transliteration.trim().length < 5) {
      violations.push({ ref, type: 'MISSING_TRANSLIT', val: short(verse.transliteration) });
    } else if (isCorrupted(verse.transliteration)) {
      violations.push({ ref, type: 'CORRUPTED_TRANSLIT', val: short(verse.transliteration) });
    }

    // Layers
    if (!Array.isArray(verse.layers) || verse.layers.length === 0) {
      violations.push({ ref, type: 'NO_LAYERS' });
      continue;
    }

    let hasEnLayer = false;
    for (const layer of verse.layers) {
      if (!layer.author) violations.push({ ref, type: 'LAYER_NO_AUTHOR' });
      if (!layer.lang)   violations.push({ ref, type: 'LAYER_NO_LANG' });
      if (!layer.type)   violations.push({ ref, type: 'LAYER_NO_TYPE' });
      if (isCorrupted(layer.content)) {
        violations.push({ ref, type: 'LAYER_CORRUPTED', author: layer.author, lang: layer.lang, val: short(layer.content) });
      }
      if (layer.lang === 'en' && layer.content && !isCorrupted(layer.content)) {
        hasEnLayer = true;
      }
    }
    if (!hasEnLayer) violations.push({ ref, type: 'NO_EN_LAYER' });
  }

  return violations;
}

// ─── Gold audit ─────────────────────────────────────────────────────────────

function auditGoldFile(filePath) {
  const violations = [];
  let verses;
  try {
    const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    verses = Array.isArray(raw) ? raw : (raw.verses || []);
  } catch (e) {
    return [{ type: 'PARSE_ERROR', msg: e.message }];
  }

  // Track per-chapter repeated content
  const chapterContentMap = {}; // chapterKey → { author+lang → [content] }

  for (const verse of verses) {
    const ref = `v${verse.chapter}.${verse.verse}`;
    const ch  = `ch${verse.chapter}`;

    // ── Sanskrit core ──────────────────────────────────────────────────────
    if (!verse.original || verse.original.trim().length < GOLD_MIN_ORIGINAL_LEN) {
      violations.push({ ref, type: 'GOLD_MISSING_ORIGINAL', val: short(verse.original) });
    } else if (isInvalidContent(verse.original)) {
      violations.push({ ref, type: 'GOLD_INVALID_ORIGINAL', val: short(verse.original) });
    }

    if (!verse.transliteration || verse.transliteration.trim().length < GOLD_MIN_TRANSLIT_LEN) {
      violations.push({ ref, type: 'GOLD_MISSING_TRANSLIT', val: short(verse.transliteration) });
    } else if (isInvalidContent(verse.transliteration)) {
      violations.push({ ref, type: 'GOLD_INVALID_TRANSLIT', val: short(verse.transliteration) });
    }

    if (!verse.translation || verse.translation.trim().length < GOLD_MIN_TRANSLATION_LEN) {
      violations.push({ ref, type: 'GOLD_MISSING_TRANSLATION', val: short(verse.translation) });
    }

    if (!verse.meaning || verse.meaning.trim().length < GOLD_MIN_MEANING_LEN) {
      violations.push({ ref, type: 'GOLD_MISSING_MEANING', val: short(verse.meaning) });
    }

    // ── Layers ─────────────────────────────────────────────────────────────
    const layers = Array.isArray(verse.layers) ? verse.layers : [];
    const authorLangMap = {}; // author → Set of langs

    for (const layer of layers) {
      const key = `${layer.author}::${layer.lang}`;
      if (!authorLangMap[layer.author]) authorLangMap[layer.author] = new Set();
      authorLangMap[layer.author].add(layer.lang);

      const content = String(layer.content || '').trim();

      // Block invalid content in gold
      if (isInvalidContent(content)) {
        violations.push({ ref, type: 'GOLD_INVALID_LAYER_CONTENT', author: layer.author, lang: layer.lang, val: short(content) });
        continue;
      }

      // Min length
      if (content.length < GOLD_MIN_LAYER_LEN) {
        violations.push({ ref, type: 'GOLD_THIN_LAYER', author: layer.author, lang: layer.lang, len: content.length });
      }

      // Author metadata completeness
      if (!layer.author_name) violations.push({ ref, type: 'GOLD_MISSING_AUTHOR_NAME', author: layer.author, lang: layer.lang });
      if (!layer.author_label) violations.push({ ref, type: 'GOLD_MISSING_AUTHOR_LABEL', author: layer.author, lang: layer.lang });

      // Track for repeated content check
      if (!chapterContentMap[ch]) chapterContentMap[ch] = {};
      if (!chapterContentMap[ch][key]) chapterContentMap[ch][key] = [];
      chapterContentMap[ch][key].push({ verse: verse.verse, content });
    }

    // Verify required langs per author
    const authors = Object.keys(authorLangMap);
    if (authors.length < GOLD_MIN_AUTHORS) {
      violations.push({ ref, type: 'GOLD_INSUFFICIENT_AUTHORS', count: authors.length, need: GOLD_MIN_AUTHORS });
    }
    for (const author of authors) {
      for (const lang of GOLD_REQUIRED_LANGS) {
        if (!authorLangMap[author].has(lang)) {
          violations.push({ ref, type: 'GOLD_MISSING_LANG', author, lang });
        }
      }
    }

    // AI metadata
    if (!verse.ai_metadata) {
      violations.push({ ref, type: 'GOLD_MISSING_AI_METADATA' });
    } else {
      if (!Array.isArray(verse.ai_metadata.topics)) violations.push({ ref, type: 'GOLD_MISSING_TOPICS' });
      if (!verse.ai_metadata.fingerprint)           violations.push({ ref, type: 'GOLD_MISSING_FINGERPRINT' });
      if (!verse.ai_metadata.stats)                 violations.push({ ref, type: 'GOLD_MISSING_STATS' });
    }
  }

  // ── Repeated content check across chapter ──────────────────────────────
  for (const [ch, authorMap] of Object.entries(chapterContentMap)) {
    for (const [key, entries] of Object.entries(authorMap)) {
      const groups = {};
      for (const e of entries) {
        if (!groups[e.content]) groups[e.content] = [];
        groups[e.content].push(e.verse);
      }
      for (const [content, verseNums] of Object.entries(groups)) {
        if (verseNums.length > 1) {
          const [author, lang] = key.split('::');
          violations.push({
            ref: ch,
            type: 'GOLD_REPEATED_CONTENT',
            author, lang,
            count: verseNums.length,
            verses: verseNums.slice(0, 8),
            val: short(content)
          });
        }
      }
    }
  }

  return violations;
}

// ─── Printer ────────────────────────────────────────────────────────────────

function printViolations(violations, label) {
  if (violations.length === 0) {
    console.log(`  ✓ ${label}`);
    return;
  }
  console.log(`  ✗ ${label} — ${violations.length} violation(s)`);
  const grouped = {};
  for (const v of violations) {
    const k = v.type;
    if (!grouped[k]) grouped[k] = [];
    grouped[k].push(v);
  }
  for (const [type, items] of Object.entries(grouped)) {
    const sample = items.slice(0, 3).map(i => {
      const parts = [i.ref];
      if (i.author) parts.push(`author:${i.author}`);
      if (i.lang)   parts.push(`lang:${i.lang}`);
      if (i.val)    parts.push(`"${i.val}"`);
      if (i.len !== undefined) parts.push(`len:${i.len}`);
      if (i.verses) parts.push(`verses:[${i.verses.join(',')}]`);
      if (i.msg)    parts.push(i.msg);
      return parts.join(' ');
    }).join('\n        ');
    console.log(`    [${type}] ×${items.length}`);
    console.log(`        ${sample}`);
    if (items.length > 3) console.log(`        … and ${items.length - 3} more`);
  }
}

function getAllJsonFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = require('path').join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllJsonFiles(filePath, fileList);
    } else if (file.endsWith('.json')) {
      fileList.push(filePath);
    }
  }
  return fileList.sort();
}

function getAllJsonFilesNoMeta(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = require('path').join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllJsonFilesNoMeta(filePath, fileList);
    } else if (file.endsWith('.json') && !file.endsWith('.meta.json')) {
      fileList.push(filePath);
    }
  }
  return fileList.sort();
}

// ─── Book runners ────────────────────────────────────────────────────────────

function runGoldBook(slug) {
  const bookDir = path.join(GOLD_DIR, slug);
  if (!fs.existsSync(bookDir)) {
    console.log(`  ✗ ${slug}: no gold directory`);
    return 1;
  }
  const files = getAllJsonFiles(bookDir);
  if (files.length === 0) {
    console.log(`  ✗ ${slug}: empty gold directory (no JSON files)`);
    return 1;
  }

  // Load manifest for chapter-level metadata check (STD-004)
  const manifestPath = path.join(BASE, 'data', 'manifest.json');
  let manifestChapterMeta = {};
  if (fs.existsSync(manifestPath)) {
    try {
      const mf = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      const bookEntry = (mf.books || []).find(b => b.book_id === slug || b.slug === slug);
      if (bookEntry && Array.isArray(bookEntry.chapters)) {
        for (const ch of bookEntry.chapters) {
          manifestChapterMeta[ch.number] = ch;
        }
      }
    } catch (e) { /* non-fatal */ }
  }

  let totalViolations = 0;
  const chapterNumbers = [];
  for (const file of files) {
    const viol = auditGoldFile(file);
    totalViolations += viol.length;
    printViolations(viol, file);
    // Extract chapter number from filename for labs coverage check
    const chM = file.match(/chapter-?(\d+)/i);
    if (chM) chapterNumbers.push(parseInt(chM[1], 10));
  }

  // STD-004: chapter-level metadata gate
  const metaViolations = [];
  for (const chNum of chapterNumbers) {
    const meta = manifestChapterMeta[chNum];
    if (!meta) {
      metaViolations.push(`ch${chNum}: missing from manifest.chapters`);
    } else {
      // The issue is that the chapters in manifest might be loaded from cache. Let's strictly check it but ignore if it's fine.
      if (!meta.theme && meta.theme !== '')    metaViolations.push(`ch${chNum}: missing theme`);
      if (meta.stotra_present === undefined)   metaViolations.push(`ch${chNum}: missing stotra_present`);
    }
  }
  if (metaViolations.length > 0) {
    console.log(`  ⚠ CHAPTER METADATA (STD-004): ${metaViolations.length} chapter(s) missing fields`);
    metaViolations.slice(0, 5).forEach(m => console.log(`    ${m}`));
    if (metaViolations.length > 5) console.log(`    … and ${metaViolations.length - 5} more`);
  } else if (chapterNumbers.length > 0) {
    console.log(`  ✓ CHAPTER METADATA: all ${chapterNumbers.length} chapter(s) have theme/stotra_present`);
  }

  // STD-003: Vedic Labs gate — report chapters with no lab app coverage
  if (chapterNumbers.length > 0) {
    const labViol = auditLabsCoverage(slug, chapterNumbers.sort((a, b) => a - b));
    const coveredCount = chapterNumbers.length - labViol.length;
    if (labViol.length === chapterNumbers.length) {
      // Zero coverage — hard fail (blocks graduation)
      console.log(`  ✗ LABS COVERAGE: ZERO — no chapter has a lab app (blocks graduation)`);
      totalViolations += 1;
    } else if (labViol.length > 0) {
      // Partial coverage — warning only, does not fail audit
      console.log(`  ⚠ LABS COVERAGE: ${coveredCount}/${chapterNumbers.length} chapters covered (${labViol.length} uncovered — see LAB-* tasks)`);
      labViol.forEach(v => console.log(`    [LABS_NO_COVERAGE] ch${v.chapter}`));
    } else {
      console.log(`  ✓ LABS: all ${chapterNumbers.length} chapter(s) have lab app coverage`);
    }
  }

  return totalViolations;
}

function runSilverBook(slug) {
  const bookDir = path.join(SILV_DIR, slug);
  if (!fs.existsSync(bookDir)) {
    // May have sub-directories (e.g. mahabharata/parva-1/)
    console.log(`  — ${slug}: not found directly, skipping`);
    return 0;
  }
  const files = getAllJsonFilesNoMeta(bookDir);
  if (files.length === 0) {
    console.log(`  — ${slug}: no JSON files`);
    return 0;
  }

  let totalViolations = 0;
  for (const file of files) {
    const viol = auditSilverFile(file);
    totalViolations += viol.length;
    printViolations(viol, file);
  }
  return totalViolations;
}

// ─── Main ────────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);
  const silverMode = args.includes('--silver');
  const allMode    = args.includes('--all');
  const targets    = args.filter(a => !a.startsWith('--'));

  console.log('audit_standards.js — Vishwa-Vani data standards checker');
  console.log(`Mode: ${silverMode ? 'SILVER' : 'GOLD'}${allMode ? ' (all books)' : ''}`);
  console.log('');

  let totalViolations = 0;

  if (silverMode) {
    const books = allMode || targets.length === 0
      ? fs.readdirSync(SILV_DIR).filter(b => fs.statSync(path.join(SILV_DIR, b)).isDirectory())
      : targets;

    for (const book of books) {
      console.log(`[SILVER] ${book}`);
      totalViolations += runSilverBook(book);
      console.log('');
    }
  } else {
    const books = allMode || targets.length === 0
      ? fs.readdirSync(GOLD_DIR).filter(b => fs.statSync(path.join(GOLD_DIR, b)).isDirectory())
      : targets;

    for (const book of books) {
      console.log(`[GOLD] ${book}`);
      totalViolations += runGoldBook(book);
      console.log('');
    }
  }

  if (totalViolations === 0) {
    console.log('✓ PASS — all checked files meet tier standards.');
    process.exit(0);
  } else {
    console.log(`✗ FAIL — ${totalViolations} total violation(s). See output above.`);
    process.exit(1);
  }
}

main();
