<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  AlertOctagon, 
  ShieldAlert, 
  TrendingDown, 
  BarChart2, 
  Zap, 
  FileWarning, 
  Activity,
  ArrowRight,
  ShieldCheck,
  Radar,
  LayoutGrid
} from 'lucide-vue-next'

const risks = ref([
  { id: 'RSK-001', title: 'Supply Chain Volatility', category: 'Operational', impact: 'High', likelihood: 'Likely', status: 'Mitigated', owner: 'Logistic Dept' },
  { id: 'RSK-002', title: 'Currency Fluctuations', category: 'Financial', impact: 'High', likelihood: 'Certain', status: 'Active', owner: 'Treasury' },
  { id: 'RSK-003', title: 'Workplace Safety (Site A)', category: 'Compliance', impact: 'Critical', likelihood: 'Unlikely', status: 'Active', owner: 'HSE Dept' },
  { id: 'RSK-004', title: 'Cybersecurity Data Breach', category: 'Strategic', impact: 'Critical', likelihood: 'Possible', status: 'Mitigated', owner: 'IT Security' },
])

const stats = ref([
  { label: 'Active Risks', value: '12', icon: ShieldAlert, color: 'text-rose-500', bg: 'bg-rose-500/10' },
  { label: 'Mitigated', value: '45', icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { label: 'Risk Velocity', value: 'High', icon: Activity, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { label: 'Total Exposure', value: 'Rp 4.2B', icon: TrendingDown, color: 'text-indigo-500', bg: 'bg-indigo-500/10' }
])

const riskMatrix = [
  { level: 'Critical', count: 2, color: 'bg-rose-600' },
  { level: 'High', count: 5, color: 'bg-orange-500' },
  { level: 'Medium', count: 12, color: 'bg-amber-400' },
  { level: 'Low', count: 24, color: 'bg-emerald-500' },
]
</script>

<template>
  <div class="min-h-screen bg-[#020617] text-slate-200 p-6 md:p-10 space-y-10 font-sans">
    
    <!-- ═══════════════════════════════════ HEADER ══════════════════════════════════ -->
    <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div class="space-y-2">
        <div class="flex items-center gap-3">
          <span class="px-3 py-1 bg-rose-500/10 text-rose-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-rose-500/20">Governance & Risk</span>
        </div>
        <h1 class="text-4xl font-black text-white tracking-tighter flex items-center gap-4">
          <AlertOctagon class="w-10 h-10 text-rose-500" />
          Enterprise <span class="text-rose-500 italic">Risk Intelligence</span>
        </h1>
        <p class="text-slate-400 text-sm font-medium">Predictive risk assessment, mitigation tracking, and organizational resilience.</p>
      </div>
      <div class="flex gap-4">
        <button class="bg-slate-900 border border-slate-800 hover:border-slate-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all">
          <Radar class="w-4 h-4" />
          Heatmap View
        </button>
        <button class="bg-rose-600 hover:bg-rose-500 text-white px-6 py-3 rounded-2xl font-bold border-none shadow-lg shadow-rose-900/40 transition-all">
          Assess New Risk
        </button>
      </div>
    </header>

    <!-- ═══════════════════════════════════ KPI RIBBON ══════════════════════════════════ -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div v-for="s in stats" :key="s.label" class="bg-slate-900/50 border border-slate-800 p-8 rounded-xl relative group border-l-4" :class="`border-l-${s.color.split('-')[1]}-500`">
        <div class="flex justify-between items-start mb-6">
          <div :class="[s.bg, 'p-3 rounded-2xl']">
            <component :is="s.icon" :class="[s.color, 'w-6 h-6']" />
          </div>
          <span class="text-[9px] font-black uppercase tracking-widest bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">Real-time</span>
        </div>
        <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{{ s.label }}</p>
        <h3 class="text-3xl font-black text-white leading-none">{{ s.value }}</h3>
      </div>
    </div>

    <!-- ═══════════════════════════════════ RISK LANDSCAPE ══════════════════════════════════ -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <!-- Risk Registry -->
      <div class="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-xl p-10">
        <div class="flex items-center justify-between mb-10">
          <h3 class="text-xl font-black text-white uppercase tracking-tight">Active <span class="text-rose-500 italic">Risk Registry</span></h3>
          <div class="flex gap-2">
            <button class="p-2 bg-slate-950 border border-slate-800 rounded-lg"><LayoutGrid class="w-4 h-4" /></button>
            <button class="p-2 bg-slate-950 border border-slate-800 rounded-lg"><BarChart2 class="w-4 h-4" /></button>
          </div>
        </div>

        <div class="space-y-4">
          <div v-for="r in risks" :key="r.id" class="p-6 rounded-xl bg-slate-950/40 border border-slate-800 group hover:border-rose-500/30 transition-all cursor-pointer flex items-center gap-6">
             <div class="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
               <FileWarning :class="[r.impact === 'Critical' ? 'text-rose-500' : 'text-amber-500', 'w-6 h-6']" />
             </div>
             <div class="flex-1">
               <div class="flex items-center gap-3 mb-1">
                 <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest">{{ r.id }}</span>
                 <span class="text-[10px] font-black text-rose-500 uppercase tracking-widest bg-rose-500/10 px-2 py-0.5 rounded">{{ r.category }}</span>
               </div>
               <h4 class="text-base font-black text-white">{{ r.title }}</h4>
               <p class="text-[11px] text-slate-500 font-bold uppercase mt-1">Owner: {{ r.owner }}</p>
             </div>
             <div class="text-right hidden md:block">
               <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Likelihood</p>
               <span class="text-xs font-black text-white">{{ r.likelihood }}</span>
             </div>
             <div class="w-px h-10 bg-slate-800 hidden md:block"></div>
             <div class="text-right">
               <span :class="[r.status === 'Mitigated' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20']" class="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border">
                 {{ r.status }}
               </span>
             </div>
          </div>
        </div>
      </div>

      <!-- Risk Exposure Meter -->
      <div class="space-y-8">
        <div class="bg-rose-600 rounded-xl p-10 text-white relative overflow-hidden shadow-2xl">
          <div class="absolute -right-8 -top-8 p-8 opacity-20">
            <Zap class="w-48 h-48 rotate-12" />
          </div>
          <div class="relative z-10">
            <h4 class="text-[11px] font-black uppercase tracking-[0.25em] mb-8 text-rose-100">Exposure Index</h4>
            <div class="flex items-center gap-6 mb-10">
              <h2 class="text-6xl font-black italic">68<span class="text-2xl not-italic font-bold ml-1 text-rose-200">%</span></h2>
              <div class="flex flex-col">
                <span class="text-xs font-black uppercase text-white">Elevated Risk</span>
                <span class="text-[10px] font-bold text-rose-200 italic">+12% from last audit</span>
              </div>
            </div>
            <div class="h-2 w-full bg-white/20 rounded-full overflow-hidden">
               <div class="h-full bg-white w-[68%] rounded-full shadow-[0_0_15px_rgba(255,255,255,0.4)]"></div>
            </div>
          </div>
        </div>

        <div class="bg-slate-900 border border-slate-800 rounded-xl p-10">
          <h4 class="text-sm font-black text-white uppercase tracking-widest mb-8 text-center italic">Impact <span class="text-rose-500 font-black">Matrix</span></h4>
          <div class="space-y-4">
            <div v-for="m in riskMatrix" :key="m.level" class="flex items-center gap-4">
               <div :class="[m.color, 'w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black text-white shadow-lg']">{{ m.count }}</div>
               <div class="flex-1">
                 <div class="flex justify-between items-center mb-1">
                    <span class="text-[11px] font-black uppercase text-slate-400">{{ m.level }} Impact</span>
                    <span class="text-[10px] font-bold text-slate-500">{{ Math.round((m.count / 53) * 100) }}%</span>
                 </div>
                 <div class="h-1.5 w-full bg-slate-950 rounded-full">
                    <div :class="[m.color]" :style="{ width: `${(m.count / 53) * 300}%` }" class="h-full rounded-full"></div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════ FOOTER ══════════════════════════════════ -->
    <div class="flex flex-col md:flex-row items-center justify-between gap-6 p-10 bg-slate-900/20 border border-slate-800 rounded-xl">
      <div class="flex items-center gap-4">
        <ShieldAlert class="w-8 h-8 text-slate-500" />
        <div>
          <h4 class="text-sm font-black text-white uppercase tracking-tighter">Organizational Resilience Score: <span class="text-emerald-500">Strong (8.4/10)</span></h4>
          <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Calculated based on 42 active mitigation workflows.</p>
        </div>
      </div>
      <button class="text-xs font-black uppercase text-rose-500 flex items-center gap-2 group">
        Full GRC Audit Log <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>

  </div>
</template>

<style scoped>
.risk-card-hover {
  background: radial-gradient(circle at top right, rgba(244, 63, 94, 0.05), transparent);
}
</style>
