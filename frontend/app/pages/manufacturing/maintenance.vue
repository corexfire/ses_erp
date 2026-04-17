<template>
  <div class="min-h-screen bg-slate-50/50 p-6">
    <!-- Header Section -->
    <div class="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <div class="flex items-center gap-2">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-200">
            <i class="pi pi-cog text-white text-xl animate-spin-slow"></i>
          </div>
          <h1 class="text-2xl font-black tracking-tight text-slate-800">Maintenance (CMMS)</h1>
        </div>
        <p class="mt-1 text-sm font-medium text-slate-500">Asset Management, Preventive Scheduling & Work Logs</p>
      </div>

      <div class="flex items-center gap-2">
        <Button 
          v-if="activeTab === 'assets'" 
          label="Add Equipment" 
          icon="pi pi-plus" 
          class="p-button-sm p-button-rounded shadow-sm"
          @click="openEquipmentCreate"
        />
        <Button 
          v-if="activeTab === 'requests'" 
          label="New Request" 
          icon="pi pi-bolt" 
          class="p-button-sm p-button-rounded p-button-warning shadow-sm"
          @click="openRequestCreate"
        />
        <Button 
          v-if="activeTab === 'logs'" 
          label="Manual Log" 
          icon="pi pi-file-edit" 
          class="p-button-sm p-button-rounded p-button-info shadow-sm"
          @click="openLogCreate(null)"
        />
      </div>
    </div>

    <!-- Stats Overview -->
    <div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="stat in stats" :key="stat.label" class="group relative overflow-hidden rounded-2xl border border-white bg-white/80 p-5 shadow-sm transition-all hover:shadow-md">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-[10px] font-black uppercase tracking-wider text-slate-400">{{ stat.label }}</p>
            <p class="mt-1 text-2xl font-black text-slate-800">{{ stat.value }}</p>
          </div>
          <div :class="['flex h-12 w-12 items-center justify-center rounded-xl bg-opacity-10', stat.colorClass]">
            <i :class="[stat.icon, stat.textClass, 'text-xl']"></i>
          </div>
        </div>
        <div class="mt-4 flex items-center gap-1">
          <span :class="['text-xs font-bold leading-none', stat.trendClass]">{{ stat.trend }}</span>
          <span class="text-[10px] font-medium text-slate-400">vs last month</span>
        </div>
      </div>
    </div>

    <!-- Main Navigation Tabs -->
    <div class="mb-6 flex items-center gap-1 rounded-2xl bg-slate-200/50 p-1 w-fit shadow-inner">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-black transition-all',
          activeTab === tab.id ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
        ]"
      >
        <i :class="tab.icon"></i>
        {{ tab.label }}
      </button>
    </div>

    <!-- Content Sections -->
    <div class="space-y-6">
      <!-- 1. Assets / Equipment -->
      <div v-if="activeTab === 'assets'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="eq in filteredEquipment" :key="eq.id" 
          class="group relative flex flex-col rounded-3xl border border-white bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
          <div class="absolute top-4 right-4 flex gap-1">
            <div :class="['rounded-full px-3 py-1 text-[10px] font-black tracking-widest uppercase shadow-sm', statusColors[eq.status]]">
              {{ eq.status }}
            </div>
          </div>
          
          <div class="mb-4">
            <h3 class="text-sm font-black text-slate-800 group-hover:text-indigo-600 transition-colors">{{ eq.name }}</h3>
            <p class="text-[11px] font-bold text-slate-400 uppercase leading-relaxed">{{ eq.code }} • {{ eq.type }}</p>
          </div>

          <div class="mb-6 grid grid-cols-2 gap-4 rounded-2xl bg-slate-50 p-4">
            <div>
              <p class="text-[9px] font-black uppercase text-slate-400">Criticality</p>
              <p :class="['text-xs font-black', criticalityColors[eq.criticality]]">{{ eq.criticality }}</p>
            </div>
            <div>
              <p class="text-[9px] font-black uppercase text-slate-400">Manufacturer</p>
              <p class="text-xs font-black text-slate-700">{{ eq.manufacturer || 'N/A' }}</p>
            </div>
          </div>

          <div class="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
            <div class="flex -space-x-2">
              <div v-for="i in 3" :key="i" class="h-6 w-6 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[8px] font-bold uppercase overflow-hidden">
                <img :src="`https://ui-avatars.com/api/?name=Tech+${i}&background=random`" alt="Avatar" />
              </div>
              <div class="h-6 w-6 rounded-full border-2 border-white bg-indigo-50 flex items-center justify-center text-[8px] font-black text-indigo-600">+1</div>
            </div>
            <div class="flex gap-2">
              <Button icon="pi pi-history" class="p-button-text p-button-rounded p-button-sm text-slate-400 hover:text-indigo-600" tooltip="Log History" />
              <Button icon="pi pi-pencil" class="p-button-text p-button-rounded p-button-sm text-slate-400 hover:text-indigo-600" @click="openEquipmentEdit(eq)" tooltip="Edit Asset" />
            </div>
          </div>
        </div>
        <div v-if="equipment.length === 0" class="col-span-full py-20 text-center">
          <i class="pi pi-inbox text-4xl text-slate-200"></i>
          <p class="mt-2 text-sm text-slate-400 italic">No equipment assets found.</p>
        </div>
      </div>

      <!-- 2. Work Requests -->
      <div v-if="activeTab === 'requests'" class="rounded-3xl border border-white bg-white/80 p-6 shadow-sm">
        <DataTable :value="requests" class="p-datatable-sm no-border" :rows="10" stripedRows sortField="requestDate" :sortOrder="-1">
          <Column field="code" header="CODE" class="font-black text-indigo-600" style="width: 15%"></Column>
          <Column field="equipment.name" header="EQUIPMENT" style="width: 25%">
            <template #body="{ data }">
              <div class="flex flex-col">
                <span class="text-xs font-black text-slate-700">{{ data.equipment?.name }}</span>
                <span class="text-[10px] text-slate-400 uppercase font-bold">{{ data.equipment?.code }}</span>
              </div>
            </template>
          </Column>
          <Column field="requestDate" header="DATE" style="width: 15%">
            <template #body="{ data }">
              <span class="text-xs font-medium">{{ fmtDate(data.requestDate) }}</span>
            </template>
          </Column>
          <Column field="priority" header="PRIORITY" style="width: 10%">
            <template #body="{ data }">
              <span :class="['rounded-lg px-2 py-1 text-[9px] font-black uppercase', priorityColors[data.priority]]">
                {{ data.priority }}
              </span>
            </template>
          </Column>
          <Column field="status" header="STATUS" style="width: 15%">
            <template #body="{ data }">
              <span :class="['flex items-center gap-1 text-[10px] font-black uppercase', data.status === 'OPEN' ? 'text-rose-600' : 'text-indigo-600']">
                <i :class="['pi text-[8px]', data.status === 'OPEN' ? 'pi-exclamation-circle' : 'pi-check-circle']"></i>
                {{ data.status.replace('_', ' ') }}
              </span>
            </template>
          </Column>
          <Column header="ACTION" style="width: 10%" class="text-right">
            <template #body="{ data }">
              <div class="flex justify-end gap-1">
                <Button 
                  icon="pi pi-check" 
                  class="p-button-text p-button-rounded p-button-sm p-button-success" 
                  v-if="data.status !== 'COMPLETED'"
                  @click="openLogCreate(data)"
                  v-tooltip.top="'Log Work'"
                />
                <Button icon="pi pi-pencil" class="p-button-text p-button-rounded p-button-sm" @click="openRequestEdit(data)" />
              </div>
            </template>
          </Column>
        </DataTable>
      </div>

      <!-- 3. Schedules -->
      <div v-if="activeTab === 'schedules'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="sch in schedules" :key="sch.id" class="rounded-3xl border border-white bg-white p-6 shadow-sm">
          <div class="mb-4 flex items-center justify-between">
            <div class="h-10 w-10 flex items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <i class="pi pi-calendar-times text-xl"></i>
            </div>
            <div class="text-right">
              <p class="text-[9px] font-black uppercase text-slate-400">Next Due</p>
              <p class="text-xs font-black text-rose-600">{{ fmtDate(sch.nextDate) }}</p>
            </div>
          </div>
          <h4 class="text-sm font-black text-slate-800">{{ sch.name }}</h4>
          <p class="text-[10px] font-bold text-slate-400 uppercase">{{ sch.equipment?.name }}</p>
          
          <div class="mt-4 space-y-2">
            <p class="text-[10px] font-black uppercase text-slate-500">Tasks Checklist</p>
            <div v-for="task in sch.maintenanceTasks" :key="task.id" class="flex items-start gap-2 rounded-lg bg-slate-50 p-2">
              <i class="pi pi-check-square mt-0.5 text-[10px] text-indigo-400"></i>
              <span class="text-[11px] font-medium text-slate-600 leading-tight">{{ task.description }}</span>
            </div>
          </div>

          <div class="mt-6 flex items-center justify-between">
            <span class="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{{ sch.frequency }}</span>
            <Button label="Generate Order" icon="pi pi-file-export" class="p-button-sm p-button-text text-indigo-600 font-black p-0 h-auto" />
          </div>
        </div>
      </div>

      <!-- 4. Work Logs -->
      <div v-if="activeTab === 'logs'" class="rounded-3xl border border-white bg-white p-6 shadow-sm">
         <DataTable :value="logs" class="p-datatable-sm no-border" :rows="10" stripedRows sortField="logDate" :sortOrder="-1">
          <Column field="logDate" header="DATE" style="width: 15%">
            <template #body="{ data }">
              <span class="text-xs font-black text-slate-500">{{ fmtDate(data.logDate) }}</span>
            </template>
          </Column>
          <Column field="technicianName" header="TECHNICIAN" style="width: 15%">
            <template #body="{ data }">
              <span class="text-xs font-bold text-slate-700">{{ data.technicianName }}</span>
            </template>
          </Column>
          <Column field="equipment.name" header="ASSET" style="width: 20%">
            <template #body="{ data }">
              <span class="text-xs font-black uppercase text-indigo-600">{{ data.equipment?.name }}</span>
            </template>
          </Column>
          <Column field="workType" header="TYPE" style="width: 15%">
            <template #body="{ data }">
              <span :class="['text-[10px] font-black uppercase', data.workType === 'CORRECTIVE' ? 'text-rose-500' : 'text-indigo-500']">
                {{ data.workType }}
              </span>
            </template>
          </Column>
          <Column field="totalCost" header="COST" class="text-right" style="width: 15%">
            <template #body="{ data }">
              <span class="font-mono text-xs font-black text-slate-800">{{ fmtMoney(data.totalCost) }}</span>
            </template>
          </Column>
          <Column header="SPARES" style="width: 20%">
            <template #body="{ data }">
              <div class="flex flex-wrap gap-1">
                <span v-for="p in data.parts" :key="p.id" class="text-[9px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-bold">
                  {{ p.item?.code }} ×{{ p.qtyUsed }}
                </span>
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>

    <!-- Modals -->
    <!-- 1. Equipment Modal -->
    <Dialog v-model:visible="equipmentDialogOpen" :header="equipmentEditingId ? 'Edit Equipment' : 'Add New Equipment'" position="right" :style="{ width: '450px' }" class="p-fluid rounded-header">
      <div class="space-y-4 pt-4 px-2">
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-1">
            <label class="text-[10px] font-black text-slate-400 uppercase">Code *</label>
            <InputText v-model="equipmentForm.code" :disabled="Boolean(equipmentEditingId)" placeholder="EQP-XXX" />
          </div>
          <div class="space-y-1">
            <label class="text-[10px] font-black text-slate-400 uppercase">Name *</label>
            <InputText v-model="equipmentForm.name" />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-1">
            <label class="text-[10px] font-black text-slate-400 uppercase">Serial Number</label>
            <InputText v-model="equipmentForm.serialNumber" />
          </div>
          <div class="space-y-1">
            <label class="text-[10px] font-black text-slate-400 uppercase">Criticality</label>
            <Select v-model="equipmentForm.criticality" :options="['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']" />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-1">
            <label class="text-[10px] font-black text-slate-400 uppercase">Manufacturer</label>
            <InputText v-model="equipmentForm.manufacturer" />
          </div>
          <div class="space-y-1">
            <label class="text-[10px] font-black text-slate-400 uppercase">Model</label>
            <InputText v-model="equipmentForm.model" />
          </div>
        </div>
        <div class="space-y-1">
          <label class="text-[10px] font-black text-slate-400 uppercase">Location</label>
          <InputText v-model="equipmentForm.location" />
        </div>
        <div class="space-y-1">
          <label class="text-[10px] font-black text-slate-400 uppercase">Notes</label>
          <Textarea v-model="equipmentForm.notes" rows="2" />
        </div>
      </div>
      <template #footer>
        <div class="flex gap-2 justify-end pt-4 border-t w-full">
          <Button label="Cancel" severity="secondary" @click="equipmentDialogOpen = false" class="p-button-text font-black text-xs" />
          <Button label="Save Asset" @click="saveEquipment" class="p-button-rounded font-black text-xs" />
        </div>
      </template>
    </Dialog>

    <!-- 2. Request Modal -->
    <Dialog v-model:visible="requestDialogOpen" header="Maintenance Request" :style="{ width: '400px' }" class="p-fluid">
       <div class="space-y-4 pt-4 px-2">
         <div v-if="!requestEditingId" class="space-y-3">
             <div class="space-y-1">
              <label class="text-[10px] font-black text-slate-400 uppercase">Equipment *</label>
              <Select v-model="requestForm.equipmentId" :options="equipment" optionLabel="name" optionValue="id" placeholder="Select machine" />
            </div>
            <div class="space-y-1">
              <label class="text-[10px] font-black text-slate-400 uppercase">Request Code</label>
              <InputText v-model="requestForm.code" placeholder="REQ-000" />
            </div>
            <div class="space-y-1">
              <label class="text-[10px] font-black text-slate-400 uppercase">Reported Problem</label>
              <Textarea v-model="requestForm.problem" rows="3" />
            </div>
            <div class="space-y-1">
              <label class="text-[10px] font-black text-slate-400 uppercase">Priority</label>
              <Select v-model="requestForm.priority" :options="['LOW', 'MEDIUM', 'HIGH']" />
            </div>
         </div>
         <div v-else class="space-y-3">
             <div class="space-y-1">
              <label class="text-[10px] font-black text-slate-400 uppercase">Update Status</label>
              <Select v-model="requestForm.status" :options="['OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']" />
            </div>
            <div class="space-y-1">
              <label class="text-[10px] font-black text-slate-400 uppercase">Response Notes</label>
              <Textarea v-model="requestForm.notes" rows="3" />
            </div>
         </div>
       </div>
       <template #footer>
        <div class="flex gap-2 justify-end pt-4 border-t w-full">
          <Button label="Cancel" severity="secondary" @click="requestDialogOpen = false" class="p-button-text font-black text-xs" />
          <Button label="Save Request" @click="saveRequest" class="p-button-rounded font-black text-xs" />
        </div>
      </template>
    </Dialog>

    <!-- 3. Work Log Modal (Premium) -->
    <Dialog v-model:visible="logDialogOpen" header="Work Order Execution" position="bottomright" :style="{ width: '550px' }" class="p-fluid no-padding-header">
      <div class="space-y-6 p-6 overflow-y-auto max-h-[70vh]">
        <div class="flex items-center gap-4 border-b border-indigo-50 pb-6">
          <div class="h-16 w-16 flex items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
             <i class="pi pi-briefcase text-3xl"></i>
          </div>
          <div>
            <h3 class="text-lg font-black text-slate-800">{{ logForm.equipmentName || 'Maintenance Logging' }}</h3>
            <p class="text-xs font-bold text-slate-400 uppercase">{{ logForm.workType }} WORKS</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-6">
          <div class="space-y-1">
            <label class="text-[10px] font-black text-slate-400 uppercase">Technician Name</label>
            <InputText v-model="logForm.technicianName" placeholder="Zubair..." />
          </div>
          <div class="space-y-1">
            <label class="text-[10px] font-black text-slate-400 uppercase">Actual Duration (Min)</label>
            <InputNumber v-model="logForm.durationMin" showButtons />
          </div>
        </div>

        <div class="space-y-1">
          <label class="text-[10px] font-black text-slate-400 uppercase">Labor Cost (IDR)</label>
          <InputNumber v-model="logForm.laborCost" mode="currency" currency="IDR" locale="id-ID" />
        </div>

        <div class="space-y-1">
          <label class="text-[10px] font-black text-slate-400 uppercase">Work Description / Resolution</label>
          <Textarea v-model="logForm.description" rows="3" placeholder="Describe the repair actions taken..." />
        </div>

        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <label class="text-[10px] font-black text-slate-400 uppercase">Spare Parts Consumption</label>
            <Button label="Add Part" icon="pi pi-plus" size="small" class="p-button-text p-0 h-auto font-black text-[10px] text-indigo-600" @click="addPartRow" />
          </div>
          <div v-for="(p, idx) in logForm.parts" :key="idx" class="grid grid-cols-4 gap-2 items-end border-b border-slate-50 pb-2">
            <div class="col-span-2">
               <Select v-model="p.itemId" :options="partOptions" optionLabel="label" optionValue="value" placeholder="Part..." @change="updatePartCost(idx)" />
            </div>
            <div>
              <InputNumber v-model="p.qtyUsed" placeholder="Qty" />
            </div>
            <div class="flex items-center gap-1">
               <span class="text-[10px] font-bold text-slate-400">@{{ fmtMoney(p.unitCost) }}</span>
               <Button icon="pi pi-trash" class="p-button-text p-button-rounded p-button-sm p-button-danger" @click="logForm.parts.splice(idx, 1)" />
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-slate-900/90 p-5 mt-6 shadow-xl">
           <div class="flex items-center justify-between text-white/50 text-[10px] font-black uppercase tracking-widest">
             <span>Estimated Total Cost</span>
             <span>Labor + Material</span>
           </div>
           <div class="mt-2 text-2xl font-black text-white font-mono flex items-center justify-between">
             <span>IDR</span>
             <span>{{ fmtMoney(computedTotalCost) }}</span>
           </div>
        </div>
      </div>
      <template #footer>
        <div class="flex gap-2 justify-end pt-4 border-t p-4 w-full bg-slate-50">
          <Button label="Cancel" severity="secondary" @click="logDialogOpen = false" class="p-button-text font-black text-xs" />
          <Button label="Confirm & Close Order" icon="pi pi-save" @click="saveLog" class="p-button-rounded font-black text-xs" />
        </div>
      </template>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';

