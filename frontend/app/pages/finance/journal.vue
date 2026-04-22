<template>
  <div class="p-4 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- ═══════════════════════════════════ HEADER (Premium Accounting Engine) ══════════════════════════════════ -->
    <div v-if="success" class="mx-6 mt-6 bg-emerald-50 text-emerald-700 p-4 rounded-2xl border border-emerald-200 text-sm font-black flex items-center gap-3 animate-fade-in-up">
      <i class="pi pi-check-circle text-xl"></i> {{ success }}
    </div>
    <div v-if="error" class="mx-6 mt-6 bg-rose-50 text-rose-700 p-4 rounded-2xl border border-rose-200 text-sm font-black flex items-center gap-3 animate-fade-in-up">
      <i class="pi pi-exclamation-triangle text-xl"></i> {{ error }}
    </div>

    
      <DashboardHero
        badge="Inti Akuntansi & Buku Besar"
        badge-accent="General Ledger Journal Matrix"
        title="Buku"
        title-accent="Jurnal Umum"
        description="Pusat dokumentasi transaksi akuntansi berpasangan (*Double-Entry*), penyesuaian fiskal, penyusutan, dan pengakuan akrual periodik."
        color="indigo"
      >
        <template #actions>
          <Button label="PENJURNALAN BARU" icon="pi pi-book" class="p-button-sm font-black text-[10px] uppercase px-8 bg-white/20 hover:bg-white/30 text-white border-white/20" @click="openCreate" />
        </template>
      </DashboardHero>
    

    <!-- Main Double-Entry Matrix (High-Density Grid) -->
    <!-- Main Double-Entry Matrix -->
    <PanelCard
      title="Log Jurnal Umum & Mutasi Saldo"
      subtitle="Central Financial Ledger Record"
      icon="pi pi-book"
      theme="indigo"
      v-model:search="search"
      @refresh="load"
    >
       <template #filters>
          <div class="flex items-center gap-4">
             <SelectSearchableDropdown
               v-model="status"
               :options="statusOptions"
               placeholder="Semua Status"
               class="w-48"
               size="xsmall"
               @change="load"
             />

             <div class="h-11 bg-white rounded-2xl border border-slate-200 p-1 flex items-center shadow-sm">
                <button @click="setQuickFilter('this-month')" :class="quickFilter === 'this-month' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-indigo-600'" 
                  class="px-4 h-full rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">Bulan Ini</button>
                <button @click="setQuickFilter('last-month')" :class="quickFilter === 'last-month' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-indigo-600'" 
                  class="px-4 h-full rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">Bulan Lalu</button>
                <button v-if="quickFilter" @click="setQuickFilter('')" class="px-3 text-rose-500 hover:scale-110 transition-transform"><i class="pi pi-times-circle"></i></button>
             </div>
          </div>
       </template>

       <template #table>
          <PanelTable
            :items="filteredEntries"
            :columns="journalColumns"
            :loading="loading"
            hover-border-color="border-l-indigo-400"
          >
            <template #col-entryNo="{ item }">
               <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-inner group-hover:scale-110 transition-transform">
                     <i class="pi pi-book text-base"></i>
                  </div>
                  <div>
                     <div class="font-mono text-[11px] font-black text-indigo-700 tracking-tight group-hover:text-indigo-900 transition-colors uppercase">
                        {{ item.entryNo }}
                     </div>
                     <div class="mt-1 flex items-center gap-2">
                       <div class="h-1 w-1 rounded-full bg-indigo-400"></div>
                       <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest truncate max-w-[140px] italic">{{ item.journalType || 'GENERAL' }}</span>
                     </div>
                  </div>
               </div>
            </template>
            
            <template #col-entryDate="{ item }">
               <div class="text-[11px] font-black text-slate-700 tracking-tighter">{{ fmtDate(item.entryDate) }}</div>
               <div class="text-[8px] font-black text-slate-300 uppercase mt-1 tracking-widest">Post Date</div>
            </template>

            <template #col-description="{ item }">
               <div class="text-[11px] font-black text-slate-800 uppercase tracking-tight line-clamp-1 group-hover:text-indigo-600 transition-colors">{{ item.description ?? '- Tanpa Deskripsi -' }}</div>
               <div class="mt-1.5 flex items-center gap-2">
                  <i class="pi pi-link text-[9px] text-slate-300"></i>
                  <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">REF: {{ item.referenceNo || 'N/A' }}</span>
               </div>
            </template>

            <template #col-totalDebit="{ item }">
               <div class="font-black text-slate-800 text-sm tabular-nums tracking-tighter">{{ formatRupiah(item.totalDebit) }}</div>
               <div class="text-[8px] font-black text-emerald-600/40 font-mono mt-0.5 uppercase tracking-widest">Debit Entry</div>
            </template>

            <template #col-totalCredit="{ item }">
               <div class="font-black text-slate-800 text-sm tabular-nums tracking-tighter">{{ formatRupiah(item.totalCredit) }}</div>
               <div class="text-[8px] font-black text-rose-600/40 font-mono mt-0.5 uppercase tracking-widest">Credit Entry</div>
            </template>

            <template #col-status="{ item }">
               <span :class="[
                 'inline-flex rounded-full px-4 py-1.5 text-[8px] font-black tracking-[0.2em] border shadow-sm uppercase group-hover:scale-105 transition-all outline-none',
                 item.status === 'POSTED' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
               ]">
                  <i :class="item.status === 'POSTED' ? 'pi pi-check-circle' : 'pi pi-clock'" class="mr-1.5"></i>
                  {{ item.status }}
               </span>
            </template>
            
            <template #col-actions="{ item }">
               <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                  <Button v-if="item.status === 'DRAFT'" label="POSTING" icon="pi pi-upload" severity="info" size="small" rounded @click="post(item)"
                    class="h-10 px-4 bg-indigo-600 border-none text-white font-black text-[9px] uppercase shadow-lg shadow-indigo-100" />
                  <Button v-else icon="pi pi-search" rounded text class="h-10 w-10 text-slate-400 hover:text-indigo-600" />
               </div>
            </template>

            <template #empty>
               <div class="py-32 text-center text-slate-500">
                  <div class="text-6xl mb-4 opacity-10">📖</div>
                  <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Buku jurnal masih bersih. Tidak ada transaksi ditemukan.</div>
               </div>
            </template>
          </PanelTable>
       </template>
    </PanelCard>

    <!-- ═══════════════════════════════════ CREATE JOURNAL ENTRY DIALOG ══════════════════════════════════ -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="relative w-full max-w-6xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-slate-900">
        <!-- Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-16 h-16 rounded-[1.5rem] bg-slate-800 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0 shadow-slate-200">
               <i class="pi pi-book text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">Pembuatan <span class="text-indigo-600 italic text-2xl">Jurnal Umum</span></h3>
                 <span v-if="form.journalType" class="inline-flex rounded-xl px-4 py-1.5 text-[9px] font-black tracking-[0.2em] bg-slate-100 text-slate-700 border border-slate-200 uppercase shadow-sm italic">{{ form.journalType }}</span>
              </div>
              <p class="text-[10px] font-black text-slate-400 font-mono uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-indigo-500 italic">Double-Entry Financial Integrity Protocol</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-slate-50 h-12 w-12" />
        </div>

        <div class="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar bg-slate-50/30 pb-32">
          <!-- Sec 1: Journal Identity -->
          <div class="space-y-8">
            <div class="flex items-center gap-4">
               <div class="w-10 h-10 rounded-2xl bg-slate-800 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-slate-200">1</div>
               <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-400">Identitas & Referensi Dokumen</h4>
            </div>
            
            <div class="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm space-y-8">
               <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Tipe Penjurnalan</label>
                    <select v-model="form.journalType" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-100 text-sm font-black text-slate-800 outline-none focus:border-indigo-500 focus:bg-white transition-all shadow-sm">
                       <option value="GENERAL">Jurnal Umum (GENERAL)</option>
                       <option value="ADJUSTMENT">Penyesuaian (ADJUSTMENT)</option>
                       <option value="ACCRUAL">Akrual (ACCRUAL)</option>
                       <option value="DEPRECIATION">Penyusutan Aset (DEPRECIATION)</option>
                    </select>
                  </div>
                  <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Nomor Referensi (Bukti)</label>
                    <input type="text" v-model="form.referenceNo" placeholder="No. Dokumen Asli" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-sm font-black text-slate-800 outline-none focus:border-indigo-500 focus:bg-white transition-all font-mono" />
                  </div>
                  <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Tanggal Transaksi</label>
                    <input type="date" v-model="form.entryDate" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-sm font-black text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all shadow-sm" />
                  </div>
                  <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Uraian Utama Jurnal</label>
                    <input type="text" v-model="form.description" placeholder="Deskripsi ringkas..." class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-sm font-black text-slate-800 outline-none focus:border-indigo-500 focus:bg-white transition-all shadow-sm" />
                  </div>
               </div>
            </div>
          </div>

          <!-- Sec 2: Double-Entry Tracker (GL Lines) -->
          <div class="space-y-8">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                 <div class="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-indigo-100">2</div>
                 <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-400">Distribusi Garis Akun (Double-Entry Matrix)</h4>
              </div>
              <Button label="TAMBAH GARIS (AKUN)" icon="pi pi-plus" size="small" rounded outlined @click="addLine" class="text-[9px] font-black px-4 border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all bg-white" />
            </div>

            <div class="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden min-h-[400px]">
               <table class="w-full text-sm">
                  <thead class="bg-slate-50 border-b border-slate-100">
                     <tr>
                        <th class="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-left w-48">Kode Perkiraan (COA)</th>
                        <th class="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-left">Deskripsi Baris / Memo</th>
                        <th class="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-left w-48 border-l border-slate-100">Pusat Biaya (CC)</th>
                        <th class="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right w-44 border-l border-slate-100 bg-emerald-50/20">Debit (IDR)</th>
                        <th class="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right w-44 border-l border-slate-100 bg-rose-50/20">Kredit (IDR)</th>
                        <th class="px-8 py-4 w-20 border-l border-slate-100"></th>
                     </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-50">
                     <tr v-for="(l, idx) in form.lines" :key="idx" class="group transition-all hover:bg-slate-50/50">
                        <td class="px-8 py-5 align-middle">
                           <input type="text" v-model="l.accountCode" placeholder="Ex: 1100" class="w-full h-12 px-4 rounded-xl bg-slate-50 border-2 border-slate-50 text-[11px] font-black text-indigo-700 font-mono outline-none focus:border-indigo-300 focus:bg-white transition-all uppercase" />
                        </td>
                        <td class="px-6 py-5 align-middle">
                           <input type="text" v-model="l.description" placeholder="Uraian memo baris..." class="w-full h-12 bg-transparent border-none text-[11px] font-medium text-slate-800 outline-none focus:ring-0" />
                        </td>
                        <td class="px-6 py-5 align-middle border-l border-slate-100">
                           <select v-model="l.costCenterId" class="w-full h-12 px-3 rounded-xl bg-slate-50 border-2 border-slate-50 text-[10px] font-black text-slate-600 outline-none focus:border-indigo-300 transition-all">
                              <option value="">-- Non CC --</option>
                              <option v-for="c in costCenters" :key="c.id" :value="c.id">[{{ c.code }}] {{ c.name }}</option>
                           </select>
                        </td>
                        <td class="px-6 py-5 align-middle border-l border-slate-100 bg-emerald-50/20">
                           <input type="number" v-model.number="l.debit" @input="() => { if(l.debit > 0) l.credit = 0 }" class="w-full h-12 px-4 rounded-xl bg-white border-2 border-emerald-100 text-xs font-black text-emerald-800 text-right tabular-nums outline-none focus:border-emerald-500 shadow-sm" />
                        </td>
                        <td class="px-6 py-5 align-middle border-l border-slate-100 bg-rose-50/20">
                           <input type="number" v-model.number="l.credit" @input="() => { if(l.credit > 0) l.debit = 0 }" class="w-full h-12 px-4 rounded-xl bg-white border-2 border-rose-100 text-xs font-black text-rose-800 text-right tabular-nums outline-none focus:border-rose-500 shadow-sm" />
                        </td>
                        <td class="px-8 py-5 align-middle border-l border-slate-100 text-center">
                           <div class="flex items-center justify-center gap-1">
                              <Button icon="pi pi-copy" severity="secondary" rounded text @click="duplicateLine(idx)" class="h-10 w-10 text-slate-300 hover:text-indigo-600 group-hover:scale-110 transition-transform" />
                              <Button icon="pi pi-trash" severity="danger" rounded text @click="removeLine(idx)" class="h-10 w-10 text-slate-300 hover:text-rose-600 group-hover:scale-110 transition-transform" />
                           </div>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
          </div>
        </div>

        <!-- Sticky Balance Indicator & Footer -->
        <div class="p-8 border-t border-slate-100 bg-white shadow-[0_-20px_40px_rgba(0,0,0,0.02)] flex flex-wrap items-center justify-between gap-4 relative z-30">
           <!-- Balance Protocol -->
           <div class="flex items-center gap-4 p-4 bg-slate-900 rounded-[1.5rem] shadow-2xl relative overflow-hidden group min-w-[450px]">
              <div class="absolute right-0 top-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                 <i class="pi pi-directions text-4xl text-white"></i>
              </div>
              <div class="relative z-10 flex items-center gap-4">
                 <div>
                    <div class="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Debit</div>
                    <div class="text-xl font-black text-white tabular-nums tracking-tighter">{{ formatRupiah(totalDebit) }}</div>
                 </div>
                 <div class="h-10 w-px bg-slate-700"></div>
                 <div>
                    <div class="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Kredit</div>
                    <div class="text-xl font-black text-white tabular-nums tracking-tighter">{{ formatRupiah(totalCredit) }}</div>
                 </div>
                 <div class="ml-4 pl-6 border-l border-slate-700 flex flex-col items-center">
                    <span v-if="isValidBalance" class="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] flex items-center gap-2 animate-pulse">
                       <i class="pi pi-check-circle"></i> BALANCED
                    </span>
                    <span v-else class="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em] flex items-center gap-2 italic">
                       <i class="pi pi-exclamation-triangle"></i> UNBALANCED
                    </span>
                 </div>
              </div>
           </div>

           <!-- Actions -->
           <div class="flex items-center gap-3">
              <Button label="Batalkan" severity="secondary" text @click="dialogOpen = false" class="h-14 px-8 font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-600" />
              <Button label="Simpan Jurnal Baru" icon="pi pi-save" :loading="saving" :disabled="!isValidBalance || form.lines.length < 2" @click="save"
                class="h-14 px-10 rounded-[1.25rem] bg-indigo-800 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-indigo-100 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:grayscale disabled:hover:scale-100" />
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();

