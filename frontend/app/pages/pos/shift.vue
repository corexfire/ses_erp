<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useApi } from '~/composables/useApi'

const api = useApi()
const loading = ref(false)
const currentShift = ref<any>(null)
const showOpenModal = ref(false)
const showCloseModal = ref(false)
const shifts = ref<any[]>([])
const stats = ref<any>(null)

const openForm = ref({
  terminalId: 'POS-01',
  startingCash: 0,
  notes: ''
})

const closeForm = ref({
  endingCash: 0,
  notes: ''
})

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val)
}

const loadCurrentShift = async () => {
  try {
    const res = await api.get('/pos/shift/current')
    currentShift.value = res.data.shift
  } catch (e) {
    currentShift.value = null
  }
}

const loadShifts = async () => {
  loading.value = true
  try {
    const res = await api.get('/pos/shift')
    shifts.value = res.data.shifts
  } finally {
    loading.value = false
  }
}

const loadStats = async () => {
  try {
    const res = await api.get('/pos/stats')
    stats.value = res.data
  } catch (e) {
    stats.value = null
  }
}

const openShift = async () => {
  loading.value = true
  try {
    await api.post('/pos/shift', openForm.value)
    showOpenModal.value = false
    await loadCurrentShift()
    await loadShifts()
    await loadStats()
  } catch (e: any) {
    alert(e.response?.data?.message || 'Failed to open shift')
  } finally {
    loading.value = false
  }
}

const closeShift = async () => {
  if (!currentShift.value) return
  loading.value = true
  try {
    const res = await api.patch(`/pos/shift/${currentShift.value.id}/close`, closeForm.value)
    showCloseModal.value = false
    alert(`Shift closed! Difference: ${formatCurrency(res.data.summary.difference)}`)
    await loadCurrentShift()
    await loadShifts()
    await loadStats()
  } catch (e: any) {
    alert(e.response?.data?.message || 'Failed to close shift')
  } finally {
    loading.value = false
  }
}

const difference = computed(() => {
  if (!currentShift.value || !stats.value) return 0
  const totalSales = stats.value.todayRevenue
  return Number(closeForm.value.endingCash) - (Number(currentShift.value.startingCash) + totalSales)
})

onMounted(() => {
  loadCurrentShift()
  loadShifts()
  loadStats()
})
</script>

