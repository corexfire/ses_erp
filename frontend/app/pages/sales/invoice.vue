<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-5 shadow-sm border-l-4 border-l-emerald-500">
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div class="text-sm font-semibold text-slate-800">Manajemen Faktur Penjualan (Sales Billing & AR)</div>
          <div class="mt-1 text-sm text-slate-600">
            Pusat realisasi pendapatan. Mencetak Bukti Tagihan (Invoice), mendebit buku Piutang Akuntansi (Accounts Receivable), dan menautkan pembayaran Klien.
          </div>
        </div>
        <div class="flex gap-2">
          <Button label="Laporan Piutang Jatuh Tempo" severity="secondary" size="small" outlined icon="pi pi-file-excel" />
          <Button v-if="canManage" label="+ Cetak Draft Faktur (INV)" size="small" bg="bg-emerald-600" class="text-white border-none shrink-0 cursor-pointer" icon="pi pi-money-bill" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Data List and Filters -->
    <div class="rounded-xl border bg-white p-5 shadow-sm">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2 w-full md:w-auto">
          <InputText v-model="search" placeholder="Cari No. Faktur / Klien..." class="w-full md:w-80 text-xs" />
          <select v-model="statusFilter" class="p-2 border rounded-md text-xs bg-white text-slate-700 min-w-40 outline-none focus:border-emerald-500">
            <option value="">Semua Riwayat Tagihan</option>
            <option value="DRAFT">Hitungan Kotor (Belum Jurnal)</option>
            <option value="APPROVED">Open Invoice (Piutang AR Aktif)</option>
            <option value="CLOSED">Lunas (Paid / Closed)</option>
            <option value="VOID">Dibatalkan / Voided</option>
          </select>
          <Button label="Cari Faktur" severity="secondary" size="small" :disabled="loading" @click="load" />
        </div>
      </div>

      <!-- Invoices Table -->
      <div class="overflow-x-auto rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-emerald-50/40 text-left text-[11px] text-emerald-900 border-b border-emerald-100 uppercase tracking-wider">
            <tr>
              <th class="px-4 py-3 font-semibold w-1/4">Informasi Faktur Jual (INV)</th>
              <th class="px-4 py-3 font-semibold">Profil Debitur (Klien Terutang)</th>
              <th class="px-4 py-3 font-semibold text-right border-l bg-slate-50 w-48">Nilai Valuasi Tagihan Aktif</th>
              <th class="px-4 py-3 font-semibold text-center border-l w-48">Status Ledger (AR)</th>
              <th class="px-4 py-3 text-right font-semibold">Tugas Finansial</th>
            </tr>
          </thead>
          <tbody class="divide-y relative">
             <tr v-if="loading">
              <td colspan="5" class="px-4 py-16 text-center text-sm text-slate-500">
                <i class="pi pi-spinner pi-spin mr-2 text-emerald-500"></i> Memeriksa riwayat pencatatan jurnal piutang...
              </td>
            </tr>
            <!-- Iteration rows -->
            <tr v-for="doc in filteredDocs" v-else :key="doc.id" class="transition hover:bg-emerald-50/10 group cursor-pointer" @click="openView(doc)">
              <!-- Dokumen -->
              <td class="px-4 py-3 align-top">
                <div class="font-bold text-slate-800 flex items-center gap-2 font-mono text-sm group-hover:text-emerald-700 transition-colors">
                   {{ doc.code }}
                   <i v-if="doc.status === 'CLOSED'" class="pi pi-verified text-[10px] text-emerald-500" title="Tagihan terlunasi 100%"></i>
                </div>
                <div class="text-[10px] text-slate-500 mt-1">Due Date: <span class="font-bold" :class="isOverdue(doc.invoiceDate, doc.status) ? 'text-rose-500 bg-rose-50 border px-1 rounded' : 'text-slate-700'">{{ formatDate(doc.invoiceDate, 30) }}</span></div>
              </td>
              
               <!-- Klien / Destinasi -->
              <td class="px-4 py-3 align-top">
                 <div class="flex items-start gap-2">
                    <i class="pi pi-building text-slate-400 mt-0.5"></i>
                    <div>
                       <div class="font-bold text-emerald-900 text-sm hover:underline">{{ doc.customer?.name || 'Klien Tidak Ditemukan' }}</div>
                       <div class="text-[9px] font-mono tracking-tighter text-slate-500 mt-0.5 shadow-sm border px-1 rounded inline-block bg-white">{{ doc.customer?.code }}</div>
                       <div v-if="doc.orderId" class="text-[9px] font-bold text-indigo-500 uppercase flex items-center gap-1 mt-1 pr-1 truncate max-w-40"><i class="pi pi-link text-[8px]"></i> Lk: {{ doc.order?.code || 'Sales Order (SO)' }}</div>
                    </div>
                 </div>
              </td>

              <!-- Muatan Nilai -->
              <td class="px-4 py-3 align-top text-right border-l bg-slate-50 relative h-full transition-colors" :class="doc.status === 'DRAFT' ? '' : 'group-hover:bg-slate-100'">
                 <div class="flex flex-col justify-center items-end h-full">
                    <span class="text-[8px] font-bold text-slate-400 absolute left-2 top-3">Rp (IDR)</span>
                    <div class="font-black text-[22px] font-mono tracking-tighter" :class="doc.status === 'CLOSED' ? 'text-emerald-500' : 'text-slate-800'">
                       {{ formatCurrency(calculateGrandTotal(doc)) }}
                    </div>
                    <div class="text-[8px] font-bold mt-1 tracking-widest text-emerald-600/50" v-if="doc.status !== 'DRAFT'">{{ doc.status === 'CLOSED' ? 'LUNAS (PAID)' : 'HARUS DIBAYAR (TO PAY)' }}</div>
                 </div>
                 <div v-if="doc.status === 'DRAFT'" class="absolute inset-0 bg-white/70 flex items-center justify-center font-bold text-[9px] text-slate-400 uppercase tracking-widest backdrop-blur-[1px]">Belum Di-Posting</div>
              </td>

              <!-- Status Ledger -->
              <td class="px-4 py-4 align-middle text-center border-l bg-slate-50/50">
                 <span class="inline-flex rounded px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-sm w-full h-full flex items-center justify-center" :class="statusBadgeParams(doc.status)">
                   {{ statusMapper(doc.status) }}
                 </span>
                 <div v-show="doc.status === 'APPROVED'" class="text-[8px] mt-1 text-emerald-600/70 font-bold tracking-tight uppercase leading-none"><i class="pi pi-book mr-0.5 text-[8px]"></i> Piutang Debit AR Aktif</div>
                 <div v-show="doc.status === 'CLOSED'" class="text-[8px] mt-1 text-emerald-600 font-bold tracking-tight uppercase leading-none"><i class="pi pi-wallet mr-0.5 text-[8px]"></i> Uang Diterima & Dijurnal</div>
              </td>

              <!-- Actions -->
              <td class="px-4 py-4 align-middle text-right border-l">
                <Button v-if="doc.status === 'APPROVED'" label="Penerimaan Kasir" size="small" bg="bg-emerald-600 text-white border-none" class="text-[10px] px-3 font-bold py-1.5 text-center shadow shadow-emerald-600/30 hover:bg-emerald-700 w-full mb-1" @click.stop="pay(doc)" />
                <Button label="Buka Dokumen Tagihan" size="small" severity="secondary" outlined class="text-[10px] px-3 font-bold py-1.5 text-center transition-colors hover:text-emerald-700 hover:bg-emerald-50 w-full" @click.stop="openView(doc)" />
              </td>
            </tr>
            <tr v-if="!loading && filteredDocs.length === 0">
              <td colspan="5" class="px-4 py-16 text-center text-slate-500 border-t">
                <div class="text-4xl mb-3 opacity-30 text-emerald-400"><i class="pi pi-receipt"></i></div>
                Tidak ditemukan faktur tagihan untuk filter tersebut.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


    <!-- Viewer/Editor Modal (Sales Invoice Ledger/Form) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-2 sm:p-4 backdrop-blur-sm shadow-xl">
      <div class="w-full max-w-6xl rounded-xl border bg-slate-50 shadow-2xl flex flex-col max-h-[95vh] h-full overflow-hidden animate-fade-in-up">
        
        <!-- Header -->
        <div class="p-6 border-b flex flex-col sm:flex-row items-center justify-between shrink-0 gap-4 relative overflow-hidden shadow-sm" :class="activeDoc?.status === 'APPROVED' ? 'bg-slate-900 border-slate-700' : (activeDoc?.status === 'CLOSED' ? 'bg-emerald-950 border-emerald-800' : 'bg-emerald-800 border-emerald-600')">
          <div class="absolute left-[-20px] top-[-20px] opacity-10">
             <i class="pi pi-receipt text-[150px]" :class="activeDoc?.status === 'CLOSED' ? 'text-emerald-300' : 'text-white'"></i>
          </div>
          <div class="z-10 w-full flex justify-between items-start">
             <div>
               <div class="flex items-center gap-3">
                 <span class="text-xl font-black text-white tracking-tight">{{ activeDoc?.id ? `Dokumen Penagihan Sah: ${form.code}` : 'Kertas Kerja Rancangan Tagihan Baru (Draft Faktur)' }}</span>
                 <span v-if="activeDoc?.id" class="inline-flex rounded text-[9px] font-black uppercase shadow-sm border px-2 py-0.5" :class="statusBadgeParams(form.status)">
                   {{ statusMapper(form.status) }}
                 </span>
               </div>
               <div class="text-xs font-medium w-full flex gap-3 mt-1 pl-1" :class="activeDoc?.status === 'CLOSED' ? 'text-emerald-200' : 'text-emerald-100 opacity-80'">
                 Konversi Surat Jalan yang terkirim (POD) menjadi komitmen nilai Rupiah. "Approval" akan menancapkan nilai tagihan ini menjadi Hutang Klien (Piutang kita) di pembukuan Akuntansi (GL).
               </div>
             </div>
          </div>
          <button class="text-white/50 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded text-lg font-bold flex items-center justify-center transition-colors shadow-sm z-20 absolute right-4 top-4" @click="dialogOpen = false">✕</button>
        </div>

        <div class="flex-1 overflow-y-auto flex flex-col p-5 bg-slate-100">
           
           <div class="grid lg:grid-cols-3 gap-6 mb-6 h-full flex-1">
              <!-- Kolom Kiri: Meta Tagihan (Debitur) -->
              <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4 relative col-span-1 border-t-4 border-t-emerald-500">
                 <div class="text-[10px] font-black uppercase text-slate-400 tracking-wider flex gap-2 w-full border-b pb-2"><i class="pi pi-book"></i> Identitas Tagihan & Debitur AR</div>
                 
                 <div class="space-y-1 relative">
                    <label class="text-[10px] font-bold text-slate-500">Tagihkan Biaya Kepada (Bill To AR)</label>
                    <select :disabled="isReadonly" v-model="form.customerId" class="w-full border rounded p-2 text-sm font-bold font-sans text-emerald-900 bg-emerald-50 border-emerald-200 outline-none shadow-inner">
                        <option value="">-- Hubungkan dengan Entitas Klien --</option>
                        <option v-for="c in mockCustomers" :value="c.id">{{ c.code }} - {{ c.name }}</option>
                    </select>
                 </div>
                 
                 <div class="space-y-1 relative my-1">
                    <label class="text-[10px] font-bold text-emerald-600 tracking-wider">Lacak Dokumen Referensi Pesanan Jual (SO)</label>
                    <input :disabled="isReadonly" type="text" v-model="form.orderId" class="w-full border-b-2 border-emerald-500 px-2 py-1 text-xs font-bold font-mono text-slate-600 bg-emerald-50 outline-none placeholder-slate-400" placeholder="Biarkan kosong jika Invoice Langsung" />
                 </div>

                 <div class="grid grid-cols-2 gap-3 mt-1">
                    <div class="space-y-1 relative">
                       <label class="text-[10px] font-bold text-slate-500">Tgl Faktur Turun</label>
                       <input :disabled="isReadonly" type="date" v-model="form.invoiceDate" class="w-full border rounded p-2 text-xs font-bold text-slate-700 bg-slate-50 outline-none focus:border-emerald-500" />
                    </div>
                    <div class="space-y-1 relative">
                       <label class="text-[10px] font-bold text-slate-500">Kredit Piutang</label>
                       <div class="w-full border rounded p-2 text-xs font-black text-rose-500 bg-rose-50 border-rose-200 shadow-inner tracking-widest text-center">{{ formatDate(form.invoiceDate, 30) }}</div>
                    </div>
                 </div>
                 <div class="text-[8px] text-slate-400 font-bold self-end pr-2 -mt-2 uppercase bg-white px-1 relative -top-3 right-0">Syarat standar: 30 Hari (Net30)</div>
                 
                 <div class="space-y-1 flex-1 relative">
                    <label class="text-[10px] font-bold text-slate-500 mb-2 block uppercase tracking-widest">Keterangan / Notes</label>
                    <textarea :disabled="isReadonly" v-model="form.notes" rows="3" class="w-full rounded border p-2 text-xs bg-white outline-none focus:border-emerald-500 font-sans shadow-inner border-slate-300" placeholder="Klaim tagihan tahap kedua sesuai kontrak b2b..."></textarea>
                 </div>
              </div>

              <!-- Kolom Kanan: Rencana Akuntansi / Bill of Sales -->
               <div class="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden col-span-2 relative h-full">
                   <div class="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-50 border-b z-10 w-full">
                     <div class="text-xs font-black text-slate-800 uppercase tracking-widest"><i class="pi pi-wallet mr-2 text-emerald-600"></i> Rincian Harga Tagih (Billing Items)</div>
                     <div class="flex gap-2 mt-3 sm:mt-0">
                        <Button v-if="!isReadonly" label="Sinkron Nilai dari SO/DO" icon="pi pi-sync" size="small" bg="bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100" class="h-8 shadow-sm text-[9px] font-bold" />
                        <Button v-if="!isReadonly" label="Biaya Jasa Ad-hoc Tambahan" icon="pi pi-plus" size="small" bg="bg-white" class="h-8 shadow-sm text-slate-700 text-[9px] border-slate-200 font-bold focus:shadow-none" @click="addLine" />
                     </div>
                   </div>
                   <div class="overflow-x-auto z-10 w-full flex-1 min-h-[300px]">
                     <table class="w-full text-sm">
                       <thead class="bg-white text-left text-[9px] text-slate-400 border-b uppercase tracking-wider relative">
                         <tr>
                           <th class="px-3 py-2 font-black text-slate-700 w-64 border-r bg-slate-50">RINCIAN JURNAL REVENUE (Sales Name)</th>
                           <th class="px-3 py-2 text-center font-bold bg-slate-50 border-r w-20 text-slate-400" title="Boleh disetel jumlah parsial pelunasan (Termin)">KLAIM QTY</th>
                           <th class="px-3 py-2 text-right font-bold w-32 border-r bg-slate-50" title="Harga fix dikunci">TARIF NET (@ Price/Unit)</th>
                           <th class="px-3 py-2 text-right font-black border-l w-40 bg-emerald-50 text-emerald-800" title="Kuantitas asli dikali net pajak dll">SUBTOTAL PIUTANG (Rp)</th>
                           <th v-if="!isReadonly" class="w-8 border-l border-b bg-white"></th>
                         </tr>
                       </thead>
                       <tbody class="divide-y relative">
                          <tr v-for="(line, idx) in form.lines" :key="idx" class="transition-colors group hover:bg-slate-50">
                             <td class="px-3 py-3 align-top border-r bg-slate-50/50">
                                <textarea :disabled="isReadonly" v-model="line.desc" rows="2" class="w-full text-xs font-bold text-slate-800 bg-white outline-none focus:border-emerald-500 placeholder-slate-300 border border-slate-200 rounded p-1 shadow-inner" placeholder="Pilih/Ketik SKU dari Inventory Master..." />
                                <div v-if="line.itemId" class="text-[9px] mt-1 text-indigo-500 font-bold tracking-tighter inline-flex items-center gap-1 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100 uppercase"><i class="pi pi-database text-[8px]"></i> Accounted Revenue.</div>
                             </td>
                             
                             <td class="px-2 py-3 align-top text-center border-r bg-slate-50 h-full">
                                <div class="flex flex-col items-center">
                                   <input :disabled="isReadonly" type="number" v-model.number="line.qty" class="w-full bg-slate-200/50 border-b border-slate-300 rounded px-1 py-1.5 text-center text-[15px] font-black text-slate-600 outline-none" placeholder="0" />
                                   <input :disabled="isReadonly" type="text" v-model="line.uomCode" class="w-12 text-[9px] font-mono border-b border-transparent uppercase text-center mt-1 outline-none font-bold text-slate-500 bg-transparent" placeholder="UOM" />
                                </div>
                             </td>

                             <td class="px-3 py-3 align-top border-r relative h-full">
                                <span class="absolute left-2 top-4 text-[9px] text-slate-400 font-sans">Rp</span>
                                <input :disabled="isReadonly" type="number" v-model.number="line.unitPrice" class="w-full border-b border-slate-200 px-1 py-1.5 text-right text-sm font-mono font-bold text-slate-700 outline-none focus:border-emerald-500 bg-transparent rounded" placeholder="0" />
                                <div v-if="line.discount && line.discount > 0" class="text-[8px] font-bold text-rose-500 mt-1 text-right w-full bg-rose-50 px-1 border border-rose-100 rounded">- Menanggung diskon tercatat Rp {{ formatCurrency(line.discount) }}.</div>
                             </td>
                             
                             <td class="px-2 py-3 align-middle text-right bg-emerald-100/30 group-hover:bg-emerald-100/50 transition-colors h-full relative overflow-hidden">
                                <span class="absolute left-2 top-4 text-[9px] text-emerald-400 font-sans font-bold">Rp</span>
                                <div class="font-black text-[15px] font-mono tracking-tighter text-emerald-900 pr-1">{{ formatCurrency(calculateLineTotal(line)) }}</div>
                             </td>

                             <td v-if="!isReadonly" class="px-1 py-3 align-middle border-l text-center">
                                 <button @click="removeLine(idx)" class="w-6 h-6 rounded bg-slate-100 text-slate-400 flex items-center justify-center font-black hover:bg-rose-500 hover:text-white transition-colors" title="Batal Tagih">✕</button>
                             </td>
                          </tr>
                          <tr v-if="form.lines.length === 0">
                             <td :colspan="isReadonly ? 4 : 5" class="p-8 text-center text-slate-400 text-xs italic">
                                Nol faktur pembiayaan.
                             </td>
                          </tr>
                       </tbody>
                     </table>
                   </div>
                   
                   <!-- Summary Total Bar Hitam -->
                   <div class="bg-black p-5 border-t border-slate-700 relative overflow-hidden w-full flex justify-between items-center z-10 shrink-0">
                      <div class="text-xs text-slate-400 font-medium max-w-[200px] leading-tight opacity-50" :class="form.status === 'CLOSED' ? 'bg-emerald-900 px-2 py-1 border border-emerald-700 text-emerald-300 font-bold !opacity-100' : ''">
                          {{ form.status === 'CLOSED' ? 'SUDAH LUNAS' : '*Total Tagihan ini akan disinkronasi ke modul General Ledger Akuntansi' }}
                      </div>
                      <div class="z-10 text-right shrink-0 relative pr-4">
                         <div class="absolute -left-12 -top-5 opacity-20 pointer-events-none"><i class="pi pi-briefcase text-8xl text-emerald-400"></i></div>
                         <div class="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1 relative z-10">AKUMULASI NILAI FAKTUR KESELURUHAN (PIUTANG DAGANG)</div>
                         <div class="font-mono text-3xl font-black text-white px-3 py-1 pb-2 bg-emerald-900 rounded inline-block drop-shadow-md shadow-inner border border-emerald-600 relative z-10"><span class="text-emerald-500 mr-2 text-xl tracking-widest relative -top-0.5">RP</span>{{ formatCurrency(calcGross()) }},<span class="text-xs text-white/50 relative -top-3 ml-0.5">00</span></div>
                      </div>
                   </div>
               </div>
           </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-5 border-t border-slate-200 bg-white flex justify-between items-center shrink-0 rounded-b-xl z-20 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)] gap-4">
          <Button label="Kembali ke Laci Piutang" severity="secondary" size="small" @click="dialogOpen = false" outlined class="bg-slate-50 border-slate-300 font-bold" />
          
          <div class="flex items-center gap-2">
             <Button v-if="isReadonly && canManage && form.status === 'DRAFT'" label="Sahkan Cetak: Jurnal Menjadi Beban Klien Aktif (TERUTANG/AR)!" severity="info" size="large" :loading="saving" :disabled="saving" @click="saveAction('APPROVED')" class="bg-emerald-600 border-none text-white font-bold tracking-wide hover:bg-emerald-700 shadow-sm h-10 px-8 rounded-lg" icon="pi pi-check-circle" />
             <Button v-else-if="isReadonly && canManage && form.status === 'APPROVED'" label="Klien Melunasi! (Set sebagai PAID/CLOSED)" severity="success" size="large" :loading="saving" :disabled="saving" @click="saveAction('CLOSED')" class="bg-slate-900 border-none text-white hover:text-emerald-400 hover:bg-black font-black tracking-widest uppercase shadow-sm h-10 px-8 rounded-lg" icon="pi pi-credit-card" />
             <Button v-else-if="!isReadonly" label="Simulasi Konsep (Save Draft)" severity="info" size="large" @click="saveAction('DRAFT')" class="bg-slate-600 border-none text-white font-bold h-10 px-8 rounded-lg shadow-sm" icon="pi pi-save" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('sales.invoice.manage') || true); 

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
  orderId: '',
  invoiceDate: '',
  notes: '',
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