const success = ref('');
const error = ref('');
const showMsg = (refVar: any, msg: string) => { refVar.value = msg; setTimeout(() => { refVar.value = null; }, 3000); };

const search = ref('');
const status = ref('');
const quickFilter = ref('');
const entries = ref<any[]>([]);
const costCenters = ref<any[]>([]);

const loading = ref(false);
const dialogOpen = ref(false);
const saving = ref(false);

const form = ref({ 
  entryDate: '', 
  description: '', 
  referenceNo: '',
  journalType: 'GENERAL',
  lines: [{ accountCode: '', description: '', costCenterId: '', debit: 0, credit: 0 }] 
});

const loadMeta = async () => {
   try {
      const ccRes = await api.get('/core/cost-centers');
      if(ccRes.data?.costCenters) costCenters.value = ccRes.data.costCenters;
   } catch (e) {
      console.warn(e);
   }
}

const load = async () => {
  loading.value = true;
  if(costCenters.value.length === 0) await loadMeta();

  try {
     const params = status.value ? `?status=${status.value}` : '';
     const res = await api.get(`/finance/journal${params}`);
     
     // Data structure returned by the controller is { entries: [...] }
     entries.value = res.data?.entries || [];
  } catch(e) {
     console.error(e);
  } finally {
     loading.value = false;
  }
};

