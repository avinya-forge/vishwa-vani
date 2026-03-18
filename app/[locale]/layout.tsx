import { Inter } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { GoogleAnalytics } from '@next/third-parties/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import SecurityShield from '@/components/layout/SecurityShield'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'hi' }, { locale: 'mr' }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'home' })
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <head>
        <meta name="theme-color" content="#EA580C" />
        <meta
          http-equiv="Content-Security-Policy"
          content="default-src 'self' https://*.googletagmanager.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com;"
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#FDFBF7] text-stone-900`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <SecurityShield />
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
        {/* Placeholder GA Measurement ID. Update before shipping. */}
        <GoogleAnalytics gaId="G-XXXXXX" />
      </body>
    </html>
  )
}

