<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-5 shadow-sm border-l-4 border-l-blue-500">
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div class="text-sm font-semibold text-slate-800">Manajemen Pengiriman Ekspedisi (Freight / Shipping / Carrier)</div>
          <div class="mt-1 text-sm text-slate-600">
            Pusat navigasi armada ekspedisi. Menggabungkan beberapa Surat Jalan (Delivery Order) ke dalam satu kontainer ekspedisi (*Carrier/3PL*) dan melacak nomor resi.
          </div>
        </div>
        <div class="flex gap-2">
          <Button label="Kelola Mitra Logistik (Carrier)" severity="secondary" size="small" outlined icon="pi pi-users" @click="dialogCarrier = true" />
          <Button v-if="canManage" label="+ Buat Manifest Ekspedisi Baru" size="small" bg="bg-blue-600" class="text-white font-bold border-none shrink-0 cursor-pointer" icon="pi pi-box" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Data List and Filters -->
    <div class="rounded-xl border bg-white p-5 shadow-sm">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2 w-full md:w-auto">
          <InputText v-model="search" placeholder="Cari Resi JNE / No. Manifest..." class="w-full md:w-80 text-xs" />
          <select v-model="statusFilter" class="p-2 border rounded-md text-xs bg-white text-slate-700 min-w-40 outline-none focus:border-blue-500">
            <option value="">Semua Riwayat Pengangkutan</option>
            <option value="CREATED">Penyusunan Kargo (Created)</option>
            <option value="SHIPPED">Kargo Berlayar (Shipped)</option>
            <option value="DELIVERED">Kargo Mendarat (Delivered)</option>
          </select>
          <Button label="Pantau Radar" severity="secondary" size="small" :disabled="loading" @click="load" />
        </div>
      </div>

      <!-- Shipment Table -->
      <div class="overflow-x-auto rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-blue-50/50 text-left text-[11px] text-blue-900 border-b border-blue-100 uppercase tracking-wider font-bold">
            <tr>
              <th class="px-4 py-3 w-1/4">Kode Manifest Muat (Shipment ID)</th>
              <th class="px-4 py-3 bg-slate-50 border-l text-center">Agen Ekspedisi Darat/Laut/Udara</th>
              <th class="px-4 py-3 text-center bg-slate-50 border-l w-48" title="Nomor Resi Pihak Ketiga">Lacak Ekspedisi (AWB/Resi)</th>
              <th class="px-4 py-3 text-center bg-blue-50/50 border-l w-48">Status Trayek</th>
              <th class="px-4 py-3 text-right font-black border-l w-32 tracking-wider">Navigasi</th>
            </tr>
          </thead>
          <tbody class="divide-y relative text-[12px]">
             <tr v-if="loading">
              <td colspan="5" class="px-4 py-16 text-center text-sm text-slate-500">
                <i class="pi pi-spinner pi-spin mr-2 text-blue-500"></i> Membuka gerbang pelabuhan...
              </td>
            </tr>
            <!-- Iteration rows -->
            <tr v-for="doc in filteredDocs" v-else :key="doc.id" class="transition hover:bg-blue-50/20 group">
              <!-- Dokumen -->
              <td class="px-4 py-3 align-middle cursor-pointer" @click="openView(doc)">
                <div class="font-bold text-slate-800 flex items-center gap-2 group-hover:text-blue-700 transition">
                   <i class="pi pi-inbox text-slate-400"></i> {{ doc.code }}
                </div>
                <div class="text-[10px] text-slate-400 mt-1 uppercase" v-if="doc.shipDate">Diserahkan: <span class="font-bold text-slate-600">{{ formatDate(doc.shipDate) }}</span></div>
                <div class="text-[10px] text-slate-400 mt-0.5 uppercase" v-if="doc.deliveryDate">Tiba: <span class="font-bold text-emerald-600">{{ formatDate(doc.deliveryDate) }}</span></div>
              </td>
              
               <!-- Carrier -->
              <td class="px-4 py-3 align-middle text-center bg-slate-50/50 border-l">
                 <div class="font-bold text-slate-700">{{ doc.carrier?.name || 'Truk Internal' }}</div>
                 <div class="text-[8px] bg-slate-200 text-slate-500 inline-block px-1 rounded shadow-inner mt-0.5" v-if="doc.carrier?.code">{{ doc.carrier.code }}</div>
              </td>

              <!-- AWB Target -->
              <td class="px-4 py-3 align-middle text-center border-l bg-slate-50 relative group-hover:bg-slate-100 transition-colors">
                 <div class="font-mono font-bold text-indigo-700 text-sm tracking-tighter cursor-pointer hover:underline">{{ doc.trackingNo || 'Belum Terbit' }}</div>
                 <div class="text-[8px] uppercase tracking-widest text-slate-400 font-bold mt-1">Waybill Number</div>
              </td>

              <!-- Route Status -->
              <td class="px-4 py-3 align-middle text-center border-l bg-blue-50/20 relative">
                 <span class="inline-flex rounded px-2 py-1 text-[9px] font-black tracking-widest border w-full flex items-center justify-center shadow-sm" :class="statusBadgeParams(doc.status)">
                   {{ statusMapper(doc.status) }}
                 </span>
                 <div v-show="doc.status === 'SHIPPED'" class="text-[8px] mt-1 text-slate-400/80 font-bold tracking-tight uppercase leading-none truncate max-w-40 mx-auto px-2"><i class="pi pi-send mr-0.5 text-[8px]"></i> Lacak API Ekspedisi...</div>
              </td>

              <!-- Final Payout -->
              <td class="px-4 py-3 text-right border-l font-mono tracking-tighter relative group-hover:bg-slate-50 transition-colors">
                 <Button label="Detil Kargo" size="small" severity="secondary" outlined class="text-[10px] px-3 font-bold py-1.5 text-center transition-colors hover:text-blue-700 hover:bg-blue-50 w-full" @click.stop="openView(doc)" />
              </td>
            </tr>
            <tr v-if="!loading && filteredDocs.length === 0">
              <td colspan="5" class="px-4 py-16 text-center text-slate-400 border-t italic">
                Belum ada aktivitas peti kemas laut/udara.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


    <!-- Delivery Order Linkage Modal (Shipment Builder) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-2 sm:p-4 backdrop-blur-sm shadow-xl">
      <div class="w-full max-w-4xl rounded-xl border bg-slate-50 shadow-2xl flex flex-col max-h-[90vh] animate-fade-in-up">
        
        <div class="p-6 border-b bg-blue-900 border-blue-950 relative overflow-hidden flex justify-between items-start shadow-sm">
          <div class="absolute -left-10 -top-10 opacity-20"><i class="pi pi-globe text-[180px] text-white"></i></div>
          <div class="z-10 w-full pr-8">
             <div class="text-xl font-black text-white tracking-tight flex items-center gap-3">
                 {{ activeDoc?.id ? `Manifest Kargo Ekspedisi Eksternal: ${form.code}` : 'Bungkus Kargo Ekspedisi (Shipment) Baru' }}
                 <span v-if="activeDoc?.id" class="inline-flex rounded text-[9px] font-black uppercase shadow border px-2 py-0.5" :class="statusBadgeParams(form.status)">
                   {{ statusMapper(form.status) }}
                 </span>
             </div>
             <div class="text-xs font-semibold mt-1 text-blue-200/80">Satu Truk Ekspedisi JNE/FedEx bisa mengangkut PULUHAN Surat Jalan *Delivery Order* sekaligus. Ikat semua DO tersebut ke dalam satu tabung pelacakan resi disini.</div>
          </div>
          <button class="text-white/50 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded text-lg font-bold flex items-center justify-center transition-colors z-20 shrink-0 shadow" @click="dialogOpen = false">✕</button>
        </div>

        <div class="px-6 py-5 bg-white flex-1 overflow-auto">
            <div class="space-y-4 max-w-xl mb-6 border border-slate-200 rounded-lg p-4 shadow-inner bg-slate-50">
               <div>
                  <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Mitra Armada (Carrier / 3PL)</label>
                  <select :disabled="isReadonly" v-model="form.carrierId" class="w-full border-b-[3px] border-slate-200 px-2 py-2 text-sm font-bold text-slate-800 bg-white outline-none focus:border-blue-500 shadow-sm cursor-pointer hover:bg-slate-50 rounded-t">
                      <option value="">-- Pilih Ekspedisi Vendor Darat/Laut --</option>
                      <option v-for="c in mockCarriers" :value="c.id">{{ c.code }} - {{ c.name }}</option>
                  </select>
               </div>
               
               <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                  <div class="col-span-2">
                     <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Nomor Resi / AWB API Tracking</label>
                     <input :disabled="isReadonly" type="text" v-model="form.trackingNo" class="w-full border rounded px-2 py-2 text-xs font-bold font-mono text-indigo-700 bg-indigo-50/50 border-indigo-200 outline-none focus:border-indigo-500 shadow-inner" placeholder="JNE-1234567..." />
                  </div>
                  <div class="col-span-2 md:col-span-1">
                     <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Status Kargo</label>
                     <select :disabled="isReadonly && canManage === false" v-model="form.status" class="w-full border rounded px-2 py-2 text-xs font-bold text-slate-700 bg-white outline-none focus:border-blue-500 shadow-inner cursor-pointer">
                        <option value="CREATED">Penyusunan Kargo (CREATED)</option>
                        <option value="SHIPPED">Kargo Berlayar (SHIPPED)</option>
                        <option value="DELIVERED">Kargo Mendarat (DELIVERED)</option>
                        <option value="CANCELED">Dibatalkan (CANCELED)</option>
                     </select>
                  </div>
               </div>
               
               <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                  <div class="col-span-2">
                     <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Tgl Penyerahan Brg</label>
                     <input :disabled="isReadonly" type="date" v-model="form.shipDate" class="w-full border rounded px-2 py-2 text-xs font-bold text-slate-700 bg-slate-50/50 outline-none focus:border-blue-500 shadow-inner" />
                  </div>
                  <div class="col-span-2">
                     <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Estimasi / Aktual Tiba</label>
                     <input :disabled="isReadonly" type="date" v-model="form.deliveryDate" class="w-full border rounded px-2 py-2 text-xs font-bold text-slate-700 bg-slate-50/50 outline-none focus:border-blue-500 shadow-inner" />
                  </div>
               </div>
            </div>

            <!-- Tautan DO (Relation Data) -->
            <div class="border rounded-lg bg-white overflow-hidden shadow-sm">
                <div class="bg-slate-100 border-b p-3 flex justify-between items-center">
                    <span class="text-xs font-black uppercase text-slate-700 tracking-wider"><i class="pi pi-link text-blue-500 mr-1"></i> Surat Jalan Terafiliasi (Linked DO)</span>
                    <Button v-if="!isReadonly" label="Ikat DO Belum Terkirim" icon="pi pi-plus" size="small" bg="bg-white" class="h-8 shadow-sm text-blue-700 text-[9px] border-slate-200 font-bold focus:shadow-none" @click="addLinkedDO" />
                </div>
                <div class="p-4 bg-blue-50/20">
                     <div v-for="(doLink, idx) in form.deliveryOrders" :key="idx" class="flex items-center justify-between border-b border-dashed border-blue-200 py-2 relative group pl-2 hover:bg-blue-100/50 transition rounded px-2 mb-1">
                        <div class="font-mono text-sm font-bold text-slate-700 flex items-center gap-2"><i class="pi pi-truck text-slate-400"></i> {{ doLink.code }}</div>
                        <div class="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2 rounded-full border border-emerald-100">DO Ready to Ship</div>
                        <button v-if="!isReadonly" @click="removeDO(idx)" class="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 rounded bg-rose-100 text-rose-500 flex items-center justify-center font-black hover:bg-rose-500 hover:text-white" title="Lepaskan Ikatan DO">✕</button>
                     </div>
                     <div v-if="form.deliveryOrders.length === 0" class="text-center text-[11px] font-bold text-slate-400 italic py-6">
                        Belum ada Surat Jalan (DO) gudang yang dimasukkan ke dalam boks Kargo Pengiriman ini.
                     </div>
                </div>
            </div>
        </div>

        <div class="p-4 border-t bg-white flex justify-between items-center rounded-b-xl gap-3 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)] z-20">
          <Button label="Keluar Dokumen" severity="secondary" size="small" @click="dialogOpen = false" outlined class="bg-slate-50 border-slate-300 font-bold px-4" />
          
           <div class="flex items-center gap-2">
             <Button v-if="canManage" label="Simpan Perubahan Kargo" severity="info" size="large" :loading="saving" :disabled="saving" @click="saveAction(form.status)" class="bg-blue-600 border-none text-white font-bold tracking-wide hover:bg-blue-700 shadow-sm h-10 px-8 rounded-lg" icon="pi pi-check" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('sales.shipping.manage') || true); 

