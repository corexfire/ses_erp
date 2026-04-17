<template>
  <div class="p-6 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-8 rounded-xl bg-white border border-slate-200 shadow-sm">
      <div class="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-red-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Mesin Kepatuhan</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-red-600">Manajemen PPN Keluaran</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2">Faktur Pajak <span class="text-red-600">Keluaran</span></h1>
        <p class="text-slate-500 text-sm font-medium">Penerbitan faktur pajak PPN resmi untuk penjualan dan penagihan progres (Termijn).</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <div class="flex flex-col items-end mr-4">
           <span class="text-[10px] font-black text-slate-400 uppercase">Masa Pajak</span>
           <InputText v-model="filterPeriod" placeholder="YYYY-MM" class="p-inputtext-sm border-none bg-transparent text-right font-black w-24" />
        </div>
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="load" :loading="loading" />
        <Button label="Buat dari Invoice" icon="pi pi-bolt" class="p-button-rounded p-button-warning font-black text-xs shadow-lg" @click="openAutoGenerate" />
        <Button label="Faktur Baru" icon="pi pi-plus" class="p-button-rounded font-black text-xs shadow-lg shadow-red-100" @click="openNew" />
      </div>
    </div>

    <!-- Stats Section -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
       <div v-for="s in stats" :key="s.label" class="group p-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
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
             <h2 class="text-[13px] font-black text-slate-900 uppercase tracking-widest">Buku Faktur</h2>
             <p class="text-xs text-slate-500 font-medium">Riwayat penerbitan NSFP dan status kepatuhan pajak.</p>
          </div>
          <div class="flex items-center gap-3">
             <SelectButton v-model="statusFilter" :options="['SEMUA', 'DRAFT', 'POSTED', 'BATAL']" class="p-button-sm text-[10px] font-black uppercase" />
          </div>
       </div>

       <DataTable :value="invoices" dataKey="id" class="p-datatable-sm w-full" :loading="loading">
          <Column field="invoiceNo" header="NO INVOICE" class="pl-8">
             <template #body="{ data }">
                <div class="flex flex-col">
                   <span class="text-[11px] font-black text-slate-800">{{ data.invoiceNo }}</span>
                   <span class="text-[9px] font-bold text-slate-400 uppercase">{{ data.referenceNo || 'Manual' }}</span>
                </div>
             </template>
          </Column>
          <Column header="PELANGGAN">
             <template #body="{ data }">
                <div class="flex flex-col">
                   <span class="text-[11px] font-bold text-slate-700">{{ data.customerName || 'Pelanggan Standar' }}</span>
                   <span class="text-[10px] font-mono text-slate-400">{{ data.customerNpwp || '00.000.000.0-000.000' }}</span>
                </div>
             </template>
          </Column>
          <Column header="NOMOR NSFP">
             <template #body="{ data }">
                <span v-if="data.fpNumber" class="font-mono text-[11px] font-black text-red-600 bg-red-50 px-2 py-1 rounded-lg border border-red-100">
                   {{ data.fpNumber }}
                </span>
                <span v-else class="text-[10px] font-bold text-slate-400 italic">NSFP Belum Dialokasikan</span>
             </template>
          </Column>
          <Column header="DPP" class="text-right">
             <template #body="{ data }">
                <div class="flex flex-col items-end">
                   <span class="text-[11px] font-black text-slate-800">{{ fmtNumber(data.baseAmount) }}</span>
                   <span class="text-[9px] font-bold text-emerald-500 uppercase">PPN 11%: {{ fmtNumber(data.taxAmount) }}</span>
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
                   <Button icon="pi pi-pencil" severity="secondary" rounded text @click="edit(data)" v-if="data.status === 'DRAFT'" />
                   <Button label="Terbitkan FP" icon="pi pi-check-circle" size="small" severity="danger" v-if="data.status === 'DRAFT'" @click="issueFp(data)" />
                   <Button icon="pi pi-print" severity="secondary" rounded text v-if="data.status === 'POSTED'" />
                </div>
             </template>
          </Column>
       </DataTable>
    </div>

    <!-- New/Edit Drawer -->
    <Drawer v-model:visible="drawerOpen" :header="editingId ? 'Edit Faktur Pajak' : 'Faktur Pajak Baru'" position="right" class="w-[550px]">
       <div class="space-y-8 pt-4 px-4 overflow-y-auto pb-20">
          <!-- Section: Document Header -->
          <div class="space-y-4">
             <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs">1</div>
                <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Informasi Dokumen</h4>
             </div>
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase">Tanggal Faktur</label>
                   <InputText v-model="form.invoiceDate" type="date" class="w-full rounded-xl" />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase">No Invoice Internal</label>
                   <InputText v-model="form.invoiceNo" class="w-full rounded-xl" />
                </div>
             </div>
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase">Masa Pajak (Bulan)</label>
                   <InputText v-model="form.taxPeriod" class="w-full rounded-xl" placeholder="04" />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase">Tahun Pajak (YYYY)</label>
                   <InputNumber v-model="form.taxYear" class="w-full rounded-xl" :useGrouping="false" />
                </div>
             </div>
          </div>

          <!-- Section: Customer -->
          <div class="space-y-4">
             <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white text-xs">2</div>
                <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Identitas Pajak (Lawan Transaksi)</h4>
             </div>
             <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-400 uppercase">Nama Pelanggan</label>
                <InputText v-model="form.customerName" class="w-full rounded-xl" />
             </div>
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase">NPWP (15 Digit)</label>
                   <InputText v-model="form.customerNpwp" class="w-full rounded-xl" placeholder="00.000.000.0-000.000" />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase">NIK (Jika Tanpa NPWP)</label>
                   <InputText v-model="form.customerNik" class="w-full rounded-xl" />
                </div>
             </div>
             <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-400 uppercase">Alamat Pajak</label>
                <Textarea v-model="form.customerAddress" rows="3" class="w-full rounded-xl" />
             </div>
          </div>

          <!-- Section: Value -->
          <div class="space-y-4 p-6 rounded-3xl bg-slate-50 border border-slate-100">
             <div class="flex items-center gap-3 mb-2">
                <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs">3</div>
                <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Nilai Kena Pajak (DPP & PPN)</h4>
             </div>
             <div class="space-y-3">
                <div class="flex justify-between items-center text-sm">
                   <span class="font-bold text-slate-500 uppercase text-[10px]">Nilai DPP (Dasar Pengenaan Pajak)</span>
                   <InputNumber v-model="form.baseAmount" mode="currency" currency="IDR" locale="id-ID" class="p-inputtext-sm text-right" @input="calcVat" />
                </div>
                <div class="flex justify-between items-center text-sm">
                   <span class="font-bold text-slate-500 uppercase text-[10px]">Nilai PPN (11%)</span>
                   <InputNumber v-model="form.taxAmount" mode="currency" currency="IDR" locale="id-ID" class="p-inputtext-sm text-right" />
                </div>
                <div class="flex justify-between items-center text-sm">
                   <span class="font-bold text-slate-500 uppercase text-[10px]">Bea Meterai</span>
                   <InputNumber v-model="form.stampDuty" mode="currency" currency="IDR" locale="id-ID" class="p-inputtext-sm text-right" />
                </div>
                <div class="pt-3 border-t border-slate-200 flex justify-between items-center">
                   <span class="font-black text-slate-900 uppercase text-[10px]">Total Nilai Faktur</span>
                   <span class="text-lg font-black text-slate-900">IDR {{ fmtNumber(Number(form.baseAmount) + Number(form.taxAmount) + Number(form.stampDuty)) }}</span>
                </div>
             </div>
          </div>

          <div class="fixed bottom-0 left-0 w-full bg-white p-6 border-t flex justify-end gap-3 rounded-t-[2rem] shadow-2xl">
             <Button label="Batalkan" severity="secondary" text @click="drawerOpen = false" class="font-black text-[10px] uppercase" />
             <Button label="Simpan Draft" icon="pi pi-save" class="p-button-rounded font-black text-[10px] uppercase px-8" @click="save" :loading="saving" />
          </div>
       </div>
    </Drawer>

    <!-- Auto Gen Selector -->
    <Dialog v-model:visible="autoGenOpen" header="Pilih Invoice untuk Sinkronisasi" class="w-full max-w-2xl">
       <div class="space-y-4 pt-4">
          <DataTable :value="salesInvoices" class="p-datatable-sm" @row-click="(e) => confirmAutoGen(e.data)">
             <Column field="code" header="NO INVOICE"></Column>
             <Column field="customer.name" header="PELANGGAN"></Column>
             <Column header="NILAI" class="text-right">
                <template #body="{ data }">
                   {{ fmtNumber(data.items?.reduce((s, i) => s + (Number(i.qty) * Number(i.unitPrice)), 0)) }}
                </template>
             </Column>
             <Column class="text-right">
                <template #body="{ data }">
                   <Button icon="pi pi-bolt" rounded severity="warning" @click="confirmAutoGen(data)" />
                </template>
             </Column>
          </DataTable>
       </div>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
