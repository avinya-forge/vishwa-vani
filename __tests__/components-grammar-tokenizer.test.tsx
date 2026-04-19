import React from 'react'
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'
import GrammarTokenizer from '@/components/lab/grammar-tokenizer'

jest.useFakeTimers()

describe('GrammarTokenizer (LAB-803)', () => {
  it('identifies known nouns and verbs', async () => {
    render(<GrammarTokenizer />)
    const textarea = screen.getByPlaceholderText(/Paste a Sanskrit Shloka here/i)
    fireEvent.change(textarea, { target: { value: 'dharma krsna uvaca' } })
    fireEvent.click(screen.getByRole('button', { name: /Tokenize Shloka/i }))

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    await waitFor(() => {
      expect(screen.getAllByText('Noun').length).toBe(2)
      expect(screen.getByText('Verb')).toBeInTheDocument()
      expect(screen.getByText('Duty, righteousness, cosmic law')).toBeInTheDocument()
      expect(screen.getByText('Said, spoke')).toBeInTheDocument()
    })
  })

  it('identifies probable verbs ending in ti/te', async () => {
    render(<GrammarTokenizer />)
    const textarea = screen.getByPlaceholderText(/Paste a Sanskrit Shloka here/i)
    fireEvent.change(textarea, { target: { value: 'unknownwordti anotherte' } })
    fireEvent.click(screen.getByRole('button', { name: /Tokenize Shloka/i }))

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    await waitFor(() => {
      expect(screen.getAllByText('Verb').length).toBe(2)
    })
  })

  it('identifies probable nouns ending in am/as', async () => {
    render(<GrammarTokenizer />)
    const textarea = screen.getByPlaceholderText(/Paste a Sanskrit Shloka here/i)
    fireEvent.change(textarea, { target: { value: 'unknownwordam unknownwordas' } })
    fireEvent.click(screen.getByRole('button', { name: /Tokenize Shloka/i }))

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    await waitFor(() => {
      expect(screen.getAllByText('Noun').length).toBe(2)
    })
  })
})
