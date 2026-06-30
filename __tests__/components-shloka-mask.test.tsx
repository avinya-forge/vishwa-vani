import { render } from '@testing-library/react';
import ShlokaMask from '@/components/shloka/shloka-mask';
import '@testing-library/jest-dom';

describe('ShlokaMask Component', () => {
  beforeAll(() => {
    // Mock getContext for canvas
    HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
      measureText: jest.fn(() => ({ width: 100 })),
      fillText: jest.fn(),
      fillRect: jest.fn(),
      scale: jest.fn(),
      font: '',
      fillStyle: '',
      clearRect: jest.fn(),
    })) as unknown as (contextId: string, options?: unknown) => RenderingContext | null;
  });

  it('renders a canvas element', () => {
    render(<ShlokaMask text="धृतराष्ट्र उवाच" />);

    // We can check if the canvas exists by its test ID or general role,
    // but the component might not have a testid, so let's find by role or class
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('provides a copy button', () => {
    render(<ShlokaMask text="धृतराष्ट्र उवाच" />);

    // Check for the copy icon SVG or button
    const copyButton = document.querySelector('button');
    expect(copyButton).toBeInTheDocument();
  });
});
