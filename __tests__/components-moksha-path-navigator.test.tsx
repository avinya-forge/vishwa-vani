import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MokshaPathNavigator from '@/components/lab/moksha-path-navigator';

describe('MokshaPathNavigator', () => {
  it('renders the initial question', () => {
    render(<MokshaPathNavigator />);
    expect(screen.getByText('Moksha Path Navigator')).toBeInTheDocument();
    expect(screen.getByText('Question 1 of 5')).toBeInTheDocument();
    expect(screen.getByText('When faced with a difficult situation, you typically:')).toBeInTheDocument();
  });

  it('progresses through questions and shows result (Karma Path)', () => {
    render(<MokshaPathNavigator />);

    // Answer all 5 questions with the first option (Karma)
    for (let i = 0; i < 5; i++) {
      const buttons = screen.getAllByRole('button');
      fireEvent.click(buttons[0]); // Click the first option
    }

    expect(screen.getByText('Your Primary Path: Karma Yoga (The Path of Action)')).toBeInTheDocument();
    expect(screen.getByText(/You find liberation through selfless service/)).toBeInTheDocument();
  });

  it('allows retaking the assessment', () => {
    render(<MokshaPathNavigator />);

    // Answer all questions
    for (let i = 0; i < 5; i++) {
      const buttons = screen.getAllByRole('button');
      fireEvent.click(buttons[0]);
    }

    // Click Retake
    const retakeButton = screen.getByText('Retake Assessment');
    fireEvent.click(retakeButton);

    expect(screen.getByText('Question 1 of 5')).toBeInTheDocument();
  });
});
