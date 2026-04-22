<template>
  <div class="p-4 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section (Premium Document Style) -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 overflow-hidden relative p-8 rounded-xl bg-white border border-slate-200 shadow-sm">
      <div class="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-slate-800 text-white text-[10px] font-black uppercase tracking-widest rounded-full">DocControl</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-slate-900">Quality Management Repository</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2">SOP & <span class="text-indigo-600">Dokumen ISO</span></h1>
        <p class="text-slate-500 text-sm font-medium">Pusat dokumentasi standar operasional, instruksi kerja, dan sertifikasi mutu terpadu.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="loadDocs" :loading="loading" />
        <Button label="Registrasi Dokumen Baru" icon="pi pi-plus" class="p-button-rounded font-black text-xs shadow-lg shadow-indigo-100 bg-indigo-600 border-none text-white px-6 h-12" @click="openCreate" />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <!-- Categories / Sidebar -->
      <div class="md:col-span-1 space-y-4">
        <div class="p-4 rounded-xl bg-indigo-900 text-white shadow-xl shadow-indigo-200 overflow-hidden relative">
           <div class="absolute -right-4 -bottom-4 opacity-10">
              <i class="pi pi-folder-open text-[100px]"></i>
           </div>
           <h3 class="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-4">Pustaka Kategori</h3>
           <div class="space-y-2 relative z-10">
              <div v-for="cat in categories" :key="cat.label" 
                   @click="filters.category = cat.value"
                   :class="['flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-300', filters.category === cat.value ? 'bg-white/20 font-black' : 'hover:bg-white/10 opacity-70']">
                 <div class="flex items-center gap-3">
                    <i :class="[cat.icon, 'text-xs']"></i>
                    <span class="text-xs uppercase tracking-wider">{{ cat.label }}</span>
                 </div>
                 <span class="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-lg">{{ getCount(cat.value) }}</span>
              </div>
           </div>
        </div>

        <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
           <h3 class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Filter Status</h3>
           <div class="space-y-3">
              <div class="flex items-center gap-2">
                 <RadioButton v-model="filters.status" inputId="st1" name="status" value="ALL" />
                 <label for="st1" class="text-[10px] font-black text-slate-600 uppercase">Semua Status</label>
              </div>
              <div class="flex items-center gap-2">
                 <RadioButton v-model="filters.status" inputId="st2" name="status" value="PUBLISHED" />
                 <label for="st2" class="text-[10px] font-black text-slate-600 uppercase">Berlaku (Published)</label>
              </div>
              <div class="flex items-center gap-2">
                 <RadioButton v-model="filters.status" inputId="st3" name="status" value="UNDER_REVIEW" />
                 <label for="st3" class="text-[10px] font-black text-slate-600 uppercase">Proses Peninjauan</label>
              </div>
              <div class="flex items-center gap-2">
                 <RadioButton v-model="filters.status" inputId="st4" name="status" value="DRAFT" />
                 <label for="st4" class="text-[10px] font-black text-slate-600 uppercase">Draf / Revisi</label>
              </div>
           </div>
        </div>
      </div>

      <!-- Document List Area -->
      <div class="md:col-span-3">
        <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
           <div class="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/10">
              <div class="flex items-center gap-3">
                 <div class="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100">
                    <i class="pi pi-search text-slate-400 text-xs"></i>
                 </div>
                 <InputText v-model="search" placeholder="Cari Kode atau Judul Dokumen..." class="border-none bg-transparent font-bold text-sm w-80 focus:ring-0 outline-none" @input="loadDocs" />
              </div>
              <div class="flex items-center gap-2">
                 <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Urutkan:</div>
                 <select class="bg-transparent text-[10px] font-black uppercase outline-none cursor-pointer">
                    <option>Terbaru</option>
                    <option>Kode Dokumen</option>
                 </select>
              </div>
           </div>

           <div v-if="loading" class="flex-1 flex flex-col items-center justify-center p-20 gap-4">
              <div class="w-12 h-12 rounded-full border-4 border-slate-100 border-t-indigo-600 animate-spin"></div>
              <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sinkronisasi Pustaka...</span>
           </div>

           <div v-else-if="docs.length === 0" class="flex-1 flex flex-col items-center justify-center p-20 text-center text-slate-400 font-bold uppercase text-[10px] tracking-widest">
              Tidak Ada Dokumen
           </div>

           <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-4 p-8">
              <div v-for="doc in docs" :key="doc.id" 
                    class="group p-4 rounded-3xl border border-slate-100 bg-white hover:border-indigo-200 hover:shadow-xl transition-all duration-300 relative cursor-pointer"
                    @click="openView(doc)">
                 <div :class="['absolute top-4 right-6 px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-wider border transition-all group-hover:scale-110 shadow-sm', getStatusClass(doc.status)]">
                    {{ doc.status.replace('_', ' ') }}
                 </div>
                 
                 <div class="flex gap-4 items-start">
                    <div :class="['w-12 h-12 rounded-2xl flex items-center justify-center text-xl text-white shadow-lg transition-transform group-hover:rotate-6', getCatColor(doc.category)]">
                       <i :class="getCatIcon(doc.category)"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                       <h4 class="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">{{ doc.code }} · v{{ doc.version }}</h4>
                       <h3 class="text-sm font-black text-slate-900 leading-tight mb-2 truncate group-hover:text-indigo-600 transition-colors">{{ doc.title }}</h3>
                       <div class="flex items-center gap-3">
                          <div class="flex items-center gap-1 text-[9px] font-bold text-slate-400">
                             <i class="pi pi-user text-[8px]"></i> {{ doc.owner?.name || 'Admin' }}
                          </div>
                          <div class="flex items-center gap-1 text-[9px] font-bold text-slate-400">
                             <i class="pi pi-calendar text-[8px]"></i> {{ formatDate(doc.effectiveDate) }}
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>

    <!-- Registration & Viewer Modal (Centered Premium Dialog) -->
    <Dialog v-model:visible="modalVisible" modal class="w-[800px]" :pt="{ mask: { class: 'backdrop-blur-sm bg-black/20' }, content: { class: 'p-0 rounded-xl overflow-hidden shadow-2xl transition-all' }, header: { class: 'hidden' } }">
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-8 border-b border-slate-100 bg-white shadow-sm">
        <div class="flex items-center gap-4">
          <div :class="['w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xl', isNew ? 'bg-indigo-600' : getCatColor(activeDoc?.category)]">
            <i :class="[isNew ? 'pi pi-cloud-upload' : getCatIcon(activeDoc?.category), 'text-xl']"></i>
          </div>
          <div>
            <h4 class="text-xl font-black text-slate-900 leading-tight">{{ isNew ? 'Registrasi Dokumen Mutu' : activeDoc?.title }}</h4>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">{{ isNew ? 'Submit Request DocControl' : `${activeDoc?.code} / v${activeDoc?.version}` }}</p>
          </div>
        </div>
        <Button icon="pi pi-times" severity="secondary" rounded text @click="modalVisible = false" />
      </div>

      <div class="p-8 space-y-8 max-h-[70vh] overflow-y-auto bg-slate-50/30">
        <!-- New Registration Form -->
        <div v-if="isNew" class="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
           <div class="col-span-2 space-y-2">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Judul Dokumen Resmi</label>
              <InputText v-model="form.title" class="w-full text-sm font-bold p-4 rounded-2xl border-slate-200 outline-none h-12" placeholder="Nama lengkap SOP / Dokumen..." />
           </div>
           <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Kode Dokumen</label>
              <InputText v-model="form.code" class="w-full text-sm font-bold p-4 rounded-xl border-slate-200 outline-none h-10 font-mono" placeholder="Contoh: QM-SOP-HR-01" />
           </div>
           <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Kategori Dokumen</label>
              <select v-model="form.category" class="w-full text-xs font-black p-2.5 rounded-xl border border-slate-200 outline-none bg-white shadow-sm h-10">
                 <option value="SOP">SOP - Standard Prosedur</option>
                 <option value="ISO">ISO - Sertifikasi Standar</option>
                 <option value="WI">WI - Instruksi Kerja</option>
                 <option value="FORM">FORM - Formulir Mutu</option>
              </select>
           </div>
           <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Tanggal Efektif</label>
              <InputText v-model="form.effectiveDate" type="date" class="w-full text-xs font-bold rounded-xl border-slate-200 h-10" />
           </div>
           <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Versi Awal</label>
              <InputText v-model="form.version" class="w-full text-xs font-bold rounded-xl border-slate-200 h-10" placeholder="1.0" />
           </div>
           <div class="col-span-2 p-4 rounded-xl border-2 border-dashed border-indigo-200 bg-indigo-50/20 text-center flex flex-col items-center gap-2 group hover:border-indigo-400 transition-colors cursor-pointer">
              <i class="pi pi-file-pdf text-3xl text-indigo-400 group-hover:scale-110 transition-transform"></i>
              <div class="text-[10px] font-black uppercase text-indigo-600">Unggah File Dokumen (PDF)</div>
              <div class="text-[9px] text-slate-400">Seret file ke sini atau klik untuk mencari. Max 10MB.</div>
           </div>
        </div>

        <!-- Viewer Content (Read Only) -->
        <div v-else class="space-y-8 animate-fade-in">
          <div class="p-8 rounded-xl bg-indigo-950 text-white relative overflow-hidden flex flex-col items-center text-center shadow-xl">
             <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent"></div>
             <i class="pi pi-file-pdf text-6xl text-rose-500 mb-4 relative z-10 shadow-sm"></i>
             <h3 class="text-lg font-black mb-2 relative z-10 tracking-tight">Digital Vault Preview</h3>
             <p class="text-xs text-indigo-200/60 font-medium relative z-10">Dokumen terenkripsi dan diverifikasi oleh sistem penjaminan mutu.</p>
             <div class="flex gap-3 mt-8 relative z-10">
                <Button label="Buka Digital File" icon="pi pi-eye" class="p-button-rounded bg-white border-none text-indigo-900 font-black text-[10px] uppercase px-8 h-10 shadow-lg shadow-indigo-400/20" />
                <Button label="Download PDF" severity="secondary" outlined class="p-button-rounded text-white border-white/20 font-black text-[10px] uppercase px-6 h-10" />
             </div>
          </div>

          <div class="grid grid-cols-2 gap-8">
             <div class="space-y-4 p-4 rounded-3xl bg-white border border-slate-100 shadow-sm">
                <div class="flex items-center gap-3">
                   <div class="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-xs"><i class="pi pi-shield text-indigo-500"></i></div>
                   <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Validitas & Reviu</h4>
                </div>
                <div class="space-y-3">
                   <div class="flex justify-between items-center border-b border-dashed pb-2">
                      <span class="text-[10px] font-black text-slate-400 uppercase">Efektif</span>
                      <span class="text-xs font-bold text-slate-700">{{ formatDate(activeDoc?.effectiveDate) }}</span>
                   </div>
                   <div class="flex justify-between items-center">
                      <span class="text-[10px] font-black text-slate-400 uppercase">Kedaluwarsa</span>
                      <span class="text-xs font-bold text-slate-700">{{ formatDate(activeDoc?.expiryDate) }}</span>
                   </div>
                </div>
             </div>
             <div class="space-y-4 p-4 rounded-3xl bg-white border border-slate-100 shadow-sm">
                <div class="flex items-center gap-3">
                   <div class="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-xs"><i class="pi pi-user text-indigo-500"></i></div>
                   <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Custodian</h4>
                </div>
                <div class="space-y-1">
                   <div class="text-xs font-black text-slate-900">{{ activeDoc?.owner?.name || 'DocControl Manager' }}</div>
                   <div class="text-[9px] font-bold text-indigo-500 uppercase tracking-widest">Sertifikasi Grade A</div>
                   <div class="text-[9px] text-slate-400 italic mt-2">Didaftarkan: {{ formatDate(activeDoc?.createdAt) }}</div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="p-8 border-t border-slate-100 bg-white flex justify-end gap-3 rounded-b-[2.5rem] shadow-sm">
        <Button label="Tutup Repositori" severity="secondary" text @click="modalVisible = false" class="font-black text-[10px] uppercase px-6" />
        <div class="flex gap-2">
           <Button v-if="isNew" label="Simpan Draft" severity="secondary" outlined class="font-black text-[10px] uppercase px-6 h-12 rounded-2xl" @click="saveDoc(false)" :loading="saving" />
           <Button v-if="isNew" label="Submit for Approval" icon="pi pi-check-circle" class="p-button-rounded font-black text-[10px] uppercase px-8 bg-indigo-600 border-none text-white shadow-lg shadow-indigo-100 h-12 hover:bg-indigo-700" @click="saveDoc(true)" :loading="saving" />
           <Button v-if="!isNew && activeDoc?.status === 'DRAFT'" label="Ajukan Persetujuan (Workflow)" icon="pi pi-send" class="p-button-rounded font-black text-[10px] uppercase px-8 bg-indigo-600 border-none text-white h-12 shadow-lg shadow-indigo-100" @click="submitWorkflow(activeDoc.id)" :loading="saving" />
        </div>
      </div>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import { useApi } from '@/composables/useApi';

