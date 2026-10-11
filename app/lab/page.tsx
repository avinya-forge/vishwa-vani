'use client'

import React, { useState, Suspense, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useSearchParams, useRouter } from 'next/navigation'
import { LabSkeleton } from '@/components/layout/Skeleton'

// 🏛️ DYNAMIC COMPONENT IMPORTS FOR VEDIC LABS STUDIO
const PranayamaTimer = dynamic(() => import('@/components/lab/pranayama-timer'), { ssr: false, loading: () => <LabSkeleton /> })
const AkshauhiniCalc = dynamic(() => import('@/components/lab/akshauhini-calc'), { ssr: false, loading: () => <LabSkeleton /> })
const VedicInstruments = dynamic(() => import('@/components/lab/vedic-instruments'), { ssr: false, loading: () => <LabSkeleton /> })
const KarmaYogaSimulator = dynamic(() => import('@/components/lab/karma-yoga-simulator'), { ssr: false, loading: () => <LabSkeleton /> })
const JnanaYogaExplorer = dynamic(() => import('@/components/lab/jnana-yoga-explorer'), { ssr: false, loading: () => <LabSkeleton /> })
const BhaktiYogaCompass = dynamic(() => import('@/components/lab/bhakti-yoga-compass'), { ssr: false, loading: () => <LabSkeleton /> })
const DharmaDecisionMatrix = dynamic(() => import('@/components/lab/dharma-decision-matrix'), { ssr: false, loading: () => <LabSkeleton /> })
const TimeConsciousnessWheel = dynamic(() => import('@/components/lab/time-consciousness-wheel'), { ssr: false, loading: () => <LabSkeleton /> })
const DivineQualitiesAssessment = dynamic(() => import('@/components/lab/divine-qualities-assessment'), { ssr: false, loading: () => <LabSkeleton /> })
const MeditationStateTracker = dynamic(() => import('@/components/lab/meditation-state-tracker'), { ssr: false, loading: () => <LabSkeleton /> })
const AstroExplorer = dynamic(() => import('@/components/lab/astro-explorer'), { ssr: false, loading: () => <LabSkeleton /> })
const ChhandaAnalyzer = dynamic(() => import('@/components/lab/chhanda-analyzer'), { ssr: false, loading: () => <LabSkeleton /> })
const CharacterRelationshipMap = dynamic(() => import('@/components/lab/character-relationship-map'), { ssr: false, loading: () => <LabSkeleton /> })
const GrammarTokenizer = dynamic(() => import('@/components/lab/grammar-tokenizer'), { ssr: false, loading: () => <LabSkeleton /> })
const IshaContemplationGuide = dynamic(() => import('@/components/lab/isha-contemplation-guide'), { ssr: false, loading: () => <LabSkeleton /> })
const InteractiveTattvaMap = dynamic(() => import('@/components/lab/interactive-tattva-map'), { ssr: false, loading: () => <LabSkeleton /> })
const ChantingTrainer = dynamic(() => import('@/components/lab/chanting-trainer'), { ssr: false, loading: () => <LabSkeleton /> })
const ArjunasCrisisCounselor = dynamic(() => import('@/components/lab/arjunas-crisis-counselor'), { ssr: false, loading: () => <LabSkeleton /> })
const GunaBalancingSimulator = dynamic(() => import('@/components/lab/guna-balancing-simulator'), { ssr: false, loading: () => <LabSkeleton /> })
const MokshaPathwaysEngine = dynamic(() => import('@/components/lab/moksha-pathways-engine'), { ssr: false, loading: () => <LabSkeleton /> })
const MokshaPathNavigator = dynamic(() => import('@/components/lab/moksha-path-navigator'), { ssr: false, loading: () => <LabSkeleton /> })
const YogaMindControl = dynamic(() => import('@/components/lab/yoga-mind-control'), { ssr: false, loading: () => <LabSkeleton /> })
const BhagavataBhaktiFlow = dynamic(() => import('@/components/lab/bhagavata-bhakti-flow'), { ssr: false, loading: () => <LabSkeleton /> })
const KenaSensoryInquiry = dynamic(() => import('@/components/lab/kena-sensory-inquiry'), { ssr: false, loading: () => <LabSkeleton /> })
const SanyasaParadoxResolver = dynamic(() => import('@/components/lab/sanyasa-paradox-resolver'), { ssr: false, loading: () => <LabSkeleton /> })
const VisvarupaContemplation = dynamic(() => import('@/components/lab/visvarupa-contemplation'), { ssr: false, loading: () => <LabSkeleton /> })
const RoyalScienceDecoder = dynamic(() => import('@/components/lab/royal-science-decoder'), { ssr: false, loading: () => <LabSkeleton /> })
const JnanaProgressionPath = dynamic(() => import('@/components/lab/jnana-progression-path'), { ssr: false, loading: () => <LabSkeleton /> })
const PurushottamaSelfInquiry = dynamic(() => import('@/components/lab/purushottama-self-inquiry'), { ssr: false, loading: () => <LabSkeleton /> })
const DharmicConflictResolver = dynamic(() => import('@/components/lab/dharmic-conflict-resolver'), { ssr: false, loading: () => <LabSkeleton /> })
const VerseGunaAnalyzer = dynamic(() => import('@/components/lab/verse-guna-analyzer'), { ssr: false, loading: () => <LabSkeleton /> })
const CommentaryComparisonTool = dynamic(() => import('@/components/lab/commentary-comparison-tool'), { ssr: false, loading: () => <LabSkeleton /> })
const MarathiHeritageExplorer = dynamic(() => import('@/components/lab/marathi-heritage-explorer'), { ssr: false, loading: () => <LabSkeleton /> })
const KenaInquiryLab = dynamic(() => import('@/components/lab/kena-inquiry-lab'), { ssr: false, loading: () => <LabSkeleton /> })
const ConsciousnessStateMapper = dynamic(() => import('@/components/lab/consciousness-state-mapper'), { ssr: false, loading: () => <LabSkeleton /> })
const VishnuPuranaCosmicExplorer = dynamic(() => import('@/components/lab/vishnu-purana-cosmic-explorer'), { ssr: false, loading: () => <LabSkeleton /> })

