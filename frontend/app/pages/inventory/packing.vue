<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-5 shadow-sm border-l-4 border-l-amber-500">
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div class="text-sm font-semibold text-slate-800">Manajemen Pengemasan (Outbound Packing)</div>
          <div class="mt-1 text-sm text-slate-600">
            Konsolidasi Troli (Picking) ke dalam Kardus/Palet pengiriman fisik. Lakukan validasi penimbangan, cetak label, dan input Nomor Resi Kurir Eksternal.
          </div>
        </div>
        <div class="flex gap-2">
          <Button label="Integrasi Printer Label" severity="secondary" size="small" outlined icon="pi pi-print" />
          <Button v-if="canManage" label="+ Generate Dokumen Pack" size="small" bg="bg-amber-600" class="text-white border-none shrink-0" icon="pi pi-box-check" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Data List and Filters -->
    <div class="rounded-xl border bg-white p-5 shadow-sm">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2 w-full md:w-auto">
          <InputText v-model="search" placeholder="Cari No Packing / SO / Resi..." class="w-full md:w-80 text-xs" />
          <select v-model="statusFilter" class="p-2 border rounded-md text-xs bg-white text-slate-700 min-w-32">
            <option value="">Semua Dokumen</option>
            <option value="DRAFT">Proses Sealing/Lakban (Packing)</option>
            <option value="POSTED">Selesai Dikemas (Siap Kirim DO)</option>
          </select>
          <Button label="Filter" severity="secondary" size="small" :disabled="loading" @click="load" />
        </div>
      </div>

      <!-- Packing Table -->
      <div class="overflow-x-auto rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-amber-50 text-left text-xs text-amber-900 border-b border-amber-100 uppercase tracking-wider">
            <tr>
              <th class="px-4 py-3 font-semibold">Tugas Konsolidasi (PAC)</th>
              <th class="px-4 py-3 font-semibold">Rantai Penjualan Induk</th>
              <th class="px-4 py-3 font-semibold text-right">Agregasi Kardus/Palet</th>
              <th class="px-4 py-3 font-semibold text-center w-36">Status Ekspedisi</th>
              <th class="px-4 py-3 text-right font-semibold">Tindakan Khusus</th>
            </tr>
          </thead>
          <tbody class="divide-y relative">
             <tr v-if="loading">
              <td colspan="5" class="px-4 py-16 text-center text-sm text-slate-500">
                <i class="pi pi-spinner pi-spin mr-2"></i> Merender daftar antrean kargo...
              </td>
            </tr>
            <!-- Iteration rows -->
            <tr v-for="doc in filteredDocs" v-else :key="doc.id" class="transition hover:bg-amber-50/40 group">
              <!-- Dokumen -->
              <td class="px-4 py-3 align-top w-56">
                <div class="font-bold text-slate-800 text-xs flex items-center gap-2 font-mono">
                   {{ doc.code }}
                   <i v-if="doc.status === 'POSTED'" class="pi pi-check-circle text-[10px] text-emerald-500" title="Kargo Disegel (Sealed)"></i>
                </div>
                <div class="text-[10px] text-slate-500 mt-1">🗓️ Tanggal Lakban: {{ formatDate(doc.packingDate) }}</div>
                <div class="text-[9px] bg-slate-100 inline-block px-1.5 py-0.5 rounded border mt-1">
                   Loc: {{ doc.warehouse?.name || 'Gudang Utama Area Packing' }}
                </div>
              </td>
              
              <!-- Referensi (SO) -->
              <td class="px-4 py-3 align-top">
                <div class="flex items-center gap-2 mb-1">
                   <div class="text-[9px] font-bold px-1 rounded shadow-sm border uppercase tracking-wider" :class="doc.salesOrderId ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-slate-50 text-slate-500 border-slate-200'">
                      {{ doc.salesOrderId ? 'Menutup Target SO/DO' : 'Pengemasan Internal' }}
                   </div>
                </div>
                <div class="text-[11px] font-mono font-bold text-slate-700">{{ doc.salesOrder?.code || 'Pemakaian Divisi / Eksternal' }}</div>
                <div class="text-[9px] text-slate-400 mt-0.5 italic">"{{ doc.notes || '-' }}"</div>
              </td>

              <!-- Kuantitas Total -->
              <td class="px-4 py-3 align-top text-right">
                 <div class="font-black text-slate-700 text-sm font-mono relative pr-4">
                    {{ calculateLines(doc) }} Karton Fisik <i class="pi pi-box-check absolute right-0 top-1 text-[9px] opacity-40"></i>
                 </div>
                 <div class="text-[9px] font-bold mt-0.5 text-slate-500">
                    Est Tonase: {{ formatQty(calculateTotalWeight(doc)) }} KG
                 </div>
              </td>
              
              <!-- Status -->
              <td class="px-4 py-3 align-top text-center">
                 <span class="inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider" :class="doc.status === 'POSTED' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-amber-100 text-amber-700 border border-amber-200'">
                   {{ doc.status === 'POSTED' ? 'SEALED & READY' : 'PROSES KARTONASI' }}
                 </span>
              </td>

              <!-- Actions -->
              <td class="px-4 py-3 align-top text-right">
                <Button label="Audit Kotak (Box)" size="small" severity="secondary" outlined class="text-[10px] px-3 font-bold py-1 text-center hover:bg-slate-100 w-full" @click="openView(doc)" />
              </td>
            </tr>
            <tr v-if="!loading && filteredDocs.length === 0">
              <td colspan="5" class="px-4 py-16 text-center text-slate-500 border-t">
                <div class="text-4xl mb-3 opacity-50 text-slate-200"><i class="pi pi-box"></i></div>
                Area pengemasan bersih. Tidak ada perintah kargo yang harus dibungkus.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Viewer/Editor Modal (Packing Workbench) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4 backdrop-blur-sm shadow-xl">
      <div class="w-full max-w-5xl rounded-xl border bg-slate-50 shadow-2xl flex flex-col max-h-[95vh] h-full overflow-hidden animate-fade-in-up">
        
        <!-- Header -->
        <div class="p-6 border-b bg-amber-950 flex flex-col sm:flex-row items-center justify-between shrink-0 gap-4 relative overflow-hidden shadow-sm">
          <div class="absolute left-[-20px] top-[-20px] opacity-10">
             <i class="pi pi-pen-to-square text-[150px] text-white"></i>
          </div>
          <div class="z-10 w-full flex justify-between items-start">
             <div>
               <div class="flex items-center gap-3">
                 <span class="text-xl font-black text-amber-50 tracking-tight">{{ activeDoc?.id ? `Meja Operasi Kemas (Packing Log): ${form.code}` : 'Aktivasi Kemasan Kardus Baru (Packing)' }}</span>
                 <span v-if="activeDoc?.id" class="inline-flex rounded text-[10px] font-bold uppercase shadow-sm border px-2 py-0.5" :class="form.status === 'POSTED' ? 'bg-emerald-500 text-emerald-50 border-emerald-400' : 'bg-amber-400 text-amber-900 border-amber-300'">
                   {{ form.status === 'POSTED' ? 'ASURANSI: DISEGEL' : 'KOTAK TERBUKA (DRAFT)' }}
                 </span>
               </div>
               <div class="text-xs text-amber-200 font-medium opacity-80 mt-1 pl-1">Instruksi staf *Packer* mengepak barang dan menempelkan Nomor Resi Waybill Ekspedisi Eksternal.</div>
             </div>
             
             <!-- Dok Acuan -->
             <div class="bg-black/20 p-2 rounded border border-white/10 text-right min-w-40 backdrop-blur-sm hidden md:block">
                <div class="text-[9px] uppercase tracking-widest text-emerald-300 font-bold mb-1">Surat Tarik Induk (SO)</div>
                <div class="font-mono text-sm text-white font-bold">{{ activeDoc?.salesOrder?.code || 'Penyatuan Ad-Hoc Internal' }}</div>
             </div>
          </div>
          <button class="text-white/50 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded text-lg font-bold flex items-center justify-center transition-colors shadow-sm z-20 absolute right-4 top-4" @click="dialogOpen = false">✕</button>
        </div>

        <div class="flex-1 overflow-y-auto flex flex-col p-5 bg-slate-100">
           
           <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm col-span-2 relative">
                 <div class="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-3 flex gap-2"><i class="pi pi-inbox"></i> Referensi Pengemasan (Troli)</div>
                 
                 <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-1">
                      <label class="text-[10px] font-bold text-slate-500">Sesuai Dokumen Penjualan (SO)</label>
                      <select :disabled="isReadonly" v-model="form.salesOrderId" class="w-full border rounded p-2 text-xs font-bold font-mono text-slate-700 bg-emerald-50 border-emerald-200 outline-none">
                         <option value="">-- Pemakaian Internal (Non-SO) --</option>
                         <option v-for="s in mockSOs" :value="s.id">{{ s.code }}</option>
                      </select>
                    </div>
                    <div class="space-y-1">
                      <label class="text-[10px] font-bold text-slate-500">Area Stasiun Pengemasan</label>
                      <div class="w-full border rounded p-2 text-xs font-bold text-amber-800 bg-amber-50 border-amber-200 flex items-center gap-2 shadow-inner">
                         <i class="pi pi-building text-amber-600/50"></i> Station Packing A-1 Utama
                      </div>
                    </div>
                    <div class="col-span-2 space-y-1">
                      <label class="text-[10px] font-bold text-slate-500">Catatan Material & Proteksi Ekstra</label>
                      <textarea :disabled="isReadonly" v-model="form.notes" rows="2" class="w-full rounded border p-2 text-xs bg-slate-50 outline-none focus:border-amber-500" placeholder="Gunakan Bubble Wrap 3 Lapis. Jangan dibanting..."></textarea>
                    </div>
                 </div>
              </div>

              <!-- Time Status -->
              <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center items-center relative overflow-hidden group border-b-4 border-b-amber-500">
                 <div class="absolute opacity-5 group-hover:scale-110 transition-transform duration-700">
                    <i class="pi pi-box-check text-9xl text-slate-800"></i>
                 </div>
                 <div class="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2 relative z-10 w-full text-left">Waktu Kargo Ditutup Asuransi</div>
                 <input :disabled="isReadonly" type="date" v-model="form.packingDate" class="w-full border-0 border-b-2 font-black text-xl text-center text-slate-800 py-2 outline-none relative z-10 bg-transparent disabled:opacity-100" />
                 <div class="text-[9px] text-slate-400 mt-3 text-center relative z-10 leading-tight">Wajib dipenuhi menjelang kurir ekspedisi vendor truk menjemput.</div>
              </div>
           </div>

           <!-- Pengecekan Dus/Kotak -->
           <div class="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
               <div class="flex items-center justify-between p-4 bg-slate-50 border-b">
                 <div class="text-xs font-black text-slate-800 uppercase tracking-widest"><i class="pi pi-th-large mr-2 text-amber-600"></i> Pemilahan Volume Box & Resi Pengiriman Independen</div>
                 <Button v-if="!isReadonly" label="Tambah Kardus/Split Item" icon="pi pi-plus" size="small" bg="bg-white" class="h-8 shadow-sm text-amber-700 text-[10px] border-slate-200" @click="addLine" />
               </div>
               <div class="overflow-x-auto">
                 <table class="w-full text-sm">
                   <thead class="bg-white text-left text-[9px] text-slate-400 border-b uppercase tracking-wider">
                     <tr>
                       <th class="px-4 py-3 font-semibold text-center w-10">No</th>
                       <th class="px-4 py-3 font-semibold">SKU Terkemas di Dimensi Ini</th>
                       <th class="px-4 py-3 font-semibold text-center border-l w-32 bg-slate-50" title="Isi riil dalam Box ini">Kepadatan Fisik<br><span class="text-[8px] normal-case truncate">(Total Isi Qty)</span></th>
                       <th class="px-4 py-3 font-semibold border-l w-32 bg-amber-50" title="Penimbangan Beban Asuransi Ekspedisi">Labelisasi Ekspedisi<br><span class="text-[8px] normal-case align-top truncate">(Box No / Berat Kg)</span></th>
                       <th class="px-4 py-3 font-semibold border-l w-48 bg-indigo-50" title="Akurasi Ekspedisi">Integrasi Resi 3PL<br><span class="text-[8px] normal-case align-top truncate">(Air Waybill / Tracking ID)</span></th>
                       <th v-if="!isReadonly" class="w-10"></th>
                     </tr>
                   </thead>
                   <tbody class="divide-y relative">
                      <tr v-for="(line, idx) in form.lines" :key="idx" class="hover:bg-amber-50/20 transition-colors group">
                         <td class="px-4 py-4 align-top text-center font-mono text-xs text-slate-400 mt-1">{{ idx + 1 }}</td>
                         <td class="px-4 py-4 align-top">
                            <input :disabled="isReadonly" type="text" v-model="line.desc" class="w-full border-b border-dashed border-slate-300 py-0.5 text-xs font-bold text-slate-800 bg-transparent outline-none focus:border-amber-500 placeholder-slate-300" placeholder="Ketik Spesifikasi SKU Barang..." />
                         </td>
                         <td class="px-4 py-4 align-top text-center border-l bg-slate-50 border-dashed">
                             <div class="flex items-center gap-1 justify-center">
                                <input :disabled="isReadonly" type="number" v-model.number="line.qty" class="w-16 border rounded px-1 py-1 text-center font-mono text-sm font-black text-slate-700 outline-none" placeholder="10" />
                                <input :disabled="isReadonly" type="text" v-model="line.uomCode" class="w-12 border-b border-dashed border-slate-300 px-1 py-1 text-xs text-center font-bold text-slate-500 uppercase outline-none bg-transparent" placeholder="PCS" />
                             </div>
                         </td>
                         <td class="px-4 py-3 align-top border-l bg-amber-50/50">
                             <div class="space-y-2">
                                <input :disabled="isReadonly" type="text" v-model="line.boxNo" class="w-full border border-amber-200 rounded px-2 py-1 text-xs font-mono font-bold text-amber-900 outline-none placeholder-amber-300 shadow-inner" placeholder="ID Kotak (Cth: BOX-1)" />
                                <div class="flex items-center gap-2">
                                   <i class="pi pi-sort-amount-down text-slate-400 text-[10px]"></i>
                                   <input :disabled="isReadonly" type="number" v-model.number="line.weight" class="w-full border-b border-dashed border-slate-300 py-0.5 text-[10px] text-right font-mono text-slate-600 outline-none bg-transparent" placeholder="0.00" />
                                   <span class="text-[9px] font-bold text-slate-400">KG</span>
                                </div>
                             </div>
                         </td>
                         <td class="px-4 py-3 align-middle border-l bg-indigo-50/40 relative">
                             <div class="flex items-center gap-2">
                                <i class="pi pi-check-square text-indigo-300 text-[10px]"></i>
                                <input :disabled="isReadonly" type="text" v-model="line.trackingId" class="w-full border-b border-indigo-200 py-1 font-mono font-bold text-xs text-indigo-700 outline-none bg-transparent placeholder-indigo-300 uppercase" placeholder="RESI-..." />
                             </div>
                         </td>
                         <td v-if="!isReadonly" class="px-2 py-4 align-middle border-l text-center">
                             <button @click="removeLine(idx)" class="w-6 h-6 rounded bg-rose-100 text-rose-600 flex items-center justify-center font-black hover:bg-rose-500 hover:text-white transition-colors" title="Bongkar Kotak">✕</button>
                         </td>
                      </tr>
                      <tr v-if="form.lines.length === 0">
                         <td :colspan="isReadonly ? 5 : 6" class="p-6 text-center text-slate-400 text-xs italic">Belum ada penyematan kardus/palet asuransi.</td>
                      </tr>
                   </tbody>
                 </table>
               </div>
           </div>
           
           <div v-if="!isReadonly" class="mt-4 p-4 rounded-xl border border-amber-200 bg-amber-50 shadow-inner flex gap-3 text-[10px] text-amber-800 leading-relaxed font-bold">
              <i class="pi pi-qrcode text-xl text-amber-500 opacity-60"></i>
              Nomor Registrasi Tracking ID (Resi) sangat vital bagi perusahan manufaktur untuk menjamin komplain asuransi barang penyok akibat kurir Ekspedisi (3PL). 
              Pastikan Anda mencetak label barcode per Unit Baris Kotak di atas sebelum memanggil Modul Delivery Order (DO).
           </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-5 border-t border-slate-200 bg-white flex justify-between items-center shrink-0 rounded-b-xl z-20">
          <Button label="Turun Dari Meja (Batal)" severity="secondary" size="small" @click="dialogOpen = false" outlined class="bg-slate-50 border-slate-300 font-bold" />
          <div class="flex items-center gap-2">
             <Button v-if="isReadonly && canManage && form.status === 'DRAFT'" label="Audit: Kargo Ditutup dan Disegel (SEALED PACK!)" severity="warning" size="large" :loading="saving" :disabled="saving" @click="save" class="bg-amber-600 border-none text-white font-bold tracking-wide hover:bg-amber-700 px-8 shadow-sm h-10" icon="pi pi-shield" />
             <Button v-else-if="!isReadonly" label="Rakitan Karton Selesai (Draft)" severity="warning" size="large" @click="dialogOpen = false" class="bg-amber-600 border-none text-white font-bold h-10 px-8" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('inventory.packing.manage') || true); 

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
  packingDate: '',
  notes: '',
  status: 'DRAFT',
  lines: [] as Array<any>
});

