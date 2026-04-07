'use client'

import React, { useEffect, useState } from 'react'
import { NVFFragment } from '@/lib/nvf'
import Link from 'next/link'

interface CorrelationProps {
    currentVerse: NVFFragment
}

export default function PhilosophicalCorrelation({ currentVerse }: CorrelationProps) {
    const [related, setRelated] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!currentVerse.ai_metadata?.topics?.length) return

        const fetchRelated = async () => {
            setLoading(true)
            try {
                // In a real app, this would hit a vector search endpoint.
                // For this PoC, we use the local JSON search or a simulated lake hit.
                const topics = currentVerse.ai_metadata?.topics || []
                
                // MOCK LOGIC: We fetch some known 'related' verses based on common topics
                // This simulates what a real semantic engine would return
                const simulatedNetwork: any = {
                    'dharma': [
                        { id: 'bhagavad-gita_3_35', slok: 'श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्', text: 'Better is ones own duty, though devoid of merit, than the duty of another well performed.' },
                        { id: 'bhagavad-gita_18_66', slok: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज', text: 'Abandoning all duties, come unto Me alone for shelter.' },
                        { id: 'isha-upanishad_1_1', slok: 'ईशा वास्यमिदं सर्वं', text: 'All this, whatsoever moves in this universe, is enveloped by God.' }
                    ],
                    'yoga': [
                        { id: 'patanjali-yoga-sutras_1_2', slok: 'योगश्चित्तवृत्तिनिरोधः', text: 'Yoga is the restraint of the modifications of the mind-stuff.' },
                        { id: 'bhagavad-gita_6_46', slok: 'तपस्विभ्योऽधिको योगी ज्ञानिभ्योऽपि मतोऽधिकः', text: 'The yogi is thought to be superior to the ascetics...' }
                    ],
                    'battle': [
                        { id: 'bhagavad-gita_2_2', slok: 'कुतस्त्वा कश्मलमिदं विषमे समुपस्थितम्', text: 'Whence has this infatuation come to thee in this perilous strait...' },
                        { id: 'mahabharata_1_1', slok: 'नारायणं नमस्कृत्य नरं चैव नरोत्तमम्', text: 'Before reciting this history, one should offer obeisances...' }
                    ],
                    'karma': [
                        { id: 'bhagavad-gita_2_47', slok: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन', text: 'Your right is to work only, but never to its fruits.' },
                        { id: 'bhagavata-purana_1_1', slok: 'जन्माद्यस्य यतोऽन्वयादितरतश्चार्थेष्वभिज्ञः स्वराट्', text: 'The source of all creation, sustenance and destruction...' }
                    ]
                }

                const matches: any[] = []
                topics.forEach(t => {
                    if (simulatedNetwork[t]) matches.push(...simulatedNetwork[t])
                })

                setRelated(Array.from(new Set(matches.map(m => m.id))).map(id => matches.find(m => m.id === id)))
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        }

        fetchRelated()
    }, [currentVerse])

    if (!currentVerse.ai_metadata?.topics?.length) return null

    return (
        <div className="mt-16 pt-16 border-t border-stone-200">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-xl font-serif font-black text-stone-900 tracking-tight">Philosophical Correlation</h3>
                    <p className="text-sm text-stone-500">Cross-referenced wisdom with similar semantic essence</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[9px] font-black uppercase tracking-widest border border-amber-200">⚗ Prototype — mock index</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {loading ? (
                    <div className="col-span-2 py-12 text-center text-stone-300 animate-pulse font-medium tracking-widest uppercase text-xs">
                        Scanning Vedic Library...
                    </div>
                ) : related.length > 0 ? (
                    related.map((item, i) => (
                        <Link 
                            key={i}
                            href={`/${item.id.split('_').slice(0, 3).join('/')}`}
                            className="group p-6 bg-white border border-stone-100 rounded-2xl hover:border-orange-200 transition-all hover:bg-orange-50/10"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <span className="text-[10px] font-black text-orange-600/60 uppercase tracking-widest">{item.id.replace(/-/g, ' ').replace(/_/g, ' : ')}</span>
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </span>
                            </div>
                            <p className="text-sm font-semibold font-devanagari text-stone-800 line-clamp-1 mb-2">{item.slok}</p>
                            <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 italic">{item.text}</p>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-2 p-8 bg-stone-50 rounded-2xl border border-stone-100 text-center">
                        <p className="text-sm text-stone-400 font-medium">No direct correlations found for this specific context yet.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
