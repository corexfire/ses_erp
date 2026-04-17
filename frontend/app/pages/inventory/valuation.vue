<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="rounded-xl bg-indigo-950 p-8 shadow-2xl relative overflow-hidden group border border-indigo-800">
      <div class="absolute right-[-40px] top-[-40px] opacity-10 transition-transform duration-700 group-hover:scale-110">
         <i class="pi pi-shield text-[220px] text-white"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-6 relative z-10">
        <div class="space-y-3">
           <div class="flex items-center gap-2">
              <span class="px-3 py-1 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg shadow-indigo-500/20">Finance & Inventory</span>
              <span class="text-indigo-400">/</span>
              <span class="text-[9px] font-bold text-indigo-300 uppercase tracking-widest">Asset Valuation</span>
           </div>
           <h1 class="text-4xl font-black text-white tracking-tight leading-none">Penilaian <span class="text-indigo-400">Gudang</span></h1>
           <p class="text-indigo-200/60 text-sm font-medium max-w-xl">Monitor Harga Pokok Penjualan (COGS) dan sinkronisasi saldo buku besar persediaan secara akurat.</p>
        </div>
        <div class="flex gap-3">
          <Button label="Audit Stok vs Fisik" severity="secondary" outlined class="p-button-rounded font-black text-[10px] px-6 h-12 uppercase text-white border-white/20 hover:bg-white/10" icon="pi pi-receipt" />
          <Button v-if="canManage" label="Rekalkulasi COGS" :loading="recalculating" class="p-button-rounded font-black text-[10px] px-6 h-12 uppercase shadow-xl shadow-indigo-500/20 bg-white border-none text-indigo-900 transition-all hover:scale-105 active:scale-95" icon="pi pi-calculator" @click="triggerRecalculate" />
        </div>
      </div>
    </div>

    <!-- Background Processing Banner -->
    <transition name="fade">
       <div v-if="jobActive" class="p-6 rounded-3xl bg-indigo-50 border border-indigo-100 shadow-sm flex items-center justify-between gap-6 animate-pulse">
          <div class="flex items-center gap-4">
             <div class="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
                <i class="pi pi-spin pi-spinner text-xl"></i>
             </div>
             <div>
                <h4 class="text-sm font-black text-indigo-900 leading-tight">Sinkronisasi Moving Average Sedang Berjalan</h4>
                <p class="text-[11px] font-medium text-indigo-600/80">Operasi latar belakang sedang mengkalkulasi ulang HPP dan penjurnalan keuangan...</p>
             </div>
          </div>
          <div class="flex items-center gap-4 min-w-48">
             <span class="text-[10px] font-black text-indigo-900 font-mono">{{ jobProgress }}%</span>
             <div class="flex-1 bg-indigo-200 h-2 rounded-full overflow-hidden shadow-inner">
                <div class="bg-indigo-600 h-full transition-all duration-500" :style="{ width: jobProgress + '%' }"></div>
             </div>
          </div>
       </div>
    </transition>

    <!-- Analytics Dashboard -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
       <!-- Total Assets -->
       <div class="p-8 rounded-xl bg-white border border-slate-200 shadow-sm relative overflow-hidden group">
          <div class="absolute right-0 top-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-100 transition-colors"></div>
          <div class="uppercase text-[9px] font-black text-slate-400 tracking-[0.2em] mb-4 relative z-10">Asset Valuation</div>
          <div class="flex items-end gap-3 relative z-10">
             <span class="text-xs font-black text-slate-300 mb-2">RP</span>
             <span class="text-4xl font-black text-slate-900 font-mono tracking-tighter">{{ formatCurrency(grandTotal) }}</span>
          </div>
          <div class="mt-4 flex items-center gap-2 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl w-max">
             <i class="pi pi-arrow-up-right"></i>
             <span>SINKRON DENGAN NERACA</span>
          </div>
       </div>
       
       <!-- Calculation Method -->
       <div class="p-8 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-center gap-4">
          <div class="flex items-center gap-4">
             <div class="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
                <i class="pi pi-sliders-v text-xl"></i>
             </div>
             <div>
                <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Standard Method</div>
                <h4 class="text-lg font-black text-slate-800 leading-none">Moving Average</h4>
             </div>
          </div>
          <p class="text-[10px] font-medium text-slate-500 leading-relaxed border-t pt-4">Penilaian nilai modal didefinisikan secara dinamis setiap ada penerimaan barang atau mutasi produksi.</p>
       </div>

       <!-- Data Integrity -->
       <div class="p-8 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col group transition-all hover:bg-slate-900 hover:border-slate-800">
          <div class="flex items-center justify-between mb-4">
             <span class="text-[9px] font-black text-slate-400 tracking-widest uppercase group-hover:text-indigo-400">Audit Status</span>
             <span class="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded shadow-inner">SECURE</span>
          </div>
          <h4 class="text-2xl font-black text-slate-800 tracking-tight group-hover:text-white mb-2">100% Match</h4>
          <p class="text-[10px] font-medium text-slate-500 group-hover:text-slate-400">Saldo stok fisik dan pembukuan dalam sinkronisasi sempurna.</p>
       </div>
    </div>

    <!-- Inventory Valuation Table -->
    <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden p-2">
       <div class="p-8 flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-3 w-full md:w-auto">
             <div class="relative w-full md:w-80">
                <i class="pi pi-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                <InputText v-model="search" placeholder="Cari Kode SKU / Nama..." class="w-full pl-10 text-xs font-bold rounded-2xl border-slate-200 h-11" />
             </div>
             <Button label="Refresh Data" icon="pi pi-refresh" severity="secondary" text rounded class="font-black text-[10px] uppercase" @click="load" :loading="loading" />
          </div>
       </div>

       <DataTable :value="filteredValuations" dataKey="itemId" class="p-datatable-sm w-full" :loading="loading">
          <template #empty>
             <div class="py-20 text-center text-slate-400">
                <i class="pi pi-receipt text-5xl opacity-20 mb-4 block shadow-inner rounded-full p-4 inline-block"></i>
                <span class="font-medium">Data penilaian belum tersedia.</span>
             </div>
          </template>
          
          <Column header="ENTITY MATERIAL" class="pl-8">
             <template #body="{ data }">
                <div class="flex items-center gap-4 py-3">
                   <div class="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
                      <i class="pi pi-tag text-xl"></i>
                   </div>
                   <div class="flex flex-col">
                      <span class="text-xs font-black text-slate-900 tracking-tight">{{ data.itemCode }}</span>
                      <span class="text-[10px] font-bold text-slate-500">{{ data.itemName }}</span>
                      <div class="flex items-center gap-1.5 mt-1">
                         <span class="text-[8px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-50 px-1.5 py-0.5 rounded shadow-sm border border-indigo-100">{{ data.valuationMethod }}</span>
                      </div>
                   </div>
                </div>
             </template>
          </Column>

          <Column header="STOCK ON-HAND" class="text-center w-36 bg-slate-50/20">
             <template #body="{ data }">
                <div class="flex flex-col items-center">
                   <span class="text-base font-black font-mono text-slate-700 tracking-tighter">{{ formatQty(data.currentQty) }}</span>
                   <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">UNITS</span>
                </div>
             </template>
          </Column>

          <Column header="UNIT COST (AVG)" class="text-right border-x border-slate-50 bg-emerald-50/10">
             <template #body="{ data }">
                <div class="flex flex-col items-end">
                   <div class="flex items-center gap-1">
                      <span class="text-[8px] font-black text-slate-300">IDR</span>
                      <span class="text-sm font-bold font-mono text-emerald-700">{{ formatCurrency(data.unitCost) }}</span>
                   </div>
                   <span class="text-[8px] font-black text-slate-400 uppercase tracking-tighter leading-none mt-1">LAST CALC</span>
                </div>
             </template>
          </Column>

          <Column header="TOTAL BOOK VALUE" class="text-right bg-indigo-50/10 pr-8">
             <template #body="{ data }">
                <div class="flex flex-col items-end">
                   <div class="flex items-center gap-1.5">
                      <span class="text-[10px] font-black text-indigo-300">IDR</span>
                      <span class="text-xl font-black font-mono text-indigo-900 tracking-tighter">{{ formatCurrency(data.totalValue) }}</span>
                   </div>
                   <span class="text-[8px] font-black text-indigo-400 uppercase tracking-widest leading-none mt-1">NET ASSET</span>
                 </div>
             </template>
          </Column>

          <Column class="text-right pr-4">
             <template #body="{ data }">
                <Button label="Audit Layer" icon="pi pi-list" text severity="info" class="p-button-sm font-black text-[10px] uppercase px-4 h-9 rounded-xl hover:bg-indigo-50" @click="openAudit(data)" />
             </template>
          </Column>
       </DataTable>
    </div>

    <!-- Audit Layer Modal -->
    <Dialog v-model:visible="auditVisible" modal class="w-[1000px]" :pt="{ mask: { class: 'backdrop-blur-sm bg-black/20' }, content: { class: 'p-0 rounded-xl overflow-hidden shadow-2xl' }, header: { class: 'hidden' } }">
       <div class="flex items-center justify-between p-8 border-b border-indigo-100 bg-white shadow-sm shrink-0">
          <div class="flex items-center gap-4">
             <div class="w-14 h-14 rounded-3xl bg-slate-900 flex items-center justify-center text-white shadow-xl rotate-3">
                <i class="pi pi-list text-2xl"></i>
             </div>
             <div>
                <h4 class="text-2xl font-black text-slate-900 leading-tight">Valuation Layer Audit</h4>
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Jejak Historis Injeksi Nilai Buku Item</p>
             </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="auditVisible = false" />
       </div>

       <div class="p-10 space-y-8 max-h-[70vh] overflow-y-auto bg-slate-50/30">
          <div class="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-100 shadow-sm group hover:border-indigo-200 transition-colors">
             <div class="flex items-center gap-4 text-slate-900">
                <div class="p-4 bg-indigo-50 rounded-2xl text-indigo-600 transition-transform group-hover:scale-110"><i class="pi pi-box scale-150"></i></div>
                <div>
                   <h5 class="text-[11px] font-black uppercase text-indigo-400 tracking-widest">Selected Material Entity</h5>
                   <p class="text-lg font-black tracking-tight leading-none mt-1">{{ activeVal?.itemName }} <span class="text-slate-400 font-mono ml-2 font-medium">[{{ activeVal?.itemCode }}]</span></p>
                </div>
             </div>
             <div class="text-right">
                <h5 class="text-[11px] font-black uppercase text-slate-400 tracking-widest">Current Average</h5>
                <p class="text-2xl font-black text-indigo-900 font-mono tracking-tighter">Rp {{ formatCurrency(activeVal?.unitCost) }}</p>
             </div>
          </div>

          <div class="rounded-3xl border border-slate-100 bg-white shadow-sm overflow-hidden p-2">
             <DataTable :value="auditLayers" scrollable scrollHeight="400px" class="p-datatable-sm" :loading="auditLoading">
                <template #empty><div class="py-12 text-center text-slate-300 font-medium">Belum ada layer nilai terekam.</div></template>
                <Column header="POSTING DATE" class="pl-6 w-36">
                   <template #body="{ data }"><span class="font-mono text-[11px] font-bold text-slate-500">{{ formatDate(data.postingDate) }}</span></template>
                </Column>
                <Column header="SOURCE DOCUMENT" class="w-48">
                   <template #body="{ data }">
                      <div class="flex flex-col">
                         <span class="text-[10px] font-black text-slate-800 leading-none mb-1">{{ data.refType }}</span>
                         <span class="font-mono text-[9px] text-indigo-600 font-bold bg-indigo-50 px-1.5 py-0.5 rounded shadow-inner inline-block">{{ data.refId ||'SYSTEM' }}</span>
                      </div>
                   </template>
                </Column>
                <Column header="QTY IN" class="text-center w-28">
                   <template #body="{ data }"><span class="font-mono font-black text-emerald-600">+{{ formatQty(data.qty) }}</span></template>
                </Column>
                <Column header="ACQUISITION COST" class="text-right w-40 pr-8">
                   <template #body="{ data }">
                      <div class="flex items-center gap-1 justify-end">
                         <span class="text-[10px] font-black text-slate-300">RP</span>
                         <span class="font-mono font-black text-slate-800">{{ formatCurrency(data.unitCost) }}</span>
                      </div>
                   </template>
                </Column>
             </DataTable>
          </div>
       </div>

       <div class="p-8 border-t border-slate-100 bg-white flex justify-end gap-3 rounded-b-[2.5rem] shrink-0">
          <Button label="Tutup Audit" severity="secondary" @click="auditVisible = false" class="p-button-rounded font-black text-[10px] uppercase px-12 h-12 shadow-sm border-slate-100" />
       </div>
    </Dialog>


  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import { useApi } from '@/composables/useApi';

