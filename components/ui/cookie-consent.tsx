'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    // Check if consent has already been given or denied
    const consent = localStorage.getItem('vv_cookie_consent')
    if (!consent) {
      setShowConsent(true)
    } else if (consent === 'granted') {
      // Trigger analytics initialization manually if needed, 
      // but in Next.js we will conditionally render the GA component based on this value in layout or via an event.
      window.dispatchEvent(new Event('cookie-consent-granted'))
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('vv_cookie_consent', 'granted')
    setShowConsent(false)
    window.dispatchEvent(new Event('cookie-consent-granted'))
  }

  const handleDecline = () => {
    localStorage.setItem('vv_cookie_consent', 'denied')
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-stone-900 border-t border-stone-800 p-4 sm:p-6 z-[2000] shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-stone-300 text-sm max-w-4xl">
        <strong className="text-white block mb-1 text-base">We value your privacy (UK GDPR Compliance)</strong>
        We use essential cookies to make our site work. With your consent, we may also use non-essential cookies (like Google Analytics) to improve user experience and analyze website traffic. By clicking &quot;Accept All&quot;, you agree to our website&apos;s cookie use as described in our Privacy Policy.
      </div>
      <div className="flex flex-col sm:flex-row gap-3 min-w-fit w-full sm:w-auto">
        <button
          onClick={handleDecline}
          className="px-6 py-2 rounded-lg border border-stone-600 text-stone-300 hover:bg-stone-800 hover:text-white transition-colors font-medium whitespace-nowrap"
        >
          Decline Optional
        </button>
        <button
          onClick={handleAccept}
          className="px-6 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition-colors font-medium whitespace-nowrap shadow-lg"
        >
          Accept All
        </button>
      </div>
    </div>
  )
}
