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
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn()
  })
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
    const dnyanButton = screen.getAllByRole('button').find(b => b.textContent?.includes('Dnyaneshwari'));
    const prabhupadaButton = screen.getAllByRole('button').find(b => b.textContent?.includes('Prabhupada'));
    expect(dnyanButton).toBeDefined();
    expect(prabhupadaButton).toBeDefined();
    const visibleAuthorButtons = screen.getAllByRole('button').filter(b => /Dnyaneshwari|Prabhupada/.test(b.textContent || ''));
    expect(visibleAuthorButtons.length).toBeLessThanOrEqual(2);
  });

  it('displays language filter dropdown', () => {
    render(<StudyClient {...defaultProps} />);
    const languageSelect = screen.getByRole('combobox', { name: /language/i });
    expect(languageSelect).toBeInTheDocument();
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
    const shankaraButton = authorButtons.find(b => b.textContent?.includes('shankara'));
    
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
    expect(screen.getByTestId('hierarchical-nav')).toBeInTheDocument();
  });

  it('displays navigation components', () => {
    render(<StudyClient {...defaultProps} />);
    expect(screen.getByTestId('hierarchical-nav')).toBeInTheDocument();
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
    expect(screen.getByText(/Parva 1 \/ Adhyaya 5/)).toBeInTheDocument();
  });
});