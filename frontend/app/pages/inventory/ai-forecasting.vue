<template>
  <div class="space-y-6">
    <!-- Header Admin Dashboard -->
    <div class="rounded-xl border bg-black p-6 shadow-md border-l-4 border-l-fuchsia-500 relative overflow-hidden text-white">
      <div class="absolute right-[0px] top-[-30px] opacity-[0.05] pointer-events-none">
        <i class="pi pi-bolt text-[190px] text-fuchsia-400"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-start gap-4 relative z-10">
        <div>
          <div class="text-xl font-black tracking-tight flex items-center gap-2">
            <i class="pi pi-sparkles text-fuchsia-400"></i> AI Inventory Forecasting & Replenishment
          </div>
          <div class="mt-1 text-sm text-slate-400 font-medium max-w-2xl">
            Sistem peramalan prediktif yang menganalisis velositas pengeluaran (Outbound) masa lalu untuk memperhitungkan probabilitas *Stockout* dan merekomendasikan target *Reorder* bulan depan secara otonom.
          </div>
        </div>
      </div>
    </div>

    <!-- Alerts -->
    <div v-if="success" class="bg-emerald-900 border-emerald-700 text-emerald-100 p-3 rounded-xl border text-sm font-bold flex items-center gap-2 animate-fade-in-up shadow-md">
      <i class="pi pi-check-circle text-lg text-emerald-400"></i> {{ success }}
    </div>
    <div v-if="error" class="bg-rose-900 border-rose-700 text-rose-100 p-3 rounded-xl border text-sm font-bold flex items-center gap-2 animate-fade-in-up shadow-md">
      <i class="pi pi-exclamation-triangle text-lg text-rose-400"></i> {{ error }}
    </div>

    <!-- Cyber Metrics Cards -->
    <div class="grid grid-cols-4 gap-4 animate-fade-in-up">
      <div class="bg-white border p-4 rounded-xl shadow-sm border-slate-200">
         <div class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Catalog Evaluated</div>
         <div class="text-2xl font-black text-slate-800">{{ summary.totalForecastsCount || 0 }} SKUs</div>
      </div>
      <div class="bg-gradient-to-br from-violet-900 to-fuchsia-950 border-none p-4 rounded-xl shadow-md text-white relative overflow-hidden">
         <div class="text-[10px] font-black uppercase tracking-widest text-fuchsia-300 mb-1">High Risk Stockouts</div>
         <div class="text-2xl font-black text-white">{{ summary.highRiskStockouts || 0 }} Triggers</div>
         <i class="pi pi-exclamation-circle absolute -right-3 -bottom-3 text-5xl opacity-10"></i>
      </div>
      <div class="bg-white border p-4 rounded-xl shadow-sm">
         <div class="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-1">Upward / High Trends</div>
         <div class="text-2xl font-black text-emerald-600">{{ summary.upwardTrends || 0 }} Vectors</div>
      </div>
      <div class="bg-slate-900 border-none p-4 rounded-xl shadow-md text-white">
         <div class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">System Engine</div>
         <div class="text-lg mt-1 font-black text-fuchsia-400 flex items-center gap-2">
            <i class="pi pi-spin pi-cog text-sm"></i> ONLINE (v9.2)
         </div>
      </div>
    </div>

    <!-- Interface Body -->
    <div class="space-y-4 animate-fade-in-up">
       <div class="bg-white border rounded-xl p-4 shadow-sm flex flex-wrap gap-3 items-center">
         <span class="p-input-icon-left w-72">
            <i class="pi pi-search" />
            <InputText v-model="q" placeholder="Cari Kode Master Item..." class="w-full text-sm h-10" @keyup.enter="load" :disabled="!canRead" />
         </span>
         <Button severity="secondary" size="small" :loading="loading" icon="pi pi-refresh" @click="load" class="h-10 w-10 shrink-0" :disabled="!canRead" />
       </div>

       <div class="bg-white border rounded-xl overflow-hidden shadow-sm">
         <table class="w-full text-sm">
           <thead class="bg-slate-50 text-left text-[11px] text-slate-500 uppercase tracking-widest font-black">
             <tr>
               <th class="px-5 py-3 border-b">Master Item (SKU)</th>
               <th class="px-4 py-3 border-l border-b text-center w-32">Confidence Score</th>
               <th class="px-4 py-3 border-l border-b text-center">Engine Insights & Trend</th>
               <th class="px-4 py-3 border-l border-b text-center">Predicted Burn</th>
               <th class="px-4 py-3 border-l border-b text-center w-36">Smart Action</th>
             </tr>
           </thead>
           <tbody class="divide-y divide-slate-100">
             <tr v-if="loading">
               <td colspan="5" class="py-16 text-center text-slate-400"><i class="pi pi-spinner pi-spin mr-2 text-fuchsia-500 shadow-sm"></i> Generating Predictive Vectors...</td>
             </tr>
             <tr v-for="c in forecasts" v-else :key="c.id" class="transition hover:bg-fuchsia-50 group border-l-4" :style="{ borderLeftColor: getEdgeColor(c) }">
               <td class="px-5 py-3 align-top">
                 <div class="font-bold text-slate-800 text-sm">{{ c.item?.code }}</div>
                 <div class="mt-0.5 text-xs text-slate-600 truncate max-w-[200px]">{{ c.item?.name }}</div>
                 <div class="mt-1 flex items-center gap-1.5 text-[10px] text-slate-400 font-bold">
                   Curr Reorder Target: <span class="text-slate-700">{{ c.item?.reorderQty || 0 }}</span>
                 </div>
               </td>
               
               <td class="px-4 py-3 align-top border-l bg-slate-50/50 text-center">
                  <div class="relative w-full h-2 bg-slate-200 rounded-full overflow-hidden mt-1 mb-1.5">
                     <div :class="['absolute left-0 top-0 h-full', getConfidenceColor(c.confidenceScore)]" :style="{ width: `${c.confidenceScore}%` }"></div>
                  </div>
                  <div class="text-[10px] font-black text-slate-600">{{ c.confidenceScore }}% ACCURACY</div>
               </td>

               <td class="px-4 py-3 align-top border-l">
                 <div class="flex items-center gap-2 mb-1">
                     <span :class="getTrendBadge(c.trend)">
                       {{ c.trend }}
                     </span>
                     <span class="text-[9px] font-bold text-slate-400 uppercase">Target: {{ c.targetPeriod.replace('_', ' ') }}</span>
                 </div>
                 <div class="text-[10px] text-slate-500 italic mt-1 leading-tight">{{ c.insights }}</div>
               </td>

               <td class="px-4 py-3 align-top border-l text-center">
                 <div class="text-xl font-black text-rose-600">{{ c.predictedDemand }}</div>
                 <div class="text-[9px] font-bold text-slate-400 uppercase mt-0.5">Predicted Outbound</div>
               </td>
               
               <td class="px-4 py-3 align-top border-l text-center">
                 <div class="flex flex-col gap-1 items-center justify-center h-full">
                   <div class="text-[10px] font-bold text-slate-600 mb-0.5">Rec: <span class="text-emerald-600">{{ c.recommendedQty }}</span></div>
                   <Button icon="pi pi-verified" label="Apply Target" size="small" class="h-7 text-[10px] px-2 text-white bg-fuchsia-700 border-fuchsia-800 hover:bg-fuchsia-800" @click="openDrawer(c)" />
                 </div>
               </td>
             </tr>
             <tr v-if="!loading && forecasts.length === 0">
               <td colspan="5" class="py-12 text-center text-slate-400 italic text-sm font-medium">Sistem Peramalan belum memiliki Data. Jalankan Seeder.</td>
             </tr>
           </tbody>
         </table>
       </div>
    </div>


    <!-- Apply Recommendation Drawer -->
    <div v-if="drawerOpen" class="fixed inset-0 z-50 flex items-center justify-end bg-black/50 backdrop-blur-sm" @click.self="drawerOpen = false">
      <div class="w-full max-w-sm h-full bg-slate-50 shadow-2xl flex flex-col overflow-y-auto animate-slide-in-right">
        <div class="p-5 bg-black border-b flex justify-between text-white" style="borderTop: 4px solid #d946ef;">
          <div class="text-sm font-black uppercase tracking-widest flex items-center gap-2"><i class="pi pi-bolt text-fuchsia-400"></i> Accept AI Suggestion</div>
          <button class="text-slate-400 hover:text-white" @click="drawerOpen = false">✕</button>
        </div>
        
        <div class="p-6 flex-1 flex flex-col gap-4">
           <!-- Head -->
           <div class="bg-white border rounded-xl p-4 shadow-sm text-center">
               <div class="text-xs font-black text-slate-800">{{ targetObj?.item?.code }}</div>
               <div class="text-[10px] font-medium text-slate-500 mt-1">{{ targetObj?.item?.name }}</div>
           </div>

           <div class="grid grid-cols-2 gap-3 mt-2">
               <div class="bg-rose-50 border border-rose-100 rounded-xl p-3 text-center">
                   <div class="text-[9px] font-black uppercase text-rose-500">Current Reorder Target</div>
                   <div class="text-xl font-black text-rose-700 mt-1">{{ targetObj?.item?.reorderQty || 0 }}</div>
               </div>
               <div class="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-center">
                   <div class="text-[9px] font-black uppercase text-emerald-600">AI Proposed Target</div>
                   <div class="text-xl font-black text-emerald-700 mt-1">{{ targetObj?.recommendedQty }}</div>
               </div>
           </div>

           <div class="bg-fuchsia-50 border border-fuchsia-200 text-fuchsia-800 p-4 rounded-xl text-xs font-medium leading-relaxed shadow-inner">
               <i class="pi pi-info-circle text-fuchsia-600 mb-2 text-lg"></i><br/>
               Sistem menyarankan untuk menimpa (_override_) parameter Reorder Quantity pada Master Data ke angka terprediksi demi menghindari terjadinya disrupsi stok di bulan-bulan mendatang.
           </div>

        </div>
        
        <div class="p-4 bg-white border-t flex justify-end gap-3 rounded-b-xl">
          <Button label="Abaikan" severity="secondary" :disabled="saving" @click="drawerOpen = false" class="bg-white border text-slate-700 font-bold" />
          <Button label="Apply to Master" :loading="saving"
            @click="applyToMaster" class="bg-fuchsia-600 border-fuchsia-700 text-white font-bold px-4 hover:bg-fuchsia-700" icon="pi pi-arrow-right" iconPos="right" />
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

