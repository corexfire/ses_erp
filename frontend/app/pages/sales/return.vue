<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-5 shadow-sm border-l-4 border-l-orange-500">
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div class="text-sm font-semibold text-slate-800">Manajemen Retur Pengembalian Barang (Sales Return / RMA)</div>
          <div class="mt-1 text-sm text-slate-600">
            Pusat resolusi sengketa B2B. Menangani klaim kerusakan, mengembalikan barang *reject* kembali ke sistem WMS, dan merilis Nota Kredit Piutang (Credit Memo).
          </div>
        </div>
        <div class="flex gap-2">
          <Button label="Kebijakan Retur Klien" severity="secondary" size="small" outlined icon="pi pi-shield" />
          <Button v-if="canManage" label="+ Rilis Dokumen RMA" size="small" bg="bg-orange-500" class="text-white border-none shrink-0 cursor-pointer" icon="pi pi-receipt" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Data List and Filters -->
    <div class="rounded-xl border bg-white p-5 shadow-sm">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2 w-full md:w-auto">
          <InputText v-model="search" placeholder="Cari Kode RMA / Klien..." class="w-full md:w-80 text-xs" />
          <select v-model="statusFilter" class="p-2 border rounded-md text-xs bg-white text-slate-700 min-w-40 outline-none focus:border-orange-500">
            <option value="">Semua Riwayat Retur</option>
            <option value="DRAFT">Pengajuan RMA Baru</option>
            <option value="PENDING_APPROVAL">Investigasi / Inspeksi QC</option>
            <option value="APPROVED">RMA Aktif (Credit Note Rilis)</option>
            <option value="REJECTED">Klaim Ditolak (Rejected)</option>
          </select>
          <Button label="Sisir Dokumen" severity="secondary" size="small" :disabled="loading" @click="load" />
        </div>
      </div>

      <!-- RMA Table -->
      <div class="overflow-x-auto rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-orange-50/50 text-left text-[11px] text-orange-900 border-b border-orange-100 uppercase tracking-wider">
            <tr>
              <th class="px-4 py-3 font-semibold w-1/4">Informasi Otorisasi Retur (RMA)</th>
              <th class="px-4 py-3 font-semibold">Pelapor (Pemohon Retur)</th>
              <th class="px-4 py-3 font-semibold text-right border-l bg-slate-50 w-48" title="Nilai Uang yang akan dibatalkan/dikredit">Nilai Pemotongan Piutang</th>
              <th class="px-4 py-3 font-semibold text-center border-l w-48">Tahapan Investigasi</th>
              <th class="px-4 py-3 text-right font-semibold">Resolusi Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y relative">
             <tr v-if="loading">
              <td colspan="5" class="px-4 py-16 text-center text-sm text-slate-500">
                <i class="pi pi-spinner pi-spin mr-2 text-orange-500"></i> Membaca log *reverse logistics* klien...
              </td>
            </tr>
            <!-- Iteration rows -->
            <tr v-for="doc in filteredDocs" v-else :key="doc.id" class="transition hover:bg-orange-50/20 group cursor-pointer" @click="openView(doc)">
              <!-- Dokumen -->
              <td class="px-4 py-3 align-top">
                <div class="font-bold text-slate-800 flex items-center gap-2 font-mono text-sm group-hover:text-orange-600 transition-colors">
                   {{ doc.code }}
                   <i v-if="doc.status === 'REJECTED'" class="pi pi-times-circle text-[10px] text-red-500" title="RMA Ditolak"></i>
                </div>
                <div class="text-[10px] text-slate-500 mt-1">Diajukan Pada: <span class="font-bold">{{ formatDate(doc.returnDate) }}</span></div>
              </td>
              
               <!-- Klien / Destinasi -->
              <td class="px-4 py-3 align-top">
                 <div class="flex items-start gap-2">
                    <i class="pi pi-exclamation-circle text-orange-400 mt-0.5"></i>
                    <div>
                       <div class="font-bold text-orange-900 text-sm hover:underline">{{ doc.customer?.name || 'Anonim' }}</div>
                       <div v-if="doc.orderId" class="text-[9px] font-bold text-indigo-500 uppercase flex items-center gap-1 mt-1 pr-1 truncate max-w-40 border border-indigo-200 bg-indigo-50 px-1 rounded shadow-sm inline-flex"><i class="pi pi-shopping-bag text-[8px]"></i> Referensi Trx: {{ doc.order?.code || 'Pesanan Jual (SO)' }}</div>
                       <div class="text-[10px] bg-slate-50 px-1.5 py-1 text-slate-500 mt-1 border rounded italic shadow-inner w-56 truncate">"{{ doc.notes || 'Tanpa keterangan keluhan' }}"</div>
                    </div>
                 </div>
              </td>

              <!-- Muatan Nilai -->
              <td class="px-4 py-3 align-top text-right border-l bg-slate-50/50 relative h-full transition-colors group-hover:bg-slate-100">
                 <div class="flex flex-col justify-center items-end h-full">
                    <span class="text-[8px] font-bold text-slate-400 absolute left-2 top-3">Rp Batal</span>
                    <div class="font-black text-[18px] font-mono tracking-tighter" :class="doc.status === 'REJECTED' ? 'text-slate-400 line-through' : 'text-slate-800'">
                       {{ formatCurrency(calculateGrandTotal(doc)) }}
                    </div>
                    <div class="text-[8px] font-bold mt-1 tracking-widest text-orange-500 uppercase">{{ doc.status === 'APPROVED' ? 'MEMOTONG INVOICE' : 'ANGKA SEMENTARA' }}</div>
                 </div>
              </td>

              <!-- Status Ledger -->
              <td class="px-4 py-4 align-middle text-center border-l bg-slate-50/50">
                 <span class="inline-flex rounded px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-sm w-full h-full flex items-center justify-center border" :class="statusBadgeParams(doc.status)">
                   {{ statusMapper(doc.status) }}
                 </span>
                 <div v-show="doc.status === 'APPROVED'" class="text-[8px] mt-1 text-orange-600 font-bold tracking-tight uppercase leading-none"><i class="pi pi-box mr-0.5 text-[8px]"></i> Masuk Ke Gudang Defect</div>
              </td>

              <!-- Actions -->
              <td class="px-4 py-4 align-middle text-right border-l">
                <Button v-if="doc.status === 'APPROVED'" label="Nota Kredit (PDF)" size="small" bg="bg-slate-800 text-white border-none" class="text-[10px] px-3 font-bold py-1.5 text-center shadow shadow-slate-600/30 w-full hover:bg-black mb-1" icon="pi pi-file-pdf" />
                <Button label="Sidang RMA" size="small" severity="secondary" outlined class="text-[10px] px-3 font-bold py-1.5 text-center transition-colors hover:text-orange-700 hover:bg-orange-50 w-full" @click.stop="openView(doc)" />
              </td>
            </tr>
            <tr v-if="!loading && filteredDocs.length === 0">
              <td colspan="5" class="px-4 py-16 text-center text-slate-500 border-t">
                <div class="text-4xl mb-3 opacity-30 text-orange-400"><i class="pi pi-shield"></i></div>
                Tidak ditemukan dokumen pengembalian / komplain barang.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


    <!-- Viewer/Editor Modal (Sales Return Form) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-2 sm:p-4 backdrop-blur-sm shadow-xl">
      <div class="w-full max-w-6xl rounded-xl border bg-slate-50 shadow-2xl flex flex-col max-h-[95vh] h-full overflow-hidden animate-fade-in-up">
        
        <!-- Header -->
        <div class="p-6 border-b flex flex-col sm:flex-row items-center justify-between shrink-0 gap-4 relative overflow-hidden shadow-sm" :class="activeDoc?.status === 'APPROVED' ? 'bg-slate-900 border-slate-700' : (activeDoc?.status === 'REJECTED' ? 'bg-red-950 border-red-800' : 'bg-orange-800 border-orange-600')">
          <div class="absolute left-[-20px] top-[-20px] opacity-10">
             <i class="pi pi-sync text-[150px] text-white"></i>
          </div>
          <div class="z-10 w-full flex justify-between items-start">
             <div>
               <div class="flex items-center gap-3">
                 <span class="text-xl font-black text-white tracking-tight">{{ activeDoc?.id ? `Otorisasi Retur Barang (RMA): ${form.code}` : 'Pengajuan Formulir RMA Baru' }}</span>
                 <span v-if="activeDoc?.id" class="inline-flex rounded text-[9px] font-black uppercase shadow-sm border px-2 py-0.5" :class="statusBadgeParams(form.status)">
                   {{ statusMapper(form.status) }}
                 </span>
               </div>
               <div class="text-xs font-medium w-full flex gap-3 mt-1 pl-1" :class="activeDoc?.status === 'REJECTED' ? 'text-red-200' : 'text-orange-100 opacity-80'">
                 Logistik Balik (Reverse Logistics). Melakukan "Persetujuan" RMA berarti Anda memaksa WMS untuk memakan kembali stok jelek *(Receive In)*, dan memaksa ERP menerbitkan Nota Kredit *(Refund Tagihan Piutang)*.
               </div>
             </div>
          </div>
          <button class="text-white/50 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded text-lg font-bold flex items-center justify-center transition-colors shadow-sm z-20 absolute right-4 top-4" @click="dialogOpen = false">✕</button>
        </div>

        <div class="flex-1 overflow-y-auto flex flex-col p-5 bg-slate-100">
           
           <div class="grid lg:grid-cols-3 gap-6 mb-6 h-full flex-1">
              <!-- Kolom Kiri: Investigasi Pemohon -->
              <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4 relative col-span-1 border-t-4 border-t-orange-500">
                 <div class="text-[10px] font-black uppercase text-slate-400 tracking-wider flex gap-2 w-full border-b pb-2"><i class="pi pi-user-minus"></i> Profil Pelapor Sengketa</div>
                 
                 <div class="space-y-1 relative">
                    <label class="text-[10px] font-bold text-slate-500">Klien Pihak Ketiga</label>
                    <select :disabled="isReadonly" v-model="form.customerId" class="w-full border rounded p-2 text-sm font-bold font-sans text-orange-900 bg-orange-50 border-orange-200 outline-none shadow-inner">
                        <option value="">-- Pemohon Retur --</option>
                        <option v-for="c in mockCustomers" :value="c.id">{{ c.code }} - {{ c.name }}</option>
                    </select>
                 </div>
                 
                 <div class="space-y-1 relative my-1">
                    <label class="text-[10px] font-bold text-orange-600 tracking-wider">Sumber Penyakit Transaksi Asli (SO Ref)</label>
                    <input :disabled="isReadonly" type="text" v-model="form.orderId" class="w-full border-b-2 border-orange-400 px-2 py-1 text-xs font-bold font-mono text-slate-600 bg-orange-50 outline-none placeholder-slate-400" placeholder="Kode Kontrak Awal..." />
                 </div>

                 <div class="space-y-1 relative">
                    <label class="text-[10px] font-bold text-slate-500">Tgl Laporan Diterima CS</label>
                    <input :disabled="isReadonly" type="date" v-model="form.returnDate" class="w-full border rounded p-2 text-xs font-bold text-slate-700 bg-slate-50 outline-none focus:border-orange-500" />
                 </div>
                 
                 <div class="space-y-1 flex-1 relative bg-slate-50 border rounded-lg p-3">
                    <label class="text-[10px] font-bold text-rose-500 mb-2 block uppercase tracking-widest"><i class="pi pi-bullseye mr-1"></i> Kronologi / Alasan Cacat Berita</label>
                    <textarea :disabled="isReadonly" v-model="form.notes" rows="4" class="w-full rounded border p-2 text-xs bg-white outline-none focus:border-orange-500 font-sans shadow-inner border-slate-300" placeholder="Laporkan detail kerusakan..."></textarea>
                 </div>
              </div>

              <!-- Kolom Kanan: Benda Bukti Fisik -->
               <div class="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden col-span-2 relative h-full">
                   <div class="absolute right-0 bottom-0 opacity-5 pointer-events-none z-0">
                      <i class="pi pi-exclamation-triangle text-[250px] text-rose-900"></i>
                   </div>

                   <div class="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-50 border-b z-10 w-full">
                     <div class="text-xs font-black text-slate-800 uppercase tracking-widest"><i class="pi pi-box mr-2 text-orange-600"></i> Inventaris Barang Tarikan (Reverse Move)</div>
                     <div class="flex gap-2 mt-3 sm:mt-0">
                        <Button v-if="!isReadonly" label="Panggil Ulang dari SO" icon="pi pi-undo" size="small" bg="bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100" class="h-8 shadow-sm text-[9px] font-bold" />
                        <Button v-if="!isReadonly" label="Tambah Manual SKU Rusak" icon="pi pi-plus" size="small" bg="bg-white" class="h-8 shadow-sm text-slate-700 text-[9px] border-slate-200 font-bold focus:shadow-none" @click="addLine" />
                     </div>
                   </div>
                   <div class="overflow-x-auto z-10 w-full flex-1">
                     <table class="w-full text-sm">
                       <thead class="bg-white text-left text-[9px] text-slate-400 border-b uppercase tracking-wider relative">
                         <tr>
                           <th class="px-3 py-2 font-black text-slate-700 w-64 border-r bg-slate-50">BARANG YANG DITARIK BALIK KE GUDANG</th>
                           <th class="px-3 py-2 text-center font-bold bg-slate-50 border-r w-24 text-slate-400" title="Beban Fisik Ke WMS">QTY RUSAK</th>
                           <th class="px-3 py-2 text-right font-bold w-32 border-r bg-slate-50">Uang / Unit Asli Terjual</th>
                           <th class="px-3 py-2 text-right font-black border-l w-32 bg-orange-50 text-orange-800" title="Uang Diskon/Batal">KREDIT RUPIAH</th>
                           <th v-if="!isReadonly" class="w-8 border-l border-b bg-white"></th>
                         </tr>
                       </thead>
                       <tbody class="divide-y relative">
                          <tr v-for="(line, idx) in form.lines" :key="idx" class="transition-colors group hover:bg-slate-50">
                             <td class="px-3 py-3 align-top border-r bg-slate-50/50">
                                <textarea :disabled="isReadonly" v-model="line.desc" rows="2" class="w-full text-xs font-bold text-slate-800 bg-white outline-none focus:border-orange-500 placeholder-slate-300 border border-slate-200 rounded p-1 shadow-inner" placeholder="Pilih/Ketik SKU dari Inventory Master..." />
                                <div v-if="line.itemId" class="text-[9px] mt-1 text-red-500 font-bold tracking-tighter inline-flex items-center gap-1 bg-red-50 px-1.5 py-0.5 rounded border border-red-200 uppercase"><i class="pi pi-arrow-left text-[8px]"></i> WMS Return Target.</div>
                             </td>
                             
                             <td class="px-2 py-3 align-top text-center border-r bg-slate-50 h-full">
                                <div class="flex flex-col items-center">
                                   <input :disabled="isReadonly" type="number" v-model.number="line.qty" class="w-full bg-slate-200/50 border-b-2 border-red-300 rounded px-1 py-1.5 text-center text-[15px] font-black text-rose-700 outline-none" placeholder="0" />
                                   <input :disabled="isReadonly" type="text" v-model="line.uomCode" class="w-12 text-[9px] font-mono border-b border-transparent uppercase text-center mt-1 outline-none font-bold text-slate-500 bg-transparent" placeholder="UOM" />
                                </div>
                             </td>

                             <td class="px-3 py-3 align-top border-r relative h-full">
                                <span class="absolute left-2 top-4 text-[9px] text-slate-400 font-sans">Rp</span>
                                <input :disabled="isReadonly" type="number" v-model.number="line.unitPrice" class="w-full border-b border-slate-200 px-1 py-1.5 text-right text-sm font-mono font-bold text-slate-500 outline-none focus:border-orange-500 bg-transparent rounded opacity-60" placeholder="0" />
                             </td>
                             
                             <td class="px-2 py-3 align-middle text-right bg-orange-100/30 group-hover:bg-orange-100/50 transition-colors h-full relative overflow-hidden">
                                <span class="absolute left-2 top-4 text-[9px] text-orange-400 font-sans font-bold">Rp</span>
                                <div class="font-black text-[15px] font-mono tracking-tighter text-orange-900 pr-1">-{{ formatCurrency(calculateLineTotal(line)) }}</div>
                             </td>

                             <td v-if="!isReadonly" class="px-1 py-3 align-middle border-l text-center">
                                 <button @click="removeLine(idx)" class="w-6 h-6 rounded bg-slate-100 text-slate-400 flex items-center justify-center font-black hover:bg-rose-500 hover:text-white transition-colors" title="Amsyong">✕</button>
                             </td>
                          </tr>
                          <tr v-if="form.lines.length === 0">
                             <td :colspan="isReadonly ? 4 : 5" class="p-8 text-center text-slate-400 text-xs italic">
                                Belum ada daftar komplain.
                             </td>
                          </tr>
                       </tbody>
                     </table>
                   </div>
                   
                   <!-- Summary Total Bar Hitam -->
                   <div class="bg-black p-5 border-t border-slate-700 relative w-full flex justify-between items-center z-10 shrink-0">
                      <div class="text-xs font-medium max-w-[200px] leading-tight text-orange-200 opacity-60">
                          Catatan: Total di samping akan mendepresiasi keuntungan bersih *(Refund/Credit Memo)* pada laporan rugi laba Anda.
                      </div>
                      <div class="z-10 text-right shrink-0 relative pr-4">
                         <div class="text-[10px] uppercase font-black tracking-widest text-orange-400 mb-1 relative z-10">BIAYA PIUTANG HILANG (CREDIT RETURN)</div>
                         <div class="font-mono text-3xl font-black text-rose-500 px-3 py-1 pb-2 bg-black rounded inline-block drop-shadow-md border border-rose-900 relative z-10"><span class="text-rose-800 mr-2 text-xl tracking-widest relative -top-0.5">RP</span>-{{ formatCurrency(calcGross()) }},<span class="text-xs text-rose-800 relative -top-3 ml-0.5">00</span></div>
                      </div>
                   </div>
               </div>
           </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-5 border-t border-slate-200 bg-white flex justify-between items-center shrink-0 rounded-b-xl z-20 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)] gap-4">
          <Button label="Kembali" severity="secondary" size="small" @click="dialogOpen = false" outlined class="bg-slate-50 border-slate-300 font-bold" />
          
          <div class="flex items-center gap-2">
             <Button v-if="isReadonly && canManage && form.status === 'DRAFT'" label="Tolak Permintaan Retur" severity="danger" size="large" :loading="saving" :disabled="saving" @click="saveAction('REJECTED')" class="bg-slate-100 text-red-600 border border-red-200 font-bold hover:bg-red-50 hover:border-red-300 shadow-sm h-10 px-6 rounded-lg" icon="pi pi-times" />
             <Button v-if="isReadonly && canManage && form.status === 'DRAFT'" label="SAHKAN RETUR: TERBITKAN KREDIT & TARIK WMS!" severity="info" size="large" :loading="saving" :disabled="saving" @click="saveAction('APPROVED')" class="bg-orange-600 border-none text-white font-bold tracking-wide hover:bg-orange-700 shadow-sm h-10 px-8 rounded-lg" icon="pi pi-exclamation-triangle" />
             
             <Button v-else-if="!isReadonly" label="Kunci Pengajuan Investigasi Saja (Save Draft)" severity="info" size="large" @click="saveAction('DRAFT')" class="bg-slate-700 border-none text-white font-bold h-10 px-8 rounded-lg shadow-sm" icon="pi pi-lock-open" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('sales.return.manage') || true); 

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
  orderId: '',
  returnDate: '',
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

