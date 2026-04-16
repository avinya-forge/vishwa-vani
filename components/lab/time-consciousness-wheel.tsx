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

  const reset = () => {
    setQuizMode(false)
    setQuizIndex(0)
    setQuizScore(0)
    setQuizDone(false)
    setSelectedAnswer(null)
    setActiveScale(null)
  }

  const footerNote = "Gita 8.16: 'All worlds up to Brahmaloka are subject to return. But for one who reaches Me, there is no rebirth.'"

  return (
    <VedicAppTemplate
      title="Kala Cakra"
      subtitle="Gita Ch. 8 • Cosmic Time"
      icon="⏳"
      footerNote={footerNote}
    >
      {!quizMode ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-stone-500 mb-2">
            <span>Cosmic Hierarchy</span>
            <span className="text-orange-600">Scale Selection</span>
          </div>

          <div className="space-y-2 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
            {TIME_SCALES.map((scale) => (
              <button
                key={scale.id}
                onClick={() => setActiveScale(activeScale === scale.id ? null : scale.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${activeScale === scale.id ? 'bg-orange-50 dark:bg-orange-900/10 border-orange-500' : 'bg-white dark:bg-stone-900/40 border-stone-100 dark:border-stone-800'}`}
              >
                <div className="flex justify-between items-baseline mb-1">
                  <div className="flex items-baseline gap-2">
                    <span className={`font-black text-xs uppercase tracking-tight ${activeScale === scale.id ? 'text-orange-700 dark:text-orange-400' : 'text-stone-900 dark:text-white'}`}>{scale.name}</span>
                    <span className="text-[10px] font-medium text-stone-400 italic">{scale.sanskrit}</span>
                  </div>
                  <span className="text-[10px] font-black text-orange-600 dark:text-orange-400 font-serif">{scale.duration}</span>
                </div>
                
                {activeScale === scale.id && (
                  <div className="mt-3 space-y-3 animate-in fade-in duration-300">
                    <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-relaxed font-serif italic border-l-2 border-orange-500/30 pl-3">
                      {scale.description}
                    </p>
                    <div className="flex justify-between items-center bg-stone-100/50 dark:bg-stone-800/50 p-2 rounded-xl">
                      <span className="text-[9px] font-black uppercase tracking-widest text-stone-500">Relative Magnitude:</span>
                      <span className="text-[9px] font-black text-orange-600">{scale.humanEquivalent}</span>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => setQuizMode(true)}
            className="w-full py-4 bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl mt-4"
          >
            Cosmology Challenge
          </button>
        </div>
      ) : quizDone ? (
        <div className="text-center space-y-6 py-4 animate-in zoom-in-95 duration-500">
           <div className="py-8">
            <div className="text-4xl font-black text-orange-600 dark:text-orange-500 mb-1">{Math.round((quizScore / QUIZ_QUESTIONS.length) * 100)}%</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-stone-500">Universal Clarity</div>
          </div>

          <div className="bg-stone-100 dark:bg-stone-800/50 p-6 rounded-[2rem] border border-stone-200 dark:border-stone-700/50">
            <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed italic font-serif">
              {quizScore === QUIZ_QUESTIONS.length
                ? 'Excellent! You understand Vedic cosmology\'s message: time is vast, but the Self is beyond time.'
                : 'Review Gita chapters 8 and 10 for deeper understanding of Vedic time cycles.'}
            </p>
          </div>

          <button onClick={reset}
            className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-orange-600/20">
            Re-Align Time
          </button>
        </div>
      ) : (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-stone-400">
            <span>{quizIndex + 1} / {QUIZ_QUESTIONS.length}</span>
            <span className="text-orange-600">Score: {quizScore}</span>
          </div>

          <div className="bg-stone-100/50 dark:bg-stone-800/30 p-6 rounded-[2rem] border border-stone-200/50 dark:border-stone-700/50 min-h-[120px] flex flex-col justify-center">
            <p className="text-sm font-serif italic text-stone-700 dark:text-stone-300 leading-relaxed">
               {QUIZ_QUESTIONS[quizIndex].question}
            </p>
          </div>

          {selectedAnswer === null ? (
            <div className="space-y-3">
              {QUIZ_QUESTIONS[quizIndex].options.map((opt, idx) => (
                <button key={idx} onClick={() => handleAnswer(idx)}
                  className="w-full text-left p-4 bg-white dark:bg-stone-900/40 hover:bg-orange-50 dark:hover:bg-orange-900/10 border border-stone-200 dark:border-stone-800 rounded-2xl transition-all group"
                >
                  <span className="text-xs font-medium text-stone-600 dark:text-stone-300 group-hover:text-orange-700 dark:group-hover:text-orange-400 transition-colors leading-relaxed block">{opt}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
               <div className={`p-5 rounded-3xl border ${selectedAnswer === QUIZ_QUESTIONS[quizIndex].correct ? 'bg-green-500/5 border-green-500/30' : 'bg-red-500/5 border-red-500/30'}`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${selectedAnswer === QUIZ_QUESTIONS[quizIndex].correct ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {selectedAnswer === QUIZ_QUESTIONS[quizIndex].correct ? '✓' : '✗'}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${selectedAnswer === QUIZ_QUESTIONS[quizIndex].correct ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {selectedAnswer === QUIZ_QUESTIONS[quizIndex].correct ? 'Vedic Insight' : 'Temporal Illusion'}
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed font-medium">
                   {QUIZ_QUESTIONS[quizIndex].explanation}
                </p>
              </div>

              <button onClick={nextQuizQuestion}
                className="w-full py-4 bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl">
                {quizIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Period' : 'View Epoch Results'}
              </button>
            </div>
          )}
        </div>
      )}
    </VedicAppTemplate>
  )
}
