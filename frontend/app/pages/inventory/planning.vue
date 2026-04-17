<template>
  <div class="space-y-4">
    <!-- Header (Premium Planning Style) -->
    <div class="rounded-xl bg-slate-900 border border-slate-800 p-8 shadow-2xl relative overflow-hidden group">
      <div class="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-[100px] -mr-40 -mt-40 transition-all duration-700 group-hover:bg-orange-500/20"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-6 relative">
        <div class="space-y-2">
           <div class="flex items-center gap-2 mb-1">
              <span class="px-3 py-1 bg-orange-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full">Supply Chain AI</span>
              <span class="text-slate-600">/</span>
              <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Material Requirement Planning</span>
           </div>
           <h1 class="text-4xl font-black text-white tracking-tight leading-none">Perencanaan <span class="text-orange-500">Stok MRP</span></h1>
           <p class="text-slate-400 text-sm font-medium max-w-xl">Prediksi kekurangan inventaris berdasarkan pesanan dan ambang batas ketersediaan secara cerdas.</p>
        </div>
        <div class="flex gap-3">
          <Button label="Konfigurasi Reorder" severity="secondary" outlined class="p-button-rounded font-black text-[10px] px-6 h-12 uppercase text-white border-slate-700 hover:bg-slate-800" icon="pi pi-sliders-h" />
          <Button v-if="canManage" label="Jalankan Kalkulasi MRP" class="p-button-rounded font-black text-[10px] px-8 h-14 uppercase shadow-2xl shadow-orange-500/20 bg-orange-600 border-none text-white transition-all hover:scale-105 active:scale-95" icon="pi pi-bolt" @click="runMrp" :loading="runningMrp" />
        </div>
      </div>
    </div>

    <!-- Scanning Overlay -->
    <transition name="fade">
       <div v-if="runningMrp" class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-md">
          <div class="text-center space-y-6">
             <div class="relative w-32 h-32 mx-auto">
                <div class="absolute inset-0 border-4 border-orange-500/20 rounded-full"></div>
                <div class="absolute inset-0 border-4 border-orange-600 rounded-full border-t-transparent animate-spin"></div>
                <i class="pi pi-bolt text-4xl text-orange-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></i>
             </div>
             <div>
                <h2 class="text-2xl font-black text-white italic">MEMINDAI GUDANG GLOBAL...</h2>
                <div class="mt-2 flex items-center justify-center gap-2">
                   <div class="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce" style="animation-delay: 0s"></div>
                   <div class="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                   <div class="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                </div>
                <p class="text-slate-400 text-xs mt-4 font-mono font-bold tracking-widest">REKONSILIASI SALES FORECAST & LIVE STOCK</p>
             </div>
          </div>
       </div>
    </transition>

    <!-- Data List and Filters -->
    <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col">
       <div class="p-8 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-3 w-full md:w-auto">
             <div class="relative w-full md:w-80">
                <i class="pi pi-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                <InputText v-model="search" placeholder="Cari Item SKU / Material..." class="w-full pl-10 text-xs font-bold rounded-2xl border-slate-200 h-11" />
             </div>
             <Select v-model="typeFilter" :options="typeOptions" optionLabel="label" optionValue="value" placeholder="Semua Rekomendasi" class="w-60 text-xs font-bold rounded-2xl border-slate-200" showClear />
             <Button icon="pi pi-refresh" severity="secondary" text rounded @click="load" :loading="loading" />
          </div>
          <div class="px-4 py-2 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-3">
             <i class="pi pi-clock text-orange-500 text-xs"></i>
             <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Validitas: 100% Real-time</span>
          </div>
       </div>

       <DataTable :value="filteredSuggestions" dataKey="id" class="p-datatable-sm w-full" :loading="loading">
          <template #empty>
             <div class="py-24 text-center text-slate-400">
                <i class="pi pi-check-circle text-6xl opacity-10 mb-4 block"></i>
                <h4 class="text-lg font-black text-slate-300">Stok Berada Dalam Batas Aman</h4>
                <p class="text-xs font-medium">MRP tidak mendeteksi adanya kekurangan material saat ini.</p>
             </div>
          </template>
          
          <Column header="ENTITY & STATUS" class="pl-8">
             <template #body="{ data }">
                <div class="flex items-center gap-4 py-3">
                   <div :class="['w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border', isUrgent(data.dueDate) ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-slate-50 border-slate-100 text-slate-400']">
                      <i :class="['pi', isUrgent(data.dueDate) ? 'pi-exclamation-triangle' : 'pi-box', 'text-xl']"></i>
                   </div>
                   <div class="flex flex-col">
                      <span class="text-xs font-black text-slate-900 tracking-tight">{{ data.item?.code || 'SKU-UNKNOWN' }}</span>
                      <span class="text-[10px] font-bold text-slate-500 mb-1">{{ data.item?.name }}</span>
                      <div class="flex items-center gap-1.5">
                         <span :class="['text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow-inner border', data.suggestionType === 'PURCHASE' ? 'bg-cyan-50 border-cyan-100 text-cyan-600' : 'bg-fuchsia-50 border-fuchsia-100 text-fuchsia-600']">
                            {{ data.suggestionType }}
                         </span>
                      </div>
                   </div>
                </div>
             </template>
