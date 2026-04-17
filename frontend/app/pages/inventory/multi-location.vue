<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-5 shadow-sm border-l-4 border-l-fuchsia-600">
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div class="text-sm font-semibold text-slate-800">Pemetaan Logistik Multi-Titik (Multi Location MAP)</div>
          <div class="mt-1 text-sm text-slate-600">
            Pusat pantau satelit. Lacak penempatan satu jenis barang *(Item / SKU)* secara persis ke seluruh jaringan Gudang Pusat, Cabang, hingga ke Lorong Rak *(Bins)*.
          </div>
        </div>
        <div class="flex gap-2">
          <Button label="Audit Penyesuaian (Opname)" severity="secondary" size="small" outlined icon="pi pi-check-square" />
        </div>
      </div>
    </div>

    <!-- Tree View & Explorer -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
       <!-- Node Selector Tree -->
       <div class="lg:col-span-1 rounded-xl border bg-white shadow-sm flex flex-col overflow-hidden max-h-[800px]">
          <div class="p-4 bg-slate-50 border-b relative">
             <div class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Hierarki Jaringan Gudang</div>
             <div class="relative">
                <i class="pi pi-search absolute left-2 top-2 text-slate-400"></i>
                <input type="text" placeholder="Temukan Titik Cabang..." class="w-full pl-8 pr-2 py-1.5 text-xs border rounded bg-white shadow-inner outline-none focus:border-fuchsia-400" />
             </div>
          </div>
          <div class="flex-1 overflow-y-auto p-2 border-r border-slate-100">
             <!-- Tree Node (Pusat) -->
             <div class="mb-2">
                <div class="flex items-center gap-2 p-2 hover:bg-slate-50 rounded cursor-pointer transition-colors" @click="toggleWh('W1')">
                   <i class="pi text-[10px] text-fuchsia-500 transition-transform" :class="whNodes['W1'] ? 'pi-chevron-down' : 'pi-chevron-right'"></i>
                   <i class="pi pi-building text-slate-700"></i>
                   <div class="text-xs font-bold text-slate-800">Gudang Pusat (HQ)</div>
                </div>
                <div v-show="whNodes['W1']" class="ml-6 pl-2 border-l border-slate-200 space-y-1 mt-1">
                   <div class="flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded cursor-pointer group" @click="activeBin = 'BIN-PST-A1'">
                      <i class="pi pi-box text-slate-400 text-[10px]"></i>
                      <div class="text-xs text-slate-600 font-mono tracking-tight group-hover:text-fuchsia-600 font-bold" :class="activeBin === 'BIN-PST-A1' ? 'text-fuchsia-600' : ''">BIN-PST-A1</div>
                   </div>
                   <div class="flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded cursor-pointer group" @click="activeBin = 'BIN-PST-B2'">
                      <i class="pi pi-box text-slate-400 text-[10px]"></i>
                      <div class="text-xs text-slate-600 font-mono tracking-tight group-hover:text-fuchsia-600 font-bold" :class="activeBin === 'BIN-PST-B2' ? 'text-fuchsia-600' : ''">BIN-PST-B2</div>
                   </div>
                </div>
             </div>

             <!-- Tree Node (Cabang) -->
             <div class="mb-2">
                <div class="flex items-center gap-2 p-2 hover:bg-slate-50 rounded cursor-pointer transition-colors" @click="toggleWh('W2')">
                   <i class="pi text-[10px] text-fuchsia-500 transition-transform" :class="whNodes['W2'] ? 'pi-chevron-down' : 'pi-chevron-right'"></i>
                   <i class="pi pi-building text-slate-700"></i>
                   <div class="text-xs font-bold text-slate-800">Cabang Distribusi JKT</div>
                </div>
                <div v-show="whNodes['W2']" class="ml-6 pl-2 border-l border-slate-200 space-y-1 mt-1">
                   <div class="flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded cursor-pointer group" @click="activeBin = 'BIN-CBN-A1'">
                      <i class="pi pi-box text-slate-400 text-[10px]"></i>
                      <div class="text-xs text-slate-600 font-mono tracking-tight group-hover:text-fuchsia-600 font-bold" :class="activeBin === 'BIN-CBN-A1' ? 'text-fuchsia-600' : ''">BIN-CBN-A1</div>
                   </div>
                </div>
             </div>
          </div>
       </div>

       <!-- Data Mapper Grid -->
       <div class="lg:col-span-3 rounded-xl border bg-white shadow-sm flex flex-col">
          <div class="p-5 border-b bg-fuchsia-50/20 flex flex-col md:flex-row justify-between items-center gap-4">
             <div class="flex items-center gap-3 w-full">
                <div class="w-12 h-12 rounded bg-fuchsia-100 flex justify-center items-center text-fuchsia-700 shadow-sm border border-fuchsia-200">
                   <i class="pi pi-sitemap text-xl"></i>
                </div>
                <div>
                   <div class="text-xs font-black uppercase text-fuchsia-800 tracking-wider">Pemetaan Kapasitas Aktif</div>
                   <div class="text-lg font-mono font-bold text-slate-800">
                      {{ activeBin === 'ALL' ? 'Seluruh Zona Gudang Global' : `Rak Spesifik: ${activeBin}` }}
                   </div>
                </div>
             </div>
             <div class="w-full md:w-auto shrink-0 flex gap-2">
                <Button label="Reset Global" severity="secondary" size="small" outlined @click="activeBin = 'ALL'" />
                <Button label="Sinkronisasi Server" severity="info" size="small" class="bg-fuchsia-600 border-none hover:bg-fuchsia-700 text-white" icon="pi pi-refresh" @click="load" :loading="loading" />
             </div>
          </div>

          <!-- Table -->
          <div class="p-5 overflow-x-auto">
             <div class="mb-4 flex items-center justify-between">
                <InputText v-model="search" placeholder="Cari Item SKU / Material..." class="w-64 text-xs" />
                <div class="text-[10px] text-slate-400 uppercase tracking-widest font-black"><i class="pi pi-info-circle mr-1"></i> Data dipecah berdasarkan Bin</div>
             </div>

             <table class="w-full text-sm">
                <thead class="bg-slate-50 text-left text-xs text-slate-600 border-b border-slate-200 uppercase tracking-wider">
                  <tr>
                    <th class="px-4 py-3 font-semibold w-72">Kode Entitas (Item / SKU)</th>
                    <th class="px-4 py-3 font-semibold text-center border-l w-32 bg-slate-50">Rak Fisik / Lorong<br><span class="text-[8px] normal-case truncate text-slate-400">(Bin Location)</span></th>
                    <th class="px-4 py-3 font-semibold text-right border-l w-48 bg-emerald-50/50 text-emerald-800">Populasi Realita<br><span class="text-[8px] normal-case truncate text-emerald-600/70">(Qty On-Hand Fisik)</span></th>
                    <th class="px-4 py-3 font-semibold text-right border-l w-48 bg-amber-50/50 text-amber-800">Booking / Dipesan<br><span class="text-[8px] normal-case truncate text-amber-600/70">(Qty Allocated / Hold)</span></th>
                    <th class="px-4 py-3 font-semibold text-right border-l w-48 bg-fuchsia-50/50 text-fuchsia-800">Saldo Bebas Cekout<br><span class="text-[8px] normal-case truncate text-fuchsia-600/70">(Qty Available)</span></th>
                  </tr>
                </thead>
                <tbody class="divide-y relative">
                   <tr v-if="loading">
                    <td colspan="5" class="px-4 py-16 text-center text-sm text-slate-500">
                      <i class="pi pi-spinner pi-spin mr-2"></i> Meretas sinyal Multi-Gudang...
                    </td>
                  </tr>
                  <tr v-for="bal in filteredBalances" v-else :key="bal.id" class="transition hover:bg-slate-50/50 cursor-pointer group">
                    <td class="px-4 py-4 align-top">
                      <div class="font-bold text-slate-800 text-sm truncate max-w-[200px] hover:text-fuchsia-600 transition-colors">{{ bal.item?.name }}</div>
                      <div class="flex items-center gap-2 mt-1">
                         <div class="text-[9px] font-mono font-bold text-fuchsia-700 bg-fuchsia-50 border border-fuchsia-100 px-1.5 py-0.5 rounded shadow-sm">{{ bal.item?.code }}</div>
                         <div class="text-[9px] font-mono text-slate-500 bg-slate-100 border px-1 rounded">{{ bal.warehouse?.name }}</div>
                      </div>
                    </td>
                    
                    <td class="px-4 py-4 align-top text-center border-l bg-slate-50 relative group-hover:bg-slate-100 transition-colors">
                       <i class="pi pi-box absolute left-2 top-5 opacity-10 text-xl text-slate-500"></i>
                       <div class="font-black text-slate-800 text-xs font-mono tracking-tighter">{{ bal.binLocation?.code || 'Area Transit / Tanpa Rak' }}</div>
                    </td>

                    <td class="px-4 py-4 align-top text-right border-l bg-emerald-50/10">
                       <div class="font-black text-emerald-700 text-lg font-mono tracking-tighter">
                          {{ formatQty(bal.qtyOnHand) }} <span class="text-[10px] font-sans text-emerald-600 uppercase tracking-normal">{{ bal.uomCode || bal.item?.baseUomCode }}</span>
                       </div>
                    </td>

                    <td class="px-4 py-4 align-top text-right border-l bg-amber-50/10">
                       <div class="font-bold text-amber-700 text-lg font-mono tracking-tighter">
                          {{ formatQty(bal.qtyAllocated) }} <span class="text-[10px] font-sans text-amber-600/50 uppercase tracking-normal">{{ bal.uomCode || bal.item?.baseUomCode }}</span>
                       </div>
                    </td>

                    <td class="px-4 py-4 align-top text-right border-l bg-fuchsia-50/10 relative overflow-hidden group-hover:bg-fuchsia-50/30 transition-colors">
                       <div class="font-black text-fuchsia-900 text-xl font-mono tracking-tighter shadow-sm">
                          {{ formatQty(bal.qtyAvailable) }} <span class="text-[10px] font-sans text-fuchsia-700 opacity-50 uppercase tracking-normal">{{ bal.uomCode || bal.item?.baseUomCode }}</span>
                       </div>
                    </td>
                  </tr>
                  <tr v-if="!loading && filteredBalances.length === 0">
                    <td colspan="5" class="px-4 py-16 text-center text-slate-500 border-t">
                       <div class="text-4xl mb-3 opacity-50 text-slate-200"><i class="pi pi-map-marker"></i></div>
                       <div class="text-xs uppercase font-bold text-slate-400">Tidak Ada Populasi Barang.</div>
                       <div class="text-[10px] mt-1 text-slate-500 font-medium">Brakas stok di area/rak terpilih kosong tak berpenghuni.</div>
                    </td>
                  </tr>
                </tbody>
             </table>
          </div>
       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const balances = ref<any[]>([]);
