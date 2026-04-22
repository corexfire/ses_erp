<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-4 shadow-sm border-l-4 border-l-emerald-600 relative overflow-hidden">
      <div class="absolute right-[-12px] top-[-12px] opacity-5 pointer-events-none">
        <i class="pi pi-briefcase text-[150px] text-emerald-900"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-start gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-stopwatch text-emerald-700"></i> Timesheets & Dokumen (Productivity)
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
            Pantau pemanfaatan waktu kerja karyawan per proyek serta kelola dokumen digital (dossier) seperti kontrak dan sertifikat.
          </div>
        </div>
        <div class="flex gap-2 shrink-0">
          <Button label="+ Catat Timesheet" size="small" icon="pi pi-plus" class="bg-emerald-700 text-white border-none font-bold shadow-sm hover:bg-emerald-800" @click="openModal('TIMESHEET')" />
          <Button label="+ Upload Dokumen" size="small" icon="pi pi-upload" outlined class="font-bold border-emerald-400 text-emerald-700 hover:bg-emerald-50" @click="openModal('DOC')" />
        </div>
      </div>
    </div>

    <!-- Main Content Tabs -->
    <div class="bg-white border rounded-xl shadow-sm overflow-hidden">
      <div class="flex border-b bg-slate-50/50">
        <button v-for="t in ['Timesheets', 'Dossier']" :key="t" 
          @click="tab = t"
          :class="tab === t ? 'border-b-2 border-emerald-600 text-emerald-700 bg-white' : 'text-slate-500 hover:bg-slate-50'"
          class="px-6 py-4 text-sm font-black transition">
          {{ t === 'Timesheets' ? '⏱️ Timesheet Kerja' : '📁 Berkas Digital (Dossier)' }}
        </button>
      </div>

      <!-- Timesheet View -->
      <div v-if="tab === 'Timesheets'" class="p-0">
        <div class="p-4 border-b bg-slate-50 flex justify-between items-center text-xs">
          <div class="font-bold text-slate-500">Log Penggunaan Waktu Per Tanggal</div>
          <input type="date" v-model="filterDate" class="border rounded px-2 py-1 outline-none" @change="loadTimesheets" />
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-slate-50/50 text-left text-[11px] text-slate-400 uppercase tracking-widest font-bold">
              <tr>
                <th class="px-5 py-3">Karyawan</th>
                <th class="px-4 py-3 border-l">Proyek / Tugas</th>
                <th class="px-4 py-3 border-l text-center">Durasi</th>
                <th class="px-4 py-3 border-l">Keterangan</th>
                <th class="px-4 py-3 border-l text-center">Tgl Input</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ts in timesheets" :key="ts.id" class="border-t hover:bg-slate-50/50 transition">
                <td class="px-5 py-3">
                  <div class="font-black text-slate-800">{{ ts.employee?.firstName }}</div>
                </td>
                <td class="px-4 py-3 border-l font-bold text-slate-700">
                  <span class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 mr-2">{{ ts.project || 'General' }}</span>
                </td>
                <td class="px-4 py-3 border-l text-center font-black text-slate-800">
                  {{ ts.hours }} Jam
                </td>
                <td class="px-4 py-3 border-l text-xs text-slate-500 italic max-w-xs truncate">
                  {{ ts.description || '-' }}
                </td>
                <td class="px-4 py-3 border-l text-center text-[10px] text-slate-400 font-bold">
                  {{ formatDate(ts.createdAt) }}
                </td>
              </tr>
              <tr v-if="timesheets.length === 0">
                <td colspan="5" class="px-5 py-12 text-center text-slate-400 italic font-medium">Belum ada data timesheet untuk periode ini.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Dossier View -->
      <div v-else class="p-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div v-for="doc in documents" :key="doc.id" class="group bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition relative border-t-4" :class="getTypeColor(doc.type)">
              <div class="absolute right-4 top-4 text-slate-100 group-hover:text-slate-200 transition">
                <i class="pi pi-file text-4xl"></i>
              </div>
              <div class="flex items-center gap-3 mb-4">
                 <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition">
                   <i class="pi pi-paperclip"></i>
                 </div>
                 <div>
                   <div class="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{{ doc.type }}</div>
                   <div class="text-sm font-black text-slate-800 leading-tight">{{ doc.name }}</div>
                 </div>
              </div>
              <div class="mb-4">
                <div class="text-[9px] font-black text-slate-400 uppercase">Pemilik Dokumen</div>
                <div class="text-xs font-bold text-slate-700">{{ doc.employee?.firstName }} {{ doc.employee?.lastName }}</div>
              </div>
              <div class="flex justify-between items-end">
                <div v-if="doc.expiryDate">
                   <div class="text-[9px] font-black text-rose-400 uppercase">Kadaluarsa</div>
                   <div class="text-[10px] font-bold text-rose-700">{{ formatDate(doc.expiryDate) }}</div>
                </div>
                <div v-else></div>
                <a :href="doc.fileUrl" target="_blank" class="text-[10px] font-black text-emerald-600 hover:underline flex items-center gap-1">
                  LIHAT BERKAS <i class="pi pi-external-link"></i>
                </a>
              </div>
           </div>
           <div v-if="documents.length === 0" class="col-span-3 py-20 text-center text-slate-400">
             <i class="pi pi-folder-open text-5xl mb-3 block opacity-20"></i>
             <div class="italic">Belum ada dokumen yang diupload.</div>
           </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <div v-if="modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
       <div class="w-full max-w-md bg-white rounded-2xl shadow-2xl animate-fade-in-up overflow-hidden">
          <div class="p-5 border-b bg-slate-50 flex justify-between">
            <div class="font-black text-slate-800">{{ modalType === 'TIMESHEET' ? '⏱️ Catat Timesheet Pekerjaan' : '📁 Upload Dokumen Baru' }}</div>
            <button @click="modal = false">✕</button>
          </div>
          <div class="p-4 space-y-4">
             <div class="space-y-1">
               <label class="text-[10px] font-black text-slate-500 uppercase">Karyawan</label>
               <select v-model="form.employeeId" class="w-full border rounded-lg p-2 text-sm">
                 <option v-for="e in employees" :key="e.id" :value="e.id">{{ e.firstName }} {{ e.lastName }}</option>
               </select>
             </div>

             <!-- TIMESHEET FIELDS -->
             <template v-if="modalType === 'TIMESHEET'">
                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-1">
                    <label class="text-[10px] font-black text-slate-500 uppercase">Tanggal</label>
                    <input type="date" v-model="form.date" class="w-full border rounded-lg p-2 text-sm" />
                  </div>
                  <div class="space-y-1">
                    <label class="text-[10px] font-black text-slate-500 uppercase">Jam Kerja</label>
                    <input type="number" v-model.number="form.hours" class="w-full border rounded-lg p-2 text-sm" />
                  </div>
                </div>
                <div class="space-y-1">
                  <label class="text-[10px] font-black text-slate-500 uppercase">Proyek</label>
                  <input v-model="form.project" placeholder="Contoh: Project Alpha" class="w-full border rounded-lg p-2 text-sm" />
                </div>
             </template>

             <!-- DOC FIELDS -->
             <template v-else>
                <div class="space-y-1">
                  <label class="text-[10px] font-black text-slate-500 uppercase">Nama Dokumen</label>
                  <input v-model="form.name" class="w-full border rounded-lg p-2 text-sm" placeholder="Contoh: KTP_Budi.pdf" />
                </div>
                <div class="space-y-1">
                  <label class="text-[10px] font-black text-slate-500 uppercase">Tipe</label>
                  <select v-model="form.type" class="w-full border rounded-lg p-2 text-sm">
                    <option value="CONTRACT">Kontrak Kerja</option>
                    <option value="ID_CARD">KTP / Paspor</option>
                    <option value="CERTIFICATE">Sertifikasi / Pelatihan</option>
                    <option value="OTHER">Lain-lain</option>
                  </select>
                </div>
                <div class="space-y-1">
                    <label class="text-[10px] font-black text-slate-500 uppercase">Tgl Kadaluarsa (Opsional)</label>
                    <input type="date" v-model="form.expiryDate" class="w-full border rounded-lg p-2 text-sm" />
                </div>
                 <div class="space-y-1">
                    <label class="text-[10px] font-black text-slate-500 uppercase">URL File</label>
                    <input v-model="form.fileUrl" placeholder="https://storage.ses-erp.com/..." class="w-full border bg-slate-50 rounded-lg p-2 text-sm italic" />
                </div>
             </template>

             <div class="space-y-1">
               <label class="text-[10px] font-black text-slate-500 uppercase">Keterangan</label>
               <textarea v-model="form.description" class="w-full border rounded-lg p-2 text-sm" rows="2"></textarea>
             </div>
          </div>
          <div class="p-4 border-t bg-slate-50 flex justify-end gap-2">
             <Button label="Batal" @click="modal = false" severity="secondary" outlined />
             <Button label="Simpan Data" class="bg-emerald-700 text-white border-none" @click="submit" />
          </div>
       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const tab = ref('Timesheets');
