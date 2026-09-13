import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const uiDir=path.join(root,'legacy_reference','ui');
const outDir=path.join(root,'public','legacy');
const bridge=`<script id="ndVercelBridge">
(function(){
  'use strict';
  function makeRunner(){
    var success=function(){}, failure=function(e){console.error(e)};
    var target={
      withSuccessHandler:function(fn){success=typeof fn==='function'?fn:success;return proxy},
      withFailureHandler:function(fn){failure=typeof fn==='function'?fn:failure;return proxy}
    };
    var proxy=new Proxy(target,{get:function(obj,prop){
      if(prop in obj)return obj[prop];
      return function(){
        var args=Array.prototype.slice.call(arguments);
        fetch('/api/legacy',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({fn:String(prop),args:args})})
          .then(async function(r){var j;try{j=await r.json()}catch(e){throw new Error('Server response invalid.')}if(!r.ok||!j.ok)throw new Error((j&&j.error)||('HTTP '+r.status));return j.result})
          .then(function(v){try{success(v)}catch(e){console.error(e)}})
          .catch(function(e){try{failure(e)}catch(x){console.error(x)}});
      }
    }});
    return proxy;
  }
  window.google=window.google||{};
  window.google.script=window.google.script||{};
  Object.defineProperty(window.google.script,'run',{configurable:true,get:function(){return makeRunner()}});
})();
</script>`;

let html=fs.readFileSync(path.join(uiDir,'Index.html'),'utf8');
const include=/\<\?!=\s*include\(['\"]([^'\"]+)['\"]\);\s*\?\>/g;
html=html.replace(include,(_,name)=>{
  const file=path.join(uiDir,`${name}.html`);
  if(!fs.existsSync(file))throw new Error(`Missing original UI include: ${name}`);
  let content=fs.readFileSync(file,'utf8');
  if(name==='AuthCore')content=bridge+'\n'+content;
  return content;
});
// Apps Script added this metadata in doGet; static Next.js delivery must add it here.
html=html.replace('<head>', '<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">');
const mobileDir=path.join(root,'legacy_mobile');
html=html.replace('</head>', `<style id="ndMobileStyles">\n${fs.readFileSync(path.join(mobileDir,'responsive.css'),'utf8')}\n</style>\n</head>`);
html=html.replace('</body>', `<script id="ndMobileBehavior">\n${fs.readFileSync(path.join(mobileDir,'responsive.js'),'utf8')}\n</script>\n</body>`);
fs.mkdirSync(outDir,{recursive:true});
fs.writeFileSync(path.join(outDir,'index.html'),html);
console.log('Built public/legacy/index.html directly from original v1.1.6 UI includes + Next.js bridge.');
