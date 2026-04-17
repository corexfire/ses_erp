<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-6 shadow-sm border-l-4 border-l-amber-500 relative overflow-hidden">
      <div class="absolute right-[-20px] top-[-10px] opacity-[0.03] pointer-events-none">
        <i class="pi pi-calendar-clock text-[150px] text-amber-900"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-start gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-calendar text-amber-500"></i> Sales Activity Log
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
            Jadwalkan dan catat setiap interaksi dengan Klien (Meeting, Call, Email, Tugas).
          </div>
        </div>
        <div class="flex gap-2 shrink-0">
          <Button label="Buat Jadwal / Log" size="small" icon="pi pi-plus" class="bg-amber-500 text-white border-none font-bold shadow-sm hover:bg-amber-600" :disabled="loading || !canCreate" @click="openCreate" />
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
    <div class="grid grid-cols-2 lg:grid-cols-5 gap-4 items-start animate-fade-in-up">
      <div class="bg-slate-800 border-b-4 border-b-slate-900 rounded-xl p-4 shadow-sm text-white flex justify-between items-center">
        <div>
          <div class="text-[10px] font-black text-amber-300 uppercase tracking-widest">Total Sched.</div>
          <div class="text-3xl font-black mt-0.5">{{ activities.length }}</div>
        </div>
      </div>
      
      <div class="bg-purple-50 border border-purple-200 border-b-4 border-b-purple-500 rounded-xl p-4 shadow-sm flex items-center gap-3">
        <div class="bg-purple-100 p-2 rounded-lg"><i class="pi pi-users text-purple-600 text-xl"></i></div>
        <div>
           <div class="text-[10px] font-black text-purple-600 uppercase tracking-widest">Meeting</div>
           <div class="text-2xl font-black text-purple-800 mt-0.5">{{ countType('MEETING') }}</div>
        </div>
      </div>

      <div class="bg-sky-50 border border-sky-200 border-b-4 border-b-sky-500 rounded-xl p-4 shadow-sm flex items-center gap-3">
        <div class="bg-sky-100 p-2 rounded-lg"><i class="pi pi-phone text-sky-600 text-xl"></i></div>
        <div>
           <div class="text-[10px] font-black text-sky-600 uppercase tracking-widest">Phone Call</div>
           <div class="text-2xl font-black text-sky-800 mt-0.5">{{ countType('CALL') }}</div>
        </div>
      </div>

      <div class="bg-indigo-50 border border-indigo-200 border-b-4 border-b-indigo-500 rounded-xl p-4 shadow-sm flex items-center gap-3">
        <div class="bg-indigo-100 p-2 rounded-lg"><i class="pi pi-envelope text-indigo-600 text-xl"></i></div>
        <div>
           <div class="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Email Sent</div>
           <div class="text-2xl font-black text-indigo-800 mt-0.5">{{ countType('EMAIL') }}</div>
        </div>
      </div>

       <div class="bg-slate-50 border border-slate-200 border-b-4 border-b-slate-500 rounded-xl p-4 shadow-sm flex items-center gap-3">
        <div class="bg-slate-200 p-2 rounded-lg"><i class="pi pi-check-square text-slate-600 text-xl"></i></div>
        <div>
           <div class="text-[10px] font-black text-slate-600 uppercase tracking-widest">To-Do Task</div>
           <div class="text-2xl font-black text-slate-800 mt-0.5">{{ countType('TASK') }}</div>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="bg-white border rounded-xl p-4 shadow-sm flex flex-wrap gap-3 items-center animate-fade-in-up">
      <span class="p-input-icon-left w-72">
         <i class="pi pi-search" />
         <InputText v-model="q" placeholder="Cari subjek, notes, atau klien..." class="w-full text-sm h-10 bg-slate-50 border-slate-200" @keyup.enter="load" />
      </span>
      <Button severity="secondary" size="small" :loading="loading" icon="pi pi-refresh" @click="load" class="h-10 w-10 shrink-0 border-slate-200 bg-slate-50 hover:bg-slate-100" />
      
       <div class="ml-auto flex gap-1 bg-slate-100 rounded-lg p-1">
        <button v-for="s in ['ACTIVE','DONE','ALL']" :key="s"
          @click="statusFilter = s"
          :class="statusFilter === s ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'"
          class="px-4 py-1.5 rounded-md text-[11px] font-black uppercase tracking-widest transition">
          {{ s }}
        </button>
      </div>
    </div>

    <!-- TABLE -->
    <div class="rounded-xl border bg-white shadow-sm overflow-hidden animate-fade-in-up">
      <table class="w-full text-sm">
        <thead class="bg-slate-50 text-left text-[10px] text-slate-500 uppercase tracking-widest font-black">
          <tr>
            <th class="px-5 py-3 border-b border-b-slate-200 w-24 text-center">Tipe</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200">Subjek Aktivitas & Jadwal (Due)</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200 w-56">Klien Terkait (Related)</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200 w-44">PIC / Agen</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200 text-center w-36">Status Log</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-if="loading">
            <td colspan="5" class="py-16 text-center text-slate-400"><i class="pi pi-spinner pi-spin mr-2 text-amber-500 shadow-sm"></i> Memuat agenda...</td>
          </tr>
          
          <tr v-for="a in filteredList" v-else :key="a.id" class="transition hover:bg-slate-50 group" :class="{ 'opacity-60 bg-slate-50': a.status === 'DONE' || a.status === 'CANCELED' }">
            <td class="px-5 py-4 align-top text-center border-l-4" :style="{ borderLeftColor: typeStyle(a.type).border }">
               <div class="w-10 h-10 rounded-xl flex items-center justify-center text-xl mx-auto mb-1.5"
                 :style="{ backgroundColor: typeStyle(a.type).bg, color: typeStyle(a.type).color }">
                 <i class="pi" :class="typeStyle(a.type).icon"></i>
               </div>
               <div class="text-[9px] font-black uppercase tracking-widest" :style="{ color: typeStyle(a.type).color }">{{ a.type }}</div>
            </td>
            
            <td class="px-4 py-4 align-top border-l relative">
              <div class="font-bold text-slate-800 text-sm leading-tight max-w-sm mb-2" :class="{'line-through text-slate-500': a.status === 'CANCELED'}">
                {{ a.subject }}
              </div>
              <div class="text-[10px] font-bold mt-1 max-w-xs truncate text-slate-500" v-if="a.notes"><i class="pi pi-bars text-[8px]"></i> {{ a.notes }}</div>
              
              <div class="mt-2 text-[11px] font-black uppercase flex items-center gap-1"
                 :class="(isPast(a.dueAt) && a.status === 'OPEN') ? 'text-red-500 animate-pulse' : 'text-slate-400'">
                 <i class="pi pi-clock text-[10px]"></i> 
                 {{ a.dueAt ? formatTime(a.dueAt) : 'No Schedule' }}
                 <span v-if="(isPast(a.dueAt) && a.status === 'OPEN')" class="ml-1 bg-red-100 text-red-700 px-1.5 py-0.5 rounded text-[8px]">OVERDUE</span>
              </div>
              
              <div class="absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button icon="pi pi-pencil" v-tooltip="'Edit Log'" size="small" outlined class="h-8 w-8 text-[11px] px-0 bg-white" severity="secondary" @click="openEdit(a)" />
              </div>
            </td>

             <td class="px-4 py-4 align-top border-l">
                 <div v-if="a.opportunity" class="flex flex-col gap-0.5 cursor-pointer hover:bg-slate-100 p-1 rounded" @click="navigateTo(`/crm/opportunities/${a.opportunity.id}`)">
                    <div class="text-[9px] font-black uppercase text-emerald-600 tracking-widest">Opportunity / Deal</div>
                    <div class="text-xs font-bold text-slate-700 truncate">{{ a.opportunity.code }}</div>
                 </div>
                 <div v-else-if="a.customer" class="flex flex-col gap-0.5 cursor-pointer hover:bg-slate-100 p-1 rounded" @click="navigateTo(`/crm/customers/${a.customer.id}`)">
                    <div class="text-[9px] font-black uppercase text-blue-600 tracking-widest">Pelanggan Registrasi</div>
                    <div class="text-xs font-bold text-slate-700 truncate">{{ a.customer.code }}</div>
                 </div>
                 <div v-else-if="a.lead" class="flex flex-col gap-0.5 cursor-pointer hover:bg-slate-100 p-1 rounded">
                    <div class="text-[9px] font-black uppercase text-amber-600 tracking-widest">Masa Prospek (Lead)</div>
                    <div class="text-xs font-bold text-slate-700 truncate">{{ a.lead.code }}</div>
                 </div>
                 <div v-else class="text-[10px] text-slate-400 italic font-medium mt-1">Aktivitas Internal</div>
            </td>

            <td class="px-4 py-4 align-top border-l">
              <select v-model="assigneeSelection[a.id]"
                class="w-full h-8 rounded border border-slate-200 px-2 text-[11px] font-bold text-slate-700 focus:border-amber-500 outline-none"
                :disabled="!canAssign || !canReadUsers || a.status !== 'OPEN'"
                @change="assign(a)"
                :class="assigneeSelection[a.id] ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-slate-50'">
                <option value="">- Tentukan Agen -</option>
                <option v-for="u in users" :key="u.id" :value="u.id">{{ u.name ?? u.email }}</option>
              </select>
            </td>

            <td class="px-4 py-4 align-top border-l text-center">
              <div v-if="a.status === 'DONE'" class="bg-emerald-50 border border-emerald-200 text-emerald-600 px-3 py-1.5 rounded text-[10px] font-black uppercase tracking-widest shadow-inner inline-flex items-center">
                 <i class="pi pi-check text-[9px] mr-1.5"></i> SELESAI
              </div>
              <div v-else-if="a.status === 'CANCELED'" class="bg-slate-100 border border-slate-300 text-slate-500 px-3 py-1.5 rounded text-[10px] font-black uppercase tracking-widest shadow-inner inline-flex items-center">
                 <i class="pi pi-times text-[9px] mr-1.5"></i> BATAL
              </div>
              <div v-else>
                 <select v-model="statusSelection[a.id]"
                  class="w-full h-8 rounded border-2 border-slate-300 appearance-none text-center text-[10px] font-black uppercase tracking-widest outline-none bg-white text-slate-700 hover:border-amber-500 cursor-pointer"
                  :disabled="!canUpdate"
                  @change="updateStatus(a)">
                  <option value="OPEN">TUNDA / OPEN</option>
                  <option value="DONE">TANDAI SELESAI</option>
                  <option value="CANCELED">BATALKAN</option>
                </select>
              </div>
            </td>
          </tr>

          <tr v-if="!loading && filteredList.length === 0">
            <td colspan="5" class="py-16 text-center text-slate-400 italic text-sm">
               <i class="pi pi-calendar-times text-3xl mb-3 block text-slate-300"></i>
               Selamat! Tidak ada Antrean Jadwal yang terbuka saat ini.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Form Drawer -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm" @click.self="closeDialog">
      <div class="w-full max-w-md h-full bg-white shadow-2xl flex flex-col overflow-y-auto animate-slide-in-right">
        <div class="p-5 border-b bg-slate-50 flex justify-between rounded-t-xl" style="borderTop: 4px solid #f59e0b;">
          <div class="text-lg font-black text-slate-800 flex items-center gap-2">
            <i class="pi pi-pencil text-amber-600" v-if="editingId"></i>
             <i class="pi pi-plus text-amber-600" v-else></i>
            {{ editingId ? 'Update Detail Log' : 'Pencatatan Aktivitas Baru' }}
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-200 w-8 h-8 rounded-full font-bold" @click="closeDialog">✕</button>
        </div>
        
        <div class="p-6 space-y-5 flex-1">
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Jenis Log <span class="text-red-500">*</span></label>
            <div class="grid grid-cols-4 gap-2">
              <button v-for="t in ['CALL','EMAIL','MEETING','TASK']" :key="t"
                @click="form.type = t as any"
                :class="form.type === t ? 'bg-amber-100 text-amber-800 border-amber-300 shadow-inner' : 'bg-white border-slate-200 text-slate-500'"
                class="border rounded-lg py-2 flex flex-col items-center justify-center gap-1 transition">
                 <i class="pi" :class="typeStyle(t as any).icon"></i>
                 <span class="text-[9px] font-black uppercase">{{ t }}</span>
              </button>
            </div>
          </div>
          
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Pokok Pembahasan (Subjek) <span class="text-red-500">*</span></label>
            <input type="text" v-model="form.subject" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-amber-500 shadow-inner" placeholder="Meeting penawaran produk..." :disabled="editingId ? !canUpdate : !canCreate" />
          </div>

          <div class="space-y-1.5">
             <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Waktu / Due Date</label>
             <input type="date" v-model="form.dueDate" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-700 outline-none focus:border-amber-500 bg-slate-50" :disabled="editingId ? !canUpdate : !canCreate" />
          </div>

          <div class="space-y-3 pt-3 border-t border-dashed">
             <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Ikat Dengan Entitas Berikut (Opsional)</div>
             <div class="space-y-1.5">
               <label class="text-[11px] font-bold text-blue-500 flex items-center gap-1"><i class="pi pi-building"></i> Customer</label>
               <select v-model="form.customerId" class="w-full border py-2 px-2 text-xs font-bold rounded-lg bg-blue-50/50" :disabled="editingId ? !canUpdate : !canCreate">
                 <option value="">-- Kosongkan --</option>
                 <option v-for="c in customers" :key="c.id" :value="c.id">{{ c.code }} - {{ c.name }}</option>
               </select>
             </div>
             <div class="space-y-1.5">
               <label class="text-[11px] font-bold text-emerald-600 flex items-center gap-1"><i class="pi pi-money-bill"></i> Opportunity</label>
               <select v-model="form.opportunityId" class="w-full border py-2 px-2 text-xs font-bold rounded-lg bg-emerald-50/50" :disabled="editingId ? !canUpdate : !canCreate">
                 <option value="">-- Kosongkan --</option>
                 <option v-for="o in opportunities" :key="o.id" :value="o.id">{{ o.code }} - {{ o.name }}</option>
               </select>
             </div>
             <div class="space-y-1.5">
               <label class="text-[11px] font-bold text-rose-500 flex items-center gap-1"><i class="pi pi-users"></i> Sales Lead</label>
               <select v-model="form.leadId" class="w-full border py-2 px-2 text-xs font-bold rounded-lg bg-rose-50/50" :disabled="editingId ? !canUpdate : !canCreate">
                 <option value="">-- Kosongkan --</option>
                 <option v-for="l in leads" :key="l.id" :value="l.id">{{ l.code }} - {{ l.name }}</option>
               </select>
             </div>
          </div>

          <div class="space-y-1.5 pt-3 border-t border-dashed">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Catatan (Notes)</label>
            <textarea v-model="form.notes" rows="3" class="w-full border rounded-lg px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-amber-500 shadow-inner resize-none"></textarea>
          </div>

          <div v-if="dialogError" class="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 border border-red-200 font-bold border-l-4 border-l-red-500">{{ dialogError }}</div>
        </div>

        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-xl">
          <Button label="Batal" severity="secondary" :disabled="saving" @click="closeDialog" class="bg-white border text-slate-700 font-bold px-5" />
          <Button :label="editingId ? 'Simpan Update' : 'Buat Log'" :loading="saving" :disabled="!form.subject"
            @click="save" class="bg-amber-500 hover:bg-amber-600 border-none text-white font-bold px-6" icon="pi pi-check" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

