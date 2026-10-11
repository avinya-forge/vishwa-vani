/**
 * Multi-Tier Chapter Summaries Engine (ADR-007)
 *
 * Provides configurable multi-level chapter-wise summaries across 4 granularity tiers:
 * - 'very_short': Sūtra Essence (1–2 sentences per chapter)
 * - 'short': Tattva Saṁgraha (Key topics, core dilemma, resolution, anchor verse)
 * - 'long': Adhyāya Vivaraṇa (Detailed section breakdown, multi-scholar synthesis, conclusions)
 * - 'very_long': Śāstra Mahā-Bodh (Exhaustive Purvapaksha, Siddhanta, and practical Sadhana)
 *
 * Dynamically computes estimated reading times based on word counts (~200 WPM)
 * rather than arbitrary hardcoded benchmarks.
 */

export type SummaryGranularity = 'very_short' | 'short' | 'long' | 'very_long'

export interface AnchorVerseSummary {
  chapter: number
  verse: number
  sanskrit: string
  transliteration: string
  translation: string
  deepDiveUrl: string
}

export interface ThematicSection {
  sectionTitle: string
  verseRange: string
  discussion: string
}

export interface ScholarPerspective {
  tradition: string // e.g. 'Advaita (Adi Shankara)', 'Vishishtadvaita (Ramanuja)', 'Dvaita (Madhva)', 'Gaudiya (Prabhupada)', 'Warkari (Dnyaneshwar)'
  keyInsight: string
}

export interface ChapterSummaryData {
  chapter: number
  title: string
  sanskritTitle: string
  totalVerses: number
  veryShort: string
  short: {
    topics: string[]
    coreDilemma: string
    philosophicalResolution: string
    anchorVerse: AnchorVerseSummary
  }
  long: {
    overview: string
    thematicSections: ThematicSection[]
    scholarPerspectives: ScholarPerspective[]
    conclusions: string[]
  }
  veryLong: {
    purvapaksha: string[] // Counter-arguments and doubts
    siddhanta: string[]   // Established conclusions
    sadhanaInstructions: string[] // Practical spiritual exercises
    etymologicalNotes: string[]   // Sanskrit linguistic keys
  }
}

export interface BookChapterSummaries {
  bookSlug: string
  bookTitle: string
  sanskritTitle: string
  totalChapters: number
  totalVerses: number
  chapters: ChapterSummaryData[]
}

/**
 * Calculates dynamic reading time in minutes based on text word count and reading speed.
 * Default speed is 200 words per minute (standard reflective reading speed).
 */
export function calculateReadingTime(text: string, wpm = 200): number {
  if (!text || typeof text !== 'string') return 1
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(wordCount / wpm))
}

/**
 * Computes the total dynamic reading time for an entire scripture at a given granularity tier.
 */
export function calculateBookReadTime(book: BookChapterSummaries, granularity: SummaryGranularity): number {
  let combinedText = ''

  book.chapters.forEach(ch => {
    if (granularity === 'very_short') {
      combinedText += ` ${ch.veryShort}`
    } else if (granularity === 'short') {
      combinedText += ` ${ch.short.topics.join(' ')} ${ch.short.coreDilemma} ${ch.short.philosophicalResolution} ${ch.short.anchorVerse.translation}`
    } else if (granularity === 'long') {
      combinedText += ` ${ch.long.overview} ${ch.long.thematicSections.map(s => s.discussion).join(' ')} ${ch.long.conclusions.join(' ')}`
    } else if (granularity === 'very_long') {
      combinedText += ` ${ch.long.overview} ${ch.long.thematicSections.map(s => s.discussion).join(' ')} ${ch.veryLong.purvapaksha.join(' ')} ${ch.veryLong.siddhanta.join(' ')} ${ch.veryLong.sadhanaInstructions.join(' ')}`
    }
  })

  return calculateReadingTime(combinedText)
}

