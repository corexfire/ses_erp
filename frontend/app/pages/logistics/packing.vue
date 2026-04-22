<template>
  <div class="p-4 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 overflow-hidden relative p-8 rounded-xl bg-indigo-900 border border-indigo-800 shadow-2xl">
      <div class="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div class="relative z-10">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-full backdrop-blur-md border border-white/10">Logistik</span>
           <span class="text-white/30">/</span>
           <span class="text-[10px] font-bold text-indigo-200 uppercase tracking-widest">Packing & Cartonization</span>
        </div>
        <h1 class="text-4xl font-black text-white px-0.5 tracking-tight mb-2">Packing <span class="text-emerald-400 text-3xl opacity-80 font-medium tracking-tighter ml-1 italic">Intelligence</span></h1>
        <p class="text-indigo-100/60 text-sm font-medium">Kelola proses pengepakan, verifikasi item, dan optimasi volume pengiriman untuk efisiensi distribusi maksimal.</p>
      </div>

      <div class="flex items-center gap-3 relative z-10">
        <Button icon="pi pi-refresh" severity="secondary" rounded text class="text-white hover:bg-white/10" @click="load" :loading="loading" />
        <Button label="Buat Packing List" icon="pi pi-box" class="p-button-rounded font-black text-xs shadow-xl bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600" @click="openCreate" />
      </div>
    </div>

    <!-- Stats Ribbon -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
       <div v-for="s in stats" :key="s.label" class="group p-4 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <i :class="[s.icon, 'text-6xl text-slate-900']"></i>
          </div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ s.label }}</p>
          <div class="flex items-baseline gap-1">
             <h3 class="text-2xl font-black text-slate-900">{{ s.value }}</h3>
             <span class="text-[10px] font-bold text-slate-400 uppercase">{{ s.unit }}</span>
          </div>
          <div class="flex items-center gap-2 mt-2">
             <span :class="['text-[9px] font-black px-2 py-0.5 rounded-full', s.color]">{{ s.sub }}</span>
          </div>
       </div>
    </div>

    <!-- Main List Section -->
    <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col">
       <div class="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between bg-slate-50/10 gap-4">
          <div>
             <h2 class="text-[13px] font-black text-slate-900 uppercase tracking-widest">Daftar Packing Operasional</h2>
             <p class="text-xs text-slate-500 font-medium whitespace-nowrap">Monitor status pengepakan dan verifikasi kontainer pengiriman.</p>
          </div>
          <div class="flex items-center gap-3">
             <div class="p-input-icon-left">
                <i class="pi pi-search text-slate-400 pl-4" />
                <InputText v-model="q" placeholder="Cari Kode atau Tanda Kirim..." class="p-inputtext-sm rounded-xl border-slate-200 pl-10 w-64" />
             </div>
             <Select v-model="statusFilter" :options="statusOptions" optionLabel="label" optionValue="value" placeholder="Status Filter" class="p-select-sm rounded-xl text-[10px] font-bold uppercase w-48" />
          </div>
       </div>

       <DataTable :value="packingLists" dataKey="id" class="p-datatable-sm w-full" :loading="loading" :rows="10" paginator>
          <Column field="code" header="KODE SLIP" class="pl-8">
             <template #body="{ data }">
                <span class="text-[11px] font-black text-slate-900 tracking-wider hover:text-indigo-600 cursor-pointer" @click="openView(data)">{{ data.code }}</span>
             </template>
          </Column>
          <Column header="ORDER REFERENSI">
             <template #body="{ data }">
                <div class="flex flex-col">
                   <span class="text-[11px] font-black text-slate-900 uppercase leading-none mb-1">{{ data.deliveryOrder?.code || 'N/A' }}</span>
                   <span class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{{ data.deliveryOrder?.customer?.name || '-' }}</span>
                </div>
             </template>
          </Column>
          <Column header="CARRIER & SEAL">
             <template #body="{ data }">
                <div class="flex items-center gap-3">
                   <div class="flex flex-col">
                      <span class="text-[10px] font-black text-slate-700 leading-none">{{ data.carrier?.name || 'SELF-PICKED' }}</span>
                      <span v-if="data.sealNumber" class="text-[9px] font-bold text-emerald-600 uppercase tracking-widest mt-0.5">Seal: {{ data.sealNumber }}</span>
                   </div>
                </div>
             </template>
          </Column>
          <Column header="METRIK FISIK">
             <template #body="{ data }">
                <div class="flex items-center gap-4 text-[10px] font-black">
                   <div class="flex flex-col items-center">
                      <span class="text-slate-900 leading-none">{{ data.totalWeight || 0 }}</span>
                      <span class="text-slate-400 text-[8px] uppercase">KG</span>
                   </div>
                   <div class="flex flex-col items-center">
                      <span class="text-slate-900 leading-none">{{ data.totalVolume || 0 }}</span>
                      <span class="text-slate-400 text-[8px] uppercase">CBM</span>
                   </div>
                   <div class="flex flex-col items-center ml-2 border-l border-slate-100 pl-3">
                      <span class="text-indigo-600 leading-none">{{ data.packageCount || 1 }}</span>
                      <span class="text-slate-400 text-[8px] uppercase">Packages</span>
                   </div>
                </div>
             </template>
          </Column>
          <Column header="STATUS">
             <template #body="{ data }">
                <span :class="['px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest', statusClass(data.status)]">
                   {{ data.status }}
                </span>
             </template>
          </Column>
          <Column class="text-right pr-8">
             <template #body="{ data }">
                <div class="flex gap-2 justify-end">
                   <Button icon="pi pi-eye" severity="secondary" rounded text @click="openView(data)" v-tooltip.top="'Lihat Detail'" />
                   <Button v-if="data.status === 'DRAFT'" icon="pi pi-check" severity="success" rounded text @click="confirmPacking(data)" v-tooltip.top="'Konfirmasi Packing'" />
                   <Button icon="pi pi-print" severity="secondary" rounded text v-tooltip.top="'Cetak Label'" />
                </div>
             </template>
          </Column>
       </DataTable>
    </div>

    <!-- Master Intelligence Drawer -->
    <Drawer v-model:visible="drawerVisible" :header="drawerHeader" position="right" class="w-[800px]">
       <div class="h-full flex flex-col pt-4">
          <Tabs v-model:value="activeTab" class="px-6 border-b border-slate-100">
             <TabList class="gap-8">
                <Tab value="logistic" class="text-[11px] font-black uppercase tracking-widest pb-4">Logistik & Pengiriman</Tab>
                <Tab value="items" class="text-[11px] font-black uppercase tracking-widest pb-4">Verifikasi Item</Tab>
                <Tab value="marks" class="text-[11px] font-black uppercase tracking-widest pb-4">Tanda & Catatan</Tab>
             </TabList>
          </Tabs>

          <div class="flex-1 overflow-y-auto p-8 bg-slate-50/30 custom-scrollbar pb-32">
             <!-- Tab 1: Logistics -->
             <div v-if="activeTab === 'logistic'" class="space-y-6">
                <div class="grid grid-cols-2 gap-4">
                   <div class="space-y-1">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Delivery Order (Ref)</label>
                      <Select v-model="form.deliveryOrderId" :options="deliveryOrders" optionLabel="label" optionValue="value" :disabled="!!editingId" class="w-full rounded-xl border-slate-200" placeholder="Pilih Order" />
                   </div>
                   <div class="space-y-1">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Carrier (Kurir)</label>
                      <Select v-model="form.carrierId" :options="carriers" optionLabel="name" optionValue="id" class="w-full rounded-xl" placeholder="Pilih Carrier" />
                   </div>
                </div>

                <div class="p-8 rounded-xl bg-indigo-950 text-white relative overflow-hidden shadow-2xl">
                   <div class="absolute top-0 right-0 p-8 opacity-10"><i class="pi pi-chart-bar text-9xl"></i></div>
                   <h4 class="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-6">Physical Metrics & Validation</h4>
                   <div class="grid grid-cols-3 gap-8 relative z-10">
                      <div class="space-y-2">
                         <label class="text-[8px] font-black text-indigo-200 uppercase tracking-widest">Total Weight (KG)</label>
                         <InputNumber v-model="form.totalWeight" :minFractionDigits="2" class="w-full border-b border-white/20 bg-transparent text-white font-black text-lg p-inputnumber-sm" inputClass="bg-transparent text-white border-0" />
                      </div>
                      <div class="space-y-2">
                         <label class="text-[8px] font-black text-indigo-200 uppercase tracking-widest">Total Volume (CBM)</label>
                         <InputNumber v-model="form.totalVolume" :minFractionDigits="3" class="w-full border-b border-white/20 bg-transparent text-white font-black text-lg p-inputnumber-sm" inputClass="bg-transparent text-white border-0" />
                      </div>
                      <div class="space-y-2">
                         <label class="text-[8px] font-black text-indigo-200 uppercase tracking-widest">Package Quantity</label>
                         <InputNumber v-model="form.packageCount" class="w-full border-b border-white/20 bg-transparent text-white font-black text-lg p-inputnumber-sm" inputClass="bg-transparent text-white border-0" />
                      </div>
                   </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                   <div class="space-y-1">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Seal Number (Segel)</label>
                      <InputText v-model="form.sealNumber" placeholder="Ex: SL-00921" class="w-full rounded-xl border-slate-200" />
                   </div>
                   <div class="space-y-1">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Warehouse (Gudang)</label>
                      <Select v-model="form.warehouseId" :options="warehouses" optionLabel="name" optionValue="id" class="w-full rounded-xl" />
                   </div>
                </div>
             </div>

             <!-- Tab 2: Item Verification -->
             <div v-if="activeTab === 'items'" class="space-y-6">
                <div v-if="!form.deliveryOrderId" class="p-12 text-center rounded-3xl border-2 border-dashed border-slate-200">
                   <i class="pi pi-search text-3xl text-slate-300 mb-3 block"></i>
                   <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pilih Delivery Order untuk melihat daftar item</p>
                </div>
                <div v-else class="space-y-3">
                   <div v-for="item in activeDoItems" :key="item.id" class="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between group hover:border-indigo-400 transition-colors">
                      <div class="flex flex-col">
                         <span class="text-[11px] font-black text-slate-900 uppercase leading-none mb-1">{{ item.item?.name || item.itemId }}</span>
                         <span class="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">SKU: {{ item.item?.code || '-' }} • UOM: {{ item.uomCode || 'PCS' }}</span>
                      </div>
                      <div class="flex items-center gap-4">
                         <div class="text-right">
                            <span class="text-[10px] font-black text-slate-900 block leading-none">{{ item.qty || 0 }}</span>
                            <span class="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Order Qty</span>
                         </div>
                         <i class="pi pi-check-circle text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                      </div>
                   </div>
                </div>
             </div>

             <!-- Tab 3: Marks & Notes -->
             <div v-if="activeTab === 'marks'" class="space-y-6">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Shipping Marks (Tanda Pengiriman)</label>
                   <Textarea v-model="form.shippingMark" rows="4" class="w-full rounded-2xl border-slate-200 text-sm p-4 font-mono font-bold text-slate-700" placeholder="Ex: SHIP TO SINGAPORE HARBOUR\nFRAGILE" />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Notes (Catatan Internal)</label>
                   <Textarea v-model="form.notes" rows="4" class="w-full rounded-2xl border-slate-200 text-sm p-4" placeholder="Metode packing khusus..." />
                </div>
             </div>
          </div>

          <!-- Actions -->
          <div class="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 flex items-center justify-between rounded-t-[2.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
             <div class="flex items-center gap-4">
                <div v-if="form.status === 'CONFIRMED'" class="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full">
                   <i class="pi pi-verified text-sm"></i>
                   <span class="text-[10px] font-black uppercase tracking-widest">Packed & Validated</span>
                </div>
             </div>
             <div class="flex items-center gap-3">
                <Button label="Batalkan" severity="secondary" text @click="drawerVisible = false" class="font-black text-[10px] uppercase" />
                <Button :label="editingId ? 'Simpan Update' : 'Generate Slip Packing'" icon="pi pi-check" class="p-button-rounded font-black text-[10px] uppercase px-8 bg-slate-900 border-slate-900" @click="save" :loading="saving" />
             </div>
          </div>
       </div>
    </Drawer>

  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

