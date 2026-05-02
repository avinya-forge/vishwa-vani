'use client'
import React, { useState } from 'react'
import VedicAppTemplate from './vedic-app-template'

interface Stage {
  id: number
  name: string
  sanskritName: string
  gitaRef: string
  description: string
  howItFeels: string
  obstacle: string
  nextStep: string
  color: string
  icon: string
}

const STAGES: Stage[] = [
  {
    id: 1,
    name: 'Sense-Bound Knowing',
    sanskritName: 'Pratyaksha',
    gitaRef: 'BG 7.3',
    description: 'Reality is what can be seen, touched, measured, or proved. The material world is the entire world. Consciousness is a product of matter.',
    howItFeels: 'Solid. Practical. Safe. The questions of meaning feel either unanswerable or unimportant.',
    obstacle: 'The senses produce constant input. The mind stays occupied with this input and never turns inward to ask who is doing the perceiving.',
    nextStep: 'Notice one thing today that the senses cannot account for: the feeling of "I am," the experience of beauty, the fact that you know you are awake.',
    color: 'border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-900/40',
    icon: '👁️',
  },
  {
    id: 2,
    name: 'Seeker of Meaning',
    sanskritName: 'Jijñāsā',
    gitaRef: 'BG 7.16–17',
    description: 'Something beyond the sensory world is suspected. Questions arise that logic alone cannot answer. Scripture, philosophy, and teachers begin to attract.',
    howItFeels: 'Restless. Drawn to depth. Ordinary pleasures no longer fully satisfy. The spiritual path begins here.',
    obstacle: 'Seeking easily becomes collecting — more books, more teachers, more concepts — without any transformation in direct experience.',
    nextStep: 'Choose one question you\'ve been carrying. Sit with it in silence for five minutes without seeking an answer. Let the question live in you without resolving.',
    color: 'border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/20',
    icon: '📖',
  },
  {
    id: 3,
    name: 'Scriptural Intelligence',
    sanskritName: 'Śāstra-Jñāna',
    gitaRef: 'BG 4.34',
    description: 'The Self, Brahman, Maya, karma, and rebirth are understood conceptually. The Gita, Upanishads, and sacred texts form an internally consistent worldview.',
    howItFeels: 'Clarified. Intellectually satisfied. But the knowledge remains a description of a country not yet visited.',
    obstacle: 'Confusing the map for the territory. Knowing that "I am not the body" as a concept is not the same as realizing it as lived truth.',
    nextStep: 'Take one teaching you understand intellectually — say, "the Self is witness to thought" — and test it in experience. When a difficult emotion arises today, try to observe it rather than become it.',
    color: 'border-indigo-200 dark:border-indigo-800/50 bg-indigo-50 dark:bg-indigo-950/20',
    icon: '🪔',
  },
  {
    id: 4,
    name: 'Purified Intelligence',
    sanskritName: 'Buddhi-Śuddhi',
    gitaRef: 'BG 7.19',
    description: 'Years of practice have thinned the ego\'s grip. The intellect no longer habitually argues for its own supremacy. Truth is accepted even when it contradicts personal preference.',
    howItFeels: 'Lighter. Less reactive. A growing capacity to witness one\'s own thoughts without identification. Glimpses of stillness.',
    obstacle: 'Subtle pride in one\'s spiritual progress. The ego disguises itself as the witness — "look how well I am watching myself."',
    nextStep: 'When you next feel proud of your spiritual progress, notice that feeling with the same neutral attention you apply to anger or fear. The witness watches even the watcher.',
    color: 'border-teal-200 dark:border-teal-800/50 bg-teal-50 dark:bg-teal-950/20',
    icon: '🌿',
  },
  {
    id: 5,
    name: 'Direct Glimpse',
    sanskritName: 'Anubhava',
    gitaRef: 'BG 7.17',
    description: 'The Self is directly perceived — not as an idea but as lived reality. This may happen in meditation, in nature, or in an ordinary moment. It does not last at first, but it cannot be unfelt.',
    howItFeels: 'Unmistakable. Still. A sense of "I have always been this." No fear. Complete. The moment of recognition varies — some weep, some laugh, some simply fall quiet.',
    obstacle: 'Grasping for the experience, or despairing when it fades. Anubhava comes and goes until it stabilizes. Clinging to the memory obstructs the next arrival.',
    nextStep: 'Recall your deepest moment of stillness or clarity. Do not describe it — just feel the quality of it. Let it inform how you hold this present moment.',
    color: 'border-orange-200 dark:border-orange-800/50 bg-orange-50 dark:bg-orange-950/20',
    icon: '✨',
  },
  {
    id: 6,
    name: 'Steady Wisdom',
    sanskritName: 'Sthita-Prajñā',
    gitaRef: 'BG 2.55–57',
    description: 'The realization has stabilized. Pleasure and pain do not uproot the inner equilibrium. Action continues but without the sting of ego. This is the state described in BG Chapter 2.',
    howItFeels: 'Easeful. The storms of life still pass through, but the centre holds. Emotions are felt fully but do not grip. The quality is one of gentle, unshakeable stability.',
    obstacle: 'This is not a permanent achievement — even sthita-prajña requires vigilance. The subtle vasanas (impressions) still stir on occasion.',
    nextStep: 'In any difficulty today, pause before reacting. Not to suppress — to allow. Notice the quality of awareness that persists even when the emotion is at its strongest.',
    color: 'border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-950/20',
    icon: '🌅',
  },
  {
    id: 7,
    name: 'Identity with Brahman',
    sanskritName: 'Brahma-Bhāva',
    gitaRef: 'BG 7.19',
    description: '"Vāsudeva is all" — this is the culmination of Jnana Yoga. Not a conclusion reached by argument, but a realization in which the boundary between self and Brahman dissolves. Rare, says Krishna.',
    howItFeels: 'No separate witness remains. Not emptiness — fullness. Not dissolution of personality, but of the illusion that the personality was ever separate from the whole.',
    obstacle: 'The teaching cannot be adequately described from the outside. At this stage, the obstacles are exhausted — there is no one left to be obstructed.',
    nextStep: 'There is no practice for this stage — only the recognition that the one seeking realization and the realization itself are not two different things. Rest in that recognition.',
    color: 'border-violet-200 dark:border-violet-800/50 bg-violet-50 dark:bg-violet-950/20',
    icon: '🕊️',
  },
]

