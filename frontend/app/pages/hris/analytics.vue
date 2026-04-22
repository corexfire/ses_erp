<template>
  <div class="space-y-6 animate-fade-in pb-12">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
      <div>
        <h1 class="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <i class="pi pi-chart-line text-indigo-600 bg-indigo-50 p-2 rounded-xl"></i>
          HRIS <span class="text-indigo-600">Analytics</span>
        </h1>
        <p class="text-slate-500 font-medium mt-1">Workforce Performance, Payroll distribution, and Attendance trends.</p>
      </div>
      <div class="flex gap-2">
        <Button label="Export Report" icon="pi pi-file-pdf" severity="secondary" outlined class="font-bold text-xs rounded-xl h-11" />
        <Button label="Refresh Data" icon="pi pi-refresh" :loading="loading" @click="load" class="font-bold text-xs rounded-xl h-11 bg-slate-900 border-none" />
      </div>
    </div>

    <!-- Summary Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card class="border-none shadow-sm rounded-2xl overflow-hidden group hover:shadow-md transition-all">
        <template #content>
          <div class="flex items-center gap-4 px-2">
            <div class="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
              <i class="pi pi-users text-xl"></i>
            </div>
            <div>
              <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Headcount</div>
              <div class="text-2xl font-black text-slate-900">{{ metrics.activeHeadcount }}</div>
              <div class="text-[10px] font-bold text-emerald-500 mt-0.5 flex items-center gap-1">
                <i class="pi pi-arrow-up"></i> +2 this month
              </div>
            </div>
          </div>
        </template>
      </Card>

      <Card class="border-none shadow-sm rounded-2xl overflow-hidden group hover:shadow-md transition-all">
        <template #content>
          <div class="flex items-center gap-4 px-2">
            <div class="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
              <i class="pi pi-wallet text-xl"></i>
            </div>
            <div>
              <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Payroll</div>
              <div class="text-2xl font-black text-slate-900">{{ formatCurrency(metrics.currentPayroll) }}</div>
              <div class="text-[10px] font-bold text-slate-400 mt-0.5 uppercase">March 2026 Period</div>
            </div>
          </div>
        </template>
      </Card>

      <Card class="border-none shadow-sm rounded-2xl overflow-hidden group hover:shadow-md transition-all">
        <template #content>
          <div class="flex items-center gap-4 px-2">
            <div class="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
              <i class="pi pi-calendar-check text-xl"></i>
            </div>
            <div>
              <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg. Attendance</div>
              <div class="text-2xl font-black text-slate-900">{{ metrics.attendanceRate }}%</div>
              <div class="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-tighter">Last 30 Days trend</div>
            </div>
          </div>
        </template>
      </Card>

      <Card class="border-none shadow-sm rounded-2xl overflow-hidden group hover:shadow-md transition-all">
        <template #content>
          <div class="flex items-center gap-4 px-2">
            <div class="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
              <i class="pi pi-user-minus text-xl"></i>
            </div>
            <div>
              <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Turnover Rate</div>
              <div class="text-2xl font-black text-slate-900">{{ metrics.turnoverRate.toFixed(1) }}%</div>
              <div class="text-[10px] font-bold text-rose-500 mt-0.5 uppercase tracking-tighter">{{ metrics.terminatedCount }} employees left</div>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <!-- Charts Row 1 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card class="border-none shadow-sm rounded-3xl p-4 min-h-[400px]">
        <template #header>
          <div class="p-4 pb-0">
             <h3 class="text-sm font-black text-slate-800 uppercase tracking-widest">Headcount by Department</h3>
             <p class="text-[10px] text-slate-400 font-bold uppercase mt-1">Current Active Workforce Distribution</p>
          </div>
        </template>
        <template #content>
          <div class="h-[300px] mt-4">
             <Chart type="bar" :data="deptChartData" :options="deptChartOptions" class="h-full" />
          </div>
        </template>
      </Card>

      <Card class="border-none shadow-sm rounded-3xl p-4 min-h-[400px]">
        <template #header>
          <div class="p-4 pb-0">
             <h3 class="text-sm font-black text-slate-800 uppercase tracking-widest">Payroll Expenditure Trend</h3>
             <p class="text-[10px] text-slate-400 font-bold uppercase mt-1">Monthly Gross Pay Aggregation (IDR)</p>
          </div>
        </template>
        <template #content>
          <div class="h-[300px] mt-4">
             <Chart type="line" :data="payrollChartData" :options="payrollChartOptions" class="h-full" />
          </div>
        </template>
      </Card>
    </div>

    <!-- Charts Row 2 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
       <Card class="border-none shadow-sm rounded-3xl p-4 col-span-1 lg:col-span-2">
        <template #header>
          <div class="p-4 pb-0">
             <h3 class="text-sm font-black text-slate-800 uppercase tracking-widest">Attendance Heatmap (Last 7 Days)</h3>
             <p class="text-[10px] text-slate-400 font-bold uppercase mt-1">Daily Check-in Volume vs Total Workforce</p>
          </div>
        </template>
        <template #content>
          <div class="h-[300px] mt-4">
             <Chart type="bar" :data="attChartData" :options="attChartOptions" class="h-full" />
          </div>
        </template>
       </Card>

       <Card class="border-none shadow-sm rounded-3xl p-4">
        <template #header>
          <div class="p-4 pb-0">
             <h3 class="text-sm font-black text-slate-800 uppercase tracking-widest">Retention Metrics</h3>
             <p class="text-[10px] text-slate-400 font-bold uppercase mt-1">Employee Tenure Distribution</p>
          </div>
        </template>
        <template #content>
          <div class="h-[300px] mt-4 flex items-center justify-center">
             <Chart type="doughnut" :data="retChartData" :options="retChartOptions" class="w-full max-w-[250px]" />
          </div>
        </template>
       </Card>
    </div>

    <!-- Loading State (Non-blocking) -->
    <div v-if="loading" class="fixed top-0 left-0 right-0 z-50 h-1 bg-indigo-100 overflow-hidden">
       <div class="h-full bg-indigo-600 animate-loading-bar"></div>
    </div>
    
    <div v-if="loading" class="flex items-center gap-2 text-indigo-600 bg-white/80 px-4 py-2 rounded-full shadow-sm border border-indigo-100 fixed bottom-6 left-1/2 -translate-x-1/2 z-40 animate-bounce">
       <i class="pi pi-spinner pi-spin"></i>
       <span class="text-[10px] font-black uppercase tracking-widest">Refreshing Data...</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import Chart from 'primevue/chart';

