<template>
  <div class="p-6 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section (Premium Style) -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-8 rounded-xl bg-white border border-slate-200 shadow-sm">
      <div class="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-emerald-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Continuous Improvement</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-emerald-600">Corrective & Preventive Action</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2">Manajemen <span class="text-emerald-600">CAPA</span></h1>
        <p class="text-slate-500 text-sm font-medium">Investigasi mendalam dan standarisasi tindakan untuk mencegah keberulangan masalah mutu.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="loadCapas" :loading="loading" />
        <Button label="Buat Registrasi CAPA" icon="pi pi-plus" class="p-button-rounded font-black text-xs shadow-lg shadow-emerald-100 bg-emerald-600 border-none text-white px-6" @click="openCreate" />
      </div>
    </div>

    <!-- Stats Section -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
       <div v-for="s in stats" :key="s.label" class="group p-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <i :class="[s.icon, 'text-6xl']"></i>
          </div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ s.label }}</p>
          <h3 class="text-2xl font-black text-slate-900">{{ s.value }}</h3>
          <div class="flex items-center gap-2 mt-2">
             <span :class="['text-[10px] font-bold px-2 py-0.5 rounded-full', s.color]">{{ s.sub || 'Status Aktif' }}</span>
          </div>
       </div>
    </div>

    <!-- Main List Area -->
    <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col">
       <div class="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/10">
          <div class="flex-1">
             <h2 class="text-[13px] font-black text-slate-900 uppercase tracking-widest">Daftar Tindakan CAPA</h2>
             <p class="text-xs text-slate-500 font-medium">Pelacakan implementasi tindakan korektif dan preventif.</p>
          </div>
          <div class="flex items-center gap-4">
             <div class="relative">
                <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                <InputText v-model="filters.search" placeholder="Cari CAPA..." class="pl-9 text-xs rounded-full border-slate-200 w-64 bg-slate-50/50" @input="loadCapas" />
             </div>
             <SelectButton v-model="filters.status" :options="['ALL', 'OPEN', 'IMPLEMENTING', 'CLOSED']" class="p-button-sm text-[10px] font-black uppercase" />
          </div>
       </div>

       <DataTable :value="capas" dataKey="id" class="p-datatable-sm w-full" :loading="loading">
          <Column field="code" header="KODE CAPA" class="pl-8">
             <template #body="{ data }">
                <div class="flex flex-col">
                   <span class="text-[11px] font-black text-slate-800 font-mono">{{ data.code }}</span>
                   <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{{ data.sourceNcr?.code || 'Manual / Audit' }}</span>
                </div>
             </template>
          </Column>
          <Column header="DESKRIPSI TINDAKAN">
             <template #body="{ data }">
                <div class="flex flex-col max-w-sm">
                   <span class="text-[11px] font-bold text-slate-700 truncate">{{ data.description }}</span>
                   <span class="text-[10px] text-slate-400 italic">Target: {{ formatDate(data.targetDate) }}</span>
                </div>
             </template>
          </Column>
          <Column header="PENANGGUNG JAWAB">
             <template #body="{ data }">
                <div class="flex items-center gap-2">
                   <div class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400 uppercase">{{ data.assignedTo?.name?.[0] || '?' }}</div>
                   <span class="text-[11px] font-bold text-slate-600">{{ data.assignedTo?.name || 'Unassigned' }}</span>
                </div>
             </template>
          </Column>
          <Column header="TYPE" class="text-center">
             <template #body="{ data }">
                <div class="flex flex-col gap-1">
                   <span class="text-[8px] font-black bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded uppercase tracking-tighter border border-blue-100">Corrective</span>
                   <span class="text-[8px] font-black bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded uppercase tracking-tighter border border-emerald-100">Preventive</span>
                </div>
             </template>
          </Column>
          <Column header="STATUS">
             <template #body="{ data }">
                <span :class="['px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest', getStatusClass(data.status)]">
                   {{ data.status.replace('_', ' ') }}
                </span>
             </template>
          </Column>
          <Column class="text-right pr-8">
             <template #body="{ data }">
                <div class="flex gap-2 justify-end">
                   <Button icon="pi pi-directions-alt" severity="secondary" rounded text @click="openView(data)" />
                </div>
             </template>
          </Column>
       </DataTable>
    </div>

    <!-- Action Dialog (Premium Style) -->
    <Dialog v-model:visible="drawerVisible" modal class="w-[800px]" :pt="{ mask: { class: 'backdrop-blur-sm bg-black/20' }, content: { class: 'p-0 rounded-xl overflow-hidden' }, header: { class: 'hidden' } }">
      <div class="flex items-center justify-between p-8 border-b border-slate-100 bg-white shadow-sm">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-emerald-900 flex items-center justify-center text-white shadow-xl">
            <i class="pi pi-shield text-xl"></i>
          </div>
          <div>
            <h4 class="text-xl font-black text-slate-900 leading-tight">{{ isNew ? 'Registrasi CAPA Baru' : `Update CAPA: ${activeCapa?.code}` }}</h4>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Continuous Improvement Lifecycle</p>
          </div>
        </div>
        <Button icon="pi pi-times" severity="secondary" rounded text @click="drawerVisible = false" />
      </div>

      <div class="p-8 space-y-8 max-h-[70vh] overflow-y-auto bg-slate-50/30">
        
        <!-- Creation Reference Selection (New Only) -->
        <div v-if="isNew" class="space-y-4">
           <div class="flex items-center gap-3">
             <div class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs">0</div>
             <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Sumber Referensi</h4>
           </div>
           <div class="grid grid-cols-3 gap-4">
              <div v-for="opt in referenceOptions" :key="opt.id" class="p-4 rounded-2xl border transition-all cursor-pointer flex flex-col items-center gap-2 group" :class="referenceType === opt.id ? 'bg-emerald-600 border-emerald-500 shadow-lg shadow-emerald-100' : 'bg-white border-slate-200 hover:border-emerald-300'" @click="setReferenceType(opt.id)">
                 <i :class="[opt.icon, 'text-xl', referenceType === opt.id ? 'text-white' : 'text-slate-400 group-hover:text-emerald-500']"></i>
                 <span class="text-[10px] font-black uppercase tracking-widest" :class="referenceType === opt.id ? 'text-white' : 'text-slate-600'">{{ opt.label }}</span>
              </div>
           </div>

           <!-- Reference Content -->
           <div v-if="referenceType !== 'NONE'" class="animate-fade-in">
              <div v-if="referenceType === 'NCR'" class="space-y-2">
                 <label class="text-[10px] font-black text-slate-400 uppercase">Pilih Laporan NCR (Aktif)</label>
                 <Select v-model="selectedReferenceId" :options="ncrs" optionLabel="code" optionValue="id" placeholder="Cari Kode NCR..." class="w-full text-xs font-bold rounded-xl" filter @change="onNcrSelect">
                    <template #option="slotProps">
                       <div class="flex flex-col">
                          <span class="text-xs font-black">{{ slotProps.option.code }}</span>
                          <span class="text-[10px] text-slate-400 truncate">{{ slotProps.option.description }}</span>
                       </div>
                    </template>
                 </Select>
              </div>
              <div v-if="referenceType === 'AUDIT'" class="space-y-2">
                 <label class="text-[10px] font-black text-slate-400 uppercase">Pilih Temuan Audit (Event Log)</label>
                 <Select v-model="selectedReferenceId" :options="audits" optionLabel="id" optionValue="id" placeholder="Cari Event Audit..." class="w-full text-xs font-bold rounded-xl" filter @change="onAuditSelect">
                    <template #option="slotProps">
                       <div class="flex flex-col">
                          <span class="text-xs font-black">{{ slotProps.option.action }} - {{ slotProps.option.entity }}</span>
                          <span class="text-[10px] text-slate-400">{{ formatDate(slotProps.option.createdAt) }}</span>
                       </div>
                    </template>
                 </Select>
              </div>
           </div>
        </div>

        <!-- Section: Investigation -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs">1</div>
            <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Deskripsi & Akar Masalah</h4>
          </div>
          <div class="grid grid-cols-1 gap-6">
             <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase">Deskripsi Temuan</label>
                <Textarea v-model="form.description" rows="2" class="w-full rounded-2xl text-xs font-bold border-slate-200 outline-none p-4" placeholder="Jelaskan masalah yang ditemukan..." />
             </div>
             <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase">Akar Masalah (Root Cause Analysis)</label>
                <Textarea v-model="form.rootCause" rows="2" class="w-full rounded-2xl text-xs font-bold border-slate-200 outline-none p-4 bg-slate-50" placeholder="Mengapa masalah ini bisa terjadi? (e.g. 5-Why analysis...)" />
             </div>
          </div>
        </div>

        <!-- Section: Actions -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs">2</div>
            <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Corrective & Preventive Actions</h4>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div class="p-6 rounded-3xl border border-blue-100 bg-blue-50/30 space-y-3">
                <div class="flex items-center gap-2">
                   <div class="w-2 h-2 rounded-full bg-blue-500"></div>
                   <span class="text-[10px] font-black uppercase text-blue-600 tracking-widest">Corrective Action</span>
                </div>
                <Textarea v-model="form.correctiveAction" rows="3" class="w-full bg-transparent border-none text-xs font-bold outline-none" placeholder="Tindakan langsung untuk membereskan masalah..." />
             </div>
             
             <div class="p-6 rounded-3xl border border-emerald-100 bg-emerald-50/30 space-y-3">
                <div class="flex items-center gap-2">
                   <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
                   <span class="text-[10px] font-black uppercase text-emerald-600 tracking-widest">Preventive Action</span>
                </div>
                <Textarea v-model="form.preventiveAction" rows="3" class="w-full bg-transparent border-none text-xs font-bold outline-none" placeholder="Tindakan sistemik agar masalah tidak terulang..." />
             </div>
          </div>
        </div>

        <!-- Section: Assignment -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs">3</div>
            <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Penugasan & Target</h4>
          </div>
          <div class="grid grid-cols-2 gap-6">
             <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase">Person In Charge (PIC)</label>
                <Select v-model="form.assignedToId" :options="users" optionLabel="name" optionValue="id" placeholder="Pilih Penanggung Jawab..." class="w-full text-xs font-bold rounded-xl" filter />
             </div>
             <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase">Target Penyelesaian</label>
                <InputText v-model="form.targetDate" type="date" class="w-full rounded-xl text-xs font-bold h-10 border-slate-200" />
             </div>
          </div>
        </div>

        <!-- Progress Tracking (View Mode Only) -->
        <div v-if="!isNew" class="space-y-4">
           <div class="flex items-center gap-3">
             <div class="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-white text-xs">4</div>
             <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Update Implementasi</h4>
           </div>
           <div class="grid grid-cols-1 gap-4">
              <div class="space-y-2">
                 <label class="text-[10px] font-black text-slate-400 uppercase">Status Saat Ini</label>
                 <SelectButton v-model="form.status" :options="['OPEN', 'IMPLEMENTING', 'VERIFYING', 'CLOSED']" class="p-button-sm text-[8px] font-black uppercase" />
              </div>
              <div class="space-y-2">
                 <label class="text-[10px] font-black text-slate-400 uppercase">Findings / Bukti Implementasi</label>
                 <Textarea v-model="form.findings" rows="3" class="w-full rounded-2xl text-xs font-bold border-slate-200 p-4" placeholder="Masukkan hasil verifikasi tindakan..." />
              </div>
           </div>
        </div>
      </div>

      <div class="p-8 border-t border-slate-100 bg-white flex justify-end gap-3 rounded-b-[2.5rem] shadow-sm">
        <Button label="Batal" severity="secondary" text @click="drawerVisible = false" class="font-black text-[10px] uppercase px-6" />
        <Button :label="isNew ? 'Submit Registrasi CAPA' : 'Update Progres CAPA'" icon="pi pi-check-circle" class="p-button-rounded font-black text-[10px] uppercase px-8 bg-emerald-600 border-none text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700 h-12" @click="saveCapa" :loading="saving" />
      </div>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import { useApi } from '@/composables/useApi';

