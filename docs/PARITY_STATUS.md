# v1.1.6 → Modern v2 parity status

## Ported in this package
- 39-table legacy schema mapped to PostgreSQL (snake_case) with indexes and RLS.
- Original CONFIG defaults, roles/permission arrays, Chart of Accounts, default accounts and profit sources.
- Legacy-style login lockout, app session duration, opaque hashed sessions and logout/revoke behavior.
- Member create/list/profile read/update, duplicate mobile/NID checks, nominee create/update, member login creation.
- Member self profile-update request and admin approval flow.
- Savings unit model, society-start-month rule, due generation, due reconciliation, advance allocation, monthly/multi-month collection and extra savings.
- Retroactive savings-unit increase behavior.
- Receipts and double-entry GL posting for migrated financial operations.
- Loan eligibility, application, approval, schedule generation, disbursement and repayment allocation (profit/service component before principal).
- Investment create, return and closure calculations with GL and linked profit records.
- Profit sources/records plus MANUAL/SAVINGS/EQUAL/UNITS distribution draft and approval with exact-cent allocation.
- Income and normal expense posting.
- Unit-based association expense preview/posting and member savings deductions.
- Savings withdrawal and internal account transfer.
- Generic transaction reversal primitive.
- Meetings save, attendance save, committee add, notifications, audit list.
- Supabase Storage buckets, document upload/list, logical JSON-gzip backup/list.
- Reports use database filters rather than full-sheet client scans.
- Admin staff-user creation/update/password reset; roles list/permission update.
- Settings read/update with financial-confirmation checks and key validation.
- Responsive Next.js shell, login, dashboard, member portal, key-based Bangla/English rendering, member/savings/loan core forms.

## Requires final connected-database parity/integration pass before production cut-over
These are intentionally flagged rather than claimed complete without a live Supabase test project:
- Savings edit/correction/reversal UI and legacy receipt-document carry-forward behavior.
- Full income/expense correction/reversal lifecycle, including reverse of a complete unit-based allocation.
- Loan repayment correction and loan-disbursement reversal UI/API parity.
- Investment return edit/reversal, closure reversal and purchase cancellation UI/API parity.
- Profit-record update/reversal and distribution cancel/reversal UI/API parity.
- Full meeting/committee CRUD screens (server primitives exist for core create/update actions).
- Member photo/NID-scan upload screens and signed document download screen.
- Receipt/voucher print templates and print-count tracking.
- Settings side-effects that reschedule future unit amount/start-month historical obligations require live-database regression tests.
- Automated scheduled due/status/backup jobs should be wired to Vercel Cron or Supabase Cron after deployment.

## Why the remaining items are flagged
The original source contains financial correction/reversal paths that must be tested against an actual PostgreSQL transaction environment. Shipping guessed behavior would violate the requirement that v1.1.6 rules remain the source of truth.
