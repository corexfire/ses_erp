<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-4 shadow-sm border-l-4 border-l-orange-500 relative overflow-hidden">
      <div class="absolute right-[-15px] top-[-15px] opacity-5 pointer-events-none">
        <i class="pi pi-percentage text-[140px] text-orange-900"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-start gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-percentage text-orange-600"></i> Konfigurasi Tarif Pajak (Tax Code)
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
            Master kode pajak DJP Indonesia untuk F&B: PPN, PPh 21/22/23/42, Bea Masuk, dan Cukai. Digunakan di seluruh transaksi pembelian, penjualan, dan jurnal akuntansi.
          </div>
        </div>
        <Button label="+ Tambah Kode Pajak" size="small" icon="pi pi-plus"
          class="bg-orange-500 text-white border-none font-bold shadow-sm hover:bg-orange-600 shrink-0"
          @click="openCreate" />
      </div>
    </div>

    <!-- Stats by category -->
    <div class="grid grid-cols-2 md:grid-cols-6 gap-3">
      <div
        v-for="cat in categoryStats" :key="cat.label"
        class="cursor-pointer bg-white border rounded-xl p-3 shadow-sm transition hover:shadow-md text-center"
        :class="activeCategory === cat.label ? 'border-orange-400 ring-1 ring-orange-200 bg-orange-50/30' : ''"
        @click="activeCategory = activeCategory === cat.label ? '' : cat.label"
      >
        <div class="text-xl font-black" :style="{ color: cat.color }">{{ cat.count }}</div>
        <div class="text-[10px] font-bold text-slate-500 mt-0.5 uppercase tracking-widest">{{ cat.label }}</div>
      </div>
    </div>

    <!-- Filter & Search -->
    <div class="bg-white border rounded-xl p-4 shadow-sm flex flex-wrap gap-3 items-center">
      <InputText v-model="search" placeholder="Cari kode / nama pajak..." class="w-64 text-sm" />
      <select v-model="activeCategory" class="border rounded-lg px-3 py-2 text-sm font-semibold h-10 outline-none focus:border-orange-400">
        <option value="">Semua Kategori</option>
        <option v-for="cat in CATEGORIES" :key="cat">{{ cat }}</option>
      </select>
      <select v-model="statusFilter" class="border rounded-lg px-3 py-2 text-sm font-semibold h-10 outline-none focus:border-orange-400">
        <option value="">Semua Status</option>
        <option value="active">Aktif Saja</option>
        <option value="inactive">Nonaktif Saja</option>
      </select>
      <Button severity="secondary" size="small" :disabled="loading" icon="pi pi-refresh" @click="load" outlined class="h-10 w-10" />
      <div class="ml-auto text-xs text-slate-500 font-medium">{{ filteredTaxes.length }} dari {{ taxCodes.length }} kode pajak</div>
    </div>

    <!-- Main Table -->
    <div class="rounded-xl border bg-white shadow-sm overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-orange-900 text-left text-[11px] text-white uppercase tracking-widest font-bold">
          <tr>
            <th class="px-5 py-3 w-44">Kode Pajak</th>
            <th class="px-4 py-3">Nama / Keterangan</th>
            <th class="px-4 py-3 border-l text-center w-28">Kategori</th>
            <th class="px-4 py-3 border-l text-right w-28">Tarif (%)</th>
            <th class="px-4 py-3 border-l text-center w-36">Tgl Efektif</th>
            <th class="px-4 py-3 border-l text-center w-28">Status</th>
            <th class="px-4 py-3 border-l text-center w-32">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="7" class="px-4 py-16 text-center text-slate-500">
              <i class="pi pi-spinner pi-spin mr-2 text-orange-500"></i> Memuat database tarif pajak DJP...
            </td>
          </tr>

          <tr v-for="t in filteredTaxes" v-else :key="t.id"
            class="border-t transition hover:bg-orange-50/10"
            :class="!t.isActive ? 'opacity-50 bg-slate-50/40' : ''"
          >
            <td class="px-5 py-3 align-middle">
              <span class="font-mono font-black text-sm px-2.5 py-1 rounded-lg border"
                :class="categoryColor(detectCategory(t.code))">
                {{ t.code }}
              </span>
            </td>
            <td class="px-4 py-3 align-middle">
              <div class="font-bold text-slate-800">{{ t.name }}</div>
              <div v-if="getDescription(t.code)" class="text-[10px] text-slate-400 mt-0.5 font-medium max-w-xs truncate" :title="getDescription(t.code)">
                {{ getDescription(t.code) }}
              </div>
            </td>
            <td class="px-4 py-3 border-l text-center align-middle">
              <span class="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full border"
                :class="categoryColor(detectCategory(t.code))">
                {{ detectCategory(t.code) }}
              </span>
            </td>
            <td class="px-4 py-3 border-l text-right align-middle">
              <span class="font-mono font-black text-lg" :class="Number(t.rate) === 0 ? 'text-slate-400' : Number(t.rate) >= 10 ? 'text-rose-700' : 'text-orange-700'">
                {{ Number(t.rate).toFixed(Number(t.rate) % 1 === 0 ? 0 : 2) }}%
              </span>
            </td>
            <td class="px-4 py-3 border-l text-center align-middle">
              <div class="text-xs font-semibold text-slate-600">{{ formatDate(t.effectiveDate) }}</div>
            </td>
            <td class="px-4 py-3 border-l text-center align-middle">
              <span :class="t.isActive ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-slate-100 text-slate-500 border-slate-200'"
                class="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border inline-block">
                {{ t.isActive ? 'Aktif' : 'Nonaktif' }}
              </span>
            </td>
            <td class="px-4 py-3 border-l text-center align-middle">
              <div class="flex justify-center gap-1">
                <Button label="Edit" size="small" outlined class="text-[9px] h-7 px-2 font-bold text-slate-600 border-slate-300 hover:bg-slate-50" @click="openEdit(t)" />
                <Button v-if="t.isActive" label="Off" size="small" outlined class="text-[9px] h-7 px-2 font-bold text-rose-600 border-rose-200 hover:bg-rose-600 hover:text-white" @click="confirmDeactivate(t)" />
                <Button v-else label="On" size="small" outlined class="text-[9px] h-7 px-2 font-bold text-emerald-600 border-emerald-200 hover:bg-emerald-600 hover:text-white" @click="reactivate(t)" />
              </div>
            </td>
          </tr>

          <tr v-if="!loading && filteredTaxes.length === 0">
            <td colspan="7" class="px-4 py-16 text-center text-slate-400 italic">
              Tidak ada kode pajak ditemukan dengan filter saat ini.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Create / Edit Dialog -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div class="w-full max-w-lg rounded-2xl border bg-white shadow-2xl flex flex-col animate-fade-in-up">
        <div class="p-5 border-b bg-slate-50 flex justify-between items-center rounded-t-2xl">
          <div>
            <div class="text-lg font-black text-slate-800 flex items-center gap-2">
              <i class="pi pi-percentage text-orange-600"></i>
              {{ editId ? 'Edit Kode Pajak' : 'Tambah Kode Pajak Baru' }}
            </div>
            <div class="text-xs text-slate-500 mt-0.5 font-medium">Digunakan di seluruh modul transaksi (PO, SO, Invoice).</div>
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-100 w-8 h-8 rounded-full font-bold" @click="dialogOpen = false">✕</button>
        </div>

        <div class="p-4 space-y-4 overflow-auto">
          <!-- Quick presets -->
          <div v-if="!editId" class="space-y-2">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Quick Preset</label>
            <div class="flex flex-wrap gap-1.5">
              <button v-for="p in PRESETS" :key="p.code"
                class="rounded-lg border px-3 py-1.5 text-[10px] font-black uppercase tracking-widest transition"
                :class="form.code === p.code ? 'bg-orange-500 text-white border-orange-500' : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-orange-400'"
                @click="fillPreset(p)"
              >
                {{ p.code }} ({{ p.rate }}%)
              </button>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Kode Pajak <span class="text-red-500">*</span></label>
              <input v-model="form.code" :disabled="!!editId || saving" class="w-full border rounded-lg px-3 py-2 text-sm font-black font-mono text-slate-800 uppercase outline-none focus:border-orange-500 shadow-inner disabled:bg-slate-50" placeholder="PPN12" />
            </div>
            <div class="space-y-1">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Kategori</label>
              <select v-model="form.category" :disabled="saving" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-orange-500 shadow-inner">
                <option v-for="c in CATEGORIES" :key="c" :value="c">{{ c }}</option>
              </select>
            </div>
          </div>

          <div class="space-y-1">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Nama Pajak <span class="text-red-500">*</span></label>
            <input v-model="form.name" :disabled="saving" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-orange-500 shadow-inner" placeholder="Pajak Pertambahan Nilai 12%" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tarif (%) <span class="text-red-500">*</span></label>
              <div class="relative">
                <input type="number" v-model.number="form.rate" step="0.01" min="0" max="100" :disabled="saving"
                  class="w-full border rounded-lg px-3 py-2 pr-8 text-sm font-black font-mono text-orange-700 outline-none focus:border-orange-500 shadow-inner" placeholder="12" />
                <span class="absolute right-3 top-2.5 text-sm font-black text-orange-600">%</span>
              </div>
            </div>
            <div class="space-y-1">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tanggal Berlaku <span class="text-red-500">*</span></label>
              <input type="date" v-model="form.effectiveDate" :disabled="saving" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-orange-500 shadow-inner" />
            </div>
          </div>

          <div class="space-y-1">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Keterangan / Dasar Hukum</label>
            <input v-model="form.description" :disabled="saving" class="w-full border rounded-lg px-3 py-2 text-sm text-slate-700 outline-none focus:border-orange-500 shadow-inner" placeholder="PMK-131/2024 - berlaku sejak Jan 2025..." />
          </div>

          <div class="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-start gap-2">
            <i class="pi pi-info-circle text-blue-600 mt-0.5 text-xs"></i>
            <div class="text-[10px] text-blue-800 font-medium">
              Kode pajak ini akan tersedia di semua transaksi: <b>Sales Order, Purchase Order, Invoice, dan Journal Entry</b>. Pastikan kode sesuai regulasi DJP yang berlaku.
            </div>
          </div>

          <div v-if="formError" class="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 border border-red-200">{{ formError }}</div>
        </div>

        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
          <Button label="Batal" severity="secondary" :disabled="saving" @click="dialogOpen = false" class="bg-white border text-slate-700 font-bold px-5 shadow-sm" />
          <Button :label="editId ? 'Simpan Perubahan' : 'Tambahkan Kode Pajak'"
            :loading="saving" :disabled="saving || !form.code || !form.name || form.rate === '' || !form.effectiveDate"
            @click="submit"
            class="bg-orange-500 border-none text-white font-bold px-6 shadow-sm hover:bg-orange-600"
            icon="pi pi-check" />
        </div>
      </div>
    </div>

    <!-- Confirm Deactivate -->
    <div v-if="confirmDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div class="w-full max-w-sm rounded-2xl border bg-white shadow-2xl animate-fade-in-up">
        <div class="p-5 border-b bg-amber-50 rounded-t-2xl">
          <div class="font-black text-amber-900 flex items-center gap-2">
            <i class="pi pi-exclamation-triangle text-amber-600"></i> Nonaktifkan Kode Pajak?
          </div>
        </div>
        <div class="p-5 text-sm text-slate-700">
          Kode <strong class="font-mono text-rose-700">{{ confirmTarget?.code }}</strong> — {{ confirmTarget?.name }} akan dinonaktifkan.
          <div class="mt-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3 font-medium">
            Kode ini tidak akan dapat dipilih di transaksi baru. Transaksi yang sudah dibuat tidak terpengaruh.
          </div>
        </div>
        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
          <Button label="Batalkan" severity="secondary" @click="confirmDialog = false" class="bg-white border text-slate-700 font-bold px-4 shadow-sm" />
          <Button label="Nonaktifkan" :loading="deactivating" @click="doDeactivate"
            class="bg-rose-600 border-none text-white font-bold px-4 shadow-sm" icon="pi pi-ban" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type TaxCode = {
  id: string; code: string; name: string;
  rate: string | number; effectiveDate: string; isActive: boolean;
};

