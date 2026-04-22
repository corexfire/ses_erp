<template>
  <div class="space-y-4">
    <div class="rounded-xl border bg-white p-5">
      <div class="text-sm font-semibold">Trip Management</div>
      <div class="mt-1 text-sm text-slate-600">Plan trips, assign deliveries, dispatch, and track checkpoints.</div>
    </div>

    <div class="rounded-xl border bg-white p-5">
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <InputText v-model="q" placeholder="Search trip code..." class="w-72" />
          <select v-model="statusFilter" class="h-10 rounded-md border px-2 text-sm">
            <option value="">All Status</option>
            <option value="PLANNED">Planned</option>
            <option value="READY">Ready</option>
            <option value="DISPATCHED">Dispatched</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELED">Canceled</option>
          </select>
          <Button label="Search" severity="secondary" :disabled="loading" @click="load" />
        </div>
        <Button label="New Trip" :disabled="!canManage" @click="openCreate" />
      </div>

      <div class="mt-4 overflow-hidden rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-slate-50 text-left text-xs text-slate-600">
            <tr>
              <th class="px-3 py-2">Code</th>
              <th class="px-3 py-2">Route Date</th>
              <th class="px-3 py-2">Vehicle</th>
              <th class="px-3 py-2">Driver</th>
              <th class="px-3 py-2">DOs</th>
              <th class="px-3 py-2">Status</th>
              <th class="px-3 py-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="trip in trips" :key="trip.id" class="border-t">
              <td class="px-3 py-2 font-medium">{{ trip.code }}</td>
              <td class="px-3 py-2 text-xs">{{ fmt(trip.routeDate) }}</td>
              <td class="px-3 py-2 text-xs">{{ trip.vehicle?.plateNo || '-' }}</td>
              <td class="px-3 py-2 text-xs">{{ trip.driver?.name || '-' }}</td>
              <td class="px-3 py-2 text-center">{{ trip._count?.deliveryOrders || 0 }}</td>
              <td class="px-3 py-2">
                <span :class="statusClass(trip.status)">{{ trip.status }}</span>
              </td>
              <td class="px-3 py-2 text-right">
                <div class="inline-flex gap-2">
                  <Button label="View" size="small" severity="secondary" @click="openView(trip)" />
                  <Button v-if="canManage && trip.status === 'PLANNED'" label="Assign DOs" size="small" severity="info" @click="openAssign(trip)" />
                  <Button v-if="canManage && ['PLANNED', 'READY'].includes(trip.status)" label="Dispatch" size="small" :disabled="!canDispatch" @click="openDispatch(trip)" />
                </div>
              </td>
            </tr>
            <tr v-if="trips.length === 0">
              <td colspan="7" class="px-3 py-6 text-center text-sm text-slate-500">No trips found</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="error" class="mt-3 text-sm text-red-600">{{ error }}</div>
      <div v-if="success" class="mt-3 text-sm text-emerald-700">{{ success }}</div>
    </div>

    <div v-if="viewDialogOpen && viewingTrip" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div class="w-full max-w-3xl rounded-xl border bg-white p-5 shadow-xl">
        <div class="flex items-center justify-between">
          <div class="text-sm font-semibold">Trip: {{ viewingTrip.code }}</div>
          <Button label="Close" severity="secondary" size="small" @click="viewDialogOpen = false" />
        </div>

        <div class="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <div class="text-xs text-slate-500">Status</div>
            <div>{{ viewingTrip.status }}</div>
          </div>
          <div>
            <div class="text-xs text-slate-500">Route Date</div>
            <div>{{ fmt(viewingTrip.routeDate) }}</div>
          </div>
          <div>
            <div class="text-xs text-slate-500">Vehicle</div>
            <div>{{ viewingTrip.vehicle?.plateNo || 'Not assigned' }}</div>
          </div>
          <div>
            <div class="text-xs text-slate-500">Driver</div>
            <div>{{ viewingTrip.driver?.name || 'Not assigned' }}</div>
          </div>
          <div v-if="viewingTrip.departureAt">
            <div class="text-xs text-slate-500">Departure</div>
            <div>{{ viewingTrip.departureAt }}</div>
          </div>
        </div>

        <div class="mt-4">
          <div class="flex items-center justify-between">
            <div class="text-xs font-semibold text-slate-700">Delivery Orders</div>
            <Button v-if="canManage && viewingTrip.status === 'PLANNED'" label="Add DO" icon="pi pi-plus" size="small" text @click="openAssign(viewingTrip)" class="text-[10px] font-black" />
          </div>
          <div class="mt-2 space-y-2">
            <div v-for="do_ in viewingTrip.deliveryOrders" :key="do_.id" class="flex items-center justify-between rounded border p-2 text-xs">
              <div>{{ do_.code }} - {{ do_.customer?.name || do_.customerId }}</div>
              <span :class="statusClass(do_.status)">{{ do_.status }}</span>
            </div>
            <div v-if="!viewingTrip.deliveryOrders?.length" class="text-center text-slate-500">No deliveries assigned</div>
          </div>
        </div>

        <div v-if="viewingTrip.checkpoints?.length" class="mt-6 border-t pt-4">
          <div class="text-xs font-semibold text-slate-700 uppercase tracking-widest mb-3">Checkpoint Timeline</div>
          <div class="space-y-3">
            <div v-for="cp in viewingTrip.checkpoints" :key="cp.id" class="flex items-start gap-3 text-xs">
              <div class="w-20 rounded bg-slate-50 px-2 py-1 text-center font-black text-[9px] uppercase border border-slate-100">{{ cp.checkpointType }}</div>
              <div class="flex-1">
                <div class="font-bold text-slate-700">{{ cp.locationName || 'Location Not Specified' }}</div>
                <div class="text-[10px] text-slate-400 font-medium">{{ fmt(cp.timestamp) }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- TRIP COSTS SECTION -->
        <div class="mt-6 border-t pt-4">
          <div class="flex items-center justify-between mb-3">
            <div class="text-xs font-semibold text-slate-700 uppercase tracking-widest">Operational Costs</div>
            <Button label="Add Cost" icon="pi pi-plus" size="small" text @click="openAddCost" v-if="canManage" class="text-[10px] font-black" />
          </div>
          <div class="space-y-2">
            <div v-for="cost in viewingTrip.costs" :key="cost.id" class="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex items-center gap-3">
                 <div class="w-8 h-8 rounded-lg bg-white border flex items-center justify-center text-rose-600">
                    <i :class="costIcon(cost.costType)"></i>
                 </div>
                 <div>
                   <div class="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{{ cost.costType }}</div>
                   <div class="text-[11px] font-bold text-slate-700">{{ cost.description || 'No description' }}</div>
                 </div>
              </div>
              <div class="text-right">
                 <div class="text-xs font-black text-slate-900">{{ formatRp(cost.amount) }}</div>
                 <div :class="['text-[8px] font-black px-1.5 py-0.5 rounded-full inline-block uppercase', costStatusClass(cost.status)]">{{ cost.status }}</div>
              </div>
            </div>
            <div v-if="!viewingTrip.costs?.length" class="py-6 text-center text-slate-400 border border-dashed rounded-xl text-xs italic">
              No operational costs recorded for this trip.
            </div>
          </div>
          <div v-if="viewingTrip.costs?.length" class="mt-3 flex justify-between items-center p-3 rounded-xl bg-rose-50 border border-rose-100">
             <div class="text-xs font-black text-rose-900 uppercase">Total Trip Expense</div>
             <div class="text-sm font-black text-rose-700">{{ formatRp(totalCost(viewingTrip.costs)) }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- ADD COST DIALOG -->
    <Dialog v-model:visible="costDialogOpen" header="Add Trip Operational Cost" modal class="w-[400px]">
       <div class="space-y-4 pt-4">
          <div class="space-y-1">
             <label class="text-[10px] font-black text-slate-400 uppercase">Cost Type</label>
             <Select v-model="costForm.costType" :options="['FUEL', 'TOLL', 'PARKING', 'MEAL', 'MAINTENANCE', 'OTHER']" class="w-full" />
          </div>
          <div class="space-y-1">
             <label class="text-[10px] font-black text-slate-400 uppercase">Amount (IDR)</label>
             <InputNumber v-model="costForm.amount" class="w-full" />
          </div>
          <div class="space-y-1">
             <label class="text-[10px] font-black text-slate-400 uppercase">Description / Notes</label>
             <Textarea v-model="costForm.description" rows="2" class="w-full" />
          </div>
          <div class="pt-4 flex justify-end gap-2">
             <Button label="Cancel" severity="secondary" text @click="costDialogOpen = false" />
             <Button label="Save Cost" class="bg-indigo-600 border-none px-6" @click="saveCost" :loading="saving" />
          </div>
       </div>
    </Dialog>

    <div v-if="createDialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div class="w-full max-w-lg rounded-xl border bg-white p-5 shadow-xl">
        <div class="text-sm font-semibold">New Trip</div>

        <div class="mt-4 space-y-4">
          <div class="space-y-2">
            <div class="text-xs text-slate-600">Route Date</div>
            <InputText v-model="createForm.routeDate" class="w-full" placeholder="YYYY-MM-DD" />
          </div>
          <div class="space-y-2">
            <div class="text-xs text-slate-600">Notes</div>
            <textarea v-model="createForm.notes" class="w-full rounded-md border p-2 text-sm" rows="2"></textarea>
          </div>
        </div>

        <div class="mt-5 flex items-center justify-end gap-2">
          <Button label="Cancel" severity="secondary" @click="createDialogOpen = false" />
          <Button label="Create" :loading="saving" :disabled="saving || !createForm.routeDate" @click="create" />
        </div>

        <div v-if="dialogError" class="mt-3 text-sm text-red-600">{{ dialogError }}</div>
      </div>
    </div>

    <div v-if="dispatchDialogOpen && dispatchingTrip" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div class="w-full max-w-lg rounded-xl border bg-white p-5 shadow-xl">
        <div class="text-sm font-semibold">Dispatch Trip: {{ dispatchingTrip.code }}</div>

        <div class="mt-4 space-y-4">
          <div class="space-y-2">
            <div class="text-xs text-slate-600">Vehicle</div>
            <select v-model="dispatchForm.vehicleId" class="h-10 w-full rounded-md border px-2 text-sm">
              <option value="" disabled>Select vehicle</option>
              <option v-for="v in vehicles" :key="v.id" :value="v.id">{{ v.plateNo }} - {{ v.vehicleType }}</option>
            </select>
          </div>
          <div class="space-y-2">
            <div class="text-xs text-slate-600">Driver</div>
            <select v-model="dispatchForm.driverId" class="h-10 w-full rounded-md border px-2 text-sm">
              <option value="" disabled>Select driver</option>
              <option v-for="d in drivers" :key="d.id" :value="d.id">{{ d.name }} ({{ d.licenseType }})</option>
            </select>
          </div>
          <div class="space-y-2">
            <div class="text-xs text-slate-600">Departure Time</div>
            <InputText v-model="dispatchForm.departureAt" class="w-full" placeholder="YYYY-MM-DDTHH:mm:ss" />
          </div>
        </div>

        <div class="mt-5 flex items-center justify-end gap-2">
          <Button label="Cancel" severity="secondary" @click="dispatchDialogOpen = false" />
          <Button label="Dispatch" :loading="saving" :disabled="saving || !dispatchForm.vehicleId || !dispatchForm.driverId" @click="dispatch" />
        </div>

        <div v-if="dialogError" class="mt-3 text-sm text-red-600">{{ dialogError }}</div>
      </div>
    </div>

    <!-- Assign DO Dialog -->
    <Dialog v-if="assignDialogOpen" v-model:visible="assignDialogOpen" header="Assign Delivery Orders" modal class="w-full max-w-2xl bg-white p-5 rounded-xl shadow-xl">
      <div class="space-y-4">
        <div class="text-xs text-slate-500 mb-2">Select available delivery orders to assign to this trip. Only DOs with status PLANNED or RELEASED that are not yet assigned to a trip will be shown.</div>
        
        <div class="max-h-[300px] overflow-y-auto border rounded-lg">
          <table class="w-full text-xs">
            <thead class="bg-slate-50 sticky top-0 border-b">
              <tr>
                <th class="px-3 py-2 text-left w-10 text-slate-500">Select</th>
                <th class="px-3 py-2 text-left text-slate-500">DO Code</th>
                <th class="px-3 py-2 text-left text-slate-500">Customer</th>
                <th class="px-3 py-2 text-left text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="do_ in availableDOs" :key="do_.id" class="border-t hover:bg-slate-50 cursor-pointer" @click="toggleSelect(do_.id)">
                <td class="px-3 py-2">
                   <div :class="['w-4 h-4 rounded border flex items-center justify-center', selectedDOIds.includes(do_.id) ? 'bg-indigo-600 border-indigo-600' : 'bg-white']">
                     <i v-if="selectedDOIds.includes(do_.id)" class="pi pi-check text-[8px] text-white"></i>
                   </div>
                </td>
                <td class="px-3 py-2 font-black text-slate-700">{{ do_.code }}</td>
                <td class="px-3 py-2 text-slate-600">{{ do_.customer?.name || do_.customerId }}</td>
                <td class="px-3 py-2">
                  <span :class="statusClass(do_.status)">{{ do_.status }}</span>
                </td>
              </tr>
              <tr v-if="availableDOs.length === 0">
                <td colspan="4" class="px-3 py-10 text-center text-slate-400 italic">No available delivery orders found.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex items-center justify-between pt-4 border-t">
          <div class="text-xs font-black text-indigo-600 uppercase tracking-widest">{{ selectedDOIds.length }} selected</div>
          <div class="flex gap-2">
            <Button label="Cancel" severity="secondary" text size="small" @click="assignDialogOpen = false" />
            <Button label="Confirm Assignment" class="bg-indigo-600 border-none px-6 font-black text-xs" :disabled="selectedDOIds.length === 0" :loading="saving" @click="confirmAssignment" />
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';

type Trip = {
  id: string
  code: string
  routeDate: string
  vehicle?: { plateNo: string; vehicleType: string }
  driver?: { name: string; licenseType: string }
  status: string
  _count?: { deliveryOrders: number }
  deliveryOrders?: any[]
  checkpoints?: any[]
  departureAt?: string
  costs?: any[]
}

type Vehicle = { id: string; plateNo: string; vehicleType: string }
type Driver = { id: string; name: string; licenseType: string }

const api = useApi()
const auth = useAuthStore()
const toast = useToast()

const canManage = computed(() => auth.hasPermission('logistics.trip.manage'))
const canDispatch = computed(() => auth.hasPermission('logistics.dispatch.execute'))

const q = ref('')
const statusFilter = ref('')
const loading = ref(false)
const error = ref<string | null>(null)
const success = ref<string | null>(null)
const trips = ref<Trip[]>([])

const viewDialogOpen = ref(false)
const viewingTrip = ref<Trip | null>(null)

const createDialogOpen = ref(false)
const dispatchDialogOpen = ref(false)
const dispatchingTrip = ref<Trip | null>(null)
const saving = ref(false)
const dialogError = ref<string | null>(null)

const vehicles = ref<Vehicle[]>([])
const drivers = ref<Driver[]>([])

const costDialogOpen = ref(false)
const costForm = reactive({
  costType: 'FUEL',
  amount: 0,
  description: '',
})

const createForm = reactive({
  routeDate: new Date().toISOString().slice(0, 10),
  notes: '',
})

const dispatchForm = reactive({
  vehicleId: '',
  driverId: '',
  departureAt: new Date().toISOString().slice(0, 16) + ':00',
})

const assignDialogOpen = ref(false)
const assigningTripId = ref('')
const availableDOs = ref<any[]>([])
const selectedDOIds = ref<string[]>([])

const formatRp = (v: number) => 'Rp ' + Number(v).toLocaleString('id-ID')

const costIcon = (type: string) => {
  switch (type) {
    case 'FUEL': return 'pi pi-filter'
    case 'TOLL': return 'pi pi-map'
    case 'PARKING': return 'pi pi-car'
    case 'MEAL': return 'pi pi-heart'
    default: return 'pi pi-wallet'
  }
}

const costStatusClass = (status: string) => {
  if (status === 'APPROVED' || status === 'POSTED') return 'bg-emerald-50 text-emerald-700 border-emerald-100'
  if (status === 'SUBMITTED') return 'bg-blue-50 text-blue-700 border-blue-100'
  return 'bg-slate-100 text-slate-500 border-slate-200'
}

const totalCost = (costs: any[]) => costs.reduce((acc, c) => acc + Number(c.amount || 0), 0)

const openAddCost = () => {
  costForm.costType = 'FUEL'
  costForm.amount = 0
  costForm.description = ''
  costDialogOpen.value = true
}

const saveCost = async () => {
  if (!viewingTrip.value) return
  saving.value = true
  try {
    await api.post('/logistics/costs', {
      tripPlanId: viewingTrip.value.id,
      ...costForm,
    })
    const res = await api.get(`/logistics/trips/${viewingTrip.value.id}`)
    viewingTrip.value = res.data?.trip
    costDialogOpen.value = false
    toast.add({ severity: 'success', summary: 'Cost Added', detail: 'Operational cost recorded successfully.' })
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Error', detail: e?.response?.data?.message ?? 'Failed to save cost' })
  } finally {
    saving.value = false
  }
}

const fmt = (value?: string) => {
  if (!value) return '-'
  return value.slice(0, 16)
}

const statusClass = (status: string) => {
  switch (status) {
    case 'PLANNED': return 'px-2 py-0.5 rounded text-xs bg-slate-100'
    case 'READY': return 'px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-700'
    case 'DISPATCHED': return 'px-2 py-0.5 rounded text-xs bg-indigo-100 text-indigo-700'
    case 'IN_PROGRESS': return 'px-2 py-0.5 rounded text-xs bg-amber-100 text-amber-700'
    case 'COMPLETED': return 'px-2 py-0.5 rounded text-xs bg-emerald-100 text-emerald-700'
    case 'CANCELED': return 'px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-500'
    default: return 'px-2 py-0.5 rounded text-xs bg-slate-100'
  }
}

const load = async () => {
  loading.value = true
  error.value = null
  try {
    const params: any = {}
    if (q.value) params.q = q.value
    if (statusFilter.value) params.status = statusFilter.value
    const res = await api.get('/logistics/trips', { params })
    trips.value = res.data?.trips ?? []
  } catch (e: any) {
    error.value = e?.response?.data?.message ?? 'Failed to load trips'
  } finally {
    loading.value = false
  }
}

const openView = async (trip: Trip) => {
  try {
    const res = await api.get(`/logistics/trips/${trip.id}`)
    viewingTrip.value = res.data?.trip
    viewDialogOpen.value = true
  } catch (e: any) {
    error.value = e?.response?.data?.message ?? 'Failed to load trip'
  }
}

const openCreate = () => {
  dialogError.value = null
  createForm.routeDate = new Date().toISOString().slice(0, 10)
  createForm.notes = ''
  createDialogOpen.value = true
}

const create = async () => {
  saving.value = true
  dialogError.value = null
  try {
    await api.post('/logistics/trips', {
      routeDate: createForm.routeDate,
      notes: createForm.notes || undefined,
    })
    success.value = 'Trip created'
    createDialogOpen.value = false
    await load()
  } catch (e: any) {
    dialogError.value = e?.response?.data?.message ?? 'Failed to create trip'
  } finally {
    saving.value = false
  }
}

const openDispatch = async (trip: Trip) => {
  dialogError.value = null
  dispatchingTrip.value = trip
  dispatchForm.vehicleId = ''
  dispatchForm.driverId = ''
  dispatchForm.departureAt = new Date().toISOString().slice(0, 16) + ':00'
  try {
    const [vRes, dRes] = await Promise.all([
      api.get('/logistics/fleet', { params: { status: 'ACTIVE' } }),
      api.get('/logistics/drivers', { params: { status: 'ACTIVE' } }),
    ])
    vehicles.value = vRes.data?.vehicles ?? []
    drivers.value = dRes.data?.drivers ?? []
    dispatchDialogOpen.value = true
  } catch (e: any) {
    dialogError.value = 'Failed to load vehicles and drivers'
  }
}

const dispatch = async () => {
  saving.value = true
  dialogError.value = null
  try {
    await api.post(`/logistics/trips/${dispatchingTrip.value?.id}/dispatch`, {
      vehicleId: dispatchForm.vehicleId,
      driverId: dispatchForm.driverId,
      departureAt: dispatchForm.departureAt,
    })
    success.value = 'Trip dispatched'
    dispatchDialogOpen.value = false
    await load()
  } catch (e: any) {
    dialogError.value = e?.response?.data?.message ?? 'Failed to dispatch trip'
  } finally {
    saving.value = false
  }
}

const openAssign = async (trip: Trip) => {
  assigningTripId.value = trip.id
  selectedDOIds.value = []
  loading.value = true
  try {
    const res = await api.get('/logistics/delivery-orders')
    const allDOs = res.data.deliveryOrders || []
    // Filter DOs that are PLANNED or RELEASED and DON'T have a trip yet
    availableDOs.value = allDOs.filter((do_: any) => 
      ['PLANNED', 'RELEASED'].includes(do_.status) && !do_.tripPlanId
    )
    assignDialogOpen.value = true
  } catch (e) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to load available DOs' })
  } finally {
    loading.value = false
  }
}

const toggleSelect = (id: string) => {
  const idx = selectedDOIds.value.indexOf(id)
  if (idx > -1) selectedDOIds.value.splice(idx, 1)
  else selectedDOIds.value.push(id)
}

const confirmAssignment = async () => {
  saving.value = true
  try {
    await api.post(`/logistics/trips/${assigningTripId.value}/assign-deliveries`, {
      deliveryOrderIds: selectedDOIds.value,
    })
    toast.add({ severity: 'success', summary: 'Success', detail: `${selectedDOIds.value.length} DOs assigned successfully.` })
    assignDialogOpen.value = false
    // Refresh current view if open
    if (viewDialogOpen.value && viewingTrip.value?.id === assigningTripId.value) {
      await openView(viewingTrip.value)
    }
    await load()
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Error', detail: e?.response?.data?.message ?? 'Failed to assign DOs' })
  } finally {
    saving.value = false
  }
}

onMounted(load)
</script>
