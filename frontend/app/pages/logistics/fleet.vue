<template>
  <div class="p-4 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 overflow-hidden relative p-8 rounded-xl bg-white border border-slate-200 shadow-sm">
      <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-indigo-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Unit Logistik</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-indigo-600">Manajemen Armada</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2">Pusat Kendaraan <span class="text-indigo-600">& Fleet</span></h1>
        <p class="text-slate-500 text-sm font-medium">Monitoring performa armada, kepatuhan dokumen KIR/STNK, dan kapasitas logistik.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="load" :loading="loading" />
        <Button label="Tambah Armada" icon="pi pi-plus" class="p-button-rounded font-black text-xs shadow-lg shadow-indigo-100" @click="openNew" :disabled="!canManage" />
      </div>
    </div>

    <!-- Stats Section -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
       <div v-for="s in stats" :key="s.label" class="group p-4 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <i :class="[s.icon, 'text-6xl']"></i>
          </div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ s.label }}</p>
          <h3 class="text-2xl font-black text-slate-900">{{ s.value }} <span class="text-sm font-medium text-slate-400">Unit</span></h3>
          <div class="flex items-center gap-2 mt-2">
             <span :class="['text-[10px] font-bold px-2 py-0.5 rounded-full', s.color]">{{ s.sub }}</span>
          </div>
       </div>
    </div>

    <!-- Main Table Area -->
    <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col">
       <div class="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between bg-slate-50/10 gap-4">
          <div>
             <h2 class="text-[13px] font-black text-slate-900 uppercase tracking-widest">Daftar Inventaris Kendaraan</h2>
             <p class="text-xs text-slate-500 font-medium">Data teknis dan status operasional armada aktif.</p>
          </div>
          <div class="flex items-center gap-3">
             <div class="p-input-icon-left">
                <i class="pi pi-search text-slate-400" />
                <InputText v-model="q" placeholder="Cari Plat atau Kode..." class="p-inputtext-sm rounded-xl border-slate-200 w-64" />
             </div>
             <Select v-model="statusFilter" :options="['ALL', 'ACTIVE', 'MAINTENANCE', 'INACTIVE']" class="p-select-sm rounded-xl text-[10px] font-bold uppercase w-40" />
          </div>
       </div>

       <DataTable :value="vehicles" dataKey="id" class="p-datatable-sm w-full" :loading="loading" :rows="10" paginator>
          <Column field="code" header="KODE & PLAT" class="pl-8">
             <template #body="{ data }">
                <div class="flex flex-col">
                   <span class="text-[11px] font-black text-slate-800">{{ data.code }}</span>
                   <span class="text-[12px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 inline-block w-fit mt-1">{{ data.plateNo }}</span>
                </div>
             </template>
          </Column>
          <Column header="TIPE & MERK">
             <template #body="{ data }">
                <div class="flex flex-col">
                   <span class="text-[11px] font-bold text-slate-700">{{ data.vehicleType }}</span>
                   <span class="text-[10px] text-slate-400 uppercase font-medium">{{ data.brand }} {{ data.model }} ({{ data.year || '-' }})</span>
                </div>
             </template>
          </Column>
          <Column header="KAPASITAS">
             <template #body="{ data }">
                <div class="flex items-center gap-3">
                   <div class="flex flex-col">
                      <span class="text-[10px] font-black text-slate-400 uppercase">Berat</span>
                      <span class="text-[11px] font-bold text-slate-700">{{ data.capacityWeight }} KG</span>
                   </div>
                   <div class="w-px h-6 bg-slate-100"></div>
                   <div class="flex flex-col">
                      <span class="text-[10px] font-black text-slate-400 uppercase">Volume</span>
                      <span class="text-[11px] font-bold text-slate-700">{{ data.capacityVolume }} CBM</span>
                   </div>
                </div>
             </template>
          </Column>
          <Column header="DOKUMEN LEGAL">
             <template #body="{ data }">
                <div class="flex flex-col gap-1">
                   <div class="flex items-center gap-2">
                       <span class="text-[9px] font-black text-slate-400 w-8">STNK</span>
                       <span :class="['text-[10px] font-bold px-1.5 py-0.5 rounded', getExpiryClass(data.stnkExpiry)]">
                          {{ data.stnkExpiry ? formatDate(data.stnkExpiry) : '-' }}
                       </span>
                   </div>
                   <div class="flex items-center gap-2">
                       <span class="text-[9px] font-black text-slate-400 w-8">KIR</span>
                       <span :class="['text-[10px] font-bold px-1.5 py-0.5 rounded', getExpiryClass(data.kirExpiry)]">
                          {{ data.kirExpiry ? formatDate(data.kirExpiry) : '-' }}
                       </span>
                   </div>
                </div>
             </template>
          </Column>
          <Column header="KEPEMILIKAN">
             <template #body="{ data }">
                <div class="flex flex-col">
                   <span class="text-[10px] font-black text-slate-800 uppercase tracking-tighter">{{ data.ownershipType }}</span>
                   <span class="text-[9px] text-slate-400 font-bold uppercase truncate max-w-[120px]">{{ data.transporter?.name || 'Milik Sendiri' }}</span>
                </div>
             </template>
          </Column>
          <Column header="STATUS">
             <template #body="{ data }">
                <span :class="['px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest', getStatusClass(data.status)]">
                   {{ data.status }}
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
    <Drawer v-model:visible="drawerOpen" :header="editingId ? 'Edit Informasi Armada' : 'Registrasi Armada Baru'" position="right" class="w-[600px]">
       <div class="space-y-8 pt-4 px-4 overflow-y-auto pb-24 h-full custom-scrollbar">
          <!-- Section 1: Identitas -->
          <div class="space-y-5">
             <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs">1</div>
                <h4 class="text-[11px] font-black uppercase tracking-widest text-slate-900">Identitas & Klasifikasi</h4>
             </div>
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase">Nomor Polisi (Plat)</label>
                   <InputText v-model="form.plateNo" class="w-full rounded-xl border-slate-200" placeholder="B 1234 ABC" />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase">Tipe Kendaraan</label>
                   <Select v-model="form.vehicleType" :options="['VAN', 'BLIND VAN', 'PICKUP', 'CDE', 'CDD', 'TRONTON', 'WINGBOX']" class="w-full rounded-xl" />
                </div>
             </div>
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase">Merk / Brand</label>
                   <InputText v-model="form.brand" class="w-full rounded-xl" placeholder="Isuzu, Hino, etc." />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase">Model / Seri</label>
                   <InputText v-model="form.model" class="w-full rounded-xl" placeholder="ELF, Ranger, etc." />
                </div>
             </div>
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase">Tahun Perakitan</label>
                   <InputNumber v-model="form.year" :useGrouping="false" class="w-full rounded-xl" />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase">Status Operasional</label>
                   <Select v-model="form.status" :options="['ACTIVE', 'MAINTENANCE', 'INACTIVE']" class="w-full rounded-xl" />
                </div>
             </div>
          </div>

          <!-- Section 2: Kapasitas -->
          <div class="space-y-5 p-4 rounded-3xl bg-indigo-50/50 border border-indigo-100">
             <div class="flex items-center gap-3 mb-2">
                <div class="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs">2</div>
                <h4 class="text-[11px] font-black uppercase tracking-widest text-slate-900">Spesifikasi Kapasitas</h4>
             </div>
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-indigo-400 uppercase">Beban Maksimal (KG)</label>
                   <InputNumber v-model="form.capacityWeight" class="w-full p-inputtext-sm" />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-indigo-400 uppercase">Volume Maksimal (CBM)</label>
                   <InputNumber v-model="form.capacityVolume" class="w-full p-inputtext-sm" :minFractionDigits="2" />
                </div>
             </div>
             <div class="space-y-1 mt-2">
                <label class="text-[10px] font-black text-indigo-400 uppercase">Metode Kepemilikan</label>
                <Select v-model="form.ownershipType" :options="['OWNED', 'LEASED', 'THIRD_PARTY']" class="w-full rounded-xl" />
             </div>
             <div class="space-y-1" v-if="form.ownershipType !== 'OWNED'">
                <label class="text-[10px] font-black text-indigo-400 uppercase">Transporter / Vendor</label>
                <Select v-model="form.transporterId" :options="transporters" optionLabel="name" optionValue="id" class="w-full rounded-xl" placeholder="Pilih Vendor" />
             </div>
          </div>

          <!-- Section 3: Dokumen -->
          <div class="space-y-5">
             <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center text-white text-xs">3</div>
                <h4 class="text-[11px] font-black uppercase tracking-widest text-slate-900">Legalitas & Kepatuhan</h4>
             </div>
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase">Nomor STNK</label>
                   <InputText v-model="form.stnkNo" class="w-full rounded-xl" />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase">Masa Berlaku STNK</label>
                   <InputText v-model="form.stnkExpiry" type="date" class="w-full rounded-xl" />
                </div>
             </div>
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase">Nomor KIR</label>
                   <InputText v-model="form.kirNo" class="w-full rounded-xl" />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase">Masa Berlaku KIR</label>
                   <InputText v-model="form.kirExpiry" type="date" class="w-full rounded-xl" />
                </div>
             </div>
             <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-400 uppercase">Catatan Kondisi Unit</label>
                <Textarea v-model="form.notes" rows="3" class="w-full rounded-xl border-slate-200" placeholder="Riwayat kerusakan atau informasi tambahan lainnya..." />
             </div>
          </div>

          <!-- Actions -->
          <div class="fixed bottom-0 right-0 w-[600px] bg-white p-4 border-t flex justify-end gap-3 rounded-t-[2rem] shadow-2xl">
             <Button label="Batalkan" severity="secondary" text @click="drawerOpen = false" class="font-black text-[10px] uppercase" />
             <Button label="Simpan Data" icon="pi pi-check" class="p-button-rounded font-black text-[10px] uppercase px-8 bg-indigo-600 border-indigo-600" @click="save" :loading="saving" :disabled="!form.plateNo || !form.vehicleType" />
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

