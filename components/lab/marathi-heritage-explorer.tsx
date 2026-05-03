'use client'
import React, { useState } from 'react'
import VedicAppTemplate from './vedic-app-template'

interface OviSet {
  id: string
  chapter: number
  shlokaRef: string
  shlokaSanskrit: string
  shlokaTransliteration: string
  shlokaTranslation: string
  ovi: string
  oviIast: string
  oviModernMarathi: string
  oviModernEnglish: string
  oviCount: string
  cultural: string
}

const OVI_SETS: OviSet[] = [
  {
    id: 'bg-2-47',
    chapter: 2,
    shlokaRef: 'BG 2.47',
    shlokaSanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
    shlokaTransliteration: 'karmaṇy-evādhikāras te mā phaleṣu kadācana | mā karma-phala-hetur bhūr mā te saṅgo \'stv akarmaṇi ||',
    shlokaTranslation: 'You have a right to action alone, never to its fruits. Be not the cause of the fruit of action; nor be attached to inaction.',
    ovi: 'तू कर्म करी पैं फळाची आशा। न करी पंडुसुता कदा। फळहेतु कर्मा। न लागे चित्त।।',
    oviIast: 'tū karma karī paiṁ phaḷācī āśā | na karī paṇḍusutā kadā | phaḷahetu karmā | na lāge citta ||',
    oviModernMarathi: 'तू केवळ कर्म कर — त्याच्या फळाची इच्छा कधीही करू नकोस, अर्जुना. कर्माचे फळ हाच हेतू ठेवू नकोस; आणि कर्म सोडण्यातही चित्त गुंतवू नकोस.',
    oviModernEnglish: 'Act only — never let the wish for fruit arise. Do not make the fruit your motive; do not let the heart cling to inaction either.',
    oviCount: 'Dnyāneshwarī 2.262–2.270 (selected)',
    cultural: 'The Marathi ovī is a four-line meter — typically 3 lines of action and 1 line of culmination. Sant Dnyāneshwar in 1290 CE chose this folk meter precisely so that the deepest Gītā teaching could be sung at the well, in the field, on pilgrimage. The intellectual transmission became cultural transmission.',
  },
  {
    id: 'bg-3-35',
    chapter: 3,
    shlokaRef: 'BG 3.35',
    shlokaSanskrit: 'श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्। स्वधर्मे निधनं श्रेयः परधर्मो भयावहः॥',
    shlokaTransliteration: 'śreyān sva-dharmo viguṇaḥ para-dharmāt sv-anuṣṭhitāt | sva-dharme nidhanaṁ śreyaḥ para-dharmo bhayāvahaḥ ||',
    shlokaTranslation: 'Better one\'s own duty, though imperfect, than another\'s duty well performed. Better death in one\'s own duty; another\'s duty is fraught with fear.',
    ovi: 'आपुलिये नांवें जरी मरण आलें। तरी श्रेय तेंचि म्हणितलें। परदर्म पाहूं पाठविलें। भय असे।।',
    oviIast: 'āpuliyeṁ nāmveṁ jarī maraṇa āleṁ | tarī śreya teṁci mhaṇitaleṁ | paradharma pāhūṁ pāṭhaviileṁ | bhaya ase ||',
    oviModernMarathi: 'आपल्या स्वतःच्या धर्मात मृत्यू आला तरी तोच श्रेयस्कर म्हटला आहे. दुसऱ्याचा धर्म पाहायला पाठवले गेलात तरी तेथे भय असते.',
    oviModernEnglish: 'Even if death meets you on your own path, that path is still called the higher one. To be sent to walk another\'s path is to be sent into fear.',
    oviCount: 'Dnyāneshwarī 3.226–3.232',
    cultural: 'Dnyāneshwar wrote in the Marathi of common people in a time when Sanskrit was the gatekeeper of scripture. By singing svadharma in folk meter, he asserted that one\'s own life — Brahmin, farmer, washerwoman — was the only legitimate ground of practice. This verse became foundational for the entire Warkarī Bhakti movement.',
  },
  {
    id: 'bg-9-22',
    chapter: 9,
    shlokaRef: 'BG 9.22',
    shlokaSanskrit: 'अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते। तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥',
    shlokaTransliteration: 'ananyāś cintayanto māṁ ye janāḥ paryupāsate | teṣāṁ nityābhiyuktānāṁ yoga-kṣemaṁ vahāmy aham ||',
    shlokaTranslation: 'For those who worship Me alone, with no other thought — for them, ever-united with Me, I carry what they have and what they lack.',
    ovi: 'जे माझिये भजनीं रंगले। अनन्य चित्तें मज शरण आले। तयांचा योगक्षेम मी वाहिले। माउली होऊनी।।',
    oviIast: 'je māziye bhajanīṁ raṅgale | ananya cittaiṁ maja śaraṇa āle | tayāṁcā yogakṣema mī vāhile | māulī hoūnī ||',
    oviModernMarathi: 'जे माझ्या भजनात रंगले, अनन्य चित्ताने मला शरण आले — त्यांचा योगक्षेम मी आई होऊन वाहतो.',
    oviModernEnglish: 'Those who are dyed in My remembrance, who come to Me with undivided heart — for them I become the mother and carry both what they hold and what they lack.',
    oviCount: 'Dnyāneshwarī 9.275–9.281',
    cultural: 'The single most quoted ovī in the Warkarī tradition. Dnyāneshwar transforms Krishna\'s sober promise into the image of a mother carrying her child — māulī. From this verse Dnyāneshwar himself came to be addressed as "Mauli" — the mothering one. The vernacular became the carrier of grace itself.',
  },
  {
    id: 'bg-12-13',
    chapter: 12,
    shlokaRef: 'BG 12.13–14',
    shlokaSanskrit: 'अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च। निर्ममो निरहङ्कारः समदुःखसुखः क्षमी॥',
    shlokaTransliteration: 'adveṣṭā sarva-bhūtānāṁ maitraḥ karuṇa eva ca | nirmamo nirahaṅkāraḥ sama-duḥkha-sukhaḥ kṣamī ||',
    shlokaTranslation: 'He who hates no being, who is friendly and compassionate, free from possessiveness and ego, equal in joy and sorrow, forgiving — such a one is dear to Me.',
    ovi: 'जो सर्वभूतीं न करी द्वेष। मैत्र करुणा हृदयी विशेष। ममता अहंकार त्यजोनि निःशेष। समबुद्धि।।',
    oviIast: 'jo sarvabhūtīṁ na karī dveṣa | maitra karuṇā hṛdayī viśeṣa | mamatā ahaṅkāra tyajoni niḥśeṣa | samabuddhi ||',
    oviModernMarathi: 'जो कोणत्याही भूतमात्राचा द्वेष करीत नाही, ज्याच्या हृदयात मैत्री व करुणा विशेषत्वाने वसते, ज्याने ममता-अहंकार पूर्णपणे सोडलेले आहेत, आणि सुखदुःखात सम बुद्धी आहे — तो मला प्रिय आहे.',
    oviModernEnglish: 'One who hates no being, in whose heart friendship and compassion live as distinct presences, who has set down all "mine" and "I" without remainder, whose mind stays even in joy and sorrow — that one is dear to Me.',
    oviCount: 'Dnyāneshwarī 12.118–12.140',
    cultural: 'Chapter 12 in Dnyāneshwarī becomes the song of the bhakta. The 36 ovīs that Dnyāneshwar composes here are the most often recited at Warkarī gatherings — committed to memory, sung walking the Pandharpur pilgrimage. The vernacular preserves what intellectual translation cannot: the rhythm of devotion in motion.',
  },
  {
    id: 'bg-15-7',
    chapter: 15,
    shlokaRef: 'BG 15.7',
    shlokaSanskrit: 'ममैवांशो जीवलोके जीवभूतः सनातनः। मनःषष्ठानीन्द्रियाणि प्रकृतिस्थानि कर्षति॥',
    shlokaTransliteration: 'mamaivāṁśo jīva-loke jīva-bhūtaḥ sanātanaḥ | manaḥ-ṣaṣṭhānīndriyāṇi prakṛti-sthāni karṣati ||',
    shlokaTranslation: 'An eternal portion of My own becomes the living being in the world of life — drawing to itself the senses, with the mind as the sixth, abiding in nature.',
    ovi: 'जीव हा माझा अंश सनातन। प्रकृतीचे षड्इंद्रिय करितो आकर्षण। मनासह करोनि भोगण। संसारीं।।',
    oviIast: 'jīva hā māzā aṁśa sanātana | prakṛtīce ṣaḍ-indriya karito ākarṣaṇa | manāsaha karoni bhogaṇa | saṁsārīṁ ||',
    oviModernMarathi: 'जीव हा माझा सनातन अंश आहे. तो प्रकृतीतील सहा इंद्रियांना — पंच ज्ञानेंद्रियांसह मनासह — आकर्षित करतो आणि संसारात भोग घेतो.',
    oviModernEnglish: 'The jīva is My eternal portion. It draws toward itself the six instruments of nature — five senses with the mind as sixth — and through them tastes the world.',
    oviCount: 'Dnyāneshwarī 15.149–15.156',
    cultural: 'Dnyāneshwar reads the verse with a non-dual ease that the Sanskrit itself permits but ISKCON\'s commentary tightens. In the ovī, the jīva is wave on the ocean — distinct in form, identical in substance. This is why Warkarī devotion does not contradict the Advaita roots of the tradition: in song, the two reconcile.',
  },
  {
    id: 'bg-18-66',
    chapter: 18,
    shlokaRef: 'BG 18.66',
    shlokaSanskrit: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज। अहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥',
    shlokaTransliteration: 'sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja | ahaṁ tvāṁ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ ||',
    shlokaTranslation: 'Abandoning all dharmas, take refuge in Me alone. I shall liberate you from all sins; do not grieve.',
    ovi: 'सकळ धर्मा सोडोनी। मज एका शरण येतां। मी तुज सर्व पापांतूनी। मुक्त करीन। शोक नको।।',
    oviIast: 'sakaḷa dharmā soḍonī | maja ekā śaraṇa yetāṁ | mī tuja sarva pāpāṁtūnī | mukta karīn | śoka nako ||',
    oviModernMarathi: 'सर्व धर्म सोडून फक्त माझ्या एकाच्या शरणात ये. मी तुला सर्व पापांतून मुक्त करीन. शोक करू नकोस.',
    oviModernEnglish: 'Set down every dharma and come into refuge in Me alone. I will release you from every sin. Grieve no more.',
    oviCount: 'Dnyāneshwarī 18.1735–18.1756 (carama-śloka section)',
    cultural: 'Dnyāneshwar pours the carama-śloka out as the final benediction in long, melodic ovīs that close the work itself. The famous "Pasāyadāna" — a prayer for the welfare of all — follows immediately after. Marathi devotees recite both daily; the Gītā\'s last word and Dnyāneshwar\'s personal vow have become inseparable in the tradition.',
  },
]

