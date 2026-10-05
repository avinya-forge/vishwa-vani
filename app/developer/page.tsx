'use client'

import React, { useState } from 'react'
import { Code, Mail, Send, Terminal, Cpu, Users, HeartHandshake, Briefcase, FileText, User } from 'lucide-react'

export default function DeveloperPage() {
  const [feedback, setFeedback] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!feedback.trim()) return

    setStatus('submitting')
    
    // Simulate API call for now. In reality, this will hit a Next.js API route.
    setTimeout(() => {
      setStatus('success')
      setFeedback('')
      setEmail('')
      setTimeout(() => setStatus('idle'), 3000)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#1C1917] py-16 selection:bg-orange-500/20">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-orange-100/30 dark:bg-orange-950/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[40%] right-0 w-[500px] h-[500px] bg-emerald-100/20 dark:bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-stone-100 dark:bg-stone-800 rounded-2xl mb-6 shadow-sm">
            <Terminal className="w-8 h-8 text-stone-700 dark:text-stone-300" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-black text-stone-900 dark:text-stone-100 mb-6 tracking-tight">
            Developer <span className="text-orange-600 dark:text-orange-500">Info</span> & Feedback
          </h1>
          <p className="text-lg text-stone-600 dark:text-stone-400 font-serif max-w-2xl mx-auto leading-relaxed">
            Vishwa-Vani is an open-source initiative powered by advanced AI architecture and built to digitize and preserve ancient Vedic knowledge for the modern world.
          </p>
        </div>

        {/* Developer Bio Card */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 rounded-3xl p-8 mb-8 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-stone-100 dark:bg-stone-800 border-4 border-white dark:border-stone-900 shadow-xl flex items-center justify-center shrink-0">
            <User className="w-12 h-12 text-stone-400 dark:text-stone-500" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-black text-stone-900 dark:text-stone-100 mb-2">
              The Developer
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed font-serif mb-6">
              I am a software engineer passionate about preserving ancient knowledge through modern, scalable, and resilient architecture. I specialize in highly autonomous AI agent workflows, Next.js, and creating hack-proof, zero-CLS web applications.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white rounded-xl text-xs font-bold hover:bg-[#004182] transition-colors shadow-sm">
                <Briefcase className="w-4 h-4" />
                LinkedIn
              </a>
              <a href="/resume.pdf" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-stone-800 dark:bg-stone-700 text-white rounded-xl text-xs font-bold hover:bg-stone-700 dark:hover:bg-stone-600 transition-colors shadow-sm">
                <FileText className="w-4 h-4" />
                Resume / CV
              </a>
              <a href="https://github.com/vishwa-vani" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-xl text-xs font-bold hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors border border-stone-200 dark:border-stone-700 shadow-sm">
                <Code className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Mission Card */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 rounded-3xl p-8 shadow-sm">
            <h2 className="flex items-center gap-3 text-xl font-black text-stone-900 dark:text-stone-100 mb-4">
              <Cpu className="w-5 h-5 text-orange-500" />
              The Architecture
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-4 font-serif">
              Built on <strong>Next.js App Router</strong>, styled with <strong>Tailwind CSS</strong>, and powered by highly autonomous AI agent loop engineering. The platform prioritizes:
            </p>
            <ul className="space-y-2 text-sm text-stone-500 dark:text-stone-400 font-serif">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Zero Cumulative Layout Shift (CLS)</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Edge-ready performance</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Hack-proof security standards</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Typographical & Multilingual purity</li>
            </ul>
          </div>

          {/* Connect Card */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 rounded-3xl p-8 shadow-sm">
            <h2 className="flex items-center gap-3 text-xl font-black text-stone-900 dark:text-stone-100 mb-4">
              <Users className="w-5 h-5 text-emerald-500" />
              Connect With Us
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-6 font-serif">
              Interested in contributing, reporting a bug, or suggesting a new scripture for integration? We rely on community support to curate and verify these ancient texts.
            </p>
            <div className="space-y-4">
              <a href="https://github.com/vishwa-vani" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm font-bold text-stone-700 dark:text-stone-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                <Code className="w-5 h-5" />
                View Repository on GitHub
              </a>
              <a href="mailto:hello@vishwavani.com" className="flex items-center gap-3 text-sm font-bold text-stone-700 dark:text-stone-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                <Mail className="w-5 h-5" />
                Contact the Developers
              </a>
            </div>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 rounded-3xl p-8 sm:p-12 shadow-md">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-black text-stone-900 dark:text-stone-100 mb-2 flex items-center justify-center gap-3">
              <HeartHandshake className="w-6 h-6 text-orange-500" />
              Leave Your Feedback
            </h2>
            <p className="text-center text-stone-500 dark:text-stone-400 text-sm font-serif mb-8">
              Spotted a translation error? Have an idea for a feature? Let us know below.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-xs font-black uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="For follow-up questions..."
                  className="w-full bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 rounded-xl px-4 py-3 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all font-sans"
                />
              </div>
              
              <div>
                <label htmlFor="feedback" className="block text-xs font-black uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2">
                  Your Message <span className="text-orange-500">*</span>
                </label>
                <textarea
                  id="feedback"
                  required
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="I loved reading the Gita, but I noticed a typo in Chapter 2..."
                  rows={5}
                  className="w-full bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 rounded-xl px-4 py-3 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all font-sans resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting' || !feedback.trim()}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all ${
                  status === 'success'
                    ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                    : 'bg-orange-600 hover:bg-orange-500 text-white shadow-orange-500/20 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                {status === 'submitting' ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : status === 'success' ? (
                  'Message Sent!'
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Feedback
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}
