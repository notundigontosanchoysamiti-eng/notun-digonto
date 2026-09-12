import { NextRequest } from 'next/server';
import { createHash } from 'node:crypto';
import { serviceSupabase } from './supabase';

export type AuthContext = {authUid:string;sessionId:string;userId:string;username:string;fullName:string;roleId:string;memberId:string;permissions:string[]};
const hash=(token:string)=>createHash('sha256').update(token).digest('hex');
export async function authContext(req:NextRequest):Promise<AuthContext>{
  const token=req.headers.get('authorization')?.replace(/^Bearer\s+/i,'');if(!token)throw new Error('UNAUTHORIZED');
  const sb=serviceSupabase(),now=new Date().toISOString();
  const {data:sess,error:se}=await sb.from('sessions').select('*').eq('token_hash',hash(token)).eq('status','ACTIVE').maybeSingle();
  if(se||!sess)throw new Error('UNAUTHORIZED');if(!sess.expires_at||new Date(sess.expires_at).getTime()<=Date.now()){await sb.from('sessions').update({status:'EXPIRED',last_seen_at:now}).eq('session_id',sess.session_id);throw new Error('UNAUTHORIZED')}
  const {data:u,error:ue}=await sb.from('users').select('user_id,auth_uid,username,full_name,role_id,member_id,status').eq('user_id',sess.user_id).single();if(ue||!u||u.status!=='ACTIVE')throw new Error('UNAUTHORIZED');
  const {data:r}=await sb.from('roles').select('permissions_json,status').eq('role_id',u.role_id).single();if(!r||r.status!=='ACTIVE')throw new Error('FORBIDDEN');
  await sb.from('sessions').update({last_seen_at:now}).eq('session_id',sess.session_id);
  return {authUid:u.auth_uid||'',sessionId:sess.session_id,userId:u.user_id,username:u.username,fullName:u.full_name,roleId:u.role_id,memberId:u.member_id||'',permissions:Array.isArray(r.permissions_json)?r.permissions_json:[]};
}
export function can(c:AuthContext,p:string){return c.permissions.includes('*')||c.permissions.includes(p)}
export function requirePermission(c:AuthContext,p:string){if(!can(c,p))throw new Error('FORBIDDEN')}
export const sessionTokenHash=hash;