const api = useApi()
const auth = useAuthStore()
const toast = useToast()
const confirm = useConfirm()

const q = ref('')
const statusFilter = ref('')
const loading = ref(false)
const saving = ref(false)
const drawerVisible = ref(false)
const editingId = ref<string | null>(null)
const activeTab = ref('logistic')

const packingLists = ref<any[]>([])
const deliveryOrders = ref<any[]>([])
const carriers = ref<any[]>([])
const warehouses = ref<any[]>([])
const activeDoItems = ref<any[]>([])

const statusOptions = [
  { label: 'Draf (Draft)', value: 'DRAFT' },
  { label: 'Terkonfirmasi (Confirmed)', value: 'CONFIRMED' },
  { label: 'Dalam Transit (In Transit)', value: 'IN_TRANSIT' },
  { label: 'Selesai (Delivered)', value: 'DELIVERED' }
]

const form = reactive({
  deliveryOrderId: '',
  warehouseId: '',
  notes: '',
  totalWeight: 0,
  totalVolume: 0,
  packageCount: 1,
  shippingMark: '',
  sealNumber: '',
  carrierId: '',
  status: 'DRAFT'
})

const drawerHeader = computed(() => editingId.value ? 'Ubah Rincian Pengepakan' : 'Daftarkan Pengepakan Baru')