type Activity = {
  id: string; type: 'CALL' | 'EMAIL' | 'MEETING' | 'TASK';
  subject: string; status: 'OPEN' | 'DONE' | 'CANCELED';
  notes?: string | null; dueAt?: string | null;
  lead?: { id: string; code: string; name: string } | null;
  customer?: { id: string; code: string; name: string } | null;
  opportunity?: { id: string; code: string; name: string } | null;
  assignedTo?: { id: string; email: string; name: string | null } | null;
};
type SimpleObj = { id: string; code: string; name: string };
type CrmUser = { id: string; email: string; name: string | null };

const api = useApi();
const auth = useAuthStore();

const canRead = computed(() => auth.hasPermission('crm.activity.read'));
const canCreate = computed(() => auth.hasPermission('crm.activity.create'));
const canUpdate = computed(() => auth.hasPermission('crm.activity.update'));
const canAssign = computed(() => auth.hasPermission('crm.activity.assign'));
const canReadUsers = computed(() => auth.hasPermission('crm.user.read'));

const q = ref('');
const statusFilter = ref('ACTIVE');
const loading = ref(false);
const error = ref<string | null>(null);
const success = ref<string | null>(null);

const activities = ref<Activity[]>([]);

const filteredList = computed(() => {
  let res = activities.value;
  if (statusFilter.value === 'ACTIVE') res = res.filter(a => a.status === 'OPEN');
  if (statusFilter.value === 'DONE') res = res.filter(a => a.status === 'DONE');
  
  if (q.value) {
    const s = q.value.toLowerCase();
    res = res.filter(a => a.subject.toLowerCase().includes(s) || (a.notes||'').toLowerCase().includes(s) || 
                          (a.customer?.code||'').toLowerCase().includes(s) || (a.opportunity?.code||'').toLowerCase().includes(s));
  }
  return res;
});

