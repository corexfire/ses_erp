<script setup lang="ts">
interface Props {
  badge?: string;
  badgeAccent?: string;
  title?: string;
  titleAccent?: string;
  description?: string;
  statusLabel?: string;
  statusValue?: string;
  statusIcon?: string;
  statusSeverity?: 'success' | 'warning' | 'danger' | 'info';
  loading?: boolean;
  hideRefresh?: boolean;
  color?: 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone' | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose' | 'white' | 'black' | 'ghost' | 'glass' | 'sunset' | 'ocean' | 'forest' | 'candy' | 'coffee' | 'royal';
  variant?: 'dark' | 'light';
}

const props = withDefaults(defineProps<Props>(), {
  badge: 'Command Center',
  badgeAccent: 'Intelligence',
  title: 'Dashboard',
  titleAccent: 'Pulse',
  description: 'Welcome back to the system.',
  statusLabel: '',
  statusValue: '',
  statusIcon: 'pi pi-check-circle',
  statusSeverity: 'success',
  loading: false,
  hideRefresh: false,
  color: 'slate',
  variant: 'dark'
});

const themeClasses = {
  slate: { bg: 'bg-slate-900', circle1: 'bg-indigo-500/10', circle2: 'bg-cyan-500/10', badgeAccent: 'text-indigo-400', titleGradient: 'from-indigo-400 to-cyan-400', lightCircle1: 'bg-indigo-50', lightCircle2: 'bg-cyan-50' },
  gray: { bg: 'bg-gray-900', circle1: 'bg-gray-400/10', circle2: 'bg-slate-400/10', badgeAccent: 'text-gray-400', titleGradient: 'from-gray-300 to-slate-400', lightCircle1: 'bg-gray-50', lightCircle2: 'bg-slate-50' },
  zinc: { bg: 'bg-zinc-900', circle1: 'bg-zinc-400/10', circle2: 'bg-neutral-400/10', badgeAccent: 'text-zinc-400', titleGradient: 'from-zinc-300 to-neutral-400', lightCircle1: 'bg-zinc-50', lightCircle2: 'bg-neutral-50' },
  neutral: { bg: 'bg-neutral-900', circle1: 'bg-neutral-400/10', circle2: 'bg-stone-400/10', badgeAccent: 'text-neutral-400', titleGradient: 'from-neutral-300 to-stone-400', lightCircle1: 'bg-neutral-50', lightCircle2: 'bg-stone-50' },
  stone: { bg: 'bg-stone-900', circle1: 'bg-stone-400/10', circle2: 'bg-orange-400/10', badgeAccent: 'text-stone-400', titleGradient: 'from-stone-300 to-orange-400', lightCircle1: 'bg-stone-50', lightCircle2: 'bg-orange-50' },
  red: { bg: 'bg-red-950', circle1: 'bg-red-400/20', circle2: 'bg-orange-400/20', badgeAccent: 'text-red-300', titleGradient: 'from-red-300 to-orange-300', lightCircle1: 'bg-red-50', lightCircle2: 'bg-orange-50' },
  orange: { bg: 'bg-orange-950', circle1: 'bg-orange-400/20', circle2: 'bg-amber-400/20', badgeAccent: 'text-orange-300', titleGradient: 'from-orange-300 to-amber-300', lightCircle1: 'bg-orange-50', lightCircle2: 'bg-amber-50' },
  amber: { bg: 'bg-amber-950', circle1: 'bg-amber-400/20', circle2: 'bg-orange-400/20', badgeAccent: 'text-amber-300', titleGradient: 'from-amber-300 to-orange-300', lightCircle1: 'bg-amber-50', lightCircle2: 'bg-orange-50' },
  yellow: { bg: 'bg-yellow-950', circle1: 'bg-yellow-400/20', circle2: 'bg-lime-400/20', badgeAccent: 'text-yellow-300', titleGradient: 'from-yellow-300 to-lime-300', lightCircle1: 'bg-yellow-50', lightCircle2: 'bg-lime-50' },
  lime: { bg: 'bg-lime-950', circle1: 'bg-lime-400/20', circle2: 'bg-green-400/20', badgeAccent: 'text-lime-300', titleGradient: 'from-lime-300 to-green-300', lightCircle1: 'bg-lime-50', lightCircle2: 'bg-green-50' },
  green: { bg: 'bg-green-950', circle1: 'bg-green-400/20', circle2: 'bg-emerald-400/20', badgeAccent: 'text-green-300', titleGradient: 'from-green-300 to-emerald-300', lightCircle1: 'bg-green-50', lightCircle2: 'bg-emerald-50' },
  emerald: { bg: 'bg-emerald-950', circle1: 'bg-emerald-400/20', circle2: 'bg-teal-400/20', badgeAccent: 'text-emerald-300', titleGradient: 'from-emerald-300 to-teal-300', lightCircle1: 'bg-emerald-50', lightCircle2: 'bg-teal-50' },
  teal: { bg: 'bg-teal-950', circle1: 'bg-teal-400/20', circle2: 'bg-cyan-400/20', badgeAccent: 'text-teal-300', titleGradient: 'from-teal-300 to-cyan-300', lightCircle1: 'bg-teal-50', lightCircle2: 'bg-cyan-50' },
  cyan: { bg: 'bg-cyan-950', circle1: 'bg-cyan-400/20', circle2: 'bg-sky-400/20', badgeAccent: 'text-cyan-300', titleGradient: 'from-cyan-300 to-sky-300', lightCircle1: 'bg-cyan-50', lightCircle2: 'bg-sky-50' },
  sky: { bg: 'bg-sky-950', circle1: 'bg-sky-400/20', circle2: 'bg-cyan-400/20', badgeAccent: 'text-sky-300', titleGradient: 'from-sky-300 to-cyan-300', lightCircle1: 'bg-sky-50', lightCircle2: 'bg-cyan-50' },
  blue: { bg: 'bg-blue-950', circle1: 'bg-blue-400/20', circle2: 'bg-indigo-400/20', badgeAccent: 'text-blue-300', titleGradient: 'from-blue-300 to-indigo-300', lightCircle1: 'bg-blue-50', lightCircle2: 'bg-indigo-50' },
  indigo: { bg: 'bg-indigo-950', circle1: 'bg-indigo-400/20', circle2: 'bg-sky-400/20', badgeAccent: 'text-indigo-300', titleGradient: 'from-indigo-300 to-sky-300', lightCircle1: 'bg-indigo-50', lightCircle2: 'bg-sky-50' },
  violet: { bg: 'bg-violet-950', circle1: 'bg-violet-400/20', circle2: 'bg-purple-400/20', badgeAccent: 'text-violet-300', titleGradient: 'from-violet-300 to-purple-300', lightCircle1: 'bg-violet-50', lightCircle2: 'bg-purple-50' },
  purple: { bg: 'bg-purple-950', circle1: 'bg-purple-400/20', circle2: 'bg-fuchsia-400/20', badgeAccent: 'text-purple-300', titleGradient: 'from-purple-300 to-fuchsia-300', lightCircle1: 'bg-purple-50', lightCircle2: 'bg-fuchsia-50' },
  fuchsia: { bg: 'bg-fuchsia-950', circle1: 'bg-fuchsia-400/20', circle2: 'bg-pink-400/20', badgeAccent: 'text-fuchsia-300', titleGradient: 'from-fuchsia-300 to-pink-300', lightCircle1: 'bg-fuchsia-50', lightCircle2: 'bg-pink-50' },
  pink: { bg: 'bg-pink-950', circle1: 'bg-pink-400/20', circle2: 'bg-rose-400/20', badgeAccent: 'text-pink-300', titleGradient: 'from-pink-300 to-rose-300', lightCircle1: 'bg-pink-50', lightCircle2: 'bg-rose-50' },
  rose: { bg: 'bg-rose-950', circle1: 'bg-rose-400/20', circle2: 'bg-pink-400/20', badgeAccent: 'text-rose-300', titleGradient: 'from-rose-300 to-pink-300', lightCircle1: 'bg-rose-50', lightCircle2: 'bg-pink-50' },
  // Special Themes
  white: { bg: 'bg-white border border-slate-200', circle1: 'bg-slate-100', circle2: 'bg-indigo-50', badgeAccent: 'text-indigo-600', titleGradient: 'from-indigo-600 to-sky-500', isLight: true, lightCircle1: 'bg-slate-100', lightCircle2: 'bg-indigo-50' },
  black: { bg: 'bg-black', circle1: 'bg-white/5', circle2: 'bg-indigo-500/10', badgeAccent: 'text-slate-400', titleGradient: 'from-white to-slate-500', lightCircle1: 'bg-white/5', lightCircle2: 'bg-indigo-50' },
  ghost: { bg: 'bg-slate-50 border border-slate-200', circle1: 'bg-white', circle2: 'bg-slate-100', badgeAccent: 'text-slate-600', titleGradient: 'from-slate-700 to-slate-400', isLight: true, lightCircle1: 'bg-white', lightCircle2: 'bg-slate-100' },
  glass: { bg: 'bg-white/80 backdrop-blur-md border border-white/20', circle1: 'bg-indigo-100/50', circle2: 'bg-sky-100/50', badgeAccent: 'text-indigo-600', titleGradient: 'from-indigo-600 to-sky-500', isLight: true, lightCircle1: 'bg-indigo-100/50', lightCircle2: 'bg-sky-100/50' },
  sunset: { bg: 'bg-orange-950', circle1: 'bg-rose-500/20', circle2: 'bg-amber-500/20', badgeAccent: 'text-rose-300', titleGradient: 'from-rose-400 to-amber-300', lightCircle1: 'bg-rose-50', lightCircle2: 'bg-amber-50' },
  ocean: { bg: 'bg-cyan-950', circle1: 'bg-blue-500/20', circle2: 'bg-emerald-500/20', badgeAccent: 'text-sky-300', titleGradient: 'from-sky-400 to-emerald-300', lightCircle1: 'bg-blue-50', lightCircle2: 'bg-emerald-50' },
  forest: { bg: 'bg-green-950', circle1: 'bg-emerald-500/20', circle2: 'bg-lime-500/20', badgeAccent: 'text-emerald-300', titleGradient: 'from-emerald-400 to-lime-300', lightCircle1: 'bg-emerald-50', lightCircle2: 'bg-lime-50' },
  candy: { bg: 'bg-pink-950', circle1: 'bg-fuchsia-500/20', circle2: 'bg-rose-500/20', badgeAccent: 'text-fuchsia-300', titleGradient: 'from-fuchsia-400 to-rose-300', lightCircle1: 'bg-fuchsia-50', lightCircle2: 'bg-rose-50' },
  coffee: { bg: 'bg-[#1a1412]', circle1: 'bg-orange-900/20', circle2: 'bg-stone-800/20', badgeAccent: 'text-orange-300', titleGradient: 'from-orange-400 to-stone-400', lightCircle1: 'bg-orange-50', lightCircle2: 'bg-stone-50' },
  royal: { bg: 'bg-indigo-950', circle1: 'bg-amber-500/10', circle2: 'bg-indigo-400/20', badgeAccent: 'text-amber-400', titleGradient: 'from-amber-400 to-indigo-300', lightCircle1: 'bg-amber-50', lightCircle2: 'bg-indigo-50' }
};

