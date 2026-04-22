<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';

const { $api } = useNuxtApp();
const toast = useToast();
const confirm = useConfirm();

// State
const handovers = ref([]);
const stats = ref({ total: 0, pending: 0, finalized: 0 });
const loading = ref(false);
const selectedHandover = ref(null);
const displayDialog = ref(false);
const submitted = ref(false);

const equipmentOptions = ref([]);
const customerOptions = ref([]);
const serviceOrderOptions = ref([]);
const technicianOptions = ref([]);

const handover = ref({
  id: null,
  code: '',
  serviceOrderId: '',
  customerId: '',
  technicianId: '',
  equipmentId: '',
  handoverDate: new Date(),
  status: 'DRAFT',
  recipientName: '',
  recipientPhone: '',
  recipientTitle: '',
  checklist: [
    { task: 'Pembersihan area kerja', status: true, remark: '' },
    { task: 'Pengetesan alat/unit', status: true, remark: '' },
    { task: 'Pengecekan kebocoran', status: true, remark: '' },
    { task: 'Edukasi pengoperasian ke user', status: true, remark: '' },
    { task: 'Penyerahan kunci/akses', status: true, remark: '' }
  ],
  photos: [],
  remarks: '',
  clientSignature: '',
  technicianSignature: ''
});

// Load Data
const loadData = async () => {
  loading.value = true;
  try {
    const [hRes, sRes, eRes, cRes, soRes] = await Promise.all([
      $api.get('/fsm/handover'),
      $api.get('/fsm/handover/stats'),
      $api.get('/manufacturing/maintenance/equipment'),
      $api.get('/crm/customers'),
      $api.get('/fsm/service-orders')
    ]);
    handovers.value = hRes.data;
    stats.value = sRes.data;
    equipmentOptions.value = (eRes.data.equipment || []).map(e => ({ label: `${e.code} - ${e.name}`, value: e.id }));
    customerOptions.value = (cRes.data.customers || []).map(c => ({ label: c.name, value: c.id }));
    serviceOrderOptions.value = (soRes.data || []).map(so => ({ label: `${so.code} - ${so.subject}`, value: so.id }));
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message || 'Unknown error';
    console.error('Load Data Error:', error.response || error);
    toast.add({ severity: 'error', summary: 'Error', detail: `Gagal memuat data: ${errorMsg}`, life: 5000 });
  } finally {
    loading.value = false;
  }
};

onMounted(loadData);

// Actions
const selectHandover = (item) => {
  selectedHandover.value = item;
};

const openNew = () => {
  const now = new Date();
  const timestamp = now.getTime().toString(36).toUpperCase();
  handover.value = {
    id: null,
    code: `BAST/${now.getFullYear()}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${timestamp}`,
    serviceOrderId: '',
    customerId: '',
    technicianId: '',
    equipmentId: '',
    handoverDate: now,
    status: 'DRAFT',
    recipientName: '',
    recipientPhone: '',
    recipientTitle: '',
    checklist: [
      { task: 'Pembersihan area kerja', status: true, remark: '' },
      { task: 'Pengetesan alat/unit', status: true, remark: '' },
      { task: 'Pengecekan kebocoran', status: true, remark: '' },
      { task: 'Edukasi pengoperasian ke user', status: true, remark: '' },
      { task: 'Penyerahan kunci/akses', status: true, remark: '' }
    ],
    photos: [],
    remarks: '',
    clientSignature: '',
    technicianSignature: ''
  };
  submitted.value = false;
  displayDialog.value = true;
};

const saveHandover = async () => {
  submitted.value = true;
  
  // Validation: Check required fields
  const missingFields = [];
  if (!handover.value.code) missingFields.push('Nomor BAST');
  if (!handover.value.customerId) missingFields.push('Customer');
  if (!handover.value.recipientName) missingFields.push('Nama Penerima');

  if (missingFields.length > 0) {
    toast.add({ 
      severity: 'warn', 
      summary: 'Data Tidak Lengkap', 
      detail: `Mohon isi: ${missingFields.join(', ')}`, 
      life: 5000 
    });
    return;
  }

  try {
    if (handover.value.id) {
      await $api.patch(`/fsm/handover/${handover.value.id}`, handover.value);
      toast.add({ severity: 'success', summary: 'Berhasil', detail: 'BAST diperbarui', life: 3000 });
    } else {
      await $api.post('/fsm/handover', handover.value);
      toast.add({ severity: 'success', summary: 'Berhasil', detail: 'BAST baru dibuat', life: 3000 });
    }
    displayDialog.value = false;
    loadData();
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message || 'Unknown error';
    console.error('Save Error:', error.response || error);
    toast.add({ severity: 'error', summary: 'Gagal Menyimpan', detail: errorMsg, life: 5000 });
  }
};