const api = useApi();
const toast = useToast();

const activeTab = ref('assets');
const tabs = [
  { id: 'assets', label: 'Assets', icon: 'pi pi-server' },
  { id: 'requests', label: 'Work Requests', icon: 'pi pi-bolt' },
  { id: 'schedules', label: 'Preventive', icon: 'pi pi-calendar' },
  { id: 'logs', label: 'Histories', icon: 'pi pi-history' },
];

// Data States
const equipment = ref<any[]>([]);
const filteredEquipment = computed(() => equipment.value); // Add filtering logic here
const requests = ref<any[]>([]);
const schedules = ref<any[]>([]);
const logs = ref<any[]>([]);
const partOptions = ref<any[]>([]);

// Stats for dashboard
const stats = ref([
  { label: 'Overall Reliability', value: '96.4%', icon: 'pi pi-check-circle', colorClass: 'bg-indigo-500', textClass: 'text-indigo-600', trend: '+1.2%', trendClass: 'text-green-500' },
  { label: 'Active Breakdowns', value: '4', icon: 'pi pi-exclamation-triangle', colorClass: 'bg-rose-500', textClass: 'text-rose-600', trend: '-2', trendClass: 'text-green-500' },
  { label: 'Pending Schedules', value: '12', icon: 'pi pi-calendar', colorClass: 'bg-amber-500', textClass: 'text-amber-600', trend: '+3', trendClass: 'text-amber-500' },
  { label: 'Spare Part Stockout', value: '0', icon: 'pi pi-box', colorClass: 'bg-green-500', textClass: 'text-green-600', trend: 'Stable', trendClass: 'text-slate-400' },
]);

