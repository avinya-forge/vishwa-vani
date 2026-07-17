import React from 'react';
import { render } from '@testing-library/react';
import VerseSkeleton from '@/components/ui/skeleton-verse';
import '@testing-library/jest-dom';

describe('VerseSkeleton', () => {
    it('renders with default class', () => {
        const { container } = render(<VerseSkeleton />);
        expect(container.firstChild).toHaveClass('animate-pulse');
    });
});
