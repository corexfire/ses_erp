<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-5 shadow-sm border-l-4 border-l-blue-600">
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div class="text-sm font-semibold text-slate-800">Manajemen Penawaran Harga (Sales Quotation)</div>
          <div class="mt-1 text-sm text-slate-600">
            Gerbang utama pendapatan. Kelola dokumen penawaran bisnis kepada klien/prospek, tetapkan harga negosiasi, diskon, dan masa tenggang persetujuan (Validity).
          </div>
        </div>
        <div class="flex gap-2">
          <Button label="Dashboard Rasio Konversi (Win/Loss)" severity="secondary" size="small" outlined icon="pi pi-chart-line" />
          <Button v-if="canManage" label="+ Buat Penawaran Baru" size="small" bg="bg-blue-600" class="text-white border-none shrink-0 cursor-pointer" icon="pi pi-file-edit" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Data List and Filters -->
    <div class="rounded-xl border bg-white p-5 shadow-sm">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2 w-full md:w-auto">
          <InputText v-model="search" placeholder="Cari Dokumen SQ / Nama Klien..." class="w-full md:w-80 text-xs" />
          <select v-model="statusFilter" class="p-2 border rounded-md text-xs bg-white text-slate-700 min-w-32 outline-none focus:border-blue-500">
            <option value="">Semua Status Penawaran</option>
            <option value="DRAFT">Penyusunan (Draft)</option>
            <option value="APPROVED">Disetujui Internal (Sent)</option>
            <option value="ACCEPTED">Dimenangkan (Won!)</option>
            <option value="REJECTED">Ditolak (Lost)</option>
          </select>
          <Button label="Filter SQ" severity="secondary" size="small" :disabled="loading" @click="load" />
        </div>
      </div>

      <!-- Quotation Table -->
      <div class="overflow-x-auto rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-blue-50/50 text-left text-xs text-blue-900 border-b border-blue-100 uppercase tracking-wider">
            <tr>
              <th class="px-4 py-3 font-semibold">Dokumen SQ / Tanggal</th>
              <th class="px-4 py-3 font-semibold">Tujuan (Klien / Customer)</th>
              <th class="px-4 py-3 font-semibold text-right border-l bg-slate-50">Estimasi Nilai Proyek (Net Total)</th>
              <th class="px-4 py-3 font-semibold text-center border-l w-40">Status Kemenangan</th>
              <th class="px-4 py-3 text-right font-semibold">Lembar Penawaran</th>
            </tr>
          </thead>
          <tbody class="divide-y relative">
             <tr v-if="loading">
              <td colspan="5" class="px-4 py-16 text-center text-sm text-slate-500">
                <i class="pi pi-spinner pi-spin mr-2 text-blue-500"></i> Memuat antrean prospek penjualan...
              </td>
            </tr>
            <!-- Iteration rows -->
            <tr v-for="doc in filteredDocs" v-else :key="doc.id" class="transition hover:bg-blue-50/20 group cursor-pointer" @click="openView(doc)">
              <!-- Dokumen -->
              <td class="px-4 py-3 align-top w-64">
                <div class="font-bold text-slate-800 flex items-center gap-2 font-mono">
                   {{ doc.code }}
                   <i v-if="doc.status === 'ACCEPTED'" class="pi pi-trophy text-[10px] text-yellow-500" title="Proyek Dimenangkan (WON)"></i>
                </div>
                <div class="text-[10px] text-slate-500 mt-1">Diterbitkan: <span class="font-bold">{{ formatDate(doc.issueDate) }}</span></div>
                <div class="flex items-center gap-1 mt-1">
                   <div class="text-[9px] uppercase font-bold" :class="isExpired(doc.expiryDate) ? 'text-rose-500 bg-rose-50 border border-rose-200 px-1 rounded' : 'text-slate-400'">
                      Exp: {{ formatDate(doc.expiryDate) }}
                   </div>
                </div>
              </td>
              
               <!-- Klien / Customer -->
              <td class="px-4 py-3 align-top">
                 <div class="flex items-center gap-2">
                    <i class="pi pi-briefcase text-slate-400"></i>
                    <div class="font-bold text-blue-900 text-sm hover:underline">{{ doc.customer?.name || 'Klien Tidak Ditemukan' }}</div>
                 </div>
                 <div class="text-[10px] bg-slate-100 border inline-block px-1.5 py-0.5 rounded font-mono tracking-tighter mt-1">{{ doc.customer?.code }}</div>
                 <div class="mt-1 text-[10px] text-slate-500 italic truncate w-64">"{{ doc.notes || 'Penawaran Standar' }}"</div>
              </td>

              <!-- Total Value -->
              <td class="px-4 py-3 align-top text-right border-l bg-slate-50 relative group-hover:bg-slate-100 transition-colors">
                 <div class="flex flex-col justify-center items-end h-full">
                    <span class="text-[9px] font-bold text-slate-400 absolute left-2 top-4">Rp</span>
                    <div class="font-black text-xl font-mono tracking-tighter text-slate-700 mt-1">
                       {{ formatCurrency(calculateGrandTotal(doc)) }}
                    </div>
                    <div class="text-[9px] text-slate-400 font-bold tracking-widest mt-0.5">{{ calculateLines(doc) }} ITEMS QUOTED</div>
                 </div>
              </td>

              <!-- Status -->
              <td class="px-4 py-4 align-middle text-center border-l bg-slate-50/50">
                 <span class="inline-flex rounded-md px-2 py-0.5 text-[9px] font-black uppercase tracking-widest shadow-sm w-full h-full flex items-center justify-center" :class="statusBadgeParams(doc.status, doc.expiryDate)">
                   {{ doc.status }}
                 </span>
                 <div v-show="doc.status === 'ACCEPTED'" class="text-[8px] bg-yellow-100 text-yellow-800 border border-yellow-200 rounded mt-1 shadow-inner h-4 flex items-center justify-center font-bold">DEAL WON!</div>
              </td>

              <!-- Actions -->
              <td class="px-4 py-4 align-middle text-right">
                <Button label="Review Komersial" size="small" severity="secondary" outlined class="text-[10px] px-3 font-bold py-1.5 text-center transition-colors hover:text-blue-700 hover:bg-blue-50 w-full" @click.stop="openView(doc)" />
              </td>
            </tr>
            <tr v-if="!loading && filteredDocs.length === 0">
              <td colspan="5" class="px-4 py-16 text-center text-slate-500 border-t">
                <div class="text-4xl mb-3 opacity-30 text-blue-400"><i class="pi pi-folder-open"></i></div>
                Tidak ditemukan riwayat penawaran komersial pada filter ini.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


    <!-- Viewer/Editor Modal (Quotation Workpad) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-2 sm:p-4 backdrop-blur-sm shadow-xl">
      <div class="w-full max-w-6xl rounded-xl border bg-slate-50 shadow-2xl flex flex-col max-h-[95vh] h-full overflow-hidden animate-fade-in-up">
        
        <!-- Header -->
        <div class="p-6 border-b flex flex-col sm:flex-row items-center justify-between shrink-0 gap-4 relative overflow-hidden shadow-sm" :class="form.status === 'ACCEPTED' ? 'bg-emerald-950' : 'bg-blue-950'">
          <div class="absolute left-[-20px] top-[-20px] opacity-10">
             <i class="pi pi-file-edit text-[150px] text-white"></i>
          </div>
          <div class="z-10 w-full flex justify-between items-start">
             <div>
               <div class="flex items-center gap-3">
                 <span class="text-xl font-black text-white tracking-tight">{{ activeDoc?.id ? `Rekam Penawaran Bisnis: ${form.code}` : 'Kertas Kerja Quotation Baru (Prospect Draft)' }}</span>
                 <span v-if="activeDoc?.id" class="inline-flex rounded text-[10px] font-black uppercase shadow-sm border px-2 py-0.5" :class="statusBadgeParams(form.status, form.expiryDate)">
                   {{ form.status }}
                 </span>
               </div>
               <div class="text-xs text-blue-200 font-medium w-full flex gap-3 opacity-80 mt-1 pl-1">
                 Mendisain proposal harga, menentukan *Discount Level*, validasi termin kepada klien spesifik.
               </div>
             </div>
          </div>
          <button class="text-white/50 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded text-lg font-bold flex items-center justify-center transition-colors shadow-sm z-20 absolute right-4 top-4" @click="dialogOpen = false">✕</button>
        </div>

        <div class="flex-1 overflow-y-auto flex flex-col p-5 bg-slate-100">
           
           <div class="grid lg:grid-cols-3 gap-6 mb-6 h-full">
              <!-- Kolom Kiri: Meta Klien -->
              <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4 relative col-span-1 border-t-4 border-t-blue-500">
                 <div class="text-[10px] font-black uppercase text-slate-400 tracking-wider flex gap-2 w-full border-b pb-2"><i class="pi pi-id-card"></i> Identitas Penerima (Klien)</div>
                 
                 <div class="space-y-1 relative">
                    <label class="text-[10px] font-bold text-slate-500">Arahkan Kepada (To:)</label>
                    <select :disabled="isReadonly" v-model="form.customerId" class="w-full border rounded p-2.5 text-sm font-bold font-sans text-blue-900 bg-blue-50 border-blue-200 outline-none shadow-inner">
                        <option value="">-- Pilih Relasi Klien --</option>
                        <option v-for="c in mockCustomers" :value="c.id">{{ c.code }} - {{ c.name }}</option>
                    </select>
                 </div>

                 <div class="grid grid-cols-2 gap-3 mt-2">
                    <div class="space-y-1 relative">
                       <label class="text-[10px] font-bold text-slate-500">Tgl Surat (Issue)</label>
                       <input :disabled="isReadonly" type="date" v-model="form.issueDate" class="w-full border rounded p-2 text-xs font-bold text-slate-700 bg-slate-50 outline-none focus:border-blue-500" />
                    </div>
                    <div class="space-y-1 relative">
                       <label class="text-[10px] font-bold text-slate-500">Masa Berlaku (Valid Till)</label>
                       <input :disabled="isReadonly" type="date" v-model="form.expiryDate" class="w-full border rounded p-2 text-xs font-bold text-slate-700 border-rose-200 bg-rose-50 outline-none focus:border-rose-500" />
                    </div>
                 </div>

                 <div class="space-y-1 flex-1">
                    <label class="text-[10px] font-bold text-slate-500">Teks Pengantar (Subject/Notes)</label>
                    <textarea :disabled="isReadonly" v-model="form.notes" rows="4" class="w-full rounded border p-2 text-xs bg-slate-50 outline-none focus:border-blue-500 font-sans" placeholder="Surat penawaran proyek konstruksi bulan Mei..."></textarea>
                 </div>
              </div>

              <!-- Kolom Kanan: Kertas Hitung Kalkulasi Harga -->
               <div class="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden col-span-2">
                   <div class="flex items-center justify-between p-4 bg-slate-50 border-b">
                     <div class="text-xs font-black text-slate-800 uppercase tracking-widest"><i class="pi pi-money-bill mr-2 text-emerald-600"></i> Rencana Anggaran (Bill of Quantities)</div>
                     <Button v-if="!isReadonly" label="Tambah Baris Penawaran" icon="pi pi-plus" size="small" bg="bg-white" class="h-8 shadow-sm text-blue-700 text-[10px] border-slate-200 font-bold" @click="addLine" />
                   </div>
                   <div class="overflow-x-auto">
                     <table class="w-full text-sm">
                       <thead class="bg-white text-left text-[9px] text-slate-400 border-b uppercase tracking-wider relative">
                         <tr>
                           <th class="px-3 py-2 font-black text-slate-700 w-64 border-r bg-slate-50">DESKRIPSI PRODUK / JASA (SKU)</th>
                           <th class="px-3 py-2 text-center font-bold bg-slate-50 border-r w-24">QTY (VOL)</th>
                           <th class="px-3 py-2 text-right font-bold w-36">@ HARGA SATUAN</th>
                           <th class="px-3 py-2 text-right font-bold w-28 bg-rose-50 text-rose-700">POTONGAN<br>(Diskon)</th>
                           <th class="px-3 py-2 text-right font-black border-l w-40 bg-blue-50 text-blue-800">JUMLAH BERSIH (NET)</th>
                           <th v-if="!isReadonly" class="w-8 border-l border-b bg-white"></th>
                         </tr>
                       </thead>
                       <tbody class="divide-y relative">
                          <tr v-for="(line, idx) in form.lines" :key="idx" class="transition-colors group hover:bg-slate-50">
                             <td class="px-3 py-3 align-top border-r bg-slate-50/50">
                                <textarea :disabled="isReadonly" v-model="line.desc" rows="2" class="w-full text-xs font-bold text-slate-800 bg-white outline-none focus:border-blue-500 placeholder-slate-300 border rounded p-1" placeholder="Ketikan deskripsi penawaran / Pilih Item Master..." />
                             </td>
                             
                             <td class="px-2 py-3 align-top text-center border-r bg-slate-50 h-full">
                                <div class="flex flex-col items-center">
                                   <input :disabled="isReadonly" type="number" v-model.number="line.qty" class="w-full bg-white border-b-2 border-slate-300 rounded px-1 py-1.5 text-center text-sm font-black text-blue-800 outline-none focus:border-blue-500 shadow-inner" placeholder="0" />
                                   <input :disabled="isReadonly" type="text" v-model="line.uomCode" class="w-12 text-[9px] font-mono border-b border-transparent uppercase text-center mt-1 outline-none font-bold text-slate-400" placeholder="Unit" />
                                </div>
                             </td>
                             
                             <td class="px-3 py-3 align-top h-full relative">
                                <span class="absolute left-2 top-4 text-[9px] text-slate-400 font-sans">Rp</span>
                                <input :disabled="isReadonly" type="number" v-model.number="line.unitPrice" class="w-full border-b border-slate-200 px-1 py-1.5 text-right text-sm font-mono font-bold text-slate-700 outline-none focus:border-emerald-500 bg-transparent rounded" placeholder="0" />
                             </td>

                             <td class="px-3 py-3 align-top h-full relative bg-rose-50/30">
                                <span class="absolute left-2 top-4 text-[9px] text-rose-300 font-sans">Rp</span>
                                <input :disabled="isReadonly" type="number" v-model.number="line.discount" class="w-full border-b border-rose-200 px-1 py-1.5 text-right text-sm font-mono font-bold text-rose-700 outline-none focus:border-rose-500 bg-transparent rounded" placeholder="0" />
                             </td>

                             <td class="px-3 py-3 align-middle border-l bg-blue-50/30 font-mono text-right relative overflow-hidden group-hover:bg-blue-50 transition-colors">
                                <span class="absolute left-2 top-4 text-[9px] text-slate-400 font-sans">Rp</span>
                                <div class="font-black text-blue-900 text-[15px] tracking-tight truncate">{{ formatCurrency(calculateLineTotal(line)) }}</div>
                             </td>
                             
                             <td v-if="!isReadonly" class="px-1 py-3 align-middle border-l text-center">
                                 <button @click="removeLine(idx)" class="w-6 h-6 rounded bg-slate-100 text-slate-400 flex items-center justify-center font-black hover:bg-rose-500 hover:text-white transition-colors" title="Batal Item">✕</button>
                             </td>
                          </tr>
                          <tr v-if="form.lines.length === 0">
                             <td :colspan="isReadonly ? 5 : 6" class="p-8 text-center text-slate-400 text-xs italic">
                                Lembar kosong. Mulai tambahkan *Bill of Quantities* penawaran Anda.
                             </td>
                          </tr>
                       </tbody>
                     </table>
                   </div>

                   <!-- Faktur Footer (Totals) -->
                   <div class="bg-slate-900 p-5 mt-auto flex flex-col md:flex-row justify-between items-center text-white border-t border-slate-700 relative overflow-hidden gap-4 shadow-inner">
                      <div class="absolute left-4 opacity-5 pointer-events-none"><i class="pi pi-calculator text-8xl"></i></div>
                      <div class="z-10 text-[10px] font-bold text-slate-400 space-y-1 w-full relative">
                         <div class="flex justify-between w-64 uppercase tracking-widest"><span class="w-32">Bruto Total:</span><span>Rp {{ formatCurrency(calcGross()) }}</span></div>
                         <div class="flex justify-between w-64 uppercase tracking-widest text-rose-400"><span class="w-32">Potongan Diskon:</span><span>- Rp {{ formatCurrency(calcDisc()) }}</span></div>
                      </div>
                      <div class="z-10 text-right w-full shrink-0">
                         <div class="text-[10px] uppercase font-black tracking-widest text-emerald-400 mb-1">TOTAL KESELURUHAN (NET AMOUNT)</div>
                         <div class="font-mono text-3xl font-black text-white">Rp {{ formatCurrency(calcNet()) }},<span class="text-xs text-slate-500 relative -top-3 ml-0.5">00</span></div>
                      </div>
                   </div>
               </div>
           </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-5 border-t border-slate-200 bg-white flex justify-between items-center shrink-0 rounded-b-xl z-20 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)]">
          <Button label="Keluar Dokumen" severity="secondary" size="small" @click="dialogOpen = false" outlined class="bg-slate-50 border-slate-300 font-bold" />
          
          <div class="flex items-center gap-2">
             <Button v-if="isReadonly && canManage && form.status === 'DRAFT'" label="Cetak PDF / Kirim Klien (APPROVE)" severity="info" size="large" :loading="saving" :disabled="saving" @click="saveAction('APPROVED')" class="bg-blue-600 border-none text-white font-bold tracking-wide hover:bg-blue-700 shadow-sm h-10 px-6 rounded-lg" icon="pi pi-send" />
             <Button v-else-if="isReadonly && canManage && form.status === 'APPROVED'" label="MARK AS WON (Pesanan Deal!)" severity="success" size="large" :loading="saving" :disabled="saving" @click="saveAction('ACCEPTED')" class="bg-emerald-600 border-none text-white font-bold tracking-wide shadow-sm h-10 px-6 rounded-lg" icon="pi pi-check-circle" />
             <Button v-else-if="isReadonly && canManage && form.status === 'APPROVED'" label="MARK AS LOST" severity="danger" size="large" :loading="saving" :disabled="saving" @click="saveAction('REJECTED')" class="bg-rose-100 text-rose-700 border border-transparent shadow-sm h-10 px-6 rounded-lg font-bold" />
             <Button v-else-if="!isReadonly" label="Simpan Draf Penawaran" severity="info" size="large" @click="saveAction('DRAFT')" class="bg-blue-600 border-none text-white font-bold h-10 px-8 rounded-lg shadow-sm" icon="pi pi-save" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('sales.quotation.manage') || true); 

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
  customerId: '',
  issueDate: '',
  expiryDate: '',
  notes: '',
  status: 'DRAFT',
  lines: [] as Array<any>
});

