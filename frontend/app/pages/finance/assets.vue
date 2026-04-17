<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-6 shadow-sm border-l-4 border-l-sky-600 relative overflow-hidden">
      <!-- Decorative background icon -->
      <div class="absolute right-[-20px] top-[-20px] opacity-10 pointer-events-none">
        <i class="pi pi-box text-[150px] text-sky-900"></i>
      </div>
      
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
             <i class="pi pi-box text-sky-600"></i> Fixed Assets (Aset Tetap Pabrik)
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
             Inventaris dan valuasi aset tetap perusahaan (Mesin, Kendaraan, Gedung) berserta otomatisasi biaya penyusutan (Depreciation).
          </div>
        </div>
        <div class="flex gap-2">
           <Button v-if="canManage" label="+ Beli / Daftarkan Aset Baru" size="small" bg="bg-sky-600" class="text-white font-bold border-none shrink-0 cursor-pointer shadow-sm hover:bg-sky-700" icon="pi pi-plus" @click="showDialog = true" />
        </div>
      </div>
    </div>

    <!-- Quick Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-white border rounded-lg p-4 shadow-sm relative overflow-hidden">
           <div class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 relative z-10">Total Aset Fisik</div>
           <div class="text-xl font-black font-mono text-slate-800 relative z-10">{{ assets.length }} Unit Aktif</div>
        </div>
        <div class="bg-sky-50 border border-sky-200 rounded-lg p-4 shadow-sm">
           <div class="text-[10px] font-bold text-sky-700 uppercase tracking-widest mb-1">Total Nilai Perolehan (Cost)</div>
           <div class="text-xl font-black font-mono text-sky-800">{{ formatRupiah(totalAssetCost) }}</div>
        </div>
        <div class="bg-amber-50 border border-amber-200 rounded-lg p-4 shadow-sm">
           <div class="text-[10px] font-bold text-amber-700 uppercase tracking-widest mb-1">Total Akumulasi Penyusutan</div>
           <div class="text-xl font-black font-mono text-amber-800 flex items-center gap-2">
              <i class="pi pi-chart-line"></i> {{ formatRupiah(totalDepreciation) }}
           </div>
        </div>
        <div class="bg-emerald-50 border border-emerald-200 rounded-lg p-4 shadow-sm">
           <div class="text-[10px] font-bold text-emerald-700 uppercase tracking-widest mb-1">Nilai Buku (Net Book Value)</div>
           <div class="text-xl font-black font-mono text-emerald-800">{{ formatRupiah(netBookValue) }}</div>
        </div>
    </div>

    <!-- Master Asset List -->
    <div class="rounded-xl border bg-white p-5 shadow-sm">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3 bg-slate-50 border p-3 rounded-lg">
        <div class="flex items-center gap-3 w-full md:w-auto">
          <InputText v-model="search" placeholder="Cari Nama Aset / Kode..." class="w-full md:w-64 text-sm font-mono border-slate-300" />
          <select v-model="categoryFilter" class="p-2 border border-slate-300 rounded-lg text-sm bg-white text-slate-700 w-40 outline-none focus:border-sky-500 font-semibold" @change="load">
            <option value="">Semua Kategori</option>
            <option value="MACHINE">Mesin & Pabrik (MACHINE)</option>
            <option value="VEHICLE">Kendaraan (VEHICLE)</option>
            <option value="EQUIPMENT">Peralatan (EQUIPMENT)</option>
            <option value="BUILDING">Bangunan (BUILDING)</option>
            <option value="IT">Teknologi / IT (IT)</option>
          </select>
          <Button label="Muat Ulang" severity="secondary" size="small" :disabled="loading" @click="load" icon="pi pi-refresh" />
        </div>
      </div>

      <div class="overflow-x-auto rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-slate-100 text-left text-[11px] text-slate-600 border-b border-slate-200 uppercase tracking-widest font-bold">
            <tr>
              <th class="px-4 py-3 min-w-[200px]">Data Aset</th>
              <th class="px-3 py-3 border-l text-center">Tgl Beli</th>
              <th class="px-4 py-3 bg-sky-50/50 border-l text-right w-32">Nilai Beli (Cost)</th>
              <th class="px-4 py-3 bg-amber-50/50 border-l text-right w-32">Penyusutan</th>
              <th class="px-4 py-3 bg-emerald-50/50 border-l text-right w-32">Nilai Buku (NBV)</th>
              <th class="px-4 py-3 text-center border-l w-28">Status / Life</th>
              <th class="px-3 py-3 text-center border-l w-24">Aksi Penyusutan</th>
            </tr>
          </thead>
          <tbody class="divide-y relative text-[12px]">
             <tr v-if="loading">
              <td colspan="7" class="px-4 py-16 text-center text-sm text-slate-500">
                <i class="pi pi-spinner pi-spin mr-2 text-sky-500"></i> Memuat Buku Besar Aset Tetap...
              </td>
            </tr>
            <tr v-for="a in filteredAssets" v-else :key="a.id" class="transition hover:bg-slate-50">
              <td class="px-4 py-3 align-middle">
                 <div class="font-bold text-slate-800">{{ a.name }}</div>
                 <div class="flex items-center gap-2 mt-1">
                    <span class="font-mono font-black text-[10px] text-slate-500">{{ a.assetNo }}</span>
                    <span class="bg-slate-100 border text-slate-600 px-1 py-0.5 rounded text-[8px] font-bold tracking-widest">{{ a.category }}</span>
                 </div>
              </td>
              <td class="px-3 py-3 align-middle text-center border-l font-medium text-slate-600">{{ fmtDate(a.purchaseDate) }}</td>
              
              <!-- Cost -->
              <td class="px-4 py-3 align-middle text-right bg-sky-50/30 border-l font-mono font-bold text-sky-800">{{ formatRupiah(a.purchaseCost) }}</td>
              
              <!-- Depr -->
              <td class="px-4 py-3 align-middle text-right bg-amber-50/30 border-l font-mono font-bold text-amber-700">{{ formatRupiah(getAccumulatedDepr(a)) }}</td>
              
              <!-- NBV -->
              <td class="px-4 py-3 align-middle text-right bg-emerald-50/30 border-l font-mono font-black text-emerald-700">{{ formatRupiah(Number(a.purchaseCost) - getAccumulatedDepr(a)) }}</td>

              <!-- Status -->
              <td class="px-4 py-3 align-middle text-center border-l">
                 <div :class="{
                    'bg-slate-100 text-slate-600 border-slate-200': a.status === 'ACTIVE',
                    'bg-rose-100 text-rose-700 border-rose-200': a.status === 'SOLD' || a.status === 'SCRAPPED'
                 }" class="px-2 py-0.5 rounded text-[9px] font-black tracking-widest border inline-block uppercase shadow-sm mb-1 w-full text-center">
                    {{ a.status }}
                 </div>
                 <div class="text-[10px] font-medium text-slate-500 w-full text-center truncate" title="Sisa Umur Manfaat">
                    Umur Manfaat: <b class="text-slate-800">{{ a.usefulLife }} Bln</b>
                 </div>
              </td>
              
              <td class="px-3 py-3 text-center border-l">
                <Button label="Susutkan" size="small" bg="bg-sky-600" class="text-white text-[10px] border-none px-2 py-1.5 w-full font-bold hover:bg-sky-700 shadow-sm" icon="pi pi-cog" :disabled="Number(a.purchaseCost) - getAccumulatedDepr(a) <= Number(a.salvageValue)" @click="openDepreciate(a)" />
              </td>
            </tr>
            <tr v-if="!loading && filteredAssets.length === 0">
              <td colspan="7" class="px-4 py-16 text-center text-slate-400 border-t italic">
                Pabrik Anda belum memiliki pencatatan Aset Fisik.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create Asset Dialog -->
    <div v-if="showDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div class="w-full max-w-2xl rounded-2xl border bg-white shadow-2xl flex flex-col max-h-[90vh] animate-fade-in-up">
        <div class="p-5 border-b bg-slate-50 flex justify-between items-center rounded-t-2xl">
          <div>
             <div class="text-lg font-black text-slate-800">Registrasi Inventaris Aset Tetap</div>
             <div class="text-xs text-slate-500 mt-1">Kapitalisasi barang pembelian mahal menjadi beban berjangka panjang.</div>
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 w-8 h-8 rounded-full font-bold transition-colors shadow-inner" @click="showDialog = false">✕</button>
        </div>

        <div class="p-6 overflow-auto flex-1 space-y-5 bg-white">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 px-1">
             <div class="space-y-1">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">No. Kode Aset Fisik</label>
                <input v-model="form.assetNo" class="w-full border rounded-lg px-3 py-2 text-sm font-black font-mono text-slate-800 outline-none focus:border-sky-500 shadow-inner" placeholder="FAS-XXX-0001" />
             </div>
             <div class="space-y-1">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Klasifikasi (Category)</label>
                <select v-model="form.category" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-sky-500 shadow-inner">
                   <option value="" disabled>-- Pilih Kategori --</option>
                   <option value="MACHINE">Mesin F&B / Produksi F&B</option>
                   <option value="VEHICLE">Kendaraan Operasional / Kurir</option>
                   <option value="EQUIPMENT">Peralatan Pabrik Umum</option>
                   <option value="BUILDING">Bangunan / Gedung / Gudang</option>
                   <option value="IT">Perangkat IT / Server ERP</option>
                </select>
             </div>
             
             <div class="space-y-1 col-span-1 md:col-span-2">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Nama Lengkap Aset</label>
                <input v-model="form.name" class="w-full border rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-sky-500 shadow-inner font-bold" placeholder="Misal: Mesin Giling Otomatis Seri A..." />
             </div>

             <div class="space-y-1">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tgl Masuk Beroperasi</label>
                <input type="date" v-model="form.purchaseDate" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-sky-500 shadow-inner" />
             </div>
             <div class="space-y-1">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Harga Perolehan (Cost - Rp)</label>
                <div class="relative">
                   <div class="absolute left-3 top-2.5 font-black text-slate-400">Rp</div>
                   <input type="number" v-model.number="form.purchaseCost" class="w-full border rounded-lg pl-10 pr-3 py-2 text-sm font-black font-mono text-slate-800 outline-none focus:border-sky-500 shadow-inner" placeholder="0" />
                </div>
             </div>

             <div class="space-y-1">
                <label class="text-[11px] font-bold text-amber-600 uppercase tracking-widest">Umur Ekonomis (Bulan)</label>
                <input type="number" v-model.number="form.usefulLife" class="w-full border border-amber-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-amber-500 shadow-inner bg-amber-50/30" placeholder="Contoh: 60 (Untuk 5 Tahun)" />
             </div>
             <div class="space-y-1">
                <label class="text-[11px] font-bold text-emerald-600 uppercase tracking-widest">Nilai Sisa Kalkulasi (Salvage Value)</label>
                <div class="relative">
                   <div class="absolute left-3 top-2.5 font-black text-emerald-600">Rp</div>
                   <input type="number" v-model.number="form.salvageValue" class="w-full border border-emerald-200 rounded-lg pl-10 pr-3 py-2 text-sm font-black font-mono text-emerald-800 outline-none focus:border-emerald-500 shadow-inner bg-emerald-50/30" placeholder="0" />
                </div>
             </div>
          </div>
          <div class="bg-blue-50/50 p-3 rounded-lg border border-blue-100 flex items-start gap-3">
             <i class="pi pi-info-circle text-blue-600 mt-0.5"></i>
             <div class="text-xs text-blue-800">
                Penyusutan akan menggunakan metode **Garis Lurus (Straight Line)** standar PSAK. Beban sebulan adalah: <br/> 
                <span class="font-mono font-bold mt-1 inline-block">=(Harga - Nilai Sisa) / Umur Ekonomis</span>
             </div>
          </div>
        </div>

        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-2xl z-20 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)]">
           <Button label="Batal" severity="secondary" @click="showDialog = false" class="bg-white text-slate-700 font-bold px-6 shadow-sm border border-slate-300" />
           <Button label="Kapitalisasi Aset" :loading="saving" @click="save" bg="bg-sky-600" class="text-white font-bold px-6 border-none shadow-sm hover:bg-sky-700" icon="pi pi-save" />
        </div>
      </div>
    </div>

    <!-- Depreciate Dialog -->
    <div v-if="deprDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div class="w-full max-w-md rounded-2xl border bg-white shadow-2xl flex flex-col animate-fade-in-up">
        <div class="p-5 border-b bg-amber-50 border-amber-100 flex justify-between items-center rounded-t-2xl">
          <div>
            <div class="text-lg font-black text-amber-800 flex items-center gap-2"><i class="pi pi-cog pi-spin"></i> Lari Operasi Penyusutan</div>
            <div class="text-xs font-semibold text-amber-600 mt-0.5 uppercase tracking-wide">Manual Depreciation Job</div>
          </div>
          <button class="text-amber-500 hover:text-amber-700 bg-white shadow-sm w-8 h-8 rounded-full font-bold transition-colors" @click="deprDialog = false">✕</button>
        </div>
        
        <div class="p-6 space-y-4 bg-white">
           <div class="bg-sky-50 border border-sky-100 rounded-xl p-3 text-center mb-2 shadow-inner">
              <div class="text-[10px] uppercase font-bold text-sky-600 tracking-wider">Aset Dikalibrasi</div>
              <div class="font-bold text-slate-800 mt-1 line-clamp-1">{{ activeAssetObj?.name }}</div>
              <div class="font-mono font-black text-sky-900 mt-1 bg-white inline-block px-2 py-0.5 rounded border border-sky-200">{{ activeAssetObj?.assetNo }}</div>
           </div>

           <div class="space-y-1">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Beban Penyusutan Bulan Ini (Rp)</label>
              <div class="relative">
                 <div class="absolute left-3 top-2.5 font-black text-slate-400">Rp</div>
                 <input type="number" v-model.number="deprForm.depreciationAmount" class="w-full border-2 border-slate-200 rounded-lg pl-10 pr-3 py-2 text-lg font-black font-mono text-slate-700 shadow-inner focus:border-amber-500 outline-none" />
              </div>
              <div class="text-[9px] text-slate-400 mt-1 font-bold">*Angka Garis Lurus (Straight line) dihitung otomatis oleh mesin VUE.</div>
           </div>
           
           <div class="space-y-1">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Periode Bulan Buku (End Date)</label>
              <input type="date" v-model="deprForm.periodDate" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-amber-500 shadow-inner" />
           </div>

           <div class="space-y-1">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Catatan Buku Besar (GL)</label>
              <input v-model="deprForm.notes" class="w-full border rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-amber-500 shadow-inner" placeholder="Manual monthly depreciation..." />
           </div>
        </div>

        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
           <Button label="Batal Bekerja" severity="secondary" @click="deprDialog = false" class="bg-white text-slate-700 font-bold px-4 shadow-sm border border-slate-300 w-full md:w-auto" />
           <Button label="Posting Penyusutan" :loading="working" @click="submitDepr" class="bg-amber-600 border-none text-white font-bold px-6 shadow-sm hover:bg-amber-700 w-full md:w-auto" icon="pi pi-check-circle" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('finance.asset.create') || true);

