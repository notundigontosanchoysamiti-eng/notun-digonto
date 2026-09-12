-- v1.1.6 defaults preserved
insert into public.config(key,value,description,updated_at,updated_by) values
('SOCIETY_NAME_BN','নতুন দিগন্ত সঞ্চয় সমিতি','সমিতির বাংলা নাম',now(),'SYSTEM'),
('SOCIETY_NAME_EN','Notun Digonto Sanchoy Samity','Society English name',now(),'SYSTEM'),
('ESTD_YEAR','2026','প্রতিষ্ঠাকাল',now(),'SYSTEM'),
('SOCIETY_START_MONTH','2026-08','সকল সদস্যের মাসিক সঞ্চয় হিসাব শুরু হওয়ার মাস (YYYY-MM)',now(),'SYSTEM'),
('TAGLINE_BN','একসাথে সঞ্চয়, উন্নত আগামীর পথে','ট্যাগলাইন',now(),'SYSTEM'),
('SOCIETY_ADDRESS','','সমিতির ঠিকানা',now(),'SYSTEM'),
('SOCIETY_MOBILE','','সমিতির যোগাযোগ নম্বর',now(),'SYSTEM'),
('SOCIETY_EMAIL','','সমিতির ইমেইল',now(),'SYSTEM'),
('MEMBER_ID_PREFIX','NDS','Member ID prefix',now(),'SYSTEM'),
('RECEIPT_PREFIX','NDS-RCP','Receipt prefix',now(),'SYSTEM'),
('VOUCHER_PREFIX','NDS-VCH','Voucher prefix',now(),'SYSTEM'),
('MONTHLY_UNIT_AMOUNT','1000','প্রতি সঞ্চয় ইউনিটের মাসিক টাকা',now(),'SYSTEM'),
('MONTHLY_DUE_DAY','10','মাসিক জমার শেষ তারিখ',now(),'SYSTEM'),
('LATE_FEE','0','বিলম্ব ফি; সাধারণ সভার সিদ্ধান্ত অনুযায়ী পরিবর্তন করুন',now(),'SYSTEM'),
('MIN_LOAN_MEMBERSHIP_MONTHS','6','ঋণের জন্য ন্যূনতম সক্রিয় সদস্যপদ (মাস)',now(),'SYSTEM'),
('SECURED_LOAN_PERCENT','80','নিজের সঞ্চয়ের সর্বোচ্চ শতাংশ পর্যন্ত সঞ্চয়-জামানত ঋণ',now(),'SYSTEM'),
('GENERAL_LOAN_SAVINGS_MULTIPLIER','2','সাধারণ ঋণে সঞ্চয়ের সর্বোচ্চ গুণ',now(),'SYSTEM'),
('GENERAL_LOAN_FUND_PERCENT','10','Loanable Fund-এর সর্বোচ্চ শতাংশ',now(),'SYSTEM'),
('DEFAULT_LOAN_ANNUAL_RATE','0','বার্ষিক ঋণ হার; চূড়ান্ত সিদ্ধান্ত না হওয়া পর্যন্ত 0',now(),'SYSTEM'),
('DEFAULT_LOAN_METHOD','REDUCING','REDUCING বা FLAT',now(),'SYSTEM'),
('WITHDRAWAL_NOTICE_DAYS','90','পূর্ণ সঞ্চয় প্রত্যাহারের প্রস্তাবিত নোটিশ দিন',now(),'SYSTEM'),
('MIN_LIQUIDITY_PERCENT','20','প্রস্তাবিত ন্যূনতম তরল তহবিল শতাংশ',now(),'SYSTEM'),
('BIG_INVESTMENT_FUND_PERCENT','50','একক প্রকল্প বড় বিনিয়োগ হিসেবে গণ্য হওয়ার সীমা',now(),'SYSTEM'),
('BIG_INVESTMENT_APPROVAL_PERCENT','75','বড় বিনিয়োগে প্রস্তাবিত সদস্য সমর্থন শতাংশ',now(),'SYSTEM'),
('FINANCIAL_YEAR_START_MONTH','1','১ = জানুয়ারি',now(),'SYSTEM'),
('CURRENCY_SYMBOL','৳','মুদ্রা প্রতীক',now(),'SYSTEM'),
('APP_LANGUAGE','bn','bn/en',now(),'SYSTEM'),
('TIMEZONE','Asia/Dhaka','Application timezone',now(),'SYSTEM'),
('SESSION_HOURS','6','Login session duration',now(),'SYSTEM'),
('LOGIN_MAX_ATTEMPTS','5','১৫ মিনিটের মধ্যে সর্বোচ্চ ভুল login attempt',now(),'SYSTEM'),
('LOGIN_LOCK_MINUTES','15','Repeated failed login-এর temporary lock duration',now(),'SYSTEM'),
('LOGIN_LOCK_RESET_AT','','Ignore failed-login attempts at or before this timestamp',now(),'SYSTEM'),
('AUTO_LOAN_STATUS','TRUE','Daily loan overdue/status refresh',now(),'SYSTEM'),
('AUTO_MONTHLY_DUE','TRUE','মাসিক Due automation',now(),'SYSTEM'),
('AUTO_DAILY_BACKUP','TRUE','Daily backup',now(),'SYSTEM'),
('DATA_FOLDER_ID','','Supabase Storage replaces Google Drive folder',now(),'SYSTEM'),
('MEMBER_PHOTO_FOLDER_ID','','Storage bucket: member-photos',now(),'SYSTEM'),
('DOCUMENT_FOLDER_ID','','Storage bucket: documents',now(),'SYSTEM'),
('BACKUP_FOLDER_ID','','Storage bucket: backups',now(),'SYSTEM'),
('INITIAL_ADMIN_USERNAME','admin','প্রথম Admin username',now(),'SYSTEM'),
('INITIAL_ADMIN_TEMP_PASSWORD','','Created by scripts/create-admin.mjs',now(),'SYSTEM'),
('SETUP_VERSION','2.0.0','Modern database schema version; rules source v1.1.6',now(),'SYSTEM')
on conflict (key) do nothing;

