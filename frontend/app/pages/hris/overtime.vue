<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-4 shadow-sm border-l-4 border-l-amber-600 relative overflow-hidden">
      <div class="absolute right-[-12px] top-[-12px] opacity-5 pointer-events-none">
        <i class="pi pi-clock text-[150px] text-amber-900"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-start gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-clock text-amber-700"></i> Manajemen Lembur (Overtime)
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
            Kelola pengajuan jam lembur karyawan. Jam lembur yang disetujui akan otomatis masuk ke perhitungan Payroll.
          </div>
        </div>
        <div class="flex gap-2 shrink-0">
          <Button label="+ Pengajuan Lembur" size="small" icon="pi pi-plus" class="bg-amber-700 text-white border-none font-bold shadow-sm hover:bg-amber-800" @click="showCreate = true" />
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 shadow-sm" v-for="stat in stats" :key="stat.label">
        <div class="text-2xl font-black text-amber-700">{{ stat.value }}</div>
        <div class="text-[10px] font-black text-amber-600 mt-0.5 uppercase tracking-widest">{{ stat.label }}</div>
      </div>
    </div>

    <!-- Overtime Table -->
    <div class="bg-white border rounded-xl shadow-sm overflow-hidden">
      <div class="p-4 border-b bg-slate-50 flex justify-between items-center">
        <div class="text-sm font-black text-slate-700">📋 Daftar Pengajuan Lembur</div>
        <div class="flex gap-2">
          <select v-model="filterStatus" class="text-xs border rounded-lg px-2 py-1 outline-none">
            <option value="">Semua Status</option>
            <option value="PENDING">Menunggu</option>
            <option value="APPROVED">Disetujui</option>
            <option value="REJECTED">Ditolak</option>
          </select>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-slate-50 text-left text-[11px] text-slate-500 uppercase tracking-widest font-bold">
            <tr>
              <th class="px-5 py-3 font-bold">Karyawan</th>
              <th class="px-4 py-3 border-l">Tanggal</th>
              <th class="px-4 py-3 border-l text-center">Jam</th>
              <th class="px-4 py-3 border-l">Alasan</th>
              <th class="px-4 py-3 border-l text-center">Status</th>
              <th class="px-4 py-3 border-l text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ot in filtered" :key="ot.id" class="border-t hover:bg-slate-50/50 transition">
              <td class="px-5 py-3">
                <div class="font-black text-slate-800">{{ ot.employee?.firstName }} {{ ot.employee?.lastName ?? '' }}</div>
                <div class="text-[10px] text-slate-400 font-medium">{{ ot.employee?.employeeNo }}</div>
              </td>
              <td class="px-4 py-3 border-l align-middle font-medium text-slate-600">
                {{ formatDate(ot.date) }}
              </td>
              <td class="px-4 py-3 border-l align-middle text-center font-black text-amber-700">
                {{ ot.hours }}j
              </td>
              <td class="px-4 py-3 border-l align-middle text-slate-500 italic max-w-xs truncate">
                {{ ot.reason || '-' }}
              </td>
              <td class="px-4 py-3 border-l align-middle text-center">
                <span :class="statusBadge(ot.status)" class="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border">
                  {{ ot.status }}
                </span>
              </td>
              <td class="px-4 py-3 border-l text-center align-middle">
                <div class="flex justify-center gap-1" v-if="ot.status === 'PENDING'">
                  <Button icon="pi pi-check" size="small" class="bg-emerald-600 border-none h-7 w-7" @click="updateStatus(ot.id, 'APPROVED')" />
                  <Button icon="pi pi-times" size="small" class="bg-rose-600 border-none h-7 w-7" @click="updateStatus(ot.id, 'REJECTED')" />
                </div>
              </td>
            </tr>
            <tr v-if="overtimes.length === 0" class="border-t">
              <td colspan="6" class="px-5 py-8 text-center text-slate-400 italic">Belum ada pengajuan lembur.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create Modal -->
    <div v-if="showCreate" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div class="w-full max-w-md bg-white rounded-2xl shadow-2xl animate-fade-in-up">
        <div class="p-5 border-b flex justify-between items-center bg-slate-50 rounded-t-2xl">
          <div class="font-black text-slate-800">📝 Ajukan Lembur Baru</div>
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
              <label class="text-[10px] font-black text-slate-500 uppercase">Tanggal</label>
              <input type="date" v-model="form.date" class="w-full border rounded-lg p-2 text-sm" />
            </div>
             <div class="space-y-1">
              <label class="text-[10px] font-black text-slate-500 uppercase">Jumlah Jam</label>
              <input type="number" step="0.5" v-model.number="form.hours" class="w-full border rounded-lg p-2 text-sm" />
            </div>
          </div>
          <div class="space-y-1">
            <label class="text-[10px] font-black text-slate-500 uppercase">Alasan Lembur</label>
            <textarea v-model="form.reason" class="w-full border rounded-lg p-2 text-sm" rows="3" placeholder="Contoh: Kejar target produksi akhir bulan"></textarea>
          </div>
        </div>
        <div class="p-4 border-t bg-slate-50 flex justify-end gap-2 rounded-b-2xl">
          <Button label="Batal" @click="showCreate = false" severity="secondary" outlined />
          <Button label="Kirim Pengajuan" class="bg-amber-700 text-white border-none" @click="submit" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const overtimes = ref([]);
const employees = ref([]);
const filterStatus = ref('');
const showCreate = ref(false);
const form = reactive({ employeeId: '', date: new Date().toISOString().split('T')[0], hours: 1, reason: '' });

const stats = computed(() => [
  { label: 'Menunggu Persetujuan', value: overtimes.value.filter(o => o.status === 'PENDING').length },
  { label: 'Total Jam (Bulan Ini)', value: overtimes.value.filter(o => o.status === 'APPROVED').reduce((s, o) => s + Number(o.hours), 0) },
  { label: 'Pencairan Lembur (Draft)', value: 'Rp 4.250.000' }, // Simulated calc
  { label: 'Karyawan Teraktif', value: employees.value[0]?.firstName || '-' },
]);

const filtered = computed(() => {
  if (!filterStatus.value) return overtimes.value;
  return overtimes.value.filter(o => o.status === filterStatus.value);
});

const load = async () => {
  const [otRes, eRes] = await Promise.all([
    api.get('/hris/workflow/overtime'),
    api.get('/hris/employees'),
  ]);
  overtimes.value = otRes.data.overtimes;
  employees.value = eRes.data.employees;
};

const submit = async () => {
  await api.post('/hris/workflow/overtime', form);
  showCreate.value = false;
  load();
};

const updateStatus = async (id: string, status: string) => {
  await api.patch(`/hris/workflow/overtime/${id}/status`, { status });
  load();
};

const formatDate = (d: string) => new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });

const statusBadge = (s: string) => {
  if (s === 'APPROVED') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (s === 'REJECTED') return 'bg-rose-50 text-rose-700 border-rose-200';
  return 'bg-amber-50 text-amber-700 border-amber-200';
};

onMounted(load);
</script>