export default function JnanaProgressionPath() {
  const [selected, setSelected] = useState<number | null>(null)

  const current = selected !== null ? STAGES[selected] : null

  return (
    <VedicAppTemplate
      title="Jñāna Progression Path"
      subtitle="Chapter 7 — Seven stages of spiritual knowing"
      icon="🪔"
      footerNote="Bhagavad Gita Chapter 7 — Jnana Vijnana Yoga"
    >
      <p className="text-xs text-stone-500 dark:text-stone-400 mb-5 leading-relaxed">
        Select the stage whose description resonates most with your current experience. Each stage shows the path forward.
      </p>

      {/* Stage selector */}
      <div className="space-y-2 mb-0">
        {STAGES.map((s, i) => {
          const isSelected = selected === i
          return (
            <button
              key={s.id}
              onClick={() => setSelected(isSelected ? null : i)}
              className={`w-full text-left p-3 rounded-xl border-2 transition-all duration-200 ${
                isSelected ? s.color : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{s.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-black uppercase tracking-widest text-stone-400">Stage {s.id}</span>
                    <span className="text-[10px] font-bold text-amber-500 dark:text-amber-400">{s.gitaRef}</span>
                  </div>
                  <p className="text-sm font-bold text-stone-800 dark:text-stone-200">{s.name}</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 italic">{s.sanskritName}</p>
                </div>
                <span className="text-stone-300 dark:text-stone-600 text-xs flex-shrink-0">{isSelected ? '▲' : '▼'}</span>
              </div>

              {isSelected && (
                <div className="mt-4 space-y-3 text-left">
                  <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">{s.description}</p>
                  <div className="bg-white/60 dark:bg-stone-900/40 rounded-lg p-3 space-y-2">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">How It Feels</p>
                      <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed italic">{s.howItFeels}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">Typical Obstacle</p>
                      <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">{s.obstacle}</p>
                    </div>
                  </div>
                  <div className="border border-amber-200 dark:border-amber-800/40 rounded-lg p-3 bg-amber-50/50 dark:bg-amber-950/20">
                    <p className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-1">Next Step</p>
                    <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">{s.nextStep}</p>
                  </div>
                  {i < STAGES.length - 1 && (
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelected(i + 1) }}
                      className="text-xs font-bold uppercase tracking-widest text-amber-500 hover:text-amber-600 transition-colors"
                    >
                      See Stage {i + 2} →
                    </button>
                  )}
                </div>
              )}
            </button>
          )
        })}
      </div>
    </VedicAppTemplate>
  )
}
