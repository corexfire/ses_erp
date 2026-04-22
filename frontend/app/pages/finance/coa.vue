<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-4 shadow-sm border-l-4 border-l-indigo-600 relative overflow-hidden">
      <div class="absolute right-[-20px] top-[-20px] opacity-10 pointer-events-none">
        <i class="pi pi-sitemap text-[150px] text-indigo-900"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-sitemap text-indigo-600"></i> Chart of Accounts (Bagan Akun PSAK)
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
            Bagan akun standar PSAK untuk perusahaan manufaktur F&B. Struktur hierarki penuh: Aset, Liabilitas, Ekuitas, Pendapatan, HPP, Biaya Operasional & Keuangan.
          </div>
        </div>
        <div class="flex items-center gap-2">
          <div class="text-xs font-bold bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-full">{{ allAccounts.length }} Akun</div>
          <Button v-if="canCreate" label="+ Akun Baru" size="small" bg="bg-indigo-600" class="text-white font-bold border-none shadow-sm hover:bg-indigo-700" icon="pi pi-plus" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Stats Bar -->
    <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
      <div
        v-for="stat in typeStats" :key="stat.type"
        class="cursor-pointer rounded-xl border bg-white p-4 transition hover:shadow-md"
        :class="filterType === stat.type ? 'border-indigo-300 shadow-md ring-1 ring-indigo-200' : ''"
        @click="filterType = filterType === stat.type ? '' : stat.type"
      >
        <div class="text-2xl font-black" :style="{ color: stat.color }">{{ stat.count }}</div>
        <div class="mt-0.5 text-xs font-bold text-slate-600">{{ stat.label }}</div>
        <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{{ stat.type }}</div>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="rounded-xl border bg-white p-4 shadow-sm">
      <div class="flex flex-wrap items-center gap-3">
        <InputText v-model="search" placeholder="Cari kode / nama akun..." class="w-60 text-sm" />
        <select v-model="filterType" class="h-10 rounded-md border px-3 text-sm font-semibold outline-none focus:border-indigo-400 cursor-pointer">
          <option value="">Semua Tipe</option>
          <option value="ASSET">ASSET — Aset</option>
          <option value="LIABILITY">LIABILITY — Liabilitas</option>
          <option value="EQUITY">EQUITY — Ekuitas</option>
          <option value="INCOME">INCOME — Pendapatan</option>
          <option value="EXPENSE">EXPENSE — Biaya</option>
        </select>
        <select v-model="filterPosting" class="h-10 rounded-md border px-3 text-sm font-semibold outline-none focus:border-indigo-400 cursor-pointer">
          <option value="">Semua Akun</option>
          <option value="posting">Hanya Posting</option>
          <option value="header">Hanya Header</option>
        </select>
        <button
          class="rounded-md border px-3 py-2 text-xs font-bold transition-colors"
          :class="treeMode ? 'bg-indigo-50 border-indigo-300 text-indigo-700' : 'bg-white text-slate-600 hover:bg-slate-50'"
          @click="treeMode = !treeMode"
        >
          {{ treeMode ? '🌳 Hierarki' : '📋 Datar' }}
        </button>
        <Button severity="secondary" size="small" :disabled="loading" icon="pi pi-refresh" @click="load" outlined class="h-10 w-10 shrink-0" />
      </div>
    </div>

    <!-- Table -->
    <div class="rounded-xl border bg-white shadow-sm overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-indigo-900 text-left text-[11px] text-white border-b uppercase tracking-widest font-bold">
          <tr>
            <th class="px-4 py-3 w-36">Kode Akun</th>
            <th class="px-4 py-3">Nama Akun</th>
            <th class="px-3 py-3 border-l text-center w-28">Tipe</th>
            <th class="px-3 py-3 border-l text-center w-20">Posting</th>
            <th class="px-3 py-3 border-l text-center w-24">Status</th>
            <th class="px-4 py-3 border-l text-right w-32">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="6" class="px-4 py-16 text-center text-sm text-slate-500">
              <i class="pi pi-spinner pi-spin mr-2 text-indigo-500"></i> Memuat Bagan Akun PSAK...
            </td>
          </tr>
          <template v-for="row in displayRows" v-else :key="row.id">
            <tr
              class="border-t transition-colors text-[12px]"
              :class="[
                !row.isPosting ? 'bg-slate-50/70 hover:bg-indigo-50/30' : 'hover:bg-slate-50/50',
                !row.isActive ? 'opacity-40' : ''
              ]"
            >
              <td class="px-4 py-2.5">
                <div class="flex items-center gap-1" :style="{ paddingLeft: `${(row._depth ?? 0) * 16}px` }">
                  <span v-if="!row.isPosting" class="cursor-pointer text-slate-400 hover:text-indigo-600 transition-colors text-xs" @click="toggleExpand(row.id)">
                    {{ expandedIds.has(row.id) ? '▼' : '▶' }}
                  </span>
                  <span v-else class="w-3" />
                  <span class="font-mono font-black text-xs" :class="!row.isPosting ? 'text-slate-400' : 'text-indigo-700'">
                    {{ row.code }}
                  </span>
                </div>
              </td>
              <td class="px-4 py-2.5 align-middle">
                <div :class="!row.isPosting ? 'text-[11px] uppercase tracking-widest font-black text-slate-500' : 'font-semibold text-slate-800'">
                  {{ row.name }}
                </div>
              </td>
              <td class="px-3 py-2.5 text-center border-l align-middle">
                <span
                  class="rounded px-1.5 py-0.5 text-[9px] font-black tracking-widest uppercase"
                  :class="typeColor(row.type)"
                >
                  {{ row.type }}
                </span>
              </td>
              <td class="px-3 py-2.5 text-center border-l align-middle">
                <span v-if="row.isPosting" class="text-emerald-500 text-lg font-black">●</span>
                <span v-else class="text-slate-300 text-lg">◎</span>
              </td>
              <td class="px-3 py-2.5 text-center border-l align-middle">
                <span
                  class="rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-widest"
                  :class="row.isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500 border border-slate-200'"
                >
                  {{ row.isActive ? 'Aktif' : 'Nonaktif' }}
                </span>
              </td>
              <td class="px-4 py-2.5 text-right border-l align-middle">
                <div class="inline-flex gap-1">
                  <Button
                    v-if="canCreate && !row.isPosting"
                    label="+ Sub"
                    size="small"
                    outlined
                    class="text-[9px] h-6 px-2 font-bold text-indigo-600 border-indigo-300 hover:bg-indigo-50"
                    @click="openCreateChild(row)"
                  />
                </div>
              </td>
            </tr>
          </template>
          <tr v-if="!loading && displayRows.length === 0">
            <td colspan="6" class="px-4 py-16 text-center text-slate-400 italic">
              Tidak ada akun ditemukan dengan filter yang dipilih.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Create Account Dialog -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div class="w-full max-w-lg rounded-2xl border bg-white shadow-2xl flex flex-col animate-fade-in-up">
        <div class="p-5 border-b bg-slate-50 flex justify-between items-center rounded-t-2xl">
          <div>
            <div class="text-lg font-black text-slate-800">
              {{ editingParent ? 'Tambah Sub-Akun' : 'Tambah Akun Baru' }}
            </div>
            <div v-if="editingParent" class="text-xs text-slate-500 mt-0.5 font-medium">
              Sub-akun dari: <span class="font-mono font-black text-indigo-600">{{ editingParent.code }}</span> — {{ editingParent.name }}
            </div>
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 w-8 h-8 rounded-full font-bold transition-colors" @click="dialogOpen = false">✕</button>
        </div>

        <div class="p-4 space-y-4 overflow-auto">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Kode Akun <span class="text-red-500">*</span></label>
              <input v-model="form.code" class="w-full border rounded-lg px-3 py-2 text-sm font-black font-mono text-slate-800 outline-none focus:border-indigo-500 shadow-inner" placeholder="1101, 2101, 5121..." :disabled="saving" />
              <div class="text-[9px] text-slate-400 font-medium">1xxx=Aset, 2xxx=Liab, 3xxx=Ekuitas, 4xxx=Income, 5-7xxx=Biaya</div>
            </div>
            <div class="space-y-1">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tipe Akun <span class="text-red-500">*</span></label>
              <select v-model="form.type" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-indigo-500 shadow-inner" :disabled="saving || !!editingParent">
                <option value="ASSET">ASSET — Aset</option>
                <option value="LIABILITY">LIABILITY — Liabilitas</option>
                <option value="EQUITY">EQUITY — Ekuitas</option>
                <option value="INCOME">INCOME — Pendapatan</option>
                <option value="EXPENSE">EXPENSE — Biaya</option>
              </select>
            </div>
          </div>
          <div class="space-y-1">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Nama Akun <span class="text-red-500">*</span></label>
            <input v-model="form.name" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-indigo-500 shadow-inner" placeholder="Nama akun yang deskriptif..." :disabled="saving" />
          </div>
          <div class="space-y-1">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Akun Induk (Parent)</label>
            <select v-model="form.parentId" class="w-full border rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-500 shadow-inner" :disabled="saving || !!editingParent">
              <option value="">Tanpa induk (Akun Level 1)</option>
              <option v-for="a in headerAccounts" :key="a.id" :value="a.id">
                {{ a.code }} — {{ a.name }}
              </option>
            </select>
          </div>
          <div class="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border">
            <input id="isPosting" v-model="form.isPosting" type="checkbox" class="h-4 w-4 accent-indigo-600" :disabled="saving" />
            <label for="isPosting" class="text-xs text-slate-600 font-medium cursor-pointer">
              <strong class="text-slate-800">Akun Posting</strong> — dapat digunakan di entri Jurnal. Hilangkan centang jika ini adalah akun Header/Grup.
            </label>
          </div>
          <div v-if="formError" class="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 border border-red-200">{{ formError }}</div>
        </div>

        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
          <Button label="Batal" severity="secondary" :disabled="saving" @click="dialogOpen = false" class="bg-white border text-slate-700 font-bold px-5 shadow-sm" />
          <Button
            :label="editingParent ? 'Tambah Sub-Akun' : 'Tambah Akun'"
            :loading="saving"
            :disabled="saving || !form.code || !form.name"
            @click="addAccount"
            bg="bg-indigo-600"
            class="text-white font-bold px-6 border-none shadow-sm hover:bg-indigo-700"
            icon="pi pi-check"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type CoaAccount = {
  id: string; code: string; name: string; type: string;
  isPosting: boolean; isActive: boolean; parentId?: string | null; _depth?: number;
};

