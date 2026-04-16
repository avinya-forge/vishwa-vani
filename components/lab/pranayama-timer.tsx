'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import VedicAppTemplate from './vedic-app-template'

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
    <VedicAppTemplate
      title="Pranayama Pulse"
      subtitle="Gita Ch. 6 • Dhyana Yoga"
      icon="🫁"
      footerNote="Control of breath (Pranayama) leads to steadiness of mind."
    >
      <div className="space-y-6">
        {/* Technique selector */}
        <div className="flex justify-between items-center bg-stone-100/50 dark:bg-stone-800/50 p-2 rounded-2xl border border-stone-200/50 dark:border-stone-700/50">
          <div className="flex gap-1.5 flex-wrap">
            {TECHNIQUES.map((t, i) => (
              <button key={t.name} onClick={() => handleTechChange(i)}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${!showCustom && techIndex === i ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'text-stone-500 hover:text-orange-600'}`}>
                {t.name}
              </button>
            ))}
            <button onClick={() => setShowCustom(v => !v)}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${showCustom ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900' : 'text-stone-500 hover:text-orange-600'}`}>
              Custom
            </button>
          </div>
          <button
            onClick={() => setIsActive(!isActive)}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all shadow-lg ${isActive ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900' : 'bg-orange-600 text-white shadow-orange-600/20 hover:scale-105 active:scale-95'}`}
          >
            {isActive ? '⏸' : '▶'}
          </button>
        </div>

        {/* Custom controls */}
        {showCustom && (
          <div className="grid grid-cols-4 gap-2 bg-stone-100 dark:bg-stone-900/60 p-3 rounded-2xl border border-stone-200 dark:border-stone-800 animate-in zoom-in-95 duration-300">
            {(['Inhale', 'Hold', 'Exhale', 'Pause'] as const).map((p, i) => (
              <div key={p} className="text-center">
                <div className="text-[9px] text-stone-400 dark:text-stone-500 uppercase mb-1 font-black">{p}</div>
                <input type="number" min={1} max={16} value={customRatio[i]}
                  onChange={e => {
                    const v = Math.max(1, Math.min(16, Number(e.target.value)))
                    setCustomRatio(r => { const n = [...r] as [number,number,number,number]; n[i] = v; return n })
                  }}
                  className="w-full bg-white dark:bg-stone-800 text-stone-900 dark:text-white text-center text-sm font-black rounded-lg p-1 border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-1 focus:ring-orange-500" />
              </div>
            ))}
          </div>
        )}

        {/* Main breathing circle */}
        <div className="flex flex-col items-center justify-center py-6">
          <div className={`w-40 h-40 rounded-full border-4 border-dashed border-stone-200 dark:border-stone-800 flex items-center justify-center relative transition-all duration-[4000ms] ${isActive && phase === 'Inhale' ? 'scale-110 border-orange-500/50' : 'scale-100'}`}>
            <div className={`absolute inset-4 rounded-full bg-orange-500 opacity-20 blur-2xl transition-all duration-[4000ms] ${isActive && phase === 'Inhale' ? 'scale-150' : 'scale-50'}`} />
            <div className="text-center relative z-10">
              <div className="text-5xl font-serif font-black text-stone-900 dark:text-white mb-0">{seconds}</div>
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-orange-600 dark:text-orange-500">{phase}</p>
            </div>
          </div>
        </div>

        {/* Phase labels */}
        <div className="grid grid-cols-4 gap-2 text-center pb-4">
          {phaseLabels.map(s => (
            <div key={s.name} className={`space-y-1 transition-all duration-500 ${s.active ? 'opacity-100 scale-105' : 'opacity-20'}`}>
              <div className="text-[10px] font-black text-stone-900 dark:text-white uppercase tracking-widest">{s.name}</div>
              <div className="text-[8px] text-stone-500 dark:text-stone-400 uppercase tracking-tighter font-black">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Session stats */}
        <div className="grid grid-cols-3 gap-3 text-center bg-stone-100 dark:bg-stone-800/30 border border-stone-200 dark:border-stone-800/50 rounded-2xl p-4">
          <div>
            <div className="text-lg font-black text-stone-900 dark:text-white leading-none">{rounds}</div>
            <div className="text-[8px] text-stone-400 dark:text-stone-500 uppercase tracking-wider font-black mt-1">Rounds</div>
          </div>
          <div>
            <div className="text-lg font-black text-stone-900 dark:text-white leading-none">{formatTime(elapsed)}</div>
            <div className="text-[8px] text-stone-400 dark:text-stone-500 uppercase tracking-wider font-black mt-1">Time</div>
          </div>
          <div className="flex items-center justify-center">
            <button onClick={reset} className="text-[9px] font-black text-stone-400 hover:text-orange-600 transition-colors uppercase tracking-widest">
              Reset ↺
            </button>
          </div>
        </div>
      </div>
    </VedicAppTemplate>
  )
}