const filteredEntries = computed(() => {
  let arr = entries.value;

  // Search Filter
  if(search.value) {
    const q = search.value.toLowerCase();
    arr = arr.filter(x => 
       x.entryNo?.toLowerCase().includes(q) || 
       x.referenceNo?.toLowerCase().includes(q) ||
       x.description?.toLowerCase().includes(q)
    );
  }

  // Quick Date Filter
  if(quickFilter.value) {
     const now = new Date();
     const startMonth = new Date(now.getFullYear(), now.getMonth(), 1);
     const endMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

     if(quickFilter.value === 'this-month') {
        arr = arr.filter(x => {
           const d = new Date(x.entryDate);
           return d >= startMonth && d <= endMonth;
        });
     } else if(quickFilter.value === 'last-month') {
        const startLast = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const endLast = new Date(now.getFullYear(), now.getMonth(), 0);
        arr = arr.filter(x => {
           const d = new Date(x.entryDate);
           return d >= startLast && d <= endLast;
        });
     }
  }

  return arr;
});

const setQuickFilter = (val: string) => {
   quickFilter.value = val;
};

const fmtDate = (d: string) => d?.slice(0, 10) ?? '-';

const formatRupiah = (val: number | string) => {
   if(!val) return 'Rp 0';
   return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(val));
};

