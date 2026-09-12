# Strict 1:1 Feature Parity Matrix

Source of truth: original Notun Digonto Google Sheets + Apps Script v1.1.6. The original `Code.gs` and UI files in `legacy_reference/` are byte-for-byte preserved snapshots of the uploaded source.

## Verification summary

- Original UI server entry points detected: **105**
- Modern implementations with same function names: **105/105**
- Argument-count parity: **105/105**
- Legacy database tables mapped: **39/39**

The matrix below verifies that every server function called by the original user interface has a corresponding Next.js/Supabase implementation. Static parity does not replace live financial regression testing against a connected Supabase database.

## Audit

| Original UI call | Original signature | Modern signature | Status |
|---|---|---|---|
| `getAuditLog` | `getAuditLog(token,options)` | `getAuditLog(token:string,options:A={})` | Implemented / dispatched |

## Backup

| Original UI call | Original signature | Modern signature | Status |
|---|---|---|---|
| `createBackup` | `createBackup(token)` | `createBackup(token:string)` | Implemented / dispatched |
| `listBackups` | `listBackups(token)` | `listBackups(token:string)` | Implemented / dispatched |

## Documents

| Original UI call | Original signature | Modern signature | Status |
|---|---|---|---|
| `getDocumentData` | `getDocumentData(token,documentId)` | `getDocumentData(token:string,documentId:string)` | Implemented / dispatched |
| `listDocuments` | `listDocuments(token,filters)` | `listDocuments(token:string,filters:A={})` | Implemented / dispatched |
| `uploadDocument` | `uploadDocument(token,p)` | `uploadDocument(token:string,p:A={})` | Implemented / dispatched |

## Finance / Income / Expense / Receipts

| Original UI call | Original signature | Modern signature | Status |
|---|---|---|---|
| `addBankAccount` | `addBankAccount(token,p)` | `addBankAccount(token:string,p:A={})` | Implemented / dispatched |
| `correctFinancialTransaction` | `correctFinancialTransaction(token,txnId,p)` | `correctFinancialTransaction(token:string,txnId:string,p:A={})` | Implemented / dispatched |
| `correctSimpleTransaction` | `correctSimpleTransaction(token,txnId,newAmount,reason)` | `correctSimpleTransaction(token:string,txnId:string,newAmount:A,reason:string)` | Implemented / dispatched |
| `createExpense` | `createExpense(token,p)` | `createExpense(token:string,p:A={})` | Implemented / dispatched |
| `createIncome` | `createIncome(token,p)` | `createIncome(token:string,p:A={})` | Implemented / dispatched |
| `getExpenseDetails` | `getExpenseDetails(token,expenseId)` | `getExpenseDetails(token:string,expenseId:string)` | Implemented / dispatched |
| `getFinancePage` | `getFinancePage(token)` | `getFinancePage(token:string)` | Implemented / dispatched |
| `getFinancialTransaction` | `getFinancialTransaction(token,txnId)` | `getFinancialTransaction(token:string,txnId:string)` | Implemented / dispatched |
| `getIncomeDetails` | `getIncomeDetails(token,incomeId)` | `getIncomeDetails(token:string,incomeId:string)` | Implemented / dispatched |
| `getIncomeFormOptions` | `getIncomeFormOptions(token)` | `getIncomeFormOptions(token:string)` | Implemented / dispatched |
| `getReceipt` | `getReceipt(token,receiptId)` | `getReceipt(token:string,receiptId:string)` | Implemented / dispatched |
| `getVoucher` | `getVoucher(token,voucherId)` | `getVoucher(token:string,voucherId:string)` | Implemented / dispatched |
| `listFinancialTransactions` | `listFinancialTransactions(token,options)` | `listFinancialTransactions(token:string,options:A={})` | Implemented / dispatched |
| `listReceipts` | `listReceipts(token,options)` | `listReceipts(token:string,options:A={})` | Implemented / dispatched |
| `listVouchers` | `listVouchers(token,options)` | `listVouchers(token:string,options:A={})` | Implemented / dispatched |
| `previewExpenseAllocation` | `previewExpenseAllocation(token,p)` | `previewExpenseAllocation(token:string,p:A={})` | Implemented / dispatched |
| `recordReceiptPrint` | `recordReceiptPrint(token,receiptId)` | `recordReceiptPrint(token:string,receiptId:string)` | Implemented / dispatched |
| `reverseExpense` | `reverseExpense(token,expenseId,reason)` | `reverseExpense(token:string,expenseId:string,reason:string)` | Implemented / dispatched |
| `reverseFinancialTransaction` | `reverseFinancialTransaction(token,txnId,reason)` | `reverseFinancialTransaction(token:string,txnId:string,reason:string)` | Implemented / dispatched |
| `reverseIncome` | `reverseIncome(token,incomeId,reason)` | `reverseIncome(token:string,incomeId:string,reason:string)` | Implemented / dispatched |
| `transferFunds` | `transferFunds(token,p)` | `transferFunds(token:string,p:A)` | Implemented / dispatched |
| `updateIncome` | `updateIncome(token,incomeId,p,reason)` | `updateIncome(token:string,incomeId:string,p:A={},reason='')` | Implemented / dispatched |
| `updateNormalExpense` | `updateNormalExpense(token,expenseId,p,reason)` | `updateNormalExpense(token:string,expenseId:string,p:A={},reason='')` | Implemented / dispatched |

