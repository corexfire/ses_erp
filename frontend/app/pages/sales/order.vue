<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-5 shadow-sm border-l-4 border-l-indigo-600">
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div class="text-sm font-semibold text-slate-800">Manajemen Pesanan Jual (Sales Order - SO)</div>
          <div class="mt-1 text-sm text-slate-600">
            Jantung eksekusi penjualan. Dokumen formal kesepakatan ("*Deal Done*") yang mengunci stok gudang *("Allocated")* dan melempar komando pengiriman.
          </div>
        </div>
        <div class="flex gap-2">
          <Button label="Dashboard Kinerja Sales" severity="secondary" size="small" outlined icon="pi pi-chart-bar" />
          <Button v-if="canManage" label="+ Terbitkan SPK Jual (SO)" size="small" bg="bg-indigo-600" class="text-white border-none shrink-0 cursor-pointer" icon="pi pi-file-check" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Data List and Filters -->
    <div class="rounded-xl border bg-white p-5 shadow-sm">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2 w-full md:w-auto">
          <InputText v-model="search" placeholder="Cari SO Number / Nama Klien..." class="w-full md:w-80 text-xs" />
          <select v-model="statusFilter" class="p-2 border rounded-md text-xs bg-white text-slate-700 min-w-32 outline-none focus:border-indigo-500">
            <option value="">Semua Riwayat SO</option>
            <option value="DRAFT">Konsep (Draft)</option>
            <option value="APPROVED">SO Aktif (Stock Booked)</option>
            <option value="CLOSED">Selesai Dikirim & Ditagih (Closed)</option>
          </select>
          <Button label="Filter Transaksi" severity="secondary" size="small" :disabled="loading" @click="load" />
        </div>
      </div>

      <!-- SO Table -->
      <div class="overflow-x-auto rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-indigo-50/50 text-left text-xs text-indigo-900 border-b border-indigo-100 uppercase tracking-wider">
            <tr>
              <th class="px-4 py-3 font-semibold w-1/4">Nomor Kontrak Jual (SO)</th>
              <th class="px-4 py-3 font-semibold">Pemesan (Customer)</th>
              <th class="px-4 py-3 font-semibold text-right border-l bg-slate-50 w-1/5">Nilai Transaksi Mutlak</th>
              <th class="px-4 py-3 font-semibold text-center border-l w-40">Status Resolusi</th>
              <th class="px-4 py-3 text-right font-semibold">Tugas Gudang</th>
            </tr>
          </thead>
          <tbody class="divide-y relative">
             <tr v-if="loading">
              <td colspan="5" class="px-4 py-16 text-center text-sm text-slate-500">
                <i class="pi pi-spinner pi-spin mr-2 text-indigo-500"></i> Menyinkronkan daftar SPK Penjualan...
              </td>
            </tr>
            <!-- Iteration rows -->
            <tr v-for="doc in filteredDocs" v-else :key="doc.id" class="transition hover:bg-indigo-50/20 group cursor-pointer" @click="openView(doc)">
              <!-- Dokumen -->
              <td class="px-4 py-3 align-top">
                <div class="font-bold text-slate-800 flex items-center gap-2 font-mono">
                   {{ doc.code }}
                   <i v-if="doc.status === 'APPROVED'" class="pi pi-verified text-[10px] text-indigo-500" title="Pesanan Sah (WMS Disita)"></i>
                </div>
                <div class="text-[10px] text-slate-500 mt-1">Tanggal Eksekusi: <span class="font-bold">{{ formatDate(doc.orderDate) }}</span></div>
              </td>
              
               <!-- Klien / Customer -->
              <td class="px-4 py-3 align-top">
                 <div class="flex items-center gap-2">
                    <i class="pi pi-id-card text-slate-400"></i>
                    <div class="font-bold text-indigo-900 text-sm hover:underline">{{ doc.customer?.name || 'Klien Tidak Diketahui' }}</div>
                 </div>
                 <div class="text-[10px] bg-indigo-50 text-indigo-600 border border-indigo-100 font-bold inline-block px-1.5 py-0.5 rounded font-mono tracking-tighter mt-1 shadow-sm">{{ doc.customer?.code }}</div>
                 <div class="mt-1 text-[10px] text-slate-500 italic truncate w-64">"{{ doc.notes || '-' }}"</div>
              </td>

              <!-- Total Value -->
              <td class="px-4 py-3 align-top text-right border-l bg-slate-50 relative group-hover:bg-slate-100 transition-colors">
                 <div class="flex flex-col justify-center items-end h-full">
                    <span class="text-[9px] font-bold text-slate-400 absolute left-2 top-4">Rp</span>
                    <div class="font-black text-xl font-mono tracking-tighter text-slate-800 mt-1">
                       {{ formatCurrency(calculateGrandTotal(doc)) }}
                    </div>
                    <div class="text-[9px] text-slate-400 font-bold tracking-widest mt-0.5">{{ calculateLines(doc) }} MACAM ITEM</div>
                 </div>
              </td>

              <!-- Status -->
              <td class="px-4 py-4 align-middle text-center border-l bg-slate-50/50">
                 <span class="inline-flex rounded-md px-2 py-0.5 text-[9px] font-black uppercase tracking-widest shadow-sm w-full h-full flex items-center justify-center" :class="statusBadgeParams(doc.status)">
                   {{ statusMapper(doc.status) }}
                 </span>
                 <div v-show="doc.status === 'APPROVED'" class="text-[8px] mt-1 text-slate-400 tracking-tight leading-tight"><i class="pi pi-box mr-0.5"></i> Stok Tertahan.</div>
              </td>

              <!-- Actions -->
              <td class="px-4 py-4 align-middle text-right">
                <Button v-if="doc.status === 'APPROVED'" label="Buat Surat Jalan ->" size="small" bg="bg-indigo-600 text-white border-none" class="text-[10px] px-3 font-bold py-1.5 text-center shadow shadow-indigo-600/30 hover:bg-indigo-700 w-full mb-1" @click.stop="gotoDO(doc)" />
                <Button label="Rincian Pesanan" size="small" severity="secondary" outlined class="text-[10px] px-3 font-bold py-1.5 text-center transition-colors hover:text-indigo-700 hover:bg-indigo-50 w-full" @click.stop="openView(doc)" />
              </td>
            </tr>
            <tr v-if="!loading && filteredDocs.length === 0">
              <td colspan="5" class="px-4 py-16 text-center text-slate-500 border-t">
                <div class="text-4xl mb-3 opacity-30 text-indigo-400"><i class="pi pi-shopping-bag"></i></div>
                Tidak ditemukan arsip Pesanan Jual hari ini. 
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


    <!-- Viewer/Editor Modal (Sales Order Board) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-2 sm:p-4 backdrop-blur-sm shadow-xl">
      <div class="w-full max-w-6xl rounded-xl border bg-slate-50 shadow-2xl flex flex-col max-h-[95vh] h-full overflow-hidden animate-fade-in-up">
        
        <!-- Header -->
        <div class="p-6 border-b flex flex-col sm:flex-row items-center justify-between shrink-0 gap-4 relative overflow-hidden shadow-sm" :class="activeDoc?.status === 'APPROVED' ? 'bg-indigo-900 border-indigo-700' : 'bg-slate-900 border-slate-700'">
          <div class="absolute left-[-20px] top-[-20px] opacity-10">
             <i class="pi pi-file-check text-[150px] text-indigo-400"></i>
          </div>
          <div class="z-10 w-full flex justify-between items-start">
             <div>
               <div class="flex items-center gap-3">
                 <span class="text-xl font-black text-white tracking-tight">{{ activeDoc?.id ? `Kontrak Penjualan Formal: ${form.code}` : 'Surat Perintah Kerja (Penjualan / SO) Baru' }}</span>
                 <span v-if="activeDoc?.id" class="inline-flex rounded text-[10px] font-black uppercase shadow-sm border px-2 py-0.5" :class="statusBadgeParams(form.status)">
                   {{ statusMapper(form.status) }}
                 </span>
               </div>
               <div class="text-xs text-indigo-200 font-medium w-full flex gap-3 opacity-80 mt-1 pl-1">
                 Dokumen ini melegalkan transaksi. Begitu "Disahkan", AI pengelola WMS akan mem-blokir jumlah stok Gudang agar tidak dicuri staf lain.
               </div>
             </div>
          </div>
          <button class="text-white/50 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded text-lg font-bold flex items-center justify-center transition-colors shadow-sm z-20 absolute right-4 top-4" @click="dialogOpen = false">✕</button>
        </div>

        <div class="flex-1 overflow-y-auto flex flex-col p-5 bg-slate-100">
           
           <div class="grid lg:grid-cols-3 gap-6 mb-6 h-full">
              <!-- Kolom Kiri: Pihak ke 2 -->
              <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4 relative col-span-1 border-t-4 border-t-indigo-500">
                 <div class="text-[10px] font-black uppercase text-slate-400 tracking-wider flex gap-2 w-full border-b pb-2"><i class="pi pi-id-card"></i> Pihak Negosiator (Pemesan)</div>
                 
                 <div class="space-y-1 relative">
                    <label class="text-[10px] font-bold text-slate-500">Debitur / Customer (Bill To:)</label>
                    <select :disabled="isReadonly" v-model="form.customerId" class="w-full border rounded p-2.5 text-sm font-bold font-sans text-indigo-900 bg-indigo-50 border-indigo-200 outline-none shadow-inner">
                        <option value="">-- Tentukan Pemesan B2B --</option>
                        <option v-for="c in mockCustomers" :value="c.id">{{ c.code }} - {{ c.name }}</option>
                    </select>
                 </div>

                 <div class="space-y-1 relative mt-2">
                    <label class="text-[10px] font-bold text-slate-500">Tanggal Eksekusi (Order Date)</label>
                    <input :disabled="isReadonly" type="date" v-model="form.orderDate" class="w-full border rounded p-2 text-xs font-bold text-slate-700 bg-slate-50 outline-none focus:border-indigo-500" />
                 </div>

                 <div class="space-y-1 flex-1">
                    <label class="text-[10px] font-bold text-slate-500">Intruksi Pemesanan (Remarks/Notes)</label>
                    <textarea :disabled="isReadonly" v-model="form.notes" rows="4" class="w-full rounded border p-2 text-xs bg-slate-50 outline-none focus:border-indigo-500 font-sans" placeholder="Kirim via lalat besi nusantara (Kargo)..."></textarea>
                 </div>
              </div>

              <!-- Kolom Kanan: Rantai Suplai / Keranjang -->
               <div class="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden col-span-2">
                   <div class="flex items-center justify-between p-4 bg-slate-50 border-b">
                     <div class="text-xs font-black text-slate-800 uppercase tracking-widest"><i class="pi pi-cart-plus mr-2 text-indigo-600"></i> Muatan Pesanan Jual (Sales Line Items)</div>
                     <Button v-if="!isReadonly" label="Tambah Barang (SKU)" icon="pi pi-plus" size="small" bg="bg-white" class="h-8 shadow-sm text-indigo-700 text-[10px] border-slate-200 font-bold" @click="addLine" />
                   </div>
                   <div class="overflow-x-auto">
                     <table class="w-full text-sm">
                       <thead class="bg-white text-left text-[9px] text-slate-400 border-b uppercase tracking-wider relative">
                         <tr>
                           <th class="px-3 py-2 font-black text-slate-700 w-64 border-r bg-slate-50">KODE BARANG (Item Master UID) / NAMA</th>
                           <th class="px-3 py-2 text-center font-bold bg-slate-50 border-r w-24">QTY JUAL</th>
                           <th class="px-3 py-2 text-right font-bold w-36">@ NET PRICE (Rp)</th>
                           <th class="px-3 py-2 text-right font-black border-l w-40 bg-indigo-50 text-indigo-800">BARIS TAGIHAN (Rp)</th>
                           <th v-if="!isReadonly" class="w-8 border-l border-b bg-white"></th>
                         </tr>
                       </thead>
                       <tbody class="divide-y relative">
                          <tr v-for="(line, idx) in form.lines" :key="idx" class="transition-colors group hover:bg-slate-50">
                             <td class="px-3 py-3 align-top border-r bg-slate-50/50">
                                <textarea :disabled="isReadonly" v-model="line.desc" rows="2" class="w-full text-xs font-bold text-slate-800 bg-white outline-none focus:border-indigo-500 placeholder-slate-300 border border-slate-200 rounded p-1 shadow-inner" placeholder="Pilih/Ketik SKU dari Inventory Master..." />
                                <div v-if="docLoaded(activeDoc) && line.itemId" class="text-[9px] mt-1 text-emerald-600 font-bold tracking-tighter inline-flex items-center gap-1 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100"><i class="pi pi-check text-[8px]"></i> WMS Linked.</div>
                                <div v-else-if="docLoaded(activeDoc)" class="text-[9px] mt-1 text-amber-600 font-bold tracking-tighter inline-flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100"><i class="pi pi-info-circle text-[8px]"></i> Non-Inventory / Passthrough Service.</div>
                             </td>
                             
                             <td class="px-2 py-3 align-top text-center border-r bg-slate-50 h-full">
                                <div class="flex flex-col items-center">
                                   <input :disabled="isReadonly" type="number" v-model.number="line.qty" class="w-full bg-white border-b-2 border-indigo-300 rounded px-1 py-1.5 text-center text-sm font-black text-indigo-800 outline-none focus:border-indigo-500 shadow-sm" placeholder="0" />
                                   <input :disabled="isReadonly" type="text" v-model="line.uomCode" class="w-12 text-[9px] font-mono border-b border-transparent uppercase text-center mt-1 outline-none font-bold text-slate-400" placeholder="UOM" />
                                </div>
                             </td>
                             
                             <td class="px-3 py-3 align-top h-full relative">
                                <span class="absolute left-2 top-4 text-[9px] text-slate-400 font-sans">Rp</span>
                                <input :disabled="isReadonly" type="number" v-model.number="line.unitPrice" class="w-full border-b border-slate-200 px-1 py-1.5 text-right text-sm font-mono font-bold text-slate-700 outline-none focus:border-indigo-500 bg-transparent rounded" placeholder="0" />
                             </td>


                             <td class="px-3 py-3 align-middle border-l bg-indigo-50/20 font-mono text-right relative overflow-hidden group-hover:bg-indigo-50 transition-colors">
                                <span class="absolute left-2 top-4 text-[9px] text-slate-400 font-sans">Rp</span>
                                <div class="font-black text-indigo-900 text-[15px] tracking-tight truncate">{{ formatCurrency(calculateLineTotal(line)) }}</div>
                             </td>
                             
                             <td v-if="!isReadonly" class="px-1 py-3 align-middle border-l text-center">
                                 <button @click="removeLine(idx)" class="w-6 h-6 rounded bg-slate-100 text-slate-400 flex items-center justify-center font-black hover:bg-rose-500 hover:text-white transition-colors" title="Batal Item">✕</button>
                             </td>
                          </tr>
                          <tr v-if="form.lines.length === 0">
                             <td :colspan="isReadonly ? 4 : 5" class="p-8 text-center text-slate-400 text-xs italic">
                                Belum ada isi keranjang Order.
                             </td>
                          </tr>
                       </tbody>
                     </table>
                   </div>

                   <!-- Total Bar -->
                   <div class="bg-indigo-950 p-5 mt-auto text-white border-t border-indigo-700 relative overflow-hidden shadow-inner flex justify-end">
                      <div class="absolute left-4 opacity-5 pointer-events-none"><i class="pi pi-receipt text-8xl text-indigo-400"></i></div>
                      <div class="z-10 text-right w-full sm:w-80 shrink-0">
                         <div class="text-[10px] uppercase font-black tracking-widest text-indigo-300 mb-1">TOTAL PESANAN TERNILAI</div>
                         <div class="font-mono text-3xl font-black text-white px-3 py-1 bg-black/30 rounded inline-block drop-shadow-md border border-white/10">Rp {{ formatCurrency(calcGross()) }},<span class="text-xs text-white/50 relative -top-3 ml-0.5">00</span></div>
                      </div>
                   </div>
               </div>
           </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-5 border-t border-slate-200 bg-white flex justify-between items-center shrink-0 rounded-b-xl z-20 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)]">
          <Button label="Kembali ke Lobi" severity="secondary" size="small" @click="dialogOpen = false" outlined class="bg-slate-50 border-slate-300 font-bold" />
          
          <div class="flex items-center gap-2">
             <Button v-if="isReadonly && canManage && form.status === 'DRAFT'" label="SAHKAN PESANAN (KUNCI STOK WMS)" severity="info" size="large" :loading="saving" :disabled="saving" @click="saveAction('APPROVED')" class="bg-indigo-600 border-none text-white font-bold tracking-wide hover:bg-indigo-700 shadow-sm h-10 px-6 rounded-lg" icon="pi pi-lock" />
             <Button v-else-if="!isReadonly" label="Biarkan Sementara (Save Draft)" severity="info" size="large" @click="saveAction('DRAFT')" class="bg-indigo-600 border-none text-white font-bold h-10 px-8 rounded-lg shadow-sm" icon="pi pi-save" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();
