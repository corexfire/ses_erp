<template>
  <div class="space-y-6 animate-fade-in pb-12">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
      <div>
        <h1 class="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <i class="pi pi-chart-bar text-indigo-600 bg-indigo-50 p-2 rounded-xl"></i>
          Project <span class="text-indigo-600">Health</span>
        </h1>
        <p class="text-slate-500 font-medium mt-1">Real-time performance analytics and KPI tracking.</p>
      </div>
      <div class="flex gap-2">
         <Select v-model="selectedProjectId" :options="projects" optionLabel="name" optionValue="id" placeholder="Select Project" class="w-64 rounded-xl border-slate-100 shadow-sm" @change="loadStats" />
      </div>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-24">
       <i class="pi pi-spinner pi-spin text-4xl text-indigo-600"></i>
    </div>

    <template v-else-if="stats">
      <!-- KPI Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div class="bg-white p-4 rounded-3xl shadow-sm border border-slate-50 relative overflow-hidden group">
            <div class="absolute -right-4 -top-4 text-slate-50 text-8xl transition-all group-hover:scale-110 group-hover:rotate-6">
               <i class="pi pi-dollar"></i>
            </div>
            <div class="relative z-10">
               <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Financial Health</div>
               <div class="text-2xl font-black text-slate-800">{{ formatCurrency(stats.financials.currentBudget) }}</div>
               <div class="flex items-center gap-2 mt-2">
                  <span class="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-lg text-[9px] font-black uppercase">+{{ formatCurrency(stats.financials.coApproved) }} CO Approved</span>
               </div>
            </div>
         </div>

         <div class="bg-white p-4 rounded-3xl shadow-sm border border-slate-50 relative overflow-hidden group">
            <div class="absolute -right-4 -top-4 text-slate-50 text-8xl transition-all group-hover:scale-110 group-hover:rotate-6">
               <i class="pi pi-calendar"></i>
            </div>
            <div class="relative z-10">
               <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Overall Progress</div>
               <div class="text-2xl font-black text-slate-800">{{ stats.progress.actual.toFixed(1) }}%</div>
               <div class="mt-4 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div class="h-full bg-indigo-600 rounded-full" :style="{ width: stats.progress.actual + '%' }"></div>
               </div>
               <div class="text-[9px] font-bold text-slate-400 mt-2">Target: {{ stats.progress.planned }}%</div>
            </div>
         </div>

         <div class="bg-white p-4 rounded-3xl shadow-sm border border-slate-50 relative overflow-hidden group">
            <div class="absolute -right-4 -top-4 text-slate-50 text-8xl transition-all group-hover:scale-110 group-hover:rotate-6">
               <i class="pi pi-shield"></i>
            </div>
            <div class="relative z-10">
               <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Issues / Risks</div>
               <div class="text-2xl font-black text-slate-800">{{ totalRisks }} Items</div>
               <div class="flex gap-1.5 mt-3">
                  <div v-for="r in stats.risks" :key="r.severity" class="px-2 py-1 rounded-lg flex items-center gap-1.5 border" :class="severityBadge(r.severity)">
                     <div class="w-1.5 h-1.5 rounded-full" :class="severityDot(r.severity)"></div>
                     <span class="text-[9px] font-black">{{ r.count }} {{ r.severity }}</span>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <!-- Main Charts -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
         <!-- S-Curve Chart -->
         <Card class="rounded-3xl shadow-sm border border-slate-50 overflow-hidden">
            <template #title>
               <div class="p-2">
                  <span class="text-xs font-black text-slate-400 uppercase tracking-widest">Progress Visualization</span>
                  <h3 class="text-lg font-black text-slate-800">S-Curve Analysis</h3>
               </div>
            </template>
            <template #content>
               <ClientOnly>
                  <Chart type="line" :data="sCurveData" :options="sCurveOptions" class="h-64" />
               </ClientOnly>
            </template>
         </Card>

         <!-- Cost vs Budget -->
         <Card class="rounded-3xl shadow-sm border border-slate-50 overflow-hidden">
            <template #title>
               <div class="p-2">
                  <span class="text-xs font-black text-slate-400 uppercase tracking-widest">Financial Control</span>
                  <h3 class="text-lg font-black text-slate-800">Budget Utilization</h3>
               </div>
            </template>
            <template #content>
               <ClientOnly>
                  <Chart type="bar" :data="costData" :options="costOptions" class="h-64" />
               </ClientOnly>
            </template>
         </Card>
      </div>

      <!-- Footer Info -->
      <div class="bg-slate-900 rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-center justify-between text-white shadow-2xl">
         <div class="space-y-2">
            <div class="text-indigo-400 text-[10px] font-black uppercase tracking-widest">Strategic Insight</div>
            <h4 class="text-xl font-black max-w-md">Your project is currently performing <span class="text-indigo-400">within 5% variance</span> of the planned schedule.</h4>
         </div>
         <div class="flex gap-4">
            <div class="text-center">
               <div class="text-2xl font-black">0.98</div>
               <div class="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Schedule Performance (SPI)</div>
            </div>
            <div class="w-px h-12 bg-slate-800"></div>
            <div class="text-center">
               <div class="text-2xl font-black">1.04</div>
               <div class="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Cost Performance (CPI)</div>
            </div>
         </div>
      </div>
    </template>
    
    <div v-else class="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
       <i class="pi pi-folder-open text-6xl text-slate-200 mb-4"></i>
       <p class="text-slate-400 font-black uppercase tracking-widest text-xs">Select a project to view metrics</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Chart from 'primevue/chart';

