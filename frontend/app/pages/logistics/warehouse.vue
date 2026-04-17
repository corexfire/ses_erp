<template>
  <div class="p-6 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-8 rounded-xl bg-indigo-900 border border-indigo-800 shadow-2xl">
      <div class="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div class="relative z-10">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-full backdrop-blur-md border border-white/10">Infrastruktur</span>
           <span class="text-white/30">/</span>
           <span class="text-[10px] font-bold text-indigo-200 uppercase tracking-widest">Master Warehouse & Topology</span>
        </div>
        <h1 class="text-4xl font-black text-white tracking-tight mb-2">Warehouse <span class="text-indigo-400 text-3xl opacity-50 font-medium tracking-tighter ml-1">Master</span></h1>
        <p class="text-indigo-100/60 text-sm font-medium">Definisikan struktur fisik gudang, zonasi penyimpanan (Storage Zones), dan pemetaan lokasi bin di seluruh jaringan logistik.</p>
      </div>

      <div class="flex items-center gap-3 relative z-10">
        <Button icon="pi pi-refresh" severity="secondary" rounded text class="text-white hover:bg-white/10" @click="load" :loading="loading" />
        <Button label="Registrasi Gudang" icon="pi pi-plus" class="p-button-rounded font-black text-xs shadow-xl bg-white text-indigo-950 border-white hover:bg-indigo-50" @click="openCreate" :disabled="!canManage" />
      </div>
    </div>

    <!-- Stats Section -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
       <div v-for="s in stats" :key="s.label" class="group p-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
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

    <!-- Main Table Area -->
    <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col">
       <div class="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between bg-slate-50/10 gap-4">
          <div>
             <h2 class="text-[13px] font-black text-slate-900 uppercase tracking-widest">Daftar Jaringan Gudang</h2>
             <p class="text-xs text-slate-500 font-medium">Kelola profil pusat distribusi, hub regional, dan toko lokal.</p>
          </div>
          <div class="flex items-center gap-3">
             <div class="p-input-icon-left">
                <i class="pi pi-search text-slate-400" />
                <InputText v-model="q" placeholder="Cari Kode atau Nama..." class="p-inputtext-sm rounded-xl border-slate-200 w-64" />
             </div>
             <Dropdown v-model="typeFilter" :options="typeOptions" optionLabel="label" optionValue="value" placeholder="Tipe Gudang" class="p-dropdown-sm rounded-xl text-[10px] font-bold uppercase w-48" />
          </div>
       </div>

       <DataTable :value="warehouses" dataKey="id" class="p-datatable-sm w-full" :loading="loading" :rows="10" paginator>
          <Column field="code" header="KODE" class="pl-8">
             <template #body="{ data }">
                <span class="text-[11px] font-black text-slate-900 tracking-wider">{{ data.code }}</span>
             </template>
          </Column>
          <Column header="NAMA GUDANG & ALAMAT">
             <template #body="{ data }">
                <div class="flex flex-col">
                   <span class="text-[11px] font-black text-slate-900 uppercase">{{ data.name }}</span>
                   <div class="flex items-center gap-1">
                      <i class="pi pi-map-marker text-[10px] text-slate-300" />
                      <span class="text-[10px] font-bold text-slate-400">{{ data.city || 'Belum diatur' }}</span>
                   </div>
                </div>
             </template>
          </Column>
          <Column header="TIPE">
             <template #body="{ data }">
                <span :class="['px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest', typeClass(data.type)]">
                   {{ typeLabel(data.type) }}
                </span>
             </template>
          </Column>
          <Column header="STRUKTUR">
             <template #body="{ data }">
                <div class="flex items-center gap-4">
                   <div class="flex flex-col">
                      <span class="text-[10px] font-black text-slate-700 leading-none">{{ data._count?.zones || 0 }}</span>
                      <span class="text-[8px] font-bold text-slate-400 uppercase tracking-tight">Zones</span>
                   </div>
                   <div class="flex flex-col">
                      <span class="text-[10px] font-black text-slate-700 leading-none">{{ data._count?.binLocations || 0 }}</span>
                      <span class="text-[8px] font-bold text-slate-400 uppercase tracking-tight">Bins</span>
                   </div>
                </div>
             </template>
          </Column>
          <Column header="PENGELOLA">
             <template #body="{ data }">
                <div v-if="data.manager" class="flex items-center gap-2">
                   <Avatar :label="data.manager.name[0]" shape="circle" size="small" class="bg-indigo-50 text-indigo-600 text-[10px]" />
                   <span class="text-[10px] font-bold text-slate-600 truncate max-w-[120px]">{{ data.manager.name }}</span>
                </div>
                <span v-else class="text-[9px] font-black text-slate-300 uppercase">None</span>
             </template>
          </Column>
          <Column class="text-right pr-8">
             <template #body="{ data }">
                <div class="flex gap-2 justify-end">
                   <Button icon="pi pi-pencil" severity="secondary" rounded text @click="openEdit(data)" :disabled="!canManage" v-tooltip.top="'Ubah Profil'" />
                   <Button icon="pi pi-sitemap" severity="info" rounded text @click="openStructure(data)" v-tooltip.top="'Lihat Struktur'" />
                </div>
             </template>
          </Column>
       </DataTable>
    </div>

    <!-- Master Drawer (Edit / Structure) -->
    <Drawer v-model:visible="drawerVisible" :header="drawerHeader" position="right" class="w-[800px]">
       <div class="h-full flex flex-col pt-4">
          <Tabs v-model:value="activeTab" class="px-6 border-b border-slate-100">
             <TabList class="gap-8">
                <Tab value="info" class="text-[11px] font-black uppercase tracking-widest pb-4">Profil Utama</Tab>
                <Tab value="topology" class="text-[11px] font-black uppercase tracking-widest pb-4">Struktur Zonasi</Tab>
                <Tab value="capacity" class="text-[11px] font-black uppercase tracking-widest pb-4">Parameter Fisik</Tab>
             </TabList>
          </Tabs>

          <div class="flex-1 overflow-y-auto p-8 bg-slate-50/30 custom-scrollbar pb-32">
             <!-- Tab 1: Info -->
             <div v-if="activeTab === 'info'" class="space-y-6">
                <div class="grid grid-cols-2 gap-6">
                   <div class="space-y-1">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kode Gudang</label>
                      <InputText v-model="form.code" class="w-full rounded-xl border-slate-200" :disabled="!!editingId" />
                   </div>
                   <div class="space-y-1">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipe Fasilitas</label>
                      <Dropdown v-model="form.type" :options="typeOptions" optionLabel="label" optionValue="value" class="w-full rounded-xl" />
                   </div>
                   <div class="col-span-2 space-y-1">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Lengkap Gudang</label>
                      <InputText v-model="form.name" class="w-full rounded-xl border-slate-200 text-sm font-bold" />
                   </div>
                   <div class="space-y-1">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pengelola (Manager)</label>
                      <Dropdown v-model="form.managerId" :options="users" optionLabel="name" optionValue="id" filter placeholder="Pilih Manager" class="w-full rounded-xl" />
                   </div>
                   <div class="space-y-1">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kontak Telepon</label>
                      <InputText v-model="form.phone" class="w-full rounded-xl border-slate-200" />
                   </div>
                </div>

                <div class="p-6 rounded-3xl bg-white border border-slate-200 space-y-4">
                   <h4 class="text-[11px] font-black uppercase tracking-widest text-slate-900">Lokasi Geografis</h4>
                   <div class="grid grid-cols-2 gap-4">
                      <div class="col-span-2 space-y-1">
                         <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Alamat Fisik</label>
                         <Textarea v-model="form.address1" rows="2" class="w-full rounded-xl border-slate-200 text-xs" />
                      </div>
                      <div class="space-y-1">
                         <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Kota</label>
                         <InputText v-model="form.city" class="w-full rounded-xl border-slate-200 text-xs font-bold" />
                      </div>
                      <div class="space-y-1">
                         <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Provinsi</label>
                         <InputText v-model="form.province" class="w-full rounded-xl border-slate-200 text-xs" />
                      </div>
                   </div>
                </div>
             </div>

             <!-- Tab 2: Topology (Zones & Bins) -->
             <div v-if="activeTab === 'topology'" class="space-y-6">
                <div class="flex items-center justify-between">
                   <h4 class="text-[11px] font-black uppercase tracking-widest text-slate-900">Hirarki Zonasi</h4>
                   <Button label="Tambah Zona" icon="pi pi-plus" size="small" severity="secondary" @click="openAddZone" />
                </div>
                
                <div v-if="activeWarehouseZones.length === 0" class="p-12 text-center rounded-3xl border-2 border-dashed border-slate-200">
                   <i class="pi pi-sitemap text-3xl text-slate-300 mb-3 block"></i>
                   <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Tidak ada zonasi terdefinisi</p>
                </div>

                <div v-else class="space-y-4">
                   <Accordion v-for="zone in activeWarehouseZones" :key="zone.id" :value="zone.id" class="rounded-2xl border border-slate-100 shadow-sm overflow-hidden bg-white">
                      <AccordionPanel :value="zone.id">
                         <AccordionHeader>
                            <div class="flex items-center gap-4 w-full pr-4">
                               <div class="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-[10px]">{{ zone.code.slice(-1) }}</div>
                               <div class="flex flex-col flex-1 text-left">
                                  <span class="text-[11px] font-black text-slate-900 uppercase leading-none">{{ zone.name }}</span>
                                  <span class="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{{ zone.code }} • {{ zone.bins?.length || 0 }} Lokasi Bin</span>
                               </div>
                               <Button icon="pi pi-plus-circle" severity="secondary" rounded text size="small" v-tooltip.left="'Tambah Bin ke Zona ini'" @click.stop="openAddBin(zone)" />
                            </div>
                         </AccordionHeader>
                         <AccordionContent>
                            <div class="grid grid-cols-3 gap-3">
                               <div v-for="bin in zone.bins" :key="bin.id" class="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col group relative">
                                  <span class="text-[10px] font-black text-slate-800 tracking-wider">{{ bin.code }}</span>
                                  <span class="text-[8px] font-black text-slate-400 uppercase leading-none mt-1">{{ bin.type || 'STORAGE' }}</span>
                                  <Button icon="pi pi-times" severity="danger" rounded text size="small" class="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                               </div>
                            </div>
                         </AccordionContent>
                      </AccordionPanel>
                   </Accordion>
                </div>
             </div>

             <!-- Tab 3: Capacity -->
             <div v-if="activeTab === 'capacity'" class="space-y-6">
                <div class="p-8 rounded-xl bg-indigo-900 text-white relative overflow-hidden">
                   <div class="absolute top-0 right-0 p-8 opacity-10"><i class="pi pi-chart-pie text-9xl"></i></div>
                   <span class="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-4 block">Total Physical Capacity</span>
                   <div class="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                      <div class="space-y-4">
                         <div>
                            <p class="text-[10px] font-bold text-indigo-200 uppercase tracking-tight mb-2">Maximum Weight (Kapasitas Berat)</p>
                            <h3 class="text-4xl font-black">{{ fmtNum(form.capacityWeight) }} <span class="text-xl font-medium opacity-50">KG</span></h3>
                         </div>
                         <ProgressBar :value="45" class="bg-indigo-950 border border-white/10 h-2" :showValue="false" />
                         <p class="text-[10px] font-bold text-indigo-300">Estimasi Terpakai: 2,250,000 KG (45%)</p>
                      </div>
                      <div class="space-y-4 text-right">
                         <div>
                            <p class="text-[10px] font-bold text-indigo-200 uppercase tracking-tight mb-2">Storage Volume (Kapasitas Volume)</p>
                            <h3 class="text-4xl font-black">{{ fmtNum(form.capacityVolume) }} <span class="text-xl font-medium opacity-50">M³</span></h3>
                         </div>
                         <ProgressBar :value="62" class="bg-indigo-950 border border-white/10 h-2" :showValue="false" />
                         <p class="text-[10px] font-bold text-indigo-300">Volume Terisi: 15,500 M³ (62%)</p>
                      </div>
                   </div>
                </div>

                <div class="grid grid-cols-2 gap-6">
                   <div class="p-6 rounded-3xl bg-white border border-slate-200 space-y-4">
                      <h4 class="text-[11px] font-black uppercase tracking-widest text-slate-900">Ubah Batas (KG)</h4>
                      <InputNumber v-model="form.capacityWeight" class="w-full p-inputtext-sm rounded-xl" />
                   </div>
                   <div class="p-6 rounded-3xl bg-white border border-slate-200 space-y-4">
                      <h4 class="text-[11px] font-black uppercase tracking-widest text-slate-900">Ubah Batas (M³)</h4>
                      <InputNumber v-model="form.capacityVolume" class="w-full p-inputtext-sm rounded-xl" />
                   </div>
                </div>
             </div>
          </div>

          <!-- Bottom Actions -->
          <div class="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-100 flex items-center justify-between rounded-t-[2.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
             <Button label="Deaktivasi Gudang" severity="danger" text class="font-black text-[10px] uppercase" v-if="editingId" @click="deactivate" />
             <div class="flex items-center gap-3 ml-auto">
                <Button label="Batalkan" severity="secondary" text @click="drawerVisible = false" class="font-black text-[10px] uppercase" />
                <Button :label="editingId ? 'Simpan Perubahan' : 'Registrasi Sekarang'" icon="pi pi-check" class="p-button-rounded font-black text-[10px] uppercase px-8 bg-slate-900 border-slate-900" @click="save" :loading="saving" />
             </div>
          </div>
       </div>
    </Drawer>

    <!-- Dialogs for Zone/Bin -->
    <Dialog v-model:visible="zoneDialogOpen" header="Tambah Zona Baru" :modal="true" class="w-[400px]">
       <div class="space-y-4 py-4">
          <div class="space-y-1">
             <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kode Zona</label>
             <InputText v-model="zoneForm.code" class="w-full rounded-xl" placeholder="Z-BK-01" />
          </div>
          <div class="space-y-1">
             <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Zona</label>
             <InputText v-model="zoneForm.name" class="w-full rounded-xl" placeholder="Bulk Storage" />
          </div>
       </div>
       <template #footer>
          <Button label="Simpan" @click="saveZone" :loading="saving" class="bg-indigo-600 border-indigo-600 rounded-xl" />
       </template>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