const api = useApi();
const toast = useToast();

const loading = ref(false);
const saving = ref(false);
const modalVisible = ref(false);
const isNew = ref(false);

const docs = ref<any[]>([]);
const search = ref('');
const activeDoc = ref<any>(null);

const filters = reactive({
  category: 'ALL',
  status: 'ALL',
  search: ''
});

const form = reactive({
  title: '',
  code: '',
  category: 'SOP',
  version: '1.0',
  effectiveDate: '',
  notes: ''
});

const categories = [
  { label: 'Semua Dokumen', value: 'ALL', icon: 'pi pi-server' },
  { label: 'SOP (Standard Prosedur)', value: 'SOP', icon: 'pi pi-book', bg: 'bg-blue-600' },
  { label: 'Sertifikasi ISO', value: 'ISO', icon: 'pi pi-shield', bg: 'bg-emerald-600' },
  { label: 'Work Instruction (WI)', value: 'WI', icon: 'pi pi-directions', bg: 'bg-amber-600' },
  { label: 'Formulir Kualitas', value: 'FORM', icon: 'pi pi-file-edit', bg: 'bg-indigo-600' },
];

async function loadDocs() {
  loading.value = true;
  try {
    const params: any = { ...filters };
    if (params.category === 'ALL') delete params.category;
    if (params.status === 'ALL') delete params.status;
    const res = await api.get('/qms/documents', { params });
    docs.value = res.data.list;
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal Memuat', detail: e.message });
  } finally {
    loading.value = false;
  }
}

