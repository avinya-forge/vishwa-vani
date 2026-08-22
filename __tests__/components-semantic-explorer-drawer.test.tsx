import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SemanticExplorerDrawer from '@/components/shloka/semantic-explorer-drawer';

jest.mock('next/link', () => {
  return ({ children, href, onClick }: { children: React.ReactNode; href: string; onClick?: () => void }) => (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  );
});

describe('SemanticExplorerDrawer', () => {
  const defaultProps = {
    textSlug: 'kena-upanishad',
    chapter: 1,
    verse: 1,
    isOpen: true,
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when isOpen is false', () => {
    const { container } = render(<SemanticExplorerDrawer {...defaultProps} isOpen={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders drawer content when isOpen is true', () => {
    render(<SemanticExplorerDrawer {...defaultProps} />);

    expect(screen.getByText(/Semantic Explorer/i)).toBeInTheDocument();
    expect(screen.getByText(/Cross-Scriptural Links/i)).toBeInTheDocument();
    expect(screen.getByText(/Explore interconnected verses based on shared philosophical concepts/i)).toBeInTheDocument();
  });

  it('renders associated Tattvas and cross-scriptural link for kena-upanishad 1.1', () => {
    render(<SemanticExplorerDrawer {...defaultProps} />);

    // Kena Upanishad 1.1 is a primary source for 'Brahman'
    expect(screen.getByRole('heading', { name: /Brahman/i })).toBeInTheDocument();
    expect(screen.getByText(/theology/i)).toBeInTheDocument();

    // Should display linked verse links (e.g. Isha Upanishad 1.1 or Gita 8.3)
    expect(screen.getAllByText(/Ch. 1, Verse 1/i)[0]).toBeInTheDocument();
  });

  it('calls onClose when clicking backdrop', () => {
    render(<SemanticExplorerDrawer {...defaultProps} />);

    // Backdrop element
    const backdrop = document.querySelector('.bg-black\\/50');
    expect(backdrop).not.toBeNull();
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    }
  });

  it('calls onClose when clicking close button', () => {
    render(<SemanticExplorerDrawer {...defaultProps} />);

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('displays empty state message when no links match current verse', () => {
    render(<SemanticExplorerDrawer {...defaultProps} textSlug="unknown-slug" chapter={99} verse={99} />);

    expect(screen.getByText(/No semantic links found for this verse yet/i)).toBeInTheDocument();
  });
});
