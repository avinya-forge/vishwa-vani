import React from 'react'
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'
import ChhandaAnalyzer from '@/components/lab/chhanda-analyzer'

jest.useFakeTimers()

describe('ChhandaAnalyzer (LAB-802)', () => {
  it('identifies Anushtubh meter for 32 syllables', async () => {
    render(<ChhandaAnalyzer />)
    const textarea = screen.getByPlaceholderText(/Paste a Sanskrit Shloka here/i)
    fireEvent.change(textarea, { target: { value: 'a e i o u a e i o u a e i o u a e i o u a e i o u a e i o u a e' } }) // 32 vowels
    fireEvent.click(screen.getByRole('button', { name: /Analyze Chhanda/i }))

    act(() => { jest.advanceTimersByTime(1000) })

    await waitFor(() => {
      // Component outputs meter name without syllable breakdown in parentheses
      expect(screen.getByText('Anushtubh')).toBeInTheDocument()
      expect(screen.getAllByText('32')[0]).toBeInTheDocument()
    })
  })

  it('identifies Gayatri meter for 24 syllables', async () => {
    render(<ChhandaAnalyzer />)
    const textarea = screen.getByPlaceholderText(/Paste a Sanskrit Shloka here/i)
    fireEvent.change(textarea, { target: { value: 'a e i o u a e i o u a e i o u a e i o u a e i o' } }) // 24 vowels
    fireEvent.click(screen.getByRole('button', { name: /Analyze Chhanda/i }))

    act(() => { jest.advanceTimersByTime(1000) })

    await waitFor(() => {
      expect(screen.getByText('Gayatri')).toBeInTheDocument()
      expect(screen.getAllByText('24')[0]).toBeInTheDocument()
    })
  })

  it('identifies Trishtubh meter for 44 syllables', async () => {
    render(<ChhandaAnalyzer />)
    const textarea = screen.getByPlaceholderText(/Paste a Sanskrit Shloka here/i)
    fireEvent.change(textarea, { target: { value: 'a e i o u a e i o u a e i o u a e i o u a e i o u a e i o u a e i o u a e i o u a e i o' } }) // 44 vowels
    fireEvent.click(screen.getByRole('button', { name: /Analyze Chhanda/i }))

    act(() => { jest.advanceTimersByTime(1000) })

    await waitFor(() => {
      expect(screen.getByText('Trishtubh')).toBeInTheDocument()
      expect(screen.getAllByText('44')[0]).toBeInTheDocument()
    })
  })

  it('identifies Irregular meter for short input', async () => {
    render(<ChhandaAnalyzer />)
    const textarea = screen.getByPlaceholderText(/Paste a Sanskrit Shloka here/i)
    fireEvent.change(textarea, { target: { value: 'a' } }) // 1 vowel
    fireEvent.click(screen.getByRole('button', { name: /Analyze Chhanda/i }))

    act(() => { jest.advanceTimersByTime(1000) })

    await waitFor(() => {
      // Component outputs 'Irregular' not 'Irregular/Unknown Meter'
      expect(screen.getByText('Irregular')).toBeInTheDocument()
      expect(screen.getAllByText('1')[0]).toBeInTheDocument()
    })
  })
})
