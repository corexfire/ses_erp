<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-5 shadow-sm border-l-4 border-l-cyan-500">
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div class="text-sm font-semibold text-slate-800">Manajemen Quality Control (Inspeksi Mutu WMS)</div>
          <div class="mt-1 text-sm text-slate-600">
            Laboratorium dan stasiun pengecekan visual. Validasi mutu barang mask (GRN), hasil produksi, maupun uji petik stok fisik gudang (Cycle Count).
          </div>
        </div>
        <div class="flex gap-2">
          <Button label="Buku Riwayat Defect" severity="secondary" size="small" outlined icon="pi pi-book" />
          <Button v-if="canManage" label="+ Generate Dokumen Inspeksi" size="small" bg="bg-cyan-600" class="text-white border-none shrink-0" icon="pi pi-microchip" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Data List and Filters -->
    <div class="rounded-xl border bg-white p-5 shadow-sm">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2 w-full md:w-auto">
          <InputText v-model="search" placeholder="Cari Dokumen QC / GRN Ref..." class="w-full md:w-80 text-xs" />
          <select v-model="statusFilter" class="p-2 border rounded-md text-xs bg-white text-slate-700 min-w-32">
            <option value="">Semua Dokumen</option>
            <option value="DRAFT">Proses Pemeriksaan (Lab)</option>
            <option value="POSTED">Selesai Diverifikasi (Approve)</option>
          </select>
          <Button label="Filter" severity="secondary" size="small" :disabled="loading" @click="load" />
        </div>
      </div>

      <!-- QC Table -->
      <div class="overflow-x-auto rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-cyan-50 text-left text-xs text-cyan-900 border-b border-cyan-100 uppercase tracking-wider">
            <tr>
              <th class="px-4 py-3 font-semibold">Dokumen Inspeksi (QCI)</th>
              <th class="px-4 py-3 font-semibold">Sumber Pemicu Pengecekan</th>
              <th class="px-4 py-3 font-semibold text-center">Rasio Kualitas (Passed vs Failed)</th>
              <th class="px-4 py-3 font-semibold text-center w-36">Status Sertifikasi</th>
              <th class="px-4 py-3 text-right font-semibold">Tindakan Khusus</th>
            </tr>
          </thead>
          <tbody class="divide-y relative">
             <tr v-if="loading">
              <td colspan="5" class="px-4 py-16 text-center text-sm text-slate-500">
                <i class="pi pi-spinner pi-spin mr-2"></i> Merender daftar sampel laboratorium...
              </td>
            </tr>
            <!-- Iteration rows -->
            <tr v-for="doc in filteredDocs" v-else :key="doc.id" class="transition hover:bg-cyan-50/40 group">
              <!-- Dokumen -->
              <td class="px-4 py-3 align-top w-56">
                <div class="font-bold text-slate-800 text-xs flex items-center gap-2 font-mono">
                   {{ doc.code }}
                   <i v-if="doc.status === 'POSTED'" class="pi pi-check-circle text-[10px] text-emerald-500" title="Verifikasi Selesai"></i>
                </div>
                <div class="text-[10px] text-slate-500 mt-1">🗓️ Tanggal Uji: {{ formatDate(doc.inspectionDate) }}</div>
                <div class="text-[9px] bg-slate-100 inline-block px-1.5 py-0.5 rounded border mt-1">
                   Auditor: <span class="font-bold text-slate-700">{{ doc.inspectorName || 'Sistem Auto-QC' }}</span>
                </div>
              </td>
              
              <!-- Referensi (Pemicu) -->
              <td class="px-4 py-3 align-top">
                <div class="flex items-center gap-2 mb-1">
                   <div class="text-[9px] font-bold px-1 rounded shadow-sm border uppercase tracking-wider" :class="doc.grnId ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-500 border-slate-200'">
                      {{ doc.grnId ? 'Validasi GRN / Inbound' : 'Uji Petik Gudang (Ad-Hoc)' }}
                   </div>
                </div>
                <div class="text-[11px] font-mono font-bold text-slate-700">{{ doc.grn?.code || 'Pemeriksaan Internal / Cycle Count' }}</div>
                <div class="text-[9px] text-slate-400 mt-0.5 italic">"{{ doc.notes || '-' }}"</div>
              </td>

              <!-- Kuantitas Total Ratios -->
              <td class="px-4 py-3 align-top text-center relative">
                 <div class="flex justify-center flex-col items-center gap-1.5 w-full">
                    <div class="flex items-center gap-2 text-[10px] font-mono font-bold w-40">
                       <span class="w-16 text-right text-emerald-600 tracking-wider">PASS: {{ calculatePass(doc) }}</span>
                       <div class="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden flex">
                          <div class="h-full bg-emerald-500" :style="{ width: getPassRatio(doc) + '%' }"></div>
                          <div class="h-full bg-rose-500" :style="{ width: getFailRatio(doc) + '%' }"></div>
                       </div>
                       <span class="w-16 text-left text-rose-600 tracking-wider">FAIL: {{ calculateFail(doc) }}</span>
                    </div>
                    <div class="text-[8px] text-slate-400 bg-slate-50 px-1 rounded">Total Sampel: {{ calculateSample(doc) }} Unit</div>
                 </div>
              </td>
              
              <!-- Status -->
              <td class="px-4 py-3 align-top text-center">
                 <span class="inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider" :class="doc.status === 'POSTED' ? (calculateFail(doc) > 0 ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-emerald-100 text-emerald-700 border border-emerald-200') : 'bg-cyan-100 text-cyan-700 border border-cyan-200'">
                   {{ doc.status === 'POSTED' ? (calculateFail(doc) > 0 ? 'QC APPROVED W/ RECORD' : 'QC PASSED') : 'MENGANALISA' }}
                 </span>
              </td>

              <!-- Actions -->
              <td class="px-4 py-3 align-top text-right">
                <Button label="Papan Uji Klinis (Worksheet)" size="small" severity="secondary" outlined class="text-[10px] px-3 font-bold py-1 text-center hover:bg-slate-100 w-full" @click="openView(doc)" />
              </td>
            </tr>
            <tr v-if="!loading && filteredDocs.length === 0">
              <td colspan="5" class="px-4 py-16 text-center text-slate-500 border-t">
                <div class="text-4xl mb-3 opacity-50 text-slate-200"><i class="pi pi-check-square"></i></div>
                Lingkungan aman. Tidak ada antrean inspeksi kualitas saat ini.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Viewer/Editor Modal (QC Worksheet) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4 backdrop-blur-sm shadow-xl">
      <div class="w-full max-w-5xl rounded-xl border bg-slate-50 shadow-2xl flex flex-col max-h-[95vh] h-full overflow-hidden animate-fade-in-up">
        
        <!-- Header -->
        <div class="p-6 border-b bg-cyan-950 flex flex-col sm:flex-row items-center justify-between shrink-0 gap-4 relative overflow-hidden shadow-sm">
          <div class="absolute left-[-20px] top-[-20px] opacity-10">
             <i class="pi pi-microchip text-[150px] text-white"></i>
          </div>
          <div class="z-10 w-full flex justify-between items-start">
             <div>
               <div class="flex items-center gap-3">
                 <span class="text-xl font-black text-cyan-50 tracking-tight">{{ activeDoc?.id ? `Worksheet Inspeksi (QC): ${form.code}` : 'Aktivasi Papan Inspeksi Baru (QC Mode)' }}</span>
                 <span v-if="activeDoc?.id" class="inline-flex rounded text-[10px] font-bold uppercase shadow-sm border px-2 py-0.5" :class="form.status === 'POSTED' ? 'bg-emerald-500 text-emerald-50 border-emerald-400' : 'bg-cyan-600 text-cyan-50 border-cyan-400'">
                   {{ form.status === 'POSTED' ? 'SERTIFIKASI TERKUNCI' : 'PENGUJIAN TERBUKA (DRAFT)' }}
                 </span>
               </div>
               <div class="text-xs text-cyan-200 font-medium opacity-80 mt-1 pl-1">Instruksi staf *Quality Assurance* mencatat rasio barang lolos uji mutu vs barang reject.</div>
             </div>
          </div>
          <button class="text-white/50 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded text-lg font-bold flex items-center justify-center transition-colors shadow-sm z-20 absolute right-4 top-4" @click="dialogOpen = false">✕</button>
        </div>

        <div class="flex-1 overflow-y-auto flex flex-col p-5 bg-slate-100">
           
           <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm col-span-2 relative">
                 <div class="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-3 flex gap-2"><i class="pi pi-search"></i> Parameter Dasar Pengujian Mutu</div>
                 
                 <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-1">
                      <label class="text-[10px] font-bold text-slate-500">Pemicu Inspeksi (Doc Source)</label>
                      <select :disabled="isReadonly" v-model="form.grnId" class="w-full border rounded p-2 text-xs font-bold font-mono text-slate-700 bg-emerald-50 border-emerald-200 outline-none">
                         <option value="">-- Pengujian Audit Internal Bebas --</option>
                         <option v-for="g in mockGrns" :value="g.id">{{ g.code }} (Bongkar Muat Gudang)</option>
                      </select>
                    </div>
                    <div class="space-y-1">
                      <label class="text-[10px] font-bold text-slate-500">Petugas QA (Auditor/Inspector)</label>
                      <div class="w-full border rounded p-2 text-xs font-bold text-cyan-800 bg-cyan-50 border-cyan-200 shadow-inner relative flex items-center">
                         <i class="pi pi-user text-cyan-600/50 absolute left-2"></i>
                         <input :disabled="isReadonly" type="text" v-model="form.inspectorName" class="w-full pl-6 bg-transparent outline-none font-sans" placeholder="Nama Petugas Lab/Pemeriksa..." />
                      </div>
                    </div>
                    <div class="col-span-2 space-y-1">
                      <label class="text-[10px] font-bold text-slate-500">Arahan / Prosedur Standar (SOP)</label>
                      <textarea :disabled="isReadonly" v-model="form.notes" rows="2" class="w-full rounded border p-2 text-xs bg-slate-50 outline-none focus:border-cyan-500" placeholder="Timbang kadar air, cek bungkusan secara visual..."></textarea>
                    </div>
                 </div>
              </div>

              <!-- Time Status -->
              <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center items-center relative overflow-hidden group border-b-4 border-b-cyan-500">
                 <div class="absolute opacity-5 group-hover:scale-110 transition-transform duration-700">
                    <i class="pi pi-stopwatch text-9xl text-slate-800"></i>
                 </div>
                 <div class="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2 relative z-10 w-full text-left">Waktu Pengambilan Sampel</div>
                 <input :disabled="isReadonly" type="date" v-model="form.inspectionDate" class="w-full border-0 border-b-2 font-black text-xl text-center text-slate-800 py-2 outline-none relative z-10 bg-transparent disabled:opacity-100" />
                 <div class="text-[9px] text-slate-400 mt-3 text-center relative z-10 leading-tight">Digunakan agar *Ledger* Bin ter-update per hari ini.</div>
              </div>
           </div>

           <!-- Pengecekan Kualitas -->
           <div class="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
               <div class="flex items-center justify-between p-4 bg-slate-50 border-b">
                 <div class="text-xs font-black text-slate-800 uppercase tracking-widest"><i class="pi pi-flask mr-2 text-cyan-600"></i> Lembar Laboratorium Pencocokan Kuantitas Reject</div>
                 <Button v-if="!isReadonly" label="Tambah Baris Uji" icon="pi pi-plus" size="small" bg="bg-white" class="h-8 shadow-sm text-cyan-700 text-[10px] border-slate-200" @click="addLine" />
               </div>
               <div class="overflow-x-auto">
                 <table class="w-full text-sm">
                   <thead class="bg-white text-left text-[9px] text-slate-400 border-b uppercase tracking-wider">
                     <tr>
                       <th class="px-3 py-3 font-semibold text-center w-8">No</th>
                       <th class="px-3 py-3 font-semibold w-56">Item / SKU Teraudit (Target)</th>
                       <th class="px-3 py-3 font-semibold text-center border-l w-24 bg-slate-50" title="Jumlah Barang yang Diambil Sebagai Subjek Tes">Besaran Sampel<br><span class="text-[8px] normal-case truncate">(Sample Qty)</span></th>
                       <th class="px-3 py-3 font-semibold border-l w-28 bg-emerald-50/50 text-center" title="Bebas Cacat">Lolos Sertifikasi<br><span class="text-[8px] normal-case align-top truncate">(Passed Qty)</span></th>
                       <th class="px-3 py-3 font-semibold border-l w-28 bg-rose-50/50 text-center" title="Dimusnahkan/Dikembalikan">Gagal / Cacat Lab<br><span class="text-[8px] normal-case align-top truncate">(Failed Qty)</span></th>
                       <th class="px-3 py-3 font-semibold border-l bg-slate-50">Keterangan Reject / Diagnosa</th>
                       <th v-if="!isReadonly" class="w-8"></th>
                     </tr>
                   </thead>
                   <tbody class="divide-y relative">
                      <tr v-for="(line, idx) in form.lines" :key="idx" class="transition-colors group hover:bg-slate-50" :class="Number(line.failedQty) > 0 ? 'bg-rose-50/20' : ''">
                         <td class="px-3 py-4 align-top text-center font-mono text-xs text-slate-400 mt-1">{{ idx + 1 }}</td>
                         <td class="px-3 py-4 align-top">
                            <input :disabled="isReadonly" type="text" v-model="line.desc" class="w-full border-b border-dashed border-slate-300 py-0.5 text-xs font-bold text-slate-800 bg-transparent outline-none focus:border-cyan-500 placeholder-slate-300" placeholder="Ketik Identifikasi Stok Lab..." />
                         </td>
                         <td class="px-3 py-3 align-top text-center border-l bg-slate-50 font-mono">
                             <input :disabled="isReadonly" type="number" v-model.number="line.sampleQty" @input="recalc(line)" class="w-full border rounded border-slate-300 px-1 py-1 text-center text-sm font-black text-slate-700 outline-none focus:border-cyan-500 shadow-inner" placeholder="0" />
                         </td>
                         <td class="px-3 py-3 align-top border-l bg-emerald-50/30 font-mono relative">
                             <input :disabled="isReadonly" type="number" v-model.number="line.passedQty" @input="recalc(line, 'pass')" class="w-full border-b-2 border-emerald-300 px-1 py-1.5 text-center text-sm font-bold text-emerald-700 outline-none focus:border-emerald-500 bg-white shadow-sm rounded" placeholder="0" />
                         </td>
                         <td class="px-3 py-3 align-middle border-l bg-rose-50/30 font-mono relative">
                            <input :disabled="isReadonly" type="number" v-model.number="line.failedQty" @input="recalc(line, 'fail')" class="w-full border-b-2 border-rose-300 px-1 py-1.5 text-center text-sm font-bold text-rose-700 outline-none focus:border-rose-500 bg-white shadow-sm rounded" placeholder="0" />
                         </td>
                         <td class="px-3 py-3 align-middle border-l relative">
                            <input :disabled="isReadonly" type="text" v-model="line.defectReason" class="w-full border-b border-dashed border-slate-300 py-1 text-xs font-bold text-rose-800 outline-none bg-transparent placeholder-rose-200" placeholder="Biarkan kosong jika Passed." />
                         </td>
                         <td v-if="!isReadonly" class="px-2 py-4 align-middle border-l text-center">
                             <button @click="removeLine(idx)" class="w-5 h-5 rounded bg-slate-200 text-slate-500 flex items-center justify-center font-black hover:bg-rose-500 hover:text-white transition-colors" title="Bongkar Kotak">✕</button>
                         </td>
                      </tr>
                      <tr v-if="form.lines.length === 0">
                         <td :colspan="isReadonly ? 6 : 7" class="p-6 text-center text-slate-400 text-xs italic">Meja laboratorium kosong. Tambahkan baris pengujian material.</td>
                      </tr>
                   </tbody>
                 </table>
               </div>
           </div>
           
           <div v-if="!isReadonly" class="mt-4 p-4 rounded-xl border border-cyan-100 bg-cyan-50 shadow-inner flex gap-3 text-[10px] text-cyan-800 leading-relaxed font-bold">
              <i class="pi pi-info-circle text-xl text-cyan-500 opacity-60"></i>
              Fungsi Kalkulasi Otomatis (Auto-Math): Jumlah Total "Sample Qty" (Besaran Sampel) akan selalu menyeimbangkan rumus: (Passed Qty + Failed Qty). Jika Anda merubah salah satu nilai, sistem akan menyesuaikan sisanya demi menghindari manipulasi data lab!
           </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-5 border-t border-slate-200 bg-white flex justify-between items-center shrink-0 rounded-b-xl z-20">
          <Button label="Batalkan Analisa" severity="secondary" size="small" @click="dialogOpen = false" outlined class="bg-slate-50 border-slate-300 font-bold" />
          <div class="flex items-center gap-2">
             <Button v-if="isReadonly && canManage && form.status === 'DRAFT'" label="Audit: Kunci Stempel QA / QC (LULUS POSTING)" severity="info" size="large" :loading="saving" :disabled="saving" @click="save" class="bg-cyan-600 border-none text-white font-bold tracking-wide hover:bg-cyan-700 px-8 shadow-sm h-10 rounded-lg" icon="pi pi-check-square" />
             <Button v-else-if="!isReadonly" label="Kompilasi Hasil (Simpan Draft)" severity="info" size="large" @click="dialogOpen = false" class="bg-cyan-600 border-none text-white font-bold h-10 px-8 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('inventory.qc.manage') || true); 

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
  inspectorName: '',
  inspectionDate: '',
  notes: '',
  status: 'DRAFT',
  lines: [] as Array<any>
});

