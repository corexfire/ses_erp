<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useApi } from '~/composables/useApi'

const api = useApi()
const loading = ref(false)
const members = ref<any[]>([])
const searchQuery = ref('')
const selectedTier = ref('')
const showEditModal = ref(false)
const selectedMember = ref<any>(null)
const editForm = ref({ pointsBalance: 0, tier: 'BRONZE' })

const tiers = ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM']

const tierColors: Record<string, string> = {
  BRONZE: 'bg-amber-100 text-amber-700',
  SILVER: 'bg-slate-200 text-slate-700',
  GOLD: 'bg-yellow-100 text-yellow-700',
  PLATINUM: 'bg-purple-100 text-purple-700'
}

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val)
}

const loadMembers = async () => {
  loading.value = true
  try {
    const params: any = {}
    if (searchQuery.value) params.q = searchQuery.value
    if (selectedTier.value) params.tier = selectedTier.value
    const res = await api.get('/pos/loyalty', { params })
    members.value = res.data.members
  } finally {
    loading.value = false
  }
}

const openEdit = (member: any) => {
  selectedMember.value = member
  editForm.value = { pointsBalance: member.pointsBalance, tier: member.tier }
  showEditModal.value = true
}

const saveMember = async () => {
  if (!selectedMember.value) return
  loading.value = true
  try {
    await api.patch(`/pos/loyalty/${selectedMember.value.id}`, editForm.value)
    showEditModal.value = false
    await loadMembers()
  } catch (e: any) {
    alert(e.response?.data?.message || 'Failed to update')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadMembers()
})
</script>

<template>
  <div class="space-y-6 animate-fade-in pb-12">
    <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
      <div>
        <h1 class="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <i class="pi pi-star text-amber-500 bg-amber-50 p-2 rounded-xl"></i>
          Loyalty <span class="text-amber-600">Rewards</span>
        </h1>
        <p class="text-slate-500 font-medium mt-1">Manage customer loyalty points and tiers.</p>
      </div>
    </div>

    <div class="flex flex-col md:flex-row gap-4">
      <div class="relative flex-1">
        <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search by name, code, or phone..."
          class="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500"
          @keyup.enter="loadMembers"
        />
      </div>
      <Select v-model="selectedTier" :options="tiers" placeholder="All Tiers" class="w-48" @change="loadMembers" />
      <Button label="Search" icon="pi pi-search" @click="loadMembers" />
    </div>

    <div v-if="loading" class="flex items-center justify-center py-24">
      <i class="pi pi-spinner pi-spin text-4xl text-amber-600"></i>
    </div>

    <template v-else>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card v-for="tier in tiers" :key="tier" class="rounded-3xl shadow-sm border border-slate-50">
          <template #title>
            <span :class="tierColors[tier]" class="px-3 py-1 rounded-lg text-xs font-bold">
              {{ tier }}
            </span>
          </template>
          <template #content>
            <div class="text-2xl font-black text-slate-800">
              {{ members.filter(m => m.tier === tier).length }}
            </div>
            <div class="text-xs text-slate-400">members</div>
          </template>
        </Card>
      </div>

      <Card class="rounded-3xl shadow-sm border border-slate-50">
        <template #title>
          <span class="text-xs font-black text-slate-400 uppercase">Member Directory</span>
        </template>
        <template #content>
          <DataTable :value="members" stripedRows class="text-sm" :paginator="true" :rows="20">
            <Column field="customerId" header="Customer ID" class="font-mono text-xs" />
            <Column field="tier" header="Tier">
              <template #body="{ data }">
                <span :class="tierColors[data.tier]" class="px-3 py-1 rounded-lg text-xs font-bold">
                  {{ data.tier }}
                </span>
              </template>
            </Column>
            <Column field="pointsBalance" header="Points">
              <template #body="{ data }">
                <span class="font-black text-amber-600">{{ data.pointsBalance.toLocaleString() }}</span>
              </template>
            </Column>
            <Column field="createdAt" header="Joined">
              <template #body="{ data }">{{ new Date(data.createdAt).toLocaleDateString() }}</template>
            </Column>
            <Column header="Actions">
              <template #body="{ data }">
                <Button icon="pi pi-pencil" text rounded size="small" @click="openEdit(data)" />
              </template>
            </Column>
          </DataTable>
        </template>
      </Card>
    </template>

    <Dialog v-model:visible="showEditModal" header="Edit Member" modal class="w-[400px]">
      <div class="space-y-4">
        <div class="bg-slate-50 p-3 rounded-xl">
          <div class="text-xs text-slate-500">Customer ID</div>
          <div class="font-mono text-sm">{{ selectedMember?.customerId }}</div>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-500 mb-1">Tier</label>
          <Select v-model="editForm.tier" :options="tiers" class="w-full" />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-500 mb-1">Points Balance</label>
          <InputNumber v-model="editForm.pointsBalance" class="w-full" />
        </div>
        <div class="bg-amber-50 p-3 rounded-xl">
          <div class="text-xs text-amber-600">Points Value</div>
          <div class="font-black text-amber-800">{{ formatCurrency(editForm.pointsBalance * 100) }}</div>
          <div class="text-[10px] text-amber-500">100 points = IDR 1,000</div>
        </div>
      </div>
      <template #footer>
        <Button label="Cancel" text @click="showEditModal = false" />
        <Button label="Save Changes" :loading="loading" @click="saveMember" />
      </template>
    </Dialog>
  </div>
</template>