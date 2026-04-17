<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-6 shadow-sm border-l-4 border-l-emerald-500 relative overflow-hidden">
      <div class="absolute right-[-15px] top-[-10px] opacity-[0.03] pointer-events-none">
        <i class="pi pi-chart-line text-[150px] text-emerald-900"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-start gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-money-bill text-emerald-600"></i> Opportunity Management
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
            Kelola data master Deals (Peluang Penjualan), pantau nilai transaksi (Pipeline Value), dan atur kepemilikan agen.
          </div>
        </div>
        <div class="flex gap-2 shrink-0">
          <Button label="Buat Deal Baru" size="small" icon="pi pi-plus" class="bg-emerald-600 text-white border-none font-bold shadow-sm hover:bg-emerald-700" :disabled="loading || !canCreate" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Alert / Notif -->
    <div v-if="success" class="bg-emerald-50 text-emerald-700 p-3 rounded-xl border border-emerald-200 text-sm font-bold flex items-center gap-2 animate-fade-in-up">
      <i class="pi pi-check-circle text-lg"></i> {{ success }}
    </div>
    <div v-if="error" class="bg-rose-50 text-rose-700 p-3 rounded-xl border border-rose-200 text-sm font-bold flex items-center gap-2 animate-fade-in-up">
      <i class="pi pi-exclamation-triangle text-lg"></i> {{ error }}
    </div>

    <!-- KPI Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 items-start animate-fade-in-up">
      <div class="bg-slate-800 border-b-4 border-b-slate-900 rounded-xl p-4 shadow-sm text-white">
        <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Pipeline Deals</div>
        <div class="text-3xl font-black mt-0.5">{{ opportunities.filter(o => o.stage !== 'CLOSED_LOST' && o.stage !== 'CLOSED_WON').length }}</div>
        <div class="text-xs text-emerald-400 font-bold mt-1">{{ fmtRp(totalPipelineValue) }}</div>
      </div>
      
      <div class="bg-amber-50 border border-amber-200 border-b-4 border-b-amber-500 rounded-xl p-4 shadow-sm">
        <div class="text-[10px] font-black text-amber-500 uppercase tracking-widest">Proposal</div>
        <div class="text-3xl font-black text-amber-700 mt-0.5">{{ countStage('PROPOSAL') }}</div>
      </div>
      
      <div class="bg-blue-50 border border-blue-200 border-b-4 border-b-blue-500 rounded-xl p-4 shadow-sm">
        <div class="text-[10px] font-black text-blue-500 uppercase tracking-widest">Negotiation</div>
        <div class="text-3xl font-black text-blue-700 mt-0.5">{{ countStage('NEGOTIATION') }}</div>
      </div>
      
      <div class="bg-emerald-50 border border-emerald-200 border-b-4 border-b-emerald-500 rounded-xl p-4 shadow-sm">
        <div class="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Closed Won / Goal</div>
        <div class="text-3xl font-black text-emerald-700 mt-0.5">{{ countStage('CLOSED_WON') }}</div>
      </div>
    </div>

    <!-- Controls -->
    <div class="bg-white border rounded-xl p-4 shadow-sm flex flex-wrap gap-3 items-center animate-fade-in-up">
      <span class="p-input-icon-left w-72">
         <i class="pi pi-search" />
         <InputText v-model="q" placeholder="Cari nama deal, kode, atau info klien..." class="w-full text-sm h-10" @keyup.enter="load" />
      </span>
      <Button severity="secondary" size="small" :loading="loading" icon="pi pi-refresh" @click="load" class="h-10 w-10 shrink-0" />
      
      <div class="ml-auto text-xs font-bold text-slate-400 bg-slate-50 px-3 py-2 rounded-lg border">
         Tip: Buka menu <a href="/crm/pipeline" class="text-emerald-600 hover:underline">Pipeline</a> untuk tampilan visual Drag & Drop.
      </div>
    </div>

    <!-- TABLE -->
    <div class="rounded-xl border bg-white shadow-sm overflow-hidden animate-fade-in-up">
      <table class="w-full text-sm">
        <thead class="bg-slate-50 text-left text-[11px] text-slate-500 uppercase tracking-widest font-black">
          <tr>
            <th class="px-5 py-3 border-b border-b-slate-200 w-32">Data Deals</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200">Klien & Target Tanggal</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200 text-right w-40">Nilai (Expected)</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200 w-44">PIC / Owner</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200 text-center w-40">Sales Stage</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200 text-center w-20">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-if="loading">
            <td colspan="6" class="py-16 text-center text-slate-400"><i class="pi pi-spinner pi-spin mr-2 text-emerald-600 shadow-sm"></i> Memuat master peluang...</td>
          </tr>
          
          <tr v-for="o in filteredOpps" v-else :key="o.id" class="transition hover:bg-emerald-50/20 group">
            <td class="px-5 py-3 border-l-4 align-top" :style="{ borderLeftColor: stageColor(o.stage) }">
               <span class="font-mono text-[11px] font-black text-emerald-700 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded cursor-pointer hover:bg-emerald-100" @click="navigateTo(`/crm/opportunities/${o.id}`)">
                {{ o.code }}
              </span>
              <div class="mt-2 font-bold text-slate-800 text-sm leading-tight line-clamp-2" :title="o.name">{{ o.name }}</div>
            </td>
            
            <td class="px-4 py-3 align-top border-l">
              <div class="flex flex-col gap-1.5">
                 <div v-if="o.customer" class="flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded w-max border border-blue-100">
                    <i class="pi pi-building text-[9px]"></i> {{ o.customer.name || o.customer.code }} (Customer)
                 </div>
                 <div v-else-if="o.lead" class="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded w-max border border-amber-100">
                    <i class="pi pi-user text-[9px]"></i> {{ o.lead.name || o.lead.code }} (Lead)
                 </div>
                 <div v-else class="text-[10px] text-slate-400 italic font-medium">Bebas / No Client</div>
                 
                 <div class="text-[10px] font-black uppercase flex items-center gap-1 mt-1" :class="isPast(o.closeDate) && o.stage !== 'CLOSED_WON' && o.stage !== 'CLOSED_LOST' ? 'text-red-500' : 'text-slate-500'">
                   <i class="pi pi-calendar text-[9px]"></i> CLOSE: {{ o.closeDate ? formatDate(o.closeDate) : 'Unknown' }}
                 </div>
              </div>
            </td>

             <td class="px-4 py-3 align-top border-l text-right">
              <div class="font-black font-mono text-emerald-700">{{ fmtRp(o.expectedValue ?? 0) }}</div>
            </td>

            <td class="px-4 py-3 align-top border-l">
              <select v-model="ownerSelection[o.id]"
                class="w-full h-8 rounded border border-slate-200 px-2 text-[11px] font-bold text-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                :disabled="!canAssign || !canReadUsers"
                @change="assignOwner(o)"
                :class="ownerSelection[o.id] ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-slate-50'">
                <option value="">-- No Owner --</option>
                <option v-for="u in users" :key="u.id" :value="u.id">{{ u.name ?? u.email }}</option>
              </select>
            </td>

            <td class="px-4 py-3 align-top border-l text-center">
              <select v-model="stageSelection[o.id]"
                class="w-full h-8 rounded appearance-none px-2 text-center text-[10px] font-black uppercase tracking-widest outline-none transition"
                :disabled="!canUpdate"
                :style="stageStyle(stageSelection[o.id])"
                @change="updateStage(o)">
                <option value="QUALIFICATION" class="bg-white text-slate-800">QUALIFICATION</option>
                <option value="PROPOSAL" class="bg-white text-slate-800">PROPOSAL</option>
                <option value="NEGOTIATION" class="bg-white text-slate-800">NEGOTIATION</option>
                <option value="CLOSED_WON" class="bg-white text-slate-800 font-black">CLOSED_WON</option>
                <option value="CLOSED_LOST" class="bg-white text-slate-800">CLOSED_LOST</option>
              </select>
            </td>
            
            <td class="px-4 py-3 align-top border-l text-center">
              <div class="flex justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button icon="pi pi-pencil" v-tooltip="'Edit Details'" size="small" outlined class="h-8 w-8 text-[11px] px-0" severity="secondary" @click="openEdit(o)" />
              </div>
            </td>
          </tr>

          <tr v-if="!loading && filteredOpps.length === 0">
            <td colspan="6" class="py-12 text-center text-slate-400 italic text-sm">Tidak ada deals yang sesuai pencarian.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Form Drawer -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm" @click.self="closeDialog">
      <div class="w-full max-w-md h-full bg-white shadow-2xl flex flex-col overflow-y-auto animate-slide-in-right">
        <div class="p-5 border-b bg-slate-50 flex justify-between rounded-t-xl" style="borderTop: 4px solid #10b981;">
          <div class="text-lg font-black text-slate-800 flex items-center gap-2">
            <i class="pi pi-pencil text-emerald-600" v-if="editingId"></i>
             <i class="pi pi-plus text-emerald-600" v-else></i>
            {{ editingId ? 'Update Detail Opportunity' : 'Buat Opportunity Baru' }}
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-200 w-8 h-8 rounded-full font-bold" @click="closeDialog">✕</button>
        </div>
        
        <div class="p-6 space-y-5 flex-1">
          <div class="space-y-1.5" v-if="editingId">
            <label class="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Kode (Readonly)</label>
            <input type="text" v-model="form.code" class="w-full border rounded-lg px-3 py-2 text-sm font-bold bg-slate-50 text-slate-500 outline-none" disabled />
          </div>
          <div class="space-y-1.5" v-else>
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Kode <span class="text-red-500">*</span></label>
            <input type="text" v-model="form.code" class="w-full border rounded-lg px-3 py-2 text-sm font-black font-mono text-emerald-700 outline-none focus:border-emerald-500 shadow-inner" placeholder="Otomatis digenerate..." />
          </div>
          
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Nama Opportunity / Kontrak <span class="text-red-500">*</span></label>
            <input type="text" v-model="form.name" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-emerald-500 shadow-inner" placeholder="Penyediaan Bahan Baku F&B..." />
          </div>

          <div class="grid grid-cols-2 gap-4 border-t border-b border-dashed py-4 my-2">
             <div class="space-y-1.5">
               <label class="text-[11px] font-bold text-blue-500 uppercase tracking-widest flex items-center gap-1"><i class="pi pi-building"></i> Pilih Customer</label>
               <select v-model="form.customerId" class="w-full border rounded-lg px-2 py-2 text-xs font-bold text-slate-700 outline-none focus:border-blue-500 bg-blue-50 border-blue-100" :disabled="editingId ? !canUpdate : !canCreate">
                 <option value="">- Kosong -</option>
                 <option v-for="c in customers" :key="c.id" :value="c.id">{{ c.name || c.code }}</option>
               </select>
             </div>
             
             <div class="space-y-1.5">
               <label class="text-[11px] font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1"><i class="pi pi-user"></i> Atau Pilih Lead</label>
               <select v-model="form.leadId" class="w-full border rounded-lg px-2 py-2 text-xs font-bold text-slate-700 outline-none focus:border-amber-500 bg-amber-50 border-amber-100" :disabled="editingId ? !canUpdate : !canCreate">
                 <option value="">- Kosong -</option>
                 <option v-for="l in leads" :key="l.id" :value="l.id">{{ l.name || l.code }}</option>
               </select>
             </div>
          </div>

          <div class="space-y-1.5">
             <label class="text-[11px] font-bold text-emerald-600 uppercase tracking-widest">Expected Value (Estimasi Rp) <span class="text-red-500">*</span></label>
             <input type="number" v-model="form.expectedValue" class="w-full border rounded-lg px-3 py-2 text-sm font-black text-emerald-700 outline-none focus:border-emerald-500 shadow-inner bg-emerald-50" placeholder="Misal: 15000000" />
          </div>

          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Target Tanggal Closing (Expected Close Date)</label>
            <input type="date" v-model="form.closeDate" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-700 outline-none focus:border-emerald-500 shadow-inner" />
          </div>

          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Catatan Tambahan</label>
            <textarea v-model="form.notes" rows="4" class="w-full border rounded-lg px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-emerald-500 shadow-inner resize-none"></textarea>
          </div>

          <div v-if="dialogError" class="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 border border-red-200 font-bold border-l-4 border-l-red-500">{{ dialogError }}</div>
        </div>

        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-xl">
          <Button label="Batal" severity="secondary" :disabled="saving" @click="closeDialog" class="bg-white border text-slate-700 font-bold px-5" />
          <Button :label="editingId ? 'Simpan Perubahan' : 'Buat Deals'" :loading="saving" :disabled="!form.name || !form.expectedValue"
            @click="save" class="bg-emerald-600 border-none text-white font-bold px-6" icon="pi pi-check" />
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
  expectedValue?: string | null; closeDate?: string | null;
  lead?: { id: string; code: string; name: string } | null;
  customer?: { id: string; code: string; name: string } | null;
  owner?: { id: string; email: string; name: string | null } | null;
};
type Lead = { id: string; code: string; name: string };
type Customer = { id: string; code: string; name: string };
type CrmUser = { id: string; email: string; name: string | null };

