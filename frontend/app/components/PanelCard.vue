<script setup lang="ts">
import { computed } from 'vue';
interface Props {
  title: string;
  subtitle: string;
  icon?: string;
  theme?: 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone' | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose' | 'white' | 'black' | 'ghost' | 'glass' | 'sunset' | 'ocean' | 'forest' | 'candy' | 'coffee' | 'royal';
  loading?: boolean;
  searchPlaceholder?: string;
  showSearch?: boolean;
  showFilter?: boolean;
  showIcon?: boolean;
  showRefresh?: boolean;
  flatControls?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'pi pi-list',
  theme: 'emerald',
  searchPlaceholder: 'Cari data...',
  loading: false,
  showSearch: true,
  showFilter: true,
  showIcon: true,
  showRefresh: true,
  flatControls: false
});

const search = defineModel<string>('search');
const filter = defineModel<any>('filter');

defineEmits(['refresh']);

const themeClasses = {
  slate: { box: 'bg-slate-900', icon: 'text-slate-400', blur: 'bg-slate-400/20' },
  gray: { box: 'bg-gray-900', icon: 'text-gray-400', blur: 'bg-gray-400/20' },
  zinc: { box: 'bg-zinc-900', icon: 'text-zinc-400', blur: 'bg-zinc-400/20' },
  neutral: { box: 'bg-neutral-900', icon: 'text-neutral-400', blur: 'bg-neutral-400/20' },
  stone: { box: 'bg-stone-900', icon: 'text-stone-400', blur: 'bg-stone-400/20' },
  red: { box: 'bg-red-950', icon: 'text-red-400', blur: 'bg-red-400/20' },
  orange: { box: 'bg-orange-950', icon: 'text-orange-400', blur: 'bg-orange-400/20' },
  amber: { box: 'bg-amber-950', icon: 'text-amber-400', blur: 'bg-amber-400/20' },
  yellow: { box: 'bg-yellow-950', icon: 'text-yellow-400', blur: 'bg-yellow-400/20' },
  lime: { box: 'bg-lime-950', icon: 'text-lime-400', blur: 'bg-lime-400/20' },
  green: { box: 'bg-green-950', icon: 'text-green-400', blur: 'bg-green-400/20' },
  emerald: { box: 'bg-slate-900', icon: 'text-emerald-400', blur: 'bg-emerald-200/20' },
  teal: { box: 'bg-teal-950', icon: 'text-teal-400', blur: 'bg-teal-400/20' },
  cyan: { box: 'bg-cyan-950', icon: 'text-cyan-400', blur: 'bg-cyan-400/20' },
  sky: { box: 'bg-sky-950', icon: 'text-sky-400', blur: 'bg-sky-400/20' },
  blue: { box: 'bg-blue-950', icon: 'text-blue-400', blur: 'bg-blue-400/20' },
  indigo: { box: 'bg-indigo-950', icon: 'text-indigo-400', blur: 'bg-indigo-400/20' },
  violet: { box: 'bg-violet-950', icon: 'text-violet-400', blur: 'bg-violet-400/20' },
  purple: { box: 'bg-purple-950', icon: 'text-purple-400', blur: 'bg-purple-400/20' },
  fuchsia: { box: 'bg-fuchsia-950', icon: 'text-fuchsia-400', blur: 'bg-fuchsia-400/20' },
  pink: { box: 'bg-pink-950', icon: 'text-pink-400', blur: 'bg-pink-400/20' },
  rose: { box: 'bg-rose-950', icon: 'text-rose-400', blur: 'bg-rose-400/20' },
  white: { box: 'bg-white border border-slate-200', icon: 'text-indigo-600', blur: 'bg-indigo-50' },
  black: { box: 'bg-black', icon: 'text-white', blur: 'bg-white/5' },
  ghost: { box: 'bg-slate-100', icon: 'text-slate-600', blur: 'bg-white' },
  glass: { box: 'bg-white/50 backdrop-blur-md', icon: 'text-indigo-600', blur: 'bg-indigo-100/30' },
  sunset: { box: 'bg-orange-950', icon: 'text-rose-400', blur: 'bg-rose-400/20' },
  ocean: { box: 'bg-cyan-950', icon: 'text-blue-400', blur: 'bg-blue-400/20' },
  forest: { box: 'bg-green-950', icon: 'text-emerald-400', blur: 'bg-emerald-400/20' },
  candy: { box: 'bg-pink-950', icon: 'text-fuchsia-400', blur: 'bg-fuchsia-400/20' },
  coffee: { box: 'bg-[#1a1412]', icon: 'text-orange-300', blur: 'bg-orange-900/10' },
  royal: { box: 'bg-indigo-950', icon: 'text-amber-400', blur: 'bg-amber-400/10' }
};

const currentTheme = computed(() => themeClasses[props.theme] || themeClasses.emerald);
</script>

<template>
  <div class="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up  pb-20">
    <!-- Controls Bar -->
    <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
      <!-- Background Glow -->
      <div :class="['absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl transition-all duration-1000', currentTheme.blur]"></div>
      
      <!-- Title & Icon Box -->
      <div class="relative flex items-center gap-4">
         <div v-if="showIcon" :class="['w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-500', currentTheme.box, currentTheme.icon]">
            <i :class="[props.icon, 'text-xl']"></i>
         </div>
         <div>
            <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">{{ props.title }}</h3>
            <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">{{ props.subtitle }}</p>
         </div>
      </div>

      <!-- Controls -->
      <div class="relative flex items-center gap-3">
        <div v-if="showSearch || showFilter" :class="['flex items-center rounded-2xl p-1', flatControls ? '' : 'bg-white border border-slate-200 shadow-sm']">
          <template v-if="showSearch">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <InputText 
              v-model="search" 
              :placeholder="props.searchPlaceholder" 
              class="border-none bg-transparent text-[11px] h-9 w-64 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" 
              @keyup.enter="$emit('refresh')" 
            />
          </template>
          
          <div v-if="showSearch && showFilter && ($slots.filters || filter)" class="h-6 w-[1px] bg-slate-100 mx-2"></div>
          
          <!-- Filters Slot -->
          <div v-if="showFilter" class="flex items-center">
            <slot name="filters" />
          </div>
        </div>

        <Button 
          v-if="showRefresh"
          icon="pi pi-refresh" 
          severity="secondary" 
          rounded 
          text 
          @click="$emit('refresh')" 
          :loading="loading" 
          class="h-10 w-10 text-slate-400 hover:text-indigo-600 transition-all shadow-sm bg-white" 
        />
        
        <!-- Extra Actions Slot -->
        <slot name="actions" />
      </div>
    </div>

    <!-- Content Slot (Table) -->
    <div class="overflow-x-auto custom-scrollbar">
      <slot name="table" />
    </div>

    <!-- Footer Slot (Pagination etc) -->
    <slot name="footer" />
  </div>
</template>

<style scoped lang="postcss">
.animate-fade-in-up { 
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