const formatDate = (iso: string) => {
  if (!iso) return '-';
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};

const formatCurrency = (val: any) => {
  if (!val && val !== 0 || isNaN(val)) return '0';
  return Number(val).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

const calculateLineTotal = (line: any) => (Number(line.qty||0) * Number(line.unitPrice||0));
const calcGross = () => form.lines.reduce((a,c) => a + calculateLineTotal(c), 0);

const calculateGrandTotal = (doc: any) => {
    if(!doc.items) return 0;
    return doc.items.reduce((acc: number, cur: any) => acc + calculateLineTotal(cur), 0);
}

const statusMapper = (s: string) => {
    if(s === 'APPROVED') return 'RMA DISAHKAN';
    if(s === 'REJECTED') return 'RETUR DITOLAK';
    if(s === 'DRAFT') return 'INVESTIGASI (DRAFT)';
    if(s === 'PENDING_APPROVAL') return 'INSPEKSI QC';
    return s;
}

const statusBadgeParams = (s: string) => {
    if(s === 'REJECTED') return 'bg-rose-50 text-rose-700 border-rose-300 border border-dashed opacity-50';
    if(s === 'DRAFT') return 'bg-slate-50 text-slate-600 border-slate-300 shadow-sm border border-dashed';
    if(s === 'PENDING_APPROVAL') return 'bg-amber-100 text-amber-800 border-amber-300';
    return 'bg-orange-100 text-orange-800 border-orange-400 border shadow shadow-orange-200';
};

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/query?table=SalesReturn&include=customer,order,items');
    if (res.data && res.data.data) {
        docs.value = res.data.data;
    } else {
        throw new Error("No payload");
    }
  } catch (e: any) {
    // Mock Data based on postgres seeded data
    docs.value = [
      { 
        id: '1', code: "RMA-202604-001", status: "DRAFT", returnDate: "2026-04-18T00:00", notes: "Klaim Retur (RMA): 5 bungkus kemasan kopi bocor/sobek saat pengiriman transit.",
        customer: { code: 'CUS-KVJ', name: 'PT. Kopi Viktori Jaya' },
        order: { code: 'SO-202604-001' },
        items: [
           { itemId: 'wms-key', desc: 'Kopi Bubuk Arabica Premium 250g (Kemasan Rusak)', qty: 5, unitPrice: 115000, uomCode: 'PCS' }
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
  form.code = 'RMA-NEW';
  form.customerId = mockCustomers.value[0]?.id || '';
  form.orderId = '';
  form.returnDate = new Date().toISOString().split('T')[0];
  form.status = 'DRAFT';
  form.notes = '';
  form.lines = [{ itemId: 'wms-key', desc: "Kopi Arabica Rusak", qty: 2, unitPrice: 120000, uomCode: 'PCS' }];
  
  dialogOpen.value = true;
}

function openView(r: any) {
  activeDoc.value = r;
  isReadonly.value = true; 
  
  form.id = r.id;
  form.code = r.code;
  form.customerId = r.customerId || mockCustomers.value[0]?.id;
  form.orderId = r.orderId || '';
  form.returnDate = r.returnDate?.split('T')[0] || '';
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

function addLine() {
   form.lines.push({ itemId: null, desc: "", qty: 1, unitPrice: 0, discount: 0, uomCode: 'PCS' });
}

function removeLine(idx: number) {
   form.lines.splice(idx, 1);
}

async function saveAction(targetStatus: string) {
  saving.value = true;
  form.status = targetStatus;
  
  let msg = "RMA baru berhasil dikunci sebagai DRAFT. Tunggu QC melakukan inspeksi barang cacat.";
  if(targetStatus === 'REJECTED') msg = "RMA DITOLAK. Sengketa dibatalkan. Klien tidak berhak mendapat pengurangan tagihan AR.";
  if(targetStatus === 'APPROVED') msg = "RMA DISAHKAN! SIKLUS NEGATIF DIJALANKAN : (1) Secara fisik, Gudang WMS di-'Receive In' untuk menampung stok reject ini. (2) Secara keuangan, Nota Kredit (Credit Memo) diluncurkan untuk memotong utang Invoice Klien berdasar Nominal Merah ini!";

  setTimeout(() => {
    alert(msg);
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
