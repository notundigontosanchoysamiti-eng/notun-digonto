-- Core v1.1.6-compatible business rules.
-- These functions intentionally keep the legacy accounting semantics while using PostgreSQL transactions.

create or replace function public.nd_config(p_key text, p_fallback text default '')
returns text language sql stable as $$
  select coalesce((select value from public.config where key=p_key), p_fallback)
$$;

create or replace function public.nd_num_config(p_key text, p_fallback numeric default 0)
returns numeric language plpgsql stable as $$
declare v text;
begin
  v := public.nd_config(p_key, p_fallback::text);
  begin return v::numeric; exception when others then return p_fallback; end;
end $$;

create or replace function public.nd_today()
returns date language sql stable as $$
  select (now() at time zone 'Asia/Dhaka')::date
$$;

create or replace function public.nd_month_key(p_date date default public.nd_today())
returns text language sql immutable as $$ select to_char(p_date,'YYYY-MM') $$;

create or replace function public.nd_next_id(p_sequence_key text, p_prefix text, p_width integer)
returns text language plpgsql security definer set search_path=public as $$
declare n bigint;
begin
  insert into public.sequences(sequence_key,value) values(p_sequence_key,1)
  on conflict(sequence_key) do update set value=public.sequences.value+1
  returning value into n;
  return coalesce(p_prefix,'') || lpad(n::text,p_width,'0');
end $$;

create or replace function public.nd_next_member_id(p_join_date date)
returns text language plpgsql security definer set search_path=public as $$
declare y text; n text;
begin
  y := to_char(coalesce(p_join_date,public.nd_today()),'YYYY');
  n := public.nd_next_id('MEMBER_'||y,'',4);
  return public.nd_config('MEMBER_ID_PREFIX','NDS')||'-'||y||'-'||n;
end $$;

create or replace function public.nd_next_receipt_id()
returns text language plpgsql security definer set search_path=public as $$
declare y text;
begin
  y:=to_char(public.nd_today(),'YYYY');
  return public.nd_config('RECEIPT_PREFIX','NDS-RCP')||'-'||y||'-'||public.nd_next_id('RECEIPT_'||y,'',6);
end $$;

create or replace function public.nd_next_voucher_id()
returns text language plpgsql security definer set search_path=public as $$
declare y text;
begin
  y:=to_char(public.nd_today(),'YYYY');
  return public.nd_config('VOUCHER_PREFIX','NDS-VCH')||'-'||y||'-'||public.nd_next_id('VOUCHER_'||y,'',6);
end $$;

create or replace function public.nd_mobile_search_key(p_value text)
returns text language plpgsql immutable as $$
declare d text;
begin
  d:=regexp_replace(coalesce(trim(p_value),''),'\D','','g');
  if d='' then return ''; end if;
  if left(d,5)='00880' then d:=substr(d,3); end if;
  if left(d,3)='880' and length(d)=13 and substr(d,4,1)='1' then return '0'||substr(d,4); end if;
  if length(d)=10 and left(d,1)='1' then return '0'||d; end if;
  return d;
end $$;

create or replace function public.nd_due_date_for_month(p_month text)
returns date language plpgsql stable as $$
declare d integer; first_day date; last_day date;
begin
  if p_month !~ '^\d{4}-(0[1-9]|1[0-2])$' then raise exception 'Invalid due month'; end if;
  first_day := (p_month||'-01')::date;
  last_day := (first_day + interval '1 month - 1 day')::date;
  d := greatest(1,least(31,public.nd_num_config('MONTHLY_DUE_DAY',10)::integer));
  return make_date(extract(year from first_day)::integer,extract(month from first_day)::integer,least(d,extract(day from last_day)::integer));
end $$;

create or replace function public.nd_late_fee_total(p_units numeric,p_due_date date,p_fee numeric)
returns numeric language sql stable as $$
  select round(case when public.nd_today()>p_due_date then greatest(0,coalesce(p_units,0))*greatest(0,coalesce(p_fee,0)) else 0 end,2)
