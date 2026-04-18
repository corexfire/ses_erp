<template>
  <div class="p-6 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-8 rounded-xl bg-white border border-slate-200 shadow-sm">
      <div class="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-indigo-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Quality Assurance</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-indigo-600">Non-Conformance Report</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2">Laporan <span class="text-indigo-600">NCR</span></h1>
        <p class="text-slate-500 text-sm font-medium">Manajemen ketidaksesuaian material, proses, dan produk jadi untuk standar mutu tinggi.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="loadNcrs" :loading="loading" />
        <Button label="Buat NCR Baru" icon="pi pi-plus" class="p-button-rounded font-black text-xs shadow-lg shadow-indigo-100 bg-indigo-600 border-none text-white px-6" @click="openCreate" />
      </div>
    </div>

    <!-- Stats Section -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
       <div v-for="s in stats" :key="s.label" class="group p-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <i :class="[s.icon, 'text-6xl']"></i>
          </div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ s.label }}</p>
          <h3 class="text-2xl font-black text-slate-900">{{ s.value }}</h3>
          <div class="flex items-center gap-2 mt-2">
             <span :class="['text-[10px] font-bold px-2 py-0.5 rounded-full', s.color]">{{ s.sub || 'Status Aktif' }}</span>
          </div>
       </div>
    </div>

    <!-- Main List Area -->
    <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col">
       <div class="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/10">
          <div>
             <h2 class="text-[13px] font-black text-slate-900 uppercase tracking-widest">Buku Laporan NCR</h2>
             <p class="text-xs text-slate-500 font-medium">Riwayat temuan dan status investigasi kualitas.</p>
          </div>
          <div class="flex items-center gap-3">
             <SelectButton v-model="filters.status" :options="['ALL', 'OPEN', 'PENDING_APPROVAL', 'CLOSED']" class="p-button-sm text-[10px] font-black uppercase" />
          </div>
       </div>

       <DataTable :value="ncrs" dataKey="id" class="p-datatable-sm w-full" :loading="loading">
          <Column field="code" header="KODE NCR" class="pl-8">
             <template #body="{ data }">
                <div class="flex flex-col">
                   <span class="text-[11px] font-black text-slate-800 font-mono">{{ data.code }}</span>
                   <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{{ data.sourceType }}</span>
                </div>
             </template>
          </Column>
          <Column header="ITEM & MATERIAL">
             <template #body="{ data }">
                <div class="flex flex-col">
                   <span class="text-[11px] font-bold text-slate-700">{{ data.item?.name || 'N/A' }}</span>
                   <span class="text-[10px] font-mono text-slate-400">{{ data.item?.code || '-' }}</span>
                </div>
             </template>
          </Column>
          <Column header="TINGKAT BAHAYA" class="text-center">
             <template #body="{ data }">
                <span :class="['px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border', getSeverityClass(data.severity)]">
                   {{ data.severity }}
                </span>
             </template>
          </Column>
          <Column header="DISPOSISI" class="text-center">
             <template #body="{ data }">
                <span v-if="data.disposition !== 'PENDING'" class="font-mono text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg border border-indigo-100">
                   {{ data.disposition.replace('_', ' ') }}
                </span>
                <span v-else class="text-[10px] font-bold text-slate-400 italic">Menunggu Keputusan</span>
             </template>
          </Column>
          <Column header="JUMLAH" class="text-right">
             <template #body="{ data }">
                <div class="flex flex-col items-end">
                   <span class="text-[11px] font-black text-slate-800">{{ data.qty }}</span>
                   <span class="text-[9px] font-bold text-indigo-500 uppercase">{{ data.item?.baseUomCode || 'unit' }}</span>
                </div>
             </template>
          </Column>
          <Column header="STATUS">
             <template #body="{ data }">
                <span :class="['px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest', getStatusClass(data.status)]">
                   {{ data.status.replace('_', ' ') }}
                </span>
             </template>
          </Column>
          <Column class="text-right pr-8">
             <template #body="{ data }">
                <div class="flex gap-2 justify-end">
                   <Button icon="pi pi-search-plus" severity="secondary" rounded text @click="openView(data)" />
                </div>
             </template>
          </Column>
       </DataTable>
    </div>

    <!-- Create/Edit Dialog -->
    <Dialog v-model:visible="drawerVisible" modal class="w-[650px]" :pt="{ mask: { class: 'backdrop-blur-sm bg-black/20' }, content: { class: 'p-0 rounded-xl overflow-hidden' }, header: { class: 'hidden' } }">
      <div class="flex items-center justify-between p-8 border-b border-slate-100 bg-white">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-indigo-900 flex items-center justify-center text-white shadow-xl">
            <i class="pi pi-exclamation-circle text-xl"></i>
          </div>
          <div>
            <h4 class="text-xl font-black text-slate-900 leading-tight">{{ form.id ? `Update NCR: ${form.code}` : 'Laporan NCR Baru' }}</h4>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quality Investigation Workflow</p>
          </div>
        </div>
        <Button icon="pi pi-times" severity="secondary" rounded text @click="drawerVisible = false" />
      </div>

      <div class="p-8 space-y-8 max-h-[70vh] overflow-y-auto bg-slate-50/30">
        <!-- MODE SELECTION (Only for New) -->
        <div v-if="!form.id" class="p-6 rounded-xl bg-slate-900 text-white relative overflow-hidden">
           <div class="absolute -right-4 -bottom-4 opacity-10">
              <i class="pi pi-bolt text-[80px]"></i>
           </div>
           <h3 class="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-4">Metode Pembuatan</h3>
           <div class="grid grid-cols-2 gap-3 relative z-10">
              <div @click="form.mode = 'QC'" :class="['p-4 rounded-2xl border cursor-pointer transition-all', form.mode === 'QC' ? 'bg-indigo-600 border-indigo-400' : 'bg-white/5 border-white/10 hover:bg-white/10']">
                 <div class="flex items-center gap-2 mb-1">
                    <i class="pi pi-verified text-xs"></i>
                    <span class="text-[10px] font-black uppercase">Reference QC</span>
                 </div>
                 <p class="text-[9px] text-indigo-100 font-medium">Berdasarkan temuan inspeksi QC yang ditolak.</p>
              </div>
              <div @click="form.mode = 'AD_HOC'" :class="['p-4 rounded-2xl border cursor-pointer transition-all', form.mode === 'AD_HOC' ? 'bg-indigo-600 border-indigo-400' : 'bg-white/5 border-white/10 hover:bg-white/10']">
                 <div class="flex items-center gap-2 mb-1">
                    <i class="pi pi-plus-circle text-xs"></i>
                    <span class="text-[10px] font-black uppercase">Ad-Hoc Creation</span>
                 </div>
                 <p class="text-[9px] text-indigo-100 font-medium">Buat laporan mandiri tanpa referensi QC.</p>
              </div>
           </div>
        </div>

        <!-- Section 1: Source & Reference -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs">1</div>
            <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Referensi Sumber</h4>
          </div>
          
          <div v-if="form.mode === 'QC' && !form.id" class="space-y-2">
             <label class="text-[10px] font-black text-slate-400 uppercase">Pilih Inspeksi QC Terkait</label>
             <Select v-model="form.qcId" :options="qcInspections" optionLabel="label" optionValue="id" placeholder="Cari Kode QC..." filter class="w-full rounded-2xl bg-slate-50 border-slate-200 text-xs font-bold" @change="onQcSelected" />
          </div>

          <div class="grid grid-cols-2 gap-4">
             <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase">Pilih Item / Material</label>
                <Select v-model="form.itemId" :options="items" optionLabel="label" optionValue="id" placeholder="Cari Item..." filter :disabled="form.mode === 'QC'" class="w-full rounded-2xl bg-slate-50 border-slate-200 text-xs font-bold" />
             </div>
             <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase">Jumlah Bermasalah</label>
                <InputNumber v-model="form.qty" :disabled="form.mode === 'QC'" class="w-full" inputClass="rounded-2xl bg-slate-50 border-slate-200 text-xs font-bold px-4" />
             </div>
          </div>
        </div>

        <!-- Section 2: Details -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs">2</div>
            <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Detail Ketidaksesuaian</h4>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
             <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase">Tingkat Keparahan</label>
                <select v-model="form.severity" class="w-full rounded-2xl text-[11px] font-black bg-white border border-slate-200 p-3 shadow-sm outline-none">
                   <option value="LOW">LOW</option>
                   <option value="MEDIUM">MEDIUM</option>
                   <option value="HIGH">HIGH</option>
                   <option value="CRITICAL">CRITICAL</option>
                </select>
             </div>
             <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase">Tipe NCR</label>
                <select v-model="form.ncrType" class="w-full rounded-2xl text-[11px] font-black bg-white border border-slate-200 p-3 shadow-sm outline-none">
                   <option value="MATERIAL">MATERIAL</option>
                   <option value="PROCESS">PROCESS</option>
                   <option value="FINISHED_GOODS">FINISHED GOODS</option>
                   <option value="OTHER">OTHER</option>
                </select>
             </div>
          </div>

          <div class="space-y-2">
             <label class="text-[10px] font-black text-slate-400 uppercase">Deskripsi Temuan</label>
             <Textarea v-model="form.description" rows="4" class="w-full rounded-2xl text-xs font-bold bg-slate-50 border-slate-200 outline-none" placeholder="Jelaskan secara detail ketidaksesuaian yang ditemukan..." />
          </div>

          <div v-if="form.id" class="grid grid-cols-1 gap-4 bg-slate-50 p-6 rounded-3xl border border-slate-100">
             <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Akar Masalah (Root Cause)</label>
                <Textarea v-model="form.rootCause" rows="3" class="w-full rounded-2xl text-xs font-bold bg-white border-slate-200 outline-none" placeholder="Hasil investigasi akar masalah..." />
             </div>
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                   <label class="text-[10px] font-black text-slate-400 uppercase">Disposisi Akhir</label>
                   <select v-model="form.disposition" class="w-full rounded-xl text-[10px] font-black bg-white border border-slate-200 p-2 shadow-sm outline-none">
                      <option value="PENDING">PENDING</option>
                      <option value="USE_AS_IS">USE AS IS</option>
                      <option value="REWORK">REWORK</option>
                      <option value="SCRAP">SCRAP</option>
                      <option value="RETURN_TO_VENDOR">RETURN TO VENDOR</option>
                   </select>
                </div>
                <div class="space-y-2">
                   <label class="text-[10px] font-black text-slate-400 uppercase">Update Status</label>
                   <select v-model="form.status" class="w-full rounded-xl text-[10px] font-black bg-white border border-slate-200 p-2 shadow-sm outline-none">
                      <option value="OPEN">OPEN</option>
                      <option value="UNDER_INVESTIGATION">INVESTIGASI</option>
                      <option value="PENDING_APPROVAL">KIRIM APPROVAL</option>
                      <option value="CLOSED">CLOSED</option>
                   </select>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div class="p-8 border-t border-slate-100 bg-white flex justify-end gap-3 rounded-b-[2.5rem]">
        <Button label="Batalkan" severity="secondary" text @click="drawerVisible = false" class="font-black text-[10px] uppercase px-6" />
        <Button :label="form.id ? 'Simpan Perubahan' : 'Terbitkan NCR'" icon="pi pi-check-circle" class="p-button-rounded font-black text-[10px] uppercase px-8 bg-indigo-600 border-none text-white shadow-lg shadow-indigo-100" @click="saveNcr" :loading="saving" />
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
const drawerVisible = ref(false);
const ncrs = ref<any[]>([]);
const qcInspections = ref<any[]>([]);
const items = ref<any[]>([]);

