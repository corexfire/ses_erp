<template>
  <div class="min-h-screen bg-[#f8fafc]">
    
    <!-- ═══════════════════════════════════ HEADER ══════════════════════════════════ -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-8 m-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500">
      <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-indigo-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">General Support</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Asset Management</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase tracking-tighter">Fixed <span class="text-indigo-600">Assets</span></h1>
        <p class="text-slate-500 text-sm font-medium italic">Kelola siklus hidup, pemeliharaan, dan pertanggungjawaban aset perusahaan secara terpadu.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="loadData" :loading="loading" class="shadow-sm border-slate-200" />
        <Button label="Tambah Aset Baru" icon="pi pi-plus" class="p-button-rounded font-black text-[10px] uppercase shadow-lg shadow-indigo-100 px-6 py-3" @click="openCreateAsset" />
      </div>
    </div>

    <!-- Stats Ribbon -->
    <div class="grid grid-cols-1 md:grid-cols-5 gap-6 mx-6 mb-8">
       <div v-for="s in stats" :key="s.label" class="group p-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <i :class="[s.icon, 'text-6xl text-indigo-900']"></i>
          </div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ s.label }}</p>
          <h3 class="text-2xl font-black text-slate-900">{{ loading ? '—' : s.value }}</h3>
          <div class="flex items-center gap-2 mt-2">
             <span :class="['text-[10px] font-bold px-2 py-0.5 rounded-full', s.badgeClass]">
               {{ s.sub }}
             </span>
          </div>
       </div>
    </div>

    <!-- ═══════════════════════════════════ CONTENT TABS ══════════════════════════════════ -->
    <div class="mx-6 mb-6">
      <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

        <!-- Tab Bar -->
        <div class="border-b border-slate-100 px-8 pt-6 pb-0 flex flex-col md:flex-row md:items-end gap-4">
          <div class="flex gap-6">
            <button v-for="tab in tabs" :key="tab.key" @click="activeTab = tab.key"
              :class="['pb-4 text-[11px] font-black uppercase tracking-widest transition-all border-b-4',
                activeTab === tab.key ? 'border-indigo-600 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-700']">
              <i :class="[tab.icon, 'mr-2']"></i>{{ tab.label }}
              <span v-if="tab.count !== undefined" :class="['ml-2 px-2 py-0.5 rounded-full text-[9px] font-black', activeTab === tab.key ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-400']">{{ tab.count }}</span>
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <DataTable :value="filteredAssets" class="p-datatable-sm w-full" :loading="loading" dataKey="id">
            <Column header="KODE / KATEGORI" class="pl-8">
              <template #body="{ data }">
                <div class="flex flex-col">
                  <span class="text-[11px] font-black text-slate-800 font-mono tracking-tighter">{{ data.assetNo }}</span>
                  <span class="text-[9px] font-black text-indigo-500 uppercase tracking-widest">{{ data.category.replace('_', ' ') }}</span>
                </div>
              </template>
            </Column>
            <Column header="NAMA & BRAND">
              <template #body="{ data }">
                <div class="flex flex-col">
                  <span class="text-[11px] font-bold text-slate-800 leading-tight">{{ data.name }}</span>
                  <span class="text-[9px] text-slate-400 font-medium italic">{{ data.brand }} {{ data.model }}</span>
                </div>
              </template>
            </Column>
            <Column header="LOKASI & PENANGGUNG JAWAB">
              <template #body="{ data }">
                <div class="flex flex-col">
                  <div class="flex items-center gap-1.5 mb-0.5">
                    <i class="pi pi-map-marker text-[10px] text-indigo-500"></i>
                    <span class="text-[10px] font-bold text-slate-700">{{ data.location?.name || 'Unassigned' }}</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <i class="pi pi-user text-[10px] text-slate-400"></i>
                    <span class="text-[9px] text-slate-500">{{ data.custodian ? `${data.custodian.firstName} ${data.custodian.lastName || ''}` : 'No Custodian' }}</span>
                  </div>
                </div>
              </template>
            </Column>
            <Column header="SUPPORT STATUS">
              <template #body="{ data }">
                <div class="flex flex-col gap-1">
                  <span :class="['px-2.5 py-1 rounded-lg text-[9px] font-black uppercase text-center', getStatusClass(data.status)]">
                    {{ data.status.replace('_', ' ') }}
                  </span>
                  <div v-if="data.nextMaintenanceDate" class="flex items-center gap-1 text-[8px] font-black justify-center">
                    <i class="pi pi-clock" :class="isOverdue(data.nextMaintenanceDate) ? 'text-rose-500' : 'text-slate-400'"></i>
                    <span :class="isOverdue(data.nextMaintenanceDate) ? 'text-rose-500 underline' : 'text-slate-400'">
                      Next: {{ formatDate(data.nextMaintenanceDate) }}
                    </span>
                  </div>
                </div>
              </template>
            </Column>
            <Column header="CAPEX VALUE" class="text-right">
              <template #body="{ data }">
                <span class="text-[11px] font-black text-slate-900">{{ formatCurrency(data.purchaseCost) }}</span>
              </template>
            </Column>
            <Column class="text-right pr-8">
              <template #body="{ data }">
                <div class="flex gap-1 justify-end">
                  <Button icon="pi pi-book" severity="secondary" rounded text @click="openViewAsset(data)" v-tooltip="'Detail Aset'" />
                  <Button icon="pi pi-pencil" severity="secondary" rounded text @click="openEditAsset(data)" v-tooltip="'Edit'" />
                  <Button icon="pi pi-trash" severity="danger" rounded text @click="confirmDelete(data)" v-tooltip="'Hapus'" />
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════ ASSET DIALOG ══════════════════════════════════ -->
    <div v-if="assetDialogVisible" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="assetDialogVisible = false"></div>
      <div class="relative bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl transition-all duration-500 scale-in-center border border-white/20">
        <!-- Header -->
        <div class="flex items-center justify-between p-10 border-b border-slate-100 bg-slate-50/10 shrink-0">
          <div class="flex items-center gap-5">
            <div class="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-indigo-600 to-slate-900 flex items-center justify-center shadow-2xl shadow-indigo-200">
              <i class="pi pi-box text-3xl text-white"></i>
            </div>
            <div>
              <h3 class="text-2xl font-black text-slate-900 tracking-tight">{{ assetForm.id ? 'Edit Asset Passport' : 'Registrasi Aset Baru' }}</h3>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1 italic">Enterprise Asset Lifecycle System</p>
            </div>
          </div>
          <button @click="assetDialogVisible = false" class="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-all group">
            <i class="pi pi-times text-xl text-slate-400 group-hover:text-slate-900"></i>
          </button>
        </div>

        <div class="overflow-y-auto p-10 space-y-12 custom-scrollbar pb-32 bg-white/50">
          
          <!-- Identification Section -->
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-10">
            <div class="lg:col-span-1 border-r border-slate-100 pr-10 hidden lg:block">
              <span class="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Step 01</span>
              <h4 class="text-lg font-black text-slate-800 mt-2 leading-tight">Identitas & <br/>Katalog Aset</h4>
              <p class="text-xs text-slate-400 font-medium mt-3 leading-relaxed">Masukkan kode unik dan kategorisasi teknis untuk aset ini.</p>
            </div>
            <div class="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Asset Number <span class="text-rose-500">*</span></label>
                <input v-model="assetForm.assetNo" class="asset-input font-mono uppercase" placeholder="AST-XXXX" />
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Aset Category <span class="text-rose-500">*</span></label>
                <select v-model="assetForm.category" class="asset-select">
                  <option value="HEAVY_EQUIPMENT">Heavy Equipment</option>
                  <option value="IT_HARDWARE">IT Hardware</option>
                  <option value="VEHICLE">Project Vehicle</option>
                  <option value="FACILITIES">Facilities & MEP</option>
                  <option value="OFFICE_FURNITURE">Office Furniture</option>
                </select>
              </div>
              <div class="md:col-span-2 space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Deskriptif Aset <span class="text-rose-500">*</span></label>
                <input v-model="assetForm.name" class="asset-input font-bold" placeholder="Contoh: Excavator Komatsu PC200" />
              </div>
            </div>
          </div>

          <!-- Technical Specs Section -->
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-10">
            <div class="lg:col-span-1 border-r border-slate-100 pr-10 hidden lg:block">
              <span class="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Step 02</span>
              <h4 class="text-lg font-black text-slate-800 mt-2 leading-tight">Spesifikasi <br/>Manufaktur</h4>
              <p class="text-xs text-slate-400 font-medium mt-3 leading-relaxed">Detail teknis untuk verifikasi fisik di lapangan.</p>
            </div>
            <div class="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Brand / Merk</label>
                <input v-model="assetForm.brand" class="asset-input" placeholder="e.g. Caterpillar" />
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Model / Type</label>
                <input v-model="assetForm.model" class="asset-input" placeholder="e.g. 320D" />
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Serial Number</label>
                <input v-model="assetForm.serialNumber" class="asset-input font-mono" placeholder="S/N: XXX-XXX" />
              </div>
            </div>
          </div>

          <!-- Ownership & Location -->
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-10">
            <div class="lg:col-span-1 border-r border-slate-100 pr-10 hidden lg:block">
              <span class="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Step 03</span>
              <h4 class="text-lg font-black text-slate-800 mt-2 leading-tight">Lokasi & <br/>Tanggung Jawab</h4>
              <p class="text-xs text-slate-400 font-medium mt-3 leading-relaxed">Tentukan di mana aset berada dan siapa PIC-nya.</p>
            </div>
            <div class="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Lokasi Proyek / Site</label>
                <select v-model="assetForm.locationId" class="asset-select">
                  <option :value="null">-- Tidak Ada Lokasi --</option>
                  <option v-for="s in sites" :key="s.id" :value="s.id">{{ s.name }} ({{ s.siteCode }})</option>
                </select>
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Penanggung Jawab (Custodian)</label>
                <select v-model="assetForm.custodianId" class="asset-select">
                  <option :value="null">-- Tidak Ada PIC --</option>
                  <option v-for="e in employees" :key="e.id" :value="e.id">{{ e.firstName }} {{ e.lastName }} ({{ e.employeeNo }})</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Lifecycle Monitoring -->
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-10 pb-20">
            <div class="lg:col-span-1 border-r border-slate-100 pr-10 hidden lg:block">
              <span class="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Step 04</span>
              <h4 class="text-lg font-black text-slate-800 mt-2 leading-tight">Lifecycle <br/>Support</h4>
              <p class="text-xs text-slate-400 font-medium mt-3 leading-relaxed">Pantau warranty, asuransi, dan jadwal servis berkala.</p>
            </div>
            <div class="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Masa Berlaku Warranty</label>
                <input v-model="assetForm.warrantyExpiry" type="date" class="asset-input" />
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Masa Berlaku Asuransi</label>
                <input v-model="assetForm.insuranceExpiry" type="date" class="asset-input" />
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black text-indigo-600 uppercase tracking-widest ml-1 font-black">Next Maintenance Schedule</label>
                <input v-model="assetForm.nextMaintenanceDate" type="date" class="asset-input border-indigo-200 bg-indigo-50/30" />
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="absolute bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl p-10 border-t border-slate-100 flex items-center justify-between z-10 rounded-t-[3rem] shadow-[0_-15px_60px_rgba(0,0,0,0.05)]">
           <div class="flex items-center gap-3">
              <i class="pi pi-info-circle text-indigo-400"></i>
              <p class="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Pastikan data fisik sesuai dengan dokumen pengadaan.</p>
           </div>
           <div class="flex gap-4">
              <Button label="Batalkan" severity="secondary" text @click="assetDialogVisible = false" class="font-black text-[10px] uppercase tracking-widest" />
              <Button :label="assetForm.id ? 'Perbarui Passport Aset' : 'Simpan Registry Aset'" icon="pi pi-check" class="p-button-rounded font-black text-[10px] uppercase px-10 py-4 shadow-2xl shadow-indigo-200" @click="saveAsset" :loading="saving" />
           </div>
        </div>
      </div>
    </div>

    <!-- Confirm Dialog Placeholder -->
    <Dialog v-model:visible="deleteVisible" header="Konfirmasi Penghapusan" :style="{width: '350px'}" :modal="true">
        <div class="flex items-center gap-3">
            <i class="pi pi-exclamation-triangle text-3xl text-rose-500" />
            <span class="text-sm font-medium">Apakah Anda yakin ingin menghapus aset ini secara permanen?</span>
        </div>
        <template #footer>
            <Button label="Batal" icon="pi pi-times" severity="secondary" text @click="deleteVisible = false" />
            <Button label="Ya, Hapus" icon="pi pi-check" severity="danger" @click="executeDelete" :loading="saving" />
        </template>
    </Dialog>

    <!-- Toasts -->

  </div>
