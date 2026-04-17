<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-6 shadow-sm border-l-4 border-l-purple-600 relative overflow-hidden">
      <div class="absolute right-[-20px] top-[-20px] opacity-10 pointer-events-none">
        <i class="pi pi-ban text-[150px] text-purple-900"></i>
      </div>
      
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
             <i class="pi pi-eject text-purple-600"></i> Pelepasan Aset (Asset Disposal)
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
             Manajemen penjualan, penghancuran, dan write-off aset perusahaan beserta perhitungan Laba/Rugi (Gain/Loss).
          </div>
        </div>
        <div class="flex gap-2">
           <Button v-if="canManage" label="+ Buat Surat Pelepasan" size="small" bg="bg-purple-600" class="text-white font-bold border-none shrink-0 cursor-pointer shadow-sm hover:bg-purple-700" icon="pi pi-plus" @click="showDialog = true" />
        </div>
      </div>
    </div>

    <!-- Quick Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white border rounded-lg p-4 shadow-sm relative overflow-hidden">
           <div class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 relative z-10">Total Aset Dilepas</div>
           <div class="text-xl font-black font-mono text-slate-800 relative z-10">{{ disposals.length }} Transaksi</div>
        </div>
        <div class="bg-purple-50 border border-purple-200 rounded-lg p-4 shadow-sm">
           <div class="text-[10px] font-bold text-purple-700 uppercase tracking-widest mb-1">Menunggu Persetujuan (DRAFT)</div>
           <div class="text-xl font-black font-mono text-purple-800">{{ disposals.filter(x => x.status === 'DRAFT').length }} Dokumen</div>
        </div>
        <div class="bg-rose-50 border border-rose-200 rounded-lg p-4 shadow-sm">
           <div class="text-[10px] font-bold text-rose-700 uppercase tracking-widest mb-1">Rugi Penjualan Aset Terakhir</div>
           <div class="text-xl font-black font-mono text-rose-800 flex items-center gap-2">
              <i class="pi pi-chart-pie"></i> {{ formatRupiah(totalLoss) }}
           </div>
        </div>
    </div>

    <!-- Master Disposal List -->
    <div class="rounded-xl border bg-white p-5 shadow-sm">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3 bg-slate-50 border p-3 rounded-lg">
        <div class="flex items-center gap-3 w-full md:w-auto">
          <InputText v-model="search" placeholder="Cari Ref / Data Aset..." class="w-full md:w-64 text-sm font-mono border-slate-300" />
          <select v-model="filterStatus" class="p-2 border border-slate-300 rounded-lg text-sm bg-white text-slate-700 w-40 outline-none focus:border-purple-500 font-semibold" @change="load">
            <option value="">Semua Dokumen</option>
            <option value="DRAFT">Draft Belum Disetujui</option>
            <option value="APPROVED">Disetujui (Approved)</option>
          </select>
          <Button label="Muat Ulang" severity="secondary" size="small" :disabled="loading" @click="load" icon="pi pi-refresh" />
        </div>
      </div>

      <div class="overflow-x-auto rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-slate-100 text-left text-[11px] text-slate-600 border-b border-slate-200 uppercase tracking-widest font-bold">
            <tr>
              <th class="px-4 py-3 min-w-[200px]">Dokumen Pelepasan</th>
              <th class="px-3 py-3 border-l text-center">Tanggal</th>
              <th class="px-4 py-3 bg-emerald-50/50 border-l text-right w-36">Nilai Penjualan</th>
              <th class="px-4 py-3 bg-amber-50/50 border-l text-right w-36">Rugi / Laba (Gain/Loss)</th>
              <th class="px-4 py-3 text-center border-l w-28">Status Eksekusi</th>
              <th class="px-3 py-3 text-center border-l w-24">Verifikasi</th>
            </tr>
          </thead>
          <tbody class="divide-y relative text-[12px]">
             <tr v-if="loading">
              <td colspan="6" class="px-4 py-16 text-center text-sm text-slate-500">
                <i class="pi pi-spinner pi-spin mr-2 text-purple-500"></i> Memuat Buku Log Pelepasan...
              </td>
            </tr>
            <tr v-for="d in filteredDisposals" v-else :key="d.id" class="transition hover:bg-slate-50">
              <td class="px-4 py-3 align-middle">
                 <div class="font-bold text-slate-800">{{ d.asset?.name || 'Aset Terhapus' }}</div>
                 <div class="flex items-center gap-2 mt-1">
                    <span class="font-mono font-black text-[10px] text-purple-700">{{ d.disposalNo }}</span>
                    <span class="bg-slate-100 border text-slate-500 px-1 py-0.5 rounded text-[8px] font-bold tracking-widest">{{ d.asset?.assetNo }}</span>
                 </div>
              </td>
              <td class="px-3 py-3 align-middle text-center border-l font-bold text-slate-600">{{ fmtDate(d.disposalDate) }}</td>
              
              <!-- Sale Value -->
              <td class="px-4 py-3 align-middle text-right bg-emerald-50/30 border-l font-mono font-bold text-emerald-800">{{ formatRupiah(d.saleValue) }}</td>
              
              <!-- Gain/Loss -->
              <td class="px-4 py-3 align-middle text-right border-l font-mono font-black" :class="(Number(d.lossGain) >= 0) ? 'bg-blue-50/30 text-blue-700' : 'bg-rose-50/30 text-rose-700'">
                  {{ (Number(d.lossGain) > 0 ? '+' : '') }}{{ formatRupiah(d.lossGain) }}
              </td>

              <!-- Status -->
              <td class="px-4 py-3 align-middle text-center border-l">
                 <div :class="{
                    'bg-slate-100 text-slate-600 border-slate-200': d.status === 'DRAFT',
                    'bg-purple-100 text-purple-800 border-purple-200': d.status === 'APPROVED'
                 }" class="px-2 py-0.5 rounded text-[9px] font-black tracking-widest border inline-block uppercase shadow-sm">
                    {{ d.status }}
                 </div>
              </td>
              
              <td class="px-3 py-3 text-center border-l">
                <Button v-if="d.status === 'DRAFT'" label="Setujui" size="small" bg="bg-emerald-600" class="text-white text-[10px] border-none px-2 py-1.5 w-full font-bold hover:bg-emerald-700 shadow-sm" icon="pi pi-check" @click="approve(d)" />
                <div v-else class="text-[10px] text-slate-400 font-bold"><i class="pi pi-lock"></i> Terkunci</div>
              </td>
            </tr>
            <tr v-if="!loading && filteredDisposals.length === 0">
              <td colspan="6" class="px-4 py-16 text-center text-slate-400 border-t italic">
                Belum ada transaksi pelepasan (penjualan/write-off) aset di perusahaan.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create Disposal Dialog -->
    <div v-if="showDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div class="w-full max-w-2xl rounded-2xl border bg-white shadow-2xl flex flex-col max-h-[90vh] animate-fade-in-up">
        <div class="p-5 border-b bg-slate-50 flex justify-between items-center rounded-t-2xl">
          <div>
             <div class="text-lg font-black text-slate-800">Formulir Pelepasan Aset</div>
             <div class="text-xs text-slate-500 mt-1">Menghentikan depresiasi dan mencatat laba/rugi atas nilai buku aset (NBV).</div>
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 w-8 h-8 rounded-full font-bold transition-colors shadow-inner" @click="showDialog = false">✕</button>
        </div>

        <div class="p-6 overflow-auto flex-1 space-y-5 bg-white">
          <div class="grid grid-cols-1 gap-5 px-1">
             <div class="space-y-1">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Pilih Aset Fisik</label>
                <select v-model="form.assetId" class="w-full border rounded-lg px-3 py-3 text-sm font-bold text-slate-800 outline-none focus:border-purple-500 shadow-inner bg-slate-50">
                   <option value="" disabled>-- Cari dan Pilih Aset Aktif --</option>
                   <option v-for="a in activeAssets" :key="a.id" :value="a.id">
                      {{ a.assetNo }} - {{ a.name }} (Sisa Nilai Pembelian: {{ formatRupiah(a.purchaseCost) }})
                   </option>
                </select>
             </div>
             
             <div class="grid grid-cols-2 gap-4">
                 <div class="space-y-1">
                    <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">No. Surat Referensi</label>
                    <input v-model="form.disposalNo" class="w-full border rounded-lg px-3 py-2 text-sm font-black font-mono text-slate-800 outline-none focus:border-purple-500 shadow-inner" placeholder="DISP-XXX" />
                 </div>
                 <div class="space-y-1">
                    <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tanggal Eksekusi</label>
                    <input type="date" v-model="form.disposalDate" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-purple-500 shadow-inner" />
                 </div>
             </div>

             <div class="space-y-1 border border-emerald-200 bg-emerald-50/50 p-4 rounded-xl shadow-inner mt-2">
                <label class="text-[11px] font-bold text-emerald-800 uppercase tracking-widest"><i class="pi pi-money-bill"></i> Harga Penjualan Bersih (Sale Value)</label>
                <div class="relative mt-2">
                   <div class="absolute left-3 top-3.5 font-black text-emerald-600">Rp</div>
                   <input type="number" v-model.number="form.saleValue" class="w-full border-2 border-emerald-300 rounded-lg pl-10 pr-3 py-3 text-lg font-black font-mono text-emerald-800 outline-none focus:border-emerald-500 shadow-inner bg-white" placeholder="0" />
                </div>
                <div class="text-[10px] text-emerald-700 mt-2 font-medium">Berapa uang tunai yang masuk dari hasil penjualan barang bekas ini? (Isi 0 jika dibuang total).</div>
             </div>
             
             <div class="space-y-1">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Alasan Pelepasan (Notes)</label>
                <input v-model="form.notes" class="w-full border rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-purple-500 shadow-inner" placeholder="Dijual ke pengepul besi rongsokan..." />
             </div>
          </div>
          
          <div class="bg-amber-50/50 p-3 rounded-lg border border-amber-100 flex items-start gap-3 mt-4">
             <i class="pi pi-exclamation-triangle text-amber-600 mt-0.5"></i>
             <div class="text-[11px] text-amber-800 font-medium">
                Sistem Pusat Keuangan (ERP) akan secara otomatis menghitung <b>Akumulasi Penyusutan Berjalan</b> sampai tanggal penjualan, kemudian menerbitkan nilai bersih buku (Net Book Value). Selisihnya dengan harga jual akan membentuk Jurnal Laba/Rugi.
             </div>
          </div>
        </div>

        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-2xl z-20 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)]">
           <Button label="Batal Bikin Dokumen" severity="secondary" @click="showDialog = false" class="bg-white text-slate-700 font-bold px-6 shadow-sm border border-slate-300" />
           <Button label="Kirim untuk Review (Draft)" :loading="saving" @click="save" bg="bg-purple-600" class="text-white font-bold px-6 border-none shadow-sm hover:bg-purple-700" icon="pi pi-send" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('finance.assetDisposal.create') || true);

