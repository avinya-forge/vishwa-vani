# Vishwa-Vani Ingestion Runbook — MBH Scale Edition

**Scope**: this runbook documents the stream-processing strategy required to ingest a full Mahabharata (~73,684 verses BORI; ~100k verses KMG/Vulgate) without exhausting Node memory, Cloudflare D1 capacity, or `next build` time budget. It is the engineering complement to `MBH-CORE-001` (phased schedule).

**Audience**: Jules / Antigravity executors running ingestion sprints. Claude does not run ingestion code — Claude designs the runbook; the executor agents follow it.

---

## 0. Hard limits (platform & free-tier reality)

| Constraint | Limit | Operating budget |
| --- | --- | --- |
| Node.js heap default | 1.5 GB (V8 default) | Stay under 800 MB; use `--max-old-space-size=4096` only when streaming proven |
| Cloudflare D1 (free) | 500 MB total | Phase 1+2 fits; Phase 3 triggers ARCH-007 parva-level shard pre-aggregation |
| `next build` ceiling | 10 minutes (Vercel Hobby) | Edge SQLite WASM (ARCH-001) must absorb verse-level reads; SSG limited to chapter routes |
| Cloudflare Pages req/day | 100k | 10k/day projected — no pressure |
| Gemini Flash API | 15 RPM / 1M TPM | Synthesis is on-demand only; never used at build time |
| Local dev RAM | assume 4 GB | All ingestion scripts must run on 4 GB without OOM |

---

## 1. Tier topology (where data lives at each stage)

```
data/
  1-bronze/             # Raw scraped HTML / OCR / TSV. .gitignored. Massive.
    mahabharata-adi-parva-sanskrit-gretil.html      (26k lines)
    mahabharata-kmg-vol1.html                       (67k lines)
    mahabharata-adi-parva-mapping.tsv               (verse↔chapter map)
    nilakantha-raw-ocr.txt                          (Bhasya OCR)
  2-silver/             # NVF-compliant per-adhyaya JSON shards. Gitignored except stotras.
    mahabharata/parva-1/adhyaya-001.json
    mahabharata/parva-1/adhyaya-001.meta.json       (verse count, layer index, hash)
    ...
  3-gold/               # Promoted, validated, manifest-tracked. Gitignored.
    mahabharata/parva-1/adhyaya-001.json
    manifest.json                                   (single per-book index)
```

**Invariant**: every stage transformation reads files from disk one-at-a-time and writes to disk one-at-a-time. **Never** load all parva files into a single in-memory array.

---

## 2. Stream-processing pattern (mandatory)

Bad pattern (causes OOM at parva scale):

```js
// DO NOT WRITE THIS
const allShards = fs.readdirSync(silverDir).map(f =>
  JSON.parse(fs.readFileSync(path.join(silverDir, f), 'utf-8'))
)
allShards.forEach(s => transform(s))
```

Required pattern:

```js
// process one shard at a time, accumulate only summary metrics
const files = await fs.promises.readdir(silverDir)
const summary = { verseCount: 0, errors: [], parvaIndex: {} }
for (const f of files) {
  const text = await fs.promises.readFile(path.join(silverDir, f), 'utf-8')
  const shard = JSON.parse(text)
  const result = transform(shard)        // pure function — no shared mutable state
  await fs.promises.writeFile(targetPath(f), JSON.stringify(result.shard))
  summary.verseCount += result.verseCount
  summary.parvaIndex[f] = result.checksum
  // shard, text, result — all eligible for GC at next iteration
}
await fs.promises.writeFile('manifest.json', JSON.stringify(summary))
```

**Memory invariant**: at any moment only one shard's JSON tree is in memory. Manifest accumulates summary fields only — never full verse bodies.

---

## 3. JSON-stream parsing for bronze HTML/OCR

Bronze sources are large (26k–67k line HTML files). `cheerio` and `jsdom` both load the entire DOM into memory. For Mahabharata-scale ingestion use one of:

- **`htmlparser2`** with the `WritableStream` interface: emits SAX-style open/close/text events; constant memory regardless of file size. **Recommended for KMG/GRETIL HTML parsing.**
- **`stream-json`** for any pre-formed JSON dumps (e.g. wisdomlib API responses): processes JSON tokens without building the full tree.
- **`readline`** (Node built-in) for line-oriented OCR text: process verse-by-verse using regex anchors.

Never use `JSON.parse()` on a file > 100 MB. Never use `cheerio.load()` on a file > 10 MB.

---

## 4. Per-parva ingestion sequence (one parva per sprint cycle)

Per phase plan (MBH-CORE-001), each parva moves through this 7-step pipeline:

