<template>
  <div class="p-6 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section (Premium Calibration Style) -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-8 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500 hover:shadow-xl group">
      <div class="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-rose-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Metrology Control</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-rose-600">Equipment Calibration</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2">Kontrol <span class="text-rose-600">Kalibrasi</span></h1>
        <p class="text-slate-500 text-sm font-medium">Pemantauan akurasi alat ukur, sertifikasi laboratorium, dan penjadwalan berkala.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="loadLogs" :loading="loading" />
        <Button label="Catat Hasil Kalibrasi" icon="pi pi-verified" class="p-button-rounded font-black text-xs shadow-lg shadow-rose-100 bg-rose-600 border-none text-white px-6 h-12" @click="openCreate" />
      </div>
    </div>

    <!-- Health Metrics Grid -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
       <div v-for="s in stats" :key="s.label" class="group p-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <i :class="[s.icon, 'text-6xl']"></i>
          </div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ s.label }}</p>
          <h3 class="text-2xl font-black text-slate-900">{{ s.value }}</h3>
          <div class="flex items-center gap-2 mt-2">
             <span :class="['text-[10px] font-bold px-2 py-0.5 rounded-full', s.color]">{{ s.sub || 'Status Alat' }}</span>
          </div>
       </div>
    </div>

    <!-- Main List Space -->
    <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col">
       <div class="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/10">
          <div>
             <h2 class="text-[13px] font-black text-slate-900 uppercase tracking-widest">Pustaka Sertifikasi Alat</h2>
             <p class="text-xs text-slate-500 font-medium">Log riwayat kalibrasi dan masa berlaku sertifikat metrologi.</p>
          </div>
          <div class="flex items-center gap-3">
             <SelectButton v-model="filters.status" :options="['ALL', 'COMPLETED', 'EXPIRED']" class="p-button-sm text-[10px] font-black uppercase" />
          </div>
       </div>

       <DataTable :value="logs" dataKey="id" class="p-datatable-sm w-full" :loading="loading">
          <Column header="PERALATAN" class="pl-8">
             <template #body="{ data }">
                <div class="flex items-center gap-3 py-2">
                   <div class="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                      <i class="pi pi-compass text-slate-400"></i>
                   </div>
                   <div class="flex flex-col">
                      <span class="text-[11px] font-black text-slate-800">{{ data.equipment?.name }}</span>
                      <span class="text-[9px] font-bold text-slate-400 font-mono tracking-tighter">{{ data.equipment?.code }}</span>
                   </div>
                </div>
             </template>
          </Column>
          <Column header="VALIDITAS SERTIFIKAT">
             <template #body="{ data }">
                <div class="flex flex-col">
                   <div class="flex items-center gap-2 mb-1">
                      <span class="text-[11px] font-black text-slate-700">{{ formatDate(data.calibrationDate) }}</span>
                      <i class="pi pi-arrow-right text-[8px] text-slate-300"></i>
                      <span :class="['text-[11px] font-black', isExpiringSoon(data.expiryDate) ? 'text-rose-600 font-black underline decoration-rose-300 decoration-2' : 'text-emerald-600']">
                         {{ formatDate(data.expiryDate) }}
                      </span>
                   </div>
                   <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Sertifikat: {{ data.certificateNo || 'N/A' }}</span>
                </div>
             </template>
          </Column>
          <Column header="LABORATORIUM / PROVIDER">
             <template #body="{ data }">
                <span class="text-[11px] font-bold text-slate-600 group-hover:text-indigo-600 transition-colors">{{ data.provider }}</span>
             </template>
          </Column>
          <Column header="HASIL" class="text-center">
             <template #body="{ data }">
                <span :class="['px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border', data.result === 'PASS' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100']">
                   {{ data.result }}
                </span>
             </template>
          </Column>
          <Column header="STATUS">
             <template #body="{ data }">
                <span :class="['px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest', getStatusClass(data.status)]">
                   {{ data.status }}
                </span>
             </template>
          </Column>
          <Column class="text-right pr-8">
             <template #body="{ data }">
                <div class="flex gap-2 justify-end">
                   <Button icon="pi pi-file-pdf" severity="danger" rounded text v-if="data.certificateUrl" />
                   <Button icon="pi pi-ellipsis-h" severity="secondary" rounded text @click="openView(data)" />
                </div>
             </template>
          </Column>
       </DataTable>
    </div>

    <!-- Action Modal (Centered Premium Dialog) -->
    <Dialog v-model:visible="modalVisible" modal class="w-[700px]" :pt="{ mask: { class: 'backdrop-blur-sm bg-black/20' }, content: { class: 'p-0 rounded-xl overflow-hidden shadow-2xl transition-all' }, header: { class: 'hidden' } }">
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-8 border-b border-slate-100 bg-white">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-rose-900 flex items-center justify-center text-white shadow-xl">
            <i class="pi pi-verified text-xl"></i>
          </div>
          <div>
            <h4 class="text-xl font-black text-slate-900 leading-tight">{{ isNew ? 'Catat Hasil Kalibrasi' : 'Detail Sertifikasi' }}</h4>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Metrology & Compliance Record</p>
          </div>
        </div>
        <Button icon="pi pi-times" severity="secondary" rounded text @click="modalVisible = false" />
      </div>

      <div class="p-8 space-y-8 max-h-[70vh] overflow-y-auto bg-slate-50/30">
        
        <!-- Equipment Selection (New Only) -->
        <div v-if="isNew" class="space-y-4 animate-fade-in">
           <div class="flex items-center gap-3">
             <div class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs">1</div>
             <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Pilih Peralatan</h4>
           </div>
           <div class="space-y-2 pl-9">
              <label class="text-[10px] font-black text-slate-400 uppercase">Alat Ukur / Instrument</label>
              <Select v-model="form.equipmentId" :options="equipments" optionLabel="name" optionValue="id" placeholder="Cari Alat Ukur..." class="w-full text-sm font-bold rounded-2xl shadow-sm border-slate-200" filter @change="onEquipmentSelect">
                 <template #option="slotProps">
                    <div class="flex flex-col">
                       <span class="text-xs font-black">{{ slotProps.option.name }}</span>
                       <span class="text-[10px] text-slate-400 font-mono">{{ slotProps.option.code }} · SN: {{ slotProps.option.serialNumber }}</span>
                    </div>
                 </template>
              </Select>
           </div>
        </div>

        <!-- Calibration Metadata -->
        <div class="space-y-4 animate-fade-in">
           <div class="flex items-center gap-3">
             <div class="w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center text-white text-xs">{{ isNew ? '2' : '1' }}</div>
             <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Data Sertifikasi</h4>
           </div>
           <div class="grid grid-cols-2 gap-6 pl-9">
              <div class="space-y-2">
                 <label class="text-[10px] font-black text-slate-400 uppercase">Tanggal Kalibrasi</label>
                 <InputText v-model="form.calibrationDate" type="date" class="w-full text-xs font-bold rounded-xl h-10 border-slate-200" @change="onDateChange" />
              </div>
              <div class="space-y-2">
                 <label class="text-[10px] font-black text-slate-400 uppercase">Kedaluwarsa Sertifikat</label>
                 <InputText v-model="form.expiryDate" type="date" class="w-full text-xs font-bold rounded-xl h-10 border-slate-200" />
              </div>
              <div class="col-span-2 space-y-2">
                 <label class="text-[10px] font-black text-slate-400 uppercase">Laboratorium / Provider</label>
                 <InputText v-model="form.provider" class="w-full text-xs font-bold rounded-xl h-10 border-slate-200" placeholder="Contoh: PT. Kalibrasi Nasional / Lab Metrologi" />
              </div>
              <div class="space-y-2">
                 <label class="text-[10px] font-black text-slate-400 uppercase">Nomor Sertifikat</label>
                 <InputText v-model="form.certificateNo" class="w-full text-xs font-bold rounded-xl h-10 border-slate-200" placeholder="K-2024-XXXX" />
              </div>
              <div class="space-y-2">
                 <label class="text-[10px] font-black text-slate-400 uppercase">Hasil Akhir</label>
                 <div class="flex gap-2">
                    <div v-for="res in ['PASS', 'FAIL']" :key="res" 
                         class="flex-1 p-2 rounded-xl border text-center cursor-pointer transition-all font-black text-[10px] uppercase tracking-widest"
                         :class="form.result === res 
                                   ? (res === 'PASS' ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg' : 'bg-rose-600 border-rose-500 text-white shadow-lg')
                                   : 'bg-white text-slate-400 border-slate-200 group-hover:border-slate-300'"
                         @click="form.result = res">
                       {{ res }}
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <!-- Notes -->
        <div class="space-y-4 animate-fade-in">
           <div class="flex items-center gap-3">
             <div class="w-8 h-8 rounded-full bg-slate-400 flex items-center justify-center text-white text-xs">{{ isNew ? '3' : '2' }}</div>
             <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Catatan & Temuan</h4>
           </div>
           <div class="pl-9">
              <Textarea v-model="form.notes" rows="3" class="w-full rounded-2xl text-xs font-bold border-slate-200 p-4 outline-none transition-colors focus:border-rose-500" placeholder="Masukkan detail penyimpangan jika ada atau catatan metrologi..." />
           </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="p-8 border-t border-slate-100 bg-white flex justify-end gap-3 rounded-b-[2.5rem]">
        <Button label="Batal" severity="secondary" text @click="modalVisible = false" class="font-black text-[10px] uppercase px-6" />
        <Button :label="isNew ? 'Simpan Log Kalibrasi' : 'Update Data'" icon="pi pi-check-circle" class="p-button-rounded font-black text-[10px] uppercase px-8 bg-rose-600 border-none text-white shadow-lg shadow-rose-100 h-12 hover:bg-rose-700" @click="saveLog" :loading="saving" />
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

const logs = ref<any[]>([]);
const equipments = ref<any[]>([]);
const activeLog = ref<any>(null);

const filters = reactive({
  status: 'ALL'
});

const form = reactive({
  equipmentId: '',
  calibrationDate: '',
  expiryDate: '',
  provider: '',
  certificateNo: '',
  result: 'PASS',
  notes: '',
  status: 'COMPLETED'
});

async function loadLogs() {
  loading.value = true;
  try {
    const params: any = {};
    if (filters.status !== 'ALL') params.status = filters.status;
    const res = await api.get('/qms/calibration', { params });
    logs.value = res.data.list;
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Error', detail: e.message });
  } finally {
    loading.value = false;
  }
}

async function loadEquipments() {
  try {
    const res = await api.get('/qms/calibration/equipment');
    equipments.value = res.data.equipment || [];
  } catch (e) {
    console.error('Failed to load equipment list', e);
  }
}

const stats = computed(() => {
  const total = logs.value.length;
  const expired = logs.value.filter(l => new Date(l.expiryDate) < new Date()).length;
  const critical = logs.value.filter(l => {
     const diff = (new Date(l.expiryDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24);
     return diff > 0 && diff < 30;
  }).length;
  
  return [
    { label: 'Total Sertifikat', value: total, icon: 'pi pi-id-card', color: 'text-slate-600' },
    { label: 'Kadaluarsa (Expired)', value: expired, icon: 'pi pi-envelope', color: 'text-rose-600', sub: 'Butuh Kalibrasi Ulang' },
    { label: 'Mendekati Expired', value: critical, icon: 'pi pi-clock', color: 'text-amber-600', sub: '30 Hari Kedepan' },
    { label: 'Akurasi Valid', value: total - expired, icon: 'pi pi-check-circle', color: 'text-emerald-600', sub: 'Operasional Aman' },
  ];
});

function openCreate() {
  isNew.value = true;
  activeLog.value = null;
  resetForm();
  loadEquipments();
  modalVisible.value = true;
}

function openView(log: any) {
  isNew.value = false;
  activeLog.value = log;
  loadEquipments();
  
  Object.assign(form, {
    equipmentId: log.equipmentId,
    calibrationDate: log.calibrationDate?.split('T')[0],
    expiryDate: log.expiryDate?.split('T')[0],
    provider: log.provider,
    certificateNo: log.certificateNo,
    result: log.result,
    notes: log.notes,
    status: log.status
  });
  
  modalVisible.value = true;
}

function resetForm() {
  Object.assign(form, {
    equipmentId: '',
    calibrationDate: new Date().toISOString().split('T')[0],
    expiryDate: '',
    provider: '',
    certificateNo: '',
    result: 'PASS',
    notes: '',
    status: 'COMPLETED'
  });
  onDateChange();
}

function onEquipmentSelect() {
  // Logic for specific equipment calibration rules could go here
}

function onDateChange() {
  if (form.calibrationDate) {
    // Auto-calculate expiry (default 1 year)
    const date = new Date(form.calibrationDate);
    date.setFullYear(date.getFullYear() + 1);
    form.expiryDate = date.toISOString().split('T')[0];
  }
}

async function saveLog() {
  if (!form.equipmentId || !form.calibrationDate || !form.expiryDate) {
    toast.add({ severity: 'warn', summary: 'Validasi', detail: 'Mohon lengkapi data peralatan dan tanggal.' });
    return;
  }

  saving.value = true;
  try {
    if (isNew.value) {
      await api.post('/qms/calibration', form);
      toast.add({ severity: 'success', summary: 'Sukses', detail: 'Hasil kalibrasi telah dicatat.' });
    } else {
      await api.patch(`/qms/calibration/${activeLog.value.id}`, form);
      toast.add({ severity: 'success', summary: 'Diperbarui', detail: 'Data kalibrasi berhasil diupdate.' });
    }
    modalVisible.value = false;
    loadLogs();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: e.message });
  } finally {
    saving.value = false;
  }
}

