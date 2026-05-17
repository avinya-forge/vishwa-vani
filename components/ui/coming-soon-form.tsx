'use client'

import React, { useState } from 'react'

interface ComingSoonFormProps {
  bookName: string
  bookSlug: string
}

export default function ComingSoonForm({ bookName, bookSlug }: ComingSoonFormProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }

    setLoading(true)
    setError('')

    // Simulate database/API registration
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      // Safely register waitlist subscription in localStorage for UI state persistence
      localStorage.setItem(`waitlist_${bookSlug}`, email)
    }, 800)
  }

  if (submitted) {
    return (
      <div className="bg-orange-50/50 dark:bg-stone-800/30 border border-orange-100 dark:border-stone-800 rounded-3xl p-6 text-center animate-fade-in">
        <span className="text-3xl block mb-2">✨</span>
        <h4 className="text-sm font-black text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-2">
          Clearance Waitlist Active
        </h4>
        <p className="text-xs text-stone-600 dark:text-stone-400 font-medium leading-relaxed">
          Your email <strong className="text-orange-600 dark:text-orange-400">{email}</strong> has been cleared. 
          You will receive immediate notifications the moment <strong className="text-stone-800 dark:text-stone-200">{bookName}</strong> completes its final scholarly gold audit.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-2">
        <label className="text-[10px] text-stone-400 dark:text-stone-500 font-black uppercase tracking-widest text-left pl-1">
          Join Ingestion Waitlist
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (error) setError('')
            }}
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 text-xs bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-800 rounded-xl focus:outline-none focus:border-orange-500 dark:focus:border-orange-400 text-stone-800 dark:text-stone-200 placeholder-stone-400 font-medium transition-all"
            disabled={loading}
          />
          <button
            type="submit"
            className="px-6 py-3 bg-stone-900 dark:bg-stone-100 hover:bg-orange-600 dark:hover:bg-orange-400 text-white dark:text-stone-900 hover:text-white dark:hover:text-stone-900 font-black text-[10px] uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-98 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Subscribing...' : 'Notify Me'}
          </button>
        </div>
        {error && (
          <p className="text-[10px] text-red-500 font-bold text-left pl-1">
            ⚠️ {error}
          </p>
        )}
      </div>
    </form>
  )
}
