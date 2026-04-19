<template>
  <div class="space-y-4">
    <!-- ═══════════════════════════════════ HEADER (Premium Budget Engine) ══════════════════════════════════ -->
    <div v-if="success" class="mx-6 mt-6 bg-emerald-50 text-emerald-700 p-4 rounded-2xl border border-emerald-200 text-sm font-black flex items-center gap-3 animate-fade-in-up">
      <i class="pi pi-check-circle text-xl"></i> {{ success }}
    </div>
    <div v-if="error" class="mx-6 mt-6 bg-rose-50 text-rose-700 p-4 rounded-2xl border border-rose-200 text-sm font-black flex items-center gap-3 animate-fade-in-up">
      <i class="pi pi-exclamation-triangle text-xl"></i> {{ error }}
    </div>

    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-8 m-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500 group">
      <div class="absolute top-0 right-0 w-64 h-64 bg-fuchsia-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-fuchsia-100/50"></div>
      
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-fuchsia-800 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-fuchsia-100">Fiscal Planning</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-fuchsia-600 uppercase tracking-widest tracking-tighter">Manajemen Pagu Anggaran</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase tracking-tighter">Budgeting <span class="text-fuchsia-600 italic font-medium">Strategis</span></h1>
        <p class="text-slate-500 text-sm font-medium max-w-2xl leading-relaxed mt-3 uppercase tracking-tight opacity-70 border-l-2 border-fuchsia-500 pl-4">Perencanaan limit biaya departemen dan analisis varians realisasi pembelanjaan cabang guna menjaga integritas kas perusahaan.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <div class="text-right mr-4 hidden lg:block">
           <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Pagu (Global Limit)</div>
           <div class="text-2xl font-black text-fuchsia-700 tabular-nums tracking-tighter">{{ formatRupiah(totalBudget) }}</div>
        </div>
        <Button v-if="canManage" label="+ PROPOSAL ANGGARAN" icon="pi pi-plus" severity="help" @click="showDialog = true"
          class="h-14 px-8 rounded-[1.25rem] bg-fuchsia-700 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-fuchsia-100 hover:scale-[1.05] active:scale-95 transition-all text-fuchsia-100 shadow-none border-none" />
      </div>
    </div>

    <!-- Variance Analytics Board (KPI Cards) -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mx-6">
        <div class="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm flex flex-col justify-between group transition-all hover:bg-slate-50 text-slate-900 shadow-none border-none">
           <div class="flex justify-between items-center text-slate-900 border-none">
              <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Budget Pos Induk</div>
              <div class="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center shadow-sm"><i class="pi pi-briefcase"></i></div>
           </div>
           <div class="mt-4 text-2xl font-black text-slate-800 tabular-nums tracking-tighter">{{ budgets.length }} Active Lines</div>
        </div>

        <div class="bg-slate-900 rounded-[2rem] p-6 shadow-xl relative overflow-hidden group transition-all hover:translate-y-[-5px] text-slate-900 shadow-none border-none">
           <div class="absolute right-[-20px] top-[-20px] opacity-10 group-hover:scale-125 transition-transform duration-700 text-fuchsia-500"><i class="pi pi-calculator text-[120px]"></i></div>
           <div class="text-[9px] font-black text-fuchsia-400 uppercase tracking-widest mb-1 relative z-10 italic">Total Pagu Disetujui</div>
           <div class="text-xl font-black text-white tabular-nums tracking-tighter relative z-10">{{ formatRupiah(totalBudget) }}</div>
        </div>

        <div class="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm flex flex-col justify-between group transition-all hover:bg-slate-50 text-slate-900 shadow-none border-none">
           <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Realisasi (Spent)</div>
           <div class="text-xl font-black text-indigo-600 tabular-nums tracking-tighter">{{ formatRupiah(totalSpent) }}</div>
           <div class="mt-3 flex items-center gap-2">
              <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                 <div class="h-full transition-all duration-700" :class="getBarColorGlobal" :style="{ width: (totalSpent / totalBudget * 100) + '%' }"></div>
              </div>
              <span class="text-[8px] font-black text-slate-400 opacity-60">{{ Math.round(totalSpent / totalBudget * 100) }}%</span>
           </div>
        </div>

        <div class="bg-emerald-50 border border-emerald-100 rounded-[2rem] p-6 shadow-sm flex flex-col justify-between group transition-all hover:bg-emerald-100 text-slate-900 shadow-none border-none">
           <div class="text-[9px] font-black text-emerald-700 uppercase tracking-widest mb-1 italic">Total Variance Sisa</div>
           <div class="text-xl font-black text-emerald-800 tabular-nums tracking-tighter">{{ formatRupiah(totalBudget - totalSpent) }}</div>
           <p class="text-[8px] font-bold text-emerald-600 uppercase mt-2 opacity-60">Balance Available To Use</p>
        </div>
    </div>

    <!-- Budget Flux Grid (Master List) -->
    <div class="mx-6 mb-12 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm overflow-hidden animate-fade-in-up uppercase tracking-tighter border-none shadow-none text-slate-900">
      
      <!-- Ledger Control Bar -->
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-6 relative overflow-hidden text-slate-900">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-fuchsia-200/10 rounded-full blur-3xl"></div>
        
        <div class="relative flex items-center gap-4">
           <div class="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl transition-transform hover:rotate-6 shadow-slate-200"><i class="pi pi-database text-xl"></i></div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Log Pagu Anggaran FY</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono italic">Budgetary Matrix Flux</p>
           </div>
        </div>

        <div class="relative flex flex-wrap items-center gap-3">
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs text-slate-900"></i>
            <InputText v-model="search" placeholder="Cari Kode Beban / Pos..." class="border-none bg-transparent text-[10px] h-9 w-64 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none text-slate-900" />
          </div>

          <select v-model="filterYear" class="h-11 rounded-2xl border-slate-200 px-4 text-[9px] font-black uppercase tracking-widest text-slate-600 focus:border-fuchsia-500 outline-none bg-white shadow-sm transition-all text-slate-900" @change="load">
            <option value="">Semua Tahun</option>
            <option value="2024">FY 2024</option>
            <option value="2025">FY 2025</option>
            <option value="2026">FY 2026</option>
            <option value="2027">FY 2027</option>
          </select>
          
          <Button icon="pi pi-refresh" severity="secondary" text rounded @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-fuchsia-600 bg-white border shadow-sm text-slate-900 border-none shadow-none" />
        </div>
      </div>

      <div class="overflow-x-auto custom-scrollbar text-slate-900 border-none shadow-none">
        <table class="w-full text-sm font-medium border-none shadow-none">
          <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-[220px]">Referensi Pagu / FY</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-32 bg-slate-50/50">Account COA</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-right w-44">Limit Anggaran</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-right bg-slate-50/50 w-44">Realisasi Real</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Analisis Varians (Sisa)</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-24 border-l border-slate-50">Opsi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50 text-slate-900 border-none shadow-none">
            <tr v-if="loading">
              <td colspan="6" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-fuchsia-500 opacity-20 text-slate-900"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-fuchsia-600">Sinkronisasi limit pagu pabrik...</div>
              </td>
            </tr>
            
            <tr v-for="b in filteredBudgets" v-else :key="b.id" class="transition-all hover:bg-fuchsia-50/20 group border-l-4 border-l-transparent hover:border-l-fuchsia-400 text-slate-900 border-none shadow-none">
              <td class="px-8 py-6 align-middle border-none shadow-none text-slate-900">
                <div class="flex items-center gap-4 text-slate-900">
                   <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-inner group-hover:scale-110 transition-transform">
                      <i class="pi pi-calculator text-lg"></i>
                   </div>
                   <div>
                      <div class="font-black text-[11px] text-slate-800 tracking-tight group-hover:text-fuchsia-700 transition-colors italic uppercase">{{ b.budgetNo }}</div>
                      <div class="flex items-center gap-2 mt-1">
                         <span class="font-mono text-[9px] font-black text-slate-400 uppercase tracking-widest italic leading-none border-none shadow-none bg-transparent">FY {{ b.fiscalYear }}</span>
                         <span class="px-1.5 py-0.5 bg-slate-100 text-slate-500 text-[6px] font-black uppercase tracking-widest rounded leading-none border border-slate-200">{{ b.costCenter?.name || 'Kantor Pusat' }}</span>
                      </div>
                   </div>
                </div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50 font-black text-slate-500 text-[10px] bg-slate-50/5 group-hover:bg-slate-50 transition-colors uppercase italic border-none shadow-none">
                 <span class="px-2 py-1 bg-white border border-slate-200 rounded-lg shadow-sm text-slate-900">#{{ b.accountCode }}</span>
              </td>
              
              <td class="px-6 py-6 align-middle border-l border-slate-50 text-right group-hover:bg-fuchsia-50/10 transition-colors border-none shadow-none text-slate-900">
                 <div class="font-black text-fuchsia-800 text-sm tabular-nums tracking-tighter">{{ formatRupiah(b.amount) }}</div>
                 <div class="text-[8px] font-black text-slate-300 font-mono mt-0.5 uppercase tracking-widest italic">Budget Limit</div>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50 text-right bg-slate-50/5 group-hover:bg-slate-50 transition-colors border-none shadow-none text-slate-900">
                 <div class="font-black text-slate-600 text-sm tabular-nums tracking-tighter">{{ formatRupiah(b.spentAmount) }}</div>
                 <div class="text-[8px] font-black text-slate-300 font-mono mt-0.5 uppercase tracking-widest italic">Total Realized Cost</div>
              </td>

              <td class="px-8 py-6 align-middle border-l border-slate-50 border-none shadow-none text-slate-900">
                 <div class="space-y-2 text-slate-900 border-none shadow-none">
                    <div class="flex justify-between items-center text-slate-900 border-none shadow-none">
                       <div class="flex items-center gap-2 text-slate-900">
                          <span class="text-[9px] font-black uppercase transition-colors" :class="isOverBudget(b) ? 'text-rose-600' : 'text-slate-400'">
                             Sisa: {{ formatRupiah(Number(b.amount) - Number(b.spentAmount)) }}
                          </span>
                          <i v-if="getPercentage(b) >= 90" class="pi pi-exclamation-circle text-rose-500 text-xs animate-pulse" title="Peringatan: Penggunaan > 90%"></i>
                       </div>
                       <span class="text-[9px] font-black" :class="getBarColorText(b)">{{ getPercentage(b) }}%</span>
                    </div>
                    <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-50 shadow-inner text-slate-900 border-none shadow-none">
                       <div class="h-full rounded-full transition-all duration-1000" :class="getBarColor(b)" :style="`width: ${Math.min(100, getPercentage(b))}%`"></div>
                    </div>
                 </div>
              </td>

              <td class="px-8 py-6 align-middle text-right border-l border-slate-50 border-none shadow-none text-slate-900">
                 <div class="flex items-center justify-end gap-2 text-slate-900 border-none shadow-none">
                    <div v-if="b.status === 'APPROVED'" class="text-[9px] font-black text-emerald-500 uppercase tracking-widest opacity-60 italic"><i class="pi pi-lock-open mr-1"></i> Terkunci</div>
                    <div v-else class="opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100 text-slate-900 border-none shadow-none">
                       <Button icon="pi pi-check" rounded text severity="success" class="h-10 w-10 hover:bg-emerald-50 text-slate-900" @click="approve(b)" />
                    </div>
                 </div>
              </td>
            </tr>

            <tr v-if="!loading && filteredBudgets.length === 0">
              <td colspan="6" class="py-32 text-center text-slate-500 block text-slate-900 border-none shadow-none">
                 <div class="text-6xl mb-4 opacity-10">💼</div>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Pabrik Anda tidak memiliki rencana anggaran aktif.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ═══════════════════════════════════ CREATE BUDGET DIALOG (Non-Dismissible) ══════════════════════════════════ -->
    <div v-if="showDialog" class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md transition-all text-slate-900 border-none">
      <div class="relative w-full max-w-lg bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white border-b-[12px] border-b-fuchsia-900">
        <!-- Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-fuchsia-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-6 text-slate-900 border-none shadow-none">
            <div class="w-16 h-16 rounded-[1.5rem] bg-fuchsia-700 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0 shadow-fuchsia-200">
               <i class="pi pi-calculator text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3 text-slate-900">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase italic">Proposal <span class="text-fuchsia-600 italic text-2xl">Anggaran</span></h3>
              </div>
              <p class="text-[10px] font-black text-slate-400 font-mono uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-fuchsia-500 italic">Strategic Fiscal On-boarding</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="showDialog = false" class="relative z-10 hover:bg-fuchsia-50 h-14 w-14" />
        </div>

        <div class="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar bg-slate-50/30 text-slate-900 border-none">
           <!-- Form Context -->
           <div class="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm space-y-8 text-slate-900 border-none">
              <div class="space-y-4 text-slate-900 border-none">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Nomor Identitas Anggaran (Ref No)</label>
                 <input v-model="form.budgetNo" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-[11px] font-black text-slate-800 outline-none focus:border-fuchsia-500 shadow-sm uppercase font-mono italic" placeholder="BUD-2026-XXXX" />
              </div>

              <div class="grid grid-cols-2 gap-8 text-slate-900 border-none">
                 <div class="space-y-4 text-slate-900 border-none">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Tahun Anggaran (Fiscal)</label>
                    <input type="number" v-model.number="form.fiscalYear" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-sm font-black text-slate-800 outline-none focus:border-fuchsia-500 shadow-sm font-mono" />
                 </div>
                 <div class="space-y-4 text-slate-900 border-none">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Kode Akun COA (Debet)</label>
                    <input v-model="form.accountCode" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-sm font-black text-slate-800 outline-none focus:border-fuchsia-500 shadow-sm font-mono italic" placeholder="E.g 6100" />
                 </div>
              </div>

              <!-- Limit Input -->
              <div class="p-8 bg-fuchsia-50/50 rounded-[2.5rem] border border-fuchsia-100 space-y-6 text-slate-900 border-none">
                 <div class="space-y-4 text-slate-900 border-none">
                    <label class="text-[11px] font-black text-fuchsia-700 uppercase tracking-widest block text-center italic">Ambang Batas Maksimal (Budget Limit)</label>
                    <div class="relative text-slate-900 border-none">
                       <span class="absolute left-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-fuchsia-300">RP</span>
                       <input type="number" v-model.number="form.amount" placeholder="0" class="w-full h-24 pl-16 pr-6 rounded-[2rem] bg-white border-2 border-fuchsia-100 text-4xl font-black text-fuchsia-900 outline-none focus:border-fuchsia-500 transition-all shadow-xl font-mono tabular-nums" />
                    </div>
                    <p class="text-[8px] font-bold text-fuchsia-400 text-center uppercase tracking-widest italic leading-relaxed">Limit ini akan dikunci dalam sistem realisasi dan tidak dapat dilampaui tanpa otorisasi tambahan.</p>
                 </div>
              </div>
           </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-8 border-t border-slate-100 bg-white shadow-[0_-20px_40px_rgba(0,0,0,0.02)] flex justify-end gap-3 relative z-20 text-slate-900 border-none">
           <Button label="Batalkan" severity="secondary" text @click="showDialog = false" class="h-14 px-8 font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-600 border-none shadow-none text-slate-900" />
           <Button label="Daftarkan Pagu Anggaran" icon="pi pi-check-circle" :loading="saving" :disabled="saving" @click="save"
             class="h-14 px-10 rounded-[1.25rem] bg-fuchsia-700 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-fuchsia-100 hover:scale-[1.02] active:scale-95 transition-all text-fuchsia-100 border-none shadow-none" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const success = ref('');