$$;

create or replace function public.nd_create_audit(p_user_id text,p_action text,p_entity_type text,p_entity_id text,p_old jsonb,p_new jsonb,p_reason text default '')
returns text language plpgsql security definer set search_path=public as $$
declare id text;
begin
 id:=public.nd_next_id('AUDIT','AUD-',8);
 insert into public.audit_log(audit_id,user_id,action,entity_type,entity_id,old_value,new_value,reason,ip_hint,created_at)
 values(id,coalesce(p_user_id,'SYSTEM'),p_action,p_entity_type,p_entity_id,coalesce(p_old,'{}'::jsonb)::text,coalesce(p_new,'{}'::jsonb)::text,coalesce(p_reason,''),'',now());
 return id;
end $$;

create or replace function public.nd_create_notification(p_member_id text,p_type text,p_title text,p_message text)
returns integer language plpgsql security definer set search_path=public as $$
declare u record; n integer:=0; id text;
begin
 for u in select user_id,member_id from public.users where status='ACTIVE' and ((coalesce(p_member_id,'')<>'' and member_id=p_member_id) or (coalesce(p_member_id,'')='' and role_id='ADMIN')) loop
   id:=public.nd_next_id('NOTIFICATION','NTF-',7);
   insert into public.notifications(notification_id,user_id,member_id,type,title,message,status,created_at)
   values(id,u.user_id,coalesce(p_member_id,u.member_id,''),coalesce(p_type,'INFO'),left(coalesce(p_title,''),160),left(coalesce(p_message,''),2000),'UNREAD',now()); n:=n+1;
 end loop;
 if n=0 and coalesce(p_member_id,'')<>'' then
   id:=public.nd_next_id('NOTIFICATION','NTF-',7);
   insert into public.notifications(notification_id,user_id,member_id,type,title,message,status,created_at)
   values(id,'',p_member_id,coalesce(p_type,'INFO'),left(coalesce(p_title,''),160),left(coalesce(p_message,''),2000),'UNREAD',now()); n:=1;
 end if;
 return n;
end $$;

create or replace function public.nd_coa_by_system(p_system text)
returns public.chart_of_accounts language sql stable as $$
 select * from public.chart_of_accounts where system_account=p_system and status='ACTIVE' limit 1
$$;

create or replace function public.nd_account_balance(p_account_id text)
returns numeric language sql stable as $$
  select round(coalesce(a.opening_balance,0)+coalesce(sum(case when t.status in ('POSTED','CORRECTED','REVERSED') then coalesce(g.debit,0)-coalesce(g.credit,0) else 0 end),0),2)
  from public.bank_accounts a
  left join public.general_ledger g on g.account_code=a.account_code
  left join public.transactions t on t.txn_id=g.txn_id
  where a.account_id=p_account_id and a.status='ACTIVE'
  group by a.account_id,a.opening_balance
$$;

create or replace function public.nd_post_journal(
 p_user_id text,p_txn_id text,p_date date,p_lines jsonb,p_member_id text default '',p_related_id text default '',p_description text default '')
returns text language plpgsql security definer set search_path=public as $$
declare line jsonb; debit_total numeric:=0; credit_total numeric:=0; entry_id text; gl_id text; code text; coa public.chart_of_accounts;
begin
 for line in select * from jsonb_array_elements(coalesce(p_lines,'[]'::jsonb)) loop
   debit_total:=debit_total+coalesce((line->>'debit')::numeric,0); credit_total:=credit_total+coalesce((line->>'credit')::numeric,0);
 end loop;
 if abs(round(debit_total,2)-round(credit_total,2))>0.01 then raise exception 'Unbalanced journal: % != %',debit_total,credit_total; end if;
 entry_id:=public.nd_next_id('JOURNAL','JRN-',8);
 for line in select * from jsonb_array_elements(coalesce(p_lines,'[]'::jsonb)) loop
   code:=line->>'accountCode'; select * into coa from public.chart_of_accounts where account_code=code and status='ACTIVE' limit 1;
   if coa.account_code is null then raise exception 'Chart of account not found: %',code; end if;
   gl_id:=public.nd_next_id('GL','GL-',9);
   insert into public.general_ledger(gl_id,entry_id,txn_id,entry_date,account_code,account_name,debit,credit,member_id,related_id,description,created_at,created_by)
   values(gl_id,entry_id,p_txn_id,p_date,coa.account_code,coa.account_name,round(coalesce((line->>'debit')::numeric,0),2),round(coalesce((line->>'credit')::numeric,0),2),coalesce(p_member_id,''),coalesce(p_related_id,''),coalesce(p_description,''),now(),coalesce(p_user_id,'SYSTEM'));
 end loop;
 return entry_id;
