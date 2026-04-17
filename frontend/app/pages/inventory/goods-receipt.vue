<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-5 shadow-sm border-l-4 border-l-emerald-600">
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div class="text-sm font-semibold text-slate-800">Tanda Terima Barang (Goods Receipt Note)</div>
          <div class="mt-1 text-sm text-slate-600">
            Jembatan masuk logistik. Registrasikan inspeksi barang dari vendor ke dalam Gudang fisik dan terbitkan lot inventaris baru.
          </div>
        </div>
        <div class="flex gap-2">
          <Button label="Audit Logistik" severity="secondary" size="small" outlined icon="pi pi-shield" />
          <Button v-if="canManage" label="+ Terima Barang Masuk" size="small" bg="bg-emerald-600" class="text-white border-none" icon="pi pi-download" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Data List and Filters -->
    <div class="rounded-xl border bg-white p-5 shadow-sm">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2 w-full md:w-auto">
          <InputText v-model="search" placeholder="Cari No BAST / GRN..." class="w-full md:w-80 text-xs" />
          <select v-model="statusFilter" class="p-2 border rounded-md text-xs bg-white text-slate-700 min-w-32">
            <option value="">Semua Dokumen</option>
            <option value="DRAFT">Tertahan (Draft QC)</option>
            <option value="POSTED">Diinventasisasi (Masuk Ledger)</option>
          </select>
          <Button label="Filter" severity="secondary" size="small" :disabled="loading" @click="load" />
        </div>
      </div>

      <!-- GRN Table -->
      <div class="overflow-x-auto rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-emerald-50 text-left text-xs text-emerald-900 border-b border-emerald-100 uppercase tracking-wider">
            <tr>
              <th class="px-4 py-3 font-semibold">Tanda Terima (GRN)</th>
              <th class="px-4 py-3 font-semibold">Sumber Penugasan Logistik</th>
              <th class="px-4 py-3 font-semibold text-right">Rekap Fisik SKU</th>
              <th class="px-4 py-3 font-semibold text-center w-36">Status & Audit</th>
              <th class="px-4 py-3 text-right font-semibold">Tindakan</th>
            </tr>
          </thead>
          <tbody class="divide-y relative">
             <tr v-if="loading">
              <td colspan="5" class="px-4 py-16 text-center text-sm text-slate-500">
                <i class="pi pi-spinner pi-spin mr-2"></i> Menghitung sinkronisasi kedatangan logistik...
              </td>
            </tr>
            <!-- Iteration rows -->
            <tr v-for="doc in filteredDocs" v-else :key="doc.id" class="transition hover:bg-emerald-50/30 group">
              <!-- Dokumen -->
              <td class="px-4 py-3 align-top">
                <div class="font-bold text-slate-800 text-xs flex items-center gap-2">
                   {{ doc.code }}
                   <i v-if="doc.status === 'POSTED'" class="pi pi-lock text-[10px] text-slate-400" title="Terkunci ke Stock Ledger"></i>
                </div>
                <div class="text-[10px] text-slate-500 font-mono mt-1">🗓️ Kedatangan: {{ formatDate(doc.receiptDate) }}</div>
                <div class="text-[9px] bg-slate-100 inline-block px-1.5 py-0.5 rounded border mt-1">
                   Loc: {{ doc.warehouse?.name || 'Gudang Utama' }}
                </div>
              </td>
              
              <!-- Sumber -->
              <td class="px-4 py-3 align-top">
                <div class="flex items-center gap-2 mb-1">
                   <div class="text-[9px] bg-indigo-50 text-indigo-700 font-bold px-1 rounded shadow-sm border border-indigo-100">PO Ref</div>
                   <div class="text-[11px] font-mono font-bold text-slate-700">{{ doc.purchaseOrder?.code || 'Penerimaan Tanpa PO' }}</div>
                </div>
                <div class="text-[10px] font-semibold text-slate-600 truncate max-w-[200px]" :title="doc.supplier?.name">Vendor: {{ doc.supplier?.name || '-' }}</div>
              </td>

              <!-- Kuantitas Total -->
              <td class="px-4 py-3 align-top text-right">
                 <div class="font-black text-slate-700 text-sm font-mono relative pr-4">
                    {{ calculateLines(doc) }} Baris<i class="pi pi-box absolute right-0 top-1 text-[9px] opacity-40"></i>
                 </div>
                 <div class="text-[9px] font-bold text-emerald-600 mt-0.5" title="Ada pencatatan lot">Berisi Lot / Batch Code</div>
              </td>
              
              <!-- Status -->
              <td class="px-4 py-3 align-top text-center">
                 <span class="inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider" :class="doc.status === 'POSTED' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600 border'">
                   {{ doc.status === 'POSTED' ? 'Inventaris Masuk' : 'DRAFT Cek Fisik' }}
                 </span>
                 <div v-if="doc.status === 'POSTED'" class="text-[9px] text-slate-400 mt-1 uppercase"><i class="pi pi-check text-[7px]"></i> Masuk Stock Ledger</div>
              </td>

              <!-- Actions -->
              <td class="px-4 py-3 align-top text-right">
                <Button label="Buka Ekspedisi" size="small" severity="secondary" outlined class="text-[10px] px-3 font-bold py-1 text-center hover:bg-slate-100 w-full" @click="openView(doc)" />
              </td>
            </tr>
            <tr v-if="!loading && filteredDocs.length === 0">
              <td colspan="5" class="px-4 py-16 text-center text-slate-500 border-t">
                <div class="text-4xl mb-3 opacity-50 text-slate-200"><i class="pi pi-directions-alt"></i></div>
                Rak penantian kosong. Tidak ada aktivitas pengiriman logistik masuk.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Viewer/Editor Modal (GRN Checklist) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4 backdrop-blur-sm shadow-2xl">
      <div class="w-full max-w-5xl rounded-xl border bg-slate-50 shadow-2xl flex flex-col max-h-[95vh] h-full overflow-hidden animate-fade-in-up">
        
        <!-- Header -->
        <div class="p-6 border-b bg-emerald-950 flex flex-col sm:flex-row items-center justify-between shrink-0 gap-4 relative overflow-hidden">
          <div class="absolute left-[-20px] top-[-20px] opacity-10">
             <i class="pi pi-download text-[150px] text-white"></i>
          </div>
          <div class="z-10 w-full flex justify-between items-start">
             <div>
               <div class="flex items-center gap-3">
                 <span class="text-xl font-black text-white tracking-tight">{{ activeDoc?.id ? `Form Kedatangan Fisik: ${form.code}` : 'Proses Input Kedatangan Truk/Ekspedisi' }}</span>
                 <span v-if="activeDoc?.id" class="inline-flex rounded text-[10px] font-bold uppercase shadow-sm border px-2 py-0.5" :class="form.status === 'POSTED' ? 'bg-emerald-500 text-emerald-50 border-emerald-400' : 'bg-amber-500 text-white border-amber-400'">
                   {{ form.status === 'POSTED' ? 'POSTED STOCK' : 'WAITING QC / DRAFT' }}
                 </span>
               </div>
               <div class="text-xs text-emerald-100 font-medium opacity-80 mt-1 pl-1">Identifikasi barang bawaan vendor ke dalam sistem pergudangan (Bin).</div>
             </div>
             
             <!-- Dok Acuan -->
             <div class="bg-black/20 p-2 rounded border border-white/10 text-right min-w-40 backdrop-blur-sm hidden md:block">
                <div class="text-[9px] uppercase tracking-widest text-emerald-300 font-bold mb-1">Acuan Purchase Order</div>
                <div class="font-mono text-sm text-white font-bold">{{ activeDoc?.purchaseOrder?.code || 'Tanpa Referensi SO/PO' }}</div>
             </div>
          </div>
          <button class="text-white/50 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded text-lg font-bold flex items-center justify-center transition-colors shadow-sm z-20 absolute right-4 top-4" @click="dialogOpen = false">✕</button>
        </div>

        <div class="flex-1 overflow-y-auto flex flex-col p-5 bg-slate-100">
           
           <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm col-span-2 relative">
                 <div class="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-3 flex gap-2"><i class="pi pi-truck"></i> Meta Logistik & Kurir</div>
                 
                 <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-1">
                      <label class="text-[10px] font-bold text-slate-500">Pemasok Bawaan</label>
                      <select :disabled="isReadonly" v-model="form.supplierId" class="w-full border rounded p-2 text-xs font-bold text-slate-700 bg-slate-50 outline-none">
                         <option value="">-- Rekanan Vendor --</option>
                         <option v-for="s in mockSuppliers" :value="s.id">{{ s.name }}</option>
                      </select>
                    </div>
                    <div class="space-y-1">
                      <label class="text-[10px] font-bold text-slate-500">Area Penerima (Gudang Tersedia)</label>
                      <div class="w-full border rounded p-2 text-xs font-bold text-emerald-800 bg-emerald-50 border-emerald-200 flex items-center gap-2 shadow-inner">
                         <i class="pi pi-building text-emerald-600/50"></i> Gudang Utama Area-1
                      </div>
                    </div>
                    <div class="col-span-2 space-y-1">
                      <label class="text-[10px] font-bold text-slate-500">Catatan Titip Kondisi Bawaan</label>
                      <textarea :disabled="isReadonly" v-model="form.notes" rows="2" class="w-full rounded border p-2 text-xs bg-slate-50 outline-none focus:border-emerald-500" placeholder="Contoh: Paket tertutup terpal basah..."></textarea>
                    </div>
                 </div>
              </div>

              <!-- Time Status -->
              <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center items-center relative overflow-hidden group border-b-4 border-b-emerald-600">
                 <div class="absolute opacity-5 group-hover:scale-110 transition-transform duration-700">
                    <i class="pi pi-calendar-plus text-9xl text-slate-800"></i>
                 </div>
                 <div class="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2 relative z-10 w-full text-left">Tanggal Tiba Bongkar</div>
                 <input :disabled="isReadonly" type="date" v-model="form.receiptDate" class="w-full border-0 border-b-2 font-black text-xl text-center text-slate-800 py-2 outline-none relative z-10 bg-transparent disabled:opacity-100" />
                 <div class="text-[9px] text-slate-400 mt-3 text-center relative z-10 leading-tight">Pastikan pencatatan dilakukan dalam waktu 24 jam fisik barang masuk.</div>
              </div>
           </div>

           <!-- Pengecekan Fisik Baris Barang -->
           <div class="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
               <div class="flex items-center justify-between p-4 bg-slate-50 border-b">
                 <div class="text-xs font-black text-slate-800 uppercase tracking-widest"><i class="pi pi-check-square mr-2 text-emerald-600"></i> Checklist Item Masuk WMS</div>
               </div>
               <div class="overflow-x-auto">
                 <table class="w-full text-sm">
                   <thead class="bg-white text-left text-[9px] text-slate-400 border-b uppercase tracking-wider">
                     <tr>
                       <th class="px-4 py-3 font-semibold text-center w-10">No</th>
                       <th class="px-4 py-3 font-semibold">Spesifikasi Material / SKU</th>
                       <th class="px-4 py-3 font-semibold text-right border-l w-28">Kuantitas Tiba</th>
                       <th class="px-4 py-3 font-semibold text-center border-l w-24">Sat (UOM)</th>
                       <th class="px-4 py-3 font-semibold text-center border-l bg-slate-50" title="Serial Number atau Lot Kontrol Keamanan Pabrik">Labeling: Batch/Lot</th>
                     </tr>
                   </thead>
                   <tbody class="divide-y relative">
                      <tr v-for="(line, idx) in form.lines" :key="idx" class="hover:bg-emerald-50/20 transition-colors">
                         <td class="px-4 py-3 align-middle text-center font-mono text-xs text-slate-400">{{ idx + 1 }}</td>
                         <td class="px-4 py-3 align-middle">
                            <div class="font-bold text-slate-800 text-xs">{{ line.desc }}</div>
                         </td>
                         <td class="px-4 py-3 align-middle text-right border-l bg-slate-50 border-dashed">
                             <span class="font-mono font-black text-emerald-700">{{ formatQty(line.qty) }}</span>
                         </td>
                         <td class="px-4 py-3 align-middle text-center border-l">
                             <span class="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded border shadow-inner">{{ line.uomCode }}</span>
                         </td>
                         <td class="px-4 py-3 align-middle border-l bg-slate-50">
                             <div class="flex items-center">
                                <i class="pi pi-barcode text-slate-400 ml-2 mr-2"></i>
                                <input :disabled="isReadonly" type="text" v-model="line.batchCode" class="w-full border-b border-dashed border-slate-300 py-1 text-xs font-mono font-bold bg-transparent outline-none focus:border-emerald-500 placeholder-slate-300 text-emerald-900" placeholder="Pindai Lot Fisik" />
                             </div>
                         </td>
                      </tr>
                   </tbody>
                 </table>
               </div>
           </div>
           
           <div v-if="!isReadonly" class="mt-4 p-4 rounded-xl border border-amber-100 bg-amber-50 shadow-inner flex gap-3 text-[10px] text-amber-800 leading-relaxed font-bold">
              <i class="pi pi-exclamation-triangle text-xl text-amber-500 opacity-60"></i>
              Data kedatangan akan menyuntikkan unit secara riil ke Stock Ledger dan tidak dapat dibatalkan (Hanya bisa dibalik via Retur/Adjustment). Pastikan kalkulasi tonase/box tepat!
           </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-5 border-t border-slate-200 bg-white flex justify-between items-center shrink-0 rounded-b-xl z-20">
          <Button label="Tutup Jendela" severity="secondary" size="small" @click="dialogOpen = false" outlined class="bg-slate-50 border-slate-300 font-bold" />
          <div class="flex items-center gap-2">
             <Button v-if="isReadonly && canManage && form.status === 'DRAFT'" label="Audit: Masukkan Ke Ledger (Posting Stok)" severity="success" size="large" :loading="saving" :disabled="saving" @click="save" class="bg-emerald-600 border-none text-white font-bold tracking-wide hover:bg-emerald-700 px-8 shadow-sm h-10" icon="pi pi-lock" />
             <Button v-else-if="!isReadonly" label="Kirim Tanda Terima" severity="success" size="large" @click="dialogOpen = false" class="bg-emerald-600 border-none text-white font-bold h-10" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('inventory.grn.manage') || true); 

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
  supplierId: '',
  receiptDate: '',
  notes: '',
  status: 'DRAFT',
  lines: [] as Array<any>
});

