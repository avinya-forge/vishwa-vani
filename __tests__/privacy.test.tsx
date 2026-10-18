import React from 'react'
import { render, screen } from '@testing-library/react'
import PrivacyPage from '@/app/privacy/page'

// Mock Header and Footer
jest.mock('@/components/layout/Header', () => () => <header data-testid="mock-header" />)
jest.mock('@/components/layout/Footer', () => () => <footer data-testid="mock-footer" />)

describe('Privacy & Data Governance Page', () => {
  test('renders page heading and ethical data governance sections', () => {
    render(<PrivacyPage />)
    expect(screen.getByText('Privacy & Data Ethics')).toBeInTheDocument()
    expect(screen.getByText('Zero Invasive Profiling & Local Storage')).toBeInTheDocument()
    expect(screen.getByText('Analytics & Regional Aggregation')).toBeInTheDocument()
    expect(screen.getByText('Voluntary Subscriptions & Communication')).toBeInTheDocument()
    expect(screen.getByText('Open Source & Public Domain Heritage')).toBeInTheDocument()
  })
})
