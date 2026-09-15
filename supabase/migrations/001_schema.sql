-- Notun Digonto v2 PostgreSQL schema
-- Generated from v1.1.6 ND_SCHEMA; legacy business fields are preserved 1:1 in snake_case.
create extension if not exists pgcrypto;

create table if not exists public.config (
  key text primary key,
  value text,
  description text,
  updated_at timestamptz,
  updated_by text
);

create table if not exists public.sequences (
  sequence_key text primary key,
  value bigint not null default 0
);

create table if not exists public.roles (
  role_id text primary key,
  role_name text,
  permissions_json jsonb not null default '[]'::jsonb,
  status text,
  updated_at timestamptz
);

create table if not exists public.users (
  user_id text primary key,
  member_id text,
  full_name text,
  username text,
  password_hash text,
  salt text,
  role_id text,
  status text,
  must_change_password boolean not null default false,
  last_login_at timestamptz,
  created_at timestamptz,
  created_by text,
  updated_at timestamptz,
  updated_by text,
  auth_uid uuid unique references auth.users(id) on delete set null
);

create table if not exists public.sessions (
  session_id text primary key,
  token_hash text,
  user_id text,
  created_at timestamptz,
  expires_at timestamptz,
  last_seen_at timestamptz,
  status text
);

create table if not exists public.members (
  member_id text primary key,
  member_no text,
  name_bn text,
  name_en text,
  photo_file_id text,
  photo_mime text,
  father_name text,
  mother_name text,
  dob date,
  nid text,
  mobile text,
  alt_mobile text,
  email text,
  profession text,
  present_address text,
  permanent_address text,
  join_date date,
  status text,
  kyc_status text,
  notes text,
  created_at timestamptz,
  created_by text,
  updated_at timestamptz,
  updated_by text,
  blood_group text,
  nid_scan_document_id text
);

create table if not exists public.nominees (
  nominee_id text primary key,
  member_id text,
  name text,
  relation text,
  dob date,
  nid text,
  mobile text,
  address text,
  photo_file_id text,
  percent text,
  status text,
  created_at timestamptz,
  created_by text,
  updated_at timestamptz,
  updated_by text
);

create table if not exists public.savings_units (
  unit_id text primary key,
  member_id text,
  units numeric(18,2) not null default 0,
  unit_amount numeric(18,2) not null default 0,
  effective_from date,
  effective_to date,
  status text,
  notes text,
  created_at timestamptz,
  created_by text,
  updated_at timestamptz,
  updated_by text
);

create table if not exists public.monthly_dues (
  due_id text primary key,
  member_id text,
  due_month text,
  units numeric(18,2) not null default 0,
  unit_amount numeric(18,2) not null default 0,
  due_amount numeric(18,2) not null default 0,
  paid_amount numeric(18,2) not null default 0,
  advance_applied numeric(18,2) not null default 0,
  balance numeric(18,2) not null default 0,
  status text,
  due_date date,
  late_fee numeric(18,2) not null default 0,
  created_at timestamptz,
  created_by text,
  updated_at timestamptz,
  updated_by text
);

create table if not exists public.transactions (
  txn_id text primary key,
  txn_date date,
  member_id text,
  type text,
  category text,
  description text,
  direction text,
  amount numeric(18,2) not null default 0,
  principal_amount numeric(18,2) not null default 0,
  profit_amount numeric(18,2) not null default 0,
  penalty_amount numeric(18,2) not null default 0,
  payment_account_id text,
  payment_method text,
  reference text,
  related_id text,
  receipt_id text,
  status text,
  parent_txn_id text,
  correction_reason text,
  created_at timestamptz,
  created_by text,
  updated_at timestamptz,
  updated_by text,
  note_purpose text
);

create table if not exists public.receipts (
  receipt_id text primary key,
  txn_id text,
  member_id text,
  receipt_date date,
  amount numeric(18,2) not null default 0,
  purpose text,
  payment_method text,
  reference text,
  status text,
  print_count integer not null default 0,
  last_printed_at timestamptz,
  created_at timestamptz,
  created_by text
);