insert into public.roles(role_id,role_name,permissions_json,status,updated_at) values
('ADMIN','Administrator','["*"]'::jsonb,'ACTIVE',now()),
('STAFF','Staff','["dashboard.view","members.view","members.edit","savings.view","savings.collect","savings.edit","receipts.view","receipts.print","loans.view","loans.create","investments.view","profits.view","accounts.view","reports.view","documents.view"]'::jsonb,'ACTIVE',now()),
('ACCOUNTANT','Accountant','["dashboard.view","members.view","savings.view","savings.collect","savings.edit","receipts.view","receipts.print","loans.view","loans.payment","investments.view","investments.edit","profits.view","profits.edit","accounts.view","accounts.edit","reports.view","audit.view"]'::jsonb,'ACTIVE',now()),
('COLLECTOR','Collector','["dashboard.view","members.view","savings.view","savings.collect","receipts.view","receipts.print"]'::jsonb,'ACTIVE',now()),
('SECRETARY','Secretary','["dashboard.view","members.view","members.edit","meetings.view","meetings.edit","committee.view","committee.edit","documents.view","documents.edit","reports.view"]'::jsonb,'ACTIVE',now()),
('VIEWER','Viewer','["dashboard.view","members.view","savings.view","receipts.view","loans.view","investments.view","profits.view","accounts.view","reports.view"]'::jsonb,'ACTIVE',now()),
('MEMBER','Member','["member.portal"]'::jsonb,'ACTIVE',now())
on conflict (role_id) do nothing;

