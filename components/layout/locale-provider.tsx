'use client'

import { NextIntlClientProvider } from 'next-intl'
import { useState, useEffect, ReactNode } from 'react'
import en from '@/messages/en.json'
import hi from '@/messages/hi.json'
import mr from '@/messages/mr.json'

const messagesMap = { en, hi, mr }

export default function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('vishwa_lang')
    if (stored && ['en', 'hi', 'mr'].includes(stored)) {
      setLocale(stored)
    }
    setMounted(true)

    // Listen for custom locale change events
    const handleLocaleChange = (e: any) => {
      setLocale(e.detail)
    }
    window.addEventListener('vishwa-locale-change', handleLocaleChange)
    return () => window.removeEventListener('vishwa-locale-change', handleLocaleChange)
  }, [])

  return (
    <NextIntlClientProvider 
      locale={locale} 
      messages={messagesMap[locale as keyof typeof messagesMap]}
      timeZone="UTC"
    >
      {children}
    </NextIntlClientProvider>
  )
}

// Global helper to change locale
export function changeVishwaLocale(newLocale: string) {
  localStorage.setItem('vishwa_lang', newLocale)
  window.dispatchEvent(new CustomEvent('vishwa-locale-change', { detail: newLocale }))
}