## Investments

| Original UI call | Original signature | Modern signature | Status |
|---|---|---|---|
| `cancelInvestment` | `cancelInvestment(token,investmentId,reason)` | `cancelInvestment(token:string,investmentId:string,reason:string)` | Implemented / dispatched |
| `closeInvestment` | `closeInvestment(token,p)` | `closeInvestment(token:string,p:A={})` | Implemented / dispatched |
| `createInvestment` | `createInvestment(token,p)` | `createInvestment(token:string,p:A={})` | Implemented / dispatched |
| `getInvestmentDetails` | `getInvestmentDetails(token,id)` | `getInvestmentDetails(token:string,id:string)` | Implemented / dispatched |
| `listInvestments` | `listInvestments(token,options)` | `listInvestments(token:string,options:A={})` | Implemented / dispatched |
| `recordInvestmentReturn` | `recordInvestmentReturn(token,p)` | `recordInvestmentReturn(token:string,p:A={})` | Implemented / dispatched |
| `reverseInvestmentClosure` | `reverseInvestmentClosure(token,closureId,reason)` | `reverseInvestmentClosure(token:string,closureId:string,reason:string)` | Implemented / dispatched |
| `reverseInvestmentReturn` | `reverseInvestmentReturn(token,returnId,reason)` | `reverseInvestmentReturn(token:string,returnId:string,reason:string)` | Implemented / dispatched |
| `updateInvestment` | `updateInvestment(token,investmentId,p,reason)` | `updateInvestment(token:string,investmentId:string,p:A={},reason='')` | Implemented / dispatched |

## Loans

| Original UI call | Original signature | Modern signature | Status |
|---|---|---|---|
| `applyLoan` | `applyLoan(token,p)` | `applyLoan(token:string,p:A={})` | Implemented / dispatched |
| `approveLoan` | `approveLoan(token,loanId,p)` | `approveLoan(token:string,loanId:string,p:A={})` | Implemented / dispatched |
| `collectLoanPayment` | `collectLoanPayment(token,p)` | `collectLoanPayment(token:string,p:A={})` | Implemented / dispatched |
| `correctLoanPayment` | `correctLoanPayment(token,txnId,newAmount,reason)` | `correctLoanPayment(token:string,txnId:string,newAmount:A,reason:string)` | Implemented / dispatched |
| `disburseLoan` | `disburseLoan(token,loanId,p)` | `disburseLoan(token:string,loanId:string,p:A={})` | Implemented / dispatched |
| `getLoanDetails` | `getLoanDetails(token,loanId)` | `getLoanDetails(token:string,loanId:string)` | Implemented / dispatched |
| `getLoanEligibility` | `getLoanEligibility(token,memberId,loanType)` | `getLoanEligibility(token:string,memberId:string,loanType='GENERAL')` | Implemented / dispatched |
| `listLoans` | `listLoans(token,options)` | `listLoans(token:string,options:A={})` | Implemented / dispatched |

## Meetings / Committee

| Original UI call | Original signature | Modern signature | Status |
|---|---|---|---|
| `listCommittee` | `listCommittee(token)` | `listCommittee(token:string)` | Implemented / dispatched |
| `listMeetingAttendance` | `listMeetingAttendance(token,meetingId)` | `listMeetingAttendance(token:string,meetingId:string)` | Implemented / dispatched |
| `listMeetings` | `listMeetings(token)` | `listMeetings(token:string)` | Implemented / dispatched |
| `saveMeeting` | `saveMeeting(token,p)` | `saveMeeting(token:string,p:A={})` | Implemented / dispatched |
| `saveMeetingAttendance` | `saveMeetingAttendance(token,meetingId,items)` | `saveMeetingAttendance(token:string,meetingId:string,items:A[]=[])` | Implemented / dispatched |

## Members / KYC / Nominee

