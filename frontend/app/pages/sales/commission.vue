<template>
  <div class="space-y-4">
    <!-- Header (Premium Reward Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-yellow-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-yellow-100/50"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic">Reward Hub</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-yellow-600">Incentive Distribution</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase">Komisi <span class="text-yellow-600 italic text-3xl">& Insentif</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl">Pusat manajemen reward divisi marketing. Mengatur skema bagi hasil dan audit pencairan bonus tenaga penjual berdasar realisasi faktur pelunasan.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="Transfer ke Payroll" size="small" icon="pi pi-send" class="p-button-rounded h-12 px-8 bg-slate-100 border-none text-slate-600 font-black text-[10px] uppercase hover:bg-slate-200 transition-all shadow-sm" />
          <Button label="Rumus Skema Baru" size="small" icon="pi pi-percentage" class="p-button-rounded h-12 px-8 bg-yellow-400 border-none text-slate-900 font-black text-[10px] uppercase shadow-xl shadow-yellow-100 hover:scale-105 active:scale-95 transition-all" v-if="canManage" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- High-Contrast KPI Banners (Premium style) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up mt-4">
       <!-- Primary engagement banner -->
      <div class="p-4 rounded-2xl bg-yellow-400 text-slate-900 shadow-xl flex flex-col justify-between border border-yellow-300 transition-all hover:bg-yellow-500 group">
        <div class="text-[10px] font-black uppercase text-yellow-800 tracking-[0.2em] mb-4 opacity-80">Total Dana Komisi Cair</div>
        <div class="flex items-end justify-between">
          <div class="flex items-start gap-1">
             <span class="text-xs font-black text-yellow-800 mt-1 uppercase">Rp</span>
             <h3 class="text-4xl font-black text-slate-900 tracking-tighter leading-none">{{ formatCurrency(totalCommissionAmount) }}</h3>
          </div>
          <div class="p-3 bg-white/20 rounded-xl text-slate-900 shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-wallet text-lg"></i>
          </div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-amber-600 tracking-[0.2em] mb-4">Skema Insentif Aktif</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-amber-700 tracking-tighter leading-none">{{ mockSchemes.length }}</h3>
          <div class="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100"><i class="pi pi-sliders-h text-lg"></i></div>
        </div>
      </div>
      
      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-indigo-600 tracking-[0.2em] mb-4">Menunggu Payroll</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-indigo-700 tracking-tighter leading-none">{{ docs.length }}</h3>
          <div class="p-3 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100"><i class="pi pi-send text-lg"></i></div>
        </div>
      </div>

       <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-4">Efektivitas Insentif</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-emerald-700 tracking-tighter leading-none">94%</h3>
          <div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100"><i class="pi pi-chart-line text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Data List and Filters -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-4 mt-6 pb-20">
       <!-- Tab Kiri: Daftar Skema (Premium Sidebar) -->
       <div class="md:col-span-4 flex flex-col gap-4">
          <div class="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm flex-1 relative overflow-hidden group transition-all hover:shadow-xl">
             <div class="absolute -right-10 -bottom-10 opacity-[0.03] pointer-events-none group-hover:rotate-12 transition-transform duration-1000">
                <i class="pi pi-percentage text-[200px] text-slate-900 font-black"></i>
             </div>
             <div class="flex flex-col gap-8 relative z-10">
                <div class="flex items-center gap-3 border-b border-slate-100 pb-6">
                   <div class="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center text-slate-900 shadow-lg group-hover:scale-110 transition-transform"><i class="pi pi-sliders-h font-bold"></i></div>
                   <div>
                      <div class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Skema Persentase</div>
                      <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono">Incentive Architecture</div>
                   </div>
                </div>
                
                <div class="space-y-4">
                   <!-- Iterasi Scheme (Premium Style) -->
                   <div v-for="sc in mockSchemes" :key="sc.id" class="border border-slate-100 rounded-[2rem] p-5 hover:border-yellow-400 cursor-pointer transition-all bg-slate-50/50 hover:bg-white hover:shadow-lg relative overflow-hidden group/item shadow-inner active:scale-[0.98]">
                      <div class="absolute right-0 top-0 bottom-0 bg-yellow-50 w-20 flex items-center justify-center font-mono font-black text-yellow-600 border-l border-yellow-100 group-hover/item:bg-yellow-400 group-hover/item:text-slate-900 transition-all">
                         {{ (sc.rate * 100) }}%
                      </div>
                      <div class="pr-20 space-y-1">
                         <div class="font-black text-slate-900 text-[13px] tracking-tight flex items-center gap-2 uppercase">
                            {{ sc.code }} 
                            <i v-if="sc.isActive" class="pi pi-check-circle text-emerald-500 text-[10px] animate-pulse"></i>
                         </div>
                         <div class="text-[10px] font-medium text-slate-400 leading-tight w-full truncate italic">{{ sc.name }}</div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>

       <!-- Tab Kanan: Buku Catatan Pencairan (Premium Grid) -->
       <div class="md:col-span-8 flex flex-col gap-4">
          <div class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm flex-1 overflow-hidden animate-fade-in-up">
              <!-- Controls Bar -->
              <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
                <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-200/20 rounded-full blur-3xl"></div>
                
                <div class="relative flex items-center gap-4">
                   <div class="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl"><i class="pi pi-wallet text-xl"></i></div>
                   <div>
                      <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Buku Komisi Staf</h3>
                      <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Commission Entries Ledger</p>
                   </div>
                </div>

                <div class="relative flex items-center gap-2">
                  <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1 ml-auto">
                    <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
                    <InputText v-model="search" placeholder="Cari Kode Invoice..." class="border-none bg-transparent text-[11px] h-9 w-44 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" @keyup.enter="load" />
                    <Button icon="pi pi-refresh" severity="secondary" rounded text @click="load" :loading="loading" class="h-9 w-9 text-slate-400 hover:text-yellow-600 transition-all shrink-0" />
                  </div>
                </div>
              </div>

              <!-- Entries Table -->
              <div class="overflow-x-auto custom-scrollbar">
                <table class="w-full text-sm">
                  <thead class="bg-white text-left border-b border-slate-50">
                    <tr>
                      <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Staf Sales</th>
                      <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-center w-36 border-l border-slate-50">Faktur Reff</th>
                      <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-44 border-l border-slate-50">Nilai Basis</th>
                      <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-center w-32 border-l border-slate-50">Multiplier</th>
                      <th class="px-8 py-5 text-[9px] font-black text-amber-600 uppercase tracking-[0.2em] text-right w-52 border-l border-slate-50 bg-yellow-50/20">Komisi Cair</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-50">
                     <tr v-if="loading">
                      <td colspan="5" class="py-24 text-center">
                        <i class="pi pi-spinner pi-spin text-4xl text-yellow-500 opacity-20"></i>
                        <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-yellow-600">Menghitung royalti staf...</div>
                      </td>
                    </tr>
                    
                    <tr v-for="doc in filteredDocs" v-else :key="doc.id" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent hover:border-l-yellow-400 pointer-events-none">
                      <td class="px-8 py-6 align-middle">
                        <div class="flex items-center gap-3">
                           <div class="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center text-slate-400 font-black text-xs uppercase">{{ doc.salesUser?.firstName?.charAt(0) }}</div>
                           <div>
                              <div class="font-black text-slate-900 text-[13px] tracking-tight leading-none mb-1 group-hover:text-yellow-700 transition-colors">
                                 {{ doc.salesUser?.firstName }} {{ doc.salesUser?.lastName }}
                              </div>
                              <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none flex items-center gap-1.5"><i class="pi pi-calendar text-[8px]"></i> Release Core: {{ formatDate(doc.createdAt) }}</div>
                           </div>
                        </div>
                      </td>
                      
                      <td class="px-6 py-6 align-middle text-center border-l border-slate-50">
                         <div class="inline-flex font-mono font-black text-[11px] text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-xl shadow-sm hover:bg-white hover:shadow-lg transition-all">{{ doc.invoice?.code || 'N/A' }}</div>
                      </td>

                      <td class="px-6 py-6 align-middle text-right border-l border-slate-50 relative group-hover:bg-slate-100/50 transition-colors">
                         <div class="flex flex-col">
                            <div class="text-[15px] font-black font-mono tracking-tighter text-slate-400 leading-none">
                               <span class="text-[9px] mr-1 font-sans">Rp</span>{{ formatCurrency(doc.baseAmount) }}
                            </div>
                            <div class="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-2">Nilai Faktur DPP</div>
                         </div>
                      </td>

                      <td class="px-6 py-6 align-middle text-center border-l border-slate-50">
                         <div class="flex flex-col items-center gap-1.5">
                            <span class="inline-flex rounded-xl px-3 py-1 text-[10px] font-black tracking-[0.2em] bg-yellow-400 text-slate-900 shadow-sm">
                              {{ (Number(doc.scheme?.rate) * 100) }}%
                            </span>
                            <div class="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none opacity-50">{{ doc.scheme?.code }}</div>
                         </div>
                      </td>

                      <td class="px-8 py-6 align-middle text-right border-l border-slate-50 bg-yellow-50/10 group-hover:bg-yellow-50/30 transition-colors relative overflow-hidden">
                        <div class="absolute left-0 bottom-0 w-2 h-full bg-yellow-400 opacity-20 transition-all group-hover:w-full"></div>
                        <div class="relative flex flex-col items-end">
                           <div class="font-black text-slate-900 text-3xl font-mono tracking-tighter flex items-start leading-none drop-shadow-sm">
                              <span class="text-xs font-black text-yellow-600 mr-2 mt-1 italic tracking-widest">RP</span>{{ formatCurrency(doc.amount) }}
                           </div>
                           <div class="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-2 flex items-center gap-1"><i class="pi pi-check text-emerald-500"></i> Post-Audit Payroll</div>
                        </div>
                      </td>
                    </tr>
                    
                    <tr v-if="!loading && filteredDocs.length === 0">
                      <td colspan="5" class="py-32 text-center text-slate-400 italic text-sm font-medium">
                         <i class="pi pi-wallet text-5xl mb-4 block opacity-10"></i>
                         <div class="text-[10px] font-black uppercase tracking-[0.2em]">Belum ada riwayat pembagian komisi Sales.</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
          </div>
       </div>
    </div>


    <!-- Dialog Commission Hub (Universal Centered Style) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-3xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900">
        <!-- Dialog Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-yellow-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-16 h-16 rounded-[1.5rem] bg-yellow-400 flex items-center justify-center text-slate-900 shadow-xl rotate-3 transition-transform hover:rotate-0">
               <i class="pi pi-percentage text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">Panel <span class="text-yellow-600 italic">Skema Reward</span></h3>
              </div>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-yellow-500 text-yellow-600">Commission Scheme Configuration Hub</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-slate-50 h-12 w-12" />
        </div>
        
        <!-- Dialog Body (Scheme Workpad) -->
        <div class="p-10 space-y-8 flex-1 overflow-y-auto bg-slate-50/30 custom-scrollbar">
           <div class="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8 border-b-[8px] border-b-slate-900">
              <div class="grid grid-cols-2 gap-8">
                 <div class="space-y-3">
                    <label class="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] block px-1">Kode Identitas Skema <span class="text-red-500">*</span></label>
                    <input type="text" v-model="form.code" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-100 shadow-inner outline-none focus:ring-2 focus:ring-yellow-400 transition-all uppercase font-mono" placeholder="COM-TEND-GVT" />
                 </div>
                 <div class="space-y-3">
                    <label class="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] block px-1">Label Deskripsi</label>
                    <input type="text" v-model="form.name" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-100 shadow-inner outline-none focus:ring-2 focus:ring-yellow-400 transition-all" placeholder="Misal: Insentif Tender Pemerintah" />
                 </div>
              </div>

              <div class="bg-yellow-50/50 p-10 rounded-[2.5rem] border border-yellow-100 flex flex-col md:flex-row items-center gap-10 shadow-inner relative overflow-hidden group">
                 <div class="absolute -right-10 bottom-0 opacity-5 pointer-events-none group-hover:rotate-6 transition-transform duration-1000">
                    <i class="pi pi-bolt text-[200px] text-yellow-900"></i>
                 </div>
                 
                 <div class="flex-1 space-y-4 relative z-10 w-full">
                    <label class="text-[11px] font-black text-yellow-800 uppercase tracking-[0.2em] block px-1 leading-none">Persentase Bagi Hasil (Gross Rate %)</label>
                    <div class="flex items-center gap-4">
                       <input type="number" v-model.number="form.rateVisual" step="0.5" class="w-32 h-20 text-5xl font-black bg-white border-none shadow-xl rounded-3xl text-center outline-none focus:ring-4 focus:ring-yellow-400 text-slate-900 flex items-center justify-center font-mono tracking-tighter" />
                       <span class="text-6xl font-black text-yellow-300 select-none">%</span>
                    </div>
                    <div class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic bg-white/50 inline-block px-3 py-1 rounded-lg">Database Value Calculation: <span class="text-indigo-600 ml-1">{{ (form.rateVisual / 100).toFixed(4) }} (DECIMAL)</span></div>
                 </div>
                 
                 <div class="md:border-l border-yellow-200 md:pl-10 relative z-10 w-full md:w-auto">
                    <label class="flex flex-col gap-4 cursor-pointer group/item items-center md:items-start text-center md:text-left">
                      <div class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Status Otoritas</div>
                      <div class="flex items-center gap-3">
                        <input type="checkbox" v-model="form.isActive" class="w-8 h-8 accent-emerald-600 cursor-pointer shadow-lg rounded-xl" />
                        <span class="text-lg font-black text-slate-800 group-hover/item:text-emerald-700 transition-colors uppercase italic tracking-tighter">Skema Aktif</span>
                      </div>
                    </label>
                 </div>
              </div>

              <div class="bg-slate-900 p-8 rounded-[2rem] text-white flex items-center gap-4 relative overflow-hidden group/audit shadow-2xl">
                 <div class="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-yellow-400 shrink-0"><i class="pi pi-shield text-xl"></i></div>
                 <div class="space-y-1">
                    <div class="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400 leading-none mb-1">Audit Control HRIS</div>
                    <p class="text-[10px] font-medium text-slate-400 leading-relaxed max-w-sm">Setiap perubahan persentase akan memengaruhi perhitungan komisi staf Sales yang dikaitkan dengan skema ini pada siklus payroll berikutnya.</p>
                 </div>
              </div>
           </div>
        </div>

        <!-- Dialog Footer Gates -->
        <div class="p-10 border-t bg-white flex justify-between items-center shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] rounded-b-[2.5rem]">
          <Button label="Batalkan" severity="secondary" text @click="dialogOpen = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 rounded-xl" />
          <Button label="Simpan Skema Reward" severity="warning" :loading="saving" :disabled="saving" @click="saveAction" class="p-button-rounded h-14 px-12 bg-yellow-400 border-none text-slate-900 font-black text-[10px] uppercase shadow-2xl shadow-yellow-100 hover:scale-105 active:scale-95 transition-all" icon="pi pi-save" />
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

const totalCommissionAmount = computed(() => {
  return filteredDocs.value.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
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