const stats = computed(() => {
  const totWeight = packingLists.value.reduce((acc, curr) => acc + (Number(curr.totalWeight) || 0), 0)
  const totVol = packingLists.value.reduce((acc, curr) => acc + (Number(curr.totalVolume) || 0), 0)
  const pending = packingLists.value.filter(p => p.status === 'DRAFT').length

  return [
    { label: 'Tonnage Hari Ini', value: fmtNum(totWeight), unit: 'KG', icon: 'pi pi-chart-line', color: 'bg-indigo-50 text-indigo-600', sub: 'Berat Total' },
    { label: 'Volume Pengepakan', value: fmtNum(totVol), unit: 'CBM', icon: 'pi pi-box', color: 'bg-emerald-50 text-emerald-600', sub: 'Kubikasi Efektif' },
    { label: 'Antrean Packing', value: pending, unit: 'Slips', icon: 'pi pi-clock', color: 'bg-amber-50 text-amber-600', sub: 'Menunggu Validasi' },
    { label: 'Akurasi Scan', value: '99.4', unit: '%', icon: 'pi pi-verified', color: 'bg-indigo-50 text-indigo-600', sub: 'Verifikasi Fisik' }
  ]
})

async function load() {
  loading.value = true
  try {
    const params: any = {}
    if (q.value) params.search = q.value
    if (statusFilter.value) params.status = statusFilter.value
    
    const [packRes, doRes, carrierRes, whRes] = await Promise.all([
      api.get('/logistics/packing-lists', { params }),
      api.get('/logistics/delivery-orders'),
      api.get('/logistics/fleet'), // Assuming carrier is in fleet/carrier controller
      api.get('/inventory/warehouses')
    ])
    
    packingLists.value = packRes.data?.data || []
    deliveryOrders.value = (doRes.data?.data || []).map((d: any) => ({ label: `${d.code} - ${d.customer?.name || 'Walkin'}`, value: d.id, items: d.items }))
    carriers.value = carrierRes.data?.data || []
    warehouses.value = whRes.data?.warehouses || []
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal Memuat Data', detail: e.message })
  } finally {
    loading.value = false
  }
}

