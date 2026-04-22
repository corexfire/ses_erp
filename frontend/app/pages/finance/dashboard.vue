<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useApi } from '@/composables/useApi';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';

const api = useApi();
const toast = useToast();
const router = useRouter();

const loading = ref(true);

// Data states
const arData = ref<any>({});
const apData = ref<any>({});
const journalData = ref<any[]>([]);
const paymentReqData = ref<any[]>([]);
const budgetData = ref<any[]>([]);
const assetData = ref<any[]>([]);
const bankData = ref<any[]>([]);
const cashData = ref<any[]>([]);
const plData = ref<any>(null);

const formatCurrency = (val: number | string | null | undefined) => {
  const n = Number(val || 0);
  if (n >= 1_000_000_000) return `Rp ${(n / 1_000_000_000).toFixed(1)}M`;
  if (n >= 1_000_000) return `Rp ${(n / 1_000_000).toFixed(1)}Jt`;
  if (n >= 1_000) return `Rp ${(n / 1_000).toFixed(0)}Rb`;
  return `Rp ${n.toLocaleString('id-ID')}`;
};

const arInvoices = computed<any[]>(() => arData.value?.invoices ?? []);
const apInvoices = computed<any[]>(() => apData.value?.invoices ?? []);

const arOutstanding = computed(() =>
  arInvoices.value
    .filter((i: any) => i.status !== 'PAID')
    .reduce((s: number, i: any) => s + (Number(i.totalAmount || 0) - Number(i.paidAmount || 0)), 0)
);
const arOverdue = computed(() =>
  arInvoices.value.filter((i: any) => i.status === 'OVERDUE').length
);
const apOutstanding = computed(() =>
  apInvoices.value
    .filter((i: any) => i.status !== 'PAID')
    .reduce((s: number, i: any) => s + (Number(i.totalAmount || 0) - Number(i.paidAmount || 0)), 0)
);
const apOverdue = computed(() =>
  apInvoices.value.filter((i: any) => i.status === 'OVERDUE').length
);

const totalBankBalance = computed(() =>
  bankData.value.reduce((s: number, b: any) => s + Number(b.balance || 0), 0)
);
const totalCashBalance = computed(() =>
  cashData.value.reduce((s: number, c: any) => s + Number(c.balance || 0), 0)
);
const totalLiquidity = computed(() => totalBankBalance.value + totalCashBalance.value);

const totalAssetValue = computed(() =>
  assetData.value.reduce((s: number, a: any) => s + Number(a.purchaseCost || 0), 0)
);

const totalBudget = computed(() =>
  budgetData.value.reduce((s: number, b: any) => s + Number(b.amount || 0), 0)
);
const totalBudgetUsed = computed(() =>
  budgetData.value.reduce((s: number, b: any) => s + Number(b.spentAmount || 0), 0)
);
const budgetUtilization = computed(() =>
  totalBudget.value > 0 ? Math.round((totalBudgetUsed.value / totalBudget.value) * 100) : 0
);

const pendingPaymentReqs = computed(() =>
  paymentReqData.value.filter((r: any) => r.status === 'PENDING' || r.status === 'SUBMITTED').length
);
const totalPaymentReqAmount = computed(() =>
  paymentReqData.value
    .filter((r: any) => r.status === 'PENDING' || r.status === 'SUBMITTED')
    .reduce((s: number, r: any) => s + Number(r.amount || 0), 0)
);