const api = useApi();
const auth = useAuthStore();

const canRead = computed(() => auth.hasPermission('crm.opportunity.read'));
const canCreate = computed(() => auth.hasPermission('crm.opportunity.create'));
const canUpdate = computed(() => auth.hasPermission('crm.opportunity.update'));
const canAssign = computed(() => auth.hasPermission('crm.opportunity.assign'));
const canReadUsers = computed(() => auth.hasPermission('crm.user.read'));
const canReadLead = computed(() => auth.hasPermission('crm.lead.read'));
const canReadCustomer = computed(() => auth.hasPermission('crm.customer.read'));

const q = ref('');
const loading = ref(false);
const error = ref<string | null>(null);
const success = ref<string | null>(null);
const opportunities = ref<Opportunity[]>([]);
const filteredOpps = computed(() => {
  if (!q.value) return opportunities.value;
  const s = q.value.toLowerCase();
  return opportunities.value.filter(o => o.name.toLowerCase().includes(s) || o.code.toLowerCase().includes(s) || 
                                         (o.customer?.name||'').toLowerCase().includes(s) || (o.lead?.name||'').toLowerCase().includes(s));
});

const totalPipelineValue = computed(() => opportunities.value.filter(o => o.stage !== 'CLOSED_LOST').reduce((s,o) => s + Number(o.expectedValue ?? 0), 0));

