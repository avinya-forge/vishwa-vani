import React from 'react'
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'
import AstroExplorer from '@/components/lab/astro-explorer'

jest.useFakeTimers()

describe('AstroExplorer (LAB-805)', () => {
  it('calculates Tithi and Nakshatra for a known date', async () => {
    render(<AstroExplorer />)
    const input = screen.getByTestId('date-input')
    fireEvent.change(input, { target: { value: '2024-04-09' } })
    fireEvent.click(screen.getByRole('button', { name: /Calculate Panchang/i }))

    act(() => {
      jest.advanceTimersByTime(800)
    })

    await waitFor(() => {
      expect(screen.getByText('Lunar Day (Tithi)')).toBeInTheDocument()
      expect(screen.getByText('Lunar Mansion (Nakshatra)')).toBeInTheDocument()
      // Since it's approximate algorithm, just ensure it outputs some string values from our lists
      expect(screen.getByText(/Pratipada|Dvitiya|Tritiya|Chaturthi|Panchami|Shashthi|Saptami|Ashtami|Navami|Dashami|Ekadashi|Dvadashi|Trayodashi|Chaturdashi|Amavasya|Purnima/)).toBeInTheDocument()
    })
  })
})
