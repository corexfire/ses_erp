<template>
  <div class="p-4 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <DashboardHero
      title="Responsibility Centers"
      subtitle="Manajemen pusat biaya (Cost) dan pusat laba (Profit) untuk akuntabilitas finansial."
      category="Responsibility Accounting"
      category-sub="Unit Organisasi"
      color="cyan"
    >
      <template #actions>
        <div class="flex items-center gap-3">
          <Button 
            :label="activeTab === 'cost' ? 'Registrasi Pusat Biaya' : 'Registrasi Pusat Laba'" 
            :icon="activeTab === 'cost' ? 'pi pi-calculator' : 'pi pi-chart-line'" 
            class="p-button-sm font-black text-xs px-6 bg-white/20 hover:bg-white/30 text-white border-white/20" 
            @click="openNew" 
          />
        </div>
      </template>
    </DashboardHero>

    <!-- Stats Section -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
       <MiniStatsCard
          v-for="s in stats"
          :key="s.label"
          :label="s.label"
          :value="s.value"
          :icon="s.icon"
          :sub="s.sub"
          :sub-color="s.theme"
          :icon-color="s.theme"
       />
    </div>

    <!-- Main Content: Unit List -->
    <PanelCard
      title="Unit Organisasi & Akuntabilitas"
      subtitle="Dataset pusat biaya (Cost) dan pusat laba (Profit) untuk alokasi transaksi."
      icon="pi pi-briefcase"
      theme="cyan"
      :show-search="false"
      :show-refresh="false"
      flat-controls
    >
       <template #filters>
          <SelectButton 
            v-model="activeTab" 
            :options="tabOptions" 
            optionLabel="label" 
            optionValue="value" 
            :allowEmpty="false" 
            :pt="{
               root: { class: 'bg-slate-100/80 p-1 rounded-2xl border border-slate-200/50 flex gap-1 shadow-inner' },
               pcbutton: ({ context }: any) => ({
                 root: {
                   class: [
                     '!border-none !rounded-xl transition-all duration-300 px-4 py-2',
                     context.active ? '!bg-white !text-cyan-600 shadow-sm' : '!bg-transparent !text-slate-500 hover:!bg-white/50'
                   ]
                 }
               })
            }"
          >
            <template #option="slotProps">
               <div class="flex items-center gap-2">
                  <i :class="[slotProps.option.icon, 'text-[10px]']"></i>
                  <span class="text-[9px] font-black uppercase tracking-[0.2em]">{{ slotProps.option.label }}</span>
               </div>
            </template>
          </SelectButton>
       </template>

       <template #table>
          <PanelTable
            v-if="activeTab === 'cost'"
            :items="costCenters"
            :columns="costColumns"
            :loading="loading"
            hover-border-color="border-l-cyan-400"
          >
            <template #col-code="{ item }">
               <span class="text-[11px] font-black text-slate-900 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200 font-mono italic uppercase">
                  {{ item.code }}
               </span>
            </template>
            <template #col-name="{ item }">
               <span class="text-[12px] font-black text-slate-800 uppercase tracking-tight">{{ item.name }}</span>
            </template>
            <template #col-status="{ item }">
               <span :class="['px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest', item.isActive ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100']">
                  {{ item.isActive ? 'Active' : 'Deactivated' }}
               </span>
            </template>
            <template #col-actions="{ item }">
               <div class="flex gap-2 justify-end">
                  <Button icon="pi pi-ban" severity="danger" text rounded size="small" v-if="item.isActive" @click="deactivateCenter(item, 'cost')" v-tooltip.top="'Deactivate Center'" />
               </div>
            </template>
          </PanelTable>

          <PanelTable
            v-else
            :items="profitCenters"
            :columns="profitColumns"
            :loading="loading"
            hover-border-color="border-l-indigo-400"
          >
            <template #col-code="{ item }">
               <span class="text-[11px] font-black text-indigo-900 bg-indigo-50 px-2 py-1 rounded-lg border border-indigo-100 font-mono italic uppercase">
                  {{ item.code }}
               </span>
            </template>
            <template #col-name="{ item }">
               <span class="text-[12px] font-black text-slate-800 uppercase tracking-tight">{{ item.name }}</span>
            </template>
            <template #col-status="{ item }">
               <span :class="['px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest', item.isActive ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100']">
                  {{ item.isActive ? 'Active' : 'Deactivated' }}
               </span>
            </template>
            <template #col-actions="{ item }">
               <div class="flex gap-2 justify-end">
                  <Button icon="pi pi-ban" severity="danger" text rounded size="small" v-if="item.isActive" @click="deactivateCenter(item, 'profit')" v-tooltip.top="'Deactivate Center'" />
               </div>
            </template>
          </PanelTable>
       </template>
    </PanelCard>

    <!-- Management Dialog (Glass) -->
    <Dialog v-model:visible="dialogOpen" :header="activeTab === 'cost' ? 'Registrasi Pusat Biaya Baru' : 'Registrasi Pusat Laba Baru'" :modal="true" :dismissableMask="false" class="w-[500px] border-none shadow-2xl overflow-hidden glass-dialog">
       <div class="space-y-8 pt-4 px-2 pb-12 custom-scrollbar">
          <div :class="['p-4 rounded-3xl flex items-center gap-4 border', activeTab === 'cost' ? 'bg-slate-50 border-slate-200' : 'bg-indigo-50 border-indigo-100']">
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
    { label: 'Total Pusat Biaya', value: totalCost, sub: 'Cost Centers', icon: 'pi pi-calculator', theme: 'cyan' as const },
    { label: 'Total Pusat Laba', value: totalProfit, sub: 'Profit Centers', icon: 'pi pi-chart-line', theme: 'indigo' as const },
    { label: 'Akuntabilitas Aktif', value: activeCost + activeProfit, sub: 'Total Responsibility Units', icon: 'pi pi-check-circle', theme: 'emerald' as const },
    { label: 'Branch Coverage', value: '100%', sub: 'Regional Distribution', icon: 'pi pi-map-marker', theme: 'blue' as const }
  ];
});

const costColumns = [
  { key: 'code', header: 'KODE CENTER', width: 'w-48' },
  { key: 'name', header: 'NAMA UNIT / DEPARTEMEN' },
  { key: 'status', header: 'STATUS', width: 'w-48', borderLeft: true },
  { key: 'actions', header: 'AKSI', align: 'right' as const, width: 'w-24', borderLeft: true }
];

const profitColumns = [
  { key: 'code', header: 'KODE PROFIT', width: 'w-48' },
  { key: 'name', header: 'NAMA PUSAT LABA / REGIONAL' },
  { key: 'status', header: 'STATUS', width: 'w-48', borderLeft: true },
  { key: 'actions', header: 'AKSI', align: 'right' as const, width: 'w-24', borderLeft: true }
];

const tabOptions = [
  { label: 'Pusat Biaya (Cost Center)', value: 'cost', icon: 'pi pi-calculator' },
  { label: 'Pusat Laba (Profit Center)', value: 'profit', icon: 'pi pi-chart-line' }
];

async function loadAll() {
  loading.value = true;
  try {
    const [costRes, profitRes] = await Promise.all([
      api.get('/core/cost-centers'),
      api.get('/core/profit-centers')
    ]);
    costCenters.value = costRes.data?.costCenters || costRes.data || [];
    profitCenters.value = profitRes.data?.profitCenters || profitRes.data || [];
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

<style scoped lang="postcss">
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