1. **Bronze land**: drop raw KMG HTML + GRETIL Sanskrit + Gita Press HI/MR PDFs into `data/1-bronze/parva-N/`. Verify SHA-256 against published source manifest.
2. **Bronze parse → silver**: `node scripts/parse_parva.js <N>` runs `htmlparser2` over each source; emits one `adhyaya-NNN.json` per chapter to `data/2-silver/mahabharata/parva-N/`. Each shard ≤ 2 MB. Check meta sidecar `adhyaya-NNN.meta.json` (verse count, language coverage, hash).
3. **Silver validate**: `node scripts/validate_silver.js mahabharata` — must exit 0 across the new parva. Streaming pattern from §2.
4. **Layer enrich**: `node scripts/enrich_mbh.js --parva N` adds Author 2 EN (Debroy / Gita Press EN) and verifies HI + MR layer presence per `MBH-DATA-2..5`. Streaming.
5. **Promote**: `node scripts/promote_to_gold.js mahabharata --parva N`. Internal validate gate. Idempotent — safe to re-run.
6. **Audit**: `node scripts/audit_gold.js mahabharata --parva N` — must report Readiness 100% **for that parva** (per-parva audit, not global, to keep audit memory bounded).
7. **Register & UI verify**: update `lib/texts.ts` parva metadata; run `npm test`; flip `available: true` only after the full parva audit passes.

**Gate**: never start parva N+1 bronze parse before parva N's gold audit passes. This guarantees ARCH-007 sharding can chunk by completed parva.

---

## 5. Build-time strategy (avoiding the 10-minute Vercel ceiling)

Without intervention, `generateStaticParams()` over 73k verses would produce 73k pre-rendered pages and explode build time. Mitigation:

- **Phase 1 build**: SSG only at chapter granularity (`/<text>/<parva>/<adhyaya>` — ~225 routes for Adi). Verses render via SSR or client-side fetch from edge SQLite (ARCH-001). `dynamicParams: true` is the safety net — verse routes render on-demand.
- **Phase 2 build**: introduces ARCH-007 parva-level summary shards to keep manifest < 5 MB. SSG reduces to per-parva landing pages (~18 routes).
- **Phase 3 build**: edge SQLite WASM (ARCH-001) becomes mandatory; Pages worker handles verse-level reads. Build time drops to under 5 minutes regardless of verse count.

Build-time budget targets: Phase 1 ≤ 6 min, Phase 2 ≤ 8 min, Phase 3 ≤ 5 min.

---

## 6. Memory-safe scripts (concrete examples)

`scripts/validate_silver.js` is already streaming-correct (one shard at a time, no global accumulation). Use it as the reference template for new scripts.

When writing any new ingestion script:

```js
// scripts/template_streaming.js
const fs = require('fs')
const path = require('path')
const readline = require('readline')

async function processOne(filePath) {
  const text = await fs.promises.readFile(filePath, 'utf-8')
  const shard = JSON.parse(text)
  // ... transform ...
  return { verseCount: shard.verses.length }
}

async function main() {
  const dir = path.join(__dirname, '..', 'data', '2-silver', 'mahabharata', 'parva-1')
  const files = (await fs.promises.readdir(dir)).filter(f => f.endsWith('.json') && !f.endsWith('.meta.json'))
  let total = 0
  for (const f of files) {
    const r = await processOne(path.join(dir, f))
    total += r.verseCount
    if (global.gc) global.gc()  // optional manual GC if --expose-gc
  }
  console.log(`verses: ${total}`)
}

main().catch(e => { console.error(e); process.exit(1) })
```

Run with `node --max-old-space-size=4096 --expose-gc scripts/template_streaming.js` for parvas with > 5,000 verses.

---

## 7. Storage budget enforcement

Pre-flight check before each parva ingest:

```bash
du -sh data/2-silver/mahabharata/   # silver should stay < 1 GB
du -sh data/3-gold/mahabharata/     # gold mirrors silver minus stubs
```

If gold approaches 400 MB total, ARCH-007 (parva-level pre-aggregation shards) becomes mandatory before next ingest. The aggregator emits one summary file per parva that contains chapter-level metadata + verse counts but not verse bodies — used by the manifest and edge-cached search index. Verse bodies stay in their per-adhyaya shards and are read on-demand via SQLite WASM.

---

## 8. Failure recovery

- **Promote-to-gold partial failure**: `promote_to_gold.js` is designed idempotent — re-running on the same parva is safe. It compares per-shard SHA-256 against the meta sidecar; only changed shards are re-promoted. Manifest update is atomic (write-temp-then-rename).
- **Manifest divergence (`audit_gold.js` flags)**: rebuild manifest from on-disk gold shards via `node scripts/promote_to_gold.js mahabharata --rebuild-manifest`. Never hand-edit `manifest.json`.
- **Bronze source change after silver promotion**: bump silver shard, re-run validate, re-run promote with `--force` (silver hash changed so promote will detect and re-promote). `--force` is the **only** flag whose use must be justified in the commit body.

---

## 9. Cross-references

- **ARCH-001**: edge-hosted SQLite WASM — runtime side, read path. This runbook governs only the build/ingest write path.
- **ARCH-007**: parva-level pre-aggregation shards — mandatory before Phase 2 close.
- **ARCH-010**: ingestion stream-processing — formalised in §2.
- **MBH-CORE-001**: phased schedule that calls into this runbook at every cycle.
- **`docs/data-standards.md`** (STD-001): Bronze/Silver/Gold tier definitions; this runbook implements the promotion mechanics.

---

**Last updated**: 2026-05-03 (MBH-CORE-002 close).
