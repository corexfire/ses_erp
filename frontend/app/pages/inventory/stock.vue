<template>
  <div class="space-y-4">
    <!-- Header (Premium Inventory Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group">
      <div class="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-blue-100"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-6 relative">
        <div class="space-y-2">
           <div class="flex items-center gap-2 mb-1">
              <span class="px-3 py-1 bg-blue-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Warehouse Management</span>
              <span class="text-slate-300">/</span>
              <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-blue-600">Stock Balances</span>
           </div>
           <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none">Posisi <span class="text-blue-600">Persediaan</span></h1>
           <p class="text-slate-500 text-sm font-medium max-w-xl">Pantau tingkat stok real-time, alokasi gantung, dan riwayat mutasi buku besar gudang secara presisi.</p>
        </div>
        <div class="flex gap-3">
          <Button label="Audit Stock Count" severity="secondary" outlined class="p-button-rounded font-black text-[10px] px-6 h-12 uppercase" icon="pi pi-check-circle" />
          <Button v-if="canManage" label="Mutasi Antar Gudang" class="p-button-rounded font-black text-[10px] px-6 h-12 uppercase shadow-lg shadow-blue-100 bg-blue-600 border-none text-white transition-transform hover:scale-105 active:scale-95" icon="pi pi-arrow-right-arrow-left" @click="openMutation" />
        </div>
      </div>
    </div>

    <!-- Overview Banners -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
       <div class="p-6 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-4 transition-all hover:shadow-xl hover:-translate-y-1">
          <div class="p-4 bg-slate-100 rounded-3xl text-slate-500 text-xl border shadow-inner"><i class="pi pi-building"></i></div>
          <div>
             <div class="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Audit Fisik & Opname</div>
             <p class="text-xs text-slate-600 leading-relaxed font-medium">Lakukan verifikasi berkala antara pencatatan sistem dengan kondisi fisik rak untuk menjaga integritas data aset.</p>
          </div>
       </div>
       <div class="p-6 rounded-xl bg-emerald-900 text-white shadow-xl flex items-start gap-4 border border-emerald-800 transition-all hover:bg-emerald-950">
          <div class="p-4 bg-emerald-600 rounded-3xl text-white text-xl shadow-lg animate-pulse"><i class="pi pi-bolt"></i></div>
          <div>
             <div class="text-[10px] font-black uppercase text-emerald-300 tracking-widest mb-1">Real-time Stock Integrity</div>
             <p class="text-xs text-emerald-100/80 leading-relaxed font-medium">Sistem secara otomatis mengunci kuantitas yang dialokasikan ke pesanan aktif untuk mencegah *overselling*.</p>
          </div>
       </div>
    </div>

    <!-- Data List and Filters -->
    <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col">
       <div class="p-8 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-slate-50/10">
          <div class="flex items-center gap-3 w-full md:w-auto">
             <div class="relative w-full md:w-80">
                <i class="pi pi-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                <InputText v-model="search" placeholder="Cari Kode SKU / Lokasi..." class="w-full pl-10 text-xs font-bold rounded-2xl border-slate-200 h-11" />
             </div>
             <Select v-model="warehouseFilter" :options="warehouses" optionLabel="name" optionValue="id" placeholder="Semua Lokasi" class="w-48 text-xs font-bold rounded-2xl border-slate-200" showClear />
             <Button icon="pi pi-filter" severity="secondary" text rounded @click="load" :loading="loading" />
          </div>
       </div>

       <DataTable :value="filteredBalances" dataKey="id" class="p-datatable-sm w-full" :loading="loading">
          <template #empty>
             <div class="py-20 text-center text-slate-400">
                <i class="pi pi-box text-5xl opacity-20 mb-4 block"></i>
                <span class="font-medium">Tidak ada saldo stok yang ditemukan.</span>
             </div>
          </template>
          
          <Column header="SKU MATERIAL & LOKASI" class="pl-8">
             <template #body="{ data }">
                <div class="flex items-center gap-4 py-3">
                   <div class="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600 shadow-sm">
                      <i class="pi pi-box text-xl"></i>
                   </div>
                   <div class="flex flex-col">
                      <span class="text-xs font-black text-slate-900 tracking-tight">{{ data.item?.code || 'SKU-UNKNOWN' }}</span>
                      <span class="text-[10px] font-bold text-slate-500 mb-1">{{ data.item?.name }}</span>
                      <div class="flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-default">
                         <i class="pi pi-building text-[8px] text-slate-300"></i>
                         <span class="text-[9px] font-black uppercase tracking-widest text-slate-400">{{ data.warehouse?.name }}</span>
                      </div>
                   </div>
                </div>
             </template>
          </Column>

          <Column header="TERSEDIA (AVAIL)" class="text-right">
             <template #body="{ data }">
                <div class="flex flex-col items-end">
                   <span class="text-lg font-black font-mono text-emerald-600 tracking-tighter">{{ formatQty(data.qtyAvailable) }}</span>
                   <span class="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none">{{ data.uomCode }}</span>
                </div>
             </template>
          </Column>

          <Column header="ALOKASI" class="text-right border-x border-slate-50 bg-slate-50/20">
             <template #body="{ data }">
                <div class="flex flex-col items-end opacity-60">
                   <span class="text-sm font-bold font-mono text-rose-500">{{ formatQty(data.qtyAllocated) }}</span>
                   <span class="text-[8px] font-black text-slate-400 uppercase tracking-tighter leading-none">PENDING</span>
                </div>
             </template>
          </Column>

          <Column header="TOTAL ON-HAND" class="text-right bg-blue-50/30">
             <template #body="{ data }">
                <div class="flex flex-col items-end pr-4">
                   <span class="text-xl font-black font-mono text-blue-900 tracking-tighter">{{ formatQty(data.qtyOnHand) }}</span>
                   <span class="text-[9px] font-black text-blue-400 uppercase tracking-widest leading-none">ASSET VALUE</span>
                 </div>
             </template>
          </Column>

          <Column class="text-right pr-8">
             <template #body="{ data }">
                <Button label="Kartu Stok" icon="pi pi-list" text severity="info" class="p-button-sm font-black text-[10px] uppercase px-4 h-9 rounded-xl hover:bg-blue-50" @click="openLedger(data)" />
             </template>
          </Column>
       </DataTable>
    </div>

    <!-- Mutation Modal (Advanced Transfer) -->
    <Dialog v-model:visible="mutationVisible" modal class="w-[850px]" :pt="{ mask: { class: 'backdrop-blur-sm bg-black/20' }, content: { class: 'p-0 rounded-xl overflow-hidden shadow-2xl' }, header: { class: 'hidden' } }">
       <div class="flex items-center justify-between p-8 border-b border-slate-100 bg-white shadow-sm shrink-0">
          <div class="flex items-center gap-4">
             <div class="w-14 h-14 rounded-3xl bg-blue-900 flex items-center justify-center text-white shadow-xl rotate-3">
                <i class="pi pi-arrow-right-arrow-left text-2xl"></i>
             </div>
             <div>
                <h4 class="text-2xl font-black text-slate-900 leading-tight">Mutasi Antar Gudang</h4>
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inventory Logistics Transfer</p>
             </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="mutationVisible = false" />
       </div>

       <div class="p-10 space-y-10 max-h-[70vh] overflow-y-auto bg-slate-50/30">
          <!-- Section 1: Route Setup -->
          <div class="space-y-6 animate-fade-in">
             <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-[10px] font-black">01</div>
                <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800">Aliran Logistik</h4>
             </div>
             
             <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pl-11 relative">
                <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
                   <div class="w-10 h-10 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center shadow-lg text-blue-600">
                      <i class="pi pi-chevron-right"></i>
                   </div>
                </div>
                
                <div class="space-y-3 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm transition-all hover:border-blue-200">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-wider">Gudang Asal (Source)</label>
                   <Select v-model="mutationForm.fromWarehouseId" :options="warehouses" optionLabel="name" optionValue="id" placeholder="Pilih Lokasi Asal" @change="onWarehouseChange('from')" class="w-full text-sm font-bold border-none bg-slate-50 rounded-2xl h-12 flex items-center" />
                </div>

                <div class="space-y-3 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm transition-all hover:border-emerald-200">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-wider">Gudang Tujuan (Target)</label>
                   <Select v-model="mutationForm.toWarehouseId" :options="warehouses" optionLabel="name" optionValue="id" placeholder="Pilih Lokasi Tujuan" @change="onWarehouseChange('to')" class="w-full text-sm font-bold border-none bg-slate-50 rounded-2xl h-12 flex items-center" />
                </div>
             </div>
          </div>

          <!-- Section 2: Items Table -->
          <div class="space-y-6 animate-fade-in" v-if="mutationForm.fromWarehouseId && mutationForm.toWarehouseId">
             <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                   <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-black shadow-lg">02</div>
                   <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-800">Daftar Material Mutasi</h4>
                </div>
                <Button label="Tambah Item" icon="pi pi-plus" text severity="info" class="font-black text-[10px] uppercase" @click="addMutationItem" />
             </div>

             <div class="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm p-4">
                <table class="w-full text-xs">
                   <thead class="text-slate-400 uppercase tracking-widest text-[9px] font-black">
                      <tr>
                         <th class="p-3 text-left">Deskripsi Produk</th>
                         <th class="p-3 text-center w-24">Stok Toko</th>
                         <th class="p-3 text-center w-32">Kuantitas Pindah</th>
                         <th class="p-3 text-right">Aksi</th>
                      </tr>
                   </thead>
                   <tbody class="divide-y divide-slate-50">
                      <tr v-for="(it, idx) in mutationForm.items" :key="idx" class="group transition-colors">
                         <td class="p-3">
                            <Select v-model="it.itemId" :options="availableItems" optionLabel="label" optionValue="id" filter placeholder="Pilih SKU..." class="w-full text-xs font-bold border-none bg-slate-50 rounded-xl" @change="(v: any) => onMutationItemSelect(v, idx)" />
                         </td>
                         <td class="p-3 text-center">
                            <span class="font-mono font-black text-slate-400">{{ formatQty(it.available) || '0' }}</span>
                         </td>
                         <td class="p-3">
                            <InputNumber v-model="it.qty" :min="0" :max="it.available" class="w-full" inputClass="w-full font-black text-center text-xs h-10 rounded-xl bg-blue-50/50 border-none text-blue-900" placeholder="0" />
                         </td>
                         <td class="p-3 text-right">
                            <Button icon="pi pi-trash" severity="danger" text rounded @click="mutationForm.items.splice(idx, 1)" />
                         </td>
                      </tr>
                   </tbody>
                </table>
                <div v-if="mutationForm.items.length === 0" class="py-10 text-center text-slate-300 italic text-[11px]">Belum ada item yang dipilih untuk mutasi.</div>
             </div>
          </div>

          <!-- Section 3: Notes -->
          <div class="space-y-4 animate-fade-in pl-11">
             <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <i class="pi pi-pencil opacity-50"></i> Justifikasi Mutasi / Catatan Logistic
             </label>
             <Textarea v-model="mutationForm.notes" rows="3" class="w-full rounded-2xl text-xs font-bold border-none bg-white shadow-inner p-4 placeholder:italic" placeholder="Masukkan alasan pemindahan stok..." />
          </div>
       </div>

       <div class="p-8 border-t border-slate-100 bg-white flex justify-end gap-3 rounded-b-[2.5rem] shadow-sm shrink-0">
          <Button label="Batalkan" severity="secondary" text @click="mutationVisible = false" class="font-black text-[10px] uppercase px-6" />
          <Button label="Terbitkan & Posting Mutasi" icon="pi pi-check-circle" class="p-button-rounded font-black text-[10px] uppercase px-10 h-14 bg-emerald-600 border-none text-white shadow-xl shadow-emerald-100 transition-all hover:bg-emerald-700 hover:scale-[1.02]" @click="saveMutation" :loading="saving" :disabled="mutationForm.items.length === 0" />
       </div>
    </Dialog>

    <!-- Viewer Modal (Kartu Stok / Ledger) -->
    <Dialog v-model:visible="ledgerOpen" modal class="w-[950px]" :pt="{ mask: { class: 'backdrop-blur-sm bg-black/20' }, content: { class: 'p-0 rounded-xl overflow-hidden shadow-2xl' }, header: { class: 'hidden' } }">
        <!-- Header -->
        <div class="p-8 border-b bg-slate-900 flex flex-col sm:flex-row items-center justify-between shrink-0 gap-4 relative overflow-hidden">
          <div class="absolute right-[-40px] top-[-40px] opacity-10">
             <i class="pi pi-database text-[200px] text-white"></i>
          </div>
          <div class="z-10 text-white w-full pr-10">
             <div class="flex items-center gap-4 mb-2">
                <div class="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                   <i class="pi pi-list text-2xl text-blue-400"></i>
                </div>
                <div>
                   <span class="text-2xl font-black tracking-tighter block leading-none">Buku Besar Mutasi Gudang</span>
                   <span class="text-[9px] font-black uppercase tracking-[0.3em] text-blue-400/80 mt-1 block">Inventory Bin Card System</span>
                </div>
             </div>
             <div class="flex gap-6 mt-4 ml-1 pl-15">
                  <div class="flex flex-col">
                     <span class="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Reference Item</span>
                     <span class="text-xs font-bold text-white tracking-wide">{{ activeBal?.item?.code }} — {{ activeBal?.item?.name }}</span>
                  </div>
                  <div class="flex flex-col border-l border-white/10 pl-6">
                     <span class="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Active Location</span>
                     <span class="text-xs font-bold text-white tracking-wide"><i class="pi pi-building mr-2 text-[10px] opacity-50"></i>{{ activeBal?.warehouse?.name }}</span>
                  </div>
             </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded outlined class="text-white border-white/20 w-10 h-10 absolute right-6 top-6 z-20" @click="ledgerOpen = false" />
        </div>

        <div class="p-10 space-y-8 bg-slate-50/50">
           <!-- Metric Row -->
           <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="group p-6 rounded-xl bg-white border border-slate-100 shadow-sm transition-all hover:scale-105 hover:shadow-xl">
                 <div class="flex items-center justify-between mb-3">
                    <span class="text-[9px] font-black text-rose-500 uppercase tracking-widest">Inflow Aggregation</span>
                    <i class="pi pi-arrow-down-left text-emerald-500 text-xs"></i>
                 </div>
                 <div class="text-3xl font-black font-mono text-slate-800 tracking-tighter">{{ formatQty(ledgerStats.totalIn) }} <span class="text-xs text-slate-400 uppercase font-sans">{{ activeBal?.uomCode }}</span></div>
              </div>

              <div class="group p-6 rounded-xl bg-white border border-slate-100 shadow-sm transition-all hover:scale-105 hover:shadow-xl">
                 <div class="flex items-center justify-between mb-3">
                    <span class="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Outflow Aggregation</span>
                    <i class="pi pi-arrow-up-right text-rose-500 text-xs"></i>
                 </div>
                 <div class="text-3xl font-black font-mono text-slate-800 tracking-tighter">{{ formatQty(ledgerStats.totalOut) }} <span class="text-xs text-slate-400 uppercase font-sans">{{ activeBal?.uomCode }}</span></div>
              </div>

              <div class="p-6 rounded-xl bg-blue-900 border border-blue-800 shadow-2xl shadow-blue-200">
                 <div class="flex items-center justify-between mb-3">
                    <span class="text-[9px] font-black text-blue-300 uppercase tracking-widest">Current Balance</span>
                    <i class="pi pi-database text-blue-300 text-xs shadow-inner"></i>
                 </div>
                 <div class="text-3xl font-black font-mono text-white tracking-tighter">{{ formatQty(activeBal?.qtyOnHand) }} <span class="text-xs text-blue-400 uppercase font-sans">{{ activeBal?.uomCode }}</span></div>
              </div>
           </div>

           <!-- Table Row -->
           <div class="bg-white rounded-xl border border-slate-200 shadow-inner overflow-hidden p-2">
              <DataTable :value="ledgerHistory" scrollable scrollHeight="400px" class="p-datatable-sm" :loading="ledgerLoading">
                 <template #empty>
                    <div class="py-20 text-center text-slate-300 font-medium italic">Data transaksi belum terekam pada lembar ini.</div>
                 </template>
                 <Column header="TIMELINE" class="pl-6 w-36">
                    <template #body="{ data }">
                       <span class="font-mono text-[10px] font-bold text-slate-500">{{ formatDateTime(data.postingDate || data.movementDate) }}</span>
                    </template>
                 </Column>
                 <Column header="TRANSAKSI ACUAN" class="w-48">
                    <template #body="{ data }">
                       <div class="flex flex-col">
                          <span class="text-[10px] font-black text-slate-800 leading-none mb-1">{{ data.refType }}</span>
                          <span class="font-mono text-[9px] text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded inline-block">{{ data.refId }}</span>
                       </div>
                    </template>
                 </Column>
                 <Column header="DESKRIPSI LOGISTIK">
                    <template #body="{ data }">
                       <div class="flex flex-col">
                          <span class="text-[9px] font-black uppercase text-slate-400 tracking-wider mb-1">{{ data.moveType }}</span>
                          <span class="text-[10px] text-slate-600 font-medium leading-relaxed">{{ data.description }}</span>
                       </div>
                    </template>
                 </Column>
                 <Column header="IN (+)" class="text-right w-24">
                    <template #body="{ data }">
                       <span v-if="Number(data.qtyIn||(data.qtyChange>0?data.qtyChange:0)) > 0" class="font-mono font-black text-emerald-600">+{{ formatQty(data.qtyIn||data.qtyChange) }}</span>
                       <span v-else class="text-slate-200 opacity-20">—</span>
                    </template>
                 </Column>
                 <Column header="OUT (-)" class="text-right pr-8 w-24">
                    <template #body="{ data }">
                       <span v-if="Number(data.qtyOut||(data.qtyChange<0?Math.abs(data.qtyChange):0)) > 0" class="font-mono font-black text-rose-500">-{{ formatQty(data.qtyOut||Math.abs(data.qtyChange)) }}</span>
                       <span v-else class="text-slate-200 opacity-20">—</span>
                    </template>
                 </Column>
              </DataTable>
           </div>
        </div>

        <div class="p-8 border-t bg-white flex justify-end shrink-0 rounded-b-[2.5rem]">
          <Button label="Tutup Buku" severity="secondary" @click="ledgerOpen = false" class="p-button-rounded font-black text-[10px] uppercase px-8 h-11 border-slate-200 hover:bg-slate-50" />
        </div>
    </Dialog>


  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import { useApi } from '@/composables/useApi';

const api = useApi();
const toast = useToast();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('inventory.stock.manage') || true);

