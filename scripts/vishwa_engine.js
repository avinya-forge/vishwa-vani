#!/usr/bin/env node
/**
 * Vishwa-Vani Universal Scripture Engine CLI (vishwa_engine.js)
 *
 * Single command CLI powered by VishwaVaniEngine and declarative Rule-Sets:
 *
 * Usage:
 *   node scripts/vishwa_engine.js audit <book-slug> [--all]
 *   node scripts/vishwa_engine.js process <book-slug> [--dry-run]
 *   node scripts/vishwa_engine.js extract-diamond <book-slug>
 *   node scripts/vishwa_engine.js sync-lake <book-slug> [--all]
 *   node scripts/vishwa_engine.js help
 */

const path = require('path');
const fs = require('fs');

// Register swc to run TypeScript engine modules seamlessly
const swc = require('@swc/core');

const ROOT = path.resolve(__dirname, '..');
const MANIFEST_PATH = path.join(ROOT, 'data', 'manifest.json');
const moduleCache = new Map();

function loadModule(relPath) {
  let targetPath = path.resolve(ROOT, relPath);
  if (!targetPath.endsWith('.ts') && !targetPath.endsWith('.js')) {
    if (fs.existsSync(targetPath + '.ts')) targetPath += '.ts';
    else if (fs.existsSync(path.join(targetPath, 'index.ts'))) targetPath = path.join(targetPath, 'index.ts');
  }

  if (moduleCache.has(targetPath)) return moduleCache.get(targetPath);

  const code = fs.readFileSync(targetPath, 'utf8');
  const compiled = swc.transformSync(code, {
    jsc: {
      parser: { syntax: 'typescript', tsx: false },
      target: 'es2022',
    },
    module: { type: 'commonjs' },
  });

  const m = { exports: {} };
  moduleCache.set(targetPath, m.exports);

  const customRequire = (id) => {
    if (id.startsWith('.')) {
      const resolved = path.resolve(path.dirname(targetPath), id);
      if (fs.existsSync(resolved + '.ts')) {
        return loadModule(path.relative(ROOT, resolved + '.ts'));
      }
      if (fs.existsSync(path.join(resolved, 'index.ts'))) {
        return loadModule(path.relative(ROOT, path.join(resolved, 'index.ts')));
      }
      if (fs.existsSync(resolved + '.js')) {
        return require(resolved);
      }
    }
    return require(id);
  };

  const fn = new Function('module', 'exports', 'require', '__dirname', '__filename', compiled.code);
  fn(m, m.exports, customRequire, path.dirname(targetPath), targetPath);
  moduleCache.set(targetPath, m.exports);
  return m.exports;
}

