import fs from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';

const html = fs.readFileSync('public/legacy/index.html', 'utf8');
const css = fs.readFileSync('legacy_mobile/responsive.css', 'utf8');
const js = fs.readFileSync('legacy_mobile/responsive.js', 'utf8');
assert.equal((html.match(/name="viewport"/g) || []).length, 1, 'Exactly one viewport required');
assert(html.includes('width=device-width, initial-scale=1, viewport-fit=cover'));
assert(html.includes(`<style id="ndMobileStyles">\n${css}\n</style>`), 'Rebuild stale mobile styles');
assert(html.includes(`<script id="ndMobileBehavior">\n${js}\n</script>`), 'Rebuild stale mobile behavior');
assert(!/user-scalable\s*=\s*no|maximum-scale\s*=\s*1/.test(html), 'Keep browser zoom available');
for (const match of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)) new vm.Script(match[1]);
assert(css.includes('@media screen and (max-width:980px)'));
assert(js.includes("window.matchMedia('(max-width: 980px)')"));
console.log('MOBILE UI OK: viewport, matching breakpoints, current generated assets, zoom enabled, all inline JavaScript syntax valid.');
