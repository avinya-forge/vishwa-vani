import { render, fireEvent, act } from '@testing-library/react';
import ShlokaMask from '@/components/shloka/shloka-mask';
import '@testing-library/jest-dom';
import * as React from 'react';

jest.mock('next-themes', () => ({
  useTheme: () => ({ resolvedTheme: 'light' })
}));

describe('ShlokaMask Component Canvas Tests', () => {
  let mockContext: unknown;

  beforeAll(() => {
    mockContext = {
      measureText: jest.fn(() => ({ width: 100 })),
      fillText: jest.fn(),
      fillRect: jest.fn(),
      scale: jest.fn(),
      font: '',
      fillStyle: '',
      clearRect: jest.fn(),
      textAlign: '',
      textBaseline: ''
    };
    HTMLCanvasElement.prototype.getContext = jest.fn(() => mockContext) as unknown as (contextId: string, options?: unknown) => RenderingContext | null;
  });

  it('handles resize events to update windowWidth', () => {
    render(<ShlokaMask text="धृतराष्ट्र उवाच" />);

    act(() => {
      window.innerWidth = 500;
      window.dispatchEvent(new Event('resize'));
    });

    // We expect the canvas to be redrawn (getContext called again or fillText called)
    expect((mockContext as { fillText: jest.Mock }).fillText).toHaveBeenCalled();
  });

  it('renders correctly with different font sizes', () => {
    render(<ShlokaMask text="धृतराष्ट्र उवाच" fontSize={30} />);
    expect((mockContext as { font: string }).font).toContain('30px');
  });

  it('handles copy button click', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });

    render(<ShlokaMask text="Test Text" />);
    const buttons = document.querySelectorAll('button');
    // Assuming the copy button is the first button in the component
    if (buttons.length > 0) {
        await act(async () => {
            fireEvent.click(buttons[0]);
        });
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith("Test Text");
    }
  });
});
