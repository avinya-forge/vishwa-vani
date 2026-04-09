import React from 'react'
import { render, screen } from '@testing-library/react'
import AcknowledgmentsPage from '@/app/acknowledgments/page'

// Mock next-intl server setRequestLocale
jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn(),
}))

// Mock Layout components to avoid sub-rendering complexity in unit test
jest.mock('@/components/layout/Header', () => () => <div data-testid="mock-header" />)
jest.mock('@/components/layout/Footer', () => () => <div data-testid="mock-footer" />)

describe('AcknowledgmentsPage', () => {
  it('renders the main heading', () => {
    render(<AcknowledgmentsPage />)
    expect(screen.getByText('Acknowledgments')).toBeInTheDocument()
  })

  it('renders scholarly sources section', () => {
    render(<AcknowledgmentsPage />)
    expect(screen.getByText('📜 Scholarly Sources')).toBeInTheDocument()
    expect(screen.getByText('BORI Critical Edition')).toBeInTheDocument()
  })

  it('renders open source section', () => {
    render(<AcknowledgmentsPage />)
    expect(screen.getByText('🛠️ Open Source & Libraries')).toBeInTheDocument()
    expect(screen.getByText('Next.js')).toBeInTheDocument()
  })

  it('renders the contribute button', () => {
    render(<AcknowledgmentsPage />)
    const button = screen.getByText('Contribute on GitHub')
    expect(button).toBeInTheDocument()
    expect(button.closest('a')).toHaveAttribute('href', 'https://github.com/avinya-forge/vishwa-vani')
  })
})
