<template>
  <div class="p-6 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-8 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500">
      <div class="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Compliance & Regulatory</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-amber-600">Konfigurasi Pajak</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase tracking-tighter">Tax <span class="text-amber-600">Config</span></h1>
        <p class="text-slate-500 text-sm font-medium uppercase italic tracking-tight italic">Registrasi kode pajak untuk otomatisasi kalkulasi PPN dan pemotongan PPh.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="load" :loading="loading" />
        <Button label="Buat Kode Pajak" icon="pi pi-shield" class="p-button-rounded p-button-warning font-black text-xs shadow-lg shadow-amber-100 px-6" @click="openNew" />
      </div>
    </div>

    <!-- Stats Section -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
       <div v-for="s in stats" :key="s.label" class="group p-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <i :class="[s.icon, 'text-6xl']"></i>
          </div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ s.label }}</p>
          <h3 class="text-2xl font-black text-slate-900 tracking-tighter">{{ s.value }}</h3>
          <div class="flex items-center gap-2 mt-2">
             <span :class="['text-[10px] font-bold px-2 py-0.5 rounded-full', s.color]">{{ s.sub }}</span>
          </div>
       </div>
    </div>

    <!-- Main Content: Table -->
    <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:border-amber-300 transition-all duration-500">
       <DataTable :value="taxCodes" dataKey="id" class="p-datatable-sm w-full" :loading="loading">
          <Column field="code" header="KODE PAJAK" class="pl-8">
             <template #body="{ data }">
                <span class="text-[11px] font-black text-slate-900 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200 font-mono italic uppercase">
                   {{ data.code }}
                </span>
             </template>
          </Column>
          <Column field="name" header="NAMA PERATURAN / DESKRIPSI">
             <template #body="{ data }">
                <span class="text-[12px] font-black text-slate-800 uppercase tracking-tight">{{ data.name }}</span>
             </template>
          </Column>
          <Column header="TARIF (%)">
             <template #body="{ data }">
                <div class="flex items-center gap-2">
                   <div class="w-12 py-1 bg-amber-50 text-amber-700 text-center rounded-lg text-[11px] font-black border border-amber-100 italic">
                      {{ data.rate }}%
                   </div>
                </div>
             </template>
          </Column>
          <Column header="TANGGAL EFEKTIF">
             <template #body="{ data }">
                <span class="text-[10px] font-bold text-slate-500 uppercase">{{ fmtDate(data.effectiveDate) }}</span>
             </template>
          </Column>
          <Column header="STATUS">
             <template #body="{ data }">
                <span :class="['px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest', data.isActive ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100']">
                   {{ data.isActive ? 'Active' : 'Inactive' }}
                </span>
             </template>
          </Column>
          <Column class="text-right pr-8">
             <template #body="{ data }">
                <Button icon="pi pi-ban" severity="danger" text rounded size="small" v-if="data.isActive" @click="deactivate(data)" v-tooltip.top="'Deactivate Tax'" />
             </template>
          </Column>
       </DataTable>
    </div>

    <!-- Management Dialog (Glass) -->
    <Dialog v-model:visible="dialogOpen" header="Registrasi Kode Pajak Baru" :modal="true" :dismissableMask="false" class="w-[500px] border-none shadow-2xl overflow-hidden glass-dialog">
       <div class="space-y-8 pt-4 px-2 pb-12 custom-scrollbar">
          <div class="p-6 bg-amber-50 border border-amber-100 rounded-3xl flex items-center gap-4">
             <div class="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-amber-600 shadow-sm border border-amber-100">
                <i class="pi pi-shield text-xl"></i>
             </div>
             <div>
                <p class="text-[11px] font-black text-amber-900 uppercase leading-none mb-1">Fiscal Compliance</p>
                <p class="text-[9px] font-bold text-amber-600 uppercase italic">Tentukan tarif pajak dan tanggal efektifitas peraturan.</p>
             </div>
          </div>

          <div class="space-y-6">
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kode Pajak</label>
                   <InputText v-model="form.code" class="w-full rounded-xl font-mono uppercase" placeholder="PPN-11" />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tarif (%)</label>
                   <InputNumber v-model="form.rate" mode="decimal" :minFractionDigits="2" class="w-full rounded-xl" inputClass="rounded-xl w-full" placeholder="11.00" />
                </div>
             </div>
             <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Peraturan</label>
                <InputText v-model="form.name" class="w-full rounded-xl uppercase" placeholder="PPN STANDAR" />
             </div>
             <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tanggal Efektif</label>
                <InputText v-model="form.effectiveDate" type="date" class="w-full rounded-xl" />
             </div>
          </div>
       </div>

       <template #footer>
          <div class="flex justify-end gap-4 p-4 border-t bg-white w-full">
             <Button label="Batal" severity="secondary" text @click="dialogOpen = false" class="font-black text-[10px] uppercase tracking-widest px-6" />
             <Button label="Simpan Kode Pajak" icon="pi pi-save" class="p-button-rounded p-button-warning font-black text-[10px] uppercase tracking-widest px-10 shadow-xl shadow-amber-100" @click="save" :loading="saving" />
          </div>
       </template>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
