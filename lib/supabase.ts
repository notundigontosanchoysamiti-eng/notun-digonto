import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export function publicSupabase() {
  if (!url || !anon) throw new Error('Supabase public environment variables are missing.');
  return createClient(url, anon, { auth: { persistSession: false, autoRefreshToken: false } });
}

export function serviceSupabase() {
  if (!url || !service) throw new Error('Supabase service environment variables are missing.');
  return createClient(url, service, { auth: { persistSession: false, autoRefreshToken: false } });
}

export function browserSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}
