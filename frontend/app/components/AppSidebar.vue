<script setup lang="ts">
import { appMenu, type AppMenuItem } from '../config/menu';
const route = useRoute();

type PanelMenuItem = {
  key: string;
  label: string;
  icon?: string;
  class?: string;
  items?: PanelMenuItem[];
  command?: () => void;
};

// State for expanded keys to ensure menu persistence using cookies
const expandedKeys = useCookie<Record<string, boolean>>('erp_sidebar_expanded', { 
  default: () => ({}),
  watch: 'shallow' // Optimization for speed
});

const toPanelModel = (items: AppMenuItem[], parentKey = ''): PanelMenuItem[] =>
  items.map((item, index) => {
    const currentKey = parentKey ? `${parentKey}_${index}` : `${index}`;
    const hasChildren = (item.children?.length ?? 0) > 0;
    
    return {
      key: currentKey,
      label: item.title,
      icon: item.icon ?? undefined,
      items: hasChildren ? toPanelModel(item.children ?? [], currentKey) : undefined,
      to: !hasChildren ? item.path : undefined,
    };
  });

// Initialize model ONCE to avoid reactive race conditions during navigation
const panelModel = ref(toPanelModel(appMenu));

// Expand parents of the active route with debouncing
let syncTimeout: any = null;
const syncExpandedKeys = () => {
  if (syncTimeout) clearTimeout(syncTimeout);
  
  syncTimeout = setTimeout(() => {
    const currentKeys = { ...expandedKeys.value };
    
    const findAndExpand = (items: PanelMenuItem[]) => {
      for (const item of items) {
        // We still need a way to check if a child is active to expand the parent
        // but we'll do it by manually checking the route path against item.path
        // ONLY inside the debounced timeout, not in a computed property.
        const isActive = (path?: string) => {
          if (!path) return false;
          return route.path.startsWith(path.split('?')[0]);
        };

        const hasActiveNestedChild = (it: PanelMenuItem): boolean => {
          if (it.to && isActive(it.to)) return true;
          if (it.items) return it.items.some(child => hasActiveNestedChild(child));
          return false;
        };

        if (hasActiveNestedChild(item)) {
          currentKeys[item.key] = true;
          // Continue to deeper items
          if (item.items) findAndExpand(item.items);
          return true;
        }
      }
      return false;
    };
    
    findAndExpand(panelModel.value);
    expandedKeys.value = currentKeys;
  }, 100);
};

// Sync on route change or initial load
watch(() => route.path, () => {
  syncExpandedKeys();
}, { immediate: true });

onBeforeUnmount(() => {
  if (syncTimeout) clearTimeout(syncTimeout);
});

</script>

<template>
  <aside class="flex h-full flex-col border-r bg-white font-sans">
    <div class="flex items-center gap-2 border-b px-4 py-3 shrink-0">
      <i class="pi pi-th-large text-emerald-600 font-bold" />
      <div class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Navigation Hub</div>
    </div>
    <div class="flex-1 overflow-y-auto overflow-x-hidden p-2 pb-32 custom-sidebar-scrollbar">
      <PanelMenu v-model:expandedKeys="expandedKeys" :model="panelModel" class="w-full border-none">
        <template #item="{ item, props, hasSubmenu }">
          <NuxtLink v-if="item.to" :to="item.to" v-bind="props.action" :class="[item.class, 'menu-link flex items-center px-3 py-2 no-underline']">
            <span v-if="item.icon" :class="[item.icon, 'mr-2 text-sm']" />
            <span class="menu-label">{{ item.label }}</span>
          </NuxtLink>
          <a v-else v-bind="props.action" :class="[item.class, 'menu-link flex items-center px-3 py-2 cursor-pointer']">
            <span v-if="item.icon" :class="[item.icon, 'mr-2 text-sm']" />
            <span class="menu-label font-bold">{{ item.label }}</span>
            <span v-if="hasSubmenu" class="pi pi-chevron-down ml-auto text-[9px] opacity-50" />
          </a>
        </template>
      </PanelMenu>
    </div>
  </aside>
</template>

<style scoped>
/* 🛡️ FORCE RESET - Wipe all background and borders from PrimeVue components */
:deep(.p-panelmenu), 
:deep(.p-panelmenu-panel),
:deep(.p-panelmenu-header),
:deep(.p-panelmenu-header-content),
:deep(.p-panelmenu-content),
:deep(.p-panelmenu-header-link),
:deep(.p-menuitem-content),
:deep(.p-menuitem-link) {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  outline: none !important;
}

/* 🎨 BASE LINK STYLE */
.menu-link {
  border-radius: 8px !important;
  transition: all 0.2s ease !important;
  margin-bottom: 2px !important;
  color: #64748b !important;
  text-decoration: none !important;
}

.menu-link:hover {
  background: #f8fafc !important;
  color: #0f172a !important;
}

.menu-label {
  font-size: 10.5px !important;
  text-transform: uppercase !important;
  letter-spacing: 0.05em !important;
}

/* 🎯 EXACT ACTIVE (The Leaf Level Selection) */
/* This is the only item that should have the strong highlight */
:deep(.menu-link.router-link-exact-active) {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
  color: #ffffff !important;
  box-shadow: 0 4px 12px -2px rgba(16, 185, 129, 0.3) !important;
}

:deep(.menu-link.router-link-exact-active .menu-label) {
  font-weight: 800 !important;
}

:deep(.menu-link.router-link-exact-active icon),
:deep(.menu-link.router-link-exact-active [class^="pi"]) {
  color: #ffffff !important;
}

/* 📂 PARENT HINT (Subtle indicator for parent of active child) */
/* We target the header content of a panel that HAS an exact active link inside it */
:deep(.p-panelmenu-panel:has(.router-link-exact-active) > .p-panelmenu-header .menu-link:not(.router-link-exact-active)) {
  background: #f1f5f9 !important;
  color: #0f172a !important;
  border-left: 3px solid #10b981 !important;
  border-radius: 0 8px 8px 0 !important;
}

:deep(.p-panelmenu-panel:has(.router-link-exact-active) > .p-panelmenu-header .menu-label) {
  font-weight: 900 !important;
}

/* 🔗 NESTED CONNECTION LINE */
:deep(.p-panelmenu-content) {
  padding-left: 1.2rem !important;
  margin-left: 1.1rem !important;
  border-left: 1px solid #f1f5f9 !important;
}

/* 🛠️ SCROLLBAR */
.custom-sidebar-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-sidebar-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
</style>
