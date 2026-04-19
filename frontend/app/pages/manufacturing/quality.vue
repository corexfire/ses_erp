<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/20 p-6 space-y-4">
    
    <!-- Header (Premium Quality Assurance Hub) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-emerald-100/50"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-6 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-emerald-100 italic">Core Quality Protocol</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-emerald-600 font-mono tracking-tighter italic">Inspection Command Hub</span>
          </div>
          <h1 class="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Quality <span class="text-emerald-600 not-italic text-xl md:text-2xl lg:text-3xl font-light">Assurance</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl text-emerald-900/60 leading-relaxed mt-3">Sistem pengawasan kualitas manufaktur terintegrasi. Lakukan inspeksi real-time, validasi standar produksi, dan analisis yield untuk menjamin integritas produk akhir.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button
            v-if="canCreate"
            icon="pi pi-plus"
            label="NEW INSPECTION"
            class="h-14 px-8 bg-slate-900 border-none text-white font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-slate-200 hover:scale-105 active:scale-95 transition-all rounded-xl"
            @click="openCreate"
          />
        </div>
      </div>
    </div>

    <!-- Quality Telemetry Dashboard -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up mt-4">
      <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
         <div class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4 opacity-80 group-hover:text-emerald-400 transition-colors">Total Inspected</div>
         <div class="flex items-end justify-between">
           <h3 class="text-3xl md:text-4xl lg:text-5xl font-black text-slate-800 tracking-tighter leading-none">{{ totalInspected }}</h3>
           <div class="p-3 bg-slate-50 text-slate-400 rounded-xl border border-slate-100 group-hover:rotate-12 transition-transform">
             <i class="pi pi-search text-lg"></i>
           </div>
         </div>
      </div>

      <div class="p-6 rounded-2xl bg-emerald-950 text-white shadow-xl flex flex-col justify-between border border-emerald-900 transition-all hover:bg-black group">
         <div class="text-[10px] font-black uppercase text-emerald-400 tracking-[0.2em] mb-4">Items Passed</div>
         <div class="flex items-end justify-between">
           <h3 class="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter leading-none">{{ totalPassed }}</h3>
           <div class="p-3 bg-white/5 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
             <i class="pi pi-check-circle text-lg text-emerald-400"></i>
           </div>
         </div>
      </div>

      <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
         <div class="text-[10px] font-black uppercase text-rose-600 tracking-[0.2em] mb-4">Rejected Items</div>
         <div class="flex items-end justify-between">
           <h3 class="text-3xl md:text-4xl lg:text-5xl font-black text-rose-700 tracking-tighter leading-none">{{ totalFailed }}</h3>
           <div class="p-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-100 group-hover:rotate-12 transition-transform"><i class="pi pi-times-circle text-lg"></i></div>
         </div>
      </div>

       <div class="p-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
         <div class="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
         <div class="text-[10px] font-black uppercase text-emerald-100 tracking-[0.2em] mb-4 opacity-80">Yield Accuracy</div>
         <div class="flex items-end justify-between">
           <h3 class="text-xl md:text-2xl lg:text-3xl font-black text-white tracking-tight leading-none uppercase italic">{{ yieldRate }}% <span class="text-emerald-200 text-sm leading-none block">System Confidence</span></h3>
           <div class="p-3 bg-white/10 text-white rounded-xl border border-white/10 group-hover:rotate-12 transition-transform"><i class="pi pi-chart-pie text-lg"></i></div>
         </div>
      </div>
    </div>

    <!-- Inspection Ledger (3-Panel Style Table) -->
    <div class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden pb-20 mt-6 animate-fade-in-up">
       <div class="p-10 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <div class="flex items-center gap-6">
             <div class="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-xl shadow-emerald-100 rotate-3 group-hover:rotate-0 transition-transform">
                <i class="pi pi-shield text-2xl"></i>
             </div>
             <div>
                <div class="text-[11px] font-black uppercase text-emerald-600 tracking-[0.2em] leading-none mb-2">Quality Synchronization Ledger</div>
                <h2 class="text-2xl font-black text-slate-800 tracking-tight leading-none uppercase italic">Daftar <span class="text-emerald-600 not-italic">Inspeksi</span></h2>
             </div>
          </div>
          <div class="flex items-center gap-4">
             <div class="flex items-center bg-slate-50 rounded-2xl border border-slate-100 shadow-inner p-1">
                <select v-model="status" @change="load" class="bg-transparent border-none text-[10px] font-black uppercase tracking-widest text-slate-600 px-6 h-12 outline-none focus:ring-0 appearance-none cursor-pointer">
                   <option value="">Status: Semua</option>
                   <option value="PENDING">PENDING</option>
                   <option value="PASSED">PASSED</option>
                   <option value="FAILED">FAILED</option>
                </select>
             </div>
             <Button icon="pi pi-refresh" severity="secondary" rounded text @click="load" class="h-14 w-14 text-slate-400 hover:text-emerald-600 transition-all shadow-sm bg-white" />
          </div>
       </div>

       <table class="w-full text-sm">
         <thead class="bg-white text-left font-bold border-b border-slate-100 text-slate-900 uppercase">
           <tr>
             <th class="px-10 py-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Referansi WO (Identity)</th>
             <th class="px-8 py-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Produk (Finished Good)</th>
             <th class="px-8 py-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center bg-slate-50/30">Metrik Inspeksi</th>
             <th class="px-8 py-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center">Status QA</th>
             <th class="px-10 py-8 text-[9px] font-black text-emerald-600 uppercase tracking-[0.2em] border-l border-slate-50 text-right bg-emerald-50/30">Protokol Hub</th>
           </tr>
         </thead>
         <tbody class="divide-y divide-slate-100">
           <tr v-if="loading">
             <td colspan="5" class="py-40 text-center">
                <i class="pi pi-spinner pi-spin text-5xl text-emerald-500 opacity-20"></i>
                <div class="mt-4 text-[11px] font-black uppercase tracking-widest text-emerald-600 italic">Menganalisis Protokol Kualitas...</div>
             </td>
           </tr>
           <tr v-if="!loading && inspections.length === 0">
              <td colspan="5" class="py-40 text-center">
                 <div class="text-7xl mb-6 opacity-10 filter grayscale rotate-12">🛡️</div>
                 <div class="text-[12px] uppercase font-black text-slate-300 tracking-[0.3em] mb-2">Data Inspeksi Kosong</div>
                 <div class="text-[10px] text-emerald-500/40 font-black uppercase tracking-widest italic">Quality Control Database Reflected Null</div>
              </td>
           </tr>
           <tr v-for="i in inspections" :key="i.id" class="transition-all hover:bg-slate-50/50 cursor-pointer group border-l-4" :style="{ borderLeftColor: statusColor(i.status) }">
             <td class="px-10 py-10 align-middle">
                <div class="flex items-center gap-5">
                   <div class="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform relative overflow-hidden">
                      <i class="pi pi-box text-xl relative z-10 group-hover:text-emerald-600"></i>
                      <div class="absolute inset-0 bg-emerald-50 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"></div>
                   </div>
                   <div>
                      <div class="font-black text-slate-800 text-[13px] uppercase tracking-tight leading-none mb-2">{{ i.workOrder?.code || 'WO-NULL' }}</div>
                      <div class="text-[9px] font-black font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded shadow-sm italic uppercase">Batch Identity Ref: {{ i.id.slice(0,8) }}</div>
                   </div>
                </div>
             </td>
             
             <td class="px-8 py-10 align-middle border-l border-slate-50">
                <div class="text-[11px] font-black text-slate-700 uppercase leading-none mb-1.5">{{ i.workOrder?.finishedGood?.name || 'Unnamed Product' }}</div>
                <div class="text-[9px] font-black text-emerald-600 tracking-widest uppercase italic opacity-60">{{ i.workOrder?.finishedGood?.code || 'SKU-NONE' }}</div>
             </td>

             <td class="px-8 py-10 align-middle text-center border-l border-slate-50 bg-slate-50/30 group-hover:bg-slate-100/50 transition-colors relative overflow-hidden">
                <div class="flex items-center justify-center gap-4">
                   <div class="text-center">
                      <div class="text-xl font-black font-mono tracking-tighter leading-none mb-1 text-slate-800">{{ i.qtyInspected }}</div>
                      <div class="text-[7px] font-black uppercase tracking-widest text-slate-400">Total</div>
                   </div>
                   <div class="w-px h-6 bg-slate-200"></div>
                   <div class="text-center">
                      <div class="text-xl font-black font-mono tracking-tighter leading-none mb-1 text-emerald-600">{{ i.qtyPassed }}</div>
                      <div class="text-[7px] font-black uppercase tracking-widest text-slate-400">Lulus</div>
                   </div>
                   <div class="w-px h-6 bg-slate-200"></div>
                   <div class="text-center">
                      <div class="text-xl font-black font-mono tracking-tighter leading-none mb-1 text-rose-500">{{ i.qtyFailed }}</div>
                      <div class="text-[7px] font-black uppercase tracking-widest text-slate-400">Gagal</div>
                   </div>
                </div>
             </td>

             <td class="px-8 py-10 align-middle text-center border-l border-slate-50">
                <span :class="statusBadge(i.status)" class="h-8 px-5 flex items-center shadow-sm">
                   {{ i.status }}
                </span>
             </td>
             
             <td class="px-10 py-10 align-middle border-l border-slate-50 bg-emerald-50/10 group-hover:bg-emerald-50 transition-all relative overflow-hidden text-right">
                <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-600/5 rounded-full blur-2xl"></div>
                <div class="flex items-center justify-end gap-2">
                   <Button icon="pi pi-pencil" v-if="canUpdate" @click.stop="openEdit(i)" outlined class="w-10 h-10 rounded-xl border-slate-200 text-slate-400 hover:text-emerald-600 hover:border-emerald-200 transition-all bg-white shadow-sm" />
                   <Button icon="pi pi-arrow-right" @click.stop="openEdit(i)" class="bg-slate-900 border-none text-white font-black text-[10px] uppercase h-10 px-6 rounded-xl shadow-xl shadow-slate-200 hover:bg-emerald-600 transition-all" />
                </div>
             </td>
           </tr>
         </tbody>
       </table>
    </div>

    <!-- MODERN INSPECTION HUB (DIALOG PROPORTIONS) -->
    <transition name="modal">
      <div v-if="dialogOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-xl" @click="closeDialog"></div>
        
        <div class="relative z-10 w-full max-w-2xl bg-slate-50 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col border border-white/20 animate-scale-in border-b-[12px] border-b-emerald-900 shadow-[0_0_50px_rgba(5,150,105,0.2)]">
          <!-- Hub Header -->
          <div class="bg-white px-10 py-8 flex justify-between items-center border-b border-slate-100 shrink-0">
            <div class="flex items-center gap-6">
              <div class="w-14 h-14 rounded-[1.2rem] bg-emerald-600 flex items-center justify-center text-white shadow-2xl rotate-3 shadow-emerald-200">
                <i class="pi pi-shield text-2xl"></i>
              </div>
              <div>
                <h2 class="text-xl font-black text-slate-800 tracking-tight leading-none uppercase italic">{{ editingId ? 'Update' : 'New' }} <span class="text-emerald-600 not-italic">QA Inspection</span></h2>
                <div class="flex items-center gap-2 mt-2">
                   <span class="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] italic">Protocol Execution Hub v2.0</span>
                </div>
              </div>
            </div>
            <button @click="closeDialog" class="w-12 h-12 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-all hover:rotate-90 group">
              <i class="pi pi-times text-lg group-hover:text-rose-500"></i>
            </button>
          </div>

          <!-- Technical Hub Content -->
          <div class="p-10 space-y-8 overflow-y-auto max-h-[70vh]">
             
             <!-- WO Selection (Only if Creating) -->
             <div v-if="!editingId" class="space-y-4">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">Reference Work Order <span class="text-rose-500">*</span></label>
                <div class="relative group">
                   <i class="pi pi-briefcase absolute left-6 top-1/2 -translate-y-1/2 text-emerald-500 z-10 pointer-events-none opacity-50"></i>
                   <select v-model="form.workOrderId" class="w-full h-16 bg-white border-none rounded-2xl pl-16 pr-6 text-[11px] font-black uppercase tracking-widest text-slate-800 outline-none focus:ring-4 focus:ring-emerald-100 transition-all appearance-none cursor-pointer shadow-sm">
                      <option value="">-- PILIH WO --</option>
                      <option v-for="wo in workOrders" :key="wo.id" :value="wo.id">{{ wo.code }} · {{ wo.finishedGood?.name }}</option>
                   </select>
                   <i class="pi pi-chevron-down absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-emerald-500 transition-colors"></i>
                </div>
             </div>

             <!-- Metrics Grid -->
             <div class="grid grid-cols-2 lg:grid-cols-3 gap-6" v-if="!editingId">
                <div class="space-y-3">
                   <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Qty Inspected</label>
                   <InputText v-model="form.qtyInspected" type="number" class="w-full h-16 bg-white border-none rounded-2xl px-6 text-[12px] font-black text-slate-800 outline-none focus:ring-4 focus:ring-emerald-100 shadow-sm" />
                </div>
                <div class="space-y-3">
                   <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Qty Passed</label>
                   <InputText v-model="form.qtyPassed" type="number" class="w-full h-16 bg-white border-none rounded-2xl px-6 text-[12px] font-black text-emerald-600 outline-none focus:ring-4 focus:ring-emerald-100 shadow-sm" />
                </div>
                <div class="space-y-3">
                   <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Qty Failed</label>
                   <InputText v-model="form.qtyFailed" type="number" class="w-full h-16 bg-white border-none rounded-2xl px-6 text-[12px] font-black text-rose-600 outline-none focus:ring-4 focus:ring-rose-100 shadow-sm" />
                </div>
             </div>

             <!-- Status (If Editing) -->
             <div v-if="editingId" class="space-y-4">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Inspection Status Verdict</label>
                <div class="grid grid-cols-3 gap-4">
                   <button v-for="st in ['PENDING', 'PASSED', 'FAILED']" :key="st" @click="form.status = st" :class="form.status === st ? statusActiveStyle(st) : 'bg-white border-slate-100 text-slate-400'" class="h-16 rounded-2xl border font-black text-[10px] uppercase tracking-widest transition-all shadow-sm">
                      {{ st }}
                   </button>
                </div>
             </div>

             <div class="space-y-4">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Technical Notes / Observation</label>
                <textarea v-model="form.notes" rows="4" placeholder="Observation report details..." class="w-full bg-white border-none rounded-[1.5rem] p-6 text-[11px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-emerald-100 shadow-sm resize-none"></textarea>
             </div>
          </div>

          <!-- Bottom Actions -->
          <div class="p-8 shrink-0 relative z-10 border-t border-slate-100 bg-white">
             <div class="flex gap-4">
                <button @click="closeDialog" class="flex-1 h-14 bg-slate-50 text-slate-400 border border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all">BATAL</button>
                <button @click="save" :disabled="saving" class="flex-[2] h-14 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-slate-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                   <i :class="saving ? 'pi pi-spinner pi-spin' : 'pi pi-check-circle'" class="text-lg"></i>
                   {{ saving ? 'EXECUTING...' : (editingId ? 'UPDATE VERDICT' : 'FINALIZE INSPECTION') }}
                </button>
             </div>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();
