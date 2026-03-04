import { addComment } from './comments'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

jest.mock('@/utils/supabase/server', () => ({
  createClient: jest.fn(),
}))

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}))

describe('addComment', () => {
  let mockSupabase: any

  beforeEach(() => {
    jest.clearAllMocks()

    mockSupabase = {
      auth: {
        getUser: jest.fn(),
      },
      from: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn(),
    }

    ;(createClient as jest.Mock).mockResolvedValue(mockSupabase)
  })

  it('should return error if user is not authenticated', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: null } })

    const formData = new FormData()
    formData.append('content', 'Test comment')

    const result = await addComment('shloka-123', formData)

    expect(result).toEqual({ error: 'You must be logged in to comment' })
    expect(mockSupabase.from).not.toHaveBeenCalled()
    expect(revalidatePath).not.toHaveBeenCalled()
  })

  it('should return error if content is empty', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: { id: 'user-123' } }
    })

    const formData = new FormData()
    formData.append('content', '   ')

    const result = await addComment('shloka-123', formData)

    expect(result).toEqual({ error: 'Comment cannot be empty' })
    expect(mockSupabase.from).not.toHaveBeenCalled()
    expect(revalidatePath).not.toHaveBeenCalled()
  })

  it('should successfully add a comment', async () => {
    const mockUser = { id: 'user-123' }
    const mockCommentData = {
      id: 'comment-123',
      shloka_id: 'shloka-123',
      user_id: mockUser.id,
      content: 'Test comment',
    }

    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: mockUser }
    })

    mockSupabase.single.mockResolvedValue({
      data: mockCommentData,
      error: null
    })

    const formData = new FormData()
    formData.append('content', 'Test comment')

    const result = await addComment('shloka-123', formData)

    expect(result).toEqual({ success: true, data: mockCommentData })

    expect(mockSupabase.from).toHaveBeenCalledWith('comments')
    expect(mockSupabase.insert).toHaveBeenCalledWith({
      shloka_id: 'shloka-123',
      user_id: mockUser.id,
      content: 'Test comment',
    })
    expect(revalidatePath).toHaveBeenCalledWith('/shlokas/shloka-123')
  })

  it('should handle database error', async () => {
    const mockUser = { id: 'user-123' }

    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: mockUser }
    })

    mockSupabase.single.mockResolvedValue({
      data: null,
      error: new Error('DB Error')
    })

    const formData = new FormData()
    formData.append('content', 'Test comment')

    // Silence console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    const result = await addComment('shloka-123', formData)

    expect(result).toEqual({ error: 'Failed to add comment' })
    expect(revalidatePath).not.toHaveBeenCalled()

    consoleSpy.mockRestore()
  })
})
