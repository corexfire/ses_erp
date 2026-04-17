<template>
  <div class="space-y-6 h-[calc(100vh-10rem)] flex flex-col">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-5 shadow-sm border-l-4 border-l-indigo-600 shrink-0">
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div class="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-filter text-indigo-600"></i> Sales Pipeline
          </div>
          <div class="mt-1 text-sm text-slate-500 font-medium">
            Visualisasi Kanban untuk mengelola transaksi Anda di setiap tahap. <b>Geser (Drag & Drop)</b> kartu untuk mengubah status.
          </div>
        </div>
        <div class="flex items-center gap-3">
          <InputText v-model="q" placeholder="Cari deal atau kode..." class="w-64 text-sm h-10" :disabled="!canRead" />
          <Button icon="pi pi-search" severity="secondary" :disabled="loading || !canRead" @click="load" class="h-10 w-10 p-0 shadow-sm" />
          <Button icon="pi pi-refresh" severity="secondary" :disabled="loading || !canRead" @click="load" class="h-10 w-10 p-0 shadow-sm" />
        </div>
      </div>

      <!-- Quick Metrics Pipeline -->
      <div class="mt-4 pt-4 border-t flex gap-8 items-center overflow-x-auto hide-scrollbar">
        <div>
          <div class="text-[10px] font-black uppercase text-slate-400 tracking-widest">Total Pipeline</div>
          <div class="text-xl font-black text-indigo-700 mt-1">{{ fmtRpScale(totalValue) }}</div>
        </div>
        <div class="w-px h-8 bg-slate-200"></div>
        <div>
           <div class="text-[10px] font-black uppercase text-slate-400 tracking-widest">Active Deals</div>
           <div class="text-lg font-bold text-slate-700 mt-1">{{ activeDeals }} Deals</div>
        </div>
        <div class="w-px h-8 bg-slate-200"></div>
        <div v-for="c in columns" :key="c.stage" class="whitespace-nowrap">
          <div class="text-[10px] font-black uppercase tracking-widest" :style="{ color: stageMeta(c.stage).color }">{{ c.title }}</div>
          <div class="text-sm font-bold text-slate-700 mt-1">{{ fmtRpScale(c.sum) }} <span class="text-xs text-slate-400">({{ c.items.length }})</span></div>
        </div>
      </div>
    </div>

    <div v-if="!canRead" class="mt-4 rounded-xl border border-dashed bg-slate-50 p-12 text-center text-slate-500 flex-1 flex flex-col items-center justify-center">
      <i class="pi pi-lock text-4xl mb-3 text-slate-400"></i>
      Anda tidak memiliki izin untuk melihat Pipeline Penjualan.
    </div>

    <div v-if="success" class="bg-emerald-50 text-emerald-700 p-3 rounded-lg border border-emerald-200 text-sm font-bold flex items-center gap-2 animate-fade-in-up">
      <i class="pi pi-check-circle"></i> {{ success }}
    </div>
    <div v-if="error" class="bg-rose-50 text-rose-700 p-3 rounded-lg border border-rose-200 text-sm font-bold flex items-center gap-2 animate-fade-in-up">
      <i class="pi pi-exclamation-triangle"></i> {{ error }}
    </div>

    <!-- KANBAN BOARD -->
    <div v-if="canRead" class="flex-1 overflow-x-auto overflow-y-hidden rounded-xl border bg-slate-100 shadow-inner flex relative">
      <div class="flex gap-4 p-4 min-w-max h-full">

        <!-- KANBAN COLUMN -->
        <div v-for="col in columns" :key="col.stage" class="w-80 flex flex-col h-full shrink-0"
             @dragover.prevent="e => onDragOver(e, col.stage)"
             @drop="e => onDrop(e, col.stage)"
             @dragenter.prevent="e => onDragEnter(e, col.stage)"
             @dragleave.prevent="e => onDragLeave(e)"
             :class="{ 'opacity-75': draggingStage === col.stage, 'ring-2 ring-indigo-400 bg-indigo-50/50 rounded-xl': dropTargetStage === col.stage }">
          
          <!-- Column Header -->
          <div class="rounded-t-xl border-t-4 bg-white p-3 shadow-sm shrink-0 border-x border-b border-b-slate-200"
               :style="{ borderTopColor: stageMeta(col.stage).color }">
            <div class="flex items-center justify-between">
              <div class="font-black text-slate-700 text-sm tracking-wide">{{ col.title }}</div>
              <div class="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full">{{ col.items.length }}</div>
            </div>
            <div class="text-xs font-black mt-1" :style="{ color: stageMeta(col.stage).color }">{{ fmtRpScale(col.sum) }}</div>
          </div>

          <!-- Cards Container -->
          <div class="flex-1 overflow-y-auto px-1 py-3 space-y-3 kanban-scroll relative">
            <div v-if="loading && col.items.length === 0" class="animate-pulse bg-white p-4 rounded-xl border h-24"></div>
            
            <div v-for="o in col.items" :key="o.id" 
                 draggable="true" 
                 @dragstart="e => onDragStart(e, o)"
                 @dragend="onDragEnd"
                 class="rounded-xl border bg-white p-4 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-grab active:cursor-grabbing group relative overflow-hidden"
                 :class="{ 'opacity-50 scale-95': draggingId === o.id }">
                 
              <!-- Decorator line on left -->
              <div class="absolute left-0 top-0 bottom-0 w-1 opacity-0 group-hover:opacity-100 transition-opacity" :style="{ backgroundColor: stageMeta(col.stage).color }"></div>

              <div class="flex items-start justify-between gap-2 mb-2">
                <a class="text-[10px] font-black font-mono text-indigo-600 hover:text-indigo-800 hover:underline px-1.5 py-0.5 bg-indigo-50 rounded" :href="`/crm/opportunities/${o.id}`" @click.stop v-tooltip="'Buka Detail Deal'">
                  {{ o.code }}
                </a>
                <span class="text-[10px] font-bold text-slate-400" v-if="o.closeDate" :class="isPast(o.closeDate) && col.stage !== 'CLOSED_WON' && col.stage !== 'CLOSED_LOST' ? 'text-rose-500 font-black' : ''">
                  <i class="pi pi-clock text-[9px]"></i> {{ fmtDateShort(o.closeDate) }}
                </span>
              </div>
              
              <div class="font-bold text-slate-800 text-sm leading-snug line-clamp-2 mb-3">{{ o.name }}</div>
              
              <div class="flex items-center gap-1.5 text-[11px] text-slate-600 mb-3 truncate font-medium">
                <i class="pi pi-building text-slate-400"></i> {{ o.customer?.name || o.customer?.code || o.lead?.name || o.lead?.code || 'No Client' }}
              </div>
              
              <div class="flex items-end justify-between border-t border-dashed pt-3 mt-auto">
                <div class="flex gap-1">
                   <div v-if="o.ownerUserId" class="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[8px] font-black text-slate-600" v-tooltip="'Owner'">ME</div>
                </div>
                <div class="text-sm font-black tracking-tight" :style="{ color: stageMeta(col.stage).color }">{{ fmtRpScale(o.expectedValue ?? 0) }}</div>
              </div>
              
              <!-- Saving Overlay -->
              <div v-if="savingStageId === o.id" class="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                <i class="pi pi-spinner pi-spin text-indigo-600 text-2xl"></i>
              </div>
            </div>

            <div v-if="!loading && col.items.length === 0" class="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center text-slate-400 flex flex-col items-center">
              <i class="pi pi-inbox text-2xl mb-2 opacity-50"></i>
              <div class="text-xs font-medium">Sini Kosong</div>
            </div>
            
            <!-- Drag Target placeholder -->
            <div v-if="dropTargetStage === col.stage && draggingStage !== col.stage" class="h-24 rounded-xl border-2 border-dashed border-indigo-400 bg-indigo-50/50 mt-3 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

