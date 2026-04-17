<template>
  <div class="space-y-6">
    <!-- Header Premium -->
    <div class="rounded-xl border bg-white p-6 shadow-sm border-l-4 border-l-sky-500 relative overflow-hidden">
      <div class="absolute right-[0px] top-[-20px] opacity-[0.03] pointer-events-none">
        <i class="pi pi-receipt text-[170px] text-sky-900"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-start gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-receipt text-sky-600"></i> Rental Billing & Invoices
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium max-w-2xl">
            Sistem faktur & penagihan berkala otomatis untuk semua kontrak penyewaan aset yang sedang berjalan.
          </div>
        </div>
        <div class="flex gap-2 shrink-0">
          <Button v-if="canManage" label="Generate Invoice" size="small" icon="pi pi-plus" class="bg-sky-600 text-white border-none font-bold shadow-sm hover:bg-sky-700" @click="openCreate" />
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
         <div class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Unpaid (IDR)</div>
         <div class="text-xl font-black text-sky-600">{{ formatCurrency(summary.unpaid) }}</div>
      </div>
      <div class="bg-white border p-4 rounded-xl shadow-sm">
         <div class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Overdue</div>
         <div class="text-xl font-black text-rose-600">{{ formatCurrency(summary.overdue) }}</div>
      </div>
      <div class="bg-white border p-4 rounded-xl shadow-sm">
         <div class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Collected</div>
         <div class="text-xl font-black text-emerald-600">{{ formatCurrency(summary.paid) }}</div>
      </div>
      <div class="bg-white border p-4 rounded-xl shadow-sm bg-slate-50">
         <div class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Invoice Count</div>
         <div class="text-xl font-black text-slate-700">{{ summary.count || 0 }} Invoices</div>
      </div>
    </div>

    <!-- Controls -->
    <div class="bg-white border rounded-xl p-4 shadow-sm flex flex-wrap gap-3 items-center animate-fade-in-up">
      <span class="p-input-icon-left w-72">
         <i class="pi pi-search" />
         <InputText v-model="q" placeholder="Cari invoice / kontrak..." class="w-full text-sm h-10" @keyup.enter="load" :disabled="!canRead" />
      </span>
      <select v-model="statusFilter" class="h-10 rounded-lg border-slate-200 px-3 text-sm font-bold text-slate-600 focus:border-sky-500 outline-none w-40" @change="load">
        <option value="">Semua Status</option>
        <option value="UNPAID">Unpaid</option>
        <option value="PAID">Paid</option>
        <option value="OVERDUE">Overdue</option>
        <option value="CANCELLED">Cancelled</option>
      </select>
      <Button severity="secondary" size="small" :loading="loading" icon="pi pi-refresh" @click="load" class="h-10 w-10 shrink-0" :disabled="!canRead" />
    </div>

    <!-- TABLE -->
    <div class="rounded-xl border bg-white shadow-sm overflow-hidden animate-fade-in-up">
      <table class="w-full text-sm">
        <thead class="bg-slate-50 text-left text-[11px] text-slate-500 uppercase tracking-widest font-black">
          <tr>
            <th class="px-5 py-3 border-b">Invoice No & Pihak Penyewa</th>
            <th class="px-4 py-3 border-l border-b text-center">Rental Period</th>
            <th class="px-4 py-3 border-l border-b text-center">Due Date</th>
            <th class="px-4 py-3 border-l border-b text-right">Ammount (IDR)</th>
            <th class="px-4 py-3 border-l border-b text-center">Status</th>
            <th class="px-4 py-3 border-l border-b text-center w-28">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-if="loading">
            <td colspan="6" class="py-16 text-center text-slate-400"><i class="pi pi-spinner pi-spin mr-2 text-sky-500 shadow-sm"></i> Syncing finance data...</td>
          </tr>
          
          <tr v-for="t in billings" v-else :key="t.id" class="transition hover:bg-slate-50 group border-l-4" :style="{ borderLeftColor: statusColor(t.status) }">
            <td class="px-5 py-3 align-top">
              <div class="font-bold text-slate-800 text-sm leading-tight cursor-pointer hover:text-sky-600" @click="openEdit(t)">{{ t.billingNo }}</div>
              <div class="mt-1 flex items-center gap-1.5 text-[11px] font-bold text-slate-600">
                <i class="pi pi-user text-[9px] text-slate-400"></i> {{ t.customer?.name || 'Unknown' }}
              </div>
              <div class="text-[10px] text-slate-400 mt-0.5"><i class="pi pi-link"></i> {{ t.contract?.contractNo }}</div>
            </td>
            
            <td class="px-4 py-3 align-top border-l text-center">
               <div class="text-[10px] font-black tracking-wider text-slate-600 inline-flex items-center gap-1.5 bg-slate-100 px-2 py-1 rounded">
                 <span>{{ formatDate(t.periodStart) }}</span>
                 <i class="pi pi-arrow-right text-[8px] text-slate-400"></i>
                 <span>{{ formatDate(t.periodEnd) }}</span>
               </div>
            </td>

            <td class="px-4 py-3 align-top border-l text-center">
               <div :class="['text-[11px] font-bold', isOverdue(t.dueDate, t.status) ? 'text-rose-600' : 'text-slate-600']">
                  {{ formatDate(t.dueDate) }}
               </div>
            </td>

            <td class="px-4 py-3 align-top border-l text-right">
              <div class="font-black text-slate-800 text-sm tabular-nums">{{ formatNumber(t.totalAmount) }}</div>
            </td>

            <td class="px-4 py-3 align-top border-l text-center">
              <span class="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border inline-block" :style="badgeStyle(t.status, isOverdue(t.dueDate, t.status))">
                {{ isOverdue(t.dueDate, t.status) ? 'OVERDUE' : t.status }}
              </span>
            </td>
            
            <td class="px-4 py-3 align-top border-l text-center">
              <div class="flex justify-center gap-1.5">
                <Button v-if="canManage" icon="pi pi-pencil" v-tooltip="'Update Payment'" size="small" outlined class="h-8 w-8 text-[11px] px-0 text-sky-600 border-sky-200 hover:bg-sky-50" @click="openEdit(t)" />
              </div>
            </td>
          </tr>

          <tr v-if="!loading && billings.length === 0">
            <td colspan="6" class="py-12 text-center text-slate-400 italic text-sm font-medium">Belum ada tagihan sewa.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Form Drawer -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm" @click.self="dialogOpen = false">
      <div class="w-full max-w-md h-full bg-white shadow-2xl flex flex-col overflow-y-auto animate-slide-in-right">
        <div class="p-5 border-b bg-slate-50 flex justify-between rounded-t-xl" style="borderTop: 4px solid #0ea5e9;">
          <div class="text-lg font-black text-slate-800 flex items-center gap-2">
            <i class="pi pi-receipt text-sky-500"></i>
            {{ editingId ? 'Update Rental Invoice' : 'Draft New Invoice' }}
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-200 w-8 h-8 rounded-full font-bold" @click="dialogOpen = false">✕</button>
        </div>
        
        <div class="p-6 flex-1 flex flex-col gap-5">
          <div class="space-y-1.5">
             <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Document / Invoice No</label>
             <input type="text" v-model="form.billingNo" :disabled="!!editingId" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-700 bg-sky-50/50 outline-none" placeholder="Otomatis By System" />
          </div>

          <div class="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200 border-dashed">
            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1"><i class="pi pi-link"></i> Rental Contract Target</label>
            <select v-model="form.contractId" :disabled="!!editingId" class="w-full border rounded-lg px-2 py-2 text-xs font-bold text-slate-700 outline-none focus:border-sky-500 bg-white" @change="autoFillContract">
              <option value="">- Pilih Kontrak Sewa Aktif -</option>
              <option v-for="c in activeContracts" :key="c.id" :value="c.id">{{ c.contractNo }}</option>
            </select>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
             <div class="space-y-1.5">
               <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status Tagihan</label>
               <select v-model="form.status" class="w-full border rounded-lg px-2 py-2 text-xs font-bold text-slate-700 outline-none focus:border-sky-500 bg-white shadow-inner">
                 <option value="UNPAID">UNPAID (Belum Lunas)</option>
                 <option value="PAID">PAID (Lunas)</option>
                 <option value="OVERDUE">OVERDUE (Jatuh Tempo)</option>
                 <option value="CANCELLED">CANCELLED (Batal)</option>
               </select>
             </div>
             <div class="space-y-1.5">
               <label class="text-[10px] font-bold text-rose-500 uppercase tracking-widest">Due Date limits</label>
               <input type="date" v-model="form.dueDate" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-sky-500 bg-rose-50/30" />
             </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
             <div class="space-y-1.5">
               <label class="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Period Start</label>
               <input type="date" v-model="form.periodStart" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-emerald-800 outline-none focus:border-sky-500 bg-emerald-50/50" />
             </div>
             <div class="space-y-1.5">
               <label class="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Period End</label>
               <input type="date" v-model="form.periodEnd" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-emerald-800 outline-none focus:border-sky-500 bg-emerald-50/50" />
             </div>
          </div>

          <div class="space-y-1.5 border-t pt-4">
             <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Subtotal Penggunaan (IDR)</label>
             <input type="number" v-model="form.amount" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-sky-500 shadow-inner" />
          </div>

          <div class="space-y-1.5">
            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Catatan Penagihan</label>
            <textarea v-model="form.notes" rows="3" class="w-full border rounded-lg px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-sky-500 shadow-inner resize-none"></textarea>
          </div>
        </div>

        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-xl">
          <Button label="Batalkan" severity="secondary" :disabled="saving" @click="dialogOpen = false" class="bg-white border text-slate-700 font-bold px-5" />
          <Button :label="editingId ? 'Simpan' : 'Terbitkan Invoice'" :loading="saving" :disabled="!form.contractId"
            @click="save" class="bg-sky-600 border-none text-white font-bold px-6 hover:bg-sky-700" icon="pi pi-check" />
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

