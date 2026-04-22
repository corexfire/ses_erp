<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-4 shadow-sm border-l-4 border-l-orange-500 relative overflow-hidden">
      <div class="absolute right-[-12px] top-[-12px] opacity-5 pointer-events-none">
        <i class="pi pi-calendar text-[150px] text-orange-900"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-start gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-calendar text-orange-600"></i> Manajemen Shift Kerja
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
            Kelola jadwal shift kerja karyawan F&B — Pabrik 24 jam (Shift A/B/C), Kantor Reguler, Flexi/WFH, Shift Split Driver/Sales, hingga Lembur. Terintegrasi dengan Absensi & Penggajian.
          </div>
        </div>
        <Button label="+ Tambah Shift" size="small" icon="pi pi-plus"
          class="bg-orange-600 text-white border-none font-bold shadow-sm hover:bg-orange-700 shrink-0"
          @click="openCreate" />
      </div>
    </div>

    <!-- Stats Row -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-orange-50 border border-orange-200 rounded-xl p-4 shadow-sm">
        <div class="text-3xl font-black text-orange-700">{{ shifts.length }}</div>
        <div class="text-[10px] font-black text-orange-600 mt-0.5 uppercase tracking-widest">Total Shift</div>
      </div>
      <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-4 shadow-sm">
        <div class="text-3xl font-black text-emerald-700">{{ activeShifts }}</div>
        <div class="text-[10px] font-black text-emerald-600 mt-0.5 uppercase tracking-widest">Shift Aktif</div>
      </div>
      <div class="bg-cyan-50 border border-cyan-200 rounded-xl p-4 shadow-sm">
        <div class="text-3xl font-black text-cyan-700">{{ flexiShifts }}</div>
        <div class="text-[10px] font-black text-cyan-600 mt-0.5 uppercase tracking-widest">Shift Flexi</div>
      </div>
      <div class="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm">
        <div class="text-lg font-black text-slate-700">{{ avgHours }}j</div>
        <div class="text-[10px] font-black text-slate-500 mt-0.5 uppercase tracking-widest">Rata-rata Jam</div>
      </div>
    </div>

    <!-- 24-hour Visual Timeline -->
    <div class="bg-white border rounded-xl p-5 shadow-sm">
      <div class="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-4">🕐 Visualisasi Jadwal Shift (24 Jam)</div>
      <div class="relative">
        <!-- Hour axis -->
        <div class="flex border-b border-slate-200 mb-2">
          <div v-for="h in 25" :key="h" class="flex-1 text-[8px] text-slate-400 font-bold text-center" style="min-width:0">
            {{ h - 1 === 0 ? '00' : h - 1 === 24 ? '' : String(h-1).padStart(2,'0') }}
          </div>
        </div>
        <!-- Shift bars -->
        <div v-for="sh in activeShiftsList" :key="sh.id" class="mb-2 flex items-center gap-2">
          <div class="text-[9px] font-black text-slate-600 w-24 text-right shrink-0 truncate">{{ sh.code }}</div>
          <div class="flex-1 relative h-6 bg-slate-100 rounded-lg overflow-hidden">
            <div class="absolute h-full rounded-lg flex items-center justify-center"
              :style="{
                left: `${shiftLeft(sh)}%`,
                width: `${shiftWidth(sh)}%`,
                backgroundColor: shiftColor(sh) + 'cc',
              }">
              <span class="text-white font-black text-[9px] px-1 truncate">{{ sh.startTime }}–{{ sh.endTime }}</span>
            </div>
          </div>
          <div class="text-[9px] font-bold text-slate-400 w-8 shrink-0">{{ durHours(sh) }}j</div>
        </div>
      </div>
    </div>

    <!-- Shift Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <div v-if="loading" v-for="i in 6" :key="i" class="bg-white border rounded-xl p-5 animate-pulse h-44"></div>

      <div v-for="sh in filteredShifts" v-else :key="sh.id"
        class="bg-white border rounded-xl shadow-sm overflow-hidden hover:shadow-md transition group"
        :class="!sh.isActive ? 'opacity-60' : ''">
        <!-- Color bar top -->
        <div class="h-1.5 w-full" :style="{ backgroundColor: shiftColor(sh) }"></div>

        <div class="p-5 space-y-3">
          <div class="flex items-start justify-between gap-2">
            <div>
              <div class="font-black text-slate-800 text-base leading-tight">{{ sh.name }}</div>
              <div class="font-mono text-[10px] text-slate-400 mt-0.5">{{ sh.code }}</div>
            </div>
            <div class="flex flex-col items-end gap-1 shrink-0">
              <span v-if="sh.isFlexi" class="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border bg-cyan-50 text-cyan-700 border-cyan-300">FLEXI</span>
              <span :class="sh.isActive ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-slate-100 text-slate-500 border-slate-300'"
                class="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border">
                {{ sh.isActive ? 'AKTIF' : 'NONAKTIF' }}
              </span>
            </div>
          </div>

          <!-- Time Visual -->
          <div class="flex items-center gap-3">
            <div class="text-center">
              <div class="text-[9px] text-slate-400 font-bold uppercase">Mulai</div>
              <div class="font-black text-xl font-mono" :style="{ color: shiftColor(sh) }">{{ sh.startTime }}</div>
            </div>
            <div class="flex-1 flex items-center gap-1">
              <div class="flex-1 h-0.5 bg-slate-200 relative">
                <div class="absolute inset-0 rounded-full" :style="{ backgroundColor: shiftColor(sh) + '88' }"></div>
              </div>
              <div class="text-[9px] text-slate-400 font-black whitespace-nowrap">{{ durHours(sh) }}j {{ durMins(sh) > 0 ? durMins(sh) + 'm' : '' }}</div>
              <div class="flex-1 h-0.5 bg-slate-200 relative">
                <div class="absolute inset-0 rounded-full" :style="{ backgroundColor: shiftColor(sh) + '88' }"></div>
              </div>
            </div>
            <div class="text-center">
              <div class="text-[9px] text-slate-400 font-bold uppercase">Selesai</div>
              <div class="font-black text-xl font-mono text-slate-700">{{ sh.endTime }}</div>
            </div>
          </div>

          <!-- Description from meta -->
          <div class="text-[11px] text-slate-500 font-medium leading-relaxed border-t pt-2">
            {{ shiftDesc(sh.code) }}
          </div>

          <!-- Applicable dept badge -->
          <div class="flex flex-wrap gap-1">
            <span v-for="dept in shiftDepts(sh.code)" :key="dept"
              class="text-[8px] font-black bg-slate-100 text-slate-500 border border-slate-200 rounded px-1.5 py-0.5 uppercase tracking-wide">
              {{ dept }}
            </span>
          </div>
        </div>

        <!-- Actions footer -->
        <div class="border-t bg-slate-50 p-3 flex justify-between items-center opacity-0 group-hover:opacity-100 transition">
          <Button label="Edit" size="small" outlined icon="pi pi-pencil"
            class="text-[9px] h-7 px-2 font-bold text-orange-600 border-orange-200 hover:bg-orange-600 hover:text-white"
            @click="openEdit(sh)" />
          <Button :label="sh.isActive ? 'Nonaktifkan' : 'Aktifkan'" size="small" outlined
            :class="sh.isActive ? 'text-rose-600 border-rose-200 hover:bg-rose-600 hover:text-white' : 'text-emerald-600 border-emerald-200 hover:bg-emerald-600 hover:text-white'"
            class="text-[9px] h-7 px-2 font-bold"
            @click="toggleActive(sh)" />
        </div>
      </div>
    </div>

    <!-- Filter pills for active/inactive -->
    <div class="flex gap-2 items-center bg-white border rounded-xl p-3 shadow-sm">
      <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tampilkan:</span>
      <button v-for="f in ['SEMUA','AKTIF','NON-AKTIF','FLEXI']" :key="f"
        :class="shiftFilter === f ? 'bg-orange-600 text-white border-orange-600' : 'bg-white text-slate-600 border-slate-200 hover:border-orange-400'"
        class="rounded-full border px-3 py-1 text-[10px] font-black transition"
        @click="shiftFilter = f">{{ f }}</button>
    </div>

    <!-- Create / Edit Dialog -->
    <div v-if="formDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div class="w-full max-w-xl rounded-2xl border bg-white shadow-2xl flex flex-col animate-fade-in-up">
        <div class="p-5 border-b bg-slate-50 flex justify-between items-center rounded-t-2xl">
          <div>
            <div class="text-lg font-black text-slate-800 flex items-center gap-2">
              <i class="pi pi-calendar text-orange-600"></i>
              {{ editId ? 'Edit Shift Kerja' : 'Tambah Shift Baru' }}
            </div>
            <div class="text-xs text-slate-500 mt-0.5">Data shift digunakan pada modul Absensi, Penjadwalan, dan Payroll.</div>
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-100 w-8 h-8 rounded-full font-bold" @click="formDialog = false">✕</button>
        </div>

        <div class="p-4 space-y-5">
          <!-- Preview timeline -->
          <div class="rounded-xl border border-orange-200 bg-orange-50 p-4">
            <div class="text-[10px] font-black text-orange-700 uppercase tracking-widest mb-2">Preview Jadwal</div>
            <div class="flex items-center gap-3">
              <div class="text-center">
                <div class="text-[9px] text-orange-500 font-bold">MULAI</div>
                <div class="text-2xl font-black font-mono text-orange-900">{{ form.startTime || '—:——' }}</div>
              </div>
              <div class="flex-1 text-center">
                <div class="text-sm font-black text-orange-700">{{ previewDuration }}</div>
                <div class="h-1 bg-orange-300 rounded-full mt-1"></div>
              </div>
              <div class="text-center">
                <div class="text-[9px] text-orange-500 font-bold">SELESAI</div>
                <div class="text-2xl font-black font-mono text-orange-900">{{ form.endTime || '—:——' }}</div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Kode Shift <span class="text-red-500">*</span></label>
              <input v-model="form.code" :disabled="!!editId || saving" class="w-full border rounded-lg px-3 py-2 text-sm font-mono font-black text-orange-700 uppercase outline-none focus:border-orange-500 shadow-inner disabled:opacity-60" placeholder="SHIFT-D" />
            </div>
            <div class="space-y-1.5 flex flex-col justify-end">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tipe</label>
              <div class="flex gap-2">
                <label class="flex items-center gap-2 cursor-pointer flex-1 border rounded-lg px-3 py-2 transition"
                  :class="!form.isFlexi ? 'bg-orange-50 border-orange-400' : 'bg-white border-slate-200'">
                  <input type="radio" :value="false" v-model="form.isFlexi" class="accent-orange-600" />
                  <span class="text-xs font-black text-slate-700">Fixed</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer flex-1 border rounded-lg px-3 py-2 transition"
                  :class="form.isFlexi ? 'bg-cyan-50 border-cyan-400' : 'bg-white border-slate-200'">
                  <input type="radio" :value="true" v-model="form.isFlexi" class="accent-cyan-600" />
                  <span class="text-xs font-black text-slate-700">Flexi</span>
                </label>
              </div>
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Nama Shift <span class="text-red-500">*</span></label>
            <input v-model="form.name" :disabled="saving" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-orange-500 shadow-inner" placeholder="Shift Pagi Khusus QC" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Jam Mulai <span class="text-red-500">*</span></label>
              <input type="time" v-model="form.startTime" :disabled="form.isFlexi || saving"
                class="w-full border rounded-lg px-3 py-2 text-sm font-mono font-black text-orange-700 outline-none focus:border-orange-500 shadow-inner disabled:opacity-50 disabled:bg-slate-50" />
              <div v-if="form.isFlexi" class="text-[9px] text-cyan-600 font-bold">Flexi: jam kerja fleksibel</div>
            </div>
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Jam Selesai <span class="text-red-500">*</span></label>
              <input type="time" v-model="form.endTime" :disabled="form.isFlexi || saving"
                class="w-full border rounded-lg px-3 py-2 text-sm font-mono font-black text-slate-700 outline-none focus:border-orange-500 shadow-inner disabled:opacity-50 disabled:bg-slate-50" />
              <div v-if="isOvernightShift" class="text-[9px] text-violet-600 font-bold flex items-center gap-1">
                <i class="pi pi-moon text-[8px]"></i> Shift melewati tengah malam
              </div>
            </div>
          </div>

          <!-- UU Ketenagakerjaan info -->
          <div class="rounded-xl bg-blue-50 border border-blue-100 p-3 text-[10px] text-blue-700 font-medium flex items-start gap-2">
            <i class="pi pi-info-circle mt-0.5 text-blue-500"></i>
            <div>
              Berdasarkan <strong>UU No. 13/2003 & PP No. 35/2021</strong>: jam kerja normal 8 jam/hari atau 40 jam/minggu.
              Shift malam (22:00–06:00) wajib disertai uang makan malam dan tunjangan malam.
              Lembur maksimal 4 jam/hari dengan upah 1.5–2× UMR.
            </div>
          </div>

          <div v-if="formError" class="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 border border-red-200">{{ formError }}</div>
        </div>

        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
          <Button label="Batal" severity="secondary" :disabled="saving" @click="formDialog = false" class="bg-white border text-slate-700 font-bold px-5" />
          <Button :label="editId ? 'Simpan Perubahan' : 'Tambahkan Shift'"
            :loading="saving" :disabled="!form.code || !form.name || (!form.isFlexi && (!form.startTime || !form.endTime))"
            @click="submit" class="bg-orange-600 border-none text-white font-bold px-6" icon="pi pi-check" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Shift = { id: string; code: string; name: string; startTime: string; endTime: string; isFlexi: boolean; isActive: boolean; };