const balances = ref<any[]>([]);
const warehouses = ref<any[]>([]);
const search = ref('');
const warehouseFilter = ref('');
const loading = ref(false);
const saving = ref(false);

const ledgerOpen = ref(false);
const ledgerLoading = ref(false);
const activeBal = ref<any>(null);
const ledgerHistory = ref<any[]>([]);

// Mutation State
const mutationVisible = ref(false);
const availableItems = ref<any[]>([]);
const mutationForm = reactive({
   code: '',
   transferDate: new Date().toISOString().split('T')[0],
   fromWarehouseId: '',
   toWarehouseId: '',
   notes: '',
   items: [] as any[]
});

const ledgerStats = computed(() => {
   let totalIn = 0;
   let totalOut = 0;
   ledgerHistory.value.forEach(tx => {
       const cin = Number(tx.qtyIn || (tx.qtyChange > 0 ? tx.qtyChange : 0)) || 0;
       const cout = Number(tx.qtyOut || (tx.qtyChange < 0 ? Math.abs(tx.qtyChange) : 0)) || 0;
       totalIn += cin;
       totalOut += cout;
   });
   return { totalIn, totalOut };
});

const filteredBalances = computed(() => {
  let list = balances.value;
  if (warehouseFilter.value) {
    list = list.filter(p => p.warehouseId === warehouseFilter.value);
  }
  if (search.value) {
    const q = search.value.toLowerCase();
    list = list.filter(p => 
      (p.item?.code && p.item.code.toLowerCase().includes(q)) || 
      (p.item?.name && p.item.name.toLowerCase().includes(q)) ||
      (p.warehouse?.name && p.warehouse.name.toLowerCase().includes(q))
    );
  }
  return list;
});

