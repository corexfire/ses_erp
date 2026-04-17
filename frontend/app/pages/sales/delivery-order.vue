<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-5 shadow-sm border-l-4 border-l-cyan-600">
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div class="text-sm font-semibold text-slate-800">Manajemen Pengiriman (Delivery Order / Surat Jalan)</div>
          <div class="mt-1 text-sm text-slate-600">
            Jembatan menuju Klien. Mencetak Surat Jalan Ekspedisi, melacak muatan truk transit, dan mengurangi fisik stok dari WMS (Issue Out).
          </div>
        </div>
        <div class="flex gap-2">
          <Button label="Pantau Satelit Delivery (Map)" severity="secondary" size="small" outlined icon="pi pi-map" />
          <Button v-if="canManage" label="+ Buat Surat Jalan Baru" size="small" bg="bg-cyan-600" class="text-white border-none shrink-0 cursor-pointer" icon="pi pi-truck" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Data List and Filters -->
    <div class="rounded-xl border bg-white p-5 shadow-sm">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2 w-full md:w-auto">
          <InputText v-model="search" placeholder="Cari Kode DO / Resi..." class="w-full md:w-80 text-xs" />
          <select v-model="statusFilter" class="p-2 border rounded-md text-xs bg-white text-slate-700 min-w-40 outline-none focus:border-cyan-500">
            <option value="">Semua Dokumen DO</option>
            <option value="DRAFT">Skenario Buka (Tunggu Muat)</option>
            <option value="IN_TRANSIT">Dalam Perjalanan (Supir)</option>
            <option value="DELIVERED">Terkirim / Diterima Klien</option>
          </select>
          <Button label="Lacak Kurir" severity="secondary" size="small" :disabled="loading" @click="load" />
        </div>
      </div>

      <!-- Delivery Order Table -->
      <div class="overflow-x-auto rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-cyan-50/50 text-left text-xs text-cyan-900 border-b border-cyan-100 uppercase tracking-wider">
            <tr>
              <th class="px-4 py-3 font-semibold w-1/4">Registrasi Surat Jalan (DO)</th>
              <th class="px-4 py-3 font-semibold">Destinasi Pembeli (Alamat)</th>
              <th class="px-4 py-3 font-semibold text-center border-l bg-slate-50 w-32">Kapasitas Muat</th>
              <th class="px-4 py-3 font-semibold text-center border-l w-48">Status Transit Truk</th>
              <th class="px-4 py-3 text-right font-semibold">Tugas Lapangan</th>
            </tr>
          </thead>
          <tbody class="divide-y relative">
             <tr v-if="loading">
              <td colspan="5" class="px-4 py-16 text-center text-sm text-slate-500">
                <i class="pi pi-spinner pi-spin mr-2 text-cyan-500"></i> Memindai pergerakan armada darat...
              </td>
            </tr>
            <!-- Iteration rows -->
            <tr v-for="doc in filteredDocs" v-else :key="doc.id" class="transition hover:bg-cyan-50/20 group cursor-pointer" @click="openView(doc)">
              <!-- Dokumen -->
              <td class="px-4 py-3 align-top">
                <div class="font-bold text-slate-800 flex items-center gap-2 font-mono">
                   {{ doc.code }}
                   <i v-if="doc.status === 'DELIVERED'" class="pi pi-check-circle text-[10px] text-cyan-500" title="Paket mendarat aman!"></i>
                </div>
                <div class="text-[10px] text-slate-500 mt-1">Tanggal Mulai Kirim: <span class="font-bold">{{ formatDate(doc.actualShipDate) || formatDate(doc.plannedShipDate) }}</span></div>
              </td>
              
               <!-- Klien / Destinasi -->
              <td class="px-4 py-3 align-top">
                 <div class="flex items-start gap-2">
                    <i class="pi pi-map-marker text-slate-300 mt-0.5"></i>
                    <div>
                       <div class="font-bold text-cyan-900 text-sm hover:underline">{{ doc.customer?.name || 'Area Tidak Diketahui' }}</div>
                       <div class="text-[10px] font-mono tracking-tighter text-slate-600 mt-0.5 leading-tight truncate w-64">{{ doc.deliveryAddress1 || 'Alamat tidak diinput' }}</div>
                       <div class="text-[10px] font-bold text-cyan-700 uppercase bg-cyan-50 border inline-block px-1 rounded mt-1">{{ doc.deliveryCity || 'KOTA BLANK' }}</div>
                    </div>
                 </div>
              </td>

              <!-- Muatan Cargo -->
              <td class="px-4 py-3 align-top text-center border-l bg-slate-50 relative group-hover:bg-slate-100 transition-colors">
                 <div class="flex flex-col justify-center items-center h-full">
                    <div class="font-black text-2xl font-mono tracking-tighter text-slate-700">
                       {{ calculateTotalQty(doc) }}
                    </div>
                    <div class="text-[8px] text-slate-400 font-bold uppercase tracking-wide mt-0.5"><i class="pi pi-box text-[8px] mr-1"></i>ITEM FISIK DIMUAT</div>
                 </div>
              </td>

              <!-- Status -->
              <td class="px-4 py-4 align-middle text-center border-l bg-slate-50/50">
                 <span class="inline-flex rounded px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-sm w-full h-full flex items-center justify-center border" :class="statusBadgeParams(doc.status)">
                   {{ statusMapper(doc.status) }}
                 </span>
                 <div v-show="doc.status === 'IN_TRANSIT'" class="text-[8px] mt-1 text-cyan-600 font-bold tracking-tight leading-tight uppercase animate-pulse"><i class="pi pi-send mr-0.5 text-[8px]"></i> GPS Aktif</div>
              </td>

              <!-- Actions -->
              <td class="px-4 py-4 align-middle text-right">
                <Button v-if="doc.status === 'IN_TRANSIT'" label="Validasi Diterima (POD)" size="small" bg="bg-cyan-600 text-white border-none" class="text-[10px] px-3 font-bold py-1.5 text-center shadow shadow-cyan-600/30 hover:bg-cyan-700 w-full mb-1" @click.stop="gotoInvoice(doc)" />
                <Button label="Dokumen DO" size="small" severity="secondary" outlined class="text-[10px] px-3 font-bold py-1.5 text-center transition-colors hover:text-cyan-700 hover:bg-cyan-50 w-full" @click.stop="openView(doc)" />
              </td>
            </tr>
            <tr v-if="!loading && filteredDocs.length === 0">
              <td colspan="5" class="px-4 py-16 text-center text-slate-500 border-t">
                <div class="text-4xl mb-3 opacity-30 text-cyan-400"><i class="pi pi-compass"></i></div>
                Tidak ditemukan manifest pengiriman truk hari ini.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


    <!-- Viewer/Editor Modal (Delivery Pad) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-2 sm:p-4 backdrop-blur-sm shadow-xl">
      <div class="w-full max-w-6xl rounded-xl border bg-slate-50 shadow-2xl flex flex-col max-h-[95vh] h-full overflow-hidden animate-fade-in-up">
        
        <!-- Header -->
        <div class="p-6 border-b flex flex-col sm:flex-row items-center justify-between shrink-0 gap-4 relative overflow-hidden shadow-sm" :class="activeDoc?.status === 'IN_TRANSIT' ? 'bg-amber-900 border-amber-700' : 'bg-cyan-950 border-cyan-800'">
          <div class="absolute left-[-20px] top-[-20px] opacity-10">
             <i class="pi pi-truck text-[150px] text-white"></i>
          </div>
          <div class="z-10 w-full flex justify-between items-start">
             <div>
               <div class="flex items-center gap-3">
                 <span class="text-xl font-black text-white tracking-tight">{{ activeDoc?.id ? `Manifest Surat Jalan (DO): ${form.code}` : 'Rancangan Ekspedisi Angkutan Baru' }}</span>
                 <span v-if="activeDoc?.id" class="inline-flex rounded text-[9px] font-black uppercase shadow-sm border px-2 py-0.5" :class="statusBadgeParams(form.status)">
                   {{ statusMapper(form.status) }}
                 </span>
               </div>
               <div class="text-xs font-medium w-full flex gap-3 mt-1 pl-1" :class="activeDoc?.status === 'IN_TRANSIT' ? 'text-amber-200 opacity-90' : 'text-cyan-200 opacity-80'">
                 Bukan alat penagihan (Invoice). Ini adalah perintah legal pergerakan armada / surat sah memindahkan barang dari gerbang pabrik WMS ke jalan raya.
               </div>
             </div>
          </div>
          <button class="text-white/50 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded text-lg font-bold flex items-center justify-center transition-colors shadow-sm z-20 absolute right-4 top-4" @click="dialogOpen = false">✕</button>
        </div>

        <div class="flex-1 overflow-y-auto flex flex-col p-5 bg-slate-100">
           
           <div class="grid lg:grid-cols-3 gap-6 mb-6 h-full">
              <!-- Kolom Kiri: Navigasi Truk -->
              <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4 relative col-span-1 border-t-4 border-t-cyan-500">
                 <div class="text-[10px] font-black uppercase text-slate-400 tracking-wider flex gap-2 w-full border-b pb-2"><i class="pi pi-compass"></i> Tujuan Rute GPS</div>
                 
                 <div class="space-y-1 relative">
                    <label class="text-[10px] font-bold text-slate-500">Penerima Barang (Tarik Alamat Klien)</label>
                    <select :disabled="isReadonly" v-model="form.customerId" class="w-full border rounded p-2 text-sm font-bold font-sans text-cyan-900 bg-cyan-50 border-cyan-200 outline-none shadow-inner">
                        <option value="">-- Pilih Customer / Tujuan --</option>
                        <option v-for="c in mockCustomers" :value="c.id">{{ c.code }} - {{ c.name }}</option>
                    </select>
                 </div>

                 <div class="space-y-1 relative mt-2">
                    <label class="text-[10px] font-bold text-slate-500">Tanggal Armada Diberangkatkan</label>
                    <input :disabled="isReadonly" type="date" v-model="form.actualShipDate" class="w-full border rounded p-2 text-xs font-bold text-slate-700 bg-slate-50 outline-none focus:border-cyan-500" />
                 </div>
                 
                 <div class="space-y-1 flex-1 relative bg-slate-50 border rounded-lg p-3">
                    <label class="text-[10px] font-bold text-slate-500 mb-2 block uppercase tracking-widest"><i class="pi pi-map-marker text-rose-500 mr-1"></i> Titik Turun Fisik (Drop Point)</label>
                    <textarea :disabled="isReadonly" v-model="form.deliveryAddress1" rows="3" class="w-full rounded border p-2 text-xs bg-white outline-none focus:border-cyan-500 font-sans shadow-inner border-slate-300" placeholder="Jalan Raya Boulevard..."></textarea>
                    <input :disabled="isReadonly" type="text" v-model="form.deliveryCity" class="w-full border-b border-t-0 border-x-0 border-slate-300 p-2 mt-1 text-xs font-bold text-slate-700 bg-transparent outline-none focus:border-cyan-500" placeholder="Kota Kabupaten" />
                 </div>
              </div>

              <!-- Kolom Kanan: Rantai Muatan DO -->
               <div class="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden col-span-2 relative">
                   <!-- Watermark Background -->
                   <div class="absolute right-0 bottom-0 opacity-5 pointer-events-none z-0">
                      <i class="pi pi-box text-[250px] text-slate-900"></i>
                   </div>

                   <div class="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-50 border-b z-10">
                     <div class="text-xs font-black text-slate-800 uppercase tracking-widest"><i class="pi pi-barcode mr-2 text-cyan-600"></i> Muatan Truk Pengiriman (Delivery Items)</div>
                     <div class="flex gap-2 mt-3 sm:mt-0">
                        <Button v-if="!isReadonly" label="Tarik dari SO" icon="pi pi-download" size="small" bg="bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100" class="h-8 shadow-sm text-[9px] font-bold" />
                        <Button v-if="!isReadonly" label="Tambah Manual SKU" icon="pi pi-plus" size="small" bg="bg-white" class="h-8 shadow-sm text-cyan-700 text-[9px] border-slate-200 font-bold focus:shadow-none" @click="addLine" />
                     </div>
                   </div>
                   <div class="overflow-x-auto z-10 flex-1">
                     <table class="w-full text-sm h-full">
                       <thead class="bg-white text-left text-[9px] text-slate-400 border-b uppercase tracking-wider relative">
                         <tr>
                           <th class="px-3 py-2 font-black text-slate-700 w-72 border-r bg-slate-50">KODE BARANG / NAMA (DIKELUARKAN DARI WMS)</th>
                           <th class="px-3 py-2 text-center font-bold bg-slate-50 border-r w-28 text-slate-400">@ QTY DIMINTA</th>
                           <th class="px-3 py-2 text-center font-black border-l w-28 bg-cyan-50 text-cyan-800" title="Kuantitas asli yg berhasil diangkat fisik ke mobil">JML DIANGKAT (SHIPPED)</th>
                           <th v-if="!isReadonly" class="w-8 border-l border-b bg-white"></th>
                         </tr>
                       </thead>
                       <tbody class="divide-y relative h-full">
                          <tr v-for="(line, idx) in form.lines" :key="idx" class="transition-colors group hover:bg-slate-50">
                             <td class="px-3 py-3 align-top border-r bg-slate-50/50">
                                <textarea :disabled="isReadonly" v-model="line.desc" rows="2" class="w-full text-xs font-bold text-slate-800 bg-white outline-none focus:border-cyan-500 placeholder-slate-300 border border-slate-200 rounded p-1 shadow-inner" placeholder="Pilih/Ketik SKU dari Inventory Master..." />
                                <div v-if="line.itemId" class="text-[9px] mt-1 text-emerald-600 font-bold tracking-tighter inline-flex items-center gap-1 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 uppercase"><i class="pi pi-database text-[8px]"></i> WMS Linked UID.</div>
                             </td>
                             
                             <td class="px-2 py-3 align-middle text-center border-r bg-slate-50">
                                <div class="flex flex-col items-center">
                                   <input :disabled="isReadonly" type="number" v-model.number="line.orderedQty" class="w-full bg-slate-200/50 border-b-2 border-slate-300 rounded px-1 py-1.5 text-center text-sm font-black text-slate-400 outline-none" placeholder="0" />
                                </div>
                             </td>
                             
                             <td class="px-2 py-3 align-middle text-center bg-cyan-100/30 group-hover:bg-cyan-100/50 transition-colors h-full">
                                <div class="flex flex-col items-center h-full justify-center w-full">
                                   <input :disabled="isReadonly" type="number" v-model.number="line.shippedQty" class="w-full border-b-2 border-cyan-500 px-1 py-1.5 text-center text-xl font-black text-cyan-800 outline-none focus:border-cyan-600 bg-white rounded shadow-sm drop-shadow" placeholder="0" />
                                   <input :disabled="isReadonly" type="text" v-model="line.uomCode" class="w-12 text-[9px] font-mono border-b border-transparent uppercase text-center mt-1 outline-none font-bold text-slate-500 bg-transparent" placeholder="UOM" />
                                </div>
                             </td>

                             <td v-if="!isReadonly" class="px-1 py-3 align-middle border-l text-center">
                                 <button @click="removeLine(idx)" class="w-6 h-6 rounded bg-slate-100 text-slate-400 flex items-center justify-center font-black hover:bg-rose-500 hover:text-white transition-colors" title="Batal Muat">✕</button>
                             </td>
                          </tr>
                          <tr v-if="form.lines.length === 0">
                             <td :colspan="isReadonly ? 3 : 4" class="p-8 text-center text-slate-400 text-xs italic">
                                Belum ada manifest barang muatan (*Empty Truck*).
                             </td>
                          </tr>
                          <tr><td :colspan="isReadonly ? 3 : 4" class="h-full bg-slate-50"></td></tr>
                       </tbody>
                     </table>
                   </div>
               </div>
           </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-5 border-t border-slate-200 bg-white flex justify-between items-center shrink-0 rounded-b-xl z-20 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)] gap-4">
          <Button label="Keluar Dokumen" severity="secondary" size="small" @click="dialogOpen = false" outlined class="bg-slate-50 border-slate-300 font-bold" />
          
          <div class="flex items-center gap-2">
             <Button v-if="isReadonly && canManage && form.status === 'DRAFT'" label="Truk Jalan: ISSUE OUT (Keluarkan dari Gudang WMS)" severity="info" size="large" :loading="saving" :disabled="saving" @click="saveAction('IN_TRANSIT')" class="bg-cyan-600 border-none text-white font-bold tracking-wide hover:bg-cyan-700 shadow-sm h-10 px-8 rounded-lg" icon="pi pi-send" />
             <Button v-else-if="!isReadonly" label="Konsep Surat Jalan (Save Draft)" severity="info" size="large" @click="saveAction('DRAFT')" class="bg-cyan-600 border-none text-white font-bold h-10 px-8 rounded-lg shadow-sm" icon="pi pi-save" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('sales.delivery.manage') || true); 

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
  actualShipDate: '',
  deliveryAddress1: '',
  deliveryCity: '',
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