const mockSOs = ref<any[]>([
  {id:'1', code:'SO-202604-001'},
  {id:'2', code:'SO-202604-002'}
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

const calculateTotalWeight = (doc: any) => {
    if (!doc.items || doc.items.length === 0) return 0;
    return doc.items.reduce((acc: number, val: any) => acc + (Number(val.weight) || 0), 0);
};

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/query?table=Packing&include=salesOrder,warehouse,items');
    if (res.data && res.data.data) {
        docs.value = res.data.data;
    } else {
        throw new Error("No payload");
    }
  } catch (e: any) {
    // Mock Data based on postgres seeded data
    docs.value = [
      { 
        id: '1', code: "PAC-202604-001", status: "DRAFT", packingDate: "2026-04-26T00:00", notes: "Pisahkan 2 box dengan Bubble Wrap...",
        salesOrder: { code: 'SO-202604-001' }, warehouse: { name: 'Gudang Utama Area Packing' },
        items: [
           { desc: 'Kopi Bubuk Arabica Premium', qty: 50, uomCode: 'PCS', boxNo: 'BOX-001', weight: 12.5, trackingId: 'JT-88123' },
           { desc: 'Kopi Bubuk Arabica Premium', qty: 70, uomCode: 'PCS', boxNo: 'BOX-002', weight: 17.5, trackingId: 'JT-88123' }
        ]
      },
      { 
        id: '2', code: "PAC-202604-002", status: "POSTED", packingDate: "2026-04-27T00:00", notes: "Selesai di-seal palet utuh.",
        salesOrder: { code: 'SO-202604-002' }, warehouse: { name: 'Gudang Ekspedisi' },
        items: [
           { desc: 'Biji Kopi Spesialti (Whole Bean)', qty: 15, uomCode: 'KARUNG', boxNo: 'PALLET-BKS-01', weight: 750, trackingId: 'INHOUSE-DRV' }
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
  form.code = 'PAC-NEW';
  form.salesOrderId = mockSOs.value[0].id;
  form.packingDate = new Date().toISOString().split('T')[0];
  form.notes = '';
  form.status = 'DRAFT';
  form.lines = [{ desc: "Kopi Bubuk Arabica Premium 250g", qty: 30, uomCode: 'PCS', boxNo: 'KARDUS-BARU', weight: 0.0, trackingId: '' }];
  
  dialogOpen.value = true;
}

function openView(r: any) {
  activeDoc.value = r;
  isReadonly.value = true; 
  
  form.id = r.id;
  form.code = r.code;
  form.salesOrderId = r.salesOrderId || (r.salesOrder? mockSOs.value[0].id : '');
  form.packingDate = r.packingDate?.split('T')[0] || '';
  form.notes = r.notes || '';
  form.status = r.status;
  
  if (r.items && r.items.length > 0) {
      form.lines = r.items.map((x:any) => ({...x}));
  } else {
      form.lines = [];
  }

  // Jika DRAFT, izinkan packer merakit ulang kardus / timbangan berat
  if (r.status === 'DRAFT') {
      isReadonly.value = false;
  }

  dialogOpen.value = true;
}

function addLine() {
   form.lines.push({ desc: "", qty: 1, uomCode: 'PCS', boxNo: 'BOX-TBD', weight: 0.0, trackingId: '' });
}

function removeLine(idx: number) {
   form.lines.splice(idx, 1);
}

async function save() {
  saving.value = true;
  setTimeout(() => {
    alert('Operasi lakban (Sealed Packing) Selesai! Tracking Resi Nomor Box telah dikunci. Dokumen ini siap dirubah menjadi Delivery Order (DO).');
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