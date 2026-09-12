-- Additional v1.1.6 parity rules: reversal, withdrawal, transfer, unit-based expense allocation.

create or replace function public.nd_reverse_transaction(p_user_id text,p_txn_id text,p_reason text)
returns text language plpgsql security definer set search_path=public as $$
declare t public.transactions; existing text; rev_id text; g record; lines jsonb:='[]'::jsonb;
begin
 if trim(coalesce(p_reason,''))='' then raise exception 'Reversal reason required.'; end if;
 select * into t from public.transactions where txn_id=p_txn_id for update;
 if t.txn_id is null then raise exception 'Transaction required for reversal.'; end if;
 select txn_id into existing from public.transactions where parent_txn_id=t.txn_id and type='REVERSAL_'||t.type and status='POSTED' limit 1;
 if existing is not null then return existing; end if;
 rev_id:=public.nd_next_id('TXN','TRX-',8);
 insert into public.transactions(txn_id,txn_date,member_id,type,category,description,direction,amount,principal_amount,profit_amount,penalty_amount,payment_account_id,payment_method,reference,related_id,receipt_id,status,parent_txn_id,correction_reason,created_at,created_by,updated_at,updated_by,note_purpose)
 values(rev_id,t.txn_date,t.member_id,'REVERSAL_'||t.type,t.category,'Reversal: '||coalesce(t.description,''),case t.direction when 'CREDIT' then 'DEBIT' when 'DEBIT' then 'CREDIT' else 'REVERSAL' end,t.amount,t.principal_amount,t.profit_amount,t.penalty_amount,t.payment_account_id,t.payment_method,t.reference,t.related_id,'','POSTED',t.txn_id,p_reason,now(),p_user_id,now(),p_user_id,t.note_purpose);
 for g in select account_code,credit,debit from public.general_ledger where txn_id=t.txn_id order by created_at loop
   lines:=lines||jsonb_build_array(jsonb_build_object('accountCode',g.account_code,'debit',g.credit,'credit',g.debit));
 end loop;
 if jsonb_array_length(lines)>0 then perform public.nd_post_journal(p_user_id,rev_id,t.txn_date,lines,t.member_id,t.related_id,'Reversal: '||coalesce(t.description,'')); end if;
 return rev_id;
end $$;

create or replace function public.nd_withdraw_savings(p_user_id text,p_payload jsonb)
returns jsonb language plpgsql security definer set search_path=public as $$
declare m public.members; amount_v numeric; balance_v numeric; account public.bank_accounts; account_balance numeric; txn_id_v text; voucher_id_v text; date_v date; desc_v text;
begin
 select * into m from public.members where member_id=p_payload->>'memberId'; if m.member_id is null then raise exception 'Member not found.'; end if;
 amount_v:=round(coalesce((p_payload->>'amount')::numeric,0),2); if amount_v<=0 then raise exception 'Amount required.'; end if;
 balance_v:=public.nd_member_savings_balance(m.member_id); if amount_v>balance_v+0.009 then raise exception 'Insufficient member savings balance. Current balance: %',balance_v; end if;
 select * into account from public.bank_accounts where account_id=coalesce(nullif(p_payload->>'accountId',''),'ACC-CASH') and status='ACTIVE'; if account.account_id is null then raise exception 'Payment account not found.'; end if;
 account_balance:=public.nd_account_balance(account.account_id); if amount_v>account_balance+0.01 then raise exception 'Savings withdrawal exceeds available % balance: %',account.account_name,account_balance; end if;
 txn_id_v:=public.nd_next_id('TXN','TRX-',8); voucher_id_v:=public.nd_next_voucher_id(); date_v:=coalesce(nullif(p_payload->>'date','')::date,public.nd_today()); desc_v:=coalesce(nullif(p_payload->>'description',''),'সঞ্চয় উত্তোলন');
 insert into public.transactions(txn_id,txn_date,member_id,type,category,description,direction,amount,principal_amount,profit_amount,penalty_amount,payment_account_id,payment_method,reference,related_id,receipt_id,status,parent_txn_id,correction_reason,created_at,created_by,updated_at,updated_by)
 values(txn_id_v,date_v,m.member_id,'SAVINGS_WITHDRAWAL','SAVINGS',desc_v,'DEBIT',amount_v,amount_v,0,0,account.account_id,coalesce(nullif(p_payload->>'paymentMethod',''),account.type),coalesce(p_payload->>'reference',''),voucher_id_v,'','POSTED','','',now(),p_user_id,now(),p_user_id);
 insert into public.vouchers(voucher_id,txn_id,date,type,payee,member_id,amount,purpose,account_id,reference,status,created_at,created_by)
 values(voucher_id_v,txn_id_v,date_v,'SAVINGS_WITHDRAWAL',coalesce(nullif(m.name_bn,''),m.name_en),m.member_id,amount_v,desc_v,account.account_id,coalesce(p_payload->>'reference',''),'POSTED',now(),p_user_id);
 perform public.nd_post_journal(p_user_id,txn_id_v,date_v,jsonb_build_array(jsonb_build_object('accountCode',(public.nd_coa_by_system('MEMBER_SAVINGS')).account_code,'debit',amount_v,'credit',0),jsonb_build_object('accountCode',account.account_code,'debit',0,'credit',amount_v)),m.member_id,voucher_id_v,desc_v);
 perform public.nd_create_notification(m.member_id,'WITHDRAWAL','সঞ্চয় উত্তোলন',amount_v||' টাকা উত্তোলন করা হয়েছে।');
 perform public.nd_create_audit(p_user_id,'WITHDRAW','TRANSACTION',txn_id_v,'{}'::jsonb,(select to_jsonb(t) from public.transactions t where txn_id=txn_id_v),coalesce(p_payload->>'reason','Savings withdrawal'));
 return jsonb_build_object('ok',true,'txnId',txn_id_v,'voucherId',voucher_id_v);