end $$;

create or replace function public.nd_member_savings_balance(p_member_id text)
returns numeric language sql stable as $$
 select round(coalesce(sum(case when direction='CREDIT' then amount else -amount end),0),2)
 from public.transactions
 where member_id=p_member_id and category='SAVINGS' and status in ('POSTED','CORRECTED','REVERSED')
$$;

create or replace function public.nd_current_due_balance(p_member_id text)
returns numeric language sql stable as $$
 select round(coalesce(sum(greatest(0,balance)),0),2)
 from public.monthly_dues
 where member_id=p_member_id and status<>'MERGED'
   and due_month>=public.nd_config('SOCIETY_START_MONTH','2026-08')
   and due_month<=public.nd_month_key(public.nd_today())
$$;

create or replace function public.nd_savings_advance(p_member_id text)
returns numeric language sql stable as $$
 with c as (
  select coalesce(sum(case when direction='CREDIT' then amount else -amount end),0) v
  from public.transactions where member_id=p_member_id and category='SAVINGS' and type in ('MONTHLY_SAVINGS','REVERSAL_MONTHLY_SAVINGS') and status in ('POSTED','CORRECTED','REVERSED')
 ), a as (
  select coalesce(sum(paid_amount+advance_applied),0) v from public.monthly_dues where member_id=p_member_id
 ) select round(greatest(0,c.v-a.v),2) from c,a
$$;

create or replace function public.nd_savings_unit_for_month(p_member_id text,p_month text)
returns public.savings_units language plpgsql stable as $$
declare r public.savings_units; start_month text;
begin
 start_month:=public.nd_config('SOCIETY_START_MONTH','2026-08'); if p_month<start_month then return null; end if;
 select * into r from public.savings_units
 where member_id=p_member_id and status='ACTIVE'
   and (effective_from is null or to_char(effective_from,'YYYY-MM')<=p_month)
   and (effective_to is null or to_char(effective_to,'YYYY-MM')>=p_month)
 order by effective_from desc nulls last limit 1;
 if r.unit_id is not null then return r; end if;
 select * into r from public.savings_units where member_id=p_member_id and status='ACTIVE' order by effective_from asc nulls last limit 1;
 if r.unit_id is not null and p_month>=start_month and to_char(r.effective_from,'YYYY-MM')>p_month then return r; end if;
 return null;
end $$;

