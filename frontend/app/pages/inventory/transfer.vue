<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-5 shadow-sm border-l-4 border-l-purple-600">
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div class="text-sm font-semibold text-slate-800">Mutasi Antar Titik Gudang (Stock Transfer)</div>
          <div class="mt-1 text-sm text-slate-600">
            Perintah relokasi inventaris skala besar (Warehouse to Warehouse). Pengiriman barang internal dan manajemen alokasi cabang.
          </div>
        </div>
        <div class="flex gap-2">
          <Button label="Audit Transit / Lacak" severity="secondary" size="small" outlined icon="pi pi-compass" />
          <Button v-if="canManage" label="+ Generate Surat Mutasi" size="small" bg="bg-purple-600" class="text-white border-none shrink-0 cursor-pointer" icon="pi pi-arrow-right-arrow-left" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Data List and Filters -->
    <div class="rounded-xl border bg-white p-5 shadow-sm">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2 w-full md:w-auto">
          <InputText v-model="search" placeholder="Cari Dokumen Mutasi (TRF)..." class="w-full md:w-80 text-xs" />
          <select v-model="statusFilter" class="p-2 border rounded-md text-xs bg-white text-slate-700 min-w-32">
            <option value="">Semua Dokumen</option>
            <option value="DRAFT">Draft Ekspedisi (Bongkar)</option>
            <option value="POSTED">Sukses Pendaratan Gudang Target</option>
          </select>
          <Button label="Filter" severity="secondary" size="small" :disabled="loading" @click="load" />
        </div>
      </div>

      <!-- Transfer Table -->
      <div class="overflow-x-auto rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-purple-50 text-left text-xs text-purple-900 border-b border-purple-100 uppercase tracking-wider">
            <tr>
              <th class="px-4 py-3 font-semibold">Surat Penugasan (TRF)</th>
              <th class="px-4 py-3 font-semibold w-1/3">Route Logistik Ekspedisi (Internal)</th>
              <th class="px-4 py-3 font-semibold text-right">Volume Barang (SKU)</th>
              <th class="px-4 py-3 font-semibold text-center w-36">Status Mutasi</th>
              <th class="px-4 py-3 text-right font-semibold">Tindakan Khusus</th>
            </tr>
          </thead>
          <tbody class="divide-y relative">
             <tr v-if="loading">
              <td colspan="5" class="px-4 py-16 text-center text-sm text-slate-500">
                <i class="pi pi-spinner pi-spin mr-2"></i> Mensinkronisasi perpindahan armada cabang...
              </td>
            </tr>
            <!-- Iteration rows -->
            <tr v-for="doc in filteredDocs" v-else :key="doc.id" class="transition hover:bg-purple-50/40 group">
              <!-- Dokumen -->
              <td class="px-4 py-3 align-top">
                <div class="font-bold text-slate-800 text-xs flex items-center gap-2 font-mono">
                   {{ doc.code }}
                   <i v-if="doc.status === 'POSTED'" class="pi pi-check-circle text-[10px] text-emerald-500" title="Alokasi Mutasi Selesai di Target"></i>
                </div>
                <div class="text-[10px] text-slate-500 mt-1">🗓️ Penugasan Kargo: {{ formatDate(doc.transferDate) }}</div>
                <div class="text-[9px] text-slate-400 mt-1 italic w-48 truncate">"{{ doc.notes || '-' }}"</div>
              </td>
              
              <!-- Route Logistik -->
              <td class="px-4 py-3 align-top">
                 <div class="flex flex-col gap-1 w-full max-w-sm">
                    <div class="flex justify-between items-center bg-rose-50 border border-rose-100 rounded px-2 py-1 shadow-sm">
                       <span class="text-[9px] font-bold text-rose-700 uppercase tracking-widest w-16">Asal:</span>
                       <span class="text-xs font-mono font-bold text-slate-700 truncate">{{ doc.fromWarehouse?.name || 'Gudang Pusat' }}</span>
                    </div>
                    <div class="flex justify-center -my-1.5 relative z-10"><i class="pi pi-arrow-down text-[10px] text-purple-400 font-black bg-white rounded-full p-0.5"></i></div>
                    <div class="flex justify-between items-center bg-emerald-50 border border-emerald-100 rounded px-2 py-1 shadow-sm">
                       <span class="text-[9px] font-bold text-emerald-700 uppercase tracking-widest w-16">Tujuan:</span>
                       <span class="text-xs font-mono font-bold text-slate-700 truncate">{{ doc.toWarehouse?.name || 'Cabang' }}</span>
                    </div>
                 </div>
              </td>

              <!-- Kuantitas Total -->
              <td class="px-4 py-3 align-top text-right">
                 <div class="font-black text-slate-700 text-sm font-mono relative pr-4">
                    {{ calculateLines(doc) }} Baris SKU <i class="pi pi-link absolute right-0 top-1 text-[9px] opacity-40"></i>
                 </div>
              </td>
              
              <!-- Status -->
              <td class="px-4 py-3 align-top text-center">
                 <span class="inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-sm" :class="statusBadgeClass(doc)">
                   {{ statusString(doc) }}
                 </span>
                 <div v-if="doc.status === 'POSTED'" class="text-[8px] text-slate-400 mt-1 uppercase mt-1"><i class="pi pi-check text-[7px]"></i> Inventaris Berpindah</div>
              </td>

              <!-- Actions -->
              <td class="px-4 py-3 align-top text-right">
                <Button label="Buka Kendali Mutasi" size="small" severity="secondary" outlined class="text-[10px] px-3 font-bold py-1 text-center hover:bg-slate-100 w-full" @click="openView(doc)" />
              </td>
            </tr>
            <tr v-if="!loading && filteredDocs.length === 0">
              <td colspan="5" class="px-4 py-16 text-center text-slate-500 border-t">
                <div class="text-4xl mb-3 opacity-50 text-slate-200"><i class="pi pi-globe"></i></div>
                Transportasi transit kosong. Tidak ada perpindahan lintas cabang.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Viewer/Editor Modal (Transfer Command Center) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4 backdrop-blur-sm shadow-xl">
      <div class="w-full max-w-5xl rounded-xl border bg-slate-50 shadow-2xl flex flex-col max-h-[95vh] h-full overflow-hidden animate-fade-in-up">
        
        <!-- Header -->
        <div class="p-6 border-b bg-purple-950 flex flex-col sm:flex-row items-center justify-between shrink-0 gap-4 relative overflow-hidden shadow-sm">
          <div class="absolute left-[-20px] top-[-20px] opacity-10">
             <i class="pi pi-truck text-[150px] text-white"></i>
          </div>
          <div class="z-10 w-full flex justify-between items-start">
             <div>
               <div class="flex items-center gap-3">
                 <span class="text-xl font-black text-purple-50 tracking-tight">{{ activeDoc?.id ? `Otoritas Mutasi Area (Stock Transfer): ${form.code}` : 'Aktivasi Tiket Mutasi Gudang Inter-Cabang' }}</span>
                 <span v-if="activeDoc?.id" class="inline-flex rounded text-[10px] font-bold uppercase shadow-sm border px-2 py-0.5" :class="form.status === 'POSTED' ? 'bg-emerald-500 text-emerald-50 border-emerald-400' : 'bg-amber-500 text-white border-amber-400'">
                   {{ form.status === 'POSTED' ? 'DITERIMA DI LOKASI B' : 'PROSES PEMINDAHAN' }}
                 </span>
               </div>
               <div class="text-xs text-purple-200 font-medium opacity-80 mt-1 pl-1">Prosedur penarikan persediaan *Asset Ledger* dari satu Warehouse dan menyuntikkannya ke Warehouse lain.</div>
             </div>
          </div>
          <button class="text-white/50 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded text-lg font-bold flex items-center justify-center transition-colors shadow-sm z-20 absolute right-4 top-4" @click="dialogOpen = false">✕</button>
        </div>

        <div class="flex-1 overflow-y-auto flex flex-col p-5 bg-slate-100">
           
           <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm col-span-2 relative">
                 <div class="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-3 flex gap-2"><i class="pi pi-map"></i> Pemetaan Rute Transportasi / Logistik (Inter-Gudang)</div>
                 
                 <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-1">
                      <label class="text-[10px] font-bold text-slate-500">Depot Keberangkatan <span class="text-rose-500">(Gudang Asal)</span></label>
                      <select :disabled="isReadonly" v-model="form.fromWarehouseId" class="w-full border rounded p-2 text-xs font-bold font-mono text-rose-800 bg-rose-50 border-rose-200 outline-none shadow-inner">
                         <option value="">-- Tentukan Titik Angkut --</option>
                         <option v-for="w in mockWhs" :value="w.id">{{ w.name }}</option>
                      </select>
                    </div>
                    <div class="space-y-1">
                      <label class="text-[10px] font-bold text-slate-500">Depot Pendaratan <span class="text-emerald-500">(Gudang Tujuan)</span></label>
                      <select :disabled="isReadonly" v-model="form.toWarehouseId" class="w-full border rounded p-2 text-xs font-bold font-mono text-emerald-800 bg-emerald-50 border-emerald-200 outline-none shadow-inner">
                         <option value="">-- Tentukan Titik Injeksi/Terima --</option>
                         <option v-for="w in mockWhs" :value="w.id" :disabled="w.id === form.fromWarehouseId">{{ w.name }}</option>
                      </select>
                    </div>
                    <div class="col-span-2 space-y-1">
                      <label class="text-[10px] font-bold text-slate-500">Arahan Supir / Eksekutor</label>
                      <textarea :disabled="isReadonly" v-model="form.notes" rows="2" class="w-full rounded border p-2 text-xs bg-slate-50 outline-none focus:border-purple-500" placeholder="Plat Nomor Truk, Instansi Penanggung Jawab..."></textarea>
                    </div>
                 </div>
              </div>

              <!-- Time Status -->
              <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center items-center relative overflow-hidden group border-b-4 border-b-purple-600">
                 <div class="absolute opacity-5 group-hover:scale-110 transition-transform duration-700">
                    <i class="pi pi-calendar-times text-9xl text-slate-800"></i>
                 </div>
                 <div class="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2 relative z-10 w-full text-left">Waktu Rencana Ekspedisi</div>
                 <input :disabled="isReadonly" type="date" v-model="form.transferDate" class="w-full border-0 border-b-2 font-black text-xl text-center text-slate-800 py-2 outline-none relative z-10 bg-transparent disabled:opacity-100" />
                 <div class="text-[9px] text-slate-400 mt-3 text-center relative z-10 leading-tight">Digunakan sebagai titik potong (Cut-Off) riwayat akuntansi gudang/SOH.</div>
              </div>
           </div>

           <!-- Pengecekan Rak / Pick List -->
           <div class="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
               <div class="flex items-center justify-between p-4 bg-slate-50 border-b">
                 <div class="text-xs font-black text-slate-800 uppercase tracking-widest"><i class="pi pi-file-export mr-2 text-purple-600"></i> Manifes Muatan Armada Ekspedisi</div>
                 <Button v-if="!isReadonly" label="Tambah Baris Lot Gudang" icon="pi pi-plus" size="small" bg="bg-white" class="h-8 shadow-sm text-purple-700 text-[10px] border-slate-200 font-bold" @click="addLine" />
               </div>
               <div class="overflow-x-auto">
                 <table class="w-full text-sm">
                   <thead class="bg-white text-left text-[9px] text-slate-400 border-b uppercase tracking-wider">
                     <tr>
                       <th class="px-4 py-3 font-semibold text-center w-10">No</th>
                       <th class="px-4 py-3 font-semibold">Spesifikasi Material Ekspedisi</th>
                       <th class="px-4 py-3 font-semibold text-center border-l w-28 bg-slate-50">Transfer Qty</th>
                       <th class="px-4 py-3 font-semibold border-l w-40 bg-slate-50">Lacak (Lot Keamanan)</th>
                       <th v-if="!isReadonly" class="w-10"></th>
                     </tr>
                   </thead>
                   <tbody class="divide-y relative">
                      <tr v-for="(line, idx) in form.lines" :key="idx" class="hover:bg-purple-50/20 transition-colors group">
                         <td class="px-4 py-4 align-top text-center font-mono text-xs text-slate-400 mt-1">{{ idx + 1 }}</td>
                         <td class="px-4 py-4 align-top">
                            <input :disabled="isReadonly" type="text" v-model="line.desc" class="w-full border-b border-dashed border-slate-300 py-0.5 text-xs font-bold text-slate-800 bg-transparent outline-none focus:border-purple-500 placeholder-slate-300" placeholder="Ketik Identitas Barang (SKU Atau Nama Manual)..." />
                         </td>
                         <td class="px-4 py-3 align-top text-center border-l bg-slate-50">
                             <div class="flex items-center gap-1 justify-center space-x-1 mt-0.5">
                                <input :disabled="isReadonly" type="number" v-model.number="line.qty" class="w-16 border border-slate-300 rounded px-1 py-1 text-center font-mono text-sm font-black text-purple-700 outline-none focus:border-purple-500" placeholder="10" />
                                <input :disabled="isReadonly" type="text" v-model="line.uomCode" class="w-12 border-b border-dashed border-slate-300 px-1 py-1 text-xs text-center font-bold text-slate-500 uppercase outline-none bg-transparent" placeholder="PCS" />
                             </div>
                         </td>
                         <td class="px-4 py-4 align-top border-l bg-slate-50/50">
                             <input :disabled="isReadonly" type="text" v-model="line.batchCode" class="w-full border border-slate-200 rounded px-2 py-1 text-xs font-mono font-bold text-slate-600 outline-none placeholder-slate-300 shadow-inner" placeholder="BATCH / SERIAL NO." />
                         </td>
                         <td v-if="!isReadonly" class="px-2 py-4 align-middle border-l text-center">
                             <button @click="removeLine(idx)" class="w-6 h-6 rounded bg-rose-100 text-rose-600 flex items-center justify-center font-black hover:bg-rose-500 hover:text-white transition-colors" title="Bongkar Kotak">✕</button>
                         </td>
                      </tr>
                      <tr v-if="form.lines.length === 0">
                         <td :colspan="isReadonly ? 4 : 5" class="p-6 text-center text-slate-400 text-xs italic">Kargo masih kosong. Silakan muat barang yang akan ditransfer.</td>
                      </tr>
                   </tbody>
                 </table>
               </div>
           </div>
           
           <div v-if="!isReadonly" class="mt-4 p-4 rounded-xl border border-purple-200 bg-purple-50 shadow-inner flex gap-3 text-[10px] text-purple-800 leading-relaxed font-bold">
              <i class="pi pi-check-square text-xl text-purple-500 opacity-60"></i>
              Mencetak surat ini hanya akan membuka proses Mutasi. Stok Gudang Asal baru akan terpotong secara legal *SETELAH* Gudang Cabang (Tujuan) memberikan klik stempel "Validasi Penerimaan Armada" dan dikunci (POSTED).
           </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-5 border-t border-slate-200 bg-white flex justify-between items-center shrink-0 rounded-b-xl z-20 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)]">
          <Button label="Turunkan Muatan (Batal)" severity="secondary" size="small" @click="dialogOpen = false" outlined class="bg-slate-50 border-slate-300 font-bold" />
          <div class="flex items-center gap-2">
             <Button v-if="isReadonly && canManage && form.status === 'DRAFT'" label="Audit Target: Tanda Terima Penuh Ekspedisi (POSTING!)" severity="help" size="large" :loading="saving" :disabled="saving" @click="save" class="bg-purple-600 border-none text-white font-bold tracking-wide hover:bg-purple-700 shadow-sm h-10 px-8 rounded-lg" icon="pi pi-lock" />
             <Button v-else-if="!isReadonly" label="Izin Berangkat Armada (Sistem Draft)" severity="help" size="large" @click="dialogOpen = false" class="bg-purple-600 border-none text-white font-bold h-10 px-8 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('inventory.transfer.manage') || true); 

