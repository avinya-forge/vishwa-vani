'use client'

import { useState, useEffect } from 'react'

export default function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [type, setType] = useState('Bug')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorText, setErrorText] = useState('')
  const [issueUrl, setIssueUrl] = useState('')

  useEffect(() => {
    const handleOpenFeedback = (e: Event) => {
      setIsOpen(true);
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        const { textSlug, chapter } = customEvent.detail;
        if (textSlug) {
          setMessage(`Context: ${textSlug} Chapter ${chapter}\n\n`);
        }
      }
    };
    window.addEventListener('open-feedback', handleOpenFeedback);
    return () => window.removeEventListener('open-feedback', handleOpenFeedback);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (message.length < 50) {
      setErrorText('Please provide at least 50 characters so we have enough context to fix the issue.')
      return
    }

    setStatus('loading')
    setErrorText('')

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, message, email })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit feedback')
      }

      setStatus('success')
      setIssueUrl(data.url)
      // We don't reset form so they can copy what they wrote if needed,
      // but they can dismiss the modal.
    } catch (err: unknown) {
      setStatus('error')
      if (err instanceof Error) {
        setErrorText(err.message)
      } else {
        setErrorText('An unexpected error occurred.')
      }
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-orange-600 hover:bg-orange-700 text-white rounded-full p-2.5 sm:p-3 shadow-lg z-50 transition-transform hover:scale-105 flex items-center justify-center border-2 border-white/20"
        aria-label="Report an issue or give feedback"
        title="Report an issue or give feedback"
      >
        <span className="text-sm sm:text-lg px-1 sm:px-2 flex items-center gap-2">
          <span>💬</span>
          <span className="hidden xs:inline font-bold uppercase tracking-widest text-[10px] sm:text-xs">Feedback</span>
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-stone-900/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-stone-900 rounded-xl shadow-2xl max-w-lg w-full p-6 relative border border-stone-100 dark:border-stone-800">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              aria-label="Close"
            >
              ✕
            </button>

            <h2 className="text-2xl font-devanagari font-bold text-orange-900 dark:text-orange-400 mb-1">Feedback</h2>
            <p className="text-[10px] text-stone-400 dark:text-stone-500 mb-4 font-bold uppercase tracking-widest">Feedback is tracked as GitHub Issues</p>

            {status === 'success' ? (
              <div className="bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-900 text-green-800 dark:text-green-300 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Thank you!</h3>
                <p className="mb-2">Your feedback has been submitted successfully.</p>
                {issueUrl && (
                  <a href={issueUrl} target="_blank" rel="noopener noreferrer" className="text-green-700 dark:text-green-400 underline font-medium">
                    View Issue on GitHub
                  </a>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-4 w-full bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 text-stone-800 dark:text-stone-200 py-2 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="feedback-type" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Type of Feedback</label>
                  <select
                    id="feedback-type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full border-stone-300 dark:border-stone-700 rounded-lg shadow-sm focus:border-orange-500 focus:ring-orange-500 bg-stone-50 dark:bg-stone-800 dark:text-stone-200 p-2 border"
                  >
                    <option>Bug</option>
                    <option>Suggestion</option>
                    <option>Content Error</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="feedback-message" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Details <span className="text-stone-400 dark:text-stone-500 font-normal">(min 50 chars)</span>
                  </label>
                  <textarea
                    id="feedback-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    placeholder="Please describe the issue or suggestion in detail..."
                    className="w-full border-stone-300 dark:border-stone-700 rounded-lg shadow-sm focus:border-orange-500 focus:ring-orange-500 bg-stone-50 dark:bg-stone-800 dark:text-stone-200 dark:placeholder:text-stone-600 p-2 border"
                    required
                  />
                  <div className={`text-xs mt-1 ${message.length < 50 ? 'text-red-500' : 'text-green-600'}`}>
                    {message.length}/50 characters minimum
                  </div>
                </div>

                <div>
                  <label htmlFor="feedback-email" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Email <span className="text-stone-400 dark:text-stone-500 font-normal">(optional)</span>
                  </label>
                  <input
                    type="email"
                    id="feedback-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="For follow-up questions"
                    className="w-full border-stone-300 dark:border-stone-700 rounded-lg shadow-sm focus:border-orange-500 focus:ring-orange-500 bg-stone-50 dark:bg-stone-800 dark:text-stone-200 dark:placeholder:text-stone-600 p-2 border"
                  />
                </div>

                {errorText && (
                  <div className="text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-950/40 p-2 rounded border border-red-100 dark:border-red-900">
                    {errorText}
                  </div>
                )}

                <div className="flex space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 text-stone-800 dark:text-stone-200 py-2 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
