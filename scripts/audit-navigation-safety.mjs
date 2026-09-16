import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const read=(p)=>fs.readFileSync(path.join(root,p),'utf8');
const errors=[];
const bridge=read('scripts/legacy-navigation-bridge.js');
const html=read('public/legacy/index.html');

for(const forbidden of ['fetch(', "api('", 'api("', "gs('", 'gs("', 'google.script.run', 'callLegacy(', 'createClient(']){
  if(bridge.includes(forbidden))errors.push(`navigation bridge must not call backend/business APIs: found ${forbidden}`);
}
for(const required of [
  "window.renderPage=async function(page)",
  "window.addEventListener('popstate'",
  "window.modal=function(title,body,foot,wide)",
  "window.closeModal=function()",
  "window.renderMemberProfile=async function(memberId)",
  "window.renderLedger=async function(memberId)",
  "window.toggleSidebarMode=function()",
  'modalIsDirty',
  'history.back()',
  'history.forward()',
  'ND_HISTORY_NAV'
]) if(!bridge.includes(required)) errors.push(`navigation safety marker missing: ${required}`);

if(!html.includes('id="ndHistoryBridge"'))errors.push('generated legacy HTML missing ndHistoryBridge');
if(html.indexOf('id="ndHistoryBridge"')<html.indexOf('id="ndUiReady"'))errors.push('history bridge must load after original UI modules');
if(!html.includes('id="ndVercelBridge"'))errors.push('Vercel API bridge missing');

const pkg=JSON.parse(read('package.json'));
if(pkg.scripts?.['audit:navigation']!=='node scripts/audit-navigation-safety.mjs')errors.push('audit:navigation package script missing');

if(errors.length){console.error('NAVIGATION SAFETY AUDIT FAILED\n- '+errors.join('\n- '));process.exit(1);}
console.log('NAVIGATION SAFETY OK: history bridge is UI-only (no backend/API calls); original page/detail/modal/mobile-sidebar navigation is history-aware; unsaved modal Back confirmation present; bridge loads after original v1.1.6 UI.');