// KPI Cards
const kpiCards = computed(() => [
  {
    label: 'Total Likuiditas',
    value: formatCurrency(totalLiquidity.value),
    target: `Bank: ${formatCurrency(totalBankBalance.value)} · Kas: ${formatCurrency(totalCashBalance.value)}`,
    icon: 'pi pi-wallet',
    color: 'indigo' as const,
    path: '/finance/bank',
    spark: '0,15 10,5 20,18 30,10 40,20 50,8 60,15'
  },
  {
    label: 'Total Aset Tetap',
    value: formatCurrency(totalAssetValue.value),
    target: `${assetData.value.length} aset terdaftar`,
    icon: 'pi pi-box',
    color: 'emerald' as const,
    path: '/finance/assets',
    spark: '0,20 10,10 20,15 30,5 40,18 50,10 60,20'
  },
  {
    label: 'AR Outstanding',
    value: formatCurrency(arOutstanding.value),
    target: `${arOverdue.value} invoice overdue`,
    icon: 'pi pi-arrow-down-left',
    color: 'sky' as const,
    path: '/finance/ar',
    spark: '0,10 10,20 20,5 30,15 40,8 50,18 60,12'
  },
  {
    label: 'AP Outstanding',
    value: formatCurrency(apOutstanding.value),
    target: `${apOverdue.value} tagihan jatuh tempo`,
    icon: 'pi pi-arrow-up-right',
    color: 'rose' as const,
    path: '/finance/ap',
    spark: '0,20 10,15 20,25 30,10 40,22 50,15 60,20'
  },
]);

const plRevenue = computed(() => Number(plData.value?.profitLoss?.totalIncome || 0));
const plExpense = computed(() => Number(plData.value?.profitLoss?.totalExpenses || 0));
const netIncome = computed(() => Number(plData.value?.profitLoss?.netProfit || 0));


const loadAll = async () => {
  loading.value = true;
  try {
    const now = new Date();
    const startDate = `${now.getFullYear()}-01-01`;
    const endDate = `${now.getFullYear()}-12-31`;

    const results = await Promise.allSettled([
      api.get('/finance/ar'),
      api.get('/finance/ap'),
      api.get('/finance/journal'),
      api.get('/finance/payment-request'),
      api.get('/finance/budget'),
      api.get('/finance/assets'),
      api.get('/finance/bank'),
      api.get('/finance/cash'),
      api.get(`/finance/reports/profit-loss?startDate=${startDate}&endDate=${endDate}`),
    ]);

    // Axios returns full AxiosResponse — unwrap .data first, then pick the controller key
    const d = (r: PromiseSettledResult<any>) =>
      r.status === 'fulfilled' ? (r.value?.data ?? r.value ?? null) : null;

    const [ar, ap, journal, payReq, budget, assets, bank, cash, pl] = results.map(d);

    // Each controller wraps in a specific key
    arData.value       = ar   || {};
    apData.value       = ap   || {};
    journalData.value  = journal?.entries  ?? (Array.isArray(journal)  ? journal  : []);
    paymentReqData.value = payReq?.requests ?? (Array.isArray(payReq)  ? payReq   : []);
    budgetData.value   = budget?.budgets   ?? (Array.isArray(budget)   ? budget   : []);
    assetData.value    = assets?.assets    ?? (Array.isArray(assets)   ? assets   : []);
    bankData.value     = bank?.accounts    ?? (Array.isArray(bank)     ? bank     : []);
    cashData.value     = cash?.accounts    ?? (Array.isArray(cash)     ? cash     : []);
    plData.value       = pl;
  } catch (err) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Gagal memuat data dashboard.', life: 3000 });
  } finally {
    loading.value = false;
  }
};

const recentJournals = computed(() =>
  (Array.isArray(journalData.value) ? journalData.value : []).slice(0, 6)
);

const getJournalStatusColor = (status: string) => {
  switch (status) {
    case 'POSTED': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    case 'DRAFT': return 'text-slate-500 bg-slate-50 border-slate-200';
    case 'VOID': return 'text-rose-600 bg-rose-50 border-rose-200';
    default: return 'text-slate-500 bg-slate-50 border-slate-200';
  }
};

const getPayReqStatusColor = (status: string) => {
  switch (status) {
    case 'APPROVED': return 'text-emerald-600 bg-emerald-50';
    case 'PENDING': return 'text-orange-600 bg-orange-50';
    case 'SUBMITTED': return 'text-sky-600 bg-sky-50';
    case 'REJECTED': return 'text-rose-600 bg-rose-50';
    default: return 'text-slate-500 bg-slate-50';
  }
};

onMounted(loadAll);
</script>

