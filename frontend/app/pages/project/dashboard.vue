<template>
  <div class="space-y-4">
    <div class="rounded-xl border bg-white p-5">
      <div class="text-sm font-semibold">Project Dashboard</div>
      <div class="mt-1 text-sm text-slate-600">Overview of all construction projects.</div>
    </div>

    <div class="grid gap-4 md:grid-cols-4">
      <div class="rounded-xl border bg-white p-5">
        <div class="text-2xl font-bold text-blue-600">{{ stats.total }}</div>
        <div class="text-xs text-slate-500">Total Projects</div>
      </div>
      <div class="rounded-xl border bg-white p-5">
        <div class="text-2xl font-bold text-emerald-600">{{ stats.inProgress }}</div>
        <div class="text-xs text-slate-500">In Progress</div>
      </div>
      <div class="rounded-xl border bg-white p-5">
        <div class="text-2xl font-bold text-amber-600">{{ stats.onHold }}</div>
        <div class="text-xs text-slate-500">On Hold</div>
      </div>
      <div class="rounded-xl border bg-white p-5">
        <div class="text-2xl font-bold text-slate-600">{{ stats.completed }}</div>
        <div class="text-xs text-slate-500">Completed</div>
      </div>
    </div>

    <div class="rounded-xl border bg-white p-5">
      <div class="text-sm font-semibold">Active Projects</div>
      <div class="mt-4 space-y-3">
        <div v-for="p in activeProjects" :key="p.id" class="flex items-center justify-between rounded border p-3 text-sm">
          <div>
            <div class="font-medium">{{ p.name }}</div>
            <div class="text-xs text-slate-500">{{ p.code }} • {{ p.customer?.name || '-' }}</div>
          </div>
          <div class="flex items-center gap-2">
            <span :class="projectStatusClass(p.status)">{{ p.status }}</span>
            <Button label="View" size="small" severity="secondary" @click="goTo('/project/setup')" />
          </div>
        </div>
        <div v-if="activeProjects.length === 0" class="text-center text-sm text-slate-500 py-4">No active projects</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi()
const auth = useAuthStore()

const stats = ref({ total: 0, inProgress: 0, onHold: 0, completed: 0 })
const activeProjects = ref<any[]>([])

async function load() {
  try {
    const res = await api.get('/project/projects')
    const projects = res.data.data || []
    activeProjects.value = projects.filter((p: any) => p.status === 'IN_PROGRESS').slice(0, 5)
    stats.value = {
      total: projects.length,
      inProgress: projects.filter((p: any) => p.status === 'IN_PROGRESS').length,
      onHold: projects.filter((p: any) => p.status === 'ON_HOLD').length,
      completed: projects.filter((p: any) => p.status === 'COMPLETED').length,
    }
  } catch (e) {
    console.error('Failed to load', e)
  }
}

function projectStatusClass(status: string) {
  const map: Record<string, string> = {
    DRAFT: 'bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs',
    SETUP: 'bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs',
    IN_PROGRESS: 'bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs',
    ON_HOLD: 'bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs',
    COMPLETED: 'bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs',
    CLOSED: 'bg-slate-200 text-slate-800 px-2 py-0.5 rounded text-xs',
  }
  return map[status] || 'bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs'
}

function goTo(path: string) {
  navigateTo(path)
}

onMounted(() => {
  if (auth.hasPermission('project.dashboard.read')) load()
})
</script>
