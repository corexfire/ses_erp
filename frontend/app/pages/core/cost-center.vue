<template>
  <div class="p-6 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-8 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500">
      <div class="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Responsibility Accounting</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-slate-600">Unit Organisasi</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase tracking-tighter">Responsibility <span class="text-slate-500">Centers</span></h1>
        <p class="text-slate-500 text-sm font-medium uppercase italic tracking-tight italic">Manajemen pusat biaya (Cost) dan pusat laba (Profit) untuk akuntabilitas finansial.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="loadAll" :loading="loading" />
        <Button :label="activeTab === 'cost' ? 'Registrasi Pusat Biaya' : 'Registrasi Pusat Laba'" :icon="activeTab === 'cost' ? 'pi pi-calculator' : 'pi pi-chart-line'" class="p-button-rounded p-button-secondary font-black text-xs shadow-lg shadow-slate-100 px-6" @click="openNew" />
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

    <!-- Main Content Tabs -->
    <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:border-slate-300 transition-all duration-500">
       <Tabs v-model:value="activeTab">
          <TabList class="px-8 pt-4 border-b border-slate-100">
             <Tab value="cost" class="flex items-center gap-2 group/tab">
                <i class="pi pi-calculator group-aria-selected/tab:text-slate-900 text-slate-400"></i>
                <span class="text-[11px] font-black uppercase tracking-widest group-aria-selected/tab:text-slate-900 text-slate-400">Pusat Biaya (Cost Center)</span>
             </Tab>
             <Tab value="profit" class="flex items-center gap-2 group/tab">
                <i class="pi pi-chart-line group-aria-selected/tab:text-slate-900 text-slate-400"></i>
                <span class="text-[11px] font-black uppercase tracking-widest group-aria-selected/tab:text-slate-900 text-slate-400">Pusat Laba (Profit Center)</span>
             </Tab>
          </TabList>

          <TabPanels>
             <!-- Tab: Cost Centers -->
             <TabPanel value="cost">
                <DataTable :value="costCenters" dataKey="id" class="p-datatable-sm w-full" :loading="loading">
                   <Column field="code" header="KODE CENTER" class="pl-8">
                      <template #body="{ data }">
                         <span class="text-[11px] font-black text-slate-900 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200 font-mono italic uppercase">
                            {{ data.code }}
                         </span>
                      </template>
                   </Column>
                   <Column field="name" header="NAMA UNIT / DEPARTEMEN">
                      <template #body="{ data }">
                         <span class="text-[12px] font-black text-slate-800 uppercase tracking-tight">{{ data.name }}</span>
                      </template>
                   </Column>
                   <Column header="STATUS">
                      <template #body="{ data }">
                         <span :class="['px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest', data.isActive ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100']">
                            {{ data.isActive ? 'Active' : 'Deactivated' }}
                         </span>
                      </template>
                   </Column>
                   <Column class="text-right pr-8">
                      <template #body="{ data }">
                         <Button icon="pi pi-ban" severity="danger" text rounded size="small" v-if="data.isActive" @click="deactivateCenter(data, 'cost')" v-tooltip.top="'Deactivate Center'" />
                      </template>
                   </Column>
                </DataTable>
             </TabPanel>

             <!-- Tab: Profit Centers -->
             <TabPanel value="profit">
                <DataTable :value="profitCenters" dataKey="id" class="p-datatable-sm w-full" :loading="loading">
                   <Column field="code" header="KODE PROFIT" class="pl-8">
                      <template #body="{ data }">
                         <span class="text-[11px] font-black text-indigo-900 bg-indigo-50 px-2 py-1 rounded-lg border border-indigo-100 font-mono italic uppercase">
                            {{ data.code }}
                         </span>
                      </template>
                   </Column>
                   <Column field="name" header="NAMA PUSAT LABA / REGIONAL">
                      <template #body="{ data }">
                         <span class="text-[12px] font-black text-slate-800 uppercase tracking-tight">{{ data.name }}</span>
                      </template>
                   </Column>
                   <Column header="STATUS">
                      <template #body="{ data }">
                         <span :class="['px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest', data.isActive ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100']">
                            {{ data.isActive ? 'Active' : 'Deactivated' }}
                         </span>
                      </template>
                   </Column>
                   <Column class="text-right pr-8">
                      <template #body="{ data }">
                         <Button icon="pi pi-ban" severity="danger" text rounded size="small" v-if="data.isActive" @click="deactivateCenter(data, 'profit')" v-tooltip.top="'Deactivate Center'" />
                      </template>
                   </Column>
                </DataTable>
             </TabPanel>
          </TabPanels>
       </Tabs>
    </div>

    <!-- Management Dialog (Glass) -->
    <Dialog v-model:visible="dialogOpen" :header="activeTab === 'cost' ? 'Registrasi Pusat Biaya Baru' : 'Registrasi Pusat Laba Baru'" :modal="true" :dismissableMask="false" class="w-[500px] border-none shadow-2xl overflow-hidden glass-dialog">
       <div class="space-y-8 pt-4 px-2 pb-12 custom-scrollbar">
          <div :class="['p-6 rounded-3xl flex items-center gap-4 border', activeTab === 'cost' ? 'bg-slate-50 border-slate-200' : 'bg-indigo-50 border-indigo-100']">
             <div :class="['w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm border', activeTab === 'cost' ? 'text-slate-600 border-slate-200' : 'text-indigo-600 border-indigo-100']">
                <i :class="[activeTab === 'cost' ? 'pi pi-calculator' : 'pi pi-chart-line', 'text-xl']"></i>
             </div>
             <div>
                <p :class="['text-[11px] font-black uppercase leading-none mb-1', activeTab === 'cost' ? 'text-slate-900' : 'text-indigo-900']">Organizational Setup</p>
                <p :class="['text-[9px] font-bold uppercase italic', activeTab === 'cost' ? 'text-slate-400' : 'text-indigo-600']">Definisikan unit tanggung jawab untuk pelaporan finansial.</p>
             </div>
          </div>

          <div class="space-y-6">
             <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kode Unit (Code)</label>
                <InputText v-model="form.code" class="w-full rounded-xl font-mono uppercase" placeholder="XX-XXXX" />
             </div>
             <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Unit / Deskripsi</label>
                <InputText v-model="form.name" class="w-full rounded-xl uppercase" placeholder="NAMA UNIT" />
             </div>
          </div>
       </div>

       <template #footer>
          <div class="flex justify-end gap-4 p-4 border-t bg-white w-full">
             <Button label="Batal" severity="secondary" text @click="dialogOpen = false" class="font-black text-[10px] uppercase tracking-widest px-6" />
             <Button label="Simpan Data" icon="pi pi-save" class="p-button-rounded p-button-secondary font-black text-[10px] uppercase tracking-widest px-10 shadow-xl shadow-slate-100" @click="save" :loading="saving" />
          </div>
       </template>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
