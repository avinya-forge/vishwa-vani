'use client'
import React, { useState } from 'react'
import VedicAppTemplate from './vedic-app-template'

type PathMode = 'action' | 'renunciation'

interface Scenario {
  id: number
  title: string
  context: string
  actionPath: {
    label: string
    guidance: string
    gitaRef: string
    alignment: string
  }
  renunciationPath: {
    label: string
    guidance: string
    gitaRef: string
    alignment: string
  }
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    title: 'The Stagnant Career',
    context: 'You are offered a major promotion, but it comes with heavy corporate politics. Do you accept the challenge or walk away to maintain peace?',
    actionPath: {
      label: 'Accept & Act (Karma Yoga)',
      guidance: 'Perform the new role flawlessly, but remain indifferent to the corporate politics and the prestige of the title. Act because it is your duty, not for the fruits.',
      gitaRef: 'BG 5.7',
      alignment: 'By acting without attachment, your action itself becomes a form of renunciation.',
    },
    renunciationPath: {
      label: 'Walk Away (Sannyasa)',
      guidance: 'Renounce the promotion and the worldly ambition entirely. Focus your energy on self-realization rather than corporate climbing.',
      gitaRef: 'BG 5.6',
      alignment: 'By renouncing the action, you cultivate inner purity, arriving at the same state of unattached peace.',
    },
  },
  {
    id: 2,
    title: 'The Family Dispute',
    context: 'A bitter argument divides your family over an inheritance. Do you step in to mediate and fight for justice, or retreat from the drama?',
    actionPath: {
      label: 'Mediate & Fight (Karma Yoga)',
      guidance: 'Engage in the conflict to uphold Dharma and fairness, but without anger or personal greed. Fight for what is right, untouched by the outcome.',
      gitaRef: 'BG 4.20',
      alignment: 'Seeing inaction in action: you are fiercely active outside, but completely still inside.',
    },
    renunciationPath: {
      label: 'Retreat & Pray (Sannyasa)',
      guidance: 'Withdraw from the material dispute completely. Recognize that wealth is perishable and focus your mind on the eternal.',
      gitaRef: 'BG 5.3',
      alignment: 'True renunciation is neither hating the loss nor craving the gain. You transcend the conflict.',
    },
  },
  {
    id: 3,
    title: 'The Failing Startup',
    context: 'Your startup is running out of money. Do you grind through 80-hour weeks to try and save it, or close it down and accept failure?',
    actionPath: {
      label: 'Grind & Persist (Karma Yoga)',
      guidance: 'Work tirelessly because the effort is your duty to your team and vision. Accept failure or success with perfect equanimity.',
      gitaRef: 'BG 4.22',
      alignment: 'Having abandoned attachment to the fruit of work, you are ever content, doing nothing even while fully engaged.',
    },
    renunciationPath: {
      label: 'Close & Accept (Sannyasa)',
      guidance: 'Renounce the ego-attachment to being a "successful founder". Close the venture gracefully and redirect your identity to the Self.',
      gitaRef: 'BG 5.8-9',
      alignment: 'The knower of Truth thinks "I do nothing at all", seeing the senses merely interacting with sense-objects.',
    },
  },
  {
    id: 4,
    title: 'The Creative Block',
    context: 'You are an artist struggling to produce a masterpiece. Do you force yourself to paint every day, or stop painting until inspiration naturally returns?',
    actionPath: {
      label: 'Paint Daily (Karma Yoga)',
      guidance: 'Offer your daily painting as a sacrifice (Yajna) to the Supreme. Do not judge the quality of the art; just perform the sacred act of creation.',
      gitaRef: 'BG 4.24',
      alignment: 'Satisfied with whatever comes by chance, free from envy, your actions melt away into pure sacrifice.',
    },
    renunciationPath: {
      label: 'Stop & Reflect (Sannyasa)',
      guidance: 'Renounce the anxious need to create. Meditate on the source of all creativity within until the ego subsides.',
      gitaRef: 'BG 5.13',
      alignment: 'Mentally renouncing all actions, you rest happily in the nine-gated city of the body, neither acting nor causing action.',
    },
  },
  {
    id: 5,
    title: 'The Social Activist',
    context: 'You see injustice in society. Do you organize protests and lobby for laws, or retreat to an ashram to send out peaceful vibrations?',
    actionPath: {
      label: 'Organize & Protest (Karma Yoga)',
      guidance: 'Fight against injustice tirelessly, but without hatred for the oppressors. Your activism is a divine duty, devoid of personal malice.',
      gitaRef: 'BG 4.18',
      alignment: 'He who sees action in inaction, and inaction in action, is wise among men.',
    },
    renunciationPath: {
      label: 'Retreat to Ashram (Sannyasa)',
      guidance: 'Withdraw from political turmoil. Realize that the world is an interplay of Gunas, and elevate world consciousness through your own self-purification.',
      gitaRef: 'BG 5.2',
      alignment: 'Both paths lead to the highest goal, but Karma Yoga is often praised as easier for the embodied soul.',
    }
  }
]

