<script setup lang="ts">
interface Column {
  key: string;
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  borderLeft?: boolean;
  expander?: boolean;
}

interface Props {
  value: any[];
  columns: Column[];
  loading?: boolean;
  hoverBorderColor?: string;
  scrollHeight?: string;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  hoverBorderColor: 'border-l-indigo-400',
  scrollHeight: '800px'
});

const pt = {
  root: { class: 'border-none' },
  header: { class: 'bg-white border-b border-slate-50' },
  headerCell: ({ column }: any) => ({
    class: [
      'px-8 py-5 text-sm font-black uppercase tracking-[0.2em] border-none bg-white',
      column?.props?.align === 'center' ? 'text-center' : (column?.props?.align === 'right' ? 'text-right' : 'text-left'),
      column?.props?.borderLeft ? 'border-l border-slate-50' : ''
    ]
  }),
  bodyCell: ({ column }: any) => ({
    class: [
      'px-8 py-6 align-middle border-none transition-all duration-300 relative',
      column?.props?.align === 'center' ? 'text-center' : (column?.props?.align === 'right' ? 'text-right' : 'text-left'),
      column?.props?.borderLeft ? 'border-l border-slate-50' : ''
    ]
  }),
  row: ({ context }: any) => ({
    class: [
      'transition-all duration-300 group border-l-4 border-l-transparent cursor-pointer',
      context.hovered ? `bg-slate-50/50 ${props.hoverBorderColor}` : '',
      'hover:bg-slate-50/50'
    ]
  })
};
</script>

<template>
  <TreeTable 
    :value="value" 
    :loading="loading" 
    :scrollable="true" 
    :scrollHeight="scrollHeight"
    :pt="pt"
    class="w-full"
  >
    <Column 
      v-for="col in columns" 
      :key="col.key" 
      :field="col.key" 
      :header="col.header" 
      :expander="col.expander"
      :style="{ width: col.width }"
      :class="[col.align === 'right' ? 'text-right' : '']"
    >
      <template #body="{ node }">
        <slot :name="'col-' + col.key" :node="node" :data="node.data">
          <span class="text-[12px] font-medium text-slate-600">{{ node.data[col.key] }}</span>
        </slot>
      </template>
    </Column>
  </TreeTable>
</template>

<style lang="postcss">
/* Ensure expander icons follow the style */
.p-treetable-toggler {
  @apply w-6 h-6 rounded-lg hover:bg-slate-100 transition-all duration-300 !important;
}

.p-treetable-toggler-icon {
  @apply text-[10px] text-slate-400 !important;
}

.p-treetable-wrapper::-webkit-scrollbar {
  width: 4px;
}

.p-treetable-wrapper::-webkit-scrollbar-track {
  background: transparent;
}

.p-treetable-wrapper::-webkit-scrollbar-thumb {
  background: #e2e8f0; /* slate-200 */
  border-radius: 9999px;
}
</style>
