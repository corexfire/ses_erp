<template>
  <div class="p-6 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-8 rounded-xl bg-white border border-slate-200 shadow-sm">
      <div class="absolute top-0 left-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -ml-32 -mt-32"></div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Otoritas Kepatuhan</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-slate-400">Alokasi NSFP</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2">Nomor Seri <span class="text-red-600">Faktur</span></h1>
        <p class="text-slate-500 text-sm font-medium">Kelola rentang nomor seri faktur pajak resmi yang diberikan oleh DJP (Enofa).</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="load" :loading="loading" />
        <Button label="Tambah Rentang Nomor" icon="pi pi-plus-circle" class="p-button-rounded font-black text-xs shadow-lg shadow-red-100 p-button-danger border-none" @click="showDialog = true" />
      </div>
    </div>

    <!-- Main List -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
       <!-- Active Ranges -->
       <div class="lg:col-span-2 space-y-6">
          <div v-for="r in ranges" :key="r.id" class="p-8 rounded-xl bg-white border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-500">
             <div class="absolute top-0 right-0 p-8 text-6xl text-slate-50 opacity-20 group-hover:opacity-40 transition-opacity">
                <i class="pi pi-ticket"></i>
             </div>
             
             <div class="flex justify-between items-start mb-6">
                <div>
                   <h3 class="text-lg font-black text-slate-900">{{ r.startNo }} <span class="text-slate-300 mx-2">→</span> {{ r.endNo }}</h3>
                   <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Disetujui pada {{ fmtDate(r.startDate) }}</p>
                </div>
                <span :class="['px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter', r.isUsed ? 'bg-amber-50 text-amber-700 border border-amber-100' : 'bg-emerald-50 text-emerald-700 border border-emerald-100']">
                   {{ r.isUsed ? 'Digunakan' : 'Tersedia' }}
                </span>
             </div>

             <div class="space-y-3">
                <div class="flex justify-between text-[11px] font-black uppercase tracking-widest mb-1">
                   <span class="text-slate-400">Progres Penggunaan</span>
                   <span class="text-slate-900">{{ calcConsumption(r) }}% Terpakai</span>
                </div>
                <ProgressBar :value="calcConsumption(r)" :showValue="false" class="h-2.5 bg-slate-100 !rounded-full overflow-hidden">
                   <template #default>
                      <div class="bg-red-500 h-full rounded-full transition-all duration-1000" :style="{ width: calcConsumption(r) + '%' }"></div>
                   </template>
                </ProgressBar>
                <div class="flex justify-between text-[10px] items-center pt-2">
                   <span class="text-slate-400 font-bold">Awal: {{ r.startNo }}</span>
                   <div class="flex items-center gap-2">
                      <span class="p-1 px-2 rounded bg-slate-900 text-white font-mono text-[9px]">{{ r.lastUsedNo || 'BELUM TERPAKAI' }}</span>
                      <span class="text-slate-400">Terakhir Digunakan</span>
                   </div>
                   <span class="text-slate-400 font-bold">Akhir: {{ r.endNo }}</span>
                </div>
             </div>
          </div>

          <div v-if="ranges.length === 0" class="p-20 text-center rounded-xl border border-dashed border-slate-300 bg-white/50">
             <i class="pi pi-inbox text-4xl text-slate-300 mb-4"></i>
             <p class="text-slate-400 font-black text-sm uppercase">Belum ada rentang NSFP yang didaftarkan</p>
          </div>
       </div>

       <!-- Quick Actions/Summary -->
       <div class="space-y-6">
          <div class="p-8 rounded-xl bg-slate-900 text-white shadow-xl shadow-slate-200">
             <h4 class="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Ringkasan Alokasi</h4>
             <div class="space-y-6">
                <div>
                   <p class="text-[10px] font-bold text-slate-500 uppercase">Nomor Tersedia</p>
                   <h2 class="text-4xl font-black text-white">{{ totalAvailable }} <span class="text-xs font-medium text-slate-400">Lembar</span></h2>
                </div>
                <div class="grid grid-cols-2 gap-4">
                   <div class="p-4 rounded-3xl bg-white/5 border border-white/10">
                      <p class="text-[9px] font-black text-slate-500 uppercase mb-1">Sedang Digunakan</p>
                      <p class="text-xl font-black text-amber-400">{{ ranges.filter(r => r.isUsed).length }}</p>
                   </div>
                   <div class="p-4 rounded-3xl bg-white/5 border border-white/10">
                      <p class="text-[9px] font-black text-slate-500 uppercase mb-1">Total Jatah</p>
                      <p class="text-xl font-black text-emerald-400">{{ totalLimit }}</p>
                   </div>
                </div>
                <Button label="Log Audit NSFP" class="w-full p-button-rounded p-button-secondary text-[10px] font-black uppercase mt-4" severity="secondary" outlined />
             </div>
          </div>

          <div class="p-8 rounded-xl bg-white border border-slate-200 shadow-sm border-l-4 border-l-red-600">
             <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Pemberitahuan</h4>
             <p class="text-xs font-medium text-slate-600 leading-relaxed">Pastikan semua rentang NSFP dicatat tepat seperti yang tertera pada sertifikat Enofa DJP untuk menghindari penolakan pelaporan pajak.</p>
          </div>
       </div>
    </div>

    <!-- Add Range Dialog -->
    <Dialog v-model:visible="showDialog" header="Registrasi Alokasi" modal class="w-full max-w-lg overflow-hidden !rounded-xl" :pt="{
       header: { class: 'p-8 border-b border-slate-100' },
       content: { class: 'p-8' },
       footer: { class: 'p-8 border-t border-slate-100 bg-slate-50/50' }
    }">
       <div class="space-y-6">
          <div class="space-y-2">
             <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Tanggal Mulai Alokasi</label>
             <InputText v-model="form.startDate" type="date" class="w-full !rounded-2xl !p-3 border-slate-200" />
          </div>
          <div class="grid grid-cols-1 gap-4">
             <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Nomor Awal</label>
                <InputText v-model="form.startNo" placeholder="xxx.yy-zzzzzzzz" class="w-full !rounded-2xl !p-3 font-mono border-slate-200" v-maska="'###.##-########'" />
             </div>
             <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Nomor Akhir</label>
                <InputText v-model="form.endNo" placeholder="xxx.yy-zzzzzzzz" class="w-full !rounded-2xl !p-3 font-mono border-slate-200" v-maska="'###.##-########'" />
             </div>
          </div>
       </div>
       <template #footer>
          <div class="flex gap-3 justify-end w-full">
             <Button label="Batalkan" severity="secondary" text @click="showDialog = false" class="text-[10px] font-black uppercase" />
             <Button label="Daftarkan Rentang" icon="pi pi-check" class="p-button-rounded p-button-danger px-8 text-[10px] font-black uppercase shadow-lg shadow-red-100" @click="save" :loading="saving" />
          </div>
       </template>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
