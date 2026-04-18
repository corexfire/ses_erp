<template>
  <div class="space-y-6">
    <!-- View As Selector (Mock ESS Context) -->
    <div class="bg-indigo-900 rounded-xl p-4 text-white shadow-lg flex flex-col md:flex-row items-center gap-4 justify-between">
      <div class="flex items-center gap-3">
        <div class="bg-indigo-800 p-2 rounded-lg">
          <i class="pi pi-desktop text-xl text-indigo-300"></i>
        </div>
        <div>
          <div class="text-[10px] font-black text-indigo-300 uppercase tracking-widest">Portal Karyawan (ESS)</div>
          <div class="font-bold text-sm text-indigo-100">Simulasikan tampilan Employee Self-Service (ESS). Plih karyawan untuk melihat data spesifik mereka.</div>
        </div>
      </div>
      <div class="w-full md:w-80 shrink-0">
        <select v-model="selectedEmployeeId" class="w-full bg-indigo-800 border-none text-white text-sm font-semibold rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-400">
          <option value="">— Simulasikan sebagai Karyawan —</option>
          <option v-for="e in employees" :key="e.id" :value="e.id">{{ e.employeeNo }} — {{ e.firstName }} {{ e.lastName ?? '' }}</option>
        </select>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!emp" class="rounded-xl border border-dashed border-indigo-200 bg-indigo-50/50 p-12 text-center text-indigo-400 font-medium h-96 flex flex-col items-center justify-center">
      <i class="pi pi-user text-5xl mb-4 text-indigo-200"></i>
      Pilih karyawan di atas untuk melihat portal ESS-nya.
    </div>

    <!-- ESS Dashboard -->
    <div v-else class="space-y-6 animate-fade-in-up">
      <!-- Profile Header -->
      <div class="bg-white border rounded-xl overflow-hidden shadow-sm">
        <div class="h-24 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
          <div class="absolute -bottom-10 left-6 border-4 border-white rounded-xl shadow-lg bg-white overflow-hidden">
            <div class="w-20 h-20 flex items-center justify-center font-black text-3xl text-white bg-indigo-500">
              {{ initials }}
            </div>
          </div>
        </div>
        <div class="pt-12 px-6 pb-6">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <div class="text-2xl font-black text-slate-800">{{ emp.firstName }} {{ emp.lastName ?? '' }}</div>
              <div class="text-sm font-bold text-indigo-600 mt-0.5">{{ emp.position || 'Employee' }} · <span class="text-slate-500">{{ emp.department || 'N/A' }}</span></div>
              <div class="flex gap-4 mt-3 text-xs text-slate-500 font-medium">
                <span class="flex items-center gap-1.5"><i class="pi pi-id-card text-indigo-400"></i> {{ emp.employeeNo }}</span>
                <span class="flex items-center gap-1.5"><i class="pi pi-envelope text-indigo-400"></i> {{ emp.email }}</span>
                <span v-if="emp.phone" class="flex items-center gap-1.5"><i class="pi pi-phone text-indigo-400"></i> {{ emp.phone }}</span>
              </div>
            </div>
            
            <div class="flex gap-2 shrink-0">
              <Button label="Buat Klaim" size="small" icon="pi pi-receipt" class="bg-indigo-600 border-none text-white font-bold" @click="openExpense" />
              <Button label="Request Cuti" size="small" icon="pi pi-calendar-plus" outlined severity="secondary" disabled v-tooltip="'Fitur Cuti sedang dikembangkan'" />
            </div>
          </div>
        </div>
      </div>

      <!-- Quick KPI Strip -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white border rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <div class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Saldo Cuti Tahunan</div>
            <div class="text-2xl font-black text-indigo-700 mt-0.5">10 <span class="text-xs text-slate-400 font-bold">hari</span></div>
          </div>
          <div class="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center"><i class="pi pi-calendar text-indigo-500 text-lg"></i></div>
        </div>
        <div class="bg-white border rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <div class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Klaim Reimbursement (Pending)</div>
            <div class="text-2xl font-black text-amber-600 mt-0.5">{{ pendingClaimsCount }}</div>
          </div>
          <div class="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center"><i class="pi pi-clock text-amber-500 text-lg"></i></div>
        </div>
        <div class="bg-white border rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <div class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Kehadiran Bulan Ini</div>
            <div class="text-2xl font-black text-emerald-600 mt-0.5">{{ attendanceThisMonth }} <span class="text-xs text-slate-400 font-bold">hari</span></div>
          </div>
          <div class="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center"><i class="pi pi-check-circle text-emerald-500 text-lg"></i></div>
        </div>
        <div class="bg-white border rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <div class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Nilai KPI Terakhir</div>
            <div class="text-2xl font-black text-purple-600 mt-0.5">{{ lastKpiGrade }}</div>
          </div>
          <div class="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center"><i class="pi pi-star-fill text-purple-500 text-lg"></i></div>
        </div>
      </div>

      <!-- Main Tabs -->
      <div class="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div class="flex overflow-x-auto border-b hide-scrollbar">
          <button v-for="t in TABS" :key="t.id"
            @click="activeTab = t.id"
            class="px-5 py-4 text-sm font-black transition whitespace-nowrap flex items-center gap-2 border-b-2"
            :class="activeTab === t.id ? 'text-indigo-600 border-indigo-600 bg-indigo-50/30' : 'text-slate-500 border-transparent hover:text-slate-800 hover:bg-slate-50'">
            <i :class="t.icon" :style="{ color: activeTab === t.id ? t.color : '' }"></i> {{ t.label }}
          </button>
        </div>

        <div class="p-5">
          <!-- PAYROLL TAB -->
          <div v-if="activeTab === 'payroll'" class="animate-fade-in-up">
            <table class="w-full text-sm">
              <thead class="bg-slate-50 text-left text-[11px] text-slate-500 uppercase tracking-widest font-black">
                <tr>
                  <th class="px-4 py-3">Periode</th>
                  <th class="px-4 py-3 border-l text-right">Gaji Pokok</th>
                  <th class="px-4 py-3 border-l text-right">Tunjangan</th>
                  <th class="px-4 py-3 border-l text-right">Potongan</th>
                  <th class="px-4 py-3 border-l text-right">Take-Home Pay</th>
                  <th class="px-4 py-3 border-l text-center">Status</th>
                  <th class="px-4 py-3 border-l text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in myPayrolls" :key="p.id" class="border-t transition hover:bg-slate-50">
                  <td class="px-4 py-3 font-black text-slate-700">{{ p.period }}</td>
                  <td class="px-4 py-3 border-l text-right font-mono text-xs">{{ fmtRp(p.basicSalary) }}</td>
                  <td class="px-4 py-3 border-l text-right font-mono text-xs text-green-600">+{{ fmtRp(p.allowances) }}</td>
                  <td class="px-4 py-3 border-l text-right font-mono text-xs text-rose-600">-{{ fmtRp(Number(p.deductions) + Number(p.taxAmount)) }}</td>
                  <td class="px-4 py-3 border-l text-right font-mono font-black text-indigo-700">{{ fmtRp(p.netPay) }}</td>
                  <td class="px-4 py-3 border-l text-center">
                    <span :class="p.status === 'APPROVED' ? 'text-emerald-600 bg-emerald-50 border-emerald-200' : 'text-slate-500 bg-slate-50 border-slate-200'" class="text-[9px] font-black uppercase px-2 py-0.5 border rounded-full">{{ p.status }}</span>
                  </td>
                  <td class="px-4 py-3 border-l text-right">
                    <Button label="Slip" size="small" outlined class="text-[9px] py-1 px-2 font-bold h-auto border-indigo-200 text-indigo-600 hover:bg-indigo-600 hover:text-white" />
                  </td>
                </tr>
                <tr v-if="myPayrolls.length === 0">
                  <td colspan="7" class="py-12 text-center text-slate-400 italic">Belum ada riwayat slip gaji.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- ATTENDANCE TAB -->
          <div v-if="activeTab === 'attendance'" class="animate-fade-in-up">
            <table class="w-full text-sm">
              <thead class="bg-slate-50 text-left text-[11px] text-slate-500 uppercase tracking-widest font-black">
                <tr>
                  <th class="px-4 py-3">Tanggal</th>
                  <th class="px-4 py-3 border-l text-center">Check In</th>
                  <th class="px-4 py-3 border-l text-center">Check Out</th>
                  <th class="px-4 py-3 border-l text-center">Jam Kerja</th>
                  <th class="px-4 py-3 border-l text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="a in myAttendances" :key="a.id" class="border-t transition hover:bg-slate-50">
                  <td class="px-4 py-3 font-black text-slate-700">{{ formatDateFull(a.date) }}</td>
                  <td class="px-4 py-3 border-l text-center font-mono text-emerald-600 font-bold">{{ a.checkIn ? formatTime(a.checkIn) : '—' }}</td>
                  <td class="px-4 py-3 border-l text-center font-mono text-rose-600 font-bold">{{ a.checkOut ? formatTime(a.checkOut) : '—' }}</td>
                  <td class="px-4 py-3 border-l text-center font-black text-slate-500">{{ a.workHours ? Number(a.workHours).toFixed(1) + 'h' : '—' }}</td>
                  <td class="px-4 py-3 border-l text-center">
                    <span :class="attStatusClass(a.status)" class="text-[9px] font-black uppercase px-2 py-0.5 border rounded-full">{{ a.status }}</span>
                  </td>
                </tr>
                <tr v-if="myAttendances.length === 0">
                  <td colspan="5" class="py-12 text-center text-slate-400 italic">Belum ada riwayat kehadiran.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- CLAIMS TAB -->
          <div v-if="activeTab === 'claims'" class="animate-fade-in-up">
            <table class="w-full text-sm">
              <thead class="bg-slate-50 text-left text-[11px] text-slate-500 uppercase tracking-widest font-black">
                <tr>
                  <th class="px-4 py-3">No Klaim</th>
                  <th class="px-4 py-3 border-l">Tanggal</th>
                  <th class="px-4 py-3 border-l">Kategori</th>
                  <th class="px-4 py-3 border-l text-right">Nominal</th>
                  <th class="px-4 py-3 border-l">Keterangan</th>
                  <th class="px-4 py-3 border-l text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="c in myClaims" :key="c.id" class="border-t transition hover:bg-slate-50">
                  <td class="px-4 py-3 font-mono font-black text-xs text-indigo-700">{{ c.claimNo }}</td>
                  <td class="px-4 py-3 border-l text-xs text-slate-600 font-medium">{{ formatDateFull(c.claimDate) }}</td>
                  <td class="px-4 py-3 border-l">
                    <span class="text-[9px] font-black uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{{ c.category }}</span>
                  </td>
                  <td class="px-4 py-3 border-l text-right font-mono font-black text-sm">{{ fmtRp(c.amount) }}</td>
                  <td class="px-4 py-3 border-l text-xs text-slate-600">{{ c.description || '—' }}</td>
                  <td class="px-4 py-3 border-l text-center">
                    <span :class="claimStatusClass(c.status)" class="text-[9px] font-black uppercase px-2 py-0.5 border rounded-full">{{ c.status }}</span>
                  </td>
                </tr>
                <tr v-if="myClaims.length === 0">
                  <td colspan="6" class="py-12 text-center text-slate-400 italic">Belum ada klaim reimbursement.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- KPI TAB -->
          <div v-if="activeTab === 'kpi'" class="animate-fade-in-up grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="k in myKpis" :key="k.id" class="border rounded-xl p-5 shadow-sm bg-gradient-to-br from-white to-slate-50">
              <div class="flex justify-between items-start">
                <div>
                  <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Periode Evaluasi</div>
                  <div class="text-lg font-black text-slate-800">{{ k.period }}</div>
                </div>
                <div class="text-right">
                  <div class="text-3xl font-black" :class="gradeColor(k.grade)">{{ k.score }}<span class="text-sm text-slate-400">/100</span></div>
                  <div class="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border mt-1" :class="gradeBadge(k.grade)">{{ k.grade }}</div>
                </div>
              </div>
              <div class="mt-4 pt-4 border-t text-sm text-slate-600 italic">
                "{{ k.comments || 'Telah dievaluasi oleh Atasan.' }}"
              </div>
            </div>
            <div v-if="myKpis.length === 0" class="col-span-1 border border-dashed rounded-xl p-12 text-center text-slate-400 italic">
              Belum ada evaluasi kinerja.
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Claim Modal -->
    <div v-if="claimDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div class="w-full max-w-md rounded-2xl border bg-white shadow-2xl flex flex-col animate-fade-in-up">
        <div class="p-5 border-b bg-slate-50 flex justify-between rounded-t-2xl">
          <div class="text-lg font-black text-slate-800 flex items-center gap-2">
            <i class="pi pi-receipt text-indigo-600"></i> Buat Klaim Pengeluaran
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-100 w-8 h-8 rounded-full font-bold" @click="claimDialog = false">✕</button>
        </div>
        <div class="p-6 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Kategori <span class="text-red-500">*</span></label>
              <select v-model="claimForm.category" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-indigo-500 shadow-inner">
                <option v-for="c in ['MEDICAL','TRANSPORT','ENTERTAINMENT','SUPPLIES','TRAVEL']" :key="c" :value="c">{{ c }}</option>
              </select>
            </div>
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tanggal <span class="text-red-500">*</span></label>
              <input type="date" v-model="claimForm.date" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-indigo-700 outline-none focus:border-indigo-500 shadow-inner" />
            </div>
          </div>
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Nominal (Rp) <span class="text-red-500">*</span></label>
            <input type="number" v-model.number="claimForm.amount" class="w-full border rounded-lg px-3 py-2 text-sm font-black font-mono text-slate-800 outline-none focus:border-indigo-500 shadow-inner" placeholder="0" />
          </div>
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Keterangan / Tujuan <span class="text-red-500">*</span></label>
            <textarea v-model="claimForm.desc" rows="3" class="w-full border rounded-lg px-3 py-2 text-sm text-slate-700 outline-none focus:border-indigo-500 shadow-inner resize-none" placeholder="Taksi untuk visit outlet XYZ..."></textarea>
          </div>
          <div class="bg-blue-50 border border-blue-100 p-3 rounded-lg flex gap-2">
            <i class="pi pi-info-circle text-blue-500 mt-0.5 text-xs"></i>
            <div class="text-[10px] text-blue-700 font-medium">Pastikan menyimpan bukti bayar asli / struk / invoice. HR akan memintanya pada saat pencairan jika disetujui.</div>
          </div>
          <div v-if="claimError" class="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 border border-red-200">{{ claimError }}</div>
        </div>
        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
          <Button label="Batal" severity="secondary" :disabled="claimSaving" @click="claimDialog = false" class="bg-white border text-slate-700 font-bold px-5" />
          <Button label="Ajukan Klaim" :loading="claimSaving" :disabled="!claimForm.amount || !claimForm.desc"
            @click="submitClaim" class="bg-indigo-600 border-none text-white font-bold px-6" icon="pi pi-send" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();