const api = useApi()
const auth = useAuthStore()
const toast = useToast()
const confirm = useConfirm()

const canManage = computed(() => auth.hasPermission('inventory.warehouse.create') || auth.hasPermission('inventory.warehouse.update'))

const q = ref('')
const typeFilter = ref('')
const loading = ref(false)
const warehouses = ref<any[]>([])
const users = ref<any[]>([])

const drawerVisible = ref(false)
const editingId = ref<string | null>(null)
const activeTab = ref('info')
const saving = ref(false)

const drawerHeader = computed(() => editingId.value ? 'Ubah Profil Gudang' : 'Registrasi Gudang Baru')

const form = reactive({
  code: '',
  name: '',
  type: 'GENERAL',
  address1: '',
  city: '',
  province: '',
  postalCode: '',
  managerId: '',
  capacityWeight: 0,
  capacityVolume: 0,
  phone: '',
})

const zoneForm = reactive({
  code: '',
  name: '',
})

const zoneDialogOpen = ref(false)
const activeWarehouseZones = ref<any[]>([])

const typeOptions = [
  { label: 'General Storage (Umum)', value: 'GENERAL' },
  { label: 'Distribution Center (DC)', value: 'DISTRIBUTION_CENTER' },
  { label: 'Regional Hub', value: 'REGIONAL_HUB' },
  { label: 'Local Store', value: 'LOCAL_STORE' },
  { label: 'Cold Storage (Suhu Dingin)', value: 'COLD_STORAGE' },
  { label: 'Bonded Warehouse (Berikat)', value: 'BONDED_WAREHOUSE' },
]

