<template>
  <div class="p-6 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-8 rounded-xl bg-white border border-slate-200 shadow-sm">
      <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-indigo-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Perbendaharaan</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-indigo-600">Generator ID Billing</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2">Penyetoran <span class="text-indigo-600">Pajak</span></h1>
        <p class="text-slate-500 text-sm font-medium">Kelola dan pantau kode billing setoran pajak (ID Billing) untuk semua jenis pajak.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="load" :loading="loading" />
        <Button label="Buat Billing Baru" icon="pi pi-plus" class="p-button-rounded font-black text-xs shadow-lg shadow-indigo-100 px-6" @click="openNew" />
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
             <h2 class="text-[13px] font-black text-slate-900 uppercase tracking-widest">Buku Setoran Pajak</h2>
             <p class="text-xs text-slate-500 font-medium">Daftar kode setoran pajak aktif dan yang sudah disetor.</p>
          </div>
       </div>

       <DataTable :value="billings" dataKey="id" class="p-datatable-sm w-full" :loading="loading">
          <Column field="billingNo" header="KODE BILLING" class="pl-8">
             <template #body="{ data }">
                <div class="flex items-center gap-2">
                   <span class="text-[12px] font-black font-mono text-indigo-700 tracking-tighter">{{ data.billingNo }}</span>
                   <Button icon="pi pi-copy" severity="secondary" text rounded size="small" @click="copy(data.billingNo)" />
                </div>
             </template>
          </Column>
          <Column header="DETAIL PAJAK">
             <template #body="{ data }">
                <div class="flex flex-col">
                   <span class="text-[11px] font-black text-slate-800 uppercase">{{ data.taxType }}</span>
                   <span class="text-[10px] font-bold text-slate-400">Masa: {{ data.period }}</span>
                </div>
             </template>
          </Column>
          <Column header="NILAI SETORAN" class="text-right">
             <template #body="{ data }">
                <span class="text-[11px] font-black text-slate-900">{{ fmtNumber(data.amount) }}</span>
             </template>
          </Column>
          <Column header="BATAS WAKTU / JATUH TEMPO">
             <template #body="{ data }">
                <div class="flex flex-col">
                   <span class="text-[11px] font-bold text-slate-700">{{ fmtDate(data.dueDate) }}</span>
                   <span v-if="data.paidDate" class="text-[9px] font-bold text-emerald-500 uppercase">Dibayar: {{ fmtDate(data.paidDate) }}</span>
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
                   <Button v-if="data.status === 'PENDING'" label="Lunasi Pembayaran" icon="pi pi-check-circle" size="small" rounded severity="success" class="text-[10px] font-black uppercase border-none bg-emerald-500 shadow-lg shadow-emerald-50 hover:bg-emerald-600" @click="markPaid(data)" />
                </div>
             </template>
          </Column>
       </DataTable>
    </div>

    <!-- New Billing Drawer -->
    <Drawer v-model:visible="drawerOpen" header="Daftarkan ID Billing Baru" position="right" class="w-[500px]">
       <div class="space-y-8 pt-4 px-4 overflow-y-auto pb-20">
          <div class="p-6 rounded-3xl bg-indigo-50 border border-indigo-100 flex items-start gap-4">
             <i class="pi pi-shield-check text-indigo-600 mt-1"></i>
             <div class="space-y-1">
                <p class="text-[11px] font-black text-indigo-900 uppercase">Pembuatan Billing</p>
                <p class="text-[10px] text-indigo-700 leading-relaxed font-medium text-justify">Masukkan 15 digit kode billing yang dihasilkan dari sistem SSE DJP. Kode ini akan digunakan untuk melacak pelunasan setoran di ERP.</p>
             </div>
          </div>

          <div class="space-y-4">
             <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs">1</div>
                <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Spesifikasi Billing</h4>
             </div>
             <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-400 uppercase pl-2">15 Digit Kode Billing</label>
                <InputText v-model="form.billingNo" class="w-full !rounded-2xl !p-4 font-mono text-lg tracking-widest text-indigo-700 bg-slate-50" placeholder="000000000000000" maxlength="15" />
             </div>
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase pl-2">Kategori Pajak</label>
                   <Select v-model="form.taxType" :options="['PPN', 'PPh 21', 'PPh 22', 'PPh 23', 'PPh 4(2)']" class="w-full !rounded-2xl" />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase pl-2">Masa Pajak</label>
                   <InputText v-model="form.period" class="w-full !rounded-2xl" placeholder="YYYY-MM" />
                </div>
             </div>
          </div>

          <div class="space-y-4 p-6 rounded-xl bg-slate-50 border border-slate-100">
             <div class="flex items-center gap-3 mb-2">
                <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs">2</div>
                <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Total & Batas Waktu</h4>
             </div>
             <div class="space-y-4">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-500 uppercase pl-2 font-bold">Nilai Setoran</label>
                   <InputNumber v-model="form.amount" mode="currency" currency="IDR" locale="id-ID" class="w-full !p-inputtext-lg" />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-500 uppercase pl-2 font-bold">Tanggal Kadaluarsa</label>
                   <InputText v-model="form.dueDate" type="date" class="w-full !rounded-2xl" />
                </div>
             </div>
          </div>

          <div class="fixed bottom-0 left-0 w-full bg-white p-6 border-t flex justify-end gap-3 rounded-t-[2.5rem] shadow-2xl">
             <Button label="Batal" severity="secondary" text @click="drawerOpen = false" class="font-black text-[10px] uppercase" />
             <Button label="Daftarkan Billing" icon="pi pi-check" class="p-button-rounded font-black text-[10px] uppercase px-8" @click="save" :loading="saving" />
          </div>
       </div>
    </Drawer>

  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