const loading = ref(false);
const employees = ref<any[]>([]);
const selectedEmployeeId = ref('');

// Full datasets
const allPayrolls = ref<any[]>([]);
const allAttendances = ref<any[]>([]);
const allClaims = ref<any[]>([]);
const allKpis = ref<any[]>([]);

// My filtered datasets
const emp = computed(() => employees.value.find(e => e.id === selectedEmployeeId.value));
const initials = computed(() => { const f = emp.value?.firstName?.[0]||''; const l = emp.value?.lastName?.[0]||''; return (f+l).toUpperCase() || 'U'; });
const myPayrolls = computed(() => allPayrolls.value.filter(x => x.employeeId === selectedEmployeeId.value));
const myAttendances = computed(() => allAttendances.value.filter(x => x.employeeId === selectedEmployeeId.value));
const myClaims = computed(() => allClaims.value.filter(x => x.employeeId === selectedEmployeeId.value));
const myKpis = computed(() => allKpis.value.filter(x => x.employeeId === selectedEmployeeId.value));

const pendingClaimsCount = computed(() => myClaims.value.filter(c => c.status === 'PENDING').length);
const attendanceThisMonth = computed(() => myAttendances.value.filter(a => a.status === 'PRESENT' && a.date.startsWith(new Date().toISOString().slice(0, 7))).length);
const lastKpiGrade = computed(() => myKpis.value.length ? myKpis.value[0]?.grade?.split(' ')[0] : 'N/A');