type Opportunity = {
  id: string; code: string; name: string;
  stage: 'QUALIFICATION' | 'PROPOSAL' | 'NEGOTIATION' | 'CLOSED_WON' | 'CLOSED_LOST';
  expectedValue?: string | null; closeDate?: string | null; ownerUserId?: string | null;
  lead?: { id: string; code: string; name: string } | null;
  customer?: { id: string; code: string; name: string } | null;
};

const api = useApi();
const auth = useAuthStore();

const canRead = computed(() => auth.hasPermission('crm.opportunity.read'));
const canUpdate = computed(() => auth.hasPermission('crm.opportunity.update'));

const q = ref('');
const loading = ref(false);
const error = ref<string | null>(null);
const success = ref<string | null>(null);
const opportunities = ref<Opportunity[]>([]);
const savingStageId = ref<string | null>(null);

// Drag & Drop State
const draggingId = ref<string | null>(null);
const draggingStage = ref<string | null>(null);
const dropTargetStage = ref<string | null>(null);

const fmtRpScale = (n: number|string|null|undefined) => {
  const v = Number(n || 0);
  if (v >= 1_000_000_000) return `Rp ${(v/1_000_000_000).toFixed(2)} M`;
  if (v >= 1_000_000) return `Rp ${(v/1_000_000).toFixed(1)} Jt`;
  if (v === 0) return 'Rp 0';
  return `Rp ${v.toLocaleString('id-ID')}`;
};

