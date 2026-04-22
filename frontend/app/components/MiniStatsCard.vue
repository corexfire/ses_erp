<script setup lang="ts">
interface Props {
  label: string;
  value: string | number;
  sub?: string;
  icon?: string;
  subColor?: 'emerald' | 'blue' | 'amber' | 'rose' | 'slate' | 'indigo' | 'sky' | 'cyan';
  iconColor?: 'emerald' | 'blue' | 'amber' | 'rose' | 'slate' | 'indigo' | 'sky' | 'cyan';
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'pi pi-chart-bar',
  subColor: 'slate',
  iconColor: 'slate'
});

const subColorClasses = {
  emerald: 'bg-emerald-50 text-emerald-600',
  blue: 'bg-blue-50 text-blue-600',
  amber: 'bg-amber-50 text-amber-600',
  rose: 'bg-rose-50 text-rose-600',
  slate: 'bg-slate-50 text-slate-600',
  indigo: 'bg-indigo-50 text-indigo-600',
  sky: 'bg-sky-50 text-sky-600',
  cyan: 'bg-cyan-50 text-cyan-600'
};

const iconColorClasses = {
  emerald: 'text-emerald-500',
  blue: 'text-blue-500',
  amber: 'text-amber-500',
  rose: 'text-rose-500',
  slate: 'text-slate-400',
  indigo: 'text-indigo-500',
  sky: 'text-sky-500',
  cyan: 'text-cyan-500'
};

const glowColorClasses = {
  emerald: 'group-hover:bg-emerald-50',
  blue: 'group-hover:bg-blue-50',
  amber: 'group-hover:bg-amber-50',
  rose: 'group-hover:bg-rose-50',
  slate: 'group-hover:bg-indigo-50',
  indigo: 'group-hover:bg-indigo-50',
  sky: 'group-hover:bg-sky-50',
  cyan: 'group-hover:bg-cyan-50'
};

const currentSubColor = computed(() => subColorClasses[props.subColor] || subColorClasses.slate);
const currentIconColor = computed(() => iconColorClasses[props.iconColor] || iconColorClasses.slate);
const currentGlowColor = computed(() => glowColorClasses[props.iconColor] || glowColorClasses.slate);
</script>

<template>
  <div class="group p-5 rounded-2xl bg-white border border-slate-200 shadow-sm transition-all duration-500 hover:shadow-2xl hover:border-indigo-200 hover:-translate-y-1.5 relative overflow-hidden">
    <!-- Background Glow on Hover -->
    <div :class="['absolute -right-4 -top-4 w-24 h-24 bg-slate-50 rounded-full blur-2xl transition-colors duration-500', currentGlowColor]"></div>
    
    <!-- Large Background Icon -->
    <div :class="['absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700', currentIconColor]">
      <i :class="[icon, 'text-7xl']"></i>
    </div>
    
    <!-- Content -->
    <div class="relative z-10">
      <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 group-hover:text-indigo-400 transition-colors">{{ label }}</p>
      <h3 class="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase truncate tracking-tighter">{{ value }}</h3>
      
      <div v-if="sub" class="flex items-center gap-2 mt-3">
        <span :class="['text-[10px] font-bold px-2.5 py-1 rounded-lg transition-transform group-hover:scale-105', currentSubColor]">
          {{ sub }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
/* Ensure smooth scaling and transitions */
.group {
  will-change: transform, box-shadow;
}
</style>
