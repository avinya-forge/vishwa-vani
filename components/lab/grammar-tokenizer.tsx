'use client'

import React, { useState } from 'react'
import VedicAppTemplate from './vedic-app-template'

// Rule-based POS tagging lookup table (LAB-803)
const POS_DICTIONARY: Record<string, { pos: string, meaning: string }> = {
  'dharma': { pos: 'Noun', meaning: 'Duty, righteousness, cosmic law' },
  'karma': { pos: 'Noun', meaning: 'Action, deed, work' },
  'yoga': { pos: 'Noun', meaning: 'Union, practice, discipline' },
  'brahman': { pos: 'Noun', meaning: 'Ultimate reality, cosmic spirit' },
  'atman': { pos: 'Noun', meaning: 'Self, soul' },
  'krsna': { pos: 'Noun', meaning: 'Krishna, the dark one' },
  'arjuna': { pos: 'Noun', meaning: 'Arjuna, the white/clear one' },
  'uvaca': { pos: 'Verb', meaning: 'Said, spoke' },
  'kurute': { pos: 'Verb', meaning: 'Does, performs' },
  'gacchati': { pos: 'Verb', meaning: 'Goes' },
  'pasyati': { pos: 'Verb', meaning: 'Sees' },
  'bhavati': { pos: 'Verb', meaning: 'Becomes, is' },
  'aham': { pos: 'Pronoun', meaning: 'I' },
  'tvam': { pos: 'Pronoun', meaning: 'You' },
  'sah': { pos: 'Pronoun', meaning: 'He, that' },
  'tat': { pos: 'Pronoun', meaning: 'That' },
  'ca': { pos: 'Conjunction', meaning: 'And' },
  'tu': { pos: 'Conjunction', meaning: 'But, indeed' },
  'eva': { pos: 'Particle', meaning: 'Indeed, truly' },
  'na': { pos: 'Particle', meaning: 'Not' },
  'api': { pos: 'Particle', meaning: 'Also, even' },
  'su': { pos: 'Prefix', meaning: 'Good, well' },
  'dur': { pos: 'Prefix', meaning: 'Bad, difficult' },
  'maha': { pos: 'Adjective', meaning: 'Great' },
  'satya': { pos: 'Adjective', meaning: 'True, real' }
}

export default function GrammarTokenizer() {
  const [shloka, setShloka] = useState('')
  const [result, setResult] = useState<{ word: string, pos: string, meaning: string }[] | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeGrammar = () => {
    if (!shloka) return
    setIsAnalyzing(true)

    setTimeout(() => {
      const words = shloka.split(/\s+/).filter(w => w.length > 0)
      const tokenizedResult = words.map((w) => {
        const cleanWord = w.toLowerCase().replace(/[^a-z]/g, '')
        const lookup = POS_DICTIONARY[cleanWord]
        if (lookup) {
          return { word: w, pos: lookup.pos, meaning: lookup.meaning }
        }

        // Fallbacks for unknown words
        let pos = 'Unknown'
        if (cleanWord.endsWith('ti') || cleanWord.endsWith('te')) {
          pos = 'Verb (Probable)'
        } else if (cleanWord.endsWith('am') || cleanWord.endsWith('as')) {
          pos = 'Noun (Probable)'
        }

        return {
          word: w,
          pos,
          meaning: `No dictionary entry for ${w}`
        }
      })
      
      setResult(tokenizedResult)
      setIsAnalyzing(false)
    }, 1000)
  }

  return (
    <VedicAppTemplate
      title="Sanskrit Tokenizer"
      subtitle="Grammar & Morphology"
      icon="🧩"
      darkMode={true}
      footerNote="Rule-based POS tagging with common roots dictionary."
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
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 bg-stone-800 p-4 rounded-2xl border border-stone-700">
          
          <div className="flex flex-col gap-3 max-h-64 overflow-y-auto custom-scrollbar pr-2 mb-4">
            {result.map((item, idx) => (
              <div key={idx} className="bg-stone-900 rounded-xl p-3 border border-stone-800 shadow-sm flex items-start gap-4">
                <div className="bg-stone-800 px-3 py-1.5 rounded-lg border border-stone-700 min-w-[30%] text-center">
                  <span className="font-serif font-black text-stone-200">{item.word}</span>
                </div>
                <div className="flex-1">
                  <div className="text-[10px] uppercase tracking-widest text-orange-400 font-black mb-1">{item.pos}</div>
                  <div className="text-xs text-stone-400 font-semibold">{item.meaning}</div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => { setResult(null); setShloka(''); }}
            className="btn-secondary w-full bg-stone-700 hover:bg-stone-600 text-white border-none"
          >
            Tokenize Another Verse
          </button>
        </div>
      )}
    </VedicAppTemplate>
  )
}
