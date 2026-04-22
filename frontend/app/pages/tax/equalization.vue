<template>
  <div class="p-4 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 overflow-hidden relative p-8 rounded-xl bg-white border border-slate-200 shadow-sm">
      <div class="absolute top-0 left-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Audit & Kepatuhan</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-indigo-600">Buku Ekualisasi Pajak</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2">Ekualisasi <span class="text-indigo-600">Omzet</span></h1>
        <p class="text-slate-500 text-sm font-medium">Rekonsiliasi omzet akuntansi (Buku) terhadap pelaporan PPN (Fiskal) untuk mendeteksi varians.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="load" :loading="loading" />
        <Button label="Rekonsiliasi Baru" icon="pi pi-plus-circle" class="p-button-rounded font-black text-xs shadow-lg shadow-indigo-100 p-button-indigo" @click="openNew" />
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
             <h2 class="text-[13px] font-black text-slate-900 uppercase tracking-widest">Log Rekonsiliasi</h2>
             <p class="text-xs text-slate-500 font-medium">Audit historis pencocokan omzet buku vs fiskal.</p>
          </div>
       </div>

       <DataTable :value="equalizations" dataKey="id" class="p-datatable-sm w-full" :loading="loading">
          <Column field="period" header="PERIODE BULANAN" class="pl-8">
             <template #body="{ data }">
                <span class="text-[11px] font-black text-slate-900 tracking-widest uppercase">{{ data.period }}</span>
             </template>
          </Column>
          <Column header="PENDAPATAN (BUKU)" class="text-right">
             <template #body="{ data }">
                <div class="flex flex-col items-end">
                   <span class="text-[11px] font-bold text-slate-700">{{ fmtNumber(data.bookIncome) }}</span>
                   <span class="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">GL / Neraca Saldo</span>
                </div>
             </template>
          </Column>
          <Column header="OMZET (FISKAL)" class="text-right">
             <template #body="{ data }">
                <div class="flex flex-col items-end">
                   <span class="text-[11px] font-bold text-indigo-700">{{ fmtNumber(data.fiscalIncome) }}</span>
                   <span class="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Pelaporan PPN Keluaran</span>
                </div>
             </template>
          </Column>
          <Column header="VARIANS / SELISIH" class="text-right">
             <template #body="{ data }">
                <div class="flex flex-col items-end">
                   <span :class="['text-[11px] font-black', Number(data.difference) < 0 ? 'text-red-700' : (Number(data.difference) > 0 ? 'text-amber-700' : 'text-emerald-700')]">
                      {{ fmtNumber(data.difference) }}
                   </span>
                   <span class="text-[9px] font-bold text-slate-400 tracking-tighter">{{ getVarianceNote(data) }}</span>
                </div>
             </template>
          </Column>
          <Column header="STATUS">
             <template #body="{ data }">
                <span :class="['px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest', getStatusClass(data)]">
                   {{ data.status }}
                </span>
             </template>
          </Column>
          <Column class="text-right pr-8">
             <template #body="{ data }">
                <div class="flex gap-2 justify-end">
                   <Button v-if="data.status === 'DRAFT'" label="Audit Selesai" severity="success" rounded text class="text-[9px] font-black uppercase tracking-widest" @click="approve(data)" />
                </div>
             </template>
          </Column>
       </DataTable>
    </div>

    <!-- New Equalization Dialog -->
    <Dialog v-model:visible="drawerOpen" header="Inisialisasi Perhitungan Ekualisasi" modal class="w-full max-w-2xl overflow-hidden !rounded-xl" :pt="{
       header: { class: 'p-8 border-b border-slate-100' },
       content: { class: 'p-8 pb-10 max-h-[70vh] overflow-y-auto' },
       footer: { class: 'p-8 border-t border-slate-100 bg-slate-50/50' }
    }">
       <div class="space-y-8">
          <div class="p-4 rounded-[2rem] bg-indigo-50 border border-indigo-100 flex items-start gap-4">
             <i class="pi pi-info-circle text-indigo-600 mt-1"></i>
             <div class="space-y-1">
                <p class="text-[11px] font-black text-indigo-900 uppercase tracking-widest">Instruksi Audit</p>
                <p class="text-[10px] text-indigo-700 leading-relaxed font-medium">Input ringkasan omzet dari buku besar Anda dan bandingkan dengan total PPN Keluaran yang dilaporkan di Portal Web DJP.</p>
             </div>
          </div>

          <div class="space-y-4">
             <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-black">1</div>
                <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Periode & Deskripsi</h4>
             </div>
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Periode Audit</label>
                   <InputText v-model="form.period" class="w-full !rounded-2xl !p-3 border-slate-200" placeholder="YYYY-MM" />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Referensi Perhitungan</label>
                   <InputText v-model="form.description" class="w-full !rounded-2xl !p-3 border-slate-200" placeholder="Misal: Penutupan Bulanan" />
                </div>
             </div>
          </div>

          <div class="space-y-6 p-8 rounded-[2rem] bg-slate-50 border border-slate-100">
             <div class="flex items-center gap-3 mb-2">
                <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-black">2</div>
                <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Perbandingan Penghasilan</h4>
             </div>
             
             <div class="space-y-6">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2 font-bold">Omzet per Buku (Akuntansi)</label>
                   <InputNumber v-model="form.bookIncome" mode="currency" currency="IDR" locale="id-ID" class="w-full" pt:input:class="!rounded-2xl !p-4 border-none bg-white font-black text-lg shadow-sm" />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2 font-bold">Omzet per Fiskal (Laporan Pajak)</label>
                   <InputNumber v-model="form.fiscalIncome" mode="currency" currency="IDR" locale="id-ID" class="w-full" pt:input:class="!rounded-2xl !p-4 border-none bg-white font-black text-lg shadow-sm" />
                </div>
                
                <div class="pt-6 border-t border-slate-200 flex justify-between items-center px-2">
                   <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Varians Terhitung</p>
                   <p :class="['text-2xl font-black tracking-tighter', (form.fiscalIncome - form.bookIncome) < 0 ? 'text-red-600' : 'text-emerald-600']">
                      IDR {{ fmtNumber(form.fiscalIncome - form.bookIncome) }}
                   </p>
                </div>
             </div>
          </div>
       </div>

       <template #footer>
          <div class="flex gap-3 justify-end w-full">
             <Button label="Batalkan" severity="secondary" text @click="drawerOpen = false" class="text-[10px] font-black uppercase" />
             <Button label="Catat Ekualisasi" icon="pi pi-shield" class="p-button-rounded font-black text-[10px] uppercase shadow-lg shadow-indigo-100 p-button-indigo px-8" @click="save" :loading="saving" />
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
const saving = ref(false);
const drawerOpen = ref(false);
const equalizations = ref<any[]>([]);