const api = useApi();
const shifts = ref<Shift[]>([]);
const loading = ref(false);
const saving = ref(false);
const formDialog = ref(false);
const editId = ref('');
const formError = ref('');
const shiftFilter = ref('SEMUA');

const form = reactive({ code: '', name: '', startTime: '08:00', endTime: '17:00', isFlexi: false });

// Static metadata for known shifts
const SHIFT_META: Record<string, { desc: string; depts: string[] }> = {
  'SHIFT-A':     { desc: 'Shift rotasi pagi untuk lini produksi & gudang. Mulai sebelum matahari terbit untuk menyiapkan mesin produksi.', depts: ['Produksi','QC','Gudang'] },
  'SHIFT-B':     { desc: 'Shift rotasi siang — produksi berjalan penuh saat aktivitas normal kantor.', depts: ['Produksi','QC','Gudang'] },
  'SHIFT-C':     { desc: 'Shift rotasi malam untuk produksi 24 jam. Mendapat uang makan malam + tunjangan shift malam.', depts: ['Produksi','QC'] },
  'SHIFT-OFF':   { desc: 'Jam kerja standar Head Office 8 jam (+ 1 jam istirahat). Berlaku untuk semua departemen kantor.', depts: ['Semua Dept Kantor'] },
  'SHIFT-FLEXI': { desc: 'Jadwal fleksibel untuk posisi hybrid/WFH. Kehadiran diverifikasi via sistem ERP & GPS check-in.', depts: ['IT & ERP','R&D','Pemasaran'] },
  'SHIFT-HALF-AM': { desc: 'Shift 4 jam pagi — untuk karyawan cuti parsial atau hari libur nasional parsial.', depts: ['Semua'] },
  'SHIFT-HALF-PM': { desc: 'Shift 4 jam sore — untuk karyawan yang mengambil cuti setengah hari sore.', depts: ['Semua'] },
  'SHIFT-SPLIT': { desc: 'Shift panjang dengan jeda istirahat siang 2 jam. Untuk sales lapangan & driver ekspedisi.', depts: ['Penjualan','Driver','Ekspedisi'] },
  'SHIFT-EARLY': { desc: 'Shift dini hari khusus QC untuk inspeksi bahan baku sebelum produksi dimulai. Sesuai standar BPOM & FSMS.', depts: ['QC & Food Safety','Gudang Penerimaan'] },
  'SHIFT-LEMBUR': { desc: 'Shift tambahan resmi di luar jam kerja. Dihitung lembur sesuai PP No.35/2021: 1.5× jam pertama, 2× berikutnya.', depts: ['Semua (Lembur Resmi)'] },
};
const shiftDesc = (code: string) => SHIFT_META[code]?.desc ?? 'Shift kerja perusahaan F&B.';
const shiftDepts = (code: string) => SHIFT_META[code]?.depts ?? [];