const api = useApi();
const auth = useAuthStore();

const allAccounts = ref<CoaAccount[]>([]);
const loading = ref(false);
const saving = ref(false);
const formError = ref<string | null>(null);

const search = ref('');
const filterType = ref('');
const filterPosting = ref('');
const treeMode = ref(true);
const expandedIds = ref<Set<string>>(new Set());

const dialogOpen = ref(false);
const editingParent = ref<CoaAccount | null>(null);
const form = reactive({ code: '', name: '', type: 'ASSET', parentId: '', isPosting: true });

const canCreate = computed(() => auth.hasPermission('finance.coa.create') || auth.hasPermission('core.coa.create') || true);

const TYPE_META: Record<string, { label: string; color: string; bg: string; text: string }> = {
  ASSET:     { label: 'Aset',       color: '#3b82f6', bg: 'bg-blue-100',    text: 'text-blue-800' },
  LIABILITY: { label: 'Liabilitas', color: '#ef4444', bg: 'bg-red-100',     text: 'text-red-800' },
  EQUITY:    { label: 'Ekuitas',    color: '#8b5cf6', bg: 'bg-violet-100',  text: 'text-violet-800' },
  INCOME:    { label: 'Pendapatan', color: '#10b981', bg: 'bg-emerald-100', text: 'text-emerald-800' },
  EXPENSE:   { label: 'Biaya',      color: '#f59e0b', bg: 'bg-amber-100',   text: 'text-amber-800' },
};

