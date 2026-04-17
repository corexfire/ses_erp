<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';

const toast = useToast();
const confirm = useConfirm();
const { $api } = useNuxtApp();

// State
const spareParts = ref([]);
const stats = ref({ total: 0, lowStock: 0, totalValue: 0 });
const loading = ref(false);
const displayDialog = ref(false);
const submitted = ref(false);
const equipmentOptions = ref([]);

const part = ref({
  id: null,
  code: '',
  name: '',
  description: '',
  oemPartNumber: '',
  manufacturer: '',
  brand: '',
  baseUomCode: 'PCS',
  reorderPoint: 0,
  reorderQty: 0,
  isSparePart: true,
  compatibleEquipmentIds: [],
});

const filters = ref({
  global: { value: null },
});

// Load Data
const loadData = async () => {
  loading.value = true;
  try {
    const [partsRes, statsRes, equipRes] = await Promise.all([
      $api.get('/fsm/spare-parts'),
      $api.get('/fsm/spare-parts/stats'),
      $api.get('/manufacturing/maintenance/equipment'),
    ]);
    spareParts.value = partsRes.data;
    stats.value = statsRes.data;
    equipmentOptions.value = (equipRes.data.equipment || []).map(e => ({ label: `${e.code} - ${e.name}`, value: e.id }));
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Gagal memuat data spare parts', life: 3000 });
  } finally {
    loading.value = false;
  }
};

onMounted(loadData);

// Actions
const openNew = () => {
  part.value = {
    id: null,
    code: '',
    name: '',
    description: '',
    oemPartNumber: '',
    manufacturer: '',
    brand: '',
    baseUomCode: 'PCS',
    reorderPoint: 0,
    reorderQty: 0,
    isSparePart: true,
    compatibleEquipmentIds: [],
  };
  submitted.value = false;
  displayDialog.value = true;
};

const editPart = (p) => {
  part.value = { 
    ...p,
    compatibleEquipmentIds: p.fsmCompatibilities?.map(c => c.equipmentId) || []
  };
  displayDialog.value = true;
};

const savePart = async () => {
  submitted.value = true;
  if (!part.value.code || !part.value.name) return;

  loading.value = true;
  try {
    if (part.value.id) {
      await $api.patch(`/fsm/spare-parts/${part.value.id}`, part.value);
      toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Spare part diperbarui', life: 3000 });
    } else {
      await $api.post('/fsm/spare-parts', part.value);
      toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Spare part ditambahkan', life: 3000 });
    }
    displayDialog.value = false;
    loadData();
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Gagal menyimpan data', life: 3000 });
  } finally {
    loading.value = false;
  }
};

const deletePart = (p) => {
  confirm.require({
    message: `Apakah Anda yakin ingin menghapus ${p.name}?`,
    header: 'Konfirmasi Hapus',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      try {
        await $api.delete(`/fsm/spare-parts/${p.id}`);
        toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Part dihapus', life: 3000 });
        loadData();
      } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Gagal menghapus part', life: 3000 });
      }
    }
  });
};

// Helpers
const getStockSeverity = (p) => {
  const stock = p.stockBalances?.reduce((sum, b) => sum + Number(b.qtyOnHand), 0) || 0;
  if (stock === 0) return 'danger';
  if (stock < p.reorderPoint) return 'warning';
  return 'success';
};

const getStockLabel = (p) => {
  const stock = p.stockBalances?.reduce((sum, b) => sum + Number(b.qtyOnHand), 0) || 0;
  if (stock === 0) return 'Habis';
  if (stock < p.reorderPoint) return 'Stok Rendah';
  return 'Tersedia';
};

