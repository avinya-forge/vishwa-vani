import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import FeedbackWidget from '../components/ui/feedback-widget'

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ issueUrl: 'https://github.com/vishwa-vani/issues/1' }),
  })
) as jest.Mock

describe('FeedbackWidget', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the floating button', () => {
    render(<FeedbackWidget />)
    const button = screen.getByRole('button', { name: /Report an issue/i })
    expect(button).toBeInTheDocument()
  })

  it('opens the modal when the button is clicked', () => {
    render(<FeedbackWidget />)
    const button = screen.getByRole('button', { name: /Report an issue/i })
    fireEvent.click(button)
    expect(screen.getAllByText('Feedback')[0]).toBeInTheDocument()
  })

  it('shows error if message is less than 50 characters', async () => {
    render(<FeedbackWidget />)
    fireEvent.click(screen.getByRole('button', { name: /Report an issue/i }))

    const textarea = screen.getByPlaceholderText(/describe the issue/i)
    fireEvent.change(textarea, { target: { value: 'Too short' } })

    const submitBtn = screen.getByRole('button', { name: /submit/i })
    fireEvent.click(submitBtn)

    expect(await screen.findByText(/at least 50 characters/i)).toBeInTheDocument()
  })

  it('submits successfully and shows confirmation', async () => {
    render(<FeedbackWidget />)
    fireEvent.click(screen.getByRole('button', { name: /Report an issue/i }))

    const longMessage = 'A'.repeat(201);
    const textarea = screen.getByPlaceholderText(/describe the issue/i)
    fireEvent.change(textarea, { target: { value: longMessage } })

    const submitBtn = screen.getByRole('button', { name: /submit/i })
    fireEvent.click(submitBtn)

    await waitFor(() => {
      expect(screen.getByText(/Your feedback has been submitted successfully/i)).toBeInTheDocument()
    })
  })
})