create or replace function public.nd_ensure_monthly_due(p_member_id text,p_month text,p_user_id text default 'SYSTEM')
returns text language plpgsql security definer set search_path=public as $$
declare existing public.monthly_dues; u public.savings_units; due_id text; units_v numeric; unit_amount_v numeric; due_amount_v numeric; due_date_v date; late_v numeric; advance_v numeric; applied_v numeric; bal numeric;
begin
 if p_month !~ '^\d{4}-(0[1-9]|1[0-2])$' then raise exception 'Invalid month format. Use YYYY-MM.'; end if;
 select * into existing from public.monthly_dues where member_id=p_member_id and due_month=p_month and status<>'MERGED' limit 1 for update;
 if existing.due_id is not null then return existing.due_id; end if;
 u:=public.nd_savings_unit_for_month(p_member_id,p_month); if u.unit_id is null then return null; end if;
 units_v:=coalesce(u.units,0); unit_amount_v:=coalesce(u.unit_amount,public.nd_num_config('MONTHLY_UNIT_AMOUNT',1000)); due_amount_v:=round(units_v*unit_amount_v,2);
 due_date_v:=public.nd_due_date_for_month(p_month); late_v:=public.nd_late_fee_total(units_v,due_date_v,public.nd_num_config('LATE_FEE',0));
 advance_v:=public.nd_savings_advance(p_member_id); applied_v:=least(advance_v,due_amount_v+late_v); bal:=round(due_amount_v+late_v-applied_v,2); due_id:=public.nd_next_id('DUE','DUE-',8);
 insert into public.monthly_dues(due_id,member_id,due_month,units,unit_amount,due_amount,paid_amount,advance_applied,balance,status,due_date,late_fee,created_at,created_by,updated_at,updated_by)
 values(due_id,p_member_id,p_month,units_v,unit_amount_v,due_amount_v,0,round(applied_v,2),bal,case when bal<=0 then 'PAID' when applied_v>0 then 'PARTIAL' else 'DUE' end,due_date_v,late_v,now(),p_user_id,now(),p_user_id);
 return due_id;
end $$;

create or replace function public.nd_ensure_member_dues_through(p_member_id text,p_end_month text,p_user_id text default 'SYSTEM')
returns integer language plpgsql security definer set search_path=public as $$
declare start_month text; d date; end_d date; count_v integer:=0; id text;
begin
 start_month:=public.nd_config('SOCIETY_START_MONTH','2026-08'); if p_end_month<start_month then return 0; end if;
 d:=(start_month||'-01')::date; end_d:=(p_end_month||'-01')::date;
 while d<=end_d loop id:=public.nd_ensure_monthly_due(p_member_id,to_char(d,'YYYY-MM'),p_user_id); if id is not null then count_v:=count_v+1; end if; d:=(d+interval '1 month')::date; end loop;
 return count_v;
end $$;

create or replace function public.nd_reconcile_savings_dues(p_member_id text,p_user_id text default 'SYSTEM')
returns jsonb language plpgsql security definer set search_path=public as $$
declare d public.monthly_dues; u public.savings_units; total_net numeric:=0; effective_direct numeric:=0; pool numeric:=0; direct numeric; gross numeric; need numeric; adv numeric; units_v numeric; unit_amount_v numeric; due_amount_v numeric; due_date_v date; late_v numeric; bal numeric;
begin
 select coalesce(sum(case when direction='CREDIT' then amount else -amount end),0) into total_net
 from public.transactions where member_id=p_member_id and category='SAVINGS' and type in ('MONTHLY_SAVINGS','REVERSAL_MONTHLY_SAVINGS') and status in ('POSTED','CORRECTED','REVERSED');
 for d in select * from public.monthly_dues where member_id=p_member_id and status<>'MERGED' order by due_month for update loop
   u:=public.nd_savings_unit_for_month(p_member_id,d.due_month); units_v:=coalesce(u.units,d.units); unit_amount_v:=coalesce(u.unit_amount,d.unit_amount,public.nd_num_config('MONTHLY_UNIT_AMOUNT',1000)); due_amount_v:=round(units_v*unit_amount_v,2); due_date_v:=coalesce(d.due_date,public.nd_due_date_for_month(d.due_month)); late_v:=public.nd_late_fee_total(units_v,due_date_v,public.nd_num_config('LATE_FEE',0)); gross:=round(due_amount_v+late_v,2);
   select coalesce(sum(case when direction='CREDIT' then coalesce(principal_amount,amount) else -coalesce(principal_amount,amount) end),0) into direct
   from public.transactions where member_id=p_member_id and related_id=d.due_id and category='SAVINGS' and type in ('MONTHLY_SAVINGS','REVERSAL_MONTHLY_SAVINGS') and status in ('POSTED','CORRECTED','REVERSED');
   effective_direct:=effective_direct+least(greatest(0,direct),gross);
 end loop;
 pool:=greatest(0,round(total_net-effective_direct,2));
 for d in select * from public.monthly_dues where member_id=p_member_id and status<>'MERGED' order by due_month for update loop
   u:=public.nd_savings_unit_for_month(p_member_id,d.due_month); units_v:=coalesce(u.units,d.units); unit_amount_v:=coalesce(u.unit_amount,d.unit_amount,public.nd_num_config('MONTHLY_UNIT_AMOUNT',1000)); due_amount_v:=round(units_v*unit_amount_v,2); due_date_v:=coalesce(d.due_date,public.nd_due_date_for_month(d.due_month)); late_v:=public.nd_late_fee_total(units_v,due_date_v,public.nd_num_config('LATE_FEE',0)); gross:=round(due_amount_v+late_v,2);
   select coalesce(sum(case when direction='CREDIT' then coalesce(principal_amount,amount) else -coalesce(principal_amount,amount) end),0) into direct from public.transactions where member_id=p_member_id and related_id=d.due_id and category='SAVINGS' and type in ('MONTHLY_SAVINGS','REVERSAL_MONTHLY_SAVINGS') and status in ('POSTED','CORRECTED','REVERSED');
   direct:=least(greatest(0,round(direct,2)),gross); need:=greatest(0,gross-direct); adv:=least(pool,need); pool:=round(pool-adv,2); bal:=round(greatest(0,gross-direct-adv),2);
   update public.monthly_dues set units=units_v,unit_amount=unit_amount_v,due_amount=due_amount_v,late_fee=late_v,paid_amount=direct,advance_applied=round(adv,2),balance=bal,status=case when bal<=0 then 'PAID' when direct+adv>0 then 'PARTIAL' else 'DUE' end,due_date=due_date_v,updated_at=now(),updated_by=p_user_id where due_id=d.due_id;
 end loop;
 return jsonb_build_object('advance',round(pool,2),'mergedRows',0);
