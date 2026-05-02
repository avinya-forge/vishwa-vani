'use client'
import React, { useState } from 'react'
import VedicAppTemplate from './vedic-app-template'

type State = 'jagrat' | 'swapna' | 'sushupti' | 'turiya'

interface ConsciousnessState {
  id: State
  name: string
  sanskrit: string
  description: string
  gitaVerses: { ref: string; text: string; chapter: number }[]
  mandukyaRef: string
  sign: string
  practice: string
}

const STATES: ConsciousnessState[] = [
  {
    id: 'jagrat',
    name: 'Jagrat',
    sanskrit: 'जाग्रत् — Waking',
    description: 'Ordinary waking consciousness. The sense-mind engages the gross world through the five organs of perception. Subject and object appear fully separate. The self identifies with the body-mind complex. Most human experience lives here.',
    gitaVerses: [
      {
        ref: 'BG 7.4',
        chapter: 7,
        text: 'Earth, water, fire, air, ether, mind, intellect and false ego — these eight comprise My separated material energies. This is the field Jagrat consciousness takes as ultimate reality.',
      },
      {
        ref: 'BG 13.5',
        chapter: 13,
        text: 'The field (kshetra) — composed of the five elements, ego, intelligence, the unmanifest, the eleven senses and the five sense objects — is the domain Jagrat inhabits.',
      },
    ],
    mandukyaRef: 'Mandukya Upanishad 3: Vaisvanara — the universal waker. Nineteen instruments (5 sense organs, 5 action organs, 5 pranas, mind, intellect, ego, chitta). Gateway of the right eye.',
    sign: 'You are fully in Jagrat when: thought runs continuously; past and future preoccupy you; the body feels heavy with sensation; you seek objects to fill an undefined lack.',
    practice: 'Gita Ch 7 prescription: know the distinction between kshetra (field) and kshetrajna (knower of field). Begin the inner witness — watching the waking mind from a slight distance.',
  },
  {
    id: 'swapna',
    name: 'Swapna',
    sanskrit: 'स्वप्न — Dreaming',
    description: 'The subtle state. Gross sense objects are absent; the mind creates its own objects from impressions (vasanas). The self identifies with the subtle body (sukshma sharira). Consciousness moves through an internally-generated world as real as Jagrat — until waking reveals its insubstantiality.',
    gitaVerses: [
      {
        ref: 'BG 7.25',
        chapter: 7,
        text: 'Veiled by My yoga-maya, I am not revealed to all. The deluded world knows Me not — the eternal, unborn. Maya produces the dream-state quality in all experience: we mistake the projected for the real.',
      },
      {
        ref: 'BG 15.10',
        chapter: 15,
        text: 'The deluded cannot see the soul departing, staying, or experiencing — only those with the eye of knowledge can see. The subtle body\'s journey (including dream) is invisible to ordinary Jagrat perception.',
      },
    ],
    mandukyaRef: 'Mandukya Upanishad 4: Taijasa — the luminous one. Consciousness illuminates its own projections. The world of Swapna is made entirely of light (tejas) — no external cause, only mind.',
    sign: 'You enter Swapna quality in waking when: imagination runs vivid unbidden narratives; you confuse memory with present; emotional reactions seem to come from a dream-logic; creativity flows without effort.',
    practice: 'Gita Ch 15 prescription: recognise the Ashvattha tree — this world (including your inner world of thought) is like a fig tree whose reflection in water appears real. Look for the root above, not below.',
  },
  {
    id: 'sushupti',
    name: 'Sushupti',
    sanskrit: 'सुषुप्ति — Deep Sleep',
    description: 'Dreamless sleep. All mental modifications cease. The self rests in the causal body (karana sharira) — pure bliss (ananda) without object. No subject-object split. Yet consciousness persists: you wake knowing "I slept well" — who knew? Something witnessed even the absence of experience. This state points toward Turiya.',
    gitaVerses: [
      {
        ref: 'BG 6.20–21',
        chapter: 6,
        text: 'The stage where the mind, restrained by yoga practice, finds rest — where seeing the Self by pure mind, one rejoices in the Self alone. There the yogi experiences boundless bliss beyond the senses. This is the waking analogue of Sushupti: the cessation of mental turbulence revealing the underlying bliss.',
      },
      {
        ref: 'BG 13.17',
        chapter: 13,
        text: 'Undivided, yet appearing divided in beings; the Knower of the field is to be understood as sustaining, devouring, and generating all beings. Brahman — fully present in Sushupti — is the witness that persists when all else ceases.',
      },
    ],
    mandukyaRef: 'Mandukya Upanishad 5: Prajna — the all-knowing. Mass of consciousness, blissful, undifferentiated. Gateway is the heart. Sushupti is the closest ordinary experience comes to Turiya — it lacks only conscious recognition of what is already present.',
    sign: 'You touch Sushupti quality in meditation when: all thought ceases but awareness remains; there is no meditator or meditation — just open presence; you emerge rested, blissful, without having "done" anything. After deep samadhi moments, Sushupti quality lingers.',
    practice: 'Gita Ch 6 prescription: steady the mind as a flame in a windless place. Allow cessation. Do not grasp for bliss or push away dullness. Rest as the witnessing awareness behind all three states.',
  },
  {
    id: 'turiya',
    name: 'Turiya',
    sanskrit: 'तुरीय — The Fourth',
    description: 'Not a fourth state but the substratum of all three — pure consciousness without object, neither waking, dreaming, nor sleeping. The witness-self that perceives all states without being coloured by them. In Jagrat one appears to forget Turiya; in Sushupti one is Turiya without knowing it; Turiya is the recognition of what was always already the case.',
    gitaVerses: [
      {
        ref: 'BG 7.7',
        chapter: 7,
        text: 'There is nothing whatsoever higher than I, O Arjuna. All that exists is strung on Me like pearls on a thread. This is Turiya — the thread that runs through Jagrat (waking), Swapna (dreaming), and Sushupti (sleep) without being any of them.',
      },
      {
        ref: 'BG 13.16',
        chapter: 13,
        text: 'Undivided, yet existing as if divided in beings; to be known as the sustainer, devourer, and generator of beings — the light of all lights, beyond darkness. Turiya is this light: present in all states, mistaken for none.',
      },
      {
        ref: 'BG 15.12',
        chapter: 15,
        text: 'The splendour of the sun which illuminates the whole world, that which is in the moon and in the fire — know that splendour to be Mine. This luminosity is Turiya — the cognising awareness that illuminates Jagrat, Swapna, and Sushupti without itself being illuminated by anything else.',
      },
    ],
    mandukyaRef: 'Mandukya Upanishad 7: Turiya — the fourth. Not a state but the ground of all states. Not to be grasped as an object. "Neither inward-turned nor outward-turned cognition — not their combination — not a solid mass of cognition — not cognizing nor not-cognizing." AUM = the fourth syllable: the silence after the sound.',
    sign: 'Turiya touches you when: the sense of a separate "I" becomes temporarily transparent; all experience appears to arise and subside in an open, still awareness; the question "who am I?" has no answer — only the questioner dissolving; beauty or music suddenly reveals the presence behind it. Sages call this recognition sahaja — effortless natural state.',
    practice: 'Gita Ch 15 prescription: the Purushottama beyond both the perishable and the imperishable. Neti-neti (not this, not this) — release identification with each state as it arises. What remains when Jagrat, Swapna, and Sushupti are seen as appearances? That is Turiya.',
  },
]

