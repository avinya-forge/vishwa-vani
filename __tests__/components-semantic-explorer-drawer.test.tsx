import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SemanticExplorerDrawer from '@/components/shloka/semantic-explorer-drawer';

// Mock the tattvas data
jest.mock('@/data/ontology/tattvas.json', () => ({
  tattvas: {
    dharma: {
      id: 'dharma',
      label: 'Dharma',
      sanskritLabel: 'धर्म',
      definition: 'Cosmic law and duty.',
      category: 'ethics',
      primarySources: [
        { textSlug: 'bhagavad-gita', chapter: 1, verse: 1, preview: 'dharma field' },
        { textSlug: 'bhagavad-gita', chapter: 2, verse: 7, preview: 'my mind is confused about duty' }
      ],
      crossReferences: [
        {
          target: { textSlug: 'mahabharata', chapter: 3, verse: 313, preview: 'what is the highest dharma?' },
          relationshipType: 'expands',
          rationale: 'Yudhishthira explains dharma.'
        }
      ]
    },
    karma: {
      id: 'karma',
      label: 'Karma',
      sanskritLabel: 'कर्म',
      definition: 'Action and reaction.',
      category: 'metaphysics',
      primarySources: [
        { textSlug: 'bhagavad-gita', chapter: 2, verse: 47, preview: 'right to work' }
      ],
      crossReferences: []
    }
  }
}));

describe('SemanticExplorerDrawer', () => {
  const defaultProps = {
    textSlug: 'bhagavad-gita',
    chapter: 1,
    verse: 1,
    isOpen: true,
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not render when isOpen is false', () => {
    const { container } = render(<SemanticExplorerDrawer {...defaultProps} isOpen={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders semantic links when a matching verse is provided', () => {
    render(<SemanticExplorerDrawer {...defaultProps} />);

    // Should render the title
    expect(screen.getByText('Cross-Scriptural Links')).toBeInTheDocument();

    // Should render the matching tattva "Dharma"
    expect(screen.getByText('Dharma')).toBeInTheDocument();
    expect(screen.getByText('धर्म')).toBeInTheDocument();
    expect(screen.getByText('Cosmic law and duty.')).toBeInTheDocument();

    // Should render the other primary source
    expect(screen.getByText('Ch. 2, Verse 7')).toBeInTheDocument();
    expect(screen.getByText(/"my mind is confused about duty"/)).toBeInTheDocument();

    // Should render the cross reference
    expect(screen.getByText('Ch. 3, Verse 313')).toBeInTheDocument();
    expect(screen.getByText(/"what is the highest dharma\?"/)).toBeInTheDocument();
    expect(screen.getByText('Yudhishthira explains dharma.')).toBeInTheDocument();

    // Should NOT render karma (since it is not associated with bg 1.1)
    expect(screen.queryByText('Karma')).not.toBeInTheDocument();
  });

  it('renders a no links message when no tattvas match the verse', () => {
    render(
      <SemanticExplorerDrawer
        {...defaultProps}
        chapter={18}
        verse={78}
      />
    );

    expect(screen.getByText('No semantic links found for this verse yet.')).toBeInTheDocument();
    expect(screen.queryByText('Dharma')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<SemanticExplorerDrawer {...defaultProps} />);

    // Using a more robust selector since the button only has an SVG inside it
    // but the closest distinguishable element is a button in the header
    const closeButtons = screen.getAllByRole('button');
    const closeBtn = closeButtons[0];

    fireEvent.click(closeBtn);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking a semantic link', () => {
    render(<SemanticExplorerDrawer {...defaultProps} />);

    // First link might be the header link to /tattvas/dharma.
    // Let's click the link for Ch 2, verse 7 instead
    const verseLink = screen.getByText('Ch. 2, Verse 7').closest('a');

    if (verseLink) {
       fireEvent.click(verseLink);
    }

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });
});
