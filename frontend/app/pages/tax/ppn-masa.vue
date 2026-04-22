<template>
  <div class="p-4 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 overflow-hidden relative p-8 rounded-xl bg-white border border-slate-200 shadow-sm">
      <div class="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-indigo-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Rekonsiliasi Bulanan</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-indigo-600">Ringkasan PPN Masa</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2">Posisi PPN <span class="text-indigo-600">Masa</span></h1>
        <p class="text-slate-500 text-sm font-medium">Pandangan konsolidasi PPN Keluaran vs Masukan untuk menentukan liabilitas pajak periodik.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <div class="flex flex-col items-end mr-4">
           <span class="text-[10px] font-black text-slate-400 uppercase">Bulan Pelaporan</span>
           <InputText v-model="filterPeriod" placeholder="YYYY-MM" class="p-inputtext-sm border-none bg-transparent text-right font-black w-24" />
        </div>
        <Button icon="pi pi-sync" severity="secondary" rounded outlined @click="load" :loading="loading" />
        <Button label="Finalisasi Laporan" icon="pi pi-lock" class="p-button-rounded font-black text-xs shadow-lg shadow-indigo-100 p-button-secondary" />
      </div>
    </div>

    <!-- Main Position Cards -->
    <div v-if="summary" class="grid grid-cols-1 md:grid-cols-3 gap-8">
       <!-- PPN Keluaran (Payable Base) -->
       <div class="p-8 rounded-xl bg-white border border-slate-200 shadow-sm relative overflow-hidden group hover:border-red-200 transition-colors">
          <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <i class="pi pi-arrow-up-right text-6xl text-red-600"></i>
          </div>
          <div class="flex items-center gap-2 mb-1">
            <p class="text-[11px] font-black text-slate-400 uppercase tracking-widest">PPN Keluaran (Output)</p>
            <i class="pi pi-info-circle text-slate-300 hover:text-red-500 cursor-help" v-tooltip.top="'PPN yang Anda pungut dari pelanggan saat melakukan penjualan. Nilai ini merupakan liabilitas pajak yang harus disetorkan ke kas negara.'"></i>
          </div>
          <div class="flex items-baseline gap-2 mb-4">
             <span class="text-3xl font-black text-slate-900">IDR {{ fmtNumber(summary.totalOutput) }}</span>
          </div>
          <div class="flex items-center gap-2">
             <span class="p-1 px-2 rounded-lg bg-red-50 text-red-600 text-[10px] font-bold border border-red-100">Sumber Liabilitas</span>
          </div>
       </div>

       <!-- PPN Masukan (Credit Base) -->
       <div class="p-8 rounded-xl bg-white border border-slate-200 shadow-sm relative overflow-hidden group border-b-emerald-400 border-b-4 hover:border-emerald-200 transition-colors">
          <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <i class="pi pi-arrow-down-left text-6xl text-emerald-600"></i>
          </div>
          <div class="flex items-center gap-2 mb-1">
            <p class="text-[11px] font-black text-slate-400 uppercase tracking-widest">PPN Masukan (Input)</p>
            <i class="pi pi-info-circle text-slate-300 hover:text-emerald-500 cursor-help" v-tooltip.top="'PPN yang Anda bayar kepada pemasok saat melakukan pembelian. Jika faktur pajak valid, nilai ini dapat digunakan sebagai pengurang (kredit) terhadap PPN Keluaran.'"></i>
          </div>
          <div class="flex items-baseline gap-2 mb-4">
             <span class="text-3xl font-black text-slate-900">IDR {{ fmtNumber(summary.totalInput) }}</span>
          </div>
          <div class="flex items-center gap-2">
             <span class="p-1 px-2 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-bold border border-emerald-100">Kredit Pajak</span>
          </div>
       </div>

       <!-- Net Position -->
       <div :class="['p-8 rounded-xl shadow-2xl relative overflow-hidden border-none', summary.netPpn >= 0 ? 'bg-slate-900 text-white' : 'bg-emerald-600 text-white']">
          <div class="absolute top-0 right-0 p-4 opacity-20">
             <i :class="[summary.netPpn >= 0 ? 'pi pi-wallet' : 'pi pi-percentage', 'text-6xl']"></i>
          </div>
          <div class="flex items-center gap-2 mb-1">
            <p class="text-[11px] font-black text-slate-300 uppercase tracking-widest">Status Pajak Bersih</p>
            <i class="pi pi-info-circle text-white/30 hover:text-white cursor-help" v-tooltip.top="'Hasil akhir rekonsiliasi. Status KB (Kurang Bayar) mewajibkan setoran ke kas negara. Status LB (Lebih Bayar) berarti kelebihan bayar dapat dikompensasi ke masa pajak berikutnya atau direstitusi.'"></i>
          </div>
          <div class="flex items-baseline gap-2 mb-4">
             <span class="text-3xl font-black">{{ fmtNumber(Math.abs(summary.netPpn)) }}</span>
             <span class="text-xs font-bold text-white/60">IDR</span>
          </div>
          <div class="flex items-center gap-2">
             <span v-if="summary.netPpn >= 0" class="p-1 px-2 rounded-lg bg-red-500/20 text-red-200 text-[10px] font-black uppercase border border-red-500/30">Kurang Bayar (KB)</span>
             <span v-else class="p-1 px-2 rounded-lg bg-white/20 text-white text-[10px] font-black uppercase border border-white/30">Lebih Bayar (LB)</span>
          </div>
       </div>
    </div>

    <!-- Details Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
       <!-- Output Details -->
       <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
          <div class="p-8 border-b border-slate-100 bg-slate-50/10 flex justify-between items-center">
             <div class="flex items-center gap-2">
                <h3 class="text-[12px] font-black text-slate-900 uppercase tracking-widest">Buku PPN Keluaran</h3>
                <i class="pi pi-info-circle text-slate-300 hover:text-indigo-600 cursor-help" v-tooltip.right="'Rincian seluruh faktur penjualan pada periode ini. Data ini disinkronkan langsung dari modul Penjualan & Distribusi.'"></i>
             </div>
             <span class="text-[10px] font-bold text-slate-400">{{ outputInvoices.length }} Baris Data</span>
          </div>
          <DataTable :value="outputInvoices" dataKey="id" class="p-datatable-sm w-full">
             <Column field="invoiceNo" header="INVOICE"></Column>
             <Column field="customerName" header="KLIEN"></Column>
             <Column field="taxAmount" header="PPN" class="text-right">
                <template #body="{ data }">
                   <span class="font-black text-slate-800">{{ fmtNumber(data.taxAmount) }}</span>
                </template>
             </Column>
          </DataTable>
       </div>

       <!-- Input Details -->
       <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
          <div class="p-8 border-b border-slate-100 bg-slate-50/10 flex justify-between items-center">
             <div class="flex items-center gap-2">
                <h3 class="text-[12px] font-black text-slate-900 uppercase tracking-widest">Buku PPN Masukan</h3>
                <i class="pi pi-info-circle text-slate-300 hover:text-indigo-600 cursor-help" v-tooltip.right="'Rincian seluruh faktur pembelian dan pengeluaran beban. Pastikan faktur pajak telah diklaim sebagai kredit pajak untuk mengurangi beban PPN.'"></i>
             </div>
             <span class="text-[10px] font-bold text-slate-400">{{ inputInvoices.length }} Baris Data</span>
          </div>
          <DataTable :value="inputInvoices" class="p-datatable-sm w-full">
             <Column field="invoiceNo" header="INVOICE"></Column>
             <Column field="customerName" header="PEMASOK"></Column>
             <Column field="taxAmount" header="KREDIT PPN" class="text-right">
                <template #body="{ data }">
                   <span class="font-black text-emerald-600">{{ fmtNumber(data.taxAmount) }}</span>
                </template>
             </Column>
          </DataTable>
       </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
const api = useApi();
const toast = useToast();

const summary = ref<any>(null);
const outputInvoices = ref<any[]>([]);
const inputInvoices = ref<any[]>([]);
const filterPeriod = ref((new Date().getFullYear()) + '-' + (new Date().getMonth() + 1).toString().padStart(2, '0'));
const loading = ref(false);

const fmtNumber = (n: number) => new Intl.NumberFormat('id-ID').format(Math.round(n || 0));

const load = async () => { 
  loading.value = true;
  try {
    const res = await api.get(`/finance/tax/ppn-masa`, { params: { period: filterPeriod.value } }); 
    
    // Support multiple response formats
    const data = res?.data || res || {};
    summary.value = data.summary || null; 
    outputInvoices.value = data.outputInvoices || []; 
    inputInvoices.value = data.inputInvoices || []; 
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Report Generation Failed', detail: e.message });
  } finally {
    loading.value = false;
  }
};

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
  padding: 1rem !important;
}

:deep(.p-datatable-tbody > tr > td) {
  padding: 1rem !important;
  border-bottom: 1px solid #f8fafc !important;
  font-size: 11px;
}
</style>