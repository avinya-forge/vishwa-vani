'use client'
import React, { useState } from 'react'
import VedicAppTemplate from './vedic-app-template'

type AxisKey = 'devotion-knowledge' | 'transcendence-immanence' | 'discipline-grace' | 'metaphysics-praxis' | 'language'

interface Comparison {
  id: string
  verseRef: string
  verseLabel: string
  topic: string
  iskcon: string
  dnyaneshwar: string
  axis: AxisKey
  divergence: string
}

interface AxisMeta { key: AxisKey; label: string; iskconPole: string; dnyaneshwarPole: string }

const AXES: AxisMeta[] = [
  { key: 'devotion-knowledge', label: 'Devotion vs Knowledge', iskconPole: 'Bhakti as supreme', dnyaneshwarPole: 'Jñāna ripens into bhakti' },
  { key: 'transcendence-immanence', label: 'Transcendence vs Immanence', iskconPole: 'Krishna as transcendent Person', dnyaneshwarPole: 'Krishna as immanent Self' },
  { key: 'discipline-grace', label: 'Discipline vs Grace', iskconPole: 'Strict sādhana — chanting, regulation', dnyaneshwarPole: 'Grace flows through guru-paramparā' },
  { key: 'metaphysics-praxis', label: 'Metaphysics vs Praxis', iskconPole: 'Sānkhya categories explicit', dnyaneshwarPole: 'Praxis-first; metaphysics in metaphor' },
  { key: 'language', label: 'Language Register', iskconPole: 'Prose, didactic, English-medium', dnyaneshwarPole: 'Marathi ovi — poetic, vernacular' },
]

const COMPARISONS: Comparison[] = [
  {
    id: 'bg-2-47',
    verseRef: 'BG 2.47',
    verseLabel: 'Karmaṇy-evādhikāras te',
    topic: 'Right to action, not fruit',
    axis: 'metaphysics-praxis',
    iskcon: 'Prabhupāda frames the verse as a strict prohibition: one is entitled to prescribed duty, but never to its fruits. He inserts the doctrinal warning — never act for results, never be attached to inaction — as a four-clause rule. The purport directs the disciple toward Krishna consciousness as the only safe shelter from karmic bondage.',
    dnyaneshwar: 'Sant Dnyāneshwar opens this teaching as a poet would open a flower. The ovī invites the seeker to recognise that the doer-feeling itself is the real bondage; releasing the self-as-doer dissolves the question of fruit altogether. The Marathi cadence carries the verse as a song of liberation rather than a directive.',
    divergence: 'ISKCON: prohibitive, regulatory. Dnyāneshwar: invitational, dissolving the doer.',
  },
  {
    id: 'bg-4-7',
    verseRef: 'BG 4.7',
    verseLabel: 'Yadā yadā hi dharmasya',
    topic: 'Divine descent (avatāra)',
    axis: 'transcendence-immanence',
    iskcon: 'Prabhupāda treats avatāra as a literal historical event — the original transcendent Personality of Godhead descends in identifiable forms (Rāma, Krishna, Caitanya). The purport defends the descent as bodily, eternal, and perceivable, against impersonalist re-readings.',
    dnyaneshwar: 'Dnyāneshwar reads avatāra as the recurrent inner uprising of dharma in the soul that has become receptive. The Lord descends "wherever the inner Kurukshetra is set" — every age renews this descent in the awakened heart. Outer history is the visible echo of an inner movement.',
    divergence: 'ISKCON: literal, historical descent. Dnyāneshwar: archetypal, inner descent renewed in every seeker.',
  },
  {
    id: 'bg-7-19',
    verseRef: 'BG 7.19',
    verseLabel: 'Bahūnāṁ janmanām ante',
    topic: 'Surrender after many lives',
    axis: 'devotion-knowledge',
    iskcon: 'Prabhupāda underscores that surrender (vāsudevaḥ sarvam iti) is the rare fruit of many lives. He emphasises that a true mahātmā chants and serves Krishna directly — devotional submission alone fulfils jñāna, never the reverse.',
    dnyaneshwar: 'Dnyāneshwar reads the same verse as the natural ripening of jñāna into bhakti. Knowledge that has matured can only fall at the feet of Vāsudeva — not as defeat but as fulfilment. The two paths converge here in the devotee whose understanding has become love.',
    divergence: 'ISKCON: bhakti precedes and fulfils jñāna. Dnyāneshwar: jñāna ripens into bhakti — both paths meet at the same flower.',
  },
  {
    id: 'bg-9-22',
    verseRef: 'BG 9.22',
    verseLabel: 'Ananyāś cintayanto mām',
    topic: 'The Lord carries what the devotee lacks',
    axis: 'discipline-grace',
    iskcon: 'Prabhupāda anchors the verse in regulative service: a devotee who is fully Krishna-conscious through prescribed sādhana receives Krishna\'s yoga-kṣema. The implication is that the discipline itself qualifies one for this carrying-grace — the structure must be in place.',
    dnyaneshwar: 'Dnyāneshwar narrates this as the mother\'s lap. Grace flows not because the seeker has earned it through discipline but because the seeker has nowhere else to turn. The carrying is causeless — it is the Lord\'s nature, not the devotee\'s achievement.',
    divergence: 'ISKCON: grace through structured sādhana. Dnyāneshwar: grace as causeless maternal protection.',
  },
  {
    id: 'bg-12-12',
    verseRef: 'BG 12.12',
    verseLabel: 'Śreyo hi jñānam abhyāsāt',
    topic: 'Hierarchy of practices',
    axis: 'devotion-knowledge',
    iskcon: 'Prabhupāda reads the gradation strictly: practice → knowledge → meditation → renunciation of fruits — and bhakti above all. The purport repeats that without devotional service, even meditation and knowledge remain incomplete shelters.',
    dnyaneshwar: 'Dnyāneshwar treats the hierarchy as a single ladder of inner ripening, each rung honoured. The renunciation of fruits, when sincere, is itself the doorway to the peace that bhakti consummates. The four steps are not rivals; they are a continuous breath.',
    divergence: 'ISKCON: devotion as the apex above other paths. Dnyāneshwar: continuum of ripening — each rung as preparation for the next.',
  },
  {
    id: 'bg-15-7',
    verseRef: 'BG 15.7',
    verseLabel: 'Mamaivāṁśo jīva-loke',
    topic: 'The jīva as fragment of the Lord',
    axis: 'transcendence-immanence',
    iskcon: 'Prabhupāda preserves the eternal qualitative oneness and quantitative difference: the jīva is forever a part — never the whole, never quantitatively equal — of the Supreme Person. The purport guards the verse against advaitic monism.',
    dnyaneshwar: 'Dnyāneshwar reads the verse with non-dual ease. The fragment is the wave on the ocean — distinct in form, identical in substance. Liberation is the wave\'s recognition that it has never been outside the sea.',
    divergence: 'ISKCON: ontological distinction (acintya-bhedābheda, asymmetric). Dnyāneshwar: substantial identity (advaita-leaning, wave-and-ocean).',
  },
  {
    id: 'bg-18-66',
    verseRef: 'BG 18.66',
    verseLabel: 'Sarva-dharmān parityajya',
    topic: 'The supreme verse — total surrender',
    axis: 'discipline-grace',
    iskcon: 'Prabhupāda reads carama-śloka as Krishna\'s final, unambiguous instruction: abandon every prescribed dharma and surrender exclusively to Him. The purport insists this is a literal command, not a metaphor; the disciple must take refuge through the bonafide guru-paramparā.',
    dnyaneshwar: 'Dnyāneshwar pours this verse out as a final benediction in long, melodic ovīs. To abandon all dharmas is to release every "I-am-the-doer" claim. The seeker does not perform surrender as an act; surrender happens when the false self lets go. The verse is a song of dissolution, not a directive.',
    divergence: 'ISKCON: carama-śloka as the final imperative. Dnyāneshwar: carama-śloka as the final dissolution of the doer.',
  },
]

