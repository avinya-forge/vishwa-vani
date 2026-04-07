'use client'

import React, { useState } from 'react'

// Historical comparative data for contextualisation (LAB-807)
const HISTORICAL_COMPARISONS = [
  { label: 'Battle of Gaugamela (331 BCE)', total: 100_000, description: "Alexander's combined force" },
  { label: 'Battle of Cannae (216 BCE)', total: 86_400, description: "Hannibal's forces" },
  { label: 'Battle of Waterloo (1815 CE)', total: 280_000, description: 'Allied + French combined' },
  { label: 'D-Day (1944 CE)', total: 156_000, description: 'Allied landing force, Day 1' },
]

export function calculateAkshauhini(units: number) {
  const BASE = 21_870
  const elephants = units * BASE
  const chariots = units * BASE
  const cavalry = units * BASE * 3
  const infantry = units * BASE * 5
  const total = elephants + chariots + cavalry + infantry
  return { elephants, chariots, cavalry, infantry, total }
}

export default function AkshauhiniCalc() {
  const [units, setUnits] = useState(1)
  const [showComparisons, setShowComparisons] = useState(false)

  const stats = calculateAkshauhini(units)

  return (
    <div className="bg-stone-900/40 border border-stone-800 rounded-[3rem] p-10 h-full flex flex-col justify-between group">
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-10">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">Mahabharata Ch. 1 • Parva Sangraha</span>
            <h2 className="text-3xl font-serif font-black text-white">Akshauhini Engine</h2>
          </div>
        </div>

        <div className="mb-10 flex flex-col gap-4">
          <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest text-stone-500">
            <span>Unit count (Akshauhini)</span>
            <span className="text-orange-600">{units}</span>
          </div>
          <input
            type="range" min="1" max="18" step="1"
            value={units}
            onChange={(e) => setUnits(parseInt(e.target.value))}
            className="w-full accent-orange-600 opacity-50 hover:opacity-100 transition-opacity"
          />
          <p className="text-[9px] text-stone-600 font-medium">
            The Mahabharata war involved 18 Akshauhinis in total (11 Kaurava + 7 Pandava).
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Gaja (Elephants)', val: stats.elephants, icon: '🐘' },
            { label: 'Ratha (Chariots)', val: stats.chariots, icon: '🏹' },
            { label: 'Turaga (Cavalry)', val: stats.cavalry, icon: '🐎' },
            { label: 'Padati (Infantry)', val: stats.infantry, icon: '⚔️' }
          ].map((s, i) => (
            <div key={i} className="bg-stone-800/20 border border-stone-800/50 p-6 rounded-3xl hover:border-orange-500/30 transition-all">
              <div className="text-xl mb-3 opacity-80">{s.icon}</div>
              <div className="text-xl font-serif font-black text-white">{s.val.toLocaleString()}</div>
              <div className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Historical comparisons (LAB-807) */}
        <div className="mt-8">
          <button
            onClick={() => setShowComparisons(v => !v)}
            className="text-[9px] font-black uppercase tracking-widest text-stone-500 hover:text-orange-500 transition-colors flex items-center gap-1"
          >
            <span>{showComparisons ? '▲' : '▼'}</span>
            <span>Historical Context</span>
          </button>

          {showComparisons && (
            <div className="mt-4 space-y-2">
              {HISTORICAL_COMPARISONS.map((h, i) => {
                const ratio = stats.total / h.total
                return (
                  <div key={i} className="flex items-center justify-between bg-stone-800/10 border border-stone-800/30 rounded-xl px-4 py-3">
                    <div>
                      <p className="text-[10px] font-bold text-stone-400">{h.label}</p>
                      <p className="text-[9px] text-stone-600">{h.description} · {h.total.toLocaleString()} troops</p>
                    </div>
                    <span className="text-[10px] font-black text-orange-500 ml-4 flex-shrink-0">
                      {ratio.toFixed(1)}×
                    </span>
                  </div>
                )
              })}
              <p className="text-[9px] text-stone-700 mt-2 font-medium">
                Multiplier shows how many times larger this force is than the historical comparison.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 pt-8 border-t border-stone-800/30 flex justify-between items-end">
        <div>
          <div className="text-[10px] font-black uppercase tracking-widest text-stone-600 mb-1">Total Command Strength</div>
          <div className="text-2xl font-serif font-black text-orange-600">{stats.total.toLocaleString()}</div>
        </div>
        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-stone-800">18-Day War Baseline</span>
      </div>
    </div>
  )
}
