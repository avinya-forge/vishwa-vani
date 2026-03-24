'use client'

import React, { useState } from 'react'

export default function AkshauhiniCalc() {
  const [units, setUnits] = useState(1)

  // 1 Akshauhini ratios:
  // 1 : 1 : 3 : 5
  // Total of 21,870 elephants/chariots
  const baseRating = 21870
  const stats = {
    elephants: units * baseRating,
    chariots: units * baseRating,
    cavalry: units * (baseRating * 3),
    infantry: units * (baseRating * 5)
  }

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
      </div>

      <div className="mt-10 pt-8 border-t border-stone-800/30 flex justify-between items-end">
         <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-stone-600 mb-1">Total Command Strength</div>
            <div className="text-2xl font-serif font-black text-orange-600">{(stats.elephants + stats.chariots + stats.cavalry + stats.infantry).toLocaleString()}</div>
         </div>
         <span className="text-[9px] font-black uppercase tracking-[0.4em] text-stone-800">18-Day War Baseline</span>
      </div>
    </div>
  )
}
