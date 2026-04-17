<script setup lang="ts">
import { ref } from 'vue'
import { 
  ArrowRightLeft, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Search, 
  FileCheck, 
  Truck, 
  Receipt,
  FileText,
  Filter,
  ArrowRight
} from 'lucide-vue-next'

const reconciliations = ref([
  {
    id: 'REC-001',
    vendor: 'PT Teknologi Digital Indonesia',
    po: 'PO-2024-001',
    grn: 'GRN-2024-001',
    invoice: 'PINV-2024-001',
    amount: 83250000,
    status: 'Matched',
    variance: 0
  },
  {
    id: 'REC-002',
    vendor: 'Global Logistics Corp',
    po: 'PO-2024-045',
    grn: 'GRN-2024-088',
    invoice: 'INV-GLC-99',
    amount: 15200000,
    status: 'Qty Mismatch',
    variance: -1500000
  },
  {
    id: 'REC-003',
    vendor: 'Indo Hardware Supply',
    po: 'PO-2024-012',
    grn: 'Pending',
    invoice: 'INV-IHS-55',
    amount: 4200000,
    status: 'Missing GRN',
    variance: 0
  }
])

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val)
}
</script>

<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group">
      <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-indigo-100"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-6 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-indigo-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Finance</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-indigo-600">Vendor Reconciliation</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none">Vendor <span class="text-indigo-600">Reconciliation</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-xl">Validasi PO, GRN, dan Invoice untuk akurasi Accounts Payable dengan 3-Way Match.</p>
        </div>
        <div class="flex gap-3">
          <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-100">
            <FileCheck class="w-4 h-4" />
            Run Auto-Match
          </button>
        </div>
      </div>
    </div>

    <!-- Overview Banners -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="p-6 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-4 transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="p-4 bg-indigo-100 rounded-3xl text-indigo-600 text-xl border shadow-inner"><i class="pi pi-file-edit"></i></div>
        <div>
          <div class="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">3-Way Match Validation</div>
          <p class="text-xs text-slate-600 leading-relaxed font-medium">Validasi otomatis Purchase Order, Goods Receipt, dan Invoice untuk mendeteksi variance.</p>
        </div>
      </div>
      <div class="p-6 rounded-xl bg-indigo-900 text-white shadow-xl flex items-start gap-4 border border-indigo-800 transition-all hover:bg-indigo-950">
        <div class="p-4 bg-indigo-600 rounded-3xl text-white text-xl shadow-lg animate-pulse"><i class="pi pi-check-circle"></i></div>
        <div>
          <div class="text-[10px] font-black uppercase text-indigo-300 tracking-widest mb-1">AP Accuracy Assurance</div>
          <p class="text-xs text-indigo-100/80 leading-relaxed font-medium">Pastikan setiap pembayaran sudah sesuai dengan barang yang diterima dan pesanan yang dipesan.</p>
        </div>
      </div>
    </div>

    <!-- Stats Matrix -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="p-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
        <div class="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <CheckCircle2 class="w-32 h-32 text-emerald-500" />
        </div>
        <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Perfect Matches</p>
        <h3 class="text-4xl font-black text-emerald-600 leading-none">142</h3>
        <p class="text-xs text-slate-500 mt-2 font-medium italic">88% of total volume</p>
      </div>

      <div class="p-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
        <div class="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <AlertCircle class="w-32 h-32 text-amber-500" />
        </div>
        <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Pending Exceptions</p>
        <h3 class="text-4xl font-black text-amber-600 leading-none">18</h3>
        <p class="text-xs text-slate-500 mt-2 font-medium italic">Require manual review</p>
      </div>

      <div class="p-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
        <div class="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <Receipt class="w-32 h-32 text-indigo-500" />
        </div>
        <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Uninvoiced Goods</p>
        <h3 class="text-4xl font-black text-indigo-600 leading-none">Rp 215M</h3>
        <p class="text-xs text-slate-500 mt-2 font-medium italic">Accrual estimate</p>
      </div>
    </div>

    <!-- Reconciliation Table -->
    <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
      <div class="p-5 border-b border-slate-100 bg-slate-50/10 flex justify-between items-center">
        <h3 class="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
          <i class="pi pi-list text-indigo-500 bg-indigo-50 p-1.5 rounded"></i>
          Active Reconciliation Queue
        </h3>
        <div class="flex items-center gap-2">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input type="text" placeholder="Cari PO / Vendor..." class="bg-slate-50 border border-slate-200 text-xs rounded-xl pl-9 pr-4 py-2 w-48 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 font-medium" />
          </div>
          <button class="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 hover:text-indigo-600 hover:border-indigo-300 transition-colors">
            <Filter class="w-4 h-4" />
          </button>
        </div>
      </div>

      <div class="p-6 space-y-4">
        <div v-for="rec in reconciliations" :key="rec.id" class="p-5 bg-slate-50/50 border border-slate-200 rounded-2xl hover:bg-white hover:shadow-lg transition-all group">
          <div class="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div class="flex items-center gap-6 flex-1 min-w-0">
              <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-slate-200 shadow-sm">
                <FileText :class="[rec.status === 'Matched' ? 'text-emerald-500' : 'text-amber-500']" class="w-6 h-6" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-3">
                  <h4 class="font-bold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">{{ rec.vendor }}</h4>
                  <span 
                    :class="[rec.status === 'Matched' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-rose-100 text-rose-700 border-rose-200']"
                    class="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border"
                  >
                    {{ rec.status }}
                  </span>
                </div>
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{{ rec.id }} • Main Branch</p>
              </div>
            </div>

            <div class="flex items-center gap-4 lg:gap-8 flex-1 justify-center py-4 lg:py-0 border-y lg:border-none border-slate-200/50 w-full lg:w-auto">
              <div class="text-center">
                <p class="text-[10px] text-slate-500 font-bold uppercase mb-1">PO</p>
                <p class="text-xs font-black text-slate-700 px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-sm">{{ rec.po }}</p>
              </div>
              <ArrowRight class="w-4 h-4 text-slate-400 hidden lg:block" />
              <div class="text-center">
                <p class="text-[10px] text-slate-500 font-bold uppercase mb-1">GRN</p>
                <p :class="[rec.grn === 'Pending' ? 'text-rose-600 italic' : 'text-slate-700']" class="text-xs font-black px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-sm">
                  {{ rec.grn }}
                </p>
              </div>
              <ArrowRight class="w-4 h-4 text-slate-400 hidden lg:block" />
              <div class="text-center">
                <p class="text-[10px] text-slate-500 font-bold uppercase mb-1">Invoice</p>
                <p class="text-xs font-black text-slate-700 px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-sm">{{ rec.invoice }}</p>
              </div>
            </div>

            <div class="text-right shrink-0">
              <p class="text-sm font-black text-slate-800 mb-1">{{ formatCurrency(rec.amount) }}</p>
              <p v-if="rec.variance !== 0" class="text-[10px] font-bold text-rose-600 uppercase tracking-widest">
                Variance: {{ formatCurrency(rec.variance) }}
              </p>
              <button class="mt-2 text-xs font-black text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-widest flex items-center gap-1 ml-auto">
                Details <ArrowRight class="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="p-5 border-t border-slate-100 bg-slate-50/30 flex justify-between items-center text-xs text-slate-500">
        <span>Displaying matching candidates for last 30 days</span>
        <button class="flex items-center gap-2 hover:text-indigo-600 transition-colors uppercase font-black text-[10px] tracking-widest">
          Download Match Report <FileText class="w-3 h-3" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.p-datatable-thead > tr > th) {
  background: transparent !important;
  font-size: 10px !important;
  font-weight: 900 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.1em !important;
  color: #94a3b8 !important;
  border-bottom: 2px solid #f1f5f9 !important;
  padding: 1.25rem 1rem !important;
}

:deep(.p-datatable-tbody > tr) {
  background: transparent !important;
  transition: all 0.2s ease;
}

:deep(.p-datatable-tbody > tr:hover) {
  background: rgba(241, 245, 249, 0.5) !important;
}
</style>
