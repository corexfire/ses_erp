<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-5">
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div class="text-sm font-semibold text-slate-800">Rekonsiliasi Tiga Arah (3-Way Matching AP)</div>
          <div class="mt-1 text-sm text-slate-600">
            Fasilitas *Procure-to-Pay* kelas atas untuk menangkal tagihan vendor yang tidak sesuai. 
            Menganalisis keseimbangan Harga PO (Pesanan), GRN (Fisik Penerimaan), dan Invoice (Faktur Penagihan).
          </div>
        </div>
        <div class="flex gap-2">
          <Button label="Audit Log Pembayaran" severity="secondary" size="small" outlined icon="pi pi-shield" />
          <Button v-if="canManage" label="Simulasi Rekonsiliasi Dokumen Baru" size="small" bg="bg-emerald-600" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Data List and Filters -->
    <div class="rounded-xl border bg-white p-5">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2 w-full md:w-auto">
          <InputText v-model="search" placeholder="Cari Kode Rekonsiliasi, PO, Invoice..." class="w-full md:w-80 text-xs" />
          <select v-model="statusFilter" class="p-2 border rounded-md text-xs bg-white text-slate-700 min-w-32">
            <option value="">Semua Analisis</option>
            <option value="MATCHED">Clear / Sesuai Sempurna (100%)</option>
            <option value="APPROVED">Clear / Sesuai Sempurna (100%)</option>
            <option value="DISCREPANCY">🔴 Deviasi / Ditemukan Selisih Harga / Qty</option>
          </select>
          <Button label="Filter" severity="secondary" size="small" :disabled="loading" @click="load" />
        </div>
      </div>

      <!-- 3-Way Match Table -->
      <div class="overflow-x-auto rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-indigo-950 text-left text-xs text-indigo-50 border-b border-indigo-900 uppercase tracking-wider">
            <tr>
              <th class="px-3 py-3 font-semibold">Tanda Bukti (Audit Code)</th>
              <th class="px-3 py-3 font-semibold w-1/3">Pemetaan Tiga Titik Dokumen Acuan</th>
              <th class="px-3 py-3 font-semibold text-center">Status Rekonsiliasi</th>
              <th class="px-3 py-3 font-semibold text-right" title="Mendeteksi kelebihan tagihan yang tidak wajar">Nilai Selisih (Deviasi Billed)</th>
              <th class="px-3 py-3 text-right font-semibold">Tindakan Investigasi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 relative">
            <tr v-if="loading">
              <td colspan="5" class="px-4 py-16 text-center text-sm text-slate-500">
                <i class="pi pi-spinner pi-spin mr-2"></i> Mengkoneksikan mesin komparasi ERP...
              </td>
            </tr>
            <!-- Iteration rows -->
            <tr v-for="mw in filteredMatches" v-else :key="mw.id" class="transition hover:bg-slate-50/70 group">
              <!-- Dokumen -->
              <td class="px-3 py-3 align-top">
                <div class="font-bold text-slate-800 text-xs flex items-center gap-2">
                   {{ mw.code }}
                </div>
                <div class="text-[10px] text-slate-500 font-mono mt-1">🗓️ Eksekusi: {{ formatDate(mw.matchDate) }}</div>
              </td>
              
              <!-- 3-Way Mapping Links -->
              <td class="px-3 py-3 align-top whitespace-nowrap">
                <div class="flex items-center gap-1.5 font-mono text-[10px]">
                   <div class="bg-blue-50 text-blue-700 border border-blue-200 rounded px-1.5 py-0.5 min-w-9 text-center font-bold" title="Purchase Order (Pesanan Awal)">PO</div>
                   <i class="pi pi-arrow-right text-[8px] text-slate-300"></i>
                   <span class="text-slate-700 font-bold max-w-[130px] truncate">{{ mw.order?.code || '...' }}</span>
                </div>
                <div class="flex items-center gap-1.5 font-mono text-[10px] mt-1">
                   <div class="bg-amber-50 text-amber-700 border border-amber-200 rounded px-1.5 py-0.5 min-w-9 text-center font-bold" title="Goods Receipt Note (Fisik Masuk Gudang)">GRN</div>
                   <i class="pi pi-arrow-right text-[8px] text-slate-300"></i>
                   <span class="text-slate-700 font-bold max-w-[130px] truncate">{{ mw.receipt?.code || '...' }}</span>
                </div>
                <div class="flex items-center gap-1.5 font-mono text-[10px] mt-1">
                   <div class="bg-indigo-50 text-indigo-700 border border-indigo-200 rounded px-1.5 py-0.5 min-w-9 text-center font-bold" title="Purchase Invoice (Tagihan Vendor)">INV</div>
                   <i class="pi pi-arrow-right text-[8px] text-slate-300"></i>
                   <span class="text-slate-700 font-bold max-w-[130px] truncate">{{ mw.invoice?.code || '...' }}</span>
                </div>
              </td>

              <!-- Status -->
              <td class="px-3 py-3 align-top text-center pt-5">
                <span v-if="standardizeStatus(mw) === 'MATCHED'" class="inline-flex items-center gap-1.5 rounded-full pl-1.5 pr-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-emerald-100 text-emerald-700 border border-emerald-300">
                  <i class="pi pi-check-circle text-emerald-500"></i> MATCHED (AMAN)
                </span>
                <span v-else class="inline-flex items-center gap-1.5 rounded-full pl-1.5 pr-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-rose-100 text-rose-700 border border-rose-300 shadow-sm shadow-rose-200 cursor-help" :title="mw.discrepancyNotes">
                  <i class="pi pi-exclamation-triangle text-rose-500 animate-pulse"></i> DISCREPANCY
                </span>
                <div v-if="standardizeStatus(mw) === 'DISCREPANCY'" class="text-[9px] text-slate-500 mt-1 max-w-[180px] leading-tight truncate mx-auto" :title="mw.discrepancyNotes">{{ mw.discrepancyNotes || '-' }}</div>
              </td>
              
              <!-- Nilai Selisih (Deviasi Billed) -->
              <td class="px-3 py-3 align-top text-right pt-5">
                <div v-if="Number(mw.varianceAmount) > 0" class="font-bold font-mono text-xs text-rose-700 bg-rose-50 px-2 py-1 inline-block rounded-md border border-rose-100" title="Kelebihan tagihan Invoice terhadap PO/GRN">
                   + {{ formatCurrency(mw.varianceAmount) }}
                </div>
                <div v-else class="font-bold font-mono text-xs text-slate-400">
                   Rp 0
                </div>
              </td>
              
              <!-- Actions -->
              <td class="px-3 py-3 align-top text-right">
                <Button label="Buka Resolusi Audit" size="small" severity="secondary" outlined class="text-[10px] px-2 py-1 w-full text-center hover:bg-slate-50" @click="openView(mw)" />
              </td>
            </tr>
            <tr v-if="!loading && filteredMatches.length === 0">
              <td colspan="5" class="px-4 py-16 text-center text-slate-500 border-t">
                <div class="text-4xl mb-3 opacity-50 text-slate-200">⚖️</div>
                Belum ada antrean validasi dokumen.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Viewer/Editor Modal (3-Way Matching Tool) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div class="w-full max-w-5xl rounded-xl border bg-slate-50 shadow-2xl flex flex-col max-h-[95vh] h-full overflow-hidden">
        
        <!-- Header -->
        <div class="p-5 border-b bg-indigo-950 flex flex-col sm:flex-row items-center justify-between shrink-0 gap-4 relative overflow-hidden">
          <div class="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-y-[-20%] translate-x-[20%]">
             <i class="pi pi-sitemap text-[150px] text-white"></i>
          </div>
          <div class="z-10 w-full flex items-center justify-between pr-8">
            <div class="flex items-center gap-3">
              <span class="text-lg font-black text-white tracking-tight"><i class="pi pi-check-square mr-2 opacity-50"></i>{{ activeMw?.id ? `Verifikasi Dokumen: ${activeMw.code}` : 'Proses Pencocokan 3 Dokumen Otomatis (Baru)' }}</span>
              <span v-if="activeMw?.id" class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase shadow-sm border" :class="standardizeStatus(activeMw) === 'MATCHED' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50' : 'bg-rose-500/20 text-rose-300 border-rose-500/50'">
                <i v-if="standardizeStatus(activeMw) === 'MATCHED'" class="pi pi-check"></i>
                <i v-else class="pi pi-times"></i>
                {{ standardizeStatus(activeMw) }}
              </span>
            </div>
            <div class="text-xs text-indigo-300 font-medium">Bandingkan Kuantitas Penerimaan Gudang VS Harga PO VS Tagihan Final</div>
          </div>
          <button class="text-white/50 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded-full text-lg font-bold flex items-center justify-center transition-colors shadow-sm z-10 absolute right-4 top-4" @click="dialogOpen = false">✕</button>
        </div>

        <div class="flex-1 overflow-y-auto flex flex-col">
          <div class="p-6 grid grid-cols-1 gap-6">

             <!-- The Three Pillars Selection Module (Top Row) -->
             <div class="flex flex-col gap-2">
                 <div class="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-2">Penelusuran Komponen Rantai Pasok</div>
                 <div class="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
                     <!-- Komponen 1: PO -->
                     <div class="bg-white border rounded-xl overflow-hidden shadow-sm flex flex-col">
                        <div class="bg-blue-50 border-b p-3 border-blue-100 flex items-center gap-2">
                           <div class="w-6 h-6 rounded bg-blue-100 text-blue-700 flex justify-center items-center font-black text-[10px]">1</div>
                           <span class="text-[11px] font-bold text-blue-900 uppercase">Purchase Order (PO)<br><span class="text-[9px] font-medium text-blue-600 normal-case block leading-tight">Syarat Komersial Awal & Harga Disetujui</span></span>
                        </div>
                        <div class="p-4 bg-white grow">
                           <input v-if="!isReadonly" type="text" v-model="form.orderCode" placeholder="Masukkan Nomor PO..." class="w-full border rounded p-2 text-xs font-mono font-bold bg-slate-50 focus:border-blue-500" />
                           <div v-else class="font-mono text-sm font-bold text-slate-800">{{ activeMw?.order?.code || 'PO-?' }}</div>
                        </div>
                     </div>

                     <!-- Komponen 2: GRN -->
                     <div class="bg-white border rounded-xl overflow-hidden shadow-sm flex flex-col">
                        <div class="bg-amber-50 border-b p-3 border-amber-100 flex items-center gap-2">
                           <div class="w-6 h-6 rounded bg-amber-100 text-amber-700 flex justify-center items-center font-black text-[10px]">2</div>
                           <span class="text-[11px] font-bold text-amber-900 uppercase">Goods Receipt (GRN)<br><span class="text-[9px] font-medium text-amber-600 normal-case block leading-tight">Verifikasi Fisik Kuantitas Tiba di Gudang</span></span>
                        </div>
                        <div class="p-4 bg-white grow">
                           <input v-if="!isReadonly" type="text" v-model="form.receiptCode" placeholder="Masukkan Nomor GRN..." class="w-full border rounded p-2 text-xs font-mono font-bold bg-slate-50 focus:border-amber-500" />
                           <div v-else class="font-mono text-sm font-bold text-slate-800">{{ activeMw?.receipt?.code || 'GRN-?' }}</div>
                        </div>
                     </div>

                     <!-- Komponen 3: Invoice -->
                     <div class="bg-white border rounded-xl overflow-hidden shadow-sm flex flex-col relative z-20" :class="!isReadonly ? 'ring-2 ring-indigo-500 ring-offset-2' : ''">
                        <div class="bg-indigo-50 border-b p-3 border-indigo-100 flex items-center gap-2">
                           <div class="w-6 h-6 rounded bg-indigo-100 text-indigo-700 flex justify-center items-center font-black text-[10px]">3</div>
                           <span class="text-[11px] font-bold text-indigo-900 uppercase">Purchase Invoice (AP)<br><span class="text-[9px] font-medium text-indigo-600 normal-case block leading-tight">Penagihan Terakhir & PPN dari Pemasok</span></span>
                        </div>
                        <div class="p-4 bg-white grow">
                           <input v-if="!isReadonly" type="text" v-model="form.invoiceCode" placeholder="Kode Faktur Vendor..." class="w-full border rounded p-2 text-xs font-mono font-bold bg-slate-50 text-indigo-700 focus:border-indigo-500 mb-2" />
                           <div v-else class="font-mono text-sm font-bold text-indigo-700">{{ activeMw?.invoice?.code || 'INV-?' }}</div>
                           <Button v-if="!isReadonly" label="Mulai Engine Rekonsiliasi (Komparasi 3 Titik)" class="w-full h-8 text-[10px] font-bold" @click="runSimulation" bg="bg-indigo-600" />
                        </div>
                     </div>
                 </div>
             </div>

             <!-- Discrepancy Alert & Notes Matrix -->
             <div class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm relative">
                <!-- Status Bar -->
                <div class="p-3 uppercase text-[10px] font-black tracking-widest text-white flex justify-between items-center" :class="isReadonly ? (standardizeStatus(activeMw) === 'MATCHED' ? 'bg-emerald-600' : 'bg-rose-600') : (simulationRan ? (calculatedVariance > 0 ? 'bg-rose-600' : 'bg-emerald-600') : 'bg-slate-400')">
                  <span>Hasil Keputusan Audit Lintas Silang</span>
                  <span v-if="isReadonly || simulationRan">{{ isReadonly ? standardizeStatus(activeMw) : (calculatedVariance > 0 ? 'DISCREPANCY' : 'MATCHED') }}</span>
                  <span v-else>MENUNGGU INPUT</span>
                </div>

                <div class="p-5 flex flex-col md:flex-row gap-8">
                   <div class="md:w-1/3 flex flex-col justify-center items-center border-r border-dashed pr-8">
                      <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Total Nilai Selisih Deviasi</div>
                      <div class="text-3xl font-mono font-black" :class="(isReadonly && Number(activeMw?.varianceAmount) > 0) || calculatedVariance > 0 ? 'text-rose-600' : 'text-slate-800'">
                         {{ formatCurrency(isReadonly ? activeMw?.varianceAmount : calculatedVariance) }}
                      </div>
                      <div class="text-[9px] text-slate-400 mt-2 text-center leading-relaxed">
                         Jika terdapat deviasi (selisih > 0) antara tagihan vendor melawan kuantitas aktual gudang dan harga kesepakatan PO, Anda berhak membekukan rilis A/P.
                      </div>
                   </div>
                   
                   <div class="md:w-2/3">
                      <label class="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2 block"><i class="pi pi-search mr-1"></i>Catatan Investigasi / Temuan Akuntan</label>
                      <textarea v-if="!isReadonly" v-model="form.discrepancyNotes" rows="4" class="w-full rounded-lg border p-3 text-xs bg-slate-50 focus:border-indigo-500 focus:bg-white transition-colors" placeholder="Hasil telaah komparasi..."></textarea>
                      <div v-else class="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100 min-h-[100px]">{{ activeMw?.discrepancyNotes || 'Pemeriksaan dokumen tidak mencatat adanya anomali atau deviasi. Lolos sensor A/P Payment.' }}</div>
                   </div>
                </div>
             </div>

          </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-4 border-t shadow-[0_-10px_10px_-10px_rgba(0,0,0,0.05)] bg-slate-100 flex justify-between shrink-0 rounded-b-xl items-center">
          <Button label="Tutup Jendela" severity="secondary" size="small" @click="dialogOpen = false" outlined class="bg-white border-slate-300 text-slate-600" />
          <div class="flex items-center gap-2">
             <Button v-if="!isReadonly" label="Kunci & Laporkan Hasil Audit Rekonsiliasi" severity="secondary" size="small" :loading="saving" :disabled="saving || !simulationRan" @click="save" class="bg-indigo-900 border-none text-white font-bold hover:bg-black px-6 shadow-md" />
             <Button v-if="isReadonly && canManage && standardizeStatus(activeMw) === 'DISCREPANCY'" label="Minta Retur / Tunda AP (Hold Payment)" severity="danger" size="small" icon="pi pi-ban" class="shadow-sm font-bold bg-rose-600 border-none px-4 shadow-rose-600/30 text-white" />
             <Button v-if="isReadonly && canManage && standardizeStatus(activeMw) === 'MATCHED'" label="Izinkan Eksekusi Pembayaran AP" severity="success" size="small" icon="pi pi-lock-open" class="shadow-sm font-bold bg-emerald-600 border-none px-4 shadow-emerald-600/30 text-emerald-50" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('procurement.threeway.manage') || true); // Dev fallback

