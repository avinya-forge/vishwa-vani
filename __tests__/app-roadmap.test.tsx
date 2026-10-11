import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import RoadmapClient from '@/app/roadmap/RoadmapClient'

const mockRoadmapStats = {
  totalBooks: 18,
  completedBooks: 7,
  pipelineBooks: 11,
  completedVerses: 1053,
  pipelineVerses: 290000,
  databaseVerses: 126306,
  completedChapters: 35,
  pipelineChapters: 4155,
  totalAuthors: 12,
  totalLangs: 4,
  categories: ['itihas', 'upanishad', 'purana', 'veda', 'other']
}

describe('RoadmapClient Component', () => {
  it('renders the roadmap header and standard scriptural metrics', () => {
    render(<RoadmapClient stats={mockRoadmapStats} />)

    expect(screen.getByText(/Roadmap & Standard Scriptural Metrics/i)).toBeInTheDocument()
    expect(screen.getByText(/Our Scriptural/i)).toBeInTheDocument()
    expect(screen.getAllByText('Pipeline').length).toBeGreaterThan(0)
  })

  it('renders Pool 1 Gold Certified scriptures', () => {
    render(<RoadmapClient stats={mockRoadmapStats} />)

    expect(screen.getByText(/Pool 1: 100% Completed & Verified/i)).toBeInTheDocument()
    // Verify core gold books
    expect(screen.getByText('Bhagavad Gita')).toBeInTheDocument()
    expect(screen.getByText('Isha Upanishad')).toBeInTheDocument()
    expect(screen.getByText('Kena Upanishad')).toBeInTheDocument()
    expect(screen.getByText('Yoga Sutras of Patanjali')).toBeInTheDocument()
    expect(screen.getByText('Vishnu Purana')).toBeInTheDocument()
    expect(screen.getByText('Garuda Purana')).toBeInTheDocument()
    expect(screen.getByText('16 Samskaras (Ritual Handbook)')).toBeInTheDocument()
  })

  it('filters by pool tabs (100% Verified vs Ingestion Pipeline)', () => {
    render(<RoadmapClient stats={mockRoadmapStats} />)

    // Filter to 100% Verified only
    const verifiedOnlyBtn = screen.getByRole('button', { name: /100% Verified/i })
    fireEvent.click(verifiedOnlyBtn)

    expect(screen.getByText('Bhagavad Gita')).toBeInTheDocument()
    expect(screen.queryByText(/Pool 2: Ingestion & Pipeline/i)).not.toBeInTheDocument()

    // Filter to Pipeline only
    const pipelineBtn = screen.getByRole('button', { name: /Ingestion Pipeline/i })
    fireEvent.click(pipelineBtn)

    expect(screen.queryByText(/Pool 1: 100% Completed & Verified/i)).not.toBeInTheDocument()
    expect(screen.getByText(/Pool 2: Ingestion & Pipeline/i)).toBeInTheDocument()
  })

  it('renders the Three-Tier Data Certification Standards and AppSec cards', () => {
    render(<RoadmapClient stats={mockRoadmapStats} />)

    expect(screen.getByText(/Three-Tier Data Certification Standards/i)).toBeInTheDocument()
    expect(screen.getByText('Gold Tier')).toBeInTheDocument()
    expect(screen.getAllByText('Silver Tier').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Bronze Tier').length).toBeGreaterThan(0)
    expect(screen.getByText(/Application Security & Authentic Data Integrity/i)).toBeInTheDocument()
  })
})