const api = useApi();
const toast = useToast();

const loading = ref(false);
const saving = ref(false);
const drawerVisible = ref(false);
const isNew = ref(false);

const activeCapa = ref<any>(null);
const capas = ref<any[]>([]);

const stats = computed(() => [
  { label: 'Total Registrasi', value: capas.value.length, icon: 'pi pi-folder', color: 'bg-slate-100 text-slate-600' },
  { label: 'Masih Terbuka', value: capas.value.filter(c => c.status === 'OPEN').length, icon: 'pi pi-exclamation-circle', color: 'bg-rose-50 text-rose-600', sub: 'Urgent' },
  { label: 'Dalam Progres', value: capas.value.filter(c => c.status === 'IMPLEMENTING').length, icon: 'pi pi-cog', color: 'bg-blue-50 text-blue-600' },
  { label: 'Tuntas (Closed)', value: capas.value.filter(c => c.status === 'CLOSED').length, icon: 'pi pi-check-circle', color: 'bg-emerald-50 text-emerald-600' }
]);

// References
const ncrs = ref<any[]>([]);
const audits = ref<any[]>([]);
const users = ref<any[]>([]);

const referenceType = ref('NONE');
const selectedReferenceId = ref('');

const referenceOptions = [
  { id: 'NONE', label: 'Manual / Ad-Hoc', icon: 'pi pi-pencil' },
  { id: 'NCR', label: 'NCR Reference', icon: 'pi pi-exclamation-triangle' },
  { id: 'AUDIT', label: 'Audit Finding', icon: 'pi pi-history' }
];