function openCreate() {
  editingId.value = null
  resetForm()
  activeTab.value = 'logistic'
  drawerVisible.value = true
}

async function openView(data: any) {
  loading.value = true
  try {
    const res = await api.get(`/logistics/packing-lists/${data.id}`)
    const p = res.data
    editingId.value = p.id
    Object.assign(form, p)
    activeDoItems.value = p.deliveryOrder?.items || []
    activeTab.value = 'logistic'
    drawerVisible.value = true
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal Memuat Detail' })
  } finally {
    loading.value = false
  }
}

async function save() {
  saving.value = true
  try {
    if (editingId.value) {
       await api.patch(`/logistics/packing-lists/${editingId.value}`, form)
       toast.add({ severity: 'success', summary: 'Packing Updated', detail: 'Informasi pengiriman diperbarui.' })
    } else {
       await api.post('/logistics/packing-lists', form)
       toast.add({ severity: 'success', summary: 'Packing Generated', detail: 'Slip pengepakan baru telah dibuat.' })
    }
    drawerVisible.value = false
    load()
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal Menyimpan' })
  } finally {
    saving.value = false
  }
}

async function confirmPacking(pl: any) {
  confirm.require({
    message: 'Konfirmasi bahwa packing telah sesuai dengan fisik?',
    header: 'Validasi Fisik',
    icon: 'pi pi-check-circle',
    accept: async () => {
      try {
        await api.post(`/logistics/packing-lists/${pl.id}/confirm`)
        toast.add({ severity: 'success', summary: 'Terkonfirmasi', detail: 'Pengepakan siap untuk pengiriman.' })
        load()
      } catch (e: any) {
        toast.add({ severity: 'error', summary: 'Gagal Konfirmasi' })
      }
    }
  })
}