const api = useApi();

const taxCodes = ref<TaxCode[]>([]);
const loading = ref(false);
const saving = ref(false);
const deactivating = ref(false);
const dialogOpen = ref(false);
const confirmDialog = ref(false);
const confirmTarget = ref<TaxCode | null>(null);
const editId = ref('');
const formError = ref('');

const search = ref('');
const activeCategory = ref('');
const statusFilter = ref('');

const form = reactive({
  code: '', name: '', rate: '' as string | number,
  effectiveDate: new Date().toISOString().slice(0, 10),
  category: 'PPN', description: ''
});

const CATEGORIES = ['PPN', 'PPh21', 'PPh22', 'PPh23', 'PPh42', 'PPh Badan', 'Cukai', 'Bea Masuk', 'Lainnya'];

const DESCRIPTIONS: Record<string, string> = {
  'PPN12': 'Tarif PPN standar berlaku sejak 1 Jan 2025 per PMK-131/2024',
  'PPN11': 'Tarif PPN lama yang berlaku 1 Apr 2022 s/d 31 Des 2024',
  'PPN0': 'Untuk ekspor barang/jasa dan transaksi tertentu yang dibebaskan',
  'PPN-BKP-TERTENTU': 'DPP 11/12 dari harga jual untuk masa transisi PPN',
  'PPH21-5': 'Penghasilan Kena Pajak s/d Rp60 juta/tahun',
  'PPH21-15': 'PKP Rp60 juta s/d Rp250 juta/tahun (TER)',
  'PPH21-25': 'PKP Rp250 juta s/d Rp500 juta/tahun',
  'PPH22-15': 'Pembelian barang dari badan usaha industri oleh BUMN/Bendaharawan',
  'PPH22-30': 'Vendor tidak memiliki NPWP, tarif 2x lipat',
  'PPH23-2': 'Pemotongan atas jasa teknik, manajemen, konsultan',
  'PPH23-15': 'Pemotongan atas dividen, bunga, dan royalti',
  'PPH23-4': 'Tarif 2x untuk penerima jasa yang tidak ber-NPWP',
  'PPH42-05': 'Jasa konstruksi sederhana dengan sertifikat kompetensi',
  'PPH42-10': 'Penghasilan dari persewaan tanah dan/atau bangunan (Final)',
  'PPH42-25': 'PP 9 Tahun 2022 - Jasa konstruksi non-kualifikasi kecil',
  'PPH-BADAN-22': 'Tarif Pajak Penghasilan Badan umum per UU HPP',
  'PPH-UMKM-05': 'PP 55/2022 - Omzet s/d Rp4,8 Miliar/tahun',
  'BEA-MASUK-5': 'Bea masuk untuk imported raw materials F&B',
  'TAX-EXEMPT': 'Transaksi dibebaskan pajak: ekspor, subsidi pemerintah',
};

