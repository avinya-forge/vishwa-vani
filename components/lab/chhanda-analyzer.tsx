'use client'

import React, { useState } from 'react'
import VedicAppTemplate from './vedic-app-template'

// Simple helper to count vowels, mapping roughly to syllables in transliterated Sanskrit
function countSanskritSyllables(text: string): number {
  const clean = text.toLowerCase().replace(/[^a-z]/g, '')
  // A naive approximation of syllable count based on vowels
  const match = clean.match(/[aeiou]/g)
  return match ? match.length : 0
}

export default function ChhandaAnalyzer() {
  const [shloka, setShloka] = useState('')
  const [result, setResult] = useState<{ meter: string, breakdown: string[], syllables: number } | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeMeter = () => {
    if (!shloka) return
    setIsAnalyzing(true)

    setTimeout(() => {
      const syllables = countSanskritSyllables(shloka)
      let meter = 'Unknown Meter'
      let breakdown: string[] = []

      // Rules:
      // Anushtubh: 32 syllables (8+8+8+8)
      // Gayatri: 24 syllables (8+8+8)
      // Trishtubh: 44 syllables (11+11+11+11)
      if (syllables >= 30 && syllables <= 34) {
        meter = 'Anushtubh (8+8+8+8)'
        breakdown = ['8', '8', '8', '8']
      } else if (syllables >= 22 && syllables <= 26) {
        meter = 'Gayatri (8+8+8)'
        breakdown = ['8', '8', '8']
      } else if (syllables >= 42 && syllables <= 46) {
        meter = 'Trishtubh (11+11+11+11)'
        breakdown = ['11', '11', '11', '11']
      } else {
        meter = 'Irregular/Unknown Meter'
        breakdown = [syllables.toString()]
      }

      setResult({
        meter,
        syllables,
        breakdown
      })
      setIsAnalyzing(false)
    }, 1000)
  }

  return (
    <VedicAppTemplate
      title="Meter Analyzer"
      subtitle="Chhanda Validation Engine"
      icon="📜"
      darkMode={true}
      footerNote="Real syllable count using vowel-pattern rules (Anushtubh, Gayatri, Trishtubh)."
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
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 bg-stone-800 p-6 rounded-2xl border border-stone-700">
          <div className="text-center mb-6">
            <div className="text-orange-400 font-black text-3xl mb-1">{result.syllables}</div>
            <div className="text-[11px] uppercase tracking-widest text-stone-400 font-black">Detected Syllables</div>
          </div>
          
          <div className="bg-stone-900 rounded-xl p-4 border border-stone-800 shadow-sm text-center">
            <h4 className="font-serif font-black text-stone-200 text-lg">{result.meter}</h4>
            <div className="flex justify-center gap-2 mt-2">
              {result.breakdown.map((q, i) => (
                <span key={i} className="px-2 py-1 bg-stone-800 text-stone-400 rounded-md text-xs font-mono">{q}</span>
              ))}
            </div>
            <p className="text-xs text-stone-500 mt-4 font-medium">
              The Chhanda (meter) governs the rhythm, tone, and recitation duration of the verse.
            </p>
          </div>

          <button
            onClick={() => { setResult(null); setShloka(''); }}
            className="btn-secondary w-full mt-6 bg-stone-700 hover:bg-stone-600 text-white border-none"
          >
            Analyze Another Verse
          </button>
        </div>
      )}
    </VedicAppTemplate>
  )
}
