<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-6 shadow-sm border-l-4 border-l-red-600 relative overflow-hidden">
      <!-- Decorative background icon -->
      <div class="absolute right-[-20px] top-[-20px] opacity-5 pointer-events-none">
        <i class="pi pi-lock text-[150px] text-red-900"></i>
      </div>
      
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
             <i class="pi pi-lock text-red-600"></i> Period & Fiscal Closing (Tutup Buku)
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
             Manajemen penutupan periode akuntansi bulanan (Cekatan) dan inisialisasi Tahun Fiskal Baru (Pemindahan Laba Ditahan).
          </div>
        </div>
        <div class="flex gap-2">
           <Button v-if="canManage" label="+ Buka Tahun Fiskal Baru" size="small" bg="bg-red-600" class="text-white font-bold border-none shrink-0 cursor-pointer shadow-sm hover:bg-red-700" icon="pi pi-calendar-plus" @click="showDialog = true" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
       <!-- Kiri: Fiscal Years Master -->
       <div class="rounded-xl border bg-white p-5 shadow-sm">
          <div class="mb-5 flex flex-wrap items-center justify-between gap-3 bg-slate-50 border p-3 rounded-lg">
             <div class="font-black text-slate-700 flex items-center gap-2 uppercase tracking-widest text-xs">
                <i class="pi pi-calendar"></i> Master Tahun Fiskal (Fiscal Years)
             </div>
             <Button severity="secondary" size="small" :disabled="loading" @click="load" icon="pi pi-refresh" outlined class="h-8 text-xs p-2" />
          </div>

          <div class="overflow-x-auto rounded-lg border">
            <table class="w-full text-sm">
              <thead class="bg-red-50/50 text-left text-[11px] text-red-900 border-b border-red-100 uppercase tracking-widest font-bold">
                <tr>
                  <th class="px-4 py-3">ID / Kode</th>
                  <th class="px-3 py-3 border-l text-center">Durasi Waktu</th>
                  <th class="px-3 py-3 border-l text-center">Status Keuangan</th>
                  <th class="px-3 py-3 text-center border-l w-24">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y relative text-[12px]">
                 <tr v-if="loading">
                  <td colspan="4" class="px-4 py-16 text-center text-sm text-slate-500">
                    <i class="pi pi-spinner pi-spin mr-2 text-red-500"></i> Menarik data konfigurasi ERP...
                  </td>
                </tr>
                <tr v-for="y in fiscalYears" v-else :key="y.id" class="transition" :class="y.isClosed ? 'bg-slate-50/50 opacity-80' : 'hover:bg-red-50/20'">
                  <td class="px-4 py-3 align-middle">
                     <div class="font-bold text-slate-800">{{ y.name }}</div>
                     <div class="font-mono font-black text-[10px] text-slate-500 mt-0.5">{{ y.code }}</div>
                  </td>
                  <td class="px-3 py-3 align-middle text-center border-l font-medium text-slate-600">
                     <div>{{ fmtDate(y.startDate) }}</div>
                     <div class="text-[10px] text-slate-400 font-black tracking-widest">S/D</div>
                     <div>{{ fmtDate(y.endDate) }}</div>
                  </td>
                  <td class="px-3 py-3 align-middle text-center border-l">
                     <div :class="{
                        'bg-red-100 text-red-800 border-red-200': y.isClosed,
                        'bg-emerald-100 text-emerald-800 border-emerald-200': !y.isClosed
                     }" class="px-3 py-1 rounded-full text-[10px] font-black tracking-widest border inline-block uppercase shadow-sm">
                        <i :class="y.isClosed ? 'pi pi-lock' : 'pi pi-lock-open'" class="text-[9px] mr-1"></i>
                        {{ y.isClosed ? 'TUTUP' : 'BERJALAN' }}
                     </div>
                  </td>
                  <td class="px-3 py-3 text-center border-l">
                     <Button v-if="!y.isClosed" label="Tutup Tahun" size="small" outlined class="text-[10px] h-7 px-2 font-bold text-red-600 border-red-300 hover:bg-red-600 hover:text-white transition-colors" @click="closeYear(y)" />
                     <div v-else class="text-[9px] text-slate-400 font-bold tracking-widest uppercase"><i class="pi pi-check"></i> Selesai</div>
                  </td>
                </tr>
                <tr v-if="!loading && fiscalYears.length === 0">
                  <td colspan="4" class="px-4 py-16 text-center text-slate-400 border-t italic">
                    Belum ada Konfigurasi Tahun Fiskal untuk mesin akuntansi ini.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
       </div>

       <!-- Kanan: Accounting Periods (Monthly) -->
       <div class="rounded-xl border bg-white p-5 shadow-sm">
          <div class="mb-5 flex flex-wrap items-center justify-between gap-3 bg-slate-50 border p-3 rounded-lg">
             <div class="font-black text-slate-700 flex items-center gap-2 uppercase tracking-widest text-xs">
                <i class="pi pi-table"></i> Siklus Periode Akuntansi
             </div>
             <div class="text-[10px] bg-sky-100 text-sky-800 px-2 py-1 rounded font-bold uppercase tracking-wider">
               Rincian Bulan Berjalan
             </div>
          </div>

          <div class="overflow-x-auto rounded-lg border h-[600px] overflow-y-auto custom-scrollbar">
            <table class="w-full text-sm">
              <thead class="bg-slate-100 text-left text-[11px] text-slate-500 border-b uppercase tracking-widest font-bold sticky top-0 z-10 shadow-sm">
                <tr>
                  <th class="px-4 py-3">Nama Bulan Buka</th>
                  <th class="px-3 py-3 border-l text-center">Induk Tahun</th>
                  <th class="px-3 py-3 border-l text-center">Status</th>
                  <th class="px-3 py-3 text-center border-l w-24">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y relative text-[12px]">
                 <tr v-if="loading">
                  <td colspan="4" class="px-4 py-16 text-center text-sm text-slate-500">
                    <i class="pi pi-spinner pi-spin mr-2"></i> Pemuatan data...
                  </td>
                </tr>
                <tr v-for="p in periods" v-else :key="p.id" class="transition hover:bg-slate-50" :class="{'opacity-70': !p.isOpen}">
                  <td class="px-4 py-3 align-middle">
                     <div class="font-bold text-slate-800">Bulan Ke-{{ p.periodNo }}</div>
                     <div class="font-mono text-[10px] text-slate-500 mt-1">
                        {{ fmtDateRange(p.startDate, p.endDate) }}
                     </div>
                  </td>
                  <td class="px-3 py-3 align-middle text-center border-l font-bold text-blue-600 bg-blue-50/20">{{ p.fiscalYear?.code || '-' }}</td>
                  <td class="px-3 py-3 align-middle text-center border-l">
                      <div :class="{
                        'text-rose-600 bg-rose-50 border-rose-200': !p.isOpen,
                        'text-emerald-600 bg-emerald-50 border-emerald-200': p.isOpen
                     }" class="px-2 py-0.5 rounded text-[10px] font-black tracking-widest border inline-block uppercase">
                        {{ p.isOpen ? 'OPEN' : 'CLOSED' }}
                     </div>
                  </td>
                  <td class="px-3 py-3 text-center border-l flex justify-center gap-1">
                     <Button v-if="p.isOpen" label="Tutup" size="small" outlined class="text-[9px] h-6 px-2 font-bold text-rose-600 border-rose-300 hover:bg-rose-600 hover:text-white" @click="closePeriod(p)" />
                     <Button v-else label="Buka" size="small" outlined class="text-[9px] h-6 px-2 font-bold text-emerald-600 border-emerald-300 hover:bg-emerald-600 hover:text-white" @click="openPeriod(p)" />
                  </td>
                </tr>
                <tr v-if="!loading && periods.length === 0">
                  <td colspan="4" class="px-4 py-16 text-center text-slate-400 border-t italic">
                    Belum ada data periode.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
       </div>
    </div>

    <!-- Create Fiscal Dialog -->
    <div v-if="showDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div class="w-full max-w-sm rounded-2xl border bg-white shadow-2xl flex flex-col animate-fade-in-up">
        <div class="p-5 border-b bg-red-50 flex justify-between items-center rounded-t-2xl">
          <div>
            <div class="text-lg font-black text-red-900 flex items-center gap-2"><i class="pi pi-flag"></i> Inisialisasi Tahun</div>
          </div>
          <button class="text-red-500 hover:text-red-700 bg-white shadow-sm w-8 h-8 rounded-full font-bold transition-colors" @click="showDialog = false">✕</button>
        </div>
        
        <div class="p-6 space-y-4 bg-white">
           <div class="bg-blue-50 border border-blue-100 rounded-lg p-3 text-center mb-2">
              <div class="text-[10px] text-blue-700 font-medium">Membuat 1 Induk Tahun beserta 12 Anak Periode Bulanan sekaligus.</div>
           </div>

           <div class="space-y-1">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Kode Tahun</label>
              <input v-model="form.code" class="w-full border rounded-lg px-3 py-2 text-sm font-black font-mono text-slate-800 outline-none focus:border-red-500 shadow-inner" placeholder="Contoh: FY-2027" />
           </div>
           
           <div class="space-y-1">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Nama / Label</label>
              <input v-model="form.name" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-red-500 shadow-inner" placeholder="Tahun Fiskal 2027" />
           </div>

           <div class="space-y-1">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tgl Mulai (Start)</label>
              <input type="date" v-model="form.startDate" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-red-500 shadow-inner" />
           </div>
           
           <div class="space-y-1">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tgl Berakhir (End)</label>
              <input type="date" v-model="form.endDate" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-red-500 shadow-inner" />
           </div>
        </div>

        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
           <Button label="Batal" severity="secondary" @click="showDialog = false" class="bg-white text-slate-700 font-bold px-4 shadow-sm border border-slate-300" />
           <Button label="Terbitkan & Buka" :loading="saving" @click="save" class="bg-red-600 border-none text-white font-bold px-6 shadow-sm hover:bg-red-700" icon="pi pi-check" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('finance.fiscal.create') || true);