type LayerKey = 'shloka' | 'ovi' | 'modern'

export default function MarathiHeritageExplorer() {
  const [selectedId, setSelectedId] = useState<string>(OVI_SETS[0].id)
  const [activeLayers, setActiveLayers] = useState<Record<LayerKey, boolean>>({ shloka: true, ovi: true, modern: true })
  const [modernLang, setModernLang] = useState<'mr' | 'en'>('mr')
  const selected = OVI_SETS.find(o => o.id === selectedId) ?? OVI_SETS[0]

  const toggle = (k: LayerKey) => setActiveLayers(s => ({ ...s, [k]: !s[k] }))

  return (
    <VedicAppTemplate
      title="Marathi Heritage Explorer"
      subtitle="Bhagavad Gītā · Dnyāneshwarī · Modern Marathi"
      icon="🪔"
      footerNote="Sant Dnyāneshwar, Ālandi, 1290 CE — the first Gītā commentary in any Indian vernacular."
    >
      <p className="text-xs text-stone-500 dark:text-stone-400 mb-4 leading-relaxed">
        Three layers, one teaching: original Gītā śloka → 13th-century Dnyāneshwarī ovī → modern Marathi or English. Toggle layers to read the path of vernacularisation.
      </p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {OVI_SETS.map(o => (
          <button
            key={o.id}
            onClick={() => setSelectedId(o.id)}
            className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${
              selected.id === o.id
                ? 'bg-orange-600 text-white'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >Ch {o.chapter} · {o.shlokaRef.split(' ')[1]}</button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-4 text-[10px] font-bold uppercase tracking-wider">
        <button
          onClick={() => toggle('shloka')}
          className={`px-2 py-1 rounded-md border transition-colors ${activeLayers.shloka ? 'border-stone-400 bg-stone-100 dark:bg-stone-800 dark:border-stone-600 text-stone-800 dark:text-stone-200' : 'border-stone-200 dark:border-stone-700 text-stone-400'}`}
        >Śloka</button>
        <button
          onClick={() => toggle('ovi')}
          className={`px-2 py-1 rounded-md border transition-colors ${activeLayers.ovi ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-700 text-amber-800 dark:text-amber-300' : 'border-stone-200 dark:border-stone-700 text-stone-400'}`}
        >Ovī (1290 CE)</button>
        <button
          onClick={() => toggle('modern')}
          className={`px-2 py-1 rounded-md border transition-colors ${activeLayers.modern ? 'border-orange-400 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-700 text-orange-800 dark:text-orange-300' : 'border-stone-200 dark:border-stone-700 text-stone-400'}`}
        >Modern</button>
        <button
          onClick={() => setModernLang(l => (l === 'mr' ? 'en' : 'mr'))}
          className="ml-auto px-2 py-1 rounded-md border border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-400"
        >Modern: {modernLang === 'mr' ? 'मराठी' : 'English'}</button>
      </div>

      <div className="space-y-3">
        {activeLayers.shloka && (
          <div className="rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/40 p-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">{selected.shlokaRef} · Sanskrit</p>
            <p className="text-sm font-serif text-stone-800 dark:text-stone-200 leading-relaxed">{selected.shlokaSanskrit}</p>
            <p className="text-[11px] italic text-stone-500 dark:text-stone-500 mt-1 leading-relaxed">{selected.shlokaTransliteration}</p>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">{selected.shlokaTranslation}</p>
          </div>
        )}

        {activeLayers.ovi && (
          <div className="rounded-xl border border-amber-200 dark:border-amber-800/40 bg-amber-50 dark:bg-amber-950/20 p-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-1">Dnyāneshwarī ovī · 1290 CE</p>
            <p className="text-sm font-serif text-stone-800 dark:text-stone-200 leading-relaxed">{selected.ovi}</p>
            <p className="text-[11px] italic text-stone-500 dark:text-stone-500 mt-1 leading-relaxed">{selected.oviIast}</p>
            <p className="text-[10px] text-amber-700 dark:text-amber-400 mt-2">{selected.oviCount}</p>
          </div>
        )}

        {activeLayers.modern && (
          <div className="rounded-xl border border-orange-200 dark:border-orange-800/40 bg-orange-50 dark:bg-orange-950/20 p-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-1">Modern · {modernLang === 'mr' ? 'मराठी' : 'English'}</p>
            <p className="text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
              {modernLang === 'mr' ? selected.oviModernMarathi : selected.oviModernEnglish}
            </p>
          </div>
        )}

        <div className="rounded-xl border-2 border-indigo-200 dark:border-indigo-800/40 bg-indigo-50 dark:bg-indigo-950/20 p-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-1">Cultural Note</p>
          <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">{selected.cultural}</p>
        </div>
      </div>
    </VedicAppTemplate>
  )
}
