<template>
  <div class="p-6 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-8 rounded-xl bg-white border border-slate-200 shadow-sm">
      <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-emerald-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Unit Transportasi</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-emerald-600">Manajemen Trayek & Rute</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2">Master Rute <span class="text-emerald-600">Logistik</span></h1>
        <p class="text-slate-500 text-sm font-medium">Konfigurasi jalur distribusi, estimasi waktu tempuh, dan pemetaan titik asal-tujuan.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="load" :loading="loading" />
        <Button label="Buat Rute Baru" icon="pi pi-plus" class="p-button-rounded font-black text-xs shadow-lg shadow-emerald-100" @click="openNew" :disabled="!canManage" />
      </div>
    </div>

    <!-- Stats Section -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
       <div v-for="s in stats" :key="s.label" class="group p-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <i :class="[s.icon, 'text-6xl']"></i>
          </div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ s.label }}</p>
          <h3 class="text-2xl font-black text-slate-900">{{ s.value }} <span class="text-sm font-medium text-slate-400">Trayek</span></h3>
          <div class="flex items-center gap-2 mt-2">
             <span :class="['text-[10px] font-bold px-2 py-0.5 rounded-full', s.color]">{{ s.sub }}</span>
          </div>
       </div>
    </div>

    <!-- Main Table Area -->
    <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col">
       <div class="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between bg-slate-50/10 gap-4">
          <div>
             <h2 class="text-[13px] font-black text-slate-900 uppercase tracking-widest">Daftar Jalur Distribusi</h2>
             <p class="text-xs text-slate-500 font-medium">Data pemetaan rute operasional dan parameter teknis trayek.</p>
          </div>
          <div class="flex items-center gap-3">
             <div class="p-input-icon-left">
                <i class="pi pi-search text-slate-400" />
                <InputText v-model="q" placeholder="Cari Kode atau Trayek..." class="p-inputtext-sm rounded-xl border-slate-200 w-64" />
             </div>
             <Select v-model="isActiveFilter" :options="[{label: 'Semua Status', value: ''}, {label: 'Aktif', value: 'true'}, {label: 'Nonaktif', value: 'false'}]" optionLabel="label" optionValue="value" class="p-select-sm rounded-xl text-[10px] font-bold uppercase w-40" />
          </div>
       </div>

       <DataTable :value="routes" dataKey="id" class="p-datatable-sm w-full" :loading="loading" :rows="10" paginator>
          <Column field="code" header="KODE RUTE" class="pl-8">
             <template #body="{ data }">
                <span class="text-[11px] font-black text-slate-800">{{ data.code }}</span>
             </template>
          </Column>
          <Column header="TRAYEK OPERASIONAL">
             <template #body="{ data }">
                <div class="flex flex-col">
                   <div class="flex items-center gap-2">
                      <span class="text-[11px] font-black text-slate-900 uppercase">{{ data.origin || 'N/A' }}</span>
                      <i class="pi pi-arrow-right text-[10px] text-emerald-500" />
                      <span class="text-[11px] font-black text-slate-900 uppercase">{{ data.destination || 'N/A' }}</span>
                   </div>
                   <span class="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{{ data.name }}</span>
                </div>
             </template>
          </Column>
          <Column header="PARAMETER TEKNIS">
             <template #body="{ data }">
                <div class="flex items-center gap-4">
                   <div class="flex flex-col">
                      <span class="text-[9px] font-black text-slate-400 uppercase">Jarak</span>
                      <span class="text-[11px] font-bold text-slate-700">{{ data.distanceKm || 0 }} KM</span>
                   </div>
                   <div class="w-px h-6 bg-slate-100"></div>
                   <div class="flex flex-col">
                      <span class="text-[9px] font-black text-slate-400 uppercase">Estimasi</span>
                      <span class="text-[11px] font-bold text-slate-700">{{ data.estDurationHours || 0 }} Jam</span>
                   </div>
                </div>
             </template>
          </Column>
          <Column header="GUDANG PENGIRIM">
             <template #body="{ data }">
                <div class="flex items-center gap-2">
                   <i class="pi pi-building text-[10px] text-slate-400" />
                   <span class="text-[11px] font-bold text-slate-600 uppercase">{{ data.warehouse?.name || 'Multi-Warehouse' }}</span>
                </div>
             </template>
          </Column>
          <Column header="STATUS">
             <template #body="{ data }">
                <span :class="['px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest', data.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-500 border']">
                   {{ data.isActive ? 'AKTIF' : 'NONAKTIF' }}
                </span>
             </template>
          </Column>
          <Column class="text-right pr-8">
             <template #body="{ data }">
                <div class="flex gap-2 justify-end">
                   <Button icon="pi pi-pencil" severity="secondary" rounded text @click="edit(data)" :disabled="!canManage" />
                   <Button icon="pi pi-trash" severity="danger" rounded text @click="confirmDelete(data)" :disabled="!canManage" />
                </div>
             </template>
          </Column>
       </DataTable>
    </div>

    <!-- Drawer Form -->
    <Drawer v-model:visible="drawerOpen" :header="editingId ? 'Edit Konfigurasi Rute' : 'Registrasi Rute Baru'" position="right" class="w-[600px]">
       <div class="space-y-8 pt-4 px-4 overflow-y-auto pb-24 h-full custom-scrollbar">
          <!-- Section 1: Geografis -->
          <div class="space-y-5">
             <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs">1</div>
                <h4 class="text-[11px] font-black uppercase tracking-widest text-slate-900">Pemetaan Geografis</h4>
             </div>
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase">Kota / Titik Asal</label>
                   <InputText v-model="form.origin" class="w-full rounded-xl border-slate-200" placeholder="Contoh: Jakarta (JKT)" />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase">Kota / Titik Tujuan</label>
                   <InputText v-model="form.destination" class="w-full rounded-xl border-slate-200" placeholder="Contoh: Surabaya (SUB)" />
                </div>
             </div>
             <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-400 uppercase">Nama Trayek (Deskriptif)</label>
                <InputText v-model="form.name" class="w-full rounded-xl border-slate-200" placeholder="Jalur Pantura Express" />
             </div>
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase">Kode Rute</label>
                   <InputText v-model="form.code" class="w-full rounded-xl border-slate-200 uppercase" placeholder="RT-000" :disabled="!!editingId" />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase">Gudang Asal</label>
                   <Select v-model="form.warehouseId" :options="warehouses" optionLabel="name" optionValue="id" class="w-full rounded-xl" placeholder="Pilih Gudang" />
                </div>
             </div>
          </div>

          <!-- Section 2: Parameter Teknis -->
          <div class="space-y-5 p-6 rounded-3xl bg-emerald-50/50 border border-emerald-100">
             <div class="flex items-center gap-3 mb-2">
                <div class="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs">2</div>
                <h4 class="text-[11px] font-black uppercase tracking-widest text-slate-900">Estimasi & Parameter Teknis</h4>
             </div>
             <div class="grid grid-cols-2 gap-6">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-emerald-400 uppercase">Jarak Tempuh (KM)</label>
                   <InputNumber v-model="form.distanceKm" class="w-full p-inputtext-sm" :minFractionDigits="1" />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-emerald-400 uppercase">Estimasi Durasi (Jam)</label>
                   <InputNumber v-model="form.estDurationHours" class="w-full p-inputtext-sm" :minFractionDigits="1" />
                </div>
             </div>
             <div class="space-y-1 mt-2">
                <label class="text-[10px] font-black text-emerald-400 uppercase">Standard Biaya Operasional (IDR)</label>
                <InputNumber v-model="form.standardCost" mode="currency" currency="IDR" locale="id-ID" class="w-full p-inputtext-sm" />
             </div>
          </div>

          <!-- Section 3: Konfigurasi -->
          <div class="space-y-5">
             <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-slate-400 flex items-center justify-center text-white text-xs">3</div>
                <h4 class="text-[11px] font-black uppercase tracking-widest text-slate-900">Pengaturan & Catatan</h4>
             </div>
             <div class="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <Checkbox v-model="form.isActive" :binary="true" inputId="isActive" />
                <label for="isActive" class="text-xs font-black text-slate-600 uppercase">Rute Aktif & Dapat Digunakan</label>
             </div>
             <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-400 uppercase">Deskripsi / Detail Jalur</label>
                <Textarea v-model="form.description" rows="3" class="w-full rounded-xl border-slate-200" placeholder="Informasi rute alternatif, titik check-point, atau instruksi khusus..." />
             </div>
          </div>

          <!-- Actions -->
          <div class="fixed bottom-0 right-0 w-[600px] bg-white p-6 border-t flex justify-end gap-3 rounded-t-[2rem] shadow-2xl">
             <Button label="Batalkan" severity="secondary" text @click="drawerOpen = false" class="font-black text-[10px] uppercase" />
             <Button label="Simpan Rute" icon="pi pi-save" class="p-button-rounded font-black text-[10px] uppercase px-8 bg-emerald-600 border-emerald-600 shadow-lg shadow-emerald-100" @click="save" :loading="saving" :disabled="!form.code || !form.name" />
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

