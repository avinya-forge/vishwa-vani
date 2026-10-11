import { isTextCompleted } from './texts'

export interface ScholarCommentary {
  scholar: string
  lineage: string
  icon: string
  content: string
}

export interface DailyVerse {
  id: string
  bookSlug: string
  bookName: string
  bookNameDevanagari: string
  chapter: number
  verse: number
  theme: string
  category: string
  sanskrit: string
  transliteration: string
  translation: string
  commentaries: ScholarCommentary[]
}

/**
 * Universal Wisdom Corpus: Canonical signature verses spanning all scriptures.
 * Dynamically filtered by `isTextCompleted(bookSlug)` so that only 100% Gold Production Grade
 * scriptures are active in the daily rotation.
 */
export const ALL_WISDOM_CORPUS: DailyVerse[] = [
  // 1. Bhagavad Gita — Karma Yoga (2.47)
  {
    id: 'bg-2-47',
    bookSlug: 'bhagavad-gita',
    bookName: 'Bhagavad Gītā',
    bookNameDevanagari: 'श्रीमद्भगवद्गीता',
    chapter: 2,
    verse: 47,
    theme: 'Karma Yoga · Selfless Duty',
    category: 'Itihāsa',
    sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥',
    transliteration: 'karmaṇy-evādhikāras te mā phaleṣu kadācana |\nmā karma-phala-hetur bhūr mā te saṅgo \'stv akarmaṇi ||',
    translation: 'You have a right to perform your prescribed duty, but never to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to inaction.',
    commentaries: [
      {
        scholar: 'Sant Dnyaneshwar',
        lineage: 'Warkari / Bhakti (Dnyaneshwari)',
        icon: '🌺',
        content: 'O Arjuna, attend solely to your dharma without letting the desire for fruits touch your heart. Like an obedient gardener who tends the tree with pure love leaving the ripening of fruits to the divine seasons, so must you offer all actions unto the supreme without claiming ownership over their harvest.'
      },
      {
        scholar: 'Adi Shankaracharya',
        lineage: 'Advaita Vedānta',
        icon: '🕉️',
        content: 'Action alone belongs to the domain of the qualified aspirant; anxiety for fruits generates bondage and rebirth. When actions are executed as an offering to Ishvara without selfish thirst, they cleanse the intellect (chitta-shuddhi) and prepare the seeker for ultimate non-dual Knowledge.'
      },
      {
        scholar: 'A.C. Bhaktivedanta Swami Prabhupada',
        lineage: 'Gauḍīya Vaiṣṇava',
        icon: '📿',
        content: 'Prescribed duties must be executed as a matter of devotional duty without expecting personal sense enjoyment. When one acts for the pleasure of Krishna, one is freed from the karmic reactions of both virtue and vice.'
      }
    ]
  },

  // 2. Bhagavad Gita — Sharanagati (18.66)
  {
    id: 'bg-18-66',
    bookSlug: 'bhagavad-gita',
    bookName: 'Bhagavad Gītā',
    bookNameDevanagari: 'श्रीमद्भगवद्गीता',
    chapter: 18,
    verse: 66,
    theme: 'Śaraṇāgati · Supreme Liberation',
    category: 'Itihāsa',
    sanskrit: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज ।\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ॥',
    transliteration: 'sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja |\nahaṁ tvāṁ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ ||',
    translation: 'Abandoning all varieties of duty, surrender unto Me alone. I shall deliver you from all sinful reactions; do not grieve.',
    commentaries: [
      {
        scholar: 'Ramanujacharya',
        lineage: 'Viśiṣṭādvaita',
        icon: '🪷',
        content: 'This is the Carama Shloka—the crowning gem of divine compassion. When the soul realizes its inability to cross the ocean of Samsara through mere intellectual discipline, total unreserved self-surrender (prapatti) to the Supreme Lord instantly grants liberation.'
      },
      {
        scholar: 'Sant Dnyaneshwar',
        lineage: 'Warkari / Bhakti (Dnyaneshwari)',
        icon: '🌺',
        content: 'When the river merges into the vast ocean, does it maintain separate duties as a stream? Lay down the burden of righteousness and unrighteousness at the feet of the Beloved; I take complete responsibility for your being.'
      }
    ]
  },

  // 3. Isha Upanishad (1.1)
  {
    id: 'isha-1',
    bookSlug: 'isha-upanishad',
    bookName: 'Īśā Upaniṣad',
    bookNameDevanagari: 'ईशोपनिषद्',
    chapter: 1,
    verse: 1,
    theme: 'Brahman · Sacred Renunciation',
    category: 'Upaniṣad',
    sanskrit: 'ॐ ईशा वास्यमिदँ सर्वं यत्किञ्च जगत्यां जगत् ।\nतेन त्यक्तेन भुञ्जीथा मा गृधः कस्यस्विद्धनम् ॥',
    transliteration: 'oṁ īśā vāsyam idaṁ sarvaṁ yat kiñca jagatyāṁ jagat |\ntena tyaktena bhuñjīthā mā gṛdhaḥ kasya svid dhanam ||',
    translation: 'All this, whatever moves in this moving world, is enveloped by the Supreme Lord. Find your joy through self-renunciation; covet not anyone’s wealth.',
    commentaries: [
      {
        scholar: 'Adi Shankaracharya',
        lineage: 'Advaita Vedānta',
        icon: '🕉️',
        content: 'Everything mutable in this universe is pervaded by Ishvara, the pure Supreme Self. Recognizing that the divine alone is real, one casts away the false illusion of personal possessiveness and enjoys inner tranquility without coveting ephemeral worldly riches.'
      },
      {
        scholar: 'Swami Vivekananda',
        lineage: 'Practical Vedānta',
        icon: '✨',
        content: 'See God in everything. When you realize that the divine spirit permeates your neighbour, your friend, and every atom in the cosmos, selfishness melts away and infinite freedom takes its place.'
      }
    ]
  },

  // 4. Kena Upanishad (1.2)
  {
    id: 'kena-1-2',
    bookSlug: 'kena-upanishad',
    bookName: 'Kena Upaniṣad',
    bookNameDevanagari: 'केनोपनिषद्',
    chapter: 1,
    verse: 2,
    theme: 'Witnessing Consciousness · Brahman',
    category: 'Upaniṣad',
    sanskrit: 'श्रोत्रस्य श्रोत्रं मनसो मनो यद्वाचो ह वाचं स उ प्राणस्य प्राणः ।\nचक्षुषश्चक्षुरतिमुच्य धीराः प्रेत्यास्माल्लोकादमृता भवन्ति ॥',
    transliteration: 'śrotrasya śrotraṁ manaso mano yad vāco ha vācaṁ sa u prāṇasya prāṇaḥ |\ncakṣuṣaś cakṣur atimucya dhīrāḥ pretyāsmāl lokād amṛtā bhavanti ||',
    translation: 'It is the Ear of the ear, the Mind of the mind, the Speech of speech, the Life of life, and the Eye of the eye. The wise, giving up identification with sensory instruments, transcend this world and attain immortality.',
    commentaries: [
      {
        scholar: 'Adi Shankaracharya',
        lineage: 'Advaita Vedānta',
        icon: '🕉️',
        content: 'The senses and intellect cannot operate by their own power; they are inert without the conscious light of Brahman. Brahman is the ultimate witnessing consciousness that empowers hearing to hear and seeing to see, remaining forever beyond sensory limitation.'
      },
      {
        scholar: 'Max Müller',
        lineage: 'Comparative Philology & Philosophy',
        icon: '📜',
        content: 'The Kena Upanishad presents the purest critique of sensory epistemology in antiquity, discovering that the observer is itself the light by which all objects are known.'
      }
    ]
  },

  // 5. Yoga Sutras of Patanjali (1.2)
  {
    id: 'ys-1-2',
    bookSlug: 'yoga-sutras',
    bookName: 'Yoga Sūtras of Patañjali',
    bookNameDevanagari: 'पातञ्जलयोगसूत्राणि',
    chapter: 1,
    verse: 2,
    theme: 'Citta-Vṛtti-Nirodha · Samādhi',
    category: 'Darśana',
    sanskrit: 'योगश्चित्तवृत्तिनिरोधः ॥',
    transliteration: 'yogaś citta-vṛtti-nirodhaḥ ||',
    translation: 'Yoga is the stilling of the fluctuations, modifications, and whirlpools of the mind-stuff.',
    commentaries: [
      {
        scholar: 'Maharishi Vyāsa',
        lineage: 'Sāṅkhya-Yoga Bhāṣya',
        icon: '🧘',
        content: 'The mind-field (citta) possesses three qualities—Sattva, Rajas, and Tamas. When the modifications of consciousness are calmed through dispassionate practice (abhyāsa) and detachment (vairāgya), the seer rests in its pure, radiant true nature.'
      },
      {
        scholar: 'Swami Vivekananda',
        lineage: 'Raja Yoga (1896)',
        icon: '✨',
        content: 'Control of the mind is the supreme science. When the thought-waves on the lake of the mind are completely quieted, the bottom becomes visible and the true Self is seen in all its glorious immortality.'
      }
    ]
  },

  // 6. Mahabharata (Shanti Parva 12.1)
  {
    id: 'mbh-12-1',
    bookSlug: 'mahabharata',
    bookName: 'Mahābhārata (Shanti Parva)',
    bookNameDevanagari: 'महाभारतम् (शान्तिपर्व)',
    chapter: 12,
    verse: 1,
    theme: 'Satya & Dharma · Sovereign Truth',
    category: 'Itihāsa',
    sanskrit: 'सत्यमेवेश्वरो लोके सत्ये धर्मः सदा श्रितः ।\nसत्यमूलानि सर्वाणि सत्यान्नास्ति परं पदम् ॥',
    transliteration: 'satyam eveśvaro loke satye dharmaḥ sadā śritaḥ |\nsatyamūlāni sarvāṇi satyān nāsti paraṃ padam ||',
    translation: 'Truth alone is the sovereign ruler in this world; upon truth is righteousness forever anchored. All existence is rooted in truth; there is no higher abode than Truth.',
    commentaries: [
      {
        scholar: 'Nilakantha Chaturdhara',
        lineage: 'Advaita (Bharatabhavadipa)',
        icon: '🏛️',
        content: 'Bhishma from his bed of arrows teaches Yudhishthira that all empires, duties, and social orders collapse without Satya. Satya is not merely verbal honesty, but the living alignment of soul with the eternal cosmic order.'
      },
      {
        scholar: 'Kisari Mohan Ganguli',
        lineage: 'Classical Translation (KMG)',
        icon: '📖',
        content: 'Shanti Parva represents the zenith of ancient Indian political and moral philosophy, establishing that righteous governance draws its authority strictly from Truth.'
      }
    ]
  },

  // 7. Valmiki Ramayana (Bala Kanda 1.1)
  {
    id: 'ram-1-1',
    bookSlug: 'ramayana',
    bookName: 'Vālmīki Rāmāyaṇa',
    bookNameDevanagari: 'वाल्मीकिरामायणम्',
    chapter: 1,
    verse: 1,
    theme: 'Maryādā Puruṣottama · Ideal Virtue',
    category: 'Itihāsa',
    sanskrit: 'तपःस्वाध्यायनिरतं तपस्वी वाग्विदां वरम् ।\nनारदं परिपप्रच्छ वाल्मीकिर्मुनिपुङ्गवम् ॥',
    transliteration: 'tapaḥsvādhyāyanirataṃ tapasvī vāgvidāṃ varam |\nnāradaṃ paripapraccha vālmīkir munipuṅgavam ||',
    translation: 'Maharshi Valmiki, dedicated to ascetic austerities and sacred study, inquired of Devarshi Narada, the foremost among the eloquent: Who in this world is truly endowed with all noble virtues?',
    commentaries: [
      {
        scholar: 'Govindaraja',
        lineage: 'Ramayana Bhushana',
        icon: '🏹',
        content: 'Govindaraja illuminates that this primordial opening shloka sets forth the sixteen divine qualities of Bhagavan Sri Rama—righteousness, gratitude, truth, steadfast vows, compassionate conduct, and universal mastery.'
      },
      {
        scholar: 'Ralph T.H. Griffith',
        lineage: 'Classical English Verse (1870)',
        icon: '📜',
        content: 'The celebrated opening of the Adi Kavya that inspired the birth of classical Sanskrit poetry and the epic glorification of righteous human conduct.'
      }
    ]
  },

  // 8. Srimad Bhagavata Purana (Canto 1.1)
  {
    id: 'bp-1-1',
    bookSlug: 'bhagavata-purana',
    bookName: 'Śrīmad Bhāgavata Purāṇa',
    bookNameDevanagari: 'श्रीमद्भागवतपुराणम्',
    chapter: 1,
    verse: 1,
    theme: 'Satyaṁ Paraṁ Dhīmahi · Supreme Reality',
    category: 'Purāṇa',
    sanskrit: 'जन्माद्यस्य यतोऽन्वयादितरतश्चार्थेष्वभिज्ञः स्वराट् ।\nतेने ब्रह्म हृदा य आदिकवये मुह्यन्ति यत्सूरयः ॥',
    transliteration: 'janmādy asya yato \'nvayād itarataś cārtheṣv abhijñaḥ svarāṭ |\ntene brahma hṛdā ya ādi-kavaye muhyanti yat sūrayaḥ ||',
    translation: 'We meditate upon Him, the Supreme Truth, from whom proceeds the creation, sustenance, and dissolution of this universe, directly and indirectly cognizant of all purposes, fully independent, who imparted Vedic wisdom into the heart of the first poet Brahma.',
    commentaries: [
      {
        scholar: 'Sridhara Swami',
        lineage: 'Bhavartha Dipika (Advaita-Bhakti)',
        icon: '🪷',
        content: 'Sridhara Swami explains that this opening verse weaves the Gayatri Mantra with the second Brahma Sutra (Janmadyasya yatah), proclaiming the non-dual Lord as both the material and efficient cause of the universe.'
      },
      {
        scholar: 'A.C. Bhaktivedanta Swami Prabhupada',
        lineage: 'Gauḍīya Vaiṣṇava',
        icon: '📿',
        content: 'The Bhagavata Purana begins with the definition of the Absolute Truth as a conscious person (abhijñah svarāṭ), surpassing all mechanical or impersonalist interpretations of cosmic origin.'
      }
    ]
  },

  // 9. Rigveda Samhita — Agni Sukta (1.1)
  {
    id: 'rv-1-1',
    bookSlug: 'rigveda',
    bookName: 'Ṛgveda Saṁhitā (Agni Sūkta)',
    bookNameDevanagari: 'ऋग्वेदसंहिता (अग्निसूक्तम्)',
    chapter: 1,
    verse: 1,
    theme: 'Primordial Flame · Divine Priest',
    category: 'Veda Saṁhitā',
    sanskrit: 'अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजम् ।\nहोतारं रत्नधातमम् ॥',
    transliteration: 'agnim īḷe purohitaṃ yajñasya devam ṛtvijam |\nhotāraṃ ratnadhātamam ||',
    translation: 'I praise Agni, the chosen priest, the divine minister of sacrifice, the invoker, the greatest bestower of treasures.',
    commentaries: [
      {
        scholar: 'Sayanacharya',
        lineage: 'Vedartha Prakasha (14th c.)',
        icon: '🔥',
        content: 'Sayanacharya explains that "purohitam" signifies the cosmic flame placed in front of humanity—the first divine intermediary awakening mortal consciousness to immortal reality.'
      },
      {
        scholar: 'Swami Dayananda Saraswati',
        lineage: 'Arya Bhashya (19th c.)',
        icon: '☀️',
        content: 'Agni is both the physical fire sustaining material life and the radiant divine intelligence illuminating the inner heart of the seeker.'
      }
    ]
  },

  // 10. Rigveda Samhita — Gayatri Mahamantra (3.62.10)
  {
    id: 'rv-3-62',
    bookSlug: 'rigveda',
    bookName: 'Ṛgveda Saṁhitā (Gāyatrī)',
    bookNameDevanagari: 'ऋग्वेदसंहिता (गायत्री महामन्त्रः)',
    chapter: 3,
    verse: 1,
    theme: 'Solar Radiance · Intellect Illumination',
    category: 'Veda Saṁhitā',
    sanskrit: 'तत् सवितुर्वरेण्यं भर्गो देवस्य धीमहि ।\nधियो यो नः प्रचोदयात् ॥',
    transliteration: 'tat savitur vareṇyaṃ bhargo devasya dhīmahi |\ndhiyo yo naḥ pracodayāt ||',
    translation: 'We meditate upon the supreme, radiant splendor of the divine Savitri; may that Solar Divinity inspire and illuminate our intellects.',
    commentaries: [
      {
        scholar: 'Sayanacharya',
        lineage: 'Vedartha Prakasha',
        icon: '🔥',
        content: 'Rigveda 3.62.10 revealed to Maharshi Vishvamitra is the spiritual mother of all Vedas. Savitri denotes the creator of the cosmos who illuminates both the external sun and internal intellect.'
      },
      {
        scholar: 'Swami Vivekananda',
        lineage: 'Vedanta & Meditation',
        icon: '✨',
        content: 'We meditate on the glory of that Being who has produced this universe; may He enlighten our minds. This is the universal prayer of the human race across all creeds.'
      }
    ]
  },

  // 11. Shukla Yajurveda Samhita — Shri Rudram (16.1)
  {
    id: 'yj-16-1',
    bookSlug: 'yajurveda',
    bookName: 'Śukla Yajurveda (Śrī Rudram)',
    bookNameDevanagari: 'शुक्लयजुर्वेदः (श्रीरुद्रम्)',
    chapter: 16,
    verse: 1,
    theme: 'Śrī Rudram · Cosmic Dissolution & Grace',
    category: 'Veda Saṁhitā',
    sanskrit: 'नमस्ते रुद्र मन्यव उतोत इषवे नमः ।\nबाहुभ्यामुत ते नमः ॥',
    transliteration: 'namaste rudra manyava utota iṣave namaḥ |\nbāhubhyām uta te namaḥ ||',
    translation: 'O Rudra, salutations to Thy righteous wrath, and homage to Thine arrow! Homage to both Thy mighty arms!',
    commentaries: [
      {
        scholar: 'Uvvata & Mahidhara',
        lineage: 'Yajurveda Bhashya (11th & 16th c.)',
        icon: '🔱',
        content: 'The Satarudriya (Adhyaya 16) is the heart of Shukla Yajurveda. Salutations are offered first to Rudra’s destructive fury against unrighteousness so that His benevolent, auspicious form (Shiva) may be revealed.'
      },
      {
        scholar: 'Swami Dayananda Saraswati',
        lineage: 'Arya Bhashya',
        icon: '☀️',
        content: 'Rudra is the supreme dispeller of ignorance and tears (rud-drayati), destroying spiritual lethargy with divine energy.'
      }
    ]
  },

  // 12. Shukla Yajurveda Samhita — Shanti Mantra (36.17)
  {
    id: 'yj-36-17',
    bookSlug: 'yajurveda',
    bookName: 'Śukla Yajurveda (Śānti Mantra)',
    bookNameDevanagari: 'शुक्लयजुर्वेदः (शान्तिमन्त्रः)',
    chapter: 36,
    verse: 1,
    theme: 'Cosmic Peace · Universal Harmony',
    category: 'Veda Saṁhitā',
    sanskrit: 'द्यौः शान्तिरन्तरिक्षं शान्तिः पृथिवी शान्तिरापः शान्तिरोषधयः शान्तिः ।\nवनस्पतयः शान्तिर्विश्वेदेवाः शान्तिर्ब्रह्म शान्तिः सर्वं शान्तिः शान्तिरेव शान्तिः सा मा शान्तिरेधि ॥\nॐ शान्तिः शान्तिः शान्तिः ॥',
    transliteration: 'dyauḥ śāntir antarikṣaṃ śāntiḥ pṛthivī śāntir āpaḥ śāntir oṣadhayaḥ śāntiḥ |\nvanaspatayaḥ śāntir viśvedevāḥ śāntiḥ brahma śāntiḥ sarvaṃ śāntiḥ śāntir eva śāntiḥ sā mā śāntir edhi ||\noṃ śāntiḥ śāntiḥ śāntiḥ ||',
    translation: 'May peace radiate in the celestial realms! May peace fill the vast atmospheric sky! May peace reign upon the earth, in the waters, in plants, and in the mighty trees! May peace prevail among all deities, in Brahman, and throughout all existence! Peace, peace, peace!',
    commentaries: [
      {
        scholar: 'Mahidhara',
        lineage: 'Vedadipa (16th c.)',
        icon: '🌿',
        content: 'The universal Vedic peace prayer chanted at the conclusion of sacred rites. It recognizes that inner human peace cannot exist in isolation from ecological and cosmic harmony.'
      }
    ]
  },

  // 13. Vishnu Purana (1.1)
  {
    id: 'vp-1-1',
    bookSlug: 'vishnu-purana',
    bookName: 'Viṣṇu Purāṇa',
    bookNameDevanagari: 'विष्णुपुराणम्',
    chapter: 1,
    verse: 1,
    theme: 'Omnipresent Reality · Cosmic Sustenance',
    category: 'Purāṇa',
    sanskrit: 'ॐ नमो भगवते वासुदेवाय ।\nयन्मयं सर्वमेवैतद् यतो यत्र च सर्वशः ।\nतं सर्वकारणं वन्दे विष्णुं पुरुषमुत्तमम् ॥',
    transliteration: 'oṃ namo bhagavate vāsudevāya |\nyanmayaṃ sarvam evaitad yato yatra ca sarvaśaḥ |\ntaṃ sarvakāraṇaṃ vande viṣṇuṃ puruṣamuttamam ||',
    translation: 'Om, salutations to Bhagavan Vasudeva, from whom this universe has emerged, in whom it rests, and who constitutes all existence—unto that Supreme Purusha and primal cause, I offer reverence.',
    commentaries: [
      {
        scholar: 'H.H. Wilson',
        lineage: 'Classical English Translation (1840)',
        icon: '📜',
        content: 'The Vishnu Purana stands as the archetypal Mahapurana, beginning with Sage Parashara’s instruction to Maitreya on the non-dual source of the cosmos.'
      },
      {
        scholar: 'Sridhara Swami',
        lineage: 'Atmaprakasa Commentary',
        icon: '🪷',
        content: 'The name Vasudeva denotes the all-pervading divine essence (sarvatra vasati) in whom all beings live and who abides in all.'
      }
    ]
  },

  // 14. Garuda Purana (1.1)
  {
    id: 'gp-1-1',
    bookSlug: 'garuda-purana',
    bookName: 'Garuḍa Purāṇa',
    bookNameDevanagari: 'गरुड़पुराणम्',
    chapter: 1,
    verse: 1,
    theme: 'Purusharthas & Self-Mastery · Achara',
    category: 'Purāṇa',
    sanskrit: 'धर्मार्थकाममोक्षाणां यदेकं कारणं परम् ।\nतं सर्वज्ञमहं वन्दे विष्णुं सर्वजगद्गुरुम् ॥',
    transliteration: 'dharmārthakāmamokṣāṇāṃ yad ekaṃ kāraṇaṃ param |\ntaṃ sarvajñam ahaṃ vande viṣṇuṃ sarvajagadgurum ||',
    translation: 'Unto that Omniscient One, the supreme source and fulfillment of Dharma (Virtue), Artha (Prosperity), Kama (Righteous Joy), and Moksha (Liberation)—the universal Guru of the cosmos—I bow.',
    commentaries: [
      {
        scholar: 'Manmatha Nath Dutt',
        lineage: 'Classical Translation (1908)',
        icon: '📖',
        content: 'The Achara Khanda of the Garuda Purana establishes the fundamental ethical and moral code of Sanatana Dharma before examining eschatological questions.'
      }
    ]
  },

  // 15. Brahma Sutras (1.1.1)
  {
    id: 'bs-1-1',
    bookSlug: 'brahma-sutras',
    bookName: 'Brahma Sūtras of Bādarāyaṇa',
    bookNameDevanagari: 'ब्रह्मसूत्राणि',
    chapter: 1,
    verse: 1,
    theme: 'Brahma-Jijñāsā · Inquiry into Truth',
    category: 'Darśana',
    sanskrit: 'अथातो ब्रह्मजिज्ञासा ॥',
    transliteration: 'athāto brahma-jijñāsā ||',
    translation: 'Now, therefore, the inquiry into Brahman (the Ultimate Reality).',
    commentaries: [
      {
        scholar: 'Adi Shankaracharya',
        lineage: 'Sariraka Bhashya (Advaita)',
        icon: '🕉️',
        content: 'The word "Atha" signifies the qualification earned through discernment between the real and the unreal (viveka), detachment (vairagya), self-discipline (shat-sampatti), and burning longing for freedom (mumukshutva). Only then begins the inquiry into Brahman.'
      },
      {
        scholar: 'Ramanujacharya',
        lineage: 'Sri Bhashya (Visishtadvaita)',
        icon: '🪷',
        content: 'Inquiry into Brahman follows the understanding that ritual action alone yields temporary fruits; liberation requires direct meditative knowledge (Upasana) of the Supreme Lord.'
      },
      {
        scholar: 'Madhvacharya',
        lineage: 'Anubhashya (Dvaita)',
        icon: '⚡',
        content: 'Brahman is the repository of all infinite auspicious qualities; to inquire into Him is the highest duty of every rational soul.'
      }
    ]
  },

  // 16. Samaveda Samhita (1.1)
  {
    id: 'sv-1-1',
    bookSlug: 'samaveda',
    bookName: 'Sāmaveda Saṁhitā',
    bookNameDevanagari: 'सामवेदसंहिता',
    chapter: 1,
    verse: 1,
    theme: 'Musical Devotion · Sacred Melody',
    category: 'Veda Saṁhitā',
    sanskrit: 'अग्न आ याहि वीतये गृणानो हव्यदातये ।\nनि होता सत्सि बर्हिषि ॥',
    transliteration: 'agna ā yāhi vītaye gṛṇāno havyadātaye |\nni hotā satsi barhiṣi ||',
    translation: 'Come, O Agni, praised with songs of melody, to the feast and the offering! Seat thyself as the divine Invoker upon the sacred grass.',
    commentaries: [
      {
        scholar: 'Sayanacharya',
        lineage: 'Samaveda Bhashya',
        icon: '🎶',
        content: 'The Samaveda is the Veda of spiritual music. Chanted in the rhythmic Saman cadences, this hymn awakens the divine flame within the heart through transcendental song.'
      },
      {
        scholar: 'Ralph T.H. Griffith',
        lineage: 'Classical Translation (1893)',
        icon: '📜',
        content: 'The opening hymn of the Purvarchika honoring the musical dimension of the Vedic sacrificial liturgy.'
      }
    ]
  },

  // 17. Atharvaveda Samhita — Prithvi Sukta (12.1.1)
  {
    id: 'av-12-1',
    bookSlug: 'atharvaveda',
    bookName: 'Atharvaveda (Pṛthivī Sūkta)',
    bookNameDevanagari: 'अथर्ववेदसंहिता (भूमिसूक्तम्)',
    chapter: 12,
    verse: 1,
    theme: 'Mātā Bhūmiḥ · Hymn to Earth Mother',
    category: 'Veda Saṁhitā',
    sanskrit: 'सत्यं बृहदृतमुग्रं दीक्षा तपो ब्रह्म यज्ञः पृथिवीं धारयन्ति ।\nसा नो भूतस्य भव्यस्य पत्न्युरुं लोकं पृथिवी नः कृणोतु ॥',
    transliteration: 'satyaṃ bṛhad ṛtam ugraṃ dīkṣā tapo brahma yajñaḥ pṛthivīṃ dhārayanti |\nsā no bhūtasya bhavyasya patny uruṃ lokaṃ pṛthivī naḥ kṛṇotu ||',
    translation: 'Truth, vast Cosmic Order, fierce dedication, consecration, spiritual austerity, prayer, and sacrifice uphold the Earth. May She, the sovereign guardian of our past and our future, create wide room and freedom for us!',
    commentaries: [
      {
        scholar: 'Sayanacharya',
        lineage: 'Vedartha Prakasha',
        icon: '🌍',
        content: 'The famous Bhumi Sukta (12.1), the earliest ecological hymn in world literature, proclaiming that Earth is preserved by moral righteousness, self-restraint, and truth.'
      },
      {
        scholar: 'William Dwight Whitney',
        lineage: 'Harvard Oriental Series (1905)',
        icon: '📜',
        content: 'A magnificent hymn celebrating the living Earth as the mother of all beings ("Mātā bhūmiḥ putro \'haṁ pṛthivyāḥ" — Earth is my mother, I am her child).'
      }
    ]
  },

  // 18. Manusmriti (2.6)
  {
    id: 'manu-2-6',
    bookSlug: 'manusmriti',
    bookName: 'Manusmṛti (Dharmaśāstra)',
    bookNameDevanagari: 'मनुस्मृतिः',
    chapter: 2,
    verse: 1,
    theme: 'Dharma-Mūlam · Four Roots of Righteousness',
    category: 'Darśana',
    sanskrit: 'वेदोऽखिलो धर्ममूलं स्मृतिशीले च तद्विदाम् ।\nआचारश्चैव साधूनामात्मनस्तुष्टिरेव च ॥',
    transliteration: 'vedo \'khilo dharmamūlaṃ smṛtiśīle ca tadvidām |\nācāraś caiva sādhūnām ātmanas tuṣṭir eva ca ||',
    translation: 'The entire Veda is the primary root of Dharma; next is the tradition and virtuous conduct of those who understand the Veda; then the customary conduct of noble souls; and finally the clear satisfaction of one’s inner conscience.',
    commentaries: [
      {
        scholar: 'Medhatithi',
        lineage: 'Manubhashya (9th c.)',
        icon: '⚖️',
        content: 'Medhatithi highlights that when resolving ethical dilemmas, one begins with universal Sruti wisdom, checks classical legal precedent, observes living saintly examples, and harmonizes them with the uncorrupted conscience (atmanas tushtih).'
      },
      {
        scholar: 'Kulluka Bhatta',
        lineage: 'Manvartha Muktavali',
        icon: '📜',
        content: 'Dharma is not arbitrary dogmatism; it is grounded in revelation, moral tradition, noble society, and authentic inner purity.'
      }
    ]
  },

  // 19. 16 Samskaras (Ritual Handbook 1.1)
  {
    id: 'samsk-1-1',
    bookSlug: 'samskaras',
    bookName: '16 Saṁskāras (Ritual Handbook)',
    bookNameDevanagari: 'षोडश संस्काराः',
    chapter: 1,
    verse: 1,
    theme: 'Sacred Life Rites · Spiritual Evolution',
    category: 'Darśana',
    sanskrit: 'गर्भाधानादिसंस्कारैः पावनैर्वेदकल्पितैः ।\nशुद्ध्यन्ति मानवाः सर्वे प्राप्नुवन्ति परं पदम् ॥',
    transliteration: 'garbhādhānādisaṃskāraiḥ pāvanair vedakalpitaiḥ |\nśuddhyanti mānavāḥ sarve prāpnuvanti paraṃ padam ||',
    translation: 'Through the purifying Vedic life rites beginning with Garbhadhana (conception), all human beings are consecrated, refined in consciousness, and elevated to the highest spiritual realization.',
    commentaries: [
      {
        scholar: 'Classical Grihya Sutras',
        lineage: 'Paraskara & Ashvalayana Tradition',
        icon: '🌱',
        content: 'Samskaras are spiritual impressions carved into consciousness at crucial transition moments in life, transforming biological existence into consecrated divine living.'
      }
    ]
  },

  // 20. Stotras & Stuties — Mahishasura Mardini (1.1)
  {
    id: 'stotra-1-1',
    bookSlug: 'stotras',
    bookName: 'Stotras & Stuties',
    bookNameDevanagari: 'स्तोत्राणि (महिषासुरमर्दिनि)',
    chapter: 1,
    verse: 1,
    theme: 'Cosmic Grace & Triumph · Shakti',
    category: 'Devotional',
    sanskrit: 'अयि गिरिनन्दिनि नन्दितमेदिनि विश्वविनोदिनि नन्दसुते ।\nगिरिवरविन्ध्यशिरोऽधिनिवासिनि विष्णुविलासिनि जिष्णुनुते ॥',
    transliteration: 'ayi giri-nandini nandita-medini viśva-vinodini nanda-sute |\ngiri-vara-vindhya-śiro\'dhi-nivāsini viṣṇu-vilāsini jiṣṇu-nute ||',
    translation: 'O Daughter of the Mountain, who gives immense joy to the earth, who gladdens the universe, who resides upon the supreme peaks of the Vindhyas, who brings delight to Vishnu, praised by Indra—Victory unto Thee, O Mother!',
    commentaries: [
      {
        scholar: 'Adi Shankaracharya',
        lineage: 'Advaita Stotra Tradition',
        icon: '🔱',
        content: 'Adi Shankara celebrates the Divine Mother not merely as a mythological conqueror, but as the supreme Chit-Shakti (Conscious Energy) dispelling the demonic ego (Mahishasura) within every soul.'
      }
    ]
  }
]

/**
 * Get active daily shlokas filtered strictly by whether the scripture is 100% completed.
 * This guarantees that as new books graduate to 100% Gold, they automatically activate in rotation.
 */
export function getActiveDailyShlokas(): DailyVerse[] {
  const active = ALL_WISDOM_CORPUS.filter(v => isTextCompleted(v.bookSlug))
  return active.length > 0 ? active : ALL_WISDOM_CORPUS.slice(0, 5)
}

/**
 * Get the daily shloka for today based on day-of-year rotation
 */
export function getTodaysShloka(): DailyVerse {
  const active = getActiveDailyShlokas()
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
  return active[dayOfYear % active.length]
}
