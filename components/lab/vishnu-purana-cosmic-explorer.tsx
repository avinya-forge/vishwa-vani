'use client'

import React, { useState } from 'react'
import VedicAppTemplate from './vedic-app-template'

interface CosmicPhase {
  title: string
  sanskrit: string
  description: string
  color: string
}

const PHASES: CosmicPhase[] = [
  {
    title: 'Creation',
    sanskrit: 'Sarga',
    description: 'The universe emerges from the unmanifest. Vishnu as Brahma initiates the cosmic projection.',
    color: 'text-yellow-600',
  },
  {
    title: 'Preservation',
    sanskrit: 'Sthiti',
    description: 'The sustained balance of the cosmos. Vishnu acts as the maintainer, upholding Dharma.',
    color: 'text-blue-600',
  },
  {
    title: 'Dissolution',
    sanskrit: 'Laya',
    description: 'The return to the unmanifest. Vishnu as Rudra absorbs the creation back into himself.',
    color: 'text-red-600',
  },
  {
    title: 'The Unmanifest',
    sanskrit: 'Avyakta',
    description: 'The eternal, unchanging reality beyond time and cycles. The ultimate source and destination.',
    color: 'text-purple-600',
  },
]

export default function VishnuPuranaCosmicExplorer() {
  const [phaseIndex, setPhaseIndex] = useState(0)

  const handleNext = () => {
    setPhaseIndex((prev) => (prev + 1) % PHASES.length)
  }

  const currentPhase = PHASES[phaseIndex]

  return (
    <VedicAppTemplate
      title="Cosmic Cycle Explorer"
      subtitle="Vishnu Purana • Cosmic Themes"
      icon="🌌"
      footerNote="Contemplate the eternal cycles of creation, preservation, and dissolution."
    >
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <h2 className={`text-3xl font-serif font-black mb-2 ${currentPhase.color}`}>
            {currentPhase.title}
          </h2>
          <p className="text-xl font-medium text-stone-600 dark:text-stone-300 mb-4">
            {currentPhase.sanskrit}
          </p>
          <p className="text-sm text-stone-500 dark:text-stone-400 max-w-md">
            {currentPhase.description}
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-orange-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-orange-600/20 hover:scale-105 active:scale-95 transition-all"
          >
            Advance Cycle
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {PHASES.map((_, idx) => (
             <div
               key={idx}
               className={`w-2 h-2 rounded-full ${idx === phaseIndex ? 'bg-orange-600' : 'bg-stone-300 dark:bg-stone-700'}`}
             />
          ))}
        </div>
      </div>
    </VedicAppTemplate>
  )
}
