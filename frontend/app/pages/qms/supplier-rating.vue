<template>
  <div class="p-6 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section (Premium Style) -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-8 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500 hover:shadow-xl">
      <div class="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Vendor Management</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-slate-900">Supplier Performance Index</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2">Peringkat <span class="text-indigo-600">Pemasok</span></h1>
        <p class="text-slate-500 text-sm font-medium">Analisis kepatuhan dan kualitas vendor berdasarkan integrasi data QC & NCR.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <div class="flex flex-col items-end mr-4">
           <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Periode Rating</span>
           <select v-model="filters.period" class="bg-transparent text-right font-black text-slate-900 border-none outline-none appearance-none cursor-pointer">
              <option value="2024-Q1">2024 - Kuartal 1</option>
              <option value="2024-Q2">2024 - Kuartal 2</option>
           </select>
        </div>
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="loadRatings" :loading="loading" />
        <Button label="Hitung Skor Ulang" icon="pi pi-sync" class="p-button-rounded font-black text-xs shadow-lg shadow-indigo-100 bg-indigo-600 border-none text-white px-6" @click="recalculate" :loading="calculating" />
      </div>
    </div>

    <!-- Rating Leaderboard Top 3 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
       <div v-for="(r, idx) in ratings.slice(0, 3)" :key="r.id" class="relative group">
          <div :class="['absolute -top-4 -left-4 w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black shadow-xl z-20', idx === 0 ? 'bg-amber-400 text-amber-900' : (idx === 1 ? 'bg-slate-300 text-slate-700' : 'bg-orange-400 text-orange-900')]">
             {{ idx + 1 }}
          </div>
          <div class="p-8 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2 relative overflow-hidden">
             <div class="absolute -right-10 -bottom-10 opacity-5 group-hover:scale-125 transition-transform duration-700">
                <i class="pi pi-shield text-[180px] text-slate-900"></i>
             </div>
             <div class="relative z-10 flex flex-col items-center text-center">
                <div class="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center text-2xl font-black text-slate-300 mb-4 border border-slate-100">
                   {{ r.supplier?.name?.[0] }}
                </div>
                <h3 class="text-lg font-black text-slate-900 mb-1 truncate w-full">{{ r.supplier?.name }}</h3>
                <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <i class="pi pi-tag text-[8px]"></i> {{ r.supplier?.code }}
                </span>
                
                <div class="mt-6 flex flex-col items-center">
                   <div :class="['text-5xl font-black mb-2', getGradeColor(r.grade)]">{{ r.grade }}</div>
                   <div class="h-1.5 w-32 bg-slate-100 rounded-full overflow-hidden flex">
                      <div :class="['h-full transition-all duration-1000', getBgColor(r.grade)]" :style="{ width: r.totalScore + '%' }"></div>
                   </div>
                   <span class="text-[10px] font-black text-slate-500 mt-2 uppercase tracking-widest">Total Skor: {{ Math.round(r.totalScore) }} / 100</span>
                </div>
             </div>
          </div>
       </div>
    </div>

    <!-- Details Table -->
    <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col pt-4">
       <div class="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/10">
          <div>
             <h2 class="text-[13px] font-black text-slate-900 uppercase tracking-widest">Detail Performa Pemasok</h2>
             <p class="text-xs text-slate-500 font-medium">Berdasarkan metrik kualitas, waktu pengiriman, dan insiden non-konformitas.</p>
          </div>
       </div>

       <DataTable :value="ratings" dataKey="id" class="p-datatable-sm w-full" :loading="loading">
          <Column header="PEMASOK" class="pl-8">
             <template #body="{ data }">
                <div class="flex items-center gap-3 py-2">
                   <div class="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400">
                      {{ data.supplier?.name?.[0] }}
                   </div>
                   <div class="flex flex-col">
                      <span class="text-[11px] font-black text-slate-800">{{ data.supplier?.name }}</span>
                      <span class="text-[9px] font-bold text-slate-400 font-mono">{{ data.supplier?.code }}</span>
                   </div>
                </div>
             </template>
          </Column>
          <Column header="KUALITAS (QC)" class="text-center">
             <template #body="{ data }">
                <div class="flex flex-col items-center gap-1">
                   <span class="text-[11px] font-black text-slate-800">{{ Math.round(data.qualityScore) }}%</span>
                   <div class="w-16 h-1 bg-emerald-50 rounded-full">
                      <div class="h-full bg-emerald-500 rounded-full" :style="{ width: data.qualityScore + '%' }"></div>
                   </div>
                </div>
             </template>
          </Column>
          <Column header="KETEPATAN WAKTU" class="text-center">
             <template #body="{ data }">
                <div class="flex flex-col items-center gap-1">
                   <span class="text-[11px] font-black text-slate-800">{{ Math.round(data.deliveryScore) }}%</span>
                   <div class="w-16 h-1 bg-blue-50 rounded-full">
                      <div class="h-full bg-blue-500 rounded-full" :style="{ width: data.deliveryScore + '%' }"></div>
                   </div>
                </div>
             </template>
          </Column>
          <Column header="SKOR NCR" class="text-center">
             <template #body="{ data }">
                <div class="flex flex-col items-center gap-1">
                   <span :class="['text-[11px] font-black', data.ncrScore < 80 ? 'text-rose-600' : 'text-slate-800']">{{ Math.round(data.ncrScore) }}</span>
                   <div class="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div :class="['h-full bg-slate-400 rounded-full', data.ncrScore < 80 ? 'bg-rose-500' : '']" :style="{ width: data.ncrScore + '%' }"></div>
                   </div>
                </div>
             </template>
          </Column>
          <Column header="GRADE" class="text-center w-32">
             <template #body="{ data }">
                <span :class="['px-4 py-1.5 rounded-xl text-[11px] font-black border', getGradeClass(data.grade)]">
                   GRADE {{ data.grade }}
                </span>
             </template>
          </Column>
          <Column class="text-right pr-8">
             <template #body="{ data }">
                <Button icon="pi pi-chart-bar" severity="secondary" rounded text @click="openDetails(data)" />
             </template>
          </Column>
       </DataTable>
    </div>

    <!-- Details Overlay (Analytics) -->
    <Dialog v-model:visible="drawerVisible" modal class="w-[500px]" :pt="{ mask: { class: 'backdrop-blur-sm bg-black/20' }, content: { class: 'p-0 rounded-xl overflow-hidden' }, header: { class: 'hidden' } }">
       <div class="flex items-center justify-between p-8 border-b border-slate-100 bg-white">
          <div class="flex items-center gap-4">
             <div class="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl">
                <i class="pi pi-chart-bar text-xl"></i>
             </div>
             <div>
                <h4 class="text-xl font-black text-slate-900 leading-tight">{{ activeRating?.supplier?.name }}</h4>
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dimension Analytics: {{ activeRating?.period }}</p>
             </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="drawerVisible = false" />
       </div>

       <div class="p-8 space-y-8 max-h-[70vh] overflow-y-auto bg-slate-50/30">
          <div class="p-8 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col items-center relative overflow-hidden">
             <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 relative z-10">Distribusi Parameter Performa</div>
             <div class="w-full aspect-square bg-slate-50/50 rounded-xl border border-slate-100 shadow-inner flex items-center justify-center relative z-10">
                <!-- RADAR CHART PLACEHOLDER / VISUALIZATION -->
                <div class="relative w-48 h-48 border-[20px] border-indigo-50 rounded-full flex items-center justify-center shadow-xl bg-white">
                   <div class="absolute inset-0 border-[10px] border-emerald-50 rounded-full opacity-50 scale-75"></div>
                   <div class="text-4xl font-black text-slate-900">{{ Math.round(activeRating?.totalScore) }}</div>
                </div>
             </div>
          </div>

          <div class="space-y-4">
             <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-[10px] font-black shadow-lg">!</div>
                <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Catatan Auditor Mutu</h4>
             </div>
             <div class="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm">
                <p class="text-xs font-bold text-slate-500 leading-relaxed italic">
                   "{{ activeRating?.notes || 'Tidak ada catatan khusus untuk periode ini. Pertahankan standar operasional yang ada.' }}"
                </p>
             </div>
          </div>
       </div>

       <div class="p-8 border-t border-slate-100 bg-white flex justify-end gap-3 rounded-b-[2.5rem]">
          <Button label="Kembali ke Daftar" severity="secondary" text @click="drawerVisible = false" class="font-black text-[10px] uppercase w-full bg-slate-50 hover:bg-slate-100 p-4 rounded-2xl" />
       </div>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import { useApi } from '@/composables/useApi';