// Formatters
const formatQty = (val: any) => {
  if (!val && val !== 0 || isNaN(val)) return '0';
  return Number(val).toLocaleString('id-ID', { maximumFractionDigits: 2 });
};

const formatDateTime = (iso: string) => {
  if (!iso) return '-';
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/inventory/stock/summary');
    if (res.data && res.data.rows) {
        balances.value = res.data.rows;
    }

    const whRes = await api.get('/inventory/warehouses');
    if (whRes.data && whRes.data.warehouses) warehouses.value = whRes.data.warehouses;
    
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Error', detail: e.message });
  } finally {
    loading.value = false;
  }
}

async function openLedger(bal: any) {
  activeBal.value = bal;
  ledgerOpen.value = true;
  ledgerLoading.value = true;
  ledgerHistory.value = [];
  
  try {
     const endpoint = `/inventory/stock/ledger?itemId=${bal.item.id}&warehouseId=${bal.warehouseId}`;
     const res = await api.get(endpoint);
     if(res.data && res.data.lines) {
        ledgerHistory.value = res.data.lines;
     }
  } catch (e) {
     toast.add({ severity: 'warn', summary: 'Audit Log', detail: 'Gagal menarik riwayat buku besar.' });
  } finally {
     ledgerLoading.value = false;
  }
}

