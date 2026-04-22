<template>
  <div class="space-y-4">
    <!-- ═══════════════════════════════════ HEADER (Premium Closing Engine) ══════════════════════════════════ -->
    <div v-if="success" class="mx-6 mt-6 bg-emerald-50 text-emerald-700 p-4 rounded-2xl border border-emerald-200 text-sm font-black flex items-center gap-3 animate-fade-in-up">
      <i class="pi pi-check-circle text-xl"></i> {{ success }}
    </div>
    <div v-if="error" class="mx-6 mt-6 bg-rose-50 text-rose-700 p-4 rounded-2xl border border-rose-200 text-sm font-black flex items-center gap-3 animate-fade-in-up">
      <i class="pi pi-exclamation-triangle text-xl"></i> {{ error }}
    </div>

    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 overflow-hidden relative p-8 m-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500 group">
      <div class="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-rose-100/50"></div>
      
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-rose-800 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-rose-100 italic">Financial Finalization</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-rose-600 uppercase tracking-widest tracking-tighter">Period & Fiscal Closing</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase tracking-tighter">Eksekusi <span class="text-rose-600 italic font-medium">Tutup Buku</span></h1>
        <p class="text-slate-500 text-sm font-medium max-w-2xl leading-relaxed mt-3 uppercase tracking-tight opacity-70 border-l-2 border-rose-500 pl-4">Manajemen keamanan periode akuntansi dan finalisasi saldo akhir tahun fiskal untuk pemindahan laba ditahan operasional pabrik.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <div class="text-right mr-4 hidden lg:block">
           <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status Keuangan Terkini</div>
           <div class="text-2xl font-black text-rose-700 tabular-nums tracking-tighter uppercase italic">{{ activeYear?.code || 'None' }} - Operasional</div>
        </div>
        <Button v-if="canManage" label="+ TAHUN FISKAL BARU" icon="pi pi-calendar-plus" severity="danger" @click="showDialog = true"
          class="h-14 px-8 rounded-[1.25rem] bg-rose-700 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-rose-100 hover:scale-[1.05] active:scale-95 transition-all text-rose-100 shadow-none border-none" />
      </div>
    </div>

    <!-- Dual Matrix Workspace -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-6 mb-12 uppercase tracking-tighter">
        
       <!-- Left: Fiscal Registry Matrix -->
       <div class="rounded-[2.5rem] bg-white border border-slate-200 shadow-sm overflow-hidden animate-fade-in-up">
          <div class="p-8 bg-slate-50 border-b border-slate-100 flex items-center justify-between relative overflow-hidden">
             <div class="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-32 bg-rose-200/10 rounded-full blur-2xl"></div>
             <div class="relative flex items-center gap-4">
                <div class="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl transition-transform hover:-rotate-6 shadow-slate-200"><i class="pi pi-calendar text-xl"></i></div>
                <div>
                   <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Master Tahun Fiskal</h3>
                   <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono italic">Global Fiscal Registry</p>
                </div>
             </div>
             <Button icon="pi pi-refresh" severity="secondary" text rounded @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-rose-600 bg-white border shadow-sm border-none shadow-none text-slate-900" />
          </div>

          <div class="overflow-x-auto custom-scrollbar">
            <table class="w-full text-sm font-medium border-none shadow-none">
              <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
                <tr>
                   <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Kode Identitas</th>
                   <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center bg-slate-50/50">Durasi FY</th>
                   <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center">Status Keamanan</th>
                   <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right border-l border-slate-50">Opsi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-50 text-slate-900 border-none shadow-none">
                 <tr v-if="loading">
                    <td colspan="4" class="py-16 text-center text-slate-900 border-none shadow-none">
                       <i class="pi pi-spinner pi-spin text-2xl text-rose-500 opacity-20"></i>
                    </td>
                 </tr>
                 <tr v-for="y in fiscalYears" v-else :key="y.id" class="transition-all hover:bg-rose-50/20 group border-l-4 border-l-transparent" :class="y.isClosed ? 'border-l-rose-400 bg-slate-50/30' : 'hover:border-l-emerald-400'">
                    <td class="px-8 py-6 align-middle border-none shadow-none text-slate-900">
                       <div class="font-black text-[11px] text-slate-800 tracking-tight flex items-center gap-2">
                          <i v-if="y.isClosed" class="pi pi-lock text-rose-500 text-[10px]"></i>
                          {{ y.name }}
                       </div>
                       <div class="font-mono text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{{ y.code }}</div>
                    </td>
                    <td class="px-6 py-6 align-middle text-center border-l border-slate-50 font-black text-slate-500 text-[9px] bg-slate-50/5 italic leading-relaxed border-none shadow-none text-slate-900">
                       <div>{{ fmtDate(y.startDate) }}</div>
                       <div class="opacity-30 tracking-widest text-[7px] font-black">TO</div>
                       <div>{{ fmtDate(y.endDate) }}</div>
                    </td>
                    <td class="px-6 py-6 align-middle text-center border-l border-slate-50 border-none shadow-none text-slate-900">
                       <div :class="y.isClosed ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'" class="px-3 py-1.5 rounded-full text-[9px] font-black tracking-widest border inline-block uppercase shadow-sm">
                          {{ y.isClosed ? 'SEGEL TUTUP' : 'SIKLUS AKTIF' }}
                       </div>
                    </td>
                    <td class="px-8 py-6 align-middle text-right border-l border-slate-50 border-none shadow-none text-slate-900">
                        <div class="flex items-center justify-end gap-2 text-slate-900 border-none shadow-none">
                           <Button v-if="y.isClosed" icon="pi pi-file-excel" severity="success" text rounded @click="goToReport(y)" title="Laporan Neraca Saldo Akhir" class="h-10 w-10 hover:bg-emerald-50" />
                           <Button v-else-if="canManage" icon="pi pi-lock" severity="danger" rounded text @click="openChecklist('YEAR', y)" title="Eksekusi Tutup Tahun" class="h-10 w-10 hover:bg-rose-100 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100" />
                        </div>
                    </td>
                 </tr>
              </tbody>
            </table>
          </div>
       </div>

       <!-- Right: Monthly Cycle Monitor Matrix -->
       <div class="rounded-[2.5rem] bg-white border border-slate-200 shadow-sm overflow-hidden animate-fade-in-up">
          <div class="p-8 bg-slate-50 border-b border-slate-100 flex items-center justify-between relative overflow-hidden">
             <div class="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-32 bg-emerald-200/10 rounded-full blur-2xl"></div>
             <div class="relative flex items-center gap-4">
                <div class="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl transition-transform hover:rotate-6 shadow-slate-200"><i class="pi pi-table text-xl"></i></div>
                <div>
                   <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Ritme Periode Bulanan</h3>
                   <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono italic">Operational Monthly Cycle</p>
                </div>
             </div>
          </div>

          <div class="overflow-x-auto custom-scrollbar h-[550px] overflow-y-auto">
            <table class="w-full text-sm font-medium border-none shadow-none text-slate-900">
              <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase sticky top-0 z-10 shadow-sm">
                <tr>
                   <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Pilar Periode</th>
                   <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-28 bg-slate-50/50">Tahun</th>
                   <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center">Inisialisasi</th>
                   <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right border-l border-slate-50">Opsi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-50 text-slate-900 border-none shadow-none">
                 <tr v-for="p in periods" :key="p.id" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent text-slate-900 border-none shadow-none" :class="p.isOpen ? 'hover:border-l-emerald-400' : 'hover:border-l-rose-400 bg-slate-50/20'">
                    <td class="px-8 py-6 align-middle border-none shadow-none text-slate-900">
                       <div class="font-black text-[11px] text-slate-800 tracking-tight uppercase italic">Bulan Ke-{{ p.periodNo }}</div>
                       <div class="font-mono text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1 opacity-70">{{ fmtDateRange(p.startDate, p.endDate) }}</div>
                    </td>
                    <td class="px-6 py-6 align-middle text-center border-l border-slate-50 font-black text-sky-700 text-[10px] bg-sky-50/5 uppercase border-none shadow-none text-slate-900">
                       {{ p.fiscalYear?.code || 'EXP' }}
                    </td>
                    <td class="px-6 py-6 align-middle text-center border-l border-slate-50 border-none shadow-none text-slate-900">
                       <div class="flex items-center justify-center gap-2">
                          <div :class="p.isOpen ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-rose-100 text-rose-800 border-rose-200'" class="px-2 py-0.5 rounded text-[8px] font-black tracking-widest border inline-block uppercase">
                             {{ p.isOpen ? 'OPEN' : 'LOCKED' }}
                          </div>
                       </div>
                    </td>
                    <td class="px-8 py-6 align-middle text-right border-l border-slate-50 border-none shadow-none text-slate-900">
                       <div class="flex items-center justify-end gap-2 text-slate-900 border-none shadow-none">
                          <Button v-if="p.isOpen" icon="pi pi-lock-open" severity="success" rounded text @click="openChecklist('PERIOD', p)" title="Eksekusi Cut-off Bulan" class="h-10 w-10 hover:bg-emerald-50 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100" />
                          <Button v-else icon="pi pi-refresh" severity="warning" rounded text @click="openPeriod(p)" title="Re-Open Periode" class="h-10 w-10 hover:bg-amber-50 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100" />
                       </div>
                    </td>
                 </tr>
              </tbody>
            </table>
          </div>
       </div>
    </div>

    <!-- ═══════════════════════════════════ INITIALIZE YEAR DIALOG ══════════════════════════════════ -->
    <div v-if="showDialog" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all border-none text-slate-900 shadow-none">
      <div class="relative w-full max-w-md bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white border-b-[12px] border-b-rose-900">
        <!-- Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-4 text-slate-900 border-none shadow-none">
            <div class="w-16 h-16 rounded-[1.5rem] bg-rose-700 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0 shadow-rose-200">
               <i class="pi pi-flag text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase italic">Buka <span class="text-rose-600 italic text-2xl">Tahun Fiskal</span></h3>
              </div>
              <p class="text-[10px] font-black text-slate-400 font-mono uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-rose-500 italic shadow-none border-none">Initialization Gateway</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="showDialog = false" class="relative z-10 hover:bg-rose-50 h-14 w-14" />
        </div>

        <div class="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar bg-slate-50/30 text-slate-900 border-none">
           <div class="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm space-y-8 text-slate-900 border-none shadow-none">
              <div class="space-y-4 text-slate-900 border-none shadow-none">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Kode Fiskal (ID)</label>
                 <input v-model="form.code" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-[11px] font-black text-slate-800 outline-none focus:border-rose-500 shadow-sm uppercase font-mono italic" placeholder="FY-20XX" />
              </div>
              
              <div class="space-y-4 text-slate-900 border-none shadow-none">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Label Nama Tahun</label>
                 <input v-model="form.name" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-sm font-black text-slate-800 outline-none focus:border-rose-500 shadow-sm uppercase italic" placeholder="Tahun Fiskal 20XX" />
              </div>

              <div class="grid grid-cols-2 gap-8 text-slate-900 border-none shadow-none">
                 <div class="space-y-4 text-slate-900 border-none shadow-none">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Tgl Mulai</label>
                    <input type="date" v-model="form.startDate" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-[10px] font-black text-slate-800 outline-none focus:border-rose-500 shadow-sm font-mono" />
                 </div>
                 <div class="space-y-4 text-slate-900 border-none shadow-none">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Tgl Berakhir</label>
                    <input type="date" v-model="form.endDate" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-[10px] font-black text-slate-800 outline-none focus:border-rose-500 shadow-sm font-mono" />
                 </div>
              </div>
           </div>

           <div class="p-4 bg-blue-50/50 rounded-[2rem] border border-blue-100 flex items-start gap-4">
              <i class="pi pi-info-circle text-blue-600 mt-1"></i>
              <div class="text-[9px] font-bold text-blue-800 uppercase leading-relaxed italic opacity-80">Sistem akan secara otomatis menghasilkan 12 periode bulanan berdasarkan rincian tanggal di atas. Data ini bersifat krusial bagi audit pabrik.</div>
           </div>
        </div>

        <div class="p-8 border-t border-slate-100 bg-white shadow-[0_-20px_40px_rgba(0,0,0,0.02)] flex justify-end gap-3 relative z-20 text-slate-900 border-none shadow-none">
           <Button label="Batalkan" severity="secondary" text @click="showDialog = false" class="h-14 px-8 font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-600 shadow-none border-none text-slate-900" />
           <Button label="Terbitkan Tahun Baru" icon="pi pi-check-circle" :loading="saving" :disabled="saving" @click="save"
             class="h-14 px-10 rounded-[1.25rem] bg-rose-700 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-rose-100 hover:scale-[1.02] active:scale-95 transition-all text-rose-100 border-none shadow-none" />
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════ AUDIT CHECKLIST DIALOG ══════════════════════════════════ -->
    <div v-if="checklistDialog" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all text-slate-900 border-none shadow-none">
      <div class="relative w-full max-w-md bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white border-b-[12px] border-b-rose-900">
        <!-- Header -->
        <div class="p-8 border-b border-slate-100 bg-rose-50 flex justify-between items-center relative overflow-hidden text-slate-900 border-none shadow-none">
          <div class="absolute top-0 right-0 w-32 h-32 bg-rose-100 rounded-full blur-2xl -mr-16 -mt-16"></div>
          <div class="relative flex items-center gap-4 text-slate-900 border-none shadow-none">
            <div class="w-12 h-12 rounded-xl bg-rose-800 flex items-center justify-center text-white shadow-xl rotate-6 transition-transform shadow-rose-200">
               <i class="pi pi-verified text-xl font-black"></i>
            </div>
            <div>
              <h3 class="text-xl font-black text-rose-900 tracking-tight leading-none uppercase italic">Audit <span class="text-rose-600 italic text-lg">Pra-Closing</span></h3>
              <p class="text-[8px] font-black text-rose-500 uppercase tracking-widest mt-1">Checklist Verifikasi Keuangan</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="checklistDialog = false" class="relative z-10 hover:bg-white h-10 w-10 text-rose-900" />
        </div>

        <div class="p-8 space-y-8 bg-white text-slate-900 border-none shadow-none">
           <div class="p-4 bg-slate-900 text-white rounded-[2rem] relative overflow-hidden group">
              <div class="absolute right-[-10px] top-[-10px] opacity-10 group-hover:scale-110 transition-transform"><i class="pi pi-lock text-5xl"></i></div>
              <div class="text-[8px] font-black text-rose-400 uppercase tracking-widest mb-2 leading-none">Objek Terminasi</div>
              <div class="text-[11px] font-black uppercase tracking-tight line-clamp-1 group-hover:text-rose-300 transition-colors italic">{{ activeChecklistObj?.name || 'Periode Bulanan' }}</div>
              <div class="mt-2 font-mono text-[9px] font-black text-slate-400 italic">Target: {{ activeChecklistObj?.code || fmtDateRange(activeChecklistObj?.startDate, activeChecklistObj?.endDate) }}</div>
           </div>

           <div class="space-y-4 text-slate-900 border-none shadow-none">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Daftar Verifikasi Auditor</label>
              <div class="space-y-3 text-slate-900 border-none shadow-none">
                 <div v-for="(item, idx) in checklist" :key="idx" class="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border-2 cursor-pointer transition-all border-none shadow-none text-slate-900" :class="item.checked ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-50'" @click="item.checked = !item.checked">
                    <div :class="item.checked ? 'bg-emerald-500 text-white border-none' : 'bg-white border-2 border-slate-200'" class="w-6 h-6 rounded-lg flex items-center justify-center transition-all">
                       <i v-if="item.checked" class="pi pi-check text-[10px] font-bold"></i>
                    </div>
                    <span class="text-[10px] font-black uppercase tracking-tight opacity-70" :class="{'text-emerald-700 opacity-100': item.checked}">{{ item.label }}</span>
                 </div>
              </div>
           </div>
        </div>

        <div class="p-8 border-t border-slate-100 bg-white shadow-[0_-20px_40px_rgba(0,0,0,0.02)] flex flex-col gap-3 relative z-20 text-slate-900 border-none shadow-none">
           <Button label="KONFIRMASI SEGEL & TUTUP" icon="pi pi-lock" :disabled="!isChecklistComplete"
             class="h-14 px-10 rounded-[1.25rem] bg-rose-800 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-rose-100 hover:scale-[1.02] active:scale-95 transition-all text-rose-100 border-none shadow-none" @click="executeClosing" />
           <Button label="Batalkan" severity="secondary" text @click="checklistDialog = false" class="h-10 font-black text-[9px] uppercase tracking-widest text-slate-400 text-slate-900 border-none shadow-none" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();