const canManage = computed(() => auth.hasPermission('logistics.route.manage'))

const q = ref('')
const isActiveFilter = ref('')
const loading = ref(false)
const saving = ref(false)
const routes = ref<any[]>([])
const warehouses = ref<any[]>([])
const drawerOpen = ref(false)
const editingId = ref<string | null>(null)

const form = reactive({
  code: '',
  name: '',
  origin: '',
  destination: '',
  distanceKm: 0,
  estDurationHours: 0,
  standardCost: 0,
  warehouseId: null as string | null,
  description: '',
  isActive: true,
})

const stats = computed(() => {
  const total = routes.value.length
  const active = routes.value.filter(r => r.isActive).length
  
  // Rute Intercity (> 100km)
  const intercity = routes.value.filter(r => (Number(r.distanceKm) || 0) > 100).length
  const local = total - intercity

  return [
    { label: 'Total Rute', value: total, icon: 'pi pi-map', color: 'bg-emerald-50 text-emerald-600', sub: 'Master Trayek' },
    { label: 'Rute Operasional', value: active, icon: 'pi pi-check-circle', color: 'bg-indigo-50 text-indigo-600', sub: 'Status Aktif' },
    { label: 'Trayek Intercity', value: intercity, icon: 'pi pi-directions', color: 'bg-amber-50 text-amber-600', sub: 'Jarak Jauh' },
    { label: 'Trayek Lokal', value: local, icon: 'pi pi-map-marker', color: 'bg-blue-50 text-blue-600', sub: 'Area Distribusi' }
  ]
})