end $$;

create or replace function public.nd_change_savings_units(p_user_id text,p_member_id text,p_units integer,p_effective_from date,p_reason text default '')
returns jsonb language plpgsql security definer set search_path=public as $$
declare cur public.savings_units; delta integer; new_unit_id text; outrow public.savings_units;
begin
 if p_units<1 then raise exception 'Savings unit must be at least 1.'; end if; p_effective_from:=coalesce(p_effective_from,public.nd_today());
 select * into cur from public.savings_units where member_id=p_member_id and status='ACTIVE' and effective_from<=p_effective_from and (effective_to is null or effective_to>=p_effective_from) order by effective_from desc limit 1 for update;
 if cur.unit_id is not null and cur.units=p_units then return to_jsonb(cur); end if;
 if cur.unit_id is not null and p_units>cur.units then
   delta:=p_units-cur.units; update public.savings_units set units=units+delta,updated_at=now(),updated_by=p_user_id,notes=left(coalesce(notes,'')||' | Historical unit increase +'||delta||' from '||public.nd_config('SOCIETY_START_MONTH','2026-08'),1000) where member_id=p_member_id and status='ACTIVE';
   perform public.nd_ensure_member_dues_through(p_member_id,public.nd_month_key(public.nd_today()),p_user_id); perform public.nd_reconcile_savings_dues(p_member_id,p_user_id);
   select * into outrow from public.savings_units where unit_id=cur.unit_id;
   perform public.nd_create_audit(p_user_id,'UNIT_INCREASE_RETROACTIVE','MEMBER',p_member_id,to_jsonb(cur),to_jsonb(outrow),coalesce(p_reason,'Savings units increased'));
   return to_jsonb(outrow);
 end if;
 if cur.unit_id is not null then update public.savings_units set effective_to=p_effective_from-1,updated_at=now(),updated_by=p_user_id where unit_id=cur.unit_id; end if;
 new_unit_id:=public.nd_next_id('UNIT','UNT-',7);
 insert into public.savings_units(unit_id,member_id,units,unit_amount,effective_from,effective_to,status,notes,created_at,created_by,updated_at,updated_by)
 values(new_unit_id,p_member_id,p_units,public.nd_num_config('MONTHLY_UNIT_AMOUNT',1000),p_effective_from,null,'ACTIVE',coalesce(p_reason,''),now(),p_user_id,now(),p_user_id);
 perform public.nd_ensure_member_dues_through(p_member_id,public.nd_month_key(public.nd_today()),p_user_id); perform public.nd_reconcile_savings_dues(p_member_id,p_user_id);
 select * into outrow from public.savings_units where unit_id=new_unit_id; perform public.nd_create_audit(p_user_id,'UNIT_CHANGE','MEMBER',p_member_id,to_jsonb(cur),to_jsonb(outrow),coalesce(p_reason,'Savings units changed')); return to_jsonb(outrow);
