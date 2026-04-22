<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-4 shadow-sm border-l-4 border-l-violet-600 relative overflow-hidden">
      <div class="absolute right-[-12px] top-[-12px] opacity-5 pointer-events-none">
        <i class="pi pi-directions text-[150px] text-violet-900"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-start gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-directions text-violet-700"></i> Mutasi & Disiplin (Movements & Disciplinary)
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
            Pantau sejarah promosi, mutasi, demosi, serta tindakan disipliner (SP) karyawan di seluruh cabang dan departemen.
          </div>
        </div>
        <div class="flex gap-2 shrink-0">
          <Button label="+ Mutasi/Promosi" size="small" icon="pi pi-arrows-h" class="bg-violet-700 text-white border-none font-bold" @click="openModal('MOVEMENT')" />
          <Button label="+ Tindakan Disiplin" size="small" icon="pi pi-shield" class="bg-rose-700 text-white border-none font-bold" @click="openModal('DISC')" />
        </div>
      </div>
    </div>

    <!-- Main Content Tabs -->
    <div class="bg-white border rounded-xl shadow-sm overflow-hidden">
      <div class="flex border-b bg-slate-50/50">
        <button v-for="t in ['Movements', 'Disciplinary']" :key="t" 
          @click="tab = t"
          :class="tab === t ? 'border-b-2 border-violet-600 text-violet-700 bg-white' : 'text-slate-500 hover:bg-slate-50'"
          class="px-6 py-4 text-sm font-black transition">
          {{ t === 'Movements' ? '🔄 Riwayat Mutasi' : '⚖️ Tindakan Disiplin (SP)' }}
        </button>
      </div>

      <!-- Movements View -->
      <div v-if="tab === 'Movements'" class="p-4">
         <!-- Search/Filter -->
         <div class="mb-4">
           <select v-model="selectedEmp" @change="loadDetails" class="w-full md:w-64 border rounded-lg p-2 text-sm font-bold">
             <option value="">— Pilih Karyawan untuk Lihat Riwayat —</option>
             <option v-for="e in employees" :key="e.id" :value="e.id">{{ e.firstName }} {{ e.lastName }} ({{ e.employeeNo }})</option>
           </select>
         </div>

         <div v-if="movements.length > 0" class="relative pl-8 border-l-2 border-slate-100 space-y-8">
            <div v-for="m in movements" :key="m.id" class="relative">
              <div class="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-violet-600 border-4 border-white shadow-sm"></div>
              <div class="bg-slate-50 border rounded-xl p-4">
                <div class="flex justify-between items-start">
                  <div>
                    <span class="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-violet-100 text-violet-700 border border-violet-200">
                      {{ m.type }}
                    </span>
                    <div class="text-sm font-black text-slate-800 mt-1">{{ formatDate(m.effectiveDate) }}</div>
                  </div>
                  <div class="text-right">
                    <div class="text-[10px] text-slate-400 font-bold">DIPROSES PADA</div>
                    <div class="text-[10px] text-slate-600">{{ formatDate(m.createdAt) }}</div>
                  </div>
                </div>
                <div class="mt-3 grid grid-cols-2 gap-4">
                  <div class="space-y-1">
                    <div class="text-[9px] font-black text-slate-400 uppercase">Dari</div>
                    <div class="text-xs font-bold text-slate-700">{{ m.fromDept }} — {{ m.fromPos }}</div>
                  </div>
                   <div class="space-y-1">
                    <div class="text-[9px] font-black text-violet-400 uppercase">Menjadi</div>
                    <div class="text-xs font-black text-violet-700">{{ m.toDept }} — {{ m.toPos }}</div>
                  </div>
                </div>
                <div v-if="m.reason" class="mt-2 text-xs text-slate-500 italic">"{{ m.reason }}"</div>
              </div>
            </div>
         </div>
         <div v-else-if="selectedEmp" class="py-12 text-center text-slate-400 italic">Tidak ada riwayat mutasi untuk karyawan ini.</div>
         <div v-else class="py-12 text-center text-slate-400">Silakan pilih karyawan untuk melihat riwayat log.</div>
      </div>

      <!-- Disciplinary View -->
      <div v-else class="p-4">
         <div class="mb-4">
           <select v-model="selectedEmp" @change="loadDetails" class="w-full md:w-64 border rounded-lg p-2 text-sm font-bold">
             <option value="">— Pilih Karyawan —</option>
             <option v-for="e in employees" :key="e.id" :value="e.id">{{ e.firstName }} {{ e.lastName }}</option>
           </select>
         </div>

         <div v-if="disciplinary.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="d in disciplinary" :key="d.id" class="border rounded-xl p-4 shadow-sm relative overflow-hidden" :class="d.status==='ACTIVE'?'bg-rose-50/50 border-rose-200':'bg-slate-50 opacity-60'">
               <div v-if="d.status==='ACTIVE'" class="absolute -right-4 -top-4 opacity-10">
                 <i class="pi pi-exclamation-triangle text-6xl text-rose-900"></i>
               </div>
               <div class="flex justify-between items-center mb-3">
                 <span class="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest" :class="d.status==='ACTIVE'?'bg-rose-600 text-white':'bg-slate-200 text-slate-500'">
                   {{ d.type }}
                 </span>
                 <span class="text-[10px] font-bold text-slate-400">{{ d.status }}</span>
               </div>
               <div class="text-sm font-black text-slate-800">{{ formatDate(d.issueDate) }}</div>
               <div class="text-xs text-rose-700 font-bold mt-0.5" v-if="d.expiryDate">Berlaku s/d {{ formatDate(d.expiryDate) }}</div>
               <div class="mt-3 text-xs text-slate-600 leading-relaxed">{{ d.reason }}</div>
            </div>
         </div>
         <div v-else-if="selectedEmp" class="py-12 text-center text-slate-400 italic">Karyawan ini bersih dari catatan disipliner.</div>
         <div v-else class="py-12 text-center text-slate-400">Pilih karyawan untuk melihat catatan kedisiplinan.</div>
      </div>
    </div>

    <!-- Modal Movement/Disc -->
    <div v-if="modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
       <div class="w-full max-w-md bg-white rounded-2xl shadow-2xl animate-fade-in-up">
          <div class="p-5 border-b bg-slate-50 rounded-t-2xl flex justify-between">
            <div class="font-black text-slate-800">{{ modalType === 'MOVEMENT' ? '🔄 Catat Mutasi/Promosi' : '⚖️ Terbitkan Sanksi (SP)' }}</div>
            <button @click="modal = false">✕</button>
          </div>
          <div class="p-4 space-y-4">
             <div class="space-y-1">
               <label class="text-[10px] font-black text-slate-500 uppercase">Karyawan</label>
               <select v-model="form.employeeId" class="w-full border rounded-lg p-2 text-sm" @change="prefillFrom">
                 <option v-for="e in employees" :key="e.id" :value="e.id">{{ e.firstName }} {{ e.lastName }}</option>
               </select>
             </div>

             <!-- MOVEMENT FIELDS -->
             <template v-if="modalType === 'MOVEMENT'">
               <div class="space-y-1">
                 <label class="text-[10px] font-black text-slate-500 uppercase">Tipe</label>
                 <select v-model="form.type" class="w-full border rounded-lg p-2 text-sm">
                   <option value="PROMOTION">Promosi Jabatan</option>
                   <option value="MUTATION">Mutasi Lokasi/Dept</option>
                   <option value="DEMOTION">Demosi</option>
                 </select>
               </div>
               <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-1 opacity-60">
                    <label class="text-[10px] font-black text-slate-500 uppercase">Dept Lama</label>
                    <input v-model="form.fromDept" readonly class="w-full border bg-slate-100 rounded-lg p-2 text-sm" />
                  </div>
                  <div class="space-y-1">
                    <label class="text-[10px] font-black text-violet-500 uppercase">Dept Baru</label>
                    <input v-model="form.toDept" class="w-full border border-violet-200 rounded-lg p-2 text-sm" />
                  </div>
               </div>
               <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-1 opacity-60">
                    <label class="text-[10px] font-black text-slate-500 uppercase">Jabatan Lama</label>
                    <input v-model="form.fromPos" readonly class="w-full border bg-slate-100 rounded-lg p-2 text-sm" />
                  </div>
                  <div class="space-y-1">
                    <label class="text-[10px] font-black text-violet-500 uppercase">Jabatan Baru</label>
                    <input v-model="form.toPos" class="w-full border border-violet-200 rounded-lg p-2 text-sm" />
                  </div>
               </div>
             </template>

             <!-- DISC FIELDS -->
             <template v-else>
                <div class="space-y-1">
                 <label class="text-[10px] font-black text-slate-500 uppercase">Tipe Sanksi</label>
                 <select v-model="form.type" class="w-full border rounded-lg p-2 text-sm font-bold text-rose-700">
                   <option value="TEGURAN_LISAN">Teguran Lisan</option>
                   <option value="SP1">Surat Peringatan 1 (SP1)</option>
                   <option value="SP2">Surat Peringatan 2 (SP2)</option>
                   <option value="SP3">Surat Peringatan 3 (SP3)</option>
                 </select>
               </div>
               <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-1">
                    <label class="text-[10px] font-black text-slate-500 uppercase">Tgl Terbit</label>
                    <input type="date" v-model="form.issueDate" class="w-full border rounded-lg p-2 text-sm" />
                  </div>
                  <div class="space-y-1">
                    <label class="text-[10px] font-black text-slate-500 uppercase">Tgl Berakhir</label>
                    <input type="date" v-model="form.expiryDate" class="w-full border rounded-lg p-2 text-sm" />
                  </div>
               </div>
             </template>

             <div class="space-y-1">
               <label class="text-[10px] font-black text-slate-500 uppercase">Alasan / Catatan</label>
               <textarea v-model="form.reason" class="w-full border rounded-lg p-2 text-sm" rows="2"></textarea>
             </div>
          </div>
          <div class="p-4 border-t bg-slate-50 flex justify-end gap-2 rounded-b-2xl">
             <Button label="Batal" @click="modal = false" severity="secondary" outlined />
             <Button :label="modalType==='MOVEMENT'?'Simpan Mutasi':'Terbitkan Sanksi'" 
                :class="modalType==='MOVEMENT'?'bg-violet-700':'bg-rose-700'" 
                class="text-white border-none" @click="submit" />
          </div>
       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const tab = ref('Movements');
