'use client'

import React, { useState } from 'react'
import VedicAppTemplate from './vedic-app-template'

interface Quality {
  id: string
  name: string
  sanskrit: string
  type: 'daivi' | 'asuri'
  description: string
}

const QUALITIES: Quality[] = [
  { id: 'abhaya', name: 'Fearlessness', sanskrit: 'Abhayam', type: 'daivi', description: 'Freedom from fear in all circumstances — neither fear of failure nor of what others think.' },
  { id: 'sattva', name: 'Purity of Being', sanskrit: 'Sattva-saṁśuddhi', type: 'daivi', description: 'Purity of mind, body, and intention — consistency between inner state and outer conduct.' },
  { id: 'jnana', name: 'Knowledge-Yoga', sanskrit: 'Jñāna-yoga-vyavasthiti', type: 'daivi', description: 'Steadfastness in the path of self-knowledge; applying wisdom in daily life.' },
  { id: 'dana', name: 'Generosity', sanskrit: 'Dānam', type: 'daivi', description: 'Giving without expectation of return — of time, resources, knowledge, and service.' },
  { id: 'dama', name: 'Self-Control', sanskrit: 'Damaḥ', type: 'daivi', description: 'Mastery of the senses — acting with intention rather than reactive impulse.' },
  { id: 'yajna', name: 'Sacrifice', sanskrit: 'Yajñaḥ', type: 'daivi', description: 'Willingness to give up something for a higher purpose — ego, comfort, recognition.' },
  { id: 'svadhyaya', name: 'Self-Study', sanskrit: 'Svādhyāyaḥ', type: 'daivi', description: 'Regular inquiry into one\'s own nature through scripture, reflection, and meditation.' },
  { id: 'tapas', name: 'Austerity', sanskrit: 'Tapaḥ', type: 'daivi', description: 'Disciplined effort sustained over time — training the body-mind through consistent practice.' },
  { id: 'ahimsa', name: 'Non-violence', sanskrit: 'Ahiṁsā', type: 'daivi', description: 'Harmlessness in thought, word, and action toward all beings.' },
  { id: 'satya', name: 'Truthfulness', sanskrit: 'Satyam', type: 'daivi', description: 'Speaking truth even when uncomfortable — alignment between thought, word, and action.' },
  { id: 'akrodha', name: 'Freedom from Anger', sanskrit: 'Akrodhaḥ', type: 'daivi', description: 'Responding to provocation with equanimity rather than reactive anger.' },
  { id: 'tyaga', name: 'Renunciation', sanskrit: 'Tyāgaḥ', type: 'daivi', description: 'Non-clinging to results, objects, and relationships — holding things lightly.' },
  { id: 'dambha', name: 'Hypocrisy', sanskrit: 'Dambhaḥ', type: 'asuri', description: 'Pretending to be what one is not — performing virtue for social approval rather than inner growth.' },
  { id: 'darpa', name: 'Arrogance', sanskrit: 'Darpaḥ', type: 'asuri', description: 'Belief in one\'s superiority — dismissing others\' perspectives and experience.' },
  { id: 'abhimana', name: 'Conceit', sanskrit: 'Abhimānaḥ', type: 'asuri', description: 'Excessive pride in achievements, status, or identity — identifying with the ego-personality.' },
  { id: 'krodha', name: 'Anger', sanskrit: 'Krodhaḥ', type: 'asuri', description: 'Reactive rage that clouds judgment — treating others as obstacles to one\'s desires.' },
]

