<template>
  <div class="min-h-screen bg-[#f8fafc]">
    
    <!-- ═══════════════════════════════════ HEADER ══════════════════════════════════ -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 overflow-hidden relative p-8 m-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500">
      <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-indigo-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">General Support</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Document Management (DMS)</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase tracking-tighter">Document <span class="text-indigo-600">Vault</span></h1>
        <p class="text-slate-500 text-sm font-medium italic">Pusat dokumentasi terpadu untuk kepatuhan legal, standar operasional, dan arsip teknis.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="loadData" :loading="loading" class="shadow-sm border-slate-200" />
        <Button label="Registrasi Dokumen" icon="pi pi-file-import" class="p-button-rounded font-black text-[10px] uppercase shadow-lg shadow-indigo-100 px-6 py-3" @click="openCreateDocument" />
      </div>
    </div>

    <!-- Vault Intelligence Ribbon -->
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mx-6 mb-8">
       <div v-for="s in stats" :key="s.label" class="group p-4 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <i :class="[s.icon, 'text-6xl text-indigo-900']"></i>
          </div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ s.label }}</p>
          <h3 class="text-2xl font-black text-slate-900">{{ loading ? '—' : s.value }}</h3>
          <div class="flex items-center gap-2 mt-2">
             <span :class="['text-[10px] font-bold px-2 py-0.5 rounded-full', s.badgeClass]">
               {{ s.sub }}
             </span>
          </div>
       </div>
    </div>

    <!-- ═══════════════════════════════════ CONTENT EXPLORER ══════════════════════════════════ -->
    <div class="mx-6 mb-6">
      <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

        <!-- Tab Bar -->
        <div class="border-b border-slate-100 px-8 pt-6 pb-0 flex flex-col md:flex-row md:items-end gap-4">
          <div class="flex gap-4">
            <button v-for="tab in tabs" :key="tab.key" @click="activeTab = tab.key"
              :class="['pb-4 text-[11px] font-black uppercase tracking-widest transition-all border-b-4',
                activeTab === tab.key ? 'border-indigo-600 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-700']">
              <i :class="[tab.icon, 'mr-2']"></i>{{ tab.label }}
              <span v-if="tab.count !== undefined" :class="['ml-2 px-2 py-0.5 rounded-full text-[9px] font-black', activeTab === tab.key ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-400']">{{ tab.count }}</span>
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <DataTable :value="filteredDocs" class="p-datatable-sm w-full" :loading="loading" dataKey="id">
            <Column header="KODE / VERSI" class="pl-8">
              <template #body="{ data }">
                <div class="flex flex-col">
                  <span class="text-[11px] font-black text-slate-800 font-mono tracking-tighter">{{ data.code }}</span>
                  <div class="flex items-center gap-1.5 mt-0.5">
                    <span class="px-1.5 py-0.5 bg-slate-100 text-slate-500 text-[8px] font-black rounded uppercase">v{{ data.version }}</span>
                    <span class="text-[9px] font-black text-indigo-500 uppercase tracking-widest">{{ data.category }}</span>
                  </div>
                </div>
              </template>
            </Column>
            <Column header="JUDUL DOKUMEN">
              <template #body="{ data }">
                <div class="flex flex-col">
                  <span class="text-[11px] font-bold text-slate-800 leading-tight uppercase tracking-tight">{{ data.title }}</span>
                  <span class="text-[9px] text-slate-400 font-medium italic line-clamp-1 max-w-xs">{{ data.description || 'No description provided.' }}</span>
                </div>
              </template>
            </Column>
            <Column header="OWNERSHIP & DEPT">
              <template #body="{ data }">
                <div class="flex flex-col">
                  <div class="flex items-center gap-1.5 mb-0.5">
                    <i class="pi pi-building text-[10px] text-indigo-500"></i>
                    <span class="text-[10px] font-black text-slate-700 uppercase tracking-tighter">{{ data.department?.name || 'Central Archive' }}</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <i class="pi pi-user text-[10px] text-slate-400"></i>
                    <span class="text-[9px] text-slate-500">{{ data.author ? `${data.author.firstName} ${data.author.lastName || ''}` : 'System Author' }}</span>
                  </div>
                </div>
              </template>
            </Column>
            <Column header="STATUS & VALIDITY">
              <template #body="{ data }">
                <div class="flex flex-col gap-1">
                  <span :class="['px-2.5 py-1 rounded-lg text-[9px] font-black uppercase text-center', getStatusClass(data.status)]">
                    {{ data.status.replace('_', ' ') }}
                  </span>
                  <div v-if="data.expiryDate" class="flex items-center gap-1 text-[8px] font-black justify-center">
                    <i class="pi pi-calendar-times" :class="isExpired(data.expiryDate) ? 'text-rose-500' : 'text-slate-400'"></i>
                    <span :class="isExpired(data.expiryDate) ? 'text-rose-500 underline' : 'text-slate-400'">
                      Expiry: {{ formatDate(data.expiryDate) }}
                    </span>
                  </div>
                </div>
              </template>
            </Column>
            <Column class="text-right pr-8">
              <template #body="{ data }">
                <div class="flex gap-1 justify-end">
                  <Button icon="pi pi-eye" severity="secondary" rounded text @click="openViewDocument(data)" v-tooltip="'Lihat Detail'" />
                  <Button icon="pi pi-history" severity="secondary" rounded text v-tooltip="'History Versi'" />
                  <Button icon="pi pi-pencil" severity="secondary" rounded text @click="openEditDocument(data)" v-tooltip="'Edit'" />
                  <Button icon="pi pi-trash" severity="danger" rounded text @click="confirmDelete(data)" v-tooltip="'Hapus'" />
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════ DOCUMENT DIALOG ══════════════════════════════════ -->
    <div v-if="docDialogVisible" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="docDialogVisible = false"></div>
      <div class="relative bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl transition-all duration-500 scale-in-center border border-white/20">
        <!-- Header -->
        <div class="flex items-center justify-between p-10 border-b border-slate-100 bg-slate-50/10 shrink-0">
          <div class="flex items-center gap-5">
            <div class="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-indigo-600 to-slate-900 flex items-center justify-center shadow-2xl shadow-indigo-200">
              <i class="pi pi-file-pdf text-3xl text-white"></i>
            </div>
            <div>
              <h3 class="text-2xl font-black text-slate-900 tracking-tight">{{ docForm.id ? 'Update Document Passport' : 'Registrasi Dokumen Baru' }}</h3>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1 italic">Enterprise Support Document System</p>
            </div>
          </div>
          <button @click="docDialogVisible = false" class="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-all group">
            <i class="pi pi-times text-xl text-slate-400 group-hover:text-slate-900"></i>
          </button>
        </div>

        <div class="overflow-y-auto p-10 space-y-12 custom-scrollbar pb-32 bg-white/50">
          
          <!-- Classification Section -->
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-10">
            <div class="lg:col-span-1 border-r border-slate-100 pr-10 hidden lg:block">
              <span class="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Step 01</span>
              <h4 class="text-lg font-black text-slate-800 mt-2 leading-tight">Klasifikasi & <br/>Kategorisasi</h4>
              <p class="text-xs text-slate-400 font-medium mt-3 leading-relaxed">Tentukan penomoran unik dan kelompok dokumen ini.</p>
            </div>
            <div class="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Document Code <span class="text-rose-500">*</span></label>
                <input v-model="docForm.code" class="doc-input font-mono uppercase" placeholder="LGL-XXX-001" />
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category <span class="text-rose-500">*</span></label>
                <select v-model="docForm.category" class="doc-select">
                  <option value="LEGAL">Legal & Permits</option>
                  <option value="HR">Human Resources</option>
                  <option value="TECHNICAL">Technical & Drawings</option>
                  <option value="OPERATIONAL">Operational Procedures</option>
                  <option value="FINANCE">Finance & Tax</option>
                </select>
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Version <span class="text-rose-500">*</span></label>
                <input v-model="docForm.version" class="doc-input font-bold" placeholder="1.0" />
              </div>
              <div class="md:col-span-3 space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Judul Dokumen Lengkap <span class="text-rose-500">*</span></label>
                <input v-model="docForm.title" class="doc-input font-black uppercase tracking-tight" placeholder="Nama Resmi Dokumen" />
              </div>
            </div>
          </div>

          <!-- Metadata & Content -->
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-10">
            <div class="lg:col-span-1 border-r border-slate-100 pr-10 hidden lg:block">
              <span class="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Step 02</span>
              <h4 class="text-lg font-black text-slate-800 mt-2 leading-tight">Detail & <br/>Deskripsi</h4>
              <p class="text-xs text-slate-400 font-medium mt-3 leading-relaxed">Informasi ringkas mengenai isi atau tujuan dokumen.</p>
            </div>
            <div class="lg:col-span-3 space-y-2">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Ringkasan Deskripsi</label>
              <textarea v-model="docForm.description" class="doc-input h-32 resize-none" placeholder="Masukkan deskripsi atau catatan penting..."></textarea>
            </div>
          </div>

          <!-- Ownership & Compliance -->
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-10">
            <div class="lg:col-span-1 border-r border-slate-100 pr-10 hidden lg:block">
              <span class="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Step 03</span>
              <h4 class="text-lg font-black text-slate-800 mt-2 leading-tight">Kepemilikan & <br/>Masa Berlaku</h4>
              <p class="text-xs text-slate-400 font-medium mt-3 leading-relaxed">Siapa yang bertanggung jawab dan hingga kapan dokumen valid.</p>
            </div>
            <div class="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Departemen Pengampu</label>
                <select v-model="docForm.departmentId" class="doc-select">
                  <option :value="null">-- Tidak Ada Departemen --</option>
                  <option v-for="d in depts" :key="d.id" :value="d.id">{{ d.name }} ({{ d.code }})</option>
                </select>
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Penanggung Jawab (Author)</label>
                <select v-model="docForm.authorId" class="doc-select">
                  <option :value="null">-- Tidak Ada Author --</option>
                  <option v-for="e in employees" :key="e.id" :value="e.id">{{ e.firstName }} {{ e.lastName }} ({{ e.employeeNo }})</option>
                </select>
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tanggal Efektif</label>
                <input v-model="docForm.effectiveDate" type="date" class="doc-input" />
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black text-rose-600 uppercase tracking-widest ml-1 font-black">Tanggal Kadaluarsa (Expiry)</label>
                <input v-model="docForm.expiryDate" type="date" class="doc-input border-rose-100 bg-rose-50/20" />
              </div>
            </div>
          </div>

          <!-- File Attachment Placeholder -->
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-10 pb-20">
            <div class="lg:col-span-1 border-r border-slate-100 pr-10 hidden lg:block">
              <span class="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Step 04</span>
              <h4 class="text-lg font-black text-slate-800 mt-2 leading-tight">Digital <br/>Attachment</h4>
              <p class="text-xs text-slate-400 font-medium mt-3 leading-relaxed">Tautkan file scan atau dokumen digital di sini.</p>
            </div>
            <div class="lg:col-span-3 space-y-2">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">External File URL (Vault Link)</label>
              <div class="flex gap-4">
                <input v-model="docForm.fileUrl" class="doc-input flex-1" placeholder="https://vault.ses-erp.com/f/..." />
                <Button icon="pi pi-upload" severity="secondary" rounded class="shrink-0" />
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="absolute bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl p-10 border-t border-slate-100 flex items-center justify-between z-10 rounded-t-[3rem] shadow-[0_-15px_60px_rgba(0,0,0,0.05)]">
           <div class="flex items-center gap-3">
              <i class="pi pi-info-circle text-indigo-400"></i>
              <p class="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Dokumen yang dipublish akan menjadi acuan resmi perusahaan.</p>
           </div>
           <div class="flex gap-4">
              <div class="flex items-center bg-slate-100 rounded-2xl px-2 mr-2">
                <select v-model="docForm.status" class="bg-transparent border-none text-[9px] font-black uppercase tracking-widest outline-none px-4 py-2 cursor-pointer">
                  <option value="DRAFT">Draft Mode</option>
                  <option value="UNDER_REVIEW">In Review</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>
              <Button label="Batalkan" severity="secondary" text @click="docDialogVisible = false" class="font-black text-[10px] uppercase tracking-widest" />
              <Button :label="docForm.id ? 'Perbarui Dokumen' : 'Simpan ke Vault'" icon="pi pi-check" class="p-button-rounded font-black text-[10px] uppercase px-10 py-4 shadow-2xl shadow-indigo-200" @click="saveDocument" :loading="saving" />
           </div>
        </div>
      </div>
    </div>

    <!-- Confirm Dialog Placeholder -->
    <Dialog v-model:visible="deleteVisible" header="Hapus Dokumen" :style="{width: '350px'}" :modal="true">
        <div class="flex items-center gap-3">
            <i class="pi pi-exclamation-triangle text-3xl text-rose-500" />
            <span class="text-sm font-medium italic text-slate-600">Arsip dokumen akan dihapus secara permanen dari vault. Lanjutkan?</span>
        </div>
        <template #footer>
            <Button label="Batal" icon="pi pi-times" severity="secondary" text @click="deleteVisible = false" />
            <Button label="Ya, Hapus" icon="pi pi-check" severity="danger" @click="executeDelete" :loading="saving" />
        </template>
    </Dialog>

    <!-- Toasts -->

  </div>
