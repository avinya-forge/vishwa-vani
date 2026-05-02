'use client'
import React, { useState } from 'react'
import VedicAppTemplate from './vedic-app-template'

type PathChoice = 'renounce' | 'act' | null

interface Paradox {
  id: number
  title: string
  scenario: string
  verse: string
  renounce: { teaching: string; gitaRef: string; insight: string }
  act: { teaching: string; gitaRef: string; insight: string }
  convergence: string
}

const PARADOXES: Paradox[] = [
  {
    id: 1,
    title: "The Surgeon's Dilemma",
    scenario: 'A surgeon must perform a difficult operation that will cause pain but save the patient. She fears causing harm. Should she withdraw from action or proceed with detachment?',
    verse: 'BG 5.1 — Arjuna asks: "Which is better — renunciation or yoga of action?"',
    renounce: {
      teaching: 'True renunciation is not physical withdrawal — it is release of the ego\'s claim on outcome. The surgeon who acts without craving for praise or fear of blame is already a renunciant.',
      gitaRef: 'BG 5.3',
      insight: 'Sannyasa means releasing the sense of doership — "I am the healer" — not abandoning the scalpel. Internal renunciation enables clear external action.',
    },
    act: {
      teaching: 'Perform your svadharma — your prescribed duty. A surgeon\'s duty is to heal. Inaction born of fear is not virtue; it abandons the patient. Act, but consecrate the action.',
      gitaRef: 'BG 3.8',
      insight: 'Karma Yoga: do the action fully, dedicate the result to the Divine. The surgeon\'s skill becomes an offering; attachment to success or failure dissolves.',
    },
    convergence: 'Both paths say: ACT. One by releasing the fruit, the other by consecrating the effort. The surgeon operates. The paradox was never about the scalpel.',
  },
  {
    id: 2,
    title: "The Reformer's Burden",
    scenario: 'A social reformer sees injustice in her community. Engagement means conflict, opposition, and moral compromise. Should she withdraw to a life of contemplation or stay and fight?',
    verse: 'BG 4.18 — "One who sees inaction in action and action in inaction is wise."',
    renounce: {
      teaching: 'Inner withdrawal — non-attachment to outcomes — is the only real renunciation. The reformer who fights without ego-investment transforms society without being corrupted by it.',
      gitaRef: 'BG 6.1',
      insight: 'True sanyasa is not retreat to a cave — it is engagement without craving. The reformer can act with the equanimity of a monk while living in the market.',
    },
    act: {
      teaching: 'When Dharma is threatened, withdrawal is adharma. Your natural gift for perceiving injustice is itself a cosmic call to action. Engage — but as an instrument, not a crusader.',
      gitaRef: 'BG 3.21',
      insight: 'Karma Yoga in the world: the reformer sets the example for others. "As the great ones act, so do the rest." Withdrawal removes a light the world needs.',
    },
    convergence: 'Both paths reject the ego\'s craving for victory. The reformer acts — but neither to be remembered as a hero nor to escape guilt. She acts because Dharma calls.',
  },
  {
    id: 3,
    title: "The Monk's Return",
    scenario: 'A man who left for a monastery to pursue Self-realization is now asked to return and lead his aging family\'s struggling business. Does renunciation permit him to step back into the world?',
    verse: 'BG 5.4 — "Only the ignorant speak of Sankhya and Yoga as different. The wise know one who is established in one reaches the result of both."',
    renounce: {
      teaching: 'True renunciation has no location. If the monk is genuinely established, the marketplace cannot disturb his realization. Returning is not regression — it tests the depth of his liberation.',
      gitaRef: 'BG 5.7',
      insight: 'The jivanmukta — liberated while living — acts freely in the world. Real Sannyasa is not defeated by a return to the family; it is expressed more fully there.',
    },
    act: {
      teaching: 'Family duty is Dharma. A renunciant who abandons his mother to destitution in the name of Self-realization has confused withdrawal with wisdom. Act with full presence.',
      gitaRef: 'BG 18.5',
      insight: 'Not even sanyasis can renounce action entirely — body, speech, and mind continue to act. The question is whether the action is free of ego, not whether it happens.',
    },
    convergence: 'The monk returns — but as a realized being, not a trapped one. He brings the peace of the monastery into the boardroom. Renunciation travels with him.',
  },
  {
    id: 4,
    title: "The Artisan's Pride",
    scenario: 'A gifted craftsman finds his work increasingly recognized and rewarded. He fears that success and worldly engagement will corrupt him. Should he renounce his craft or continue?',
    verse: 'BG 4.20 — "Abandoning attachment to the fruits of action, always satisfied and independent, he performs no action even while engaged in action."',
    renounce: {
      teaching: 'Renounce the fruit — the praise, the payment, the legacy — not the craft. Continue making, but dedicate every object to the Divine. Your workshop becomes a temple.',
      gitaRef: 'BG 4.24',
      insight: 'Brahmarpanam — offering every action as sacrifice. The artisan who sees Brahman in the materials, the tools, and the buyer transcends the transaction without leaving it.',
    },
    act: {
      teaching: 'Your craft is svadharma. To abandon it in fear of corruption is to act from weakness, not wisdom. Develop the skill of action untainted by attachment — that is the higher yoga.',
      gitaRef: 'BG 3.35',
      insight: 'It is better to do one\'s own duty imperfectly than another\'s duty perfectly. The artisan\'s duty is to create beautifully. Fleeing this duty is the real corruption.',
    },
    convergence: 'The artisan works — but measures success in neither gold nor fame. The pot is offered. The skill is an expression of the cosmic will, not an advertisement for the self.',
  },
  {
    id: 5,
    title: "The Parent's Release",
    scenario: 'A parent\'s last child has left home. She feels called to spiritual life but wonders if years of family engagement have made her unfit for it. Must she renounce the past to advance?',
    verse: 'BG 5.10 — "One who acts without attachment, surrendering actions to Brahman, is not tainted by sin, just as a lotus leaf is not wetted by water."',
    renounce: {
      teaching: 'Nothing to renounce — she already practiced Yoga for decades through selfless service. The years of family life, done with love and without ego-reward, were themselves Sannyasa.',
      gitaRef: 'BG 5.11',
      insight: 'The highest renunciation was already happening: caring without possessing, loving without binding. She has been a Karma Yogin the whole time without knowing the name.',
    },
    act: {
      teaching: 'The transition to contemplative life is not abandonment of the past but its fulfilment. Continue to act — now for the world at large, with the same devotion given to the family.',
      gitaRef: 'BG 12.10',
      insight: 'If she cannot yet meditate steadily, she can still dedicate all actions to the Divine — cooking, gardening, conversation — as before. The Yoga of action never closes.',
    },
    convergence: 'Both paths see her family years as training, not obstacles. She carries equanimity, not regret. The spiritual life she now enters was prepared by every selfless act that preceded it.',
  },
]

