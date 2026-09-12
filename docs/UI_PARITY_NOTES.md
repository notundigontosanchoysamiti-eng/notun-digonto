# Exact UI Parity

Strict Parity v4 does not manually recreate the original design. The exact uploaded v1.1.6 UI files are preserved in `legacy_reference/ui/` and `scripts/build-legacy-ui.mjs` combines those original includes into `public/legacy/index.html`.

The only injected browser compatibility layer is `ndVercelBridge`, which emulates `google.script.run` and sends the same original function name and arguments to `/api/legacy`. Therefore forms, fields, modal layouts, menu order, Member Add + Nominee UI, Investment, Income/Expense and other original screens originate directly from the user's v1.1.6 source rather than a redesign.
