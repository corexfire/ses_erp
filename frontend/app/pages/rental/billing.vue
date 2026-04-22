<template>
  <div class="space-y-6">
    <!-- ═══════════════════════════════════ HEADER (Premium Finance Engine) ══════════════════════════════════ -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 overflow-hidden relative p-8 m-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500 group">
      <div class="absolute top-0 right-0 w-64 h-64 bg-sky-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-sky-100/50"></div>
      
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-sky-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-sky-100">Manajemen Penagihan</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-sky-600 uppercase tracking-widest">Billing & Invoices</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase tracking-tighter">Billing <span class="text-sky-600 italic">Engine</span></h1>
        <p class="text-slate-500 text-sm font-medium max-w-2xl leading-relaxed mt-3 uppercase tracking-tight opacity-70">Otomasi penagihan dan rekonsiliasi pembayaran sewa secara real-time untuk menjamin arus kas operasional yang optimal.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="load" :loading="loading" class="h-12 w-12 text-slate-400 hover:text-sky-600 transition-all shadow-sm bg-white" />
        <Button v-if="canManage" label="+ Terbitkan Invoice Baru" icon="pi pi-plus" class="p-button-rounded h-14 px-8 bg-sky-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-sky-100 hover:scale-105 active:scale-95 transition-all" @click="openCreate" />
      </div>
    </div>

    <!-- Component Alert -->
    <div v-if="success" class="bg-emerald-50 text-emerald-700 p-3 rounded-xl border border-emerald-200 text-sm font-bold flex items-center gap-2 animate-fade-in-up">
      <i class="pi pi-check-circle text-lg"></i> {{ success }}
    </div>
    <div v-if="error" class="bg-rose-50 text-rose-700 p-3 rounded-xl border border-rose-200 text-sm font-bold flex items-center gap-2 animate-fade-in-up">
      <i class="pi pi-exclamation-triangle text-lg"></i> {{ error }}
    </div>

    <!-- Financial Telemetry (High-Contrast Sky Blue) -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mx-6 mb-8 animate-fade-in-up">
       <!-- Unpaid (Strongest Alert) -->
       <div class="p-4 rounded-2xl bg-sky-950 text-white shadow-xl shadow-sky-100 flex flex-col justify-between transition-all hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden group">
          <div class="absolute right-0 bottom-0 opacity-10 -mr-4 -mb-4 group-hover:scale-110 transition-transform">
             <i class="pi pi-clock text-9xl"></i>
          </div>
          <div class="text-[10px] font-black uppercase text-sky-400 tracking-[0.2em] mb-4">Belum Terbayar (IDR)</div>
          <div class="flex items-end justify-between relative z-10">
             <h3 class="text-3xl font-black tracking-tighter leading-none">{{ loading ? '—' : formatCurrency(summary.unpaid) }}</h3>
             <div class="flex flex-col items-end">
                <span class="text-[9px] font-black text-sky-400 uppercase tracking-widest">Pending</span>
                <span class="text-[10px] font-bold opacity-60">AR Balance</span>
             </div>
          </div>
       </div>

       <!-- Overdue -->
       <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
          <div class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">Jatuh Tempo (Overdue)</div>
          <div class="flex items-end justify-between">
             <h3 class="text-3xl font-black text-rose-600 tracking-tighter leading-none">{{ loading ? '—' : formatCurrency(summary.overdue) }}</h3>
             <div class="p-3 bg-rose-50 text-rose-500 rounded-xl border border-rose-100 group-hover:rotate-12 transition-transform shadow-sm"><i class="pi pi-exclamation-triangle text-lg"></i></div>
          </div>
       </div>

       <!-- Paid -->
       <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
          <div class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">Total Terkoleksi</div>
          <div class="flex items-end justify-between">
             <h3 class="text-3xl font-black text-emerald-600 tracking-tighter leading-none">{{ loading ? '—' : formatCurrency(summary.paid) }}</h3>
             <div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 group-hover:rotate-12 transition-transform shadow-sm"><i class="pi pi-check-circle text-lg"></i></div>
          </div>
       </div>

       <!-- Count -->
       <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group border-dashed">
          <div class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">Volume Invoice</div>
          <div class="flex items-end justify-between">
             <h3 class="text-3xl font-black text-slate-700 tracking-tighter leading-none">{{ loading ? '—' : (summary.count || 0) }}</h3>
             <div class="flex flex-col items-end opacity-40">
                <span class="text-[9px] font-black uppercase tracking-widest text-right">Lembar Faktur</span>
                <span class="text-[10px] font-bold">Total Docs</span>
             </div>
          </div>
       </div>
    </div>

    <!-- Main Matrix Ledger (High-Density Grid) -->
    <div class="mx-6 mb-12 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm overflow-hidden animate-fade-in-up">
      
      <!-- Ledger Control Bar -->
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-sky-200/20 rounded-full blur-3xl"></div>
        
        <div class="relative flex items-center gap-4">
           <div class="w-12 h-12 rounded-2xl bg-sky-600 flex items-center justify-center text-white shadow-xl transition-transform hover:rotate-6 shadow-sky-100"><i class="pi pi-receipt text-xl"></i></div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Log Penagihan & Arus Kas Sewa</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono italic">Central Financial Leasing Ledger</p>
           </div>
        </div>

        <div class="relative flex items-center gap-4">
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <InputText v-model="q" placeholder="Cari Faktur / Customer..." class="border-none bg-transparent text-[10px] h-9 w-48 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" @keyup.enter="load" />
          </div>

          <select v-model="statusFilter" class="h-11 rounded-2xl border-slate-200 px-4 text-[9px] font-black uppercase tracking-widest text-slate-600 focus:border-sky-500 outline-none bg-white shadow-sm transition-all" @change="load">
            <option value="">Semua Status</option>
            <option value="UNPAID">Belum Lunas (UNPAID)</option>
            <option value="PAID">Lunas (PAID)</option>
            <option value="OVERDUE">Jatuh Tempo (OVERDUE)</option>
            <option value="CANCELLED">Dibatalkan (CANCELLED)</option>
          </select>
          
          <Button icon="pi pi-filter" severity="secondary" text rounded class="h-10 w-10 text-slate-400 hover:text-sky-600 bg-white border shadow-sm" />
        </div>
      </div>

      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-sm">
          <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-[280px]">Faktur & Entitas Penyewa</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center">Periode Sewa</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center">Batas Tempo</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-right">Nominal Tagihan</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-40">Status Bayar</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-40 border-l border-slate-50">Opsi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-if="loading">
              <td colspan="6" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-sky-500 opacity-20"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-sky-600">Sinkronisasi data faktur...</div>
              </td>
            </tr>
            
            <tr v-for="t in billings" v-else :key="t.id" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent hover:border-l-sky-400">
              <td class="px-8 py-6 align-middle">
                <div class="flex items-center gap-4">
                   <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-inner group-hover:scale-110 transition-transform">
                      <i class="pi pi-receipt text-lg"></i>
                   </div>
                   <div>
                      <div class="font-mono text-[11px] font-black text-slate-500 tracking-tight group-hover:text-sky-700 transition-colors uppercase cursor-pointer" @click="openEdit(t)">
                         {{ t.billingNo }}
                      </div>
                      <div class="mt-1 flex items-center gap-2">
                        <div class="h-1.5 w-1.5 rounded-full bg-sky-400"></div>
                        <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest truncate max-w-[140px]">{{ t.customer?.name || 'Customer' }}</span>
                      </div>
                   </div>
                </div>
              </td>
              
              <td class="px-6 py-6 align-middle border-l border-slate-50 text-center">
                 <div class="inline-flex items-center gap-3 bg-white border border-slate-100 rounded-xl p-2 shadow-sm group-hover:border-sky-100 transition-all">
                    <div class="text-[10px] font-black text-slate-600 tracking-tighter">
                      {{ formatDate(t.periodStart) }}
                    </div>
                    <i class="pi pi-arrow-right text-[8px] text-slate-200"></i>
                    <div class="text-[10px] font-black text-slate-600 tracking-tighter">
                      {{ formatDate(t.periodEnd) }}
                    </div>
                 </div>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50 text-center">
                 <div :class="['text-[11px] font-black uppercase tracking-tighter px-3 py-1 rounded-lg border shadow-sm', isOverdue(t.dueDate, t.status) ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-slate-50 border-slate-100 text-slate-500']">
                    {{ formatDate(t.dueDate) }}
                 </div>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50 text-right">
                <div class="font-black text-slate-800 text-sm tabular-nums tracking-tighter group-hover:text-sky-600 transition-colors">Rp {{ formatNumber(t.totalAmount) }}</div>
                <div class="text-[8px] font-black text-slate-300 font-mono mt-0.5 uppercase tracking-widest">Base Amount</div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50 bg-slate-50/30 group-hover:bg-slate-100/50 transition-colors">
                <span :class="['inline-flex rounded-full px-4 py-1.5 text-[8px] font-black tracking-[0.2em] border shadow-sm uppercase shadow-sm group-hover:scale-105 transition-all outline-none']" :style="badgeStyle(t.status, isOverdue(t.dueDate, t.status))">
                  {{ isOverdue(t.dueDate, t.status) ? 'TERLAMBAT' : getStatusLabel(t.status) }}
                </span>
              </td>
              
              <td class="px-8 py-6 align-middle text-right border-l border-slate-50">
                <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                  <Button v-if="canManage" icon="pi pi-pencil" rounded text @click="openEdit(t)" class="h-10 w-10 text-sky-600 hover:bg-sky-50" />
                  <Button icon="pi pi-print" rounded text class="h-10 w-10 text-slate-400 hover:text-sky-600 transition-all" />
                </div>
              </td>
            </tr>

            <tr v-if="!loading && billings.length === 0">
              <td colspan="6" class="py-32 text-center text-slate-500">
                 <div class="text-6xl mb-4 opacity-10">💰</div>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Matrix penagihan kosong. Belum ada data faktur yang diterbitkan.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ═══════════════════════════════════ CREATE/EDIT BILLING DIALOG ══════════════════════════════════ -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="relative w-full max-w-4xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-sky-900">
        <!-- Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-sky-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-16 h-16 rounded-[1.5rem] bg-sky-600 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0 shadow-sky-100">
               <i class="pi pi-receipt text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">{{ editingId ? 'Revisi' : 'Draft' }} <span class="text-sky-600 italic text-2xl">Penagihan Sewa</span></h3>
                 <span v-if="form.billingNo" class="inline-flex rounded-xl px-4 py-1.5 text-[9px] font-black tracking-[0.2em] bg-sky-100 text-sky-700 border border-sky-200 uppercase shadow-sm">{{ form.billingNo }}</span>
              </div>
              <p class="text-[10px] font-black text-slate-400 font-mono uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-sky-500">Invoice Generation & Financial Reconciliation</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-sky-50 h-12 w-12" />
        </div>

        <div class="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar bg-slate-50/30 pb-32">
          <!-- Sec 1: Source Document -->
          <div class="space-y-8">
            <div class="flex items-center gap-4">
               <div class="w-10 h-10 rounded-2xl bg-sky-600 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-sky-100">1</div>
               <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-sky-400">Referensi Kontrak & Target Dokumen</h4>
            </div>
            
            <div class="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm space-y-6">
              <div class="space-y-2">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Pilih Kontrak Sewa Induk (Master Contract)</label>
                 <select v-model="form.contractId" :disabled="!!editingId" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-sm font-black text-slate-800 outline-none focus:border-sky-500 focus:bg-white transition-all appearance-none" @change="autoFillContract">
                    <option value="">-- Hubungkan ke Kontrak Aktif --</option>
                    <option v-for="c in activeContracts" :key="c.id" :value="c.id">{{ c.contractNo }} - {{ c.customer?.name }}</option>
                 </select>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="space-y-2">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Nomor Faktur (Billing No)</label>
                  <input type="text" v-model="form.billingNo" :disabled="!!editingId" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-sm font-black text-slate-500 outline-none font-mono" placeholder="Otomatis" />
                </div>
                <div class="space-y-2">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Status Pembayaran Faktur</label>
                  <select v-model="form.status" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-100 text-sm font-black text-slate-800 outline-none focus:border-sky-500 focus:bg-white transition-all shadow-sm">
                    <option value="UNPAID">BELUM LUNAS (Unpaid)</option>
                    <option value="PAID">LUNAS (Paid)</option>
                    <option value="OVERDUE">JATUH TEMPO (Overdue)</option>
                    <option value="CANCELLED">DIBATALKAN (Cancelled)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Sec 2: Period & Fiscal -->
          <div class="space-y-8">
            <div class="flex items-center gap-4">
               <div class="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-emerald-100">2</div>
               <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-sky-400">Parameter Waktu & Komersial</h4>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div class="bg-slate-900 border-t-8 border-t-sky-500 text-white rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden group">
                  <p class="text-[9px] font-black text-sky-400 uppercase tracking-widest mb-4">Nominal Penagihan (Billing Amount)</p>
                  <div class="flex items-center gap-3">
                    <span class="text-xs font-black opacity-40">RP</span>
                    <input type="number" v-model="form.amount" class="bg-transparent border-none text-3xl font-black text-white focus:ring-0 outline-none w-full tabular-nums" />
                  </div>
                  <p class="text-[9px] font-bold opacity-30 mt-3 italic">*Nilai dasar sebelum pajak / disesuaikan dengan rate kontrak.</p>
               </div>

               <div class="bg-rose-950 border-t-8 border-t-rose-500 text-white rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden group">
                  <p class="text-[9px] font-black text-rose-400 uppercase tracking-widest mb-4">Batas Akhir Pelunasan (Due Date)</p>
                  <div class="flex items-center gap-3">
                    <input type="date" v-model="form.dueDate" class="bg-transparent border-none text-2xl font-black text-white focus:ring-0 outline-none w-full uppercase" />
                  </div>
                  <div class="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                     <span class="text-[10px] font-bold opacity-60 italic">Kolektabilitas Penagihan</span>
                     <i class="pi pi-calendar-times text-rose-400"></i>
                  </div>
               </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
               <div class="space-y-2">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Mulai Periode Sewa</label>
                 <input type="date" v-model="form.periodStart" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-sm font-black text-slate-700 outline-none focus:border-sky-500 focus:bg-white transition-all shadow-inner" />
               </div>
               <div class="space-y-2">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Akhir Periode Sewa</label>
                 <input type="date" v-model="form.periodEnd" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-sm font-black text-slate-700 outline-none focus:border-sky-500 focus:bg-white transition-all shadow-inner" />
               </div>
            </div>
          </div>

          <!-- Sec 3: Narrative -->
          <div class="space-y-4">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Catatan Keuangan & Rekonsiliasi Faktur</label>
            <textarea v-model="form.notes" rows="4" class="w-full p-4 rounded-[2rem] bg-slate-50 border-2 border-slate-50 text-sm font-medium text-slate-700 outline-none focus:border-sky-500 focus:bg-white transition-all shadow-inner" placeholder="Tuliskan keterangan tambahan untuk bagian finance atau detail pembayaran..."></textarea>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-8 border-t border-slate-100 bg-white flex justify-end gap-3 relative z-20 shadow-[0_-20px_40px_rgba(0,0,0,0.02)]">
           <Button label="Batalkan" severity="secondary" text @click="dialogOpen = false" class="h-14 px-8 font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-600" />
           <Button :label="editingId ? 'Simpan Pembaruan Faktur' : 'Terbitkan & Aktivasi Invoice'" icon="pi pi-check" :loading="saving" :disabled="!form.contractId" @click="save"
             class="h-14 px-10 rounded-[1.25rem] bg-sky-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-sky-100 hover:scale-[1.02] active:scale-95 transition-all" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useApi } from '~/composables/useApi';