const employees = ref([]);
const timesheets = ref([]);
const documents = ref([]);
const filterDate = ref(new Date().toISOString().split('T')[0]);
const modal = ref(false);
const modalType = ref('TIMESHEET');
const form = reactive({ employeeId: '', date: '', hours: 8, project: '', name: '', type: 'CONTRACT', fileUrl: '', expiryDate: '', description: '' });

const load = async () => {
  const eRes = await api.get('/hris/employees');
  employees.value = eRes.data.employees;
  loadTimesheets();
  loadDocuments();
};

const loadTimesheets = async () => {
  const res = await api.get('/hris/productivity/timesheets', { params: { date: filterDate.value } });
  timesheets.value = res.data.timesheets;
};

const loadDocuments = async () => {
  const res = await api.get('/hris/productivity/documents');
  documents.value = res.data.documents;
};

const openModal = (t: string) => {
  modalType.value = t;
  Object.assign(form, { employeeId: '', date: new Date().toISOString().split('T')[0], hours: 8, project: '', name: '', type: t==='TIMESHEET'?'':'CONTRACT', fileUrl: 'https://placehold.co/400', expiryDate: '', description: '' });
  modal.value = true;
};

const submit = async () => {
  if (modalType.value === 'TIMESHEET') {
    await api.post('/hris/productivity/timesheets', form);
    loadTimesheets();
  } else {
    await api.post('/hris/productivity/documents', form);
    loadDocuments();
  }
  modal.value = false;
};

const formatDate = (d: string) => new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });

const getTypeColor = (t: string) => {
  if (t === 'CONTRACT') return 'border-t-emerald-500';
  if (t === 'ID_CARD') return 'border-t-amber-500';
  if (t === 'CERTIFICATE') return 'border-t-blue-500';
  return 'border-t-slate-500';
};

onMounted(load);
</script>