export default function DivineQualitiesAssessment() {
  const [ratings, setRatings] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [activeTab, setActiveTab] = useState<'daivi' | 'asuri'>('daivi')

  const daivi = QUALITIES.filter(q => q.type === 'daivi')
  const asuri = QUALITIES.filter(q => q.type === 'asuri')
  const displayed = activeTab === 'daivi' ? daivi : asuri

  const rated = Object.keys(ratings).length
  const total = QUALITIES.length

  const daiviScore = daivi.reduce((sum, q) => sum + (ratings[q.id] ?? 0), 0)
  const asuriScore = asuri.reduce((sum, q) => sum + (ratings[q.id] ?? 0), 0)
  const daiviMax = daivi.length * 5
  const asuriMax = asuri.length * 5
  const daiviPct = Math.round((daiviScore / daiviMax) * 100)
  const asuriPct = Math.round((asuriScore / asuriMax) * 100)

  const setRating = (id: string, val: number) => setRatings(r => ({ ...r, [id]: val }))

  if (showResults) {
    return (
      <VedicAppTemplate
        title="Qualities Assessment"
        subtitle="Gita Ch. 16 • Daivi & Asuri Qualities"
        icon="✨"
        darkMode={true}
        footerNote="Gita 16.5: 'Divine qualities lead to liberation; demonic to bondage. Do not grieve — you are born to the divine heritage.'"
      >
        <div className="space-y-6">
          <h3 className="text-xl font-serif font-black text-white text-center">Your Reflection</h3>
          <div className="space-y-4">
            <div className="bg-green-900/20 border border-green-700 rounded-xl p-4">
              <div className="flex justify-between mb-2">
                <span className="text-green-300 font-bold">Daivi Qualities</span>
                <span className="text-green-400 font-black">{daiviPct}%</span>
              </div>
              <div className="h-2 bg-stone-800 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${daiviPct}%` }} />
              </div>
              <p className="text-stone-300 text-xs mt-2">
                {daiviPct >= 70 ? 'Strong divine qualities. Consistent practice of these virtues deepens liberation.' :
                 daiviPct >= 50 ? 'Moderate divine foundation. Focus on the lower-scoring qualities for growth.' :
                 'Divine qualities need cultivation. Choose 2-3 to practice intentionally this month.'}
              </p>
            </div>
            <div className="bg-red-900/20 border border-red-700 rounded-xl p-4">
              <div className="flex justify-between mb-2">
                <span className="text-red-300 font-bold">Asuri Tendencies</span>
                <span className="text-red-400 font-black">{asuriPct}%</span>
              </div>
              <div className="h-2 bg-stone-800 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full transition-all" style={{ width: `${asuriPct}%` }} />
              </div>
              <p className="text-stone-300 text-xs mt-2">
                {asuriPct <= 30 ? 'Low asuri tendencies. Maintain vigilance — these qualities can resurface under stress.' :
                 asuriPct <= 60 ? 'Moderate asuri tendencies present. Practice their opposites: dambha → satya, darpa → vinaya.' :
                 'High asuri tendencies. Gita 16.21 names desire, anger, and greed as the triple gate to hell. Prioritize their transformation.'}
              </p>
            </div>
          </div>
          <div className="bg-stone-800/40 p-4 rounded-xl text-stone-300 text-sm">
            <p className="font-bold text-white mb-1">Gita 16.5 Teaching:</p>
            <p>These qualities are not fixed identity — they are tendencies of the Kshetra (field). The Kshetrajna (witness-Self) is neither daivi nor asuri. Self-knowledge dissolves both.</p>
          </div>
          <button onClick={() => { setShowResults(false); setRatings({}) }}
            className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-all">
            Reassess
          </button>
        </div>
      </VedicAppTemplate>
    )
  }

  return (
    <VedicAppTemplate
      title="Divine Qualities Assessment"
      subtitle="Gita Ch. 16 • Daivi & Asuri Qualities"
      icon="✨"
      darkMode={true}
      footerNote="Gita 16.3: 'Fearlessness, purity, firmness in knowledge-yoga, generosity, self-control — these are the divine qualities.'"
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-stone-400 text-xs">Rate yourself 1-5 on each quality</p>
          <span className="text-stone-500 text-xs">{rated}/{total} rated</span>
        </div>

        <div className="flex gap-2 p-1 bg-stone-800/50 rounded-xl">
          <button onClick={() => setActiveTab('daivi')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'daivi' ? 'bg-green-700 text-white' : 'text-stone-400'}`}>
            Daivi ({daivi.length})
          </button>
          <button onClick={() => setActiveTab('asuri')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'asuri' ? 'bg-red-700 text-white' : 'text-stone-400'}`}>
            Asuri ({asuri.length})
          </button>
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {displayed.map(q => (
            <div key={q.id} className="bg-stone-800/30 p-3 rounded-xl border border-stone-700">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <span className="text-white font-bold text-sm">{q.name}</span>
                  <span className="text-stone-500 text-xs ml-2">{q.sanskrit}</span>
                </div>
              </div>
              <p className="text-stone-400 text-xs mb-2 leading-relaxed">{q.description}</p>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(v => (
                  <button key={v} onClick={() => setRating(q.id, v)}
                    className={`flex-1 h-6 rounded text-xs font-bold transition-all ${
                      ratings[q.id] === v ? (q.type === 'daivi' ? 'bg-green-600 text-white' : 'bg-red-600 text-white') : 'bg-stone-700 text-stone-400 hover:bg-stone-600'
                    }`}>{v}</button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {rated >= 8 && (
          <button onClick={() => setShowResults(true)}
            className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-all">
            See My Reflection →
          </button>
        )}
      </div>
    </VedicAppTemplate>
  )
}
