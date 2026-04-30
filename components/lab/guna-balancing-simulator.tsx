'use client'
import React, { useState } from 'react'
import VedicAppTemplate from './vedic-app-template'

type Guna = 'sattva' | 'rajas' | 'tamas'

interface Habit {
  id: string
  question: string
  category: string
  options: { label: string; guna: Guna; points: number }[]
}

const HABITS: Habit[] = [
  {
    id: 'sleep',
    question: 'How do you typically sleep?',
    category: 'Rest',
    options: [
      { label: 'Rise before dawn, feel refreshed', guna: 'sattva', points: 3 },
      { label: 'Sleep late, wake anxious or driven', guna: 'rajas', points: 3 },
      { label: 'Sleep excessively, feel heavy on waking', guna: 'tamas', points: 3 },
    ],
  },
  {
    id: 'food',
    question: 'What best describes your food choices?',
    category: 'Diet',
    options: [
      { label: 'Fresh, light, plant-based — eaten mindfully', guna: 'sattva', points: 3 },
      { label: 'Spicy, stimulating — eat fast, often on the go', guna: 'rajas', points: 3 },
      { label: 'Heavy, stale, processed — comfort eating', guna: 'tamas', points: 3 },
    ],
  },
  {
    id: 'work',
    question: 'How do you approach your work?',
    category: 'Action',
    options: [
      { label: 'Act without ego, offer results to a higher purpose', guna: 'sattva', points: 3 },
      { label: 'Driven by ambition, results, and recognition', guna: 'rajas', points: 3 },
      { label: 'Procrastinate, avoid challenges, feel inert', guna: 'tamas', points: 3 },
    ],
  },
  {
    id: 'emotion',
    question: 'Which emotional pattern dominates your day?',
    category: 'Mind',
    options: [
      { label: 'Equanimity — calm even under pressure', guna: 'sattva', points: 3 },
      { label: 'Agitation — reactive, passionate, restless', guna: 'rajas', points: 3 },
      { label: 'Dullness — apathy, depression, low motivation', guna: 'tamas', points: 3 },
    ],
  },
  {
    id: 'knowledge',
    question: 'What does knowledge mean to you?',
    category: 'Learning',
    options: [
      { label: 'Understanding the unity behind all things', guna: 'sattva', points: 3 },
      { label: 'Acquiring skills, status, and competitive edge', guna: 'rajas', points: 3 },
      { label: 'Clinging to fixed views, avoiding inquiry', guna: 'tamas', points: 3 },
    ],
  },
  {
    id: 'speech',
    question: 'How would others describe your speech?',
    category: 'Expression',
    options: [
      { label: 'Truthful, gentle, and uplifting', guna: 'sattva', points: 3 },
      { label: 'Persuasive, assertive, sometimes harsh', guna: 'rajas', points: 3 },
      { label: 'Minimal, negative, or gossipy', guna: 'tamas', points: 3 },
    ],
  },
]

const GUNA_PROFILES: Record<Guna, { label: string; emoji: string; color: string; bg: string; gitaRef: string; teaching: string; practice: string }> = {
  sattva: {
    label: 'Sattva Dominant',
    emoji: '☀️',
    color: 'text-amber-700 dark:text-amber-300',
    bg: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/50',
    gitaRef: 'BG 14.6',
    teaching: 'Sattva, being pure, is illuminating and free from disease. It binds the embodied soul by creating attachment to knowledge and happiness.',
    practice: 'Maintain through: sattvic food, regular meditation, study of scriptures, truthful speech, selfless service, and regulated sleep.',
  },
  rajas: {
    label: 'Rajas Dominant',
    emoji: '🔥',
    color: 'text-red-700 dark:text-red-300',
    bg: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800/50',
    gitaRef: 'BG 14.7',
    teaching: 'Rajas is of the nature of passion, born of unlimited desires and longings. It binds the embodied soul through attachment to action and its fruits.',
    practice: 'Evolve toward Sattva: channel energy into selfless service, reduce stimulants, practice pranayama before reacting, offer work results without attachment.',
  },
  tamas: {
    label: 'Tamas Dominant',
    emoji: '🌑',
    color: 'text-stone-600 dark:text-stone-400',
    bg: 'bg-stone-100 dark:bg-stone-800/50 border-stone-300 dark:border-stone-600/50',
    gitaRef: 'BG 14.8',
    teaching: 'Tamas, born of ignorance, is the delusion of all embodied beings. It binds through inattention, laziness, and sleep.',
    practice: 'Awaken with Rajas first: rise before sunrise, begin vigorous exercise, commit to one small daily discipline. Then gradually introduce sattvic practices.',
  },
}

