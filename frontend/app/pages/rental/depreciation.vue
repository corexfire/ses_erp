<template>
  <div class="space-y-6">
    <!-- ═══════════════════════════════════ HEADER (Premium Accounting Engine) ══════════════════════════════════ -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 overflow-hidden relative p-8 m-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500 group">
      <div class="absolute top-0 right-0 w-64 h-64 bg-violet-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-violet-100/50"></div>
      
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-violet-800 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-violet-100">Akuntansi Aktiva Tetap</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-violet-600 uppercase tracking-widest">Asset Depreciation Matrix</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase tracking-tighter">Depreciation <span class="text-violet-600 italic font-medium">Matrix</span></h1>
        <p class="text-slate-500 text-sm font-medium max-w-2xl leading-relaxed mt-3 uppercase tracking-tight opacity-70">Monitor secara akurat penyusutan nilai aset bulan-ke-bulan, akumulasi depresiasi, dan nilai buku bersih perusahaan secara real-time.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="load" :loading="loading" class="h-12 w-12 text-slate-400 hover:text-violet-600 transition-all shadow-sm bg-white" />
      </div>
    </div>

    <!-- Component Alert -->
    <div v-if="success" class="bg-emerald-50 text-emerald-700 p-3 rounded-xl border border-emerald-200 text-sm font-bold flex items-center gap-2 animate-fade-in-up">
      <i class="pi pi-check-circle text-lg"></i> {{ success }}
    </div>
    <div v-if="error" class="bg-rose-50 text-rose-700 p-3 rounded-xl border border-rose-200 text-sm font-bold flex items-center gap-2 animate-fade-in-up">
      <i class="pi pi-exclamation-triangle text-lg"></i> {{ error }}
    </div>

    <!-- Asset Telemetry (High-Contrast Violet/Emerald) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mx-6 mb-8 animate-fade-in-up">
       <!-- Active Assets -->
       <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
          <div class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">Total Aset Aktif</div>
          <div class="flex items-end justify-between">
             <h3 class="text-3xl font-black text-slate-800 tracking-tighter leading-none">{{ loading ? '—' : (summary.totalAssets || 0) }}</h3>
             <div class="p-3 bg-violet-50 text-violet-500 rounded-xl border border-violet-100 group-hover:rotate-12 transition-transform shadow-sm"><i class="pi pi-box text-lg"></i></div>
          </div>
       </div>

       <!-- Capital Value -->
       <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
          <div class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">Modal Aset / Harga Beli</div>
          <div class="flex items-end justify-between">
             <h3 class="text-3xl font-black text-emerald-600 tracking-tighter leading-none">{{ loading ? '—' : formatCurrency(summary.totalCapital) }}</h3>
             <div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 group-hover:rotate-12 transition-transform shadow-sm"><i class="pi pi-money-bill text-lg"></i></div>
          </div>
       </div>

       <!-- Net Book Value -->
       <div class="p-4 rounded-2xl bg-violet-950 text-white shadow-xl shadow-violet-200 flex flex-col justify-between transition-all hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden group">
          <div class="absolute right-0 bottom-0 opacity-10 -mr-4 -mb-4 group-hover:scale-110 transition-transform">
             <i class="pi pi-database text-9xl"></i>
          </div>
          <div class="text-[10px] font-black uppercase text-violet-400 tracking-[0.2em] mb-4">Nilai Buku Bersih (NBV)</div>
          <div class="flex items-end justify-between relative z-10">
             <h3 class="text-2xl font-black tracking-tighter leading-none">{{ loading ? '—' : formatCurrency(summary.netBookValue) }}</h3>
             <div class="flex flex-col items-end">
                <span class="text-[9px] font-black text-violet-400 uppercase tracking-widest">Enterprise Capital</span>
                <span class="text-[10px] font-bold opacity-60">Company Net Value</span>
             </div>
          </div>
       </div>
    </div>

    <!-- Main Fiscal Matrix (High-Density Grid) -->
    <div class="mx-6 mb-12 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm overflow-hidden animate-fade-in-up">
      
      <!-- Ledger Control Bar -->
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-violet-200/20 rounded-full blur-3xl"></div>
        
        <div class="relative flex items-center gap-4">
           <div class="w-12 h-12 rounded-2xl bg-violet-800 flex items-center justify-center text-white shadow-xl transition-transform hover:rotate-6 shadow-violet-200"><i class="pi pi-chart-line text-xl"></i></div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Log Penyusutan & Nilai Buku Matriks</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono italic">Central Financial Equity Ledger</p>
           </div>
        </div>

        <div class="relative flex items-center gap-4">
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <InputText v-model="q" placeholder="Cari Kode Aset / Nama..." class="border-none bg-transparent text-[10px] h-9 w-48 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" @keyup.enter="load" />
          </div>
          
          <Button icon="pi pi-refresh" severity="secondary" text rounded @click="load" class="h-10 w-10 text-slate-400 hover:text-violet-600 bg-white border shadow-sm" />
        </div>
      </div>

      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-sm">
          <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-[280px]">Target Aset Tetap</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-right">Modal Awal (Purchase)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-right">Akumulasi Susut</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-right">Nilai Buku (NBV)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center">Metode & Usia</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-40 border-l border-slate-50">Opsi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-if="loading">
              <td colspan="6" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-violet-500 opacity-20"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-violet-600">Sinkronisasi data ekuitas aset...</div>
              </td>
            </tr>
            
            <tr v-for="a in assets" v-else :key="a.id" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent hover:border-l-violet-400">
              <td class="px-8 py-6 align-middle">
                <div class="flex items-center gap-4">
                   <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-inner group-hover:scale-110 transition-transform">
                      <i class="pi pi-box text-lg"></i>
                   </div>
                   <div>
                      <div class="font-mono text-[11px] font-black text-slate-500 tracking-tight group-hover:text-violet-700 transition-colors uppercase cursor-pointer" @click="openView(a)">
                         {{ a.assetNo }}
                      </div>
                      <div class="mt-1 flex items-center gap-2">
                        <div class="h-1.5 w-1.5 rounded-full" :style="{ backgroundColor: getHealthColor(a.purchaseCost, a.accumulatedDepreciation) }"></div>
                        <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest truncate max-w-[140px]">{{ a.name }}</span>
                      </div>
                   </div>
                </div>
              </td>
              
              <td class="px-6 py-6 align-middle border-l border-slate-50 text-right bg-slate-50/30">
                 <div class="text-[8px] font-black text-slate-300 font-mono mb-1 uppercase tracking-widest">Buy: {{ formatDate(a.purchaseDate) }}</div>
                 <div class="font-black text-slate-800 text-sm tabular-nums tracking-tighter">Rp {{ formatNumber(a.purchaseCost) }}</div>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50 text-right">
                 <div class="font-black text-rose-600 text-sm tabular-nums tracking-tighter">({{ formatNumber(a.accumulatedDepreciation) }})</div>
                 <div class="text-[8px] font-black text-slate-300 font-mono mt-0.5 uppercase tracking-widest italic">Acc. Depr</div>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50 text-right bg-emerald-50/30">
                 <div class="font-black text-emerald-700 text-sm tabular-nums tracking-tighter group-hover:scale-110 transition-transform origin-right">Rp {{ formatNumber(a.netBookValue) }}</div>
                 <div class="text-[8px] font-black text-emerald-600/40 font-mono mt-0.5 uppercase tracking-widest">Net Value</div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50">
                 <div class="flex flex-col items-center gap-1.5">
                    <span class="inline-flex rounded-full px-3 py-1 text-[8px] font-black tracking-widest bg-slate-100 text-slate-500 border border-slate-200 uppercase shadow-sm">{{ a.depreciationMethod.replace('_', ' ') }}</span>
                    <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">{{ a.usefulLife }} Bulan</span>
                 </div>
              </td>
              
              <td class="px-8 py-6 align-middle text-right border-l border-slate-50">
                <div class="flex flex-col items-end gap-1.5 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                  <Button v-if="canRead" label="RIWAYAT" icon="pi pi-history" size="small" rounded text @click="openView(a)" class="text-[9px] font-black text-violet-600 hover:bg-violet-50 px-3" />
                  <Button v-if="canManage && Number(a.netBookValue) > 0" label="POST JURNAL" icon="pi pi-plus-circle" size="small" rounded text @click="openCreateManual(a)" class="text-[9px] font-black text-slate-400 hover:text-rose-600 hover:bg-rose-50 px-3" />
                </div>
              </td>
            </tr>

            <tr v-if="!loading && assets.length === 0">
              <td colspan="6" class="py-32 text-center text-slate-500">
                 <div class="text-6xl mb-4 opacity-10">📉</div>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Matrix penyusutan kosong. Tidak ada aset terdaftar.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


    <!-- ═══════════════════════════════════ DEPRECIATION HISTORY & POST DIALOG ══════════════════════════════════ -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="relative w-full max-w-4xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-violet-900">
        <!-- Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-violet-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-16 h-16 rounded-[1.5rem] bg-violet-800 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0 shadow-violet-200">
               <i :class="['pi text-3xl font-black', isManualForm ? 'pi-plus-circle' : 'pi-history']"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">{{ isManualForm ? 'Post Jurnal' : 'Riwayat' }} <span class="text-violet-600 italic text-2xl">Depresiasi</span></h3>
                 <span v-if="selectedAsset" class="inline-flex rounded-xl px-4 py-1.5 text-[9px] font-black tracking-[0.2em] bg-violet-100 text-violet-700 border border-violet-200 uppercase shadow-sm">{{ selectedAsset.assetNo }}</span>
              </div>
              <p class="text-[10px] font-black text-slate-400 font-mono uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-violet-500">Asset Valuation & Equity Reconciliation</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-violet-50 h-12 w-12" />
        </div>

        <div class="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar bg-slate-50/30 pb-32">
          <!-- Asset Context Card -->
          <div v-if="selectedAsset" class="bg-slate-900 border-t-8 border-t-violet-500 text-white rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
             <i class="pi pi-box absolute -right-8 -top-8 text-9xl opacity-10 group-hover:scale-110 transition-transform"></i>
             <div class="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                   <div class="text-[9px] font-black uppercase text-violet-400 tracking-[0.2em] mb-2 font-mono">Asset Identification</div>
                   <h4 class="text-2xl font-black tracking-tight mb-2">{{ selectedAsset.name }}</h4>
                   <div class="flex items-center gap-2">
                      <span class="text-[10px] bg-white/10 px-3 py-1 rounded-full font-black uppercase tracking-widest border border-white/10">{{ selectedAsset.depreciationMethod.replace('_', ' ') }}</span>
                      <span class="text-[10px] font-bold text-slate-400">Usia Ekonomis: {{ selectedAsset.usefulLife }} Bln</span>
                   </div>
                </div>
                <div class="flex flex-col items-end justify-center">
                   <div class="text-[9px] font-black uppercase text-emerald-400 tracking-[0.2em] mb-2 text-right">Nilai Buku Saat Ini (NBV)</div>
                   <div class="text-4xl font-black tabular-nums tracking-tighter text-emerald-400">Rp {{ formatNumber(selectedAsset.netBookValue) }}</div>
                   <div class="mt-2 text-[10px] font-bold text-slate-400 italic">Modal Awal: Rp {{ formatNumber(selectedAsset.purchaseCost) }}</div>
                </div>
             </div>
          </div>

          <!-- Mode: History Timelogs -->
          <div v-if="!isManualForm" class="space-y-8">
             <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                   <div class="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-indigo-100"><i class="pi pi-history"></i></div>
                   <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-violet-400">Lini Masa Penyusutan Finansial</h4>
                </div>
                <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 py-2 border border-slate-200 rounded-full italic bg-white">{{ historyLogs.length }} Entri Jurnal</div>
             </div>

             <div v-if="loadingHistory" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-violet-500 opacity-20"></i>
             </div>
             
             <div v-else-if="historyLogs.length === 0" class="py-32 text-center bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
                 <div class="text-6xl mb-4 opacity-10">📁</div>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Belum ada riwayat jurnal untuk aset ini.</div>
             </div>

             <div v-else class="grid grid-cols-1 gap-4">
                <div v-for="(h, i) in historyLogs" :key="h.id" class="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm flex items-center justify-between group transition-all hover:border-violet-200 hover:shadow-xl hover:-translate-y-1">
                   <div class="flex items-center gap-4">
                      <div class="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 font-mono text-xl font-black group-hover:bg-violet-50 group-hover:text-violet-600 transition-colors">
                         {{ historyLogs.length - i }}
                      </div>
                      <div>
                         <div class="text-sm font-black text-slate-800 tracking-tight">{{ formatDate(h.periodDate) }}</div>
                         <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 border-l-2 border-violet-500 pl-3 leading-none">{{ h.notes || 'Sistem Depresiasi Otomatis' }}</div>
                      </div>
                   </div>
                   <div class="text-right">
                      <div class="text-lg font-black text-rose-600 tabular-nums">- {{ formatNumber(h.depreciationAmount) }}</div>
                      <div class="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-1 font-mono">Accumulated: {{ formatNumber(h.accumulatedAmount) }}</div>
                   </div>
                </div>
             </div>
          </div>

          <!-- Mode: Manual Post Form -->
          <div v-else class="space-y-10">
             <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-2xl bg-rose-600 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-rose-100"><i class="pi pi-plus-circle"></i></div>
                <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-violet-400">Penerbitan Jurnal Manual (Ad-hoc)</h4>
             </div>

             <div class="bg-amber-50 border-2 border-amber-100 rounded-[2rem] p-8 flex items-start gap-5">
                <i class="pi pi-info-circle text-2xl text-amber-500 animate-pulse"></i>
                <div class="text-[11px] font-black text-amber-900 leading-relaxed uppercase">
                   PERHATIAN: Form ini mengizinkan penerbitan jurnal manual secara ad-hoc. 
                   Sistem akan menumpuk nilai akumulasi secara matematis. Pastikan nilai pemotongan 
                   tidak melampaui sisa Net Book Value aset yang bersangkutan.
                </div>
             </div>

             <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div class="space-y-3">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Periode Jurnal Depresiasi</label>
                   <input type="date" v-model="form.periodDate" class="w-full h-16 px-6 rounded-2xl bg-white border-2 border-slate-100 text-sm font-black text-slate-800 outline-none focus:border-violet-500 transition-all shadow-sm" />
                </div>
                <div class="space-y-3 relative">
                   <label class="text-[10px] font-black text-rose-600 uppercase tracking-widest px-1">Nominal Pemotongan (IDR)</label>
                   <div class="relative">
                      <span class="absolute left-6 top-1/2 -translate-y-1/2 text-xs font-black text-slate-300">RP</span>
                      <input type="number" v-model="form.depreciationAmount" class="w-full h-16 pl-14 pr-6 rounded-2xl bg-white border-2 border-rose-100 text-xl font-black text-rose-600 outline-none focus:border-rose-500 transition-all shadow-xl" placeholder="0" />
                   </div>
                </div>
             </div>

             <div class="space-y-3">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Catatan Finansial / Alasan Koreksi Nilai</label>
                <textarea v-model="form.notes" rows="4" class="w-full p-8 rounded-[2.5rem] bg-white border-2 border-slate-100 text-sm font-medium text-slate-700 outline-none focus:border-violet-500 transition-all shadow-sm" placeholder="Misal: Manual Override / Kerusakan Berat..."></textarea>
             </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-8 border-t border-slate-100 bg-white flex justify-end gap-3 relative z-20 shadow-[0_-20px_40px_rgba(0,0,0,0.02)]">
           <Button label="Tutup Jendela" severity="secondary" text @click="dialogOpen = false" class="h-14 px-8 font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-600" />
           <Button v-if="isManualForm" label="Post Jurnal Sekarang" icon="pi pi-check" :loading="saving" :disabled="form.depreciationAmount <= 0" @click="saveManual"
             class="h-14 px-10 rounded-[1.25rem] bg-violet-800 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-violet-200 hover:scale-[1.02] active:scale-95 transition-all" />
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

