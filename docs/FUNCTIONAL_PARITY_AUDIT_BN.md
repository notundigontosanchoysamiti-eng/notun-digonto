# Notun Digonto v5 — Functional Parity Audit

এই audit-এর একমাত্র source of truth হলো original Google Apps Script **v1.1.6**। কোনো business rule, calculation, workflow, field, permission বা UI rule নতুন করে বানানো হয়নি।

## Confirmed defects found in v4 and fixed in v5

### 1. New Investment create ব্যর্থ হওয়া
Original Apps Script-এ `LAND_SIZE` একটি free-text field (`p.landSize || ''`)। v4 PostgreSQL schema-তে এটি ভুল করে numeric ছিল। ফলে blank Land Size বা `10 decimal`-এর মতো text value এবং blank optional Ownership % PostgreSQL cast error দিতে পারত।

v5 fix:
- `investments.land_size` আবার text করা হয়েছে।
- blank `ownershipPercent` / `expectedReturnRate` Apps Script `ndNumber_()`-এর মতো 0 হিসেবে handle হয়।
- blank optional date edit `NULL` হয়; invalid empty-string date write আর হয় না।
- Investment edit-এ একই legacy semantics রাখা হয়েছে।

### 2. Normal Expense accounting mismatch
Original app category অনুযায়ী Expense COA বেছে নেয়:
- `BANK_CHARGE` → `BANK_CHARGE_EXPENSE`
- `LEGAL` → `LEGAL_EXPENSE`
- `OTHER` → `OTHER_EXPENSE`
- অন্য category → `OPERATING_EXPENSE`

v4 normal expense সবসময় Operating Expense-এ যেতে পারত। এছাড়া original `ALLOCATION_METHOD` হলো `NORMAL`, কিন্তু v4 `NONE` লিখত। v5-এ দুইটিই original-এর মতো করা হয়েছে।

### 3. Unit-Based Expense robustness/parity
v5-এ:
- original allocation-method aliases normalize হয়।
- allocation preview এবং posting-এ original 100% reconciliation validation (`percentageTotal == 100`) enforce হয়।
- category → Expense COA mapping original-এর মতো।
- attachment থাকলে আগে storage upload হয়; upload fail হলে financial posting শুরু হয় না। ফলে attachment problem-এর কারণে UI `Failed` দেখালেও transaction ইতিমধ্যে post হয়ে যাওয়ার partial-post ঝুঁকি কমানো হয়েছে।
- attachment file id financial expense record-এর সঙ্গে same DB transaction-এ link হয়।

**Business validation অপরিবর্তিত:** কোনো সদস্যের allocated expense তার Savings-এর চেয়ে বেশি হলে original app-এর মতোই post fail করবে এবং insufficient member দেখাবে। Account balance কম হলেও original rule অনুযায়ী fail করবে।

### 4. Distributable Income / Profit partial-post risk
v4-এ Income transaction post হওয়ার পর আলাদা RPC-তে Profit Record তৈরি হতো। দ্বিতীয় ধাপ fail করলে partial state হওয়ার ঝুঁকি ছিল। Original Apps Script rollback করত। v5-এ Income + linked Profit Record এক PostgreSQL transaction-এর মধ্যে হয়; কোনো ধাপ fail করলে পুরো DB operation rollback হয়।

## Broad static parity check

- Original UI server calls: **105/105 wired**
- Legacy tables: **39/39 mapped**
- Original v1.1.6 source hashes: unchanged
- Member + Nominee, Savings/Dues, Loan, Investment, Income/Expense, Unit Expense, Profit, Ledger, Receipt/Voucher, Meeting/Committee, Documents, Notifications, Users/Roles, Audit/Correction, Reports, Backup/Settings surfaces: present
- SQL delimiter/parenthesis static validation: passed
- TypeScript syntax check for changed backend: passed

## Important boundary

Static audit কোনো live Supabase database-এর monetary result নিজে থেকে প্রমাণ করতে পারে না। v5-এর পরে নিচের live regression sequence চালানো উচিত:

1. Member + Nominee create/edit
2. Monthly Savings + Extra/Advance + Correction/Withdrawal
3. Loan Apply → Approve → Disburse → Payment → Correction/Reversal
4. New Investment → Edit → Principal Return → Profit Return → Close → Reversal
5. General Income + Distributable Profit
6. Normal Expense + BANK_CHARGE/LEGAL/OTHER category mapping
7. Unit-Based Expense preview/post/reversal
8. Profit source/record/distribution/reversal
9. Cash/Bank transfer + General Ledger balance
10. Receipt/Voucher + Reports

কোনো live test-এ error হলে UI toast-এর exact message এবং Vercel `Logs`-এর matching error line ধরে পরবর্তী fix করা যাবে।
