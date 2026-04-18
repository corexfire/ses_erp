<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-6 shadow-sm border-l-4 border-l-amber-500 relative overflow-hidden">
      <div class="absolute right-[-12px] top-[-12px] opacity-5 pointer-events-none">
        <i class="pi pi-receipt text-[150px] text-amber-900"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-start gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-receipt text-amber-600"></i> Expense & Reimbursement
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
            Pusat persetujuan klaim pengeluaran karyawan (Reimbursement). Kelola klaim medis, transport, dinas luar kota, dan pengeluaran entertainmen.
          </div>
        </div>
        <div class="flex gap-2 shrink-0">
          <Button label="Buat Klaim (Admin)" size="small" icon="pi pi-plus" class="bg-amber-600 text-white border-none font-bold shadow-sm hover:bg-amber-700" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Stats & Filters -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
      <div class="bg-white border rounded-xl p-4 shadow-sm flex items-center justify-between">
        <div>
          <div class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Klaim Bulan Ini</div>
          <div class="text-2xl font-black text-slate-800 mt-0.5">{{ totalClaimsCount }}</div>
        </div>
        <div class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center"><i class="pi pi-file text-slate-500 text-lg"></i></div>
      </div>
      <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
        <div>
          <div class="text-[10px] font-black text-amber-600 uppercase tracking-widest">Menunggu Validasi</div>
          <div class="text-2xl font-black text-amber-700 mt-0.5">{{ pendingCount }}</div>
        </div>
        <div class="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center"><i class="pi pi-clock text-amber-600 text-lg"></i></div>
      </div>
      <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
        <div>
          <div class="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Total Nominal Disetujui</div>
          <div class="text-lg font-black text-emerald-700 mt-0.5">{{ fmtRp(totalApprovedAmount) }}</div>
        </div>
      </div>
      <div class="bg-rose-50 border border-rose-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
        <div>
          <div class="text-[10px] font-black text-rose-600 uppercase tracking-widest">Total Nominal Ditolak</div>
          <div class="text-lg font-black text-rose-700 mt-0.5">{{ fmtRp(totalRejectedAmount) }}</div>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="bg-white border rounded-xl p-4 shadow-sm flex flex-wrap gap-3 items-center">
      <div class="flex gap-1 bg-slate-100 rounded-lg p-1">
        <button v-for="s in ['SEMUA','PENDING','APPROVED','REJECTED']" :key="s"
          @click="filterStatus = s === 'SEMUA' ? '' : s"
          :class="(filterStatus || 'SEMUA') === s ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'"
          class="px-3 py-1.5 rounded-md text-[11px] font-black transition">
          {{ s }}
        </button>
      </div>
      <select v-model="filterCategory" class="border rounded-lg px-3 py-2 text-sm font-semibold h-10 outline-none focus:border-amber-500">
        <option value="">Semua Kategori</option>
        <option v-for="c in CATEGORIES" :key="c" :value="c">{{ c }}</option>
      </select>
      <InputText v-model="search" placeholder="Cari No Klaim atau Karyawan..." class="text-sm h-10 w-64" />
      <Button severity="secondary" size="small" :loading="loading" icon="pi pi-refresh" @click="load" outlined class="h-10 w-10 ml-auto" />
    </div>

    <!-- === TABLE VIEW === -->
    <div class="rounded-xl border bg-white shadow-sm overflow-hidden animate-fade-in-up">
      <table class="w-full text-sm">
        <thead class="bg-amber-900 text-left text-[11px] text-white uppercase tracking-widest font-bold">
          <tr>
            <th class="px-5 py-3 w-32">Klaim & Tgl</th>
            <th class="px-4 py-3 border-l">Karyawan Pemohon</th>
            <th class="px-4 py-3 border-l text-center w-32">Kategori</th>
            <th class="px-4 py-3 border-l w-48 truncate">Keterangan</th>
            <th class="px-4 py-3 border-l text-right w-36">Nominal Klaim</th>
            <th class="px-4 py-3 border-l text-center w-28">Status</th>
            <th class="px-4 py-3 border-l text-center w-32">Aksi Approval</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="7" class="py-16 text-center text-slate-400"><i class="pi pi-spinner pi-spin mr-2 text-amber-600"></i> Memuat data reimbursement...</td>
          </tr>
          <tr v-for="c in filteredClaims" v-else :key="c.id"
            class="border-t transition hover:bg-amber-50/10 cursor-pointer"
            @click="openDetail(c)">
            <td class="px-5 py-3 align-middle border-l-4" :style="{ borderLeftColor: categoryMeta(c.category).color }">
              <div class="font-mono text-xs font-black text-amber-700 bg-amber-50 border border-amber-100 rounded px-1.5 py-0.5 inline-block">{{ c.claimNo }}</div>
              <div class="text-[10px] text-slate-500 font-bold mt-1">{{ formatDateObj(c.claimDate) }}</div>
            </td>
            <td class="px-4 py-3 align-middle border-l">
              <div class="flex items-center gap-2">
                <div class="w-7 h-7 rounded-sm flex items-center justify-center font-black text-[10px] text-white shrink-0"
                  :style="{ backgroundColor: avatarColor(c.employee?.firstName ?? 'A') }">
                  {{ initials(c.employee?.firstName, c.employee?.lastName) }}
                </div>
                <div>
                  <div class="font-black text-slate-800 text-xs">{{ c.employee?.firstName }} {{ c.employee?.lastName ?? '' }}</div>
                  <div class="text-[10px] text-slate-500 mt-0.5">{{ c.employee?.department || 'N/A' }}</div>
                </div>
              </div>
            </td>
            <td class="px-4 py-3 align-middle border-l text-center">
              <span class="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded" 
                :style="{ color: categoryMeta(c.category).color, backgroundColor: categoryMeta(c.category).bg }">
                <i :class="categoryMeta(c.category).icon" class="mr-1"></i>{{ c.category }}
              </span>
            </td>
            <td class="px-4 py-3 align-middle border-l">
              <div class="text-xs text-slate-600 line-clamp-2">{{ c.description || '—' }}</div>
            </td>
            <td class="px-4 py-3 align-middle border-l text-right">
              <span class="font-black font-mono text-slate-800">{{ fmtRp(c.amount) }}</span>
            </td>
            <td class="px-4 py-3 align-middle border-l text-center">
              <span :class="statusBadge(c.status)" class="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border">
                {{ c.status }}
              </span>
            </td>
            <td class="px-4 py-3 align-middle border-l text-center">
              <div v-if="c.status === 'PENDING'" class="flex justify-center gap-1">
                <Button icon="pi pi-check" size="small" class="h-7 w-7 text-emerald-600 bg-emerald-50 border-emerald-200 hover:bg-emerald-600 hover:text-white" v-tooltip="'Setujui'" @click.stop="approve(c)" />
                <Button icon="pi pi-times" size="small" class="h-7 w-7 text-rose-600 bg-rose-50 border-rose-200 hover:bg-rose-600 hover:text-white" v-tooltip="'Tolak'" @click.stop="reject(c)" />
              </div>
              <div v-else>
                <Button label="Lihat" size="small" outlined class="text-[9px] h-7 px-2 font-bold text-amber-700 border-amber-200 hover:bg-amber-100" @click.stop="openDetail(c)" />
              </div>
            </td>
          </tr>
          <tr v-if="!loading && filteredClaims.length === 0">
            <td colspan="7" class="py-12 text-center text-slate-400 italic">Tidak ada klaim yang sesuai dengan filter.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Detail Drawer -->
    <div v-if="detailClaim" class="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm" @click.self="detailClaim = null">
      <div class="w-full max-w-md h-full bg-white shadow-2xl flex flex-col overflow-y-auto animate-slide-in-right">
        <div class="p-5 border-b"
          :style="{ borderLeft: `6px solid ${categoryMeta(detailClaim.category).color}`, background: `linear-gradient(to right, ${categoryMeta(detailClaim.category).color}15, #fff)` }">
          <div class="flex justify-between items-start">
            <div>
              <div class="text-[10px] font-black uppercase tracking-widest" :style="{ color: categoryMeta(detailClaim.category).color }">
                <i :class="categoryMeta(detailClaim.category).icon"></i> Klaim Pengeluaran
              </div>
              <div class="font-black font-mono text-xl text-slate-800 mt-1">{{ detailClaim.claimNo }}</div>
            </div>
            <button class="text-slate-400 hover:text-slate-600 bg-slate-100 w-8 h-8 rounded-full font-bold shrink-0" @click="detailClaim = null">✕</button>
          </div>
        </div>

        <div class="p-6 space-y-6 flex-1">
          <!-- Pemohon -->
          <div class="bg-slate-50 border rounded-xl p-4 flex items-center gap-3">
            <div class="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-white shrink-0"
              :style="{ backgroundColor: avatarColor(detailClaim.employee?.firstName ?? 'A') }">
              {{ initials(detailClaim.employee?.firstName, detailClaim.employee?.lastName) }}
            </div>
            <div>
              <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dibuat Oleh</div>
              <div class="font-black text-slate-800">{{ detailClaim.employee?.firstName }} {{ detailClaim.employee?.lastName ?? '' }}</div>
              <div class="text-xs text-slate-500 font-medium">{{ detailClaim.employee?.department }} · {{ detailClaim.employee?.position }}</div>
            </div>
          </div>

          <!-- Nominal -->
          <div class="text-center rounded-xl p-6 border-2 border-dashed" :style="{ borderColor: categoryMeta(detailClaim.category).color + '40', backgroundColor: categoryMeta(detailClaim.category).bg }">
            <div class="text-[10px] font-black uppercase tracking-widest" :style="{ color: categoryMeta(detailClaim.category).color }">Nominal Klaim ({{ detailClaim.category }})</div>
            <div class="text-4xl font-black font-mono mt-2" :style="{ color: categoryMeta(detailClaim.category).color }">{{ fmtRpScale(detailClaim.amount) }}</div>
          </div>

          <!-- Rincian -->
          <div class="space-y-4">
            <div>
              <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tanggal Transaksi / Kuitansi</div>
              <div class="text-sm font-bold text-slate-800">{{ formatDateFull(detailClaim.claimDate) }}</div>
            </div>
            <div>
              <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tujuan / Keterangan</div>
              <div class="text-sm text-slate-700 italic border-l-2 pl-3 py-1 font-medium bg-slate-50 rounded-r-lg line-clamp-4">"{{ detailClaim.description || '-' }}"</div>
            </div>
            <div class="flex items-center justify-between border-t border-b py-3">
              <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status Saat Ini</div>
              <span :class="statusBadge(detailClaim.status)" class="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border">
                {{ detailClaim.status }}
              </span>
            </div>
          </div>
        </div>

        <div class="p-4 border-t bg-slate-50 flex gap-2">
          <template v-if="detailClaim.status === 'PENDING'">
            <Button label="Batal" severity="secondary" outlined class="text-[11px] font-bold text-slate-700 w-24 border-slate-300" @click="detailClaim = null" />
            <Button label="Tolak" severity="danger" outlined icon="pi pi-times" class="flex-1 font-bold text-[11px]" :loading="actioning" @click="reject(detailClaim)" />
            <Button label="Setujui Klaim" class="flex-1 bg-emerald-600 text-white border-none font-bold text-[11px]" icon="pi pi-check" :loading="actioning" @click="approve(detailClaim)" />
          </template>
          <template v-else>
            <div class="text-[11px] flex-1 text-center font-bold text-slate-400">Telah diproses dan tidak dapat diubah.</div>
            <Button label="Tutup" severity="secondary" outlined class="text-[11px] font-bold text-slate-700 border-slate-300" @click="detailClaim = null" />
          </template>
        </div>
      </div>
    </div>

    <!-- Create Form (Admin) -->
    <div v-if="formDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div class="w-full max-w-lg rounded-2xl border bg-white shadow-2xl flex flex-col animate-fade-in-up">
        <div class="p-5 border-b bg-slate-50 flex justify-between rounded-t-2xl">
          <div class="text-lg font-black text-slate-800 flex items-center gap-2">
            <i class="pi pi-receipt text-amber-700"></i> Buat Klaim Baru (Admin/HR)
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-100 w-8 h-8 rounded-full font-bold" @click="formDialog = false">✕</button>
        </div>
        
        <div class="p-6 space-y-4">
          <div class="bg-amber-50 text-amber-800 text-xs p-3 rounded-lg border border-amber-200 mb-2">
            <i class="pi pi-info-circle"></i> Ini adalah Form Pembuatan via Panel Admin. Digunakan jika karyawan tidak dapat mengakses ESS.
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1.5 col-span-2">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Karyawan Pemohon <span class="text-red-500">*</span></label>
              <select v-model="form.employeeId" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-amber-500 shadow-inner">
                <option value="">— Pilih Karyawan —</option>
                <option v-for="e in employees" :key="e.id" :value="e.id">{{ e.employeeNo }} — {{ e.firstName }} {{ e.lastName ?? '' }}</option>
              </select>
            </div>
            
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Kategori <span class="text-red-500">*</span></label>
              <select v-model="form.category" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-amber-800 outline-none focus:border-amber-500 shadow-inner">
                <option v-for="c in CATEGORIES" :key="c" :value="c">{{ c }}</option>
              </select>
            </div>
            
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tanggal Nota/Transaksi <span class="text-red-500">*</span></label>
              <input type="date" v-model="form.claimDate" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-amber-700 outline-none focus:border-amber-500 shadow-inner" />
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Nominal Klaim (Rp) <span class="text-red-500">*</span></label>
            <input type="number" v-model.number="form.amount" class="w-full border rounded-lg px-3 py-2 text-lg font-black font-mono text-slate-800 outline-none focus:border-amber-500 shadow-inner" placeholder="0" />
          </div>

          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tujuan / Penjelasan <span class="text-red-500">*</span></label>
            <textarea v-model="form.description" rows="3" class="w-full border rounded-lg px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-amber-500 shadow-inner resize-none" placeholder="Taksi untuk visit outlet XYZ..."></textarea>
          </div>

          <div v-if="formError" class="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 border border-red-200">{{ formError }}</div>
        </div>

        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
          <Button label="Batal" severity="secondary" :disabled="saving" @click="formDialog = false" class="bg-white border text-slate-700 font-bold px-5" />
          <Button label="Buat Klaim Baru" :loading="saving" :disabled="!form.employeeId || !form.amount || !form.description"
            @click="submit" class="bg-amber-600 border-none text-white font-bold px-6" icon="pi pi-check" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const claims = ref<any[]>([]);
