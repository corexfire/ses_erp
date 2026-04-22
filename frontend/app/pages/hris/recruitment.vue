<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-4 shadow-sm border-l-4 border-l-rose-500 relative overflow-hidden">
      <div class="absolute right-[-12px] top-[-12px] opacity-5 pointer-events-none">
        <i class="pi pi-briefcase text-[150px] text-rose-900"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-start gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-briefcase text-rose-600"></i> Rekrutmen & ATS
            <span class="text-[10px] font-black bg-rose-100 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-full tracking-widest">Applicant Tracking System</span>
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
            Kelola pipeline rekrutmen F&B — dari pelamaran masuk, screening CV, wawancara, penawaran, hingga penerimaan karyawan baru. Terintegrasi dengan modul Employee Master.
          </div>
        </div>
        <Button label="+ Tambah Kandidat" size="small" icon="pi pi-user-plus"
          class="bg-rose-600 text-white border-none font-bold shadow-sm hover:bg-rose-700 shrink-0"
          @click="openCreate" />
      </div>
    </div>

    <!-- Pipeline Stats -->
    <div class="grid grid-cols-3 md:grid-cols-6 gap-3">
      <div v-for="stage in STAGES" :key="stage.key"
        class="rounded-xl border p-3 shadow-sm cursor-pointer transition hover:shadow-md"
        :class="filterStatus === stage.key ? `ring-2 ${stage.ring}` : ''"
        :style="{ borderLeftWidth: '3px', borderLeftColor: stage.color }"
        @click="filterStatus = filterStatus === stage.key ? '' : stage.key">
        <div class="text-2xl font-black" :style="{ color: stage.color }">{{ stageCount(stage.key) }}</div>
        <div class="text-[9px] font-black uppercase tracking-widest mt-0.5" :style="{ color: stage.color }">{{ stage.label }}</div>
      </div>
    </div>

    <!-- View mode toggle -->
    <div class="flex gap-3 items-center">
      <div class="flex gap-1 bg-white border rounded-xl p-1 shadow-sm">
        <button v-for="m in ['kanban','table']" :key="m" @click="viewMode = m"
          :class="viewMode === m ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'"
          class="px-4 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition flex items-center gap-1.5">
          <i :class="m === 'kanban' ? 'pi pi-th-large' : 'pi pi-list'" class="text-[10px]"></i>
          {{ m === 'kanban' ? 'Kanban' : 'Tabel' }}
        </button>
      </div>
      <InputText v-model="search" placeholder="Cari nama / posisi..." class="text-sm h-10 w-56" />
      <Button severity="secondary" size="small" :loading="loading" icon="pi pi-refresh" @click="load" outlined class="h-10 w-10" />
      <div class="ml-auto text-xs text-slate-500 font-medium">{{ filteredCandidates.length }} kandidat</div>
    </div>

    <!-- ===== KANBAN VIEW ===== -->
    <div v-if="viewMode === 'kanban' && !loading" class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 items-start">
      <div v-for="stage in STAGES" :key="stage.key" class="space-y-2">
        <!-- Column header -->
        <div class="rounded-xl px-3 py-2 flex items-center justify-between sticky top-0 z-10"
          :style="{ backgroundColor: stage.color + '18', borderLeft: `3px solid ${stage.color}` }">
          <div class="font-black text-xs uppercase tracking-widest" :style="{ color: stage.color }">
            {{ stage.emoji }} {{ stage.label }}
          </div>
          <span class="text-[9px] font-black rounded-full px-1.5 py-0.5" :style="{ backgroundColor: stage.color, color: '#fff' }">
            {{ stageCount(stage.key) }}
          </span>
        </div>

        <!-- Cards -->
        <div v-for="c in candidatesInStage(stage.key)" :key="c.id"
          class="bg-white border rounded-xl p-3 shadow-sm hover:shadow-md cursor-pointer transition group"
          @click="openDetail(c)">
          <div class="flex items-start justify-between gap-1">
            <div class="flex items-center gap-2 min-w-0">
              <div class="w-8 h-8 rounded-full flex items-center justify-center font-black text-[11px] text-white shrink-0"
                :style="{ backgroundColor: avatarColor(c.firstName) }">
                {{ initials(c.firstName, c.lastName) }}
              </div>
              <div class="min-w-0">
                <div class="font-black text-slate-800 text-xs leading-tight truncate">{{ c.firstName }} {{ c.lastName ?? '' }}</div>
                <div class="text-[9px] font-mono text-slate-400 mt-0.5">{{ c.candidateNo }}</div>
              </div>
            </div>
          </div>
          <div class="mt-2 text-[10px] font-semibold text-slate-600 leading-tight line-clamp-2">{{ c.position }}</div>
          <div class="mt-2 text-[9px] text-slate-400 font-medium">{{ formatDateRelative(c.appliedAt) }}</div>
          <div class="mt-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
            <button class="text-[9px] font-black px-2 py-0.5 rounded border text-slate-600 border-slate-200 hover:bg-slate-100" @click.stop="openDetail(c)">Detail</button>
            <button v-if="nextStage(c.status)" class="text-[9px] font-black px-2 py-0.5 rounded border text-white border-none" :style="{ backgroundColor: nextStageColor(c.status) }" @click.stop="advance(c)">
              → {{ nextStageLabel(c.status) }}
            </button>
          </div>
        </div>

        <div v-if="candidatesInStage(stage.key).length === 0"
          class="rounded-xl border border-dashed p-4 text-center text-[10px] text-slate-300 font-bold">
          Kosong
        </div>
      </div>
    </div>

    <!-- ===== TABLE VIEW ===== -->
    <div v-if="viewMode === 'table' && !loading" class="rounded-xl border bg-white shadow-sm overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-rose-900 text-left text-[11px] text-white uppercase tracking-widest font-bold">
          <tr>
            <th class="px-5 py-3 w-32">No. Kandidat</th>
            <th class="px-4 py-3">Kandidat</th>
            <th class="px-4 py-3 border-l">Posisi Dilamar</th>
            <th class="px-4 py-3 border-l w-28 text-center">Tanggal Lamar</th>
            <th class="px-4 py-3 border-l text-center w-28">Status</th>
            <th class="px-4 py-3 border-l text-center w-32">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in filteredCandidates" :key="c.id"
            class="border-t transition hover:bg-rose-50/10 cursor-pointer"
            :class="c.status === 'REJECTED' ? 'opacity-40' : c.status === 'HIRED' ? 'bg-emerald-50/20' : ''"
            @click="openDetail(c)">
            <td class="px-5 py-3 align-middle">
              <span class="font-mono text-xs font-black text-rose-700 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded">{{ c.candidateNo }}</span>
            </td>
            <td class="px-4 py-3 align-middle">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-full flex items-center justify-center font-black text-xs text-white shrink-0"
                  :style="{ backgroundColor: avatarColor(c.firstName) }">
                  {{ initials(c.firstName, c.lastName) }}
                </div>
                <div>
                  <div class="font-black text-slate-800">{{ c.firstName }} {{ c.lastName ?? '' }}</div>
                  <div class="text-[10px] text-slate-400">{{ c.email }}</div>
                </div>
              </div>
            </td>
            <td class="px-4 py-3 border-l align-middle font-medium text-slate-700 text-sm">{{ c.position ?? '—' }}</td>
            <td class="px-4 py-3 border-l text-center align-middle text-xs text-slate-600">{{ formatDate(c.appliedAt) }}</td>
            <td class="px-4 py-3 border-l text-center align-middle">
              <span class="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border" :style="statusStyle(c.status)">
                {{ STAGE_MAP[c.status]?.emoji }} {{ c.status }}
              </span>
            </td>
            <td class="px-4 py-3 border-l text-center align-middle">
              <div class="flex justify-center gap-1">
                <Button label="Detail" size="small" outlined class="text-[9px] h-7 px-2 font-bold text-rose-600 border-rose-200 hover:bg-rose-600 hover:text-white" @click.stop="openDetail(c)" />
                <Button v-if="nextStage(c.status)" :label="'→'" size="small" outlined class="h-7 w-7 font-bold text-slate-500 border-slate-200 hover:bg-slate-100" @click.stop="advance(c)" v-tooltip="nextStageLabel(c.status)" />
              </div>
            </td>
          </tr>
          <tr v-if="filteredCandidates.length === 0">
            <td colspan="6" class="py-12 text-center text-slate-400 italic">Tidak ada kandidat ditemukan.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Detail Drawer -->
    <div v-if="detail" class="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm" @click.self="detail = null">
      <div class="w-full max-w-md h-full bg-white shadow-2xl flex flex-col overflow-y-auto animate-slide-in-right">
        <div class="p-5 border-b flex items-center justify-between"
          :style="{ borderLeft: `4px solid ${STAGE_MAP[detail.status]?.color}`, background: `linear-gradient(to right, ${STAGE_MAP[detail.status]?.color}12, #fff)` }">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg text-white"
              :style="{ backgroundColor: avatarColor(detail.firstName) }">
              {{ initials(detail.firstName, detail.lastName) }}
            </div>
            <div>
              <div class="font-black text-xl text-slate-800">{{ detail.firstName }} {{ detail.lastName ?? '' }}</div>
              <div class="text-sm text-slate-500 font-mono">{{ detail.candidateNo }}</div>
            </div>
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-100 w-8 h-8 rounded-full font-bold shrink-0" @click="detail = null">✕</button>
        </div>

        <!-- Pipeline Progress -->
        <div class="px-5 py-4 border-b">
          <div class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Pipeline Progress</div>
          <div class="flex items-center gap-1">
            <template v-for="(st, idx) in STAGES.slice(0, 5)" :key="st.key">
              <div class="flex-1 h-2 rounded-full transition-all"
                :style="{ backgroundColor: stageOrderOf(detail.status) >= idx ? st.color : '#e2e8f0' }"></div>
              <div v-if="idx < 4" class="w-1"></div>
            </template>
          </div>
          <div class="flex justify-between mt-1">
            <span v-for="st in STAGES.slice(0,5)" :key="st.key" class="text-[8px] font-black" :style="{ color: stageOrderOf(detail.status) >= STAGES.indexOf(st) ? st.color : '#94a3b8' }">{{ st.label }}</span>
          </div>
        </div>

        <div class="p-5 space-y-4 flex-1">
          <div class="grid grid-cols-2 gap-3">
            <div class="bg-slate-50 rounded-lg p-3">
              <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Email</div>
              <div class="text-xs font-semibold text-slate-700 mt-0.5 break-all">{{ detail.email }}</div>
            </div>
            <div class="bg-slate-50 rounded-lg p-3">
              <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Phone</div>
              <div class="text-xs font-semibold text-slate-700 mt-0.5">{{ detail.phone ?? '—' }}</div>
            </div>
            <div class="bg-slate-50 rounded-lg p-3 col-span-2">
              <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Posisi Dilamar</div>
              <div class="text-sm font-black text-rose-700 mt-0.5">{{ detail.position ?? '—' }}</div>
            </div>
            <div class="bg-slate-50 rounded-lg p-3">
              <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Tanggal Lamar</div>
              <div class="text-xs font-semibold text-slate-700 mt-0.5">{{ formatDate(detail.appliedAt) }}</div>
            </div>
            <div class="rounded-lg p-3" :style="{ backgroundColor: STAGE_MAP[detail.status]?.color + '18' }">
              <div class="text-[9px] font-black uppercase tracking-widest" :style="{ color: STAGE_MAP[detail.status]?.color }">Status</div>
              <div class="text-sm font-black mt-0.5" :style="{ color: STAGE_MAP[detail.status]?.color }">
                {{ STAGE_MAP[detail.status]?.emoji }} {{ detail.status }}
              </div>
            </div>
          </div>

          <!-- Stage actions -->
          <div class="space-y-2">
            <div class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Ubah Status Pipeline</div>
            <div class="grid grid-cols-2 gap-2">
              <button v-for="st in STAGES" :key="st.key"
                class="rounded-xl border px-3 py-2 text-[10px] font-black uppercase tracking-widest transition"
                :class="detail.status === st.key ? 'text-white shadow-sm' : 'bg-white text-slate-500 border-slate-200 hover:border-current'"
                :style="detail.status === st.key ? { backgroundColor: st.color, borderColor: st.color } : {}"
                :disabled="advancing"
                @click="advanceTo(detail, st.key)">
                {{ st.emoji }} {{ st.label }}
              </button>
            </div>
          </div>

          <!-- Notes -->
          <div class="space-y-2">
            <div class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Catatan Internal</div>
            <textarea v-model="detailNote" rows="3" class="w-full border rounded-xl px-3 py-2 text-xs text-slate-700 outline-none focus:border-rose-400 resize-none" placeholder="Catatan hasil screening, interview, atau alasan penolakan..."></textarea>
          </div>
        </div>

        <div class="p-4 border-t bg-slate-50 flex gap-2">
          <Button label="Edit Data" size="small" outlined icon="pi pi-pencil" class="flex-1 text-[10px] font-bold text-slate-700 border-slate-300" @click="openEdit(detail)" />
          <Button v-if="detail.status !== 'HIRED' && detail.status !== 'REJECTED'" label="Reject" size="small" outlined class="text-[10px] font-bold text-rose-600 border-rose-200 hover:bg-rose-600 hover:text-white" :disabled="advancing" @click="advanceTo(detail, 'REJECTED')" />
          <Button v-if="detail.status === 'OFFER'" label="✅ Terima (HIRED)" size="small" class="bg-emerald-600 text-white border-none font-bold text-[10px]" :disabled="advancing" @click="advanceTo(detail, 'HIRED')" />
        </div>
      </div>
    </div>

    <!-- Create / Edit Dialog -->
    <div v-if="formDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div class="w-full max-w-xl rounded-2xl border bg-white shadow-2xl flex flex-col animate-fade-in-up">
        <div class="p-5 border-b bg-slate-50 flex justify-between items-center rounded-t-2xl">
          <div class="text-lg font-black text-slate-800 flex items-center gap-2">
            <i class="pi pi-user-plus text-rose-600"></i> {{ editId ? 'Edit Kandidat' : 'Tambah Kandidat Baru' }}
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-100 w-8 h-8 rounded-full font-bold" @click="formDialog = false">✕</button>
        </div>
        <div class="p-4 space-y-4 overflow-y-auto max-h-[70vh]">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">No. Kandidat <span class="text-red-500">*</span></label>
              <input v-model="form.candidateNo" :disabled="!!editId" class="w-full border rounded-lg px-3 py-2 text-sm font-mono font-black text-rose-700 outline-none focus:border-rose-500 shadow-inner disabled:opacity-60" placeholder="REC-2026/022" />
            </div>
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Status Awal</label>
              <select v-model="form.status" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-rose-500 shadow-inner">
                <option v-for="st in STAGES" :key="st.key" :value="st.key">{{ st.emoji }} {{ st.label }}</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Nama Depan <span class="text-red-500">*</span></label>
              <input v-model="form.firstName" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-rose-500 shadow-inner" placeholder="Budi" />
            </div>
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Nama Belakang</label>
              <input v-model="form.lastName" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-rose-500 shadow-inner" placeholder="Santoso" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Email <span class="text-red-500">*</span></label>
              <input type="email" v-model="form.email" class="w-full border rounded-lg px-3 py-2 text-sm font-medium text-slate-800 outline-none focus:border-rose-500 shadow-inner" placeholder="budi@gmail.com" />
            </div>
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">No. HP</label>
              <input v-model="form.phone" class="w-full border rounded-lg px-3 py-2 text-sm font-medium text-slate-800 outline-none focus:border-rose-500 shadow-inner" placeholder="0812XXXXXXXX" />
            </div>
          </div>
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Posisi Dilamar <span class="text-red-500">*</span></label>
            <input v-model="form.position" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-rose-500 shadow-inner" placeholder="Sales Representative Jawa Barat" />
          </div>
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Sumber Kandidat</label>
            <select v-model="form.source" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-rose-500 shadow-inner">
              <option value="">— Pilih sumber —</option>
              <option v-for="s in SOURCES" :key="s">{{ s }}</option>
            </select>
          </div>
          <div v-if="formError" class="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 border border-red-200">{{ formError }}</div>
        </div>
        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
          <Button label="Batal" severity="secondary" :disabled="saving" @click="formDialog = false" class="bg-white border text-slate-700 font-bold px-5" />
          <Button :label="editId ? 'Simpan Perubahan' : 'Daftarkan Kandidat'"
            :loading="saving" :disabled="!form.candidateNo || !form.firstName || !form.email || !form.position"
            @click="submit" class="bg-rose-600 border-none text-white font-bold px-6" icon="pi pi-check" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Candidate = { id: string; candidateNo: string; firstName: string; lastName?: string; email: string; phone?: string; position?: string; status: string; appliedAt: string; };

