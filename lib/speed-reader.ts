/**
 * Tattva Saṁgraha (Vedic Essence / 1-Hour Speed Reader Engine)
 *
 * Provides pre-computed, verified executive digests for rapid learners.
 * Distills extensive canonical texts into a 45–60 minute reading flow:
 * - Prastāvanā: Historical crisis, seeker, preceptor, and central inquiry
 * - Pramukha Ślokas: 6–10 pinnacle signpost verses with Sanskrit, translation, and 1-click deep-dive links
 * - Siddhānta Saṁgraha: 3–4 foundational philosophical pillars
 * - Sādhanā Prayoga: Actionable daily contemplation and lifestyle application
 *
 * Governed by ADR-006 (Zero runtime LLM latency, 100% authentic citations).
 */

export interface SignpostVerse {
  chapter: number
  verse: number
  sanskrit: string
  transliteration: string
  translation: string
  essence: string
  actionableTakeaway: string
  deepDiveUrl: string
}

export interface PhilosophicalPillar {
  title: string
  sanskritTerm: string
  definition: string
  keyVerseCitation: string
}

export interface TattvaSamgrahaDigest {
  id: string
  slug: string
  title: string
  sanskritTitle: string
  category: 'Smriti & Itihasa' | 'Mukhya Upanishad' | 'Yoga Darshana' | 'Puranic Heritage'
  estimatedReadMinutes: number
  totalOriginalVerses: number
  crisisAndContext: {
    seeker: string
    preceptor: string
    setting: string
    centralQuestion: string
    coreInsight: string
  }
  signpostVerses: SignpostVerse[]
  philosophicalPillars: PhilosophicalPillar[]
  sadhanaTakeaways: string[]
  historicalImpact: string
}