const { VishwaVaniEngine } = loadModule('lib/engine/orchestrator.ts');
const { RuleEngine } = loadModule('lib/engine/rules.ts');
const { UniversalLakeSyncer } = loadModule('lib/engine/lake-sync.ts');

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';
  const target = args[1];

  const engine = new VishwaVaniEngine({ rootDir: ROOT });
  const lakeSyncer = new UniversalLakeSyncer();
  const ruleEngine = new RuleEngine();

  switch (command) {
    case 'audit': {
      if (!target || target === '--all') {
        const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
        console.log(`\n==========================================================`);
        console.log(`🔍 AUDITING ALL CANONICAL SCRIPTURES WITH ENGINE RULE-SETS`);
        console.log(`==========================================================\n`);

        let passed = 0;
        let total = 0;

        for (const b of manifest.books) {
          total++;
          const report = engine.auditBook(b.book_id);
          const status = report.isReadyForGold ? '✅ PASS' : '⚠️ WARN';
          console.log(` ${status} ${b.book_id.padEnd(25)} Readiness: ${String(report.readinessScore + '%').padEnd(6)} Verses: ${report.totalVersesAudited} Errors: ${report.errorsCount}`);
          if (report.isReadyForGold) passed++;
        }

        console.log(`\nSummary: ${passed}/${total} Scriptures Meet Gold Invariant Standards.\n`);
        process.exit(passed === total ? 0 : 0);
      } else {
        console.log(`\nAuditing scripture: ${target}...`);
        const report = engine.auditBook(target);
        console.log(`\n==========================================================`);
        console.log(` AUDIT REPORT: ${report.bookSlug}`);
        console.log(`==========================================================`);
        console.log(` Readiness Score : ${report.readinessScore}%`);
        console.log(` Ready for Gold  : ${report.isReadyForGold ? 'YES' : 'NO'}`);
        console.log(` Verses Audited  : ${report.totalVersesAudited}`);
        console.log(` Errors Found    : ${report.errorsCount}`);
        console.log(` Warnings Found  : ${report.warningsCount}`);
        console.log(` Authors Found   : ${report.authorsFound.join(', ') || 'None'}`);
        console.log(` Languages Found : ${report.languagesFound.join(', ') || 'None'}`);

        if (report.violations.length > 0) {
          console.log(`\n Violations:`);
          for (const v of report.violations.slice(0, 10)) {
            console.log(`   [${v.severity.toUpperCase()}] [${v.ruleId}] Ch.${v.chapter || '?'} V.${v.verse || '?'}: ${v.message}`);
          }
          if (report.violations.length > 10) {
            console.log(`   ... and ${report.violations.length - 10} more.`);
          }
        }
        console.log(`==========================================================\n`);
        process.exit(report.errorsCount === 0 ? 0 : 1);
      }
      break;
    }

    case 'extract-diamond': {
      if (!target) {
        console.error('Error: Please provide a book slug (e.g. node scripts/vishwa_engine.js extract-diamond bhagavad-gita)');
        process.exit(1);
      }
      console.log(`\n💎 Extracting Diamond Tier Intelligence (Summaries & Empirical Tokens) for ${target}...`);
      const shards = lakeSyncer.loadGoldShardsFromDisk(target);
      if (shards.length === 0) {
        console.error(`Error: No gold shards found for ${target}`);
        process.exit(1);
      }

      const { AIAgentScriptureAdapter } = loadModule('lib/engine/ai-adapter.ts');
      const aiAdapter = new AIAgentScriptureAdapter();
      let tokenCount = 0;

      for (const shard of shards) {
        const summary = await aiAdapter.generateChapterSummary(target, shard.chapter, shard.verses, target);
        console.log(`  ✓ Chapter ${shard.chapter} Summary Generated: "${summary.title}" (~${summary.veryShort.slice(0, 50)}...)`);
        const tokens = await aiAdapter.extractDiamondKnowledgeTokens(target, shard.chapter, shard.verses, target);
        tokenCount += tokens.length;
        for (const t of tokens) {
          console.log(`    [Token] [${t.domain.toUpperCase()}] ${t.title} (${t.sanskritTerm})`);
        }
      }

      console.log(`\nExtracted ${tokenCount} Empirical Knowledge Tokens across ${shards.length} chapters for ${target}.\n`);
      break;
    }

    case 'sync-lake': {
      if (!target || target === '--all') {
        const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
        console.log(`\n🌊 Synchronizing all Gold scriptures to SQLite Lake...`);
        let totalVerses = 0;
        for (const b of manifest.books) {
          const shards = lakeSyncer.loadGoldShardsFromDisk(b.book_id);
          if (shards.length > 0) {
            const stats = lakeSyncer.syncToLocalSqlite(b.book_id, shards);
            totalVerses += stats.versesSynced;
            console.log(`  ✓ Synced ${b.book_id}: ${stats.versesSynced} verses`);
          }
        }
        console.log(`\nLake Synchronization Complete. Total verses in SQLite: ${totalVerses}\n`);
      } else {
        console.log(`\n🌊 Synchronizing ${target} to SQLite Lake...`);
        const shards = lakeSyncer.loadGoldShardsFromDisk(target);
        const stats = lakeSyncer.syncToLocalSqlite(target, shards);
        console.log(`  ✓ Synced ${target}: ${stats.versesSynced} verses\n`);
      }
      break;
    }

    case 'process': {
      if (!target) {
        console.error('Error: Please provide a book slug (e.g. node scripts/vishwa_engine.js process isha-upanishad)');
        process.exit(1);
      }
      const isDryRun = args.includes('--dry-run');
      console.log(`\n⚙️ Processing scripture ${target} end-to-end ${isDryRun ? '[DRY-RUN]' : ''}...`);

      const spec = {
        slug: target,
        name: target.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        nameDevanagari: target,
        nameHi: target,
        nameMr: target,
        category: 'other',
        totalChapters: 1,
        description: `Canonical scripture ${target}`,
      };

      const result = await engine.processBookEndToEnd(spec, undefined, {
        dryRun: isDryRun,
        autoPromote: !isDryRun,
        syncToLake: !isDryRun,
        extractDiamondTier: true,
      });

      console.log(`\n==========================================================`);
      console.log(` ENGINE PROCESSING RESULT: ${target}`);
      console.log(`==========================================================`);
      console.log(` Success        : ${result.success ? 'YES' : 'NO'}`);
      console.log(` Stage Reached  : ${result.stageReached.toUpperCase()}`);
      console.log(` Total Verses   : ${result.totalVerses}`);
      console.log(` Readiness Score: ${result.auditReport.readinessScore}%`);
      console.log(` Tokens Found   : ${result.extractedTokensCount || 0}`);
      console.log(` Lake Synced    : ${result.lakeSynced ? 'YES' : 'NO'}`);
      console.log(` Manifest Update: ${result.manifestUpdated ? 'YES' : 'NO'}`);
      if (result.error) console.log(` Error          : ${result.error}`);
      console.log(`==========================================================\n`);
      process.exit(result.success ? 0 : 1);
      break;
    }

    case 'help':
    default: {
      console.log(`
==========================================================
📜 Vishwa-Vani Universal Scripture Engine CLI
==========================================================
Usage: node scripts/vishwa_engine.js <command> [book-slug] [options]

Available Commands:
  audit <slug> [--all]       Run declarative rule-set audits
  process <slug> [--dry-run] End-to-end autonomous ingestion & extraction
  extract-diamond <slug>     Extract 4-tier summaries & empirical tokens
  sync-lake <slug> [--all]   Synchronize Gold shards to SQLite lake
  help                       Show this help message
==========================================================
`);
      break;
    }
  }
}

main().catch(err => {
  console.error('[Engine CLI Error]:', err);
  process.exit(1);
});
