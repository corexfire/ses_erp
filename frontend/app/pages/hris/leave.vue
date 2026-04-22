<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-4 shadow-sm border-l-4 border-l-blue-600 relative overflow-hidden">
      <div class="absolute right-[-12px] top-[-12px] opacity-5 pointer-events-none">
        <i class="pi pi-calendar text-[150px] text-blue-900"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-start gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-calendar text-blue-700"></i> Manajemen Cuti & Izin (Leave Management)
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
            Kelola pengajuan cuti tahunan, sakit, dan izin khusus karyawan. Pantau sisa saldo cuti secara real-time.
          </div>
        </div>
        <div class="flex gap-2 shrink-0">
          <Button label="📊 Inisialisasi Saldo" size="small" outlined class="font-bold border-blue-400 text-blue-700 hover:bg-blue-50" @click="initBalances" />
          <Button label="+ Pengajuan Baru" size="small" icon="pi pi-plus" class="bg-blue-700 text-white border-none font-bold shadow-sm hover:bg-blue-800" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Stats & Balances -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm" v-for="stat in stats" :key="stat.label">
        <div class="text-2xl font-black text-blue-700">{{ stat.value }}</div>
        <div class="text-[10px] font-black text-blue-600 mt-0.5 uppercase tracking-widest">{{ stat.label }}</div>
      </div>
    </div>

    <!-- Tabs for List & Balances -->
    <div class="bg-white border rounded-xl shadow-sm overflow-hidden">
      <div class="flex border-b">
        <button v-for="t in ['Requests', 'Balances']" :key="t" 
          @click="tab = t"
          :class="tab === t ? 'border-b-2 border-blue-600 text-blue-700 bg-blue-50/50' : 'text-slate-500 hover:bg-slate-50'"
          class="px-6 py-3 text-sm font-black transition">
          {{ t === 'Requests' ? '📑 Daftar Pengajuan' : '⚖️ Saldo Cuti' }}
        </button>
      </div>

      <!-- Requests Table -->
      <div v-if="tab === 'Requests'" class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-slate-50 text-left text-[11px] text-slate-500 uppercase tracking-widest font-bold">
            <tr>
              <th class="px-5 py-3">Karyawan</th>
              <th class="px-4 py-3 border-l">Tipe</th>
              <th class="px-4 py-3 border-l">Tanggal</th>
              <th class="px-4 py-3 border-l">Durasi</th>
              <th class="px-4 py-3 border-l">Status</th>
              <th class="px-4 py-3 border-l text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="leave in leaves" :key="leave.id" class="border-t hover:bg-slate-50/50 transition">
              <td class="px-5 py-3">
                <div class="font-black text-slate-800">{{ leave.employee?.firstName }} {{ leave.employee?.lastName ?? '' }}</div>
                <div class="text-[10px] text-slate-400 font-medium">{{ leave.employee?.employeeNo }}</div>
              </td>
              <td class="px-4 py-3 border-l align-middle">
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border">{{ leave.leaveType }}</span>
              </td>
              <td class="px-4 py-3 border-l align-middle font-medium text-slate-600">
                {{ formatDate(leave.startDate) }} - {{ formatDate(leave.endDate) }}
              </td>
              <td class="px-4 py-3 border-l align-middle font-black text-slate-700">
                {{ calculateDays(leave.startDate, leave.endDate) }} Hari
              </td>
              <td class="px-4 py-3 border-l align-middle">
                <span :class="statusBadge(leave.status)" class="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border">
                  {{ leave.status }}
                </span>
              </td>
              <td class="px-4 py-3 border-l text-center align-middle">
                <div class="flex justify-center gap-1" v-if="leave.status === 'PENDING'">
                  <Button icon="pi pi-check" size="small" class="bg-emerald-600 border-none h-7 w-7" @click="updateStatus(leave.id, 'APPROVED')" />
                  <Button icon="pi pi-times" size="small" class="bg-rose-600 border-none h-7 w-7" @click="updateStatus(leave.id, 'REJECTED')" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Balances Table -->
      <div v-else class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-slate-50 text-left text-[11px] text-slate-500 uppercase tracking-widest font-bold">
            <tr>
              <th class="px-5 py-3">Karyawan</th>
              <th class="px-4 py-3 border-l text-center">Periode</th>
              <th class="px-4 py-3 border-l text-center">Jatah</th>
              <th class="px-4 py-3 border-l text-center">Terpakai</th>
              <th class="px-4 py-3 border-l text-center">Sisa</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="b in balances" :key="b.id" class="border-t hover:bg-slate-50/50 transition">
              <td class="px-5 py-3 font-black text-slate-800">{{ b.employee?.firstName }} {{ b.employee?.lastName ?? '' }}</td>
              <td class="px-4 py-3 border-l text-center font-bold text-slate-500">{{ b.period }}</td>
              <td class="px-4 py-3 border-l text-center font-black text-blue-700">{{ b.allowance }}</td>
              <td class="px-4 py-3 border-l text-center font-black text-rose-600">{{ b.used }}</td>
              <td class="px-4 py-3 border-l text-center">
                <span class="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-black">{{ b.allowance - b.used }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create Modal -->
    <div v-if="showCreate" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div class="w-full max-w-md bg-white rounded-2xl shadow-2xl animate-fade-in-up">
        <div class="p-5 border-b flex justify-between items-center bg-slate-50 rounded-t-2xl">
          <div class="font-black text-slate-800">📝 Pengajuan Cuti Baru</div>
          <button @click="showCreate = false">✕</button>
        </div>
        <div class="p-4 space-y-4">
          <div class="space-y-1">
            <label class="text-[10px] font-black text-slate-500 uppercase">Karyawan</label>
            <select v-model="form.employeeId" class="w-full border rounded-lg p-2 text-sm">
              <option v-for="e in employees" :key="e.id" :value="e.id">{{ e.firstName }}</option>
            </select>
          </div>
          <div class="grid grid-cols-2 gap-4">
             <div class="space-y-1">
              <label class="text-[10px] font-black text-slate-500 uppercase">Awal</label>
              <input type="date" v-model="form.startDate" class="w-full border rounded-lg p-2 text-sm" />
            </div>
             <div class="space-y-1">
              <label class="text-[10px] font-black text-slate-500 uppercase">Akhir</label>
              <input type="date" v-model="form.endDate" class="w-full border rounded-lg p-2 text-sm" />
            </div>
          </div>
          <div class="space-y-1">
            <label class="text-[10px] font-black text-slate-500 uppercase">Tipe</label>
            <select v-model="form.leaveType" class="w-full border rounded-lg p-2 text-sm">
              <option value="ANNUAL">Cuti Tahunan</option>
              <option value="SICK">Sakit</option>
              <option value="MATERNITY">Melahirkan</option>
            </select>
          </div>
          <div class="space-y-1">
            <label class="text-[10px] font-black text-slate-500 uppercase">Alasan</label>
            <textarea v-model="form.reason" class="w-full border rounded-lg p-2 text-sm" rows="3"></textarea>
          </div>
        </div>
        <div class="p-4 border-t bg-slate-50 flex justify-end gap-2 rounded-b-2xl">
          <Button label="Batal" @click="showCreate = false" severity="secondary" outlined />
          <Button label="Kirim Pengajuan" class="bg-blue-700 text-white border-none" @click="submitLeave" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const tab = ref('Requests');
const leaves = ref([]);
const balances = ref([]);
const employees = ref([]);
const showCreate = ref(false);
const form = reactive({ employeeId: '', leaveType: 'ANNUAL', startDate: '', endDate: '', reason: '' });

const stats = computed(() => [
  { label: 'Menunggu Persetujuan', value: leaves.value.filter(l => l.status === 'PENDING').length },
  { label: 'Cuti Disetujui (Bulan Ini)', value: leaves.value.filter(l => l.status === 'APPROVED').length },
  { label: 'Sakit', value: leaves.value.filter(l => l.leaveType === 'SICK' && l.status === 'APPROVED').length },
  { label: 'Total Saldo Karyawan', value: balances.value.reduce((s, b) => s + (b.allowance - b.used), 0) },
]);

const load = async () => {
  const [lRes, bRes, eRes] = await Promise.all([
    api.get('/hris/workflow/leave'),
    api.get('/hris/workflow/leave/balances'),
    api.get('/hris/employees'),
  ]);
  leaves.value = lRes.data.leaves;
  balances.value = bRes.data.balances;
  employees.value = eRes.data.employees;
};

const submitLeave = async () => {
  await api.post('/hris/workflow/leave', form);
  showCreate.value = false;
  load();
};

const updateStatus = async (id: string, status: string) => {
  await api.patch(`/hris/workflow/leave/${id}/status`, { status });
  load();
};

const initBalances = async () => {
  await api.post('/hris/workflow/leave/init-balances');
  load();
};

const formatDate = (d: string) => new Date(d).toLocaleDateString('id-ID');
const calculateDays = (s: string, e: string) => {
  const start = new Date(s);
  const end = new Date(e);
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
};

const statusBadge = (s: string) => {
  if (s === 'APPROVED') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (s === 'REJECTED') return 'bg-rose-50 text-rose-700 border-rose-200';
  return 'bg-amber-50 text-amber-700 border-amber-200';
};

const openCreate = () => {
  form.startDate = new Date().toISOString().split('T')[0];
  form.endDate = new Date().toISOString().split('T')[0];
  showCreate.value = true;
};

onMounted(load);
</script>