function resetForm() {
  form.deliveryOrderId = ''
  form.warehouseId = warehouses.value[0]?.id || ''
  form.notes = ''
  form.totalWeight = 0
  form.totalVolume = 0
  form.packageCount = 1
  form.shippingMark = ''
  form.sealNumber = ''
  form.carrierId = ''
  form.status = 'DRAFT'
  activeDoItems.value = []
}

function statusClass(s: string) {
  switch (s) {
    case 'CONFIRMED': return 'bg-emerald-50 text-emerald-600'
    case 'DRAFT': return 'bg-amber-50 text-amber-600'
    default: return 'bg-indigo-50 text-indigo-600'
  }
}

function fmtNum(n: any) { return Number(n).toLocaleString('id-ID') }

watch(() => form.deliveryOrderId, (newVal) => {
  const selected = deliveryOrders.value.find(d => d.value === newVal)
  if (selected) activeDoItems.value = selected.items || []
})

onMounted(load)
watch([q, statusFilter], load)
</script>

<style scoped>
:deep(.p-datatable-thead > tr > th) {
  background: transparent !important;
  font-size: 11px !important;
  font-weight: 900 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.1em !important;
  color: #94a3b8 !important;
  border-bottom: 2px solid #f1f5f9 !important;
  padding: 1.5rem 1rem !important;
}

:deep(.p-datatable-tbody > tr:hover) {
  background: rgba(79, 70, 229, 0.03) !important;
}

:deep(.p-datatable-tbody > tr > td) {
  padding: 1.25rem 1rem !important;
  border-bottom: 1px solid #f8fafc !important;
}

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background-color: #e2e8f0; border-radius: 10px; }
</style>