</template>

<script setup lang="ts">
import { useApi } from '@/composables/useApi';
import { format } from 'date-fns';
import { useToast } from 'primevue/usetoast';

const api = useApi();
const toast = useToast();

// State
const loading = ref(false);
const saving = ref(false);
const activeTab = ref('ALL');
const assetDialogVisible = ref(false);
const deleteVisible = ref(false);
const deleteTarget = ref<any>(null);

const assets = ref<any[]>([]);
const statsData = ref<any>({});
const sites = ref<any[]>([]);
const employees = ref<any[]>([]);

const assetForm = reactive({
  id: null as any,
  assetNo: '',
  name: '',
  category: 'IT_HARDWARE',
  purchaseDate: new Date().toISOString().split('T')[0],
  purchaseCost: 0,
  usefulLife: 5,
  brand: '',
  model: '',
  serialNumber: '',
  locationId: null as any,
  custodianId: null as any,
  status: 'ACTIVE',
  warrantyExpiry: '' as any,
  insuranceExpiry: '' as any,
  insurancePolicy: '',
  nextMaintenanceDate: '' as any,
});

// Computed
const tabs = computed(() => [
  { key: 'ALL', label: 'Semua Inventory', icon: 'pi pi-server', count: (assets.value || []).length },
  { key: 'ACTIVE', label: 'Aset Aktif', icon: 'pi pi-check-circle', count: (assets.value || []).filter(a => a.status === 'ACTIVE').length },
  { key: 'MAINTENANCE', label: 'Under Maintenance', icon: 'pi pi-cog', count: (assets.value || []).filter(a => a.status === 'UNDER_MAINTENANCE').length },
]);

