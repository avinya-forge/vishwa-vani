import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from '@/components/layout/Header'

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: jest.fn() }),
}))

// Mock AnimatedStat
jest.mock('@/components/ui/animated-stat', () => ({
  AnimatedStat: ({ targetCount }: { targetCount: number }) => <span>{targetCount}</span>,
}))

describe('Header Component & Mobile Navigation', () => {
  beforeEach(() => {
    localStorage.clear()
    document.body.innerHTML = ''
  })

  test('renders logo and branding', () => {
    render(<Header />)
    expect(screen.getByText('Vishwa-Vani')).toBeInTheDocument()
    expect(screen.getByText('ॐ')).toBeInTheDocument()
  })

  test('toggles mobile menu on button click and renders opaque portal drawer', () => {
    render(<Header />)
    const toggleBtn = screen.getByLabelText('Toggle Navigation Menu')
    expect(toggleBtn).toBeInTheDocument()

    // Initially mobile menu is closed
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    // Click to open
    fireEvent.click(toggleBtn)
    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(screen.getByText('Featured Scriptures')).toBeInTheDocument()
    expect(screen.getByText('Deep Multi-Lingual Search')).toBeInTheDocument()

    // Click backdrop to close
    const backdrop = document.querySelector('.bg-stone-950\\/70')
    if (backdrop) {
      fireEvent.click(backdrop)
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    }
  })

  test('closes mobile menu on escape key press', () => {
    render(<Header />)
    const toggleBtn = screen.getByLabelText('Toggle Navigation Menu')
    fireEvent.click(toggleBtn)
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    fireEvent.keyDown(window, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