// Color palette per shift
const SHIFT_COLORS: Record<string, string> = {
  'SHIFT-A': '#f59e0b', 'SHIFT-B': '#3b82f6', 'SHIFT-C': '#8b5cf6',
  'SHIFT-OFF': '#10b981', 'SHIFT-FLEXI': '#06b6d4',
  'SHIFT-HALF-AM': '#f97316', 'SHIFT-HALF-PM': '#ef4444',
  'SHIFT-SPLIT': '#84cc16', 'SHIFT-EARLY': '#e879f9', 'SHIFT-LEMBUR': '#64748b',
};
const shiftColor = (sh: Shift) => SHIFT_COLORS[sh.code] ?? '#94a3b8';

// Duration helpers
const parseMins = (t: string) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
const shiftDurMins = (sh: Shift) => {
  let d = parseMins(sh.endTime) - parseMins(sh.startTime);
  if (d < 0) d += 24 * 60;
  return d;
};
const durHours = (sh: Shift) => Math.floor(shiftDurMins(sh) / 60);
const durMins = (sh: Shift) => shiftDurMins(sh) % 60;

// Timeline helpers (24h = 100%)
const shiftLeft = (sh: Shift) => (parseMins(sh.startTime) / (24 * 60)) * 100;
const shiftWidth = (sh: Shift) => {
  let dur = parseMins(sh.endTime) - parseMins(sh.startTime);
  if (dur < 0) dur += 24 * 60;
  return Math.max((dur / (24 * 60)) * 100, 1);
};