const employees = ref<any[]>([]);
const loading = ref(false);
const saving = ref(false);
const actioning = ref(false);

const filterStatus = ref('');
const filterCategory = ref('');
const search = ref('');

const detailClaim = ref<any>(null);
const formDialog = ref(false);
const formError = ref('');

const CATEGORIES = ['MEDICAL', 'TRANSPORT', 'ENTERTAINMENT', 'SUPPLIES', 'TRAVEL'];

const form = reactive({ employeeId: '', claimDate: new Date().toISOString().slice(0, 10), category: 'TRANSPORT', amount: 0, description: '' });

const AVATAR_COLORS = ['#6366f1','#8b5cf6','#06b6d4','#10b981','#f59e0b','#ef4444','#ec4899','#14b8a6','#3b82f6','#f97316'];
const avatarColor = (n: string) => AVATAR_COLORS[(n?.charCodeAt(0) ?? 0) % AVATAR_COLORS.length];
const initials = (f?: string, l?: string) => `${f?.[0] ?? ''}${l?.[0] ?? ''}`.toUpperCase();

const fmtRpScale = (n: number|string) => `Rp ${Number(n).toLocaleString('id-ID')}`;
const fmtRp = (n: number|string) => {
  const v = Number(n);
  if (v >= 1_000_000_000) return `Rp ${(v/1_000_000_000).toFixed(2)} M`;
  if (v >= 1_000_000) return `Rp ${(v/1_000_000).toFixed(1)} Jt`;
  return `Rp ${v.toLocaleString('id-ID')}`;
};