const totalDebit = computed(() => form.value.lines.reduce((s, l) => s + Number(l.debit || 0), 0));
const totalCredit = computed(() => form.value.lines.reduce((s, l) => s + Number(l.credit || 0), 0));

const isValidBalance = computed(() => {
   return totalDebit.value > 0 && totalCredit.value > 0 && totalDebit.value === totalCredit.value;
});

const openCreate = () => {
  form.value = { 
    entryDate: new Date().toISOString().slice(0, 10), 
    description: '', 
    referenceNo: '',
    journalType: 'GENERAL',
    lines: [
      { accountCode: '', description: '', costCenterId: '', debit: 0, credit: 0 },
      { accountCode: '', description: '', costCenterId: '', debit: 0, credit: 0 }
    ] 
  };
  dialogOpen.value = true;
};

const addLine = () => form.value.lines.push({ accountCode: '', description: '', costCenterId: '', debit: 0, credit: 0 });
const duplicateLine = (idx: number) => {
   const original = form.value.lines[idx];
   if (!original) return;
   form.value.lines.splice(idx + 1, 0, {
      accountCode: original.accountCode,
      description: original.description,
      costCenterId: original.costCenterId,
      debit: original.debit,
      credit: original.credit
   });
};
const removeLine = (idx: number) => form.value.lines.splice(idx, 1);