const getTotalStock = (p) => {
  return p.stockBalances?.reduce((sum, b) => sum + Number(b.qtyOnHand), 0) || 0;
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 pb-20">
    
    <!-- Premium Header -->
    <div class="p-8 m-6 rounded-xl bg-white border border-slate-200 shadow-sm relative overflow-hidden transition-all duration-500">
      <div class="absolute top-0 right-0 w-80 h-80 bg-indigo-50 rounded-full blur-3xl -mr-40 -mt-40"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -ml-32 -mb-32"></div>

      <div class="relative flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div class="flex items-center gap-6">
          <div class="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-2xl shadow-indigo-200 shrink-0">
            <i class="pi pi-cog text-white text-2xl animate-spin-slow"></i>
          </div>
          <div>
            <div class="flex items-center gap-3 mb-1">
               <span class="px-2.5 py-1 bg-indigo-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">FSM Module</span>
               <span class="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Inventory Logistik</span>
            </div>
            <h1 class="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Spare <span class="text-indigo-600">Parts</span></h1>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-4">
          <div class="relative min-w-[300px]">
            <i class="pi pi-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <InputText v-model="filters.global.value" placeholder="Cari Part, OEM, atau Merk..." 
              class="w-full pl-12 pr-4 py-3 bg-slate-50 border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-400 font-bold transition-all" 
            />
          </div>
          <Button @click="openNew" icon="pi pi-plus" label="Tambah Part" class="!bg-indigo-600 !border-none !rounded-2xl !px-6 !py-3 !text-sm !font-black !shadow-xl !shadow-indigo-100 uppercase tracking-wider" />
          <Button @click="loadData" icon="pi pi-refresh" severity="secondary" rounded outlined :loading="loading" />
        </div>
      </div>
    </div>

    <!-- Stats Dashboard -->
    <div class="px-6 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="p-8 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center gap-6 group hover:border-indigo-500 transition-all duration-300">
        <div class="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center transition-all group-hover:bg-indigo-600 group-hover:rotate-6">
          <i class="pi pi-box text-xl text-slate-400 group-hover:text-white"></i>
        </div>
        <div>
          <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total SKUs</p>
          <h3 class="text-2xl font-black text-slate-900">{{ stats.total }} <span class="text-xs text-slate-400 ml-1 font-bold">Items</span></h3>
        </div>
      </div>
      
      <div class="p-8 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center gap-6 group hover:border-orange-500 transition-all duration-300">
        <div class="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center transition-all group-hover:bg-orange-600 group-hover:rotate-6">
          <i class="pi pi-exclamation-circle text-xl text-orange-400 group-hover:text-white"></i>
        </div>
        <div>
          <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Stok Rendah</p>
          <h3 class="text-2xl font-black text-slate-900">{{ stats.lowStock }} <span class="text-xs text-slate-400 ml-1 font-bold">Alerts</span></h3>
        </div>
      </div>

      <div class="p-8 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center gap-6 group hover:border-emerald-500 transition-all duration-300">
        <div class="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center transition-all group-hover:bg-emerald-600 group-hover:rotate-6">
          <i class="pi pi-chart-line text-xl text-emerald-400 group-hover:text-white"></i>
        </div>
        <div>
          <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Nilai Inventaris</p>
          <h3 class="text-2xl font-black text-slate-900">Rp {{ stats.totalValue.toLocaleString('id-ID') }}</h3>
        </div>
      </div>
    </div>

    <!-- Data Table Section -->
    <div class="mx-6 p-4 rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
      <DataTable 
        :value="spareParts" 
        :loading="loading" 
        :filters="filters"
        class="p-datatable-modern"
        :paginator="true" :rows="10"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Menampilkan {first} sampai {last} dari {totalRecords} spare parts"
      >
        <template #empty>
          <div class="text-center p-20">
            <i class="pi pi-search text-6xl text-slate-200 mb-6"></i>
            <h3 class="text-xl font-black text-slate-400 uppercase tracking-widest">Tidak Ada Data</h3>
            <p class="text-slate-500 font-bold mt-2">Coba ubah kata kunci pencarian atau tambah part baru.</p>
          </div>
        </template>

        <column field="code" header="DIAGRAM / PART" class="w-[30%]">
          <template #body="{ data }">
            <div class="flex items-center gap-4 py-2">
              <div class="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
                <i class="pi pi-image text-slate-300"></i>
              </div>
              <div class="flex flex-col">
                <span class="text-[9px] font-black text-indigo-600 uppercase tracking-widest mb-0.5">{{ data.code }}</span>
                <span class="text-xs font-black text-slate-900 leading-tight">{{ data.name }}</span>
                <span class="text-[9px] font-bold text-slate-400 mt-0.5 line-clamp-1 italic">{{ data.description }}</span>
              </div>
            </div>
          </template>
        </column>

        <column field="oemPartNumber" header="OEM / MANUFAKTUR">
          <template #body="{ data }">
            <div class="flex flex-col">
              <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">{{ data.brand || 'No Brand' }}</span>
              <span class="text-xs font-black text-slate-700">{{ data.oemPartNumber || '-' }}</span>
              <span class="text-[10px] font-bold text-slate-500">{{ data.manufacturer || '-' }}</span>
            </div>
          </template>
        </column>

        <column header="STOK TERSEDIA">
          <template #body="{ data }">
            <div class="flex items-center gap-3">
              <div class="flex flex-col items-end">
                <div class="flex items-baseline gap-1">
                  <span class="text-lg font-black text-slate-900">{{ getTotalStock(data) }}</span>
                  <span class="text-[9px] font-black text-slate-400 uppercase">{{ data.baseUomCode }}</span>
                </div>
                <Tag :value="getStockLabel(data)" :severity="getStockSeverity(data)" class="!text-[8px] !font-black !px-2 !py-0.5 !rounded-lg" />
              </div>
            </div>
          </template>
        </column>

        <column header="KOMPATIBILITAS">
          <template #body="{ data }">
            <div class="flex flex-wrap gap-1 max-w-[200px]">
              <span v-for="c in data.fsmCompatibilities?.slice(0, 2)" :key="c.id" 
                class="px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-600 text-[8px] font-black border border-indigo-100"
              >
                {{ c.equipment?.code }}
              </span>
              <span v-if="data.fsmCompatibilities?.length > 2" class="text-[8px] font-black text-slate-400 ml-1">
                +{{ data.fsmCompatibilities.length - 2 }} lainnya
              </span>
              <span v-if="!data.fsmCompatibilities?.length" class="text-[9px] italic text-slate-300 font-bold">Universal</span>
            </div>
          </template>
        </column>

        <column header="AKSI" :exportable="false" class="w-[100px] text-right">
          <template #body="{ data }">
            <div class="flex items-center justify-end gap-2">
              <Button icon="pi pi-pencil" severity="secondary" rounded outlined size="small" @click="editPart(data)" class="!w-8 !h-8" />
              <Button icon="pi pi-trash" severity="danger" rounded outlined size="small" @click="deletePart(data)" class="!w-8 !h-8" />
            </div>
          </template>
        </column>
      </DataTable>
    </div>

    <!-- Part Edit Dialog -->
    <Dialog v-model:visible="displayDialog" :header="part.id ? 'Edit Spare Part' : 'Tambah Part Baru'" :modal="true" class="p-fluid !rounded-xl !border-none !shadow-2xl overflow-hidden" :style="{ width: '800px' }">
      <template #header>
        <div class="flex items-center gap-3 py-2 px-4 bg-indigo-600 w-full absolute top-0 left-0">
          <i class="pi pi-cog text-white text-xl animate-spin-slow"></i>
          <span class="text-lg font-black text-white uppercase tracking-tighter">{{ part.id ? 'Update' : 'Register' }} Part</span>
        </div>
      </template>

      <div class="mt-12">
        <TabView class="p-modern-tabs">
          <TabPanel header="INFORMASI UMUM">
            <div class="grid grid-cols-2 gap-6 p-4">
              <div class="field">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Kode Part <span class="text-red-500">*</span></label>
                <InputText v-model="part.code" class="!rounded-xl !bg-slate-50 !border-slate-200 !p-3" :class="{'p-invalid': submitted && !part.code}" />
              </div>
              <div class="field">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Nama Part <span class="text-red-500">*</span></label>
                <InputText v-model="part.name" class="!rounded-xl !bg-slate-50 !border-slate-200 !p-3" :class="{'p-invalid': submitted && !part.name}" />
              </div>
              <div class="field col-span-2">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Deskripsi Detail</label>
                <Textarea v-model="part.description" rows="3" class="!rounded-xl !bg-slate-50 !border-slate-200 !p-3" />
              </div>
              <div class="field">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">OEM Part Number</label>
                <InputText v-model="part.oemPartNumber" class="!rounded-xl !bg-slate-50 !border-slate-200 !p-3" />
              </div>
              <div class="field">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Merk / Brand</label>
                <InputText v-model="part.brand" class="!rounded-xl !bg-slate-50 !border-slate-200 !p-3" />
              </div>
              <div class="field">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Manufaktur</label>
                <InputText v-model="part.manufacturer" class="!rounded-xl !bg-slate-50 !border-slate-200 !p-3" />
              </div>
            </div>
          </TabPanel>

          <TabPanel header="STOK & INVENTORY">
            <div class="grid grid-cols-3 gap-6 p-4">
              <div class="field">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Base UOM</label>
                <InputText v-model="part.baseUomCode" class="!rounded-xl !bg-slate-50 !border-slate-200 !p-3" />
              </div>
              <div class="field">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Reorder Point</label>
                <InputNumber v-model="part.reorderPoint" class="!rounded-xl" inputClass="!bg-slate-50 !border-slate-200 !p-3" />
              </div>
              <div class="field">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Reorder Quantity</label>
                <InputNumber v-model="part.reorderQty" class="!rounded-xl" inputClass="!bg-slate-50 !border-slate-200 !p-3" />
              </div>
            </div>
          </TabPanel>

          <TabPanel header="KOMPATIBILITAS">
            <div class="p-4">
              <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Pilih Alat / Mesin Kompatibel</label>
              <MultiSelect 
                v-model="part.compatibleEquipmentIds" 
                :options="equipmentOptions" 
                optionLabel="label" 
                optionValue="value" 
                placeholder="Pilih Mesin..." 
                class="w-full !rounded-xl !bg-slate-50 !border-slate-200" 
                display="chip"
              />
              <p class="text-[10px] font-bold text-slate-400 italic mt-4">Pilih alat-alat yang dapat menggunakan part ini untuk membantu teknisi dalam pemesanan.</p>
            </div>
          </TabPanel>
        </TabView>
      </div>

      <template #footer>
        <div class="flex justify-end gap-3 p-4">
          <Button label="Batal" icon="pi pi-times" @click="displayDialog = false" class="p-button-text !text-slate-500 !font-black uppercase tracking-widest !text-[11px]" />
          <Button label="Simpan Data" icon="pi pi-check" @click="savePart" :loading="loading" class="!bg-indigo-600 !border-none !rounded-xl !px-8 !py-3 !text-xs !font-black uppercase tracking-wider !shadow-lg !shadow-indigo-100" />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<style>
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}