const api = useApi();
const candidates = ref<Candidate[]>([]);
const loading = ref(false);
const saving = ref(false);
const advancing = ref(false);
const viewMode = ref<'kanban'|'table'>('kanban');
const filterStatus = ref('');
const search = ref('');
const formDialog = ref(false);
const editId = ref('');
const formError = ref('');
const detail = ref<Candidate | null>(null);
const detailNote = ref('');

const form = reactive({ candidateNo: '', firstName: '', lastName: '', email: '', phone: '', position: '', status: 'APPLIED', source: '' });

const STAGES = [
  { key: 'APPLIED',   label: 'Lamaran',   emoji: '📥', color: '#64748b', ring: 'ring-slate-300' },
  { key: 'SCREENING', label: 'Screening', emoji: '🔍', color: '#3b82f6', ring: 'ring-blue-300' },
  { key: 'INTERVIEW', label: 'Interview', emoji: '💬', color: '#8b5cf6', ring: 'ring-violet-300' },
  { key: 'OFFER',     label: 'Penawaran', emoji: '📄', color: '#f59e0b', ring: 'ring-amber-300' },
  { key: 'HIRED',     label: 'Diterima',  emoji: '✅', color: '#10b981', ring: 'ring-emerald-300' },
  { key: 'REJECTED',  label: 'Ditolak',   emoji: '❌', color: '#ef4444', ring: 'ring-rose-300' },
];
const STAGE_MAP = Object.fromEntries(STAGES.map(s => [s.key, s]));
const STAGE_ORDER = STAGES.map(s => s.key);