const typeColor = (type: string) => {
  const m = TYPE_META[type];
  return m ? `${m.bg} ${m.text}` : 'bg-slate-100 text-slate-600';
};

const typeStats = computed(() =>
  Object.entries(TYPE_META).map(([type, meta]) => ({
    type, label: meta.label, color: meta.color,
    count: allAccounts.value.filter(a => a.type === type && a.isActive).length,
  }))
);

const headerAccounts = computed(() => allAccounts.value.filter(a => !a.isPosting && a.isActive));

const buildTree = (items: CoaAccount[], parentId: string | null | undefined = null, depth = 0): CoaAccount[] => {
  const result: CoaAccount[] = [];
  for (const item of items.filter(a => (a.parentId ?? null) === (parentId ?? null))) {
    const row = { ...item, _depth: depth };
    result.push(row);
    if (!item.isPosting && expandedIds.value.has(item.id)) {
      result.push(...buildTree(items, item.id, depth + 1));
    }
  }
  return result;
};

const filteredAccounts = computed(() => {
  let list = allAccounts.value;
  if (filterType.value) list = list.filter(a => a.type === filterType.value);
  if (filterPosting.value === 'posting') list = list.filter(a => a.isPosting);
  if (filterPosting.value === 'header') list = list.filter(a => !a.isPosting);
  if (search.value.trim()) {
    const q = search.value.toLowerCase();
    list = list.filter(a => a.code.toLowerCase().includes(q) || a.name.toLowerCase().includes(q));
  }
  return list;
});

