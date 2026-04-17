<script setup lang="ts">
import { ref, onMounted, computed, reactive } from 'vue';
import { useApi } from '@/composables/useApi';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';

const api = useApi();
const toast = useToast();
const confirm = useConfirm();

// --- State ---
const loading = ref(false);
const submitting = ref(false);
const budgets = ref<any[]>([]);
const drawerVisible = ref(false);
const selectedProject = ref<any>(null);

// Master Data
const projects = ref<any[]>([]);
const wbsTasks = ref<any[]>([]);

const form = reactive({
  id: null as string | null,
  projectId: '',
  budgetNo: '',
  description: '',
  status: 'DRAFT',
  lines: [] as any[]
});

const costCategories = [
  { label: 'Material (MTL)', value: 'MATERIAL', icon: 'pi pi-box', color: 'indigo' },
  { label: 'Labor (LBR)', value: 'LABOR', icon: 'pi pi-users', color: 'amber' },
  { label: 'Equipment (EQP)', value: 'EQUIP', icon: 'pi pi-cog', color: 'slate' },
  { label: 'Sub-Contractor (SBC)', value: 'SUBCO', icon: 'pi pi-briefcase', color: 'emerald' },
  { label: 'Other (OTH)', value: 'OTHER', icon: 'pi pi-ellipsis-h', color: 'rose' }
];

// --- Helpers ---
const fmtCurrency = (v: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(v);
const fmtDate = (d: any) => d ? format(new Date(d), 'dd MMM yyyy', { locale: localeId }) : '-';

const getStatusBadge = (s: string) => {
  if (s === 'APPROVED') return 'bg-emerald-500 text-white';
  if (s === 'SUBMITTED') return 'bg-indigo-500 text-white';
  return 'bg-slate-500 text-white';
};

const getCategoryInfo = (cat: string) => costCategories.find(c => c.value === cat) || costCategories[4];

// --- Calculations ---
const totalBudgeted = computed(() => budgets.value.reduce((acc, b) => acc + Number(b.totalAmount), 0));
const totalLinesAmount = computed(() => form.lines.reduce((acc, l) => acc + (Number(l.unitPrice) * Number(l.qty)), 0));

const stats = computed(() => [
  { label: 'Total Anggaran Strategis', value: fmtCurrency(totalBudgeted.value), icon: 'pi pi-chart-line', color: 'indigo' },
  { label: 'Budget Ter-Alokasi', value: budgets.value.length + ' Dokumen', icon: 'pi pi-file-edit', color: 'emerald' },
  { label: 'Rata-rata Per Proyek', value: fmtCurrency(budgets.value.length ? totalBudgeted.value / budgets.value.length : 0), icon: 'pi pi-calculator', color: 'amber' }
]);

// --- Actions ---
const fetchData = async () => {
  loading.value = true;
  try {
    const [budgetsRes, projectsRes] = await Promise.all([
      api.get('/project/budgets'),
      api.get('/project/projects')
    ]);
    budgets.value = budgetsRes.data || [];
    projects.value = projectsRes.data?.data || [];
  } catch (err) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal memuat data anggaran', life: 3000 });
  } finally {
    loading.value = false;
  }
};

const fetchWbsTasks = async (projectId: string) => {
  if (!projectId) {
    wbsTasks.value = [];
    return;
  }
  try {
    const res = await api.get('/project/core-queries', { params: { table: 'WbsTask', where: JSON.stringify({ projectId }) } });
    wbsTasks.value = res.data?.data || [];
  } catch (err) {
    console.error('Failed to fetch WBS tasks');
  }
};

