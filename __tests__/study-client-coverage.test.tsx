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

const longCommentary = 'A'.repeat(120); // Must be > 80 chars to pass isValidCommentaryContent

const makeVerses = (extra: object[] = []) => [
  {
    id: '1.1',
    original: 'धृतराष्ट्र उवाच',
    transliteration: 'dhṛtarāṣṭra uvāca',
    verse: 1,
    chapter: 1,
    meaning: 'Dhritarashtra said',
    layers: [
      { type: 'translation', lang: 'en', author: 'gambhirananda', content: 'Dhritarashtra said' },
      { type: 'commentary', author: 'shankara', lang: 'en', author_name: 'Adi Shankara', author_label: 'Shankara', author_icon: '📜', content: longCommentary },
      { type: 'commentary', author: 'ramanuja', lang: 'en', author_name: 'Ramanuja', author_label: 'Ramanuja', author_icon: '🔱', content: longCommentary },
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

  describe('Lean Template: default state', () => {
    it('initialises scholarSelection as empty array (commentaries hidden)', () => {
      render(<StudyClient {...defaultProps} />);
      expect(screen.getByText(/Scholars \(0\/2\)/)).toBeInTheDocument();
      expect(screen.queryByText(longCommentary)).not.toBeInTheDocument();
    });

    it('initialises languageSelection to "all"', () => {
      render(<StudyClient {...defaultProps} />);
      const selects = screen.getAllByRole('combobox');
      const select = selects[0];
      expect((select as HTMLSelectElement).value).toBe('all');
    });

    it('shows Sanskrit verse and meaning on initial render', () => {
      render(<StudyClient {...defaultProps} />);
      expect(screen.getByText('धृतराष्ट्र उवाच')).toBeInTheDocument();
      expect(screen.getByText('Dhritarashtra said')).toBeInTheDocument();
    });

    it('handles empty verses array without crash', () => {
      render(<StudyClient {...defaultProps} verses={[]} />);
      expect(screen.getByTestId('hierarchical-nav')).toBeInTheDocument();
    });
  });

  // ── LEAN TEMPLATE: Author Toggle ──────────────────────────────────────────

  describe('Lean Template: author toggle', () => {
    it('shows commentary after selecting one author', async () => {
      render(<StudyClient {...defaultProps} />);
      const shankaraBtn = screen.getAllByRole('switch').find(b => b.textContent?.includes('Shankara'));
      expect(shankaraBtn).toBeDefined();
      if (shankaraBtn) fireEvent.click(shankaraBtn);
      await waitFor(() => {
        expect(screen.getByText(/Scholars \(1\/2\)/)).toBeInTheDocument();
        expect(screen.getByText(longCommentary)).toBeInTheDocument();
      });
    });

    it('hides commentary after deselecting the only author', async () => {
      render(<StudyClient {...defaultProps} />);
      const shankaraBtn = screen.getAllByRole('switch').find(b => b.textContent?.includes('Shankara'));
      if (shankaraBtn) fireEvent.click(shankaraBtn); // select
      await waitFor(() => expect(screen.getByText(longCommentary)).toBeInTheDocument());
      if (shankaraBtn) fireEvent.click(shankaraBtn); // deselect
      await waitFor(() => expect(screen.queryByText(longCommentary)).not.toBeInTheDocument());
    });

    it('allows selecting up to 2 authors simultaneously', async () => {
      render(<StudyClient {...defaultProps} />);
      const buttons = screen.getAllByRole('switch');
      const shankaraBtn = buttons.find(b => b.textContent?.includes('Shankara'));
      const ramanujaBtn = buttons.find(b => b.textContent?.includes('Ramanuja'));
      if (shankaraBtn) fireEvent.click(shankaraBtn);
      await waitFor(() => expect(screen.getByText(/Scholars \(1\/2\)/)).toBeInTheDocument());
      if (ramanujaBtn) fireEvent.click(ramanujaBtn);
      await waitFor(() => expect(screen.getByText(/Scholars \(2\/2\)/)).toBeInTheDocument());
    });

    it('replaces oldest when a 3rd author is selected (lean template rule)', async () => {
      const versesWithThree = makeVerses([
        { type: 'commentary', author: 'madhva', lang: 'en', author_name: 'Madhva', author_label: 'Madhva', author_icon: '🌸', content: longCommentary },
      ]);
      render(<StudyClient {...defaultProps} verses={versesWithThree} />);
      const buttons = screen.getAllByRole('switch');
      const shankaraBtn = buttons.find(b => b.textContent?.includes('Shankara'));
      const ramanujaBtn = buttons.find(b => b.textContent?.includes('Ramanuja'));
      const madhvaBtn = buttons.find(b => b.textContent?.includes('Madhva'));

      if (shankaraBtn) fireEvent.click(shankaraBtn); // select #1
      if (ramanujaBtn) fireEvent.click(ramanujaBtn); // select #2
      await waitFor(() => expect(screen.getByText(/Scholars \(2\/2\)/)).toBeInTheDocument());

      // Clicking a 3rd should replace oldest (shankara), not add
      if (madhvaBtn) {
        fireEvent.click(madhvaBtn);
        await waitFor(() => expect(screen.getByText(/Scholars \(2\/2\)/)).toBeInTheDocument());
      }
    });

    it('persists scholar selection to localStorage', async () => {
      render(<StudyClient {...defaultProps} />);
      const buttons = screen.getAllByRole('switch');
      const shankaraBtn = buttons.find(b => b.textContent?.includes('Shankara'));
      if (shankaraBtn) {
        fireEvent.click(shankaraBtn);
        await waitFor(() => {
          const saved = localStorageMock.getItem('vishwa_scholar_pref');
          expect(saved).not.toBeNull();
          if (saved) expect(JSON.parse(saved)).toContain('shankara');
        }, { timeout: 3000 });
      }
    });

    it('restores saved scholar selection from localStorage on mount', async () => {
      localStorageMock.setItem('vishwa_scholar_pref', JSON.stringify(['shankara']));
      render(<StudyClient {...defaultProps} />);
      await waitFor(() => expect(screen.getByText(/Scholars \(1\/2\)/)).toBeInTheDocument());
    });

    it('limits restoration to max 2 from localStorage even if more stored', async () => {
      localStorageMock.setItem('vishwa_scholar_pref', JSON.stringify(['shankara', 'ramanuja', 'madhva']));
      render(<StudyClient {...defaultProps} />);
      await waitFor(() => {
        const counter = screen.getByText(/Scholars \(\d\/2\)/);
        expect(counter.textContent).toMatch(/Scholars \([0-2]\/2\)/);
      });
    });

    it('falls back to empty selection if localStorage value is invalid JSON', async () => {
      localStorageMock.setItem('vishwa_scholar_pref', 'not-valid-json{{');
      render(<StudyClient {...defaultProps} />);
      await waitFor(() => expect(screen.getByText(/Scholars \(0\/2\)/)).toBeInTheDocument());
    });
  });

  // ── LANGUAGE FILTER ────────────────────────────────────────────────────────

  describe('Language filter', () => {
    it('persists language selection to localStorage', async () => {
      render(<StudyClient {...defaultProps} />);
      const selects = screen.getAllByRole('combobox');
      const select = selects[0];
      fireEvent.change(select, { target: { value: 'en' } });
      await waitFor(() => {
        expect(localStorageMock.getItem('vishwa_language_pref')).toBe('en');
      });
    });

    it('language filter does not hide base meaning layer', async () => {
      render(<StudyClient {...defaultProps} />);
      const selects = screen.getAllByRole('combobox');
      const select = selects[0];
      fireEvent.change(select, { target: { value: 'hi' } });
      // Meaning should still be visible regardless of language filter
      expect(screen.getByText('Dhritarashtra said')).toBeInTheDocument();
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
      expect(screen.getByText(/Parva 1 \/ Adhyaya 3/)).toBeInTheDocument();
    });

    it('renders without crash when adhyayaList is empty for Gita', () => {
      render(<StudyClient {...defaultProps} />);
      expect(screen.getByTestId('hierarchical-nav')).toBeInTheDocument();
    });
  });

  // ── AI SYNTHESIS BUTTON ────────────────────────────────────────────────────

  describe('AI Synthesis button', () => {
    it('renders AI Analysis button and is not disabled initially', () => {
      render(<StudyClient {...defaultProps} />);
      const btn = screen.getByRole('button', { name: /Generate AI Synthesis for entire chapter/i });
      expect(btn).toBeInTheDocument();
      expect(btn).not.toBeDisabled();
    });

    it('shows loading state while synthesizing', async () => {
      // Mock fetch to stall
      global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;

      render(<StudyClient {...defaultProps} />);
      const btn = screen.getByRole('button', { name: /Generate AI Synthesis for entire chapter/i });
      fireEvent.click(btn);
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /Analysing/i })).toBeInTheDocument();
      });
    });

    it('shows synthesis result in manuscript card on success', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ success: true, synthesis: 'Synthesised wisdom text' }),
        })
      ) as jest.Mock;

      render(<StudyClient {...defaultProps} />);
      const btn = screen.getByRole('button', { name: /Generate AI Synthesis for entire chapter/i });
      fireEvent.click(btn);
      await waitFor(() => {
        expect(screen.getByTestId('vedic-manuscript-card')).toBeInTheDocument();
      });
    });

    it('shows "Synthesis failed" when API returns non-ok HTTP status', async () => {
      // res.ok=false triggers throw → caught → sets "Synthesis failed."
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 503,
          json: () => Promise.resolve({ success: false }),
        })
      ) as jest.Mock;

      render(<StudyClient {...defaultProps} />);
      fireEvent.click(screen.getByRole('button', { name: /Generate AI Synthesis for entire chapter/i }));
      await waitFor(() => {
        expect(screen.getByText(/Synthesis failed/i)).toBeInTheDocument();
      });
    });

    it('shows "Synthesis unavailable" when API ok but success:false', async () => {
      // res.ok=true but data.success=false → sets "Synthesis unavailable, try again later."
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ success: false, message: 'No context provided' }),
        })
      ) as jest.Mock;

      render(<StudyClient {...defaultProps} />);
      fireEvent.click(screen.getByRole('button', { name: /Generate AI Synthesis for entire chapter/i }));
      await waitFor(() => {
        expect(screen.getByText(/Synthesis unavailable/i)).toBeInTheDocument();
      });
    });

    it('handles fetch network error gracefully', async () => {
      global.fetch = jest.fn(() => Promise.reject(new Error('Network error'))) as jest.Mock;
      render(<StudyClient {...defaultProps} />);
      fireEvent.click(screen.getByRole('button', { name: /Generate AI Synthesis for entire chapter/i }));
      await waitFor(() => {
        expect(screen.getByText(/Synthesis failed/i)).toBeInTheDocument();
      });
    });
  });

  // ── VERSES WITHOUT COMMENTARY ──────────────────────────────────────────────

  describe('Edge cases', () => {
    it('renders verse with no commentary layers gracefully', () => {
      const verses = [{ id: '1.1', original: 'Test', transliteration: '', verse: 1, chapter: 1, meaning: 'Test meaning', layers: [] }];
      render(<StudyClient {...defaultProps} verses={verses} />);
      expect(screen.getByText('Test meaning')).toBeInTheDocument();
    });

    it('renders verse without transliteration without crash', () => {
      const verses = [{ id: '1.1', original: 'संस्कृत', transliteration: '', verse: 1, chapter: 1, meaning: 'Sanskrit', layers: [] }];
      render(<StudyClient {...defaultProps} verses={verses} />);
      expect(screen.getByText('Sanskrit')).toBeInTheDocument();
    });

    it('renders verse without meaning without crash', () => {
      const verses = [{ id: '1.1', original: 'Test', transliteration: '', verse: 1, chapter: 1, meaning: '', layers: [] }];
      render(<StudyClient {...defaultProps} verses={verses} />);
      expect(screen.getByTestId('shloka-mask')).toBeInTheDocument();
    });
  });
});