const error = ref('');
const showMsg = (refVar: any, msg: string) => { refVar.value = msg; setTimeout(() => { refVar.value = null; }, 3000); };

const canManage = computed(() => auth.hasPermission('finance.budget.create') || true);

const filterYear = ref(new Date().getFullYear().toString());
const search = ref('');
const loading = ref(false);

const budgets = ref<any[]>([]);

const showDialog = ref(false);
const saving = ref(false);

const form = reactive({ 
  budgetNo: '', 
  fiscalYear: new Date().getFullYear(),
  accountCode: '', 
  amount: 0,
});

const filteredBudgets = computed(() => {
   let list = budgets.value;
   if(search.value) {
      const q = search.value.toLowerCase();
      list = list.filter(x => 
         x.budgetNo?.toLowerCase().includes(q) || 
         x.accountCode?.toLowerCase().includes(q) ||
         x.costCenter?.name?.toLowerCase().includes(q)
      );
   }
   return list;
});

const getPercentage = (b: any) => {
    if(!b || Number(b.amount) <= 0) return 0;
    const pct = (Number(b.spentAmount) / Number(b.amount)) * 100;
    return Number(pct.toFixed(1));
};

const getBarColor = (b: any) => {
    const pct = getPercentage(b);
    if(pct >= 90) return 'bg-rose-600 shadow-[0_0_12px_rgba(225,29,72,0.4)] animate-pulse';
    if(pct >= 75) return 'bg-amber-500 shadow-sm';
    return 'bg-emerald-500 shadow-sm';
};