const { $toast, $swal } = useNuxtApp();

// Permissions
const canRead = computed(() => auth.hasPermission('manufacturing.quality.read'));
const canCreate = computed(() => auth.hasPermission('manufacturing.quality.create'));
const canUpdate = computed(() => auth.hasPermission('manufacturing.quality.update'));

// State
const status = ref('');
const inspections = ref<any[]>([]);
const workOrders = ref<any[]>([]);
const loading = ref(false);
const saving = ref(false);

// Telemetry Stats
const totalInspected = computed(() => inspections.value.reduce((s, i) => s + (i.qtyInspected || 0), 0));
const totalPassed = computed(() => inspections.value.reduce((s, i) => s + (i.qtyPassed || 0), 0));
const totalFailed = computed(() => inspections.value.reduce((s, i) => s + (i.qtyFailed || 0), 0));
const yieldRate = computed(() => totalInspected.value > 0 ? ((totalPassed.value / totalInspected.value) * 100).toFixed(1) : '0.0');

// Dialog
const dialogOpen = ref(false);
const editingId = ref<string | null>(null);
const form = reactive({
  workOrderId: '',
  qtyInspected: '',
  qtyPassed: '',
  qtyFailed: '',
  status: 'PENDING',
  notes: '',
});

// Helpers
const statusColor = (st: string) => {
  if (st === 'PASSED') return '#10b981';
  if (st === 'FAILED') return '#f43f5e';
  return '#f59e0b';
};