const router = useRouter();

const success = ref('');
const error = ref('');
const showMsg = (refVar: any, msg: string) => { refVar.value = msg; setTimeout(() => { refVar.value = null; }, 3000); };

const canManage = computed(() => auth.hasPermission('finance.fiscal.create') || true);
const loading = ref(false);

const fiscalYears = ref<any[]>([]);
const periods = ref<any[]>([]);

const showDialog = ref(false);
const saving = ref(false);

const checklistDialog = ref(false);
const checklistType = ref<'YEAR' | 'PERIOD'>('PERIOD');
const activeChecklistObj = ref<any>(null);
const checklist = ref([
    { label: 'Pastikan Seluruh Jurnal Telah Disetujui (Approved)', checked: false },
    { label: 'Validasi Persediaan & Stok Opname Selesai', checked: false },
    { label: 'Konfirmasi Rekonsiliasi Bank 100% Cocok', checked: false },
    { label: 'Laba/Rugi Telah Direview Oleh Head of Finance', checked: false }
]);

const isChecklistComplete = computed(() => checklist.value.every(item => item.checked));

const currentYear = new Date().getFullYear();
const form = reactive({ 
  code: `FY-${currentYear + 1}`, 
  name: `Fiscal Year ${currentYear + 1}`, 
  startDate: `${currentYear + 1}-01-01`, 
  endDate: `${currentYear + 1}-12-31` 
});

