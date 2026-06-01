import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RatingTelemetry from '@/components/shloka/rating-telemetry';

describe('RatingTelemetry Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders stars and allows rating submission', async () => {
    render(<RatingTelemetry verseId="test-verse" scholarId="test-scholar" language="en" />);

    // Check initial render
    expect(screen.getByText('Rate this translation:')).toBeInTheDocument();
    const stars = screen.getAllByRole('button');
    expect(stars).toHaveLength(5);

    // Hover a star
    fireEvent.mouseEnter(stars[2]);
    // The component applies classes based on rating, no explicit text change

    // Click to rate 4 stars
    fireEvent.click(stars[3]);

    expect(global.fetch).toHaveBeenCalledWith('/api/commentary-rating', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ verseId: 'test-verse', scholarId: 'test-scholar', language: 'en', rating: 4 })
    });

    // Wait for submission success state
    await waitFor(() => {
      expect(screen.getByText('Thank you for your feedback.')).toBeInTheDocument();
    });
  });
});
