'use client'

import React, { useState } from 'react'
import VedicAppTemplate from './vedic-app-template'

type MindState = 'kshipta' | 'mudha' | 'vikshipta' | 'ekagra' | 'nirodha'

interface StateInfo {
  id: MindState
  name: string
  sanskrit: string
  emoji: string
  description: string
  symptoms: string[]
  practice: string
  gitaRef: string
}

const MIND_STATES: StateInfo[] = [
  {
    id: 'kshipta',
    name: 'Scattered',
    sanskrit: 'Kshipta',
    emoji: '💨',
    description: 'Mind jumps from object to object with no stability. Dominated by rajas (activity/agitation).',
    symptoms: ['Cannot sit still', 'Constant mental chatter', 'Jumping between tasks', 'Restlessness'],
    practice: 'Do not attempt deep meditation. Perform light pranayama (10 rounds), chant a mantra aloud, or do walking meditation first.',
    gitaRef: 'Gita 6.34',
  },
  {
    id: 'mudha',
    name: 'Dull / Sleepy',
    sanskrit: 'Mūdha',
    emoji: '😴',
    description: 'Mind is heavy, dull, or drowsy. Dominated by tamas (inertia/dullness).',
    symptoms: ['Drowsiness during practice', 'Lack of motivation', 'Mental fog', 'Heaviness'],
    practice: 'Splashe cold water on face. Do 5 minutes of kapalabhati (bellows breath) to energize. Chant or sing to activate the mind before sitting.',
    gitaRef: 'Gita 14.8',
  },
  {
    id: 'vikshipta',
    name: 'Oscillating',
    sanskrit: 'Vikshipta',
    emoji: '🌊',
    description: 'Moments of concentration interrupted by distraction. Transitional state — can move toward focus.',
    symptoms: ['Brief focus followed by distraction', 'Effort required to return', 'Some progress', 'Inconsistent sessions'],
    practice: 'Use a steady breath anchor (count 1-10, restart at 10+). When distracted, return without frustration. This is normal — it is the work.',
    gitaRef: 'Gita 6.26',
  },
  {
    id: 'ekagra',
    name: 'One-Pointed',
    sanskrit: 'Ekāgra',
    emoji: '🎯',
    description: 'Mind rests on one object without wandering. Sattvic quality dominant. This is dhyana proper.',
    symptoms: ['Extended focus periods', 'Thoughts arise but don\'t grab', 'Sense of inner stillness', 'Time passes unnoticed'],
    practice: 'Sustain. Do not grasp at the state or analyze it. Allow the object of meditation to deepen naturally. Return gently if the mind moves.',
    gitaRef: 'Gita 6.19',
  },
  {
    id: 'nirodha',
    name: 'Absorbed',
    sanskrit: 'Nirodha',
    emoji: '🕉️',
    description: 'Complete absorption — subject/object distinction dissolves. The highest state. Samadhi begins here.',
    symptoms: ['Loss of sense of time', 'No sense of meditator', 'Deep peace', 'Spontaneous arising of insights'],
    practice: 'Do not seek to prolong or describe. When it ends, sit quietly for 5-10 minutes. Gita 6.28: "The yogi, ever disciplined, having controlled the mind, attains peace — the supreme Nirvana."',
    gitaRef: 'Gita 6.27-28',
  },
]

interface SessionEntry {
  date: string
  state: MindState
  duration: number
}