const api = useApi();
const toast = useToast();

const filterPeriod = ref((new Date().getFullYear()) + '-' + (new Date().getMonth() + 1).toString().padStart(2, '0'));
const statusFilter = ref('ALL');
const loading = ref(false);
const saving = ref(false);
const drawerOpen = ref(false);
const autoGenOpen = ref(false);
const editingId = ref('');
const invoices = ref<any[]>([]);
const salesInvoices = ref<any[]>([]);

const form = ref<any>({
  invoiceNo: '',
  invoiceDate: new Date().toISOString().slice(0, 10),
  taxPeriod: (new Date().getMonth() + 1).toString().padStart(2, '0'),
  taxYear: new Date().getFullYear(),
  customerName: '',
  customerNpwp: '',
  customerNik: '',
  customerAddress: '',
  baseAmount: 0,
  taxAmount: 0,
  stampDuty: 0,
  referenceNo: '',
  referenceType: 'MANUAL'
});

const stats = computed(() => {
  const totalPpn = invoices.value.reduce((s, i) => s + (Number(i.taxAmount) || 0), 0);
  const totalDpp = invoices.value.reduce((s, i) => s + (Number(i.baseAmount) || 0), 0);
  return [
    { label: 'Total PPN Keluaran', value: totalPpn, prefix: 'IDR', sub: filterPeriod.value, icon: 'pi pi-chart-line', color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Total Dasar Pengenaan Pajak', value: totalDpp, prefix: 'IDR', sub: 'Penjualan Kena Pajak', icon: 'pi pi-database', color: 'bg-blue-50 text-blue-600' },
    { label: 'Menunggu Penerbitan', value: invoices.value.filter(i => i.status === 'DRAFT').length, prefix: '', sub: 'Mode Draft', icon: 'pi pi-clock', color: 'bg-amber-50 text-amber-600' },
    { label: 'Faktur Terposting', value: invoices.value.filter(i => i.status === 'POSTED').length, prefix: '', sub: 'Faktur Resmi', icon: 'pi pi-check-circle', color: 'bg-indigo-50 text-indigo-600' }
  ];
});

function fmtNumber(v: any) {
  if (!v) return '0';
  return new Intl.NumberFormat('id-ID').format(v);
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
    const params = { 
      period: filterPeriod.value, 
      status: statusFilter.value !== 'ALL' ? statusFilter.value : undefined 
    };
    console.log('[DEBUG] Calling API /tax/faktur-keluaran with:', params);
    
    const res = await api.get('/finance/tax/faktur-keluaran', { params });
    
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

async function openAutoGenerate() {
  try {
    const res = await api.get('/sales/invoices');
    salesInvoices.value = (res.data || res).filter((i: any) => i.status === 'POSTED');
    autoGenOpen.value = true;
  } catch (e) {}
}

async function confirmAutoGen(inv: any) {
  try {
    await api.post(`/finance/tax/faktur-keluaran/auto-generate-from-sales/${inv.id}`);
    toast.add({ severity: 'success', summary: 'Faktur Generated', detail: 'Tax invoice metadata imported from Sales Invoice.' });
    autoGenOpen.value = false;
    load();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Auto Gen Error', detail: e.message });
  }
}

function openNew() {
  editingId.value = '';
  form.value = { 
    invoiceNo: '', invoiceDate: new Date().toISOString().slice(0, 10), 
    taxPeriod: (new Date().getMonth() + 1).toString().padStart(2, '0'), taxYear: new Date().getFullYear(),
    customerName: '', customerNpwp: '', customerNik: '', customerAddress: '', 
    baseAmount: 0, taxAmount: 0, stampDuty: 0, referenceNo: '', referenceType: 'MANUAL' 
  };
  drawerOpen.value = true;
}

function edit(data: any) {
  editingId.value = data.id;
  form.value = { ...data, invoiceDate: data.invoiceDate?.slice(0, 10) };
  drawerOpen.value = true;
}

async function save() {
  saving.value = true;
  try {
    if (editingId.value) {
      await api.patch(`/finance/tax/faktur-keluaran/${editingId.value}`, form.value);
    } else {
      await api.post('/finance/tax/faktur-keluaran', form.value);
    }
    toast.add({ severity: 'success', summary: 'Draft Saved', detail: 'Faktur Pajak data has been recorded.' });
    drawerOpen.value = false;
    load();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Save Failed', detail: e.message });
  } finally {
    saving.value = false;
  }
}

async function issueFp(inv: any) {
  try {
    await api.post(`/finance/tax/faktur-keluaran/${inv.id}/issue-fp`);
    toast.add({ severity: 'success', summary: 'FP Issued', detail: 'NSFP allocated and Faktur posted successfully.' });
    load();
  } catch (e: any) {
    toast.add({ severity: 'warn', summary: 'NSFP Error', detail: e.message });
  }
}

onMounted(load);
watch(filterPeriod, load);
watch(statusFilter, load);
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
  background: rgba(254, 242, 242, 0.4) !important;
}

:deep(.p-datatable-tbody > tr > td) {
  padding: 1.25rem 1rem !important;
  border-bottom: 1px solid #f8fafc !important;
}
</style>