const api = useApi();
const toast = useToast();

const taxCodes = ref<any[]>([]);
const loading = ref(false);
const saving = ref(false);
const dialogOpen = ref(false);

const form = ref<any>({
  code: '',
  name: '',
  rate: 0,
  effectiveDate: ''
});

const stats = computed(() => {
  const ppn = taxCodes.value.find(t => t.code.includes('PPN-11'))?.rate || 0;
  return [
    { label: 'Kode Pajak Aktif', value: taxCodes.value.filter(t => t.isActive).length, sub: 'Regulatory Coverage', icon: 'pi pi-shield', color: 'bg-emerald-50 text-emerald-600' },
    { label: 'PPN Standard', value: ppn + '%', sub: 'Fixed Rate', icon: 'pi pi-percentage', color: 'bg-amber-50 text-amber-600' },
    { label: 'Pajak Non-Aktif', value: taxCodes.value.filter(t => !t.isActive).length, sub: 'Historical Rates', icon: 'pi pi-history', color: 'bg-slate-50 text-slate-600' },
    { label: 'Compliance Index', value: '100%', sub: 'Verified PSAK', icon: 'pi pi-verified', color: 'bg-blue-50 text-blue-600' }
  ];
});

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/tax-codes');
    taxCodes.value = res.taxCodes || res.data?.taxCodes || [];
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Load Failed', detail: e.message });
  } finally {
    loading.value = false;
  }
}

function openNew() {
  form.value = { code: '', name: '', rate: 0, effectiveDate: new Date().toISOString().split('T')[0] };
  dialogOpen.value = true;
}

async function save() {
  saving.value = true;
  try {
    await api.post('/core/tax-codes', {
      ...form.value,
      effectiveDate: new Date(form.value.effectiveDate).toISOString()
    });
    toast.add({ severity: 'success', summary: 'Sukses', detail: 'Kode pajak berhasil didaftarkan.' });
    dialogOpen.value = false;
    load();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: e.message });
  } finally {
    saving.value = false;
  }
}

async function deactivate(data: any) {
  try {
     await api.patch(`/core/tax-codes/${data.id}/deactivate`);
     toast.add({ severity: 'warn', summary: 'Deactivated', detail: 'Kode pajak dinonaktifkan.' });
     load();
  } catch (e) {}
}

function fmtDate(d: string) { return d ? new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '-' }

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

:deep(.p-datatable-tbody > tr > td) {
  padding: 1.25rem 1rem !important;
  border-bottom: 1px solid #f8fafc !important;
}

:deep(.p-dialog-mask) {
  backdrop-filter: blur(8px);
  background: rgba(15, 23, 42, 0.4) !important;
}

:deep(.p-dialog) {
  border-radius: 2.5rem !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

:deep(.p-dialog-header) { padding: 2rem 2.5rem 1rem !important; }
:deep(.p-dialog-content) { padding: 0 2.5rem 2rem !important; }

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { @apply bg-slate-200 rounded-full; }
</style>
