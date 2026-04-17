<template>
  <div class="p-6 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-8 rounded-xl bg-white border border-slate-200 shadow-sm">
      <div class="absolute top-0 left-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -ml-32 -mt-32"></div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-amber-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Pajak Gaji</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-amber-600">Manajemen Pasal 21</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2">PPh <span class="text-amber-600">Pasal 21</span></h1>
        <p class="text-slate-500 text-sm font-medium">Kelola pemotongan pajak penghasilan untuk pegawai tetap dan tenaga kerja lepas.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <div class="flex flex-col items-end mr-4">
           <span class="text-[10px] font-black text-slate-400 uppercase">Bulan Penggajian</span>
           <InputText v-model="filterPeriod" placeholder="YYYY-MM" class="p-inputtext-sm border-none bg-transparent text-right font-black w-24" />
        </div>
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="load" :loading="loading" />
        <Button label="Penyesuaian Baru" icon="pi pi-plus" class="p-button-rounded font-black text-xs shadow-lg shadow-amber-100 p-button-warning" @click="openNew" />
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
             <h2 class="text-[13px] font-black text-slate-900 uppercase tracking-widest">Buku Pajak Karyawan</h2>
             <p class="text-xs text-slate-500 font-medium">Rincian bulanan PPh 21 di seluruh organisasi.</p>
          </div>
       </div>

       <DataTable :value="withholdings" dataKey="id" class="p-datatable-sm w-full" :loading="loading">
          <Column field="taxpayerName" header="NAMA KARYAWAN" class="pl-8">
             <template #body="{ data }">
                <div class="flex items-center gap-3">
                   <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-black text-[10px]">
                      {{ data.taxpayerName.split(' ').map(n => n[0]).join('') }}
                   </div>
                   <div class="flex flex-col">
                      <span class="text-[11px] font-black text-slate-800">{{ data.taxpayerName }}</span>
                      <span class="text-[10px] font-mono text-slate-400">{{ data.npwp || 'Tanpa NPWP' }}</span>
                   </div>
                </div>
             </template>
          </Column>
          <Column header="PERIODE / TRANS">
             <template #body="{ data }">
                <div class="flex flex-col">
                   <span class="text-[11px] font-bold text-slate-700">{{ data.transNo }}</span>
                   <span class="text-[9px] font-bold text-slate-400 uppercase">{{ fmtDate(data.transDate) }}</span>
                </div>
             </template>
          </Column>
          <Column header="PENGHASILAN BRUTO" class="text-right">
             <template #body="{ data }">
                <span class="text-[11px] font-black text-slate-800">{{ fmtNumber(data.grossAmount) }}</span>
             </template>
          </Column>
          <Column header="NILAI PPh 21" class="text-right">
             <template #body="{ data }">
                <div class="flex flex-col items-end">
                   <span class="text-[11px] font-black text-amber-700">{{ fmtNumber(data.taxAmount) }}</span>
                   <span class="text-[9px] font-bold text-slate-400 uppercase">Tarif: {{ data.rate }}%</span>
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

    <!-- New/Edit Drawer -->
    <Drawer v-model:visible="drawerOpen" :header="editingId ? 'Edit Catatan PPh 21' : 'Penyesuaian PPh 21 Baru'" position="right" class="w-[500px]">
       <div class="space-y-8 pt-4 px-4 overflow-y-auto pb-20">
          <div class="p-6 rounded-3xl bg-amber-50 border border-amber-100 flex items-start gap-4">
             <i class="pi pi-exclamation-triangle text-amber-600 mt-1"></i>
             <div class="space-y-1">
                <p class="text-[11px] font-black text-amber-900 uppercase">Entri Pajak Manual</p>
                <p class="text-[10px] text-amber-700 leading-relaxed font-medium">Gunakan formulir ini hanya untuk penyesuaian manual atau pajak gaji non-standar. Penggajian otomatis akan menyinkronkan data ke modul ini setelah finalisasi bulanan.</p>
             </div>
          </div>

          <div class="space-y-4">
             <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs">1</div>
                <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Personel & Waktu</h4>
             </div>
             <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-400 uppercase">Nama Karyawan / Subjek</label>
                <InputText v-model="form.taxpayerName" class="w-full rounded-xl" />
             </div>
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase">Tanggal Transaksi</label>
                   <InputText v-model="form.transDate" type="date" class="w-full rounded-xl" />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase">Nomor NPWP</label>
                   <InputText v-model="form.npwp" class="w-full rounded-xl" placeholder="00.000.000.0-000.000" />
                </div>
             </div>
          </div>

          <div class="space-y-4 p-6 rounded-3xl bg-slate-50 border border-slate-100">
             <div class="flex items-center gap-3 mb-2">
                <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs">2</div>
                <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Perhitungan Penghasilan</h4>
             </div>
             <div class="space-y-4">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-500 uppercase">Penghasilan Bruto</label>
                   <InputNumber v-model="form.grossAmount" mode="currency" currency="IDR" locale="id-ID" class="w-full" @input="calcTax" />
                </div>
                <div class="grid grid-cols-2 gap-4">
                   <div class="space-y-1">
                      <label class="text-[10px] font-black text-slate-500 uppercase">Tarif TER (%)</label>
                      <InputNumber v-model="form.rate" class="w-full" :minFractionDigits="1" @input="calcTax" />
                   </div>
                   <div class="space-y-1 text-right">
                      <label class="text-[10px] font-black text-slate-500 uppercase">Nilai Pajak</label>
                      <p class="text-lg font-black text-amber-700 mt-2">IDR {{ fmtNumber(form.taxAmount) }}</p>
                   </div>
                </div>
             </div>
          </div>

          <div class="fixed bottom-0 left-0 w-full bg-white p-6 border-t flex justify-end gap-3 rounded-t-[2rem] shadow-2xl">
             <Button label="Batal" severity="secondary" text @click="drawerOpen = false" class="font-black text-[10px] uppercase" />
             <Button label="Posting PPh 21" icon="pi pi-check" class="p-button-rounded font-black text-[10px] uppercase px-8 p-button-warning" @click="save" :loading="saving" />
          </div>
       </div>
    </Drawer>

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
const withholdings = ref<any[]>([]);

