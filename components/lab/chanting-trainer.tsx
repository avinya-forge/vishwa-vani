'use client'

import { useState } from 'react'
import { Play, Pause, RotateCcw, Volume2, Mic } from 'lucide-react'

export default function ChantingTrainer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeMantra, setActiveMantra] = useState('om-namo-bhagavate')

  const mantras = [
    { id: 'om-namo-bhagavate', title: 'Om Namo Bhagavate', text: 'Om Namo Bhagavate Vasudevaya', origin: 'Srimad Bhagavatam' },
    { id: 'gayatri', title: 'Gayatri Mantra', text: 'Om Bhur Bhuva Swaha...', origin: 'Rig Veda / Gita' },
    { id: 'shanti', title: 'Shanti Mantra', text: 'Om Sahana Vavatu...', origin: 'Upanishads' }
  ]

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1A1512] rounded-3xl border border-stone-200 dark:border-stone-800 p-6 overflow-hidden relative group">
      <div className="flex justify-between items-start mb-6 z-10">
        <div>
          <div className="text-xs font-black uppercase tracking-widest text-orange-500 mb-1">Sonic Lab</div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 leading-tight">Chanting Trainer</h2>
        </div>
        <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
          <Mic className="w-5 h-5 text-orange-600 dark:text-orange-400" />
        </div>
      </div>

      <div className="flex-1 flex flex-col z-10">
        <select 
          className="w-full bg-stone-100 dark:bg-stone-800/50 border-none rounded-xl p-3 text-sm mb-6 outline-none text-stone-700 dark:text-stone-300 focus:ring-2 focus:ring-orange-500/50"
          value={activeMantra}
          onChange={(e) => setActiveMantra(e.target.value)}
        >
          {mantras.map(m => (
            <option key={m.id} value={m.id}>{m.title}</option>
          ))}
        </select>

        <div className="flex-1 flex items-center justify-center text-center px-4 py-8 bg-stone-50 dark:bg-[#221C18] rounded-2xl border border-stone-200/50 dark:border-stone-700/50 mb-6">
          <p className="font-serif text-xl md:text-2xl text-stone-800 dark:text-stone-200 leading-relaxed">
            {mantras.find(m => m.id === activeMantra)?.text}
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mt-auto">
          <button className="p-3 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 transition-colors">
            <Volume2 className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-14 h-14 rounded-full bg-orange-600 hover:bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20 transition-all active:scale-95"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </button>
          <button className="p-3 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 transition-colors">
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Decorative gradient */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-orange-500/10 blur-3xl rounded-full" />
    </div>
  )
}
