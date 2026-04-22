<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-4 shadow-sm border-l-4 border-l-violet-600 relative overflow-hidden">
      <div class="absolute right-[-10px] top-[-10px] opacity-5 pointer-events-none">
        <i class="pi pi-sitemap text-[150px] text-violet-900"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-start gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-sitemap text-violet-600"></i> Struktur Organisasi
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
            Hierarki perusahaan F&B — dari Perusahaan (Company) → Divisi → Departemen → Tim/Unit. Digunakan sebagai dimensi organisasi di modul HRIS, Keuangan, dan Anggaran.
          </div>
        </div>
        <Button label="+ Tambah Unit" size="small" icon="pi pi-plus"
          class="bg-violet-700 text-white border-none font-bold shadow-sm hover:bg-violet-800 shrink-0"
          @click="openCreate()" />
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
      <div v-for="t in typeStats" :key="t.type"
        class="bg-white border rounded-xl p-4 shadow-sm cursor-pointer transition hover:shadow-md"
        :class="filterType === t.type ? 'border-violet-500 ring-1 ring-violet-200' : ''"
        @click="filterType = filterType === t.type ? '' : t.type">
        <div class="text-2xl font-black" :style="{ color: typeColor(t.type) }">{{ t.count }}</div>
        <div class="text-[10px] font-black text-slate-500 mt-0.5 uppercase tracking-widest">{{ t.type }}</div>
      </div>
    </div>

    <!-- Mode Toggle + Search -->
    <div class="bg-white border rounded-xl p-4 shadow-sm flex flex-wrap gap-3 items-center">
      <InputText v-model="search" placeholder="Cari kode / nama unit..." class="w-64 text-sm" />
      <div class="flex gap-1 bg-slate-100 rounded-lg p-1">
        <button @click="viewMode='tree'" :class="viewMode==='tree'?'bg-violet-700 text-white shadow-sm':'text-slate-600 hover:bg-slate-50'" class="rounded-md px-3 py-1.5 text-[11px] font-black transition flex items-center gap-1.5">
          <i class="pi pi-sitemap text-[10px]"></i> Pohon Hierarki
        </button>
        <button @click="viewMode='table'" :class="viewMode==='table'?'bg-violet-700 text-white shadow-sm':'text-slate-600 hover:bg-slate-50'" class="rounded-md px-3 py-1.5 text-[11px] font-black transition flex items-center gap-1.5">
          <i class="pi pi-list text-[10px]"></i> Tabel
        </button>
      </div>
      <Button severity="secondary" size="small" :disabled="loading" icon="pi pi-refresh" @click="load" outlined class="h-10 w-10 ml-auto" />
    </div>

    <div v-if="loading" class="py-16 text-center text-slate-400">
      <i class="pi pi-spinner pi-spin mr-2 text-violet-600"></i> Memuat struktur organisasi...
    </div>

    <!-- ===== Tree View ===== -->
    <div v-if="!loading && viewMode === 'tree'" class="space-y-3">
      <!-- Root nodes (COMPANY / no parent) -->
      <template v-for="node in filteredTree" :key="node.id">
        <OrgNode :node="node" :level="0" :on-edit="openEdit" :on-add-child="openCreate" />
      </template>
      <div v-if="filteredTree.length === 0" class="bg-white border rounded-xl p-12 text-center text-slate-400 italic">
        Tidak ada unit organisasi ditemukan.
      </div>
    </div>

    <!-- ===== Table View ===== -->
    <div v-if="!loading && viewMode === 'table'" class="rounded-xl border bg-white shadow-sm overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-violet-900 text-left text-[11px] text-white uppercase tracking-widest font-bold">
          <tr>
            <th class="px-5 py-3 w-36">Kode</th>
            <th class="px-4 py-3">Nama Unit</th>
            <th class="px-4 py-3 border-l w-28 text-center">Tipe</th>
            <th class="px-4 py-3 border-l">Induk (Parent)</th>
            <th class="px-4 py-3 border-l">Kepala / Manager</th>
            <th class="px-4 py-3 border-l w-24 text-center">Anggota</th>
            <th class="px-4 py-3 border-l text-center w-28">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="unit in filteredFlat" :key="unit.id"
            class="border-t transition hover:bg-violet-50/20"
            :style="{ paddingLeft: `${depthOf(unit.code) * 12}px` }">
            <td class="px-5 py-3 align-middle">
              <span class="font-mono font-black text-xs px-2 py-0.5 rounded border"
                :style="{ color: typeColor(unit.type), borderColor: typeColor(unit.type) + '55', backgroundColor: typeColor(unit.type) + '11' }">
                {{ unit.code }}
              </span>
            </td>
            <td class="px-4 py-3 align-middle">
              <div class="flex items-center gap-2">
                <span v-for="_ in Array(depthOf(unit.code))" :key="_" class="text-slate-200 text-xs">—</span>
                <div class="font-bold text-slate-800">{{ unit.name }}</div>
              </div>
            </td>
            <td class="px-4 py-3 border-l text-center align-middle">
              <span class="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border"
                :style="{ color: typeColor(unit.type), borderColor: typeColor(unit.type) + '66', backgroundColor: typeColor(unit.type) + '14' }">
                {{ unit.type }}
              </span>
            </td>
            <td class="px-4 py-3 border-l align-middle text-xs text-slate-600 font-medium">
              {{ unit.parent?.name ?? '—' }}
            </td>
            <td class="px-4 py-3 border-l align-middle">
              <div v-if="unit.manager" class="flex items-center gap-2">
                <div class="w-6 h-6 rounded-full flex items-center justify-center font-black text-[9px] text-white shrink-0"
                  :style="{ backgroundColor: avatarColor(unit.manager.firstName) }">
                  {{ (unit.manager.firstName[0] ?? '') + (unit.manager.lastName?.[0] ?? '') }}
                </div>
                <div class="text-xs font-semibold text-slate-700">{{ unit.manager.firstName }} {{ unit.manager.lastName ?? '' }}</div>
              </div>
              <span v-else class="text-xs text-slate-400 italic">—</span>
            </td>
            <td class="px-4 py-3 border-l text-center align-middle">
              <span class="text-sm font-black text-slate-600">{{ unit.children?.length ?? 0 }}</span>
              <span class="text-[10px] text-slate-400 ml-0.5">sub</span>
            </td>
            <td class="px-4 py-3 border-l text-center align-middle">
              <div class="flex justify-center gap-1">
                <Button label="Edit" size="small" outlined class="text-[9px] h-7 px-2 font-bold text-violet-600 border-violet-200 hover:bg-violet-700 hover:text-white" @click="openEdit(unit)" />
                <Button icon="pi pi-plus" size="small" outlined class="h-7 w-7 font-bold text-slate-500 border-slate-200 hover:bg-slate-100" @click="openCreate(unit)" v-tooltip="'Tambah sub-unit'" />
              </div>
            </td>
          </tr>
          <tr v-if="filteredFlat.length === 0">
            <td colspan="7" class="py-16 text-center text-slate-400 italic">Tidak ada data.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Create / Edit Dialog -->
    <div v-if="formDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div class="w-full max-w-lg rounded-2xl border bg-white shadow-2xl flex flex-col animate-fade-in-up">
        <div class="p-5 border-b bg-slate-50 flex justify-between rounded-t-2xl">
          <div>
            <div class="text-lg font-black text-slate-800 flex items-center gap-2">
              <i class="pi pi-sitemap text-violet-600"></i>
              {{ editId ? 'Edit Unit Organisasi' : 'Tambah Unit Organisasi' }}
            </div>
            <div class="text-xs text-slate-500 mt-0.5 font-medium" v-if="preselectedParent">
              Induk: <strong class="text-violet-700">{{ preselectedParent.code }} — {{ preselectedParent.name }}</strong>
            </div>
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-100 w-8 h-8 rounded-full font-bold" @click="formDialog = false">✕</button>
        </div>

        <div class="p-4 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Kode Unit <span class="text-red-500">*</span></label>
              <input v-model="form.code" :disabled="!!editId || saving" class="w-full border rounded-lg px-3 py-2 text-sm font-mono font-black text-violet-700 uppercase outline-none focus:border-violet-500 shadow-inner disabled:opacity-60" placeholder="DEPT-EXPORT" />
              <div class="text-[9px] text-slate-400">Konvensi: COMPANY / DIV- / DEPT- / TEAM-</div>
            </div>
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tipe <span class="text-red-500">*</span></label>
              <select v-model="form.type" :disabled="saving" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-violet-500 shadow-inner">
                <option v-for="t in UNIT_TYPES" :key="t">{{ t }}</option>
              </select>
            </div>
          </div>
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Nama Unit <span class="text-red-500">*</span></label>
            <input v-model="form.name" :disabled="saving" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-violet-500 shadow-inner" placeholder="Departemen Ekspor & Distribusi Luar Negeri" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Induk (Parent)</label>
              <select v-model="form.parentId" :disabled="saving" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-violet-500 shadow-inner">
                <option value="">— Tanpa induk (Root) —</option>
                <option v-for="u in parentOptions" :key="u.id" :value="u.id">
                  {{ u.code }} — {{ u.name }}
                </option>
              </select>
            </div>
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Kepala / Manager</label>
              <select v-model="form.managerId" :disabled="saving" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-violet-500 shadow-inner">
                <option value="">— Pilih karyawan —</option>
                <option v-for="e in employees" :key="e.id" :value="e.id">
                  {{ e.employeeNo }} — {{ e.firstName }} {{ e.lastName ?? '' }}
                </option>
              </select>
            </div>
          </div>

          <!-- Type info box -->
          <div class="rounded-xl border p-3 text-xs font-medium gap-2 flex items-start"
            :style="{ backgroundColor: typeColor(form.type) + '0d', borderColor: typeColor(form.type) + '44', color: typeColor(form.type) }">
            <i class="pi pi-info-circle mt-0.5"></i>
            <span>{{ typeGuide(form.type) }}</span>
          </div>

          <div v-if="formError" class="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 border border-red-200">{{ formError }}</div>
        </div>

        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
          <Button label="Batal" severity="secondary" :disabled="saving" @click="formDialog = false" class="bg-white border text-slate-700 font-bold px-5" />
          <Button :label="editId ? 'Simpan Perubahan' : 'Tambahkan Unit'"
            :loading="saving" :disabled="!form.code || !form.name"
            @click="submit" class="bg-violet-700 border-none text-white font-bold px-6" icon="pi pi-check" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type OrgUnit = {
  id: string; code: string; name: string; type: string;
  parentId?: string; managerId?: string;
  parent?: Pick<OrgUnit, 'id'|'code'|'name'>;
  manager?: { id: string; firstName: string; lastName?: string; position?: string };
  children?: OrgUnit[];
};
type Employee = { id: string; employeeNo: string; firstName: string; lastName?: string; };

