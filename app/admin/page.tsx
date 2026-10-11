'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface CandidateBook {
  slug: string;
  name: string;
  category: string;
  chapters: number;
  existsInGold: boolean;
}

interface EngineStatus {
  completedBooksCount: number;
  completedSlugs: string[];
  candidateBooks: CandidateBook[];
  lake: {
    exists: boolean;
    filename: string;
    sizeMb: number;
  };
}

export default function AdminTerminalPage() {
  const [status, setStatus] = useState<EngineStatus | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [dryRun, setDryRun] = useState(false);
  const [commandInput, setCommandInput] = useState('');
  const [logs, setLogs] = useState<string[]>([
    '[SYSTEM] Vishwa-Vani Autonomous Engine Web Console v2.0 initialized.',
    '[SYSTEM] Reinforcement Learning Self-Correction Loop: ENABLED (Circuit Breaker: 3 Attempts).',
    '[SYSTEM] Type "help" or select a candidate book below to start onboarding.',
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Load system status on mount
  const refreshStatus = async () => {
    try {
      const res = await fetch('/api/engine/onboard');
      if (res.ok) {
        const data = await res.json();
        setStatus(data);
      }
    } catch {
      // Ignore network errors in status poll
    }
  };

  useEffect(() => {
    refreshStatus();
  }, []);

  const appendLog = (msg: string) => {
    const time = new Date().toISOString().substring(11, 23);
    setLogs(prev => [...prev, `[${time}] ${msg}`]);
  };

  const handleRunOnboard = async (slugsToOnboard: string[]) => {
    if (isRunning) return;
    setIsRunning(true);
    appendLog(`Executing autonomous onboarding for: ${slugsToOnboard.join(', ')}...`);

    try {
      const res = await fetch('/api/engine/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slugs: slugsToOnboard,
          dryRun,
          maxRetries: 3,
        }),
      });

      const data = await res.json();
      if (data.terminalLogs && Array.isArray(data.terminalLogs)) {
        setLogs(prev => [...prev, ...data.terminalLogs]);
      }

      if (data.success) {
        appendLog(`✓ Onboarding successfully concluded! Refreshing engine state...`);
      } else {
        appendLog(`⚠ Onboarding reported issues: ${data.error || 'Check log output above'}`);
      }

      await refreshStatus();
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      appendLog(`[ERROR] Network or server failure during engine execution: ${errorMsg}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = commandInput.trim();
    if (!cmd) return;

    appendLog(`$ ${cmd}`);
    setCommandInput('');

    const parts = cmd.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const target = parts[1];

    if (mainCmd === 'clear') {
      setLogs(['[SYSTEM] Terminal buffer cleared.']);
    } else if (mainCmd === 'help') {
      appendLog('Available commands:');
      appendLog('  onboard <slug>       - Onboard a specific scripture (e.g. onboard katha-upanishad)');
      appendLog('  onboard-all          - Execute batch onboarding of all 5 candidate scriptures');
      appendLog('  status               - Query live lake and scripture status');
      appendLog('  clear                - Clear terminal log buffer');
      appendLog('  help                 - Display this reference manual');
    } else if (mainCmd === 'status') {
      refreshStatus().then(() => {
        appendLog(`Completed Books : ${status?.completedBooksCount ?? 'Loading'}`);
        appendLog(`Lake File       : ${status?.lake.filename ?? 'vedic-lake.db'} (${status?.lake.sizeMb ?? 0} MB)`);
      });
    } else if (mainCmd === 'onboard-all') {
      const candidates = ['katha-upanishad', 'mundaka-upanishad', 'prashna-upanishad', 'taittiriya-upanishad', 'aitareya-upanishad'];
      handleRunOnboard(candidates);
    } else if (mainCmd === 'onboard') {
      if (!target) {
        appendLog('[ERROR] Usage: onboard <slug>');
      } else {
        handleRunOnboard([target]);
      }
    } else {
      appendLog(`[ERROR] Unknown command: "${cmd}". Type "help" for available commands.`);
    }
  };

  const topFiveCandidates = [
    { slug: 'katha-upanishad', name: 'Katha Upanishad', desc: 'Nachiketa & Yama dialogue on Immortality and the Chariot Allegory', chapters: 2 },
    { slug: 'mundaka-upanishad', name: 'Mundaka Upanishad', desc: 'Parā & Aparā Vidyā, Two Birds metaphor, and Satyameva Jayate', chapters: 3 },
    { slug: 'prashna-upanishad', name: 'Prashna Upanishad', desc: 'Six cosmic questions answered by Sage Pippalada on Prāṇa & OM', chapters: 6 },
    { slug: 'taittiriya-upanishad', name: 'Taittiriya Upanishad', desc: 'Moral Convocation Address, Pancha Kosha architecture & Supreme Bliss', chapters: 3 },
    { slug: 'aitareya-upanishad', name: 'Aitareya Upanishad', desc: 'Cosmogony of the Self and Rigvedic Mahāvākya Prajñānaṃ Brahma', chapters: 3 },
  ];

  const getLogLineStyle = (line: string) => {
    if (line.includes('✓') || line.includes('SUCCESS') || line.includes('COMPLETE')) return 'text-emerald-400';
    if (line.includes('✗') || line.includes('[ERROR]') || line.includes('FAILURE') || line.includes('CRITICAL')) return 'text-rose-400';
    if (line.includes('[RL Loop') || line.includes('⚠') || line.includes('WARN')) return 'text-amber-300 font-semibold';
    if (line.includes('[STAGE') || line.includes('▶')) return 'text-cyan-300';
    if (line.includes('================') || line.includes('----------------') || line.includes('☸')) return 'text-purple-300';
    if (line.startsWith('$')) return 'text-yellow-400 font-bold';
    return 'text-stone-300';
  };

  return (
    <div className="min-h-screen bg-[#0A0D12] text-stone-100 py-10 px-4 sm:px-6 lg:px-8 selection:bg-orange-500/30">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Top Header & Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-stone-800 pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-950/80 text-orange-400 border border-orange-800/60">
                ADMIN CONSOLE
              </span>
              <span className="text-xs text-stone-500 font-mono">v2.0 Autonomous Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white flex items-center gap-3">
              <span>⚡</span> Vedic Engine Web Terminal
            </h1>
            <p className="text-xs sm:text-sm text-stone-400 font-mono mt-1">
              Autonomous scripture ingestion, multi-scholar synthesis, RL self-correction, and lake persistence.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs font-mono text-stone-400 bg-stone-900 border border-stone-800 px-3 py-2 rounded-lg cursor-pointer hover:border-stone-700">
              <input
                type="checkbox"
                checked={dryRun}
                onChange={e => setDryRun(e.target.checked)}
                className="rounded border-stone-700 text-orange-600 focus:ring-orange-500 bg-stone-800"
              />
              <span>Simulate Dry Run</span>
            </label>

            <button
              onClick={() => handleRunOnboard(topFiveCandidates.map(c => c.slug))}
              disabled={isRunning}
              className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-mono text-xs font-bold rounded-lg transition-all shadow-lg shadow-orange-950/50 disabled:opacity-50 flex items-center gap-2"
            >
              <span>🚀</span>
              <span>{isRunning ? 'Engine Running...' : 'Onboard Top 5 Books (Batch)'}</span>
            </button>

            <Link
              href="/"
              className="px-3 py-2 bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 font-mono text-xs rounded-lg transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>

        {/* Status Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-stone-900/60 border border-stone-800/80 rounded-xl p-4">
            <p className="text-[10px] font-mono uppercase tracking-wider text-stone-500">Gold Scriptures</p>
            <p className="text-2xl font-bold font-mono text-emerald-400 mt-1">
              {status?.completedBooksCount ?? '20'}
              <span className="text-xs text-stone-500 font-normal ml-1">completed</span>
            </p>
          </div>

          <div className="bg-stone-900/60 border border-stone-800/80 rounded-xl p-4">
            <p className="text-[10px] font-mono uppercase tracking-wider text-stone-500">Vedic Lake Shard</p>
            <p className="text-2xl font-bold font-mono text-cyan-400 mt-1">
              {status?.lake.sizeMb ?? '2.1'} <span className="text-xs text-stone-500 font-normal">MB (SQLite)</span>
            </p>
          </div>

          <div className="bg-stone-900/60 border border-stone-800/80 rounded-xl p-4">
            <p className="text-[10px] font-mono uppercase tracking-wider text-stone-500">RL Reflection Loop</p>
            <p className="text-2xl font-bold font-mono text-amber-400 mt-1">
              Active <span className="text-xs text-stone-500 font-normal">Self-Repair</span>
            </p>
          </div>

          <div className="bg-stone-900/60 border border-stone-800/80 rounded-xl p-4">
            <p className="text-[10px] font-mono uppercase tracking-wider text-stone-500">Circuit Breaker</p>
            <p className="text-2xl font-bold font-mono text-purple-400 mt-1">
              3-Strike <span className="text-xs text-stone-500 font-normal">Anti-Stuck</span>
            </p>
          </div>
        </div>

        {/* Candidate Scriptures Deck */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-mono font-bold text-stone-300 uppercase tracking-wider flex items-center gap-2">
              <span>📚</span> Candidate Scriptures Ready for Autonomous Onboarding
            </h2>
            <span className="text-xs font-mono text-stone-500">5 Canonical Upanishads</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topFiveCandidates.map(book => {
              const isAlreadyGold = status?.completedSlugs?.includes(book.slug);
              return (
                <div
                  key={book.slug}
                  className="bg-stone-900/40 border border-stone-800 hover:border-stone-700 rounded-xl p-4 flex flex-col justify-between transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-orange-400 font-bold uppercase">{book.slug}</span>
                      {isAlreadyGold ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                          100% GOLD
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950 text-amber-400 border border-amber-800">
                          READY TO ONBOARD
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-white font-mono">{book.name}</h3>
                    <p className="text-xs text-stone-400 line-clamp-2">{book.desc}</p>
                    <div className="text-[11px] font-mono text-stone-500">
                      Chapters: {book.chapters} • Category: Upanishad
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between">
                    <button
                      onClick={() => handleRunOnboard([book.slug])}
                      disabled={isRunning}
                      className="w-full py-2 bg-stone-800 hover:bg-orange-600 hover:text-white text-stone-200 text-xs font-mono font-bold rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <span>⚡</span>
                      <span>{isAlreadyGold ? 'Re-Sync & Audit' : 'Onboard Scripture'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Terminal Window */}
        <div className="rounded-2xl border border-stone-800 bg-[#0D1117] shadow-2xl overflow-hidden font-mono">
          {/* Terminal Title Bar */}
          <div className="bg-[#161B22] border-b border-stone-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
              <span className="text-xs text-stone-400 ml-2 font-mono">bash — vishwa-vani-engine</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(logs.join('\n'));
                  appendLog('Terminal buffer copied to clipboard.');
                }}
                className="text-[11px] px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300"
              >
                Copy
              </button>
              <button
                onClick={() => setLogs(['[SYSTEM] Terminal buffer cleared.'])}
                className="text-[11px] px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Terminal Log Output Pane */}
          <div className="p-4 sm:p-6 h-[420px] overflow-y-auto space-y-1 text-xs leading-relaxed select-text">
            {logs.map((line, idx) => (
              <div key={idx} className={getLogLineStyle(line)}>
                {line}
              </div>
            ))}
            {isRunning && (
              <div className="text-orange-400 animate-pulse flex items-center gap-2 mt-2">
                <span>⚙</span>
                <span>Engine executing tasks...</span>
              </div>
            )}
            <div ref={terminalEndRef} />
          </div>

          {/* Interactive Command Prompt */}
          <form onSubmit={handleCommandSubmit} className="border-t border-stone-800 bg-[#161B22]/80 px-4 py-3 flex items-center gap-2">
            <span className="text-emerald-400 font-bold select-none text-xs sm:text-sm">admin@vishwa-vani:~$</span>
            <input
              type="text"
              value={commandInput}
              onChange={e => setCommandInput(e.target.value)}
              placeholder="Type command (e.g. 'onboard katha-upanishad', 'onboard-all', 'help')..."
              className="flex-1 bg-transparent border-none text-stone-100 placeholder-stone-600 text-xs sm:text-sm focus:outline-none focus:ring-0"
              disabled={isRunning}
            />
            <button
              type="submit"
              disabled={isRunning || !commandInput.trim()}
              className="px-3 py-1 bg-stone-800 hover:bg-orange-600 text-white rounded text-xs transition-all disabled:opacity-30"
            >
              Run
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
