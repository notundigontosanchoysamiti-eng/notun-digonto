# Strict Parity v4 Status

## Locked source of truth

The uploaded **Notun Digonto WebApp Fresh Install v1.1.6** is the sole functional source of truth. The package preserves the original `Code.gs` and all original UI files byte-for-byte under `legacy_reference/`.

## What is now structurally preserved

- The default app route opens the exact original v1.1.6 UI bundle instead of a redesigned React dashboard.
- Member Add contains the original Nominee fields and KYC/photo/NID fields.
- Original navigation and page flows are restored for Savings, Receipts/Vouchers, Loans, Investments, Profit, Accounts & Finance, Meetings/Committee, Documents, Reports, Notifications, Users/Roles, Audit/Corrections, Backup/Database and Settings.
- All 105 server functions called by the original UI are implemented and dispatched through the Next.js `/api/legacy` bridge with matching argument counts.
- Advanced correction/reversal backend functions used by the v1.1.6 rule set are retained, including loan, investment, profit, savings and financial correction/reversal paths.
- 39 legacy data tables are mapped to PostgreSQL.
- `008_parity_performance_permissions.sql` adds operational grants/indexes only; it does not intentionally change a business rule.

## Verification boundary

Static verification can prove source preservation, feature-surface presence, function coverage, signatures, dispatch coverage and schema coverage. It cannot prove every monetary result without executing the same test transactions against a live Supabase project. Before using real financial data, run side-by-side regression cases for savings/due allocation, retroactive unit changes, loan schedules/payments/corrections, unit-based expense allocations, investment return/closure/reversal and profit distribution/reversal.