// Mutation Logic
async function openMutation() {
   mutationForm.code = `TR-${new Date().getTime().toString().substr(-8)}`;
   mutationForm.fromWarehouseId = '';
   mutationForm.toWarehouseId = '';
   mutationForm.notes = '';
   mutationForm.items = [];
   mutationVisible.value = true;
   
   // Load items available across all warehouses
   try {
      const res = await api.get('/inventory/items');
      availableItems.value = res.data.items.map((i: any) => ({ 
         id: i.id, 
         label: `[${i.code}] ${i.name}`, 
         code: i.code,
         name: i.name,
         uomCode: i.baseUomCode || 'PCS'
      }));
   } catch (e) {}
}

function onWarehouseChange(type: 'from' | 'to') {
   if(mutationForm.fromWarehouseId === mutationForm.toWarehouseId) {
      toast.add({ severity: 'warn', summary: 'Validasi', detail: 'Gudang asal dan tujuan tidak boleh sama.' });
      if(type === 'to') mutationForm.toWarehouseId = '';
      else mutationForm.fromWarehouseId = '';
   }
}

function addMutationItem() {
   mutationForm.items.push({
      itemId: '',
      description: '',
      qty: 1,
      uomCode: 'PCS',
      available: 0
   });
}

function onMutationItemSelect(val: any, idx: number) {
   const selected = availableItems.value.find(i => i.id === val.value);
   if(selected) {
      mutationForm.items[idx].description = selected.name;
      mutationForm.items[idx].uomCode = selected.uomCode;
      
      // Lookup current stock at source warehouse
      const bal = balances.value.find(b => b.itemId === selected.id && b.warehouseId === mutationForm.fromWarehouseId);
      mutationForm.items[idx].available = bal ? bal.qtyAvailable : 0;
   }
}

