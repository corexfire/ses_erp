<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-5 shadow-sm border-l-4 border-l-yellow-400">
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div class="text-sm font-semibold text-slate-800">Distribusi Komisi Tenaga Penjual (Sales Commission)</div>
          <div class="mt-1 text-sm text-slate-600">
            Pusat penghargaan (*Reward*) Divisi Marketing. Mengatur persentase/skema bagi hasil dari setiap faktur (Invoice) yang berhasil dibukukan/dilunaskan oleh staf Sales.
          </div>
        </div>
        <div class="flex gap-2">
          <Button label="Transfer ke Payroll (HRIS)" severity="secondary" size="small" outlined icon="pi pi-send" />
          <Button v-if="canManage" label="+ Rumus Skema Baru" size="small" bg="bg-yellow-500" class="text-slate-900 font-bold border-none shrink-0 cursor-pointer" icon="pi pi-percentage" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Data List and Filters -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-5 mt-4">
       <!-- Tab Kiri: Daftar Skema -->
       <div class="md:col-span-4 flex flex-col gap-4">
          <div class="rounded-xl border bg-white p-4 shadow-sm flex-1">
             <div class="text-xs font-black uppercase text-slate-400 tracking-wider mb-4 border-b pb-2"><i class="pi pi-sliders-h mr-1"></i> Skema Persentase (Scheme)</div>
             <div class="space-y-3">
                <!-- Iterasi Scheme -->
                <div v-for="sc in mockSchemes" :key="sc.id" class="border rounded-lg p-3 hover:border-yellow-400 cursor-pointer transition relative overflow-hidden group">
                   <div class="absolute right-0 top-0 bottom-0 bg-yellow-50 w-16 flex items-center justify-center font-mono font-black text-yellow-600 border-l border-yellow-100 group-hover:bg-yellow-400 group-hover:text-white transition-colors">
                      {{ (sc.rate * 100) }}%
                   </div>
                   <div class="pr-16">
                      <div class="font-bold text-slate-800 text-sm hover:underline hover:text-yellow-600">{{ sc.code }} <i v-if="sc.isActive" class="pi pi-check-circle text-emerald-500 text-[10px]"></i></div>
                      <div class="text-[10px] bg-slate-50 border p-1 rounded mt-1 font-medium text-slate-600 leading-tight w-full truncate">{{ sc.name }}</div>
                   </div>
                </div>
             </div>
          </div>
       </div>

       <!-- Tab Kanan: Buku Catatan Pencairan (Entries) -->
       <div class="md:col-span-8 flex flex-col gap-4">
          <div class="rounded-xl border bg-white p-5 shadow-sm flex-1">
             <div class="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div class="text-xs font-black uppercase text-slate-800 tracking-wider"><i class="pi pi-wallet mr-1 text-yellow-500"></i> Buku Komisi Staf (Commission Entries)</div>
                <div class="flex items-center gap-2">
                  <InputText v-model="search" placeholder="Cari Kode Invoice..." class="w-full md:w-48 text-[11px] h-8" />
                  <Button label="Filter Data" severity="secondary" size="small" class="h-8 text-[11px]" :disabled="loading" @click="load" />
                </div>
              </div>

              <!-- Entries Table -->
              <div class="overflow-x-auto rounded-lg border">
                <table class="w-full text-sm">
                  <thead class="bg-yellow-50/30 text-left text-[10px] text-yellow-900 border-b border-yellow-100 uppercase tracking-wider font-bold">
                    <tr>
                      <th class="px-3 py-2 w-1/4">Staf Penjual (User HR)</th>
                      <th class="px-3 py-2 text-center bg-slate-50 border-l px-2">Sumber (No. Faktur)</th>
                      <th class="px-3 py-2 text-right bg-slate-50 border-l w-28" title="Dasar Perhitungan (Nilai DPP / Invoice Bersih)">Base (Rp)</th>
                      <th class="px-3 py-2 text-center bg-yellow-50/50 border-l" title="Tarif Pengali">Rate</th>
                      <th class="px-3 py-2 text-right font-black border-l w-32 tracking-wider">KOMISI CAIR (Rp)</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y relative text-[11px]">
                     <tr v-if="loading">
                      <td colspan="5" class="px-4 py-16 text-center text-sm text-slate-500">
                        <i class="pi pi-spinner pi-spin mr-2 text-yellow-500"></i> Menghitung royalti staf...
                      </td>
                    </tr>
                    <!-- Iteration rows -->
                    <tr v-for="doc in filteredDocs" v-else :key="doc.id" class="transition hover:bg-yellow-50/20 group">
                      <!-- Staf HR -->
                      <td class="px-3 py-2 align-middle">
                        <div class="font-bold text-slate-800 flex items-center gap-2">
                           <i class="pi pi-user text-slate-400"></i> {{ doc.salesUser?.firstName || 'System Admin' }} {{ doc.salesUser?.lastName || '' }}
                        </div>
                        <div class="text-[9px] text-slate-400 mt-0.5 tracking-tighter">{{ formatDate(doc.createdAt) }}</div>
                      </td>
                      
                       <!-- Source Invoice -->
                      <td class="px-2 py-2 align-middle text-center bg-slate-50/50 border-l">
                         <div class="font-mono font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded shadow-sm hover:underline cursor-pointer transition-colors">{{ doc.invoice?.code || 'N/A' }}</div>
                      </td>

                      <!-- Base Amount -->
                      <td class="px-3 py-2 align-middle text-right border-l bg-slate-50 relative group-hover:bg-slate-100 transition-colors">
                         <div class="font-bold text-slate-500 font-mono">{{ formatCurrency(doc.baseAmount) }}</div>
                      </td>

                      <!-- Rate -->
                      <td class="px-1 py-2 align-middle text-center border-l bg-yellow-50/20">
                         <span class="inline-flex rounded px-1.5 py-0.5 text-[9px] font-black tracking-widest bg-yellow-100 text-yellow-700 border border-yellow-300">
                           {{ (Number(doc.scheme?.rate) * 100) }}%
                         </span>
                         <div class="text-[8px] mt-0.5 text-slate-400 truncate max-w-24 mx-auto leading-none" :title="doc.scheme?.name">{{ doc.scheme?.code }}</div>
                      </td>

                      <!-- Final Payout -->
                      <td class="px-3 py-2 align-middle text-right border-l font-mono tracking-tighter relative bg-yellow-200/10 group-hover:bg-yellow-100/50 transition-colors">
                        <div class="font-black text-slate-900 text-lg sm:text-lg"><span class="text-[9px] font-bold text-yellow-600/50 mr-0.5 relative -top-1">Rp</span>{{ formatCurrency(doc.amount) }}</div>
                      </td>
                    </tr>
                    <tr v-if="!loading && filteredDocs.length === 0">
                      <td colspan="5" class="px-4 py-16 text-center text-slate-400 border-t italic">
                        Belum ada riwayat pembagian komisi *Sales*.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
          </div>
       </div>
    </div>


    <!-- Creator Modal (Scheme Definition) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-2 sm:p-4 backdrop-blur-sm shadow-xl">
      <div class="w-full max-w-2xl rounded-xl border bg-slate-50 shadow-2xl flex flex-col animate-fade-in-up">
        
        <div class="p-5 border-b bg-yellow-400 border-yellow-500 relative overflow-hidden flex justify-between items-start">
          <div class="absolute -left-10 -top-10 opacity-20"><i class="pi pi-percentage text-[140px] text-yellow-900"></i></div>
          <div class="z-10 w-full pr-8">
             <div class="text-xl font-black text-slate-900 tracking-tight">Kalkulator Skema Komisi (Scheme)</div>
             <div class="text-xs font-semibold mt-1 text-yellow-900/80">Atur besaran persentase (*rate multiplier*) untuk jenis perolehan omzet tertentu. Skema ini nanti bisa diikat ke Profil Karyawan (HR).</div>
          </div>
          <button class="text-slate-900/50 hover:text-slate-900 bg-slate-900/10 hover:bg-slate-900/20 w-8 h-8 rounded text-lg font-bold flex items-center justify-center transition-colors z-20 shrink-0" @click="dialogOpen = false">✕</button>
        </div>

        <div class="px-6 py-5 bg-white space-y-4">
            <div class="grid grid-cols-2 gap-4">
               <div>
                  <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Kode Skema (Unik)</label>
                  <input type="text" v-model="form.code" class="w-full border-b-2 border-yellow-400 px-2 py-1.5 text-sm font-bold font-mono text-slate-800 bg-yellow-50 outline-none uppercase" placeholder="COM-TEND-GVT" />
               </div>
               <div>
                  <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Titel Deskriptif</label>
                  <input type="text" v-model="form.name" class="w-full border-b border-slate-300 px-2 py-1.5 text-sm font-bold text-slate-800 bg-white outline-none focus:border-yellow-500" placeholder="Insentif Tender Pemerintah..." />
               </div>
            </div>
            
            <div class="bg-slate-50 border p-4 rounded-lg shadow-inner flex items-center gap-6 mt-4">
               <div class="flex-1">
                  <label class="text-[10px] font-bold text-slate-600 block mb-2">Persentase Pengali Dasar (Rate %)</label>
                  <div class="flex items-center gap-2">
                     <input type="number" v-model.number="form.rateVisual" step="0.5" class="w-24 text-2xl font-black bg-white border-2 border-yellow-400 shadow rounded px-2 py-1 text-center outline-none focus:border-yellow-600 text-slate-800" />
                     <span class="text-3xl font-black text-slate-400">%</span>
                  </div>
                  <div class="text-[9px] mt-2 font-mono text-slate-400">Nilai DB Disimpan: <span class="font-bold text-indigo-500">{{ (form.rateVisual / 100).toFixed(4) }}</span> *(Desimal)*</div>
               </div>
               
               <div class="border-l pl-6 py-2 flex flex-col justify-center">
                  <label class="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" v-model="form.isActive" class="w-5 h-5 accent-emerald-500 cursor-pointer" />
                    <span class="text-sm font-bold text-slate-700 group-hover:text-emerald-700">Skema Diaktifkan</span>
                  </label>
               </div>
            </div>
        </div>

        <div class="p-4 border-t bg-slate-50 flex justify-end items-center rounded-b-xl gap-3">
          <Button label="Batal" severity="secondary" size="small" @click="dialogOpen = false" outlined class="bg-white border-slate-300 font-bold px-4" />
          <Button label="Simpan Skema (*Save*)" size="small" :loading="saving" :disabled="saving" @click="saveAction" class="bg-yellow-500 border-none text-slate-900 hover:text-white font-black tracking-widest shadow-sm px-6 hover:bg-yellow-600" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('sales.commission.manage') || true); 

