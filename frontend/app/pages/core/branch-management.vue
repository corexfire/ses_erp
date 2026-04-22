<template>
  <div class="p-4 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <DashboardHero
      title="Manajemen"
      title-accent="Cabang"
      subtitle="Registrasi dan monitoring operasional kantor cabang, gudang, maupun titik distribusi nasional."
      category="Core Infrastructure"
      category-sub="Enterprise Branches"
      color="stone"
    >
      <template #actions>
        <div class="flex items-center gap-3">         
          <Button label="Tambah Cabang" icon="pi pi-plus" class="p-button-sm font-black text-xs px-6 bg-white/20 hover:bg-white/30 text-white border-white/20"  @click="openNew" />
        </div>
      </template>
    </DashboardHero>

    <!-- Stats Section -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
       <MiniStatsCard
          v-for="s in stats"
          :key="s.label"
          :label="s.label"
          :value="s.value"
          :icon="s.icon"
          :sub="s.sub"
          :sub-color="s.theme"
          :icon-color="s.theme"
       />
    </div>

    <!-- Main List Area -->
    <PanelCard
      title="Daftar Titik Operasional"
      subtitle="Monitoring status keaktifan dan dataset administratif cabang."
      icon="pi pi-building"
      theme="stone"
      v-model:search="q"
      :loading="loading"
      @refresh="load"
      :show-filter="false"
      search-placeholder="Cari Kode/Nama..."
    >
      <template #table>
         <PanelTable
            :items="branches"
            :columns="branchColumns"
            :loading="loading"
            hover-border-color="border-l-indigo-400"
            loading-text="Mensinkronisasi basis data cabang..."
            empty-text="Belum ada titik operasional yang terdaftar."
            @row-click="edit"
         >
            <template #col-code="{ item }">
               <span class="text-[11px] font-black text-slate-900 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200 font-mono italic">
                  {{ item.code }}
               </span>
            </template>
            <template #col-name="{ item }">
               <div class="flex flex-col">
                  <span class="text-[12px] font-black text-slate-800 uppercase tracking-tight">{{ item.name }}</span>
                  <span class="text-[9px] font-bold text-slate-400 italic">{{ item.email || 'no-email@ses.local' }}</span>
               </div>
            </template>
            <template #col-location="{ item }">
               <div class="flex items-center gap-2">
                  <i class="pi pi-map-marker text-[10px] text-indigo-400"></i>
                  <span class="text-[11px] font-bold text-slate-700 uppercase">{{ item.city }}, {{ item.province }}</span>
               </div>
            </template>
            <template #col-status="{ item }">
               <div class="py-2">
                  <span :class="['px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest', item.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400']">
                     {{ item.isActive ? 'Active' : 'Deactivated' }}
                  </span>
               </div>
            </template>
            <template #col-actions="{ item }">
               <div class="flex gap-2 justify-end" @click.stop>
                  <Button icon="pi pi-pencil" severity="secondary" rounded text @click="edit(item)" />
                  <Button icon="pi pi-trash" severity="danger" rounded text @click="deactivate(item)" v-if="item.isActive" />
               </div>
            </template>
         </PanelTable>
      </template>
    </PanelCard>

    <!-- Management Dialog -->
    <Dialog v-model:visible="drawerOpen" :header="editingId ? 'Edit Detail Cabang' : 'Registrasi Cabang Baru'" :modal="true" :dismissableMask="false" class="w-[700px] border-none shadow-2xl overflow-hidden glass-dialog">
       <div class="space-y-8 pt-4 px-2 pb-12 custom-scrollbar">
          <!-- Step 1: Base Identity -->
          <div class="space-y-4">
             <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-black">1</div>
                <h4 class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Enterprise Identity</h4>
             </div>
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kode Cabang</label>
                   <InputText v-model="form.code" class="w-full rounded-xl font-mono uppercase bg-slate-50" placeholder="BR-XXX" />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Cabang</label>
                   <InputText v-model="form.name" class="w-full rounded-xl" placeholder="Nama Regional / Unit" />
                </div>
             </div>
          </div>

          <!-- Step 2: Contact -->
          <div class="space-y-4">
             <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-black">2</div>
                <h4 class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Communication Channels</h4>
             </div>
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Korespondensi</label>
                   <InputText v-model="form.email" class="w-full rounded-xl" placeholder="branch@ses.id" />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">No. Telepon</label>
                   <InputText v-model="form.phone" class="w-full rounded-xl" placeholder="021-xxxx" />
                </div>
             </div>
          </div>

          <!-- Step 3: Address -->
          <div class="space-y-4 p-8 bg-slate-50 rounded-xl border border-slate-100 shadow-inner">
             <div class="flex items-center gap-3 mb-4">
                <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-black">3</div>
                <h4 class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Physical Location</h4>
             </div>
             <div class="space-y-4">
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Alamat Baris 1</label>
                   <InputText v-model="form.address1" class="w-full rounded-xl" />
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Alamat Baris 2</label>
                   <InputText v-model="form.address2" class="w-full rounded-xl" />
                </div>
                <div class="grid grid-cols-2 gap-4">
                   <div class="space-y-1">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kota</label>
                      <InputText v-model="form.city" class="w-full rounded-xl" />
                   </div>
                   <div class="space-y-1">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Provinsi</label>
                      <InputText v-model="form.province" class="w-full rounded-xl" />
                   </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                   <div class="space-y-1">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kode Pos</label>
                      <InputText v-model="form.postalCode" class="w-full rounded-xl" />
                   </div>
                   <div class="space-y-1">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Negara</label>
                      <InputText v-model="form.countryCode" class="w-full rounded-xl" placeholder="ID" />
                   </div>
                </div>
             </div>
          </div>
       </div>

       <template #footer>
          <div class="flex justify-end gap-4 p-4 border-t bg-white w-full">
             <Button label="Batal" severity="secondary" text @click="drawerOpen = false" class="font-black text-[10px] uppercase tracking-widest px-6" />
             <Button label="Simpan Data Cabang" icon="pi pi-save" class="p-button-rounded p-button-indigo font-black text-[10px] uppercase tracking-widest px-10 shadow-xl shadow-indigo-100" @click="save" :loading="saving" />
          </div>
       </template>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
