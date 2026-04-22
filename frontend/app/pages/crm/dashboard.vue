<template>
  <div class="space-y-4">
    <!-- Header (Premium CRM Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group">
      <div class="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-purple-100"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-purple-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">CRM</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-purple-600">Executive Dashboard</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none">Executive <span class="text-purple-600">CRM Dashboard</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-xl">Tinjauan Real-Time Kinerja Penjualan, Prospek Klien, Retensi Pelanggan, dan Antrian Pelayanan.</p>
        </div>
        <div class="flex gap-3">
          <Button label="Refresh Data" severity="secondary" outlined class="p-button-rounded font-black text-[10px] px-6 h-12 uppercase" icon="pi pi-refresh" @click="load" :loading="loading" />
        </div>
      </div>
    </div>

    <!-- Error/Lock State -->
    <div v-if="error" class="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl font-bold flex items-center gap-2 animate-fade-in">
      <i class="pi pi-exclamation-triangle"></i> {{ error }}
    </div>
    <div v-if="!canRead" class="bg-white border p-12 rounded-xl text-center shadow-sm animate-fade-in">
      <i class="pi pi-lock text-5xl mb-4 text-slate-300"></i>
      <h2 class="text-lg font-black text-slate-700">Akses Ditolak</h2>
      <p class="text-slate-500 font-medium mt-1">Anda tidak memiliki permission untuk melihat Dashboard CRM.</p>
    </div>

    <!-- Dashboard Body -->
    <div v-else-if="dashboard" class="space-y-4">
      
      <!-- Overview Banners -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-4 transition-all hover:shadow-xl hover:-translate-y-1">
          <div class="p-4 bg-purple-100 rounded-3xl text-purple-600 text-xl border shadow-inner"><i class="pi pi-chart-line"></i></div>
          <div>
            <div class="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Real-time Sales Performance</div>
            <p class="text-xs text-slate-600 leading-relaxed font-medium">Pantau performa penjualan dan pipeline deals secara real-time untuk pengambilan keputusan strategis.</p>
          </div>
        </div>
        <div class="p-4 rounded-xl bg-purple-900 text-white shadow-xl flex items-start gap-4 border border-purple-800 transition-all hover:bg-purple-950">
          <div class="p-4 bg-purple-600 rounded-3xl text-white text-xl shadow-lg animate-pulse"><i class="pi pi-users"></i></div>
          <div>
            <div class="text-[10px] font-black uppercase text-purple-300 tracking-widest mb-1">Customer Intelligence</div>
            <p class="text-xs text-purple-100/80 leading-relaxed font-medium">Analisis mendalam perilaku pelanggan, lead conversion, dan retensi untuk pertumbuhan bisnis berkelanjutan.</p>
          </div>
        </div>
      </div>

      <!-- KPI Metric Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <!-- Card Leads -->
        <div class="p-5 rounded-xl bg-white border border-slate-200 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
          <div class="flex items-center justify-between mb-3">
            <span class="text-[9px] font-black uppercase tracking-widest text-sky-600">Total Leads</span>
            <i class="pi pi-users text-slate-300"></i>
          </div>
          <div class="text-3xl font-black text-slate-900 tracking-tighter">{{ dashboard.summary.leadCount }}</div>
        </div>

        <!-- Card Customers -->
        <div class="p-5 rounded-xl bg-white border border-slate-200 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
          <div class="flex items-center justify-between mb-3">
            <span class="text-[9px] font-black uppercase tracking-widest text-indigo-600">Pelanggan Aktif</span>
            <i class="pi pi-building text-slate-300"></i>
          </div>
          <div class="text-3xl font-black text-slate-900 tracking-tighter">{{ dashboard.summary.customerCount }}</div>
        </div>

        <!-- Card Opportunities -->
        <div class="p-5 rounded-xl bg-white border border-slate-200 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
          <div class="flex items-center justify-between mb-3">
            <span class="text-[9px] font-black uppercase tracking-widest text-emerald-600">Open Deals</span>
            <i class="pi pi-chart-line text-slate-300"></i>
          </div>
          <div class="text-3xl font-black text-slate-900 tracking-tighter">{{ dashboard.summary.opportunityCount }}</div>
        </div>

        <!-- Card Activities -->
        <div class="p-5 rounded-xl bg-white border border-slate-200 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
          <div class="flex items-center justify-between mb-3">
            <span class="text-[9px] font-black uppercase tracking-widest text-amber-600">Task Penjualan</span>
            <i class="pi pi-calendar text-slate-300"></i>
          </div>
          <div class="text-3xl font-black text-slate-900 tracking-tighter">{{ dashboard.summary.activityOpenCount }}</div>
          <div class="mt-2 text-[10px] font-black flex items-center gap-1" :class="dashboard.summary.activityOverdueCount > 0 ? 'text-rose-600' : 'text-amber-700'">
            <i v-if="dashboard.summary.activityOverdueCount > 0" class="pi pi-exclamation-triangle"></i>
            Overdue: {{ dashboard.summary.activityOverdueCount }} Task
          </div>
        </div>

        <!-- Card Tickets -->
        <div class="p-5 rounded-xl bg-white border border-slate-200 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
          <div class="flex items-center justify-between mb-3">
            <span class="text-[9px] font-black uppercase tracking-widest text-rose-600">Tiket Terbuka</span>
            <i class="pi pi-ticket text-slate-300"></i>
          </div>
          <div class="text-3xl font-black text-slate-900 tracking-tighter">{{ dashboard.summary.ticketOpenCount }}</div>
          <div class="mt-2 text-[10px] font-black flex items-center gap-1" :class="dashboard.summary.ticketOverdueCount > 0 ? 'text-rose-600' : 'text-rose-700'">
            <i v-if="dashboard.summary.ticketOverdueCount > 0" class="pi pi-exclamation-triangle"></i>
            Overdue: {{ dashboard.summary.ticketOverdueCount }} Tiket
          </div>
        </div>
      </div>

      <!-- Charts & Visuals row 1 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div class="rounded-xl bg-white border border-slate-200 shadow-sm p-4 relative overflow-hidden flex flex-col">
          <div class="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-slate-100 pb-3 shrink-0">
            <i class="pi pi-filter text-emerald-500 bg-emerald-50 p-1.5 rounded"></i> Opportunity Pipeline Funnel
          </div>
          <div class="space-y-4 relative z-10 flex-1 flex flex-col justify-center">
            <div v-for="row in oppByStage" :key="row.key" class="flex flex-col gap-1.5 group">
              <div class="flex justify-between text-[11px] font-black text-slate-600 uppercase tracking-widest">
                <span>{{ row.key.replace('_', ' ') }}</span>
                <span class="text-emerald-700">{{ row.count }} Deals ({{row.pct}}%)</span>
              </div>
              <div class="h-4 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                <div class="h-full rounded-full transition-all duration-1000 ease-out group-hover:brightness-110" 
                    :style="{ width: `${row.pct}%`, backgroundImage: getOppGradient(row.key) }"></div>
              </div>
            </div>
            <div v-if="oppByStage.length === 0" class="text-center text-slate-400 py-6 text-sm font-medium italic">Tidak ada data active opportunities.</div>
          </div>
        </div>

        <div class="rounded-xl bg-white border border-slate-200 shadow-sm p-4 relative overflow-hidden flex flex-col">
          <div class="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-slate-100 pb-3 shrink-0">
            <i class="pi pi-star text-sky-500 bg-sky-50 p-1.5 rounded"></i> Lead Conversion Distribusi
          </div>
          <div class="space-y-4 relative z-10 flex-1 flex flex-col justify-center">
            <div v-for="row in leadsByStatus" :key="row.key" class="group flex items-center gap-4">
              <div class="w-24 text-[10px] font-black text-slate-500 tracking-widest uppercase">{{ row.key }}</div>
              <div class="flex-1 h-9 rounded-lg bg-slate-50 border relative overflow-hidden flex items-center shadow-inner">
                <div class="absolute inset-y-0 left-0 transition-all duration-1000 ease-out group-hover:opacity-90" 
                    :style="{ width: `${row.pct}%`, backgroundColor: getLeadColor(row.key) }"></div>
                <div class="relative z-10 ml-3 text-xs font-black shadow-sm" :class="row.pct > 15 ? 'text-white' : 'text-slate-600'">{{ row.pct }}%</div>
              </div>
              <div class="w-12 text-right text-lg font-black text-slate-800">{{ row.count }}</div>
            </div>
            <div v-if="leadsByStatus.length === 0" class="text-center text-slate-400 py-6 text-sm font-medium italic">Data Lead kosong.</div>
          </div>
        </div>
      </div>

      <!-- Tables row 2 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[350px]">
          <div class="p-5 border-b border-slate-100 bg-slate-50/10 flex items-center justify-between shrink-0">
            <div class="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
              <i class="pi pi-calendar-plus text-amber-500 bg-amber-100 p-1.5 rounded"></i> Agenda Kegiatan (Aktivitas)
            </div>
          </div>
          <div class="flex-1 overflow-auto">
            <table class="w-full text-sm h-full">
              <thead class="text-left text-[10px] text-slate-400 uppercase tracking-widest font-black">
                <tr>
                  <th class="px-4 py-3 border-r bg-slate-50">Jatuh Tempo</th>
                  <th class="px-3 py-3 border-r text-center bg-slate-50">Tipe</th>
                  <th class="px-4 py-3 bg-slate-50">Subject Tagihan Task</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr v-for="a in dashboard.upcomingActivities" :key="a.id" class="hover:bg-amber-50/30 transition-colors">
                  <td class="px-4 py-3 whitespace-nowrap border-r align-top w-28">
                    <div class="text-[11px] font-black tracking-widest uppercase" :class="isOverdue(a.dueAt) ? 'text-rose-600' : 'text-slate-700'">{{ a.dueAt ? formatDate(a.dueAt) : '-' }}</div>
                    <div v-if="isOverdue(a.dueAt)" class="text-[9px] font-black uppercase text-rose-500 mt-0.5 bg-rose-100 px-1 py-0.5 rounded inline-block">Overdue</div>
                  </td>
                  <td class="px-3 py-3 text-center border-r align-top w-24">
                    <span class="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md border inline-block" 
                          :class="getActivityClass(a.type)">
                          {{ a.type }}
                    </span>
                  </td>
                  <td class="px-4 py-3 align-top">
                    <div class="text-[12px] font-bold text-slate-800 line-clamp-2 leading-relaxed" :title="a.subject">{{ a.subject }}</div>
                  </td>
                </tr>
                <tr v-if="dashboard.upcomingActivities.length === 0">
                  <td colspan="3" class="px-4 py-12 text-center text-slate-400 h-[250px]">
                    <div class="flex flex-col items-center justify-center h-full">
                      <i class="pi pi-check-circle text-4xl mb-3 text-emerald-300"></i>
                      <span class="text-xs font-medium italic">Bagus! Tidak ada aktivitas mendesakkan.</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[350px]">
          <div class="p-5 border-b border-slate-100 bg-slate-50/10 flex items-center justify-between shrink-0">
            <div class="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
              <i class="pi pi-book text-rose-500 bg-rose-100 p-1.5 rounded"></i> Live Support Tickets
            </div>
          </div>
          <div class="p-5 flex-1 bg-slate-50/30 overflow-auto">
            <div class="space-y-4">
              <div v-for="row in ticketsByStatus" :key="row.key" class="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div class="flex items-center gap-3">
                  <span class="w-3 h-3 rounded-full shadow-inner border border-black/10" :style="{ backgroundColor: getTicketColor(row.key) }"></span>
                  <span class="text-[11px] font-black text-slate-700 uppercase tracking-widest">{{ row.key.replace('_', ' ') }}</span>
                </div>
                <div class="text-2xl font-black text-slate-800">{{ row.count }} <span class="text-[10px] text-slate-400 font-bold uppercase ml-1 tracking-widest">Tiket</span></div>
              </div>
              <div v-if="ticketsByStatus.length === 0" class="h-full flex flex-col items-center justify-center text-slate-400 py-12">
                <i class="pi pi-inbox text-4xl mb-3 text-slate-300"></i>
                <span class="text-sm font-medium italic">Kotak masuk tiket layanan kosong.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useApi } from '~/composables/useApi';
