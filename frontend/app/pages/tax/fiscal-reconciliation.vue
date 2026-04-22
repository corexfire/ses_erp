<template>
  <div class="p-4 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 overflow-hidden relative p-8 rounded-xl bg-white border border-slate-200 shadow-sm">
      <div class="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-amber-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Kepatuhan PPh Badan</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-amber-600">Rekonsiliasi Fiskal</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2">Rekonsiliasi <span class="text-amber-600">Fiskal</span></h1>
        <p class="text-slate-500 text-sm font-medium">Penyesuaian laba komersial menjadi penghasilan kena pajak untuk pelaporan PPh Badan.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <div class="flex flex-col items-end mr-4">
           <span class="text-[10px] font-black text-slate-400 uppercase">Periode Audit</span>
           <InputText v-model="filterPeriod" placeholder="YYYY-MM" class="p-inputtext-sm border-none bg-transparent font-black w-24 text-right" />
        </div>
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="load" :loading="loading" />
      </div>
    </div>

    <!-- Stats Section -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
       <div v-for="s in stats" :key="s.label" class="group p-4 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <i :class="[s.icon, 'text-6xl']"></i>
          </div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ s.label }}</p>
          <h3 class="text-2xl font-black text-slate-900">{{ s.prefix }} {{ fmtNumber(s.value) }}</h3>
          <div class="flex items-center gap-2 mt-2">
             <span :class="['text-[10px] font-bold px-2 py-0.5 rounded-full', s.color]">{{ s.sub }}</span>
          </div>
       </div>
    </div>

    <!-- Main List Area -->
    <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col">
       <div class="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/10">
          <div>
             <h2 class="text-[13px] font-black text-slate-900 uppercase tracking-widest">Buku Rekonsiliasi</h2>
             <p class="text-xs text-slate-500 font-medium">Daftar penyesuaian laba yang diidentifikasi untuk pelaporan fiskal.</p>
          </div>
       </div>

       <DataTable :value="equalizations" dataKey="id" class="p-datatable-sm w-full" :loading="loading">
          <Column field="period" header="PERIODE" class="pl-8">
             <template #body="{ data }">
                <span class="text-[11px] font-black text-slate-900 tracking-widest uppercase">{{ data.period }}</span>
             </template>
          </Column>
          <Column header="LABA BERSIH KOMERSIAL" class="text-right">
             <template #body="{ data }">
                <span class="text-[11px] font-bold text-slate-700">{{ fmtNumber(data.bookIncome) }}</span>
             </template>
          </Column>
          <Column header="PENGHASILAN KENA PAJAK FISKAL" class="text-right">
             <template #body="{ data }">
                <span class="text-[11px] font-black text-amber-700">{{ fmtNumber(data.fiscalIncome) }}</span>
             </template>
          </Column>
          <Column header="PENYESUAIAN BERSIH" class="text-right">
             <template #body="{ data }">
                <div class="flex flex-col items-end">
                   <span :class="['text-[11px] font-black', Number(data.difference) < 0 ? 'text-emerald-700' : 'text-red-700']">
                      {{ fmtNumber(data.difference) }}
                   </span>
                   <span class="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                      {{ Number(data.difference) > 0 ? 'Koreksi Positif' : (Number(data.difference) < 0 ? 'Koreksi Negatif' : 'Netral') }}
                   </span>
                </div>
             </template>
          </Column>
          <Column header="STATUS">
             <template #body="{ data }">
                <span :class="['px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest', data.status === 'APPROVED' ? 'bg-slate-900 text-white' : 'bg-amber-50 text-amber-700']">
                   {{ data.status }}
                </span>
             </template>
          </Column>
          <Column class="text-right pr-8">
             <template #body="{ data }">
                <Button label="Rincian Audit" icon="pi pi-file-edit" severity="warning" rounded text @click="generateReport(data)" class="text-[10px] font-black uppercase" />
             </template>
          </Column>
       </DataTable>
    </div>

    <!-- P&L Reconciliation Dialog -->
    <Dialog v-model:visible="showDrawer" header="Rincian Koreksi Fiskal" modal class="w-full max-w-2xl overflow-hidden !rounded-xl" :pt="{
       header: { class: 'p-8 border-b border-slate-100' },
       content: { class: '!p-0 max-h-[70vh] overflow-y-auto bg-slate-50' },
       footer: { class: 'p-4 border-t border-slate-100 bg-white' }
    }">
       <div class="flex flex-col h-full bg-slate-50 overflow-hidden" v-if="report">
          <!-- Document Content -->
          <div class="flex-1 p-8">
             <div class="space-y-8">
                <!-- Summary Section -->
                <div class="grid grid-cols-2 gap-4">
                   <div class="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                      <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Laba Komersial</p>
                      <h4 class="text-2xl font-black text-slate-900 tracking-tighter">{{ fmtNumber(report.bookIncome) }}</h4>
                   </div>
                   <div class="p-4 rounded-2xl bg-amber-900 text-white shadow-xl">
                      <p class="text-[10px] font-black text-amber-200/50 uppercase tracking-widest mb-1">Laba Fiskal</p>
                      <h4 class="text-2xl font-black tracking-tighter">{{ fmtNumber(report.fiscalIncome) }}</h4>
                   </div>
                </div>

                <!-- Detail Corrections -->
                <div class="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                   <div class="p-4 border-b border-slate-100 flex items-center justify-between">
                      <h5 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Perincian Koreksi</h5>
                      <span class="px-3 py-1 rounded-full bg-slate-100 text-[9px] font-black text-slate-500">{{ report.adjustments?.length || 0 }} Item</span>
                   </div>
                   <div class="divide-y divide-slate-50">
                      <div v-for="(adj, i) in report.adjustments" :key="i" class="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                         <div class="flex gap-4 items-center">
                            <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-xs', adj.type === 'POSITIVE' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600']">
                               <i :class="adj.type === 'POSITIVE' ? 'pi pi-plus' : 'pi pi-minus'"></i>
                            </div>
                            <div class="flex flex-col">
                               <span class="text-[11px] font-black text-slate-800 uppercase tracking-tight">{{ adj.item }}</span>
                               <span class="text-[9px] font-bold text-slate-400 uppercase">PENYESUAIAN {{ adj.type === 'POSITIVE' ? 'POSITIF' : 'NEGATIF' }}</span>
                            </div>
                         </div>
                         <span :class="['text-[11px] font-black', adj.type === 'POSITIVE' ? 'text-red-700' : 'text-emerald-700']">
                            {{ adj.type === 'POSITIVE' ? '+' : '' }}{{ fmtNumber(adj.amount) }}
                         </span>
                      </div>
                   </div>
                   <div class="p-4 bg-slate-900 text-white flex justify-between items-center">
                      <span class="text-[10px] font-black uppercase tracking-widest">Koreksi Fiskal Bersih</span>
                      <span class="text-xl font-black tracking-tighter">{{ fmtNumber(report.difference) }}</span>
                   </div>
                </div>

                <div class="p-4 rounded-[2rem] bg-indigo-50 border border-indigo-100 flex items-start gap-4">
                   <i class="pi pi-info-circle text-indigo-600 mt-1"></i>
                   <div class="space-y-1">
                      <p class="text-[11px] font-black text-indigo-900 uppercase tracking-widest">Kecerdasan Sistem</p>
                      <p class="text-[10px] text-indigo-700 leading-relaxed font-medium">Rekonsiliasi mencakup analisis dari {{ report.journalSummary }} entri jurnal pada periode berjalan. Semua biaya representasi dan kenikmatan telah disesuaikan secara otomatis sesuai undang-undang perpajakan.</p>
                   </div>
                </div>
             </div>
          </div>
       </div>
       <template #footer>
          <div class="flex gap-3 justify-end w-full">
             <Button label="Tutup Report" severity="secondary" text @click="showDrawer = false" class="text-[10px] font-black uppercase" />
             <Button label="Cetak Report" icon="pi pi-print" class="p-button-rounded font-black text-[10px] uppercase shadow-lg px-8" />
          </div>
       </template>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
