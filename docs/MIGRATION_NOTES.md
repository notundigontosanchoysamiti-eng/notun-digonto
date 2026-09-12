# Migration Notes — source of truth v1.1.6

## Preserved rules
- Society monthly calculation begins from `SOCIETY_START_MONTH`; member join date remains profile information.
- Initial savings units are effective from society start.
- Unit increase is retroactive/cumulative across historical active unit bands, matching legacy behavior.
- Monthly due date is configured day capped at end-of-month; late fee is per unit after due date.
- Selected-month savings cannot exceed those months' outstanding balance; excess is explicit extra savings or additional months.
- Advance savings is reconciled against outstanding dues.
- Financially effective transaction states and reversal semantics are retained.
- All money movement uses balanced double-entry general-ledger posting.
- Loan limits, membership duration, due clearance, secured/general limits and existing outstanding are checked using legacy config.
- Loan payments allocate service/profit component before principal against schedule rows.
- Investment purchase/return/closure and resulting gain/loss entries follow the legacy account model.
- Profit distribution supports MANUAL, SAVINGS, EQUAL and UNITS and uses exact-cent allocation; approval credits member savings and debits retained surplus.
- Original role permission arrays are seeded unchanged.

## Performance changes only
- No full Google Sheet scan per request.
- Indexed PostgreSQL filters and aggregation replace in-memory sheet filtering.
- Core multi-row financial updates run inside a single PostgreSQL function transaction.
- Dashboard calls are parallelized and list endpoints are bounded.
- RLS blocks direct table access from browser clients.

## Fresh-install assumption
This package is designed for a fresh Supabase database. The original app source remains under `legacy_reference/` for parity verification.