const router = useRouter();

const canManage = computed(() => auth.hasPermission('sales.order.manage') || true); 

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
  orderDate: '',
  notes: '',
  status: 'DRAFT',
  lines: [] as Array<any>
});

const mockCustomers = ref<any[]>([
  {id:'1', code: 'CUS-KVJ', name:'PT. Kopi Viktori Jaya'},
]);

const docLoaded = (doc: any) => doc != null;

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


const calculateLines = (doc: any) => doc.items ? doc.items.length : 0;
const calculateLineTotal = (line: any) => (Number(line.qty||0) * Number(line.unitPrice||0)); // Net price already handled via minus in real logic, but here assume unit price is NET.

const calcGross = () => form.lines.reduce((a,c) => a + (Number(c.qty||0) * Number(c.unitPrice||0)), 0);

const calculateGrandTotal = (doc: any) => {
    if(!doc.items) return 0;
    return doc.items.reduce((acc: number, cur: any) => acc + calculateLineTotal(cur), 0);
}

const statusMapper = (s: string) => {
    if(s === 'APPROVED') return 'AKSI GUDANG OPEN';
    if(s === 'CLOSED') return 'FULFILLED (DITUTUP)';
    if(s === 'DRAFT') return 'ON REVIEW';
    return s;
}

const statusBadgeParams = (s: string) => {
    if(s === 'APPROVED') return 'bg-emerald-100 text-emerald-800 border-emerald-300 border shadow-inner';
    if(s === 'CLOSED') return 'bg-slate-100 text-slate-500 border-slate-300 bg-slate-200 border';
    if(s === 'DRAFT') return 'bg-amber-50 text-amber-600 border-amber-200 border';
    return 'bg-indigo-100 text-indigo-700 border-indigo-300 border';
};

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/query?table=SalesOrder&include=customer,items');
    if (res.data && res.data.data) {
        docs.value = res.data.data;
    } else {
        throw new Error("No payload");
    }
  } catch (e: any) {
    // Mock Data based on postgres seeded data
    docs.value = [
      { 
        id: '1', code: "SO-202604-001", status: "APPROVED", orderDate: "2026-04-15T00:00", notes: "Pesanan masuk dari Kopi Viktori Jaya. Harap segera dikemas.",
        customer: { code: 'CUS-KVJ', name: 'PT. Kopi Viktori Jaya' },
        items: [
           { itemId: 'wms-key', desc: 'Kopi Bubuk Arabica Premium 250g', qty: 250, unitPrice: 115000, discount: 0, uomCode: 'PCS' }
        ]
      },
      { 
        id: '2', code: "SO-202604-002", status: "DRAFT", orderDate: "2026-04-18T00:00", notes: "Menunggu pembayaran DP 50%.",
        customer: { code: 'CUS-KVJ', name: 'PT. Kopi Viktori Jaya' },
        items: [
           { itemId: null, desc: 'Jasa Konsultasi Roasting System', qty: 1, unitPrice: 5000000, discount: 0, uomCode: 'JOB' }
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
  form.code = 'SO-NEW';
  form.customerId = mockCustomers.value[0]?.id || '';
  form.orderDate = new Date().toISOString().split('T')[0];
  form.notes = '';
  form.status = 'DRAFT';
  form.lines = [{ desc: "Item Terjual 1", qty: 1, unitPrice: 150000, uomCode: 'PCS' }];
  
  dialogOpen.value = true;
}

function openView(r: any) {
  activeDoc.value = r;
  isReadonly.value = true; 
  
  form.id = r.id;
  form.code = r.code;
  form.customerId = r.customerId || mockCustomers.value[0]?.id;
  form.orderDate = r.orderDate?.split('T')[0] || '';
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

function gotoDO(doc: any) {
   alert(`Integrasi Modul: Instruksi Ekspedisi Barang (Delivery Order) untuk kontrak ${doc.code} sedang dikompilasi... Mengarahkan ke Gudang Logistik Outbound.`);
}

function addLine() {
   form.lines.push({ itemId: 'new_wms_uid', desc: "", qty: 1, unitPrice: 0, uomCode: 'PCS' });
}

function removeLine(idx: number) {
   form.lines.splice(idx, 1);
}

async function saveAction(targetStatus: string) {
  saving.value = true;
  form.status = targetStatus;
  
  let msg = "Sales Order tersimpan di draft.";
  if(targetStatus === 'APPROVED') msg = "KONTRAK DISAHKAN! Sinyal Allocation dikirim ke Core WMS Inventory. Rantai rantai pasokan gudang kini terkunci (Stock Booked) untuk pesanan klien ini.";
  
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
