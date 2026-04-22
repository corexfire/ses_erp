<template>
  <div class="p-4 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <DashboardHero
      title="Chart Of"
      title-accent="Accounts"
      description="Struktur hierarki akun keuangan untuk klasifikasi transaksi dan pelaporan fiskal."
      category="General Ledger"
      category-sub="Bagan Akun (COA)"
      color="indigo"

    >
      <template #actions>
        <div class="flex items-center gap-3">
          <Button label="Registrasi Akun" icon="pi pi-plus-circle" class="p-button-sm font-black text-xs px-6 bg-white/20 hover:bg-white/30 text-white border-white/20" @click="openNew" />
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

    <!-- Main Content: COA TreeTable -->
    <!-- Main Content: COA TreeTable -->
    <PanelCard
      title="Bagan Akun Keuangan"
      subtitle="Hierarki pengelompokan transaksi untuk pelaporan neraca dan laba rugi."
      icon="pi pi-sitemap"
      theme="indigo"
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
                     context.active ? '!bg-white !text-indigo-600 shadow-sm' : '!bg-transparent !text-slate-500 hover:!bg-white/50'
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
          <PanelTreeTable
            :value="treeData"
            :columns="coaColumns"
            :loading="loading"
            hover-border-color="border-l-indigo-400"
          >
            <template #col-code="{ data }">
               <span :class="['text-[11px] font-black font-mono tracking-tighter italic px-2 py-0.5 rounded-lg border', data.isPosting ? 'bg-slate-50 text-slate-900 border-slate-200' : 'bg-indigo-50 text-indigo-900 border-indigo-100']">
                  {{ data.code }}
               </span>
            </template>
            <template #col-name="{ data }">
               <div class="flex items-center gap-3">
                  <div v-if="!data.isPosting" class="w-1.5 h-6 bg-indigo-500 rounded-full mr-1"></div>
                  <span :class="['text-[12px] uppercase tracking-tight', data.isPosting ? 'font-bold text-slate-600' : 'font-black text-slate-900']">
                     {{ data.name }}
                  </span>
               </div>
            </template>
            <template #col-type="{ data }">
               <span :class="['text-[9px] font-black uppercase tracking-[0.15em]', getTypeColor(data.type)]">
                  {{ data.type }}
               </span>
            </template>
            <template #col-level="{ data }">
               <span :class="['px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest', data.isPosting ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-900 text-white']">
                  {{ data.isPosting ? 'Detail (Posting)' : 'Header (Summary)' }}
               </span>
            </template>
            <template #col-actions="{ data }">
               <div class="flex gap-2 justify-end">
                  <Button icon="pi pi-ban" severity="danger" text rounded size="small" v-if="data.isActive" @click="deactivate(data)" v-tooltip.top="'Deactivate Account'" />
               </div>
            </template>
          </PanelTreeTable>
       </template>
    </PanelCard>

    <!-- Management Dialog (Glass) -->
    <Dialog v-model:visible="dialogOpen" header="Registrasi Akun Baru" :modal="true" :dismissableMask="false" class="w-[600px] border-none shadow-2xl overflow-hidden glass-dialog">
       <div class="space-y-8 pt-4 px-2 pb-12 custom-scrollbar">
          <div class="p-4 bg-indigo-50 border border-indigo-100 rounded-3xl flex items-center gap-4">
             <div class="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100">
                <i class="pi pi-book text-xl"></i>
             </div>
             <div>
                <p class="text-[11px] font-black text-indigo-900 uppercase leading-none mb-1">Accounting Classification</p>
                <p class="text-[9px] font-bold text-indigo-600 uppercase italic">Tentukan hierarki dan tipe akun untuk pelaporan Neraca & LLR.</p>
             </div>
          </div>

          <div class="space-y-6">
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kode Akun (COA Code)</label>
                   <InputText v-model="form.code" class="w-full rounded-xl font-mono" placeholder="1-1001" />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Akun</label>
                   <InputText v-model="form.name" class="w-full rounded-xl" placeholder="Nama Akun" />
                </div>
             </div>

             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipe Akun</label>
                   <Select v-model="form.type" :options="['ASSET', 'LIABILITY', 'EQUITY', 'INCOME', 'EXPENSE']" class="w-full rounded-xl" placeholder="Pilih..." />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Parent Account (Induk)</label>
                   <Select v-model="form.parentId" :options="accounts.filter(a => !a.isPosting)" optionLabel="name" optionValue="id" class="w-full rounded-xl font-mono" placeholder="Opsional..." filter />
                </div>
             </div>

             <div class="p-4 bg-slate-50 border border-slate-200 rounded-3xl flex items-center justify-between">
                <div>
                   <p class="text-[10px] font-black text-slate-900 uppercase tracking-widest leading-none mb-1">Posting Status</p>
                   <p class="text-[9px] font-bold text-slate-400 uppercase">Dapat digunakan dalam entri jurnal transaksi.</p>
                </div>
                <Checkbox v-model="form.isPosting" :binary="true" />
             </div>
          </div>
       </div>

       <template #footer>
          <div class="flex justify-end gap-4 p-4 border-t bg-white w-full">
             <Button label="Batal" severity="secondary" text @click="dialogOpen = false" class="font-black text-[10px] uppercase tracking-widest px-6" />
             <Button label="Simpan Akun COA" icon="pi pi-save" class="p-button-rounded p-button-indigo font-black text-[10px] uppercase tracking-widest px-10 shadow-xl shadow-indigo-100" @click="save" :loading="saving" />
          </div>
       </template>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
