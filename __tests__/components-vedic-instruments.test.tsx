import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import VedicInstruments from '@/components/lab/vedic-instruments'

describe('VedicInstruments (LAB-804)', () => {
  beforeEach(() => {
    // Mock HTMLMediaElement
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();
  });

  it('renders all instruments', () => {
    render(<VedicInstruments />)
    expect(screen.getByText('Panchajanya')).toBeInTheDocument()
    expect(screen.getByText('Devadatta')).toBeInTheDocument()
    expect(screen.getByText('Mridanga')).toBeInTheDocument()
    expect(screen.getByText('Veena')).toBeInTheDocument()
  })

  it('plays and stops audio on button click', () => {
    render(<VedicInstruments />)
    const playButton = screen.getByRole('button', { name: /Hear the Sound of Dharma/i })

    // Play
    fireEvent.click(playButton)
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled()
    expect(screen.getByText(/Stop/i)).toBeInTheDocument()

    // Stop
    fireEvent.click(screen.getByRole('button', { name: /Stop/i }))
    expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalled()
    expect(screen.getByText(/Hear the Sound of Dharma/i)).toBeInTheDocument()
  })

  it('stops audio when selecting a different instrument', () => {
    render(<VedicInstruments />)
    const playButton = screen.getByRole('button', { name: /Hear the Sound of Dharma/i })

    // Play
    fireEvent.click(playButton)
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled()

    // Select another
    fireEvent.click(screen.getByText('Mridanga'))
    expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalled()
    expect(screen.getByText(/Hear the Sound of Dharma/i)).toBeInTheDocument()
  })
})
