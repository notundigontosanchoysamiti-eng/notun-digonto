-- Notun Digonto v5 functional-parity fixes.
-- Source of truth: original Google Apps Script v1.1.6.
-- This migration does NOT add/change business rules. It fixes PostgreSQL typing,
-- normal-expense account mapping, and exact legacy NORMAL/UNIT_BASED semantics.

begin;

-- Apps Script ndNumber_(v): finite numeric value, otherwise 0.
create or replace function public.nd_number_text(p_value text)
returns numeric language plpgsql immutable as $$
declare v text:=trim(coalesce(p_value,'')); n numeric;
begin
  if v='' or lower(v) in ('nan','infinity','+infinity','-infinity','inf','+inf','-inf') then return 0; end if;
  begin n:=v::numeric; exception when others then return 0; end;
  return coalesce(n,0);
end $$;

-- Apps Script ndBool_(v) compatibility.
create or replace function public.nd_bool_text(p_value text)
returns boolean language sql immutable as $$
  select upper(trim(coalesce(p_value,''))) in ('TRUE','1')
$$;

-- Apps Script ndExpenseAllocationMethod_(value) compatibility.
create or replace function public.nd_expense_allocation_method(p_value text)
returns text language plpgsql immutable as $$
declare v text:=upper(regexp_replace(trim(coalesce(p_value,'NORMAL')),'[ -]+','_','g'));
begin
  if v in ('UNIT','UNITS','UNIT_BASED','UNIT_BASED_MEMBER_DEDUCTION') then return 'UNIT_BASED'; end if;
  if v in ('NORMAL','MANUAL','MANUAL_NORMAL_EXPENSE') then return 'NORMAL'; end if;
  raise exception 'Invalid expense allocation method.';
end $$;

-- Original LAND_SIZE is free text (e.g. "10 decimal"), not a numeric field.
do $$
declare dtype text;
begin
  select data_type into dtype
  from information_schema.columns
  where table_schema='public' and table_name='investments' and column_name='land_size';
  if dtype is not null and dtype<>'text' then
    alter table public.investments alter column land_size drop default;
    alter table public.investments alter column land_size type text using
      case when land_size is null then '' else trim(trailing '.' from trim(trailing '0' from land_size::text)) end;
    alter table public.investments alter column land_size set default '';
  end if;
end $$;