const form = ref<any>({
  transNo: '',
  transDate: new Date().toISOString().slice(0, 10),
  taxpayerName: '',
  npwp: '',
  grossAmount: 0,
  rate: 5,
  taxAmount: 0
});

const stats = computed(() => {
  const totalTax = withholdings.value.reduce((s, w) => s + (Number(w.taxAmount) || 0), 0);
  const totalGross = withholdings.value.reduce((s, w) => s + (Number(w.grossAmount) || 0), 0);
  return [
    { label: 'Total PPh 21', value: totalTax, prefix: 'IDR', sub: filterPeriod.value, icon: 'pi pi-users', color: 'bg-amber-50 text-amber-600' },
    { label: 'Total Bruto Payroll', value: totalGross, prefix: 'IDR', sub: 'Dasar Pengenaan Pajak', icon: 'pi pi-money-bill', color: 'bg-blue-50 text-blue-600' },
    { label: 'Subjek Aktif', value: withholdings.value.length, prefix: '', sub: 'Karyawan', icon: 'pi pi-list', color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Rata-rata Pajak/Orang', value: withholdings.value.length ? totalTax / withholdings.value.length : 0, prefix: 'IDR', sub: 'Rata-rata Bulanan', icon: 'pi pi-chart-line', color: 'bg-slate-900 text-white' }
  ];
});

function fmtNumber(v: any) {
  if (!v) return '0';
  return new Intl.NumberFormat('id-ID').format(Math.round(v));
}

function fmtDate(d: string) {
  return d ? d.slice(0, 10) : '-';
}

function getStatusClass(s: string) {
  if (s === 'POSTED') return 'bg-emerald-50 text-emerald-700';
  if (s === 'DRAFT') return 'bg-amber-50 text-amber-700 border border-amber-200';
  return 'bg-red-50 text-red-700';
}

function calcTax() {
  form.value.taxAmount = (Number(form.value.grossAmount) || 0) * (Number(form.value.rate) || 0) / 100;
}

async function load() {
  loading.value = true;
  try {
    const params = { period: filterPeriod.value };
    const res = await api.get('/finance/tax/pph21', { params });
    
    // Robust loading logic
    const data = res?.data || res || {};
    withholdings.value = data.withholdings || [];
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Load Failed', detail: e.message });
  } finally {
    loading.value = false;
  }
}

function openNew() {
  editingId.value = '';
  form.value = { 
    transNo: 'ADJ/21/'+new Date().getTime().toString().slice(-4), 
    transDate: new Date().toISOString().slice(0, 10), 
    taxpayerName: '', npwp: '', grossAmount: 0, rate: 5, taxAmount: 0
  };
  drawerOpen.value = true;
}

function edit(data: any) {
  editingId.value = data.id;
  form.value = { 
    ...data, 
    transDate: data.transDate?.slice(0, 10),
    taxAmount: Number(data.taxAmount)
  };
  drawerOpen.value = true;
}

async function save() {
  saving.value = true;
  try {
    if (editingId.value) {
      await api.patch(`/finance/tax/pph21/${editingId.value}`, form.value);
    } else {
      await api.post('/finance/tax/pph21', form.value);
    }
    toast.add({ severity: 'success', summary: 'Record Saved', detail: 'PPh 21 entry saved successfully.' });
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
  background: rgba(255, 251, 235, 0.4) !important;
}

:deep(.p-datatable-tbody > tr > td) {
  padding: 1.25rem 1rem !important;
  border-bottom: 1px solid #f8fafc !important;
}
</style>