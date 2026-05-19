import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import SanyasaParadoxResolver from '@/components/lab/sanyasa-paradox-resolver'

describe('Sanyasa Paradox Resolver (LAB-GITA-004)', () => {
  it('renders the initial state with the first scenario', () => {
    render(<SanyasaParadoxResolver />)

    // Check main headings
    expect(screen.getByText('Sanyāsa Paradox Resolver')).toBeInTheDocument()
    expect(screen.getByText('Chapters 4 & 5 — How to act while renouncing?')).toBeInTheDocument()

    // Check first scenario title
    expect(screen.getByText('The Stagnant Career')).toBeInTheDocument()

    // Check buttons are present
    expect(screen.getByRole('button', { name: /Accept & Act \(Karma Yoga\)/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Walk Away \(Sannyasa\)/i })).toBeInTheDocument()

    // Path resolution should not be visible initially
    expect(screen.queryByText(/Krishna's Guidance/i)).not.toBeInTheDocument()
  })

  it('reveals guidance when the Action path is selected', () => {
    render(<SanyasaParadoxResolver />)

    const actionBtn = screen.getByRole('button', { name: /Accept & Act \(Karma Yoga\)/i })
    fireEvent.click(actionBtn)

    // Now guidance should be visible
    expect(screen.getByText("Krishna's Guidance")).toBeInTheDocument()
    expect(screen.getByText(/Perform the new role flawlessly/i)).toBeInTheDocument()
    expect(screen.getByText('BG 5.7')).toBeInTheDocument()

    // The "Next Scenario" button should appear
    expect(screen.getByRole('button', { name: /Next Scenario →/i })).toBeInTheDocument()
  })

  it('reveals guidance when the Renunciation path is selected', () => {
    render(<SanyasaParadoxResolver />)

    const sannyasaBtn = screen.getByRole('button', { name: /Walk Away \(Sannyasa\)/i })
    fireEvent.click(sannyasaBtn)

    // Now guidance should be visible
    expect(screen.getByText("Krishna's Guidance")).toBeInTheDocument()
    expect(screen.getByText(/Renounce the promotion and the worldly ambition/i)).toBeInTheDocument()
    expect(screen.getByText('BG 5.6')).toBeInTheDocument()
  })

  it('can progress to the next scenario', () => {
    render(<SanyasaParadoxResolver />)

    // Select a path to unlock the next button
    fireEvent.click(screen.getByRole('button', { name: /Accept & Act \(Karma Yoga\)/i }))

    const nextBtn = screen.getByRole('button', { name: /Next Scenario →/i })
    fireEvent.click(nextBtn)

    // Verify we are on the second scenario
    expect(screen.getByText('The Family Dispute')).toBeInTheDocument()

    // Check the guidance is hidden again
    expect(screen.queryByText("Krishna's Guidance")).not.toBeInTheDocument()
  })
})
