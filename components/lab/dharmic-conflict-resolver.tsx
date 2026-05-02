'use client'
import React, { useState } from 'react'
import VedicAppTemplate from './vedic-app-template'

interface ConflictType {
  id: string
  label: string
  icon: string
  dilemma: string
  dharmic_analysis: string
  krishnas_principle: string
  verses: { ref: string; teaching: string }[]
  resolution: string
}

const CONFLICTS: ConflictType[] = [
  {
    id: 'career-duty',
    label: 'Career vs. Inner Calling',
    icon: '⚖️',
    dilemma: 'A stable, well-paying job conflicts with a creative or service-oriented calling that feels true but uncertain. Choosing the calling risks financial security and family stability.',
    dharmic_analysis: 'The Gita distinguishes between svadharma (one\'s own duty, aligned with one\'s nature) and paradharma (another\'s duty, however noble). A life lived against one\'s nature generates the specific suffering of unfulfilled potential.',
    krishnas_principle: '"Better is one\'s own dharma, though imperfectly performed, than the dharma of another well performed." — BG 3.35. The risk of following svadharma is always less, says Krishna, than the spiritual cost of abandoning it.',
    verses: [
      { ref: 'BG 3.35', teaching: 'Svadharma, even imperfect, is superior to another\'s duty performed to perfection.' },
      { ref: 'BG 18.45', teaching: 'By worshipping the source through one\'s own work, a person attains perfection.' },
      { ref: 'BG 4.18', teaching: 'The wise see action in inaction — inaction (staying unfulfilled) can be the greater action-trap.' },
    ],
    resolution: 'The Gita\'s framework: Can you pursue the calling while performing current duties without resentment? If yes, the transition happens through Karma Yoga — neither forcing nor abandoning, but acting with clarity and releasing attachment to outcome.',
  },
  {
    id: 'honesty-mercy',
    label: 'Honesty vs. Compassion',
    icon: '🗣️',
    dilemma: 'A painful truth would help someone grow but might devastate them in their current fragile state. Silence protects them now but may harm them later. Which is the more loving act?',
    dharmic_analysis: 'The Gita addresses this through the concept of "speech that does not cause distress" (BG 17.15). Truth is a virtue, but truth weaponized or delivered without regard for readiness is not ahimsa — it is violence dressed as honesty.',
    krishnas_principle: '"Austerity of speech: speaking truth, kindly, without causing distress, and also reading scripture regularly." — BG 17.15. All four conditions must be met simultaneously, not traded off.',
    verses: [
      { ref: 'BG 17.15', teaching: 'Speech that is truthful, pleasant, beneficial, and not agitating — this is verbal austerity.' },
      { ref: 'BG 16.2', teaching: 'Non-violence, truthfulness, absence of anger — these are divine qualities together, not in opposition.' },
      { ref: 'BG 2.38', teaching: 'Act with equanimity — neither pleasure nor pain in the result. The compassionate act is free of self-congratulation.' },
    ],
    resolution: 'The Gita resolution: timing and form matter. Truth spoken at the wrong moment, in the wrong form, by someone unable to sit with the person\'s response is not yet complete compassion. Wait, prepare the ground, then speak — fully present to the aftermath.',
  },
  {
    id: 'family-world',
    label: 'Family Duty vs. Larger Calling',
    icon: '🏠',
    dilemma: 'Deep involvement in a cause — social, creative, spiritual — conflicts with family expectations of presence, time, and a conventional life path. Both feel real and valid.',
    dharmic_analysis: 'Arjuna\'s exact crisis at Kurukshetra — he cannot reconcile family love with the larger Dharmic call. Krishna does not dismiss either. He addresses both seriously before revealing the deeper resolution.',
    krishnas_principle: '"Abandoning all varieties of dharmas, take refuge in Me alone." — BG 18.66. The apparent conflict between duties resolves when both are performed as offerings rather than as competing ego-claims.',
    verses: [
      { ref: 'BG 18.66', teaching: 'Surrender all forms of dharma to Me — then both can be held without the self being torn between them.' },
      { ref: 'BG 3.30', teaching: 'Dedicating all actions to Me, with full knowledge, free from desire and grief, fight.' },
      { ref: 'BG 6.1', teaching: 'One who performs prescribed duty without depending on fruit is both a sannyasi and a yogi.' },
    ],
    resolution: 'The Gita resolution: the tension exists because both duties are held as personal territory. When both family service and larger calling become offerings — neither possessing nor abandoning — the ego\'s war between them subsides. Act from love, not from proving.',
  },
  {
    id: 'justice-peace',
    label: 'Justice vs. Non-Confrontation',
    icon: '⚡',
    dilemma: 'Witnessing ongoing injustice — in the workplace, community, or world — creates a conflict between speaking out (which disrupts peace and carries personal cost) and remaining silent (which preserves comfort but allows harm).',
    dharmic_analysis: 'This is Arjuna\'s dilemma writ small. Krishna does not counsel peace at any cost — he explicitly says that inaction in the face of adharma is itself adharma. But he also cautions against action driven by anger, which perpetuates cycles of harm.',
    krishnas_principle: '"When unrighteousness prevails, O Arjuna, I manifest Myself." — BG 4.7. The call to protect dharma is not optional. What is optional is the ego\'s insistence on being the hero of the protection.',
    verses: [
      { ref: 'BG 4.7–8', teaching: 'When dharma declines, the Divine manifests to protect the righteous, punish the wicked, and reestablish virtue.' },
      { ref: 'BG 3.21', teaching: 'As the great ones act, so do the rest. A leader\'s silence becomes the community\'s permission.' },
      { ref: 'BG 16.3', teaching: 'Fearlessness, purity, steadfastness — these are divine qualities. Silence born of fear is not peace.' },
    ],
    resolution: 'Gita framework: speak — but without hatred, without ego-investment in being the one who spoke, and without attachment to the outcome of speaking. Confront not to win but to witness truth. This is the warrior\'s way in a civilian context.',
  },
  {
    id: 'self-others',
    label: 'Self-Development vs. Service',
    icon: '🌱',
    dilemma: 'Time and energy spent on personal development (meditation, learning, inner work) feels selfish when so many needs exist in the world. Yet neglecting the inner life leads to burnout in service.',
    dharmic_analysis: 'Krishna addresses this directly with the concept of yoga in action: the person who has developed inner stability serves more sustainably and more purely than one who gives from depletion. The Gita does not dichotomize inner and outer work.',
    krishnas_principle: '"Be a Yogi, Arjuna." — BG 6.46. The yogi is not the one who retreats but the one who acts from a stable inner ground. The two practices are not in competition — one enables the other.',
    verses: [
      { ref: 'BG 6.46', teaching: 'A yogi is greater than an ascetic, greater than a man of knowledge, greater than one engaged in ritual — be a yogi.' },
      { ref: 'BG 6.35', teaching: 'The mind is restless and difficult to subdue, but it can be brought under control by constant practice and detachment.' },
      { ref: 'BG 5.7', teaching: 'One who is purified by yoga, who has conquered the mind, who has subdued the senses — such a person becomes dear to all.' },
    ],
    resolution: 'Inner work is not the opposite of service — it is its preparation and its source. The question is not "inner or outer?" but "am I bringing sufficient inner depth to the service I am offering?" Even fifteen minutes of daily practice changes the quality of every subsequent action.',
  },
  {
    id: 'tradition-conscience',
    label: 'Tradition vs. Personal Conscience',
    icon: '🏛️',
    dilemma: 'Cultural, religious, or family traditions demand one path; personal moral intuition or honest inquiry points to another. Respecting one feels like betraying the other.',
    dharmic_analysis: 'The Gita navigates this with particular sophistication. Krishna himself subverts conventions — the charioteer is the teacher; the warrior is taught non-violence; the sacrificial tradition is internalized. Yet he also upholds the value of lineage knowledge (BG 4.1–3).',
    krishnas_principle: '"Act as the scriptures and great ones teach — but more than that, understand why they teach it." — BG 16.24. Tradition is a vessel; conscience discerns whether the vessel is being held upright.',
    verses: [
      { ref: 'BG 4.1–3', teaching: 'This yoga was taught by the Sun to Manu to Ikshvaku — lineage knowledge is real. But it becomes corrupted over time and must be restored.' },
      { ref: 'BG 16.24', teaching: 'Let scripture be your authority in determining what to do and what not to do. Understand and then act.' },
      { ref: 'BG 18.63', teaching: 'I have declared the most confidential knowledge to you. Now deliberate on this fully, and then do as you wish.' },
    ],
    resolution: 'Krishna gives Arjuna the full teaching — then says: deliberate and choose. The Gita does not demand blind compliance even with itself. Tradition that survives genuine questioning becomes stronger; conscience that has listened deeply to tradition becomes wiser.',
  },
]

