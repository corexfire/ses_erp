<template>
  <div class="space-y-6">
    <!-- Component Alert -->
    <div v-if="success" class="mb-4 bg-emerald-50 text-emerald-700 p-3 rounded-xl border border-emerald-200 text-sm font-bold flex items-center gap-2 animate-fade-in-up">
      <i class="pi pi-check-circle text-lg"></i> {{ success }}
    </div>
    <div v-if="error" class="mb-4 bg-rose-50 text-rose-700 p-3 rounded-xl border border-rose-200 text-sm font-bold flex items-center gap-2 animate-fade-in-up">
      <i class="pi pi-exclamation-triangle text-lg"></i> {{ error }}
    </div>
    <!-- Header Premium -->
    <div class="rounded-xl border bg-white p-6 shadow-sm border-l-4 border-l-purple-500 relative overflow-hidden">
      <div class="absolute right-[0px] top-[-20px] opacity-[0.03] pointer-events-none">
        <i class="pi pi-sync text-[170px] text-purple-900"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-start gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-sync text-purple-500"></i> Subscription & Recurring Billing
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium max-w-2xl">
            Sistem manajemen kontrak SaaS, jasa retainer, dan penagihan berulang otomatis (Auto-invoicing).
          </div>
        </div>
        <div class="flex gap-2 shrink-0">
          <!-- <Button label="Setting Auto-Invoice" severity="secondary" size="small" icon="pi pi-cog" class="bg-white" /> -->
          <Button v-if="canManage" label="New Subscription" size="small" icon="pi pi-plus" class="bg-purple-600 text-white border-none font-bold shadow-sm hover:bg-purple-700" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Metrics Cards -->
    <div class="grid grid-cols-3 gap-4 animate-fade-in-up">
      <div class="bg-white border p-4 rounded-xl shadow-sm flex items-center gap-4">
         <div class="w-12 h-12 bg-emerald-100 text-emerald-600 flex items-center justify-center rounded-xl text-xl"><i class="pi pi-check-circle"></i></div>
         <div>
            <div class="text-[10px] uppercase font-black tracking-widest text-slate-500">Active Subscriptions</div>
            <div class="text-2xl font-black text-slate-800">{{ summary.active || 0 }}</div>
         </div>
      </div>
      <div class="bg-white border p-4 rounded-xl shadow-sm flex items-center gap-4">
         <div class="w-12 h-12 bg-rose-100 text-rose-600 flex items-center justify-center rounded-xl text-xl"><i class="pi pi-exclamation-triangle"></i></div>
         <div>
            <div class="text-[10px] uppercase font-black tracking-widest text-slate-500">Past Due / Unpaid</div>
            <div class="text-2xl font-black text-slate-800">{{ summary.pastDue || 0 }}</div>
         </div>
      </div>
      <div class="bg-white border p-4 rounded-xl shadow-sm flex items-center gap-4">
         <div class="w-12 h-12 bg-slate-100 text-slate-600 flex items-center justify-center rounded-xl text-xl"><i class="pi pi-times-circle"></i></div>
         <div>
            <div class="text-[10px] uppercase font-black tracking-widest text-slate-500">Cancelled / Churned</div>
            <div class="text-2xl font-black text-slate-800">{{ summary.cancelled || 0 }}</div>
         </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="bg-white border rounded-xl p-4 shadow-sm flex flex-wrap gap-3 items-center animate-fade-in-up">
      <span class="p-input-icon-left w-72">
         <i class="pi pi-search" />
         <InputText v-model="q" placeholder="Cari nama plan / customer..." class="w-full text-sm h-10" @keyup.enter="load" :disabled="!canRead" />
      </span>
      <select v-model="statusFilter" class="h-10 rounded-lg border-slate-200 px-3 text-sm font-bold text-slate-600 focus:border-purple-500 outline-none w-40" @change="load">
        <option value="">Semua Status</option>
        <option value="ACTIVE">Active</option>
        <option value="PAST_DUE">Past Due</option>
        <option value="CANCELLED">Cancelled</option>
      </select>
      <Button severity="secondary" size="small" :loading="loading" icon="pi pi-refresh" @click="load" class="h-10 w-10 shrink-0" :disabled="!canRead" />
    </div>

    <!-- TABLE -->
    <div class="rounded-xl border bg-white shadow-sm overflow-hidden animate-fade-in-up">
      <table class="w-full text-sm">
        <thead class="bg-slate-50 text-left text-[11px] text-slate-500 uppercase tracking-widest font-black">
          <tr>
            <th class="px-5 py-3 border-b">Plan & Customer Detail</th>
            <th class="px-4 py-3 border-l border-b text-center">Billing Cycle</th>
            <th class="px-4 py-3 border-l border-b text-right">Recurring Fee (IDR)</th>
            <th class="px-4 py-3 border-l border-b text-center">Next Billing Date</th>
            <th class="px-4 py-3 border-l border-b text-center">Status</th>
            <th class="px-4 py-3 border-l border-b text-center w-28">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-if="loading">
            <td colspan="6" class="py-16 text-center text-slate-400"><i class="pi pi-spinner pi-spin mr-2 text-purple-500 shadow-sm"></i> Loading subscription data...</td>
          </tr>
          
          <tr v-for="t in subs" v-else :key="t.id" class="transition hover:bg-slate-50 group border-l-4" :style="{ borderLeftColor: statusColor(t.status) }">
            <td class="px-5 py-3 align-top">
              <div class="font-bold text-slate-800 text-sm leading-tight group-hover:text-purple-600 transition-colors">{{ t.planName }}</div>
              <div class="mt-1 flex items-center gap-1.5 text-xs font-bold text-slate-600">
                <i class="pi pi-building text-[10px] text-slate-400"></i> {{ t.customer?.name || 'Unknown' }}
              </div>
            </td>
            
            <td class="px-4 py-3 align-top border-l text-center">
              <span class="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-100 py-1 px-2 rounded">{{ t.billingCycle }}</span>
            </td>

            <td class="px-4 py-3 align-top border-l text-right">
              <div class="font-black text-slate-800 text-base tabular-nums">Rp {{ formatNumber(t.amount) }}</div>
            </td>

            <td class="px-4 py-3 align-top border-l text-center">
               <div :class="['text-xs font-bold px-2 py-1 rounded inline-flex items-center gap-1.5', isOverdue(t.nextBillingDate) ? 'bg-rose-50 text-rose-700 border border-rose-100' : 'bg-slate-50 text-slate-700 border']">
                 <i :class="isOverdue(t.nextBillingDate) ? 'pi pi-exclamation-circle' : 'pi pi-calendar'"></i>
                 {{ t.nextBillingDate ? formatDate(t.nextBillingDate) : '-' }}
               </div>
            </td>

            <td class="px-4 py-3 align-top border-l text-center">
              <span class="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md border inline-block" :style="badgeStyle(t.status)">
                {{ t.status.replace('_', ' ') }}
              </span>
            </td>
            
            <td class="px-4 py-3 align-top border-l text-center">
              <div class="flex justify-center gap-1.5">
                <Button v-if="canManage" icon="pi pi-pencil" v-tooltip="'Edit Plan'" size="small" outlined class="h-8 w-8 text-[11px] px-0 text-purple-600 border-purple-200 hover:bg-purple-50" @click="openEdit(t)" />
              </div>
            </td>
          </tr>

          <tr v-if="!loading && subs.length === 0">
            <td colspan="6" class="py-12 text-center text-slate-400 italic text-sm font-medium">Berdasarkan filter saat ini, tidak ada subscription ditemukan.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit/Create Drawer Modal -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm" @click.self="dialogOpen = false">
      <div class="w-full max-w-md h-full bg-white shadow-2xl flex flex-col overflow-y-auto animate-slide-in-right">
        <div class="p-5 border-b bg-slate-50 flex justify-between rounded-t-xl" style="borderTop: 4px solid #9333ea;">
          <div class="text-lg font-black text-slate-800 flex items-center gap-2">
            <i class="pi pi-pencil text-purple-600" v-if="editingId"></i>
             <i class="pi pi-plus text-purple-600" v-else></i>
            {{ editingId ? 'Update Subscription' : 'New Subscription' }}
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-200 w-8 h-8 rounded-full font-bold" @click="dialogOpen = false">✕</button>
        </div>
        
        <div class="p-6 space-y-5 flex-1">
          <div class="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200 border-dashed">
            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1"><i class="pi pi-building"></i> Customer B2B</label>
            <select v-model="form.customerId" :disabled="!!editingId" class="w-full border rounded-lg px-2 py-2 text-xs font-bold text-slate-700 outline-none focus:border-purple-500 bg-white">
              <option value="">- Pilih Customer -</option>
              <option v-for="c in customers" :key="c.id" :value="c.id">{{ c.name || c.code }}</option>
            </select>
          </div>
          
          <div class="space-y-1.5">
            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Plan Name / Service</label>
            <input type="text" v-model="form.planName" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-purple-500 shadow-inner" placeholder="Enterprise Cloud License..." />
          </div>

          <div class="grid grid-cols-2 gap-4">
             <div class="space-y-1.5">
               <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Billing Cycle</label>
               <select v-model="form.billingCycle" class="w-full border rounded-lg px-2 py-2 text-xs font-bold text-slate-700 outline-none focus:border-purple-500 bg-white">
                 <option value="MONTHLY">Monthly (Bulanan)</option>
                 <option value="QUARTERLY">Quarterly (Per 3 Bulan)</option>
                 <option value="YEARLY">Yearly (Tahunan)</option>
               </select>
             </div>
             <div class="space-y-1.5">
               <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Contract Status</label>
               <select v-model="form.status" class="w-full border rounded-lg px-2 py-2 text-xs font-bold text-slate-700 outline-none focus:border-purple-500 bg-white">
                 <option value="ACTIVE">ACTIVE</option>
                 <option value="PAST_DUE">PAST_DUE</option>
                 <option value="CANCELLED">CANCELLED</option>
               </select>
             </div>
          </div>

          <div class="space-y-1.5">
            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Recurring Amount (IDR)</label>
            <input type="number" v-model="form.amount" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-purple-500 shadow-inner" placeholder="10000000" />
          </div>

          <div class="grid grid-cols-2 gap-4 border-t pt-4 mt-2">
             <div class="space-y-1.5">
               <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Start Date</label>
               <input type="date" v-model="form.startDate" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-700 outline-none focus:border-purple-500 bg-slate-50" />
             </div>
             <div class="space-y-1.5">
               <label class="text-[10px] font-bold text-purple-600 uppercase tracking-widest">Next Billing Date</label>
               <input type="date" v-model="form.nextBillingDate" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-purple-900 outline-none focus:border-purple-500 bg-purple-50 border-purple-200" />
             </div>
          </div>

          <div class="space-y-1.5">
            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Internal Notes / Terms</label>
            <textarea v-model="form.notes" rows="3" class="w-full border rounded-lg px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-purple-500 shadow-inner resize-none"></textarea>
          </div>
        </div>

        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-xl">
          <Button label="Cancel" severity="secondary" :disabled="saving" @click="dialogOpen = false" class="bg-white border text-slate-700 font-bold px-5" />
          <Button :label="editingId ? 'Update Plan' : 'Activate Plan'" :loading="saving" :disabled="!form.planName || !form.customerId"
            @click="save" class="bg-purple-600 border-none text-white font-bold px-6 hover:bg-purple-700" icon="pi pi-check" />
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

