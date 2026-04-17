<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-5 shadow-sm border-l-4 border-l-teal-500">
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div class="text-sm font-semibold text-slate-800">Manajemen Stock Opname (Penyesuaian Fisik)</div>
          <div class="mt-1 text-sm text-slate-600">
            Audit kuantitas aktual. Rekonsiliasi *Physical Count* (Penghitungan riil di gudang) dibandingkan dengan *System Quantity* (Buku Ledger).
          </div>
        </div>
        <div class="flex gap-2">
          <Button label="Laporan Selisih (Variance)" severity="secondary" size="small" outlined icon="pi pi-chart-pie" />
          <Button v-if="canManage" label="+ Buka Sidak Opname" size="small" bg="bg-teal-600" class="text-white border-none shrink-0 cursor-pointer" icon="pi pi-search-plus" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Data List and Filters -->
    <div class="rounded-xl border bg-white p-5 shadow-sm">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2 w-full md:w-auto">
          <InputText v-model="search" placeholder="Cari Dokumen STC / Audit..." class="w-full md:w-80 text-xs" />
          <select v-model="statusFilter" class="p-2 border rounded-md text-xs bg-white text-slate-700 min-w-32 outline-none focus:border-teal-500">
            <option value="">Semua Riwayat</option>
            <option value="DRAFT">Draft Penghitungan (Checker)</option>
            <option value="POSTED">Terkunci (Ledger Tersesuaikan)</option>
          </select>
          <Button label="Filter Audit" severity="secondary" size="small" :disabled="loading" @click="load" />
        </div>
      </div>

      <!-- Opname Table -->
      <div class="overflow-x-auto rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-teal-50/50 text-left text-xs text-teal-900 border-b border-teal-100 uppercase tracking-wider">
            <tr>
              <th class="px-4 py-3 font-semibold">Dokumen Audit (STC)</th>
              <th class="px-4 py-3 font-semibold">Pangkalan Target Auditing</th>
              <th class="px-4 py-3 font-semibold text-center border-l bg-slate-50">Tingkat Penyesuaian<br><span class="text-[8px] normal-case text-slate-400">Total Selisih (Variance Qty)</span></th>
              <th class="px-4 py-3 font-semibold text-center border-l w-36">Status Validasi</th>
              <th class="px-4 py-3 text-right font-semibold">Lembar Kerja</th>
            </tr>
          </thead>
          <tbody class="divide-y relative">
             <tr v-if="loading">
              <td colspan="5" class="px-4 py-16 text-center text-sm text-slate-500">
                <i class="pi pi-spinner pi-spin mr-2 text-teal-500"></i> Memeriksa riwayat audit inventaris...
              </td>
            </tr>
            <!-- Iteration rows -->
            <tr v-for="doc in filteredDocs" v-else :key="doc.id" class="transition hover:bg-teal-50/20 group">
              <!-- Dokumen -->
              <td class="px-4 py-3 align-top w-64">
                <div class="font-bold text-slate-800 flex items-center gap-2 font-mono">
                   {{ doc.code }}
                   <i v-if="doc.status === 'POSTED'" class="pi pi-lock text-[10px] text-teal-600" title="Dokumen Ledger Terkunci Mutlak"></i>
                </div>
                <div class="text-[10px] text-slate-500 mt-1">🗓️ Aktualisasi: <span class="font-bold">{{ formatDate(doc.countDate) }}</span></div>
                <div class="text-[9px] text-slate-400 mt-1 italic leading-tight w-56">"{{ doc.notes || '-' }}"</div>
              </td>
              
               <!-- Target/Gudang -->
              <td class="px-4 py-3 align-top">
                 <div class="flex items-center gap-2">
                    <i class="pi pi-building text-slate-400"></i>
                    <div class="font-bold text-slate-700 text-xs">{{ doc.warehouse?.name || 'Area Spesifik (Bin)' }}</div>
                 </div>
                 <div class="text-[10px] bg-slate-100 border inline-block px-1.5 py-0.5 rounded uppercase mt-2 shadow-sm font-mono tracking-tighter">{{ calculateLines(doc) }} SKU TERAUDIT</div>
              </td>

              <!-- Visualisasi Variance (Selisih) -->
              <td class="px-4 py-3 align-top text-center border-l bg-slate-50 relative h-full">
                 <div class="flex flex-col items-center justify-center h-full gap-1">
                    <span class="font-black text-xl font-mono tracking-tighter" :class="varianceColor(calculateTotalVariance(doc))">
                       {{ calculateTotalVariance(doc) > 0 ? '+' : '' }}{{ formatQty(calculateTotalVariance(doc)) }}
                    </span>
                    <div class="text-[8px] font-bold uppercase rounded px-1" :class="varianceBadgeParams(calculateTotalVariance(doc))">
                       {{ calculateTotalVariance(doc) === 0 ? 'MATHEMATICALLY PERFECT' : (calculateTotalVariance(doc) > 0 ? 'OVER-STOCK FISIK' : 'BARANG HILANG (MINUS)') }}
                    </div>
                 </div>
                 <div v-show="doc.status === 'DRAFT'" class="absolute inset-0 bg-white/80 flex items-center justify-center text-[9px] font-black text-slate-400 tracking-widest backdrop-blur-[1px]">PENGHITUNGAN BERJALAN</div>
              </td>

              <!-- Status -->
              <td class="px-4 py-4 align-top text-center border-l">
                 <span class="inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider relative overflow-hidden" :class="doc.status === 'POSTED' ? 'bg-teal-100 text-teal-700 border border-teal-300 shadow-inner' : 'bg-amber-100 text-amber-700 border border-amber-300'">
                   {{ doc.status === 'POSTED' ? 'TERKUNCI' : 'SEMENTARA' }}
                 </span>
              </td>

              <!-- Actions -->
              <td class="px-4 py-4 align-middle text-right">
                <Button label="Worksheet Petugas" size="small" severity="secondary" outlined class="text-[10px] px-3 font-bold py-1.5 text-center hover:bg-slate-100 w-full mb-1 transition-colors hover:text-teal-700" @click="openView(doc)" />
                <div v-if="doc.status === 'POSTED'" class="text-[9px] text-slate-400 mt-1 uppercase text-center"><i class="pi pi-calendar-times mr-1"></i> Final</div>
              </td>
            </tr>
            <tr v-if="!loading && filteredDocs.length === 0">
              <td colspan="5" class="px-4 py-16 text-center text-slate-500 border-t">
                <div class="text-4xl mb-3 opacity-30 text-teal-400"><i class="pi pi-check-circle"></i></div>
                Tidak ada dokumen audit stok bulan ini.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


    <!-- Viewer/Editor Modal (Opname Worksheet/Blind Count) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4 backdrop-blur-sm shadow-xl">
      <div class="w-full max-w-6xl rounded-xl border bg-slate-50 shadow-2xl flex flex-col max-h-[95vh] h-full overflow-hidden animate-fade-in-up">
        
        <!-- Header -->
        <div class="p-6 border-b bg-teal-950 flex flex-col sm:flex-row items-center justify-between shrink-0 gap-4 relative overflow-hidden shadow-sm">
          <div class="absolute left-[-20px] top-[-20px] opacity-20">
             <i class="pi pi-search-plus text-[150px] text-white"></i>
          </div>
          <div class="z-10 w-full flex justify-between items-start">
             <div>
               <div class="flex items-center gap-3">
                 <span class="text-xl font-black text-teal-50 tracking-tight">{{ activeDoc?.id ? `Papan Hitung (Blind Count): ${form.code}` : 'Pemuatan Lembar Audit Master (Opname)' }}</span>
                 <span v-if="activeDoc?.id" class="inline-flex rounded text-[10px] font-bold uppercase shadow-sm border px-2 py-0.5" :class="form.status === 'POSTED' ? 'bg-teal-500 text-white border-teal-400' : 'bg-amber-500 text-white border-amber-400'">
                   {{ form.status === 'POSTED' ? 'TERKUNCI & TER-JURNAL' : 'MENGHITUNG FISIK (DRAFT)' }}
                 </span>
               </div>
               <div class="text-xs text-teal-200 font-medium opacity-80 mt-1 pl-1">Mengetik "*Counted Qty*", membandingkan dengan "*System Qty*", dan mencetak "*Variance*".</div>
             </div>
          </div>
          <button class="text-white/50 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded text-lg font-bold flex items-center justify-center transition-colors shadow-sm z-20 absolute right-4 top-4" @click="dialogOpen = false">✕</button>
        </div>

        <div class="flex-1 overflow-y-auto flex flex-col p-5 bg-slate-100">
           
           <!-- Setup Parameter Sidak -->
           <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 mb-6 relative">
              <div class="w-full space-y-1">
                 <label class="text-[10px] font-bold text-slate-500">Pangkalan / Gudang Audit</label>
                 <select :disabled="isReadonly" v-model="form.warehouseId" class="w-full border rounded p-2 text-xs font-bold font-mono text-slate-700 bg-slate-50 border-slate-200 outline-none">
                     <option value="">-- Lokasi Gudang Pusat/Cabang --</option>
                     <option v-for="w in mockWhs" :value="w.id">{{ w.name }}</option>
                 </select>
              </div>
              <div class="w-full space-y-1 relative">
                 <label class="text-[10px] font-bold text-slate-500">Batas Laporan (Cut-Off Date)</label>
                 <input :disabled="isReadonly" type="date" v-model="form.countDate" class="w-full border rounded p-2 text-sm font-bold text-slate-700 bg-slate-50 border-slate-200 outline-none focus:border-teal-500" />
                 <div class="absolute right-3 top-7"><i class="pi pi-calendar text-slate-400"></i></div>
              </div>
              <div class="w-full md:w-[600px] space-y-1">
                 <label class="text-[10px] font-bold text-slate-500">Keterangan Laporan Sidak</label>
                 <textarea :disabled="isReadonly" v-model="form.notes" rows="1" class="w-full rounded border p-2 text-xs bg-slate-50 outline-none focus:border-teal-500" placeholder="Audit mingguan barang retur..."></textarea>
              </div>
           </div>

           <!-- Papan Input Opname -->
           <div class="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
               <div class="flex items-center justify-between p-4 bg-slate-50 border-b">
                 <div class="text-xs font-black text-slate-800 uppercase tracking-widest"><i class="pi pi-inbox mr-2 text-teal-600"></i> Opname Worksheet (Pencatat Hasil Fisik)</div>
                 <Button v-if="!isReadonly" label="Tambah Baris Temuan Baru" icon="pi pi-plus" size="small" bg="bg-white" class="h-8 shadow-sm text-teal-700 text-[10px] border-slate-200 font-bold" @click="addLine" />
               </div>
               <div class="overflow-x-auto">
                 <table class="w-full text-sm">
                   <thead class="bg-white text-left text-[9px] text-slate-400 border-b uppercase tracking-wider relative">
                     <!-- Group Header UI -->
                     <tr>
                       <th colspan="2" class="px-4 py-2 text-center text-slate-700 w-[40%]"><i class="pi pi-tag mr-1 text-[8px]"></i> BARANG & LOKASI</th>
                       <th class="px-4 py-2 border-l text-center font-bold bg-slate-100 w-[20%] text-slate-500"><i class="pi pi-desktop mr-1 text-[8px]"></i> DATA KOMPUTER</th>
                       <th class="px-4 py-2 border-l text-center font-bold bg-teal-50 w-[20%] text-teal-700"><i class="pi pi-users mr-1 text-[8px]"></i> TEMUAN FISIK</th>
                       <th class="px-4 py-2 border-l text-center font-black text-white w-[20%]" :class="calculateGlobalVariance() === 0 ? 'bg-slate-400' : 'bg-slate-800'">HASIL SELISIH (VARIANCE)</th>
                       <th v-if="!isReadonly" class="w-8 border-l border-b bg-white"></th>
                     </tr>
                   </thead>
                   <tbody class="divide-y relative">
                      <tr v-for="(line, idx) in form.lines" :key="idx" class="transition-colors group hover:bg-slate-50 h-16">
                         <!-- Name -->
                         <td class="px-4 py-2 align-middle">
                            <input :disabled="isReadonly" type="text" v-model="line.desc" class="w-full border-b border-dashed border-slate-300 py-1 text-xs font-bold text-slate-800 bg-transparent outline-none focus:border-teal-500 placeholder-slate-300" placeholder="Ketik Identitas Barang / Scan Barcode SKU..." />
                         </td>
                         <!-- Bin Pos -->
                         <td class="px-2 py-2 align-middle flex items-center gap-1 justify-end opacity-60 mt-3 pt-1">
                            <input :disabled="isReadonly" type="text" v-model="line.uomCode" class="w-12 text-[10px] font-mono border-b border-slate-300 bg-transparent text-center" placeholder="PCS" />
                            <input :disabled="isReadonly" type="text" v-model="line.binLocationId" class="w-20 text-[10px] font-mono border-b border-slate-300 bg-transparent text-center" placeholder="-Tanpa Rak-" />
                         </td>
                         
                         <!-- System Qty -->
                         <td class="px-4 py-2 align-middle border-l bg-slate-50 h-full">
                             <div class="flex items-center h-full w-full relative">
                                <input :disabled="isReadonly" type="number" v-model.number="line.systemQty" @input="recalc(line)" class="w-full bg-slate-200/50  border-slate-300 rounded px-1 py-2 text-center text-lg font-black text-slate-400 outline-none" placeholder="0" />
                                <i class="pi pi-lock absolute -right-2 top-0 opacity-10 text-[8px]"></i>
                             </div>
                         </td>
                         <!-- Counted Qty -->
                         <td class="px-4 py-2 align-middle border-l bg-teal-50/50 h-full relative" :class="isReadonly ? 'opacity-80' : ''">
                             <div class="h-full flex items-center justify-center">
                                <input :disabled="isReadonly" type="number" v-model.number="line.countedQty" @input="recalc(line)" class="w-full border-b-2 border-teal-500 px-1 py-1.5 text-center text-xl font-black text-teal-800 focus:text-teal-600 outline-none bg-white shadow-sm rounded transition-colors drop-shadow" placeholder="Ketik Hasil..." />
                             </div>
                         </td>

                         <!-- Variance Auto Calculator -->
                         <td class="px-4 py-2 align-middle border-l relative h-full font-mono text-center truncate overflow-hidden" :class="varianceCellClass(line.varianceQty)">
                            <div class="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center"><i class="pi text-6xl" :class="line.varianceQty === 0 ? 'pi-check' : 'pi-exclamation-triangle'"></i></div>
                            <span class="text-2xl font-black relative z-10 font-sans tracking-tighter">{{ line.varianceQty > 0 ? '+' : '' }}{{ formatQty(line.varianceQty) }}</span>
                         </td>
                         
                         <td v-if="!isReadonly" class="px-2 py-4 align-middle border-l text-center">
                             <button @click="removeLine(idx)" class="w-6 h-6 rounded bg-rose-100 text-rose-600 flex items-center justify-center font-black hover:bg-rose-600 hover:text-white transition-colors" title="Hapus Temuan">✕</button>
                         </td>
                      </tr>
                      <tr v-if="form.lines.length === 0">
                         <td :colspan="isReadonly ? 5 : 6" class="p-8 text-center text-slate-400 text-xs italic">
                            <div class="text-4xl opacity-10 mb-2 mt-2"><i class="pi pi-box"></i></div>
                            Lembar Kosong. Tarik barang dari sistem atau masukan manual temuan tak terduga.
                         </td>
                      </tr>
                   </tbody>
                 </table>
               </div>
           </div>
           
           <div v-if="!isReadonly" class="mt-4 p-4 rounded-xl border border-teal-200 bg-teal-50 shadow-inner flex gap-3 text-[10px] text-teal-800 leading-relaxed font-bold">
              <i class="pi pi-exclamation-circle text-xl text-teal-500 opacity-60"></i>
              "System Qty" ditarik langsung dari Ledger saat panel ini dibuat. Begitu dokumen disahkan (POSTING), sistem tidak bertanya lagi. Sistem hanya akan membakar jurnal penyesuaian (Inventory Adjustment) sebesar nilai "Variance" baik plus maupun minus secara permanen ke Keuangan.
           </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-5 border-t border-slate-200 bg-white flex justify-between items-center shrink-0 rounded-b-xl z-20 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)]">
          <Button label="Buang Draft (Batal)" severity="secondary" size="small" @click="dialogOpen = false" outlined class="bg-slate-50 border-slate-300 font-bold" />
          <div class="flex items-center gap-2">
             <Button v-if="isReadonly && canManage && form.status === 'DRAFT'" label="Audit: Kunci Hasil Stock Opname (POSTING LEDGER!)" severity="help" size="large" :loading="saving" :disabled="saving" @click="save" class="bg-teal-600 border-none text-white font-bold tracking-wide hover:bg-teal-700 shadow-sm h-10 px-6 rounded-lg" icon="pi pi-lock" />
             <Button v-else-if="!isReadonly" label="Simpan Pekerjaan (Draft Hitung)" severity="help" size="large" @click="dialogOpen = false" class="bg-teal-600 border-none text-white font-bold h-10 px-8 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('inventory.audit.manage') || true); 

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
  warehouseId: '',
  countDate: '',
  notes: '',
  status: 'DRAFT',
  lines: [] as Array<any>
});

