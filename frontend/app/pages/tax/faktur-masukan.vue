<template>
  <div class="p-4 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 overflow-hidden relative p-8 rounded-xl bg-white border border-slate-200 shadow-sm">
      <div class="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-emerald-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Pajak Pengadaan</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-emerald-600">Manajemen PPN Masukan</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2">Faktur <span class="text-emerald-600">Masukan</span></h1>
        <p class="text-slate-500 text-sm font-medium">Kelola faktur pajak masukan dari pemasok untuk rekonsiliasi PPN Masa.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <div class="flex flex-col items-end mr-4">
           <span class="text-[10px] font-black text-slate-400 uppercase">Masa Pajak</span>
           <InputText v-model="filterPeriod" placeholder="YYYY-MM" class="p-inputtext-sm border-none bg-transparent text-right font-black w-24" />
        </div>
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="load" :loading="loading" />
        <Button label="Faktur Masukan Baru" icon="pi pi-plus" class="p-button-rounded font-black text-xs shadow-lg shadow-emerald-100 p-button-success" @click="openNew" />
      </div>
    </div>

    <!-- Stats Section -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
       <div v-for="s in stats" :key="s.label" class="group p-4 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <i :class="[s.icon, 'text-6xl']"></i>
          </div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ s.label }}</p>
          <h3 class="text-2xl font-black text-slate-900">{{ s.prefix }} {{ fmtNumber(s.value) }}</h3>
          <div class="flex items-center gap-2 mt-2">
             <span :class="['text-[10px] font-bold px-2 py-0.5 rounded-full', s.color]">{{ s.sub }}</span>
          </div>
       </div>
    </div>

    <!-- Main List Area -->
    <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col">
       <div class="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/10">
          <div>
             <h2 class="text-[13px] font-black text-slate-900 uppercase tracking-widest">Buku PPN Masukan</h2>
             <p class="text-xs text-slate-500 font-medium">Riwayat faktur pajak yang diterima dari mitra vendor.</p>
          </div>
       </div>

       <DataTable :value="invoices" dataKey="id" class="p-datatable-sm w-full" :loading="loading">
          <Column field="invoiceNo" header="INVOICE VENDOR" class="pl-8">
             <template #body="{ data }">
                <div class="flex flex-col">
                   <span class="text-[11px] font-black text-slate-800">{{ data.invoiceNo }}</span>
                   <span class="text-[9px] font-bold text-slate-400 uppercase">{{ fmtDate(data.invoiceDate) }}</span>
                </div>
             </template>
          </Column>
          <Column header="PEMASOK">
             <template #body="{ data }">
                <div class="flex flex-col">
                   <span class="text-[11px] font-bold text-slate-700">{{ data.customerName || 'Vendor' }}</span>
                   <span class="text-[10px] font-mono text-slate-400">{{ data.customerNpwp || '01.000.000.0-000.000' }}</span>
                </div>
             </template>
          </Column>
          <Column header="NOMOR FP (NSFP)">
             <template #body="{ data }">
                <span v-if="data.fpNumber" class="font-mono text-[11px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100">
                   {{ data.fpNumber }}
                </span>
                <span v-else class="text-[10px] font-bold text-slate-400 italic">Tanpa Nomor FP</span>
             </template>
          </Column>
          <Column header="NILAI DPP" class="text-right">
             <template #body="{ data }">
                <div class="flex flex-col items-end">
                   <span class="text-[11px] font-black text-slate-800">{{ fmtNumber(data.baseAmount) }}</span>
                   <span class="text-[9px] font-bold text-emerald-500 uppercase">PPN: {{ fmtNumber(data.taxAmount) }}</span>
                </div>
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
                   <Button icon="pi pi-pencil" severity="secondary" rounded text @click="edit(data)" />
                </div>
             </template>
          </Column>
       </DataTable>
    </div>

    <!-- New/Edit Dialog -->
    <Dialog v-model:visible="drawerOpen" :header="editingId ? 'Edit Faktur Masukan' : 'Faktur Masukan Baru'" modal class="w-full max-w-2xl overflow-hidden !rounded-xl" :pt="{
       header: { class: 'p-8 border-b border-slate-100' },
       content: { class: 'p-8 pb-10 max-h-[70vh] overflow-y-auto' },
       footer: { class: 'p-8 border-t border-slate-100 bg-slate-50/50' }
    }">
       <div class="space-y-8">
          <!-- Section 1: Purchase Info -->
          <div class="space-y-4">
             <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-black">1</div>
                <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Informasi Pembelian</h4>
             </div>
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Tanggal Invoice</label>
                   <InputText v-model="form.invoiceDate" type="date" class="w-full !rounded-2xl !p-3 border-slate-200" />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">No Invoice Vendor</label>
                   <InputText v-model="form.invoiceNo" class="w-full !rounded-2xl !p-3 border-slate-200" />
                </div>
             </div>
          </div>

          <!-- Section 2: Supplier Info -->
          <div class="space-y-4">
             <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-black">2</div>
                <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Identitas Pemasok</h4>
             </div>
             <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Nama Pemasok</label>
                <InputText v-model="form.customerName" class="w-full !rounded-2xl !p-3 border-slate-200" />
             </div>
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Nomor NSFP (Input)</label>
                   <InputText v-model="form.fpNumber" class="w-full !rounded-2xl !p-3 border-slate-200 font-mono" placeholder="010.000-24.xxxxxxxx" />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Tanggal NSFP</label>
                   <InputText v-model="form.fpDate" type="date" class="w-full !rounded-2xl !p-3 border-slate-200" />
                </div>
             </div>
          </div>

          <!-- Section 3: Tax Values -->
          <div class="space-y-4 p-4 rounded-[2rem] bg-slate-50 border border-slate-100">
             <div class="flex items-center gap-3 mb-2">
                <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-black">3</div>
                <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Nilai Kena Pajak</h4>
             </div>
             <div class="space-y-3">
                <div class="flex justify-between items-center text-sm">
                   <span class="font-black text-slate-500 uppercase text-[10px] tracking-widest">Nilai DPP</span>
                   <InputNumber v-model="form.baseAmount" mode="currency" currency="IDR" locale="id-ID" class="p-inputtext-sm text-right" pt:input:class="!border-none !bg-transparent font-black" @input="calcVat" />
                </div>
                <div class="flex justify-between items-center text-sm">
                   <span class="font-black text-slate-500 uppercase text-[10px] tracking-widest">Nilai PPN</span>
                   <InputNumber v-model="form.taxAmount" mode="currency" currency="IDR" locale="id-ID" class="p-inputtext-sm text-right" pt:input:class="!border-none !bg-transparent font-black" />
                </div>
                <div class="pt-4 border-t border-slate-200 flex justify-between items-center">
                   <span class="font-black text-slate-900 uppercase text-[10px] tracking-widest">Total Nilai Pembelian</span>
                   <span class="text-xl font-black text-slate-900 tracking-tighter">IDR {{ fmtNumber(Number(form.baseAmount) + Number(form.taxAmount)) }}</span>
                </div>
             </div>
          </div>
       </div>

       <template #footer>
          <div class="flex gap-3 justify-end w-full">
             <Button label="Batalkan" severity="secondary" text @click="drawerOpen = false" class="text-[10px] font-black uppercase" />
             <Button label="Simpan Faktur" icon="pi pi-check-circle" class="p-button-rounded p-button-success font-black text-[10px] uppercase shadow-lg px-8" @click="save" :loading="saving" />
          </div>
       </template>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
