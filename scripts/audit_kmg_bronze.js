#!/usr/bin/env node
/**
 * MBH-CORE-003: KMG Source Verification — bronze audit
 *
 * Audits the Kisari Mohan Ganguli (KMG) bronze HTML against the
 * canonical Mahabharata structure (BORI Critical Edition baseline).
 *
 * Reports per-parva: presence in bronze, section count, and gap
 * vs canonical adhyaya count. Uses readline streaming so it runs
 * in constant memory regardless of file size (per docs/ingestion-
 * runbook.md §2 and §3).
 *
 * Usage:
 *   node scripts/audit_kmg_bronze.js
 *
 * Exit codes: 0 = audit complete (gaps logged), 1 = bronze not present
 */

'use strict';
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const BRONZE_DIR = path.join(__dirname, '..', 'data', '1-bronze');

// Canonical adhyaya counts per parva (BORI Critical Edition)
// Sources: MBH-CORE-001 backlog entry, BORI Sukthankar 1933–1966.
// Note: parva 3 is "Aranyaka" in BORI, "Vana" in KMG/Vulgate — aliased below.
const PARVA_ALIASES = {
  '3-vana': '3-aranyaka',
  '3-aranya': '3-aranyaka',
};

const CANONICAL_ADHYAYAS = {
  '1-adi': 225,
  '2-sabha': 72,
  '3-aranyaka': 299,
  '4-virata': 67,
  '5-udyoga': 196,
  '6-bhishma': 117,
  '7-drona': 173,
  '8-karna': 69,
  '9-shalya': 64,
  '10-sauptika': 18,
  '11-stri': 27,
  '12-shanti': 365,
  '13-anushasana': 154,
  '14-ashvamedhika': 96,
  '15-ashramavasika': 47,
  '16-mausala': 9,
  '17-mahaprasthanika': 3,
  '18-svargarohana': 5,
};

// Roman → integer (KMG uses Roman section numerals)
function romanToInt(roman) {
  if (!roman) return 0;
  const values = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;
  let prev = 0;
  for (let i = roman.length - 1; i >= 0; i--) {
    const v = values[roman[i]];
    if (!v) return 0;
    if (v < prev) total -= v;
    else total += v;
    prev = v;
  }
  return total;
}

async function auditKmgVolume(filePath, label) {
  if (!fs.existsSync(filePath)) {
    console.log(`  ✗ ${label}: file not present at ${filePath}`);
    return null;
  }

  const stat = fs.statSync(filePath);
  const stream = fs.createReadStream(filePath, { encoding: 'utf-8' });
  const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });

  let currentBook = null;
  const bookSections = {};            // bookKey -> Set<sectionNumber>
  const bookFootnoteRefs = {};        // bookKey -> footnote count (proxy for content density)
  let totalLines = 0;

  for await (const line of rl) {
    totalLines++;
    // detect book header
    const bookMatch = line.match(/BOOK\s+(\d+)\s*[—\-&mdash;]+\s*([A-Z]+)\s+PARVA/i);
    if (bookMatch) {
      const num = bookMatch[1];
      const name = bookMatch[2].toLowerCase();
      const rawKey = `${num}-${name}`;
      currentBook = PARVA_ALIASES[rawKey] ?? rawKey;
      if (!bookSections[currentBook]) {
        bookSections[currentBook] = new Set();
        bookFootnoteRefs[currentBook] = 0;
      }
      continue;
    }
    if (line.match(/<h1>BOOK\s+ONE\b/i) || line.match(/^BOOK ONE$/i)) {
      currentBook = '1-adi';
      if (!bookSections[currentBook]) {
        bookSections[currentBook] = new Set();
        bookFootnoteRefs[currentBook] = 0;
      }
      continue;
    }
    // detect section markers
    const sectionMatch = line.match(/SECTION\s+([IVXLCDM]+)\b/);
    if (sectionMatch && currentBook) {
      const n = romanToInt(sectionMatch[1]);
      if (n > 0) bookSections[currentBook].add(n);
    }
    // proxy for content density: count footnote refs (KMG dense scholarly notes)
    if (currentBook && /class="footnote"|<a href="#FN/i.test(line)) {
      bookFootnoteRefs[currentBook]++;
    }
  }

  return {
    label,
    sizeMB: (stat.size / (1024 * 1024)).toFixed(1),
    totalLines,
    bookSections,
    bookFootnoteRefs,
  };
}