const categoryFilter = ref('');
const search = ref('');
const loading = ref(false);

const assets = ref<any[]>([]);

const showDialog = ref(false);
const deprDialog = ref(false);
const saving = ref(false);
const working = ref(false);

const activeAssetObj = ref<any>(null);

const form = reactive({ 
  assetNo: '', 
  name: '', 
  category: '', 
  purchaseDate: new Date().toISOString().slice(0,10), 
  purchaseCost: 0, 
  usefulLife: 60,
  salvageValue: 0,
  depreciationMethod: 'STRAIGHT_LINE'
});

const deprForm = reactive({ periodDate: new Date().toISOString().slice(0,10), depreciationAmount: 0, notes: 'Automated Vue Depreciation Job' });

const filteredAssets = computed(() => {
   let list = assets.value;
   if (categoryFilter.value) {
       list = list.filter(x => x.category === categoryFilter.value);
   }
   if(search.value) {
      const q = search.value.toLowerCase();
      list = list.filter(x => 
         x.assetNo?.toLowerCase().includes(q) || 
         x.name?.toLowerCase().includes(q)
      );
   }
   return list;
});

const getAccumulatedDepr = (asset: any) => {
    if (!asset || !asset.depreciationEntries) return 0;
    return asset.depreciationEntries.reduce((sum, d) => sum + Number(d.depreciationAmount), 0);
};

