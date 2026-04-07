'use client'

import React, { useState } from 'react'
import VedicAppTemplate from './vedic-app-template'

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
      darkMode={true}
      pocMode={true}
      footerNote="Currently uses a word-split placeholder. Full Paninian grammar and morphology parsing arriving in Phase 4."
    >
      {!result ? (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-1">Sanskrit Line</label>
            <textarea
              placeholder="Paste a Sanskrit Shloka here (Devanagari or Transliteration)..."
              value={shloka}
              onChange={(e) => setShloka(e.target.value)}
              className="w-full bg-stone-800/50 border border-stone-700 p-4 rounded-xl focus:border-orange-400 outline-none transition-all placeholder:text-stone-400 text-stone-100 font-sans resize-none h-24 shadow-inner"
            />
          </div>

          <button
            onClick={analyzeGrammar}
            disabled={!shloka || isAnalyzing}
            className="btn-primary w-full shadow-saffron-100"
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
                  <div className="text-[10px] uppercase tracking-widest text-orange-600 font-black mb-1">{item.pos}</div>
                  <div className="text-xs text-stone-600 font-semibold">{item.meaning}</div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => { setResult(null); setShloka(''); }}
            className="btn-secondary w-full"
          >
            Tokenize Another Verse
          </button>
        </div>
      )}
    </VedicAppTemplate>
  )
}