Column          </Column>

          <Column header="LIVE SITUATION" class="bg-slate-50/10">
             <template #body="{ data }">
                <div class="flex flex-col gap-1 pr-6 border-r border-slate-100">
                   <div class="flex justify-between items-center text-[10px]"><span class="text-slate-400 font-bold uppercase tracking-tighter">Required:</span> <span class="font-mono font-black text-slate-900">{{ formatQty(data.qtyRequired) }}</span></div>
                   <div class="flex justify-between items-center text-[10px]"><span class="text-slate-400 font-bold uppercase tracking-tighter">On-Hand:</span> <span class="font-mono font-black text-emerald-600">{{ formatQty(data.qtyOnHand) }}</span></div>
                   <div class="flex justify-between items-center text-[10px]"><span class="text-slate-400 font-bold uppercase tracking-tighter">On-Order:</span> <span class="font-mono font-black text-blue-500">{{ formatQty(data.qtyOnOrder) }}</span></div>
                </div>
             </template>
          </Column>

          <Column header="MRP SUGGESTION" class="bg-orange-50/10">
             <template #body="{ data }">
                <div class="flex flex-col items-center justify-center py-2">
                   <span class="text-2xl font-black font-mono text-orange-600 tracking-tighter">{{ formatQty(data.qtySuggested) }}</span>
                   <span class="text-[8px] font-black text-orange-400 uppercase tracking-[0.2em] leading-none">RECOGNIZED ACTION</span>
                </div>
             </template>
          </Column>

          <Column header="DEADLINE">
             <template #body="{ data }">
                <div class="flex flex-col gap-1">
                   <span :class="['text-xs font-black font-mono', isUrgent(data.dueDate) ? 'text-rose-600 underline' : 'text-slate-600']">{{ formatDate(data.dueDate) }}</span>
                   <span v-if="isUrgent(data.dueDate)" class="text-[8px] font-black text-rose-500 animate-pulse">STOCKOUT IMMINENT</span>
                </div>
             </template>
          </Column>

          <Column class="text-right pr-8">
             <template #body="{ data }">
                <Button v-if="data.status === 'OPEN'" :label="data.suggestionType === 'PURCHASE' ? 'Eksekusi Beli' : 'Eksekusi Produksi'" severity="warning" class="p-button-sm font-black text-[10px] uppercase px-4 h-9 rounded-xl shadow-lg shadow-orange-500/10" @click="executeSuggestion(data)" />
                <div v-else class="flex items-center gap-2 justify-end text-emerald-600">
                   <i class="pi pi-spin pi-spinner text-[10px]"></i>
                   <span class="text-[10px] font-black uppercase tracking-widest italic">In Process</span>
                </div>
             </template>
          </Column>
       </DataTable>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';

const api = useApi();
const toast = useToast();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('inventory.planning.manage') || true); 

const suggestionsList = ref<any[]>([]);
const search = ref('');
const typeFilter = ref('');
const loading = ref(false);
const runningMrp = ref(false);

const typeOptions = [
   { label: 'Beli (Purchase)', value: 'PURCHASE' },
   { label: 'Produksi (Manufacture)', value: 'MANUFACTURE' }
];

const filteredSuggestions = computed(() => {
  let list = suggestionsList.value;
  if(typeFilter.value) {
     list = list.filter(p => p.suggestionType === typeFilter.value);
  }
  if (search.value) {
    const q = search.value.toLowerCase();
    list = list.filter(p => 
      p.item?.name?.toLowerCase().includes(q) || 
      p.item?.code?.toLowerCase().includes(q)
    );
  }
  return list;
});

const formatQty = (val: any) => {
  if (!val && val !== 0 || isNaN(val)) return '0';
  return Number(val).toLocaleString('id-ID', { maximumFractionDigits: 1 });
};

const formatDate = (iso: string) => {
  if (!iso) return '-';
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};

const isUrgent = (iso: string) => {
   if(!iso) return false;
   const d = new Date(iso);
   const now = new Date();
   now.setDate(now.getDate() + 7);
   return d < now;
}

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/inventory/planning/suggestions');
    if (res.data && res.data.data) {
        suggestionsList.value = res.data.data;
    }
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Load Error', detail: 'Gagal memuat rekomendasi perencanaan.' });
  } finally {
    loading.value = false;
  }
}

async function runMrp() {
    runningMrp.value = true;
    try {
        const res = await api.post('/inventory/planning/run-mrp');
        setTimeout(() => {
           toast.add({ severity: 'success', summary: 'Kalkulasi Berhasil', detail: res.data.message });
           runningMrp.value = false;
           load();
        }, 3000); // UI delay for "intelligence" feel
    } catch (e: any) {
        toast.add({ severity: 'error', summary: 'MRT Error', detail: e.message });
        runningMrp.value = false;
    }
}

async function executeSuggestion(s: any) {
   loading.value = true;
   try {
      const res = await api.post(`/inventory/planning/suggestions/${s.id}/execute`);
      toast.add({ severity: 'success', summary: 'Eksekusi Berhasil', detail: res.data.message });
      await load();
   } catch (e: any) {
      toast.add({ severity: 'error', summary: 'Execution Failure', detail: e.message });
   } finally {
      loading.value = false;
   }
}

onMounted(() => {
  load();
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

:deep(.p-datatable-thead > tr > th) {
  background: transparent !important;
  font-size: 10px !important;
  font-weight: 900 !important;
  text-transform: uppercase !important;
  color: #94a3b8 !important;
  border-bottom: 2px solid #f1f5f9 !important;
  padding: 1.5rem 1rem !important;
  letter-spacing: 0.1em !important;
}

:deep(.p-datatable-tbody > tr > td) {
  padding: 1.25rem 1rem !important;
  border-bottom: 1px solid #f8fafc !important;
}

:deep(.p-select), :deep(.p-inputtext) {
   border-color: #f1f5f9 !important;
   box-shadow: none !important;
   background-color: #f8fafc !important;
}
</style>