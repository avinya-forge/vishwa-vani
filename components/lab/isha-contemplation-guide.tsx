'use client'
import React, { useState } from 'react'
import VedicAppTemplate from './vedic-app-template'

interface VerseEntry {
  num: number
  sanskrit: string
  transliteration: string
  meaning: string
  theme: string
  contemplation: string
}

const ISHA_VERSES: VerseEntry[] = [
  {
    num: 0,
    sanskrit: 'ॐ पूर्णमदः पूर्णमिदम्',
    transliteration: 'Oṃ pūrṇam adaḥ pūrṇam idam',
    meaning: 'That is whole, this is whole. From the whole, the whole becomes manifest.',
    theme: 'Wholeness — Pūrṇatā',
    contemplation: 'Sit quietly. Breathe in: "That is whole." Breathe out: "This is whole." Hold this paradox gently — nothing is missing, nothing can be added.',
  },
  {
    num: 1,
    sanskrit: 'ईशावास्यमिदँ सर्वम्',
    transliteration: 'Īśāvāsyam idaṃ sarvam',
    meaning: 'All this — whatever moves in this world — is to be pervaded by the Lord.',
    theme: 'Divine Pervasion — Īśāvāsya',
    contemplation: 'Look at your surroundings. Can you sense the Divine in every object, every movement? Enjoy each experience without grasping — renounce the compulsion to possess.',
  },
  {
    num: 2,
    sanskrit: 'कुर्वन्नेवेह कर्माणि जिजीविषेच्छतं समाः',
    transliteration: 'Kurvan neveha karmāṇi jijīviṣec chataṃ samāḥ',
    meaning: 'Doing karma here, one should wish to live a hundred years. Thus it is right for you.',
    theme: 'Action Without Bondage — Karma Yoga',
    contemplation: 'Recall a recent action you took. Could you have done it without attachment to the result? Karma does not bind when done as an offering to the whole.',
  },
  {
    num: 3,
    sanskrit: 'असुर्या नाम ते लोका अन्धेन तमसावृताः',
    transliteration: 'Asūryā nāma te lokā andhena tamasāvṛtāḥ',
    meaning: 'Those worlds of the asuras are enveloped in blind darkness. Those who kill their Atman go there after death.',
    theme: 'Consequences of Self-Ignorance',
    contemplation: 'What does it mean to "kill one\'s Atman"? Contemplate the ways we suppress our deepest nature — through excessive distraction, self-deception, or denial of the spirit.',
  },
  {
    num: 4,
    sanskrit: 'अनेजदेकं मनसो जवीयो नैनद्देवा आप्नुवन्पूर्वमर्षत्',
    transliteration: 'Anejad ekaṃ manaso javīyo nainad devā āpnuvan pūrvam arṣat',
    meaning: 'The Atman is motionless, one, swifter than the mind. The devas could not overtake it running before them.',
    theme: 'Paradox of the Self — Atman',
    contemplation: 'The mind is fast — yet the Atman is faster, because it never moves. Rest in this paradox. Before a thought arises, what is already there?',
  },
  {
    num: 5,
    sanskrit: 'तदेजति तन्नैजति तद्दूरे तद्वन्तिके',
    transliteration: 'Tad ejati tan naijati tad dūre tad v antike',
    meaning: 'It moves, and it moves not. It is far, and it is near. It is within all, and it is outside all.',
    theme: 'Transcendence of Dualities',
    contemplation: 'Choose a pair of opposites in your life right now — busy/still, happy/sad. Can the same Self witness both equally? Contemplate the one that holds both.',
  },
  {
    num: 6,
    sanskrit: 'यस्तु सर्वाणि भूतान्यात्मन्येवानुपश्यति',
    transliteration: 'Yas tu sarvāṇi bhūtāny ātmany evānupaśyati',
    meaning: 'One who sees all beings in the Atman, and the Atman in all beings, feels no revulsion.',
    theme: 'Universal Vision — Sarvātmabhāva',
    contemplation: 'Think of someone you find difficult. Now see them as an expression of the same Atman that animates you. What changes in how you hold this person?',
  },
  {
    num: 7,
    sanskrit: 'यस्मिन्सर्वाणि भूतान्यात्मैवाभूद्विजानतः',
    transliteration: 'Yasmin sarvāṇi bhūtāny ātmaivābhūd vijānataḥ',
    meaning: 'When all beings have become the Self for the knower, what delusion, what grief is there?',
    theme: 'Liberation from Delusion — Moha-Kshaya',
    contemplation: 'Grief and delusion arise from separation. Contemplate: if everything is your own Self, from whom or what could you be separated? Sit in this peace.',
  },
  {
    num: 8,
    sanskrit: 'स पर्यगाच्छुक्रमकायमव्रणम्',
    transliteration: 'Sa paryagāc chukram akāyam avraṇam',
    meaning: 'He has filled all — radiant, bodiless, invulnerable, devoid of sinews, pure, untouched by evil.',
    theme: 'Nature of Brahman — Pure Consciousness',
    contemplation: 'Radiant, bodiless, invulnerable — these describe your deepest Self, not the body-mind. What aspect of this description resonates most deeply right now?',
  },
  {
    num: 9,
    sanskrit: 'अन्धं तमः प्रविशन्ति येऽविद्यामुपासते',
    transliteration: 'Andhaṃ tamaḥ praviśanti ye\'vidyām upāsate',
    meaning: 'Those who worship what is not knowledge enter into blind darkness.',
    theme: 'Vidyā vs Avidyā — Knowledge vs Ignorance',
    contemplation: 'What do you invest your energy in — knowledge that liberates, or activity that merely keeps you busy? Neither works alone. The Upanishad asks for integration.',
  },
  {
    num: 10,
    sanskrit: 'अन्यदेवाहुर्विद्ययान्यदाहुरविद्यया',
    transliteration: 'Anyad evāhur vidyayā anyad āhur avidyayā',
    meaning: 'One thing is said to be attained through knowledge; another through not-knowledge. Thus we have heard from the wise.',
    theme: 'Teaching of the Seers — Shruti',
    contemplation: 'The ancient teachers held both simultaneously. What have you learned from practical action (avidyā) that books could not teach? How does it complement inner knowledge?',
  },
  {
    num: 11,
    sanskrit: 'विद्यां चाविद्यां च यस्तद्वेदोभयँ सह',
    transliteration: 'Vidyāṃ cāvidyāṃ ca yas tad vedobhayaṃ saha',
    meaning: 'He who knows both knowledge and not-knowledge overcomes death through not-knowledge, and obtains immortality through knowledge.',
    theme: 'Integration — Overcoming Death',
    contemplation: 'Death is overcome through action (not-knowledge). Immortality is found through Self-knowledge. Contemplate your daily life as the field where both meet.',
  },
  {
    num: 12,
    sanskrit: 'अन्धं तमः प्रविशन्ति येऽसम्भूतिमुपासते',
    transliteration: 'Andhaṃ tamaḥ praviśanti ye\'sambhūtim upāsate',
    meaning: 'Those who worship what is not the true cause enter blind darkness.',
    theme: 'Sambhūti vs Asambhūti — Becoming and Non-becoming',
    contemplation: 'We often worship effects instead of causes — pursuing money instead of security, fame instead of belonging. What are the deeper causes beneath your current pursuits?',
  },
  {
    num: 13,
    sanskrit: 'अन्यदेवाहुः सम्भवादन्यदाहुरसम्भवात्',
    transliteration: 'Anyad evāhuḥ sambhavād anyad āhur asambhavāt',
    meaning: 'One thing, they say, is obtained from the true cause; another from what is not the true cause.',
    theme: 'Cause and Effect — Kārya-Kāraṇa',
    contemplation: 'Every outer result has an inner cause. Sit with a current challenge. What is its true inner cause — not the surface event, but the deeper pattern?',
  },
  {
    num: 14,
    sanskrit: 'सम्भूतिं च विनाशं च यस्तद्वेदोभयँ सह',
    transliteration: 'Sambhūtiṃ ca vināśaṃ ca yas tad vedobhayaṃ saha',
    meaning: 'He who knows both the manifest and destruction overcomes death through the perishable and obtains immortality through the manifest.',
    theme: 'Birth and Death — Cycle of Becoming',
    contemplation: 'The perishable body teaches us how to live in the world fully. The imperishable Atman shows us what does not die. Contemplate how both are gifts.',
  },
  {
    num: 15,
    sanskrit: 'हिरण्मयेन पात्रेण सत्यस्यापिहितं मुखम्',
    transliteration: 'Hiraṇmayena pātreṇa satyasyāpihitaṃ mukham',
    meaning: 'The face of Truth is covered with a golden lid. Open it, O Pūshan, that we may see the nature of the True.',
    theme: 'The Golden Door — Seeking Truth',
    contemplation: 'What "golden veils" — success, pleasure, knowledge — currently obscure your deepest truth? Offer this prayer: "O Light, reveal to me my own face."',
  },
  {
    num: 16,
    sanskrit: 'पूषन्नेकर्षे यम सूर्य प्राजापत्य',
    transliteration: 'Pūṣann ekarṣe yama sūrya prājāpatya',
    meaning: 'O Pūshan, only seer, O Yama, O Sun, O son of Prajāpati — spread thy rays and gather them! The immortal Purusha I am!',
    theme: 'The Immortal Purusha — Recognition of Self',
    contemplation: 'At the heart of this prayer is the declaration: "I am the immortal Purusha." Sit tall, breathe deeply, and repeat this recognition three times with full sincerity.',
  },
  {
    num: 17,
    sanskrit: 'वायुरनिलममृतमथेदं भस्मान्तँ शरीरम्',
    transliteration: 'Vāyur anilam amṛtam athedam bhasmāntaṃ śarīram',
    meaning: 'May my breath return to the immortal Air. Let this body end in ashes. Om! Mind, remember! Remember all that has been done.',
    theme: 'Dissolution and Remembrance — Prāṇa Returns',
    contemplation: 'This verse is traditionally recited at death. Contemplate: what truly matters about your life right now? What would you want remembered? Act accordingly today.',
  },
  {
    num: 18,
    sanskrit: 'अग्ने नय सुपथा राये अस्मान्',
    transliteration: 'Agne naya supathā rāye asmān',
    meaning: 'O Agni, lead us by the good path to wealth (liberation). Remove from us the crooked sin. We bow to thee with many words.',
    theme: 'Final Prayer — Lead Us to the Good',
    contemplation: 'End this session with a simple offering: "May I be led on the good path. May my crooked tendencies be removed. May all beings reach their highest good." Sit in silence.',
  },
]