export default function MeditationStateTracker() {
  const [selectedState, setSelectedState] = useState<MindState | null>(null)
  const [duration, setDuration] = useState(20)
  const [sessions, setSessions] = useState<SessionEntry[]>([])
  const [view, setView] = useState<'checkin' | 'guidance' | 'log'>('checkin')

  const logSession = () => {
    if (!selectedState) return
    const entry: SessionEntry = {
      date: new Date().toLocaleDateString(),
      state: selectedState,
      duration,
    }
    setSessions(s => [entry, ...s].slice(0, 10))
    setView('guidance')
  }

  const stateInfo = MIND_STATES.find(s => s.id === selectedState)

  const stateEmojis: Record<MindState, string> = {
    kshipta: '💨', mudha: '😴', vikshipta: '🌊', ekagra: '🎯', nirodha: '🕉️',
  }

  return (
    <VedicAppTemplate
      title="Meditation State Tracker"
      subtitle="Gita Ch. 6 • Dhyana Yoga"
      icon="🧘"
      darkMode={true}
      footerNote="Gita 6.35: 'Undoubtedly the mind is restless and difficult to restrain. But by practice and non-attachment, it can be controlled.'"
    >
      <div className="space-y-4">
        <div className="flex gap-1 p-1 bg-stone-800/50 rounded-xl">
          {(['checkin', 'guidance', 'log'] as const).map(tab => (
            <button key={tab} onClick={() => setView(tab)}
              className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${view === tab ? 'bg-orange-600 text-white' : 'text-stone-400'}`}>
              {tab === 'checkin' ? 'Check-In' : tab === 'guidance' ? 'Guidance' : `Log (${sessions.length})`}
            </button>
          ))}
        </div>

        {view === 'checkin' && (
          <div className="space-y-3">
            <p className="text-stone-400 text-sm">What was your mind like today?</p>
            <div className="space-y-2">
              {MIND_STATES.map(s => (
                <button key={s.id} onClick={() => setSelectedState(s.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${selectedState === s.id ? 'bg-orange-900/30 border-orange-500' : 'bg-stone-800/20 border-stone-700 hover:border-stone-600'}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{s.emoji}</span>
                    <div>
                      <span className="text-white font-bold text-sm">{s.name}</span>
                      <span className="text-stone-500 text-xs ml-2">{s.sanskrit}</span>
                      <p className="text-stone-400 text-xs mt-0.5 line-clamp-1">{s.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-stone-400 text-xs">Duration:</span>
              <input type="range" min={5} max={60} step={5} value={duration}
                onChange={e => setDuration(Number(e.target.value))}
                className="flex-1 accent-orange-500" />
              <span className="text-orange-400 text-sm font-bold w-12">{duration}min</span>
            </div>
            {selectedState && (
              <button onClick={logSession}
                className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-all">
                Log Session & Get Guidance
              </button>
            )}
          </div>
        )}

        {view === 'guidance' && stateInfo && (
          <div className="space-y-4">
            <div className="text-center py-3">
              <span className="text-4xl">{stateInfo.emoji}</span>
              <h3 className="text-white font-black text-lg mt-2">{stateInfo.name} Mind</h3>
              <p className="text-stone-400 text-xs">{stateInfo.sanskrit} • {stateInfo.gitaRef}</p>
            </div>
            <p className="text-stone-200 text-sm leading-relaxed">{stateInfo.description}</p>
            <div className="bg-stone-800/40 p-3 rounded-xl">
              <p className="text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">Practice Guidance</p>
              <p className="text-stone-200 text-sm leading-relaxed">{stateInfo.practice}</p>
            </div>
            <div>
              <p className="text-stone-500 text-xs font-bold uppercase tracking-wider mb-1">Signs of this state</p>
              <ul className="space-y-1">
                {stateInfo.symptoms.map((s, i) => (
                  <li key={i} className="text-stone-300 text-xs flex gap-2"><span className="text-orange-500">·</span>{s}</li>
                ))}
              </ul>
            </div>
            <button onClick={() => setView('checkin')}
              className="w-full py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-sm transition-all">
              New Check-In
            </button>
          </div>
        )}

        {view === 'log' && (
          <div className="space-y-2">
            {sessions.length === 0 ? (
              <p className="text-stone-500 text-sm text-center py-8">No sessions logged yet.</p>
            ) : (
              sessions.map((s, i) => (
                <div key={i} className="flex items-center gap-3 bg-stone-800/30 p-3 rounded-xl">
                  <span className="text-xl">{stateEmojis[s.state]}</span>
                  <div className="flex-1">
                    <span className="text-white text-sm font-bold">{MIND_STATES.find(m => m.id === s.state)?.name}</span>
                    <span className="text-stone-500 text-xs ml-2">{s.duration}min</span>
                  </div>
                  <span className="text-stone-500 text-xs">{s.date}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </VedicAppTemplate>
  )
}