.p-datatable-modern .p-datatable-thead > tr > th {
  background: transparent !important;
  color: #94a3b8 !important;
  font-size: 10px !important;
  font-weight: 900 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.1em !important;
  padding: 1.5rem 1rem !important;
  border-bottom: 2px solid #f1f5f9 !important;
}

.p-datatable-modern .p-datatable-tbody > tr {
  background: white !important;
  transition: all 0.2s;
}

.p-datatable-modern .p-datatable-tbody > tr:hover {
  background: #f8fafc !important;
}

.p-datatable-modern .p-datatable-tbody > tr > td {
  padding: 1rem !important;
  border-bottom: 1px solid #f8fafc !important;
}

.p-modern-tabs .p-tabview-nav {
  background: transparent !important;
  border-bottom: 2px solid #f1f5f9 !important;
}

.p-modern-tabs .p-tabview-nav li .p-tabview-nav-link {
  background: transparent !important;
  border: none !important;
  color: #94a3b8 !important;
  font-size: 10px !important;
  font-weight: 900 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.1em !important;
  padding: 1rem 1.5rem !important;
  transition: all 0.3s !important;
}

.p-modern-tabs .p-tabview-nav li.p-highlight .p-tabview-nav-link {
  color: #4f46e5 !important;
  box-shadow: inset 0 -2px 0 0 #4f46e5 !important;
}
</style>
