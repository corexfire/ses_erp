<template>
  <aside class="flex flex-col border-r bg-white">
    <div class="flex items-center gap-2 border-b px-4 py-3 shrink-0">
      <i class="pi pi-th-large text-slate-700" />
      <div class="text-sm font-semibold tracking-wide text-slate-800">Menu</div>
    </div>
    <div class="flex-1 overflow-y-auto overflow-x-hidden p-2">
      <PanelMenu :model="panelModel" class="w-full" />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { appMenu, type AppMenuItem } from '../config/menu';

type PanelMenuItem = {
  label: string;
  icon?: string;
  items?: PanelMenuItem[];
  command?: () => void;
};

const toPanelModel = (items: AppMenuItem[]): PanelMenuItem[] =>
  items.map((item) => {
    const hasChildren = (item.children?.length ?? 0) > 0;
    const node: PanelMenuItem = {
      label: item.title,
      icon: item.icon ?? undefined,
      items: hasChildren ? toPanelModel(item.children ?? []) : undefined,
      command: !hasChildren && item.path ? () => navigateTo(item.path!) : undefined,
    };
    return node;
  });

const panelModel = computed(() => toPanelModel(appMenu));
</script>
