import { NextRequest } from 'next/server';
import { callLegacy } from '@/lib/legacy-call';

export const runtime='nodejs';
export const dynamic='force-dynamic';

export async function POST(req:NextRequest){
  try{
    const body=await req.json();
    const fn=String(body?.fn||'');
    const args=Array.isArray(body?.args)?body.args:[];
    const result=await callLegacy(fn,args);
    return Response.json({ok:true,result},{status:200,headers:{'cache-control':'no-store'}});
  }catch(e:any){
    console.error('[legacy-api]',e);
    const message=e?.message||String(e||'Unknown error');
    const status=message.includes('AUTH_REQUIRED')||message.includes('AUTH_EXPIRED')?401:message.includes('PERMISSION_DENIED')||message.includes('FORBIDDEN')?403:400;
    return Response.json({ok:false,error:message},{status,headers:{'cache-control':'no-store'}});
  }
}