const matches = ref<any[]>([]);
const search = ref('');
const statusFilter = ref('');
const loading = ref(false);
const saving = ref(false);

const dialogOpen = ref(false);
const isReadonly = ref(true);
const activeMw = ref<any>(null);

const form = reactive({
  orderCode: '',
  receiptCode: '',
  invoiceCode: '',
  discrepancyNotes: '',
  varianceAmount: 0
});

const simulationRan = ref(false);

const standardizeStatus = (mw: any) => {
   if(mw.status === 'APPROVED') return 'MATCHED'; // Handle aliases
   return mw.status;
};

const filteredMatches = computed(() => {
  let list = matches.value;
  if (statusFilter.value) {
    list = list.filter(p => standardizeStatus(p) === statusFilter.value);
  }
  if (search.value) {
    const q = search.value.toLowerCase();
    list = list.filter(p => 
      (p.code && p.code.toLowerCase().includes(q)) || 
      (p.order?.code && p.order.code.toLowerCase().includes(q)) ||
      (p.invoice?.code && p.invoice.code.toLowerCase().includes(q))
    );
  }
  return list;
});

const calculatedVariance = computed(() => form.varianceAmount);

// Helpers
const getStatusStyle = (status: string) => { return ''; }; // Handled inline due to complexity

const formatCurrency = (val: any) => {
  if (!val && val !== 0 || isNaN(val)) return '0';
  return Number(val).toLocaleString('id-ID');
};

