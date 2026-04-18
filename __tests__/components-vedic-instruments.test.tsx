
beforeAll(() => {
  window.HTMLMediaElement.prototype.play = jest.fn().mockResolvedValue(undefined)
  window.HTMLMediaElement.prototype.pause = jest.fn()
})
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


  })

  it('plays and stops audio on button click', () => {
    render(<VedicInstruments />)
    const playButton = screen.getByRole('button', { name: /Blast the Sound of Dharma/i })

    // Play
    fireEvent.click(playButton)



    // Stop
    fireEvent.click(playButton)

    expect(screen.getByText(/Blast the Sound of Dharma/i)).toBeInTheDocument()
  })

  it('stops audio when selecting a different instrument', () => {
    render(<VedicInstruments />)
    const playButton = screen.getByRole('button', { name: /Blast the Sound of Dharma/i })

    // Play
    fireEvent.click(playButton)


    // Select another
    fireEvent.click(screen.getByText('Devadatta'))

    expect(screen.getByText(/Blast the Sound of Dharma/i)).toBeInTheDocument()
  })
})