const PATH_CONFIG = {
  renounce: { label: 'Path of Renunciation', icon: '🪷', color: 'border-indigo-200 dark:border-indigo-800/50 bg-indigo-50 dark:bg-indigo-950/20', desc: 'Sannyasa, inner withdrawal, releasing doership' },
  act: { label: 'Path of Action', icon: '🔥', color: 'border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-950/20', desc: 'Karma Yoga, consecrated engagement, svadharma' },
}

export default function SanyasaParadoxResolver() {
  const [idx, setIdx] = useState(0)
  const [choice, setChoice] = useState<PathChoice>(null)
  const [showConvergence, setShowConvergence] = useState(false)

  const paradox = PARADOXES[idx]
  const response = choice ? paradox[choice] : null

  function next() { setIdx(i => Math.min(PARADOXES.length - 1, i + 1)); setChoice(null); setShowConvergence(false) }
  function prev() { setIdx(i => Math.max(0, i - 1)); setChoice(null); setShowConvergence(false) }

  return (
    <VedicAppTemplate
      title="Sanyasa Paradox Resolver"
      subtitle="Chapters 4 & 5 — Renunciation vs. Action reconciled"
      icon="🪷"
      footerNote="Bhagavad Gita Chapters 4–5 — Jnana-Karma Sannyasa Yoga"
    >
      {/* Progress */}
      <div className="flex gap-1.5 mb-6 flex-wrap">
        {PARADOXES.map((p, i) => (
          <button key={p.id} onClick={() => { setIdx(i); setChoice(null); setShowConvergence(false) }}
            className={`w-8 h-2 rounded-full transition-all duration-200 ${i === idx ? 'bg-indigo-500' : i < idx ? 'bg-indigo-200 dark:bg-indigo-800' : 'bg-stone-200 dark:bg-stone-700'}`}
            title={p.title}
          />
        ))}
      </div>

      {/* Scenario */}
      <div className="mb-5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/50 p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-black uppercase tracking-widest text-stone-400">Dilemma {paradox.id}</span>
          <span className="text-xs font-bold text-indigo-500 dark:text-indigo-400">{paradox.title}</span>
        </div>
        <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed mb-3">{paradox.scenario}</p>
        <p className="text-xs text-stone-400 dark:text-stone-500 italic">{paradox.verse}</p>
      </div>

      {/* Choice */}
      <p className="text-xs font-black uppercase tracking-widest text-stone-400 mb-3">Which path speaks to you?</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        {(['renounce', 'act'] as const).map(path => {
          const cfg = PATH_CONFIG[path]
          const active = choice === path
          return (
            <button key={path} onClick={() => { setChoice(path); setShowConvergence(false) }}
              className={`text-left p-4 rounded-xl border-2 transition-all duration-200 ${active ? cfg.color + ' scale-[1.02]' : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'}`}
            >
              <div className="text-xl mb-1">{cfg.icon}</div>
              <div className="text-sm font-bold text-stone-800 dark:text-stone-200">{cfg.label}</div>
              <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{cfg.desc}</div>
            </button>
          )
        })}
      </div>

      {/* Teaching */}
      {response && choice && (
        <div className={`rounded-xl border-2 p-5 mb-4 transition-all duration-300 ${PATH_CONFIG[choice].color}`}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{PATH_CONFIG[choice].icon}</span>
            <span className="text-xs font-black uppercase tracking-widest text-stone-500 dark:text-stone-400">Krishna teaches — {PATH_CONFIG[choice].label}</span>
          </div>
          <p className="text-sm text-stone-800 dark:text-stone-200 leading-relaxed mb-3">&ldquo;{response.teaching}&rdquo;</p>
          <div className="border-t border-stone-200 dark:border-stone-700 pt-3">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 mr-2">{response.gitaRef}</span>
            <p className="text-xs text-stone-500 dark:text-stone-400 italic mt-1">{response.insight}</p>
          </div>
          {!showConvergence && (
            <button onClick={() => setShowConvergence(true)}
              className="mt-4 text-xs font-black uppercase tracking-widest text-indigo-500 hover:text-indigo-600 transition-colors">
              Where do both paths meet? →
            </button>
          )}
        </div>
      )}

      {/* Convergence */}
      {showConvergence && (
        <div className="rounded-xl border-2 border-orange-200 dark:border-orange-800/50 bg-orange-50 dark:bg-orange-950/20 p-5">
          <div className="text-xs font-black uppercase tracking-widest text-orange-500 mb-2">The Paradox Resolved</div>
          <p className="text-sm text-stone-800 dark:text-stone-200 leading-relaxed">{paradox.convergence}</p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-6 pt-4 border-t border-stone-100 dark:border-stone-800">
        <button onClick={prev} disabled={idx === 0} className="text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-indigo-500 disabled:opacity-30 transition-colors">← Prev</button>
        <span className="text-xs text-stone-400">{idx + 1} / {PARADOXES.length}</span>
        <button onClick={next} disabled={idx === PARADOXES.length - 1} className="text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-indigo-500 disabled:opacity-30 transition-colors">Next →</button>
      </div>
    </VedicAppTemplate>
  )
}