const deleteHandover = (item) => {
  confirm.require({
    message: `Apakah Anda yakin ingin menghapus ${item.code}?`,
    header: 'Konfirmasi Hapus',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      try {
        await $api.delete(`/fsm/handover/${item.id}`);
        toast.add({ severity: 'success', summary: 'Berhasil', detail: 'BAST dihapus', life: 3000 });
        if (selectedHandover.value?.id === item.id) selectedHandover.value = null;
        loadData();
      } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Gagal menghapus data', life: 3000 });
      }
    }
  });
};

// Helpers
const getStatusStyles = (status) => {
  switch (status) {
    case 'FINALIZED': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    case 'SUBMITTED': return 'bg-amber-50 text-amber-600 border-amber-100';
    default: return 'bg-slate-50 text-slate-600 border-slate-100';
  }
};

const formatStatus = (status) => {
  switch (status) {
    case 'FINALIZED': return 'Selesai';
    case 'SUBMITTED': return 'Menunggu TTD';
    case 'DRAFT': return 'Draft';
    default: return status;
  }
};

const formatDate = (date) => {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
};
</script>

<template>
  <div class="min-h-screen bg-[#f8fafc] p-4 lg:p-10 font-sans selection:bg-indigo-100 selection:text-indigo-700">
    <!-- Header Block -->
    <header class="mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex items-center gap-5">
          <div class="w-16 h-16 rounded-xl bg-indigo-600 flex items-center justify-center shadow-2xl shadow-indigo-200 shrink-0 rotate-3">
            <i class="pi pi-file-check text-white text-2xl"></i>
          </div>
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2 py-0.5 bg-indigo-900 text-white text-[9px] font-black uppercase tracking-widest rounded-md">Field Service</span>
              <span class="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Handover Management</span>
            </div>
            <h1 class="text-3xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Berita Acara <span class="text-indigo-600 tracking-tighter not-italic">Serah Terima</span></h1>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <Button @click="loadData" icon="pi pi-refresh" severity="secondary" rounded outlined class="!border-slate-200 !bg-white hover:!bg-slate-50 shadow-sm" />
          <Button @click="openNew" icon="pi pi-plus" label="Buat BAST Baru" class="!rounded-2xl !bg-slate-900 !border-none !px-6 !py-3 shadow-xl shadow-slate-200 hover:!bg-indigo-600 transition-all duration-300" />
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        <div class="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-500 group">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
              <i class="pi pi-folder-open text-lg"></i>
            </div>
            <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest tracking-tighter">Total BAST</span>
          </div>
          <div class="text-4xl font-black text-slate-900 tracking-tighter">{{ stats.total }}</div>
        </div>
        <div class="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-amber-50/50 transition-all duration-500 group">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
              <i class="pi pi-pencil text-lg"></i>
            </div>
            <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest tracking-tighter">Menunggu TTD</span>
          </div>
          <div class="text-4xl font-black text-slate-900 tracking-tighter">{{ stats.pending }}</div>
        </div>
        <div class="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-emerald-50/50 transition-all duration-500 group">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
              <i class="pi pi-verified text-lg"></i>
            </div>
            <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest tracking-tighter">Selesai / Final</span>
          </div>
          <div class="text-4xl font-black text-slate-900 tracking-tighter">{{ stats.finalized }}</div>
        </div>
      </div>
    </header>

    <main class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- Sidebar List -->
      <div class="lg:col-span-4 space-y-4">
        <div class="flex items-center justify-between px-2 mb-2">
          <h2 class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Arsip BAST</h2>
        </div>

        <div v-if="loading" class="space-y-4">
          <div v-for="i in 5" :key="i" class="h-24 bg-slate-200/50 rounded-xl animate-pulse"></div>
        </div>

        <div v-else class="space-y-4 max-h-[calc(100vh-400px)] overflow-y-auto pr-2 custom-scrollbar">
          <div v-for="item in handovers" :key="item.id" 
            @click="selectHandover(item)"
            :class="['group p-5 rounded-xl border transition-all cursor-pointer relative overflow-hidden', 
              selectedHandover?.id === item.id ? 'bg-slate-900 border-slate-900 shadow-2xl shadow-slate-200' : 'bg-white border-slate-200 hover:border-indigo-300 hover:-translate-y-1 shadow-sm']"
          >
            <div class="flex justify-between items-start mb-3">
              <div>
                <span :class="['text-[9px] font-black uppercase tracking-[0.1em] px-2 py-0.5 rounded-full border', 
                  selectedHandover?.id === item.id ? 'bg-white/10 border-white/20 text-white' : 'bg-slate-50 border-slate-100 text-slate-500']">
                  {{ item.code }}
                </span>
                <h3 :class="['text-xs font-black mt-3 leading-tight uppercase tracking-tight', 
                  selectedHandover?.id === item.id ? 'text-white' : 'text-slate-900']">
                  {{ item.customer?.name || 'Tanpa Customer' }}
                </h3>
              </div>
              <div :class="['px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-wider border', getStatusStyles(item.status)]">
                {{ formatStatus(item.status) }}
              </div>
            </div>

            <div class="flex items-center gap-3 mt-4 pt-4 border-t" :class="selectedHandover?.id === item.id ? 'border-white/10' : 'border-slate-50'">
              <span class="text-[10px] font-bold" :class="selectedHandover?.id === item.id ? 'text-slate-400' : 'text-slate-500'">
                {{ formatDate(item.handoverDate) }}
              </span>
              <span class="text-slate-300">|</span>
              <span class="text-[10px] font-black uppercase tracking-widest shrink-0" :class="selectedHandover?.id === item.id ? 'text-indigo-400' : 'text-indigo-600'">
                BAST
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Detail View -->
      <div class="lg:col-span-8">
        <div v-if="!selectedHandover" class="h-[600px] flex flex-col items-center justify-center p-20 bg-white/50 border-2 border-slate-200 border-dashed rounded-xl transition-all">
          <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 shadow-xl shadow-slate-100 border border-slate-100">
            <i class="pi pi-search-plus text-4xl text-slate-300 rotate-12"></i>
          </div>
          <h3 class="text-xl font-black text-slate-400 uppercase tracking-widest italic tracking-tighter">Detail Berita Acara</h3>
          <p class="text-[11px] text-slate-500 font-bold mt-3 text-center max-w-sm leading-relaxed">Pilih arsip BAST di sebelah kiri untuk melihat detail pemeriksaan, dokumentasi, dan tanda tangan digital.</p>
        </div>

        <div v-else class="bg-white rounded-xl border border-slate-200 shadow-2xl shadow-indigo-100/50 overflow-hidden animate-in fade-in zoom-in-95 duration-500">
          <div class="p-8 lg:p-12">
            <div class="flex justify-between items-start mb-12">
              <div>
                <h2 class="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-2 italic">BAST Detail <span class="text-indigo-600">Overview</span></h2>
                <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">{{ selectedHandover.code }} — {{ formatDate(selectedHandover.handoverDate) }}</p>
              </div>
              <div class="flex items-center gap-2">
                <Button icon="pi pi-pencil" @click="handover = {...selectedHandover}; displayDialog = true;" severity="secondary" rounded text class="hover:bg-slate-100" />
                <Button icon="pi pi-trash" @click="deleteHandover(selectedHandover)" severity="danger" rounded text class="hover:bg-rose-50" />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div class="space-y-8">
                <div>
                  <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Informasi Pihak Terkait</h4>
                  <div class="bg-slate-50 rounded-xl p-4 space-y-4 border border-slate-100">
                    <div class="flex items-center justify-between">
                      <span class="text-[10px] font-bold text-slate-400">Penerima</span>
                      <span class="text-[11px] font-black text-slate-900 uppercase tracking-tight">{{ selectedHandover.recipientName }}</span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-[10px] font-bold text-slate-400">Jabatan</span>
                      <span class="text-[11px] font-black text-slate-500 uppercase tracking-tight">{{ selectedHandover.recipientTitle || '-' }}</span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-[10px] font-bold text-slate-400">Customer</span>
                      <span class="text-[11px] font-black text-slate-900 uppercase tracking-tight">{{ selectedHandover.customer?.name }}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Objek Serah Terima</h4>
                  <div class="bg-indigo-50/50 rounded-xl p-4 space-y-4 border border-indigo-100/50">
                    <div class="flex items-center gap-4">
                      <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                        <i class="pi pi-box"></i>
                      </div>
                      <div>
                        <span class="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Alat / Unit</span>
                        <p class="text-[11px] font-black text-slate-900 uppercase tracking-tight">{{ selectedHandover.equipment?.name || 'Pekerjaan Jasa' }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Checklist Pemeriksaan</h4>
                <div class="space-y-3">
                  <div v-for="(item, idx) in selectedHandover.checklist" :key="idx" 
                    class="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                    <div class="flex items-center gap-3">
                      <div :class="['w-6 h-6 rounded-full flex items-center justify-center', item.status ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600']">
                        <i :class="['pi text-[9px]', item.status ? 'pi-check' : 'pi-times']"></i>
                      </div>
                      <span class="text-[11px] font-bold text-slate-700">{{ item.task }}</span>
                    </div>
                    <span class="text-[9px] font-black text-slate-400 tracking-widest uppercase italic">{{ item.remark || 'OK' }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Signature Section -->
            <div class="mt-16 pt-16 border-t border-dashed border-slate-200">
               <div class="grid grid-cols-2 gap-20">
                  <div class="text-center">
                    <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-6 px-10 border-b border-slate-100 pb-2">Diserahkan Oleh (Teknisi)</span>
                    <div class="h-32 bg-slate-50/50 rounded-3xl border border-slate-100 flex items-center justify-center italic text-slate-300 font-serif text-2xl tracking-widest opacity-60">
                       Digital Signed
                    </div>
                    <p class="mt-4 text-[10px] font-black text-slate-900 uppercase tracking-tight">{{ selectedHandover.technician?.name }}</p>
                  </div>
                  <div class="text-center">
                    <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-6 px-10 border-b border-slate-100 pb-2">Diterima Pihak Customer</span>
                     <div class="h-32 bg-slate-50/50 rounded-3xl border border-slate-100 flex items-center justify-center italic text-slate-300 font-serif text-2xl tracking-widest opacity-60">
                       {{ selectedHandover.status === 'FINALIZED' ? 'Digital Signed' : 'Waiting...' }}
                    </div>
                    <p class="mt-4 text-[10px] font-black text-slate-900 uppercase tracking-tight">{{ selectedHandover.recipientName }}</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal Form -->
    <Dialog v-model:visible="displayDialog" :header="handover.id ? 'Edit Berita Acara' : 'Input Berita Acara Baru'" modal class="!rounded-xl overflow-hidden" :style="{ width: '900px' }">
      <div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-6">
          <div class="flex flex-col gap-2">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nomor BAST</label>
            <InputText v-model="handover.code" class="!rounded-xl !bg-slate-50 !border-slate-100" />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</label>
            <Select v-model="handover.customerId" :options="customerOptions" optionLabel="label" optionValue="value" placeholder="Pilih Customer" class="!rounded-xl !bg-slate-50 !border-slate-100" />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Service Order (Referensi)</label>
            <Select v-model="handover.serviceOrderId" :options="serviceOrderOptions" optionLabel="label" optionValue="value" placeholder="Pilih Referensi WO" class="!rounded-xl !bg-slate-50 !border-slate-100" />
          </div>
          <div class="grid grid-cols-2 gap-4">
             <div class="flex flex-col gap-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Penerima</label>
                <InputText v-model="handover.recipientName" class="!rounded-xl !bg-slate-50 !border-slate-100" />
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Jabatan</label>
                <InputText v-model="handover.recipientTitle" class="!rounded-xl !bg-slate-50 !border-slate-100" />
              </div>
          </div>
        </div>

        <div class="space-y-6">
          <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Checklist Serah Terima</h4>
          <div class="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar space-y-3">
            <div v-for="(item, idx) in handover.checklist" :key="idx" class="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
               <span class="text-[10px] font-bold text-slate-700">{{ item.task }}</span>
               <Checkbox v-model="item.status" binary />
            </div>
          </div>
           <div class="flex flex-col gap-2 mt-4">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Catatan Tambahan</label>
            <Textarea v-model="handover.remarks" rows="3" class="!rounded-xl !bg-slate-50 !border-slate-100" />
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-3 p-4 border-t bg-slate-50/50">
          <Button label="Batal" icon="pi pi-times" text @click="displayDialog = false" class="!text-slate-400 !font-black !text-[10px] uppercase" />
          <Button label="Simpan BAST" icon="pi pi-check" @click="saveHandover" class="!bg-indigo-600 !border-none !rounded-xl !px-6 !font-black !text-[10px] uppercase" />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<style>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}

/* Animations */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slide-in-top {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-in {
  animation-duration: 0.5s;
  animation-fill-mode: both;
}
.fade-in { animation-name: fade-in; }
.slide-in-from-top-4 { animation-name: slide-in-top; }

.p-dialog .p-dialog-header {
  padding: 2rem !important;
  background: #fff !important;
  border-bottom: 1px solid #f1f5f9 !important;
}
.p-dialog .p-dialog-title {
  font-family: 'Inter', sans-serif !important;
  font-weight: 900 !important;
  text-transform: uppercase !important;
  letter-spacing: -0.02em !important;
  color: #0f172a !important;
  font-size: 1.25rem !important;
}

.p-inputtext, .p-select {
  font-size: 12px !important;
  padding: 0.8rem 1rem !important;
}

.p-select .p-select-label {
  font-weight: 700 !important;
  color: #1e293b !important;
}
</style>
