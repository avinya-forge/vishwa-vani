'use client'

import React, { useState } from 'react'
import VedicAppTemplate from './vedic-app-template'

interface TimeScale {
  id: string
  name: string
  sanskrit: string
  duration: string
  description: string
  humanEquivalent: string
  gitaRef: string
}

const TIME_SCALES: TimeScale[] = [
  {
    id: 'nimisha',
    name: 'Moment',
    sanskrit: 'Nimesha',
    duration: '0.2 seconds',
    description: 'The smallest unit — a blink of an eye. The Gita teaches that change happens continuously at this scale.',
    humanEquivalent: 'One blink',
    gitaRef: 'Gita 10.33',
  },
  {
    id: 'human-life',
    name: 'Human Life',
    sanskrit: 'Manushya Jivana',
    duration: '100 years',
    description: 'A complete human lifetime. Arjuna fears this will end — Krishna reveals the Self is not bound by it.',
    humanEquivalent: 'One lifetime',
    gitaRef: 'Gita 2.19-20',
  },
  {
    id: 'mahayuga',
    name: 'Maha Yuga',
    sanskrit: 'Mahāyuga',
    duration: '4,320,000 years',
    description: 'One complete cycle of four ages: Satya, Treta, Dvapara, and Kali Yuga combined.',
    humanEquivalent: '43,200 human lifetimes',
    gitaRef: 'Gita 8.17',
  },
  {
    id: 'kalpa',
    name: 'Day of Brahma',
    sanskrit: 'Kalpa',
    duration: '4.32 billion years',
    description: 'One day of Brahma = 1,000 Maha Yugas. During the night, all manifest creation dissolves.',
    humanEquivalent: '43.2 million human lifetimes',
    gitaRef: 'Gita 8.17',
  },
  {
    id: 'brahma-life',
    name: 'Life of Brahma',
    sanskrit: 'Brahma Āyuṣ',
    duration: '311 trillion years',
    description: 'Even Brahma, the creator, is not permanent. After his lifespan, all creation dissolves into the unmanifest.',
    humanEquivalent: '3.1 trillion human lifetimes',
    gitaRef: 'Gita 8.16',
  },
  {
    id: 'eternal',
    name: 'The Eternal',
    sanskrit: 'Akshara',
    duration: 'Infinite',
    description: 'Beyond all time cycles — the imperishable Brahman in which all creation arises and dissolves. This is your true nature.',
    humanEquivalent: 'Beyond measurement',
    gitaRef: 'Gita 8.20-21',
  },
]

const QUIZ_QUESTIONS = [
  {
    question: 'According to Gita 8.17, one day of Brahma equals how many human years?',
    options: ['432,000 years', '4.32 million years', '4.32 billion years', '432 trillion years'],
    correct: 2,
    explanation: 'One Kalpa (day of Brahma) = 1,000 Maha Yugas = 4.32 billion human years. At night, all manifest creation dissolves.',
  },
  {
    question: 'Gita 8.16 says "all worlds up to Brahmaloka are subject to..." what?',
    options: ['Karma', 'Return (rebirth)', 'Time decay', 'Maya'],
    correct: 1,
    explanation: 'All worlds including Brahmaloka are subject to return (punara āvartino) — only reaching the Supreme removes the cycle of rebirth.',
  },
  {
    question: 'In Gita 2.19-20, Krishna says the Self (Atman) is:',
    options: ['Born with the body', 'Destroyed at death', 'Eternal and unborn', 'Bound by time'],
    correct: 2,
    explanation: '"The Self is never born nor dies. It did not come into being, does not come into being, and will not come into being." — Gita 2.20',
  },
]