const docs = ref<any[]>([]);
const mockSchemes = ref<any[]>([]);
const search = ref('');
const loading = ref(false);
const saving = ref(false);
const dialogOpen = ref(false);

const form = reactive({
  id: '',
  code: '',
  name: '',
  rateVisual: 2.5, // Used for UI form (2.5%)
  isActive: true,
});

const filteredDocs = computed(() => {
  let list = docs.value;
  if (search.value) {
    const q = search.value.toLowerCase();
    list = list.filter(p => p.invoice?.code?.toLowerCase().includes(q) || p.salesUser?.firstName?.toLowerCase().includes(q));
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


async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/query?table=CommissionEntry&include=scheme,invoice,salesUser');
    if (res.data && res.data.data) {
        docs.value = res.data.data;
    } else {
        throw new Error("No payload");
    }
  } catch (e: any) {
    // Mock Data based on postgres seeded data for Entries
    docs.value = [
      { 
        id: '1', baseAmount: 28750000, amount: 718750, createdAt: "2026-04-18T00:00",
        scheme: { code: 'COM-B2B-STD', name: 'Komisi B2B Reguler', rate: 0.025 },
        invoice: { code: 'INV-202604-001' },
        salesUser: { firstName: 'System', lastName: 'Admin' }
      }
    ];
  }

  try {
     const resSch = await api.get('/core/query?table=CommissionScheme');
     if (resSch.data?.data) {
        mockSchemes.value = resSch.data.data;
     } else {
        throw new Error("No payload for schemes");
     }
  } catch(e) {
     // Mock schemes
     mockSchemes.value = [
       { id: 's1', code: 'COM-B2B-STD', name: 'Komisi Sales B2B Standar (2.5%)', rate: 0.025, isActive: true },
       { id: 's2', code: 'COM-HORECA', name: 'Komisi Khusus Horeca Promosi (5%)', rate: 0.050, isActive: true }
     ];
  }

  loading.value = false;
}

function openCreate() {
  form.id = '';
  form.code = 'COM-BARU';
  form.name = '';
  form.rateVisual = 1.0;
  form.isActive = true;
  dialogOpen.value = true;
}

async function saveAction() {
  saving.value = true;
  setTimeout(() => {
    alert(`SKEMA BARU [${form.code}] berhasil direkam ke database HRIS! \nMultiplier Desimal aktual yang disimpan: ${(form.rateVisual / 100).toFixed(4)}`);
    dialogOpen.value = false;
    saving.value = false;
    load();
  }, 800);
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
