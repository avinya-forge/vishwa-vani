import { getUserCollections, createCollection, saveItemToCollection, removeItemFromCollection } from './collections';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

// Mock dependencies
jest.mock('@/utils/supabase/server', () => ({
  createClient: jest.fn(),
}));

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

describe('Collection Server Actions', () => {
  let mockSupabase: any;

  beforeEach(() => {
    jest.clearAllMocks();

    mockSupabase = {
      auth: {
        getUser: jest.fn().mockResolvedValue({
          data: { user: { id: 'user-123' } },
          error: null,
        }),
      },
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      single: jest.fn().mockReturnThis(),
    };

    (createClient as jest.Mock).mockResolvedValue(mockSupabase);
  });

  describe('getUserCollections', () => {
    it('returns collections for an authenticated user', async () => {
      const mockCollections = [{ id: 'col-1', name: 'My Collection' }];
      mockSupabase.order.mockResolvedValue({ data: mockCollections, error: null });

      const result = await getUserCollections();

      expect(mockSupabase.from).toHaveBeenCalledWith('collections');
      expect(mockSupabase.select).toHaveBeenCalledWith('*');
      expect(mockSupabase.eq).toHaveBeenCalledWith('user_id', 'user-123');
      expect(result).toEqual({ data: mockCollections, error: null });
    });

    it('returns an error if user is not authenticated', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: null },
        error: { message: 'Not authenticated' },
      });

      const result = await getUserCollections();

      expect(result).toEqual({ data: null, error: 'Not authenticated' });
    });
  });

  describe('createCollection', () => {
    it('creates a new collection and revalidates path', async () => {
      const newCollection = { id: 'col-2', name: 'New Col', description: 'Desc' };
      mockSupabase.single.mockResolvedValue({ data: newCollection, error: null });

      const result = await createCollection('New Col', 'Desc');

      expect(mockSupabase.from).toHaveBeenCalledWith('collections');
      expect(mockSupabase.insert).toHaveBeenCalledWith([{ name: 'New Col', description: 'Desc', user_id: 'user-123' }]);
      expect(revalidatePath).toHaveBeenCalledWith('/collections');
      expect(result).toEqual({ data: newCollection, error: null });
    });
  });

  describe('saveItemToCollection', () => {
    it('saves an item and revalidates path', async () => {
      const savedItem = { id: 'item-1', collection_id: 'col-1', item_type: 'shloka', item_id: 'shloka-1' };

      // Mock collection check
      mockSupabase.single.mockResolvedValueOnce({ data: { id: 'col-1' }, error: null });
      // Mock insert
      mockSupabase.single.mockResolvedValueOnce({ data: savedItem, error: null });

      const result = await saveItemToCollection('col-1', 'shloka', 'shloka-1');

      expect(mockSupabase.from).toHaveBeenCalledWith('saved_items');
      expect(mockSupabase.insert).toHaveBeenCalledWith([{ collection_id: 'col-1', item_type: 'shloka', item_id: 'shloka-1' }]);
      expect(revalidatePath).toHaveBeenCalledWith('/collections/col-1');
      expect(result).toEqual({ data: savedItem, error: null });
    });

    it('fails if collection check fails', async () => {
      // Mock collection check failure
      mockSupabase.single.mockResolvedValueOnce({ data: null, error: { message: 'Not found' } });

      const result = await saveItemToCollection('col-1', 'shloka', 'shloka-1');

      expect(result).toEqual({ data: null, error: 'Collection not found or access denied' });
    });
  });

  describe('removeItemFromCollection', () => {
    it('removes an item and revalidates path', async () => {
      mockSupabase.eq.mockResolvedValue({ error: null });

      const result = await removeItemFromCollection('item-1', 'col-1');

      expect(mockSupabase.from).toHaveBeenCalledWith('saved_items');
      expect(mockSupabase.delete).toHaveBeenCalled();
      expect(mockSupabase.eq).toHaveBeenCalledWith('id', 'item-1');
      expect(revalidatePath).toHaveBeenCalledWith('/collections/col-1');
      expect(result).toEqual({ data: null, error: null });
    });
  });
});