const loading = ref(false);

const fiscalYears = ref<any[]>([]);
const periods = ref<any[]>([]);

const showDialog = ref(false);
const saving = ref(false);

const currentYear = new Date().getFullYear();
const form = reactive({ 
  code: `FY-${currentYear + 1}`, 
  name: `Fiscal Year ${currentYear + 1}`, 
  startDate: `${currentYear + 1}-01-01`, 
  endDate: `${currentYear + 1}-12-31` 
});

const fmtDateOption = { year: 'numeric', month: 'short', day: '2-digit' };
const fmtDate = (d: string) => d ? new Date(d).toLocaleDateString('id-ID', fmtDateOption) : '-';

const fmtDateRange = (s: string, e: string) => {
    if(!s || !e) return '-';
    // Format: 01 Jan - 31 Jan 2026
    const start = new Date(s);
    const end = new Date(e);
    return `${start.toLocaleDateString('id-ID', {day:'2-digit', month:'short'})} s/d ${end.toLocaleDateString('id-ID', {day:'2-digit', month:'short', year:'numeric'})}`;
}

const load = async () => {
  loading.value = true;
  try {
    const [fy, p] = await Promise.all([
      api.get('/finance/fiscal'),
      api.get('/finance/periods'),
    ]);
    
    if (fy.data?.fiscalYears) fiscalYears.value = fy.data.fiscalYears;
    else if (fy.fiscalYears) fiscalYears.value = fy.fiscalYears;
    
    // Sort years DESC
    fiscalYears.value.sort((a,b) => b.code.localeCompare(a.code));

    let per = [];
    if (p.data?.periods) per = p.data.periods;
    else if (p.periods) per = p.periods;
    
    // Sort periods normally DESC overall
    periods.value = per.sort((a,b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

  } catch (e) {
    console.warn(e);
  } finally {
    loading.value = false;
  }
};

const save = async () => {
  if(!form.code || !form.startDate || !form.endDate) return alert('Validasi Gagal: Lengkapi seluruh form.');
  saving.value = true;
  try {
    await api.post('/finance/fiscal', form);
    showDialog.value = false;
    await load();
  } catch(e) {
     alert('Gagal mendata Tahun Fiskal. Pastikan kode FY belum terpakai sebelumnya.');
  } finally { 
     saving.value = false; 
  }
};

const closeYear = async (year: any) => { 
  if (confirm(`Peringatan Krusial! Menutup tahun fiskal ${year.code} akan mengunci SEMUA periode di dalamnya dan membekukan rekap Laba/Rugi. Tindakan ini tidak bisa dibatalkan secara sistem. Apakah Anda sangat yakin?`)) { 
    try {
        await api.post(`/finance/fiscal/${year.id}/close`); 
        await load(); 
    } catch(e) {
        alert('Gagal menutup Tahun Akuntansi.');
    }
  } 
};

const closePeriod = async (p: any) => { 
    try {
        await api.post(`/finance/periods/${p.id}/close`); 
        await load(); 
    } catch(e) {
        alert('Gagal mengeksekusi Cut-off Period.');
    }
};

const openPeriod = async (p: any) => { 
    try {
        await api.post(`/finance/periods/${p.id}/open`); 
        await load(); 
    } catch(e) {
        alert('Gagal Re-Open Period.');
    }
};

onMounted(() => { load(); });
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Custom Scrollbar for Period Table inner div */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9; 
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1; 
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8; 
}
</style>