export default function CommentaryComparisonTool() {
  const [selectedId, setSelectedId] = useState<string>(COMPARISONS[0].id)
  const [filterAxis, setFilterAxis] = useState<AxisKey | 'all'>('all')
  const visible = filterAxis === 'all' ? COMPARISONS : COMPARISONS.filter(c => c.axis === filterAxis)
  const selected = visible.find(c => c.id === selectedId) ?? visible[0]
  const axisMeta = AXES.find(a => a.key === selected?.axis)

  return (
    <VedicAppTemplate
      title="Commentary Comparison Tool"
      subtitle="ISKCON · Prabhupāda  ⇄  Sant Dnyāneshwar"
      icon="⚖️"
      footerNote="All chapters — philosophical divergence between two living lineages."
    >
      <p className="text-xs text-stone-500 dark:text-stone-400 mb-4 leading-relaxed">
        Side-by-side reading of the same verse through two lineages. Filter by philosophical axis to see where the schools converge and where they part.
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        <button
          onClick={() => setFilterAxis('all')}
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
            filterAxis === 'all'
              ? 'bg-orange-600 text-white'
              : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
          }`}
        >All Axes</button>
        {AXES.map(a => (
          <button
            key={a.key}
            onClick={() => setFilterAxis(a.key)}
            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
              filterAxis === a.key
                ? 'bg-orange-600 text-white'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >{a.label}</button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-4">
        {visible.map(c => (
          <button
            key={c.id}
            onClick={() => setSelectedId(c.id)}
            className={`p-2 rounded-lg border text-left transition-all ${
              selected?.id === c.id
                ? 'border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-950/20'
                : 'border-stone-200 dark:border-stone-700 hover:border-orange-200 dark:hover:border-orange-800'
            }`}
          >
            <div className="text-[10px] font-black text-amber-600 dark:text-amber-500">{c.verseRef}</div>
            <div className="text-[10px] text-stone-600 dark:text-stone-400 leading-tight italic mt-0.5">{c.topic}</div>
          </button>
        ))}
      </div>

      {selected && (
        <div className="space-y-3">
          <div className="rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/40 p-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">Verse</p>
            <p className="text-sm font-serif text-stone-800 dark:text-stone-200">{selected.verseRef} — <span className="italic">{selected.verseLabel}</span></p>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{selected.topic}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-xl border border-indigo-200 dark:border-indigo-800/40 bg-indigo-50 dark:bg-indigo-950/20 p-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-1">ISKCON · Prabhupāda</p>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">{selected.iskcon}</p>
            </div>
            <div className="rounded-xl border border-amber-200 dark:border-amber-800/40 bg-amber-50 dark:bg-amber-950/20 p-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-1">Sant Dnyāneshwar</p>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">{selected.dnyaneshwar}</p>
            </div>
          </div>

          {axisMeta && (
            <div className="rounded-xl border-2 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20 p-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-1">{axisMeta.label}</p>
              <div className="grid grid-cols-2 gap-2 text-[10px] text-stone-600 dark:text-stone-400 mb-2">
                <div><span className="font-bold text-indigo-600 dark:text-indigo-400">ISKCON pole:</span> {axisMeta.iskconPole}</div>
                <div><span className="font-bold text-amber-600 dark:text-amber-400">Dnyāneshwar pole:</span> {axisMeta.dnyaneshwarPole}</div>
              </div>
              <p className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed">{selected.divergence}</p>
            </div>
          )}
        </div>
      )}
    </VedicAppTemplate>
  )
}
