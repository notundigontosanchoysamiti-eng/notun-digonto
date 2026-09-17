import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const uiDir = path.join(root, 'legacy_reference', 'ui');
const outDir = path.join(root, 'public', 'legacy');

const bridge = `<script id="ndVercelBridge">
(function(){
  'use strict';

  function makeRunner(){
    var success = function(){};
    var failure = function(e){ console.error(e); };

    var target = {
      withSuccessHandler: function(fn){
        success = typeof fn === 'function' ? fn : success;
        return proxy;
      },

      withFailureHandler: function(fn){
        failure = typeof fn === 'function' ? fn : failure;
        return proxy;
      }
    };

    var proxy = new Proxy(target, {
      get: function(obj, prop){
        if(prop in obj) return obj[prop];

        return function(){
          var args = Array.prototype.slice.call(arguments);

          fetch('/api/legacy', {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              fn: String(prop),
              args: args
            })
          })
          .then(async function(r){
            var j;

            try {
              j = await r.json();
            } catch(e) {
              throw new Error('Server response invalid.');
            }

            if(!r.ok || !j.ok) {
              throw new Error(
                (j && j.error) || ('HTTP ' + r.status)
              );
            }

            return j.result;
          })
          .then(function(v){
            try {
              success(v);
            } catch(e) {
              console.error(e);
            }
          })
          .catch(function(e){
            try {
              failure(e);
            } catch(x) {
              console.error(x);
            }
          });
        };
      }
    });

    return proxy;
  }

  window.google = window.google || {};
  window.google.script = window.google.script || {};

  Object.defineProperty(
    window.google.script,
    'run',
    {
      configurable: true,
      get: function(){
        return makeRunner();
      }
    }
  );
})();
</script>`;

const historyBridge =
`<script id="ndHistoryBridge">
${fs.readFileSync(
  path.join(root, 'scripts', 'legacy-navigation-bridge.js'),
  'utf8'
)}
</script>`;

let html = fs.readFileSync(
  path.join(uiDir, 'Index.html'),
  'utf8'
);

const include =
  /\<\?!=\s*include\(['"]([^'"]+)['"]\);\s*\?\>/g;

html = html.replace(
  include,
  (_, name) => {

    const file = path.join(
      uiDir,
      `${name}.html`
    );

    if(!fs.existsSync(file)) {
      throw new Error(
        `Missing original UI include: ${name}`
      );
    }

    let content =
      fs.readFileSync(file, 'utf8');

    if(name === 'AuthCore') {
      content = bridge + '\n' + content;
    }

    return content;
  }
);


/*
 * ============================================================
 * MOBILE RESPONSIVE SUPPORT
 * ============================================================
 *
 * Apps Script added viewport metadata dynamically.
 * Static Next.js/Vercel output must add it here.
 */

if(
  !/<meta[^>]+name=["']viewport["']/i.test(html)
) {
  html = html.replace(
    '<head>',
    `<head>
  <meta charset="utf-8">
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, viewport-fit=cover"
  >`
  );
}


/*
 * Load the preserved mobile responsive CSS + behavior.
 *
 * These files only affect presentation/navigation.
 * Business rules and API behavior remain untouched.
 */

const mobileDir =
  path.join(root, 'legacy_mobile');

const mobileCss =
  fs.readFileSync(
    path.join(
      mobileDir,
      'responsive.css'
    ),
    'utf8'
  );

const mobileJs =
  fs.readFileSync(
    path.join(
      mobileDir,
      'responsive.js'
    ),
    'utf8'
  );


html = html.replace(
  '</head>',
  `<style id="ndMobileStyles">
${mobileCss}
</style>
</head>`
);


/*
 * Mobile behavior must load before history navigation so that
 * Android/browser Back can correctly detect mobile drawer state.
 */

html = html.replace(
  '</body>',
  `<script id="ndMobileBehavior">
${mobileJs}
</script>
</body>`
);


/*
 * Safe Browser / Android Back navigation bridge.
 *
 * This only controls navigation history.
 * It never calls financial Save/Approve/Collect/etc actions.
 */

html = html.replace(
  '</body>',
  historyBridge + '\n</body>'
);


fs.mkdirSync(
  outDir,
  { recursive: true }
);

fs.writeFileSync(
  path.join(
    outDir,
    'index.html'
  ),
  html
);

console.log(
  'Built public/legacy/index.html with original v1.1.6 UI + Next.js bridge + mobile responsive layer + safe browser history bridge.'
);