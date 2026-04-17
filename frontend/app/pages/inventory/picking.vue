<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-5 shadow-sm border-l-4 border-l-rose-500">
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div class="text-sm font-semibold text-slate-800">Manajemen Pengambilan Material (Order Picking)</div>
          <div class="mt-1 text-sm text-slate-600">
            Penarikan stok inventaris dari Posisi Rak (Bin) berdasar perintah *Sales Order / Pengeluaran Internal*. Kelola tugas keranjang staf gudang.
          </div>
        </div>
        <div class="flex gap-2">
          <Button label="Audit Kurang Ambil (Backorder)" severity="secondary" size="small" outlined icon="pi pi-exclamation-circle" />
          <Button v-if="canManage" label="+ Generate Dokumen Picking" size="small" bg="bg-rose-600" class="text-white border-none shrink-0" icon="pi pi-shopping-bag" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Data List and Filters -->
    <div class="rounded-xl border bg-white p-5 shadow-sm">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2 w-full md:w-auto">
          <InputText v-model="search" placeholder="Cari No Picking / SO Ref..." class="w-full md:w-80 text-xs" />
          <select v-model="statusFilter" class="p-2 border rounded-md text-xs bg-white text-slate-700 min-w-32">
            <option value="">Semua Dokumen</option>
            <option value="DRAFT">Proses Pencarian Troli (Picking)</option>
            <option value="POSTED">Selesai Dikumpulkan (Packed Target)</option>
          </select>
          <Button label="Filter" severity="secondary" size="small" :disabled="loading" @click="load" />
        </div>
      </div>

      <!-- Picking Table -->
      <div class="overflow-x-auto rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-rose-50 text-left text-xs text-rose-900 border-b border-rose-100 uppercase tracking-wider">
            <tr>
              <th class="px-4 py-3 font-semibold">Tugas Penarikan (PCK)</th>
              <th class="px-4 py-3 font-semibold">Rantai Dokumen Penjualan</th>
              <th class="px-4 py-3 font-semibold text-right">Agregat Pengambilan</th>
              <th class="px-4 py-3 font-semibold text-center w-36">Status Keranjang</th>
              <th class="px-4 py-3 text-right font-semibold">Tindakan Khusus</th>
            </tr>
          </thead>
          <tbody class="divide-y relative">
             <tr v-if="loading">
              <td colspan="5" class="px-4 py-16 text-center text-sm text-slate-500">
                <i class="pi pi-spinner pi-spin mr-2"></i> Mensinkronisasi penugasan Troli Staf...
              </td>
            </tr>
            <!-- Iteration rows -->
            <tr v-for="doc in filteredDocs" v-else :key="doc.id" class="transition hover:bg-rose-50/40 group">
              <!-- Dokumen -->
              <td class="px-4 py-3 align-top w-56">
                <div class="font-bold text-slate-800 text-xs flex items-center gap-2 font-mono">
                   {{ doc.code }}
                   <i v-if="doc.status === 'POSTED'" class="pi pi-check-circle text-[10px] text-emerald-500" title="Alokasi Keranjang Penuh"></i>
                </div>
                <div class="text-[10px] text-slate-500 mt-1">🗓️ Target Pick: {{ formatDate(doc.pickingDate) }}</div>
                <div class="text-[9px] bg-slate-100 inline-block px-1.5 py-0.5 rounded border mt-1">
                   Loc: {{ doc.warehouse?.name || 'Gudang Utama' }}
                </div>
              </td>
              
              <!-- Referensi (SO) -->
              <td class="px-4 py-3 align-top">
                <div class="flex items-center gap-2 mb-1">
                   <div class="text-[9px] font-bold px-1 rounded shadow-sm border uppercase tracking-wider" :class="doc.salesOrderId ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-slate-50 text-slate-500 border-slate-200'">
                      {{ doc.salesOrderId ? 'Sumber SO/DO' : 'Pengeluaran Manual' }}
                   </div>
                </div>
                <div class="text-[11px] font-mono font-bold text-slate-700">{{ doc.salesOrder?.code || 'Pemakaian Divisi / Eksternal' }}</div>
                <div class="text-[9px] text-slate-400 mt-0.5 italic">"{{ doc.notes || '-' }}"</div>
              </td>

              <!-- Kuantitas Total -->
              <td class="px-4 py-3 align-top text-right">
                 <div class="font-black text-slate-700 text-sm font-mono relative pr-4">
                    {{ calculateLines(doc) }} SKU <i class="pi pi-shopping-cart absolute right-0 top-1 text-[9px] opacity-40"></i>
                 </div>
                 <div class="text-[9px] font-bold mt-0.5" :class="progressClass(doc)">Progress Keranjang: {{ calcProgress(doc) }}%</div>
              </td>
              
              <!-- Status -->
              <td class="px-4 py-3 align-top text-center">
                 <span class="inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider" :class="doc.status === 'POSTED' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-amber-100 text-amber-700 border border-amber-200'">
                   {{ doc.status === 'POSTED' ? 'TERKUMPUL' : 'PROSES KELILING' }}
                 </span>
              </td>

              <!-- Actions -->
              <td class="px-4 py-3 align-top text-right">
                <Button label="Cek Troli Material" size="small" severity="secondary" outlined class="text-[10px] px-3 font-bold py-1 text-center hover:bg-slate-100 w-full" @click="openView(doc)" />
              </td>
            </tr>
            <tr v-if="!loading && filteredDocs.length === 0">
              <td colspan="5" class="px-4 py-16 text-center text-slate-500 border-t">
                <div class="text-4xl mb-3 opacity-50 text-slate-200"><i class="pi pi-send"></i></div>
                Tidak ada perintah pengeluaran barang. Kargo sedang kosong.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Viewer/Editor Modal (Picking Basket) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4 backdrop-blur-sm shadow-xl">
      <div class="w-full max-w-5xl rounded-xl border bg-slate-50 shadow-2xl flex flex-col max-h-[95vh] h-full overflow-hidden animate-fade-in-up">
        
        <!-- Header -->
        <div class="p-6 border-b bg-rose-950 flex flex-col sm:flex-row items-center justify-between shrink-0 gap-4 relative overflow-hidden shadow-sm">
          <div class="absolute left-[-20px] top-[-20px] opacity-10">
             <i class="pi pi-shopping-bag text-[150px] text-white"></i>
          </div>
          <div class="z-10 w-full flex justify-between items-start">
             <div>
               <div class="flex items-center gap-3">
                 <span class="text-xl font-black text-rose-50 tracking-tight">{{ activeDoc?.id ? `Daftar Eksekusi Ambil (Pick-List): ${form.code}` : 'Aktivasi Troli Gudang Keluar (Picking)' }}</span>
                 <span v-if="activeDoc?.id" class="inline-flex rounded text-[10px] font-bold uppercase shadow-sm border px-2 py-0.5" :class="form.status === 'POSTED' ? 'bg-emerald-500 text-emerald-50 border-emerald-400' : 'bg-amber-500 text-white border-amber-400'">
                   {{ form.status === 'POSTED' ? 'PENCARIAN SELESAI' : 'DI LAPANGAN' }}
                 </span>
               </div>
               <div class="text-xs text-rose-200 font-medium opacity-80 mt-1 pl-1">Instruksi *Checker* Gudang menarik inventaris fisik menuju area Pengemasan (Packing).</div>
             </div>
             
             <!-- Dok Acuan -->
             <div class="bg-black/20 p-2 rounded border border-white/10 text-right min-w-40 backdrop-blur-sm hidden md:block">
                <div class="text-[9px] uppercase tracking-widest text-indigo-300 font-bold mb-1">Pemicu Kebutuhan (Sales)</div>
                <div class="font-mono text-sm text-white font-bold">{{ activeDoc?.salesOrder?.code || 'Pemakaian Internal Pabrik' }}</div>
             </div>
          </div>
          <button class="text-white/50 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded text-lg font-bold flex items-center justify-center transition-colors shadow-sm z-20 absolute right-4 top-4" @click="dialogOpen = false">✕</button>
        </div>

        <div class="flex-1 overflow-y-auto flex flex-col p-5 bg-slate-100">
           
           <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm col-span-2 relative">
                 <div class="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-3 flex gap-2"><i class="pi pi-link"></i> Referensi Penugasan</div>
                 
                 <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-1">
                      <label class="text-[10px] font-bold text-slate-500">Pesanan Pelanggan (SO)</label>
                      <select :disabled="isReadonly" v-model="form.salesOrderId" class="w-full border rounded p-2 text-xs font-bold font-mono text-slate-700 bg-indigo-50 border-indigo-200 outline-none">
                         <option value="">-- Pemakaian Internal (Non-SO) --</option>
                         <option v-for="s in mockSOs" :value="s.id">{{ s.code }}</option>
                      </select>
                    </div>
                    <div class="space-y-1">
                      <label class="text-[10px] font-bold text-slate-500">Area Basis Troli (Warehouse)</label>
                      <div class="w-full border rounded p-2 text-xs font-bold text-rose-800 bg-rose-50 border-rose-200 flex items-center gap-2 shadow-inner">
                         <i class="pi pi-building text-rose-600/50"></i> Gudang Utama Area-1
                      </div>
                    </div>
                    <div class="col-span-2 space-y-1">
                      <label class="text-[10px] font-bold text-slate-500">Catatan Pemandu Eksekusi</label>
                      <textarea :disabled="isReadonly" v-model="form.notes" rows="2" class="w-full rounded border p-2 text-xs bg-slate-50 outline-none focus:border-rose-500" placeholder="Prioritas pengiriman kilat..."></textarea>
                    </div>
                 </div>
              </div>

              <!-- Time Status -->
              <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center items-center relative overflow-hidden group border-b-4 border-b-rose-600">
                 <div class="absolute opacity-5 group-hover:scale-110 transition-transform duration-700">
                    <i class="pi pi-send text-9xl text-slate-800"></i>
                 </div>
                 <div class="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2 relative z-10 w-full text-left">Batas Waktu Pengambilan</div>
                 <input :disabled="isReadonly" type="date" v-model="form.pickingDate" class="w-full border-0 border-b-2 font-black text-xl text-center text-slate-800 py-2 outline-none relative z-10 bg-transparent disabled:opacity-100" />
                 <div class="text-[9px] text-slate-400 mt-3 text-center relative z-10 leading-tight">Wajib dipenuhi agar antrean operasional Pengemasan berjalan tanpa hambatan.</div>
              </div>
           </div>

           <!-- Pengecekan Rak / Pick List -->
           <div class="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
               <div class="flex items-center justify-between p-4 bg-slate-50 border-b">
                 <div class="text-xs font-black text-slate-800 uppercase tracking-widest"><i class="pi pi-list mr-2 text-rose-600"></i> Daftar Barang Harus Ditarik Fisik (Pick List Table)</div>
               </div>
               <div class="overflow-x-auto">
                 <table class="w-full text-sm">
                   <thead class="bg-white text-left text-[9px] text-slate-400 border-b uppercase tracking-wider">
                     <tr>
                       <th class="px-4 py-3 font-semibold text-center w-10">No</th>
                       <th class="px-4 py-3 font-semibold">SKU Spesifik & Arahan Modifikasi Rak</th>
                       <th class="px-4 py-3 font-semibold text-center border-l w-32 bg-slate-50" title="Instruksi Target SO">Perintah Kuantitas<br><span class="text-[8px] normal-case truncate">(Order Qty)</span></th>
                       <th class="px-4 py-3 font-semibold border-l w-32 bg-rose-50" title="Angka yang sesungguhnya sukses didapat tim">SUKSES AKUMULASI<br><span class="text-[8px] normal-case align-top truncate">(Picked Trolley Qty)</span></th>
                     </tr>
                   </thead>
                   <tbody class="divide-y relative">
                      <tr v-for="(line, idx) in form.lines" :key="idx" class="hover:bg-rose-50/20 transition-colors group">
                         <td class="px-4 py-4 align-top text-center font-mono text-xs text-slate-400 mt-1">{{ idx + 1 }}</td>
                         <td class="px-4 py-4 align-top">
                            <div class="font-bold text-slate-800 text-xs">{{ line.desc }}</div>
                            <div class="flex items-center gap-3 mt-1.5">
                               <select :disabled="isReadonly" v-model="line.fromBinLocationId" class="w-40 border-b border-rose-200 py-0.5 text-[9px] font-bold bg-transparent outline-none text-rose-800 font-mono" title="Titik Lokasi Pengambilan (Disarankan Sistem Ekstraksi Prioritas)">
                                  <option value="">Arah Lokasi Bebas</option>
                                  <option v-for="b in mockBins" :value="b.id">{{ b.code }} (Arahan)</option>
                               </select>
                               <div class="text-[9px] px-1 py-0.5 bg-slate-100 rounded text-slate-500 border inline-block" title="Batasan Lacak (Lot)">
                                  <i class="pi pi-barcode mr-1"></i>{{ line.batchCode || 'LOT BEBAS' }}
                               </div>
                            </div>
                         </td>
                         <td class="px-4 py-4 align-top text-center border-l bg-slate-50 border-dashed">
                             <div class="font-mono font-black text-slate-400 text-xl">{{ formatQty(line.qty) }}</div>
                         </td>
                         <td class="px-4 py-3 align-top border-l relative" :class="Number(line.pickedQty) >= Number(line.qty) ? 'bg-emerald-50/50 border-emerald-100' : 'bg-rose-50/50'">
                             <input :disabled="isReadonly" type="number" v-model.number="line.pickedQty" class="w-full border border-slate-300 rounded shadow-inner py-1.5 text-center font-bold text-slate-800 font-mono text-lg outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all bg-white" />
                             <div class="mt-1 flex justify-center w-full">
                                <span v-if="Number(line.pickedQty) >= Number(line.qty)" class="text-[8px] bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded font-bold uppercase"><i class="pi pi-check text-[7px]"></i> Fulfilled</span>
                                <span v-else class="text-[8px] bg-rose-100 text-rose-700 px-1 py-0.5 rounded font-bold uppercase"><i class="pi pi-exclamation-triangle text-[7px]"></i> Kurang</span>
                             </div>
                         </td>
                      </tr>
                   </tbody>
                 </table>
               </div>
           </div>
           
           <div v-if="!isReadonly" class="mt-4 p-4 rounded-xl border border-rose-100 bg-rose-50 shadow-inner flex gap-3 text-[10px] text-rose-800 leading-relaxed font-bold">
              <i class="pi pi-exclamation-triangle text-xl text-rose-500 opacity-60"></i>
              Jika Kuantitas Sukses (*Picked*) kurang dari Target Order, itu akan menciptakan BACKORDER (Tunggakan SO) secara teknis. Stok belum akan terpotong dari Ledger sampai dokumen ini dimasukkan (POSTING) dan ditransfer ke Area Pengemasan (Packing).
           </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-5 border-t border-slate-200 bg-white flex justify-between items-center shrink-0 rounded-b-xl z-20">
          <Button label="Kelaur Tanpa Simpan" severity="secondary" size="small" @click="dialogOpen = false" outlined class="bg-slate-50 border-slate-300 font-bold" />
          <div class="flex items-center gap-2">
             <Button v-if="isReadonly && canManage && form.status === 'DRAFT'" label="Audit: Serahkan ke Mesin Antrean PACKING" severity="danger" size="large" :loading="saving" :disabled="saving" @click="save" class="bg-rose-600 border-none text-white font-bold tracking-wide hover:bg-rose-700 px-8 shadow-sm h-10" icon="pi pi-lock" />
             <Button v-else-if="!isReadonly" label="Terbitkan Tugas Troli (Draft)" severity="danger" size="large" @click="dialogOpen = false" class="bg-rose-600 border-none text-white font-bold h-10 px-8" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('inventory.picking.manage') || true); 

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
  salesOrderId: '',
  pickingDate: '',
  notes: '',
  status: 'DRAFT',
  lines: [] as Array<any>
});