const filters = reactive({
  status: 'ALL'
});

const form = reactive({
  id: null,
  mode: 'QC',
  qcId: null,
  itemId: null,
  qty: 0,
  severity: 'MEDIUM',
  ncrType: 'MATERIAL',
  description: '',
  rootCause: '',
  disposition: 'PENDING',
  status: 'OPEN',
  code: ''
});

async function loadNcrs() {
  loading.value = true;
  try {
    const params: any = {};
    if (filters.status !== 'ALL') params.status = filters.status;
    const res = await api.get('/qms/ncr', { params });
    ncrs.value = res.data.list;
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Error', detail: e.message });
  } finally {
    loading.value = false;
  }
}

async function loadReferences() {
  try {
    // Load Failed QC Inspections
    const qcsRes = await api.get('/inventory/qc', { params: { status: 'REJECTED' } });
    qcInspections.value = qcsRes.data.inspections.map((i: any) => ({
      id: i.id,
      label: `${i.code} - ${i.grn?.supplier?.name || 'Unknown Vendor'}`,
      items: i.items
    }));

    // Load Items for Ad-hoc
    const itemsRes = await api.get('/inventory/items');
    items.value = itemsRes.data.items.map((i: any) => ({
      id: i.id,
      label: `[${i.code}] ${i.name}`
    }));
  } catch (e) {}
}