// Styling Helpers
const statusColors: any = { OPERATIONAL: 'bg-green-100 text-green-600', REPAIRING: 'bg-amber-100 text-amber-600', BREAKDOWN: 'bg-rose-100 text-rose-600' };
const criticalityColors: any = { LOW: 'text-slate-400', MEDIUM: 'text-indigo-600', HIGH: 'text-amber-600', CRITICAL: 'text-rose-600' };
const priorityColors: any = { LOW: 'bg-slate-100 text-slate-500', MEDIUM: 'bg-indigo-100 text-indigo-600', HIGH: 'bg-amber-100 text-amber-600' };

// Dialog States & Forms
const equipmentDialogOpen = ref(false);
const equipmentEditingId = ref<string | null>(null);
const equipmentForm = reactive({
  code: '', name: '', type: '', location: '', serialNumber: '', manufacturer: '', model: '', criticality: 'MEDIUM', notes: ''
});

const requestDialogOpen = ref(false);
const requestEditingId = ref<string | null>(null);
const requestForm = reactive({
  code: '', equipmentId: '', problem: '', priority: 'MEDIUM', status: 'OPEN', notes: ''
});

const logDialogOpen = ref(false);
const logForm = reactive({
  equipmentId: '', equipmentName: '', requestId: '', scheduleId: '', technicianName: '', workType: 'CORRECTIVE',
  durationMin: 60, description: '', laborCost: 150000, parts: [] as any[]
});