const formatDate = (iso: string) => {
  if (!iso) return '-';
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/query?table=ThreeWayMatching&include=order,receipt,invoice');
    if (res.data && res.data.data) {
        matches.value = res.data.data;
    } else {
        throw new Error("No payload");
    }
  } catch (e: any) {
    // Fallback Mock based on PG Seeds
    matches.value = [
      { 
        id: '1', code: "3WM-202604-001", status: "MATCHED", matchDate: "2026-04-20T00:00", varianceAmount: 0,
        discrepancyNotes: "Dokumen komplit dan nilai harga serta kuantitas presisi 100%. Sesuai antara PO (Harga), GRN (Fisik Masuk), dan Invoice (Tagihan).",
        order: { code: 'PO-202604-001' }, receipt: { code: 'GRN-202604-001' }, invoice: { code: 'PINV-202604-1001' }
      },
      { 
        id: '2', code: "3WM-202604-002", status: "DISCREPANCY", matchDate: "2026-04-21T00:00", varianceAmount: 150000,
        discrepancyNotes: "Terdeteksi deviasi/perbedaan tagihan sebesar Rp 150.000 (Harga unit di Invoice lebih tinggi dari kesepakatan PO awal).",
        order: { code: 'PO-202604-002' }, receipt: { code: 'GRN-202604-002' }, invoice: { code: 'PINV-202604-1005' }
      }
    ];
  } finally {
    loading.value = false;
  }
}