const api = useApi();
const toast = useToast();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('inventory.valuation.manage') || true);

const valuations = ref<any[]>([]);
const grandTotal = ref(0);
const search = ref('');
const loading = ref(false);
const recalculating = ref(false);

const auditVisible = ref(false);
const auditLoading = ref(false);
const activeVal = ref<any>(null);
const auditLayers = ref<any[]>([]);

// Job State
const jobActive = ref(false);
const jobProgress = ref(0);
let pollTimer: any = null;

const filteredValuations = computed(() => {
  if (!search.value) return valuations.value;
  const q = search.value.toLowerCase();
  return valuations.value.filter(v => 
    v.itemCode.toLowerCase().includes(q) || 
    v.itemName.toLowerCase().includes(q)
  );
});

const formatQty = (v: any) => Number(v || 0).toLocaleString('id-ID', { maximumFractionDigits: 1 });
const formatCurrency = (v: any) => Number(v || 0).toLocaleString('id-ID', { maximumFractionDigits: 0 });
const formatDate = (iso: string) => {
   if (!iso) return '-';
   const d = new Date(iso);
   return `${d.getDate().toString().padStart(2,'0')}/${(d.getMonth()+1).toString().padStart(2,'0')}/${d.getFullYear()}`;
};

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/inventory/valuation');
    valuations.value = res.data.valuation;
    grandTotal.value = res.data.grandTotal;
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Valuation Error', detail: e.message });
  } finally {
    loading.value = false;
  }
}