// Logic
const fmtDate = (v: any) => v ? new Date(v).toLocaleDateString() : '-';
const fmtMoney = (v: any) => Number(v).toLocaleString('id-ID');

const load = async () => {
  try {
    const [eqRes, reqRes, schRes, logRes, partRes] = await Promise.all([
      api.get('/manufacturing/maintenance/equipment'),
      api.get('/manufacturing/maintenance/requests'),
      api.get('/manufacturing/maintenance/schedules'),
      api.get('/manufacturing/maintenance/logs'),
      api.get('/inventory/items?q=SP-'), // Search for spare parts
    ]);
    equipment.value = eqRes.data?.equipment ?? [];
    requests.value = reqRes.data?.requests ?? [];
    schedules.value = schRes.data?.schedules ?? [];
    logs.value = logRes.data?.logs ?? [];
    partOptions.value = (partRes.data?.items ?? []).map((i: any) => ({ label: `${i.code} - ${i.name}`, value: i.id, cost: i.stockBalances?.[0]?.unitCost || 0 }));
    
    // Refresh stats
    stats.value[1].value = String(requests.value.filter(r => r.status === 'OPEN').length);
    stats.value[2].value = String(schedules.value.length);
  } catch (e) { console.error(e); }
};

// Equipment Actions
const openEquipmentCreate = () => {
  equipmentEditingId.value = null;
  Object.keys(equipmentForm).forEach((k: any) => (equipmentForm as any)[k] = '');
  equipmentForm.criticality = 'MEDIUM';
  equipmentDialogOpen.value = true;
};