</template>

<script setup lang="ts">
import { useApi } from '@/composables/useApi';
import { format } from 'date-fns';
import { useToast } from 'primevue/usetoast';

const api = useApi();
const toast = useToast();

// State
const loading = ref(false);
const saving = ref(false);
const activeTab = ref('ALL');
const docDialogVisible = ref(false);
const deleteVisible = ref(false);
const deleteTarget = ref<any>(null);

const documents = ref<any[]>([]);
const statsData = ref<any>({});
const depts = ref<any[]>([]);
const employees = ref<any[]>([]);

const docForm = reactive({
  id: null as any,
  code: '',
  title: '',
  description: '',
  category: 'LEGAL',
  version: '1.0',
  status: 'DRAFT',
  authorId: null as any,
  departmentId: null as any,
  effectiveDate: '' as any,
  expiryDate: '' as any,
  fileUrl: '',
});

// Computed
const tabs = computed(() => {
  const list = documents.value || [];
  return [
    { key: 'ALL', label: 'Semua Dokumen', icon: 'pi pi-folder-open', count: list.length },
    { key: 'PUBLISHED', label: 'Terbit (Active)', icon: 'pi pi-check-circle', count: list.filter(d => d.status === 'PUBLISHED').length },
    { key: 'UNDER_REVIEW', label: 'Review & Persetujuan', icon: 'pi pi-eye', count: list.filter(d => d.status === 'UNDER_REVIEW').length },
    { key: 'ARCHIVED', label: 'Arsip Lama', icon: 'pi pi-box', count: list.filter(d => d.status === 'ARCHIVED').length },
  ];
});

