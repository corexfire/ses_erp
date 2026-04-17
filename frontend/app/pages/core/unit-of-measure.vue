<template>
  <div class="p-6 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-8 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500">
      <div class="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-emerald-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Inventory Standards</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-emerald-600">Satuan Ukur (UOM)</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase tracking-tighter">Unit Of <span class="text-emerald-600">Measure</span></h1>
        <p class="text-slate-500 text-sm font-medium uppercase italic tracking-tight italic">Standarisasi satuan hitung, berat, dan volume beserta aturan konversi antar satuan.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="load" :loading="loading" />
        <Button label="Registrasi UOM" icon="pi pi-plus" class="p-button-rounded p-button-success font-black text-xs shadow-lg shadow-emerald-100 px-6" @click="openNewUom" />
      </div>
    </div>

    <!-- Stats Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
       <div v-for="s in stats" :key="s.label" class="group p-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <i :class="[s.icon, 'text-6xl']"></i>
          </div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ s.label }}</p>
          <h3 class="text-2xl font-black text-slate-900 uppercase tracking-tighter">{{ s.value }}</h3>
          <div class="flex items-center gap-2 mt-2">
             <span :class="['text-[10px] font-bold px-2 py-0.5 rounded-full', s.color]">{{ s.sub }}</span>
          </div>
       </div>
    </div>

    <!-- Main Content with Tabs -->
    <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:border-emerald-300 transition-all duration-500">
       <div class="p-2 border-b border-slate-100 bg-slate-50/10">
          <Tabs v-model:value="activeTab">
            <TabList class="bg-transparent border-none px-6 pt-4">
              <Tab value="master" class="text-[11px] font-black uppercase tracking-widest mr-4 pb-4">Daftar Satuan (Master)</Tab>
              <Tab value="conversions" class="text-[11px] font-black uppercase tracking-widest pb-4">Aturan Konversi</Tab>
            </TabList>
          </Tabs>
       </div>

       <div class="p-0">
          <!-- VIEW: MASTER UOM LIST -->
          <template v-if="activeTab === 'master'">
             <DataTable :value="uoms" dataKey="id" class="p-datatable-sm w-full" :loading="loading">
                <Column field="code" header="CODE" class="pl-8">
                   <template #body="{ data }">
                      <span class="text-[11px] font-black text-slate-900 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100 font-mono italic">
                         {{ data.code }}
                      </span>
                   </template>
                </Column>
                <Column header="NAMA SATUAN">
                   <template #body="{ data }">
                      <span class="text-[12px] font-black text-slate-800 uppercase tracking-tight">{{ data.name }}</span>
                   </template>
                </Column>
                <Column header="STATUS">
                   <template #body="{ data }">
                      <span :class="['px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest', data.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400']">
                         {{ data.isActive ? 'Active' : 'Disabled' }}
                      </span>
                   </template>
                </Column>
                <Column class="text-right pr-8">
                   <template #body="{ data }">
                      <div class="flex gap-2 justify-end">
                         <Button icon="pi pi-ban" severity="danger" text rounded size="small" v-if="data.isActive" @click="deactivateUom(data)" />
                      </div>
                   </template>
                </Column>
             </DataTable>
          </template>

          <!-- VIEW: CONVERSION RULES -->
          <template v-else>
             <div class="p-8 border-b border-slate-50 flex items-center justify-between">
                <div>
                   <h3 class="text-[12px] font-black text-slate-900 uppercase tracking-widest leading-none mb-1">Daftar Scaling Factor</h3>
                   <p class="text-[10px] text-slate-400 font-bold uppercase italic tracking-tight">Menghitung rasio antar satuan untuk modul stock.</p>
                </div>
                <Button label="Aturan Baru" icon="pi pi-plus" size="small" outlined severity="success" class="rounded-xl font-black text-[10px] px-6" @click="openNewConversion" />
             </div>
             <DataTable :value="conversions" dataKey="id" class="p-datatable-sm w-full" :loading="loading">
                <Column header="FROM UNIT" class="pl-8">
                   <template #body="{ data }">
                      <div class="flex items-center gap-2">
                         <span class="text-[11px] font-black text-slate-900 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200 font-mono italic">{{ data.fromUom?.code }}</span>
                      </div>
                   </template>
                </Column>
                <Column header="CONVERSION FACTOR" class="text-center">
                   <template #body="{ data }">
                      <div class="flex items-center justify-center gap-3">
                         <i class="pi pi-arrow-right text-[10px] text-emerald-400"></i>
                         <span class="text-[13px] font-black text-slate-900 italic">x {{ data.factor }}</span>
                         <i class="pi pi-arrow-right text-[10px] text-emerald-400"></i>
                      </div>
                   </template>
                </Column>
                <Column header="TO UNIT">
                   <template #body="{ data }">
                      <span class="text-[11px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100 font-mono italic">{{ data.toUom?.code }}</span>
                   </template>
                </Column>
                <Column class="text-right pr-8">
                   <template #body="{ data }">
                      <Button icon="pi pi-trash" severity="danger" text rounded size="small" @click="deleteConversion(data)" />
                   </template>
                </Column>
             </DataTable>
          </template>
       </div>
    </div>

    <!-- UOM Entry Dialog -->
    <Dialog v-model:visible="uomDrawerOpen" header="Registrasi Satuan Baru" :modal="true" :dismissableMask="false" class="w-[500px] border-none shadow-2xl overflow-hidden glass-dialog">
       <div class="space-y-8 pt-4 px-2 pb-12 custom-scrollbar">
          <div class="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl flex items-center gap-4">
             <div class="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100">
                <i class="pi pi-box text-xl"></i>
             </div>
             <div>
                <p class="text-[11px] font-black text-emerald-900 uppercase leading-none mb-1">UOM Registry</p>
                <p class="text-[9px] font-bold text-emerald-600 uppercase italic">Tambahkan satuan ukur dasar untuk katalog barang.</p>
             </div>
          </div>

          <div class="space-y-6">
             <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kode Satuan (UOM Code)</label>
                <InputText v-model="uomForm.code" class="w-full rounded-2xl border-slate-200 font-mono uppercase" placeholder="PCS / BOX / KG" />
             </div>
             <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Satuan Lengkap</label>
                <InputText v-model="uomForm.name" class="w-full rounded-2xl border-slate-200" placeholder="Contoh: Pieces / Kotak / Kilogram" />
             </div>
          </div>
       </div>
       <template #footer>
          <div class="flex justify-end gap-4 p-4 border-t bg-white w-full">
             <Button label="Batal" severity="secondary" text @click="uomDrawerOpen = false" class="font-black text-[10px] uppercase tracking-widest px-6" />
             <Button label="Simpan Satuan" icon="pi pi-save" class="p-button-rounded p-button-success font-black text-[10px] uppercase tracking-widest px-10 shadow-xl shadow-emerald-100" @click="saveUom" :loading="saving" />
          </div>
       </template>
    </Dialog>

    <!-- Conversion Entry Dialog -->
    <Dialog v-model:visible="convDrawerOpen" header="Setup Aturan Konversi" :modal="true" :dismissableMask="false" class="w-[540px] border-none shadow-2xl overflow-hidden glass-dialog">
       <div class="space-y-8 pt-4 px-2 pb-12 custom-scrollbar">
          <div class="p-8 bg-slate-900 rounded-xl text-white space-y-4">
             <p class="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Formula Kalkulasi Stock</p>
             <div class="flex items-center justify-between gap-4 py-4">
                <div class="flex-1 flex flex-col items-center">
                   <span class="text-[10px] font-black text-slate-500 mb-2 uppercase">Input</span>
                   <div class="w-full h-12 rounded-xl bg-white/5 flex items-center justify-center font-black text-lg border border-white/10 uppercase">
                      {{ uoms.find(u => u.id === convForm.fromUomId)?.code || '???' }}
                   </div>
                </div>
                <div class="pt-6">
                   <i class="pi pi-times text-emerald-400"></i>
                </div>
                <div class="flex-1 flex flex-col items-center">
                   <span class="text-[10px] font-black text-slate-500 mb-2 uppercase">Factor Ratio</span>
                   <InputNumber v-model="convForm.factor" class="p-inputtext-dark w-full h-12 font-black text-xl text-center" />
                </div>
                <div class="pt-6">
                   <i class="pi pi-arrow-right text-emerald-400"></i>
                </div>
                <div class="flex-1 flex flex-col items-center">
                   <span class="text-[10px] font-black text-slate-500 mb-2 uppercase">Base</span>
                   <div class="w-full h-12 rounded-xl bg-white/5 flex items-center justify-center font-black text-lg border border-white/10 uppercase italic text-emerald-400">
                      {{ uoms.find(u => u.id === convForm.toUomId)?.code || '???' }}
                   </div>
                </div>
             </div>
             <p class="text-[9px] font-bold text-slate-500 uppercase tracking-tighter italic text-center">Contoh: 1 BOX x 12 = PCS</p>
          </div>

          <div class="space-y-6">
             <div class="grid grid-cols-2 gap-6">
                <div class="space-y-2">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dari Satuan (Source)</label>
                   <Select v-model="convForm.fromUomId" :options="uoms" optionLabel="name" optionValue="id" class="w-full rounded-2xl border-slate-200" placeholder="Pilih..." />
                </div>
                <div class="space-y-2">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ke Satuan (Target)</label>
                   <Select v-model="convForm.toUomId" :options="uoms" optionLabel="name" optionValue="id" class="w-full rounded-2xl border-slate-200" placeholder="Pilih..." />
                </div>
             </div>
          </div>
       </div>
       <template #footer>
          <div class="flex justify-end gap-4 p-4 border-t bg-white w-full">
             <Button label="Batal" severity="secondary" text @click="convDrawerOpen = false" class="font-black text-[10px] uppercase tracking-widest px-6" />
             <Button label="Simpan Aturan" icon="pi pi-check-circle" class="p-button-rounded p-button-success font-black text-[10px] uppercase tracking-widest px-10 shadow-xl shadow-emerald-100" @click="saveConversion" :loading="saving" />
          </div>
       </template>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