const stats = computed(() => {
  const totalWeight = warehouses.value.reduce((acc, curr) => acc + (Number(curr.capacityWeight) || 0), 0)
  const totalBins = warehouses.value.reduce((acc, curr) => acc + (curr._count?.binLocations || 0), 0)
  const totalZones = warehouses.value.reduce((acc, curr) => acc + (curr._count?.zones || 0), 0)

  return [
    { label: 'Total Gudang Aktif', value: warehouses.value.length, unit: 'Outlet', icon: 'pi pi-building', color: 'bg-indigo-50 text-indigo-600', sub: 'Status Operasional' },
    { label: 'Kapasitas Global', value: fmtNum(totalWeight), unit: 'KG', icon: 'pi pi-chart-line', color: 'bg-emerald-50 text-emerald-600', sub: 'Total Tonase' },
    { label: 'Total Struktur Zona', value: totalZones, unit: 'Zonasi', icon: 'pi pi-sitemap', color: 'bg-amber-50 text-amber-600', sub: 'Pemetaan Topology' },
    { label: 'Titik Penyimpanan', value: totalBins, unit: 'Bins', icon: 'pi pi-box', color: 'bg-indigo-50 text-indigo-600', sub: 'Kapasitas Slot' }
  ]
})

async function load() {
  loading.value = true
  try {
    const params: any = {}
    if (q.value) params.q = q.value
    const [whRes, usersRes] = await Promise.all([
      api.get('/inventory/warehouses', { params }),
      api.get('/core/users')
    ])
    warehouses.value = whRes.data?.warehouses || []
    users.value = usersRes.data?.users || []
    
    // Simple mock filter logic since backend might not support it yet
    if (typeFilter.value) {
       warehouses.value = warehouses.value.filter(w => w.type === typeFilter.value)
    }
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal Memuat', detail: e.message })
  } finally {
    loading.value = false
  }
}

