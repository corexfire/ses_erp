<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  Activity, 
  Target, 
  MapPin, 
  Calendar, 
  Users, 
  HardHat, 
  CloudSun, 
  AlertTriangle,
  ArrowUpRight,
  ChevronDown,
  LayoutGrid,
  History,
  ShieldCheck
} from 'lucide-vue-next'

const selectedProject = ref('P-2024-X12')
const projects = ref([
  { id: 'P-2024-X12', name: 'Pembangunan Gedung SES Hub Jakarta', manager: 'Budi Santoso', budget: 12500000000 },
  { id: 'P-2024-S01', name: 'Renovasi Site Office Surabaya', manager: 'Siti Aminah', budget: 1200000000 },
])

const milestones = ref([
  { id: 1, name: 'Pondasi & Bored Pile', weight: 15, plan: '100%', actual: '100%', status: 'Completed', color: 'emerald' },
  { id: 2, name: 'Struktur Lantai 1-3', weight: 25, plan: '100%', actual: '92%', status: 'At Risk', color: 'amber' },
  { id: 3, name: 'Struktur Lantai 4-8', weight: 30, plan: '40%', actual: '35%', status: 'In Progress', color: 'indigo' },
  { id: 4, name: 'MEP (Mechanical/Electrical)', weight: 20, plan: '10%', actual: '5%', status: 'Behind', color: 'rose' },
])

const dailyStats = ref([
  { label: 'Manpower', value: '142', unit: 'Persons', icon: Users, color: 'text-indigo-400' },
  { label: 'Equipment', value: '18', unit: 'Units', icon: HardHat, color: 'text-amber-400' },
  { label: 'Incident Free', value: '312', unit: 'Days', icon: ShieldCheck, color: 'text-emerald-400' },
  { label: 'Weather', value: 'Sunny', unit: '28°C', icon: CloudSun, color: 'text-blue-400' }
])

// S-Curve Points (Simplified for SVG)
const planPoints = "0,200 50,195 100,180 150,150 200,100 250,60 300,30 350,15 400,10"
const actualPoints = "0,200 50,200 100,190 150,165 200,120 250,90 300,75"

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val)
}
</script>

