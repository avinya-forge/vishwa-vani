'use client'

import React, { useState } from 'react'

const INSTRUMENTS = [
  { name: 'Panchajanya', owner: 'Sri Krishna', desc: 'The conch that shattered the hearts of the Kauravas.', icon: '🐚', color: 'bg-orange-600' },
  { name: 'Devadatta', owner: 'Arjuna', desc: 'The God-gifted conch which signaled the Gandiva bow.', icon: '🐚', color: 'bg-stone-100 text-stone-900' },
  { name: 'Paundra', owner: 'Bhima', desc: 'The mighty conch of the wolf-bellied Bhima.', icon: '🐚', color: 'bg-stone-800' },
  { name: 'Anantavijaya', owner: 'Yudhisthira', desc: 'The eternal victory conch of the King of Dharma.', icon: '🐚', color: 'bg-yellow-500' }
]

export default function VedicInstruments() {
  const [selected, setSelected] = useState(0)

  return (
    <div className="bg-white/70 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 rounded-[2.5rem] p-8 shadow-sm dark:shadow-none flex flex-col justify-between group transition-all backdrop-blur-sm">
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
           <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-600 dark:text-orange-500">Gita Ch. 1 • The Gathering</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white">Shankha Soundboard</h2>
           </div>
        </div>

        <div className="space-y-3 mb-8">
           {INSTRUMENTS.map((inst, i) => (
             <button 
               key={inst.name} 
               onClick={() => setSelected(i)}
               className={`w-full flex items-center gap-4 p-3.5 rounded-2xl border transition-all ${selected === i ? 'bg-white dark:bg-stone-800 border-orange-200 dark:border-white scale-105 shadow-lg shadow-orange-500/5' : 'bg-stone-50 dark:bg-stone-900/40 border-stone-100 dark:border-stone-800 hover:border-orange-200 opacity-60'}`}
             >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${inst.color}`}>
                   {inst.icon}
                </div>
                <div className="text-left">
                   <div className={`text-xs font-black uppercase tracking-widest ${selected === i ? 'text-stone-900 dark:text-white' : 'text-stone-400 dark:text-stone-500'}`}>{inst.name}</div>
                   <div className={`text-[9px] font-bold ${selected === i ? 'text-orange-600' : 'text-stone-400 dark:text-stone-600'}`}>{inst.owner}</div>
                </div>
             </button>
           ))}
        </div>

        <div className="p-6 bg-stone-50 dark:bg-stone-900/40 border border-stone-100 dark:border-stone-800 rounded-3xl min-h-[120px] flex flex-col justify-center animate-in fade-in slide-in-from-bottom-2 duration-500" key={selected}>
           <p className="text-sm font-serif italic text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
              &ldquo;{INSTRUMENTS[selected].desc}&rdquo;
           </p>
           <div className="flex items-center gap-3">
              <span className="w-4 h-[1px] bg-stone-200 dark:bg-stone-800" />
              <span className="text-[9px] font-black text-stone-400 dark:text-stone-600 uppercase tracking-widest">Scriptural Narrative</span>
           </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
         <button className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600 hover:text-orange-500 transition-colors py-2 flex items-center gap-3">
            <span>🔊</span> Hear the Sound of Dharma
         </button>
      </div>
    </div>
  )
}
