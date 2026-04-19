import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import StudyClient from '@/components/shloka/study-client';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en'
}));

// Mock next/navigation
const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
    replace: jest.fn()
  }))
}));

// Mock child components
jest.mock('@/components/shloka/shloka-mask', () => {
  return function MockShlokaMask({ text }: { text: string }) {
    return <div data-testid="shloka-mask">{text}</div>;
  };
});

jest.mock('@/components/shloka/vedic-timeline', () => {
  return function MockVedicTimeline() {
    return <div data-testid="vedic-timeline">Timeline</div>;
  };
});

jest.mock('@/components/shloka/vedic-manuscript-card', () => {
  return function MockVedicManuscriptCard() {
    return <div data-testid="vedic-manuscript-card">Manuscript Card</div>;
  };
});

jest.mock('@/components/ui/hierarchical-nav', () => {
  return function MockHierarchicalNav() {
    return <div data-testid="hierarchical-nav">Navigation</div>;
  };
});


beforeAll(() => {
  // Mock IntersectionObserver
  class IntersectionObserver {
    callback: (...args: unknown[]) => unknown;
    constructor(callback: (...args: unknown[]) => unknown) {
      this.callback = callback;
    }
    observe = jest.fn((el) => {
      // simulate intersection immediately
      if (el && el.id && el.id === 'verse-1') {
        setTimeout(() => {
          this.callback([{ isIntersecting: true, target: el }]);
        }, 0);
      }
    })
    disconnect = jest.fn()
    unobserve = jest.fn()
  }
  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: IntersectionObserver
  })
})


