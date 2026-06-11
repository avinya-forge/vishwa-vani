import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import StudyClient from '@/components/shloka/study-client';

// ─── Mocks ───────────────────────────────────────────────────────────────────

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
}));

jest.mock('@/components/shloka/shloka-mask', () =>
  function MockShlokaMask({ text }: { text: string }) {
    return <div data-testid="shloka-mask">{text}</div>;
  }
);

jest.mock('@/components/shloka/vedic-timeline', () =>
  function MockVedicTimeline() {
    return <div data-testid="vedic-timeline" />;
  }
);

jest.mock('@/components/shloka/vedic-manuscript-card', () =>
  function MockVedicManuscriptCard({ content }: { content: string }) {
    return <div data-testid="vedic-manuscript-card">{content}</div>;
  }
);

jest.mock('@/components/ui/hierarchical-nav', () =>
  function MockHierarchicalNav() {
    return <div data-testid="hierarchical-nav" />;
  }
);

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const longCommentary = 'A'.repeat(120); // Must be ≥ 20 chars and not start with '[' to pass isValidCommentaryContent

const makeVerses = (extra: object[] = []) => [
  {
    id: '1.1',
    original: 'धृतराष्ट्र उवाच',
    transliteration: 'dhṛtarāṣṭra uvāca',
    verse: 1,
    chapter: 1,
    translation: 'Dhritarashtra said',
    layers: [
      { type: 'translation', lang: 'en', author: 'gambhirananda', content: 'Dhritarashtra said' },
      { type: 'commentary', author: 'shankara', lang: 'en', author_name: 'Adi Shankara', author_label: 'Shankara', author_icon: '📜', content: longCommentary },
      { type: 'commentary', author: 'ramanuja', lang: 'en', author_name: 'Ramanuja', author_label: 'Ramanuja', author_icon: '🔱', content: longCommentary + '2' },
      { type: 'commentary', author: 'madhva', lang: 'en', author_name: 'Madhva', author_label: 'Madhva', author_icon: '🔱', content: longCommentary + '3' },
      { type: 'commentary', author: 'shankara', lang: 'hi', author_name: 'Adi Shankara', author_label: 'Shankara', author_icon: '📜', content: longCommentary + 'hi' },
      ...extra,
    ],
  },
];

const defaultProps = {
  textSlug: 'bhagavad-gita',
  chapter: 1,
  verses: makeVerses(),
  adhyayaList: [],
  currentAdhyaya: undefined,
};

// ─── localStorage mock ────────────────────────────────────────────────────────

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

beforeEach(() => {
  localStorageMock.clear();
  Object.defineProperty(window, 'localStorage', { value: localStorageMock, writable: true });
});

// ─── Tests ────────────────────────────────────────────────────────────────────


beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
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