const activeTab = ref('payroll');
const TABS = [
  { id: 'payroll', label: 'Slip Gaji', icon: 'pi pi-money-bill', color: '#10b981' },
  { id: 'attendance', label: 'Kehadiran', icon: 'pi pi-check-circle', color: '#3b82f6' },
  { id: 'claims', label: 'Reimbursement', icon: 'pi pi-receipt', color: '#f59e0b' },
  { id: 'kpi', label: 'Penilaian Kinerja', icon: 'pi pi-star-fill', color: '#8b5cf6' },
];

const claimDialog = ref(false);
const claimSaving = ref(false);
const claimError = ref('');
const claimForm = reactive({ date: new Date().toISOString().slice(0, 10), amount: 0, category: 'TRANSPORT', desc: '' });

const fmtRp = (n: number|string) => `Rp ${Number(n).toLocaleString('id-ID')}`;
const formatDateFull = (iso: string) => { 
  if (!iso) return '';
  const d = new Date(iso); 
  const m = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  return `${String(d.getDate()).padStart(2,'0')} ${m[d.getMonth()]} ${d.getFullYear()}`; 
};
const formatTime = (iso: string) => {
  if (!iso) return '';
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
};

const attStatusClass = (s: string) => ({ PRESENT:'text-emerald-600 bg-emerald-50 border-emerald-200', LATE:'text-amber-600 bg-amber-50 border-amber-200', ABSENT:'text-rose-600 bg-rose-50 border-rose-200' }[s] ?? 'text-slate-500 bg-slate-50 border-slate-200');
const claimStatusClass = (s: string) => ({ APPROVED:'text-emerald-600 bg-emerald-50 border-emerald-200', PENDING:'text-amber-600 bg-amber-50 border-amber-200', REJECTED:'text-rose-600 bg-rose-50 border-rose-200' }[s] ?? 'text-slate-500 bg-slate-50 border-slate-200');

