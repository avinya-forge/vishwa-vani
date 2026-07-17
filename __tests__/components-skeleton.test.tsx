import React from 'react';
import { render } from '@testing-library/react';
import { LabSkeleton } from '@/components/layout/Skeleton';
import '@testing-library/jest-dom';

describe('LabSkeleton', () => {
  it('renders with default class', () => {
    const { container } = render(<LabSkeleton />);
    expect(container.firstChild).toHaveClass('animate-pulse');
  });
});