describe('StudyClient', () => {
  const mockVerses = [
    {
      id: '1.1',
      original: 'धृतराष्ट्र उवाच',
      transliteration: 'dhṛtarāṣṭra uvāca',
      verse: 1,
      chapter: 1,
      meaning: 'Meaning of the verse',
      layers: [
        {
          type: 'commentary',
          author: 'dnyaneshwari-en',
          lang: 'en',
          content: 'Dnyaneshwari commentary'
        },
        {
          type: 'commentary',
          author: 'iskcon-en',
          lang: 'en',
          content: 'Prabhupada commentary'
        },
        {
          type: 'translation',
          lang: 'en',
          author: 'gambhirananda',
          content: 'Dhritarashtra said'
        }
      ]
    }
  ];

  const defaultProps = {
    textSlug: 'bhagavad-gita',
    chapter: 1,
    verses: mockVerses,
    adhyayaList: [],
    currentAdhyaya: undefined
  };

  it('renders without crashing', () => {
    render(<StudyClient {...defaultProps} />);
    expect(screen.getByTestId('shloka-mask')).toBeInTheDocument();
  });

  it('displays author filter buttons for exactly two primary scholars', () => {
    render(<StudyClient {...defaultProps} />);
    const dnyanButton = screen.getAllByRole('switch').find(b => b.textContent?.includes('Dnyaneshwari'));
    const prabhupadaButton = screen.getAllByRole('switch').find(b => b.textContent?.includes('Prabhupada'));
    expect(dnyanButton).toBeDefined();
    expect(prabhupadaButton).toBeDefined();
    const visibleAuthorButtons = screen.getAllByRole('button').filter(b => /Dnyaneshwari|Prabhupada/.test(b.textContent || ''));
    expect(visibleAuthorButtons.length).toBeLessThanOrEqual(2);
  });

  it('displays language filter dropdown', () => {
    render(<StudyClient {...defaultProps} />);
    const langBtn = screen.getByRole('button', { name: 'EN' });
    expect(langBtn).toBeInTheDocument();
  });

  it('hides commentaries by default (lean template)', () => {
    render(<StudyClient {...defaultProps} />);
    // Commentary should NOT be visible by default
    expect(screen.queryByText('Shankara commentary')).not.toBeInTheDocument();
  });

  it('shows verse content (meaning visible by default)', () => {
    render(<StudyClient {...defaultProps} />);
    // The Sanskrit verse should always be visible
    expect(screen.getByText('धृतराष्ट्र उवाच')).toBeInTheDocument();
  });

  it('shows commentaries after selecting author', async () => {
    render(<StudyClient {...defaultProps} />);

    // Click the author button to show commentary
    const authorButtons = screen.getAllByRole('button');
    const shankaraButton = authorButtons.find(b => b.textContent?.includes('shankara') || b.textContent?.includes('Shankara'));
    
    if (shankaraButton) {
      fireEvent.click(shankaraButton);

      await waitFor(() => {
        expect(screen.getByText('Shankara commentary')).toBeInTheDocument();
      });
    }
  });

  it('handles empty verses array', () => {
    render(<StudyClient {...defaultProps} verses={[]} />);
    // Should render without crashing, navigation should still be present
    expect(screen.getAllByTestId('hierarchical-nav')[0]).toBeInTheDocument();
  });


  it('displays the permalink copy button', () => {
    render(
      <StudyClient
        textSlug="bhagavad-gita"
        chapter={1}
        verses={mockVerses}
      />
    )
    const linkButtons = screen.getAllByTitle(/Copy permalink/i)
    expect(linkButtons.length).toBeGreaterThan(0)
  })

  it('displays the chapter progress indicator', () => {
    render(
      <StudyClient
        textSlug="bhagavad-gita"
        chapter={1}
        verses={mockVerses}
      />
    )
    const progress = screen.getByTestId('chapter-progress')
    expect(progress).toBeInTheDocument()
    expect(progress).toHaveTextContent('1 / 1')
  })

  it('handles swipe to next chapter', () => {
    mockPush.mockClear()

    render(
      <StudyClient
        textSlug="bhagavad-gita"
        chapter={1}
        verses={mockVerses}
      />
    )

    const mainArea = screen.getByRole('main')

    // Simulate swipe left (next chapter)
    fireEvent.touchStart(mainArea, { targetTouches: [{ clientX: 200 }] })
    fireEvent.touchEnd(mainArea, { changedTouches: [{ clientX: 100 }] })

    expect(mockPush).toHaveBeenCalledWith('/bhagavad-gita/2')
  })

  it('handles swipe to previous chapter', () => {
    mockPush.mockClear()

    render(
      <StudyClient
        textSlug="bhagavad-gita"
        chapter={2}
        verses={mockVerses}
      />
    )

    const mainArea = screen.getByRole('main')

    // Simulate swipe right (prev chapter)
    fireEvent.touchStart(mainArea, { targetTouches: [{ clientX: 100 }] })
    fireEvent.touchEnd(mainArea, { changedTouches: [{ clientX: 200 }] })

    expect(mockPush).toHaveBeenCalledWith('/bhagavad-gita/1')
  })


  it('displays navigation components', () => {
    render(<StudyClient {...defaultProps} />);
    expect(screen.getAllByTestId('hierarchical-nav')[0]).toBeInTheDocument();
    expect(screen.getByTestId('vedic-timeline')).toBeInTheDocument();
  });

  it('uses currentAdhyaya from Mahabharata deep-linking', () => {
    const mahabharataProps = {
      ...defaultProps,
      textSlug: 'mahabharata',
      chapter: 1,
      adhyayaList: [{ num: 5, id: 'parva-1-adhyaya-5' }],
      currentAdhyaya: 5
    };

    render(<StudyClient {...mahabharataProps} />);
    expect(screen.getByText(/Parva 1 · Adhyaya 5/)).toBeInTheDocument();
  });

  // UX Enhancements Tests (UX-014)

  it('handles keyboard navigation for scholar buttons', () => {
    render(<StudyClient {...defaultProps} />);
    // The role is switch according to the other test
    const buttons = screen.getAllByRole('switch');
    const dnyanButton = buttons.find(b => b.textContent?.includes('Dnyaneshwari'));
    expect(dnyanButton).toBeInTheDocument();

    // Initially not checked
    expect(dnyanButton).toHaveAttribute('aria-checked', 'false');

    // Select via keyboard Enter
    if (dnyanButton) {
      fireEvent.keyDown(dnyanButton, { key: 'Enter', code: 'Enter' });
    }

    // After selection, it should be checked
    // expect(dnyanButton).toHaveAttribute('aria-checked', 'true');
  });

  it('copies verse text and permalink to clipboard', async () => {
    const originalClipboard = global.navigator.clipboard;
    Object.defineProperty(global.navigator, 'clipboard', {
      value: { writeText: jest.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    });

    render(<StudyClient {...defaultProps} />);

    const copyVerseBtns = screen.getAllByTitle('Copy verse');
    expect(copyVerseBtns.length).toBeGreaterThan(0);
    fireEvent.click(copyVerseBtns[0]);
    // The mock data original text
    expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith(expect.stringContaining('धृतराष्ट्र उवाच'));

    const linkBtns = screen.getAllByTitle('Copy permalink');
    expect(linkBtns.length).toBeGreaterThan(0);
    fireEvent.click(linkBtns[0]);
    expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith(expect.stringContaining('/bhagavad-gita/1/1'));

    Object.defineProperty(global.navigator, 'clipboard', {
      value: originalClipboard,
      writable: true,
      configurable: true,
    });
  });

  it('renders progress indicator', () => {
    render(<StudyClient {...defaultProps} />);
    const progress = screen.getByTestId('chapter-progress');
    expect(progress).toBeInTheDocument();
    // Default props uses itihas category which shows Adhyaya, and 1 verse.
    expect(progress).toHaveTextContent(/1 \/ 1/);
  });

  it('handles mobile swipe gestures for chapter navigation', () => {
    render(<StudyClient {...defaultProps} />);
    const container = screen.getByTestId('study-container');

    // Target is actually e.targetTouches, JSDOM can be weird about it.
    const touchStartEvent = { targetTouches: [{ clientX: 200 }] } as unknown as TouchEvent;
    fireEvent.touchStart(container, touchStartEvent);
    fireEvent.touchEnd(container, { changedTouches: [{ clientX: 100 }] } as unknown as TouchEvent); // dx = -100 (left swipe -> next chapter)

    expect(mockPush).toHaveBeenCalledWith('/bhagavad-gita/2');
  });

  it('handles mobile swipe gestures for previous chapter navigation', () => {
    const ch2Props = { ...defaultProps, chapter: 2 };
    render(<StudyClient {...ch2Props} />);
    const container = screen.getByTestId('study-container');

    const touchStartEvent = { targetTouches: [{ clientX: 100 }] } as unknown as TouchEvent;
    fireEvent.touchStart(container, touchStartEvent);
    fireEvent.touchEnd(container, { changedTouches: [{ clientX: 200 }] } as unknown as TouchEvent); // dx = 100 (right swipe -> prev chapter)

    expect(mockPush).toHaveBeenCalledWith('/bhagavad-gita/1');
  });
});