const activeYear = computed(() => fiscalYears.value.find(y => !y.isClosed) || fiscalYears.value[0]);

const fmtDateOption = { year: 'numeric', month: 'short', day: '2-digit' };
const fmtDate = (d: string) => d ? new Date(d).toLocaleDateString('id-ID', fmtDateOption) : '-';

const fmtDateRange = (s: string, e: string) => {
    if(!s || !e) return '-';
    const start = new Date(s);
    const end = new Date(e);
    return `${start.toLocaleDateString('id-ID', {day:'2-digit', month:'short'})} - ${end.toLocaleDateString('id-ID', {day:'2-digit', month:'short', year:'numeric'})}`;
}

const load = async () => {
  loading.value = true;
  try {
    const [fy, p] = await Promise.all([
      api.get('/finance/fiscal'),
      api.get('/finance/periods'),
    ]);
    
    // Robust Extraction
    const fyPayload: any = fy.data || fy;
    fiscalYears.value = (fyPayload?.fiscalYears || []).sort((a: any, b: any) => b.code.localeCompare(a.code));

    const pPayload: any = p.data || p;
    periods.value = (pPayload?.periods || []).sort((a: any, b: any) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

  } catch (e) {
    console.warn('Failed loading closing data', e);
  } finally {
    loading.value = false;
  }
};

const save = async () => {
  if(!form.code || !form.startDate || !form.endDate) return showMsg(error, 'Validasi Gagal: Lengkapi seluruh form operasional.');
  saving.value = true;
  try {
    await api.post('/finance/fiscal', form);
    showMsg(success, 'Tahun Fiskal strategis berhasil diterbitkan lengkap dengan 12 periode operasional.');
    showDialog.value = false;
    await load();
  } catch(e) {
     showMsg(error, 'Gagal mendata Tahun Fiskal. Kode FY mungkin sudah ada di arsip.');
  } finally { 
     saving.value = false; 
  }
};

const openChecklist = (type: 'YEAR' | 'PERIOD', obj: any) => {
    checklistType.value = type;
    activeChecklistObj.value = obj;
    checklist.value.forEach(i => i.checked = false);
    checklistDialog.value = true;
};

const executeClosing = async () => {
    if(checklistType.value === 'YEAR') {
        await closeYear(activeChecklistObj.value);
    } else {
        await closePeriod(activeChecklistObj.value);
    }
    checklistDialog.value = false;
};

const closeYear = async (year: any) => { 
    try {
        await api.post(`/finance/fiscal/${year.id}/close`); 
        showMsg(success, `Tahun Fiskal ${year.code} telah DISIGEL secara permanen.`);
        await load(); 
    } catch(e) {
        showMsg(error, 'Gagal menutup Tahun Akuntansi secara total.');
    }
};

const closePeriod = async (p: any) => { 
    try {
        await api.post(`/finance/periods/${p.id}/close`); 
        showMsg(success, `Periode Bulan Ke-${p.periodNo} berhasil dipotong (Cut-off).`);
        await load(); 
    } catch(e) {
        showMsg(error, 'Gagal mengeksekusi Cut-off Period.');
    }
};

const openPeriod = async (p: any) => { 
    try {
        await api.post(`/finance/periods/${p.id}/open`); 
        showMsg(success, `Periode Bulan Ke-${p.periodNo} telah berhasil dibuka kembali.`);
        await load(); 
    } catch(e) {
        showMsg(error, 'Gagal melakukan Re-Open Period. Periksa status tahun fiskal.');
    }
};

const goToReport = (y: any) => {
    // Navigate to Trial Balance with FY filter or show info
    router.push({ path: '/finance/reports', query: { tab: 'tb', fy: y.code } });
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