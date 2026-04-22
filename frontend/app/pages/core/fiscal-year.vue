<template>
  <div class="p-4 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <DashboardHero
      title="Fiscal Year"
      subtitle="Manajemen periode akuntansi, pembukaan dan penutupan buku tahunan serta bulanan."
      category="Accounting Cycles"
      category-sub="Tahun Fiskal"
      color="blue"
    >
      <template #actions>
        <div class="flex items-center gap-3">
          <Button label="Buat Tahun Fiskal" icon="pi pi-calendar-plus" class="p-button-sm font-black text-xs px-6 bg-white/20 hover:bg-white/30 text-white border-white/20" @click="openNew" />
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

    <!-- Fiscal Years Main Table -->
    <PanelCard
      title="Master Periode Akuntansi"
      subtitle="Dataset siklus pembukuan tahunan dan status periode bulanan."
      icon="pi pi-calendar"
      theme="blue"
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
                     context.active ? '!bg-white !text-blue-600 shadow-sm' : '!bg-transparent !text-slate-500 hover:!bg-white/50'
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
            :items="fiscalYears"
            :columns="fiscalColumns"
            :loading="loading"
            expandable
            v-model:expandedRows="expandedRows"
            hover-border-color="border-l-blue-400"
          >
            <template #col-code="{ item }">
               <span class="text-[11px] font-black text-slate-900 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200 font-mono italic uppercase">
                  {{ item.code }}
               </span>
            </template>
            <template #col-name="{ item }">
               <span class="text-[12px] font-black text-slate-800 uppercase tracking-tight">{{ item.name }}</span>
            </template>
            <template #col-range="{ item }">
               <div class="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                  <span>{{ fmtDate(item.startDate) }}</span>
                  <i class="pi pi-arrow-right text-[8px] text-slate-300"></i>
                  <span>{{ fmtDate(item.endDate) }}</span>
               </div>
            </template>
            <template #col-status="{ item }">
               <div class="flex gap-2">
                  <span :class="['px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest', item.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400']">
                     {{ item.isActive ? 'Active' : 'Inactive' }}
                  </span>
                  <span v-if="item.isClosed" class="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-rose-100">
                     Closed Book
                  </span>
               </div>
            </template>
            <template #col-actions="{ item }">
               <div class="flex gap-2 justify-end">
                  <Button icon="pi pi-lock" severity="danger" rounded text @click="closeYear(item)" v-if="!item.isClosed" v-tooltip.top="'Tutup Tahun Buku'" />
               </div>
            </template>

            <!-- Expansion View -->
            <template #expansion="{ item }">
               <div class="p-8 bg-white/50 border-y border-slate-100">
                  <div class="flex items-center gap-4 mb-6">
                     <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-slate-200 shadow-sm text-blue-600">
                        <i class="pi pi-clock text-sm"></i>
                     </div>
                     <div>
                        <h4 class="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Monthly Accounting Periods</h4>
                        <p class="text-[9px] text-slate-400 font-bold uppercase italic tracking-tight">Status penguncian transaksi per bulan.</p>
                     </div>
                  </div>
                  
                  <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                     <div v-for="p in item.periods" :key="p.id" class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col items-center group hover:border-blue-400 transition-all hover:shadow-lg hover:-translate-y-1">
                        <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Period {{ p.periodNo }}</span>
                        <span class="text-[11px] font-black text-slate-900 mb-2 uppercase">{{ fmtMonth(p.startDate) }}</span>
                        <div :class="['w-full py-1 text-center rounded-lg text-[8px] font-black uppercase tracking-widest border', p.isOpen ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100']">
                           {{ p.isOpen ? 'Open' : 'Closed' }}
                        </div>
                     </div>
                  </div>
               </div>
            </template>
          </PanelTable>
       </template>
    </PanelCard>

    <!-- Management Dialog (Glass) -->
    <Dialog v-model:visible="dialogOpen" header="Registrasi Tahun Fiskal Baru" :modal="true" :dismissableMask="false" class="w-[600px] border-none shadow-2xl overflow-hidden glass-dialog">
       <div class="space-y-8 pt-4 px-2 pb-12 custom-scrollbar">
          <div class="p-4 bg-blue-50 border border-blue-100 rounded-3xl flex items-center gap-4">
             <div class="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                <i class="pi pi-calendar text-xl"></i>
             </div>
             <div>
                <p class="text-[11px] font-black text-blue-900 uppercase leading-none mb-1">Fiscal Setup</p>
                <p class="text-[9px] font-bold text-blue-600 uppercase italic">Sistem akan otomatis membuat 12 periode akuntansi bulanan.</p>
             </div>
          </div>

          <div class="space-y-6">
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kode Tahun</label>
                   <InputText v-model="form.code" class="w-full rounded-xl font-mono uppercase bg-slate-50" placeholder="FY202X" />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Desktop</label>
                   <InputText v-model="form.name" class="w-full rounded-xl" placeholder="Fiscal Year 202X" />
                </div>
             </div>
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tanggal Mulai</label>
                   <InputText v-model="form.startDate" type="date" class="w-full rounded-xl" />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tanggal Berakhir</label>
                   <InputText v-model="form.endDate" type="date" class="w-full rounded-xl" />
                </div>
             </div>
          </div>
       </div>

       <template #footer>
          <div class="flex justify-end gap-4 p-4 border-t bg-white w-full">
             <Button label="Batal" severity="secondary" text @click="dialogOpen = false" class="font-black text-[10px] uppercase tracking-widest px-6" />
             <Button label="Generate & Simpan" icon="pi pi-sparkles" class="p-button-rounded p-button-indigo font-black text-[10px] uppercase tracking-widest px-10 shadow-xl shadow-blue-100" @click="save" :loading="saving" />
          </div>
       </template>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
