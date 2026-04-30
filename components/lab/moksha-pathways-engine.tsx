'use client'
import React, { useState } from 'react'
import VedicAppTemplate from './vedic-app-template'

type Path = 'karma' | 'bhakti' | 'jnana' | 'dhyana'

interface Question {
  id: string
  text: string
  options: { label: string; scores: Partial<Record<Path, number>> }[]
}

const QUESTIONS: Question[] = [
  {
    id: 'nature',
    text: 'Which statement resonates most with your inner nature?',
    options: [
      { label: 'I find meaning through doing — I must act to feel alive', scores: { karma: 3, dhyana: 1 } },
      { label: 'I am drawn to love — surrendering to something greater than myself', scores: { bhakti: 3, karma: 1 } },
      { label: 'I seek understanding — I want to know the truth of existence', scores: { jnana: 3, dhyana: 1 } },
      { label: 'I find peace in stillness — the quiet mind feels closest to truth', scores: { dhyana: 3, jnana: 1 } },
    ],
  },
  {
    id: 'obstacle',
    text: "What feels like your greatest spiritual obstacle?",
    options: [
      { label: 'Attachment to results — I act, but I cannot let go of outcomes', scores: { karma: 3, jnana: 1 } },
      { label: 'Separation — I feel cut off from the Divine and from others', scores: { bhakti: 3, karma: 1 } },
      { label: 'Ignorance — I confuse the body, mind, and ego for the true Self', scores: { jnana: 3, dhyana: 1 } },
      { label: 'Mental restlessness — my mind will not be still', scores: { dhyana: 3, bhakti: 1 } },
    ],
  },
  {
    id: 'joy',
    text: 'When do you feel most spiritually alive?',
    options: [
      { label: 'While engaged in meaningful work or service to others', scores: { karma: 3, bhakti: 1 } },
      { label: 'In prayer, devotion, chanting, or ritual', scores: { bhakti: 3, dhyana: 1 } },
      { label: 'In study, inquiry, philosophical discussion', scores: { jnana: 3, karma: 1 } },
      { label: 'In silence, nature, or deep meditation', scores: { dhyana: 3, jnana: 1 } },
    ],
  },
  {
    id: 'liberation',
    text: 'What does "liberation" (Moksha) mean to you intuitively?',
    options: [
      { label: 'Freedom through complete, selfless action in the world', scores: { karma: 3 } },
      { label: 'Merging into divine love — being one with God', scores: { bhakti: 3, jnana: 1 } },
      { label: 'Realising "I am Brahman" — the end of identification with the ego', scores: { jnana: 3 } },
      { label: 'The mind dissolved — pure awareness without object', scores: { dhyana: 3, jnana: 1 } },
    ],
  },
  {
    id: 'teacher',
    text: 'Which approach to a teacher or guide appeals to you?',
    options: [
      { label: 'A teacher who shows me how to act rightly in the world', scores: { karma: 3, jnana: 1 } },
      { label: 'A saint who radiates love and draws me toward the Divine', scores: { bhakti: 3 } },
      { label: 'A philosopher who answers my deepest questions with rigour', scores: { jnana: 3, dhyana: 1 } },
      { label: 'A meditation master who transmits silence', scores: { dhyana: 3, bhakti: 1 } },
    ],
  },
]

