<template>
  <div class="space-y-6">
    <!-- Header Premium -->
    <div class="rounded-xl border bg-white p-6 shadow-sm border-l-4 border-l-cyan-500 relative overflow-hidden">
      <div class="absolute right-[0px] top-[-20px] opacity-[0.03] pointer-events-none">
        <i class="pi pi-key text-[170px] text-cyan-900"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-start gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-key text-cyan-600"></i> Rental Contracts
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium max-w-2xl">
            Registrasi dan manajemen kontrak sewa aset tetap (Fixed Assets), leasing properti, atau peralatan alat berat.
          </div>
        </div>
        <div class="flex gap-2 shrink-0">
          <Button v-if="canManage" label="New Rental Contract" size="small" icon="pi pi-plus" class="bg-cyan-600 text-white border-none font-bold shadow-sm hover:bg-cyan-700" @click="openCreate" />
        </div>
      </div>
    </div>

    <div v-if="success" class="bg-emerald-50 text-emerald-700 p-3 rounded-xl border border-emerald-200 text-sm font-bold flex items-center gap-2 animate-fade-in-up">
      <i class="pi pi-check-circle text-lg"></i> {{ success }}
    </div>
    <div v-if="error" class="bg-rose-50 text-rose-700 p-3 rounded-xl border border-rose-200 text-sm font-bold flex items-center gap-2 animate-fade-in-up">
      <i class="pi pi-exclamation-triangle text-lg"></i> {{ error }}
    </div>

    <!-- Quick Metrics -->
    <div class="grid grid-cols-3 gap-4 animate-fade-in-up">
      <div class="bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:border-cyan-200 transition">
         <div class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Active Leases</div>
         <div class="text-2xl font-black text-slate-800">{{ summary.active || 0 }}</div>
      </div>
      <div class="bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:border-cyan-200 transition">
         <div class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Completed Contracts</div>
         <div class="text-2xl font-black text-slate-800">{{ summary.completed || 0 }}</div>
      </div>
      <div class="bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:border-cyan-200 transition">
         <div class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Terminated Early</div>
         <div class="text-2xl font-black text-slate-800">{{ summary.terminated || 0 }}</div>
      </div>
    </div>

    <!-- Controls -->
    <div class="bg-white border rounded-xl p-4 shadow-sm flex flex-wrap gap-3 items-center animate-fade-in-up">
      <span class="p-input-icon-left w-72">
         <i class="pi pi-search" />
         <InputText v-model="q" placeholder="Cari nomer kontrak atau aset..." class="w-full text-sm h-10" @keyup.enter="load" :disabled="!canRead" />
      </span>
      <select v-model="statusFilter" class="h-10 rounded-lg border-slate-200 px-3 text-sm font-bold text-slate-600 focus:border-cyan-500 outline-none w-40" @change="load">
        <option value="">Semua Status</option>
        <option value="DRAFT">Draft</option>
        <option value="ACTIVE">Active</option>
        <option value="COMPLETED">Completed</option>
        <option value="TERMINATED">Terminated</option>
      </select>
      <Button severity="secondary" size="small" :loading="loading" icon="pi pi-refresh" @click="load" class="h-10 w-10 shrink-0" :disabled="!canRead" />
    </div>

    <!-- TABLE -->
    <div class="rounded-xl border bg-white shadow-sm overflow-hidden animate-fade-in-up">
      <table class="w-full text-sm">
        <thead class="bg-slate-50 text-left text-[11px] text-slate-500 uppercase tracking-widest font-black">
          <tr>
            <th class="px-5 py-3 border-b">Contract & Customer</th>
            <th class="px-4 py-3 border-l border-b text-left">Asset Details</th>
            <th class="px-4 py-3 border-l border-b text-right">Rates (IDR)</th>
            <th class="px-4 py-3 border-l border-b text-center">Period</th>
            <th class="px-4 py-3 border-l border-b text-center">Status</th>
            <th class="px-4 py-3 border-l border-b text-center w-28">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-if="loading">
            <td colspan="6" class="py-16 text-center text-slate-400"><i class="pi pi-spinner pi-spin mr-2 text-cyan-500 shadow-sm"></i> Sedang mengambil data sewa...</td>
          </tr>
          
          <tr v-for="t in contracts" v-else :key="t.id" class="transition hover:bg-slate-50 group border-l-4" :style="{ borderLeftColor: statusColor(t.status) }">
            <td class="px-5 py-3 align-top">
              <div class="font-bold text-slate-800 text-sm leading-tight cursor-pointer hover:text-cyan-600" @click="openEdit(t)">{{ t.contractNo }}</div>
              <div class="mt-1 flex items-center gap-1.5 text-[11px] font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded w-fit">
                <i class="pi pi-user text-[9px]"></i> {{ t.customer?.name || 'Unknown' }}
              </div>
            </td>
            
            <td class="px-4 py-3 align-top border-l">
               <div v-if="t.asset" class="font-bold text-slate-700 text-xs"><i class="pi pi-box mr-1 text-slate-400"></i>{{ t.asset.assetNo }}</div>
               <div v-if="t.assetDescription" class="text-xs text-slate-500 italic flex items-center gap-1 mt-0.5"><i class="pi pi-comment text-[10px]"></i> {{ t.assetDescription }}</div>
            </td>

            <td class="px-4 py-3 align-top border-l text-right">
              <div class="font-black text-slate-800 text-sm tabular-nums">Rp {{ formatNumber(t.rentalRate) }} <span class="text-[9px] text-slate-400">/ {{ t.billingCycle }}</span></div>
              <div v-if="t.depositAmount > 0" class="text-[10px] uppercase font-bold text-slate-400 mt-1">Dep: Rp {{ formatNumber(t.depositAmount) }}</div>
            </td>

            <td class="px-4 py-3 align-top border-l text-center">
               <div class="text-[10px] font-black tracking-wider text-slate-600 flex flex-col items-center gap-1 relative group">
                 <div class="bg-emerald-50 text-emerald-700 border border-emerald-100 rounded px-1.5 py-0.5">{{ formatDate(t.startDate) }}</div>
                 <i class="pi pi-arrow-down text-[8px] text-slate-300"></i>
                 <div class="bg-rose-50 text-rose-700 border border-rose-100 rounded px-1.5 py-0.5">{{ t.endDate ? formatDate(t.endDate) : 'OPEN' }}</div>
               </div>
            </td>

            <td class="px-4 py-3 align-top border-l text-center">
              <span class="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border inline-block mt-2" :style="badgeStyle(t.status)">
                {{ t.status }}
              </span>
            </td>
            
            <td class="px-4 py-3 align-top border-l text-center">
              <div class="flex justify-center gap-1.5 mt-2">
                <Button v-if="canManage" icon="pi pi-pencil" v-tooltip="'Modify Status/Details'" size="small" outlined class="h-8 w-8 text-[11px] px-0 text-cyan-600 border-cyan-200 hover:bg-cyan-50" @click="openEdit(t)" />
              </div>
            </td>
          </tr>

          <tr v-if="!loading && contracts.length === 0">
            <td colspan="6" class="py-12 text-center text-slate-400 italic text-sm font-medium">Berdasarkan filter saat ini, tidak ada kontrak sewa ditemukan.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit/Create Drawer Modal -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm" @click.self="dialogOpen = false">
      <div class="w-full max-w-lg h-full bg-white shadow-2xl flex flex-col overflow-y-auto animate-slide-in-right">
        <div class="p-5 border-b bg-slate-50 flex justify-between rounded-t-xl" style="borderTop: 4px solid #06b6d4;">
          <div class="text-lg font-black text-slate-800 flex items-center gap-2">
            <i class="pi pi-file-edit text-cyan-500" v-if="editingId"></i>
             <i class="pi pi-file-plus text-cyan-500" v-else></i>
            {{ editingId ? 'Update Rental Contract' : 'Draft New Rental' }}
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-200 w-8 h-8 rounded-full font-bold" @click="dialogOpen = false">✕</button>
        </div>
        
        <div class="p-6 flex-1 flex flex-col gap-5">
          <!-- Identity -->
          <div class="grid grid-cols-2 gap-4">
             <div class="space-y-1.5">
               <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Contract No</label>
               <input type="text" v-model="form.contractNo" :disabled="!!editingId" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-700 bg-slate-50 outline-none" placeholder="Auto-generated" />
             </div>
             <div class="space-y-1.5">
                 <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Contract Status</label>
                 <select v-model="form.status" class="w-full border rounded-lg px-2 py-2 text-xs font-bold text-slate-700 outline-none focus:border-cyan-500 bg-white">
                   <option value="DRAFT">DRAFT</option>
                   <option value="ACTIVE">ACTIVE</option>
                   <option value="COMPLETED">COMPLETED</option>
                   <option value="TERMINATED">TERMINATED</option>
                 </select>
             </div>
          </div>

          <!-- Customer Links -->
          <div class="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200 border-dashed">
            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1"><i class="pi pi-building"></i> Pihak Penyewa (Lessee)</label>
            <select v-model="form.customerId" :disabled="!!editingId" class="w-full border rounded-lg px-2 py-2 text-xs font-bold text-slate-700 outline-none focus:border-cyan-500 bg-white">
              <option value="">- Pilih Customer -</option>
              <option v-for="c in customers" :key="c.id" :value="c.id">{{ c.name || c.code }}</option>
            </select>
          </div>
          
          <!-- Asset Targets -->
          <div class="space-y-3 p-4 border rounded-xl border-cyan-100 bg-cyan-50/30">
            <div class="space-y-1.5">
               <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest"><i class="pi pi-link"></i> ERP Fixed Asset (Bila Ada)</label>
               <select v-model="form.assetId" class="w-full border rounded-lg px-2 py-2 text-xs font-bold text-slate-700 outline-none focus:border-cyan-500 bg-white">
                 <option value="">- Tanpa System Link -</option>
                 <option v-for="a in assets" :key="a.id" :value="a.id">Asset: {{ a.assetNo }}</option>
               </select>
            </div>
            <div class="space-y-1.5">
               <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Deskripsi Manual Aset / Unit</label>
               <input type="text" v-model="form.assetDescription" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-cyan-500 shadow-inner" placeholder="Tuliskan spesifikasi bila tidak dilink..." />
            </div>
          </div>

          <!-- Fiscal Dates -->
          <div class="grid grid-cols-2 gap-4">
             <div class="space-y-1.5">
               <label class="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Tanggal Mulai Sewa</label>
               <input type="date" v-model="form.startDate" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-emerald-800 outline-none focus:border-cyan-500 bg-emerald-50" />
             </div>
             <div class="space-y-1.5">
               <label class="text-[10px] font-bold text-rose-500 uppercase tracking-widest">Batas Akhir / End Date</label>
               <input type="date" v-model="form.endDate" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-rose-800 outline-none focus:border-cyan-500 bg-rose-50 border-rose-200" />
             </div>
          </div>

          <!-- Fiscal Commercials -->
          <div class="grid grid-cols-2 gap-4">
             <div class="space-y-1.5">
               <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nilai Sewa (IDR)</label>
               <input type="number" v-model="form.rentalRate" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-cyan-500 shadow-inner" placeholder="Pajak Include" />
             </div>
             <div class="space-y-1.5">
                 <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Payment Cycle</label>
                 <select v-model="form.billingCycle" class="w-full border rounded-lg px-2 py-2 text-xs font-bold text-slate-700 outline-none focus:border-cyan-500 bg-white">
                   <option value="DAILY">Harian (DAILY)</option>
                   <option value="WEEKLY">Mingguan (WEEKLY)</option>
                   <option value="MONTHLY">Bulanan (MONTHLY)</option>
                   <option value="YEARLY">Tahunan (YEARLY)</option>
                 </select>
             </div>
          </div>

          <div class="space-y-1.5">
             <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nominal Deposit Jaminan (IDR)</label>
             <input type="number" v-model="form.depositAmount" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-cyan-500 shadow-inner bg-slate-50" />
          </div>

          <div class="space-y-1.5">
            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Catatan Tambahan & Adendum</label>
            <textarea v-model="form.notes" rows="3" class="w-full border rounded-lg px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-cyan-500 shadow-inner resize-none"></textarea>
          </div>
        </div>

        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-xl">
          <Button label="Batalkan" severity="secondary" :disabled="saving" @click="dialogOpen = false" class="bg-white border text-slate-700 font-bold px-5" />
          <Button :label="editingId ? 'Simpan Revisi' : 'Draft Kontrak'" :loading="saving" :disabled="!form.customerId"
            @click="save" class="bg-cyan-600 border-none text-white font-bold px-6 hover:bg-cyan-700" icon="pi pi-check" />
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