function onQcSelected(val: any) {
  const qc = qcInspections.value.find(i => i.id === val.value);
  if (qc && qc.items?.length > 0) {
     const failedItem = qc.items.find((i: any) => Number(i.failedQty) > 0) || qc.items[0];
     form.itemId = failedItem.itemId;
     form.qty = Number(failedItem.failedQty || 0);
     form.description = `Temuan otomatis dari Inspeksi ${qc.label}. Alasan: ${failedItem.defectReason || 'Tidak disebutkan'}`;
  }
}

function openCreate() {
  Object.assign(form, {
    id: null,
    mode: 'QC',
    qcId: null,
    itemId: null,
    qty: 0,
    severity: 'MEDIUM',
    ncrType: 'MATERIAL',
    description: '',
    rootCause: '',
    disposition: 'PENDING',
    status: 'OPEN',
    code: `NCR-${new Date().getTime().toString().substr(-6)}`
  });
  loadReferences();
  drawerVisible.value = true;
}

function openView(ncr: any) {
  Object.assign(form, {
    ...ncr,
    mode: ncr.qcId ? 'QC' : 'AD_HOC'
  });
  drawerVisible.value = true;
}

async function saveNcr() {
  saving.value = true;
  try {
    if (form.id) {
      await api.patch(`/qms/ncr/${form.id}`, form);
      toast.add({ severity: 'success', summary: 'Diperbarui', detail: 'Data investigasi NCR telah disimpan.' });
    } else {
      await api.post('/qms/ncr', form);
      toast.add({ severity: 'success', summary: 'Berhasil', detail: 'NCR baru telah diterbitkan ke sistem.' });
    }
    drawerVisible.value = false;
    loadNcrs();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: e.message });
  } finally {
    saving.value = false;
  }
}