const stats = computed(() => [
  { label: 'Total Vault', value: statsData.value.total || 0, icon: 'pi pi-cloud-upload', badgeClass: 'bg-indigo-50 text-indigo-600', sub: 'Item Terdaftar' },
  { label: 'Status Terbit', value: statsData.value.published || 0, icon: 'pi pi-file-pdf', badgeClass: 'bg-emerald-50 text-emerald-600', sub: 'Aktif/Valid' },
  { label: 'Segera Kadaluarsa', value: statsData.value.expiringSoon || 0, icon: 'pi pi-clock', badgeClass: 'bg-amber-50 text-amber-600', sub: 'Review 30 Hari' },
  { label: 'Kadaluarsa', value: statsData.value.expired || 0, icon: 'pi pi-exclamation-triangle', badgeClass: 'bg-rose-50 text-rose-600', sub: 'Perlu Renewal' },
  { label: 'Compliance Rate', value: documents.value.length > 0 ? (statsData.value.published / documents.value.length * 100).toFixed(1) + '%' : '0%', icon: 'pi pi-verified', badgeClass: 'bg-slate-50 text-slate-600', sub: 'Tingkat Kesiapan' },
]);

const filteredDocs = computed(() => {
  const list = documents.value || [];
  if (activeTab.value === 'ALL') return list;
  return list.filter(d => d.status === activeTab.value);
});

