<template>
  <div class="p-4 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 overflow-hidden relative p-8 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500">
      <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-emerald-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Approvals</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Inbox Center</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase tracking-tighter">Approval <span class="text-emerald-600">Inbox</span></h1>
        <p class="text-slate-500 text-sm font-medium uppercase italic tracking-tight italic">Tinjau dan proses permintaan persetujuan dokumen operasional secara real-time.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="load" :loading="loading" />
        <Button label="Delegasi Aktif" icon="pi pi-user-plus" severity="help" text class="font-black text-[10px] uppercase tracking-widest" @click="openDelegation" />
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
    <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:border-emerald-300 transition-all duration-500">
       <div class="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/10">
          <div>
             <h2 class="text-[13px] font-black text-slate-900 uppercase tracking-widest">Antrean Persetujuan</h2>
             <p class="text-xs text-slate-500 font-medium italic">Klik Baris untuk meninjau detail dokumen dan memberikan keputusan.</p>
          </div>
          <div class="flex items-center gap-3">
             <span class="p-input-icon-left">
                <i class="pi pi-search text-slate-400"></i>
                <InputText v-model="q" placeholder="Cari Dokumen/Requester..." class="p-inputtext-sm rounded-xl border-slate-200 w-64 font-bold text-xs" />
             </span>
          </div>
       </div>

       <DataTable :value="filteredInbox" dataKey="id" class="p-datatable-sm w-full" :loading="loading">
          <Column header="DOKUMEN" class="pl-8" style="min-width:260px">
             <template #body="{ data }">
                <div class="flex items-center gap-3">
                   <div class="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shrink-0 shadow-lg">
                      <i :class="getIcon(data.docType)"></i>
                   </div>
                   <div class="flex flex-col">
                      <span class="text-[11px] font-black text-slate-900 uppercase tracking-tight">{{ data.docType.replace('_', ' ') }}</span>
                      <span class="text-[12px] font-black text-emerald-600 font-mono tracking-tighter">{{ data.docId }}</span>
                   </div>
                </div>
             </template>
          </Column>
          <Column header="STEP & ROLE">
             <template #body="{ data }">
                <div class="flex flex-col">
                   <span class="text-[11px] font-black text-slate-700 uppercase">{{ data.step?.name || 'Review' }}</span>
                   <span class="text-[9px] font-bold text-slate-400 uppercase italic">{{ data.step?.role?.name || 'Authority' }}</span>
                </div>
             </template>
          </Column>
          <Column header="SLA STATUS">
             <template #body="{ data }">
                <div class="flex flex-col w-32 gap-1.5">
                   <div class="flex items-center justify-between">
                      <span :class="['text-[9px] font-black uppercase', data.isOverdue ? 'text-rose-500' : 'text-slate-400']">
                         {{ data.isOverdue ? 'Expired' : 'On Track' }}
                      </span>
                      <span class="text-[9px] font-bold text-slate-400">{{ data.slaRemaining }}</span>
                   </div>
                   <div class="h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div class="h-full rounded-full transition-all duration-1000" :class="getSlaColor(data)" :style="{ width: getSlaPercent(data) + '%' }"></div>
                   </div>
                </div>
             </template>
          </Column>
          <Column header="MASUK">
             <template #body="{ data }">
                <span class="text-[10px] font-bold text-slate-400 uppercase leading-tight">{{ fmtDate(data.createdAt) }}<br/>{{ fmtTime(data.createdAt) }}</span>
             </template>
          </Column>
          <Column class="text-right pr-8">
             <template #body="{ data }">
                <Button label="Review" icon="pi pi-arrow-right" size="small" rounded class="bg-emerald-600 border-emerald-600 font-black text-[9px] uppercase px-4" @click="review(data)" />
             </template>
          </Column>
       </DataTable>
    </div>

    <!-- Review & Action Dialog -->
    <Dialog v-model:visible="reviewDialogOpen" header="Document Approval Request" :modal="true" :dismissableMask="false" class="w-[850px] border-none shadow-2xl glass-dialog overflow-hidden">
       <div class="grid grid-cols-12 gap-8 pt-4 px-2 pb-12 overflow-y-auto max-h-[75vh] custom-scrollbar">
          <!-- Left: Document Context -->
          <div class="col-span-12 md:col-span-7 space-y-6">
             <div class="p-8 rounded-xl bg-slate-900 text-white relative overflow-hidden shadow-2xl">
                <div class="absolute top-0 right-0 p-8 opacity-10">
                   <i :class="[getIcon(selectedItem?.docType), 'text-8xl']"></i>
                </div>
                <p class="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-4">Request Integrity Detail</p>
                <div class="flex items-end gap-3 mb-6">
                   <h2 class="text-3xl font-black tracking-tighter">{{ selectedItem?.docId }}</h2>
                   <span class="text-xs font-bold text-slate-400 pb-1 italic">/ {{ selectedItem?.docType }}</span>
                </div>
                <div class="grid grid-cols-2 gap-4">
                   <div class="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <p class="text-[9px] font-bold text-slate-400 uppercase mb-1">Module Source</p>
                      <p class="text-xs font-black uppercase">{{ selectedItem?.definition?.moduleKey || 'N/A' }}</p>
                   </div>
                   <div class="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <p class="text-[9px] font-bold text-slate-400 uppercase mb-1">Priority SLA</p>
                      <p class="text-xs font-black uppercase text-emerald-400">{{ selectedItem?.isOverdue ? 'URGENT' : 'STANDARD' }}</p>
                   </div>
                </div>
             </div>

             <!-- Mini Historical Feed -->
             <div class="space-y-4">
                <div class="flex items-center gap-3">
                   <i class="pi pi-history text-slate-400"></i>
                   <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Chain History</h4>
                </div>
                <div v-if="selectedItem?.history?.length" class="space-y-3 pl-4 border-l-2 border-slate-100 ml-2">
                   <div v-for="h in selectedItem.history" :key="h.id" class="flex flex-col relative group">
                      <div class="absolute -left-[1.35rem] top-1 w-2.5 h-2.5 rounded-full border-2 border-white" :class="h.action === 'APPROVE' ? 'bg-emerald-500' : 'bg-rose-500'"></div>
                      <span class="text-[10px] font-black" :class="h.action === 'APPROVE' ? 'text-emerald-600' : 'text-rose-600'">{{ h.action }}</span>
                      <span class="text-[9px] font-bold text-slate-400 italic">By {{ h.user?.name }} • {{ fmtDate(h.createdAt) }}</span>
                      <p v-if="h.comment" class="text-[10px] text-slate-500 mt-1 italic italic italic">"{{ h.comment }}"</p>
                   </div>
                </div>
                <div v-else class="text-[10px] font-bold text-slate-400 italic bg-slate-50 p-4 rounded-xl text-center border border-dashed">
                   Ini adalah langkah pertama dalam alur persetujuan.
                </div>
             </div>
          </div>

          <!-- Right: Action Panel -->
          <div class="col-span-12 md:col-span-5 flex flex-col gap-4">
             <div class="p-4 rounded-xl bg-white border border-slate-200 space-y-4">
                <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900 mb-2">Process Your Decision</h4>
                
                <div class="space-y-2">
                   <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-1">Approval Notes (Optional)</label>
                   <Textarea v-model="actionForm.comment" rows="4" class="w-full rounded-2xl text-[11px] font-medium border-slate-200" placeholder="Berikan alasan atau instruksi tambahan..." />
                </div>

                <div class="grid grid-cols-2 gap-3 pt-2">
                   <Button label="Reject" icon="pi pi-times" severity="danger" class="p-button-rounded font-black text-[10px] uppercase shadow-lg shadow-rose-100" @click="handleAction('reject')" :loading="processing" />
                   <Button label="Approve" icon="pi pi-check" severity="success" class="p-button-rounded font-black text-[10px] uppercase shadow-lg shadow-emerald-100" @click="handleAction('approve')" :loading="processing" />
                </div>
             </div>

             <div class="p-4 rounded-xl bg-indigo-50 border border-indigo-100 space-y-4">
                <div class="flex items-center justify-between">
                   <h4 class="text-[10px] font-black uppercase tracking-widest text-indigo-900">Delegate Action</h4>
                   <i class="pi pi-user-plus text-indigo-400"></i>
                </div>
                <div class="space-y-2">
                   <Select v-model="actionForm.delegateTo" :options="users" optionLabel="name" optionValue="id" placeholder="Select Colleague" class="w-full rounded-2xl text-[11px] font-bold border-indigo-200" />
                   <Button label="Transfer Authority" severity="help" size="small" text class="w-full font-black text-[10px] uppercase mt-2 outline-none border-none hover:bg-indigo-100" @click="handleAction('delegate')" :disabled="!actionForm.delegateTo" />
                </div>
             </div>
          </div>
       </div>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import { differenceInHours, formatDistanceToNow } from 'date-fns';