const stats = computed(() => [
  { label: 'Total Aset', value: statsData.value.total || 0, icon: 'pi pi-box', badgeClass: 'bg-indigo-50 text-indigo-600', sub: 'Aset Tercatat' },
  { label: 'Ready for Support', value: statsData.value.active || 0, icon: 'pi pi-bolt', badgeClass: 'bg-emerald-50 text-emerald-600', sub: 'Status Operasional' },
  { label: 'Massa CAPEX', value: formatCurrency(statsData.value.totalCapex || 0), icon: 'pi pi-chart-line', badgeClass: 'bg-blue-50 text-blue-600', sub: 'Nilai Perolehan' },
  { label: 'Overdue Service', value: statsData.value.maintenanceOverdue || 0, icon: 'pi pi-exclamation-triangle', badgeClass: 'bg-rose-50 text-rose-600', sub: 'Perlu Servis Segera' },
  { label: 'Rasio Servis', value: assets.value.length > 0 ? (statsData.value.underMaintenance / assets.value.length * 100).toFixed(1) + '%' : '0%', icon: 'pi pi-sync', badgeClass: 'bg-slate-50 text-slate-600', sub: 'Aset dalam Perawatan' },
]);

const filteredAssets = computed(() => {
  const list = assets.value || [];
  if (activeTab.value === 'ALL') return list;
  if (activeTab.value === 'MAINTENANCE') return list.filter(a => a.status === 'UNDER_MAINTENANCE');
  return list.filter(a => a.status === activeTab.value);
});

