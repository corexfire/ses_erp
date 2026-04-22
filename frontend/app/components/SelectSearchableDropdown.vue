<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue: any;
  options: any[];
  optionLabel?: string;
  optionValue?: string;
  placeholder?: string;
  multiple?: boolean;
  clearable?: boolean;
  searchable?: boolean;
  disabled?: boolean;
  loading?: boolean;
  size?: 'xsmall' | 'small' | 'large';
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  optionLabel: 'label',
  optionValue: 'value',
  placeholder: 'Select option',
  multiple: false,
  clearable: true,
  searchable: true,
  disabled: false,
  loading: false,
  size: undefined
});

const emit = defineEmits(['update:modelValue', 'change']);

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const onChange = (event: any) => {
  emit('change', event);
};

// Style mapping for premium ERP look
const baseClasses = 'w-full rounded-sm border-slate-200 transition-all duration-300 focus:ring-4 focus:ring-indigo-500/10 hover:border-indigo-300';
const sizeClasses = {
  xsmall: ' text-xs',
  small: 'text-[6px]',
  large: 'text-sm'
};
const defaultSize = 'text-[5px]';

const computedClass = computed(() => {
  const sizeClass = props.size ? sizeClasses[props.size] : defaultSize;
  return `${baseClasses} ${sizeClass} ${props.class || ''}`;
});
</script>

<template>
  <div class="select-searchable-dropdown relative">
    <!-- Multi Select Mode -->
    <MultiSelect
      v-if="props.multiple"
      v-model="value"
      :options="props.options"
      :optionLabel="props.optionLabel"
      :optionValue="props.optionValue"
      :placeholder="props.placeholder"
      :filter="props.searchable"
      :disabled="props.disabled"
      :loading="props.loading"
      :showClear="props.clearable"
      display="chip"
      class="w-full"
      :pt="{
        root: { class: computedClass },
        label: { class: 'font-black uppercase tracking-widest text-slate-700 flex items-center gap-2' },
        token: { class: 'bg-indigo-50 text-indigo-700 font-black text-[8px] uppercase tracking-widest border border-indigo-100 rounded-sm px-2 py-0.5' },
        trigger: { class: 'text-slate-400' },
        filterInput: { class: 'rounded-sm border-slate-200 text-[9px] font-bold' },
        item: { class: 'text-[2px] font-black uppercase tracking-widest text-slate-600 hover:bg-indigo-50 hover:text-indigo-700' }
      }"
      @change="onChange"
    >
      <template #option="slotProps">
        <div class="flex items-center gap-2">
          <span class="font-black">{{ slotProps.option[props.optionLabel] }}</span>
        </div>
      </template>
    </MultiSelect>

    <!-- Single Select Mode -->
    <Select
      v-else
      v-model="value"
      :options="props.options"
      :optionLabel="props.optionLabel"
      :optionValue="props.optionValue"
      :placeholder="props.placeholder"
      :filter="props.searchable"
      :disabled="props.disabled"
      :loading="props.loading"
      :showClear="props.clearable"
      class="w-full"
      :pt="{
        root: { class: computedClass },
        label: { class: 'text-xs flex items-center' },
        trigger: { class: 'text-slate-400' },
        filterInput: { class: 'rounded-sm border-slate-200 text-xs' },
        item: { class: 'text-xs hover:bg-indigo-50 hover:text-indigo-700' }
      }"
      @change="onChange"
    >
      <template #option="slotProps">
        <div class="flex items-center gap-2">
          <span class="text-sm">{{ slotProps.option[props.optionLabel] }}</span>
        </div>
      </template>
    </Select>
  </div>
</template>

<style scoped lang="postcss">
:deep(.p-select-panel), :deep(.p-multiselect-panel) {
  @apply rounded-sm border-slate-100 shadow-2xl p-2 bg-white mt-2;
}

:deep(.p-select-items), :deep(.p-multiselect-items) {
  @apply space-y-1;
}

:deep(.p-select-item), :deep(.p-multiselect-item) {
  @apply rounded-sm transition-all duration-200;
}

:deep(.p-select-filter-container), :deep(.p-multiselect-header) {
  @apply mb-2 p-2 border-b border-slate-50;
}
</style>