-- Exact v1.1.6 investment-create behavior, with blank optional values accepted.
create or replace function public.nd_create_investment(p_user_id text,p_payload jsonb)
returns jsonb language plpgsql security definer set search_path=public as $$
declare name_v text; amount_v numeric; total_v numeric; account public.bank_accounts; bal numeric; id text; date_v date; txn_id_v text; source public.profit_sources;
begin
 name_v:=trim(coalesce(p_payload->>'name','')); if name_v='' then raise exception 'Investment name required.'; end if;
 amount_v:=round(public.nd_number_text(p_payload->>'amount'),2);
 total_v:=round(case when trim(coalesce(p_payload->>'totalInvested',''))='' then amount_v else public.nd_number_text(p_payload->>'totalInvested') end,2);
 if amount_v<=0 or total_v<=0 then raise exception 'Investment amount required.'; end if;
 if total_v+0.01<amount_v then raise exception 'Total invested cannot be lower than original principal.'; end if;
 select * into account from public.bank_accounts where account_id=coalesce(nullif(p_payload->>'accountId',''),'ACC-BANK') and status='ACTIVE';
 if account.account_id is null then raise exception 'Payment account not found.'; end if;
 bal:=public.nd_account_balance(account.account_id); if total_v>bal+0.01 then raise exception 'Investment purchase exceeds available % balance: %',account.account_name,bal; end if;
 id:=public.nd_next_id('INVESTMENT','INV-',7); date_v:=coalesce(nullif(p_payload->>'startDate','')::date,public.nd_today()); txn_id_v:=public.nd_next_id('TXN','TRX-',8);
 insert into public.transactions(txn_id,txn_date,member_id,type,category,description,direction,amount,principal_amount,profit_amount,penalty_amount,payment_account_id,payment_method,reference,related_id,receipt_id,status,parent_txn_id,correction_reason,created_at,created_by,updated_at,updated_by)
 values(txn_id_v,date_v,'','INVESTMENT_PURCHASE','INVESTMENT','Investment: '||name_v,'DEBIT',total_v,total_v,0,0,account.account_id,coalesce(nullif(p_payload->>'paymentMethod',''),account.type),coalesce(p_payload->>'reference',''),id,'','POSTED',coalesce(p_payload->>'parentTxnId',''),coalesce(p_payload->>'reason',''),now(),p_user_id,now(),p_user_id);
 perform public.nd_post_journal(p_user_id,txn_id_v,date_v,jsonb_build_array(jsonb_build_object('accountCode',(public.nd_coa_by_system('INVESTMENT_ASSET')).account_code,'debit',total_v,'credit',0),jsonb_build_object('accountCode',account.account_code,'debit',0,'credit',total_v)),'',id,'Investment: '||name_v);
 insert into public.investments(investment_id,type,name,start_date,amount,expected_return_rate,expected_end_date,status,location,land_size,mouza,dag,khatian,partner,ownership_percent,responsible_person,document_folder_id,purchase_txn_id,notes,created_at,created_by,updated_at,updated_by,total_invested,principal_returned,closure_id,closed_at,selling_amount,profit_generated,loss_generated,closing_reference,close_notes,closed_by)
 values(id,upper(coalesce(nullif(p_payload->>'type',''),'OTHER')),name_v,date_v,amount_v,public.nd_number_text(p_payload->>'expectedReturnRate'),nullif(p_payload->>'expectedEndDate','')::date,'ACTIVE',coalesce(p_payload->>'location',''),coalesce(p_payload->>'landSize',''),coalesce(p_payload->>'mouza',''),coalesce(p_payload->>'dag',''),coalesce(p_payload->>'khatian',''),coalesce(p_payload->>'partner',''),public.nd_number_text(p_payload->>'ownershipPercent'),coalesce(p_payload->>'responsiblePerson',''),'',''||txn_id_v,coalesce(p_payload->>'notes',''),now(),p_user_id,now(),p_user_id,total_v,0,'',null,0,0,0,'','','');
 source:=public.nd_ensure_profit_source_for_investment(p_user_id,id,name_v,upper(coalesce(nullif(p_payload->>'type',''),'OTHER')));
 perform public.nd_create_audit(p_user_id,'CREATE','INVESTMENT',id,'{}'::jsonb,p_payload,'Investment created');
 return jsonb_build_object('ok',true,'investmentId',id,'txnId',txn_id_v,'sourceId',source.source_id);
end $$;

