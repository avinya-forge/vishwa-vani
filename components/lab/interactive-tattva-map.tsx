'use client'

import { useState } from 'react'
import { Layers, Search } from 'lucide-react'

export default function InteractiveTattvaMap() {
  const [activeTattva, setActiveTattva] = useState<string | null>(null)

  const tattvas = [
    { id: 'purusha', name: 'Purusha', desc: 'Pure Consciousness', color: 'bg-indigo-500' },
    { id: 'prakriti', name: 'Prakriti', desc: 'Primordial Nature', color: 'bg-emerald-500' },
    { id: 'mahat', name: 'Mahat / Buddhi', desc: 'Cosmic Intelligence', color: 'bg-amber-500' },
    { id: 'ahamkara', name: 'Ahamkara', desc: 'Ego principle', color: 'bg-rose-500' }
  ]

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1A1512] rounded-3xl border border-stone-200 dark:border-stone-800 p-6 overflow-hidden relative group">
      <div className="flex justify-between items-start mb-6 z-10">
        <div>
          <div className="text-xs font-black uppercase tracking-widest text-emerald-500 mb-1">Philosophy Lab</div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 leading-tight">Sankhya Tattva Map</h2>
        </div>
        <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
          <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        </div>
      </div>

      <div className="flex-1 flex flex-col z-10 relative">
        <div className="grid grid-cols-2 gap-4 h-full">
          {tattvas.map(t => (
            <div 
              key={t.id}
              onClick={() => setActiveTattva(t.id)}
              className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border ${
                activeTattva === t.id 
                  ? 'border-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-900/20' 
                  : 'border-stone-100 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 bg-stone-50 dark:bg-stone-900/50'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-3 h-3 rounded-full ${t.color}`} />
                <h3 className="font-bold text-stone-900 dark:text-stone-100">{t.name}</h3>
              </div>
              <p className="text-sm text-stone-500 dark:text-stone-400">{t.desc}</p>
            </div>
          ))}
        </div>
        
        {activeTattva && (
          <div className="mt-4 p-4 bg-stone-900 dark:bg-stone-800 text-stone-100 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2">
            <Search className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-sm leading-relaxed">
              Exploring the attributes of {tattvas.find(t => t.id === activeTattva)?.name}. In Sankhya philosophy, this represents a fundamental aspect of reality.
            </p>
          </div>
        )}
      </div>
      
      {/* Decorative gradient */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full" />
    </div>
  )
}