<template>
  <div class="space-y-6 animate-fade-in pb-12">
    <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
      <div>
        <h1 class="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <i class="pi pi-clock text-emerald-600 bg-emerald-50 p-2 rounded-xl"></i>
          POS <span class="text-emerald-600">Shift</span>
        </h1>
        <p class="text-slate-500 font-medium mt-1">Manage daily shift operations and cash reconciliation.</p>
      </div>
      <div class="flex gap-2">
        <Button v-if="!currentShift" label="Open Shift" icon="pi pi-plus" class="rounded-xl" @click="showOpenModal = true" />
        <Button v-else label="Close Shift" icon="pi pi-times" severity="danger" class="rounded-xl" @click="showCloseModal = true" />
      </div>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-24">
      <i class="pi pi-spinner pi-spin text-4xl text-emerald-600"></i>
    </div>

    <template v-else>
      <div v-if="currentShift" class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-white p-4 rounded-3xl shadow-sm border border-slate-50">
          <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</div>
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <span class="text-lg font-black text-emerald-600">OPEN</span>
          </div>
        </div>
        <div class="bg-white p-4 rounded-3xl shadow-sm border border-slate-50">
          <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Terminal</div>
          <div class="text-lg font-black text-slate-800">{{ currentShift.terminalId }}</div>
        </div>
        <div class="bg-white p-4 rounded-3xl shadow-sm border border-slate-50">
          <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Starting Cash</div>
          <div class="text-lg font-black text-slate-800">{{ formatCurrency(currentShift.startingCash) }}</div>
        </div>
        <div class="bg-white p-4 rounded-3xl shadow-sm border border-slate-50">
          <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Today's Sales</div>
          <div class="text-lg font-black text-emerald-600">{{ stats ? formatCurrency(stats.todayRevenue) : formatCurrency(0) }}</div>
        </div>
      </div>

      <div v-else class="bg-emerald-50 border border-emerald-200 rounded-3xl p-12 text-center">
        <i class="pi pi-shopping-cart text-6xl text-emerald-200 mb-4"></i>
        <h3 class="text-xl font-black text-emerald-800 mb-2">No Active Shift</h3>
        <p class="text-emerald-600 mb-4">Start your day by opening a new shift</p>
        <Button label="Open Shift Now" icon="pi pi-plus" @click="showOpenModal = true" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card class="rounded-3xl shadow-sm border border-slate-50">
          <template #title><span class="text-xs font-black text-slate-400 uppercase">Today's Transactions</span></template>
          <template #content>
            <div class="text-3xl font-black text-slate-800">{{ stats?.todayTransactions || 0 }}</div>
          </template>
        </Card>
        <Card class="rounded-3xl shadow-sm border border-slate-50">
          <template #title><span class="text-xs font-black text-slate-400 uppercase">Open Shifts</span></template>
          <template #content>
            <div class="text-3xl font-black text-slate-800">{{ stats?.openShifts || 0 }}</div>
          </template>
        </Card>
        <Card class="rounded-3xl shadow-sm border border-slate-50">
          <template #title><span class="text-xs font-black text-slate-400 uppercase">Loyalty Members</span></template>
          <template #content>
            <div class="text-3xl font-black text-slate-800">{{ stats?.totalMembers || 0 }}</div>
          </template>
        </Card>
      </div>

      <Card class="rounded-3xl shadow-sm border border-slate-50">
        <template #title>
          <div class="flex justify-between items-center">
            <span class="text-xs font-black text-slate-400 uppercase">Shift History</span>
          </div>
        </template>
        <template #content>
          <DataTable :value="shifts" stripedRows class="text-sm" :paginator="true" :rows="10">
            <Column field="id" header="ID" class="font-mono text-xs" />
            <Column field="terminalId" header="Terminal" />
            <Column field="status" header="Status">
              <template #body="{ data }">
                <span :class="data.status === 'OPEN' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'" class="px-2 py-1 rounded-lg text-xs font-bold">
                  {{ data.status }}
                </span>
              </template>
            </Column>
            <Column field="startingCash" header="Start Cash">
              <template #body="{ data }">{{ formatCurrency(data.startingCash) }}</template>
            </Column>
            <Column field="endingCash" header="End Cash">
              <template #body="{ data }">{{ data.endingCash ? formatCurrency(data.endingCash) : '-' }}</template>
            </Column>
            <Column field="startTime" header="Start Time">
              <template #body="{ data }">{{ new Date(data.startTime).toLocaleString() }}</template>
            </Column>
            <Column field="endTime" header="End Time">
              <template #body="{ data }">{{ data.endTime ? new Date(data.endTime).toLocaleString() : '-' }}</template>
            </Column>
          </DataTable>
        </template>
      </Card>
    </template>

    <Dialog v-model:visible="showOpenModal" header="Open New Shift" modal class="w-[400px]">
      <div class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-slate-500 mb-1">Terminal ID</label>
          <InputText v-model="openForm.terminalId" class="w-full" />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-500 mb-1">Starting Cash</label>
          <InputNumber v-model="openForm.startingCash" mode="currency" currency="IDR" locale="id-ID" class="w-full" />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-500 mb-1">Notes</label>
          <Textarea v-model="openForm.notes" rows="2" class="w-full" />
        </div>
      </div>
      <template #footer>
        <Button label="Cancel" text @click="showOpenModal = false" />
        <Button label="Open Shift" :loading="loading" @click="openShift" />
      </template>
    </Dialog>

    <Dialog v-model:visible="showCloseModal" header="Close Shift" modal class="w-[400px]">
      <div class="space-y-4">
        <div class="bg-emerald-50 p-4 rounded-xl">
          <div class="flex justify-between text-sm mb-2">
            <span class="text-slate-500">Starting Cash:</span>
            <span class="font-bold">{{ formatCurrency(currentShift?.startingCash || 0) }}</span>
          </div>
          <div class="flex justify-between text-sm mb-2">
            <span class="text-slate-500">Total Sales:</span>
            <span class="font-bold">{{ formatCurrency(stats?.todayRevenue || 0) }}</span>
          </div>
          <div class="flex justify-between text-sm border-t border-emerald-200 pt-2 mt-2">
            <span class="text-emerald-800 font-bold">Expected:</span>
            <span class="font-bold text-emerald-800">{{ formatCurrency((currentShift?.startingCash || 0) + (stats?.todayRevenue || 0)) }}</span>
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-500 mb-1">Actual Ending Cash</label>
          <InputNumber v-model="closeForm.endingCash" mode="currency" currency="IDR" locale="id-ID" class="w-full" />
        </div>
        <div class="bg-slate-50 p-4 rounded-xl">
          <div class="flex justify-between">
            <span class="text-slate-500">Difference:</span>
            <span :class="difference >= 0 ? 'text-emerald-600' : 'text-rose-600'" class="font-black">{{ formatCurrency(difference) }}</span>
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-500 mb-1">Notes</label>
          <Textarea v-model="closeForm.notes" rows="2" class="w-full" />
        </div>
      </div>
      <template #footer>
        <Button label="Cancel" text @click="showCloseModal = false" />
        <Button label="Close Shift" severity="danger" :loading="loading" @click="closeShift" />
      </template>
    </Dialog>
  </div>
</template>