const filters = reactive({
  status: 'ALL',
  search: ''
});

const form = reactive({
  code: '',
  description: '',
  rootCause: '',
  correctiveAction: '',
  preventiveAction: '',
  targetDate: '',
  assignedToId: '',
  sourceNcrId: '',
  status: 'OPEN',
  findings: ''
});

async function loadCapas() {
  loading.value = true;
  try {
    const params: any = { ...filters };
    if (params.status === 'ALL') delete params.status;
    const res = await api.get('/qms/capa', { params });
    capas.value = res.data.list;
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Error', detail: e.message });
  } finally {
    loading.value = false;
  }
}

async function loadReferences() {
  try {
    const [ncrRes, auditRes, userRes] = await Promise.all([
      api.get('/qms/ncr?status=OPEN'),
      api.get('/qms/capa/references/audits'),
      api.get('/qms/capa/references/users')
    ]);
    ncrs.value = ncrRes.data.list || [];
    audits.value = auditRes.data.findings || [];
    users.value = userRes.data.users || [];
  } catch (e) {
    console.error('Failed to load references', e);
  }
}

function openCreate() {
  isNew.value = true;
  activeCapa.value = null;
  resetForm();
  form.code = `CAPA-${new Date().getTime().toString().slice(-6)}`;
  loadReferences();
  drawerVisible.value = true;
}

