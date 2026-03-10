-- ==========================================
-- TASK [401]: SETUP POSTGRES FULL TEXT SEARCH
-- ==========================================

-- Add a tsvector column for generic stemming
ALTER TABLE public.dictionary
ADD COLUMN IF NOT EXISTS fts_vector tsvector
GENERATED ALWAYS AS (
  to_tsvector('english', coalesce(root_word, '') || ' ' || coalesce(meaning_en, '') || ' ' || coalesce(meaning_hi, '') || ' ' || coalesce(meaning_mr, ''))
) STORED;

-- Create an index for faster FTS queries
CREATE INDEX IF NOT EXISTS fts_idx_dictionary ON public.dictionary USING GIN (fts_vector);

-- Create a search function that queries against a tsquery
CREATE OR REPLACE FUNCTION public.search_words_fts(query_text text)
RETURNS SETOF public.dictionary
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM public.dictionary
  WHERE fts_vector @@ plainto_tsquery('english', query_text)
  ORDER BY ts_rank(fts_vector, plainto_tsquery('english', query_text)) DESC
  LIMIT 20;
END;
$$;
