<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-6 shadow-sm border-l-4 border-l-amber-500 relative overflow-hidden">
      <div class="absolute right-[-15px] top-[-10px] opacity-[0.03] pointer-events-none">
        <i class="pi pi-list text-[150px] text-amber-900"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-start gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-list text-amber-500"></i> Tender & Bidding Management
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
            Kelola proses pengadaan (Lelang), penawaran Supplier (Bid), dan penentuan pemenang tender proyek.
          </div>
        </div>
        <div class="flex gap-2 shrink-0">
          <Button v-if="canManage" label="Buat Tender Baru" size="small" icon="pi pi-plus" class="bg-amber-500 text-white border-none font-bold shadow-sm hover:bg-amber-600" @click="openCreate" />
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
         <InputText v-model="q" placeholder="Cari judul tender pengadaan..." class="w-full text-sm h-10" @keyup.enter="load" :disabled="!canRead" />
      </span>
      <select v-model="statusFilter" class="h-10 rounded-lg border-slate-200 px-3 text-sm font-bold text-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none w-40" @change="load">
        <option value="">Semua Status</option>
        <option value="DRAFT">Draft</option>
        <option value="OPEN">Open (Live)</option>
        <option value="EVALUATING">Evaluating</option>
        <option value="AWARDED">Awarded</option>
        <option value="CANCELLED">Cancelled</option>
      </select>
      <Button severity="secondary" size="small" :loading="loading" icon="pi pi-refresh" @click="load" class="h-10 w-10 shrink-0" :disabled="!canRead" />
    </div>

    <!-- TABLE -->
    <div class="rounded-xl border bg-white shadow-sm overflow-hidden animate-fade-in-up">
      <table class="w-full text-sm">
        <thead class="bg-slate-50 text-left text-[11px] text-slate-500 uppercase tracking-widest font-black">
          <tr>
            <th class="px-5 py-3 border-b border-b-slate-200 w-1/3">Judul Pengadaan (Lelang)</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200">Asal Proyek</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200 text-center w-40">Tenggat Waktu</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200 text-center w-36">Status</th>
            <th class="px-4 py-3 border-l border-b border-b-slate-200 text-center w-28">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-if="loading">
            <td colspan="5" class="py-16 text-center text-slate-400"><i class="pi pi-spinner pi-spin mr-2 text-amber-500 shadow-sm"></i> Memuat master tender...</td>
          </tr>
          
          <tr v-for="t in tenders" v-else :key="t.id" class="transition hover:bg-slate-50 group border-l-4" :style="{ borderLeftColor: statusColor(t.status) }">
            <td class="px-5 py-3 align-top">
              <div class="font-bold text-slate-800 text-sm leading-tight hover:text-amber-600 transition-colors cursor-pointer" @click="openView(t)" :title="t.title">{{ t.title }}</div>
              <div class="mt-1 text-[10px] text-slate-400 italic line-clamp-1">{{ t.description || 'Tidak ada deskripsi' }}</div>
            </td>
            
            <td class="px-4 py-3 align-top border-l">
              <div v-if="t.project" class="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <i class="pi pi-briefcase text-slate-400"></i> <span class="line-clamp-2">{{ t.project.name }}</span>
              </div>
              <div v-else class="text-[10px] text-slate-400 italic font-medium">Bebas / Pengadaan Eksternal</div>
            </td>

            <td class="px-4 py-3 align-top border-l text-center">
               <div class="text-[10px] font-black uppercase tracking-widest space-y-1 relative group">
                 <div class="text-slate-700 bg-slate-50 border rounded px-1 py-0.5"><i class="pi pi-clock mr-1 text-[8px] text-amber-500"></i>{{ t.submissionDeadline ? formatDate(t.submissionDeadline) : 'TBD' }}</div>
                 <div class="text-slate-500 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded px-1 py-0.5"><i class="pi pi-calendar-plus mr-1 text-[8px]"></i>{{ t.awardDate ? formatDate(t.awardDate) : 'TBD' }}</div>
               </div>
            </td>

            <td class="px-4 py-3 align-top border-l text-center">
              <span class="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border inline-block" :style="tenderStatusStyle(t.status)">
                {{ t.status.replace('_', ' ') }}
              </span>
            </td>
            
            <td class="px-4 py-3 align-top border-l text-center">
              <div class="flex justify-center gap-1.5">
                <Button icon="pi pi-eye" v-tooltip="'Detail Tender'" size="small" outlined class="h-8 w-8 text-[11px] px-0" severity="secondary" @click="openView(t)" />
                <Button v-if="canManage" icon="pi pi-pencil" v-tooltip="'Edit Tender'" size="small" outlined class="h-8 w-8 text-[11px] px-0 text-amber-600 border-amber-200 hover:bg-amber-50" @click="openEdit(t)" />
              </div>
            </td>
          </tr>

          <tr v-if="!loading && tenders.length === 0">
            <td colspan="5" class="py-12 text-center text-slate-400 italic text-sm font-medium">Tidak ada tender yang ditemukan.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit/Create Drawer Modal -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm" @click.self="dialogOpen = false">
      <div class="w-full max-w-lg h-full bg-white shadow-2xl flex flex-col overflow-y-auto animate-slide-in-right">
        <div class="p-5 border-b bg-slate-50 flex justify-between rounded-t-xl" style="borderTop: 4px solid #f59e0b;">
          <div class="text-lg font-black text-slate-800 flex items-center gap-2">
            <i class="pi pi-pencil text-amber-500" v-if="editingTender"></i>
            <i class="pi pi-plus text-amber-500" v-else></i>
            {{ editingTender ? 'Update Data Pengadaan' : 'Registrasi Tender Baru' }}
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-200 w-8 h-8 rounded-full font-bold" @click="dialogOpen = false">✕</button>
        </div>
        
        <div class="p-6 space-y-5 flex-1">
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Judul Pengadaan / Lelang <span class="text-red-500">*</span></label>
            <input type="text" v-model="form.title" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-amber-500 shadow-inner" placeholder="Tender Pengadaan Raw Material..." />
          </div>

          <div class="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200 border-dashed">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1"><i class="pi pi-briefcase"></i> Proyek Terkait</label>
            <select v-model="form.projectId" class="w-full border rounded-lg px-2 py-2 text-xs font-bold text-slate-700 outline-none focus:border-amber-500 bg-white">
              <option value="">- Bebas / Bukan Untuk Proyek Spesifik -</option>
              <option v-for="p in projects" :key="p.id" :value="p.id">{{ p.name || p.code }}</option>
            </select>
          </div>
          
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Status Tender</label>
            <select v-model="form.status" class="w-full border rounded-lg px-2 py-2 text-xs font-bold text-slate-700 outline-none focus:border-amber-500 bg-white">
              <option value="DRAFT">DRAFT (Penyusunan)</option>
              <option value="OPEN">OPEN (Sedang Live)</option>
              <option value="EVALUATING">EVALUATING (Evaluasi Kandidat)</option>
              <option value="AWARDED">AWARDED (Sukses & Pemenang Diumumkan)</option>
              <option value="CANCELLED">CANCELLED (Dibatalkan)</option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-4">
             <div class="space-y-1.5">
               <label class="text-[11px] font-bold text-rose-500 uppercase tracking-widest">Batas Waktu (Deadline)</label>
               <input type="date" v-model="form.submissionDeadline" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-700 outline-none focus:border-amber-500 shadow-inner bg-rose-50" />
             </div>
             <div class="space-y-1.5">
               <label class="text-[11px] font-bold text-emerald-600 uppercase tracking-widest">Target Pengumuman</label>
               <input type="date" v-model="form.awardDate" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-700 outline-none focus:border-amber-500 shadow-inner bg-emerald-50" />
             </div>
          </div>

          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Spesifikasi Tambahan (Deskripsi)</label>
            <textarea v-model="form.description" rows="4" class="w-full border rounded-lg px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-amber-500 shadow-inner resize-none"></textarea>
          </div>
        </div>

        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-xl">
          <Button label="Batal" severity="secondary" :disabled="saving" @click="dialogOpen = false" class="bg-white border text-slate-700 font-bold px-5" />
          <Button :label="editingTender ? 'Simpan Perubahan' : 'Buat Tender'" :loading="saving" :disabled="!form.title"
            @click="save" class="bg-amber-500 border-none text-white font-bold px-6 hover:bg-amber-600" icon="pi pi-check" />
        </div>
      </div>
    </div>

    <!-- Read-Only View Dialog -->
    <div v-if="viewDialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm" @click.self="viewDialogOpen = false">
      <div class="w-full max-w-2xl rounded-2xl border bg-white p-6 shadow-2xl animate-fade-in-up">
        <div class="flex items-center justify-between pb-4 border-b">
          <div class="text-lg font-black text-slate-800 flex items-center gap-2">
            <i class="pi pi-box text-amber-500"></i> Detail Tender Pengadaan
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors w-8 h-8 rounded-full font-bold flex items-center justify-center" @click="viewDialogOpen = false"><i class="pi pi-times text-sm"></i></button>
        </div>

        <div class="mt-6 grid grid-cols-2 gap-6 text-sm">
          <div class="bg-slate-50 p-3 rounded-xl border col-span-2">
            <div class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Judul Lelang</div>
            <div class="font-bold text-slate-800 text-lg">{{ viewingTender?.title }}</div>
          </div>
          
          <div class="bg-slate-50 p-3 rounded-xl border">
            <div class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Status Publikasi</div>
            <span :style="tenderStatusStyle(viewingTender?.status)" class="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border inline-block mt-0.5">{{ viewingTender?.status.replace('_', ' ') }}</span>
          </div>
          
          <div class="bg-slate-50 p-3 rounded-xl border">
            <div class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Relevansi Proyek</div>
            <div class="font-bold text-slate-800 flex items-center gap-2 mt-0.5">
               <i class="pi pi-briefcase text-slate-400"></i>
               {{ viewingTender?.project?.name || 'Tidak Ada' }}
            </div>
          </div>
          
          <div class="bg-rose-50 p-3 rounded-xl border border-rose-100">
            <div class="text-[10px] font-black uppercase tracking-widest text-rose-500 mb-1">Submission Deadline</div>
            <div class="font-black text-rose-800 text-base mt-0.5">
                <i class="pi pi-clock text-[12px] mr-1"></i> {{ formatDate(viewingTender?.submissionDeadline) }}
            </div>
          </div>

          <div class="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
            <div class="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Expected Award Date</div>
            <div class="font-black text-emerald-800 text-base mt-0.5">
                <i class="pi pi-check flex-shrink-0 text-[12px] mr-1"></i> {{ formatDate(viewingTender?.awardDate) }}
            </div>
          </div>
        </div>
        
        <div class="mt-4 bg-slate-50 p-4 rounded-xl border">
           <div class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Spesifikasi Detail</div>
           <p class="text-slate-700 font-medium whitespace-pre-wrap">{{ viewingTender?.description || 'Tidak ada uraian detail untuk tender ini.' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useApi } from '~/composables/useApi';
import { useAuthStore } from '~/stores/auth';

const api = useApi();
const auth = useAuthStore();

const canRead = computed(() => auth.hasPermission('project.tender.read'));
const canManage = computed(() => auth.hasPermission('project.tender.manage'));

const q = ref('');
const statusFilter = ref('');
const loading = ref(false);
const saving = ref(false);
const error = ref('');
const success = ref('');

const dialogOpen = ref(false);
const viewDialogOpen = ref(false);
const editingTender = ref<any>(null);
const viewingTender = ref<any>(null);
const tenders = ref<any[]>([]);
const projects = ref<any[]>([]);

const form = ref({
  title: '',
  projectId: '',
  description: '',
  status: 'DRAFT',
  submissionDeadline: '',
  awardDate: '',
});

const showMsg = (refVar: any, msg: string) => { refVar.value = msg; setTimeout(()=> { refVar.value = null; }, 3000); };

function pad(n: number) { return String(n).padStart(2, '0'); }
function formatDate(iso: string) {
  if (!iso) return '-';
  const d = new Date(iso);
  const m = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  return `${pad(d.getDate())} ${m[d.getMonth()]} ${d.getFullYear()}`;
}

const statusColor = (status: string) => {
   if (status === 'OPEN') return '#3b82f6';
   if (status === 'EVALUATING') return '#f59e0b';
   if (status === 'AWARDED') return '#10b981';
   if (status === 'CANCELLED') return '#ef4444';
   return '#94a3b8'; // DRAFT
};

function tenderStatusStyle(status: string) {
  const map: Record<string, any> = {
    DRAFT: { backgroundColor: '#f1f5f9', color: '#64748b', borderColor: '#cbd5e1' },
    OPEN: { backgroundColor: '#eff6ff', color: '#1d4ed8', borderColor: '#bfdbfe' },
    EVALUATING: { backgroundColor: '#fffbeb', color: '#b45309', borderColor: '#fde68a' },
    AWARDED: { backgroundColor: '#ecfdf5', color: '#047857', borderColor: '#a7f3d0' },
    CANCELLED: { backgroundColor: '#fef2f2', color: '#b91c1c', borderColor: '#fecaca' }
  };
  return map[status] || map['DRAFT'];
}

async function load() {
  loading.value = true;
  error.value = '';
  try {
    const params: any = {};
    if (q.value) params.search = q.value;
    if (statusFilter.value) params.status = statusFilter.value;
    const { data } = await api.get('/project/tenders', { params });
    tenders.value = data.data || data;
  } catch (e: any) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
}

async function loadProjects() {
  try {
    const { data } = await api.get('/project/projects');
    projects.value = data.data || data;
  } catch (e) {}
}

function openCreate() {
  editingTender.value = null;
  form.value = { title: '', projectId: '', description: '', status: 'DRAFT', submissionDeadline: '', awardDate: '' };
  loadProjects();
  dialogOpen.value = true;
}

function openEdit(t: any) {
  editingTender.value = t;
  form.value = {
    title: t.title || '',
    projectId: t.projectId || '',
    description: t.description || '',
    status: t.status || 'DRAFT',
    submissionDeadline: t.submissionDeadline?.slice(0, 10) || '',
    awardDate: t.awardDate?.slice(0, 10) || '',
  };
  loadProjects();
  dialogOpen.value = true;
}

function openView(t: any) {
  viewingTender.value = t;
  viewDialogOpen.value = true;
}

async function save() {
  saving.value = true; error.value = ''; success.value = '';
  try {
    const payload = { ...form.value };
    if (!payload.projectId) delete (payload as any).projectId;
    if (!payload.submissionDeadline) delete (payload as any).submissionDeadline;
    if (!payload.awardDate) delete (payload as any).awardDate;

    if (editingTender.value) {
      await api.patch(`/project/tenders/${editingTender.value.id}`, payload);
      showMsg(success, `Tender berhasil diupdate!`);
    } else {
      await api.post('/project/tenders', payload);
      showMsg(success, `Tender berhasil dibuat!`);
    }
    dialogOpen.value = false;
    load();
  } catch (e: any) {
    error.value = e.response?.data?.message || e.message;
  } finally {
    saving.value = false;
  }
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
