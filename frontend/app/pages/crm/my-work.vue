<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-gradient-to-r from-blue-900 to-indigo-900 p-6 shadow-lg text-white">
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <div class="text-[10px] font-black text-blue-300 uppercase tracking-widest"><i class="pi pi-briefcase mr-1"></i> Sales & Support Workspace</div>
          <div class="text-2xl font-black mt-1">Hello, {{ auth.user?.name ?? 'CRM User' }}!</div>
          <div class="text-sm text-blue-200 mt-1 max-w-xl">
            Selamat datang di Workspace Anda. Ini adalah ringkasan pekerjaan yang membutuhkan tindakan Anda hari ini, mulai dari Follow-Up Leads hingga Support Ticket.
          </div>
        </div>
        <div class="flex gap-2">
          <Button label="Reload Data" icon="pi pi-refresh" :loading="loading" size="small" class="bg-blue-800 border-none text-white font-bold hover:bg-blue-700" @click="load" />
        </div>
      </div>
    </div>

    <div v-if="!canRead" class="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center text-slate-500 font-medium flex flex-col items-center">
      <i class="pi pi-lock text-4xl mb-3 text-slate-400"></i>
      Anda tidak memiliki izin (Permission) untuk mengakses My Work.
    </div>

    <!-- MAIN DASHBOARD -->
    <div v-else class="space-y-6 animate-fade-in-up">
      <!-- KPI Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-white border rounded-xl p-4 shadow-sm flex items-center justify-between hover:shadow-md transition">
          <div>
            <div class="text-[10px] font-black text-rose-500 uppercase tracking-widest">Active Leads</div>
            <div class="text-3xl font-black text-slate-800 mt-0.5">{{ data?.leads.length ?? 0 }}</div>
          </div>
          <div class="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center"><i class="pi pi-users text-rose-500 text-xl"></i></div>
        </div>
        
        <div class="bg-white border rounded-xl p-4 shadow-sm flex items-center justify-between hover:shadow-md transition">
          <div>
            <div class="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Est. Pipeline Value</div>
            <div class="text-2xl font-black text-slate-800 mt-1">{{ fmtRpScale(totalPipeline) }}</div>
          </div>
          <div class="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center"><i class="pi pi-money-bill text-emerald-500 text-xl"></i></div>
        </div>

        <div class="bg-white border rounded-xl p-4 shadow-sm flex items-center justify-between hover:shadow-md transition">
          <div>
            <div class="text-[10px] font-black text-amber-500 uppercase tracking-widest">Pending Activities</div>
            <div class="text-3xl font-black text-slate-800 mt-0.5">{{ pendingActivities }}</div>
          </div>
          <div class="w-12 h-12 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center"><i class="pi pi-calendar-clock text-amber-500 text-xl"></i></div>
        </div>

        <div class="bg-white border rounded-xl p-4 shadow-sm flex items-center justify-between hover:shadow-md transition">
          <div>
            <div class="text-[10px] font-black text-blue-500 uppercase tracking-widest">Open Tickets</div>
            <div class="text-3xl font-black text-slate-800 mt-0.5">{{ openTickets }}</div>
          </div>
          <div class="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center"><i class="pi pi-ticket text-blue-500 text-xl"></i></div>
        </div>
      </div>

      <!-- Filters & Global Action -->
      <div class="bg-slate-100 p-2 rounded-lg flex flex-wrap gap-2 items-center justify-end">
        <select v-model="filters.due" class="h-8 rounded-md border-none px-3 text-xs font-bold text-slate-700 bg-white shadow-sm outline-none" :disabled="loading">
          <option value="all">Semua Tenggat Waktu (All Due)</option>
          <option value="today">Hari Ini (Today)</option>
          <option value="overdue">Terlambat (Overdue)</option>
        </select>
      </div>

      <!-- KANBAN / GRID CONTENT -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <!-- 1. PENDING ACTIVITIES -->
        <div class="bg-white border rounded-xl shadow-sm flex flex-col h-[500px]">
          <div class="p-4 border-b flex justify-between items-center bg-slate-50/50 rounded-t-xl">
            <div class="font-black text-slate-800 flex items-center gap-2 text-sm"><i class="pi pi-calendar p-1.5 bg-amber-100 text-amber-700 rounded-lg"></i> Schedule & Activities</div>
            <span class="bg-slate-200 text-slate-700 text-[10px] font-black px-2 py-0.5 rounded-full">{{ data?.activities.length ?? 0 }}</span>
          </div>
          <div class="p-2 overflow-y-auto flex-1 bg-slate-50">
            <div v-for="a in filteredActivities" :key="a.id" class="p-3 bg-white border border-slate-200 rounded-lg shadow-sm mb-2 hover:border-amber-400 transition cursor-pointer">
              <div class="flex justify-between items-start mb-1">
                <span class="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded" :class="activityBadge(a.type)">{{ a.type }}</span>
                <span v-if="a.isOverdue && a.status !== 'DONE'" class="text-[9px] font-black bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded animate-pulse">OVERDUE</span>
                <span v-else-if="a.status === 'DONE'" class="text-[9px] font-black bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded"><i class="pi pi-check text-[8px] mr-1"></i>DONE</span>
              </div>
              <div class="font-bold text-slate-800 text-sm leading-tight mb-2">{{ a.subject }}</div>
              <div class="flex justify-between items-end border-t border-dashed pt-2 mt-2">
                <div class="text-[10px] font-bold text-slate-500">
                  <template v-if="a.opportunity"><i class="pi pi-money-bill mr-0.5 text-slate-400"></i> {{ a.opportunity.code }}</template>
                  <template v-else-if="a.lead"><i class="pi pi-user mr-0.5 text-slate-400"></i> {{ a.lead.code }}</template>
                  <template v-else-if="a.customer"><i class="pi pi-building mr-0.5 text-slate-400"></i> {{ a.customer.code }}</template>
                </div>
                <div class="text-[10px] font-mono font-black" :class="a.isOverdue && a.status !== 'DONE' ? 'text-rose-600' : 'text-slate-500'">
                  <i class="pi pi-clock text-[9px]"></i> {{ a.dueAt ? formatDateString(a.dueAt) : 'No Date' }}
                </div>
              </div>
            </div>
            <div v-if="filteredActivities.length === 0" class="flex flex-col items-center justify-center h-full text-slate-400 italic text-sm">
               <i class="pi pi-check-square text-3xl mb-2 text-slate-200"></i> Tidak ada aktivitas jadwal.
            </div>
          </div>
        </div>

        <!-- 2. MY DEALS (OPPORTUNITIES) -->
        <div class="bg-white border rounded-xl shadow-sm flex flex-col h-[500px]">
          <div class="p-4 border-b flex justify-between items-center bg-slate-50/50 rounded-t-xl">
            <div class="font-black text-slate-800 flex items-center gap-2 text-sm"><i class="pi pi-money-bill p-1.5 bg-emerald-100 text-emerald-700 rounded-lg"></i> My Pipeline & Deals</div>
            <span class="bg-slate-200 text-slate-700 text-[10px] font-black px-2 py-0.5 rounded-full">{{ data?.opportunities.length ?? 0 }}</span>
          </div>
          <div class="p-2 overflow-y-auto flex-1 bg-slate-50">
            <div v-for="o in data?.opportunities ?? []" :key="o.id" class="p-3 bg-white border-l-4 border-y border-r border-slate-200 rounded-lg shadow-sm mb-2 hover:shadow-md transition cursor-pointer flex flex-col"
              :style="{ borderLeftColor: stageColor(o.stage) }">
              <div class="flex justify-between items-start mb-1">
                <a class="text-[11px] font-black font-mono text-indigo-700 hover:underline" :href="`/crm/opportunities/${o.id}`">{{ o.code }}</a>
                <span class="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded" :style="{ backgroundColor: stageColor(o.stage) + '22', color: stageColor(o.stage) }">{{ o.stage }}</span>
              </div>
              <div class="font-bold text-slate-800 text-sm truncate">{{ o.name }}</div>
              <div class="flex justify-between items-end mt-3">
                <div class="text-[10px] font-bold text-slate-500 truncate w-32">
                  <template v-if="o.customer">{{ o.customer.name || o.customer.code }}</template>
                  <template v-else-if="o.lead">{{ o.lead.name || o.lead.code }}</template>
                </div>
                <div class="font-black font-mono text-emerald-700">{{ fmtRpScale(o.expectedValue ?? 0) }}</div>
              </div>
            </div>
            <div v-if="(data?.opportunities?.length ?? 0) === 0" class="flex flex-col items-center justify-center h-full text-slate-400 italic text-sm">
               Keluarga Deals Kosong.
            </div>
          </div>
        </div>

        <!-- 3. MY LEADS -->
        <div class="bg-white border rounded-xl shadow-sm flex flex-col h-[400px]">
          <div class="p-4 border-b flex justify-between items-center bg-slate-50/50 rounded-t-xl">
            <div class="font-black text-slate-800 flex items-center gap-2 text-sm"><i class="pi pi-users p-1.5 bg-rose-100 text-rose-700 rounded-lg"></i> Active Leads</div>
            <span class="bg-slate-200 text-slate-700 text-[10px] font-black px-2 py-0.5 rounded-full">{{ data?.leads.length ?? 0 }}</span>
          </div>
          <div class="overflow-hidden flex-1 p-0">
            <table class="w-full text-sm">
              <thead class="bg-white border-b text-left text-[10px] text-slate-400 uppercase tracking-widest sticky top-0">
                <tr><th class="px-4 py-2 font-black">Lead Name</th><th class="px-4 py-2 font-black w-24">Status</th></tr>
              </thead>
              <tbody class="divide-y overflow-y-auto block h-[calc(100%-32px)]" style="display: table-caption; width: 100%;">
                <tr v-for="l in data?.leads ?? []" :key="l.id" class="hover:bg-slate-50 transition w-full table" style="table-layout: fixed;">
                  <td class="px-4 py-3 align-middle w-[calc(100%-6rem)]">
                    <div class="font-bold text-slate-800 truncate" :title="l.name">{{ l.name }}</div>
                    <a class="text-[9px] font-mono text-indigo-500 font-bold hover:underline" :href="`/crm/leads/${l.id}`">{{ l.code }}</a>
                  </td>
                  <td class="px-4 py-3 align-middle text-right w-24">
                    <span class="text-[9px] font-black px-1.5 py-0.5 rounded border uppercase" :class="leadBadge(l.status)">{{ l.status }}</span>
                  </td>
                </tr>
                <tr v-if="(data?.leads?.length ?? 0) === 0" class="table w-full"><td colspan="2" class="py-12 text-center text-slate-400 italic">No Active Leads</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 4. SUPPORT TICKETS -->
        <div class="bg-white border rounded-xl shadow-sm flex flex-col h-[400px]">
          <div class="p-4 border-b flex justify-between items-center bg-slate-50/50 rounded-t-xl">
            <div class="font-black text-slate-800 flex items-center gap-2 text-sm"><i class="pi pi-ticket p-1.5 bg-blue-100 text-blue-700 rounded-lg"></i> Support Tickets</div>
            <span class="bg-slate-200 text-slate-700 text-[10px] font-black px-2 py-0.5 rounded-full">{{ data?.tickets.length ?? 0 }}</span>
          </div>
          <div class="p-3 overflow-y-auto flex-1 bg-slate-50 space-y-2">
            <div v-for="t in data?.tickets ?? []" :key="t.id" class="p-3 bg-white border border-slate-200 rounded-lg shadow-sm flex gap-3 hover:border-blue-400 transition cursor-pointer">
              <div class="flex flex-col items-center justify-center px-2 py-1 rounded bg-slate-50 border shrink-0">
                <i class="pi pi-fw text-xl" :class="t.status === 'RESOLVED' || t.status === 'CLOSED' ? 'pi-check-circle text-emerald-500' : 'pi-exclamation-circle text-blue-500'"></i>
                <div class="text-[8px] font-black uppercase mt-1 text-slate-500">{{ t.status }}</div>
              </div>
              <div class="min-w-0 flex-1">
                <div class="text-[10px] font-mono font-black text-blue-800 mb-0.5">{{ t.code }}</div>
                <div class="font-bold text-sm text-slate-800 truncate mb-1" :title="t.subject">{{ t.subject }}</div>
                <div class="flex justify-between items-center">
                  <div class="text-[9px] font-bold text-slate-500 uppercase flex items-center gap-1"><i class="pi pi-building text-[8px]"></i> {{ t.customer?.code ?? 'N/A' }}</div>
                  <div class="text-[10px] font-black px-1.5 rounded text-white" :class="priorityColor(t.priority)">{{ t.priority }}</div>
                </div>
              </div>
            </div>
            <div v-if="(data?.tickets?.length ?? 0) === 0" class="flex flex-col items-center justify-center h-full text-slate-400 italic text-sm">
               Semua tiket sudah selesai! Yay!
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

const fmtRpScale = (n: number|string) => {
  const v = Number(n);
  if (v >= 1_000_000_000) return `Rp ${(v/1_000_000_000).toFixed(1)} M`;
  if (v >= 1_000_000) return `Rp ${(v/1_000_000).toFixed(1)} Jt`;
  return `Rp ${v.toLocaleString('id-ID')}`;
};

const formatDateString = (iso: string) => {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};

const activityBadge = (type: string) => {
  if (type === 'CALL') return 'bg-sky-100 text-sky-700';
  if (type === 'MEETING') return 'bg-purple-100 text-purple-700';
  if (type === 'EMAIL') return 'bg-amber-100 text-amber-700';
  return 'bg-slate-100 text-slate-700';
};

const priorityColor = (p: string) => {
  if (p === 'URGENT') return 'bg-rose-600';
  if (p === 'HIGH') return 'bg-orange-500';
  if (p === 'MEDIUM') return 'bg-blue-500';
  return 'bg-slate-400'; // LOW
};

const stageColor = (stage: string) => {
  const map: any = {
    'QUALIFICATION': '#8b5cf6',
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
  if (status === 'LOSt') return 'bg-rose-50 text-rose-600 border-rose-200';
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

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
</style>
