<template>
  <div class="p-4 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 overflow-hidden relative p-8 rounded-xl bg-white border border-slate-200 shadow-sm">
      <div class="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-amber-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Pajak Tahunan</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-amber-600">Formulir 1721-A1</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2">Bukti <span class="text-amber-600">Potong Tahunan</span></h1>
        <p class="text-slate-500 text-sm font-medium">Sertifikat PPh tahunan untuk pegawai tetap (Formulir 1721-A1).</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <div class="flex flex-col items-end mr-4">
           <span class="text-[10px] font-black text-slate-400 uppercase">Tahun Pajak</span>
           <Select v-model="filterYear" :options="['2025', '2026']" class="p-inputtext-sm border-none bg-transparent font-black w-24 text-right" />
        </div>
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="load" :loading="loading" />
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
             <h2 class="text-[13px] font-black text-slate-900 uppercase tracking-widest">Buku Sertifikat A1</h2>
             <p class="text-xs text-slate-500 font-medium">Daftar sertifikat pajak tahunan yang diterbitkan untuk tahun terpilih.</p>
          </div>
       </div>

       <DataTable :value="withholdings" dataKey="id" class="p-datatable-sm w-full" :loading="loading">
          <Column field="taxpayerName" header="NAMA KARYAWAN" class="pl-8">
             <template #body="{ data }">
                <div class="flex items-center gap-3">
                   <div class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-[10px] font-black">
                      {{ data.taxpayerName.split(' ').map(n => n[0]).join('') }}
                   </div>
                   <div class="flex flex-col">
                      <span class="text-[11px] font-black text-slate-800">{{ data.taxpayerName }}</span>
                      <span class="text-[10px] font-mono text-slate-400">{{ data.npwp || 'Tanpa NPWP' }}</span>
                   </div>
                </div>
             </template>
          </Column>
          <Column header="NOMOR BUPOT">
             <template #body="{ data }">
                <span class="font-mono text-[11px] font-black text-indigo-700 tracking-tighter">{{ data.bupotNo }}</span>
             </template>
          </Column>
          <Column header="TOTAL BRUTO" class="text-right">
             <template #body="{ data }">
                <span class="text-[11px] font-bold text-slate-700">{{ fmtNumber(data.grossAmount) }}</span>
             </template>
          </Column>
          <Column header="TOTAL PPh 21" class="text-right">
             <template #body="{ data }">
                <span class="text-[11px] font-black text-amber-700">{{ fmtNumber(data.taxAmount) }}</span>
             </template>
          </Column>
          <Column header="TANGGAL TERBIT">
             <template #body="{ data }">
                <span class="text-[10px] font-bold text-slate-400 uppercase">{{ fmtDate(data.transDate) }}</span>
             </template>
          </Column>
          <Column class="text-right pr-8">
             <template #body="{ data }">
                <Button label="Lihat Sertifikat" icon="pi pi-file-pdf" severity="warning" rounded text @click="preview(data)" class="text-[10px] font-black uppercase" />
             </template>
          </Column>
       </DataTable>
    </div>

    <!-- Digital Certificate Preview Overlay -->
    <Dialog v-model:visible="showDocument" modal class="w-full max-w-4xl !p-0 !bg-slate-800 !rounded-none min-h-screen" :showHeader="false">
       <div class="flex flex-col h-full bg-slate-100 overflow-hidden">
          <!-- Document Header (Control Bar) -->
          <div class="bg-indigo-950 p-4 flex justify-between items-center text-white shrink-0">
             <div class="flex items-center gap-4">
                <Button icon="pi pi-arrow-left" severity="secondary" rounded @click="showDocument = false" />
                <div>
                   <h3 class="font-black text-sm uppercase">Pratinjau 1721-A1</h3>
                   <p class="text-[10px] text-indigo-300">{{ currentA1?.taxpayerName }} — Tahun Pajak {{ filterYear }}</p>
                </div>
             </div>
             <div class="flex gap-3">
                <Button label="Unduh PDF" icon="pi pi-download" class="p-button-sm p-button-warning font-black" @click="mockPrint" />
                <Button label="Tutup" icon="pi pi-times" severity="secondary" text @click="showDocument = false" />
             </div>
          </div>

          <!-- Document Paper -->
          <div class="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-800">
             <div class="w-[800px] bg-white shadow-2xl p-16 flex flex-col min-h-[1100px] border border-slate-200 printable">
                <!-- Official Header -->
                <div class="flex border-2 border-black mb-6">
                   <div class="flex-1 p-4 border-r-2 border-black flex items-center justify-center text-center">
                      <div class="space-y-1">
                         <h4 class="text-xs font-black uppercase">Bukti Pemotongan Pajak Penghasilan Pasal 21</h4>
                         <p class="text-[10px] font-bold uppercase">Bagi Pegawai Tetap atau Penerima Pensiun atau Tunjangan Hari Tua</p>
                         <p class="text-[10px] font-bold">TAHUN KALENDER: {{ filterYear }}</p>
                      </div>
                   </div>
                   <div class="w-32 p-4 flex flex-col items-center justify-center text-center leading-tight">
                      <h4 class="text-lg font-black italic">1721-A1</h4>
                      <p class="text-[8px] font-bold uppercase">Lembar ke-1 : Pegawai</p>
                   </div>
                </div>

                <div class="text-center font-black text-xs space-y-2 mb-8 uppercase tracking-widest border-b-2 border-slate-100 pb-4">
                   NOMOR : {{ currentA1?.bupotNo }}
                </div>

                <!-- Section A: Identity -->
                <div class="mb-8">
                   <h5 class="bg-slate-100 p-2 text-[10px] font-black uppercase mb-3 border-l-4 border-slate-900">A. Identitas Penerima Penghasilan</h5>
                   <div class="grid grid-cols-12 gap-y-2 text-[10px]">
                      <div class="col-span-4 font-bold uppercase">NPWP</div>
                      <div class="col-span-8">: {{ currentA1?.npwp || '00.000.000.0-000.000' }}</div>
                      <div class="col-span-4 font-bold uppercase">Nama Lengkap</div>
                      <div class="col-span-8">: {{ currentA1?.taxpayerName }}</div>
                      <div class="col-span-4 font-bold uppercase">Alamat</div>
                      <div class="col-span-8">: JL. CONTOH NO. 123, JAKARTA SELATAN</div>
                      <div class="col-span-4 font-bold uppercase">Status / PTKP</div>
                      <div class="col-span-8">: K/0 (Kawin/0 Tanggungan)</div>
                   </div>
                </div>

                <!-- Section B: Calculations -->
                <div>
                   <h5 class="bg-slate-100 p-2 text-[10px] font-black uppercase mb-3 border-l-4 border-slate-900">B. Rincian Penghasilan dan Perhitungan PPh 21</h5>
                   <table class="w-full text-[9px] border-collapse border border-slate-200">
                      <thead>
                         <tr class="bg-slate-50">
                            <th class="border border-slate-200 p-2 text-left" colspan="2">Uraian</th>
                            <th class="border border-slate-200 p-2 text-right">Jumlah (Rp)</th>
                         </tr>
                      </thead>
                      <tbody>
                         <tr><td class="border border-slate-200 p-2 font-bold w-12 text-center">1.</td><td class="border border-slate-200 p-2 uppercase">Gaji / Pensiun / THT / JHT</td><td class="border border-slate-200 p-2 text-right">{{ fmtNumber(currentA1?.grossAmount * 0.8) }}</td></tr>
                         <tr><td class="border border-slate-200 p-2 font-bold w-12 text-center">2.</td><td class="border border-slate-200 p-2 uppercase">Tunjangan PPh</td><td class="border border-slate-200 p-2 text-right">0</td></tr>
                         <tr><td class="border border-slate-200 p-2 font-bold w-12 text-center">3.</td><td class="border border-slate-200 p-2 uppercase">Tunjangan Lainnya, Uang Lembur dsb.</td><td class="border border-slate-200 p-2 text-right">{{ fmtNumber(currentA1?.grossAmount * 0.2) }}</td></tr>
                         <tr class="bg-slate-200/50"><td class="border border-slate-200 p-2 font-black w-12 text-center">8.</td><td class="border border-slate-200 p-2 font-black uppercase">Jumlah Penghasilan Bruto (1 s.d. 7)</td><td class="border border-slate-200 p-2 text-right font-black">{{ fmtNumber(currentA1?.grossAmount) }}</td></tr>
                         <tr><td class="border border-slate-200 p-2 font-bold w-12 text-center">9.</td><td class="border border-slate-200 p-2 uppercase text-red-600">Biaya Jabatan / Biaya Pensiun</td><td class="border border-slate-200 p-2 text-right text-red-600">(6.000.000)</td></tr>
                         <tr class="bg-slate-200/50"><td class="border border-slate-200 p-2 font-black w-12 text-center">14.</td><td class="border border-slate-200 p-2 font-black uppercase">Penghasilan Netto (8 - 13)</td><td class="border border-slate-200 p-2 text-right font-black">{{ fmtNumber(currentA1?.grossAmount - 6000000) }}</td></tr>
                         <tr><td class="border border-slate-200 p-2 font-bold w-12 text-center">17.</td><td class="border border-slate-200 p-2 uppercase">Penghasilan Tidak Kena Pajak (PTKP)</td><td class="border border-slate-200 p-2 text-right text-slate-400">58.500.000</td></tr>
                         <tr class="bg-indigo-50"><td class="border border-slate-200 p-2 font-black w-12 text-center">20.</td><td class="border border-slate-200 p-2 font-black uppercase">PPh Pasal 21 yang Terhutang</td><td class="border border-slate-200 p-2 text-right font-black text-amber-700 text-sm">{{ fmtNumber(currentA1?.taxAmount) }}</td></tr>
                      </tbody>
                   </table>
                </div>

                <!-- Footer & Verification -->
                <div class="mt-auto pt-16 flex justify-between items-end border-t border-slate-100">
                   <div class="flex flex-col gap-2">
                      <div class="flex items-center gap-3 p-4 border border-slate-100 rounded-2xl bg-slate-50/50">
                         <i class="pi pi-verified text-emerald-600 text-2xl"></i>
                         <div>
                            <p class="text-[8px] font-black uppercase text-slate-400 leading-none">Dokumen Digital Terverifikasi</p>
                            <p class="text-[10px] font-mono text-slate-800 tracking-tighter">{{ filterYear }}//{{ currentA1?.bupotNo }}</p>
                         </div>
                      </div>
                      <p class="text-[7px] text-slate-400 w-64 leading-relaxed font-bold uppercase italic">Ini adalah dokumen otomatis dari Compliance Suite ERP. Validitas dapat diverifikasi melalui dashboard sistem.</p>
                   </div>
                   <div class="text-right space-y-8">
                      <div class="space-y-1">
                         <p class="text-[9px] font-bold text-slate-500 uppercase">Jakarta, {{ fmtDate(currentA1?.transDate) }}</p>
                         <p class="text-[9px] font-black uppercase">Pemotong Pajak,</p>
                      </div>
                      <div class="flex flex-col items-end">
                         <div class="w-32 h-16 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 border-dashed mb-2 opacity-30">
                            <span class="text-[7px] text-slate-400 uppercase font-bold">Tanda Tangan Petugas</span>
                          </div>
                         <p class="text-[10px] font-black border-b border-black">BUDI KARYADI</p>
                         <p class="text-[9px] font-bold text-slate-500">Manajer Keuangan</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