const getBarColorText = (b: any) => {
    const pct = getPercentage(b);
    if(pct >= 90) return 'text-rose-700 italic';
    if(pct >= 75) return 'text-amber-600';
    return 'text-emerald-700';
};

const getBarColorGlobal = computed(() => {
    const pct = (totalSpent.value / totalBudget.value) * 100;
    if(pct >= 90) return 'bg-rose-500';
    if(pct >= 75) return 'bg-amber-400';
    return 'bg-emerald-400';
});

const isOverBudget = (b: any) => {
    return Number(b.amount) - Number(b.spentAmount) < 0;
}

const totalBudget = computed(() => {
   return budgets.value.reduce((sum, curr) => sum + Number(curr.amount), 0);
});
const totalSpent = computed(() => {
   return budgets.value.reduce((sum, curr) => sum + Number(curr.spentAmount), 0);
});

const formatRupiah = (val: number | string) => {
   if(!val && val !== 0) return 'Rp 0';
   return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(val));
};

const load = async () => {
  loading.value = true;
  try {
    const params = filterYear.value ? `?fiscalYear=${filterYear.value}` : '';
    const res = await api.get(`/finance/budget${params}`);
    
    // Safe Extraction
    const payload: any = res.data || res;
    budgets.value = payload?.budgets || [];

  } catch (e) {
    console.warn('Failed loading budget plans', e);
  } finally {
    loading.value = false;
  }
};