function openCreate() {
  isNew.value = true;
  activeDoc.value = null;
  Object.assign(form, {
    title: '',
    code: '',
    category: 'SOP',
    version: '1.0',
    effectiveDate: new Date().toISOString().split('T')[0],
    notes: ''
  });
  modalVisible.value = true;
}

function openView(doc: any) {
  isNew.value = false;
  activeDoc.value = doc;
  modalVisible.value = true;
}

async function saveDoc(submit: boolean) {
  if (!form.title || !form.code) {
    toast.add({ severity: 'warn', summary: 'Gagal', detail: 'Isi judul dan kode dokumen.' });
    return;
  }

  saving.value = true;
  try {
    const res = await api.post('/qms/documents', form);
    const docId = res.data.document.id;

    if (submit) {
      await api.post(`/qms/documents/${docId}/submit`);
      toast.add({ severity: 'success', summary: 'Workflow Aktif', detail: 'Dokumen dikirim untuk persetujuan.' });
    } else {
      toast.add({ severity: 'success', summary: 'Selesai', detail: 'Draft dokumen berhasil disimpan.' });
    }

    modalVisible.value = false;
    loadDocs();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: e.message });
  } finally {
    saving.value = false;
  }
}

async function submitWorkflow(id: string) {
  saving.value = true;
  try {
    await api.post(`/qms/documents/${id}/submit`);
    toast.add({ severity: 'success', summary: 'Workflow Aktif', detail: 'Permintaan persetujuan telah dikirim.' });
    modalVisible.value = false;
    loadDocs();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: e.message });
  } finally {
    saving.value = false;
  }
}

function getCount(cat: string) {
  if (cat === 'ALL') return docs.value.length;
  return docs.value.filter(d => d.category === cat).length;
}

const formatDate = (dateStr: any) => {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
};

const getStatusClass = (status: string) => {
  switch (status) {
    case 'PUBLISHED': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
    case 'UNDER_REVIEW': return 'bg-amber-50 text-amber-700 border-amber-100';
    case 'DRAFT': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
    case 'OBSOLETE': return 'bg-rose-50 text-rose-700 border-rose-100';
    default: return 'bg-slate-50 text-slate-600 border-slate-100';
  }
};

const getCatColor = (cat: string) => categories.find(i => i.value === cat)?.bg || 'bg-slate-900';
const getCatIcon = (cat: string) => categories.find(i => i.value === cat)?.icon || 'pi pi-file';

onMounted(loadDocs);
watch(() => [filters.category, filters.status], loadDocs);
</script>

<style scoped>
:deep(.p-radiobutton .p-radiobutton-box) {
  border-radius: 6px;
  border-color: #e2e8f0;
}
:deep(.p-radiobutton .p-radiobutton-box.p-highlight) {
  background: #4f46e5;
  border-color: #4f46e5;
}
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
