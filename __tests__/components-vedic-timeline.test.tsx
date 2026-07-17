import React from 'react';
import { render, screen } from '@testing-library/react';
import VedicTimeline from '@/components/shloka/vedic-timeline';
import '@testing-library/jest-dom';

describe('VedicTimeline', () => {
  it('renders milestones with fallback text', () => {
    render(<VedicTimeline slug="invalid-slug" />);
    expect(screen.getByText('Ancient Era')).toBeInTheDocument();
    expect(screen.getByText('Vedic Antiquity')).toBeInTheDocument();
    expect(screen.getByText('Scientific Evidence')).toBeInTheDocument();
    expect(screen.getByText('Literary Tradition')).toBeInTheDocument();
  });
});
