<template>
  <div class="p-4 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 overflow-hidden relative p-8 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500">
      <div class="absolute top-0 right-0 w-64 h-64 bg-slate-900/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Security & Governance</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global Audit Trail</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase tracking-tighter">Audit <span class="text-indigo-600">Trail</span></h1>
        <p class="text-slate-500 text-sm font-medium uppercase italic tracking-tight italic">Monitoring riwayat aktivitas pengguna dan perubahan data di seluruh sistem ERP.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="load" :loading="loading" />
        <Button label="Export Logs" icon="pi pi-download" severity="secondary" text class="font-black text-[10px] uppercase tracking-widest" @click="exportLogs" />
      </div>
    </div>

    <!-- Stats Section -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
       <div v-for="s in stats" :key="s.label" class="group p-4 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <i :class="[s.icon, 'text-6xl']"></i>
          </div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ s.label }}</p>
          <h3 class="text-2xl font-black text-slate-900 tracking-tighter">{{ s.value }}</h3>
          <div class="flex items-center gap-2 mt-2">
             <span :class="['text-[10px] font-bold px-2 py-0.5 rounded-full', s.color]">{{ s.sub }}</span>
          </div>
       </div>
    </div>

    <!-- Main List Area -->
    <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:border-slate-400 transition-all duration-500">
       <div class="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/10">
          <div>
             <h2 class="text-[13px] font-black text-slate-900 uppercase tracking-widest">Log Aktivitas Sistem</h2>
             <p class="text-xs text-slate-500 font-medium italic">Klik tombol "Details" untuk meninjau perubahan metadata atau data lama vs baru.</p>
          </div>
          <div class="flex items-center gap-3">
             <span class="p-input-icon-left">
                <i class="pi pi-search text-slate-400"></i>
                <InputText v-model="q" placeholder="Cari Aksi, Entitas, atau User..." class="p-inputtext-sm rounded-xl border-slate-200 w-64 font-bold text-xs" />
             </span>
          </div>
       </div>

       <DataTable :value="filteredLogs" dataKey="id" class="p-datatable-sm w-full" :loading="loading" :paginator="true" :rows="15">
          <Column header="TIMESTAMP" class="pl-8">
             <template #body="{ data }">
                <div class="flex flex-col">
                   <span class="text-[10px] font-black text-slate-800 uppercase leading-none">{{ fmtDate(data.createdAt) }}</span>
                   <span class="text-[9px] font-bold text-slate-400 italic">{{ fmtTime(data.createdAt) }}</span>
                </div>
             </template>
          </Column>
          <Column header="ACTION">
             <template #body="{ data }">
                <span :class="['px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border', getActionColor(data.action)]">
                   {{ data.action }}
                </span>
             </template>
          </Column>
          <Column header="ACTOR / USER">
             <template #body="{ data }">
                <div class="flex items-center gap-2">
                   <div class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500 border border-slate-200 uppercase">
                      {{ data.actorUserId?.substring(0, 2) || 'SYS' }}
                   </div>
                   <span class="text-[11px] font-bold text-slate-700 truncate max-w-[150px]">{{ data.actorUserId || 'System' }}</span>
                </div>
             </template>
          </Column>
          <Column header="ENTITY & RESOURCE">
             <template #body="{ data }">
                <div class="flex flex-col">
                   <span class="text-[11px] font-black text-slate-900 uppercase tracking-tight">{{ data.entity }}</span>
                   <span class="text-[9px] font-bold text-slate-400 font-mono tracking-tighter">{{ data.entityId || '-' }}</span>
                </div>
             </template>
          </Column>
          <Column class="text-right pr-8">
             <template #body="{ data }">
                <Button label="Details" icon="pi pi-eye" size="small" text rounded class="font-black text-[10px] uppercase text-indigo-600" @click="inspect(data)" />
             </template>
          </Column>
       </DataTable>
    </div>

    <!-- Metadata Inspector Dialog -->
    <Dialog v-model:visible="inspectorOpen" header="Audit Log Details" :modal="true" :dismissableMask="true" class="w-[600px] border-none shadow-2xl glass-dialog">
       <div class="space-y-6 pt-4 px-2 pb-8 overflow-y-auto max-h-[70vh] custom-scrollbar">
          <!-- Context Card -->
          <div class="p-4 rounded-3xl bg-slate-900 text-white relative overflow-hidden shadow-xl">
             <div class="absolute top-0 right-0 p-4 opacity-10">
                <i class="pi pi-shield text-8xl"></i>
             </div>
             <p class="text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-4">Event Context</p>
             <div class="flex items-center gap-4 mb-4">
                <span :class="['px-3 py-1 rounded-full text-[10px] font-black uppercase border border-white/20', getActionColor(selectedLog?.action, true)]">
                   {{ selectedLog?.action }}
                </span>
                <span class="text-xs font-bold text-slate-400 uppercase tracking-widest text-indigo-200">{{ selectedLog?.entity }}</span>
             </div>
             <p class="text-xs font-medium text-slate-300 italic">Performed by {{ selectedLog?.actorUserId }} on {{ fmtFull(selectedLog?.createdAt) }}</p>
          </div>

          <!-- Metadata Grid -->
          <div class="space-y-4">
             <div class="flex items-center gap-3">
                <i class="pi pi-list text-slate-400"></i>
                <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Metadata & Payload</h4>
             </div>
             
             <div v-if="selectedLog?.metadata" class="space-y-3">
                <div v-for="(val, key) in selectedLog.metadata" :key="key" class="p-4 rounded-3xl bg-slate-50 border border-slate-100 group transition-all hover:bg-white hover:border-indigo-100 hover:shadow-md">
                   <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ key }}</p>
                   <div class="text-[11px] font-bold text-slate-800 break-words">
                      <template v-if="typeof val === 'object'">
                         <pre class="bg-slate-900 text-indigo-300 p-4 rounded-2xl mt-2 text-[10px] overflow-x-auto custom-scrollbar">{{ JSON.stringify(val, null, 2) }}</pre>
                      </template>
                      <template v-else>{{ val }}</template>
                   </div>
                </div>
             </div>
             <div v-else class="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <p class="text-[11px] font-bold text-slate-400 italic">No additional metadata captured for this event.</p>
             </div>
          </div>
       </div>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';