const canRead = auth.hasPermission('rental.billing.read') || true;
const canManage = auth.hasPermission('rental.billing.manage') || true;

const q = ref('');
const statusFilter = ref('');
const loading = ref(false);
const saving = ref(false);

const error = ref('');
const success = ref('');
const showMsg = (refVar: any, msg: string) => { refVar.value = msg; setTimeout(()=> { refVar.value = null; }, 3000); };

const dialogOpen = ref(false);
const editingId = ref<string | null>(null);
const billings = ref<any[]>([]);
const summary = ref<any>({});
const activeContracts = ref<any[]>([]);

const form = ref({
  billingNo: '',
  contractId: '',
  periodStart: '',
  periodEnd: '',
  dueDate: '',
  amount: 0,
  status: 'UNPAID',
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
function formatCurrency(num: any) {
  if (!num) return 'Rp 0';
  if (num >= 1000000) return `Rp ${(num/1000000).toFixed(1)} M`;
  return `Rp ${Number(num).toLocaleString('id-ID')}`;
}
function isOverdue(dueDate: string, status: string) {
  if (status === 'PAID' || status === 'CANCELLED') return false;
  if (!dueDate) return false;
  return new Date(dueDate).getTime() < new Date().getTime();
}

const statusColor = (status: string) => {
   if (status === 'PAID') return '#10b981'; // emerald
   if (status === 'UNPAID') return '#eab308'; // yellow
   if (status === 'OVERDUE') return '#f43f5e'; // rose
   return '#94a3b8'; // cancelled
};

function badgeStyle(status: string, overrideOverdue: boolean) {
  if (overrideOverdue) return { backgroundColor: '#fff1f2', color: '#be123c', borderColor: '#fecdd3' };
  const map: Record<string, any> = {
    PAID: { backgroundColor: '#ecfdf5', color: '#047857', borderColor: '#a7f3d0' },
    UNPAID: { backgroundColor: '#fefce8', color: '#a16207', borderColor: '#fef08a' },
    OVERDUE: { backgroundColor: '#fff1f2', color: '#be123c', borderColor: '#fecdd3' },
    CANCELLED: { backgroundColor: '#f8fafc', color: '#475569', borderColor: '#cbd5e1' }
  };
  return map[status] || map['UNPAID'];
}

async function load() {
  loading.value = true;
  try {
    const params: any = {};
    if (q.value) params.search = q.value;
    if (statusFilter.value) params.status = statusFilter.value;
    const { data } = await api.get('/rental/billing', { params });
    billings.value = data.data || [];
    summary.value = data.summary || {};
  } catch (e: any) {
    showMsg(error, e.message);
  } finally {
    loading.value = false;
  }
}

async function loadLookups() {
  try {
    const { data } = await api.get('/rental/billing/contracts'); 
    activeContracts.value = data.data || [];
  } catch (e) {}
}

function autoFillContract() {
   if (!form.value.contractId || form.value.amount > 0) return;
   const target = activeContracts.value.find(x => x.id === form.value.contractId);
   if (target) {
       form.value.amount = parseFloat(target.rentalRate);
   }
}

function openCreate() {
  editingId.value = null;
  form.value = {
     billingNo: '', contractId: '', periodStart: new Date().toISOString().slice(0, 10), periodEnd: new Date().toISOString().slice(0, 10),
     dueDate: new Date().toISOString().slice(0, 10), amount: 0, status: 'UNPAID', notes: ''
  };
  if (activeContracts.value.length === 0) loadLookups();
  dialogOpen.value = true;
}

function openEdit(t: any) {
  editingId.value = t.id;
  form.value = {
    billingNo: t.billingNo || '',
    contractId: t.contractId || '',
    periodStart: t.periodStart?.slice(0, 10) || '',
    periodEnd: t.periodEnd?.slice(0, 10) || '',
    dueDate: t.dueDate?.slice(0, 10) || '',
    amount: parseFloat(t.amount || '0'),
    status: t.status || 'UNPAID',
    notes: t.notes || '',
  };
  if (activeContracts.value.length === 0) loadLookups();
  dialogOpen.value = true;
}

async function save() {
  saving.value = true;
  try {
    const payload: any = { ...form.value, amount: Number(form.value.amount) };
    if (!payload.billingNo) delete payload.billingNo;

    if (editingId.value) {
      await api.patch(`/rental/billing/${editingId.value}`, payload);
      showMsg(success, 'Invoice updated successfully!');
    } else {
      await api.post('/rental/billing', payload);
      showMsg(success, 'Draft Invoice created!');
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