-- Exact v1.1.6 normal expense behavior:
-- category -> correct COA and ALLOCATION_METHOD must be NORMAL (not NONE).
create or replace function public.nd_create_expense(p_user_id text,p_payload jsonb)
returns jsonb language plpgsql security definer set search_path=public as $$
declare amount_v numeric; account public.bank_accounts; expense_coa public.chart_of_accounts; expense_system text; txn_id_v text; expense_id_v text; voucher_id_v text; date_v date; description_v text; reference_v text; client_v text; bal numeric; method_v text;
begin
 method_v:=public.nd_expense_allocation_method(p_payload->>'allocationMethod');
 if method_v<>'NORMAL' then raise exception 'Normal expense function received non-normal allocation method.'; end if;
 amount_v:=round(public.nd_number_text(p_payload->>'amount'),2); if amount_v<=0 then raise exception 'Amount required.'; end if;
 client_v:=left(trim(coalesce(p_payload->>'clientRequestId','')),120);
 if client_v<>'' and exists(select 1 from public.expenses where client_request_id=client_v and upper(coalesce(status,'')) not in ('CANCELLED','REVERSED')) then
   return (select jsonb_build_object('ok',true,'duplicate',true,'expenseId',expense_id,'txnId',txn_id,'voucherId',voucher_id,'allocationMethod',coalesce(nullif(allocation_method,''),'NORMAL')) from public.expenses where client_request_id=client_v and upper(coalesce(status,'')) not in ('CANCELLED','REVERSED') order by created_at desc limit 1);
 end if;
 select * into account from public.bank_accounts where account_id=coalesce(nullif(p_payload->>'accountId',''),'ACC-CASH') and status='ACTIVE'; if account.account_id is null then raise exception 'Payment account not found.'; end if;
 bal:=public.nd_account_balance(account.account_id); if amount_v>bal+0.01 then raise exception 'Expense exceeds available % balance: %',account.account_name,bal; end if;
 expense_system:=coalesce(nullif(p_payload->>'systemExpenseAccount',''),case upper(coalesce(p_payload->>'category','')) when 'BANK_CHARGE' then 'BANK_CHARGE_EXPENSE' when 'LEGAL' then 'LEGAL_EXPENSE' when 'OTHER' then 'OTHER_EXPENSE' else 'OPERATING_EXPENSE' end);
 expense_coa:=public.nd_coa_by_system(expense_system); if expense_coa.account_code is null then raise exception 'Expense account mapping not found: %',expense_system; end if;
 txn_id_v:=public.nd_next_id('TXN','TRX-',8); expense_id_v:=public.nd_next_id('EXPENSE','EXP-',7); voucher_id_v:=public.nd_next_voucher_id(); date_v:=coalesce(nullif(p_payload->>'date','')::date,public.nd_today()); description_v:=left(trim(coalesce(p_payload->>'description',p_payload->>'category','Expense')),1000); reference_v:=left(trim(coalesce(p_payload->>'reference','')),300);
 insert into public.transactions(txn_id,txn_date,member_id,type,category,description,direction,amount,principal_amount,profit_amount,penalty_amount,payment_account_id,payment_method,reference,related_id,receipt_id,status,parent_txn_id,correction_reason,created_at,created_by,updated_at,updated_by) values(txn_id_v,date_v,'','EXPENSE','EXPENSE',description_v,'DEBIT',amount_v,0,0,0,account.account_id,coalesce(nullif(p_payload->>'paymentMethod',''),account.type),reference_v,expense_id_v,'','POSTED','','',now(),p_user_id,now(),p_user_id);
 insert into public.expenses(expense_id,date,category,amount,account_id,reference,description,document_file_id,txn_id,status,approval_status,created_at,created_by,updated_at,updated_by,allocation_method,total_units,member_count,allocated_amount,voucher_id,client_request_id,allocation_status) values(expense_id_v,date_v,coalesce(p_payload->>'category','OPERATING'),amount_v,account.account_id,reference_v,description_v,coalesce(p_payload->>'documentFileId',''),txn_id_v,'POSTED','APPROVED',now(),p_user_id,now(),p_user_id,'NORMAL',0,0,0,voucher_id_v,client_v,'NOT_APPLICABLE');
 insert into public.vouchers(voucher_id,txn_id,date,type,payee,member_id,amount,purpose,account_id,reference,status,created_at,created_by) values(voucher_id_v,txn_id_v,date_v,'EXPENSE',coalesce(p_payload->>'payee',p_payload->>'vendor','Expense Payee'),'',amount_v,description_v,account.account_id,reference_v,'POSTED',now(),p_user_id);
 perform public.nd_post_journal(p_user_id,txn_id_v,date_v,jsonb_build_array(jsonb_build_object('accountCode',expense_coa.account_code,'debit',amount_v,'credit',0),jsonb_build_object('accountCode',account.account_code,'debit',0,'credit',amount_v)),'',expense_id_v,description_v);
 perform public.nd_create_audit(p_user_id,'CREATE','EXPENSE',expense_id_v,'{}'::jsonb,jsonb_build_object('txnId',txn_id_v,'voucherId',voucher_id_v),'Expense posted');
 return jsonb_build_object('ok',true,'duplicate',false,'expenseId',expense_id_v,'txnId',txn_id_v,'voucherId',voucher_id_v,'allocationMethod','NORMAL');
end $$;

