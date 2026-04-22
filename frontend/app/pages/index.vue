<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useApi } from '@/composables/useApi';
import { useAuthStore } from '@/stores/auth';

const api = useApi();
const auth = useAuthStore();

const loading = ref(true);
const dashboard = ref<any>(null);

const kpis = computed(() => [
  { label: 'Revenue', value: formatCurrency(dashboard.value?.financials?.totalRevenue || 0), target: '1.2B', trend: '+12.4%', icon: 'pi pi-wallet', color: 'indigo' as const },
  { label: 'Net Profit', value: formatCurrency(dashboard.value?.financials?.netProfit || 0), target: '300M', trend: '+8.1%', icon: 'pi pi-percentage', color: 'emerald' as const },
  { label: 'Active Projects', value: dashboard.value?.operations?.activeProjects || 0, target: '25', trend: 'On Track', icon: 'pi pi-briefcase', color: 'orange' as const },
  { label: 'ESG Score', value: `${(dashboard.value?.governance?.complianceScore || 0).toFixed(1)}%`, target: '90%', trend: 'Healthy', icon: 'pi pi-shield', color: 'cyan' as const },
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
  <div class="min-h-screen bg-[#f8fafc] pb-20 p-4 space-y-8">
    
    <!-- ═══════════════════════════════════ HEADER ══════════════════════════════════ -->
    <DashboardHero
      badge="Executive Command Center"
      badge-accent="Real-time Intelligence"
      title="Enterprise"
      title-accent="Pulse"
      status-label="System Health"
      status-value="All Systems Go"
      :loading="loading"
      @refresh="loadData"
    >
      <template #description>
        Selamat datang kembali, <span class="text-white font-bold">{{ auth.user?.email }}</span>. Seluruh sistem beroperasi dalam status optimal.
      </template>
      
    </DashboardHero>

    <!-- ═══════════════════════════════════ GLOBAL KPI RIBBON ══════════════════════════════════ -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
       <KpiCard
         v-for="k in kpis"
         :key="k.label"
         :label="k.label"
         :value="k.value"
         :icon="k.icon"
         :color="k.color"
         :trend="k.trend"
         :target="k.target"
         :loading="loading"
         :sparkline-points="sparkPoints"
       />
    </div>

    <!-- ═══════════════════════════════════ ANALYTICS MATRIX ══════════════════════════════════ -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <!-- Financial Velocity Card -->
      <!-- Financial Velocity Card -->
      <PanelCard
        title="Financial Velocity"
        subtitle="Monitoring pergerakan arus pendapatan dan profitabilitas inti."
        icon="pi pi-chart-bar"
        theme="indigo"
        :show-search="false"
        :show-filter="false"
        :show-refresh="false"
        :show-icon="false"
        class="lg:col-span-2"
      >
        <template #actions>
          <div class="flex gap-2">
            <button class="px-4 py-2 bg-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-600 rounded-xl">Q4 Trends</button>
            <button class="px-4 py-2 bg-white border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-400 rounded-xl hover:bg-slate-50">Custom</button>
          </div>
        </template>

        <template #table>
          <div class="p-10">
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
                <div class="bg-slate-50 rounded-xl p-10 border border-slate-100 flex flex-col items-center justify-center text-center relative overflow-hidden">
                   <div class="absolute top-0 right-0 p-4 opacity-10">
                      <i class="pi pi-chart-line text-5xl text-indigo-900"></i>
                   </div>
                   <p class="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Net Financial Health</p>
                   <h2 class="text-6xl font-black text-slate-900 tracking-tighter italic">Solid</h2>
                   <p class="text-[10px] font-bold text-emerald-500 uppercase mt-4 bg-emerald-50 px-4 py-1 rounded-full">Score: 9.2 / 10</p>
                </div>
            </div>
          </div>
        </template>
      </PanelCard>

      <!-- Domain Distribution (MeterGroup Style) -->
      <!-- Domain Distribution (MeterGroup Style) -->
      <PanelCard
        title="Asset Distribution"
        subtitle="Statistik operasional lintas divisi."
        icon="pi pi-objects-column"
        theme="indigo"
        :show-search="false"
        :show-filter="false"
        :show-refresh="false"
        :show-icon="false"
        class="flex flex-col"
      >
        <template #table>
          <div class="p-10 space-y-8">
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
             <div class="pt-8 border-t border-slate-100">
                <Button label="Full Intelligence Audit" text class="w-full text-indigo-600 font-black text-[10px] uppercase tracking-widest" icon="pi pi-arrow-right" iconPos="right" />
             </div>
          </div>
        </template>
      </PanelCard>
    </div>

    <!-- ═══════════════════════════════════ INTELLIGENCE FEED ══════════════════════════════════ -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <PanelCard
          title="Intelligence Feed"
          subtitle="Insight strategis dan peringatan operasional otomatis."
          icon="pi pi-bolt"
          theme="sky"
          :show-search="false"
          :show-filter="false"
          :show-refresh="false"
          :show-icon="false"
          class="lg:col-span-3"
        >
          <template #table>
            <div class="p-10">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 flex gap-4 group hover:bg-white hover:shadow-xl transition-all cursor-pointer">
                    <div class="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-indigo-200">
                        <i class="pi pi-megaphone text-xl"></i>
                    </div>
                    <div>
                        <span class="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">Strategic Alert</span>
                        <p class="text-[13px] font-bold text-slate-700 leading-snug">Pendapatan kuartal ini diperkirakan melampaui target sebesar 4.2%.</p>
                    </div>
                  </div>
                  <div class="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 flex gap-4 group hover:bg-white hover:shadow-xl transition-all cursor-pointer">
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
          </template>
        </PanelCard>

        <PanelSolid
          title="Global Footprint"
          bg-icon="pi pi-map"
          theme="indigo"
        >
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
        </PanelSolid>
    </div>

    <!-- ═══════════════════════════════════ INTEGRATED FLOW ANALYTICS ══════════════════════════════════ -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Golden Thread Visualization -->
      <!-- Golden Thread Visualization -->
      <PanelCard
        title="Transactional Golden Thread"
        subtitle="Visualisasi integritas data end-to-end dari operasional ke laporan keuangan."
        icon="pi pi-link"
        theme="emerald"
        :show-search="false"
        :show-filter="false"
        :show-refresh="false"
        :show-icon="false"
      >
        <template #table>
          <div class="p-10 flex flex-col gap-4 relative z-10">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black shadow-lg">1</div>
              <div class="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-100 flex justify-between items-center hover:border-emerald-200 transition-all">
                <span class="text-[11px] font-black text-slate-500 uppercase">Sales & Procurement</span>
                <span class="text-sm font-black text-slate-900">{{ dashboard?.operations?.activeOrders || 0 }} Open Orders</span>
              </div>
            </div>
            <div class="ml-5 h-8 border-l-2 border-dashed border-slate-200"></div>
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black shadow-lg">2</div>
              <div class="flex-1 bg-indigo-50/30 p-4 rounded-2xl border border-indigo-100 flex justify-between items-center hover:border-indigo-300 transition-all">
                <span class="text-[11px] font-black text-indigo-600 uppercase">Invoicing & AR/AP</span>
                <span class="text-sm font-black text-slate-900">{{ formatCurrency(dashboard?.financials?.totalAr || 0) }} Outstanding</span>
              </div>
            </div>
            <div class="ml-5 h-8 border-l-2 border-dashed border-slate-200"></div>
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black shadow-lg">3</div>
              <div class="flex-1 bg-emerald-50/30 p-4 rounded-2xl border border-emerald-100 flex justify-between items-center hover:border-emerald-300 transition-all">
                <span class="text-[11px] font-black text-emerald-600 uppercase">General Ledger & Tax</span>
                <span class="text-sm font-black text-slate-900">Synchronized (100%)</span>
              </div>
            </div>
          </div>
        </template>
      </PanelCard>

      <!-- Quick Access Modules -->
      <div class="grid grid-cols-2 gap-4">
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

<style scoped lang="postcss">
:deep(.p-progressbar) {
  @apply rounded-full overflow-hidden;
}
:deep(.p-progressbar .p-progressbar-value) {
  @apply bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-full;
}
</style>
