<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useApi } from '@/composables/useApi';
import { useAuthStore } from '@/stores/auth';

const api = useApi();
const auth = useAuthStore();

const loading = ref(true);
const dashboard = ref<any>(null);

const kpis = computed(() => [
  { label: 'Revenue', value: formatCurrency(dashboard.value?.financials?.totalRevenue || 0), target: '1.2B', trend: '+12.4%', icon: 'pi pi-wallet', color: 'indigo' },
  { label: 'Net Profit', value: formatCurrency(dashboard.value?.financials?.netProfit || 0), target: '300M', trend: '+8.1%', icon: 'pi pi-percentage', color: 'emerald' },
  { label: 'Active Projects', value: dashboard.value?.operations?.activeProjects || 0, target: '25', trend: 'On Track', icon: 'pi pi-briefcase', color: 'orange' },
  { label: 'ESG Score', value: `${(dashboard.value?.governance?.complianceScore || 0).toFixed(1)}%`, target: '90%', trend: 'Healthy', icon: 'pi pi-shield', color: 'cyan' },
]);

const formatCurrency = (val: number) => {
  if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
  if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
  return val.toString();
};

const loadData = async () => {
  loading.value = true;
  try {
    const res = await api.get('/core/analytics/executive-summary');
    dashboard.value = res;
  } catch (error) {
    console.error('Failed to load dashboard', error);
  } finally {
    loading.value = false;
  }
};

// Simulated Sparkline for Revenue
const sparkPoints = computed(() => {
    const data = dashboard.value?.trends?.revenue || [];
    if (data.length === 0) return "5,35 25,25 45,30 65,15 85,20";
    return data.map((d: any, i: number) => `${i * 30 + 5},${35 - (d.value / 1000000 * 20)}`).join(' ');
});

const operationalMetrics = computed(() => [
  { label: 'Pipeline Val.', value: formatCurrency(dashboard.value?.operations?.pipelineValue || 0), icon: 'pi pi-filter-fill', sub: 'CRM Opportunities' },
  { label: 'Stock Valuation', value: formatCurrency(dashboard.value?.operations?.inventoryValuation || 0), icon: 'pi pi-box', sub: 'Warehouse Assets' },
  { label: 'S-Orders Open', value: dashboard.value?.operations?.openServiceOrders || 0, icon: 'pi pi-ticket', sub: 'Field Operations' },
]);

onMounted(() => {
  loadData();
});
</script>