-- Unit-based expense: retain original rule, plus exact 100% reconciliation check
-- and safe number semantics. No allocation/business formula is changed.
create or replace function public.nd_create_unit_expense(p_user_id text,p_payload jsonb)
returns jsonb language plpgsql security definer set search_path=public as $$
declare amount_v numeric; client_v text; dup public.expenses; account public.bank_accounts; balance_v numeric; expense_coa public.chart_of_accounts; expense_system text; date_v date; preview jsonb; txn_id_v text; expense_id_v text; voucher_id_v text; desc_v text; reference_v text; row_v jsonb; alloc_id_v text; child_txn text; savings public.chart_of_accounts; surplus public.chart_of_accounts;
begin
 if public.nd_expense_allocation_method(p_payload->>'allocationMethod')<>'UNIT_BASED' then raise exception 'Unit-based allocation must be selected.'; end if;
 amount_v:=round(public.nd_number_text(p_payload->>'amount'),2); if amount_v<=0 then raise exception 'Amount required.'; end if;
 client_v:=left(trim(coalesce(p_payload->>'clientRequestId','')),120); if client_v='' then raise exception 'Client request ID is required for duplicate-safe unit allocation.'; end if;
 select * into dup from public.expenses where client_request_id=client_v and upper(coalesce(status,'')) not in ('CANCELLED','REVERSED') order by created_at desc limit 1;
 if dup.expense_id is not null then return jsonb_build_object('ok',true,'duplicate',true,'expenseId',dup.expense_id,'txnId',dup.txn_id,'voucherId',dup.voucher_id,'allocationMethod',dup.allocation_method); end if;
 select * into account from public.bank_accounts where account_id=coalesce(nullif(p_payload->>'accountId',''),'ACC-CASH') and status='ACTIVE'; if account.account_id is null then raise exception 'Payment account not found.'; end if;
 balance_v:=public.nd_account_balance(account.account_id); if amount_v>balance_v+0.01 then raise exception 'Expense exceeds available % balance: %',account.account_name,balance_v; end if;
 expense_system:=coalesce(nullif(p_payload->>'systemExpenseAccount',''),case upper(coalesce(p_payload->>'category','')) when 'BANK_CHARGE' then 'BANK_CHARGE_EXPENSE' when 'LEGAL' then 'LEGAL_EXPENSE' when 'OTHER' then 'OTHER_EXPENSE' else 'OPERATING_EXPENSE' end);
 expense_coa:=public.nd_coa_by_system(expense_system); if expense_coa.account_code is null then raise exception 'Expense account mapping not found: %',expense_system; end if;
 date_v:=coalesce(nullif(p_payload->>'date','')::date,public.nd_today()); preview:=public.nd_preview_unit_expense(amount_v,date_v);
 if jsonb_array_length(preview->'insufficientMembers')>0 then raise exception 'অপর্যাপ্ত সঞ্চয়: %',preview->'insufficientMembers'; end if;
 if coalesce((preview->>'canPost')::boolean,false)=false or abs(public.nd_number_text(preview->>'percentageTotal')-100)>0.009 then raise exception 'Unit allocation could not be reconciled exactly.'; end if;
 txn_id_v:=public.nd_next_id('TXN','TRX-',8); expense_id_v:=public.nd_next_id('EXPENSE','EXP-',7); voucher_id_v:=public.nd_next_voucher_id(); desc_v:=left(trim(coalesce(p_payload->>'description',p_payload->>'category','Expense')),1000); reference_v:=left(trim(coalesce(p_payload->>'reference','')),300);
 insert into public.transactions(txn_id,txn_date,member_id,type,category,description,direction,amount,principal_amount,profit_amount,penalty_amount,payment_account_id,payment_method,reference,related_id,receipt_id,status,parent_txn_id,correction_reason,created_at,created_by,updated_at,updated_by) values(txn_id_v,date_v,'','EXPENSE','EXPENSE',desc_v,'DEBIT',amount_v,0,0,0,account.account_id,coalesce(nullif(p_payload->>'paymentMethod',''),account.type),reference_v,expense_id_v,'','POSTED','','',now(),p_user_id,now(),p_user_id);
 insert into public.expenses(expense_id,date,category,amount,account_id,reference,description,document_file_id,txn_id,status,approval_status,created_at,created_by,updated_at,updated_by,allocation_method,total_units,member_count,allocated_amount,voucher_id,client_request_id,allocation_status) values(expense_id_v,date_v,coalesce(p_payload->>'category','OPERATING'),amount_v,account.account_id,reference_v,desc_v,coalesce(p_payload->>'documentFileId',''),txn_id_v,'POSTED','APPROVED',now(),p_user_id,now(),p_user_id,'UNIT_BASED',(preview->>'totalUnits')::numeric,(preview->>'memberCount')::integer,(preview->>'allocatedAmount')::numeric,voucher_id_v,client_v,'POSTED');
 insert into public.vouchers(voucher_id,txn_id,date,type,payee,member_id,amount,purpose,account_id,reference,status,created_at,created_by) values(voucher_id_v,txn_id_v,date_v,'EXPENSE',coalesce(p_payload->>'payee',p_payload->>'vendor','Expense Payee'),'',amount_v,desc_v||' · Unit-Based Member Deduction',account.account_id,reference_v,'POSTED',now(),p_user_id);
 perform public.nd_post_journal(p_user_id,txn_id_v,date_v,jsonb_build_array(jsonb_build_object('accountCode',expense_coa.account_code,'debit',amount_v,'credit',0),jsonb_build_object('accountCode',account.account_code,'debit',0,'credit',amount_v)),'',expense_id_v,desc_v);
 savings:=public.nd_coa_by_system('MEMBER_SAVINGS'); surplus:=public.nd_coa_by_system('RETAINED_SURPLUS');
 for row_v in select value from jsonb_array_elements(preview->'rows') loop
   alloc_id_v:=public.nd_next_id('EXPENSE_ALLOCATION','EAL-',8); child_txn:='';
   if (row_v->>'amount')::numeric>0 then
     child_txn:=public.nd_next_id('TXN','TRX-',8);
     insert into public.transactions(txn_id,txn_date,member_id,type,category,description,direction,amount,principal_amount,profit_amount,penalty_amount,payment_account_id,payment_method,reference,related_id,receipt_id,status,parent_txn_id,correction_reason,created_at,created_by,updated_at,updated_by,note_purpose) values(child_txn,date_v,row_v->>'memberId','ASSOCIATION_EXPENSE_DEDUCTION','SAVINGS','সমিতির ব্যয় কর্তন: '||desc_v,'DEBIT',(row_v->>'amount')::numeric,(row_v->>'amount')::numeric,0,0,'','INTERNAL',voucher_id_v,expense_id_v,'','POSTED',txn_id_v,'',now(),p_user_id,now(),p_user_id,desc_v);
     perform public.nd_post_journal(p_user_id,child_txn,date_v,jsonb_build_array(jsonb_build_object('accountCode',savings.account_code,'debit',(row_v->>'amount')::numeric,'credit',0),jsonb_build_object('accountCode',surplus.account_code,'debit',0,'credit',(row_v->>'amount')::numeric)),row_v->>'memberId',expense_id_v,'Unit-based expense allocation: '||desc_v);
     perform public.nd_create_notification(row_v->>'memberId','ASSOCIATION_EXPENSE','সমিতির ব্যয় কর্তন',(row_v->>'amount')||' টাকা সঞ্চয় থেকে কর্তন হয়েছে। Voucher: '||voucher_id_v);
   end if;
   insert into public.expense_allocations(allocation_id,expense_id,voucher_id,main_txn_id,member_id,member_name,unit_quantity,total_units,unit_percentage,amount,savings_before,savings_after,txn_id,status,created_at,created_by,updated_at,updated_by) values(alloc_id_v,expense_id_v,voucher_id_v,txn_id_v,row_v->>'memberId',row_v->>'name',(row_v->>'units')::numeric,(preview->>'totalUnits')::numeric,(row_v->>'rate')::numeric,(row_v->>'amount')::numeric,(row_v->>'savingsBefore')::numeric,(row_v->>'savingsAfter')::numeric,child_txn,case when (row_v->>'amount')::numeric>0 then 'POSTED' else 'ZERO_ALLOCATION' end,now(),p_user_id,now(),p_user_id);
 end loop;
 perform public.nd_create_audit(p_user_id,'CREATE','EXPENSE',expense_id_v,'{}'::jsonb,jsonb_build_object('txnId',txn_id_v,'voucherId',voucher_id_v,'allocationSummary',preview),'Unit-based association expense posted');
 return jsonb_build_object('ok',true,'duplicate',false,'expenseId',expense_id_v,'txnId',txn_id_v,'voucherId',voucher_id_v,'allocationMethod','UNIT_BASED','totalUnits',preview->'totalUnits','memberCount',preview->'memberCount','allocatedAmount',preview->'allocatedAmount','allocationRows',preview->'rows');