const api = useApi();
const loading = ref(true);

const metrics = reactive({
  activeHeadcount: 0,
  terminatedCount: 0,
  turnoverRate: 0,
  currentPayroll: 0,
  attendanceRate: 0,
});

const deptChartData = ref<any>({ labels: [], datasets: [] });
const payrollChartData = ref<any>({ labels: [], datasets: [] });
const attChartData = ref<any>({ labels: [], datasets: [] });
const retChartData = ref<any>({ labels: [], datasets: [] });

// Chart Options
const deptChartOptions = {
    indexAxis: 'y',
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
        x: { grid: { display: false }, ticks: { font: { size: 10, weight: 'bold' } } },
        y: { grid: { display: false }, ticks: { font: { size: 10, weight: 'bold' } } }
    }
};

const payrollChartOptions = {
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
        y: { grid: { borderDash: [5, 5] }, ticks: { font: { size: 9 }, callback: (v: any) => 'Rp' + (v/1000000) + 'jt' } },
        x: { grid: { display: false }, ticks: { font: { size: 10, weight: 'bold' } } }
    }
};

const attChartOptions = {
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10 } } } },
    scales: {
        y: { stacked: true, grid: { borderDash: [5, 5] } },
        x: { stacked: true, grid: { display: false } }
    }
};

const retChartOptions = {
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10 } } } }
};

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
};

const load = async () => {
  loading.value = true;
  try {
    const res = await api.get('/hris/analytics');
    const data = res.data;

    // Set Metrics
    Object.assign(metrics, data.metrics);

    // Dept Chart
    deptChartData.value = {
        labels: data.deptDistribution.map((d: any) => d.name),
        datasets: [{
            data: data.deptDistribution.map((d: any) => d.count),
            backgroundColor: ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#ef4444', '#f59e0b', '#10b981', '#06b6d4'],
            borderRadius: 8
        }]
    };

    // Payroll Trend
    payrollChartData.value = {
        labels: data.payrollTrend.map((p: any) => p.period),
        datasets: [{
            label: 'Total Payout',
            data: data.payrollTrend.map((p: any) => p.amount),
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: '#fff',
            pointBorderWidth: 2
        }]
    };

    // Attendance (Mocking dynamic for UI demo)
    attChartData.value = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            { label: 'Present', data: [18, 19, 17, 18, 16, 2, 1], backgroundColor: '#6366f1' },
            { label: 'Absent', data: [2, 1, 3, 2, 4, 0, 0], backgroundColor: '#f1f5f9' }
        ]
    };

    // Retention (Mocking dynamic)
    retChartData.value = {
        labels: ['< 1 Year', '1-3 Years', '3-5 Years', '> 5 Years'],
        datasets: [{
            data: [12, 5, 2, 1],
            backgroundColor: ['#6366f1', '#8b5cf6', '#c026d3', '#f43f5e']
        }]
    };

  } catch (e) {
    console.warn('Analytics loading failed:', e);
  } finally {
    loading.value = false;
  }
};

onMounted(load);
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes loadingBar {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(0); }
  100% { transform: translateX(100%); }
}

.animate-loading-bar {
  animation: loadingBar 2s infinite ease-in-out;
  width: 50%;
}

:deep(.p-card) {
    border-radius: 24px;
}
</style>