interface QuizQuestion {
  prompt: string
  options: { text: string; state: State }[]
}

const QUIZ: QuizQuestion[] = [
  {
    prompt: 'When you sit to meditate, where does your mind typically dwell?',
    options: [
      { text: 'On tasks, plans, and sensory concerns — the day\'s business', state: 'jagrat' },
      { text: 'In an inner cinema of imagination, memories, and symbols', state: 'swapna' },
      { text: 'Brief gaps of quiet where even thought disappears', state: 'sushupti' },
      { text: 'A quiet presence that watches without being caught', state: 'turiya' },
    ],
  },
  {
    prompt: 'How do you experience sleep on most nights?',
    options: [
      { text: 'Light, easily disturbed — the body does not fully release', state: 'jagrat' },
      { text: 'Vivid, story-filled dreams that feel as real as waking life', state: 'swapna' },
      { text: 'Deep, dreamless rest — waking refreshed without recall', state: 'sushupti' },
      { text: 'A subtle wakefulness persists even through deep sleep', state: 'turiya' },
    ],
  },
  {
    prompt: 'During emotional intensity (joy, grief, anger), what happens?',
    options: [
      { text: 'I become fully identified — the emotion IS me', state: 'jagrat' },
      { text: 'The emotion feels like a dream character I am playing', state: 'swapna' },
      { text: 'The emotion passes and leaves me in a still, neutral place', state: 'sushupti' },
      { text: 'Awareness holds the emotion as a wave — and is not the wave', state: 'turiya' },
    ],
  },
]