function openCreate() {
  editingId.value = null
  resetForm()
  activeTab.value = 'info'
  drawerVisible.value = true
}

async function openEdit(data: any) {
  loading.value = true
  try {
    const res = await api.get(`/inventory/warehouses/${data.id}`)
    const wh = res.data?.warehouse
    editingId.value = wh.id
    Object.assign(form, wh)
    activeWarehouseZones.value = wh.zones || []
    activeTab.value = 'info'
    drawerVisible.value = true
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: e.message })
  } finally {
    loading.value = false
  }
}

function openStructure(data: any) {
   openEdit(data).then(() => { activeTab.value = 'topology' })
}

function resetForm() {
  form.code = ''
  form.name = ''
  form.type = 'GENERAL'
  form.address1 = ''
  form.city = ''
  form.province = ''
  form.postalCode = ''
  form.managerId = ''
  form.capacityWeight = 0
  form.capacityVolume = 0
  form.phone = ''
  activeWarehouseZones.value = []
}

async function save() {
  saving.value = true
  try {
    if (editingId.value) {
      await api.patch(`/inventory/warehouses/${editingId.value}`, form)
      toast.add({ severity: 'success', summary: 'Gudang Diperbarui', detail: 'Profil dan parameter fisik telah disimpan.' })
    } else {
      await api.post('/inventory/warehouses', form)
      toast.add({ severity: 'success', summary: 'Gudang Terdaftar', detail: 'Identitas baru telah masuk ke jaringan logistik.' })
    }
    drawerVisible.value = false
    load()
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal Menyimpan', detail: e.message })
  } finally {
    saving.value = false
  }
}