end $$;



-- Apps Script ndIncomeType_(value) compatibility.
create or replace function public.nd_income_type(p_value text)
returns text language plpgsql immutable as $$
declare v text:=upper(regexp_replace(trim(coalesce(p_value,'GENERAL')),'[ -]+','_','g'));
begin
  if v in ('GENERAL','GENERAL_INCOME') then return 'GENERAL'; end if;
  if v in ('DISTRIBUTABLE','DISTRIBUTABLE_PROFIT','PROFIT') then return 'DISTRIBUTABLE_PROFIT'; end if;
  raise exception 'Income type must be General Income or Distributable Profit.';
end $$;

-- Income + linked distributable-profit record are one PostgreSQL transaction.
-- This mirrors the original Apps Script rollback behavior without a partial-post risk.
create or replace function public.nd_create_income(p_user_id text,p_payload jsonb)
returns jsonb language plpgsql security definer set search_path=public as $$
declare amount_v numeric; account public.bank_accounts; category_v text; income_type_v text; income_sys text; income_coa public.chart_of_accounts; txn_id_v text; income_id_v text; voucher_id_v text; date_v date; description_v text; reference_v text; note_v text; client_v text; source public.profit_sources; investment_v text:=''; profit_id_v text:=''; profit_payload jsonb;
begin
 amount_v:=round(public.nd_number_text(p_payload->>'amount'),2); if amount_v<=0 then raise exception 'Amount required.'; end if;
 income_type_v:=public.nd_income_type(p_payload->>'incomeType');
 client_v:=left(trim(coalesce(p_payload->>'clientRequestId','')),120);
 if client_v<>'' and exists(select 1 from public.income where client_request_id=client_v and upper(coalesce(status,'')) not in ('CANCELLED','REVERSED')) then
   return (select jsonb_build_object('ok',true,'duplicate',true,'incomeId',income_id,'txnId',txn_id,'voucherId',voucher_id,'profitId',profit_id,'incomeType',coalesce(nullif(income_type,''),'GENERAL')) from public.income where client_request_id=client_v and upper(coalesce(status,'')) not in ('CANCELLED','REVERSED') order by created_at desc limit 1);
 end if;
 select * into account from public.bank_accounts where account_id=coalesce(nullif(p_payload->>'accountId',''),'ACC-CASH') and status='ACTIVE'; if account.account_id is null then raise exception 'Payment account not found.'; end if;
 category_v:=upper(left(trim(coalesce(p_payload->>'category','OTHER')),100));
 income_sys:=coalesce(nullif(p_payload->>'systemIncomeAccount',''),case category_v when 'LATE_FEE' then 'LATE_FEE_INCOME' when 'INVESTMENT_INCOME' then 'INVESTMENT_INCOME' else 'OTHER_INCOME' end);
 if income_type_v='DISTRIBUTABLE_PROFIT' then
   select * into source from public.profit_sources where source_id=p_payload->>'sourceId' and status='ACTIVE'; if source.source_id is null then raise exception 'Active profit source required for distributable profit.'; end if;
   investment_v:=coalesce(nullif(p_payload->>'investmentId',''),source.investment_id,'');
   if investment_v<>'' and not exists(select 1 from public.investments where investment_id=investment_v) then raise exception 'Linked investment not found.'; end if;
   if coalesce(source.investment_id,'')<>'' and investment_v<>'' and source.investment_id<>investment_v then raise exception 'Selected investment does not match the profit source.'; end if;
   if coalesce(source.investment_id,'')<>'' then income_sys:='INVESTMENT_INCOME'; end if;
   perform public.nd_profit_period(p_payload);
 end if;
 income_coa:=public.nd_coa_by_system(income_sys); if income_coa.account_code is null then raise exception 'Income account mapping not found: %',income_sys; end if;
 txn_id_v:=public.nd_next_id('TXN','TRX-',8); income_id_v:=public.nd_next_id('INCOME','INC-',7); voucher_id_v:=public.nd_next_voucher_id(); date_v:=coalesce(nullif(p_payload->>'date','')::date,nullif(p_payload->>'profitDate','')::date,public.nd_today()); description_v:=left(trim(coalesce(p_payload->>'description',category_v,'Other income')),1000); reference_v:=left(trim(coalesce(p_payload->>'reference','')),300); note_v:=left(trim(coalesce(p_payload->>'note',p_payload->>'notes','')),2000);
 insert into public.transactions(txn_id,txn_date,member_id,type,category,description,direction,amount,principal_amount,profit_amount,penalty_amount,payment_account_id,payment_method,reference,related_id,receipt_id,status,parent_txn_id,correction_reason,created_at,created_by,updated_at,updated_by,note_purpose)
 values(txn_id_v,date_v,coalesce(p_payload->>'memberId',''),'INCOME','INCOME',description_v,'CREDIT',amount_v,0,amount_v,0,account.account_id,coalesce(nullif(p_payload->>'paymentMethod',''),account.type),reference_v,income_id_v,'','POSTED','','',now(),p_user_id,now(),p_user_id,note_v);
 insert into public.income(income_id,date,category,amount,account_id,reference,description,txn_id,status,created_at,created_by,income_type,profit_id,voucher_id,client_request_id,note,updated_at,updated_by)
 values(income_id_v,date_v,category_v,amount_v,account.account_id,reference_v,description_v,txn_id_v,'POSTED',now(),p_user_id,income_type_v,'',voucher_id_v,client_v,note_v,now(),p_user_id);
 insert into public.vouchers(voucher_id,txn_id,date,type,payee,member_id,amount,purpose,account_id,reference,status,created_at,created_by)
 values(voucher_id_v,txn_id_v,date_v,case when income_type_v='DISTRIBUTABLE_PROFIT' then 'DISTRIBUTABLE_PROFIT_INCOME' else 'INCOME' end,coalesce(p_payload->>'payee',p_payload->>'source',case when source.source_id is not null then source.source_name else 'Income Source' end),coalesce(p_payload->>'memberId',''),amount_v,description_v,account.account_id,reference_v,'POSTED',now(),p_user_id);
 perform public.nd_post_journal(p_user_id,txn_id_v,date_v,jsonb_build_array(jsonb_build_object('accountCode',account.account_code,'debit',amount_v,'credit',0),jsonb_build_object('accountCode',income_coa.account_code,'debit',0,'credit',amount_v)),coalesce(p_payload->>'memberId',''),income_id_v,description_v);
 if income_type_v='DISTRIBUTABLE_PROFIT' then
   profit_payload:=p_payload||jsonb_build_object('sourceId',source.source_id,'investmentId',investment_v,'category',coalesce(nullif(p_payload->>'profitCategory',''),source.category),'profitDate',date_v,'amount',amount_v,'sourceTxnId',txn_id_v,'sourceIncomeId',income_id_v,'sourceVoucherId',voucher_id_v,'reference',reference_v,'notes',note_v);
   profit_id_v:=public.nd_create_profit_record_core(p_user_id,profit_payload);
   update public.income set profit_id=profit_id_v,updated_at=now(),updated_by=p_user_id where income_id=income_id_v;
 end if;
 perform public.nd_create_audit(p_user_id,'CREATE','INCOME',income_id_v,'{}'::jsonb,jsonb_build_object('txnId',txn_id_v,'voucherId',voucher_id_v,'incomeType',income_type_v,'profitId',profit_id_v),case when income_type_v='DISTRIBUTABLE_PROFIT' then 'Distributable profit income posted' else 'General income posted' end);
 return jsonb_build_object('ok',true,'duplicate',false,'incomeId',income_id_v,'txnId',txn_id_v,'voucherId',voucher_id_v,'profitId',profit_id_v,'incomeType',income_type_v);
end $$;

-- Existing rows written by the pre-fix migration used NONE for normal expenses.
-- Original v1.1.6 semantics are NORMAL.
update public.expenses
set allocation_method='NORMAL'
where coalesce(allocation_method,'') in ('','NONE')
  and coalesce(allocation_status,'NOT_APPLICABLE')<>'POSTED';

commit;
