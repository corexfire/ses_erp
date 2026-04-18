<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-6 shadow-sm border-l-4 border-l-purple-500 relative overflow-hidden">
      <div class="absolute right-[-12px] top-[-12px] opacity-5 pointer-events-none">
        <i class="pi pi-star-fill text-[150px] text-purple-900"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-start gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-star-fill text-purple-600"></i> Penilaian Kinerja Karyawan (KPI)
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
            Pengelolaan Key Performance Indicators (KPI) dan ulasan kinerja karyawan secara berkala. Berdampak langsung ke penyesuaian gaji, promosi, dan pemberian bonus.
          </div>
        </div>
        <div class="flex gap-2 shrink-0">
          <Button label="Buat Evaluasi" size="small" icon="pi pi-plus" class="bg-purple-600 text-white border-none font-bold shadow-sm hover:bg-purple-700" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Stats & Filters -->
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
      <!-- Period picker -->
      <div class="bg-white border rounded-xl p-4 shadow-sm space-y-2">
        <div class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Periode KPI</div>
        <select v-model="filterPeriod" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-purple-700 outline-none focus:border-purple-500">
          <option value="">Semua Periode</option>
          <option v-for="p in periodList" :key="p" :value="p">{{ p }}</option>
        </select>
        <div class="text-[10px] text-slate-400 font-medium">{{ filteredKpi.length }} evaluasi ditemukan</div>
      </div>
      
      <!-- KPIs -->
      <div class="bg-purple-50 border border-purple-200 rounded-xl p-4 shadow-sm relative overflow-hidden">
        <i class="pi pi-chart-line absolute right-2 bottom-2 text-3xl opacity-10 text-purple-800"></i>
        <div class="text-3xl font-black text-purple-800">{{ avgScore.toFixed(1) }}</div>
        <div class="text-[10px] font-black text-purple-600 mt-0.5 uppercase tracking-widest">Rata-rata Skor</div>
      </div>
      <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-4 shadow-sm relative overflow-hidden">
        <i class="pi pi-users absolute right-2 bottom-2 text-3xl opacity-10 text-emerald-800"></i>
        <div class="text-3xl font-black text-emerald-700">{{ evaluatedCount }} <span class="text-xs text-emerald-600 font-bold">/ {{ employees.length }}</span></div>
        <div class="text-[10px] font-black text-emerald-600 mt-0.5 uppercase tracking-widest">Karyawan Dievaluasi</div>
      </div>
      <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm relative overflow-hidden">
        <i class="pi pi-thumbs-up absolute right-2 bottom-2 text-3xl opacity-10 text-blue-800"></i>
        <div class="text-3xl font-black text-blue-700">{{ gradeDistribution.good }}</div>
        <div class="text-[10px] font-black text-blue-600 mt-0.5 uppercase tracking-widest">Kinerja Baik (A/B)</div>
      </div>
      <div class="bg-rose-50 border border-rose-200 rounded-xl p-4 shadow-sm relative overflow-hidden">
        <i class="pi pi-exclamation-triangle absolute right-2 bottom-2 text-3xl opacity-10 text-rose-800"></i>
        <div class="text-3xl font-black text-rose-700">{{ gradeDistribution.bad }}</div>
        <div class="text-[10px] font-black text-rose-600 mt-0.5 uppercase tracking-widest">Perlu Peningkatan (D/E)</div>
      </div>
    </div>

    <!-- Controls -->
    <div class="bg-white border rounded-xl p-4 shadow-sm flex flex-wrap gap-3 items-center">
      <div class="flex gap-1 bg-slate-100 rounded-lg p-1">
        <button v-for="m in ['grid','table']" :key="m" @click="viewMode = m"
          :class="viewMode === m ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'"
          class="px-3 py-1.5 rounded-md text-[11px] font-black uppercase tracking-widest transition flex items-center gap-1.5">
          <i :class="m === 'grid' ? 'pi pi-th-large' : 'pi pi-list'" class="text-[10px]"></i>
          {{ m }}
        </button>
      </div>
      <select v-model="filterDept" class="border rounded-lg px-3 py-2 text-sm font-semibold h-10 outline-none focus:border-purple-500">
        <option value="">Semua Departemen</option>
        <option v-for="d in deptList" :key="d" :value="d">{{ d }}</option>
      </select>
      <InputText v-model="search" placeholder="Cari nama karyawan..." class="text-sm h-10 w-56" />
      <Button severity="secondary" size="small" :loading="loading" icon="pi pi-refresh" @click="load" outlined class="h-10 w-10 ml-auto" />
    </div>

    <!-- === GRID VIEW === -->
    <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <div v-if="loading" v-for="i in 6" :key="i" class="bg-white border rounded-xl p-5 animate-pulse h-40"></div>
      
      <div v-else-if="filteredKpi.length === 0" class="col-span-full py-12 text-center text-slate-400 italic">
        Tidak ada data evaluasi.
      </div>
      
      <div v-for="k in filteredKpi" :key="k.id" class="bg-white border rounded-xl shadow-sm hover:shadow-md transition overflow-hidden flex flex-col cursor-pointer" @click="openDetail(k)">
        <div class="h-1.5 w-full" :style="{ backgroundColor: gradeMeta(k.grade).hex }"></div>
        <div class="p-5 flex-1 flex flex-col">
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-white shrink-0"
                :style="{ backgroundColor: avatarColor(k.employee?.firstName ?? 'A') }">
                {{ initials(k.employee?.firstName, k.employee?.lastName) }}
              </div>
              <div class="min-w-0">
                <div class="font-black text-slate-800 text-sm truncate">{{ k.employee?.firstName }} {{ k.employee?.lastName ?? '' }}</div>
                <div class="text-[10px] font-mono text-slate-400 truncate">{{ k.employee?.department || 'N/A' }}</div>
              </div>
            </div>
            <span :class="k.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'" 
              class="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border shrink-0">
              {{ k.status }}
            </span>
          </div>

          <div class="flex items-end justify-between mt-auto pt-3 border-t">
            <div>
              <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Periode</div>
              <div class="font-bold text-slate-700 text-sm mt-0.5">{{ k.period }}</div>
            </div>
            <div class="text-right flex items-center gap-3">
              <div class="text-3xl font-black tracking-tighter" :style="{ color: gradeMeta(k.grade).hex }">{{ Number(k.score).toFixed(0) }}<span class="text-sm text-slate-400 font-bold">/100</span></div>
              <div class="w-10 h-10 rounded-xl flex items-center justify-center text-2xl font-black border-2"
                :style="{ color: gradeMeta(k.grade).hex, borderColor: gradeMeta(k.grade).hex, backgroundColor: gradeMeta(k.grade).hex + '1a' }">
                {{ k.grade ? k.grade.split(' ')[0] : 'U' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- === TABLE VIEW === -->
    <div v-if="viewMode === 'table'" class="rounded-xl border bg-white shadow-sm overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-purple-900 text-left text-[11px] text-white uppercase tracking-widest font-bold">
          <tr>
            <th class="px-5 py-3 w-32">Periode</th>
            <th class="px-4 py-3 border-l">Karyawan & Departemen</th>
            <th class="px-4 py-3 border-l text-center w-28">Score KPI</th>
            <th class="px-4 py-3 border-l w-48">Grade Akhir</th>
            <th class="px-4 py-3 border-l text-center w-28">Status</th>
            <th class="px-4 py-3 border-l text-center w-28">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="6" class="py-16 text-center text-slate-400"><i class="pi pi-spinner pi-spin mr-2"></i> Memuat data evaluasi KPI...</td>
          </tr>
          <tr v-for="k in filteredKpi" v-else :key="k.id"
            class="border-t transition hover:bg-purple-50/10 cursor-pointer"
            @click="openDetail(k)">
            <td class="px-5 py-3 align-middle font-mono text-xs font-black text-slate-600">{{ k.period }}</td>
            <td class="px-4 py-3 align-middle border-l">
              <div class="font-black text-slate-800">{{ k.employee?.firstName }} {{ k.employee?.lastName ?? '' }}</div>
              <div class="text-[10px] text-slate-500 mt-0.5">{{ k.employee?.department || 'N/A' }}</div>
            </td>
            <td class="px-4 py-3 align-middle border-l text-center">
              <span class="text-lg font-black" :style="{ color: gradeMeta(k.grade).hex }">{{ Number(k.score).toFixed(0) }}</span>
            </td>
            <td class="px-4 py-3 align-middle border-l">
              <div class="flex items-center gap-1.5">
                <span class="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border" 
                  :style="{ color: gradeMeta(k.grade).hex, borderColor: gradeMeta(k.grade).hex + '55', backgroundColor: gradeMeta(k.grade).hex + '1a' }">
                  {{ k.grade }}
                </span>
              </div>
            </td>
            <td class="px-4 py-3 align-middle border-l text-center">
              <span :class="k.status === 'APPROVED' ? 'text-emerald-600 bg-emerald-50 border-emerald-200' : 'text-amber-600 bg-amber-50 border-amber-200'" 
                class="text-[9px] font-black uppercase px-2 py-0.5 border rounded-full">
                {{ k.status }}
              </span>
            </td>
            <td class="px-4 py-3 align-middle border-l text-center">
              <div class="flex justify-center gap-1">
                <Button label="Detail" size="small" outlined class="text-[9px] h-7 px-2 font-bold text-purple-700 border-purple-200 hover:bg-purple-700 hover:text-white" @click.stop="openDetail(k)" />
                <Button v-if="k.status === 'DRAFT'" label="Approve" size="small" class="text-[9px] h-7 px-2 font-bold bg-purple-700 text-white border-none hover:bg-purple-800" @click.stop="approve(k)" />
              </div>
            </td>
          </tr>
          <tr v-if="!loading && filteredKpi.length === 0">
            <td colspan="6" class="py-12 text-center text-slate-400 italic">Tidak ada data untuk filter ini.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Detail Drawer -->
    <div v-if="detailKpi" class="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm" @click.self="detailKpi = null">
      <div class="w-full max-w-md h-full bg-white shadow-2xl flex flex-col overflow-y-auto animate-slide-in-right">
        <div class="p-5 border-b flex items-center justify-between"
          :style="{ borderLeft: `4px solid ${gradeMeta(detailKpi.grade).hex}`, background: `linear-gradient(to right, ${gradeMeta(detailKpi.grade).hex}12, #fff)` }">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full flex items-center justify-center font-black text-lg text-white shadow-md border-2 border-white"
              :style="{ backgroundColor: avatarColor(detailKpi.employee?.firstName ?? 'A') }">
              {{ initials(detailKpi.employee?.firstName, detailKpi.employee?.lastName) }}
            </div>
            <div>
              <div class="font-black text-xl text-slate-800">{{ detailKpi.employee?.firstName }} <span class="font-medium text-slate-500">{{ detailKpi.employee?.lastName }}</span></div>
              <div class="text-xs text-slate-500 font-bold uppercase tracking-widest mt-0.5">{{ detailKpi.employee?.position }}</div>
            </div>
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-100 w-8 h-8 rounded-full font-bold shrink-0" @click="detailKpi = null">✕</button>
        </div>

        <div class="p-6 space-y-6 flex-1">
          <!-- Big Score -->
          <div class="text-center">
            <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Penilaian Kinerja Periode {{ detailKpi.period }}</div>
            <div class="mt-4 inline-flex flex-col items-center justify-center w-32 h-32 rounded-full border-8 shadow-inner"
              :style="{ borderColor: gradeMeta(detailKpi.grade).hex + '44', backgroundColor: gradeMeta(detailKpi.grade).hex + '11' }">
              <div class="text-4xl font-black -mt-2" :style="{ color: gradeMeta(detailKpi.grade).hex }">{{ Number(detailKpi.score).toFixed(0) }}</div>
              <div class="text-sm font-black mt-1" :style="{ color: gradeMeta(detailKpi.grade).hex }">{{ detailKpi.grade }}</div>
            </div>
          </div>

          <div class="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2"><i class="pi pi-comment mr-1"></i> Ulasan Pembimbing / Atasan</div>
            <div class="text-slate-700 text-sm font-medium italic leading-relaxed whitespace-pre-wrap">
              "{{ detailKpi.comments || 'Tidak ada komentar yang ditinggalkan.' }}"
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="border rounded-xl p-3">
              <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Status Evaluasi</div>
              <div class="font-black mt-1 text-sm" :class="detailKpi.status === 'APPROVED' ? 'text-emerald-700' : 'text-amber-700'">{{ detailKpi.status }}</div>
            </div>
            <div class="border rounded-xl p-3">
              <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Tanggal Penilaian</div>
              <div class="font-black mt-1 text-sm text-slate-700">{{ formatDate(detailKpi.createdAt) }}</div>
            </div>
          </div>
        </div>

        <div class="p-4 border-t bg-slate-50 flex gap-2">
          <Button v-if="detailKpi.status === 'DRAFT'" label="Approve Penilaian" class="flex-1 bg-purple-700 text-white border-none font-bold text-[11px]" :loading="approving" @click="approve(detailKpi)" />
          <Button label="Tutup" severity="secondary" outlined class="text-[11px] font-bold text-slate-700 flex-1 border-slate-300" @click="detailKpi = null" />
        </div>
      </div>
    </div>

    <!-- Create Form -->
    <div v-if="formDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div class="w-full max-w-lg rounded-2xl border bg-white shadow-2xl flex flex-col animate-fade-in-up">
        <div class="p-5 border-b bg-slate-50 flex justify-between rounded-t-2xl">
          <div class="text-lg font-black text-slate-800 flex items-center gap-2">
            <i class="pi pi-chart-pie text-purple-700"></i> Buat Evaluasi Kinerja (KPI)
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-100 w-8 h-8 rounded-full font-bold" @click="formDialog = false">✕</button>
        </div>
        
        <div class="p-6 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1.5 col-span-2">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Karyawan <span class="text-red-500">*</span></label>
              <select v-model="form.employeeId" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-purple-500 shadow-inner">
                <option value="">— Pilih Karyawan —</option>
                <option v-for="e in employees" :key="e.id" :value="e.id">{{ e.employeeNo }} — {{ e.firstName }} {{ e.lastName ?? '' }} ({{ e.department }})</option>
              </select>
            </div>
            
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Periode <span class="text-red-500">*</span></label>
              <input v-model="form.period" class="w-full border rounded-lg px-3 py-2 text-sm font-black font-mono text-slate-700 outline-none focus:border-purple-500 shadow-inner" placeholder="Contoh: 2026-Q2" />
            </div>
            
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Skor Akhir (0-100) <span class="text-red-500">*</span></label>
              <input type="number" v-model.number="form.score" min="0" max="100" @input="autoGrade" class="w-full border rounded-lg px-3 py-2 text-sm font-black font-mono text-purple-700 outline-none focus:border-purple-500 shadow-inner" placeholder="0 - 100" />
            </div>
          </div>

          <div class="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div class="flex-1">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Auto-Grade</label>
              <div class="text-xs text-slate-400 mt-0.5">Sistem secara otomatis menentukan Grade berdasarkan Skor Akhir.</div>
            </div>
            <div class="w-24 text-center py-2 rounded-lg font-black" :style="{ backgroundColor: gradeMeta(form.grade).hex + '22', color: gradeMeta(form.grade).hex }">
              {{ form.grade || '-' }}
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Komentar & Ulasan <span class="text-red-500">*</span></label>
            <textarea v-model="form.comments" rows="3" class="w-full border rounded-lg px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-purple-500 shadow-inner resize-none" placeholder="Ulasan kinerja karyawan, evaluasi target, dan rekomendasi tindak lanjut..."></textarea>
          </div>

          <div v-if="formError" class="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 border border-red-200">{{ formError }}</div>
        </div>

        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
          <Button label="Batal" severity="secondary" :disabled="saving" @click="formDialog = false" class="bg-white border text-slate-700 font-bold px-5" />
          <Button label="Simpan Penilaian" :loading="saving" :disabled="!form.employeeId || !form.period || form.score === null || !form.comments"
            @click="submit" class="bg-purple-700 border-none text-white font-bold px-6" icon="pi pi-check" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const evaluations = ref<any[]>([]);
const employees = ref<any[]>([]);
const loading = ref(false);
const saving = ref(false);
const approving = ref(false);

const viewMode = ref<'grid'|'table'>('grid');
const filterPeriod = ref('');
const filterDept = ref('');
const search = ref('');

const detailKpi = ref<any>(null);
const formDialog = ref(false);
const formError = ref('');
const form = reactive({ employeeId: '', period: '2026-Q1', score: 0 as number|null, grade: 'E (Buruk)', comments: '' });

const periodList = computed(() => [...new Set(evaluations.value.map(e => e.period))].sort().reverse());
const deptList = computed(() => [...new Set(employees.value.map(e => e.department).filter(Boolean))].sort());

const AVATAR_COLORS = ['#6366f1','#8b5cf6','#06b6d4','#10b981','#f59e0b','#ef4444','#ec4899','#14b8a6','#3b82f6','#f97316'];
const avatarColor = (n: string) => AVATAR_COLORS[(n?.charCodeAt(0) ?? 0) % AVATAR_COLORS.length];
const initials = (f?: string, l?: string) => `${f?.[0] ?? ''}${l?.[0] ?? ''}`.toUpperCase();
const formatDate = (iso: string) => { const d = new Date(iso); return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`; };

const gradeMeta = (g: string) => {
  if (!g) return { hex: '#94a3b8' };
  if (g.startsWith('A')) return { hex: '#10b981' }; // Emerald
  if (g.startsWith('B')) return { hex: '#3b82f6' }; // Blue
  if (g.startsWith('C')) return { hex: '#f59e0b' }; // Amber
  if (g.startsWith('D')) return { hex: '#f97316' }; // Orange
  return { hex: '#ef4444' }; // Rose
};

const autoGrade = () => {
  const s = Number(form.score || 0);
  if (s >= 90) form.grade = 'A (Sangat Baik)';
  else if (s >= 80) form.grade = 'B (Baik)';
  else if (s >= 70) form.grade = 'C (Cukup)';
  else if (s >= 60) form.grade = 'D (Kurang)';
  else form.grade = 'E (Buruk)';
};

const filteredKpi = computed(() => {
  let list = evaluations.value;
  if (filterPeriod.value) list = list.filter(k => k.period === filterPeriod.value);
  if (filterDept.value) list = list.filter(k => k.employee?.department === filterDept.value);
  if (search.value.trim()) {
    const q = search.value.toLowerCase();
    list = list.filter(k => 
      k.employee?.firstName?.toLowerCase().includes(q) || 
      k.employee?.lastName?.toLowerCase().includes(q)
    );
  }
  return list;
});

const avgScore = computed(() => {
  if (!filteredKpi.value.length) return 0;
  return filteredKpi.value.reduce((s, k) => s + Number(k.score), 0) / filteredKpi.value.length;
});
const evaluatedCount = computed(() => new Set(filteredKpi.value.map(k => k.employeeId)).size);
const gradeDistribution = computed(() => {
  let good = 0, bad = 0;
  for (const k of filteredKpi.value) {
    if (k.grade?.startsWith('A') || k.grade?.startsWith('B')) good++;
    else if (k.grade?.startsWith('D') || k.grade?.startsWith('E')) bad++;
  }
  return { good, bad };
});

const load = async () => {
  loading.value = true;
  try {
    const [empRes, kpiRes] = await Promise.all([
      api.get('/hris/employees'),
      api.get('/hris/kpi')
    ]);
    employees.value = (empRes.data?.employees ?? empRes.employees ?? []).filter((e:any) => e.status === 'ACTIVE');
    evaluations.value = kpiRes.data?.evaluations ?? kpiRes.evaluations ?? [];
  } catch (e) { console.warn(e); }
  finally { loading.value = false; }
};

const openDetail = (k: any) => { detailKpi.value = k; };
const openCreate = () => {
  form.employeeId = ''; form.score = null; form.grade = ''; form.comments = '';
  formError.value = ''; formDialog.value = true;
};

const submit = async () => {
  saving.value = true; formError.value = '';
  try {
    await api.post('/hris/kpi', { ...form });
    formDialog.value = false;
    await load();
  } catch (e: any) { formError.value = e?.response?.data?.message ?? 'Gagal menyimpan evaluasi KPI'; }
  finally { saving.value = false; }
};

const approve = async (k: any) => {
  approving.value = true;
  try {
    await api.post(`/hris/kpi/${k.id}/approve`);
    if (detailKpi.value?.id === k.id) detailKpi.value.status = 'APPROVED';
    await load();
  } catch (e) { console.warn(e); }
  finally { approving.value = false; }
};

onMounted(load);
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
.animate-slide-in-right { animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes slideInRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
</style>