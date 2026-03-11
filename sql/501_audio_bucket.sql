-- ==========================================
-- TASK [501]: setup supabase storage bucket audio_files
-- ==========================================

-- Insert the bucket 'audio_files' if it doesn't already exist
insert into storage.buckets (id, name, public)
values ('audio_files', 'audio_files', true)
on conflict (id) do nothing;

-- Ensure RLS is enabled on storage.objects
alter table storage.objects enable row level security;

-- Drop existing policies to be idempotent
drop policy if exists "Allow public read access on audio_files" on storage.objects;
drop policy if exists "Admin insert access for audio_files" on storage.objects;
drop policy if exists "Admin update access for audio_files" on storage.objects;
drop policy if exists "Admin delete access for audio_files" on storage.objects;

-- Create policy allowing public read access
create policy "Allow public read access on audio_files"
on storage.objects for select
using (bucket_id = 'audio_files');

-- Create policy allowing authenticated admins to insert
create policy "Admin insert access for audio_files"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'audio_files' AND
  (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);

-- Create policy allowing authenticated admins to update
create policy "Admin update access for audio_files"
on storage.objects for update
to authenticated
using (
  bucket_id = 'audio_files' AND
  (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
)
with check (
  bucket_id = 'audio_files' AND
  (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);

-- Create policy allowing authenticated admins to delete
create policy "Admin delete access for audio_files"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'audio_files' AND
  (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);