const gradeColor = (g: string) => {
  if (g?.startsWith('A')) return 'text-emerald-600';
  if (g?.startsWith('B')) return 'text-blue-600';
  if (g?.startsWith('C')) return 'text-amber-600';
  return 'text-rose-600';
};
const gradeBadge = (g: string) => {
  if (g?.startsWith('A')) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
  if (g?.startsWith('B')) return 'text-blue-700 bg-blue-50 border-blue-200';
  if (g?.startsWith('C')) return 'text-amber-700 bg-amber-50 border-amber-200';
  return 'text-rose-700 bg-rose-50 border-rose-200';
};

const loadAllData = async () => {
  loading.value = true;
  try {
    const [empRes, attRes, payRes, expRes, kpiRes] = await Promise.all([
      api.get('/hris/employees'),
      api.get('/hris/attendance'), // usually admin endpoint, gives all
      api.get('/hris/payroll'),    // gives all runs
      api.get('/hris/expense'),    // gives all claims
      api.get('/hris/kpi'),        // gives all KPIs
    ]);
    employees.value = (empRes.data?.employees ?? empRes.employees ?? []).filter((e: any) => e.status === 'ACTIVE');
    allAttendances.value = attRes.data?.attendances ?? attRes.attendances ?? [];
    allPayrolls.value = (payRes.data?.runs ?? payRes.runs ?? []).filter((x: any) => x.status === 'APPROVED' || x.status === 'PROCESSED');
    allClaims.value = expRes.data?.claims ?? expRes.claims ?? [];
    allKpis.value = kpiRes.data?.evaluations ?? kpiRes.evaluations ?? [];
  } catch (e) { console.warn(e); }
  finally { loading.value = false; }
};

const openExpense = () => {
  claimForm.date = new Date().toISOString().slice(0, 10);
  claimForm.amount = 0; claimForm.category = 'TRANSPORT'; claimForm.desc = '';
  claimError.value = '';
  claimDialog.value = true;
};

const submitClaim = async () => {
  claimSaving.value = true; claimError.value = '';
  try {
    const claimNo = `EXP-${new Date().getFullYear()}${String(new Date().getMonth()+1).padStart(2,'0')}-${Math.floor(Math.random() * 9000 + 1000)}`;
    const payload = {
      employeeId: selectedEmployeeId.value,
      claimNo, claimDate: claimForm.date,
      amount: claimForm.amount, category: claimForm.category, description: claimForm.desc
    };
    await api.post('/hris/expense', payload);
    claimDialog.value = false;
    // Reload claims
    const res = await api.get('/hris/expense');
    allClaims.value = res.data?.claims ?? res.claims ?? [];
    activeTab.value = 'claims';
  } catch (e: any) { claimError.value = e?.response?.data?.message ?? 'Gagal menyimpan klaim'; }
  finally { claimSaving.value = false; }
};

onMounted(loadAllData);
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>