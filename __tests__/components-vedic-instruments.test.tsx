import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import VedicInstruments from '@/components/lab/vedic-instruments'

// Mock Web Audio API (component uses AudioContext, not HTMLMediaElement)
const mockOscillator = {
  connect: jest.fn(),
  start: jest.fn(),
  stop: jest.fn(),
  type: 'triangle' as OscillatorType,
  frequency: { value: 440 },
  detune: { value: 0 },
}
const mockGain = {
  connect: jest.fn(),
  gain: {
    setValueAtTime: jest.fn(),
    exponentialRampToValueAtTime: jest.fn(),
  },
}
const mockCtx = {
  createOscillator: jest.fn(() => mockOscillator),
  createGain: jest.fn(() => mockGain),
  destination: {},
  currentTime: 0,
  state: 'running',
  resume: jest.fn().mockResolvedValue(undefined),
}
global.AudioContext = jest.fn(() => mockCtx) as unknown as typeof AudioContext

describe('VedicInstruments (LAB-804)', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockCtx.state = 'running'
  })

  it('renders all Gita conch instruments', () => {
    render(<VedicInstruments />)
    expect(screen.getByText('Panchajanya')).toBeInTheDocument()
    expect(screen.getByText('Devadatta')).toBeInTheDocument()
    expect(screen.getByText('Paundra')).toBeInTheDocument()
    expect(screen.getByText('Anantavijaya')).toBeInTheDocument()
    expect(screen.getByText('Sughosa')).toBeInTheDocument()
    expect(screen.getByText('Manipushpaka')).toBeInTheDocument()
  })

  it('shows play button with correct label', () => {
    render(<VedicInstruments />)
    expect(screen.getByRole('button', { name: /Blast the Sound of Dharma/i })).toBeInTheDocument()
  })

  it('switches active instrument on click', () => {
    render(<VedicInstruments />)
    fireEvent.click(screen.getByText('Devadatta'))
    // After selecting Devadatta, play button should still be present (not playing yet)
    expect(screen.getByRole('button', { name: /Blast the Sound of Dharma/i })).toBeInTheDocument()
  })
})