const canRead = auth.hasPermission('rental.depreciation.read') || true;
const canManage = auth.hasPermission('rental.depreciation.manage') || true;

const q = ref('');
const loading = ref(false);
const saving = ref(false);
const loadingHistory = ref(false);

const error = ref('');
const success = ref('');
const showMsg = (refVar: any, msg: string) => { refVar.value = msg; setTimeout(()=> { refVar.value = null; }, 3000); };

const dialogOpen = ref(false);
const isManualForm = ref(false);
const assets = ref<any[]>([]);
const historyLogs = ref<any[]>([]);
const summary = ref<any>({});
const selectedAsset = ref<any>(null);

const form = ref({
  periodDate: '',
  depreciationAmount: 0,
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
  if (num >= 1000000000) return `Rp ${(num/1000000000).toFixed(2)} Milyar`;
  if (num >= 1000000) return `Rp ${(num/1000000).toFixed(1)} Juta`;
  return `Rp ${Number(num).toLocaleString('id-ID')}`;
}

const getHealthColor = (capital: any, accumulated: any) => {
   const cap = Number(capital) || 1;
   const acc = Number(accumulated) || 0;
   const pct = (acc / cap) * 100;
   
   if (pct > 95) return '#f43f5e'; // Almost fully depreciated (Rose)
   if (pct > 70) return '#f59e0b'; // Amber
   if (pct > 30) return '#3b82f6'; // Blue
   return '#10b981'; // Emerald (Fresh Asset)
};

async function load() {
  loading.value = true;
  try {
    const params: any = {};
    if (q.value) params.search = q.value;
    const { data } = await api.get('/rental/depreciation', { params });
    assets.value = data.data || [];
    summary.value = data.summary || {};
  } catch (e: any) {
    showMsg(error, e.message);
  } finally {
    loading.value = false;
  }
}

async function loadHistory(id: string) {
  loadingHistory.value = true;
  historyLogs.value = [];
  try {
    const { data } = await api.get(`/rental/depreciation/${id}/history`); 
    historyLogs.value = data.data || [];
  } catch (e) {
    console.error(e);
  } finally {
    loadingHistory.value = false;
  }
}

function openView(asset: any) {
  selectedAsset.value = asset;
  isManualForm.value = false;
  dialogOpen.value = true;
  loadHistory(asset.id);
}

function openCreateManual(asset: any) {
  selectedAsset.value = asset;
  isManualForm.value = true;
  form.value = {
     periodDate: new Date().toISOString().slice(0, 10),
     depreciationAmount: 0,
     notes: ''
  };
  dialogOpen.value = true;
}

async function saveManual() {
  saving.value = true;
  try {
    const payload = { 
       assetId: selectedAsset.value.id,
       periodDate: new Date(form.value.periodDate).toISOString(),
       depreciationAmount: Number(form.value.depreciationAmount),
       notes: form.value.notes
    };
    await api.post('/rental/depreciation', payload);
    showMsg(success, 'Jurnal Depresiasi manual berhasil diterbitkan!');
    dialogOpen.value = false;
    load();
  } catch (e: any) {
    showMsg(error, e.response?.data?.message || 'Gagal menerbitkan jurnal depresiasi');
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
