'use client'
import React, { useState } from 'react'
import VedicAppTemplate from './vedic-app-template'

type StateKey = 'jagrat' | 'swapna' | 'sushupti' | 'turiya'

interface StateInfo {
  key: StateKey
  sanskrit: string
  iast: string
  english: string
  symbolFromOm: string
  field: string
  knower: string
  gitaAnchor: { ref: string; teaching: string }[]
  mandukyaCross: string
  practice: string
}

const STATES: Record<StateKey, StateInfo> = {
  jagrat: {
    key: 'jagrat',
    sanskrit: 'जाग्रत्',
    iast: 'jāgrat',
    english: 'Waking',
    symbolFromOm: 'A — the first sound, mouth open, the world arises',
    field: 'Sense-objects, body, the gross world (sthūla). Consciousness flows outward through the seven gates of perception.',
    knower: 'Vaiśvānara — the universal in the individual. The "I" that says: "I am this body acting in this world."',
    gitaAnchor: [
      { ref: 'BG 7.4', teaching: 'Earth, water, fire, air, ether, mind, intellect, ego — these eight constitute My separated material energy. The waking state operates in this field.' },
      { ref: 'BG 13.5–6', teaching: 'The five great elements, ego, intellect, the unmanifest, ten senses, mind, five sense-objects — this is the kṣetra of waking experience.' },
      { ref: 'BG 15.7', teaching: 'The jīva draws toward itself the six instruments — five senses with mind as the sixth — abiding in nature. This is the engine of jāgrat.' },
    ],
    mandukyaCross: 'Māṇḍūkya 3 — Vaiśvānara is the first quarter, knower of the gross, with seven limbs and nineteen mouths, enjoying the gross.',
    practice: 'When you next eat, walk, or speak — note the directional flow of attention. Consciousness goes out through the senses to meet objects. Stay with the sensation that someone is doing the going-out.',
  },
  swapna: {
    key: 'swapna',
    sanskrit: 'स्वप्न',
    iast: 'svapna',
    english: 'Dream',
    symbolFromOm: 'U — the second sound, the world internalised, light without an external lamp',
    field: 'Subtle objects (sūkṣma) — mind-made imagery without external sense-input. The gross body is at rest; the subtle body is active.',
    knower: 'Taijasa — the luminous one. The "I" that watches a dream knowing the lamp is itself.',
    gitaAnchor: [
      { ref: 'BG 6.16', teaching: 'There is no yoga for one who eats too much or too little, who sleeps too much or too little. Sleep regulates the doorway between waking and dream.' },
      { ref: 'BG 18.39', teaching: 'Happiness in delusion at the start, middle, and end — arising from sleep, indolence, illusion — is declared to be in tamas.' },
      { ref: 'BG 6.17', teaching: 'For the one whose food, recreation, work, sleep, and waking are regulated, yoga becomes the destroyer of suffering. Dream becomes a field of practice when sleep is regulated.' },
    ],
    mandukyaCross: 'Māṇḍūkya 4 — Taijasa is the second quarter, knower of the subtle, with seven limbs and nineteen mouths, enjoying the subtle.',
    practice: 'On waking, before opening eyes — recall a single dream image. Notice you watched it without external eyes. The seer of the dream is closer to you than the dream itself was.',
  },
  sushupti: {
    key: 'sushupti',
    sanskrit: 'सुषुप्ति',
    iast: 'suṣupti',
    english: 'Deep Sleep',
    symbolFromOm: 'M — the third sound, the closing of the mouth, all forms dissolved',
    field: 'No objects, gross or subtle. Pure causal state (kāraṇa). The seed of all forms remains; no form is manifest.',
    knower: 'Prājña — the wise one. Consciousness without objects, but not without itself. Bliss without an object of bliss.',
    gitaAnchor: [
      { ref: 'BG 2.69', teaching: 'What is night for all beings is the time of waking for the self-controlled; the things in which beings wake is night for the seer.' },
      { ref: 'BG 6.7–8', teaching: 'The conqueror of self, peaceful, established in supreme reality — equally in cold and heat, joy and sorrow — is content with knowledge and realisation. This stillness echoes prājña.' },
      { ref: 'BG 5.24', teaching: 'One whose joy is within, whose play is within, whose light is within — that yogi attains liberation in Brahman.' },
    ],
    mandukyaCross: 'Māṇḍūkya 5 — Prājña is the third quarter, where one asleep desires no desires, sees no dream. A unified mass of consciousness, full of bliss, the doorway to knowing.',
    practice: 'On waking, before any thought — note the gap of not-yet-thought. You knew nothing of objects, yet on waking you say: "I slept well." Who knew the not-knowing? That knower remains in waking.',
  },
  turiya: {
    key: 'turiya',
    sanskrit: 'तुरीय',
    iast: 'turīya',
    english: 'The Fourth — Pure Awareness',
    symbolFromOm: 'The silence after AUM — the substratum of A, U, M; not a fourth sound but their source.',
    field: 'Not a state alongside the other three but the ground in which all three appear and dissolve. The witness that does not become its objects.',
    knower: 'Ātman / Brahman — the Self that is not a knower among knowers but pure knowing itself. Sākṣi, the unborn witness.',
    gitaAnchor: [
      { ref: 'BG 2.16', teaching: 'Of the unreal there is no being; of the real there is no non-being. The truth of both has been seen by the seers of the essence — turīya is what they saw.' },
      { ref: 'BG 13.32', teaching: 'As the all-pervading ether is not contaminated by its location, so the Self abiding in the body is not contaminated by the body. This is the turīya register.' },
      { ref: 'BG 15.18', teaching: 'I transcend the perishable and stand above even the imperishable; therefore I am known in the world and in the Veda as Puruṣottama. This is the I that is turīya.' },
    ],
    mandukyaCross: 'Māṇḍūkya 7 — turīya is not the knower of the inner, not of the outer, not of both, not a unified mass of consciousness, not knowing, not non-knowing. Unseen, ungraspable, indefinable — Self alone, the cessation of the world, peace, bliss, non-dual. Recognise this as the Self.',
    practice: 'In any of the three states — note what does not change. The waker, the dreamer, the deep-sleeper come and go; what witnesses them does not. Stay one breath with the witness that is awake even when "you" are asleep.',
  },
}

