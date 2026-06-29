import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import YogaMindControl from '@/components/lab/yoga-mind-control';

describe('YogaMindControl', () => {
  it('renders the intro stage', () => {
    render(<YogaMindControl />);
    expect(screen.getByText('Yoga Mind Control Explorer')).toBeInTheDocument();
    expect(screen.getByText(/Patanjali defines Yoga as/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Begin Exploration' })).toBeInTheDocument();
  });

  it('progresses through abhyasa and vairagya questions to conclusion', () => {
    render(<YogaMindControl />);

    // Start
    fireEvent.click(screen.getByRole('button', { name: 'Begin Exploration' }));

    // Abhyasa (3 questions)
    expect(screen.getByText('Abhyāsa')).toBeInTheDocument();
    const abhyasaButtons = screen.getAllByRole('button');
    fireEvent.click(abhyasaButtons[0]);
    fireEvent.click(abhyasaButtons[3]);
    fireEvent.click(abhyasaButtons[6]);

    // Vairagya (3 questions)
    expect(screen.getByText('Vairāgya')).toBeInTheDocument();
    const vairagyaButtons = screen.getAllByRole('button');
    fireEvent.click(vairagyaButtons[0]);
    fireEvent.click(vairagyaButtons[3]);
    fireEvent.click(vairagyaButtons[6]);

    // Conclusion
    expect(screen.getByText('Your Yoga Balance')).toBeInTheDocument();
    expect(screen.getByText('Guidance')).toBeInTheDocument();
  });

  it('allows retaking the exploration', () => {
    render(<YogaMindControl />);

    fireEvent.click(screen.getByRole('button', { name: 'Begin Exploration' }));

    // Abhyasa (3 questions)
    const abhyasaButtons = screen.getAllByRole('button');
    fireEvent.click(abhyasaButtons[0]);
    fireEvent.click(abhyasaButtons[3]);
    fireEvent.click(abhyasaButtons[6]);

    // Vairagya (3 questions)
    const vairagyaButtons = screen.getAllByRole('button');
    fireEvent.click(vairagyaButtons[0]);
    fireEvent.click(vairagyaButtons[3]);
    fireEvent.click(vairagyaButtons[6]);

    // Click Retake
    fireEvent.click(screen.getByRole('button', { name: 'Retake Exploration' }));

    expect(screen.getByText(/Patanjali defines Yoga as/)).toBeInTheDocument();
  });
});