const SOURCES = ['Jobstreet', 'LinkedIn', 'Glints', 'Indeed', 'Kalibrr', 'JobFair', 'Walk-in', 'Internal Referral', 'Campus Recruitment', 'Lainnya'];

const stageOrderOf = (status: string) => STAGE_ORDER.indexOf(status);

const AVATAR_COLORS = ['#6366f1','#8b5cf6','#06b6d4','#10b981','#f59e0b','#ef4444','#ec4899','#14b8a6','#3b82f6','#f97316'];
const avatarColor = (n: string) => AVATAR_COLORS[(n?.charCodeAt(0) ?? 0) % AVATAR_COLORS.length];
const initials = (f: string, l?: string) => `${f?.[0] ?? ''}${l?.[0] ?? ''}`.toUpperCase();

const statusStyle = (s: string) => {
  const stage = STAGE_MAP[s];
  return { color: stage?.color, borderColor: stage?.color + '66', backgroundColor: stage?.color + '15' };
};

const stageCount = (key: string) => candidates.value.filter(c => c.status === key).length;
const candidatesInStage = (key: string) => filteredCandidates.value.filter(c => c.status === key);

const filteredCandidates = computed(() => {
  let list = candidates.value;
  if (filterStatus.value) list = list.filter(c => c.status === filterStatus.value);
  if (search.value.trim()) {
    const q = search.value.toLowerCase();
    list = list.filter(c =>
      c.firstName.toLowerCase().includes(q) ||
      (c.lastName ?? '').toLowerCase().includes(q) ||
      (c.position ?? '').toLowerCase().includes(q) ||
      c.candidateNo.toLowerCase().includes(q)
    );
  }
  return list;
});

