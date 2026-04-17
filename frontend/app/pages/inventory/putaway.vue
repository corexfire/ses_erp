<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-5 shadow-sm border-l-4 border-l-blue-600">
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div class="text-sm font-semibold text-slate-800">Manajemen Putaway (Penempatan Aset WMS)</div>
          <div class="mt-1 text-sm text-slate-600">
            Penugasan pemindahan material dari *Receiving Transit* (Bongkar Muat) menuju Lokasi *Rak Fisik (Bin Locations)* di dalam gudang.
          </div>
        </div>
        <div class="flex gap-2">
          <Button label="Peta Gudang (Bin Visual)" severity="secondary" size="small" outlined icon="pi pi-sitemap" />
          <Button v-if="canManage" label="+ Generate Dokumen Putaway" size="small" bg="bg-blue-600" class="text-white border-none" icon="pi pi-box" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Data List and Filters -->
    <div class="rounded-xl border bg-white p-5 shadow-sm">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2 w-full md:w-auto">
          <InputText v-model="search" placeholder="Cari No Dokumen / GRN Ref..." class="w-full md:w-80 text-xs" />
          <select v-model="statusFilter" class="p-2 border rounded-md text-xs bg-white text-slate-700 min-w-32">
            <option value="">Semua Dokumen</option>
            <option value="DRAFT">Dalam Proses Pengerjaan (Draft)</option>
            <option value="POSTED">Selesai Ditempatkan (Rak)</option>
          </select>
          <Button label="Filter" severity="secondary" size="small" :disabled="loading" @click="load" />
        </div>
      </div>

      <!-- Putaway Table -->
      <div class="overflow-x-auto rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-blue-50 text-left text-xs text-blue-900 border-b border-blue-100 uppercase tracking-wider">
            <tr>
              <th class="px-4 py-3 font-semibold">Tugas Penempatan (PTW)</th>
              <th class="px-4 py-3 font-semibold">Rantai Dokumen (GRN Masuk)</th>
              <th class="px-4 py-3 font-semibold text-right">Target Kapasitas Pindah</th>
              <th class="px-4 py-3 font-semibold text-center w-36">Status Eksekusi</th>
              <th class="px-4 py-3 text-right font-semibold">Tindakan Khusus</th>
            </tr>
          </thead>
          <tbody class="divide-y relative">
             <tr v-if="loading">
              <td colspan="5" class="px-4 py-16 text-center text-sm text-slate-500">
                <i class="pi pi-spinner pi-spin mr-2"></i> Mensinkronisasi penugasan Forklift...
              </td>
            </tr>
            <!-- Iteration rows -->
            <tr v-for="doc in filteredDocs" v-else :key="doc.id" class="transition hover:bg-blue-50/40 group">
              <!-- Dokumen -->
              <td class="px-4 py-3 align-top w-56">
                <div class="font-bold text-slate-800 text-xs flex items-center gap-2 font-mono">
                   {{ doc.code }}
                   <i v-if="doc.status === 'POSTED'" class="pi pi-check-circle text-[10px] text-emerald-500" title="Alokasi Selesai"></i>
                </div>
                <div class="text-[10px] text-slate-500 mt-1">🗓️ Penugasan: {{ formatDate(doc.putawayDate) }}</div>
                <div class="text-[9px] bg-slate-100 inline-block px-1.5 py-0.5 rounded border mt-1">
                   Loc: {{ doc.warehouse?.name || 'Gudang Utama' }}
                </div>
              </td>
              
              <!-- Referensi (GRN) -->
              <td class="px-4 py-3 align-top">
                <div class="flex items-center gap-2 mb-1">
                   <div class="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-1 rounded shadow-sm border border-emerald-100 uppercase tracking-wider">Sumber GRN</div>
                </div>
                <div class="text-[11px] font-mono font-bold text-slate-700">{{ doc.grn?.code || 'Penerimaan Acak (Adjust)' }}</div>
                <div class="text-[9px] text-slate-400 mt-0.5 italic">"{{ doc.notes || '-' }}"</div>
              </td>

              <!-- Kuantitas Total -->
              <td class="px-4 py-3 align-top text-right">
                 <div class="font-black text-slate-700 text-sm font-mono relative pr-4">
                    {{ calculateLines(doc) }} Aktivitas Bin <i class="pi pi-building absolute right-0 top-1 text-[9px] opacity-40"></i>
                 </div>
              </td>
              
              <!-- Status -->
              <td class="px-4 py-3 align-top text-center">
                 <span class="inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider" :class="doc.status === 'POSTED' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-amber-100 text-amber-700 border border-amber-200'">
                   {{ doc.status === 'POSTED' ? 'IN-SHELVES' : 'PENDING PINDAH' }}
                 </span>
              </td>

              <!-- Actions -->
              <td class="px-4 py-3 align-top text-right">
                <Button label="Detail Mapping Rak" size="small" severity="secondary" outlined class="text-[10px] px-3 font-bold py-1 text-center hover:bg-slate-100 w-full" @click="openView(doc)" />
              </td>
            </tr>
            <tr v-if="!loading && filteredDocs.length === 0">
              <td colspan="5" class="px-4 py-16 text-center text-slate-500 border-t">
                <div class="text-4xl mb-3 opacity-50 text-slate-200"><i class="pi pi-folder-open"></i></div>
                Tidak ada riwayat penempatan rak. Sistem bongkar muat masih lengang.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Viewer/Editor Modal (Putaway Mapper) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4 backdrop-blur-sm shadow-2xl">
      <div class="w-full max-w-5xl rounded-xl border bg-slate-50 shadow-2xl flex flex-col max-h-[95vh] h-full overflow-hidden animate-fade-in-up">
        
        <!-- Header -->
        <div class="p-6 border-b bg-blue-950 flex flex-col sm:flex-row items-center justify-between shrink-0 gap-4 relative overflow-hidden shadow-sm">
          <div class="absolute left-[-20px] top-[-20px] opacity-10">
             <i class="pi pi-box text-[150px] text-white"></i>
          </div>
          <div class="z-10 w-full flex justify-between items-start">
             <div>
               <div class="flex items-center gap-3">
                 <span class="text-xl font-black text-white tracking-tight">{{ activeDoc?.id ? `Instruksi Mapping Rak (Putaway): ${form.code}` : 'Aktivasi Transfer Gudang Masuk (Putaway)' }}</span>
                 <span v-if="activeDoc?.id" class="inline-flex rounded text-[10px] font-bold uppercase shadow-sm border px-2 py-0.5" :class="form.status === 'POSTED' ? 'bg-emerald-500 text-emerald-50 border-emerald-400' : 'bg-amber-500 text-white border-amber-400'">
                   {{ form.status === 'POSTED' ? 'VALID: SUDAH DI RAK' : 'PENGERJAAN FORKLIFT' }}
                 </span>
               </div>
               <div class="text-xs text-blue-100 font-medium opacity-80 mt-1 pl-1">Identifikasi barang dari Transit menuju Nomor Lokasi Rak (Bin Locator Code).</div>
             </div>
             
             <!-- Dok Acuan -->
             <div class="bg-black/20 p-2 rounded border border-white/10 text-right min-w-40 backdrop-blur-sm hidden md:block">
                <div class="text-[9px] uppercase tracking-widest text-emerald-300 font-bold mb-1">Acuan Asal Penerimaan</div>
                <div class="font-mono text-sm text-white font-bold">{{ activeDoc?.grn?.code || 'Pemindahan Bebas (Adhoc)' }}</div>
             </div>
          </div>
          <button class="text-white/50 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded text-lg font-bold flex items-center justify-center transition-colors shadow-sm z-20 absolute right-4 top-4" @click="dialogOpen = false">✕</button>
        </div>

        <div class="flex-1 overflow-y-auto flex flex-col p-5 bg-slate-100">
           
           <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm col-span-2 relative">
                 <div class="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-3 flex gap-2"><i class="pi pi-align-left"></i> Relasi Sumber Pengangkatan</div>
                 
                 <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-1">
                      <label class="text-[10px] font-bold text-slate-500">GRN Source (Logistik Masuk)</label>
                      <select :disabled="isReadonly" v-model="form.grnId" class="w-full border rounded p-2 text-xs font-bold font-mono text-slate-700 bg-emerald-50 border-emerald-200 outline-none">
                         <option value="">-- Manual (Tanpa GRN) --</option>
                         <option v-for="g in mockGrns" :value="g.id">{{ g.code }}</option>
                      </select>
                    </div>
                    <div class="space-y-1">
                      <label class="text-[10px] font-bold text-slate-500">Area Operasi Teritori (Warehouse)</label>
                      <div class="w-full border rounded p-2 text-xs font-bold text-blue-800 bg-blue-50 border-blue-200 flex items-center gap-2 shadow-inner">
                         <i class="pi pi-building text-blue-600/50"></i> Gudang Utama Area-1
                      </div>
                    </div>
                    <div class="col-span-2 space-y-1">
                      <label class="text-[10px] font-bold text-slate-500">Arahan / Catatan Eksekusi</label>
                      <textarea :disabled="isReadonly" v-model="form.notes" rows="2" class="w-full rounded border p-2 text-xs bg-slate-50 outline-none focus:border-blue-500" placeholder="Instruksi tambahan tim pendorong..."></textarea>
                    </div>
                 </div>
              </div>

              <!-- Time Status -->
              <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center items-center relative overflow-hidden group border-b-4 border-b-blue-600">
                 <div class="absolute opacity-5 group-hover:scale-110 transition-transform duration-700">
                    <i class="pi pi-arrow-right-arrow-left text-9xl text-slate-800"></i>
                 </div>
                 <div class="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2 relative z-10 w-full text-left">Waktu Mulai Angkat</div>
                 <input :disabled="isReadonly" type="date" v-model="form.putawayDate" class="w-full border-0 border-b-2 font-black text-xl text-center text-slate-800 py-2 outline-none relative z-10 bg-transparent disabled:opacity-100" />
                 <div class="text-[9px] text-slate-400 mt-3 text-center relative z-10 leading-tight">Digunakan agar *Ledger* Bin ter-update per hari ini.</div>
              </div>
           </div>

           <!-- Pengecekan Rak -->
           <div class="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
               <div class="flex items-center justify-between p-4 bg-slate-50 border-b">
                 <div class="text-xs font-black text-slate-800 uppercase tracking-widest"><i class="pi pi-compass mr-2 text-blue-600"></i> Alokasi Relokasi Barang (Transit -> Rak Aset)</div>
               </div>
               <div class="overflow-x-auto">
                 <table class="w-full text-sm">
                   <thead class="bg-white text-left text-[9px] text-slate-400 border-b uppercase tracking-wider">
                     <tr>
                       <th class="px-4 py-3 font-semibold text-center w-10">No</th>
                       <th class="px-4 py-3 font-semibold">Label Fisik Material / Batch</th>
                       <th class="px-4 py-3 font-semibold text-right border-l w-24">Jumlah Pindah</th>
                       <th class="px-4 py-3 font-semibold border-l w-44 bg-rose-50" title="Titik Temu Saat Ini">Asal Penarikan<br><span class="text-[8px] normal-case truncate">(Transit/From Bin)</span></th>
                       <th class="px-4 py-3 font-semibold border-l w-48 bg-emerald-50" title="Tempat Peletakan Akhir">Target Lokasi Simpan<br><span class="text-[8px] normal-case align-top truncate">(Rak / To Bin)</span></th>
                     </tr>
                   </thead>
                   <tbody class="divide-y relative">
                      <tr v-for="(line, idx) in form.lines" :key="idx" class="hover:bg-blue-50/20 transition-colors group">
                         <td class="px-4 py-4 align-top text-center font-mono text-xs text-slate-400">{{ idx + 1 }}</td>
                         <td class="px-4 py-4 align-top">
                            <div class="font-bold text-slate-800 text-xs">{{ line.desc }}</div>
                            <div class="text-[9px] px-1 py-0.5 bg-slate-100 rounded inline-block mt-1 font-mono tracking-widest border" title="Batch Lot Lacak">
                               <i class="pi pi-barcode mr-1"></i>{{ line.batchCode || 'NO-BATCH' }}
                            </div>
                         </td>
                         <td class="px-4 py-4 align-top text-right border-l bg-slate-50 border-dashed">
                             <div class="font-mono font-black text-blue-700 text-lg">{{ formatQty(line.qty) }}</div>
                         </td>
                         <td class="px-4 py-3 align-top border-l bg-rose-50/30">
                             <select :disabled="isReadonly" v-model="line.fromBinLocationId" class="w-full border-b border-rose-200 py-1 text-[10px] font-bold bg-transparent outline-none text-rose-800 font-mono">
                                <option value="">-- Ambil --</option>
                                <option v-for="b in mockBins" :value="b.id">{{ b.code }} ({{ b.name }})</option>
                             </select>
                         </td>
                         <td class="px-4 py-3 align-top border-l bg-emerald-50/30 relative">
                             <select :disabled="isReadonly" v-model="line.toBinLocationId" class="w-full border-b border-emerald-200 py-1 text-[10px] font-bold bg-transparent outline-none text-emerald-800 font-mono pr-4">
                                <option value="">-- Letakkan Ke --</option>
                                <option v-for="b in mockBins" :value="b.id">{{ b.code }} ({{ b.name }})</option>
                             </select>
                             <i class="pi pi-check-circle absolute right-2 top-4 text-emerald-500 opacity-0 transition-opacity" :class="line.toBinLocationId ? 'opacity-100' : ''"></i>
                         </td>
                      </tr>
                   </tbody>
                 </table>
               </div>
           </div>
           
           <div v-if="!isReadonly" class="mt-4 p-4 rounded-xl border border-blue-100 bg-blue-50 shadow-inner flex gap-3 text-[10px] text-blue-800 leading-relaxed font-bold">
              <i class="pi pi-box-check text-xl text-blue-500 opacity-60"></i>
              Jika lokasi pendaratan (To Bin) tidak diisi, barang tidak akan berpindah secara Ledger *(Tercecer di lantai)*. Pastikan Tim Checker sudah scan barcode rak secara aktual di lapangan!
           </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-5 border-t border-slate-200 bg-white flex justify-between items-center shrink-0 rounded-b-xl z-20">
          <Button label="Batalkan Operasi" severity="secondary" size="small" @click="dialogOpen = false" outlined class="bg-slate-50 border-slate-300 font-bold" />
          <div class="flex items-center gap-2">
             <Button v-if="isReadonly && canManage && form.status === 'DRAFT'" label="Audit: Selesaikan Penempatan (POSTING)" severity="info" size="large" :loading="saving" :disabled="saving" @click="save" class="bg-blue-600 border-none text-white font-bold tracking-wide hover:bg-blue-700 px-8 shadow-sm h-10" icon="pi pi-lock" />
             <Button v-else-if="!isReadonly" label="Kirim Instruksi (Simpan Draft)" severity="info" size="large" @click="dialogOpen = false" class="bg-blue-600 border-none text-white font-bold h-10 px-8" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('inventory.putaway.manage') || true); 

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
  grnId: '',
  putawayDate: '',
  notes: '',
  status: 'DRAFT',
  lines: [] as Array<any>
});

