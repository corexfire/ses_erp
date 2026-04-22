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

// Dialog states
const showSettingsDialog = ref(false);
const showReportDialog = ref(false);
const showGuideDialog = ref(false);
const showKpiDetailDialog = ref(false);
const selectedKpi = ref<any>(null);

// KPI history across all periods for the selected KPI code
const kpiHistory = computed(() => {
  if (!selectedKpi.value) return [];
  return metrics.value
    .filter((m: any) => m.code === selectedKpi.value.code)
    .sort((a: any, b: any) => a.period.localeCompare(b.period));
});

const openKpiDetail = (kpi: any) => {
  selectedKpi.value = kpi;
  showKpiDetailDialog.value = true;
};

const achievementRate = (kpi: any) => {
  if (!kpi) return 0;
  const target = Number(kpi.targetValue);
  const actual = Number(kpi.actualValue);
  if (target === 0) return actual === 0 ? 100 : 0;
  return Math.round((actual / target) * 100);
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'ON_TRACK': return 'Tercapai';
    case 'AT_RISK': return 'Berisiko';
    case 'BEHIND': return 'Di Bawah Target';
    default: return status;
  }
};

const getStatusBg = (status: string) => {
  switch (status) {
    case 'ON_TRACK': return 'bg-emerald-500';
    case 'AT_RISK': return 'bg-orange-500';
    case 'BEHIND': return 'bg-rose-500';
    default: return 'bg-slate-400';
  }
};

const getBarColor = (status: string) => {
  switch (status) {
    case 'ON_TRACK': return '#10b981';
    case 'AT_RISK': return '#f59e0b';
    case 'BEHIND': return '#f43f5e';
    default: return '#64748b';
  }
};

// Settings form
const settings = ref({
  alertThreshold: 90,
  retentionPeriod: '2026-Q2',
  enableAlerts: true,
  reportFrequency: 'QUARTERLY',
});

const stats = computed(() => [
  { label: 'Total Assets', value: dashboard.value?.summary?.totalAssets || 0, icon: 'pi pi-box', color: 'indigo', sub: 'Fixed Assets' },
  { label: 'Documents', value: dashboard.value?.summary?.totalDocuments || 0, icon: 'pi pi-file', color: 'slate', sub: 'DMS Registry' },
  { label: 'Compliance', value: dashboard.value?.summary?.totalComplianceRecords || 0, icon: 'pi pi-shield', color: 'emerald', sub: 'Certifications' },
  { label: 'Health Score', value: `${(dashboard.value?.summary?.averageHealthScore || 0).toFixed(1)}%`, icon: 'pi pi-chart-bar', color: 'orange', sub: 'Dept. Performance' },
]);

// Unique categories and periods for Metrics tab
const metricCategories = computed(() => [...new Set(metrics.value.map((m: any) => m.category))]);
const metricPeriods = computed(() => [...new Set(metrics.value.map((m: any) => m.period))].sort().reverse());
const selectedCategory = ref('');
const selectedPeriod = ref('');

const filteredMetrics = computed(() => {
  return metrics.value.filter((m: any) => {
    const catMatch = !selectedCategory.value || m.category === selectedCategory.value;
    const perMatch = !selectedPeriod.value || m.period === selectedPeriod.value;
    return catMatch && perMatch;
  });
});

const loadData = async () => {
  loading.value = true;
  try {
    const [dashRes, metricsRes] = await Promise.all([
      api.get('/support/bi/dashboard'),
      api.get('/support/bi/metrics'),
    ]);
    dashboard.value = dashRes.data || dashRes;
    metrics.value = metricsRes.data || metricsRes;
  } catch (error) {
    console.error('Failed to load BI data', error);
    toast.add({ severity: 'error', summary: 'Error', detail: 'Gagal memuat data intelejensi.', life: 3000 });
  } finally {
    loading.value = false;
  }
};

const getKpiColor = (status: string) => {
  switch (status) {
    case 'ON_TRACK': return 'text-emerald-600 bg-emerald-50 border border-emerald-200';
    case 'AT_RISK': return 'text-orange-600 bg-orange-50 border border-orange-200';
    case 'BEHIND': return 'text-rose-600 bg-rose-50 border border-rose-200';
    default: return 'text-slate-600 bg-slate-50 border border-slate-200';
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'ASSET': return 'pi pi-box';
    case 'COMPLIANCE': return 'pi pi-shield';
    case 'DOCUMENT': return 'pi pi-file';
    case 'HSE': return 'pi pi-heart';
    default: return 'pi pi-info-circle';
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'ASSET': return 'bg-indigo-600';
    case 'COMPLIANCE': return 'bg-emerald-600';
    case 'DOCUMENT': return 'bg-sky-600';
    case 'HSE': return 'bg-rose-600';
    default: return 'bg-slate-600';
  }
};