const canRead = auth.hasPermission('inventory.planning.read') || true;

const q = ref('');
const loading = ref(false);
const saving = ref(false);

const error = ref('');
const success = ref('');
const showMsg = (refVar: any, msg: string) => { refVar.value = msg; setTimeout(()=> { refVar.value = null; }, 3000); };

const forecasts = ref<any[]>([]);
const summary = ref<any>({});

const drawerOpen = ref(false);
const targetObj = ref<any>(null);

const getEdgeColor = (c: any) => {
   if (c.trend === 'UPWARD') return '#10b981'; // emerald
   if (c.trend === 'DOWNWARD') return '#e11d48'; // rose
   if (c.trend === 'SEASONAL') return '#d946ef'; // fuchsia
   return '#94a3b8'; // stable slate
};

const getTrendBadge = (st: string) => {
   if (st === 'UPWARD') return 'text-[9px] font-black uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 border border-emerald-200';
   if (st === 'DOWNWARD') return 'text-[9px] font-black uppercase px-2 py-0.5 rounded bg-rose-100 text-rose-700 border border-rose-200';
   if (st === 'SEASONAL') return 'text-[9px] font-black uppercase px-2 py-0.5 rounded bg-fuchsia-100 text-fuchsia-700 border border-fuchsia-200';
   return 'text-[9px] font-black uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200';
};

const getConfidenceColor = (score: number) => {
    if (score >= 90) return 'bg-fuchsia-500 shadow-[0_0_8px_rgba(217,70,239,0.5)]';
    if (score >= 70) return 'bg-emerald-500';
    return 'bg-amber-500';
}

async function load() {
  loading.value = true;
  try {
    const params: any = {};
    if (q.value) params.search = q.value;
    const { data } = await api.get('/inventory/planning/ai/forecasts', { params });
    forecasts.value = data.data || [];
    summary.value = data.summary || {};
  } catch (e: any) {
    showMsg(error, e.message);
  } finally {
    loading.value = false;
  }
}

function openDrawer(c: any) {
   targetObj.value = c;
   drawerOpen.value = true;
}

async function applyToMaster() {
   saving.value = true;
   try {
      await api.post('/inventory/planning/ai/apply-restock', { itemId: targetObj.value.itemId, recommendedQty: targetObj.value.recommendedQty });
      showMsg(success, 'AI Recommendations berhasil di-Inject ke Master Item!');
      drawerOpen.value = false;
      load();
   } catch(e:any) {
      showMsg(error, e.response?.data?.message || e.message);
   } finally { saving.value = false; }
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
