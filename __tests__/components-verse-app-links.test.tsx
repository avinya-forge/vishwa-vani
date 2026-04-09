import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import VerseAppLinks from '@/components/shloka/verse-app-links'

jest.mock('next/link', () => {
  return function MockLink({ href, children, title }: { href: string, children: React.ReactNode, title?: string }) {
    return <a href={href} title={title}>{children}</a>
  }
})

describe('VerseAppLinks', () => {
  it('renders app links for bhagavad-gita chapter 3 (karma yoga)', () => {
    render(<VerseAppLinks bookSlug="bhagavad-gita" chapter={3} />)
    expect(screen.getByText('Karma Yoga Simulator')).toBeInTheDocument()
  })

  it('renders akshauhini for mahabharata', () => {
    render(<VerseAppLinks bookSlug="mahabharata" chapter={1} />)
    expect(screen.getByText('Akshauhini Calculator')).toBeInTheDocument()
  })

  it('returns null (renders nothing) when no apps match', () => {
    const { container } = render(<VerseAppLinks bookSlug="unknown-book" chapter={99} />)
    expect(container.firstChild).toBeNull()
  })

  it('links point to the correct /labs path', () => {
    render(<VerseAppLinks bookSlug="bhagavad-gita" chapter={3} />)
    const link = screen.getByText('Karma Yoga Simulator').closest('a')
    expect(link?.getAttribute('href')).toBe('/labs/karma-yoga')
  })

  it('does not render prototype apps', () => {
    render(<VerseAppLinks bookSlug="bhagavad-gita" chapter={1} />)
    expect(screen.queryByText('Meter Analyzer')).not.toBeInTheDocument()
    expect(screen.queryByText('Sanskrit Tokenizer')).not.toBeInTheDocument()
  })
})