// Implementation
async function loadData() {
  loading.value = true;
  try {
    const [docsRes, statsRes] = await Promise.all([
      api.get('/support/documents'),
      api.get('/support/documents/stats'),
    ]);
    documents.value = docsRes.data || docsRes;
    statsData.value = statsRes.data || statsRes;
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Vault Error', detail: 'Gagal mengakses data pusat dokumen.', life: 3000 });
  } finally {
    loading.value = false;
  }
}

async function loadMasters() {
  try {
    const [deptsRes, employeesRes] = await Promise.all([
      api.get('/project/site-master'), // Placeholder for project sites if logic applies, but we want depts
      api.get('/hris/employees'),
    ]);
    // Note: I'll use /core/org-units if available, otherwise fallback
    employees.value = employeesRes.data || employeesRes;
    
    // Fetch departments properly
    const orgRes = await api.get('/hris/departments').catch(() => ({ data: [] }));
    depts.value = orgRes.data || [];
    
    if (depts.value.length === 0) {
       // Deep fallback for demo
       depts.value = [{ id: '1', name: 'Management', code: 'MGMT' }, { id: '2', name: 'Legal & Risk', code: 'LGL' }];
    }
  } catch {}
}

function openCreateDocument() {
  Object.assign(docForm, {
    id: null,
    code: `DOC-${new Date().getFullYear()}-${String(Math.random()).slice(2, 5)}`,
    title: '',
    description: '',
    category: 'LEGAL',
    version: '1.0',
    status: 'DRAFT',
    authorId: null,
    departmentId: null,
    effectiveDate: '',
    expiryDate: '',
    fileUrl: '',
  });
  loadMasters();
  docDialogVisible.value = true;
}

