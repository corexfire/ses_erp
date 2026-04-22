<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  title: string;
  bgIcon?: string;
  theme?: 'indigo' | 'slate' | 'emerald' | 'rose' | 'amber' | 'violet' | 'cyan' | 'black';
}

const props = withDefaults(defineProps<Props>(), {
  bgIcon: 'pi pi-map',
  theme: 'indigo'
});

const themeClasses = {
  indigo: { box: 'bg-indigo-950 shadow-indigo-900/40', text: 'text-indigo-300', icon: 'text-white' },
  slate: { box: 'bg-slate-900 shadow-slate-900/40', text: 'text-slate-400', icon: 'text-white' },
  emerald: { box: 'bg-emerald-950 shadow-emerald-900/40', text: 'text-emerald-300', icon: 'text-white' },
  rose: { box: 'bg-rose-950 shadow-rose-900/40', text: 'text-rose-300', icon: 'text-white' },
  amber: { box: 'bg-amber-950 shadow-amber-900/40', text: 'text-amber-300', icon: 'text-white' },
  violet: { box: 'bg-violet-950 shadow-violet-900/40', text: 'text-violet-300', icon: 'text-white' },
  cyan: { box: 'bg-cyan-950 shadow-cyan-900/40', text: 'text-cyan-300', icon: 'text-white' },
  black: { box: 'bg-black shadow-black/40', text: 'text-slate-400', icon: 'text-white' }
};

const currentTheme = computed(() => themeClasses[props.theme] || themeClasses.indigo);
</script>

<template>
  <div :class="['rounded-xl p-10 text-white relative overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.02]', currentTheme.box]">
    <!-- Background Icon Decoration -->
    <div class="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
      <i :class="[props.bgIcon, 'text-9xl']"></i>
    </div>

    <!-- Header Title -->
    <h4 :class="['text-[11px] font-black uppercase tracking-[0.25em] mb-4', currentTheme.text]">
      {{ props.title }}
    </h4>

    <!-- Content Slot -->
    <div class="space-y-6 relative z-10">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="postcss">
/* Custom styles if needed */
</style>