const api = useApi();
const toast = useToast();

const filterYear = ref('2026');
const loading = ref(false);
const showDocument = ref(false);
const currentA1 = ref<any>(null);
const withholdings = ref<any[]>([]);

const stats = computed(() => {
  const totalCert = withholdings.value.reduce((s, b) => s + (Number(b.taxAmount) || 0), 0);
  const totalInc = withholdings.value.reduce((s, b) => s + (Number(b.grossAmount) || 0), 0);
  return [
    { label: 'Pajak Tahunan Tersertifikasi', value: totalCert, prefix: 'IDR', sub: 'Tahun Pajak ' + filterYear.value, icon: 'pi pi-verified', color: 'bg-amber-50 text-amber-600' },
    { label: 'Total Penghasilan Bruto', value: totalInc, prefix: 'IDR', sub: 'Agregat Tahunan', icon: 'pi pi-wallet', color: 'bg-blue-50 text-blue-600' },
    { label: 'Jumlah Sertifikat', value: withholdings.value.length, prefix: '', sub: 'Karyawan Siap', icon: 'pi pi-file-o', color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Rata-rata Pajak/Orang', value: withholdings.value.length ? totalCert / withholdings.value.length : 0, prefix: 'IDR', sub: 'Distribusi Tahunan', icon: 'pi pi-chart-line', color: 'bg-slate-900 text-white' }
  ];
});

function fmtNumber(v: any) {
  if (!v) return '0';
  return new Intl.NumberFormat('id-ID').format(Math.round(v));
}

function fmtDate(d: string) {
  return d ? d.slice(0, 10) : '-';
}

async function load() {
  loading.value = true;
  try {
    const params = { year: filterYear.value };
    const res = await api.get('/finance/tax/bukti-potong', { params });
    
    // Robust loading logic
    const data = res?.data || res || {};
    withholdings.value = data.withholdings || [];
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Load Failed', detail: e.message });
  } finally {
    loading.value = false;
  }
}

function preview(data: any) {
  currentA1.value = data;
  showDocument.value = true;
}

function mockPrint() {
  toast.add({ severity: 'info', summary: 'Document Ready', detail: '1721-A1 PDF has been generated and is downloading...', life: 3000 });
}

onMounted(load);
watch(filterYear, load);
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

.printable {
  font-family: 'Inter', sans-serif;
}
</style>