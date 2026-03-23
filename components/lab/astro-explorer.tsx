'use client'

import React, { useState } from 'react'
import vedic-app-template from './vedic-app-template'

const ELEMENTS = [
  { name: 'Prithvi (Earth)', icon: '🌱', color: 'from-emerald-600 to-green-800', desc: 'Stability, groundedness, and structural strength.' },
  { name: 'Jala (Water)', icon: '🌊', color: 'from-blue-500 to-indigo-700', desc: 'Flow, adaptability, and emotional depth.' },
  { name: 'Agni (Fire)', icon: '🔥', color: 'from-orange-500 to-red-700', desc: 'Transformation, energy, and focused intent.' },
  { name: 'Vayu (Air)', icon: '🌬️', color: 'from-sky-400 to-blue-500', desc: 'Movement, intellect, and expansive communication.' },
  { name: 'Akasha (Ether)', icon: '✨', color: 'from-purple-600 to-indigo-900', desc: 'Space, consciousness, and eternal connectivity.' },
]

export default function astro-explorer() {
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
    <vedic-app-template
      title="Astro Explorer"
      subtitle="Pancha-Tattva Elements"
      icon="🌌"
      footerNote="This module uses an experimental Guna-Shastra algorithm. Accurate readings requiring Janma-Kundali are in the Phase 4 roadmap."
    >
      {!result ? (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">Identity Reflection</label>
            <input 
              type="text" 
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 p-4 rounded-xl focus:border-orange-400 outline-none transition-all placeholder:text-stone-300 text-[13px] text-stone-800 shadow-inner"
            />
          </div>
          
          <button 
              onClick={calculateElement}
              disabled={!name || isCalculating}
              className="w-full py-3 bg-stone-900 hover:bg-orange-600 disabled:bg-stone-200 disabled:text-stone-400 text-white rounded-xl font-black uppercase tracking-widest text-[11px] transition-all shadow-md active:scale-[0.98]"
          >
            {isCalculating ? 'Consulting Akasha...' : 'Discover Tattva'}
          </button>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 bg-orange-50/50 p-6 rounded-2xl border border-orange-100 text-center">
          <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${result.color} flex items-center justify-center text-3xl shadow-lg border border-white/40 mb-5`}>
            {result.icon}
          </div>
          
          <div className="bg-white rounded-xl p-4 border border-stone-100 shadow-sm text-center">
            <h4 className="font-serif font-black text-stone-800 text-lg mb-2">{result.name}</h4>
            <p className="text-[11px] text-stone-500 leading-relaxed px-2">
              {result.desc}
            </p>
          </div>

          <button 
              onClick={() => { setResult(null); setName(''); }}
              className="w-full mt-6 py-2.5 bg-white border border-stone-200 hover:border-orange-300 hover:text-orange-600 text-stone-500 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all"
          >
            Search Another Element
          </button>
        </div>
      )}
    </vedic-app-template>
  )
}