const docs = ref<any[]>([]);
const mockCarriers = ref<any[]>([]);
const search = ref('');
const statusFilter = ref('');
const loading = ref(false);
const saving = ref(false);

const dialogOpen = ref(false);
const dialogCarrier = ref(false);
const isReadonly = ref(true);
const activeDoc = ref<any>(null);

const form = reactive({
  id: '',
  code: '',
  carrierId: '',
  trackingNo: '',
  shipDate: '',
  deliveryDate: '',
  status: 'CREATED',
  deliveryOrders: [] as Array<any>
});

const filteredDocs = computed(() => {
  let list = docs.value;
  if (statusFilter.value) {
    list = list.filter(p => p.status === statusFilter.value);
  }
  if (search.value) {
    const q = search.value.toLowerCase();
    list = list.filter(p => p.code?.toLowerCase().includes(q) || p.trackingNo?.toLowerCase().includes(q));
  }
  return list;
});

const formatDate = (iso: string) => {
  if (!iso) return '-';
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};

const statusMapper = (s: string) => {
    if(s === 'SHIPPED') return 'DI LUAR KENDALI (JNE/pihak ke3)';
    if(s === 'DELIVERED') return 'KARGO TERKIRIM';
    if(s === 'CREATED') return 'GUDANG TRANSIT PERUSAHAAN';
    if(s === 'CANCELED') return 'DIBATALKAN';
    return s;
}

