import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '../components/theme-toggle';
import { useTheme } from 'next-themes';
import '@testing-library/jest-dom';

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}));

describe('ThemeToggle Component', () => {
  const mockSetTheme = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock implementation
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
    });

    // Mock window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders a placeholder when not mounted', () => {
    // Prevent useEffect from setting mounted to true
    jest.spyOn(React, 'useEffect').mockImplementationOnce(() => {});

    render(<ThemeToggle />);

    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toHaveClass('opacity-50');
    expect(button).not.toHaveTextContent('☀️');
    expect(button).not.toHaveTextContent('🌙');
  });

  it('renders the moon icon when the theme is light', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
    });

    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toHaveTextContent('🌙');
    expect(button).not.toHaveClass('opacity-50');
  });

  it('renders the sun icon when the theme is dark', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
    });

    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toHaveTextContent('☀️');
    expect(button).not.toHaveClass('opacity-50');
  });

  it('toggles from light to dark when clicked', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
    });

    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /toggle theme/i });

    fireEvent.click(button);
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('toggles from dark to light when clicked', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
    });

    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /toggle theme/i });

    fireEvent.click(button);
    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it('handles system theme correctly when system prefers dark mode', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'system',
      setTheme: mockSetTheme,
    });

    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(<ThemeToggle />);

    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toHaveTextContent('☀️');

    fireEvent.click(button);
    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it('handles system theme correctly when system prefers light mode', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'system',
      setTheme: mockSetTheme,
    });

    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(<ThemeToggle />);

    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toHaveTextContent('🌙');

    fireEvent.click(button);
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });
});
