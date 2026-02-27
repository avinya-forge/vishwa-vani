-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Dictionary Table: The Source of Truth for words
create table public.dictionary (
  id uuid default uuid_generate_v4() primary key,
  root_word text not null,
  meaning_en text,
  meaning_hi text,
  meaning_mr text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Shloka Table: The Content
create table public.shlokas (
  id uuid default uuid_generate_v4() primary key,
  deity text not null, -- e.g. "Ganesha"
  source_text text not null, -- e.g. "Ganapati Atharvashirsha"
  verse_index integer not null,
  sanskrit_text text not null,
  word_mapping jsonb default '[]'::jsonb, -- Array of {word_id_ref, original_word}
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.dictionary enable row level security;
alter table public.shlokas enable row level security;

-- Create Policies for Public Read Access
create policy "Allow public read access on dictionary"
on public.dictionary for select
to anon
using (true);

create policy "Allow public read access on shlokas"
on public.shlokas for select
to anon
using (true);
