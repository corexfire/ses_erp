<template>
  <div class="p-6 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-8 rounded-xl bg-white border border-slate-200 shadow-sm">
      <div class="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-amber-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Pajak Penghasilan</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-amber-600">Manajemen Pemotongan</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2">e-Bupot <span class="text-amber-600">Unifikasi</span></h1>
        <p class="text-slate-500 text-sm font-medium">Kelola sertifikat pemotongan PPh (Bukti Potong) untuk Pasal 22, 23, 15, dan 4(2).</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <div class="flex flex-col items-end mr-4">
           <span class="text-[10px] font-black text-slate-400 uppercase">Masa Pajak</span>
           <InputText v-model="filterPeriod" placeholder="YYYY-MM" class="p-inputtext-sm border-none bg-transparent text-right font-black w-24" />
        </div>
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="load" :loading="loading" />
        <Button label="Pemotongan Baru" icon="pi pi-plus" class="p-button-rounded font-black text-xs shadow-lg shadow-amber-100 p-button-warning" @click="openNew" />
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
             <h2 class="text-[13px] font-black text-slate-900 uppercase tracking-widest">Buku Pemotongan</h2>
             <p class="text-xs text-slate-500 font-medium">Riwayat pemotongan PPh dan penerbitan sertifikat.</p>
          </div>
       </div>

       <DataTable :value="withholdings" dataKey="id" class="p-datatable-sm w-full" :loading="loading">
          <Column field="transNo" header="TRANSAKSI" class="pl-8">
             <template #body="{ data }">
                <div class="flex flex-col">
                   <span class="text-[11px] font-black text-slate-800">{{ data.transNo }}</span>
                   <span class="text-[9px] font-bold text-slate-400 uppercase">{{ fmtDate(data.transDate) }}</span>
                </div>
             </template>
          </Column>
          <Column header="PASAL">
             <template #body="{ data }">
                <span class="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-black text-slate-600 border border-slate-200 uppercase">
                   PPh {{ data.incomeType }}
                </span>
             </template>
          </Column>
          <Column header="WAJIB PAJAK (VENDOR/PEGAWAI)">
             <template #body="{ data }">
                <div class="flex flex-col">
                   <span class="text-[11px] font-bold text-slate-700">{{ data.taxpayerName }}</span>
                   <span class="text-[10px] font-mono text-slate-400">{{ data.npwp || 'Tanpa NPWP' }}</span>
                </div>
             </template>
          </Column>
          <Column header="NILAI DIPOTONG" class="text-right">
             <template #body="{ data }">
                <div class="flex flex-col items-end">
                   <span class="text-[11px] font-black text-amber-700">{{ fmtNumber(data.taxAmount) }}</span>
                   <span class="text-[9px] font-bold text-slate-400 uppercase">Bruto: {{ fmtNumber(data.grossAmount) }}</span>
                </div>
             </template>
          </Column>
          <Column header="NOMOR BUPOT">
             <template #body="{ data }">
                <span v-if="data.bupotNo" class="font-mono text-[11px] font-black text-white bg-slate-900 px-2 py-1 rounded-lg">
                   {{ data.bupotNo }}
                </span>
                <span v-else class="text-[10px] font-bold text-slate-400 italic">Belum Terbit</span>
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
                   <Button v-if="!data.bupotNo" icon="pi pi-file-export" severity="warning" rounded text tooltip="Terbitkan Sertifikat" @click="openIssue(data)" />
                   <Button icon="pi pi-pencil" severity="secondary" rounded text @click="edit(data)" />
                </div>
             </template>
          </Column>
       </DataTable>
    </div>

    <!-- New/Edit Drawer -->
    <Drawer v-model:visible="drawerOpen" :header="editingId ? 'Edit Pemotongan' : 'Transaksi Pemotongan Baru'" position="right" class="w-[550px]">
       <div class="space-y-8 pt-4 px-4 overflow-y-auto pb-20">
          <div class="space-y-4">
             <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs">1</div>
                <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Detail Transaksi</h4>
             </div>
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase">Tanggal Transaksi</label>
                   <InputText v-model="form.transDate" type="date" class="w-full rounded-xl" />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase">Nomor Ref (Invoice)</label>
                   <InputText v-model="form.transNo" class="w-full rounded-xl" />
                </div>
             </div>
             <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-400 uppercase">Pasal Pajak</label>
                <div class="flex gap-2">
                   <Button v-for="t in ['21', '22', '23', '4(2)']" :key="t" :label="'PPh '+t" 
                           :severity="form.incomeType === t ? 'warning' : 'secondary'" 
                           class="flex-1 text-[10px] font-black uppercase rounded-xl" 
                           @click="form.incomeType = t" />
                </div>
             </div>
          </div>

          <div class="space-y-4">
             <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-white text-xs">2</div>
                <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Identitas Wajib Pajak</h4>
             </div>
             <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-400 uppercase">Nama Lawan Transaksi</label>
                <InputText v-model="form.taxpayerName" class="w-full rounded-xl" />
             </div>
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase">NPWP / NIK</label>
                   <InputText v-model="form.npwp" class="w-full rounded-xl" placeholder="00.000.000.0-000.000" />
                </div>
             </div>
          </div>

          <div class="space-y-4 p-6 rounded-3xl bg-slate-50 border border-slate-100">
             <div class="flex items-center gap-3 mb-2">
                <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs">3</div>
                <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Perhitungan</h4>
             </div>
             <div class="space-y-3">
                <div class="flex justify-between items-center text-sm">
                   <span class="font-bold text-slate-500 uppercase text-[10px]">Nilai Bruto</span>
                   <InputNumber v-model="form.grossAmount" mode="currency" currency="IDR" locale="id-ID" class="p-inputtext-sm text-right" @input="calcTax" />
                </div>
                <div class="flex justify-between items-center text-sm">
                   <span class="font-bold text-slate-500 uppercase text-[10px]">Tarif Pajak (%)</span>
                   <InputNumber v-model="form.rate" class="p-inputtext-sm text-right w-20" :minFractionDigits="1" @input="calcTax" />
                </div>
                <div class="flex justify-between items-center text-sm pt-2 border-t">
                   <span class="font-black text-slate-900 uppercase text-[11px]">Nilai Dipotong</span>
                   <span class="text-xl font-black text-amber-700">IDR {{ fmtNumber(form.taxAmount) }}</span>
                </div>
             </div>
          </div>

          <div class="fixed bottom-0 left-0 w-full bg-white p-6 border-t flex justify-end gap-3 rounded-t-[2rem] shadow-2xl">
             <Button label="Batal" severity="secondary" text @click="drawerOpen = false" class="font-black text-[10px] uppercase" />
             <Button label="Simpan Transaksi" icon="pi pi-save" class="p-button-rounded font-black text-[10px] uppercase px-8 p-button-warning" @click="save" :loading="saving" />
          </div>
       </div>
    </Drawer>

    <!-- Issue Certificate Modal -->
    <Dialog v-model:visible="issueDialog" header="Penerbitan Sertifikat Resmi" modal class="w-full max-w-md !rounded-xl" :pt="{
       header: { class: 'p-8 border-b' }, content: { class: 'p-8' }, footer: { class: 'p-8 border-t' }
    }">
       <div class="space-y-6">
          <div class="p-4 rounded-2xl bg-amber-50 border border-amber-100 flex items-start gap-3">
             <i class="pi pi-info-circle text-amber-600 mt-0.5"></i>
             <p class="text-[11px] text-amber-800 leading-relaxed font-medium">Berikan nomor Bukti Potong untuk memfinalisasi pemotongan ini. Nomor ini harus mengikuti urutan e-Bupot Unifikasi.</p>
          </div>
          <div class="space-y-4">
             <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Nomor Bupot</label>
                <InputText v-model="issueForm.bupotNo" class="w-full !rounded-2xl !p-3 font-mono border-slate-200" placeholder="XX-XXXXXXXX" />
             </div>
             <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Tanggal Terbit</label>
                <InputText v-model="issueForm.bupotDate" type="date" class="w-full !rounded-2xl !p-3 border-slate-200" />
             </div>
          </div>
       </div>
       <template #footer>
          <div class="flex gap-3 justify-end w-full">
             <Button label="Batal" severity="secondary" text @click="issueDialog = false" class="text-[10px] font-black uppercase" />
             <Button label="Generate Bupot" icon="pi pi-check-circle" class="p-button-rounded p-button-warning px-8 text-[10px] font-black uppercase shadow-lg shadow-amber-100" @click="issueBupot" :loading="issuing" />
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
const issuing = ref(false);
const drawerOpen = ref(false);
const issueDialog = ref(false);
const editingId = ref('');
const currentId = ref('');
const withholdings = ref<any[]>([]);

