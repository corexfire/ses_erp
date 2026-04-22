<template>
  <div class="space-y-6">
    <!-- Header (Premium CRM Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group">
      <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-indigo-100"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-indigo-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Sales & Support</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-indigo-600">Personal Workspace</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase">Hello, <span class="text-indigo-600 italic">{{ auth.user?.name ?? 'CRM User' }}</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-xl">Ini adalah ringkasan pekerjaan yang membutuhkan tindakan Anda hari ini, mulai dari Follow-Up Leads hingga Support Ticket.</p>
        </div>
        <div class="flex gap-3">
          <Button label="Reload Data" icon="pi pi-refresh" :loading="loading" class="p-button-rounded font-black text-[10px] px-6 h-12 uppercase shadow-lg shadow-indigo-100 bg-indigo-600 border-none text-white transition-transform hover:scale-105 active:scale-95" @click="load" />
        </div>
      </div>
    </div>

    <div v-if="!canRead" class="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center text-slate-500 font-medium flex flex-col items-center">
      <i class="pi pi-lock text-4xl mb-3 text-slate-400"></i>
      Anda tidak memiliki izin (Permission) untuk mengakses My Work.
    </div>

    <!-- MAIN DASHBOARD -->
    <div v-else class="space-y-8 animate-fade-in-up">
  <!-- KPI Overview Banners (Premium Style) -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <!-- Active Leads Banner -->
    <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start justify-between transition-all hover:shadow-xl hover:-translate-y-1">
      <div>
        <div class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-1">Active Leads</div>
        <h3 class="text-4xl font-black text-slate-900 tracking-tighter">{{ data?.leads.length ?? 0 }}</h3>
      </div>
      <div class="p-4 bg-rose-50 text-rose-500 rounded-3xl border border-rose-100 shadow-inner group-hover:bg-rose-100 transition-colors">
        <i class="pi pi-users text-xl"></i>
      </div>
    </div>
    
    <!-- Pipeline Value Banner (Emerald High Contrast) -->
    <div class="p-4 rounded-xl bg-emerald-900 text-white shadow-xl flex items-start justify-between border border-emerald-800 transition-all hover:bg-emerald-950 hover:-translate-y-1 group">
      <div>
        <div class="text-[10px] font-black uppercase text-emerald-300 tracking-[0.2em] mb-1 opacity-80">Pipeline Liquidity</div>
        <h3 class="text-3xl font-black text-white tracking-tighter font-mono">{{ fmtRpRp(totalPipeline) }}</h3>
      </div>
      <div class="p-4 bg-emerald-600 rounded-3xl text-emerald-100 shadow-lg animate-pulse transition-transform group-hover:scale-110">
        <i class="pi pi-bolt text-xl"></i>
      </div>
    </div>

    <!-- Active Schedules Banner -->
    <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start justify-between transition-all hover:shadow-xl hover:-translate-y-1">
      <div>
        <div class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-1">Workload Index</div>
        <h3 class="text-4xl font-black text-amber-500 tracking-tighter">{{ pendingActivities }}</h3>
      </div>
      <div class="p-4 bg-amber-50 text-amber-500 rounded-3xl border border-amber-100 shadow-sm">
        <i class="pi pi-calendar-clock text-xl"></i>
      </div>
    </div>

    <!-- Support Integrity Banner (Indigo Themed) -->
    <div class="p-4 rounded-xl bg-indigo-900 text-white shadow-xl flex items-start justify-between border border-indigo-800 transition-all hover:bg-indigo-950 hover:-translate-y-1 group">
      <div>
        <div class="text-[10px] font-black uppercase text-indigo-300 tracking-[0.2em] mb-1 opacity-80">Service Integrity</div>
        <h3 class="text-3xl font-black text-white tracking-tighter font-mono">{{ openTickets }} <span class="text-xs uppercase font-sans text-indigo-400">Tickets</span></h3>
      </div>
      <div class="p-4 bg-indigo-600 rounded-3xl text-indigo-100 shadow-lg group-hover:rotate-12 transition-transform">
        <i class="pi pi-shield text-xl"></i>
      </div>
    </div>
  </div>

      <!-- Filters & Global Action (Premium Style) -->
      <div class="flex items-center justify-end px-2">
        <div class="bg-white p-1 rounded-2xl border border-slate-200 flex items-center shadow-sm">
          <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest px-4 border-r border-slate-100">Timeline Filter</span>
          <select v-model="filters.due" class="h-9 rounded-xl border-none px-4 text-[10px] font-black uppercase text-slate-700 bg-transparent outline-none cursor-pointer hover:text-indigo-600 transition-colors" :disabled="loading">
            <option value="all">Semua Tenggat Waktu</option>
            <option value="today">Hari Ini (Today)</option>
            <option value="overdue">Terlambat (Overdue)</option>
          </select>
        </div>
      </div>

      <!-- KANBAN / GRID CONTENT -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <!-- 1. PENDING ACTIVITIES -->
        <div class="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col h-[550px] overflow-hidden transition-all hover:shadow-lg">
          <div class="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/10">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-amber-100 text-amber-700 rounded-lg"><i class="pi pi-calendar"></i></div>
              <h3 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">Schedule & Activities</h3>
            </div>
            <span class="bg-slate-200 text-slate-700 text-[10px] font-black px-2.5 py-1 rounded-full">{{ data?.activities.length ?? 0 }}</span>
          </div>
          <div class="p-4 overflow-y-auto flex-1 bg-slate-50/30 space-y-3 custom-scrollbar">
            <div v-for="a in filteredActivities" :key="a.id" class="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-amber-400 hover:shadow-md transition-all cursor-pointer group">
              <div class="flex justify-between items-start mb-3">
                <span class="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg border" :class="activityBadge(a.type)">{{ a.type }}</span>
                <span v-if="a.isOverdue && a.status !== 'DONE'" class="text-[9px] font-black bg-rose-500 text-white px-2 py-0.5 rounded-lg animate-pulse shadow-lg shadow-rose-100">OVERDUE</span>
                <span v-else-if="a.status === 'DONE'" class="text-[9px] font-black bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-lg border border-emerald-100"><i class="pi pi-check text-[8px] mr-1"></i>DONE</span>
              </div>
              <div class="font-black text-slate-900 text-sm leading-tight mb-3 uppercase tracking-tight group-hover:text-indigo-600 transition-colors">{{ a.subject }}</div>
              <div class="flex justify-between items-center pt-3 border-t border-slate-50">
                <div class="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <template v-if="a.opportunity"><i class="pi pi-money-bill text-slate-300"></i> {{ a.opportunity.code }}</template>
                  <template v-else-if="a.lead"><i class="pi pi-user text-slate-300"></i> {{ a.lead.code }}</template>
                  <template v-else-if="a.customer"><i class="pi pi-building text-slate-300"></i> {{ a.customer.code }}</template>
                </div>
                <div class="flex items-center gap-1.5 text-[10px] font-black font-mono px-2 py-1 rounded-lg bg-slate-50 border border-slate-100" :class="a.isOverdue && a.status !== 'DONE' ? 'text-rose-600' : 'text-slate-500'">
                  <i class="pi pi-clock text-[9px]"></i> {{ a.dueAt ? formatDateString(a.dueAt) : 'No Date' }}
                </div>
              </div>
            </div>
            <div v-if="filteredActivities.length === 0" class="flex flex-col items-center justify-center h-full text-slate-300 py-20 italic">
               <i class="pi pi-check-square text-5xl mb-4 opacity-20"></i>
               <span class="text-xs font-medium">Beban kerja hari ini sudah selesai!</span>
            </div>
          </div>
        </div>

        <!-- 2. MY DEALS (OPPORTUNITIES) -->
        <div class="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col h-[550px] overflow-hidden transition-all hover:shadow-lg">
          <div class="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/10">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-emerald-100 text-emerald-700 rounded-lg"><i class="pi pi-money-bill"></i></div>
              <h3 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">Pipeline & Active Deals</h3>
            </div>
            <span class="bg-slate-200 text-slate-700 text-[10px] font-black px-2.5 py-1 rounded-full">{{ data?.opportunities.length ?? 0 }}</span>
          </div>
          <div class="p-4 overflow-y-auto flex-1 bg-slate-50/30 space-y-3 custom-scrollbar">
            <div v-for="o in data?.opportunities ?? []" :key="o.id" class="p-5 bg-white border border-slate-100 hover:border-emerald-400 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col relative overflow-hidden"
              :style="{ borderLeft: `4px solid ${stageColor(o.stage)}` }">
              <div class="flex justify-between items-start mb-3">
                <a class="text-[10px] font-black font-mono text-indigo-600 hover:underline bg-slate-50 px-2 py-0.5 rounded border border-slate-100" :href="`/crm/opportunities/${o.id}`">{{ o.code }}</a>
                <span class="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg border" :style="{ backgroundColor: stageColor(o.stage) + '11', color: stageColor(o.stage), borderColor: stageColor(o.stage) + '33' }">{{ o.stage }}</span>
              </div>
              <div class="font-black text-slate-900 text-sm truncate uppercase tracking-tight group-hover:text-emerald-600 transition-colors">{{ o.name }}</div>
              <div class="flex justify-between items-end mt-4 pt-4 border-t border-slate-50 border-dashed">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400"><i class="pi pi-building text-[10px]"></i></div>
                  <div class="text-[9px] font-black text-slate-500 uppercase tracking-tighter truncate w-32">
                    <template v-if="o.customer">{{ o.customer.name || o.customer.code }}</template>
                    <template v-else-if="o.lead">{{ o.lead.name || o.lead.code }}</template>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-0.5 leading-none text-right">EXPECTED VALUE</div>
                  <div class="font-black font-mono text-emerald-600 text-lg leading-none tracking-tighter">{{ fmtRpRp(o.expectedValue ?? 0) }}</div>
                </div>
              </div>
            </div>
            <div v-if="(data?.opportunities?.length ?? 0) === 0" class="flex flex-col items-center justify-center h-full text-slate-300 py-20 italic">
               <i class="pi pi-database text-5xl mb-4 opacity-20"></i>
               <span class="text-xs font-medium">Belum ada peluang penjualan aktif.</span>
            </div>
          </div>
        </div>

        <!-- 3. MY LEADS -->
        <div class="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col h-[450px] overflow-hidden transition-all hover:shadow-lg">
          <div class="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/10">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-rose-100 text-rose-700 rounded-lg"><i class="pi pi-users"></i></div>
              <h3 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">Active Leads Pipeline</h3>
            </div>
            <span class="bg-slate-200 text-slate-700 text-[10px] font-black px-2.5 py-1 rounded-full">{{ data?.leads.length ?? 0 }}</span>
          </div>
          <div class="overflow-y-auto flex-1 custom-scrollbar">
            <table class="w-full text-sm">
              <thead class="bg-slate-50/50 text-left text-[9px] text-slate-400 uppercase tracking-widest sticky top-0 z-10">
                <tr>
                  <th class="px-6 py-4 font-black">Lead Profile & Code</th>
                  <th class="px-6 py-4 font-black text-right">Current Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-50">
                <tr v-for="l in data?.leads ?? []" :key="l.id" class="hover:bg-slate-50/80 transition-all group">
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                       <div class="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-rose-50 group-hover:text-rose-500 transition-colors">
                          <i class="pi pi-user text-xs"></i>
                       </div>
                       <div class="flex flex-col">
                          <div class="font-black text-slate-900 group-hover:text-indigo-600 transition-colors truncate w-48 uppercase tracking-tight" :title="l.name">{{ l.name }}</div>
                          <a class="text-[9px] font-mono text-slate-400 font-bold hover:underline" :href="`/crm/leads/${l.id}`">{{ l.code }}</a>
                       </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <span class="text-[9px] font-black px-3 py-1 rounded-lg border uppercase tracking-widest shadow-sm" :class="leadBadge(l.status)">{{ l.status }}</span>
                  </td>
                </tr>
                <tr v-if="(data?.leads?.length ?? 0) === 0">
                  <td colspan="2" class="py-20 text-center text-slate-300 italic">
                     <i class="pi pi-users text-5xl mb-4 opacity-20 block"></i>
                     <span class="text-xs font-medium">Buku alamat lead saat ini kosong.</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 4. SUPPORT TICKETS -->
        <div class="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col h-[450px] overflow-hidden transition-all hover:shadow-lg">
          <div class="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/10">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-blue-100 text-blue-700 rounded-lg"><i class="pi pi-ticket"></i></div>
              <h3 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">Service & Support Tickets</h3>
            </div>
            <span class="bg-slate-200 text-slate-700 text-[10px] font-black px-2.5 py-1 rounded-full">{{ data?.tickets.length ?? 0 }}</span>
          </div>
          <div class="p-4 overflow-y-auto flex-1 bg-slate-50/30 space-y-3 custom-scrollbar">
            <div v-for="t in data?.tickets ?? []" :key="t.id" class="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm flex gap-4 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group">
              <div class="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 border border-slate-100 shrink-0 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                <i class="pi pi-fw text-xl" :class="t.status === 'RESOLVED' || t.status === 'CLOSED' ? 'pi-check-circle text-emerald-500' : 'pi-exclamation-circle text-blue-500'"></i>
                <div class="text-[8px] font-black uppercase mt-1 text-slate-400 tracking-tighter">{{ t.status }}</div>
              </div>
              <div class="min-w-0 flex-1">
                <div class="text-[9px] font-mono font-black text-indigo-600 mb-0.5">{{ t.code }}</div>
                <div class="font-black text-sm text-slate-900 truncate mb-2 uppercase tracking-tight group-hover:text-blue-600 transition-colors" :title="t.subject">{{ t.subject }}</div>
                <div class="flex justify-between items-center border-t border-slate-50 pt-2 border-dashed">
                  <div class="text-[9px] font-bold text-slate-400 uppercase flex items-center gap-1.5"><i class="pi pi-building text-slate-300"></i> {{ t.customer?.code ?? 'N/A' }}</div>
                  <div class="text-[9px] font-black px-2 py-0.5 rounded-lg text-white shadow-sm" :class="priorityColor(t.priority)">{{ t.priority }}</div>
                </div>
              </div>
            </div>
            <div v-if="(data?.tickets?.length ?? 0) === 0" class="flex flex-col items-center justify-center h-full text-slate-300 py-20 italic">
               <i class="pi pi-check-circle text-5xl mb-4 opacity-20"></i>
               <span class="text-xs font-medium">Semua tiket layanan telah terselesaikan!</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

type Lead = { id: string; code: string; name: string; status: string };
type Opportunity = { id: string; code: string; name: string; stage: string; expectedValue: number; customer?: any; lead?: any };
type Activity = {
  id: string; type: string; subject: string; status: string; dueAt: string | null; isOverdue?: boolean;
  lead?: { id: string; code: string } | null;
  customer?: { id: string; code: string } | null;
  opportunity?: { id: string; code: string } | null;
};
type Ticket = {
  id: string; code: string; subject: string; status: string; priority: string; customer?: { id: string; code: string } | null;
  slaDueAt?: string | null; isOverdue?: boolean;
};
type MyWork = { leads: Lead[]; opportunities: Opportunity[]; activities: Activity[]; tickets: Ticket[] };

const api = useApi();
const auth = useAuthStore();
const canRead = computed(() => auth.hasPermission('crm.my_work.read'));

const loading = ref(false);
const error = ref<string | null>(null);
const data = ref<MyWork | null>(null);

const filters = reactive({ due: 'all' });

const totalPipeline = computed(() => data.value?.opportunities?.reduce((s, o) => s + Number(o.expectedValue ?? 0), 0) ?? 0);
const pendingActivities = computed(() => data.value?.activities?.filter(a => a.status === 'OPEN').length ?? 0);
const openTickets = computed(() => data.value?.tickets?.filter(t => t.status === 'OPEN' || t.status === 'IN_PROGRESS').length ?? 0);

const filteredActivities = computed(() => {
  return data.value?.activities ?? []; // we let backend filter due via api payload, and keep all returned locally
});

const fmtRpRp = (n: number|string) => {
  const v = Number(n);
  if (v >= 1_000_000_000) return `Rp ${(v/1_000_000_000).toFixed(2)} M`;
  if (v >= 1_000_000) return `Rp ${(v/1_000_000).toFixed(1)} Jt`;
  return `Rp ${v.toLocaleString('id-ID')}`;
};

const formatDateString = (iso: string) => {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};

const activityBadge = (type: string) => {
  if (type === 'CALL') return 'bg-sky-50 text-sky-600 border-sky-100';
  if (type === 'MEETING') return 'bg-purple-50 text-purple-600 border-purple-100';
  if (type === 'EMAIL') return 'bg-amber-50 text-amber-600 border-amber-100';
  return 'bg-slate-50 text-slate-600 border-slate-100';
};

const priorityColor = (p: string) => {
  if (p === 'URGENT') return 'bg-rose-600';
  if (p === 'HIGH') return 'bg-orange-500';
  if (p === 'MEDIUM') return 'bg-indigo-500';
  return 'bg-slate-400'; // LOW
};

const stageColor = (stage: string) => {
  const map: any = {
    'QUALIFICATION': '#6366f1',
    'PROPOSAL': '#f59e0b',
    'NEGOTIATION': '#3b82f6',
    'CLOSED_WON': '#10b981',
    'CLOSED_LOST': '#ef4444'
  };
  return map[stage] || '#64748b';
};

const leadBadge = (status: string) => {
  if (status === 'NEW') return 'bg-blue-50 text-blue-600 border-blue-200';
  if (status === 'CONTACTED') return 'bg-amber-50 text-amber-600 border-amber-200';
  if (status === 'QUALIFIED') return 'bg-emerald-50 text-emerald-600 border-emerald-200';
  if (status === 'LOST') return 'bg-rose-50 text-rose-600 border-rose-200';
  return 'bg-slate-50 text-slate-600 border-slate-200';
};

const load = async () => {
  if (!canRead.value) return;
  loading.value = true; error.value = null;
  try {
    const params: Record<string, string> = { due: filters.due };
    const res = await api.get('/crm/my-work', { params });
    data.value = res.data ?? res ?? null;
    
    // Sort activities so overdue/open is on top
    if (data.value && data.value.activities) {
      data.value.activities.sort((a, b) => {
        if (a.status === 'DONE' && b.status !== 'DONE') return 1;
        if (a.status !== 'DONE' && b.status === 'DONE') return -1;
        return 0;
      });
    }

  } catch (e: any) {
    error.value = e?.response?.data?.message ?? 'Gagal load';
  } finally {
    loading.value = false;
  }
};

watch(() => filters.due, load);
onMounted(load);
</script>

<style scoped lang="postcss">
.animate-fade-in-up { 
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
}

@keyframes fadeInUp { 
  from { opacity: 0; transform: translateY(30px); } 
  to { opacity: 1; transform: translateY(0); } 
}

.custom-scrollbar::-webkit-scrollbar { 
  width: 4px; 
}
.custom-scrollbar::-webkit-scrollbar-track { 
  background: transparent; 
}
.custom-scrollbar::-webkit-scrollbar-thumb { 
  background: #e2e8f0; 
  border-radius: 10px; 
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover { 
  background: #cbd5e1; 
}

:deep(.p-button-indigo) {
  @apply bg-indigo-600 border-indigo-600 hover:bg-indigo-700 transition-all;
}
</style>
