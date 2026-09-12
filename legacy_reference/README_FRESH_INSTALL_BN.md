# নতুন দিগন্ত সঞ্চয় সমিতি — WebApp v1.1.6

এটি v1.1.5-এর architecture, UI structure, Google Sheet database এবং financial workflow অক্ষত রেখে তৈরি করা audited safety upgrade। Rebuild করা হয়নি।

## Release-এর প্রধান পরিবর্তন

- Administrator-only Settings page; existing `CONFIG` sheet-এই typed validation, change reason, previous value restore, `UPDATED_AT`, `UPDATED_BY` এবং Audit Log।
- Member/Nominee mobile display value String হিসেবে সংরক্ষণ; `0` ও `+880` অক্ষত; normalized search/duplicate check আলাদা।
- Dry-run-first, confirmation-protected, idempotent mobile repair।
- Receipt/Voucher browser print ও Save as PDF-তে শুধু document; ledger আলাদা print option।
- সকল সদস্যের due baseline `SOCIETY_START_MONTH`; joining date profile information মাত্র। Initial unit society start থেকে এবং পরের unit increase-এর delta historical obligation-এ প্রয়োগ হয়।
- Per-unit late fee, month-end-safe due day, request-level Sheet object cache, one-pass dashboard month aggregation, debounced search এবং 100-row report pagination।

Fresh install-এর জন্য `INSTALLATION_GUIDE_v1.1.6_BN.md` এবং existing v1.1.5 upgrade-এর জন্য `UPGRADE_GUIDE_v1.1.5_TO_v1.1.6_BN.md` অনুসরণ করুন। Live entry শুরুর আগে `RUN_DIAGNOSTIC_V116()`-এ `ok: true` নিশ্চিত করতে হবে।

## Package map

- `Manual_Install/` — Apps Script backend, HTML modules, styles এবং manifest
- `Notun_Digonto_Google_Sheet_Database_Template_v1.1.6.xlsx` — fresh database template
- `tests/` — automated Node regression suites
- `AUDIT_REPORT_v1.1.6_BN.md` — source/schema/security audit
- `CONFIG_VALIDATION_REPORT_v1.1.6_BN.md` — settings validation contract
- `PERFORMANCE_COMPARISON_REPORT_v1.1.6_BN.md` — before/after evidence
- `PRINT_VERIFICATION_REPORT_v1.1.6_BN.md` — receipt/voucher print checks
- `REGRESSION_TEST_REPORT_v1.1.6.md` — automated and production acceptance status
- `CHANGELOG_v1.1.6_BN.md` — release changes

Posted transaction hard-delete/overwrite করবেন না। Correction/Reversal workflow ব্যবহার করুন এবং upgrade-এর আগে Google Sheet ও Apps Script project-এর backup রাখুন।
