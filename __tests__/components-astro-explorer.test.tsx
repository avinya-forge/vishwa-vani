import React from 'react'
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'
import AstroExplorer from '@/components/lab/astro-explorer'

jest.useFakeTimers()

describe('AstroExplorer (LAB-805)', () => {
  it('calculates Tithi and Nakshatra for a known date', async () => {
    render(<AstroExplorer />)
    const input = screen.getByTestId('date-input')
    fireEvent.change(input, { target: { value: '2024-04-09' } })
    fireEvent.click(screen.getByRole('button', { name: /Align with Cosmic Rhythms/i }))

    act(() => {
      jest.advanceTimersByTime(800)
    })

    await waitFor(() => {
      expect(screen.getByText('Lunar Phase (Tithi)')).toBeInTheDocument()
      expect(screen.getByText('Moon Station (Nakshatra)')).toBeInTheDocument()
      expect(screen.getByText(/Pratipada|Dvitiya|Tritiya|Chaturthi|Panchami|Shashthi|Saptami|Ashtami|Navami|Dashami|Ekadashi|Dvadashi|Trayodashi|Chaturdashi|Amavasya|Purnima/)).toBeInTheDocument()
    })
  })
})
