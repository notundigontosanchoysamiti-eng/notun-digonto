import {NextRequest} from 'next/server';import {authContext} from '@/lib/auth';import {serviceSupabase} from '@/lib/supabase';import {ok} from '@/lib/http';
export async function POST(req:NextRequest){try{const c=await authContext(req);await serviceSupabase().from('sessions').update({status:'REVOKED',last_seen_at:new Date().toISOString()}).eq('session_id',c.sessionId)}catch{}return ok({ok:true})}