const canRead = auth.hasPermission('sales.subscription.read') || true;
const canManage = auth.hasPermission('sales.subscription.manage') || true;

const q = ref('');
const statusFilter = ref('');
const loading = ref(false);
const saving = ref(false);
const error = ref('');
const success = ref('');

const showMsg = (refVar: any, msg: string) => { refVar.value = msg; setTimeout(()=> { refVar.value = null; }, 3000); };

const dialogOpen = ref(false);
const editingId = ref<string | null>(null);
const subs = ref<any[]>([]);
const summary = ref<any>({});
const customers = ref<any[]>([]);

const form = ref({
  customerId: '',
  planName: '',
  billingCycle: 'MONTHLY',
  status: 'ACTIVE',
  amount: 0,
  startDate: '',
  nextBillingDate: '',
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
function isOverdue(iso: string) {
  if (!iso) return false;
  return new Date(iso).getTime() < new Date().getTime();
}

const statusColor = (status: string) => {
   if (status === 'ACTIVE') return '#10b981'; // emerald
   if (status === 'PAST_DUE') return '#f43f5e'; // rose
   if (status === 'CANCELLED') return '#94a3b8'; // slate
   return '#9333ea';
};

function badgeStyle(status: string) {
  const map: Record<string, any> = {
    ACTIVE: { backgroundColor: '#ecfdf5', color: '#047857', borderColor: '#a7f3d0' },
    PAST_DUE: { backgroundColor: '#fff1f2', color: '#be123c', borderColor: '#fecdd3' },
    CANCELLED: { backgroundColor: '#f8fafc', color: '#475569', borderColor: '#cbd5e1' }
  };
  return map[status] || map['ACTIVE'];
}

async function load() {
  loading.value = true;
  try {
    const params: any = {};
    if (q.value) params.search = q.value;
    if (statusFilter.value) params.status = statusFilter.value;
    const { data } = await api.get('/sales/subscriptions', { params });
    subs.value = data.data || [];
    summary.value = data.summary || {};
  } catch (e: any) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
}

async function loadCustomers() {
  try {
    const { data } = await api.get('/crm/customers');
    customers.value = data.data || [];
  } catch (e) {}
}

function openCreate() {
  editingId.value = null;
  form.value = {
     customerId: '', planName: '', billingCycle: 'MONTHLY', status: 'ACTIVE',
     amount: 0, startDate: new Date().toISOString().slice(0, 10), nextBillingDate: new Date().toISOString().slice(0, 10), notes: ''
  };
  if (customers.value.length === 0) loadCustomers();
  dialogOpen.value = true;
}

function openEdit(t: any) {
  editingId.value = t.id;
  form.value = {
    customerId: t.customerId || '',
    planName: t.planName || '',
    billingCycle: t.billingCycle || 'MONTHLY',
    status: t.status || 'ACTIVE',
    amount: parseFloat(t.amount || '0'),
    startDate: t.startDate?.slice(0, 10) || '',
    nextBillingDate: t.nextBillingDate?.slice(0, 10) || '',
    notes: t.notes || '',
  };
  if (customers.value.length === 0) loadCustomers();
  dialogOpen.value = true;
}

async function save() {
  saving.value = true;
  try {
    const payload = { ...form.value, amount: Number(form.value.amount) };

    if (editingId.value) {
      await api.patch(`/sales/subscriptions/${editingId.value}`, payload);
      showMsg(success, 'Subscription updated successfully!');
    } else {
      await api.post('/sales/subscriptions', payload);
      showMsg(success, 'New Subscription enrolled!');
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
