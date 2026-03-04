import { getCommentsByShlokaId } from '../comments';
import { createClient } from '@/utils/supabase/server';

jest.mock('@/utils/supabase/server', () => ({
  createClient: jest.fn(),
}));

describe('Comment Service', () => {
  let mockSupabase: any;

  beforeEach(() => {
    jest.clearAllMocks();

    mockSupabase = {
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
    };

    (createClient as jest.Mock).mockResolvedValue(mockSupabase);
  });

  describe('getCommentsByShlokaId', () => {
    it('returns a list of comments for a given shloka ID', async () => {
      const mockComments = [
        { id: '1', content: 'Test comment 1', shloka_id: 'shloka-1' },
        { id: '2', content: 'Test comment 2', shloka_id: 'shloka-1' },
      ];

      mockSupabase.order.mockResolvedValue({ data: mockComments, error: null });

      const result = await getCommentsByShlokaId('shloka-1');

      expect(mockSupabase.from).toHaveBeenCalledWith('comments');
      expect(mockSupabase.select).toHaveBeenCalledWith('*');
      expect(mockSupabase.eq).toHaveBeenCalledWith('shloka_id', 'shloka-1');
      expect(mockSupabase.order).toHaveBeenCalledWith('created_at', { ascending: true });
      expect(result).toEqual(mockComments);
    });

    it('returns an empty array and logs an error when Supabase returns an error', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const mockError = { message: 'Supabase error' };

      mockSupabase.order.mockResolvedValue({ data: null, error: mockError });

      const result = await getCommentsByShlokaId('shloka-1');

      expect(mockSupabase.from).toHaveBeenCalledWith('comments');
      expect(result).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching comments for shloka shloka-1:', mockError);

      consoleErrorSpy.mockRestore();
    });

    it('returns empty array when data is null but no error', async () => {
      mockSupabase.order.mockResolvedValue({ data: null, error: null });

      const result = await getCommentsByShlokaId('shloka-1');

      expect(result).toEqual([]);
    });
  });
});
