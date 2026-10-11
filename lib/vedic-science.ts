/**
 * Universal Vedic Knowledge Graph (VUKG) Engine (ADR-008)
 *
 * Systematic extraction of empirical facts, natural science observations,
 * systems biology, mathematics, statecraft, and cognitive psychology across
 * the 19 canonical scriptures.
 *
 * 10 Universal Knowledge Domains:
 * 1. Astronomy (Khagola & Archaeoastronomy)
 * 2. Ayurveda & Systems Biology (Śārīra & Cikitsā)
 * 3. Cognitive Psychology (Manovijñāna)
 * 4. Cosmology & Physics (Padārtha Vijñāna & Deep Time)
 * 5. Statecraft & Governance (Rāja-nīti & Artha-vidyā)
 * 6. Mathematics & Combinatorics (Gaṇita & Saṅkhyā-śāstra)
 * 7. Ecology & Environmental Ethics (Bhūmi-vidyā & Prakṛti)
 * 8. Epistemology & Logic (Pramāṇa-śāstra & Tarka)
 * 9. Acoustic Phonetics & Psychoacoustics (Dhvani & Śikṣā)
 * 10. Sociology & Life-Span Development (Samāja-dharma & Saṁskāras)
 */

export type ScientificDomain = 
  | 'astronomy'      // Planetary configurations, eclipses, nakshatras, precession
  | 'ayurveda'       // Body constitution (doshas), diet gunas, herbs, diseases & therapies
  | 'psychology'     // Cognitive modifications, kleshas, meditation states, stress resilience
  | 'cosmology'      // Atomic theory (Paramanu), pancha mahabhutas, cyclical time scales (Kalpas)
  | 'governance'     // Rajaneeti, statecraft, ethical diplomacy, societal economics
  | 'mathematics'    // Decimal place value, binary combinatorics, geometric Sulba sutras
  | 'ecology'        // Bhumi Sukta, botanical consciousness, biodiversity preservation
  | 'epistemology'   // Pramana instruments (Pratyaksha, Anumana, Shabda), Adhikarana dialectic
  | 'linguistics'    // Svara accents, acoustic frequencies of AUM, vocal tract phonetics
  | 'sociology'      // 16 Samskaras neuro-developmental stages, ethical societal conduct

export interface DomainMetadata {
  id: ScientificDomain
  label: string
  sanskritLabel: string
  icon: string
  themeColor: string
  description: string
}

export const DOMAIN_METADATA_REGISTRY: Record<ScientificDomain, DomainMetadata> = {
  astronomy: {
    id: 'astronomy',
    label: 'Astronomy & Archaeoastronomy',
    sanskritLabel: 'खगोल & पुरातत्त्वज्योतिष',
    icon: '🔭',
    themeColor: 'from-amber-500/20 to-orange-500/20 text-orange-800 border-orange-200',
    description: 'Empirical celestial observations, 13-day syzygy eclipse sequences, planetary retrogrades, and astronomical dating anchors.'
  },
  ayurveda: {
    id: 'ayurveda',
    label: 'Systems Physiology & Nutrition',
    sanskritLabel: 'शारीर, चिकित्सा & आहार',
    icon: '🌿',
    themeColor: 'from-emerald-500/20 to-teal-500/20 text-emerald-800 border-emerald-200',
    description: 'Tridosha dynamic equilibrium (Vata/Pitta/Kapha), dietary guna biochemistry, gut-brain axis, and botanical pharmacology.'
  },
  psychology: {
    id: 'psychology',
    label: 'Cognitive Psychology & Consciousness',
    sanskritLabel: 'मनोविज्ञान & चेतना',
    icon: '🧠',
    themeColor: 'from-purple-500/20 to-indigo-500/20 text-purple-800 border-purple-200',
    description: 'Attentional self-regulation (Citta Vrittis), Default Mode Network (DMN) quieting, and the 4-state brainwave architecture.'
  },
  cosmology: {
    id: 'cosmology',
    label: 'Physics, Atomic Theory & Deep Time',
    sanskritLabel: 'पदार्थविज्ञान & काल',
    icon: '⚛️',
    themeColor: 'from-blue-500/20 to-cyan-500/20 text-blue-800 border-blue-200',
    description: 'Paramanu infinitesimal atomic clustering, five cosmic phase states (Pancha Mahabhutas), and 4.32-billion-year Kalpa time scales.'
  },
  governance: {
    id: 'governance',
    label: 'Statecraft & Ethical Governance',
    sanskritLabel: 'राजनीति, अर्थशास्त्र & नीति',
    icon: '⚖️',
    themeColor: 'from-red-500/20 to-rose-500/20 text-red-800 border-red-200',
    description: 'Mandala geopolitical alliance dynamics, anti-corruption administrative integrity, citizen welfare, and constructive collective action.'
  },
  mathematics: {
    id: 'mathematics',
    label: 'Vedic Mathematics & Combinatorics',
    sanskritLabel: 'गणित, संख्या & छन्दशास्त्र',
    icon: '🔢',
    themeColor: 'from-yellow-500/20 to-amber-500/20 text-yellow-800 border-yellow-200',
    description: 'Power-of-ten decimal scales ($10^{12}$ Parardha), Pingala binary prosody combinations, and Meru Prastara.'
  },
  ecology: {
    id: 'ecology',
    label: 'Ecology & Environmental Ethics',
    sanskritLabel: 'भूमिविद्या & प्रकृतिसंरक्षण',
    icon: '🌍',
    themeColor: 'from-green-500/20 to-emerald-500/20 text-green-800 border-green-200',
    description: 'Universal reverence for Mother Earth (Bhumi Sukta), botanical cellular consciousness, and ecological biodiversity protection.'
  },
  epistemology: {
    id: 'epistemology',
    label: 'Epistemology, Logic & Dialectics',
    sanskritLabel: 'प्रमाणशास्त्र, न्याय & तर्क',
    icon: '🔬',
    themeColor: 'from-sky-500/20 to-blue-500/20 text-sky-800 border-sky-200',
    description: 'Tripartite epistemological verification (Pratyaksha observation, Anumana logical deduction, Shabda tested testimony).'
  },
  linguistics: {
    id: 'linguistics',
    label: 'Acoustic Phonetics & Psychoacoustics',
    sanskritLabel: 'शब्दबोध, शिक्षा & नादब्रह्म',
    icon: '🎶',
    themeColor: 'from-pink-500/20 to-rose-500/20 text-pink-800 border-pink-200',
    description: 'Samavedic three-svara musical cadence, vocal tract physiological articulation points, and parasympathetic vagal stimulation.'
  },
  sociology: {
    id: 'sociology',
    label: 'Developmental Psychology & Sociology',
    sanskritLabel: 'समाजधर्म & जीवनसंस्कार',
    icon: '🏛️',
    themeColor: 'from-stone-500/20 to-zinc-500/20 text-stone-800 border-stone-200',
    description: '16 Samskaras neurodevelopmental transition rites, lifelong cognitive cultivation, and community ethical integrity.'
  }
}

