NOTUN DIGONTO SAFE BACK NAVIGATION PATCH
========================================

এই PATCH আপনার existing .env.local, Supabase SQL, database, financial rules বা API overwrite করে না।

Apply:
1) Backup current project folder.
2) Stop npm dev server.
3) Extract patch.
4) Copy notun-digonto-modern-v2 folder over your current project and Replace files.
5) Run:
   npm.cmd run build:legacy-ui
   npm.cmd run audit:navigation
   npm.cmd run test:navigation
   npm.cmd run validate
   npm.cmd run verify-parity
6) PowerShell cache clear:
   Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
7) Start:
   npm.cmd run dev

NO NEW SUPABASE SQL IS REQUIRED FOR THIS PATCH.

Detailed Bengali guide: docs/BACK_NAVIGATION_V6_BN.md