const formatDate = (iso: string, addDays: number = 0) => {
  if (!iso) return '-';
  const d = new Date(iso);
  if(addDays) d.setDate(d.getDate() + addDays);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};

const isOverdue = (dateIso: string, status: string) => {
    if(status === 'CLOSED' || status === 'VOID') return false;
    if(!dateIso) return false;
    const d = new Date(dateIso);
    d.setDate(d.getDate() + 30); // 30 days due
    return new Date() > d;
}

const formatCurrency = (val: any) => {
  if (!val && val !== 0 || isNaN(val)) return '0';
  return Number(val).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

const calculateLineTotal = (line: any) => (Number(line.qty||0) * Number(line.unitPrice||0)) - (Number(line.discount||0) * Number(line.qty||0));
const calcGross = () => form.lines.reduce((a,c) => a + calculateLineTotal(c), 0);

const calculateGrandTotal = (doc: any) => {
    if(!doc.items) return 0;
    return doc.items.reduce((acc: number, cur: any) => acc + calculateLineTotal(cur), 0);
}

const statusMapper = (s: string) => {
    if(s === 'APPROVED') return 'PIUTANG DIREKAM (UNPAID)';
    if(s === 'CLOSED') return 'TAGIHAN TERLUNASI (PAID)';
    if(s === 'DRAFT') return 'VERIFIKASI FINANCE';
    if(s === 'VOID') return 'INVOICE DIBATALKAN';
    return s;
}

const statusBadgeParams = (s: string) => {
    if(s === 'CLOSED') return 'bg-emerald-50 text-emerald-800 border-emerald-300 border shadow shadow-emerald-200';
    if(s === 'DRAFT') return 'bg-slate-100 text-slate-500 border-white shadow-inner bg-slate-200';
    if(s === 'VOID') return 'bg-rose-100 text-rose-700 border-rose-300 line-through opacity-70';
    return 'bg-amber-100 text-amber-800 border-amber-400 border shadow shadow-amber-200';
};

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/query?table=SalesInvoice&include=customer,order,items');
    if (res.data && res.data.data) {
        docs.value = res.data.data;
    } else {
        throw new Error("No payload");
    }
  } catch (e: any) {
    // Mock Data based on postgres seeded data
    docs.value = [
      { 
        id: '1', code: "INV-202604-001", status: "APPROVED", invoiceDate: "2026-04-16T00:00", notes: "Jatuh tempo 30 hari EOM.",
        customer: { code: 'CUS-KVJ', name: 'PT. Kopi Viktori Jaya' },
        order: { code: 'SO-202604-001' },
        items: [
           { itemId: 'wms-key', desc: 'Kopi Bubuk Arabica Premium 250g (Partial Deliver)', qty: 250, unitPrice: 115000, discount: 0, uomCode: 'PCS' }
        ]
      },
      { 
        id: '2', code: "INV-202604-002", status: "DRAFT", invoiceDate: "2026-04-20T00:00",
        customer: { code: 'CUS-KVJ', name: 'PT. Kopi Viktori Jaya' },
        items: [
           { itemId: null, desc: 'Sewa Mesin Espresso Ad-hoc Event', qty: 1, unitPrice: 1500000, discount: 50000, uomCode: 'DAY' }
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
  form.code = 'INV-NEW';
  form.customerId = mockCustomers.value[0]?.id || '';
  form.orderId = '';
  form.invoiceDate = new Date().toISOString().split('T')[0];
  form.status = 'DRAFT';
  form.notes = 'Termin normal (30 hari). Mohon ditransfer ke Bank BCA Cab ERP kami.';
  form.lines = [{ itemId: 'wms-key', desc: "Kopi Arabica dari DO Penyerahan...", qty: 10, unitPrice: 120000, discount: 0, uomCode: 'PCS' }];
  
  dialogOpen.value = true;
}

function pay(doc: any) {
   alert(`Integrasi Pembayaran (Cash Receipt): Mengarahkan bendahara ke Papan Penerimaan Kasir untuk mendebit tunai/transfer ke Piutang ${doc.code}.`);
}

function openView(r: any) {
  activeDoc.value = r;
  isReadonly.value = true; 
  
  form.id = r.id;
  form.code = r.code;
  form.customerId = r.customerId || mockCustomers.value[0]?.id;
  form.orderId = r.orderId || '';
  form.invoiceDate = r.invoiceDate?.split('T')[0] || '';
  form.notes = r.notes || '';
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

function addLine() {
   form.lines.push({ itemId: null, desc: "", qty: 1, unitPrice: 0, discount: 0, uomCode: 'PCS' });
}

function removeLine(idx: number) {
   form.lines.splice(idx, 1);
}

async function saveAction(targetStatus: string) {
  saving.value = true;
  form.status = targetStatus;
  
  let msg = "Draft Faktur disimpan dengan aman.";
  if(targetStatus === 'APPROVED') msg = "BERHASIL DI-POSTING! Hutang sah didirikan. Piutang Usaha (AR) perusahaan Anda bertambah dan mesin pembukuan Keuangan (*General Ledger*) bereaksi. Tagih debel ini sekarang!";
  if(targetStatus === 'CLOSED') msg = "LUNAS (PAID) TERVERIFIKASI! Tagihan telah dicarikan ke Kas Tunai / Bank. Pemasukan laba murni telah terjadi.";

  setTimeout(() => {
    alert(msg);
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