const api = useApi();
const loading = ref(false);
const projects = ref<any[]>([]);
const selectedProjectId = ref<string | null>(null);
const stats = ref<any>(null);

const totalRisks = computed(() => stats.value?.risks.reduce((acc, r) => acc + r.count, 0) || 0);

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
};

const severityBadge = (s: string) => ({
   'bg-rose-50 border-rose-100 text-rose-600': s === 'CRITICAL' || s === 'HIGH',
   'bg-amber-50 border-amber-100 text-amber-600': s === 'MEDIUM',
   'bg-slate-50 border-slate-100 text-slate-500': s === 'LOW'
});

const severityDot = (s: string) => ({
   'bg-rose-500': s === 'CRITICAL' || s === 'HIGH',
   'bg-amber-500': s === 'MEDIUM',
   'bg-slate-400': s === 'LOW'
});

const loadProjects = async () => {
    try {
        const res = await api.get('/project/projects');
        projects.value = res.data.data || [];
        if (projects.value.length > 0) {
            // Find our seeded "Premium" project first if it exists
            const premiumPrj = projects.value.find((p: any) => p.code === 'PRJ-2026-MG-001');
            selectedProjectId.value = premiumPrj ? premiumPrj.id : projects.value[0].id;
            await loadStats();
        }
    } catch (e) { console.error(e); }
};

const loadStats = async () => {
    if (!selectedProjectId.value) return;
    loading.value = true;
    try {
        const res = await api.get(`/project/expansion/${selectedProjectId.value}/health-stats`);
        stats.value = res.data;
    } catch (e) { console.error(e); }
    finally { loading.value = false; }
};

// Chart Data
const sCurveData = computed(() => ({
    labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
    datasets: [
        { label: 'Planned Value (PV)', data: [0, 20, 45, 65, 80, 100], borderColor: '#cbd5e1', borderDash: [5, 5], fill: false, tension: 0.4 },
        { label: 'Actual Progress (EV)', data: [0, 18, 42, 60], borderColor: '#4f46e5', backgroundColor: '#4f46e522', fill: true, tension: 0.4 }
    ]
}));

const sCurveOptions = {
    plugins: { legend: { display: false } },
    scales: { 
        y: { beginAtZero: true, max: 100, ticks: { callback: (v: any) => v + '%' } },
        x: { grid: { display: false } }
    },
    maintainAspectRatio: false
};

const costData = computed(() => ({
    labels: ['Actual Cost', 'Approved Budget'],
    datasets: [{
        data: [stats.value.financials.originalBudget * 0.4, stats.value.financials.currentBudget],
        backgroundColor: ['#f43f5e', '#10b981'],
        borderRadius: 12
    }]
}));

const costOptions = {
    plugins: { legend: { display: false } },
    indexAxis: 'y',
    scales: { x: { grid: { display: false } }, y: { grid: { display: false } } },
    maintainAspectRatio: false
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
</style>