function isExpiringSoon(dateStr: string) {
  const diff = (new Date(dateStr).getTime() - new Date().getTime()) / (1000 * 3600 * 24);
  return diff > 0 && diff < 30;
}

const formatDate = (dateStr: any) => {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
};

const getStatusClass = (status: string) => {
  switch (status) {
    case 'COMPLETED': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
    case 'EXPIRED': return 'bg-rose-50 text-rose-700 border-rose-100';
    case 'SCHEDULED': return 'bg-blue-50 text-blue-700 border-blue-100';
    default: return 'bg-slate-50 text-slate-600 border-slate-100';
  }
};

onMounted(loadLogs);
watch(() => filters.status, loadLogs);
</script>

<style scoped>
:deep(.p-datatable-thead > tr > th) {
  background: transparent !important;
  font-size: 10px !important;
  font-weight: 900 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.1em !important;
  color: #94a3b8 !important;
  border-bottom: 2px solid #f1f5f9 !important;
  padding: 1.5rem 1rem !important;
}

:deep(.p-datatable-tbody > tr) {
  background: transparent !important;
  transition: all 0.2s ease;
}

:deep(.p-datatable-tbody > tr:hover) {
  background: rgba(255, 241, 242, 0.4) !important;
}

:deep(.p-datatable-tbody > tr > td) {
  padding: 1.25rem 1rem !important;
  border-bottom: 1px solid #f8fafc !important;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

:deep(.p-dropdown), :deep(.p-inputtext), :deep(.p-textarea) {
   border-color: #e2e8f0 !important;
   box-shadow: none !important;
}

:deep(.p-dropdown:hover), :deep(.p-inputtext:hover), :deep(.p-textarea:hover) {
   border-color: #f43f5e !important;
}
</style>