end $$;

create or replace function public.nd_transfer_funds(p_user_id text,p_payload jsonb)
returns jsonb language plpgsql security definer set search_path=public as $$
declare amount_v numeric; from_a public.bank_accounts; to_a public.bank_accounts; source_balance numeric; txn_id_v text; date_v date; desc_v text;
begin
 amount_v:=round(coalesce((p_payload->>'amount')::numeric,0),2); if amount_v<=0 then raise exception 'Amount required.'; end if;
 select * into from_a from public.bank_accounts where account_id=p_payload->>'fromAccountId' and status='ACTIVE'; select * into to_a from public.bank_accounts where account_id=p_payload->>'toAccountId' and status='ACTIVE';
 if from_a.account_id is null or to_a.account_id is null then raise exception 'Account not found.'; end if; if from_a.account_id=to_a.account_id then raise exception 'Source and destination must differ.'; end if;
 source_balance:=public.nd_account_balance(from_a.account_id); if amount_v>source_balance+0.01 then raise exception 'Insufficient source account balance: %',source_balance; end if;
 txn_id_v:=public.nd_next_id('TXN','TRX-',8); date_v:=coalesce(nullif(p_payload->>'date','')::date,public.nd_today()); desc_v:=coalesce(nullif(p_payload->>'description',''),'Transfer '||from_a.account_name||' to '||to_a.account_name);
 insert into public.transactions(txn_id,txn_date,member_id,type,category,description,direction,amount,principal_amount,profit_amount,penalty_amount,payment_account_id,payment_method,reference,related_id,receipt_id,status,parent_txn_id,correction_reason,created_at,created_by,updated_at,updated_by)
 values(txn_id_v,date_v,'','ACCOUNT_TRANSFER','TRANSFER',desc_v,'TRANSFER',amount_v,0,0,0,from_a.account_id,'TRANSFER',coalesce(p_payload->>'reference',''),to_a.account_id,'','POSTED','','',now(),p_user_id,now(),p_user_id);
 perform public.nd_post_journal(p_user_id,txn_id_v,date_v,jsonb_build_array(jsonb_build_object('accountCode',to_a.account_code,'debit',amount_v,'credit',0),jsonb_build_object('accountCode',from_a.account_code,'debit',0,'credit',amount_v)),'',to_a.account_id,'Account transfer');
 perform public.nd_create_audit(p_user_id,'TRANSFER','TRANSACTION',txn_id_v,'{}'::jsonb,p_payload,'Account transfer');
 return jsonb_build_object('ok',true,'txnId',txn_id_v);
