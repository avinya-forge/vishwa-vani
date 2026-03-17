import { toggleReaction } from './reactions'
import { createClient } from '@/utils/supabase/server'

jest.mock('@/utils/supabase/server', () => ({
  createClient: jest.fn(),
}))

describe('toggleReaction', () => {
  let mockSupabase: any

  beforeEach(() => {
    jest.clearAllMocks()

    mockSupabase = {
      auth: {
        getUser: jest.fn(),
      },
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn(),
      insert: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
    }

    ;(createClient as jest.Mock).mockResolvedValue(mockSupabase)
  })

  it('should return error if user is not authenticated', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: null } })

    const result = await toggleReaction('entity-123', 'UPVOTE')

    expect(result).toEqual({ error: 'You must be logged in to react' })
    expect(mockSupabase.from).not.toHaveBeenCalled()
  })

  it('should handle fetch error', async () => {
    const mockUser = { id: 'user-123' }

    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: mockUser }
    })

    mockSupabase.single.mockResolvedValue({
      data: null,
      error: { code: '500', message: 'DB Error' }
    })

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    const result = await toggleReaction('entity-123', 'UPVOTE')

    expect(result).toEqual({ error: 'Failed to check reaction status' })

    consoleSpy.mockRestore()
  })

  it('should insert a new reaction if it does not exist', async () => {
    const mockUser = { id: 'user-123' }
    const mockReactionData = {
      id: 'reaction-123',
      entity_id: 'entity-123',
      user_id: mockUser.id,
      reaction_type: 'UPVOTE',
    }

    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: mockUser }
    })

    // Mock fetch returning no rows (PGRST116)
    mockSupabase.single.mockResolvedValueOnce({
      data: null,
      error: { code: 'PGRST116' }
    })

    // Mock insert
    mockSupabase.single.mockResolvedValueOnce({
      data: mockReactionData,
      error: null
    })

    const result = await toggleReaction('entity-123', 'UPVOTE')

    expect(result).toEqual({ success: true, action: 'inserted', data: mockReactionData })

    // It should check first
    expect(mockSupabase.from).toHaveBeenNthCalledWith(1, 'reactions')
    expect(mockSupabase.select).toHaveBeenCalledWith('id')
    expect(mockSupabase.eq).toHaveBeenCalledWith('entity_id', 'entity-123')
    expect(mockSupabase.eq).toHaveBeenCalledWith('user_id', mockUser.id)
    expect(mockSupabase.eq).toHaveBeenCalledWith('reaction_type', 'UPVOTE')

    // Then it should insert
    expect(mockSupabase.from).toHaveBeenNthCalledWith(2, 'reactions')
    expect(mockSupabase.insert).toHaveBeenCalledWith({
      entity_id: 'entity-123',
      user_id: mockUser.id,
      reaction_type: 'UPVOTE',
    })
  })

  it('should delete an existing reaction if it already exists', async () => {
    const mockUser = { id: 'user-123' }
    const mockReactionData = {
      id: 'reaction-123',
      entity_id: 'entity-123',
      user_id: mockUser.id,
      reaction_type: 'UPVOTE',
    }

    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: mockUser }
    })

    // Mock fetch returning an existing reaction
    mockSupabase.single.mockResolvedValueOnce({
      data: { id: mockReactionData.id },
      error: null
    })

    // Mock delete
    mockSupabase.delete.mockReturnThis()
    // Mock eq returns mockSupabase for fetch, then returns {error: null} for delete
    mockSupabase.eq
      .mockReturnValueOnce(mockSupabase)
      .mockReturnValueOnce(mockSupabase)
      .mockReturnValueOnce(mockSupabase)
      .mockReturnValueOnce({ error: null })

    const result = await toggleReaction('entity-123', 'UPVOTE')

    expect(result).toEqual({ success: true, action: 'deleted' })

    // It should check first
    expect(mockSupabase.from).toHaveBeenNthCalledWith(1, 'reactions')

    // Then it should delete
    expect(mockSupabase.from).toHaveBeenNthCalledWith(2, 'reactions')
    expect(mockSupabase.delete).toHaveBeenCalled()
    // Need to check the last call to eq since we mockReturnThis
    expect(mockSupabase.eq).toHaveBeenCalledWith('id', mockReactionData.id)
  })

  it('should handle insert error', async () => {
    const mockUser = { id: 'user-123' }

    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: mockUser }
    })

    // Mock fetch returning no rows (PGRST116)
    mockSupabase.single.mockResolvedValueOnce({
      data: null,
      error: { code: 'PGRST116' }
    })

    // Mock insert error
    mockSupabase.single.mockResolvedValueOnce({
      data: null,
      error: new Error('Insert Error')
    })

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    const result = await toggleReaction('entity-123', 'UPVOTE')

    expect(result).toEqual({ error: 'Failed to add reaction' })

    consoleSpy.mockRestore()
  })

  it('should handle delete error', async () => {
    const mockUser = { id: 'user-123' }
    const mockReactionData = { id: 'reaction-123' }

    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: mockUser }
    })

    // Mock fetch returning an existing reaction
    mockSupabase.single.mockResolvedValueOnce({
      data: { id: mockReactionData.id },
      error: null
    })

    // Mock delete error. Since we chain `.eq('id', existingReaction.id)`, we mock `eq`'s return value
    mockSupabase.delete.mockReturnThis()
    mockSupabase.eq
      .mockReturnValueOnce(mockSupabase) // 1st eq in fetch
      .mockReturnValueOnce(mockSupabase) // 2nd eq in fetch
      .mockReturnValueOnce(mockSupabase) // 3rd eq in fetch
      .mockReturnValueOnce({ error: new Error('Delete Error') }) // 4th eq in delete

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    const result = await toggleReaction('entity-123', 'UPVOTE')

    expect(result).toEqual({ error: 'Failed to remove reaction' })

    consoleSpy.mockRestore()
  })
})
