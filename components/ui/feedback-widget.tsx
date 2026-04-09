'use client'

import { useState } from 'react'

export default function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [type, setType] = useState('Bug')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorText, setErrorText] = useState('')
  const [issueUrl, setIssueUrl] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (message.length < 200) {
      setErrorText('Please provide at least 200 characters so we have enough context to fix the issue.')
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
        className="fixed bottom-6 right-6 bg-orange-600 hover:bg-orange-700 text-white rounded-full p-3 shadow-lg z-50 transition-transform hover:scale-105 flex items-center justify-center"
        aria-label="Report an issue or give feedback"
        title="Report an issue or give feedback"
      >
        <span className="text-xl px-2">💬 Feedback</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-stone-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
              aria-label="Close"
            >
              ✕
            </button>

            <h2 className="text-2xl font-devanagari font-bold text-orange-900 mb-4">Beta Feedback</h2>

            {status === 'success' ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Thank you!</h3>
                <p className="mb-2">Your feedback has been submitted successfully.</p>
                {issueUrl && (
                  <a href={issueUrl} target="_blank" rel="noopener noreferrer" className="text-green-700 underline font-medium">
                    View Issue on GitHub
                  </a>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-4 w-full bg-stone-200 hover:bg-stone-300 text-stone-800 py-2 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="feedback-type" className="block text-sm font-medium text-stone-700 mb-1">Type of Feedback</label>
                  <select
                    id="feedback-type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full border-stone-300 rounded-lg shadow-sm focus:border-orange-500 focus:ring-orange-500 bg-stone-50 p-2 border"
                  >
                    <option>Bug</option>
                    <option>Suggestion</option>
                    <option>Content Error</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="feedback-message" className="block text-sm font-medium text-stone-700 mb-1">
                    Details <span className="text-stone-400 font-normal">(min 200 chars)</span>
                  </label>
                  <textarea
                    id="feedback-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    placeholder="Please describe the issue or suggestion in detail..."
                    className="w-full border-stone-300 rounded-lg shadow-sm focus:border-orange-500 focus:ring-orange-500 bg-stone-50 p-2 border"
                    required
                  />
                  <div className={`text-xs mt-1 ${message.length < 200 ? 'text-red-500' : 'text-green-600'}`}>
                    {message.length}/200 characters minimum
                  </div>
                </div>

                <div>
                  <label htmlFor="feedback-email" className="block text-sm font-medium text-stone-700 mb-1">
                    Email <span className="text-stone-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="email"
                    id="feedback-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="For follow-up questions"
                    className="w-full border-stone-300 rounded-lg shadow-sm focus:border-orange-500 focus:ring-orange-500 bg-stone-50 p-2 border"
                  />
                </div>

                {errorText && (
                  <div className="text-red-600 text-sm bg-red-50 p-2 rounded border border-red-100">
                    {errorText}
                  </div>
                )}

                <div className="flex space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 bg-stone-200 hover:bg-stone-300 text-stone-800 py-2 rounded-lg font-medium transition-colors"
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
