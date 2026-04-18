<template>
  <div class="space-y-6">
    <!-- Header (Premium Helpdesk Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-rose-100"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-6 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic">Support Core</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-rose-600">Helpdesk Intelligence</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase">Customer <span class="text-rose-600 italic text-3xl">Service</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl">Ekosistem pengaduan terpadu — monitor SLA komplain, kelola antrean tiket support, dan pastikan kepuasan purna jual pelanggan tetap di level premium.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="Dispatch New Ticket" size="small" icon="pi pi-plus" class="p-button-rounded h-12 px-8 bg-rose-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-rose-100 hover:scale-105 active:scale-95 transition-all" :disabled="loading || !canCreate" @click="openCreate" />
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

    <!-- High-Contrast KPI Banners (Premium style) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
       <!-- Primary engagement banner -->
      <div class="p-6 rounded-2xl bg-slate-900 text-white shadow-xl flex flex-col justify-between border border-slate-800 transition-all hover:bg-slate-950 group">
        <div class="text-[10px] font-black uppercase text-rose-400 tracking-[0.2em] mb-4 opacity-80">Open Queues</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-white tracking-tighter">{{ countStatus('OPEN') }}</h3>
          <div class="p-3 bg-slate-700 rounded-xl text-slate-100 shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-inbox text-lg"></i>
          </div>
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-amber-600 tracking-[0.2em] mb-4">In Treatment</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-amber-600 tracking-tighter">{{ countStatus('IN_PROGRESS') }}</h3>
          <div class="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100"><i class="pi pi-spinner pi-spin text-lg"></i></div>
        </div>
      </div>
      
      <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-rose-600 tracking-[0.2em] mb-4">Critical SLA</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-rose-700 tracking-tighter">{{ countPriority('URGENT') }}</h3>
          <div class="p-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-100"><i class="pi pi-bolt text-lg"></i></div>
        </div>
      </div>

       <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-emerald-500 tracking-[0.2em] mb-4">Resolved Flow</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-emerald-600 tracking-tighter">{{ countStatus('RESOLVED') + countStatus('CLOSED') }}</h3>
          <div class="p-3 bg-emerald-50 text-emerald-500 rounded-xl border border-emerald-100"><i class="pi pi-check-circle text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Modern Filters (Premium style) -->
    <div class="bg-rose-50/50 p-1.5 rounded-3xl border border-rose-100 flex flex-wrap items-center gap-2 animate-fade-in-up">
      <div class="bg-white p-1 rounded-[1.5rem] border border-slate-200 flex flex-1 items-center shadow-sm min-w-[280px]">
        <i class="pi pi-search px-4 text-slate-400 text-xs"></i>
        <InputText v-model="q" placeholder="Cari Ticket ID, Subject, or Client..." class="flex-1 h-10 border-none bg-transparent text-xs font-black uppercase tracking-widest outline-none shadow-none focus:ring-0" @keyup.enter="load" />
        <Button icon="pi pi-refresh" severity="secondary" rounded text @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-rose-600 transition-all shrink-0" />
      </div>

      <div class="flex bg-white/60 p-1 rounded-2xl border border-rose-100 gap-1 ml-auto">
        <button v-for="s in ['ACTIVE','HISTORY']" :key="s"
          @click="statusFilter = s"
          :class="statusFilter === s ? 'bg-rose-600 text-white shadow-lg scale-105' : 'text-slate-500 hover:bg-white hover:shadow-sm'"
          class="px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-[0.15em] transition-all duration-300">
          {{ s === 'ACTIVE' ? 'Live Queues' : 'Resolved Stream' }}
        </button>
      </div>
    </div>

    <!-- TABLE (Premium Modern Style) -->
    <div class="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up">
      <table class="w-full text-sm">
        <thead class="bg-slate-50/80 text-left">
          <tr>
            <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Support Blueprint</th>
            <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Priority & SLA Gate</th>
            <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] w-56">Agent Assigned</th>
            <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center w-44">Resolution State</th>
            <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-32">Interaction</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50">
          <tr v-if="loading">
            <td colspan="5" class="py-24 text-center">
              <i class="pi pi-spinner pi-spin text-4xl text-rose-600 opacity-20"></i>
              <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-rose-600">Syncing helpdesk flow...</div>
            </td>
          </tr>
          
          <tr v-for="t in filteredList" v-else :key="t.id" class="transition-all hover:bg-slate-50/5 group border-l-4" :style="{ borderLeftColor: priorityStyle(t.priority).color }">
            <td class="px-8 py-6 align-middle">
               <div class="flex flex-col gap-2">
                  <div class="font-black text-slate-900 text-[14px] tracking-tight leading-tight uppercase group-hover:text-rose-700 transition-colors">{{ t.subject?.toLowerCase() }}</div>
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-[10px] font-black text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100 italic lowercase cursor-pointer hover:bg-rose-100">
                      {{ t.code }}
                    </span>
                    <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest"><i class="pi pi-clock text-[8px] mr-1"></i> Entry: {{ t.createdAt ? formatDate(t.createdAt) : 'N/A' }}</span>
                  </div>
                  <div class="flex items-center gap-2 mt-1" v-if="t.customer">
                     <span class="text-[9px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 flex items-center gap-1 cursor-pointer hover:bg-blue-100 shadow-sm" @click="navigateTo(`/crm/customers/${t.customer.id}`)">
                        <i class="pi pi-building text-[8px]"></i> {{ t.customer.name || t.customer.code }}
                     </span>
                  </div>
               </div>
            </td>
            
            <td class="px-6 py-6 align-middle border-l border-slate-50/50">
                <div class="flex flex-col gap-2">
                  <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest shadow-sm self-start transition-transform hover:scale-105"
                    :style="{ backgroundColor: priorityStyle(t.priority).bg, color: priorityStyle(t.priority).color, borderColor: priorityStyle(t.priority).border }">
                    <i class="pi pi-circle-fill text-[6px]"></i> {{ t.priority }}
                  </div>
                  <div v-if="t.slaDueAt && t.status !== 'CLOSED' && t.status !== 'RESOLVED'" class="text-[8px] font-black text-rose-500 uppercase tracking-widest bg-rose-50 px-2 py-1 rounded-lg border border-rose-100 w-max shadow-sm animate-pulse">
                     SLA DUE: {{ t.slaDueAt }}
                  </div>
                </div>
            </td>

            <td class="px-6 py-6 align-middle border-l border-slate-50/50">
               <select v-model="assigneeSelection[t.id]"
                class="w-full h-10 rounded-2xl border-none px-4 text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-rose-100 outline-none transition-all shadow-inner"
                :disabled="!canAssign || !canReadUsers || t.status === 'CLOSED'"
                @change="assign(t)"
                 :class="assigneeSelection[t.id] ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400 font-bold italic'">
                <option value="">-- UNASSIGNED --</option>
                <option v-for="u in users" :key="u.id" :value="u.id">{{ u.name ?? u.email }}</option>
              </select>
            </td>

            <td class="px-6 py-6 align-middle border-l border-slate-50/50 text-center">
               <div class="relative inline-block w-full max-w-[140px]">
                  <select v-model="statusSelection[t.id]"
                    class="w-full h-10 rounded-2xl appearance-none text-center text-[10px] font-black uppercase tracking-widest outline-none transition-all cursor-pointer border shadow-sm px-4"
                    :disabled="!canUpdate"
                    :style="statusStyle(statusSelection[t.id])"
                    @change="updateTicket(t)">
                    <option value="OPEN" class="bg-white text-slate-800">BARU (OPEN)</option>
                    <option value="IN_PROGRESS" class="bg-white text-slate-800">PROGRESS</option>
                    <option value="RESOLVED" class="bg-white text-slate-800">RESOLVED</option>
                    <option value="CLOSED" class="bg-white text-slate-800 font-black">CLOSED</option>
                  </select>
                  <i class="pi pi-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-[10px] pointer-events-none opacity-50"></i>
               </div>
            </td>

             <td class="px-8 py-6 align-middle border-l border-slate-50/50 text-right">
              <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0">
                <Button icon="pi pi-pencil" v-tooltip="'Execute Treatment'" size="small" class="p-button-rounded h-10 w-10 bg-slate-900 border-none text-white shadow-lg hover:scale-110 active:scale-95 transition-all" @click="openEdit(t)" />
              </div>
            </td>
          </tr>

          <tr v-if="!loading && filteredList.length === 0">
            <td colspan="5" class="py-32 text-center text-slate-400 italic text-sm font-medium">
               <i class="pi pi-check-circle text-5xl mb-4 block opacity-10"></i>
               <div class="text-[10px] font-black uppercase tracking-[0.2em]">Support queues are clean and secure.</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Dialog Ticket Form (Universal Centered Style) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-2xl max-h-[90vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white">
        <!-- Dialog Header -->
        <div class="p-10 border-b bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-700"></div>
          <div class="relative flex items-center gap-5">
            <div class="w-16 h-16 rounded-[1.5rem] bg-slate-900 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0">
               <i class="pi pi-headphones text-3xl animate-pulse text-rose-400"></i>
            </div>
            <div>
              <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">{{ editingId ? 'Resolve' : 'Dispatch' }} <span class="text-rose-600 italic">Ticket</span></h3>
              <p class="text-[10px] font-black text-rose-600 uppercase tracking-[0.2em] mt-2 px-1 border-l-2 border-rose-500">Customer Support Gate Provisioning</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="closeDialog" class="relative z-10 hover:bg-slate-50 h-12 w-12" />
        </div>
        
        <!-- Dialog Body -->
        <div class="p-12 space-y-10 flex-1 overflow-y-auto bg-slate-50/30 custom-scrollbar">
          <!-- Identitas Tiket -->
          <div class="space-y-8">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-[10px] font-black shadow-lg">01</div>
              <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800">Support Identity & Traceability</h4>
            </div>
            
            <div class="pl-11 space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="space-y-2">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Ticket Handle <span class="text-red-500">*</span></label>
                  <input type="text" v-model="form.code" class="w-full h-14 border-none rounded-2xl px-5 text-sm font-mono font-black text-rose-700 bg-white shadow-inner outline-none focus:ring-2 focus:ring-rose-100 placeholder:italic" placeholder="TCK-AUTO" :disabled="!!editingId" />
                </div>
                <div class="space-y-2 md:col-span-2">
                   <label class="text-[10px] font-black text-blue-600 uppercase tracking-widest block">B2B Customer Link <span class="text-red-500">*</span></label>
                   <select v-model="form.customerId" class="w-full h-14 border-none rounded-2xl px-5 text-sm font-black text-slate-800 bg-blue-50/50 shadow-inner outline-none focus:ring-2 focus:ring-blue-100 appearance-none flex items-center justify-between" :disabled="editingId ? !canUpdate : !canCreate">
                     <option value="" disabled>-- Select Entity --</option>
                     <option v-for="c in customers" :key="c.id" :value="c.id">{{ c.code }} - {{ c.name }}</option>
                   </select>
                </div>
              </div>

              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-bold">Subject Narrative <span class="text-red-500">*</span></label>
                <input type="text" v-model="form.subject" class="w-full h-14 border-none rounded-2xl px-5 text-sm font-bold text-slate-800 bg-white shadow-inner outline-none focus:ring-2 focus:ring-rose-100" placeholder="Summary of the issue reported by client..." :disabled="editingId ? !canUpdate : !canCreate" />
              </div>
            </div>
          </div>

          <!-- Documentation -->
          <div class="space-y-8 pt-10 border-t border-slate-200">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-slate-400 flex items-center justify-center text-white text-[10px] font-black shadow-lg">02</div>
              <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">Investigation Logs & Field Support</h4>
            </div>
            
            <div class="pl-11">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 lowercase">Support History & Internal Coordination Narrative</label>
              <textarea v-model="form.notes" rows="6" class="w-full border-none rounded-3xl p-6 text-sm font-medium text-slate-700 bg-white shadow-inner outline-none focus:ring-2 focus:ring-rose-100 resize-none transition-all" placeholder="Detail investigation results, proposed compensation, technical fixes, and client satisfaction markers..."></textarea>
            </div>
          </div>

          <div v-if="dialogError" class="ml-11 rounded-2xl bg-rose-50 px-6 py-4 text-xs text-rose-600 border border-rose-100 font-bold shadow-sm animate-scale-in">
             <i class="pi pi-exclamation-circle mr-2"></i> {{ dialogError }}
          </div>
        </div>

        <!-- Dialog Footer Actions -->
        <div class="p-10 border-t bg-white flex justify-end gap-4 shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
          <Button label="Discard treatment" severity="secondary" text :disabled="saving" @click="closeDialog" class="px-8 h-14 font-black text-[10px] uppercase tracking-widest" />
          <Button :label="editingId ? 'Execute Update' : 'Initialize Support'" :loading="saving" :disabled="!form.subject || !form.customerId"
            @click="save" class="p-button-rounded h-14 px-12 bg-rose-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-rose-100 hover:scale-105 active:scale-95 transition-all" icon="pi pi-bolt" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

type Customer = { id: string; code: string; name: string };
type CrmUser = { id: string; email: string; name: string | null };
type Ticket = {
  id: string; code: string; subject: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  customer?: Customer; assignedTo?: CrmUser | null;
  notes?: string | null; createdAt?: string;
  slaDueAt?: string | null; isOverdue?: boolean;
};

const api = useApi();
const auth = useAuthStore();

const canRead = computed(() => auth.hasPermission('crm.ticket.read'));
const canCreate = computed(() => auth.hasPermission('crm.ticket.create'));
const canUpdate = computed(() => auth.hasPermission('crm.ticket.update'));
const canAssign = computed(() => auth.hasPermission('crm.ticket.assign'));
const canReadUsers = computed(() => auth.hasPermission('crm.user.read'));

const q = ref('');
const statusFilter = ref('ACTIVE');
const loading = ref(false);
const error = ref<string | null>(null);
const success = ref<string | null>(null);

const tickets = ref<Ticket[]>([]);
const customers = ref<Customer[]>([]);
const users = ref<CrmUser[]>([]);

const filteredList = computed(() => {
  let res = tickets.value;
  if (statusFilter.value === 'ACTIVE') res = res.filter(x => x.status === 'OPEN' || x.status === 'IN_PROGRESS');
  if (statusFilter.value === 'HISTORY') res = res.filter(x => x.status === 'RESOLVED' || x.status === 'CLOSED');
  
  if (q.value) {
    const s = q.value.toLowerCase();
    res = res.filter(x => x.code.toLowerCase().includes(s) || x.subject.toLowerCase().includes(s) || 
                          (x.customer?.name||'').toLowerCase().includes(s) || (x.notes||'').toLowerCase().includes(s));
  }
  return res;
});

const countStatus = (st: string) => tickets.value.filter(x => x.status === st).length;
const countPriority = (pr: string) => tickets.value.filter(x => x.priority === pr).length;

const statusSelection = reactive<Record<string, Ticket['status']>>({});
const prioritySelection = reactive<Record<string, Ticket['priority']>>({});
const assigneeSelection = reactive<Record<string, string>>({});

const dialogOpen = ref(false);
const saving = ref(false);
const dialogError = ref<string | null>(null);
const editingId = ref<string | null>(null);

const form = reactive({ code: '', customerId: '', subject: '', notes: '' });

const pad = (n: number) => String(n).padStart(2, '0');
const formatDate = (iso: string) => {
  const d = new Date(iso);
  const m = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  return `${d.getDate()} ${m[d.getMonth()]} ${d.getFullYear().toString().slice(2)}`;
};

const priorityStyle = (pr: string) => {
  if (pr === 'LOW') return { bg: '#f8fafc', color: '#64748b', border: '#e2e8f0' }; // slate
  if (pr === 'MEDIUM') return { bg: '#fef3c7', color: '#d97706', border: '#fde68a' }; // amber
  if (pr === 'HIGH') return { bg: '#ffedd5', color: '#ea580c', border: '#fed7aa' }; // orange
  return { bg: '#fee2e2', color: '#dc2626', border: '#fecaca' }; // URGENT red
};

const statusStyle = (st: string) => {
  if (st === 'OPEN') return { backgroundColor: '#fee2e2', color: '#e11d48', borderColor: '#fecdd3' }; // rose
  if (st === 'IN_PROGRESS') return { backgroundColor: '#fef3c7', color: '#d97706', borderColor: '#fde68a' }; // amber
  if (st === 'RESOLVED') return { backgroundColor: '#d1fae5', color: '#059669', borderColor: '#6ee7b7' }; // emerald
  return { backgroundColor: '#f1f5f9', color: '#475569', borderColor: '#cbd5e1' }; // CLOSED slate
};

const showMsg = (refVar: any, msg: string) => { refVar.value = msg; setTimeout(()=> { refVar.value = null; }, 3000); };

const load = async () => {
  loading.value = true; error.value = null; success.value = null;
  try {
    if (!canRead.value) { tickets.value = []; return; }
    
    const tasks: Promise<any>[] = [api.get('/crm/tickets')];
    if (customers.value.length === 0) tasks.push(api.get('/crm/customers'));
    if (users.value.length === 0) tasks.push(canReadUsers.value ? api.get('/crm/users') : Promise.resolve({data: {users: []}}));
    
    const [tRes, cRes, uRes] = await Promise.all(tasks);
    tickets.value = tRes.data?.tickets ?? tRes.tickets ?? [];
    if (cRes) customers.value = cRes.data?.customers ?? cRes.customers ?? [];
    if (uRes) users.value = uRes.data?.users ?? uRes.users ?? [];

    for (const t of tickets.value) {
      statusSelection[t.id] = t.status;
      prioritySelection[t.id] = t.priority;
      assigneeSelection[t.id] = t.assignedTo?.id ?? '';
    }
  } catch (e: any) { error.value = e?.response?.data?.message ?? 'Gagal load master support tickets'; } 
  finally { loading.value = false; }
};

const openCreate = () => {
  editingId.value = null;
  form.code = `TCK-${Math.floor(Math.random()*900000)+100000}`;
  form.customerId = ''; form.subject = ''; form.notes = '';
  dialogError.value = null; dialogOpen.value = true;
};

const openEdit = (t: Ticket) => {
  editingId.value = t.id; form.code = t.code;
  form.customerId = t.customer?.id ?? '';
  form.subject = t.subject; form.notes = t.notes ?? '';
  dialogError.value = null; dialogOpen.value = true;
};

const closeDialog = () => { if (!saving.value) dialogOpen.value = false; };

const save = async () => {
  saving.value = true; dialogError.value = null;
  try {
    if (editingId.value) {
      await api.patch(`/crm/tickets/${editingId.value}`, { subject: form.subject, notes: form.notes || undefined });
      showMsg(success, `Penanganan/Log untuk Tiket ${form.code} tersimpan.`);
    } else {
      await api.post('/crm/tickets', {
        code: form.code, customerId: form.customerId,
        subject: form.subject, notes: form.notes || undefined,
      });
      showMsg(success, `Tiket layanan pelanggan diterbitkan!`);
    }
    dialogOpen.value = false;
    await load();
  } catch (e: any) { dialogError.value = e?.response?.data?.message ?? 'Gagal simpan data Service Ticket'; } 
  finally { saving.value = false; }
};

const updateTicket = async (t: Ticket) => {
  const oldS = t.status; const oldP = t.priority;
  try {
    await api.patch(`/crm/tickets/${t.id}`, { status: statusSelection[t.id], priority: prioritySelection[t.id] });
    showMsg(success, `Status/Prioritas layanan ${t.code} di-update.`);
    t.status = statusSelection[t.id]; t.priority = prioritySelection[t.id];
  } catch (e: any) {
    statusSelection[t.id] = oldS; prioritySelection[t.id] = oldP;
    showMsg(error, e?.response?.data?.message ?? 'Gagal update status & prioritas tiket');
  }
};

const assign = async (t: Ticket) => {
  const oldVal = t.assignedTo?.id ?? '';
  try {
    await api.patch(`/crm/tickets/${t.id}/assign`, { userId: assigneeSelection[t.id] || undefined });
    showMsg(success, `Hak akses penanganan tiket dipindahkan!`);
  } catch (e: any) {
    assigneeSelection[t.id] = oldVal;
    showMsg(error, e?.response?.data?.message ?? 'Gagal meng-assign agen support');
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

.animate-scale-in { 
  animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
}

@keyframes scaleIn { 
  from { opacity: 0; transform: scale(0.95) translateY(10px); } 
  to { opacity: 1; transform: scale(1) translateY(0); } 
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

:deep(.p-inputtext) {
   border-color: #f1f5f9 !important;
   box-shadow: none !important;
   background-color: #f8fafc !important;
   border-radius: 16px !important;
}

:deep(.p-button-rounded) {
  border-radius: 9999px !important;
}
</style>
