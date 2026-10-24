import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BedtimePlayer from '@/components/audio/bedtime-player';

describe('Bedtime Scripture Audio Podcast Player (components/audio/bedtime-player.tsx)', () => {
  const mockVerses = [
    {
      chapter: 1,
      verse: 1,
      original: 'धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः । मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ॥ १ ॥',
      transliteration: 'dharma-kṣetre kuru-kṣetre samavetā yuyutsavaḥ |',
      translation: 'O Sanjaya, assembled on the sacred field of Kurukshetra, desirous of fighting, what did my sons and the Pandavas do?',
      meaning: 'King Dhritarashtra inquires about the battle between his sons and the sons of Pandu.',
      translationHi: 'हे संजय! धर्मभूमि कुरुक्षेत्र में एकत्रित युद्ध की इच्छा वाले मेरे और पाण्डु के पुत्रों ने क्या किया?',
      translationMr: 'हे संजया! धर्मभूमी कुरुक्षेत्रावर युद्धाच्या इच्छेने जमलेल्या माझ्या आणि पांडवांच्या पुत्रांनी काय केले?',
    },
  ];

  beforeEach(() => {
    Object.defineProperty(window, 'speechSynthesis', {
      value: {
        speak: jest.fn(),
        cancel: jest.fn(),
        pause: jest.fn(),
        resume: jest.fn(),
        getVoices: jest.fn().mockReturnValue([
          { name: 'Google Hindi', lang: 'hi-IN' },
          { name: 'Google English', lang: 'en-US' },
          { name: 'Google Marathi', lang: 'mr-IN' },
        ]),
        onvoiceschanged: null,
        paused: false,
        pending: false,
        speaking: false,
      },
      writable: true,
      configurable: true,
    });

    global.SpeechSynthesisUtterance = jest.fn().mockImplementation((text) => ({
      text,
      rate: 1,
      pitch: 1,
      voice: null,
      onend: null,
      onerror: null,
    })) as unknown as typeof SpeechSynthesisUtterance;
  });

  test('does not render when isOpen is false', () => {
    const { container } = render(
      <BedtimePlayer
        bookSlug="bhagavad-gita"
        bookTitle="Bhagavad Gita"
        chapter={1}
        verses={mockVerses}
        isOpen={false}
        onClose={jest.fn()}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  test('renders dialog with book title and chapter when isOpen is true', () => {
    render(
      <BedtimePlayer
        bookSlug="bhagavad-gita"
        bookTitle="Bhagavad Gita"
        chapter={1}
        chapterTitle="Arjuna Vishada Yoga"
        verses={mockVerses}
        isOpen={true}
        onClose={jest.fn()}
      />
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/Bhagavad Gita • Ch 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Vedic Nidra • Bedtime Podcast/i)).toBeInTheDocument();
  });

  test('allows switching languages and updates segments', () => {
    render(
      <BedtimePlayer
        bookSlug="bhagavad-gita"
        bookTitle="Bhagavad Gita"
        chapter={1}
        verses={mockVerses}
        isOpen={true}
        onClose={jest.fn()}
      />
    );

    const hiButton = screen.getByRole('button', { name: /^HI$/i });
    fireEvent.click(hiButton);
    expect(hiButton).toHaveClass('bg-amber-600');

    const chantButton = screen.getByRole('button', { name: /^Chant$/i });
    fireEvent.click(chantButton);
    expect(chantButton).toHaveClass('bg-amber-600');
  });

  test('toggles playback and cancels speech when stopped', () => {
    render(
      <BedtimePlayer
        bookSlug="bhagavad-gita"
        bookTitle="Bhagavad Gita"
        chapter={1}
        verses={mockVerses}
        isOpen={true}
        onClose={jest.fn()}
      />
    );

    const playButton = screen.getByRole('button', { name: /^Play$/i });
    fireEvent.click(playButton);

    expect(window.speechSynthesis.speak).toHaveBeenCalled();

    // Toggle pause
    const pauseButton = screen.getByRole('button', { name: /^Pause$/i });
    fireEvent.click(pauseButton);
    expect(window.speechSynthesis.cancel).toHaveBeenCalled();
  });

  test('supports selecting sleep timer options', () => {
    render(
      <BedtimePlayer
        bookSlug="bhagavad-gita"
        bookTitle="Bhagavad Gita"
        chapter={1}
        verses={mockVerses}
        isOpen={true}
        onClose={jest.fn()}
      />
    );

    const select = screen.getByLabelText(/Sleep Timer/i);
    fireEvent.change(select, { target: { value: '30' } });
    expect(select).toHaveValue('30');
  });

  test('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(
      <BedtimePlayer
        bookSlug="bhagavad-gita"
        bookTitle="Bhagavad Gita"
        chapter={1}
        verses={mockVerses}
        isOpen={true}
        onClose={handleClose}
      />
    );

    const closeBtn = screen.getByLabelText(/Close audio player/i);
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
    expect(window.speechSynthesis.cancel).toHaveBeenCalled();
  });
});
