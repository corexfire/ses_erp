<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  title: string;
  value: string | number;
  unit?: string;
  icon?: string;
  variant?: 'light' | 'dark';
  color?: 'indigo' | 'emerald' | 'rose' | 'amber' | 'sky' | 'slate';
  pulse?: boolean;
  mono?: boolean;
  minWidth?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'light',
  color: 'slate',
  pulse: false,
  mono: false,
  minWidth: '160px'
});

const themes = {
  indigo: {
    card: 'bg-indigo-900 text-white shadow-xl border-indigo-800 hover:bg-indigo-950',
    title: 'text-indigo-300 opacity-80',
    iconBox: 'bg-indigo-600 text-indigo-100 shadow-lg',
    value: 'text-white'
  },
  emerald: {
    card: 'bg-emerald-900 text-white shadow-xl border-emerald-800 hover:bg-emerald-950',
    title: 'text-emerald-300 opacity-80',
    iconBox: 'bg-emerald-600 text-emerald-100 shadow-lg',
    value: 'text-white'
  },
  rose: {
    card: 'bg-rose-900 text-white shadow-xl border-rose-800 hover:bg-rose-950',
    title: 'text-rose-300 opacity-80',
    iconBox: 'bg-rose-600 text-rose-100 shadow-lg',
    value: 'text-white'
  },
  amber: {
    card: 'bg-amber-900 text-white shadow-xl border-amber-800 hover:bg-amber-950',
    title: 'text-amber-300 opacity-80',
    iconBox: 'bg-amber-600 text-amber-100 shadow-lg',
    value: 'text-white'
  },
  sky: {
    card: 'bg-sky-900 text-white shadow-xl border-sky-800 hover:bg-sky-950',
    title: 'text-sky-300 opacity-80',
    iconBox: 'bg-sky-600 text-sky-100 shadow-lg',
    value: 'text-white'
  },
  slate: {
    card: 'bg-slate-900 text-white shadow-xl border-slate-800 hover:bg-slate-950',
    title: 'text-slate-300 opacity-80',
    iconBox: 'bg-slate-600 text-slate-100 shadow-lg',
    value: 'text-white'
  }
};

const cardClasses = computed(() => {
  if (props.variant === 'dark') {
    return themes[props.color]?.card || themes.indigo.card;
  }
  return 'bg-white text-slate-900 border-slate-200 shadow-sm hover:shadow-lg';
});

const titleClasses = computed(() => {
  if (props.variant === 'dark') {
    return themes[props.color]?.title || themes.indigo.title;
  }
  return 'text-slate-400';
});

const iconBoxClasses = computed(() => {
  if (props.variant === 'dark') {
    return themes[props.color]?.iconBox || themes.indigo.iconBox;
  }
  return 'bg-slate-50 text-slate-400 border border-slate-100';
});

const valueColorClass = computed(() => {
  if (props.variant === 'dark') return 'text-white';
  return 'text-slate-900';
});

defineEmits(['refresh']);
</script>

<template>
  <div 
    :class="[
      'p-5 rounded-2xl flex flex-col justify-between border transition-all group',
      cardClasses
    ]"
    :style="{ minWidth: props.minWidth }"
  >
    <!-- Title -->
    <div :class="['text-[10px] font-black uppercase tracking-[0.2em] mb-3', titleClasses]">
      {{ props.title }}
    </div>

    <!-- Value & Icon -->
    <div class="flex items-end justify-between">
      <slot name="value">
        <h3 :class="[
          'font-black tracking-tighter leading-none',
          valueColorClass,
          props.mono ? 'font-mono text-xl' : 'text-2xl',
        ]">
          {{ props.value }}
          <span v-if="props.unit" class="text-xs text-slate-400 uppercase font-sans ml-1">{{ props.unit }}</span>
        </h3>
      </slot>

      <slot name="icon">
        <div v-if="props.icon" :class="[
          'p-2 rounded-xl transition-all',
          iconBoxClasses,
          { 'animate-pulse': props.pulse }
        ]">
          <i :class="[props.icon, 'text-xs']"></i>
        </div>
      </slot>
    </div>
  </div>
</template>

