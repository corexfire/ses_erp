<template>
  <div class="space-y-4">
    <div class="rounded-xl border bg-white p-5">
      <div class="text-sm font-semibold">Logistics Dashboard</div>
      <div class="mt-1 text-sm text-slate-600">Overview of delivery operations and performance metrics.</div>
    </div>

    <div v-if="loading" class="flex justify-center py-8">
      <div class="text-sm text-slate-500">Loading...</div>
    </div>

    <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4">
      <div class="text-sm text-red-600">{{ error }}</div>
    </div>

    <template v-else-if="stats">
      <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div class="rounded-xl border bg-white p-4">
          <div class="text-xs text-slate-500">Total DO</div>
          <div class="mt-1 text-2xl font-bold">{{ stats.summary.totalDo }}</div>
          <div class="mt-1 text-xs text-slate-400">All statuses</div>
        </div>
        <div class="rounded-xl border bg-white p-4">
          <div class="text-xs text-slate-500">In Transit</div>
          <div class="mt-1 text-2xl font-bold text-blue-600">{{ stats.summary.inTransitDo }}</div>
          <div class="mt-1 text-xs text-slate-400">Pending delivery</div>
        </div>
        <div class="rounded-xl border bg-white p-4">
          <div class="text-xs text-slate-500">Delivered</div>
          <div class="mt-1 text-2xl font-bold text-emerald-600">{{ stats.summary.deliveredDo }}</div>
          <div class="mt-1 text-xs text-slate-400">Completed</div>
        </div>
        <div class="rounded-xl border bg-white p-4">
          <div class="text-xs text-slate-500">OTIF Rate</div>
          <div class="mt-1 text-2xl font-bold text-purple-600">{{ stats.otifRate }}%</div>
          <div class="mt-1 text-xs text-slate-400">On time in full</div>
        </div>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <div class="rounded-xl border bg-white p-5">
          <div class="text-sm font-semibold">Delivery Order Status</div>
          <div class="mt-3 space-y-2">
            <div v-for="(count, status) in stats.deliveryOrderStatusCount" :key="status" class="flex items-center justify-between text-sm">
              <span class="text-slate-600">{{ status }}</span>
              <span class="font-medium">{{ count }}</span>
            </div>
            <div v-if="Object.keys(stats.deliveryOrderStatusCount).length === 0" class="text-sm text-slate-400">No data</div>
          </div>
        </div>

        <div class="rounded-xl border bg-white p-5">
          <div class="text-sm font-semibold">Trip Status</div>
          <div class="mt-3 space-y-2">
            <div v-for="(count, status) in stats.tripStatusCount" :key="status" class="flex items-center justify-between text-sm">
              <span class="text-slate-600">{{ status }}</span>
              <span class="font-medium">{{ count }}</span>
            </div>
            <div v-if="Object.keys(stats.tripStatusCount).length === 0" class="text-sm text-slate-400">No data</div>
          </div>
        </div>
      </div>

      <div class="rounded-xl border bg-white p-5">
        <div class="flex items-center justify-between">
          <div class="text-sm font-semibold">Today's Deliveries</div>
          <div class="text-xs text-slate-500">{{ stats.todayDeliveries.count }} orders</div>
        </div>
        <div class="mt-3 overflow-hidden rounded-lg border">
          <table class="w-full text-xs">
            <thead class="bg-slate-50 text-left text-slate-600">
              <tr>
                <th class="px-3 py-2">Code</th>
                <th class="px-3 py-2">Customer</th>
                <th class="px-3 py-2">Address</th>
                <th class="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="do_ in stats.todayDeliveries.items" :key="do_.id" class="border-t">
                <td class="px-3 py-2 font-medium">{{ do_.code }}</td>
                <td class="px-3 py-2">{{ do_.customer?.name || do_.customerId }}</td>
                <td class="px-3 py-2 text-slate-500">{{ do_.deliveryCity || '-' }}</td>
                <td class="px-3 py-2">{{ do_.status }}</td>
              </tr>
              <tr v-if="stats.todayDeliveries.items.length === 0">
                <td colspan="4" class="px-3 py-4 text-center text-slate-500">No deliveries scheduled</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="rounded-xl border bg-white p-5">
        <div class="flex items-center justify-between">
          <div class="text-sm font-semibold">Active Trips</div>
          <div class="text-xs text-slate-500">{{ stats.activeTrips.count }} trips</div>
        </div>
        <div class="mt-3 overflow-hidden rounded-lg border">
          <table class="w-full text-xs">
            <thead class="bg-slate-50 text-left text-slate-600">
              <tr>
                <th class="px-3 py-2">Code</th>
                <th class="px-3 py-2">Vehicle</th>
                <th class="px-3 py-2">Driver</th>
                <th class="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="trip in stats.activeTrips.items" :key="trip.id" class="border-t">
                <td class="px-3 py-2 font-medium">{{ trip.code }}</td>
                <td class="px-3 py-2">{{ trip.vehicle?.plateNo || '-' }}</td>
                <td class="px-3 py-2">{{ trip.driver?.name || '-' }}</td>
                <td class="px-3 py-2">{{ trip.status }}</td>
              </tr>
              <tr v-if="stats.activeTrips.items.length === 0">
                <td colspan="4" class="px-3 py-4 text-center text-slate-500">No active trips</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const api = useApi()
const auth = useAuthStore()

const canRead = computed(() => auth.hasPermission('logistics.dashboard.read'))
const loading = ref(false)
const error = ref<string | null>(null)
const stats = ref<any>(null)

const load = async () => {
  if (!canRead.value) {
    error.value = 'You do not have permission to view this page'
    return
  }

  loading.value = true
  error.value = null
  try {
    const res = await api.get('/logistics/dashboard')
    stats.value = res.data
  } catch (e: any) {
    error.value = e?.response?.data?.message ?? 'Failed to load dashboard'
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>