const canManage = computed(() => auth.hasPermission('logistics.fleet.manage'))

const q = ref('')
const statusFilter = ref('ALL')
const loading = ref(false)
const saving = ref(false)
const vehicles = ref<any[]>([])
const transporters = ref<any[]>([])
const drawerOpen = ref(false)
const editingId = ref<string | null>(null)

const form = reactive({
  plateNo: '',
  vehicleType: 'VAN',
  brand: '',
  model: '',
  year: new Date().getFullYear(),
  ownershipType: 'OWNED',
  capacityWeight: 0,
  capacityVolume: 0,
  status: 'ACTIVE',
  transporterId: null as string | null,
  stnkNo: '',
  stnkExpiry: '',
  kirNo: '',
  kirExpiry: '',
  notes: '',
})

const stats = computed(() => {
  const total = vehicles.value.length
  const active = vehicles.value.filter(v => v.status === 'ACTIVE').length
  const maintenance = vehicles.value.filter(v => v.status === 'MAINTENANCE').length
  
  // Calculate expired documents (STNK or KIR)
  const now = new Date()
  const expiredDocs = vehicles.value.filter(v => {
    const stnkExp = v.stnkExpiry ? new Date(v.stnkExpiry) : null
    const kirExp = v.kirExpiry ? new Date(v.kirExpiry) : null
    return (stnkExp && stnkExp < now) || (kirExp && kirExp < now)
  }).length

  return [
    { label: 'Total Armada', value: total, icon: 'pi pi-truck', color: 'bg-indigo-50 text-indigo-600', sub: 'Semua Unit' },
    { label: 'Unit Beroperasi', value: active, icon: 'pi pi-play-circle', color: 'bg-emerald-50 text-emerald-600', sub: 'Ready-to-Go' },
    { label: 'Sedang Maintenance', value: maintenance, icon: 'pi pi-cog', color: 'bg-amber-50 text-amber-600', sub: 'Unit Bengkel' },
    { label: 'Legalitas Expired', value: expiredDocs, icon: 'pi pi-exclamation-triangle', color: 'bg-rose-50 text-rose-600', sub: 'Perlu Perpanjang' }
  ]
})