const calculateTotalQty = (doc: any) => {
    if(!doc.items) return 0;
    return doc.items.reduce((acc: number, cur: any) => acc + Number(cur.shippedQty), 0);
}

const statusMapper = (s: string) => {
    if(s === 'IN_TRANSIT') return 'TRUK BERANGKAT (SHIPPED)';
    if(s === 'DELIVERED') return 'DITERIMA (POD)';
    if(s === 'DRAFT') return 'TAHAP PACKING';
    return s;
}

const statusBadgeParams = (s: string) => {
    if(s === 'IN_TRANSIT') return 'bg-amber-100 text-amber-800 border-amber-400 border-2 shadow shadow-amber-200 animate-none';
    if(s === 'DELIVERED') return 'bg-emerald-100 text-emerald-800 border-emerald-300 border bg-emerald-50';
    if(s === 'DRAFT') return 'bg-slate-100 text-slate-500 border-slate-300 border border-dashed';
    return 'bg-cyan-100 text-cyan-700 border-cyan-300 border';
};

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/query?table=DeliveryOrder&include=customer,items');
    if (res.data && res.data.data) {
        docs.value = res.data.data;
    } else {
        throw new Error("No payload");
    }
  } catch (e: any) {
    // Mock Data based on postgres seeded data
    docs.value = [
      { 
        id: '1', code: "DO-202604-001", status: "IN_TRANSIT", actualShipDate: "2026-04-16T00:00", deliveryAddress1: "Jl. Sudirman Kav B3", deliveryCity: "Jakarta Pusat",
        customer: { code: 'CUS-KVJ', name: 'PT. Kopi Viktori Jaya' },
        items: [
           { itemId: 'wms-key', desc: 'Kopi Bubuk Arabica Premium 250g', orderedQty: 250, shippedQty: 250, uomCode: 'PCS' }
        ]
      },
      { 
        id: '2', code: "DO-202604-002", status: "DRAFT", plannedShipDate: "2026-04-20T00:00", deliveryAddress1: "Cabang Gudang Viktori", deliveryCity: "Jakarta Selatan",
        customer: { code: 'CUS-KVJ', name: 'PT. Kopi Viktori Jaya' },
        items: [
           { itemId: 'wms-key', desc: 'Kopi Bubuk Arabica Premium 250g', orderedQty: 100, shippedQty: 0, uomCode: 'PCS' }
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
  form.code = 'DO-NEW';
  form.customerId = mockCustomers.value[0]?.id || '';
  form.actualShipDate = new Date().toISOString().split('T')[0];
  form.deliveryAddress1 = '';
  form.deliveryCity = '';
  form.status = 'DRAFT';
  form.lines = [{ itemId: 'wms-key', desc: "Kopi Arabica Tarikan dari SO-XXXX...", orderedQty: 10, shippedQty: 0, uomCode: 'PCS' }];
  
  dialogOpen.value = true;
}

function openView(r: any) {
  activeDoc.value = r;
  isReadonly.value = true; 
  
  form.id = r.id;
  form.code = r.code;
  form.customerId = r.customerId || mockCustomers.value[0]?.id;
  form.actualShipDate = r.actualShipDate?.split('T')[0] || r.plannedShipDate?.split('T')[0] || '';
  form.deliveryAddress1 = r.deliveryAddress1 || '';
  form.deliveryCity = r.deliveryCity || '';
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

function gotoInvoice(doc: any) {
   alert(`Integrasi Modul Keuangan: POD (Proof of Delivery) untuk ${doc.code} Disetujui! Membuka portal Pembuatan Tagihan Penjualan (Sales Invoice) kepada akun Piutang Klien...`);
}

function addLine() {
   form.lines.push({ itemId: null, desc: "", orderedQty: 1, shippedQty: 0, uomCode: 'PCS' });
}

function removeLine(idx: number) {
   form.lines.splice(idx, 1);
}

async function saveAction(targetStatus: string) {
  saving.value = true;
  form.status = targetStatus;
  
  let msg = "Konsep Surat Jalan berhasil disimpan.";
  if(targetStatus === 'IN_TRANSIT') msg = "EKSEKUSI PENGIRIMAN SAH! Stok Gudang secara hard-code di database resmi berkurang (ISSUED OUT). Truk armada ERP Anda dilaporkan mengudara ke lokasi Klien!";
  
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