const save = async () => {
  if(!form.budgetNo || !form.accountCode || form.amount <= 0) {
      return showMsg(error, 'Mohon lengkapi seluruh form pendataan Anggaran secara valid.');
  }
  saving.value = true;
  try {
    await api.post('/finance/budget', form);
    showMsg(success, 'Proposal pagu anggaran masuk berhasil didaftarkan ke draf audit.');
    showDialog.value = false;
    Object.assign(form, { budgetNo: '', accountCode: '', amount: 0, fiscalYear: new Date().getFullYear() });
    await load();
  } catch(e) {
     showMsg(error, 'Gagal merekam proposal anggaran. Periksa koneksi data.');
  } finally { 
     saving.value = false; 
  }
};

const approve = async (b: any) => {
    if(!confirm(`Otorisasi Pagu: Apakah Anda yakin ingin mengunci Anggaran ${b.budgetNo} senilai ${formatRupiah(b.amount)} untuk Tahun ${b.fiscalYear}?`)) return;
    try {
        await api.post(`/finance/budget/${b.id}/approve`);
        showMsg(success, `Pagu Anggaran ${b.budgetNo} telah diaktifkan secara global.`);
        await load();
    } catch(e) {
        showMsg(error, 'Gagal mengeksekusi otorisasi anggaran!');
    }
}

onMounted(() => { load(); });
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

.animate-scale-in { animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
@keyframes scaleIn { from { opacity: 0; transform: scale(0.9) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }

.custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
</style>