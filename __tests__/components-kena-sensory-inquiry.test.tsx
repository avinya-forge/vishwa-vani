import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import KenaSensoryInquiry from '@/components/lab/kena-sensory-inquiry';

describe('KenaSensoryInquiry', () => {
  it('renders the intro stage', () => {
    render(<KenaSensoryInquiry />);
    expect(screen.getByText('Kena Sensory Inquiry')).toBeInTheDocument();
    expect(screen.getByText(/Keneṣitaṁ patati preṣitaṁ manaḥ/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Begin the Inquiry/ })).toBeInTheDocument();
  });

  it('progresses through all senses and shows revelation', () => {
    render(<KenaSensoryInquiry />);

    // Start
    fireEvent.click(screen.getByRole('button', { name: /Begin the Inquiry/ }));

    // Mind
    expect(screen.getByText('The Mind (Manas)')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Contemplate the Next Sense' }));

    // Speech
    expect(screen.getByText('Speech (Vāc)')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Contemplate the Next Sense' }));

    // Sight
    expect(screen.getByText('Sight (Cakṣu)')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Contemplate the Next Sense' }));

    // Hearing
    expect(screen.getByText('Hearing (Śrotra)')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Realize the Source' }));

    // Revelation
    expect(screen.getByText('The Unseen Seer')).toBeInTheDocument();
    expect(screen.getByText(/That which is the hearing of the ear/)).toBeInTheDocument();
  });

  it('allows restarting the inquiry', () => {
    render(<KenaSensoryInquiry />);

    fireEvent.click(screen.getByRole('button', { name: /Begin the Inquiry/ }));

    // Click through all senses
    for (let i = 0; i < 4; i++) {
      const btn = screen.getByRole('button', { name: /Contemplate the Next Sense|Realize the Source/ });
      fireEvent.click(btn);
    }

    // Click Restart
    fireEvent.click(screen.getByRole('button', { name: /Begin Inquiry Again/ }));

    expect(screen.getByText(/Keneṣitaṁ patati preṣitaṁ manaḥ/)).toBeInTheDocument();
  });
});
