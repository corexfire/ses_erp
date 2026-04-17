<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useApi } from '@/composables/useApi';
import { useToast } from 'primevue/usetoast';

const api = useApi();
const toast = useToast();

const loading = ref(true);
const dashboard = ref<any>(null);
const metrics = ref<any[]>([]);
const activeTab = ref('DASHBOARD');

const stats = computed(() => [
  { label: 'Total Assets', value: dashboard.value?.summary?.totalAssets || 0, icon: 'pi pi-box', color: 'indigo', sub: 'Fixed Assets' },
  { label: 'Documents', value: dashboard.value?.summary?.totalDocuments || 0, icon: 'pi pi-file', color: 'slate', sub: 'DMS Registry' },
  { label: 'Compliance', value: dashboard.value?.summary?.totalComplianceRecords || 0, icon: 'pi pi-shield', color: 'emerald', sub: 'Certifications' },
  { label: 'Health Score', value: `${(dashboard.value?.summary?.averageHealthScore || 0).toFixed(1)}%`, icon: 'pi pi-chart-bar', color: 'orange', sub: 'Dept. Performance' },
]);

const tabs = [
  { key: 'DASHBOARD', label: 'Dashboard', icon: 'pi pi-th-large' },
  { key: 'METRICS', label: 'KPI Registry', icon: 'pi pi-list' },
  { key: 'SETTINGS', label: 'Benchmarks', icon: 'pi pi-cog' }
];

const loadData = async () => {
  loading.value = true;
  try {
    const [dashRes, metricsRes] = await Promise.all([
      api.get('/support/bi/dashboard'),
      api.get('/support/bi/metrics'),
    ]);
    dashboard.value = dashRes;
    metrics.value = metricsRes;
  } catch (error) {
    console.error('Failed to load BI data', error);
    toast.add({ severity: 'error', summary: 'Error', detail: 'Gagal memuat data intelejensi.', life: 3000 });
  } finally {
    loading.value = false;
  }
};

const getKpiColor = (status: string) => {
  switch (status) {
    case 'ON_TRACK': return 'text-emerald-500 bg-emerald-50';
    case 'AT_RISK': return 'text-orange-500 bg-orange-50';
    case 'BEHIND': return 'text-rose-500 bg-rose-50';
    default: return 'text-slate-500 bg-slate-50';
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'ASSET': return 'pi pi-box';
    case 'COMPLIANCE': return 'pi pi-shield';
    case 'DOCUMENT': return 'pi pi-file';
    default: return 'pi pi-info-circle';
  }
};

// Simulated Sparkline Generator
const getSparklineData = (code: string) => {
  const codeMetrics = metrics.value.filter(m => m.code === code).sort((a,b) => a.period.localeCompare(b.period));
  if (codeMetrics.length < 2) return "5,15 15,5 25,10 35,5";
  return codeMetrics.map((m, i) => `${i * 20 + 5},${40 - (Number(m.actualValue) / 100 * 30)}`).join(' ');
};

onMounted(() => {
  loadData();
});
</script>