const PATHS: Record<Path, { label: string; emoji: string; color: string; bg: string; gitaRef: string; verse1866: string; teaching: string; practice: string; sages: string }> = {
  karma: {
    label: 'Karma Yoga — Path of Action',
    emoji: '🌿',
    color: 'text-green-700 dark:text-green-300',
    bg: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800/50',
    gitaRef: 'BG 18.5–6',
    verse1866: 'BG 18.66 speaks to you through action: "Abandon all varieties of religion and just surrender unto Me" — for the Karma Yogi, surrender IS the final act. Every action offered without ego is this surrender.',
    teaching: 'Acts of sacrifice, gift-giving, and austerity should not be abandoned — they purify even the wise. These acts must be performed without attachment to results.',
    practice: 'Choose one daily act of pure service — volunteer, give without recognition, act at home without expecting gratitude. Offer each action consciously to a higher purpose.',
    sages: 'Karma Yoga luminaries: Mahatma Gandhi, King Janaka, Tilak, Swami Vivekananda (works as worship).',
  },
  bhakti: {
    label: 'Bhakti Yoga — Path of Devotion',
    emoji: '🌸',
    color: 'text-pink-700 dark:text-pink-300',
    bg: 'bg-pink-50 dark:bg-pink-950/30 border-pink-200 dark:border-pink-800/50',
    gitaRef: 'BG 18.54–55',
    verse1866: '"Abandon all varieties of dharma and surrender unto Me alone." This IS Bhakti. The devotee surrenders everything — every duty, every identity — into the hands of the Beloved. This is the highest act of love.',
    teaching: 'One who is transcendentally situated at once realises the Supreme Brahman. Such a person does not lament, does not desire, and is equal toward all living entities. In that state one attains pure devotional service unto Me.',
    practice: 'Establish a daily practice: kirtan, japa (mantra repetition), or prayer before a sacred image. Offer the first and last moment of each day to the Divine. Read one Bhagavatam or Gita chapter weekly.',
    sages: 'Bhakti luminaries: Mirabai, Tukaram, Chaitanya Mahaprabhu, Namdev, Ramanuja, Sri Prabhupada.',
  },
  jnana: {
    label: 'Jnana Yoga — Path of Knowledge',
    emoji: '🪔',
    color: 'text-blue-700 dark:text-blue-300',
    bg: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/50',
    gitaRef: 'BG 18.19–20',
    verse1866: 'For the Jnana Yogi, BG 18.66 is the final teaching: "all dharmas" to be abandoned are all ego-identifications. When "I am the doer" dissolves, only the Self remains — and that is Brahman. Surrender is Self-knowledge.',
    teaching: 'Knowledge by which the undivided spiritual nature is seen in all living beings — though they are divided into innumerable forms — you should understand to be in the mode of goodness (Sattva).',
    practice: 'Study the Mandukya Upanishad and Shankara\'s Vivekachudamani. Practice self-inquiry (Atma Vichara): "Who am I?" not as a mantra but as a continuous inquiry. Sit with the question before sleep.',
    sages: 'Jnana luminaries: Adi Shankaracharya, Ramana Maharshi, Nisargadatta Maharaj, Ashtavakra.',
  },
  dhyana: {
    label: 'Dhyana Yoga — Path of Meditation',
    emoji: '🌀',
    color: 'text-violet-700 dark:text-violet-300',
    bg: 'bg-violet-50 dark:bg-violet-950/30 border-violet-200 dark:border-violet-800/50',
    gitaRef: 'BG 18.51–53',
    verse1866: 'For the Dhyana Yogi, BG 18.66 is experienced in silence. The meditator who has stilled all mental modifications discovers that surrender has already happened — the ego was never real. Liberation is not attained; it is recognised.',
    teaching: 'Being purified by intelligence and controlling the mind with determination, abandoning the objects of sense gratification, freed from attachment and hatred, one who lives in a solitary place, who eats little... is certainly elevated.',
    practice: 'Commit to 20 minutes of silent meditation daily — preferably at the same time. Begin with breath awareness (pranayama), then shift to witness awareness. Explore Yoga Nidra or Trataka (candle gazing) for deeper states.',
    sages: 'Dhyana luminaries: Patanjali, Ramakrishna Paramahansa, Swami Sivananda, Swami Rama.',
  },
}

