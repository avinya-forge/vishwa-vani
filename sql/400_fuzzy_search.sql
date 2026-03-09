-- ==========================================
-- FUZZY SEARCH EXTENSION & INDEXES
-- ==========================================

-- Enable pg_trgm extension for fuzzy matching
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Create GiST indexes for similarity matching on dictionary text columns
CREATE INDEX IF NOT EXISTS trgm_idx_dict_root_word ON public.dictionary USING gist (root_word gist_trgm_ops);
CREATE INDEX IF NOT EXISTS trgm_idx_dict_meaning_en ON public.dictionary USING gist (meaning_en gist_trgm_ops);
CREATE INDEX IF NOT EXISTS trgm_idx_dict_meaning_hi ON public.dictionary USING gist (meaning_hi gist_trgm_ops);
CREATE INDEX IF NOT EXISTS trgm_idx_dict_meaning_mr ON public.dictionary USING gist (meaning_mr gist_trgm_ops);

-- Create the search_words_fuzzy function
CREATE OR REPLACE FUNCTION public.search_words_fuzzy(query_text text, language_code text DEFAULT NULL)
RETURNS SETOF public.dictionary
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM public.dictionary
  WHERE
    -- If query is empty, return all (handled by application layer, but safe to do here)
    query_text = '' OR query_text IS NULL
    OR
    -- Check similarity and ILIKE depending on language code
    (
      (language_code IS NULL OR language_code = 'all') AND (
        root_word % query_text OR root_word ILIKE '%' || query_text || '%' OR
        meaning_en % query_text OR meaning_en ILIKE '%' || query_text || '%' OR
        meaning_hi % query_text OR meaning_hi ILIKE '%' || query_text || '%' OR
        meaning_mr % query_text OR meaning_mr ILIKE '%' || query_text || '%'
      )
    )
    OR
    (language_code = 'en' AND (meaning_en % query_text OR meaning_en ILIKE '%' || query_text || '%'))
    OR
    (language_code = 'hi' AND (meaning_hi % query_text OR meaning_hi ILIKE '%' || query_text || '%'))
    OR
    (language_code = 'mr' AND (meaning_mr % query_text OR meaning_mr ILIKE '%' || query_text || '%'))
  ORDER BY
    -- Order by greatest similarity across relevant columns
    GREATEST(
      CASE WHEN language_code IS NULL OR language_code = 'all' THEN similarity(root_word, query_text) ELSE 0 END,
      CASE WHEN language_code IS NULL OR language_code = 'all' OR language_code = 'en' THEN similarity(meaning_en, query_text) ELSE 0 END,
      CASE WHEN language_code IS NULL OR language_code = 'all' OR language_code = 'hi' THEN similarity(meaning_hi, query_text) ELSE 0 END,
      CASE WHEN language_code IS NULL OR language_code = 'all' OR language_code = 'mr' THEN similarity(meaning_mr, query_text) ELSE 0 END
    ) DESC
  LIMIT 20;
END;
$$;
