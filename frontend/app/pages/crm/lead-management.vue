<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-6 shadow-sm border-l-4 border-l-blue-500 relative overflow-hidden">
      <div class="absolute right-[-12px] top-[-12px] opacity-5 pointer-events-none">
        <i class="pi pi-filter text-[150px] text-blue-900"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-start gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-users text-blue-600"></i> Lead Management
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
            Kelola prospek dari masuk (NEW) sampai ter-kualifikasi (QUALIFIED) dan akhirnya dikonversi (WON) menjadi Pelanggan Resmi.
          </div>
        </div>
        <div class="flex gap-2 shrink-0">
          <Button label="Buat Lead Baru" size="small" icon="pi pi-plus" class="bg-blue-600 text-white border-none font-bold shadow-sm hover:bg-blue-700" :disabled="loading || !canCreate" @click="openCreate" />
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

    <!-- Stats & Filters -->
    <div class="grid grid-cols-2 md:grid-cols-5 gap-4 items-start animate-fade-in-up">
      <div class="bg-white border rounded-xl p-4 shadow-sm flex items-center justify-between border-b-4 border-b-slate-800">
        <div>
          <div class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Active Leads</div>
          <div class="text-3xl font-black text-slate-800 mt-0.5">{{ leads.filter(l => l.status !== 'WON' && l.status !== 'LOST').length }}</div>
        </div>
      </div>
      
      <div class="bg-sky-50 border border-sky-200 border-b-4 border-b-sky-500 rounded-xl p-4 shadow-sm relative overflow-hidden">
        <i class="pi pi-user-plus absolute right-[-10px] bottom-[-10px] text-6xl opacity-10 text-sky-800"></i>
        <div class="text-3xl font-black text-sky-800">{{ countStatus('NEW') }}</div>
        <div class="text-[10px] font-black text-sky-600 mt-0.5 uppercase tracking-widest">New / Baru</div>
      </div>
      
      <div class="bg-amber-50 border border-amber-200 border-b-4 border-b-amber-500 rounded-xl p-4 shadow-sm relative overflow-hidden">
        <i class="pi pi-phone absolute right-[-10px] bottom-[-10px] text-6xl opacity-10 text-amber-800"></i>
        <div class="text-3xl font-black text-amber-700">{{ countStatus('CONTACTED') }}</div>
        <div class="text-[10px] font-black text-amber-600 mt-0.5 uppercase tracking-widest">Contacted</div>
      </div>
      
      <div class="bg-emerald-50 border border-emerald-200 border-b-4 border-b-emerald-500 rounded-xl p-4 shadow-sm relative overflow-hidden">
        <i class="pi pi-star-fill absolute right-[-10px] bottom-[-10px] text-6xl opacity-10 text-emerald-800"></i>
        <div class="text-3xl font-black text-emerald-700">{{ countStatus('QUALIFIED') }}</div>
        <div class="text-[10px] font-black text-emerald-600 mt-0.5 uppercase tracking-widest">Qualified</div>
      </div>
      
      <div class="bg-purple-50 border border-purple-200 border-b-4 border-b-purple-500 rounded-xl p-4 shadow-sm relative overflow-hidden">
        <i class="pi pi-trophy absolute right-[-10px] bottom-[-10px] text-6xl opacity-10 text-purple-800"></i>
        <div class="text-3xl font-black text-purple-700">{{ countStatus('WON') }}</div>
        <div class="text-[10px] font-black text-purple-600 mt-0.5 uppercase tracking-widest">Converted (Won)</div>
      </div>
    </div>

    <!-- Controls -->
    <div class="bg-white border rounded-xl p-4 shadow-sm flex flex-wrap gap-3 items-center animate-fade-in-up">
      <div class="flex gap-1 bg-slate-100 rounded-lg p-1">
        <button v-for="s in ['SEMUA','NEW','CONTACTED','QUALIFIED','WON','LOST']" :key="s"
          @click="statusFilter = s === 'SEMUA' ? '' : s"
          :class="(statusFilter || 'SEMUA') === s ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'"
          class="px-3 py-1.5 rounded-md text-[11px] font-black uppercase tracking-widest transition">
          {{ s }}
        </button>
      </div>
      <div class="w-px h-6 bg-slate-200 mx-1"></div>
      <span class="p-input-icon-left w-64 ml-auto">
         <i class="pi pi-search" />
         <InputText v-model="q" placeholder="Cari nama, kode, email..." class="w-full text-sm h-10" @keyup.enter="load" />
      </span>
      <Button severity="secondary" size="small" :loading="loading" icon="pi pi-refresh" @click="load" class="h-10 w-10 shrink-0" />
    </div>

    <!-- === TABLE VIEW === -->
    <div class="rounded-xl border bg-white shadow-sm overflow-hidden animate-fade-in-up">
      <table class="w-full text-sm">
        <thead class="bg-slate-50 text-left text-[11px] text-slate-500 uppercase tracking-widest font-black">
          <tr>
            <th class="px-5 py-3 border-b border-b-slate-200 w-32">Kode Lead</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200">Profil Lead</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200">Kontak Info</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200 w-44">Tugaskan Ke (Assign)</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200 w-40 text-center">Stage Status</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200 text-center w-32">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-if="loading">
            <td colspan="6" class="py-16 text-center text-slate-400"><i class="pi pi-spinner pi-spin mr-2 text-blue-600"></i> Memuat data Lead...</td>
          </tr>
          
          <tr v-for="l in filteredLeads" v-else :key="l.id" class="transition hover:bg-blue-50/20 group">
            <td class="px-5 py-3 align-middle border-l-4" :style="{ borderLeftColor: statusColor(l.status) }">
              <span class="font-mono text-[11px] font-black text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded cursor-pointer hover:bg-slate-200" @click="openEdit(l)" v-tooltip="'Klik untuk Edit'">
                {{ l.code }}
              </span>
              <div class="mt-1 text-[9px] font-bold text-slate-400 uppercase tracking-widest">{{ formatDateSafe(l.createdAt) }}</div>
            </td>
            
            <td class="px-4 py-3 align-middle border-l">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full flex items-center justify-center font-black text-[10px] text-white shrink-0 shadow-sm"
                  :style="{ backgroundColor: avatarColor(l.name ?? 'A') }">
                  {{ initials(l.name) }}
                </div>
                <div class="min-w-0">
                  <div class="font-bold text-slate-800 text-sm truncate w-48">{{ l.name }}</div>
                  <div class="text-[9px] font-black uppercase text-blue-500 tracking-widest mt-0.5 truncate">{{ l.source || 'Direct / Unknown' }}</div>
                </div>
              </div>
            </td>
            
            <td class="px-4 py-3 align-middle border-l">
              <div class="text-[11px] font-bold text-slate-600 truncate max-w-[150px]"><i class="pi pi-envelope text-slate-400 mr-1 text-[10px]"></i> {{ l.email ?? 'Tidak ada email' }}</div>
              <div class="text-[11px] font-bold text-slate-600 mt-1 truncate"><i class="pi pi-phone text-slate-400 mr-1 text-[10px]"></i> {{ l.phone ?? 'Tidak ada telepon' }}</div>
            </td>
            
            <td class="px-4 py-3 align-middle border-l">
              <select v-model="assigneeSelection[l.id]"
                class="w-full h-8 rounded border border-slate-200 px-2 text-[11px] font-bold text-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                :disabled="!canAssign || !canReadUsers || converting === l.id"
                @change="assign(l)"
                :class="assigneeSelection[l.id] ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-slate-50'">
                <option value="">-- Unassigned --</option>
                <option v-for="u in users" :key="u.id" :value="u.id">{{ u.name ?? u.email }}</option>
              </select>
            </td>

            <td class="px-4 py-3 align-middle border-l text-center">
              <select v-model="statusSelection[l.id]"
                class="w-full h-8 rounded border appearance-none px-2 text-center text-[10px] font-black uppercase tracking-widest focus:ring-2 outline-none transition"
                :disabled="!canUpdate || l.status === 'WON' || converting === l.id"
                :style="{ backgroundColor: statusBg(statusSelection[l.id]), color: statusColor(statusSelection[l.id]), borderColor: statusColor(statusSelection[l.id]) + '44' }"
                @change="updateStatus(l)">
                <option value="NEW" class="bg-white text-slate-800">NEW</option>
                <option value="CONTACTED" class="bg-white text-slate-800">CONTACTED</option>
                <option value="QUALIFIED" class="bg-white text-slate-800">QUALIFIED</option>
                <option value="LOST" class="bg-white text-slate-800">LOST</option>
                <option value="WON" class="bg-white text-slate-800" disabled>WON</option>
              </select>
            </td>
            
            <td class="px-4 py-3 align-middle border-l text-center">
              <div v-if="l.status !== 'WON'" class="flex justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button icon="pi pi-pencil" v-tooltip="'Edit Lead'" size="small" outlined class="h-8 w-8 text-[11px] px-0" severity="secondary" @click="openEdit(l)" />
                <Button v-if="canConvert" label="Convert" icon="pi pi-bolt" size="small" 
                  class="h-8 text-[10px] font-black tracking-wider px-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-none" 
                  :loading="converting === l.id" @click="convert(l)" />
              </div>
              <div v-else>
                 <span class="text-[9px] font-black text-emerald-600 uppercase tracking-widest border border-emerald-200 bg-emerald-50 px-2 py-0.5 rounded-full"><i class="pi pi-check text-[8px] mr-0.5"></i> Converted</span>
              </div>
            </td>
          </tr>

          <tr v-if="!loading && filteredLeads.length === 0">
            <td colspan="6" class="py-12 text-center text-slate-400 italic">Tidak ada leads yang sesuai filter.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Form Drawer -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm" @click.self="closeDialog">
      <div class="w-full max-w-md h-full bg-white shadow-2xl flex flex-col overflow-y-auto animate-slide-in-right">
        <div class="p-5 border-b bg-slate-50 flex justify-between rounded-t-xl" style="borderTop: 4px solid #3b82f6;">
          <div class="text-lg font-black text-slate-800 flex items-center gap-2">
            <i class="pi pi-user-edit text-blue-600" v-if="editingId"></i>
            <i class="pi pi-user-plus text-emerald-600" v-else></i>
            {{ editingId ? 'Update Informasi Lead' : 'Tambah Lead Baru' }}
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-200 w-8 h-8 rounded-full font-bold" @click="closeDialog">✕</button>
        </div>
        
        <div class="p-6 space-y-5 flex-1">
          <div class="space-y-1.5" v-if="editingId">
            <label class="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Kode Lead (Readonly)</label>
            <input type="text" v-model="form.code" class="w-full border rounded-lg px-3 py-2 text-sm font-bold bg-slate-50 text-slate-500 outline-none" disabled />
          </div>
          <div class="space-y-1.5" v-else>
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Kode Lead <span class="text-red-500">*</span></label>
            <input type="text" v-model="form.code" class="w-full border rounded-lg px-3 py-2 text-sm font-black font-mono text-blue-700 outline-none focus:border-blue-500 shadow-inner" placeholder="Otomatis digenerate jika kosong" />
          </div>
          
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Nama Lengkap / Instansi <span class="text-red-500">*</span></label>
            <input type="text" v-model="form.name" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 shadow-inner" placeholder="PT Contoh Abadi / Bpk Budi" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Email</label>
              <input type="email" v-model="form.email" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 shadow-inner" placeholder="mail@example.com" />
            </div>
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">No. Handphone / WA</label>
              <input type="text" v-model="form.phone" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 shadow-inner" placeholder="08123456789" />
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Sumber (Source)</label>
            <input type="text" v-model="form.source" class="w-full border rounded-lg px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 shadow-inner" placeholder="Website / Brosur / Referral" />
          </div>

          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Catatan Internal / Kebutuhan</label>
            <textarea v-model="form.notes" rows="4" class="w-full border rounded-lg px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 shadow-inner resize-none" placeholder="Target butuh suplai bulanan 10L..."></textarea>
          </div>

          <div v-if="dialogError" class="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 border border-red-200 font-bold border-l-4 border-l-red-500">{{ dialogError }}</div>
        </div>

        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-xl">
          <Button label="Batal" severity="secondary" :disabled="saving" @click="closeDialog" class="bg-white border text-slate-700 font-bold px-5" />
          <Button :label="editingId ? 'Simpan Perubahan' : 'Buat Lead'" :loading="saving" :disabled="!form.name"
            @click="save" class="bg-blue-600 border-none text-white font-bold px-6" icon="pi pi-check" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

