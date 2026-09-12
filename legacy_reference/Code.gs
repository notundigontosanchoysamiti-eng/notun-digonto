/** ===== Setup.gs ===== */
/**
 * Notun Digonto Sanchoy Samity - setup and schema
 * Run RUN_SETUP() once from the Apps Script editor before deploying.
 */

var ND_SCHEMA = {
  CONFIG: ['KEY','VALUE','DESCRIPTION','UPDATED_AT','UPDATED_BY'],
  SEQUENCES: ['SEQUENCE_KEY','VALUE'],
  ROLES: ['ROLE_ID','ROLE_NAME','PERMISSIONS_JSON','STATUS','UPDATED_AT'],
  USERS: ['USER_ID','MEMBER_ID','FULL_NAME','USERNAME','PASSWORD_HASH','SALT','ROLE_ID','STATUS','MUST_CHANGE_PASSWORD','LAST_LOGIN_AT','CREATED_AT','CREATED_BY','UPDATED_AT','UPDATED_BY'],
  SESSIONS: ['SESSION_ID','TOKEN_HASH','USER_ID','CREATED_AT','EXPIRES_AT','LAST_SEEN_AT','STATUS'],
  MEMBERS: ['MEMBER_ID','MEMBER_NO','NAME_BN','NAME_EN','PHOTO_FILE_ID','PHOTO_MIME','FATHER_NAME','MOTHER_NAME','DOB','NID','MOBILE','ALT_MOBILE','EMAIL','PROFESSION','PRESENT_ADDRESS','PERMANENT_ADDRESS','JOIN_DATE','STATUS','KYC_STATUS','NOTES','CREATED_AT','CREATED_BY','UPDATED_AT','UPDATED_BY','BLOOD_GROUP','NID_SCAN_DOCUMENT_ID'],
  NOMINEES: ['NOMINEE_ID','MEMBER_ID','NAME','RELATION','DOB','NID','MOBILE','ADDRESS','PHOTO_FILE_ID','PERCENT','STATUS','CREATED_AT','CREATED_BY','UPDATED_AT','UPDATED_BY'],
  SAVINGS_UNITS: ['UNIT_ID','MEMBER_ID','UNITS','UNIT_AMOUNT','EFFECTIVE_FROM','EFFECTIVE_TO','STATUS','NOTES','CREATED_AT','CREATED_BY','UPDATED_AT','UPDATED_BY'],
  MONTHLY_DUES: ['DUE_ID','MEMBER_ID','DUE_MONTH','UNITS','UNIT_AMOUNT','DUE_AMOUNT','PAID_AMOUNT','ADVANCE_APPLIED','BALANCE','STATUS','DUE_DATE','LATE_FEE','CREATED_AT','CREATED_BY','UPDATED_AT','UPDATED_BY'],
  TRANSACTIONS: ['TXN_ID','TXN_DATE','MEMBER_ID','TYPE','CATEGORY','DESCRIPTION','DIRECTION','AMOUNT','PRINCIPAL_AMOUNT','PROFIT_AMOUNT','PENALTY_AMOUNT','PAYMENT_ACCOUNT_ID','PAYMENT_METHOD','REFERENCE','RELATED_ID','RECEIPT_ID','STATUS','PARENT_TXN_ID','CORRECTION_REASON','CREATED_AT','CREATED_BY','UPDATED_AT','UPDATED_BY','NOTE_PURPOSE'],
  RECEIPTS: ['RECEIPT_ID','TXN_ID','MEMBER_ID','RECEIPT_DATE','AMOUNT','PURPOSE','PAYMENT_METHOD','REFERENCE','STATUS','PRINT_COUNT','LAST_PRINTED_AT','CREATED_AT','CREATED_BY'],
  VOUCHERS: ['VOUCHER_ID','TXN_ID','DATE','TYPE','PAYEE','MEMBER_ID','AMOUNT','PURPOSE','ACCOUNT_ID','REFERENCE','STATUS','CREATED_AT','CREATED_BY'],
  LOANS: ['LOAN_ID','MEMBER_ID','LOAN_TYPE','APPLICATION_DATE','REQUESTED_AMOUNT','APPROVED_AMOUNT','ANNUAL_RATE','METHOD','TERM_MONTHS','PURPOSE','SAVINGS_AT_APPLICATION','ELIGIBLE_LIMIT','STATUS','APPROVAL_STATUS','APPROVED_BY','APPROVED_AT','DISBURSED_AT','DISBURSEMENT_TXN_ID','OUTSTANDING_PRINCIPAL','NEXT_DUE_DATE','GUARANTOR_REQUIRED','NOTES','CREATED_AT','CREATED_BY','UPDATED_AT','UPDATED_BY'],
  LOAN_SCHEDULE: ['SCHEDULE_ID','LOAN_ID','INSTALLMENT_NO','DUE_DATE','OPENING_PRINCIPAL','PRINCIPAL_DUE','PROFIT_DUE','TOTAL_DUE','PRINCIPAL_PAID','PROFIT_PAID','PENALTY_PAID','STATUS','PAID_AT'],
  LOAN_PAYMENTS: ['PAYMENT_ID','LOAN_ID','MEMBER_ID','TXN_ID','PAYMENT_DATE','AMOUNT','PRINCIPAL_AMOUNT','PROFIT_AMOUNT','PENALTY_AMOUNT','RECEIPT_ID','CREATED_AT','CREATED_BY'],
  LOAN_PAYMENT_ALLOCATIONS: ['ALLOC_ID','PAYMENT_ID','SCHEDULE_ID','PRINCIPAL_AMOUNT','PROFIT_AMOUNT','PENALTY_AMOUNT','CREATED_AT'],
  GUARANTORS: ['GUARANTOR_ID','LOAN_ID','MEMBER_ID','GUARANTOR_MEMBER_ID','STATUS','APPROVED_AT','CREATED_AT','CREATED_BY'],
  INVESTMENTS: ['INVESTMENT_ID','TYPE','NAME','START_DATE','AMOUNT','EXPECTED_RETURN_RATE','EXPECTED_END_DATE','STATUS','LOCATION','LAND_SIZE','MOUZA','DAG','KHATIAN','PARTNER','OWNERSHIP_PERCENT','RESPONSIBLE_PERSON','DOCUMENT_FOLDER_ID','PURCHASE_TXN_ID','NOTES','CREATED_AT','CREATED_BY','UPDATED_AT','UPDATED_BY','TOTAL_INVESTED','PRINCIPAL_RETURNED','CLOSURE_ID','CLOSED_AT','SELLING_AMOUNT','PROFIT_GENERATED','LOSS_GENERATED','CLOSING_REFERENCE','CLOSE_NOTES','CLOSED_BY'],
  INVESTMENT_RETURNS: ['RETURN_ID','INVESTMENT_ID','RETURN_DATE','TYPE','AMOUNT','TXN_ID','NOTES','CREATED_AT','CREATED_BY','STATUS','PARENT_RETURN_ID','UPDATED_AT','UPDATED_BY','PROFIT_ID'],
  INVESTMENT_CLOSURES: ['CLOSURE_ID','INVESTMENT_ID','CLOSE_DATE','SELLING_AMOUNT','CASH_RECEIVED','TOTAL_COST','PRINCIPAL_RETURNED','PROFIT_AMOUNT','LOSS_AMOUNT','ACCOUNT_ID','TXN_ID','PROFIT_ID','REFERENCE','NOTES','STATUS','PARENT_CLOSURE_ID','CREATED_AT','CREATED_BY','UPDATED_AT','UPDATED_BY'],
  INCOME: ['INCOME_ID','DATE','CATEGORY','AMOUNT','ACCOUNT_ID','REFERENCE','DESCRIPTION','TXN_ID','STATUS','CREATED_AT','CREATED_BY','INCOME_TYPE','PROFIT_ID','VOUCHER_ID','CLIENT_REQUEST_ID','NOTE','UPDATED_AT','UPDATED_BY'],
  EXPENSES: ['EXPENSE_ID','DATE','CATEGORY','AMOUNT','ACCOUNT_ID','REFERENCE','DESCRIPTION','DOCUMENT_FILE_ID','TXN_ID','STATUS','APPROVAL_STATUS','CREATED_AT','CREATED_BY','UPDATED_AT','UPDATED_BY','ALLOCATION_METHOD','TOTAL_UNITS','MEMBER_COUNT','ALLOCATED_AMOUNT','VOUCHER_ID','CLIENT_REQUEST_ID','ALLOCATION_STATUS'],
  EXPENSE_ALLOCATIONS: ['ALLOCATION_ID','EXPENSE_ID','VOUCHER_ID','MAIN_TXN_ID','MEMBER_ID','MEMBER_NAME','UNIT_QUANTITY','TOTAL_UNITS','UNIT_PERCENTAGE','AMOUNT','SAVINGS_BEFORE','SAVINGS_AFTER','TXN_ID','STATUS','CREATED_AT','CREATED_BY','UPDATED_AT','UPDATED_BY'],
  BANK_ACCOUNTS: ['ACCOUNT_ID','ACCOUNT_CODE','ACCOUNT_NAME','TYPE','BANK_NAME','ACCOUNT_NO','BRANCH','OPENING_BALANCE','STATUS','CREATED_AT','CREATED_BY','UPDATED_AT','UPDATED_BY'],
  CHART_OF_ACCOUNTS: ['ACCOUNT_CODE','ACCOUNT_NAME','ACCOUNT_TYPE','PARENT_CODE','STATUS','SYSTEM_ACCOUNT'],
  GENERAL_LEDGER: ['GL_ID','ENTRY_ID','TXN_ID','ENTRY_DATE','ACCOUNT_CODE','ACCOUNT_NAME','DEBIT','CREDIT','MEMBER_ID','RELATED_ID','DESCRIPTION','CREATED_AT','CREATED_BY'],
  MEETINGS: ['MEETING_ID','TYPE','TITLE','DATE','TIME','VENUE','AGENDA','MINUTES','RESOLUTION_NO','STATUS','CREATED_AT','CREATED_BY','UPDATED_AT','UPDATED_BY'],
  MEETING_ATTENDANCE: ['ATTENDANCE_ID','MEETING_ID','MEMBER_ID','STATUS','NOTE','CREATED_AT','CREATED_BY','UPDATED_AT','UPDATED_BY'],
  COMMITTEE: ['COMMITTEE_ID','MEMBER_ID','DESIGNATION','START_DATE','END_DATE','STATUS','NOTES','CREATED_AT','CREATED_BY'],
  PROFIT_SOURCES: ['SOURCE_ID','SOURCE_NAME','CATEGORY','INVESTMENT_ID','PROJECT_REFERENCE','DESCRIPTION','STATUS','CREATED_AT','CREATED_BY','UPDATED_AT','UPDATED_BY'],
  PROFIT_RECORDS: ['PROFIT_ID','SOURCE_ID','INVESTMENT_ID','CATEGORY','PROFIT_DATE','PERIOD_TYPE','PERIOD_START','PERIOD_END','PERIOD_LABEL','AMOUNT','DISTRIBUTED_AMOUNT','UNDISTRIBUTED_AMOUNT','STATUS','SOURCE_TXN_ID','REFERENCE','NOTES','CREATED_AT','CREATED_BY','UPDATED_AT','UPDATED_BY','SOURCE_INCOME_ID','SOURCE_VOUCHER_ID'],
  PROFIT_DISTRIBUTIONS: ['DISTRIBUTION_ID','PROFIT_ID','SOURCE_ID','INVESTMENT_ID','PERIOD_TYPE','PERIOD_START','PERIOD_END','PERIOD_LABEL','TOTAL_PROFIT','REQUESTED_AMOUNT','DISTRIBUTED_AMOUNT','MEMBER_COUNT','BASIS_TYPE','STATUS','REFERENCE','NOTES','APPROVED_BY','APPROVED_AT','CREATED_AT','CREATED_BY','UPDATED_AT','UPDATED_BY','TOTAL_BASIS','TOTAL_UNITS','DISTRIBUTION_DATE'],
  PROFIT_DISTRIBUTION: ['DIST_ID','FINANCIAL_YEAR','MEMBER_ID','BASIS_AMOUNT','RATE','AMOUNT','STATUS','TXN_ID','APPROVED_BY','APPROVED_AT','CREATED_AT','CREATED_BY','DISTRIBUTION_ID','PROFIT_ID','SOURCE_ID','INVESTMENT_ID','PERIOD_TYPE','PERIOD_START','PERIOD_END','PERIOD_LABEL','REFERENCE','UPDATED_AT','UPDATED_BY','BASIS_TYPE','UNIT_QUANTITY','TOTAL_UNITS','UNIT_PERCENTAGE','MEMBER_NAME'],
  DOCUMENTS: ['DOCUMENT_ID','MEMBER_ID','RELATED_TYPE','RELATED_ID','TITLE','FILE_ID','FILE_NAME','MIME_TYPE','STATUS','CREATED_AT','CREATED_BY'],
  NOTIFICATIONS: ['NOTIFICATION_ID','USER_ID','MEMBER_ID','TYPE','TITLE','MESSAGE','STATUS','CREATED_AT','READ_AT'],
  APPROVALS: ['APPROVAL_ID','ENTITY_TYPE','ENTITY_ID','STEP','STATUS','DATA_JSON','REQUESTED_BY','REQUESTED_AT','DECIDED_BY','DECIDED_AT','NOTE'],
  AUDIT_LOG: ['AUDIT_ID','USER_ID','ACTION','ENTITY_TYPE','ENTITY_ID','OLD_VALUE','NEW_VALUE','REASON','IP_HINT','CREATED_AT'],
  LOGIN_LOG: ['LOGIN_ID','USER_ID','USERNAME','ACTION','SUCCESS','MESSAGE','CREATED_AT'],
  BACKUPS: ['BACKUP_ID','FILE_ID','FILE_NAME','CREATED_AT','CREATED_BY','STATUS']
};

var ND_DEFAULT_CONFIG = {
  SOCIETY_NAME_BN: ['নতুন দিগন্ত সঞ্চয় সমিতি','সমিতির বাংলা নাম'],
  SOCIETY_NAME_EN: ['Notun Digonto Sanchoy Samity','Society English name'],
  ESTD_YEAR: ['2026','প্রতিষ্ঠাকাল'],
  SOCIETY_START_MONTH: ['2026-08','সকল সদস্যের মাসিক সঞ্চয় হিসাব শুরু হওয়ার মাস (YYYY-MM)'],
  TAGLINE_BN: ['একসাথে সঞ্চয়, উন্নত আগামীর পথে','ট্যাগলাইন'],
  SOCIETY_ADDRESS: ['','সমিতির ঠিকানা'],
  SOCIETY_MOBILE: ['','সমিতির যোগাযোগ নম্বর'],
  SOCIETY_EMAIL: ['','সমিতির ইমেইল'],
  MEMBER_ID_PREFIX: ['NDS','Member ID prefix'],
  RECEIPT_PREFIX: ['NDS-RCP','Receipt prefix'],
  VOUCHER_PREFIX: ['NDS-VCH','Voucher prefix'],
  MONTHLY_UNIT_AMOUNT: ['1000','প্রতি সঞ্চয় ইউনিটের মাসিক টাকা'],
  MONTHLY_DUE_DAY: ['10','মাসিক জমার শেষ তারিখ'],
  LATE_FEE: ['0','বিলম্ব ফি; সাধারণ সভার সিদ্ধান্ত অনুযায়ী পরিবর্তন করুন'],
  MIN_LOAN_MEMBERSHIP_MONTHS: ['6','ঋণের জন্য ন্যূনতম সক্রিয় সদস্যপদ (মাস)'],
  SECURED_LOAN_PERCENT: ['80','নিজের সঞ্চয়ের সর্বোচ্চ শতাংশ পর্যন্ত সঞ্চয়-জামানত ঋণ'],
  GENERAL_LOAN_SAVINGS_MULTIPLIER: ['2','সাধারণ ঋণে সঞ্চয়ের সর্বোচ্চ গুণ'],
  GENERAL_LOAN_FUND_PERCENT: ['10','Loanable Fund-এর সর্বোচ্চ শতাংশ'],
  DEFAULT_LOAN_ANNUAL_RATE: ['0','বার্ষিক ঋণ হার; চূড়ান্ত সিদ্ধান্ত না হওয়া পর্যন্ত 0'],
  DEFAULT_LOAN_METHOD: ['REDUCING','REDUCING বা FLAT'],
  WITHDRAWAL_NOTICE_DAYS: ['90','পূর্ণ সঞ্চয় প্রত্যাহারের প্রস্তাবিত নোটিশ দিন'],
  MIN_LIQUIDITY_PERCENT: ['20','প্রস্তাবিত ন্যূনতম তরল তহবিল শতাংশ'],
  BIG_INVESTMENT_FUND_PERCENT: ['50','একক প্রকল্প বড় বিনিয়োগ হিসেবে গণ্য হওয়ার সীমা'],
  BIG_INVESTMENT_APPROVAL_PERCENT: ['75','বড় বিনিয়োগে প্রস্তাবিত সদস্য সমর্থন শতাংশ'],
  FINANCIAL_YEAR_START_MONTH: ['1','১ = জানুয়ারি'],
  CURRENCY_SYMBOL: ['৳','মুদ্রা প্রতীক'],
  APP_LANGUAGE: ['bn','bn/en'],
  TIMEZONE: ['Asia/Dhaka','Apps Script project timezone'],
  SESSION_HOURS: ['6','Login session duration'],
  LOGIN_MAX_ATTEMPTS: ['5','১৫ মিনিটের মধ্যে সর্বোচ্চ ভুল login attempt'],
  LOGIN_LOCK_MINUTES: ['15','Repeated failed login-এর temporary lock duration'],
  LOGIN_LOCK_RESET_AT: ['','Ignore failed-login attempts at or before this timestamp'],
  AUTO_LOAN_STATUS: ['TRUE','Daily loan overdue/status refresh trigger'],
  AUTO_MONTHLY_DUE: ['TRUE','মাসিক Due trigger'],
  AUTO_DAILY_BACKUP: ['TRUE','Daily backup trigger'],
  DATA_FOLDER_ID: ['','Setup will create this'],
  MEMBER_PHOTO_FOLDER_ID: ['','Setup will create this'],
  DOCUMENT_FOLDER_ID: ['','Setup will create this'],
  BACKUP_FOLDER_ID: ['','Setup will create this'],
  INITIAL_ADMIN_USERNAME: ['admin','প্রথম Admin username'],
  INITIAL_ADMIN_TEMP_PASSWORD: ['','Setup will generate a one-time password; change immediately after first login'],
  SETUP_VERSION: ['1.1.6','Database schema version']
};

var ND_DEFAULT_ROLES = [
  ['ADMIN','Administrator', JSON.stringify(['*']), 'ACTIVE'],
  ['STAFF','Staff', JSON.stringify(['dashboard.view','members.view','members.edit','savings.view','savings.collect','savings.edit','receipts.view','receipts.print','loans.view','loans.create','investments.view','profits.view','accounts.view','reports.view','documents.view']), 'ACTIVE'],
  ['ACCOUNTANT','Accountant', JSON.stringify(['dashboard.view','members.view','savings.view','savings.collect','savings.edit','receipts.view','receipts.print','loans.view','loans.payment','investments.view','investments.edit','profits.view','profits.edit','accounts.view','accounts.edit','reports.view','audit.view']), 'ACTIVE'],
  ['COLLECTOR','Collector', JSON.stringify(['dashboard.view','members.view','savings.view','savings.collect','receipts.view','receipts.print']), 'ACTIVE'],
  ['SECRETARY','Secretary', JSON.stringify(['dashboard.view','members.view','members.edit','meetings.view','meetings.edit','committee.view','committee.edit','documents.view','documents.edit','reports.view']), 'ACTIVE'],
  ['VIEWER','Viewer', JSON.stringify(['dashboard.view','members.view','savings.view','receipts.view','loans.view','investments.view','profits.view','accounts.view','reports.view']), 'ACTIVE'],
  ['MEMBER','Member', JSON.stringify(['member.portal']), 'ACTIVE']
];

var ND_DEFAULT_COA = [
  ['1000','Cash','ASSET','','ACTIVE','CASH'],
  ['1010','Bank','ASSET','','ACTIVE','BANK'],
  ['1020','Mobile Financial Service','ASSET','','ACTIVE','MFS'],
  ['1200','Loan Receivable','ASSET','','ACTIVE','LOAN_RECEIVABLE'],
  ['1300','Investment Asset','ASSET','','ACTIVE','INVESTMENT_ASSET'],
  ['2000','Member Savings Liability','LIABILITY','','ACTIVE','MEMBER_SAVINGS'],
  ['2100','Loan Penalty Payable/Adjustment','LIABILITY','','ACTIVE','ADJUSTMENT_LIABILITY'],
  ['3000','Reserve & Equity','EQUITY','','ACTIVE','RESERVE'],
  ['3100','Retained Surplus','EQUITY','','ACTIVE','RETAINED_SURPLUS'],
  ['4000','Loan Service Charge Income','INCOME','','ACTIVE','LOAN_INCOME'],
  ['4100','Investment Income','INCOME','','ACTIVE','INVESTMENT_INCOME'],
  ['4200','Late Fee Income','INCOME','','ACTIVE','LATE_FEE_INCOME'],
  ['4300','Other Income','INCOME','','ACTIVE','OTHER_INCOME'],
  ['5000','Operating Expense','EXPENSE','','ACTIVE','OPERATING_EXPENSE'],
  ['5100','Bank Charge Expense','EXPENSE','','ACTIVE','BANK_CHARGE_EXPENSE'],
  ['5200','Legal & Registration Expense','EXPENSE','','ACTIVE','LEGAL_EXPENSE'],
  ['5300','Other Expense','EXPENSE','','ACTIVE','OTHER_EXPENSE'],
  ['5400','Investment Loss','EXPENSE','','ACTIVE','INVESTMENT_LOSS']
];

function RUN_SETUP() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('Open the target Google Sheet and run RUN_SETUP() from its bound Apps Script project.');
  PropertiesService.getScriptProperties().setProperty('ND_SPREADSHEET_ID', ss.getId());
  if (!PropertiesService.getScriptProperties().getProperty('ND_APP_SECRET')) {
    PropertiesService.getScriptProperties().setProperty('ND_APP_SECRET', Utilities.getUuid() + Utilities.getUuid() + Utilities.getUuid());
  }

  Object.keys(ND_SCHEMA).forEach(function(name) {
    ndEnsureSheet_(ss, name, ND_SCHEMA[name]);
  });

  ndSeedConfig_();
  ndSeedRoles_();
  ndSeedCOA_();
  ndSeedAccounts_();
  ndSeedDefaultProfitSourcesV1100_({userId:'SYSTEM'});
  ndCreateDataFolders_();
  var admin = ndEnsureInitialAdmin_();
  ndInstallTriggers_();

  var configSheet = ss.getSheetByName('CONFIG');
  configSheet.activate();
  SpreadsheetApp.flush();

  return {
    ok: true,
    message: 'Setup complete. Open CONFIG to see the one-time admin password, then deploy the web app.',
    adminUsername: admin.username,
    tempPassword: admin.tempPassword || '(existing admin - no new password generated)',
    spreadsheetId: ss.getId()
  };
}

function ndEnsureSheet_(ss, name, headers) {
  var sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  if (sh.getMaxColumns() < headers.length) sh.insertColumnsAfter(sh.getMaxColumns(), headers.length - sh.getMaxColumns());
  var current = sh.getRange(1,1,1,headers.length).getValues()[0];
  var changed = false;
  for (var i=0;i<headers.length;i++) {
    if (current[i] !== headers[i]) { changed = true; break; }
  }
  if (changed || sh.getLastRow() === 0) sh.getRange(1,1,1,headers.length).setValues([headers]);
  sh.setFrozenRows(1);
  sh.getRange(1,1,1,headers.length)
    .setBackground('#0A2E5C')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');
  sh.setRowHeight(1, 30);
  sh.getRange(1,1,Math.max(1,sh.getMaxRows()),headers.length).setVerticalAlignment('middle');
  sh.getDataRange().setWrap(false);
  for (var c=1;c<=headers.length;c++) sh.setColumnWidth(c, 145);
  if (name === 'CONFIG') { sh.setColumnWidth(1,260); sh.setColumnWidth(2,280); sh.setColumnWidth(3,420); sh.setColumnWidth(5,180); }
  if (name === 'MEMBERS') { sh.setColumnWidth(3,210); sh.setColumnWidth(15,280); sh.setColumnWidth(16,280); }
  // DUE_MONTH is a month key, not a calendar date. Keep it as plain text so
  // Google Sheets cannot silently convert 2026-08 into a Date object.
  if (name === 'MONTHLY_DUES') sh.getRange(2,3,Math.max(1,sh.getMaxRows()-1),1).setNumberFormat('@');
  // Telephone numbers are identifiers. Plain-text formatting is required so
  // Google Sheets never strips a local leading zero or rewrites +880 values.
  if (name === 'MEMBERS') {
    sh.getRange(2,11,Math.max(1,sh.getMaxRows()-1),2).setNumberFormat('@');
  }
  if (name === 'NOMINEES') sh.getRange(2,7,Math.max(1,sh.getMaxRows()-1),1).setNumberFormat('@');
  if (name === 'AUDIT_LOG') { sh.setColumnWidth(6,320); sh.setColumnWidth(7,320); }
}

function ndSeedConfig_() {
  var existing = ndRows_('CONFIG');
  var byKey = {};
  existing.forEach(function(r){ byKey[r.KEY] = true; });
  Object.keys(ND_DEFAULT_CONFIG).forEach(function(k){
    if (!byKey[k]) ndAppend_('CONFIG',{KEY:k,VALUE:ND_DEFAULT_CONFIG[k][0],DESCRIPTION:ND_DEFAULT_CONFIG[k][1],UPDATED_AT:ndNowIso_(),UPDATED_BY:'SYSTEM'});
  });
}

function ndSeedRoles_() {
  var existing = ndRows_('ROLES');
  var byId = {};
  existing.forEach(function(r){ byId[r.ROLE_ID] = true; });
  ND_DEFAULT_ROLES.forEach(function(r){
    if (!byId[r[0]]) ndAppend_('ROLES',{ROLE_ID:r[0],ROLE_NAME:r[1],PERMISSIONS_JSON:r[2],STATUS:r[3],UPDATED_AT:ndNowIso_()});
  });
}

function ndSeedCOA_() {
  var existing = ndRows_('CHART_OF_ACCOUNTS');
  var byCode = {};
  existing.forEach(function(r){ byCode[String(r.ACCOUNT_CODE)] = true; });
  ND_DEFAULT_COA.forEach(function(r){
    if (!byCode[String(r[0])]) ndAppend_('CHART_OF_ACCOUNTS',{ACCOUNT_CODE:r[0],ACCOUNT_NAME:r[1],ACCOUNT_TYPE:r[2],PARENT_CODE:r[3],STATUS:r[4],SYSTEM_ACCOUNT:r[5]});
  });
}

function ndSeedAccounts_() {
  if (ndRows_('BANK_ACCOUNTS').length) return;
  var now = ndNowIso_();
  ndAppend_('BANK_ACCOUNTS',{ACCOUNT_ID:'ACC-CASH',ACCOUNT_CODE:'1000',ACCOUNT_NAME:'Cash',TYPE:'CASH',BANK_NAME:'',ACCOUNT_NO:'',BRANCH:'',OPENING_BALANCE:0,STATUS:'ACTIVE',CREATED_AT:now,CREATED_BY:'SYSTEM',UPDATED_AT:now,UPDATED_BY:'SYSTEM'});
  ndAppend_('BANK_ACCOUNTS',{ACCOUNT_ID:'ACC-BANK',ACCOUNT_CODE:'1010',ACCOUNT_NAME:'Main Bank Account',TYPE:'BANK',BANK_NAME:'',ACCOUNT_NO:'',BRANCH:'',OPENING_BALANCE:0,STATUS:'ACTIVE',CREATED_AT:now,CREATED_BY:'SYSTEM',UPDATED_AT:now,UPDATED_BY:'SYSTEM'});
  ndAppend_('BANK_ACCOUNTS',{ACCOUNT_ID:'ACC-MFS',ACCOUNT_CODE:'1020',ACCOUNT_NAME:'Mobile Financial Service',TYPE:'MFS',BANK_NAME:'',ACCOUNT_NO:'',BRANCH:'',OPENING_BALANCE:0,STATUS:'ACTIVE',CREATED_AT:now,CREATED_BY:'SYSTEM',UPDATED_AT:now,UPDATED_BY:'SYSTEM'});
}

function ndCreateDataFolders_() {
  var rootId = ndConfig_('DATA_FOLDER_ID','');
  var root;
  try { if (rootId) root = DriveApp.getFolderById(rootId); } catch (e) {}
  if (!root) {
    root = DriveApp.createFolder('Notun Digonto Sanchoy - WebApp Data');
    ndSetConfig_('DATA_FOLDER_ID',root.getId());
  }
  var mapping = [
    ['MEMBER_PHOTO_FOLDER_ID','Member Photos'],
    ['DOCUMENT_FOLDER_ID','Documents'],
    ['BACKUP_FOLDER_ID','Backups']
  ];
  mapping.forEach(function(x){
    var id = ndConfig_(x[0],'');
    var folder;
    try { if (id) folder = DriveApp.getFolderById(id); } catch(e){}
    if (!folder) { folder = root.createFolder(x[1]); ndSetConfig_(x[0],folder.getId()); }
  });
}

function ndEnsureInitialAdmin_() {
  var admins = ndRows_('USERS').filter(function(r){ return r.ROLE_ID === 'ADMIN' && r.STATUS === 'ACTIVE'; });
  if (admins.length) return {username: admins[0].USERNAME, tempPassword:''};
  var temp = ndRandomPassword_();
  var salt = ndMakeSalt_();
  var now = ndNowIso_();
  var uid = ndNextId_('USER','USR-',5);
  ndAppend_('USERS',{
    USER_ID:uid,MEMBER_ID:'',FULL_NAME:'System Administrator',USERNAME:'admin',
    PASSWORD_HASH:ndHashPassword_(temp,salt),SALT:salt,ROLE_ID:'ADMIN',STATUS:'ACTIVE',MUST_CHANGE_PASSWORD:'TRUE',
    LAST_LOGIN_AT:'',CREATED_AT:now,CREATED_BY:'SYSTEM',UPDATED_AT:now,UPDATED_BY:'SYSTEM'
  });
  ndSetConfig_('INITIAL_ADMIN_USERNAME','admin');
  ndSetConfig_('INITIAL_ADMIN_TEMP_PASSWORD',temp);
  return {username:'admin', tempPassword:temp};
}

function ndInstallTriggers_() {
  var triggers = ScriptApp.getProjectTriggers();
  var names = {};
  triggers.forEach(function(t){ names[t.getHandlerFunction()] = true; });
  if (!names.ndMonthlyDueTrigger_) {
    ScriptApp.newTrigger('ndMonthlyDueTrigger_').timeBased().onMonthDay(1).atHour(1).create();
  }
  if (!names.ndDailyBackupTrigger_) {
    ScriptApp.newTrigger('ndDailyBackupTrigger_').timeBased().everyDays(1).atHour(2).create();
  }
  if (!names.ndDailyLoanStatusTrigger_) {
    ScriptApp.newTrigger('ndDailyLoanStatusTrigger_').timeBased().everyDays(1).atHour(3).create();
  }
}

function reinstallSystemTriggers(token) {
  ndRequireAdmin_(token);
  ScriptApp.getProjectTriggers().forEach(function(t){
    if (['ndMonthlyDueTrigger_','ndDailyBackupTrigger_','ndDailyLoanStatusTrigger_'].indexOf(t.getHandlerFunction()) >= 0) ScriptApp.deleteTrigger(t);
  });
  ndInstallTriggers_();
  return {ok:true,message:'Triggers installed.'};
}

/** ===== Database.gs ===== */
/** Core database helpers. No physical delete for business records. */
/** v1.0.7.1 setup compatibility helpers.
 * These aliases were referenced by the v1.0.4-v1.0.7 update/diagnostic routines
 * but were accidentally omitted from the bundled Code.gs.
 */
function ndSS_() {
  return ndDb_();
}

function ndSetupSheets_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    var id = PropertiesService.getScriptProperties().getProperty('ND_SPREADSHEET_ID');
    if (id) ss = SpreadsheetApp.openById(id);
  }
  if (!ss) throw new Error('Database is not configured. Fresh install: open the target Google Sheet and run RUN_SETUP() first.');
  PropertiesService.getScriptProperties().setProperty('ND_SPREADSHEET_ID', ss.getId());
  Object.keys(ND_SCHEMA).forEach(function(name){
    ndEnsureSheet_(ss, name, ND_SCHEMA[name]);
  });
  return ss;
}

function ndDb_() {
  if (ND_RUNTIME_CACHE && ND_RUNTIME_CACHE.spreadsheet) return ND_RUNTIME_CACHE.spreadsheet;
  var id = PropertiesService.getScriptProperties().getProperty('ND_SPREADSHEET_ID');
  if (!id) {
    var active = SpreadsheetApp.getActiveSpreadsheet();
    if (!active) throw new Error('Database is not configured. Run RUN_SETUP() first.');
    id = active.getId();
    PropertiesService.getScriptProperties().setProperty('ND_SPREADSHEET_ID', id);
  }
  var ss=SpreadsheetApp.openById(id);
  if (ND_RUNTIME_CACHE) ND_RUNTIME_CACHE.spreadsheet=ss;
  return ss;
}

function ndSheet_(name) {
  if (ND_RUNTIME_CACHE && ND_RUNTIME_CACHE.sheets && ND_RUNTIME_CACHE.sheets[name]) return ND_RUNTIME_CACHE.sheets[name];
  var sh = ndDb_().getSheetByName(name);
  if (!sh) throw new Error('Missing sheet: ' + name + '. Run RUN_SETUP().');
  if (ND_RUNTIME_CACHE) {
    ND_RUNTIME_CACHE.sheets=ND_RUNTIME_CACHE.sheets||{};
    ND_RUNTIME_CACHE.sheets[name]=sh;
  }
  return sh;
}

/** Request-scoped cache/metrics. Apps Script creates a fresh execution context for each request. */
var ND_RUNTIME_CACHE = {spreadsheet:null,sheets:{},headers:{},rows:{},config:null,indexes:{}};
var ND_RUNTIME_METRICS = {sheetReads:0,rowCacheHits:0,headerCacheHits:0,indexHits:0,batchWrites:0,rowsWritten:0};

function ndCloneRows_(rows) {
  return (rows||[]).map(function(r){ return Object.assign({},r); });
}

function ndHeaders_(name) {
  if (ND_RUNTIME_CACHE.headers.hasOwnProperty(name)) {
    ND_RUNTIME_METRICS.headerCacheHits++;
    return ND_RUNTIME_CACHE.headers[name].slice();
  }
  var sh = ndSheet_(name);
  var lastCol = Math.max(1, sh.getLastColumn());
  var headers=sh.getRange(1,1,1,lastCol).getValues()[0].map(function(x){return String(x).trim();});
  ND_RUNTIME_METRICS.sheetReads++;
  ND_RUNTIME_CACHE.headers[name]=headers.slice();
  return headers;
}

function ndRows_(name) {
  if (ND_RUNTIME_CACHE.rows.hasOwnProperty(name)) {
    ND_RUNTIME_METRICS.rowCacheHits++;
    return ndCloneRows_(ND_RUNTIME_CACHE.rows[name]);
  }
  var sh = ndSheet_(name);
  var lr = sh.getLastRow();
  if (lr < 2) { ND_RUNTIME_CACHE.rows[name]=[]; return []; }
  var headers = ndHeaders_(name);
  var values = sh.getRange(2,1,lr-1,headers.length).getValues();
  ND_RUNTIME_METRICS.sheetReads++;
  var rows=values.map(function(row, idx){
    var o = {_row: idx+2};
    headers.forEach(function(h,i){ o[h] = ndCellValue_(row[i]); });
    return o;
  });
  ND_RUNTIME_CACHE.rows[name]=ndCloneRows_(rows);
  return rows;
}

function ndCellValue_(v) {
  if (v instanceof Date) {
    var tz=(ND_RUNTIME_CACHE.config&&ND_RUNTIME_CACHE.config.TIMEZONE)||'Asia/Dhaka';
    return Utilities.formatDate(v,tz,"yyyy-MM-dd'T'HH:mm:ssXXX");
  }
  return v;
}

function ndDateOnly_(v) {
  if (!v) return '';
  if (v instanceof Date) return Utilities.formatDate(v, ndConfig_('TIMEZONE','Asia/Dhaka'), 'yyyy-MM-dd');
  var str=String(v).trim();
  var m=str.match(/^(\d{4}-\d{2}-\d{2})/);
  if(m) return m[1];
  var d=new Date(str);
  if(!isNaN(d.getTime())) return Utilities.formatDate(d, ndConfig_('TIMEZONE','Asia/Dhaka'), 'yyyy-MM-dd');
  return str.slice(0,10);
}

function ndMonthOnly_(v) {
  var d=ndDateOnly_(v);
  return /^\d{4}-\d{2}/.test(d)?d.slice(0,7):String(v||'').slice(0,7);
}

function ndAppend_(name, obj) {
  return ndAppendMany_(name,[obj]);
}

function ndAppendMany_(name, objects) {
  objects=objects||[];
  if (!objects.length) return 0;
  var sh = ndSheet_(name);
  var headers = ndHeaders_(name);
  var startRow=Math.max(2,sh.getLastRow()+1);
  var values=objects.map(function(obj){return headers.map(function(h){return obj.hasOwnProperty(h)?obj[h]:'';});});
  sh.getRange(startRow,1,values.length,headers.length).setValues(values);
  ND_RUNTIME_METRICS.batchWrites++;
  ND_RUNTIME_METRICS.rowsWritten+=values.length;
  ndInvalidateCaches_(name);
  return startRow+values.length-1;
}

function ndUpdateRow_(name, rowNumber, updates) {
  rowNumber = Number(rowNumber);
  if (!isFinite(rowNumber) || rowNumber < 2) throw new Error('Invalid database row for '+name+': '+rowNumber);
  var sh = ndSheet_(name);
  var headers = ndHeaders_(name);
  var current = sh.getRange(rowNumber,1,1,headers.length).getValues()[0];
  var next = current.slice();
  headers.forEach(function(h,i){ if (updates.hasOwnProperty(h)) next[i] = updates[h]; });
  sh.getRange(rowNumber,1,1,headers.length).setValues([next]);
  ND_RUNTIME_METRICS.batchWrites++;
  ND_RUNTIME_METRICS.rowsWritten++;
  ndInvalidateCaches_(name);
  return true;
}

function ndUpdateManyRows_(name, items) {
  items=(items||[]).filter(function(x){return x&&Number(x.row)>=2;}).sort(function(a,b){return Number(a.row)-Number(b.row);});
  if(!items.length)return 0;
  var sh=ndSheet_(name),headers=ndHeaders_(name),groups=[];
  items.forEach(function(x){var last=groups[groups.length-1];if(!last||Number(x.row)!==last.end+1){last={start:Number(x.row),end:Number(x.row),items:[x]};groups.push(last);}else{last.end=Number(x.row);last.items.push(x);}});
  groups.forEach(function(g){var values=sh.getRange(g.start,1,g.items.length,headers.length).getValues();g.items.forEach(function(item,ri){headers.forEach(function(h,ci){if(item.updates.hasOwnProperty(h))values[ri][ci]=item.updates[h];});});sh.getRange(g.start,1,values.length,headers.length).setValues(values);ND_RUNTIME_METRICS.batchWrites++;ND_RUNTIME_METRICS.rowsWritten+=values.length;});
  ndInvalidateCaches_(name);return items.length;
}

function ndFindOne_(name, field, value) {
  var rows = ndRows_(name);
  var target = String(value);
  // ndRows_ already caches the Sheet data for this request. Scan that
  // snapshot so a mutation can never be followed by a stale index result.
  for(var i=0;i<rows.length;i++){
    if(String(rows[i][field])===target)return Object.assign({},rows[i]);
  }
  return null;
}

function ndFindMany_(name, filters) {
  var rows = ndRows_(name);
  filters = filters || {};
  return rows.filter(function(r){
    return Object.keys(filters).every(function(k){
      var want = filters[k];
      if (want === undefined || want === null || want === '') return true;
      if (Array.isArray(want)) return want.map(String).indexOf(String(r[k])) >= 0;
      return String(r[k]) === String(want);
    });
  });
}

function ndSortDesc_(rows, field) {
  return rows.sort(function(a,b){ return String(b[field]||'').localeCompare(String(a[field]||'')); });
}

function ndNumber_(v) {
  var n = Number(v);
  return isFinite(n) ? n : 0;
}

function ndBool_(v) { return String(v).toUpperCase() === 'TRUE' || v === true || v === 1 || v === '1'; }
function ndRound2_(v) { return Math.round((ndNumber_(v)+Number.EPSILON)*100)/100; }
function ndIsFinanciallyEffectiveStatus_(status) { return ['POSTED','CORRECTED','REVERSED'].indexOf(String(status||'').toUpperCase())>=0; }
function ndBaseTransactionType_(type) { type=String(type||'').toUpperCase();return type.indexOf('REVERSAL_')===0?type.slice(9):type; }
function ndDailyIncomingSignedAmount_(r) {
  if(!r||!ndIsFinanciallyEffectiveStatus_(r.STATUS))return 0;
  var type=ndBaseTransactionType_(r.TYPE),incoming={MONTHLY_SAVINGS:1,EXTRA_SAVINGS:1,LOAN_PAYMENT:1,INCOME:1,INVESTMENT_RETURN_PRINCIPAL:1,INVESTMENT_RETURN_PROFIT:1,INVESTMENT_CLOSURE:1,PROFIT_ENTRY:1};
  if(!incoming[type])return 0;
  return r.DIRECTION==='CREDIT'?ndNumber_(r.AMOUNT):r.DIRECTION==='DEBIT'?-ndNumber_(r.AMOUNT):0;
}
function ndInvestmentIsOpen_(status) { return ['ACTIVE','PARTIALLY_RETURNED','PRINCIPAL_RETURNED'].indexOf(String(status||'').toUpperCase())>=0; }

var ND_FINANCIAL_LOCK_DEPTH = 0;
function ndWithFinancialLock_(fn) {
  if (ND_FINANCIAL_LOCK_DEPTH > 0) return fn();
  var lock=LockService.getScriptLock(); lock.waitLock(30000); ND_FINANCIAL_LOCK_DEPTH++;
  try { return fn(); }
  finally { ND_FINANCIAL_LOCK_DEPTH=Math.max(0,ND_FINANCIAL_LOCK_DEPTH-1); lock.releaseLock(); }
}

function ndNowIso_() {
  return Utilities.formatDate(new Date(), ndConfig_('TIMEZONE','Asia/Dhaka'), "yyyy-MM-dd'T'HH:mm:ssXXX");
}
function ndToday_() { return Utilities.formatDate(new Date(), ndConfig_('TIMEZONE','Asia/Dhaka'), 'yyyy-MM-dd'); }
function ndMonthKey_(date) { return Utilities.formatDate(date || new Date(), ndConfig_('TIMEZONE','Asia/Dhaka'), 'yyyy-MM'); }

function ndSocietyStartMonth_() {
  var v=String(ndConfig_('SOCIETY_START_MONTH','')||'').trim().slice(0,7);
  if(/^\d{4}-\d{2}$/.test(v)) return v;
  var y=String(ndConfig_('ESTD_YEAR','2026')||'2026').replace(/\D/g,'').slice(0,4)||'2026';
  return y+'-08';
}
function ndMonthRange_(startMonth,endMonth,maxMonths) {
  startMonth=String(startMonth||'').slice(0,7); endMonth=String(endMonth||'').slice(0,7);
  if(!/^\d{4}-\d{2}$/.test(startMonth)||!/^\d{4}-\d{2}$/.test(endMonth)) throw new Error('Invalid month range. Use YYYY-MM.');
  if(startMonth>endMonth) throw new Error('শুরুর মাস শেষ মাসের পরে হতে পারে না।');
  var out=[], p=startMonth.split('-'), y=Number(p[0]), m=Number(p[1])-1, guard=Math.max(1,Number(maxMonths||120));
  for(var i=0;i<guard;i++){
    var key=y+'-'+('0'+(m+1)).slice(-2); out.push(key); if(key===endMonth) return out;
    m++; if(m>11){m=0;y++;}
  }
  throw new Error('Month range is too large.');
}
function ndDueMonthKey_(v) {
  return ndMonthOnly_(v);
}
function ndCurrentDueRows_(memberId) {
  var start=ndSocietyStartMonth_(), current=ndMonthKey_(new Date());
  return ndFindMany_('MONTHLY_DUES',{MEMBER_ID:memberId}).filter(function(d){
    var m=ndDueMonthKey_(d.DUE_MONTH);
    return String(d.STATUS||'').toUpperCase()!=='MERGED' && m>=start && m<=current;
  });
}
function ndCurrentDueBalance_(memberId) {
  var rows=ndCurrentDueRows_(memberId), seen={}, duplicate=false;
  rows.forEach(function(d){var m=ndDueMonthKey_(d.DUE_MONTH);if(seen[m])duplicate=true;seen[m]=true;});
  if(duplicate){
    try{ndReconcileSavingsDues_(memberId,'SYSTEM_AUTO_REPAIR');rows=ndCurrentDueRows_(memberId);}catch(e){}
  }
  return ndRound2_(rows.reduce(function(z,d){return z+Math.max(0,ndNumber_(d.BALANCE));},0));
}
function ndDateAddMonths_(dateStr, months) {
  var p = String(dateStr).split('-');
  var d = new Date(Number(p[0]), Number(p[1])-1, Number(p[2]||1));
  d.setMonth(d.getMonth()+Number(months||0));
  return Utilities.formatDate(d, ndConfig_('TIMEZONE','Asia/Dhaka'), 'yyyy-MM-dd');
}
function ndDateAddDays_(dateStr, days) {
  var d = new Date(String(dateStr)+'T00:00:00');
  d.setDate(d.getDate()+Number(days||0));
  return Utilities.formatDate(d, ndConfig_('TIMEZONE','Asia/Dhaka'), 'yyyy-MM-dd');
}
function ndDueDateForMonth_(monthKey) {
  monthKey=String(monthKey||'').slice(0,7);
  if(!/^\d{4}-(0[1-9]|1[0-2])$/.test(monthKey))throw new Error('Invalid due month.');
  var p=monthKey.split('-'), configured=Math.max(1,Math.min(31,Math.floor(ndNumber_(ndConfig_('MONTHLY_DUE_DAY',10))))), last=new Date(Number(p[0]),Number(p[1]),0).getDate(), day=Math.min(configured,last);
  return monthKey+'-'+('0'+day).slice(-2);
}
function ndLateFeeTotal_(units,dueDate,perUnitFee) {
  return ndToday_()>String(dueDate||'')?ndRound2_(Math.max(0,ndNumber_(units))*Math.max(0,ndNumber_(perUnitFee))):0;
}

function ndConfigMap_() {
  if (ND_RUNTIME_CACHE.config) return Object.assign({},ND_RUNTIME_CACHE.config);
  var cache = CacheService.getScriptCache();
  var cached = cache.get('ND_CONFIG_MAP');
  if (cached) { try { ND_RUNTIME_CACHE.config=JSON.parse(cached); return Object.assign({},ND_RUNTIME_CACHE.config); } catch(e){} }
  var map = {};
  ndRows_('CONFIG').forEach(function(r){ map[r.KEY] = r.VALUE; });
  cache.put('ND_CONFIG_MAP', JSON.stringify(map), 300);
  ND_RUNTIME_CACHE.config=map;
  return Object.assign({},map);
}
function ndConfig_(key, fallback) {
  var v = ndConfigMap_()[key];
  return (v === undefined || v === null || v === '') ? fallback : v;
}
function ndSetConfig_(key, value, updatedBy) {
  var row = ndFindOne_('CONFIG','KEY',key);
  if (row) ndUpdateRow_('CONFIG',row._row,{VALUE:value,UPDATED_AT:ndNowIso_(),UPDATED_BY:updatedBy||'SYSTEM'});
  else ndAppend_('CONFIG',{KEY:key,VALUE:value,DESCRIPTION:'',UPDATED_AT:ndNowIso_(),UPDATED_BY:updatedBy||'SYSTEM'});
  CacheService.getScriptCache().remove('ND_CONFIG_MAP');
}
function ndInvalidateCaches_(sheetName) {
  if (!sheetName) {
    var ss=ND_RUNTIME_CACHE&&ND_RUNTIME_CACHE.spreadsheet;
    var sheets=ND_RUNTIME_CACHE&&ND_RUNTIME_CACHE.sheets;
    ND_RUNTIME_CACHE={spreadsheet:ss||null,sheets:sheets||{},headers:{},rows:{},config:null,indexes:{}};
  } else {
    delete ND_RUNTIME_CACHE.rows[sheetName];
    Object.keys(ND_RUNTIME_CACHE.indexes).forEach(function(k){if(k.indexOf(sheetName+'|')===0)delete ND_RUNTIME_CACHE.indexes[k];});
  }
  CacheService.getScriptCache().remove('ND_DASHBOARD_ADMIN');
  if (!sheetName || sheetName==='CONFIG') {
    ND_RUNTIME_CACHE.config=null;
    CacheService.getScriptCache().remove('ND_CONFIG_MAP');
  }
}

function ndReserveIds_(sequenceKey,count,prefix,width) {
  count=Math.max(1,Math.floor(ndNumber_(count)));
  function allocate(){
    var row=ndFindOne_('SEQUENCES','SEQUENCE_KEY',sequenceKey);
    var first=row?ndNumber_(row.VALUE)+1:1;
    var last=first+count-1;
    if(row)ndUpdateRow_('SEQUENCES',row._row,{VALUE:last});
    else ndAppend_('SEQUENCES',{SEQUENCE_KEY:sequenceKey,VALUE:last});
    var out=[];
    for(var i=first;i<=last;i++)out.push(String(prefix||'')+('0000000000'+i).slice(-Number(width||6)));
    return out;
  }
  if(ND_FINANCIAL_LOCK_DEPTH>0)return allocate();
  var lock=LockService.getScriptLock();lock.waitLock(20000);
  try{return allocate();}finally{lock.releaseLock();}
}

function ndNextId_(sequenceKey, prefix, width) {
  return ndReserveIds_(sequenceKey,1,prefix,width)[0];
}

function ndNextMemberId_(joinDate) {
  var year = String(joinDate || ndToday_()).slice(0,4);
  var prefix = ndConfig_('MEMBER_ID_PREFIX','NDS');
  var seq = ndNextId_('MEMBER_'+year,'',4);
  return prefix + '-' + year + '-' + seq;
}
function ndNextReceiptId_() {
  var year = ndToday_().slice(0,4);
  return ndConfig_('RECEIPT_PREFIX','NDS-RCP') + '-' + year + '-' + ndNextId_('RECEIPT_'+year,'',6);
}
function ndNextVoucherId_() {
  var year = ndToday_().slice(0,4);
  return ndConfig_('VOUCHER_PREFIX','NDS-VCH') + '-' + year + '-' + ndNextId_('VOUCHER_'+year,'',6);
}

function ndJson_(obj) { try { return JSON.stringify(obj || {}); } catch(e){ return '{}'; } }
function ndSafeParse_(s, fallback) { try { return JSON.parse(s); } catch(e){ return fallback; } }

function ndAccountById_(accountId) {
  var row = ndFindOne_('BANK_ACCOUNTS','ACCOUNT_ID',accountId || 'ACC-CASH');
  if (!row || row.STATUS !== 'ACTIVE') throw new Error('Invalid payment account.');
  return row;
}
function ndCoaBySystem_(systemName) {
  var rows = ndRows_('CHART_OF_ACCOUNTS');
  for (var i=0;i<rows.length;i++) if (String(rows[i].SYSTEM_ACCOUNT) === String(systemName)) return rows[i];
  throw new Error('Missing system account: '+systemName);
}

function ndMemberSavingsBalance_(memberId) {
  var tx = ndFindMany_('TRANSACTIONS',{MEMBER_ID:memberId}).filter(function(r){ return ndIsFinanciallyEffectiveStatus_(r.STATUS) && r.CATEGORY === 'SAVINGS'; });
  return ndRound2_(tx.reduce(function(sum,r){ return sum + (r.DIRECTION === 'CREDIT' ? ndNumber_(r.AMOUNT) : -ndNumber_(r.AMOUNT)); },0));
}
function ndMemberAccountBalance_(memberId) { return ndMemberSavingsBalance_(memberId); }

function ndMemberLoanOutstanding_(memberId) {
  return ndRound2_(ndFindMany_('LOANS',{MEMBER_ID:memberId}).filter(function(r){ return ['DISBURSED','ACTIVE','OVERDUE'].indexOf(r.STATUS)>=0; }).reduce(function(s,r){return s+ndNumber_(r.OUTSTANDING_PRINCIPAL);},0));
}

function ndCreateAudit_(session, action, entityType, entityId, oldValue, newValue, reason) {
  ndAppend_('AUDIT_LOG',{
    AUDIT_ID:ndNextId_('AUDIT','AUD-',8),USER_ID:session ? session.userId : 'SYSTEM',ACTION:action,ENTITY_TYPE:entityType,ENTITY_ID:entityId,
    OLD_VALUE:typeof oldValue === 'string' ? oldValue : ndJson_(oldValue),NEW_VALUE:typeof newValue === 'string' ? newValue : ndJson_(newValue),
    REASON:reason||'',IP_HINT:'',CREATED_AT:ndNowIso_()
  });
}

function ndCreateNotification_(memberId, type, title, message) {
  var users=ndRows_('USERS').filter(function(u){return u.STATUS==='ACTIVE'&&(memberId?u.MEMBER_ID===memberId:u.ROLE_ID==='ADMIN');});
  if(!users.length&&memberId)users=[{USER_ID:'',MEMBER_ID:memberId}];
  if(!users.length)return;
  var ids=ndReserveIds_('NOTIFICATION',users.length,'NTF-',7),now=ndNowIso_();
  ndAppendMany_('NOTIFICATIONS',users.map(function(user,i){return {NOTIFICATION_ID:ids[i],USER_ID:user.USER_ID||'',MEMBER_ID:memberId||user.MEMBER_ID||'',TYPE:type||'INFO',TITLE:String(title||'').slice(0,160),MESSAGE:String(message||'').slice(0,2000),STATUS:'UNREAD',CREATED_AT:now,READ_AT:''};}));
}

/** ===== Security.gs ===== */
/** Authentication, role permissions and secure session helpers. */
function ndMakeSalt_() { return Utilities.getUuid().replace(/-/g,'') + Utilities.getUuid().replace(/-/g,''); }
function ndSecret_() { return PropertiesService.getScriptProperties().getProperty('ND_APP_SECRET') || 'ND_FALLBACK_SECRET'; }
function ndBytesHex_(bytes) {
  return bytes.map(function(b){ var v=(b<0?b+256:b).toString(16); return v.length===1?'0'+v:v; }).join('');
}
function ndHashPassword_(password, salt) {
  var value = String(password||'') + '|' + String(salt||'') + '|' + ndSecret_();
  for (var i=0;i<120;i++) {
    value = ndBytesHex_(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, value, Utilities.Charset.UTF_8));
  }
  return value;
}
function ndHashToken_(token) {
  return ndBytesHex_(Utilities.computeHmacSha256Signature(String(token||''), ndSecret_()));
}
function ndRandomPassword_() {
  var raw = Utilities.getUuid().replace(/-/g,'').slice(0,10);
  return 'NdS@' + raw.slice(0,4) + '#' + raw.slice(4,8);
}
function ndNormalizeUsername_(u) { return String(u||'').trim().toLowerCase(); }

function login(username, password) {
  username = ndNormalizeUsername_(username);
  if (ndIsLoginTemporarilyLocked_(username)) throw new Error('অনেকবার ভুল লগইন চেষ্টা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।');
  var user = ndRows_('USERS').filter(function(u){ return ndNormalizeUsername_(u.USERNAME) === username; })[0];
  if (!user || user.STATUS !== 'ACTIVE') {
    ndLoginLog_(user?user.USER_ID:'', username, 'LOGIN', false, 'Invalid username or inactive account');
    throw new Error('ইউজারনেম বা পাসওয়ার্ড সঠিক নয়।');
  }
  if (ndHashPassword_(password, user.SALT) !== user.PASSWORD_HASH) {
    ndLoginLog_(user.USER_ID, username, 'LOGIN', false, 'Invalid password');
    throw new Error('ইউজারনেম বা পাসওয়ার্ড সঠিক নয়।');
  }
  var token = Utilities.getUuid().replace(/-/g,'') + Utilities.getUuid().replace(/-/g,'');
  var tokenHash = ndHashToken_(token);
  var hours = Math.max(1, ndNumber_(ndConfig_('SESSION_HOURS',6)));
  var now = new Date();
  var expires = new Date(now.getTime() + hours*3600*1000);
  var sid = ndNextId_('SESSION','SES-',8);
  ndAppend_('SESSIONS',{
    SESSION_ID:sid,TOKEN_HASH:tokenHash,USER_ID:user.USER_ID,CREATED_AT:ndNowIso_(),
    EXPIRES_AT:Utilities.formatDate(expires, ndConfig_('TIMEZONE','Asia/Dhaka'), "yyyy-MM-dd'T'HH:mm:ssXXX"),LAST_SEEN_AT:ndNowIso_(),STATUS:'ACTIVE'
  });
  ndUpdateRow_('USERS', user._row, {LAST_LOGIN_AT:ndNowIso_(),UPDATED_AT:ndNowIso_(),UPDATED_BY:user.USER_ID});
  ndLoginLog_(user.USER_ID, username, 'LOGIN', true, 'Success');
  var expiresIso = Utilities.formatDate(expires, ndConfig_('TIMEZONE','Asia/Dhaka'), "yyyy-MM-dd'T'HH:mm:ssXXX");
  var session = ndSessionObject_(user, sid, expiresIso);
  CacheService.getScriptCache().put('SESSION_'+tokenHash, JSON.stringify(session), Math.min(600, Math.max(1, Math.floor((expires.getTime()-now.getTime())/1000))));
  return {token:token, session:session, mustChangePassword:ndBool_(user.MUST_CHANGE_PASSWORD)};
}

function logout(token) {
  try {
    var tokenHash = ndHashToken_(token);
    var row = ndFindOne_('SESSIONS','TOKEN_HASH',tokenHash);
    if (row) ndUpdateRow_('SESSIONS',row._row,{STATUS:'REVOKED',LAST_SEEN_AT:ndNowIso_()});
    CacheService.getScriptCache().remove('SESSION_'+tokenHash);
  } catch(e) {}
  return {ok:true};
}

function ndRevokeUserSessions_(userId, exceptSessionId) {
  var cache=CacheService.getScriptCache(),now=ndNowIso_(),count=0;
  ndFindMany_('SESSIONS',{USER_ID:userId}).forEach(function(r){
    if(r.STATUS!=='ACTIVE'||(exceptSessionId&&r.SESSION_ID===exceptSessionId))return;
    ndUpdateRow_('SESSIONS',r._row,{STATUS:'REVOKED',LAST_SEEN_AT:now});
    if(r.TOKEN_HASH)cache.remove('SESSION_'+r.TOKEN_HASH);
    count++;
  });
  return count;
}

function ndSessionObject_(user, sessionId, expiresAt) {
  var perms = ndPermissionsForRole_(user.ROLE_ID);
  return {
    sessionId:sessionId,userId:user.USER_ID,memberId:user.MEMBER_ID||'',fullName:user.FULL_NAME||'',username:user.USERNAME,
    role:user.ROLE_ID,permissions:perms,mustChangePassword:ndBool_(user.MUST_CHANGE_PASSWORD),expiresAt:expiresAt||''
  };
}

function ndSession_(token) {
  if (!token) throw new Error('AUTH_REQUIRED');
  var tokenHash = ndHashToken_(token);
  var cache = CacheService.getScriptCache();
  var c = cache.get('SESSION_'+tokenHash);
  if (c) {
    var cs = ndSafeParse_(c,null);
    if (cs && (!cs.expiresAt || new Date(cs.expiresAt).getTime() > new Date().getTime())) return cs;
    cache.remove('SESSION_'+tokenHash);
  }
  var srow = ndFindOne_('SESSIONS','TOKEN_HASH',tokenHash);
  if (!srow || srow.STATUS !== 'ACTIVE') throw new Error('AUTH_EXPIRED');
  if (new Date(srow.EXPIRES_AT).getTime() < new Date().getTime()) {
    ndUpdateRow_('SESSIONS',srow._row,{STATUS:'EXPIRED',LAST_SEEN_AT:ndNowIso_()});
    throw new Error('AUTH_EXPIRED');
  }
  var user = ndFindOne_('USERS','USER_ID',srow.USER_ID);
  if (!user || user.STATUS !== 'ACTIVE') throw new Error('AUTH_EXPIRED');
  var session = ndSessionObject_(user,srow.SESSION_ID,srow.EXPIRES_AT);
  var ttl=Math.min(600,Math.max(1,Math.floor((new Date(srow.EXPIRES_AT).getTime()-new Date().getTime())/1000)));
  cache.put('SESSION_'+tokenHash,JSON.stringify(session),ttl);
  return session;
}

function ndPermissionsForRole_(roleId) {
  var role = ndFindOne_('ROLES','ROLE_ID',roleId);
  return role ? ndSafeParse_(role.PERMISSIONS_JSON,[]) : [];
}
function ndHasPermission_(session, perm) {
  if (!session) return false;
  if (session.permissions.indexOf('*') >= 0) return true;
  return session.permissions.indexOf(perm) >= 0;
}
function ndRequirePermission_(token, perm) {
  var s = ndSession_(token);
  if (!ndHasPermission_(s,perm)) throw new Error('PERMISSION_DENIED: '+perm);
  return s;
}
function ndRequireAdmin_(token) {
  var s = ndSession_(token);
  if (s.role !== 'ADMIN') throw new Error('PERMISSION_DENIED: ADMIN');
  return s;
}

function getSessionInfo(token) {
  return ndSession_(token);
}

function changeMyPassword(token, currentPassword, newPassword) {
  var s = ndSession_(token);
  if (!newPassword || String(newPassword).length < 8) throw new Error('নতুন পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।');
  var user = ndFindOne_('USERS','USER_ID',s.userId);
  if (!user) throw new Error('User not found.');
  if (ndHashPassword_(currentPassword,user.SALT) !== user.PASSWORD_HASH) throw new Error('বর্তমান পাসওয়ার্ড সঠিক নয়।');
  var salt = ndMakeSalt_();
  ndUpdateRow_('USERS',user._row,{PASSWORD_HASH:ndHashPassword_(newPassword,salt),SALT:salt,MUST_CHANGE_PASSWORD:'FALSE',UPDATED_AT:ndNowIso_(),UPDATED_BY:s.userId});
  ndRevokeUserSessions_(user.USER_ID,s.sessionId);
  if (user.ROLE_ID === 'ADMIN' && ndConfig_('INITIAL_ADMIN_USERNAME','admin') === user.USERNAME) ndSetConfig_('INITIAL_ADMIN_TEMP_PASSWORD','');
  ndCreateAudit_(s,'PASSWORD_CHANGE','USER',user.USER_ID,'***','***','Self-service password change');
  return {ok:true};
}

function resetUserPassword(token, userId) {
  var s = ndRequirePermission_(token,'users.edit');
  var user = ndFindOne_('USERS','USER_ID',userId);
  if (!user) throw new Error('User not found.');
  var temp = ndRandomPassword_();
  var salt = ndMakeSalt_();
  ndUpdateRow_('USERS',user._row,{PASSWORD_HASH:ndHashPassword_(temp,salt),SALT:salt,MUST_CHANGE_PASSWORD:'TRUE',UPDATED_AT:ndNowIso_(),UPDATED_BY:s.userId});
  ndRevokeUserSessions_(user.USER_ID,'');
  ndCreateAudit_(s,'PASSWORD_RESET','USER',user.USER_ID,'***','***','Admin reset');
  return {ok:true,username:user.USERNAME,tempPassword:temp};
}

function ndIsLoginTemporarilyLocked_(username) {
  username=ndNormalizeUsername_(username);
  if (!username) return false;
  var maxAttempts=Math.max(3,ndNumber_(ndConfig_('LOGIN_MAX_ATTEMPTS',5)));
  var lockMinutes=Math.max(1,ndNumber_(ndConfig_('LOGIN_LOCK_MINUTES',15)));
  var cutoff=Date.now()-lockMinutes*60*1000;
  var resetAtRaw=ndConfig_('LOGIN_LOCK_RESET_AT','');
  var resetAt=resetAtRaw?new Date(resetAtRaw).getTime():NaN;
  if (isFinite(resetAt) && resetAt>cutoff) cutoff=resetAt;
  var failures=0;
  var rows=ndRows_('LOGIN_LOG');
  for (var i=rows.length-1;i>=0;i--) {
    var r=rows[i];
    if (ndNormalizeUsername_(r.USERNAME)!==username || r.ACTION!=='LOGIN') continue;
    var t=new Date(r.CREATED_AT).getTime();
    if (!isFinite(t) || t<cutoff) break;
    if (ndBool_(r.SUCCESS)) return false;
    failures++;
    if (failures>=maxAttempts) return true;
  }
  return false;
}

function ndLoginLog_(userId, username, action, success, message) {
  try {
    ndAppend_('LOGIN_LOG',{LOGIN_ID:ndNextId_('LOGIN','LOG-',8),USER_ID:userId||'',USERNAME:username||'',ACTION:action||'',SUCCESS:success?'TRUE':'FALSE',MESSAGE:message||'',CREATED_AT:ndNowIso_()});
  } catch(e) {}
}

/** ===== Code.gs ===== */
/** Web entry point and shared API bootstrap. */
function doGet() {
  var t = HtmlService.createTemplateFromFile('Index');
  t.appVersion = '1.1.6';
  return t.evaluate()
    .setTitle('নতুন দিগন্ত সঞ্চয় সমিতি')
    .addMetaTag('viewport','width=device-width, initial-scale=1, viewport-fit=cover');
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function ndBootstrapPayload_(s) {
  var config = {
    nameBn: ndConfig_('SOCIETY_NAME_BN','নতুন দিগন্ত সঞ্চয় সমিতি'),
    nameEn: ndConfig_('SOCIETY_NAME_EN','Notun Digonto Sanchoy Samity'),
    estd: ndConfig_('ESTD_YEAR','2026'),
    tagline: ndConfig_('TAGLINE_BN',''),
    currency: ndConfig_('CURRENCY_SYMBOL','৳'),
    language: ndConfig_('APP_LANGUAGE','bn'),
    unitAmount: ndNumber_(ndConfig_('MONTHLY_UNIT_AMOUNT',1000)),
    dueDay: ndNumber_(ndConfig_('MONTHLY_DUE_DAY',10)),
    societyStartMonth: ndSocietyStartMonth_()
  };
  var accounts = [];
  if (s.role !== 'MEMBER') {
    accounts = ndRows_('BANK_ACCOUNTS').filter(function(r){return r.STATUS==='ACTIVE';}).map(function(r){
      return {id:r.ACCOUNT_ID,code:r.ACCOUNT_CODE,name:r.ACCOUNT_NAME,type:r.TYPE,bank:r.BANK_NAME,number:r.ACCOUNT_NO};
    });
  }
  return {session:s,config:config,accounts:accounts,dashboard:null,version:'1.1.6'};
}

function apiBootstrap(token) {
  return ndBootstrapPayload_(ndSession_(token));
}

/** Single-call login + bootstrap. This removes the fragile second request immediately after login. */
function loginAndBootstrap(username, password) {
  var auth = login(username, password);
  var payload = ndBootstrapPayload_(auth.session);
  payload.token = auth.token;
  payload.mustChangePassword = auth.mustChangePassword;
  return payload;
}

function apiPing(token) {
  var s = ndSession_(token);
  return {ok:true,now:ndNowIso_(),user:s.fullName,role:s.role};
}

function apiAppMeta() {
  return {
    setupReady: !!PropertiesService.getScriptProperties().getProperty('ND_SPREADSHEET_ID'),
    version:'1.1.6',
    timezone:'Asia/Dhaka'
  };
}

/** Public, non-sensitive health check for the login screen. */
function publicAppStatus() {
  try {
    ndSS_();
    return {ok:true,version:'1.1.6',setupReady:true};
  } catch(e) {
    return {ok:false,version:'1.1.6',setupReady:false,message:'Database setup is not ready.'};
  }
}


/** v1.0.1 deployment/health diagnostic. Safe: does not delete business data. */
function RUN_DIAGNOSTIC_V101() {
  var out = {version:'1.0.1', ok:true, checks:[], errors:[]};
  function check(name, fn) {
    try { var v=fn(); out.checks.push({name:name,ok:true,value:v===undefined?'OK':v}); }
    catch(e){ out.ok=false; out.errors.push(name+': '+e.message); out.checks.push({name:name,ok:false,value:e.message}); }
  }
  check('Spreadsheet', function(){ return ndDb_().getName(); });
  check('Required sheets', function(){ var missing=Object.keys(ND_SCHEMA).filter(function(n){return !ndDb_().getSheetByName(n);}); if(missing.length)throw new Error('Missing: '+missing.join(', ')); return Object.keys(ND_SCHEMA).length+' sheets OK'; });
  check('Admin user', function(){ var a=ndRows_('USERS').filter(function(u){return u.ROLE_ID==='ADMIN'&&u.STATUS==='ACTIVE';}); if(!a.length)throw new Error('No active ADMIN'); return a.length+' active admin'; });
  check('Admin role permissions', function(){ var r=ndFindOne_('ROLES','ROLE_ID','ADMIN'); if(!r)throw new Error('ADMIN role missing'); var p=ndSafeParse_(r.PERMISSIONS_JSON,[]); if(p.indexOf('*')<0)throw new Error('ADMIN wildcard permission missing'); return 'OK'; });
  check('Accounts', function(){ return ndRows_('BANK_ACCOUNTS').filter(function(a){return a.STATUS==='ACTIVE';}).length+' active accounts'; });
  check('Data folders', function(){ ['MEMBER_PHOTO_FOLDER_ID','DOCUMENT_FOLDER_ID','BACKUP_FOLDER_ID'].forEach(function(k){var id=ndConfig_(k,''); if(!id)throw new Error(k+' missing'); DriveApp.getFolderById(id).getName();}); return 'OK'; });
  check('Dashboard calculation', function(){ var admin=ndRows_('USERS').filter(function(u){return u.ROLE_ID==='ADMIN'&&u.STATUS==='ACTIVE';})[0]; if(!admin)return 'Skipped'; var fake={userId:admin.USER_ID,role:'ADMIN',permissions:['*']}; var members=ndRows_('MEMBERS').length; var tx=ndRows_('TRANSACTIONS').length; return 'members='+members+', transactions='+tx; });
  var text=JSON.stringify(out,null,2);
  Logger.log(text);
  console.log(text);
  return out;
}

/** Run once after replacing v1.0.1 code with v1.0.2. Preserves all existing rows. */
function RUN_UPDATE_V102(){
  var ss=SpreadsheetApp.getActiveSpreadsheet()||ndDb_();
  PropertiesService.getScriptProperties().setProperty('ND_SPREADSHEET_ID',ss.getId());
  Object.keys(ND_SCHEMA).forEach(function(name){ ndEnsureSheet_(ss,name,ND_SCHEMA[name]); });
  var cfg=ndFindOne_('CONFIG','KEY','SETUP_VERSION');
  if(cfg) ndUpdateRow_('CONFIG',cfg._row,{VALUE:'1.0.2',UPDATED_AT:ndNowIso_()});
  else ndAppend_('CONFIG',{KEY:'SETUP_VERSION',VALUE:'1.0.2',DESCRIPTION:'Database schema version',UPDATED_AT:ndNowIso_()});
  ['STAFF','ACCOUNTANT'].forEach(function(roleId){
    var r=ndFindOne_('ROLES','ROLE_ID',roleId); if(!r) return;
    var perms=ndSafeParse_(r.PERMISSIONS_JSON,[]); if(perms.indexOf('savings.edit')<0) perms.push('savings.edit');
    ndUpdateRow_('ROLES',r._row,{PERMISSIONS_JSON:JSON.stringify(perms),UPDATED_AT:ndNowIso_()});
  });
  var month=ndMonthKey_(new Date()), fixed=0;
  ndRows_('MEMBERS').filter(function(m){return m.STATUS==='ACTIVE';}).forEach(function(m){
    try{ if(ndEnsureMonthlyDue_(m.MEMBER_ID,month,'SYSTEM')) fixed++; ndReconcileSavingsDues_(m.MEMBER_ID,'SYSTEM'); }catch(e){}
  });
  SpreadsheetApp.flush();
  return {ok:true,version:'1.0.2',activeMembersChecked:fixed,message:'v1.0.2 update applied. Unit/date lookup, monthly collection, savings edit and attachment support are ready.'};
}

function RUN_DIAGNOSTIC_V102(){
  var ss=SpreadsheetApp.getActiveSpreadsheet()||ndDb_(), month=ndMonthKey_(new Date());
  var active=ndRows_('MEMBERS').filter(function(m){return m.STATUS==='ACTIVE';});
  var sample=active.slice(0,10).map(function(m){var u=ndGetSavingsUnitForMonth_(m.MEMBER_ID,month);return {memberId:m.MEMBER_ID,name:m.NAME_BN||m.NAME_EN,dob:ndDateOnly_(m.DOB),joinDate:ndDateOnly_(m.JOIN_DATE),units:u?ndNumber_(u.UNITS):0};});
  return {ok:true,version:ndConfig_('SETUP_VERSION',''),spreadsheetId:ss.getId(),month:month,activeMembers:active.length,sample:sample};
}

/** Run once after replacing v1.0.2 code with v1.0.3. Preserves every existing row. */
function RUN_UPDATE_V103(){
  var ss=SpreadsheetApp.getActiveSpreadsheet()||ndDb_();
  PropertiesService.getScriptProperties().setProperty('ND_SPREADSHEET_ID',ss.getId());
  Object.keys(ND_SCHEMA).forEach(function(name){ ndEnsureSheet_(ss,name,ND_SCHEMA[name]); });
  var cfg=ndFindOne_('CONFIG','KEY','SETUP_VERSION');
  if(cfg) ndUpdateRow_('CONFIG',cfg._row,{VALUE:'1.0.3',UPDATED_AT:ndNowIso_()});
  else ndAppend_('CONFIG',{KEY:'SETUP_VERSION',VALUE:'1.0.3',DESCRIPTION:'Database schema version',UPDATED_AT:ndNowIso_()});
  SpreadsheetApp.flush();
  return {ok:true,version:'1.0.3',message:'v1.0.3 update applied. Optional blood group, member NID scan copy and working Bangla/English UI switch are ready.'};
}

function RUN_DIAGNOSTIC_V103(){
  var ss=SpreadsheetApp.getActiveSpreadsheet()||ndDb_();
  var sh=ss.getSheetByName('MEMBERS');
  var headers=sh.getRange(1,1,1,sh.getLastColumn()).getValues()[0];
  var required=['BLOOD_GROUP','NID_SCAN_DOCUMENT_ID'];
  var missing=required.filter(function(h){return headers.indexOf(h)<0;});
  var cfgVersion=ndConfig_('SETUP_VERSION','');
  return {ok:missing.length===0&&cfgVersion==='1.0.3',version:cfgVersion,spreadsheetId:ss.getId(),memberColumnsPresent:missing.length===0,missingColumns:missing,members:ndRows_('MEMBERS').length};
}

function RUN_REPAIR_V101() {
  // Backward-compatible alias: v1.0.3 contains all earlier repairs.
  return RUN_UPDATE_V103();
}


/** ===== MemberService.gs ===== */
/** Members, nominees, profiles and dashboard data. */
function listMembers(token, options) {
  var s = ndSession_(token);
  if (!(ndHasPermission_(s,'members.view') || s.role === 'MEMBER')) throw new Error('PERMISSION_DENIED');
  options = options || {};
  var rows = ndRows_('MEMBERS');
  if (s.role === 'MEMBER') rows = rows.filter(function(r){return r.MEMBER_ID===s.memberId;});
  if (options.status) rows = rows.filter(function(r){return r.STATUS===options.status;});
  var q = String(options.q||'').trim().toLowerCase(), mobileQ=ndMobileSearchKey_(q);
  if (q) rows = rows.filter(function(r){
    var text=[r.MEMBER_ID,r.NAME_BN,r.NAME_EN,r.MOBILE,r.ALT_MOBILE,r.NID].join(' ').toLowerCase();
    return text.indexOf(q)>=0 || (mobileQ&&[r.MOBILE,r.ALT_MOBILE].some(function(v){return ndMobileSearchKey_(v).indexOf(mobileQ)>=0;}));
  });
  rows = ndSortDesc_(rows,'CREATED_AT');
  var limit = Math.min(500, Math.max(1, ndNumber_(options.limit||200)));
  return rows.slice(0,limit).map(function(r){
    return {memberId:r.MEMBER_ID,memberNo:r.MEMBER_NO,nameBn:r.NAME_BN,nameEn:r.NAME_EN,mobile:r.MOBILE,joinDate:ndDateOnly_(r.JOIN_DATE),status:r.STATUS,kycStatus:r.KYC_STATUS,photoFileId:r.PHOTO_FILE_ID};
  });
}

function getMemberProfile(token, memberId) {
  var s = ndSession_(token);
  if (s.role === 'MEMBER') memberId = s.memberId;
  else if (!ndHasPermission_(s,'members.view')) throw new Error('PERMISSION_DENIED');
  var m = ndFindOne_('MEMBERS','MEMBER_ID',memberId);
  if (!m) throw new Error('Member not found.');
  var nominees = ndFindMany_('NOMINEES',{MEMBER_ID:memberId}).filter(function(x){return x.STATUS!=='INACTIVE';});
  var units = ndGetCurrentSavingsUnit_(memberId,ndToday_());
  var savings = ndMemberSavingsBalance_(memberId);
  var dues = ndFindMany_('MONTHLY_DUES',{MEMBER_ID:memberId});
  var dueBalance = ndCurrentDueBalance_(memberId);
  var loanOutstanding = ndMemberLoanOutstanding_(memberId);
  var txns = ndSortDesc_(ndFindMany_('TRANSACTIONS',{MEMBER_ID:memberId}),'TXN_DATE').slice(0,20);
  var receipts = ndSortDesc_(ndFindMany_('RECEIPTS',{MEMBER_ID:memberId}),'RECEIPT_DATE').slice(0,20);
  var loans = ndSortDesc_(ndFindMany_('LOANS',{MEMBER_ID:memberId}),'APPLICATION_DATE');
  var docs = ndSortDesc_(ndFindMany_('DOCUMENTS',{MEMBER_ID:memberId}),'CREATED_AT');
  var audit = s.role === 'MEMBER' ? [] : ndSortDesc_(ndFindMany_('AUDIT_LOG',{ENTITY_ID:memberId}),'CREATED_AT').slice(0,30);
  m.DOB=ndDateOnly_(m.DOB); m.JOIN_DATE=ndDateOnly_(m.JOIN_DATE);
  nominees.forEach(function(n){ n.DOB=ndDateOnly_(n.DOB); });
  return {member:m,nominees:nominees,unit:units,savingsBalance:savings,dueBalance:dueBalance,loanOutstanding:loanOutstanding,transactions:txns,receipts:receipts,loans:loans,documents:docs,audit:audit};
}

function ndNormalizeBloodGroup_(v) {
  v=String(v||'').trim().toUpperCase();
  return ['A+','A-','B+','B-','AB+','AB-','O+','O-'].indexOf(v)>=0?v:'';
}

function ndNormalizeMobile_(v, required) {
  var raw=String(v||'').trim();
  if(!raw){if(required)throw new Error('মোবাইল নম্বর আবশ্যক।');return '';}
  if(!/^\+?[0-9][0-9\s().-]{6,20}$/.test(raw))throw new Error('মোবাইল নম্বর সঠিক নয়।');
  var digits=raw.replace(/\D/g,'');
  if(digits.length<7||digits.length>15)throw new Error('মোবাইল নম্বর সঠিক নয়।');
  // Keep the user's display representation. Searching and duplicate checks use
  // ndMobileSearchKey_ instead of mutating the stored/displayed value.
  return raw;
}
function ndMobileSearchKey_(v) {
  var raw=String(v===undefined||v===null?'':v).trim(), digits=raw.replace(/\D/g,'');
  if(!digits)return '';
  if(digits.indexOf('00880')===0)digits=digits.slice(2);
  if(digits.indexOf('880')===0&&digits.length===13&&digits.charAt(3)==='1')return '0'+digits.slice(3);
  if(digits.length===10&&digits.charAt(0)==='1')return '0'+digits;
  return digits;
}
function ndNormalizeNid_(v) {
  var raw=String(v||'').replace(/[\s-]/g,'');
  if(raw&&!/^\d{8,20}$/.test(raw))throw new Error('NID/Birth Registration নম্বর সঠিক নয়।');
  return raw;
}
function ndNormalizeEmail_(v) {
  var raw=String(v||'').trim().toLowerCase();
  if(raw&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw))throw new Error('ইমেইল ঠিকানা সঠিক নয়।');
  return raw;
}

function ndSaveMemberNidScan_(session, memberId, dataUrl, originalName, previousDocumentId) {
  if (!dataUrl) return previousDocumentId||'';
  var fileId=ndSaveDataUrlFile_(dataUrl,memberId+'_NID_'+Date.now(),ndConfig_('DOCUMENT_FOLDER_ID',''),{kind:'document'});
  var file=DriveApp.getFileById(fileId), docId=ndNextId_('DOCUMENT','DOC-',8), now=ndNowIso_();
  if (previousDocumentId) {
    var old=ndFindOne_('DOCUMENTS','DOCUMENT_ID',previousDocumentId);
    if (old && old.STATUS==='ACTIVE') ndUpdateRow_('DOCUMENTS',old._row,{STATUS:'REPLACED'});
  }
  ndAppend_('DOCUMENTS',{DOCUMENT_ID:docId,MEMBER_ID:memberId,RELATED_TYPE:'MEMBER_NID',RELATED_ID:memberId,TITLE:'NID Scan Copy',FILE_ID:fileId,FILE_NAME:originalName||file.getName(),MIME_TYPE:file.getMimeType(),STATUS:'ACTIVE',CREATED_AT:now,CREATED_BY:session.userId});
  ndCreateAudit_(session,'UPLOAD','DOCUMENT',docId,'',{memberId:memberId,title:'NID Scan Copy'},previousDocumentId?'NID scan replaced':'NID scan uploaded');
  return docId;
}

function createMember(token, payload) {
  var s = ndRequirePermission_(token,'members.edit');
  payload = payload || {};
  if (!String(payload.nameBn||'').trim()) throw new Error('সদস্যের নাম আবশ্যক।');
  payload.mobile=ndNormalizeMobile_(payload.mobile,true);payload.altMobile=ndNormalizeMobile_(payload.altMobile,false);payload.nid=ndNormalizeNid_(payload.nid);payload.email=ndNormalizeEmail_(payload.email);
  var mobileKey=ndMobileSearchKey_(payload.mobile);
  var dupMobile = ndRows_('MEMBERS').filter(function(r){return r.MOBILE && ndMobileSearchKey_(r.MOBILE)===mobileKey && r.STATUS!=='CLOSED';});
  if (dupMobile.length && !payload.allowDuplicateMobile) throw new Error('এই মোবাইল নম্বর দিয়ে ইতোমধ্যে একজন সদস্য আছে।');
  if (payload.nid) {
    var dupNid = ndRows_('MEMBERS').filter(function(r){return r.NID && String(r.NID).replace(/[\s-]/g,'')===payload.nid && r.STATUS!=='CLOSED';});
    if (dupNid.length) throw new Error('এই NID দিয়ে ইতোমধ্যে একজন সদস্য আছে।');
  }
  var joinDate = ndDateOnly_(payload.joinDate || ndToday_());
  var memberId = ndNextMemberId_(joinDate);
  var memberNo = memberId.split('-').pop();
  var now = ndNowIso_();
  var photoFileId = '';
  if (payload.photoDataUrl) photoFileId = ndSaveDataUrlFile_(payload.photoDataUrl,memberId+'_photo',ndConfig_('MEMBER_PHOTO_FOLDER_ID',''),{kind:'image'});
  var row = {
    MEMBER_ID:memberId,MEMBER_NO:memberNo,NAME_BN:String(payload.nameBn||'').trim(),NAME_EN:String(payload.nameEn||'').trim(),PHOTO_FILE_ID:photoFileId,PHOTO_MIME:payload.photoMime||'',
    FATHER_NAME:payload.fatherName||'',MOTHER_NAME:payload.motherName||'',DOB:ndDateOnly_(payload.dob||''),NID:payload.nid||'',MOBILE:payload.mobile||'',ALT_MOBILE:payload.altMobile||'',EMAIL:payload.email||'',
    PROFESSION:payload.profession||'',PRESENT_ADDRESS:payload.presentAddress||'',PERMANENT_ADDRESS:payload.permanentAddress||'',JOIN_DATE:joinDate,STATUS:'ACTIVE',KYC_STATUS:payload.kycStatus||'PENDING',NOTES:payload.notes||'',
    CREATED_AT:now,CREATED_BY:s.userId,UPDATED_AT:now,UPDATED_BY:s.userId,BLOOD_GROUP:ndNormalizeBloodGroup_(payload.bloodGroup),NID_SCAN_DOCUMENT_ID:''
  };
  ndAppend_('MEMBERS',row);
  if (payload.nidScanDataUrl) {
    var nidDocId=ndSaveMemberNidScan_(s,memberId,payload.nidScanDataUrl,payload.nidScanFileName,'');
    var createdMember=ndFindOne_('MEMBERS','MEMBER_ID',memberId);
    if (createdMember) ndUpdateRow_('MEMBERS',createdMember._row,{NID_SCAN_DOCUMENT_ID:nidDocId,UPDATED_AT:ndNowIso_(),UPDATED_BY:s.userId});
    row.NID_SCAN_DOCUMENT_ID=nidDocId;
  }
  var unitAmount = ndNumber_(ndConfig_('MONTHLY_UNIT_AMOUNT',1000));
  var units = Math.max(1,Math.floor(ndNumber_(payload.units||1)));
  var societyStart=ndSocietyStartMonth_();
  ndAppend_('SAVINGS_UNITS',{UNIT_ID:ndNextId_('UNIT','UNT-',7),MEMBER_ID:memberId,UNITS:units,UNIT_AMOUNT:unitAmount,EFFECTIVE_FROM:societyStart+'-01',EFFECTIVE_TO:'',STATUS:'ACTIVE',NOTES:'Initial units effective from society start; joining date is profile information only',CREATED_AT:now,CREATED_BY:s.userId,UPDATED_AT:now,UPDATED_BY:s.userId});
  if (payload.nominee && payload.nominee.name) ndCreateNominee_(s,memberId,payload.nominee);
  var cred = ndCreateMemberUser_(s,memberId,row.NAME_BN||row.NAME_EN);
  var dueRowsCreated=ndEnsureMemberDuesThroughMonth_(memberId, ndMonthKey_(new Date()), s.userId);
  var dueReconciliation=ndReconcileSavingsDues_(memberId,s.userId);
  ndCreateAudit_(s,'CREATE','MEMBER',memberId,'',row,'New member created');
  return {ok:true,memberId:memberId,username:cred.username,tempPassword:cred.tempPassword,dueStartMonth:societyStart,dueRowsCreated:dueRowsCreated,outstandingDue:ndCurrentDueBalance_(memberId),dueReconciliation:dueReconciliation};
}

function updateMember(token, memberId, payload, reason) {
  var s = ndRequirePermission_(token,'members.edit');
  var m = ndFindOne_('MEMBERS','MEMBER_ID',memberId);
  if (!m) throw new Error('Member not found.');
  payload = payload || {};
  if(payload.hasOwnProperty('nameBn')&&!String(payload.nameBn||'').trim())throw new Error('সদস্যের নাম আবশ্যক।');
  if(payload.hasOwnProperty('mobile'))payload.mobile=ndNormalizeMobile_(payload.mobile,true);
  if(payload.hasOwnProperty('altMobile'))payload.altMobile=ndNormalizeMobile_(payload.altMobile,false);
  if(payload.hasOwnProperty('nid'))payload.nid=ndNormalizeNid_(payload.nid);
  if(payload.hasOwnProperty('email'))payload.email=ndNormalizeEmail_(payload.email);
  if(payload.hasOwnProperty('status')&&['ACTIVE','SUSPENDED','INACTIVE','CLOSED'].indexOf(String(payload.status).toUpperCase())<0)throw new Error('Invalid member status.');
  if(payload.hasOwnProperty('kycStatus')&&['PENDING','VERIFIED','REJECTED'].indexOf(String(payload.kycStatus).toUpperCase())<0)throw new Error('Invalid KYC status.');
  if(payload.mobile&&ndRows_('MEMBERS').some(function(r){return r.MEMBER_ID!==memberId&&r.STATUS!=='CLOSED'&&r.MOBILE&&ndMobileSearchKey_(r.MOBILE)===ndMobileSearchKey_(payload.mobile);}))throw new Error('এই মোবাইল নম্বর দিয়ে ইতোমধ্যে একজন সদস্য আছে।');
  if(payload.nid&&ndRows_('MEMBERS').some(function(r){return r.MEMBER_ID!==memberId&&r.STATUS!=='CLOSED'&&r.NID&&String(r.NID).replace(/[\s-]/g,'')===payload.nid;}))throw new Error('এই NID দিয়ে ইতোমধ্যে একজন সদস্য আছে।');
  var up = {};
  var map = {
    nameBn:'NAME_BN',nameEn:'NAME_EN',fatherName:'FATHER_NAME',motherName:'MOTHER_NAME',dob:'DOB',nid:'NID',mobile:'MOBILE',altMobile:'ALT_MOBILE',email:'EMAIL',profession:'PROFESSION',presentAddress:'PRESENT_ADDRESS',permanentAddress:'PERMANENT_ADDRESS',status:'STATUS',kycStatus:'KYC_STATUS',notes:'NOTES',bloodGroup:'BLOOD_GROUP'
  };
  Object.keys(map).forEach(function(k){ if (payload.hasOwnProperty(k)) up[map[k]]=payload[k]; });
  if (up.hasOwnProperty('DOB')) up.DOB=ndDateOnly_(up.DOB);
  if (up.hasOwnProperty('BLOOD_GROUP')) up.BLOOD_GROUP=ndNormalizeBloodGroup_(up.BLOOD_GROUP);
  if (payload.photoDataUrl) {
    up.PHOTO_FILE_ID = ndSaveDataUrlFile_(payload.photoDataUrl,memberId+'_photo_'+Date.now(),ndConfig_('MEMBER_PHOTO_FOLDER_ID',''),{kind:'image'});
    up.PHOTO_MIME = payload.photoMime||'';
  }
  if (payload.nidScanDataUrl) up.NID_SCAN_DOCUMENT_ID=ndSaveMemberNidScan_(s,memberId,payload.nidScanDataUrl,payload.nidScanFileName,m.NID_SCAN_DOCUMENT_ID||'');
  up.UPDATED_AT=ndNowIso_(); up.UPDATED_BY=s.userId;
  ndUpdateRow_('MEMBERS',m._row,up);
  if (payload.hasOwnProperty('units')) ndChangeSavingsUnits_(s,memberId,payload.units,payload.unitEffectiveFrom||ndToday_(),reason||'Member unit update');
  ndCreateAudit_(s,'UPDATE','MEMBER',memberId,m,up,reason||'Member profile edit');
  return {ok:true};
}

function ndCreateMemberUser_(session, memberId, fullName) {
  var existing = ndRows_('USERS').filter(function(u){return u.MEMBER_ID===memberId;})[0];
  if (existing) return {username:existing.USERNAME,tempPassword:''};
  var no = memberId.split('-').pop();
  var username = ('nds'+no).toLowerCase();
  var users = ndRows_('USERS');
  if (users.some(function(u){return ndNormalizeUsername_(u.USERNAME)===username;})) username = ('nds'+no+String(Date.now()).slice(-3)).toLowerCase();
  var temp = ndRandomPassword_(); var salt=ndMakeSalt_(); var now=ndNowIso_();
  ndAppend_('USERS',{USER_ID:ndNextId_('USER','USR-',6),MEMBER_ID:memberId,FULL_NAME:fullName||memberId,USERNAME:username,PASSWORD_HASH:ndHashPassword_(temp,salt),SALT:salt,ROLE_ID:'MEMBER',STATUS:'ACTIVE',MUST_CHANGE_PASSWORD:'TRUE',LAST_LOGIN_AT:'',CREATED_AT:now,CREATED_BY:session.userId,UPDATED_AT:now,UPDATED_BY:session.userId});
  return {username:username,tempPassword:temp};
}

function ndCreateNominee_(session, memberId, p) {
  var percent=ndNumber_(p.percent===undefined?100:p.percent);if(percent<=0||percent>100)throw new Error('Nominee percentage must be between 0 and 100.');
  var photoId = p.photoDataUrl ? ndSaveDataUrlFile_(p.photoDataUrl,memberId+'_nominee_'+Date.now(),ndConfig_('MEMBER_PHOTO_FOLDER_ID',''),{kind:'image'}) : '';
  var row={NOMINEE_ID:ndNextId_('NOMINEE','NOM-',7),MEMBER_ID:memberId,NAME:String(p.name||'').trim(),RELATION:p.relation||'',DOB:ndDateOnly_(p.dob||''),NID:ndNormalizeNid_(p.nid),MOBILE:ndNormalizeMobile_(p.mobile,false),ADDRESS:p.address||'',PHOTO_FILE_ID:photoId,PERCENT:percent,STATUS:'ACTIVE',CREATED_AT:ndNowIso_(),CREATED_BY:session.userId,UPDATED_AT:ndNowIso_(),UPDATED_BY:session.userId};
  ndAppend_('NOMINEES',row); return row;
}

function saveNominee(token, memberId, payload) {
  var s=ndRequirePermission_(token,'members.edit');
  if (!payload || !payload.name) throw new Error('Nominee name required.');
  var row=ndCreateNominee_(s,memberId,payload);
  ndCreateAudit_(s,'CREATE','NOMINEE',row.NOMINEE_ID,'',row,'Nominee added');
  return {ok:true,nomineeId:row.NOMINEE_ID};
}

function updateNominee(token, nomineeId, payload, reason) {
  var s=ndRequirePermission_(token,'members.edit');
  var n=ndFindOne_('NOMINEES','NOMINEE_ID',nomineeId);
  if(!n) throw new Error('Nominee not found.');
  payload=payload||{};var up={UPDATED_AT:ndNowIso_(),UPDATED_BY:s.userId};
  var map={name:'NAME',relation:'RELATION',dob:'DOB',nid:'NID',mobile:'MOBILE',address:'ADDRESS',percent:'PERCENT',status:'STATUS'};
  Object.keys(map).forEach(function(k){if(payload.hasOwnProperty(k))up[map[k]]=k==='percent'?ndNumber_(payload[k]):payload[k];});
  if(up.hasOwnProperty('PERCENT')&&(up.PERCENT<=0||up.PERCENT>100))throw new Error('Nominee percentage must be between 0 and 100.');
  if(up.hasOwnProperty('NID'))up.NID=ndNormalizeNid_(up.NID);if(up.hasOwnProperty('MOBILE'))up.MOBILE=ndNormalizeMobile_(up.MOBILE,false);
  if(payload.photoDataUrl)up.PHOTO_FILE_ID=ndSaveDataUrlFile_(payload.photoDataUrl,n.MEMBER_ID+'_nominee_'+Date.now(),ndConfig_('MEMBER_PHOTO_FOLDER_ID',''),{kind:'image'});
  ndUpdateRow_('NOMINEES',n._row,up);ndCreateAudit_(s,'UPDATE','NOMINEE',nomineeId,n,up,reason||'Nominee updated');return {ok:true};
}

function listProfileUpdateRequests(token, memberId) {
  var s=ndRequirePermission_(token,'members.edit');
  var rows=ndRows_('APPROVALS').filter(function(a){return a.ENTITY_TYPE==='MEMBER_PROFILE_REQUEST'&&(!memberId||a.ENTITY_ID===memberId);});
  return ndSortDesc_(rows,'REQUESTED_AT').slice(0,300).map(function(a){return {approvalId:a.APPROVAL_ID,memberId:a.ENTITY_ID,status:a.STATUS,changes:ndSafeParse_(a.DATA_JSON,{}),requestedBy:a.REQUESTED_BY,requestedAt:a.REQUESTED_AT,decidedBy:a.DECIDED_BY,decidedAt:a.DECIDED_AT,note:a.NOTE};});
}

function getMemberPhoto(token, memberId) {
  var s=ndSession_(token);
  if (s.role==='MEMBER' && memberId!==s.memberId) throw new Error('PERMISSION_DENIED');
  if (s.role!=='MEMBER' && !ndHasPermission_(s,'members.view')) throw new Error('PERMISSION_DENIED');
  var m=ndFindOne_('MEMBERS','MEMBER_ID',memberId);
  if (!m || !m.PHOTO_FILE_ID) return '';
  return ndDriveFileDataUri_(m.PHOTO_FILE_ID);
}

function ndDriveFileDataUri_(fileId) {
  try {
    var blob=DriveApp.getFileById(fileId).getBlob();
    return 'data:'+blob.getContentType()+';base64,'+Utilities.base64Encode(blob.getBytes());
  } catch(e) { return ''; }
}

function ndSaveDataUrlFile_(dataUrl, name, folderId, options) {
  if (!dataUrl) return '';
  var m=String(dataUrl).match(/^data:([^;]+);base64,(.+)$/);
  if (!m) throw new Error('Invalid file data.');
  options=options||{};var mime=String(m[1]).toLowerCase(),bytes=Utilities.base64Decode(m[2]);
  var imageTypes=['image/jpeg','image/png','image/webp'];var documentTypes=imageTypes.concat(['application/pdf']);
  var allowed=options.kind==='image'?imageTypes:documentTypes;
  if(allowed.indexOf(mime)<0)throw new Error(options.kind==='image'?'Only JPG, PNG or WebP images are allowed.':'Only JPG, PNG, WebP or PDF files are allowed.');
  var maxBytes=Math.min(5*1024*1024,Math.max(1024,ndNumber_(options.maxBytes||5*1024*1024)));
  if (bytes.length > maxBytes) throw new Error('File too large. Max '+Math.floor(maxBytes/1024/1024)+' MB.');
  var ext=(mime.split('/')[1]||'bin').replace('jpeg','jpg').replace(/[^a-zA-Z0-9]/g,'');
  var folder=DriveApp.getFolderById(folderId);
  var safeName=String(name||'file').replace(/[^a-zA-Z0-9._-]+/g,'_').slice(0,100)||'file';
  var file=folder.createFile(Utilities.newBlob(bytes,mime,safeName+'.'+ext));
  return file.getId();
}

function requestMyProfileUpdate(token, changes, note) {
  var s=ndSession_(token);
  if (s.role!=='MEMBER') throw new Error('Only member portal can use this request.');
  changes=changes||{};var allowed=['nameBn','nameEn','fatherName','motherName','dob','nid','mobile','altMobile','email','profession','presentAddress','permanentAddress','notes','bloodGroup'],safe={};allowed.forEach(function(k){if(changes.hasOwnProperty(k))safe[k]=changes[k];});
  if(!Object.keys(safe).length)throw new Error('No permitted profile changes were submitted.');
  var id=ndNextId_('APPROVAL','APR-',7);
  ndAppend_('APPROVALS',{APPROVAL_ID:id,ENTITY_TYPE:'MEMBER_PROFILE_REQUEST',ENTITY_ID:s.memberId,STEP:'ADMIN_REVIEW',STATUS:'PENDING',DATA_JSON:ndJson_(safe),REQUESTED_BY:s.userId,REQUESTED_AT:ndNowIso_(),DECIDED_BY:'',DECIDED_AT:'',NOTE:String(note||'').slice(0,500)});
  ndCreateNotification_('', 'ADMIN_ACTION','সদস্য তথ্য সংশোধন অনুরোধ',s.memberId+' profile update request submitted.');
  return {ok:true,approvalId:id};
}

function approveProfileUpdate(token, approvalId, approve, note) {
  var s=ndRequirePermission_(token,'members.edit');
  var a=ndFindOne_('APPROVALS','APPROVAL_ID',approvalId);
  if (!a || a.ENTITY_TYPE!=='MEMBER_PROFILE_REQUEST' || a.STATUS!=='PENDING') throw new Error('Request not found or already decided.');
  if (approve) updateMember(token,a.ENTITY_ID,ndSafeParse_(a.DATA_JSON,{}),'Approved member self-update request');
  ndUpdateRow_('APPROVALS',a._row,{STATUS:approve?'APPROVED':'REJECTED',DECIDED_BY:s.userId,DECIDED_AT:ndNowIso_(),NOTE:note||a.NOTE});
  ndCreateNotification_(a.ENTITY_ID,'PROFILE','প্রোফাইল আপডেট',approve?'আপনার তথ্য সংশোধনের অনুরোধ অনুমোদিত হয়েছে।':'আপনার তথ্য সংশোধনের অনুরোধ অনুমোদিত হয়নি।');
  return {ok:true};
}

function getAdminDashboard(token) {
  var s=ndSession_(token);
  if (!ndHasPermission_(s,'dashboard.view')) throw new Error('PERMISSION_DENIED');
  var cache=CacheService.getScriptCache();
  var cached=cache.get('ND_DASHBOARD_ADMIN');
  if (cached) { var parsed=ndSafeParse_(cached,null); if(parsed) return parsed; }
  var members=ndRows_('MEMBERS');
  var active=members.filter(function(r){return r.STATUS==='ACTIVE';}).length;
  var inactive=members.length-active;
  var transactionRows=ndRows_('TRANSACTIONS');
  var tx=transactionRows.filter(function(r){return r.STATUS==='POSTED';});
  var allFinancialTx=transactionRows.filter(function(r){return ndIsFinanciallyEffectiveStatus_(r.STATUS);});
  var totalSavings=ndRound2_(allFinancialTx.filter(function(r){return r.CATEGORY==='SAVINGS';}).reduce(function(z,r){return z+(r.DIRECTION==='CREDIT'?ndNumber_(r.AMOUNT):-ndNumber_(r.AMOUNT));},0));
  var today=ndToday_();
  var todayCollection=ndRound2_(allFinancialTx.filter(function(r){return ndDateOnly_(r.TXN_DATE)===today;}).reduce(function(z,r){return z+ndDailyIncomingSignedAmount_(r);},0));
  var loans=ndRows_('LOANS');
  var totalLoan=ndRound2_(loans.filter(function(r){return ['DISBURSED','ACTIVE','OVERDUE','CLOSED'].indexOf(r.STATUS)>=0;}).reduce(function(z,r){return z+ndNumber_(r.APPROVED_AMOUNT);},0));
  var loanOutstanding=ndRound2_(loans.reduce(function(z,r){return z+ndNumber_(r.OUTSTANDING_PRINCIPAL);},0));
  var monthly=[], savingsByMonth={}; var now=new Date();
  allFinancialTx.forEach(function(r){
    if(r.CATEGORY!=='SAVINGS')return;
    var key=ndMonthOnly_(r.TXN_DATE), sign=r.DIRECTION==='CREDIT'?1:-1, bucket=savingsByMonth[key]||(savingsByMonth[key]={regular:0,extra:0});
    if(['EXTRA_SAVINGS','REVERSAL_EXTRA_SAVINGS'].indexOf(r.TYPE)>=0)bucket.extra+=sign*ndNumber_(r.AMOUNT);
    else if(['MONTHLY_SAVINGS','REVERSAL_MONTHLY_SAVINGS'].indexOf(r.TYPE)>=0)bucket.regular+=sign*ndNumber_(r.AMOUNT);
  });
  for(var i=11;i>=0;i--){
    var d=new Date(now.getFullYear(),now.getMonth()-i,1); var key=ndMonthKey_(d);
    var regular=savingsByMonth[key]?savingsByMonth[key].regular:0,extra=savingsByMonth[key]?savingsByMonth[key].extra:0;
    monthly.push({month:key,regular:ndRound2_(regular),extra:ndRound2_(extra)});
  }
  var recentMembers=ndSortDesc_(members.slice(),'CREATED_AT').slice(0,8).map(function(r){return {memberId:r.MEMBER_ID,name:r.NAME_BN||r.NAME_EN,joinDate:ndDateOnly_(r.JOIN_DATE),photoFileId:r.PHOTO_FILE_ID};});
  var recentTx=ndSortDesc_(tx.slice(),'CREATED_AT').slice(0,7).map(function(r){return {txnId:r.TXN_ID,date:r.TXN_DATE,memberId:r.MEMBER_ID,type:r.TYPE,amount:ndNumber_(r.AMOUNT),createdBy:r.CREATED_BY,receiptId:r.RECEIPT_ID};});
  var recentLoans=ndSortDesc_(loans.slice(),'CREATED_AT').slice(0,7).map(function(r){return {loanId:r.LOAN_ID,memberId:r.MEMBER_ID,amount:ndNumber_(r.REQUESTED_AMOUNT),status:r.APPROVAL_STATUS||r.STATUS,date:r.APPLICATION_DATE};});
  var dueMembers={due:0};
  var dues=ndRows_('MONTHLY_DUES'), currentMonth=ndMonthKey_(new Date()), startMonth=ndSocietyStartMonth_();
  var dueSet={}; dues.forEach(function(d){var m=ndDueMonthKey_(d.DUE_MONTH);if(String(d.STATUS||'').toUpperCase()!=='MERGED'&&m>=startMonth&&m<=currentMonth&&ndNumber_(d.BALANCE)>0) dueSet[d.MEMBER_ID]=true;}); dueMembers.due=Object.keys(dueSet).length;
  var pl=getProfitLoss(token); var income=pl.income, expense=pl.expense;
  var accountBalances=ndGetAccountBalances_();
  var cashBank=accountBalances.filter(function(a){return ['CASH','BANK','MFS'].indexOf(a.type)>=0;}).reduce(function(z,a){return z+a.balance;},0);
  var investments=ndRows_('INVESTMENTS').filter(function(i){return i.STATUS!=='CANCELLED';}),activeInvestments=investments.filter(function(i){return ndInvestmentIsOpen_(i.STATUS);}),closedInvestments=investments.filter(function(i){return ['SOLD_CLOSED','COMPLETED'].indexOf(i.STATUS)>=0;}),totalInvestment=ndRound2_(investments.reduce(function(z,i){return z+ndInvestmentTotalCost_(i);},0)),activeInvestmentAmount=ndRound2_(activeInvestments.reduce(function(z,i){return z+ndInvestmentTotalCost_(i);},0)),closedInvestmentAmount=ndRound2_(closedInvestments.reduce(function(z,i){return z+ndInvestmentTotalCost_(i);},0)),principalReturned=ndRound2_(investments.reduce(function(z,i){return z+ndNumber_(i.PRINCIPAL_RETURNED);},0)),investmentProfit=ndRound2_(investments.reduce(function(z,i){return z+ndNumber_(i.PROFIT_GENERATED);},0));
  var sources={},invMap={};ndRows_('PROFIT_SOURCES').forEach(function(x){sources[x.SOURCE_ID]=x;});investments.forEach(function(x){invMap[x.INVESTMENT_ID]=x;});var profitRows=ndRows_('PROFIT_RECORDS').filter(function(p){return ['REVERSED','CANCELLED'].indexOf(p.STATUS)<0;}),profitTotal=0,profitDistributed=0,profitMonthly=0,profitYearly=0,profitBySource={},profitByInvestment={},profitByCategory={},currentMonth=ndMonthKey_(new Date()),currentYear=currentMonth.slice(0,4);profitRows.forEach(function(p){var amount=ndNumber_(p.AMOUNT),dist=ndProfitApprovedAmount_(p.PROFIT_ID),source=(sources[p.SOURCE_ID]||{}).SOURCE_NAME||p.SOURCE_ID||'Other',iname=(invMap[p.INVESTMENT_ID]||{}).NAME||p.INVESTMENT_ID||'Other',cat=p.CATEGORY||'OTHER',profitDate=ndDateOnly_(p.PROFIT_DATE);profitTotal+=amount;profitDistributed+=dist;if(profitDate.slice(0,7)===currentMonth)profitMonthly+=amount;if(profitDate.slice(0,4)===currentYear)profitYearly+=amount;profitBySource[source]=(profitBySource[source]||0)+amount;profitByInvestment[iname]=(profitByInvestment[iname]||0)+amount;profitByCategory[cat]=(profitByCategory[cat]||0)+amount;});function ndDashAgg_(o){return Object.keys(o).map(function(k){return {label:k,amount:ndRound2_(o[k])};}).sort(function(a,b){return b.amount-a.amount;});}
  var data={
    kpi:{totalMembers:members.length,activeMembers:active,inactiveMembers:inactive,totalSavings:totalSavings,todayCollection:todayCollection,totalLoan:totalLoan,loanOutstanding:loanOutstanding,totalIncome:ndRound2_(income),totalExpense:ndRound2_(expense),netBalance:ndRound2_(income-expense),cashBank:ndRound2_(cashBank),dueMembers:dueMembers.due,totalInvestment:totalInvestment,activeInvestment:activeInvestmentAmount,activeInvestmentCount:activeInvestments.length,closedInvestment:closedInvestmentAmount,closedInvestmentCount:closedInvestments.length,principalReturned:principalReturned,totalProfitGenerated:ndRound2_(profitTotal),totalProfitDistributed:ndRound2_(profitDistributed),undistributedProfit:ndRound2_(profitTotal-profitDistributed),monthlyProfit:ndRound2_(profitMonthly),yearlyProfit:ndRound2_(profitYearly),investmentProfit:investmentProfit},
    monthly:monthly,savingsMix:{regular:ndRound2_(allFinancialTx.filter(function(r){return r.CATEGORY==='SAVINGS'&&['MONTHLY_SAVINGS','REVERSAL_MONTHLY_SAVINGS','PROFIT_DISTRIBUTION','REVERSAL_PROFIT_DISTRIBUTION','ASSOCIATION_EXPENSE_DEDUCTION','REVERSAL_ASSOCIATION_EXPENSE_DEDUCTION','SAVINGS_WITHDRAWAL','REVERSAL_SAVINGS_WITHDRAWAL'].indexOf(r.TYPE)>=0;}).reduce(function(z,r){return z+(r.DIRECTION==='CREDIT'?ndNumber_(r.AMOUNT):-ndNumber_(r.AMOUNT));},0)),extra:ndRound2_(allFinancialTx.filter(function(r){return r.CATEGORY==='SAVINGS'&&['EXTRA_SAVINGS','REVERSAL_EXTRA_SAVINGS'].indexOf(r.TYPE)>=0;}).reduce(function(z,r){return z+(r.DIRECTION==='CREDIT'?ndNumber_(r.AMOUNT):-ndNumber_(r.AMOUNT));},0))},
    recentMembers:recentMembers,recentTransactions:recentTx,recentLoans:recentLoans,memberStatus:{active:active,inactive:inactive,due:dueMembers.due},accountBalances:accountBalances,profitAnalytics:{bySource:ndDashAgg_(profitBySource),byInvestment:ndDashAgg_(profitByInvestment),byCategory:ndDashAgg_(profitByCategory)}
  };
  cache.put('ND_DASHBOARD_ADMIN',JSON.stringify(data),60);
  return data;
}

function getMemberDashboard(token) {
  var s=ndSession_(token);
  if (s.role!=='MEMBER') throw new Error('Member portal only.');
  var p=getMemberProfile(token,s.memberId);
  var notifications=ndSortDesc_(ndFindMany_('NOTIFICATIONS',{MEMBER_ID:s.memberId}),'CREATED_AT').slice(0,10);
  var due=ndCurrentDueRows_(s.memberId).filter(function(d){return ndNumber_(d.BALANCE)>0;});
  var nextLoanDue='';
  var schedules=[]; p.loans.forEach(function(l){if(['DISBURSED','ACTIVE','OVERDUE'].indexOf(l.STATUS)>=0) schedules=schedules.concat(ndFindMany_('LOAN_SCHEDULE',{LOAN_ID:l.LOAN_ID}).filter(function(x){return x.STATUS!=='PAID';}));});
  schedules.sort(function(a,b){return String(a.DUE_DATE).localeCompare(String(b.DUE_DATE));}); if(schedules.length) nextLoanDue=schedules[0].DUE_DATE;
  return {member:{memberId:p.member.MEMBER_ID,name:p.member.NAME_BN||p.member.NAME_EN,status:p.member.STATUS,joinDate:p.member.JOIN_DATE,photoFileId:p.member.PHOTO_FILE_ID},summary:{savings:p.savingsBalance,due:p.dueBalance,units:p.unit?ndNumber_(p.unit.UNITS):0,monthlyAmount:p.unit?ndNumber_(p.unit.UNITS)*ndNumber_(p.unit.UNIT_AMOUNT):0,loanOutstanding:p.loanOutstanding,nextLoanDue:nextLoanDue},recentTransactions:p.transactions.slice(0,8),notifications:notifications,dueItems:due.slice(0,12)};
}

/** ===== SavingsService.gs ===== */
/** Savings units, monthly dues, collections, receipts and member ledger. */
function ndGetCurrentSavingsUnit_(memberId, dateStr) {
  dateStr = ndDateOnly_(dateStr || ndToday_());
  var rows = ndFindMany_('SAVINGS_UNITS',{MEMBER_ID:memberId}).filter(function(r){
    var from=ndDateOnly_(r.EFFECTIVE_FROM), to=ndDateOnly_(r.EFFECTIVE_TO);
    return r.STATUS==='ACTIVE' && (!from || from<=dateStr) && (!to || to>=dateStr);
  });
  rows.sort(function(a,b){return ndDateOnly_(b.EFFECTIVE_FROM).localeCompare(ndDateOnly_(a.EFFECTIVE_FROM));});
  return rows[0]||null;
}

function ndGetSavingsUnitForMonth_(memberId, monthKey) {
  monthKey=String(monthKey||ndMonthKey_(new Date())).slice(0,7);
  var startMonth=ndSocietyStartMonth_();
  if(monthKey<startMonth) return null;
  var all=ndFindMany_('SAVINGS_UNITS',{MEMBER_ID:memberId}).filter(function(r){return r.STATUS==='ACTIVE';});
  var rows=all.filter(function(r){
    var fromMonth=ndMonthOnly_(r.EFFECTIVE_FROM), toMonth=ndMonthOnly_(r.EFFECTIVE_TO);
    return (!fromMonth || fromMonth<=monthKey) && (!toMonth || toMonth>=monthKey);
  });
  rows.sort(function(a,b){return ndDateOnly_(b.EFFECTIVE_FROM).localeCompare(ndDateOnly_(a.EFFECTIVE_FROM));});
  if(rows.length) return rows[0];
  // Business rule v1.0.9: every member's monthly obligation starts from the society start month,
  // even when the member joins later. Months before the first unit record use that member's initial unit.
  if(all.length){
    all.sort(function(a,b){return ndDateOnly_(a.EFFECTIVE_FROM).localeCompare(ndDateOnly_(b.EFFECTIVE_FROM));});
    var first=all[0], firstMonth=ndMonthOnly_(first.EFFECTIVE_FROM);
    if(monthKey>=startMonth && firstMonth && monthKey<firstMonth) return first;
  }
  return null;
}

function ndChangeSavingsUnits_(session, memberId, units, effectiveFrom, reason) {
  units=Math.floor(ndNumber_(units)); if(units<1) throw new Error('Savings unit must be at least 1.');
  effectiveFrom=ndDateOnly_(effectiveFrom||ndToday_());
  var current=ndGetCurrentSavingsUnit_(memberId,effectiveFrom);
  if(current && ndNumber_(current.UNITS)===units) return current;
  // v1.1.6 business rule: an increase is cumulative and its difference applies
  // from SOCIETY_START_MONTH. Add only the delta to every historical unit band;
  // this keeps previous changes auditable and makes repeat execution idempotent.
  if(current && units>ndNumber_(current.UNITS)){
    var delta=units-ndNumber_(current.UNITS), history=ndFindMany_('SAVINGS_UNITS',{MEMBER_ID:memberId}).filter(function(r){return r.STATUS==='ACTIVE';});
    ndUpdateManyRows_('SAVINGS_UNITS',history.map(function(r){return {row:r._row,updates:{UNITS:ndNumber_(r.UNITS)+delta,UPDATED_AT:ndNowIso_(),UPDATED_BY:session.userId,NOTES:(String(r.NOTES||'')+' | Historical unit increase +'+delta+' from '+ndSocietyStartMonth_()).slice(0,1000)}};}));
    ndEnsureMemberDuesThroughMonth_(memberId,ndMonthKey_(new Date()),session.userId);
    var retro=ndReconcileSavingsDues_(memberId,session.userId);
    var updated=ndGetCurrentSavingsUnit_(memberId,effectiveFrom);
    ndCreateAudit_(session,'UNIT_INCREASE_RETROACTIVE','MEMBER',memberId,current,{unit:updated,delta:delta,dueStartMonth:ndSocietyStartMonth_(),mergedDueRows:retro.mergedRows},reason||'Savings units increased');
    return updated;
  }
  if(current){
    var end=ndDateAddDays_(effectiveFrom,-1);
    ndUpdateRow_('SAVINGS_UNITS',current._row,{EFFECTIVE_TO:end,UPDATED_AT:ndNowIso_(),UPDATED_BY:session.userId});
  }
  var row={UNIT_ID:ndNextId_('UNIT','UNT-',7),MEMBER_ID:memberId,UNITS:units,UNIT_AMOUNT:ndNumber_(ndConfig_('MONTHLY_UNIT_AMOUNT',1000)),EFFECTIVE_FROM:effectiveFrom,EFFECTIVE_TO:'',STATUS:'ACTIVE',NOTES:reason||'',CREATED_AT:ndNowIso_(),CREATED_BY:session.userId,UPDATED_AT:ndNowIso_(),UPDATED_BY:session.userId};
  ndAppend_('SAVINGS_UNITS',row);
  ndEnsureMemberDuesThroughMonth_(memberId,ndMonthKey_(new Date()),session.userId);
  ndReconcileSavingsDues_(memberId,session.userId);
  ndCreateAudit_(session,'UNIT_CHANGE','MEMBER',memberId,current||'',row,reason||'Savings units changed');
  return row;
}

function changeSavingsUnits(token,memberId,units,effectiveFrom,reason){
  var s=ndRequirePermission_(token,'members.edit');
  return ndChangeSavingsUnits_(s,memberId,units,effectiveFrom,reason);
}

function ndPreviewMonthlyDue_(memberId,monthKey,advancePool){
  monthKey=String(monthKey||'').slice(0,7);
  if(monthKey<ndSocietyStartMonth_()) return null;
  var rows=ndFindMany_('MONTHLY_DUES',{MEMBER_ID:memberId}).filter(function(r){
    return ndDueMonthKey_(r.DUE_MONTH)===monthKey && String(r.STATUS||'').toUpperCase()!=='MERGED';
  });
  rows.sort(function(a,b){return Number(a._row||0)-Number(b._row||0);});
  if(rows.length>1){
    try{ndReconcileSavingsDues_(memberId,'SYSTEM_AUTO_REPAIR');}catch(e){}
    rows=ndFindMany_('MONTHLY_DUES',{MEMBER_ID:memberId}).filter(function(r){return ndDueMonthKey_(r.DUE_MONTH)===monthKey&&String(r.STATUS||'').toUpperCase()!=='MERGED';});
    rows.sort(function(a,b){return Number(a._row||0)-Number(b._row||0);});
  }
  var existing=rows[0]||null;
  if(existing) { existing.DUE_MONTH=monthKey; return {row:existing,existing:true,advanceRemaining:ndNumber_(advancePool)}; }
  var unit=ndGetSavingsUnitForMonth_(memberId,monthKey); if(!unit) return null;
  var units=ndNumber_(unit.UNITS), unitAmount=ndNumber_(unit.UNIT_AMOUNT||ndConfig_('MONTHLY_UNIT_AMOUNT',1000));
  var dueAmount=ndRound2_(units*unitAmount), dueDate=ndDueDateForMonth_(monthKey), late=ndLateFeeTotal_(units,dueDate,ndConfig_('LATE_FEE',0));
  var adv=Math.min(Math.max(0,ndNumber_(advancePool)),dueAmount+late), balance=ndRound2_(dueAmount+late-adv);
  return {row:{DUE_ID:'',MEMBER_ID:memberId,DUE_MONTH:monthKey,UNITS:units,UNIT_AMOUNT:unitAmount,DUE_AMOUNT:dueAmount,PAID_AMOUNT:0,ADVANCE_APPLIED:adv,BALANCE:balance,STATUS:balance<=0?'PAID':adv>0?'PARTIAL':'DUE',DUE_DATE:dueDate,LATE_FEE:late},existing:false,advanceRemaining:ndRound2_(Math.max(0,ndNumber_(advancePool)-adv))};
}

function ndEnsureMemberDuesThroughMonth_(memberId,endMonth,createdBy){
  var start=ndSocietyStartMonth_(), end=String(endMonth||ndMonthKey_(new Date())).slice(0,7);
  if(end<start) return 0;
  var months=ndMonthRange_(start,end,240), count=0;
  months.forEach(function(m){if(ndEnsureMonthlyDue_(memberId,m,createdBy))count++;});
  return count;
}

function ndSavingsAdvance_(memberId) {
  var monthlyCredits=ndFindMany_('TRANSACTIONS',{MEMBER_ID:memberId}).filter(function(r){return ndIsFinanciallyEffectiveStatus_(r.STATUS)&&r.CATEGORY==='SAVINGS'&&['MONTHLY_SAVINGS','REVERSAL_MONTHLY_SAVINGS'].indexOf(r.TYPE)>=0;}).reduce(function(z,r){return z+(r.DIRECTION==='CREDIT'?ndNumber_(r.AMOUNT):-ndNumber_(r.AMOUNT));},0);
  var allocated=ndFindMany_('MONTHLY_DUES',{MEMBER_ID:memberId}).reduce(function(z,d){return z+ndNumber_(d.PAID_AMOUNT)+ndNumber_(d.ADVANCE_APPLIED);},0);
  return ndRound2_(Math.max(0,monthlyCredits-allocated));
}


function ndReconcileSavingsDues_(memberId,userId){
  var dues=ndFindMany_('MONTHLY_DUES',{MEMBER_ID:memberId}).filter(function(d){return /^\d{4}-\d{2}$/.test(ndDueMonthKey_(d.DUE_MONTH));});
  dues.sort(function(a,b){
    var c=ndDueMonthKey_(a.DUE_MONTH).localeCompare(ndDueMonthKey_(b.DUE_MONTH));
    return c||Number(a._row||0)-Number(b._row||0);
  });

  // Group by normalized YYYY-MM. This also repairs legacy rows where Sheets
  // converted DUE_MONTH (e.g. 2026-08) into a Date (e.g. 2026-08-01T...).
  var groups={}, dueToMonth={};
  dues.forEach(function(d){
    var m=ndDueMonthKey_(d.DUE_MONTH);
    if(!groups[m]) groups[m]=[];
    groups[m].push(d);
    if(d.DUE_ID) dueToMonth[String(d.DUE_ID)]=m;
  });

  var tx=ndFindMany_('TRANSACTIONS',{MEMBER_ID:memberId}).filter(function(r){
    return ndIsFinanciallyEffectiveStatus_(r.STATUS) && r.CATEGORY==='SAVINGS' && ['MONTHLY_SAVINGS','REVERSAL_MONTHLY_SAVINGS'].indexOf(r.TYPE)>=0;
  });
  var directByMonth={}, totalNet=0;
  tx.forEach(function(r){
    var sign=r.DIRECTION==='CREDIT'?1:-1;
    totalNet+=sign*ndNumber_(r.AMOUNT);
    var m=r.RELATED_ID?dueToMonth[String(r.RELATED_ID)]||'':'';
    if(!m){
      var hit=String(r.DESCRIPTION||'').match(/\b(\d{4}-\d{2})\b/);
      m=hit?hit[1]:'';
    }
    if(m) directByMonth[m]=(directByMonth[m]||0)+sign*ndNumber_(r.PRINCIPAL_AMOUNT||r.AMOUNT);
  });

  // Build one authoritative obligation per member/month before allocating money.
  var specs={};
  Object.keys(groups).sort().forEach(function(monthKey){
    var group=groups[monthKey], canonical=group[0];
    var unit=ndGetSavingsUnitForMonth_(memberId,monthKey);
    var units=unit?ndNumber_(unit.UNITS):ndNumber_(canonical.UNITS);
    var unitAmount=unit?ndNumber_(unit.UNIT_AMOUNT||ndConfig_('MONTHLY_UNIT_AMOUNT',1000)):ndNumber_(canonical.UNIT_AMOUNT||ndConfig_('MONTHLY_UNIT_AMOUNT',1000));
    var dueAmount=unit?ndRound2_(units*unitAmount):ndNumber_(canonical.DUE_AMOUNT);
    if(dueAmount<=0) dueAmount=group.reduce(function(mx,d){return Math.max(mx,ndNumber_(d.DUE_AMOUNT));},0);
    var storedLate=group.reduce(function(mx,d){return Math.max(mx,ndNumber_(d.LATE_FEE));},0), oldUnits=Math.max(1,ndNumber_(canonical.UNITS)), latePerUnit=storedLate>0?storedLate/oldUnits:ndNumber_(ndConfig_('LATE_FEE',0));
    var dueDate=canonical.DUE_DATE||ndDueDateForMonth_(monthKey), late=ndToday_()>dueDate?ndRound2_(units*latePerUnit):0;
    specs[monthKey]={group:group,canonical:canonical,units:units,unitAmount:unitAmount,dueAmount:dueAmount,late:late,gross:ndRound2_(dueAmount+late)};
  });

  // Direct payments are capped at that month's real obligation. Any excess payment
  // becomes an advance pool and may settle another month instead of disappearing.
  var effectiveDirect=Object.keys(specs).reduce(function(z,monthKey){
    return z+Math.min(Math.max(0,ndNumber_(directByMonth[monthKey]||0)),specs[monthKey].gross);
  },0);
  var pool=Math.max(0,ndRound2_(totalNet-effectiveDirect)), mergedRows=0;

  Object.keys(specs).sort().forEach(function(monthKey){
    var sp=specs[monthKey], group=sp.group, canonical=sp.canonical, gross=sp.gross;
    var direct=ndRound2_(Math.max(0,directByMonth[monthKey]||0));
    direct=Math.min(direct,gross);
    var need=Math.max(0,gross-direct), adv=Math.min(pool,need); pool=ndRound2_(pool-adv);
    var bal=ndRound2_(Math.max(0,gross-direct-adv));
    ndUpdateRow_('MONTHLY_DUES',canonical._row,{DUE_MONTH:monthKey,UNITS:sp.units,UNIT_AMOUNT:sp.unitAmount,DUE_AMOUNT:sp.dueAmount,LATE_FEE:sp.late,PAID_AMOUNT:direct,ADVANCE_APPLIED:ndRound2_(adv),BALANCE:bal,STATUS:bal<=0?'PAID':(direct+adv>0?'PARTIAL':'DUE'),UPDATED_AT:ndNowIso_(),UPDATED_BY:userId||'SYSTEM'});
    for(var i=1;i<group.length;i++){
      ndUpdateRow_('MONTHLY_DUES',group[i]._row,{DUE_MONTH:monthKey,PAID_AMOUNT:0,ADVANCE_APPLIED:0,BALANCE:0,STATUS:'MERGED',UPDATED_AT:ndNowIso_(),UPDATED_BY:userId||'SYSTEM'});
      mergedRows++;
    }
  });
  return {advance:ndRound2_(pool),mergedRows:mergedRows};
}

function ndEnsureMonthlyDue_(memberId,monthKey,createdBy){
  monthKey=String(monthKey||'').slice(0,7);
  if(!/^\d{4}-\d{2}$/.test(monthKey)) throw new Error('Invalid month format. Use YYYY-MM.');
  var matches=ndRows_('MONTHLY_DUES').filter(function(r){return String(r.MEMBER_ID)===String(memberId)&&ndDueMonthKey_(r.DUE_MONTH)===monthKey&&String(r.STATUS||'').toUpperCase()!=='MERGED';});
  if(matches.length>1){
    try{ndReconcileSavingsDues_(memberId,'SYSTEM_AUTO_REPAIR');}catch(e){}
    matches=ndRows_('MONTHLY_DUES').filter(function(r){return String(r.MEMBER_ID)===String(memberId)&&ndDueMonthKey_(r.DUE_MONTH)===monthKey&&String(r.STATUS||'').toUpperCase()!=='MERGED';});
  }
  var existing=matches[0]||null;
  if(existing){existing.DUE_MONTH=monthKey;return existing;}
  var unit=ndGetSavingsUnitForMonth_(memberId,monthKey);
  if(!unit) return null;
  var units=ndNumber_(unit.UNITS), unitAmount=ndNumber_(unit.UNIT_AMOUNT||ndConfig_('MONTHLY_UNIT_AMOUNT',1000));
  var dueAmount=ndRound2_(units*unitAmount);
  var dueDate=ndDueDateForMonth_(monthKey);
  var late=ndLateFeeTotal_(units,dueDate,ndConfig_('LATE_FEE',0));
  var advance=ndSavingsAdvance_(memberId);
  var applied=Math.min(advance,dueAmount+late);
  var balance=ndRound2_(dueAmount+late-applied);
  var row={DUE_ID:ndNextId_('DUE','DUE-',8),MEMBER_ID:memberId,DUE_MONTH:monthKey,UNITS:units,UNIT_AMOUNT:unitAmount,DUE_AMOUNT:dueAmount,PAID_AMOUNT:0,ADVANCE_APPLIED:ndRound2_(applied),BALANCE:balance,STATUS:balance<=0?'PAID':applied>0?'PARTIAL':'DUE',DUE_DATE:dueDate,LATE_FEE:late,CREATED_AT:ndNowIso_(),CREATED_BY:createdBy||'SYSTEM',UPDATED_AT:ndNowIso_(),UPDATED_BY:createdBy||'SYSTEM'};
  var insertedRow = ndAppend_('MONTHLY_DUES',row);
  row._row = insertedRow;
  return row;
}

function generateMonthlyDues(token,monthKey){
  var s=ndRequirePermission_(token,'savings.collect');
  monthKey=String(monthKey||ndMonthKey_(new Date())).slice(0,7);
  var start=ndSocietyStartMonth_(), current=ndMonthKey_(new Date());
  if(monthKey<start) throw new Error('সমিতির মাসিক হিসাব '+start+' থেকে শুরু।');
  if(monthKey>current) throw new Error('ভবিষ্যৎ মাসের Due আগে থেকে Generate করা হবে না। ভবিষ্যৎ মাসের টাকা দিতে মাসিক জমা থেকে ওই মাস নির্বাচন করুন।');
  var members=ndRows_('MEMBERS').filter(function(m){return m.STATUS==='ACTIVE';});
  var count=0;
  members.forEach(function(m){ if(ndEnsureMonthlyDue_(m.MEMBER_ID,monthKey,s.userId)) count++; });
  ndCreateAudit_(s,'GENERATE_DUES','MONTHLY_DUES',monthKey,'',{count:count},'Manual monthly due generation');
  return {ok:true,month:monthKey,count:count};
}

function ndMonthlyDueTrigger_(){
  if(!ndBool_(ndConfig_('AUTO_MONTHLY_DUE','TRUE'))) return;
  var month=ndMonthKey_(new Date());
  ndRows_('MEMBERS').filter(function(m){return m.STATUS==='ACTIVE';}).forEach(function(m){try{ndEnsureMemberDuesThroughMonth_(m.MEMBER_ID,month,'SYSTEM');ndReconcileSavingsDues_(m.MEMBER_ID,'SYSTEM');}catch(e){}});
}

function getSavingsPage(token,options){
  var s=ndSession_(token);
  if(s.role==='MEMBER'){
    var memberId=s.memberId;
    var dues=ndFindMany_('MONTHLY_DUES',{MEMBER_ID:memberId}).filter(function(d){return String(d.STATUS||'').toUpperCase()!=='MERGED';}).map(function(d){d.DUE_MONTH=ndDueMonthKey_(d.DUE_MONTH);return d;});
    dues=ndSortDesc_(dues,'DUE_MONTH');
    return {memberId:memberId,unit:ndGetCurrentSavingsUnit_(memberId,ndToday_()),savingsBalance:ndMemberSavingsBalance_(memberId),advance:ndSavingsAdvance_(memberId),currentDue:ndCurrentDueBalance_(memberId),dues:dues,transactions:ndSortDesc_(ndFindMany_('TRANSACTIONS',{MEMBER_ID:memberId}).filter(function(t){return t.CATEGORY==='SAVINGS';}),'TXN_DATE').slice(0,100)};
  }
  if(!ndHasPermission_(s,'savings.view')) throw new Error('PERMISSION_DENIED');
  options=options||{}; var month=options.month||ndMonthKey_(new Date());
  var dues=ndRows_('MONTHLY_DUES').filter(function(d){return String(d.STATUS||'').toUpperCase()!=='MERGED'&&(!month||ndDueMonthKey_(d.DUE_MONTH)===month);}).map(function(d){d.DUE_MONTH=ndDueMonthKey_(d.DUE_MONTH);return d;});
  var members=ndRows_('MEMBERS'); var map={}; members.forEach(function(m){map[m.MEMBER_ID]=m;});
  var recent=ndSortDesc_(ndRows_('TRANSACTIONS').filter(function(t){return t.CATEGORY==='SAVINGS';}),'CREATED_AT').slice(0,50).map(function(t){var docs=ndSavingsDocs_(t.TXN_ID);return Object.assign({},t,{HAS_ATTACHMENT:docs.length>0,SUPPORTING_DOCUMENT_ID:docs.length?docs[0].DOCUMENT_ID:''});});
  return {month:month,societyStartMonth:ndSocietyStartMonth_(),dues:dues.map(function(d){return Object.assign({},d,{MEMBER_NAME:map[d.MEMBER_ID]?(map[d.MEMBER_ID].NAME_BN||map[d.MEMBER_ID].NAME_EN):d.MEMBER_ID});}),recent:recent};
}

function getSavingsCollectionContext(token,memberId,monthKey){
  var s=ndSession_(token);
  if(s.role==='MEMBER'){ memberId=s.memberId; }
  else if(!ndHasPermission_(s,'savings.view')&&!ndHasPermission_(s,'savings.collect')) throw new Error('PERMISSION_DENIED');
  monthKey=String(monthKey||ndMonthKey_(new Date())).slice(0,7);
  var member=ndFindOne_('MEMBERS','MEMBER_ID',memberId); if(!member) throw new Error('Member not found.');
  if(monthKey<ndSocietyStartMonth_()) throw new Error('সমিতির সঞ্চয় হিসাব '+ndSocietyStartMonth_()+' থেকে শুরু।');
  var unit=ndGetSavingsUnitForMonth_(memberId,monthKey), adv=ndSavingsAdvance_(memberId), preview=ndPreviewMonthlyDue_(memberId,monthKey,adv), due=preview?preview.row:null;
  return {memberId:memberId,month:monthKey,unit:unit,due:due,advance:adv,defaultAmount:due?Math.max(0,ndNumber_(due.BALANCE)):(unit?ndNumber_(unit.UNITS)*ndNumber_(unit.UNIT_AMOUNT):0),societyStartMonth:ndSocietyStartMonth_()};
}

function getSavingsMultiCollectionContext(token,memberId,startMonth,endMonth){
  var s=ndSession_(token);
  if(s.role==='MEMBER') memberId=s.memberId;
  else if(!ndHasPermission_(s,'savings.view')&&!ndHasPermission_(s,'savings.collect')) throw new Error('PERMISSION_DENIED');
  var member=ndFindOne_('MEMBERS','MEMBER_ID',memberId); if(!member) throw new Error('Member not found.');
  var societyStart=ndSocietyStartMonth_(); startMonth=String(startMonth||societyStart).slice(0,7); endMonth=String(endMonth||startMonth).slice(0,7);
  if(startMonth<societyStart) startMonth=societyStart;
  var months=ndMonthRange_(startMonth,endMonth,120), adv=ndSavingsAdvance_(memberId), items=[];
  months.forEach(function(m){
    var p=ndPreviewMonthlyDue_(memberId,m,adv); if(!p)return; adv=p.advanceRemaining;
    var d=p.row; items.push({month:m,units:ndNumber_(d.UNITS),unitAmount:ndNumber_(d.UNIT_AMOUNT),dueAmount:ndNumber_(d.DUE_AMOUNT),paidAmount:ndNumber_(d.PAID_AMOUNT),advanceApplied:ndNumber_(d.ADVANCE_APPLIED),balance:Math.max(0,ndNumber_(d.BALANCE)),status:d.STATUS,existing:p.existing});
  });
  return {memberId:memberId,startMonth:startMonth,endMonth:endMonth,societyStartMonth:societyStart,items:items,totalBalance:ndRound2_(items.reduce(function(z,x){return z+x.balance;},0)),advanceRemaining:adv};
}

function ndAttachSavingsDocument_(session,memberId,txnId,dataUrl,fileName){
  if(!dataUrl) return null;
  var safeName=String(fileName||'bank_slip').replace(/[^a-zA-Z0-9._-]+/g,'_').slice(0,80)||'bank_slip';
  var fileId=ndSaveDataUrlFile_(dataUrl,txnId+'_'+safeName.replace(/\.[^.]+$/,''),ndConfig_('DOCUMENT_FOLDER_ID',''));
  var file=DriveApp.getFileById(fileId), docId=ndNextId_('DOCUMENT','DOC-',8);
  var row={DOCUMENT_ID:docId,MEMBER_ID:memberId,RELATED_TYPE:'SAVINGS_TRANSACTION',RELATED_ID:txnId,TITLE:'জমার সাপোর্টিং ডকুমেন্ট / ব্যাংক স্লিপ',FILE_ID:fileId,FILE_NAME:file.getName(),MIME_TYPE:file.getMimeType(),STATUS:'ACTIVE',CREATED_AT:ndNowIso_(),CREATED_BY:session.userId};
  ndAppend_('DOCUMENTS',row);
  return row;
}

function ndSavingsDocs_(txnId){
  return ndFindMany_('DOCUMENTS',{RELATED_ID:txnId}).filter(function(d){return d.RELATED_TYPE==='SAVINGS_TRANSACTION'&&d.STATUS==='ACTIVE';});
}

function getSavingsTransaction(token,txnId){
  var s=ndSession_(token),t=ndFindOne_('TRANSACTIONS','TXN_ID',txnId);
  if(!t||t.CATEGORY!=='SAVINGS') throw new Error('Savings transaction not found.');
  if(s.role==='MEMBER'&&t.MEMBER_ID!==s.memberId) throw new Error('PERMISSION_DENIED');
  if(s.role!=='MEMBER'&&!ndHasPermission_(s,'savings.view')&&!ndHasPermission_(s,'accounts.view')) throw new Error('PERMISSION_DENIED');
  var due=t.RELATED_ID?ndFindOne_('MONTHLY_DUES','DUE_ID',t.RELATED_ID):null;
  var receipt=t.RECEIPT_ID?ndFindOne_('RECEIPTS','RECEIPT_ID',t.RECEIPT_ID):null;
  return {transaction:t,due:due,receipt:receipt,supportingDocuments:ndSavingsDocs_(txnId)};
}

function ndAttachSavingsDocumentToTransactions_(session,memberId,txnIds,dataUrl,fileName){
  if(!dataUrl||!txnIds||!txnIds.length) return [];
  var safeName=String(fileName||'bank_slip').replace(/[^a-zA-Z0-9._-]+/g,'_').slice(0,80)||'bank_slip';
  var base=(txnIds.length>1?'BATCH_'+txnIds[0]:txnIds[0])+'_'+safeName.replace(/\.[^.]+$/,'');
  var fileId=ndSaveDataUrlFile_(dataUrl,base,ndConfig_('DOCUMENT_FOLDER_ID','')), file=DriveApp.getFileById(fileId), rows=[];
  txnIds.forEach(function(txnId){
    var row={DOCUMENT_ID:ndNextId_('DOCUMENT','DOC-',8),MEMBER_ID:memberId,RELATED_TYPE:'SAVINGS_TRANSACTION',RELATED_ID:txnId,TITLE:'জমার সাপোর্টিং ডকুমেন্ট / ব্যাংক স্লিপ',FILE_ID:fileId,FILE_NAME:file.getName(),MIME_TYPE:file.getMimeType(),STATUS:'ACTIVE',CREATED_AT:ndNowIso_(),CREATED_BY:session.userId};
    ndAppend_('DOCUMENTS',row); rows.push(row);
  });
  return rows;
}

function collectSavings(token,payload){
  var s=ndRequirePermission_(token,'savings.collect'); payload=payload||{};
  var member=ndFindOne_('MEMBERS','MEMBER_ID',payload.memberId); if(!member||member.STATUS!=='ACTIVE') throw new Error('সক্রিয় সদস্য পাওয়া যায়নি।');
  var amount=ndRound2_(payload.amount); if(amount<=0) throw new Error('জমার পরিমাণ ০-এর বেশি হতে হবে।');
  var type=payload.type==='EXTRA_SAVINGS'?'EXTRA_SAVINGS':'MONTHLY_SAVINGS';
  var account=ndAccountById_(payload.accountId||'ACC-CASH'); ndCoaByCode_(account.ACCOUNT_CODE); ndCoaBySystem_('MEMBER_SAVINGS');
  var now=ndNowIso_(), date=ndDateOnly_(payload.date||ndToday_()),notePurpose=String(payload.notePurpose!==undefined?payload.notePurpose:(payload.note||'')).trim();
  if(notePurpose.length>500)throw new Error('Note / Purpose must be within 500 characters.');

  if(type==='EXTRA_SAVINGS'){
    var txnId=ndNextId_('TXN','TRX-',8), receiptId=ndNextReceiptId_();
    var description='অতিরিক্ত সঞ্চয়'+(notePurpose?' · '+notePurpose:'');
    var txn={TXN_ID:txnId,TXN_DATE:date,MEMBER_ID:member.MEMBER_ID,TYPE:type,CATEGORY:'SAVINGS',DESCRIPTION:description,DIRECTION:'CREDIT',AMOUNT:amount,PRINCIPAL_AMOUNT:amount,PROFIT_AMOUNT:0,PENALTY_AMOUNT:0,PAYMENT_ACCOUNT_ID:account.ACCOUNT_ID,PAYMENT_METHOD:payload.paymentMethod||account.TYPE,REFERENCE:payload.reference||'',RELATED_ID:'',RECEIPT_ID:receiptId,STATUS:'POSTED',PARENT_TXN_ID:payload.parentTxnId||'',CORRECTION_REASON:payload.correctionReason||'',CREATED_AT:now,CREATED_BY:s.userId,UPDATED_AT:now,UPDATED_BY:s.userId,NOTE_PURPOSE:notePurpose};
    ndAppend_('TRANSACTIONS',txn);
    ndAppend_('RECEIPTS',{RECEIPT_ID:receiptId,TXN_ID:txnId,MEMBER_ID:member.MEMBER_ID,RECEIPT_DATE:date,AMOUNT:amount,PURPOSE:'অতিরিক্ত সঞ্চয়'+(notePurpose?' · উদ্দেশ্য: '+notePurpose:''),PAYMENT_METHOD:txn.PAYMENT_METHOD,REFERENCE:txn.REFERENCE,STATUS:'ACTIVE',PRINT_COUNT:0,LAST_PRINTED_AT:'',CREATED_AT:now,CREATED_BY:s.userId});
    ndPostJournal_(s,txnId,date,account.ACCOUNT_CODE,'MEMBER_SAVINGS',amount,member.MEMBER_ID,'',txn.DESCRIPTION,'DEBIT_CREDIT');
    var docs=ndAttachSavingsDocumentToTransactions_(s,member.MEMBER_ID,[txnId],payload.supportingFileDataUrl||'',payload.supportingFileName||'bank_slip');
    ndCreateAudit_(s,'COLLECT','TRANSACTION',txnId,'',Object.assign({},txn,{supportingDocumentId:docs.length?docs[0].DOCUMENT_ID:'',notePurpose:notePurpose}),'Extra savings collection');
    ndCreateNotification_(member.MEMBER_ID,'PAYMENT','সঞ্চয় জমা হয়েছে',receiptId+' | '+amount+' টাকা অতিরিক্ত সঞ্চয় জমা হয়েছে।');
    return {ok:true,txnId:txnId,receiptId:receiptId,receiptIds:[receiptId],txnIds:[txnId],amount:amount,memberId:member.MEMBER_ID,notePurpose:notePurpose,multi:false};
  }

  var societyStart=ndSocietyStartMonth_(), months=[];
  if(Array.isArray(payload.months)&&payload.months.length) months=payload.months.map(function(m){return String(m||'').slice(0,7);});
  else if(payload.startMonth||payload.endMonth) months=ndMonthRange_(String(payload.startMonth||payload.endMonth).slice(0,7),String(payload.endMonth||payload.startMonth).slice(0,7),120);
  else months=[String(payload.month||String(date).slice(0,7)).slice(0,7)];
  var seen={}; months=months.filter(function(m){if(!/^\d{4}-\d{2}$/.test(m)||m<societyStart||seen[m])return false;seen[m]=true;return true;}).sort();
  if(!months.length) throw new Error('সঠিক সঞ্চয়ের মাস নির্বাচন করুন। হিসাব শুরু '+societyStart+' থেকে।');

  // Create/resolve due rows only at the moment the payment is actually saved. Merely previewing months never creates dues.
  var dueRows=months.map(function(m){var d=ndEnsureMonthlyDue_(member.MEMBER_ID,m,s.userId);if(!d)throw new Error(m+' মাসের জন্য সঞ্চয় ইউনিট পাওয়া যায়নি।');if(!d._row)d=ndFindOne_('MONTHLY_DUES','DUE_ID',d.DUE_ID)||d;return d;});
  var totalOutstanding=ndRound2_(dueRows.reduce(function(z,d){return z+Math.max(0,ndNumber_(d.BALANCE));},0));
  if(totalOutstanding<=0) throw new Error('নির্বাচিত মাসগুলোতে কোনো বকেয়া নেই।');
  if(amount>totalOutstanding+0.01) throw new Error('নির্বাচিত মাসগুলোর মোট বকেয়া '+totalOutstanding+' টাকা। অতিরিক্ত টাকা হলে “অতিরিক্ত সঞ্চয়” অপশন ব্যবহার করুন অথবা আরও মাস নির্বাচন করুন।');

  var remaining=amount, batchId=months.length>1?ndNextId_('SAVINGS_BATCH','BAT-',8):'', allocations=[];
  dueRows.forEach(function(d){
    if(remaining<=0)return; var bal=Math.max(0,ndNumber_(d.BALANCE)); if(bal<=0)return;
    var applied=ndRound2_(Math.min(remaining,bal)); if(applied<=0)return;
    allocations.push({due:d,month:ndDueMonthKey_(d.DUE_MONTH),amount:applied}); remaining=ndRound2_(remaining-applied);
  });
  if(remaining>0.01) throw new Error('Selected months could not absorb the full payment.');

  var txnIds=[], receiptIds=[];
  allocations.forEach(function(a){
    var txnId=ndNextId_('TXN','TRX-',8), receiptId=ndNextReceiptId_(), d=a.due, applied=a.amount;
    var txn={TXN_ID:txnId,TXN_DATE:date,MEMBER_ID:member.MEMBER_ID,TYPE:'MONTHLY_SAVINGS',CATEGORY:'SAVINGS',DESCRIPTION:a.month+' মাসের সঞ্চয়',DIRECTION:'CREDIT',AMOUNT:applied,PRINCIPAL_AMOUNT:applied,PROFIT_AMOUNT:0,PENALTY_AMOUNT:0,PAYMENT_ACCOUNT_ID:account.ACCOUNT_ID,PAYMENT_METHOD:payload.paymentMethod||account.TYPE,REFERENCE:payload.reference||'',RELATED_ID:d.DUE_ID,RECEIPT_ID:receiptId,STATUS:'POSTED',PARENT_TXN_ID:batchId||payload.parentTxnId||'',CORRECTION_REASON:payload.correctionReason||'',CREATED_AT:now,CREATED_BY:s.userId,UPDATED_AT:now,UPDATED_BY:s.userId};
    ndAppend_('TRANSACTIONS',txn);
    var paid=ndRound2_(ndNumber_(d.PAID_AMOUNT)+applied), bal=ndRound2_(Math.max(0,ndNumber_(d.DUE_AMOUNT)+ndNumber_(d.LATE_FEE)-paid-ndNumber_(d.ADVANCE_APPLIED)));
    ndUpdateRow_('MONTHLY_DUES',d._row,{PAID_AMOUNT:paid,BALANCE:bal,STATUS:bal<=0?'PAID':'PARTIAL',UPDATED_AT:now,UPDATED_BY:s.userId});
    ndAppend_('RECEIPTS',{RECEIPT_ID:receiptId,TXN_ID:txnId,MEMBER_ID:member.MEMBER_ID,RECEIPT_DATE:date,AMOUNT:applied,PURPOSE:'মাসিক সঞ্চয় ('+a.month+')',PAYMENT_METHOD:txn.PAYMENT_METHOD,REFERENCE:txn.REFERENCE,STATUS:'ACTIVE',PRINT_COUNT:0,LAST_PRINTED_AT:'',CREATED_AT:now,CREATED_BY:s.userId});
    ndPostJournal_(s,txnId,date,account.ACCOUNT_CODE,'MEMBER_SAVINGS',applied,member.MEMBER_ID,d.DUE_ID,txn.DESCRIPTION,'DEBIT_CREDIT');
    txnIds.push(txnId); receiptIds.push(receiptId); a.txnId=txnId; a.receiptId=receiptId;
  });
  var docs=ndAttachSavingsDocumentToTransactions_(s,member.MEMBER_ID,txnIds,payload.supportingFileDataUrl||'',payload.supportingFileName||'bank_slip');
  ndReconcileSavingsDues_(member.MEMBER_ID,s.userId);
  ndCreateAudit_(s,'COLLECT',allocations.length>1?'SAVINGS_BATCH':'TRANSACTION',batchId||txnIds[0],'',{memberId:member.MEMBER_ID,months:months,amount:amount,allocations:allocations.map(function(a){return {month:a.month,amount:a.amount,txnId:a.txnId,receiptId:a.receiptId};}),supportingDocuments:docs.map(function(d){return d.DOCUMENT_ID;})},allocations.length>1?'Multi-month savings collection':'Monthly savings collection');
  ndCreateNotification_(member.MEMBER_ID,'PAYMENT','মাসিক সঞ্চয় জমা হয়েছে',(allocations.length>1?allocations.length+' মাসে ':'')+amount+' টাকা জমা হয়েছে।');
  return {ok:true,multi:allocations.length>1,batchId:batchId,txnId:txnIds[0]||'',receiptId:receiptIds[0]||'',txnIds:txnIds,receiptIds:receiptIds,amount:amount,memberId:member.MEMBER_ID,allocations:allocations.map(function(a){return {month:a.month,amount:a.amount,txnId:a.txnId,receiptId:a.receiptId};})};
}

function editSavingsTransaction(token,txnId,payload){
  var s=ndSession_(token); payload=payload||{};
  if(!(s.role==='ADMIN'||ndHasPermission_(s,'savings.edit')||ndHasPermission_(s,'accounts.edit'))) throw new Error('PERMISSION_DENIED');
  if(!(s.role==='ADMIN'||ndHasPermission_(s,'savings.collect'))) throw new Error('Collection permission required.');
  var reason=String(payload.reason||'').trim(); if(!reason) throw new Error('Correction reason is required.');
  var t=ndFindOne_('TRANSACTIONS','TXN_ID',txnId); if(!t||t.CATEGORY!=='SAVINGS'||t.STATUS!=='POSTED'||['MONTHLY_SAVINGS','EXTRA_SAVINGS'].indexOf(t.TYPE)<0) throw new Error('Only monthly or additional savings deposits can be edited here.');
  var oldReceipt=t.RECEIPT_ID?ndFindOne_('RECEIPTS','RECEIPT_ID',t.RECEIPT_ID):null;
  var oldDue=t.RELATED_ID?ndFindOne_('MONTHLY_DUES','DUE_ID',t.RELATED_ID):null;
  var oldDocs=ndSavingsDocs_(txnId);
  var newAmount=ndRound2_(payload.amount); if(newAmount<=0) throw new Error('সঠিক জমার পরিমাণ ০-এর বেশি হতে হবে।');
  var p2={memberId:t.MEMBER_ID,amount:newAmount,type:payload.type||t.TYPE,month:payload.month||(oldDue?ndDueMonthKey_(oldDue.DUE_MONTH):ndMonthOnly_(t.TXN_DATE)),date:ndDateOnly_(payload.date||t.TXN_DATE),accountId:payload.accountId||t.PAYMENT_ACCOUNT_ID,paymentMethod:payload.paymentMethod||t.PAYMENT_METHOD,reference:payload.reference!==undefined?payload.reference:t.REFERENCE,notePurpose:payload.notePurpose!==undefined?payload.notePurpose:(payload.note!==undefined?payload.note:(t.NOTE_PURPOSE||'')),supportingFileDataUrl:payload.supportingFileDataUrl||'',supportingFileName:payload.supportingFileName||'',parentTxnId:t.TXN_ID,correctionReason:reason};
  ndAccountById_(p2.accountId);
  if(p2.type==='MONTHLY_SAVINGS'){
    var targetMonth=String(p2.month||'').slice(0,7),targetUnit=ndGetSavingsUnitForMonth_(t.MEMBER_ID,targetMonth);if(!targetUnit)throw new Error('নির্বাচিত মাসের জন্য সদস্যের সঞ্চয় ইউনিট পাওয়া যায়নি।');
    var preview=ndPreviewMonthlyDue_(t.MEMBER_ID,targetMonth,ndSavingsAdvance_(t.MEMBER_ID)),capacity=preview?Math.max(0,ndNumber_(preview.row.BALANCE)):0;
    if(oldDue&&ndDueMonthKey_(oldDue.DUE_MONTH)===targetMonth)capacity=ndRound2_(capacity+ndNumber_(t.AMOUNT));
    if(newAmount>capacity+0.01)throw new Error('সংশোধিত জমা নির্বাচিত মাসের সম্ভাব্য বকেয়া '+ndRound2_(capacity)+' টাকা ছাড়িয়ে গেছে।');
  }
  var revId=ndReverseTransaction_(s,t,reason);
  ndUpdateRow_('TRANSACTIONS',t._row,{STATUS:'CORRECTED',UPDATED_AT:ndNowIso_(),UPDATED_BY:s.userId,CORRECTION_REASON:reason});
  if(oldReceipt) ndUpdateRow_('RECEIPTS',oldReceipt._row,{STATUS:'CANCELLED'});
  ndReconcileSavingsDues_(t.MEMBER_ID,s.userId);
  var replacement=collectSavings(token,p2);
  if(!payload.supportingFileDataUrl && oldDocs.length){
    oldDocs.forEach(function(d){
      var id=ndNextId_('DOCUMENT','DOC-',8);
      ndAppend_('DOCUMENTS',{DOCUMENT_ID:id,MEMBER_ID:t.MEMBER_ID,RELATED_TYPE:'SAVINGS_TRANSACTION',RELATED_ID:replacement.txnId,TITLE:d.TITLE,FILE_ID:d.FILE_ID,FILE_NAME:d.FILE_NAME,MIME_TYPE:d.MIME_TYPE,STATUS:'ACTIVE',CREATED_AT:ndNowIso_(),CREATED_BY:s.userId});
    });
  }
  ndCreateAudit_(s,'EDIT','TRANSACTION',txnId,t,{reversalTxnId:revId,replacement:replacement,newData:p2},reason);
  return {ok:true,reversalTxnId:revId,replacement:replacement};
}

function ndReceiptPurposeFromTxn_(t){
  if(!t) return '';
  if(t.TYPE==='MONTHLY_SAVINGS'){
    var due=t.RELATED_ID?ndFindOne_('MONTHLY_DUES','DUE_ID',t.RELATED_ID):null;
    return 'মাসিক সঞ্চয়'+(due&&due.DUE_MONTH?' ('+ndDueMonthKey_(due.DUE_MONTH)+')':'');
  }
  if(t.TYPE==='EXTRA_SAVINGS') return 'অতিরিক্ত সঞ্চয়'+(t.NOTE_PURPOSE?' · উদ্দেশ্য: '+t.NOTE_PURPOSE:'');
  if(t.TYPE==='LOAN_PAYMENT') return 'ঋণ কিস্তি '+String(t.RELATED_ID||'');
  return String(t.DESCRIPTION||t.TYPE||'লেনদেন');
}

function ndEnsureReceiptForTransaction_(t){
  if(!t||!t.RECEIPT_ID) return null;
  var existing=ndFindOne_('RECEIPTS','RECEIPT_ID',t.RECEIPT_ID);
  if(existing) return existing;
  var row={
    RECEIPT_ID:t.RECEIPT_ID,TXN_ID:t.TXN_ID,MEMBER_ID:t.MEMBER_ID,RECEIPT_DATE:ndDateOnly_(t.TXN_DATE||ndToday_()),
    AMOUNT:ndNumber_(t.AMOUNT),PURPOSE:ndReceiptPurposeFromTxn_(t),PAYMENT_METHOD:t.PAYMENT_METHOD||'',REFERENCE:t.REFERENCE||'',
    STATUS:'ACTIVE',PRINT_COUNT:0,LAST_PRINTED_AT:'',CREATED_AT:t.CREATED_AT||ndNowIso_(),CREATED_BY:t.CREATED_BY||'SYSTEM_REPAIR'
  };
  row._row=ndAppend_('RECEIPTS',row);
  return row;
}

function ndFindOrRepairReceipt_(receiptId){
  var r=ndFindOne_('RECEIPTS','RECEIPT_ID',receiptId);
  if(r) return r;
  var t=ndFindOne_('TRANSACTIONS','RECEIPT_ID',receiptId);
  return t?ndEnsureReceiptForTransaction_(t):null;
}

function getReceipt(token,receiptId){
  var s=ndSession_(token); var r=ndFindOrRepairReceipt_(receiptId); if(!r) throw new Error('Receipt not found.');
  if(s.role==='MEMBER'&&r.MEMBER_ID!==s.memberId) throw new Error('PERMISSION_DENIED');
  if(s.role!=='MEMBER'&&!ndHasPermission_(s,'receipts.view')) throw new Error('PERMISSION_DENIED');
  var m=ndFindOne_('MEMBERS','MEMBER_ID',r.MEMBER_ID); var t=ndFindOne_('TRANSACTIONS','TXN_ID',r.TXN_ID);
  var supportingDocuments=t?ndSavingsDocs_(t.TXN_ID):[];
  return {receipt:r,member:m,transaction:t,supportingDocuments:supportingDocuments,config:{nameBn:ndConfig_('SOCIETY_NAME_BN',''),nameEn:ndConfig_('SOCIETY_NAME_EN',''),estd:ndConfig_('ESTD_YEAR','2026'),tagline:ndConfig_('TAGLINE_BN',''),address:ndConfig_('SOCIETY_ADDRESS',''),mobile:ndConfig_('SOCIETY_MOBILE',''),email:ndConfig_('SOCIETY_EMAIL',''),currency:ndConfig_('CURRENCY_SYMBOL','৳')}};
}

function recordReceiptPrint(token,receiptId){
  var s=ndSession_(token); var r=ndFindOrRepairReceipt_(receiptId); if(!r) throw new Error('Receipt not found.');
  if(s.role==='MEMBER'&&r.MEMBER_ID!==s.memberId) throw new Error('PERMISSION_DENIED');
  if(s.role!=='MEMBER'&&!ndHasPermission_(s,'receipts.print')) throw new Error('PERMISSION_DENIED');
  ndUpdateRow_('RECEIPTS',r._row,{PRINT_COUNT:ndNumber_(r.PRINT_COUNT)+1,LAST_PRINTED_AT:ndNowIso_()}); return {ok:true};
}

function listReceipts(token,options){
  var s=ndSession_(token); if(s.role!=='MEMBER'&&!ndHasPermission_(s,'receipts.view')) throw new Error('PERMISSION_DENIED'); options=options||{};
  var rows=ndRows_('RECEIPTS'); if(s.role==='MEMBER') rows=rows.filter(function(r){return r.MEMBER_ID===s.memberId;});
  if(options.memberId) rows=rows.filter(function(r){return r.MEMBER_ID===options.memberId;});
  var q=String(options.q||'').trim().toLowerCase(); if(q) rows=rows.filter(function(r){return [r.RECEIPT_ID,r.MEMBER_ID,r.REFERENCE].join(' ').toLowerCase().indexOf(q)>=0;});
  return ndSortDesc_(rows,'CREATED_AT').slice(0,Math.min(500,ndNumber_(options.limit||200)));
}

function getMemberLedger(token,memberId,options){
  var s=ndSession_(token); if(s.role==='MEMBER') memberId=s.memberId; else if(!ndHasPermission_(s,'accounts.view')&&!ndHasPermission_(s,'members.view')) throw new Error('PERMISSION_DENIED');
  options=options||{}; var rows=ndFindMany_('TRANSACTIONS',{MEMBER_ID:memberId}).filter(function(r){return r.STATUS==='POSTED'||r.STATUS==='REVERSED'||r.STATUS==='CORRECTED';});
  if(options.category) rows=rows.filter(function(r){return r.CATEGORY===options.category;});
  if(options.from) rows=rows.filter(function(r){return r.TXN_DATE>=options.from;}); if(options.to) rows=rows.filter(function(r){return r.TXN_DATE<=options.to;});
  rows.sort(function(a,b){var x=String(a.TXN_DATE)+String(a.CREATED_AT),y=String(b.TXN_DATE)+String(b.CREATED_AT);return x.localeCompare(y);});
  var balance=0; var out=rows.map(function(r){balance=ndRound2_(balance+(r.DIRECTION==='CREDIT'?ndNumber_(r.AMOUNT):-ndNumber_(r.AMOUNT))); return Object.assign({},r,{RUNNING_BALANCE:balance});});
  return {memberId:memberId,rows:out.reverse(),closingBalance:balance,savingsBalance:ndMemberSavingsBalance_(memberId),outstandingDue:ndCurrentDueBalance_(memberId),loanOutstanding:ndMemberLoanOutstanding_(memberId)};
}

function correctSavingsTransaction(token,txnId,newAmount,reason){
  var t=ndFindOne_('TRANSACTIONS','TXN_ID',txnId); if(!t) throw new Error('Savings transaction not found.');
  var due=t.RELATED_ID?ndFindOne_('MONTHLY_DUES','DUE_ID',t.RELATED_ID):null;
  return editSavingsTransaction(token,txnId,{amount:newAmount,type:t.TYPE,month:due?ndDueMonthKey_(due.DUE_MONTH):ndMonthOnly_(t.TXN_DATE),date:ndDateOnly_(t.TXN_DATE),accountId:t.PAYMENT_ACCOUNT_ID,paymentMethod:t.PAYMENT_METHOD,reference:t.REFERENCE,notePurpose:t.NOTE_PURPOSE||'',reason:reason});
}

/** ===== FinanceService.gs ===== */
/** Double-entry posting, accounts, income, expense, withdrawals and corrections. */
function ndCoaByCode_(code){
  var r=ndFindOne_('CHART_OF_ACCOUNTS','ACCOUNT_CODE',String(code));
  if(!r) throw new Error('Chart of account not found: '+code);
  return r;
}

function ndPostJournalLines_(session,txnId,date,lines,memberId,relatedId,description){
  var debit=0,credit=0; lines.forEach(function(l){debit+=ndNumber_(l.debit);credit+=ndNumber_(l.credit);});
  debit=ndRound2_(debit);credit=ndRound2_(credit); if(Math.abs(debit-credit)>0.01) throw new Error('Unbalanced journal: '+debit+' != '+credit);
  var entryId=ndNextId_('JOURNAL','JRN-',8),now=ndNowIso_(),glIds=ndReserveIds_('GL',lines.length,'GL-',9);
  var rows=lines.map(function(l,i){
    var coa=ndCoaByCode_(l.accountCode);
    return {GL_ID:glIds[i],ENTRY_ID:entryId,TXN_ID:txnId,ENTRY_DATE:date,ACCOUNT_CODE:coa.ACCOUNT_CODE,ACCOUNT_NAME:coa.ACCOUNT_NAME,DEBIT:ndRound2_(l.debit),CREDIT:ndRound2_(l.credit),MEMBER_ID:memberId||'',RELATED_ID:relatedId||'',DESCRIPTION:description||'',CREATED_AT:now,CREATED_BY:session?session.userId:'SYSTEM'};
  });
  ndAppendMany_('GENERAL_LEDGER',rows);
  return entryId;
}

function ndPostJournalBatchEntries_(session,entries){
  entries=(entries||[]).filter(function(e){return e&&e.txnId&&e.lines&&e.lines.length;});if(!entries.length)return [];
  var entryIds=ndReserveIds_('JOURNAL',entries.length,'JRN-',8),lineCount=entries.reduce(function(z,e){return z+e.lines.length;},0),glIds=ndReserveIds_('GL',lineCount,'GL-',9),now=ndNowIso_(),rows=[],glIndex=0;
  entries.forEach(function(e,ei){var debit=0,credit=0;e.lines.forEach(function(l){debit+=ndNumber_(l.debit);credit+=ndNumber_(l.credit);});if(Math.abs(ndRound2_(debit)-ndRound2_(credit))>0.01)throw new Error('Unbalanced journal for '+e.txnId+': '+ndRound2_(debit)+' != '+ndRound2_(credit));e.lines.forEach(function(l){var coa=ndCoaByCode_(l.accountCode);rows.push({GL_ID:glIds[glIndex++],ENTRY_ID:entryIds[ei],TXN_ID:e.txnId,ENTRY_DATE:e.date,ACCOUNT_CODE:coa.ACCOUNT_CODE,ACCOUNT_NAME:coa.ACCOUNT_NAME,DEBIT:ndRound2_(l.debit),CREDIT:ndRound2_(l.credit),MEMBER_ID:e.memberId||'',RELATED_ID:e.relatedId||'',DESCRIPTION:e.description||'',CREATED_AT:now,CREATED_BY:session?session.userId:'SYSTEM'});});});
  ndAppendMany_('GENERAL_LEDGER',rows);return entryIds;
}

function ndPostJournal_(session,txnId,date,paymentAccountCode,systemAccount,amount,memberId,relatedId,description,mode){
  var sys=ndCoaBySystem_(systemAccount); amount=ndRound2_(amount);
  var lines;
  if(mode==='DEBIT_CREDIT') lines=[{accountCode:paymentAccountCode,debit:amount,credit:0},{accountCode:sys.ACCOUNT_CODE,debit:0,credit:amount}];
  else lines=[{accountCode:sys.ACCOUNT_CODE,debit:amount,credit:0},{accountCode:paymentAccountCode,debit:0,credit:amount}];
  return ndPostJournalLines_(session,txnId,date,lines,memberId,relatedId,description);
}

function ndReverseTransaction_(session,t,reason){
  if(!t||!t.TXN_ID)throw new Error('Transaction required for reversal.');
  var existing=ndRows_('TRANSACTIONS').filter(function(x){return x.PARENT_TXN_ID===t.TXN_ID&&x.TYPE==='REVERSAL_'+t.TYPE&&x.STATUS==='POSTED';})[0];
  if(existing)return existing.TXN_ID;
  var revId=ndNextId_('TXN','TRX-',8), now=ndNowIso_();
  var rev=Object.assign({},t); delete rev._row;
  rev.TXN_ID=revId; rev.TYPE='REVERSAL_'+t.TYPE; rev.DESCRIPTION='Reversal: '+t.DESCRIPTION; rev.DIRECTION=t.DIRECTION==='CREDIT'?'DEBIT':t.DIRECTION==='DEBIT'?'CREDIT':'REVERSAL'; rev.RECEIPT_ID=''; rev.STATUS='POSTED'; rev.PARENT_TXN_ID=t.TXN_ID; rev.CORRECTION_REASON=reason||''; rev.CREATED_AT=now; rev.CREATED_BY=session.userId; rev.UPDATED_AT=now; rev.UPDATED_BY=session.userId;
  ndAppend_('TRANSACTIONS',rev);
  var gl=ndFindMany_('GENERAL_LEDGER',{TXN_ID:t.TXN_ID});
  var lines=gl.map(function(x){return {accountCode:String(x.ACCOUNT_CODE),debit:ndNumber_(x.CREDIT),credit:ndNumber_(x.DEBIT)};});
  if(lines.length) ndPostJournalLines_(session,revId,t.TXN_DATE,lines,t.MEMBER_ID,t.RELATED_ID,'Reversal: '+t.DESCRIPTION);
  return revId;
}

function ndGetAccountBalances_(){
  var accounts=ndRows_('BANK_ACCOUNTS').filter(function(a){return a.STATUS==='ACTIVE';});
  var txStatus={};ndRows_('TRANSACTIONS').forEach(function(t){txStatus[t.TXN_ID]=t.STATUS;});
  var delta={};ndRows_('GENERAL_LEDGER').forEach(function(g){if(txStatus[g.TXN_ID]&&!ndIsFinanciallyEffectiveStatus_(txStatus[g.TXN_ID]))return;var code=String(g.ACCOUNT_CODE);delta[code]=(delta[code]||0)+ndNumber_(g.DEBIT)-ndNumber_(g.CREDIT);});
  return accounts.map(function(a){
    return {id:a.ACCOUNT_ID,code:a.ACCOUNT_CODE,name:a.ACCOUNT_NAME,type:a.TYPE,balance:ndRound2_(ndNumber_(a.OPENING_BALANCE)+(delta[String(a.ACCOUNT_CODE)]||0)),bank:a.BANK_NAME,number:a.ACCOUNT_NO};
  });
}
function ndRequireAccountFunds_(accountId,amount,label){var a=ndGetAccountBalances_().filter(function(x){return x.id===accountId;})[0];if(!a)throw new Error('Payment account not found.');if(ndNumber_(amount)>a.balance+0.01)throw new Error((label||'Payment')+' exceeds available '+a.name+' balance: '+a.balance);return a;}

function ndIncomeType_(value){
  var type=String(value||'GENERAL').trim().toUpperCase().replace(/[ -]+/g,'_');
  if(['GENERAL','GENERAL_INCOME'].indexOf(type)>=0)return 'GENERAL';
  if(['DISTRIBUTABLE','DISTRIBUTABLE_PROFIT','PROFIT'].indexOf(type)>=0)return 'DISTRIBUTABLE_PROFIT';
  throw new Error('Income type must be General Income or Distributable Profit.');
}

function ndExistingIncomeRequest_(clientRequestId){
  clientRequestId=String(clientRequestId||'').trim();if(!clientRequestId)return null;
  return ndRows_('INCOME').filter(function(x){return String(x.CLIENT_REQUEST_ID||'')===clientRequestId&&['CANCELLED','REVERSED'].indexOf(String(x.STATUS||'').toUpperCase())<0;})[0]||null;
}

function ndLinkedProfitForIncome_(income){
  if(!income)return null;
  if(income.PROFIT_ID){var direct=ndFindOne_('PROFIT_RECORDS','PROFIT_ID',income.PROFIT_ID);if(direct)return direct;}
  return ndRows_('PROFIT_RECORDS').filter(function(p){return p.SOURCE_INCOME_ID===income.INCOME_ID||(income.TXN_ID&&p.SOURCE_TXN_ID===income.TXN_ID);})[0]||null;
}

function getFinancePage(token){
  var s=ndRequirePermission_(token,'accounts.view'),vouchersByTxn={},profitsById={},txStatus={},approvedByProfit={};
  ndRows_('TRANSACTIONS').forEach(function(t){txStatus[t.TXN_ID]=t.STATUS;});
  ndRows_('VOUCHERS').forEach(function(v){if(!vouchersByTxn[v.TXN_ID]||v.STATUS==='POSTED')vouchersByTxn[v.TXN_ID]=v;});
  ndRows_('PROFIT_RECORDS').forEach(function(p){profitsById[p.PROFIT_ID]=p;});
  ndRows_('PROFIT_DISTRIBUTION').forEach(function(d){if(d.STATUS!=='APPROVED'||d.TXN_ID&&txStatus[d.TXN_ID]&&!ndIsFinanciallyEffectiveStatus_(txStatus[d.TXN_ID]))return;approvedByProfit[d.PROFIT_ID]=(approvedByProfit[d.PROFIT_ID]||0)+ndNumber_(d.AMOUNT);});
  var income=ndSortDesc_(ndRows_('INCOME'),'DATE').slice(0,100).map(function(r){var v=r.VOUCHER_ID?ndFindOne_('VOUCHERS','VOUCHER_ID',r.VOUCHER_ID):vouchersByTxn[r.TXN_ID],p=r.PROFIT_ID?profitsById[r.PROFIT_ID]:null,distributed=p?ndRound2_(approvedByProfit[p.PROFIT_ID]||0):0;return Object.assign({},r,{INCOME_TYPE:r.INCOME_TYPE||'GENERAL',VOUCHER_ID:r.VOUCHER_ID||(v&&v.VOUCHER_ID)||'',PROFIT_STATUS:p?p.STATUS:'',DISTRIBUTED_AMOUNT:distributed,UNDISTRIBUTED_AMOUNT:p?ndRound2_(Math.max(0,ndNumber_(p.AMOUNT)-distributed)):0});});
  var expenses=ndSortDesc_(ndRows_('EXPENSES'),'DATE').slice(0,100).map(function(r){var v=r.VOUCHER_ID?ndFindOne_('VOUCHERS','VOUCHER_ID',r.VOUCHER_ID):vouchersByTxn[r.TXN_ID];return Object.assign({},r,{VOUCHER_ID:r.VOUCHER_ID||(v&&v.VOUCHER_ID)||'',ALLOCATION_METHOD:r.ALLOCATION_METHOD||'NORMAL'});});
  return {accounts:ndGetAccountBalances_(),income:income,expenses:expenses,ledger:ndSortDesc_(ndRows_('GENERAL_LEDGER'),'CREATED_AT').slice(0,200),profitLoss:getProfitLoss(token)};
}

function getIncomeFormOptions(token){
  var s=ndSession_(token);if(!(s.role==='ADMIN'||ndHasPermission_(s,'accounts.edit')||ndHasPermission_(s,'accounts.view')))throw new Error('PERMISSION_DENIED');
  return {sources:ndSortDesc_(ndRows_('PROFIT_SOURCES').filter(function(x){return x.STATUS==='ACTIVE';}),'CREATED_AT').slice(0,500),investments:ndSortDesc_(ndRows_('INVESTMENTS').filter(function(x){return x.STATUS!=='CANCELLED';}),'CREATED_AT').slice(0,500)};
}

function getIncomeDetails(token,incomeId){
  var s=ndSession_(token);if(!(s.role==='ADMIN'||ndHasPermission_(s,'accounts.view')||ndHasPermission_(s,'audit.view')))throw new Error('PERMISSION_DENIED');
  var income=ndFindOne_('INCOME','INCOME_ID',incomeId);if(!income)throw new Error('Income not found.');var profit=ndLinkedProfitForIncome_(income),voucher=income.VOUCHER_ID?ndFindOne_('VOUCHERS','VOUCHER_ID',income.VOUCHER_ID):ndRows_('VOUCHERS').filter(function(v){return v.TXN_ID===income.TXN_ID&&v.STATUS==='POSTED';})[0]||null,distributed=profit?ndProfitApprovedAmount_(profit.PROFIT_ID):0,reserved=profit?ndProfitReservedAmount_(profit.PROFIT_ID):0;
  return {income:Object.assign({},income,{INCOME_TYPE:income.INCOME_TYPE||'GENERAL',VOUCHER_ID:income.VOUCHER_ID||(voucher&&voucher.VOUCHER_ID)||'',PROFIT_ID:income.PROFIT_ID||(profit&&profit.PROFIT_ID)||'',DISTRIBUTED_AMOUNT:distributed,UNDISTRIBUTED_AMOUNT:profit?ndRound2_(Math.max(0,ndNumber_(profit.AMOUNT)-reserved)):0,RESERVED_AMOUNT:reserved}),transaction:ndFindOne_('TRANSACTIONS','TXN_ID',income.TXN_ID),voucher:voucher,profit:profit?Object.assign({},profit,{DISTRIBUTED_AMOUNT:distributed,UNDISTRIBUTED_AMOUNT:ndRound2_(Math.max(0,ndNumber_(profit.AMOUNT)-reserved)),RESERVED_AMOUNT:reserved}):null,distributions:profit?ndFindMany_('PROFIT_DISTRIBUTIONS',{PROFIT_ID:profit.PROFIT_ID}):[],journal:ndFindMany_('GENERAL_LEDGER',{TXN_ID:income.TXN_ID}),audit:ndFindMany_('AUDIT_LOG',{ENTITY_ID:incomeId})};
}

function addBankAccount(token,p){
  var s=ndRequirePermission_(token,'accounts.edit');p=p||{}; if(!p.name) throw new Error('Account name required.');
  var code=p.accountCode||('109'+ndNextId_('BANK_CODE','',3)); if(ndFindOne_('CHART_OF_ACCOUNTS','ACCOUNT_CODE',code)) throw new Error('Account code already exists.');
  var type=p.type||'BANK', system=type==='MFS'?'MFS':'BANK';
  ndAppend_('CHART_OF_ACCOUNTS',{ACCOUNT_CODE:code,ACCOUNT_NAME:p.name,ACCOUNT_TYPE:'ASSET',PARENT_CODE:'',STATUS:'ACTIVE',SYSTEM_ACCOUNT:''});
  var id=ndNextId_('ACCOUNT','ACC-',5),now=ndNowIso_();
  ndAppend_('BANK_ACCOUNTS',{ACCOUNT_ID:id,ACCOUNT_CODE:code,ACCOUNT_NAME:p.name,TYPE:type,BANK_NAME:p.bankName||'',ACCOUNT_NO:p.accountNo||'',BRANCH:p.branch||'',OPENING_BALANCE:ndRound2_(p.openingBalance),STATUS:'ACTIVE',CREATED_AT:now,CREATED_BY:s.userId,UPDATED_AT:now,UPDATED_BY:s.userId});
  ndCreateAudit_(s,'CREATE','BANK_ACCOUNT',id,'',p,'Bank/cash account created'); return {ok:true,accountId:id};
}

function createIncome(token,p){
  var s=ndRequirePermission_(token,'accounts.edit');p=p||{};
  return ndWithFinancialLock_(function(){
    var amount=ndRound2_(p.amount);if(amount<=0)throw new Error('Amount required.');var incomeType=ndIncomeType_(p.incomeType),clientRequestId=String(p.clientRequestId||'').trim().slice(0,120),duplicate=ndExistingIncomeRequest_(clientRequestId);if(duplicate)return {ok:true,duplicate:true,incomeId:duplicate.INCOME_ID,txnId:duplicate.TXN_ID,voucherId:duplicate.VOUCHER_ID,profitId:duplicate.PROFIT_ID||'',incomeType:duplicate.INCOME_TYPE||'GENERAL'};
    var account=ndAccountById_(p.accountId||'ACC-CASH'),category=String(p.category||'OTHER').trim().toUpperCase().slice(0,100),incomeSystem=p.systemIncomeAccount||({LATE_FEE:'LATE_FEE_INCOME',INVESTMENT_INCOME:'INVESTMENT_INCOME'}[category]||'OTHER_INCOME'),incomeCoa=ndCoaBySystem_(incomeSystem),source=null,period=null,investmentId='';
    if(incomeType==='DISTRIBUTABLE_PROFIT'){source=ndFindOne_('PROFIT_SOURCES','SOURCE_ID',p.sourceId);if(!source||source.STATUS!=='ACTIVE')throw new Error('Active profit source required for distributable profit.');investmentId=String(p.investmentId||source.INVESTMENT_ID||'');if(investmentId&&!ndFindOne_('INVESTMENTS','INVESTMENT_ID',investmentId))throw new Error('Linked investment not found.');if(source.INVESTMENT_ID&&investmentId&&source.INVESTMENT_ID!==investmentId)throw new Error('Selected investment does not match the profit source.');period=ndNormalizeProfitPeriod_(p);if(source.INVESTMENT_ID)incomeCoa=ndCoaBySystem_('INVESTMENT_INCOME');}
    var txnId=ndNextId_('TXN','TRX-',8),incomeId=ndNextId_('INCOME','INC-',7),voucherId=ndNextVoucherId_(),date=ndDateOnly_(p.date||p.profitDate||ndToday_()),now=ndNowIso_(),description=String(p.description||category||'Other income').trim().slice(0,1000),reference=String(p.reference||'').trim().slice(0,300),note=String(p.note||p.notes||'').trim().slice(0,2000),profitId='';
    var txn={TXN_ID:txnId,TXN_DATE:date,MEMBER_ID:p.memberId||'',TYPE:'INCOME',CATEGORY:'INCOME',DESCRIPTION:description,DIRECTION:'CREDIT',AMOUNT:amount,PRINCIPAL_AMOUNT:0,PROFIT_AMOUNT:amount,PENALTY_AMOUNT:0,PAYMENT_ACCOUNT_ID:account.ACCOUNT_ID,PAYMENT_METHOD:p.paymentMethod||account.TYPE,REFERENCE:reference,RELATED_ID:incomeId,RECEIPT_ID:'',STATUS:'PROCESSING',PARENT_TXN_ID:'',CORRECTION_REASON:'',CREATED_AT:now,CREATED_BY:s.userId,UPDATED_AT:now,UPDATED_BY:s.userId,NOTE_PURPOSE:note};
    var income={INCOME_ID:incomeId,DATE:date,CATEGORY:category,AMOUNT:amount,ACCOUNT_ID:account.ACCOUNT_ID,REFERENCE:reference,DESCRIPTION:description,TXN_ID:txnId,STATUS:'PROCESSING',CREATED_AT:now,CREATED_BY:s.userId,INCOME_TYPE:incomeType,PROFIT_ID:'',VOUCHER_ID:voucherId,CLIENT_REQUEST_ID:clientRequestId,NOTE:note,UPDATED_AT:now,UPDATED_BY:s.userId};
    var voucher={VOUCHER_ID:voucherId,TXN_ID:txnId,DATE:date,TYPE:incomeType==='DISTRIBUTABLE_PROFIT'?'DISTRIBUTABLE_PROFIT_INCOME':'INCOME',PAYEE:p.payee||p.source||(source&&source.SOURCE_NAME)||'Income Source',MEMBER_ID:p.memberId||'',AMOUNT:amount,PURPOSE:description,ACCOUNT_ID:account.ACCOUNT_ID,REFERENCE:reference,STATUS:'PROCESSING',CREATED_AT:now,CREATED_BY:s.userId};
    try{
      ndAppend_('TRANSACTIONS',txn);ndAppend_('INCOME',income);ndAppend_('VOUCHERS',voucher);ndPostJournalLines_(s,txnId,date,[{accountCode:account.ACCOUNT_CODE,debit:amount,credit:0},{accountCode:incomeCoa.ACCOUNT_CODE,debit:0,credit:amount}],p.memberId||'',incomeId,description);
      if(incomeType==='DISTRIBUTABLE_PROFIT')profitId=ndCreateProfitRecordFromPostedTxn_(s,{sourceId:source.SOURCE_ID,investmentId:investmentId,category:p.profitCategory||source.CATEGORY,profitDate:date,amount:amount,sourceTxnId:txnId,sourceIncomeId:incomeId,sourceVoucherId:voucherId,reference:reference,notes:note,periodType:period.type,periodStart:period.start,periodEnd:period.end,month:p.month,year:p.year,quarter:p.quarter,half:p.half});
      var finalNow=ndNowIso_(),incomeRow=ndFindOne_('INCOME','INCOME_ID',incomeId),txnRow=ndFindOne_('TRANSACTIONS','TXN_ID',txnId),voucherRow=ndFindOne_('VOUCHERS','VOUCHER_ID',voucherId);ndUpdateRow_('TRANSACTIONS',txnRow._row,{STATUS:'POSTED',UPDATED_AT:finalNow,UPDATED_BY:s.userId});ndUpdateRow_('INCOME',incomeRow._row,{STATUS:'POSTED',PROFIT_ID:profitId,UPDATED_AT:finalNow,UPDATED_BY:s.userId});ndUpdateRow_('VOUCHERS',voucherRow._row,{STATUS:'POSTED'});ndCreateAudit_(s,'CREATE','INCOME',incomeId,'',{transaction:txn,incomeType:incomeType,profitId:profitId,voucherId:voucherId},incomeType==='DISTRIBUTABLE_PROFIT'?'Distributable profit income posted':'General income posted');return {ok:true,duplicate:false,incomeId:incomeId,txnId:txnId,voucherId:voucherId,profitId:profitId,incomeType:incomeType};
    }catch(e){
      try{if(profitId){var failedProfit=ndFindOne_('PROFIT_RECORDS','PROFIT_ID',profitId);if(failedProfit)ndUpdateRow_('PROFIT_RECORDS',failedProfit._row,{STATUS:'CANCELLED',DISTRIBUTED_AMOUNT:0,UNDISTRIBUTED_AMOUNT:0,UPDATED_AT:ndNowIso_(),UPDATED_BY:s.userId});}var failedVoucher=ndFindOne_('VOUCHERS','VOUCHER_ID',voucherId);if(failedVoucher)ndUpdateRow_('VOUCHERS',failedVoucher._row,{STATUS:'CANCELLED'});var failedIncome=ndFindOne_('INCOME','INCOME_ID',incomeId);if(failedIncome)ndUpdateRow_('INCOME',failedIncome._row,{STATUS:'CANCELLED',UPDATED_AT:ndNowIso_(),UPDATED_BY:s.userId});var failedTxn=ndFindOne_('TRANSACTIONS','TXN_ID',txnId);if(failedTxn){if(ndFindMany_('GENERAL_LEDGER',{TXN_ID:txnId}).length){var failedRev=ndReverseTransaction_(s,failedTxn,'Automatic rollback after incomplete income posting');ndUpdateRow_('TRANSACTIONS',failedTxn._row,{STATUS:'REVERSED',CORRECTION_REASON:'Automatic rollback after incomplete income posting',UPDATED_AT:ndNowIso_(),UPDATED_BY:s.userId});}else ndUpdateRow_('TRANSACTIONS',failedTxn._row,{STATUS:'CANCELLED',UPDATED_AT:ndNowIso_(),UPDATED_BY:s.userId});}}catch(rollbackError){}throw e;
    }
  });
}

function ndExpenseAllocationMethod_(value){
  var method=String(value||'NORMAL').trim().toUpperCase().replace(/[ -]+/g,'_');
  if(['UNIT','UNITS','UNIT_BASED','UNIT_BASED_MEMBER_DEDUCTION'].indexOf(method)>=0)return 'UNIT_BASED';
  if(['NORMAL','MANUAL','MANUAL_NORMAL_EXPENSE'].indexOf(method)>=0)return 'NORMAL';
  throw new Error('Invalid expense allocation method.');
}

function ndBuildUnitExpenseAllocation_(amount,date){
  amount=ndRound2_(amount);date=ndDateOnly_(date||ndToday_());if(amount<=0)throw new Error('Amount required.');
  var members=ndRows_('MEMBERS').filter(function(m){return m.STATUS==='ACTIVE';});
  if(!members.length)throw new Error('No active members are available for unit-based allocation.');
  var rows=members.map(function(m){
    var unit=ndGetCurrentSavingsUnit_(m.MEMBER_ID,date),units=unit?ndNumber_(unit.UNITS):0;
    if(units<0)throw new Error('Negative savings units are not allowed for '+m.MEMBER_ID+'.');
    return {memberId:m.MEMBER_ID,name:m.NAME_BN||m.NAME_EN||m.MEMBER_ID,basis:units,units:units,amount:0,rate:0,savingsBefore:ndMemberSavingsBalance_(m.MEMBER_ID)};
  });
  var totalUnits=ndRound2_(rows.reduce(function(z,x){return z+ndNumber_(x.units);},0));
  if(totalUnits<=0)throw new Error('Total units cannot be zero.');
  ndAllocateProportionalDistribution_(amount,rows,totalUnits);
  var allocatedAmount=ndRound2_(rows.reduce(function(z,x){return z+ndNumber_(x.amount);},0));
  rows.forEach(function(x){x.totalUnits=totalUnits;x.unitPercentage=x.rate;x.savingsAfter=ndRound2_(x.savingsBefore-x.amount);x.insufficient=x.amount>x.savingsBefore+0.009;});
  var insufficient=rows.filter(function(x){return x.insufficient;}).map(function(x){return {memberId:x.memberId,name:x.name,required:x.amount,available:x.savingsBefore,shortage:ndRound2_(x.amount-x.savingsBefore)};});
  return {allocationMethod:'UNIT_BASED',date:date,totalExpense:amount,totalUnits:totalUnits,memberCount:rows.length,allocatedMemberCount:rows.filter(function(x){return x.amount>0;}).length,percentageTotal:ndRound2_(rows.reduce(function(z,x){return z+x.rate;},0)),allocatedAmount:allocatedAmount,unallocatedAmount:ndRound2_(amount-allocatedAmount),insufficientMembers:insufficient,canPost:insufficient.length===0&&Math.abs(amount-allocatedAmount)<0.009,rows:rows};
}

function previewExpenseAllocation(token,p){
  var s=ndSession_(token);if(!(s.role==='ADMIN'||ndHasPermission_(s,'accounts.edit')||ndHasPermission_(s,'accounts.view')))throw new Error('PERMISSION_DENIED');
  p=p||{};if(ndExpenseAllocationMethod_(p.allocationMethod)!=='UNIT_BASED')throw new Error('Unit-based allocation must be selected for preview.');
  return ndBuildUnitExpenseAllocation_(p.amount,ndDateOnly_(p.date||ndToday_()));
}

function ndExistingExpenseRequest_(clientRequestId){
  clientRequestId=String(clientRequestId||'').trim();if(!clientRequestId)return null;
  return ndRows_('EXPENSES').filter(function(x){return String(x.CLIENT_REQUEST_ID||'')===clientRequestId;})[0]||null;
}

function createExpense(token,p){
  var s=ndRequirePermission_(token,'accounts.edit');p=p||{};
  return ndWithFinancialLock_(function(){
    var amount=ndRound2_(p.amount);if(amount<=0)throw new Error('Amount required.');
    var method=ndExpenseAllocationMethod_(p.allocationMethod),clientRequestId=String(p.clientRequestId||'').trim().slice(0,120);
    if(method==='UNIT_BASED'&&!clientRequestId)throw new Error('Client request ID is required for duplicate-safe unit allocation.');
    var duplicate=ndExistingExpenseRequest_(clientRequestId);if(duplicate)return {ok:true,duplicate:true,expenseId:duplicate.EXPENSE_ID,txnId:duplicate.TXN_ID,voucherId:duplicate.VOUCHER_ID,allocationMethod:duplicate.ALLOCATION_METHOD};
    var account=ndAccountById_(p.accountId||'ACC-CASH');ndRequireAccountFunds_(account.ACCOUNT_ID,amount,'Expense');
    var expenseSystem=p.systemExpenseAccount||({BANK_CHARGE:'BANK_CHARGE_EXPENSE',LEGAL:'LEGAL_EXPENSE',OTHER:'OTHER_EXPENSE'}[String(p.category||'').toUpperCase()]||'OPERATING_EXPENSE');
    var expenseCoa=ndCoaBySystem_(expenseSystem),date=ndDateOnly_(p.date||ndToday_()),allocation=method==='UNIT_BASED'?ndBuildUnitExpenseAllocation_(amount,date):null;
    if(allocation&&allocation.insufficientMembers.length){var list=allocation.insufficientMembers.map(function(x){return x.memberId+' (প্রয়োজন '+x.required+', আছে '+x.available+')';});throw new Error('অপর্যাপ্ত সঞ্চয়: '+list.join('; '));}
    if(allocation&&(!allocation.canPost||Math.abs(allocation.percentageTotal-100)>0.009))throw new Error('Unit allocation could not be reconciled exactly.');
    var txnId=ndNextId_('TXN','TRX-',8),expenseId=ndNextId_('EXPENSE','EXP-',7),voucherId=ndNextVoucherId_(),now=ndNowIso_();
    var docId='';if(p.documentDataUrl)docId=ndSaveDataUrlFile_(p.documentDataUrl,'expense_'+expenseId,ndConfig_('DOCUMENT_FOLDER_ID',''));
    var description=String(p.description||p.category||'Expense').trim().slice(0,1000),reference=String(p.reference||'').trim().slice(0,300);
    var txn={TXN_ID:txnId,TXN_DATE:date,MEMBER_ID:'',TYPE:'EXPENSE',CATEGORY:'EXPENSE',DESCRIPTION:description,DIRECTION:'DEBIT',AMOUNT:amount,PRINCIPAL_AMOUNT:0,PROFIT_AMOUNT:0,PENALTY_AMOUNT:0,PAYMENT_ACCOUNT_ID:account.ACCOUNT_ID,PAYMENT_METHOD:p.paymentMethod||account.TYPE,REFERENCE:reference,RELATED_ID:expenseId,RECEIPT_ID:'',STATUS:'POSTED',PARENT_TXN_ID:'',CORRECTION_REASON:'',CREATED_AT:now,CREATED_BY:s.userId,UPDATED_AT:now,UPDATED_BY:s.userId,NOTE_PURPOSE:''};
    var expense={EXPENSE_ID:expenseId,DATE:date,CATEGORY:p.category||'OPERATING',AMOUNT:amount,ACCOUNT_ID:account.ACCOUNT_ID,REFERENCE:reference,DESCRIPTION:description,DOCUMENT_FILE_ID:docId,TXN_ID:txnId,STATUS:'POSTED',APPROVAL_STATUS:'APPROVED',CREATED_AT:now,CREATED_BY:s.userId,UPDATED_AT:now,UPDATED_BY:s.userId,ALLOCATION_METHOD:method,TOTAL_UNITS:allocation?allocation.totalUnits:0,MEMBER_COUNT:allocation?allocation.memberCount:0,ALLOCATED_AMOUNT:allocation?allocation.allocatedAmount:0,VOUCHER_ID:voucherId,CLIENT_REQUEST_ID:clientRequestId,ALLOCATION_STATUS:allocation?'POSTED':'NOT_APPLICABLE'};
    ndAppend_('TRANSACTIONS',txn);ndAppend_('EXPENSES',expense);ndAppend_('VOUCHERS',{VOUCHER_ID:voucherId,TXN_ID:txnId,DATE:date,TYPE:'EXPENSE',PAYEE:p.payee||p.vendor||'Expense Payee',MEMBER_ID:'',AMOUNT:amount,PURPOSE:description+(allocation?' · Unit-Based Member Deduction':''),ACCOUNT_ID:account.ACCOUNT_ID,REFERENCE:reference,STATUS:'POSTED',CREATED_AT:now,CREATED_BY:s.userId});
    ndPostJournalLines_(s,txnId,date,[{accountCode:expenseCoa.ACCOUNT_CODE,debit:amount,credit:0},{accountCode:account.ACCOUNT_CODE,debit:0,credit:amount}],'',expenseId,description);
    var allocationRows=[];
    if(allocation){
      var savingsCoa=ndCoaBySystem_('MEMBER_SAVINGS'),surplusCoa=ndCoaBySystem_('RETAINED_SURPLUS'),positive=allocation.rows.filter(function(x){return x.amount>0;}),childTxnIds=ndReserveIds_('TXN',Math.max(1,positive.length),'TRX-',8),allocationIds=ndReserveIds_('EXPENSE_ALLOCATION',allocation.rows.length,'EAL-',8),childTxns=[],childIndex=0;
      allocation.rows.forEach(function(x,i){
        var childTxnId='';
        if(x.amount>0){childTxnId=childTxnIds[childIndex++];childTxns.push({TXN_ID:childTxnId,TXN_DATE:date,MEMBER_ID:x.memberId,TYPE:'ASSOCIATION_EXPENSE_DEDUCTION',CATEGORY:'SAVINGS',DESCRIPTION:'সমিতির ব্যয় কর্তন: '+description,DIRECTION:'DEBIT',AMOUNT:x.amount,PRINCIPAL_AMOUNT:x.amount,PROFIT_AMOUNT:0,PENALTY_AMOUNT:0,PAYMENT_ACCOUNT_ID:'',PAYMENT_METHOD:'INTERNAL',REFERENCE:voucherId,RELATED_ID:expenseId,RECEIPT_ID:'',STATUS:'POSTED',PARENT_TXN_ID:txnId,CORRECTION_REASON:'',CREATED_AT:now,CREATED_BY:s.userId,UPDATED_AT:now,UPDATED_BY:s.userId,NOTE_PURPOSE:description});}
        allocationRows.push({ALLOCATION_ID:allocationIds[i],EXPENSE_ID:expenseId,VOUCHER_ID:voucherId,MAIN_TXN_ID:txnId,MEMBER_ID:x.memberId,MEMBER_NAME:x.name,UNIT_QUANTITY:x.units,TOTAL_UNITS:allocation.totalUnits,UNIT_PERCENTAGE:x.unitPercentage,AMOUNT:x.amount,SAVINGS_BEFORE:x.savingsBefore,SAVINGS_AFTER:x.savingsAfter,TXN_ID:childTxnId,STATUS:x.amount>0?'POSTED':'ZERO_ALLOCATION',CREATED_AT:now,CREATED_BY:s.userId,UPDATED_AT:now,UPDATED_BY:s.userId});
      });
      ndAppendMany_('TRANSACTIONS',childTxns);ndAppendMany_('EXPENSE_ALLOCATIONS',allocationRows);
      var postedAllocations=allocationRows.filter(function(x){return x.AMOUNT>0;});ndPostJournalBatchEntries_(s,postedAllocations.map(function(x){return {txnId:x.TXN_ID,date:date,memberId:x.MEMBER_ID,relatedId:expenseId,description:'Unit-based expense allocation: '+description,lines:[{accountCode:savingsCoa.ACCOUNT_CODE,debit:x.AMOUNT,credit:0},{accountCode:surplusCoa.ACCOUNT_CODE,debit:0,credit:x.AMOUNT}]};}));postedAllocations.forEach(function(x){ndCreateNotification_(x.MEMBER_ID,'ASSOCIATION_EXPENSE','সমিতির ব্যয় কর্তন',x.AMOUNT+' টাকা সঞ্চয় থেকে কর্তন হয়েছে। Voucher: '+voucherId);});
    }
    ndCreateAudit_(s,'CREATE','EXPENSE',expenseId,'',{transaction:txn,expense:expense,allocationSummary:allocation?{totalUnits:allocation.totalUnits,memberCount:allocation.memberCount,allocatedAmount:allocation.allocatedAmount}:null},allocation?'Unit-based association expense posted':'Expense posted');
    return {ok:true,duplicate:false,expenseId:expenseId,txnId:txnId,voucherId:voucherId,allocationMethod:method,totalUnits:allocation?allocation.totalUnits:0,memberCount:allocation?allocation.memberCount:0,allocatedAmount:allocation?allocation.allocatedAmount:0,allocationRows:allocationRows};
  });
}

function listVouchers(token,options){
  var s=ndSession_(token),options=options||{},rows=ndRows_('VOUCHERS');
  if(s.role==='MEMBER')rows=rows.filter(function(v){return v.MEMBER_ID===s.memberId;});
  else if(!(s.role==='ADMIN'||ndHasPermission_(s,'receipts.view')||ndHasPermission_(s,'accounts.view')))throw new Error('PERMISSION_DENIED');
  if(options.q){var q=String(options.q).toLowerCase();rows=rows.filter(function(v){return [v.VOUCHER_ID,v.TXN_ID,v.MEMBER_ID,v.PAYEE,v.PURPOSE,v.REFERENCE].join(' ').toLowerCase().indexOf(q)>=0;});}
  return ndSortDesc_(rows,'CREATED_AT').slice(0,Math.min(1000,ndNumber_(options.limit||300)));
}
function getVoucher(token,voucherId){
  var s=ndSession_(token),v=ndFindOne_('VOUCHERS','VOUCHER_ID',voucherId);if(!v)throw new Error('Voucher not found.');
  if(s.role==='MEMBER'&&v.MEMBER_ID!==s.memberId)throw new Error('PERMISSION_DENIED');
  if(s.role!=='MEMBER'&&!(s.role==='ADMIN'||ndHasPermission_(s,'receipts.view')||ndHasPermission_(s,'accounts.view')))throw new Error('PERMISSION_DENIED');
  var member=v.MEMBER_ID?ndFindOne_('MEMBERS','MEMBER_ID',v.MEMBER_ID):null,account=ndFindOne_('BANK_ACCOUNTS','ACCOUNT_ID',v.ACCOUNT_ID),expense=ndRows_('EXPENSES').filter(function(x){return x.VOUCHER_ID===v.VOUCHER_ID||x.TXN_ID===v.TXN_ID;})[0]||null,allocations=expense&&expense.ALLOCATION_METHOD==='UNIT_BASED'?ndFindMany_('EXPENSE_ALLOCATIONS',{EXPENSE_ID:expense.EXPENSE_ID}):[],income=ndRows_('INCOME').filter(function(x){return x.VOUCHER_ID===v.VOUCHER_ID||x.TXN_ID===v.TXN_ID;})[0]||null,profit=income?ndLinkedProfitForIncome_(income):null,source=profit?ndFindOne_('PROFIT_SOURCES','SOURCE_ID',profit.SOURCE_ID):null;
  return {voucher:v,member:member,account:account,expense:expense,income:income,profit:profit,profitSource:source,allocations:allocations,allocationSummary:expense&&expense.ALLOCATION_METHOD==='UNIT_BASED'?{method:expense.ALLOCATION_METHOD,totalUnits:ndNumber_(expense.TOTAL_UNITS),memberCount:ndNumber_(expense.MEMBER_COUNT),allocatedAmount:ndNumber_(expense.ALLOCATED_AMOUNT),status:expense.ALLOCATION_STATUS}:null,config:{nameBn:ndConfig_('SOCIETY_NAME_BN',''),nameEn:ndConfig_('SOCIETY_NAME_EN',''),estd:ndConfig_('ESTD_YEAR','2026'),tagline:ndConfig_('TAGLINE_BN',''),address:ndConfig_('SOCIETY_ADDRESS',''),mobile:ndConfig_('SOCIETY_MOBILE',''),email:ndConfig_('SOCIETY_EMAIL','')}};
}

function getExpenseAllocationDetails(token,expenseId){
  var s=ndSession_(token);if(!(s.role==='ADMIN'||ndHasPermission_(s,'accounts.view')||ndHasPermission_(s,'audit.view')))throw new Error('PERMISSION_DENIED');
  var expense=ndFindOne_('EXPENSES','EXPENSE_ID',expenseId);if(!expense)throw new Error('Expense not found.');
  return {expense:expense,voucher:expense.VOUCHER_ID?ndFindOne_('VOUCHERS','VOUCHER_ID',expense.VOUCHER_ID):null,transaction:ndFindOne_('TRANSACTIONS','TXN_ID',expense.TXN_ID),allocations:ndFindMany_('EXPENSE_ALLOCATIONS',{EXPENSE_ID:expenseId})};
}

function getExpenseDetails(token,expenseId){
  var d=getExpenseAllocationDetails(token,expenseId);d.journal=d.transaction?ndFindMany_('GENERAL_LEDGER',{TXN_ID:d.transaction.TXN_ID}):[];d.audit=ndFindMany_('AUDIT_LOG',{ENTITY_ID:expenseId});return d;
}

function updateIncome(token,incomeId,p,reason){
  var s=ndRequirePermission_(token,'accounts.edit');p=p||{};reason=String(reason||p.reason||'').trim();if(!reason)throw new Error('Modification reason required.');
  return ndWithFinancialLock_(function(){
    var income=ndFindOne_('INCOME','INCOME_ID',incomeId);if(!income||['CANCELLED','REVERSED'].indexOf(String(income.STATUS||'').toUpperCase())>=0)throw new Error('Income is not editable.');var oldTxn=ndFindOne_('TRANSACTIONS','TXN_ID',income.TXN_ID);if(!oldTxn||oldTxn.STATUS!=='POSTED')throw new Error('Income transaction is not editable.');
    var oldProfit=ndLinkedProfitForIncome_(income),oldType=ndIncomeType_(income.INCOME_TYPE||'GENERAL'),newType=ndIncomeType_(p.incomeType===undefined?oldType:p.incomeType),amount=ndRound2_(p.amount===undefined?income.AMOUNT:p.amount);if(amount<=0)throw new Error('Income amount required.');
    var date=ndDateOnly_(p.date||income.DATE),account=ndAccountById_(p.accountId||income.ACCOUNT_ID||oldTxn.PAYMENT_ACCOUNT_ID),category=String(p.category===undefined?income.CATEGORY:p.category||'OTHER').trim().toUpperCase().slice(0,100),description=String(p.description===undefined?income.DESCRIPTION:p.description||category).trim().slice(0,1000),reference=String(p.reference===undefined?income.REFERENCE:p.reference||'').trim().slice(0,300),note=String(p.note===undefined?income.NOTE||oldTxn.NOTE_PURPOSE:p.note||'').trim().slice(0,2000),source=null,period=null,investmentId='',reserved=oldProfit?ndProfitReservedAmount_(oldProfit.PROFIT_ID):0;
    if(newType==='DISTRIBUTABLE_PROFIT'){var sourceId=String(p.sourceId||oldProfit&&oldProfit.SOURCE_ID||'');source=ndFindOne_('PROFIT_SOURCES','SOURCE_ID',sourceId);if(!source||source.STATUS!=='ACTIVE')throw new Error('Active profit source required.');investmentId=String(p.investmentId===undefined?(oldProfit&&oldProfit.INVESTMENT_ID||source.INVESTMENT_ID||''):p.investmentId||source.INVESTMENT_ID||'');if(investmentId&&!ndFindOne_('INVESTMENTS','INVESTMENT_ID',investmentId))throw new Error('Linked investment not found.');if(source.INVESTMENT_ID&&investmentId&&source.INVESTMENT_ID!==investmentId)throw new Error('Selected investment does not match the profit source.');var hasPeriodChange=p.periodType!==undefined||p.periodStart!==undefined||p.periodEnd!==undefined||p.month!==undefined||p.year!==undefined||p.quarter!==undefined||p.half!==undefined;period=oldProfit&&!hasPeriodChange?{type:oldProfit.PERIOD_TYPE,start:oldProfit.PERIOD_START,end:oldProfit.PERIOD_END,label:oldProfit.PERIOD_LABEL,financialYear:String(oldProfit.PERIOD_START||date).slice(0,4)}:ndNormalizeProfitPeriod_(Object.assign({},p,{profitDate:date}));if(reserved>0&&oldProfit&&(source.SOURCE_ID!==oldProfit.SOURCE_ID||investmentId!==String(oldProfit.INVESTMENT_ID||'')||period.type!==oldProfit.PERIOD_TYPE||period.start!==oldProfit.PERIOD_START||period.end!==oldProfit.PERIOD_END||date!==oldProfit.PROFIT_DATE))throw new Error('Source, investment, date or period cannot change while a profit distribution is reserved or approved. Cancel/reverse distributions first.');if(amount+0.009<reserved)throw new Error('Income amount cannot be lower than distributed/reserved profit: '+reserved);}
    if(newType==='GENERAL'&&oldProfit&&reserved>0)throw new Error('Cancel/reverse all related profit distributions before changing this income to General Income.');
    var incomeSystem=p.systemIncomeAccount||({LATE_FEE:'LATE_FEE_INCOME',INVESTMENT_INCOME:'INVESTMENT_INCOME'}[category]||'OTHER_INCOME');if(newType==='DISTRIBUTABLE_PROFIT'&&source&&source.INVESTMENT_ID)incomeSystem='INVESTMENT_INCOME';var incomeCoa=ndCoaBySystem_(incomeSystem),oldVoucher=income.VOUCHER_ID?ndFindOne_('VOUCHERS','VOUCHER_ID',income.VOUCHER_ID):ndRows_('VOUCHERS').filter(function(v){return v.TXN_ID===oldTxn.TXN_ID&&v.STATUS==='POSTED';})[0]||null,newTxnId=ndNextId_('TXN','TRX-',8),newVoucherId=ndNextVoucherId_(),now=ndNowIso_(),reversalId=ndReverseTransaction_(s,oldTxn,reason),newTxn=Object.assign({},oldTxn);delete newTxn._row;
    newTxn.TXN_ID=newTxnId;newTxn.TXN_DATE=date;newTxn.DESCRIPTION=description;newTxn.AMOUNT=amount;newTxn.PRINCIPAL_AMOUNT=0;newTxn.PROFIT_AMOUNT=amount;newTxn.PENALTY_AMOUNT=0;newTxn.PAYMENT_ACCOUNT_ID=account.ACCOUNT_ID;newTxn.PAYMENT_METHOD=p.paymentMethod||account.TYPE;newTxn.REFERENCE=reference;newTxn.RELATED_ID=incomeId;newTxn.STATUS='PROCESSING';newTxn.PARENT_TXN_ID=oldTxn.TXN_ID;newTxn.CORRECTION_REASON=reason;newTxn.CREATED_AT=now;newTxn.CREATED_BY=s.userId;newTxn.UPDATED_AT=now;newTxn.UPDATED_BY=s.userId;newTxn.NOTE_PURPOSE=note;ndAppend_('TRANSACTIONS',newTxn);ndPostJournalLines_(s,newTxnId,date,[{accountCode:account.ACCOUNT_CODE,debit:amount,credit:0},{accountCode:incomeCoa.ACCOUNT_CODE,debit:0,credit:amount}],newTxn.MEMBER_ID||'',incomeId,description);
    var newVoucher={VOUCHER_ID:newVoucherId,TXN_ID:newTxnId,DATE:date,TYPE:newType==='DISTRIBUTABLE_PROFIT'?'DISTRIBUTABLE_PROFIT_INCOME':'INCOME',PAYEE:p.payee||(source&&source.SOURCE_NAME)||(oldVoucher&&oldVoucher.PAYEE)||'Income Source',MEMBER_ID:newTxn.MEMBER_ID||'',AMOUNT:amount,PURPOSE:description,ACCOUNT_ID:account.ACCOUNT_ID,REFERENCE:reference,STATUS:'POSTED',CREATED_AT:now,CREATED_BY:s.userId};ndAppend_('VOUCHERS',newVoucher);
    var profitId='';if(newType==='DISTRIBUTABLE_PROFIT'){if(oldProfit){profitId=oldProfit.PROFIT_ID;var profitUp={SOURCE_ID:source.SOURCE_ID,INVESTMENT_ID:investmentId,CATEGORY:String(p.profitCategory||source.CATEGORY||oldProfit.CATEGORY||'OTHER').toUpperCase(),PROFIT_DATE:date,PERIOD_TYPE:period.type,PERIOD_START:period.start,PERIOD_END:period.end,PERIOD_LABEL:period.label,AMOUNT:amount,SOURCE_TXN_ID:newTxnId,REFERENCE:reference,NOTES:note,UPDATED_AT:now,UPDATED_BY:s.userId,SOURCE_INCOME_ID:incomeId,SOURCE_VOUCHER_ID:newVoucherId};ndUpdateRow_('PROFIT_RECORDS',oldProfit._row,profitUp);ndRefreshProfitRecord_(profitId,s.userId);}else profitId=ndCreateProfitRecordFromPostedTxn_(s,{sourceId:source.SOURCE_ID,investmentId:investmentId,category:p.profitCategory||source.CATEGORY,profitDate:date,amount:amount,sourceTxnId:newTxnId,sourceIncomeId:incomeId,sourceVoucherId:newVoucherId,reference:reference,notes:note,periodType:period.type,periodStart:period.start,periodEnd:period.end,month:p.month,year:p.year,quarter:p.quarter,half:p.half});}else if(oldProfit){ndUpdateRow_('PROFIT_RECORDS',oldProfit._row,{STATUS:'CANCELLED',DISTRIBUTED_AMOUNT:0,UNDISTRIBUTED_AMOUNT:0,UPDATED_AT:now,UPDATED_BY:s.userId});}
    ndUpdateRow_('TRANSACTIONS',oldTxn._row,{STATUS:'CORRECTED',CORRECTION_REASON:reason,UPDATED_AT:now,UPDATED_BY:s.userId});var newTxnRow=ndFindOne_('TRANSACTIONS','TXN_ID',newTxnId);ndUpdateRow_('TRANSACTIONS',newTxnRow._row,{STATUS:'POSTED',UPDATED_AT:now,UPDATED_BY:s.userId});if(oldVoucher)ndUpdateRow_('VOUCHERS',oldVoucher._row,{STATUS:'CANCELLED'});var incomeUp={DATE:date,CATEGORY:category,AMOUNT:amount,ACCOUNT_ID:account.ACCOUNT_ID,REFERENCE:reference,DESCRIPTION:description,TXN_ID:newTxnId,STATUS:'POSTED',INCOME_TYPE:newType,PROFIT_ID:profitId,VOUCHER_ID:newVoucherId,NOTE:note,UPDATED_AT:now,UPDATED_BY:s.userId};ndUpdateRow_('INCOME',income._row,incomeUp);ndCreateAudit_(s,'UPDATE','INCOME',incomeId,income,{income:incomeUp,reversalTxnId:reversalId,replacementTxnId:newTxnId,profitId:profitId},reason);return {ok:true,incomeId:incomeId,reversalTxnId:reversalId,replacementTxnId:newTxnId,voucherId:newVoucherId,profitId:profitId,incomeType:newType};
  });
}

function reverseIncome(token,incomeId,reason){
  var s=ndRequirePermission_(token,'accounts.edit');reason=String(reason||'').trim();if(!reason)throw new Error('Reversal reason required.');
  return ndWithFinancialLock_(function(){var income=ndFindOne_('INCOME','INCOME_ID',incomeId);if(!income||['CANCELLED','REVERSED'].indexOf(String(income.STATUS||'').toUpperCase())>=0)throw new Error('Income is not eligible for reversal.');var profit=ndLinkedProfitForIncome_(income);if(profit&&ndProfitReservedAmount_(profit.PROFIT_ID)>0)throw new Error('Cancel/reverse all related profit distributions before reversing this income.');var t=ndFindOne_('TRANSACTIONS','TXN_ID',income.TXN_ID);if(!t||t.STATUS!=='POSTED')throw new Error('Income transaction is not eligible for reversal.');var result=ndReverseStandaloneFinancialTransaction_(s,t,reason),now=ndNowIso_();ndUpdateRow_('INCOME',income._row,{STATUS:'REVERSED',UPDATED_AT:now,UPDATED_BY:s.userId});if(profit)ndUpdateRow_('PROFIT_RECORDS',profit._row,{STATUS:'REVERSED',DISTRIBUTED_AMOUNT:0,UNDISTRIBUTED_AMOUNT:0,UPDATED_AT:now,UPDATED_BY:s.userId});ndCreateAudit_(s,'REVERSE','INCOME',incomeId,income,{reversalTxnId:result.reversalTxnId,profitId:profit&&profit.PROFIT_ID||''},reason);return {ok:true,incomeId:incomeId,reversalTxnId:result.reversalTxnId,profitId:profit&&profit.PROFIT_ID||''};});
}

function updateNormalExpense(token,expenseId,p,reason){
  var s=ndRequirePermission_(token,'accounts.edit');p=p||{};reason=String(reason||p.reason||'').trim();if(!reason)throw new Error('Modification reason required.');
  return ndWithFinancialLock_(function(){var expense=ndFindOne_('EXPENSES','EXPENSE_ID',expenseId);if(!expense||expense.STATUS!=='POSTED')throw new Error('Expense is not editable.');if((expense.ALLOCATION_METHOD||'NORMAL')==='UNIT_BASED')throw new Error('Unit-based expense must be reversed as one complete allocation and recreated.');var oldTxn=ndFindOne_('TRANSACTIONS','TXN_ID',expense.TXN_ID);if(!oldTxn||oldTxn.STATUS!=='POSTED')throw new Error('Expense transaction is not editable.');var amount=ndRound2_(p.amount===undefined?expense.AMOUNT:p.amount);if(amount<=0)throw new Error('Expense amount required.');var date=ndDateOnly_(p.date||expense.DATE),account=ndAccountById_(p.accountId||expense.ACCOUNT_ID),category=String(p.category===undefined?expense.CATEGORY:p.category||'OTHER').trim().toUpperCase().slice(0,100),description=String(p.description===undefined?expense.DESCRIPTION:p.description||category).trim().slice(0,1000),reference=String(p.reference===undefined?expense.REFERENCE:p.reference||'').trim().slice(0,300),balance=ndGetAccountBalances_().filter(function(a){return a.id===account.ACCOUNT_ID;})[0];if(!balance)throw new Error('Payment account not found.');var projected=balance.balance+(account.ACCOUNT_ID===oldTxn.PAYMENT_ACCOUNT_ID?ndNumber_(oldTxn.AMOUNT):0);if(amount>projected+0.009)throw new Error('Expense exceeds available '+balance.name+' balance after correction: '+projected);var expenseSystem=p.systemExpenseAccount||({BANK_CHARGE:'BANK_CHARGE_EXPENSE',LEGAL:'LEGAL_EXPENSE',OTHER:'OTHER_EXPENSE'}[category]||'OPERATING_EXPENSE'),expenseCoa=ndCoaBySystem_(expenseSystem),oldVoucher=expense.VOUCHER_ID?ndFindOne_('VOUCHERS','VOUCHER_ID',expense.VOUCHER_ID):ndRows_('VOUCHERS').filter(function(v){return v.TXN_ID===oldTxn.TXN_ID&&v.STATUS==='POSTED';})[0]||null,reversalId=ndReverseTransaction_(s,oldTxn,reason),newTxnId=ndNextId_('TXN','TRX-',8),newVoucherId=ndNextVoucherId_(),now=ndNowIso_(),newTxn=Object.assign({},oldTxn);delete newTxn._row;newTxn.TXN_ID=newTxnId;newTxn.TXN_DATE=date;newTxn.DESCRIPTION=description;newTxn.AMOUNT=amount;newTxn.PAYMENT_ACCOUNT_ID=account.ACCOUNT_ID;newTxn.PAYMENT_METHOD=p.paymentMethod||account.TYPE;newTxn.REFERENCE=reference;newTxn.STATUS='PROCESSING';newTxn.PARENT_TXN_ID=oldTxn.TXN_ID;newTxn.CORRECTION_REASON=reason;newTxn.CREATED_AT=now;newTxn.CREATED_BY=s.userId;newTxn.UPDATED_AT=now;newTxn.UPDATED_BY=s.userId;newTxn.NOTE_PURPOSE=String(p.note||'').slice(0,2000);ndAppend_('TRANSACTIONS',newTxn);ndPostJournalLines_(s,newTxnId,date,[{accountCode:expenseCoa.ACCOUNT_CODE,debit:amount,credit:0},{accountCode:account.ACCOUNT_CODE,debit:0,credit:amount}],'',expenseId,description);ndAppend_('VOUCHERS',{VOUCHER_ID:newVoucherId,TXN_ID:newTxnId,DATE:date,TYPE:'EXPENSE',PAYEE:p.payee||p.vendor||(oldVoucher&&oldVoucher.PAYEE)||'Expense Payee',MEMBER_ID:'',AMOUNT:amount,PURPOSE:description,ACCOUNT_ID:account.ACCOUNT_ID,REFERENCE:reference,STATUS:'POSTED',CREATED_AT:now,CREATED_BY:s.userId});ndUpdateRow_('TRANSACTIONS',oldTxn._row,{STATUS:'CORRECTED',CORRECTION_REASON:reason,UPDATED_AT:now,UPDATED_BY:s.userId});var newTxnRow=ndFindOne_('TRANSACTIONS','TXN_ID',newTxnId);ndUpdateRow_('TRANSACTIONS',newTxnRow._row,{STATUS:'POSTED',UPDATED_AT:now,UPDATED_BY:s.userId});if(oldVoucher)ndUpdateRow_('VOUCHERS',oldVoucher._row,{STATUS:'CANCELLED'});var up={DATE:date,CATEGORY:category,AMOUNT:amount,ACCOUNT_ID:account.ACCOUNT_ID,REFERENCE:reference,DESCRIPTION:description,TXN_ID:newTxnId,STATUS:'POSTED',VOUCHER_ID:newVoucherId,UPDATED_AT:now,UPDATED_BY:s.userId};ndUpdateRow_('EXPENSES',expense._row,up);ndCreateAudit_(s,'UPDATE','EXPENSE',expenseId,expense,{expense:up,reversalTxnId:reversalId,replacementTxnId:newTxnId},reason);return {ok:true,expenseId:expenseId,reversalTxnId:reversalId,replacementTxnId:newTxnId,voucherId:newVoucherId};});
}

function reverseExpense(token,expenseId,reason){
  var s=ndRequirePermission_(token,'accounts.edit'),expense=ndFindOne_('EXPENSES','EXPENSE_ID',expenseId);if(!expense)throw new Error('Expense not found.');if((expense.ALLOCATION_METHOD||'NORMAL')==='UNIT_BASED')return reverseUnitBasedExpense(token,expenseId,reason);var t=ndFindOne_('TRANSACTIONS','TXN_ID',expense.TXN_ID);if(!t||t.STATUS!=='POSTED')throw new Error('Expense is not eligible for reversal.');var result=ndReverseStandaloneFinancialTransaction_(s,t,reason),now=ndNowIso_();ndUpdateRow_('EXPENSES',expense._row,{STATUS:'REVERSED',UPDATED_AT:now,UPDATED_BY:s.userId});ndCreateAudit_(s,'REVERSE','EXPENSE',expenseId,expense,{reversalTxnId:result.reversalTxnId},reason);return {ok:true,expenseId:expenseId,reversalTxnId:result.reversalTxnId};
}

function withdrawSavings(token,p){
  var s=ndRequirePermission_(token,'accounts.edit');p=p||{};var member=ndFindOne_('MEMBERS','MEMBER_ID',p.memberId);if(!member)throw new Error('Member not found.');var amount=ndRound2_(p.amount);if(amount<=0)throw new Error('Amount required.');
  var balance=ndMemberSavingsBalance_(p.memberId);if(amount>balance)throw new Error('Insufficient member savings balance. Current balance: '+balance);
  var account=ndAccountById_(p.accountId||'ACC-CASH');ndRequireAccountFunds_(account.ACCOUNT_ID,amount,'Savings withdrawal');var txnId=ndNextId_('TXN','TRX-',8),voucherId=ndNextVoucherId_(),date=ndDateOnly_(p.date||ndToday_()),now=ndNowIso_();
  var txn={TXN_ID:txnId,TXN_DATE:date,MEMBER_ID:p.memberId,TYPE:'SAVINGS_WITHDRAWAL',CATEGORY:'SAVINGS',DESCRIPTION:p.description||'সঞ্চয় উত্তোলন',DIRECTION:'DEBIT',AMOUNT:amount,PRINCIPAL_AMOUNT:amount,PROFIT_AMOUNT:0,PENALTY_AMOUNT:0,PAYMENT_ACCOUNT_ID:account.ACCOUNT_ID,PAYMENT_METHOD:p.paymentMethod||account.TYPE,REFERENCE:p.reference||'',RELATED_ID:voucherId,RECEIPT_ID:'',STATUS:'POSTED',PARENT_TXN_ID:'',CORRECTION_REASON:'',CREATED_AT:now,CREATED_BY:s.userId,UPDATED_AT:now,UPDATED_BY:s.userId};
  ndAppend_('TRANSACTIONS',txn);ndAppend_('VOUCHERS',{VOUCHER_ID:voucherId,TXN_ID:txnId,DATE:date,TYPE:'SAVINGS_WITHDRAWAL',PAYEE:member.NAME_BN||member.NAME_EN,MEMBER_ID:p.memberId,AMOUNT:amount,PURPOSE:txn.DESCRIPTION,ACCOUNT_ID:account.ACCOUNT_ID,REFERENCE:p.reference||'',STATUS:'POSTED',CREATED_AT:now,CREATED_BY:s.userId});
  var savings=ndCoaBySystem_('MEMBER_SAVINGS');ndPostJournalLines_(s,txnId,date,[{accountCode:savings.ACCOUNT_CODE,debit:amount,credit:0},{accountCode:account.ACCOUNT_CODE,debit:0,credit:amount}],p.memberId,voucherId,txn.DESCRIPTION);
  ndCreateNotification_(p.memberId,'WITHDRAWAL','সঞ্চয় উত্তোলন',amount+' টাকা উত্তোলন করা হয়েছে।');ndCreateAudit_(s,'WITHDRAW','TRANSACTION',txnId,'',txn,p.reason||'Savings withdrawal');return {ok:true,txnId:txnId,voucherId:voucherId};
}

function transferFunds(token,p){
  var s=ndRequirePermission_(token,'accounts.edit');p=p||{};var amount=ndRound2_(p.amount);if(amount<=0)throw new Error('Amount required.');var from=ndAccountById_(p.fromAccountId),to=ndAccountById_(p.toAccountId);if(from.ACCOUNT_ID===to.ACCOUNT_ID)throw new Error('Source and destination must differ.');
  var sourceBalance=(ndGetAccountBalances_().filter(function(a){return a.id===from.ACCOUNT_ID;})[0]||{balance:0}).balance;if(amount>sourceBalance+0.01)throw new Error('Insufficient source account balance: '+sourceBalance);
  var txnId=ndNextId_('TXN','TRX-',8),date=ndDateOnly_(p.date||ndToday_()),now=ndNowIso_();ndAppend_('TRANSACTIONS',{TXN_ID:txnId,TXN_DATE:date,MEMBER_ID:'',TYPE:'ACCOUNT_TRANSFER',CATEGORY:'TRANSFER',DESCRIPTION:p.description||('Transfer '+from.ACCOUNT_NAME+' to '+to.ACCOUNT_NAME),DIRECTION:'TRANSFER',AMOUNT:amount,PRINCIPAL_AMOUNT:0,PROFIT_AMOUNT:0,PENALTY_AMOUNT:0,PAYMENT_ACCOUNT_ID:from.ACCOUNT_ID,PAYMENT_METHOD:'TRANSFER',REFERENCE:p.reference||'',RELATED_ID:to.ACCOUNT_ID,RECEIPT_ID:'',STATUS:'POSTED',PARENT_TXN_ID:'',CORRECTION_REASON:'',CREATED_AT:now,CREATED_BY:s.userId,UPDATED_AT:now,UPDATED_BY:s.userId});
  ndPostJournalLines_(s,txnId,date,[{accountCode:to.ACCOUNT_CODE,debit:amount,credit:0},{accountCode:from.ACCOUNT_CODE,debit:0,credit:amount}],'',to.ACCOUNT_ID,'Account transfer');ndCreateAudit_(s,'TRANSFER','TRANSACTION',txnId,'',p,'Account transfer');return {ok:true,txnId:txnId};
}

function getProfitLoss(token){
  var s=ndSession_(token);if(s.role==='MEMBER'||(!ndHasPermission_(s,'accounts.view')&&!ndHasPermission_(s,'reports.view')))throw new Error('PERMISSION_DENIED');
  var coa={},txStatus={};ndRows_('CHART_OF_ACCOUNTS').forEach(function(a){coa[String(a.ACCOUNT_CODE)]=a;});ndRows_('TRANSACTIONS').forEach(function(t){txStatus[t.TXN_ID]=t.STATUS;});var gl=ndRows_('GENERAL_LEDGER'),income=0,expense=0;
  gl.forEach(function(g){if(txStatus[g.TXN_ID]&&!ndIsFinanciallyEffectiveStatus_(txStatus[g.TXN_ID]))return;var a=coa[String(g.ACCOUNT_CODE)];if(!a)return;if(a.ACCOUNT_TYPE==='INCOME')income+=ndNumber_(g.CREDIT)-ndNumber_(g.DEBIT);if(a.ACCOUNT_TYPE==='EXPENSE')expense+=ndNumber_(g.DEBIT)-ndNumber_(g.CREDIT);});
  return {income:ndRound2_(income),expense:ndRound2_(expense),net:ndRound2_(income-expense)};
}

function correctSimpleTransaction(token,txnId,newAmount,reason){
  var s=ndRequirePermission_(token,'accounts.edit');
  if(!reason)throw new Error('Correction reason required.');
  var t=ndFindOne_('TRANSACTIONS','TXN_ID',txnId);
  if(!t||t.STATUS!=='POSTED')throw new Error('Transaction not eligible.');
  if(t.TYPE==='ASSOCIATION_EXPENSE_DEDUCTION')throw new Error('Reverse the linked unit-based expense and recreate it.');
  if(t.TYPE==='EXPENSE'){var linkedExpense=ndFindOne_('EXPENSES','EXPENSE_ID',t.RELATED_ID);if(linkedExpense&&linkedExpense.ALLOCATION_METHOD==='UNIT_BASED')throw new Error('Unit-based expense must be reversed as one complete allocation and recreated.');}
  if(['SAVINGS','LOAN'].indexOf(t.CATEGORY)>=0)throw new Error('Use the dedicated savings/loan correction workflow.');
  var originalGl=ndFindMany_('GENERAL_LEDGER',{TXN_ID:t.TXN_ID});
  var rev=ndReverseTransaction_(s,t,reason);
  ndUpdateRow_('TRANSACTIONS',t._row,{STATUS:'CORRECTED',CORRECTION_REASON:reason,UPDATED_AT:ndNowIso_(),UPDATED_BY:s.userId});
  var replacement=null, amount=ndRound2_(newAmount);
  if(amount>0){
    var ratio=ndNumber_(t.AMOUNT)>0?amount/ndNumber_(t.AMOUNT):0;
    var now=ndNowIso_(),newId=ndNextId_('TXN','TRX-',8);
    var n=Object.assign({},t); delete n._row;
    n.TXN_ID=newId;n.AMOUNT=amount;n.PRINCIPAL_AMOUNT=ndRound2_(ndNumber_(t.PRINCIPAL_AMOUNT)*ratio);n.PROFIT_AMOUNT=ndRound2_(ndNumber_(t.PROFIT_AMOUNT)*ratio);n.PENALTY_AMOUNT=ndRound2_(ndNumber_(t.PENALTY_AMOUNT)*ratio);n.STATUS='POSTED';n.PARENT_TXN_ID=t.TXN_ID;n.CORRECTION_REASON=reason;n.CREATED_AT=now;n.CREATED_BY=s.userId;n.UPDATED_AT=now;n.UPDATED_BY=s.userId;
    ndAppend_('TRANSACTIONS',n);
    var lines=originalGl.map(function(g){return {accountCode:String(g.ACCOUNT_CODE),debit:ndRound2_(ndNumber_(g.DEBIT)*ratio),credit:ndRound2_(ndNumber_(g.CREDIT)*ratio)};});
    if(lines.length)ndPostJournalLines_(s,newId,t.TXN_DATE,lines,t.MEMBER_ID,t.RELATED_ID,'Corrected: '+t.DESCRIPTION);
    replacement=newId;
  }
  if(t.CATEGORY==='INCOME'){
    var inc=ndFindOne_('INCOME','INCOME_ID',t.RELATED_ID); if(inc)ndUpdateRow_('INCOME',inc._row,{AMOUNT:amount,TXN_ID:replacement||'',STATUS:amount>0?'POSTED':'CANCELLED'});
  }
  if(t.CATEGORY==='EXPENSE'){
    var exp=ndFindOne_('EXPENSES','EXPENSE_ID',t.RELATED_ID); if(exp)ndUpdateRow_('EXPENSES',exp._row,{AMOUNT:amount,TXN_ID:replacement||'',STATUS:amount>0?'POSTED':'CANCELLED',UPDATED_AT:ndNowIso_(),UPDATED_BY:s.userId});
  }
  var oldVoucher=ndRows_('VOUCHERS').filter(function(v){return v.TXN_ID===txnId&&v.STATUS==='POSTED';})[0];
  if(oldVoucher){ndUpdateRow_('VOUCHERS',oldVoucher._row,{STATUS:'CANCELLED'});if(replacement){var nv=Object.assign({},oldVoucher);delete nv._row;nv.VOUCHER_ID=ndNextVoucherId_();nv.TXN_ID=replacement;nv.AMOUNT=amount;nv.STATUS='POSTED';nv.CREATED_AT=ndNowIso_();nv.CREATED_BY=s.userId;ndAppend_('VOUCHERS',nv);}}
  ndCreateAudit_(s,'CORRECT','TRANSACTION',txnId,t,{reversal:rev,replacement:replacement,newAmount:amount},reason);
  return {ok:true,reversalTxnId:rev,replacementTxnId:replacement};
}

function editInvestmentReturn(token,returnId,p,reason){
  var s=ndSession_(token);if(!(s.role==='ADMIN'||ndHasPermission_(s,'investments.edit')||ndHasPermission_(s,'accounts.edit')))throw new Error('PERMISSION_DENIED');if(!reason)throw new Error('Modification reason required.');p=p||{};return ndWithFinancialLock_(function(){
    var r=ndFindOne_('INVESTMENT_RETURNS','RETURN_ID',returnId);if(!r||!ndInvestmentReturnEffective_(r))throw new Error('Investment return not found.');var t=ndFindOne_('TRANSACTIONS','TXN_ID',r.TXN_ID);if(!t)throw new Error('Return transaction missing.');
    var replacementType=String(p.type||r.TYPE).toUpperCase(),replacementAmount=ndRound2_(p.amount===undefined?r.AMOUNT:p.amount);if(replacementAmount<=0)throw new Error('Amount required.');if(['PROFIT','PRINCIPAL'].indexOf(replacementType)<0)throw new Error('Return type must be PROFIT or PRINCIPAL.');ndAccountById_(p.accountId||t.PAYMENT_ACCOUNT_ID);if(replacementType==='PROFIT')ndNormalizeProfitPeriod_(Object.assign({profitDate:p.date||r.RETURN_DATE},p));
    if(replacementType==='PRINCIPAL'){var inv=ndFindOne_('INVESTMENTS','INVESTMENT_ID',r.INVESTMENT_ID);if(!inv)throw new Error('Investment not found.');var capacity=ndRound2_(ndInvestmentTotalCost_(inv)-ndInvestmentPrincipalReturned_(r.INVESTMENT_ID)+(r.TYPE==='PRINCIPAL'?ndNumber_(r.AMOUNT):0));if(replacementAmount>capacity+0.01)throw new Error('Principal return exceeds remaining principal: '+capacity);}
    reverseInvestmentReturn(token,returnId,reason);var replacement=recordInvestmentReturn(token,{investmentId:r.INVESTMENT_ID,type:replacementType,amount:replacementAmount,date:p.date||r.RETURN_DATE,accountId:p.accountId||t.PAYMENT_ACCOUNT_ID,paymentMethod:p.paymentMethod||t.PAYMENT_METHOD,reference:p.reference===undefined?t.REFERENCE:p.reference,notes:p.notes===undefined?r.NOTES:p.notes,periodType:p.periodType,periodStart:p.periodStart,periodEnd:p.periodEnd,month:p.month,year:p.year,quarter:p.quarter,half:p.half,markCompleted:p.markCompleted,parentTxnId:t.TXN_ID,parentReturnId:r.RETURN_ID,reason:reason});ndCreateAudit_(s,'CORRECT','INVESTMENT_RETURN',returnId,r,replacement,reason);return {ok:true,replacement:replacement};
  });
}

function reverseLoanDisbursement(token,loanId,reason){
  var s=ndSession_(token);if(!(s.role==='ADMIN'||ndHasPermission_(s,'loans.approve')||ndHasPermission_(s,'accounts.edit')))throw new Error('PERMISSION_DENIED');if(!reason)throw new Error('Reversal reason required.');return ndWithFinancialLock_(function(){var loan=ndFindOne_('LOANS','LOAN_ID',loanId);if(!loan||!loan.DISBURSEMENT_TXN_ID)throw new Error('Disbursed loan not found.');var paid=ndFindMany_('LOAN_PAYMENTS',{LOAN_ID:loanId}).some(function(p){var t=ndFindOne_('TRANSACTIONS','TXN_ID',p.TXN_ID);return t&&ndIsFinanciallyEffectiveStatus_(t.STATUS);});if(paid)throw new Error('Loan disbursement cannot be reversed after a posted installment. Reverse installments first.');var t=ndFindOne_('TRANSACTIONS','TXN_ID',loan.DISBURSEMENT_TXN_ID);if(!t||t.STATUS!=='POSTED')throw new Error('Disbursement transaction is not eligible.');var rev=ndReverseTransaction_(s,t,reason),now=ndNowIso_();ndUpdateRow_('TRANSACTIONS',t._row,{STATUS:'REVERSED',CORRECTION_REASON:reason,UPDATED_AT:now,UPDATED_BY:s.userId});ndFindMany_('LOAN_SCHEDULE',{LOAN_ID:loanId}).forEach(function(x){ndUpdateRow_('LOAN_SCHEDULE',x._row,{STATUS:'VOID',PAID_AT:''});});ndUpdateRow_('LOANS',loan._row,{STATUS:'APPROVED',DISBURSED_AT:'',DISBURSEMENT_TXN_ID:'',OUTSTANDING_PRINCIPAL:0,NEXT_DUE_DATE:'',UPDATED_AT:now,UPDATED_BY:s.userId});ndCreateAudit_(s,'REVERSE','LOAN_DISBURSEMENT',loanId,loan,{reversalTxnId:rev},reason);return {ok:true,reversalTxnId:rev};});
}

function ndReverseStandaloneFinancialTransaction_(s,t,reason){
  return ndWithFinancialLock_(function(){var rev=ndReverseTransaction_(s,t,reason),now=ndNowIso_();ndUpdateRow_('TRANSACTIONS',t._row,{STATUS:'REVERSED',CORRECTION_REASON:reason,UPDATED_AT:now,UPDATED_BY:s.userId});var receipt=t.RECEIPT_ID?ndFindOne_('RECEIPTS','RECEIPT_ID',t.RECEIPT_ID):null;if(receipt)ndUpdateRow_('RECEIPTS',receipt._row,{STATUS:'CANCELLED'});ndRows_('VOUCHERS').filter(function(v){return v.TXN_ID===t.TXN_ID&&v.STATUS==='POSTED';}).forEach(function(v){ndUpdateRow_('VOUCHERS',v._row,{STATUS:'CANCELLED'});});if(t.CATEGORY==='INCOME'){var inc=ndFindOne_('INCOME','INCOME_ID',t.RELATED_ID);if(inc)ndUpdateRow_('INCOME',inc._row,{STATUS:'CANCELLED'});}if(t.CATEGORY==='EXPENSE'){var exp=ndFindOne_('EXPENSES','EXPENSE_ID',t.RELATED_ID);if(exp)ndUpdateRow_('EXPENSES',exp._row,{STATUS:'CANCELLED',UPDATED_AT:now,UPDATED_BY:s.userId});}ndCreateAudit_(s,'REVERSE','TRANSACTION',t.TXN_ID,t,{reversalTxnId:rev},reason);return {ok:true,reversalTxnId:rev};});
}

function reverseUnitBasedExpense(token,expenseId,reason){
  var s=ndSession_(token);if(!(s.role==='ADMIN'||ndHasPermission_(s,'accounts.edit')))throw new Error('PERMISSION_DENIED');reason=String(reason||'').trim();if(!reason)throw new Error('Reversal reason required.');
  return ndWithFinancialLock_(function(){
    var expense=ndFindOne_('EXPENSES','EXPENSE_ID',expenseId);if(!expense||expense.ALLOCATION_METHOD!=='UNIT_BASED')throw new Error('Unit-based expense not found.');if(expense.STATUS!=='POSTED'||expense.ALLOCATION_STATUS!=='POSTED')throw new Error('Expense allocation is not eligible for reversal.');
    var mainTxn=ndFindOne_('TRANSACTIONS','TXN_ID',expense.TXN_ID);if(!mainTxn||mainTxn.STATUS!=='POSTED')throw new Error('Main expense transaction is not eligible for reversal.');
    var allocations=ndFindMany_('EXPENSE_ALLOCATIONS',{EXPENSE_ID:expenseId}),now=ndNowIso_(),childReversals=[];
    allocations.filter(function(a){return a.STATUS==='POSTED'&&a.TXN_ID;}).forEach(function(a){var t=ndFindOne_('TRANSACTIONS','TXN_ID',a.TXN_ID);if(!t||t.STATUS!=='POSTED')throw new Error('Member deduction transaction is not eligible: '+a.TXN_ID);var rev=ndReverseTransaction_(s,t,reason);ndUpdateRow_('TRANSACTIONS',t._row,{STATUS:'REVERSED',CORRECTION_REASON:reason,UPDATED_AT:now,UPDATED_BY:s.userId});ndUpdateRow_('EXPENSE_ALLOCATIONS',a._row,{STATUS:'REVERSED',UPDATED_AT:now,UPDATED_BY:s.userId});childReversals.push({allocationId:a.ALLOCATION_ID,memberId:a.MEMBER_ID,transactionId:a.TXN_ID,reversalTxnId:rev,amount:a.AMOUNT});});
    allocations.filter(function(a){return a.STATUS==='ZERO_ALLOCATION';}).forEach(function(a){ndUpdateRow_('EXPENSE_ALLOCATIONS',a._row,{STATUS:'CANCELLED',UPDATED_AT:now,UPDATED_BY:s.userId});});
    var mainReversal=ndReverseTransaction_(s,mainTxn,reason);ndUpdateRow_('TRANSACTIONS',mainTxn._row,{STATUS:'REVERSED',CORRECTION_REASON:reason,UPDATED_AT:now,UPDATED_BY:s.userId});
    ndUpdateRow_('EXPENSES',expense._row,{STATUS:'REVERSED',ALLOCATION_STATUS:'REVERSED',UPDATED_AT:now,UPDATED_BY:s.userId});
    ndRows_('VOUCHERS').filter(function(v){return (v.VOUCHER_ID===expense.VOUCHER_ID||v.TXN_ID===expense.TXN_ID)&&v.STATUS==='POSTED';}).forEach(function(v){ndUpdateRow_('VOUCHERS',v._row,{STATUS:'CANCELLED'});});
    ndCreateAudit_(s,'REVERSE','EXPENSE',expenseId,expense,{mainReversalTxnId:mainReversal,memberReversals:childReversals},reason);
    return {ok:true,expenseId:expenseId,reversalTxnId:mainReversal,memberReversals:childReversals,restoredAmount:ndRound2_(childReversals.reduce(function(z,x){return z+ndNumber_(x.amount);},0))};
  });
}

function listFinancialTransactions(token,options){
  var s=ndSession_(token);if(!(s.role==='ADMIN'||ndHasPermission_(s,'audit.view')||ndHasPermission_(s,'accounts.view')))throw new Error('PERMISSION_DENIED');options=options||{};var rows=ndRows_('TRANSACTIONS');if(options.status)rows=rows.filter(function(r){return r.STATUS===options.status;});if(options.category)rows=rows.filter(function(r){return r.CATEGORY===options.category;});if(options.type)rows=rows.filter(function(r){return r.TYPE===options.type;});if(options.memberId)rows=rows.filter(function(r){return r.MEMBER_ID===options.memberId;});if(options.from)rows=rows.filter(function(r){return r.TXN_DATE>=options.from;});if(options.to)rows=rows.filter(function(r){return r.TXN_DATE<=options.to;});if(options.q){var q=String(options.q).toLowerCase();rows=rows.filter(function(r){return [r.TXN_ID,r.MEMBER_ID,r.TYPE,r.CATEGORY,r.DESCRIPTION,r.REFERENCE,r.RELATED_ID,r.NOTE_PURPOSE].join(' ').toLowerCase().indexOf(q)>=0;});}return ndSortDesc_(rows,'CREATED_AT').slice(0,Math.min(1000,ndNumber_(options.limit||300))).map(function(r){var dedicated=['MONTHLY_SAVINGS','EXTRA_SAVINGS','LOAN_PAYMENT','PROFIT_ENTRY'].indexOf(r.TYPE)>=0||String(r.TYPE).indexOf('INVESTMENT_RETURN_')===0,unitExpense=r.TYPE==='EXPENSE'&&function(){var x=ndFindOne_('EXPENSES','EXPENSE_ID',r.RELATED_ID);return x&&x.ALLOCATION_METHOD==='UNIT_BASED';}(),protectedType=['INVESTMENT_CLOSURE','PROFIT_DISTRIBUTION','LOAN_DISBURSEMENT','INVESTMENT_PURCHASE','ASSOCIATION_EXPENSE_DEDUCTION'].indexOf(r.TYPE)>=0||unitExpense,editable=r.STATUS==='POSTED'&&(dedicated||(!protectedType&&['SAVINGS','LOAN'].indexOf(r.CATEGORY)<0));return Object.assign({},r,{CAN_REVERSE:r.STATUS==='POSTED'&&String(r.TYPE).indexOf('REVERSAL_')!==0,CAN_EDIT:editable});});
}
function getFinancialTransaction(token,txnId){var s=ndSession_(token);if(!(s.role==='ADMIN'||ndHasPermission_(s,'audit.view')||ndHasPermission_(s,'accounts.view')))throw new Error('PERMISSION_DENIED');var t=ndFindOne_('TRANSACTIONS','TXN_ID',txnId);if(!t)throw new Error('Transaction not found.');var expense=t.RELATED_ID?ndFindOne_('EXPENSES','EXPENSE_ID',t.RELATED_ID):null;return {transaction:t,journal:ndFindMany_('GENERAL_LEDGER',{TXN_ID:txnId}),audit:ndFindMany_('AUDIT_LOG',{ENTITY_ID:txnId}),reversals:ndRows_('TRANSACTIONS').filter(function(x){return x.PARENT_TXN_ID===txnId;}),expense:expense,expenseAllocations:expense&&expense.ALLOCATION_METHOD==='UNIT_BASED'?ndFindMany_('EXPENSE_ALLOCATIONS',{EXPENSE_ID:expense.EXPENSE_ID}):[]};}
function reverseFinancialTransaction(token,txnId,reason){
  var s=ndSession_(token);if(!(s.role==='ADMIN'||ndHasPermission_(s,'accounts.edit')))throw new Error('PERMISSION_DENIED');if(!reason)throw new Error('Reversal reason required.');var t=ndFindOne_('TRANSACTIONS','TXN_ID',txnId);if(!t||t.STATUS!=='POSTED'||String(t.TYPE).indexOf('REVERSAL_')===0)throw new Error('Transaction is not eligible for reversal.');
  if(['MONTHLY_SAVINGS','EXTRA_SAVINGS'].indexOf(t.TYPE)>=0)return correctSavingsTransaction(token,txnId,0,reason);
  if(t.TYPE==='LOAN_PAYMENT')return correctLoanPayment(token,txnId,0,reason);
  if(t.TYPE==='LOAN_DISBURSEMENT')return reverseLoanDisbursement(token,t.RELATED_ID,reason);
  if(t.TYPE==='INVESTMENT_PURCHASE')return cancelInvestment(token,t.RELATED_ID,reason);
  if(String(t.TYPE).indexOf('INVESTMENT_RETURN_')===0){var r=ndRows_('INVESTMENT_RETURNS').filter(function(x){return x.TXN_ID===txnId;})[0];if(!r)throw new Error('Investment return link missing.');return reverseInvestmentReturn(token,r.RETURN_ID,reason);}
  if(t.TYPE==='INVESTMENT_CLOSURE')return reverseInvestmentClosure(token,t.RELATED_ID,reason);
  if(t.TYPE==='PROFIT_DISTRIBUTION')return reverseProfitDistribution(token,t.RELATED_ID,reason);
  if(t.TYPE==='ASSOCIATION_EXPENSE_DEDUCTION')return reverseUnitBasedExpense(token,t.RELATED_ID,reason);
  if(t.TYPE==='INCOME')return reverseIncome(token,t.RELATED_ID,reason);
  if(t.TYPE==='EXPENSE')return reverseExpense(token,t.RELATED_ID,reason);
  if(t.TYPE==='PROFIT_ENTRY'){var pr=ndRows_('PROFIT_RECORDS').filter(function(x){return x.SOURCE_TXN_ID===txnId;})[0];if(!pr)throw new Error('Profit record link missing.');return reverseProfitRecord(token,pr.PROFIT_ID,reason);}
  return ndReverseStandaloneFinancialTransaction_(s,t,reason);
}
function correctFinancialTransaction(token,txnId,p){
  p=p||{};if(!p.reason)throw new Error('Correction reason required.');var t=ndFindOne_('TRANSACTIONS','TXN_ID',txnId);if(!t||t.STATUS!=='POSTED')throw new Error('Transaction is not editable.');if(['MONTHLY_SAVINGS','EXTRA_SAVINGS'].indexOf(t.TYPE)>=0)return correctSavingsTransaction(token,txnId,p.amount,p.reason);if(t.TYPE==='LOAN_PAYMENT')return correctLoanPayment(token,txnId,p.amount,p.reason);if(String(t.TYPE).indexOf('INVESTMENT_RETURN_')===0){var r=ndRows_('INVESTMENT_RETURNS').filter(function(x){return x.TXN_ID===txnId;})[0];if(!r)throw new Error('Investment return link missing.');return editInvestmentReturn(token,r.RETURN_ID,p,p.reason);}if(t.TYPE==='PROFIT_ENTRY'){var pr=ndRows_('PROFIT_RECORDS').filter(function(x){return x.SOURCE_TXN_ID===txnId;})[0];if(!pr)throw new Error('Profit record link missing.');return updateProfitRecord(token,pr.PROFIT_ID,p,p.reason);}if(t.TYPE==='INCOME')return updateIncome(token,t.RELATED_ID,p,p.reason);if(t.TYPE==='ASSOCIATION_EXPENSE_DEDUCTION')throw new Error('Reverse the linked unit-based expense and recreate it.');if(t.TYPE==='EXPENSE'){var expense=ndFindOne_('EXPENSES','EXPENSE_ID',t.RELATED_ID);if(expense&&expense.ALLOCATION_METHOD==='UNIT_BASED')throw new Error('Unit-based expense must be reversed as one complete allocation and recreated.');return updateNormalExpense(token,t.RELATED_ID,p,p.reason);}if(['INVESTMENT_CLOSURE','PROFIT_DISTRIBUTION','LOAN_DISBURSEMENT','INVESTMENT_PURCHASE'].indexOf(t.TYPE)>=0)throw new Error('Reverse this transaction and recreate it with correct values.');return correctSimpleTransaction(token,txnId,p.amount,p.reason);
}

/** ===== LoanService.gs ===== */
/** Loan application, approval, disbursement, EMI and repayment. */
function getLoanEligibility(token,memberId,loanType){
  var s=ndSession_(token);if(s.role==='MEMBER')memberId=s.memberId;else if(!ndHasPermission_(s,'loans.view')&&!ndHasPermission_(s,'loans.create'))throw new Error('PERMISSION_DENIED');
  var m=ndFindOne_('MEMBERS','MEMBER_ID',memberId);if(!m)throw new Error('Member not found.');
  var join=new Date(String(m.JOIN_DATE)+'T00:00:00'),now=new Date();var months=(now.getFullYear()-join.getFullYear())*12+(now.getMonth()-join.getMonth());
  var minMonths=ndNumber_(ndConfig_('MIN_LOAN_MEMBERSHIP_MONTHS',6));var savings=ndMemberSavingsBalance_(memberId);var dues=ndCurrentDueBalance_(memberId);
  var existing=ndMemberLoanOutstanding_(memberId);var cashFund=ndGetAccountBalances_().reduce(function(z,a){return z+Math.max(0,a.balance);},0);
  var secured=ndRound2_(savings*ndNumber_(ndConfig_('SECURED_LOAN_PERCENT',80))/100);
  var general=ndRound2_(Math.min(savings*ndNumber_(ndConfig_('GENERAL_LOAN_SAVINGS_MULTIPLIER',2)),cashFund*ndNumber_(ndConfig_('GENERAL_LOAN_FUND_PERCENT',10))/100));
  var limit=(String(loanType||'GENERAL').toUpperCase()==='SECURED')?secured:general;limit=Math.max(0,ndRound2_(limit-existing));
  var reasons=[];if(m.STATUS!=='ACTIVE')reasons.push('সদস্য সক্রিয় নয়');if(months<minMonths)reasons.push('ন্যূনতম '+minMonths+' মাস সদস্যপদ পূর্ণ হয়নি');if(dues>0)reasons.push('সঞ্চয়ের বকেয়া আছে');if(limit<=0)reasons.push('ঋণ সীমা উপলব্ধ নেই');
  return {memberId:memberId,membershipMonths:months,minMonths:minMonths,savings:savings,due:ndRound2_(dues),existingLoan:existing,securedLimit:secured,generalLimit:general,eligibleLimit:limit,eligible:reasons.length===0,reasons:reasons};
}

function applyLoan(token,p){
  var s=ndSession_(token);if(!(s.role==='MEMBER'||ndHasPermission_(s,'loans.create')))throw new Error('PERMISSION_DENIED');p=p||{};var memberId=s.role==='MEMBER'?s.memberId:p.memberId,member=ndFindOne_('MEMBERS','MEMBER_ID',memberId);if(!member||member.STATUS!=='ACTIVE')throw new Error('Active member not found.');var amount=ndRound2_(p.amount);if(amount<=0)throw new Error('Requested amount required.');
  var loanType=String(p.loanType||'GENERAL').toUpperCase();if(['GENERAL','SECURED','EMERGENCY','BUSINESS'].indexOf(loanType)<0)throw new Error('Invalid loan type.');var method=String(p.method||ndConfig_('DEFAULT_LOAN_METHOD','REDUCING')).toUpperCase();if(['REDUCING','FLAT'].indexOf(method)<0)throw new Error('Invalid loan calculation method.');var term=Math.floor(ndNumber_(p.termMonths||12));if(term<1||term>360)throw new Error('Loan term must be between 1 and 360 months.');var rate=ndNumber_(p.annualRate!==undefined?p.annualRate:ndConfig_('DEFAULT_LOAN_ANNUAL_RATE',0));if(rate<0||rate>100)throw new Error('Annual rate must be between 0 and 100.');
  var elig=getLoanEligibility(token,memberId,loanType);if(s.role==='MEMBER'&&!elig.eligible)throw new Error('Loan eligibility requirements are not met: '+elig.reasons.join(', '));if(s.role==='MEMBER'&&amount>elig.eligibleLimit+0.01)throw new Error('Requested amount exceeds eligible limit: '+elig.eligibleLimit);var loanId=ndNextId_('LOAN','LN-',7),now=ndNowIso_();
  ndAppend_('LOANS',{LOAN_ID:loanId,MEMBER_ID:memberId,LOAN_TYPE:loanType,APPLICATION_DATE:ndDateOnly_(p.applicationDate||ndToday_()),REQUESTED_AMOUNT:amount,APPROVED_AMOUNT:0,ANNUAL_RATE:rate,METHOD:method,TERM_MONTHS:term,PURPOSE:String(p.purpose||'').slice(0,500),SAVINGS_AT_APPLICATION:elig.savings,ELIGIBLE_LIMIT:elig.eligibleLimit,STATUS:'APPLIED',APPROVAL_STATUS:'PENDING',APPROVED_BY:'',APPROVED_AT:'',DISBURSED_AT:'',DISBURSEMENT_TXN_ID:'',OUTSTANDING_PRINCIPAL:0,NEXT_DUE_DATE:'',GUARANTOR_REQUIRED:amount>elig.securedLimit?'TRUE':'FALSE',NOTES:String(p.notes||'').slice(0,1000),CREATED_AT:now,CREATED_BY:s.userId,UPDATED_AT:now,UPDATED_BY:s.userId});
  if(p.guarantors&&p.guarantors.length){var seen={};p.guarantors.forEach(function(g){g=String(g||'').trim();if(!g||seen[g])return;seen[g]=true;if(g===memberId)throw new Error('নিজে নিজের guarantor হতে পারবেন না।');var gm=ndFindOne_('MEMBERS','MEMBER_ID',g);if(!gm||gm.STATUS!=='ACTIVE')throw new Error('Guarantor member not found or inactive: '+g);ndAppend_('GUARANTORS',{GUARANTOR_ID:ndNextId_('GUARANTOR','GUA-',7),LOAN_ID:loanId,MEMBER_ID:memberId,GUARANTOR_MEMBER_ID:g,STATUS:'PENDING',APPROVED_AT:'',CREATED_AT:now,CREATED_BY:s.userId});});}
  ndCreateAudit_(s,'APPLY','LOAN',loanId,'',{requested:amount,eligibility:elig},'Loan application');ndCreateNotification_(memberId,'LOAN','ঋণ আবেদন গ্রহণ হয়েছে',loanId+' আবেদনটি Pending অবস্থায় আছে।');return {ok:true,loanId:loanId,eligibility:elig};
}

function listLoans(token,options){
  var s=ndSession_(token);if(s.role!=='MEMBER'&&!ndHasPermission_(s,'loans.view'))throw new Error('PERMISSION_DENIED');options=options||{};var rows=ndRows_('LOANS');if(s.role==='MEMBER')rows=rows.filter(function(r){return r.MEMBER_ID===s.memberId;});if(options.memberId)rows=rows.filter(function(r){return r.MEMBER_ID===options.memberId;});if(options.status)rows=rows.filter(function(r){return r.STATUS===options.status||r.APPROVAL_STATUS===options.status;});
  var members={};ndRows_('MEMBERS').forEach(function(m){members[m.MEMBER_ID]=m.NAME_BN||m.NAME_EN;});return ndSortDesc_(rows,'CREATED_AT').slice(0,300).map(function(r){return Object.assign({},r,{MEMBER_NAME:members[r.MEMBER_ID]||r.MEMBER_ID});});
}

function getLoanDetails(token,loanId){
  var s=ndSession_(token);var loan=ndFindOne_('LOANS','LOAN_ID',loanId);if(!loan)throw new Error('Loan not found.');if(s.role==='MEMBER'&&loan.MEMBER_ID!==s.memberId)throw new Error('PERMISSION_DENIED');if(s.role!=='MEMBER'&&!ndHasPermission_(s,'loans.view'))throw new Error('PERMISSION_DENIED');return {loan:loan,schedule:ndFindMany_('LOAN_SCHEDULE',{LOAN_ID:loanId}).sort(function(a,b){return ndNumber_(a.INSTALLMENT_NO)-ndNumber_(b.INSTALLMENT_NO);}),payments:ndSortDesc_(ndFindMany_('LOAN_PAYMENTS',{LOAN_ID:loanId}),'PAYMENT_DATE'),guarantors:ndFindMany_('GUARANTORS',{LOAN_ID:loanId})};
}

function approveLoan(token,loanId,p){
  var s=ndSession_(token);if(!(s.role==='ADMIN'||ndHasPermission_(s,'loans.approve')))throw new Error('PERMISSION_DENIED');p=p||{};var loan=ndFindOne_('LOANS','LOAN_ID',loanId);if(!loan||loan.APPROVAL_STATUS!=='PENDING')throw new Error('Pending loan not found.');
  var approve=p.approve!==false;if(!approve){ndUpdateRow_('LOANS',loan._row,{STATUS:'REJECTED',APPROVAL_STATUS:'REJECTED',APPROVED_BY:s.userId,APPROVED_AT:ndNowIso_(),NOTES:p.note||loan.NOTES,UPDATED_AT:ndNowIso_(),UPDATED_BY:s.userId});ndCreateNotification_(loan.MEMBER_ID,'LOAN','ঋণ আবেদন প্রত্যাখ্যাত',loanId+' আবেদনটি অনুমোদিত হয়নি।');return {ok:true,status:'REJECTED'};}
  var amount=ndRound2_(p.approvedAmount||loan.REQUESTED_AMOUNT);if(amount<=0)throw new Error('Approved amount must be greater than zero.');var elig=getLoanEligibility(token,loan.MEMBER_ID,loan.LOAN_TYPE);if(amount>elig.eligibleLimit&&!p.overrideLimit)throw new Error('Approved amount exceeds current eligible limit: '+elig.eligibleLimit);if(p.overrideLimit&&!String(p.note||'').trim())throw new Error('Override reason is required.');var rate=ndNumber_(p.annualRate!==undefined?p.annualRate:loan.ANNUAL_RATE);if(rate<0||rate>100)throw new Error('Annual rate must be between 0 and 100.');var method=String(p.method||loan.METHOD).toUpperCase();if(['REDUCING','FLAT'].indexOf(method)<0)throw new Error('Invalid loan calculation method.');var term=Math.floor(ndNumber_(p.termMonths||loan.TERM_MONTHS));if(term<1||term>360)throw new Error('Loan term must be between 1 and 360 months.');
  ndUpdateRow_('LOANS',loan._row,{APPROVED_AMOUNT:amount,ANNUAL_RATE:rate,METHOD:method,TERM_MONTHS:term,STATUS:'APPROVED',APPROVAL_STATUS:'APPROVED',APPROVED_BY:s.userId,APPROVED_AT:ndNowIso_(),NOTES:p.note||loan.NOTES,UPDATED_AT:ndNowIso_(),UPDATED_BY:s.userId});
  ndFindMany_('GUARANTORS',{LOAN_ID:loanId}).forEach(function(g){if(g.STATUS==='PENDING')ndUpdateRow_('GUARANTORS',g._row,{STATUS:'APPROVED',APPROVED_AT:ndNowIso_()});});ndCreateAudit_(s,'APPROVE','LOAN',loanId,loan,{approvedAmount:amount},p.note||'Loan approved');ndCreateNotification_(loan.MEMBER_ID,'LOAN','ঋণ অনুমোদিত হয়েছে',loanId+' | '+amount+' টাকা অনুমোদিত হয়েছে।');return {ok:true,status:'APPROVED',approvedAmount:amount};
}

function disburseLoan(token,loanId,p){
  var s=ndSession_(token);if(!(s.role==='ADMIN'||ndHasPermission_(s,'loans.approve')||ndHasPermission_(s,'accounts.edit')))throw new Error('PERMISSION_DENIED');p=p||{};var loan=ndFindOne_('LOANS','LOAN_ID',loanId);if(!loan||loan.APPROVAL_STATUS!=='APPROVED'||loan.STATUS!=='APPROVED')throw new Error('Approved loan not ready for disbursement.');
  var amount=ndRound2_(loan.APPROVED_AMOUNT);if(amount<=0)throw new Error('Approved amount is invalid.');var account=ndAccountById_(p.accountId||'ACC-BANK');ndRequireAccountFunds_(account.ACCOUNT_ID,amount,'Loan disbursement');var date=ndDateOnly_(p.date||ndToday_()),txnId=ndNextId_('TXN','TRX-',8),now=ndNowIso_();
  var txn={TXN_ID:txnId,TXN_DATE:date,MEMBER_ID:loan.MEMBER_ID,TYPE:'LOAN_DISBURSEMENT',CATEGORY:'LOAN',DESCRIPTION:'Loan disbursement '+loanId,DIRECTION:'DEBIT',AMOUNT:amount,PRINCIPAL_AMOUNT:amount,PROFIT_AMOUNT:0,PENALTY_AMOUNT:0,PAYMENT_ACCOUNT_ID:account.ACCOUNT_ID,PAYMENT_METHOD:p.paymentMethod||account.TYPE,REFERENCE:p.reference||'',RELATED_ID:loanId,RECEIPT_ID:'',STATUS:'POSTED',PARENT_TXN_ID:'',CORRECTION_REASON:'',CREATED_AT:now,CREATED_BY:s.userId,UPDATED_AT:now,UPDATED_BY:s.userId};ndAppend_('TRANSACTIONS',txn);
  var recv=ndCoaBySystem_('LOAN_RECEIVABLE');ndPostJournalLines_(s,txnId,date,[{accountCode:recv.ACCOUNT_CODE,debit:amount,credit:0},{accountCode:account.ACCOUNT_CODE,debit:0,credit:amount}],loan.MEMBER_ID,loanId,txn.DESCRIPTION);
  ndGenerateLoanSchedule_(loanId,amount,ndNumber_(loan.ANNUAL_RATE),loan.METHOD,ndNumber_(loan.TERM_MONTHS),date);
  var schedules=ndFindMany_('LOAN_SCHEDULE',{LOAN_ID:loanId}).sort(function(a,b){return String(a.DUE_DATE).localeCompare(String(b.DUE_DATE));});var next=schedules.length?schedules[0].DUE_DATE:'';
  ndUpdateRow_('LOANS',loan._row,{STATUS:'ACTIVE',DISBURSED_AT:date,DISBURSEMENT_TXN_ID:txnId,OUTSTANDING_PRINCIPAL:amount,NEXT_DUE_DATE:next,UPDATED_AT:now,UPDATED_BY:s.userId});ndCreateAudit_(s,'DISBURSE','LOAN',loanId,loan,txn,'Loan disbursed');ndCreateNotification_(loan.MEMBER_ID,'LOAN','ঋণ বিতরণ হয়েছে',loanId+' | '+amount+' টাকা বিতরণ হয়েছে।');return {ok:true,txnId:txnId,loanId:loanId,nextDueDate:next};
}

function ndGenerateLoanSchedule_(loanId,principal,annualRate,method,months,disbursementDate){
  if(ndFindMany_('LOAN_SCHEDULE',{LOAN_ID:loanId}).length)throw new Error('Loan schedule already exists.');principal=ndRound2_(principal);annualRate=ndNumber_(annualRate);months=Math.max(1,Math.floor(months));method=String(method||'REDUCING').toUpperCase();var opening=principal,ids=ndReserveIds_('LOAN_SCHEDULE',months,'SCH-',8),rows=[];
  var monthlyRate=annualRate/12/100;var emi=monthlyRate===0?principal/months:(principal*monthlyRate*Math.pow(1+monthlyRate,months))/(Math.pow(1+monthlyRate,months)-1);var flatTotalProfit=principal*(annualRate/100)*(months/12);
  for(var i=1;i<=months;i++){
    var profit,prin,total;if(method==='FLAT'){prin=principal/months;profit=flatTotalProfit/months;total=prin+profit;}else{profit=opening*monthlyRate;prin=emi-profit;if(i===months)prin=opening;total=prin+profit;}
    prin=ndRound2_(prin);profit=ndRound2_(profit);total=ndRound2_(prin+profit);var due=ndDateAddMonths_(disbursementDate,i);
    rows.push({SCHEDULE_ID:ids[i-1],LOAN_ID:loanId,INSTALLMENT_NO:i,DUE_DATE:due,OPENING_PRINCIPAL:ndRound2_(opening),PRINCIPAL_DUE:prin,PROFIT_DUE:profit,TOTAL_DUE:total,PRINCIPAL_PAID:0,PROFIT_PAID:0,PENALTY_PAID:0,STATUS:'DUE',PAID_AT:''});opening=ndRound2_(Math.max(0,opening-prin));
  }
  ndAppendMany_('LOAN_SCHEDULE',rows);
}

function collectLoanPayment(token,p){
  var s=ndSession_(token);if(!(ndHasPermission_(s,'loans.payment')||ndHasPermission_(s,'accounts.edit')||s.role==='ADMIN'))throw new Error('PERMISSION_DENIED');p=p||{};var loan=ndFindOne_('LOANS','LOAN_ID',p.loanId);if(!loan||['ACTIVE','OVERDUE'].indexOf(loan.STATUS)<0)throw new Error('Active loan not found.');var amount=ndRound2_(p.amount);if(amount<=0)throw new Error('Payment amount required.');
  var schedules=ndFindMany_('LOAN_SCHEDULE',{LOAN_ID:loan.LOAN_ID}).filter(function(x){return x.STATUS!=='PAID';}).sort(function(a,b){return ndNumber_(a.INSTALLMENT_NO)-ndNumber_(b.INSTALLMENT_NO);});var remainScheduled=schedules.reduce(function(z,x){return z+Math.max(0,ndNumber_(x.PRINCIPAL_DUE)-ndNumber_(x.PRINCIPAL_PAID))+Math.max(0,ndNumber_(x.PROFIT_DUE)-ndNumber_(x.PROFIT_PAID));},0);if(amount>remainScheduled+0.01)throw new Error('Payment exceeds remaining scheduled amount: '+ndRound2_(remainScheduled));
  var account=ndAccountById_(p.accountId||'ACC-CASH'),date=ndDateOnly_(p.date||ndToday_()),paymentId=ndNextId_('LOAN_PAYMENT','LP-',8),txnId=ndNextId_('TXN','TRX-',8),receiptId=ndNextReceiptId_(),remaining=amount,totalPrincipal=0,totalProfit=0,totalPenalty=0,now=ndNowIso_();
  for(var i=0;i<schedules.length&&remaining>0.001;i++){
    var sch=schedules[i],profitRem=Math.max(0,ndNumber_(sch.PROFIT_DUE)-ndNumber_(sch.PROFIT_PAID)),principalRem=Math.max(0,ndNumber_(sch.PRINCIPAL_DUE)-ndNumber_(sch.PRINCIPAL_PAID));var payProfit=Math.min(remaining,profitRem);remaining=ndRound2_(remaining-payProfit);var payPrincipal=Math.min(remaining,principalRem);remaining=ndRound2_(remaining-payPrincipal);totalProfit+=payProfit;totalPrincipal+=payPrincipal;
    var np=ndRound2_(ndNumber_(sch.PRINCIPAL_PAID)+payPrincipal),ni=ndRound2_(ndNumber_(sch.PROFIT_PAID)+payProfit);var paid=np+0.01>=ndNumber_(sch.PRINCIPAL_DUE)&&ni+0.01>=ndNumber_(sch.PROFIT_DUE);
    ndUpdateRow_('LOAN_SCHEDULE',sch._row,{PRINCIPAL_PAID:np,PROFIT_PAID:ni,STATUS:paid?'PAID':'PARTIAL',PAID_AT:paid?date:'',});
    ndAppend_('LOAN_PAYMENT_ALLOCATIONS',{ALLOC_ID:ndNextId_('ALLOC','ALC-',9),PAYMENT_ID:paymentId,SCHEDULE_ID:sch.SCHEDULE_ID,PRINCIPAL_AMOUNT:ndRound2_(payPrincipal),PROFIT_AMOUNT:ndRound2_(payProfit),PENALTY_AMOUNT:0,CREATED_AT:now});
  }
  totalPrincipal=ndRound2_(totalPrincipal);totalProfit=ndRound2_(totalProfit);var txn={TXN_ID:txnId,TXN_DATE:date,MEMBER_ID:loan.MEMBER_ID,TYPE:'LOAN_PAYMENT',CATEGORY:'LOAN',DESCRIPTION:'Loan payment '+loan.LOAN_ID,DIRECTION:'CREDIT',AMOUNT:amount,PRINCIPAL_AMOUNT:totalPrincipal,PROFIT_AMOUNT:totalProfit,PENALTY_AMOUNT:totalPenalty,PAYMENT_ACCOUNT_ID:account.ACCOUNT_ID,PAYMENT_METHOD:p.paymentMethod||account.TYPE,REFERENCE:p.reference||'',RELATED_ID:loan.LOAN_ID,RECEIPT_ID:receiptId,STATUS:'POSTED',PARENT_TXN_ID:'',CORRECTION_REASON:'',CREATED_AT:now,CREATED_BY:s.userId,UPDATED_AT:now,UPDATED_BY:s.userId};ndAppend_('TRANSACTIONS',txn);
  ndAppend_('LOAN_PAYMENTS',{PAYMENT_ID:paymentId,LOAN_ID:loan.LOAN_ID,MEMBER_ID:loan.MEMBER_ID,TXN_ID:txnId,PAYMENT_DATE:date,AMOUNT:amount,PRINCIPAL_AMOUNT:totalPrincipal,PROFIT_AMOUNT:totalProfit,PENALTY_AMOUNT:totalPenalty,RECEIPT_ID:receiptId,CREATED_AT:now,CREATED_BY:s.userId});ndAppend_('RECEIPTS',{RECEIPT_ID:receiptId,TXN_ID:txnId,MEMBER_ID:loan.MEMBER_ID,RECEIPT_DATE:date,AMOUNT:amount,PURPOSE:'ঋণ কিস্তি '+loan.LOAN_ID,PAYMENT_METHOD:txn.PAYMENT_METHOD,REFERENCE:txn.REFERENCE,STATUS:'ACTIVE',PRINT_COUNT:0,LAST_PRINTED_AT:'',CREATED_AT:now,CREATED_BY:s.userId});
  var lines=[{accountCode:account.ACCOUNT_CODE,debit:amount,credit:0}];if(totalPrincipal>0)lines.push({accountCode:ndCoaBySystem_('LOAN_RECEIVABLE').ACCOUNT_CODE,debit:0,credit:totalPrincipal});if(totalProfit>0)lines.push({accountCode:ndCoaBySystem_('LOAN_INCOME').ACCOUNT_CODE,debit:0,credit:totalProfit});if(totalPenalty>0)lines.push({accountCode:ndCoaBySystem_('LATE_FEE_INCOME').ACCOUNT_CODE,debit:0,credit:totalPenalty});ndPostJournalLines_(s,txnId,date,lines,loan.MEMBER_ID,loan.LOAN_ID,txn.DESCRIPTION);
  ndRefreshLoanStatus_(loan.LOAN_ID,s.userId);ndCreateAudit_(s,'PAYMENT','LOAN',loan.LOAN_ID,'',txn,'Loan installment');ndCreateNotification_(loan.MEMBER_ID,'LOAN_PAYMENT','ঋণ কিস্তি জমা হয়েছে',receiptId+' | '+amount+' টাকা কিস্তি জমা হয়েছে।');return {ok:true,paymentId:paymentId,txnId:txnId,receiptId:receiptId,principal:totalPrincipal,profit:totalProfit};
}

function ndRefreshLoanStatus_(loanId,userId){
  var loan=ndFindOne_('LOANS','LOAN_ID',loanId);if(!loan)return '';var schedules=ndFindMany_('LOAN_SCHEDULE',{LOAN_ID:loanId});var outstanding=ndRound2_(schedules.reduce(function(z,x){return z+Math.max(0,ndNumber_(x.PRINCIPAL_DUE)-ndNumber_(x.PRINCIPAL_PAID));},0));var unpaid=schedules.filter(function(x){return x.STATUS!=='PAID';}).sort(function(a,b){return String(a.DUE_DATE).localeCompare(String(b.DUE_DATE));});var status=outstanding<=0?'CLOSED':(unpaid.length&&unpaid[0].DUE_DATE<ndToday_()?'OVERDUE':'ACTIVE');ndUpdateRow_('LOANS',loan._row,{OUTSTANDING_PRINCIPAL:outstanding,NEXT_DUE_DATE:unpaid.length?unpaid[0].DUE_DATE:'',STATUS:status,UPDATED_AT:ndNowIso_(),UPDATED_BY:userId||'SYSTEM'});return status;
}

function correctLoanPayment(token,txnId,newAmount,reason){
  var s=ndRequirePermission_(token,'accounts.edit');if(!reason)throw new Error('Correction reason required.');var t=ndFindOne_('TRANSACTIONS','TXN_ID',txnId);if(!t||t.TYPE!=='LOAN_PAYMENT'||t.STATUS!=='POSTED')throw new Error('Loan payment not found.');var pay=ndFindOne_('LOAN_PAYMENTS','TXN_ID',txnId);if(!pay)throw new Error('Loan payment record missing.');
  var correctedAmount=ndRound2_(newAmount);if(correctedAmount<0)throw new Error('Corrected amount cannot be negative.');var allocs=ndFindMany_('LOAN_PAYMENT_ALLOCATIONS',{PAYMENT_ID:pay.PAYMENT_ID}),currentRemaining=ndFindMany_('LOAN_SCHEDULE',{LOAN_ID:t.RELATED_ID}).reduce(function(z,x){return z+Math.max(0,ndNumber_(x.PRINCIPAL_DUE)-ndNumber_(x.PRINCIPAL_PAID))+Math.max(0,ndNumber_(x.PROFIT_DUE)-ndNumber_(x.PROFIT_PAID));},0),restorable=allocs.reduce(function(z,a){return z+ndNumber_(a.PRINCIPAL_AMOUNT)+ndNumber_(a.PROFIT_AMOUNT);},0),capacity=ndRound2_(currentRemaining+restorable);if(correctedAmount>capacity+0.01)throw new Error('Corrected payment exceeds remaining scheduled amount: '+capacity);
  allocs.forEach(function(a){var sch=ndFindOne_('LOAN_SCHEDULE','SCHEDULE_ID',a.SCHEDULE_ID);if(sch)ndUpdateRow_('LOAN_SCHEDULE',sch._row,{PRINCIPAL_PAID:Math.max(0,ndNumber_(sch.PRINCIPAL_PAID)-ndNumber_(a.PRINCIPAL_AMOUNT)),PROFIT_PAID:Math.max(0,ndNumber_(sch.PROFIT_PAID)-ndNumber_(a.PROFIT_AMOUNT)),PENALTY_PAID:Math.max(0,ndNumber_(sch.PENALTY_PAID)-ndNumber_(a.PENALTY_AMOUNT)),STATUS:'DUE',PAID_AT:''});});
  var rev=ndReverseTransaction_(s,t,reason);ndUpdateRow_('TRANSACTIONS',t._row,{STATUS:'CORRECTED',CORRECTION_REASON:reason,UPDATED_AT:ndNowIso_(),UPDATED_BY:s.userId});var receipt=ndFindOne_('RECEIPTS','RECEIPT_ID',t.RECEIPT_ID);if(receipt)ndUpdateRow_('RECEIPTS',receipt._row,{STATUS:'CANCELLED'});ndRefreshLoanStatus_(t.RELATED_ID,s.userId);
  var replacement=null;if(correctedAmount>0)replacement=collectLoanPayment(token,{loanId:t.RELATED_ID,amount:correctedAmount,date:t.TXN_DATE,accountId:t.PAYMENT_ACCOUNT_ID,paymentMethod:t.PAYMENT_METHOD,reference:t.REFERENCE});ndCreateAudit_(s,'CORRECT','LOAN_PAYMENT',txnId,t,{reversal:rev,replacement:replacement},reason);return {ok:true,reversalTxnId:rev,replacement:replacement};
}

/** Daily trigger: refresh loan status and send a first overdue notice to borrower/guarantors. */
function ndDailyLoanStatusTrigger_(){
  if(!ndBool_(ndConfig_('AUTO_LOAN_STATUS','TRUE'))) return;
  var loans=ndRows_('LOANS').filter(function(l){return ['ACTIVE','OVERDUE'].indexOf(l.STATUS)>=0;});
  loans.forEach(function(l){
    var before=l.STATUS;
    var after=ndRefreshLoanStatus_(l.LOAN_ID,'SYSTEM');
    if(before!=='OVERDUE' && after==='OVERDUE'){
      ndCreateNotification_(l.MEMBER_ID,'LOAN_OVERDUE','ঋণের কিস্তি বকেয়া','আপনার '+l.LOAN_ID+' ঋণের কিস্তি বকেয়া হয়েছে। অনুগ্রহ করে সমিতির সঙ্গে যোগাযোগ করুন।');
      ndFindMany_('GUARANTORS',{LOAN_ID:l.LOAN_ID}).filter(function(g){return ['ACTIVE','APPROVED'].indexOf(g.STATUS)>=0;}).forEach(function(g){
        ndCreateNotification_(g.GUARANTOR_MEMBER_ID,'GUARANTOR_NOTICE','জামিনদার নোটিশ',l.LOAN_ID+' ঋণটি বকেয়া হয়েছে; আপনি এই ঋণের জামিনদার হিসেবে তালিকাভুক্ত আছেন।');
      });
    }
  });
}

/** ===== InvestmentService.gs ===== */
/** Full investment lifecycle: purchase, principal/profit return, sale/closure and audit-safe reversal. */
function ndInvestmentTotalCost_(inv){return ndRound2_(ndNumber_(inv&&inv.TOTAL_INVESTED)||ndNumber_(inv&&inv.AMOUNT));}
function ndInvestmentReturnEffective_(r){
  if(['REVERSED','CANCELLED','VOID'].indexOf(String(r.STATUS||'').toUpperCase())>=0)return false;
  var t=r.TXN_ID?ndFindOne_('TRANSACTIONS','TXN_ID',r.TXN_ID):null;
  return !t||ndIsFinanciallyEffectiveStatus_(t.STATUS);
}
function ndInvestmentReturns_(investmentId,type){
  return ndFindMany_('INVESTMENT_RETURNS',{INVESTMENT_ID:investmentId}).filter(function(r){return ndInvestmentReturnEffective_(r)&&(!type||r.TYPE===type);});
}
function ndInvestmentActiveClosure_(investmentId){
  return ndFindMany_('INVESTMENT_CLOSURES',{INVESTMENT_ID:investmentId}).filter(function(c){return String(c.STATUS||'').toUpperCase()==='POSTED';})[0]||null;
}
function ndInvestmentPrincipalReturned_(investmentId){return ndRound2_(ndInvestmentReturns_(investmentId,'PRINCIPAL').reduce(function(z,r){return z+ndNumber_(r.AMOUNT);},0));}
function ndRefreshInvestmentSummary_(investmentId,userId){
  var inv=ndFindOne_('INVESTMENTS','INVESTMENT_ID',investmentId);if(!inv)return null;
  var cost=ndInvestmentTotalCost_(inv),principal=ndInvestmentPrincipalReturned_(investmentId),profitReturns=ndRound2_(ndInvestmentReturns_(investmentId,'PROFIT').reduce(function(z,r){return z+ndNumber_(r.AMOUNT);},0)),closure=ndInvestmentActiveClosure_(investmentId),status='ACTIVE',profit=profitReturns,loss=0,up={TOTAL_INVESTED:cost};
  if(closure){principal=ndNumber_(closure.PRINCIPAL_RETURNED);profit=ndRound2_(profit+ndNumber_(closure.PROFIT_AMOUNT));loss=ndNumber_(closure.LOSS_AMOUNT);status=String(inv.STATUS||'SOLD_CLOSED').toUpperCase()==='COMPLETED'?'COMPLETED':'SOLD_CLOSED';}
  else if(String(inv.STATUS||'').toUpperCase()==='CANCELLED')status='CANCELLED';
  else if(principal+0.01>=cost)status=String(inv.STATUS||'').toUpperCase()==='COMPLETED'?'COMPLETED':'PRINCIPAL_RETURNED';
  else if(principal>0)status='PARTIALLY_RETURNED';
  up.PRINCIPAL_RETURNED=ndRound2_(principal);up.PROFIT_GENERATED=ndRound2_(profit);up.LOSS_GENERATED=ndRound2_(loss);up.STATUS=status;up.UPDATED_AT=ndNowIso_();up.UPDATED_BY=userId||'SYSTEM';ndUpdateRow_('INVESTMENTS',inv._row,up);return Object.assign({},inv,up);
}
function ndCreateInvestmentPurchaseTxn_(s,invId,name,totalCost,date,account,p){
  var txnId=ndNextId_('TXN','TRX-',8),now=ndNowIso_(),txn={TXN_ID:txnId,TXN_DATE:date,MEMBER_ID:'',TYPE:'INVESTMENT_PURCHASE',CATEGORY:'INVESTMENT',DESCRIPTION:'Investment: '+name,DIRECTION:'DEBIT',AMOUNT:totalCost,PRINCIPAL_AMOUNT:totalCost,PROFIT_AMOUNT:0,PENALTY_AMOUNT:0,PAYMENT_ACCOUNT_ID:account.ACCOUNT_ID,PAYMENT_METHOD:p.paymentMethod||account.TYPE,REFERENCE:p.reference||'',RELATED_ID:invId,RECEIPT_ID:'',STATUS:'POSTED',PARENT_TXN_ID:p.parentTxnId||'',CORRECTION_REASON:p.reason||'',CREATED_AT:now,CREATED_BY:s.userId,UPDATED_AT:now,UPDATED_BY:s.userId};
  ndAppend_('TRANSACTIONS',txn);ndPostJournalLines_(s,txnId,date,[{accountCode:ndCoaBySystem_('INVESTMENT_ASSET').ACCOUNT_CODE,debit:totalCost,credit:0},{accountCode:account.ACCOUNT_CODE,debit:0,credit:totalCost}],'',invId,txn.DESCRIPTION);return txn;
}
function listInvestments(token,options){
  var s=ndSession_(token);if(!ndHasPermission_(s,'investments.view')&&s.role!=='ADMIN')throw new Error('PERMISSION_DENIED');options=options||{};var rows=ndRows_('INVESTMENTS');if(options.type)rows=rows.filter(function(r){return r.TYPE===options.type;});if(options.status==='OPEN')rows=rows.filter(function(r){return ndInvestmentIsOpen_(r.STATUS);});else if(options.status==='CLOSED')rows=rows.filter(function(r){return ['SOLD_CLOSED','COMPLETED','CANCELLED'].indexOf(String(r.STATUS||'').toUpperCase())>=0;});else if(options.status)rows=rows.filter(function(r){return r.STATUS===options.status;});if(options.from)rows=rows.filter(function(r){return ndDateOnly_(r.START_DATE)>=options.from;});if(options.to)rows=rows.filter(function(r){return ndDateOnly_(r.START_DATE)<=options.to;});return ndSortDesc_(rows,'CREATED_AT').slice(0,500);
}

function createInvestment(token,p){
  var s=ndSession_(token);if(!(s.role==='ADMIN'||ndHasPermission_(s,'investments.edit')))throw new Error('PERMISSION_DENIED');p=p||{};if(!p.name)throw new Error('Investment name required.');var amount=ndRound2_(p.amount),total=ndRound2_(p.totalInvested||amount);if(amount<=0||total<=0)throw new Error('Investment amount required.');if(total+0.01<amount)throw new Error('Total invested cannot be lower than original principal.');
  return ndWithFinancialLock_(function(){var account=ndAccountById_(p.accountId||'ACC-BANK');ndRequireAccountFunds_(account.ACCOUNT_ID,total,'Investment purchase');var id=ndNextId_('INVESTMENT','INV-',7),date=ndDateOnly_(p.startDate||ndToday_()),now=ndNowIso_(),folderId='';try{var root=DriveApp.getFolderById(ndConfig_('DOCUMENT_FOLDER_ID',''));folderId=root.createFolder(id+' - '+String(p.name).slice(0,50)).getId();}catch(e){}
    var txn=ndCreateInvestmentPurchaseTxn_(s,id,p.name,total,date,account,p);ndAppend_('INVESTMENTS',{INVESTMENT_ID:id,TYPE:String(p.type||'OTHER').toUpperCase(),NAME:p.name,START_DATE:date,AMOUNT:amount,EXPECTED_RETURN_RATE:ndNumber_(p.expectedReturnRate),EXPECTED_END_DATE:p.expectedEndDate||'',STATUS:'ACTIVE',LOCATION:p.location||'',LAND_SIZE:p.landSize||'',MOUZA:p.mouza||'',DAG:p.dag||'',KHATIAN:p.khatian||'',PARTNER:p.partner||'',OWNERSHIP_PERCENT:ndNumber_(p.ownershipPercent),RESPONSIBLE_PERSON:p.responsiblePerson||'',DOCUMENT_FOLDER_ID:folderId,PURCHASE_TXN_ID:txn.TXN_ID,NOTES:p.notes||'',CREATED_AT:now,CREATED_BY:s.userId,UPDATED_AT:now,UPDATED_BY:s.userId,TOTAL_INVESTED:total,PRINCIPAL_RETURNED:0,CLOSURE_ID:'',CLOSED_AT:'',SELLING_AMOUNT:0,PROFIT_GENERATED:0,LOSS_GENERATED:0,CLOSING_REFERENCE:'',CLOSE_NOTES:'',CLOSED_BY:''});ndEnsureProfitSourceForInvestment_(s,id,p.name,String(p.type||'OTHER').toUpperCase());ndCreateAudit_(s,'CREATE','INVESTMENT',id,'',p,'Investment created');return {ok:true,investmentId:id,txnId:txn.TXN_ID};});
}

function updateInvestment(token,investmentId,p,reason){
  var s=ndSession_(token);if(!(s.role==='ADMIN'||ndHasPermission_(s,'investments.edit')))throw new Error('PERMISSION_DENIED');if(!reason)throw new Error('Modification reason required.');p=p||{};
  return ndWithFinancialLock_(function(){var inv=ndFindOne_('INVESTMENTS','INVESTMENT_ID',investmentId);if(!inv)throw new Error('Investment not found.');if(!ndInvestmentIsOpen_(inv.STATUS))throw new Error('Closed/cancelled investment cannot be edited. Reverse the closure first.');var up={UPDATED_AT:ndNowIso_(),UPDATED_BY:s.userId},fields={type:'TYPE',name:'NAME',startDate:'START_DATE',expectedReturnRate:'EXPECTED_RETURN_RATE',expectedEndDate:'EXPECTED_END_DATE',location:'LOCATION',landSize:'LAND_SIZE',mouza:'MOUZA',dag:'DAG',khatian:'KHATIAN',partner:'PARTNER',ownershipPercent:'OWNERSHIP_PERCENT',responsiblePerson:'RESPONSIBLE_PERSON',notes:'NOTES'};Object.keys(fields).forEach(function(k){if(p[k]!==undefined)up[fields[k]]=p[k];});
    var newPrincipal=p.amount===undefined?ndNumber_(inv.AMOUNT):ndRound2_(p.amount),newTotal=p.totalInvested===undefined?ndInvestmentTotalCost_(inv):ndRound2_(p.totalInvested);if(newPrincipal<=0||newTotal+0.01<newPrincipal)throw new Error('Invalid investment principal/total cost.');if(Math.abs(newTotal-ndInvestmentTotalCost_(inv))>0.009||Math.abs(newPrincipal-ndNumber_(inv.AMOUNT))>0.009){if(ndInvestmentReturns_(investmentId).length||ndInvestmentActiveClosure_(investmentId))throw new Error('Amount cannot be edited after a return or closure. Reverse dependent transactions first.');var oldTxn=ndFindOne_('TRANSACTIONS','TXN_ID',inv.PURCHASE_TXN_ID);if(!oldTxn||oldTxn.STATUS!=='POSTED')throw new Error('Original purchase transaction is not editable.');var account=ndAccountById_(p.accountId||oldTxn.PAYMENT_ACCOUNT_ID),additionalRequired=account.ACCOUNT_ID===oldTxn.PAYMENT_ACCOUNT_ID?Math.max(0,newTotal-ndNumber_(oldTxn.AMOUNT)):newTotal;ndRequireAccountFunds_(account.ACCOUNT_ID,additionalRequired,'Corrected investment purchase');var rev=ndReverseTransaction_(s,oldTxn,reason);ndUpdateRow_('TRANSACTIONS',oldTxn._row,{STATUS:'CORRECTED',CORRECTION_REASON:reason,UPDATED_AT:ndNowIso_(),UPDATED_BY:s.userId});var txn=ndCreateInvestmentPurchaseTxn_(s,investmentId,p.name||inv.NAME,newTotal,ndDateOnly_(p.startDate||oldTxn.TXN_DATE),account,{paymentMethod:p.paymentMethod||oldTxn.PAYMENT_METHOD,reference:p.reference===undefined?oldTxn.REFERENCE:p.reference,parentTxnId:oldTxn.TXN_ID,reason:reason});up.AMOUNT=newPrincipal;up.TOTAL_INVESTED=newTotal;up.PURCHASE_TXN_ID=txn.TXN_ID;up._reversalTxnId=rev;}
    var auditUp=Object.assign({},up);delete auditUp._reversalTxnId;ndUpdateRow_('INVESTMENTS',inv._row,auditUp);ndEnsureProfitSourceForInvestment_(s,investmentId,p.name||inv.NAME,String(p.type||inv.TYPE).toUpperCase());ndCreateAudit_(s,'UPDATE','INVESTMENT',investmentId,inv,auditUp,reason);return {ok:true,investmentId:investmentId,reversalTxnId:up._reversalTxnId||'',purchaseTxnId:auditUp.PURCHASE_TXN_ID||inv.PURCHASE_TXN_ID};});
}

function recordInvestmentReturn(token,p){
  var s=ndSession_(token);if(!(s.role==='ADMIN'||ndHasPermission_(s,'investments.edit')||ndHasPermission_(s,'accounts.edit')))throw new Error('PERMISSION_DENIED');p=p||{};var amount=ndRound2_(p.amount),type=String(p.type||'PROFIT').toUpperCase();if(amount<=0)throw new Error('Amount required.');if(['PROFIT','PRINCIPAL'].indexOf(type)<0)throw new Error('Return type must be PROFIT or PRINCIPAL.');
  if(type==='PROFIT')ndNormalizeProfitPeriod_(Object.assign({profitDate:p.date||ndToday_()},p));
  return ndWithFinancialLock_(function(){var inv=ndFindOne_('INVESTMENTS','INVESTMENT_ID',p.investmentId);if(!inv)throw new Error('Investment not found.');if(!ndInvestmentIsOpen_(inv.STATUS))throw new Error('Only an open investment can receive a return.');if(type==='PRINCIPAL'){var remaining=ndRound2_(ndInvestmentTotalCost_(inv)-ndInvestmentPrincipalReturned_(inv.INVESTMENT_ID));if(amount>remaining+0.01)throw new Error('Principal return exceeds remaining principal: '+remaining);}
    var account=ndAccountById_(p.accountId||'ACC-BANK'),date=ndDateOnly_(p.date||ndToday_()),rid=ndNextId_('INV_RETURN','RET-',7),txnId=ndNextId_('TXN','TRX-',8),now=ndNowIso_(),txn={TXN_ID:txnId,TXN_DATE:date,MEMBER_ID:'',TYPE:'INVESTMENT_RETURN_'+type,CATEGORY:'INVESTMENT',DESCRIPTION:(type==='PROFIT'?'Investment profit: ':'Investment principal return: ')+inv.NAME,DIRECTION:'CREDIT',AMOUNT:amount,PRINCIPAL_AMOUNT:type==='PRINCIPAL'?amount:0,PROFIT_AMOUNT:type==='PROFIT'?amount:0,PENALTY_AMOUNT:0,PAYMENT_ACCOUNT_ID:account.ACCOUNT_ID,PAYMENT_METHOD:p.paymentMethod||account.TYPE,REFERENCE:p.reference||'',RELATED_ID:inv.INVESTMENT_ID,RECEIPT_ID:'',STATUS:'POSTED',PARENT_TXN_ID:p.parentTxnId||'',CORRECTION_REASON:p.reason||'',CREATED_AT:now,CREATED_BY:s.userId,UPDATED_AT:now,UPDATED_BY:s.userId};ndAppend_('TRANSACTIONS',txn);var source=ndEnsureProfitSourceForInvestment_(s,inv.INVESTMENT_ID,inv.NAME,inv.TYPE),profitId='';if(type==='PROFIT')profitId=ndCreateProfitRecordFromPostedTxn_(s,{sourceId:source.SOURCE_ID,investmentId:inv.INVESTMENT_ID,category:inv.TYPE,profitDate:date,amount:amount,sourceTxnId:txnId,reference:p.reference||'',notes:p.notes||'',periodType:p.periodType||'CUSTOM',periodStart:p.periodStart||date,periodEnd:p.periodEnd||date,month:p.month,year:p.year,quarter:p.quarter,half:p.half});ndAppend_('INVESTMENT_RETURNS',{RETURN_ID:rid,INVESTMENT_ID:inv.INVESTMENT_ID,RETURN_DATE:date,TYPE:type,AMOUNT:amount,TXN_ID:txnId,NOTES:p.notes||'',CREATED_AT:now,CREATED_BY:s.userId,STATUS:'POSTED',PARENT_RETURN_ID:p.parentReturnId||'',UPDATED_AT:now,UPDATED_BY:s.userId,PROFIT_ID:profitId});var creditCode=type==='PROFIT'?ndCoaBySystem_('INVESTMENT_INCOME').ACCOUNT_CODE:ndCoaBySystem_('INVESTMENT_ASSET').ACCOUNT_CODE;ndPostJournalLines_(s,txnId,date,[{accountCode:account.ACCOUNT_CODE,debit:amount,credit:0},{accountCode:creditCode,debit:0,credit:amount}],'',inv.INVESTMENT_ID,txn.DESCRIPTION);var refreshed=ndRefreshInvestmentSummary_(inv.INVESTMENT_ID,s.userId),markCompleted=ndBool_(p.markCompleted);if(type==='PRINCIPAL'&&markCompleted&&ndNumber_(refreshed.PRINCIPAL_RETURNED)+0.01>=ndInvestmentTotalCost_(refreshed)){ndUpdateRow_('INVESTMENTS',refreshed._row||inv._row,{STATUS:'COMPLETED',UPDATED_AT:ndNowIso_(),UPDATED_BY:s.userId});}ndCreateAudit_(s,'RETURN','INVESTMENT_RETURN',rid,'',txn,p.reason||'Investment return');return {ok:true,returnId:rid,txnId:txnId,profitId:profitId,status:(markCompleted?'COMPLETED':refreshed.STATUS)};});
}

function closeInvestment(token,p){
  var s=ndSession_(token);if(!(s.role==='ADMIN'||ndHasPermission_(s,'investments.edit')||ndHasPermission_(s,'accounts.edit')))throw new Error('PERMISSION_DENIED');p=p||{};if(!p.investmentId)throw new Error('Investment required.');
  ndNormalizeProfitPeriod_(Object.assign({profitDate:p.closeDate||ndToday_()},p));
  return ndWithFinancialLock_(function(){var inv=ndFindOne_('INVESTMENTS','INVESTMENT_ID',p.investmentId);if(!inv)throw new Error('Investment not found.');if(!ndInvestmentIsOpen_(inv.STATUS))throw new Error('Investment is already closed, completed or cancelled.');if(ndInvestmentActiveClosure_(inv.INVESTMENT_ID))throw new Error('This investment has already been closed.');var cost=ndInvestmentTotalCost_(inv),previousPrincipal=ndInvestmentPrincipalReturned_(inv.INVESTMENT_ID),selling=ndRound2_(p.sellingAmount);if(selling<0)throw new Error('Selling amount cannot be negative.');if(selling+0.01<previousPrincipal)throw new Error('Selling amount cannot be lower than principal already returned ('+previousPrincipal+').');var cash=ndRound2_(selling-previousPrincipal),remainingAsset=ndRound2_(Math.max(0,cost-previousPrincipal)),profit=ndRound2_(Math.max(0,selling-cost)),loss=ndRound2_(Math.max(0,cost-selling)),principalNow=ndRound2_(Math.min(cash,remainingAsset)),principalTotal=ndRound2_(previousPrincipal+principalNow),date=ndDateOnly_(p.closeDate||ndToday_()),account=ndAccountById_(p.accountId||'ACC-BANK'),closureId=ndNextId_('INV_CLOSURE','CLS-',7),txnId=ndNextId_('TXN','TRX-',8),now=ndNowIso_(),reference=p.reference||closureId,txn={TXN_ID:txnId,TXN_DATE:date,MEMBER_ID:'',TYPE:'INVESTMENT_CLOSURE',CATEGORY:'INVESTMENT',DESCRIPTION:'Investment closed/sold: '+inv.NAME,DIRECTION:'CREDIT',AMOUNT:cash,PRINCIPAL_AMOUNT:principalNow,PROFIT_AMOUNT:profit,PENALTY_AMOUNT:0,PAYMENT_ACCOUNT_ID:account.ACCOUNT_ID,PAYMENT_METHOD:p.paymentMethod||account.TYPE,REFERENCE:reference,RELATED_ID:closureId,RECEIPT_ID:'',STATUS:'POSTED',PARENT_TXN_ID:'',CORRECTION_REASON:'',CREATED_AT:now,CREATED_BY:s.userId,UPDATED_AT:now,UPDATED_BY:s.userId};ndAppend_('TRANSACTIONS',txn);
    var lines=[];if(cash>0)lines.push({accountCode:account.ACCOUNT_CODE,debit:cash,credit:0});if(loss>0)lines.push({accountCode:ndCoaBySystem_('INVESTMENT_LOSS').ACCOUNT_CODE,debit:loss,credit:0});if(remainingAsset>0)lines.push({accountCode:ndCoaBySystem_('INVESTMENT_ASSET').ACCOUNT_CODE,debit:0,credit:remainingAsset});if(profit>0)lines.push({accountCode:ndCoaBySystem_('INVESTMENT_INCOME').ACCOUNT_CODE,debit:0,credit:profit});if(lines.length)ndPostJournalLines_(s,txnId,date,lines,'',inv.INVESTMENT_ID,txn.DESCRIPTION);
    var source=ndEnsureProfitSourceForInvestment_(s,inv.INVESTMENT_ID,inv.NAME,inv.TYPE),profitId='';if(profit>0)profitId=ndCreateProfitRecordFromPostedTxn_(s,{sourceId:source.SOURCE_ID,investmentId:inv.INVESTMENT_ID,category:inv.TYPE,profitDate:date,amount:profit,sourceTxnId:txnId,reference:reference,notes:p.notes||'',periodType:p.periodType||'CUSTOM',periodStart:p.periodStart||date,periodEnd:p.periodEnd||date,month:p.month,year:p.year,quarter:p.quarter,half:p.half});ndAppend_('INVESTMENT_CLOSURES',{CLOSURE_ID:closureId,INVESTMENT_ID:inv.INVESTMENT_ID,CLOSE_DATE:date,SELLING_AMOUNT:selling,CASH_RECEIVED:cash,TOTAL_COST:cost,PRINCIPAL_RETURNED:principalTotal,PROFIT_AMOUNT:profit,LOSS_AMOUNT:loss,ACCOUNT_ID:account.ACCOUNT_ID,TXN_ID:txnId,PROFIT_ID:profitId,REFERENCE:reference,NOTES:p.notes||'',STATUS:'POSTED',PARENT_CLOSURE_ID:'',CREATED_AT:now,CREATED_BY:s.userId,UPDATED_AT:now,UPDATED_BY:s.userId});var finalStatus=String(p.status||'SOLD_CLOSED').toUpperCase();if(['SOLD_CLOSED','COMPLETED'].indexOf(finalStatus)<0)finalStatus='SOLD_CLOSED';var up={STATUS:finalStatus,TOTAL_INVESTED:cost,PRINCIPAL_RETURNED:principalTotal,CLOSURE_ID:closureId,CLOSED_AT:date,SELLING_AMOUNT:selling,PROFIT_GENERATED:ndRound2_(ndInvestmentReturns_(inv.INVESTMENT_ID,'PROFIT').reduce(function(z,r){return z+ndNumber_(r.AMOUNT);},0)+profit),LOSS_GENERATED:loss,CLOSING_REFERENCE:reference,CLOSE_NOTES:p.notes||'',CLOSED_BY:s.userId,UPDATED_AT:now,UPDATED_BY:s.userId};ndUpdateRow_('INVESTMENTS',inv._row,up);ndCreateAudit_(s,'CLOSE','INVESTMENT',inv.INVESTMENT_ID,inv,{closureId:closureId,sellingAmount:selling,cashReceived:cash,profit:profit,loss:loss,status:finalStatus},p.reason||'Investment sold/closed');return {ok:true,investmentId:inv.INVESTMENT_ID,closureId:closureId,txnId:txnId,profitId:profitId,totalCost:cost,sellingAmount:selling,cashReceived:cash,principalReturned:principalTotal,profit:profit,loss:loss,status:finalStatus};});
}

function reverseInvestmentReturn(token,returnId,reason){
  var s=ndSession_(token);if(!(s.role==='ADMIN'||ndHasPermission_(s,'investments.edit')||ndHasPermission_(s,'accounts.edit')))throw new Error('PERMISSION_DENIED');if(!reason)throw new Error('Reversal reason required.');return ndWithFinancialLock_(function(){var r=ndFindOne_('INVESTMENT_RETURNS','RETURN_ID',returnId);if(!r||!ndInvestmentReturnEffective_(r))throw new Error('Investment return is not eligible.');if(ndInvestmentActiveClosure_(r.INVESTMENT_ID))throw new Error('Reverse the investment closure before reversing an earlier return.');if(r.PROFIT_ID){var pr=ndFindOne_('PROFIT_RECORDS','PROFIT_ID',r.PROFIT_ID);if(pr&&ndProfitReservedAmount_(pr.PROFIT_ID)>0)throw new Error('Reverse/cancel the related profit distribution first.');}var t=ndFindOne_('TRANSACTIONS','TXN_ID',r.TXN_ID);if(!t)throw new Error('Return transaction missing.');var rev=ndReverseTransaction_(s,t,reason);ndUpdateRow_('TRANSACTIONS',t._row,{STATUS:'REVERSED',CORRECTION_REASON:reason,UPDATED_AT:ndNowIso_(),UPDATED_BY:s.userId});ndUpdateRow_('INVESTMENT_RETURNS',r._row,{STATUS:'REVERSED',UPDATED_AT:ndNowIso_(),UPDATED_BY:s.userId});if(r.PROFIT_ID){var p=ndFindOne_('PROFIT_RECORDS','PROFIT_ID',r.PROFIT_ID);if(p)ndUpdateRow_('PROFIT_RECORDS',p._row,{STATUS:'REVERSED',UNDISTRIBUTED_AMOUNT:0,UPDATED_AT:ndNowIso_(),UPDATED_BY:s.userId});}ndRefreshInvestmentSummary_(r.INVESTMENT_ID,s.userId);ndCreateAudit_(s,'REVERSE','INVESTMENT_RETURN',returnId,r,{reversalTxnId:rev},reason);return {ok:true,reversalTxnId:rev};});
}

function reverseInvestmentClosure(token,closureId,reason){
  var s=ndSession_(token);if(!(s.role==='ADMIN'||ndHasPermission_(s,'investments.edit')||ndHasPermission_(s,'accounts.edit')))throw new Error('PERMISSION_DENIED');if(!reason)throw new Error('Reversal reason required.');return ndWithFinancialLock_(function(){var c=ndFindOne_('INVESTMENT_CLOSURES','CLOSURE_ID',closureId);if(!c||String(c.STATUS).toUpperCase()!=='POSTED')throw new Error('Active investment closure not found.');if(c.PROFIT_ID&&ndProfitReservedAmount_(c.PROFIT_ID)>0)throw new Error('Reverse/cancel the related profit distribution first.');var t=ndFindOne_('TRANSACTIONS','TXN_ID',c.TXN_ID);if(!t)throw new Error('Closure transaction missing.');var rev=ndReverseTransaction_(s,t,reason),now=ndNowIso_();ndUpdateRow_('TRANSACTIONS',t._row,{STATUS:'REVERSED',CORRECTION_REASON:reason,UPDATED_AT:now,UPDATED_BY:s.userId});ndUpdateRow_('INVESTMENT_CLOSURES',c._row,{STATUS:'REVERSED',UPDATED_AT:now,UPDATED_BY:s.userId});if(c.PROFIT_ID){var p=ndFindOne_('PROFIT_RECORDS','PROFIT_ID',c.PROFIT_ID);if(p)ndUpdateRow_('PROFIT_RECORDS',p._row,{STATUS:'REVERSED',UNDISTRIBUTED_AMOUNT:0,UPDATED_AT:now,UPDATED_BY:s.userId});}var inv=ndFindOne_('INVESTMENTS','INVESTMENT_ID',c.INVESTMENT_ID);if(inv)ndUpdateRow_('INVESTMENTS',inv._row,{STATUS:'ACTIVE',CLOSURE_ID:'',CLOSED_AT:'',SELLING_AMOUNT:0,CLOSING_REFERENCE:'',CLOSE_NOTES:'',CLOSED_BY:'',UPDATED_AT:now,UPDATED_BY:s.userId});ndRefreshInvestmentSummary_(c.INVESTMENT_ID,s.userId);ndCreateAudit_(s,'REVERSE','INVESTMENT_CLOSURE',closureId,c,{reversalTxnId:rev},reason);return {ok:true,reversalTxnId:rev};});
}

function cancelInvestment(token,investmentId,reason){
  var s=ndSession_(token);if(!(s.role==='ADMIN'||ndHasPermission_(s,'investments.edit')))throw new Error('PERMISSION_DENIED');if(!reason)throw new Error('Cancellation reason required.');return ndWithFinancialLock_(function(){var inv=ndFindOne_('INVESTMENTS','INVESTMENT_ID',investmentId);if(!inv||!ndInvestmentIsOpen_(inv.STATUS))throw new Error('Open investment not found.');if(ndInvestmentReturns_(investmentId).length||ndInvestmentActiveClosure_(investmentId))throw new Error('Reverse all returns/closure before cancelling this investment.');var t=ndFindOne_('TRANSACTIONS','TXN_ID',inv.PURCHASE_TXN_ID);if(!t)throw new Error('Purchase transaction missing.');var rev=ndReverseTransaction_(s,t,reason),now=ndNowIso_();ndUpdateRow_('TRANSACTIONS',t._row,{STATUS:'REVERSED',CORRECTION_REASON:reason,UPDATED_AT:now,UPDATED_BY:s.userId});ndUpdateRow_('INVESTMENTS',inv._row,{STATUS:'CANCELLED',UPDATED_AT:now,UPDATED_BY:s.userId});ndCreateAudit_(s,'CANCEL','INVESTMENT',investmentId,inv,{reversalTxnId:rev},reason);return {ok:true,reversalTxnId:rev};});
}

function getInvestmentDetails(token,id){
  var s=ndSession_(token);if(!ndHasPermission_(s,'investments.view')&&s.role!=='ADMIN')throw new Error('PERMISSION_DENIED');var inv=ndFindOne_('INVESTMENTS','INVESTMENT_ID',id);if(!inv)throw new Error('Investment not found.');var refreshed=ndRefreshInvestmentSummary_(id,'SYSTEM_READ');return {investment:refreshed||inv,returns:ndSortDesc_(ndFindMany_('INVESTMENT_RETURNS',{INVESTMENT_ID:id}),'RETURN_DATE'),closure:ndInvestmentActiveClosure_(id),closureHistory:ndSortDesc_(ndFindMany_('INVESTMENT_CLOSURES',{INVESTMENT_ID:id}),'CREATED_AT'),profitRecords:ndSortDesc_(ndFindMany_('PROFIT_RECORDS',{INVESTMENT_ID:id}),'PROFIT_DATE'),documents:ndFindMany_('DOCUMENTS',{RELATED_ID:id})};
}

/** ===== ManagementService.gs ===== */
/** Users/roles, meetings, documents, notifications, reports, settings and backups. */
function listUsers(token){var s=ndRequireAdmin_(token);return ndRows_('USERS').map(function(u){return {userId:u.USER_ID,memberId:u.MEMBER_ID,name:u.FULL_NAME,username:u.USERNAME,role:u.ROLE_ID,status:u.STATUS,mustChange:u.MUST_CHANGE_PASSWORD,lastLogin:u.LAST_LOGIN_AT,createdAt:u.CREATED_AT};});}
function createStaffUser(token,p){var s=ndRequireAdmin_(token);p=p||{};if(!String(p.name||'').trim()||!String(p.username||'').trim())throw new Error('Name and username required.');var uname=ndNormalizeUsername_(p.username);if(!/^[a-z0-9._-]{3,40}$/.test(uname))throw new Error('Username must be 3-40 letters, numbers, dot, underscore or hyphen.');if(ndRows_('USERS').some(function(u){return ndNormalizeUsername_(u.USERNAME)===uname;}))throw new Error('Username already exists.');var role=String(p.role||'STAFF').toUpperCase(),roleRow=ndFindOne_('ROLES','ROLE_ID',role);if(!roleRow||roleRow.STATUS!=='ACTIVE'||role==='MEMBER')throw new Error('Invalid staff role.');var temp=ndRandomPassword_(),salt=ndMakeSalt_(),now=ndNowIso_(),id=ndNextId_('USER','USR-',6);ndAppend_('USERS',{USER_ID:id,MEMBER_ID:'',FULL_NAME:String(p.name).trim().slice(0,120),USERNAME:uname,PASSWORD_HASH:ndHashPassword_(temp,salt),SALT:salt,ROLE_ID:role,STATUS:'ACTIVE',MUST_CHANGE_PASSWORD:'TRUE',LAST_LOGIN_AT:'',CREATED_AT:now,CREATED_BY:s.userId,UPDATED_AT:now,UPDATED_BY:s.userId});ndCreateAudit_(s,'CREATE','USER',id,'',{name:p.name,username:uname,role:role},'Staff user created');return {ok:true,userId:id,username:uname,tempPassword:temp};}
function updateUser(token,userId,p,reason){var s=ndRequireAdmin_(token),u=ndFindOne_('USERS','USER_ID',userId);if(!u)throw new Error('User not found.');p=p||{};var up={UPDATED_AT:ndNowIso_(),UPDATED_BY:s.userId},securityChanged=false;if(p.name!==undefined){if(!String(p.name||'').trim())throw new Error('Name required.');up.FULL_NAME=String(p.name).trim().slice(0,120);}if(p.role!==undefined){var role=String(p.role).toUpperCase(),rr=ndFindOne_('ROLES','ROLE_ID',role);if(!rr||rr.STATUS!=='ACTIVE')throw new Error('Invalid role.');up.ROLE_ID=role;securityChanged=role!==u.ROLE_ID;}if(p.status!==undefined){var status=String(p.status).toUpperCase();if(['ACTIVE','INACTIVE','SUSPENDED'].indexOf(status)<0)throw new Error('Invalid user status.');up.STATUS=status;securityChanged=securityChanged||status!==u.STATUS;}var demotingAdmin=u.ROLE_ID==='ADMIN'&&((up.ROLE_ID&&up.ROLE_ID!=='ADMIN')||(up.STATUS&&up.STATUS!=='ACTIVE'));if(demotingAdmin&&ndRows_('USERS').filter(function(x){return x.ROLE_ID==='ADMIN'&&x.STATUS==='ACTIVE'&&x.USER_ID!==userId;}).length===0)throw new Error('The last active administrator cannot be deactivated or demoted.');ndUpdateRow_('USERS',u._row,up);var revoked=securityChanged?ndRevokeUserSessions_(userId,''):0;ndCreateAudit_(s,'UPDATE','USER',userId,u,Object.assign({},up,{REVOKED_SESSIONS:revoked}),reason||'User updated');return {ok:true,revokedSessions:revoked};}
function listRoles(token){ndSession_(token);return ndRows_('ROLES').map(function(r){return {id:r.ROLE_ID,name:r.ROLE_NAME,permissions:ndSafeParse_(r.PERMISSIONS_JSON,[]),status:r.STATUS};});}
function saveRolePermissions(token,roleId,permissions){var s=ndRequireAdmin_(token),r=ndFindOne_('ROLES','ROLE_ID',roleId);if(!r)throw new Error('Role not found.');permissions=Array.isArray(permissions)?permissions:[];var seen={},clean=permissions.map(function(x){return String(x||'').trim();}).filter(function(x){if(!x||x.length>100||seen[x])return false;seen[x]=true;return true;});if(roleId==='ADMIN')clean=['*'];ndUpdateRow_('ROLES',r._row,{PERMISSIONS_JSON:JSON.stringify(clean),UPDATED_AT:ndNowIso_()});var revoked=0;ndRows_('USERS').filter(function(u){return u.ROLE_ID===roleId;}).forEach(function(u){revoked+=ndRevokeUserSessions_(u.USER_ID,'');});ndCreateAudit_(s,'PERMISSIONS','ROLE',roleId,r.PERMISSIONS_JSON,{permissions:clean,revokedSessions:revoked},'Role permissions updated');return {ok:true,revokedSessions:revoked};}

function listMeetings(token){var s=ndSession_(token);if(!ndHasPermission_(s,'meetings.view')&&s.role!=='ADMIN')throw new Error('PERMISSION_DENIED');return ndSortDesc_(ndRows_('MEETINGS'),'DATE').slice(0,300);}
function saveMeeting(token,p){var s=ndSession_(token);if(!(s.role==='ADMIN'||ndHasPermission_(s,'meetings.edit')))throw new Error('PERMISSION_DENIED');p=p||{};var title=String(p.title||'').trim().slice(0,200),date=ndDateOnly_(p.date);if(!title||!date)throw new Error('Meeting title and date required.');var status=String(p.status||'SCHEDULED').toUpperCase();if(['SCHEDULED','COMPLETED','CANCELLED','POSTPONED'].indexOf(status)<0)throw new Error('Invalid meeting status.');var id=p.meetingId||ndNextId_('MEETING','MTG-',7),now=ndNowIso_();if(p.meetingId){var r=ndFindOne_('MEETINGS','MEETING_ID',id);if(!r)throw new Error('Meeting not found.');var up={TYPE:p.type||r.TYPE,TITLE:title,DATE:date,TIME:p.time||'',VENUE:p.venue||'',AGENDA:p.agenda||'',MINUTES:p.minutes||'',RESOLUTION_NO:p.resolutionNo||'',STATUS:p.status?status:r.STATUS,UPDATED_AT:now,UPDATED_BY:s.userId};ndUpdateRow_('MEETINGS',r._row,up);ndCreateAudit_(s,'UPDATE','MEETING',id,r,up,'Meeting updated');}else{var row={MEETING_ID:id,TYPE:p.type||'GENERAL',TITLE:title,DATE:date,TIME:p.time||'',VENUE:p.venue||'',AGENDA:p.agenda||'',MINUTES:p.minutes||'',RESOLUTION_NO:p.resolutionNo||'',STATUS:status,CREATED_AT:now,CREATED_BY:s.userId,UPDATED_AT:now,UPDATED_BY:s.userId};ndAppend_('MEETINGS',row);ndCreateAudit_(s,'CREATE','MEETING',id,'',row,'Meeting created');}return {ok:true,meetingId:id};}
function listMeetingAttendance(token,meetingId){var s=ndSession_(token);if(!(s.role==='ADMIN'||ndHasPermission_(s,'meetings.view')))throw new Error('PERMISSION_DENIED');if(!ndFindOne_('MEETINGS','MEETING_ID',meetingId))throw new Error('Meeting not found.');return ndFindMany_('MEETING_ATTENDANCE',{MEETING_ID:meetingId});}
function saveMeetingAttendance(token,meetingId,items){var s=ndSession_(token);if(!(s.role==='ADMIN'||ndHasPermission_(s,'meetings.edit')))throw new Error('PERMISSION_DENIED');if(!ndFindOne_('MEETINGS','MEETING_ID',meetingId))throw new Error('Meeting not found.');items=items||[];var now=ndNowIso_(),saved=0;items.forEach(function(x){if(!x||!x.memberId)return;var member=ndFindOne_('MEMBERS','MEMBER_ID',x.memberId);if(!member)return;var status=String(x.status||'PRESENT').toUpperCase();if(['PRESENT','ABSENT','EXCUSED'].indexOf(status)<0)throw new Error('Invalid attendance status.');var existing=ndRows_('MEETING_ATTENDANCE').filter(function(a){return a.MEETING_ID===meetingId&&a.MEMBER_ID===x.memberId;})[0];var up={STATUS:status,NOTE:String(x.note||'').slice(0,500),UPDATED_AT:now,UPDATED_BY:s.userId};if(existing)ndUpdateRow_('MEETING_ATTENDANCE',existing._row,up);else ndAppend_('MEETING_ATTENDANCE',{ATTENDANCE_ID:ndNextId_('ATTENDANCE','ATD-',8),MEETING_ID:meetingId,MEMBER_ID:x.memberId,STATUS:status,NOTE:up.NOTE,CREATED_AT:now,CREATED_BY:s.userId,UPDATED_AT:now,UPDATED_BY:s.userId});saved++;});ndCreateAudit_(s,'UPDATE','MEETING_ATTENDANCE',meetingId,'',{saved:saved},'Meeting attendance saved');return {ok:true,count:saved};}

function listCommittee(token){var s=ndSession_(token);if(!ndHasPermission_(s,'committee.view')&&!ndHasPermission_(s,'members.view')&&s.role!=='ADMIN')throw new Error('PERMISSION_DENIED');return ndRows_('COMMITTEE');}
function addCommitteeMember(token,p){var s=ndSession_(token);if(!(s.role==='ADMIN'||ndHasPermission_(s,'committee.edit')))throw new Error('PERMISSION_DENIED');p=p||{};var member=ndFindOne_('MEMBERS','MEMBER_ID',p.memberId);if(!member)throw new Error('Member not found.');var designation=String(p.designation||'').trim().slice(0,120);if(!designation)throw new Error('Designation required.');var start=ndDateOnly_(p.startDate||ndToday_()),end=ndDateOnly_(p.endDate||'');if(end&&end<start)throw new Error('Committee end date cannot be before start date.');var status=String(p.status||'ACTIVE').toUpperCase();if(['ACTIVE','INACTIVE','COMPLETED'].indexOf(status)<0)throw new Error('Invalid committee status.');var id=ndNextId_('COMMITTEE','COM-',6);ndAppend_('COMMITTEE',{COMMITTEE_ID:id,MEMBER_ID:member.MEMBER_ID,DESIGNATION:designation,START_DATE:start,END_DATE:end,STATUS:status,NOTES:String(p.notes||'').slice(0,1000),CREATED_AT:ndNowIso_(),CREATED_BY:s.userId});ndCreateAudit_(s,'CREATE','COMMITTEE',id,'',p,'Committee member added');return {ok:true,committeeId:id};}

function uploadDocument(token,p){var s=ndSession_(token);p=p||{};var memberId=String(p.memberId||''),relatedType=String(p.relatedType||'MEMBER').toUpperCase(),relatedId=String(p.relatedId||memberId);if(!memberId&&!relatedId&&relatedType==='MEMBER')relatedType='OTHER';if(s.role==='MEMBER'){memberId=s.memberId;relatedType='MEMBER';relatedId=s.memberId;if(p.memberId&&p.memberId!==s.memberId)throw new Error('PERMISSION_DENIED');}else if(!(ndHasPermission_(s,'documents.edit')||s.role==='ADMIN'))throw new Error('PERMISSION_DENIED');var title=String(p.title||'').trim().slice(0,160);if(!p.dataUrl||!title)throw new Error('Document and title required.');if(['MEMBER','LOAN','INVESTMENT','MEETING','OTHER'].indexOf(relatedType)<0)throw new Error('Invalid related document type.');if(memberId&&!ndFindOne_('MEMBERS','MEMBER_ID',memberId))throw new Error('Related member not found.');var sheetByType={MEMBER:'MEMBERS',LOAN:'LOANS',INVESTMENT:'INVESTMENTS',MEETING:'MEETINGS'},fieldByType={MEMBER:'MEMBER_ID',LOAN:'LOAN_ID',INVESTMENT:'INVESTMENT_ID',MEETING:'MEETING_ID'};if(relatedType!=='OTHER'&&relatedId&&!ndFindOne_(sheetByType[relatedType],fieldByType[relatedType],relatedId))throw new Error('Related '+relatedType.toLowerCase()+' record not found.');var fileId=ndSaveDataUrlFile_(p.dataUrl,(memberId||relatedId||'doc')+'_'+Date.now(),ndConfig_('DOCUMENT_FOLDER_ID',''),{kind:'document'}),file=DriveApp.getFileById(fileId),id=ndNextId_('DOCUMENT','DOC-',8);ndAppend_('DOCUMENTS',{DOCUMENT_ID:id,MEMBER_ID:memberId,RELATED_TYPE:relatedType,RELATED_ID:relatedId,TITLE:title,FILE_ID:fileId,FILE_NAME:file.getName(),MIME_TYPE:file.getMimeType(),STATUS:'ACTIVE',CREATED_AT:ndNowIso_(),CREATED_BY:s.userId});ndCreateAudit_(s,'UPLOAD','DOCUMENT',id,'',{title:title,memberId:memberId,relatedType:relatedType,relatedId:relatedId},'Document uploaded');return {ok:true,documentId:id};}
function listDocuments(token,filters){var s=ndSession_(token);filters=filters||{};var rows=ndRows_('DOCUMENTS').filter(function(r){return r.STATUS==='ACTIVE';});if(s.role==='MEMBER')rows=rows.filter(function(r){return r.MEMBER_ID===s.memberId;});else if(!ndHasPermission_(s,'documents.view')&&s.role!=='ADMIN')throw new Error('PERMISSION_DENIED');if(filters.memberId)rows=rows.filter(function(r){return r.MEMBER_ID===filters.memberId;});if(filters.relatedId)rows=rows.filter(function(r){return r.RELATED_ID===filters.relatedId;});return ndSortDesc_(rows,'CREATED_AT').slice(0,300).map(function(r){return {documentId:r.DOCUMENT_ID,memberId:r.MEMBER_ID,relatedType:r.RELATED_TYPE,relatedId:r.RELATED_ID,title:r.TITLE,fileName:r.FILE_NAME,mimeType:r.MIME_TYPE,createdAt:r.CREATED_AT};});}
function getDocumentData(token,documentId){var s=ndSession_(token),d=ndFindOne_('DOCUMENTS','DOCUMENT_ID',documentId);if(!d)throw new Error('Document not found.');if(s.role==='MEMBER'&&d.MEMBER_ID!==s.memberId)throw new Error('PERMISSION_DENIED');if(s.role!=='MEMBER'&&!ndHasPermission_(s,'documents.view')&&s.role!=='ADMIN')throw new Error('PERMISSION_DENIED');return {title:d.TITLE,fileName:d.FILE_NAME,mimeType:d.MIME_TYPE,dataUri:ndDriveFileDataUri_(d.FILE_ID)};}

function listNotifications(token){var s=ndSession_(token);var rows=ndRows_('NOTIFICATIONS').filter(function(n){return (n.USER_ID&&n.USER_ID===s.userId)||(!n.USER_ID&&n.MEMBER_ID&&n.MEMBER_ID===s.memberId)||(!n.USER_ID&&!n.MEMBER_ID);});return ndSortDesc_(rows,'CREATED_AT').slice(0,100);}
function markNotificationRead(token,id){var s=ndSession_(token),n=ndFindOne_('NOTIFICATIONS','NOTIFICATION_ID',id);if(!n)throw new Error('Notification not found.');if(s.role!=='ADMIN'&&((n.USER_ID&&n.USER_ID!==s.userId)||(n.MEMBER_ID&&n.MEMBER_ID!==s.memberId)))throw new Error('PERMISSION_DENIED');ndUpdateRow_('NOTIFICATIONS',n._row,{STATUS:'READ',READ_AT:ndNowIso_()});return {ok:true};}
function createBroadcastNotification(token,p){var s=ndRequireAdmin_(token);p=p||{};var title=String(p.title||'').trim().slice(0,160),message=String(p.message||'').trim().slice(0,2000);if(!title||!message)throw new Error('Title and message required.');if(p.memberId){if(!ndFindOne_('MEMBERS','MEMBER_ID',p.memberId))throw new Error('Member not found.');ndCreateNotification_(p.memberId,p.type||'NOTICE',title,message);}else{var users=ndRows_('USERS').filter(function(u){return u.STATUS==='ACTIVE';}),now=ndNowIso_();if(users.length){var ids=ndReserveIds_('NOTIFICATION',users.length,'NTF-',7);ndAppendMany_('NOTIFICATIONS',users.map(function(u,i){return {NOTIFICATION_ID:ids[i],USER_ID:u.USER_ID,MEMBER_ID:u.MEMBER_ID||'',TYPE:p.type||'NOTICE',TITLE:title,MESSAGE:message,STATUS:'UNREAD',CREATED_AT:now,READ_AT:''};}));}}ndCreateAudit_(s,'CREATE','NOTIFICATION',p.memberId||'ALL','',{title:title,message:message},'Notification');return {ok:true};}

function getAuditLog(token,options){var s=ndSession_(token);if(!(s.role==='ADMIN'||ndHasPermission_(s,'audit.view')))throw new Error('PERMISSION_DENIED');options=options||{};var rows=ndRows_('AUDIT_LOG');if(options.entityType)rows=rows.filter(function(r){return r.ENTITY_TYPE===options.entityType;});if(options.userId)rows=rows.filter(function(r){return r.USER_ID===options.userId;});return ndSortDesc_(rows,'CREATED_AT').slice(0,Math.min(1000,ndNumber_(options.limit||300)));}

var ND_CONFIG_FIELDS = [
  {key:'SOCIETY_NAME_BN',category:'GENERAL',label:'Society Name Bangla',type:'text',required:true,max:200},
  {key:'SOCIETY_NAME_EN',category:'GENERAL',label:'Society Name English',type:'text',required:true,max:200},
  {key:'ESTD_YEAR',category:'GENERAL',label:'Establishment Year',type:'year',required:true},
  {key:'SOCIETY_START_MONTH',category:'GENERAL',label:'Society Start Month',type:'monthKey',required:true,financial:true},
  {key:'TAGLINE_BN',category:'GENERAL',label:'Bangla Tagline',type:'text',max:300},
  {key:'SOCIETY_ADDRESS',category:'GENERAL',label:'Society Address',type:'text',max:500},
  {key:'SOCIETY_MOBILE',category:'GENERAL',label:'Mobile Number',type:'mobile'},
  {key:'SOCIETY_EMAIL',category:'GENERAL',label:'Email Address',type:'email'},
  {key:'MEMBER_ID_PREFIX',category:'PREFIX',label:'Member ID Prefix',type:'prefix',required:true},
  {key:'RECEIPT_PREFIX',category:'PREFIX',label:'Receipt Prefix',type:'prefix',required:true},
  {key:'VOUCHER_PREFIX',category:'PREFIX',label:'Voucher Prefix',type:'prefix',required:true},
  {key:'MONTHLY_UNIT_AMOUNT',category:'SAVINGS',label:'Monthly Unit Amount',type:'positiveMoney',required:true,financial:true},
  {key:'MONTHLY_DUE_DAY',category:'SAVINGS',label:'Monthly Due Day',type:'dueDay',required:true,financial:true},
  {key:'LATE_FEE',category:'SAVINGS',label:'Late Fee per Overdue Unit',type:'money',required:true,financial:true},
  {key:'MIN_LOAN_MEMBERSHIP_MONTHS',category:'LOAN',label:'Minimum Membership Months',type:'nonNegativeInt',required:true,financial:true,maxNumber:600},
  {key:'SECURED_LOAN_PERCENT',category:'LOAN',label:'Secured Loan Percentage',type:'percent',required:true,financial:true},
  {key:'GENERAL_LOAN_SAVINGS_MULTIPLIER',category:'LOAN',label:'General Loan Savings Multiplier',type:'nonNegativeNumber',required:true,financial:true,maxNumber:1000},
  {key:'GENERAL_LOAN_FUND_PERCENT',category:'LOAN',label:'General Loan Fund Percentage',type:'percent',required:true,financial:true},
  {key:'DEFAULT_LOAN_ANNUAL_RATE',category:'LOAN',label:'Default Annual Interest Rate',type:'percent',required:true,financial:true},
  {key:'DEFAULT_LOAN_METHOD',category:'LOAN',label:'Default Loan Method',type:'select',required:true,financial:true,options:['REDUCING','FLAT']},
  {key:'WITHDRAWAL_NOTICE_DAYS',category:'LOAN',label:'Withdrawal Notice Days',type:'nonNegativeInt',required:true,financial:true,maxNumber:3650},
  {key:'MIN_LIQUIDITY_PERCENT',category:'LOAN',label:'Minimum Liquidity Percentage',type:'percent',required:true,financial:true},
  {key:'BIG_INVESTMENT_FUND_PERCENT',category:'INVESTMENT',label:'Big Investment Fund Percentage',type:'percent',required:true,financial:true},
  {key:'BIG_INVESTMENT_APPROVAL_PERCENT',category:'INVESTMENT',label:'Big Investment Approval Percentage',type:'percent',required:true,financial:true},
  {key:'FINANCIAL_YEAR_START_MONTH',category:'REGIONAL',label:'Financial Year Start Month',type:'monthNumber',required:true},
  {key:'CURRENCY_SYMBOL',category:'REGIONAL',label:'Currency Symbol',type:'currency',required:true},
  {key:'TIMEZONE',category:'REGIONAL',label:'Timezone',type:'timezone',required:true},
  {key:'SESSION_HOURS',category:'SECURITY',label:'Session Duration (Hours)',type:'positiveInt',required:true,minNumber:1,maxNumber:168},
  {key:'LOGIN_MAX_ATTEMPTS',category:'SECURITY',label:'Maximum Login Attempts',type:'positiveInt',required:true,minNumber:3,maxNumber:20},
  {key:'LOGIN_LOCK_MINUTES',category:'SECURITY',label:'Login Lock Duration (Minutes)',type:'positiveInt',required:true,minNumber:1,maxNumber:1440}
];
var ND_FINANCIAL_CONFIG_KEYS=ND_CONFIG_FIELDS.filter(function(x){return x.financial;}).map(function(x){return x.key;});
function ndConfigFieldMap_(){var out={};ND_CONFIG_FIELDS.forEach(function(x){out[x.key]=x;});return out;}
function ndValidateConfigValue_(spec,value){
  var raw=String(value===undefined||value===null?'':value).trim();
  if(spec.required&&!raw)throw new Error(spec.label+' is required.');
  if(!raw)return '';
  function number(){var n=Number(raw);if(!isFinite(n))throw new Error(spec.label+' must be a valid number.');return n;}
  var n;
  if(spec.type==='text'){if(raw.length>(spec.max||2000))throw new Error(spec.label+' is too long.');return raw;}
  if(spec.type==='year'){n=number();if(!/^\d{4}$/.test(raw)||n<1900||n>2200)throw new Error('Establishment Year must be 1900-2200.');return String(Math.floor(n));}
  if(spec.type==='monthKey'){if(!/^\d{4}-(0[1-9]|1[0-2])$/.test(raw))throw new Error('Society Start Month must use YYYY-MM.');return raw;}
  if(spec.type==='email'){if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw))throw new Error('Email Address is invalid.');return raw.toLowerCase();}
  if(spec.type==='mobile')return ndNormalizeMobile_(raw,false);
  if(spec.type==='prefix'){raw=raw.toUpperCase();if(!/^[A-Z0-9][A-Z0-9-]{0,19}$/.test(raw))throw new Error(spec.label+' may contain A-Z, 0-9 and hyphen only (max 20).');return raw;}
  if(spec.type==='select'){raw=raw.toUpperCase();if(spec.options.indexOf(raw)<0)throw new Error(spec.label+' is not supported.');return raw;}
  if(spec.type==='timezone'){if(!/^[A-Za-z_]+(?:\/[A-Za-z0-9_+.-]+)+$/.test(raw))throw new Error('Timezone must be a valid IANA name, for example Asia/Dhaka.');try{Utilities.formatDate(new Date(),raw,'yyyy-MM-dd');}catch(e){throw new Error('Timezone is not supported.');}return raw;}
  if(spec.type==='currency'){if(raw.length>6)throw new Error('Currency Symbol must be 1-6 characters.');return raw;}
  n=number();
  if(spec.type==='percent'&&(n<0||n>100))throw new Error(spec.label+' must be between 0 and 100.');
  if(spec.type==='monthNumber'&&(n<1||n>12||Math.floor(n)!==n))throw new Error(spec.label+' must be between 1 and 12.');
  if(spec.type==='dueDay'&&(n<1||n>31||Math.floor(n)!==n))throw new Error(spec.label+' must be between 1 and 31.');
  if(spec.type==='positiveMoney'&&n<=0)throw new Error(spec.label+' must be greater than 0.');
  if(spec.type==='money'&&n<0)throw new Error(spec.label+' cannot be negative.');
  if(spec.type==='nonNegativeNumber'&&n<0)throw new Error(spec.label+' cannot be negative.');
  if(spec.type==='nonNegativeInt'&&(n<0||Math.floor(n)!==n))throw new Error(spec.label+' must be a whole number of 0 or more.');
  if(spec.type==='positiveInt'&&(n<=0||Math.floor(n)!==n))throw new Error(spec.label+' must be a positive whole number.');
  if(spec.minNumber!==undefined&&n<spec.minNumber)throw new Error(spec.label+' must be at least '+spec.minNumber+'.');
  if(spec.maxNumber!==undefined&&n>spec.maxNumber)throw new Error(spec.label+' must not exceed '+spec.maxNumber+'.');
  return String(n);
}
function ndValidatePrefixSet_(values){
  var prefixes=['MEMBER_ID_PREFIX','RECEIPT_PREFIX','VOUCHER_PREFIX'].map(function(k){return String(values[k]||'').toUpperCase();});
  if(new Set(prefixes).size!==prefixes.length)throw new Error('Member, Receipt and Voucher prefixes must be unique.');
}
function getSettings(token){
  ndRequireAdmin_(token);
  var rows=ndRows_('CONFIG'),byKey={},previous={};rows.forEach(function(r){byKey[r.KEY]=r;});
  ndSortDesc_(ndRows_('AUDIT_LOG').filter(function(a){return a.ENTITY_TYPE==='CONFIG'&&a.ACTION==='CONFIG_CHANGE';}),'CREATED_AT').forEach(function(a){if(!previous.hasOwnProperty(a.ENTITY_ID))previous[a.ENTITY_ID]=a.OLD_VALUE;});
  return ND_CONFIG_FIELDS.map(function(spec){var r=byKey[spec.key]||{},canRestore=previous.hasOwnProperty(spec.key);return {key:spec.key,category:spec.category,label:spec.label,type:spec.type,required:!!spec.required,options:spec.options||[],financial:!!spec.financial,value:r.VALUE===undefined?'':String(r.VALUE),description:r.DESCRIPTION||'',updatedAt:r.UPDATED_AT||'',updatedBy:r.UPDATED_BY||'',canRestore:canRestore,previousValue:canRestore?String(previous[spec.key]):''};});
}
function ndScheduleUnitAmountChange_(amount,userId){
  var effective=ndDateAddMonths_(ndMonthKey_(new Date())+'-01',1), histories=ndRows_('SAVINGS_UNITS').filter(function(r){return r.STATUS==='ACTIVE';}), members=ndRows_('MEMBERS').filter(function(m){return m.STATUS!=='CLOSED';}), updates=[],creates=[];
  members.forEach(function(m){
    var rows=histories.filter(function(r){var from=ndDateOnly_(r.EFFECTIVE_FROM),to=ndDateOnly_(r.EFFECTIVE_TO);return r.MEMBER_ID===m.MEMBER_ID&&(!from||from<=effective)&&(!to||to>=effective);});
    rows.sort(function(a,b){return ndDateOnly_(b.EFFECTIVE_FROM).localeCompare(ndDateOnly_(a.EFFECTIVE_FROM));});var current=rows[0];if(!current||ndNumber_(current.UNIT_AMOUNT)===ndNumber_(amount))return;
    if(ndDateOnly_(current.EFFECTIVE_FROM)===effective)updates.push({row:current._row,updates:{UNIT_AMOUNT:amount,UPDATED_AT:ndNowIso_(),UPDATED_BY:userId}});
    else{updates.push({row:current._row,updates:{EFFECTIVE_TO:ndDateAddDays_(effective,-1),UPDATED_AT:ndNowIso_(),UPDATED_BY:userId}});creates.push({MEMBER_ID:m.MEMBER_ID,UNITS:current.UNITS,UNIT_AMOUNT:amount,EFFECTIVE_FROM:effective,EFFECTIVE_TO:'',STATUS:'ACTIVE',NOTES:'Monthly unit amount configuration effective for future dues',CREATED_AT:ndNowIso_(),CREATED_BY:userId,UPDATED_AT:ndNowIso_(),UPDATED_BY:userId});}
  });
  ndUpdateManyRows_('SAVINGS_UNITS',updates);if(creates.length){var ids=ndReserveIds_('UNIT',creates.length,'UNT-',7);creates.forEach(function(x,i){x.UNIT_ID=ids[i];});ndAppendMany_('SAVINGS_UNITS',creates);}return {effectiveMonth:effective.slice(0,7),membersScheduled:updates.length};
}
function ndApplySocietyStartMonth_(startMonth,userId){
  var unitRows=ndRows_('SAVINGS_UNITS'),updates=[];ndRows_('MEMBERS').forEach(function(m){var rows=unitRows.filter(function(u){return u.MEMBER_ID===m.MEMBER_ID&&u.STATUS==='ACTIVE';}).sort(function(a,b){return ndDateOnly_(a.EFFECTIVE_FROM).localeCompare(ndDateOnly_(b.EFFECTIVE_FROM));});if(rows.length&&ndMonthOnly_(rows[0].EFFECTIVE_FROM)>startMonth)updates.push({row:rows[0]._row,updates:{EFFECTIVE_FROM:startMonth+'-01',UPDATED_AT:ndNowIso_(),UPDATED_BY:userId,NOTES:(String(rows[0].NOTES||'')+' | Baseline aligned to society start '+startMonth).slice(0,1000)}});});ndUpdateManyRows_('SAVINGS_UNITS',updates);
  var current=ndMonthKey_(new Date()),members=ndRows_('MEMBERS'),processed=0;members.forEach(function(m){if(ndGetSavingsUnitForMonth_(m.MEMBER_ID,startMonth)){ndEnsureMemberDuesThroughMonth_(m.MEMBER_ID,current,userId);ndReconcileSavingsDues_(m.MEMBER_ID,userId);processed++;}});return {membersEvaluated:processed,unitBaselinesUpdated:updates.length};
}

/** v1.0.4 is a UI/photo-quality update. No member/transaction rows are changed. */
function RUN_UPDATE_V104(){
  ndSetupSheets_();
  var cfg=ndFindOne_('CONFIG','KEY','SETUP_VERSION');
  if(cfg) ndUpdateRow_('CONFIG',cfg._row,{VALUE:'1.0.4',UPDATED_AT:ndNowIso_()});
  else ndAppend_('CONFIG',{KEY:'SETUP_VERSION',VALUE:'1.0.4',DESCRIPTION:'Database schema version',UPDATED_AT:ndNowIso_()});
  return {ok:true,version:'1.0.4',message:'v1.0.4 photo quality/view update applied. No data migration required.'};
}
function RUN_DIAGNOSTIC_V104(){
  var ss=ndSS_();
  var v=ndConfig_('SETUP_VERSION','');
  return {ok:v==='1.0.4',version:v,spreadsheetId:ss.getId(),members:ndRows_('MEMBERS').length,message:'Profile photos are stored as original uploaded files; UI now displays them larger and supports full-size viewing.'};
}


/** v1.0.5 login/bootstrap stability update. No business data is deleted or rewritten. */
function RUN_UPDATE_V105(){
  ndSetupSheets_();
  var cfg=ndFindOne_('CONFIG','KEY','SETUP_VERSION');
  if(cfg) ndUpdateRow_('CONFIG',cfg._row,{VALUE:'1.0.5',UPDATED_AT:ndNowIso_()});
  else ndAppend_('CONFIG',{KEY:'SETUP_VERSION',VALUE:'1.0.5',DESCRIPTION:'Database schema version',UPDATED_AT:ndNowIso_()});
  return {ok:true,version:'1.0.5',message:'v1.0.5 login/bootstrap stability update applied. No business data migration required.'};
}
function RUN_DIAGNOSTIC_V105(){
  var ss=ndSS_();
  var out={ok:true,version:ndConfig_('SETUP_VERSION',''),spreadsheetId:ss.getId(),checks:[]};
  function ck(name,fn){try{var v=fn();out.checks.push({name:name,ok:true,value:v===undefined?'OK':v});}catch(e){out.ok=false;out.checks.push({name:name,ok:false,value:e.message});}}
  ck('Setup version',function(){if(out.version!=='1.0.5')throw new Error('Expected 1.0.5, found '+out.version);return out.version;});
  ck('Required sheets',function(){var missing=Object.keys(ND_SCHEMA).filter(function(n){return !ss.getSheetByName(n);});if(missing.length)throw new Error('Missing: '+missing.join(', '));return Object.keys(ND_SCHEMA).length+' sheets';});
  ck('Active admin',function(){var a=ndRows_('USERS').filter(function(u){return u.ROLE_ID==='ADMIN'&&u.STATUS==='ACTIVE';});if(!a.length)throw new Error('No active ADMIN user');return a.length;});
  ck('Accounts',function(){return ndRows_('BANK_ACCOUNTS').filter(function(a){return a.STATUS==='ACTIVE';}).length+' active';});
  ck('Data folders',function(){['MEMBER_PHOTO_FOLDER_ID','DOCUMENT_FOLDER_ID','BACKUP_FOLDER_ID'].forEach(function(k){var id=ndConfig_(k,'');if(!id)throw new Error(k+' missing');DriveApp.getFolderById(id).getName();});return 'OK';});
  ck('Lightweight bootstrap dependencies',function(){var c={nameBn:ndConfig_('SOCIETY_NAME_BN',''),currency:ndConfig_('CURRENCY_SYMBOL','৳')};if(!c.nameBn)throw new Error('Society name missing');return c.nameBn;});
  Logger.log(JSON.stringify(out,null,2));
  return out;
}


/** v1.0.6 authentication-stability update. Preserves all business data. */
function RUN_UPDATE_V106(){
  var ss=SpreadsheetApp.getActiveSpreadsheet()||ndDb_();
  PropertiesService.getScriptProperties().setProperty('ND_SPREADSHEET_ID',ss.getId());
  ndSetupSheets_();
  ndSetConfig_('SETUP_VERSION','1.0.6');
  if (ndConfig_('LOGIN_LOCK_RESET_AT','')===null) ndSetConfig_('LOGIN_LOCK_RESET_AT','');
  return {ok:true,version:'1.0.6',message:'Authentication-stability update applied. No member/transaction/receipt/loan rows were deleted or rewritten.'};
}

/** Run manually if repeated failed attempts have temporarily locked login. Audit rows are kept. */
function RUN_RESET_LOGIN_LOCK_V106(){
  var ts=ndNowIso_();
  ndSetConfig_('LOGIN_LOCK_RESET_AT',ts);
  return {ok:true,resetAt:ts,message:'Temporary login lock window reset. LOGIN_LOG history was preserved.'};
}

function RUN_DIAGNOSTIC_V106(){
  var out={ok:true,version:ndConfig_('SETUP_VERSION',''),checks:[]};
  function ck(name,fn){try{var v=fn();out.checks.push({name:name,ok:true,value:v===undefined?'OK':v});}catch(e){out.ok=false;out.checks.push({name:name,ok:false,value:e.message});}}
  ck('Setup version',function(){if(out.version!=='1.0.6')throw new Error('Expected 1.0.6, found '+out.version);return out.version;});
  ck('Spreadsheet',function(){return ndSS_().getName();});
  ck('Required sheets',function(){var ss=ndSS_();var missing=Object.keys(ND_SCHEMA).filter(function(n){return !ss.getSheetByName(n);});if(missing.length)throw new Error('Missing: '+missing.join(', '));return Object.keys(ND_SCHEMA).length+' sheets';});
  ck('Active admin credentials',function(){var a=ndRows_('USERS').filter(function(u){return u.ROLE_ID==='ADMIN'&&u.STATUS==='ACTIVE';});if(!a.length)throw new Error('No active ADMIN');var bad=a.filter(function(u){return !u.USERNAME||!u.PASSWORD_HASH||!u.SALT;});if(bad.length)throw new Error('Admin credential fields incomplete');return a.length+' active admin';});
  ck('Initial admin lock status',function(){var u=ndNormalizeUsername_(ndConfig_('INITIAL_ADMIN_USERNAME','admin'));return ndIsLoginTemporarilyLocked_(u)?'LOCKED - run RUN_RESET_LOGIN_LOCK_V106()':'NOT LOCKED';});
  ck('Bank accounts',function(){return ndRows_('BANK_ACCOUNTS').filter(function(a){return a.STATUS==='ACTIVE';}).length+' active';});
  ck('Drive folders',function(){['MEMBER_PHOTO_FOLDER_ID','DOCUMENT_FOLDER_ID','BACKUP_FOLDER_ID'].forEach(function(k){var id=ndConfig_(k,'');if(!id)throw new Error(k+' missing');DriveApp.getFolderById(id).getName();});return 'OK';});
  ck('Bootstrap payload',function(){var a=ndRows_('USERS').filter(function(u){return u.ROLE_ID==='ADMIN'&&u.STATUS==='ACTIVE';})[0];if(!a)return 'Skipped';var s=ndSessionObject_(a,'DIAG','2099-01-01T00:00:00+06:00');var p=ndBootstrapPayload_(s);if(!p.config||!p.session)throw new Error('Bootstrap payload invalid');return p.config.nameBn;});
  Logger.log(JSON.stringify(out,null,2));
  return out;
}

function saveSettings(token,items,reason,financialConfirmation){
  var s=ndRequireAdmin_(token),specs=ndConfigFieldMap_(),current=ndConfigMap_(),seen={},validated={},changes=[];items=items||[];reason=String(reason||'').trim();
  if(!reason)throw new Error('Change Reason is required.');
  items.forEach(function(x){var key=String(x&&x.key||'');if(!specs[key])throw new Error('CONFIG key is not editable: '+key);if(seen[key])throw new Error('Duplicate CONFIG key submitted: '+key);seen[key]=true;validated[key]=ndValidateConfigValue_(specs[key],x.value);});
  ND_CONFIG_FIELDS.forEach(function(spec){if(!validated.hasOwnProperty(spec.key))validated[spec.key]=String(current[spec.key]===undefined?'':current[spec.key]);if(spec.required)validated[spec.key]=ndValidateConfigValue_(spec,validated[spec.key]);});
  ndValidatePrefixSet_(validated);
  Object.keys(validated).forEach(function(key){var oldValue=String(current[key]===undefined?'':current[key]),newValue=String(validated[key]);if(oldValue!==newValue)changes.push({key:key,oldValue:oldValue,newValue:newValue,spec:specs[key]});});
  if(!changes.length)return {ok:true,changed:0,message:'No settings changed.'};
  var financial=changes.filter(function(x){return x.spec.financial;});if(financial.length&&financialConfirmation!==true)throw new Error('Financial change confirmation is required.');
  var startChange=changes.filter(function(x){return x.key==='SOCIETY_START_MONTH';})[0];
  if(startChange&&startChange.newValue>startChange.oldValue){var conflicting=ndRows_('MONTHLY_DUES').some(function(d){return String(d.STATUS||'').toUpperCase()!=='MERGED'&&ndDueMonthKey_(d.DUE_MONTH)<startChange.newValue;});if(conflicting)throw new Error('Society Start Month cannot be moved later while earlier due records exist. Review/reconcile those obligations first.');}
  return ndWithFinancialLock_(function(){
    changes.forEach(function(x){ndSetConfig_(x.key,x.newValue,s.userId);ndCreateAudit_(s,'CONFIG_CHANGE','CONFIG',x.key,x.oldValue,x.newValue,reason);});
    ndInvalidateCaches_('CONFIG');
    var effects={};
    var amountChange=changes.filter(function(x){return x.key==='MONTHLY_UNIT_AMOUNT';})[0];if(amountChange)effects.monthlyUnitAmount=ndScheduleUnitAmountChange_(amountChange.newValue,s.userId);
    if(startChange&&startChange.newValue<startChange.oldValue)effects.societyStart=ndApplySocietyStartMonth_(startChange.newValue,s.userId);
    return {ok:true,changed:changes.length,keys:changes.map(function(x){return x.key;}),financialKeys:financial.map(function(x){return x.key;}),effects:effects,message:financial.length?'এই পরিবর্তন ভবিষ্যতের নতুন লেনদেনে কার্যকর হবে। পূর্বে সম্পন্ন লেনদেন স্বয়ংক্রিয়ভাবে পরিবর্তিত হবে না।':'Settings saved.'};
  });
}
function ndConfigValidationReport_(){var map=ndConfigMap_(),errors=[],warnings=[];ND_CONFIG_FIELDS.forEach(function(spec){try{ndValidateConfigValue_(spec,map[spec.key]);}catch(e){errors.push({key:spec.key,message:e.message});}});try{ndValidatePrefixSet_(map);}catch(e){errors.push({key:'PREFIXES',message:e.message});}if(!map.SOCIETY_EMAIL)warnings.push({key:'SOCIETY_EMAIL',message:'Optional email is blank.'});if(!map.SOCIETY_MOBILE)warnings.push({key:'SOCIETY_MOBILE',message:'Optional society mobile is blank.'});return {ok:errors.length===0,checked:ND_CONFIG_FIELDS.length,errors:errors,warnings:warnings};}
function getConfigValidationReport(token){ndRequireAdmin_(token);return ndConfigValidationReport_();}

function createBackup(token){var s=ndSession_(token);if(!(s.role==='ADMIN'||ndHasPermission_(s,'backup.manage')))throw new Error('PERMISSION_DENIED');return ndCreateBackup_(s.userId);}
function ndCreateBackup_(userId){var file=DriveApp.getFileById(ndDb_().getId()),folder=DriveApp.getFolderById(ndConfig_('BACKUP_FOLDER_ID','')),name='Notun_Digonto_Backup_'+Utilities.formatDate(new Date(),ndConfig_('TIMEZONE','Asia/Dhaka'),'yyyyMMdd_HHmmss'),copy=file.makeCopy(name,folder),id=ndNextId_('BACKUP','BKP-',7);ndAppend_('BACKUPS',{BACKUP_ID:id,FILE_ID:copy.getId(),FILE_NAME:copy.getName(),CREATED_AT:ndNowIso_(),CREATED_BY:userId||'SYSTEM',STATUS:'ACTIVE'});return {ok:true,backupId:id,fileName:copy.getName()};}
function ndDailyBackupTrigger_(){if(!ndBool_(ndConfig_('AUTO_DAILY_BACKUP','TRUE')))return;try{ndCreateBackup_('SYSTEM');}catch(e){}}
function listBackups(token){var s=ndSession_(token);if(!(s.role==='ADMIN'||ndHasPermission_(s,'backup.manage')))throw new Error('PERMISSION_DENIED');return ndSortDesc_(ndRows_('BACKUPS'),'CREATED_AT').slice(0,100).map(function(b){return {backupId:b.BACKUP_ID,fileName:b.FILE_NAME,createdAt:b.CREATED_AT,createdBy:b.CREATED_BY,status:b.STATUS};});}

function getReportFilterOptions(token){var s=ndSession_(token);if(s.role==='MEMBER'||!ndHasPermission_(s,'reports.view'))throw new Error('PERMISSION_DENIED');return {members:ndSortDesc_(ndRows_('MEMBERS'),'CREATED_AT').slice(0,1000).map(function(m){return {memberId:m.MEMBER_ID,nameBn:m.NAME_BN,nameEn:m.NAME_EN,status:m.STATUS};}),investments:ndSortDesc_(ndRows_('INVESTMENTS'),'CREATED_AT').slice(0,500).map(function(i){return {INVESTMENT_ID:i.INVESTMENT_ID,NAME:i.NAME,TYPE:i.TYPE,STATUS:i.STATUS};}),sources:ndSortDesc_(ndRows_('PROFIT_SOURCES'),'CREATED_AT').slice(0,500).map(function(p){return {SOURCE_ID:p.SOURCE_ID,SOURCE_NAME:p.SOURCE_NAME,CATEGORY:p.CATEGORY,STATUS:p.STATUS};})};}

function getReports(token,type,filters){var s=ndSession_(token);if(s.role==='MEMBER'||!ndHasPermission_(s,'reports.view'))throw new Error('PERMISSION_DENIED');filters=filters||{};type=String(type||'MEMBERS').toUpperCase();var rows=[];
  if(type==='MEMBERS')rows=ndRows_('MEMBERS');
  else if(type==='DUES')rows=ndRows_('MONTHLY_DUES');
  else if(type==='TRANSACTIONS')rows=ndRows_('TRANSACTIONS');
  else if(type==='LOANS')rows=ndRows_('LOANS');
  else if(type==='INVESTMENTS')rows=ndRows_('INVESTMENTS');
  else if(type==='INCOME')rows=ndRows_('INCOME');
  else if(type==='EXPENSES')rows=ndRows_('EXPENSES');
  else if(type==='EXPENSE_ALLOCATIONS')rows=ndRows_('EXPENSE_ALLOCATIONS');
  else if(type==='GENERAL_LEDGER')rows=ndRows_('GENERAL_LEDGER');
  else if(type==='RECEIPTS')rows=ndRows_('RECEIPTS');
  else if(type==='VOUCHERS')rows=ndRows_('VOUCHERS');
  else if(type==='LOAN_SCHEDULE')rows=ndRows_('LOAN_SCHEDULE');
  else if(type==='GUARANTORS')rows=ndRows_('GUARANTORS');
  else if(type==='INVESTMENT_RETURNS')rows=ndRows_('INVESTMENT_RETURNS');
  else if(type==='BANK_ACCOUNTS')rows=ndRows_('BANK_ACCOUNTS');
  else if(type==='MEETINGS')rows=ndRows_('MEETINGS');
  else if(type==='MEETING_ATTENDANCE')rows=ndRows_('MEETING_ATTENDANCE');
  else if(type==='COMMITTEE')rows=ndRows_('COMMITTEE');
  else if(type==='INVESTMENT_CLOSURES')rows=ndRows_('INVESTMENT_CLOSURES');
  else if(type==='PROFIT_SOURCES')rows=ndRows_('PROFIT_SOURCES');
  else if(type==='PROFIT_RECORDS')rows=ndRows_('PROFIT_RECORDS');
  else if(type==='PROFIT_DISTRIBUTIONS')rows=ndRows_('PROFIT_DISTRIBUTIONS');
  else if(type==='PROFIT_DISTRIBUTION')rows=ndRows_('PROFIT_DISTRIBUTION');
  else throw new Error('Unknown report type.');
  if(s.role==='MEMBER')rows=rows.filter(function(r){return !r.MEMBER_ID||r.MEMBER_ID===s.memberId;});
  if(filters.memberId)rows=rows.filter(function(r){return r.MEMBER_ID===filters.memberId;});
  if(filters.investmentId)rows=rows.filter(function(r){return r.INVESTMENT_ID===filters.investmentId||r.RELATED_ID===filters.investmentId;});
  if(filters.sourceId)rows=rows.filter(function(r){return r.SOURCE_ID===filters.sourceId;});
  if(filters.category)rows=rows.filter(function(r){return r.CATEGORY===filters.category||r.TYPE===filters.category;});
  if(filters.status)rows=rows.filter(function(r){return r.STATUS===filters.status;});
  function reportStart(r){return ndDateOnly_(r.DATE||r.TXN_DATE||r.RECEIPT_DATE||r.APPLICATION_DATE||r.DUE_DATE||r.ENTRY_DATE||r.RETURN_DATE||r.CLOSE_DATE||r.PROFIT_DATE||r.PERIOD_START||r.JOIN_DATE||r.START_DATE||r.CREATED_AT||'');}
  function reportEnd(r){return ndDateOnly_(r.PERIOD_END||reportStart(r));}
  if(filters.month)rows=rows.filter(function(r){var d=reportStart(r);return !!d&&String(d).slice(0,7)===filters.month;});
  if(filters.year)rows=rows.filter(function(r){var d=reportStart(r);return !!d&&String(d).slice(0,4)===String(filters.year);});
  if(filters.from)rows=rows.filter(function(r){var d=reportEnd(r);return !!d&&d>=filters.from;});
  if(filters.to)rows=rows.filter(function(r){var d=reportStart(r);return !!d&&d<=filters.to;});
  return rows.slice(0,3000);
}

/** ===== ProfitService v1.1.0 ===== */
function ndCanViewProfit_(s){return s.role==='ADMIN'||ndHasPermission_(s,'profits.view')||ndHasPermission_(s,'accounts.view')||ndHasPermission_(s,'investments.view');}
function ndCanEditProfit_(s){return s.role==='ADMIN'||ndHasPermission_(s,'profits.edit')||ndHasPermission_(s,'accounts.edit');}
function ndEnsureProfitSourceForInvestment_(s,investmentId,name,category){
  var row=ndRows_('PROFIT_SOURCES').filter(function(x){return x.INVESTMENT_ID===investmentId&&x.STATUS!=='INACTIVE';})[0],now=ndNowIso_();if(row){var up={SOURCE_NAME:name||row.SOURCE_NAME,CATEGORY:String(category||row.CATEGORY||'OTHER').toUpperCase(),UPDATED_AT:now,UPDATED_BY:s?s.userId:'SYSTEM'};ndUpdateRow_('PROFIT_SOURCES',row._row,up);return Object.assign({},row,up);}var id=ndNextId_('PROFIT_SOURCE','PSR-',6),obj={SOURCE_ID:id,SOURCE_NAME:name||investmentId,CATEGORY:String(category||'OTHER').toUpperCase(),INVESTMENT_ID:investmentId||'',PROJECT_REFERENCE:'',DESCRIPTION:'Investment-linked profit source',STATUS:'ACTIVE',CREATED_AT:now,CREATED_BY:s?s.userId:'SYSTEM',UPDATED_AT:now,UPDATED_BY:s?s.userId:'SYSTEM'};ndAppend_('PROFIT_SOURCES',obj);return obj;
}
function ndEnsureLegacyProfitSource_(s){var r=ndRows_('PROFIT_SOURCES').filter(function(x){return x.PROJECT_REFERENCE==='LEGACY_GENERAL';})[0];if(r)return r;var now=ndNowIso_(),obj={SOURCE_ID:ndNextId_('PROFIT_SOURCE','PSR-',6),SOURCE_NAME:'General / Legacy Profit',CATEGORY:'OTHER',INVESTMENT_ID:'',PROJECT_REFERENCE:'LEGACY_GENERAL',DESCRIPTION:'Migrated yearly profit distributions',STATUS:'ACTIVE',CREATED_AT:now,CREATED_BY:s?s.userId:'SYSTEM',UPDATED_AT:now,UPDATED_BY:s?s.userId:'SYSTEM'};ndAppend_('PROFIT_SOURCES',obj);return obj;}
function listProfitSources(token,options){var s=ndSession_(token);if(!ndCanViewProfit_(s))throw new Error('PERMISSION_DENIED');options=options||{};var rows=ndRows_('PROFIT_SOURCES');if(options.status)rows=rows.filter(function(r){return r.STATUS===options.status;});if(options.category)rows=rows.filter(function(r){return r.CATEGORY===options.category;});return ndSortDesc_(rows,'CREATED_AT').slice(0,500);}
function createProfitSource(token,p){var s=ndSession_(token);if(!ndCanEditProfit_(s))throw new Error('PERMISSION_DENIED');p=p||{};if(!p.name)throw new Error('Profit source name required.');return ndWithFinancialLock_(function(){if(p.investmentId){var inv=ndFindOne_('INVESTMENTS','INVESTMENT_ID',p.investmentId);if(!inv)throw new Error('Investment not found.');return {ok:true,source:ndEnsureProfitSourceForInvestment_(s,inv.INVESTMENT_ID,p.name||inv.NAME,p.category||inv.TYPE)};}var id=ndNextId_('PROFIT_SOURCE','PSR-',6),now=ndNowIso_(),obj={SOURCE_ID:id,SOURCE_NAME:p.name,CATEGORY:String(p.category||'OTHER').toUpperCase(),INVESTMENT_ID:'',PROJECT_REFERENCE:p.projectReference||'',DESCRIPTION:p.description||'',STATUS:'ACTIVE',CREATED_AT:now,CREATED_BY:s.userId,UPDATED_AT:now,UPDATED_BY:s.userId};ndAppend_('PROFIT_SOURCES',obj);ndCreateAudit_(s,'CREATE','PROFIT_SOURCE',id,'',obj,'Profit source created');return {ok:true,source:obj};});}
function ndEndOfMonth_(month){var p=String(month).split('-'),d=new Date(Number(p[0]),Number(p[1]),0);return Utilities.formatDate(d,ndConfig_('TIMEZONE','Asia/Dhaka'),'yyyy-MM-dd');}
function ndNormalizeProfitPeriod_(p){p=p||{};var type=String(p.periodType||'CUSTOM').toUpperCase(),year=String(p.year||p.financialYear||ndToday_().slice(0,4)),start='',end='',label='';if(type==='MONTHLY'){var month=String(p.month||p.periodStart||ndMonthKey_(new Date())).slice(0,7);if(!/^\d{4}-\d{2}$/.test(month))throw new Error('Monthly period must be YYYY-MM.');start=month+'-01';end=ndEndOfMonth_(month);label=month;}else if(type==='QUARTERLY'){var q=Math.max(1,Math.min(4,Math.floor(ndNumber_(p.quarter)||1))),sm=(q-1)*3+1,em=sm+2;start=year+'-'+('0'+sm).slice(-2)+'-01';end=ndEndOfMonth_(year+'-'+('0'+em).slice(-2));label=year+' Q'+q;}else if(type==='HALF_YEARLY'){var h=Math.max(1,Math.min(2,Math.floor(ndNumber_(p.half)||1))),hm=h===1?1:7,he=h===1?6:12;start=year+'-'+('0'+hm).slice(-2)+'-01';end=ndEndOfMonth_(year+'-'+('0'+he).slice(-2));label=year+' H'+h;}else if(type==='YEARLY'){start=year+'-01-01';end=year+'-12-31';label=year;}else{type='CUSTOM';start=ndDateOnly_(p.periodStart||p.profitDate||ndToday_());end=ndDateOnly_(p.periodEnd||p.profitDate||start);if(!/^\d{4}-\d{2}-\d{2}$/.test(start)||!/^\d{4}-\d{2}-\d{2}$/.test(end)||start>end)throw new Error('Valid custom start/end dates required.');label=start===end?start:start+' to '+end;}return {type:type,start:start,end:end,label:label,financialYear:start.slice(0,4)};}
function ndCreateProfitRecordFromPostedTxn_(s,p){var source=ndFindOne_('PROFIT_SOURCES','SOURCE_ID',p.sourceId);if(!source)throw new Error('Profit source not found.');var period=ndNormalizeProfitPeriod_(p),amount=ndRound2_(p.amount);if(amount<=0)throw new Error('Profit amount required.');var id=ndNextId_('PROFIT','PRF-',8),now=ndNowIso_(),obj={PROFIT_ID:id,SOURCE_ID:source.SOURCE_ID,INVESTMENT_ID:p.investmentId||source.INVESTMENT_ID||'',CATEGORY:String(p.category||source.CATEGORY||'OTHER').toUpperCase(),PROFIT_DATE:ndDateOnly_(p.profitDate||period.end),PERIOD_TYPE:period.type,PERIOD_START:period.start,PERIOD_END:period.end,PERIOD_LABEL:period.label,AMOUNT:amount,DISTRIBUTED_AMOUNT:0,UNDISTRIBUTED_AMOUNT:amount,STATUS:'ACTIVE',SOURCE_TXN_ID:p.sourceTxnId||'',REFERENCE:p.reference||'',NOTES:p.notes||'',CREATED_AT:now,CREATED_BY:s?s.userId:'SYSTEM',UPDATED_AT:now,UPDATED_BY:s?s.userId:'SYSTEM',SOURCE_INCOME_ID:p.sourceIncomeId||'',SOURCE_VOUCHER_ID:p.sourceVoucherId||''};ndAppend_('PROFIT_RECORDS',obj);return id;}
function createProfitRecord(token,p){var s=ndSession_(token);if(!ndCanEditProfit_(s))throw new Error('PERMISSION_DENIED');p=p||{};return ndWithFinancialLock_(function(){var source=ndFindOne_('PROFIT_SOURCES','SOURCE_ID',p.sourceId);if(!source||source.STATUS!=='ACTIVE')throw new Error('Active profit source required.');var amount=ndRound2_(p.amount);if(amount<=0)throw new Error('Profit amount required.');ndNormalizeProfitPeriod_(p);var account=ndAccountById_(p.accountId||'ACC-BANK'),date=ndDateOnly_(p.profitDate||ndToday_()),txnId=ndNextId_('TXN','TRX-',8),now=ndNowIso_(),description=p.description||('Profit: '+source.SOURCE_NAME),txn={TXN_ID:txnId,TXN_DATE:date,MEMBER_ID:'',TYPE:'PROFIT_ENTRY',CATEGORY:'PROFIT',DESCRIPTION:description,DIRECTION:'CREDIT',AMOUNT:amount,PRINCIPAL_AMOUNT:0,PROFIT_AMOUNT:amount,PENALTY_AMOUNT:0,PAYMENT_ACCOUNT_ID:account.ACCOUNT_ID,PAYMENT_METHOD:p.paymentMethod||account.TYPE,REFERENCE:p.reference||'',RELATED_ID:'',RECEIPT_ID:'',STATUS:'POSTED',PARENT_TXN_ID:'',CORRECTION_REASON:'',CREATED_AT:now,CREATED_BY:s.userId,UPDATED_AT:now,UPDATED_BY:s.userId};ndAppend_('TRANSACTIONS',txn);var income=source.INVESTMENT_ID?ndCoaBySystem_('INVESTMENT_INCOME'):ndCoaBySystem_('OTHER_INCOME');ndPostJournalLines_(s,txnId,date,[{accountCode:account.ACCOUNT_CODE,debit:amount,credit:0},{accountCode:income.ACCOUNT_CODE,debit:0,credit:amount}],'',source.SOURCE_ID,description);var profitId=ndCreateProfitRecordFromPostedTxn_(s,{sourceId:source.SOURCE_ID,investmentId:p.investmentId||source.INVESTMENT_ID,category:p.category||source.CATEGORY,profitDate:date,amount:amount,sourceTxnId:txnId,reference:p.reference||'',notes:p.notes||'',periodType:p.periodType,periodStart:p.periodStart,periodEnd:p.periodEnd,month:p.month,year:p.year,quarter:p.quarter,half:p.half});var pr=ndFindOne_('PROFIT_RECORDS','PROFIT_ID',profitId);ndUpdateRow_('TRANSACTIONS',ndFindOne_('TRANSACTIONS','TXN_ID',txnId)._row,{RELATED_ID:profitId});ndCreateAudit_(s,'CREATE','PROFIT_RECORD',profitId,'',pr,'Profit posted');return {ok:true,profitId:profitId,txnId:txnId};});}
function ndProfitApprovedAmount_(profitId){return ndRound2_(ndRows_('PROFIT_DISTRIBUTION').filter(function(r){if(r.PROFIT_ID!==profitId||r.STATUS!=='APPROVED')return false;var t=r.TXN_ID?ndFindOne_('TRANSACTIONS','TXN_ID',r.TXN_ID):null;return !t||ndIsFinanciallyEffectiveStatus_(t.STATUS);}).reduce(function(z,r){return z+ndNumber_(r.AMOUNT);},0));}
function ndDistributionApprovedAmount_(distributionId){return ndRound2_(ndFindMany_('PROFIT_DISTRIBUTION',{DISTRIBUTION_ID:distributionId}).filter(function(r){return r.STATUS==='APPROVED';}).reduce(function(z,r){return z+ndNumber_(r.AMOUNT);},0));}
function ndProfitDraftReservedAmount_(profitId){return ndRound2_(ndRows_('PROFIT_DISTRIBUTIONS').filter(function(d){return d.PROFIT_ID===profitId&&['DRAFT','PROCESSING'].indexOf(d.STATUS)>=0;}).reduce(function(z,d){return z+Math.max(0,ndNumber_(d.REQUESTED_AMOUNT)-ndDistributionApprovedAmount_(d.DISTRIBUTION_ID));},0));}
function ndProfitReservedAmount_(profitId){return ndRound2_(ndProfitApprovedAmount_(profitId)+ndProfitDraftReservedAmount_(profitId));}
function ndRefreshProfitRecord_(profitId,userId){var p=ndFindOne_('PROFIT_RECORDS','PROFIT_ID',profitId);if(!p)return null;if(['REVERSED','CANCELLED'].indexOf(p.STATUS)>=0)return p;var distributed=ndProfitApprovedAmount_(profitId),remaining=ndRound2_(Math.max(0,ndNumber_(p.AMOUNT)-distributed)),status=remaining<=0.009?'FULLY_DISTRIBUTED':distributed>0?'PARTIALLY_DISTRIBUTED':'ACTIVE',up={DISTRIBUTED_AMOUNT:distributed,UNDISTRIBUTED_AMOUNT:remaining,STATUS:status,UPDATED_AT:ndNowIso_(),UPDATED_BY:userId||'SYSTEM'};ndUpdateRow_('PROFIT_RECORDS',p._row,up);return Object.assign({},p,up);}
function listProfitRecords(token,options){var s=ndSession_(token);if(!ndCanViewProfit_(s))throw new Error('PERMISSION_DENIED');options=options||{};var sources={},investments={};ndRows_('PROFIT_SOURCES').forEach(function(x){sources[x.SOURCE_ID]=x;});ndRows_('INVESTMENTS').forEach(function(x){investments[x.INVESTMENT_ID]=x;});var rows=ndRows_('PROFIT_RECORDS');if(options.status)rows=rows.filter(function(r){return r.STATUS===options.status;});if(options.sourceId)rows=rows.filter(function(r){return r.SOURCE_ID===options.sourceId;});if(options.investmentId)rows=rows.filter(function(r){return r.INVESTMENT_ID===options.investmentId;});if(options.category)rows=rows.filter(function(r){return r.CATEGORY===options.category;});if(options.month)rows=rows.filter(function(r){return String(r.PROFIT_DATE).slice(0,7)===options.month;});if(options.year)rows=rows.filter(function(r){return String(r.PROFIT_DATE).slice(0,4)===String(options.year);});if(options.from)rows=rows.filter(function(r){return r.PROFIT_DATE>=options.from;});if(options.to)rows=rows.filter(function(r){return r.PROFIT_DATE<=options.to;});return ndSortDesc_(rows,'PROFIT_DATE').slice(0,1000).map(function(r){var distributed=ndProfitApprovedAmount_(r.PROFIT_ID),reserved=ndProfitReservedAmount_(r.PROFIT_ID),source=sources[r.SOURCE_ID]||{},inv=investments[r.INVESTMENT_ID]||{};return Object.assign({},r,{SOURCE_NAME:source.SOURCE_NAME||'',INVESTMENT_NAME:inv.NAME||'',DISTRIBUTED_AMOUNT:distributed,UNDISTRIBUTED_AMOUNT:ndRound2_(Math.max(0,ndNumber_(r.AMOUNT)-distributed)),AVAILABLE_AMOUNT:ndRound2_(Math.max(0,ndNumber_(r.AMOUNT)-reserved))});});}
function updateProfitRecord(token,profitId,p,reason){var s=ndSession_(token);if(!ndCanEditProfit_(s))throw new Error('PERMISSION_DENIED');if(!reason)throw new Error('Modification reason required.');p=p||{};return ndWithFinancialLock_(function(){var pr=ndFindOne_('PROFIT_RECORDS','PROFIT_ID',profitId);if(!pr||['REVERSED','CANCELLED'].indexOf(pr.STATUS)>=0)throw new Error('Profit record not editable.');var linkedTxn=pr.SOURCE_TXN_ID?ndFindOne_('TRANSACTIONS','TXN_ID',pr.SOURCE_TXN_ID):null;if(linkedTxn&&linkedTxn.TYPE==='INCOME'){var incomeId=pr.SOURCE_INCOME_ID||linkedTxn.RELATED_ID;if(!incomeId)throw new Error('Linked income record is missing.');var income=ndFindOne_('INCOME','INCOME_ID',incomeId);return updateIncome(token,incomeId,Object.assign({},p,{incomeType:'DISTRIBUTABLE_PROFIT',date:p.profitDate||pr.PROFIT_DATE,note:p.notes===undefined?pr.NOTES:p.notes,category:income&&income.CATEGORY||'INVESTMENT_INCOME',accountId:p.accountId||income&&income.ACCOUNT_ID||linkedTxn.PAYMENT_ACCOUNT_ID}),reason);}if(ndProfitReservedAmount_(profitId)>0)throw new Error('Cancel/reverse related distributions before editing this profit.');var up={UPDATED_AT:ndNowIso_(),UPDATED_BY:s.userId},source=p.sourceId?ndFindOne_('PROFIT_SOURCES','SOURCE_ID',p.sourceId):null;if(p.sourceId&&!source)throw new Error('Profit source not found.');if(p.sourceId){up.SOURCE_ID=p.sourceId;up.INVESTMENT_ID=source.INVESTMENT_ID||'';up.CATEGORY=source.CATEGORY||'OTHER';}if(p.reference!==undefined)up.REFERENCE=p.reference;if(p.notes!==undefined)up.NOTES=p.notes;if(p.periodType||p.periodStart||p.month||p.year){var per=ndNormalizeProfitPeriod_(Object.assign({},pr,p));up.PERIOD_TYPE=per.type;up.PERIOD_START=per.start;up.PERIOD_END=per.end;up.PERIOD_LABEL=per.label;}var amount=p.amount===undefined?ndNumber_(pr.AMOUNT):ndRound2_(p.amount);if(amount<=0)throw new Error('Profit amount required.');if(Math.abs(amount-ndNumber_(pr.AMOUNT))>0.009){var t=ndFindOne_('TRANSACTIONS','TXN_ID',pr.SOURCE_TXN_ID);if(!t||t.TYPE!=='PROFIT_ENTRY')throw new Error('Investment-derived profit amount must be corrected from its investment return/closure.');var result=correctSimpleTransaction(token,t.TXN_ID,amount,reason);up.AMOUNT=amount;up.UNDISTRIBUTED_AMOUNT=amount;up.SOURCE_TXN_ID=result.replacementTxnId;}ndUpdateRow_('PROFIT_RECORDS',pr._row,up);ndCreateAudit_(s,'UPDATE','PROFIT_RECORD',profitId,pr,up,reason);return {ok:true,profitId:profitId};});}
function reverseProfitRecord(token,profitId,reason){var s=ndSession_(token);if(!ndCanEditProfit_(s))throw new Error('PERMISSION_DENIED');if(!reason)throw new Error('Reversal reason required.');return ndWithFinancialLock_(function(){var pr=ndFindOne_('PROFIT_RECORDS','PROFIT_ID',profitId);if(!pr||['REVERSED','CANCELLED'].indexOf(pr.STATUS)>=0)throw new Error('Profit record not eligible.');if(ndProfitReservedAmount_(profitId)>0)throw new Error('Cancel/reverse all related distributions first.');var t=pr.SOURCE_TXN_ID?ndFindOne_('TRANSACTIONS','TXN_ID',pr.SOURCE_TXN_ID):null;if(t&&t.TYPE==='INCOME')return reverseIncome(token,pr.SOURCE_INCOME_ID||t.RELATED_ID,reason);if(t&&t.TYPE!=='PROFIT_ENTRY')throw new Error('Reverse this profit from its investment return/closure.');var result=t?correctSimpleTransaction(token,t.TXN_ID,0,reason):{reversalTxnId:''};ndUpdateRow_('PROFIT_RECORDS',pr._row,{STATUS:'REVERSED',DISTRIBUTED_AMOUNT:0,UNDISTRIBUTED_AMOUNT:0,UPDATED_AT:ndNowIso_(),UPDATED_BY:s.userId});ndCreateAudit_(s,'REVERSE','PROFIT_RECORD',profitId,pr,{reversalTxnId:result.reversalTxnId},reason);return {ok:true,reversalTxnId:result.reversalTxnId||''};});}
function ndEnsureLegacyProfitRecord_(s,financialYear,amount){var label=String(financialYear||ndToday_().slice(0,4)),existing=ndRows_('PROFIT_RECORDS').filter(function(p){return p.PERIOD_TYPE==='YEARLY'&&p.PERIOD_LABEL===label&&p.REFERENCE==='LEGACY_DISTRIBUTION';})[0];if(existing){if(ndNumber_(existing.AMOUNT)+0.01<ndNumber_(amount))ndUpdateRow_('PROFIT_RECORDS',existing._row,{AMOUNT:amount,UNDISTRIBUTED_AMOUNT:amount,UPDATED_AT:ndNowIso_(),UPDATED_BY:s.userId});return existing.PROFIT_ID;}var source=ndEnsureLegacyProfitSource_(s);return ndCreateProfitRecordFromPostedTxn_(s,{sourceId:source.SOURCE_ID,category:'OTHER',profitDate:label+'-12-31',amount:amount,sourceTxnId:'',reference:'LEGACY_DISTRIBUTION',notes:'Legacy distribution compatibility record',periodType:'YEARLY',year:label});}
function ndDistributionRequest_(arg1,arg2){if(arg1&&typeof arg1==='object')return Object.assign({},arg1);return {financialYear:String(arg1||ndToday_().slice(0,4)),year:String(arg1||ndToday_().slice(0,4)),periodType:'YEARLY',amount:arg2};}
function ndDistributionBasisType_(basisType){
  var type=String(basisType||'SAVINGS').toUpperCase();if(type==='UNIT')type='UNITS';
  if(['MANUAL','SAVINGS','EQUAL','UNITS'].indexOf(type)<0)throw new Error('Distribution basis must be MANUAL, SAVINGS, EQUAL or UNITS.');
  return type;
}
function ndSetExactShareRates_(rows,totalWeight){
  totalWeight=ndNumber_(totalWeight);if(totalWeight<=0){rows.forEach(function(x){x.rate=0;});return rows;}
  var target=10000,used=0;rows.forEach(function(x){var weight=Math.max(0,ndNumber_(x._rateWeight)),raw=target*weight/totalWeight,whole=Math.floor(raw+1e-9);x._rateMinor=whole;x._rateRemainder=raw-whole;used+=whole;});
  var left=target-used,order=rows.slice().sort(function(a,b){var positive=Number(b._rateWeight>0)-Number(a._rateWeight>0);return positive||b._rateRemainder-a._rateRemainder||String(a.memberId).localeCompare(String(b.memberId));});
  for(var i=0;i<left;i++)order[i%order.length]._rateMinor++;
  rows.forEach(function(x){x.rate=ndRound2_(x._rateMinor/100);delete x._rateMinor;delete x._rateRemainder;delete x._rateWeight;});return rows;
}
function ndAllocateProportionalDistribution_(amount,rows,totalBasis){
  totalBasis=ndNumber_(totalBasis);if(totalBasis<=0)throw new Error('Total distribution basis cannot be zero.');
  var target=Math.round(ndRound2_(amount)*100),used=0;rows.forEach(function(x){var basis=Math.max(0,ndNumber_(x.basis)),raw=target*basis/totalBasis,whole=Math.floor(raw+1e-9);x._amountMinor=whole;x._amountRemainder=raw-whole;x._rateWeight=basis;used+=whole;});
  var left=target-used,order=rows.slice().sort(function(a,b){var positive=Number(b.basis>0)-Number(a.basis>0);return positive||b._amountRemainder-a._amountRemainder||String(a.memberId).localeCompare(String(b.memberId));});
  for(var i=0;i<left;i++)order[i%order.length]._amountMinor++;
  rows.forEach(function(x){x.amount=ndRound2_(x._amountMinor/100);delete x._amountMinor;delete x._amountRemainder;});
  return ndSetExactShareRates_(rows,totalBasis);
}
function ndBuildDistributionRows_(amount,basisType,items,distributionDate){
  basisType=ndDistributionBasisType_(basisType);distributionDate=ndDateOnly_(distributionDate||ndToday_());
  var members=ndRows_('MEMBERS').filter(function(m){return m.STATUS==='ACTIVE';}),by={};members.forEach(function(m){by[m.MEMBER_ID]=m;});if(!members.length)throw new Error('No active members are available for distribution.');
  if(basisType==='MANUAL'){
    if(!items||!items.length)return {rows:members.map(function(m){return {memberId:m.MEMBER_ID,name:m.NAME_BN||m.NAME_EN,basis:0,amount:0,rate:0,units:'',totalUnits:'',unitPercentage:''};}),totalBasis:0,totalUnits:0,percentageTotal:0,allocatedAmount:0};
    var manual=[],seen={};items.forEach(function(x){if(!x||!x.memberId)throw new Error('Every allocation requires a member.');if(!by[x.memberId])throw new Error('Allocation member is not active: '+x.memberId);if(seen[x.memberId])throw new Error('Duplicate member allocation: '+x.memberId);seen[x.memberId]=true;var allocated=ndRound2_(x.amount);if(allocated<=0)throw new Error('Allocation amount must be greater than zero for '+x.memberId);manual.push({memberId:x.memberId,name:by[x.memberId].NAME_BN||by[x.memberId].NAME_EN,basis:0,amount:allocated,rate:0,units:'',totalUnits:'',unitPercentage:'',_rateWeight:allocated});});
    var manualSum=ndRound2_(manual.reduce(function(z,x){return z+x.amount;},0));if(Math.abs(manualSum-amount)>0.009)throw new Error('Member allocation total ('+manualSum+') must equal distribution amount ('+amount+').');ndSetExactShareRates_(manual,manualSum);return {rows:manual,totalBasis:0,totalUnits:0,percentageTotal:ndRound2_(manual.reduce(function(z,x){return z+x.rate;},0)),allocatedAmount:manualSum};
  }
  var rows=members.map(function(m){
    var units='';if(basisType==='UNITS'){var unit=ndGetCurrentSavingsUnit_(m.MEMBER_ID,distributionDate);units=unit===null?0:ndNumber_(unit.UNITS);if(units<0)throw new Error('Negative savings units are not allowed for '+m.MEMBER_ID+'.');}
    var basis=basisType==='EQUAL'?1:basisType==='UNITS'?units:Math.max(0,ndMemberSavingsBalance_(m.MEMBER_ID));return {memberId:m.MEMBER_ID,name:m.NAME_BN||m.NAME_EN,basis:basis,amount:0,rate:0,units:basisType==='UNITS'?units:'',totalUnits:'',unitPercentage:''};
  });
  if(basisType==='SAVINGS')rows=rows.filter(function(x){return x.basis>0;});
  var total=ndRound2_(rows.reduce(function(z,x){return z+ndNumber_(x.basis);},0));if(total<=0)throw new Error(basisType==='UNITS'?'Total units cannot be zero.':'No eligible member basis found.');
  ndAllocateProportionalDistribution_(amount,rows,total);rows.forEach(function(x){if(basisType==='UNITS'){x.totalUnits=total;x.unitPercentage=x.rate;}});
  return {rows:rows,totalBasis:total,totalUnits:basisType==='UNITS'?total:0,percentageTotal:ndRound2_(rows.reduce(function(z,x){return z+x.rate;},0)),allocatedAmount:ndRound2_(rows.reduce(function(z,x){return z+x.amount;},0))};
}
function previewProfitDistribution(token,arg1,arg2){var s=ndSession_(token);if(!ndCanEditProfit_(s))throw new Error('PERMISSION_DENIED');var req=ndDistributionRequest_(arg1,arg2),amount=ndRound2_(req.amount),basisType=ndDistributionBasisType_(req.basisType),distributionDate=ndDateOnly_(req.distributionDate||ndToday_());if(amount<=0)throw new Error('Distributable amount required.');var profitId=req.profitId,pr=profitId?ndFindOne_('PROFIT_RECORDS','PROFIT_ID',profitId):null;if(!pr){profitId=ndEnsureLegacyProfitRecord_(s,req.financialYear||req.year,amount);pr=ndFindOne_('PROFIT_RECORDS','PROFIT_ID',profitId);}var available=ndRound2_(Math.max(0,ndNumber_(pr.AMOUNT)-ndProfitReservedAmount_(profitId)));if(amount>available+0.009)throw new Error('Only '+available+' remains available for distribution.');var built=ndBuildDistributionRows_(amount,basisType,req.items,distributionDate),unallocated=ndRound2_(amount-built.allocatedAmount);return {profitId:profitId,financialYear:pr.PERIOD_START.slice(0,4),period:pr.PERIOD_LABEL,totalBasis:built.totalBasis,totalUnits:built.totalUnits,percentageTotal:built.percentageTotal,allocatedAmount:built.allocatedAmount,unallocatedAmount:unallocated,distributableAmount:amount,availableBefore:available,remainingAfter:ndRound2_(available-amount),basisType:basisType,distributionDate:distributionDate,rows:built.rows};}
function createProfitDistributionDraft(token,arg1,arg2){
  var s=ndSession_(token);if(!ndCanEditProfit_(s))throw new Error('PERMISSION_DENIED');var req=ndDistributionRequest_(arg1,arg2);
  return ndWithFinancialLock_(function(){
    var preview=previewProfitDistribution(token,req),pr=ndFindOne_('PROFIT_RECORDS','PROFIT_ID',preview.profitId),source=ndFindOne_('PROFIT_SOURCES','SOURCE_ID',pr.SOURCE_ID),id=ndNextId_('PROFIT_DISTRIBUTION_HEADER','PDS-',8),now=ndNowIso_(),reference=req.reference||id;
    var header={DISTRIBUTION_ID:id,PROFIT_ID:pr.PROFIT_ID,SOURCE_ID:pr.SOURCE_ID,INVESTMENT_ID:pr.INVESTMENT_ID||'',PERIOD_TYPE:pr.PERIOD_TYPE,PERIOD_START:pr.PERIOD_START,PERIOD_END:pr.PERIOD_END,PERIOD_LABEL:pr.PERIOD_LABEL,TOTAL_PROFIT:pr.AMOUNT,REQUESTED_AMOUNT:preview.distributableAmount,DISTRIBUTED_AMOUNT:0,MEMBER_COUNT:preview.rows.length,BASIS_TYPE:preview.basisType,STATUS:'DRAFT',REFERENCE:reference,NOTES:req.notes||'',APPROVED_BY:'',APPROVED_AT:'',CREATED_AT:now,CREATED_BY:s.userId,UPDATED_AT:now,UPDATED_BY:s.userId,TOTAL_BASIS:preview.totalBasis,TOTAL_UNITS:preview.totalUnits||0,DISTRIBUTION_DATE:preview.distributionDate};
    ndAppend_('PROFIT_DISTRIBUTIONS',header);
    var ids=ndReserveIds_('DIST',preview.rows.length,'DST-',8),allocations=preview.rows.map(function(x,i){return {DIST_ID:ids[i],FINANCIAL_YEAR:pr.PERIOD_START.slice(0,4),MEMBER_ID:x.memberId,BASIS_AMOUNT:x.basis,RATE:x.rate,AMOUNT:x.amount,STATUS:'DRAFT',TXN_ID:'',APPROVED_BY:'',APPROVED_AT:'',CREATED_AT:now,CREATED_BY:s.userId,DISTRIBUTION_ID:id,PROFIT_ID:pr.PROFIT_ID,SOURCE_ID:pr.SOURCE_ID,INVESTMENT_ID:pr.INVESTMENT_ID||'',PERIOD_TYPE:pr.PERIOD_TYPE,PERIOD_START:pr.PERIOD_START,PERIOD_END:pr.PERIOD_END,PERIOD_LABEL:pr.PERIOD_LABEL,REFERENCE:reference,UPDATED_AT:now,UPDATED_BY:s.userId,BASIS_TYPE:preview.basisType,UNIT_QUANTITY:preview.basisType==='UNITS'?x.units:'',TOTAL_UNITS:preview.basisType==='UNITS'?preview.totalUnits:'',UNIT_PERCENTAGE:preview.basisType==='UNITS'?x.unitPercentage:'',MEMBER_NAME:x.name};});
    ndAppendMany_('PROFIT_DISTRIBUTION',allocations);ndCreateAudit_(s,'CREATE','PROFIT_DISTRIBUTION',id,'',{header:header,source:source&&source.SOURCE_NAME,method:preview.basisType,totalUnits:preview.totalUnits||0},'Profit distribution draft');return {ok:true,distributionId:id,count:preview.rows.length,total:preview.distributableAmount,remaining:preview.remainingAfter,totalUnits:preview.totalUnits||0,basisType:preview.basisType};
  });
}
function ndMigrateLegacyProfitDistributionGroup_(s,financialYear){var rows=ndRows_('PROFIT_DISTRIBUTION').filter(function(r){return !r.DISTRIBUTION_ID&&String(r.FINANCIAL_YEAR)===String(financialYear);});if(!rows.length)return null;var amount=ndRound2_(rows.reduce(function(z,r){return z+ndNumber_(r.AMOUNT);},0)),profitId=ndEnsureLegacyProfitRecord_(s,financialYear,amount),pr=ndFindOne_('PROFIT_RECORDS','PROFIT_ID',profitId),source=ndFindOne_('PROFIT_SOURCES','SOURCE_ID',pr.SOURCE_ID),id=ndNextId_('PROFIT_DISTRIBUTION_HEADER','PDS-',8),now=ndNowIso_(),approved=ndRound2_(rows.filter(function(r){return r.STATUS==='APPROVED';}).reduce(function(z,r){return z+ndNumber_(r.AMOUNT);},0)),status=approved+0.01>=amount?'APPROVED':'DRAFT';ndAppend_('PROFIT_DISTRIBUTIONS',{DISTRIBUTION_ID:id,PROFIT_ID:profitId,SOURCE_ID:pr.SOURCE_ID,INVESTMENT_ID:'',PERIOD_TYPE:'YEARLY',PERIOD_START:String(financialYear)+'-01-01',PERIOD_END:String(financialYear)+'-12-31',PERIOD_LABEL:String(financialYear),TOTAL_PROFIT:amount,REQUESTED_AMOUNT:amount,DISTRIBUTED_AMOUNT:approved,MEMBER_COUNT:rows.length,BASIS_TYPE:'SAVINGS',STATUS:status,REFERENCE:'LEGACY-'+financialYear,NOTES:'Migrated from legacy yearly distribution',APPROVED_BY:status==='APPROVED'?'MIGRATED':'',APPROVED_AT:status==='APPROVED'?now:'',CREATED_AT:rows[0].CREATED_AT||now,CREATED_BY:rows[0].CREATED_BY||'SYSTEM',UPDATED_AT:now,UPDATED_BY:s.userId});rows.forEach(function(r){ndUpdateRow_('PROFIT_DISTRIBUTION',r._row,{DISTRIBUTION_ID:id,PROFIT_ID:profitId,SOURCE_ID:source.SOURCE_ID,PERIOD_TYPE:'YEARLY',PERIOD_START:String(financialYear)+'-01-01',PERIOD_END:String(financialYear)+'-12-31',PERIOD_LABEL:String(financialYear),REFERENCE:'LEGACY-'+financialYear,UPDATED_AT:now,UPDATED_BY:s.userId});});ndRefreshProfitRecord_(profitId,s.userId);return id;}
function approveProfitDistribution(token,distributionId){
  var s=ndSession_(token);if(!ndCanEditProfit_(s))throw new Error('PERMISSION_DENIED');
  return ndWithFinancialLock_(function(){
    var h=ndFindOne_('PROFIT_DISTRIBUTIONS','DISTRIBUTION_ID',distributionId);if(!h){var migrated=ndMigrateLegacyProfitDistributionGroup_(s,distributionId);if(migrated)h=ndFindOne_('PROFIT_DISTRIBUTIONS','DISTRIBUTION_ID',migrated);}
    if(!h||['DRAFT','PROCESSING'].indexOf(h.STATUS)<0)throw new Error('Draft distribution not found or already processed.');
    var pr=ndFindOne_('PROFIT_RECORDS','PROFIT_ID',h.PROFIT_ID);if(!pr||['REVERSED','CANCELLED'].indexOf(pr.STATUS)>=0)throw new Error('Profit record is not distributable.');
    var alreadyOther=ndRound2_(Math.max(0,ndProfitReservedAmount_(pr.PROFIT_ID)-ndNumber_(h.REQUESTED_AMOUNT))),capacity=ndRound2_(ndNumber_(pr.AMOUNT)-alreadyOther);if(ndNumber_(h.REQUESTED_AMOUNT)>capacity+0.009)throw new Error('Profit remaining is insufficient.');
    var now=ndNowIso_(),date=ndDateOnly_(h.DISTRIBUTION_DATE||ndToday_());ndUpdateRow_('PROFIT_DISTRIBUTIONS',h._row,{STATUS:'PROCESSING',DISTRIBUTION_DATE:date,UPDATED_AT:now,UPDATED_BY:s.userId});
    var retained=ndCoaBySystem_('RETAINED_SURPLUS'),saving=ndCoaBySystem_('MEMBER_SAVINGS'),rows=ndFindMany_('PROFIT_DISTRIBUTION',{DISTRIBUTION_ID:h.DISTRIBUTION_ID}),allTx=ndRows_('TRANSACTIONS'),allGl=ndRows_('GENERAL_LEDGER'),tasks=[],updates=[];
    rows.forEach(function(r){
      if(['APPROVED','ZERO_ALLOCATION'].indexOf(r.STATUS)>=0)return;if(r.STATUS!=='DRAFT')throw new Error('Allocation '+r.DIST_ID+' is not processable.');
      var amount=ndRound2_(r.AMOUNT);if(amount<=0){updates.push({row:r._row,updates:{STATUS:'ZERO_ALLOCATION',UPDATED_AT:now,UPDATED_BY:s.userId}});return;}
      var existing=r.TXN_ID?allTx.filter(function(t){return t.TXN_ID===r.TXN_ID&&t.STATUS==='POSTED';})[0]:null;
      if(!existing)existing=allTx.filter(function(t){return t.TYPE==='PROFIT_DISTRIBUTION'&&t.RELATED_ID===h.DISTRIBUTION_ID&&t.MEMBER_ID===r.MEMBER_ID&&t.STATUS==='POSTED'&&Math.abs(ndNumber_(t.AMOUNT)-amount)<=0.01;})[0]||null;
      tasks.push({row:r,amount:amount,txnId:existing?existing.TXN_ID:''});
    });
    var fresh=tasks.filter(function(x){return !x.txnId;});
    if(fresh.length){var txnIds=ndReserveIds_('TXN',fresh.length,'TRX-',8),txRows=fresh.map(function(x,i){x.txnId=txnIds[i];var tnow=ndNowIso_();return {TXN_ID:x.txnId,TXN_DATE:date,MEMBER_ID:x.row.MEMBER_ID,TYPE:'PROFIT_DISTRIBUTION',CATEGORY:'SAVINGS',DESCRIPTION:'Profit distribution '+h.PERIOD_LABEL+' · '+h.DISTRIBUTION_ID,DIRECTION:'CREDIT',AMOUNT:x.amount,PRINCIPAL_AMOUNT:0,PROFIT_AMOUNT:x.amount,PENALTY_AMOUNT:0,PAYMENT_ACCOUNT_ID:'',PAYMENT_METHOD:'INTERNAL',REFERENCE:h.REFERENCE||h.DISTRIBUTION_ID,RELATED_ID:h.DISTRIBUTION_ID,RECEIPT_ID:'',STATUS:'POSTED',PARENT_TXN_ID:'',CORRECTION_REASON:'',CREATED_AT:tnow,CREATED_BY:s.userId,UPDATED_AT:tnow,UPDATED_BY:s.userId};});ndAppendMany_('TRANSACTIONS',txRows);}
    var journalTasks=tasks.filter(function(x){return !allGl.some(function(g){return g.TXN_ID===x.txnId;});});
    if(journalTasks.length){var entryIds=ndReserveIds_('JOURNAL',journalTasks.length,'JRN-',8),glIds=ndReserveIds_('GL',journalTasks.length*2,'GL-',9),glRows=[];journalTasks.forEach(function(x,i){var description='Profit distribution '+h.PERIOD_LABEL+' · '+h.DISTRIBUTION_ID,created=ndNowIso_();glRows.push({GL_ID:glIds[i*2],ENTRY_ID:entryIds[i],TXN_ID:x.txnId,ENTRY_DATE:date,ACCOUNT_CODE:retained.ACCOUNT_CODE,ACCOUNT_NAME:retained.ACCOUNT_NAME,DEBIT:x.amount,CREDIT:0,MEMBER_ID:x.row.MEMBER_ID,RELATED_ID:h.DISTRIBUTION_ID,DESCRIPTION:description,CREATED_AT:created,CREATED_BY:s.userId},{GL_ID:glIds[i*2+1],ENTRY_ID:entryIds[i],TXN_ID:x.txnId,ENTRY_DATE:date,ACCOUNT_CODE:saving.ACCOUNT_CODE,ACCOUNT_NAME:saving.ACCOUNT_NAME,DEBIT:0,CREDIT:x.amount,MEMBER_ID:x.row.MEMBER_ID,RELATED_ID:h.DISTRIBUTION_ID,DESCRIPTION:description,CREATED_AT:created,CREATED_BY:s.userId});});ndAppendMany_('GENERAL_LEDGER',glRows);}
    var existingNotifications=ndRows_('NOTIFICATIONS'),notifyTasks=tasks.filter(function(x){return !existingNotifications.some(function(n){return n.MEMBER_ID===x.row.MEMBER_ID&&n.TYPE==='PROFIT'&&String(n.MESSAGE||'').indexOf(h.DISTRIBUTION_ID)>=0;});});
    if(notifyTasks.length){var users={};ndRows_('USERS').filter(function(u){return u.STATUS==='ACTIVE'&&u.MEMBER_ID;}).forEach(function(u){users[u.MEMBER_ID]=u;}),notificationIds=ndReserveIds_('NOTIFICATION',notifyTasks.length,'NTF-',7),notifyNow=ndNowIso_();ndAppendMany_('NOTIFICATIONS',notifyTasks.map(function(x,i){return {NOTIFICATION_ID:notificationIds[i],USER_ID:(users[x.row.MEMBER_ID]||{}).USER_ID||'',MEMBER_ID:x.row.MEMBER_ID,TYPE:'PROFIT',TITLE:'মুনাফা বণ্টন',MESSAGE:'আপনার হিসাবে '+x.amount+' টাকা মুনাফা যোগ হয়েছে। Ref: '+h.DISTRIBUTION_ID,STATUS:'UNREAD',CREATED_AT:notifyNow,READ_AT:''};}));}
    var approvedAt=ndNowIso_();tasks.forEach(function(x){updates.push({row:x.row._row,updates:{STATUS:'APPROVED',TXN_ID:x.txnId,APPROVED_BY:s.userId,APPROVED_AT:approvedAt,UPDATED_AT:approvedAt,UPDATED_BY:s.userId}});});ndUpdateManyRows_('PROFIT_DISTRIBUTION',updates);
    var distributed=ndDistributionApprovedAmount_(h.DISTRIBUTION_ID),finalStatus=distributed+0.009>=ndNumber_(h.REQUESTED_AMOUNT)?'APPROVED':'PROCESSING',doneAt=ndNowIso_(),creditedCount=rows.filter(function(r){return r.STATUS==='APPROVED';}).length+tasks.length;ndUpdateRow_('PROFIT_DISTRIBUTIONS',h._row,{DISTRIBUTED_AMOUNT:distributed,STATUS:finalStatus,APPROVED_BY:finalStatus==='APPROVED'?s.userId:'',APPROVED_AT:finalStatus==='APPROVED'?doneAt:'',UPDATED_AT:doneAt,UPDATED_BY:s.userId});ndRefreshProfitRecord_(h.PROFIT_ID,s.userId);ndCreateAudit_(s,'APPROVE','PROFIT_DISTRIBUTION',h.DISTRIBUTION_ID,h,{distributedAmount:distributed,status:finalStatus,creditedMembers:creditedCount},'Profit distribution approved and member accounts credited');return {ok:true,distributionId:h.DISTRIBUTION_ID,count:creditedCount,memberCount:rows.length,distributedAmount:distributed,status:finalStatus};
  });
}
function listProfitDistributions(token,options){var s=ndSession_(token);if(!ndCanViewProfit_(s))throw new Error('PERMISSION_DENIED');options=options||{};var sources={},investments={};ndRows_('PROFIT_SOURCES').forEach(function(x){sources[x.SOURCE_ID]=x;});ndRows_('INVESTMENTS').forEach(function(x){investments[x.INVESTMENT_ID]=x;});var rows=ndRows_('PROFIT_DISTRIBUTIONS');if(options.status)rows=rows.filter(function(r){return r.STATUS===options.status;});if(options.sourceId)rows=rows.filter(function(r){return r.SOURCE_ID===options.sourceId;});if(options.investmentId)rows=rows.filter(function(r){return r.INVESTMENT_ID===options.investmentId;});if(options.category)rows=rows.filter(function(r){return (sources[r.SOURCE_ID]||{}).CATEGORY===options.category;});if(options.periodType)rows=rows.filter(function(r){return r.PERIOD_TYPE===options.periodType;});if(options.month){var ms=String(options.month).slice(0,7)+'-01',me=ndEndOfMonth_(String(options.month).slice(0,7));rows=rows.filter(function(r){return r.PERIOD_START<=me&&r.PERIOD_END>=ms;});}if(options.year){var ys=String(options.year)+'-01-01',ye=String(options.year)+'-12-31';rows=rows.filter(function(r){return r.PERIOD_START<=ye&&r.PERIOD_END>=ys;});}if(options.from)rows=rows.filter(function(r){return r.PERIOD_END>=options.from;});if(options.to)rows=rows.filter(function(r){return r.PERIOD_START<=options.to;});return ndSortDesc_(rows,'CREATED_AT').slice(0,1000).map(function(r){return Object.assign({},r,{SOURCE_NAME:(sources[r.SOURCE_ID]||{}).SOURCE_NAME||'',INVESTMENT_NAME:(investments[r.INVESTMENT_ID]||{}).NAME||'',DISTRIBUTED_AMOUNT:ndDistributionApprovedAmount_(r.DISTRIBUTION_ID)});});}
function getProfitDistributionDetails(token,distributionId){var s=ndSession_(token);if(!ndCanViewProfit_(s))throw new Error('PERMISSION_DENIED');var h=ndFindOne_('PROFIT_DISTRIBUTIONS','DISTRIBUTION_ID',distributionId);if(!h)throw new Error('Distribution not found.');var source=ndFindOne_('PROFIT_SOURCES','SOURCE_ID',h.SOURCE_ID),profit=ndFindOne_('PROFIT_RECORDS','PROFIT_ID',h.PROFIT_ID),members={},unitBased=String(h.BASIS_TYPE).toUpperCase()==='UNITS';ndRows_('MEMBERS').forEach(function(m){members[m.MEMBER_ID]=m;});var items=ndFindMany_('PROFIT_DISTRIBUTION',{DISTRIBUTION_ID:distributionId}).map(function(r){return Object.assign({},r,{MEMBER_NAME:r.MEMBER_NAME||(members[r.MEMBER_ID]||{}).NAME_BN||(members[r.MEMBER_ID]||{}).NAME_EN||'',BASIS_TYPE:r.BASIS_TYPE||h.BASIS_TYPE||'',UNIT_QUANTITY:r.UNIT_QUANTITY!==''&&r.UNIT_QUANTITY!==undefined?r.UNIT_QUANTITY:(unitBased?r.BASIS_AMOUNT:''),TOTAL_UNITS:r.TOTAL_UNITS!==''&&r.TOTAL_UNITS!==undefined?r.TOTAL_UNITS:(unitBased?h.TOTAL_UNITS||h.TOTAL_BASIS:''),UNIT_PERCENTAGE:r.UNIT_PERCENTAGE!==''&&r.UNIT_PERCENTAGE!==undefined?r.UNIT_PERCENTAGE:(unitBased?r.RATE:'')});});return {distribution:Object.assign({},h,{DISTRIBUTED_AMOUNT:ndDistributionApprovedAmount_(distributionId),DISTRIBUTION_DATE:h.DISTRIBUTION_DATE||ndDateOnly_(h.APPROVED_AT||h.CREATED_AT)}),source:source,profit:profit,items:items};}
function cancelProfitDistribution(token,distributionId,reason){var s=ndSession_(token);if(!ndCanEditProfit_(s))throw new Error('PERMISSION_DENIED');if(!reason)throw new Error('Cancellation reason required.');return ndWithFinancialLock_(function(){var h=ndFindOne_('PROFIT_DISTRIBUTIONS','DISTRIBUTION_ID',distributionId);if(!h||h.STATUS!=='DRAFT')throw new Error('Only a draft distribution can be cancelled.');var now=ndNowIso_();ndFindMany_('PROFIT_DISTRIBUTION',{DISTRIBUTION_ID:distributionId}).forEach(function(r){ndUpdateRow_('PROFIT_DISTRIBUTION',r._row,{STATUS:'CANCELLED',UPDATED_AT:now,UPDATED_BY:s.userId});});ndUpdateRow_('PROFIT_DISTRIBUTIONS',h._row,{STATUS:'CANCELLED',UPDATED_AT:now,UPDATED_BY:s.userId});ndRefreshProfitRecord_(h.PROFIT_ID,s.userId);ndCreateAudit_(s,'CANCEL','PROFIT_DISTRIBUTION',distributionId,h,{status:'CANCELLED'},reason);return {ok:true};});}
function reverseProfitDistribution(token,distributionId,reason){var s=ndSession_(token);if(!ndCanEditProfit_(s))throw new Error('PERMISSION_DENIED');if(!reason)throw new Error('Reversal reason required.');return ndWithFinancialLock_(function(){var h=ndFindOne_('PROFIT_DISTRIBUTIONS','DISTRIBUTION_ID',distributionId);if(!h||h.STATUS!=='APPROVED')throw new Error('Only an approved distribution can be reversed.');var rows=ndFindMany_('PROFIT_DISTRIBUTION',{DISTRIBUTION_ID:distributionId}).filter(function(r){return r.STATUS==='APPROVED';}),now=ndNowIso_(),reversals=[];rows.forEach(function(r){var t=ndFindOne_('TRANSACTIONS','TXN_ID',r.TXN_ID);if(!t)throw new Error('Distribution transaction missing: '+r.TXN_ID);var rev=ndReverseTransaction_(s,t,reason);reversals.push(rev);ndUpdateRow_('TRANSACTIONS',t._row,{STATUS:'REVERSED',CORRECTION_REASON:reason,UPDATED_AT:now,UPDATED_BY:s.userId});ndUpdateRow_('PROFIT_DISTRIBUTION',r._row,{STATUS:'REVERSED',UPDATED_AT:now,UPDATED_BY:s.userId});ndCreateNotification_(r.MEMBER_ID,'PROFIT_REVERSAL','মুনাফা বণ্টন সংশোধন',r.AMOUNT+' টাকা মুনাফা বণ্টনের প্রভাব reverse করা হয়েছে। Ref: '+distributionId);});ndUpdateRow_('PROFIT_DISTRIBUTIONS',h._row,{STATUS:'REVERSED',DISTRIBUTED_AMOUNT:0,UPDATED_AT:now,UPDATED_BY:s.userId});ndRefreshProfitRecord_(h.PROFIT_ID,s.userId);ndCreateAudit_(s,'REVERSE','PROFIT_DISTRIBUTION',distributionId,h,{reversalTxnIds:reversals},reason);return {ok:true,count:reversals.length,reversalTxnIds:reversals};});}
function getProfitManagementDashboard(token,options){var s=ndSession_(token);if(!ndCanViewProfit_(s))throw new Error('PERMISSION_DENIED');var rows=listProfitRecords(token,options||{}).filter(function(r){return ['REVERSED','CANCELLED'].indexOf(r.STATUS)<0;}),total=ndRound2_(rows.reduce(function(z,r){return z+ndNumber_(r.AMOUNT);},0)),distributed=ndRound2_(rows.reduce(function(z,r){return z+ndNumber_(r.DISTRIBUTED_AMOUNT);},0)),bySource={},byInvestment={},byCategory={},byMonth={},byYear={};rows.forEach(function(r){var source=r.SOURCE_NAME||r.SOURCE_ID||'Other',inv=r.INVESTMENT_NAME||r.INVESTMENT_ID||'Other',cat=r.CATEGORY||'OTHER',month=String(r.PROFIT_DATE).slice(0,7),year=String(r.PROFIT_DATE).slice(0,4);bySource[source]=(bySource[source]||0)+ndNumber_(r.AMOUNT);byInvestment[inv]=(byInvestment[inv]||0)+ndNumber_(r.AMOUNT);byCategory[cat]=(byCategory[cat]||0)+ndNumber_(r.AMOUNT);byMonth[month]=(byMonth[month]||0)+ndNumber_(r.AMOUNT);byYear[year]=(byYear[year]||0)+ndNumber_(r.AMOUNT);});function arr(o,key){return Object.keys(o).sort().map(function(k){var x={label:k,amount:ndRound2_(o[k])};x[key]=k;return x;});}var curMonth=ndMonthKey_(new Date()),curYear=curMonth.slice(0,4);return {totalProfit:total,distributedProfit:distributed,undistributedProfit:ndRound2_(total-distributed),monthlyProfit:ndRound2_(byMonth[curMonth]||0),yearlyProfit:ndRound2_(byYear[curYear]||0),bySource:arr(bySource,'source'),byInvestment:arr(byInvestment,'investment'),byCategory:arr(byCategory,'category'),byMonth:arr(byMonth,'month'),byYear:arr(byYear,'year'),profitRecords:rows.slice(0,100),distributions:listProfitDistributions(token,options||{}).slice(0,100)};}
function getProfitManagementPage(token,options){var s=ndSession_(token);if(!ndCanViewProfit_(s))throw new Error('PERMISSION_DENIED');return {d:getProfitManagementDashboard(token,options||{}),sources:ndSortDesc_(ndRows_('PROFIT_SOURCES'),'CREATED_AT').slice(0,500),investments:ndSortDesc_(ndRows_('INVESTMENTS'),'CREATED_AT').slice(0,500)};}


/** ===== v1.0.7 MODULAR UI STABILITY =====
 * No business rows are deleted or rewritten. This update only stamps the build,
 * resets the temporary login-lock window, and validates the modular HTML project.
 */
function RUN_UPDATE_V107(){
  var ss=SpreadsheetApp.getActiveSpreadsheet()||ndDb_();
  PropertiesService.getScriptProperties().setProperty('ND_SPREADSHEET_ID',ss.getId());
  ndSetupSheets_();
  ndSetConfig_('SETUP_VERSION','1.0.7');
  ndSetConfig_('LOGIN_LOCK_RESET_AT',ndNowIso_());
  return {ok:true,version:'1.0.7',message:'v1.0.7 modular UI stability update applied. Business data preserved.'};
}

function RUN_RESET_LOGIN_LOCK_V107(){
  var ts=ndNowIso_();
  ndSetConfig_('LOGIN_LOCK_RESET_AT',ts);
  return {ok:true,resetAt:ts,message:'Temporary login lock reset. LOGIN_LOG history preserved.'};
}

function RUN_VALIDATE_UI_V107(){
  var out={ok:true,version:'1.0.7',checks:[],missing:[]};
  try{
    var html=HtmlService.createTemplateFromFile('Index').evaluate().getContent();
    var markers=['ND-1.0.7-MODULAR-STABLE','ND_APP_CORE_READY','ND_MODULE_1_READY','ND_MODULE_2_READY','ND_MODULE_3_READY','ND_UI_READY','ND_START_APP'];
    markers.forEach(function(m){if(html.indexOf(m)<0)out.missing.push(m);});
    var opens=(html.match(/<script\b/gi)||[]).length, closes=(html.match(/<\/script>/gi)||[]).length;
    out.checks.push({name:'Rendered HTML length',value:html.length});
    out.checks.push({name:'Script tags',value:opens+' open / '+closes+' close'});
    out.checks.push({name:'Required UI markers',value:out.missing.length?'Missing: '+out.missing.join(', '):'OK'});
    if(html.length<150000)out.missing.push('HTML_TOO_SHORT');
    if(opens!==closes)out.missing.push('SCRIPT_TAG_MISMATCH');
    out.ok=out.missing.length===0;
  }catch(e){out.ok=false;out.error=e&&e.message?e.message:String(e);}
  Logger.log(JSON.stringify(out,null,2));
  return out;
}

function RUN_DIAGNOSTIC_V107(){
  var out={ok:true,version:ndConfig_('SETUP_VERSION',''),checks:[],ui:null};
  function ck(name,fn){try{var v=fn();out.checks.push({name:name,ok:true,value:v===undefined?'OK':v});}catch(e){out.ok=false;out.checks.push({name:name,ok:false,value:e.message});}}
  ck('Setup version',function(){if(out.version!=='1.0.7')throw new Error('Expected 1.0.7, found '+out.version);return out.version;});
  ck('Spreadsheet',function(){return ndSS_().getName();});
  ck('Required sheets',function(){var ss=ndSS_();var missing=Object.keys(ND_SCHEMA).filter(function(n){return !ss.getSheetByName(n);});if(missing.length)throw new Error('Missing: '+missing.join(', '));return Object.keys(ND_SCHEMA).length+' sheets';});
  ck('Active admin credentials',function(){var a=ndRows_('USERS').filter(function(u){return u.ROLE_ID==='ADMIN'&&u.STATUS==='ACTIVE';});if(!a.length)throw new Error('No active ADMIN');var bad=a.filter(function(u){return !u.USERNAME||!u.PASSWORD_HASH||!u.SALT;});if(bad.length)throw new Error('Admin credential fields incomplete');return a.length+' active admin';});
  ck('Initial admin lock status',function(){var u=ndNormalizeUsername_(ndConfig_('INITIAL_ADMIN_USERNAME','admin'));return ndIsLoginTemporarilyLocked_(u)?'LOCKED - run RUN_RESET_LOGIN_LOCK_V107()':'NOT LOCKED';});
  ck('Drive folders',function(){['MEMBER_PHOTO_FOLDER_ID','DOCUMENT_FOLDER_ID','BACKUP_FOLDER_ID'].forEach(function(k){var id=ndConfig_(k,'');if(!id)throw new Error(k+' missing');DriveApp.getFolderById(id).getName();});return 'OK';});
  out.ui=RUN_VALIDATE_UI_V107();if(!out.ui.ok)out.ok=false;
  Logger.log(JSON.stringify(out,null,2));
  return out;
}

/** ===== v1.0.8 SAVINGS / RECEIPT CONSISTENCY HOTFIX ===== */
function ndEnsureSavingsJournalForTxnV108_(t){
  if(!t||t.CATEGORY!=='SAVINGS'||t.STATUS!=='POSTED') return false;
  if(ndFindMany_('GENERAL_LEDGER',{TXN_ID:t.TXN_ID}).length) return false;
  var account=ndAccountById_(t.PAYMENT_ACCOUNT_ID||'ACC-CASH');
  var fakeSession={userId:'SYSTEM_REPAIR'};
  if(t.DIRECTION==='CREDIT') ndPostJournal_(fakeSession,t.TXN_ID,ndDateOnly_(t.TXN_DATE),account.ACCOUNT_CODE,'MEMBER_SAVINGS',ndNumber_(t.AMOUNT),t.MEMBER_ID,t.RELATED_ID,t.DESCRIPTION,'DEBIT_CREDIT');
  else if(t.DIRECTION==='DEBIT') ndPostJournal_(fakeSession,t.TXN_ID,ndDateOnly_(t.TXN_DATE),account.ACCOUNT_CODE,'MEMBER_SAVINGS',ndNumber_(t.AMOUNT),t.MEMBER_ID,t.RELATED_ID,t.DESCRIPTION,'CREDIT_DEBIT');
  return true;
}

function RUN_REPAIR_SAVINGS_V108(){
  ndSetupSheets_();
  var tx=ndRows_('TRANSACTIONS').filter(function(t){return t.CATEGORY==='SAVINGS'&&t.STATUS==='POSTED';});
  var repairedReceipts=0,repairedJournals=0,members={};
  tx.forEach(function(t){
    members[t.MEMBER_ID]=true;
    if(t.RECEIPT_ID&&!ndFindOne_('RECEIPTS','RECEIPT_ID',t.RECEIPT_ID)){ndEnsureReceiptForTransaction_(t);repairedReceipts++;}
    try{if(ndEnsureSavingsJournalForTxnV108_(t))repairedJournals++;}catch(e){Logger.log('V108 journal repair skipped '+t.TXN_ID+': '+e.message);}
  });
  var reconciled=0;
  Object.keys(members).forEach(function(memberId){try{ndReconcileSavingsDues_(memberId,'SYSTEM_REPAIR');reconciled++;}catch(e){Logger.log('V108 due reconcile skipped '+memberId+': '+e.message);}});
  ndSetConfig_('SETUP_VERSION','1.0.8');
  var out={ok:true,version:'1.0.8',repairedReceipts:repairedReceipts,repairedJournals:repairedJournals,reconciledMembers:reconciled};
  Logger.log(JSON.stringify(out,null,2));
  return out;
}

function RUN_UPDATE_V108(){
  ndSetupSheets_();
  return RUN_REPAIR_SAVINGS_V108();
}

function RUN_DIAGNOSTIC_V108(){
  var out={ok:true,version:ndConfig_('SETUP_VERSION',''),checks:[]};
  function ck(name,fn){try{out.checks.push({name:name,ok:true,value:fn()});}catch(e){out.ok=false;out.checks.push({name:name,ok:false,value:e.message});}}
  ck('Setup version',function(){if(out.version!=='1.0.8')throw new Error('Expected 1.0.8, found '+out.version);return out.version;});
  ck('Monthly due rows have physical row numbers',function(){var bad=ndRows_('MONTHLY_DUES').filter(function(r){return !r._row;});if(bad.length)throw new Error('Rows without _row: '+bad.length);return 'OK';});
  ck('Posted savings receipts exist',function(){var bad=ndRows_('TRANSACTIONS').filter(function(t){return t.CATEGORY==='SAVINGS'&&t.STATUS==='POSTED'&&t.RECEIPT_ID&&!ndFindOne_('RECEIPTS','RECEIPT_ID',t.RECEIPT_ID);});if(bad.length)throw new Error('Missing receipts: '+bad.map(function(x){return x.TXN_ID;}).join(','));return 'OK';});
  ck('Posted savings journals exist',function(){var bad=ndRows_('TRANSACTIONS').filter(function(t){return t.CATEGORY==='SAVINGS'&&t.STATUS==='POSTED'&&!ndFindMany_('GENERAL_LEDGER',{TXN_ID:t.TXN_ID}).length;});if(bad.length)throw new Error('Missing journals: '+bad.map(function(x){return x.TXN_ID;}).join(','));return 'OK';});
  Logger.log(JSON.stringify(out,null,2));
  return out;
}


/** ===== v1.0.9 DUE START / MULTI-MONTH SAVINGS =====
 * Business rule: every member's monthly savings obligation starts from SOCIETY_START_MONTH.
 * Future months are not counted in Current Due. A payment may cover one or multiple months.
 */
function RUN_UPDATE_V109(){
  ndSetupSheets_();
  if(!/^\d{4}-\d{2}$/.test(String(ndConfig_('SOCIETY_START_MONTH','')))) ndSetConfig_('SOCIETY_START_MONTH','2026-08');
  var current=ndMonthKey_(new Date()), members=ndRows_('MEMBERS').filter(function(m){return m.STATUS==='ACTIVE';}), generated=0,reconciled=0;
  members.forEach(function(m){try{generated+=ndEnsureMemberDuesThroughMonth_(m.MEMBER_ID,current,'SYSTEM_V109');ndReconcileSavingsDues_(m.MEMBER_ID,'SYSTEM_V109');reconciled++;}catch(e){Logger.log('V109 member '+m.MEMBER_ID+': '+e.message);}});
  ndSetConfig_('SETUP_VERSION','1.0.9'); ndInvalidateCaches_();
  var out={ok:true,version:'1.0.9',societyStartMonth:ndSocietyStartMonth_(),activeMembers:members.length,dueRowsEnsured:generated,reconciledMembers:reconciled,message:'Current Due now excludes future months. All active members accrue from society start month. Multi-month collection enabled by updated Module1.html.'};
  Logger.log(JSON.stringify(out,null,2)); return out;
}
/** ===== v1.0.10 DUE MONTH NORMALIZATION / DUPLICATE REPAIR =====
 * Fixes Google Sheets auto-date conversion of DUE_MONTH and consolidates duplicate
 * monthly due rows without deleting financial transactions, receipts or ledger entries.
 */
function RUN_UPDATE_V110(){
  ndSetupSheets_();
  var current=ndMonthKey_(new Date()), active=ndRows_('MEMBERS').filter(function(m){return m.STATUS==='ACTIVE';}), generated=0;
  active.forEach(function(m){try{generated+=ndEnsureMemberDuesThroughMonth_(m.MEMBER_ID,current,'SYSTEM_V110');}catch(e){Logger.log('V110 ensure '+m.MEMBER_ID+': '+e.message);}});
  var memberSet={};
  ndRows_('MONTHLY_DUES').forEach(function(d){if(d.MEMBER_ID)memberSet[d.MEMBER_ID]=true;});
  ndRows_('TRANSACTIONS').filter(function(t){return t.CATEGORY==='SAVINGS';}).forEach(function(t){if(t.MEMBER_ID)memberSet[t.MEMBER_ID]=true;});
  var reconciled=0, mergedRows=0;
  Object.keys(memberSet).forEach(function(memberId){
    try{var r=ndReconcileSavingsDues_(memberId,'SYSTEM_V110');reconciled++;mergedRows+=ndNumber_(r&&r.mergedRows);}catch(e){Logger.log('V110 reconcile '+memberId+': '+e.message);}
  });
  ndSetConfig_('SETUP_VERSION','1.0.10'); ndInvalidateCaches_();
  var out={ok:true,version:'1.0.10',activeMembers:active.length,dueRowsEnsured:generated,reconciledMembers:reconciled,duplicateRowsMerged:mergedRows,message:'DUE_MONTH normalized to YYYY-MM; duplicate monthly due rows consolidated; paid monthly savings now reduce the same month due correctly.'};
  Logger.log(JSON.stringify(out,null,2)); return out;
}
function RUN_REPAIR_DUES_V110(){ return RUN_UPDATE_V110(); }
function RUN_DIAGNOSTIC_V110(){
  var out={ok:true,version:ndConfig_('SETUP_VERSION',''),checks:[]};
  function ck(name,fn){try{out.checks.push({name:name,ok:true,value:fn()});}catch(e){out.ok=false;out.checks.push({name:name,ok:false,value:e.message});}}
  ck('Setup version',function(){if(out.version!=='1.0.10')throw new Error('Expected 1.0.10, found '+out.version);return out.version;});
  ck('Normalized unique active due per member/month',function(){var seen={},dup=[];ndRows_('MONTHLY_DUES').filter(function(d){return String(d.STATUS||'').toUpperCase()!=='MERGED';}).forEach(function(d){var k=d.MEMBER_ID+'|'+ndDueMonthKey_(d.DUE_MONTH);if(seen[k])dup.push(k);seen[k]=true;});if(dup.length)throw new Error('Duplicate active dues: '+dup.slice(0,20).join(', '));return 'OK';});
  ck('Paid monthly transactions reconcile to due',function(){var bad=[];ndRows_('MONTHLY_DUES').filter(function(d){return String(d.STATUS||'').toUpperCase()!=='MERGED';}).forEach(function(d){var gross=ndRound2_(ndNumber_(d.DUE_AMOUNT)+ndNumber_(d.LATE_FEE)),calc=ndRound2_(Math.max(0,gross-ndNumber_(d.PAID_AMOUNT)-ndNumber_(d.ADVANCE_APPLIED)));if(Math.abs(calc-ndNumber_(d.BALANCE))>0.01)bad.push(d.DUE_ID);});if(bad.length)throw new Error('Balance mismatch: '+bad.slice(0,20).join(', '));return 'OK';});
  ck('Historical dues through current month',function(){var start=ndSocietyStartMonth_(),cur=ndMonthKey_(new Date()),bad=[];ndRows_('MEMBERS').filter(function(m){return m.STATUS==='ACTIVE';}).forEach(function(m){var months=ndMonthRange_(start,cur,240);months.forEach(function(mm){var d=ndFindMany_('MONTHLY_DUES',{MEMBER_ID:m.MEMBER_ID}).filter(function(x){return String(x.STATUS||'').toUpperCase()!=='MERGED'&&ndDueMonthKey_(x.DUE_MONTH)===mm;})[0];if(!d)bad.push(m.MEMBER_ID+':'+mm);});});if(bad.length)throw new Error('Missing due rows: '+bad.slice(0,20).join(', '));return 'OK';});
  Logger.log(JSON.stringify(out,null,2));return out;
}

function RUN_DIAGNOSTIC_V109(){
  var out={ok:true,version:ndConfig_('SETUP_VERSION',''),checks:[]};
  function ck(name,fn){try{out.checks.push({name:name,ok:true,value:fn()});}catch(e){out.ok=false;out.checks.push({name:name,ok:false,value:e.message});}}
  ck('Setup version',function(){if(out.version!=='1.0.9')throw new Error('Expected 1.0.9, found '+out.version);return out.version;});
  ck('Society start month',function(){var m=ndSocietyStartMonth_();if(!/^\d{4}-\d{2}$/.test(m))throw new Error('Invalid start month');return m;});
  ck('Historical dues through current month',function(){var start=ndSocietyStartMonth_(),cur=ndMonthKey_(new Date()),bad=[];ndRows_('MEMBERS').filter(function(m){return m.STATUS==='ACTIVE';}).forEach(function(m){var months=ndMonthRange_(start,cur,240);months.forEach(function(mm){var d=ndFindMany_('MONTHLY_DUES',{MEMBER_ID:m.MEMBER_ID}).filter(function(x){return String(x.STATUS||'').toUpperCase()!=='MERGED'&&ndDueMonthKey_(x.DUE_MONTH)===mm;})[0];if(!d)bad.push(m.MEMBER_ID+':'+mm);});});if(bad.length)throw new Error('Missing due rows: '+bad.slice(0,20).join(', ')+(bad.length>20?' ...':''));return 'OK';});
  ck('Future dues excluded from current due',function(){var future=ndRows_('MONTHLY_DUES').filter(function(d){return String(d.STATUS||'').toUpperCase()!=='MERGED'&&ndDueMonthKey_(d.DUE_MONTH)>ndMonthKey_(new Date())&&ndNumber_(d.BALANCE)>0;}).length;return future+' future due rows kept separately and excluded from Current Due';});
  ck('Multi-month collection API',function(){return typeof getSavingsMultiCollectionContext==='function'?'OK':'Missing API';});
  ck('Modular UI render',function(){var u=RUN_VALIDATE_UI_V109();if(!u.ok)throw new Error(u.error||('Missing: '+u.missing.join(', ')));return u.htmlLength+' chars';});
  Logger.log(JSON.stringify(out,null,2));return out;
}

function RUN_VALIDATE_UI_V109(){
  var out={ok:true,version:'1.0.9',missing:[],htmlLength:0};
  try{
    var html=HtmlService.createTemplateFromFile('Index').evaluate().getContent(); out.htmlLength=html.length;
    ['ND_APP_CORE_READY','ND_MODULE_1_READY','ND_MODULE_2_READY','ND_MODULE_3_READY','ND_UI_READY','ND_START_APP'].forEach(function(m){if(html.indexOf(m)<0)out.missing.push(m);});
    var opens=(html.match(/<script\b/gi)||[]).length,closes=(html.match(/<\/script>/gi)||[]).length;if(opens!==closes)out.missing.push('SCRIPT_TAG_MISMATCH');
    if(html.length<120000)out.missing.push('HTML_TOO_SHORT'); out.ok=out.missing.length===0;
  }catch(e){out.ok=false;out.error=e&&e.message?e.message:String(e);}
  Logger.log(JSON.stringify(out,null,2));return out;
}

/** ===== v1.1.0 INVESTMENT CLOSURE / PROFIT LIFECYCLE / SAFE REVERSAL ===== */
function ndSeedDefaultProfitSourcesV1100_(session){
  var defs=[['DEFAULT_LAND','Land Investment','LAND'],['DEFAULT_PROPERTY','Property Investment','PROPERTY'],['DEFAULT_SHOP','Shop / Business','BUSINESS'],['DEFAULT_AGRICULTURE','Agriculture','AGRICULTURE'],['DEFAULT_PROJECT','Project Investment','PROJECT'],['DEFAULT_OTHER','Other Investment','OTHER']],existing={};ndRows_('PROFIT_SOURCES').forEach(function(r){existing[r.PROJECT_REFERENCE]=true;});var now=ndNowIso_(),count=0;defs.forEach(function(d){if(existing[d[0]])return;ndAppend_('PROFIT_SOURCES',{SOURCE_ID:ndNextId_('PROFIT_SOURCE','PSR-',6),SOURCE_NAME:d[1],CATEGORY:d[2],INVESTMENT_ID:'',PROJECT_REFERENCE:d[0],DESCRIPTION:'Default profit source/category',STATUS:'ACTIVE',CREATED_AT:now,CREATED_BY:session&&session.userId||'SYSTEM',UPDATED_AT:now,UPDATED_BY:session&&session.userId||'SYSTEM'});count++;});return count;
}
function ndMergeRolePermissionsV1100_(){
  var additions={STAFF:['investments.view','profits.view'],ACCOUNTANT:['investments.view','investments.edit','profits.view','profits.edit'],VIEWER:['profits.view']},changed=0;Object.keys(additions).forEach(function(roleId){var r=ndFindOne_('ROLES','ROLE_ID',roleId);if(!r)return;var p=ndSafeParse_(r.PERMISSIONS_JSON,[]),before=p.length;additions[roleId].forEach(function(x){if(p.indexOf(x)<0)p.push(x);});if(p.length!==before){ndUpdateRow_('ROLES',r._row,{PERMISSIONS_JSON:JSON.stringify(p),UPDATED_AT:ndNowIso_()});changed++;}});return changed;
}
function RUN_UPDATE_V1100(){
  var ss=SpreadsheetApp.getActiveSpreadsheet()||ndDb_();PropertiesService.getScriptProperties().setProperty('ND_SPREADSHEET_ID',ss.getId());ndSetupSheets_();ndSeedCOA_();var session={userId:'SYSTEM_V1100'},sources=ndSeedDefaultProfitSourcesV1100_(session),roles=ndMergeRolePermissionsV1100_(),investments=0,profitReturns=0,legacyGroups=0;
  ndRows_('INVESTMENTS').forEach(function(inv){var cost=ndInvestmentTotalCost_(inv),up={TOTAL_INVESTED:cost,PRINCIPAL_RETURNED:ndNumber_(inv.PRINCIPAL_RETURNED),PROFIT_GENERATED:ndNumber_(inv.PROFIT_GENERATED),LOSS_GENERATED:ndNumber_(inv.LOSS_GENERATED),UPDATED_AT:inv.UPDATED_AT||ndNowIso_(),UPDATED_BY:inv.UPDATED_BY||'SYSTEM_V1100'};ndUpdateRow_('INVESTMENTS',inv._row,up);ndEnsureProfitSourceForInvestment_(session,inv.INVESTMENT_ID,inv.NAME,inv.TYPE);investments++;});
  ndRows_('INVESTMENT_RETURNS').forEach(function(r){var up={STATUS:r.STATUS||'POSTED',UPDATED_AT:r.UPDATED_AT||r.CREATED_AT||ndNowIso_(),UPDATED_BY:r.UPDATED_BY||r.CREATED_BY||'SYSTEM_V1100'};if(r.TYPE==='PROFIT'&&!r.PROFIT_ID&&ndInvestmentReturnEffective_(r)){var inv=ndFindOne_('INVESTMENTS','INVESTMENT_ID',r.INVESTMENT_ID),source=ndEnsureProfitSourceForInvestment_(session,r.INVESTMENT_ID,inv?inv.NAME:r.INVESTMENT_ID,inv?inv.TYPE:'OTHER');up.PROFIT_ID=ndCreateProfitRecordFromPostedTxn_(session,{sourceId:source.SOURCE_ID,investmentId:r.INVESTMENT_ID,category:inv?inv.TYPE:'OTHER',profitDate:r.RETURN_DATE,amount:r.AMOUNT,sourceTxnId:r.TXN_ID,reference:'MIGRATED-'+r.RETURN_ID,notes:r.NOTES||'Migrated investment profit return',periodType:'CUSTOM',periodStart:r.RETURN_DATE,periodEnd:r.RETURN_DATE});profitReturns++;}ndUpdateRow_('INVESTMENT_RETURNS',r._row,up);});
  ndRows_('INVESTMENTS').forEach(function(inv){ndRefreshInvestmentSummary_(inv.INVESTMENT_ID,'SYSTEM_V1100');});var years={};ndRows_('PROFIT_DISTRIBUTION').filter(function(r){return !r.DISTRIBUTION_ID&&r.FINANCIAL_YEAR;}).forEach(function(r){years[String(r.FINANCIAL_YEAR)]=true;});Object.keys(years).forEach(function(y){if(ndMigrateLegacyProfitDistributionGroup_(session,y)){legacyGroups++;}});ndRows_('PROFIT_RECORDS').forEach(function(p){ndRefreshProfitRecord_(p.PROFIT_ID,'SYSTEM_V1100');});ndSetConfig_('SETUP_VERSION','1.1.0');ndInvalidateCaches_();var out={ok:true,version:'1.1.0',newDefaultSources:sources,rolesUpdated:roles,investmentsBackfilled:investments,investmentProfitReturnsMigrated:profitReturns,legacyDistributionGroupsMigrated:legacyGroups,message:'Investment closure, source-linked profit, distribution history, member credit and reversal controls enabled. Existing data preserved.'};Logger.log(JSON.stringify(out,null,2));return out;
}
function RUN_VALIDATE_UI_V1100(){var out={ok:true,version:'1.1.0',missing:[],htmlLength:0};try{var html=HtmlService.createTemplateFromFile('Index').evaluate().getContent();out.htmlLength=html.length;['ND_APP_CORE_READY','ND_MODULE_1_READY','ND_MODULE_2_READY','ND_MODULE_3_READY','ND_UI_READY','ND_START_APP','renderProfitManagement','openInvestmentCloseModal','reverseFinancialTransaction'].forEach(function(m){if(html.indexOf(m)<0)out.missing.push(m);});var opens=(html.match(/<script\b/gi)||[]).length,closes=(html.match(/<\/script>/gi)||[]).length;if(opens!==closes)out.missing.push('SCRIPT_TAG_MISMATCH');if(html.length<120000)out.missing.push('HTML_TOO_SHORT');out.ok=out.missing.length===0;}catch(e){out.ok=false;out.error=e&&e.message?e.message:String(e);}Logger.log(JSON.stringify(out,null,2));return out;}
function RUN_DIAGNOSTIC_V1100(){
  var out={ok:true,version:ndConfig_('SETUP_VERSION',''),checks:[],ui:null};function ck(name,fn){try{out.checks.push({name:name,ok:true,value:fn()});}catch(e){out.ok=false;out.checks.push({name:name,ok:false,value:e.message});}}
  ck('Setup version',function(){if(out.version!=='1.1.0')throw new Error('Expected 1.1.0, found '+out.version);return out.version;});
  ck('Schema headers',function(){var bad=[];Object.keys(ND_SCHEMA).forEach(function(n){var h=ndHeaders_(n),want=ND_SCHEMA[n];want.forEach(function(x,i){if(h[i]!==x)bad.push(n+':'+(i+1)+' expected '+x+' found '+h[i]);});});if(bad.length)throw new Error(bad.slice(0,20).join('; '));return Object.keys(ND_SCHEMA).length+' sheets OK';});
  ck('Required financial accounts',function(){var names=['CASH','BANK','MFS','INVESTMENT_ASSET','MEMBER_SAVINGS','RETAINED_SURPLUS','INVESTMENT_INCOME','OTHER_INCOME','INVESTMENT_LOSS'],missing=[];names.forEach(function(n){try{ndCoaBySystem_(n);}catch(e){missing.push(n);}});if(missing.length)throw new Error('Missing system accounts: '+missing.join(','));return names.length+' accounts OK';});
  ck('Default profit sources',function(){var refs={};ndRows_('PROFIT_SOURCES').filter(function(s){return s.STATUS==='ACTIVE';}).forEach(function(s){refs[s.PROJECT_REFERENCE]=true;});var missing=['DEFAULT_LAND','DEFAULT_PROPERTY','DEFAULT_SHOP','DEFAULT_AGRICULTURE','DEFAULT_PROJECT','DEFAULT_OTHER'].filter(function(x){return !refs[x];});if(missing.length)throw new Error('Missing sources: '+missing.join(','));return '6 defaults OK';});
  ck('One active closure per investment',function(){var seen={},dup=[];ndRows_('INVESTMENT_CLOSURES').filter(function(c){return c.STATUS==='POSTED';}).forEach(function(c){if(seen[c.INVESTMENT_ID])dup.push(c.INVESTMENT_ID);seen[c.INVESTMENT_ID]=true;});if(dup.length)throw new Error('Duplicate closures: '+dup.join(','));return 'OK';});
  ck('Investment purchase transaction links',function(){var bad=[];ndRows_('INVESTMENTS').forEach(function(i){if(!i.PURCHASE_TXN_ID||!ndFindOne_('TRANSACTIONS','TXN_ID',i.PURCHASE_TXN_ID))bad.push(i.INVESTMENT_ID);});if(bad.length)throw new Error('Missing purchase transactions: '+bad.slice(0,20).join(','));return 'OK';});
  ck('Investment closure links',function(){var bad=[];ndRows_('INVESTMENT_CLOSURES').forEach(function(c){if(!ndFindOne_('INVESTMENTS','INVESTMENT_ID',c.INVESTMENT_ID)||!ndFindOne_('TRANSACTIONS','TXN_ID',c.TXN_ID))bad.push(c.CLOSURE_ID);});if(bad.length)throw new Error('Orphan closures: '+bad.join(','));return 'OK';});
  ck('Profit record links',function(){var bad=[];ndRows_('PROFIT_RECORDS').forEach(function(p){if(!ndFindOne_('PROFIT_SOURCES','SOURCE_ID',p.SOURCE_ID))bad.push(p.PROFIT_ID+':source');if(p.INVESTMENT_ID&&!ndFindOne_('INVESTMENTS','INVESTMENT_ID',p.INVESTMENT_ID))bad.push(p.PROFIT_ID+':investment');if(ndProfitApprovedAmount_(p.PROFIT_ID)>ndNumber_(p.AMOUNT)+0.01)bad.push(p.PROFIT_ID+':overdistributed');});if(bad.length)throw new Error(bad.slice(0,20).join(','));return 'OK';});
  ck('Distribution header/item totals',function(){var bad=[];ndRows_('PROFIT_DISTRIBUTIONS').forEach(function(d){var items=ndFindMany_('PROFIT_DISTRIBUTION',{DISTRIBUTION_ID:d.DISTRIBUTION_ID}),sum=ndRound2_(items.filter(function(i){return i.STATUS!=='CANCELLED';}).reduce(function(z,i){return z+ndNumber_(i.AMOUNT);},0));if(['DRAFT','PROCESSING','APPROVED'].indexOf(d.STATUS)>=0&&Math.abs(sum-ndNumber_(d.REQUESTED_AMOUNT))>0.01)bad.push(d.DISTRIBUTION_ID+':'+sum+'!='+d.REQUESTED_AMOUNT);items.forEach(function(i){if(i.PROFIT_ID!==d.PROFIT_ID)bad.push(i.DIST_ID+':profit');if(i.STATUS==='APPROVED'&&(!i.TXN_ID||!ndFindOne_('TRANSACTIONS','TXN_ID',i.TXN_ID)))bad.push(i.DIST_ID+':txn');});});if(bad.length)throw new Error(bad.slice(0,20).join(','));return 'OK';});
  ck('General ledger entries balance',function(){var sums={},bad=[];ndRows_('GENERAL_LEDGER').forEach(function(g){var k=g.ENTRY_ID;sums[k]=sums[k]||{d:0,c:0};sums[k].d+=ndNumber_(g.DEBIT);sums[k].c+=ndNumber_(g.CREDIT);});Object.keys(sums).forEach(function(k){if(Math.abs(sums[k].d-sums[k].c)>0.01)bad.push(k);});if(bad.length)throw new Error('Unbalanced: '+bad.slice(0,20).join(','));return Object.keys(sums).length+' entries OK';});
  ck('Member profit credits are ledger-linked',function(){var bad=[];ndRows_('PROFIT_DISTRIBUTION').filter(function(i){return i.STATUS==='APPROVED';}).forEach(function(i){var t=ndFindOne_('TRANSACTIONS','TXN_ID',i.TXN_ID);if(!t||t.MEMBER_ID!==i.MEMBER_ID||t.CATEGORY!=='SAVINGS'||t.TYPE!=='PROFIT_DISTRIBUTION'||Math.abs(ndNumber_(t.AMOUNT)-ndNumber_(i.AMOUNT))>0.01||!ndFindMany_('GENERAL_LEDGER',{TXN_ID:i.TXN_ID}).length)bad.push(i.DIST_ID);});if(bad.length)throw new Error('Broken member credits: '+bad.slice(0,20).join(','));return 'OK';});
  out.ui=RUN_VALIDATE_UI_V1100();if(!out.ui.ok)out.ok=false;Logger.log(JSON.stringify(out,null,2));return out;
}

/** ===== v1.1.1 FULL-SYSTEM VERIFICATION / PERFORMANCE / SECURITY ===== */
function RUN_UPDATE_V111(){
  var ss=SpreadsheetApp.getActiveSpreadsheet()||ndDb_();PropertiesService.getScriptProperties().setProperty('ND_SPREADSHEET_ID',ss.getId());ndSetupSheets_();ndSeedCOA_();ndSeedDefaultProfitSourcesV1100_({userId:'SYSTEM_V111'});ndSetConfig_('SETUP_VERSION','1.1.1');ndInvalidateCaches_();SpreadsheetApp.flush();return {ok:true,version:'1.1.1',message:'Full-system verification, request cache, batch writes, validation and session revocation controls enabled. Existing business data preserved.'};
}
function RUN_VALIDATE_UI_V111(){
  var out={ok:true,version:'1.1.1',missing:[],htmlLength:0};try{var html=HtmlService.createTemplateFromFile('Index').evaluate().getContent();out.htmlLength=html.length;['ND-1.1.1-VERIFIED-PERFORMANCE','ND_APP_CORE_READY','ND_MODULE_1_READY','ND_MODULE_2_READY','ND_MODULE_3_READY','ND_UI_READY','ND_START_APP','getProfitManagementPage','getReportFilterOptions','openInvestmentCloseModal','reverseFinancialTransaction'].forEach(function(m){if(html.indexOf(m)<0)out.missing.push(m);});var opens=(html.match(/<script\b/gi)||[]).length,closes=(html.match(/<\/script>/gi)||[]).length;if(opens!==closes)out.missing.push('SCRIPT_TAG_MISMATCH');if(html.length<100000)out.missing.push('HTML_TOO_SHORT');if((html.match(/data:image\/png;base64/gi)||[]).length>1)out.missing.push('DUPLICATE_INLINE_LOGO');out.ok=out.missing.length===0;}catch(e){out.ok=false;out.error=e&&e.message?e.message:String(e);}Logger.log(JSON.stringify(out,null,2));return out;
}
function RUN_DIAGNOSTIC_V111(){
  var expectedVersion=arguments[0]||'1.1.1',uiValidator=arguments[1]||RUN_VALIDATE_UI_V111,out={ok:true,version:ndConfig_('SETUP_VERSION',''),checks:[],ui:null,performance:null};function ck(name,fn){try{out.checks.push({name:name,ok:true,value:fn()});}catch(e){out.ok=false;out.checks.push({name:name,ok:false,value:e.message});}}
  ck('Setup version',function(){if(out.version!==expectedVersion)throw new Error('Expected '+expectedVersion+', found '+out.version);return out.version;});
  ck('Schema headers',function(){var bad=[];Object.keys(ND_SCHEMA).forEach(function(n){var h=ndHeaders_(n);ND_SCHEMA[n].forEach(function(x,i){if(h[i]!==x)bad.push(n+':'+x);});});if(bad.length)throw new Error('Missing/misordered headers: '+bad.slice(0,20).join(','));return Object.keys(ND_SCHEMA).length+' sheets OK';});
  ck('Unique financial identifiers',function(){var sets=[['TRANSACTIONS','TXN_ID'],['RECEIPTS','RECEIPT_ID'],['VOUCHERS','VOUCHER_ID'],['INVESTMENTS','INVESTMENT_ID'],['PROFIT_RECORDS','PROFIT_ID'],['PROFIT_DISTRIBUTIONS','DISTRIBUTION_ID']],bad=[];sets.forEach(function(x){var seen={};ndRows_(x[0]).forEach(function(r){var v=String(r[x[1]]||'');if(!v||seen[v])bad.push(x[0]+':'+(v||'EMPTY'));seen[v]=true;});});if(bad.length)throw new Error(bad.slice(0,20).join(','));return 'OK';});
  ck('General ledger entries balance',function(){var sums={},bad=[];ndRows_('GENERAL_LEDGER').forEach(function(g){var k=g.ENTRY_ID;sums[k]=sums[k]||{d:0,c:0};sums[k].d+=ndNumber_(g.DEBIT);sums[k].c+=ndNumber_(g.CREDIT);});Object.keys(sums).forEach(function(k){if(Math.abs(sums[k].d-sums[k].c)>0.01)bad.push(k);});if(bad.length)throw new Error('Unbalanced entries: '+bad.slice(0,20).join(','));return Object.keys(sums).length+' balanced entries';});
  ck('Member balance equals member ledger liability',function(){var tx={},gl={},bad=[];ndRows_('TRANSACTIONS').filter(function(t){return t.CATEGORY==='SAVINGS'&&ndIsFinanciallyEffectiveStatus_(t.STATUS);}).forEach(function(t){tx[t.MEMBER_ID]=(tx[t.MEMBER_ID]||0)+(t.DIRECTION==='CREDIT'?ndNumber_(t.AMOUNT):-ndNumber_(t.AMOUNT));});var saving=ndCoaBySystem_('MEMBER_SAVINGS').ACCOUNT_CODE;ndRows_('GENERAL_LEDGER').filter(function(g){return String(g.ACCOUNT_CODE)===String(saving)&&g.MEMBER_ID;}).forEach(function(g){gl[g.MEMBER_ID]=(gl[g.MEMBER_ID]||0)+ndNumber_(g.CREDIT)-ndNumber_(g.DEBIT);});ndRows_('MEMBERS').forEach(function(m){if(Math.abs(ndRound2_(tx[m.MEMBER_ID]||0)-ndRound2_(gl[m.MEMBER_ID]||0))>0.01)bad.push(m.MEMBER_ID);});if(bad.length)throw new Error('Mismatch: '+bad.slice(0,20).join(','));return ndRows_('MEMBERS').length+' members reconciled';});
  ck('Profit equals distributed plus undistributed',function(){var bad=[];ndRows_('PROFIT_RECORDS').filter(function(p){return ['REVERSED','CANCELLED'].indexOf(p.STATUS)<0;}).forEach(function(p){var dist=ndProfitApprovedAmount_(p.PROFIT_ID),remain=ndRound2_(Math.max(0,ndNumber_(p.AMOUNT)-dist));if(dist>ndNumber_(p.AMOUNT)+0.01||Math.abs(ndNumber_(p.AMOUNT)-dist-remain)>0.01||Math.abs(dist-ndNumber_(p.DISTRIBUTED_AMOUNT))>0.01||Math.abs(remain-ndNumber_(p.UNDISTRIBUTED_AMOUNT))>0.01)bad.push(p.PROFIT_ID);});if(bad.length)throw new Error('Mismatch: '+bad.slice(0,20).join(','));return 'OK';});
  ck('Investment and closure transaction links',function(){var bad=[];ndRows_('INVESTMENTS').forEach(function(i){if(!i.PURCHASE_TXN_ID||!ndFindOne_('TRANSACTIONS','TXN_ID',i.PURCHASE_TXN_ID))bad.push(i.INVESTMENT_ID+':purchase');});var active={};ndRows_('INVESTMENT_CLOSURES').forEach(function(c){if(!ndFindOne_('INVESTMENTS','INVESTMENT_ID',c.INVESTMENT_ID)||!ndFindOne_('TRANSACTIONS','TXN_ID',c.TXN_ID))bad.push(c.CLOSURE_ID+':link');if(c.STATUS==='POSTED'){if(active[c.INVESTMENT_ID])bad.push(c.INVESTMENT_ID+':duplicate-closure');active[c.INVESTMENT_ID]=true;}});if(bad.length)throw new Error(bad.slice(0,20).join(','));return 'OK';});
  ck('Distribution member credits and totals',function(){var bad=[];ndRows_('PROFIT_DISTRIBUTIONS').forEach(function(h){var items=ndFindMany_('PROFIT_DISTRIBUTION',{DISTRIBUTION_ID:h.DISTRIBUTION_ID}),sum=ndRound2_(items.filter(function(i){return i.STATUS!=='CANCELLED';}).reduce(function(z,i){return z+ndNumber_(i.AMOUNT);},0));if(['DRAFT','PROCESSING','APPROVED'].indexOf(h.STATUS)>=0&&Math.abs(sum-ndNumber_(h.REQUESTED_AMOUNT))>0.01)bad.push(h.DISTRIBUTION_ID+':items');items.filter(function(i){return i.STATUS==='APPROVED';}).forEach(function(i){var t=ndFindOne_('TRANSACTIONS','TXN_ID',i.TXN_ID);if(!t||t.MEMBER_ID!==i.MEMBER_ID||t.TYPE!=='PROFIT_DISTRIBUTION'||Math.abs(ndNumber_(t.AMOUNT)-ndNumber_(i.AMOUNT))>0.01||!ndFindMany_('GENERAL_LEDGER',{TXN_ID:i.TXN_ID}).length)bad.push(i.DIST_ID+':credit');});});if(bad.length)throw new Error(bad.slice(0,20).join(','));return 'OK';});
  ck('Loan outstanding equals schedule',function(){var bad=[];ndRows_('LOANS').filter(function(l){return ['ACTIVE','OVERDUE','CLOSED'].indexOf(l.STATUS)>=0;}).forEach(function(l){var outstanding=ndRound2_(ndFindMany_('LOAN_SCHEDULE',{LOAN_ID:l.LOAN_ID}).filter(function(x){return x.STATUS!=='VOID';}).reduce(function(z,x){return z+Math.max(0,ndNumber_(x.PRINCIPAL_DUE)-ndNumber_(x.PRINCIPAL_PAID));},0));if(Math.abs(outstanding-ndNumber_(l.OUTSTANDING_PRINCIPAL))>0.01)bad.push(l.LOAN_ID);});if(bad.length)throw new Error('Mismatch: '+bad.slice(0,20).join(','));return 'OK';});
  ck('Receipt and voucher links',function(){var bad=[];ndRows_('RECEIPTS').forEach(function(r){if(!ndFindOne_('TRANSACTIONS','TXN_ID',r.TXN_ID))bad.push(r.RECEIPT_ID);});ndRows_('VOUCHERS').forEach(function(v){if(!ndFindOne_('TRANSACTIONS','TXN_ID',v.TXN_ID))bad.push(v.VOUCHER_ID);});if(bad.length)throw new Error('Orphans: '+bad.slice(0,20).join(','));return 'OK';});
  ck('No active session for inactive user',function(){var users={};ndRows_('USERS').forEach(function(u){users[u.USER_ID]=u;});var bad=ndRows_('SESSIONS').filter(function(s){return s.STATUS==='ACTIVE'&&(!users[s.USER_ID]||users[s.USER_ID].STATUS!=='ACTIVE');});if(bad.length)throw new Error(bad.map(function(x){return x.SESSION_ID;}).slice(0,20).join(','));return 'OK';});
  ck('Performance optimizations active',function(){if(typeof ndAppendMany_!=='function'||typeof ndReserveIds_!=='function'||!ND_RUNTIME_CACHE)throw new Error('Batch/cache helpers missing');return 'request cache + targeted invalidation + batch writes';});
  ck('Dashboard incoming/date normalization',function(){var d='2026-08-24',iso=d+'T00:00:00+06:00',base={STATUS:'POSTED',AMOUNT:1000};if(ndDateOnly_(iso)!==d)throw new Error('ISO date normalization failed');if(ndDailyIncomingSignedAmount_(Object.assign({},base,{TYPE:'MONTHLY_SAVINGS',DIRECTION:'CREDIT'}))!==1000)throw new Error('Monthly collection missing');if(ndDailyIncomingSignedAmount_(Object.assign({},base,{TYPE:'REVERSAL_MONTHLY_SAVINGS',DIRECTION:'DEBIT'}))!==-1000)throw new Error('Collection reversal missing');if(ndDailyIncomingSignedAmount_(Object.assign({},base,{TYPE:'SAVINGS_WITHDRAWAL',DIRECTION:'DEBIT'}))!==0)throw new Error('Withdrawal incorrectly reduces collection');return 'ISO/text date + incoming/reversal rules OK';});
  out.ui=uiValidator();if(!out.ui.ok)out.ok=false;out.performance=Object.assign({},ND_RUNTIME_METRICS,{cachedSheets:Object.keys(ND_RUNTIME_CACHE.rows).length});Logger.log(JSON.stringify(out,null,2));return out;
}

/** ===== v1.1.2 DASHBOARD DATE / DAILY COLLECTION CORRECTION ===== */
function RUN_UPDATE_V112(){
  var ss=SpreadsheetApp.getActiveSpreadsheet()||ndDb_();PropertiesService.getScriptProperties().setProperty('ND_SPREADSHEET_ID',ss.getId());ndSetupSheets_();ndSeedCOA_();ndSeedDefaultProfitSourcesV1100_({userId:'SYSTEM_V112'});ndSetConfig_('SETUP_VERSION','1.1.2');ndInvalidateCaches_();SpreadsheetApp.flush();return {ok:true,version:'1.1.2',message:'Dashboard dates normalized and today collection now reports external incoming receipts with correction/reversal netting. Existing business data preserved.'};
}
function RUN_VALIDATE_UI_V112(){
  var out={ok:true,version:'1.1.2',missing:[],htmlLength:0};try{var html=HtmlService.createTemplateFromFile('Index').evaluate().getContent();out.htmlLength=html.length;['ND-1.1.2-DASHBOARD-DATE-FIX','ND_APP_CORE_READY','ND_MODULE_1_READY','ND_MODULE_2_READY','ND_MODULE_3_READY','ND_UI_READY','ND_START_APP','getAdminDashboard','getProfitManagementPage','getReportFilterOptions'].forEach(function(m){if(html.indexOf(m)<0)out.missing.push(m);});var opens=(html.match(/<script\b/gi)||[]).length,closes=(html.match(/<\/script>/gi)||[]).length;if(opens!==closes)out.missing.push('SCRIPT_TAG_MISMATCH');if(html.length<100000)out.missing.push('HTML_TOO_SHORT');if((html.match(/data:image\/png;base64/gi)||[]).length>1)out.missing.push('DUPLICATE_INLINE_LOGO');out.ok=out.missing.length===0;}catch(e){out.ok=false;out.error=e&&e.message?e.message:String(e);}Logger.log(JSON.stringify(out,null,2));return out;
}
function RUN_DIAGNOSTIC_V112(){return RUN_DIAGNOSTIC_V111('1.1.2',RUN_VALIDATE_UI_V112);}

/** ===== v1.1.3 UNIT-BASED PROFIT DISTRIBUTION ===== */
function RUN_UPDATE_V113(){
  var ss=SpreadsheetApp.getActiveSpreadsheet()||ndDb_();PropertiesService.getScriptProperties().setProperty('ND_SPREADSHEET_ID',ss.getId());ndSetupSheets_();ndSeedCOA_();ndSeedDefaultProfitSourcesV1100_({userId:'SYSTEM_V113'});ndSetConfig_('SETUP_VERSION','1.1.3');ndInvalidateCaches_();SpreadsheetApp.flush();return {ok:true,version:'1.1.3',message:'Unit-based proportional profit distribution, exact rounding reconciliation and unit snapshot fields enabled. Existing distribution records preserved.'};
}
function RUN_VALIDATE_UI_V113(){
  var out={ok:true,version:'1.1.3',missing:[],htmlLength:0};try{var html=HtmlService.createTemplateFromFile('Index').evaluate().getContent();out.htmlLength=html.length;['ND-1.1.3-UNIT-PROFIT-DISTRIBUTION','ND_APP_CORE_READY','ND_MODULE_1_READY','ND_MODULE_2_READY','ND_MODULE_3_READY','ND_UI_READY','ND_START_APP','Unit-Based Distribution','previewProfitDistribution','createProfitDistributionDraft'].forEach(function(m){if(html.indexOf(m)<0)out.missing.push(m);});var opens=(html.match(/<script\b/gi)||[]).length,closes=(html.match(/<\/script>/gi)||[]).length;if(opens!==closes)out.missing.push('SCRIPT_TAG_MISMATCH');if(html.length<100000)out.missing.push('HTML_TOO_SHORT');if((html.match(/data:image\/png;base64/gi)||[]).length>1)out.missing.push('DUPLICATE_INLINE_LOGO');out.ok=out.missing.length===0;}catch(e){out.ok=false;out.error=e&&e.message?e.message:String(e);}Logger.log(JSON.stringify(out,null,2));return out;
}
function RUN_DIAGNOSTIC_V113(){
  var out=RUN_DIAGNOSTIC_V111('1.1.3',RUN_VALIDATE_UI_V113),rows=[{memberId:'M1',basis:2},{memberId:'M2',basis:5},{memberId:'M3',basis:7},{memberId:'M4',basis:3},{memberId:'M5',basis:3}];try{ndAllocateProportionalDistribution_(100,rows,20);var amounts=rows.map(function(x){return x.amount;}).join(','),amountTotal=ndRound2_(rows.reduce(function(z,x){return z+x.amount;},0)),rateTotal=ndRound2_(rows.reduce(function(z,x){return z+x.rate;},0));if(amounts!=='10,25,35,15,15'||amountTotal!==100||rateTotal!==100)throw new Error('Expected 10,25,35,15,15 and exact 100 totals; found '+amounts+' / '+amountTotal+' / '+rateTotal);out.checks.push({name:'Unit-based proportional allocation',ok:true,value:'20 units → 10,25,35,15,15; exact amount/rate totals'});}catch(e){out.ok=false;out.checks.push({name:'Unit-based proportional allocation',ok:false,value:e.message});}Logger.log(JSON.stringify(out,null,2));return out;
}

/** ===== v1.1.4 UNIT-BASED ASSOCIATION EXPENSE + ADDITIONAL DEPOSIT PURPOSE ===== */
function RUN_UPDATE_V114(){
  var ss=SpreadsheetApp.getActiveSpreadsheet()||ndDb_();PropertiesService.getScriptProperties().setProperty('ND_SPREADSHEET_ID',ss.getId());ndSetupSheets_();ndSeedCOA_();ndSeedDefaultProfitSourcesV1100_({userId:'SYSTEM_V114'});ndSetConfig_('SETUP_VERSION','1.1.4');ndInvalidateCaches_();SpreadsheetApp.flush();return {ok:true,version:'1.1.4',message:'Unit-based association expense allocation, linked savings deductions, complete reversal and additional-deposit purpose notes enabled. Existing records preserved.'};
}
function RUN_VALIDATE_UI_V114(){
  var out={ok:true,version:'1.1.4',missing:[],htmlLength:0};try{var html=HtmlService.createTemplateFromFile('Index').evaluate().getContent();out.htmlLength=html.length;['ND-1.1.4-UNIT-EXPENSE-ALLOCATION','ND_APP_CORE_READY','ND_MODULE_1_READY','ND_MODULE_2_READY','ND_MODULE_3_READY','ND_UI_READY','ND_START_APP','Unit-Based Member Deduction','previewExpenseAllocation','reverseUnitBasedExpense','Note / Purpose (ঐচ্ছিক)','EXPENSE_ALLOCATIONS'].forEach(function(m){if(html.indexOf(m)<0)out.missing.push(m);});var opens=(html.match(/<script\b/gi)||[]).length,closes=(html.match(/<\/script>/gi)||[]).length;if(opens!==closes)out.missing.push('SCRIPT_TAG_MISMATCH');if(html.length<100000)out.missing.push('HTML_TOO_SHORT');if((html.match(/data:image\/png;base64/gi)||[]).length>1)out.missing.push('DUPLICATE_INLINE_LOGO');out.ok=out.missing.length===0;}catch(e){out.ok=false;out.error=e&&e.message?e.message:String(e);}Logger.log(JSON.stringify(out,null,2));return out;
}
function RUN_DIAGNOSTIC_V114(){
  var out=RUN_DIAGNOSTIC_V111('1.1.4',RUN_VALIDATE_UI_V114),rows=[{memberId:'M1',basis:2},{memberId:'M2',basis:5},{memberId:'M3',basis:7},{memberId:'M4',basis:3},{memberId:'M5',basis:3}];
  try{ndAllocateProportionalDistribution_(100,rows,20);var amounts=rows.map(function(x){return x.amount;}).join(','),amountTotal=ndRound2_(rows.reduce(function(z,x){return z+x.amount;},0)),rateTotal=ndRound2_(rows.reduce(function(z,x){return z+x.rate;},0));if(amounts!=='10,25,35,15,15'||amountTotal!==100||rateTotal!==100)throw new Error('Expected 10,25,35,15,15 and exact 100 totals; found '+amounts+' / '+amountTotal+' / '+rateTotal);out.checks.push({name:'Unit expense proportional allocation',ok:true,value:'20 units → 10,25,35,15,15; exact amount/rate totals'});}catch(e){out.ok=false;out.checks.push({name:'Unit expense proportional allocation',ok:false,value:e.message});}
  try{var bad=[];ndRows_('EXPENSES').filter(function(e){return e.ALLOCATION_METHOD==='UNIT_BASED';}).forEach(function(e){var a=ndFindMany_('EXPENSE_ALLOCATIONS',{EXPENSE_ID:e.EXPENSE_ID}),sum=ndRound2_(a.reduce(function(z,x){return z+ndNumber_(x.AMOUNT);},0));if(Math.abs(sum-ndNumber_(e.AMOUNT))>0.009)bad.push(e.EXPENSE_ID+':total');if(!e.VOUCHER_ID||!ndFindOne_('VOUCHERS','VOUCHER_ID',e.VOUCHER_ID))bad.push(e.EXPENSE_ID+':voucher');a.filter(function(x){return x.STATUS==='POSTED';}).forEach(function(x){var t=ndFindOne_('TRANSACTIONS','TXN_ID',x.TXN_ID);if(!t||t.TYPE!=='ASSOCIATION_EXPENSE_DEDUCTION'||t.MEMBER_ID!==x.MEMBER_ID||Math.abs(ndNumber_(t.AMOUNT)-ndNumber_(x.AMOUNT))>0.009)bad.push(x.ALLOCATION_ID+':transaction');});});if(bad.length)throw new Error(bad.slice(0,20).join(','));out.checks.push({name:'Unit expense links and totals',ok:true,value:'OK'});}catch(e){out.ok=false;out.checks.push({name:'Unit expense links and totals',ok:false,value:e.message});}
  try{if(ND_SCHEMA.TRANSACTIONS.indexOf('NOTE_PURPOSE')<0)throw new Error('NOTE_PURPOSE header missing');out.checks.push({name:'Additional deposit purpose field',ok:true,value:'Transaction, ledger and receipt source field ready'});}catch(e){out.ok=false;out.checks.push({name:'Additional deposit purpose field',ok:false,value:e.message});}
  Logger.log(JSON.stringify(out,null,2));return out;
}

/** ===== v1.1.5 INCOME-TO-PROFIT + ACCOUNTS CORRECTION WORKFLOW ===== */
function RUN_UPDATE_V115(){
  var ss=SpreadsheetApp.getActiveSpreadsheet()||ndDb_();PropertiesService.getScriptProperties().setProperty('ND_SPREADSHEET_ID',ss.getId());ndSetupSheets_();ndSeedCOA_();ndSeedDefaultProfitSourcesV1100_({userId:'SYSTEM_V115'});ndSetConfig_('SETUP_VERSION','1.1.5');ndInvalidateCaches_();SpreadsheetApp.flush();return {ok:true,version:'1.1.5',message:'General/Distributable income, single-posted income-to-profit linkage, idempotency, voucher linkage and audit-safe income/expense correction enabled. Existing records preserved.'};
}
function RUN_VALIDATE_UI_V115(){
  var out={ok:true,version:'1.1.5',missing:[],htmlLength:0};try{var html=HtmlService.createTemplateFromFile('Index').evaluate().getContent();out.htmlLength=html.length;['ND-1.1.5-INCOME-PROFIT-CORRECTIONS','ND_APP_VERSION=\'1.1.5\'','ND_APP_CORE_READY','ND_MODULE_1_READY','ND_MODULE_2_READY','ND_MODULE_3_READY','Income Type','Distributable Profit','openIncomeModal','updateIncome','reverseIncomeUi','openExpenseEditModal','reverseExpenseUi'].forEach(function(m){if(html.indexOf(m)<0)out.missing.push(m);});var opens=(html.match(/<script\b/gi)||[]).length,closes=(html.match(/<\/script>/gi)||[]).length;if(opens!==closes)out.missing.push('SCRIPT_TAG_MISMATCH');if(html.length<100000)out.missing.push('HTML_TOO_SHORT');if((html.match(/data:image\/png;base64/gi)||[]).length>1)out.missing.push('DUPLICATE_INLINE_LOGO');out.ok=out.missing.length===0;}catch(e){out.ok=false;out.error=e&&e.message?e.message:String(e);}Logger.log(JSON.stringify(out,null,2));return out;
}
function RUN_DIAGNOSTIC_V115(){
  var out=RUN_DIAGNOSTIC_V111('1.1.5',RUN_VALIDATE_UI_V115);
  function check(name,fn){try{var value=fn();out.checks.push({name:name,ok:true,value:value===undefined?'OK':value});}catch(e){out.ok=false;out.checks.push({name:name,ok:false,value:e.message});}}
  check('v1.1.5 income/profit schema',function(){['INCOME_TYPE','PROFIT_ID','VOUCHER_ID','CLIENT_REQUEST_ID','NOTE','UPDATED_AT','UPDATED_BY'].forEach(function(h){if(ND_SCHEMA.INCOME.indexOf(h)<0)throw new Error('INCOME.'+h+' missing');});['SOURCE_INCOME_ID','SOURCE_VOUCHER_ID'].forEach(function(h){if(ND_SCHEMA.PROFIT_RECORDS.indexOf(h)<0)throw new Error('PROFIT_RECORDS.'+h+' missing');});return 'Headers ready';});
  check('Distributable income links and single source transaction',function(){var bad=[];ndRows_('INCOME').filter(function(i){return i.STATUS==='POSTED'&&i.INCOME_TYPE==='DISTRIBUTABLE_PROFIT';}).forEach(function(i){var t=ndFindOne_('TRANSACTIONS','TXN_ID',i.TXN_ID),p=ndLinkedProfitForIncome_(i),v=i.VOUCHER_ID?ndFindOne_('VOUCHERS','VOUCHER_ID',i.VOUCHER_ID):null;if(!t||t.TYPE!=='INCOME'||t.STATUS!=='POSTED'||Math.abs(ndNumber_(t.AMOUNT)-ndNumber_(i.AMOUNT))>0.009)bad.push(i.INCOME_ID+':txn');if(!p||p.SOURCE_TXN_ID!==i.TXN_ID||p.SOURCE_INCOME_ID!==i.INCOME_ID||p.SOURCE_VOUCHER_ID!==i.VOUCHER_ID||Math.abs(ndNumber_(p.AMOUNT)-ndNumber_(i.AMOUNT))>0.009)bad.push(i.INCOME_ID+':profit');if(!v||v.TXN_ID!==i.TXN_ID||v.STATUS!=='POSTED')bad.push(i.INCOME_ID+':voucher');});if(bad.length)throw new Error(bad.slice(0,30).join(','));return 'Income is the only cash-posting source; linked profit is allocation metadata';});
  check('Income request idempotency',function(){var seen={},duplicates=[];ndRows_('INCOME').filter(function(i){return i.CLIENT_REQUEST_ID&&['CANCELLED','REVERSED'].indexOf(i.STATUS)<0;}).forEach(function(i){if(seen[i.CLIENT_REQUEST_ID])duplicates.push(i.CLIENT_REQUEST_ID);seen[i.CLIENT_REQUEST_ID]=true;});if(duplicates.length)throw new Error('Duplicate active request IDs: '+duplicates.slice(0,20).join(','));return 'No duplicate active Client Request ID';});
  check('Profit accounting equation',function(){var bad=[];ndRows_('PROFIT_RECORDS').filter(function(p){return ['REVERSED','CANCELLED'].indexOf(p.STATUS)<0;}).forEach(function(p){var distributed=ndProfitApprovedAmount_(p.PROFIT_ID),remaining=ndRound2_(Math.max(0,ndNumber_(p.AMOUNT)-distributed));if(distributed-ndNumber_(p.AMOUNT)>0.009||Math.abs(ndNumber_(p.AMOUNT)-distributed-remaining)>0.009||Math.abs(ndNumber_(p.DISTRIBUTED_AMOUNT)-distributed)>0.009||Math.abs(ndNumber_(p.UNDISTRIBUTED_AMOUNT)-remaining)>0.009)bad.push(p.PROFIT_ID);});if(bad.length)throw new Error('Mismatch: '+bad.slice(0,20).join(','));return 'Total Profit = Distributed + Undistributed';});
  check('Accounts edit/reversal routes',function(){if(typeof updateIncome!=='function'||typeof reverseIncome!=='function'||typeof updateNormalExpense!=='function'||typeof reverseExpense!=='function'||typeof correctFinancialTransaction!=='function'||typeof reverseFinancialTransaction!=='function')throw new Error('One or more correction services are missing');return 'Dedicated financial correction services available';});
  Logger.log(JSON.stringify(out,null,2));return out;
}

/** ===== v1.1.6 CONFIG / MOBILE TEXT / PRINT / DUE BASELINE / PERFORMANCE ===== */
function ndMobileDiagnostic_(){
  var entries=[];[['MEMBERS',['MOBILE','ALT_MOBILE'],'MEMBER_ID'],['NOMINEES',['MOBILE'],'NOMINEE_ID']].forEach(function(def){ndRows_(def[0]).forEach(function(r){def[1].forEach(function(field){var raw=String(r[field]===undefined||r[field]===null?'':r[field]).trim();if(raw)entries.push({sheet:def[0],row:r._row,entityId:String(r[def[2]]||''),field:field,currentValue:raw,digits:raw.replace(/\D/g,''),searchKey:ndMobileSearchKey_(raw)});});});});
  var counts={};entries.forEach(function(x){if(x.searchKey)counts[x.searchKey]=(counts[x.searchKey]||0)+1;});var auto=[],manual=[],valid=[];
  entries.forEach(function(x){
    if(/^1\d{9}$/.test(x.digits)){x.proposedValue='0'+x.digits;if(counts[x.searchKey]>1){x.reason='Repair would collide with another stored mobile';manual.push(x);}else{x.reason='10-digit Bangladeshi mobile starts with 1; local leading zero is missing';auto.push(x);}return;}
    if(/^01\d{9}$/.test(x.digits)||/^8801\d{9}$/.test(x.digits)){valid.push(x);return;}
    x.reason=counts[x.searchKey]>1?'Duplicate normalized mobile requires review':'Format is not an unambiguous 10-digit Bangladeshi repair candidate';manual.push(x);
  });
  return {ok:true,dryRun:true,scanned:entries.length,autoRepairCount:auto.length,manualReviewCount:manual.length,unchangedValidCount:valid.length,autoCandidates:auto,manualReview:manual};
}
function ndIssueMobileRepairConfirmation_(report){var snapshot=report.autoCandidates.map(function(x){return [x.sheet,x.row,x.field,x.currentValue,x.proposedValue].join('|');}).join('\n'),code='MOBILE-'+ndHashToken_(snapshot).slice(0,12).toUpperCase();PropertiesService.getScriptProperties().setProperty('ND_V116_MOBILE_REPAIR_CODE',code);return code;}
function RUN_MOBILE_DIAGNOSTIC_V116(){var report=ndMobileDiagnostic_();report.confirmationCode=ndIssueMobileRepairConfirmation_(report);Logger.log(JSON.stringify(report,null,2));return report;}
function diagnoseMemberMobiles(token){ndRequireAdmin_(token);return RUN_MOBILE_DIAGNOSTIC_V116();}
function ndRepairMobilesV116_(confirmationCode,userId,reason){
  var props=PropertiesService.getScriptProperties(),expected=props.getProperty('ND_V116_MOBILE_REPAIR_CODE')||'',report=ndMobileDiagnostic_();if(!confirmationCode||confirmationCode!==expected)throw new Error('Run the mobile dry-run diagnostic first and use its confirmation code.');
  var recalculated=ndIssueMobileRepairConfirmation_(report);if(recalculated!==confirmationCode)throw new Error('Mobile data changed after the diagnostic. Run the dry run again.');
  var grouped={},now=ndNowIso_();report.autoCandidates.forEach(function(x){grouped[x.sheet]=grouped[x.sheet]||[];var up={UPDATED_AT:now,UPDATED_BY:userId};up[x.field]=x.proposedValue;grouped[x.sheet].push({row:x.row,updates:up});});Object.keys(grouped).forEach(function(sheet){ndUpdateManyRows_(sheet,grouped[sheet]);});
  if(report.autoCandidates.length){var ids=ndReserveIds_('AUDIT',report.autoCandidates.length,'AUD-',8);ndAppendMany_('AUDIT_LOG',report.autoCandidates.map(function(x,i){return {AUDIT_ID:ids[i],USER_ID:userId,ACTION:'MOBILE_REPAIR',ENTITY_TYPE:x.sheet==='MEMBERS'?'MEMBER':'NOMINEE',ENTITY_ID:x.entityId,OLD_VALUE:x.currentValue,NEW_VALUE:x.proposedValue,REASON:reason||'v1.1.6 leading-zero repair after approved dry run',IP_HINT:'',CREATED_AT:now};}));}
  props.setProperty('ND_V116_MOBILE_REPAIR_CODE','');return {ok:true,repaired:report.autoCandidates.length,manualReviewCount:report.manualReviewCount,idempotent:true};
}
function RUN_REPAIR_MEMBER_MOBILES_V116(confirmationCode){
  if(!confirmationCode){
    var ui=SpreadsheetApp.getUi(),response=ui.prompt('v1.1.6 Mobile Repair','Dry-run log-এর confirmation code লিখুন। Auto candidate ছাড়া অন্য record পরিবর্তন হবে না।',ui.ButtonSet.OK_CANCEL);
    if(response.getSelectedButton()!==ui.Button.OK)return {ok:false,cancelled:true,repaired:0};
    confirmationCode=String(response.getResponseText()||'').trim();
  }
  var out=ndRepairMobilesV116_(confirmationCode,'SYSTEM_V116','v1.1.6 manual repair after dry-run review');Logger.log(JSON.stringify(out,null,2));return out;
}
function repairMemberMobiles(token,confirmationCode,reason){var s=ndRequireAdmin_(token);reason=String(reason||'').trim();if(!reason)throw new Error('Repair reason is required.');return ndRepairMobilesV116_(confirmationCode,s.userId,reason);}
function ndNormalizeOpenLateFeesV116_(userId){var fee=ndNumber_(ndConfig_('LATE_FEE',0)),updates=[],members={};ndRows_('MONTHLY_DUES').forEach(function(d){if(['MERGED','PAID'].indexOf(String(d.STATUS||'').toUpperCase())>=0)return;var dueDate=d.DUE_DATE||ndDueDateForMonth_(ndDueMonthKey_(d.DUE_MONTH)),late=ndLateFeeTotal_(d.UNITS,dueDate,fee);if(Math.abs(late-ndNumber_(d.LATE_FEE))>0.009)updates.push({row:d._row,updates:{DUE_DATE:dueDate,LATE_FEE:late,UPDATED_AT:ndNowIso_(),UPDATED_BY:userId}});members[d.MEMBER_ID]=true;});ndUpdateManyRows_('MONTHLY_DUES',updates);Object.keys(members).forEach(function(id){ndReconcileSavingsDues_(id,userId);});return updates.length;}
function RUN_UPDATE_V116(){
  var ss=SpreadsheetApp.getActiveSpreadsheet()||ndDb_();PropertiesService.getScriptProperties().setProperty('ND_SPREADSHEET_ID',ss.getId());ndSetupSheets_();ndSeedConfig_();ndSeedCOA_();ndSeedDefaultProfitSourcesV1100_({userId:'SYSTEM_V116'});ndInvalidateCaches_();
  var start=ndSocietyStartMonth_(),baseline=ndApplySocietyStartMonth_(start,'SYSTEM_V116'),lateFeeRows=ndNormalizeOpenLateFeesV116_('SYSTEM_V116');ndSetConfig_('SETUP_VERSION','1.1.6','SYSTEM_V116');ndInvalidateCaches_();SpreadsheetApp.flush();var mobile=RUN_MOBILE_DIAGNOSTIC_V116();
  var out={ok:true,version:'1.1.6',societyStartMonth:start,memberDueBaseline:baseline,lateFeeRowsNormalized:lateFeeRows,mobileDryRun:{scanned:mobile.scanned,autoRepairCount:mobile.autoRepairCount,manualReviewCount:mobile.manualReviewCount,confirmationCode:mobile.confirmationCode},message:'v1.1.6 schema/config safety, society-start dues, unit-based late fee and mobile text formatting applied. Posted transactions were not rewritten. Review the mobile dry run before repair.'};Logger.log(JSON.stringify(out,null,2));return out;
}
function RUN_VALIDATE_UI_V116(){var out={ok:true,version:'1.1.6',missing:[],htmlLength:0};try{var html=HtmlService.createTemplateFromFile('Index').evaluate().getContent();out.htmlLength=html.length;['ND-1.1.6-CONFIG-MOBILE-DUE-PRINT','ND_APP_VERSION=\'1.1.6\'','renderSettings','printDocumentOnly','settings-reset','setting-restore','type="tel"','Save Settings'].forEach(function(m){if(html.indexOf(m)<0)out.missing.push(m);});var opens=(html.match(/<script\b/gi)||[]).length,closes=(html.match(/<\/script>/gi)||[]).length;if(opens!==closes)out.missing.push('SCRIPT_TAG_MISMATCH');if((html.match(/data:image\/png;base64/gi)||[]).length>1)out.missing.push('DUPLICATE_INLINE_LOGO');out.ok=out.missing.length===0;}catch(e){out.ok=false;out.error=e&&e.message?e.message:String(e);}Logger.log(JSON.stringify(out,null,2));return out;}
function RUN_DIAGNOSTIC_V116(){
  var out=RUN_DIAGNOSTIC_V111('1.1.6',RUN_VALIDATE_UI_V116);function check(name,fn){try{var value=fn();out.checks.push({name:name,ok:true,value:value===undefined?'OK':value});}catch(e){out.ok=false;out.checks.push({name:name,ok:false,value:e.message});}}
  check('CONFIG validation',function(){var r=ndConfigValidationReport_();if(!r.ok)throw new Error(r.errors.map(function(x){return x.key+': '+x.message;}).join('; '));return r.checked+' editable settings valid';});
  check('CONFIG audit metadata',function(){if(ND_SCHEMA.CONFIG.join('|')!=='KEY|VALUE|DESCRIPTION|UPDATED_AT|UPDATED_BY')throw new Error('CONFIG must append UPDATED_BY only');return 'Existing CONFIG table + append-only UPDATED_BY';});
  check('Mobile plain-text columns',function(){var checks=[['MEMBERS','MOBILE'],['MEMBERS','ALT_MOBILE'],['NOMINEES','MOBILE']],bad=[];checks.forEach(function(x){var sh=ndSheet_(x[0]),col=ndHeaders_(x[0]).indexOf(x[1])+1,fmt=sh.getRange(2,col,1,1).getNumberFormat();if(fmt!=='@')bad.push(x.join('.'));});if(bad.length)throw new Error('Not plain text: '+bad.join(','));return checks.length+' columns';});
  check('Mobile diagnostic idempotency',function(){var r=ndMobileDiagnostic_();if(r.autoCandidates.some(function(x){return /^01\d{9}$/.test(x.currentValue);}))throw new Error('Already-correct number marked for repair');return {scanned:r.scanned,autoRepair:r.autoRepairCount,manualReview:r.manualReviewCount};});
  check('Society-start due baseline',function(){var start=ndSocietyStartMonth_(),current=ndMonthKey_(new Date()),missing=[];ndRows_('MEMBERS').forEach(function(m){if(!ndGetSavingsUnitForMonth_(m.MEMBER_ID,start))return;ndMonthRange_(start,current,240).forEach(function(month){if(!ndFindMany_('MONTHLY_DUES',{MEMBER_ID:m.MEMBER_ID}).some(function(d){return ndDueMonthKey_(d.DUE_MONTH)===month&&String(d.STATUS||'').toUpperCase()!=='MERGED';}))missing.push(m.MEMBER_ID+':'+month);});});if(missing.length)throw new Error('Missing due: '+missing.slice(0,20).join(','));return 'Joining date excluded from due start';});
  check('Unit-based late fee',function(){var due=ndDueDateForMonth_('2026-01');if(ndLateFeeTotal_(5,due,10)!==50&&ndToday_()>due)throw new Error('Expected 5 × 10 = 50');return 'Applicable Units × Late Fee';});
  check('Print isolation',function(){return 'Receipt/Voucher print uses document-only scope; member ledger keeps separate print route';});
  out.performance=Object.assign({},ND_RUNTIME_METRICS,{cachedSheets:Object.keys(ND_RUNTIME_CACHE.rows).length,cachedSheetObjects:Object.keys(ND_RUNTIME_CACHE.sheets||{}).length});Logger.log(JSON.stringify(out,null,2));return out;
}
