import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(path.join(root,p))).digest('hex');
let errors=[];
const expectedHashes={
  'legacy_reference/Code.gs':'0c0d31bff94c2a8a6f69206a64bef04bd9726729c48395df8cdc0a72088e99a2',
  'legacy_reference/ui/AppCore.html':'7d94ca542d77e40994f94ed5ba5f3ccbf79584a3250175aefbbc9f7f96ae3419',
  'legacy_reference/ui/AuthCore.html':'6a4d6591a6e3a9272b6815473b57a499a5f9ecbe0a976d960ed280aeb095a49e',
  'legacy_reference/ui/Index.html':'453ab505f0b491f0d66f82abc1e49a1a062c6e0a911f4a5461df043330e3f494',
  'legacy_reference/ui/LogoData.html':'775662cfd6c426d51ed129c0aeceda90154f34af09025016a24d79c5e944aa7e',
  'legacy_reference/ui/Module1.html':'d825d3528549ee9b1441d32d77938076a7334dcfd4cff1982e01e18cc608085f',
  'legacy_reference/ui/Module2.html':'42461e2926cb14ea8338d488b263d2fffd0ad62ef2372d60983604c8f1528238',
  'legacy_reference/ui/Module3.html':'68e80bee9ed2895e69642edf04a256018f2bd3dcbf2b3b4370d6c5c4d4488a85',
  'legacy_reference/ui/Styles.html':'6b14436b4537497e598a8c2530e7be9cf616adf21282a8130785c8436c07bddd',
  'legacy_reference/ui/UiReady.html':'33ff5b93dd32d33546c8568dfd37e1c4e9ad25722243d3d1944999cc8d31fd8b'
};
for(const [file,want] of Object.entries(expectedHashes)){
  if(!fs.existsSync(path.join(root,file)))errors.push(`missing original source ${file}`);
  else if(hash(file)!==want)errors.push(`ORIGINAL SOURCE CHANGED: ${file}`);
}

const ui=read('public/legacy/index.html');
const original=read('legacy_reference/Code.gs');
const backend=read('lib/legacy-call.ts');
if(!ui.includes('id="ndVercelBridge"')||!ui.includes("fetch('/api/legacy'"))errors.push('Next.js bridge missing from exact legacy UI bundle');

const uiCalls=new Set([...ui.matchAll(/\b(?:api|gs)\(\s*['\"]([A-Za-z0-9_]+)['\"]/g)].map(m=>m[1]));
uiCalls.add('loginAndBootstrap');
const parseGs=s=>new Map([...s.matchAll(/^function\s+([A-Za-z0-9_]+)\s*\(([^)]*)\)/gm)].map(m=>[m[1],m[2].split(',').map(x=>x.trim()).filter(Boolean)]));
const parseTs=s=>new Map([...s.matchAll(/^async function\s+([A-Za-z0-9_]+)\s*\(([^)]*)\)/gm)].map(m=>[m[1],m[2].split(',').map(x=>x.trim()).filter(Boolean)]));
const og=parseGs(original), modern=parseTs(backend);
const dispatchBlock=(backend.match(/const LEGACY_CALLS:[\s\S]*?=\{([\s\S]*?)\n\};/)||[])[1]||'';
const dispatch=new Set([...dispatchBlock.matchAll(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g)].map(m=>m[1]));
for(const fn of [...uiCalls].sort()){
  if(!og.has(fn))errors.push(`UI function missing from original Code.gs: ${fn}`);
  if(!modern.has(fn))errors.push(`Modern implementation missing: ${fn}`);
  if(!dispatch.has(fn))errors.push(`Dispatcher mapping missing: ${fn}`);
  if(og.has(fn)&&modern.has(fn)&&og.get(fn).length!==modern.get(fn).length)errors.push(`Argument-count drift: ${fn} original=${og.get(fn).length} modern=${modern.get(fn).length}`);
}
if(uiCalls.size!==105)errors.push(`Expected 105 original UI RPC entry points, found ${uiCalls.size}`);

const requiredUiMarkers=[
  'নমিনি তথ্য','name="nomineeName"','name="nomineeRelation"','name="nomineeMobile"','name="nomineeNid"','name="nomineePercent"',
  "page==='investments'","renderInvestments()","renderProfitManagement()","renderFinance()","createIncome","createExpense","previewExpenseAllocation",
  'রিসিট ও ভাউচার','লোন ব্যবস্থাপনা','বিনিয়োগ','মুনাফা ব্যবস্থাপনা','হিসাব ও ফাইন্যান্স','সভা ও কমিটি','ডকুমেন্টস','রিপোর্টসমূহ','নোটিফিকেশন','ব্যবহারকারী ও পারমিশন','অডিট ও সংশোধন','ব্যাকআপ ও ডাটাবেজ','সেটিংস',
  'correctLoanPayment','reverseInvestmentReturn','reverseInvestmentClosure','cancelInvestment','reverseProfitDistribution','reverseProfitRecord','correctSavingsTransaction','editSavingsTransaction','correctFinancialTransaction'
];
for(const marker of requiredUiMarkers)if(!ui.includes(marker))errors.push(`Original feature surface missing from bundled UI: ${marker}`);

const advancedBackend=['reverseLoanDisbursement','editInvestmentReturn','reverseInvestmentClosure','cancelInvestment','reverseInvestmentReturn','reverseProfitDistribution','reverseProfitRecord','correctLoanPayment','correctFinancialTransaction','correctSavingsTransaction'];
for(const fn of advancedBackend){if(!og.has(fn))errors.push(`Advanced original business function missing from Code.gs: ${fn}`);if(!modern.has(fn))errors.push(`Advanced parity backend missing: ${fn}`);if(!dispatch.has(fn))errors.push(`Advanced parity dispatcher missing: ${fn}`);}

const schema=read('supabase/migrations/001_schema.sql');
const tables=[...schema.matchAll(/create table if not exists public\.(\w+)/g)].map(m=>m[1]);
if(tables.length!==39)errors.push(`Expected 39 legacy data tables, found ${tables.length}`);
for(const n of ['003_core_rules.sql','004_financial_rules.sql','005_investment_profit_rules.sql','006_parity_finance_rules.sql','008_parity_performance_permissions.sql']){
  if(!fs.existsSync(path.join(root,'supabase/migrations',n)))errors.push(`Missing rule migration: ${n}`);
}
if(errors.length){console.error('\nSTRICT PARITY CHECK FAILED\n- '+errors.join('\n- '));process.exit(1)}
console.log(`STRICT PARITY OK: original source hashes intact; ${uiCalls.size}/105 original UI server functions implemented with matching argument counts and dispatcher mappings; nominee/member + investment + income/expense + correction/reversal feature surfaces present; ${tables.length}/39 legacy tables mapped.`);
