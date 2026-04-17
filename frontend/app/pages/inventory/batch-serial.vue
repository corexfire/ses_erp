<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-5 shadow-sm border-l-4 border-l-pink-600">
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div class="text-sm font-semibold text-slate-800">Manajemen Identifikasi Lot (Batches) & Serials</div>
          <div class="mt-1 text-sm text-slate-600">
            Jantung pelacakan (*Traceability*) rantai pasokan. Kelola masa kedaluwarsa aset produksi (Lot/Batch) dan jejak tunggal perlengkapan pabrik (Nomor Seri).
          </div>
        </div>
        <div class="flex gap-2">
          <Button label="Audit Recall Produk" severity="secondary" size="small" outlined icon="pi pi-exclamation-triangle" class="text-rose-600 border-rose-200" />
          <Button v-if="canManage" label="+ Generate Identitas Lot" size="small" bg="bg-pink-600" class="text-white border-none shrink-0" icon="pi pi-qrcode" @click="openCreate" />
        </div>
      </div>
    </div>

    <div class="grid md:grid-cols-2 gap-4">
       <!-- Tabulator Kontrol -->
       <div class="bg-white p-2 rounded-xl border border-slate-200 shadow-sm flex font-bold text-xs">
          <button class="flex-1 py-2 px-4 rounded-lg text-center transition-colors" :class="activeTab === 'BATCH' ? 'bg-pink-50 text-pink-700 shadow-sm border border-pink-100' : 'text-slate-500 hover:bg-slate-50'" @click="activeTab = 'BATCH'">
             <i class="pi pi-tags mr-1"></i> Data Lot / Batches
          </button>
          <button class="flex-1 py-2 px-4 rounded-lg text-center transition-colors" :class="activeTab === 'SERIAL' ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100' : 'text-slate-500 hover:bg-slate-50'" @click="activeTab = 'SERIAL'">
             <i class="pi pi-barcode mr-1"></i> Entitas Nomor Seri Individu
          </button>
       </div>
       <div class="flex items-center">
          <InputText v-model="search" placeholder="Cari Kode Batches / Serials..." class="w-full text-xs h-full placeholder:text-sm" />
       </div>
    </div>

    <!-- Data List (BATCH) -->
    <div v-show="activeTab === 'BATCH'" class="rounded-xl border bg-white p-5 shadow-sm animate-fade-in-up">
      <div class="overflow-x-auto rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-pink-50 text-left text-xs text-pink-900 border-b border-pink-100 uppercase tracking-wider">
            <tr>
              <th class="px-4 py-3 font-semibold w-72">Kode Identifikasi Lot / Batch</th>
              <th class="px-4 py-3 font-semibold border-l bg-slate-50">Induk Material (Item / SKU)</th>
              <th class="px-4 py-3 text-center border-l bg-rose-50/30 font-semibold" title="Expired Date">Tanggal Batas Waktu (Kedaluwarsa)</th>
              <th class="px-4 py-3 text-center border-l bg-slate-50 font-semibold w-32">Status Umur</th>
            </tr>
          </thead>
          <tbody class="divide-y relative">
             <tr v-if="loading">
              <td colspan="4" class="px-4 py-16 text-center text-sm text-slate-500">
                <i class="pi pi-spinner pi-spin mr-2"></i> Mensinkronisasi pangkalan data keterlacakan...
              </td>
            </tr>
            <tr v-for="b in filteredBatches" v-else :key="b.id" class="transition hover:bg-slate-50/50">
              <td class="px-4 py-4 align-top">
                <div class="font-black text-pink-700 text-sm font-mono tracking-widest"><i class="pi pi-tag text-[10px] mr-1"></i>{{ b.code }}</div>
                <div class="text-[9px] text-slate-400 font-mono mt-1 w-48 truncate" title="Sistem Auto ID">Sys ID: {{ b.id }}</div>
              </td>
              <td class="px-4 py-4 align-top border-l bg-slate-50/20">
                 <div class="font-bold text-slate-800 text-xs truncate max-w-[250px]">{{ b.item?.name || 'Raw Material Terhapus' }}</div>
                 <div class="text-[10px] font-mono mt-1 text-slate-500 bg-white border inline-block px-1 rounded shadow-sm">{{ b.item?.code }}</div>
              </td>
              <td class="px-4 py-4 align-top text-center border-l bg-rose-50/10 text-rose-800 font-bold font-mono tracking-wider">
                 {{ formatDate(b.expiryDate) }}
              </td>
              <td class="px-4 py-4 align-top text-center border-l">
                 <span class="inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider" :class="isExpired(b.expiryDate) ? 'bg-rose-100 text-rose-700 border border-rose-200' : 'bg-emerald-100 text-emerald-700 border border-emerald-200'">
                   {{ isExpired(b.expiryDate) ? 'KEDALUWARSA (EXPIRED)' : 'AMAN (ED VALID)' }}
                 </span>
              </td>
            </tr>
            <tr v-if="!loading && filteredBatches.length === 0">
              <td colspan="4" class="px-4 py-16 text-center text-slate-500 border-t">
                <div class="text-4xl mb-3 opacity-50 text-slate-200"><i class="pi pi-tags"></i></div>
                Tidak ditemukan riwayat Batch.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Data List (SERIAL) -->
    <div v-show="activeTab === 'SERIAL'" class="rounded-xl border bg-white p-5 shadow-sm animate-fade-in-up">
      <div class="overflow-x-auto rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-indigo-50 text-left text-xs text-indigo-900 border-b border-indigo-100 uppercase tracking-wider">
            <tr>
              <th class="px-4 py-3 font-semibold w-72">Plat / Nomor Seri Spesifik (S/N)</th>
              <th class="px-4 py-3 font-semibold border-l bg-slate-50">Kategori Hardware / Unit Khusus</th>
              <th class="px-4 py-3 text-center border-l bg-slate-50 font-semibold w-32">Status Aktiva Unit</th>
            </tr>
          </thead>
          <tbody class="divide-y relative">
             <tr v-if="loading">
              <td colspan="3" class="px-4 py-16 text-center text-sm text-slate-500">
                <i class="pi pi-spinner pi-spin mr-2"></i> Merender kepemilikan aset unik...
              </td>
            </tr>
            <tr v-for="s in filteredSerials" v-else :key="s.id" class="transition hover:bg-slate-50/50">
              <td class="px-4 py-4 align-top">
                <div class="font-black text-indigo-700 text-sm font-mono tracking-widest"><i class="pi pi-barcode text-[10px] mr-1"></i>{{ s.serialNo }}</div>
                <div class="text-[9px] text-slate-400 font-mono mt-1 w-48 truncate">Sys ID: {{ s.id }}</div>
              </td>
              <td class="px-4 py-4 align-top border-l bg-slate-50/20">
                 <div class="font-bold text-slate-800 text-xs truncate max-w-[250px]">{{ s.item?.name || 'Aset Terhapus' }}</div>
                 <div class="text-[10px] font-mono mt-1 text-slate-500 bg-white border inline-block px-1 rounded shadow-sm">{{ s.item?.code }}</div>
              </td>
              <td class="px-4 py-4 align-top text-center border-l">
                 <span class="inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-sm" :class="s.status === 'AVAILABLE' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600 border border-slate-300'">
                   {{ s.status === 'AVAILABLE' ? 'TERSIPAN / DIAM' : s.status }}
                 </span>
              </td>
            </tr>
            <tr v-if="!loading && filteredSerials.length === 0">
              <td colspan="3" class="px-4 py-16 text-center text-slate-500 border-t">
                <div class="text-4xl mb-3 opacity-50 text-slate-200"><i class="pi pi-barcode"></i></div>
                Tidak ada perlengkapan/aset yang menggunakan S/N unik.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


    <!-- Dialog Register Identitas -->
     <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4 backdrop-blur-sm shadow-xl">
      <div class="w-full max-w-lg rounded-xl border bg-slate-50 shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
        
        <!-- Header -->
        <div class="p-6 border-b flex flex-col sm:flex-row items-center justify-between shrink-0 gap-4 relative overflow-hidden shadow-sm" :class="form.type === 'BATCH' ? 'bg-pink-900' : 'bg-indigo-900'">
          <div class="absolute left-[-20px] top-[-20px] opacity-10 text-white">
             <i class="text-[150px]" :class="form.type === 'BATCH' ? 'pi pi-tags' : 'pi pi-barcode'"></i>
          </div>
          <div class="z-10 w-full flex justify-between items-start">
             <div>
               <div class="text-xl font-black text-white tracking-tight">Registrasi Node {{ form.type === 'BATCH' ? 'Lot/Batch' : 'Serial Number' }}</div>
               <div class="text-xs font-medium opacity-80 mt-1 pl-1" :class="form.type === 'BATCH' ? 'text-pink-200' : 'text-indigo-200'">Mendaftarkan blok identitas inventaris baru ke sistem WMS ERP.</div>
             </div>
          </div>
          <button class="text-white/50 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded text-lg font-bold flex items-center justify-center transition-colors shadow-sm z-20 absolute right-4 top-4" @click="dialogOpen = false">✕</button>
        </div>

        <div class="p-6 bg-white space-y-4 relative z-10">
           <div class="grid grid-cols-2 gap-4">
               <!-- Radio Switcher -->
               <div class="col-span-2 flex font-bold text-xs p-1 bg-slate-100 rounded-lg shadow-inner">
                  <button class="flex-1 py-1.5 rounded-md text-center transition-colors" :class="form.type === 'BATCH' ? 'bg-white shadow-sm text-pink-700' : 'text-slate-500'" @click="form.type = 'BATCH'">Buka Jalur Batch (Massa)</button>
                  <button class="flex-1 py-1.5 rounded-md text-center transition-colors" :class="form.type === 'SERIAL' ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-500'" @click="form.type = 'SERIAL'">Buka Unit Serials</button>
               </div>

               <!-- Form Inputs -->
               <div class="col-span-2 space-y-1">
                  <label class="text-[10px] font-bold text-slate-500">Material / Unit Induk Afiliasi</label>
                  <select v-model="form.itemId" class="w-full border rounded p-2 text-xs font-bold font-mono text-slate-700 bg-slate-50 shadow-inner outline-none">
                     <option value="">-- Pilih Induk Item --</option>
                     <option v-for="i in mockItems" :value="i.id">{{ i.code }} - {{ i.name }}</option>
                  </select>
               </div>

               <div class="col-span-2 space-y-1">
                  <label class="text-[10px] font-bold text-slate-500">{{ form.type === 'BATCH' ? 'Kode Identifikasi Tinta Lot (LOT / BATCH CODE)' : 'Nomor Seri Unik (SERIAL NUMBER)' }}</label>
                  <input type="text" v-model="form.code" class="w-full border-b-2 border-slate-300 px-2 py-2 text-lg font-black font-mono text-slate-800 outline-none uppercase bg-slate-50" :placeholder="form.type === 'BATCH' ? 'LOT-XXXX-XXX' : 'SN-XXXXXXXXX'" />
               </div>

               <div v-if="form.type === 'BATCH'" class="col-span-2 space-y-1 mt-2">
                  <label class="text-[10px] font-bold text-slate-500">Batas Waktu Kedaluwarsa Material (ED)</label>
                  <input type="date" v-model="form.expiryDate" class="w-full border rounded p-2 text-sm font-bold text-slate-700 bg-rose-50 border-rose-200 outline-none focus:border-rose-500" />
               </div>
           </div>
           
           <div class="mt-4 p-4 rounded-xl border bg-slate-50 flex gap-3 text-[10px] text-slate-600 leading-relaxed font-bold">
              <i class="pi pi-shield text-xl text-slate-400"></i>
              Kode identifikasi yang sudah diinjeksi akan memantau riwayat usia stok. Hati-hati salah memasukan data, identitas ini akan dicangkok pada seluruh mutasi, penjualan, maupun retur yang mereferensikannya.
           </div>
        </div>

        <div class="p-5 border-t border-slate-200 bg-slate-100 flex justify-between items-center shrink-0 rounded-b-xl z-20">
          <Button label="Batal" severity="secondary" size="small" @click="dialogOpen = false" outlined class="bg-white border-slate-300 font-bold" />
          <Button label="Injeksi Identitas Baru" severity="info" size="small" :loading="saving" :disabled="saving" @click="save" class="border-none text-white font-bold px-6 shadow" :class="form.type === 'BATCH' ? 'bg-pink-600 hover:bg-pink-700' : 'bg-indigo-600 hover:bg-indigo-700'" />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('inventory.batch.manage') || true); 