export const TATTVA_SAMGRAHA_DIGESTS: Record<string, TattvaSamgrahaDigest> = {
  'bhagavad-gita': {
    id: 'bhagavad-gita',
    slug: 'bhagavad-gita',
    title: 'Bhagavad Gita',
    sanskritTitle: 'श्रीमद्भगवद्गीता',
    category: 'Smriti & Itihasa',
    estimatedReadMinutes: 50,
    totalOriginalVerses: 701,
    crisisAndContext: {
      seeker: 'Arjuna (The heroic Pandava archer)',
      preceptor: 'Bhagavan Sri Krishna (The Supreme Divinity / Avatara)',
      setting: 'The battlefield of Kurukshetra, poised between two colossal armies on the cusp of war',
      centralQuestion: 'How can an ethical person act in a world where every choice brings grief, duty clashes with affection, and moral paralysis strikes?',
      coreInsight: 'You are the immortal Atman, not this perishable body. Perform your prescribed duty (Svadharma) with equanimity, without attachment to fruit, offering all action to the Divine.'
    },
    signpostVerses: [
      {
        chapter: 2,
        verse: 20,
        sanskrit: 'न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः।\nअजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे॥',
        transliteration: 'na jāyate mriyate vā kadācin nāyaṁ bhūtvā bhavitā vā na bhūyaḥ |\najo nityaḥ śāśvato \'yaṁ purāṇo na hanyate hanyamāne śarīre ||',
        translation: 'The soul is never born nor does it ever die; nor having once existed does it ever cease to be. It is unborn, eternal, ever-existing, and primeval. It is not slain when the body is slain.',
        essence: 'The indestructible nature of the Self (Atman) destroys existential grief and fear of death.',
        actionableTakeaway: 'When overwhelmed by anxiety or loss, anchor your identity in the unshakeable, eternal observer within rather than fluctuating external circumstances.',
        deepDiveUrl: '/bhagavad-gita/2#20'
      },
      {
        chapter: 2,
        verse: 47,
        sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
        transliteration: 'karmaṇy evādhikāras te mā phaleṣu kadācana |\nmā karma-phala-hetur bhūr mā te saṅgo \'stv akarmaṇi ||',
        translation: 'You have a right only to perform your prescribed duty, but never to the fruits of action. Never consider yourself the cause of results, nor let your attachment be to inaction.',
        essence: 'The golden formula of Karma Yoga: 100% effort, zero anxious entitlement to outcomes.',
        actionableTakeaway: 'Focus completely on the quality and integrity of your present action. Release mental rumination over praise, blame, profit, or failure.',
        deepDiveUrl: '/bhagavad-gita/2#47'
      },
      {
        chapter: 4,
        verse: 38,
        sanskrit: 'न हि ज्ञानेन सदृशं पवित्रमिह विद्यते।\nतत्स्वयं योगसंसिद्धः कालेनात्मनि विन्दति॥',
        transliteration: 'na hi jñānena sadṛśaṁ pavitram iha vidyate |\ntat svayaṁ yoga-saṁsiddhaḥ kālenātmani vindati ||',
        translation: 'In this world, there is nothing so sublime and pure as transcendental knowledge. One who becomes perfected through yoga discovers this within the Self in due course of time.',
        essence: 'Direct experiential knowledge of reality (Jnana) is the supreme purifier of all mental agitation.',
        actionableTakeaway: 'Commit at least 15 minutes daily to sacred scriptural inquiry and self-reflection to clear cognitive delusions.',
        deepDiveUrl: '/bhagavad-gita/4#38'
      },
      {
        chapter: 6,
        verse: 5,
        sanskrit: 'उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥',
        transliteration: 'uddhared ātmanātmānaṁ nātmānam avasādayet |\nātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ ||',
        translation: 'One must elevate oneself by one\'s own mind, not degrade oneself. The mind is indeed one\'s own best friend, and the mind alone is one\'s worst enemy.',
        essence: 'Radical personal accountability and self-mastery through disciplined mental regulation.',
        actionableTakeaway: 'Train your inner dialog: be a supportive mentor to your own mind rather than a harsh self-critic or passive indulger.',
        deepDiveUrl: '/bhagavad-gita/6#5'
      },
      {
        chapter: 12,
        verse: 15,
        sanskrit: 'यस्मान्नोद्विजते लोको लोकान्नोद्विजते च यः।\nहर्षामर्षभयोद्वेगैर्मुक्तो यः स च मे प्रियः॥',
        transliteration: 'yasmān nodvijate loko lokān nodvijate ca yaḥ |\nharṣāmarṣa-bhayodvegair mukto yaḥ sa ca me priyaḥ ||',
        translation: 'He by whom the world is not agitated and who cannot be agitated by the world, who is freed from joy, envy, fear, and anxiety—he is dearly beloved to Me.',
        essence: 'The benchmark of genuine spiritual maturity: emotional tranquility and harmlessness to all beings.',
        actionableTakeaway: 'Neither react defensively to external provocations nor create friction in the lives of those around you.',
        deepDiveUrl: '/bhagavad-gita/12#15'
      },
      {
        chapter: 18,
        verse: 66,
        sanskrit: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥',
        transliteration: 'sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja |\nahaṁ tvā sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ ||',
        translation: 'Abandoning all varieties of dharmas, surrender unto Me alone. I shall liberate you from all sinful reactions; do not grieve.',
        essence: 'The supreme culmination: unconditional surrender (Sharanagati) to the Divine dissolves all fear and guilt.',
        actionableTakeaway: 'Surrender the burden of micro-managing life\'s cosmic outcomes. Rest in trusting faith with peaceful certainty.',
        deepDiveUrl: '/bhagavad-gita/18#66'
      }
    ],
    philosophicalPillars: [
      {
        title: 'Nishkama Karma (Selfless Action)',
        sanskritTerm: 'निष्काम कर्म',
        definition: 'Performing duty without egoistic desire for personal reward, neutralizing the binding accumulation of karma.',
        keyVerseCitation: 'BG 2.47'
      },
      {
        title: 'Sthitaprajna (Equanimity of Mind)',
        sanskritTerm: 'स्थितप्रज्ञ',
        definition: 'The illuminated sage whose intellect is steady, unmoved by pleasure and pain, praise and reproach.',
        keyVerseCitation: 'BG 2.56'
      },
      {
        title: 'Trigunatita (Transcending the 3 Gunas)',
        sanskritTerm: 'त्रिगुणातीत',
        definition: 'Rising above the cosmic modalities of Sattva (purity), Rajas (passion), and Tamas (inertia) into pure consciousness.',
        keyVerseCitation: 'BG 14.22–25'
      },
      {
        title: 'Sharanagati (Universal Surrender)',
        sanskritTerm: 'शरणागति',
        definition: 'Complete self-dedication to the Divine, recognizing God as the sole shelter, refuge, and innermost reality.',
        keyVerseCitation: 'BG 18.66'
      }
    ],
    sadhanaTakeaways: [
      'Begin each morning dedicating every impending meeting, work task, and chore as a sacred offering (Yajna).',
      'Whenever feeling irritation or pride, observe the three Gunas operating instead of personalizing the reaction.',
      'End the night reviewing actions with the lens of BG 2.47: Did I do my best, and did I let go of the result?'
    ],
    historicalImpact: 'From Shankara to Gandhi, Thoreau to Oppenheimer, the Gita has served as humanity\'s premier guide for decisive ethical action in times of crisis.'
  },

  'isha-upanishad': {
    id: 'isha-upanishad',
    slug: 'isha-upanishad',
    title: 'Isha Upanishad',
    sanskritTitle: 'ईशावास्योपनिषद्',
    category: 'Mukhya Upanishad',
    estimatedReadMinutes: 20,
    totalOriginalVerses: 18,
    crisisAndContext: {
      seeker: 'The spiritual seeker facing the dichotomy of renunciation versus worldly engagement',
      preceptor: 'Shukla Yajurveda Canonical Rishi',
      setting: 'The closing chapter (40th Adhyaya) of the Shukla Yajurveda Samhita',
      centralQuestion: 'Can one participate in worldly action and family life without becoming ensnared in materialism and spiritual ignorance?',
      coreInsight: 'All this changing universe is enveloped by the Supreme Lord. Enjoy life through detachment, and do not covet anyone\'s wealth.'
    },
    signpostVerses: [
      {
        chapter: 1,
        verse: 1,
        sanskrit: 'ॐ ईशा वास्यमिदं सर्वं यत्किञ्च जगत्यां जगत्।\nतेन त्यक्तेन भुञ्जीथा मा गृधः कस्यस्विद्धनम्॥',
        transliteration: 'oṁ īśā vāsyam idaṁ sarvaṁ yat kiñca jagatyāṁ jagat |\ntena tyaktena bhuñjīthā mā gṛdhaḥ kasya svid dhanam ||',
        translation: 'All this—whatever moves in this moving world—is enveloped by the Supreme Lord. Enjoy through renunciation; do not covet anyone\'s wealth.',
        essence: 'The foundation of sacred ecology and ethical consumption: everything belongs to the Divine.',
        actionableTakeaway: 'Approach possessions not as absolute owner, but as a temporary custodian entrusted with sacred stewardship.',
        deepDiveUrl: '/isha-upanishad/1#1'
      },
      {
        chapter: 1,
        verse: 6,
        sanskrit: 'यस्तु सर्वाणि भूतान्यात्मन्येवानुपश्यति।\nसर्वभूतेषु चात्मानं ततो न विजुगुप्सते॥',
        transliteration: 'yas tu sarvāṇi bhūtāny ātmany evānupaśyati |\nsarva-bhūteṣu cātmānaṁ tato na vijugupsate ||',
        translation: 'He who sees all beings in the Self alone, and the Self in all beings, feels no hatred or revulsion toward anyone.',
        essence: 'Universal empathy through realization of non-dual consciousness.',
        actionableTakeaway: 'Whenever you feel aversion or resentment toward someone, remind yourself: The same life-force animates them.',
        deepDiveUrl: '/isha-upanishad/1#6'
      },
      {
        chapter: 1,
        verse: 16,
        sanskrit: 'पूषन्नेकर्षे यम सूर्य प्राजापत्य व्यूह रश्मीन्समूह तेजः।\nयत्ते रूपं कल्याणतमं तत्ते पश्यामि योऽसावसौ पुरुषः सोऽहमस्मि॥',
        transliteration: 'pūṣann ekarṣe yama sūrya prājāpatya vyūha raśmīn samūha tejaḥ |\nyat te rūpaṁ kalyāṇatamaṁ tat te paśyāmi yo \'sāv asau puruṣaḥ so \'ham asmi ||',
        translation: 'O Sun, sole seer, ordainer, gather thy rays and withdraw thy blinding light! That most auspicious form of thine I behold: that Supreme Person yonder, He indeed I am (So\'ham asmi).',
        essence: 'The triumphant exclamation of non-dual identity: "I am That Supreme Reality!"',
        actionableTakeaway: 'Meditate on the inner sun of awareness with the gentle rhythmic breath mantra "So-Ham".',
        deepDiveUrl: '/isha-upanishad/1#16'
      }
    ],
    philosophicalPillars: [
      {
        title: 'Ishavasya (All-Pervading Lord)',
        sanskritTerm: 'ईशावास्य',
        definition: 'Every atom and conscious being in the cosmos is sanctified by the indwelling Divine presence.',
        keyVerseCitation: 'Isha 1'
      },
      {
        title: 'Vidya & Avidya Harmony',
        sanskritTerm: 'विद्या-अविद्या समन्वय',
        definition: 'Synthesizing empirical practical sciences (Avidya) with transcendental wisdom (Vidya) to live a full and liberated life.',
        keyVerseCitation: 'Isha 11'
      },
      {
        title: 'So-Ham (Non-Dual Identity)',
        sanskritTerm: 'सोऽहमस्मि',
        definition: 'The realization that the supreme cosmic consciousness is identical with one\'s innermost Self.',
        keyVerseCitation: 'Isha 16'
      }
    ],
    sadhanaTakeaways: [
      'Practice mindful moderation: take only what is needed and leave the remainder intact.',
      'Treat nature and fellow creatures with sacred reverence as manifestations of Isha.'
    ],
    historicalImpact: 'Gandhi declared that if all the scriptures of India were burned and only the first verse of the Isha Upanishad remained, Hinduism would survive intact.'
  },

  'kena-upanishad': {
    id: 'kena-upanishad',
    slug: 'kena-upanishad',
    title: 'Kena Upanishad',
    sanskritTitle: 'केनोपनिषद्',
    category: 'Mukhya Upanishad',
    estimatedReadMinutes: 20,
    totalOriginalVerses: 34,
    crisisAndContext: {
      seeker: 'An earnest student of epistemology asking about the prime mover of consciousness',
      preceptor: 'The Vedic Sage of the Samaveda (Talavakara tradition)',
      setting: 'A quiet forest ashrama dialogue',
      centralQuestion: 'By whom (Kena) directed does the mind think? By whose command does the first breath move? By whom is speech uttered? What god directs the eye and the ear?',
      coreInsight: 'Brahman is not an object that the mind or senses can perceive; Brahman is the conscious awareness by which mind, eye, and speech are able to operate.'
    },
    signpostVerses: [
      {
        chapter: 1,
        verse: 1,
        sanskrit: 'केनेषितं पतति प्रेषितं मनः केन प्राणः प्रथमः प्रैति युक्तः।\nकेनेषितां वाचमिमां वदन्ति चक्षुः श्रोत्रं क उ देवो युनक्ति॥',
        transliteration: 'keneṣitaṁ patati preṣitaṁ manaḥ kena prāṇaḥ prathamaḥ praiti yuktaḥ |\nkeneṣitāṁ vācam imāṁ vadanti cakṣuḥ śrotraṁ ka u devo yunakti ||',
        translation: 'Willed by whom does the mind alight on its objects? Enjoined by whom does the first life-breath stir? Directed by whom do men utter this speech? What divine power prompts the eye and the ear?',
        essence: 'The foundational inquiry of cognitive epistemology: identifying the primary witness of experience.',
        actionableTakeaway: 'Step back from what you are thinking or seeing, and ask: "Who is the silent observer witnessing this?"',
        deepDiveUrl: '/kena-upanishad/1#1'
      },
      {
        chapter: 1,
        verse: 5,
        sanskrit: 'यन्मनसा न मनुते येनाहुर्मनो मतम्।\nतदेव ब्रह्म त्वं विद्धि नेदं यदिदमुपासते॥',
        transliteration: 'yan manasā na manute yenāhur mano matam |\ntad eva brahma tvaṁ viddhi nedaṁ yad idam upāsate ||',
        translation: 'That which cannot be thought of by the mind, but by which the mind itself is thought—know that alone to be Brahman, and not this which people worship here.',
        essence: 'Brahman is the subject of all cognition, not an objectifiable mental concept or finite idol.',
        actionableTakeaway: 'Do not seek enlightenment as a future prize to acquire; recognize the ever-present awareness right now.',
        deepDiveUrl: '/kena-upanishad/1#5'
      },
      {
        chapter: 2,
        verse: 4,
        sanskrit: 'प्रतिबोधविदितं मतममृतत्वं हि विन्दते।\nआत्मना विन्दते वीर्यं विद्यया विन्दतेऽमृतम्॥',
        transliteration: 'pratibodha-viditaṁ matam amṛtatvaṁ hi vindate |\nātmanā vindate vīryaṁ vidyayā vindate \'mṛtam ||',
        translation: 'Brahman is truly known when it is apprehended in every single state of consciousness (Pratibodha). Through such knowledge, one attains immortality.',
        essence: 'Realization is accessible in every continuous perception, waking, dreaming, or silent.',
        actionableTakeaway: 'In every visual image, sound, or thought, acknowledge the silent awareness illuminating it.',
        deepDiveUrl: '/kena-upanishad/2#4'
      }
    ],
    philosophicalPillars: [
      {
        title: 'Pratibodha (Awareness in Every State)',
        sanskritTerm: 'प्रतिबोधविदितम्',
        definition: 'Recognizing that conscious awareness is the unchanging substratum underlying every momentary sensory impression.',
        keyVerseCitation: 'Kena 2.4'
      },
      {
        title: 'The Yaksha Parable',
        sanskritTerm: 'यक्षोपाख्यान',
        definition: 'Agni cannot burn a blade of grass and Vayu cannot blow it away without Brahman\'s power, destroying egoistic self-importance.',
        keyVerseCitation: 'Kena 3.1–12'
      }
    ],
    sadhanaTakeaways: [
      'Practice sensory inquiry: "I am aware of sounds, therefore I am not the sound; I am the listener."',
      'Humble the ego by recalling that intellect, talent, and energy flow from cosmic source, not personal manufacture.'
    ],
    historicalImpact: 'The Kena provided Shankara with his quintessential epistemological proofs distinguishing pure consciousness from mental modifications.'
  },

  'katha-upanishad': {
    id: 'katha-upanishad',
    slug: 'katha-upanishad',
    title: 'Katha Upanishad',
    sanskritTitle: 'कठोपनिषद्',
    category: 'Mukhya Upanishad',
    estimatedReadMinutes: 35,
    totalOriginalVerses: 119,
    crisisAndContext: {
      seeker: 'Nachiketa, a courageous young seeker given to Death by his angry father',
      preceptor: 'Yamaraja (Lord Yama, Lord of Death and Guardian of Cosmic Order)',
      setting: 'The Halls of Death after Nachiketa fasted for three nights without hospitality',
      centralQuestion: 'When a human being dies, some say they continue to exist, and others say they cease completely. What is the truth beyond death?',
      coreInsight: 'Beyond body, senses, mind, and intellect dwells the immortal Atman. Choosing the Good (Shreyas) over the Pleasurable (Preyas) leads to eternal freedom.'
    },
    signpostVerses: [
      {
        chapter: 1,
        verse: 2,
        sanskrit: 'अन्यच्छ्रेयोऽन्यदुतैव प्रेयस्ते उभे नानार्थे पुरुषँ सिनीतः।\nतयोः श्रेय आददानस्य साधु भवति हीयतेऽर्थाद्य उ प्रेयो वृणीते॥',
        transliteration: 'anyac chreyo \'nyad utaiva preyas te ubhe nānārthe puruṣaṁ sinītaḥ |\ntayoḥ śreya ādadānasya sādhu bhavati hīyate \'rthād ya u preyo vṛṇīte ||',
        translation: 'The good (Shreyas) is one thing, and the pleasant (Preyas) is another. Both bind humans to different ends. It is well with him who clings to the good; but he who chooses the pleasant misses the goal of life.',
        essence: 'The ultimate fork in human decision-making: moral excellence vs. momentary gratification.',
        actionableTakeaway: 'When making a major decision, ask: "Am I choosing this because it is easy and comfortable (Preyas), or because it is genuinely worthy and right (Shreyas)?"',
        deepDiveUrl: '/katha-upanishad/1#2'
      },
      {
        chapter: 3,
        verse: 3,
        sanskrit: 'आत्मानँ रथिनं विद्धि शरीरँ रथमेव तु।\nबुद्धिं तु सारथिं विद्धि मनः प्रग्रहमेव च॥',
        transliteration: 'ātmānaṁ rathinaṁ viddhi śarīraṁ ratham eva tu |\nbuddhiṁ tu sārathiṁ viddhi manaḥ pragraham eva ca ||',
        translation: 'Know the Self as the lord of the chariot, the body as the chariot itself, the intellect as the charioteer, and the mind as the reins.',
        essence: 'The celebrated Chariot Metaphor: the architecture of human consciousness and self-control.',
        actionableTakeaway: 'Empower your discriminative intellect (Buddhi) to hold the reins of the mind firmly, guiding the sensory horses wisely.',
        deepDiveUrl: '/katha-upanishad/3#3'
      },
      {
        chapter: 3,
        verse: 14,
        sanskrit: 'उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत।\nक्षुरस्य धारा निशिता दुरत्यया दुर्गं पथस्तत्कवयो वदन्ति॥',
        transliteration: 'uttiṣṭhata jāgrata prāpya varān nibodhata |\nkṣurasya dhārā niśitā duratyayā durgaṁ pathas tat kavayo vadanti ||',
        translation: 'Arise! Awake! Approach the great teachers and learn the truth! Sharp as a razor\'s edge and difficult to cross, say the wise, is this path.',
        essence: 'The immortal clarion call of spiritual urgency popularized by Swami Vivekananda.',
        actionableTakeaway: 'Stop procrastinating your inner awakening. Dedicate yourself today with courage and unwavering focus.',
        deepDiveUrl: '/katha-upanishad/3#14'
      }
    ],
    philosophicalPillars: [
      {
        title: 'Shreyas vs. Preyas',
        sanskritTerm: 'श्रेयः प्रेयः विवेक',
        definition: 'The fundamental ethical discernment between long-term spiritual liberation and short-term sensory pleasure.',
        keyVerseCitation: 'Katha 1.2.1–2'
      },
      {
        title: 'The Chariot Model of Mind',
        sanskritTerm: 'रथरूपक',
        definition: 'Self (Master) -> Intellect (Driver) -> Mind (Reins) -> Senses (Horses) -> Sense Objects (Road).',
        keyVerseCitation: 'Katha 1.3.3–9'
      }
    ],
    sadhanaTakeaways: [
      'Conduct a daily "Razor\'s Edge" check: Did my mind control my actions, or did my senses drive my mind?',
      'Contemplate mortality: Remembering death puts petty anxieties into instantaneous cosmic proportion.'
    ],
    historicalImpact: 'The Katha Upanishad inspired Ralph Waldo Emerson\'s transcendentalist poetry and Swami Vivekananda\'s youth movement across the world.'
  },

  'mandukya-upanishad': {
    id: 'mandukya-upanishad',
    slug: 'mandukya-upanishad',
    title: 'Mandukya Upanishad',
    sanskritTitle: 'माण्डूक्योपनिषद्',
    category: 'Mukhya Upanishad',
    estimatedReadMinutes: 15,
    totalOriginalVerses: 12,
    crisisAndContext: {
      seeker: 'The philosopher seeking the most concise master-key to total liberation',
      preceptor: 'Sage Mandukya (Atharvaveda tradition)',
      setting: 'A concise 12-mantra treatise on the sacred syllable OM and the 4 states of consciousness',
      centralQuestion: 'How can the entirety of existence and the absolute Self be understood in a single sound and analytical framework?',
      coreInsight: 'OM is all this. The Self has four quarters: Waking (A), Dreaming (U), Deep Sleep (M), and the Silence beyond (Turiya) which is non-dual peace.'
    },
    signpostVerses: [
      {
        chapter: 1,
        verse: 1,
        sanskrit: 'ओमित्येतदक्षरमिदँ सर्वं तस्योपव्याख्यानं भूतं भवद्भवविष्यदिति सर्वमोङ्कार एव।\nयच्चान्यत्त्रिकालातीतं तदप्योङ्कार एव॥',
        transliteration: 'om ity etad akṣaram idaṁ sarvaṁ tasyopavyākhyānaṁ bhūtaṁ bhavad bhaviṣyad iti sarvam oṅkāra eva |\nyac cānyat trikālātītaṁ tad apy oṅkāra eva ||',
        translation: 'OM—this imperishable syllable is all this. Its further explanation: what was, what is, and what will be—all is verily OM. And whatever else transcends the threefold time, that too is verily OM.',
        essence: 'The primordial sonic vibration encapsulates past, present, future, and eternity.',
        actionableTakeaway: 'Chant OM slowly, feeling its vibration resonate from abdomen (A), chest (U), head (M), into resting silence.',
        deepDiveUrl: '/mandukya-upanishad/1#1'
      },
      {
        chapter: 1,
        verse: 7,
        sanskrit: 'नान्तःप्रज्ञं न बहिष्प्रज्ञं नोभयतःप्रज्ञं न प्रज्ञानघनं न प्रज्ञं नाप्रज्ञम्।\nअदृष्टमव्यवहार्यमग्राह्यमलक्षणमचिन्त्यमव्यपदेश्यमेकात्मप्रत्ययसारं प्रपञ्चोपशमं शान्तं शिवमद्वैतं चतुर्थं मन्यन्ते स आत्मा स विज्ञेयः॥',
        transliteration: 'nāntaḥ-prajñaṁ na bahiṣ-prajñaṁ nobhayataḥ-prajñaṁ na prajñāna-ghanaṁ na prajñaṁ nāprajñam |\nadṛṣṭam avyavahāryam agrāhyam alakṣaṇam acintyam avyapadeśyam ekātma-pratyaya-sāraṁ prapañcopaśamaṁ śāntaṁ śivam advaitaṁ caturthaṁ manyante sa ātmā sa vijñeyaḥ ||',
        translation: 'Neither conscious of the inner world, nor of the outer, nor of both; neither a mass of consciousness, nor simple consciousness, nor unconsciousness. Unseen, beyond transactions, ungraspable, without distinguishing marks, unthinkable, indescribable; its essence the certainty of the one Self; the cessation of the world-illusion, peaceful, auspicious, non-dual—this they consider the Fourth (Turiya). That is the Self; That is to be realized.',
        essence: 'The pinnacle description of Turiya: pure, transcendent, auspicious, non-dual awareness.',
        actionableTakeaway: 'In meditation, rest in the silent gap between two breaths or two thoughts. That stillness is Turiya.',
        deepDiveUrl: '/mandukya-upanishad/1#7'
      }
    ],
    philosophicalPillars: [
      {
        title: 'The Four Quarters of Consciousness (Chatushpad)',
        sanskritTerm: 'चतुष्पाद आत्मा',
        definition: '1. Vaishvanara (Waking) -> 2. Taijasa (Dreaming) -> 3. Prajna (Deep Sleep) -> 4. Turiya (The Witness).',
        keyVerseCitation: 'Mandukya 2–7'
      },
      {
        title: 'Mātrās of OM',
        sanskritTerm: 'ओङ्कार मात्रा',
        definition: 'A (Waking world) + U (Mental dream world) + M (Causal sleep potential) + Amatra (Unsounded silence of Turiya).',
        keyVerseCitation: 'Mandukya 8–12'
      }
    ],
    sadhanaTakeaways: [
      'Notice that you exist as the same conscious witness across waking, dreaming, and deep sleep.',
      'Conclude every meditation with at least 2 minutes of complete silence, abiding in Turiya.'
    ],
    historicalImpact: 'The Muktika Upanishad declares: "For the attainment of liberation, the Mandukya Upanishad alone is sufficient for any seeker."'
  },

  'yoga-sutras': {
    id: 'yoga-sutras',
    slug: 'yoga-sutras',
    title: 'Yoga Sutras of Patanjali',
    sanskritTitle: 'पातञ्जलयोगसूत्राणि',
    category: 'Yoga Darshana',
    estimatedReadMinutes: 40,
    totalOriginalVerses: 196,
    crisisAndContext: {
      seeker: 'The human being buffeted by the relentless churn of mental agitation, anxieties, and compulsive thought patterns',
      preceptor: 'Maharshi Patanjali',
      setting: 'Systematic aphoristic compilation of classical Raja Yoga',
      centralQuestion: 'How can the human mind be stilled so that the true Self (Purusha) can rest in its pristine nature?',
      coreInsight: 'Yoga is the cessation of the whirlpools of the mind (Citta Vritti Nirodha). When the mind is still, the Seer abides in its own true essence.'
    },
    signpostVerses: [
      {
        chapter: 1,
        verse: 2,
        sanskrit: 'योगश्चित्तवृत्तिनिरोधः॥',
        transliteration: 'yogaś citta-vṛtti-nirodhaḥ ||',
        translation: 'Yoga is the cessation of the modifications (fluctuations) of the mind-stuff.',
        essence: 'The definitive purpose of Yoga: achieving absolute stillness of mental activity.',
        actionableTakeaway: 'Do not fight thoughts; gently observe them slow down until the turbulent surface becomes a calm mirror.',
        deepDiveUrl: '/yoga-sutras/1#2'
      },
      {
        chapter: 1,
        verse: 3,
        sanskrit: 'तदा द्रष्टुः स्वरूपेऽवस्थानम्॥',
        transliteration: 'tadā draṣṭuḥ svarūpe \'vasthānam ||',
        translation: 'Then the Seer abides in its own true nature.',
        essence: 'When mental modifications cease, the true consciousness shines undisturbed.',
        actionableTakeaway: 'Realize that you are the unchanging Seer, never the emotional movie playing on your mental screen.',
        deepDiveUrl: '/yoga-sutras/1#3'
      },
      {
        chapter: 1,
        verse: 12,
        sanskrit: 'अभ्यासवैराग्याभ्यां तन्निरोधः॥',
        transliteration: 'abhyāsa-vairāgyābhyāṁ tan-nirodhaḥ ||',
        translation: 'The stilling of mental fluctuations is achieved through persistent practice (Abhyasa) and non-attachment (Vairagya).',
        essence: 'The two wings of spiritual progress: sustained constructive effort and calm detachment.',
        actionableTakeaway: 'Maintain regular daily practice regardless of mood, while cultivating detachment from fleeting desires.',
        deepDiveUrl: '/yoga-sutras/1#12'
      },
      {
        chapter: 2,
        verse: 28,
        sanskrit: 'योगाङ्गानुष्ठानादशुद्धिक्षये ज्ञानदीप्तिराविवेकख्यातेः॥',
        transliteration: 'yogāṅgānuṣṭhānād aśuddhi-kṣaye jñāna-dīptir ā-viveka-khyāteḥ ||',
        translation: 'By the dedicated practice of the limbs of Yoga, as impurities dwindle, the light of wisdom shines forth up to illuminative discernment.',
        essence: 'Systematic spiritual practice steadily burns away mental obscurations.',
        actionableTakeaway: 'Commit to the 8 limbs: ethics, discipline, posture, breath, sensory withdrawal, concentration, meditation, and absorption.',
        deepDiveUrl: '/yoga-sutras/2#28'
      },
      {
        chapter: 2,
        verse: 46,
        sanskrit: 'स्थिरसुखमासनम्॥',
        transliteration: 'sthira-sukham āsanam ||',
        translation: 'Posture (Asana) should be steady and comfortable.',
        essence: 'The physical criterion for meditation posture: firm stability combined with ease.',
        actionableTakeaway: 'Sit with an upright spine without tension or slumping during contemplation.',
        deepDiveUrl: '/yoga-sutras/2#46'
      }
    ],
    philosophicalPillars: [
      {
        title: 'Ashtanga Yoga (The 8 Limbs)',
        sanskritTerm: 'अष्टाङ्ग योग',
        definition: 'Yama (Restraints), Niyama (Observances), Asana (Posture), Pranayama (Breath), Pratyahara (Withdrawal), Dharana (Focus), Dhyana (Meditation), Samadhi (Absorption).',
        keyVerseCitation: 'YS 2.29'
      },
      {
        title: 'Abhyasa & Vairagya',
        sanskritTerm: 'अभ्यास वैराग्य',
        definition: 'The complementary disciplines of continuous, uninterrupted devotion to practice and freedom from craving.',
        keyVerseCitation: 'YS 1.12–16'
      },
      {
        title: 'Kleshas (The 5 Afflictions)',
        sanskritTerm: 'पञ्च क्लेशाः',
        definition: 'Avidya (Ignorance), Asmita (Egoism), Raga (Attachment), Dvesha (Aversion), Abhinivesha (Fear of death).',
        keyVerseCitation: 'YS 2.3'
      }
    ],
    sadhanaTakeaways: [
      'Practice 5 minutes of conscious breath observation (Pranayama) before beginning creative or stressful work.',
      'When agitated, apply Pratipaksha Bhavanam: intentionally generate the opposite wholesome thought.'
    ],
    historicalImpact: 'Patanjali\'s Yoga Sutras established the universal psychological and meditative foundation adopted across all schools of Indian philosophy.'
  }
}

/**
 * Returns a list of all available Tattva Samgraha speed reader digests.
 */
export function getAllTattvaDigests(): TattvaSamgrahaDigest[] {
  return Object.values(TATTVA_SAMGRAHA_DIGESTS)
}

/**
 * Retrieves a specific scripture's Tattva Samgraha digest by slug.
 */
export function getTattvaDigestBySlug(slug: string): TattvaSamgrahaDigest | null {
  return TATTVA_SAMGRAHA_DIGESTS[slug] || null
}