const MONTHS = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
const formatDate = (iso: string) => { const d = new Date(iso); return `${String(d.getDate()).padStart(2,'0')} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`; };
const formatDateRelative = (iso: string) => {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Hari ini';
  if (diff === 1) return 'Kemarin';
  return `${diff} hari lalu`;
};

const NEXT_STAGES: Record<string, string> = { APPLIED: 'SCREENING', SCREENING: 'INTERVIEW', INTERVIEW: 'OFFER', OFFER: 'HIRED' };
const nextStage = (s: string) => NEXT_STAGES[s];
const nextStageLabel = (s: string) => STAGE_MAP[NEXT_STAGES[s]]?.label ?? '';
const nextStageColor = (s: string) => STAGE_MAP[NEXT_STAGES[s]]?.color ?? '#64748b';

const advance = async (c: Candidate) => { await advanceTo(c, NEXT_STAGES[c.status]); };
const advanceTo = async (c: Candidate, toStatus: string) => {
  if (!toStatus || c.status === toStatus) return;
  advancing.value = true;
  try {
    await api.post(`/hris/recruitment/${c.id}/advance`, { status: toStatus });
    await load();
    if (detail.value?.id === c.id) {
      detail.value = candidates.value.find(x => x.id === c.id) ?? null;
    }
  } catch (e) { console.warn(e); }
  finally { advancing.value = false; }
};