const api = useApi();
const units = ref<OrgUnit[]>([]);
const employees = ref<Employee[]>([]);
const loading = ref(false);
const saving = ref(false);
const viewMode = ref<'tree' | 'table'>('tree');
const search = ref('');
const filterType = ref('');
const formDialog = ref(false);
const editId = ref('');
const formError = ref('');
const preselectedParent = ref<OrgUnit | null>(null);

const form = reactive({ code: '', name: '', type: 'DEPARTMENT', parentId: '', managerId: '' });

const UNIT_TYPES = ['COMPANY', 'DIVISION', 'DEPARTMENT', 'TEAM', 'UNIT'];

const TYPE_COLORS: Record<string, string> = {
  COMPANY: '#1e293b', DIVISION: '#7c3aed', DEPARTMENT: '#2563eb', TEAM: '#059669', UNIT: '#d97706',
};
const typeColor = (t: string) => TYPE_COLORS[t] ?? '#64748b';

const TYPE_GUIDES: Record<string, string> = {
  COMPANY: 'Entitas perusahaan paling atas. Hanya ada satu COMPANY root. Merupakan parent dari semua Divisi.',
  DIVISION: 'Pengelompokan besar fungsi bisnis, dipimpin Direktur. Contoh: Divisi Operasional, Divisi Komersial.',
  DEPARTMENT: 'Unit kerja fungsional di bawah Divisi, dipimpin Manager/Kepala. Contoh: Dept. Produksi, Dept. Penjualan.',
  TEAM: 'Kelompok kerja di bawah Departemen, dipimpin Supervisor. Contoh: Tim Lini Bakery, Tim Area Jakarta.',
  UNIT: 'Sub-unit teknis atau fungsional terkecil. Contoh: Unit Lab QC, Unit AR, Unit Support ERP.',
};
const typeGuide = (t: string) => TYPE_GUIDES[t] ?? '';