const employees = ref([]);
const selectedEmp = ref('');
const movements = ref([]);
const disciplinary = ref([]);
const modal = ref(false);
const modalType = ref('MOVEMENT');
const form = reactive({ employeeId: '', type: '', fromDept: '', toDept: '', fromPos: '', toPos: '', effectiveDate: '', issueDate: '', expiryDate: '', reason: '' });

const load = async () => {
  const res = await api.get('/hris/employees');
  employees.value = res.data.employees;
};

const loadDetails = async () => {
  if (!selectedEmp.value) {
    movements.value = [];
    disciplinary.value = [];
    return;
  }
  const [mRes, dRes] = await Promise.all([
    api.get(`/hris/employees/${selectedEmp.value}/movements`),
    api.get(`/hris/employees/${selectedEmp.value}/disciplinary`),
  ]);
  movements.value = mRes.data.movements;
  disciplinary.value = dRes.data.actions;
};

const openModal = (type: string) => {
  modalType.value = type;
  Object.assign(form, { employeeId: '', type: type === 'MOVEMENT' ? 'PROMOTION' : 'SP1', effectiveDate: new Date().toISOString().split('T')[0], issueDate: new Date().toISOString().split('T')[0], fromDept: '', fromPos: '', toDept: '', toPos: '', reason: '' });
  modal.value = true;
};

const prefillFrom = () => {
  const e = employees.value.find(emp => emp.id === form.employeeId);
  if (e) {
    form.fromDept = e.department || '';
    form.fromPos = e.position || '';
    form.toDept = e.department || '';
    form.toPos = e.position || '';
  }
};

const submit = async () => {
  if (modalType.value === 'MOVEMENT') {
    await api.post(`/hris/employees/${form.employeeId}/movements`, form);
  } else {
    await api.post(`/hris/employees/${form.employeeId}/disciplinary`, form);
  }
  modal.value = false;
  loadDetails();
};

const formatDate = (d: string) => new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });

onMounted(load);
</script>
