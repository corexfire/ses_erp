<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-6 shadow-sm border-l-4 border-l-rose-500 relative overflow-hidden">
      <div class="absolute right-[-20px] top-[-10px] opacity-[0.03] pointer-events-none">
        <i class="pi pi-ticket text-[150px] text-rose-900"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-start gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-headphones text-rose-500"></i> Customer Service / Helpdesk
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
            Sistem tracking keluhan (Ticketing), layanan purna jual, dan SLA komplain pelanggan.
          </div>
        </div>
        <div class="flex gap-2 shrink-0">
          <Button label="Buka Tiket Baru" size="small" icon="pi pi-plus" class="bg-rose-600 text-white border-none font-bold shadow-sm hover:bg-rose-700" :disabled="loading || !canCreate" @click="openCreate" />
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
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 items-start animate-fade-in-up">
      <div class="bg-slate-800 border-b-4 border-b-slate-900 rounded-xl p-4 shadow-sm text-white flex justify-between items-center">
        <div>
          <div class="text-[10px] font-black text-rose-400 uppercase tracking-widest">Antrean Terbuka (Open)</div>
          <div class="text-3xl font-black mt-0.5 text-white">{{ countStatus('OPEN') }}</div>
        </div>
        <i class="pi pi-inbox text-3xl text-slate-600"></i>
      </div>
      
      <div class="bg-amber-50 border border-amber-200 border-b-4 border-b-amber-500 rounded-xl p-4 shadow-sm flex justify-between items-center">
        <div>
           <div class="text-[10px] font-black text-amber-600 uppercase tracking-widest">In Progress (Ditangani)</div>
           <div class="text-3xl font-black text-amber-800 mt-0.5">{{ countStatus('IN_PROGRESS') }}</div>
        </div>
        <i class="pi pi-spin pi-spinner text-3xl text-amber-200"></i>
      </div>

       <div class="bg-red-50 border border-red-200 border-b-4 border-b-red-600 rounded-xl p-4 shadow-sm flex justify-between items-center">
        <div>
           <div class="text-[10px] font-black text-red-600 uppercase tracking-widest">URGENT (Kritikal)</div>
           <div class="text-3xl font-black text-red-800 mt-0.5">{{ countPriority('URGENT') }}</div>
        </div>
        <i class="pi pi-exclamation-triangle text-3xl text-red-200"></i>
      </div>

      <div class="bg-emerald-50 border border-emerald-200 border-b-4 border-b-emerald-500 rounded-xl p-4 shadow-sm flex justify-between items-center">
        <div>
           <div class="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Resolved & Closed</div>
           <div class="text-3xl font-black text-emerald-800 mt-0.5">{{ countStatus('RESOLVED') + countStatus('CLOSED') }}</div>
        </div>
        <i class="pi pi-check-circle text-3xl text-emerald-200"></i>
      </div>
    </div>

    <!-- Controls -->
    <div class="bg-white border rounded-xl p-4 shadow-sm flex flex-wrap gap-3 items-center animate-fade-in-up">
      <span class="p-input-icon-left w-72">
         <i class="pi pi-search" />
         <InputText v-model="q" placeholder="Cari Kode Tiket, Klien, Keluhan..." class="w-full text-sm h-10 bg-slate-50 border-slate-200" @keyup.enter="load" />
      </span>
      <Button severity="secondary" size="small" :loading="loading" icon="pi pi-refresh" @click="load" class="h-10 w-10 shrink-0 border-slate-200 bg-slate-50 hover:bg-slate-100" />
      
       <div class="ml-auto flex gap-1 bg-slate-100 rounded-lg p-1">
        <button v-for="s in ['ACTIVE','HISTORY']" :key="s"
          @click="statusFilter = s"
          :class="statusFilter === s ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'"
          class="px-4 py-1.5 rounded-md text-[11px] font-black uppercase tracking-widest transition">
          {{ s === 'ACTIVE' ? 'Tugas Aktif' : 'Riwayat Selesai' }}
        </button>
      </div>
    </div>

    <!-- TABLE -->
    <div class="rounded-xl border bg-white shadow-sm overflow-hidden animate-fade-in-up">
      <table class="w-full text-sm">
        <thead class="bg-slate-50 text-left text-[10px] text-slate-500 uppercase tracking-widest font-black">
          <tr>
            <th class="px-5 py-3 border-b border-b-slate-200 w-32 hidden md:table-cell">Ticket ID</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200">Info Keluhan (Subject) & Klien</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200 text-center w-36">Tingkat Prioritas (SLA)</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200 w-44">Ditugaskan Kepada (PIC)</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200 text-center w-40">Status Resolusi</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200 text-center w-20">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-if="loading">
            <td colspan="6" class="py-16 text-center text-slate-400"><i class="pi pi-spinner pi-spin mr-2 text-rose-500 shadow-sm"></i> Mensinkronisasi helpdesk...</td>
          </tr>
          
          <tr v-for="t in filteredList" v-else :key="t.id" class="transition hover:bg-slate-50 group" :class="{ 'opacity-60 bg-slate-50': t.status === 'CLOSED' || t.status === 'RESOLVED' }">
            <td class="px-5 py-4 align-top hidden md:table-cell border-l-4" :style="{ borderLeftColor: priorityStyle(t.priority).color }">
               <div class="font-mono text-[10px] font-black text-rose-700 bg-rose-50 border border-rose-100 px-1.5 py-0.5 rounded cursor-pointer hover:bg-rose-100">
                {{ t.code }}
               </div>
               <div class="mt-2 text-[9px] font-bold text-slate-400 capitalize">Entry: {{ t.createdAt ? formatDate(t.createdAt) : 'N/A' }}</div>
            </td>
            
            <td class="px-4 py-4 align-top md:border-l">
              <div class="font-bold text-slate-800 text-sm leading-tight max-w-sm mb-1 line-clamp-2">
                {{ t.subject }}
              </div>
              <div class="text-[11px] font-medium text-slate-500 line-clamp-1 max-w-sm" v-if="t.notes"><i class="pi pi-align-left text-[9px]"></i> {{ t.notes }}</div>
              
              <div class="mt-2 text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-1 rounded w-max border border-blue-100 flex items-center gap-1 cursor-pointer hover:bg-blue-100" v-if="t.customer" @click="navigateTo(`/crm/customers/${t.customer.id}`)">
                 <i class="pi pi-building text-[9px]"></i> {{ t.customer.name || t.customer.code }}
              </div>
            </td>

             <td class="px-4 py-4 align-top border-l text-center">
               <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-[10px] font-black uppercase tracking-widest shadow-inner shadow-slate-100"
                 :style="{ backgroundColor: priorityStyle(t.priority).bg, color: priorityStyle(t.priority).color, borderColor: priorityStyle(t.priority).border }">
                  <i class="pi pi-circle-fill text-[6px]"></i> {{ t.priority }}
               </div>
               
               <!-- SLA Due display -->
               <div v-if="t.slaDueAt && t.status !== 'CLOSED' && t.status !== 'RESOLVED'" class="mt-2 text-[9px] font-black text-red-500 uppercase tracking-widest animate-pulse border border-red-200 bg-red-50 rounded px-1 py-0.5 inline-block">
                 SLA DUE: {{ t.slaDueAt }}
               </div>
            </td>

            <td class="px-4 py-4 align-top border-l">
              <select v-model="assigneeSelection[t.id]"
                class="w-full h-8 rounded border border-slate-200 px-2 text-[11px] font-bold text-slate-700 focus:border-rose-500 outline-none hover:bg-slate-50 transition"
                :disabled="!canAssign || !canReadUsers || t.status === 'CLOSED'"
                @change="assign(t)"
                 :class="assigneeSelection[t.id] ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-slate-50'">
                <option value="">-- Support Unassigned --</option>
                <option v-for="u in users" :key="u.id" :value="u.id">{{ u.name ?? u.email }}</option>
              </select>
            </td>

            <td class="px-4 py-4 align-top border-l text-center">
               <select v-model="statusSelection[t.id]"
                class="w-full h-8 rounded appearance-none text-center text-[10px] font-black uppercase tracking-widest outline-none transition cursor-pointer"
                :disabled="!canUpdate"
                :style="statusStyle(statusSelection[t.id])"
                @change="updateTicket(t)">
                <option value="OPEN" class="bg-white text-slate-800">BARU (OPEN)</option>
                <option value="IN_PROGRESS" class="bg-white text-slate-800">IN PROGRESS</option>
                <option value="RESOLVED" class="bg-white text-slate-800">RESOLVED</option>
                <option value="CLOSED" class="bg-white text-slate-800 font-black">TUTUP (CLOSED)</option>
              </select>
            </td>

             <td class="px-4 py-4 align-top border-l text-center">
              <div class="flex justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button icon="pi pi-pencil" v-tooltip="'Tangani Tiket'" size="small" outlined class="h-8 w-8 text-[11px] px-0 bg-white" severity="secondary" @click="openEdit(t)" />
              </div>
            </td>
          </tr>

          <tr v-if="!loading && filteredList.length === 0">
            <td colspan="6" class="py-16 text-center text-slate-400 italic text-sm">
               <i class="pi pi-check-circle text-3xl mb-3 block text-slate-300"></i>
               Tidak ada komplain/tiket yang terbuka. Sistem layanan pelanggan aman!
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Form Drawer -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm" @click.self="closeDialog">
      <div class="w-full max-w-md h-full bg-white shadow-2xl flex flex-col overflow-y-auto animate-slide-in-right">
        <div class="p-5 border-b bg-slate-50 flex justify-between rounded-t-xl" style="borderTop: 4px solid #e11d48;">
          <div class="text-lg font-black text-slate-800 flex items-center gap-2">
            <i class="pi pi-user-edit text-rose-600" v-if="editingId"></i>
             <i class="pi pi-plus-circle text-rose-600" v-else></i>
            {{ editingId ? 'Penanganan Tiket Support' : 'Catat Keluhan Baru' }}
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-200 w-8 h-8 rounded-full font-bold" @click="closeDialog">✕</button>
        </div>
        
        <div class="p-6 space-y-5 flex-1">
          <div class="space-y-1.5" v-if="editingId">
            <label class="text-[11px] font-bold text-slate-400 uppercase tracking-widest">ID Log Tiket (Readonly)</label>
            <input type="text" v-model="form.code" class="w-full border rounded-lg px-3 py-2 text-sm font-bold bg-slate-50 text-slate-500 outline-none" disabled />
          </div>
          <div class="space-y-1.5" v-else>
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Ticket Code (Auto) <span class="text-red-500">*</span></label>
            <input type="text" v-model="form.code" class="w-full border rounded-lg px-3 py-2 text-sm font-black font-mono text-rose-700 outline-none focus:border-rose-500 shadow-inner" placeholder="Seri TCK-XXXXX" />
          </div>

          <div class="space-y-1.5">
             <label class="text-[11px] font-bold text-blue-500 flex items-center gap-1 uppercase tracking-widest"><i class="pi pi-building"></i> Pihak Pelapor (Customer ID) <span class="text-red-500">*</span></label>
             <select v-model="form.customerId" class="w-full border rounded-lg py-2 px-3 text-sm font-bold bg-blue-50/50 outline-none focus:border-blue-500" :disabled="editingId ? !canUpdate : !canCreate">
               <option value="" disabled>-- Pilih Pelanggan --</option>
               <option v-for="c in customers" :key="c.id" :value="c.id">{{ c.code }} - {{ c.name }}</option>
             </select>
          </div>
          
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Inti Keluhan (Subject) <span class="text-red-500">*</span></label>
            <input type="text" v-model="form.subject" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-rose-500 shadow-inner" placeholder="Barang telat, kemasan rusak..." :disabled="editingId ? !canUpdate : !canCreate" />
          </div>

          <div class="space-y-1.5 pt-2 border-t border-dashed">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Detail Laporan Tim Support (Notes)</label>
            <textarea v-model="form.notes" rows="6" class="w-full border rounded-lg px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-rose-500 shadow-inner resize-none bg-slate-50" placeholder="Hasil investigasi, solusi kompensasi, dsb."></textarea>
          </div>

          <div v-if="dialogError" class="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 border border-red-200 font-bold border-l-4 border-l-red-500">{{ dialogError }}</div>
        </div>

        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-xl">
          <Button label="Batal" severity="secondary" :disabled="saving" @click="closeDialog" class="bg-white border text-slate-700 font-bold px-5" />
          <Button :label="editingId ? 'Simpan Log Tiket' : 'Open Ticket Baru'" :loading="saving" :disabled="!form.subject || !form.customerId"
            @click="save" class="bg-rose-600 border-none text-white font-bold px-6" icon="pi pi-check" />
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
.animate-fade-in-up { animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
.animate-slide-in-right { animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes slideInRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
</style>
