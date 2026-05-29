'use client'
import React, { useState } from 'react'
import VedicAppTemplate from './vedic-app-template'

type Faculty = 'mind' | 'breath' | 'speech' | 'eye' | 'ear'

interface FacultyData {
  id: Faculty
  label: string
  icon: string
  question: string
  verse: string
  revelation: string
}

const FACULTIES: FacultyData[] = [
  {
    id: 'mind',
    label: 'Mind (Manas)',
    icon: '🧠',
    question: 'By whom missioned falls the mind shot forth?',
    verse: 'यन्मनसा न मनुते येनाहुर्मनो मतम्। तदेव ब्रह्म त्वं विद्धि नेदं यदिदमुपासते॥ (1.6)',
    revelation: 'The Mind of the Mind. That which does not think by mind, but by which the mind is thought—that alone is Brahman.'
  },
  {
    id: 'breath',
    label: 'Breath (Prana)',
    icon: '🌬️',
    question: 'By whom yoked does the first life-breath move?',
    verse: 'यत्प्राणेन न प्राणिति येन प्राणः प्रणीयते। तदेव ब्रह्म त्वं विद्धि नेदं यदिदमुपासते॥ (1.9)',
    revelation: 'The Life of Life. That which does not breathe by breath, but by which breath is drawn—that alone is Brahman.'
  },
  {
    id: 'speech',
    label: 'Speech (Vach)',
    icon: '🗣️',
    question: 'By whom missioned is this speech that men utter?',
    verse: 'यद्वाचाऽनभ्युदितं येन वागभ्युद्यते। तदेव ब्रह्म त्वं विद्धि नेदं यदिदमुपासते॥ (1.5)',
    revelation: 'The Speech of Speech. That which is not expressed by speech, but by which speech is expressed—that alone is Brahman.'
  },
  {
    id: 'eye',
    label: 'Eye (Chakshus)',
    icon: '👁️',
    question: 'Who is the god that yokes the eye?',
    verse: 'यच्चक्षुषा न पश्यति येन चक्षूंषि पश्यति। तदेव ब्रह्म त्वं विद्धि नेदं यदिदमुपासते॥ (1.7)',
    revelation: 'The Eye of the Eye. That which does not see by the eye, but by which one sees the eyes—that alone is Brahman.'
  },
  {
    id: 'ear',
    label: 'Ear (Shrotram)',
    icon: '👂',
    question: 'Who is the god that yokes the ear?',
    verse: 'यच्छ्रोत्रेण न शृणोति येन श्रोत्रमिदं श्रुतम्। तदेव ब्रह्म त्वं विद्धि नेदं यदिदमुपासते॥ (1.8)',
    revelation: 'The Ear of the Ear. That which does not hear by the ear, but by which the ear is heard—that alone is Brahman.'
  }
]

export default function KenaInquiryLab() {
  const [activeFaculty, setActiveFaculty] = useState<Faculty | null>(null)
  const [revealed, setRevealed] = useState(false)

  const faculty = FACULTIES.find(f => f.id === activeFaculty)

  return (
    <VedicAppTemplate
      title="Kena Sensory Inquiry"
      subtitle="The Eye of the Eye"
      icon="🔱"
      footerNote="Based on Kena Upanishad Khanda 1. Inquiry into the source of conscious experience."
    >
      <div className="space-y-6">
        <p className="text-sm text-stone-600 dark:text-stone-400">
          The Kena Upanishad begins with a fundamental inquiry: What is the power behind our senses? Select a faculty to begin the investigation.
        </p>

        <div className="flex flex-wrap gap-2">
          {FACULTIES.map(f => (
            <button
              key={f.id}
              onClick={() => {
                setActiveFaculty(f.id)
                setRevealed(false)
              }}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeFaculty === f.id
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-orange-50 dark:hover:bg-orange-950/20'
              }`}
            >
              {f.icon} {f.label}
            </button>
          ))}
        </div>

        {faculty && (
          <div className="p-6 rounded-3xl bg-orange-50/50 dark:bg-orange-950/10 border border-orange-100 dark:border-orange-900/30 animate-in fade-in slide-in-from-bottom-4">
            <h4 className="text-lg font-serif font-bold text-orange-900 dark:text-orange-100 mb-2">
              Question: {faculty.question}
            </h4>

            {!revealed ? (
              <button
                onClick={() => setRevealed(true)}
                className="w-full py-4 rounded-2xl bg-white dark:bg-stone-900 border-2 border-dashed border-orange-200 dark:border-orange-800 text-orange-600 font-bold hover:border-orange-400 transition-colors"
              >
                Deepen Inquiry
              </button>
            ) : (
              <div className="space-y-4 animate-in zoom-in-95 duration-500">
                <div className="p-4 bg-white dark:bg-stone-900 rounded-2xl shadow-sm italic text-stone-800 dark:text-stone-200">
                  {faculty.verse}
                </div>
                <div className="p-4 bg-orange-600 text-white rounded-2xl font-bold shadow-lg shadow-orange-500/20">
                   {faculty.revelation}
                </div>
                <p className="text-xs text-orange-700/60 dark:text-orange-400/60 text-center">
                  "Know that alone as Brahman, not that which people adore here."
                </p>
              </div>
            )}
          </div>
        )}

        {!activeFaculty && (
          <div className="h-48 flex items-center justify-center border-2 border-dashed border-stone-100 dark:border-stone-800 rounded-3xl text-stone-400 text-sm italic">
            Select a faculty to initiate the Upanishadic inquiry...
          </div>
        )}
      </div>
    </VedicAppTemplate>
  )
}