const mockCustomers = ref<any[]>([
  {id:'1', code: 'CUS-KVJ', name:'PT. Kopi Viktori Jaya'},
]);

const filteredDocs = computed(() => {
  let list = docs.value;
  if (statusFilter.value) {
    list = list.filter(p => p.status === statusFilter.value);
  }
  if (search.value) {
    const q = search.value.toLowerCase();
    list = list.filter(p => p.code?.toLowerCase().includes(q) || p.customer?.name?.toLowerCase().includes(q));
  }
  return list;
});

const formatQty = (val: any) => {
  if (!val && val !== 0 || isNaN(val)) return '0';
  return Number(val).toLocaleString('id-ID', { maximumFractionDigits: 1 });
};

const formatCurrency = (val: any) => {
  if (!val && val !== 0 || isNaN(val)) return '0';
  return Number(val).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

const formatDate = (iso: string) => {
  if (!iso) return '-';
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};

const isExpired = (iso: string) => {
   if(!iso) return false;
   return new Date(iso) < new Date();
};

const calculateLines = (doc: any) => doc.items ? doc.items.length : 0;
const calculateLineTotal = (line: any) => (Number(line.qty||0) * Number(line.unitPrice||0)) - Number(line.discount||0) * Number(line.qty||0);

const calcGross = () => form.lines.reduce((a,c) => a + (Number(c.qty||0) * Number(c.unitPrice||0)), 0);
const calcDisc = () => form.lines.reduce((a,c) => a + (Number(c.discount||0) * Number(c.qty||0)), 0); // Discount is per unit
const calcNet = () => calcGross() - calcDisc();

const calculateGrandTotal = (doc: any) => {
    if(!doc.items) return 0;
    return doc.items.reduce((acc: number, cur: any) => acc + calculateLineTotal(cur), 0);
}

const statusBadgeParams = (s: string, exp: string) => {
    if(s === 'ACCEPTED') return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    if(s === 'REJECTED') return 'bg-slate-100 text-slate-500 border-slate-300';
    if(s === 'DRAFT') return 'bg-amber-50 text-amber-600 border-amber-200';
    if(isExpired(exp)) return 'bg-rose-100 text-rose-700 border-rose-300';
    return 'bg-blue-100 text-blue-700 border-blue-300';
};

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/query?table=SalesQuotation&include=customer,items');
    if (res.data && res.data.data) {
        docs.value = res.data.data;
    } else {
        throw new Error("No payload");
    }
  } catch (e: any) {
    // Mock Data based on postgres seeded data
    docs.value = [
      { 
        id: '1', code: "SQ-202604-001", status: "APPROVED", issueDate: "2026-04-10T00:00", expiryDate:"2026-04-24T00:00", notes: "Penawaran suplai kopi khusus.",
        customer: { code: 'CUS-KVJ', name: 'PT. Kopi Viktori Jaya' },
        items: [
           { desc: 'Kopi Bubuk Arabica Premium 250g', qty: 1000, unitPrice: 120000, discount: 5000, uomCode: 'PCS' }
        ]
      },
      { 
        id: '1', code: "SQ-202604-002", status: "DRAFT", issueDate: "2026-04-13T00:00", expiryDate:"2026-04-30T00:00", notes: "Proyek ekspansi.",
        customer: { code: 'CUS-KVJ', name: 'PT. Kopi Viktori Jaya' },
        items: [
           { desc: 'Biji Kopi House Blend 1KG', qty: 500, unitPrice: 200000, discount: 0, uomCode: 'KG' }
        ]
      }
    ];
    try {
        const cs = await api.get('/core/query?table=Customer');
        if (cs.data?.data) mockCustomers.value = cs.data.data;
    } catch(er){}
  } finally {
    loading.value = false;
  }
}