const statusBadge = (st: string) => {
  const base = 'inline-flex items-center rounded-full text-[10px] font-black uppercase tracking-widest';
  if (st === 'PASSED') return `${base} bg-emerald-50 text-emerald-700 border border-emerald-100`;
  if (st === 'FAILED') return `${base} bg-rose-50 text-rose-700 border border-rose-100`;
  return `${base} bg-amber-50 text-amber-700 border border-amber-100`;
};

const statusActiveStyle = (st: string) => {
  if (st === 'PASSED') return 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-100';
  if (st === 'FAILED') return 'bg-rose-600 border-rose-600 text-white shadow-lg shadow-rose-100';
  return 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-100';
};

// Actions
const load = async () => {
  if (!canRead.value) return;
  loading.value = true;
  try {
    const params: any = {};
    if (status.value) params.status = status.value;
    const res = await api.get('/manufacturing/quality', { params });
    inspections.value = res.data?.inspections ?? [];
  } catch (e) {
    $toast.fire({ icon: 'error', title: 'Gagal Memuat Protokol Kualitas' });
  } finally {
    loading.value = false;
  }
};

const loadWorkOrders = async () => {
  try {
    const res = await api.get('/manufacturing/work-orders');
    workOrders.value = res.data?.workOrders ?? [];
  } catch {
    workOrders.value = [];
  }
};