const activeShifts = computed(() => shifts.value.filter(s => s.isActive).length);
const flexiShifts = computed(() => shifts.value.filter(s => s.isFlexi).length);
const activeShiftsList = computed(() => shifts.value.filter(s => s.isActive && !s.isFlexi));
const avgHours = computed(() => {
  if (!shifts.value.length) return '0';
  const avg = shifts.value.reduce((s, sh) => s + durHours(sh), 0) / shifts.value.length;
  return avg.toFixed(1);
});

const filteredShifts = computed(() => {
  if (shiftFilter.value === 'AKTIF') return shifts.value.filter(s => s.isActive);
  if (shiftFilter.value === 'NON-AKTIF') return shifts.value.filter(s => !s.isActive);
  if (shiftFilter.value === 'FLEXI') return shifts.value.filter(s => s.isFlexi);
  return shifts.value;
});

const isOvernightShift = computed(() => {
  if (!form.startTime || !form.endTime) return false;
  return parseMins(form.endTime) < parseMins(form.startTime);
});

const previewDuration = computed(() => {
  if (form.isFlexi) return 'Flexi (Fleksibel)';
  if (!form.startTime || !form.endTime) return '—';
  let mins = parseMins(form.endTime) - parseMins(form.startTime);
  if (mins < 0) mins += 24 * 60;
  const h = Math.floor(mins / 60), m = mins % 60;
  return `${h} jam${m > 0 ? ' ' + m + ' menit' : ''}`;
});

