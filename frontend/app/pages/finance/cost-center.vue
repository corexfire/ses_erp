<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-6 shadow-sm border-l-4 border-l-cyan-600 relative overflow-hidden">
      <div class="absolute right-[-20px] top-[-20px] opacity-10 pointer-events-none">
        <i class="pi pi-building text-[150px] text-cyan-900"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-building text-cyan-700"></i> Pusat Biaya (Cost Center)
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
            Master dimensi alokasi pengeluaran per departemen, lini produksi, cabang, dan fungsi F&B.
          </div>
        </div>
        <div class="flex items-center gap-2">
          <div class="text-xs font-bold bg-cyan-100 text-cyan-700 px-3 py-1.5 rounded-full">{{ costCenters.length }} Total</div>
          <Button label="+ Tambah CC" size="small" bg="bg-cyan-700" class="text-white font-bold border-none shadow-sm hover:bg-cyan-800" icon="pi pi-plus" @click="openDialog()" />
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div v-for="g in groups" :key="g.label"
        class="cursor-pointer bg-white border rounded-xl p-4 shadow-sm transition hover:shadow-md"
        :class="activeGroup === g.label ? 'border-cyan-400 ring-1 ring-cyan-200 bg-cyan-50/30' : ''"
        @click="activeGroup = activeGroup === g.label ? '' : g.label"
      >
        <div class="text-2xl font-black text-cyan-700">{{ g.count }}</div>
        <div class="text-xs font-bold text-slate-600 mt-0.5">{{ g.label }}</div>
        <div class="text-[9px] font-bold text-slate-400 tracking-widest uppercase mt-0.5">Cost Center</div>
      </div>
    </div>

    <!-- Filter bar -->
    <div class="bg-white border rounded-xl p-4 shadow-sm flex flex-wrap gap-3 items-center">
      <InputText v-model="search" placeholder="Cari kode / nama..." class="w-56 text-sm" />
      <select v-model="activeGroup" class="border rounded-lg px-3 py-2 text-sm font-semibold h-10 outline-none focus:border-cyan-400">
        <option value="">Semua Kelompok</option>
        <option v-for="g in groups" :key="g.label" :value="g.label">{{ g.label }}</option>
      </select>
      <Button severity="secondary" size="small" :disabled="loading" icon="pi pi-refresh" @click="load" outlined class="h-10 w-10 shrink-0" />
    </div>

    <!-- Table -->
    <div class="rounded-xl border bg-white shadow-sm overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-cyan-900 text-left text-[11px] text-white uppercase tracking-widest font-bold">
          <tr>
            <th class="px-4 py-3 w-36">Kode CC</th>
            <th class="px-4 py-3">Nama Pusat Biaya</th>
            <th class="px-3 py-3 border-l text-center w-32">Status</th>
            <th class="px-3 py-3 border-l text-center w-36">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="4" class="px-4 py-16 text-center text-slate-500">
              <i class="pi pi-spinner pi-spin mr-2 text-cyan-600"></i> Memuat data Cost Center...
            </td>
          </tr>
          <tr v-for="cc in filteredCostCenters" v-else :key="cc.id"
            class="border-t transition hover:bg-cyan-50/20"
            :class="!cc.isActive ? 'opacity-50' : ''"
          >
            <td class="px-4 py-3 align-middle">
              <span class="font-mono font-black text-xs text-cyan-700 bg-cyan-50 border border-cyan-100 px-2 py-0.5 rounded">{{ cc.code }}</span>
            </td>
            <td class="px-4 py-3 align-middle font-semibold text-slate-800">
              {{ cc.name }}
              <div class="text-[10px] text-slate-400 font-bold mt-0.5 uppercase tracking-widest">{{ detectGroup(cc.code) }}</div>
            </td>
            <td class="px-3 py-3 text-center border-l align-middle">
              <span :class="cc.isActive ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'"
                class="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border">
                {{ cc.isActive ? 'Aktif' : 'Nonaktif' }}
              </span>
            </td>
            <td class="px-3 py-3 text-center border-l align-middle">
              <div class="flex justify-center gap-1">
                <Button label="Edit" size="small" outlined class="text-[9px] h-7 px-2 font-bold text-slate-600 border-slate-300 hover:bg-slate-50" @click="openDialog(cc)" />
                <Button v-if="cc.isActive" label="Nonaktif" size="small" outlined class="text-[9px] h-7 px-2 font-bold text-rose-600 border-rose-200 hover:bg-rose-600 hover:text-white" @click="toggle(cc)" />
                <Button v-else label="Aktifkan" size="small" outlined class="text-[9px] h-7 px-2 font-bold text-emerald-600 border-emerald-200 hover:bg-emerald-600 hover:text-white" @click="toggle(cc)" />
              </div>
            </td>
          </tr>
          <tr v-if="!loading && filteredCostCenters.length === 0">
            <td colspan="4" class="px-4 py-16 text-center text-slate-400 italic">Tidak ada Cost Center ditemukan.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Dialog -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div class="w-full max-w-md rounded-2xl border bg-white shadow-2xl flex flex-col animate-fade-in-up">
        <div class="p-5 border-b bg-slate-50 flex justify-between items-center rounded-t-2xl">
          <div class="text-lg font-black text-slate-800">{{ editId ? 'Edit' : 'Tambah' }} Cost Center</div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-100 w-8 h-8 rounded-full font-bold" @click="dialogOpen = false">✕</button>
        </div>
        <div class="p-6 space-y-4">
          <div class="space-y-1">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Kode Cost Center <span class="text-red-500">*</span></label>
            <input v-model="form.code" :disabled="!!editId" class="w-full border rounded-lg px-3 py-2 text-sm font-black font-mono text-slate-800 outline-none focus:border-cyan-500 shadow-inner disabled:bg-slate-50 disabled:opacity-70" placeholder="CC-PROD-01" />
            <div class="text-[9px] text-slate-400">Format: CC-[GRUP]-[NO]. Contoh: CC-PROD-01, CC-SALES-02</div>
          </div>
          <div class="space-y-1">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Nama Departemen/Lini <span class="text-red-500">*</span></label>
            <input v-model="form.name" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-cyan-500 shadow-inner" placeholder="Lini Produksi Bakery..." />
          </div>
          <div v-if="formError" class="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 border border-red-200">{{ formError }}</div>
        </div>
        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
          <Button label="Batal" severity="secondary" @click="dialogOpen = false" class="bg-white border text-slate-700 font-bold px-5 shadow-sm" />
          <Button :label="editId ? 'Simpan Perubahan' : 'Tambah CC'" :loading="saving" :disabled="!form.code || !form.name" @click="submit" class="bg-cyan-700 border-none text-white font-bold px-6 shadow-sm" icon="pi pi-check" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const costCenters = ref<any[]>([]);
