<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Punch List (Defects)</h1>
        <p class="text-slate-500 text-sm">Manage construction defects and punch list items for handover.</p>
      </div>
      <Button label="Report Defect" icon="pi pi-plus" @click="openDialog()" class="bg-indigo-600 hover:bg-indigo-700" />
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <div class="p-4 bg-white rounded-xl shadow-sm border border-slate-200">
        <div class="text-slate-500 text-sm font-medium mb-1">Total Defects</div>
        <div class="text-2xl font-bold text-slate-800">{{ items.length }}</div>
      </div>
      <div class="p-4 bg-white rounded-xl shadow-sm border border-slate-200">
        <div class="text-slate-500 text-sm font-medium mb-1">Open Issues</div>
        <div class="text-2xl font-bold text-rose-600">{{ items.filter(i => i.status === 'OPEN').length }}</div>
      </div>
      <div class="p-4 bg-white rounded-xl shadow-sm border border-slate-200">
        <div class="text-slate-500 text-sm font-medium mb-1">High Severity</div>
        <div class="text-2xl font-bold text-orange-500">{{ items.filter(i => i.severity === 'HIGH').length }}</div>
      </div>
      <div class="p-4 bg-white rounded-xl shadow-sm border border-slate-200">
        <div class="text-slate-500 text-sm font-medium mb-1">Resolved</div>
        <div class="text-2xl font-bold text-emerald-600">{{ items.filter(i => i.status === 'RESOLVED' || i.status === 'CLOSED').length }}</div>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
      <DataTable :value="items" :paginator="true" :rows="10" :loading="loading" stripedRows>
        <template #empty>
          <div class="p-8 text-center text-slate-500">No defects reported yet.</div>
        </template>
        <Column field="title" header="Issue">
            <template #body="{ data }">
                <div class="font-medium text-slate-800">{{ data.title }}</div>
                <div class="text-xs text-slate-500">{{ data.wbsTask?.taskName || 'General Site' }}</div>
            </template>
        </Column>
        <Column field="severity" header="Severity">
          <template #body="{ data }">
            <Tag :severity="getSeverityColor(data.severity)" :value="data.severity" class="text-xs font-bold px-2 py-1" />
          </template>
        </Column>
        <Column field="status" header="Status">
          <template #body="{ data }">
            <Tag :severity="getStatusColor(data.status)" :value="data.status" class="text-xs font-bold px-2 py-1" />
          </template>
        </Column>
        <Column field="assignedTo" header="Assigned To" />
        <Column field="createdAt" header="Reported On">
            <template #body="{ data }">
                {{ processDate(data.createdAt) }}
            </template>
        </Column>
        <Column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editItem(slotProps.data)" />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog v-model:visible="visible" :style="{ width: '450px' }" header="Defect Details" :modal="true" class="p-fluid">
      <div class="flex flex-col gap-4 mt-2">
        <div class="field">
          <label for="title" class="font-bold text-sm text-slate-700">Issue Title</label>
          <InputText id="title" v-model.trim="form.title" required="true" autofocus :class="{'p-invalid': submitted && !form.title}" />
        </div>
        <div class="field">
          <label for="desc" class="font-bold text-sm text-slate-700">Description</label>
          <Textarea id="desc" v-model="form.description" rows="3" />
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div class="field">
                <label class="font-bold text-sm text-slate-700">Severity</label>
                <Select v-model="form.severity" :options="['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']" placeholder="Select" />
            </div>
            <div class="field">
                <label class="font-bold text-sm text-slate-700">Status</label>
                <Select v-model="form.status" :options="['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED']" placeholder="Select" />
            </div>

        </div>
        <div class="field">
          <label for="assignedTo" class="font-bold text-sm text-slate-700">Assign To (Contractor)</label>
          <InputText id="assignedTo" v-model="form.assignedTo" />
        </div>
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="visible = false" />
        <Button label="Save" icon="pi pi-check" @click="saveItem" :loading="saving" />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useApi } from '@/composables/useApi';

const api = useApi();
const toast = useToast();

const items = ref([]);
const loading = ref(true);
const visible = ref(false);
const submitted = ref(false);
const saving = ref(false);
const isEdit = ref(false);

const form = ref({
  id: '',
  projectId: 'null', // will be replaced
  title: '',
  description: '',
  severity: 'MEDIUM',
  status: 'OPEN',
  assignedTo: ''
});

const loadData = async () => {
  loading.value = true;
  try {
    const res = await api.get('/construction/defects');
    items.value = res.data || [];
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};


const openDialog = () => {
  form.value = {
    id: '',
    projectId: 'ck_dummy_project_id', // Needs to come from actual state
    title: '',
    description: '',
    severity: 'MEDIUM',
    status: 'OPEN',
    assignedTo: ''
  };
  submitted.value = false;
  isEdit.value = false;
  visible.value = true;
};

const editItem = (item: any) => {
  form.value = { ...item };
  isEdit.value = true;
  visible.value = true;
};

const saveItem = async () => {
  submitted.value = true;
  if (!form.value.title) return;
  saving.value = true;

  try {
    const payload = { ...form.value };
    if(!payload.projectId || payload.projectId === 'null') {
         const res = await api.get('/projects');
         if(res.data && res.data.list && res.data.list.length > 0) payload.projectId = res.data.list[0].id;
    }

    if (isEdit.value) {
      await api.patch(`/construction/defects/${form.value.id}`, payload);
    } else {
      await api.post('/construction/defects', payload);
    }

    toast.add({ severity: 'success', summary: 'Success', detail: 'Defect saved properly', life: 3000 });
    visible.value = false;
    loadData();
  } catch (error: any) {
    toast.add({ severity: 'error', summary: 'Error', detail: error.message || 'Failed to save', life: 3000 });
  } finally {
    saving.value = false;
  }
};

onMounted(() => {
  loadData();
});

const getSeverityColor = (sev: string) => {
  switch (sev) {
    case 'CRITICAL': return 'danger';
    case 'HIGH': return 'warning';
    case 'MEDIUM': return 'info';
    case 'LOW': return 'success';
    default: return 'info';
  }
};

const getStatusColor = (stat: string) => {
  switch (stat) {
    case 'OPEN': return 'danger';
    case 'IN_PROGRESS': return 'warning';
    case 'RESOLVED': return 'success';
    case 'CLOSED': return 'secondary';
    default: return 'info';
  }
};

const processDate = (d: string) => {
    if(!d) return '-';
    return new Date(d).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' });
};
</script>
