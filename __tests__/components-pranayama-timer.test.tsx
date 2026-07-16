import React from 'react'
import { render } from '@testing-library/react'
import PranayamaTimer from '@/components/lab/pranayama-timer'

describe('PranayamaTimer Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<PranayamaTimer />)
    expect(container).toBeInTheDocument()
  })
})