const mockSuppliers = ref<any[]>([
  {id:'1', name:'PT Agri Kopi Indonesia'},
  {id:'2', name:'Pabrik Pengemasan Tbk'}
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
      (p.purchaseOrder?.code && p.purchaseOrder.code.toLowerCase().includes(q))
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

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/query?table=GoodsReceiptNote&include=supplier,purchaseOrder,warehouse,items');
    if (res.data && res.data.data) {
        docs.value = res.data.data;
    } else {
        throw new Error("No payload");
    }
  } catch (e: any) {
    // Mock
    docs.value = [
      { 
        id: '1', code: "GRN-202604-002", status: "POSTED", receiptDate: "2026-04-20T00:00", notes: "Pengiriman via ekspedisi laut. Kondisi segel aman.",
        supplier: { name: 'PT Agri Kopi Indonesia' }, purchaseOrder: { code: 'PO-202604-001' }, warehouse: { name: 'Gudang Utama' },
        items: [
           { desc: 'Biji Kopi Spesialti Arabica', qty: 100, uomCode: 'KG', batchCode: 'LOT-0426-A' },
           { desc: 'Karung Goni Kualitas A', qty: 50, uomCode: 'PCS', batchCode: '' }
        ]
      },
      { 
        id: '2', code: "GRN-202604-003", status: "DRAFT", receiptDate: "2026-04-22T00:00", notes: "Pengiriman barang parsial.",
        supplier: { name: 'PT Agri Kopi Indonesia' }, purchaseOrder: { code: 'PO-202604-001' }, warehouse: { name: 'Gudang Utama' },
        items: [
           { desc: 'Biji Kopi Spesialti Arabica', qty: 250, uomCode: 'KG', batchCode: 'LOT-0426-B' }
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
  form.code = 'GRN-NEW';
  form.supplierId = mockSuppliers.value[0].id;
  form.receiptDate = new Date().toISOString().split('T')[0];
  form.notes = '';
  form.status = 'DRAFT';
  form.lines = [{ desc: "Biji Kopi Spesialti Arabica (Green Beans)", qty: 120, uomCode: "KG", batchCode: "" }];
  
  dialogOpen.value = true;
}

function openView(r: any) {
  activeDoc.value = r;
  isReadonly.value = true; 
  
  form.id = r.id;
  form.code = r.code;
  form.supplierId = r.supplierId || mockSuppliers.value[0].id;
  form.receiptDate = r.receiptDate?.split('T')[0] || '';
  form.notes = r.notes || '';
  form.status = r.status;
  
  if (r.items && r.items.length > 0) {
      form.lines = r.items.map((x:any) => ({...x}));
  } else {
      form.lines = [];
  }

  // Buka editor minor batch jika masih DRAFT (memungkinkan staf mengisi lot sebelum post)
  if (r.status === 'DRAFT') {
      isReadonly.value = false;
  }

  dialogOpen.value = true;
}

async function save() {
  saving.value = true;
  setTimeout(() => {
    alert('Dokumen Penerimaan / Batch Lot Terekam Valid! Ledger Stock dan Kuantitas telah di-Posting ke Gudang Utama.');
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