<template>
  <div class="min-h-screen bg-[#f8fafc] pb-20">

    <!-- ═══════════════════════════════════ HEADER ══════════════════════════════════ -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-8 m-6 rounded-xl bg-indigo-950 text-white shadow-2xl transition-all duration-500">
      <div class="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
      
      <div class="relative">
        <div class="flex items-center gap-3 mb-3">
           <span class="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-white/20">Business Intelligence</span>
           <span class="text-white/30 truncate">/</span>
           <span class="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Support Intelligence Hub</span>
        </div>
        <h1 class="text-4xl font-black tracking-tighter mb-2 uppercase leading-none">Support <span class="text-indigo-400">Analytics</span></h1>
        <p class="text-indigo-200/60 text-sm font-medium">Monitoring KPI, tren kepatuhan, dan efisiensi aset secara real-time.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded text @click="loadData" :loading="loading" class="text-white hover:bg-white/10" />
        <Button label="Dashboard Settings" icon="pi pi-cog" severity="secondary" class="p-button-rounded font-black text-[10px] uppercase bg-white/10 text-white border-white/20 px-6 py-3" />
      </div>
    </div>

    <!-- ═══════════════════════════════════ STATS RIBBON ══════════════════════════════════ -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mx-6 mb-8">
       <div v-for="s in stats" :key="s.label" class="group p-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <i :class="[s.icon, 'text-6xl text-slate-900']"></i>
          </div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ s.label }}</p>
          <div class="flex items-baseline gap-2">
            <h3 class="text-3xl font-black text-slate-900">{{ loading ? '—' : s.value }}</h3>
          </div>
          <div class="flex items-center gap-2 mt-2">
             <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-50 text-slate-500 uppercase tracking-wider">
               {{ s.sub }}
             </span>
          </div>
       </div>
    </div>

    <!-- ═══════════════════════════════════ ANALYTICS GRID ══════════════════════════════════ -->
    <div class="mx-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Main Dashboard View -->
        <div class="lg:col-span-2 space-y-8">
          
          <!-- KPI Performance Matrix -->
          <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-8">
              <div class="flex items-center justify-between mb-8">
                <div>
                  <h3 class="text-xl font-black text-slate-900 uppercase tracking-tight">KPI Performance <span class="text-indigo-600">Matrix</span></h3>
                  <p class="text-xs text-slate-500 font-medium">Monitoring pencapaian target berdasarkan kuartal terakhir.</p>
                </div>
                <SelectButton v-model="activeTab" :options="['DASHBOARD', 'METRICS']" aria-labelledby="basic" />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div v-for="kpi in dashboard?.kpis" :key="kpi.id" class="p-6 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all border-l-4 border-l-indigo-600">
                    <div class="flex justify-between items-start mb-4">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                          <i :class="getCategoryIcon(kpi.category)"></i>
                        </div>
                        <div>
                          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">{{ kpi.category }}</p>
                          <h4 class="text-sm font-black text-slate-900 truncate max-w-[150px]">{{ kpi.name }}</h4>
                        </div>
                      </div>
                      <Tag :value="kpi.status" :class="['text-[9px] font-black uppercase tracking-widest', getKpiColor(kpi.status)]" />
                    </div>

                    <div class="space-y-3">
                      <div class="flex justify-between text-[10px] font-black uppercase tracking-wider">
                        <span class="text-slate-400">Target: {{ kpi.targetValue }}{{ kpi.unit === 'PERCENT' ? '%' : '' }}</span>
                        <span class="text-indigo-600">Actual: {{ kpi.actualValue }}{{ kpi.unit === 'PERCENT' ? '%' : '' }}</span>
                      </div>
                      <ProgressBar :value="Number(kpi.actualValue)" :showValue="false" style="height: 6px" 
                        class="bg-slate-200"
                        :color="kpi.status === 'ON_TRACK' ? '#10b981' : kpi.status === 'AT_RISK' ? '#f59e0b' : '#f43f5e'" />
                    </div>

                    <!-- Micro Sparkline Trend -->
                    <div class="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span class="text-[9px] font-bold text-slate-400 uppercase">Trend (2024)</span>
                      <svg width="60" height="20" class="overflow-visible">
                        <polyline
                          fill="none"
                          stroke="#4f46e5"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          :points="getSparklineData(kpi.code)"
                        />
                      </svg>
                    </div>
                 </div>
              </div>
          </div>

          <!-- Risk Distribution Analytics -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
                <h3 class="text-lg font-black text-slate-900 uppercase tracking-tight mb-6">Status <span class="text-indigo-600">Distribution</span></h3>
                <div class="space-y-6">
                   <div v-for="(v, k) in dashboard?.statusDistribution" :key="k" class="flex items-center gap-4">
                      <div :class="['w-3 h-3 rounded-full', k === 'onTrack' ? 'bg-emerald-500' : k === 'atRisk' ? 'bg-orange-500' : 'bg-rose-500']"></div>
                      <span class="text-[11px] font-black text-slate-700 uppercase tracking-widest flex-1">{{ k }}</span>
                      <span class="text-sm font-black text-slate-900">{{ v }}</span>
                   </div>
                </div>
             </div>
             
             <div class="bg-indigo-900 rounded-xl p-8 text-white relative overflow-hidden">
                <div class="absolute top-0 right-0 p-8 opacity-10">
                  <i class="pi pi-verified text-8xl"></i>
                </div>
                <h3 class="text-lg font-black uppercase tracking-tight mb-2">Compliance <span class="text-indigo-400">Pulse</span></h3>
                <p class="text-indigo-200 text-[11px] font-medium mb-6">Skor kesehatan regulasi perusahaan saat ini.</p>
                <div class="flex items-center gap-4">
                   <h2 class="text-5xl font-black italic">85<span class="text-2xl not-italic text-indigo-400 font-bold ml-1">%</span></h2>
                   <div class="h-10 w-px bg-white/20"></div>
                   <div>
                     <p class="text-[10px] font-black uppercase tracking-widest text-emerald-400">Healthy</p>
                     <p class="text-[9px] text-indigo-200">+4.2% dari Q3</p>
                   </div>
                </div>
             </div>
          </div>
        </div>

        <!-- Sidebar / Recent Updates & Intelligence -->
        <div class="space-y-8">
           <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div class="p-8 border-b border-slate-100 flex items-center justify-between">
                <h3 class="text-sm font-black text-slate-900 uppercase tracking-widest">Intelligence <span class="text-indigo-600">Ribbon</span></h3>
                <i class="pi pi-bolt text-indigo-600"></i>
              </div>
              <div class="p-6 space-y-4">
                 <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex gap-4 transition-all hover:bg-white hover:shadow-md cursor-pointer">
                    <div class="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                      <i class="pi pi-exclamation-triangle"></i>
                    </div>
                    <div>
                      <p class="text-[10px] font-black text-rose-600 uppercase mb-1">Critical Insight</p>
                      <p class="text-[11px] font-bold text-slate-700 leading-tight">Masa berlaku ISO 9001 akan berakhir dalam 45 hari.</p>
                    </div>
                 </div>
                 <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex gap-4 transition-all hover:bg-white hover:shadow-md cursor-pointer">
                    <div class="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <i class="pi pi-check-circle"></i>
                    </div>
                    <div>
                      <p class="text-[10px] font-black text-emerald-600 uppercase mb-1">Efficiency Alert</p>
                      <p class="text-[11px] font-bold text-slate-700 leading-tight">Utilitasi aset produksi meningkat 12% di Q4.</p>
                    </div>
                 </div>
              </div>
              <div class="p-6 bg-slate-50 border-t border-slate-100 mt-auto">
                 <Button label="View Full Report" text class="w-full text-indigo-600 font-black text-[10px] uppercase tracking-widest" />
              </div>
           </div>

           <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
              <h3 class="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Resources</h3>
              <div class="space-y-3">
                 <a href="#" class="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group">
                    <div class="flex items-center gap-3">
                      <i class="pi pi-book text-slate-400 group-hover:text-indigo-600"></i>
                      <span class="text-[11px] font-bold text-slate-600">Panduan BI Support</span>
                    </div>
                    <i class="pi pi-arrow-right text-[10px] text-slate-300"></i>
                 </a>
                 <a href="#" class="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group">
                    <div class="flex items-center gap-3">
                      <i class="pi pi-download text-slate-400 group-hover:text-indigo-600"></i>
                      <span class="text-[11px] font-bold text-slate-600">Export Raw Metrics (.xlsx)</span>
                    </div>
                    <i class="pi pi-arrow-right text-[10px] text-slate-300"></i>
                 </a>
              </div>
           </div>
        </div>

      </div>
    </div>

  </div>
</template>

<style scoped>
:deep(.p-selectbutton .p-button) {
  @apply text-[9px] font-black uppercase tracking-widest px-4 h-9 rounded-xl border-slate-200 bg-white text-slate-400;
}
:deep(.p-selectbutton .p-button.p-highlight) {
  @apply bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200;
}
:deep(.p-selectbutton .p-button.p-highlight::before) {
  display: none;
}
</style>
