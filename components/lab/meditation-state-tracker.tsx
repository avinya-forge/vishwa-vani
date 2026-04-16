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
    practice: 'Splash cold water on face. Do 5 minutes of kapalabhati (bellows breath) to energize. Chant or sing to activate the mind before sitting.',
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

  const footerNote = "Gita 6.35: 'Undoubtedly the mind is restless and difficult to restrain. But by practice and non-attachment, it can be controlled.'"

  return (
    <VedicAppTemplate
      title="Dhyana Tracker"
      subtitle="Gita Ch. 6 • Mind States"
      icon="🧘"
      footerNote={footerNote}
    >
      <div className="space-y-4">
        <div className="flex gap-1.5 p-1.5 bg-stone-100 dark:bg-stone-800/50 rounded-2xl mb-4">
          {(['checkin', 'guidance', 'log'] as const).map(tab => (
            <button key={tab} onClick={() => setView(tab)}
              className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${view === tab ? 'bg-white dark:bg-stone-700 shadow-sm text-orange-600' : 'text-stone-500'}`}>
              {tab === 'checkin' ? 'Check-In' : tab === 'guidance' ? 'Advice' : `Log (${sessions.length})`}
            </button>
          ))}
        </div>

        {view === 'checkin' && (
          <div className="space-y-4">
             <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-stone-500 mb-2">
              <span>Duration: {duration} min</span>
              <span className="text-orange-600">Session Setup</span>
            </div>
            <input type="range" min={5} max={60} step={5} value={duration}
                onChange={e => setDuration(Number(e.target.value))}
                className="w-full accent-orange-600 cursor-pointer mb-6" />

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {MIND_STATES.map(s => (
                <button key={s.id} onClick={() => setSelectedState(s.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all group ${selectedState === s.id ? 'bg-orange-50 dark:bg-orange-900/10 border-orange-500' : 'bg-white dark:bg-stone-900/40 border-stone-100 dark:border-stone-800 hover:border-orange-500/30'}`}>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl group-hover:scale-110 transition-transform">{s.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className={`font-black text-xs uppercase tracking-tight ${selectedState === s.id ? 'text-orange-700 dark:text-orange-400' : 'text-stone-900 dark:text-white'}`}>{s.name}</span>
                        <span className="text-[10px] font-medium text-stone-400 italic">{s.sanskrit}</span>
                      </div>
                      <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-1 line-clamp-1 font-medium">{s.description}</p>
                    </div>
                    {selectedState === s.id && <div className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />}
                  </div>
                </button>
              ))}
            </div>
            
            {selectedState && (
              <button onClick={logSession}
                className="w-full py-4 bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl mt-4">
                Record Presence
              </button>
            )}
          </div>
        )}

        {view === 'guidance' && stateInfo && (
          <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
            <div className="bg-stone-50 dark:bg-stone-800/20 p-6 rounded-[2rem] border border-stone-100 dark:border-stone-800/50 text-center">
              <span className="text-4xl block mb-2">{stateInfo.emoji}</span>
              <h3 className="text-stone-900 dark:text-white font-black text-lg uppercase tracking-tight">{stateInfo.name} Presence</h3>
              <p className="text-stone-500 text-[10px] font-black uppercase tracking-widest mt-1">{stateInfo.sanskrit} • {stateInfo.gitaRef}</p>
            </div>

            <div className="bg-white dark:bg-stone-900/40 p-5 rounded-3xl border border-orange-500/10">
              <p className="text-orange-600 dark:text-orange-400 text-[10px] font-black uppercase tracking-widest mb-3">Practice Guidance</p>
              <p className="text-stone-600 dark:text-stone-300 text-xs leading-relaxed font-medium italic font-serif">{stateInfo.practice}</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
               {stateInfo.symptoms.map((s, i) => (
                  <div key={i} className="bg-stone-100/50 dark:bg-stone-800/30 px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-tight text-stone-500 dark:text-stone-400 border border-stone-200/50 dark:border-stone-700/50 text-center">
                    {s}
                  </div>
                ))}
            </div>

            <button onClick={() => setView('checkin')}
              className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-orange-600/20">
              New Session Entry
            </button>
          </div>
        )}

        {view === 'log' && (
          <div className="space-y-3 animate-in fade-in duration-300">
            {sessions.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-stone-400 text-xs font-black uppercase tracking-widest italic opacity-50 font-serif">Empty presence log</p>
              </div>
            ) : (
              sessions.map((s, i) => (
                <div key={i} className="flex items-center gap-4 bg-white dark:bg-stone-900/40 p-4 rounded-2xl border border-stone-100 dark:border-stone-800">
                  <span className="text-2xl">{stateEmojis[s.state]}</span>
                  <div className="flex-1">
                    <div className="text-xs font-black text-stone-900 dark:text-white uppercase tracking-tight">{MIND_STATES.find(m => m.id === s.state)?.name}</div>
                    <div className="text-[10px] font-medium text-stone-500 italic mt-0.5">{s.duration} min session</div>
                  </div>
                  <span className="text-[9px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-widest">{s.date}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </VedicAppTemplate>
  )
}