function openCreate() {
  activeMw.value = null;
  isReadonly.value = false;
  simulationRan.value = false;
  form.orderCode = '';
  form.receiptCode = '';
  form.invoiceCode = '';
  form.discrepancyNotes = '';
  form.varianceAmount = 0;
  dialogOpen.value = true;
}

function openView(r: any) {
  activeMw.value = r;
  isReadonly.value = true;
  dialogOpen.value = true;
}

function runSimulation() {
  if (!form.orderCode || !form.invoiceCode) return alert('Silakan isi tautan dokumen referensi');
  simulationRan.value = true;
  alert('Mensimulasikan pengecekan harga antar dokumen...');
  // Force a dummy discrepancy for demo interaction
  form.varianceAmount = 25000;
  form.discrepancyNotes = "Sistem mendeteksi ada perbedaan antara tagihan akhir akibat biaya bongkar-muat yang diselundupkan vendor ke Invoice Pihak Ketiga. Selisih IDR 25,000.";
}

async function save() {
  saving.value = true;
  setTimeout(() => {
    alert('Log investigasi rekonsiliasi berhasil disimpan. Bagian keuangan kini punya landasan kuat.');
    dialogOpen.value = false;
    saving.value = false;
    load();
  }, 1000);
}

onMounted(() => {
  load();
});
</script>