function openAddZone() {
   zoneForm.code = ''
   zoneForm.name = ''
   zoneDialogOpen.value = true
}

async function saveZone() {
   if (!editingId.value) return
   saving.value = true
   try {
      await api.post(`/inventory/warehouses/${editingId.value}/zones`, zoneForm)
      toast.add({ severity: 'success', summary: 'Zona Ditambahkan' })
      zoneDialogOpen.value = false
      // Re-load structure
      const res = await api.get(`/inventory/warehouses/${editingId.value}`)
      activeWarehouseZones.value = res.data?.warehouse?.zones || []
   } catch (e: any) {
      toast.add({ severity: 'error', summary: 'Gagal Menambah Zona' })
   } finally {
      saving.value = false
   }
}

function openAddBin(zone: any) {
   toast.add({ severity: 'info', summary: 'Manage Bins', detail: 'Fitur pengelolaan Bin massal dalam pengembangan.' })
}

async function deactivate() {
  confirm.require({
    message: 'Apakah Anda yakin ingin menonaktifkan gudang ini?',
    header: 'Konfirmasi Deaktifasi',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger rounded-xl',
    accept: async () => {
      try {
        await api.patch(`/inventory/warehouses/${editingId.value}/deactivate`)
        toast.add({ severity: 'info', summary: 'Gudang Dinonaktifkan' })
        drawerVisible.value = false
        load()
      } catch (e: any) {
        toast.add({ severity: 'error', summary: 'Gagal' })
      }
    }
  })
}

function typeClass(type: string) {
  switch (type) {
    case 'DISTRIBUTION_CENTER': return 'bg-indigo-600 text-white'
    case 'REGIONAL_HUB': return 'bg-indigo-100 text-indigo-600'
    case 'COLD_STORAGE': return 'bg-sky-50 text-sky-600 border border-sky-200'
    default: return 'bg-slate-100 text-slate-500'
  }
}

function typeLabel(type: string) {
  return typeOptions.find(o => o.value === type)?.label.split('(')[0] || type
}

function fmtNum(n: any) { return Number(n).toLocaleString('id-ID') }

onMounted(load)
watch([q, typeFilter], load)
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

:deep(.p-datatable-tbody > tr) {
  background: transparent !important;
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

:deep(.p-accordion-header-link) {
   border: none !important;
   background: transparent !important;
   padding: 1.5rem !important;
}
:deep(.p-accordion-content) {
   border: none !important;
   background: #f8fafc !important;
   padding: 1rem !important;
}
</style>
