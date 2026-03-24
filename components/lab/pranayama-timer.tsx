'use client'

import React, { useState, useEffect } from 'react'

export default function PranayamaTimer() {
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Pause'>('Inhale')
  const [seconds, setSeconds] = useState(4)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(s => {
          if (s <= 1) {
            // Switch phases
            if (phase === 'Inhale') { setPhase('Hold'); return 4 }
            if (phase === 'Hold')   { setPhase('Exhale'); return 4 }
            if (phase === 'Exhale') { setPhase('Pause'); return 2 }
            if (phase === 'Pause')  { setPhase('Inhale'); return 4 }
            return 4
          }
          return s - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isActive, phase])

  return (
    <div className="bg-stone-900/40 border border-stone-800 rounded-[3rem] p-12 h-full flex flex-col justify-between relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-12">
           <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">Gita Ch. 6 • Dhyana Yoga</span>
              <h2 className="text-4xl font-serif font-black text-white">Pranayama Pulse</h2>
           </div>
           <button 
             onClick={() => setIsActive(!isActive)}
             className={`w-16 h-16 rounded-full flex items-center justify-center text-xl transition-all ${isActive ? 'bg-white text-stone-900' : 'bg-orange-600 text-white shadow-xl shadow-orange-600/20'}`}
           >
             {isActive ? '⏸' : '▶'}
           </button>
        </div>

        <div className="flex flex-col items-center justify-center py-20">
           <div className={`w-64 h-64 rounded-full border-4 border-dashed border-stone-800 flex items-center justify-center relative transition-all duration-[4000ms] ${isActive && phase === 'Inhale' ? 'scale-125 border-orange-500' : 'scale-100'}`}>
              <div className={`absolute inset-4 rounded-full bg-gradient-to-t from-orange-600 to-orange-400 opacity-20 blur-2xl transition-all duration-[4000ms] ${isActive && phase === 'Inhale' ? 'scale-150' : 'scale-50'}`} />
              <div className="text-center relative z-10">
                 <div className="text-6xl font-serif font-black text-white mb-2">{seconds}</div>
                 <div className="text-[10px] font-black uppercase tracking-[0.5em] text-orange-500">{phase}</div>
              </div>
           </div>
        </div>
      </div>

      <div className="relative z-10 mt-12 grid grid-cols-4 gap-4 text-center">
         {[
           { name: 'Puraka', label: 'Inhale', active: phase === 'Inhale' },
           { name: 'Kumbhaka', label: 'Hold', active: phase === 'Hold' },
           { name: 'Rechaka', label: 'Exhale', active: phase === 'Exhale' },
           { name: 'Shunya', label: 'Pause', active: phase === 'Pause' }
         ].map(s => (
           <div key={s.name} className={`space-y-1 transition-opacity ${s.active ? 'opacity-100' : 'opacity-20'}`}>
              <div className="text-[10px] font-black text-white uppercase tracking-widest">{s.name}</div>
              <div className="text-[9px] text-stone-500 uppercase tracking-tighter">{s.label}</div>
           </div>
         ))}
      </div>
    </div>
  )
}