create table if not exists public.vouchers (
  voucher_id text primary key,
  txn_id text,
  date date,
  type text,
  payee text,
  member_id text,
  amount numeric(18,2) not null default 0,
  purpose text,
  account_id text,
  reference text,
  status text,
  created_at timestamptz,
  created_by text
);

create table if not exists public.loans (
  loan_id text primary key,
  member_id text,
  loan_type text,
  application_date date,
  requested_amount numeric(18,2) not null default 0,
  approved_amount numeric(18,2) not null default 0,
  annual_rate numeric(18,2) not null default 0,
  method text,
  term_months integer not null default 0,
  purpose text,
  savings_at_application numeric(18,2) not null default 0,
  eligible_limit numeric(18,2) not null default 0,
  status text,
  approval_status text,
  approved_by text,
  approved_at timestamptz,
  disbursed_at date,
  disbursement_txn_id text,
  outstanding_principal numeric(18,2) not null default 0,
  next_due_date date,
  guarantor_required boolean not null default false,
  notes text,
  created_at timestamptz,
  created_by text,
  updated_at timestamptz,
  updated_by text
);

create table if not exists public.loan_schedule (
  schedule_id text primary key,
  loan_id text,
  installment_no integer not null default 0,
  due_date date,
  opening_principal numeric(18,2) not null default 0,
  principal_due numeric(18,2) not null default 0,
  profit_due numeric(18,2) not null default 0,
  total_due numeric(18,2) not null default 0,
  principal_paid numeric(18,2) not null default 0,
  profit_paid numeric(18,2) not null default 0,
  penalty_paid numeric(18,2) not null default 0,
  status text,
  paid_at date
);

create table if not exists public.loan_payments (
  payment_id text primary key,
  loan_id text,
  member_id text,
  txn_id text,
  payment_date date,
  amount numeric(18,2) not null default 0,
  principal_amount numeric(18,2) not null default 0,
  profit_amount numeric(18,2) not null default 0,
  penalty_amount numeric(18,2) not null default 0,
  receipt_id text,
  created_at timestamptz,
  created_by text
);

create table if not exists public.loan_payment_allocations (
  alloc_id text primary key,
  payment_id text,
  schedule_id text,
  principal_amount numeric(18,2) not null default 0,
  profit_amount numeric(18,2) not null default 0,
  penalty_amount numeric(18,2) not null default 0,
  created_at timestamptz
);

create table if not exists public.guarantors (
  guarantor_id text primary key,
  loan_id text,
  member_id text,
  guarantor_member_id text,
  status text,
  approved_at timestamptz,
  created_at timestamptz,
  created_by text
);

create table if not exists public.investments (
  investment_id text primary key,
  type text,
  name text,
  start_date date,
  amount numeric(18,2) not null default 0,
  expected_return_rate numeric(18,2) not null default 0,
  expected_end_date date,
  status text,
  location text,
  land_size text not null default '',
  mouza text,
  dag text,
  khatian text,
  partner text,
  ownership_percent numeric(18,2) not null default 0,
  responsible_person text,
  document_folder_id text,
  purchase_txn_id text,
  notes text,
  created_at timestamptz,
  created_by text,
  updated_at timestamptz,
  updated_by text,
  total_invested numeric(18,2) not null default 0,
  principal_returned numeric(18,2) not null default 0,
  closure_id text,
  closed_at date,
  selling_amount numeric(18,2) not null default 0,
  profit_generated numeric(18,2) not null default 0,
  loss_generated numeric(18,2) not null default 0,
  closing_reference text,
  close_notes text,
  closed_by text
);

create table if not exists public.investment_returns (
  return_id text primary key,
  investment_id text,
  return_date date,
  type text,
  amount numeric(18,2) not null default 0,
  txn_id text,
  notes text,
  created_at timestamptz,
  created_by text,
  status text,
  parent_return_id text,
  updated_at timestamptz,
  updated_by text,
  profit_id text
);