const openCreate = async () => {
  editingId.value = null;
  form.workOrderId = '';
  form.qtyInspected = '';
  form.qtyPassed = '';
  form.qtyFailed = '';
  form.status = 'PENDING';
  form.notes = '';
  await loadWorkOrders();
  dialogOpen.value = true;
};

const openEdit = (i: any) => {
  editingId.value = i.id;
  form.status = i.status;
  form.notes = i.notes || '';
  dialogOpen.value = true;
};

const closeDialog = () => {
  if (saving.value) return;
  dialogOpen.value = false;
};

const save = async () => {
  if (!form.workOrderId && !editingId.value) {
    return $toast.fire({ icon: 'error', title: 'Pilih Work Order Terlebih Dahulu' });
  }
  
  saving.value = true;
  try {
    if (editingId.value) {
      await api.patch(`/manufacturing/quality/${editingId.value}`, {
        status: form.status,
        notes: form.notes || undefined,
      });
      $toast.fire({ icon: 'success', title: 'Verdict Kualitas Berhasil Diperbarui' });
    } else {
      await api.post('/manufacturing/quality', {
        workOrderId: form.workOrderId,
        qtyInspected: parseFloat(form.qtyInspected) || 0,
        qtyPassed: parseFloat(form.qtyPassed) || 0,
        qtyFailed: parseFloat(form.qtyFailed) || 0,
        notes: form.notes || undefined,
      });
      $toast.fire({ icon: 'success', title: 'Data Inspeksi Berhasil Diinduksi' });
    }
    dialogOpen.value = false;
    await load();
  } catch (e: any) {
    $toast.fire({ icon: 'error', title: e?.response?.data?.message ?? 'Gagal Menyinkronkan Data QA' });
  } finally {
    saving.value = false;
  }
};

onMounted(load);
</script>

<style scoped>
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scale-in {
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

@keyframes fade-in-right {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}

.animate-fade-in-up { animation: fade-in-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.animate-scale-in { animation: scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.animate-fade-in-right { animation: fade-in-right 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

.modal-enter-active { transition: all 0.4s ease; }
.modal-leave-active { transition: all 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from :deep(.relative) { transform: scale(0.9) translateY(20px); opacity: 0; }

.fade-enter-active, .fade-leave-active { transition: all 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(20px); }

select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2310b981'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1.5rem center;
  background-size: 1rem;
}
</style>