const api = useApi();
const toast = useToast();

const inbox = ref<any[]>([]);
const users = ref<any[]>([]);
const loading = ref(false);
const processing = ref(false);
const reviewDialogOpen = ref(false);
const selectedItem = ref<any>(null);
const q = ref('');

const actionForm = ref({
  comment: '',
  delegateTo: ''
});

const stats = computed(() => {
  const pending = inbox.value.length;
  const overdue = inbox.value.filter(i => new Date(i.slaDueAt) < new Date()).length;
  const health = pending ? Math.round(((pending - overdue) / pending) * 100) : 100;

  return [
    { label: 'Total Pending', value: pending, sub: 'Request(s)', icon: 'pi pi-inbox', color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Attention Needed', value: overdue, sub: 'Overdue SLA', icon: 'pi pi-exclamation-triangle', color: 'bg-rose-50 text-rose-600' },
    { label: 'Delegated Tasks', value: inbox.value.filter(i => i.fromUserId).length, sub: 'From Others', icon: 'pi pi-user-plus', color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Process Health', value: health + '%', sub: 'Compliance', icon: 'pi pi-chart-bar', color: 'bg-blue-50 text-blue-600' }
  ];
});

const filteredInbox = computed(() => {
  if (!q.value) return inbox.value;
  const search = q.value.toLowerCase();
  return inbox.value.filter(i => 
    i.docId.toLowerCase().includes(search) || 
    i.docType.toLowerCase().includes(search) ||
    i.step?.name?.toLowerCase().includes(search)
  );
});

async function load() {
  loading.value = true;
  try {
    const [inboxRes, usersRes] = await Promise.all([
      api.get('/workflow/inbox'),
      api.get('/core/users')
    ]);
    
    // Enhance inbox data with UI helpers
    inbox.value = (inboxRes.data || []).map((i: any) => {
      const now = new Date();
      const due = new Date(i.slaDueAt);
      const isOverdue = due < now;
      const totalSla = i.step?.slaHours || 24;
      const elapsed = (now.getTime() - new Date(i.createdAt).getTime()) / (1000 * 60 * 60);
      
      return {
        ...i,
        isOverdue,
        slaPercent: Math.min(100, Math.max(0, (elapsed / totalSla) * 100)),
        slaRemaining: isOverdue ? formatDistanceToNow(due) + ' ago' : formatDistanceToNow(due) + ' left'
      };
    });

    users.value = usersRes.data?.users || usersRes.data || [];
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Load Failed', detail: e.message });
  } finally {
    loading.value = false;
  }
}

function review(item: any) {
  selectedItem.value = item;
  actionForm.value = { comment: '', delegateTo: '' };
  reviewDialogOpen.value = true;
}

async function handleAction(type: 'approve' | 'reject' | 'delegate') {
  processing.value = true;
  try {
    const id = selectedItem.value.id;
    if (type === 'delegate') {
      await api.post(`/workflow/instances/${id}/delegate`, {
        toUserId: actionForm.value.delegateTo,
        comment: actionForm.value.comment
      });
    } else {
      await api.post(`/workflow/instances/${id}/${type}`, {
        comment: actionForm.value.comment
      });
    }

    toast.add({ severity: 'success', summary: 'Action Successful', detail: `Request ${type}d successfully.` });
    reviewDialogOpen.value = false;
    load();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Action Failed', detail: e.message });
  } finally {
    processing.value = false;
  }
}

function getIcon(docType: string) {
  const icons: any = {
    'PURCHASE_REQUISITION': 'pi pi-shopping-bag',
    'PURCHASE_ORDER': 'pi pi-shopping-cart',
    'SALES_ORDER': 'pi pi-tag',
    'LEAVE_REQUEST': 'pi pi-calendar',
    'STOCK_COUNT': 'pi pi-box',
    'QUALITY_DOC': 'pi pi-shield',
    'EXPENSE_CLAIM': 'pi pi-money-bill'
  };
  return icons[docType] || 'pi pi-file';
}

function getSlaColor(item: any) {
  if (item.isOverdue) return 'bg-rose-500';
  if (item.slaPercent > 80) return 'bg-amber-500';
  return 'bg-emerald-500';
}

function getSlaPercent(item: any) {
  return item.isOverdue ? 100 : item.slaPercent;
}

function openDelegation() {
  toast.add({ severity: 'info', summary: 'Navigation', detail: 'Modul delegasi tersedia di Settings > Profile.' });
}

function fmtDate(d: string) { return d ? new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '-' }
function fmtTime(d: string) { return d ? new Date(d).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '-' }

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
}

:deep(.p-dialog-mask) {
  backdrop-filter: blur(8px);
  background: rgba(15, 23, 42, 0.4) !important;
}

:deep(.p-dialog) {
  border-radius: 2.5rem !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

:deep(.p-dialog-header) {
  padding: 2rem 2.5rem 1rem !important;
}

:deep(.p-dialog-content) {
  padding: 0 2.5rem 2rem !important;
}

:deep(.p-textarea), :deep(.p-select), :deep(.p-inputtext) {
    @apply border-slate-200 focus:border-emerald-400 focus:ring-emerald-100 placeholder:text-slate-300;
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
    background: rgba(255, 255, 255, 0.95) !important;
}
</style>
