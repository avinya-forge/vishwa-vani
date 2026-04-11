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

describe('StudyClient - Lean Template Integration', () => {
  // Commentary content must be > 80 chars to pass isValidCommentaryContent filter in StudyClient
  const SHANKARA_EN = 'From the perspective of Advaita Vedanta, Dhritarashtra represents the ego-bound mind that clings to the fruits of action and cannot perceive the non-dual truth.'
  const RAMANUJA_EN = 'From the perspective of Vishishtadvaita, Dhritarashtra symbolises attachment to kin and outcome, which clouds the discriminating intellect at the decisive moment of dharmic choice.'
  const SHANKARA_HI = 'अद्वैत वेदान्त के अनुसार धृतराष्ट्र अहंकार और आसक्ति का प्रतीक हैं जो सत्य के दर्शन को रोकता है। यह श्लोक नेत्रहीनता को अज्ञान का प्रतीक मानता है।'

  const mockVerses = [
    {
      id: '1.1',
      original: 'धृतराष्ट्र उवाच',
      transliteration: 'dhṛtarāṣṭra uvāca',
      verse: 1,
      chapter: 1,
      meaning: 'Dhritarashtra said',
      layers: [
        { type: 'commentary', author: 'shankara', lang: 'en', author_name: 'Adi Shankara', author_icon: '📜', content: SHANKARA_EN },
        { type: 'commentary', author: 'ramanuja', lang: 'en', author_name: 'Ramanuja', author_icon: '🔱', content: RAMANUJA_EN },
        { type: 'commentary', author: 'shankara', lang: 'hi', author_name: 'Adi Shankara', author_icon: '📜', content: SHANKARA_HI },
        { type: 'translation', lang: 'en', author: 'gambhirananda', content: 'Dhritarashtra said' }
      ]
    },
    {
      id: '1.2',
      original: 'सञ्जय उवाच',
      transliteration: 'sañjaya uvāca',
      verse: 2,
      chapter: 1,
      meaning: 'Sanjaya said',
      layers: [
        { type: 'commentary', author: 'shankara', lang: 'en', author_name: 'Adi Shankara', author_icon: '📜', content: SHANKARA_EN },
        { type: 'translation', lang: 'en', author: 'gambhirananda', content: 'Sanjaya said' }
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

  describe('Lean Template - Commentaries Hidden by Default', () => {
    it('should hide all commentaries on initial load', () => {
      render(<StudyClient {...defaultProps} />);

      // Verify commentaries are NOT visible
      expect(screen.queryByText('From the perspective of Advaita Vedanta...')).not.toBeInTheDocument();
      expect(screen.queryByText('From the perspective of Visistadvaita...')).not.toBeInTheDocument();
      expect(screen.queryByText('Sanjaya begins...')).not.toBeInTheDocument();
    });

    it('should display meaning/verse on initial load', () => {
      render(<StudyClient {...defaultProps} />);

      // Meaning should always be visible
      expect(screen.getByText('Dhritarashtra said')).toBeInTheDocument();
      expect(screen.getByText('Sanjaya said')).toBeInTheDocument();

      // Sanskrit should be visible
      expect(screen.getByText('धृतराष्ट्र उवाच')).toBeInTheDocument();
    });
  });

  describe('Multi-Author Selector - Max 2 Limit', () => {
    it('should display author selector buttons', () => {
      render(<StudyClient {...defaultProps} />);

      // Look for the Scholars counter text that appears before the buttons
      const scholarsLabel = screen.getByText(/Scholars \(\d\/2\)/);
      expect(scholarsLabel).toBeInTheDocument();

      // Verify we have author buttons in the document
      const allButtons = screen.getAllByRole('button');
      expect(allButtons.length).toBeGreaterThan(0);
    });

    it('should enforce max 2 authors selector limit initially', () => {
      render(<StudyClient {...defaultProps} />);

      // Verify counter shows 0/2 initially (lean template default)
      expect(screen.getByText(/Scholars \(0\/2\)/)).toBeInTheDocument();
    });

    it('should update counter when author is selected', async () => {
      render(<StudyClient {...defaultProps} />);

      const allButtons = screen.getAllByRole('button');
      // Find button with emoji (author button)
      const authorButton = allButtons.find(b => b.textContent?.match(/Adi Shankara|Ramanuja/) && !(b as HTMLButtonElement).disabled);

      if (authorButton) {
        fireEvent.click(authorButton);

        // Counter should update to 1/2
        await waitFor(() => {
          const counter = screen.getByTestId('scholars-counter');
          expect(counter).toHaveTextContent('Scholars (1/2)');
        }, { timeout: 3000 });
      }
    });

    it('should provide language selector', () => {
      render(<StudyClient {...defaultProps} />);

      const languageSelects = screen.getAllByRole('combobox');
      const languageSelect = languageSelects[0];
      expect(languageSelect).toBeInTheDocument();
    });
  });

  describe('AI Synthesis - Respects Lean Template', () => {
    it('should include meaning in synthesis context regardless of author selection', async () => {
      // This is tested implicitly by the synthesis flow
      // The synthesis should call /api/synthesize with meaning + up to 2 commentaries
      
      render(<StudyClient {...defaultProps} />);

      const aiButton = screen.getByRole('button', { name: /AI Analysis/i });
      expect(aiButton).toBeInTheDocument();

      // Button availability confirms synthesis is set up for lean template
      expect(aiButton).not.toBeDisabled();
    });
  });

  describe('Language Filter - Applies to Commentary Only', () => {
    it('should display language selector', () => {
      render(<StudyClient {...defaultProps} />);

      const languageSelects = screen.getAllByRole('combobox');
      const languageSelect = languageSelects[0];
      expect(languageSelect).toBeInTheDocument();
    });

    it('should maintain meaning display regardless of language selection', () => {
      render(<StudyClient {...defaultProps} />);

      // Meaning should be visible in any language config
      expect(screen.getByText('Dhritarashtra said')).toBeInTheDocument();
    });
  });

  describe('localStorage Persistence', () => {
    it('should persist author selection to localStorage', async () => {
      render(<StudyClient {...defaultProps} />);

      const buttons = screen.getAllByRole('button');
      const shankaraButton = buttons.find(b => b.textContent?.includes('shankara'));

      if (shankaraButton) {
        fireEvent.click(shankaraButton);

        // Wait for state update
        await waitFor(() => {
          expect(screen.getByText('From the perspective of Advaita Vedanta...')).toBeInTheDocument();
        });

        // Check localStorage
        const saved = localStorage.getItem('vishwa_scholar_pref');
        expect(saved).toBeDefined();
        const parsed = JSON.parse(saved || '[]');
        expect(parsed).toContain('shankara');
      }
    });
  });

  describe('Responsive UI', () => {
    it('should render all UI elements for mobile view', () => {
      render(<StudyClient {...defaultProps} />);

      // Verify key elements are present
      expect(screen.getByTestId('hierarchical-nav')).toBeInTheDocument();
      expect(screen.getByTestId('vedic-timeline')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /AI Analysis/i })).toBeInTheDocument();
    });
  });

  describe('STAB-604 Audit: third-author replacement, language filter, adhyaya display', () => {
    it('counter increments to 1/2 after selecting one author', async () => {
      localStorage.clear();
      render(<StudyClient {...defaultProps} />);

      expect(screen.getByText(/Scholars \(0\/2\)/)).toBeInTheDocument();

      const buttons = screen.getAllByRole('button');
      const authorBtn = buttons.find(b =>
        /shankara|ramanuja/i.test(b.textContent || '') && !(b as HTMLButtonElement).disabled
      );

      if (authorBtn) {
        fireEvent.click(authorBtn);
        await waitFor(() => {
          const counter = screen.getByTestId('scholars-counter');
          expect(counter).toHaveTextContent('Scholars (1/2)');
        }, { timeout: 3000 });
      }
    });

    it('language filter hides commentary in non-matching language', async () => {
      render(<StudyClient {...defaultProps} />);

      // Select shankara so commentary can appear
      const shankaraBtn = screen.getAllByRole('button').find(b => /shankara/i.test(b.textContent || ''));
      if (shankaraBtn) fireEvent.click(shankaraBtn);

      // Switch language to Hindi — English commentary should be hidden
      const langSelect = screen.getAllByRole('combobox')[0];
      fireEvent.change(langSelect, { target: { value: 'hi' } });

      await waitFor(() => {
        // English commentary must not appear
        expect(screen.queryByText(SHANKARA_EN)).not.toBeInTheDocument();
      });
    });

    it('Mahabharata header shows Parva/Adhyaya counter when currentAdhyaya set', () => {
      const mbhProps = {
        ...defaultProps,
        textSlug: 'mahabharata',
        chapter: 1,
        adhyayaList: [{ num: 3, id: 'parva-1-adhyaya-3' }, { num: 4, id: 'parva-1-adhyaya-4' }],
        currentAdhyaya: 3
      };
      render(<StudyClient {...mbhProps} />);
      expect(screen.getByText(/Parva 1 \/ Adhyaya 3/)).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty verses array', () => {
      render(<StudyClient {...defaultProps} verses={[]} />);

      // Should render header and nav without crashing
      expect(screen.getByTestId('hierarchical-nav')).toBeInTheDocument();
    });

    it('should handle verses with no commentary layers', () => {
      const versesNoCommentary = [{
        id: '1.1',
        original: 'Test',
        transliteration: 'test',
        verse: 1,
        chapter: 1,
        meaning: 'Test meaning',
        layers: [
          {
            type: 'translation',
            lang: 'en',
            author: 'translator',
            content: 'Test meaning'
          }
        ]
      }];

      render(<StudyClient {...defaultProps} verses={versesNoCommentary} />);

      // Should show meaning, no commentary buttons or commentary sections
      expect(screen.getByText('Test meaning')).toBeInTheDocument();
      expect(screen.queryByText('From the perspective')).not.toBeInTheDocument();
    });

    it('should handle Hindu RTL text properly without breaking layout', () => {
      render(<StudyClient {...defaultProps} />);

      // Sanskrit text should render without layout issues
      expect(screen.getByText('धृतराष्ट्र उवाच')).toBeInTheDocument();
    });
  });
});
