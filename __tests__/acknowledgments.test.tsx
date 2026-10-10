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

// Mock texts
// Removed mock
jest.mock('@/lib/server-lake', () => ({
  getDynamicLibraryStats: jest.fn().mockResolvedValue({
    completedBooks: 4, pipelineBooks: 13, completedVerses: 950
  })
}))

describe('AcknowledgmentsPage', () => {
  it('renders the main heading', async () => {
    const ui = await AcknowledgmentsPage()
    render(ui)
    expect(screen.getByText('Acknowledgments')).toBeInTheDocument()
  })

  it('renders scholarly sources section', async () => {
    const ui = await AcknowledgmentsPage()
    render(ui)
    expect(screen.getByText('📜 Scholarly Sources')).toBeInTheDocument()
    expect(screen.getByText('BORI Critical Edition')).toBeInTheDocument()
  })

  it('renders open source section', async () => {
    const ui = await AcknowledgmentsPage()
    render(ui)
    expect(screen.getByText('🛠️ Open Source & Libraries')).toBeInTheDocument()
    expect(screen.getByText('Next.js')).toBeInTheDocument()
  })

  it('renders the contribute button', async () => {
    const ui = await AcknowledgmentsPage()
    render(ui)
    const button = screen.getByText('Contribute on GitHub')
    expect(button).toBeInTheDocument()
    expect(button.closest('a')).toHaveAttribute('href', 'https://github.com/avinya-forge/vishwa-vani')
  })
})
