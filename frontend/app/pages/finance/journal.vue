<template>
  <div class="space-y-4">
    <!-- Header Page -->
    <div class="rounded-xl border bg-white p-5 shadow-sm border-l-4 border-l-indigo-600">
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div class="text-sm font-black text-slate-800 uppercase tracking-wide">Journal Entries (Buku Jurnal Umum)</div>
          <div class="mt-1 text-xs text-slate-500">
            Pencatatan transaksi akuntansi berpasangan (double-entry), penyesuaian, penyusutan, dan akrual.
          </div>
        </div>
        <div class="flex gap-2">
           <Button label="+ Penjurnalan Baru" size="small" bg="bg-indigo-600" class="text-white font-bold border-none shrink-0 cursor-pointer shadow-sm hover:bg-indigo-700" icon="pi pi-book" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Filter & Table Section -->
    <div class="rounded-xl border bg-white p-5 shadow-sm">
      <div class="flex flex-wrap items-center justify-between gap-3 mb-4 bg-slate-50 p-2 rounded-lg border border-slate-100">
        <div class="flex items-center gap-2 w-full md:w-auto">
          <InputText v-model="search" placeholder="Cari Dokumen / Jurnal..." class="w-full md:w-56 text-xs bg-white" />
          <select v-model="status" class="h-9 rounded-md border px-3 text-xs bg-white text-slate-700 outline-none focus:border-indigo-500">
            <option value="">Semua Status</option>
            <option value="DRAFT">DRAFT</option>
            <option value="POSTED">POSTED</option>
          </select>
          <Button label="Muat Ulang" severity="secondary" size="small" @click="load" class="h-9" icon="pi pi-refresh" />
        </div>
      </div>

      <div class="overflow-x-auto rounded-lg border border-slate-200">
        <table class="w-full text-sm">
          <thead class="bg-indigo-50/50 text-left text-[11px] text-indigo-900 border-b border-indigo-100 uppercase tracking-wider font-bold">
            <tr>
              <th class="px-4 py-3">No Jurnal / Tipe</th>
              <th class="px-4 py-3 border-l text-center">Tanggal Dokumen</th>
              <th class="px-4 py-3 border-l">Keterangan / Referensi</th>
              <th class="px-4 py-3 text-right bg-slate-50 border-l">Total Debit (IDR)</th>
              <th class="px-4 py-3 text-right bg-slate-50">Total Kredit (IDR)</th>
              <th class="px-4 py-3 text-center border-l">Status</th>
              <th class="px-4 py-3 text-center border-l w-20">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y relative text-[12px]">
            <tr v-if="loading">
              <td colspan="7" class="px-4 py-16 text-center text-sm text-slate-500">
                <i class="pi pi-spinner pi-spin mr-2 text-indigo-500"></i> Memuat Buku Jurnal...
              </td>
            </tr>
            <tr v-for="e in filteredEntries" v-else :key="e.id" class="transition hover:bg-slate-50 group">
              <!-- No Jurnal -->
              <td class="px-4 py-3 align-middle">
                 <div class="font-mono font-black text-indigo-700 tracking-wider">{{ e.entryNo }}</div>
                 <div class="mt-1 flex items-center gap-1"><span class="bg-slate-100 text-[9px] px-1.5 py-0.5 rounded font-bold text-slate-500 uppercase">{{ e.journalType || 'GENERAL' }}</span></div>
              </td>
              
              <!-- Tanggal -->
              <td class="px-4 py-3 align-middle text-center border-l font-medium text-slate-700 flex flex-col items-center">
                 <i class="pi pi-calendar text-[10px] text-slate-400 mb-0.5"></i>
                 {{ fmtDate(e.entryDate) }}
              </td>

              <!-- Keterangan -->
              <td class="px-4 py-3 align-middle border-l">
                 <div class="font-black text-slate-700 text-xs line-clamp-2 max-w-sm">{{ e.description ?? '- Tanpa Deskripsi -' }}</div>
                 <div class="text-[10px] text-slate-400 mt-1 uppercase font-semibold"><i class="pi pi-link text-[9px]"></i> Ref: {{ e.referenceNo || 'N/A' }}</div>
              </td>

              <!-- Debit -->
              <td class="px-4 py-3 align-middle border-l text-right bg-slate-50/50">
                 <div class="font-mono font-black text-slate-800 tracking-tighter">{{ formatRupiah(e.totalDebit) }}</div>
              </td>
              
              <!-- Kredit -->
              <td class="px-4 py-3 align-middle text-right bg-slate-50/50">
                 <div class="font-mono font-black text-slate-800 tracking-tighter">{{ formatRupiah(e.totalCredit) }}</div>
              </td>

              <!-- Status -->
              <td class="px-4 py-3 align-middle text-center border-l">
                 <div :class="e.status === 'POSTED' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-amber-100 text-amber-800 border-amber-200'" class="px-2 py-1 rounded-md text-[10px] font-black tracking-widest border inline-block">
                    <i :class="e.status === 'POSTED' ? 'pi pi-check-circle' : 'pi pi-clock'" class="mr-1 text-[9px]"></i>{{ e.status }}
                 </div>
              </td>

              <!-- Action -->
              <td class="px-4 py-3 align-middle text-center border-l">
                <Button v-if="e.status === 'DRAFT'" icon="pi pi-upload" label="POST" size="small" outlined severity="info" class="text-[10px] bg-white h-7 px-2" @click="post(e)" />
                <Button v-else icon="pi pi-search" severity="secondary" text rounded aria-label="Lihat Data" />
              </td>
            </tr>
            <tr v-if="!loading && filteredEntries.length === 0">
              <td colspan="7" class="px-4 py-16 text-center text-slate-400 border-t italic">
                Cakupan Jurnal Akuntansi Tidak Tersedia (Empty Record).
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create Dialog Form -->
    <div v-if="dialogOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-2 sm:p-4 backdrop-blur-sm shadow-xl">
      <div class="w-full max-w-5xl rounded-xl border bg-white shadow-2xl flex flex-col max-h-[90vh] animate-fade-in-up">
        
        <div class="p-5 border-b bg-indigo-900 border-indigo-950 relative overflow-hidden flex justify-between items-start shadow-sm rounded-t-xl">
          <div class="absolute -right-5 -top-10 opacity-10"><i class="pi pi-book text-[150px] text-white"></i></div>
          <div class="z-10 w-full pr-8">
             <div class="text-lg font-black text-white tracking-tight flex items-center gap-3">
                 Pembuatan Dokumen Jurnal Penyesuaian / Umum (JV)
             </div>
          </div>
          <button class="text-white/50 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded text-lg font-bold flex items-center justify-center transition-colors z-20 shrink-0 shadow" @click="dialogOpen = false">✕</button>
        </div>

        <div class="px-5 py-4 bg-slate-50 flex-1 overflow-auto space-y-4">
           <!-- Header Fields -->
           <div class="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
             <div>
                <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Tipe Jurnal</label>
                <select v-model="form.journalType" class="w-full border rounded px-3 py-2 text-xs font-bold text-slate-700 bg-slate-50 outline-none focus:border-indigo-500">
                  <option value="GENERAL">Jurnal Umum (General)</option>
                  <option value="ADJUSTMENT">Penyesuaian (Adjustment)</option>
                  <option value="ACCRUAL">Akrual (Accrual)</option>
                  <option value="DEPRECIATION">Penyusutan Aset (Depreciation)</option>
                  <option value="RECLASS">Reklasifikasi (Reclass)</option>
                </select>
             </div>
             <div>
                <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Nomor Referensi (Bukti Asli)</label>
                <input type="text" v-model="form.referenceNo" class="w-full border rounded px-3 py-2 text-xs font-bold font-mono text-slate-800 outline-none focus:border-indigo-500" placeholder="Ex: JV-01-XX" />
             </div>
             <div>
                <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Tanggal Bukti (Document Date)</label>
                <input type="date" v-model="form.entryDate" class="w-full border rounded px-3 py-2 text-xs font-bold text-slate-700 outline-none focus:border-indigo-500 cursor-pointer bg-slate-50" />
             </div>
             <div>
                <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Uraian / Deskripsi Jurnal</label>
                <input type="text" v-model="form.description" class="w-full border rounded px-3 py-2 text-xs font-bold text-slate-700 outline-none focus:border-indigo-500" placeholder="Rincian dokumen..." />
             </div>
           </div>

           <!-- GL Lines (Double Entry Tracker) -->
           <div class="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
             <div class="px-4 py-2 bg-slate-100 border-b flex justify-between items-center">
                <span class="text-xs font-bold text-slate-600 uppercase tracking-widest flex items-center gap-2"><i class="pi pi-directions"></i> Distrubusi Garis Akun (GL Lines)</span>
                <Button label="Tambah Akun (Baris)" icon="pi pi-plus" size="small" text outlined class="h-7 text-[10px] bg-white border-slate-300" @click="addLine" />
             </div>
             <div class="overflow-x-auto">
               <table class="w-full text-xs">
                 <thead class="bg-indigo-50/20 text-slate-500 border-b">
                   <tr>
                     <th class="px-3 py-2 text-left font-bold w-40">Account Code</th>
                     <th class="px-3 py-2 text-left font-bold">Keterangan Baris (Opsional)</th>
                     <th class="px-3 py-2 text-left font-bold w-48 border-l">Cost Center</th>
                     <th class="px-3 py-2 text-right font-bold w-36 border-l">Debit (Rp)</th>
                     <th class="px-3 py-2 text-right font-bold w-36 border-l">Credit (Rp)</th>
                     <th class="px-3 py-2 w-10 border-l">X</th>
                   </tr>
                 </thead>
                 <tbody class="divide-y text-slate-700 font-medium">
                   <tr v-for="(l, idx) in form.lines" :key="idx" class="hover:bg-slate-50 transition-colors">
                     <td class="p-2"><input type="text" v-model="l.accountCode" class="w-full border rounded px-2 py-1.5 focus:border-indigo-500 font-mono tracking-widest text-indigo-700 bg-indigo-50/50" placeholder="Ex: 5110" /></td>
                     <td class="p-2"><input type="text" v-model="l.description" class="w-full border-b px-2 py-1.5 focus:border-indigo-500 bg-transparent outline-none" placeholder="Uraian garis.." /></td>
                     <td class="p-2 border-l">
                         <select v-model="l.costCenterId" class="w-full border rounded px-1 py-1.5 focus:border-indigo-500 outline-none bg-slate-50 text-[10px]">
                            <option value="">-- Non-CC --</option>
                            <option v-for="c in costCenters" :key="c.id" :value="c.id" class="text-slate-800">[{{ c.code }}] {{ c.name }}</option>
                         </select>
                     </td>
                     <td class="p-2 border-l bg-emerald-50/30"><input type="number" v-model.number="l.debit"  @input="() => { if(l.debit > 0) l.credit = 0 }" class="w-full border rounded px-2 py-1.5 text-right font-mono font-bold text-slate-800 focus:border-emerald-500 outline-none" min="0" /></td>
                     <td class="p-2 border-l bg-amber-50/30"> <input type="number" v-model.number="l.credit" @input="() => { if(l.credit > 0) l.debit = 0 }" class="w-full border rounded px-2 py-1.5 text-right font-mono font-bold text-slate-800 focus:border-amber-500 outline-none" min="0" /></td>
                     <td class="p-2 text-center border-l"><Button icon="pi pi-trash" severity="danger" size="small" text class="h-6 w-6 p-0 text-[10px]" @click="removeLine(idx)" /></td>
                   </tr>
                 </tbody>
               </table>
             </div>
           </div>
        </div>

        <!-- Balance Indicator & Footer -->
        <div class="px-5 py-4 border-t bg-white rounded-b-xl flex justify-between items-center z-20">
            <div class="flex items-center gap-6">
                <!-- Check Balance -->
                 <div class="px-4 py-2 rounded border bg-slate-50 flex items-center gap-3">
                     <span class="text-[10px] font-bold uppercase text-slate-400">Neraca Percobaan</span>
                     <div class="h-8 border-l border-slate-300"></div>
                     <div class="text-right">
                         <div class="text-[9px] text-slate-400 font-bold uppercase">Total Debit</div>
                         <div class="font-mono font-black text-sm text-slate-700 tracking-tighter">{{ formatRupiah(totalDebit) }}</div>
                     </div>
                     <div class="text-right">
                         <div class="text-[9px] text-slate-400 font-bold uppercase">Total Kredit</div>
                         <div class="font-mono font-black text-sm text-slate-700 tracking-tighter">{{ formatRupiah(totalCredit) }}</div>
                     </div>
                     <div class="ml-2 pl-3 border-l border-slate-200">
                        <span v-if="isValidBalance" class="text-xs font-black text-emerald-600 uppercase flex items-center gap-1"><i class="pi pi-check"></i> Balanced</span>
                        <span v-else class="text-xs font-black text-red-500 uppercase flex items-center gap-1"><i class="pi pi-times"></i> Unbalanced</span>
                     </div>
                 </div>
            </div>

          <div class="flex gap-2 items-stretch">
            <Button label="Batalkan" severity="secondary" class="font-bold text-xs" outlined @click="dialogOpen = false" />
            <Button label="Simpan Draf Jurnal" :loading="saving" :disabled="!isValidBalance || form.lines.length < 2" @click="save" class="bg-indigo-600 border-none text-white font-bold tracking-wide hover:bg-indigo-700 text-xs px-6" icon="pi pi-save" />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();

