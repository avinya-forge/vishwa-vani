-- ==========================================
-- VISHWA-VANI COMPLETE SETUP (Schema + Seed)
-- ==========================================

-- 1. CLEANUP (Drop existing if they exist to avoid conflicts)
drop table if exists public.shlokas;
drop table if exists public.dictionary;

-- 2. SCHEMA SETUP
-- Enable UUID extension
create extension if not exists "uuid-ossp";

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

-- 4. COLLECTIONS SCHEMA
-- Collections Table: Folders for saved items
create table public.collections (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  name text not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Saved Items Table: Items within a collection
create table public.saved_items (
  id uuid default uuid_generate_v4() primary key,
  collection_id uuid references public.collections(id) on delete cascade not null,
  item_type text not null check (item_type in ('shloka', 'dictionary')),
  item_id uuid not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (collection_id, item_type, item_id)
);

-- Enable Row Level Security (RLS)
alter table public.collections enable row level security;
alter table public.saved_items enable row level security;

-- Create Policies for User Access (Collections)
create policy "Users can view their own collections"
on public.collections for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert their own collections"
on public.collections for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update their own collections"
on public.collections for update
to authenticated
using (auth.uid() = user_id);

create policy "Users can delete their own collections"
on public.collections for delete
to authenticated
using (auth.uid() = user_id);

-- Create Policies for User Access (Saved Items)
create policy "Users can view their own saved items"
on public.saved_items for select
to authenticated
using (
  exists (
    select 1 from public.collections
    where collections.id = saved_items.collection_id
    and collections.user_id = auth.uid()
  )
);

create policy "Users can insert their own saved items"
on public.saved_items for insert
to authenticated
with check (
  exists (
    select 1 from public.collections
    where collections.id = collection_id
    and collections.user_id = auth.uid()
  )
);

create policy "Users can delete their own saved items"
on public.saved_items for delete
to authenticated
using (
  exists (
    select 1 from public.collections
    where collections.id = saved_items.collection_id
    and collections.user_id = auth.uid()
  )
);
