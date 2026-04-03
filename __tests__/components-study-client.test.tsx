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
      layers: [
        {
          type: 'commentary',
          author: 'shankara',
          language: 'sanskrit',
          content: 'Shankara commentary'
        },
        {
          type: 'translation',
          author: 'gambhirananda',
          language: 'english',
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

  it('displays author filter dropdown', () => {
    render(<StudyClient {...defaultProps} />);
    const authorSelect = screen.getByRole('combobox', { name: /author/i });
    expect(authorSelect).toBeInTheDocument();
  });

  it('displays language filter dropdown', () => {
    render(<StudyClient {...defaultProps} />);
    const languageSelect = screen.getByRole('combobox', { name: /language/i });
    expect(languageSelect).toBeInTheDocument();
  });

  it('shows verse content', () => {
    render(<StudyClient {...defaultProps} />);
    expect(screen.getByText('धृतराष्ट्र उवाच')).toBeInTheDocument();
  });

  it('filters commentaries by author', async () => {
    render(<StudyClient {...defaultProps} />);

    const authorSelect = screen.getByRole('combobox', { name: /author/i });
    fireEvent.change(authorSelect, { target: { value: 'shankara' } });

    await waitFor(() => {
      expect(screen.getByText('Shankara commentary')).toBeInTheDocument();
    });
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
});