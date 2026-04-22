<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-violet-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-violet-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Settings & Tools</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-violet-600 uppercase tracking-widest">System Configuration</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase italic">System <span class="text-violet-600 not-italic text-3xl">Configuration</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl leading-relaxed mt-3">Konfigurasi parameter sistem, bisnis, dan operasional untuk seluruh tenant ERP.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="Reset Default" size="small" icon="pi pi-refresh" class="p-button-rounded h-12 px-8 bg-slate-100 border-none text-slate-600 font-black text-[10px] uppercase" @click="resetDefaults" />
          <Button label="+ Tambah Parameter" size="small" icon="pi pi-plus" class="p-button-rounded h-12 px-8 bg-violet-600 border-none text-white font-black text-[10px] uppercase shadow-xl hover:scale-105 transition-all" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      <div class="p-4 rounded-2xl bg-violet-950 text-white shadow-xl flex flex-col justify-between border border-violet-900 group hover:bg-black transition-all">
        <div class="text-[10px] font-black uppercase text-violet-400 tracking-[0.2em] mb-4">Total Konfigurasi</div>
        <div class="flex items-end justify-between"><h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ configs.length }}</h3><div class="p-3 bg-white/5 rounded-xl group-hover:rotate-12 transition-transform"><i class="pi pi-sliders-h text-lg"></i></div></div>
      </div>
      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-4">Aktif</div>
        <div class="flex items-end justify-between"><h3 class="text-5xl font-black text-emerald-700 tracking-tighter leading-none">{{ configs.filter(c => c.status === 'ACTIVE').length }}</h3><div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100"><i class="pi pi-check-circle text-lg"></i></div></div>
      </div>
      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-amber-600 tracking-[0.2em] mb-4">Pending Review</div>
        <div class="flex items-end justify-between"><h3 class="text-5xl font-black text-amber-700 tracking-tighter leading-none">{{ configs.filter(c => c.status === 'PENDING').length }}</h3><div class="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100"><i class="pi pi-clock text-lg"></i></div></div>
      </div>
      <div class="p-4 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
        <div class="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
        <div class="text-[10px] font-black uppercase text-violet-100 tracking-[0.2em] mb-4">Grup Aktif</div>
        <div class="flex items-end justify-between"><h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ groups.length }}</h3><div class="p-3 bg-white/10 rounded-xl border border-white/10 group-hover:rotate-12 transition-transform"><i class="pi pi-folder text-lg"></i></div></div>
      </div>
    </div>

    <!-- Table -->
    <div class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden mt-6 pb-20">
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-violet-200/20 rounded-full blur-3xl"></div>
        <div class="relative flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-violet-600 flex items-center justify-center text-white shadow-xl hover:rotate-6 transition-transform"><i class="pi pi-cog text-xl"></i></div>
          <div><h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">System Parameter Registry</h3><p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Konfigurasi Parameter Sistem</p></div>
        </div>
        <div class="relative flex items-center gap-3">
          <select v-model="activeGroup" class="border border-slate-200 rounded-2xl px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-violet-400">
            <option value="">Semua Grup</option>
            <option v-for="g in groups" :key="g" :value="g">{{ g }}</option>
          </select>
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <input v-model="search" placeholder="Cari parameter..." class="border-none bg-transparent text-[11px] h-9 w-44 font-black focus:outline-none" />
          </div>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-white text-left border-b border-slate-50">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Parameter Key</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Grup</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Nilai</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center">Status</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right border-l border-slate-50">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-for="cfg in filteredConfigs" :key="cfg.key" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent hover:border-l-violet-400">
              <td class="px-8 py-5 align-middle">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-500 group-hover:scale-110 transition-transform"><i class="pi pi-database text-sm"></i></div>
                  <div>
                    <div class="font-mono text-[11px] font-black text-slate-700 uppercase">{{ cfg.key }}</div>
                    <div class="text-[9px] font-bold text-slate-400 mt-0.5">{{ cfg.description }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-5 border-l border-slate-50"><span class="text-[9px] font-black bg-violet-100 text-violet-700 px-2 py-0.5 rounded uppercase border border-violet-200">{{ cfg.group }}</span></td>
              <td class="px-6 py-5 border-l border-slate-50"><span class="font-mono text-[11px] font-black text-slate-900">{{ cfg.value }}</span></td>
              <td class="px-6 py-5 border-l border-slate-50 text-center">
                <span :class="['inline-flex rounded-full px-4 py-1.5 text-[9px] font-black tracking-[0.2em] uppercase border', cfg.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200']">{{ cfg.status }}</span>
              </td>
              <td class="px-8 py-5 border-l border-slate-50 text-right">
                <div class="flex gap-2 items-center justify-end opacity-0 group-hover:opacity-100 transition-all">
                  <Button icon="pi pi-eye" severity="secondary" rounded outlined size="small" class="w-8 h-8 border-slate-200 text-slate-600" @click="openView(cfg)" v-tooltip.top="'Lihat Detail'" />
                  <Button icon="pi pi-pencil" severity="secondary" rounded outlined size="small" class="w-8 h-8 border-violet-200 text-violet-600 hover:bg-violet-600 hover:text-white" @click="openEdit(cfg)" v-tooltip.top="'Edit'" />
                  <Button icon="pi pi-trash" severity="danger" rounded outlined size="small" class="w-8 h-8" @click="confirmDelete(cfg)" v-tooltip.top="'Hapus'" />
                </div>
              </td>
            </tr>
            <tr v-if="filteredConfigs.length === 0"><td colspan="5" class="py-24 text-center"><div class="text-6xl mb-4 opacity-10">⚙️</div><div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Tidak ada parameter ditemukan.</div></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- VIEW DIALOG -->
    <div v-if="viewDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md" @click.self="viewDialog = false">
      <div class="w-[calc(100%-2rem)] max-w-xl bg-white shadow-2xl rounded-[2.5rem] border-4 border-white border-b-[10px] border-b-violet-900 overflow-hidden animate-scale-in">
        <div class="p-8 border-b border-slate-100 bg-white flex items-center justify-between relative overflow-hidden">
          <div class="absolute top-0 right-0 w-40 h-40 bg-violet-50 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-14 h-14 rounded-[1.5rem] bg-violet-600 text-white flex items-center justify-center shadow-xl"><i class="pi pi-database text-2xl"></i></div>
            <div>
              <h3 class="text-xl font-black text-slate-900 uppercase tracking-tight">Detail Parameter</h3>
              <p class="text-[10px] font-black text-violet-600 uppercase tracking-widest mt-1">{{ selected?.key }}</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="viewDialog = false" class="relative z-10 h-10 w-10" />
        </div>
        <div class="p-8 space-y-5">
          <div v-for="field in viewFields" :key="field.label" class="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div class="w-8 h-8 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center flex-shrink-0 text-xs"><i :class="field.icon"></i></div>
            <div>
              <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">{{ field.label }}</p>
              <p class="text-[12px] font-black text-slate-900 mt-0.5">{{ field.value }}</p>
            </div>
          </div>
        </div>
        <div class="p-4 border-t border-slate-100 flex justify-end gap-3">
          <Button label="Edit Parameter" icon="pi pi-pencil" class="h-11 px-8 bg-violet-600 border-none text-white font-black text-[10px] uppercase rounded-xl" @click="viewDialog = false; openEdit(selected)" />
          <Button label="Tutup" severity="secondary" outlined rounded @click="viewDialog = false" class="h-11 px-8 font-black text-[10px] uppercase" />
        </div>
      </div>
    </div>

    <!-- CREATE / EDIT DIALOG -->
    <div v-if="formDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md" @click.self="formDialog = false">
      <div class="w-[calc(100%-2rem)] max-w-lg bg-white shadow-2xl rounded-[2.5rem] border-4 border-white border-b-[10px] border-b-violet-900 overflow-hidden animate-scale-in">
        <div class="p-8 border-b border-slate-100 bg-white flex items-center justify-between relative overflow-hidden">
          <div class="absolute top-0 right-0 w-40 h-40 bg-violet-50 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-14 h-14 rounded-[1.5rem] bg-violet-600 text-white flex items-center justify-center shadow-xl rotate-3 transition-transform hover:rotate-0"><i class="pi pi-sliders-h text-2xl"></i></div>
            <div>
              <h3 class="text-xl font-black text-slate-900 uppercase tracking-tight">{{ isEdit ? 'Edit' : 'Tambah' }} Parameter</h3>
              <p class="text-[10px] font-black text-violet-600 uppercase tracking-widest mt-1">System Configuration</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="formDialog = false" class="relative z-10 h-10 w-10" />
        </div>
        <div class="p-8 space-y-5 bg-slate-50/30">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Parameter Key</label>
              <input v-model="form.key" :disabled="isEdit" class="w-full h-12 border border-slate-200 rounded-2xl px-4 text-[11px] font-black text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-violet-400 disabled:bg-slate-100 font-mono uppercase" placeholder="PARAM_KEY" />
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Grup</label>
              <select v-model="form.group" class="w-full h-12 border border-slate-200 rounded-2xl px-4 text-[11px] font-black text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-violet-400 appearance-none">
                <option v-for="g in ['GENERAL','TAX','FINANCE','PROCUREMENT','PROJECT','SECURITY','NOTIFICATION','INVENTORY']" :key="g" :value="g">{{ g }}</option>
              </select>
            </div>
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Nilai</label>
            <input v-model="form.value" class="w-full h-12 border border-slate-200 rounded-2xl px-4 text-[12px] font-black text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-violet-400 font-mono" placeholder="Nilai parameter..." />
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Deskripsi</label>
            <textarea v-model="form.description" rows="2" class="w-full border border-slate-200 rounded-2xl px-4 py-3 text-[11px] font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-violet-400" placeholder="Penjelasan parameter..."></textarea>
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</label>
            <div class="flex gap-3">
              <button v-for="s in ['ACTIVE','PENDING']" :key="s" @click="form.status = s" :class="['px-5 py-2.5 rounded-xl text-[10px] font-black uppercase border transition-all', form.status === s ? 'bg-violet-600 text-white border-violet-600 shadow-lg shadow-violet-200' : 'bg-white text-slate-500 border-slate-200 hover:border-violet-300']">{{ s }}</button>
            </div>
          </div>
        </div>
        <div class="p-4 border-t border-slate-100 flex justify-end gap-3">
          <Button :label="isEdit ? 'Simpan Perubahan' : 'Tambah Parameter'" icon="pi pi-save" class="h-11 px-8 bg-violet-600 border-none text-white font-black text-[10px] uppercase rounded-xl" @click="saveForm" />
          <Button label="Batal" severity="secondary" outlined rounded @click="formDialog = false" class="h-11 px-8 font-black text-[10px] uppercase" />
        </div>
      </div>
    </div>

    <!-- DELETE CONFIRM -->
    <div v-if="deleteDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md" @click.self="deleteDialog = false">
      <div class="w-[calc(100%-2rem)] max-w-sm bg-white shadow-2xl rounded-[2.5rem] border-4 border-white border-b-[10px] border-b-rose-900 overflow-hidden animate-scale-in p-8 text-center">
        <div class="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4 text-3xl"><i class="pi pi-exclamation-triangle"></i></div>
        <h3 class="text-lg font-black text-slate-900 uppercase">Hapus Parameter?</h3>
        <p class="text-[11px] text-slate-500 mt-2">Parameter <strong>{{ selected?.key }}</strong> akan dihapus permanen.</p>
        <div class="flex gap-3 justify-center mt-6">
          <Button label="Ya, Hapus" icon="pi pi-trash" class="h-11 px-8 bg-rose-600 border-none text-white font-black text-[10px] uppercase rounded-xl" @click="doDelete" />
          <Button label="Batal" severity="secondary" outlined rounded @click="deleteDialog = false" class="h-11 px-8 font-black text-[10px] uppercase" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
const api = useApi();
const toast = useToast();

const search = ref('');
const activeGroup = ref('');
const loading = ref(false);
const saving = ref(false);
const viewDialog = ref(false);
const formDialog  = ref(false);
const deleteDialog = ref(false);
const isEdit = ref(false);
const selected = ref<any>(null);
const form = reactive({ key: '', group: 'GENERAL', value: '', description: '', status: 'ACTIVE' });

const configs = ref<any[]>([]);
const companyProfile = ref<any>(null);

const groups = computed(() => [...new Set(configs.value.map(c => c.group))]);
const filteredConfigs = computed(() => configs.value.filter(c => {
  const gMatch = !activeGroup.value || c.group === activeGroup.value;
  const sMatch = !search.value || c.key.toLowerCase().includes(search.value.toLowerCase()) || c.description.toLowerCase().includes(search.value.toLowerCase());
  return gMatch && sMatch;
}));

const viewFields = computed(() => selected.value ? [
  { label: 'Parameter Key', value: selected.value.key, icon: 'pi pi-key' },
  { label: 'Grup', value: selected.value.group, icon: 'pi pi-folder' },
  { label: 'Nilai', value: selected.value.value, icon: 'pi pi-database' },
  { label: 'Deskripsi', value: selected.value.description, icon: 'pi pi-info-circle' },
  { label: 'Status', value: selected.value.status, icon: 'pi pi-check-circle' },
] : []);

async function loadData() {
  loading.value = true;
  try {
    const [configRes, profileRes] = await Promise.all([
      api.get('/core/system-configs'),
      api.get('/core/company-profile')
    ]);
    configs.value = configRes.configs || configRes.data?.configs || [];
    companyProfile.value = profileRes.companyProfile || profileRes.data?.companyProfile || profileRes.data;
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal Memuat', detail: e.message });
  } finally {
    loading.value = false;
  }
}

function openView(cfg: any) { selected.value = cfg; viewDialog.value = true; }
function openCreate() { isEdit.value = false; Object.assign(form, { key: '', group: 'GENERAL', value: '', description: '', status: 'ACTIVE' }); formDialog.value = true; }
function openEdit(cfg: any) { selected.value = cfg; isEdit.value = true; Object.assign(form, { ...cfg }); formDialog.value = true; }
function confirmDelete(cfg: any) { selected.value = cfg; deleteDialog.value = true; }

async function saveForm() {
  if (!form.key || !form.value) { toast.add({ severity: 'warn', summary: 'Validasi', detail: 'Key dan Nilai wajib diisi.', life: 3000 }); return; }
  
  saving.value = true;
  try {
    // 1. Save System Config
    await api.put('/core/system-configs', form);
    
    // 2. Special handling for COMPANY_NAME to sync with CompanyProfile
    if (form.key === 'COMPANY_NAME' && companyProfile.value) {
      await api.put('/core/company-profile', {
        ...companyProfile.value,
        legalName: form.value
      });
    }

    toast.add({ severity: 'success', summary: 'Berhasil', detail: `Parameter ${form.key} disimpan ke database.`, life: 3000 });
    formDialog.value = false;
    loadData();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal Menyimpan', detail: e.message, life: 3000 });
  } finally {
    saving.value = false;
  }
}

async function doDelete() {
  if (!selected.value) return;
  try {
    await api.delete(`/core/system-configs/${selected.value.key}`);
    toast.add({ severity: 'warn', summary: 'Dihapus', detail: `Parameter ${selected.value.key} dihapus.`, life: 3000 });
    deleteDialog.value = false;
    loadData();
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Gagal Menghapus', detail: e.message });
  }
}

function resetDefaults() { 
  toast.add({ severity: 'info', summary: 'Reset', detail: 'Konfigurasi dikembalikan ke nilai default.', life: 3000 }); 
}

onMounted(loadData);
</script>
<style scoped>
.animate-scale-in { animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
</style>