const mockGrns = ref<any[]>([
  {id:'1', code:'GRN-202604-002'},
  {id:'2', code:'GRN-202604-003'}
]);

const mockBins = ref<any[]>([
  {id:'BIN-REC-01', code:'BIN-REC-01', name:'Area Receiving'},
  {id:'BIN-A-10', code:'BIN-A-10', name:'Rak Kopi Mentah'}
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
      (p.grn?.code && p.grn.code.toLowerCase().includes(q))
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
    const res = await api.get('/core/query?table=Putaway&include=grn,warehouse,items');
    if (res.data && res.data.data) {
        docs.value = res.data.data;
    } else {
        throw new Error("No payload");
    }
  } catch (e: any) {
    // Mock
    docs.value = [
      { 
        id: '1', code: "PTW-202604-001", status: "POSTED", putawayDate: "2026-04-20T00:00", notes: "Pemindahan fisik dari transit ke Rak A-10",
        grn: { code: 'GRN-202604-002' }, warehouse: { name: 'Gudang Utama' },
        items: [
           { desc: 'Biji Kopi Spesialti Arabica', qty: 100, batchCode: 'LOT-0426-A', fromBinLocationId: 'BIN-REC-01', toBinLocationId: 'BIN-A-10' }
        ]
      },
      { 
        id: '2', code: "PTW-202604-002", status: "DRAFT", putawayDate: "2026-04-22T00:00", notes: "Sedang dikerjakan forklift",
        grn: { code: 'GRN-202604-003' }, warehouse: { name: 'Gudang Utama' },
        items: [
           { desc: 'Biji Kopi Spesialti Arabica', qty: 250, batchCode: 'LOT-0426-B', fromBinLocationId: 'BIN-REC-01', toBinLocationId: '' }
        ]
      }
    ];
    
    try {
        const binRes = await api.get('/core/query?table=BinLocation');
        if(binRes.data && binRes.data.data) mockBins.value = binRes.data.data;
    } catch(err){}
  } finally {
    loading.value = false;
  }
}