const AVATAR_COLORS = ['#6366f1','#8b5cf6','#06b6d4','#10b981','#f59e0b','#ef4444','#ec4899','#14b8a6','#3b82f6','#f97316'];
const avatarColor = (name: string) => AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

// Build tree
const buildTree = (list: OrgUnit[]): OrgUnit[] => {
  const map = new Map<string, OrgUnit>(list.map(u => [u.id, { ...u, children: [] }]));
  const roots: OrgUnit[] = [];
  for (const u of map.values()) {
    if (u.parentId && map.has(u.parentId)) {
      map.get(u.parentId)!.children!.push(u);
    } else {
      roots.push(u);
    }
  }
  return roots;
};

const typeOrder = (t: string) => ['COMPANY', 'DIVISION', 'DEPARTMENT', 'TEAM', 'UNIT'].indexOf(t);

const typeStats = computed(() => {
  const map: Record<string, number> = {};
  for (const u of units.value) map[u.type] = (map[u.type] ?? 0) + 1;
  return Object.entries(map).sort((a, b) => typeOrder(a[0]) - typeOrder(b[0])).map(([type, count]) => ({ type, count }));
});

const flatFiltered = (list: OrgUnit[]): OrgUnit[] => {
  if (filterType.value) list = list.filter(u => u.type === filterType.value);
  if (search.value.trim()) {
    const q = search.value.toLowerCase();
    list = list.filter(u => u.code.toLowerCase().includes(q) || u.name.toLowerCase().includes(q));
  }
  return list;
};