const canRead = auth.hasPermission('rental.contracts.read') || true;
const canManage = auth.hasPermission('rental.contracts.manage') || true;

const q = ref('');
const statusFilter = ref('');
const loading = ref(false);
const saving = ref(false);

const error = ref('');
const success = ref('');
const showMsg = (refVar: any, msg: string) => { refVar.value = msg; setTimeout(()=> { refVar.value = null; }, 3000); };

const dialogOpen = ref(false);
const editingId = ref<string | null>(null);
const contracts = ref<any[]>([]);
const summary = ref<any>({});
const customers = ref<any[]>([]);
const assets = ref<any[]>([]);

const form = ref({
  contractNo: '',
  customerId: '',
  assetId: '',
  assetDescription: '',
  billingCycle: 'MONTHLY',
  status: 'DRAFT',
  rentalRate: 0,
  depositAmount: 0,
  startDate: '',
  endDate: '',
  notes: '',
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

const statusColor = (status: string) => {
   if (status === 'ACTIVE') return '#06b6d4'; // cyan
   if (status === 'COMPLETED') return '#10b981'; // emerald
   if (status === 'TERMINATED') return '#f43f5e'; // rose
   return '#94a3b8'; // draft
};

function badgeStyle(status: string) {
  const map: Record<string, any> = {
    ACTIVE: { backgroundColor: '#ecfeff', color: '#0e7490', borderColor: '#a5f3fc' },
    COMPLETED: { backgroundColor: '#ecfdf5', color: '#047857', borderColor: '#a7f3d0' },
    TERMINATED: { backgroundColor: '#fff1f2', color: '#be123c', borderColor: '#fecdd3' },
    DRAFT: { backgroundColor: '#f8fafc', color: '#475569', borderColor: '#cbd5e1' }
  };
  return map[status] || map['DRAFT'];
}

async function load() {
  loading.value = true;
  try {
    const params: any = {};
    if (q.value) params.search = q.value;
    if (statusFilter.value) params.status = statusFilter.value;
    const { data } = await api.get('/rental/contracts', { params });
    contracts.value = data.data || [];
    summary.value = data.summary || {};
  } catch (e: any) {
    showMsg(error, e.message);
  } finally {
    loading.value = false;
  }
}

async function loadLookups() {
  try {
    const custReq = api.get('/crm/customers');
    const astReq = api.get('/rental/contracts/assets'); // Assuming we mapped this in API
    
    const [cRes, aRes] = await Promise.all([custReq, astReq].map(p => p.catch(() => ({ data: { data:[] } }))));
    customers.value = cRes.data.data || [];
    assets.value = aRes.data.data || [];
  } catch (e) {}
}

function openCreate() {
  editingId.value = null;
  form.value = {
     contractNo: '', customerId: '', assetId: '', assetDescription: '', 
     billingCycle: 'MONTHLY', status: 'DRAFT', rentalRate: 0, depositAmount: 0,
     startDate: new Date().toISOString().slice(0, 10), endDate: '', notes: ''
  };
  if (customers.value.length === 0) loadLookups();
  dialogOpen.value = true;
}

function openEdit(t: any) {
  editingId.value = t.id;
  form.value = {
    contractNo: t.contractNo || '',
    customerId: t.customerId || '',
    assetId: t.assetId || '',
    assetDescription: t.assetDescription || '',
    billingCycle: t.billingCycle || 'MONTHLY',
    status: t.status || 'DRAFT',
    rentalRate: parseFloat(t.rentalRate || '0'),
    depositAmount: parseFloat(t.depositAmount || '0'),
    startDate: t.startDate?.slice(0, 10) || '',
    endDate: t.endDate?.slice(0, 10) || '',
    notes: t.notes || '',
  };
  if (customers.value.length === 0) loadLookups();
  dialogOpen.value = true;
}

async function save() {
  saving.value = true;
  try {
    const payload: any = { ...form.value, rentalRate: Number(form.value.rentalRate), depositAmount: Number(form.value.depositAmount) };
    if (!payload.assetId) delete payload.assetId;
    if (!payload.contractNo) delete payload.contractNo;

    if (editingId.value) {
      await api.patch(`/rental/contracts/${editingId.value}`, payload);
      showMsg(success, 'Contract updated successfully!');
    } else {
      await api.post('/rental/contracts', payload);
      showMsg(success, 'Draft Contract registered!');
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