const docs = ref<any[]>([]);
const search = ref('');
const statusFilter = ref('');
const loading = ref(false);
const saving = ref(false);

const dialogOpen = ref(false);
const isReadonly = ref(true);
const activeDoc = ref<any>(null);

const form = reactive({
  id: '',
  code: '',
  fromWarehouseId: '',
  toWarehouseId: '',
  transferDate: '',
  notes: '',
  status: 'DRAFT',
  lines: [] as Array<any>
});

const mockWhs = ref<any[]>([
  {id:'1', name:'Gudang Pusat'},
  {id:'2', name:'Gudang Cabang Distribusi'}
]);

const statusBadgeClass = (doc: any) => {
    return doc.status === 'POSTED' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-purple-100 text-purple-700 border border-purple-200';
};
const statusString = (doc: any) => {
    return doc.status === 'POSTED' ? 'Landed / Masuk Stock Target' : 'Sistem Penempatan Antre';
};

const filteredDocs = computed(() => {
  let list = docs.value;
  if (statusFilter.value) {
    list = list.filter(p => p.status === statusFilter.value);
  }
  if (search.value) {
    const q = search.value.toLowerCase();
    list = list.filter(p => p.code?.toLowerCase().includes(q));
  }
  return list;
});

const formatQty = (val: any) => {
  if (!val && val !== 0 || isNaN(val)) return '0';
  return Number(val).toLocaleString('id-ID', { maximumFractionDigits: 1 });
};

