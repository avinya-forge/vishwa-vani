import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vedic Labs | Experimental Vedic Tools',
  description: 'Interactive digital experience tokens translating ancient Vedic measurements and philosophical disciplines.',
  openGraph: {
    title: 'Vedic Labs | Vishwa-Vani',
    description: 'Explore interactive tools for Pranayama, Akshauhini, and Vedic philosophy.',
    images: ['https://vishwavani.app/og-image.jpg']
  }
}

export default function LabLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
