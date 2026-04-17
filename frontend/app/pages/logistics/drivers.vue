<template>
  <div class="space-y-4">
    <div class="rounded-xl border bg-white p-5">
      <div class="text-sm font-semibold">Driver Management</div>
      <div class="mt-1 text-sm text-slate-600">Manage logistics drivers and their assignments.</div>
    </div>

    <div class="rounded-xl border bg-white p-5">
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <InputText v-model="q" placeholder="Search code or name..." class="w-72" :disabled="!canRead" />
          <select v-model="statusFilter" class="h-10 rounded-md border px-2 text-sm">
            <option value="">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="ON_LEAVE">On Leave</option>
            <option value="INACTIVE">Inactive</option>
          </select>
          <Button label="Search" severity="secondary" :disabled="loading || !canRead" @click="load" />
        </div>
        <Button label="New Driver" :disabled="!canManage" @click="openCreate" />
      </div>

      <div class="mt-4 overflow-hidden rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-slate-50 text-left text-xs text-slate-600">
            <tr>
              <th class="px-3 py-2">Code</th>
              <th class="px-3 py-2">Name</th>
              <th class="px-3 py-2">License</th>
              <th class="px-3 py-2">Phone</th>
              <th class="px-3 py-2">Status</th>
              <th class="px-3 py-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="driver in drivers" :key="driver.id" class="border-t">
              <td class="px-3 py-2 font-medium">{{ driver.code }}</td>
              <td class="px-3 py-2">{{ driver.name }}</td>
              <td class="px-3 py-2 text-xs text-slate-500">{{ driver.licenseType }} {{ driver.licenseNo ? `- ${driver.licenseNo}` : '' }}</td>
              <td class="px-3 py-2 text-xs">{{ driver.phone || '-' }}</td>
              <td class="px-3 py-2">
                <span :class="statusClass(driver.status)">{{ driver.status }}</span>
              </td>
              <td class="px-3 py-2 text-right">
                <Button label="Edit" size="small" severity="secondary" :disabled="!canManage" @click="openEdit(driver)" />
              </td>
            </tr>
            <tr v-if="drivers.length === 0">
              <td colspan="6" class="px-3 py-6 text-center text-sm text-slate-500">No drivers found</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="error" class="mt-3 text-sm text-red-600">{{ error }}</div>
      <div v-if="success" class="mt-3 text-sm text-emerald-700">{{ success }}</div>
    </div>

    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div class="w-full max-w-2xl rounded-xl border bg-white p-5 shadow-xl">
        <div class="text-sm font-semibold">{{ editingId ? 'Edit Driver' : 'New Driver' }}</div>

        <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div class="space-y-2">
            <div class="text-xs text-slate-600">Name</div>
            <InputText v-model="form.name" class="w-full" :disabled="!canManage" />
          </div>
          <div class="space-y-2">
            <div class="text-xs text-slate-600">License Type</div>
            <select v-model="form.licenseType" class="h-10 w-full rounded-md border px-2 text-sm" :disabled="!canManage">
              <option value="A">A - Motorcycle</option>
              <option value="B1">B1 - Car up to 4 wheels</option>
              <option value="B2">B2 - Truck up to 12 tons</option>
              <option value="C">C - Large vehicle</option>
              <option value="D">D - Bus</option>
            </select>
          </div>
          <div class="space-y-2">
            <div class="text-xs text-slate-600">License Number</div>
            <InputText v-model="form.licenseNo" class="w-full" :disabled="!canManage" />
          </div>
          <div class="space-y-2">
            <div class="text-xs text-slate-600">License Expiry</div>
            <InputText v-model="form.licenseExpiry" class="w-full" placeholder="YYYY-MM-DD" :disabled="!canManage" />
          </div>
          <div class="space-y-2">
            <div class="text-xs text-slate-600">Phone</div>
            <InputText v-model="form.phone" class="w-full" :disabled="!canManage" />
          </div>
          <div class="space-y-2">
            <div class="text-xs text-slate-600">Email</div>
            <InputText v-model="form.email" class="w-full" type="email" :disabled="!canManage" />
          </div>
          <div class="space-y-2 md:col-span-2">
            <div class="text-xs text-slate-600">Address</div>
            <textarea v-model="form.address" class="w-full rounded-md border p-2 text-sm" rows="2" :disabled="!canManage"></textarea>
          </div>
        </div>

        <div class="mt-5 flex items-center justify-end gap-2">
          <Button label="Cancel" severity="secondary" @click="closeDialog" />
          <Button label="Save" :loading="saving" :disabled="saving || !canManage || !form.name" @click="save" />
        </div>

        <div v-if="dialogError" class="mt-3 text-sm text-red-600">{{ dialogError }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Driver = {
  id: string
  code: string
  name: string
  licenseType: string
  licenseNo?: string
  licenseExpiry?: string
  phone?: string
  email?: string
  address?: string
  status: string
}

const api = useApi()
const auth = useAuthStore()

const canRead = computed(() => auth.hasPermission('logistics.driver.read'))
const canManage = computed(() => auth.hasPermission('logistics.driver.manage'))

const q = ref('')
const statusFilter = ref('')
const loading = ref(false)
const error = ref<string | null>(null)
const success = ref<string | null>(null)
const drivers = ref<Driver[]>([])

const dialogOpen = ref(false)
const saving = ref(false)
const dialogError = ref<string | null>(null)
const editingId = ref<string | null>(null)

const form = reactive({
  name: '',
  licenseType: 'B1',
  licenseNo: '',
  licenseExpiry: '',
  phone: '',
  email: '',
  address: '',
})

const statusClass = (status: string) => {
  switch (status) {
    case 'ACTIVE': return 'px-2 py-0.5 rounded text-xs bg-emerald-100 text-emerald-700'
    case 'ON_LEAVE': return 'px-2 py-0.5 rounded text-xs bg-amber-100 text-amber-700'
    case 'INACTIVE': return 'px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-600'
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
    const res = await api.get('/logistics/drivers', { params })
    drivers.value = res.data?.drivers ?? []
  } catch (e: any) {
    error.value = e?.response?.data?.message ?? 'Failed to load drivers'
  } finally {
    loading.value = false
  }
}

const openCreate = () => {
  editingId.value = null
  dialogError.value = null
  form.name = ''
  form.licenseType = 'B1'
  form.licenseNo = ''
  form.licenseExpiry = ''
  form.phone = ''
  form.email = ''
  form.address = ''
  dialogOpen.value = true
}

const openEdit = async (driver: Driver) => {
  editingId.value = driver.id
  dialogError.value = null
  form.name = driver.name
  form.licenseType = driver.licenseType
  form.licenseNo = driver.licenseNo ?? ''
  form.licenseExpiry = driver.licenseExpiry ? String(driver.licenseExpiry).slice(0, 10) : ''
  form.phone = driver.phone ?? ''
  form.email = driver.email ?? ''
  form.address = driver.address ?? ''
  dialogOpen.value = true
}

const closeDialog = () => {
  dialogOpen.value = false
  dialogError.value = null
}

const save = async () => {
  saving.value = true
  dialogError.value = null
  try {
    const payload = {
      name: form.name,
      licenseType: form.licenseType,
      licenseNo: form.licenseNo || undefined,
      licenseExpiry: form.licenseExpiry || undefined,
      phone: form.phone || undefined,
      email: form.email || undefined,
      address: form.address || undefined,
    }
    if (editingId.value) {
      await api.patch(`/logistics/drivers/${editingId.value}`, payload)
      success.value = 'Driver updated'
    } else {
      await api.post('/logistics/drivers', payload)
      success.value = 'Driver created'
    }
    closeDialog()
    await load()
  } catch (e: any) {
    dialogError.value = e?.response?.data?.message ?? 'Failed to save driver'
  } finally {
    saving.value = false
  }
}

onMounted(load)
</script>
