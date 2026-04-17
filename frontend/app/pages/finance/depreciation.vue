<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-6 shadow-sm border-l-4 border-l-teal-800 relative overflow-hidden">
      <div class="absolute right-[-20px] top-[-20px] opacity-10 pointer-events-none">
        <i class="pi pi-chart-line text-[150px] text-teal-900"></i>
      </div>
      
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
             <i class="pi pi-history text-teal-800"></i> Histori Penyusutan (Depreciation Log)
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
             Laporan audit komprehensif atas beban penyusutan (depresiasi) periodik untuk seluruh aset perusahaan.
          </div>
        </div>
      </div>
    </div>

    <!-- Master Depreciation History List -->
    <div class="rounded-xl border bg-white p-5 shadow-sm">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3 bg-slate-50 border p-3 rounded-lg flex-col sm:flex-row">
        <div class="font-black text-teal-800 flex items-center gap-2 uppercase tracking-widest text-xs">
           <i class="pi pi-verified"></i> Laporan Aktivitas Beban
        </div>
        <div class="flex items-center gap-3 w-full md:w-auto">
          <InputText v-model="search" placeholder="Cari Kode Aset / Catatan..." class="w-full md:w-64 text-sm font-mono border-slate-300" />
          <Button label="Sinkronisasi Data" severity="secondary" size="small" :disabled="loading" @click="load" icon="pi pi-refresh" />
        </div>
      </div>

      <div class="overflow-x-auto rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-teal-900 text-left text-[11px] text-white border-b uppercase tracking-widest font-bold">
            <tr>
              <th class="px-4 py-3 min-w-[200px]">Referensi Aset / Mesin</th>
              <th class="px-3 py-3 border-l text-center bg-teal-800">Tgl Periode Jurnal</th>
              <th class="px-4 py-3 border-l text-right w-36">Beban Susut (Depr)</th>
              <th class="px-4 py-3 border-l text-right w-40">Akumulasi Historis</th>
              <th class="px-4 py-3 text-left border-l">Keterangan / Notes GL</th>
            </tr>
          </thead>
          <tbody class="divide-y relative text-[12px]">
             <tr v-if="loading">
              <td colspan="5" class="px-4 py-16 text-center text-sm text-slate-500">
                <i class="pi pi-spinner pi-spin mr-2 text-teal-700"></i> Sinkronisasi histori penyusutan...
              </td>
            </tr>
            <tr v-for="d in filteredLogs" v-else :key="d.id" class="transition hover:bg-teal-50/30">
              <td class="px-4 py-3 align-middle">
                 <div class="font-bold text-slate-800">{{ d.asset?.name || 'Aset Terhapus' }}</div>
                 <div class="font-mono font-black text-[10px] text-slate-500 mt-0.5">
                    {{ d.asset?.assetNo || 'N/A' }}
                 </div>
              </td>
              <td class="px-3 py-3 align-middle text-center border-l font-bold text-teal-700">
                  {{ fmtDate(d.periodDate) }}
              </td>
              
              <!-- Expense Amount -->
              <td class="px-4 py-3 align-middle text-right bg-rose-50/30 border-l font-mono font-bold text-rose-700">-{{ formatRupiah(d.depreciationAmount) }}</td>
              
              <!-- ACCUMULATED -->
              <td class="px-4 py-3 align-middle text-right bg-amber-50/30 border-l font-mono font-bold text-amber-700">{{ formatRupiah(d.accumulatedAmount) }}</td>

              <!-- Notes -->
              <td class="px-4 py-3 align-middle text-left border-l text-slate-600 font-medium italic">
                 {{ d.notes || '-' }}
              </td>
            </tr>
            <tr v-if="!loading && filteredLogs.length === 0">
              <td colspan="5" class="px-4 py-16 text-center text-slate-400 border-t italic font-semibold">
                Masih belum ada riwayat beban penyusutan bulanan yang dicetak.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();

const search = ref('');
const loading = ref(false);

const assets = ref<any[]>([]);
const depreciationLogs = ref<any[]>([]);

const filteredLogs = computed(() => {
   let list = depreciationLogs.value;
   if(search.value) {
      const q = search.value.toLowerCase();
      list = list.filter(x => 
         x.asset?.assetNo?.toLowerCase().includes(q) || 
         x.asset?.name?.toLowerCase().includes(q) ||
         x.notes?.toLowerCase().includes(q)
      );
   }
   return list;
});

const formatRupiah = (val: number | string) => {
   if(!val) return 'Rp 0';
   return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(val));
};

const fmtDate = (d: string) => {
    if(!d) return '-';
    return new Date(d).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
};

const load = async () => {
  loading.value = true;
  try {
    const res = await api.get(`/finance/assets`);
    let asst = [];
    if (res.data?.assets) asst = res.data.assets;
    else if (res.assets) asst = res.assets;
    
    assets.value = asst;
    
    // Flat map all depreciation entries exactly like original author intended
    // But sorted logically by periodDate descending
    depreciationLogs.value = assets.value.flatMap((a: any) => 
       (a.depreciationEntries || []).map((d: any) => ({ ...d, asset: { assetNo: a.assetNo, name: a.name } }))
    ).sort((a: any, b: any) => new Date(b.periodDate).getTime() - new Date(a.periodDate).getTime());

  } catch (e) {
    console.warn(e);
  } finally {
    loading.value = false;
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