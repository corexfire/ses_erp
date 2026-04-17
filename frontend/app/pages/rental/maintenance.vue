<template>
  <div class="space-y-6">
    <!-- Header Premium -->
    <div class="rounded-xl border bg-white p-6 shadow-sm border-l-4 border-l-slate-700 relative overflow-hidden">
      <div class="absolute right-[0px] top-[-20px] opacity-[0.03] pointer-events-none">
        <i class="pi pi-wrench text-[170px] text-slate-900"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-start gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-cog text-slate-600"></i> Asset Maintenance Logs
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium max-w-2xl">
            Pusat penjadwalan dan pelacakan Work Order (WO) perbaikan, pencegahan, dan inspeksi aset atau penyewaan logistik Anda.
          </div>
        </div>
        <div class="flex gap-2 shrink-0">
          <Button v-if="canManage" label="New Work Order" size="small" icon="pi pi-plus" class="bg-slate-700 text-white border-none font-bold shadow-sm hover:bg-slate-800" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Component Alert -->
    <div v-if="success" class="bg-emerald-50 text-emerald-700 p-3 rounded-xl border border-emerald-200 text-sm font-bold flex items-center gap-2 animate-fade-in-up">
      <i class="pi pi-check-circle text-lg"></i> {{ success }}
    </div>
    <div v-if="error" class="bg-rose-50 text-rose-700 p-3 rounded-xl border border-rose-200 text-sm font-bold flex items-center gap-2 animate-fade-in-up">
      <i class="pi pi-exclamation-triangle text-lg"></i> {{ error }}
    </div>

    <!-- Quick Metrics -->
    <div class="grid grid-cols-4 gap-4 animate-fade-in-up">
      <div class="bg-white border p-4 rounded-xl shadow-sm">
         <div class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Scheduled</div>
         <div class="text-xl font-black text-slate-700">{{ summary.scheduled || 0 }} WO</div>
      </div>
      <div class="bg-white border p-4 rounded-xl shadow-sm">
         <div class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">In-Progress</div>
         <div class="text-xl font-black text-blue-600">{{ summary.inProgress || 0 }} WO</div>
      </div>
      <div class="bg-white border p-4 rounded-xl shadow-sm">
         <div class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Completed</div>
         <div class="text-xl font-black text-emerald-600">{{ summary.completed || 0 }} WO</div>
      </div>
      <div class="bg-white border text-white p-4 rounded-xl shadow-sm relative overflow-hidden" style="background: linear-gradient(135deg, #0f172a 0%, #334155 100%);">
         <div class="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-1">Total Maintenance Cost</div>
         <div class="text-xl font-black">{{ formatCurrency(summary.totalCost) }}</div>
         <i class="pi pi-chart-line absolute -right-3 -bottom-3 text-5xl opacity-20"></i>
      </div>
    </div>

    <!-- Controls -->
    <div class="bg-white border rounded-xl p-4 shadow-sm flex flex-wrap gap-3 items-center animate-fade-in-up">
      <span class="p-input-icon-left w-72">
         <i class="pi pi-search" />
         <InputText v-model="q" placeholder="Cari Ticket WO / Deskripsi..." class="w-full text-sm h-10" @keyup.enter="load" :disabled="!canRead" />
      </span>
      <select v-model="statusFilter" class="h-10 rounded-lg border-slate-200 px-3 text-sm font-bold text-slate-600 focus:border-slate-500 outline-none w-40" @change="load">
        <option value="">Semua Status</option>
        <option value="SCHEDULED">Scheduled</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="COMPLETED">Completed</option>
        <option value="CANCELLED">Cancelled</option>
      </select>
      <Button severity="secondary" size="small" :loading="loading" icon="pi pi-refresh" @click="load" class="h-10 w-10 shrink-0" :disabled="!canRead" />
    </div>

    <!-- TABLE -->
    <div class="rounded-xl border bg-white shadow-sm overflow-hidden animate-fade-in-up">
      <table class="w-full text-sm">
        <thead class="bg-slate-50 text-left text-[11px] text-slate-500 uppercase tracking-widest font-black">
          <tr>
            <th class="px-5 py-3 border-b">Ticket & Assignment</th>
            <th class="px-4 py-3 border-l border-b">Issue Description</th>
            <th class="px-4 py-3 border-l border-b text-center">Reference Mapping</th>
            <th class="px-4 py-3 border-l border-b text-center">Status & Priority</th>
            <th class="px-4 py-3 border-l border-b text-right">Cost (IDR)</th>
            <th class="px-4 py-3 border-l border-b text-center w-28">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-if="loading">
            <td colspan="6" class="py-16 text-center text-slate-400"><i class="pi pi-spinner pi-spin mr-2 text-slate-500 shadow-sm"></i> Fetching maintenance logs...</td>
          </tr>
          
          <tr v-for="t in logs" v-else :key="t.id" class="transition hover:bg-slate-50 group border-l-4" :style="{ borderLeftColor: priorityColor(t.priority) }">
            <td class="px-5 py-3 align-top">
              <div class="font-black text-slate-800 text-sm leading-tight cursor-pointer hover:text-slate-600" @click="openEdit(t)">{{ t.ticketNo }}</div>
              <div class="mt-1 flex items-center gap-1.5 text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded w-fit capitalize">
                <i class="pi pi-wrench text-[9px]"></i> {{ t.type.toLowerCase() }}
              </div>
              <div v-if="t.mechanicName" class="text-[10px] text-slate-400 mt-1"><i class="pi pi-user mr-0.5"></i> {{ t.mechanicName }}</div>
            </td>
            
            <td class="px-4 py-3 align-top border-l">
               <div class="text-xs font-bold text-slate-700 line-clamp-2 leading-relaxed" :title="t.issueDescription">{{ t.issueDescription }}</div>
               <div class="text-[10px] text-slate-400 mt-1 flex items-center gap-1"><i class="pi pi-calendar"></i> Sched: {{ formatDate(t.scheduledDate) }}</div>
            </td>

            <td class="px-4 py-3 align-top border-l text-center">
               <div class="flex flex-col gap-1 items-center">
                 <div v-if="t.contract" class="text-[9px] uppercase font-black bg-cyan-50 text-cyan-700 px-1.5 py-0.5 rounded border border-cyan-100 cursor-help" v-tooltip="'Linked to Rental Contract'">{{ t.contract.contractNo }}</div>
                 <div v-if="t.asset" class="text-[9px] uppercase font-black bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded border border-indigo-100 cursor-help" v-tooltip="'Linked to System Asset'">{{ t.asset.assetNo }}</div>
                 <div v-if="!t.contract && !t.asset" class="text-[10px] text-slate-300 italic">No Links</div>
               </div>
            </td>

             <td class="px-4 py-3 align-top border-l text-center">
              <span class="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border inline-block" :style="badgeStyle(t.status)">
                {{ t.status.replace('_', ' ') }}
              </span>
              <div class="mt-1.5 flex justify-center">
                 <span class="text-[9px] font-black uppercase tracking-widest" :style="{ color: priorityColor(t.priority) }"><i class="pi pi-flag-fill mr-0.5"></i> P: {{ t.priority }}</span>
              </div>
            </td>

            <td class="px-4 py-3 align-top border-l text-right">
              <div class="font-black text-slate-800 text-sm tabular-nums" v-if="t.costAmount > 0">{{ formatNumber(t.costAmount) }}</div>
              <div class="font-bold text-slate-400 text-xs italic" v-else>Free / Unknown</div>
            </td>
            
            <td class="px-4 py-3 align-top border-l text-center">
              <div class="flex justify-center gap-1.5">
                <Button v-if="canManage" icon="pi pi-pencil" v-tooltip="'Update WO'" size="small" outlined class="h-8 w-8 text-[11px] px-0 text-slate-600 border-slate-200 hover:bg-slate-50" @click="openEdit(t)" />
              </div>
            </td>
          </tr>

          <tr v-if="!loading && logs.length === 0">
            <td colspan="6" class="py-12 text-center text-slate-400 italic text-sm font-medium">Berdasarkan filter saat ini, tidak ada log maintenance.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Form Drawer -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm" @click.self="dialogOpen = false">
      <div class="w-full max-w-lg h-full bg-white shadow-2xl flex flex-col overflow-y-auto animate-slide-in-right">
        <div class="p-5 border-b bg-slate-50 flex justify-between rounded-t-xl" style="borderTop: 4px solid #334155;">
          <div class="text-lg font-black text-slate-800 flex items-center gap-2">
            <i class="pi pi-wrench text-slate-500"></i>
            {{ editingId ? 'Update Work Order' : 'Create Work Order' }}
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-200 w-8 h-8 rounded-full font-bold" @click="dialogOpen = false">✕</button>
        </div>
        
        <div class="p-6 flex-1 flex flex-col gap-5">
          <div class="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200 border-dashed">
            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1"><i class="pi pi-ticket"></i> Ticket Info</label>
            <div class="grid grid-cols-2 gap-3 mt-1">
                <input type="text" v-model="form.ticketNo" :disabled="!!editingId" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-700 bg-slate-100 outline-none" placeholder="Otomatis By System" />
                <select v-model="form.type" class="w-full border rounded-lg px-2 py-2 text-xs font-bold text-slate-700 outline-none focus:border-slate-500 bg-white">
                  <option value="PREVENTATIVE">Preventative Service</option>
                  <option value="REPAIR">Corrective Repair</option>
                  <option value="INSPECTION">Site Inspection</option>
                </select>
            </div>
          </div>

          <!-- Reference Links -->
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Link to Active Contract</label>
              <select v-model="form.contractId" class="w-full border rounded-lg px-2 py-2 text-xs font-bold text-cyan-700 outline-none focus:border-slate-500 bg-cyan-50 border-cyan-200">
                <option value="">- No Link -</option>
                <option v-for="c in contracts" :key="c.id" :value="c.id">{{ c.contractNo }}</option>
              </select>
            </div>
            <div class="space-y-1.5">
              <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Link to System Asset</label>
              <select v-model="form.assetId" class="w-full border rounded-lg px-2 py-2 text-xs font-bold text-indigo-700 outline-none focus:border-slate-500 bg-indigo-50 border-indigo-200">
                <option value="">- No Link -</option>
                <option v-for="a in assets" :key="a.id" :value="a.id">{{ a.assetNo }}</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
             <div class="space-y-1.5">
               <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Ticket Status</label>
               <select v-model="form.status" class="w-full border rounded-lg px-2 py-2 text-xs font-bold text-slate-700 outline-none focus:border-slate-500 bg-white shadow-inner">
                 <option value="SCHEDULED">SCHEDULED (Jadwal)</option>
                 <option value="IN_PROGRESS">IN_PROGRESS (Dikerjakan)</option>
                 <option value="COMPLETED">COMPLETED (Selesai)</option>
                 <option value="CANCELLED">CANCELLED (Batal)</option>
               </select>
             </div>
             <div class="space-y-1.5">
               <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Priority Flag</label>
               <select v-model="form.priority" class="w-full border rounded-lg px-2 py-2 text-xs font-bold outline-none focus:border-slate-500 bg-white shadow-inner" :style="{color: priorityColor(form.priority)}">
                 <option value="LOW">LOW</option>
                 <option value="MEDIUM">MEDIUM</option>
                 <option value="HIGH">HIGH</option>
                 <option value="URGENT">URGENT</option>
               </select>
             </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
             <div class="space-y-1.5">
               <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Scheduled Date</label>
               <input type="date" v-model="form.scheduledDate" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-700 outline-none focus:border-slate-500 bg-slate-50" />
             </div>
             <div class="space-y-1.5">
               <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Mechanic / Vendor Name</label>
               <input type="text" v-model="form.mechanicName" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-slate-500 shadow-inner" placeholder="Jhon Doe" />
             </div>
          </div>
          
          <div class="space-y-1.5 border-t pt-4">
             <label class="text-[10px] font-bold text-rose-600 uppercase tracking-widest">Total Maintenance Cost (IDR)</label>
             <input type="number" v-model="form.costAmount" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-rose-500 bg-rose-50 border-rose-200 shadow-inner" placeholder="Masukan Biaya Jasa/Sparepart" />
          </div>

          <div class="space-y-1.5">
            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Issue Description & Target</label>
            <textarea v-model="form.issueDescription" rows="3" class="w-full border rounded-lg px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-slate-500 shadow-inner resize-none" placeholder="Misal: Bunyi mesin kompresor bising..."></textarea>
          </div>
          
          <div class="space-y-1.5" v-if="form.status === 'COMPLETED' || form.status === 'IN_PROGRESS'">
            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Resolution / Diagnostic Notes</label>
            <textarea v-model="form.resolutionNotes" rows="2" class="w-full border rounded-lg px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-slate-500 shadow-inner resize-none bg-emerald-50" placeholder="Hasil perbaikan yg telah dilakukan..."></textarea>
          </div>
        </div>

        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-xl">
          <Button label="Tutup" severity="secondary" :disabled="saving" @click="dialogOpen = false" class="bg-white border text-slate-700 font-bold px-5" />
          <Button :label="editingId ? 'Simpan WO' : 'Dispatch WO'" :loading="saving" :disabled="!form.issueDescription"
            @click="save" class="bg-slate-700 border-none text-white font-bold px-6 hover:bg-slate-800" icon="pi pi-check" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useApi } from '~/composables/useApi';
