<template>
  <div class="space-y-6 min-h-screen flex flex-col pb-8">
    <!-- Header (Premium CRM Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-indigo-100"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-6 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-indigo-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">CRM Management</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-indigo-600">Sales Pipeline</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase">Pipeline <span class="text-indigo-600 italic">Visualisasi</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-xl">Geser (Drag & Drop) kartu untuk mengubah status transaksi di setiap tahap penjualan.</p>
        </div>
        <div class="flex items-center gap-3">
          <div class="relative group">
            <i class="pi pi-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <InputText v-model="q" placeholder="Cari deal atau kode..." class="w-72 h-12 pl-11 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white transition-all text-sm font-bold shadow-inner" :disabled="!canRead" />
          </div>
          <Button icon="pi pi-refresh" :loading="loading" class="p-button-rounded h-12 w-12 bg-white border-slate-200 text-slate-600 shadow-sm hover:text-indigo-600 transition-all active:scale-95" @click="load" />
        </div>
      </div>
    </div>

    <div v-if="!canRead" class="mt-4 rounded-xl border border-dashed bg-slate-50 p-24 text-center text-slate-500 flex flex-col items-center justify-center">
      <i class="pi pi-lock text-5xl mb-4 text-slate-300"></i>
      <div class="text-lg font-black uppercase tracking-widest">Akses Terbatas</div>
      <p class="mt-2 text-sm font-medium">Anda tidak memiliki izin untuk melihat Pipeline Penjualan.</p>
    </div>

    <!-- Quick Metrics Pipeline (Premium Banners) -->
    <div v-if="canRead" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 overflow-x-auto pb-2 custom-scrollbar shrink-0">
      <!-- Total Pipeline -->
      <div class="p-5 rounded-2xl bg-indigo-900 text-white shadow-xl flex flex-col justify-between border border-indigo-800 transition-all hover:bg-indigo-950 group min-w-[200px]">
        <div class="text-[10px] font-black uppercase text-indigo-300 tracking-[0.2em] mb-3 opacity-80">Total Pipeline</div>
        <div class="flex items-end justify-between">
          <h3 class="text-xl font-black text-white tracking-tighter font-mono">{{ fmtRpRp(totalValue) }}</h3>
          <div class="p-2 bg-indigo-600 rounded-xl text-indigo-100 shadow-lg animate-pulse">
            <i class="pi pi-chart-line text-xs"></i>
          </div>
        </div>
      </div>

      <!-- Active Deals -->
      <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-lg min-w-[160px]">
        <div class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-3">Active Deals</div>
        <div class="flex items-end justify-between">
          <h3 class="text-2xl font-black text-slate-900 tracking-tighter">{{ activeDeals }} <span class="text-xs text-slate-400 uppercase font-sans">Deals</span></h3>
          <div class="p-2 bg-slate-50 text-slate-400 rounded-xl border border-slate-100"><i class="pi pi-briefcase text-xs"></i></div>
        </div>
      </div>

      <!-- Stage Metrics -->
      <div v-for="c in columns" :key="c.stage" class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-lg min-w-[180px]">
        <div class="text-[10px] font-black uppercase tracking-[0.2em] mb-3" :style="{ color: stageMeta(c.stage).color }">{{ c.title }}</div>
        <div class="flex items-end justify-between">
           <div>
              <h3 class="text-lg font-black text-slate-900 tracking-tighter font-mono">{{ fmtRpRp(c.sum) }}</h3>
              <div class="text-[10px] font-bold text-slate-400 uppercase mt-0.5">{{ c.items.length }} Deals</div>
           </div>
           <div class="p-2 rounded-xl border opacity-20" :style="{ color: stageMeta(c.stage).color, backgroundColor: stageMeta(c.stage).color + '11', borderColor: stageMeta(c.stage).color }">
              <i class="pi pi-folder-open text-xs"></i>
           </div>
        </div>
      </div>
    </div>

    <div v-if="success" class="p-3 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 text-sm font-bold flex items-center gap-2 animate-fade-in-up">
      <i class="pi pi-check-circle"></i> {{ success }}
    </div>
    <div v-if="error" class="p-3 rounded-lg border border-rose-200 bg-rose-50 text-rose-700 text-sm font-bold flex items-center gap-2 animate-fade-in-up">
      <i class="pi pi-exclamation-triangle"></i> {{ error }}
    </div>

    <!-- KANBAN BOARD (Premium Style) -->
    <div v-if="canRead" class="h-[calc(100vh-22rem)] min-h-[500px] overflow-x-auto overflow-y-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-inner flex relative">
      <div class="flex gap-6 p-6 min-w-max h-full">

        <!-- KANBAN COLUMN -->
        <div v-for="col in columns" :key="col.stage" class="w-[340px] flex flex-col h-full shrink-0 group/col"
             @dragover.prevent="e => onDragOver(e, col.stage)"
             @drop="e => onDrop(e, col.stage)"
             @dragenter.prevent="e => onDragEnter(e, col.stage)"
             @dragleave.prevent="e => onDragLeave(e)"
             :class="{ 'opacity-75': draggingStage === col.stage, 'ring-2 ring-indigo-400 bg-indigo-50/50 rounded-2xl': dropTargetStage === col.stage }">
          
          <!-- Column Header -->
          <div class="rounded-2xl bg-white p-5 shadow-sm shrink-0 border border-slate-200 mb-4 transition-all group-hover/col:shadow-md"
               :style="{ borderTop: `4px solid ${stageMeta(col.stage).color}` }">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">{{ col.title }}</h3>
              <div class="bg-slate-100 text-slate-600 text-[10px] font-black px-2.5 py-1 rounded-full">{{ col.items.length }}</div>
            </div>
            <div class="text-sm font-black font-mono tracking-tighter" :style="{ color: stageMeta(col.stage).color }">{{ fmtRpRp(col.sum) }}</div>
          </div>

          <!-- Cards Container -->
          <div class="flex-1 overflow-y-auto px-1 space-y-4 kanban-scroll relative custom-scrollbar">
            <div v-if="loading && col.items.length === 0" class="animate-pulse bg-white p-6 rounded-2xl border h-32"></div>
            
            <div v-for="o in col.items" :key="o.id" 
                 draggable="true" 
                 @dragstart="e => onDragStart(e, o)"
                 @dragend="onDragEnd"
                 class="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all cursor-grab active:cursor-grabbing group relative overflow-hidden active:scale-[0.98]"
                 :class="{ 'opacity-50 scale-95': draggingId === o.id }">
                 
              <!-- Decorator line on left -->
              <div class="absolute left-0 top-0 bottom-0 w-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300" :style="{ backgroundColor: stageMeta(col.stage).color }"></div>

              <div class="flex items-start justify-between gap-3 mb-4">
                <a class="text-[10px] font-black font-mono text-indigo-600 hover:text-indigo-800 hover:underline px-2 py-1 bg-indigo-50 rounded-lg border border-indigo-100" :href="`/crm/opportunities/${o.id}`" @click.stop v-tooltip="'Buka Detail Deal'">
                  {{ o.code }}
                </a>
                <span class="text-[9px] font-black px-2 py-0.5 rounded-lg uppercase tracking-wider" :class="isPast(o.closeDate) && col.stage !== 'CLOSED_WON' && col.stage !== 'CLOSED_LOST' ? 'bg-rose-50 text-rose-600 border border-rose-100 animate-pulse' : 'bg-slate-50 text-slate-400 border border-slate-100'">
                  <i class="pi pi-clock text-[8px] mr-1"></i> {{ fmtDateShort(o.closeDate) }}
                </span>
              </div>
              
              <div class="font-black text-slate-900 text-[15px] leading-snug line-clamp-2 mb-4 uppercase tracking-tight group-hover:text-indigo-600 transition-colors">{{ o.name }}</div>
              
              <div class="flex items-center gap-2 mb-5">
                <div class="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  <i class="pi pi-building text-xs"></i>
                </div>
                <div class="text-[11px] font-black text-slate-500 uppercase tracking-tighter truncate w-48 group-hover:text-slate-700 transition-colors">
                  {{ o.customer?.name || o.customer?.code || o.lead?.name || o.lead?.code || 'Unspecified Client' }}
                </div>
              </div>
              
              <div class="flex items-center justify-between border-t border-slate-50 pt-4 mt-auto border-dashed group-hover:border-slate-100 transition-colors">
                <div class="flex gap-1.5">
                   <div v-if="o.ownerUserId" class="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[9px] font-black text-slate-400 uppercase group-hover:bg-amber-50 group-hover:text-amber-600 group-hover:border-amber-100 transition-all" v-tooltip="'Account Manager'">ME</div>
                </div>
                <div class="text-right">
                  <div class="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5 opacity-0 group-hover:opacity-100 transition-opacity">Expected Value</div>
                  <div class="text-lg font-black font-mono tracking-tighter" :style="{ color: stageMeta(col.stage).color }">{{ fmtRpRp(o.expectedValue ?? 0) }}</div>
                </div>
              </div>
              
              <!-- Saving Overlay -->
              <div v-if="savingStageId === o.id" class="absolute inset-0 bg-white/60 backdrop-blur-md flex items-center justify-center z-20">
                <i class="pi pi-spinner pi-spin text-indigo-600 text-3xl"></i>
              </div>
            </div>

            <div v-if="!loading && col.items.length === 0" class="border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center text-slate-400 flex flex-col items-center justify-center bg-white/50">
              <i class="pi pi-inbox text-4xl mb-4 opacity-20"></i>
              <div class="text-xs font-black uppercase tracking-widest text-slate-300">Tahap Ini Kosong</div>
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

const fmtRpRp = (n: number|string|null|undefined) => {
  const v = Number(n || 0);
  if (v >= 1_000_000_000) return `Rp ${(v/1_000_000_000).toFixed(2)} M`;
  if (v >= 1_000_000) return `Rp ${(v/1_000_000).toFixed(1)} Jt`;
  if (v === 0) return 'Rp 0';
  return `Rp ${v.toLocaleString('id-ID')}`;
};

const fmtDateShort = (iso: string) => {
  if (!iso) return 'N/A';
  const d = new Date(iso);
  const map = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  return `${d.getDate()} ${map[d.getMonth()]}`;
};

const isPast = (iso: string) => iso && new Date(iso) < new Date();

const stageMeta = (stage: string) => {
  const meta: any = {
    'QUALIFICATION': { title: 'Qualification', color: '#6366f1' }, // Indigo
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
    e.dataTransfer.dropEffect = 'move';
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
  onDragEnd(); // Reset drop visual feedback immediately
  
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

.kanban-scroll {
  scrollbar-gutter: stable;
}

:deep(.p-button-rounded) {
  border-radius: 9999px !important;
}
</style>