const countType = (t: string) => activities.value.filter(a => a.type === t).length;

const typeStyle = (t: "CALL"|"EMAIL"|"MEETING"|"TASK") => {
  if (t === 'CALL') return { bg: '#e0f2fe', color: '#0284c7', icon: 'pi-phone', border: '#38bdf8' };
  if (t === 'EMAIL') return { bg: '#e0e7ff', color: '#4f46e5', icon: 'pi-envelope', border: '#818cf8' };
  if (t === 'MEETING') return { bg: '#f3e8ff', color: '#9333ea', icon: 'pi-users', border: '#c084fc' };
  return { bg: '#f1f5f9', color: '#475569', icon: 'pi-check-square', border: '#94a3b8' }; // TASK
};

const statusSelection = reactive<Record<string, Activity['status']>>({});
const assigneeSelection = reactive<Record<string, string>>({});

const leads = ref<SimpleObj[]>([]);
const customers = ref<SimpleObj[]>([]);
const opportunities = ref<SimpleObj[]>([]);
const users = ref<CrmUser[]>([]);

const dialogOpen = ref(false);
const saving = ref(false);
const dialogError = ref<string | null>(null);
const editingId = ref<string | null>(null);

const form = reactive({ type: 'CALL' as Activity['type'], dueDate: '', leadId: '', customerId: '', opportunityId: '', subject: '', notes: '' });

