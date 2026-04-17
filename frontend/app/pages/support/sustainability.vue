<script setup lang="ts">
import { ref } from 'vue'
import { 
  Leaf, 
  Zap, 
  Trash2, 
  Globe, 
  BarChart3, 
  Wind, 
  Droplets,
  Award,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck
} from 'lucide-vue-next'

const stats = ref([
  { label: 'CO2 Footprint', value: '412.5 T', unit: 'CO2e', trend: '-12%', icon: Leaf, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { label: 'Energy Intensity', value: '14.2', unit: 'kWh/m²', trend: '+2%', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { label: 'Waste Recycled', value: '88.4%', unit: 'Rate', trend: '+5%', icon: Trash2, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Renewable Mix', value: '32%', unit: 'Total', trend: '+18%', icon: Globe, color: 'text-indigo-500', bg: 'bg-indigo-500/10' }
])

const initiatives = ref([
  { id: 1, title: 'Solar Panel Phase II', category: 'Energy', status: 'In Progress', progress: 65, impact: 'High' },
  { id: 2, title: 'Zero Waste Warehouse', category: 'Waste', status: 'Planning', progress: 15, impact: 'Medium' },
  { id: 3, title: 'EV Fleet Migration', category: 'Transport', status: 'Completed', progress: 100, impact: 'Very High' }
])

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val)
}
</script>

<template>
  <div class="min-h-screen bg-[#020617] text-slate-200 p-6 md:p-10 space-y-10 font-sans">
    
    <!-- ═══════════════════════════════════ HEADER ══════════════════════════════════ -->
    <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div class="space-y-2">
        <div class="flex items-center gap-3">
          <span class="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-emerald-500/20">Corporate Governance</span>
        </div>
        <h1 class="text-4xl font-black text-white tracking-tighter flex items-center gap-4">
          <Leaf class="w-10 h-10 text-emerald-500" />
          Sustainability <span class="text-emerald-500 italic">Intelligence</span>
        </h1>
        <p class="text-slate-400 text-sm font-medium">Monitoring ESG metrics, Carbon Intensity, and Environmental Impact in real-time.</p>
      </div>
      <div class="flex gap-4">
        <button class="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all border border-slate-800">
          <BarChart3 class="w-4 h-4" />
          Download ESG Report
        </button>
        <button class="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-2xl font-bold border-none shadow-lg shadow-emerald-900/40 transition-all">
          New Initiative
        </button>
      </div>
    </header>

    <!-- ═══════════════════════════════════ KPI MATRIX ══════════════════════════════════ -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div v-for="s in stats" :key="s.label" class="bg-slate-900/50 border border-slate-800 p-8 rounded-xl relative overflow-hidden group hover:border-emerald-500/30 transition-all">
        <div class="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <component :is="s.icon" class="w-32 h-32" />
        </div>
        <div class="flex justify-between items-start mb-6">
          <div :class="[s.bg, 'p-3 rounded-2xl']">
            <component :is="s.icon" :class="[s.color, 'w-6 h-6']" />
          </div>
          <span :class="[s.trend.startsWith('+') ? 'text-rose-400' : 'text-emerald-400', 'text-[10px] font-black uppercase tracking-widest bg-slate-950 px-2 py-1 rounded-lg border border-slate-800']">
            {{ s.trend }}
          </span>
        </div>
        <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{{ s.label }}</p>
        <div class="flex items-baseline gap-2">
          <h3 class="text-3xl font-black text-white leading-none">{{ s.value }}</h3>
          <span class="text-xs font-bold text-slate-500">{{ s.unit }}</span>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════ CORE ANALYTICS ══════════════════════════════════ -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <!-- Carbon Map -->
      <div class="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-xl p-10 flex flex-col">
        <div class="flex items-center justify-between mb-10">
          <div>
            <h3 class="text-xl font-black text-white uppercase tracking-tight">Scope 1-3 <span class="text-emerald-500 italic">Distribution</span></h3>
            <p class="text-xs text-slate-500 font-medium mt-1">Breakdown of operational vs supply chain emissions.</p>
          </div>
          <select class="bg-slate-950 border border-slate-800 text-xs text-slate-400 px-4 py-2 rounded-xl outline-none">
            <option>Last 12 Months</option>
            <option>FY 2024</option>
          </select>
        </div>

        <div class="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div class="md:col-span-1 flex flex-col items-center justify-center text-center relative py-12">
            <svg class="w-48 h-48 -rotate-90 overflow-visible">
              <circle cx="96" cy="96" r="88" fill="none" stroke="#1e293b" stroke-width="14" />
              <circle cx="96" cy="96" r="88" fill="none" stroke="#10b981" stroke-width="14" stroke-dasharray="552" stroke-dashoffset="138" stroke-linecap="round" />
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <span class="text-[10px] font-black text-slate-500 uppercase">Total Efficiency</span>
              <span class="text-4xl font-black text-white">75<span class="text-lg">%</span></span>
            </div>
          </div>
          <div class="md:col-span-2 space-y-8">
            <div class="space-y-3">
              <div class="flex justify-between text-[11px] font-black uppercase">
                <span class="text-slate-500">Scope 1 (Direct Emissions)</span>
                <span class="text-emerald-500">112T</span>
              </div>
              <div class="h-3 bg-slate-800 rounded-full overflow-hidden">
                <div class="h-full bg-emerald-500 w-[45%] rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)]"></div>
              </div>
            </div>
            <div class="space-y-3">
              <div class="flex justify-between text-[11px] font-black uppercase">
                <span class="text-slate-500">Scope 2 (Energy Indirect)</span>
                <span class="text-indigo-400">88T</span>
              </div>
              <div class="h-3 bg-slate-800 rounded-full overflow-hidden">
                <div class="h-full bg-indigo-500 w-[30%] rounded-full shadow-[0_0_15px_rgba(99,102,241,0.3)]"></div>
              </div>
            </div>
            <div class="space-y-3">
              <div class="flex justify-between text-[11px] font-black uppercase">
                <span class="text-slate-500">Scope 3 (Supply Chain)</span>
                <span class="text-amber-500">212T</span>
              </div>
              <div class="h-3 bg-slate-800 rounded-full overflow-hidden">
                <div class="h-full bg-amber-500 w-[25%] rounded-full shadow-[0_0_15px_rgba(245,158,11,0.3)]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Compliance & Certs -->
      <div class="bg-emerald-600 rounded-xl p-10 text-white relative overflow-hidden shadow-2xl">
        <div class="absolute -right-8 -top-8 p-8 opacity-20">
          <Award class="w-48 h-48 rotate-12" />
        </div>
        <div class="relative z-10 h-full flex flex-col">
          <h4 class="text-[11px] font-black uppercase tracking-[0.25em] mb-8 text-emerald-100 italic">Compliance Status</h4>
          
          <div class="space-y-10 flex-1">
            <div class="flex items-center gap-5">
              <div class="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/20">
                <ShieldCheck class="w-6 h-6" />
              </div>
              <div>
                <p class="text-sm font-black italic">ISO 14001:2015</p>
                <p class="text-[10px] text-emerald-100 font-bold uppercase tracking-widest">Active & Verified</p>
              </div>
              <div class="ml-auto">
                <div class="w-2 h-2 rounded-full bg-white animate-pulse"></div>
              </div>
            </div>
            
            <div class="flex items-center gap-5">
              <div class="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/20">
                <Award class="w-6 h-6" />
              </div>
              <div>
                <p class="text-sm font-black italic">GRI Standards</p>
                <p class="text-[10px] text-emerald-100 font-bold uppercase tracking-widest">Self-Reported</p>
              </div>
            </div>
          </div>

          <div class="mt-auto pt-8 border-t border-white/20">
             <div class="flex items-center justify-between font-black text-[10px] uppercase tracking-widest">
                <span>ESG Risk Rating</span>
                <span class="bg-white text-emerald-600 px-3 py-1 rounded-lg">Low Risk (8.2)</span>
             </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════ INITIATIVES FEED ══════════════════════════════════ -->
    <div class="bg-slate-900/30 border border-slate-800 rounded-xl p-10">
      <div class="flex items-center justify-between mb-10">
        <div class="flex items-center gap-4">
          <TrendingUp class="w-6 h-6 text-emerald-500" />
          <h4 class="text-sm font-black text-white uppercase tracking-[0.2em]">Strategic <span class="text-emerald-500 italic">Initiatives</span></h4>
        </div>
        <button class="text-xs text-slate-500 font-bold hover:text-white transition-colors">View All Initiatives <ArrowUpRight class="inline w-4 h-4 ml-1" /></button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="init in initiatives" :key="init.id" class="bg-slate-950/60 p-8 rounded-xl border border-slate-800 hover:border-emerald-500/40 transition-all group">
          <div class="flex justify-between items-start mb-6">
            <span class="text-[9px] font-black uppercase tracking-widest text-slate-500 block">{{ init.category }}</span>
            <span :class="[init.impact === 'Very High' ? 'text-amber-400' : 'text-emerald-400']" class="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
              {{ init.impact }} Impact
            </span>
          </div>
          <h5 class="text-base font-black text-white mb-6 group-hover:text-emerald-400 transition-colors">{{ init.title }}</h5>
          
          <div class="space-y-4">
            <div class="flex justify-between items-end">
              <span class="text-[10px] font-bold text-slate-500 uppercase">{{ init.status }}</span>
              <span class="text-xs font-black text-white">{{ init.progress }}%</span>
            </div>
            <div class="h-2 bg-slate-900 rounded-full overflow-hidden">
              <div :style="{ width: `${init.progress}%` }" class="h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.2)]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #1e293b;
  border-radius: 10px;
}
</style>
