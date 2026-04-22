<template>
  <div class="space-y-6 animate-fade-in pb-12">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
      <div>
        <h1 class="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <i class="pi pi-file-edit text-indigo-600 bg-indigo-50 p-2 rounded-xl"></i>
          Change <span class="text-indigo-600">Orders</span>
        </h1>
        <p class="text-slate-500 font-medium mt-1">Manage project scope variations, budget shifts, and schedule ammendments.</p>
      </div>
      <div class="flex gap-2">
        <Button label="Propose Change Order" icon="pi pi-plus" class="font-bold text-xs rounded-xl h-11 bg-slate-900 border-none shadow-xl" @click="showProposeCO = true" />
      </div>
    </div>

    <!-- Filter & Project Selection -->
    <div class="bg-white p-4 rounded-3xl border border-slate-50 shadow-sm flex flex-col md:flex-row gap-4 items-center">
       <div class="w-full md:w-auto">
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Target Project</label>
          <Select v-model="selectedProjectId" :options="projects" optionLabel="name" optionValue="id" placeholder="Select Project" class="w-full md:w-72 rounded-xl border-slate-100" @change="loadCOs" />
       </div>
       <div class="flex-1 flex gap-8">
          <div>
             <div class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Approved Variance</div>
             <div class="text-xl font-black text-emerald-600 font-mono">{{ formatCurrency(totalApprovedCO) }}</div>
          </div>
          <div class="w-px h-10 bg-slate-100"></div>
          <div>
             <div class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Schedule Impact</div>
             <div class="text-xl font-black text-amber-500 font-mono">+{{ totalDaysImpact }} Days</div>
          </div>
       </div>
    </div>

    <!-- CO List -->
    <div class="bg-white rounded-3xl border border-slate-50 shadow-sm overflow-hidden">
       <DataTable :value="cos" class="p-datatable-sm" :rows="10">
          <Column field="orderNo" header="CO Number" class="text-[11px] font-black text-slate-500 uppercase tracking-tighter" />
          <Column field="title" header="Title" class="font-bold text-slate-800">
             <template #body="{ data }">
                <div class="flex flex-col">
                   <span class="text-sm font-black">{{ data.title }}</span>
                   <span class="text-[10px] text-slate-400">{{ data.description }}</span>
                </div>
             </template>
          </Column>
          <Column field="amountChange" header="Value Impact" class="text-right">
             <template #body="{ data }">
                <span :class="data.amountChange >= 0 ? 'text-emerald-600' : 'text-rose-600'" class="font-black text-xs">
                   {{ data.amountChange >= 0 ? '+' : '' }}{{ formatCurrency(data.amountChange) }}
                </span>
             </template>
          </Column>
          <Column field="scheduleImpact" header="Schedule" class="text-center">
             <template #body="{ data }">
                <span class="bg-amber-50 text-amber-600 px-2 py-1 rounded-lg text-[10px] font-black">+{{ data.scheduleImpact }}d</span>
             </template>
          </Column>
          <Column field="status" header="Status">
             <template #body="{ data }">
                <span :class="statusBadge(data.status)" class="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                   {{ data.status }}
                </span>
             </template>
          </Column>
          <Column header="Actions" class="text-right">
             <template #body>
                <Button icon="pi pi-ellipsis-v" text rounded size="small" class="text-slate-400" />
             </template>
          </Column>
       </DataTable>
       <div v-if="!cos.length" class="flex flex-col items-center justify-center py-24 text-slate-300">
          <i class="pi pi-file-excel text-6xl mb-4"></i>
          <p class="font-black text-xs uppercase tracking-widest">No change orders found for this project</p>
       </div>
    </div>

    <!-- Propose CO Dialog -->
    <Dialog v-model:visible="showProposeCO" modal header="Propose Scope Variation (CO)" :style="{ width: '500px' }" class="rounded-3xl p-4 custom-dialog">
       <div class="space-y-6 pt-4">
          <div class="space-y-2">
             <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Variation Title</label>
             <input v-model="newCO.title" class="w-full h-12 border-none rounded-2xl px-4 bg-slate-50 font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-100" placeholder="e.g. Additional Site Lighting" />
          </div>
          <div class="grid grid-cols-2 gap-4">
             <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Budget Impact (IDR)</label>
                <InputNumber v-model="newCO.amountChange" class="w-full custom-input-number" mode="currency" currency="IDR" locale="id-ID" />
             </div>
             <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Schedule Impact (Days)</label>
                <InputNumber v-model="newCO.scheduleImpact" class="w-full custom-input-number" />
             </div>
          </div>
          <div class="space-y-2">
             <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Justification / Detail</label>
             <Textarea v-model="newCO.description" rows="3" class="w-full border-none rounded-2xl p-4 bg-slate-50 font-bold text-sm" placeholder="Why is this change necessary?" />
          </div>
          <Button label="Submit for Approval" @click="submitCO" :loading="saving" class="w-full h-14 bg-indigo-600 border-none font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-indigo-100" />
       </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const projects = ref<any[]>([]);
const selectedProjectId = ref<string | null>(null);
const cos = ref<any[]>([]);
const showProposeCO = ref(false);
const saving = ref(false);

const newCO = reactive({
    title: '',
    description: '',
    amountChange: 0,
    scheduleImpact: 0
});

const totalApprovedCO = computed(() => {
    return cos.value.filter(c => c.status === 'APPROVED').reduce((acc, c) => acc + Number(c.amountChange), 0);
});

const totalDaysImpact = computed(() => {
    return cos.value.filter(c => c.status === 'APPROVED').reduce((acc, c) => acc + Number(c.scheduleImpact), 0);
});

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
};

const statusBadge = (s: string) => ({
    'bg-emerald-50 text-emerald-600': s === 'APPROVED',
    'bg-amber-50 text-amber-600': s === 'PENDING' || s === 'SUBMITTED',
    'bg-rose-50 text-rose-600': s === 'REJECTED',
    'bg-slate-100 text-slate-400': s === 'DRAFT'
});

const loadProjects = async () => {
    try {
        const res = await api.get('/project/projects');
        projects.value = res.data.data || [];
        if (projects.value.length > 0) {
            const premiumPrj = projects.value.find((p: any) => p.code === 'PRJ-2026-MG-001');
            selectedProjectId.value = premiumPrj ? premiumPrj.id : projects.value[0].id;
            await loadCOs();
        }
    } catch (e) { console.error(e); }
};

const loadCOs = async () => {
    if (!selectedProjectId.value) return;
    const res = await api.get(`/project/expansion/${selectedProjectId.value}/change-orders`);
    cos.value = res.data.changeOrders;
};

const submitCO = async () => {
    if (!selectedProjectId.value) return;
    saving.value = true;
    try {
        await api.post(`/project/expansion/${selectedProjectId.value}/change-orders`, newCO);
        showProposeCO.value = false;
        await loadCOs();
    } catch (e) { console.error(e); }
    finally { saving.value = false; }
};

onMounted(loadProjects);
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

:deep(.custom-input-number .p-inputtext) {
    background: #f8fafc !important;
    border: none !important;
    border-radius: 16px !important;
    height: 48px;
    font-weight: 700;
}
</style>
