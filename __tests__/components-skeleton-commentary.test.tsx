import React from 'react';
import { render } from '@testing-library/react';
import CommentarySkeleton from '@/components/ui/skeleton-commentary';
import '@testing-library/jest-dom';

describe('CommentarySkeleton', () => {
    it('renders with default class', () => {
        const { container } = render(<CommentarySkeleton />);
        expect(container.firstChild).toHaveClass('animate-pulse');
    });
});