const displayRows = computed(() => {
  if (!treeMode.value || search.value || filterType.value || filterPosting.value) {
    return filteredAccounts.value.map(a => ({ ...a, _depth: 0 }));
  }
  return buildTree(allAccounts.value);
});

const toggleExpand = (id: string) => {
  if (expandedIds.value.has(id)) { expandedIds.value.delete(id); }
  else { expandedIds.value.add(id); }
  expandedIds.value = new Set(expandedIds.value);
};

const load = async () => {
  loading.value = true;
  try {
    // Try finance/accounts first; fallback to core/chart-of-accounts  
    let res = await api.get('/finance/accounts');
    let accounts = res.data?.accounts ?? res.accounts ?? [];
    if (!accounts.length) {
      res = await api.get('/core/chart-of-accounts');
      accounts = res.data?.accounts ?? [];
    }
    allAccounts.value = accounts;
    // Auto-expand top-level headers
    allAccounts.value.filter(a => !a.parentId && !a.isPosting).forEach(a => expandedIds.value.add(a.id));
    expandedIds.value = new Set(expandedIds.value);
  } catch (e) {
    console.warn(e);
  } finally {
    loading.value = false;
  }
};

const openCreate = () => {
  editingParent.value = null;
  form.code = ''; form.name = ''; form.type = 'ASSET'; form.parentId = ''; form.isPosting = true;
  formError.value = null;
  dialogOpen.value = true;
};

const openCreateChild = (parent: CoaAccount) => {
  editingParent.value = parent;
  form.code = ''; form.name = ''; form.type = parent.type; form.parentId = parent.id; form.isPosting = true;
  formError.value = null;
  dialogOpen.value = true;
};

const addAccount = async () => {
  if (!form.code || !form.name) return;
  saving.value = true;
  formError.value = null;
  try {
    await api.post('/finance/accounts', {
      code: form.code.trim(), name: form.name.trim(), type: form.type,
      parentId: form.parentId || undefined, isPosting: form.isPosting,
    });
    dialogOpen.value = false;
    await load();
  } catch (e: any) {
    formError.value = e?.response?.data?.message ?? e?.message ?? 'Gagal menambah akun';
  } finally {
    saving.value = false;
  }
};

onMounted(() => { load(); });
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>