export default function DharmicConflictResolver() {
  const [selected, setSelected] = useState<string | null>(null)
  const [showVerses, setShowVerses] = useState(false)
  const conflict = CONFLICTS.find(c => c.id === selected)

  return (
    <VedicAppTemplate
      title="Dharmic Conflict Resolver"
      subtitle="Chapters 2, 4, 16 & 18 — Modern dilemmas, Gita framework"
      icon="⚖️"
      footerNote="Bhagavad Gita — Karma, Dharma, and the Ethics of Action"
    >
      <p className="text-xs text-stone-500 dark:text-stone-400 mb-4 leading-relaxed">Select the conflict closest to your current situation.</p>

      {/* Conflict type grid */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        {CONFLICTS.map(c => (
          <button
            key={c.id}
            onClick={() => { setSelected(c.id === selected ? null : c.id); setShowVerses(false) }}
            className={`text-left p-3 rounded-xl border-2 transition-all duration-200 ${
              selected === c.id
                ? 'border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-950/20 scale-[1.02]'
                : 'border-stone-200 dark:border-stone-700 hover:border-orange-200 dark:hover:border-orange-800'
            }`}
          >
            <div className="text-xl mb-1">{c.icon}</div>
            <div className="text-xs font-bold text-stone-800 dark:text-stone-200 leading-tight">{c.label}</div>
          </button>
        ))}
      </div>

      {/* Analysis */}
      {conflict && (
        <div className="space-y-4">
          <div className="rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/40 p-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">The Dilemma</p>
            <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">{conflict.dilemma}</p>
          </div>

          <div className="rounded-xl border border-indigo-200 dark:border-indigo-800/40 bg-indigo-50 dark:bg-indigo-950/20 p-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-2">Dharmic Analysis</p>
            <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">{conflict.dharmic_analysis}</p>
          </div>

          <div className="rounded-xl border border-amber-200 dark:border-amber-800/40 bg-amber-50 dark:bg-amber-950/20 p-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-2">Krishna's Principle</p>
            <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed italic">{conflict.krishnas_principle}</p>
          </div>

          {!showVerses ? (
            <button onClick={() => setShowVerses(true)}
              className="text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-orange-500 transition-colors">
              Show Relevant Verses →
            </button>
          ) : (
            <div className="space-y-2">
              {conflict.verses.map(v => (
                <div key={v.ref} className="flex gap-3 p-3 rounded-xl border border-stone-200 dark:border-stone-700">
                  <span className="text-xs font-black text-amber-500 dark:text-amber-400 flex-shrink-0 w-14">{v.ref}</span>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">{v.teaching}</p>
                </div>
              ))}
            </div>
          )}

          <div className="rounded-xl border-2 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20 p-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-2">Gita Resolution</p>
            <p className="text-sm text-stone-800 dark:text-stone-200 leading-relaxed">{conflict.resolution}</p>
          </div>
        </div>
      )}
    </VedicAppTemplate>
  )
}
