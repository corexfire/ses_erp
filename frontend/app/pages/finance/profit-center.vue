<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-4 shadow-sm border-l-4 border-l-emerald-600 relative overflow-hidden">
      <div class="absolute right-[-20px] top-[-20px] opacity-10 pointer-events-none">
        <i class="pi pi-chart-line text-[150px] text-emerald-900"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-chart-line text-emerald-600"></i> Pusat Laba (Profit Center)
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
            Master segmen bisnis penghasil pendapatan F&B — digunakan untuk analisis profitabilitas per produk, wilayah, dan kanal distribusi.
          </div>
        </div>
        <div class="flex items-center gap-2">
          <div class="text-xs font-bold bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full">{{ profitCenters.length }} Segmen</div>
          <Button label="+ Tambah PC" size="small" bg="bg-emerald-600" class="text-white font-bold border-none shadow-sm hover:bg-emerald-700" icon="pi pi-plus" @click="openDialog()" />
        </div>
      </div>
    </div>

    <!-- Revenue Cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-white border rounded-xl p-4 shadow-sm">
        <div class="text-2xl font-black text-emerald-600">{{ profitCenters.filter(p => p.isActive).length }}</div>
        <div class="text-xs font-bold text-slate-600 mt-0.5">Segmen Aktif</div>
      </div>
      <div class="bg-white border rounded-xl p-4 shadow-sm">
        <div class="text-2xl font-black text-slate-400">{{ profitCenters.filter(p => !p.isActive).length }}</div>
        <div class="text-xs font-bold text-slate-500 mt-0.5">Segmen Nonaktif</div>
      </div>
      <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-4 shadow-sm col-span-2">
        <div class="text-xs font-black text-emerald-700 uppercase tracking-widest mb-1">Fungsi Utama Profit Center</div>
        <div class="text-xs text-emerald-800 font-medium">Digunakan di Jurnal, Sales Order, dan Laporan P&L untuk memisahkan kontribusi laba dari setiap segmen produk / kanal distribusi.</div>
      </div>
    </div>

    <!-- Filter bar -->
    <div class="bg-white border rounded-xl p-4 shadow-sm flex flex-wrap gap-3 items-center">
      <InputText v-model="search" placeholder="Cari kode / nama segmen..." class="w-64 text-sm" />
      <Button severity="secondary" size="small" :disabled="loading" icon="pi pi-refresh" @click="load" outlined class="h-10 w-10 shrink-0" />
      <div class="text-xs text-slate-500 ml-auto font-medium">{{ filteredPCs.length }} dari {{ profitCenters.length }} segmen ditampilkan</div>
    </div>

    <!-- Cards Grid -->
    <div v-if="!loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="pc in filteredPCs" :key="pc.id"
        class="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition relative overflow-hidden"
        :class="!pc.isActive ? 'opacity-50' : ''"
      >
        <!-- Color accent -->
        <div class="absolute top-0 left-0 w-1 h-full bg-emerald-500 rounded-l-xl"></div>
        
        <div class="ml-2">
          <div class="font-mono font-black text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded mb-2 inline-block">{{ pc.code }}</div>
          <div class="font-bold text-slate-800 text-sm leading-tight">{{ pc.name }}</div>
          <div class="mt-3 flex items-center gap-1">
            <span :class="pc.isActive ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'"
              class="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border">
              {{ pc.isActive ? 'Aktif' : 'Nonaktif' }}
            </span>
          </div>
        </div>

        <div class="mt-4 flex gap-1">
          <Button label="Edit" size="small" outlined class="text-[9px] h-6 px-2 font-bold text-slate-600 border-slate-300 hover:bg-slate-50 flex-1" @click="openDialog(pc)" />
          <Button v-if="pc.isActive" label="Off" size="small" outlined class="text-[9px] h-6 px-2 font-bold text-rose-600 border-rose-200 hover:bg-rose-600 hover:text-white" @click="toggle(pc)" />
          <Button v-else label="On" size="small" outlined class="text-[9px] h-6 px-2 font-bold text-emerald-600 border-emerald-200 hover:bg-emerald-600 hover:text-white" @click="toggle(pc)" />
        </div>
      </div>

      <div v-if="filteredPCs.length === 0"
        class="col-span-4 text-center py-16 text-slate-400 italic">
        Belum ada Profit Center yang terdaftar.
      </div>
    </div>

    <div v-if="loading" class="text-center py-16 text-slate-500">
      <i class="pi pi-spinner pi-spin mr-2 text-emerald-500"></i> Memuat data Profit Center...
    </div>

    <!-- Dialog -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div class="w-full max-w-md rounded-2xl border bg-white shadow-2xl flex flex-col animate-fade-in-up">
        <div class="p-5 border-b bg-slate-50 flex justify-between items-center rounded-t-2xl">
          <div>
            <div class="text-lg font-black text-slate-800">{{ editId ? 'Edit' : 'Tambah' }} Profit Center</div>
            <div class="text-xs text-slate-500 mt-0.5 font-medium">Segmen bisnis penghasil revenue untuk analisis profitabilitas.</div>
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-100 w-8 h-8 rounded-full font-bold" @click="dialogOpen = false">✕</button>
        </div>
        <div class="p-4 space-y-4">
          <div class="space-y-1">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Kode Profit Center <span class="text-red-500">*</span></label>
            <input v-model="form.code" :disabled="!!editId" class="w-full border rounded-lg px-3 py-2 text-sm font-black font-mono text-slate-800 outline-none focus:border-emerald-500 shadow-inner disabled:bg-slate-50 disabled:opacity-70" placeholder="PC-BAKERY" />
            <div class="text-[9px] text-slate-400 font-medium">Format: PC-[SEGMEN]. Contoh: PC-BAKERY, PC-EXPORT, PC-ECOMMERCE</div>
          </div>
          <div class="space-y-1">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Nama Segmen Bisnis <span class="text-red-500">*</span></label>
            <input v-model="form.name" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-emerald-500 shadow-inner" placeholder="Segmen Bakery & Roti Artisan..." />
          </div>
          <div class="bg-blue-50 border border-blue-100 rounded-lg p-3">
            <div class="text-[10px] text-blue-800 font-medium flex items-start gap-2">
              <i class="pi pi-info-circle text-blue-600 mt-0.5"></i>
              Profit Center yang ditambahkan di sini dapat langsung digunakan sebagai dimensi analitik di:
              <b>Journal Entry, Sales Order, Invoice, dan Laporan P&L per Segmen.</b>
            </div>
          </div>
          <div v-if="formError" class="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 border border-red-200">{{ formError }}</div>
        </div>
        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
          <Button label="Batal" severity="secondary" @click="dialogOpen = false" class="bg-white border text-slate-700 font-bold px-5 shadow-sm" />
          <Button :label="editId ? 'Simpan Perubahan' : 'Daftarkan Segmen'" :loading="saving" :disabled="!form.code || !form.name" @click="submit" class="bg-emerald-600 border-none text-white font-bold px-6 shadow-sm" icon="pi pi-check" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const profitCenters = ref<any[]>([]);