const getDescription = (code: string) => DESCRIPTIONS[code] ?? '';

const CATEGORY_COLORS: Record<string, string> = {
  'PPN': 'bg-blue-50 text-blue-700 border-blue-200',
  'PPh21': 'bg-violet-50 text-violet-700 border-violet-200',
  'PPh22': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  'PPh23': 'bg-cyan-50 text-cyan-700 border-cyan-200',
  'PPh42': 'bg-teal-50 text-teal-700 border-teal-200',
  'PPh Badan': 'bg-slate-100 text-slate-700 border-slate-300',
  'Cukai': 'bg-amber-50 text-amber-700 border-amber-200',
  'Bea Masuk': 'bg-orange-50 text-orange-700 border-orange-200',
  'Lainnya': 'bg-slate-100 text-slate-600 border-slate-200',
};

const categoryColor = (cat: string) => CATEGORY_COLORS[cat] ?? 'bg-slate-100 text-slate-600 border-slate-200';

const detectCategory = (code: string): string => {
  if (code.startsWith('PPN')) return 'PPN';
  if (code.startsWith('PPH21')) return 'PPh21';
  if (code.startsWith('PPH22')) return 'PPh22';
  if (code.startsWith('PPH23')) return 'PPh23';
  if (code.startsWith('PPH42')) return 'PPh42';
  if (code.startsWith('PPH-BADAN') || code.startsWith('PPH-UMKM')) return 'PPh Badan';
  if (code.startsWith('CUKAI')) return 'Cukai';
  if (code.startsWith('BEA')) return 'Bea Masuk';
  return 'Lainnya';
};

