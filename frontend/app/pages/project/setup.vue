<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-4 shadow-sm border-l-4 border-l-blue-600 relative overflow-hidden">
      <div class="absolute right-[-15px] top-[-10px] opacity-[0.03] pointer-events-none">
        <i class="pi pi-building text-[150px] text-blue-900"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-start gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-building text-blue-600"></i> Project Setup & Management
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
            Kelola master data Proyek Konstruksi & Layanan, struktur WBS, durasi, dan anggaran dasar.
          </div>
        </div>
        <div class="flex gap-2 shrink-0">
          <Button v-if="canManage" label="Buat Project Baru" size="small" icon="pi pi-plus" class="bg-blue-600 text-white border-none font-bold shadow-sm hover:bg-blue-700" @click="openCreate" />
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

    <!-- Controls -->
    <div class="bg-white border rounded-xl p-4 shadow-sm flex flex-wrap gap-3 items-center animate-fade-in-up">
      <span class="p-input-icon-left w-72">
         <i class="pi pi-search" />
         <InputText v-model="q" placeholder="Cari kode atau nama proyek..." class="w-full text-sm h-10" @keyup.enter="load" :disabled="!canRead" />
      </span>
      <select v-model="statusFilter" class="h-10 rounded-lg border-slate-200 px-3 text-sm font-bold text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none w-40" @change="load">
        <option value="">Semua Status</option>
        <option value="DRAFT">Draft</option>
        <option value="SETUP">Setup</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="ON_HOLD">On Hold</option>
        <option value="COMPLETED">Completed</option>
      </select>
      <Button severity="secondary" size="small" :loading="loading" icon="pi pi-refresh" @click="load" class="h-10 w-10 shrink-0" :disabled="!canRead" />
    </div>

    <!-- TABLE -->
    <div class="rounded-xl border bg-white shadow-sm overflow-hidden animate-fade-in-up">
      <table class="w-full text-sm">
        <thead class="bg-slate-50 text-left text-[11px] text-slate-500 uppercase tracking-widest font-black">
          <tr>
            <th class="px-5 py-3 border-b border-b-slate-200 w-32">Data Proyek</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200">Customer Klien</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200 text-center w-36">Periode & Durasi</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200 text-right w-44">Total Budget (Rp)</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200 text-center w-36">Status</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200 text-center w-28">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-if="loading">
            <td colspan="6" class="py-16 text-center text-slate-400"><i class="pi pi-spinner pi-spin mr-2 text-blue-600 shadow-sm"></i> Memuat master project...</td>
          </tr>
          
          <tr v-for="p in projects" v-else :key="p.id" class="transition hover:bg-slate-50 group border-l-4" :style="{ borderLeftColor: statusColor(p.status) }">
            <td class="px-5 py-3 align-top">
               <span class="font-mono text-[11px] font-black text-blue-700 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded cursor-pointer hover:bg-blue-100" @click="openView(p)">
                {{ p.code }}
              </span>
              <div class="mt-1.5 font-bold text-slate-800 text-sm leading-tight line-clamp-2" :title="p.name">{{ p.name }}</div>
            </td>
            
            <td class="px-4 py-3 align-top border-l">
              <div v-if="p.customer" class="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <i class="pi pi-building text-slate-400"></i> {{ p.customer.name }}
              </div>
              <div v-else class="text-[10px] text-slate-400 italic font-medium">Bebas / Internal</div>
              <div v-if="p.contractId" class="mt-1 text-[9px] font-black uppercase text-amber-600 px-1.5 py-0.5 bg-amber-50 rounded border border-amber-100 inline-block">
                Terkait Kontrak
              </div>
            </td>

            <td class="px-4 py-3 align-top border-l text-center">
               <div class="text-[11px] font-black text-slate-600 uppercase tracking-widest space-y-1">
                 <div>{{ p.startDate ? formatDate(p.startDate) : 'TBD' }}</div>
                 <div class="text-slate-400"><i class="pi pi-arrow-down text-[8px]"></i></div>
                 <div>{{ p.endDate ? formatDate(p.endDate) : 'TBD' }}</div>
               </div>
            </td>

             <td class="px-4 py-3 align-top border-l text-right">
              <div class="font-black font-mono text-emerald-700">{{ fmtCurrency(p.totalBudget ?? 0) }}</div>
            </td>

            <td class="px-4 py-3 align-top border-l text-center">
              <span class="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border" :style="projectStatusStyle(p.status)">
                {{ p.status.replace('_', ' ') }}
              </span>
            </td>
            
            <td class="px-4 py-3 align-top border-l text-center">
              <div class="flex justify-center gap-1.5">
                <Button icon="pi pi-eye" v-tooltip="'Detail Proyek'" size="small" outlined class="h-8 w-8 text-[11px] px-0" severity="secondary" @click="openView(p)" />
                <Button v-if="canManage" icon="pi pi-pencil" v-tooltip="'Edit Project'" size="small" outlined class="h-8 w-8 text-[11px] px-0 text-blue-600 border-blue-200 hover:bg-blue-50" @click="openEdit(p)" />
              </div>
            </td>
          </tr>

          <tr v-if="!loading && projects.length === 0">
            <td colspan="6" class="py-12 text-center text-slate-400 italic text-sm font-medium">Tidak ada proyek ditemukan.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit/Create Drawer Modal -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm" @click.self="dialogOpen = false">
      <div class="w-full max-w-lg h-full bg-white shadow-2xl flex flex-col overflow-y-auto animate-slide-in-right">
        <div class="p-5 border-b bg-slate-50 flex justify-between rounded-t-xl" style="borderTop: 4px solid #2563eb;">
          <div class="text-lg font-black text-slate-800 flex items-center gap-2">
            <i class="pi pi-pencil text-blue-600" v-if="editingProject"></i>
            <i class="pi pi-plus text-blue-600" v-else></i>
            {{ editingProject ? 'Update Data Proyek' : 'Registrasi Proyek Baru' }}
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-200 w-8 h-8 rounded-full font-bold" @click="dialogOpen = false">✕</button>
        </div>
        
        <div class="p-4 space-y-5 flex-1">
          <div class="grid grid-cols-2 gap-4">
             <div class="space-y-1.5">
               <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Kode <span class="text-red-500">*</span></label>
               <input type="text" v-model="form.code" class="w-full border rounded-lg px-3 py-2 text-sm font-black font-mono text-blue-700 outline-none focus:border-blue-500 shadow-inner disabled:bg-slate-100 disabled:text-slate-400" placeholder="PRJ-..." :disabled="!!editingProject" />
             </div>
             <div class="space-y-1.5">
               <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Status Project</label>
               <select v-model="form.status" class="w-full border rounded-lg px-2 py-2 text-xs font-bold text-slate-700 outline-none focus:border-blue-500 bg-white">
                 <option value="DRAFT">DRAFT</option>
                 <option value="SETUP">SETUP</option>
                 <option value="IN_PROGRESS">IN PROGRESS</option>
                 <option value="ON_HOLD">ON HOLD</option>
                 <option value="COMPLETED">COMPLETED</option>
                 <option value="CLOSED">CLOSED</option>
               </select>
             </div>
          </div>
          
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Nama Proyek <span class="text-red-500">*</span></label>
            <input type="text" v-model="form.name" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 shadow-inner" placeholder="Masukkan nama..." />
          </div>

          <div class="space-y-1.5 border p-3 rounded-xl bg-slate-50 border-slate-200 border-dashed">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1"><i class="pi pi-building"></i> Pihak Klien (Customer)</label>
            <select v-model="form.customerId" class="w-full border rounded-lg px-2 py-2 text-xs font-bold text-slate-700 outline-none focus:border-blue-500 bg-white">
              <option value="">- Proyek Internal / Tanpa Klien -</option>
              <option v-for="c in customers" :key="c.id" :value="c.id">{{ c.name || c.code }}</option>
            </select>
            
            <label class="text-[11px] font-bold text-amber-600 uppercase tracking-widest flex items-center gap-1 mt-3"><i class="pi pi-file"></i> Kontrak Bidding (Jika Ada)</label>
            <select v-model="form.contractId" class="w-full border rounded-lg px-2 py-2 text-xs font-bold text-amber-700 outline-none focus:border-amber-500 bg-amber-50 border-amber-200">
              <option value="">- Tanpa Kontrak Spesifik -</option>
              <option v-for="c in contracts" :key="c.id" :value="c.id">{{ c.contractNo }} - {{ fmtCurrency(c.contractValue) }}</option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-4">
             <div class="space-y-1.5">
               <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Start Date</label>
               <input type="date" v-model="form.startDate" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-700 outline-none focus:border-blue-500 shadow-inner" />
             </div>
             <div class="space-y-1.5">
               <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">End Date / Deadline</label>
               <input type="date" v-model="form.endDate" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-700 outline-none focus:border-blue-500 shadow-inner" />
             </div>
          </div>

          <div class="space-y-1.5">
             <label class="text-[11px] font-bold text-emerald-600 uppercase tracking-widest">Master Budget (Rp)</label>
             <input type="number" v-model="form.totalBudget" class="w-full border rounded-lg px-3 py-2 text-sm font-black text-emerald-700 outline-none focus:border-emerald-500 shadow-inner bg-emerald-50" placeholder="Misal: 500000000" />
          </div>

          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Deskripsi (Scope of Work)</label>
            <textarea v-model="form.description" rows="4" class="w-full border rounded-lg px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 shadow-inner resize-none"></textarea>
          </div>
        </div>

        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-xl">
          <Button label="Batal" severity="secondary" :disabled="saving" @click="dialogOpen = false" class="bg-white border text-slate-700 font-bold px-5" />
          <Button :label="editingProject ? 'Simpan Perubahan' : 'Buat Proyek'" :loading="saving" :disabled="!form.code || !form.name"
            @click="save" class="bg-blue-600 border-none text-white font-bold px-6" icon="pi pi-check" />
        </div>
      </div>
    </div>

    <!-- Read-Only View Dialog -->
    <div v-if="viewDialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm" @click.self="viewDialogOpen = false">
      <div class="w-full max-w-2xl rounded-2xl border bg-white p-4 shadow-2xl animate-fade-in-up">
        <div class="flex items-center justify-between pb-4 border-b">
          <div class="text-lg font-black text-slate-800 flex items-center gap-2">
            <i class="pi pi-briefcase text-blue-600"></i> Detail Setup Proyek: <span class="font-mono text-blue-600 ml-1">{{ viewingProject?.code }}</span>
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors w-8 h-8 rounded-full font-bold flex items-center justify-center" @click="viewDialogOpen = false"><i class="pi pi-times text-sm"></i></button>
        </div>

        <div class="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div class="bg-slate-50 p-3 rounded-xl border">
            <div class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Nama Proyek</div>
            <div class="font-bold text-slate-800">{{ viewingProject?.name }}</div>
          </div>
          <div class="bg-slate-50 p-3 rounded-xl border">
            <div class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Status Operational</div>
            <span :style="projectStatusStyle(viewingProject?.status)" class="px-2 py-0.5 rounded text-xs font-black uppercase tracking-widest border inline-block mt-0.5">{{ viewingProject?.status.replace('_', ' ') }}</span>
          </div>
          <div class="bg-slate-50 p-3 rounded-xl border">
            <div class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Customer / Klien</div>
            <div class="font-bold text-slate-800 flex items-center gap-2 mt-0.5">
               <i class="pi pi-building text-slate-400"></i>
               {{ viewingProject?.customer?.name || 'Internal / Tanpa Klien' }}
            </div>
          </div>
          <div class="bg-slate-50 p-3 rounded-xl border">
            <div class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Total Budgeting</div>
            <div class="font-black font-mono text-emerald-700 text-base mt-0.5">{{ fmtCurrency(viewingProject?.totalBudget) }}</div>
          </div>
        </div>
        
        <div class="mt-4 bg-slate-50 p-4 rounded-xl border">
           <div class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Scope of Work (Description)</div>
           <p class="text-slate-700 font-medium whitespace-pre-wrap">{{ viewingProject?.description || 'Tidak ada deskripsi tersedia.' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useApi } from '~/composables/useApi';
import { useAuthStore } from '~/stores/auth';

const api = useApi();
const auth = useAuthStore();

const canRead = computed(() => auth.hasPermission('project.setup.read'));
const canManage = computed(() => auth.hasPermission('project.setup.manage'));

const projects = ref<any[]>([]);
const customers = ref<any[]>([]);
const contracts = ref<any[]>([]);

const q = ref('');
const statusFilter = ref('');
const loading = ref(false);
const saving = ref(false);
const error = ref('');
const success = ref('');

const dialogOpen = ref(false);
const viewDialogOpen = ref(false);
const editingProject = ref<any>(null);
const viewingProject = ref<any>(null);

const form = reactive({
  code: '',
  name: '',
  customerId: '',
  contractId: '',
  status: 'DRAFT',
  startDate: '',
  endDate: '',
  totalBudget: '',
  description: '',
});

const showMsg = (refVar: any, msg: string) => { refVar.value = msg; setTimeout(()=> { refVar.value = null; }, 3000); };

async function load() {
  loading.value = true;
  error.value = '';
  try {
    const params: any = {};
    if (q.value) params.search = q.value;
    if (statusFilter.value) params.status = statusFilter.value;
    const res = await api.get('/project/projects', { params });
    projects.value = res.data.data;
  } catch (e: any) {
    error.value = e.response?.data?.message || e.message;
  } finally {
    loading.value = false;
  }
}

async function loadCustomers() {
  try {
    const res = await api.get('/crm/customers');
    customers.value = res.data.customers || res.data.data || [];
  } catch (e) {
    console.error('Failed to load customers', e);
  }
}

async function loadContracts() {
  try {
    const res = await api.get('/project/contracts'); // Optional: if contract endpoint exists
    contracts.value = res.data.contracts || res.data.data || [];
  } catch (e) {
    console.warn('Contracts endpoint may not exist or failed', e);
  }
}

async function save() {
  saving.value = true; error.value = ''; success.value = '';
  try {
    const payload = { ...form };
    if (!payload.customerId) delete (payload as any).customerId;
    if (!payload.contractId) delete (payload as any).contractId;
    if (!payload.startDate) delete (payload as any).startDate;
    if (!payload.endDate) delete (payload as any).endDate;
    if (!payload.totalBudget) delete (payload as any).totalBudget;

    if (editingProject.value) {
      await api.patch(`/project/projects/${editingProject.value.id}`, payload);
      showMsg(success, `Proyek ${form.code} berhasil diupdate!`);
    } else {
      await api.post('/project/projects', payload);
      showMsg(success, `Proyek ${form.code} berhasil dibuat!`);
    }
    dialogOpen.value = false;
    load();
  } catch (e: any) {
    error.value = e.response?.data?.message || e.message;
  } finally {
    saving.value = false;
  }
}

function openCreate() {
  editingProject.value = null;
  form.code = `PRJ-XYZ-${Math.floor(Math.random()*9000)+1000}`;
  form.name = '';
  form.customerId = '';
  form.contractId = '';
  form.status = 'DRAFT';
  form.startDate = '';
  form.endDate = '';
  form.totalBudget = '';
  form.description = '';
  loadCustomers();
  loadContracts();
  dialogOpen.value = true;
}

function openEdit(p: any) {
  editingProject.value = p;
  form.code = p.code;
  form.name = p.name;
  form.customerId = p.customerId || '';
  form.contractId = p.contractId || '';
  form.status = p.status || 'DRAFT';
  form.startDate = p.startDate?.slice(0, 10) || '';
  form.endDate = p.endDate?.slice(0, 10) || '';
  form.totalBudget = String(p.totalBudget || '');
  form.description = p.description || '';
  loadCustomers();
  loadContracts();
  dialogOpen.value = true;
}

function openView(p: any) {
  viewingProject.value = p;
  viewDialogOpen.value = true;
}

const statusColor = (status: string) => {
   if (status === 'IN_PROGRESS') return '#10b981';
   if (status === 'SETUP') return '#3b82f6';
   if (status === 'ON_HOLD') return '#f59e0b';
   if (status === 'COMPLETED') return '#8b5cf6';
   if (status === 'CLOSED') return '#0f172a';
   return '#94a3b8'; // DRAFT
};

function projectStatusStyle(status: string) {
  const map: Record<string, any> = {
    DRAFT: { backgroundColor: '#f1f5f9', color: '#64748b', borderColor: '#cbd5e1' },
    SETUP: { backgroundColor: '#eff6ff', color: '#1d4ed8', borderColor: '#bfdbfe' },
    IN_PROGRESS: { backgroundColor: '#ecfdf5', color: '#047857', borderColor: '#a7f3d0' },
    ON_HOLD: { backgroundColor: '#fffbeb', color: '#b45309', borderColor: '#fde68a' },
    COMPLETED: { backgroundColor: '#f5f3ff', color: '#6d28d9', borderColor: '#ddd6fe' },
    CLOSED: { backgroundColor: '#f8fafc', color: '#0f172a', borderColor: '#e2e8f0' }
  };
  return map[status] || map['DRAFT'];
}

function pad(n: number) { return String(n).padStart(2, '0'); }
function formatDate(iso: string) {
  if (!iso) return '-';
  const d = new Date(iso);
  const m = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  return `${pad(d.getDate())} ${m[d.getMonth()]} ${d.getFullYear().toString().slice(2)}`;
}

function fmtCurrency(amount: any) {
  if (!amount) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(amount));
}

onMounted(() => {
  if (canRead.value) load();
});
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
.animate-slide-in-right { animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes slideInRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
</style>