end $$;

create or replace function public.nd_create_member_core(p_user_id text,p_auth_uid uuid,p_username text,p_payload jsonb)
returns jsonb language plpgsql security definer set search_path=public as $$
declare name_bn text; mobile_v text; alt_mobile_v text; nid_v text; email_v text; join_v date; member_id_v text; member_no_v text; user_id_v text; unit_id_v text; units_v integer; unit_amt numeric; start_month text; temp_due_count integer; nominee jsonb; nominee_id_v text;
begin
 name_bn:=trim(coalesce(p_payload->>'nameBn','')); if name_bn='' then raise exception 'সদস্যের নাম আবশ্যক।'; end if;
 mobile_v:=trim(coalesce(p_payload->>'mobile','')); if mobile_v='' or mobile_v !~ '^\+?[0-9][0-9\s().-]{6,20}$' then raise exception 'মোবাইল নম্বর সঠিক নয়।'; end if;
 alt_mobile_v:=trim(coalesce(p_payload->>'altMobile','')); nid_v:=regexp_replace(coalesce(p_payload->>'nid',''),'[\s-]','','g'); email_v:=lower(trim(coalesce(p_payload->>'email','')));
 if nid_v<>'' and nid_v !~ '^\d{8,20}$' then raise exception 'NID/Birth Registration নম্বর সঠিক নয়।'; end if;
 if email_v<>'' and email_v !~ '^[^\s@]+@[^\s@]+\.[^\s@]+$' then raise exception 'ইমেইল ঠিকানা সঠিক নয়।'; end if;
 if coalesce((p_payload->>'allowDuplicateMobile')::boolean,false)=false and exists(select 1 from public.members where status<>'CLOSED' and public.nd_mobile_search_key(mobile)=public.nd_mobile_search_key(mobile_v)) then raise exception 'এই মোবাইল নম্বর দিয়ে ইতোমধ্যে একজন সদস্য আছে।'; end if;
 if nid_v<>'' and exists(select 1 from public.members where status<>'CLOSED' and regexp_replace(coalesce(nid,''),'[\s-]','','g')=nid_v) then raise exception 'এই NID দিয়ে ইতোমধ্যে একজন সদস্য আছে।'; end if;
 join_v:=coalesce(nullif(p_payload->>'joinDate','')::date,public.nd_today()); member_id_v:=coalesce(nullif(p_payload->>'reservedMemberId',''),public.nd_next_member_id(join_v)); member_no_v:=split_part(member_id_v,'-',3); units_v:=greatest(1,coalesce((p_payload->>'units')::integer,1)); unit_amt:=public.nd_num_config('MONTHLY_UNIT_AMOUNT',1000); start_month:=public.nd_config('SOCIETY_START_MONTH','2026-08');
 insert into public.members(member_id,member_no,name_bn,name_en,father_name,mother_name,dob,nid,mobile,alt_mobile,email,profession,present_address,permanent_address,join_date,status,kyc_status,notes,created_at,created_by,updated_at,updated_by,blood_group)
 values(member_id_v,member_no_v,name_bn,trim(coalesce(p_payload->>'nameEn','')),coalesce(p_payload->>'fatherName',''),coalesce(p_payload->>'motherName',''),nullif(p_payload->>'dob','')::date,nid_v,mobile_v,alt_mobile_v,email_v,coalesce(p_payload->>'profession',''),coalesce(p_payload->>'presentAddress',''),coalesce(p_payload->>'permanentAddress',''),join_v,'ACTIVE',coalesce(nullif(p_payload->>'kycStatus',''),'PENDING'),coalesce(p_payload->>'notes',''),now(),p_user_id,now(),p_user_id,case when upper(coalesce(p_payload->>'bloodGroup','')) in ('A+','A-','B+','B-','AB+','AB-','O+','O-') then upper(p_payload->>'bloodGroup') else '' end);
 unit_id_v:=public.nd_next_id('UNIT','UNT-',7); insert into public.savings_units(unit_id,member_id,units,unit_amount,effective_from,status,notes,created_at,created_by,updated_at,updated_by) values(unit_id_v,member_id_v,units_v,unit_amt,(start_month||'-01')::date,'ACTIVE','Initial units effective from society start; joining date is profile information only',now(),p_user_id,now(),p_user_id);
 user_id_v:=public.nd_next_id('USER','USR-',6); insert into public.users(user_id,member_id,full_name,username,password_hash,salt,role_id,status,must_change_password,created_at,created_by,updated_at,updated_by,auth_uid) values(user_id_v,member_id_v,name_bn,p_username,'','','MEMBER','ACTIVE',true,now(),p_user_id,now(),p_user_id,p_auth_uid);
 nominee:=p_payload->'nominee'; if nominee is not null and trim(coalesce(nominee->>'name',''))<>'' then nominee_id_v:=public.nd_next_id('NOMINEE','NOM-',7); insert into public.nominees(nominee_id,member_id,name,relation,dob,nid,mobile,address,percent,status,created_at,created_by,updated_at,updated_by) values(nominee_id_v,member_id_v,nominee->>'name',coalesce(nominee->>'relation',''),nullif(nominee->>'dob','')::date,regexp_replace(coalesce(nominee->>'nid',''),'[\s-]','','g'),coalesce(nominee->>'mobile',''),coalesce(nominee->>'address',''),coalesce((nominee->>'percent')::numeric,100),'ACTIVE',now(),p_user_id,now(),p_user_id); end if;
 temp_due_count:=public.nd_ensure_member_dues_through(member_id_v,public.nd_month_key(public.nd_today()),p_user_id); perform public.nd_reconcile_savings_dues(member_id_v,p_user_id); perform public.nd_create_audit(p_user_id,'CREATE','MEMBER',member_id_v,'{}'::jsonb,(select to_jsonb(m) from public.members m where member_id=member_id_v),'New member created');
 return jsonb_build_object('ok',true,'memberId',member_id_v,'username',p_username,'dueStartMonth',start_month,'dueRowsCreated',temp_due_count,'outstandingDue',public.nd_current_due_balance(member_id_v));
end $$;

create or replace function public.nd_generate_monthly_dues(p_user_id text,p_month text)
returns jsonb language plpgsql security definer set search_path=public as $$
declare m record; c integer:=0; id text; start_month text; current_month text;
begin
 start_month:=public.nd_config('SOCIETY_START_MONTH','2026-08'); current_month:=public.nd_month_key(public.nd_today());
 if p_month<start_month then raise exception 'সমিতির মাসিক হিসাব % থেকে শুরু।',start_month; end if; if p_month>current_month then raise exception 'ভবিষ্যৎ মাসের Due আগে থেকে Generate করা হবে না।'; end if;
 for m in select member_id from public.members where status='ACTIVE' loop id:=public.nd_ensure_monthly_due(m.member_id,p_month,p_user_id); if id is not null then c:=c+1; end if; end loop;
 perform public.nd_create_audit(p_user_id,'GENERATE_DUES','MONTHLY_DUES',p_month,'{}'::jsonb,jsonb_build_object('count',c),'Manual monthly due generation'); return jsonb_build_object('ok',true,'month',p_month,'count',c);
end $$;
