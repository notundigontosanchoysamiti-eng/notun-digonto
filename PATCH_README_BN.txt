Notun Digonto Strict Parity v4 PATCH

এই Patch আপনার existing Supabase/.env.local setup রাখার জন্য তৈরি।
.env.local এই ZIP-এ নেই।

1) npm run dev বন্ধ করুন (Ctrl+C)
2) বর্তমান project folder backup নিন
3) এই notun-digonto-modern-v2 folder-এর files আপনার বর্তমান project-এর উপর Copy + Replace করুন
4) Supabase SQL Editor-এ শুধু supabase/migrations/008_parity_performance_permissions.sql Run করুন
5) Terminal-এ:
   npm.cmd run build:legacy-ui
   npm.cmd run validate
   npm.cmd run verify-parity
6) তারপর:
   npm.cmd run dev

001-007 SQL আবার Run করবেন না।
.env.local delete/replace করবেন না।
