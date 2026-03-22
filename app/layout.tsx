import { Inter, Noto_Serif_Devanagari, Outfit } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { GoogleAnalytics } from '@next/third-parties/google'
import LocaleProvider from '@/components/layout/LocaleProvider'
import SecurityShield from '@/components/layout/SecurityShield'
import { setRequestLocale } from 'next-intl/server'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const notoSerifDevanagari = Noto_Serif_Devanagari({ 
    weight: ['400', '700', '900'],
    subsets: ['devanagari'],
    variable: '--font-devanagari'
})
const outfit = Outfit({ 
    subsets: ['latin'],
    variable: '--font-outfit'
})

export const metadata = {
    title: 'Vishwa-Vani | The Universal Voice of Vedic Wisdom',
    description: 'A comprehensive, multi-language digital sanctuary for the Bhagavad Gita, Upanishads, and the 16 Samskaras.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Hardcode 'en' as the default server-side baseline for static export.
  // The client side LocaleProvider will handle actual user preferences.
  setRequestLocale('en')
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#EA580C" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self' https://*.googletagmanager.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com; worker-src 'self' blob:;"
        />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} ${notoSerifDevanagari.variable} ${outfit.variable} font-sans min-h-screen flex flex-col bg-[#FDFBF7] text-stone-900 overflow-x-hidden`}>
        <LocaleProvider>
          <SecurityShield />
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </LocaleProvider>
        {/* Mute benign ResizeObserver error for cleaner showcase */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('error', e => {
                if (e.message === 'ResizeObserver loop completed with undelivered notifications') {
                  const resizeObserverErrDiv = document.getElementById('webpack-dev-server-client-overlay-div');
                  const resizeObserverErr = document.getElementById('webpack-dev-server-client-overlay');
                  if (resizeObserverErr) resizeObserverErr.style.display = 'none';
                  if (resizeObserverErrDiv) resizeObserverErrDiv.style.display = 'none';
                  e.stopImmediatePropagation();
                }
              });
            `,
          }}
        />
        {/* Placeholder GA Measurement ID. Update before shipping. */}
        <GoogleAnalytics gaId="G-XXXXXX" />
      </body>
    </html>
  )
}

