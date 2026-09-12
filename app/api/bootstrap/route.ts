import { NextRequest } from 'next/server';
import { authContext, can } from '@/lib/auth';
import { fail, ok } from '@/lib/http';
import { serviceSupabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  try {
    const ctx = await authContext(req);
    const sb = serviceSupabase();
    if (ctx.roleId === 'MEMBER') {
      const [member, txns, dues, loans, notes] = await Promise.all([
        sb.from('members').select('*').eq('member_id',ctx.memberId).single(),
        sb.from('transactions').select('*').eq('member_id',ctx.memberId).order('txn_date',{ascending:false}).limit(20),
        sb.from('monthly_dues').select('*').eq('member_id',ctx.memberId).order('due_month',{ascending:false}).limit(24),
        sb.from('loans').select('*').eq('member_id',ctx.memberId).order('application_date',{ascending:false}),
        sb.from('notifications').select('*').or(`user_id.eq.${ctx.userId},member_id.eq.${ctx.memberId}`).order('created_at',{ascending:false}).limit(20),
      ]);
      const { data: savings } = await sb.rpc('nd_member_savings_balance',{p_member_id:ctx.memberId});
      const { data: due } = await sb.rpc('nd_current_due_balance',{p_member_id:ctx.memberId});
      return ok({ok:true,user:ctx,member:member.data,transactions:txns.data||[],dues:dues.data||[],loans:loans.data||[],notifications:notes.data||[],summary:{savings:Number(savings||0),due:Number(due||0)}});
    }
    if (!can(ctx,'dashboard.view')) throw new Error('FORBIDDEN');
    const today = new Date().toISOString().slice(0,10);
    const [activeMembers, inactiveMembers, loanRows, todayTxns, configs, accounts, recentTxns, recentMembers, recentLoans, savingTx, dueRows] = await Promise.all([
      sb.from('members').select('member_id',{count:'exact',head:true}).eq('status','ACTIVE'),
      sb.from('members').select('member_id',{count:'exact',head:true}).neq('status','ACTIVE'),
      sb.from('loans').select('loan_id,status,approved_amount,outstanding_principal').in('status',['APPROVED','DISBURSED','ACTIVE','OVERDUE']),
      sb.from('transactions').select('amount,direction,category,status').eq('txn_date',today).in('status',['POSTED','CORRECTED']).order('created_at',{ascending:false}),
      sb.from('config').select('key,value'),
      sb.from('bank_accounts').select('account_id,account_name,type,status').eq('status','ACTIVE'),
      sb.from('transactions').select('txn_id,txn_date,member_id,type,category,description,direction,amount,status,created_at').order('created_at',{ascending:false}).limit(12),
      sb.from('members').select('member_id,name_bn,name_en,join_date,status,photo_file_id').order('join_date',{ascending:false}).limit(12),
      sb.from('loans').select('loan_id,member_id,application_date,requested_amount,approved_amount,status').order('application_date',{ascending:false}).limit(10),
      sb.from('transactions').select('amount,direction').eq('category','SAVINGS').in('status',['POSTED','CORRECTED']),
      sb.from('monthly_dues').select('member_id,balance').gt('balance',0),
    ]);
    const accountBalances = await Promise.all((accounts.data||[]).map(async a => ({...a,balance:Number((await sb.rpc('nd_account_balance',{p_account_id:a.account_id})).data||0)})));
    const totalSavings=(savingTx.data||[]).reduce((n,x)=>n+(x.direction==='CREDIT'?Number(x.amount):-Number(x.amount)),0);
    const todayCollection=(todayTxns.data||[]).reduce((n,x)=>n+(x.direction==='CREDIT'?Number(x.amount):0),0);
    const totalLoan=(loanRows.data||[]).reduce((n,x)=>n+Number(x.approved_amount||0),0);
    const loanOutstanding=(loanRows.data||[]).reduce((n,x)=>n+Number(x.outstanding_principal||0),0);
    const dueMembers=new Set((dueRows.data||[]).map(x=>x.member_id)).size;
    return ok({
      ok:true,user:ctx,permissions:ctx.permissions,
      config:Object.fromEntries((configs.data||[]).map(x=>[x.key,x.value])),
      summary:{totalMembers:activeMembers.count||0,activeMembers:activeMembers.count||0,inactiveMembers:inactiveMembers.count||0,dueMembers,activeLoans:(loanRows.data||[]).length,totalLoan,loanOutstanding,todayCollection,totalSavings,cashBank:accountBalances.reduce((n,a)=>n+a.balance,0)},
      accounts:accountBalances,recentTransactions:recentTxns.data||[],recentMembers:recentMembers.data||[],recentLoans:recentLoans.data||[]
    });
  } catch(e){ return fail(e); }
}