const api = useApi();
const toast = useToast();

const loading = ref(false);
const saving = ref(false);
const drawerOpen = ref(false);
const billings = ref<any[]>([]);

const form = ref({ 
  billingNo: '', 
  taxType: 'PPN', 
  period: new Date().toISOString().slice(0, 7), 
  amount: 0, 
  dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10) 
});

const stats = computed(() => {
  const totalPending = billings.value.filter(b => b.status === 'PENDING').reduce((s, b) => s + (Number(b.amount) || 0), 0);
  const totalPaid = billings.value.filter(b => b.status === 'PAID').reduce((s, b) => s + (Number(b.amount) || 0), 0);
  return [
    { label: 'Total Tunggakan', value: totalPending, prefix: 'IDR', sub: 'Hutang Pajak Negara', icon: 'pi pi-exclamation-circle', color: 'bg-amber-50 text-amber-600' },
    { label: 'Total Terbayar', value: totalPaid, prefix: 'IDR', sub: 'Setoran Berhasil', icon: 'pi pi-check-circle', color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Jumlah Billing', value: billings.value.length, prefix: '', sub: 'Data Perbendaharaan', icon: 'pi pi-server', color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Rasio Pelunasan', value: billings.value.length ? (billings.value.filter(b => b.status === 'PAID').length / billings.value.length) * 100 : 0, prefix: '', sub: '% Kepatuhan', icon: 'pi pi-chart-pie', color: 'bg-slate-900 text-white' }
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
  if (s === 'PAID') return 'bg-slate-900 text-white';
  if (s === 'PENDING') return 'bg-amber-50 text-amber-700 border border-amber-200';
  return 'bg-red-50 text-red-700';
}

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/finance/tax/id-billing');
    
    // Robust loading logic
    const data = res?.data || res || {};
    billings.value = data.billings || [];
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Load Failed', detail: e.message });
  } finally {
    loading.value = false;
  }
}

function openNew() {
  form.value = { 
    billingNo: '', 
    taxType: 'PPN', 
    period: new Date().toISOString().slice(0, 7), 
    amount: 0, 
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10) 
  };
  drawerOpen.value = true;
}

async function save() {
  saving.value = true;
  try {
    await api.post('/finance/tax/id-billing', form.value);
    toast.add({ severity: 'success', summary: 'Billing Registered', detail: 'ID Billing code saved to treasury.' });
    drawerOpen.value = false;
    load();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Registration Failed', detail: e.message });
  } finally {
    saving.value = false;
  }
}

async function markPaid(b: any) {
  try {
    await api.post(`/finance/tax/id-billing/${b.id}/paid`);
    toast.add({ severity: 'success', summary: 'Payment Confirmed', detail: 'Treasury status updated to PAID.' });
    load();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Action Failed', detail: e.message });
  }
}

function copy(text: string) {
  navigator.clipboard.writeText(text);
  toast.add({ severity: 'info', summary: 'Copied', detail: 'Billing code copied to clipboard.', life: 2000 });
}

onMounted(load);
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
  background: rgba(238, 242, 255, 0.4) !important;
}

:deep(.p-datatable-tbody > tr > td) {
  padding: 1.25rem 1rem !important;
  border-bottom: 1px solid #f8fafc !important;
}

:deep(.p-select) {
  border-radius: 1rem !important;
  padding: 0.5rem !important;
}
</style>