import { useAuthStore } from '~/stores/auth';

const api = useApi();
const auth = useAuthStore();

const canRead = auth.hasPermission('rental.billing.read') || true;
const canManage = auth.hasPermission('rental.billing.manage') || true;

const q = ref('');
const statusFilter = ref('');
const loading = ref(false);
const saving = ref(false);

const error = ref('');
const success = ref('');
const showMsg = (refVar: any, msg: string) => { refVar.value = msg; setTimeout(()=> { refVar.value = null; }, 3000); };

const dialogOpen = ref(false);
const editingId = ref<string | null>(null);
const billings = ref<any[]>([]);
const summary = ref<any>({});
const activeContracts = ref<any[]>([]);

const form = ref({
  billingNo: '',
  contractId: '',
  periodStart: '',
  periodEnd: '',
  dueDate: '',
  amount: 0,
  status: 'UNPAID',
  notes: '',
});

function pad(n: number) { return String(n).padStart(2, '0'); }
function formatDate(iso: string) {
  if (!iso) return '-';
  const d = new Date(iso);
  const m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${pad(d.getDate())} ${m[d.getMonth()]} ${d.getFullYear()}`;
}
function formatNumber(num: any) {
  if (!num) return '0';
  return Number(num).toLocaleString('id-ID');
}
function formatCurrency(num: any) {
  if (!num) return 'Rp 0';
  if (num >= 1000000) return `Rp ${(num/1000000).toFixed(1)} M`;
  return `Rp ${Number(num).toLocaleString('id-ID')}`;
}
function isOverdue(dueDate: string, status: string) {
  if (status === 'PAID' || status === 'CANCELLED') return false;
  if (!dueDate) return false;
  return new Date(dueDate).getTime() < new Date().getTime();
}

const statusColor = (status: string) => {
   if (status === 'PAID') return '#10b981'; // emerald
   if (status === 'UNPAID') return '#eab308'; // yellow
   if (status === 'OVERDUE') return '#f43f5e'; // rose
   return '#94a3b8'; // cancelled
};

function badgeStyle(status: string, overrideOverdue: boolean) {
  if (overrideOverdue) return { backgroundColor: '#fff1f2', color: '#be123c', borderColor: '#fecdd3' };
  const map: Record<string, any> = {
    PAID: { backgroundColor: '#ecfdf5', color: '#047857', borderColor: '#a7f3d0' },
    UNPAID: { backgroundColor: '#fefce8', color: '#a16207', borderColor: '#fef08a' },
    OVERDUE: { backgroundColor: '#fff1f2', color: '#be123c', borderColor: '#fecdd3' },
    CANCELLED: { backgroundColor: '#f8fafc', color: '#475569', borderColor: '#cbd5e1' }
  };
  return map[status] || map['UNPAID'];
}

const STATUS_LABEL_MAP: Record<string, string> = {
  UNPAID: 'BELUM LUNAS',
  PAID: 'LUNAS',
  OVERDUE: 'JATUH TEMPO',
  CANCELLED: 'DIBATALKAN',
};
const getStatusLabel = (s: string) => STATUS_LABEL_MAP[s] || s;

async function load() {
  loading.value = true;
  try {
    const params: any = {};
    if (q.value) params.search = q.value;
    if (statusFilter.value) params.status = statusFilter.value;
    const { data } = await api.get('/rental/billing', { params });
    billings.value = data.data || [];
    summary.value = data.summary || {};
  } catch (e: any) {
    showMsg(error, e.message);
  } finally {
    loading.value = false;
  }
}

async function loadLookups() {
  try {
    const { data } = await api.get('/rental/billing/contracts'); 
    activeContracts.value = data.data || [];
  } catch (e) {}
}

function autoFillContract() {
   if (!form.value.contractId || form.value.amount > 0) return;
   const target = activeContracts.value.find(x => x.id === form.value.contractId);
   if (target) {
       form.value.amount = parseFloat(target.rentalRate);
   }
}

function openCreate() {
  editingId.value = null;
  form.value = {
     billingNo: '', contractId: '', periodStart: new Date().toISOString().slice(0, 10), periodEnd: new Date().toISOString().slice(0, 10),
     dueDate: new Date().toISOString().slice(0, 10), amount: 0, status: 'UNPAID', notes: ''
  };
  if (activeContracts.value.length === 0) loadLookups();
  dialogOpen.value = true;
}

function openEdit(t: any) {
  editingId.value = t.id;
  form.value = {
    billingNo: t.billingNo || '',
    contractId: t.contractId || '',
    periodStart: t.periodStart?.slice(0, 10) || '',
    periodEnd: t.periodEnd?.slice(0, 10) || '',
    dueDate: t.dueDate?.slice(0, 10) || '',
    amount: parseFloat(t.amount || '0'),
    status: t.status || 'UNPAID',
    notes: t.notes || '',
  };
  if (activeContracts.value.length === 0) loadLookups();
  dialogOpen.value = true;
}

async function save() {
  saving.value = true;
  try {
    const payload: any = { ...form.value, amount: Number(form.value.amount) };
    if (!payload.billingNo) delete payload.billingNo;

    if (editingId.value) {
      await api.patch(`/rental/billing/${editingId.value}`, payload);
      showMsg(success, 'Invoice berhasil diperbarui!');
    } else {
      await api.post('/rental/billing', payload);
      showMsg(success, 'Draft Invoice berhasil diterbitkan!');
    }
    dialogOpen.value = false;
    load();
  } catch (e: any) {
    showMsg(error, e.response?.data?.message || 'Gagal menyimpan invoice');
  } finally {
    saving.value = false;
  }
}

onMounted(() => {
  if (canRead) load();
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
