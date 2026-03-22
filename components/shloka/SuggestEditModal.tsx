'use client'

import React, { useState } from 'react'

interface SuggestEditModalProps {
    isOpen: boolean
    onClose: () => void
    verseId: string
    originalContent: string
    lang: string
}

export default function SuggestEditModal({ isOpen, onClose, verseId, originalContent, lang }: SuggestEditModalProps) {
    const [suggestion, setSuggestion] = useState(originalContent)
    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        
        // Simulate API call to content moderation queue
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // In this PoC, we save to localStorage to show it's "processed"
        const existing = JSON.parse(localStorage.getItem('vishwa_edits') || '[]')
        existing.push({ verseId, lang, content: suggestion, timestamp: new Date().toISOString() })
        localStorage.setItem('vishwa_edits', JSON.stringify(existing))
        
        setSubmitting(false)
        setSuccess(true)
        
        setTimeout(() => {
            setSuccess(false)
            onClose()
        }, 1500)
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl p-8 border border-stone-100 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/50 blur-[60px] opacity-40" />
                
                <h2 className="text-xl font-serif font-black text-stone-900 mb-2 relative z-10 flex items-center gap-3">
                    <span className="bg-orange-600 text-white text-[9px] px-2 py-1 rounded-md uppercase font-black tracking-widest">
                        Suggest Edit
                    </span>
                    {verseId}
                </h2>
                <p className="text-stone-500 text-xs font-medium mb-8 relative z-10">
                    Help us preserve the wisdom. Your correction will be reviewed by our scholar community.
                </p>

                {success ? (
                   <div className="text-center py-12 animate-in zoom-in-95 duration-500">
                      <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl border border-emerald-100">
                        ✓
                      </div>
                      <p className="text-stone-800 font-bold">Contribution Received!</p>
                      <p className="text-stone-400 text-xs mt-1">Thank you for preserving the Vedic voice.</p>
                   </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-stone-300 mb-3 block">
                                Current Representation ({lang.toUpperCase()})
                            </label>
                            <textarea 
                                value={suggestion}
                                onChange={(e) => setSuggestion(e.target.value)}
                                className="w-full h-32 p-4 bg-[#FDFBF7] border border-stone-200 rounded-2xl text-[14px] text-stone-800 focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all outline-none resize-none"
                                placeholder="..."
                            />
                        </div>

                        <div className="flex gap-4">
                            <button 
                                type="button"
                                onClick={onClose}
                                className="flex-1 py-4 bg-stone-50 text-stone-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-stone-100 transition-all"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit"
                                disabled={submitting}
                                className="flex-1 py-4 bg-stone-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-stone-200 hover:bg-orange-600 transition-all disabled:opacity-50"
                            >
                                {submitting ? 'Transmitting...' : 'Submit Revision'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}
