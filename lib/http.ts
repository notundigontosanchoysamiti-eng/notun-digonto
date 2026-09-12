import { NextResponse } from 'next/server';

export function ok(data: unknown, status = 200) { return NextResponse.json(data, { status }); }
export function fail(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  if (message === 'UNAUTHORIZED') return NextResponse.json({ ok:false, error:'Unauthorized' }, { status:401 });
  if (message === 'FORBIDDEN') return NextResponse.json({ ok:false, error:'Permission denied' }, { status:403 });
  return NextResponse.json({ ok:false, error:message }, { status:400 });
}
