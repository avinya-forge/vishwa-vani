import React from 'react'
import { render } from '@testing-library/react'
import RoyalScienceDecoder from '@/components/lab/royal-science-decoder'

describe('RoyalScienceDecoder Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<RoyalScienceDecoder />)
    expect(container).toBeInTheDocument()
  })
})