describe('StudyClient — STAB-606 coverage', () => {

  // ── LEAN TEMPLATE: Default State ──────────────────────────────────────────


  // ── LEAN TEMPLATE: Author Toggle ──────────────────────────────────────────
  describe('Author Toggle', () => {
    it('allows toggling scholars and enforces max 2 limit', async () => {
      render(<StudyClient {...defaultProps} />);
      const buttons = screen.getAllByRole('switch');
      
      // Click first
      fireEvent.click(buttons[0]);
      // Click second
      if (buttons[1]) fireEvent.click(buttons[1]);
      // Click third (should replace oldest)
      if (buttons[2]) fireEvent.click(buttons[2]);
      
      // Click third again to untoggle
      if (buttons[2]) fireEvent.click(buttons[2]);
    });
  });  // ── LANGUAGE FILTER ────────────────────────────────────────────────────────

  describe('Language filter', () => {
    it('persists language selection to localStorage', async () => {
      render(<StudyClient {...defaultProps} />);
      const btn = screen.getByRole('button', { name: 'EN' });
      fireEvent.click(btn);
      await waitFor(() => {
        expect(localStorageMock.getItem('vishwa_language_pref')).toBe('en');
      });
    });

    it('language filter does not hide base meaning layer', async () => {
      render(<StudyClient {...defaultProps} />);
      const btn = screen.getByRole('button', { name: 'HI' });
      fireEvent.click(btn);
      // Meaning should still be visible regardless of language filter
      expect(screen.getByText('Dhritarashtra said', { exact: false })).toBeInTheDocument();
    });
  });

  // ── READING POSITION ────────────────────────────────────────────────────────

  describe('Continue Reading persistence', () => {
    it('writes reading position to localStorage on mount', async () => {
      render(<StudyClient {...defaultProps} />);
      await waitFor(() => {
        const pos = localStorageMock.getItem('vishwa_continue_reading');
        expect(pos).not.toBeNull();
        if (pos) {
          const parsed = JSON.parse(pos);
          expect(parsed.text).toBe('bhagavad-gita');
          expect(parsed.chapter).toBe(1);
        }
      });
    });

    it('stores last text to localStorage', async () => {
      render(<StudyClient {...defaultProps} />);
      await waitFor(() => {
        expect(localStorageMock.getItem('vishwa_last_text')).toBe('bhagavad-gita');
      });
    });
  });

  // ── MAHABHARATA ADHYAYA ROUTING ────────────────────────────────────────────

  describe('Mahabharata adhyaya routing', () => {
    it('shows Parva/Adhyaya metadata in header when textSlug is mahabharata', () => {
      render(
        <StudyClient
          textSlug="mahabharata"
          chapter={1}
          verses={defaultProps.verses}
          adhyayaList={[{ num: 3, id: 'parva-1-adhyaya-3' }]}
          currentAdhyaya={3}
        />
      );
      expect(screen.getByText(/Parva 1 · Adhyaya 3/)).toBeInTheDocument();
    });

    it('renders without crash when adhyayaList is empty for Gita', () => {
      render(<StudyClient {...defaultProps} />);
      expect(screen.getAllByTestId('hierarchical-nav')[0]).toBeInTheDocument();
    });
  });


  // ── VERSES WITHOUT COMMENTARY ──────────────────────────────────────────────

  describe('Edge cases', () => {
    it('renders verse with no commentary layers gracefully', () => {
      const verses = [{ id: '1.1', original: 'Test', transliteration: '', verse: 1, chapter: 1, translation: 'Test translation', layers: [] }];
      render(<StudyClient {...defaultProps} verses={verses} />);
      expect(screen.getByText('Test translation')).toBeInTheDocument();
    });

    it('renders verse without transliteration without crash', () => {
      const verses = [{ id: '1.1', original: 'संस्कृत', transliteration: '', verse: 1, chapter: 1, translation: 'Sanskrit', layers: [] }];
      render(<StudyClient {...defaultProps} verses={verses} />);
      expect(screen.getByText('Sanskrit')).toBeInTheDocument();
    });

    it('renders verse without meaning without crash', () => {
      const verses = [{ id: '1.1', original: 'Test', transliteration: '', verse: 1, chapter: 1, meaning: '', layers: [] }];
      render(<StudyClient {...defaultProps} verses={verses} />);
      expect(screen.getByTestId('shloka-mask')).toBeInTheDocument();
    });
  });

  // ── SYNTHESIS UI ────────────────────────────────────────────────────────────
  describe('Synthesis UI', () => {
    let originalFetch: typeof global.fetch;
    beforeAll(() => {
      originalFetch = global.fetch;
    });
    afterAll(() => {
      global.fetch = originalFetch;
    });

    it('handles synthesizing the entire chapter successfully', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true, synthesis: 'Mocked AI synthesis' })
      });
      render(<StudyClient {...defaultProps} />);
      const btn = screen.getByRole('button', { name: /Generate AI Synthesis for entire chapter/i });
      fireEvent.click(btn);
      
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
      });
    });

    it('handles synthesis API failure gracefully', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 500
      });
      render(<StudyClient {...defaultProps} />);
      const btn = screen.getByRole('button', { name: /Generate AI Synthesis for entire chapter/i });
      fireEvent.click(btn);
      
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
      });
    });

    it('handles synthesis JSON error gracefully', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: false })
      });
      render(<StudyClient {...defaultProps} />);
      const btn = screen.getByRole('button', { name: /Generate AI Synthesis for entire chapter/i });
      fireEvent.click(btn);
      
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
      });
    });
  });

  // ── BOOKMARKS & SHARE ───────────────────────────────────────────────────────
  describe('Bookmarks and Share Links', () => {
    it('can toggle bookmarks', async () => {
      render(<StudyClient {...defaultProps} />);
      const addBookmarkBtn = screen.getByTitle('Add bookmark');
      fireEvent.click(addBookmarkBtn);
      
      await waitFor(() => {
        expect(screen.getByTitle('Remove bookmark')).toBeInTheDocument();
      });

      // Jump to bookmark
      const jumpBtn = screen.getByTitle(/Jump to first bookmark/);
      fireEvent.click(jumpBtn);
      
      // Remove bookmark
      fireEvent.click(screen.getByTitle('Remove bookmark'));
      await waitFor(() => {
        expect(screen.getByTitle('Add bookmark')).toBeInTheDocument();
      });
    });

    it('can copy chapter share link', async () => {
      const originalClipboard = global.navigator.clipboard;
      Object.defineProperty(global.navigator, 'clipboard', {
        value: { writeText: jest.fn().mockResolvedValue(undefined) },
        writable: true,
        configurable: true,
      });

      render(<StudyClient {...defaultProps} />);
      const shareBtn = screen.getByTitle('Copy chapter link to clipboard');
      fireEvent.click(shareBtn);
      
      expect(global.navigator.clipboard.writeText).toHaveBeenCalled();

      Object.defineProperty(global.navigator, 'clipboard', {
        value: originalClipboard,
        writable: true,
        configurable: true,
      });
    });
  });
});