const pad = (n: number) => String(n).padStart(2, '0');
const formatTime = (iso: string) => {
  const d = new Date(iso);
  const m = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  return `${pad(d.getDate())} ${m[d.getMonth()]} ${d.getFullYear()} - ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const isPast = (iso?: string | null) => iso ? new Date(iso) < new Date() : false;

const showMsg = (refVar: any, msg: string) => { refVar.value = msg; setTimeout(()=> { refVar.value = null; }, 3000); };

const load = async () => {
  loading.value = true; error.value = null; success.value = null;
  try {
    if (!canRead.value) { activities.value = []; return; }
    
    // Attempt parallel load, failing gracefully for lookups if no permission
    const tasks: Promise<any>[] = [api.get('/crm/activities')];
    if (leads.value.length === 0) tasks.push(auth.hasPermission('crm.lead.read') ? api.get('/crm/leads') : Promise.resolve({leads:[]}));
    if (customers.value.length === 0) tasks.push(auth.hasPermission('crm.customer.read') ? api.get('/crm/customers') : Promise.resolve({customers:[]}));
    if (opportunities.value.length === 0) tasks.push(auth.hasPermission('crm.opportunity.read') ? api.get('/crm/opportunities') : Promise.resolve({opportunities:[]}));
    if (users.value.length === 0) tasks.push(auth.hasPermission('crm.user.read') ? api.get('/crm/users') : Promise.resolve({users:[]}));
    
    const [aRes, lRes, cRes, oRes, uRes] = await Promise.all(tasks);
    
    activities.value = aRes.data?.activities ?? aRes.activities ?? [];
    if (lRes) leads.value = lRes.data?.leads ?? lRes.leads ?? [];
    if (cRes) customers.value = cRes.data?.customers ?? cRes.customers ?? [];
    if (oRes) opportunities.value = oRes.data?.opportunities ?? oRes.opportunities ?? [];
    if (uRes) users.value = uRes.data?.users ?? uRes.users ?? [];

    for (const a of activities.value) {
      statusSelection[a.id] = a.status;
      assigneeSelection[a.id] = a.assignedTo?.id ?? '';
    }
  } catch (e: any) { error.value = e?.response?.data?.message ?? 'Gagal load master activity'; } 
  finally { loading.value = false; }
};

const openCreate = () => {
  editingId.value = null;
  form.type = 'CALL'; form.subject = ''; form.notes = '';
  form.dueDate = new Date().toISOString().slice(0, 10);
  form.leadId = ''; form.customerId = ''; form.opportunityId = '';
  dialogError.value = null; dialogOpen.value = true;
};

const openEdit = (a: Activity) => {
  editingId.value = a.id;
  form.type = a.type; form.subject = a.subject; form.notes = a.notes ?? '';
  form.dueDate = a.dueAt ? new Date(a.dueAt).toISOString().slice(0, 10) : '';
  form.leadId = a.lead?.id ?? ''; form.customerId = a.customer?.id ?? ''; form.opportunityId = a.opportunity?.id ?? '';
  dialogError.value = null; dialogOpen.value = true;
};

const closeDialog = () => { if (!saving.value) dialogOpen.value = false; };

const save = async () => {
  saving.value = true; dialogError.value = null;
  try {
    const payload = {
      type: form.type, subject: form.subject,
      dueAt: form.dueDate ? new Date(form.dueDate).toISOString() : undefined,
      leadId: form.leadId || undefined, customerId: form.customerId || undefined,
      opportunityId: form.opportunityId || undefined, notes: form.notes || undefined,
    };
    if (editingId.value) {
      await api.patch(`/crm/activities/${editingId.value}`, payload);
      showMsg(success, `Log ${form.subject} berhasil diperbarui.`);
    } else {
      await api.post('/crm/activities', payload);
      showMsg(success, `Berhasil mencatat aktivitas baru!`);
    }
    dialogOpen.value = false;
    await load();
  } catch (e: any) { dialogError.value = e?.response?.data?.message ?? 'Gagal simpan aktivitas'; } 
  finally { saving.value = false; }
};

const updateStatus = async (a: Activity) => {
  const oldVal = a.status;
  try {
    await api.patch(`/crm/activities/${a.id}`, { status: statusSelection[a.id] });
    showMsg(success, `Status Log selesai diubah jadi ${statusSelection[a.id]}.`);
    a.status = statusSelection[a.id];
  } catch (e: any) {
    statusSelection[a.id] = oldVal;
    showMsg(error, e?.response?.data?.message ?? 'Gagal update status penyelesaian');
  }
};

const assign = async (a: Activity) => {
  const oldVal = a.assignedTo?.id ?? '';
  try {
    await api.patch(`/crm/activities/${a.id}/assign`, { userId: assigneeSelection[a.id] || undefined });
    showMsg(success, 'Tugas ini berhasil dialihkan.');
  } catch (e: any) {
    assigneeSelection[a.id] = oldVal;
    showMsg(error, e?.response?.data?.message ?? 'Gagal memindahkan agen');
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
