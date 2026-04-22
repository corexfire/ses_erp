<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  label: string;
  value: string | number;
  icon?: string;
  color?: 'indigo' | 'emerald' | 'rose' | 'amber' | 'sky' | 'slate' | 'orange' | 'cyan';
  trend?: string;
  trendSeverity?: 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'help' | 'contrast';
  target?: string;
  sparklinePoints?: string;
  loading?: boolean;
  showIcon?: boolean;
  showTrend?: boolean;
  showTarget?: boolean;
  showSparkline?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'pi pi-chart-bar',
  color: 'indigo',
  trendSeverity: 'success',
  loading: false,
  showIcon: true,
  showTrend: true,
  showTarget: true,
  showSparkline: true
});

const themeColors = {
  indigo: '#6366f1',
  emerald: '#10b981',
  rose: '#f43f5e',
  amber: '#f59e0b',
  sky: '#0ea5e9',
  slate: '#64748b',
  orange: '#f97316',
  cyan: '#06b6d4'
};

const textThemes = {
  indigo: 'text-indigo-600',
  emerald: 'text-emerald-600',
  rose: 'text-rose-600',
  amber: 'text-amber-600',
  sky: 'text-sky-600',
  slate: 'text-slate-600',
  orange: 'text-orange-600',
  cyan: 'text-cyan-600'
};

const sparklineColor = computed(() => themeColors[props.color] || themeColors.indigo);
const iconTextColor = computed(() => textThemes[props.color] || textThemes.indigo);
</script>

<template>
  <div class="group p-8 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden h-full">
    <!-- Large Background Icon -->
    <div v-if="props.showIcon" class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
      <i :class="[props.icon, 'text-7xl text-slate-900']"></i>
    </div>
    
    <div class="relative z-10 flex flex-col h-full">
      <!-- Top Section: Icon & Trend -->
      <div class="flex justify-between items-start mb-6">
         <div v-if="props.showIcon" :class="['w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-50 text-xl shadow-sm', iconTextColor]">
           <i :class="props.icon"></i>
         </div>
         <div v-else class="w-12 h-12"></div> <!-- Spacer -->

         <Tag 
           v-if="props.showTrend && props.trend" 
           :value="props.trend" 
           :severity="props.trendSeverity" 
           class="font-black text-[9px] uppercase tracking-widest px-2 py-1" 
         />
      </div>
      
      <!-- Middle Section: Label & Value -->
      <p class="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">{{ props.label }}</p>
      <h3 class="text-3xl font-black text-slate-900 tracking-tight">
        <template v-if="props.loading">—</template>
        <template v-else>{{ props.value }}</template>
      </h3>
      
      <!-- Bottom Section: Target & Sparkline -->
      <div class="mt-auto pt-6 flex items-center justify-between border-t border-slate-50">
        <span v-if="props.showTarget && props.target" class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Target: {{ props.target }}
        </span>
        <span v-else></span>

        <!-- Sparkline SVG -->
        <svg v-if="props.showSparkline && props.sparklinePoints" width="60" height="25" class="overflow-visible">
          <polyline
            fill="none"
            :stroke="sparklineColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            :points="props.sparklinePoints"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
