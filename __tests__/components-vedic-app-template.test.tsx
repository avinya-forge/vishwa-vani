import React from 'react';
import { render, screen } from '@testing-library/react';
import VedicAppTemplate from '@/components/lab/vedic-app-template';
import '@testing-library/jest-dom';

describe('VedicAppTemplate', () => {
  it('renders children correctly', () => {
    render(
      <VedicAppTemplate
        title="Test App"
        subtitle="Test description"
        icon="a"
      >
        <div data-testid="child-content">Child</div>
      </VedicAppTemplate>
    );
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  it('displays the title and description', () => {
    render(
      <VedicAppTemplate
        title="My Title"
        subtitle="My Description"
        icon="b"
      >
        <div>Content</div>
      </VedicAppTemplate>
    );
    expect(screen.getByText('My Title')).toBeInTheDocument();
    expect(screen.getByText('My Description')).toBeInTheDocument();
  });
});