const PRESETS = [
  { code: 'PPN12', name: 'PPN 12%', rate: 12, effectiveDate: '2025-01-01', category: 'PPN' },
  { code: 'PPN0', name: 'PPN 0% / Bebas', rate: 0, effectiveDate: '2022-04-01', category: 'PPN' },
  { code: 'PPH23-2', name: 'PPh 23 Jasa 2%', rate: 2, effectiveDate: '2020-01-01', category: 'PPh23' },
  { code: 'PPH22-15', name: 'PPh 22 (1.5%)', rate: 1.5, effectiveDate: '2020-01-01', category: 'PPh22' },
];

const fillPreset = (p: typeof PRESETS[0]) => {
  form.code = p.code;
  form.name = p.name;
  form.rate = p.rate;
  form.effectiveDate = p.effectiveDate;
  form.category = p.category;
};

const categoryStats = computed(() => {
  const catColorMap: Record<string, string> = {
    'PPN': '#3b82f6', 'PPh21': '#8b5cf6', 'PPh22': '#6366f1', 'PPh23': '#06b6d4',
    'PPh42': '#14b8a6', 'PPh Badan': '#64748b', 'Cukai': '#f59e0b',
    'Bea Masuk': '#f97316', 'Lainnya': '#94a3b8',
  };
  return CATEGORIES.map(cat => ({
    label: cat,
    count: taxCodes.value.filter(t => detectCategory(t.code) === cat).length,
    color: catColorMap[cat] ?? '#94a3b8',
  })).filter(c => c.count > 0);
});