const openEquipmentEdit = (eq: any) => {
  equipmentEditingId.value = eq.id;
  Object.keys(equipmentForm).forEach((k: any) => (equipmentForm as any)[k] = eq[k] || '');
  equipmentDialogOpen.value = true;
};

const saveEquipment = async () => {
  try {
    if (equipmentEditingId.value) {
      await api.patch(`/manufacturing/maintenance/equipment/${equipmentEditingId.value}`, equipmentForm);
    } else {
      await api.post('/manufacturing/maintenance/equipment', equipmentForm);
    }
    equipmentDialogOpen.value = false;
    toast.add({ severity: 'success', summary: 'System Updated', detail: 'Equipment saved successfully', life: 3000 });
    await load();
  } catch (e: any) { toast.add({ severity: 'error', summary: 'Error', detail: e.response?.data?.message }); }
};

// Request Actions
const openRequestCreate = () => {
  requestEditingId.value = null;
  requestForm.code = `REQ-${Date.now().toString().slice(-4)}`;
  requestForm.equipmentId = '';
  requestForm.problem = '';
  requestForm.priority = 'MEDIUM';
  requestForm.status = 'OPEN';
  requestDialogOpen.value = true;
};

const openRequestEdit = (r: any) => {
  requestEditingId.value = r.id;
  requestForm.status = r.status;
  requestForm.notes = r.notes || '';
  requestDialogOpen.value = true;
};

