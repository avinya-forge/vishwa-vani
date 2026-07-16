import React from 'react'
import { render } from '@testing-library/react'
import TimeConsciousnessWheel from '@/components/lab/time-consciousness-wheel'

describe('TimeConsciousnessWheel Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<TimeConsciousnessWheel />)
    expect(container).toBeInTheDocument()
  })
})
