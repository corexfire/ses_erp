<template>
  <div class="p-6 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-8 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500">
      <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-indigo-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Automations</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Workflow Engine</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase tracking-tighter">Workflow <span class="text-indigo-600">Designer</span></h1>
        <p class="text-slate-500 text-sm font-medium uppercase italic tracking-tight">Rancang dan kelola alur persetujuan dokumen lintas departemen secara otomatis.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="load" :loading="loading" />
        <Button label="Buat Alur Baru" icon="pi pi-plus" class="p-button-rounded font-black text-xs shadow-lg shadow-indigo-100 px-6 bg-indigo-600 border-indigo-600" @click="openNew" />
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

    <!-- Main List Area -->
    <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:border-indigo-300 transition-all duration-500">
       <div class="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/10">
          <div>
             <h2 class="text-[13px] font-black text-slate-900 uppercase tracking-widest">Definisi Workflow Aktif</h2>
             <p class="text-xs text-slate-500 font-medium italic">Dataset alur kerja yang terintegrasi dengan modul operasional.</p>
          </div>
          <div class="flex items-center gap-3">
             <span class="p-input-icon-left">
                <i class="pi pi-search text-slate-400"></i>
                <InputText v-model="q" placeholder="Cari Workflow..." class="p-inputtext-sm rounded-xl border-slate-200 w-64 font-bold text-xs" />
             </span>
          </div>
       </div>

       <DataTable :value="workflows" dataKey="id" class="p-datatable-sm w-full" :loading="loading">
          <Column field="name" header="NAMA WORKFLOW" class="pl-8">
             <template #body="{ data }">
                <div class="flex flex-col">
                   <span class="text-[12px] font-black text-slate-800 uppercase tracking-tight">{{ data.name }}</span>
                   <span class="text-[9px] font-bold text-slate-400 italic">ID: {{ data.id }}</span>
                </div>
             </template>
          </Column>
          <Column header="MODUL / TIPE">
             <template #body="{ data }">
                <div class="flex items-center gap-2">
                   <span class="text-[10px] font-black text-indigo-700 bg-indigo-50 px-2 py-1 rounded border border-indigo-100 uppercase">{{ data.moduleKey }}</span>
                   <i class="pi pi-arrow-right text-[10px] text-slate-300"></i>
                   <span class="text-[10px] font-black text-slate-600 bg-slate-100 px-2 py-1 rounded border border-slate-200 uppercase">{{ data.docType }}</span>
                </div>
             </template>
          </Column>
          <Column header="APPROVERS">
             <template #body="{ data }">
                <div class="flex -space-x-2">
                   <div v-for="(step, idx) in data.steps" :key="idx" class="w-8 h-8 rounded-full bg-white border-2 border-slate-50 flex items-center justify-center text-[10px] font-black shadow-sm" v-tooltip.top="step.role?.name || step.name">
                      {{ idx + 1 }}
                   </div>
                   <div v-if="!data.steps?.length" class="text-[10px] font-bold text-slate-400 italic">No steps defined</div>
                </div>
             </template>
          </Column>
          <Column header="STATUS">
             <template #body="{ data }">
                <span :class="['px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest', data.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400']">
                   {{ data.isActive ? 'Active' : 'Inactive' }}
                </span>
             </template>
          </Column>
          <Column class="text-right pr-8">
             <template #body="{ data }">
                <div class="flex gap-2 justify-end">
                   <Button icon="pi pi-pencil" severity="secondary" rounded text @click="edit(data)" />
                   <Button icon="pi pi-trash" severity="danger" rounded text @click="remove(data)" />
                </div>
             </template>
          </Column>
       </DataTable>
    </div>

    <!-- Management Designer Dialog -->
    <Dialog v-model:visible="designerOpen" :header="editingId ? 'Edit Configuration' : 'Design New Workflow'" :modal="true" :dismissableMask="false" class="w-[850px] border-none shadow-2xl overflow-hidden glass-dialog">
       <div class="space-y-8 pt-4 px-2 pb-12 custom-scrollbar max-h-[70vh] overflow-y-auto">
          <!-- Step 1: Definition Identity -->
          <div class="space-y-4">
             <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-black">1</div>
                <h4 class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Definition Root</h4>
             </div>
             <div class="grid grid-cols-3 gap-4">
                <div class="col-span-1 space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Workflow Name</label>
                   <InputText v-model="form.name" class="w-full rounded-xl font-bold" placeholder="e.g. Finance Approval Flow" />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Module Key</label>
                   <Dropdown v-model="form.moduleKey" :options="moduleOptions" placeholder="Select Module" class="w-full rounded-xl text-xs font-bold" />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Document Type</label>
                   <InputText v-model="form.docType" class="w-full rounded-xl uppercase font-mono" placeholder="PO / SO / INV" />
                </div>
             </div>
          </div>

          <!-- Step 2: Approval Steps -->
          <div class="space-y-6">
             <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                   <div class="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-black">2</div>
                   <h4 class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Chain of Comando (Steps)</h4>
                </div>
                <Button label="Add Approval Step" icon="pi pi-plus" text class="text-[10px] font-black uppercase tracking-widest" @click="addStep" />
             </div>

             <div class="space-y-3">
                <div v-for="(step, idx) in form.steps" :key="idx" class="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100 items-start group relative transition-all hover:bg-white hover:shadow-lg hover:border-indigo-100">
                   <div class="flex flex-col items-center gap-2 pt-2">
                       <span class="text-[10px] font-black text-slate-400 uppercase">Step</span>
                       <div class="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-lg border border-indigo-200">
                          {{ idx + 1 }}
                       </div>
                   </div>

                   <div class="grid grid-cols-12 gap-4 flex-1">
                      <div class="col-span-4 space-y-1">
                         <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Step Name / Label</label>
                         <InputText v-model="step.name" class="w-full rounded-xl text-xs font-bold" placeholder="Reviewer Level" />
                      </div>
                      <div class="col-span-5 space-y-1">
                         <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Target Role (Approver)</label>
                         <Dropdown v-model="step.roleId" :options="roles" optionLabel="name" optionValue="id" placeholder="Select Authority" class="w-full rounded-xl text-xs font-bold" />
                      </div>
                      <div class="col-span-2 space-y-1">
                         <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest">SLA (Hours)</label>
                         <InputNumber v-model="step.slaHours" class="w-full [&_input]:rounded-xl text-xs font-bold" />
                      </div>
                      <div class="col-span-1 pt-6 flex justify-end">
                         <Button icon="pi pi-times" severity="danger" text rounded @click="form.steps.splice(idx, 1)" />
                      </div>
                   </div>
                   
                   <!-- Connector Arrow for continuous visual flow -->
                   <div v-if="idx < form.steps.length - 1" class="absolute -bottom-6 left-12 z-10 w-0.5 h-6 bg-slate-200"></div>
                </div>

                <div v-if="!form.steps.length" class="p-12 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 gap-4">
                   <i class="pi pi-sitemap text-4xl opacity-20"></i>
                   <p class="text-[10px] font-black uppercase tracking-widest">No approval levels defined yet.</p>
                </div>
             </div>
          </div>
       </div>

       <template #footer>
          <div class="flex justify-between items-center p-4 border-t bg-white w-full px-8">
             <div class="flex items-center gap-2">
                <ToggleSwitch v-model="form.isActive" />
                <span class="text-[10px] font-black uppercase text-slate-500">Active Status</span>
             </div>
             <div class="flex gap-4">
                <Button label="Cancel" severity="secondary" text @click="designerOpen = false" class="font-black text-[10px] uppercase tracking-widest px-6" />
                <Button label="Save Definition" icon="pi pi-save" class="p-button-rounded bg-indigo-600 border-indigo-600 font-black text-[10px] uppercase tracking-widest px-10 shadow-xl shadow-indigo-100" @click="save" :loading="saving" />
             </div>
          </div>
       </template>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';