export default function GunaBalancingSimulator() {
  const [answers, setAnswers] = useState<Record<string, { guna: Guna; points: number }>>({})
  const [showResult, setShowResult] = useState(false)

  const answered = Object.keys(answers).length
  const total = HABITS.length

  const scores: Record<Guna, number> = { sattva: 0, rajas: 0, tamas: 0 }
  Object.values(answers).forEach(({ guna, points }) => { scores[guna] += points })
  const totalPoints = scores.sattva + scores.rajas + scores.tamas || 1

  const dominant: Guna = scores.sattva >= scores.rajas && scores.sattva >= scores.tamas
    ? 'sattva'
    : scores.rajas >= scores.tamas
      ? 'rajas'
      : 'tamas'

  const pct = (g: Guna) => Math.round((scores[g] / totalPoints) * 100)

  const BAR_COLORS: Record<Guna, string> = {
    sattva: 'bg-amber-400',
    rajas: 'bg-red-400',
    tamas: 'bg-stone-400',
  }

  return (
    <VedicAppTemplate
      title="Guna Balancing Simulator"
      subtitle="Chapter 14 — Discover your Sattva / Rajas / Tamas balance"
      icon="⚖️"
      footerNote="Bhagavad Gita Chapter 14 — Gunatraya Vibhaga Yoga"
    >
      {/* Progress */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-400 rounded-full transition-all duration-500"
            style={{ width: `${(answered / total) * 100}%` }}
          />
        </div>
        <span className="text-xs font-bold text-stone-400">{answered}/{total}</span>
      </div>

      {/* Habit questions */}
      <div className="space-y-5 mb-6">
        {HABITS.map(habit => (
          <div key={habit.id} className="rounded-xl border border-stone-200 dark:border-stone-700 p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-black uppercase tracking-widest text-stone-400">{habit.category}</span>
            </div>
            <p className="text-sm font-semibold text-stone-800 dark:text-stone-200 mb-3">{habit.question}</p>
            <div className="space-y-2">
              {habit.options.map(opt => {
                const selected = answers[habit.id]?.guna === opt.guna
                return (
                  <button
                    key={opt.guna}
                    onClick={() => { setAnswers(prev => ({ ...prev, [habit.id]: { guna: opt.guna, points: opt.points } })); setShowResult(false) }}
                    className={`w-full text-left text-sm px-4 py-2.5 rounded-lg border transition-all duration-150 ${
                      selected
                        ? 'border-orange-400 bg-orange-50 dark:bg-orange-950/30 text-orange-800 dark:text-orange-200 font-semibold'
                        : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-stone-300 dark:hover:border-stone-500'
                    }`}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Analyse button */}
      {answered === total && !showResult && (
        <button
          onClick={() => setShowResult(true)}
          className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold uppercase tracking-widest transition-colors"
        >
          Reveal My Guna Balance
        </button>
      )}

      {/* Result */}
      {showResult && answered === total && (
        <div className={`rounded-xl border-2 p-5 ${GUNA_PROFILES[dominant].bg}`}>
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">{GUNA_PROFILES[dominant].emoji}</div>
            <div className={`text-lg font-black uppercase tracking-widest ${GUNA_PROFILES[dominant].color}`}>
              {GUNA_PROFILES[dominant].label}
            </div>
          </div>

          {/* Bars */}
          <div className="space-y-2 mb-5">
            {(['sattva', 'rajas', 'tamas'] as Guna[]).map(g => (
              <div key={g} className="flex items-center gap-3">
                <span className="text-xs font-bold text-stone-500 w-14 capitalize">{g}</span>
                <div className="flex-1 h-2 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${BAR_COLORS[g]}`}
                    style={{ width: `${pct(g)}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-stone-400 w-8 text-right">{pct(g)}%</span>
              </div>
            ))}
          </div>

          <div className="border-t border-stone-200 dark:border-stone-600 pt-4 space-y-3">
            <div>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400">{GUNA_PROFILES[dominant].gitaRef}</span>
              <p className="text-xs text-stone-600 dark:text-stone-300 italic mt-1 leading-relaxed">
                &ldquo;{GUNA_PROFILES[dominant].teaching}&rdquo;
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">Practice</p>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">{GUNA_PROFILES[dominant].practice}</p>
            </div>
          </div>

          <button
            onClick={() => { setAnswers({}); setShowResult(false) }}
            className="mt-4 w-full py-2 rounded-lg border border-stone-300 dark:border-stone-600 text-xs font-bold text-stone-500 hover:text-orange-500 hover:border-orange-300 transition-colors uppercase tracking-widest"
          >
            Reset & Try Again
          </button>
        </div>
      )}
    </VedicAppTemplate>
  )
}