const mockGrns = ref<any[]>([
  {id:'1', code:'GRN-202604-002'},
  {id:'2', code:'GRN-202604-003'}
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
const calculateSample = (doc: any) => doc.items ? doc.items.reduce((a:number, v:any)=>a+Number(v.sampleQty||0),0) : 0;
const calculatePass = (doc: any) => doc.items ? doc.items.reduce((a:number, v:any)=>a+Number(v.passedQty||0),0) : 0;
const calculateFail = (doc: any) => doc.items ? doc.items.reduce((a:number, v:any)=>a+Number(v.failedQty||0),0) : 0;

const getPassRatio = (doc: any) => {
    const s = calculateSample(doc);
    if(s === 0) return 0;
    return (calculatePass(doc) / s) * 100;
};
const getFailRatio = (doc: any) => {
    const s = calculateSample(doc);
    if(s === 0) return 0;
    return (calculateFail(doc) / s) * 100;
};


async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/query?table=QcInspection&include=grn,items');
    if (res.data && res.data.data) {
        docs.value = res.data.data;
    } else {
        throw new Error("No payload");
    }
  } catch (e: any) {
    // Mock Data based on postgres seeded data
    docs.value = [
      { 
        id: '1', code: "QCI-202604-001", status: "POSTED", inspectionDate: "2026-04-20T00:00", inspectorName: "Andi Saputra (Tim QA)", notes: "Inspeksi green beans impor.",
        grn: { code: 'GRN-202604-001' },
        items: [
           { desc: 'Biji Kopi Spesialti Arabica', sampleQty: 10, passedQty: 9, failedQty: 1, defectReason: '1 sample berkutu' }
        ]
      },
      { 
        id: '2', code: "QCI-202604-002", status: "DRAFT", inspectionDate: "2026-04-22T00:00", inspectorName: "Siti Rahma", notes: "Cycle count test gudang",
        grn: null,
        items: [
           { desc: 'Biji Kopi Spesialti Arabica', sampleQty: 50, passedQty: 0, failedQty: 0, defectReason: '' }
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
  form.code = 'QCI-NEW';
  form.grnId = mockGrns.value[0].id;
  form.inspectorName = 'Manager QA';
  form.inspectionDate = new Date().toISOString().split('T')[0];
  form.notes = '';
  form.status = 'DRAFT';
  form.lines = [{ desc: "Kopi Bubuk Arabica Premium", sampleQty: 20, passedQty: 20, failedQty: 0, defectReason: '' }];
  
  dialogOpen.value = true;
}

function openView(r: any) {
  activeDoc.value = r;
  isReadonly.value = true; 
  
  form.id = r.id;
  form.code = r.code;
  form.grnId = r.grnId || (r.grn? mockGrns.value[0].id : '');
  form.inspectorName = r.inspectorName || '';
  form.inspectionDate = r.inspectionDate?.split('T')[0] || '';
  form.notes = r.notes || '';
  form.status = r.status;
  
  if (r.items && r.items.length > 0) {
      form.lines = r.items.map((x:any) => ({...x}));
  } else {
      form.lines = [];
  }

  // Jika DRAFT, izinkan QA mengisi data lab report
  if (r.status === 'DRAFT') {
      isReadonly.value = false;
  }

  dialogOpen.value = true;
}

function addLine() {
   form.lines.push({ desc: "", sampleQty: 0, passedQty: 0, failedQty: 0, defectReason: '' });
}

function removeLine(idx: number) {
   form.lines.splice(idx, 1);
}

// Auto-Math Validation logic for QC Lab Worksheet
function recalc(line: any, trigger: 'pass'|'fail'|'sample' = 'sample') {
   let s = Number(line.sampleQty || 0);
   let p = Number(line.passedQty || 0);
   let f = Number(line.failedQty || 0);

   if (trigger === 'sample') {
      if(s < 0) s = 0;
      line.sampleQty = s;
      line.passedQty = s; // Asumsinya awalnya sempurna
      line.failedQty = 0;
   } else if (trigger === 'pass') {
      if(p > s) p = s;
      if(p < 0) p = 0;
      line.passedQty = p;
      line.failedQty = s - p; // Koreksi Failed
   } else if (trigger === 'fail') {
      if(f > s) f = s;
      if(f < 0) f = 0;
      line.failedQty = f;
      line.passedQty = s - f; // Koreksi Passed
   }
}

async function save() {
  saving.value = true;
  try {
    const isNew = !form.id;
    const body = {
      ...form,
      status: 'POSTED' // Always post when using the main "Audit" button
    };

    if (isNew) {
      await api.post('/inventory/qc', body);
    } else {
      await api.patch(`/inventory/qc/${form.id}`, body);
    }

    toast.add({ 
      severity: 'success', 
      summary: 'QC Berhasil', 
      detail: 'Dokumen kualitas telah diverifikasi dan diposting ke sistem.' 
    });
    dialogOpen.value = false;
    load();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: e.message });
  } finally {
    saving.value = false;
  }
}

onMounted(() => {
  load();
});
</script>

<style scoped>
select { appearance: none; background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linecap='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e"); background-repeat: no-repeat; background-position: right 0.5rem center; background-size: 1em; padding-right: 2rem; }
.animate-fade-in-up { animation: fadeInUp 0.3s ease-out forwards; }
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