const countStage = (s: string) => opportunities.value.filter(o => o.stage === s).length;

const stageSelection = reactive<Record<string, Opportunity['stage']>>({});
const ownerSelection = reactive<Record<string, string>>({});
const leads = ref<Lead[]>([]);
const customers = ref<Customer[]>([]);
const users = ref<CrmUser[]>([]);

const dialogOpen = ref(false);
const saving = ref(false);
const dialogError = ref<string | null>(null);
const editingId = ref<string | null>(null);

const form = reactive({ code: '', name: '', leadId: '', customerId: '', expectedValue: '', closeDate: '', notes: '' });

const fmtRp = (v: any) => {
   const val = Number(v);
   if (val === 0) return '-';
   return `Rp ${val.toLocaleString('id-ID')}`;
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  const m = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  return `${d.getDate()} ${m[d.getMonth()]} ${d.getFullYear().toString().slice(2)}`;
};

const isPast = (iso?: string | null) => iso ? new Date(iso) < new Date() : false;

const stageStyle = (st: string) => {
  if (st === 'QUALIFICATION') return { backgroundColor: '#ede9fe', color: '#8b5cf6', borderColor: '#c4b5fd' }; // purple
  if (st === 'PROPOSAL') return { backgroundColor: '#fef3c7', color: '#f59e0b', borderColor: '#fde68a' }; // amber
  if (st === 'NEGOTIATION') return { backgroundColor: '#e0f2fe', color: '#3b82f6', borderColor: '#bae6fd' }; // blue
  if (st === 'CLOSED_WON') return { backgroundColor: '#d1fae5', color: '#10b981', borderColor: '#a7f3d0' }; // emerald
  return { backgroundColor: '#ffe4e6', color: '#f43f5e', borderColor: '#fecdd3' }; // rose
};
const stageColor = (st: string) => {
  if (st === 'QUALIFICATION') return '#8b5cf6';
  if (st === 'PROPOSAL') return '#f59e0b';
  if (st === 'NEGOTIATION') return '#3b82f6';
  if (st === 'CLOSED_WON') return '#10b981';
  return '#f43f5e';
};