<template>
  <div class="min-h-screen bg-[#f8fafc] pb-20 p-6 space-y-8">
    
    <!-- ═══════════════════════════════════ HEADER ══════════════════════════════════ -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 relative overflow-hidden p-10 rounded-xl bg-slate-900 text-white shadow-2xl transition-all duration-700">
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -mr-64 -mt-64"></div>
      <div class="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[80px] -ml-40 -mb-40"></div>
      
      <div class="relative z-10">
        <div class="flex items-center gap-3 mb-4">
           <span class="px-4 py-1 bg-white/10 backdrop-blur-xl text-white text-[10px] font-black uppercase tracking-[0.25em] rounded-full border border-white/20">Executive Command Center</span>
           <span class="text-white/20">/</span>
           <span class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Real-time Intelligence</span>
        </div>
        <h1 class="text-5xl font-black tracking-tighter mb-4 uppercase leading-none">Enterprise <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 font-black italic">Pulse</span></h1>
        <p class="text-slate-400 text-sm font-medium">Selamat datang kembali, <span class="text-white font-bold">{{ auth.user?.email }}</span>. Seluruh sistem beroperasi dalam status optimal.</p>
      </div>

      <div class="flex items-center gap-3 relative z-10">
        <div class="flex flex-col items-end mr-4">
          <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest">System Health</span>
          <span class="text-emerald-400 font-bold text-xs flex items-center gap-1"><i class="pi pi-check-circle text-[10px]"></i> All Systems Go</span>
        </div>
        <Button icon="pi pi-refresh" severity="secondary" rounded text @click="loadData" :loading="loading" class="text-white hover:bg-white/10" />
      </div>
    </div>

    <!-- ═══════════════════════════════════ GLOBAL KPI RIBBON ══════════════════════════════════ -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
       <div v-for="k in kpis" :key="k.label" class="group p-8 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden">
          <div class="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
             <i :class="[k.icon, 'text-7xl text-slate-900']"></i>
          </div>
          
          <div class="relative z-10 flex flex-col h-full">
            <div class="flex justify-between items-start mb-6">
               <div :class="['w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-50 text-xl', `text-${k.color}-600`]">
                 <i :class="k.icon"></i>
               </div>
               <Tag :value="k.trend" severity="success" class="font-black text-[9px] uppercase tracking-widest px-2 py-1" />
            </div>
            
            <p class="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">{{ k.label }}</p>
            <h3 class="text-3xl font-black text-slate-900 tracking-tight">{{ loading ? '—' : k.value }}</h3>
            
            <div class="mt-auto pt-6 flex items-center justify-between">
              <span class="text-[10px] font-bold text-slate-400 uppercase">Target: {{ k.target }}</span>
              <!-- Sparkline SVG -->
              <svg width="60" height="25" class="overflow-visible">
                <polyline
                  fill="none"
                  :stroke="k.color === 'indigo' ? '#6366f1' : k.color === 'emerald' ? '#10b981' : '#f59e0b'"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  :points="sparkPoints"
                />
              </svg>
            </div>
          </div>
       </div>
    </div>

    <!-- ═══════════════════════════════════ ANALYTICS MATRIX ══════════════════════════════════ -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <!-- Financial Velocity Card -->
      <div class="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-10 relative overflow-hidden">
          <div class="flex items-center justify-between mb-12">
             <div>
               <h3 class="text-xl font-black text-slate-900 uppercase tracking-tight">Financial <span class="text-indigo-600">Velocity</span></h3>
               <p class="text-xs text-slate-500 font-medium">Monitoring pergerakan arus pendapatan dan profitabilitas inti.</p>
             </div>
             <div class="flex gap-2">
               <button class="px-4 py-2 bg-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-600 rounded-xl">Q4 Trends</button>
               <button class="px-4 py-2 bg-white border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-400 rounded-xl hover:bg-slate-50">Custom</button>
             </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 h-64">
              <div class="flex flex-col justify-center gap-8">
                 <div class="space-y-3">
                    <div class="flex justify-between text-[11px] font-black uppercase text-slate-400">
                      <span>Net Profit Margin</span>
                      <span class="text-indigo-600">{{ dashboard?.financials?.profitMargin.toFixed(1) }}%</span>
                    </div>
                    <ProgressBar :value="dashboard?.financials?.profitMargin || 0" :showValue="false" style="height: 10px" class="bg-slate-100" />
                 </div>
                 <div class="space-y-3">
                    <div class="flex justify-between text-[11px] font-black uppercase text-slate-400">
                      <span>OpEx Efficiency</span>
                      <span class="text-emerald-600">84.2%</span>
                    </div>
                    <ProgressBar :value="84.2" :showValue="false" style="height: 10px" class="bg-slate-100" color="#10b981" />
                 </div>
              </div>

              <!-- Big Visual Stat -->
              <div class="bg-slate-50 rounded-xl p-10 border border-slate-100 flex flex-col items-center justify-center text-center relative">
                 <div class="absolute top-0 right-0 p-6 opacity-30">
                    <i class="pi pi-chart-line text-5xl text-indigo-100"></i>
                 </div>
                 <p class="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Net Financial Health</p>
                 <h2 class="text-6xl font-black text-slate-900 tracking-tighter italic">Solid</h2>
                 <p class="text-[10px] font-bold text-emerald-500 uppercase mt-4 bg-emerald-50 px-4 py-1 rounded-full">Score: 9.2 / 10</p>
              </div>
          </div>
      </div>

      <!-- Domain Distribution (MeterGroup Style) -->
      <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-10 flex flex-col">
         <h4 class="text-sm font-black text-slate-900 uppercase tracking-widest mb-8">Asset <span class="text-indigo-600">Distribution</span></h4>
         <div class="space-y-8 flex-1">
            <div v-for="m in operationalMetrics" :key="m.label" class="flex flex-col gap-3">
               <div class="flex justify-between items-center">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                      <i :class="m.icon"></i>
                    </div>
                    <div>
                      <p class="text-[11px] font-black text-slate-800 uppercase">{{ m.label }}</p>
                      <p class="text-[9px] text-slate-400 font-bold uppercase">{{ m.sub }}</p>
                    </div>
                  </div>
                  <span class="text-sm font-black text-slate-900">{{ loading ? '—' : m.value }}</span>
               </div>
            </div>
         </div>
         <div class="mt-auto pt-8 border-t border-slate-100">
            <Button label="Full Intelligence Audit" text class="w-full text-indigo-600 font-black text-[10px] uppercase tracking-widest" icon="pi pi-arrow-right" iconPos="right" />
         </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════ INTELLIGENCE FEED ══════════════════════════════════ -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div class="lg:col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm p-10">
           <div class="flex items-center gap-4 mb-8">
              <i class="pi pi-bolt text-indigo-600 text-xl"></i>
              <h4 class="text-sm font-black text-slate-900 uppercase tracking-widest">Organizational <span class="text-indigo-600">Intelligence Feed</span></h4>
           </div>
           
           <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-6 rounded-xl bg-indigo-50/50 border border-indigo-100 flex gap-6 group hover:bg-white hover:shadow-xl transition-all cursor-pointer">
                 <div class="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-indigo-200">
                    <i class="pi pi-megaphone text-xl"></i>
                 </div>
                 <div>
                    <span class="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">Strategic Alert</span>
                    <p class="text-[13px] font-bold text-slate-700 leading-snug">Pendapatan kuartal ini diperkirakan melampaui target sebesar 4.2%.</p>
                 </div>
              </div>
              <div class="p-6 rounded-xl bg-emerald-50/50 border border-emerald-100 flex gap-6 group hover:bg-white hover:shadow-xl transition-all cursor-pointer">
                 <div class="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-200">
                    <i class="pi pi-shield-check text-xl"></i>
                 </div>
                 <div>
                    <span class="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Risk Mitigation</span>
                    <p class="text-[13px] font-bold text-slate-700 leading-snug">Kepatuhan dokumen ISO 14001 meningkat signifikan di regional Barat.</p>
                 </div>
              </div>
           </div>
        </div>

        <div class="bg-indigo-950 rounded-xl p-10 text-white relative overflow-hidden shadow-2xl">
           <div class="absolute top-0 right-0 p-8 opacity-10">
             <i class="pi pi-map text-9xl"></i>
           </div>
           <h4 class="text-[11px] font-black uppercase tracking-[0.25em] mb-4 text-indigo-300">Global footprint</h4>
           <div class="space-y-6 relative z-10">
              <div class="flex flex-col gap-2">
                 <span class="text-4xl font-black italic tracking-tighter">12<span class="text-lg not-italic text-indigo-400 ml-2">Internal Org. Units</span></span>
                 <p class="text-[10px] text-indigo-200 font-bold uppercase">Beroperasi di 3 Cabang Utama</p>
              </div>
              <hr class="border-white/10" />
              <div class="flex items-center gap-4">
                 <div class="w-10 h-10 rounded-full border border-white/20 bg-white/10 flex items-center justify-center">
                    <i class="pi pi-users text-sm"></i>
                 </div>
                 <div>
                    <p class="text-[11px] font-black uppercase">842 Employees</p>
                    <p class="text-[9px] text-indigo-300 font-bold tracking-widest">Active Workforce</p>
                 </div>
              </div>
           </div>
        </div>
    </div>

    <!-- ═══════════════════════════════════ INTEGRATED FLOW ANALYTICS ══════════════════════════════════ -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Golden Thread Visualization -->
      <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-10 overflow-hidden relative group">
        <div class="absolute -right-20 -top-20 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
        <div class="flex items-center justify-between mb-8">
          <div>
            <h3 class="text-xl font-black text-slate-900 uppercase tracking-tight">Transactional <span class="text-emerald-600">Golden Thread</span></h3>
            <p class="text-xs text-slate-500 font-medium">Visualisasi integritas data end-to-end dari operasional ke laporan keuangan.</p>
          </div>
          <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-sm">
            <i class="pi pi-link"></i>
          </div>
        </div>

        <div class="flex flex-col gap-6 relative z-10">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black shadow-lg">1</div>
            <div class="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-100 flex justify-between items-center group-hover:border-emerald-200 transition-all">
              <span class="text-[11px] font-black text-slate-500 uppercase">Sales & Procurement</span>
              <span class="text-sm font-black text-slate-900">{{ dashboard?.operations?.activeOrders || 0 }} Open Orders</span>
            </div>
          </div>
          <div class="ml-5 h-8 border-l-2 border-dashed border-slate-200"></div>
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black shadow-lg">2</div>
            <div class="flex-1 bg-indigo-50/30 p-4 rounded-2xl border border-indigo-100 flex justify-between items-center group-hover:border-indigo-300 transition-all">
              <span class="text-[11px] font-black text-indigo-600 uppercase">Invoicing & AR/AP</span>
              <span class="text-sm font-black text-slate-900">{{ formatCurrency(dashboard?.financials?.totalAr || 0) }} Outstanding</span>
            </div>
          </div>
          <div class="ml-5 h-8 border-l-2 border-dashed border-slate-200"></div>
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black shadow-lg">3</div>
            <div class="flex-1 bg-emerald-50/30 p-4 rounded-2xl border border-emerald-100 flex justify-between items-center group-hover:border-emerald-300 transition-all">
              <span class="text-[11px] font-black text-emerald-600 uppercase">General Ledger & Tax</span>
              <span class="text-sm font-black text-slate-900">Synchronized (100%)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Access Modules -->
      <div class="grid grid-cols-2 gap-6">
        <NuxtLink to="/support/pos" class="bg-indigo-600 rounded-xl p-8 text-white relative overflow-hidden group hover:scale-[1.02] transition-all shadow-xl shadow-indigo-900/40">
           <div class="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
             <i class="pi pi-shopping-cart text-[120px]"></i>
           </div>
           <h4 class="text-[11px] font-black uppercase tracking-[0.2em] mb-2 text-indigo-300">New Module</h4>
           <h3 class="text-2xl font-black italic mb-4">Point of Sale</h3>
           <p class="text-xs text-indigo-100/70 font-medium leading-relaxed">Integrated omnichannel checkout system.</p>
           <div class="mt-8 flex items-center gap-2 text-[10px] font-black uppercase bg-white/10 w-fit px-4 py-2 rounded-full border border-white/20">
             Explore <i class="pi pi-arrow-right ml-1"></i>
           </div>
        </NuxtLink>
        <NuxtLink to="/finance/debt-collection" class="bg-slate-900 rounded-xl p-8 text-white relative overflow-hidden group hover:scale-[1.02] transition-all shadow-xl">
           <div class="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
             <i class="pi pi-money-bill text-[120px]"></i>
           </div>
           <h4 class="text-[11px] font-black uppercase tracking-[0.2em] mb-2 text-slate-400">Risk Intelligence</h4>
           <h3 class="text-2xl font-black italic mb-4">Debt Center</h3>
           <p class="text-xs text-slate-400 font-medium leading-relaxed">Monitoring & automated reminder system.</p>
           <div class="mt-8 flex items-center gap-2 text-[10px] font-black uppercase bg-white/10 w-fit px-4 py-2 rounded-full border border-white/20">
             Explore <i class="pi pi-arrow-right ml-1"></i>
           </div>
        </NuxtLink>
        <NuxtLink to="/finance/vendor-reconciliation" class="bg-white rounded-xl p-8 text-slate-900 border border-slate-200 group hover:border-indigo-600 transition-all shadow-sm flex flex-col justify-between">
           <div>
             <h4 class="text-[10px] font-black uppercase tracking-widest mb-1 text-slate-400">Accounts Payable</h4>
             <h3 class="text-xl font-black">Vendor Reconciliation</h3>
           </div>
           <div class="flex items-center justify-between text-[10px] font-black uppercase text-indigo-600">
             3-Way Match <i class="pi pi-arrow-right"></i>
           </div>
        </NuxtLink>
        <NuxtLink to="/support/asset" class="bg-white rounded-xl p-8 text-slate-900 border border-slate-200 group hover:border-emerald-600 transition-all shadow-sm flex flex-col justify-between">
           <div>
             <h4 class="text-[10px] font-black uppercase tracking-widest mb-1 text-slate-400">Infrastructure</h4>
             <h3 class="text-xl font-black">Fixed Assets</h3>
           </div>
           <div class="flex items-center justify-between text-[10px] font-black uppercase text-emerald-600">
             Registry <i class="pi pi-arrow-right"></i>
           </div>
        </NuxtLink>
      </div>
    </div>

  </div>
</template>

<style scoped>
:deep(.p-progressbar) {
  @apply rounded-full overflow-hidden;
}
:deep(.p-progressbar .p-progressbar-value) {
  @apply bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-full;
}
</style>