export default function TimeConsciousnessWheel() {
  const [activeScale, setActiveScale] = useState<string | null>(null)
  const [quizMode, setQuizMode] = useState(false)
  const [quizIndex, setQuizIndex] = useState(0)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const selected = TIME_SCALES.find(s => s.id === activeScale)

  const handleAnswer = (idx: number) => {
    setSelectedAnswer(idx)
    if (idx === QUIZ_QUESTIONS[quizIndex].correct) setQuizScore(s => s + 1)
  }

  const nextQuizQuestion = () => {
    if (quizIndex < QUIZ_QUESTIONS.length - 1) {
      setQuizIndex(i => i + 1)
      setSelectedAnswer(null)
    } else {
      setQuizDone(true)
    }
  }

  const scaleColors = [
    'bg-stone-700/40 border-stone-600',
    'bg-blue-900/30 border-blue-700',
    'bg-indigo-900/30 border-indigo-700',
    'bg-violet-900/30 border-violet-700',
    'bg-purple-900/30 border-purple-700',
    'bg-orange-900/30 border-orange-500',
  ]

  return (
    <VedicAppTemplate
      title="Time Consciousness Wheel"
      subtitle="Gita Ch. 8 & 10 • Vedic Cosmology"
      icon="⏳"
      darkMode={true}
      footerNote="Gita 8.16: 'All worlds up to Brahmaloka are subject to return. But for one who reaches Me, there is no rebirth.'"
    >
      {!quizMode ? (
        <div className="space-y-4">
          <p className="text-stone-400 text-sm">Tap any time scale to explore. The Self exists beyond all of them.</p>
          <div className="space-y-2">
            {TIME_SCALES.map((scale, i) => (
              <button
                key={scale.id}
                onClick={() => setActiveScale(activeScale === scale.id ? null : scale.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${scaleColors[i]} ${activeScale === scale.id ? 'ring-1 ring-orange-500' : ''}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-white font-bold text-sm">{scale.name}</span>
                    <span className="text-stone-500 text-xs ml-2">({scale.sanskrit})</span>
                  </div>
                  <span className="text-orange-400 text-xs font-mono">{scale.duration}</span>
                </div>
                {activeScale === scale.id && (
                  <div className="mt-3 space-y-2">
                    <p className="text-stone-200 text-sm leading-relaxed">{scale.description}</p>
                    <div className="flex gap-4 text-xs text-stone-400">
                      <span>≈ {scale.humanEquivalent}</span>
                      <span className="text-orange-500">{scale.gitaRef}</span>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
          <button
            onClick={() => setQuizMode(true)}
            className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-all mt-4"
          >
            Test Your Understanding →
          </button>
        </div>
      ) : quizDone ? (
        <div className="text-center space-y-6">
          <div className="text-6xl">⏳</div>
          <h3 className="text-2xl font-serif font-black text-white">Cosmology Score</h3>
          <div className="text-5xl font-black text-orange-400">{Math.round((quizScore / QUIZ_QUESTIONS.length) * 100)}%</div>
          <p className="text-stone-300">{quizScore} of {QUIZ_QUESTIONS.length} correct.</p>
          <div className="bg-stone-800/50 p-4 rounded-xl text-stone-300 text-sm">
            {quizScore === QUIZ_QUESTIONS.length
              ? 'Excellent! You understand Vedic cosmology\'s message: time is vast, but the Self is beyond time.'
              : 'Review Gita chapters 8 and 10 for deeper understanding of Vedic time cycles.'}
          </div>
          <button onClick={() => { setQuizMode(false); setQuizIndex(0); setQuizScore(0); setQuizDone(false); setSelectedAnswer(null) }}
            className="px-8 py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-all">
            Explore Again
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-sm text-stone-400">Question {quizIndex + 1} of {QUIZ_QUESTIONS.length}</div>
          <div className="bg-stone-800/30 p-4 rounded-xl">
            <p className="text-stone-200 font-medium">{QUIZ_QUESTIONS[quizIndex].question}</p>
          </div>
          {selectedAnswer === null ? (
            <div className="space-y-2">
              {QUIZ_QUESTIONS[quizIndex].options.map((opt, idx) => (
                <button key={idx} onClick={() => handleAnswer(idx)}
                  className="w-full text-left p-3 bg-stone-800/20 hover:bg-stone-700/30 border border-stone-700 rounded-xl text-stone-200 text-sm transition-all">
                  {opt}
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <div className={`p-4 rounded-xl border-2 ${selectedAnswer === QUIZ_QUESTIONS[quizIndex].correct ? 'bg-green-900/20 border-green-600' : 'bg-red-900/20 border-red-600'}`}>
                <div className="font-bold mb-1 text-sm">{selectedAnswer === QUIZ_QUESTIONS[quizIndex].correct ? '✅ Correct' : '❌ Incorrect'}</div>
                <p className="text-stone-200 text-sm">{QUIZ_QUESTIONS[quizIndex].explanation}</p>
              </div>
              <button onClick={nextQuizQuestion}
                className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-all">
                {quizIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'See Results'}
              </button>
            </div>
          )}
        </div>
      )}
    </VedicAppTemplate>
  )
}