const load = async () => {
  loading.value = true;
  try {
    const res = await api.get('/hris/shift');
    shifts.value = res.data?.shifts ?? res.shifts ?? [];
  } catch (e) { console.warn(e); }
  finally { loading.value = false; }
};

const openCreate = () => {
  editId.value = '';
  form.code = ''; form.name = ''; form.startTime = '08:00'; form.endTime = '17:00'; form.isFlexi = false;
  formError.value = '';
  formDialog.value = true;
};

const openEdit = (sh: Shift) => {
  editId.value = sh.id;
  form.code = sh.code; form.name = sh.name;
  form.startTime = sh.startTime; form.endTime = sh.endTime; form.isFlexi = sh.isFlexi;
  formError.value = '';
  formDialog.value = true;
};

const submit = async () => {
  saving.value = true; formError.value = '';
  try {
    const payload = {
      code: form.code.toUpperCase().trim(),
      name: form.name.trim(),
      startTime: form.isFlexi ? '08:00' : form.startTime,
      endTime: form.isFlexi ? '17:00' : form.endTime,
      isFlexi: form.isFlexi,
    };
    if (editId.value) {
      await api.post(`/hris/shift/${editId.value}`, payload);
    } else {
      await api.post('/hris/shift', payload);
    }
    formDialog.value = false;
    await load();
  } catch (e: any) { formError.value = e?.response?.data?.message ?? 'Gagal menyimpan shift'; }
  finally { saving.value = false; }
};

const toggleActive = async (sh: Shift) => {
  try {
    await api.post(`/hris/shift/${sh.id}`, { isActive: !sh.isActive });
    await load();
  } catch (e) { console.warn(e); }
};

onMounted(load);
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
</style>