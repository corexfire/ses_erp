<template>
  <div class="space-y-6">
    <!-- Header Premium -->
    <div class="rounded-xl border bg-white p-6 shadow-sm border-l-4 border-l-violet-600 relative overflow-hidden">
      <div class="absolute right-[0px] top-[-20px] opacity-[0.03] pointer-events-none">
        <i class="pi pi-chart-pie text-[170px] text-violet-900"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-start gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-chart-line text-violet-600"></i> Asset Depreciation
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium max-w-2xl">
            Sistem akuntansi untuk melihat rekaman jurnal depresiasi / depresiasi bulan-ke-bulan beserta Sisa Nilai Buku (Net Book Value) semua Fixed Asset ERP.
          </div>
        </div>
      </div>
    </div>

    <!-- Component Alert -->
    <div v-if="success" class="bg-emerald-50 text-emerald-700 p-3 rounded-xl border border-emerald-200 text-sm font-bold flex items-center gap-2 animate-fade-in-up">
      <i class="pi pi-check-circle text-lg"></i> {{ success }}
    </div>
    <div v-if="error" class="bg-rose-50 text-rose-700 p-3 rounded-xl border border-rose-200 text-sm font-bold flex items-center gap-2 animate-fade-in-up">
      <i class="pi pi-exclamation-triangle text-lg"></i> {{ error }}
    </div>

    <!-- Quick Metrics -->
    <div class="grid grid-cols-3 gap-4 animate-fade-in-up">
      <div class="bg-white border p-4 rounded-xl shadow-sm hover:border-violet-200 transition">
         <div class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Active Assets</div>
         <div class="text-2xl font-black text-slate-700">{{ summary.totalAssets || 0 }} Fixed Assets</div>
      </div>
      <div class="bg-white border p-4 rounded-xl shadow-sm hover:border-violet-200 transition relative overflow-hidden" style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);">
         <div class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Enterprise Capital / Purchase Value</div>
         <div class="text-2xl font-black text-emerald-700">{{ formatCurrency(summary.totalCapital) }}</div>
      </div>
      <div class="bg-white border text-white p-4 rounded-xl shadow-sm relative overflow-hidden" style="background: linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%);">
         <div class="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-1">Company Net Book Value (NBV)</div>
         <div class="text-2xl font-black">{{ formatCurrency(summary.netBookValue) }}</div>
         <i class="pi pi-database absolute -right-3 -bottom-3 text-5xl opacity-20"></i>
      </div>
    </div>

    <!-- Controls -->
    <div class="bg-white border rounded-xl p-4 shadow-sm flex flex-wrap gap-3 items-center animate-fade-in-up">
      <span class="p-input-icon-left w-72">
         <i class="pi pi-search" />
         <InputText v-model="q" placeholder="Cari Kode Aset / Nama..." class="w-full text-sm h-10" @keyup.enter="load" :disabled="!canRead" />
      </span>
      <Button severity="secondary" size="small" :loading="loading" icon="pi pi-refresh" @click="load" class="h-10 w-10 shrink-0" :disabled="!canRead" />
    </div>

    <!-- TABLE -->
    <div class="rounded-xl border bg-white shadow-sm overflow-hidden animate-fade-in-up">
      <table class="w-full text-sm">
        <thead class="bg-slate-50 text-left text-[11px] text-slate-500 uppercase tracking-widest font-black">
          <tr>
            <th class="px-5 py-3 border-b">Fixed Asset Target</th>
            <th class="px-4 py-3 border-l border-b text-right border-slate-200 bg-slate-100">Capital (Purchase)</th>
            <th class="px-4 py-3 border-l border-b text-right border-slate-200">Accumulated Dep.</th>
            <th class="px-4 py-3 border-l border-b text-right border-emerald-200 bg-emerald-50">Net Book Value</th>
            <th class="px-4 py-3 border-l border-b text-center">Settings</th>
            <th class="px-4 py-3 border-l border-b text-center w-28">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-if="loading">
            <td colspan="6" class="py-16 text-center text-slate-400"><i class="pi pi-spinner pi-spin mr-2 text-violet-500 shadow-sm"></i> Sedang mengambil data akuntansi...</td>
          </tr>
          
          <tr v-for="a in assets" v-else :key="a.id" class="transition hover:bg-slate-50 group border-l-4" :style="{ borderLeftColor: getHealthColor(a.purchaseCost, a.accumulatedDepreciation) }">
            <td class="px-5 py-3 align-top">
              <div class="font-black text-slate-800 text-sm leading-tight cursor-pointer hover:text-violet-600" @click="openView(a)">{{ a.assetNo }}</div>
              <div class="text-[11px] text-slate-500 mt-1 capitalize"><i class="pi pi-box mr-1"></i> {{ a.name }}</div>
              <div class="mt-1 flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase">
                 <span v-if="a._count?.rentalContracts > 0" class="text-cyan-600 bg-cyan-50 border border-cyan-100 px-1 rounded">{{ a._count.rentalContracts }} Leases</span>
                 <span v-if="a._count?.rentalMaintenances > 0" class="text-rose-600 bg-rose-50 border border-rose-100 px-1 rounded">{{ a._count.rentalMaintenances }} Maint</span>
              </div>
            </td>
            
            <td class="px-4 py-3 align-top border-l bg-slate-50 text-right">
               <div class="text-[10px] text-slate-400 mb-0.5"><i class="pi pi-calendar mr-0.5"></i> {{ formatDate(a.purchaseDate) }}</div>
               <div class="text-sm font-black text-slate-700 tabular-nums">{{ formatNumber(a.purchaseCost) }}</div>
            </td>

            <td class="px-4 py-3 align-top border-l text-right">
              <div class="text-sm font-bold text-rose-600 tabular-nums">- {{ formatNumber(a.accumulatedDepreciation) }}</div>
            </td>

             <td class="px-4 py-3 align-top border-l text-right bg-emerald-50/20">
              <div class="text-sm font-black text-emerald-700 tabular-nums border-b border-emerald-200 border-dashed pb-0.5 inline-block">{{ formatNumber(a.netBookValue) }}</div>
            </td>

            <td class="px-4 py-3 align-top border-l text-center">
              <div class="flex flex-col items-center gap-1">
                 <div class="text-[9px] font-black uppercase text-slate-500 bg-slate-100 border px-1.5 py-0.5 rounded">{{ a.depreciationMethod.replace('_', ' ') }}</div>
                 <div class="text-[9px] font-black uppercase text-slate-400 border px-1.5 py-0.5 rounded">{{ a.usefulLife }} Months</div>
              </div>
            </td>
            
            <td class="px-4 py-3 align-top border-l text-center">
              <div class="flex justify-center flex-col gap-1.5 shrink-0 items-center">
                 <Button v-if="canRead" label="History" size="small" outlined class="h-6 text-[10px] text-violet-600 border-violet-200 px-2 py-0 hover:bg-violet-50" @click="openView(a)" />
                 <Button v-if="canManage && Number(a.netBookValue) > 0" label="Sustain Log" size="small" severity="secondary" outlined class="h-6 text-[10px] px-2 py-0 border-slate-200 bg-white" @click="openCreateManual(a)" />
              </div>
            </td>
          </tr>

          <tr v-if="!loading && assets.length === 0">
            <td colspan="6" class="py-12 text-center text-slate-400 italic text-sm font-medium">Berdasarkan filter saat ini, tak ditemukan Fixed Asset terdaftar.</td>
          </tr>
        </tbody>
      </table>
    </div>


    <!-- History / Manual Form Drawer -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm" @click.self="dialogOpen = false">
      <div class="w-full max-w-lg h-full bg-slate-50 shadow-2xl flex flex-col overflow-y-auto animate-slide-in-right">
        
        <div class="p-5 border-b bg-white flex justify-between" style="borderTop: 4px solid #8b5cf6;">
          <div class="text-lg font-black text-slate-800 flex items-center gap-2">
            <i :class="['pi text-violet-500', isManualForm ? 'pi-plus-circle' : 'pi-history']"></i>
            {{ isManualForm ? 'Push Jurnal Penyusutan' : 'Depreciation Timelogs' }}
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-100 w-8 h-8 rounded-full font-bold" @click="dialogOpen = false">✕</button>
        </div>

        <div class="p-6 flex-1 flex flex-col">
          
          <!-- Asset Header Card -->
          <div v-if="selectedAsset" class="bg-gradient-to-br from-violet-900 to-indigo-900 p-4 rounded-xl text-white shadow-md relative overflow-hidden mb-6">
             <i class="pi pi-box absolute -right-4 -top-4 text-8xl opacity-10"></i>
             <div class="relative z-10 flex justify-between items-start">
                <div>
                   <div class="text-[10px] font-black uppercase tracking-widest text-violet-200">{{ selectedAsset.assetNo }}</div>
                   <div class="text-lg font-black">{{ selectedAsset.name }}</div>
                </div>
                <div class="text-right">
                   <div class="text-[10px] font-black uppercase tracking-widest text-violet-200">Taksir Capital</div>
                   <div class="text-sm font-black">{{ formatCurrency(selectedAsset.purchaseCost) }}</div>
                </div>
             </div>
             <div class="relative z-10 flex gap-4 mt-4 border-t border-white/20 pt-3">
                 <div>
                   <div class="text-[9px] font-bold text-violet-300">Accumulated</div>
                   <div class="text-sm font-black text-rose-200">{{ formatCurrency(selectedAsset.accumulatedDepreciation) }}</div>
                 </div>
                 <div>
                   <div class="text-[9px] font-bold text-violet-300">Current Net Book Value</div>
                   <div class="text-sm font-black text-emerald-300">{{ formatCurrency(selectedAsset.netBookValue) }}</div>
                 </div>
             </div>
          </div>

          <!-- History Mode -->
          <div v-if="!isManualForm" class="flex-1">
             <div class="flex justify-between items-center mb-4">
                 <div class="text-sm font-bold text-slate-700">Financial History Book</div>
                 <div class="text-[10px] bg-slate-200 px-2 py-1 rounded text-slate-500 font-bold uppercase">{{ historyLogs.length }} Entries</div>
             </div>
             
             <div v-if="loadingHistory" class="text-center py-10"><i class="pi pi-spinner pi-spin text-slate-400 text-xl"></i></div>
             
             <div v-else-if="historyLogs.length === 0" class="text-center py-10 border border-dashed border-slate-300 rounded-xl bg-white">
                <i class="pi pi-folder-open text-slate-300 text-3xl mb-2"></i>
                <div class="text-sm text-slate-500">Belum ada jurnal depresiasi pada aset ini.</div>
             </div>

             <div v-else class="space-y-3">
                <div v-for="(h, i) in historyLogs" :key="h.id" class="bg-white border rounded-xl p-3 flex shadow-sm relative">
                    <div class="w-10 flex flex-col items-center justify-center border-r border-slate-100 pr-3 mr-3 text-slate-300">
                       <div class="text-[10px] font-black uppercase">Prd</div>
                       <div class="text-lg font-black">{{ historyLogs.length - i }}</div>
                    </div>
                    <div class="flex-1">
                       <div class="text-xs font-black text-slate-700">{{ formatDate(h.periodDate) }}</div>
                       <div class="text-[10px] text-slate-500 italic line-clamp-1 border-l-2 border-violet-200 pl-1.5 mt-1">{{ h.notes || 'Sistem Depresiasi Otomatis' }}</div>
                    </div>
                    <div class="text-right flex flex-col justify-center">
                       <div class="text-xs font-black text-rose-600">- {{ formatNumber(h.depreciationAmount) }}</div>
                       <div class="text-[9px] uppercase font-bold text-slate-400 mt-1">Acc: {{ formatNumber(h.accumulatedAmount) }}</div>
                    </div>
                </div>
             </div>
          </div>

          <!-- Manual Post Form -->
          <div v-else class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
             <div class="bg-amber-50 text-amber-700 p-3 rounded text-[11px] leading-tight font-medium border border-amber-200">
                 <i class="pi pi-info-circle mb-1"></i> Form ini mengizinkan penerbitan jurnal manual secara _ad-hoc_. Sistem akan menumpuk nilai akumulasi secara matematis. Pastikan nilai pemotongan tidak melampaui sisa *Net Book Value*.
             </div>

             <div class="space-y-1.5">
               <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Periode Potongan/Jurnal</label>
               <input type="date" v-model="form.periodDate" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-700 outline-none focus:border-violet-500 bg-slate-50" />
             </div>
             
             <div class="space-y-1.5">
               <label class="text-[10px] font-bold text-rose-600 uppercase tracking-widest flex justify-between">
                  <span>Nominal Deflasiasi (IDR)</span>
                  <span class="text-slate-400 font-medium">Sisa Hak: {{ formatCurrency(selectedAsset?.netBookValue) }}</span>
               </label>
               <input type="number" v-model="form.depreciationAmount" class="w-full border rounded-lg px-3 py-2 text-xl font-black text-slate-800 outline-none focus:border-rose-500 shadow-inner" placeholder="0" />
             </div>

             <div class="space-y-1.5">
               <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Catatan Finansial</label>
               <textarea v-model="form.notes" rows="3" class="w-full border rounded-lg px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-violet-500 shadow-inner resize-none" placeholder="Manual Override / Kerusakan Berat..."></textarea>
             </div>

             <Button label="Post Manual Jurnal" :loading="saving" :disabled="form.depreciationAmount <= 0"
                @click="saveManual" class="bg-violet-600 border-none text-white font-bold py-3 hover:bg-violet-700 mt-2" icon="pi pi-check" />
          </div>

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
    showMsg(success, 'Jurnal Depresiasi telah diterbitkan!');
    dialogOpen.value = false;
    load(); // Refresh matrix
  } catch (e: any) {
    showMsg(error, e.response?.data?.message || e.message);
  } finally {
    saving.value = false;
  }
}

onMounted(() => {
  if (canRead) load();
});
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
.animate-slide-in-right { animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes slideInRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
</style>
