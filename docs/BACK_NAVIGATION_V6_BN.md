# Notun Digonto — Safe Back Navigation v6

এই patch-এর একমাত্র উদ্দেশ্য browser/mobile Back button-কে natural navigation হিসেবে কাজ করানো।

## যেগুলো পরিবর্তন করা হয়নি

- কোনো Supabase migration বা database schema নয়
- কোনো Savings/Loan/Investment/Income/Expense/Profit calculation নয়
- কোনো permission/role নয়
- কোনো API/RPC/business function নয়
- original Google Apps Script v1.1.6 source নয়
- existing UI design নয়

Navigation bridge original UI build হওয়ার পরে আলাদা script হিসেবে inject হয়।

## Back button কীভাবে কাজ করবে

- Dashboard → Members → Back = Dashboard
- Members → Member Profile → Back = Members
- Member Profile → Member Ledger → Back = Member Profile
- Modal/Form open → Back = modal close
- Modal form-এ unsaved data থাকলে Back = confirmation
- Mobile sidebar open → Back = sidebar close
- Settings-এর existing unsaved-change guard আগের মতোই থাকবে
- Successful Save/Approve/Collect/Deduct/Reverse-এর কোনো action Back button থেকে execute/repeat হবে না

## ইচ্ছাকৃতভাবে history-তে রাখা হয়নি

Risk কম রাখার জন্য language switch, table search/filter, pagination, profile tab-এর মতো ছোট UI state browser history-তে যোগ করা হয়নি।

## Apply করার নিয়ম

1. বর্তমান project folder-এর backup নিন।
2. চলমান `npm run dev` থাকলে `Ctrl + C` দিয়ে বন্ধ করুন।
3. PATCH ZIP extract করুন।
4. ZIP-এর `notun-digonto-modern-v2` folder-এর files বর্তমান একই folder-এর উপর Copy/Paste করে **Replace files in destination** দিন।
5. `.env.local` পরিবর্তন করবেন না।
6. Supabase-এ কোনো নতুন SQL Run করার দরকার নেই।

তারপর PowerShell/Terminal-এ project root থেকে:

```powershell
npm.cmd run build:legacy-ui
npm.cmd run audit:navigation
npm.cmd run test:navigation
npm.cmd run validate
npm.cmd run verify-parity
```

সব pass করলে `.next` cache পরিষ্কার করতে PowerShell-এ:

```powershell
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
```

তারপর:

```powershell
npm.cmd run dev
```

## Live test checklist

Dummy/test account/data দিয়ে অন্তত এগুলো পরীক্ষা করুন:

1. Dashboard → Members → Back
2. Members → Profile → Back
3. Profile → Ledger → Back
4. Add Member modal → কিছু লিখুন → browser Back → confirmation
5. Expense modal → Back
6. Unit-Based Expense Preview → Back
7. Loan modal → Back
8. Investment modal → Back
9. Mobile sidebar খুলুন → Android/browser Back
10. Settings-এ unsaved change রেখে Back

## GitHub / Vercel update

Local test ঠিক থাকলে:

```powershell
git add .
git commit -m "Add safe browser back navigation"
git push
```

GitHub-connected Vercel project automatic redeploy করবে। Existing Vercel Build Command একই থাকবে:

```text
npm run build:legacy-ui && npm run build
```

## Safety verification

এই build-এ navigation bridge-এর জন্য dedicated checks আছে:

- `npm.cmd run audit:navigation`
- `npm.cmd run test:navigation`
- `npm.cmd run verify-parity`

Navigation bridge নিজে `fetch`, `api`, `gs`, `google.script.run`, Supabase client বা কোনো business backend call করে না।