const api = useApi();
const toast = useToast();

const workflows = ref<any[]>([]);
const roles = ref<any[]>([]);
const loading = ref(false);
const saving = ref(false);
const designerOpen = ref(false);
const editingId = ref('');
const q = ref('');

const form = ref<any>({
  name: '',
  moduleKey: '',
  docType: '',
  isActive: true,
  steps: []
});

const moduleOptions = [
  'PROCUREMENT', 'SALES', 'FINANCE', 'HRM', 'INVENTORY', 'MANUFACTURING', 'QUALITY', 'PROJECT'
];

const stats = computed(() => [
  { label: 'Active Automations', value: workflows.value.filter(w => w.isActive).length, sub: 'In Operation', icon: 'pi pi-bolt', color: 'bg-indigo-50 text-indigo-600' },
  { label: 'Total Definitions', value: workflows.value.length, sub: 'System Wide', icon: 'pi pi-sitemap', color: 'bg-slate-50 text-slate-600' },
  { label: 'Modules Covered', value: new Set(workflows.value.map(w => w.moduleKey)).size, sub: 'Integration Points', icon: 'pi pi-box', color: 'bg-blue-50 text-blue-600' },
  { label: 'Avg. Steps', value: workflows.value.length ? (workflows.value.reduce((s, w) => s + (w.steps?.length || 0), 0) / workflows.value.length).toFixed(1) : 0, sub: 'Levels of Approval', icon: 'pi pi-list', color: 'bg-emerald-50 text-emerald-600' }
]);

