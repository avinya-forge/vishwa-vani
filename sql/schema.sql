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