const api = useApi();
const toast = useToast();

const activeTab = ref('master');
const uoms = ref<any[]>([]);
const conversions = ref<any[]>([]);
const loading = ref(false);
const saving = ref(false);
const uomDrawerOpen = ref(false);
const convDrawerOpen = ref(false);

const uomForm = ref<any>({ code: '', name: '' });
const convForm = ref<any>({ fromUomId: '', toUomId: '', factor: 1 });

const stats = computed(() => [
  { label: 'Total Unit Aktif', value: uoms.value.filter(u => u.isActive).length, sub: 'Global Scale', icon: 'pi pi-box', color: 'bg-emerald-50 text-emerald-600' },
  { label: 'Aturan Konversi', value: conversions.value.length, sub: 'Scaling Factors', icon: 'pi pi-refresh', color: 'bg-blue-50 text-blue-600' },
  { label: 'Master Registry', value: uoms.value.length, sub: 'Database Status', icon: 'pi pi-database', color: 'bg-indigo-50 text-indigo-600' }
]);

async function load() {
  loading.value = true;
  try {
    const [uRes, cRes] = await Promise.all([
      api.get('/core/uoms'),
      api.get('/core/uoms/conversions')
    ]);
    uoms.value = uRes.uoms || uRes.data?.uoms || [];
    conversions.value = cRes.conversions || cRes.data?.conversions || [];
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Load Failed', detail: e.message });
  } finally {
    loading.value = false;
  }
}

