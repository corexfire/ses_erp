<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-4 shadow-sm border-l-4 border-l-slate-800 relative overflow-hidden">
      <div class="absolute right-[-12px] top-[-12px] opacity-5 pointer-events-none">
        <i class="pi pi-sign-out text-[150px] text-slate-900"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-start gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-sign-out text-slate-700"></i> Offboarding & Pesangon
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
            Kelola proses penghentian hubungan kerja, perhitungan pesangon otomatis sesuai regulasi, dan arsip exit interview.
          </div>
        </div>
        <div class="flex gap-2 shrink-0">
          <Button label="+ Proses Offboarding" size="small" icon="pi pi-user-minus" class="bg-slate-800 text-white border-none font-bold" @click="openModal" />
        </div>
      </div>
    </div>

    <!-- History Table -->
    <div class="bg-white border rounded-xl shadow-sm overflow-hidden">
      <div class="p-4 border-b bg-slate-50 flex justify-between items-center text-sm font-black text-slate-700">
        📑 Riwayat Pemberhentian Kerja
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-slate-50/50 text-left text-[11px] text-slate-500 uppercase tracking-widest font-bold">
            <tr>
              <th class="px-5 py-3">Karyawan</th>
              <th class="px-4 py-3 border-l">Tgl Keluar</th>
              <th class="px-4 py-3 border-l">Tipe</th>
              <th class="px-4 py-3 border-l">Total Pesangon</th>
              <th class="px-4 py-3 border-l text-center">Status Bayar</th>
              <th class="px-4 py-3 border-l">Dokumen</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="t in terminations" :key="t.id" class="border-t hover:bg-slate-50/50 transition">
              <td class="px-5 py-3">
                <div class="font-black text-slate-800">{{ t.employee?.firstName }} {{ t.employee?.lastName ?? '' }}</div>
                <div class="text-[10px] text-slate-400 font-medium">{{ t.employee?.employeeNo }}</div>
              </td>
              <td class="px-4 py-3 border-l align-middle font-medium text-slate-600">
                {{ formatDate(t.terminationDate) }}
              </td>
              <td class="px-4 py-3 border-l align-middle">
                <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border text-[10px] font-bold">{{ t.type }}</span>
              </td>
              <td class="px-4 py-3 border-l align-middle font-black text-slate-800">
                {{ formatRp(t.totalAmount) }}
              </td>
              <td class="px-4 py-3 border-l align-middle text-center">
                <span :class="t.status === 'PAID' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'" class="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border">
                  {{ t.status }}
                </span>
              </td>
              <td class="px-4 py-3 border-l align-middle text-center">
                <Button icon="pi pi-file-pdf" size="small" text class="text-rose-600" />
              </td>
            </tr>
            <tr v-if="terminations.length === 0">
              <td colspan="6" class="px-5 py-12 text-center text-slate-400 italic">Belum ada data pemberhentian.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Process Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm shadow-inner">
       <div class="w-full max-w-2xl bg-white rounded-2xl shadow-2xl animate-fade-in-up overflow-hidden">
          <div class="p-5 border-b bg-slate-50 flex justify-between items-center">
            <div class="font-black text-slate-800 uppercase tracking-tight">⚙️ Proses Offboarding Karyawan</div>
            <button @click="showModal = false" class="text-slate-400 hover:text-slate-600">✕</button>
          </div>
          <div class="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
             <div class="space-y-4">
                <div class="space-y-1">
                  <label class="text-[10px] font-black text-slate-500 uppercase">Pilih Karyawan</label>
                  <select v-model="form.employeeId" class="w-full border rounded-lg p-3 text-sm font-bold bg-slate-50" @change="fetchCalc">
                    <option v-for="e in employees" :key="e.id" :value="e.id">{{ e.firstName }} {{ e.lastName }}</option>
                  </select>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-1">
                    <label class="text-[10px] font-black text-slate-500 uppercase">Tipe</label>
                    <select v-model="form.type" class="w-full border rounded-lg p-2 text-sm">
                      <option value="RESIGNATION">Resign (Sukarela)</option>
                      <option value="TERMINATION">PHK (Termination)</option>
                      <option value="RETIREMENT">Pensiun</option>
                    </select>
                  </div>
                   <div class="space-y-1">
                    <label class="text-[10px] font-black text-slate-500 uppercase">Tanggal Efektif</label>
                    <input type="date" v-model="form.terminationDate" class="w-full border rounded-lg p-2 text-sm" />
                  </div>
                </div>
                <div class="space-y-1">
                  <label class="text-[10px] font-black text-slate-500 uppercase">Alasan Keluar</label>
                  <textarea v-model="form.reason" rows="3" class="w-full border rounded-lg p-2 text-sm" placeholder="Contoh: Mendapatkan penawaran di perusahaan lain"></textarea>
                </div>
             </div>

             <!-- CALC PREVIEW -->
             <div class="bg-slate-900 rounded-2xl p-4 text-white shadow-xl relative overflow-hidden">
                <div class="absolute right-[-20px] top-[-20px] opacity-10 pointer-events-none">
                  <i class="pi pi-calculator text-[100px]"></i>
                </div>
                <div class="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest border-b border-slate-700 pb-2">Estimasi Pesangon (ID Formula)</div>
                
                <div class="space-y-3">
                   <div class="flex justify-between text-xs">
                     <span class="text-slate-400">Masa Kerja</span>
                     <span class="font-black text-emerald-400">{{ calc.serviceYears || '0.00' }} Tahun</span>
                   </div>
                   <div class="flex justify-between text-xs">
                     <span class="text-slate-400">Gaji Pokok</span>
                     <span class="font-bold">{{ formatRp(calc.salary) || '-' }}</span>
                   </div>
                   <div class="h-px bg-slate-700 my-2"></div>
                   <div class="flex justify-between text-xs">
                     <span>Uang Pesangon</span>
                     <span class="font-bold">{{ formatRp(calc.severance) || 'Rp 0' }}</span>
                   </div>
                    <div class="flex justify-between text-xs">
                     <span>Uang Penghargaan (UPMK)</span>
                     <span class="font-bold">{{ formatRp(calc.servicePay) || 'Rp 0' }}</span>
                   </div>
                    <div class="flex justify-between text-xs">
                     <span>Ganti Hak (UPH - 15%)</span>
                     <span class="font-bold">{{ formatRp(calc.compensation) || 'Rp 0' }}</span>
                   </div>
                </div>

                <div class="mt-8 pt-4 border-t-2 border-dashed border-slate-700 flex justify-between items-end">
                   <div class="text-[10px] font-black text-slate-400 uppercase">Total Hak Diterima</div>
                   <div class="text-2xl font-black text-emerald-400 font-mono">{{ formatRp(calc.total) || 'Rp 0' }}</div>
                </div>
             </div>
          </div>
          <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
             <Button label="Batalkan" @click="showModal = false" outlined severity="secondary" />
             <Button label="Konfirmasi Offboarding" class="bg-rose-700 text-white border-none font-bold" @click="submit" />
          </div>
       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const employees = ref([]);