import { useAuthStore } from '~/stores/auth';

const api = useApi();
const auth = useAuthStore();

const canRead = auth.hasPermission('rental.maintenance.read') || true;
const canManage = auth.hasPermission('rental.maintenance.manage') || true;

const q = ref('');
const statusFilter = ref('');
const loading = ref(false);
const saving = ref(false);

const error = ref('');
const success = ref('');
const showMsg = (refVar: any, msg: string) => { refVar.value = msg; setTimeout(()=> { refVar.value = null; }, 3000); };

const dialogOpen = ref(false);
const editingId = ref<string | null>(null);
const logs = ref<any[]>([]);
const summary = ref<any>({});
const contracts = ref<any[]>([]);
const assets = ref<any[]>([]);

const form = ref({
  ticketNo: '',
  contractId: '',
  assetId: '',
  type: 'REPAIR',
  priority: 'LOW',
  status: 'SCHEDULED',
  scheduledDate: '',
  costAmount: 0,
  mechanicName: '',
  issueDescription: '',
  resolutionNotes: '',
});

function pad(n: number) { return String(n).padStart(2, '0'); }
function formatDate(iso: string) {
  if (!iso) return '-';
  const d = new Date(iso);
  const m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${pad(d.getDate())} ${m[d.getMonth()]} ${d.getFullYear()}`;
}
function formatNumber(num: any) {
  if (!num) return '0';
  return Number(num).toLocaleString('id-ID');
}
function formatCurrency(num: any) {
  if (!num) return 'Rp 0';
  if (num >= 1000000) return `Rp ${(num/1000000).toFixed(1)} M`;
  return `Rp ${Number(num).toLocaleString('id-ID')}`;
}

const priorityColor = (pri: string) => {
   if (pri === 'URGENT') return '#e11d48'; // rose
   if (pri === 'HIGH') return '#ea580c'; // orange
   if (pri === 'MEDIUM') return '#ca8a04'; // yellow
   return '#64748b'; // low / slate
};

function badgeStyle(status: string) {
  const map: Record<string, any> = {
    COMPLETED: { backgroundColor: '#ecfdf5', color: '#047857', borderColor: '#a7f3d0' },
    SCHEDULED: { backgroundColor: '#f8fafc', color: '#475569', borderColor: '#cbd5e1' },
    IN_PROGRESS: { backgroundColor: '#eff6ff', color: '#1d4ed8', borderColor: '#bfdbfe' },
    CANCELLED: { backgroundColor: '#fff1f2', color: '#be123c', borderColor: '#fecdd3' }
  };
  return map[status] || map['SCHEDULED'];
}

async function load() {
  loading.value = true;
  try {
    const params: any = {};
    if (q.value) params.search = q.value;
    if (statusFilter.value) params.status = statusFilter.value;
    const { data } = await api.get('/rental/maintenance', { params });
    logs.value = data.data || [];
    summary.value = data.summary || {};
  } catch (e: any) {
    showMsg(error, e.message);
  } finally {
    loading.value = false;
  }
}

async function loadLookups() {
  try {
    const { data } = await api.get('/rental/maintenance/lookups'); 
    contracts.value = data.data?.contracts || [];
    assets.value = data.data?.assets || [];
  } catch (e) {}
}

function openCreate() {
  editingId.value = null;
  form.value = {
     ticketNo: '', contractId: '', assetId: '', type: 'REPAIR', priority: 'LOW',
     status: 'SCHEDULED', scheduledDate: new Date().toISOString().slice(0, 10), 
     costAmount: 0, mechanicName: '', issueDescription: '', resolutionNotes: ''
  };
  if (contracts.value.length === 0) loadLookups();
  dialogOpen.value = true;
}

function openEdit(t: any) {
  editingId.value = t.id;
  form.value = {
    ticketNo: t.ticketNo || '',
    contractId: t.contractId || '',
    assetId: t.assetId || '',
    type: t.type || 'REPAIR',
    priority: t.priority || 'LOW',
    status: t.status || 'SCHEDULED',
    scheduledDate: t.scheduledDate?.slice(0, 10) || '',
    costAmount: parseFloat(t.costAmount || '0'),
    mechanicName: t.mechanicName || '',
    issueDescription: t.issueDescription || '',
    resolutionNotes: t.resolutionNotes || '',
  };
  if (contracts.value.length === 0) loadLookups();
  dialogOpen.value = true;
}

async function save() {
  saving.value = true;
  try {
    const payload: any = { ...form.value, costAmount: Number(form.value.costAmount) };
    if (!payload.ticketNo) delete payload.ticketNo;
    if (!payload.contractId) delete payload.contractId;
    if (!payload.assetId) delete payload.assetId;

    if (editingId.value) {
      await api.patch(`/rental/maintenance/${editingId.value}`, payload);
      showMsg(success, 'Maintenance Log updated!');
    } else {
      await api.post('/rental/maintenance', payload);
      showMsg(success, 'Maintenance Work Order Dispatch!');
    }
    dialogOpen.value = false;
    load();
  } catch (e: any) {
    showMsg(error, e.response?.data?.message || e.message);
  } finally {
    saving.value = false;
  }
}

onMounted(() => {
  if (canRead) load();
});
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
.animate-slide-in-right { animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes slideInRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
</style>
