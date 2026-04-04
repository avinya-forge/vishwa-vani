'use client'

import React, { useState } from 'react'
import VedicAppTemplate from './vedic-app-template'

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
      darkMode={true}
      footerNote="This module currently uses a simple string-length approximator. Full algorithmic syllable parsing coming in Phase 4."
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
            onClick={analyzeMeter}
            disabled={!shloka || isAnalyzing}
            className="btn-primary w-full shadow-saffron-100"
          >
            {isAnalyzing ? 'Tracing Syllables...' : 'Analyze Chhanda'}
          </button>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 bg-orange-50/50 p-6 rounded-2xl border border-orange-100">
          <div className="text-center mb-6">
            <div className="text-orange-500 font-black text-3xl mb-1">{result.syllables}</div>
            <div className="text-[11px] uppercase tracking-widest text-stone-500 font-black">Estimated Syllables</div>
          </div>
          
          <div className="bg-white rounded-xl p-4 border border-stone-100 shadow-sm text-center">
            <h4 className="font-serif font-black text-stone-800 text-lg">{result.meter}</h4>
            <p className="text-xs text-stone-500 mt-2 font-medium">
              The Chhanda (meter) governs the rhythm, tone, and recitation duration of the verse.
            </p>
          </div>

          <button
            onClick={() => { setResult(null); setShloka(''); }}
            className="btn-secondary w-full mt-6"
          >
            Analyze Another Verse
          </button>
        </div>
      )}
    </VedicAppTemplate>
  )
}