const api = useApi();
const toast = useToast();

const branches = ref<any[]>([]);
const loading = ref(false);
const saving = ref(false);
const drawerOpen = ref(false);
const editingId = ref('');
const q = ref('');

const form = ref<any>({
  code: '',
  name: '',
  email: '',
  phone: '',
  address1: '',
  address2: '',
  city: '',
  province: '',
  postalCode: '',
  countryCode: 'ID',
  isActive: true
});

const stats = computed(() => [
  { label: 'Total Enterprise Branches', value: branches.value.length, sub: 'Global Units', icon: 'pi pi-building', theme: 'indigo' as const },
  { label: 'Cabang Aktif', value: branches.value.filter(b => b.isActive).length, sub: 'Operational', icon: 'pi pi-check-circle', theme: 'emerald' as const },
  { label: 'Wilayah Tercover', value: new Set(branches.value.map(b => b.province)).size, sub: 'Provinces', icon: 'pi pi-map', theme: 'blue' as const },
  { label: 'Rata-rata Kapasitas', value: 'High', sub: 'Infrastructure', icon: 'pi pi-chart-bar', theme: 'slate' as const }
]);

const branchColumns = [
  { key: 'code', header: 'KODE', width: 'w-40' },
  { key: 'name', header: 'NAMA CABANG' },
  { key: 'location', header: 'LOKASI', borderLeft: true },
  { key: 'status', header: 'STATUS', align: 'center' as const, width: 'w-40', borderLeft: true, hoverBg: 'bg-indigo-400' },
  { key: 'actions', header: 'AKSI', align: 'right' as const, width: 'w-40', borderLeft: true }
];

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/branches', { params: { q: q.value } });
    branches.value = res.data?.branches || res.data || [];
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal Memuat', detail: e.message });
  } finally {
    loading.value = false;
  }
}

function openNew() {
  editingId.value = '';
  resetForm();
  drawerOpen.value = true;
}

function edit(data: any) {
  editingId.value = data.id;
  form.value = { ...data };
  drawerOpen.value = true;
}

async function save() {
  saving.value = true;
  try {
    if (editingId.value) {
      await api.patch(`/core/branches/${editingId.value}`, form.value);
    } else {
      await api.post('/core/branches', form.value);
    }
    toast.add({ severity: 'success', summary: 'Sukses', detail: 'Informasi cabang berhasil diperbarui.' });
    drawerOpen.value = false;
    load();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal Menyimpan', detail: e.message });
  } finally {
    saving.value = false;
  }
}

async function deactivate(data: any) {
  try {
     await api.patch(`/core/branches/${data.id}/deactivate`);
     toast.add({ severity: 'warn', summary: 'Deactivated', detail: 'Cabang telah dinonaktifkan.' });
     load();
  } catch (e) {}
}

function resetForm() {
  form.value = {
    code: '', name: '', email: '', phone: '', address1: '', address2: '',
    city: '', province: '', postalCode: '', countryCode: 'ID', isActive: true
  };
}

onMounted(load);
</script>

<style scoped lang="postcss">
:deep(.p-datatable-thead > tr > th) {
  background: transparent !important;
  font-size: 10px !important;
  font-weight: 900 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.1em !important;
  color: #94a3b8 !important;
  border-bottom: 2px solid #f1f5f9 !important;
  padding: 1.5rem 1rem !important;
}

:deep(.p-datatable-tbody > tr > td) {
  padding: 1.25rem 1rem !important;
  border-bottom: 1px solid #f8fafc !important;
}

:deep(.p-dialog-mask) {
  backdrop-filter: blur(8px);
  background: rgba(15, 23, 42, 0.4) !important;
}

:deep(.p-dialog) {
  border-radius: 2.5rem !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

:deep(.p-dialog-header) {
  padding: 2rem 2.5rem 1rem !important;
}

:deep(.p-dialog-content) {
  padding: 0 2.5rem 2rem !important;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-slate-200 rounded-full;
}
</style>