<template>
  <div class="p-4 space-y-8 bg-slate-50/50 min-h-screen">

    <!-- ═══ HEADER ═══ -->
    <div class="px-6 pt-6">
      <DashboardHero
        badge="Finance & Accounting"
        badge-accent="Command Center"
        title="Finance"
        title-accent="Dashboard"
        description="Ringkasan posisi keuangan, likuiditas, dan performa laba-rugi secara real-time."
        color="indigo"
        @refresh="loadAll"
        :loading="loading"
      >
        <template #actions>
          <Button 
            label="Export Laporan" 
            icon="pi pi-download" 
            class="p-button-sm font-black text-[10px] uppercase px-6 bg-white/20 hover:bg-white/30 text-white border-white/20" 
            @click="router.push('/finance/reports?tab=pl')" 
          />
        </template>
      </DashboardHero>
    </div>

    <!-- ═══ KPI RIBBON ═══ -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-5 mx-6 mb-7">
      <KpiCard
        v-for="card in kpiCards"
        :key="card.label"
        :label="card.label"
        :value="card.value"
        :icon="card.icon"
        :color="card.color"
        :target="card.target"
        :sparkline-points="card.spark"
        :loading="loading"
        @click="router.push(card.path)"
      />
    </div>

    <!-- ═══ MAIN GRID ═══ -->
    <div class="mx-6 grid grid-cols-1 lg:grid-cols-3 gap-4">

      <!-- LEFT COL (span 2) -->
      <div class="lg:col-span-2 space-y-6">

        <!-- P&L Summary Bar -->
        <!-- P&L Summary Bar -->
        <PanelCard
          title="Profit & Loss Overview"
          :subtitle="`FY ${new Date().getFullYear()} — Year to Date`"
          icon="pi pi-chart-line"
          theme="indigo"
          :show-search="false"
          :show-filter="false"
          flat-controls
        >
          <template #actions>
            <Button label="Lihat Laporan" text icon="pi pi-arrow-right" iconPos="right" class="text-indigo-600 font-black text-[10px] uppercase tracking-widest" @click="router.push('/finance/reports?tab=pl')" />
          </template>

          <template #table>
            <div class="p-8">
              <div class="grid grid-cols-3 gap-4 mb-6">
                <div class="text-center p-5 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <p class="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1">Pendapatan</p>
                  <p class="text-2xl font-black text-emerald-700">{{ loading ? '—' : formatCurrency(plRevenue) }}</p>
                  <div class="flex items-center justify-center gap-1 mt-1">
                    <i class="pi pi-arrow-up text-[9px] text-emerald-500"></i>
                    <span class="text-[9px] font-bold text-emerald-500">Revenue</span>
                  </div>
                </div>
                <div class="text-center p-5 rounded-2xl bg-rose-50 border border-rose-100">
                  <p class="text-[9px] font-black text-rose-600 uppercase tracking-widest mb-1">Beban</p>
                  <p class="text-2xl font-black text-rose-700">{{ loading ? '—' : formatCurrency(plExpense) }}</p>
                  <div class="flex items-center justify-center gap-1 mt-1">
                    <i class="pi pi-arrow-down text-[9px] text-rose-500"></i>
                    <span class="text-[9px] font-bold text-rose-500">Expenses</span>
                  </div>
                </div>
                <div :class="['text-center p-5 rounded-2xl border', netIncome >= 0 ? 'bg-indigo-50 border-indigo-100' : 'bg-orange-50 border-orange-100']">
                  <p :class="['text-[9px] font-black uppercase tracking-widest mb-1', netIncome >= 0 ? 'text-indigo-600' : 'text-orange-600']">Laba Bersih</p>
                  <p :class="['text-2xl font-black', netIncome >= 0 ? 'text-indigo-700' : 'text-orange-700']">{{ loading ? '—' : formatCurrency(Math.abs(netIncome)) }}</p>
                  <div class="flex items-center justify-center gap-1 mt-1">
                    <i :class="['text-[9px]', netIncome >= 0 ? 'pi pi-check-circle text-indigo-500' : 'pi pi-exclamation-circle text-orange-500']"></i>
                    <span :class="['text-[9px] font-bold', netIncome >= 0 ? 'text-indigo-500' : 'text-orange-500']">{{ netIncome >= 0 ? 'Net Profit' : 'Net Loss' }}</span>
                  </div>
                </div>
              </div>

              <!-- Visual bar -->
              <div v-if="(plRevenue + plExpense) > 0" class="relative h-3 bg-slate-100 rounded-full overflow-hidden">
                <div class="absolute left-0 top-0 h-full bg-emerald-500 rounded-l-full transition-all duration-700"
                  :style="`width: ${Math.round((plRevenue / (plRevenue + plExpense)) * 100)}%`"></div>
              </div>
              <div class="flex justify-between text-[9px] font-bold text-slate-400 mt-1" v-if="(plRevenue + plExpense) > 0">
                <span class="text-emerald-500">Revenue: {{ Math.round((plRevenue / (plRevenue + plExpense)) * 100) }}%</span>
                <span class="text-rose-500">Expenses: {{ Math.round((plExpense / (plRevenue + plExpense)) * 100) }}%</span>
              </div>
            </div>
          </template>
        </PanelCard>

        <!-- Budget Utilization -->
        <!-- Budget Utilization -->
        <PanelCard
          title="Budget Utilization"
          :subtitle="`${budgetData.length} budget aktif`"
          icon="pi pi-calculator"
          theme="indigo"
          :show-search="false"
          :show-filter="false"
          flat-controls
        >
          <template #actions>
            <Button label="Kelola Budget" text icon="pi pi-arrow-right" iconPos="right" class="text-indigo-600 font-black text-[10px] uppercase tracking-widest" @click="router.push('/finance/budget')" />
          </template>

          <template #table>
            <div class="p-8">
              <div class="grid grid-cols-3 gap-4 mb-6">
                <div class="bg-slate-50 rounded-xl p-4 border border-slate-100 text-center">
                  <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Budget</p>
                  <p class="text-xl font-black text-slate-900 mt-1">{{ formatCurrency(totalBudget) }}</p>
                </div>
                <div class="bg-indigo-50 rounded-xl p-4 border border-indigo-100 text-center">
                  <p class="text-[9px] font-black text-indigo-600 uppercase tracking-widest">Terpakai</p>
                  <p class="text-xl font-black text-indigo-700 mt-1">{{ formatCurrency(totalBudgetUsed) }}</p>
                </div>
                <div :class="['rounded-xl p-4 border text-center', budgetUtilization > 90 ? 'bg-rose-50 border-rose-100' : budgetUtilization > 70 ? 'bg-orange-50 border-orange-100' : 'bg-emerald-50 border-emerald-100']">
                  <p :class="['text-[9px] font-black uppercase tracking-widest', budgetUtilization > 90 ? 'text-rose-600' : budgetUtilization > 70 ? 'text-orange-600' : 'text-emerald-600']">Utilisasi</p>
                  <p :class="['text-xl font-black mt-1', budgetUtilization > 90 ? 'text-rose-700' : budgetUtilization > 70 ? 'text-orange-700' : 'text-emerald-700']">{{ budgetUtilization }}%</p>
                </div>
              </div>

              <div class="space-y-3">
                <div
                  v-for="b in (budgetData as any[]).slice(0, 5)" :key="b.id"
                  class="flex items-center gap-4">
                  <p class="text-[10px] font-black text-slate-700 w-36 truncate flex-shrink-0">{{ b.name || b.budgetNo }}</p>
                  <div class="flex-1 bg-slate-100 rounded-full h-2">
                    <div class="h-2 rounded-full transition-all duration-500"
                      :style="`width: ${Math.min(Math.round((Number(b.spentAmount || 0) / Number(b.amount || 1)) * 100), 100)}%`"
                      :class="Number(b.spentAmount || 0) / Number(b.amount || 1) > 0.9 ? 'bg-rose-500' : Number(b.spentAmount || 0) / Number(b.amount || 1) > 0.7 ? 'bg-orange-500' : 'bg-emerald-500'">
                    </div>
                  </div>
                  <span class="text-[10px] font-black text-slate-500 w-10 text-right">{{ Math.round((Number(b.spentAmount || 0) / Number(b.amount || 1)) * 100) }}%</span>
                </div>
                <div v-if="!budgetData.length" class="text-center py-4 text-slate-300 text-xs font-bold">Belum ada data budget.</div>
              </div>
            </div>
          </template>
        </PanelCard>

        <!-- Recent Journal Entries -->
        <!-- Recent Journal Entries -->
        <PanelCard
          title="Journal Entries"
          :subtitle="`${journalData.length} entri terbaru`"
          icon="pi pi-book"
          theme="indigo"
          :show-search="false"
          :show-filter="false"
          flat-controls
        >
          <template #actions>
            <Button label="Lihat Semua" text icon="pi pi-arrow-right" iconPos="right" class="text-indigo-600 font-black text-[10px] uppercase tracking-widest" @click="router.push('/finance/journal')" />
          </template>

          <template #table>
            <table class="w-full text-left">
              <thead class="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th class="text-[9px] font-black text-slate-400 uppercase tracking-widest p-4">No. Jurnal</th>
                  <th class="text-[9px] font-black text-slate-400 uppercase tracking-widest p-4">Keterangan</th>
                  <th class="text-[9px] font-black text-slate-400 uppercase tracking-widest p-4">Tanggal</th>
                  <th class="text-[9px] font-black text-slate-400 uppercase tracking-widest p-4 text-right">Debit</th>
                  <th class="text-[9px] font-black text-slate-400 uppercase tracking-widest p-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-50">
                <tr v-if="!recentJournals.length">
                  <td colspan="5" class="text-center py-8 text-slate-300 text-xs font-bold">Belum ada journal entry.</td>
                </tr>
                <tr v-for="j in recentJournals" :key="j.id" class="hover:bg-slate-50/50 cursor-pointer transition-colors" @click="router.push('/finance/journal')">
                  <td class="p-4 font-mono text-[10px] font-black text-indigo-600">{{ j.entryNo }}</td>
                  <td class="p-4 text-[11px] font-bold text-slate-700 max-w-[180px] truncate">{{ j.description }}</td>
                  <td class="p-4 text-[10px] font-bold text-slate-500">{{ j.entryDate ? new Date(j.entryDate).toLocaleDateString('id-ID') : '—' }}</td>
                  <td class="p-4 text-right text-[10px] font-black text-slate-900">{{ formatCurrency(j.totalDebit) }}</td>
                  <td class="p-4 text-center">
                    <span :class="['text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border', getJournalStatusColor(j.status)]">{{ j.status }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </template>
        </PanelCard>

      </div>

      <!-- RIGHT SIDEBAR -->
      <div class="space-y-6">

        <!-- Liquidity Breakdown -->
        <!-- Liquidity Breakdown -->
        <PanelCard
          title="Posisi Likuiditas"
          subtitle="Rekap saldo kas & bank real-time"
          icon="pi pi-building-columns"
          theme="indigo"
          :show-search="false"
          :show-filter="false"
          flat-controls
        >
          <template #table>
            <div class="p-6 space-y-4">
              <div v-for="bank in (bankData as any[]).slice(0, 4)" :key="bank.id" class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-sm transition-all cursor-pointer" @click="router.push('/finance/bank')">
                <div class="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
                  <i class="pi pi-building-columns text-xs"></i>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-[10px] font-black text-slate-700 truncate">{{ bank.name || bank.accountNo }}</p>
                  <p class="text-[9px] font-bold text-slate-400">{{ bank.bankName || 'Bank Account' }}</p>
                </div>
                <p class="text-[11px] font-black text-indigo-600 flex-shrink-0">{{ formatCurrency(bank.balance) }}</p>
              </div>
              <div v-for="cash in (cashData as any[]).slice(0, 2)" :key="cash.id" class="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-100 hover:bg-white hover:shadow-sm transition-all cursor-pointer" @click="router.push('/finance/cash')">
                <div class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <i class="pi pi-money-bill text-xs"></i>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-[10px] font-black text-slate-700 truncate">{{ cash.name || cash.accountNo }}</p>
                  <p class="text-[9px] font-bold text-slate-400">Kas</p>
                </div>
                <p class="text-[11px] font-black text-emerald-600 flex-shrink-0">{{ formatCurrency(cash.balance) }}</p>
              </div>
              <div v-if="!bankData.length && !cashData.length" class="text-center py-4 text-slate-300 text-xs font-bold">Belum ada data akun kas/bank.</div>
              <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Likuiditas</span>
                <span class="text-sm font-black text-slate-900">{{ formatCurrency(totalLiquidity) }}</span>
              </div>
            </div>
          </template>
        </PanelCard>

        <!-- Payment Requests Awaiting -->
        <!-- Payment Requests Awaiting -->
        <PanelCard
          title="Payment Requests"
          subtitle="Permintaan pembayaran menunggu persetujuan"
          icon="pi pi-clock"
          theme="rose"
          :show-search="false"
          :show-filter="false"
          flat-controls
        >
          <template #actions>
            <div v-if="pendingPaymentReqs > 0" class="w-6 h-6 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center shadow-lg shadow-rose-200 animate-pulse">
              {{ pendingPaymentReqs }}
            </div>
          </template>

          <template #table>
            <div class="p-6 space-y-3">
              <div
                v-for="pr in (paymentReqData as any[]).filter((r: any) => r.status === 'PENDING' || r.status === 'SUBMITTED').slice(0, 4)"
                :key="pr.id"
                class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-sm transition-all cursor-pointer"
                @click="router.push('/finance/payment-request')">
                <div class="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                  <i class="pi pi-clock text-xs"></i>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-[10px] font-black text-slate-700 truncate">{{ pr.title || pr.description || pr.requestNo || 'Payment Request' }}</p>
                  <p class="text-[9px] font-bold text-slate-400">{{ pr.requestNo || pr.id }}</p>
                </div>
                <div class="text-right flex-shrink-0">
                  <p class="text-[10px] font-black text-orange-600">{{ formatCurrency(pr.amount) }}</p>
                  <span :class="['text-[7px] font-black uppercase px-1.5 py-0.5 rounded-full', getPayReqStatusColor(pr.status)]">{{ pr.status }}</span>
                </div>
              </div>
              <div v-if="pendingPaymentReqs === 0" class="text-center py-8 text-slate-300 text-xs font-bold">
                <i class="pi pi-check-circle text-2xl mb-2 block text-emerald-200"></i>
                Tidak ada payment request pending.
              </div>
            </div>
          </template>

          <template #footer>
            <div class="p-4 bg-slate-50/50 border-t border-slate-100">
              <Button label="Kelola Semua Requests" text icon="pi pi-arrow-right" iconPos="right" class="w-full text-rose-600 font-black text-[10px] uppercase tracking-widest hover:bg-rose-50" @click="router.push('/finance/payment-request')" />
            </div>
          </template>
        </PanelCard>

        <!-- Quick Actions -->
        <!-- Quick Actions -->
        <PanelSolid
          title="Quick Actions"
          bg-icon="pi pi-bolt"
          theme="indigo"
        >
          <div class="space-y-2">
            <button
              v-for="action in [
                { label: 'Buat Journal Entry', icon: 'pi pi-plus', path: '/finance/journal' },
                { label: 'Buat Payment Request', icon: 'pi pi-file-plus', path: '/finance/payment-request' },
                { label: 'Rekonsiliasi Bank', icon: 'pi pi-sync', path: '/finance/bank-reconciliation' },
                { label: 'Laporan Keuangan', icon: 'pi pi-chart-bar', path: '/finance/reports?tab=pl' },
              ]" :key="action.label"
              class="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/10 hover:border-white/20 text-left"
              @click="router.push(action.path)">
              <i :class="[action.icon, 'text-indigo-400 text-sm']"></i>
              <span class="text-[11px] font-bold text-white">{{ action.label }}</span>
              <i class="pi pi-arrow-right text-[9px] text-white/30 ml-auto"></i>
            </button>
          </div>
        </PanelSolid>

      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
:deep(.p-progressbar) { @apply bg-slate-100; }
:deep(.p-progressbar .p-progressbar-value) { @apply bg-indigo-500; }
</style>