create table if not exists public.investment_closures (
  closure_id text primary key,
  investment_id text,
  close_date date,
  selling_amount numeric(18,2) not null default 0,
  cash_received numeric(18,2) not null default 0,
  total_cost numeric(18,2) not null default 0,
  principal_returned numeric(18,2) not null default 0,
  profit_amount numeric(18,2) not null default 0,
  loss_amount numeric(18,2) not null default 0,
  account_id text,
  txn_id text,
  profit_id text,
  reference text,
  notes text,
  status text,
  parent_closure_id text,
  created_at timestamptz,
  created_by text,
  updated_at timestamptz,
  updated_by text
);

create table if not exists public.income (
  income_id text primary key,
  date date,
  category text,
  amount numeric(18,2) not null default 0,
  account_id text,
  reference text,
  description text,
  txn_id text,
  status text,
  created_at timestamptz,
  created_by text,
  income_type text,
  profit_id text,
  voucher_id text,
  client_request_id text,
  note text,
  updated_at timestamptz,
  updated_by text
);

create table if not exists public.expenses (
  expense_id text primary key,
  date date,
  category text,
  amount numeric(18,2) not null default 0,
  account_id text,
  reference text,
  description text,
  document_file_id text,
  txn_id text,
  status text,
  approval_status text,
  created_at timestamptz,
  created_by text,
  updated_at timestamptz,
  updated_by text,
  allocation_method text,
  total_units numeric(18,2) not null default 0,
  member_count integer not null default 0,
  allocated_amount numeric(18,2) not null default 0,
  voucher_id text,
  client_request_id text,
  allocation_status text
);

create table if not exists public.expense_allocations (
  allocation_id text primary key,
  expense_id text,
  voucher_id text,
  main_txn_id text,
  member_id text,
  member_name text,
  unit_quantity numeric(18,2) not null default 0,
  total_units numeric(18,2) not null default 0,
  unit_percentage numeric(18,2) not null default 0,
  amount numeric(18,2) not null default 0,
  savings_before numeric(18,2) not null default 0,
  savings_after numeric(18,2) not null default 0,
  txn_id text,
  status text,
  created_at timestamptz,
  created_by text,
  updated_at timestamptz,
  updated_by text
);

create table if not exists public.bank_accounts (
  account_id text primary key,
  account_code text,
  account_name text,
  type text,
  bank_name text,
  account_no text,
  branch text,
  opening_balance numeric(18,2) not null default 0,
  status text,
  created_at timestamptz,
  created_by text,
  updated_at timestamptz,
  updated_by text
);

create table if not exists public.chart_of_accounts (
  account_code text primary key,
  account_name text,
  account_type text,
  parent_code text,
  status text,
  system_account text
);

create table if not exists public.general_ledger (
  gl_id text primary key,
  entry_id text,
  txn_id text,
  entry_date date,
  account_code text,
  account_name text,
  debit numeric(18,2) not null default 0,
  credit numeric(18,2) not null default 0,
  member_id text,
  related_id text,
  description text,
  created_at timestamptz,
  created_by text
);

create table if not exists public.meetings (
  meeting_id text primary key,
  type text,
  title text,
  date date,
  time text,
  venue text,
  agenda text,
  minutes text,
  resolution_no text,
  status text,
  created_at timestamptz,
  created_by text,
  updated_at timestamptz,
  updated_by text
);

create table if not exists public.meeting_attendance (
  attendance_id text primary key,
  meeting_id text,
  member_id text,
  status text,
  note text,
  created_at timestamptz,
  created_by text,
  updated_at timestamptz,
  updated_by text
);

create table if not exists public.committee (
  committee_id text primary key,
  member_id text,
  designation text,
  start_date date,
  end_date date,
  status text,
  notes text,
  created_at timestamptz,
  created_by text
);

create table if not exists public.profit_sources (
  source_id text primary key,
  source_name text,
  category text,
  investment_id text,
  project_reference text,
  description text,
  status text,
  created_at timestamptz,
  created_by text,
  updated_at timestamptz,
  updated_by text
);