end $$;

create or replace function public.nd_preview_unit_expense(p_amount numeric,p_date date default public.nd_today())
returns jsonb language plpgsql as $$
declare total_units numeric; total_cents bigint; total_rate bigint:=10000; allocated numeric; rows_v jsonb; insufficient_v jsonb;
begin
 p_amount:=round(coalesce(p_amount,0),2); if p_amount<=0 then raise exception 'Amount required.'; end if;
 create temporary table if not exists nd_exp_tmp(member_id text primary key,name text,units numeric,amount numeric,rate numeric,savings_before numeric,savings_after numeric,insufficient boolean) on commit drop; truncate nd_exp_tmp;
 insert into nd_exp_tmp(member_id,name,units,amount,rate,savings_before,savings_after,insufficient)
 select m.member_id,coalesce(nullif(m.name_bn,''),m.name_en,m.member_id),coalesce((select su.units from public.savings_units su where su.member_id=m.member_id and su.status='ACTIVE' and su.effective_from<=coalesce(p_date,public.nd_today()) and (su.effective_to is null or su.effective_to>=coalesce(p_date,public.nd_today())) order by su.effective_from desc limit 1),0),0,0,public.nd_member_savings_balance(m.member_id),0,false from public.members m where m.status='ACTIVE';
 if not exists(select 1 from nd_exp_tmp) then raise exception 'No active members are available for unit-based allocation.'; end if;
 if exists(select 1 from nd_exp_tmp where units<0) then raise exception 'Negative savings units are not allowed.'; end if;
 select round(sum(units),2) into total_units from nd_exp_tmp; if coalesce(total_units,0)<=0 then raise exception 'Total units cannot be zero.'; end if; total_cents:=round(p_amount*100);
 with x as (select member_id,floor(total_cents*units/total_units)::bigint base,total_cents*units/total_units-floor(total_cents*units/total_units) rem from nd_exp_tmp), y as (select *,row_number() over(order by (units>0) desc,rem desc,member_id) rn,sum(base) over() used from x) update nd_exp_tmp t set amount=(y.base+case when y.rn<=total_cents-y.used then 1 else 0 end)/100.0 from y where t.member_id=y.member_id;
 with x as (select member_id,floor(total_rate*units/total_units)::bigint base,total_rate*units/total_units-floor(total_rate*units/total_units) rem from nd_exp_tmp), y as (select *,row_number() over(order by (units>0) desc,rem desc,member_id) rn,sum(base) over() used from x) update nd_exp_tmp t set rate=(y.base+case when y.rn<=total_rate-y.used then 1 else 0 end)/100.0 from y where t.member_id=y.member_id;
 update nd_exp_tmp set savings_after=round(savings_before-amount,2),insufficient=amount>savings_before+0.009;
 select round(coalesce(sum(amount),0),2) into allocated from nd_exp_tmp;
 select coalesce(jsonb_agg(jsonb_build_object('memberId',member_id,'name',name,'basis',units,'units',units,'amount',amount,'rate',rate,'totalUnits',total_units,'unitPercentage',rate,'savingsBefore',savings_before,'savingsAfter',savings_after,'insufficient',insufficient) order by member_id),'[]'::jsonb) into rows_v from nd_exp_tmp;
 select coalesce(jsonb_agg(jsonb_build_object('memberId',member_id,'name',name,'required',amount,'available',savings_before,'shortage',round(amount-savings_before,2)) order by member_id),'[]'::jsonb) into insufficient_v from nd_exp_tmp where insufficient;
 return jsonb_build_object('allocationMethod','UNIT_BASED','date',coalesce(p_date,public.nd_today()),'totalExpense',p_amount,'totalUnits',total_units,'memberCount',(select count(*) from nd_exp_tmp),'allocatedMemberCount',(select count(*) from nd_exp_tmp where amount>0),'percentageTotal',(select round(sum(rate),2) from nd_exp_tmp),'allocatedAmount',allocated,'unallocatedAmount',round(p_amount-allocated,2),'insufficientMembers',insufficient_v,'canPost',jsonb_array_length(insufficient_v)=0 and abs(p_amount-allocated)<0.009,'rows',rows_v);
end $$;