const api = useApi();
const toast = useToast();

const loading = ref(false);
const calculating = ref(false);
const drawerVisible = ref(false);
const ratings = ref<any[]>([]);
const activeRating = ref<any>(null);

const filters = reactive({
  period: '2024-Q1'
});

async function loadRatings() {
  loading.value = true;
  try {
    const res = await api.get('/qms/supplier-rating', { params: filters });
    ratings.value = res.data.list;
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal Memuat', detail: e.message });
  } finally {
    loading.value = false;
  }
}

async function recalculate() {
  calculating.value = true;
  try {
    await api.post('/qms/supplier-rating/calculate', { period: filters.period });
    toast.add({ severity: 'success', summary: 'Kalkulasi Selesai', detail: 'Rating supplier telah diperbarui berdasarkan data terbaru.' });
    loadRatings();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal Kalkulasi', detail: e.message });
  } finally {
    calculating.value = false;
  }
}

function openDetails(r: any) {
  activeRating.value = r;
  drawerVisible.value = true;
}

const getGradeColor = (g: string) => {
  if (g === 'A') return 'text-emerald-500';
  if (g === 'B') return 'text-indigo-500';
  if (g === 'C') return 'text-amber-500';
  return 'text-rose-500';
};

const getBgColor = (g: string) => {
  if (g === 'A') return 'bg-emerald-500';
  if (g === 'B') return 'bg-indigo-500';
  if (g === 'C') return 'bg-amber-500';
  return 'bg-rose-500';
};

const getGradeClass = (g: string) => {
  if (g === 'A') return 'bg-emerald-50 border-emerald-100 text-emerald-700';
  if (g === 'B') return 'bg-indigo-50 border-indigo-100 text-indigo-700';
  if (g === 'C') return 'bg-amber-50 border-amber-100 text-amber-700';
  return 'bg-rose-50 border-rose-100 text-rose-700';
};

onMounted(loadRatings);
watch(() => filters.period, loadRatings);
</script>

<style scoped>
:deep(.p-datatable-thead > tr > th) {
  background: transparent !important;
  font-size: 10px !important;
  font-weight: 900 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.1em !important;
  color: #94a3b8 !important;
  border-bottom: 2px solid #f1f5f9 !important;
  padding: 1.5rem 1rem !important;
}

:deep(.p-datatable-tbody > tr) {
  background: transparent !important;
  transition: all 0.2s ease;
}

:deep(.p-datatable-tbody > tr:hover) {
  background: rgba(248, 250, 252, 1) !important;
}

:deep(.p-datatable-tbody > tr > td) {
  padding: 1.25rem 1rem !important;
  border-bottom: 1px solid #f8fafc !important;
}
</style>
