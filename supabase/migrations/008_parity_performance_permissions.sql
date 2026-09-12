-- v3 strict-parity operational migration.
-- This file does NOT change any Notun Digonto business rule. It only grants the
-- server-side service role the privileges required by the Next.js bridge and
-- adds indexes for the same lookups that the original Apps Script performs.

begin;

grant usage on schema public to service_role;
grant all privileges on all tables in schema public to service_role;
grant all privileges on all sequences in schema public to service_role;
grant execute on all functions in schema public to service_role;

alter default privileges in schema public grant all privileges on tables to service_role;
alter default privileges in schema public grant all privileges on sequences to service_role;
alter default privileges in schema public grant execute on functions to service_role;

create index if not exists idx_members_status_created on public.members(status,created_at desc);
create index if not exists idx_members_mobile on public.members(mobile);
create index if not exists idx_members_nid on public.members(nid);
create index if not exists idx_nominees_member_status on public.nominees(member_id,status);
create index if not exists idx_savings_units_member_dates on public.savings_units(member_id,status,effective_from desc,effective_to);
create index if not exists idx_monthly_dues_member_month on public.monthly_dues(member_id,due_month,status);
create index if not exists idx_transactions_member_date on public.transactions(member_id,txn_date desc,created_at desc);
create index if not exists idx_transactions_status_category on public.transactions(status,category,type);
create index if not exists idx_transactions_related on public.transactions(related_id);
create index if not exists idx_transactions_parent on public.transactions(parent_txn_id);
create index if not exists idx_transactions_receipt on public.transactions(receipt_id);
create index if not exists idx_receipts_member_created on public.receipts(member_id,created_at desc);
create index if not exists idx_vouchers_txn_status on public.vouchers(txn_id,status);
create index if not exists idx_loans_member_status on public.loans(member_id,status,created_at desc);
create index if not exists idx_loan_schedule_loan_due on public.loan_schedule(loan_id,due_date,status);
create index if not exists idx_loan_payments_loan_date on public.loan_payments(loan_id,payment_date desc);
create index if not exists idx_guarantors_loan on public.guarantors(loan_id);
create index if not exists idx_investments_status_created on public.investments(status,created_at desc);
create index if not exists idx_investment_returns_investment on public.investment_returns(investment_id,status,return_date desc);
create index if not exists idx_investment_closures_investment on public.investment_closures(investment_id,status,created_at desc);
create index if not exists idx_income_date_status on public.income(date desc,status);
create index if not exists idx_income_txn on public.income(txn_id);
create index if not exists idx_expenses_date_status on public.expenses(date desc,status);
create index if not exists idx_expenses_txn on public.expenses(txn_id);
create index if not exists idx_expense_allocations_expense on public.expense_allocations(expense_id,status);
create index if not exists idx_gl_txn on public.general_ledger(txn_id);
create index if not exists idx_gl_member_date on public.general_ledger(member_id,entry_date desc);
create index if not exists idx_gl_account_date on public.general_ledger(account_code,entry_date desc);
create index if not exists idx_gl_related on public.general_ledger(related_id);
create index if not exists idx_profit_sources_investment_status on public.profit_sources(investment_id,status);
create index if not exists idx_profit_records_source_date on public.profit_records(source_id,profit_date desc,status);
create index if not exists idx_profit_records_investment on public.profit_records(investment_id,profit_date desc);
create index if not exists idx_profit_distributions_profit_status on public.profit_distributions(profit_id,status,created_at desc);
create index if not exists idx_profit_distribution_header_status on public.profit_distribution(distribution_id,status);
create index if not exists idx_documents_member_created on public.documents(member_id,created_at desc);
create index if not exists idx_documents_related on public.documents(related_type,related_id,status);
create index if not exists idx_notifications_member_status on public.notifications(member_id,status,created_at desc);
create index if not exists idx_notifications_user_status on public.notifications(user_id,status,created_at desc);
create index if not exists idx_approvals_entity_status on public.approvals(entity_type,entity_id,status,requested_at desc);
create index if not exists idx_audit_entity_created on public.audit_log(entity_type,entity_id,created_at desc);
create index if not exists idx_login_username_created on public.login_log(username,created_at desc);

commit;
notify pgrst, 'reload schema';
