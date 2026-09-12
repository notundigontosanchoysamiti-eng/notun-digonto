# Notun Digonto Strict Parity v4 — বর্তমান UI Parity v2 থেকে Upgrade

এই upgrade-এর উদ্দেশ্য নতুন design বা নতুন business rule যোগ করা নয়। Original Google Sheets + Apps Script v1.1.6-এর UI, fields, forms, workflows, permissions, calculations এবং feature surface একই রেখে Next.js + Supabase backend ব্যবহার করা।

## আপনার বর্তমান setup যা থাকবে

- বর্তমান Supabase project একই থাকবে।
- `.env.local` একই থাকবে।
- `admin` account একই থাকবে।
- আগে Run করা `001` থেকে `007` SQL migration আবার Run করবেন না।
- Real data থাকলে delete/reset করবেন না।

## Upgrade করার ধাপ

1. বর্তমানে `npm run dev` চললে Terminal-এ `Ctrl + C` দিন।
2. আপনার বর্তমান project folder-এর একটি backup copy রাখুন।
3. Strict Parity **Patch** ZIP extract করুন।
4. Patch-এর `notun-digonto-modern-v2` folder-এর files আপনার বর্তমান project folder-এ copy/paste করুন এবং Windows জিজ্ঞেস করলে **Replace the files in the destination** নির্বাচন করুন।
5. `.env.local` overwrite/delete করবেন না। Patch package-এ `.env.local` নেই।
6. Supabase Dashboard → SQL Editor → New Query খুলে শুধু `supabase/migrations/008_parity_performance_permissions.sql`-এর code paste করে Run করুন। Success না হলে পরের ধাপে যাবেন না।
7. VS Code Terminal project root-এ খুলুন এবং চালান:

```cmd
npm.cmd run build:legacy-ui
npm.cmd run validate
npm.cmd run verify-parity
```

Expected parity line:

```text
STRICT PARITY OK: original source hashes intact; 105/105 original UI server functions implemented ...; 39/39 legacy tables mapped.
```

8. পুরনো Next.js cache মুছতে Command Prompt-এ চালাতে পারেন:

```cmd
rmdir /s /q .next
```

`.next` না থাকলে error হলেও সমস্যা নেই।

9. App চালান:

```cmd
npm.cmd run dev
```

10. Terminal-এ যে Local URL দেখাবে সেটি browser-এ খুলুন এবং আগের `admin` account দিয়ে login করুন।

## প্রথমে যে featureগুলো test করবেন

Original v1.1.6-এর সঙ্গে একইভাবে পরীক্ষা করুন: Member Add + Nominee, member edit/KYC/photo/NID, Savings/Due/Advance/Extra/Withdrawal/Correction, Loan Apply/Approve/Disburse/Payment/Correction, Investment Create/Return/Edit/Close/Reverse/Cancel, Income, Normal Expense, Unit-Based Expense, Profit Record/Distribution/Reverse, Cash/Bank/Transfer/Ledger, Receipt/Voucher/Print, Meetings/Committee, Documents, Reports, Notifications, Users/Roles, Audit, Backup, Settings এবং Member Portal।

## গুরুত্বপূর্ণ

`008_parity_performance_permissions.sql` business rule পরিবর্তন করে না। এটি service-role privilege এবং indexes যোগ করে যাতে Supabase/Next.js bridge দ্রুত ও নির্ভরযোগ্যভাবে একই data model ব্যবহার করতে পারে।