insert into public.chart_of_accounts(account_code,account_name,account_type,parent_code,status,system_account) values
('1000','Cash','ASSET','','ACTIVE','CASH'),
('1010','Bank','ASSET','','ACTIVE','BANK'),
('1020','Mobile Financial Service','ASSET','','ACTIVE','MFS'),
('1200','Loan Receivable','ASSET','','ACTIVE','LOAN_RECEIVABLE'),
('1300','Investment Asset','ASSET','','ACTIVE','INVESTMENT_ASSET'),
('2000','Member Savings Liability','LIABILITY','','ACTIVE','MEMBER_SAVINGS'),
('2100','Loan Penalty Payable/Adjustment','LIABILITY','','ACTIVE','ADJUSTMENT_LIABILITY'),
('3000','Reserve & Equity','EQUITY','','ACTIVE','RESERVE'),
('3100','Retained Surplus','EQUITY','','ACTIVE','RETAINED_SURPLUS'),
('4000','Loan Service Charge Income','INCOME','','ACTIVE','LOAN_INCOME'),
('4100','Investment Income','INCOME','','ACTIVE','INVESTMENT_INCOME'),
('4200','Late Fee Income','INCOME','','ACTIVE','LATE_FEE_INCOME'),
('4300','Other Income','INCOME','','ACTIVE','OTHER_INCOME'),
('5000','Operating Expense','EXPENSE','','ACTIVE','OPERATING_EXPENSE'),
('5100','Bank Charge Expense','EXPENSE','','ACTIVE','BANK_CHARGE_EXPENSE'),
('5200','Legal & Registration Expense','EXPENSE','','ACTIVE','LEGAL_EXPENSE'),
('5300','Other Expense','EXPENSE','','ACTIVE','OTHER_EXPENSE'),
('5400','Investment Loss','EXPENSE','','ACTIVE','INVESTMENT_LOSS')
on conflict (account_code) do nothing;

insert into public.bank_accounts(account_id,account_code,account_name,type,bank_name,account_no,branch,opening_balance,status,created_at,created_by,updated_at,updated_by) values
('ACC-CASH','1000','Cash','CASH','','','',0,'ACTIVE',now(),'SYSTEM',now(),'SYSTEM'),
('ACC-BANK','1010','Main Bank Account','BANK','','','',0,'ACTIVE',now(),'SYSTEM',now(),'SYSTEM'),
('ACC-MFS','1020','Mobile Financial Service','MFS','','','',0,'ACTIVE',now(),'SYSTEM',now(),'SYSTEM')
on conflict (account_id) do nothing;

insert into public.profit_sources(source_id,source_name,category,investment_id,project_reference,description,status,created_at,created_by,updated_at,updated_by) values
('PSR-000001','Land Investment','LAND','','DEFAULT_LAND','Default profit source/category','ACTIVE',now(),'SYSTEM',now(),'SYSTEM'),
('PSR-000002','Property Investment','PROPERTY','','DEFAULT_PROPERTY','Default profit source/category','ACTIVE',now(),'SYSTEM',now(),'SYSTEM'),
('PSR-000003','Shop / Business','BUSINESS','','DEFAULT_SHOP','Default profit source/category','ACTIVE',now(),'SYSTEM',now(),'SYSTEM'),
('PSR-000004','Agriculture','AGRICULTURE','','DEFAULT_AGRICULTURE','Default profit source/category','ACTIVE',now(),'SYSTEM',now(),'SYSTEM'),
('PSR-000005','Project Investment','PROJECT','','DEFAULT_PROJECT','Default profit source/category','ACTIVE',now(),'SYSTEM',now(),'SYSTEM'),
('PSR-000006','Other Investment','OTHER','','DEFAULT_OTHER','Default profit source/category','ACTIVE',now(),'SYSTEM',now(),'SYSTEM')
on conflict (source_id) do nothing;

insert into public.sequences(sequence_key,value) values
('PROFIT_SOURCE',6),('USER',0),('MEMBER',0),('TXN',0),('RECEIPT',0),('VOUCHER',0),('DUE',0),('SAVINGS_BATCH',0),('JOURNAL',0),('GL',0),('LOAN',0),('LOAN_SCHEDULE',0),('LOAN_PAYMENT',0),('ALLOC',0),('GUARANTOR',0),('NOTIFICATION',0),('AUDIT',0),('INCOME',0),('EXPENSE',0),('EXPENSE_ALLOCATION',0),('INVESTMENT',0),('INVESTMENT_RETURN',0),('INVESTMENT_CLOSURE',0),('PROFIT',0),('PROFIT_DISTRIBUTION_HEADER',0),('DIST',0)
on conflict (sequence_key) do nothing;
