<script setup lang="ts">
import { ref } from 'vue'
import { 
  TrendingDown, 
  AlertTriangle, 
  Clock, 
  Search, 
  Filter, 
  MoreHorizontal, 
  PhoneCall, 
  Mail, 
  MessageSquare,
  FileBox,
  ChevronRight,
  UserPlus,
  CheckCircle2
} from 'lucide-vue-next'

const arAgingData = ref([
  { category: 'Current', amount: 1250000000, percentage: 65, color: 'bg-emerald-500' },
  { category: '1-30 Days', amount: 450000000, percentage: 23, color: 'bg-indigo-500' },
  { category: '31-60 Days', amount: 150000000, percentage: 8, color: 'bg-amber-500' },
  { category: '61-90 Days', amount: 45000000, percentage: 3, color: 'bg-orange-500' },
  { category: '>90 Days', amount: 15000000, percentage: 1, color: 'bg-rose-500' },
])

const debtors = ref([
  { 
    id: 1, 
    name: 'PT Solusi Makmur Teknik', 
    amount: 222000000, 
    days: 5, 
    status: 'High Priority',
    contact: 'Ibu Ratna (Finance)',
    lastAction: 'Email Sent 2 days ago'
  },
  { 
    id: 2, 
    name: 'Global Logistics Corp', 
    amount: 150000000, 
    days: 45, 
    status: 'Overdue',
    contact: 'Bp. Andi',
    lastAction: 'Call Scheduled'
  },
  { 
    id: 3, 
    name: 'Nusantara Trading', 
    amount: 85000000, 
    days: 12, 
    status: 'On Track',
    contact: 'Bp. Heru',
    lastAction: 'None'
  },
  { 
    id: 4, 
    name: 'Berjaya Construction', 
    amount: 320000000, 
    days: 75, 
    status: 'Critical',
    contact: 'Ibu Maria',
    lastAction: 'Legal Notice Sent'
  },
])

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val)
}
</script>

