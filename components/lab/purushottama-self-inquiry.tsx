'use client'
import React, { useState } from 'react'
import VedicAppTemplate from './vedic-app-template'

interface Question {
  id: number
  text: string
  options: { label: string; level: 'kshara' | 'akshara' | 'purushottama' }[]
}

interface Level {
  name: string
  sanskrit: string
  gitaRef: string
  description: string
  characteristic: string
  howToRise: string
  icon: string
  color: string
  border: string
}

const LEVELS: Record<'kshara' | 'akshara' | 'purushottama', Level> = {
  kshara: {
    name: 'Kshara Purusha',
    sanskrit: 'Kṣara Puruṣa',
    gitaRef: 'BG 15.16',
    description: 'The perishable — the realm of all living beings and material existence. Subject to change, birth, growth, decay, and death. This is the world of duality, desire, and embodied experience.',
    characteristic: 'Identity is primarily located in the body, relationships, roles, and outcomes. What happens to these feels like what happens to "me."',
    howToRise: 'Observe the body as a vehicle rather than a self. Notice that awareness persists even as body sensations change. The witness is not the watched.',
    icon: '🌱',
    color: 'bg-green-50 dark:bg-green-950/20',
    border: 'border-green-300 dark:border-green-700',
  },
  akshara: {
    name: 'Akshara Purusha',
    sanskrit: 'Akṣara Puruṣa',
    gitaRef: 'BG 15.16',
    description: 'The imperishable — the unchanging witness consciousness that observes all experience without being touched by it. Beyond birth and death, beyond pleasure and pain. The silent ground of awareness.',
    characteristic: 'A stable witness quality. Events are experienced but not identified with. There is freedom from the compulsive reaction to circumstances.',
    howToRise: 'The Akshara is already fully present — it cannot be achieved, only recognised. The next step is not rising but seeing that no separation exists between Akshara and Purushottama.',
    icon: '🌕',
    color: 'bg-blue-50 dark:bg-blue-950/20',
    border: 'border-blue-300 dark:border-blue-700',
  },
  purushottama: {
    name: 'Purushottama',
    sanskrit: 'Puruṣottama',
    gitaRef: 'BG 15.17–18',
    description: 'The Supreme Person — beyond both the perishable and the imperishable. Not just the witness but the very ground of being from which both worlds arise. Krishna calls Himself by this name.',
    characteristic: 'No separation between the knower, the known, and the knowing. The boundary between self and world has dissolved — not as merger into blankness but as fullness overflowing into form.',
    howToRise: 'There is no practice that reaches Purushottama from the outside. It is recognized when the seeker and the sought are understood to be the same. Ask: "Who is seeking?"',
    icon: '☀️',
    color: 'bg-amber-50 dark:bg-amber-950/20',
    border: 'border-amber-300 dark:border-amber-700',
  },
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'When something bad happens to your body — pain, illness, aging — how do you primarily experience it?',
    options: [
      { label: 'It happens to me — I am this body, and I suffer.', level: 'kshara' },
      { label: 'It happens in me — I observe the pain but know I am not only this.', level: 'akshara' },
      { label: 'It happens through me — arising in awareness like a wave, leaving the ocean unchanged.', level: 'purushottama' },
    ],
  },
  {
    id: 2,
    text: 'When you think about your own death, what is the most honest response?',
    options: [
      { label: 'Fear or avoidance — death is the end of everything I am.', level: 'kshara' },
      { label: 'Inquiry — something in me seems untouched, though I cannot fully rest in that knowing.', level: 'akshara' },
      { label: 'Ease — that which witnesses death cannot itself die; there is no "my" death.', level: 'purushottama' },
    ],
  },
  {
    id: 3,
    text: 'When you sit in silence with no task to perform, what most often happens?',
    options: [
      { label: 'Restlessness — the mind reaches for its phone, a thought, something to do.', level: 'kshara' },
      { label: 'Settling — there is a quality of stillness available, though the mind still moves.', level: 'akshara' },
      { label: 'Recognition — the silence feels like home; the one who is "sitting" dissolves into it.', level: 'purushottama' },
    ],
  },
  {
    id: 4,
    text: 'When someone you love acts hurtfully, what arises?',
    options: [
      { label: 'Reactivity — hurt, anger, or withdrawal that feels automatic and total.', level: 'kshara' },
      { label: 'Space — the feeling arises, but you can also observe it; you are not only the feeling.', level: 'akshara' },
      { label: 'Compassion without contraction — the action is seen, the person is seen, and love persists unchanged.', level: 'purushottama' },
    ],
  },
]

