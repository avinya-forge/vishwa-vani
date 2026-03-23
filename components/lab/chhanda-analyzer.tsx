'use client'

import React, { useState } from 'react'
import VedicAppTemplate from './VedicAppTemplate'

export default function ChhandaAnalyzer() {
  const [shloka, setShloka] = useState('')
  const [result, setResult] = useState<{ meter: string, breakdown: string[], syllables: number } | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeMeter = () => {
    if (!shloka) return
    setIsAnalyzing(true)

    // Simple placeholder algorithm prioritizing Anushtubh and Gayatri validation for the PoC
    setTimeout(() => {
      const cleanShloka = shloka.replace(/\s+/g, '')
      const syllables = cleanShloka.length // Very naive syllable count for mock
      let meter = 'Unknown Meter'
      if (syllables >= 30 && syllables <= 34) {
        meter = 'Anushtubh (32 Syllables)'
      } else if (syllables >= 22 && syllables <= 26) {
        meter = 'Gayatri (24 Syllables)'
      } else if (syllables >= 42 && syllables <= 46) {
        meter = 'Trishtubh (44 Syllables)'
      }

      setResult({
        meter,
        syllables: syllables,
        breakdown: ['a', 'nu', 'sh', 'tu', 'bh']
      })
      setIsAnalyzing(false)
    }, 1500)
  }

  return (
    <VedicAppTemplate
      title="Meter Analyzer"
      subtitle="Chhanda Validation Engine"
      icon="📜"
      footerNote="This module currently uses a simple string-length approximator. Full algorithmic syllable parsing coming in Phase 4."
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
            onClick={analyzeMeter}
            disabled={!shloka || isAnalyzing}
            className="w-full py-3 bg-stone-900 hover:bg-orange-600 disabled:bg-stone-200 disabled:text-stone-400 text-white rounded-xl font-black uppercase tracking-widest text-[11px] transition-all shadow-md active:scale-[0.98]"
          >
            {isAnalyzing ? 'Tracing Syllables...' : 'Analyze Chhanda'}
          </button>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 bg-orange-50/50 p-6 rounded-2xl border border-orange-100">
          <div className="text-center mb-6">
            <div className="text-orange-500 font-black text-3xl mb-1">{result.syllables}</div>
            <div className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Estimated Syllables</div>
          </div>
          
          <div className="bg-white rounded-xl p-4 border border-stone-100 shadow-sm text-center">
            <h4 className="font-serif font-black text-stone-800 text-lg">{result.meter}</h4>
            <p className="text-[11px] text-stone-500 mt-2">
              The Chhanda (meter) governs the rhythm, tone, and recitation duration of the verse.
            </p>
          </div>

          <button
            onClick={() => { setResult(null); setShloka(''); }}
            className="w-full mt-6 py-2.5 bg-white border border-stone-200 hover:border-orange-300 hover:text-orange-600 text-stone-500 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all"
          >
            Analyze Another Verse
          </button>
        </div>
      )}
    </VedicAppTemplate>
  )
}
