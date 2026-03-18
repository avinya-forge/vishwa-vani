'use client'

import React, { useState } from 'react'

const ELEMENTS = [
  { name: 'Prithvi (Earth)', icon: '🌱', color: 'from-emerald-600 to-green-800', desc: 'Stability, groundedness, and structural strength.' },
  { name: 'Jala (Water)', icon: '🌊', color: 'from-blue-500 to-indigo-700', desc: 'Flow, adaptability, and emotional depth.' },
  { name: 'Agni (Fire)', icon: '🔥', color: 'from-orange-500 to-red-700', desc: 'Transformation, energy, and focused intent.' },
  { name: 'Vayu (Air)', icon: '🌬️', color: 'from-sky-400 to-blue-500', desc: 'Movement, intellect, and expansive communication.' },
  { name: 'Akasha (Ether)', icon: '✨', color: 'from-purple-600 to-indigo-900', desc: 'Space, consciousness, and eternal connectivity.' },
]

export default function AstroExplorer() {
  const [name, setName] = useState('')
  const [result, setResult] = useState<typeof ELEMENTS[0] | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const calculateElement = () => {
    if (!name) return
    setIsCalculating(true)
    
    // Simple Vedic Numerology Logic (Sum of characters % 5)
    setTimeout(() => {
      const sum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
      const index = sum % 5
      setResult(ELEMENTS[index])
      setIsCalculating(false)
    }, 1200)
  }

  return (
    <div className="bg-stone-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full -mr-32 -mt-32 blur-[80px]" />
      
      <div className="relative z-10">
        <h3 className="text-xl font-serif font-bold mb-2 flex items-center gap-2">
          <span className="text-2xl animate-pulse">🌌</span> Vedic Astro Explorer
        </h3>
        <p className="text-xs text-stone-400 mb-8 uppercase tracking-widest font-bold">
          Pancha-Tattva Diagnostics
        </p>

        {!result ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest ml-1">Identity Reflection</label>
              <input 
                type="text" 
                placeholder="Enter your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-orange-500 outline-none transition-all placeholder:text-stone-700"
              />
            </div>
            
            <button 
                onClick={calculateElement}
                disabled={!name || isCalculating}
                className="w-full py-4 bg-orange-600 hover:bg-orange-700 disabled:bg-stone-800 text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-xs transition-all shadow-lg active:scale-95"
            >
              {isCalculating ? 'Consulting Akasha...' : 'Discover Tattva'}
            </button>
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in-95 duration-500 text-center">
            <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${result.color} flex items-center justify-center text-4xl shadow-2xl shadow-black mb-6 border-2 border-white/20`}>
              {result.icon}
            </div>
            <h4 className="text-2xl font-serif font-bold mb-2">{result.name}</h4>
            <p className="text-stone-400 text-xs leading-relaxed mb-6 px-4">
              {result.desc}
            </p>
            
            <button 
                onClick={() => { setResult(null); setName(''); }}
                className="text-[10px] font-bold uppercase tracking-widest text-orange-500 hover:text-orange-400 transition-colors"
            >
              ← Search Another
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-white/5">
        <p className="text-[9px] text-stone-600 leading-tight">
          * This module uses Guna-Shastra algorithm (Experimental PoC). Accurate Horoscope requiring Janma-Kundali is coming in Phase 4.
        </p>
      </div>
    </div>
  )
}
