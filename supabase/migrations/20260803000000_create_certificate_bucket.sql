insert into storage.buckets (id, name, public) values ('certificate-documents', 'certificate-documents', true) on conflict (id) do nothing;
create policy "Allow authenticated uploads to certificate-documents" on storage.objects for insert to authenticated with check (bucket_id = 'certificate-documents');
create policy "Allow authenticated viewing of certificate-documents" on storage.objects for select to authenticated using (bucket_id = 'certificate-documents');
