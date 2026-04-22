<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Weather Logs</h1>
        <p class="text-slate-500 text-sm">Track daily weather conditions and assess impact on site productivity.</p>
      </div>
      <Button label="Log Weather" icon="pi pi-cloud" @click="openDialog()" class="bg-indigo-600 hover:bg-indigo-700" />
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
      <DataTable :value="items" :paginator="true" :rows="10" :loading="loading" stripedRows>
        <template #empty>
          <div class="p-8 text-center text-slate-500">No weather logs recorded.</div>
        </template>
        <Column field="logDate" header="Log Date">
            <template #body="{ data }">
                <span class="font-medium text-slate-800">{{ processDate(data.logDate) }}</span>
            </template>
        </Column>
        <Column header="Morning">
            <template #body="{ data }">
                <div class="flex items-center gap-2">
                    <i :class="getWeatherIcon(data.morningCondition)" class="text-lg text-slate-600"></i>
                    <span class="text-sm">{{ data.morningCondition }}</span>
                </div>
            </template>
        </Column>
        <Column header="Afternoon">
            <template #body="{ data }">
                <div class="flex items-center gap-2">
                    <i :class="getWeatherIcon(data.afternoonCondition)" class="text-lg text-slate-600"></i>
                    <span class="text-sm">{{ data.afternoonCondition }}</span>
                </div>
            </template>
        </Column>
        <Column header="Impact / Delay">
          <template #body="{ data }">
            <div v-if="data.isSignificantDelay" class="text-rose-500 text-sm font-bold flex items-center gap-1">
                <i class="pi pi-exclamation-triangle"></i> Delayed
            </div>
            <div v-else class="text-emerald-500 text-sm font-medium">Normal</div>
            <div class="text-xs text-slate-500">{{ data.impactDescription }}</div>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Dialog -->
    <Dialog v-model:visible="visible" :style="{ width: '500px' }" header="Log Daily Weather" :modal="true" class="p-fluid">
      <div class="flex flex-col gap-4 mt-2">
        <div class="field">
          <label class="font-bold text-sm text-slate-700">Date</label>
          <DatePicker v-model="form.logDate" dateFormat="dd/mm/yy" :maxDate="new Date()" />
        </div>

        
        <div class="grid grid-cols-3 gap-4">
            <div class="field">
                <label class="font-bold text-sm text-slate-700">Morning</label>
                <Select v-model="form.morningCondition" :options="weatherOptions" placeholder="Select" />
            </div>
            <div class="field">
                <label class="font-bold text-sm text-slate-700">Afternoon</label>
                <Select v-model="form.afternoonCondition" :options="weatherOptions" placeholder="Select" />
            </div>
            <div class="field">
                <label class="font-bold text-sm text-slate-700">Evening</label>
                <Select v-model="form.eveningCondition" :options="weatherOptions" placeholder="Select" />
            </div>
        </div>


        <div class="field flex items-center gap-2 pt-2">
            <Checkbox v-model="form.isSignificantDelay" inputId="isDelay" :binary="true" />
            <label for="isDelay" class="font-bold text-sm text-rose-500">Weather Caused Significant Delay</label>
        </div>

        <div class="field" v-if="form.isSignificantDelay">
          <label class="font-bold text-sm text-slate-700">Impact Description</label>
          <Textarea v-model="form.impactDescription" rows="2" placeholder="Describe work stopped (e.g. Concrete pour cancelled due to heavy rain)" />
        </div>
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="visible = false" />
        <Button label="Save Log" icon="pi pi-check" @click="saveItem" :loading="saving" />
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

const items = ref<any[]>([]);
const loading = ref(true);
const visible = ref(false);
const saving = ref(false);

const weatherOptions = ['Sunny', 'Cloudy', 'Light Rain', 'Heavy Rain', 'Storm', 'Fog'];

const form = ref({
  projectId: '',
  logDate: new Date(),
  morningCondition: 'Sunny',
  afternoonCondition: 'Sunny',
  eveningCondition: 'Sunny',
  isSignificantDelay: false,
  impactDescription: ''
});

const loadData = async () => {
  loading.value = true;
  try {
    const res = await api.get('/construction/weather-logs');
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
    logDate: new Date(),
    morningCondition: 'Sunny',
    afternoonCondition: 'Sunny',
    eveningCondition: 'Sunny',
    isSignificantDelay: false,
    impactDescription: ''
  };
  visible.value = true;
};

const saveItem = async () => {
  saving.value = true;

  try {
    const payload = { ...form.value };
    if(!payload.projectId) {
         const res = await api.get('/projects');
         if(res.data && res.data.list && res.data.list.length > 0) payload.projectId = res.data.list[0].id;
    }

    await api.post('/construction/weather-logs', payload);

    toast.add({ severity: 'success', summary: 'Success', detail: 'Weather log recorded', life: 3000 });
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
    // Format to "Wed, Oct 25"
    return new Date(d).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
};

const getWeatherIcon = (cond: string) => {
    switch(cond) {
        case 'Sunny': return 'pi pi-sun text-orange-500';
        case 'Cloudy': return 'pi pi-cloud text-slate-400';
        case 'Light Rain': return 'pi pi-cloud-rain text-blue-400';
        case 'Heavy Rain': return 'pi pi-cloud-rain text-blue-600 font-bold';
        case 'Storm': return 'pi pi-bolt text-indigo-700';
        case 'Fog': return 'pi pi-align-justify text-slate-300';
        default: return 'pi pi-cloud';
    }
}
</script>