export default function ConsciousnessStateMapper() {
  const [mode, setMode] = useState<'map' | 'quiz' | 'result'>('map')
  const [activeState, setActiveState] = useState<State>('jagrat')
  const [qIdx, setQIdx] = useState(0)
  const [scores, setScores] = useState<Record<State, number>>({ jagrat: 0, swapna: 0, sushupti: 0, turiya: 0 })

  const current = STATES.find(s => s.id === activeState)!

  function pickAnswer(state: State) {
    const next = { ...scores, [state]: scores[state] + 1 }
    setScores(next)
    if (qIdx + 1 < QUIZ.length) {
      setQIdx(i => i + 1)
    } else {
      setMode('result')
    }
  }

  function resetQuiz() {
    setScores({ jagrat: 0, swapna: 0, sushupti: 0, turiya: 0 })
    setQIdx(0)
    setMode('quiz')
  }

  const dominantState = (Object.keys(scores) as State[]).reduce((a, b) => scores[a] >= scores[b] ? a : b)
  const resultState = STATES.find(s => s.id === dominantState)!

  const stateColors: Record<State, string> = {
    jagrat: 'bg-sky-500',
    swapna: 'bg-violet-500',
    sushupti: 'bg-emerald-500',
    turiya: 'bg-orange-500',
  }
  const stateTextColors: Record<State, string> = {
    jagrat: 'text-sky-600 dark:text-sky-400',
    swapna: 'text-violet-600 dark:text-violet-400',
    sushupti: 'text-emerald-600 dark:text-emerald-400',
    turiya: 'text-orange-600 dark:text-orange-400',
  }

  return (
    <VedicAppTemplate
      title="Consciousness State Mapper"
      subtitle="Jagrat · Swapna · Sushupti · Turiya · Ch 7, 13, 15"
      icon="🌙"
      footerNote="Mandukya Upanishad maps 4 states of consciousness. Bhagavad Gita Ch 7, 13, and 15 describe the same territory from the direction of jnana. Both point to Turiya — the fourth, which underlies all."
    >
      <div className="space-y-4 text-sm text-stone-700 dark:text-stone-300">
        {/* Mode toggle */}
        <div className="flex rounded-xl overflow-hidden border border-stone-200 dark:border-stone-700 text-[10px] font-black uppercase tracking-widest">
          <button
            onClick={() => setMode('map')}
            className={`flex-1 py-2 transition-colors ${mode === 'map' ? 'bg-orange-500 text-white' : 'bg-stone-50 dark:bg-stone-900 text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800'}`}
          >Explore Map</button>
          <button
            onClick={resetQuiz}
            className={`flex-1 py-2 transition-colors ${mode !== 'map' ? 'bg-orange-500 text-white' : 'bg-stone-50 dark:bg-stone-900 text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800'}`}
          >Find Your State</button>
        </div>

        {mode === 'map' && (
          <>
            {/* State selector */}
            <div className="grid grid-cols-4 gap-1.5">
              {STATES.map(s => (
                <button
                  key={s.id}
                  onClick={() => setActiveState(s.id)}
                  className={`py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors ${
                    activeState === s.id
                      ? `${stateColors[s.id]} text-white`
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-500 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  {s.id === 'sushupti' ? 'Deep' : s.name}
                </button>
              ))}
            </div>

            {/* State detail */}
            <div className="space-y-3">
              <div>
                <div className={`text-xs font-black ${stateTextColors[current.id]}`}>{current.sanskrit}</div>
                <p className="text-[10px] leading-relaxed text-stone-600 dark:text-stone-400 mt-1">{current.description}</p>
              </div>

              {/* Gita verses */}
              <div className="space-y-2">
                {current.gitaVerses.map(v => (
                  <div key={v.ref} className="rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 px-3 py-2">
                    <div className="text-[9px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-400">{v.ref}</div>
                    <p className="text-[10px] leading-relaxed text-stone-700 dark:text-stone-300 mt-1">{v.text}</p>
                  </div>
                ))}
              </div>

              {/* Mandukya cross-ref */}
              <div className="rounded-xl bg-violet-50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-900/30 px-3 py-2">
                <div className="text-[9px] font-black uppercase tracking-widest text-violet-600 dark:text-violet-400">Mandukya Cross-Reference</div>
                <p className="text-[10px] leading-relaxed text-stone-700 dark:text-stone-300 mt-1">{current.mandukyaRef}</p>
              </div>

              {/* Practice */}
              <div className="rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 px-3 py-2">
                <div className="text-[9px] font-black uppercase tracking-widest text-stone-400">Practice</div>
                <p className="text-[10px] leading-relaxed text-stone-600 dark:text-stone-400 mt-1">{current.practice}</p>
              </div>
            </div>
          </>
        )}

        {mode === 'quiz' && (
          <div className="space-y-3">
            <div className="text-[9px] font-black uppercase tracking-widest text-stone-400">
              Question {qIdx + 1} of {QUIZ.length}
            </div>
            <p className="text-xs font-medium text-stone-800 dark:text-stone-200 leading-relaxed">
              {QUIZ[qIdx].prompt}
            </p>
            <div className="space-y-2">
              {QUIZ[qIdx].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => pickAnswer(opt.state)}
                  className="w-full text-left px-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:border-orange-200 dark:hover:border-orange-900/50 transition-colors text-[10px] leading-relaxed text-stone-700 dark:text-stone-300"
                >
                  {opt.text}
                </button>
              ))}
            </div>
            {/* Progress bar */}
            <div className="w-full bg-stone-200 dark:bg-stone-700 rounded-full h-1">
              <div
                className="bg-orange-500 h-1 rounded-full transition-all"
                style={{ width: `${(qIdx / QUIZ.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {mode === 'result' && (
          <div className="space-y-3">
            <div className="text-center">
              <div className={`text-[10px] font-black uppercase tracking-widest ${stateTextColors[dominantState]}`}>
                Your Dominant State
              </div>
              <div className="font-serif font-black text-2xl text-stone-900 dark:text-white mt-1">{resultState.name}</div>
              <div className="text-[11px] text-stone-500 mt-0.5">{resultState.sanskrit}</div>
            </div>

            <p className="text-[10px] leading-relaxed text-stone-600 dark:text-stone-400">{resultState.description}</p>

            <div className="rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 px-3 py-2">
              <div className="text-[9px] font-black uppercase tracking-widest text-stone-400 mb-1">Gita Sign</div>
              <p className="text-[10px] leading-relaxed text-stone-600 dark:text-stone-400">{resultState.sign}</p>
            </div>

            <div className="rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 px-3 py-2">
              <div className="text-[9px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-400 mb-1">Practice</div>
              <p className="text-[10px] leading-relaxed text-stone-600 dark:text-stone-400">{resultState.practice}</p>
            </div>

            <div className="grid grid-cols-4 gap-1">
              {STATES.map(s => (
                <div key={s.id} className="text-center">
                  <div className={`text-[9px] font-black ${stateTextColors[s.id]}`}>{s.name}</div>
                  <div className="text-[11px] font-bold text-stone-700 dark:text-stone-300">{scores[s.id]}/{QUIZ.length}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={resetQuiz}
                className="flex-1 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-[10px] font-black uppercase tracking-widest text-stone-500 transition-colors"
              >
                Retake
              </button>
              <button
                onClick={() => { setActiveState(dominantState); setMode('map') }}
                className="flex-1 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-[10px] font-black uppercase tracking-widest text-white transition-colors"
              >
                Explore State
              </button>
            </div>
          </div>
        )}
      </div>
    </VedicAppTemplate>
  )
}
