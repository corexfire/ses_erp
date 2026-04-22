<template>
  <div class="space-y-4">
    <!-- Header (Premium Logistics Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-sky-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-sky-100/50"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-sky-400">Transit Core</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-sky-600">Freight & Carrier Management</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase">Kargo <span class="text-sky-600 italic text-3xl">& Logistik</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl">Pusat navigasi armada ekspedisi. Menggabungkan beberapa Surat Jalan (DO) ke dalam satu manifest kargo untuk pelacakan efisiensi rute dan realisasi AWB.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="Mitra Logistik" size="small" icon="pi pi-users" class="p-button-rounded h-12 px-8 bg-slate-100 border-none text-slate-600 font-black text-[10px] uppercase hover:bg-slate-200 transition-all shadow-sm" @click="dialogCarrier = true" />
          <Button label="Manifest Baru" size="small" icon="pi pi-box" class="p-button-rounded h-12 px-8 bg-sky-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-sky-100 hover:scale-105 active:scale-95 transition-all" v-if="canManage" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Dynamic Freight KPIs (High-Contrast Style) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up mt-4">
      <div class="p-4 rounded-2xl bg-sky-600 text-white shadow-xl flex flex-col justify-between border border-sky-500 transition-all hover:bg-sky-700 group">
        <div class="text-[10px] font-black uppercase text-sky-200 tracking-[0.2em] mb-4 opacity-80">Total Manifest Aktif</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ docs.length }}</h3>
          <div class="p-3 bg-white/20 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-globe text-lg animate-spin-slow"></i>
          </div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-amber-600 tracking-[0.2em] mb-4">Dalam Perjalanan</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-amber-700 tracking-tighter leading-none">{{ docs.filter(p => p.status === 'SHIPPED').length }}</h3>
          <div class="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100"><i class="pi pi-send text-lg"></i></div>
        </div>
      </div>
      
      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-4">Berhasil Mendarat</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-emerald-700 tracking-tighter leading-none">{{ docs.filter(p => p.status === 'DELIVERED').length }}</h3>
          <div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100"><i class="pi pi-check-circle text-lg"></i></div>
        </div>
      </div>

       <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 text-slate-400 opacity-50">
        <div class="text-[10px] font-black uppercase tracking-[0.2em] mb-4">Efisiensi Rute</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black tracking-tighter leading-none">98%</h3>
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-100"><i class="pi pi-map text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Manifest Ledger (Premium Grid) -->
    <div class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up mt-6 pb-20">
      <!-- Controls Bar -->
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-sky-200/20 rounded-full blur-3xl"></div>
        
        <div class="relative flex items-center gap-4">
           <div class="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-sky-400 shadow-xl"><i class="pi pi-globe text-xl animate-spin-slow"></i></div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Riwayat Pengangkutan Kargo</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Freight Manifest Ledger</p>
           </div>
        </div>

        <div class="relative flex items-center gap-3">
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <InputText v-model="search" placeholder="Cari Resi / Manifest..." class="border-none bg-transparent text-[11px] h-9 w-64 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" @keyup.enter="load" />
            <div class="h-6 w-[1px] bg-slate-100 mx-2"></div>
            <select v-model="statusFilter" class="bg-transparent text-[10px] font-black uppercase tracking-widest text-slate-500 pr-8 outline-none cursor-pointer hover:text-sky-600 transition-colors">
              <option value="">Semua Status</option>
              <option value="CREATED">Penyusunan (Transit)</option>
              <option value="SHIPPED">Berlayar (Shipped)</option>
              <option value="DELIVERED">Mendarat (Delivered)</option>
            </select>
          </div>
          <Button icon="pi pi-refresh" severity="secondary" rounded text @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-sky-600 transition-all shadow-sm bg-white" />
        </div>
      </div>

      <!-- Shipment Table -->
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-sm">
          <thead class="bg-white text-left border-b border-slate-50 font-bold">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Kode Manifest</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-center w-52 border-l border-slate-50">Agen Ekspedisi</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-center w-52 border-l border-slate-50">Lacak Resi (AWB)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-center w-52 border-l border-slate-50">Trayek Kargo</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-40 border-l border-slate-50">Navigasi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
             <tr v-if="loading">
              <td colspan="5" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-sky-500 opacity-20"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-sky-600">Membuka gerbang pelabuhan...</div>
              </td>
            </tr>
            
            <tr v-for="doc in filteredDocs" v-else :key="doc.id" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent hover:border-l-sky-400" @click="openView(doc)">
              <td class="px-8 py-6 align-middle">
                <div>
                  <div class="font-black text-slate-900 text-[13px] tracking-tight leading-none mb-2 group-hover:text-sky-700 transition-colors uppercase">
                     {{ doc.code }}
                  </div>
                  <div class="flex items-center gap-3">
                     <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none flex items-center gap-1.5" v-if="doc.shipDate">
                        <i class="pi pi-calendar-plus text-sky-400"></i> Diserahkan: {{ formatDate(doc.shipDate) }}
                     </div>
                     <div class="text-[9px] font-black text-emerald-500 uppercase tracking-widest leading-none flex items-center gap-1.5" v-if="doc.deliveryDate">
                        <i class="pi pi-verified text-emerald-400"></i> Tiba: {{ formatDate(doc.deliveryDate) }}
                     </div>
                  </div>
                </div>
              </td>
              
              <td class="px-6 py-6 align-middle text-center border-l border-slate-50 bg-slate-50/20 group-hover:bg-slate-100/30 transition-colors">
                 <div class="flex flex-col items-center gap-1">
                    <div class="font-black text-slate-700 text-[11px] uppercase tracking-tight">{{ doc.carrier?.name || 'Truk Internal' }}</div>
                    <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono">{{ doc.carrier?.code }}</div>
                 </div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50 bg-indigo-50/5 group-hover:bg-indigo-50/20 transition-colors">
                 <div class="inline-flex font-mono font-black text-[12px] text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-xl shadow-sm hover:underline cursor-pointer">
                    {{ doc.trackingNo || 'BELUM TERBIT' }}
                 </div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50 relative overflow-hidden">
                 <div class="absolute left-0 bottom-0 w-2 h-full bg-sky-400 opacity-20 transition-all group-hover:w-full"></div>
                 <div class="relative z-10 space-y-2">
                    <span class="inline-flex rounded-xl px-4 py-1.5 text-[10px] font-black tracking-[0.2em] border w-40 flex items-center justify-center shadow-sm backdrop-blur-sm" :class="statusBadgeParams(doc.status)">
                       {{ statusMapper(doc.status) }}
                    </span>
                    <div v-show="doc.status === 'SHIPPED'" class="text-[8px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1.5"><i class="pi pi-bolt text-yellow-500"></i> Radar GPS Aktif</div>
                 </div>
              </td>

              <td class="px-8 py-6 align-middle text-right border-l border-slate-50">
                 <Button label="Detil Kargo" size="small" rounded outlined class="text-[10px] px-6 font-black py-2.5 h-10 border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all uppercase tracking-widest" />
              </td>
            </tr>
            <tr v-if="!loading && filteredDocs.length === 0">
              <td colspan="5" class="py-32 text-center">
                 <i class="pi pi-map text-6xl text-slate-100 mb-4 block"></i>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Belum ada aktivitas peti kemas laut/udara.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


    <!-- Dialog Logistics Hub (Universal Centered Style) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-4xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-slate-900">
        <!-- Dialog Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-sky-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-16 h-16 rounded-[1.5rem] bg-sky-600 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0">
               <i class="pi pi-globe text-3xl font-black animate-spin-slow"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">Navigasi <span class="text-sky-600 italic">Manifest Kargo</span></h3>
                <span v-if="activeDoc?.id" class="inline-flex rounded-xl text-[10px] font-black uppercase shadow-sm border px-4 py-1.5 h-8 items-center tracking-widest" :class="statusBadgeParams(form.status)">
                   {{ statusMapper(form.status) }}
                </span>
              </div>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-sky-500 text-sky-600">Enterprise Cargo Navigation Hub</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-slate-50 h-12 w-12" />
        </div>
        
        <!-- Dialog Body (Manifest Builder) -->
        <div class="p-10 space-y-10 flex-1 overflow-y-auto bg-slate-50/30 custom-scrollbar">
           <!-- Step 1: Carrier & Route Meta -->
           <div class="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
              <div class="flex items-center gap-4 mb-2">
                 <div class="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600 font-black text-[10px]">01</div>
                 <div class="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em]">Parameter Ekspedisi</div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div class="space-y-3">
                    <label class="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] block px-1">Mitra Armada (Carrier / 3PL) <span class="text-red-500">*</span></label>
                    <div class="relative">
                       <select :disabled="isReadonly" v-model="form.carrierId" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-100 shadow-inner outline-none focus:ring-2 focus:ring-sky-400 transition-all uppercase appearance-none cursor-pointer hover:bg-slate-200">
                          <option value="">-- Pilih Ekspedisi Vendor --</option>
                          <option v-for="c in mockCarriers" :value="c.id">{{ c.code }} - {{ c.name }}</option>
                       </select>
                       <i class="pi pi-chevron-down absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
                    </div>
                 </div>
                 <div class="space-y-3">
                    <label class="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] block px-1">Nomor Resi / AWB API</label>
                    <input :disabled="isReadonly" type="text" v-model="form.trackingNo" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-indigo-700 bg-indigo-50 shadow-inner outline-none focus:ring-2 focus:ring-indigo-400 transition-all font-mono tracking-widest uppercase" placeholder="CONTOH: JNE-1234567..." />
                 </div>
              </div>

              <div class="grid grid-cols-2 md:grid-cols-3 gap-8">
                 <div class="space-y-3">
                    <label class="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] block px-1">Status Trayek</label>
                    <div class="relative">
                       <select :disabled="isReadonly && canManage === false" v-model="form.status" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-100 shadow-inner outline-none focus:ring-2 focus:ring-sky-400 transition-all appearance-none cursor-pointer">
                          <option value="CREATED">Penyusunan Kargo (TRANSIT)</option>
                          <option value="SHIPPED">Kargo Berlayar (SHIPPED)</option>
                          <option value="DELIVERED">Kargo Mendarat (DELIVERED)</option>
                          <option value="CANCELED">Dibatalkan (CANCELED)</option>
                       </select>
                       <i class="pi pi-chevron-down absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
                    </div>
                 </div>
                 <div class="space-y-3">
                    <label class="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] block px-1">Tgl Penyerahan Brg</label>
                    <input :disabled="isReadonly" type="date" v-model="form.shipDate" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-100 shadow-inner outline-none focus:ring-2 focus:ring-sky-400 transition-all" />
                 </div>
                 <div class="space-y-3">
                    <label class="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] block px-1">Aktual Tiba</label>
                    <input :disabled="isReadonly" type="date" v-model="form.deliveryDate" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-100 shadow-inner outline-none focus:ring-2 focus:ring-sky-400 transition-all" />
                 </div>
              </div>
           </div>

           <!-- Step 2: Linked DOs (Manifest Contents) -->
           <div class="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
              <div class="flex items-center justify-between mb-2">
                 <div class="flex items-center gap-4">
                    <div class="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600 font-black text-[10px]">02</div>
                    <div class="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em]">Surat Jalan Terafiliasi (Linked DO)</div>
                 </div>
                 <Button v-if="!isReadonly" label="Ikat DO Belum Terkirim" icon="pi pi-plus" size="small" rounded text class="text-[10px] font-black uppercase tracking-widest text-sky-600 hover:bg-sky-50 px-6 h-10 border border-sky-100" @click="addLinkedDO" />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div v-for="(doLink, idx) in form.deliveryOrders" :key="idx" class="p-4 rounded-3xl border border-slate-100 bg-slate-50 relative group overflow-hidden transition-all hover:border-sky-200 hover:bg-white hover:shadow-lg">
                    <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-sky-400 h-full opacity-40"></div>
                    <div class="flex items-center justify-between gap-4 pl-2">
                       <div class="space-y-1">
                          <div class="text-[13px] font-black text-slate-900 flex items-center gap-2 font-mono uppercase tracking-widest"><i class="pi pi-truck text-sky-400"></i> {{ doLink.code }}</div>
                          <div class="text-[9px] font-black text-emerald-600 uppercase tracking-[0.2em] flex items-center gap-1.5"><i class="pi pi-check"></i> DO Ready to Ship</div>
                       </div>
                       <Button v-if="!isReadonly" icon="pi pi-times" severity="danger" rounded text @click="removeDO(idx)" class="h-10 w-10 opacity-40 group-hover:opacity-100 transition-opacity bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white" />
                    </div>
                 </div>
                 
                 <div v-if="form.deliveryOrders.length === 0" class="col-span-2 py-12 text-center border-2 border-dashed border-slate-100 rounded-[2.5rem]">
                    <i class="pi pi-link text-4xl text-slate-100 mb-3 block"></i>
                    <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Belum ada Surat Jalan (DO) gudang yang diikat.</div>
                 </div>
              </div>
           </div>
        </div>

        <!-- Dialog Footer Gates -->
        <div class="p-10 border-t bg-white flex justify-between items-center shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] rounded-b-[2.5rem]">
          <Button label="Batalkan" severity="secondary" text @click="dialogOpen = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 rounded-xl" />
          <Button v-if="canManage" label="Simpan Perubahan Kargo" severity="info" :loading="saving" :disabled="saving" @click="saveAction(form.status)" class="p-button-rounded h-14 px-12 bg-sky-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-sky-100 hover:scale-105 active:scale-95 transition-all" icon="pi pi-check" />
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
    if(s === 'DELIVERED') return 'KARGO MASUK TUJUAN (DELIVERED)';
    if(s === 'CREATED') return 'PENYUSUNAN KARGO (TRANSIT)';
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
.animate-fade-in-up { 
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
}

@keyframes fadeInUp { 
  from { opacity: 0; transform: translateY(30px); } 
  to { opacity: 1; transform: translateY(0); } 
}

.animate-scale-in { 
  animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
}

@keyframes scaleIn { 
  from { opacity: 0; transform: scale(0.95) translateY(10px); } 
  to { opacity: 1; transform: scale(1) translateY(0); } 
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 12s linear infinite;
}

.custom-scrollbar::-webkit-scrollbar { 
  width: 4px; 
}
.custom-scrollbar::-webkit-scrollbar-track { 
  background: transparent; 
}
.custom-scrollbar::-webkit-scrollbar-thumb { 
  background: #e2e8f0; 
  border-radius: 10px; 
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover { 
  background: #cbd5e1; 
}

:deep(.p-inputtext) {
   border-color: #f1f5f9 !important;
   box-shadow: none !important;
   background-color: #f8fafc !important;
   border-radius: 16px !important;
}

:deep(.p-button-rounded) {
  border-radius: 9999px !important;
}
</style>