type Lead = {
  id: string; code: string; name: string; email?: string | null; phone?: string | null;
  source?: string | null; notes?: string | null;
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'LOST' | 'WON';
  assignedTo?: { id: string; email: string; name: string | null } | null;
  createdAt?: string;
};
type CrmUser = { id: string; email: string; name: string | null };

const api = useApi();
const auth = useAuthStore();

const canRead = computed(() => auth.hasPermission('crm.lead.read'));
const canCreate = computed(() => auth.hasPermission('crm.lead.create'));
const canUpdate = computed(() => auth.hasPermission('crm.lead.update'));
const canConvert = computed(() => auth.hasPermission('crm.lead.convert'));
const canAssign = computed(() => auth.hasPermission('crm.lead.assign'));
const canReadUsers = computed(() => auth.hasPermission('crm.user.read'));

const q = ref('');
const statusFilter = ref('');
const loading = ref(false);
const converting = ref<string | null>(null);
const error = ref<string | null>(null);
const success = ref<string | null>(null);

const leads = ref<Lead[]>([]);
const filteredLeads = computed(() => {
  let res = leads.value;
  if (statusFilter.value) res = res.filter(l => l.status === statusFilter.value);
  if (q.value) {
    const s = q.value.toLowerCase();
    res = res.filter(l => l.name.toLowerCase().includes(s) || l.code.toLowerCase().includes(s) || (l.email && l.email.toLowerCase().includes(s)));
  }
  return res;
});