const api = useApi();
const toast = useToast();

const fiscalYears = ref<any[]>([]);
const expandedRows = ref([]);
const loading = ref(false);
const saving = ref(false);
const dialogOpen = ref(false);

const form = ref<any>({
  code: '',
  name: '',
  startDate: '',
  endDate: ''
});

const stats = computed(() => {
  const current = fiscalYears.value.find(y => y.isActive);
  const openPeriods = fiscalYears.value.reduce((acc: number, y: any) => acc + (y.periods?.filter((p: any) => p.isOpen).length || 0), 0);
  return [
    { label: 'Tahun Fiskal Aktif', value: current?.code || 'None', sub: 'Current Cycle', icon: 'pi pi-calendar', theme: 'emerald' as const },
    { label: 'Total Periode Terbuka', value: openPeriods, sub: 'Active Months', icon: 'pi pi-clock', theme: 'blue' as const },
    { label: 'Siklus Terdaftar', value: fiscalYears.value.length, sub: 'Database Status', icon: 'pi pi-database', theme: 'indigo' as const },
    { label: 'Tahun Tertutup', value: fiscalYears.value.filter(y => y.isClosed).length, sub: 'Closed Books', icon: 'pi pi-lock', theme: 'rose' as const }
  ];
});

const fiscalColumns = [
  { key: 'code', header: 'KODE', width: 'w-32' },
  { key: 'name', header: 'NAMA TAHUN FISKAL' },
  { key: 'range', header: 'RANGE TANGGAL', width: 'w-64', borderLeft: true },
  { key: 'status', header: 'STATUS', width: 'w-48', borderLeft: true },
  { key: 'actions', header: 'AKSI', align: 'right' as const, width: 'w-24', borderLeft: true }
];

const tabOptions = [
  { label: 'Master Periode', value: 'master', icon: 'pi pi-calendar' }
];

const activeTab = ref('master');

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/fiscal-years');
    fiscalYears.value = res.data?.fiscalYears || res.data || [];
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Load Failed', detail: e.message });
  } finally {
    loading.value = false;
  }
}

function openNew() {
  form.value = { code: '', name: '', startDate: '', endDate: '' };
  dialogOpen.value = true;
}

async function save() {
  saving.value = true;
  try {
    await api.post('/core/fiscal-years', {
      ...form.value,
      startDate: new Date(form.value.startDate).toISOString(),
      endDate: new Date(form.value.endDate).toISOString()
    });
    toast.add({ severity: 'success', summary: 'Sukses', detail: 'Tahun fiskal dan periode berhasil digenerate.' });
    dialogOpen.value = false;
    load();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: e.message });
  } finally {
    saving.value = false;
  }
}

async function closeYear(data: any) {
  try {
     await api.patch(`/core/fiscal-years/${data.id}/close`);
     toast.add({ severity: 'warn', summary: 'Year Closed', detail: 'Tahun buku dan seluruh periodenya telah ditutup.' });
     load();
  } catch (e) {}
}

function fmtDate(d: string) { return d ? new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '-' }
function fmtMonth(d: string) { return d ? new Date(d).toLocaleDateString('id-ID', { month: 'long' }) : '-' }

onMounted(load);
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