export default function MokshaPathwaysEngine() {
  const [answers, setAnswers] = useState<Record<string, Partial<Record<Path, number>>>>({})
  const [showResult, setShowResult] = useState(false)

  const answered = Object.keys(answers).length
  const total = QUESTIONS.length

  const scores: Record<Path, number> = { karma: 0, bhakti: 0, jnana: 0, dhyana: 0 }
  Object.values(answers).forEach(optScores => {
    Object.entries(optScores).forEach(([path, pts]) => {
      scores[path as Path] += pts as number
    })
  })

  const totalPts = Object.values(scores).reduce((a, b) => a + b, 0) || 1
  const dominant: Path = (Object.keys(scores) as Path[]).reduce((a, b) => scores[a] >= scores[b] ? a : b)
  const pct = (p: Path) => Math.round((scores[p] / totalPts) * 100)

  const BAR_COLORS: Record<Path, string> = {
    karma: 'bg-green-400',
    bhakti: 'bg-pink-400',
    jnana: 'bg-blue-400',
    dhyana: 'bg-violet-400',
  }

  return (
    <VedicAppTemplate
      title="Moksha Pathways Engine"
      subtitle="Chapter 18 — Which liberation path suits you?"
      icon="🕉️"
      footerNote="Bhagavad Gita Chapter 18 — Moksha Sanyasa Yoga · BG 18.66"
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

      {/* Questions */}
      <div className="space-y-5 mb-6">
        {QUESTIONS.map(q => (
          <div key={q.id} className="rounded-xl border border-stone-200 dark:border-stone-700 p-4">
            <p className="text-sm font-semibold text-stone-800 dark:text-stone-200 mb-3">{q.text}</p>
            <div className="space-y-2">
              {q.options.map((opt, i) => {
                const selected = JSON.stringify(answers[q.id]) === JSON.stringify(opt.scores)
                return (
                  <button
                    key={i}
                    onClick={() => { setAnswers(prev => ({ ...prev, [q.id]: opt.scores })); setShowResult(false) }}
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

      {/* Reveal button */}
      {answered === total && !showResult && (
        <button
          onClick={() => setShowResult(true)}
          className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold uppercase tracking-widest transition-colors"
        >
          Reveal My Liberation Path
        </button>
      )}

      {/* Result */}
      {showResult && answered === total && (
        <div className={`rounded-xl border-2 p-5 ${PATHS[dominant].bg}`}>
          <div className="text-center mb-5">
            <div className="text-4xl mb-2">{PATHS[dominant].emoji}</div>
            <div className={`text-base font-black uppercase tracking-wide ${PATHS[dominant].color}`}>
              {PATHS[dominant].label}
            </div>
          </div>

          {/* Bars */}
          <div className="space-y-2 mb-5">
            {(['karma', 'bhakti', 'jnana', 'dhyana'] as Path[]).map(p => (
              <div key={p} className="flex items-center gap-3">
                <span className="text-xs font-bold text-stone-500 w-14 capitalize">{p}</span>
                <div className="flex-1 h-2 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${BAR_COLORS[p]}`}
                    style={{ width: `${pct(p)}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-stone-400 w-8 text-right">{pct(p)}%</span>
              </div>
            ))}
          </div>

          <div className="space-y-4 border-t border-stone-200 dark:border-stone-600 pt-4">
            <div>
              <p className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">BG 18.66 for your path</p>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed italic">{PATHS[dominant].verse1866}</p>
            </div>
            <div>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400">{PATHS[dominant].gitaRef}</span>
              <p className="text-xs text-stone-600 dark:text-stone-300 italic mt-1 leading-relaxed">
                &ldquo;{PATHS[dominant].teaching}&rdquo;
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">Practice</p>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">{PATHS[dominant].practice}</p>
            </div>
            <div>
              <p className="text-xs text-stone-400 leading-relaxed">{PATHS[dominant].sages}</p>
            </div>
          </div>

          <button
            onClick={() => { setAnswers({}); setShowResult(false) }}
            className="mt-4 w-full py-2 rounded-lg border border-stone-300 dark:border-stone-600 text-xs font-bold text-stone-500 hover:text-orange-500 hover:border-orange-300 transition-colors uppercase tracking-widest"
          >
            Reset & Explore Again
          </button>
        </div>
      )}
    </VedicAppTemplate>
  )
}