const stats = computed(() => [
  { label: 'Total Temuan', value: ncrs.value.length, icon: 'pi pi-copy', bg: 'bg-indigo-50', color: 'text-indigo-600' },
  { label: 'Investigasi Aktif', value: ncrs.value.filter(n => n.status === 'UNDER_INVESTIGATION').length, icon: 'pi pi-search', bg: 'bg-amber-50', color: 'text-amber-600' },
  { label: 'Approval Mandatori', value: ncrs.value.filter(n => n.status === 'PENDING_APPROVAL').length, icon: 'pi pi-clock', bg: 'bg-rose-50', color: 'text-rose-600' },
  { label: 'Tuntas (Closed)', value: ncrs.value.filter(n => n.status === 'CLOSED').length, icon: 'pi pi-check-circle', bg: 'bg-emerald-50', color: 'text-emerald-600' },
]);

const getSeverityClass = (sev: string) => {
  switch (sev) {
    case 'CRITICAL': return 'bg-rose-50 text-rose-700 border-rose-200';
    case 'HIGH': return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'MEDIUM': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    default: return 'bg-slate-50 text-slate-700 border-slate-200';
  }
};

const getStatusClass = (status: string) => {
  switch (status) {
    case 'CLOSED': return 'bg-emerald-50 text-emerald-700 font-black';
    case 'PENDING_APPROVAL': return 'bg-rose-50 text-rose-700 font-black';
    case 'UNDER_INVESTIGATION': return 'bg-amber-50 text-amber-700 font-black';
    case 'OPEN': return 'bg-slate-50 text-slate-600 border border-slate-200 font-bold';
    default: return 'bg-slate-50 text-slate-600 font-bold';
  }
};

onMounted(loadNcrs);
watch(() => filters.status, loadNcrs);
</script>

<style scoped>
:deep(.p-select), :deep(.p-inputnumber) {
  border-radius: 1rem !important;
}

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
  background: rgba(238, 242, 255, 0.4) !important;
}

:deep(.p-datatable-tbody > tr > td) {
  padding: 1.25rem 1rem !important;
  border-bottom: 1px solid #f8fafc !important;
}

select { 
  appearance: none; 
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e"); 
  background-repeat: no-repeat; 
  background-position: right 0.75rem center; 
  background-size: 0.8em; 
}
</style>