const fmtDateShort = (iso: string) => {
  const d = new Date(iso);
  const map = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  return `${d.getDate()} ${map[d.getMonth()]}`;
};

const isPast = (iso: string) => new Date(iso) < new Date();

const stageMeta = (stage: string) => {
  const meta: any = {
    'QUALIFICATION': { title: 'Qualification', color: '#8b5cf6' }, // Purple
    'PROPOSAL': { title: 'Proposal', color: '#f59e0b' }, // Amber
    'NEGOTIATION': { title: 'Negotiation', color: '#3b82f6' }, // Blue
    'CLOSED_WON': { title: 'Closed Won', color: '#10b981' }, // Emerald
    'CLOSED_LOST': { title: 'Closed Lost', color: '#ef4444' }, // Rose
  };
  return meta[stage] || { title: stage, color: '#64748b' };
};

const columns = computed(() => {
  const stages: Opportunity['stage'][] = ['QUALIFICATION', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST'];
  return stages.map(stage => {
    const items = opportunities.value.filter(o => o.stage === stage);
    const sum = items.reduce((acc, o) => acc + Number(o.expectedValue ?? 0), 0);
    return {
      stage, title: stageMeta(stage).title, items, sum
    };
  });
});

const totalValue = computed(() => opportunities.value.reduce((acc, o) => acc + Number(o.expectedValue ?? 0), 0));
const activeDeals = computed(() => opportunities.value.filter(o => o.stage !== 'CLOSED_WON' && o.stage !== 'CLOSED_LOST').length);

const load = async () => {
  if (!canRead.value) return;
  loading.value = true;
  error.value = null; success.value = null;
  try {
    const res = await api.get('/crm/opportunities', { params: q.value ? { q: q.value } : undefined });
    opportunities.value = res.data?.opportunities ?? res.opportunities ?? [];
  } catch (e: any) {
    error.value = 'Gagal memuat pipeline. Silakan coba lagi.';
  } finally {
    loading.value = false;
  }
};

// --- DRAG AND DROP HANDLERS ---
const onDragStart = (e: DragEvent, o: Opportunity) => {
  if (!canUpdate.value) { e.preventDefault(); return; }
  draggingId.value = o.id;
  draggingStage.value = o.stage;
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', o.id);
  }
};

const onDragOver = (e: DragEvent, stg: string) => { if (draggingId.value) dropTargetStage.value = stg; };
const onDragEnter = (e: DragEvent, stg: string) => { if (draggingId.value) dropTargetStage.value = stg; };
const onDragLeave = (e: DragEvent) => { dropTargetStage.value = null; };

const onDragEnd = () => { draggingId.value = null; draggingStage.value = null; dropTargetStage.value = null; };

const onDrop = async (e: DragEvent, newStage: Opportunity['stage']) => {
  if (!draggingId.value || draggingStage.value === newStage || !canUpdate.value) {
    onDragEnd(); return;
  }
  
  const id = draggingId.value;
  onDragEnd();
  
  const obj = opportunities.value.find(o => o.id === id);
  if (!obj) return;
  
  // Optimistic UI update
  const oldStage = obj.stage;
  obj.stage = newStage;
  
  savingStageId.value = id;
  error.value = null; success.value = null;
  try {
    await api.patch(`/crm/opportunities/${id}`, { stage: newStage });
    success.value = `Deal berhasil dipindah ke ${stageMeta(newStage).title}`;
    // clear success after 3 sec
    setTimeout(() => { success.value = null; }, 3000);
  } catch (err: any) {
    obj.stage = oldStage; // rollback
    error.value = 'Gagal mengubah stage deal.';
  } finally {
    savingStageId.value = null;
  }
};

onMounted(load);
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

.kanban-scroll::-webkit-scrollbar { width: 4px; }
.kanban-scroll::-webkit-scrollbar-track { background: transparent; }
.kanban-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
.kanban-scroll::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
</style>