const formatDateObj = (iso: string) => { 
  if (!iso) return '';
  const d = new Date(iso); return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`; 
};
const formatDateFull = (iso: string) => { 
  if (!iso) return '';
  const d = new Date(iso); 
  const m = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  return `${String(d.getDate()).padStart(2,'0')} ${m[d.getMonth()]} ${d.getFullYear()}`; 
};

const statusBadge = (s: string) => ({
  PENDING: 'bg-amber-50 text-amber-700 border-amber-300',
  APPROVED: 'bg-emerald-50 text-emerald-700 border-emerald-300',
  REJECTED: 'bg-rose-50 text-rose-700 border-rose-300',
  PAID: 'bg-blue-50 text-blue-700 border-blue-300'
}[s] ?? 'bg-slate-50 text-slate-500 border-slate-200');

const categoryMeta = (cat: string) => {
  if (cat === 'MEDICAL') return { color: '#ef4444', bg: '#ef44441a', icon: 'pi pi-heart-fill' }; // red
  if (cat === 'TRANSPORT') return { color: '#3b82f6', bg: '#3b82f61a', icon: 'pi pi-car' }; // blue
  if (cat === 'ENTERTAINMENT') return { color: '#8b5cf6', bg: '#8b5cf61a', icon: 'pi pi-star-fill' }; // purple
  if (cat === 'SUPPLIES') return { color: '#f59e0b', bg: '#f59e0b1a', icon: 'pi pi-box' }; // amber
  if (cat === 'TRAVEL') return { color: '#14b8a6', bg: '#14b8a61a', icon: 'pi pi-send' }; // teal
  return { color: '#64748b', bg: '#64748b1a', icon: 'pi pi-tag' };
};

const filteredClaims = computed(() => {
  let list = claims.value;
  if (filterStatus.value) list = list.filter(c => c.status === filterStatus.value);
  if (filterCategory.value) list = list.filter(c => c.category === filterCategory.value);
  if (search.value.trim()) {
    const q = search.value.toLowerCase();
    list = list.filter(c => 
      c.claimNo?.toLowerCase().includes(q) ||
      c.employee?.firstName?.toLowerCase().includes(q) || 
      c.employee?.lastName?.toLowerCase().includes(q)
    );
  }
  return list;
});

const currentMonthPrefix = new Date().toISOString().slice(0, 7);
const totalClaimsCount = computed(() => claims.value.filter(c => c.claimDate.startsWith(currentMonthPrefix)).length);
const pendingCount = computed(() => claims.value.filter(c => c.status === 'PENDING').length);
const totalApprovedAmount = computed(() => claims.value.filter(c => c.status === 'APPROVED' || c.status === 'PAID').reduce((s, c) => s + Number(c.amount), 0));
const totalRejectedAmount = computed(() => claims.value.filter(c => c.status === 'REJECTED').reduce((s, c) => s + Number(c.amount), 0));

const load = async () => {
  loading.value = true;
  try {
    const [empRes, expRes] = await Promise.all([
      api.get('/hris/employees'),
      api.get('/hris/expense')
    ]);
    employees.value = (empRes.data?.employees ?? empRes.employees ?? []).filter((e:any) => e.status === 'ACTIVE');
    claims.value = expRes.data?.claims ?? expRes.claims ?? [];
  } catch (e) { console.warn(e); }
  finally { loading.value = false; }
};

const openDetail = (c: any) => { detailClaim.value = c; };
const openCreate = () => {
  form.employeeId = ''; form.amount = 0; form.description = ''; form.category = 'TRANSPORT';
  form.claimDate = new Date().toISOString().slice(0, 10);
  formError.value = ''; formDialog.value = true;
};

const submit = async () => {
  saving.value = true; formError.value = '';
  try {
    // Generate claim no auto
    const claimNo = `EXP-${new Date().getFullYear()}${String(new Date().getMonth()+1).padStart(2,'0')}-${Math.floor(Math.random() * 9000 + 1000)}`;
    await api.post('/hris/expense', { ...form, claimNo });
    formDialog.value = false;
    await load();
  } catch (e: any) { formError.value = e?.response?.data?.message ?? 'Gagal menyimpan claim'; }
  finally { saving.value = false; }
};

const approve = async (c: any) => {
  actioning.value = true;
  try {
    await api.post(`/hris/expense/${c.id}/approve`);
    if (detailClaim.value?.id === c.id) detailClaim.value.status = 'APPROVED';
    await load();
  } catch (e) { console.warn(e); }
  finally { actioning.value = false; }
};

const reject = async (c: any) => {
  actioning.value = true;
  try {
    await api.post(`/hris/expense/${c.id}/reject`);
    if (detailClaim.value?.id === c.id) detailClaim.value.status = 'REJECTED';
    await load();
  } catch (e) { console.warn(e); }
  finally { actioning.value = false; }
};

onMounted(load);
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
.animate-slide-in-right { animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes slideInRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.line-clamp-4 { display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
</style>