async function load() {
  loading.value = true;
  try {
    const [wRes, rRes] = await Promise.all([
      api.get('/workflow/definitions'),
      api.get('/core/roles')
    ]);
    workflows.value = wRes.data || [];
    roles.value = rRes.data?.roles || rRes.data || [];
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Failed to load', detail: e.message });
  } finally {
    loading.value = false;
  }
}

function openNew() {
  editingId.value = '';
  form.value = {
    name: '',
    moduleKey: '',
    docType: '',
    isActive: true,
    steps: []
  };
  designerOpen.value = true;
}

function addStep() {
  form.value.steps.push({
    name: '',
    roleId: '',
    slaHours: 24
  });
}

async function edit(data: any) {
  editingId.value = data.id;
  // Get detailed definition with rules/steps
  try {
    const res = await api.get(`/workflow/definitions/${data.id}`);
    const def = res.data;
    form.value = { 
        ...def, 
        steps: def.steps?.map((s: any) => ({
            name: s.name,
            roleId: s.roleId,
            slaHours: s.slaHours
        })) || [] 
    };
    designerOpen.value = true;
  } catch (e) {}
}

async function save() {
  if (!form.value.name || !form.value.moduleKey || !form.value.docType) {
    toast.add({ severity: 'warn', summary: 'Validation', detail: 'Please complete all header fields.' });
    return;
  }

  saving.value = true;
  try {
    if (editingId.value) {
      await api.put(`/workflow/definitions/${editingId.value}`, form.value);
    } else {
      await api.post('/workflow/definitions', form.value);
    }
    toast.add({ severity: 'success', summary: 'Success', detail: 'Workflow configuration saved successfully.' });
    designerOpen.value = false;
    load();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Save Failed', detail: e.message });
  } finally {
    saving.value = false;
  }
}

async function remove(data: any) {
  if (!confirm('Are you sure you want to permanently delete this workflow definition?')) return;
  try {
    await api.delete(`/workflow/definitions/${data.id}`);
    toast.add({ severity: 'info', summary: 'Deleted', detail: 'Workflow discarded.' });
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

:deep(.p-dropdown), :deep(.p-inputtext), :deep(.p-inputnumber-input) {
    @apply border-slate-200 focus:border-indigo-400 focus:ring-indigo-100 placeholder:text-slate-300;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-slate-200 rounded-full;
}

.glass-dialog {
    background: rgba(255, 255, 255, 0.95) !important;
}
</style>