export default function SanyasaParadoxResolver() {
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [selectedPath, setSelectedPath] = useState<PathMode | null>(null)

  const scenario = SCENARIOS[scenarioIndex]
  const pathData = selectedPath === 'action' ? scenario.actionPath : (selectedPath === 'renunciation' ? scenario.renunciationPath : null)

  return (
    <VedicAppTemplate
      title="Sanyāsa Paradox Resolver"
      subtitle="Chapters 4 & 5 — How to act while renouncing?"
      icon="⚖️"
      footerNote="Bhagavad Gita Chapters 4 & 5 — Karma Sannyasa Yoga"
    >
      {/* Progress pills */}
      <div className="flex gap-1.5 mb-6 flex-wrap">
        {SCENARIOS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => { setScenarioIndex(i); setSelectedPath(null) }}
            className={`w-8 h-2 rounded-full transition-all duration-200 ${
              i === scenarioIndex
                ? 'bg-emerald-500'
                : i < scenarioIndex
                  ? 'bg-emerald-200 dark:bg-emerald-800'
                  : 'bg-stone-200 dark:bg-stone-700'
            }`}
            title={`Scenario ${s.id}: ${s.title}`}
          />
        ))}
      </div>

      {/* Scenario context */}
      <div className="mb-6 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/50 p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-black uppercase tracking-widest text-stone-400">Dilemma</span>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">{scenario.title}</span>
        </div>
        <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">{scenario.context}</p>
      </div>

      {/* Path selector */}
      <p className="text-xs font-black uppercase tracking-widest text-stone-400 mb-3">
        Choose your path
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <button
          onClick={() => setSelectedPath('action')}
          className={`p-3 rounded-lg border text-left transition-all ${
            selectedPath === 'action'
              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 shadow-sm'
              : 'border-stone-200 dark:border-stone-700 hover:border-emerald-300'
          }`}
        >
          <div className="text-sm font-bold text-stone-800 dark:text-stone-200">
            {scenario.actionPath.label}
          </div>
        </button>

        <button
          onClick={() => setSelectedPath('renunciation')}
          className={`p-3 rounded-lg border text-left transition-all ${
            selectedPath === 'renunciation'
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 shadow-sm'
              : 'border-stone-200 dark:border-stone-700 hover:border-indigo-300'
          }`}
        >
          <div className="text-sm font-bold text-stone-800 dark:text-stone-200">
            {scenario.renunciationPath.label}
          </div>
        </button>
      </div>

      {/* Paradox Resolution */}
      {pathData && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="rounded-xl bg-white dark:bg-stone-800 border border-stone-100 dark:border-stone-700 shadow-sm overflow-hidden">
            <div className={`p-4 border-b ${selectedPath === 'action' ? 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800/30' : 'bg-indigo-50/50 dark:bg-indigo-900/10 border-indigo-100 dark:border-indigo-800/30'}`}>
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h4 className="font-bold text-stone-800 dark:text-stone-100 mb-1">
                    Krishna's Guidance
                  </h4>
                  <p className="text-sm text-stone-600 dark:text-stone-300">
                    {pathData.guidance}
                  </p>
                </div>
                <div className={`text-xs font-mono px-2 py-1 rounded bg-white dark:bg-stone-900 border ${selectedPath === 'action' ? 'border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400' : 'border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-400'} whitespace-nowrap`}>
                  {pathData.gitaRef}
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-50 dark:bg-stone-900/30">
              <h4 className="text-xs font-black uppercase tracking-widest text-stone-400 mb-2">The Paradox Resolved</h4>
              <p className="text-sm font-medium text-stone-800 dark:text-stone-200 italic border-l-2 border-amber-400 pl-3">
                "{pathData.alignment}"
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            {scenarioIndex < SCENARIOS.length - 1 ? (
              <button
                onClick={() => { setScenarioIndex(prev => prev + 1); setSelectedPath(null) }}
                className="px-4 py-2 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 text-sm font-medium rounded-full hover:bg-stone-800 dark:hover:bg-white transition-colors"
              >
                Next Scenario →
              </button>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-sm font-bold rounded-full">
                <span>✨</span>
                Paradox Unified
              </div>
            )}
          </div>
        </div>
      )}
    </VedicAppTemplate>
  )
}