const api = useApi();
const toast = useToast();

const costCenters = ref<any[]>([]);
const profitCenters = ref<any[]>([]);
const activeTab = ref('cost');
const loading = ref(false);
const saving = ref(false);
const dialogOpen = ref(false);

const form = ref<any>({
  code: '',
  name: ''
});

const stats = computed(() => {
  const totalCost = costCenters.value.length;
  const totalProfit = profitCenters.value.length;
  const activeCost = costCenters.value.filter(c => c.isActive).length;
  const activeProfit = profitCenters.value.filter(c => c.isActive).length;

  return [
    { label: 'Total Pusat Biaya', value: totalCost, sub: 'Cost Centers', icon: 'pi pi-calculator', color: 'bg-slate-50 text-slate-600' },
    { label: 'Total Pusat Laba', value: totalProfit, sub: 'Profit Centers', icon: 'pi pi-chart-line', color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Akuntabilitas Aktif', value: activeCost + activeProfit, sub: 'Total Responsibility Units', icon: 'pi pi-check-circle', color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Branch Coverage', value: '100%', sub: 'Regional Distribution', icon: 'pi pi-map-marker', color: 'bg-blue-50 text-blue-600' }
  ];
});

async function loadAll() {
  loading.value = true;
  try {
    const [costRes, profitRes] = await Promise.all([
      api.get('/core/cost-centers'),
      api.get('/core/profit-centers')
    ]);
    costCenters.value = costRes.costCenters || costRes.data?.costCenters || [];
    profitCenters.value = profitRes.profitCenters || profitRes.data?.profitCenters || [];
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Load Failed', detail: e.message });
  } finally {
    loading.value = false;
  }
}

function openNew() {
  form.value = { code: '', name: '' };
  dialogOpen.value = true;
}

async function save() {
  saving.value = true;
  const endpoint = activeTab.value === 'cost' ? '/core/cost-centers' : '/core/profit-centers';
  try {
    await api.post(endpoint, form.value);
    toast.add({ severity: 'success', summary: 'Sukses', detail: 'Data unit berhasil didaftarkan.' });
    dialogOpen.value = false;
    loadAll();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: e.message });
  } finally {
    saving.value = false;
  }
}

async function deactivateCenter(data: any, type: string) {
  const endpoint = type === 'cost' ? `/core/cost-centers/${data.id}/deactivate` : `/core/profit-centers/${data.id}/deactivate`;
  try {
     await api.patch(endpoint);
     toast.add({ severity: 'warn', summary: 'Deactivated', detail: 'Unit dinonaktifkan.' });
     loadAll();
  } catch (e) {}
}

function fmtDate(d: string) { return d ? new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '-' }

onMounted(loadAll);
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

:deep(.p-tabs-list) {
  background: transparent !important;
}

:deep(.p-tab) {
  padding: 1rem 2rem !important;
  border: none !important;
}

:deep(.p-tab-active-bar) {
  @apply bg-slate-900;
  height: 3px !important;
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