function openView(capa: any) {
  isNew.value = false;
  activeCapa.value = capa;
  loadReferences(); // To populate user dropdown
  
  Object.assign(form, {
     code: capa.code,
     description: capa.description,
     rootCause: capa.rootCause,
     correctiveAction: capa.correctiveAction,
     preventiveAction: capa.preventiveAction,
     targetDate: capa.targetDate ? capa.targetDate.split('T')[0] : '',
     assignedToId: capa.assignedToId,
     sourceNcrId: capa.sourceNcrId,
     status: capa.status,
     findings: capa.findings || ''
  });
  
  drawerVisible.value = true;
}

function resetForm() {
  Object.assign(form, {
    code: '',
    description: '',
    rootCause: '',
    correctiveAction: '',
    preventiveAction: '',
    targetDate: '',
    assignedToId: '',
    sourceNcrId: '',
    status: 'OPEN',
    findings: ''
  });
  referenceType.value = 'NONE';
  selectedReferenceId.value = '';
}

function setReferenceType(type: string) {
  referenceType.value = type;
  selectedReferenceId.value = '';
}

function onNcrSelect() {
  const ncr = ncrs.value.find(n => n.id === selectedReferenceId.value);
  if (ncr) {
    form.description = ncr.description;
    form.sourceNcrId = ncr.id;
    // Try to pre-fill root cause from NCR description if possible or leave empty for investigation
  }
}

function onAuditSelect() {
  const audit = audits.value.find(a => a.id === selectedReferenceId.value);
  if (audit) {
    form.description = `Temuan Audit: [${audit.action}] pada entitas ${audit.entity}. (Ref ID: ${audit.entityId})`;
  }
}

async function saveCapa() {
  if (isNew.value && !form.description) {
     toast.add({ severity: 'warn', summary: 'Validasi', detail: 'Deskripsi temuan wajib diisi.' });
     return;
  }
  
  saving.value = true;
  try {
    if (isNew.value) {
      await api.post('/qms/capa', form);
      toast.add({ severity: 'success', summary: 'Sukses', detail: 'CAPA berhasil diregistrasi.' });
    } else {
      await api.patch(`/qms/capa/${activeCapa.value.id}`, form);
      toast.add({ severity: 'success', summary: 'Diperbarui', detail: 'Progres CAPA telah dicatat.' });
    }
    drawerVisible.value = false;
    loadCapas();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: e.message });
  } finally {
    saving.value = false;
  }
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
};

const getStatusClass = (status: string) => {
  switch (status) {
    case 'CLOSED': return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
    case 'IMPLEMENTING': return 'bg-blue-50 text-blue-700 border border-blue-100';
    case 'VERIFYING': return 'bg-amber-50 text-amber-700 border border-amber-100';
    case 'OPEN': return 'bg-slate-50 text-slate-600 border border-slate-200';
    default: return 'bg-slate-50 text-slate-600';
  }
};

onMounted(loadCapas);
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
  background: rgba(236, 253, 245, 0.4) !important;
}

:deep(.p-datatable-tbody > tr > td) {
  padding: 1.25rem 1rem !important;
  border-bottom: 1px solid #f8fafc !important;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

:deep(.p-dropdown), :deep(.p-inputtext), :deep(.p-textarea) {
   border-color: #e2e8f0 !important;
   box-shadow: none !important;
}

:deep(.p-dropdown:hover), :deep(.p-inputtext:hover), :deep(.p-textarea:hover) {
   border-color: #10b981 !important;
}
</style>
