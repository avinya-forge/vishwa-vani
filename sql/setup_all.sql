-- ==========================================
-- VISHWA-VANI COMPLETE SETUP (Schema + Seed)
-- ==========================================

-- 1. CLEANUP (Drop existing if they exist to avoid conflicts)
drop table if exists public.shlokas;
drop table if exists public.dictionary;
drop table if exists public.posts;

-- 2. SCHEMA SETUP
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Posts Table
create table public.posts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.posts enable row level security;
create policy "Allow public read access on posts" on public.posts for select to anon using (true);
create policy "Authenticated users can create posts" on public.posts for insert to authenticated with check (auth.uid() = user_id);
create policy "Users can update their own posts" on public.posts for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can delete their own posts" on public.posts for delete using (auth.uid() = user_id);

-- Dictionary Table
create table public.dictionary (
  id uuid default uuid_generate_v4() primary key,
  root_word text not null,
  meaning_en text,
  meaning_hi text,
  meaning_mr text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Shloka Table
create table public.shlokas (
  id uuid default uuid_generate_v4() primary key,
  deity text not null,
  source_text text not null,
  verse_index integer not null,
  sanskrit_text text not null,
  word_mapping jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies
alter table public.dictionary enable row level security;
alter table public.shlokas enable row level security;

create policy "Allow public read access on dictionary" on public.dictionary for select to anon using (true);
create policy "Allow public read access on shlokas" on public.shlokas for select to anon using (true);


-- 3. SEED DATA (Insert foundational content)
DO $$ 
DECLARE 
    id_om uuid; 
    id_namaste uuid; 
    id_gp uuid; 
    id_tv uuid; 
    id_pr uuid; 
    id_tt uuid;
BEGIN

    -- Dictionary Inserts
    INSERT INTO public.dictionary (root_word, meaning_en, meaning_hi, meaning_mr, metadata) VALUES 
      ('Aum', 'The primal sound', 'Brahm', 'Onkar', '{"type": "mystic_syllable"}') RETURNING id INTO id_om;

    INSERT INTO public.dictionary (root_word, meaning_en, meaning_hi, meaning_mr, metadata) VALUES 
      ('Namaste', 'Salutations to you', 'Namaskar', 'Namaskar', '{"grammar": "compound"}') RETURNING id INTO id_namaste;

    INSERT INTO public.dictionary (root_word, meaning_en, meaning_hi, meaning_mr, metadata) VALUES 
      ('Ganapataye', 'To Ganapati', 'Ganapati ko', 'Ganapatila', '{"case": "dative", "gender": "masculine"}') RETURNING id INTO id_gp;

    INSERT INTO public.dictionary (root_word, meaning_en, meaning_hi, meaning_mr, metadata) VALUES 
      ('Twameva', 'You alone', 'Tum hi', 'Tu ch', '{"sandhi": "tvam + eva"}') RETURNING id INTO id_tv;

    INSERT INTO public.dictionary (root_word, meaning_en, meaning_hi, meaning_mr, metadata) VALUES 
      ('Pratyaksham', 'Perceptible/Visible', 'Pratyaksh', 'Pratyaksh', '{"adj": "qualifier"}') RETURNING id INTO id_pr;

    INSERT INTO public.dictionary (root_word, meaning_en, meaning_hi, meaning_mr, metadata) VALUES 
      ('Tattvamasi', 'You are that essence', 'Woh tatva tum ho', 'Te tatva tu ahes', '{"philosophy": "advaita"}') RETURNING id INTO id_tt;


    -- Shloka Insert
    INSERT INTO public.shlokas (deity, source_text, verse_index, sanskrit_text, word_mapping) VALUES (
      'Ganesha',
      'Ganapati Atharvashirsha',
      1,
      'Cm Namaste Ganapataye. Twameva Pratyaksham Tattvamasi.',
      jsonb_build_array(
        jsonb_build_object('original_word', 'Cm', 'word_id_ref', id_om),
        jsonb_build_object('original_word', 'Namaste', 'word_id_ref', id_namaste),
        jsonb_build_object('original_word', 'Ganapataye', 'word_id_ref', id_gp),
        jsonb_build_object('original_word', 'Twameva', 'word_id_ref', id_tv),
        jsonb_build_object('original_word', 'Pratyaksham', 'word_id_ref', id_pr),
        jsonb_build_object('original_word', 'Tattvamasi', 'word_id_ref', id_tt)
      )
    );

END $$;

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

-- ==========================================
-- FULL TEXT SEARCH (FTS) EXTENSION & INDEXES
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