// Sparkline generator from multi-period metrics data
const getSparklineData = (code: string) => {
  const codeMetrics = metrics.value.filter((m: any) => m.code === code).sort((a: any, b: any) => a.period.localeCompare(b.period));
  if (codeMetrics.length < 2) return '5,15 15,5 25,10 35,5';
  return codeMetrics.map((m: any, i: number) => `${i * 20 + 5},${40 - (Number(m.actualValue) / 100 * 30)}`).join(' ');
};

const saveSettings = () => {
  toast.add({ severity: 'success', summary: 'Pengaturan Disimpan', detail: 'Konfigurasi dashboard berhasil diperbarui.', life: 3000 });
  showSettingsDialog.value = false;
};

const exportReport = () => {
  // Build CSV-like text of the report data
  const lines = ['KPI Report — Support Analytics FY 2026', ''];
  lines.push(`Period,Code,Name,Category,Target,Actual,Unit,Status`);
  metrics.value.forEach((m: any) => {
    lines.push(`${m.period},${m.code},"${m.name}",${m.category},${m.targetValue},${m.actualValue},${m.unit},${m.status}`);
  });
  const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `bi-report-${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  toast.add({ severity: 'success', summary: 'Export Berhasil', detail: 'File CSV sudah terunduh.', life: 3000 });
};

onMounted(() => {
  loadData();
});
</script>

<template>
  <div class="min-h-screen bg-[#f8fafc] pb-20">

    <!-- ═══════════════════════════════════ HEADER ══════════════════════════════════ -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 overflow-hidden relative p-8 m-6 rounded-xl bg-indigo-950 text-white shadow-2xl transition-all duration-500">
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
        <Button label="Dashboard Settings" icon="pi pi-cog" severity="secondary" class="p-button-rounded font-black text-[10px] uppercase bg-white/10 text-white border-white/20 px-6 py-3" @click="showSettingsDialog = true" />
      </div>
    </div>

    <!-- ═══════════════════════════════════ STATS RIBBON ══════════════════════════════════ -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mx-6 mb-8">
       <div v-for="s in stats" :key="s.label" class="group p-4 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
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
          
          <!-- KPI Performance Matrix with Tabs -->
          <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-8">
              <div class="flex items-center justify-between mb-8">
                <div>
                  <h3 class="text-xl font-black text-slate-900 uppercase tracking-tight">KPI Performance <span class="text-indigo-600">Matrix</span></h3>
                  <p class="text-xs text-slate-500 font-medium">Monitoring pencapaian target berdasarkan kuartal terakhir.</p>
                </div>
                <SelectButton v-model="activeTab" :options="['DASHBOARD', 'METRICS']" aria-labelledby="basic" />
              </div>

              <!-- DASHBOARD TAB: Active KPIs for latest period -->
              <div v-if="activeTab === 'DASHBOARD'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div v-if="!dashboard?.kpis?.length" class="col-span-2 text-center py-12 text-slate-400">
                   <i class="pi pi-chart-bar text-4xl mb-3 block opacity-30"></i>
                   <p class="text-sm font-bold">Belum ada data KPI untuk periode ini.</p>
                 </div>
                 <div
                   v-for="kpi in dashboard?.kpis" :key="kpi.id"
                   class="p-4 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all border-l-4 border-l-indigo-600 cursor-pointer group relative"
                   @click="openKpiDetail(kpi)"
                 >
                    <!-- Click hint -->
                    <div class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span class="text-[8px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded-full flex items-center gap-1">
                        <i class="pi pi-eye text-[8px]"></i> Detail
                      </span>
                    </div>
                    <div class="flex justify-between items-start mb-4">
                      <div class="flex items-center gap-3">
                        <div :class="['w-10 h-10 rounded-xl text-white flex items-center justify-center', getCategoryColor(kpi.category)]">
                          <i :class="getCategoryIcon(kpi.category)"></i>
                        </div>
                        <div>
                          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">{{ kpi.category }}</p>
                          <h4 class="text-sm font-black text-slate-900 truncate max-w-[150px]">{{ kpi.name }}</h4>
                        </div>
                      </div>
                      <span :class="['text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full', getKpiColor(kpi.status)]">{{ kpi.status }}</span>
                    </div>

                    <div class="space-y-3">
                      <div class="flex justify-between text-[10px] font-black uppercase tracking-wider">
                        <span class="text-slate-400">Target: {{ kpi.targetValue }}{{ kpi.unit === 'PERCENT' ? '%' : '' }}</span>
                        <span class="text-indigo-600">Actual: {{ kpi.actualValue }}{{ kpi.unit === 'PERCENT' ? '%' : '' }}</span>
                      </div>
                      <ProgressBar :value="Math.min(Number(kpi.actualValue), 100)" :showValue="false" style="height: 6px" class="bg-slate-200" />
                    </div>

                    <!-- Micro Sparkline Trend -->
                    <div class="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span class="text-[9px] font-bold text-slate-400 uppercase">Trend FY 2026</span>
                      <svg width="60" height="20" class="overflow-visible">
                        <polyline fill="none" stroke="#4f46e5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" :points="getSparklineData(kpi.code)" />
                      </svg>
                    </div>
                 </div>
              </div>

              <!-- METRICS TAB: Full registry with filter -->
              <div v-else>
                <div class="flex flex-wrap gap-3 mb-6">
                  <select v-model="selectedCategory" class="text-[10px] font-black uppercase tracking-widest border border-slate-200 rounded-xl px-4 py-2 text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400">
                    <option value="">Semua Kategori</option>
                    <option v-for="cat in metricCategories" :key="cat" :value="cat">{{ cat }}</option>
                  </select>
                  <select v-model="selectedPeriod" class="text-[10px] font-black uppercase tracking-widest border border-slate-200 rounded-xl px-4 py-2 text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400">
                    <option value="">Semua Periode</option>
                    <option v-for="p in metricPeriods" :key="p" :value="p">{{ p }}</option>
                  </select>
                  <span class="text-[10px] font-bold text-slate-400 self-center">{{ filteredMetrics.length }} records</span>
                </div>
                <div class="overflow-x-auto rounded-xl border border-slate-100">
                  <table class="w-full text-left">
                    <thead class="bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th class="text-[9px] font-black text-slate-400 uppercase tracking-widest p-4">KPI</th>
                        <th class="text-[9px] font-black text-slate-400 uppercase tracking-widest p-4">Kategori</th>
                        <th class="text-[9px] font-black text-slate-400 uppercase tracking-widest p-4">Periode</th>
                        <th class="text-[9px] font-black text-slate-400 uppercase tracking-widest p-4 text-right">Target</th>
                        <th class="text-[9px] font-black text-slate-400 uppercase tracking-widest p-4 text-right">Actual</th>
                        <th class="text-[9px] font-black text-slate-400 uppercase tracking-widest p-4 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-50">
                      <tr v-if="!filteredMetrics.length">
                        <td colspan="6" class="text-center py-10 text-slate-400 text-xs font-bold">Tidak ada data KPI ditemukan.</td>
                      </tr>
                      <tr v-for="m in filteredMetrics" :key="m.id" class="hover:bg-indigo-50/30 transition-colors cursor-pointer" @click="openKpiDetail(m)">
                        <td class="p-4">
                          <div class="flex items-center gap-2">
                            <p class="text-[11px] font-black text-slate-900">{{ m.name }}</p>
                            <i class="pi pi-eye text-[9px] text-indigo-300 opacity-0 group-hover:opacity-100"></i>
                          </div>
                          <p class="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">{{ m.code }}</p>
                        </td>
                        <td class="p-4">
                          <span :class="['text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full', getCategoryColor(m.category), 'text-white']">{{ m.category }}</span>
                        </td>
                        <td class="p-4 text-[10px] font-bold text-slate-600">{{ m.period }}</td>
                        <td class="p-4 text-right text-[11px] font-black text-slate-500">{{ m.targetValue }}{{ m.unit === 'PERCENT' ? '%' : '' }}</td>
                        <td class="p-4 text-right text-[11px] font-black text-indigo-600">{{ m.actualValue }}{{ m.unit === 'PERCENT' ? '%' : '' }}</td>
                        <td class="p-4 text-center">
                          <span :class="['text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full', getKpiColor(m.status)]">{{ m.status }}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
          </div>

          <!-- Risk Distribution Analytics -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
                <h3 class="text-lg font-black text-slate-900 uppercase tracking-tight mb-6">Status <span class="text-indigo-600">Distribution</span></h3>
                <div class="space-y-4">
                   <div v-for="(v, k) in dashboard?.statusDistribution" :key="k" class="flex items-center gap-4">
                      <div :class="['w-3 h-3 rounded-full flex-shrink-0', k === 'onTrack' ? 'bg-emerald-500' : k === 'atRisk' ? 'bg-orange-500' : 'bg-rose-500']"></div>
                      <span class="text-[11px] font-black text-slate-700 uppercase tracking-widest flex-1">{{ k === 'onTrack' ? 'On Track' : k === 'atRisk' ? 'At Risk' : 'Behind' }}</span>
                      <span class="text-lg font-black text-slate-900">{{ v }}</span>
                      <div class="w-16 bg-slate-100 rounded-full h-1.5">
                        <div :class="['h-1.5 rounded-full', k === 'onTrack' ? 'bg-emerald-500' : k === 'atRisk' ? 'bg-orange-500' : 'bg-rose-500']" :style="`width: ${dashboard?.statusDistribution ? (Number(v) / (Object.values(dashboard?.statusDistribution).reduce((a: any, b: any) => a + b, 0) || 1) * 100) : 0}%`"></div>
                      </div>
                   </div>
                   <div v-if="!dashboard?.statusDistribution" class="text-center py-6 text-slate-300 text-xs font-bold">Belum ada data.</div>
                </div>
             </div>
             
             <div class="bg-indigo-900 rounded-xl p-8 text-white relative overflow-hidden">
                <div class="absolute top-0 right-0 p-8 opacity-10">
                  <i class="pi pi-verified text-8xl"></i>
                </div>
                <h3 class="text-lg font-black uppercase tracking-tight mb-2">Compliance <span class="text-indigo-400">Pulse</span></h3>
                <p class="text-indigo-200 text-[11px] font-medium mb-6">Skor kesehatan regulasi perusahaan saat ini.</p>
                <div class="flex items-center gap-4">
                   <h2 class="text-5xl font-black italic">{{ dashboard?.summary?.averageHealthScore ? dashboard.summary.averageHealthScore.toFixed(0) : 85 }}<span class="text-2xl not-italic text-indigo-400 font-bold ml-1">%</span></h2>
                   <div class="h-10 w-px bg-white/20"></div>
                   <div>
                     <p class="text-[10px] font-black uppercase tracking-widest text-emerald-400">Healthy</p>
                     <p class="text-[9px] text-indigo-200">Periode {{ dashboard?.kpis?.[0]?.period || '2026-Q2' }}</p>
                   </div>
                </div>
             </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-8">
           <!-- Intelligence Ribbon -->
           <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div class="p-8 border-b border-slate-100 flex items-center justify-between">
                <h3 class="text-sm font-black text-slate-900 uppercase tracking-widest">Intelligence <span class="text-indigo-600">Ribbon</span></h3>
                <i class="pi pi-bolt text-indigo-600"></i>
              </div>
              <div class="p-4 space-y-4">
                 <!-- Dynamic insights from compliance data -->
                 <div class="p-4 rounded-2xl bg-rose-50 border border-rose-100 flex gap-4 transition-all hover:bg-white hover:shadow-md cursor-pointer">
                    <div class="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                      <i class="pi pi-exclamation-triangle"></i>
                    </div>
                    <div>
                      <p class="text-[10px] font-black text-rose-600 uppercase mb-1">Critical Insight</p>
                      <p class="text-[11px] font-bold text-slate-700 leading-tight">
                        {{ dashboard?.statusDistribution?.behind > 0 ? `${dashboard.statusDistribution.behind} KPI masih di bawah target. Perlu tindakan segera.` : 'Masa berlaku ISO 9001 perlu diperiksa untuk renewal.' }}
                      </p>
                    </div>
                 </div>
                 <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex gap-4 transition-all hover:bg-white hover:shadow-md cursor-pointer">
                    <div class="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <i class="pi pi-check-circle"></i>
                    </div>
                    <div>
                      <p class="text-[10px] font-black text-emerald-600 uppercase mb-1">Efficiency Alert</p>
                      <p class="text-[11px] font-bold text-slate-700 leading-tight">
                        {{ dashboard?.statusDistribution?.onTrack > 0 ? `${dashboard.statusDistribution.onTrack} KPI berstatus On Track di periode terakhir.` : 'Utilitas aset produksi meningkat di Q2 2026.' }}
                      </p>
                    </div>
                 </div>
                 <div class="p-4 rounded-2xl bg-orange-50 border border-orange-100 flex gap-4 transition-all hover:bg-white hover:shadow-md cursor-pointer">
                    <div class="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                      <i class="pi pi-chart-line"></i>
                    </div>
                    <div>
                      <p class="text-[10px] font-black text-orange-600 uppercase mb-1">Trend Update</p>
                      <p class="text-[11px] font-bold text-slate-700 leading-tight">Total {{ (metrics.value?.length || 0) }} metrik di-tracking aktif di FY 2026.</p>
                    </div>
                 </div>
              </div>
              <div class="p-4 bg-slate-50 border-t border-slate-100 mt-auto">
                 <Button label="View Full Report" icon="pi pi-chart-bar" text class="w-full text-indigo-600 font-black text-[10px] uppercase tracking-widest" @click="showReportDialog = true" />
              </div>
           </div>

           <!-- Resources -->
           <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
              <h3 class="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Resources</h3>
              <div class="space-y-3">
                 <button @click="showGuideDialog = true" class="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group text-left">
                    <div class="flex items-center gap-3">
                      <i class="pi pi-book text-slate-400 group-hover:text-indigo-600 transition-colors"></i>
                      <span class="text-[11px] font-bold text-slate-600">Panduan BI Support</span>
                    </div>
                    <i class="pi pi-arrow-right text-[10px] text-slate-300 group-hover:text-indigo-400 transition-colors"></i>
                 </button>
                 <button @click="exportReport" class="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group text-left">
                    <div class="flex items-center gap-3">
                      <i class="pi pi-download text-slate-400 group-hover:text-indigo-600 transition-colors"></i>
                      <span class="text-[11px] font-bold text-slate-600">Export Raw Metrics (.csv)</span>
                    </div>
                    <i class="pi pi-arrow-right text-[10px] text-slate-300 group-hover:text-indigo-400 transition-colors"></i>
                 </button>
              </div>
           </div>
        </div>

      </div>
    </div>

    <!-- ═══════════════════════════════════ DIALOG: DASHBOARD SETTINGS ══════════════════════════════════ -->
    <Dialog v-model:visible="showSettingsDialog" modal :style="{ width: '520px' }" :draggable="false">
      <template #header>
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
            <i class="pi pi-cog text-sm"></i>
          </div>
          <div>
            <p class="text-xs font-black text-slate-400 uppercase tracking-widest">BI Dashboard</p>
            <h3 class="text-base font-black text-slate-900 uppercase tracking-tight">Dashboard Settings</h3>
          </div>
        </div>
      </template>
      <div class="space-y-6 py-4">
        <div>
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Alert Threshold (%)</label>
          <p class="text-[11px] text-slate-500 mb-3">KPI akan ditandai AT_RISK jika actual di bawah ambang ini.</p>
          <Slider v-model="settings.alertThreshold" :min="50" :max="100" class="w-full" />
          <div class="flex justify-between text-[10px] font-bold text-slate-400 mt-2">
            <span>50%</span><span class="text-indigo-600 font-black">{{ settings.alertThreshold }}%</span><span>100%</span>
          </div>
        </div>
        <div>
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Periode Aktif</label>
          <select v-model="settings.retentionPeriod" class="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <option v-for="p in metricPeriods" :key="p" :value="p">{{ p }}</option>
          </select>
        </div>
        <div>
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Frekuensi Laporan Otomatis</label>
          <div class="flex gap-3">
            <button v-for="freq in ['MONTHLY', 'QUARTERLY', 'ANNUAL']" :key="freq"
              @click="settings.reportFrequency = freq"
              :class="['flex-1 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all', settings.reportFrequency === freq ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-300']">
              {{ freq }}
            </button>
          </div>
        </div>
        <div class="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
          <div>
            <p class="text-[11px] font-black text-slate-700">Aktifkan Notifikasi Otomatis</p>
            <p class="text-[10px] text-slate-400">Kirim alert saat KPI melewati threshold</p>
          </div>
          <ToggleSwitch v-model="settings.enableAlerts" />
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-3">
          <Button label="Batal" severity="secondary" outlined rounded @click="showSettingsDialog = false" class="font-black text-[10px] uppercase tracking-widest" />
          <Button label="Simpan Pengaturan" icon="pi pi-check" rounded @click="saveSettings" class="bg-indigo-600 border-indigo-600 font-black text-[10px] uppercase tracking-widest" />
        </div>
      </template>
    </Dialog>

    <!-- ═══════════════════════════════════ DIALOG: FULL REPORT ══════════════════════════════════ -->
    <Dialog v-model:visible="showReportDialog" modal :style="{ width: '760px' }" :draggable="false">
      <template #header>
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
            <i class="pi pi-chart-bar text-sm"></i>
          </div>
          <div>
            <p class="text-xs font-black text-slate-400 uppercase tracking-widest">Support Analytics</p>
            <h3 class="text-base font-black text-slate-900 uppercase tracking-tight">Full BI Report — FY 2026</h3>
          </div>
        </div>
      </template>
      <div class="space-y-6 py-2">
        <!-- Summary Cards -->
        <div class="grid grid-cols-4 gap-4">
          <div v-for="s in stats" :key="s.label" class="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
            <i :class="[s.icon, 'text-2xl text-indigo-500 mb-2 block']"></i>
            <p class="text-2xl font-black text-slate-900">{{ s.value }}</p>
            <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{{ s.label }}</p>
          </div>
        </div>
        <!-- All Metrics Table -->
        <div>
          <h4 class="text-sm font-black text-slate-700 uppercase tracking-widest mb-4">Seluruh KPI Registry</h4>
          <div class="overflow-auto max-h-80 rounded-xl border border-slate-100">
            <table class="w-full text-left">
              <thead class="bg-slate-50 border-b border-slate-100 sticky top-0">
                <tr>
                  <th class="text-[9px] font-black text-slate-400 uppercase tracking-widest p-3">Nama KPI</th>
                  <th class="text-[9px] font-black text-slate-400 uppercase tracking-widest p-3">Kategori</th>
                  <th class="text-[9px] font-black text-slate-400 uppercase tracking-widest p-3">Periode</th>
                  <th class="text-[9px] font-black text-slate-400 uppercase tracking-widest p-3 text-right">Target</th>
                  <th class="text-[9px] font-black text-slate-400 uppercase tracking-widest p-3 text-right">Actual</th>
                  <th class="text-[9px] font-black text-slate-400 uppercase tracking-widest p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-50">
                <tr v-for="m in metrics" :key="m.id" class="hover:bg-slate-50/50">
                  <td class="p-3 text-[11px] font-bold text-slate-800">{{ m.name }}</td>
                  <td class="p-3"><span :class="['text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full text-white', getCategoryColor(m.category)]">{{ m.category }}</span></td>
                  <td class="p-3 text-[10px] font-bold text-slate-500">{{ m.period }}</td>
                  <td class="p-3 text-right text-[10px] font-black text-slate-500">{{ m.targetValue }}{{ m.unit === 'PERCENT' ? '%' : '' }}</td>
                  <td class="p-3 text-right text-[10px] font-black text-indigo-600">{{ m.actualValue }}{{ m.unit === 'PERCENT' ? '%' : '' }}</td>
                  <td class="p-3 text-center"><span :class="['text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full', getKpiColor(m.status)]">{{ m.status }}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-3">
          <Button label="Tutup" severity="secondary" outlined rounded @click="showReportDialog = false" class="font-black text-[10px] uppercase tracking-widest" />
          <Button label="Export CSV" icon="pi pi-download" rounded @click="exportReport" class="bg-indigo-600 border-indigo-600 font-black text-[10px] uppercase tracking-widest" />
        </div>
      </template>
    </Dialog>

    <!-- ═══════════════════════════════════ DIALOG: PANDUAN BI SUPPORT ══════════════════════════════════ -->
    <Dialog v-model:visible="showGuideDialog" modal :style="{ width: '600px' }" :draggable="false">
      <template #header>
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
            <i class="pi pi-book text-sm"></i>
          </div>
          <div>
            <p class="text-xs font-black text-slate-400 uppercase tracking-widest">Dokumentasi</p>
            <h3 class="text-base font-black text-slate-900 uppercase tracking-tight">Panduan BI Support</h3>
          </div>
        </div>
      </template>
      <div class="space-y-5 py-2 max-h-[65vh] overflow-y-auto pr-1">
        <div class="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
          <p class="text-[10px] font-black text-indigo-700 uppercase tracking-widest mb-1">Tentang Modul</p>
          <p class="text-[12px] text-slate-700 leading-relaxed">Modul <strong>Business Intelligence (BI) Support</strong> menyediakan dashboard terpadu untuk memantau KPI operasional, status kepatuhan regulasi, kesehatan aset, dan dokumen perusahaan secara real-time.</p>
        </div>

        <div v-for="section in [
          { icon: 'pi pi-th-large', title: 'Tab Dashboard', color: 'bg-sky-50 border-sky-100 text-sky-700', items: ['Menampilkan KPI aktif untuk periode terbaru (Q2 2026).', 'Setiap kartu menampilkan target, actual, status, dan sparkline tren.', 'Status: ON_TRACK (hijau), AT_RISK (oranye), BEHIND (merah).'] },
          { icon: 'pi pi-list', title: 'Tab Metrics (KPI Registry)', color: 'bg-emerald-50 border-emerald-100 text-emerald-700', items: ['Menampilkan seluruh histori KPI lintas periode.', 'Filter berdasarkan Kategori (Asset, Compliance, Document, HSE) dan Periode.', 'Berguna untuk analisis tren performa jangka panjang.'] },
          { icon: 'pi pi-shield', title: 'Kategori KPI', color: 'bg-orange-50 border-orange-100 text-orange-700', items: ['ASSET: Utilisasi dan pemeliharaan aset tetap.', 'COMPLIANCE: Kepatuhan sertifikasi dan audit.', 'DOCUMENT: Pengelolaan dan review dokumen.', 'HSE: Keselamatan kerja dan pelatihan K3.'] },
          { icon: 'pi pi-cog', title: 'Dashboard Settings', color: 'bg-violet-50 border-violet-100 text-violet-700', items: ['Alert Threshold: Batas % untuk menandai KPI sebagai AT_RISK.', 'Periode Aktif: Periode yang ditampilkan di tab Dashboard.', 'Frekuensi Laporan: Jadwal pengiriman laporan otomatis.'] },
        ]" :key="section.title">
          <div :class="['p-4 rounded-xl border', section.color]">
            <div class="flex items-center gap-2 mb-3">
              <i :class="[section.icon, 'text-sm']"></i>
              <p class="text-[11px] font-black uppercase tracking-widest">{{ section.title }}</p>
            </div>
            <ul class="space-y-1.5">
              <li v-for="item in section.items" :key="item" class="text-[11px] text-slate-600 flex gap-2">
                <span class="text-slate-400 mt-0.5">•</span> {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <template #footer>
        <Button label="Tutup Panduan" icon="pi pi-times" rounded outlined @click="showGuideDialog = false" class="font-black text-[10px] uppercase tracking-widest" />
      </template>
    </Dialog>

    <!-- ═══════════════════════════════════ DIALOG: KPI DETAIL ══════════════════════════════════ -->
    <Dialog v-model:visible="showKpiDetailDialog" modal :style="{ width: '640px' }" :draggable="false" @hide="selectedKpi = null">
      <template #header>
        <div class="flex items-center gap-3 w-full">
          <div :class="['w-10 h-10 rounded-xl text-white flex items-center justify-center flex-shrink-0', getCategoryColor(selectedKpi?.category)]">
            <i :class="getCategoryIcon(selectedKpi?.category)"></i>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">{{ selectedKpi?.category }} · {{ selectedKpi?.code }}</p>
            <h3 class="text-base font-black text-slate-900 leading-tight truncate">{{ selectedKpi?.name }}</h3>
          </div>
          <span :class="['text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex-shrink-0', getKpiColor(selectedKpi?.status)]">
            {{ getStatusLabel(selectedKpi?.status) }}
          </span>
        </div>
      </template>

      <div class="space-y-6 py-2">
        <!-- Achievement Hero Section -->
        <div class="rounded-2xl bg-gradient-to-br from-indigo-50 to-slate-50 border border-indigo-100 p-4">
          <div class="flex items-center gap-4">
            <!-- Circular Progress -->
            <div class="relative flex-shrink-0" style="width:90px;height:90px">
              <svg width="90" height="90" viewBox="0 0 90 90">
                <circle cx="45" cy="45" r="38" fill="none" stroke="#e2e8f0" stroke-width="8"/>
                <circle cx="45" cy="45" r="38" fill="none"
                  :stroke="selectedKpi?.status === 'ON_TRACK' ? '#10b981' : selectedKpi?.status === 'AT_RISK' ? '#f59e0b' : '#f43f5e'"
                  stroke-width="8"
                  stroke-linecap="round"
                  :stroke-dasharray="`${Math.min(achievementRate(selectedKpi), 100) * 2.39} 239`"
                  transform="rotate(-90 45 45)"
                  style="transition: stroke-dasharray 0.6s ease"
                />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center flex-col">
                <span class="text-lg font-black text-slate-900 leading-none">{{ Math.min(achievementRate(selectedKpi), 100) }}%</span>
                <span class="text-[8px] font-black text-slate-400 uppercase">achieve</span>
              </div>
            </div>

            <!-- Stats Grid -->
            <div class="flex-1 grid grid-cols-2 gap-4">
              <div class="bg-white rounded-xl p-3 border border-slate-100">
                <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Target</p>
                <p class="text-xl font-black text-slate-900 mt-0.5">
                  {{ selectedKpi?.targetValue }}<span class="text-sm font-bold text-slate-400 ml-0.5">{{ selectedKpi?.unit === 'PERCENT' ? '%' : selectedKpi?.unit === 'COUNT' ? 'x' : '' }}</span>
                </p>
              </div>
              <div class="bg-white rounded-xl p-3 border border-slate-100">
                <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Actual</p>
                <p class="text-xl font-black text-indigo-600 mt-0.5">
                  {{ selectedKpi?.actualValue }}<span class="text-sm font-bold text-indigo-300 ml-0.5">{{ selectedKpi?.unit === 'PERCENT' ? '%' : selectedKpi?.unit === 'COUNT' ? 'x' : '' }}</span>
                </p>
              </div>
              <div class="bg-white rounded-xl p-3 border border-slate-100">
                <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Periode</p>
                <p class="text-sm font-black text-slate-700 mt-0.5">{{ selectedKpi?.period }}</p>
              </div>
              <div class="bg-white rounded-xl p-3 border border-slate-100">
                <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Unit</p>
                <p class="text-sm font-black text-slate-700 mt-0.5">{{ selectedKpi?.unit }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Historical Trend -->
        <div v-if="kpiHistory.length > 1">
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-[11px] font-black text-slate-700 uppercase tracking-widest">Tren Historis</h4>
            <span class="text-[9px] font-bold text-slate-400">{{ kpiHistory.length }} periode terekam</span>
          </div>

          <!-- Bar Chart -->
          <div class="flex items-end gap-3 h-24 bg-slate-50 rounded-xl px-4 pt-3 pb-0 border border-slate-100">
            <div v-for="h in kpiHistory" :key="h.period" class="flex-1 flex flex-col items-center gap-1 h-full justify-end">
              <span class="text-[8px] font-black text-slate-500">{{ Number(h.actualValue) }}{{ h.unit === 'PERCENT' ? '%' : '' }}</span>
              <div class="w-full rounded-t-md transition-all duration-500" :style="`height: ${Math.min(Number(h.actualValue), 100)}%; background: ${getBarColor(h.status)}`"></div>
              <span class="text-[7px] font-black text-slate-400 uppercase pb-1">{{ h.period }}</span>
            </div>
            <!-- Target reference line label -->
          </div>
          <div class="flex items-center gap-2 mt-2">
            <div class="w-4 h-0.5 border-t-2 border-dashed border-slate-300"></div>
            <span class="text-[9px] font-bold text-slate-400">Target: {{ selectedKpi?.targetValue }}{{ selectedKpi?.unit === 'PERCENT' ? '%' : '' }}</span>
          </div>
        </div>

        <!-- Period-by-Period Table -->
        <div>
          <h4 class="text-[11px] font-black text-slate-700 uppercase tracking-widest mb-3">Rincian per Periode</h4>
          <div class="rounded-xl border border-slate-100 overflow-hidden">
            <table class="w-full text-left">
              <thead class="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th class="text-[9px] font-black text-slate-400 uppercase tracking-widest p-3">Periode</th>
                  <th class="text-[9px] font-black text-slate-400 uppercase tracking-widest p-3 text-right">Target</th>
                  <th class="text-[9px] font-black text-slate-400 uppercase tracking-widest p-3 text-right">Actual</th>
                  <th class="text-[9px] font-black text-slate-400 uppercase tracking-widest p-3 text-right">Pencapaian</th>
                  <th class="text-[9px] font-black text-slate-400 uppercase tracking-widest p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-50">
                <tr v-if="kpiHistory.length === 0">
                  <td colspan="5" class="text-center py-6 text-[11px] text-slate-400 font-bold">Tidak ada riwayat tersedia.</td>
                </tr>
                <tr v-for="h in kpiHistory" :key="h.period"
                  :class="['transition-colors', h.period === selectedKpi?.period ? 'bg-indigo-50/60' : 'hover:bg-slate-50/50']">
                  <td class="p-3">
                    <div class="flex items-center gap-2">
                      <span class="text-[10px] font-black text-slate-700">{{ h.period }}</span>
                      <span v-if="h.period === selectedKpi?.period" class="text-[7px] font-black text-indigo-600 bg-indigo-100 px-1.5 py-0.5 rounded-full uppercase tracking-widest">Current</span>
                    </div>
                  </td>
                  <td class="p-3 text-right text-[10px] font-black text-slate-500">{{ h.targetValue }}{{ h.unit === 'PERCENT' ? '%' : '' }}</td>
                  <td class="p-3 text-right text-[10px] font-black text-indigo-600">{{ h.actualValue }}{{ h.unit === 'PERCENT' ? '%' : '' }}</td>
                  <td class="p-3 text-right">
                    <div class="flex items-center justify-end gap-2">
                      <div class="w-16 bg-slate-100 rounded-full h-1" >
                        <div class="h-1 rounded-full transition-all" :class="getStatusBg(h.status)" :style="`width: ${Math.min(achievementRate(h), 100)}%`"></div>
                      </div>
                      <span class="text-[10px] font-black text-slate-700 w-8">{{ achievementRate(h) }}%</span>
                    </div>
                  </td>
                  <td class="p-3 text-center">
                    <span :class="['text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full', getKpiColor(h.status)]">{{ getStatusLabel(h.status) }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Notes -->
        <div v-if="selectedKpi?.notes" class="p-4 bg-amber-50 rounded-xl border border-amber-100">
          <p class="text-[9px] font-black text-amber-600 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <i class="pi pi-info-circle text-[10px]"></i> Catatan Analitik
          </p>
          <p class="text-[11px] text-slate-700 leading-relaxed">{{ selectedKpi.notes }}</p>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-3">
          <Button label="Tutup" severity="secondary" outlined rounded @click="showKpiDetailDialog = false" class="font-black text-[10px] uppercase tracking-widest" />
        </div>
      </template>
    </Dialog>

  </div>
</template>

<style scoped lang="postcss">
:deep(.p-selectbutton .p-button) {
  @apply text-[9px] font-black uppercase tracking-widest px-4 h-9 rounded-xl border-slate-200 bg-white text-slate-400;
}
:deep(.p-selectbutton .p-button.p-highlight) {
  @apply bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200;
}
:deep(.p-selectbutton .p-button.p-highlight::before) {
  display: none;
}
:deep(.p-progressbar) {
  @apply bg-slate-100;
}
:deep(.p-progressbar .p-progressbar-value) {
  @apply bg-indigo-500;
}
:deep(.p-slider .p-slider-handle) {
  @apply border-indigo-600 bg-white;
}
:deep(.p-slider .p-slider-range) {
  @apply bg-indigo-600;
}
</style>
