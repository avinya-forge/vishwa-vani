import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BhagavataBhaktiFlow from '@/components/lab/bhagavata-bhakti-flow';

describe('BhagavataBhaktiFlow', () => {
  it('renders the initial chapter', () => {
    render(<BhagavataBhaktiFlow />);
    expect(screen.getByText('Bhāgavata Bhakti Flow')).toBeInTheDocument();
    expect(screen.getByText('Chapter 1')).toBeInTheDocument();
    expect(screen.getByText('Questions by the Sages')).toBeInTheDocument();

    // Previous button should be disabled
    const prevButton = screen.getByRole('button', { name: 'Previous' });
    expect(prevButton).toBeDisabled();
  });

  it('navigates through chapters using Next and Previous buttons', () => {
    render(<BhagavataBhaktiFlow />);

    const nextButton = screen.getByRole('button', { name: /Next/ });

    // Go to Chapter 2
    fireEvent.click(nextButton);
    expect(screen.getByText('Chapter 2')).toBeInTheDocument();
    expect(screen.getByText('Divinity and Divine Service')).toBeInTheDocument();

    // Go back to Chapter 1
    const prevButton = screen.getByRole('button', { name: 'Previous' });
    fireEvent.click(prevButton);
    expect(screen.getByText('Chapter 1')).toBeInTheDocument();
  });

  it('reaches the final chapter and disables next', () => {
    render(<BhagavataBhaktiFlow />);

    // Click through to chapter 19
    for (let i = 1; i < 19; i++) {
      const nextButton = screen.getByRole('button', { name: /Next|Complete/ });
      fireEvent.click(nextButton);
    }

    expect(screen.getByText('Chapter 19')).toBeInTheDocument();
    expect(screen.getByText('The Appearance of Sukadeva Gosvami')).toBeInTheDocument();

    const completeButton = screen.getByRole('button', { name: 'Complete' });
    expect(completeButton).toBeDisabled();
  });
});