const totalAssetCost = computed(() => {
   return assets.value.reduce((sum, curr) => sum + Number(curr.purchaseCost), 0);
});

const totalDepreciation = computed(() => {
   return assets.value.reduce((sum, curr) => sum + getAccumulatedDepr(curr), 0);
});

const netBookValue = computed(() => {
    return totalAssetCost.value - totalDepreciation.value;
})

const formatRupiah = (val: number | string) => {
   if(!val) return 'Rp 0';
   return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(val));
};

const fmtDate = (d: string) => d?.slice(0, 10) ?? '-';

const load = async () => {
  loading.value = true;
  try {
    const res = await api.get(`/finance/assets`);
    if (res.data?.assets) assets.value = res.data.assets;
    else if (res.assets) assets.value = res.assets;
  } catch (e) {
    console.warn(e);
  } finally {
    loading.value = false;
  }
};

const save = async () => {
  if(!form.assetNo || !form.name || !form.category || form.purchaseCost <= 0) return alert('Mohon lengkapi seluruh field aset mandatory.');
  saving.value = true;
  try {
    await api.post('/finance/assets', form);
    showDialog.value = false;
    Object.assign(form, { assetNo: '', name: '', category: '', purchaseCost: 0, usefulLife: 60, salvageValue: 0 });
    await load();
  } catch(e) {
     alert('Gagal mendata registrasi aset ERP.');
  } finally { 
     saving.value = false; 
  }
};

const openDepreciate = (a: any) => { 
  activeAssetObj.value = a;
  
  // Calculate Straight line default
  const cost = Number(a.purchaseCost);
  const salv = Number(a.salvageValue);
  const life = Number(a.usefulLife);
  const baseLineMonthly = Math.round((cost - salv) / life);

  Object.assign(deprForm, { 
    periodDate: new Date().toISOString().slice(0, 10), 
    depreciationAmount: baseLineMonthly > 0 ? baseLineMonthly : 0, 
    notes: 'Posting penyusutan manual dari dasbor Vue' 
  }); 
  deprDialog.value = true; 
};

const submitDepr = async () => {
  if (deprForm.depreciationAmount <= 0) return alert('Beban penyusutan harus lebih mahal dari 0 Rupiah.');
  working.value = true;
  try {
    await api.post(`/finance/assets/${activeAssetObj.value.id}/depreciation`, deprForm);
    deprDialog.value = false;
    await load();
  } catch(e) {
    alert('Gagal memproses Journal depreciation.');
  } finally { 
    working.value = false; 
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
</style>