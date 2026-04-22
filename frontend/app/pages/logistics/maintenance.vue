<template>
  <div class="p-4 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 overflow-hidden relative p-8 rounded-xl bg-white border border-slate-200 shadow-sm">
      <div class="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-rose-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Unit Pemeliharaan</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-rose-600">Servis & Legalitas</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2">Fleet <span class="text-rose-600">Maintenance</span></h1>
        <p class="text-slate-500 text-sm font-medium">Monitoring jadwal servis rutin, perbaikan darurat, dan kepatuhan dokumen legalitas armada.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <div class="flex flex-col">
          <label class="text-[9px] font-black text-slate-400 uppercase mb-1">Pilih Unit Kendaraan</label>
          <Select v-model="selectedVehicleId" :options="vehicles" optionLabel="plateNo" optionValue="id" class="w-64 rounded-xl font-bold" @change="loadData" placeholder="Semua Unit" />
        </div>
        <Button label="Catat Servis" icon="pi pi-plus" class="p-button-rounded font-black text-xs shadow-lg shadow-rose-100 bg-rose-600 border-none" @click="openModal('MAINTENANCE')" />
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
       <div v-for="s in stats" :key="s.label" class="bg-white p-4 rounded-xl border shadow-sm relative overflow-hidden group">
          <div class="absolute right-[-10px] top-[-10px] opacity-5 group-hover:opacity-10 transition-opacity">
            <i :class="[s.icon, 'text-6xl']"></i>
          </div>
          <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ s.label }}</div>
          <div class="text-2xl font-black text-slate-900">{{ s.value }}</div>
          <div :class="['mt-2 text-[9px] font-black px-2 py-0.5 rounded-full inline-block', s.color]">{{ s.sub }}</div>
       </div>
    </div>

    <!-- Tabs Content -->
    <div class="bg-white border rounded-xl shadow-sm overflow-hidden min-h-[600px]">
       <div class="flex border-b bg-slate-50/50">
          <button v-for="t in ['Maintenance Logs', 'Legal Documents']" :key="t" 
            @click="tab = t"
            :class="tab === t ? 'border-b-2 border-rose-600 text-rose-700 bg-white' : 'text-slate-500 hover:bg-slate-50'"
            class="px-8 py-5 text-[11px] font-black uppercase tracking-widest transition">
            <i :class="t === 'Maintenance Logs' ? 'pi pi-wrench mr-2' : 'pi pi-file mr-2'"></i>
            {{ t }}
          </button>
       </div>

       <!-- Maintenance Logs -->
       <div v-if="tab === 'Maintenance Logs'" class="p-0">
          <DataTable :value="logs" class="p-datatable-sm" paginator :rows="10">
             <Column header="TANGGAL SERVIS">
               <template #body="{ data }">
                 <div class="flex flex-col">
                   <span class="text-xs font-black text-slate-800">{{ formatDate(data.lastServiceAt) }}</span>
                   <span class="text-[10px] text-slate-400 font-bold uppercase">{{ data.maintenanceType }}</span>
                 </div>
               </template>
             </Column>
             <Column header="DESKRIPSI & VENDOR">
               <template #body="{ data }">
                 <div class="text-xs font-bold text-slate-700">{{ data.description || '-' }}</div>
                 <div class="text-[9px] text-slate-400 font-black uppercase tracking-tighter">{{ data.vendorId || 'Bengkel Rekanan' }}</div>
               </template>
             </Column>
             <Column header="INTERVAL JADWAL">
                <template #body="{ data }">
                   <div class="flex flex-col gap-1">
                      <div class="flex items-center gap-2">
                        <span class="text-[9px] font-black text-slate-400 w-12">NEXT KM</span>
                        <span class="text-[10px] font-bold text-slate-800">{{ data.kmInterval ? data.kmInterval + ' KM' : '-' }}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <span class="text-[9px] font-black text-slate-400 w-12">NEXT TGL</span>
                        <span :class="['text-[10px] font-bold', getServiceStatusClass(data.nextServiceAt)]">
                           {{ data.nextServiceAt ? formatDate(data.nextServiceAt) : '-' }}
                        </span>
                      </div>
                   </div>
                </template>
             </Column>
             <Column header="BIAYA (COST)">
               <template #body="{ data }">
                 <span class="text-xs font-black text-rose-700">{{ formatRp(data.cost) }}</span>
               </template>
             </Column>
             <Column header="STATUS">
               <template #body="{ data }">
                 <span :class="['px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest', getStatusBadge(data.status)]">
                   {{ data.status }}
                 </span>
               </template>
             </Column>
             <Column header="AKSI" class="w-24">
               <template #body="{ data }">
                 <div class="flex items-center gap-1">
                   <Button icon="pi pi-pencil" text rounded severity="secondary" size="small" @click="editLog(data)" />
                   <Button icon="pi pi-trash" text rounded severity="danger" size="small" @click="confirmDeleteLog(data)" />
                 </div>
               </template>
             </Column>
          </DataTable>
       </div>

       <!-- Documents -->
       <div v-else class="p-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-for="doc in documents" :key="doc.id" class="p-4 border rounded-2xl bg-white shadow-sm hover:shadow-md transition group relative overflow-hidden">
             <div class="absolute right-[-10px] bottom-[-10px] opacity-5 text-slate-400">
               <i class="pi pi-file-pdf text-[80px]"></i>
             </div>
             <div class="flex justify-between items-start mb-4">
                <div class="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600">
                   <i class="pi pi-shield text-xl"></i>
                </div>
                <div class="flex flex-col items-end gap-2">
                   <span :class="['px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border', getDocExpiryClass(doc.expiryDate)]">
                      {{ getDaysLeft(doc.expiryDate) }}
                   </span>
                   <Button icon="pi pi-trash" text rounded severity="danger" size="small" @click="confirmDeleteDoc(doc)" />
                </div>
             </div>
             <div class="text-[10px] font-black text-slate-400 uppercase mb-1">{{ doc.documentType }}</div>
             <div class="text-sm font-black text-slate-800 mb-2">{{ doc.documentNumber || 'No Number Specified' }}</div>
             
             <div class="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-50">
               <div>
                 <div class="text-[9px] font-black text-slate-400 uppercase">Issue Date</div>
                 <div class="text-[10px] font-bold text-slate-700">{{ formatDate(doc.issueDate) }}</div>
               </div>
               <div>
                 <div class="text-[9px] font-black text-slate-400 uppercase">Expiry Date</div>
                 <div class="text-[10px] font-bold text-rose-600">{{ formatDate(doc.expiryDate) }}</div>
               </div>
             </div>
          </div>
          <div v-if="documents.length === 0" class="col-span-3 py-20 text-center text-slate-400">
             <i class="pi pi-folder-open text-4xl mb-3 opacity-20 block"></i>
             <div class="italic">Belum ada dokumen legal yang terdaftar.</div>
          </div>
       </div>
    </div>

    <!-- Modal Form -->
    <Dialog v-model:visible="modalOpen" :header="modalType === 'MAINTENANCE' ? 'Log Perawatan Kendaraan' : 'Registrasi Dokumen Baru'" class="w-[500px]" modal>
       <div class="space-y-4 pt-4">
          <div class="space-y-1" v-if="!selectedVehicleId">
             <label class="text-[10px] font-black text-slate-500 uppercase">Pilih Kendaraan</label>
             <Select v-model="form.vehicleId" :options="vehicles" optionLabel="plateNo" optionValue="id" class="w-full" />
          </div>

          <template v-if="modalType === 'MAINTENANCE'">
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-500 uppercase">Tipe Servis</label>
                   <Select v-model="form.maintenanceType" :options="['ROUTINE', 'REPAIR', 'TIRE', 'WASH', 'OTHER']" class="w-full" />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-500 uppercase">Biaya (IDR)</label>
                   <InputNumber v-model="form.cost" class="w-full" />
                </div>
             </div>
             <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-500 uppercase">Keterangan</label>
                <Textarea v-model="form.description" rows="2" class="w-full" />
             </div>
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-500 uppercase">Tgl Servis</label>
                   <InputText v-model="form.lastServiceAt" type="date" class="w-full" />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-500 uppercase">Next Jadwal (Est)</label>
                   <InputText v-model="form.nextServiceAt" type="date" class="w-full" />
                </div>
             </div>
          </template>

          <template v-else>
             <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-500 uppercase">Jenis Dokumen</label>
                <Select v-model="form.documentType" :options="['STNK', 'KIR', 'SIU', 'INSURANCE']" class="w-full" />
             </div>
             <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-500 uppercase">Nomor Dokumen</label>
                <InputText v-model="form.documentNumber" class="w-full" />
             </div>
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-500 uppercase">Tgl Terbit</label>
                   <InputText v-model="form.issueDate" type="date" class="w-full" />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-500 uppercase">Tgl Berakhir</label>
                   <InputText v-model="form.expiryDate" type="date" class="w-full" />
                </div>
             </div>
          </template>

          <div class="pt-6 flex justify-end gap-2">
             <Button label="Batal" severity="secondary" text @click="modalOpen = false" />
             <Button label="Simpan Data" class="bg-rose-600 border-none px-6" @click="save" :loading="saving" />
          </div>
       </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';