function getStatusClass(s: string) {
  if (s === 'ACTIVE') return 'bg-emerald-50 text-emerald-700'
  if (s === 'MAINTENANCE') return 'bg-amber-50 text-amber-700'
  return 'bg-slate-100 text-slate-500'
}

function getExpiryClass(d: any) {
  if (!d) return 'text-slate-400'
  const date = new Date(d)
  const now = new Date()
  const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) return 'bg-rose-50 text-rose-600 border border-rose-100'
  if (diffDays < 30) return 'bg-amber-50 text-amber-600 border border-amber-100'
  return 'text-slate-700'
}

function formatDate(d: any) {
  if (!d) return '-'
  return new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}

async function load() {
  loading.value = true
  try {
    const params: any = {}
    if (q.value) params.q = q.value
    if (statusFilter.value !== 'ALL') params.status = statusFilter.value
    
    const [resFleet, resTrans] = await Promise.all([
      api.get('/logistics/fleet', { params }),
      api.get('/core/query?table=Transporter')
    ])
    
    vehicles.value = resFleet.data?.vehicles || []
    transporters.value = resTrans.data || []
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal Memuat Data', detail: e.message })
  } finally {
    loading.value = false
  }
}

function openNew() {
  editingId.value = null
  Object.assign(form, {
    plateNo: '',
    vehicleType: 'VAN',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    ownershipType: 'OWNED',
    capacityWeight: 0,
    capacityVolume: 0,
    status: 'ACTIVE',
    transporterId: null,
    stnkNo: '',
    stnkExpiry: '',
    kirNo: '',
    kirExpiry: '',
    notes: '',
  })
  drawerOpen.value = true
}