const search = ref('');
const status = ref('');
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
  if(search.value) {
    const q = search.value.toLowerCase();
    arr = arr.filter(x => 
       x.entryNo?.toLowerCase().includes(q) || 
       x.referenceNo?.toLowerCase().includes(q) ||
       x.description?.toLowerCase().includes(q)
    );
  }
  return arr;
});

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
const removeLine = (idx: number) => form.value.lines.splice(idx, 1);

const save = async () => {
  if (!isValidBalance.value) {
     alert("Jurnal Unbalanced! Total Debit dan Akredit wajib sama.");
     return;
  }
  saving.value = true;
  try {
    // We send extra payload, nestJs backend typically allows it unless whitelisted restricted strictly
    // Or we proxy through direct post. Let's send normal POST. 
    // The previous implementation mapped api.post('/finance/journal', form.value);
    await api.post('/finance/journal', {
        ...form.value,
        lines: form.value.lines.map(l => ({
           ...l,
           debit: Number(l.debit),
           credit: Number(l.credit),
           costCenterId: l.costCenterId === '' ? undefined : l.costCenterId
        }))
    });
    dialogOpen.value = false;
    await load();
  } catch(e) {
     alert('Gagal merekam jurnal. Harap cek kembali kelengkapan field (e.g. Account Code ada/tidak).');
  } finally {
    saving.value = false;
  }
};

const post = async (row: any) => {
  if(!confirm(`Anda yakin memposting Buku Jurnal ${row.entryNo}? Sekali dipos, mutasi saldo mengikat permanen ke buku besar.`)) return;
  try {
    await api.post(`/finance/journal/${row.id}/post`);
  } catch(e) {
    alert('Terjadi kesalahan memposting jurnal. Parameter / Referensi Idx salah?');
  }
  await load();
};

onMounted(async () => { await load(); });
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.3s ease-out forwards; }
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>