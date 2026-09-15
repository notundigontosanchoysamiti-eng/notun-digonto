# Strict Parity v4 → Functional Parity v5 Upgrade

আপনার existing Supabase project, `.env.local`, Admin account, Vercel project এবং Function Region **কিছুই নতুন করে করতে হবে না**।

## 1) Patch files replace করুন
`Notun_Digonto_Functional_Parity_v5_PATCH.zip` extract করে আপনার current `notun-digonto-modern-v2` project folder-এর উপর copy করুন এবং **Replace files** দিন। `.env.local` patch-এ নেই।

## 2) Supabase-এ শুধু 009 Run করুন
Supabase → SQL Editor → New Query.

এই file খুলুন:

`supabase/migrations/009_functional_parity_fixes.sql`

সব copy করে Run করুন। **001–008 আবার Run করবেন না।** Success হলে পরের ধাপ।

## 3) Local verification
Command Prompt/VS Code terminal:

```cmd
npm.cmd run build:legacy-ui
npm.cmd run validate
npm.cmd run verify-parity
npm.cmd run audit:functions
```

সব pass হলে:

```cmd
rmdir /s /q .next
npm.cmd run dev
```

## 4) প্রথম live tests
প্রথমে test/dummy data দিয়ে:
- New Investment (Land Size blank রেখেও test; text value দিয়েও test)
- Normal Expense: OPERATING, BANK_CHARGE, LEGAL, OTHER
- Unit-Based Expense: Preview → Save → Details → Reverse
- General Income
- Distributable Profit Income

## 5) GitHub/Vercel update
সব ঠিক থাকলে:

```cmd
git add .
git commit -m "Fix Notun Digonto functional parity v5"
git push
```

Vercel Git integration থাকলে auto-deploy হবে। Build Command আগের মতো রাখুন:

`npm run build:legacy-ui && npm run build`

## 6) যদি Unit-Based Expense এখনও fail করে
এক্ষেত্রে error business validation-ও হতে পারে। Exact toast message দেখুন। Common original rules:
- Active member থাকতে হবে
- Total active Savings Units > 0 হতে হবে
- প্রত্যেক member-এর Savings তার allocated deduction-এর সমান/বেশি হতে হবে
- selected Cash/Bank account-এ পুরো Expense amount থাকতে হবে
- allocation exactly 100% reconcile হতে হবে

Error-এর screenshot দিলে `.env.local`/Secret Key দেখাবেন না। Vercel → Logs-এ `[legacy-api]` error-এর message-টাও দিলে root cause নির্দিষ্ট করা যাবে।