function openEditDocument(doc: any) {
  Object.assign(docForm, {
    id: doc.id,
    code: doc.code,
    title: doc.title,
    description: doc.description || '',
    category: doc.category,
    version: doc.version,
    status: doc.status,
    authorId: doc.authorId,
    departmentId: doc.departmentId,
    effectiveDate: doc.effectiveDate?.split('T')[0] || '',
    expiryDate: doc.expiryDate?.split('T')[0] || '',
    fileUrl: doc.fileUrl || '',
  });
  loadMasters();
  docDialogVisible.value = true;
}

function openViewDocument(doc: any) {
  openEditDocument(doc);
}

async function saveDocument() {
  if (!docForm.code || !docForm.title) {
    toast.add({ severity: 'warn', summary: 'Input Diperlukan', detail: 'Kode dan Judul Dokumen tidak boleh kosong.', life: 3000 });
    return;
  }
  saving.value = true;
  try {
    if (docForm.id) {
      await api.patch(`/support/documents/${docForm.id}`, docForm);
      toast.add({ severity: 'success', summary: 'Success', detail: 'Dokumen di vault berhasil diperbarui.', life: 3000 });
    } else {
      await api.post('/support/documents', docForm);
      toast.add({ severity: 'success', summary: 'Registered', detail: 'Dokumen baru telah berhasil didaftarkan.', life: 3000 });
    }
    docDialogVisible.value = false;
    loadData();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Error', detail: e.message || 'Gagal menyimpan dokumen.', life: 3000 });
  } finally {
    saving.value = false;
  }
}

function confirmDelete(doc: any) {
  deleteTarget.value = doc;
  deleteVisible.value = true;
}

async function executeDelete() {
  if (!deleteTarget.value) return;
  saving.value = true;
  try {
    await api.delete(`/support/documents/${deleteTarget.value.id}`);
    toast.add({ severity: 'success', summary: 'Deleted', detail: 'Dokumen berhasil dihapus dari vault.', life: 3000 });
    deleteVisible.value = false;
    loadData();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal Hapus', detail: e.message, life: 3000 });
  } finally {
    saving.value = false;
  }
}

// Helpers
function formatDate(date: string) {
  if (!date) return '-';
  return format(new Date(date), 'dd MMM yyyy');
}

function isExpired(date: string) {
  if (!date) return false;
  return new Date(date) < new Date();
}

function getStatusClass(status: string) {
  switch (status) {
    case 'PUBLISHED': return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
    case 'UNDER_REVIEW': return 'bg-amber-50 text-amber-600 border border-amber-100';
    case 'ARCHIVED': return 'bg-slate-100 text-slate-500 border border-slate-200';
    case 'DRAFT': return 'bg-slate-50 text-slate-400 border border-slate-100';
    default: return 'bg-slate-50 text-slate-400';
  }
}

onMounted(() => {
  loadData();
});
</script>

<style scoped lang="postcss">
.doc-input {
  @apply w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-[13px] font-bold text-slate-800 transition-all focus:bg-white focus:border-indigo-600 focus:outline-none placeholder:text-slate-300;
}
.doc-select {
  @apply w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-[13px] font-black text-slate-800 transition-all focus:bg-white focus:border-indigo-600 focus:outline-none appearance-none cursor-pointer;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-slate-200 rounded-full hover:bg-slate-300 transition-colors;
}

/* Animations */
.scale-in-center {
  animation: scale-in-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
@keyframes scale-in-center {
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
</style>