const filteredTaxes = computed(() => {
  let list = taxCodes.value;
  if (activeCategory.value) list = list.filter(t => detectCategory(t.code) === activeCategory.value);
  if (statusFilter.value === 'active') list = list.filter(t => t.isActive);
  if (statusFilter.value === 'inactive') list = list.filter(t => !t.isActive);
  if (search.value.trim()) {
    const q = search.value.toLowerCase();
    list = list.filter(t => t.code.toLowerCase().includes(q) || t.name.toLowerCase().includes(q));
  }
  return list;
});

const pad = (n: number) => String(n).padStart(2, '0');
const MONTHS_ID = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
const formatDate = (iso: string) => {
  if (!iso) return '-';
  const d = new Date(iso);
  return `${pad(d.getDate())} ${MONTHS_ID[d.getMonth()]} ${d.getFullYear()}`;
};

const load = async () => {
  loading.value = true;
  try {
    // Try finance endpoint first, fallback to core
    let res = await api.get('/finance/tax-codes');
    let codes = res.data?.taxCodes ?? res.taxCodes ?? [];
    if (!codes.length) {
      res = await api.get('/core/tax-codes');
      codes = res.data?.taxCodes ?? [];
    }
    taxCodes.value = codes.sort((a: TaxCode, b: TaxCode) => String(a.code).localeCompare(String(b.code)));
  } catch (e) { console.warn(e); }
  finally { loading.value = false; }
};

const openCreate = () => {
  editId.value = '';
  form.code = ''; form.name = ''; form.rate = ''; form.category = 'PPN';
  form.effectiveDate = new Date().toISOString().slice(0, 10);
  form.description = '';
  formError.value = '';
  dialogOpen.value = true;
};

const openEdit = (t: TaxCode) => {
  editId.value = t.id;
  form.code = t.code;
  form.name = t.name;
  form.rate = Number(t.rate);
  form.effectiveDate = t.effectiveDate?.slice(0, 10) ?? '';
  form.category = detectCategory(t.code);
  form.description = getDescription(t.code);
  formError.value = '';
  dialogOpen.value = true;
};

const submit = async () => {
  saving.value = true;
  formError.value = '';
  try {
    const payload = {
      code: String(form.code).toUpperCase().trim(),
      name: form.name.trim(),
      rate: Number(form.rate),
      effectiveDate: new Date(form.effectiveDate).toISOString(),
    };
    if (editId.value) {
      await api.patch(`/finance/tax-codes/${editId.value}`, { name: payload.name, rate: payload.rate });
    } else {
      // Try finance endpoint, fallback to core
      try {
        await api.post('/finance/tax-codes', payload);
      } catch {
        await api.post('/core/tax-codes', payload);
      }
    }
    dialogOpen.value = false;
    await load();
  } catch (e: any) {
    formError.value = e?.response?.data?.message ?? e?.message ?? 'Gagal menyimpan kode pajak';
  } finally { saving.value = false; }
};

const confirmDeactivate = (t: TaxCode) => {
  confirmTarget.value = t;
  confirmDialog.value = true;
};

const doDeactivate = async () => {
  if (!confirmTarget.value) return;
  deactivating.value = true;
  try {
    await api.patch(`/finance/tax-codes/${confirmTarget.value.id}`, { isActive: false });
    confirmDialog.value = false;
    await load();
  } catch (e: any) {
    formError.value = e?.response?.data?.message ?? 'Gagal menonaktifkan';
    confirmDialog.value = false;
  } finally { deactivating.value = false; }
};

const reactivate = async (t: TaxCode) => {
  try {
    await api.patch(`/finance/tax-codes/${t.id}`, { isActive: true });
    await load();
  } catch (e) { console.warn(e); }
};

onMounted(load);
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
</style>