create table if not exists public.profit_records (
  profit_id text primary key,
  source_id text,
  investment_id text,
  category text,
  profit_date date,
  period_type text,
  period_start text,
  period_end text,
  period_label text,
  amount numeric(18,2) not null default 0,
  distributed_amount numeric(18,2) not null default 0,
  undistributed_amount numeric(18,2) not null default 0,
  status text,
  source_txn_id text,
  reference text,
  notes text,
  created_at timestamptz,
  created_by text,
  updated_at timestamptz,
  updated_by text,
  source_income_id text,
  source_voucher_id text
);

create table if not exists public.profit_distributions (
  distribution_id text primary key,
  profit_id text,
  source_id text,
  investment_id text,
  period_type text,
  period_start text,
  period_end text,
  period_label text,
  total_profit numeric(18,2) not null default 0,
  requested_amount numeric(18,2) not null default 0,
  distributed_amount numeric(18,2) not null default 0,
  member_count integer not null default 0,
  basis_type text,
  status text,
  reference text,
  notes text,
  approved_by text,
  approved_at timestamptz,
  created_at timestamptz,
  created_by text,
  updated_at timestamptz,
  updated_by text,
  total_basis numeric(18,2) not null default 0,
  total_units numeric(18,2) not null default 0,
  distribution_date date
);

create table if not exists public.profit_distribution (
  dist_id text primary key,
  financial_year text,
  member_id text,
  basis_amount numeric(18,2) not null default 0,
  rate numeric(18,2) not null default 0,
  amount numeric(18,2) not null default 0,
  status text,
  txn_id text,
  approved_by text,
  approved_at timestamptz,
  created_at timestamptz,
  created_by text,
  distribution_id text,
  profit_id text,
  source_id text,
  investment_id text,
  period_type text,
  period_start text,
  period_end text,
  period_label text,
  reference text,
  updated_at timestamptz,
  updated_by text,
  basis_type text,
  unit_quantity numeric(18,2) not null default 0,
  total_units numeric(18,2) not null default 0,
  unit_percentage numeric(18,2) not null default 0,
  member_name text
);

create table if not exists public.documents (
  document_id text primary key,
  member_id text,
  related_type text,
  related_id text,
  title text,
  file_id text,
  file_name text,
  mime_type text,
  status text,
  created_at timestamptz,
  created_by text
);

create table if not exists public.notifications (
  notification_id text primary key,
  user_id text,
  member_id text,
  type text,
  title text,
  message text,
  status text,
  created_at timestamptz,
  read_at timestamptz
);

create table if not exists public.approvals (
  approval_id text primary key,
  entity_type text,
  entity_id text,
  step text,
  status text,
  data_json text,
  requested_by text,
  requested_at timestamptz,
  decided_by text,
  decided_at timestamptz,
  note text
);

create table if not exists public.audit_log (
  audit_id text primary key,
  user_id text,
  action text,
  entity_type text,
  entity_id text,
  old_value text,
  new_value text,
  reason text,
  ip_hint text,
  created_at timestamptz
);

create table if not exists public.login_log (
  login_id text primary key,
  user_id text,
  username text,
  action text,
  success boolean not null default false,
  message text,
  created_at timestamptz
);

create table if not exists public.backups (
  backup_id text primary key,
  file_id text,
  file_name text,
  created_at timestamptz,
  created_by text,
  status text
);