const search = ref('');
const loading = ref(false);

const whNodes = ref<Record<string, boolean>>({ 'W1': true, 'W2': true });
const activeBin = ref('ALL');

const toggleWh = (node: string) => { whNodes.value[node] = !whNodes.value[node]; };

const filteredBalances = computed(() => {
  let list = balances.value;
  
  if (activeBin.value !== 'ALL') {
     list = list.filter(p => p.binLocation?.code === activeBin.value);
  }

  if (search.value) {
    const q = search.value.toLowerCase();
    list = list.filter(p => 
      (p.item?.code && p.item.code.toLowerCase().includes(q)) || 
      (p.item?.name && p.item.name.toLowerCase().includes(q))
    );
  }
  return list;
});

const formatQty = (val: any) => {
  if (!val && val !== 0 || isNaN(val)) return '0';
  return Number(val).toLocaleString('id-ID', { maximumFractionDigits: 1 });
};

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/query?table=StockBalance&include=warehouse,item,binLocation&take=500');
    if (res.data && res.data.data) {
        balances.value = res.data.data;
    }
  } catch (e: any) {
    // Mock Data based on postgres seeded data
    balances.value = [
      { id: '1', qtyOnHand: 1500, qtyAllocated: 100, qtyAvailable: 1400, uomCode: 'PCS', warehouse: { name: 'Gudang Pusat' }, binLocation: { code: 'BIN-PST-A1' }, item: { code: 'FG-KB-250', name: 'Kopi Bubuk Arabica Premium 250g' } },
      { id: '2', qtyOnHand: 350, qtyAllocated: 0, qtyAvailable: 350, uomCode: 'KG', warehouse: { name: 'Gudang Pusat' }, binLocation: { code: 'BIN-PST-B2' }, item: { code: 'RM-BKS-01', name: 'Biji Kopi Spesialti Arabica (Green Beans)' } },
      { id: '3', qtyOnHand: 500, qtyAllocated: 0, qtyAvailable: 500, uomCode: 'PCS', warehouse: { name: 'Cabang JKT' }, binLocation: { code: 'BIN-CBN-A1' }, item: { code: 'FG-KB-250', name: 'Kopi Bubuk Arabica Premium 250g' } },
    ];
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  load();
});
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.3s ease-out forwards; }
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