function openCreate() {
  activeDoc.value = null;
  isReadonly.value = false;
  form.id = '';
  form.code = 'PTW-NEW';
  form.grnId = mockGrns.value[0].id;
  form.putawayDate = new Date().toISOString().split('T')[0];
  form.notes = '';
  form.status = 'DRAFT';
  form.lines = [{ desc: "Biji Kopi Spesialti Arabica (Green Beans)", qty: 120, batchCode: "LOT-ABC", fromBinLocationId: 'BIN-REC-01', toBinLocationId: '' }];
  
  dialogOpen.value = true;
}

function openView(r: any) {
  activeDoc.value = r;
  isReadonly.value = true; 
  
  form.id = r.id;
  form.code = r.code;
  form.grnId = r.grnId || mockGrns.value[0].id;
  form.putawayDate = r.putawayDate?.split('T')[0] || '';
  form.notes = r.notes || '';
  form.status = r.status;
  
  if (r.items && r.items.length > 0) {
      form.lines = r.items.map((x:any) => ({...x}));
  } else {
      form.lines = [];
  }

  if (r.status === 'DRAFT') {
      isReadonly.value = false;
  }

  dialogOpen.value = true;
}

async function save() {
  saving.value = true;
  setTimeout(() => {
    alert('Penempatan aset ke dalam Rak berhasil! Inventaris sekarang dapat ditemukan di lokasi spesifik tersebut.');
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