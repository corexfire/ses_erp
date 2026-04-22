<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Heavy Equipment Logs</h1>
        <p class="text-slate-500 text-sm">Track hours and fuel consumption for cranes, excavators, etc.</p>
      </div>
      <Button label="Add Log Entry" icon="pi pi-plus" @click="openDialog()" class="bg-indigo-600 hover:bg-indigo-700" />
    </div>

    <!-- Mini Dashboard -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="p-4 bg-white rounded-xl shadow-sm border border-slate-200">
        <div class="text-slate-500 text-sm font-medium mb-1">Total Hours Logged (Month)</div>
        <div class="text-2xl font-bold text-slate-800">{{ totalHours }} <span class="text-sm font-normal text-slate-400">hrs</span></div>
      </div>
      <div class="p-4 bg-white rounded-xl shadow-sm border border-slate-200">
        <div class="text-slate-500 text-sm font-medium mb-1">Total Fuel Consumed</div>
        <div class="text-2xl font-bold text-indigo-600">{{ totalFuel }} <span class="text-sm font-normal text-slate-400">Liters</span></div>
      </div>
      <div class="p-4 bg-white rounded-xl shadow-sm border border-slate-200">
        <div class="text-slate-500 text-sm font-medium mb-1">Avg. Consumption Rate</div>
        <div class="text-2xl font-bold text-emerald-600">{{ avgConsumption }} <span class="text-sm font-normal text-slate-400">L/hr</span></div>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
      <DataTable :value="items" :paginator="true" :rows="10" :loading="loading" stripedRows>
        <template #empty>
          <div class="p-8 text-center text-slate-500">No equipment logs recorded.</div>
        </template>
        <Column field="logDate" header="Date">
            <template #body="{ data }">
                {{ processDate(data.logDate) }}
            </template>
        </Column>
        <Column field="equipmentName" header="Equipment">
            <template #body="{ data }">
                <div class="font-medium text-slate-800">{{ data.equipmentName }}</div>
                <div class="text-xs text-slate-500">Op: {{ data.operatorName || '-' }}</div>
            </template>
        </Column>
        <Column field="hoursOperated" header="Hours">
            <template #body="{ data }">
                <span class="font-mono text-sm bg-slate-100 px-2 py-1 rounded">{{ data.hoursOperated }} hr</span>
            </template>
        </Column>
        <Column field="fuelConsumption" header="Fuel Consumed">
            <template #body="{ data }">
                <span class="font-mono text-sm bg-rose-50 text-rose-600 px-2 py-1 rounded">{{ data.fuelConsumption }} L</span>
            </template>
        </Column>
      </DataTable>
    </div>

    <!-- Dialog -->
    <Dialog v-model:visible="visible" :style="{ width: '400px' }" header="New Equipment Log" :modal="true" class="p-fluid">
      <div class="flex flex-col gap-4 mt-2">
        <div class="field">
          <label class="font-bold text-sm text-slate-700">Log Date</label>
          <DatePicker v-model="form.logDate" dateFormat="dd/mm/yy" />
        </div>

        <div class="field">
          <label class="font-bold text-sm text-slate-700">Equipment Name / Code</label>
          <InputText v-model.trim="form.equipmentName" required="true" placeholder="e.g. Tower Crane 01" autofocus :class="{'p-invalid': submitted && !form.equipmentName}" />
        </div>
        <div class="field">
          <label class="font-bold text-sm text-slate-700">Operator Name</label>
          <InputText v-model="form.operatorName" placeholder="John Doe" />
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div class="field">
                <label class="font-bold text-sm text-slate-700">Hours Operated</label>
                <InputNumber v-model="form.hoursOperated" :minFractionDigits="1" suffix=" hr" />
            </div>
            <div class="field">
                <label class="font-bold text-sm text-slate-700">Fuel Consumed</label>
                <InputNumber v-model="form.fuelConsumption" :minFractionDigits="1" suffix=" L" />
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
import { ref, onMounted, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useApi } from '@/composables/useApi';

const api = useApi();
const toast = useToast();

const items = ref<any[]>([]);
const loading = ref(true);
const visible = ref(false);
const submitted = ref(false);
const saving = ref(false);

const totalHours = computed(() => items.value.reduce((acc, val) => acc + (val.hoursOperated || 0), 0).toFixed(1));
const totalFuel = computed(() => items.value.reduce((acc, val) => acc + (val.fuelConsumption || 0), 0).toFixed(1));
const avgConsumption = computed(() => {
    const h = Number(totalHours.value);
    const f = Number(totalFuel.value);
    return h > 0 ? (f / h).toFixed(2) : '0.00';
});

const form = ref({
  projectId: '',
  equipmentName: '',
  operatorName: '',
  hoursOperated: 0,
  fuelConsumption: 0,
  logDate: new Date()
});

const loadData = async () => {
  loading.value = true;
  try {
    const res = await api.get('/construction/equipment-logs');
    items.value = res.data || [];
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};


const openDialog = () => {
  form.value = {
    projectId: '',
    equipmentName: '',
    operatorName: '',
    hoursOperated: 0,
    fuelConsumption: 0,
    logDate: new Date()
  };
  submitted.value = false;
  visible.value = true;
};

const saveItem = async () => {
  submitted.value = true;
  if (!form.value.equipmentName) return;
  saving.value = true;

  try {
    const payload = { ...form.value };
    if(!payload.projectId) {
         const res = await api.get('/projects');
         if(res.data && res.data.list && res.data.list.length > 0) payload.projectId = res.data.list[0].id;
    }

    await api.post('/construction/equipment-logs', payload);

    toast.add({ severity: 'success', summary: 'Success', detail: 'Equipment log saved', life: 3000 });
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

const processDate = (d: string) => {
    if(!d) return '-';
    return new Date(d).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' });
};
</script>
