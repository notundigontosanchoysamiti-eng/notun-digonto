import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const source=fs.readFileSync(new URL('./legacy-navigation-bridge.js',import.meta.url),'utf8');

function classList(initial=[]){
  const s=new Set(initial);
  return {contains:x=>s.has(x),add:x=>s.add(x),remove:x=>s.delete(x),toggle(x){s.has(x)?s.delete(x):s.add(x)},_s:s};
}

const listeners={};
const modalRoot={children:[],_controls:[],querySelectorAll(){return this._controls;}};
const sidebar={classList:classList()};
const loginView={classList:classList(['hidden'])};
const document={
  readyState:'complete',
  documentElement:{scrollTop:0},
  getElementById(id){return {modalRoot,sidebar,loginView}[id]||null;},
  addEventListener(type,fn){(listeners[type]??=[]).push(fn);}
};

const historyListeners=[];
const history={
  stack:[null],index:0,
  get state(){return this.stack[this.index]},
  replaceState(s){this.stack[this.index]=structuredClone(s)},
  pushState(s){this.stack=this.stack.slice(0,this.index+1);this.stack.push(structuredClone(s));this.index++},
  back(){if(this.index<=0)return;this.index--;queueMicrotask(()=>historyListeners.forEach(fn=>fn({state:this.state})))},
  forward(){if(this.index>=this.stack.length-1)return;this.index++;queueMicrotask(()=>historyListeners.forEach(fn=>fn({state:this.state})))},
};

const calls=[];
const ND={session:{userId:'u1'},currentPage:'dashboard',lang:'bn'};
const windowObj={
  innerWidth:1200,
  scrollY:0,
  scrollTo(){},
  _confirmResult:true,_confirmCount:0,
  confirm(){this._confirmCount++;return this._confirmResult;},
  addEventListener(type,fn){if(type==='popstate')historyListeners.push(fn);else (listeners[type]??=[]).push(fn);},
  renderPage:async(page)=>{ND.currentPage=page;calls.push(['page',page]);return true;},
  modal:(title)=>{modalRoot.children=[{}];modalRoot._controls=[{disabled:false,readOnly:false,type:'text',value:'',checked:false,isConnected:true}];calls.push(['modal',title]);},
  closeModal:()=>{modalRoot.children=[];modalRoot._controls=[];calls.push(['closeModal']);},
  showLogin:()=>{loginView.classList.remove('hidden');calls.push(['login']);},
  renderMemberProfile:async(id)=>{calls.push(['profile',id]);},
  renderLedger:async(id)=>{calls.push(['ledger',id]);},
  toggleSidebarMode:()=>{sidebar.classList.toggle('open');calls.push(['sidebarToggle']);},
  setActiveNav:()=>{}
};

const context={
  window:windowObj,document,history,location:{href:'https://app.example/legacy/index.html'},ND,
  console,setTimeout,clearTimeout,queueMicrotask,structuredClone,Map,Array,Object,String,Number,JSON,Math,Date,
  requestAnimationFrame:(fn)=>{fn();return 1;},
};
windowObj.window=windowObj;
vm.createContext(context);
vm.runInContext(source,context,{filename:'legacy-navigation-bridge.js'});

assert.equal(windowObj.ND_HISTORY_NAV.version,'1.0.0');
assert.equal(history.state.kind,'page');
assert.equal(history.state.page,'dashboard');

await windowObj.renderPage('members');
assert.equal(history.state.kind,'page');
assert.equal(history.state.page,'members');
assert.equal(history.stack.length,2);

await windowObj.renderMemberProfile('M-1');
assert.equal(history.state.kind,'member-profile');
assert.equal(history.state.memberId,'M-1');
assert.equal(history.stack.length,3);

history.back();
await new Promise(r=>setTimeout(r,5));
assert.equal(history.state.kind,'page');
assert.equal(history.state.page,'members');
assert.ok(calls.some(x=>x[0]==='page'&&x[1]==='members'));

windowObj.modal('Edit Member','','',false);
assert.equal(history.state.kind,'modal');
assert.equal(modalRoot.children.length,1);
modalRoot._controls[0].value='changed';
windowObj._confirmResult=false;
history.back();
await new Promise(r=>setTimeout(r,10));
assert.equal(history.state.kind,'modal');
assert.equal(modalRoot.children.length,1);
assert.ok(windowObj._confirmCount>=1);
windowObj._confirmResult=true;
history.back();
await new Promise(r=>setTimeout(r,10));
assert.equal(modalRoot.children.length,0);
assert.equal(history.state.kind,'page');

// Programmatic close followed by a same-page refresh must not create a duplicate page-navigation step.
windowObj.modal('Savings','','',false);
assert.equal(history.state.kind,'modal');
windowObj.closeModal();
await windowObj.renderPage(ND.currentPage);
await new Promise(r=>setTimeout(r,10));
assert.equal(history.state.kind,'page');
assert.equal(history.state.page,ND.currentPage);

windowObj.innerWidth=500;
windowObj.toggleSidebarMode();
assert.equal(sidebar.classList.contains('open'),true);
assert.equal(history.state.kind,'sidebar');
history.back();
await new Promise(r=>setTimeout(r,5));
assert.equal(sidebar.classList.contains('open'),false);
assert.equal(history.state.kind,'page');

console.log('NAVIGATION BRIDGE TEST OK: page, member-detail, dirty-modal confirmation, programmatic modal close, and mobile-sidebar Back flows passed.');
