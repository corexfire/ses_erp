<template>
  <div class="p-6 space-y-8 bg-slate-50/50 min-h-screen font-sans">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-8 rounded-xl bg-white border border-slate-200 shadow-sm">
      <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-100/30 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
            <span class="px-3 py-1 bg-indigo-950 text-white text-[9px] font-black uppercase tracking-widest rounded-full">Manajemen Proyek</span>
            <span class="text-indigo-200">/</span>
            <span class="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Master Data Kategori</span>
        </div>
        <h1 class="text-5xl font-black text-slate-900 tracking-tighter mb-2">Klasifikasi <span class="text-indigo-600">Tugas</span></h1>
        <p class="text-slate-400 text-sm font-semibold max-w-xl leading-relaxed">Pengelompokan strategis untuk monitoring dan pelaporan performa WBS secara sistematis.</p>
        
        <div class="mt-4 flex items-center gap-4">
           <button class="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-800 transition-colors flex items-center gap-2">
              <i class="pi pi-th-large"></i>
              Lihat View Lain
           </button>
        </div>
      </div>

      <div class="flex items-center gap-3 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="fetchCategories" :loading="loading" class="border-indigo-100 text-indigo-400" />
        <Button label="Registrasi Kategori" icon="pi pi-plus" class="p-button-rounded bg-indigo-600 border-none font-black text-xs shadow-xl shadow-indigo-100 px-8 py-3" @click="openNew" />
      </div>
    </div>

    <!-- Stats Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
       <div v-for="s in stats" :key="s.label" class="group p-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <i :class="[s.icon, 'text-6xl']"></i>
          </div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ s.label }}</p>
          <h3 class="text-2xl font-black text-slate-900">{{ s.value }}</h3>
          <div class="flex items-center gap-2 mt-2">
             <span :class="['text-[10px] font-extrabold px-3 py-1 rounded-full', s.badgeClass]">{{ s.sub }}</span>
          </div>
       </div>
    </div>

    <!-- Main List Area -->
    <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col">
       <div class="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/10">
          <div>
             <h2 class="text-[13px] font-black text-slate-900 uppercase tracking-widest">Daftar Kategori</h2>
             <p class="text-xs text-slate-500 font-medium">Master data label dan identitas visual pekerjaan.</p>
          </div>
          <div class="flex items-center gap-3">
             <span class="p-input-icon-left">
                <i class="pi pi-search text-slate-400" />
                <InputText placeholder="Cari Kode atau Nama..." class="p-inputtext-sm rounded-full border-slate-200 bg-slate-50/50 w-64 text-xs font-bold" />
             </span>
          </div>
       </div>

       <DataTable :value="categories" dataKey="id" class="p-datatable-sm w-full" :loading="loading">
          <Column field="code" header="KODE & VISUAL" class="pl-8">
             <template #body="{ data }">
                <div class="flex items-center gap-4">
                   <div class="w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner" :style="{ backgroundColor: data.color + '15', color: data.color }">
                      <i :class="[data.icon || 'pi pi-tag', 'text-xl']"></i>
                   </div>
                   <div class="flex flex-col">
                      <span class="text-[11px] font-black text-slate-800">{{ data.code }}</span>
                      <span class="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Identity Tag</span>
                   </div>
                </div>
             </template>
          </Column>
          
          <Column field="name" header="NAMA KATEGORI">
             <template #body="{ data }">
                <span class="text-[11px] font-bold text-slate-700">{{ data.name }}</span>
             </template>
          </Column>

          <Column header="UTILITAS TASK">
             <template #body="{ data }">
                <div class="flex items-center gap-2">
                   <div class="flex-grow h-1.5 bg-slate-100 rounded-full overflow-hidden max-w-[80px]">
                      <div class="h-full rounded-full" :style="{ width: Math.min((data._count?.tasks || 0) * 10, 100) + '%', backgroundColor: data.color }"></div>
                   </div>
                   <span class="text-[10px] font-black text-slate-400">{{ data._count?.tasks || 0 }} Proyek</span>
                </div>
             </template>
          </Column>

          <Column header="DESKRIPSI">
             <template #body="{ data }">
                <span class="text-[10px] text-slate-500 font-medium italic">{{ data.description || 'Tidak ada deskripsi' }}</span>
             </template>
          </Column>

          <Column class="text-right pr-8">
             <template #body="{ data }">
                <div class="flex gap-1 justify-end">
                   <Button icon="pi pi-pencil" severity="secondary" rounded text @click="editCategory(data)" />
                   <Button icon="pi pi-trash" severity="danger" rounded text @click="confirmDelete($event, data)" />
                </div>
             </template>
          </Column>
       </DataTable>
    </div>

    <!-- Form Drawer -->
    <Drawer v-model:visible="drawerVisible" :header="form.id ? 'Edit Kategori' : 'Kategori Baru'" position="right" class="w-full md:w-[500px]">
      <div class="space-y-8 pt-4 px-4 overflow-y-auto pb-24 h-full">
        <!-- Section: Identity -->
        <div class="space-y-4">
           <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-[10px] font-black">1</div>
              <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Identitas Kategori</h4>
           </div>
           <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1">
                 <label class="text-[10px] font-black text-slate-400 uppercase">Kode Unik</label>
                 <InputText v-model="form.code" class="w-full rounded-xl p-inputtext-sm font-bold" placeholder="ENG" />
              </div>
              <div class="space-y-1">
                 <label class="text-[10px] font-black text-slate-400 uppercase">Nama Label</label>
                 <InputText v-model="form.name" class="w-full rounded-xl p-inputtext-sm font-bold" placeholder="Engineering" />
              </div>
           </div>
           <div class="space-y-1">
              <label class="text-[10px] font-black text-slate-400 uppercase">Penjelasan</label>
              <Textarea v-model="form.description" rows="3" class="w-full rounded-xl text-sm" placeholder="Detail klasifikasi..." />
           </div>
        </div>

        <!-- Section: Visuals -->
        <div class="space-y-4 p-6 rounded-xl bg-slate-50 border border-slate-100">
           <div class="flex items-center gap-3 mb-4">
              <div class="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-[10px] font-black">2</div>
              <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Identitas Visual</h4>
           </div>
           
           <div class="flex flex-col items-center gap-4 mb-6">
              <div class="w-20 h-20 rounded-[1.5rem] shadow-xl flex items-center justify-center text-3xl text-white transition-all duration-500" :style="{ backgroundColor: form.color }">
                 <i :class="form.icon"></i>
              </div>
              <span class="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Live Preview Tag</span>
           </div>

           <div class="space-y-4">
             <div>
                <label class="text-[10px] font-black text-slate-400 uppercase block mb-3">Warna Aksen</label>
                <div class="flex flex-wrap gap-2.5 justify-center">
                  <button v-for="c in colors" :key="c" @click="form.color = c"
                    class="w-8 h-8 rounded-full border-2 transition-all duration-300"
                    :class="form.color === c ? 'border-white ring-2 ring-primary-500 scale-125 z-10' : 'border-transparent opacity-60 hover:opacity-100'"
                    :style="{ backgroundColor: c }"></button>
                </div>
             </div>

             <div>
                <label class="text-[10px] font-black text-slate-400 uppercase block mb-3">Pilihan Icon</label>
                <div class="grid grid-cols-6 gap-2">
                  <button v-for="i in icons" :key="i" @click="form.icon = i"
                    class="h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                    :class="form.icon === i ? 'bg-primary-900 text-white shadow-lg' : 'bg-white text-slate-400 hover:bg-slate-100'">
                    <i :class="i"></i>
                  </button>
                </div>
             </div>
           </div>
        </div>

        <div class="fixed bottom-0 left-0 w-full bg-white p-6 border-t flex justify-end gap-3 rounded-t-[2.5rem] shadow-2xl z-20">
           <Button label="Batalkan" severity="secondary" text @click="drawerVisible = false" class="font-black text-[10px] uppercase" />
           <Button label="Simpan Kategori" icon="pi pi-save" class="p-button-rounded font-black text-[10px] uppercase px-8" @click="saveCategory" :loading="submitting" />
        </div>
      </div>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useApi } from '@/composables/useApi';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';