import { useAuthStore } from '~/stores/auth';

type Dashboard = {
  summary: {
    leadCount: number;
    customerCount: number;
    opportunityCount: number;
    activityOpenCount: number;
    activityOverdueCount: number;
    ticketOpenCount: number;
    ticketOverdueCount: number;
  };
  distributions: {
    opportunitiesByStage: { stage: string; count: number }[];
    leadsByStatus: { status: string; count: number }[];
    ticketsByStatus: { status: string; count: number }[];
  };
  upcomingActivities: { id: string; dueAt: string | null; type: string; subject: string }[];
};

const api = useApi();
const auth = useAuthStore();

const canRead = computed(() => auth.hasPermission('crm.dashboard.read'));

const loading = ref(false);
const error = ref<string | null>(null);
const dashboard = ref<Dashboard | null>(null);

const pad = (n: number) => String(n).padStart(2, '0');
const formatDate = (iso: string) => {
  const d = new Date(iso);
  const m = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  return `${pad(d.getDate())} ${m[d.getMonth()]} ${d.getFullYear().toString().slice(2)}`;
};

const isOverdue = (iso: string | null) => {
  if (!iso) return false;
  return new Date(iso).getTime() < new Date().getTime() - 86400000;
};

const load = async () => {
  loading.value = true;
  error.value = null;
  try {
    if (!canRead.value) {
      dashboard.value = null;
      return;
    }
    const res = await api.get('/crm/dashboard');
    dashboard.value = res.data ?? null;
  } catch (e: any) {
    error.value = e?.response?.data?.message ?? 'Gagal load dashboard CRM';
  } finally {
    loading.value = false;
  }
};

