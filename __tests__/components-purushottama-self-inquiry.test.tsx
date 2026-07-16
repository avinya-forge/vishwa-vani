import React from 'react'
import { render } from '@testing-library/react'
import PurushottamaSelfInquiry from '@/components/lab/purushottama-self-inquiry'

describe('PurushottamaSelfInquiry Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<PurushottamaSelfInquiry />)
    expect(container).toBeInTheDocument()
  })
})
