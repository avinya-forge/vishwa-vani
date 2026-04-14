'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'

type Phase = 'Inhale' | 'Hold' | 'Exhale' | 'Pause'

interface Technique {
  name: string
  sanskrit: string
  ratio: [number, number, number, number] // Inhale, Hold, Exhale, Pause
  description: string
}

const TECHNIQUES: Technique[] = [
  { name: 'Box Breathing', sanskrit: 'Sama Vritti', ratio: [4, 4, 4, 4], description: 'Equal ratio — balances nervous system.' },
  { name: 'Relaxing', sanskrit: 'Vishrama Pranayama', ratio: [4, 4, 8, 2], description: 'Long exhale — activates parasympathetic.' },
  { name: 'Energizing', sanskrit: 'Shakti Pranayama', ratio: [6, 2, 4, 2], description: 'Longer inhale — builds energy.' },
  { name: 'Classic 4-7-8', sanskrit: 'Nidra Pranayama', ratio: [4, 7, 8, 1], description: 'Deep relaxation and sleep aid.' },
]

export default function PranayamaTimer() {
  const [techIndex, setTechIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('Inhale')
  const [seconds, setSeconds] = useState(TECHNIQUES[0].ratio[0])
  const [isActive, setIsActive] = useState(false)
  const [rounds, setRounds] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [customRatio, setCustomRatio] = useState<[number, number, number, number]>([4, 4, 4, 2])
  const [showCustom, setShowCustom] = useState(false)
  const elapsedRef = useRef<NodeJS.Timeout | null>(null)

  const technique = showCustom
    ? { name: 'Custom', sanskrit: 'Sveccha', ratio: customRatio, description: 'Your custom ratio.' }
    : TECHNIQUES[techIndex]

  const ratio = technique.ratio

  const phaseOrder: Phase[] = ['Inhale', 'Hold', 'Exhale', 'Pause']
  const phaseIndex = { Inhale: 0, Hold: 1, Exhale: 2, Pause: 3 }

  const nextPhase = useCallback((current: Phase): { phase: Phase; duration: number; newRound: boolean } => {
    const idx = phaseIndex[current]
    const next = phaseOrder[(idx + 1) % 4] as Phase
    const newRound = next === 'Inhale'
    return { phase: next, duration: ratio[(idx + 1) % 4], newRound }
  }, [ratio])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(s => {
          if (s <= 1) {
            const { phase: np, duration, newRound } = nextPhase(phase)
            setPhase(np)
            if (newRound) setRounds(r => r + 1)
            return duration
          }
          return s - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isActive, phase, nextPhase])

  useEffect(() => {
    if (isActive) {
      elapsedRef.current = setInterval(() => setElapsed(e => e + 1), 1000)
    } else {
      if (elapsedRef.current) clearInterval(elapsedRef.current)
    }
    return () => { if (elapsedRef.current) clearInterval(elapsedRef.current) }
  }, [isActive])

  const reset = () => {
    setIsActive(false)
    setPhase('Inhale')
    setSeconds(ratio[0])
    setRounds(0)
    setElapsed(0)
  }

  const handleTechChange = (i: number) => {
    setTechIndex(i)
    setShowCustom(false)
    reset()
    setSeconds(TECHNIQUES[i].ratio[0])
  }

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  const phaseLabels = [
    { name: 'Puraka', label: 'Inhale', active: phase === 'Inhale' },
    { name: 'Kumbhaka', label: 'Hold', active: phase === 'Hold' },
    { name: 'Rechaka', label: 'Exhale', active: phase === 'Exhale' },
    { name: 'Shunya', label: 'Pause', active: phase === 'Pause' },
  ]

  return (
    <div className="bg-white/70 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 rounded-[2.5rem] p-8 sm:p-12 shadow-sm dark:shadow-none h-full flex flex-col justify-between relative overflow-hidden group transition-all backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">Gita Ch. 6 • Dhyana Yoga</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-stone-900 dark:text-white">Pranayama Pulse</h2>
          </div>
            <button
              onClick={() => setIsActive(!isActive)}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-xl transition-all ${isActive ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900' : 'bg-orange-600 text-white shadow-xl shadow-orange-600/20 hover:scale-105 active:scale-95'}`}
            >
              {isActive ? '⏸' : '▶'}
            </button>
        </div>

        {/* Technique selector */}
        <div className="flex gap-1.5 flex-wrap mb-4">
          {TECHNIQUES.map((t, i) => (
            <button key={t.name} onClick={() => handleTechChange(i)}
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${!showCustom && techIndex === i ? 'bg-orange-600 text-white shadow-md' : 'bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-orange-600'}`}>
              {t.name}
            </button>
          ))}
          <button onClick={() => setShowCustom(v => !v)}
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${showCustom ? 'bg-orange-600 text-white shadow-md' : 'bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-orange-600'}`}>
            Custom
          </button>
        </div>
        <p className="text-stone-500 text-[10px] mb-4">{technique.description} · {ratio.join('-')} ratio</p>

        {/* Custom controls */}
        {showCustom && (
          <div className="grid grid-cols-4 gap-2 mb-4 bg-stone-800/40 p-3 rounded-2xl">
            {(['Inhale', 'Hold', 'Exhale', 'Pause'] as const).map((p, i) => (
              <div key={p} className="text-center">
                <div className="text-[9px] text-stone-400 uppercase mb-1">{p}</div>
                <input type="number" min={1} max={16} value={customRatio[i]}
                  onChange={e => {
                    const v = Math.max(1, Math.min(16, Number(e.target.value)))
                    setCustomRatio(r => { const n = [...r] as [number,number,number,number]; n[i] = v; return n })
                  }}
                  className="w-full bg-white dark:bg-stone-700 text-stone-900 dark:text-white text-center text-sm font-bold rounded-lg p-1 border border-stone-200 dark:border-stone-600 focus:outline-none focus:border-orange-500" />
              </div>
            ))}
          </div>
        )}

        {/* Main breathing circle */}
        <div className="flex flex-col items-center justify-center py-10">
          <div className={`w-48 h-48 rounded-full border-4 border-dashed border-stone-800 flex items-center justify-center relative transition-all duration-[4000ms] ${isActive && phase === 'Inhale' ? 'scale-125 border-orange-500' : 'scale-100'}`}>
            <div className={`absolute inset-4 rounded-full bg-gradient-to-t from-orange-600 to-orange-400 opacity-20 blur-2xl transition-all duration-[4000ms] ${isActive && phase === 'Inhale' ? 'scale-150' : 'scale-50'}`} />
            <div className="text-center relative z-10">
              <div className="text-5xl font-serif font-black text-stone-900 dark:text-white mb-1 group-hover:scale-110 transition-transform duration-[4000ms]">{seconds}</div>
              <div className="text-[10px] font-black uppercase tracking-[0.5em] text-orange-600 dark:text-orange-500">{phase}</div>
            </div>
          </div>
        </div>

        {/* Session stats */}
        <div className="grid grid-cols-3 gap-4 text-center bg-stone-100 dark:bg-stone-800/30 border border-stone-200 dark:border-transparent rounded-2xl p-4 mb-6">
          <div>
            <div className="text-xl font-black text-stone-900 dark:text-white">{rounds}</div>
            <div className="text-[9px] text-stone-400 dark:text-stone-500 uppercase tracking-wider font-bold">Rounds</div>
          </div>
          <div>
            <div className="text-xl font-black text-stone-900 dark:text-white">{formatTime(elapsed)}</div>
            <div className="text-[9px] text-stone-400 dark:text-stone-500 uppercase tracking-wider font-bold">Duration</div>
          </div>
          <div>
            <button onClick={reset} className="text-[10px] font-bold text-stone-400 hover:text-white uppercase tracking-wider transition-all">
              Reset ↺
            </button>
          </div>
        </div>
      </div>

      {/* Phase labels */}
      <div className="relative z-10 grid grid-cols-4 gap-4 text-center">
        {phaseLabels.map(s => (
          <div key={s.name} className={`space-y-1 transition-opacity ${s.active ? 'opacity-100' : 'opacity-20'}`}>
            <div className="text-[10px] font-black text-stone-800 dark:text-white uppercase tracking-widest">{s.name}</div>
            <div className="text-[9px] text-stone-400 dark:text-stone-500 uppercase tracking-tighter font-bold">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