const saveRequest = async () => {
  try {
    if (requestEditingId.value) {
      await api.patch(`/manufacturing/maintenance/requests/${requestEditingId.value}`, requestForm);
    } else {
      await api.post('/manufacturing/maintenance/requests', { ...requestForm, requestDate: new Date() });
    }
    requestDialogOpen.value = false;
    await load();
  } catch (e: any) { toast.add({ severity: 'error', summary: 'Error', detail: e.response?.data?.message }); }
};

// Work Log Actions
const openLogCreate = (request: any) => {
  logForm.technicianName = 'Zubair'; // Auto-fill
  logForm.durationMin = 60;
  logForm.description = '';
  logForm.parts = [];
  logForm.laborCost = 150000;

  if (request) {
    logForm.equipmentId = request.equipmentId;
    logForm.equipmentName = request.equipment?.name;
    logForm.requestId = request.id;
    logForm.workType = 'CORRECTIVE';
    logForm.description = `Response to request ${request.code}: ${request.problem}`;
  } else {
    logForm.equipmentId = '';
    logForm.requestId = '';
    logForm.workType = 'PREVENTIVE';
  }
  logDialogOpen.value = true;
};

const addPartRow = () => {
  logForm.parts.push({ itemId: '', warehouseId: 'WH-MAIN', qtyUsed: 1, unitCost: 0 });
};