function tally(answers: Record<number, 'kshara' | 'akshara' | 'purushottama'>): 'kshara' | 'akshara' | 'purushottama' {
  const counts = { kshara: 0, akshara: 0, purushottama: 0 }
  Object.values(answers).forEach(v => { counts[v]++ })
  return (Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]) as 'kshara' | 'akshara' | 'purushottama'
}

export default function PurushottamaSelfInquiry() {
  const [answers, setAnswers] = useState<Record<number, 'kshara' | 'akshara' | 'purushottama'>>({})
  const [showResult, setShowResult] = useState(false)

  const allAnswered = QUESTIONS.every(q => answers[q.id] !== undefined)
  const result = showResult && allAnswered ? tally(answers) : null
  const level = result ? LEVELS[result] : null

  return (
    <VedicAppTemplate
      title="Puruṣottama Self-Inquiry"
      subtitle="Chapter 15 — Discover your level of identification"
      icon="☀️"
      footerNote="Bhagavad Gita Chapter 15 — Purushottama Yoga"
    >
      {/* Tree diagram */}
      <div className="flex items-end justify-center gap-3 mb-6 py-4 border border-stone-100 dark:border-stone-800 rounded-xl bg-stone-50/50 dark:bg-stone-900/20">
        {(['kshara', 'akshara', 'purushottama'] as const).map((k, i) => {
          const l = LEVELS[k]
          const heights = ['h-8', 'h-14', 'h-20']
          return (
            <div key={k} className="flex flex-col items-center gap-1.5">
              <span className="text-lg">{l.icon}</span>
              <div className={`${heights[i]} w-8 rounded-t-md transition-all ${result === k ? (k === 'kshara' ? 'bg-green-400' : k === 'akshara' ? 'bg-blue-400' : 'bg-amber-400') : 'bg-stone-200 dark:bg-stone-700'}`} />
              <p className="text-[8px] font-black uppercase tracking-widest text-stone-400 text-center leading-tight w-12">{l.name.split(' ')[0]}</p>
            </div>
          )
        })}
      </div>

      {/* Questions */}
      <div className="space-y-5 mb-5">
        {QUESTIONS.map(q => (
          <div key={q.id}>
            <p className="text-xs font-black uppercase tracking-widest text-stone-400 mb-2">Q{q.id}</p>
            <p className="text-sm text-stone-800 dark:text-stone-200 leading-relaxed mb-3">{q.text}</p>
            <div className="space-y-2">
              {q.options.map((opt, oi) => (
                <button
                  key={oi}
                  onClick={() => { setAnswers(a => ({ ...a, [q.id]: opt.level })); setShowResult(false) }}
                  className={`w-full text-left p-3 rounded-xl border-2 text-xs text-stone-700 dark:text-stone-300 leading-relaxed transition-all duration-200 ${
                    answers[q.id] === opt.level
                      ? LEVELS[opt.level].border + ' ' + LEVELS[opt.level].color
                      : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Reveal */}
      {allAnswered && !showResult && (
        <button onClick={() => setShowResult(true)}
          className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black uppercase tracking-widest transition-colors">
          Reveal My Level
        </button>
      )}

      {/* Result */}
      {level && (
        <div className={`rounded-xl border-2 p-5 ${level.border} ${level.color}`}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{level.icon}</span>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Currently Identifying As</p>
              <p className="text-base font-bold text-stone-800 dark:text-stone-200">{level.name}</p>
              <p className="text-xs text-amber-600 dark:text-amber-400 font-bold">{level.gitaRef} — {level.sanskrit}</p>
            </div>
          </div>
          <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed mb-3">{level.description}</p>
          <div className="border-t border-stone-200 dark:border-stone-700 pt-3 space-y-2">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">Current Pattern</p>
              <p className="text-xs text-stone-600 dark:text-stone-400 italic">{level.characteristic}</p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">Path of Inquiry</p>
              <p className="text-xs text-stone-600 dark:text-stone-400">{level.howToRise}</p>
            </div>
          </div>
          <button onClick={() => { setAnswers({}); setShowResult(false) }}
            className="mt-4 text-xs font-bold text-stone-400 hover:text-stone-600 transition-colors">
            Retake →
          </button>
        </div>
      )}
    </VedicAppTemplate>
  )
}