const api = useApi();
const toast = useToast();

const loading = ref(false);
const showDrawer = ref(false);
const filterPeriod = ref('');
const equalizations = ref<any[]>([]);
const report = ref<any>(null);

const stats = computed(() => {
  const totalBook = equalizations.value.reduce((s, e) => s + (Number(e.bookIncome) || 0), 0);
  const totalFiscal = equalizations.value.reduce((s, e) => s + (Number(e.fiscalIncome) || 0), 0);
  const totalAdj = totalFiscal - totalBook;
  
  return [
    { label: 'Laba Komersial', value: totalBook, prefix: 'IDR', sub: 'Total Terakumulasi', icon: 'pi pi-chart-bar', color: 'bg-slate-50 text-slate-600' },
    { label: 'Dasar Pajak Fiskal', value: totalFiscal, prefix: 'IDR', sub: 'Total Kena Pajak', icon: 'pi pi-calculator', color: 'bg-amber-50 text-amber-600' },
    { label: 'Koreksi Bersih', value: totalAdj, prefix: 'IDR', sub: 'Penyesuaian Laba Rugi', icon: 'pi pi-sort', color: totalAdj >= 0 ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600' },
    { label: 'Kesiapan PPh Badan', value: equalizations.value.filter(e => e.status === 'APPROVED').length, prefix: '', sub: 'Audit Selesai', icon: 'pi pi-verified', color: 'bg-slate-900 text-white' }
  ];
});

function fmtNumber(v: any) {
  if (!v) return '0';
  return new Intl.NumberFormat('id-ID').format(Math.round(v));
}

async function load() {
  loading.value = true;
  try {
    const params = { period: filterPeriod.value };
    const res = await api.get('/finance/tax/fiscal-reconciliation', { params });
    
    // Robust loading logic
    const data = res?.data || res || {};
    equalizations.value = data.equalizations || [];
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Audit Failure', detail: e.message });
  } finally {
    loading.value = false;
  }
}

async function generateReport(e: any) {
  try {
    const res = await api.post(`/finance/tax/fiscal-reconciliation/${e.id}/generate-report`);
    
    // Robust loading logic
    const data = res?.data || res || {};
    report.value = data.report;
    showDrawer.value = true;
  } catch (err: any) {
    toast.add({ severity: 'error', summary: 'Report Error', detail: err.message });
  }
}

onMounted(load);
watch(filterPeriod, load);
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
  background: rgba(255, 251, 235, 0.4) !important;
}

:deep(.p-datatable-tbody > tr > td) {
  padding: 1.25rem 1rem !important;
  border-bottom: 1px solid #f8fafc !important;
}
</style>