async function saveMutation() {
   // Basic Validation
   if(!mutationForm.fromWarehouseId || !mutationForm.toWarehouseId) {
      toast.add({ severity: 'warn', summary: 'Gudang?', detail: 'Pilih gudang asal dan tujuan.' });
      return;
   }
   if(mutationForm.items.some(it => !it.itemId || it.qty <= 0)) {
       toast.add({ severity: 'warn', summary: 'Data Item', detail: 'Terdapat item yang belum lengkap atau jumlah tidak valid.' });
       return;
   }

   saving.value = true;
   try {
      // 1. Create Transfer
      const res = await api.post('/inventory/transfers', {
         ...mutationForm,
         items: mutationForm.items.map(it => ({
            itemId: it.itemId,
            description: it.description,
            qty: String(it.qty),
            uomCode: it.uomCode
         }))
      });
      
      const transferId = res.data.transfer.id;

      // 2. Direct Post (Auto-Update Stock)
      await api.post(`/inventory/transfers/${transferId}/post`);
      
      toast.add({ severity: 'success', summary: 'Mutasi Berhasil', detail: 'Stok telah berpindah lokasi secara administratif.' });
      mutationVisible.value = false;
      load();
   } catch (e: any) {
      toast.add({ severity: 'error', summary: 'Kegagalan Mutasi', detail: e.message });
   } finally {
      saving.value = false;
   }
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
  background: rgba(241, 245, 249, 0.5) !important;
}

:deep(.p-datatable-tbody > tr > td) {
  padding: 1.25rem 1rem !important;
  border-bottom: 1px solid #f8fafc !important;
}

.animate-fade-in {
  animation: fadeIn 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

:deep(.p-select), :deep(.p-inputtext), :deep(.p-inputnumber-input), :deep(.p-textarea) {
   border-color: #f1f5f9 !important;
   box-shadow: none !important;
   background-color: #f8fafc !important;
}

:deep(.p-select:hover), :deep(.p-inputtext:hover) {
   border-color: #3b82f6 !important;
}

:deep(.p-select-label) {
   font-size: 12px !important;
   font-weight: 700 !important;
   color: #1e293b !important;
}
</style>