create index if not exists idx_members_status on public.members (status);
create index if not exists idx_members_mobile on public.members (mobile);
create index if not exists idx_members_nid on public.members (nid);
create index if not exists idx_users_username on public.users (username);
create index if not exists idx_users_member_id on public.users (member_id);
create index if not exists idx_sessions_user_id_status on public.sessions (user_id, status);
create index if not exists idx_savings_units_member_id_status on public.savings_units (member_id, status);
create index if not exists idx_monthly_dues_member_id_due_month on public.monthly_dues (member_id, due_month);
create index if not exists idx_transactions_member_id_txn_date on public.transactions (member_id, txn_date);
create index if not exists idx_transactions_category_status on public.transactions (category, status);
create index if not exists idx_transactions_related_id on public.transactions (related_id);
create index if not exists idx_transactions_parent_txn_id on public.transactions (parent_txn_id);
create index if not exists idx_receipts_member_id_receipt_date on public.receipts (member_id, receipt_date);
create index if not exists idx_loans_member_id_status on public.loans (member_id, status);
create index if not exists idx_loan_schedule_loan_id_installment_no on public.loan_schedule (loan_id, installment_no);
create index if not exists idx_loan_payments_loan_id_payment_date on public.loan_payments (loan_id, payment_date);
create index if not exists idx_investments_status on public.investments (status);
create index if not exists idx_investment_returns_investment_id_return_date on public.investment_returns (investment_id, return_date);
create index if not exists idx_income_date_status on public.income (date, status);
create index if not exists idx_expenses_date_status on public.expenses (date, status);
create index if not exists idx_general_ledger_txn_id on public.general_ledger (txn_id);
create index if not exists idx_general_ledger_account_code_entry_date on public.general_ledger (account_code, entry_date);
create index if not exists idx_profit_records_profit_date_status on public.profit_records (profit_date, status);
create index if not exists idx_profit_distributions_profit_id_status on public.profit_distributions (profit_id, status);
create index if not exists idx_profit_distribution_distribution_id_member_id on public.profit_distribution (distribution_id, member_id);
create index if not exists idx_notifications_member_id_status on public.notifications (member_id, status);
create index if not exists idx_audit_log_entity_type_entity_id on public.audit_log (entity_type, entity_id);
create index if not exists idx_audit_log_created_at on public.audit_log (created_at);

create unique index if not exists uq_monthly_dues_member_month_active on public.monthly_dues(member_id,due_month) where status <> 'MERGED';
create unique index if not exists uq_income_client_request on public.income(client_request_id) where coalesce(client_request_id,'') <> '';
create unique index if not exists uq_expenses_client_request on public.expenses(client_request_id) where coalesce(client_request_id,'') <> '';
create unique index if not exists uq_profit_sources_project_reference on public.profit_sources(project_reference) where coalesce(project_reference,'') <> '';

alter table public.config enable row level security;
alter table public.sequences enable row level security;
alter table public.roles enable row level security;
alter table public.users enable row level security;
alter table public.sessions enable row level security;
alter table public.members enable row level security;
alter table public.nominees enable row level security;
alter table public.savings_units enable row level security;
alter table public.monthly_dues enable row level security;
alter table public.transactions enable row level security;
alter table public.receipts enable row level security;
alter table public.vouchers enable row level security;
alter table public.loans enable row level security;
alter table public.loan_schedule enable row level security;
alter table public.loan_payments enable row level security;
alter table public.loan_payment_allocations enable row level security;
alter table public.guarantors enable row level security;
alter table public.investments enable row level security;
alter table public.investment_returns enable row level security;
alter table public.investment_closures enable row level security;
alter table public.income enable row level security;
alter table public.expenses enable row level security;
alter table public.expense_allocations enable row level security;
alter table public.bank_accounts enable row level security;
alter table public.chart_of_accounts enable row level security;
alter table public.general_ledger enable row level security;
alter table public.meetings enable row level security;
alter table public.meeting_attendance enable row level security;
alter table public.committee enable row level security;
alter table public.profit_sources enable row level security;
alter table public.profit_records enable row level security;
alter table public.profit_distributions enable row level security;
alter table public.profit_distribution enable row level security;
alter table public.documents enable row level security;
alter table public.notifications enable row level security;
alter table public.approvals enable row level security;
alter table public.audit_log enable row level security;
alter table public.login_log enable row level security;
alter table public.backups enable row level security;

comment on schema public is 'Notun Digonto v2 - v1.1.6 compatible schema';