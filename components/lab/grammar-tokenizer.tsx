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
          pos = 'Verb'
        } else if (cleanWord.endsWith('am') || cleanWord.endsWith('as')) {
          pos = 'Noun'
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

  const footerNote = "Rule-based POS tagging with common roots dictionary. Useful for basic morphology analysis."

  return (
    <VedicAppTemplate
      title="Morphology"
      subtitle="Vedic Grammar • Tokenizer"
      icon="🧩"
      footerNote={footerNote}
    >
      {!result ? (
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-stone-500 ml-1">
              <span>Sanskrit Line</span>
              <span className="text-orange-600">Grammar Engine</span>
            </div>
            <textarea
              placeholder="Paste a Sanskrit Shloka here (Devanagari or Transliteration)..."
              value={shloka}
              onChange={(e) => setShloka(e.target.value)}
              className="w-full bg-stone-100 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/50 p-4 rounded-2xl focus:border-orange-500 outline-none transition-all placeholder:text-stone-400 text-stone-900 dark:text-stone-100 font-sans resize-none h-24 shadow-inner"
            />
          </div>

          <button
            onClick={analyzeGrammar}
            disabled={!shloka || isAnalyzing}
            className="w-full py-4 bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl disabled:opacity-50"
          >
            {isAnalyzing ? 'Parsing Morphology...' : 'Tokenize Shloka'}
          </button>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-4">
          <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
            {result.map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-stone-900/40 rounded-2xl p-4 border border-stone-100 dark:border-stone-800 flex items-start gap-4">
                <div className="bg-stone-50 dark:bg-stone-800 px-3 py-1.5 rounded-xl border border-stone-200/50 dark:border-stone-700/50 min-w-[80px] text-center">
                  <span className="font-serif italic font-black text-stone-900 dark:text-stone-200 text-xs">{item.word}</span>
                </div>
                <div className="flex-1">
                  <div className="text-[9px] uppercase tracking-widest text-orange-600 font-black mb-1">{item.pos}</div>
                  <div className="text-[10px] text-stone-500 dark:text-stone-400 font-medium leading-relaxed italic font-serif ">{item.meaning}</div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => { setResult(null); setShloka(''); }}
            className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-orange-600/20 mt-2"
          >
            Tokenize Next Verse
          </button>
        </div>
      )}
    </VedicAppTemplate>
  )
}