const api = useApi();
const toast = useToast();

const logs = ref<any[]>([]);
const loading = ref(false);
const inspectorOpen = ref(false);
const selectedLog = ref<any>(null);
const q = ref('');

const stats = computed(() => {
  const total = logs.value.length;
  const critical = logs.value.filter(l => ['DELETE', 'REJECT', 'REVOKE'].includes(l.action)).length;
  const uniqueUsers = new Set(logs.value.map(l => l.actorUserId)).size;

  return [
    { label: 'Total Events', value: total, sub: 'Logged Activity', icon: 'pi pi-history', color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Active Actors', value: uniqueUsers, sub: 'Unique Users', icon: 'pi pi-users', color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Critical Ops', value: critical, sub: 'Needs Review', icon: 'pi pi-exclamation-circle', color: 'bg-rose-50 text-rose-600' },
    { label: 'System Health', value: 'Active', sub: 'Monitoring ON', icon: 'pi pi-check-circle', color: 'bg-blue-50 text-blue-600' }
  ];
});

const filteredLogs = computed(() => {
  if (!q.value) return logs.value;
  const s = q.value.toLowerCase();
  return logs.value.filter(l => 
    l.action.toLowerCase().includes(s) || 
    l.entity.toLowerCase().includes(s) || 
    l.actorUserId?.toLowerCase().includes(s) ||
    l.entityId?.toLowerCase().includes(s)
  );
});

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/audit-logs?take=200');
    logs.value = res.data.auditLogs || [];
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Load Failed', detail: e.message });
  } finally {
    loading.value = false;
  }
}

function inspect(data: any) {
  selectedLog.value = data;
  inspectorOpen.value = true;
}

function getActionColor(action: string, isDark = false) {
  const map: any = {
    'CREATE': isDark ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-600 border-emerald-100',
    'UPDATE': isDark ? 'bg-indigo-500 text-white' : 'bg-indigo-50 text-indigo-600 border-indigo-100',
    'DELETE': isDark ? 'bg-rose-500 text-white' : 'bg-rose-50 text-rose-600 border-rose-100',
    'LOGIN_SUCCESS': isDark ? 'bg-slate-500 text-white' : 'bg-slate-50 text-slate-600 border-slate-200',
    'APPROVE': isDark ? 'bg-teal-500 text-white' : 'bg-teal-50 text-teal-600 border-teal-100',
    'REJECT': isDark ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-600 border-orange-100',
  };
  return map[action] || (isDark ? 'bg-slate-400 text-white' : 'bg-slate-50 text-slate-400 border-slate-200');
}

function exportLogs() {
  toast.add({ severity: 'info', summary: 'Export', detail: 'Export feature is coming soon in Phase 2.' });
}

function fmtDate(d: string) { return d ? new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '-' }
function fmtTime(d: string) { return d ? new Date(d).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '-' }
function fmtFull(d: string) { return d ? new Date(d).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) : '-' }

onMounted(load);
</script>

<style scoped lang="postcss">
:deep(.p-datatable-thead > tr > th) {
  background: transparent !important;
  font-size: 10px !important;
  font-weight: 900 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.1em !important;
  color: #94a3b8 !important;
  border-bottom: 2px solid #f1f5f9 !important;
  padding: 1.5rem 1rem !important;
}

:deep(.p-datatable-tbody > tr > td) {
  padding: 1.25rem 1rem !important;
  border-bottom: 1px solid #f8fafc !important;
  vertical-align: middle;
}

:deep(.p-dialog-mask) {
  backdrop-filter: blur(12px);
  background: rgba(15, 23, 42, 0.5) !important;
}

:deep(.p-dialog) {
  border-radius: 3rem !important;
  overflow: hidden;
}

:deep(.p-dialog-header) {
  padding: 2.5rem 2.5rem 1rem !important;
  background: white;
}

:deep(.p-dialog-content) {
  padding: 0 2.5rem 2.5rem !important;
  background: white;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-slate-200 rounded-full;
}

.glass-dialog {
    background: rgba(255, 255, 255, 0.98) !important;
}

:deep(.p-paginator) {
  @apply border-none bg-transparent pt-6 pb-2;
}

:deep(.p-paginator-element) {
  @apply rounded-xl font-black text-[11px] transition-all;
}

:deep(.p-paginator-page.p-highlight) {
  @apply bg-indigo-600 text-white shadow-lg shadow-indigo-100;
}
</style>