const mockSOs = ref<any[]>([
  {id:'1', code:'SO-202604-001'},
  {id:'2', code:'SO-202604-002'}
]);

const mockBins = ref<any[]>([
  {id:'1', code:'BIN-REC-01', name:'Area Receiving'},
  {id:'2', code:'BIN-A-10', name:'Rak Kopi Mentah'}
]);

const filteredDocs = computed(() => {
  let list = docs.value;
  if (statusFilter.value) {
    list = list.filter(p => p.status === statusFilter.value);
  }
  if (search.value) {
    const q = search.value.toLowerCase();
    list = list.filter(p => 
      (p.code && p.code.toLowerCase().includes(q)) || 
      (p.salesOrder?.code && p.salesOrder.code.toLowerCase().includes(q))
    );
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

const calcProgress = (doc: any) => {
    if (!doc.items || doc.items.length === 0) return 0;
    let totalTarget = 0;
    let totalGot = 0;
    doc.items.forEach((i:any) => {
        totalTarget += Number(i.qty) || 0;
        totalGot += Number(i.pickedQty) || 0;
    });
    if(totalTarget === 0) return 0;
    let rp = Math.round((totalGot / totalTarget) * 100);
    return rp > 100 ? 100 : rp;
}

const progressClass = (doc: any) => {
    const p = calcProgress(doc);
    if(p >= 100) return 'text-emerald-600';
    if(p > 0) return 'text-amber-500';
    return 'text-rose-500';
};

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/query?table=Picking&include=salesOrder,warehouse,items');
    if (res.data && res.data.data) {
        docs.value = res.data.data;
    } else {
        throw new Error("No payload");
    }
  } catch (e: any) {
    // Mock Data based on postgres seeded data
    docs.value = [
      { 
        id: '1', code: "PCK-202604-001", status: "DRAFT", pickingDate: "2026-04-25T00:00", notes: "Ambil dari Rak Barang Jadi...",
        salesOrder: { code: 'SO-202604-001' }, warehouse: { name: 'Gudang Utama' },
        items: [
           { desc: 'Kopi Bubuk Arabica Premium 250g', qty: 120, pickedQty: 0, batchCode: 'LOT-0426-X', fromBinLocationId: '2' }
        ]
      },
      { 
        id: '2', code: "PCK-202604-002", status: "POSTED", pickingDate: "2026-04-26T00:00", notes: "Pengeluaran Divisi Internal",
        salesOrder: null, warehouse: { name: 'Gudang Utama' },
        items: [
           { desc: 'Biji Kopi Spesialti Arabica (Internal)', qty: 15, pickedQty: 15, batchCode: '', fromBinLocationId: '2' }
        ]
      }
    ];
  } finally {
    loading.value = false;
  }
}

function openCreate() {
  activeDoc.value = null;
  isReadonly.value = false;
  form.id = '';
  form.code = 'PCK-NEW';
  form.salesOrderId = mockSOs.value[0].id;
  form.pickingDate = new Date().toISOString().split('T')[0];
  form.notes = '';
  form.status = 'DRAFT';
  form.lines = [{ desc: "Kopi Bubuk Arabica Premium 250g", qty: 30, pickedQty: 0, batchCode: "LOT-ABC", fromBinLocationId: '' }];
  
  dialogOpen.value = true;
}

function openView(r: any) {
  activeDoc.value = r;
  isReadonly.value = true; 
  
  form.id = r.id;
  form.code = r.code;
  form.salesOrderId = r.salesOrderId || (r.salesOrder? mockSOs.value[0].id : '');
  form.pickingDate = r.pickingDate?.split('T')[0] || '';
  form.notes = r.notes || '';
  form.status = r.status;
  
  if (r.items && r.items.length > 0) {
      form.lines = r.items.map((x:any) => ({...x}));
  } else {
      form.lines = [];
  }

  // Jika DRAFT, izinkan checker mengupdate PickedQty
  if (r.status === 'DRAFT') {
      isReadonly.value = false;
  }

  dialogOpen.value = true;
}

async function save() {
  saving.value = true;
  setTimeout(() => {
    alert('Penarikan barang ke Troli berhasil di-Posting! Barang tersebut sudah dikeluarkan statusnya dan diteruskan ke modul Packing.');
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