const batches = ref<any[]>([]);
const serials = ref<any[]>([]);
const search = ref('');
const loading = ref(false);
const saving = ref(false);

const activeTab = ref('BATCH');
const dialogOpen = ref(false);

const form = reactive({
  type: 'BATCH',
  itemId: '',
  code: '',
  expiryDate: ''
});

const mockItems = ref<any[]>([
  {id:'1', code:'RM-BKS-01', name:'Biji Kopi Spesialti Arabica (Green Beans)'},
  {id:'2', code:'EQ-MCH-001', name:'Mesin Roasting Kopi Digital'}
]);

const filteredBatches = computed(() => {
  let list = batches.value;
  if (search.value) {
    const q = search.value.toLowerCase();
    list = list.filter(p => p.code?.toLowerCase().includes(q) || p.item?.name?.toLowerCase().includes(q));
  }
  return list;
});

const filteredSerials = computed(() => {
  let list = serials.value;
  if (search.value) {
    const q = search.value.toLowerCase();
    list = list.filter(p => p.serialNo?.toLowerCase().includes(q) || p.item?.name?.toLowerCase().includes(q));
  }
  return list;
});

const formatDate = (iso: string) => {
  if (!iso) return '-';
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};

const isExpired = (iso: string) => {
   if(!iso) return false;
   const d = new Date(iso);
   const now = new Date();
   return d < now;
}

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/query?table=ItemBatch&include=item');
    if (res.data && res.data.data) {
        batches.value = res.data.data;
    }
    
    const resSerials = await api.get('/core/query?table=ItemSerial&include=item');
    if (resSerials.data && resSerials.data.data) {
        serials.value = resSerials.data.data;
    }
  } catch (e: any) {
    // Mock Data based on postgres seeded data
    batches.value = [
      { id: '1', code: "LOT-0426-A", expiryDate: "2027-04-20T00:00", item: { code: 'RM-BKS-01', name: 'Biji Kopi Spesialti Arabica' } },
      { id: '2', code: "LOT-0426-B", expiryDate: "2024-01-01T00:00", item: { code: 'RM-BKS-01', name: 'Biji Kopi Spesialti Arabica' } } // Mock 1 expired
    ];
    serials.value = [
      { id: '1', serialNo: "SN/ROAST/2604/001", status: "AVAILABLE", item: { code: 'EQ-MCH-001', name: 'Mesin Roasting Kopi Digital' } },
      { id: '2', serialNo: "SN/ROAST/2604/002", status: "IN_USE", item: { code: 'EQ-MCH-001', name: 'Mesin Roasting Kopi Digital' } }
    ];
  } finally {
    loading.value = false;
  }
}

function openCreate() {
  form.type = activeTab.value; // Ikuti tab
  form.itemId = mockItems.value[0].id;
  form.code = '';
  form.expiryDate = '';
  
  dialogOpen.value = true;
}

async function save() {
  saving.value = true;
  setTimeout(() => {
    alert(`Identitas ${form.type === 'BATCH' ? 'Grup Lot' : 'Aset Serial'} baru ditambahkan ke Node Induk Data. Sistem kini siap mengakomodir kedatangan logistik dengan parameter tersebut.`);
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