// Computed Charts Metrics
const oppByStage = computed(() => {
  const dist = dashboard.value?.distributions.opportunitiesByStage ?? [];
  const total = dist.reduce((a, b) => a + b.count, 0) || 1;
  const stagesOrdered = ['QUALIFICATION', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST'];
  
  return dist
    .slice()
    .sort((a, b) => stagesOrdered.indexOf(a.stage) - stagesOrdered.indexOf(b.stage))
    .map((x) => ({ key: x.stage, count: x.count, pct: Math.round((x.count / total) * 100) }));
});

const leadsByStatus = computed(() => {
  const dist = dashboard.value?.distributions.leadsByStatus ?? [];
  const total = dist.reduce((a, b) => a + b.count, 0) || 1;
  const statesOrdered = ['NEW', 'CONTACTED', 'QUALIFIED', 'WON', 'LOST'];

  return dist
    .slice()
    .sort((a, b) => statesOrdered.indexOf(a.status) - statesOrdered.indexOf(b.status))
    .map((x) => ({ key: x.status, count: x.count, pct: Math.round((x.count / total) * 100) }));
});

const ticketsByStatus = computed(() => {
  const dist = dashboard.value?.distributions.ticketsByStatus ?? [];
  return dist
    .slice()
    .sort((a, b) => b.count - a.count)
    .map((x) => ({ key: x.status, count: x.count }));
});

// --- Dynamic Visual Settings ---
const getOppGradient = (stage: string) => {
  if (stage === 'QUALIFICATION') return 'linear-gradient(to right, #e879f9, #c026d3)';
  if (stage === 'PROPOSAL') return 'linear-gradient(to right, #fbbf24, #d97706)';
  if (stage === 'NEGOTIATION') return 'linear-gradient(to right, #60a5fa, #2563eb)';
  if (stage === 'CLOSED_WON') return 'linear-gradient(to right, #10b981, #059669)';
  return 'linear-gradient(to right, #f43f5e, #e11d48)';
};

const getLeadColor = (status: string) => {
  if (status === 'NEW') return '#0ea5e9';
  if (status === 'CONTACTED') return '#f59e0b';
  if (status === 'QUALIFIED') return '#10b981';
  if (status === 'WON') return '#8b5cf6';
  return '#ef4444';
};

const getTicketColor = (status: string) => {
  if (status === 'OPEN') return '#ef4444'; 
  if (status === 'IN_PROGRESS') return '#f59e0b'; 
  if (status === 'RESOLVED') return '#3b82f6'; 
  if (status === 'CLOSED') return '#10b981'; 
  return '#94a3b8'; 
};

const getActivityClass = (type: string) => {
  if (type === 'CALL') return 'bg-sky-100 text-sky-700 border-sky-200';
  if (type === 'MEETING') return 'bg-purple-100 text-purple-700 border-purple-200';
  if (type === 'EMAIL') return 'bg-indigo-100 text-indigo-700 border-indigo-200';
  return 'bg-slate-100 text-slate-700 border-slate-200';
};

onMounted(load);
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

:deep(thead > tr > th) {
  background: transparent !important;
  font-size: 10px !important;
  font-weight: 900 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.1em !important;
  color: #94a3b8 !important;
  border-bottom: 2px solid #f1f5f9 !important;
  padding: 1rem !important;
}

:deep(tbody > tr) {
  background: transparent !important;
  transition: all 0.2s ease;
}

:deep(tbody > tr:hover) {
  background: rgba(241, 245, 249, 0.5) !important;
}
</style>
