import { render, fireEvent, screen } from '@testing-library/react';
import ReadingProgress from '@/components/shloka/reading-progress';
import '@testing-library/jest-dom';

describe('ReadingProgress Component', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('renders without crashing', () => {
        render(<ReadingProgress textSlug="gita" chapter={1} totalChapters={18} />);
        expect(screen.getByText('Mark Read')).toBeInTheDocument();
    });

    it('toggles complete state and saves to localStorage', () => {
        render(<ReadingProgress textSlug="gita" chapter={1} totalChapters={18} />);

        const completeBtn = screen.getByText('Mark Read');
        fireEvent.click(completeBtn);

        expect(screen.getByText('✓ Read')).toBeInTheDocument();

        const stored = JSON.parse(localStorage.getItem('vishwa_reading_progress') || '{}');
        expect(stored.gita).toContain(1);
    });

    it('toggles bookmark state and saves to localStorage', () => {
        render(<ReadingProgress textSlug="gita" chapter={1} totalChapters={18} chapterName="Chapter 1" />);

        const buttons = document.querySelectorAll('button');
        const bookmarkBtn = buttons[1]; // The second button is Bookmark

        fireEvent.click(bookmarkBtn);

        const stored = JSON.parse(localStorage.getItem('vishwa_bookmarks') || '[]');
        expect(stored.length).toBe(1);
        expect(stored[0].textSlug).toBe('gita');
    });
});