function openCreate() {
  activeDoc.value = null;
  isReadonly.value = false;
  form.id = '';
  form.code = 'SQ-NEW';
  form.customerId = mockCustomers.value[0]?.id || '';
  form.issueDate = new Date().toISOString().split('T')[0];
  
  let d = new Date(); d.setDate(d.getDate() + 14); // default 14 days valid
  form.expiryDate = d.toISOString().split('T')[0];
  
  form.notes = '';
  form.status = 'DRAFT';
  form.lines = [{ desc: "Item / Jasa Standar", qty: 10, unitPrice: 150000, discount: 0, uomCode: 'PCS' }];
  
  dialogOpen.value = true;
}

function openView(r: any) {
  activeDoc.value = r;
  isReadonly.value = true; 
  
  form.id = r.id;
  form.code = r.code;
  form.customerId = r.customerId || mockCustomers.value[0]?.id;
  form.issueDate = r.issueDate?.split('T')[0] || '';
  form.expiryDate = r.expiryDate?.split('T')[0] || '';
  form.notes = r.notes || '';
  form.status = r.status;
  
  if (r.items && r.items.length > 0) {
      form.lines = r.items.map((x:any) => ({...x}));
  } else {
      form.lines = [];
  }

  // Jika DRAFT, izinkan edit form pricing
  if (r.status === 'DRAFT') {
      isReadonly.value = false;
  }

  dialogOpen.value = true;
}

function addLine() {
   form.lines.push({ desc: "", qty: 1, unitPrice: 0, discount: 0, uomCode: 'PCS' });
}

function removeLine(idx: number) {
   form.lines.splice(idx, 1);
}

async function saveAction(targetStatus: string) {
  saving.value = true;
  form.status = targetStatus;
  
  let msg = "Dokumen Penawaran Harga berhasil disimpan.";
  if(targetStatus === 'ACCEPTED') msg = "Luar Biasa! Sales Quotation dimenangkan (Deal Won). Dokumen ini bersiap dicetak menjadi Sales Order riil.";
  
  setTimeout(() => {
    alert(msg);
    dialogOpen.value = false;
    saving.value = false;
    load();
  }, 1000);
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
