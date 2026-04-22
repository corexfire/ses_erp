<script setup lang="ts">
interface Column {
  key: string;
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  borderLeft?: boolean;
  hoverBg?: string; // e.g. 'bg-teal-400'
}

interface Props {
  items: any[];
  columns: Column[];
  loading?: boolean;
  emptyText?: string;
  rowClass?: string | ((item: any) => string);
  loadingText?: string;
  hoverBorderColor?: string;
  expandable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  emptyText: 'Belum ada data yang tersedia.',
  loadingText: 'Mensinkronisasi data...',
  hoverBorderColor: 'border-l-indigo-400',
  expandable: false
});

const expandedRows = defineModel<any[]>('expandedRows', { default: () => [] });

const emit = defineEmits(['row-click']);

function toggleExpand(item: any) {
  const id = item.id || JSON.stringify(item);
  const index = expandedRows.value.indexOf(id);
  if (index > -1) {
    expandedRows.value.splice(index, 1);
  } else {
    expandedRows.value.push(id);
  }
}

function isExpanded(item: any) {
  const id = item.id || JSON.stringify(item);
  return expandedRows.value.includes(id);
}

function getRowClass(item: any) {
  const base = 'transition-all group border-l-4 border-l-transparent cursor-pointer';
  const hoverColor = props.hoverBorderColor;
  const activeBg = isExpanded(item) ? 'bg-slate-50/80' : 'hover:bg-slate-50/50';
  const custom = typeof props.rowClass === 'function' ? props.rowClass(item) : (props.rowClass || '');
  return `${base} ${activeBg} hover:${hoverColor} ${custom}`;
}
</script>

<template>
  <table class="w-full text-sm">
    <thead class="bg-white text-left font-bold border-b border-slate-50">
      <tr>
        <th v-if="expandable" class="w-12 px-4 py-5 border-r border-slate-50"></th>
        <th 
          v-for="(col, index) in columns" 
          :key="col.key"
          :class="[
            'px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]',
            col.align === 'center' ? 'text-center' : (col.align === 'right' ? 'text-right' : 'text-left'),
            col.width ? col.width : '',
            col.borderLeft ? 'border-l border-slate-50' : ''
          ]"
        >
          {{ col.header }}
        </th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-50">
      <!-- Loading State -->
      <tr v-if="loading">
        <td :colspan="columns.length + (expandable ? 1 : 0)" class="py-24 text-center">
          <i class="pi pi-spinner pi-spin text-4xl text-indigo-500 opacity-20"></i>
          <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">
            {{ loadingText }}
          </div>
        </td>
      </tr>

      <!-- Data Rows -->
      <template v-else-if="items.length > 0">
        <template v-for="item in items" :key="item.id || JSON.stringify(item)">
          <tr 
            :class="getRowClass(item)"
            @click="$emit('row-click', item)"
          >
            <td v-if="expandable" class="w-12 px-4 py-6 text-center border-r border-slate-50/50" @click.stop="toggleExpand(item)">
               <i :class="['pi text-[10px] transition-transform duration-300 text-slate-400', isExpanded(item) ? 'pi-chevron-down' : 'pi-chevron-right']"></i>
            </td>
            <td 
              v-for="col in columns" 
              :key="col.key"
              :class="[
                'px-8 py-6 align-middle relative overflow-hidden',
                col.align === 'center' ? 'text-center' : (col.align === 'right' ? 'text-right' : 'text-left'),
                col.borderLeft ? 'border-l border-slate-50' : ''
              ]"
            >
              <!-- Dynamic Hover Background Animation -->
              <div 
                v-if="col.hoverBg" 
                :class="['absolute left-0 bottom-0 w-2 h-full opacity-10 transition-all duration-500 group-hover:w-full', col.hoverBg]"
              ></div>

              <div class="relative z-10">
                <slot :name="'col-' + col.key" :item="item">
                  {{ item[col.key] }}
                </slot>
              </div>
            </td>
          </tr>
          
          <!-- Expansion Slot Row -->
          <tr v-if="expandable && isExpanded(item)" class="bg-slate-50/30">
             <td :colspan="columns.length + 1" class="p-0 border-l-4 border-l-slate-200">
                <slot name="expansion" :item="item" />
             </td>
          </tr>
        </template>
      </template>

      <!-- Empty State -->
      <tr v-else>
        <td :colspan="columns.length + (expandable ? 1 : 0)" class="py-32 text-center text-slate-500">
          <i class="pi pi-megaphone text-6xl text-slate-100 mb-4 block"></i>
          <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">
            {{ emptyText }}
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped lang="postcss">
/* Custom table styles if needed */
</style>