const api = useApi();
const toast = useToast();

const selectedVehicleId = ref('');
const tab = ref('Maintenance Logs');
const vehicles = ref([]);
const logs = ref([]);
const documents = ref([]);
const loading = ref(false);
const saving = ref(false);
const modalOpen = ref(false);
const modalType = ref('MAINTENANCE');

const form = reactive({
  id: '',
  vehicleId: '',
  maintenanceType: 'ROUTINE',
  description: '',
  cost: 0,
  lastServiceAt: '',
  nextServiceAt: '',
  documentType: 'STNK',
  documentNumber: '',
  issueDate: '',
  expiryDate: '',
});

const stats = computed(() => {
  const totalCost = logs.value.reduce((acc, curr) => acc + Number(curr.cost || 0), 0);
  const pendingServices = logs.value.filter(l => l.status === 'SCHEDULED').length;
  const expiredDocs = documents.value.filter(d => d.expiryDate && new Date(d.expiryDate) < new Date()).length;

  return [
    { label: 'Total Investasi Servis', value: formatRp(totalCost), icon: 'pi pi-wallet', color: 'bg-rose-50 text-rose-600', sub: 'Keseluruhan Histori' },
    { label: 'Jadwal Mendatang', value: pendingServices, icon: 'pi pi-calendar', color: 'bg-blue-50 text-blue-600', sub: 'Unit Antrean' },
    { label: 'Kepatuhan Legal', value: documents.value.length, icon: 'pi pi-verified', color: 'bg-emerald-50 text-emerald-600', sub: 'Dokumen Aktif' },
    { label: 'Dokumen Expired', value: expiredDocs, icon: 'pi pi-exclamation-circle', color: 'bg-amber-50 text-amber-600', sub: 'Tindakan Segera' },
  ];
});