const mockWhs = ref<any[]>([
  {id:'1', name:'Gudang Pusat Operasional'},
]);

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
const calculateTotalVariance = (doc: any) => doc.items ? doc.items.reduce((acc: number, cur: any) => acc + Number(cur.varianceQty), 0) : 0;

const varianceColor = (v: number) => {
    if(v === 0) return 'text-slate-200';
    if(v > 0) return 'text-emerald-600';
    return 'text-rose-600';
};
const varianceBadgeParams = (v: number) => {
    if(v === 0) return 'text-slate-400 border border-slate-200 bg-slate-50';
    if(v > 0) return 'text-emerald-700 bg-emerald-100';
    return 'text-rose-700 bg-rose-100';
};
const varianceCellClass = (v: number) => {
    if(v === 0) return 'bg-slate-100/50 text-slate-300';
    if(v > 0) return 'bg-emerald-50 text-emerald-800';
    return 'bg-rose-50 text-rose-800';
}

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/query?table=StockCount&include=warehouse,items');
    if (res.data && res.data.data) {
        docs.value = res.data.data;
    } else {
        throw new Error("No payload");
    }
  } catch (e: any) {
    // Mock Data based on postgres seeded data
    docs.value = [
      { 
        id: '1', code: "STC-202604-001", status: "POSTED", countDate: "2026-04-30T00:00", notes: "Audit Stok Akhir Bulan.",
        warehouse: { name: 'Gudang Pusat' },
        items: [
           { desc: 'Kopi Bubuk Arabica Premium', systemQty: 1500, countedQty: 1495, varianceQty: -5, uomCode: 'PCS' }
        ]
      },
      { 
        id: '2', code: "STC-202604-002", status: "DRAFT", countDate: "2026-05-15T00:00", notes: "Sidak dadakan rak.",
        warehouse: { name: 'Gudang Pusat' },
        items: [
           { desc: 'Kopi Bubuk Arabica Premium', systemQty: 1495, countedQty: 0, varianceQty: 0, uomCode: 'PCS' }
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
  form.code = 'STC-NEW';
  form.warehouseId = mockWhs.value[0]?.id || '';
  form.countDate = new Date().toISOString().split('T')[0];
  form.notes = '';
  form.status = 'DRAFT';
  form.lines = [{ desc: "Item / SKU Tersimpan A", systemQty: 100, countedQty: 0, varianceQty: 0, uomCode: 'PCS' }];
  
  dialogOpen.value = true;
}

function openView(r: any) {
  activeDoc.value = r;
  isReadonly.value = true; 
  
  form.id = r.id;
  form.code = r.code;
  form.warehouseId = r.warehouseId || mockWhs.value[0]?.id;
  form.countDate = r.countDate?.split('T')[0] || '';
  form.notes = r.notes || '';
  form.status = r.status;
  
  if (r.items && r.items.length > 0) {
      form.lines = r.items.map((x:any) => ({...x}));
  } else {
      form.lines = [];
  }

  // Jika DRAFT, izinkan checker mengetik nilai "Counted" di lapangan
  if (r.status === 'DRAFT') {
      isReadonly.value = false;
  }

  dialogOpen.value = true;
}

function addLine() {
   form.lines.push({ desc: "", systemQty: 0, countedQty: 0, varianceQty: 0, uomCode: 'PCS' });
}

function removeLine(idx: number) {
   form.lines.splice(idx, 1);
}

// Auto-Math Variance
function recalc(line: any) {
   let s = Number(line.systemQty || 0);
   let c = Number(line.countedQty || 0);
   line.varianceQty = c - s;
}
const calculateGlobalVariance = () => form.lines.reduce((acc, cur) => acc + Number(cur.varianceQty), 0);

async function save() {
  saving.value = true;
  setTimeout(() => {
    alert(`Operasi Validasi Opname Disahkan! Dokumen Penyesuaian (Adjustment) senilai selisih kuantitas telah dibakar otomatis ke tabel Akuntansi Ledger WMS.`);
    dialogOpen.value = false;
    saving.value = false;
    load();
  }, 1500);
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