<template>
  <div class="min-h-screen bg-[#020617] text-slate-200 p-6 md:p-8 space-y-8 font-sans">
    <!-- Header -->
    <header class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
      <div class="space-y-1">
        <h1 class="text-3xl font-black text-white tracking-tight flex items-center gap-3">
          <Activity class="w-8 h-8 text-amber-500" />
          Construction <span class="text-amber-500 italic">Progress Intelligence</span>
        </h1>
        <p class="text-slate-400 text-sm font-medium">Monitoring Real-time Project Execution & S-Curve Analytics.</p>
      </div>

      <div class="flex items-center gap-3 w-full lg:w-auto">
        <div class="flex-1 lg:flex-none relative">
          <select v-model="selectedProject" class="w-full lg:w-80 bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm font-bold appearance-none outline-none focus:ring-2 ring-amber-500/50">
            <option v-for="p in projects" :key="p.id" :value="p.id">[{{ p.id }}] {{ p.name }}</option>
          </select>
          <ChevronDown class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
        </div>
        <button class="bg-amber-600 hover:bg-amber-500 text-white px-5 py-3 rounded-xl font-bold transition-all shadow-lg shadow-amber-900/40 shrink-0">
          Sync Site Data
        </button>
      </div>
    </header>

    <!-- S-Curve Section -->
    <div class="bg-slate-900/50 border border-slate-800 rounded-xl p-8 overflow-hidden relative group">
      <div class="absolute -right-20 -top-20 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"></div>
      
      <div class="flex flex-col md:flex-row justify-between items-start mb-10 gap-6">
        <div>
          <h3 class="text-xl font-black text-white uppercase tracking-tight">Project <span class="text-amber-500 italic">S-Curve</span></h3>
          <p class="text-xs text-slate-500 font-medium mt-1">Comparing cumulative planned vs. actual progress.</p>
        </div>
        <div class="flex items-center gap-6 bg-slate-950 px-6 py-3 rounded-2xl border border-slate-800">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-slate-400"></div>
            <span class="text-[10px] font-black uppercase text-slate-400 tracking-widest">Planned</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-amber-500"></div>
            <span class="text-[10px] font-black uppercase text-amber-500 tracking-widest">Actual (8.2% Gap)</span>
          </div>
        </div>
      </div>

      <!-- S-Curve Visualization -->
      <div class="relative h-64 mb-6">
        <svg class="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 200">
          <!-- Grid Lines -->
          <line x1="0" y1="0" x2="400" y2="0" stroke="#1e293b" stroke-width="0.5" />
          <line x1="0" y1="50" x2="400" y2="50" stroke="#1e293b" stroke-width="0.5" />
          <line x1="0" y1="100" x2="400" y2="100" stroke="#1e293b" stroke-width="0.5" />
          <line x1="0" y1="150" x2="400" y2="150" stroke="#1e293b" stroke-width="0.5" />
          
          <!-- Planned Line -->
          <polyline :points="planPoints" fill="none" stroke="#64748b" stroke-width="3" stroke-dasharray="5 5" stroke-linecap="round" />
          <!-- Actual Line -->
          <polyline :points="actualPoints" fill="none" stroke="#f59e0b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
          
          <!-- Current Indicator -->
          <circle cx="300" cy="75" r="5" fill="#f59e0b" />
          <line x1="300" y1="75" x2="300" y2="200" stroke="#f59e0b" stroke-width="1" stroke-dasharray="2 2" />
        </svg>
        
        <!-- Y-Axis Labels -->
        <div class="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] font-bold text-slate-600 -translate-x-full pr-4">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
          <span>0%</span>
        </div>
      </div>
      
      <!-- X-Axis Labels -->
      <div class="flex justify-between px-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span>
      </div>
    </div>

    <!-- Stats Matrix -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div v-for="s in dailyStats" :key="s.label" class="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl group">
        <div class="flex justify-between items-start mb-4">
          <div class="p-3 bg-slate-950 rounded-2xl border border-slate-800">
            <component :is="s.icon" :class="[s.color, 'w-5 h-5']" />
          </div>
          <span class="text-[9px] font-black uppercase text-slate-500 tracking-widest bg-slate-950 px-2 py-1 rounded-lg">Today</span>
        </div>
        <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{{ s.label }}</p>
        <div class="flex items-baseline gap-2">
          <h3 class="text-3xl font-black text-white leading-none group-hover:text-amber-500 transition-colors">{{ s.value }}</h3>
          <span class="text-xs font-bold text-slate-500">{{ s.unit }}</span>
        </div>
      </div>
    </div>

    <!-- Milestones & Logs -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
      
      <!-- Milestone Tracking -->
      <div class="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-xl p-10 flex flex-col">
        <div class="flex items-center justify-between mb-8">
          <h4 class="text-sm font-black text-white uppercase tracking-widest">Execution <span class="text-amber-500 italic">Milestones</span></h4>
          <LayoutGrid class="w-4 h-4 text-slate-500" />
        </div>

        <div class="space-y-6 flex-1">
          <div v-for="m in milestones" :key="m.id" class="p-5 rounded-2xl bg-slate-950/50 border border-slate-800 group hover:border-slate-600 transition-all cursor-pointer">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-3">
              <div class="flex items-center gap-4">
                <div :class="[`bg-${m.color}-500/10 text-${m.color}-400 border-${m.color}-500/20`]" class="w-10 h-10 rounded-xl flex items-center justify-center border font-black">
                  {{ m.id }}
                </div>
                <div>
                  <h5 class="text-sm font-black text-white group-hover:text-amber-500 transition-colors">{{ m.name }}</h5>
                  <p class="text-[10px] text-slate-500 font-bold uppercase mt-0.5">Weight: {{ m.weight }}% of Total Project</p>
                </div>
              </div>
              <div class="flex items-baseline gap-4">
                <div class="text-right">
                  <p class="text-[9px] text-slate-500 font-black uppercase tracking-widest">Plan</p>
                  <p class="text-xs font-black text-slate-300">{{ m.plan }}</p>
                </div>
                <div class="h-8 w-px bg-slate-800"></div>
                <div class="text-right">
                  <p class="text-[9px] text-amber-500 font-black uppercase tracking-widest">Actual</p>
                  <p class="text-xs font-black text-amber-500">{{ m.actual }}</p>
                </div>
              </div>
            </div>
            
            <div class="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
               <div :style="{ width: m.actual }" :class="[`bg-${m.color}-500`]" class="h-full rounded-full shadow-[0_0_10px_rgba(245,158,11,0.2)]"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Live Site Feed -->
      <div class="bg-slate-900/40 border border-slate-800 rounded-xl p-8 flex flex-col">
        <h4 class="text-sm font-black text-white uppercase tracking-widest mb-8 flex items-center gap-3">
          <History class="w-4 h-4 text-emerald-500" />
          Site Reports
        </h4>
        
        <div class="space-y-6 flex-1">
          <div v-for="i in 3" :key="i" class="flex gap-4 group">
            <div class="flex flex-col items-center">
              <div class="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-black z-10">
                {{ 24 + i }}
              </div>
              <div v-if="i < 3" class="w-0.5 flex-1 bg-slate-800 my-1"></div>
            </div>
            <div class="flex-1 pb-6">
              <span class="text-[9px] font-black text-slate-500 uppercase tracking-widest">2{{ 24+i }} April 2024 · 17:00</span>
              <p class="text-xs text-slate-300 font-medium leading-relaxed mt-1">Laporan Harian #{{ 1024+i }}: Pengecoran plat lantai 4 zona B selesai. Sisa volume aman. Kendala cuaca hujan ringan sore hari.</p>
              <div class="mt-3 flex gap-2">
                <div v-for="j in 2" :key="j" class="w-16 h-10 bg-slate-800 rounded-lg overflow-hidden border border-slate-700 group-hover:border-slate-500 transition-all cursor-pointer flex items-center justify-center">
                   <MapPin class="w-4 h-4 text-slate-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <button class="w-full py-4 border border-slate-800 rounded-[1.5rem] hover:bg-slate-800/50 text-[10px] font-black uppercase tracking-widest text-slate-500 transition-all flex items-center justify-center gap-2">
          Browse Archive <ArrowUpRight class="w-3 h-3" />
        </button>
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
@keyframes pulse-soft {
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
}
.pulse {
  animation: pulse-soft 2s infinite;
}
</style>