create or replace function public.nd_create_unit_expense(p_user_id text,p_payload jsonb)
returns jsonb language plpgsql security definer set search_path=public as $$
declare amount_v numeric; client_v text; dup public.expenses; account public.bank_accounts; balance_v numeric; expense_coa public.chart_of_accounts; date_v date; preview jsonb; txn_id_v text; expense_id_v text; voucher_id_v text; desc_v text; reference_v text; row_v jsonb; alloc_id_v text; child_txn text; savings public.chart_of_accounts; surplus public.chart_of_accounts;
begin
 amount_v:=round(coalesce((p_payload->>'amount')::numeric,0),2); if amount_v<=0 then raise exception 'Amount required.'; end if;
 client_v:=left(trim(coalesce(p_payload->>'clientRequestId','')),120); if client_v='' then raise exception 'Client request ID is required for duplicate-safe unit allocation.'; end if;
 select * into dup from public.expenses where client_request_id=client_v limit 1; if dup.expense_id is not null then return jsonb_build_object('ok',true,'duplicate',true,'expenseId',dup.expense_id,'txnId',dup.txn_id,'voucherId',dup.voucher_id,'allocationMethod',dup.allocation_method); end if;
 select * into account from public.bank_accounts where account_id=coalesce(nullif(p_payload->>'accountId',''),'ACC-CASH') and status='ACTIVE'; if account.account_id is null then raise exception 'Payment account not found.'; end if; balance_v:=public.nd_account_balance(account.account_id); if amount_v>balance_v+0.01 then raise exception 'Expense exceeds available % balance: %',account.account_name,balance_v; end if;
 expense_coa:=public.nd_coa_by_system(coalesce(nullif(p_payload->>'systemExpenseAccount',''),case upper(coalesce(p_payload->>'category','')) when 'BANK_CHARGE' then 'BANK_CHARGE_EXPENSE' when 'LEGAL' then 'LEGAL_EXPENSE' when 'OTHER' then 'OTHER_EXPENSE' else 'OPERATING_EXPENSE' end)); date_v:=coalesce(nullif(p_payload->>'date','')::date,public.nd_today()); preview:=public.nd_preview_unit_expense(amount_v,date_v); if jsonb_array_length(preview->'insufficientMembers')>0 then raise exception 'অপর্যাপ্ত সঞ্চয়: %',preview->'insufficientMembers'; end if; if coalesce((preview->>'canPost')::boolean,false)=false then raise exception 'Unit allocation could not be reconciled exactly.'; end if;
 txn_id_v:=public.nd_next_id('TXN','TRX-',8); expense_id_v:=public.nd_next_id('EXPENSE','EXP-',7); voucher_id_v:=public.nd_next_voucher_id(); desc_v:=left(trim(coalesce(p_payload->>'description',p_payload->>'category','Expense')),1000); reference_v:=left(trim(coalesce(p_payload->>'reference','')),300);
 insert into public.transactions(txn_id,txn_date,member_id,type,category,description,direction,amount,principal_amount,profit_amount,penalty_amount,payment_account_id,payment_method,reference,related_id,receipt_id,status,parent_txn_id,correction_reason,created_at,created_by,updated_at,updated_by) values(txn_id_v,date_v,'','EXPENSE','EXPENSE',desc_v,'DEBIT',amount_v,0,0,0,account.account_id,coalesce(nullif(p_payload->>'paymentMethod',''),account.type),reference_v,expense_id_v,'','POSTED','','',now(),p_user_id,now(),p_user_id);
 insert into public.expenses(expense_id,date,category,amount,account_id,reference,description,document_file_id,txn_id,status,approval_status,created_at,created_by,updated_at,updated_by,allocation_method,total_units,member_count,allocated_amount,voucher_id,client_request_id,allocation_status) values(expense_id_v,date_v,coalesce(p_payload->>'category','OPERATING'),amount_v,account.account_id,reference_v,desc_v,'',txn_id_v,'POSTED','APPROVED',now(),p_user_id,now(),p_user_id,'UNIT_BASED',(preview->>'totalUnits')::numeric,(preview->>'memberCount')::integer,(preview->>'allocatedAmount')::numeric,voucher_id_v,client_v,'POSTED');
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
