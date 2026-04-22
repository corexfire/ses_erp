<script setup lang="ts">
const api = useApi();
const reconciliations = ref<any[]>([]);
const loading = ref(false);

const selectedMatch = ref<any>(null);
const showDetail = ref(false);
const detailLoading = ref(false);

const formatCurrency = (val: number | string) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(val));
};

const loadMatches = async () => {
  loading.value = true;
  try {
    const res = await api.get('/finance/vendor-reconciliation');
    reconciliations.value = res.matches || res.data?.matches || [];
  } catch (e) {
    console.error('Failed to load reconciliations:', e);
  } finally {
    loading.value = false;
  }
};

const openDetail = async (id: string) => {
  detailLoading.value = true;
  showDetail.value = true;
  try {
    const res = await api.get(`/finance/vendor-reconciliation/${id}`);
    selectedMatch.value = res.match || res.data?.match;
  } catch (e) {
    console.error('Failed to load match detail:', e);
  } finally {
    detailLoading.value = false;
  }
};

const getStatusClass = (status: string) => {
  switch (status) {
    case 'MATCHED': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'QTY_MISMATCH': return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'PRICE_MISMATCH': return 'bg-rose-100 text-rose-700 border-rose-200';
    default: return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

onMounted(() => {
  loadMatches();
});
</script>

<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group">
      <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-indigo-100"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
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
          <button @click="loadMatches" class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-100">
            <i class="pi pi-refresh" />
            Muat Data
          </button>
        </div>
      </div>
    </div>

    <!-- Overview Banners -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-4 transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="p-4 bg-indigo-100 rounded-3xl text-indigo-600 text-xl border shadow-inner"><i class="pi pi-file-edit"></i></div>
        <div>
          <div class="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">3-Way Match Validation</div>
          <p class="text-xs text-slate-600 leading-relaxed font-medium">Validasi otomatis Purchase Order, Goods Receipt, dan Invoice untuk mendeteksi variance.</p>
        </div>
      </div>
      <div class="p-4 rounded-xl bg-indigo-900 text-white shadow-xl flex items-start gap-4 border border-indigo-800 transition-all hover:bg-indigo-950">
        <div class="p-4 bg-indigo-600 rounded-3xl text-white text-xl shadow-lg animate-pulse"><i class="pi pi-check-circle"></i></div>
        <div>
          <div class="text-[10px] font-black uppercase text-indigo-300 tracking-widest mb-1">AP Accuracy Assurance</div>
          <p class="text-xs text-indigo-100/80 leading-relaxed font-medium">Pastikan setiap pembayaran sudah sesuai dengan barang yang diterima dan pesanan yang dipesan.</p>
        </div>
      </div>
    </div>

    <!-- Reconciliation Table -->
    <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
      <div class="p-5 border-b border-slate-100 bg-slate-50/10 flex justify-between items-center">
        <h3 class="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
          <i class="pi pi-list text-indigo-500 bg-indigo-50 p-1.5 rounded"></i>
          Active Reconciliation Queue
        </h3>
      </div>

      <div class="p-4 space-y-4">
        <div v-if="loading" class="py-20 text-center text-slate-400 font-bold italic">
          <i class="pi pi-spin pi-spinner mr-2"></i> Memuat data rekonsiliasi...
        </div>
        
        <div v-else-if="reconciliations.length === 0" class="py-20 text-center text-slate-400 font-bold italic">
          Belum ada data rekonsiliasi vendor.
        </div>

        <div v-for="rec in reconciliations" :key="rec.id" v-else class="p-5 bg-slate-50/50 border border-slate-200 rounded-2xl hover:bg-white hover:shadow-lg transition-all group">
          <div class="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div class="flex items-center gap-4 flex-1 min-w-0">
              <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-slate-200 shadow-sm font-black text-indigo-600 text-xs">
                3WM
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-3">
                  <h4 class="font-bold text-slate-800 truncate group-hover:text-indigo-600 transition-colors uppercase">{{ rec.order?.supplier?.name }}</h4>
                  <span 
                    :class="getStatusClass(rec.status)"
                    class="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border"
                  >
                    {{ rec.status }}
                  </span>
                </div>
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{{ rec.code }}</p>
              </div>
            </div>

            <div class="flex items-center gap-4 lg:gap-8 flex-1 justify-center py-4 lg:py-0 border-y lg:border-none border-slate-200/50 w-full lg:w-auto">
              <div class="text-center">
                <p class="text-[10px] text-slate-500 font-bold uppercase mb-1">PO</p>
                <p class="text-xs font-black text-slate-700 px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-sm">{{ rec.order?.code }}</p>
              </div>
              <i class="pi pi-arrow-right text-slate-300 hidden lg:block" />
              <div class="text-center">
                <p class="text-[10px] text-slate-500 font-bold uppercase mb-1">GRN</p>
                <p class="text-xs font-black text-slate-700 px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-sm">{{ rec.receipt?.code }}</p>
              </div>
              <i class="pi pi-arrow-right text-slate-300 hidden lg:block" />
              <div class="text-center">
                <p class="text-[10px] text-slate-500 font-bold uppercase mb-1">Invoice</p>
                <p class="text-xs font-black text-slate-700 px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-sm">{{ rec.invoice?.code }}</p>
              </div>
            </div>

            <div class="text-right shrink-0">
              <p class="text-sm font-black text-slate-800 mb-1">{{ formatCurrency(rec.invoice?.grandTotal || 0) }}</p>
              <p v-if="Number(rec.varianceAmount) !== 0" class="text-[10px] font-bold text-rose-600 uppercase tracking-widest">
                Variance: {{ formatCurrency(rec.varianceAmount) }}
              </p>
              <button @click="openDetail(rec.id)" class="mt-2 text-xs font-black text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-widest flex items-center gap-1 ml-auto">
                Details <i class="pi pi-arrow-right text-[10px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detail Dialog -->
    <Dialog v-model:visible="showDetail" modal header="Match Analysis Details" :style="{ width: '70vw' }" class="p-fluid">
      <template #header>
          <div class="flex items-center gap-3">
              <div class="p-2 bg-indigo-50 rounded-lg"><i class="pi pi-search-plus text-indigo-600"></i></div>
              <div>
                  <div class="text-lg font-black text-slate-800 leading-none">Analysis Detail 3-Way Match</div>
                  <div class="text-[10px] font-bold uppercase text-slate-400 tracking-widest mt-1">Audit Trail & Line Comparison</div>
              </div>
          </div>
      </template>

      <div v-if="detailLoading" class="py-20 text-center">
          <i class="pi pi-spin pi-spinner text-4xl text-indigo-500"></i>
          <p class="mt-4 text-slate-500 font-bold uppercase tracking-widest text-xs">Menganalisis Dokumen...</p>
      </div>

      <div v-else-if="selectedMatch" class="space-y-6 pt-4">
          <!-- Summary Cards -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div class="p-4 bg-slate-50 border rounded-xl">
                  <div class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Vendor</div>
                  <div class="font-bold text-slate-800">{{ selectedMatch.order?.supplier?.name }}</div>
              </div>
              <div class="p-4 bg-slate-50 border rounded-xl">
                  <div class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">PO Total</div>
                  <div class="font-bold text-slate-800">{{ formatCurrency(selectedMatch.order?.grandTotal || 0) }}</div>
              </div>
              <div class="p-4 bg-slate-50 border rounded-xl">
                  <div class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Invoice Total</div>
                  <div class="font-bold text-emerald-700">{{ formatCurrency(selectedMatch.invoice?.grandTotal || 0) }}</div>
              </div>
              <div class="p-4 border rounded-xl" :class="selectedMatch.status === 'MATCHED' ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'">
                  <div class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Status</div>
                  <div class="font-black" :class="selectedMatch.status === 'MATCHED' ? 'text-emerald-700' : 'text-rose-700'">{{ selectedMatch.status }}</div>
              </div>
          </div>

          <!-- Comparison Table -->
          <div class="border rounded-xl overflow-hidden">
              <table class="w-full text-xs">
                  <thead class="bg-slate-100 text-slate-600 font-black uppercase tracking-widest text-[10px] border-b">
                      <tr>
                          <th class="px-4 py-3 text-left">Item Description / SKU</th>
                          <th class="px-4 py-3 text-center border-l bg-blue-50/50">PO Qty</th>
                          <th class="px-4 py-3 text-center border-l bg-amber-50/50">GRN Qty</th>
                          <th class="px-4 py-3 text-center border-l bg-emerald-50/50">INV Qty</th>
                          <th class="px-4 py-3 text-right border-l">Variance Notes</th>
                      </tr>
                  </thead>
                  <tbody class="divide-y relative">
                      <!-- We assume items correlate by description/item for this simple view -->
                      <tr v-for="(item, idx) in selectedMatch.order?.items" :key="idx" class="hover:bg-slate-50/50 transition-colors">
                          <td class="px-4 py-4 font-bold text-slate-700">{{ item.description }}</td>
                          <td class="px-4 py-4 text-center border-l bg-blue-50/20 font-mono font-bold">{{ item.qty }}</td>
                          <td class="px-4 py-4 text-center border-l bg-amber-50/20 font-mono font-bold">
                              {{ selectedMatch.receipt?.items?.find(it => it.description === item.description)?.qty || 0 }}
                          </td>
                          <td class="px-4 py-4 text-center border-l bg-emerald-50/20 font-mono font-bold">
                              {{ selectedMatch.invoice?.items?.find(it => it.description === item.description)?.qty || 0 }}
                          </td>
                          <td class="px-4 py-4 text-right border-l italic text-slate-400">
                               <span v-if="item.qty != (selectedMatch.receipt?.items?.find(it => it.description === item.description)?.qty || 0)" class="text-rose-600 font-bold">
                                   Mismatch detected
                               </span>
                               <span v-else class="text-emerald-600">Verified OK</span>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>

          <div v-if="selectedMatch.discrepancyNotes" class="p-4 bg-amber-50 border border-amber-100 rounded-xl flex gap-3 text-amber-800">
              <i class="pi pi-exclamation-triangle mt-1"></i>
              <div>
                  <div class="text-[10px] font-black uppercase tracking-widest mb-1">Catatan Ketidaksesuaian</div>
                  <p class="text-xs font-semibold">{{ selectedMatch.discrepancyNotes }}</p>
              </div>
          </div>
      </div>
      
      <div v-else class="py-10 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">
          Match record not found.
      </div>
    </Dialog>
  </div>
</template>

<style scoped>
:deep(.p-dialog-content) {
    padding: 0 1.5rem 1.5rem 1.5rem !important;
}
:deep(.p-dialog-header) {
    border-bottom: 1px solid #f1f5f9;
}
</style>