export default function IshaContemplationGuide() {
  const [current, setCurrent] = useState(0)
  const [revealed, setRevealed] = useState(false)

  const verse = ISHA_VERSES[current]
  const total = ISHA_VERSES.length

  function go(dir: number) {
    setCurrent(prev => Math.max(0, Math.min(total - 1, prev + dir)))
    setRevealed(false)
  }

  return (
    <VedicAppTemplate
      title="Isha Contemplation Guide"
      subtitle="Upanishad Meditation · All 18 Mantras"
      icon="🪔"
      footerNote="Isha Upanishad — Shukla Yajurveda. Recited as a daily upanishad-mantra in the Vedic tradition."
    >
      {/* Progress */}
      <div className="flex gap-1 mb-5">
        {ISHA_VERSES.map((_, i) => (
          <button
            key={i}
            aria-label={`Mantra ${i}`}
            onClick={() => { setCurrent(i); setRevealed(false) }}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              i === current
                ? 'bg-orange-500'
                : i < current
                ? 'bg-orange-300 dark:bg-orange-700'
                : 'bg-stone-200 dark:bg-stone-700'
            }`}
          />
        ))}
      </div>

      {/* Verse info */}
      <div className="space-y-3 mb-5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-500">
            {verse.num === 0 ? 'Śānti Pāṭha' : `Mantra ${verse.num}`}
          </span>
          <span className="text-[10px] text-stone-400 dark:text-stone-500">{current + 1} / {total}</span>
        </div>

        <div className="bg-orange-50/50 dark:bg-orange-950/20 rounded-2xl p-4 space-y-2">
          <p className="font-serif text-xl text-stone-900 dark:text-white leading-relaxed" lang="sa">
            {verse.sanskrit}
          </p>
          <p className="text-xs text-stone-500 dark:text-stone-400 italic">{verse.transliteration}</p>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-black uppercase tracking-widest text-stone-400 dark:text-stone-500">Theme</p>
          <p className="text-sm font-semibold text-stone-700 dark:text-stone-300">{verse.theme}</p>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-black uppercase tracking-widest text-stone-400 dark:text-stone-500">Translation</p>
          <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">{verse.meaning}</p>
        </div>
      </div>

      {/* Contemplation prompt */}
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="w-full py-3 rounded-xl border border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-400 text-xs font-black uppercase tracking-widest hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-colors"
        >
          Open Contemplation
        </button>
      ) : (
        <div className="bg-stone-50 dark:bg-stone-800/40 rounded-2xl p-4 border border-stone-100 dark:border-stone-700">
          <p className="text-[10px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-500 mb-2">Contemplation</p>
          <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">{verse.contemplation}</p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3 mt-5">
        <button
          onClick={() => go(-1)}
          disabled={current === 0}
          className="flex-1 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-black uppercase tracking-widest disabled:opacity-30 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
        >
          ← Previous
        </button>
        <button
          onClick={() => go(1)}
          disabled={current === total - 1}
          className="flex-1 py-2.5 rounded-xl bg-orange-600 text-white text-xs font-black uppercase tracking-widest disabled:opacity-30 hover:bg-orange-700 transition-colors"
        >
          Next →
        </button>
      </div>
    </VedicAppTemplate>
  )
}