const api = useApi();
const toast = useToast();

const accounts = ref<any[]>([]);
const loading = ref(false);
const saving = ref(false);
const dialogOpen = ref(false);

const form = ref<any>({
  code: '',
  name: '',
  type: 'ASSET',
  parentId: null,
  isPosting: true
});

const treeData = computed(() => {
  const map: Record<string, any> = {};
  const data: any[] = [];

  // Initialize map
  accounts.value.forEach(acc => {
    map[acc.id] = { key: acc.id, data: acc, children: [] };
  });

  // Build tree
  accounts.value.forEach(acc => {
    if (acc.parentId && map[acc.parentId]) {
      map[acc.parentId].children.push(map[acc.id]);
    } else {
      data.push(map[acc.id]);
    }
  });

  return data;
});

const stats = computed(() => [
  { label: 'Total Struktur Akun', value: accounts.value.length, sub: 'COA Hierarchy', icon: 'pi pi-book', theme: 'indigo' as const },
  { label: 'Akun Posting', value: accounts.value.filter(a => a.isPosting).length, sub: 'Ready for Entry', icon: 'pi pi-check-square', theme: 'emerald' as const },
  { label: 'Kategori Aktiva', value: accounts.value.filter(a => a.type === 'ASSET').length, sub: 'Balance Sheet', icon: 'pi pi-briefcase', theme: 'blue' as const },
  { label: 'Kategori Beban', value: accounts.value.filter(a => a.type === 'EXPENSE').length, sub: 'Income Statement', icon: 'pi pi-minus-circle', theme: 'rose' as const }
]);

const coaColumns = [
  { key: 'code', header: 'KODE AKUN', expander: true, width: '320px' },
  { key: 'name', header: 'NAMA AKUN / DESKRIPSI' },
  { key: 'type', header: 'KLASIFIKASI', width: '200px', borderLeft: true },
  { key: 'level', header: 'LEVEL', width: '200px', borderLeft: true },
  { key: 'actions', header: 'AKSI', align: 'right' as const, width: '100px', borderLeft: true }
];

const tabOptions = [
  { label: 'Struktur Akun', value: 'master', icon: 'pi pi-sitemap' }
];

const activeTab = ref('master');

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/chart-of-accounts');
    accounts.value = res.data?.accounts || res.data || [];
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Load Failed', detail: e.message });
  } finally {
    loading.value = false;
  }
}

function openNew() {
  form.value = { code: '', name: '', type: 'ASSET', parentId: null, isPosting: true };
  dialogOpen.value = true;
}

async function save() {
  saving.value = true;
  try {
    await api.post('/core/chart-of-accounts', form.value);
    toast.add({ severity: 'success', summary: 'Sukses', detail: 'Akun COA berhasil didaftarkan.' });
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
     await api.patch(`/core/chart-of-accounts/${data.id}/deactivate`);
     toast.add({ severity: 'warn', summary: 'Deactivated', detail: 'Akun dinonaktifkan.' });
     load();
  } catch (e: any) {
     toast.add({ severity: 'error', summary: 'Gagal', detail: e.message });
  }
}

function getTypeColor(type: string) {
  switch(type) {
    case 'ASSET': return 'text-blue-600';
    case 'LIABILITY': return 'text-rose-600';
    case 'EQUITY': return 'text-emerald-600';
    case 'INCOME': return 'text-indigo-600';
    case 'EXPENSE': return 'text-amber-600';
    default: return 'text-slate-400';
  }
}

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
