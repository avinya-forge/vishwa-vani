'use client'

import React, { useState } from 'react'
import VedicAppTemplate from './vedic-app-template'

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
    <VedicAppTemplate
      title="Akshauhini Engine"
      subtitle="Mahabharata Ch. 1 • Parva Sangraha"
      icon="🛡️"
      footerNote="Vedic military formations (Vyuhas) were calculated in base-Akshauhini units."
    >
      <div className="space-y-6">
        <div className="bg-stone-100/50 dark:bg-stone-800/50 p-6 rounded-3xl border border-stone-200/50 dark:border-stone-700/50">
          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-stone-500 mb-4">
            <span>Force Scale (Akshauhini)</span>
            <span className="text-orange-600 bg-orange-100 dark:bg-orange-500/20 px-3 py-1 rounded-lg">{units} Units</span>
          </div>
          <input
            type="range" min="1" max="18" step="1"
            value={units}
            onChange={(e) => setUnits(parseInt(e.target.value))}
            className="w-full accent-orange-600 cursor-pointer mb-2"
          />
          <p className="text-[9px] text-stone-500 dark:text-stone-400 font-medium italic">
            The Kurukshetra war involved 18 Akshauhinis in total (11 Kaurava + 7 Pandava).
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Gaja (Elephants)', val: stats.elephants, icon: '🐘' },
            { label: 'Ratha (Chariots)', val: stats.chariots, icon: '🏹' },
            { label: 'Turaga (Cavalry)', val: stats.cavalry, icon: '🐎' },
            { label: 'Padati (Infantry)', val: stats.infantry, icon: '⚔️' }
          ].map((s, i) => (
            <div key={i} className="bg-white dark:bg-stone-900/40 border border-stone-100 dark:border-stone-800 p-4 rounded-2xl hover:border-orange-500/30 transition-all group/stat">
              <div className="text-xl mb-1 opacity-80 group-hover/stat:scale-110 transition-transform">{s.icon}</div>
              <div className="text-lg font-serif font-black text-stone-900 dark:text-white leading-none">{s.val.toLocaleString()}</div>
              <div className="text-[8px] font-black uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 mt-2">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-stone-100/50 dark:bg-stone-800/30 rounded-2xl p-4">
           <div className="flex justify-between items-end">
              <div>
                <div className="text-[9px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1">Total Command Strength</div>
                <div className="text-2xl font-serif font-black text-orange-600 leading-none">{stats.total.toLocaleString()}</div>
              </div>
              <div className="text-[8px] font-black uppercase tracking-[0.3em] text-stone-900 dark:text-white bg-white dark:bg-stone-700 px-3 py-1.5 rounded-xl shadow-sm">
                Combatants
              </div>
           </div>
        </div>

        <div>
          <button
            onClick={() => setShowComparisons(v => !v)}
            className="w-full text-[9px] font-black uppercase tracking-widest text-stone-500 hover:text-orange-500 transition-colors flex items-center justify-center gap-2 py-2 border border-dashed border-stone-200 dark:border-stone-800 rounded-xl"
          >
            <span>Historical Comparative Context</span>
            <span>{showComparisons ? '▲' : '▼'}</span>
          </button>

          {showComparisons && (
            <div className="mt-4 space-y-2 animate-in slide-in-from-top-2 duration-300">
              {HISTORICAL_COMPARISONS.map((h, i) => {
                const ratio = stats.total / h.total
                return (
                  <div key={i} className="flex items-center justify-between bg-stone-50 dark:bg-stone-900/60 border border-stone-100 dark:border-stone-800 rounded-xl px-4 py-3">
                    <div>
                      <p className="text-[10px] font-black text-stone-700 dark:text-stone-300 uppercase letter-spacing-wide">{h.label}</p>
                      <p className="text-[9px] text-stone-500 dark:text-stone-500 italic font-medium">{h.total.toLocaleString()} troops</p>
                    </div>
                    <span className="text-[10px] font-black text-orange-600 bg-orange-100 dark:bg-orange-900/40 px-2 py-1 rounded-md">
                      {ratio.toFixed(1)}×
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </VedicAppTemplate>
  )
}