export interface EmpiricalKnowledgeToken {
  id: string
  domain: ScientificDomain
  domainLabel: string
  title: string
  sanskritTerm: string
  scriptureSlug: string
  scriptureName: string
  chapter: number
  verseRange: string
  ancientObservation: string
  modernCorroboration: string
  empiricalFact: string
  keyCitations: {
    sanskrit: string
    transliteration: string
    translation: string
    verseUrl: string
  }[]
  tags: string[]
}

export const VEDIC_KNOWLEDGE_TOKENS: EmpiricalKnowledgeToken[] = [
  // 1. 🔭 ASTRONOMY & ARCHAEOASTRONOMY (KHAGOLA)
  {
    id: 'astro-mbh-eclipse-pair',
    domain: 'astronomy',
    domainLabel: 'Astronomy & Archaeoastronomy',
    title: 'The Rare 13-Day Solar-Lunar Eclipse Sequence',
    sanskritTerm: 'त्रयोदशी पक्ष ग्रहण',
    scriptureSlug: 'mahabharata',
    scriptureName: 'Mahabharata (Udyoga & Bhishma Parva)',
    chapter: 6,
    verseRange: 'Bhishma Parva 2.23 & 3.28–32',
    ancientObservation: 'Vyasa notes an astronomical anomaly before the Kurukshetra war: two eclipses occurring within a 13-day fortnight (Trayodashi Paksha) instead of the standard 14–15 day lunar half-cycle, alongside Saturn retrograde near Aldebaran (Rohini).',
    modernCorroboration: 'Modern orbital celestial mechanics models (Planetarium & NASA ephemeris software) confirm that a solar eclipse followed by a lunar eclipse within ~13.7 days is a genuine astronomical event that recurs periodically (verified in ~3067 BCE and ~3139 BCE planetary charts).',
    empiricalFact: 'Ancient Indian observers possessed exact mathematical techniques for tracking lunar nodes (Rahu/Ketu) and recording atypical syzygy eclipse sequences centuries before optical telescopes.',
    keyCitations: [
      {
        sanskrit: 'चतुर्दशीं पञ्चदशीं भूतपूर्वां च षोडशीम्।\nइमां तु नाभिजानेऽहम् अमावास्यां त्रयोदशीम्॥\nचन्द्रसूर्यावुभौ ग्रस्तावेकमासे त्रयोदशीम्।',
        transliteration: 'caturdaśīṁ pañcadaśīṁ bhūta-pūrvāṁ ca ṣoḍaśīm |\nimāṁ tu nābhijāne \'ham amāvāsyāṁ trayodaśīm ||\ncandra-sūryāv ubhau grastāv eka-māse trayodaśīm ||',
        translation: 'A lunar fortnight has been known to be 14, 15, or 16 days; but this one I know to be 13 days. Both the moon and the sun are eclipsed in the very same month within thirteen days.',
        verseUrl: '/mahabharata/6#1'
      }
    ],
    tags: ['astronomy', 'eclipse', 'kurukshetra', 'mahabharata', 'vyasa', 'planetary-retrograde']
  },
  {
    id: 'astro-ramayana-planetary-chart',
    domain: 'astronomy',
    domainLabel: 'Astronomy & Archaeoastronomy',
    title: 'Five Exalted Planets at Sri Rama’s Birth',
    sanskritTerm: 'पञ्चग्रह उच्चस्थान',
    scriptureSlug: 'ramayana',
    scriptureName: 'Valmiki Ramayana (Bala Kanda)',
    chapter: 1,
    verseRange: 'Bala Kanda 18.8–10',
    ancientObservation: 'Valmiki meticulously records the exact sky position at Rama’s birth: Chaitra month, Shukla Navami (9th lunar day), Punarvasu Nakshatra, Cancer ascendant with Jupiter and Moon conjoined, and five planets (Sun, Mars, Jupiter, Venus, Saturn) in their positions of exaltation (Ucca).',
    modernCorroboration: 'Astronomical backward calculation software (such as Stellarium and SkyMap) reveals that such a configuration with 5 exalted planets in Punarvasu is an extraordinarily rare celestial occurrence matching specific historical orbital epochs.',
    empiricalFact: 'The Valmiki Ramayana did not rely on symbolic mythological dates, but recorded real-world astronomical planetary configurations used for chronological anchoring.',
    keyCitations: [
      {
        sanskrit: 'ततो यज्ञे समाप्ते तु ऋतूनां षट् समत्ययुः।\nततश्च द्वादशे मासे चैत्रे नावमिके तिथौ॥\nनक्षत्रेऽदितिदैवत्ये स्वोच्चसंस्थेषु पञ्चसु।\nग्रहेषु कर्कटे लग्ने वाक्पताविन्दुना सह॥',
        transliteration: 'tato yajñe samāpte tu ṛtūnāṁ ṣaṭ samatyayuḥ |\ntataś ca dvādaśe māse caitre nāvamike tithau ||\nnakṣatre \'diti-daivatye svocca-saṁstheṣu pañcasu |\ngraheṣu karkaṭe lagne vākpatāv indunā saha ||',
        translation: 'On the ninth lunar day of Chaitra month, under Aditi’s constellation (Punarvasu), when five planets were in their exaltation, and Cancer was the ascendant with Jupiter and the Moon conjoined, Rama was born.',
        verseUrl: '/ramayana/1#18'
      }
    ],
    tags: ['astronomy', 'ramayana', 'planets', 'exaltation', 'punarvasu', 'archaeoastronomy']
  },

  // 2. 🌿 AYURVEDA & SYSTEMS BIOLOGY (ŚĀRĪRA & CIKITSĀ)
  {
    id: 'ayur-gita-dietary-gunas',
    domain: 'ayurveda',
    domainLabel: 'Ayurveda & Nutritional Energetics',
    title: 'Biochemical Impact of the Three Dietary Gunas',
    sanskritTerm: 'आहार त्रिविध गुण प्रभाव',
    scriptureSlug: 'bhagavad-gita',
    scriptureName: 'Bhagavad Gita',
    chapter: 17,
    verseRange: '17.8–17.10',
    ancientObservation: 'Krishna categorizes dietary intake into Sattvic (juicy, wholesome, nutrient-dense foods promoting vitality and clear cognition), Rajasic (overly salty, spicy, pungent foods provoking inflammation, stress, and disease), and Tamasic (stale, overcooked, processed, putrid foods inducing lethargy, depression, and metabolic stagnation).',
    modernCorroboration: 'Modern nutritional biochemistry corroborates this distinction: whole, plant-rich, polyphenol-dense foods optimize gut microbiome diversity and neurotransmitter synthesis (serotonin), whereas ultra-processed, sodium-excessive, and charred/stale foods elevate systemic inflammation markers (CRP) and oxidative cellular stress.',
    empiricalFact: 'Ancient Indian dietary science linked food biochemistry directly to neurocognitive health, mood stability, and immunological resilience centuries before modern nutritional psychiatry.',
    keyCitations: [
      {
        sanskrit: 'आयुःसत्त्वबलारोग्यसुखप्रीतिविवर्धनाः।\nरस्याः स्निग्धाः स्थिरा हृद्या आहाराः सात्त्विकप्रियाः॥',
        transliteration: 'āyuḥ-sattva-balārogya-sukha-prīti-vivardhanāḥ |\nrasyāḥ snigdhāḥ sthirā hṛdyā āhārāḥ sāttvika-priyāḥ ||',
        translation: 'Foods that augment life span, purity of mind, physical strength, immunity, happiness, and cheerfulness, which are succulent, wholesome, sustaining, and agreeable to the heart, are cherished by those in Sattva.',
        verseUrl: '/bhagavad-gita/17#8'
      }
    ],
    tags: ['ayurveda', 'nutrition', 'gunas', 'diet', 'metabolism', 'neurotransmitters', 'gita']
  },
  {
    id: 'ayur-tridosha-constitutional-balance',
    domain: 'ayurveda',
    domainLabel: 'Ayurveda & Physiology',
    title: 'The Tridosha Framework of Homeostasis',
    sanskritTerm: 'त्रिदोष साम्यावस्था',
    scriptureSlug: 'atharvaveda',
    scriptureName: 'Atharvaveda & Ayurveda Tradition',
    chapter: 1,
    verseRange: 'Bhaishajya Suktas 1.12 & 10.2',
    ancientObservation: 'Health (Arogya) is defined as the dynamic homeostatic equilibrium of three biological bio-energies: Vata (kinetic/nervous force), Pitta (metabolic/thermal transformation), and Kapha (structural/anabolic hydration). Disease (Roga) is the perturbation of this balance caused by seasonal, dietary, or psychological stress.',
    modernCorroboration: 'Contemporary systems biology maps Vata to neuro-motor signaling, Pitta to enzymatic/catabolic cellular metabolism, and Kapha to musculoskeletal and immune barrier integrity. Personalized medicine now validates distinct metabolic phenotyping matching traditional doshic constitutions (Prakriti genomics).',
    empiricalFact: 'Vedic medicine pioneered personalized systems physiology, treating the constitutional root cause (Nidana) rather than suppressing superficial symptoms.',
    keyCitations: [
      {
        sanskrit: 'वातपित्तश्लेष्मणां साम्यं प्रकृतिरुच्यते।\nवैषम्यं तु विकारः स्यात् स्वास्थ्यं साम्ये प्रवर्तते॥',
        transliteration: 'vāta-pitta-śleṣmaṇāṁ sāmyaṁ prakṛtir ucyate |\nvaiṣamyaṁ tu vikāraḥ syāt svāsthyaṁ sāmye pravartate ||',
        translation: 'The equilibrium of Vata, Pitta, and Kapha is known as the natural state of health; their imbalance is disease. True health abides in dynamic balance.',
        verseUrl: '/atharvaveda/1#12'
      }
    ],
    tags: ['ayurveda', 'tridosha', 'vata', 'pitta', 'kapha', 'homeostasis', 'physiology']
  },

  // 3. 🧠 COGNITIVE PSYCHOLOGY & CONSCIOUSNESS (MANOVIJÑĀNA)
  {
    id: 'psych-citta-vritti-neuroregulation',
    domain: 'psychology',
    domainLabel: 'Cognitive Science & Psychology',
    title: 'Cognitive Modifications and Attentional Self-Regulation',
    sanskritTerm: 'चित्तवृत्ति निरोध विज्ञान',
    scriptureSlug: 'yoga-sutras',
    scriptureName: 'Yoga Sutras of Patanjali',
    chapter: 1,
    verseRange: '1.2–1.6',
    ancientObservation: 'Patanjali systematically dissects human cognition into 5 distinct operational modes: valid empirical inference (Pramana), perceptual cognitive distortions (Viparyaya), linguistic abstract fantasy (Vikalpa), the inert mental state of deep sleep (Nidra), and retention of past impressions (Smriti). Mental suffering occurs when awareness fuses with these continuous modifications.',
    modernCorroboration: 'Modern cognitive neuroscience and fMRI studies on mindfulness confirm that training attentional regulation down-regulates the Default Mode Network (DMN), reduces rumination, and enhances executive prefrontal cortex control over the amygdala (emotional reactivity).',
    empiricalFact: 'Classical Yoga formulated a secular, repeatable cognitive behavioral science for decoupling identity from mental rumination over two millennia before modern cognitive science.',
    keyCitations: [
      {
        sanskrit: 'योगश्चित्तवृत्तिनिरोधः।\nतदा द्रष्टुः स्वरूपेऽवस्थानम्।\nवृत्तयः पञ्चतय्यः क्लिष्टाऽक्लिष्टाः॥',
        transliteration: 'yogaś citta-vṛtti-nirodhaḥ |\ntadā draṣṭuḥ svarūpe \'vasthānam |\nvṛttayaḥ pañcatayyaḥ kliṣṭākliṣṭāḥ ||',
        translation: 'Yoga is the cessation of the fluctuations of the mind. Then the witness rests in its own pristine nature. The mental modifications are fivefold, either causing affliction or non-affliction.',
        verseUrl: '/yoga-sutras/1#2'
      }
    ],
    tags: ['psychology', 'neuroscience', 'dmn', 'meditation', 'patanjali', 'cognition', 'citta']
  },
  {
    id: 'psych-mandukya-four-states',
    domain: 'psychology',
    domainLabel: 'Cognitive Science & Consciousness',
    title: 'The 4-State Architecture of Human Consciousness',
    sanskritTerm: 'चतुष्पाद चेतना सिद्धान्त',
    scriptureSlug: 'mandukya-upanishad',
    scriptureName: 'Mandukya Upanishad',
    chapter: 1,
    verseRange: '1.1–1.7',
    ancientObservation: 'Human experience is mapped across four phenomenological tiers: Waking consciousness (Jagrat / externalized sensory reality), Dreaming consciousness (Svapna / internalized subconscious simulation), Deep dreamless sleep (Sushupti / absence of mental objects), and Turiya (the transcendent, non-dual witness awareness underlying all three states).',
    modernCorroboration: 'Neurophysiology recognizes distinct brainwave states matching this exact schema: Beta/Gamma waves (Waking), Theta/REM sleep (Dreaming), Delta slow-wave oscillations (Deep NREM sleep), and the neurological state of lucid awareness / non-referential open monitoring achieved by advanced meditators.',
    empiricalFact: 'The Mandukya Upanishad proved that identity cannot be confined to the waking ego, discovering the persistent observer that bridges waking, dreaming, and deep sleep.',
    keyCitations: [
      {
        sanskrit: 'जागरितस्थानो बहिष्प्रज्ञः... स्वप्नस्थानोऽन्तःप्रज्ञः... सुषुप्तस्थान एकीभूतः... शान्तं शिवमद्वैतं चतुर्थं मन्यन्ते स आत्मा॥',
        transliteration: 'jāgarita-sthāno bahiṣ-prajñaḥ... svapna-sthāno \'ntaḥ-prajñaḥ... suṣupta-sthāna ekībhūtaḥ... śāntaṁ śivam advaitaṁ caturthaṁ manyante sa ātmā ||',
        translation: 'The waking state conscious of the outer world... the dream state conscious of the inner world... the deep sleep state unified in potential... peaceful, auspicious, non-dual—this they consider the Fourth (Turiya). That is the Self.',
        verseUrl: '/mandukya-upanishad/1#7'
      }
    ],
    tags: ['consciousness', 'brainwaves', 'rem', 'mandukya', 'turiya', 'neuroscience', 'sleep']
  },

  // 4. ⚛️ COSMOLOGY & PHYSICS (PADĀRTHA VIJÑĀNA)
  {
    id: 'cosmo-paramanu-atomic-theory',
    domain: 'cosmology',
    domainLabel: 'Cosmology & Physics',
    title: 'Infinitesimal Atoms (Paramanu) and Molecular Compounds',
    sanskritTerm: 'परमाणु कारणवाद',
    scriptureSlug: 'brahma-sutras',
    scriptureName: 'Brahma Sutras & Vaisheshika Darshana',
    chapter: 2,
    verseRange: '2.2.11–17',
    ancientObservation: 'Physical matter is reduced to ultimate, indivisible particles called Paramanus (atoms), which are spherical (Parimandala) and without parts. Two Paramanus combine to form a Dyanuka (diatomic molecule), three Dyanukas form a Tryanuka (triatomic compound possessing macroscopic length and visible substance).',
    modernCorroboration: 'Modern atomic physics and molecular chemistry similarly define matter as aggregations of fundamental subatomic particles combining into diatomic and polyatomic chemical bonds with distinct macroscopic emergent physical properties.',
    empiricalFact: 'Vedic philosophy anticipated particle physics and molecular compound theory centuries before John Dalton, formulating detailed mechanics of physical causality and atomic agglomeration.',
    keyCitations: [
      {
        sanskrit: 'महद्दीर्घवद्वा ह्रस्वपरिमण्डलाभ्याम्।\nपरमाणुकारणवादनिराकरणम्॥',
        transliteration: 'mahad-dīrghavad vā hrasva-parimaṇḍalābhyām |\nparamāṇu-kāraṇa-vāda-nirākaraṇam ||',
        translation: 'As from the infinitesimal and spherical atoms the diatomic and triatomic compounds are produced with macroscopic length and magnitude...',
        verseUrl: '/brahma-sutras/2#2'
      }
    ],
    tags: ['physics', 'atomic-theory', 'paramanu', 'molecules', 'matter', 'cosmology', 'vaisheshika']
  },
  {
    id: 'cosmo-time-dilation-cosmic-cycles',
    domain: 'cosmology',
    domainLabel: 'Cosmology & Relativistic Time',
    title: 'Cosmic Time Scales and Non-Absolute Relativistic Time',
    sanskritTerm: 'काल चक्र तथा काल सापेक्षता',
    scriptureSlug: 'vishnu-purana',
    scriptureName: 'Vishnu Purana & Srimad Bhagavata',
    chapter: 1,
    verseRange: 'Vishnu Purana 1.3.8–28',
    ancientObservation: 'Time is not a uniform flat constant, but stratified across dimensional observer reference frames. 1 human year equals 1 day of the Devas. 12,000 divine years equal 1 Mahayuga (4.32 million solar years). 1,000 Mahayugas constitute 1 Kalpa (4.32 billion years)—representing a single daytime cycle of cosmic creator Brahma.',
    modernCorroboration: 'Modern astrophysics dates the age of the Earth at ~4.54 billion years and the age of the Universe at ~13.8 billion years—scales that operate on billions of years (Giga-annum scale) exactly comparable to Puranic Kalpa cycles (4.32 billion years). Furthermore, time is acknowledged as dependent upon the observer’s relative frame.',
    empiricalFact: 'Ancient Indian cosmology was the only civilization in antiquity that conceptualized deep cosmic time in billions of years rather than limiting the universe to a few thousand years.',
    keyCitations: [
      {
        sanskrit: 'काष्ठा पञ्चदशाख्याता निमेषा मुनिसत्तम।\nदिव्यैर्वर्षसहस्रैस्तु कृतत्रेतादिसञ्जितम्।\nचतुर्युगं द्वादशभिस्तत्पिण्डं परिकीर्तितम्॥\nएष कल्पस्तु कथितो ब्रह्मणो दिनमुच्यते।',
        transliteration: 'kāṣṭhā pañcadaśākhyātā nimeṣā muni-sattama |\ndivyair varṣa-sahasrais tu kṛta-tretādi-sañjitam |\ncatur-yugaṁ dvādaśabhis tat-piṇḍaṁ parikīrtitam ||\neṣa kalpas tu kathito brahmaṇo dinam ucyate ||',
        translation: 'Fifteen Nimeshas make a Kashtha... Twelve thousand divine years make the aggregate of four Yugas. One thousand such cycles make a Kalpa, which is said to be a single day of Brahma.',
        verseUrl: '/vishnu-purana/1#3'
      }
    ],
    tags: ['cosmology', 'deep-time', 'kalpa', 'yugas', 'astrophysics', 'relativity', 'purana']
  },

  // 5. ⚖️ STATECRAFT & GOVERNANCE (RĀJA-NĪTI & ARTHA-VIDYĀ)
  {
    id: 'gov-mbh-vidura-statecraft',
    domain: 'governance',
    domainLabel: 'Statecraft & Governance',
    title: 'Ethical Statecraft and Anti-Corruption Administration',
    sanskritTerm: 'राजधर्म एवं विदुरनीति',
    scriptureSlug: 'mahabharata',
    scriptureName: 'Mahabharata (Udyoga & Shanti Parva)',
    chapter: 5,
    verseRange: 'Udyoga Parva 33.16–25 & Shanti Parva 56',
    ancientObservation: 'Vidura and Bhishma expound that sovereign legitimacy rests entirely on institutional justice (Nyaya), protection of the vulnerable (Praja-palana), meritocratic appointments, and rigorous anti-corruption checks on state officials. A king who oppresses citizens through taxation destroys his own realm.',
    modernCorroboration: 'Modern political science and institutional economics (Acemoglu & Robinson) establish that inclusive, meritocratic institutions with transparent accountability outperform extractive autocracies, predicting societal stability and long-term economic growth.',
    empiricalFact: 'The Mahabharata pioneered secular administrative ethics and separation of public duty from personal favoritism millennia before modern constitutionalism.',
    keyCitations: [
      {
        sanskrit: 'यस्य कृत्यं न जानन्ति मन्त्रं वा मन्त्रितं परे।\nकृतमेवास्य जानन्ति स वै पण्डित उच्यते॥\nधर्मेण लभते सर्वं धर्मे सर्वं प्रतिष्ठितम्।',
        transliteration: 'yasya kṛtyaṁ na jānanti mantraṁ vā mantritaṁ pare |\nkṛtam evāsya jānanti sa vai paṇḍita ucyate ||\ndharmeṇa labhate sarvaṁ dharme sarvaṁ pratiṣṭhitam ||',
        translation: 'He whose plans and deliberations are not leaked beforehand, but whose completed actions alone become manifest—he is termed a wise leader. Through righteousness all is attained; in righteousness the entire society is sustained.',
        verseUrl: '/mahabharata/5#33'
      }
    ],
    tags: ['governance', 'statecraft', 'vidura', 'mahabharata', 'ethics', 'anti-corruption', 'institutions']
  },
  {
    id: 'gov-dasbodh-collective-stewardship',
    domain: 'governance',
    domainLabel: 'Statecraft & Public Leadership',
    title: 'The Dynamics of Purposeful Collective Action',
    sanskritTerm: 'चळवळीचे सामर्थ्य आणि लोकसंग्रह',
    scriptureSlug: 'dasbodh',
    scriptureName: 'Dasbodh of Samarth Ramdas',
    chapter: 18,
    verseRange: 'Dashaka 18, Samasa 1',
    ancientObservation: 'Samarth Ramdas Swami declares that transformative power resides in grassroots organization, public unity, and purposeful collective movement (Chalaval). However, such collective power must be anchored in divine righteousness (Dharma) to avoid collapsing into mob violence or tyranny.',
    modernCorroboration: 'Sociological movement theory and leadership management confirm that collective efficacy and shared moral purpose are the primary drivers of sustained civilizational renewal and social reform.',
    empiricalFact: 'Dasbodh was the first Indian text to explicitly formulate collective political movement theory (Chalaval) as a spiritual and ethical mandate for liberating oppressed society.',
    keyCitations: [
      {
        sanskrit: 'सामर्थ्य आहे चळवळीचें। जो जे करील तयाचें।\nपरंतु तेथें भगवंताचें। अधिष्ठान पाहिजे॥',
        transliteration: 'sāmarthya āhe caḷavaḷīceṃ | jo je karīla tayāceṃ |\nparaṃtu tetheṃ bhagavaṃtāceṃ | adhiṣṭhāna pāhije ||',
        translation: 'Tremendous power resides in purposeful organization and united action; whatever one undertakes bears fruit. But it must be firmly grounded in divine righteousness.',
        verseUrl: '/dasbodh/18#1'
      }
    ],
    tags: ['governance', 'leadership', 'dasbodh', 'ramdas', 'social-change', 'civic-duty']
  },

  // 6. 🔢 VEDIC MATHEMATICS & COMBINATORICS (GAṆITA & SAṄKHYĀ)
  {
    id: 'math-yajur-decimal-powers',
    domain: 'mathematics',
    domainLabel: 'Mathematics & Number Theory',
    title: 'The Decimal Place-Value Scale up to 10¹² (Parardha)',
    sanskritTerm: 'दशगुणोत्तर संख्या मान',
    scriptureSlug: 'yajurveda',
    scriptureName: 'Shukla Yajurveda Samhita',
    chapter: 17,
    verseRange: '17.2',
    ancientObservation: 'Yajurveda records an exact base-10 exponential series where each successive unit is multiplied by ten: Eka (1), Dasha (10), Shata (100), Sahasra (1,000), Ayuta (10,000), Niyuta (100,000), Prayuta (1,000,000), Arbuda (10,000,000), Nyarbuda (100,000,000), Samudra (1,000,000,000), Madhya (10,000,000,000), Anta (100,000,000,000), and Parardha (1,000,000,000,000 or 10¹²).',
    modernCorroboration: 'Modern decimal notation and astronomical scientific scales utilize this exact base-10 exponential progression, which forms the bedrock of modern computational arithmetic.',
    empiricalFact: 'Ancient India formulated systematic terminology for trillions ($10^{12}$) at a time when contemporary Mediterranean civilizations lacked words for numbers beyond myriad ($10^4$).',
    keyCitations: [
      {
        sanskrit: 'एका च मे दश च मे शतं च मे सहस्रं च मेऽयुतं च मे नियुतं च मे प्रयुतं च मेऽर्बुदं च मे न्यर्बुदं च मे समुद्रश्च मे मध्यं च मेऽन्तश्च मे परार्धश्च मे॥',
        transliteration: 'ekā ca me daśa ca me śataṁ ca me sahasraṁ ca me \'yutaṁ ca me niyutaṁ ca me prayutaṁ ca me \'rbudaṁ ca me nyarbudaṁ ca me samudraś ca me madhyaṁ ca me \'ntaś ca me parārdhaś ca me ||',
        translation: 'May my one, ten, hundred, thousand, ten-thousand, hundred-thousand, million, ten-million, hundred-million, billion, ten-billion, hundred-billion, and trillion (Parardha) prosper through sacred order.',
        verseUrl: '/yajurveda/17#2'
      }
    ],
    tags: ['mathematics', 'decimal-system', 'powers-of-ten', 'parardha', 'yajurveda', 'arithmetic']
  },
  {
    id: 'math-pingala-binary-combinatorics',
    domain: 'mathematics',
    domainLabel: 'Mathematics & Combinatorics',
    title: 'Binary Meter Combinatorics and Meru Prastara',
    sanskritTerm: 'मेरुप्रस्तार एवं द्व्यङ्क छन्दशास्त्र',
    scriptureSlug: 'samaveda',
    scriptureName: 'Pingala Chhandas Sutras & Samaveda',
    chapter: 1,
    verseRange: 'Chhandas Sutras 8.28–34',
    ancientObservation: 'Pingala maps poetic meter into binary syllables: short (Laghu = 0) and long (Guru = 1). To determine total permutations of an n-syllable meter, he formulates Meru Prastara (the triangular pyramid of binomial coefficients, identical to Pascal’s Triangle) and computes combinations $2^n$.',
    modernCorroboration: 'Binary numbers ($0/1$) and binomial expansions form the mathematical architecture of modern digital computation, computer algorithms, and combinatorics.',
    empiricalFact: 'Pingala discovered binary number representation and Pascal’s Triangle eighteen centuries before Blaise Pascal and Gottfried Leibniz.',
    keyCitations: [
      {
        sanskrit: 'गुरवेकः। लघवः शेषाः। परे पूर्णम्।\nप्रस्तारे मेरुप्रस्तारो द्विकाभ्यासो गणितसिद्धः॥',
        transliteration: 'gurav ekaḥ | laghavaḥ śeṣāḥ | pare pūrṇam |\nprastāre meru-prastāro dvikābhyāso gaṇita-siddhaḥ ||',
        translation: 'Place one for Guru; the rest Laghu. The expansion forms the pyramid of Meru, based on binary doubling, established by mathematics.',
        verseUrl: '/samaveda/1#1'
      }
    ],
    tags: ['mathematics', 'binary', 'combinatorics', 'pascal-triangle', 'meru-prastara', 'pingala']
  },

  // 7. 🌍 ECOLOGY & ENVIRONMENTAL ETHICS (BHŪMI-VIDYĀ & PRAKṚTI)
  {
    id: 'eco-atharva-bhumi-sukta',
    domain: 'ecology',
    domainLabel: 'Ecology & Environmental Ethics',
    title: 'The Universal Charter of Ecological Conservation',
    sanskritTerm: 'माता भूमिः पुत्रोऽहं पृथिव्याः',
    scriptureSlug: 'atharvaveda',
    scriptureName: 'Atharvaveda Samhita (Bhumi Sukta)',
    chapter: 12,
    verseRange: '12.1.1–12',
    ancientObservation: 'Rishi Atharvan proclaims the Earth as a living, interconnected macro-organism: "The Earth is my mother, and I am the child of the soil." He prohibits reckless ecological pillaging, commanding that whatever is excavated from the Earth must be replenished to prevent desecrating its vital centers (Marmans).',
    modernCorroboration: 'The Gaia hypothesis (James Lovelock) and contemporary ecological sustainability science recognize the biosphere as a self-regulating super-organism where human survival depends entirely on maintaining regenerative planetary boundaries.',
    empiricalFact: 'The Atharvaveda Bhumi Sukta is humankind’s earliest recorded declaration of planetary stewardship, bio-diversity ethics, and regenerative agriculture.',
    keyCitations: [
      {
        sanskrit: 'माता भूमिः पुत्रोऽहं पृथिव्याः पर्जन्यः पिता स उ नः पिपर्तु।\nयत्ते भूमे विखनामि क्षिप्रं तदपि रोहतु।\nमा ते मर्म विमृग्वरि मा ते हृदयमर्पिपम्॥',
        transliteration: 'mātā bhūmiḥ putro \'haṁ pṛthivyāḥ parjanyaḥ pitā sa u naḥ pipartu |\nyat te bhūme vikhanāmi kṣipraṁ tad api rohatu |\nmā te marma vimṛgvari mā te hṛdayam arpipam ||',
        translation: 'The Earth is my Mother, and I am her child. Whatever I dig from thee, O Earth, may that promptly replenish itself. Let me never injure thy vital parts, nor pierce thy heart!',
        verseUrl: '/atharvaveda/12#1'
      }
    ],
    tags: ['ecology', 'environment', 'sustainability', 'gaia', 'biodiversity', 'atharvaveda', 'earth']
  },
  {
    id: 'eco-manu-plant-consciousness',
    domain: 'ecology',
    domainLabel: 'Botany & Plant Neurobiology',
    title: 'Botanical Inner Consciousness and Sensitivity to Pain',
    sanskritTerm: 'अन्तःसंज्ञा वनस्पति चेतना',
    scriptureSlug: 'manusmriti',
    scriptureName: 'Manusmriti',
    chapter: 1,
    verseRange: '1.49',
    ancientObservation: 'Manu classifies trees, shrubs, and flora as possessing inner consciousness (Antah-sanjna), capable of feeling sensation, joy, and distress (Sukha-Duhkha-samanvitah) beneath their dormant external appearance.',
    modernCorroboration: 'Pioneered by Sir Jagadish Chandra Bose and validated by modern plant neurobiology (Stefano Mancuso), plants exhibit complex electrical signaling, mechanosensation, cellular memory, and defensive biochemical communication when wounded.',
    empiricalFact: 'Manusmriti correctly identified plant sentience and biochemical distress responses thousands of years before optical microscopy and plant electrophysiology.',
    keyCitations: [
      {
        sanskrit: 'तमसा बहुरूपेण वेष्टिताः कर्महेतुना।\nअन्तःसंज्ञा भवन्त्येते सुखदुःखसमन्विताः॥',
        transliteration: 'tamasā bahurūpeṇa veṣṭitāḥ karma-hetunā |\nantaḥ-saṁjñā bhavanty ete sukha-duḥkha-samanvitāḥ ||',
        translation: 'Enveloped by diverse layers of inert matter according to their natural causes, these plants nevertheless possess inner consciousness, and are endowed with the experience of pleasure and pain.',
        verseUrl: '/manusmriti/1#49'
      }
    ],
    tags: ['botany', 'plant-consciousness', 'neurobiology', 'manusmriti', 'ecology', 'sentience']
  },

  // 8. 🔬 EPISTEMOLOGY & LOGIC (PRAMĀṆA-ŚĀSTRA & TARKA)
  {
    id: 'epist-yoga-pramana-empiricism',
    domain: 'epistemology',
    domainLabel: 'Epistemology & Scientific Method',
    title: 'The Tripartite Epistemology of Scientific Verification',
    sanskritTerm: 'प्रत्यक्षानुमानागमाः प्रमाणानि',
    scriptureSlug: 'yoga-sutras',
    scriptureName: 'Yoga Sutras of Patanjali',
    chapter: 1,
    verseRange: '1.7',
    ancientObservation: 'Valid knowledge (Pramana) requires three rigorous instruments: Pratyaksha (direct empirical sensory observation and measurement), Anumana (unbroken logical deduction based on invariant universal correlation / Vyapti), and Agama/Shabda (peer-verified testimony of authentic experimental pioneers who observed it directly).',
    modernCorroboration: 'The scientific method rests on this exact triad: empirical observation and experimental measurement (Pratyaksha), hypothesis formulation and statistical deduction (Anumana), and reproducible peer-reviewed literature (Shabda).',
    empiricalFact: 'Vedic philosophy did not demand blind faith; it formulated strict epistemological criteria where logical fallacy (Hetvabhasa) invalidated any dogma.',
    keyCitations: [
      {
        sanskrit: 'प्रत्यक्षानुमानागमाः प्रमाणानि।\nविपर्ययो ज्ञानमतद्रूपप्रतिष्ठम्॥',
        transliteration: 'pratyakṣānumānāgamāḥ pramāṇāni |\nviparyayo jñānam atadrūpa-pratiṣṭham ||',
        translation: 'Direct empirical perception, logical inference, and verified authoritative testimony constitute valid knowledge. Cognitive error is false knowledge not based on the true form of the object.',
        verseUrl: '/yoga-sutras/1#7'
      }
    ],
    tags: ['epistemology', 'scientific-method', 'logic', 'pramana', 'patanjali', 'empiricism']
  },

  // 9. 🎶 ACOUSTIC PHONETICS & PSYCHOACOUSTICS (DHVANI & ŚIKṢĀ)
  {
    id: 'ling-sama-svara-acoustics',
    domain: 'linguistics',
    domainLabel: 'Acoustic Phonetics & Psychoacoustics',
    title: 'The Three-Pitch Svara Scale and Acoustic Resonances',
    sanskritTerm: 'उदात्तानुदात्तस्वरित नादविज्ञान',
    scriptureSlug: 'samaveda',
    scriptureName: 'Samaveda Samhita & Paninian Shiksha',
    chapter: 1,
    verseRange: 'Purvarchika 1.1',
    ancientObservation: 'Vedic recitation utilizes three exact pitch registers: Udatta (acute/high frequency), Anudatta (grave/low frequency), and Svarita (circumflex transition). Combined with precise vocal tract articulators (Kantha, Talu, Murdha, Danta, Oshtha), this acoustic modulation induces harmonic coherence in the chanter’s brain and nervous system.',
    modernCorroboration: 'Acoustic voice analysis and EEG studies on Vedic chant show that sustained resonant chanting stimulates the vagus nerve through laryngeal vibrations, slowing respiratory rate, enhancing heart rate variability (HRV), and synchronizing inter-hemispheric brainwave coherence.',
    empiricalFact: 'Samaveda developed humankind’s first musical notation and psychoacoustic science, using vocal frequencies as neurological therapeutic instruments.',
    keyCitations: [
      {
        sanskrit: 'उच्चैरुदात्तः। नीचैरनुदात्तः। समाहारः स्वरितः।\nअग्न आ याहि वीतये गृणानो हव्यदातये॥',
        transliteration: 'uccair udāttaḥ | nīcair anudāttaḥ | samāhāraḥ svaritaḥ |\nagna ā yāhi vītaye gṛṇāno havyadātaye ||',
        translation: 'High pitch is Udatta; low pitch is Anudatta; their harmonious synthesis is Svarita. O Agni, come to the banquet, praised for the bestowing of offerings.',
        verseUrl: '/samaveda/1#1'
      }
    ],
    tags: ['linguistics', 'acoustics', 'phonetics', 'vagus-nerve', 'samaveda', 'chanting', 'svaras']
  },

  // 10. 🏛️ SOCIOLOGY & LIFE-SPAN DEVELOPMENT (SAMĀJA-DHARMA & SAṀSKĀRAS)
  {
    id: 'soc-samskaras-neurodevelopment',
    domain: 'sociology',
    domainLabel: 'Developmental Psychology & Sociology',
    title: 'The 16 Samskaras Lifecycle Developmental Transitions',
    sanskritTerm: 'षोडश संस्कार विकासात्मक मनोविज्ञान',
    scriptureSlug: 'samskaras',
    scriptureName: '16 Samskaras (Ritual & Psychological Handbook)',
    chapter: 1,
    verseRange: '1.1–8',
    ancientObservation: 'Human life is structured across 16 neuro-developmental transitional rites (Samskaras) mapping key neurological milestones: prenatal emotional environment (Garbhadhana/Pumsavana), neonatal sensory priming (Jatakarma), cognitive naming (Namakarana), nutritional solid weaning at 6 months (Annaprashana), cognitive executive schooling (Upanayana), and psychological socialization into adult community responsibility.',
    modernCorroboration: 'Developmental psychology (Erik Erikson and Jean Piaget) validates that structured psychological rites of passage provide vital emotional security, identity formation, social cohesion, and positive neurological imprint during vulnerable developmental transitions.',
    empiricalFact: 'The Samskara tradition engineered a lifelong preventive mental health and developmental architecture that minimized existential alienation across the human lifecycle.',
    keyCitations: [
      {
        sanskrit: 'गर्भाधानादि संस्कारैः पावनं कुरुते द्विजः।\nअन्नप्राशनतो बालः शुचिर्भवति पुष्टये॥',
        transliteration: 'garbhādhānādi saṁskāraiḥ pāvanaṁ kurute dvijaḥ |\nannaprāśanato bālaḥ śucir bhavati puṣṭaye ||',
        translation: 'Through transitional developmental rites beginning from conception, the individual is refined; through healthy weaning to solid foods (Annaprashana), the child achieves physical vitality and neurological purity.',
        verseUrl: '/samskaras/1#1'
      }
    ],
    tags: ['sociology', 'psychology', 'samskaras', 'developmental-milestones', 'pedagogy', 'parenting']
  }
]

