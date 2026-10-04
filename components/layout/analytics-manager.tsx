'use client'

import { useState, useEffect } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/react'

export default function AnalyticsManager() {
  const [consentGranted, setConsentGranted] = useState(false)

  useEffect(() => {
    // Check initial state
    const consent = localStorage.getItem('vv_cookie_consent')
    if (consent === 'granted') {
      setConsentGranted(true)
    }

    // Listen for state changes from the banner
    const handleConsent = () => {
      setConsentGranted(true)
    }

    window.addEventListener('cookie-consent-granted', handleConsent)
    return () => window.removeEventListener('cookie-consent-granted', handleConsent)
  }, [])

  if (!consentGranted) {
    return null
  }

  return (
    <>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || "G-6C2H9NLMJM"} />
      <Analytics />
    </>
  )
}