// Implementation
async function loadData() {
  loading.value = true;
  try {
    const [assetsRes, statsRes] = await Promise.all([
      api.get('/support/assets'),
      api.get('/support/assets/stats'),
    ]);
    assets.value = assetsRes.data;
    statsData.value = statsRes.data;
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: 'Sistem aset tidak merespon.', life: 3000 });
  } finally {
    loading.value = false;
  }
}

async function loadMasters() {
  try {
    const [sitesRes, employeesRes] = await Promise.all([
      api.get('/project/site-master'),
      api.get('/hris/employees'),
    ]);
    sites.value = sitesRes.data || sitesRes;
    employees.value = employeesRes.data || employeesRes;
  } catch {}
}

function openCreateAsset() {
  Object.assign(assetForm, {
    id: null,
    assetNo: `AST-${new Date().getFullYear()}-${String(Math.random()).slice(2, 6)}`,
    name: '',
    category: 'IT_HARDWARE',
    purchaseDate: new Date().toISOString().split('T')[0],
    purchaseCost: 0,
    usefulLife: 5,
    brand: '',
    model: '',
    serialNumber: '',
    locationId: null,
    custodianId: null,
    status: 'ACTIVE',
    warrantyExpiry: '',
    insuranceExpiry: '',
    insurancePolicy: '',
    nextMaintenanceDate: '',
  });
  loadMasters();
  assetDialogVisible.value = true;
}