const loading = ref(false);
const saving = ref(false);
const dialogOpen = ref(false);
const editId = ref('');
const search = ref('');
const formError = ref('');
const form = reactive({ code: '', name: '' });

const filteredPCs = computed(() => {
  let list = profitCenters.value;
  if (search.value.trim()) {
    const q = search.value.toLowerCase();
    list = list.filter(pc => pc.code.toLowerCase().includes(q) || pc.name.toLowerCase().includes(q));
  }
  return list;
});

const load = async () => {
  loading.value = true;
  try {
    const res = await api.get('/finance/profit-centers');
    profitCenters.value = res.data?.profitCenters ?? res.profitCenters ?? [];
  } catch (e) { console.warn(e); }
  finally { loading.value = false; }
};

const openDialog = (pc?: any) => {
  editId.value = pc?.id ?? '';
  form.code = pc?.code ?? '';
  form.name = pc?.name ?? '';
  formError.value = '';
  dialogOpen.value = true;
};

const submit = async () => {
  if (!form.code || !form.name) return;
  saving.value = true;
  formError.value = '';
  try {
    if (editId.value) {
      await api.patch(`/finance/profit-centers/${editId.value}`, { name: form.name });
    } else {
      await api.post('/finance/profit-centers', { code: form.code, name: form.name });
    }
    dialogOpen.value = false;
    await load();
  } catch (e: any) {
    formError.value = e?.response?.data?.message ?? e?.message ?? 'Gagal menyimpan';
  } finally { saving.value = false; }
};

const toggle = async (pc: any) => {
  try {
    await api.patch(`/finance/profit-centers/${pc.id}`, { isActive: !pc.isActive });
    await load();
  } catch (e) { console.warn(e); }
};

onMounted(load);
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
</style>