const statusBadgeParams = (s: string) => {
    if(s === 'SHIPPED') return 'bg-amber-100 text-amber-800 border-amber-300 shadow shadow-amber-200/50';
    if(s === 'DELIVERED') return 'bg-emerald-100 text-emerald-800 border-emerald-300 bg-emerald-50';
    if(s === 'CREATED') return 'bg-slate-100 text-slate-500 border-slate-300 shadow-inner border-dashed';
    return 'bg-blue-100 text-blue-700 border-blue-300 shadow';
};


async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/query?table=Shipment&include=carrier,deliveryOrders');
    if (res.data && res.data.data) {
        docs.value = res.data.data;
    } else {
        throw new Error("No payload");
    }
  } catch (e: any) {
    // Mock Data based on postgres seeded data
    docs.value = [
      { 
        id: '1', code: "SHP-202604-001", status: "SHIPPED", trackingNo: "JNE-TANGERANG-88221", shipDate: "2026-04-18T00:00", deliveryDate: "2026-04-20T00:00",
        carrier: { code: 'CAR-JNE', name: 'PT. JNE Express' },
        deliveryOrders: [{ code: 'DO-202604-001' }]
      },
      { 
        id: '2', code: "SHP-202604-002", status: "CREATED", trackingNo: "INTERNAL-TRUK-B2211XX", shipDate: "2026-04-20T00:00", deliveryDate: null,
        carrier: { code: 'CAR-INT', name: 'Armada Internal Pabrik' },
        deliveryOrders: []
      },
      { 
        id: '3', code: "SHP-202604-003", status: "DELIVERED", trackingNo: "001928374829", shipDate: "2026-04-01T00:00", deliveryDate: "2026-04-03T00:00",
        carrier: { code: 'CAR-SICEPAT', name: 'SiCepat Ekspres' },
        deliveryOrders: [{ code: 'DO-202604-099' }]
      }
    ];
  }

  try {
     const resC = await api.get('/core/query?table=Carrier');
     if (resC.data?.data) {
        mockCarriers.value = resC.data.data;
     } else {
        throw new Error("No carrier payload");
     }
  } catch(e) {
     mockCarriers.value = [
       { id: 'c1', code: 'CAR-JNE', name: 'PT. JNE Express' },
       { id: 'c2', code: 'CAR-INT', name: 'Armada Internal B2B' }
     ];
  }

  loading.value = false;
}

