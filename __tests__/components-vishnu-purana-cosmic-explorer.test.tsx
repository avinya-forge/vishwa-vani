import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import VishnuPuranaCosmicExplorer from '../components/lab/vishnu-purana-cosmic-explorer'

describe('VishnuPuranaCosmicExplorer', () => {
  it('renders correctly and shows the initial Creation phase', () => {
    render(<VishnuPuranaCosmicExplorer />)

    expect(screen.getByText('Cosmic Cycle Explorer')).toBeInTheDocument()
    expect(screen.getByText('Vishnu Purana • Cosmic Themes')).toBeInTheDocument()

    // Initial phase should be Creation
    expect(screen.getByText('Creation')).toBeInTheDocument()
    expect(screen.getByText('Sarga')).toBeInTheDocument()
    expect(screen.getByText(/The universe emerges from the unmanifest/i)).toBeInTheDocument()
  })

  it('advances to the next phase when the button is clicked', () => {
    render(<VishnuPuranaCosmicExplorer />)

    const nextButton = screen.getByText('Advance Cycle')

    // Advance to Preservation
    fireEvent.click(nextButton)
    expect(screen.getByText('Preservation')).toBeInTheDocument()
    expect(screen.getByText('Sthiti')).toBeInTheDocument()

    // Advance to Dissolution
    fireEvent.click(nextButton)
    expect(screen.getByText('Dissolution')).toBeInTheDocument()
    expect(screen.getByText('Laya')).toBeInTheDocument()

    // Advance to The Unmanifest
    fireEvent.click(nextButton)
    expect(screen.getByText('The Unmanifest')).toBeInTheDocument()
    expect(screen.getByText('Avyakta')).toBeInTheDocument()

    // Advance back to Creation
    fireEvent.click(nextButton)
    expect(screen.getByText('Creation')).toBeInTheDocument()
  })
})