const terminations = ref([]);
const showModal = ref(false);
const calc = ref({ serviceYears: 0, salary: 0, severance: 0, servicePay: 0, compensation: 0, total: 0 });
const form = reactive({ employeeId: '', terminationDate: new Date().toISOString().split('T')[0], reason: '', type: 'RESIGNATION', severanceAmount: 0, servicePayAmount: 0, compensationPayAmount: 0, totalAmount: 0, notes: '' });

const load = async () => {
  const [eRes, tRes] = await Promise.all([
    api.get('/hris/employees'),
    api.get('/hris/employees/terminations'),
  ]);
  employees.value = eRes.data.employees.filter((e: any) => e.status === 'ACTIVE');
  terminations.value = tRes.data.terminations;
};

const fetchCalc = async () => {
  if (!form.employeeId) return;
  const res = await api.get(`/hris/employees/${form.employeeId}/termination-calc`);
  calc.value = res.data;
  // Update form with calc values
  form.severanceAmount = Number(calc.value.severance);
  form.servicePayAmount = Number(calc.value.servicePay);
  form.compensationPayAmount = Number(calc.value.compensation);
  form.totalAmount = Number(calc.value.total);
};

const submit = async () => {
  await api.post(`/hris/employees/${form.employeeId}/terminate`, form);
  showModal.value = false;
  load();
};

const formatDate = (d: string) => new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
const formatRp = (v: number) => v ? 'Rp ' + Number(v).toLocaleString('id-ID') : null;

const openModal = () => {
  Object.assign(form, { employeeId: '', terminationDate: new Date().toISOString().split('T')[0], reason: '', type: 'RESIGNATION', severanceAmount: 0, servicePayAmount: 0, compensationPayAmount: 0, totalAmount: 0, notes: '' });
  calc.value = { serviceYears: 0, salary: 0, severance: 0, servicePay: 0, compensation: 0, total: 0 };
  showModal.value = true;
};

onMounted(load);
</script>