function openNewUom() {
  uomForm.value = { code: '', name: '' };
  uomDrawerOpen.value = true;
}

function openNewConversion() {
  convForm.value = { fromUomId: '', toUomId: '', factor: 1 };
  convDrawerOpen.value = true;
}

async function saveUom() {
  saving.value = true;
  try {
    await api.post('/core/uoms', uomForm.value);
    toast.add({ severity: 'success', summary: 'Sukses', detail: 'Satuan baru berhasil didaftarkan.' });
    uomDrawerOpen.value = false;
    load();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: e.message });
  } finally {
    saving.value = false;
  }
}

async function saveConversion() {
  saving.value = true;
  try {
    await api.post('/core/uoms/conversions', convForm.value);
    toast.add({ severity: 'success', summary: 'Sukses', detail: 'Aturan konversi berhasil dikonfigurasi.' });
    convDrawerOpen.value = false;
    load();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: e.message });
  } finally {
    saving.value = false;
  }
}

async function deactivateUom(uom: any) {
  try {
    await api.patch(`/core/uoms/${uom.id}/deactivate`);
    toast.add({ severity: 'warn', summary: 'Disabled', detail: 'Satuan dinonaktifkan.' });
    load();
  } catch (e) {}
}

async function deleteConversion(conv: any) {
  try {
    await api.patch(`/core/uoms/conversions/${conv.id}/delete`);
    toast.add({ severity: 'error', summary: 'Deleted', detail: 'Aturan konversi dihapus.' });
    load();
  } catch (e) {}
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

:deep(.p-datatable-tbody > tr > td) {
  padding: 1.25rem 1rem !important;
  border-bottom: 1px solid #f8fafc !important;
}

:deep(.p-inputtext-dark) {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: white !important;
  border-radius: 1rem !important;
}

:deep(.p-dialog-mask) {
  backdrop-filter: blur(8px);
  background: rgba(15, 23, 42, 0.4) !important;
}

:deep(.p-dialog) {
  border-radius: 2.5rem !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

:deep(.p-dialog-header) {
  padding: 2rem 2.5rem 1rem !important;
}

:deep(.p-dialog-content) {
  padding: 0 2.5rem 2rem !important;
}

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { @apply bg-slate-200 rounded-full; }
</style>