// 📖 CANONICAL CHAPTER SUMMARIES REGISTRY
export const CHAPTER_SUMMARIES_REGISTRY: Record<string, BookChapterSummaries> = {
  'bhagavad-gita': {
    bookSlug: 'bhagavad-gita',
    bookTitle: 'Bhagavad Gita',
    sanskritTitle: 'श्रीमद्भगवद्गीता',
    totalChapters: 18,
    totalVerses: 701,
    chapters: [
      {
        chapter: 1,
        title: "Arjuna's Despondency",
        sanskritTitle: 'अर्जुनविषादयोग',
        totalVerses: 47,
        veryShort: 'Overwhelmed by grief, compassion, and moral confusion on the Kurukshetra battlefield, Arjuna drops his bow and refuses to fight.',
        short: {
          topics: [
            'Conch-shell blowing and army inspection',
            "Arjuna's collapse of moral will and pacifist reasoning",
            'The psychological symptoms of severe existential crisis'
          ],
          coreDilemma: 'How can righteousness be preserved by killing revered kinsmen, teachers, and elders?',
          philosophicalResolution: 'Blind emotional attachment masquerades as noble virtue; true duty requires rising above personal sentiment.',
          anchorVerse: {
            chapter: 1,
            verse: 47,
            sanskrit: 'एवमुक्त्वार्जुनः सङ्ख्ये रथोपस्थ उपाविशत्।\nविसृज्य सशरं चापं शोकसंविग्नमानसः॥',
            transliteration: 'evam uktvārjunaḥ saṅkhye rathopastha upāviśat |\nvisṛjya sa-śaraṁ cāpaṁ śoka-saṁvigna-mānasaḥ ||',
            translation: 'Having spoken thus on the battlefield, Arjuna cast aside his bow and arrows and sank down upon the chariot seat, his mind overwhelmed with sorrow.',
            deepDiveUrl: '/bhagavad-gita/1#47'
          }
        },
        long: {
          overview: 'Chapter 1 sets the dramatic stage of the Mahabharata war. Arjuna asks Krishna to drive his chariot between the two armies. Seeing grandfather Bhishma and teacher Drona, Arjuna suffers acute existential despondency (Vishada), anticipating cultural ruin and ancestral degradation.',
          thematicSections: [
            {
              sectionTitle: 'The Gathering of Forces',
              verseRange: '1.1–1.20',
              discussion: 'Sanjaya describes Duryodhana surveying the Pandava forces and the blowing of divine conches echoing through heaven and earth.'
            },
            {
              sectionTitle: "Arjuna's Compassionate Collapse",
              verseRange: '1.21–1.37',
              discussion: 'Arjuna requests to inspect the belligerents and is instantly afflicted by grief upon recognizing familial bonds across battle lines.'
            },
            {
              sectionTitle: 'The Arguments Against War',
              verseRange: '1.38–1.47',
              discussion: 'Arjuna rationalizes his refusal to fight, predicting the destruction of family lineages, adharma, and the loss of spiritual traditions.'
            }
          ],
          scholarPerspectives: [
            {
              tradition: 'Advaita (Adi Shankara)',
              keyInsight: 'Arjuna’s despondency represents universal Avidya (ignorance) and Adhyasa (superimposition of body-identity), making him receptive to Brahmavidya.'
            },
            {
              tradition: 'Vishishtadvaita (Ramanuja)',
              keyInsight: 'Arjuna’s misplaced pity confuses physical relationship with eternal spiritual duty; Krishna must awaken his divine allegiance.'
            },
            {
              tradition: 'Warkari (Sant Dnyaneshwar)',
              keyInsight: 'Just as water poured on salt dissolves it, Arjuna’s warrior pride dissolved entirely in tender compassion before Krishna transformed it.'
            }
          ],
          conclusions: [
            'Misplaced compassion rooted in egoic attachment paralyzes decisive moral action.',
            'Genuine spiritual inquiry begins only when conventional worldly reasoning breaks down completely.'
          ]
        },
        veryLong: {
          purvapaksha: [
            'If Ahimsa (non-injury) is the highest virtue, is Arjuna not right to choose ascetic renunciation over bloody warfare?',
            'Does societal destruction not lead inevitably to moral chaos and ancestral ruin?'
          ],
          siddhanta: [
            'Fleeing duty under the cover of pious non-violence is cowardice, not genuine renunciation.',
            'Kshatriya dharma demands protecting social order against unrepentant tyranny when peaceful negotiations have failed.'
          ],
          sadhanaInstructions: [
            'Identify situations in daily life where emotional convenience is being disguised as high moral principle.',
            'Observe mental paralysis non-judgmentally and seek higher wisdom before taking evasive action.'
          ],
          etymologicalNotes: [
            'Viṣāda (विषाद): Deep despondency, dejection, or spiritual crisis.',
            'Svadharma (स्वधर्म): One’s innate duty aligned with personal spiritual evolution.'
          ]
        }
      },
      {
        chapter: 2,
        title: 'The Yoga of Knowledge',
        sanskritTitle: 'साङ्ख्ययोग',
        totalVerses: 72,
        veryShort: 'Krishna reveals the immortal nature of the Self (Atman), introduces selfless duty (Karma Yoga), and outlines the illuminated steady-minded sage (Sthitaprajna).',
        short: {
          topics: [
            'The immortality and indestructibility of the Atman',
            'Sankhya philosophical discrimination',
            'Nishkama Karma (detached action)',
            'Characteristics of the Sthitaprajna'
          ],
          coreDilemma: 'How can one act decisively without incurring sin or suffering anxiety over results?',
          philosophicalResolution: 'Act with 100% commitment to your duty, surrendered to the Divine, with absolute equanimity toward victory or defeat.',
          anchorVerse: {
            chapter: 2,
            verse: 47,
            sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
            transliteration: 'karmaṇy evādhikāras te mā phaleṣu kadācana |\nmā karma-phala-hetur bhūr mā te saṅgo \'stv akarmaṇi ||',
            translation: 'You have a right only to perform your prescribed duty, but never to the fruits of action. Never consider yourself the cause of results, nor let your attachment be to inaction.',
            deepDiveUrl: '/bhagavad-gita/2#47'
          }
        },
        long: {
          overview: 'The seminal summary of the entire Gita. Krishna rebukes Arjuna’s unmanliness, then presents the eternal metaphysical reality: bodies perish, but the Atman is never born and never dies. He then bridges this metaphysics into practical life via Buddhi Yoga / Karma Yoga.',
          thematicSections: [
            {
              sectionTitle: 'The Immortality of the Soul',
              verseRange: '2.11–2.30',
              discussion: 'The wise grieve neither for the living nor for the dead. The Atman is weapons cannot cleave, fire cannot burn, water cannot wet, wind cannot dry.'
            },
            {
              sectionTitle: 'Kshatriya Duty and Social Honor',
              verseRange: '2.31–2.38',
              discussion: 'Viewing victory and defeat, gain and loss, pleasure and pain as equal, fight for the sake of duty alone.'
            },
            {
              sectionTitle: 'Buddhi Yoga: Nishkama Karma',
              verseRange: '2.39–2.53',
              discussion: 'Focus on action without desire for rewards. Yoga is equanimity of mind (Samatvam) and skill in action (Karmasu Kaushalam).'
            },
            {
              sectionTitle: 'The Sthitaprajna (The Steady Sage)',
              verseRange: '2.54–2.72',
              discussion: 'Arjuna asks how a steady-minded person speaks, sits, and walks. Krishna details sensory restraint and peaceful absorption in Brahman.'
            }
          ],
          scholarPerspectives: [
            {
              tradition: 'Advaita (Adi Shankara)',
              keyInsight: 'The core teaching is Jnana Yoga: the absolute non-duality of the Atman. Karma Yoga is the preparatory mental purifier (Chitta Shuddhi).'
            },
            {
              tradition: 'Vishishtadvaita (Ramanuja)',
              keyInsight: 'The Atman is eternal but distinct, serving the Supreme Lord. Karma Yoga with devotion leads directly to spiritual vision.'
            },
            {
              tradition: 'Gaudiya (Prabhupada)',
              keyInsight: 'Arjuna must surrender his mental calculations to Krishna; engaging in devotional service frees one immediately from cosmic karma.'
            }
          ],
          conclusions: [
            'Death is merely changing worn-out garments for new ones.',
            'Anxiety is born from obsessing over outcomes; peace is born from selfless absorption in duty.',
            'Sensory discipline leads to intellectual steadiness and supreme peace (Brahmi Sthiti).'
          ]
        },
        veryLong: {
          purvapaksha: [
            'If the soul is indestructible, does that justify violence or homicide?',
            'How can one act vigorously if one has zero personal desire for the outcome?'
          ],
          siddhanta: [
            'Metaphysical indestructibility does not excuse arbitrary killing; it removes emotional delusion for rightful defense of cosmic justice.',
            'Desire for reward actually drains creative focus; detached duty releases maximum cognitive clarity and flow.'
          ],
          sadhanaInstructions: [
            'Practice the 2.47 rule: Before every task, silently relinquish personal entitlement to praise or outcome.',
            'Observe sensory desires like ocean waters entering a full, undisturbed sea (2.70).'
          ],
          etymologicalNotes: [
            'Samatva (समत्व): Mental equanimity under duality (praise/blame, success/failure).',
            'Sthitaprajña (स्थितप्रज्ञ): One whose discriminative intellect is firmly anchored in the Self.'
          ]
        }
      },
      {
        chapter: 3,
        title: 'The Yoga of Action',
        sanskritTitle: 'कर्मयोग',
        totalVerses: 43,
        veryShort: 'Action is inevitable in manifest life; perform your work as a selfless sacrifice (Yajna) to maintain the cosmic wheel without selfish craving.',
        short: {
          topics: [
            'The impossibility of total physical inaction',
            'Yajna: The cosmic cycle of reciprocal offering',
            'Lokasangraha: Leading by exemplary action',
            'Conquering desire (Kama) and anger (Krodha)'
          ],
          coreDilemma: 'If knowledge is superior to action, why does Krishna urge Arjuna to engage in gruesome warfare?',
          philosophicalResolution: 'Renunciation is an internal attitude, not physical withdrawal; selfless work purifies the mind faster than premature isolation.',
          anchorVerse: {
            chapter: 3,
            verse: 19,
            sanskrit: 'तस्मादसक्तः सततं कार्यं कर्म समाचर।\nअसक्तो ह्याचरन्कर्म परमाप्नोति पूरुषः॥',
            transliteration: 'tasmād asaktaḥ satataṁ kāryaṁ karma samācara |\nasakto hy ācaran karma param āpnoti pūruṣaḥ ||',
            translation: 'Therefore, always perform your obligatory duties without attachment; for by working without attachment, a person attains the Supreme.',
            deepDiveUrl: '/bhagavad-gita/3#19'
          }
        },
        long: {
          overview: 'Arjuna is confused between Sankhya (contemplative knowledge) and Karma (action). Krishna clarifies that both paths are complementary, but for an active person in society, Karma Yoga is far safer and more effective. Physical abstinence while mentally harboring desires is hypocritical (Mithyachara).',
          thematicSections: [
            {
              sectionTitle: 'The Inevitability of Action',
              verseRange: '3.1–3.9',
              discussion: 'Not even for a moment can any being remain inactive, for the Gunas of material nature compel everyone to act.'
            },
            {
              sectionTitle: 'The Wheel of Creation (Yajna Chakra)',
              verseRange: '3.10–3.16',
              discussion: 'Living beings arise from food, food from rain, rain from sacrifice, and sacrifice from action. He who does not help turn this wheel lives in vain.'
            },
            {
              sectionTitle: 'Lokasangraha: Welfare of the World',
              verseRange: '3.17–3.35',
              discussion: 'Whatever a great leader does, common people follow. Even God acts continuously without need, to sustain the cosmic order.'
            },
            {
              sectionTitle: 'The Enemies: Kama and Krodha',
              verseRange: '3.36–3.43',
              discussion: 'Desire and anger, born of the Rajasic modality, are the all-devouring enemies that obscure wisdom like smoke covering fire.'
            }
          ],
          scholarPerspectives: [
            {
              tradition: 'Advaita (Adi Shankara)',
              keyInsight: 'Action belongs to the Gunas of Prakriti, not the pure Atman. Realizing "Gunas act upon Gunas" frees the sage from agency.'
            },
            {
              tradition: 'Vishishtadvaita (Ramanuja)',
              keyInsight: 'All actions must be offered as loving worship to Narayana, making duty joyful and liberating.'
            },
            {
              tradition: 'Warkari (Sant Dnyaneshwar)',
              keyInsight: 'Just as the sun shines effortlessly without claiming the day, the Karma Yogi illuminates the world through unpretentious work.'
            }
          ],
          conclusions: [
            'Repression of natural tendencies fails; sublimation through dedicated work succeeds.',
            'Better is one’s own duty, though imperfect, than another’s duty well-performed (3.35).'
          ]
        },
        veryLong: {
          purvapaksha: [
            'If an enlightened sage has no personal desires, why should they work at all?',
            'Why can’t everyone simply become monks and meditate in solitude?'
          ],
          siddhanta: [
            'Sages work for Lokasangraha—to inspire and stabilize human society.',
            'Premature monasticism without mental purity leads to cognitive repression and spiritual relapse.'
          ],
          sadhanaInstructions: [
            'Perform one daily act of public or familial service with zero expectation of gratitude.',
            'When anger arises, identify the frustrated desire beneath it and disarm it through discriminative reflection.'
          ],
          etymologicalNotes: [
            'Yajña (यज्ञ): Sacred reciprocal offering that harmonizes human society with nature.',
            'Lokasaṅgraha (लोकसङ्ग्रह): Maintaining the moral and social order of the world.'
          ]
        }
      }
    ]
  },

  'isha-upanishad': {
    bookSlug: 'isha-upanishad',
    bookTitle: 'Isha Upanishad',
    sanskritTitle: 'ईशावास्योपनिषद्',
    totalChapters: 1,
    totalVerses: 18,
    chapters: [
      {
        chapter: 1,
        title: 'The All-Pervading Divine Consciousness',
        sanskritTitle: 'ईशावास्य मन्त्रसङ्ग्रह',
        totalVerses: 18,
        veryShort: 'Everything in the changing cosmos is enveloped by the Lord; enjoy through detachment, synthesize empirical science with spiritual wisdom, and realize "I am That Supreme Reality".',
        short: {
          topics: [
            'The indwelling presence of Isha across all manifest phenomena',
            'Harmonious integration of Vidya (spiritual knowledge) and Avidya (practical action)',
            'The sun prayer and the realization of So-ham (I am He)'
          ],
          coreDilemma: 'How can worldly activity and family life be reconciled with spiritual transcendence and liberation?',
          philosophicalResolution: 'By seeing God in every atom, renounce possessiveness, and perform action as sacred service.',
          anchorVerse: {
            chapter: 1,
            verse: 1,
            sanskrit: 'ॐ ईशा वास्यमिदं सर्वं यत्किञ्च जगत्यां जगत्।\nतेन त्यक्तेन भुञ्जीथा मा गृधः कस्यस्विद्धनम्॥',
            transliteration: 'oṁ īśā vāsyam idaṁ sarvaṁ yat kiñca jagatyāṁ jagat |\ntena tyaktena bhuñjīthā mā gṛdhaḥ kasya svid dhanam ||',
            translation: 'All this—whatever moves in this moving world—is enveloped by the Supreme Lord. Enjoy through renunciation; do not covet anyone\'s wealth.',
            deepDiveUrl: '/isha-upanishad/1#1'
          }
        },
        long: {
          overview: 'The 40th chapter of the Shukla Yajurveda Samhita. In just 18 mantras, the Isha provides a complete blueprint for integral living. It synthesizes ascetic withdrawal with energetic worldly participation, warning against pursuing one-sided materialism or one-sided quietism.',
          thematicSections: [
            {
              sectionTitle: 'Sacred Stewardship and Right Action',
              verseRange: '1.1–1.3',
              discussion: 'The world belongs to the Divine. Desiring to live a full hundred years, one should perform selfless duties without taint.'
            },
            {
              sectionTitle: 'The Nature of the Self and Universal Empathy',
              verseRange: '1.4–1.8',
              discussion: 'The Self is unmoving yet faster than the mind. He who sees all beings in the Self and the Self in all beings feels hatred toward none.'
            },
            {
              sectionTitle: 'The Synthesis of Vidya and Avidya',
              verseRange: '1.9–1.14',
              discussion: 'They enter blinding darkness who worship practical science alone; into greater darkness enter those who pursue abstract spirituality while neglecting earthly responsibility.'
            },
            {
              sectionTitle: 'The Final Prayer of the Dying Seeker',
              verseRange: '1.15–1.18',
              discussion: 'The face of truth is hidden by a golden disc. Unveil it, O Pushan! That Supreme Person yonder, He indeed I am.'
            }
          ],
          scholarPerspectives: [
            {
              tradition: 'Advaita (Adi Shankara)',
              keyInsight: 'The opening mantra proclaims absolute non-dual Advaita: all diversity is superseded by the vision of one Brahman.'
            },
            {
              tradition: 'Arya Samaj (Swami Dayananda)',
              keyInsight: 'Emphasizes practical duty: a person must work with vitality for a full lifespan of 100 years while maintaining moral purity.'
            },
            {
              tradition: 'Integral Vedanta (Sri Aurobindo)',
              keyInsight: 'The Isha represents the pinnacle of spiritual reconciliation, harmonizing Being and Becoming, One and the Many.'
            }
          ],
          conclusions: [
            'Possessiveness and greed stem from forgetting the omnipresent Divine.',
            'Universal compassion arises naturally when non-dual unity is experienced.',
            'Spiritual realization does not reject science or nature; it consecrates them.'
          ]
        },
        veryLong: {
          purvapaksha: [
            'If the world is unreal or full of suffering, why should one desire to live a hundred years (Mantra 2)?',
            'Why does the text criticize both those devoted to Avidya and those devoted to Vidya (Mantra 9)?'
          ],
          siddhanta: [
            'Life is an evolutionary instrument for self-realization; longevity in service of dharma is auspicious.',
            'One-sided absorption in meditation while neglecting duty leads to stagnation; true wisdom integrates both dimensions.'
          ],
          sadhanaInstructions: [
            'Begin each morning reminding yourself that your house, money, and body are entrusted to you as temporary sacred stewardship.',
            'Use the "So-ham" breath contemplation: Inhale "So" (He/Brahman), Exhale "Ham" (I am).'
          ],
          etymologicalNotes: [
            'Īśāvāsyam (ईशावास्यम्): Enveloped, inhabited, or sanctified by the Supreme Ruler.',
            'Tena tyaktena bhuñjīthā (तेन त्यक्तेन भुञ्जीथा): Enjoy and sustain yourself through non-attachment and renunciation of greed.'
          ]
        }
      }
    ]
  },

  'yoga-sutras': {
    bookSlug: 'yoga-sutras',
    bookTitle: 'Yoga Sutras of Patanjali',
    sanskritTitle: 'पातञ्जलयोगसूत्राणि',
    totalChapters: 4,
    totalVerses: 196,
    chapters: [
      {
        chapter: 1,
        title: 'Samadhi Pada (On Meditative Absorption)',
        sanskritTitle: 'समाधिपाद',
        totalVerses: 51,
        veryShort: 'Yoga is the cessation of mental fluctuations (Citta Vritti Nirodha); through persistent practice and non-attachment, the Seer rests in pure consciousness.',
        short: {
          topics: [
            'Definition of Yoga as mental stillness',
            'The 5 cognitive modifications (Vrittis)',
            'Abhyasa (Practice) and Vairagya (Non-attachment)',
            'Ishvara Pranidhana and OM chanting'
          ],
          coreDilemma: 'Why is human consciousness constantly plagued by stress, distractions, and volatile mood swings?',
          philosophicalResolution: 'Consciousness mistakenly identifies with changing mental whirlpools; stillness reveals our true nature as the unblemished Witness.',
          anchorVerse: {
            chapter: 1,
            verse: 2,
            sanskrit: 'योगश्चित्तवृत्तिनिरोधः॥',
            transliteration: 'yogaś citta-vṛtti-nirodhaḥ ||',
            translation: 'Yoga is the cessation of the modifications (fluctuations) of the mind-stuff.',
            deepDiveUrl: '/yoga-sutras/1#2'
          }
        },
        long: {
          overview: 'The opening chapter of Patanjali’s foundational psychology text defines the goal of classical Raja Yoga. It categorizes all human mental operations into five types, explains how to quiet them through devotion and practice, and outlines the stages of meditative absorption (Samprajnata and Asamprajnata Samadhi).',
          thematicSections: [
            {
              sectionTitle: 'The Core Definition of Yoga',
              verseRange: '1.1–1.4',
              discussion: 'When the mind becomes still, the Seer abides in its own pristine essence. At other times, consciousness identifies with its thoughts.'
            },
            {
              sectionTitle: 'The Five Modifications of Mind',
              verseRange: '1.5–1.11',
              discussion: 'Vrittis are either painful or non-painful: valid cognition (Pramana), misconception (Viparyaya), conceptual imagination (Vikalpa), sleep (Nidra), and memory (Smriti).'
            },
            {
              sectionTitle: 'The Two Pillars: Abhyasa and Vairagya',
              verseRange: '1.12–1.16',
              discussion: 'Practice becomes firmly grounded when cultivated with uninterrupted dedication, reverence, and longevity.'
            },
            {
              sectionTitle: 'Overcoming Obstacles (Antarayas)',
              verseRange: '1.27–1.39',
              discussion: 'Chanting OM with contemplation upon its meaning dissolves inner obstacles such as illness, lethargy, doubt, and negligence.'
            }
          ],
          scholarPerspectives: [
            {
              tradition: 'Classical Yoga (Vyasa Bhashya)',
              keyInsight: 'The mind-stuff (Citta) is like a clear crystal that takes on the color of whatever object is placed next to it until purified.'
            },
            {
              tradition: 'Advaita (Vijnanabhikshu)',
              keyInsight: 'Nirodha does not mean destroying the mind, but dissolving rajasic and tamasic disturbances so sattva reflects the Purusha clearly.'
            },
            {
              tradition: 'Modern Psychological Integration (Swami Vivekananda)',
              keyInsight: 'Patanjali provides an exact empirical laboratory science of mental concentration and neurological self-regulation.'
            }
          ],
          conclusions: [
            'You are not your thoughts; you are the awareness observing your thoughts.',
            'Consistent daily practice beats sporadic heroic effort.',
            'A single-pointed mind (Ekagra) leads directly to deep spiritual peace.'
          ]
        },
        veryLong: {
          purvapaksha: [
            'If all mental activity is stopped, does a yogi become unconscious or like an inert stone?',
            'Can meditation succeed without ethical lifestyle and moral discipline?'
          ],
          siddhanta: [
            'Cessation of fluctuations does not extinguish consciousness; it eliminates distortion, allowing pure awareness to shine in absolute clarity.',
            'Mental stability without ethical grounding is impossible; ethics (Yama/Niyama) is the indispensable substrate.'
          ],
          sadhanaInstructions: [
            'Practice Pratipaksha Bhavanam: When negative emotions arise, intentionally evoke compassionate and noble thoughts.',
            'Dedicate 10 minutes to steady repetition and mental reflection on OM (1.28).'
          ],
          etymologicalNotes: [
            'Citta (चित्त): The totality of mind, intellect, and ego.',
            'Vṛtti (वृत्ति): Cognitive whirlpools, fluctuations, or patterns of mental activity.'
          ]
        }
      }
    ]
  }
}

/**
 * Retrieves the chapter-wise summaries for a given scripture slug.
 */
export function getChapterSummariesBySlug(slug: string): BookChapterSummaries | null {
  return CHAPTER_SUMMARIES_REGISTRY[slug] || null
}

/**
 * Dynamically registers or updates chapter summaries for a scripture at runtime.
 */
export function registerBookChapterSummaries(summaries: BookChapterSummaries): void {
  CHAPTER_SUMMARIES_REGISTRY[summaries.bookSlug] = summaries;
}

/**
 * Lists all scriptures with available chapter summaries.
 */
export function getAllChapterSummaries(): BookChapterSummaries[] {
  return Object.values(CHAPTER_SUMMARIES_REGISTRY)
}