function printReport(audits) {
  console.log('\nMBH-CORE-003: KMG Source Verification\n');
  console.log('─'.repeat(70));

  let totalSections = 0;
  let totalCanonical = 0;
  const coverageRows = [];

  for (const audit of audits) {
    if (!audit) continue;
    console.log(`\n${audit.label}  (${audit.sizeMB} MB · ${audit.totalLines.toLocaleString()} lines)`);
    for (const [book, sections] of Object.entries(audit.bookSections)) {
      const got = sections.size;
      const canonical = CANONICAL_ADHYAYAS[book] ?? null;
      const footnotes = audit.bookFootnoteRefs[book] ?? 0;
      totalSections += got;
      if (canonical !== null) totalCanonical += canonical;
      const coverage = canonical ? Math.round((got / canonical) * 1000) / 10 : null;
      const status = coverage === null ? '?' : coverage >= 90 ? '✓' : coverage >= 50 ? '~' : '✗';
      const cov = coverage === null ? 'n/a' : `${coverage}%`;
      console.log(`  ${status}  ${book.padEnd(22)} sections=${String(got).padStart(4)} / canonical=${String(canonical ?? '?').padStart(4)}  coverage=${cov.padStart(7)}  footnotes=${footnotes}`);
      coverageRows.push({ book, got, canonical, coverage, footnotes });
    }
  }

  console.log('\n' + '─'.repeat(70));
  console.log(`Total sections in bronze: ${totalSections}`);
  console.log(`Total canonical adhyayas (parvas covered): ${totalCanonical}`);
  if (totalCanonical > 0) {
    const overall = Math.round((totalSections / totalCanonical) * 1000) / 10;
    console.log(`Overall bronze coverage: ${overall}%`);
  }

  // gap report
  const gaps = coverageRows.filter(r => r.coverage !== null && r.coverage < 90);
  if (gaps.length > 0) {
    console.log('\nGaps requiring secondary source acquisition:');
    for (const g of gaps) {
      console.log(`  - ${g.book}: have ${g.got} of ${g.canonical} (${g.coverage}%)`);
    }
  } else {
    console.log('\nNo coverage gaps detected in audited volumes.');
  }

  // missing parvas
  const presentParvas = new Set(coverageRows.map(r => r.book));
  const missingParvas = Object.keys(CANONICAL_ADHYAYAS).filter(p => !presentParvas.has(p));
  if (missingParvas.length > 0) {
    console.log('\nParvas NOT in audited bronze (no KMG vol on disk for these):');
    for (const p of missingParvas) {
      console.log(`  - ${p}: ${CANONICAL_ADHYAYAS[p]} canonical adhyayas — needs KMG vol N drop`);
    }
  }
}

async function main() {
  const audits = [];
  const vol1 = path.join(BRONZE_DIR, 'mahabharata-kmg-vol1.html');
  audits.push(await auditKmgVolume(vol1, 'KMG vol 1 (Adi + Sabha + Aranyaka)'));

  // also audit GRETIL Sanskrit sources for cross-reference
  const adiSa = path.join(BRONZE_DIR, 'mahabharata-adi-parva-sanskrit-gretil.html');
  if (fs.existsSync(adiSa)) {
    const stat = fs.statSync(adiSa);
    console.log(`\nGRETIL Sanskrit (cross-ref): ${(stat.size / (1024 * 1024)).toFixed(1)} MB · ${(await countLines(adiSa)).toLocaleString()} lines (Adi Parva)`);
  }
  const sabhaSa = path.join(BRONZE_DIR, 'mahabharata-sabha-parva-sanskrit-gretil.html');
  if (fs.existsSync(sabhaSa)) {
    const stat = fs.statSync(sabhaSa);
    console.log(`GRETIL Sanskrit (cross-ref): ${(stat.size / (1024 * 1024)).toFixed(1)} MB · ${(await countLines(sabhaSa)).toLocaleString()} lines (Sabha Parva)`);
  }
  const aranyaSa = path.join(BRONZE_DIR, 'mahabharata-aranya-parva-sanskrit-gretil.html');
  if (fs.existsSync(aranyaSa)) {
    const stat = fs.statSync(aranyaSa);
    console.log(`GRETIL Sanskrit (cross-ref): ${(stat.size / (1024 * 1024)).toFixed(1)} MB · ${(await countLines(aranyaSa)).toLocaleString()} lines (Aranyaka Parva)`);
  }

  printReport(audits);
}

async function countLines(file) {
  const stream = fs.createReadStream(file, { encoding: 'utf-8' });
  const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });
  let n = 0;
  for await (const _ of rl) n++;
  return n;
}

main().catch(e => { console.error(e); process.exit(1); });