const load = async () => {
  loading.value = true;
  try {
    const res = await api.get('/hris/recruitment');
    candidates.value = res.data?.candidates ?? res.candidates ?? [];
  } catch (e) { console.warn(e); }
  finally { loading.value = false; }
};

const openDetail = (c: Candidate) => { detail.value = c; detailNote.value = ''; };
const openCreate = () => {
  editId.value = '';
  form.candidateNo = `REC-2026/${String(candidates.value.length + 1).padStart(3,'0')}`;
  form.firstName = ''; form.lastName = ''; form.email = ''; form.phone = '';
  form.position = ''; form.status = 'APPLIED'; form.source = '';
  formError.value = '';
  formDialog.value = true;
};
const openEdit = (c: Candidate) => {
  editId.value = c.id;
  form.candidateNo = c.candidateNo; form.firstName = c.firstName; form.lastName = c.lastName ?? '';
  form.email = c.email; form.phone = c.phone ?? ''; form.position = c.position ?? '';
  form.status = c.status; form.source = '';
  formError.value = '';
  detail.value = null;
  formDialog.value = true;
};

const submit = async () => {
  saving.value = true; formError.value = '';
  try {
    if (editId.value) {
      await api.post(`/hris/recruitment/${editId.value}/advance`, { status: form.status });
    } else {
      await api.post('/hris/recruitment', {
        candidateNo: form.candidateNo, firstName: form.firstName, lastName: form.lastName || undefined,
        email: form.email, phone: form.phone || undefined, position: form.position || undefined,
      });
    }
    formDialog.value = false;
    await load();
  } catch (e: any) { formError.value = e?.response?.data?.message ?? 'Gagal menyimpan'; }
  finally { saving.value = false; }
};

onMounted(load);
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
.animate-slide-in-right { animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes slideInRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
</style>