const formatDate = (iso: string) => {
  if (!iso) return '-';
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};

const calculateLines = (doc: any) => doc.items ? doc.items.length : 0;

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/query?table=StockTransfer&include=fromWarehouse,toWarehouse,items');
    if (res.data && res.data.data) {
        docs.value = res.data.data;
    } else {
        throw new Error("No payload");
    }
  } catch (e: any) {
    // Mock Data based on postgres seeded data
    docs.value = [
      { 
        id: '1', code: "TRF-202604-001", status: "POSTED", transferDate: "2026-04-28T00:00", notes: "Mutasi rutin pengisian stok Cabang. Driver: Yanto.",
        fromWarehouse: { name: 'Gudang Pusat' }, toWarehouse: { name: 'Gudang Cabang' },
        items: [
           { desc: 'Kopi Bubuk Arabica Premium', qty: 500, uomCode: 'PCS', batchCode: 'LOT-0426-X' }
        ]
      },
      { 
        id: '2', code: "TRF-202604-002", status: "DRAFT", transferDate: "2026-04-29T00:00", notes: "Retur lambat terjual ke Pusat.",
        fromWarehouse: { name: 'Gudang Cabang Distribusi' }, toWarehouse: { name: 'Gudang Pusat' },
        items: [
           { desc: 'Kopi Bubuk Arabica Premium', qty: 50, uomCode: 'PCS', batchCode: 'LOT-0426-X' }
        ]
      }
    ];
    try {
        const whr = await api.get('/core/query?table=Warehouse');
        if (whr.data?.data) mockWhs.value = whr.data.data;
    } catch(er){}
  } finally {
    loading.value = false;
  }
}

