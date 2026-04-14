import '@testing-library/jest-dom';
// Mock IntersectionObserver globally
class IntersectionObserverMock {
  callback: (...args: unknown[]) => unknown;
  constructor(callback: (...args: unknown[]) => unknown) {
    this.callback = callback;
  }
  observe = jest.fn((el) => {
    // simulate intersection immediately
    if (el && el.id && el.id === 'verse-1') {
      setTimeout(() => {
        this.callback([{ isIntersecting: true, target: el }]);
      }, 0);
    }
  })
  disconnect = jest.fn()
  unobserve = jest.fn()
}
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock
})