interface AssessmentItem {
  key: StateKey
  question: string
  weight: number
}

const ASSESSMENT: AssessmentItem[] = [
  { key: 'jagrat', question: 'How present and alert was your engagement with the world today (food, conversation, work)?', weight: 1 },
  { key: 'swapna', question: 'How aware were you of the contents of your mind — daydreams, fantasies, internal narration?', weight: 1 },
  { key: 'sushupti', question: 'How deep and restful was your sleep last night? Did you wake refreshed without an alarm?', weight: 1 },
  { key: 'turiya', question: 'In any moment today, did you notice the witnessing presence behind whatever was happening?', weight: 1.2 },
]

export default function ConsciousnessStateMapper() {
  const [active, setActive] = useState<StateKey>('jagrat')
  const [scores, setScores] = useState<Record<StateKey, number>>({ jagrat: 0, swapna: 0, sushupti: 0, turiya: 0 })
  const [submitted, setSubmitted] = useState(false)

  const set = (k: StateKey, v: number) => setScores(s => ({ ...s, [k]: v }))
  const reset = () => { setScores({ jagrat: 0, swapna: 0, sushupti: 0, turiya: 0 }); setSubmitted(false) }

  const dominant: StateKey = (Object.keys(scores) as StateKey[]).reduce((acc, k) =>
    scores[k] * (ASSESSMENT.find(a => a.key === k)?.weight ?? 1) >
    scores[acc] * (ASSESSMENT.find(a => a.key === acc)?.weight ?? 1) ? k : acc, 'jagrat')

  const info = STATES[active]

  return (
    <VedicAppTemplate
      title="Consciousness State Mapper"
      subtitle="Jāgrat · Svapna · Suṣupti · Turīya"
      icon="🌀"
      footerNote="Bhagavad Gītā Ch 7, 13, 15 · cross-references Māṇḍūkya Upaniṣad."
    >
      <p className="text-xs text-stone-500 dark:text-stone-400 mb-4 leading-relaxed">
        Four states of consciousness — three that come and go, one that holds them. Map each to its Gītā anchor and its Māṇḍūkya parallel. Track your daily state below.
      </p>

      <div className="grid grid-cols-4 gap-1.5 mb-4">
        {(Object.keys(STATES) as StateKey[]).map(k => (
          <button
            key={k}
            onClick={() => setActive(k)}
            className={`p-2 rounded-lg border text-center transition-all ${
              active === k
                ? 'border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-950/20'
                : 'border-stone-200 dark:border-stone-700 hover:border-orange-200 dark:hover:border-orange-800'
            }`}
          >
            <div className="text-xs font-serif text-stone-800 dark:text-stone-200">{STATES[k].sanskrit}</div>
            <div className="text-[10px] uppercase tracking-wider text-stone-500 dark:text-stone-400">{STATES[k].english}</div>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        <div className="rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/40 p-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">{info.iast} · OṂ correspondence</p>
          <p className="text-xs text-stone-700 dark:text-stone-300 italic leading-relaxed">{info.symbolFromOm}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-xl border border-amber-200 dark:border-amber-800/40 bg-amber-50 dark:bg-amber-950/20 p-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-1">Field</p>
            <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">{info.field}</p>
          </div>
          <div className="rounded-xl border border-indigo-200 dark:border-indigo-800/40 bg-indigo-50 dark:bg-indigo-950/20 p-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-1">Knower</p>
            <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">{info.knower}</p>
          </div>
        </div>

        <div className="rounded-xl border border-stone-200 dark:border-stone-700 p-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Gītā Anchors</p>
          <div className="space-y-2">
            {info.gitaAnchor.map(a => (
              <div key={a.ref} className="flex gap-3">
                <span className="text-[10px] font-black text-amber-500 dark:text-amber-400 flex-shrink-0 w-14">{a.ref}</span>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">{a.teaching}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border-2 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20 p-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-1">Māṇḍūkya Cross-Reference</p>
          <p className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed italic">{info.mandukyaCross}</p>
          <p className="text-[10px] text-orange-600 dark:text-orange-400 mt-2">Note: Māṇḍūkya Upaniṣad shard not yet in Vishwa-Vani Gold tier — anchors quoted from canonical text for cross-study.</p>
        </div>

        <div className="rounded-xl border border-stone-200 dark:border-stone-700 p-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">Practice</p>
          <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">{info.practice}</p>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-stone-200 dark:border-stone-700">
        <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Daily State Tracker</p>
        <p className="text-xs text-stone-500 dark:text-stone-400 mb-3">Score each from 0 (absent) to 5 (vivid). Find which state was dominant today.</p>
        <div className="space-y-2">
          {ASSESSMENT.map(a => (
            <div key={a.key} className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 w-20 flex-shrink-0">{STATES[a.key].iast}</span>
              <input
                type="range"
                min={0}
                max={5}
                step={1}
                value={scores[a.key]}
                onChange={e => set(a.key, Number(e.target.value))}
                className="flex-grow accent-orange-500"
              />
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400 w-6 text-right">{scores[a.key]}</span>
            </div>
          ))}
        </div>
        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            className="mt-3 w-full px-3 py-2 rounded-lg bg-orange-600 text-white text-xs font-black uppercase tracking-widest hover:bg-orange-700 transition-colors"
          >Map My State</button>
        ) : (
          <div className="mt-3 rounded-xl border-2 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20 p-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-1">Dominant Today</p>
            <p className="text-sm font-serif text-stone-800 dark:text-stone-200">{STATES[dominant].sanskrit} · {STATES[dominant].english}</p>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">{STATES[dominant].practice}</p>
            <button onClick={reset} className="mt-2 text-[10px] font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400 hover:text-orange-800">Reset</button>
          </div>
        )}
      </div>
    </VedicAppTemplate>
  )
}
