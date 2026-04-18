import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import CharacterRelationshipMap from '@/components/lab/character-relationship-map'

describe('CharacterRelationshipMap (APP-714)', () => {
  it('renders all characters', () => {
    render(<CharacterRelationshipMap />)
    expect(screen.getByText('Shantanu')).toBeInTheDocument()
    expect(screen.getByText('Bhishma')).toBeInTheDocument()
    expect(screen.getByText('Duryodhana')).toBeInTheDocument()
    expect(screen.getByText('Arjuna')).toBeInTheDocument()
    expect(screen.getByText('Krishna')).toBeInTheDocument()
  })

  it('selects a node on click', () => {
    render(<CharacterRelationshipMap />)
    const arjunaNode = screen.getByTestId('node-arjuna')

    // Initial state: font-size 12
    const textEl = arjunaNode.querySelector('text')
    expect(textEl?.getAttribute('font-size')).toBe('9')

    // Click to select
    fireEvent.click(arjunaNode)

    // State after click: font-size 14
    expect(arjunaNode.querySelector('text')?.getAttribute('font-size')).toBe('11')
  })

  it('deselects a node on second click', () => {
    render(<CharacterRelationshipMap />)
    const arjunaNode = screen.getByTestId('node-arjuna')

    // Select
    fireEvent.click(arjunaNode)
    expect(arjunaNode.querySelector('text')?.getAttribute('font-size')).toBe('11')

    // Deselect
    fireEvent.click(arjunaNode)
    expect(arjunaNode.querySelector('text')?.getAttribute('font-size')).toBe('9')
  })
})
