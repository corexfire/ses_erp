<template>
  <div class="space-y-4">
    <div class="rounded-xl border bg-white p-5">
      <div class="text-sm font-semibold">Staging & Loading</div>
      <div class="mt-1 text-sm text-slate-600">Manage staging areas and confirm loading to vehicles for outbound deliveries.</div>
    </div>

    <div class="rounded-xl border bg-white p-5">
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <InputText v-model="q" placeholder="Search staging code..." class="w-72" :disabled="!canRead" />
          <select v-model="statusFilter" class="h-10 rounded-md border px-2 text-sm">
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="LOADED">Loaded</option>
          </select>
          <Button label="Search" severity="secondary" :disabled="loading || !canRead" @click="load" />
        </div>
        <Button v-if="canExecute" label="New Staging" @click="openCreate" />
      </div>

      <div class="mt-4 overflow-hidden rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-slate-50 text-left text-xs text-slate-600">
            <tr>
              <th class="px-3 py-2">Code</th>
              <th class="px-3 py-2">Wave</th>
              <th class="px-3 py-2">Trip</th>
              <th class="px-3 py-2">Warehouse</th>
              <th class="px-3 py-2">Status</th>
              <th class="px-3 py-2">Loaded At</th>
              <th class="px-3 py-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="staging in stagings" :key="staging.id" class="border-t">
              <td class="px-3 py-2 font-medium">{{ staging.code }}</td>
              <td class="px-3 py-2 text-xs">{{ staging.wavePicking?.code || staging.wavePickingId || '-' }}</td>
              <td class="px-3 py-2 text-xs">{{ staging.tripPlan?.code || staging.tripPlanId || '-' }}</td>
              <td class="px-3 py-2 text-xs">{{ staging.warehouse?.name || staging.warehouseId }}</td>
              <td class="px-3 py-2">
                <span :class="stagingStatusClass(staging.status)">{{ staging.status }}</span>
              </td>
              <td class="px-3 py-2 text-xs">{{ fmt(staging.loadedAt) }}</td>
              <td class="px-3 py-2 text-right">
                <div class="inline-flex gap-2">
                  <Button label="View" size="small" severity="secondary" @click="openView(staging)" />
                  <Button v-if="canExecute && staging.status === 'PENDING'" label="Confirm" size="small" @click="confirmStaging(staging)" />
                  <Button v-if="canExecute && staging.status === 'CONFIRMED'" label="Load" size="small" @click="loadVehicle(staging)" />
                </div>
              </td>
            </tr>
            <tr v-if="stagings.length === 0">
              <td colspan="7" class="px-3 py-6 text-center text-sm text-slate-500">No staging loads found</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4">
      <div class="text-sm text-red-600">{{ error }}</div>
    </div>
    <div v-if="success" class="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
      <div class="text-sm text-emerald-700">{{ success }}</div>
    </div>

    <!-- Create Staging Dialog -->
    <div v-if="createDialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div class="w-full max-w-lg rounded-xl border bg-white p-5 shadow-xl">
        <div class="text-sm font-semibold">Create Staging Load</div>

        <div class="mt-4 space-y-4">
          <div class="space-y-2">
            <div class="text-xs text-slate-600">Warehouse *</div>
            <select v-model="form.warehouseId" class="h-10 w-full rounded-md border px-2 text-sm">
              <option value="">Select warehouse</option>
              <option v-for="w in warehouses" :key="w.id" :value="w.id">{{ w.name }}</option>
            </select>
          </div>
          <div class="space-y-2">
            <div class="text-xs text-slate-600">Wave Picking (optional)</div>
            <select v-model="form.waveId" class="h-10 w-full rounded-md border px-2 text-sm">
              <option value="">Select wave (optional)</option>
              <option v-for="w in waves" :key="w.id" :value="w.id">{{ w.code }}</option>
            </select>
          </div>
          <div class="space-y-2">
            <div class="text-xs text-slate-600">Trip Plan (optional)</div>
            <select v-model="form.tripPlanId" class="h-10 w-full rounded-md border px-2 text-sm">
              <option value="">Select trip (optional)</option>
              <option v-for="t in trips" :key="t.id" :value="t.id">{{ t.code }}</option>
            </select>
          </div>
        </div>

        <div class="mt-5 flex justify-end gap-2">
          <Button label="Cancel" severity="secondary" @click="createDialogOpen = false" />
          <Button label="Save" :disabled="saving || !form.warehouseId" @click="saveStaging" />
        </div>
      </div>
    </div>

    <!-- View Dialog -->
    <div v-if="viewDialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div class="w-full max-w-2xl rounded-xl border bg-white p-5 shadow-xl">
        <div class="flex items-center justify-between">
          <div class="text-sm font-semibold">Staging: {{ viewingStaging?.code }}</div>
          <Button label="Close" severity="secondary" size="small" @click="viewDialogOpen = false" />
        </div>

        <div class="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <div class="text-xs text-slate-500">Wave</div>
            <div>{{ viewingStaging?.wavePicking?.code || viewingStaging?.wavePickingId || '-' }}</div>
          </div>
          <div>
            <div class="text-xs text-slate-500">Trip</div>
            <div>{{ viewingStaging?.tripPlan?.code || viewingStaging?.tripPlanId || '-' }}</div>
          </div>
          <div>
            <div class="text-xs text-slate-500">Warehouse</div>
            <div>{{ viewingStaging?.warehouse?.name || viewingStaging?.warehouseId }}</div>
          </div>
          <div>
            <div class="text-xs text-slate-500">Status</div>
            <span :class="stagingStatusClass(viewingStaging?.status)">{{ viewingStaging?.status }}</span>
          </div>
          <div v-if="viewingStaging?.loadedAt">
            <div class="text-xs text-slate-500">Loaded At</div>
            <div>{{ fmt(viewingStaging?.loadedAt) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi()

const canRead = computed(() => auth.hasPermission('logistics.warehouse.read'))
const canExecute = computed(() => auth.hasPermission('logistics.warehouse.execute'))

const stagings = ref<any[]>([])
const warehouses = ref<any[]>([])
const waves = ref<any[]>([])
const trips = ref<any[]>([])
const q = ref('')
const statusFilter = ref('')
const loading = ref(false)
const saving = ref(false)
const error = ref('')
const success = ref('')

const createDialogOpen = ref(false)
const viewDialogOpen = ref(false)
const viewingStaging = ref<any>(null)

const form = reactive({
  warehouseId: '',
  waveId: '',
  tripPlanId: '',
})

async function load() {
  loading.value = true
  error.value = ''
  try {
    const params: any = {}
    if (q.value) params.search = q.value
    if (statusFilter.value) params.status = statusFilter.value
    const res = await api.get('/logistics/staging', { params })
    stagings.value = res.data.stagings || res.data.data || []
  } catch (e: any) {
    error.value = e.response?.data?.message || e.message
  } finally {
    loading.value = false
  }
}

async function loadWarehouses() {
  try {
    const res = await api.get('/inventory/warehouses')
    warehouses.value = res.data.warehouses || res.data.data || []
  } catch (e) {
    console.error('Failed to load warehouses', e)
  }
}

async function loadWaves() {
  try {
    const res = await api.get('/logistics/waves')
    waves.value = res.data.waves || []
  } catch (e) {
    console.error('Failed to load waves', e)
  }
}

async function loadTrips() {
  try {
    const res = await api.get('/logistics/trips', { params: { status: 'READY' } })
    trips.value = res.data.trips || res.data.data || []
  } catch (e) {
    console.error('Failed to load trips', e)
  }
}

async function saveStaging() {
  saving.value = true
  error.value = ''
  success.value = ''
  try {
    await api.post('/logistics/staging', {
      warehouseId: form.warehouseId,
      waveId: form.waveId || undefined,
      tripPlanId: form.tripPlanId || undefined,
    })
    success.value = 'Staging created'
    createDialogOpen.value = false
    load()
  } catch (e: any) {
    error.value = e.response?.data?.message || e.message
  } finally {
    saving.value = false
  }
}

async function confirmStaging(staging: any) {
  try {
    await api.post(`/logistics/staging/${staging.id}/confirm`)
    success.value = 'Staging confirmed'
    load()
  } catch (e: any) {
    error.value = e.response?.data?.message || e.message
  }
}

async function loadVehicle(staging: any) {
  if (!staging.tripPlanId) {
    error.value = 'No trip assigned to this staging'
    return
  }
  try {
    await api.post(`/logistics/loading/${staging.tripPlanId}/confirm`)
    success.value = 'Loading confirmed'
    load()
  } catch (e: any) {
    error.value = e.response?.data?.message || e.message
  }
}

function openCreate() {
  form.warehouseId = ''
  form.waveId = ''
  form.tripPlanId = ''
  loadWarehouses()
  loadWaves()
  loadTrips()
  createDialogOpen.value = true
}

function openView(staging: any) {
  viewingStaging.value = staging
  viewDialogOpen.value = true
}

function stagingStatusClass(status: string) {
  const map: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs',
    CONFIRMED: 'bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs',
    LOADED: 'bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs',
  }
  return map[status] || 'bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs'
}

function fmt(date: string) {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('id-ID')
}

onMounted(() => {
  if (canRead.value) load()
})
</script>