async function loadData() {
  loading.value = true;
  console.log('Fetching vehicles for maintenance page...');
  try {
    const vRes = await api.get('/logistics/fleet');
    console.log('Vehicles response:', vRes.data);
    vehicles.value = vRes.data.vehicles;

    // Auto-select first vehicle if none selected
    if (!selectedVehicleId.value && vehicles.value.length > 0) {
      selectedVehicleId.value = vehicles.value[0].id;
      console.log('Auto-selected vehicle:', selectedVehicleId.value);
    }

    if (selectedVehicleId.value) {
      console.log(`Fetching logs/docs for vehicle ID: ${selectedVehicleId.value}`);
      const [lRes, dRes] = await Promise.all([
        api.get(`/logistics/fleet/${selectedVehicleId.value}/maintenance`),
        api.get(`/logistics/fleet/${selectedVehicleId.value}/documents`),
      ]);
      console.log('Maintenance logs:', lRes.data.logs);
      console.log('Vehicle documents:', dRes.data.documents);
      logs.value = lRes.data.logs;
      documents.value = dRes.data.documents;
    } else {
       logs.value = [];
       documents.value = [];
    }
  } catch (e: any) {
    console.error('Error loading maintenance data:', e);
    toast.add({ severity: 'error', summary: 'Gagal', detail: e.message });
  } finally {
    loading.value = false;
  }
}