const statusSelection = reactive<Record<string, Lead['status']>>({});
const assigneeSelection = reactive<Record<string, string>>({});
const users = ref<CrmUser[]>([]);

const dialogOpen = ref(false);
const saving = ref(false);
const dialogError = ref<string | null>(null);
const editingId = ref<string | null>(null);

const form = reactive({ code: '', name: '', email: '', phone: '', source: '', notes: '' });

// AVATAR & TYPOGRAPHY LOGIC
const AVATAR_COLORS = ['#3b82f6','#8b5cf6','#ec4899','#f97316','#10b981','#06b6d4','#f59e0b'];
const avatarColor = (n: string) => AVATAR_COLORS[(n?.charCodeAt(0) ?? 0) % AVATAR_COLORS.length];
const initials = (n?: string) => {
  if (!n) return 'U';
  const p = n.trim().split(' ');
  return p.length > 1 ? (p[0][0] + p[1][0]).toUpperCase() : p[0].substring(0, 2).toUpperCase();
};
const formatDateSafe = (iso?: string) => {
  if (!iso) return '-';
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear().toString().slice(2)}`;
};

const statusColor = (st: string) => {
  if (st === 'NEW') return '#0ea5e9'; // sky
  if (st === 'CONTACTED') return '#f59e0b'; // amber
  if (st === 'QUALIFIED') return '#10b981'; // emerald
  if (st === 'WON') return '#8b5cf6'; // purple
  return '#ef4444'; // rose (LOST)
};
const statusBg = (st: string) => {
  if (st === 'NEW') return '#e0f2fe';
  if (st === 'CONTACTED') return '#fef3c7';
  if (st === 'QUALIFIED') return '#d1fae5';
  if (st === 'WON') return '#ede9fe';
  return '#fecdd3';
};

const countStatus = (st: string) => leads.value.filter(l => l.status === st).length;

const showSuccess = (msg: string) => {
  success.value = msg; error.value = null;
  setTimeout(() => { success.value = null; }, 3000);
};
const showError = (msg: string) => {
  error.value = msg; success.value = null;
  setTimeout(() => { error.value = null; }, 4000);
};

const load = async () => {
  loading.value = true;
  error.value = null; success.value = null;
  try {
    if (!canRead.value) { leads.value = []; return; }
    
    // We already do frontend filtering if we get all, but let's pass q if API expects it
    const reqs: Promise<any>[] = [api.get('/crm/leads')];
    if (canReadUsers.value && users.value.length === 0) reqs.push(api.get('/crm/users'));
    
    const [lRes, uRes] = await Promise.all(reqs);
    leads.value = lRes.data?.leads ?? lRes.leads ?? [];
    if (uRes) users.value = uRes.data?.users ?? uRes.users ?? [];
    
    for (const l of leads.value) {
      statusSelection[l.id] = l.status;
      assigneeSelection[l.id] = l.assignedTo?.id ?? '';
    }
  } catch (e: any) { showError(e?.response?.data?.message ?? 'Gagal load leads'); }
  finally { loading.value = false; }
};

const openCreate = () => {
  editingId.value = null;
  form.code = `LD-${Math.floor(Math.random() * 90000) + 10000}`; // auto gen default
  form.name = ''; form.email = ''; form.phone = ''; form.source = ''; form.notes = '';
  dialogError.value = null; dialogOpen.value = true;
};

const openEdit = (l: Lead) => {
  editingId.value = l.id;
  form.code = l.code; form.name = l.name;
  form.email = l.email ?? ''; form.phone = l.phone ?? '';
  form.source = l.source ?? ''; form.notes = l.notes ?? '';
  dialogError.value = null; dialogOpen.value = true;
};

const closeDialog = () => { if (!saving.value) dialogOpen.value = false; };

const save = async () => {
  saving.value = true; dialogError.value = null;
  try {
    const payload = {
      name: form.name, email: form.email || undefined, phone: form.phone || undefined,
      source: form.source || undefined, notes: form.notes || undefined,
    };
    
    if (editingId.value) {
      await api.patch(`/crm/leads/${editingId.value}`, payload);
      showSuccess(`Lead ${form.name} berhasil diperbarui.`);
    } else {
      await api.post('/crm/leads', { code: form.code, ...payload });
      showSuccess(`Lead ${form.name} berhasil ditambahkan!`);
    }
    dialogOpen.value = false;
    await load();
  } catch (e: any) { dialogError.value = e?.response?.data?.message ?? 'Gagal menyimpan Lead'; }
  finally { saving.value = false; }
};

const updateStatus = async (l: Lead) => {
  try {
    await api.patch(`/crm/leads/${l.id}`, { status: statusSelection[l.id] });
    showSuccess(`Status ${l.name} dirubah jadi ${statusSelection[l.id]}`);
    l.status = statusSelection[l.id]; // optimistic
    // update counts automatically via computed
  } catch (e: any) {
    statusSelection[l.id] = l.status; // rollback
    showError(e?.response?.data?.message ?? 'Gagal update status');
  }
};

const convert = async (l: Lead) => {
  converting.value = l.id;
  try {
    await api.post(`/crm/leads/${l.id}/convert`, {});
    showSuccess(`WOOHOO! Lead ${l.name} berhasil dikonversi jadi Customer (WON)!`);
    await load();
  } catch (e: any) { showError(e?.response?.data?.message ?? 'Gagal men-convert Lead'); }
  finally { converting.value = null; }
};

const assign = async (l: Lead) => {
  try {
    await api.patch(`/crm/leads/${l.id}/assign`, { userId: assigneeSelection[l.id] });
    showSuccess(`Agen penugasan berhasil dipindahkan.`);
  } catch (e: any) {
    assigneeSelection[l.id] = l.assignedTo?.id ?? '';
    showError(e?.response?.data?.message ?? 'Gagal assign user');
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