const filteredFlat = computed(() => {
  let list = [...units.value];
  list.sort((a, b) => {
    const da = depthOf(a.code), db = depthOf(b.code);
    return da !== db ? da - db : a.code.localeCompare(b.code);
  });
  return flatFiltered(list);
});

const filteredTree = computed(() => {
  if (search.value || filterType.value) {
    return flatFiltered(units.value).map(u => ({ ...u, children: [] }));
  }
  return buildTree(units.value);
});

const depthOf = (code: string) => {
  if (code === 'SES-CORP') return 0;
  if (code.startsWith('DIV-')) return 1;
  if (code.startsWith('DEPT-')) return 2;
  return 3;
};

const parentOptions = computed(() => units.value.filter(u => u.id !== editId.value));

const load = async () => {
  loading.value = true;
  try {
    const [orgRes, empRes] = await Promise.all([
      api.get('/hris/org-structure'),
      api.get('/hris/employees'),
    ]);
    units.value = orgRes.data?.units ?? orgRes.units ?? [];
    employees.value = (empRes.data?.employees ?? empRes.employees ?? []).filter((e: any) => e.status === 'ACTIVE');
  } catch (e) { console.warn(e); }
  finally { loading.value = false; }
};

const openCreate = (parentUnit?: OrgUnit) => {
  editId.value = '';
  preselectedParent.value = parentUnit ?? null;
  form.code = ''; form.name = ''; form.type = 'DEPARTMENT';
  form.parentId = parentUnit?.id ?? '';
  form.managerId = '';
  formError.value = '';
  formDialog.value = true;
};

const openEdit = (unit: OrgUnit) => {
  editId.value = unit.id;
  preselectedParent.value = null;
  form.code = unit.code; form.name = unit.name; form.type = unit.type;
  form.parentId = unit.parentId ?? ''; form.managerId = unit.managerId ?? '';
  formError.value = '';
  formDialog.value = true;
};

const submit = async () => {
  saving.value = true; formError.value = '';
  try {
    const payload = {
      code: form.code.toUpperCase().trim(),
      name: form.name.trim(),
      type: form.type,
      parentId: form.parentId || undefined,
      managerId: form.managerId || undefined,
    };
    if (editId.value) {
      // Use POST endpoint for update (matches controller pattern)
      await api.post(`/hris/org-structure`, payload).catch(() =>
        api.patch(`/hris/org-structure/${editId.value}`, payload)
      );
    } else {
      await api.post('/hris/org-structure', payload);
    }
    formDialog.value = false;
    await load();
  } catch (e: any) { formError.value = e?.response?.data?.message ?? 'Gagal menyimpan'; }
  finally { saving.value = false; }
};

