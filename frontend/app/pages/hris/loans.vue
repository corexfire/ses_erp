<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-4 shadow-sm border-l-4 border-l-rose-600 relative overflow-hidden">
      <div class="absolute right-[-12px] top-[-12px] opacity-5 pointer-events-none">
        <i class="pi pi-briefcase text-[150px] text-rose-900"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-start gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-money-bill text-rose-700"></i> Pinjaman Karyawan (Employee Loans)
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
            Kelola pinjaman dan kasbon karyawan. Potongan cicilan akan otomatis mengurangi Net Pay pada saat proses Payroll.
          </div>
        </div>
        <div class="flex gap-2 shrink-0">
          <Button label="+ Pinjaman Baru" size="small" icon="pi pi-plus" class="bg-rose-700 text-white border-none font-bold shadow-sm hover:bg-rose-800" @click="showCreate = true" />
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-rose-50 border border-rose-200 rounded-xl p-4 shadow-sm" v-for="stat in stats" :key="stat.label">
        <div class="text-2xl font-black text-rose-700">{{ stat.value }}</div>
        <div class="text-[10px] font-black text-rose-600 mt-0.5 uppercase tracking-widest">{{ stat.label }}</div>
      </div>
    </div>

    <!-- Loans Table -->
    <div class="bg-white border rounded-xl shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-slate-50 text-left text-[11px] text-slate-500 uppercase tracking-widest font-bold">
            <tr>
              <th class="px-5 py-3 font-bold">Karyawan</th>
              <th class="px-4 py-3 border-l">Jumlah Pinjaman</th>
              <th class="px-4 py-3 border-l">Tujuan</th>
              <th class="px-4 py-3 border-l text-center">Tenor</th>
              <th class="px-4 py-3 border-l">Sisa Pinjaman</th>
              <th class="px-4 py-3 border-l text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="loan in loans" :key="loan.id" class="border-t hover:bg-slate-50/50 transition">
              <td class="px-5 py-3">
                <div class="font-black text-slate-800">{{ loan.employee?.firstName }} {{ loan.employee?.lastName ?? '' }}</div>
                <div class="text-[10px] text-slate-400 font-medium">{{ loan.employee?.employeeNo }}</div>
              </td>
              <td class="px-4 py-3 border-l align-middle font-black text-slate-700">
                {{ formatRp(loan.amount) }}
              </td>
              <td class="px-4 py-3 border-l align-middle text-slate-500 italic">
                {{ loan.reason || '-' }}
              </td>
              <td class="px-4 py-3 border-l align-middle text-center font-bold text-slate-600">
                {{ loan.installments?.length }} Bln
              </td>
              <td class="px-4 py-3 border-l align-middle">
                <div class="w-full bg-slate-100 rounded-full h-1.5 mb-1">
                  <div class="bg-rose-500 h-1.5 rounded-full" :style="{ width: calculateProgress(loan) + '%' }"></div>
                </div>
                <div class="text-[10px] font-black text-rose-700">{{ formatRp(calculateRemaining(loan)) }} sisa</div>
              </td>
              <td class="px-4 py-3 border-l align-middle text-center">
                <span class="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border bg-emerald-50 text-emerald-700 border-emerald-200">
                  {{ loan.status }}
                </span>
              </td>
            </tr>
            <tr v-if="loans.length === 0">
              <td colspan="6" class="px-5 py-8 text-center text-slate-400 italic">Belum ada data pinjaman karyawan.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create Modal -->
    <div v-if="showCreate" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div class="w-full max-w-md bg-white rounded-2xl shadow-2xl animate-fade-in-up">
        <div class="p-5 border-b flex justify-between items-center bg-slate-50 rounded-t-2xl">
          <div class="font-black text-slate-800">💰 Input Pinjaman Baru</div>
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
              <label class="text-[10px] font-black text-slate-500 uppercase">Jumlah Pinjaman</label>
              <input type="number" v-model.number="form.amount" class="w-full border rounded-lg p-2 text-sm font-black font-mono" />
            </div>
             <div class="space-y-1">
              <label class="text-[10px] font-black text-slate-500 uppercase">Tenor (Bulan)</label>
              <input type="number" v-model.number="form.tenor" class="w-full border rounded-lg p-2 text-sm" />
            </div>
          </div>
          <div class="space-y-1">
            <label class="text-[10px] font-black text-slate-500 uppercase">Alasan Pinjaman</label>
            <textarea v-model="form.reason" class="w-full border rounded-lg p-2 text-sm" rows="2"></textarea>
          </div>
          <div class="p-3 bg-rose-50 border border-rose-100 rounded-xl">
             <div class="text-[9px] font-black text-rose-400 uppercase mb-1">Estimasi Cicilan per Bulan</div>
             <div class="text-xl font-black text-rose-700 font-mono">{{ formatRp(Math.round(form.amount / (form.tenor || 1))) }}</div>
          </div>
        </div>
        <div class="p-4 border-t bg-slate-50 flex justify-end gap-2 rounded-b-2xl">
          <Button label="Batal" @click="showCreate = false" severity="secondary" outlined />
          <Button label="Simpan Pinjaman" class="bg-rose-700 text-white border-none" @click="submit" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const loans = ref([]);
const employees = ref([]);
const showCreate = ref(false);
const form = reactive({ employeeId: '', amount: 0, tenor: 1, reason: '' });

const stats = computed(() => [
  { label: 'Total Outstanding', value: formatRp(loans.value.reduce((s, l) => s + calculateRemaining(l), 0)) },
  { label: 'Pinjaman Aktif', value: loans.value.length },
  { label: 'Kolektibilitas', value: '100% Lancar' },
  { label: 'Potongan Gaji Bln Ini', value: formatRp(5420000) }, // Simulated
]);

const load = async () => {
  const [lRes, eRes] = await Promise.all([
    api.get('/hris/financial/loans'),
    api.get('/hris/employees'),
  ]);
  loans.value = lRes.data.loans;
  employees.value = eRes.data.employees;
};

const submit = async () => {
  const installments = [];
  const instAmount = Math.round(form.amount / form.tenor);
  for(let i=1; i<=form.tenor; i++) {
    const d = new Date(); d.setMonth(d.getMonth() + i);
    installments.push({ amount: instAmount, dueDate: d.toISOString() });
  }
  await api.post('/hris/financial/loans', { ...form, installments });
  showCreate.value = false;
  load();
};

const formatRp = (v: number) => 'Rp ' + Number(v).toLocaleString('id-ID');

const calculateRemaining = (loan: any) => {
  const unpaid = loan.installments?.filter((i: any) => i.status === 'UNPAID') || [];
  return unpaid.reduce((s: number, i: any) => s + Number(i.amount), 0);
};

const calculateProgress = (loan: any) => {
  const total = Number(loan.amount);
  const remaining = calculateRemaining(loan);
  return ((total - remaining) / total) * 100;
};

onMounted(load);
</script>
