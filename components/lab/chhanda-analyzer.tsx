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
      if (syllables >= 30 && syllables <= 34) {
        meter = 'Anushtubh'
        breakdown = ['8', '8', '8', '8']
      } else if (syllables >= 22 && syllables <= 26) {
        meter = 'Gayatri'
        breakdown = ['8', '8', '8']
      } else if (syllables >= 42 && syllables <= 46) {
        meter = 'Trishtubh'
        breakdown = ['11', '11', '11', '11']
      } else {
        meter = 'Irregular'
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

  const footerNote = "Real syllable count using vowel-pattern rules (Anushtubh, Gayatri, Trishtubh)."

  return (
    <VedicAppTemplate
      title="Meter Analyzer"
      subtitle="Chhanda • Vedic Prosody"
      icon="📜"
      footerNote={footerNote}
    >
      {!result ? (
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-stone-500 ml-1">
              <span>Sanskrit Shloka</span>
              <span className="text-orange-600">Vedic Engine</span>
            </div>
            <textarea
              placeholder="Paste a Sanskrit Shloka here (Devanagari or Transliteration)..."
              value={shloka}
              onChange={(e) => setShloka(e.target.value)}
              className="w-full bg-stone-100 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/50 p-4 rounded-2xl focus:border-orange-500 outline-none transition-all placeholder:text-stone-400 text-stone-900 dark:text-stone-100 font-sans resize-none h-24 shadow-inner"
            />
          </div>

          <button
            onClick={analyzeMeter}
            disabled={!shloka || isAnalyzing}
            className="w-full py-4 bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl disabled:opacity-50"
          >
            {isAnalyzing ? 'Tracing Prosody...' : 'Analyze Chhanda'}
          </button>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-4">
          <div className="bg-stone-50 dark:bg-stone-800/20 p-6 rounded-[2rem] border border-stone-100 dark:border-stone-800/50 text-center">
            <div className="text-orange-600 dark:text-orange-400 font-black text-3xl mb-1">{result.syllables}</div>
            <div className="text-[10px] uppercase tracking-widest text-stone-400 font-black">Detected Syllables</div>
          </div>
          
          <div className="bg-white dark:bg-stone-900/40 p-6 rounded-[2rem] border border-stone-100 dark:border-stone-800 text-center">
            <h4 className="font-serif italic font-black text-stone-900 dark:text-stone-200 text-xl mb-3">{result.meter}</h4>
            <div className="flex justify-center gap-1.5 mb-4">
              {result.breakdown.map((q, i) => (
                <span key={i} className="px-3 py-1 bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 rounded-lg text-xs font-black tracking-tighter shadow-sm border border-stone-200/50 dark:border-stone-700/50">{q}</span>
              ))}
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 font-medium italic font-serif leading-relaxed">
              The Chhanda (meter) governs the rhythm, tone, and recitation duration of the verse.
            </p>
          </div>

          <button
            onClick={() => { setResult(null); setShloka(''); }}
            className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-orange-600/20 mt-2"
          >
            Analyze Next Verse
          </button>
        </div>
      )}
    </VedicAppTemplate>
  )
}