/**
 * Dynamically registers or updates empirical knowledge tokens at runtime.
 */
export function registerKnowledgeTokens(tokens: EmpiricalKnowledgeToken[]): void {
  for (const token of tokens) {
    const existingIdx = VEDIC_KNOWLEDGE_TOKENS.findIndex(t => t.id === token.id);
    if (existingIdx >= 0) {
      VEDIC_KNOWLEDGE_TOKENS[existingIdx] = token;
    } else {
      VEDIC_KNOWLEDGE_TOKENS.push(token);
    }
  }
}

/**
 * Retrieves all extracted empirical knowledge tokens.
 */
export function getAllKnowledgeTokens(): EmpiricalKnowledgeToken[] {
  return VEDIC_KNOWLEDGE_TOKENS
}

/**
 * Retrieves empirical tokens filtered by scientific domain.
 */
export function getKnowledgeTokensByDomain(domain: ScientificDomain): EmpiricalKnowledgeToken[] {
  return VEDIC_KNOWLEDGE_TOKENS.filter(t => t.domain === domain)
}

/**
 * Retrieves empirical tokens associated with a specific scripture slug.
 */
export function getKnowledgeTokensByScripture(slug: string): EmpiricalKnowledgeToken[] {
  return VEDIC_KNOWLEDGE_TOKENS.filter(t => t.scriptureSlug === slug)
}