const api = useApi();
const toast = useToast();

const filterPeriod = ref((new Date().getFullYear()) + '-' + (new Date().getMonth() + 1).toString().padStart(2, '0'));
const loading = ref(false);
const saving = ref(false);
const drawerOpen = ref(false);
const editingId = ref('');
const invoices = ref<any[]>([]);

const form = ref<any>({
  invoiceNo: '',
  invoiceDate: new Date().toISOString().slice(0, 10),
  customerName: '',
  customerNpwp: '',
  baseAmount: 0,
  taxAmount: 0,
  fpNumber: '',
  fpDate: new Date().toISOString().slice(0, 10)
});

const stats = computed(() => {
  const totalPpn = invoices.value.reduce((s, i) => s + (Number(i.taxAmount) || 0), 0);
  const totalDpp = invoices.value.reduce((s, i) => s + (Number(i.baseAmount) || 0), 0);
  return [
    { label: 'Total PPN Masukan', value: totalPpn, prefix: 'IDR', sub: filterPeriod.value, icon: 'pi pi-cloud-download', color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Dasar Pembelian (DPP)', value: totalDpp, prefix: 'IDR', sub: 'DPP Masukan', icon: 'pi pi-shopping-bag', color: 'bg-blue-50 text-blue-600' },
    { label: 'Dapat Dikreditkan', value: invoices.value.filter(i => i.status === 'POSTED').length, prefix: '', sub: 'Faktur Resmi', icon: 'pi pi-check-double', color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Belum Dikreditkan', value: invoices.value.filter(i => i.status === 'DRAFT').length, prefix: '', sub: 'Tertunda', icon: 'pi pi-exclamation-circle', color: 'bg-amber-50 text-amber-600' }
  ];
});

function fmtNumber(v: any) {
  if (!v) return '0';
  return new Intl.NumberFormat('id-ID').format(v);
}

function fmtDate(d: string) {
  return d ? d.slice(0, 10) : '-';
}

function getStatusClass(s: string) {
  if (s === 'POSTED') return 'bg-emerald-50 text-emerald-700';
  if (s === 'DRAFT') return 'bg-slate-50 text-slate-600 border border-slate-200';
  return 'bg-red-50 text-red-700';
}

function calcVat() {
  form.value.taxAmount = Number(form.value.baseAmount) * 0.11;
}

async function load() {
  loading.value = true;
  try {
    const params = { period: filterPeriod.value };
    console.log('[DEBUG] Calling Masukan API with:', params);
    
    const res = await api.get('/finance/tax/faktur-masukan', { params });
    
    // Support multiple response formats to be safe
    if (res && res.invoices) {
      invoices.value = res.invoices;
    } else if (res && res.data && res.data.invoices) {
      invoices.value = res.data.invoices;
    } else if (Array.isArray(res)) {
      invoices.value = res;
    } else {
      invoices.value = [];
    }
    
    console.log('Invoices data assigned:', invoices.value.length, 'records');
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Load Failed', detail: e.message });
  } finally {
    loading.value = false;
  }
}

function openNew() {
  editingId.value = '';
  form.value = { 
    invoiceNo: '', invoiceDate: new Date().toISOString().slice(0, 10), 
    customerName: '', customerNpwp: '',
    baseAmount: 0, taxAmount: 0, fpNumber: '', fpDate: new Date().toISOString().slice(0, 10)
  };
  drawerOpen.value = true;
}

function edit(data: any) {
  editingId.value = data.id;
  form.value = { 
    ...data, 
    invoiceDate: data.invoiceDate?.slice(0, 10),
    fpDate: data.fpDate?.slice(0, 10)
  };
  drawerOpen.value = true;
}

async function save() {
  saving.value = true;
  try {
    if (editingId.value) {
      await api.patch(`/finance/tax/faktur-masukan/${editingId.value}`, form.value);
    } else {
      await api.post('/finance/tax/faktur-masukan', form.value);
    }
    toast.add({ severity: 'success', summary: 'Record Saved', detail: 'Faktur Pajak Masukan recorded successfully.' });
    drawerOpen.value = false;
    load();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Save Failed', detail: e.message });
  } finally {
    saving.value = false;
  }
}

onMounted(load);
watch(filterPeriod, load);
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
  background: rgba(236, 253, 245, 0.4) !important;
}

:deep(.p-datatable-tbody > tr > td) {
  padding: 1.25rem 1rem !important;
  border-bottom: 1px solid #f8fafc !important;
}
</style>