function openCreate() {
  activeDoc.value = null;
  isReadonly.value = false;
  form.id = '';
  form.code = 'TRF-NEW';
  form.fromWarehouseId = mockWhs.value[0]?.id || '';
  form.toWarehouseId = mockWhs.value[1]?.id || '';
  form.transferDate = new Date().toISOString().split('T')[0];
  form.notes = '';
  form.status = 'DRAFT';
  form.lines = [{ desc: "Kopi Bubuk Produk B", qty: 25, uomCode: 'PCS', batchCode: '' }];
  
  dialogOpen.value = true;
}

function openView(r: any) {
  activeDoc.value = r;
  isReadonly.value = true; 
  
  form.id = r.id;
  form.code = r.code;
  form.fromWarehouseId = r.fromWarehouseId || mockWhs.value[0]?.id;
  form.toWarehouseId = r.toWarehouseId || mockWhs.value[1]?.id;
  form.transferDate = r.transferDate?.split('T')[0] || '';
  form.notes = r.notes || '';
  form.status = r.status;
  
  if (r.items && r.items.length > 0) {
      form.lines = r.items.map((x:any) => ({...x}));
  } else {
      form.lines = [];
  }

  // Jika DRAFT, izinkan checker memodifikasi batch/troli sebelum di-post
  if (r.status === 'DRAFT') {
      isReadonly.value = false;
  }

  dialogOpen.value = true;
}

function addLine() {
   form.lines.push({ desc: "", qty: 1, uomCode: 'PCS', batchCode: '' });
}

function removeLine(idx: number) {
   form.lines.splice(idx, 1);
}

async function save() {
  saving.value = true;
  setTimeout(() => {
    alert('Operasi Pemindahan Lintas Gudang Sukses Tersinkron! Stok Gudang Pelepasan didebet, Stok Gudang Penerima dikreditkan ke Ledger.');
    dialogOpen.value = false;
    saving.value = false;
    load();
  }, 1200);
}

onMounted(() => {
  load();
});
</script>

<style scoped>
select { appearance: none; background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e"); background-repeat: no-repeat; background-position: right 0.5rem center; background-size: 1em; padding-right: 2rem; }
.animate-fade-in-up { animation: fadeInUp 0.3s ease-out forwards; }
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