const form = ref({ 
  period: new Date().toISOString().slice(0, 7), 
  bookIncome: 0, 
  fiscalIncome: 0, 
  description: '' 
});

const stats = computed(() => {
  const totalBook = equalizations.value.reduce((s, e) => s + (Number(e.bookIncome) || 0), 0);
  const totalFiscal = equalizations.value.reduce((s, e) => s + (Number(e.fiscalIncome) || 0), 0);
  const totalVar = totalFiscal - totalBook;
  
  return [
    { label: 'Total Pendapatan (Buku)', value: totalBook, prefix: 'IDR', sub: 'Dasar Akuntansi', icon: 'pi pi-book', color: 'bg-slate-50 text-slate-600' },
    { label: 'Total Omzet (Pajak)', value: totalFiscal, prefix: 'IDR', sub: 'Dasar Pelaporan', icon: 'pi pi-file-export', color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Varians Komulatif', value: totalVar, prefix: 'IDR', sub: 'Selisih Bersih', icon: 'pi pi-percentage', color: totalVar === 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600' },
    { label: 'Kepatuhan Audit', value: equalizations.value.filter(e => e.status === 'APPROVED').length, prefix: '', sub: 'Rekonsiliasi Selesai', icon: 'pi pi-shield', color: 'bg-slate-900 text-white' }
  ];
});

function fmtNumber(v: any) {
  if (!v) return '0';
  return new Intl.NumberFormat('id-ID').format(Math.round(v));
}

function getStatusClass(e: any) {
  if (e.status === 'APPROVED') return 'bg-slate-900 text-white';
  if (Number(e.difference) !== 0) return 'bg-red-50 text-red-700 font-black ring-2 ring-red-100 ring-offset-2';
  return 'bg-amber-50 text-amber-700';
}

function getVarianceNote(e: any) {
  const diff = Number(e.difference) || 0;
  if (diff === 0) return 'MATCHED';
  if (diff < 0) return 'DEFICIT';
  return 'OVERAGE';
}

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/finance/tax/equalization');
    
    // Robust loading logic
    const data = res?.data || res || {};
    equalizations.value = data.equalizations || [];
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Audit Failure', detail: e.message });
  } finally {
    loading.value = false;
  }
}

function openNew() {
  form.value = { 
    period: new Date().toISOString().slice(0, 7), 
    bookIncome: 0, 
    fiscalIncome: 0, 
    description: '' 
  };
  drawerOpen.value = true;
}

async function save() {
  saving.value = true;
  try {
    await api.post('/finance/tax/equalization', form.value);
    toast.add({ severity: 'success', summary: 'Equalization Recorded', detail: 'New audit record has been initialized.' });
    drawerOpen.value = false;
    load();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Calculation Error', detail: e.message });
  } finally {
    saving.value = false;
  }
}

async function approve(e: any) {
  try {
    await api.post(`/finance/tax/equalization/${e.id}/approve`);
    toast.add({ severity: 'success', summary: 'Audit Approved', detail: 'Reconciliation has been closed.' });
    load();
  } catch (err: any) {
    toast.add({ severity: 'error', summary: 'Action Error', detail: err.message });
  }
}

onMounted(load);
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
  background: rgba(238, 242, 255, 0.4) !important;
}

:deep(.p-datatable-tbody > tr > td) {
  padding: 1.25rem 1rem !important;
  border-bottom: 1px solid #f8fafc !important;
}

:deep(.p-button-indigo) {
  background: #4f46e5 !important;
  border: none !important;
  color: white !important;
}
</style>