function openEditAsset(asset: any) {
  Object.assign(assetForm, {
    id: asset.id,
    assetNo: asset.assetNo,
    name: asset.name,
    category: asset.category,
    purchaseDate: asset.purchaseDate?.split('T')[0] || '',
    purchaseCost: Number(asset.purchaseCost),
    usefulLife: asset.usefulLife,
    brand: asset.brand || '',
    model: asset.model || '',
    serialNumber: asset.serialNumber || '',
    locationId: asset.locationId,
    custodianId: asset.custodianId,
    status: asset.status,
    warrantyExpiry: asset.warrantyExpiry?.split('T')[0] || '',
    insuranceExpiry: asset.insuranceExpiry?.split('T')[0] || '',
    insurancePolicy: asset.insurancePolicy || '',
    nextMaintenanceDate: asset.nextMaintenanceDate?.split('T')[0] || '',
  });
  loadMasters();
  assetDialogVisible.value = true;
}

function openViewAsset(asset: any) {
  openEditAsset(asset); // Shared for now or can make separate view-only
}

async function saveAsset() {
  if (!assetForm.assetNo || !assetForm.name) {
    toast.add({ severity: 'warn', summary: 'Input Invalid', detail: 'Asset No dan Nama wajib diisi.', life: 3000 });
    return;
  }
  saving.value = true;
  try {
    if (assetForm.id) {
      await api.patch(`/support/assets/${assetForm.id}`, assetForm);
      toast.add({ severity: 'success', summary: 'Updated', detail: 'Passport aset berhasil diperbarui.', life: 3000 });
    } else {
      await api.post('/support/assets', assetForm);
      toast.add({ severity: 'success', summary: 'Created', detail: 'Aset baru telah diregistrasi.', life: 3000 });
    }
    assetDialogVisible.value = false;
    loadData();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Error', detail: e.message, life: 3000 });
  } finally {
    saving.value = false;
  }
}

function confirmDelete(asset: any) {
  deleteTarget.value = asset;
  deleteVisible.value = true;
}

async function executeDelete() {
  if (!deleteTarget.value) return;
  saving.value = true;
  try {
    await api.delete(`/support/assets/${deleteTarget.value.id}`);
    toast.add({ severity: 'success', summary: 'Deleted', detail: 'Aset telah dihapus dari registry.', life: 3000 });
    deleteVisible.value = false;
    loadData();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal Hapus', detail: e.message, life: 3000 });
  } finally {
    saving.value = false;
  }
}

// Helpers
function formatDate(date: string) {
  if (!date) return '-';
  return format(new Date(date), 'dd MMM yyyy');
}

function formatCurrency(val: any) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
}

function isOverdue(date: string) {
  if (!date) return false;
  return new Date(date) < new Date();
}

function getStatusClass(status: string) {
  switch (status) {
    case 'ACTIVE': return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
    case 'UNDER_MAINTENANCE': return 'bg-amber-50 text-amber-600 border border-amber-100';
    case 'DISPOSED': return 'bg-slate-100 text-slate-500 border border-slate-200';
    default: return 'bg-slate-50 text-slate-400';
  }
}

onMounted(() => {
  loadData();
});
</script>

<style scoped>
.asset-input {
  @apply w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-[13px] font-bold text-slate-800 transition-all focus:bg-white focus:border-indigo-600 focus:outline-none placeholder:text-slate-300;
}
.asset-select {
  @apply w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-[13px] font-black text-slate-800 transition-all focus:bg-white focus:border-indigo-600 focus:outline-none appearance-none cursor-pointer;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-slate-200 rounded-full hover:bg-slate-300 transition-colors;
}

/* Animations */
.scale-in-center {
  animation: scale-in-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
@keyframes scale-in-center {
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
</style>