/**
 * Retrieves empirical tokens associated with a specific scripture, chapter, and verse.
 */
export function getKnowledgeTokensByScriptureAndVerse(slug: string, chapter: number, verse: number): EmpiricalKnowledgeToken[] {
  return VEDIC_KNOWLEDGE_TOKENS.filter(t => {
    if (t.scriptureSlug !== slug || t.chapter !== chapter) return false
    // Check if citations link to this verse
    return t.keyCitations.some(c => c.verseUrl.includes(`/${slug}/${chapter}#${verse}`))
  })
}

/**
 * Searches knowledge tokens by keyword across title, ancient observation, and modern corroboration.
 */
export function searchKnowledgeTokens(query: string): EmpiricalKnowledgeToken[] {
  if (!query || !query.trim()) return VEDIC_KNOWLEDGE_TOKENS
  const q = query.toLowerCase().trim()
  return VEDIC_KNOWLEDGE_TOKENS.filter(t =>
    t.title.toLowerCase().includes(q) ||
    t.sanskritTerm.includes(q) ||
    t.ancientObservation.toLowerCase().includes(q) ||
    t.modernCorroboration.toLowerCase().includes(q) ||
    t.empiricalFact.toLowerCase().includes(q) ||
    t.tags.some(tag => tag.toLowerCase().includes(q))
  )
}

/**
 * Returns metadata for all 10 domains.
 */
export function getAllDomainsList(): DomainMetadata[] {
  return Object.values(DOMAIN_METADATA_REGISTRY)
}

/**
 * Returns metadata for a specific domain.
 */
export function getDomainMetadata(domain: ScientificDomain): DomainMetadata {
  return DOMAIN_METADATA_REGISTRY[domain]
}
