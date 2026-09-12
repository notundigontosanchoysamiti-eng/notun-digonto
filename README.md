# Notun Digonto Modern v2

A modern, Vercel-ready rebuild of the original Google Sheets + Apps Script **Notun Digonto WebApp v1.1.6**. The legacy business rules are the source of truth; the implementation changes the runtime and data layer, not the society rules.

## Stack
- Next.js 16 + React 19 + TypeScript
- Supabase PostgreSQL, Auth and RLS
- Vercel-ready server routes
- Key-based Bengali/English rendering (no DOM text replacement)
- PostgreSQL transactions/RPC for savings, loans, investments, profit and ledger operations

## First install
1. Create a Supabase project.
2. In Supabase SQL Editor run, in order:
   - `supabase/migrations/001_schema.sql`
   - `002_seed_defaults.sql`
   - `003_core_rules.sql`
   - `004_financial_rules.sql`
   - `005_investment_profit_rules.sql`
   - `006_parity_finance_rules.sql`
   - `007_storage.sql`
3. Copy `.env.example` to `.env.local` and fill the values.
4. Run `npm install`.
5. Set `INITIAL_ADMIN_PASSWORD` and run `npm run create-admin`.
6. Run `npm run dev` and open http://localhost:3000.

## Vercel
Import this folder/repository into Vercel and add the same environment variables. The Supabase Service Role key is server-only; never expose it as a `NEXT_PUBLIC_` variable.

## Rule preservation
The original `Code.gs` is stored in `legacy_reference/Code.gs`. Schema mapping is in `docs/legacy-schema-map.json`. Database functions implement the legacy savings-due reconciliation, retroactive unit increase, loan eligibility/schedule/payment allocation, double-entry ledger, investment return/closure and profit distribution rules.

## Language system
The old DOM-visible-text replacement has been replaced by explicit translation keys in `lib/i18n.ts`. React re-renders from selected language state, so dynamic content/modal navigation does not lose the chosen language.

## Security model
All application tables have RLS enabled. Supabase Auth verifies passwords, while the app uses opaque random session tokens whose hashes are stored in the `sessions` table. `SESSION_HOURS`, revoke/logout, and failed-login lock behavior remain application-controlled. Privileged database operations are performed by authenticated Next.js server routes after checking the app role permissions.

## Production cut-over
Run `npm run validate`, install dependencies, run a full `npm run build`, then apply the migrations to a non-production Supabase project and execute the financial parity cases in `docs/PARITY_STATUS.md` before switching real users.

## v2 UI Parity edition

This package includes a UI parity pass that restores the original Apps Script v1.1.6 look and layout while keeping the Supabase/Next.js architecture. See `docs/UI_PARITY_NOTES.md`. The exact original UI files used as reference are included in `legacy_reference/ui_v1.1.6/`.
