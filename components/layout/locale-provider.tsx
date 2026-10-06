'use client'

import { NextIntlClientProvider } from 'next-intl'
import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import en from '@/messages/en.json'
import hi from '@/messages/hi.json'
import mr from '@/messages/mr.json'

const messagesMap = { en, hi, mr }

export default function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('vishwa_lang')
    const initialLocale = (stored && ['en', 'hi', 'mr'].includes(stored)) ? stored : 'en'
    setLocale(initialLocale)
    document.documentElement.lang = initialLocale // PROD-014: Set HTML lang for SEO/a11y

    // Listen for custom locale change events
    const handleLocaleChange = (e: unknown) => {
      const newLocale = (e as Record<string, unknown>).detail as string
      setLocale(newLocale)
      document.documentElement.lang = newLocale // PROD-014: Sync lang on change
    }
    window.addEventListener('vishwa-locale-change', handleLocaleChange as EventListener)
    return () => window.removeEventListener('vishwa-locale-change', handleLocaleChange)
  }, [])

  return (
    <div suppressHydrationWarning>
      <NextIntlClientProvider
        locale={locale}
        messages={messagesMap[locale as keyof typeof messagesMap]}
        timeZone="UTC"
      >
        {children}
      </NextIntlClientProvider>
    </div>
  )
}

export function changeVishwaLocale(newLocale: string) {
  localStorage.setItem('vishwa_lang', newLocale)
  window.dispatchEvent(new CustomEvent('vishwa-locale-change', { detail: newLocale }))
}