const api = useApi();
const toast = useToast();

const ranges = ref<any[]>([]);
const showDialog = ref(false);
const saving = ref(false);
const loading = ref(false);

const form = ref({ 
  startNo: '', 
  endNo: '', 
  startDate: new Date().toISOString().slice(0, 10) 
});

const totalAvailable = computed(() => {
  return ranges.value.reduce((s, r) => {
    const end = parseInt(r.endNo.split('-')[1]);
    const last = r.lastUsedNo ? parseInt(r.lastUsedNo.split('-')[1]) : parseInt(r.startNo.split('-')[1]) - 1;
    return s + (end - last);
  }, 0);
});

const totalLimit = computed(() => {
  return ranges.value.reduce((s, r) => {
    const start = parseInt(r.startNo.split('-')[1]);
    const end = parseInt(r.endNo.split('-')[1]);
    return s + (end - start + 1);
  }, 0);
});

function calcConsumption(r: any) {
  if (!r.lastUsedNo) return 0;
  const start = parseInt(r.startNo.split('-')[1]);
  const end = parseInt(r.endNo.split('-')[1]);
  const last = parseInt(r.lastUsedNo.split('-')[1]);
  const total = end - start + 1;
  const used = last - start + 1;
  return Math.round((used / total) * 100);
}

const fmtDate = (d: string) => d ? d.slice(0, 10) : '-';

const load = async () => { 
  loading.value = true;
  try {
    const res = await api.get('/finance/tax/nsfp'); 
    
    // Support multiple response formats to be safe
    if (res && res.ranges) {
      ranges.value = res.ranges;
    } else if (res && res.data && res.data.ranges) {
      ranges.value = res.data.ranges;
    } else if (Array.isArray(res)) {
      ranges.value = res;
    } else {
      ranges.value = [];
    }
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Load Failed', detail: e.message });
  } finally {
    loading.value = false;
  }
};

const save = async () => { 
  saving.value = true; 
  try { 
    await api.post('/finance/tax/nsfp', form.value); 
    toast.add({ severity: 'success', summary: 'Range Registered', detail: 'New NSFP range has been allocated to memory.' });
    showDialog.value = false; 
    await load(); 
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Registration Error', detail: e.message });
  } finally { 
    saving.value = false; 
  } 
};

onMounted(load);
</script>

<style scoped>
:deep(.p-progressbar) {
  background: #f1f5f9;
}
:deep(.p-progressbar-value) {
  background: #ef4444;
}
</style>