| Original UI call | Original signature | Modern signature | Status |
|---|---|---|---|
| `addCommitteeMember` | `addCommitteeMember(token,p)` | `addCommitteeMember(token:string,p:A={})` | Implemented / dispatched |
| `approveProfileUpdate` | `approveProfileUpdate(token, approvalId, approve, note)` | `approveProfileUpdate(token:string,approvalId:string,approve:boolean,note='')` | Implemented / dispatched |
| `createMember` | `createMember(token, payload)` | `createMember(token:string,p:A={})` | Implemented / dispatched |
| `getMemberDashboard` | `getMemberDashboard(token)` | `getMemberDashboard(token:string)` | Implemented / dispatched |
| `getMemberLedger` | `getMemberLedger(token,memberId,options)` | `getMemberLedger(token:string,memberId:string,options:A={})` | Implemented / dispatched |
| `getMemberPhoto` | `getMemberPhoto(token, memberId)` | `getMemberPhoto(token:string,memberId:string)` | Implemented / dispatched |
| `getMemberProfile` | `getMemberProfile(token, memberId)` | `getMemberProfile(token:string,memberId:string)` | Implemented / dispatched |
| `listMembers` | `listMembers(token, options)` | `listMembers(token:string,options:A={})` | Implemented / dispatched |
| `listProfileUpdateRequests` | `listProfileUpdateRequests(token, memberId)` | `listProfileUpdateRequests(token:string,memberId='')` | Implemented / dispatched |
| `requestMyProfileUpdate` | `requestMyProfileUpdate(token, changes, note)` | `requestMyProfileUpdate(token:string,changes:A={},note='')` | Implemented / dispatched |
| `saveNominee` | `saveNominee(token, memberId, payload)` | `saveNominee(token:string,memberId:string,p:A)` | Implemented / dispatched |
| `updateMember` | `updateMember(token, memberId, payload, reason)` | `updateMember(token:string,memberId:string,p:A={},reason='')` | Implemented / dispatched |
| `updateNominee` | `updateNominee(token, nomineeId, payload, reason)` | `updateNominee(token:string,nomineeId:string,p:A={},reason='')` | Implemented / dispatched |

## Notifications

| Original UI call | Original signature | Modern signature | Status |
|---|---|---|---|
| `createBroadcastNotification` | `createBroadcastNotification(token,p)` | `createBroadcastNotification(token:string,p:A={})` | Implemented / dispatched |
| `listNotifications` | `listNotifications(token)` | `listNotifications(token:string)` | Implemented / dispatched |
| `markNotificationRead` | `markNotificationRead(token,id)` | `markNotificationRead(token:string,id:string)` | Implemented / dispatched |

## Profit

| Original UI call | Original signature | Modern signature | Status |
|---|---|---|---|
| `approveProfitDistribution` | `approveProfitDistribution(token,distributionId)` | `approveProfitDistribution(token:string,distributionId:string)` | Implemented / dispatched |
| `cancelProfitDistribution` | `cancelProfitDistribution(token,distributionId,reason)` | `cancelProfitDistribution(token:string,distributionId:string,reason:string)` | Implemented / dispatched |
| `createProfitDistributionDraft` | `createProfitDistributionDraft(token,arg1,arg2)` | `createProfitDistributionDraft(token:string,arg1:A,arg2?:A)` | Implemented / dispatched |
| `createProfitRecord` | `createProfitRecord(token,p)` | `createProfitRecord(token:string,p:A={})` | Implemented / dispatched |
| `createProfitSource` | `createProfitSource(token,p)` | `createProfitSource(token:string,p:A={})` | Implemented / dispatched |
| `getProfitDistributionDetails` | `getProfitDistributionDetails(token,distributionId)` | `getProfitDistributionDetails(token:string,distributionId:string)` | Implemented / dispatched |
| `getProfitManagementPage` | `getProfitManagementPage(token,options)` | `getProfitManagementPage(token:string,options:A={})` | Implemented / dispatched |
| `listProfitRecords` | `listProfitRecords(token,options)` | `listProfitRecords(token:string,options:A={})` | Implemented / dispatched |
| `listProfitSources` | `listProfitSources(token,options)` | `listProfitSources(token:string,options:A={})` | Implemented / dispatched |
| `previewProfitDistribution` | `previewProfitDistribution(token,arg1,arg2)` | `previewProfitDistribution(token:string,arg1:A,arg2?:A)` | Implemented / dispatched |
| `reverseProfitDistribution` | `reverseProfitDistribution(token,distributionId,reason)` | `reverseProfitDistribution(token:string,distributionId:string,reason:string)` | Implemented / dispatched |
| `reverseProfitRecord` | `reverseProfitRecord(token,profitId,reason)` | `reverseProfitRecord(token:string,profitId:string,reason:string)` | Implemented / dispatched |
| `updateProfitRecord` | `updateProfitRecord(token,profitId,p,reason)` | `updateProfitRecord(token:string,profitId:string,p:A={},reason:string)` | Implemented / dispatched |