export interface LabToolMeta {
  id: string
  name: string
  sanskritName: string
  category: 'scripture' | 'philosophy' | 'linguistics'
  scripture: string
  description: string
  icon: string
  tags: string[]
  component: React.ComponentType
}

export const LAB_STUDIO_REGISTRY: LabToolMeta[] = [
  // 📜 SCRIPTURE COMPANIONS
  {
    id: 'arjunas-crisis-counselor',
    name: "Arjuna's Crisis Counselor",
    sanskritName: 'विषाद योग विमर्श',
    category: 'scripture',
    scripture: 'Bhagavad Gita',
    description: "Explore Krishna's responses to Arjuna's 5 crises of doubt in Chapter 1 across Duty, Knowledge, and Devotion.",
    icon: '🏹',
    tags: ['gita', 'crisis', 'arjuna', 'krishna', 'dharma'],
    component: ArjunasCrisisCounselor
  },
  {
    id: 'karma-yoga-simulator',
    name: 'Karma Yoga Simulator',
    sanskritName: 'निष्काम कर्म साधन',
    category: 'scripture',
    scripture: 'Bhagavad Gita',
    description: 'Practice detached action through interactive decision scenarios drawn from Gita Chapters 2 and 3.',
    icon: '⚖️',
    tags: ['gita', 'action', 'karma', 'nishkama'],
    component: KarmaYogaSimulator
  },
  {
    id: 'jnana-yoga-explorer',
    name: 'Jnana Yoga Explorer',
    sanskritName: 'ज्ञान विज्ञान योग',
    category: 'scripture',
    scripture: 'Bhagavad Gita',
    description: 'Self-inquiry framework distinguishing the Knower of the field (Kshetrajna) from the field (Kshetra).',
    icon: '👁️',
    tags: ['gita', 'jnana', 'kshetra', 'wisdom'],
    component: JnanaYogaExplorer
  },
  {
    id: 'bhakti-yoga-compass',
    name: 'Bhakti Yoga Compass',
    sanskritName: 'भक्ति मार्ग दिग्दर्शक',
    category: 'scripture',
    scripture: 'Bhagavad Gita',
    description: 'Test devotion, surrender, and emotional equanimity across the 12th Chapter of the Bhagavad Gita.',
    icon: '❤️',
    tags: ['gita', 'bhakti', 'devotion', 'surrender'],
    component: BhaktiYogaCompass
  },
  {
    id: 'sanyasa-paradox-resolver',
    name: 'Sanyāsa Paradox Resolver',
    sanskritName: 'संन्यास कर्म योग समन्वय',
    category: 'scripture',
    scripture: 'Bhagavad Gita',
    description: 'Resolve the Chapters 4–5 paradox: renunciation of action versus engagement in selfless duty.',
    icon: '🧘',
    tags: ['gita', 'sannyasa', 'action', 'renunciation'],
    component: SanyasaParadoxResolver
  },
  {
    id: 'royal-science-decoder',
    name: 'Royal Science Decoder',
    sanskritName: 'राजविद्या राजगुह्य योग',
    category: 'scripture',
    scripture: 'Bhagavad Gita',
    description: 'Unlock the 9 sublime spiritual secrets Krishna reveals in Chapter 9 (The King of Knowledge).',
    icon: '👑',
    tags: ['gita', 'raja-vidya', 'secrets', 'divine'],
    component: RoyalScienceDecoder
  },
  {
    id: 'visvarupa-contemplation',
    name: 'Viśvarūpa Contemplation',
    sanskritName: 'विश्वरूप दर्शन ध्यान',
    category: 'scripture',
    scripture: 'Bhagavad Gita',
    description: 'Guided meditative journey through the 8 stages of the Universal Cosmic Vision revealed in Chapter 11.',
    icon: '🌌',
    tags: ['gita', 'vishvarupa', 'cosmic-form', 'time'],
    component: VisvarupaContemplation
  },
  {
    id: 'purushottama-self-inquiry',
    name: 'Purushottama Inquiry',
    sanskritName: 'पुरुषोत्तम योग विमर्श',
    category: 'scripture',
    scripture: 'Bhagavad Gita',
    description: 'Contemplate the cosmic Ashvattha tree and the Supreme Person beyond perishable and imperishable beings.',
    icon: '🌳',
    tags: ['gita', 'ashvattha', 'purushottama', 'chapter-15'],
    component: PurushottamaSelfInquiry
  },
  {
    id: 'verse-guna-analyzer',
    name: 'Verse Guna Analyzer',
    sanskritName: 'त्रिगुण लक्षण विश्लेषक',
    category: 'scripture',
    scripture: 'Bhagavad Gita',
    description: 'Analyze verses and psychological states against Sattva, Rajas, and Tamas modalities.',
    icon: '🧬',
    tags: ['gita', 'gunas', 'sattva', 'rajas', 'tamas'],
    component: VerseGunaAnalyzer
  },
  {
    id: 'dharmic-conflict-resolver',
    name: 'Dharmic Conflict Resolver',
    sanskritName: 'धर्म संकट निवारण',
    category: 'scripture',
    scripture: 'Bhagavad Gita',
    description: 'Navigate moral dilemmas and high-stakes choices using the Gita Chapter 18 decision matrix.',
    icon: '⚡',
    tags: ['gita', 'dharma', 'conflict', 'ethics'],
    component: DharmicConflictResolver
  },
  {
    id: 'akshauhini-calc',
    name: 'Akshauhini Military Calculator',
    sanskritName: 'अक्षौहिणी सैन्य गणना',
    category: 'scripture',
    scripture: 'Mahabharata',
    description: 'Calculate the ancient unit of military mobilization (chariots, elephants, cavalry, infantry) from Kurukshetra.',
    icon: '🛡️',
    tags: ['mahabharata', 'army', 'akshauhini', 'history'],
    component: AkshauhiniCalc
  },
  {
    id: 'isha-contemplation-guide',
    name: 'Isha Contemplation Guide',
    sanskritName: 'ईशावास्य ध्यान निर्देशिका',
    category: 'scripture',
    scripture: 'Isha Upanishad',
    description: 'Verse-by-verse meditative prompts through all 18 mantras of the Shukla Yajurvedic Isha Upanishad.',
    icon: '☀️',
    tags: ['upanishad', 'isha', 'meditation', 'atman'],
    component: IshaContemplationGuide
  },
  {
    id: 'kena-sensory-inquiry',
    name: 'Kena Sensory Inquiry',
    sanskritName: 'केनेषितं मनः अन्वेषण',
    category: 'scripture',
    scripture: 'Kena Upanishad',
    description: 'Investigate the prime witness: "By whom is the mind directed? Who prompts the eye and the ear?"',
    icon: '🧠',
    tags: ['upanishad', 'kena', 'consciousness', 'witness'],
    component: KenaSensoryInquiry
  },
  {
    id: 'kena-inquiry-lab',
    name: 'Kena Epistemology Lab',
    sanskritName: 'ज्ञान मीमांसा पीठिका',
    category: 'scripture',
    scripture: 'Kena Upanishad',
    description: 'Interactive epistemological inquiry contrasting mental concepts with pure awareness.',
    icon: '💡',
    tags: ['upanishad', 'kena', 'epistemology', 'brahman'],
    component: KenaInquiryLab
  },
  {
    id: 'consciousness-state-mapper',
    name: 'Mandukya States Mapper',
    sanskritName: 'माण्डूक्य चतुष्पाद मानचित्र',
    category: 'scripture',
    scripture: 'Mandukya Upanishad',
    description: 'Explore the 4 quarters of consciousness: Waking (Jagrat), Dreaming (Svapna), Deep Sleep (Sushupti), and Turiya.',
    icon: '🕉️',
    tags: ['upanishad', 'mandukya', 'om', 'turiya', 'consciousness'],
    component: ConsciousnessStateMapper
  },
  {
    id: 'bhagavata-bhakti-flow',
    name: 'Navadha Bhakti Flow',
    sanskritName: 'नवधा भक्ति सोपान',
    category: 'scripture',
    scripture: 'Srimad Bhagavata',
    description: 'The ninefold pathway of devotion: Shravanam, Kirtanam, Smaranam, Padasevanam, Archanam, and beyond.',
    icon: '🪷',
    tags: ['bhagavata', 'bhakti', 'navadha', 'purana'],
    component: BhagavataBhaktiFlow
  },
  {
    id: 'vishnu-purana-cosmic-explorer',
    name: 'Vishnu Purana Cosmic Cycles',
    sanskritName: 'विष्णु पुराण काल चक्र',
    category: 'scripture',
    scripture: 'Vishnu Purana',
    description: 'Explore Kalpas, Manvantaras, Yugas, and the dissolution (Mahapralaya) of cosmic manifest existence.',
    icon: '🪐',
    tags: ['purana', 'vishnu', 'cosmology', 'kalpa'],
    component: VishnuPuranaCosmicExplorer
  },
  {
    id: 'marathi-heritage-explorer',
    name: 'Dnyaneshwari Heritage Lab',
    sanskritName: 'ज्ञानेश्वरी भावार्थ दर्शन',
    category: 'scripture',
    scripture: 'Dnyaneshwari / Marathi',
    description: 'Explore Sant Dnyaneshwar’s 13th-century Marathi Ovis, poetic metaphors, and Warkari Bhakti tradition.',
    icon: '🪕',
    tags: ['marathi', 'dnyaneshwar', 'warkari', 'heritage'],
    component: MarathiHeritageExplorer
  },

  // 🧘 PHILOSOPHICAL DISCIPLINES & MIND
  {
    id: 'pranayama-timer',
    name: 'Prāṇāyāma Breath Timer',
    sanskritName: 'प्राणायाम कुम्भक साधन',
    category: 'philosophy',
    scripture: 'Yoga Sutras',
    description: 'Guided Vedic breathing practitioner featuring Puraka (Inhale), Antar-Kumbhaka, Rechaka, and Bahir-Kumbhaka.',
    icon: '🌬️',
    tags: ['yoga', 'pranayama', 'breath', 'meditation'],
    component: PranayamaTimer
  },
  {
    id: 'yoga-mind-control',
    name: 'Citta Vṛtti Controller',
    sanskritName: 'चित्तवृत्ति निरोध साधन',
    category: 'philosophy',
    scripture: 'Yoga Sutras',
    description: 'Still the five cognitive modifications of the mind: Pramana, Viparyaya, Vikalpa, Nidra, and Smriti.',
    icon: '🌊',
    tags: ['yoga', 'mind', 'nirodha', 'patanjali'],
    component: YogaMindControl
  },
  {
    id: 'meditation-state-tracker',
    name: 'Meditation State Tracker',
    sanskritName: 'ध्यान अवस्था अनुक्रम',
    category: 'philosophy',
    scripture: 'Yoga Sutras & Gita',
    description: 'Track mental stillness progression across Kshipta (Restless), Mudha, Vikshipta, Ekagra, and Nirodha.',
    icon: '🧘',
    tags: ['meditation', 'dhyana', 'stillness', 'tracking'],
    component: MeditationStateTracker
  },
  {
    id: 'guna-balancing-simulator',
    name: 'Guna Balancing Simulator',
    sanskritName: 'गुण संतुलन मापक',
    category: 'philosophy',
    scripture: 'Sankhya & Vedanta',
    description: 'Self-evaluate your current Sattva, Rajas, and Tamas lifestyle distribution and receive balancing protocols.',
    icon: '⚖️',
    tags: ['gunas', 'sattva', 'balance', 'lifestyle'],
    component: GunaBalancingSimulator
  },
  {
    id: 'interactive-tattva-map',
    name: 'Sankhya 24 Tattvas Map',
    sanskritName: 'सांख्य चतुर्विंशति तत्त्व',
    category: 'philosophy',
    scripture: 'Sankhya Darshana',
    description: 'Interactive visual taxonomy mapping Purusha, Prakriti, Mahat, Ahamkara, Tanmatras, and Mahabhutas.',
    icon: '🗺️',
    tags: ['sankhya', 'tattvas', 'elements', 'cosmology'],
    component: InteractiveTattvaMap
  },
  {
    id: 'moksha-path-navigator',
    name: 'Moksha Path Navigator',
    sanskritName: 'मोक्ष मार्ग दिग्दर्शन',
    category: 'philosophy',
    scripture: 'Vedanta & Yoga',
    description: 'Discover your philosophical affinity across Jnana, Bhakti, Karma, and Raja Yoga paths.',
    icon: '🧭',
    tags: ['moksha', 'liberation', 'paths', 'yoga'],
    component: MokshaPathNavigator
  },
  {
    id: 'moksha-pathways-engine',
    name: 'Moksha Pathways Engine',
    sanskritName: 'मोक्ष साधन प्रविधि',
    category: 'philosophy',
    scripture: 'Vedanta & Yoga',
    description: 'Interactive diagnostic matching daily lifestyle constraints to personalized sadhana recommendations.',
    icon: '🛤️',
    tags: ['moksha', 'sadhana', 'engine', 'liberation'],
    component: MokshaPathwaysEngine
  },
  {
    id: 'jnana-progression-path',
    name: 'Sadhana Chatushtaya Path',
    sanskritName: 'साधन चतुष्टय सोपान',
    category: 'philosophy',
    scripture: 'Advaita Vedanta',
    description: 'Evaluate the 4 classic qualifications: Viveka (Discernment), Vairagya, Shat-sampat, and Mumukshutva.',
    icon: '🪜',
    tags: ['advaita', 'viveka', 'vairagya', 'qualifications'],
    component: JnanaProgressionPath
  },
  {
    id: 'divine-qualities-assessment',
    name: 'Divine Qualities Assessment',
    sanskritName: 'दैवी आसुरी सम्पद् मापन',
    category: 'philosophy',
    scripture: 'Bhagavad Gita 16',
    description: 'Evaluate the 26 Daivi (Divine) versus 6 Asuri (Demonic) dispositions that influence spiritual growth.',
    icon: '✨',
    tags: ['daivi', 'asuri', 'virtues', 'character'],
    component: DivineQualitiesAssessment
  },
  {
    id: 'dharma-decision-matrix',
    name: 'Dharma Decision Matrix',
    sanskritName: 'धर्म निर्णय पीठिका',
    category: 'philosophy',
    scripture: 'Dharmashastra & Gita',
    description: 'A multi-dimensional ethical decision matrix balancing Samanya Dharma, Vishesha Dharma, and Apaddharma.',
    icon: '⚖️',
    tags: ['dharma', 'ethics', 'decision', 'purushartha'],
    component: DharmaDecisionMatrix
  },
  {
    id: 'time-consciousness-wheel',
    name: 'Time Consciousness Wheel',
    sanskritName: 'काल चक्रानुक्रम',
    category: 'philosophy',
    scripture: 'Vedic Cosmology',
    description: 'From a Nimesha (blink of an eye) to Mahayugas and Kalpas: understand the cyclical nature of time.',
    icon: '⌛',
    tags: ['time', 'kala', 'chakra', 'yuga', 'eternity'],
    component: TimeConsciousnessWheel
  },

  // 🎼 CLASSICAL LINGUISTICS & INSTRUMENTS
  {
    id: 'chanting-trainer',
    name: 'Sanskrit Chanting Trainer',
    sanskritName: 'संस्कृत उच्चारण अभ्यास',
    category: 'linguistics',
    scripture: 'Shiksha Vedanga',
    description: 'Master Sanskrit phonetics, mouth positions (Sthana), breath effort (Prayatna), and meter rhythm.',
    icon: '🗣️',
    tags: ['chanting', 'phonetics', 'shiksha', 'pronunciation'],
    component: ChantingTrainer
  },
  {
    id: 'chhanda-analyzer',
    name: 'Chhanda Metrical Analyzer',
    sanskritName: 'छन्दः शास्त्र विश्लेषक',
    category: 'linguistics',
    scripture: 'Chhanda Vedanga',
    description: 'Detect syllable weight (Laghu/Guru) and verify classical meters like Anushtubh, Gayatri, and Trishtubh.',
    icon: '📜',
    tags: ['meter', 'chhanda', 'prosody', 'anushtubh'],
    component: ChhandaAnalyzer
  },
  {
    id: 'grammar-tokenizer',
    name: 'Sanskrit Grammar Tokenizer',
    sanskritName: 'व्याकरण पदच्छेद साधन',
    category: 'linguistics',
    scripture: 'Vyakarana Vedanga',
    description: 'Decompose Sanskrit compound words (Samasa), identify roots (Dhatu), and inspect inflected case endings.',
    icon: '🔤',
    tags: ['grammar', 'sandhi', 'samasa', 'panini'],
    component: GrammarTokenizer
  },
  {
    id: 'vedic-instruments',
    name: 'Classical Vedic Instruments',
    sanskritName: 'वैदिक वाद्य वृन्द',
    category: 'linguistics',
    scripture: 'Gandharva Veda',
    description: 'Audio and acoustical profiles of traditional sacred instruments: Vina, Shankha, Mridanga, and Flute.',
    icon: '🎺',
    tags: ['music', 'instruments', 'acoustics', 'sound'],
    component: VedicInstruments
  },
  {
    id: 'astro-explorer',
    name: 'Vedic Nakshatra & Astro Explorer',
    sanskritName: 'ज्योतिष नक्षत्र मण्डल',
    category: 'linguistics',
    scripture: 'Jyotisha Vedanga',
    description: 'Explore the 27 Nakshatras, lunar mansions, and planetary alignments mentioned in sacred literature.',
    icon: '⭐',
    tags: ['jyotisha', 'nakshatra', 'astronomy', 'stars'],
    component: AstroExplorer
  },
  {
    id: 'commentary-comparison-tool',
    name: 'Commentary Comparison Matrix',
    sanskritName: 'भाष्य तुलनात्मक पीठ',
    category: 'linguistics',
    scripture: 'Multi-Lineage Acharyas',
    description: 'Compare non-dual (Advaita), qualified (Vishishtadvaita), and dual (Dvaita) interpretations of verses.',
    icon: '📖',
    tags: ['bhashya', 'shankara', 'ramanuja', 'madhva', 'comparison'],
    component: CommentaryComparisonTool
  },
  {
    id: 'character-relationship-map',
    name: 'Epic Genealogy & Relationship Map',
    sanskritName: 'महाभारत वंशवृक्ष मानचित्र',
    category: 'linguistics',
    scripture: 'Mahabharata & Itihasa',
    description: 'Interactive family tree and allegiance network tracing Kuru dynasty relationships in the Great Epic.',
    icon: '🕸️',
    tags: ['genealogy', 'kuru', 'mahabharata', 'characters'],
    component: CharacterRelationshipMap
  }
]

function VedicLabContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialToolId = searchParams.get('tool') || null
  const initialCategory = searchParams.get('category') || 'all'

  const [selectedLabId, setSelectedLabId] = useState<string | null>(initialToolId)
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory)
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Selected tool object
  const activeTool = useMemo(() => {
    if (!selectedLabId) return null
    return LAB_STUDIO_REGISTRY.find(t => t.id === selectedLabId) || null
  }, [selectedLabId])

  // Filtered tools
  const filteredTools = useMemo(() => {
    return LAB_STUDIO_REGISTRY.filter(tool => {
      const matchesCategory =
        activeCategory === 'all' || tool.category === activeCategory

      const q = searchQuery.toLowerCase().trim()
      const matchesQuery =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.sanskritName.includes(q) ||
        tool.scripture.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.tags.some(t => t.toLowerCase().includes(q))

      return matchesCategory && matchesQuery
    })
  }, [activeCategory, searchQuery])

  const handleSelectTool = (id: string) => {
    setSelectedLabId(id)
    router.replace(`/lab?tool=${id}`, { scroll: false })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToDirectory = () => {
    setSelectedLabId(null)
    router.replace('/lab', { scroll: false })
  }

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-stone-900 selection:bg-orange-500/30 pb-32 pt-20 relative overflow-hidden transition-colors duration-500">
      {/* Ambient spiritual glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] bg-amber-200/20 rounded-full blur-[100px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[50vw] h-[50vw] bg-orange-200/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">

        {/* ━━━━━━━━━━━━━━━━━ MODE 1: FOCUSED WORKBENCH VIEW ━━━━━━━━━━━━━━━━━ */}
        {activeTool ? (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Workbench Navigation Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
              <button
                onClick={handleBackToDirectory}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-700 hover:text-orange-800 transition-colors w-fit"
              >
                &larr; Back to Studio Directory
              </button>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-black uppercase tracking-widest text-orange-800 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                  {activeTool.scripture}
                </span>
                <span className="text-xs font-serif font-bold text-stone-500">
                  {activeTool.sanskritName}
                </span>
              </div>
            </div>

            {/* Workbench Header */}
            <div className="max-w-3xl space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{activeTool.icon}</span>
                <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-stone-900">
                  {activeTool.name}
                </h1>
              </div>
              <p className="text-stone-600 text-sm sm:text-base font-medium leading-relaxed">
                {activeTool.description}
              </p>
            </div>

            {/* Active Component Workspace Canvas */}
            <div className="w-full bg-white/95 rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-lg backdrop-blur-sm">
              <activeTool.component />
            </div>

            {/* Related Labs Switcher */}
            <div className="pt-10 border-t border-stone-200 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-stone-500">
                More in {activeTool.category === 'scripture' ? 'Scripture Companions' : activeTool.category === 'philosophy' ? 'Philosophical Disciplines' : 'Linguistics & Instruments'}
              </h3>
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                {LAB_STUDIO_REGISTRY.filter(t => t.category === activeTool.category && t.id !== activeTool.id).slice(0, 5).map(rel => (
                  <button
                    key={rel.id}
                    onClick={() => handleSelectTool(rel.id)}
                    className="flex-shrink-0 p-3.5 bg-white rounded-2xl border border-stone-200 hover:border-orange-300 hover:shadow-md transition-all text-left max-w-[240px]"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span>{rel.icon}</span>
                      <span className="text-xs font-bold text-stone-900 truncate">{rel.name}</span>
                    </div>
                    <p className="text-[11px] text-stone-500 line-clamp-2">{rel.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (

        /* ━━━━━━━━━━━━━━━━━ MODE 2: STUDIO DIRECTORY VIEW ━━━━━━━━━━━━━━━━━ */
          <div className="space-y-12 animate-in fade-in duration-300">
            {/* Directory Hero */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-8 border-b border-stone-200">
              <div className="max-w-3xl space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-orange-600" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-700">
                    Interactive Vedic Studio
                  </span>
                </div>
                <h1 className="text-[clamp(2.75rem,5.5vw,4.5rem)] font-serif font-black tracking-tight text-stone-900 leading-[1.08]">
                  Vedic Labs
                </h1>
                <p className="text-stone-600 text-lg md:text-xl font-serif italic leading-relaxed">
                  Translating ancient scriptural measurements, meditative practices, and philosophical disciplines into interactive digital workbench tokens.
                </p>
              </div>

              <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-stone-200 shadow-sm text-xs font-bold">
                <span className="px-3.5 py-1.5 rounded-xl bg-orange-600 text-white">36 Studios</span>
                <span className="text-stone-500 pr-2">Zero Clutter</span>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                {[
                  { id: 'all', label: `All Studios (${LAB_STUDIO_REGISTRY.length})` },
                  { id: 'scripture', label: 'Scripture Companions' },
                  { id: 'philosophy', label: 'Philosophical Disciplines' },
                  { id: 'linguistics', label: 'Linguistics & Instruments' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      activeCategory === tab.id
                        ? 'bg-orange-700 text-white shadow-md'
                        : 'bg-white hover:bg-stone-100 text-stone-600 border border-stone-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="relative min-w-[260px] md:w-72">
                <input
                  type="text"
                  placeholder="Filter by name, scripture, tag..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-9 rounded-xl border border-stone-200 bg-white text-xs font-medium focus:outline-none focus:border-orange-500 shadow-sm"
                />
                <span className="absolute left-3 top-2.5 text-stone-400 text-xs">🔍</span>
              </div>
            </div>

            {/* Studio Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map(tool => (
                <article
                  key={tool.id}
                  className="group bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 hover:border-orange-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl p-2 rounded-xl bg-orange-50/80 border border-orange-100">
                        {tool.icon}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-orange-800 bg-orange-50/70 px-2.5 py-1 rounded-full border border-orange-200/60">
                        {tool.scripture}
                      </span>
                    </div>

                    <div>
                      <div className="text-xs font-serif font-bold text-orange-900/60 mb-0.5">
                        {tool.sanskritName}
                      </div>
                      <h2 className="text-xl font-serif font-black text-stone-900 group-hover:text-orange-700 transition-colors">
                        {tool.name}
                      </h2>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {tool.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {tool.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] font-medium text-stone-400 bg-stone-50 px-2 py-0.5 rounded-md border border-stone-100">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 mt-5 border-t border-stone-100">
                    <button
                      onClick={() => handleSelectTool(tool.id)}
                      className="w-full text-center py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-orange-700 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                    >
                      Launch Studio &rarr;
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default function VedicLabPage() {
  return (
    <Suspense fallback={<LabSkeleton />}>
      <VedicLabContent />
    </Suspense>
  )
}