const openNew = () => {
  form.id = null;
  form.projectId = '';
  form.budgetNo = `BUD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  form.description = '';
  form.status = 'DRAFT';
  form.lines = [];
  drawerVisible.value = true;
};

const editBudget = async (budget: any) => {
  loading.value = true;
  try {
    const res = await api.get(`/project/budgets/${budget.id}`);
    const b = res.data;
    form.id = b.id;
    form.projectId = b.projectId;
    form.budgetNo = b.budgetNo;
    form.description = b.description;
    form.status = b.status;
    form.lines = b.lines.map((l: any) => ({
      ...l,
      unitPrice: Number(l.unitPrice),
      qty: Number(l.qty)
    }));
    await fetchWbsTasks(b.projectId);
    drawerVisible.value = true;
  } catch (err) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal memuat detail anggaran', life: 3000 });
  } finally {
    loading.value = false;
  }
};

const addLine = () => {
  form.lines.push({
    wbsTaskId: '',
    costCategory: 'MATERIAL',
    description: '',
    unitPrice: 0,
    qty: 1,
    uom: 'LS'
  });
};

const removeLine = (index: number) => {
  form.lines.splice(index, 1);
};

const saveBudget = async () => {
  if (!form.projectId || form.lines.length === 0) {
    toast.add({ severity: 'warn', summary: 'Cek Input', detail: 'Proyek dan minimal 1 line anggaran wajib diisi', life: 3000 });
    return;
  }

  submitting.value = true;
  try {
    if (form.id) {
      await api.patch(`/project/budgets/${form.id}`, form);
      toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Anggaran diperbarui', life: 3000 });
    } else {
      await api.post('/project/budgets', form);
      toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Anggaran baru dibuat', life: 3000 });
    }
    fetchData();
    drawerVisible.value = false;
  } catch (err) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal menyimpan anggaran', life: 3000 });
  } finally {
    submitting.value = false;
  }
};

const deleteBudget = (id: string) => {
  confirm.require({
    message: 'Apakah Anda yakin ingin menghapus anggaran ini?',
    header: 'Konfirmasi Penghapusan',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      try {
        await api.delete(`/project/budgets/${id}`);
        toast.add({ severity: 'success', summary: 'Dihapus', detail: 'Dokumen anggaran telah dihapus', life: 3000 });
        fetchData();
      } catch (err) {
        toast.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal menghapus data', life: 3000 });
      }
    }
  });
};

onMounted(fetchData);
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 font-sans p-8">
    <!-- Premium Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-10 mb-10 rounded-xl bg-indigo-950 border border-white/10 shadow-2xl">
      <div class="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-[100px] opacity-20 -mr-32 -mt-32"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500 rounded-full blur-[80px] opacity-10 -ml-20 -mb-20"></div>
      
      <div class="relative flex items-center gap-6">
        <div class="w-20 h-20 rounded-3xl bg-white/5 backdrop-blur-xl flex items-center justify-center shadow-inner border border-white/10 shrink-0">
          <i class="pi pi-chart-bar text-white text-4xl"></i>
        </div>
        <div>
          <div class="flex items-center gap-3 mb-2">
             <span class="px-4 py-1.5 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-emerald-500/20">Planning Mode</span>
             <span class="text-white/20">/</span>
             <span class="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Financial Control</span>
          </div>
          <h1 class="text-5xl font-black text-white tracking-tighter leading-none uppercase">Strategic <span class="text-indigo-400">Budgeting</span></h1>
          <p class="text-indigo-200 mt-2 text-sm font-medium tracking-wide opacity-60 italic">Perencanaan alokasi modal berbasis aktivitas untuk efisiensi proyek.</p>
        </div>
      </div>

      <div class="flex items-center gap-4 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="fetchData" :loading="loading" class="border-white/20 text-white hover:bg-white/5" />
        <Button label="Buat Anggaran Baru" icon="pi pi-plus" class="p-button-rounded bg-white text-indigo-900 border-none font-black text-xs shadow-2xl px-8 py-4 hover:scale-105 transition-transform" @click="openNew" />
      </div>
    </div>

    <!-- Stats Ribbon -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
       <div v-for="s in stats" :key="s.label" class="group p-8 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
          <div class="absolute top-0 right-0 p-6 opacity-5 transition-opacity group-hover:opacity-10 translate-x-4 -translate-y-4">
             <i :class="[s.icon, 'text-9xl', `text-${s.color}-600`]"></i>
          </div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ s.label }}</p>
          <h3 class="text-4xl font-black text-slate-900 tracking-tight">{{ s.value }}</h3>
          <div class="flex items-center gap-2 mt-4">
             <div :class="['w-1.5 h-6 rounded-full', `bg-${s.color}-500`]"></div>
             <span class="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Verified Allocation</span>
          </div>
       </div>
    </div>

    <!-- Main Table Area -->
    <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px]">
       <DataTable :value="budgets" responsive-layout="scroll" class="p-datatable-lg" :loading="loading">
          <template #empty>
            <div class="p-32 text-center text-slate-400 flex flex-col items-center">
               <i class="pi pi-inbox text-8xl mb-6 opacity-20"></i>
               <p class="text-xl font-bold tracking-tight text-slate-400 uppercase">Belum ada dokumen anggaran strategis.</p>
               <Button label="Mulai Perencanaan" text class="mt-4 font-black text-indigo-600 uppercase tracking-widest text-xs" @click="openNew" />
            </div>
          </template>
          
          <Column field="budgetNo" header="NOMOR DOKUMEN" class="pl-10">
             <template #body="{ data }">
                <div class="flex items-center gap-4">
                   <div class="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
                      <i class="pi pi-file-pdf text-slate-400 text-lg group-hover:text-indigo-400"></i>
                   </div>
                   <div class="flex flex-col">
                      <span class="text-[13px] font-black text-slate-900 tracking-tight uppercase">{{ data.budgetNo }}</span>
                      <span class="text-[10px] font-bold text-slate-400 italic">Rev. {{ data.revNo }}</span>
                   </div>
                </div>
             </template>
          </Column>

          <Column header="PROJECT TARGET">
             <template #body="{ data }">
                <div class="flex flex-col">
                   <span class="text-[12px] font-black text-slate-800 uppercase tracking-tight">{{ data.project?.name }}</span>
                   <span class="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{{ data.project?.code }}</span>
                </div>
             </template>
          </Column>

          <Column header="NOMINAL ALOKASI">
             <template #body="{ data }">
                <span class="text-[14px] font-black font-mono text-slate-900">{{ fmtCurrency(Number(data.totalAmount)) }}</span>
             </template>
          </Column>

          <Column header="TANGGAL">
             <template #body="{ data }">
                <span class="text-[11px] font-bold text-slate-500 uppercase">{{ fmtDate(data.createdAt) }}</span>
             </template>
          </Column>

          <Column header="STATUS">
             <template #body="{ data }">
                <span :class="['px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm', getStatusBadge(data.status)]">
                  {{ data.status }}
                </span>
             </template>
          </Column>

          <Column class="text-right pr-10">
             <template #body="{ data }">
                <div class="flex items-center justify-end gap-2">
                   <Button icon="pi pi-pencil" severity="secondary" rounded text @click="editBudget(data)" />
                   <Button icon="pi pi-trash" severity="danger" rounded text @click="deleteBudget(data.id)" />
                </div>
             </template>
          </Column>
       </DataTable>
    </div>

    <!-- Form Drawer -->
    <Drawer v-model:visible="drawerVisible" position="right" class="w-full md:w-[850px]" header="Strategy Planning & Allocation">
       <div class="p-10 space-y-12 pb-32 overflow-y-auto h-full pr-6 custom-scrollbar bg-slate-50/30">
          <!-- Step 1: Context -->
          <div class="space-y-6">
             <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-2xl bg-indigo-950 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-indigo-500/20">01</div>
                <div>
                   <h4 class="text-[13px] font-black uppercase tracking-[0.2em] text-slate-900">Capital Context</h4>
                   <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Penentuan target proyek dan identifikasi dokumen.</p>
                </div>
             </div>
             
             <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-10 bg-white border border-slate-200 rounded-xl shadow-sm">
                <div class="flex flex-col gap-3">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Target Proyek <span class="text-rose-500">*</span></label>
                   <Dropdown v-model="form.projectId" :options="projects" optionLabel="name" optionValue="id" filter placeholder="Pilih Proyek Proyek..." class="w-full rounded-2xl border-slate-200" @change="fetchWbsTasks(form.projectId)" />
                </div>
                <div class="flex flex-col gap-3">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Budget Document No <span class="text-rose-500">*</span></label>
                   <InputText v-model="form.budgetNo" placeholder="AUTO-GEN" class="w-full rounded-2xl border-slate-200 font-mono font-bold" />
                </div>
                <div class="md:col-span-2 flex flex-col gap-3">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Konteks Strategis / Catatan</label>
                   <Textarea v-model="form.description" rows="3" placeholder="Deskripsikan tujuan perencanaan anggaran ini..." class="w-full rounded-3xl border-slate-200 p-6" />
                </div>
             </div>
          </div>

          <!-- Step 2: Line Items -->
          <div class="space-y-6">
             <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                   <div class="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-indigo-500/20">02</div>
                   <div>
                      <h4 class="text-[13px] font-black uppercase tracking-[0.2em] text-slate-900">Resource Allocation</h4>
                      <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Detail komoditas dan estimasi biaya per kategori.</p>
                   </div>
                </div>
                <Button label="Tambah Baris" icon="pi pi-plus" size="small" class="p-button-rounded bg-indigo-50 text-indigo-600 border border-indigo-100 font-black text-[9px] uppercase px-6" @click="addLine" />
             </div>

             <div class="space-y-4">
                <div v-for="(line, idx) in form.lines" :key="idx" class="p-8 bg-white border border-slate-200 rounded-xl shadow-sm relative group hover:border-indigo-300 transition-all">
                   <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button icon="pi pi-times" severity="danger" rounded text size="small" @click="removeLine(idx)" />
                   </div>
                   
                   <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div class="md:col-span-2 flex flex-col gap-2">
                         <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Item / Deskripsi Pekerjaan</label>
                         <InputText v-model="line.description" placeholder="Contoh: Pekerjaan Tanah & Galian" class="w-full rounded-xl border-slate-100 text-sm font-bold" />
                      </div>
                      <div class="flex flex-col gap-2">
                         <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Cost Category</label>
                         <Select v-model="line.costCategory" :options="costCategories" optionLabel="label" optionValue="value" placeholder="Pilih..." class="w-full rounded-xl" />
                      </div>
                      <div class="flex flex-col gap-2">
                         <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest">WBS Task Reference</label>
                         <Select v-model="line.wbsTaskId" :options="wbsTasks" optionLabel="taskName" optionValue="id" placeholder="Pilih Task (Optional)" class="w-full rounded-xl" filter />
                      </div>
                      <div class="flex flex-col gap-2">
                         <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Unit Price (IDR)</label>
                         <InputNumber v-model="line.unitPrice" mode="currency" currency="IDR" locale="id-ID" class="w-full" inputClass="rounded-xl border-slate-100 font-mono" />
                      </div>
                      <div class="flex flex-col gap-2">
                         <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Quantity & UoM</label>
                         <div class="flex gap-2">
                            <InputNumber v-model="line.qty" class="w-2/3" inputClass="rounded-xl border-slate-100" />
                            <InputText v-model="line.uom" class="w-1/3 rounded-xl border-slate-100 font-black text-center" placeholder="KG" />
                         </div>
                      </div>
                   </div>
                   <div class="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
                      <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Line Cost</span>
                      <span class="text-xs font-black text-indigo-600 font-mono bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100">
                         {{ fmtCurrency(Number(line.unitPrice) * Number(line.qty)) }}
                      </span>
                   </div>
                </div>
             </div>

             <!-- Total Footer in Form -->
             <div class="p-10 rounded-xl bg-indigo-900 text-white flex items-center justify-between shadow-xl shadow-indigo-900/20">
                <div class="flex flex-col">
                   <span class="text-[10px] font-black uppercase tracking-widest text-indigo-300">Total Accumulative Budget</span>
                   <p class="text-xs text-indigo-100 font-medium">Nilai total alokasi yang disiapkan untuk validasi.</p>
                </div>
                <h2 class="text-4xl font-black tracking-tighter">{{ fmtCurrency(totalLinesAmount) }}</h2>
             </div>
          </div>

          <!-- Bottom Actions -->
          <div class="fixed bottom-0 left-0 w-full bg-white p-10 border-t border-slate-100 flex items-center justify-end gap-5 rounded-t-[4rem] shadow-[0_-20px_50px_rgba(0,0,0,0.08)] z-20">
             <Button label="Batalkan" severity="secondary" text @click="drawerVisible = false" class="font-black text-xs uppercase tracking-widest" />
             <div class="flex items-center gap-3">
                <Button label="Draft Saja" severity="secondary" outlined class="p-button-rounded font-black text-xs uppercase tracking-widest px-8" @click="saveBudget" :loading="submitting" />
                <Button label="Finalisasi & Submit" icon="pi pi-check-circle" class="p-button-rounded bg-indigo-600 border-none font-black text-xs uppercase tracking-widest px-12 py-4 shadow-2xl shadow-indigo-200" @click="saveBudget" :loading="submitting" />
             </div>
          </div>
       </div>
    </Drawer>

  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}

:deep(.p-datatable-thead > tr > th) {
  background: transparent !important;
  font-size: 10px !important;
  font-weight: 900 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.15em !important;
  color: #94a3b8 !important;
  border-bottom: 2px solid #f1f5f9 !important;
  padding: 2.5rem 2rem !important;
}

:deep(.p-datatable-tbody > tr) {
  background: transparent !important;
  transition: all 0.3s ease;
}

:deep(.p-datatable-tbody > tr:hover) {
  @apply bg-indigo-50/30 !important;
}

:deep(.p-datatable-tbody > tr > td) {
  padding: 2rem 2rem !important;
  border-bottom: 1px solid #f8fafc !important;
}

:deep(.p-drawer-content) {
  padding: 0 !important;
  overflow: hidden !important;
}

:deep(.p-inputtext), :deep(.p-dropdown), :deep(.p-textarea), :deep(.p-inputnumber-input), :deep(.p-select) {
  @apply bg-slate-50/50 border-slate-200 focus:bg-white focus:border-indigo-400 focus:ring-0 transition-all !important;
}

:deep(.p-dropdown-panel), :deep(.p-select-panel) {
  @apply rounded-2xl shadow-2xl border-slate-100 p-2;
}
</style>
