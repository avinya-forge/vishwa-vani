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
  { id: 'svadhyaya', name: 'Self-Study', sanskrit: 'Svādhyāyaḥ', type: 'daivi', description: "Regular inquiry into one's own nature through scripture, reflection, and meditation." },
  { id: 'tapas', name: 'Austerity', sanskrit: 'Tapaḥ', type: 'daivi', description: 'Disciplined effort sustained over time — training the body-mind through consistent practice.' },
  { id: 'ahimsa', name: 'Non-violence', sanskrit: 'Ahiṁsā', type: 'daivi', description: 'Harmlessness in thought, word, and action toward all beings.' },
  { id: 'satya', name: 'Truthfulness', sanskrit: 'Satyam', type: 'daivi', description: 'Speaking truth even when uncomfortable — alignment between thought, word, and action.' },
  { id: 'akrodha', name: 'Freedom from Anger', sanskrit: 'Akrodhaḥ', type: 'daivi', description: 'Responding to provocation with equanimity rather than reactive anger.' },
  { id: 'tyaga', name: 'Renunciation', sanskrit: 'Tyāgaḥ', type: 'daivi', description: 'Non-clinging to results, objects, and relationships — holding things lightly.' },
  { id: 'dambha', name: 'Hypocrisy', sanskrit: 'Dambhaḥ', type: 'asuri', description: 'Pretending to be what one is not — performing virtue for social approval rather than inner growth.' },
  { id: 'darpa', name: 'Arrogance', sanskrit: 'Darpaḥ', type: 'asuri', description: "Belief in one's superiority — dismissing others' perspectives and experience." },
  { id: 'abhimana', name: 'Conceit', sanskrit: 'Abhimānaḥ', type: 'asuri', description: 'Excessive pride in achievements, status, or identity — identifying with the ego-personality.' },
  { id: 'krodha', name: 'Anger', sanskrit: 'Krodhaḥ', type: 'asuri', description: "Reactive rage that clouds judgment — treating others as obstacles to one's desires." },
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

  const footerNote = "Gita 16.5: 'Divine qualities lead to liberation; demonic to bondage. Do not grieve — you are born to the divine heritage.'"

  if (showResults) {
    return (
      <VedicAppTemplate
        title="Qualities Assessment"
        subtitle="Gita Ch. 16 • Character"
        icon="✨"
        footerNote={footerNote}
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-[2rem] p-6">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-1">Daivi Strength</div>
                  <div className="text-3xl font-serif font-black text-green-600 leading-none">{daiviPct}%</div>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-stone-500">Divine Heritage</div>
              </div>
              <div className="h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${daiviPct}%` }} />
              </div>
              <p className="text-stone-600 dark:text-stone-400 text-xs mt-4 leading-relaxed font-medium italic">
                {daiviPct >= 70 ? 'Strong divine qualities. Consistent practice of these virtues deepens liberation.' :
                 daiviPct >= 50 ? 'Moderate divine foundation. Focus on the lower-scoring qualities for growth.' :
                 'Divine qualities need cultivation. Choose 2-3 to practice intentionally this month.'}
              </p>
            </div>

            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-[2rem] p-6 focus-within:border-red-500/30 transition-all">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-1">Asuri Presence</div>
                  <div className="text-3xl font-serif font-black text-red-600 leading-none">{asuriPct}%</div>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-stone-500">Ego Resistance</div>
              </div>
              <div className="h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full transition-all" style={{ width: `${asuriPct}%` }} />
              </div>
              <p className="text-stone-600 dark:text-stone-400 text-xs mt-4 leading-relaxed font-medium italic">
                {asuriPct <= 30 ? 'Low asuri tendencies. Maintain vigilance — these qualities can resurface under stress.' :
                 asuriPct <= 60 ? 'Moderate asuri tendencies present. Practice their opposites: dambha → satya, darpa → vinaya.' :
                 'High asuri tendencies. Gita 16.21 names desire, anger, and greed as the triple gate to hell.'}
              </p>
            </div>
          </div>
          
          <button onClick={() => { setShowResults(false); setRatings({}) }}
            className="w-full py-4 bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl">
            Restart Inquiry
          </button>
        </div>
      </VedicAppTemplate>
    )
  }

  return (
    <VedicAppTemplate
      title="Character Mirror"
      subtitle="Gita Ch. 16 • Character"
      icon="✨"
      footerNote={footerNote}
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-stone-500 mb-2">
          <span>Rate: 1 (Low) - 5 (High)</span>
          <span className="text-orange-600">{rated} / {total}</span>
        </div>

        <div className="flex gap-2 p-1.5 bg-stone-100 dark:bg-stone-800/50 rounded-2xl mb-4">
          <button onClick={() => setActiveTab('daivi')}
            className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${activeTab === 'daivi' ? 'bg-white dark:bg-stone-700 shadow-sm text-green-600' : 'text-stone-500'}`}>
            Daivi Qualities
          </button>
          <button onClick={() => setActiveTab('asuri')}
            className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${activeTab === 'asuri' ? 'bg-white dark:bg-stone-700 shadow-sm text-red-600' : 'text-stone-500'}`}>
            Asuri Tendencies
          </button>
        </div>

        <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
          {displayed.map(q => (
            <div key={q.id} className="bg-white dark:bg-stone-900/40 p-4 rounded-2xl border border-stone-100 dark:border-stone-800 group hover:border-orange-500/20 transition-all">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-xs font-black text-stone-900 dark:text-white uppercase tracking-tight">{q.name}</h4>
                  <p className="text-[10px] font-medium text-stone-400 italic mb-2">{q.sanskrit}</p>
                </div>
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 mb-4 leading-relaxed font-medium">{q.description}</p>
              <div className="flex gap-1.5">
                {[1,2,3,4,5].map(v => (
                  <button key={v} onClick={() => setRating(q.id, v)}
                    className={`flex-1 h-8 rounded-xl text-xs font-black transition-all ${
                      ratings[q.id] === v ? (q.type === 'daivi' ? 'bg-green-600 text-white shadow-lg shadow-green-600/20' : 'bg-red-600 text-white shadow-lg shadow-red-600/20') : 'bg-stone-50 dark:bg-stone-800 text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700'
                    }`}>{v}</button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {rated >= 6 && (
          <button onClick={() => setShowResults(true)}
            className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-orange-600/20 mt-4">
            See Reflection
          </button>
        )}
      </div>
    </VedicAppTemplate>
  )
}
