-- Server-only storage buckets replacing Google Drive folders from the Apps Script build.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values
('member-photos','member-photos',false,5242880,array['image/jpeg','image/png','image/webp']),
('documents','documents',false,15728640,null),
('backups','backups',false,104857600,array['application/gzip','application/json'])
on conflict (id) do nothing;
create unique index if not exists uq_users_username on public.users(username);