const currentTheme = computed(() => themeClasses[props.color as keyof typeof themeClasses] || themeClasses.slate);

const isActuallyLight = computed(() => props.variant === 'light' || (currentTheme.value as any).isLight);

const statusColorClass = computed(() => {
  switch (props.statusSeverity) {
    case 'warning': return 'text-amber-500';
    case 'danger': return 'text-rose-500';
    case 'info': return 'text-sky-500';
    default: return 'text-emerald-500';
  }
});

defineEmits(['refresh']);
</script>

<template>
  <div :class="[
    'flex flex-col md:flex-row md:items-end justify-between gap-4 relative overflow-hidden p-6 rounded-xl transition-all duration-700 shadow-2xl',
    isActuallyLight ? 'bg-white text-slate-900 shadow-sm' : 'text-white ',
    currentTheme.bg
  ]">
    <!-- Abstract Background Elements -->
    <div :class="[
      'absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] -mr-64 -mt-64 transition-all duration-1000',
      isActuallyLight ? (currentTheme.lightCircle1 || currentTheme.circle1) + '/30' : currentTheme.circle1
    ]"></div>
    <div :class="[
      'absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[80px] -ml-40 -mb-40 transition-all duration-1000',
      isActuallyLight ? (currentTheme.lightCircle2 || currentTheme.circle2) + '/30' : currentTheme.circle2
    ]"></div>
    
    <!-- Left Content -->
    <div class="relative z-10">
      <div class="flex items-center gap-3 mb-4">
         <span :class="[
           'px-4 py-1 text-[10px] font-black uppercase tracking-[0.25em] rounded-full border',
           isActuallyLight ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-white/10 backdrop-blur-xl text-white border-white/20'
         ]">{{ props.badge }}</span>
         <span class="opacity-20">/</span>
         <span :class="['text-[10px] font-bold uppercase tracking-widest', currentTheme.badgeAccent]">{{ props.badgeAccent }}</span>
      </div>
      <h1 :class="['text-4xl font-black tracking-tighter mb-4 uppercase leading-none', isActuallyLight ? 'text-slate-900' : 'text-white']">
        {{ props.title }} 
        <span :class="['text-transparent bg-clip-text bg-gradient-to-r font-black italic', currentTheme.titleGradient]">{{ props.titleAccent }}</span>
      </h1>
      <p :class="['text-sm font-medium', isActuallyLight ? 'text-slate-500' : 'text-slate-400']">
        <slot name="description">
          {{ props.description }}
        </slot>
      </p>
    </div>

    <!-- Right Content (Actions/Status) -->
    <div class="flex items-center gap-4 relative z-10">
      <slot name="right">
        <!-- Status Section -->
        <slot name="status">
          <div v-if="statusLabel || statusValue" class="hidden sm:flex flex-col items-end">
            <span :class="['text-[10px] font-black uppercase tracking-widest mb-0.5', isActuallyLight ? 'text-slate-400' : 'text-slate-500']">{{ statusLabel }}</span>
            <div class="flex items-center gap-1.5">
              <i :class="[statusIcon || 'pi pi-check-circle', statusColorClass, 'text-[10px]']"></i> 
              <span :class="[statusColorClass, 'font-bold text-xs whitespace-nowrap']">{{ statusValue }}</span>
            </div>
          </div>
        </slot>

        <!-- Dynamic Divider -->
        <div 
          v-if="(statusLabel || statusValue || $slots.status) && (!hideRefresh || $slots.actions)" 
          :class="['hidden sm:block h-8 w-px mx-2', isActuallyLight ? 'bg-slate-200' : 'bg-white/10']"
        ></div>

        <!-- Actions Section -->
        <div class="flex items-center gap-2">
          <slot name="actions">
            <Button 
              v-if="!hideRefresh"
              icon="pi pi-refresh" 
              severity="secondary" 
              rounded 
              text 
              @click="$emit('refresh')" 
              :loading="loading" 
              :class="[isActuallyLight ? 'text-slate-400 hover:bg-slate-100' : 'text-white hover:bg-white/10']" 
            />
          </slot>
        </div>
      </slot>
    </div>
  </div>
</template>