onMounted(load);

// ─── Recursive Tree Node Component ───────────────────────────────────────────
const OrgNode = defineComponent({
  name: 'OrgNode',
  props: {
    node: { type: Object as () => OrgUnit, required: true },
    level: { type: Number, default: 0 },
    onEdit: Function,
    onAddChild: Function,
  },
  setup(props) {
    const expanded = ref(props.level < 2);

    const TYPE_COLORS: Record<string, string> = {
      COMPANY: '#1e293b', DIVISION: '#7c3aed', DEPARTMENT: '#2563eb', TEAM: '#059669', UNIT: '#d97706',
    };
    const tc = (t: string) => TYPE_COLORS[t] ?? '#64748b';

    const INDENT_PX = 28;
    const avatarColor = (name: string) => ['#6366f1','#8b5cf6','#06b6d4','#10b981','#f59e0b','#ef4444','#ec4899','#14b8a6','#3b82f6','#f97316'][name.charCodeAt(0) % 10];

    return () => {
      const { node, level } = props;
      const hasChildren = (node.children?.length ?? 0) > 0;
      return h('div', { class: 'select-none' }, [
        h('div', {
          class: 'flex items-center gap-2 py-2 rounded-xl hover:bg-violet-50/30 transition cursor-pointer group',
          style: `padding-left: ${level * INDENT_PX + 8}px; padding-right: 8px`,
        }, [
          // Expand toggle
          h('button', {
            class: 'w-6 h-6 flex items-center justify-center rounded-lg text-slate-400 transition shrink-0',
            style: hasChildren ? '' : 'opacity:0;pointer-events:none',
            onClick: (e: Event) => { e.stopPropagation(); expanded.value = !expanded.value; }
          }, [
            h('i', { class: `pi ${expanded.value ? 'pi-chevron-down' : 'pi-chevron-right'} text-[10px] font-black` })
          ]),

          // Type badge
          h('span', {
            class: 'text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border w-20 text-center shrink-0',
            style: `color:${tc(node.type)};border-color:${tc(node.type)}55;background:${tc(node.type)}11`,
          }, node.type),

          // Code
          h('span', { class: 'font-mono font-black text-xs text-slate-500 shrink-0 w-36' }, node.code),

          // Name
          h('span', { class: 'font-bold text-slate-800 text-sm flex-1 truncate' }, node.name),

          // Manager
          node.manager ? h('div', { class: 'flex items-center gap-1.5 shrink-0' }, [
            h('div', {
              class: 'w-6 h-6 rounded-full flex items-center justify-center font-black text-[9px] text-white shrink-0',
              style: `background:${avatarColor(node.manager.firstName)}`
            }, (node.manager.firstName[0] ?? '') + (node.manager.lastName?.[0] ?? '')),
            h('span', { class: 'text-xs text-slate-500 font-medium hidden md:block' }, `${node.manager.firstName} ${node.manager.lastName ?? ''}`)
          ]) : null,

          // Children count
          hasChildren ? h('span', { class: 'text-[9px] text-slate-400 font-black bg-slate-100 px-1.5 py-0.5 rounded' }, `${node.children!.length} sub`) : null,

          // Actions (show on hover)
          h('div', { class: 'flex gap-1 opacity-0 group-hover:opacity-100 transition shrink-0' }, [
            h('button', {
              class: 'text-[9px] font-black text-violet-600 border border-violet-200 bg-white rounded-lg px-2 py-1 hover:bg-violet-700 hover:text-white transition',
              onClick: (e: Event) => { e.stopPropagation(); props.onEdit?.(node); }
            }, 'Edit'),
            h('button', {
              class: 'text-[9px] font-black text-slate-500 border border-slate-200 bg-white rounded-lg px-2 py-1 hover:bg-slate-100 transition',
              onClick: (e: Event) => { e.stopPropagation(); props.onAddChild?.(node); }
            }, '+ Sub'),
          ]),
        ]),

        // Children
        expanded.value && hasChildren
          ? h('div', {}, node.children!.map(child =>
              h(OrgNode as any, { key: child.id, node: child, level: level + 1, onEdit: props.onEdit, onAddChild: props.onAddChild })
            ))
          : null,
      ]);
    };
  },
});
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>