const showMsg = (refVar: any, msg: string) => { refVar.value = msg; setTimeout(()=> { refVar.value = null; }, 3000); };

const load = async () => {
  loading.value = true; error.value = null; success.value = null;
  try {
    const tasks: Promise<any>[] = [];
    tasks.push(canRead.value ? api.get('/crm/opportunities') : Promise.resolve({ data: { opportunities: [] } }));
    tasks.push(canReadLead.value && leads.value.length === 0 ? api.get('/crm/leads') : Promise.resolve({ data: { leads: leads.value } }));
    tasks.push(canReadCustomer.value && customers.value.length === 0 ? api.get('/crm/customers') : Promise.resolve({ data: { customers: customers.value } }));
    tasks.push(canReadUsers.value && users.value.length === 0 ? api.get('/crm/users') : Promise.resolve({ data: { users: users.value } }));
    
    const [oRes, lRes, cRes, uRes] = await Promise.all(tasks);
    opportunities.value = oRes.data?.opportunities ?? oRes.opportunities ?? [];
    
    if (lRes.data?.leads) leads.value = lRes.data.leads;
    else if (lRes.leads) leads.value = lRes.leads;

    if (cRes.data?.customers) customers.value = cRes.data.customers;
    else if (cRes.customers) customers.value = cRes.customers;

    if (uRes.data?.users) users.value = uRes.data.users;
    else if (uRes.users) users.value = uRes.users;

    for (const o of opportunities.value) {
      stageSelection[o.id] = o.stage;
      ownerSelection[o.id] = o.owner?.id ?? '';
    }
  } catch (e: any) { error.value = e?.response?.data?.message ?? 'Gagal load master deals'; } 
  finally { loading.value = false; }
};

