import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd(), read=p=>fs.readFileSync(path.join(root,p),'utf8');
const errors=[], notes=[];
const schema=read('supabase/migrations/001_schema.sql');
const fix=read('supabase/migrations/009_functional_parity_fixes.sql');
const backend=read('lib/legacy-call.ts');
const original=read('legacy_reference/Code.gs');
const ui=read('public/legacy/index.html');
const must=(ok,msg)=>{if(!ok)errors.push(msg)};

// Original source remains the authority.
must(original.includes("LAND_SIZE:p.landSize||''"),'Original investment LAND_SIZE text semantic marker missing');
must(original.includes("ALLOCATION_METHOD:method"),'Original expense allocation method semantic marker missing');
must(original.includes("BANK_CHARGE:'BANK_CHARGE_EXPENSE'"),'Original expense category->COA mapping marker missing');
must(original.includes("Math.abs(allocation.percentageTotal-100)>0.009"),'Original unit allocation 100% reconciliation marker missing');

// v5 fixes.
must(/land_size\s+text\s+not null default ''/.test(schema),'Fresh schema LAND_SIZE must be text');
must(fix.includes('public.nd_number_text'),'Apps Script-compatible numeric conversion helper missing');
must(fix.includes("coalesce(p_payload->>'landSize','')"),'Investment LAND_SIZE text preservation missing');
must(fix.includes("public.nd_number_text(p_payload->>'ownershipPercent')"),'Blank optional ownershipPercent fix missing');
must(fix.includes("when 'BANK_CHARGE' then 'BANK_CHARGE_EXPENSE'"),'Normal expense BANK_CHARGE mapping missing');
must(fix.includes("when 'LEGAL' then 'LEGAL_EXPENSE'"),'Normal expense LEGAL mapping missing');
must(fix.includes("when 'OTHER' then 'OTHER_EXPENSE'"),'Normal expense OTHER mapping missing');
must(fix.includes("'NORMAL',0,0,0"),'Normal expense must persist ALLOCATION_METHOD=NORMAL');
must(fix.includes("abs(public.nd_number_text(preview->>'percentageTotal')-100)>0.009"),'Unit expense exact 100% check missing');
must(fix.includes('public.nd_create_income')&&fix.includes('public.nd_create_profit_record_core'),'Atomic distributable-income/profit fix missing');
must(backend.includes('expenseAllocationMethod'),'Legacy allocation-method normalizer missing');
must(backend.includes("clean.documentFileId=uploaded.path"),'Expense attachment pre-upload/atomic link fix missing');
must(backend.includes("up.expected_end_date=dateOnly(p.expectedEndDate)||null"),'Investment blank expected-end-date edit fix missing');
must(backend.includes("up.ownership_percent=num(p.ownershipPercent)"),'Investment blank ownership edit fix missing');

// Surface parity remains intact.
const uiCalls=new Set([...ui.matchAll(/\b(?:api|gs)\(\s*['"]([A-Za-z0-9_]+)['"]/g)].map(m=>m[1]));uiCalls.add('loginAndBootstrap');
const declared=new Set([...backend.matchAll(/^async function\s+([A-Za-z0-9_]+)\s*\(/gm)].map(m=>m[1]));
for(const f of uiCalls)must(declared.has(f),`Missing backend UI function: ${f}`);
must(uiCalls.size===105,`Expected 105 UI calls, found ${uiCalls.size}`);

// Remaining casts are reported, not automatically treated as defects: most are required/defaulted UI fields.
for(const file of fs.readdirSync(path.join(root,'supabase/migrations')).filter(x=>x.endsWith('.sql'))){
  const text=read('supabase/migrations/'+file);
  const hits=[...text.matchAll(/\(p_payload->>'([^']+)'\)::(numeric|integer|boolean)/g)].map(m=>`${m[1]}::${m[2]}`);
  if(hits.length)notes.push(`${file}: ${[...new Set(hits)].join(', ')}`);
}
if(errors.length){console.error('FUNCTIONAL PARITY AUDIT FAILED\n- '+errors.join('\n- '));process.exit(1)}
console.log(`FUNCTIONAL PARITY AUDIT OK: ${uiCalls.size}/105 UI calls still wired; confirmed Investment + Income/Expense + Unit-Based parity fixes present.`);
console.log('Remaining direct payload casts to exercise in live regression (required/defaulted fields in most cases):');
for(const n of notes)console.log('  '+n);
