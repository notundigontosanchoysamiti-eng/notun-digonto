(function(){
  'use strict';

  var NAV_KEY='__ndHistoryV1';
  var installed=false;
  var restoring=false;
  var pageRenderDepth=0;
  var activeState=null;
  var cancelReturn=false;
  var programmaticModalClosePending=false;
  var modalSeq=0;
  var modalSpecs=new Map();
  var modalSnapshots=new Map();

  function hasFn(name){return typeof window[name]==='function';}
  if(!hasFn('renderPage')||!hasFn('modal')||!hasFn('closeModal'))return;

  var originalRenderPage=window.renderPage;
  var originalModal=window.modal;
  var originalCloseModal=window.closeModal;
  var originalShowLogin=hasFn('showLogin')?window.showLogin:null;
  var originalRenderMemberProfile=hasFn('renderMemberProfile')?window.renderMemberProfile:null;
  var originalRenderLedger=hasFn('renderLedger')?window.renderLedger:null;
  var originalToggleSidebar=hasFn('toggleSidebarMode')?window.toggleSidebarMode:null;

  function isNavState(state){return !!(state&&state[NAV_KEY]===1);}
  function currentPage(){try{return (typeof ND!=='undefined'&&ND.currentPage)||'dashboard';}catch(e){return 'dashboard';}}
  function appHasSession(){try{return !!(typeof ND!=='undefined'&&ND.session);}catch(e){return false;}}
  function pageState(page){return {[NAV_KEY]:1,kind:'page',page:page||currentPage(),scrollY:0};}
  function loginState(){return {[NAV_KEY]:1,kind:'login',scrollY:0};}
  function copyState(state){try{return JSON.parse(JSON.stringify(state));}catch(e){return state;}}

  function ensureState(){
    var state=history.state;
    if(isNavState(state)){activeState=state;return state;}
    var login=document.getElementById('loginView');
    var initial=(login&&!login.classList.contains('hidden')&&!appHasSession())?loginState():pageState(currentPage());
    history.replaceState(initial,'',location.href);
    activeState=initial;
    return initial;
  }

  function rememberScroll(){
    var state=ensureState();
    if(!isNavState(state)||state.kind==='modal'||state.kind==='sidebar')return state;
    var next=Object.assign({},state,{scrollY:window.scrollY||document.documentElement.scrollTop||0});
    history.replaceState(next,'',location.href);
    activeState=next;
    return next;
  }

  function laterScroll(y){
    var top=Number(y||0);
    requestAnimationFrame(function(){requestAnimationFrame(function(){try{window.scrollTo({top:top,left:0,behavior:'auto'});}catch(e){window.scrollTo(0,top);}});});
  }

  function sameView(a,b){
    if(!isNavState(a)||!isNavState(b)||a.kind!==b.kind)return false;
    if(a.kind==='page')return a.page===b.page;
    if(a.kind==='member-profile')return a.memberId===b.memberId&&a.page===b.page;
    if(a.kind==='member-ledger')return a.memberId===b.memberId&&a.page===b.page;
    if(a.kind==='login')return true;
    return false;
  }

  function baseStateForOverlay(state){
    if(state&&state.kind==='modal'&&isNavState(state.base))return state.base;
    if(state&&state.kind==='sidebar'&&isNavState(state.base))return state.base;
    return isNavState(state)?state:pageState(currentPage());
  }

  function replaceActive(state){history.replaceState(state,'',location.href);activeState=state;}
  function pushActive(state){history.pushState(state,'',location.href);activeState=state;}

  function normalizeOverlayBeforeNavigation(){
    var state=ensureState();
    if(state.kind==='modal'||state.kind==='sidebar'){
      var base=baseStateForOverlay(state);
      replaceActive(base);
      programmaticModalClosePending=false;
      var sb=document.getElementById('sidebar');
      if(sb)sb.classList.remove('open');
      if(document.getElementById('modalRoot')?.children.length)originalCloseModal();
      return base;
    }
    return state;
  }

  async function callOriginalPage(page){
    pageRenderDepth++;
    try{return await originalRenderPage(page);}finally{pageRenderDepth=Math.max(0,pageRenderDepth-1);}
  }

  window.renderPage=async function(page){
    if(restoring)return callOriginalPage(page);
    var pending=ensureState();
    if(programmaticModalClosePending&&pending.kind==='modal'&&String(page||'')===String(currentPage()||''))return callOriginalPage(page);
    var before=rememberScroll();
    before=normalizeOverlayBeforeNavigation();
    var result=await callOriginalPage(page);
    if(result===false)return false;
    var target=pageState(page);
    if(before.kind==='login'){
      replaceActive(target);
      laterScroll(0);
    }else if(sameView(before,target)){
      target.scrollY=before.scrollY||0;
      replaceActive(target);
    }else{
      pushActive(target);
      laterScroll(0);
    }
    return result;
  };

  if(originalRenderMemberProfile){
    window.renderMemberProfile=async function(memberId){
      if(restoring||pageRenderDepth>0||programmaticModalClosePending)return originalRenderMemberProfile(memberId);
      var before=rememberScroll();
      before=normalizeOverlayBeforeNavigation();
      var result=await originalRenderMemberProfile(memberId);
      var target={[NAV_KEY]:1,kind:'member-profile',page:currentPage(),memberId:String(memberId||''),scrollY:0};
      if(sameView(before,target))replaceActive(target);else pushActive(target);
      laterScroll(0);
      return result;
    };
  }

  if(originalRenderLedger){
    window.renderLedger=async function(memberId){
      if(restoring||pageRenderDepth>0||programmaticModalClosePending)return originalRenderLedger(memberId);
      var before=rememberScroll();
      before=normalizeOverlayBeforeNavigation();
      var result=await originalRenderLedger(memberId);
      if(!memberId)return result;
      var target={[NAV_KEY]:1,kind:'member-ledger',page:currentPage(),memberId:String(memberId||''),scrollY:0};
      if(sameView(before,target))replaceActive(target);else pushActive(target);
      laterScroll(0);
      return result;
    };
  }

  function editableControls(){
    var root=document.getElementById('modalRoot');
    if(!root)return [];
    return Array.from(root.querySelectorAll('input,select,textarea')).filter(function(el){
      return !el.disabled&&!el.readOnly&&String(el.type||'').toLowerCase()!=='hidden';
    });
  }

  function takeModalSnapshot(token){
    var rows=editableControls().map(function(el){
      var type=String(el.type||'').toLowerCase();
      if(type==='file')return {el:el,type:type,count:el.files?el.files.length:0};
      if(type==='checkbox'||type==='radio')return {el:el,type:type,checked:!!el.checked};
      return {el:el,type:type,value:String(el.value??'')};
    });
    modalSnapshots.set(token,rows);
  }

  function modalIsDirty(token){
    var rows=modalSnapshots.get(token)||[];
    return rows.some(function(s){
      if(!s.el||!s.el.isConnected)return false;
      if(s.type==='file')return (s.el.files?s.el.files.length:0)!==s.count;
      if(s.type==='checkbox'||s.type==='radio')return !!s.el.checked!==s.checked;
      return String(s.el.value??'')!==s.value;
    });
  }

  function unsavedModalMessage(){
    try{return (typeof ND!=='undefined'&&ND.lang==='en')
      ?'This form has unsaved changes. Going back will discard them. Continue?'
      :'এই ফর্মে সংরক্ষণ না করা পরিবর্তন আছে। ফিরে গেলে পরিবর্তনগুলো হারাবে। ফিরে যেতে চান?';
    }catch(e){return 'এই ফর্মে সংরক্ষণ না করা পরিবর্তন আছে। ফিরে গেলে পরিবর্তনগুলো হারাবে। ফিরে যেতে চান?';}
  }

  window.modal=function(title,body,foot,wide){
    var args=[title,body,foot,wide];
    var result=originalModal.apply(this,args);
    if(restoring)return result;
    var before=ensureState();
    var token='ndm_'+(++modalSeq)+'_'+Date.now();
    modalSpecs.set(token,args);
    var base=before.kind==='modal'?baseStateForOverlay(before):before;
    var state={[NAV_KEY]:1,kind:'modal',token:token,base:copyState(base)};
    if(before.kind==='modal')replaceActive(state);else{rememberScroll();pushActive(state);}
    programmaticModalClosePending=false;
    requestAnimationFrame(function(){takeModalSnapshot(token);});
    return result;
  };

  window.closeModal=function(){
    var before=ensureState();
    var result=originalCloseModal.apply(this,arguments);
    if(restoring)return result;
    if(before.kind==='modal'){
      programmaticModalClosePending=true;
      var token=before.token;
      modalSpecs.delete(token);
      modalSnapshots.delete(token);
      setTimeout(function(){
        if(activeState&&activeState.kind==='modal'&&activeState.token===token){
          var root=document.getElementById('modalRoot');
          if(!root||!root.children.length)history.back();
        }
      },0);
    }
    return result;
  };

  if(originalToggleSidebar){
    window.toggleSidebarMode=function(){
      var mobile=window.innerWidth<980;
      var before=ensureState();
      var result=originalToggleSidebar.apply(this,arguments);
      if(!mobile||restoring)return result;
      var sb=document.getElementById('sidebar');
      var open=!!(sb&&sb.classList.contains('open'));
      if(open){
        before=rememberScroll();
        var state={[NAV_KEY]:1,kind:'sidebar',base:copyState(before)};
        if(before.kind==='sidebar')replaceActive(state);else pushActive(state);
      }else if(before.kind==='sidebar'){
        setTimeout(function(){if(activeState&&activeState.kind==='sidebar')history.back();},0);
      }
      return result;
    };
  }

  if(originalShowLogin){
    window.showLogin=function(){
      var result=originalShowLogin.apply(this,arguments);
      if(!restoring){replaceActive(loginState());}
      return result;
    };
  }

  async function restoreDescriptor(state){
    if(!isNavState(state))return true;
    if(state.kind!=='login'&&!appHasSession()){
      if(originalShowLogin)originalShowLogin();
      replaceActive(loginState());
      return true;
    }
    if(state.kind==='login'){
      if(originalShowLogin)originalShowLogin();
      return true;
    }
    if(state.kind==='page'){
      var ok=await callOriginalPage(state.page||'dashboard');
      if(ok!==false)laterScroll(state.scrollY||0);
      return ok;
    }
    if(state.kind==='member-profile'&&originalRenderMemberProfile){
      try{if(typeof ND!=='undefined')ND.currentPage=state.page||'members';}catch(e){}
      if(hasFn('setActiveNav'))window.setActiveNav(state.page||'members');
      await originalRenderMemberProfile(state.memberId);
      laterScroll(state.scrollY||0);
      return true;
    }
    if(state.kind==='member-ledger'&&originalRenderLedger){
      try{if(typeof ND!=='undefined')ND.currentPage=state.page||'members';}catch(e){}
      if(hasFn('setActiveNav'))window.setActiveNav(state.page||'members');
      await originalRenderLedger(state.memberId);
      laterScroll(state.scrollY||0);
      return true;
    }
    if(state.kind==='modal'){
      var spec=modalSpecs.get(state.token);
      if(spec){originalModal.apply(window,spec);requestAnimationFrame(function(){takeModalSnapshot(state.token);});}
      return true;
    }
    if(state.kind==='sidebar'){
      var sb=document.getElementById('sidebar');
      if(sb&&window.innerWidth<980)sb.classList.add('open');
      return true;
    }
    return true;
  }

  window.addEventListener('popstate',async function(e){
    var target=isNavState(e.state)?e.state:null;
    var from=activeState;

    if(cancelReturn){
      cancelReturn=false;
      activeState=target||from;
      return;
    }

    if(!target){activeState=null;return;}

    if(from&&from.kind==='modal'&&target.kind!=='modal'){
      var root=document.getElementById('modalRoot');
      var modalOpen=!!(root&&root.children.length);
      if(modalOpen&&!programmaticModalClosePending&&modalIsDirty(from.token)){
        if(!window.confirm(unsavedModalMessage())){
          cancelReturn=true;
          setTimeout(function(){history.forward();},0);
          return;
        }
      }
      originalCloseModal();
      modalSnapshots.delete(from.token);
      programmaticModalClosePending=false;
      activeState=target;
      if(from.base&&sameView(target,from.base)){laterScroll(target.scrollY||0);return;}
    }

    if(from&&from.kind==='sidebar'&&target.kind!=='sidebar'){
      var side=document.getElementById('sidebar');
      if(side)side.classList.remove('open');
      activeState=target;
      if(from.base&&sameView(target,from.base)){laterScroll(target.scrollY||0);return;}
    }

    var previous=from;
    activeState=target;
    restoring=true;
    try{
      var ok=await restoreDescriptor(target);
      if(ok===false&&previous&&isNavState(previous)){
        activeState=previous;
        cancelReturn=true;
        setTimeout(function(){history.forward();},0);
      }
    }catch(err){
      console.error('[ND history restore]',err);
      try{if(typeof toast==='function')toast(err&&err.message?err.message:String(err),'error');}catch(e2){}
    }finally{restoring=false;programmaticModalClosePending=false;}
  });

  function initialize(){
    if(installed)return;
    installed=true;
    ensureState();
    window.ND_HISTORY_NAV={version:'1.0.0',getState:function(){return activeState;}};
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initialize,{once:true});else initialize();
})();