const api = useApi();
const toast = useToast();
const confirm = useConfirm();

// State
const categories = ref([]);
const loading = ref(false);
const drawerVisible = ref(false);
const submitting = ref(false);

const form = ref({
  id: null,
  code: '',
  name: '',
  description: '',
  color: '#3B82F6',
  icon: 'pi pi-tag'
});

const icons = [
  'pi pi-tag', 'pi pi-cog', 'pi pi-file', 'pi pi-calendar', 'pi pi-briefcase',
  'pi pi-shopping-cart', 'pi pi-users', 'pi pi-chart-bar', 'pi pi-shield',
  'pi pi-bolt', 'pi pi-check-circle', 'pi pi-info-circle', 'pi pi-star'
];

const colors = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', 
  '#14B8A6', '#F97316', '#06B6D4', '#71717A', '#0F172A', '#6366F1'
];

// Stats
const stats = computed(() => {
  const total = categories.value.length;
  const withTasks = categories.value.filter(c => c._count?.tasks > 0).length;
  const mostUsed = [...categories.value].sort((a, b) => (b._count?.tasks || 0) - (a._count?.tasks || 0))[0]?.name || '-';
  
  return [
    { label: 'Kategori Terdaftar', value: total, icon: 'pi pi-tags', badgeClass: 'bg-blue-50 text-blue-600', sub: 'Total Keseluruhan' },
    { label: 'Utilisasi Aktif', value: withTasks, icon: 'pi pi-check-circle', badgeClass: 'bg-emerald-50 text-emerald-600', sub: 'Terpakai di Task' },
    { label: 'Prioritas Dominan', value: mostUsed, icon: 'pi pi-star-fill', badgeClass: 'bg-amber-50 text-amber-600', sub: 'Populasi Terbesar' },
  ];
});