async function triggerRecalculate() {
   recalculating.value = true;
   try {
      const res = await api.post('/inventory/valuation/recalculate');
      toast.add({ severity: 'info', summary: 'Sinkronisasi Dimulai', detail: 'Penghitungan HPP berjalan di latar belakang.' });
      startPolling(res.data.jobId);
   } catch (e: any) {
      toast.add({ severity: 'error', summary: 'Gagal', detail: e.message });
      recalculating.value = false;
   }
}

function startPolling(jobId: string) {
   jobActive.value = true;
   jobProgress.value = 0;
   
   if (pollTimer) clearInterval(pollTimer);
   
   pollTimer = setInterval(async () => {
      try {
         const res = await api.get(`/inventory/valuation/job-status/${jobId}`);
         jobProgress.value = res.data.progress;
         
         if (res.data.status === 'COMPLETED') {
            stopPolling();
            toast.add({ severity: 'success', summary: 'Selesai!', detail: 'Buku besar COGS telah disinkronkan.' });
            load();
         } else if (res.data.status === 'FAILED') {
            stopPolling();
            toast.add({ severity: 'error', summary: 'Kegagalan Sinkronisasi', detail: 'Terdapat anomali data di ledger.' });
         }
      } catch (e) {
         stopPolling();
      }
   }, 1500);
}