function openModal(t: string) {
  modalType.value = t;
  form.id = '';
  form.vehicleId = selectedVehicleId.value;
  form.maintenanceType = 'ROUTINE';
  form.description = '';
  form.cost = 0;
  form.lastServiceAt = '';
  form.nextServiceAt = '';
  modalOpen.value = true;
}

function editLog(log: any) {
  modalType.value = 'MAINTENANCE';
  form.id = log.id;
  form.vehicleId = log.vehicleId;
  form.maintenanceType = log.maintenanceType;
  form.description = log.description || '';
  form.cost = Number(log.cost || 0);
  form.lastServiceAt = log.lastServiceAt ? new Date(log.lastServiceAt).toISOString().split('T')[0] : '';
  form.nextServiceAt = log.nextServiceAt ? new Date(log.nextServiceAt).toISOString().split('T')[0] : '';
  modalOpen.value = true;
}

async function confirmDeleteLog(log: any) {
  if (!confirm('Apakah Anda yakin ingin menghapus log perawatan ini?')) return;
  try {
    await api.delete(`/logistics/fleet/maintenance/${log.id}`);
    toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Log berhasil dihapus.' });
    loadData();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: e.message });
  }
}

async function confirmDeleteDoc(doc: any) {
  if (!confirm('Apakah Anda yakin ingin menghapus dokumen ini?')) return;
  try {
    await api.delete(`/logistics/fleet/documents/${doc.id}`);
    toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Dokumen berhasil dihapus.' });
    loadData();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: e.message });
  }
}

async function save() {
  saving.value = true;
  try {
    const targetVehicleId = form.vehicleId || selectedVehicleId.value;
    
    if (modalType.value === 'MAINTENANCE') {
      if (form.id) {
        await api.patch(`/logistics/fleet/maintenance/${form.id}`, form);
      } else {
        await api.post(`/logistics/fleet/${targetVehicleId}/maintenance`, form);
      }
    } else {
      if (form.id) {
        await api.patch(`/logistics/fleet/documents/${form.id}`, form);
      } else {
        await api.post(`/logistics/fleet/${targetVehicleId}/documents`, form);
      }
    }
    modalOpen.value = false;
    loadData();
    toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Data berhasil disimpan.' });
  } catch (e: any) {
     toast.add({ severity: 'error', summary: 'Gagal', detail: e.message });
  } finally {
    saving.value = false;
  }
}

function formatDate(d: any) {
  if (!d) return '-';
  return new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatRp(v: number) {
  return 'Rp ' + Number(v).toLocaleString('id-ID');
}

function getStatusBadge(s: string) {
  if (s === 'COMPLETED') return 'bg-emerald-50 text-emerald-700';
  if (s === 'SCHEDULED') return 'bg-blue-50 text-blue-700';
  return 'bg-slate-100 text-slate-500';
}

function getServiceStatusClass(d: any) {
  if (!d) return 'text-slate-400';
  const next = new Date(d);
  const now = new Date();
  return next < now ? 'text-rose-600' : 'text-emerald-600';
}

function getDocExpiryClass(d: any) {
  if (!d) return 'text-slate-400 border-slate-100';
  const exp = new Date(d);
  const now = new Date();
  if (exp < now) return 'text-rose-700 bg-rose-50 border-rose-200';
  const diffDays = Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 30) return 'text-amber-700 bg-amber-50 border-amber-200';
  return 'text-emerald-700 bg-emerald-50 border-emerald-200';
}

function getDaysLeft(d: any) {
  if (!d) return 'NO EXPIRY';
  const exp = new Date(d);
  const now = new Date();
  const diffDays = Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return 'EXPIRED';
  if (diffDays === 0) return 'HARI INI';
  return `${diffDays} HARI LAGI`;
}

onMounted(loadData);
</script>

<style scoped>
:deep(.p-datatable-thead > tr > th) {
  background: #f8fafc !important;
  font-size: 10px !important;
  font-weight: 900 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.1em !important;
  color: #64748b !important;
  padding: 1.5rem 1rem !important;
  border-bottom: 2px solid #f1f5f9 !important;
}

:deep(.p-datatable-tbody > tr > td) {
  padding: 1.25rem 1rem !important;
}
</style>
