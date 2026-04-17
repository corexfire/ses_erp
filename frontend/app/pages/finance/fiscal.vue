<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-6 shadow-sm border-l-4 border-l-violet-600 relative overflow-hidden">
      <div class="absolute right-4 top-4 opacity-5 pointer-events-none">
        <i class="pi pi-calendar text-[140px] text-violet-900"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-start gap-5 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-calendar text-violet-600"></i> Manajemen Tahun Fiskal (Fiscal Year)
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
            Konfigurasi kalender akuntansi perusahaan: Tahun Fiskal, Periode Bulanan, dan kontrol tutup buku. Setiap Tahun Fiskal otomatis menghasilkan 12 Periode Akuntansi.
          </div>
        </div>
        <Button label="+ Buat Tahun Fiskal" size="small" icon="pi pi-plus"
          class="bg-violet-600 text-white border-none font-bold shadow-sm hover:bg-violet-700 shrink-0"
          @click="openCreate" />
      </div>
    </div>

    <!-- Summary Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-white border rounded-xl p-5 shadow-sm">
        <div class="text-3xl font-black text-violet-600">{{ fiscalYears.length }}</div>
        <div class="text-xs font-bold text-slate-500 mt-1 uppercase tracking-widest">Total Tahun Fiskal</div>
      </div>
      <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-5 shadow-sm">
        <div class="text-3xl font-black text-emerald-700">{{ openYears.length }}</div>
        <div class="text-xs font-bold text-emerald-700 mt-1 uppercase tracking-widest">Tahun Aktif (Open)</div>
      </div>
      <div class="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
        <div class="text-3xl font-black text-slate-500">{{ closedYears.length }}</div>
        <div class="text-xs font-bold text-slate-500 mt-1 uppercase tracking-widest">Tahun Ditutup</div>
      </div>
      <div class="bg-violet-50 border border-violet-200 rounded-xl p-5 shadow-sm">
        <div class="text-3xl font-black text-violet-700">{{ totalPeriods }}</div>
        <div class="text-xs font-bold text-violet-700 mt-1 uppercase tracking-widest">Total Periode Akuntansi</div>
      </div>
    </div>

    <!-- Fiscal Years Table -->
    <div class="rounded-xl border bg-white shadow-sm overflow-hidden">
      <div class="p-4 border-b bg-slate-50 flex items-center justify-between">
        <div class="font-black text-slate-700 uppercase tracking-widest text-xs flex items-center gap-2">
          <i class="pi pi-list text-violet-600"></i> Daftar Tahun Fiskal
        </div>
        <Button severity="secondary" size="small" :disabled="loading" icon="pi pi-refresh" @click="load" outlined class="h-8 w-8" />
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-violet-900 text-left text-[11px] text-white uppercase tracking-widest font-bold">
            <tr>
              <th class="px-5 py-3 w-32">Kode FY</th>
              <th class="px-4 py-3">Nama Tahun Fiskal</th>
              <th class="px-4 py-3 border-l text-center w-48">Rentang Waktu (Duration)</th>
              <th class="px-4 py-3 border-l text-center w-28">Periode</th>
              <th class="px-4 py-3 border-l text-center w-36">Status Tutup Buku</th>
              <th class="px-4 py-3 border-l text-center w-36">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="6" class="px-4 py-16 text-center text-slate-400">
                <i class="pi pi-spinner pi-spin mr-2 text-violet-500"></i> Memuat konfigurasi kalender akuntansi...
              </td>
            </tr>
            <template v-for="fy in fiscalYears" v-else :key="fy.id">
              <tr class="border-t transition hover:bg-violet-50/20"
                :class="fy.isClosed ? 'bg-slate-50/60 opacity-80' : ''">
                <td class="px-5 py-3 align-middle">
                  <span class="font-mono font-black text-sm" :class="fy.isClosed ? 'text-slate-500' : 'text-violet-700'">
                    {{ fy.code }}
                  </span>
                </td>
                <td class="px-4 py-3 align-middle">
                  <div class="font-bold text-slate-800">{{ fy.name }}</div>
                  <div v-if="isCurrentYear(fy)" class="text-[10px] font-black text-emerald-600 mt-0.5 flex items-center gap-1">
                    <span class="h-1.5 w-1.5 bg-emerald-500 rounded-full inline-block animate-pulse"></span>
                    TAHUN BERJALAN
                  </div>
                </td>
                <td class="px-4 py-3 border-l text-center align-middle">
                  <div class="text-xs font-semibold text-slate-700">{{ formatDate(fy.startDate) }}</div>
                  <div class="text-[10px] text-slate-400 font-bold tracking-widest">s/d</div>
                  <div class="text-xs font-semibold text-slate-700">{{ formatDate(fy.endDate) }}</div>
                </td>
                <td class="px-4 py-3 border-l text-center align-middle">
                  <button
                    class="rounded-full px-3 py-1 text-xs font-bold transition-all border"
                    :class="expandedYearId === fy.id
                      ? 'bg-violet-600 text-white border-violet-600'
                      : 'bg-slate-100 text-slate-600 border-slate-200 hover:border-violet-400 hover:text-violet-700'"
                    @click="togglePeriods(fy)"
                  >
                    {{ fy.periods?.length ?? 0 }} bulan
                    <i :class="expandedYearId === fy.id ? 'pi pi-chevron-up' : 'pi pi-chevron-down'" class="text-[9px] ml-1"></i>
                  </button>
                </td>
                <td class="px-4 py-3 border-l text-center align-middle">
                  <span
                    class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest border"
                    :class="fy.isClosed
                      ? 'bg-slate-100 text-slate-600 border-slate-300'
                      : fy.isActive
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                        : 'bg-amber-50 text-amber-700 border-amber-300'"
                  >
                    <span class="h-1.5 w-1.5 rounded-full inline-block"
                      :class="fy.isClosed ? 'bg-slate-400' : fy.isActive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'">
                    </span>
                    {{ fy.isClosed ? 'Ditutup' : fy.isActive ? 'Aktif' : 'Tidak Aktif' }}
                  </span>
                </td>
                <td class="px-4 py-3 border-l text-center align-middle">
                  <Button
                    v-if="!fy.isClosed"
                    label="Tutup Tahun"
                    size="small"
                    outlined
                    class="text-[10px] h-7 px-3 font-bold text-rose-600 border-rose-300 hover:bg-rose-600 hover:text-white transition-colors"
                    @click="confirmClose(fy)"
                  />
                  <span v-else class="text-[10px] text-slate-400 font-bold flex items-center justify-center gap-1">
                    <i class="pi pi-lock text-[9px]"></i> Final
                  </span>
                </td>
              </tr>

              <!-- Expanded Periods Row -->
              <tr v-if="expandedYearId === fy.id" :key="`${fy.id}-periods`" class="border-t bg-violet-50/20">
                <td colspan="6" class="px-5 py-4">
                  <div class="mb-3 flex items-center justify-between">
                    <div class="text-xs font-black text-violet-800 uppercase tracking-widest">
                      📅 Periode Akuntansi — {{ fy.name }} ({{ fy.periods?.length ?? 0 }} bulan)
                    </div>
                    <button class="text-xs text-slate-400 hover:text-slate-600 font-bold" @click="expandedYearId = null">✕ Tutup</button>
                  </div>
                  <div class="grid grid-cols-3 gap-2 md:grid-cols-6 lg:grid-cols-12">
                    <div
                      v-for="p in (fy.periods ?? [])"
                      :key="p.id"
                      class="rounded-lg border text-center py-2 px-1 shadow-sm transition hover:shadow-md"
                      :class="p.isOpen
                        ? 'bg-white border-emerald-300 hover:border-emerald-400'
                        : 'bg-slate-50 border-slate-200 opacity-60'"
                    >
                      <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest">P{{ p.periodNo }}</div>
                      <div class="text-xs font-black text-slate-700 mt-0.5">{{ monthShort(p.startDate) }}</div>
                      <div class="mt-1.5 flex justify-center">
                        <span
                          class="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full border"
                          :class="p.isOpen ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-100 text-slate-400 border-slate-200'"
                        >
                          {{ p.isOpen ? 'BUKA' : 'TUTUP' }}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </template>

            <tr v-if="!loading && fiscalYears.length === 0">
              <td colspan="6" class="px-4 py-16 text-center text-slate-400 italic">
                Belum ada konfigurasi Tahun Fiskal. Klik "+ Buat Tahun Fiskal" untuk memulai.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="error" class="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 border border-red-200 flex items-center gap-2">
      <i class="pi pi-exclamation-circle"></i> {{ error }}
    </div>

    <!-- Create Dialog -->
    <div v-if="createDialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div class="w-full max-w-lg rounded-2xl border bg-white shadow-2xl flex flex-col animate-fade-in-up">
        <div class="p-5 border-b bg-slate-50 flex justify-between items-center rounded-t-2xl">
          <div>
            <div class="text-lg font-black text-slate-800 flex items-center gap-2">
              <i class="pi pi-calendar-plus text-violet-600"></i> Buat Tahun Fiskal Baru
            </div>
            <div class="text-xs text-slate-500 mt-0.5 font-medium">12 Periode Akuntansi akan dibuat otomatis.</div>
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-100 w-8 h-8 rounded-full font-bold" @click="createDialogOpen = false">✕</button>
        </div>

        <div class="p-6 space-y-5 overflow-auto">
          <!-- Quick fill buttons -->
          <div class="space-y-2">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Isi Otomatis (Quick Fill)</label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="y in quickYears" :key="y"
                class="rounded-lg border px-3 py-1.5 text-xs font-black transition-all"
                :class="form.code === `FY${y}`
                  ? 'bg-violet-600 text-white border-violet-600'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-violet-400 hover:text-violet-700'"
                @click="fillYear(y)"
              >
                FY{{ y }}
              </button>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Kode <span class="text-red-500">*</span></label>
              <input v-model="form.code" :disabled="saving" class="w-full border rounded-lg px-3 py-2 text-sm font-black font-mono text-slate-800 uppercase outline-none focus:border-violet-500 shadow-inner" placeholder="FY2027" />
              <div class="text-[9px] text-slate-400">Konvensi: FY + Tahun. Contoh: FY2027</div>
            </div>
            <div class="space-y-1">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Nama <span class="text-red-500">*</span></label>
              <input v-model="form.name" :disabled="saving" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-violet-500 shadow-inner" placeholder="Tahun Fiskal 2027" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tgl Mulai <span class="text-red-500">*</span></label>
              <input type="date" v-model="form.startDate" :disabled="saving" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-violet-500 shadow-inner" />
            </div>
            <div class="space-y-1">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tgl Selesai <span class="text-red-500">*</span></label>
              <input type="date" v-model="form.endDate" :disabled="saving" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-violet-500 shadow-inner" />
            </div>
          </div>

          <!-- Period preview -->
          <div v-if="periodPreviewCount > 0" class="rounded-xl bg-violet-50 border border-violet-200 px-4 py-3 text-sm text-violet-800 flex items-center gap-3">
            <i class="pi pi-info-circle text-violet-600"></i>
            <span>Akan otomatis membuat <strong>{{ periodPreviewCount }} Periode Akuntansi</strong> ({{ formatDate(form.startDate) }} s/d {{ formatDate(form.endDate) }}).</span>
          </div>

          <div v-if="formError" class="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 border border-red-200">{{ formError }}</div>
        </div>

        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
          <Button label="Batal" severity="secondary" :disabled="saving" @click="createDialogOpen = false" class="bg-white border text-slate-700 font-bold px-5 shadow-sm" />
          <Button
            label="Buat & Aktifkan"
            :loading="saving"
            :disabled="saving || !form.code || !form.name || !form.startDate || !form.endDate"
            @click="create"
            class="bg-violet-600 border-none text-white font-bold px-6 shadow-sm hover:bg-violet-700"
            icon="pi pi-check"
          />
        </div>
      </div>
    </div>

    <!-- Confirm Close Dialog -->
    <div v-if="confirmCloseDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div class="w-full max-w-sm rounded-2xl border bg-white shadow-2xl animate-fade-in-up">
        <div class="p-5 border-b bg-rose-50 rounded-t-2xl">
          <div class="text-base font-black text-rose-900 flex items-center gap-2">
            <i class="pi pi-exclamation-triangle text-rose-600"></i>
            Tutup Tahun Fiskal?
          </div>
        </div>
        <div class="p-5 space-y-3">
          <div class="text-sm text-slate-700">
            Tahun fiskal <strong class="font-black text-rose-700">{{ confirmCloseTarget?.code }} — {{ confirmCloseTarget?.name }}</strong> akan ditutup permanen.
          </div>
          <div class="rounded-xl bg-amber-50 border border-amber-200 p-3.5 text-xs text-amber-800 space-y-1.5">
            <div class="font-black text-amber-900">⚠️ Dampak Penutupan:</div>
            <ul class="list-disc list-inside space-y-0.5 font-medium">
              <li>Semua 12 periode akuntansi akan dikunci (Closed)</li>
              <li>Tidak dapat membuat Jurnal baru di tahun ini</li>
              <li>Laporan keuangan tahun ini akan dibekukan</li>
              <li><strong>Tindakan ini tidak dapat dibatalkan</strong></li>
            </ul>
          </div>
        </div>
        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
          <Button label="Batalkan" severity="secondary" @click="confirmCloseDialog = false" class="bg-white border text-slate-700 font-bold px-5 shadow-sm" />
          <Button label="Ya, Tutup Permanen" :loading="closing" @click="doClose"
            class="bg-rose-600 border-none text-white font-bold px-5 shadow-sm hover:bg-rose-700" icon="pi pi-lock" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type AccountingPeriod = {
  id: string; periodNo: number; startDate: string; endDate: string; isOpen: boolean;
};
type FiscalYear = {
  id: string; code: string; name: string;
  startDate: string; endDate: string;
  isActive: boolean; isClosed: boolean;
  periods?: AccountingPeriod[];
};