async function load() {
  loading.value = true
  try {
    const params: any = {}
    if (q.value) params.search = q.value
    if (isActiveFilter.value !== '') params.isActive = isActiveFilter.value
    
    // Fetch routes and warehouses
    const [resRoutes, resWh] = await Promise.all([
      api.get('/logistics/routes', { params }),
      api.get('/inventory/warehouses')
    ])
    
    routes.value = resRoutes.data?.data || []
    warehouses.value = resWh.data?.warehouses || resWh.data?.data || []
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal Memuat', detail: e.message })
  } finally {
    loading.value = false
  }
}

function openNew() {
  editingId.value = null
  Object.assign(form, {
    code: '',
    name: '',
    origin: '',
    destination: '',
    distanceKm: 0,
    estDurationHours: 0,
    standardCost: 0,
    warehouseId: null,
    description: '',
    isActive: true,
  })
  drawerOpen.value = true
}

function edit(data: any) {
  editingId.value = data.id
  Object.assign(form, {
    ...data,
    distanceKm: Number(data.distanceKm),
    estDurationHours: Number(data.estDurationHours),
    standardCost: Number(data.standardCost)
  })
  drawerOpen.value = true
}

async function save() {
  saving.value = true
  try {
    if (editingId.value) {
      await api.patch(`/logistics/routes/${editingId.value}`, form)
      toast.add({ severity: 'success', summary: 'Rute Diperbarui', detail: 'Parameter trayek berhasil disimpan.' })
    } else {
      await api.post('/logistics/routes', form)
      toast.add({ severity: 'success', summary: 'Rute Terdaftar', detail: 'Trayek operasional baru telah ditambahkan.' })
    }
    drawerOpen.value = false
    load()
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal Menyimpan', detail: e.message })
  } finally {
    saving.value = false
  }
}

function confirmDelete(data: any) {
  // We logic as deactivate since it's a template
  confirm.require({
    message: `Apakah Anda yakin ingin menonaktifkan rute ${data.name}?`,
    header: 'Konfirmasi Perubahan Status',
    icon: 'pi pi-info-circle',
    acceptClass: 'p-button-danger rounded-xl font-bold',
    rejectClass: 'p-button-secondary p-button-text rounded-xl font-bold',
    accept: async () => {
      try {
        await api.patch(`/logistics/routes/${data.id}`, { isActive: false })
        toast.add({ severity: 'info', summary: 'Status Diupdate', detail: 'Rute telah dinonaktifkan.' })
        load()
      } catch (e: any) {
        toast.add({ severity: 'error', summary: 'Gagal', detail: e.message })
      }
    }
  })
}

onMounted(load)
watch([q, isActiveFilter], load)
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
  transition: all 0.2s ease;
}

:deep(.p-datatable-tbody > tr:hover) {
  background: rgba(16, 185, 129, 0.03) !important;
}

:deep(.p-datatable-tbody > tr > td) {
  padding: 1.25rem 1rem !important;
  border-bottom: 1px solid #f8fafc !important;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #e2e8f0;
  border-radius: 10px;
}
</style>