const loading = ref(false);
const saving = ref(false);
const dialogOpen = ref(false);
const editId = ref('');
const search = ref('');
const activeGroup = ref('');
const formError = ref('');
const form = reactive({ code: '', name: '' });

const GROUP_MAP: Record<string, string> = {
  'CC-PROD': 'PRODUKSI', 'CC-WHS': 'GUDANG', 'CC-SALES': 'PENJUALAN',
  'CC-ADM': 'ADMINISTRASI', 'CC-RND': 'R&D', 'CC-MKT': 'MARKETING',
};

const detectGroup = (code: string) => {
  for (const prefix of Object.keys(GROUP_MAP)) {
    if (code.startsWith(prefix)) return GROUP_MAP[prefix];
  }
  return 'LAINNYA';
};

const groups = computed(() => {
  const map = new Map<string, number>();
  for (const cc of costCenters.value) {
    const g = detectGroup(cc.code);
    map.set(g, (map.get(g) || 0) + 1);
  }
  return Array.from(map.entries()).map(([label, count]) => ({ label, count }));
});

const filteredCostCenters = computed(() => {
  let list = costCenters.value;
  if (activeGroup.value) list = list.filter(cc => detectGroup(cc.code) === activeGroup.value);
  if (search.value.trim()) {
    const q = search.value.toLowerCase();
    list = list.filter(cc => cc.code.toLowerCase().includes(q) || cc.name.toLowerCase().includes(q));
  }
  return list;
});

const load = async () => {
  loading.value = true;
  try {
    const res = await api.get('/finance/cost-centers');
    costCenters.value = res.data?.costCenters ?? res.costCenters ?? [];
  } catch (e) { console.warn(e); }
  finally { loading.value = false; }
};

const openDialog = (cc?: any) => {
  editId.value = cc?.id ?? '';
  form.code = cc?.code ?? '';
  form.name = cc?.name ?? '';
  formError.value = '';
  dialogOpen.value = true;
};

const submit = async () => {
  if (!form.code || !form.name) return;
  saving.value = true;
  formError.value = '';
  try {
    if (editId.value) {
      await api.patch(`/finance/cost-centers/${editId.value}`, { name: form.name });
    } else {
      await api.post('/finance/cost-centers', { code: form.code, name: form.name });
    }
    dialogOpen.value = false;
    await load();
  } catch (e: any) {
    formError.value = e?.response?.data?.message ?? e?.message ?? 'Gagal menyimpan';
  } finally { saving.value = false; }
};

const toggle = async (cc: any) => {
  try {
    await api.patch(`/finance/cost-centers/${cc.id}`, { isActive: !cc.isActive });
    await load();
  } catch (e) { console.warn(e); }
};

onMounted(load);
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
</style>