const openCreate = () => {
  editingId.value = null;
  form.code = `OPP-${Math.floor(Math.random()*90000)+10000}`;
  form.name = ''; form.leadId = ''; form.customerId = '';
  form.expectedValue = ''; form.closeDate = ''; form.notes = '';
  dialogError.value = null; dialogOpen.value = true;
};

const openEdit = (o: Opportunity) => {
  editingId.value = o.id; form.code = o.code; form.name = o.name;
  form.leadId = o.lead?.id ?? ''; form.customerId = o.customer?.id ?? '';
  form.expectedValue = o.expectedValue ?? '';
  form.closeDate = o.closeDate ? o.closeDate.slice(0,10) : '';
  dialogError.value = null; dialogOpen.value = true;
};

const closeDialog = () => { if (!saving.value) dialogOpen.value = false; };

const save = async () => {
  saving.value = true; dialogError.value = null;
  try {
    const payload = {
      name: form.name, expectedValue: form.expectedValue || undefined,
      leadId: form.leadId || undefined, customerId: form.customerId || undefined,
      closeDate: form.closeDate ? new Date(form.closeDate).toISOString() : undefined,
      notes: form.notes || undefined,
    };
    if (editingId.value) {
      await api.patch(`/crm/opportunities/${editingId.value}`, payload);
      showMsg(success, `Deal ${form.name} diperbarui!`);
    } else {
      await api.post('/crm/opportunities', { code: form.code, ...payload });
      showMsg(success, `Sukses membuat deal ${form.name}!`);
    }
    dialogOpen.value = false;
    await load();
  } catch (e: any) { dialogError.value = e?.response?.data?.message ?? 'Gagal simpan deals'; } 
  finally { saving.value = false; }
};

const updateStage = async (o: Opportunity) => {
  const oldStage = o.stage;
  try {
    await api.patch(`/crm/opportunities/${o.id}`, { stage: stageSelection[o.id] });
    showMsg(success, `Transaksi merubah stage ke ${stageSelection[o.id]}`);
    o.stage = stageSelection[o.id];
  } catch (e: any) {
    stageSelection[o.id] = oldStage;
    showMsg(error, e?.response?.data?.message ?? 'Gagal mengubah stage');
  }
};

const assignOwner = async (o: Opportunity) => {
  try {
    await api.patch(`/crm/opportunities/${o.id}/assign`, { userId: ownerSelection[o.id] || undefined });
    showMsg(success, 'Assignee / P.I.C sukses dialokasi ulang.');
  } catch (e: any) {
    ownerSelection[o.id] = o.owner?.id ?? '';
    showMsg(error, e?.response?.data?.message ?? 'Gagal assign PIC');
  }
};

onMounted(load);
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
.animate-slide-in-right { animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes slideInRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
</style>
