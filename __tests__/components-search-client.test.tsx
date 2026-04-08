import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchClient from '@/components/search/search-client';

// ─── Mocks ────────────────────────────────────────────────────────────────────

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

jest.mock('@/lib/lake', () => ({
  searchLake: jest.fn(),
}));

import { searchLake } from '@/lib/lake';
const mockSearchLake = searchLake as jest.Mock;

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const mockGitaResult = {
  textSlug: 'bhagavad-gita',
  chapter: 2,
  verse: 47,
  slok: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन',
  transliteration: 'karmaṇy-evādhikāras te mā phaleṣu kadācana',
};

const mockMbhResult = {
  textSlug: 'mahabharata',
  chapter: 1,
  verse: 1,
  slok: 'नारायणं नमस्कृत्य',
  transliteration: 'nārāyaṇaṃ namaskṛtya',
};

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('SearchClient', () => {

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    mockSearchLake.mockResolvedValue([]);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // ── Render ──────────────────────────────────────────────────────────────────

  it('renders the search input', () => {
    render(<SearchClient />);
    expect(screen.getByPlaceholderText(/Search verses/i)).toBeInTheDocument();
  });

  it('renders top-concept shortcut buttons', () => {
    render(<SearchClient />);
    expect(screen.getByRole('button', { name: /Karma/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Dharma/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Yoga/i })).toBeInTheDocument();
  });

  it('renders category filter tabs', () => {
    render(<SearchClient />);
    expect(screen.getByRole('button', { name: /All Scriptures/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Itihas/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Upanishad/i })).toBeInTheDocument();
  });

  it('shows empty-state prompt on initial render', () => {
    render(<SearchClient />);
    expect(screen.getByText(/Begin your journey/i)).toBeInTheDocument();
  });

  // ── Debounced search ────────────────────────────────────────────────────────

  it('does not search for queries shorter than 3 characters', async () => {
    render(<SearchClient />);
    fireEvent.change(screen.getByPlaceholderText(/Search verses/i), { target: { value: 'ab' } });
    jest.advanceTimersByTime(500);
    expect(mockSearchLake).not.toHaveBeenCalled();
  });

  it('triggers searchLake after debounce for queries 3+ chars', async () => {
    mockSearchLake.mockResolvedValue([mockGitaResult]);
    render(<SearchClient />);
    fireEvent.change(screen.getByPlaceholderText(/Search verses/i), { target: { value: 'karma' } });
    jest.advanceTimersByTime(450);
    await waitFor(() => expect(mockSearchLake).toHaveBeenCalledWith('karma'));
  });

  it('displays search results when found', async () => {
    mockSearchLake.mockResolvedValue([mockGitaResult]);
    render(<SearchClient />);
    fireEvent.change(screen.getByPlaceholderText(/Search verses/i), { target: { value: 'karma' } });
    jest.advanceTimersByTime(450);
    await waitFor(() => {
      expect(screen.getByText('कर्मण्येवाधिकारस्ते मा फलेषु कदाचन')).toBeInTheDocument();
    });
  });

  it('displays chapter and verse metadata in results', async () => {
    mockSearchLake.mockResolvedValue([mockGitaResult]);
    render(<SearchClient />);
    fireEvent.change(screen.getByPlaceholderText(/Search verses/i), { target: { value: 'karma' } });
    jest.advanceTimersByTime(450);
    await waitFor(() => {
      expect(screen.getByText(/Chapter 2 · Verse 47/i)).toBeInTheDocument();
    });
  });

  it('clears results when query is shortened below 3 chars', async () => {
    mockSearchLake.mockResolvedValue([mockGitaResult]);
    render(<SearchClient />);
    const input = screen.getByPlaceholderText(/Search verses/i);

    fireEvent.change(input, { target: { value: 'karma' } });
    jest.advanceTimersByTime(450);
    await waitFor(() => expect(screen.getByText('कर्मण्येवाधिकारस्ते मा फलेषु कदाचन')).toBeInTheDocument());

    fireEvent.change(input, { target: { value: 'ka' } });
    jest.advanceTimersByTime(450);
    await waitFor(() => expect(screen.queryByText('कर्मण्येवाधिकारस्ते मा फलेषु कदाचन')).not.toBeInTheDocument());
  });

  it('shows no-results state when search returns empty array', async () => {
    mockSearchLake.mockResolvedValue([]);
    render(<SearchClient />);
    fireEvent.change(screen.getByPlaceholderText(/Search verses/i), { target: { value: 'xyznotfound' } });
    jest.advanceTimersByTime(450);
    await waitFor(() => {
      expect(screen.getByText(/No fragments found/i)).toBeInTheDocument();
    });
  });

  it('handles search error gracefully without crash', async () => {
    mockSearchLake.mockRejectedValue(new Error('Lake offline'));
    render(<SearchClient />);
    fireEvent.change(screen.getByPlaceholderText(/Search verses/i), { target: { value: 'dharma' } });
    jest.advanceTimersByTime(450);
    // Should not throw — error is caught and logged
    await waitFor(() => expect(mockSearchLake).toHaveBeenCalled());
  });

  // ── Concept shortcuts ────────────────────────────────────────────────────────

  it('clicking a concept button sets the query', async () => {
    render(<SearchClient />);
    fireEvent.click(screen.getByRole('button', { name: /Karma/i }));
    const input = screen.getByPlaceholderText(/Search verses/i) as HTMLInputElement;
    expect(input.value).toBe('karma');
  });

  // ── Category filter ──────────────────────────────────────────────────────────

  it('filters results by category tab', async () => {
    mockSearchLake.mockResolvedValue([mockGitaResult, mockMbhResult]);
    render(<SearchClient />);
    const input = screen.getByPlaceholderText(/Search verses/i);
    fireEvent.change(input, { target: { value: 'dharma' } });
    jest.advanceTimersByTime(450);
    await waitFor(() => expect(screen.getByText('कर्मण्येवाधिकारस्ते मा फलेषु कदाचन')).toBeInTheDocument());

    // Switch to Upanishad tab — both results are itihas so neither should show
    fireEvent.click(screen.getByRole('button', { name: /Upanishad/i }));
    await waitFor(() => {
      expect(screen.queryByText('कर्मण्येवाधिकारस्ते मा फलेषु कदाचन')).not.toBeInTheDocument();
    });
  });

  it('shows all results when "All Scriptures" tab is active', async () => {
    mockSearchLake.mockResolvedValue([mockGitaResult, mockMbhResult]);
    render(<SearchClient />);
    fireEvent.change(screen.getByPlaceholderText(/Search verses/i), { target: { value: 'dharma' } });
    jest.advanceTimersByTime(450);
    await waitFor(() => {
      expect(screen.getByText('कर्मण्येवाधिकारस्ते मा फलेषु कदाचन')).toBeInTheDocument();
      expect(screen.getByText('नारायणं नमस्कृत्य')).toBeInTheDocument();
    });
  });
});