## Reports

| Original UI call | Original signature | Modern signature | Status |
|---|---|---|---|
| `getConfigValidationReport` | `getConfigValidationReport(token)` | `getConfigValidationReport(token:string)` | Implemented / dispatched |
| `getReportFilterOptions` | `getReportFilterOptions(token)` | `getReportFilterOptions(token:string)` | Implemented / dispatched |
| `getReports` | `getReports(token,type,filters)` | `getReports(token:string,type:string,filters:A={})` | Implemented / dispatched |

## Savings / Dues

| Original UI call | Original signature | Modern signature | Status |
|---|---|---|---|
| `collectSavings` | `collectSavings(token,payload)` | `collectSavings(token:string,p:A)` | Implemented / dispatched |
| `correctSavingsTransaction` | `correctSavingsTransaction(token,txnId,newAmount,reason)` | `correctSavingsTransaction(token:string,txnId:string,newAmount:A,reason:string)` | Implemented / dispatched |
| `editSavingsTransaction` | `editSavingsTransaction(token,txnId,payload)` | `editSavingsTransaction(token:string,txnId:string,p:A)` | Implemented / dispatched |
| `generateMonthlyDues` | `generateMonthlyDues(token,monthKey)` | `generateMonthlyDues(token:string,m:string)` | Implemented / dispatched |
| `getSavingsCollectionContext` | `getSavingsCollectionContext(token,memberId,monthKey)` | `getSavingsCollectionContext(token:string,memberId:string,m:string)` | Implemented / dispatched |
| `getSavingsMultiCollectionContext` | `getSavingsMultiCollectionContext(token,memberId,startMonth,endMonth)` | `getSavingsMultiCollectionContext(token:string,memberId:string,startMonth:string,endMonth:string)` | Implemented / dispatched |
| `getSavingsPage` | `getSavingsPage(token,options)` | `getSavingsPage(token:string,options:A={})` | Implemented / dispatched |
| `getSavingsTransaction` | `getSavingsTransaction(token,txnId)` | `getSavingsTransaction(token:string,txnId:string)` | Implemented / dispatched |
| `withdrawSavings` | `withdrawSavings(token,p)` | `withdrawSavings(token:string,p:A)` | Implemented / dispatched |

## Session / Dashboard / Other

| Original UI call | Original signature | Modern signature | Status |
|---|---|---|---|
| `apiBootstrap` | `apiBootstrap(token)` | `apiBootstrap(token:string)` | Implemented / dispatched |
| `getAdminDashboard` | `getAdminDashboard(token)` | `getAdminDashboard(token:string)` | Implemented / dispatched |
| `loginAndBootstrap` | `loginAndBootstrap(username, password)` | `loginAndBootstrap(username:string,password:string)` | Implemented / dispatched |
| `logout` | `logout(token)` | `logout(token:string)` | Implemented / dispatched |

## Settings

| Original UI call | Original signature | Modern signature | Status |
|---|---|---|---|
| `getSettings` | `getSettings(token)` | `getSettings(token:string)` | Implemented / dispatched |
| `saveSettings` | `saveSettings(token,items,reason,financialConfirmation)` | `saveSettings(token:string,items:A[],reason:string,financialConfirmation:boolean)` | Implemented / dispatched |

## Users / Roles

| Original UI call | Original signature | Modern signature | Status |
|---|---|---|---|
| `changeMyPassword` | `changeMyPassword(token, currentPassword, newPassword)` | `changeMyPassword(token:string,currentPassword:string,newPassword:string)` | Implemented / dispatched |
| `createStaffUser` | `createStaffUser(token,p)` | `createStaffUser(token:string,p:A={})` | Implemented / dispatched |
| `listRoles` | `listRoles(token)` | `listRoles(token:string)` | Implemented / dispatched |
| `listUsers` | `listUsers(token)` | `listUsers(token:string)` | Implemented / dispatched |
| `resetUserPassword` | `resetUserPassword(token, userId)` | `resetUserPassword(token:string,userId:string)` | Implemented / dispatched |
| `saveRolePermissions` | `saveRolePermissions(token,roleId,permissions)` | `saveRolePermissions(token:string,roleId:string,permissions:A[])` | Implemented / dispatched |
| `updateUser` | `updateUser(token,userId,p,reason)` | `updateUser(token:string,userId:string,p:A={},reason='')` | Implemented / dispatched |
