import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import LibraryClient from '@/app/library/LibraryClient'
import { getVedicHierarchy } from '@/lib/texts'

const mockStats = {
  totalBooks: 18,
  completedBooks: 4,
  pipelineBooks: 14,
  completedVerses: 950,
  databaseVerses: 126306,
  categories: ['itihas', 'upanishad', 'purana', 'veda', 'other']
}

describe('LibraryClient (LIB-002)', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  it('renders the library hero and stats counters', () => {
    const hierarchy = getVedicHierarchy()
    render(<LibraryClient stats={mockStats} hierarchy={hierarchy} />)

    expect(screen.getByText(/The Living Library of/i)).toBeInTheDocument()
    expect(screen.getByText(/Vedic Scriptures/i)).toBeInTheDocument()
    expect(screen.getByText('Sacred Scriptures')).toBeInTheDocument()
    expect(screen.getByText('Gold Shlokas Live')).toBeInTheDocument()
    expect(screen.getAllByText(/18/).length).toBeGreaterThan(0)
  })

  it('filters scriptures by search input query', () => {
    const hierarchy = getVedicHierarchy()
    render(<LibraryClient stats={mockStats} hierarchy={hierarchy} />)

    const searchInput = screen.getByPlaceholderText(/Search scripture, Devanagari/i)
    fireEvent.change(searchInput, { target: { value: 'Bhagavad Gita' } })

    expect(screen.getByText('Bhagavad Gita')).toBeInTheDocument()
    // Other non-matching books should not be rendered
    expect(screen.queryByText('Rigveda Samhita')).not.toBeInTheDocument()
  })

  it('filters scriptures by tier (100% Gold Editions vs All)', () => {
    const hierarchy = getVedicHierarchy()
    render(<LibraryClient stats={mockStats} hierarchy={hierarchy} />)

    const goldFilterBtn = screen.getByRole('button', { name: /100% Gold Editions/i })
    fireEvent.click(goldFilterBtn)

    // Should display Bhagavad Gita, Isha Upanishad, Kena Upanishad, Yoga Sutras, and graduated scriptures like Dasbodh
    expect(screen.getByText('Bhagavad Gita')).toBeInTheDocument()
    expect(screen.getByText('Isha Upanishad')).toBeInTheDocument()
    expect(screen.getByText('Yoga Sutras of Patanjali')).toBeInTheDocument()
    expect(screen.getByText('Dasbodh')).toBeInTheDocument()
  })

  it('filters scriptures by category tab', () => {
    const hierarchy = getVedicHierarchy()
    render(<LibraryClient stats={mockStats} hierarchy={hierarchy} />)

    const upanishadTab = screen.getByRole('button', { name: /Principal Upaniṣads/i })
    fireEvent.click(upanishadTab)

    expect(screen.getByText('Isha Upanishad')).toBeInTheDocument()
    expect(screen.getByText('Kena Upanishad')).toBeInTheDocument()
    expect(screen.queryByText('Bhagavad Gita')).not.toBeInTheDocument()
  })

  it('expands chapter selector drawer on clicking Chapters button', () => {
    const hierarchy = getVedicHierarchy()
    render(<LibraryClient stats={mockStats} hierarchy={hierarchy} />)

    // Find the Chapters button for Bhagavad Gita
    const chaptersBtn = screen.getByRole('button', { name: /Select chapter from Bhagavad Gita/i })
    fireEvent.click(chaptersBtn)

    expect(screen.getByText(/Jump Directly to Chapter/i)).toBeInTheDocument()
    expect(screen.getByText(/Ch 1:/i)).toBeInTheDocument()
    expect(screen.getByText(/Arjuna Visada Yoga/i)).toBeInTheDocument()
  })

  it('displays continue reading session card when saved in localStorage', () => {
    localStorage.setItem(
      'vishwa_continue_reading',
      JSON.stringify({ text: 'bhagavad-gita', chapter: 2, verse: 47 })
    )

    const hierarchy = getVedicHierarchy()
    render(<LibraryClient stats={mockStats} hierarchy={hierarchy} />)

    expect(screen.getByText(/Active Reading Session/i)).toBeInTheDocument()
    expect(screen.getByText(/Bhagavad Gita · Chapter 2, Shloka 47/i)).toBeInTheDocument()
  })
})