const filterStatus = ref('');
const search = ref('');
const loading = ref(false);

const disposals = ref<any[]>([]);
const activeAssets = ref<any[]>([]);

const showDialog = ref(false);
const saving = ref(false);

const form = reactive({ 
  assetId: '', 
  disposalNo: '', 
  disposalDate: new Date().toISOString().slice(0,10), 
  saleValue: 0,
  notes: ''
});

const filteredDisposals = computed(() => {
   let list = disposals.value;
   if(search.value) {
      const q = search.value.toLowerCase();
      list = list.filter(x => 
         x.disposalNo?.toLowerCase().includes(q) || 
         x.asset?.name?.toLowerCase().includes(q) ||
         x.asset?.assetNo?.toLowerCase().includes(q)
      );
   }
   return list;
});

const totalLoss = computed(() => {
   return disposals.value.reduce((sum, curr) => {
       const gl = Number(curr.lossGain) || 0;
       return sum + (gl < 0 ? gl : 0);
   }, 0);
});

const formatRupiah = (val: number | string) => {
   if(!val && val !== 0) return 'Rp 0';
   return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(val));
};

const fmtDate = (d: string) => d?.slice(0, 10) ?? '-';

const load = async () => {
  loading.value = true;
  try {
    const params = filterStatus.value ? `?status=${filterStatus.value}` : '';
    const [resD, resA] = await Promise.all([
        api.get(`/finance/asset-disposal${params}`),
        api.get(`/finance/assets`)
    ]);
    
    let aList = [];
    if (resA.data?.assets) aList = resA.data.assets;
    else if (resA.assets) aList = resA.assets;
    activeAssets.value = aList.filter((x: any) => x.status === 'ACTIVE');

    if (resD.data?.disposals) disposals.value = resD.data.disposals;
    else if (resD.disposals) disposals.value = resD.disposals;

  } catch (e) {
    console.warn(e);
  } finally {
    loading.value = false;
  }
};

const save = async () => {
  if(!form.assetId || !form.disposalNo || form.saleValue < 0) return alert('Mohon lengkapi seluruh field dengan data yang valid.');
  saving.value = true;
  try {
    await api.post('/finance/asset-disposal', form);
    showDialog.value = false;
    Object.assign(form, { assetId: '', disposalNo: '', saleValue: 0, notes: '' });
    await load();
  } catch(e) {
     alert('Gagal mendata surat pelepasan aset.');
  } finally { 
     saving.value = false; 
  }
};

const approve = async (d: any) => {
    if(!confirm(`Setujui penghapusan fisik dari sistem untuk aset: ${d.asset?.name}?`)) return;
    try {
        await api.post(`/finance/asset-disposal/${d.id}/approve`);
        await load();
    } catch(e) {
        alert('Gagal mengeksekusi (Approve) pelepasan aset.');
    }
}

onMounted(() => { load(); });
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>