<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group">
      <div class="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-rose-100"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-6 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-rose-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Finance</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-rose-600">Debt Collection</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none">Debt Collection <span class="text-rose-600">Intelligence</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-xl">Monitoring Accounts Receivable & Recovery Velocity secara real-time.</p>
        </div>
        <div class="flex gap-3">
          <button class="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-rose-100">
            <UserPlus class="w-4 h-4" />
            Add Follow-up
          </button>
        </div>
      </div>
    </div>

    <!-- Overview Banners -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="p-6 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-4 transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="p-4 bg-rose-100 rounded-3xl text-rose-600 text-xl border shadow-inner"><i class="pi pi-exclamation-triangle"></i></div>
        <div>
          <div class="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Collection Intelligence</div>
          <p class="text-xs text-slate-600 leading-relaxed font-medium">Pantau piutang bermasalah dan prioritas penagihan untuk menjaga arus kas perusahaan.</p>
        </div>
      </div>
      <div class="p-6 rounded-xl bg-emerald-900 text-white shadow-xl flex items-start gap-4 border border-emerald-800 transition-all hover:bg-emerald-950">
        <div class="p-4 bg-emerald-600 rounded-3xl text-white text-xl shadow-lg animate-pulse"><i class="pi pi-check-circle"></i></div>
        <div>
          <div class="text-[10px] font-black uppercase text-emerald-300 tracking-widest mb-1">Recovery Velocity</div>
          <p class="text-xs text-emerald-100/80 leading-relaxed font-medium">Tingkatkan kecepatan penagihan dengan analitik prediktif dan workflow otomatis.</p>
        </div>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="p-5 rounded-xl bg-white border border-slate-200 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="flex items-center justify-between mb-3">
          <span class="text-[9px] font-black uppercase tracking-widest text-indigo-600">Total AR</span>
          <i class="pi pi-file text-slate-300"></i>
        </div>
        <div class="text-2xl font-black text-slate-900 tracking-tighter">Rp 1.91B</div>
        <div class="mt-2 text-[10px] font-bold text-rose-600">↑ 12% vs Month End</div>
      </div>

      <div class="p-5 rounded-xl bg-white border border-slate-200 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="flex items-center justify-between mb-3">
          <span class="text-[9px] font-black uppercase tracking-widest text-rose-600">Overdue > 60d</span>
          <i class="pi pi-exclamation-circle text-slate-300"></i>
        </div>
        <div class="text-2xl font-black text-rose-600 tracking-tighter">Rp 60M</div>
        <div class="mt-2 text-[10px] font-medium text-slate-500 italic">3 Active Debts</div>
      </div>

      <div class="p-5 rounded-xl bg-white border border-slate-200 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="flex items-center justify-between mb-3">
          <span class="text-[9px] font-black uppercase tracking-widest text-emerald-600">Collection Rate</span>
          <i class="pi pi-check-circle text-slate-300"></i>
        </div>
        <div class="text-2xl font-black text-emerald-600 tracking-tighter">94.2%</div>
        <div class="mt-2 text-[10px] font-bold text-emerald-600">↑ 2.1% Monthly Gain</div>
      </div>

      <div class="p-5 rounded-xl bg-white border border-slate-200 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="flex items-center justify-between mb-3">
          <span class="text-[9px] font-black uppercase tracking-widest text-amber-600">Days Sales Out</span>
          <i class="pi pi-clock text-slate-300"></i>
        </div>
        <div class="text-2xl font-black text-slate-900 tracking-tighter">42 Days</div>
        <div class="mt-2 text-[10px] font-bold text-emerald-600">↓ 4d Reduction</div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left: Aging Analytics -->
      <div class="lg:col-span-1 space-y-6">
        <div class="rounded-xl bg-white border border-slate-200 shadow-sm p-6">
          <h3 class="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-slate-100 pb-3">
            <i class="pi pi-chart-bar text-rose-500 bg-rose-50 p-1.5 rounded"></i>
            AR Aging Distribution
          </h3>
          <div class="space-y-5">
            <div v-for="age in arAgingData" :key="age.category" class="space-y-2">
              <div class="flex justify-between text-[11px] font-black uppercase tracking-wider mb-1">
                <span class="text-slate-500">{{ age.category }}</span>
                <span class="text-slate-800">{{ formatCurrency(age.amount) }}</span>
              </div>
              <div class="h-3 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                <div :class="age.color" :style="{ width: age.percentage + '%' }" class="h-full transition-all duration-1000 rounded-full"></div>
              </div>
            </div>
          </div>
          <div class="mt-8 pt-6 border-t border-slate-100">
            <div class="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-4">
              <AlertTriangle class="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <p class="text-xs font-bold text-amber-700 uppercase">Attention Required</p>
                <p class="text-xs text-slate-600 mt-1 leading-relaxed">Piutang bermasalah (>90 hari) telah meningkat nilainya minggu ini.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Debtors List -->
      <div class="lg:col-span-2 space-y-6">
        <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div class="p-5 border-b border-slate-100 bg-slate-50/10 flex justify-between items-center">
            <h3 class="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
              <i class="pi pi-users text-indigo-500 bg-indigo-50 p-1.5 rounded"></i>
              Top Delinquent Accounts
            </h3>
            <div class="flex items-center gap-2">
              <div class="relative">
                <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input type="text" placeholder="Cari akun..." class="bg-slate-50 border border-slate-200 text-xs rounded-xl pl-9 pr-4 py-2 w-48 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-300 font-medium" />
              </div>
              <button class="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 hover:text-rose-600 hover:border-rose-300 transition-colors">
                <Filter class="w-4 h-4" />
              </button>
            </div>
          </div>

          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="text-[10px] uppercase tracking-widest font-black text-slate-400 border-b border-slate-100">
                <th class="px-5 py-4 bg-slate-50">Customer Entity</th>
                <th class="px-5 py-4 bg-slate-50">Total Debt</th>
                <th class="px-5 py-4 bg-slate-50">Aging (Days)</th>
                <th class="px-5 py-4 bg-slate-50">Status</th>
                <th class="px-5 py-4 bg-slate-50 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="debtor in debtors" :key="debtor.id" class="hover:bg-rose-50/30 transition-colors group">
                <td class="px-5 py-4">
                  <div>
                    <p class="text-sm font-bold text-slate-800 group-hover:text-rose-600 transition-colors">{{ debtor.name }}</p>
                    <p class="text-[10px] text-slate-400 mt-0.5">Contact: {{ debtor.contact }}</p>
                  </div>
                </td>
                <td class="px-5 py-4">
                  <span class="text-sm font-black text-slate-800">{{ formatCurrency(debtor.amount) }}</span>
                </td>
                <td class="px-5 py-4">
                  <div class="flex items-center gap-2">
                    <span :class="[debtor.days > 60 ? 'text-rose-600' : 'text-slate-500']" class="text-sm font-medium">{{ debtor.days }}d</span>
                    <div class="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div :class="[debtor.days > 60 ? 'bg-rose-500' : 'bg-slate-400']" :style="{ width: Math.min(debtor.days, 100) + '%' }" class="h-full rounded-full"></div>
                    </div>
                  </div>
                </td>
                <td class="px-5 py-4">
                  <span 
                    :class="{
                      'bg-rose-100 text-rose-700 border-rose-200': debtor.status === 'Critical',
                      'bg-orange-100 text-orange-700 border-orange-200': debtor.status === 'Overdue',
                      'bg-amber-100 text-amber-700 border-amber-200': debtor.status === 'High Priority',
                      'bg-emerald-100 text-emerald-700 border-emerald-200': debtor.status === 'On Track'
                    }"
                    class="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border"
                  >
                    {{ debtor.status }}
                  </span>
                </td>
                <td class="px-5 py-4">
                  <div class="flex justify-end gap-1">
                    <button class="p-2 hover:bg-emerald-50 rounded-lg text-slate-400 hover:text-emerald-600 transition-colors" title="Call">
                      <PhoneCall class="w-4 h-4" />
                    </button>
                    <button class="p-2 hover:bg-indigo-50 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors" title="Email">
                      <Mail class="w-4 h-4" />
                    </button>
                    <button class="p-2 hover:bg-blue-50 rounded-lg text-slate-400 hover:text-blue-600 transition-colors" title="Chat">
                      <MessageSquare class="w-4 h-4" />
                    </button>
                    <button class="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                      <MoreHorizontal class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="p-5 border-t border-slate-100 bg-slate-50/30 flex justify-between items-center text-xs text-slate-500">
            <span>Menampilkan 4 dari 28 debtors</span>
            <div class="flex gap-2">
              <button class="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-rose-600 hover:border-rose-300 transition-colors font-bold">Previous</button>
              <button class="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-rose-600 hover:border-rose-300 transition-colors font-bold">Next</button>
            </div>
          </div>
        </div>

        <!-- Recent Actions -->
        <div class="rounded-xl bg-white border border-slate-200 shadow-sm p-6">
          <h3 class="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-slate-100 pb-3">
            <i class="pi pi-history text-amber-500 bg-amber-50 p-1.5 rounded"></i>
            Collection Activity Feed
          </h3>
          <div class="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-rose-500 before:via-slate-200 before:to-transparent">
            <div class="relative flex items-center justify-between group">
              <div class="flex items-center">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm">
                  <PhoneCall class="h-4 w-4 text-emerald-500" />
                </div>
                <div class="ml-5 flex-1">
                  <p class="text-sm font-bold text-slate-800">Call with PT Solusi Makmur Teknik</p>
                  <p class="text-xs text-slate-500 mt-0.5">Agreed to partial payment of Rp 100M by Friday.</p>
                </div>
              </div>
              <p class="text-[10px] text-slate-400 uppercase font-black">2h ago</p>
            </div>
            <div class="relative flex items-center justify-between group">
              <div class="flex items-center">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm">
                  <Mail class="h-4 w-4 text-indigo-500" />
                </div>
                <div class="ml-5 flex-1">
                  <p class="text-sm font-bold text-slate-800">Automated Reminder Sent</p>
                  <p class="text-xs text-slate-500 mt-0.5">Bulk email sent to 12 accounts in '1-30 Days' bracket.</p>
                </div>
              </div>
              <p class="text-[10px] text-slate-400 uppercase font-black">5h ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(thead > tr > th) {
  background: transparent !important;
  font-size: 10px !important;
  font-weight: 900 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.1em !important;
  color: #94a3b8 !important;
  border-bottom: 2px solid #f1f5f9 !important;
  padding: 1rem 1.25rem !important;
}

:deep(tbody > tr) {
  background: transparent !important;
  transition: all 0.2s ease;
}

:deep(tbody > tr:hover) {
  background: rgba(241, 245, 249, 0.5) !important;
}

:deep(tbody > tr > td) {
  padding: 1.25rem 1.25rem !important;
  border-bottom: 1px solid #f8fafc !important;
}
</style>