const api = useApi();
const auth = useAuthStore();

const loading = ref(false);
const saving = ref(false);
const closing = ref(false);
const error = ref<string | null>(null);
const formError = ref<string | null>(null);

const fiscalYears = ref<FiscalYear[]>([]);
const openYears = computed(() => fiscalYears.value.filter(fy => !fy.isClosed));
const closedYears = computed(() => fiscalYears.value.filter(fy => fy.isClosed));
const totalPeriods = computed(() => fiscalYears.value.reduce((sum, fy) => sum + (fy.periods?.length ?? 0), 0));

const expandedYearId = ref<string | null>(null);
const createDialogOpen = ref(false);
const confirmCloseDialog = ref(false);
const confirmCloseTarget = ref<FiscalYear | null>(null);

const form = reactive({ code: '', name: '', startDate: '', endDate: '' });

const currentYear = new Date().getFullYear();
const quickYears = [currentYear - 1, currentYear, currentYear + 1, currentYear + 2];

const MONTHS_ID = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

const formatDate = (iso: string) => {
  if (!iso) return '-';
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, '0')} ${MONTHS_ID[d.getMonth()]} ${d.getFullYear()}`;
};

const monthShort = (iso: string) => {
  const d = new Date(iso);
  return MONTHS_ID[d.getMonth()];
};

const isCurrentYear = (fy: FiscalYear) => {
  if (fy.isClosed) return false;
  const s = new Date(fy.startDate).getFullYear();
  return s === currentYear;
};

const periodPreviewCount = computed(() => {
  if (!form.startDate || !form.endDate) return 0;
  const start = new Date(form.startDate);
  const end = new Date(form.endDate);
  if (end <= start) return 0;
  return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
});

const fillYear = (year: number) => {
  form.code = `FY${year}`;
  form.name = `Tahun Fiskal ${year}`;
  form.startDate = `${year}-01-01`;
  form.endDate = `${year}-12-31`;
};

const togglePeriods = (fy: FiscalYear) => {
  expandedYearId.value = expandedYearId.value === fy.id ? null : fy.id;
};

const load = async () => {
  loading.value = true;
  error.value = null;
  try {
    // Primary: core endpoint (authoritative — has full period generation)
    const res = await api.get('/core/fiscal-years');
    let years = res.data?.fiscalYears ?? res.fiscalYears ?? [];

    // Fallback to finance endpoint
    if (!years.length) {
      const r2 = await api.get('/finance/fiscal');
      years = r2.data?.fiscalYears ?? r2.fiscalYears ?? [];
    }

    // Sort descending by startDate
    fiscalYears.value = years.sort((a: FiscalYear, b: FiscalYear) =>
      new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );
  } catch (e: any) {
    error.value = e?.response?.data?.message ?? e?.message ?? 'Gagal memuat data Tahun Fiskal';
  } finally {
    loading.value = false;
  }
};

const openCreate = () => {
  fillYear(currentYear + 1);
  formError.value = null;
  createDialogOpen.value = true;
};

const create = async () => {
  if (!form.code || !form.name || !form.startDate || !form.endDate) return;
  if (new Date(form.endDate) <= new Date(form.startDate)) {
    formError.value = 'Tanggal selesai harus setelah tanggal mulai';
    return;
  }
  saving.value = true;
  formError.value = null;
  try {
    await api.post('/core/fiscal-years', {
      code: form.code.trim().toUpperCase(),
      name: form.name.trim(),
      startDate: new Date(form.startDate).toISOString(),
      endDate: new Date(form.endDate + 'T23:59:59.999Z').toISOString(),
    });
    createDialogOpen.value = false;
    await load();
  } catch (e: any) {
    formError.value = e?.response?.data?.message ?? e?.message ?? 'Gagal membuat tahun fiskal';
  } finally {
    saving.value = false;
  }
};

const confirmClose = (fy: FiscalYear) => {
  confirmCloseTarget.value = fy;
  confirmCloseDialog.value = true;
};

const doClose = async () => {
  if (!confirmCloseTarget.value) return;
  closing.value = true;
  try {
    await api.patch(`/core/fiscal-years/${confirmCloseTarget.value.id}/close`);
    confirmCloseDialog.value = false;
    expandedYearId.value = null;
    await load();
  } catch (e: any) {
    error.value = e?.response?.data?.message ?? 'Gagal menutup tahun fiskal';
    confirmCloseDialog.value = false;
  } finally {
    closing.value = false;
  }
};

onMounted(load);
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
</style>