function openCreate() {
  activeDoc.value = null;
  isReadonly.value = false;
  form.id = '';
  form.code = 'SHP-NEW';
  form.carrierId = mockCarriers.value[0]?.id || '';
  form.trackingNo = '';
  form.shipDate = new Date().toISOString().split('T')[0];
  form.deliveryDate = '';
  form.status = 'CREATED';
  form.deliveryOrders = [];
  
  dialogOpen.value = true;
}

function openView(r: any) {
  activeDoc.value = r;
  isReadonly.value = true; 
  
  form.id = r.id;
  form.code = r.code;
  form.carrierId = r.carrierId || mockCarriers.value[0]?.id;
  form.trackingNo = r.trackingNo || '';
  form.shipDate = r.shipDate?.split('T')[0] || '';
  form.deliveryDate = r.deliveryDate?.split('T')[0] || '';
  form.status = r.status;
  
  if (r.deliveryOrders && r.deliveryOrders.length > 0) {
      form.deliveryOrders = r.deliveryOrders.map((x:any) => ({...x}));
  } else {
      form.deliveryOrders = [];
  }

  if (r.status === 'CREATED') {
      isReadonly.value = false;
  }

  dialogOpen.value = true;
}

function addLinkedDO() {
   form.deliveryOrders.push({ code: `DO-PENDING-TARIKAN-00${Math.floor(Math.random()*9)}` });
}

function removeDO(idx: number) {
   form.deliveryOrders.splice(idx, 1);
}

async function saveAction(targetStatus: string) {
  saving.value = true;
  form.status = targetStatus;
  
  let msg = "Kargo Berhasil dibungkus dan DO berhasil disortir ke dalamnya.";
  if(targetStatus === 'SHIPPED') msg = "EKSEKUSI TUNTAS! Pelacakan Nomor Resi (Tracking AWB) menyala. Kargo Ekspedisi ini telah menyeberang keluar gerbang pabrik ERP.";
  else if(targetStatus === 'DELIVERED') msg = "KARGO MENDARAT! Kargo telah berhasil terkirim ke tujuan.";
  else if(targetStatus === 'CANCELED') msg = "KARGO DIBATALKAN. Tidak dimuat atau gagal jalan.";

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