const save = async () => {
  if (!isValidBalance.value) {
     showMsg(error, "Jurnal Unbalanced! Total Debit dan Kredit wajib sama.");
     return;
  }
  saving.value = true;
  try {
    await api.post('/finance/journal', {
        ...form.value,
        lines: form.value.lines.map(l => ({
           ...l,
           debit: Number(l.debit),
           credit: Number(l.credit),
           costCenterId: l.costCenterId === '' ? undefined : l.costCenterId
        }))
    });
    showMsg(success, 'Dokumen Jurnal Umum berhasil direkam ke sistem!');
    dialogOpen.value = false;
    await load();
  } catch(e) {
     showMsg(error, 'Gagal merekam jurnal. Harap cek kembali integritas baris akun (COA).');
  } finally {
    saving.value = false;
  }
};

const post = async (row: any) => {
  if(!confirm(`Konfirmasi Posting: Anda yakin memposting Buku Jurnal ${row.entryNo}? Sekali diposting, mutasi saldo akan mengikat secara permanen ke Buku Besar (General Ledger).`)) return;
  try {
    await api.post(`/finance/journal/${row.id}/post`);
    showMsg(success, `Jurnal ${row.entryNo} berhasil diposting ke Buku Besar!`);
  } catch(e) {
    showMsg(error, 'Terjadi kesalahan saat memposting jurnal ke buku besar.');
  }
  await load();
};

const statusOptions = [
  { label: 'DRAFT (Belum Posting)', value: 'DRAFT' },
  { label: 'POSTED (Sudah Posting)', value: 'POSTED' }
];

const journalColumns = [
  { key: 'entryNo', header: 'Nomor Jurnal & Tipe', width: 'w-[280px]' },
  { key: 'entryDate', header: 'Tanggal Dokumen', width: 'w-48', align: 'center' as const, borderLeft: true },
  { key: 'description', header: 'Keterangan / Referensi', borderLeft: true },
  { key: 'totalDebit', header: 'Debit (IDR)', width: 'w-48', align: 'right' as const, borderLeft: true },
  { key: 'totalCredit', header: 'Kredit (IDR)', width: 'w-48', align: 'right' as const, borderLeft: true },
  { key: 'status', header: 'Status Jurnal', width: 'w-48', align: 'center' as const, borderLeft: true },
  { key: 'actions', header: 'Opsi', width: 'w-40', align: 'right' as const, borderLeft: true }
];

onMounted(() => {
  load();
});
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