const form = ref<any>({
  transNo: '',
  transDate: new Date().toISOString().slice(0, 10),
  incomeType: '23',
  taxpayerName: '',
  npwp: '',
  grossAmount: 0,
  rate: 2,
  taxAmount: 0
});

const issueForm = ref({
  bupotNo: '',
  bupotDate: new Date().toISOString().slice(0, 10)
});

const stats = computed(() => {
  const totalTax = withholdings.value.reduce((s, w) => s + (Number(w.taxAmount) || 0), 0);
  const totalGross = withholdings.value.reduce((s, w) => s + (Number(w.grossAmount) || 0), 0);
  return [
    { label: 'Total PPh Dipotong', value: totalTax, prefix: 'IDR', sub: filterPeriod.value, icon: 'pi pi-percentage', color: 'bg-amber-50 text-amber-600' },
    { label: 'Bruto Kena Pajak', value: totalGross, prefix: 'IDR', sub: 'Pasal PPh', icon: 'pi pi-wallet', color: 'bg-blue-50 text-blue-600' },
    { label: 'Sertifikat Resmi', value: withholdings.value.filter(w => w.status === 'POSTED').length, prefix: '', sub: 'Bupot Terbit', icon: 'pi pi-verified', color: 'bg-slate-900 text-white' },
    { label: 'Menunggu Penerbitan', value: withholdings.value.filter(w => w.status === 'DRAFT').length, prefix: '', sub: 'Data Belum Terbit', icon: 'pi pi-clock', color: 'bg-red-50 text-red-600' }
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
  if (s === 'POSTED') return 'bg-slate-900 text-white';
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
    const res = await api.get('/finance/tax/e-bupot', { params });
    
    // Support robust response check
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
    transNo: '', transDate: new Date().toISOString().slice(0, 10), 
    incomeType: '23', taxpayerName: '', npwp: '',
    grossAmount: 0, rate: 2, taxAmount: 0
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
      await api.patch(`/finance/tax/e-bupot/${editingId.value}`, form.value);
    } else {
      await api.post('/finance/tax/e-bupot', form.value);
    }
    toast.add({ severity: 'success', summary: 'Record Saved', detail: 'Withholding transaction recorded successfully.' });
    drawerOpen.value = false;
    load();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Save Failed', detail: e.message });
  } finally {
    saving.value = false;
  }
}

function openIssue(w: any) {
  currentId.value = w.id;
  issueForm.value = { bupotNo: '', bupotDate: new Date().toISOString().slice(0, 10) };
  issueDialog.value = true;
}

async function issueBupot() {
  issuing.value = true;
  try {
    await api.post(`/finance/tax/e-bupot/${currentId.value}/issue-bupot`, issueForm.value);
    toast.add({ severity: 'success', summary: 'Bupot Issued', detail: 'Tax certificate number attached.' });
    issueDialog.value = false;
    load();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Issuance Failed', detail: e.message });
  } finally {
    issuing.value = false;
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