// Actions
const fetchCategories = async () => {
  loading.value = true;
  try {
    const res = await api.get('/tasks/categories');
    categories.value = res.data?.data || [];
  } catch (err) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: 'Koneksi API bermasalah', life: 3000 });
  } finally {
    loading.value = false;
  }
};

const openNew = () => {
  form.value = { id: null, code: '', name: '', description: '', color: '#3B82F6', icon: 'pi pi-tag' };
  drawerVisible.value = true;
};

const editCategory = (category) => {
  form.value = { ...category };
  drawerVisible.value = true;
};

const saveCategory = async () => {
  if (!form.value.code || !form.value.name) {
    toast.add({ severity: 'warn', summary: 'Cek Kembali', detail: 'Atribut identitas wajib dilengkapi', life: 3000 });
    return;
  }

  submitting.value = true;
  try {
    if (form.value.id) {
      await api.patch(`/tasks/categories/${form.value.id}`, form.value);
      toast.add({ severity: 'success', summary: 'Sinkronisasi Berhasil', detail: 'Perubahan metadata kategori tersimpan.', life: 3000 });
    } else {
      await api.post('/tasks/categories', form.value);
      toast.add({ severity: 'success', summary: 'Registrasi Berhasil', detail: 'Varian kategori baru telah aktif.', life: 3000 });
    }
    fetchCategories();
    drawerVisible.value = false;
  } catch (err: any) {
    toast.add({ severity: 'error', summary: 'Operasi Gagal', detail: err.response?.data?.message || 'Gagal sinkron data', life: 3000 });
  } finally {
    submitting.value = false;
  }
};

const confirmDelete = (event, category) => {
  confirm.require({
    target: event.currentTarget,
    message: `Pengosongan data kategori "${category.name}" bersifat permanen. Lanjutkan?`,
    header: 'Otorisasi Hapus',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger p-button-sm font-bold',
    acceptLabel: 'Ya, Purge Data',
    rejectLabel: 'Batal',
    accept: async () => {
      try {
        await api.delete(`/tasks/categories/${category.id}`);
        toast.add({ severity: 'success', summary: 'Purge Success', detail: 'Data kategori telah dihapus dari sistem.', life: 3000 });
        fetchCategories();
      } catch (err: any) {
        toast.add({ severity: 'error', summary: 'Purge Failed', detail: err.response?.data?.message || 'Data masih terikat task aktif', life: 3000 });
      }
    }
  });
};

onMounted(fetchCategories);
</script>

<style scoped>
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

:deep(.p-datatable-tbody > tr) {
  background: transparent !important;
  transition: all 0.2s ease;
}

:deep(.p-datatable-tbody > tr:hover) {
  background: rgba(var(--primary-rgb), 0.04) !important;
}

:deep(.p-datatable-tbody > tr > td) {
  padding: 1.25rem 1rem !important;
  border-bottom: 1px solid #f8fafc !important;
}

:deep(.p-drawer-content) {
  padding: 0 !important;
  overflow: hidden !important;
}

:deep(.p-inputtext) {
  @apply bg-slate-50/50 border-slate-200 focus:bg-white transition-all;
}
</style>
