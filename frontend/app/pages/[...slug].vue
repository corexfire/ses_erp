<template>
  <div class="rounded-xl border bg-white p-5">
    <div class="text-sm font-semibold">{{ title }}</div>
    <div class="mt-1 text-sm text-slate-600">
      Halaman ini placeholder. Implementasi akan dibuat sesuai phase di ERP_IMPLEMENTATION_PLAN.md.
    </div>
    <div class="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-700">
      Route: {{ route.path }}
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const title = computed(() => {
  const last = Array.isArray(route.params.slug)
    ? route.params.slug[route.params.slug.length - 1]
    : String(route.params.slug ?? '');
  return last ? String(last).replace(/-/g, ' ') : route.path;
});
</script>
