<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Request for Inspection (RFI)</h1>
        <p class="text-slate-500 text-sm">Manage inspection requests between Contractors and Consultants.</p>
      </div>
      <Button label="New RFI" icon="pi pi-plus" @click="openDialog()" class="bg-indigo-600 hover:bg-indigo-700" />
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
      <DataTable :value="items" :paginator="true" :rows="10" :loading="loading" stripedRows>
        <template #empty>
          <div class="p-8 text-center text-slate-500">No RFI records found.</div>
        </template>
        <Column field="rfiNo" header="RFI No." class="font-mono text-sm" />
        <Column field="subject" header="Subject">
            <template #body="{ data }">
                <div class="font-medium text-slate-800 flex items-center gap-2">
                    {{ data.subject }}
                    <Tag v-if="data.isUrgent" severity="danger" value="URGENT" class="text-[10px] px-1 py-0.5" />
                </div>
            </template>
        </Column>
        <Column field="status" header="Status">
          <template #body="{ data }">
            <Tag :severity="getStatusColor(data.status)" :value="data.status" class="text-xs font-bold px-2 py-1" />
          </template>
        </Column>
        <Column field="requestedDate" header="Requested Date">
            <template #body="{ data }">
                {{ processDate(data.requestedDate) }}
            </template>
        </Column>
        <Column field="neededByDate" header="Needed By">
            <template #body="{ data }">
                <span :class="{'text-rose-500 font-bold': isOverdue(data.neededByDate, data.status)}">
                    {{ processDate(data.neededByDate) }}
                </span>
            </template>
        </Column>
        <Column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editItem(slotProps.data)" />
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Dialog -->
    <Dialog v-model:visible="visible" :style="{ width: '500px' }" header="RFI Details" :modal="true" class="p-fluid">
      <div class="flex flex-col gap-4 mt-2">
        <div class="field">
          <label class="font-bold text-sm text-slate-700">Subject</label>
          <InputText v-model.trim="form.subject" required="true" autofocus :class="{'p-invalid': submitted && !form.subject}" />
        </div>
        <div class="field">
          <label class="font-bold text-sm text-slate-700">Description</label>
          <Textarea v-model="form.description" rows="4" placeholder="Detail the inspection specifics..." />
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div class="field">
                <label class="font-bold text-sm text-slate-700">Requested Date</label>
                <DatePicker v-model="form.requestedDate" dateFormat="dd/mm/yy" />
            </div>
            <div class="field">
                <label class="font-bold text-sm text-slate-700">Needed By Date</label>
                <DatePicker v-model="form.neededByDate" dateFormat="dd/mm/yy" />
            </div>

        </div>
        <div class="grid grid-cols-2 gap-4">
            <div class="field">
                <label class="font-bold text-sm text-slate-700">Status</label>
                <Select v-model="form.status" :options="['DRAFT', 'SUBMITTED', 'IN_REVIEW', 'APPROVED', 'REJECTED', 'CLOSED']" />
            </div>

            <div class="field flex items-center pt-6 gap-2">
                <InputSwitch v-model="form.isUrgent" inputId="isUrgent" />
                <label for="isUrgent" class="font-bold text-sm text-rose-500">Mark as Urgent</label>
            </div>
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
  projectId: '',
  subject: '',
  description: '',
  requestedDate: new Date(),
  neededByDate: null,
  status: 'DRAFT',
  isUrgent: false
});

const loadData = async () => {
  loading.value = true;
  try {
    const res = await api.get('/construction/rfis');
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
    projectId: '',
    subject: '',
    description: '',
    requestedDate: new Date(),
    neededByDate: null,
    status: 'DRAFT',
    isUrgent: false
  };
  submitted.value = false;
  isEdit.value = false;
  visible.value = true;
};

const editItem = (item: any) => {
  form.value = { 
      ...item, 
      requestedDate: new Date(item.requestedDate),
      neededByDate: item.neededByDate ? new Date(item.neededByDate) : null
  };
  isEdit.value = true;
  visible.value = true;
};

const saveItem = async () => {
  submitted.value = true;
  if (!form.value.subject) return;
  saving.value = true;

  try {
    const payload = { ...form.value };
    if(!payload.projectId) {
         const res = await api.get('/projects');
         if(res.data && res.data.list && res.data.list.length > 0) payload.projectId = res.data.list[0].id;
    }

    if (isEdit.value) {
      await api.patch(`/construction/rfis/${form.value.id}`, payload);
    } else {
      await api.post('/construction/rfis', payload);
    }

    toast.add({ severity: 'success', summary: 'Success', detail: 'RFI saved successfully', life: 3000 });
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

const getStatusColor = (stat: string) => {
  switch (stat) {
    case 'DRAFT': return 'secondary';
    case 'SUBMITTED': return 'info';
    case 'IN_REVIEW': return 'warning';
    case 'APPROVED': return 'success';
    case 'REJECTED': return 'danger';
    case 'CLOSED': return 'success';
    default: return 'info';
  }
};

const processDate = (d: string) => {
    if(!d) return '-';
    return new Date(d).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' });
};

const isOverdue = (date: any, status: string) => {
    if(!date) return false;
    if(status === 'CLOSED' || status === 'APPROVED') return false;
    return new Date(date) < new Date();
}
</script>