function stopPolling() {
   if (pollTimer) clearInterval(pollTimer);
   jobActive.value = false;
   recalculating.value = false;
}

async function openAudit(val: any) {
  activeVal.value = val;
  auditVisible.value = true;
  auditLoading.value = true;
  try {
     const res = await api.get(`/inventory/valuation/layers?itemId=${val.itemId}&take=100`);
     auditLayers.value = res.data.data;
  } catch (e) {
     toast.add({ severity: 'warn', summary: 'Audit Trace', detail: 'Gagal mengambil data jejak nilai.' });
  } finally {
     auditLoading.value = false;
  }
}

onMounted(load);
onUnmounted(stopPolling);
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

:deep(.p-datatable-thead > tr > th) {
  background: transparent !important;
  font-size: 10px !important;
  font-weight: 900 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.15em !important;
  color: #64748b !important;
  border-bottom: 2px solid #f1f5f9 !important;
  padding: 1.5rem 1rem !important;
}

:deep(.p-datatable-tbody > tr > td) {
  padding: 1.25rem 1rem !important;
  border-bottom: 1px solid #f8fafc !important;
}

:deep(.p-inputtext) {
   border-color: #f1f5f9 !important;
   box-shadow: none !important;
   background-color: #f8fafc !important;
}
</style>