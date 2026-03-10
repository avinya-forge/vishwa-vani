-- ==========================================
-- TASK [305]: configure row level security for user edits
-- ==========================================

-- Enable Row Level Security (RLS) for comments if not already enabled
alter table public.comments enable row level security;

-- Drop policies if they exist to allow idempotency
drop policy if exists "Users can update their own comments" on public.comments;
drop policy if exists "Users can delete their own comments" on public.comments;

-- Create Policies for Comments UPDATE commands
create policy "Users can update their own comments"
on public.comments for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Create Policies for Comments DELETE commands
create policy "Users can delete their own comments"
on public.comments for delete
using (auth.uid() = user_id);

-- NOTE: The "posts" table was not found in the schema, thus no policies
-- are being created for it here. See docs/DOUBTS.md for more details.
