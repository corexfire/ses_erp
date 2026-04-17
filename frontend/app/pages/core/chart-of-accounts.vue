<template>
  <div class="p-6 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-8 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500">
      <div class="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-indigo-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">General Ledger</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-indigo-600">Bagan Akun (COA)</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase tracking-tighter">Chart Of <span class="text-indigo-600">Accounts</span></h1>
        <p class="text-slate-500 text-sm font-medium uppercase italic tracking-tight italic">Struktur hierarki akun keuangan untuk klasifikasi transaksi dan pelaporan fiskal.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="load" :loading="loading" />
        <Button label="Registrasi Akun" icon="pi pi-plus-circle" class="p-button-rounded p-button-indigo font-black text-xs shadow-lg shadow-indigo-100 px-6" @click="openNew" />
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

    <!-- Main Content: COA TreeTable -->
    <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:border-indigo-300 transition-all duration-500">
       <TreeTable :value="treeData" class="p-treetable-sm w-full font-medium" :loading="loading" scrollable scrollHeight="800px">
          <Column field="code" header="KODE AKUN" :expander="true" class="pl-8 w-64">
             <template #body="{ node }">
                <div class="flex items-center gap-2">
                   <span :class="['text-[11px] font-black font-mono tracking-tighter italic px-2 py-0.5 rounded-lg border', node.data.isPosting ? 'bg-slate-50 text-slate-900 border-slate-200' : 'bg-indigo-50 text-indigo-900 border-indigo-100']">
                      {{ node.data.code }}
                   </span>
                </div>
             </template>
          </Column>
          <Column field="name" header="NAMA AKUN / DESKRIPSI">
             <template #body="{ node }">
                <div class="flex items-center gap-3">
                   <div v-if="!node.data.isPosting" class="w-1.5 h-6 bg-indigo-500 rounded-full mr-1"></div>
                   <span :class="['text-[12px] uppercase tracking-tight', node.data.isPosting ? 'font-bold text-slate-600' : 'font-black text-slate-900']">
                      {{ node.data.name }}
                   </span>
                </div>
             </template>
          </Column>
          <Column field="type" header="KLASIFIKASI" class="w-40">
             <template #body="{ node }">
                <span :class="['text-[9px] font-black uppercase tracking-[0.15em]', getTypeColor(node.data.type)]">
                   {{ node.data.type }}
                </span>
             </template>
          </Column>
          <Column header="LEVEL" class="w-32">
             <template #body="{ node }">
                <span :class="['px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest', node.data.isPosting ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-900 text-white']">
                   {{ node.data.isPosting ? 'Detail (Posting)' : 'Header (Summary)' }}
                </span>
             </template>
          </Column>
          <Column class="text-right pr-8 w-24">
             <template #body="{ node }">
                <Button icon="pi pi-ban" severity="danger" text rounded size="small" v-if="node.data.isActive" @click="deactivate(node.data)" v-tooltip.top="'Deactivate Account'" />
             </template>
          </Column>
       </TreeTable>
    </div>

    <!-- Management Dialog (Glass) -->
    <Dialog v-model:visible="dialogOpen" header="Registrasi Akun Baru" :modal="true" :dismissableMask="false" class="w-[600px] border-none shadow-2xl overflow-hidden glass-dialog">
       <div class="space-y-8 pt-4 px-2 pb-12 custom-scrollbar">
          <div class="p-6 bg-indigo-50 border border-indigo-100 rounded-3xl flex items-center gap-4">
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

             <div class="p-6 bg-slate-50 border border-slate-200 rounded-3xl flex items-center justify-between">
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
  { label: 'Total Struktur Akun', value: accounts.value.length, sub: 'COA Hierarchy', icon: 'pi pi-book', color: 'bg-indigo-50 text-indigo-600' },
  { label: 'Akun Posting', value: accounts.value.filter(a => a.isPosting).length, sub: 'Ready for Entry', icon: 'pi pi-check-square', color: 'bg-emerald-50 text-emerald-600' },
  { label: 'Kategori Aktiva', value: accounts.value.filter(a => a.type === 'ASSET').length, sub: 'Balance Sheet', icon: 'pi pi-briefcase', color: 'bg-blue-50 text-blue-600' },
  { label: 'Kategori Beban', value: accounts.value.filter(a => a.type === 'EXPENSE').length, sub: 'Income Statement', icon: 'pi pi-minus-circle', color: 'bg-rose-50 text-rose-600' }
]);

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/chart-of-accounts');
    accounts.value = res.accounts || res.data?.accounts || [];
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
