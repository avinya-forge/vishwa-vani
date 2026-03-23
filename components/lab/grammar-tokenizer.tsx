'use client'

import React, { useState } from 'react'
import VedicAppTemplate from './VedicAppTemplate'

export default function GrammarTokenizer() {
  const [shloka, setShloka] = useState('')
  const [result, setResult] = useState<{ word: string, pos: string, meaning: string }[] | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeGrammar = () => {
    if (!shloka) return
    setIsAnalyzing(true)

    // Mock API for PoC
    setTimeout(() => {
      // Very basic split just to demonstrate the UI
      const words = shloka.split(/\s+/).filter(w => w.length > 0)
      const mockResult = words.map((w, i) => ({
        word: w,
        pos: i % 2 === 0 ? 'Noun (संज्ञा)' : 'Verb (क्रिया)',
        meaning: `Mock meaning for ${w}`
      }))
      
      setResult(mockResult)
      setIsAnalyzing(false)
    }, 1800)
  }

  return (
    <VedicAppTemplate
      title="Sanskrit Tokenizer"
      subtitle="Grammar & Morphology"
      icon="🧩"
      footerNote="This module currently uses a placeholder word-split algorithm. Full Paninian grammar parsing coming in Phase 4."
    >
      {!result ? (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">Sanskrit Line</label>
            <textarea
              placeholder="Paste a Sanskrit Shloka here (Devanagari or Transliteration)..."
              value={shloka}
              onChange={(e) => setShloka(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 p-4 rounded-xl focus:border-orange-400 outline-none transition-all placeholder:text-stone-300 text-[13px] text-stone-800 font-sans resize-none h-24 shadow-inner"
            />
          </div>

          <button
            onClick={analyzeGrammar}
            disabled={!shloka || isAnalyzing}
            className="w-full py-3 bg-stone-900 hover:bg-orange-600 disabled:bg-stone-200 disabled:text-stone-400 text-white rounded-xl font-black uppercase tracking-widest text-[11px] transition-all shadow-md active:scale-[0.98]"
          >
            {isAnalyzing ? 'Parsing Morphology...' : 'Tokenize Shloka'}
          </button>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 bg-orange-50/50 p-4 rounded-2xl border border-orange-100">
          
          <div className="flex flex-col gap-3 max-h-64 overflow-y-auto custom-scrollbar pr-2 mb-4">
            {result.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-3 border border-stone-100 shadow-sm flex items-start gap-4">
                <div className="bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-200 min-w-[30%] text-center">
                  <span className="font-serif font-black text-stone-800">{item.word}</span>
                </div>
                <div className="flex-1">
                  <div className="text-[9px] uppercase tracking-widest text-orange-500 font-bold mb-1">{item.pos}</div>
                  <div className="text-[11px] text-stone-600 font-medium">{item.meaning}</div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => { setResult(null); setShloka(''); }}
            className="w-full py-2.5 bg-white border border-stone-200 hover:border-orange-300 hover:text-orange-600 text-stone-500 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all"
          >
            Tokenize Another Verse
          </button>
        </div>
      )}
    </VedicAppTemplate>
  )
}