function edit(data: any) {
  editingId.value = data.id
  Object.assign(form, {
    ...data,
    stnkExpiry: data.stnkExpiry ? data.stnkExpiry.slice(0, 10) : '',
    kirExpiry: data.kirExpiry ? data.kirExpiry.slice(0, 10) : '',
    capacityWeight: Number(data.capacityWeight),
    capacityVolume: Number(data.capacityVolume)
  })
  drawerOpen.value = true
}

async function save() {
  saving.value = true
  try {
    const payload = { ...form }
    if (editingId.value) {
      await api.patch(`/logistics/fleet/${editingId.value}`, payload)
      toast.add({ severity: 'success', summary: 'Armada Diperbarui', detail: 'Informasi kendaraan berhasil disimpan.' })
    } else {
      await api.post('/logistics/fleet', payload)
      toast.add({ severity: 'success', summary: 'Armada Terdaftar', detail: 'Unit baru berhasil ditambahkan ke inventaris.' })
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
  confirm.require({
    message: `Nonaktifkan armada ${data.plateNo} (${data.code})?`,
    header: 'Konfirmasi Deaktivasi',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger rounded-xl font-bold',
    rejectClass: 'p-button-secondary p-button-text rounded-xl font-bold',
    accept: async () => {
      try {
        await api.post(`/logistics/fleet/${data.id}/deactivate`)
        toast.add({ severity: 'info', summary: 'Status Diubah', detail: 'Kendaraan telah dinonaktifkan.' })
        load()
      } catch (e: any) {
        toast.add({ severity: 'error', summary: 'Gagal', detail: e.message })
      }
    }
  })
}

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

:deep(.p-datatable-tbody > tr) {
  background: transparent !important;
  transition: all 0.2s ease;
}

:deep(.p-datatable-tbody > tr:hover) {
  background: rgba(79, 70, 229, 0.03) !important;
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