const updatePartCost = (idx: number) => {
  const part = partOptions.value.find(o => o.value === logForm.parts[idx].itemId);
  if (part) logForm.parts[idx].unitCost = part.cost || 0;
};

const computedTotalCost = computed(() => {
  const partsTotal = logForm.parts.reduce((sum, p) => sum + (p.qtyUsed * p.unitCost), 0);
  return (logForm.laborCost || 0) + partsTotal;
});

const saveLog = async () => {
  try {
    await api.post('/manufacturing/maintenance/logs', logForm);
    logDialogOpen.value = false;
    toast.add({ severity: 'success', summary: 'Work Completed', detail: 'Maintenance work has been logged and request closed.', life: 3000 });
    await load();
  } catch (e: any) { toast.add({ severity: 'error', summary: 'Logging Failed', detail: e.response?.data?.message }); }
};

onMounted(load);
</script>

<style scoped>
.rounded-3xl { border-radius: 1.5rem; }
.rounded-2xl { border-radius: 1.25rem; }
.rounded-xl { border-radius: 1rem; }
.animate-spin-slow { animation: spin 4s linear infinite; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

.no-border :deep(.p-datatable-thead > tr > th) {
  border-bottom: 2px solid #f1f5f9;
  background: transparent;
  padding: 1rem 0.5rem;
  font-size: 10px;
  font-weight: 800;
  color: #94a3b8;
  letter-spacing: 0.05em;
}

.no-border :deep(.p-datatable-tbody > tr > td) {
  border: none;
  padding: 1rem 0.5rem;
}

.p-button-sm {
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  font-weight: 700;
}
</style>