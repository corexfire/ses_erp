<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-4 shadow-sm border-l-4 border-l-green-600 relative overflow-hidden">
      <div class="absolute right-[-12px] top-[-12px] opacity-5 pointer-events-none">
        <i class="pi pi-money-bill text-[150px] text-green-900"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-start gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-money-bill text-green-700"></i> Penggajian (Payroll)
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
            Kelola slip gaji karyawan F&B — Gaji Pokok, Tunjangan (Transport/Makan/Jabatan), Potongan BPJS Kesehatan + BPJS TK, PPh 21 TER sesuai PP 58/2023. Proses per periode bulanan.
          </div>
        </div>
        <div class="flex gap-2 shrink-0">
          <Button label="📊 Generate Payroll" size="small" outlined class="font-bold border-green-400 text-green-700 hover:bg-green-50" @click="openBulk" />
          <Button label="+ Input Manual" size="small" icon="pi pi-plus" class="bg-green-700 text-white border-none font-bold shadow-sm hover:bg-green-800" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Period Selector + KPIs -->
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
      <!-- Period picker -->
      <div class="bg-white border rounded-xl p-4 shadow-sm space-y-2">
        <div class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Periode Payroll</div>
        <input type="month" v-model="filterPeriod" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-green-700 outline-none focus:border-green-500" />
        <div class="text-[10px] text-slate-400 font-medium">{{ runs.length }} record ditemukan</div>
      </div>
      <!-- KPIs -->
      <div class="bg-green-50 border border-green-200 rounded-xl p-4 shadow-sm">
        <div class="text-sm font-black text-green-800">{{ formatRupiah(totalGross) }}</div>
        <div class="text-[10px] font-black text-green-600 mt-0.5 uppercase tracking-widest">Total Gross Pay</div>
      </div>
      <div class="bg-white border rounded-xl p-4 shadow-sm">
        <div class="text-sm font-black text-slate-800">{{ formatRupiah(totalNet) }}</div>
        <div class="text-[10px] font-black text-slate-500 mt-0.5 uppercase tracking-widest">Total Net Pay</div>
      </div>
      <div class="bg-rose-50 border border-rose-200 rounded-xl p-4 shadow-sm">
        <div class="text-sm font-black text-rose-700">{{ formatRupiah(totalTax) }}</div>
        <div class="text-[10px] font-black text-rose-600 mt-0.5 uppercase tracking-widest">Total PPh 21</div>
      </div>
      <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 shadow-sm">
        <div class="text-sm font-black text-amber-700">{{ formatRupiah(totalDeductions) }}</div>
        <div class="text-[10px] font-black text-amber-600 mt-0.5 uppercase tracking-widest">Total Potongan BPJS</div>
      </div>
    </div>

    <!-- Status Filter + Search -->
    <div class="bg-white border rounded-xl p-4 shadow-sm flex flex-wrap gap-3 items-center">
      <div class="flex gap-1 bg-slate-100 rounded-lg p-1">
        <button v-for="s in ['SEMUA','DRAFT','PROCESSED','APPROVED']" :key="s"
          @click="filterStatus = s === 'SEMUA' ? '' : s"
          :class="(filterStatus || 'SEMUA') === s ? 'bg-green-700 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'"
          class="px-3 py-1.5 rounded-md text-[11px] font-black transition">
          {{ s }}
          <span v-if="s !== 'SEMUA'" class="ml-1 opacity-70">({{ statusCount(s) }})</span>
        </button>
      </div>
      <select v-model="filterDept" class="border rounded-lg px-3 py-2 text-sm font-semibold h-10 outline-none focus:border-green-500">
        <option value="">Semua Departemen</option>
        <option v-for="d in deptList" :key="d">{{ d }}</option>
      </select>
      <InputText v-model="search" placeholder="Cari karyawan..." class="text-sm h-10 w-48" />
      <Button severity="secondary" size="small" :loading="loading" icon="pi pi-refresh" @click="load" outlined class="h-10 w-10 ml-auto" />
    </div>

    <!-- Payroll Table -->
    <div class="rounded-xl border bg-white shadow-sm overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-green-900 text-left text-[11px] text-white uppercase tracking-widest font-bold">
          <tr>
            <th class="px-5 py-3">Karyawan</th>
            <th class="px-4 py-3 border-l text-right w-32">Gaji Pokok</th>
            <th class="px-4 py-3 border-l text-right w-28">Tunjangan</th>
            <th class="px-4 py-3 border-l text-right w-28">Gross Pay</th>
            <th class="px-4 py-3 border-l text-right w-24">BPJS</th>
            <th class="px-4 py-3 border-l text-right w-24">PPh 21</th>
            <th class="px-4 py-3 border-l text-right w-32">Net Pay</th>
            <th class="px-4 py-3 border-l text-center w-24">Status</th>
            <th class="px-4 py-3 border-l text-center w-24">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="9" class="py-16 text-center text-slate-400">
              <i class="pi pi-spinner pi-spin mr-2 text-green-600"></i> Memuat data penggajian...
            </td>
          </tr>
          <tr v-for="run in filteredRuns" v-else :key="run.id"
            class="border-t transition hover:bg-green-50/10 cursor-pointer"
            :class="run.status === 'APPROVED' ? 'bg-emerald-50/10' : run.status === 'DRAFT' ? 'bg-amber-50/10' : ''"
            @click="openSlip(run)">
            <td class="px-5 py-3 align-middle">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-full flex items-center justify-center font-black text-xs text-white shrink-0"
                  :style="{ backgroundColor: avatarColor(run.employee?.firstName ?? 'A') }">
                  {{ initials(run.employee?.firstName, run.employee?.lastName) }}
                </div>
                <div>
                  <div class="font-black text-slate-800 text-sm">{{ run.employee?.firstName }} {{ run.employee?.lastName ?? '' }}</div>
                  <div class="text-[10px] text-slate-400">{{ run.employee?.department }}</div>
                </div>
              </div>
            </td>
            <td class="px-4 py-3 border-l text-right align-middle font-mono font-bold text-slate-700 text-xs">{{ fmtRp(run.basicSalary) }}</td>
            <td class="px-4 py-3 border-l text-right align-middle font-mono text-xs text-slate-500">+{{ fmtRp(run.allowances) }}</td>
            <td class="px-4 py-3 border-l text-right align-middle font-mono font-black text-sm text-slate-800">{{ fmtRp(run.grossPay) }}</td>
            <td class="px-4 py-3 border-l text-right align-middle font-mono text-xs text-rose-600">-{{ fmtRp(run.deductions) }}</td>
            <td class="px-4 py-3 border-l text-right align-middle font-mono text-xs text-rose-600">-{{ fmtRp(run.taxAmount) }}</td>
            <td class="px-4 py-3 border-l text-right align-middle">
              <span class="font-black font-mono text-green-700">{{ fmtRp(run.netPay) }}</span>
            </td>
            <td class="px-4 py-3 border-l text-center align-middle">
              <span :class="statusBadge(run.status)" class="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border">
                {{ run.status }}
              </span>
            </td>
            <td class="px-4 py-3 border-l text-center align-middle">
              <div class="flex justify-center gap-1">
                <Button label="Slip" size="small" outlined class="text-[9px] h-7 px-2 font-bold text-green-700 border-green-200 hover:bg-green-700 hover:text-white" @click.stop="openSlip(run)" />
                <Button v-if="run.status === 'DRAFT'" label="Setujui" size="small" class="text-[9px] h-7 px-2 font-bold bg-green-700 text-white border-none hover:bg-green-800" @click.stop="approve(run)" />
              </div>
            </td>
          </tr>
          <tr v-if="!loading && filteredRuns.length === 0">
            <td colspan="9" class="py-12 text-center text-slate-400 italic">Tidak ada data payroll untuk periode ini.</td>
          </tr>
        </tbody>
        <!-- Totals Row -->
        <tfoot v-if="filteredRuns.length > 0" class="bg-green-50 border-t-2 border-green-200">
          <tr>
            <td class="px-5 py-3 font-black text-green-900 text-xs">TOTAL ({{ filteredRuns.length }} karyawan)</td>
            <td class="px-4 py-3 border-l text-right font-black font-mono text-xs text-slate-800">{{ fmtRp(filteredRuns.reduce((s,r) => s + Number(r.basicSalary), 0)) }}</td>
            <td class="px-4 py-3 border-l text-right font-black font-mono text-xs text-slate-600">{{ fmtRp(filteredRuns.reduce((s,r) => s + Number(r.allowances), 0)) }}</td>
            <td class="px-4 py-3 border-l text-right font-black font-mono text-sm text-slate-900">{{ fmtRp(filteredRuns.reduce((s,r) => s + Number(r.grossPay), 0)) }}</td>
            <td class="px-4 py-3 border-l text-right font-black font-mono text-xs text-rose-700">{{ fmtRp(filteredRuns.reduce((s,r) => s + Number(r.deductions), 0)) }}</td>
            <td class="px-4 py-3 border-l text-right font-black font-mono text-xs text-rose-700">{{ fmtRp(filteredRuns.reduce((s,r) => s + Number(r.taxAmount), 0)) }}</td>
            <td class="px-4 py-3 border-l text-right font-black font-mono text-base text-green-800">{{ fmtRp(filteredRuns.reduce((s,r) => s + Number(r.netPay), 0)) }}</td>
            <td colspan="2"></td>
          </tr>
        </tfoot>
      </table>
    </div>

    <!-- Slip Gaji Modal -->
    <div v-if="slipRun" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div class="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
        <!-- Slip Header -->
        <div class="bg-green-900 text-white p-4 text-center relative">
          <div class="font-black text-lg tracking-wide">PT SUMBER ENERGI SNACK</div>
          <div class="text-green-300 text-xs font-bold mt-0.5">SLIP GAJI KARYAWAN</div>
          <div class="text-green-200 text-xs mt-0.5">Periode: {{ slipRun.period }} | {{ statusLabelFull(slipRun.status) }}</div>
          <button class="absolute top-4 right-4 text-white/60 hover:text-white bg-white/10 w-8 h-8 rounded-full font-bold" @click="slipRun = null">✕</button>
        </div>

        <!-- Employee Info -->
        <div class="px-6 py-4 border-b bg-slate-50 flex items-center gap-4">
          <div class="w-12 h-12 rounded-full flex items-center justify-center font-black text-lg text-white"
            :style="{ backgroundColor: avatarColor(slipRun.employee?.firstName ?? 'A') }">
            {{ initials(slipRun.employee?.firstName, slipRun.employee?.lastName) }}
          </div>
          <div>
            <div class="font-black text-slate-800 text-base">{{ slipRun.employee?.firstName }} {{ slipRun.employee?.lastName ?? '' }}</div>
            <div class="text-xs text-slate-500 font-medium">{{ slipRun.employee?.position }} · {{ slipRun.employee?.department }}</div>
          </div>
          <div v-if="slipRun.payDate" class="ml-auto text-right">
            <div class="text-[9px] text-slate-400 font-bold">TANGGAL BAYAR</div>
            <div class="text-xs font-black text-green-700">{{ formatDate(slipRun.payDate) }}</div>
          </div>
        </div>

        <!-- Slip Detail -->
        <div class="px-6 py-4 space-y-3">
          <!-- Pendapatan -->
          <div>
            <div class="text-[10px] font-black text-green-700 uppercase tracking-widest mb-2">📥 Pendapatan</div>
            <div class="space-y-1.5">
              <div class="flex justify-between text-sm">
                <span class="text-slate-600">Gaji Pokok</span>
                <span class="font-black font-mono">{{ fmtRpFull(slipRun.basicSalary) }}</span>
              </div>
              <div v-if="Number(slipRun.allowances) > 0" class="flex justify-between text-sm">
                <span class="text-slate-600">Tunjangan (Transport + Makan + Jabatan)</span>
                <span class="font-bold font-mono text-slate-600">+{{ fmtRpFull(slipRun.allowances) }}</span>
              </div>
              <div class="flex justify-between text-sm font-black border-t pt-1.5 mt-1.5">
                <span>Gaji Kotor (Gross)</span>
                <span class="font-black font-mono text-slate-900">{{ fmtRpFull(slipRun.grossPay) }}</span>
              </div>
            </div>
          </div>

          <!-- Potongan -->
          <div>
            <div class="text-[10px] font-black text-rose-700 uppercase tracking-widest mb-2">📤 Potongan</div>
            <div class="space-y-1.5">
              <div class="flex justify-between text-sm">
                <span class="text-slate-600">BPJS Kesehatan (1% karyawan)</span>
                <span class="font-bold font-mono text-rose-600">-{{ fmtRpFull(Number(slipRun.basicSalary) * 0.01) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-slate-600">BPJS TK — JHT (2%)</span>
                <span class="font-bold font-mono text-rose-600">-{{ fmtRpFull(Number(slipRun.basicSalary) * 0.02) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-slate-600">BPJS TK — JP (1%)</span>
                <span class="font-bold font-mono text-rose-600">-{{ fmtRpFull(Number(slipRun.basicSalary) * 0.01) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-slate-600">PPh 21 TER (PP 58/2023)</span>
                <span class="font-bold font-mono text-rose-600">-{{ fmtRpFull(slipRun.taxAmount) }}</span>
              </div>
              <div class="flex justify-between text-sm font-black border-t pt-1.5 mt-1.5 text-rose-700">
                <span>Total Potongan</span>
                <span class="font-black font-mono">-{{ fmtRpFull(Number(slipRun.deductions) + Number(slipRun.taxAmount)) }}</span>
              </div>
            </div>
          </div>

          <!-- Net -->
          <div class="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between mt-2">
            <div>
              <div class="text-[10px] font-black text-green-600 uppercase tracking-widest">Take-Home Pay (Net)</div>
              <div class="text-xs text-green-700 font-medium mt-0.5">Setelah semua potongan wajib</div>
            </div>
            <div class="text-2xl font-black font-mono text-green-800">{{ fmtRpFull(slipRun.netPay) }}</div>
          </div>
        </div>

        <!-- Actions -->
        <div class="px-6 py-4 border-t bg-slate-50 flex gap-3 justify-end">
          <Button v-if="slipRun.status === 'DRAFT'" label="✅ Setujui & Proses" class="bg-green-700 text-white border-none font-bold" :loading="approving" @click="approve(slipRun)" />
          <Button label="🖨 Cetak Slip" outlined class="font-bold border-slate-300 text-slate-700 hover:bg-slate-100" @click="printSlip" />
          <Button label="Tutup" severity="secondary" class="border text-slate-700 bg-white font-bold" @click="slipRun = null" />
        </div>
      </div>
    </div>

    <!-- Bulk Generate Modal -->
    <div v-if="bulkDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div class="w-full max-w-md rounded-2xl border bg-white shadow-2xl flex flex-col animate-fade-in-up">
        <div class="p-5 border-b bg-slate-50 flex justify-between rounded-t-2xl">
          <div class="text-lg font-black text-slate-800 flex items-center gap-2">
            <i class="pi pi-cog text-green-700"></i> Generate Payroll Massal
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-100 w-8 h-8 rounded-full font-bold" @click="bulkDialog = false">✕</button>
        </div>
        <div class="p-4 space-y-4">
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Periode Payroll <span class="text-red-500">*</span></label>
            <input type="month" v-model="bulkPeriod" class="w-full border rounded-lg px-3 py-2 text-sm font-black text-green-700 outline-none focus:border-green-500" />
          </div>
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Filter Departemen</label>
            <select v-model="bulkDept" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-green-500">
              <option value="">Semua Departemen</option>
              <option v-for="d in deptList" :key="d">{{ d }}</option>
            </select>
          </div>
          <div class="bg-green-50 border border-green-100 rounded-xl p-3 text-xs text-green-700 font-medium flex items-start gap-2">
            <i class="pi pi-info-circle mt-0.5"></i>
            Sistem akan generate slip gaji DRAFT untuk semua karyawan aktif.
            Komponen dihitung otomatis: Gaji Pokok + Tunjangan Transport/Makan/Jabatan − BPJS − PPh 21 TER.
          </div>
          <div v-if="bulkError" class="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 border border-red-200">{{ bulkError }}</div>
        </div>
        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
          <Button label="Batal" severity="secondary" :disabled="bulkLoading" @click="bulkDialog = false" class="bg-white border text-slate-700 font-bold px-5" />
          <Button label="Generate Payroll" :loading="bulkLoading" :disabled="!bulkPeriod" @click="generateBulk" class="bg-green-700 border-none text-white font-bold px-6" icon="pi pi-cog" />
        </div>
      </div>
    </div>

    <!-- Manual Input Dialog -->
    <div v-if="formDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div class="w-full max-w-lg rounded-2xl border bg-white shadow-2xl flex flex-col animate-fade-in-up">
        <div class="p-5 border-b bg-slate-50 flex justify-between rounded-t-2xl">
          <div class="text-lg font-black text-slate-800 flex items-center gap-2">
            <i class="pi pi-pencil text-green-700"></i> Input Payroll Manual
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-100 w-8 h-8 rounded-full font-bold" @click="formDialog = false">✕</button>
        </div>
        <div class="p-4 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Karyawan <span class="text-red-500">*</span></label>
              <select v-model="form.employeeId" @change="prefillSalary" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-green-500">
                <option value="">— Pilih karyawan —</option>
                <option v-for="e in employees" :key="e.id" :value="e.id">{{ e.employeeNo }} — {{ e.firstName }} {{ e.lastName ?? '' }}</option>
              </select>
            </div>
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Periode <span class="text-red-500">*</span></label>
              <input type="month" v-model="form.period" class="w-full border rounded-lg px-3 py-2 text-sm font-black text-green-700 outline-none focus:border-green-500" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Gaji Pokok (Rp) <span class="text-red-500">*</span></label>
              <input type="number" v-model.number="form.basicSalary" @input="recalc" class="w-full border rounded-lg px-3 py-2 text-sm font-black font-mono text-slate-800 outline-none focus:border-green-500" placeholder="8500000" />
            </div>
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tunjangan (Rp)</label>
              <input type="number" v-model.number="form.allowances" @input="recalc" class="w-full border rounded-lg px-3 py-2 text-sm font-bold font-mono text-slate-700 outline-none focus:border-green-500" placeholder="2400000" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Potongan BPJS (Rp)</label>
              <input type="number" v-model.number="form.deductions" @input="recalc" class="w-full border rounded-lg px-3 py-2 text-sm font-bold font-mono text-rose-600 outline-none focus:border-green-500" />
            </div>
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">PPh 21 (Rp)</label>
              <input type="number" v-model.number="form.taxAmount" @input="recalc" class="w-full border rounded-lg px-3 py-2 text-sm font-bold font-mono text-rose-600 outline-none focus:border-green-500" />
            </div>
          </div>
          <!-- Net preview -->
          <div class="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center justify-between">
            <span class="text-[11px] font-black text-green-700 uppercase tracking-widest">Take-Home Pay (Kalkulasi):</span>
            <span class="font-black font-mono text-lg text-green-800">{{ fmtRpFull(previewNet) }}</span>
          </div>
          <div v-if="formError" class="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 border border-red-200">{{ formError }}</div>
        </div>
        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
          <Button label="Batal" severity="secondary" :disabled="saving" @click="formDialog = false" class="bg-white border text-slate-700 font-bold px-5" />
          <Button label="Simpan Payroll" :loading="saving" :disabled="!form.employeeId || !form.period || !form.basicSalary"
            @click="submit" class="bg-green-700 border-none text-white font-bold px-6" icon="pi pi-check" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Employee = { id: string; employeeNo: string; firstName: string; lastName?: string; department?: string; position?: string; salary?: number; };
type PayrollRun = {
  id: string; period: string; basicSalary: string|number; allowances: string|number;
  deductions: string|number; grossPay: string|number; netPay: string|number;
  taxAmount: string|number; status: string; payDate?: string;
  employee?: Employee;
};

const api = useApi();
const runs = ref<PayrollRun[]>([]);
const employees = ref<Employee[]>([]);
const loading = ref(false);
const saving = ref(false);
const approving = ref(false);
const bulkLoading = ref(false);

const filterPeriod = ref(new Date().toISOString().slice(0, 7));
const filterStatus = ref('');
const filterDept = ref('');
const search = ref('');
const formDialog = ref(false);
const bulkDialog = ref(false);
const slipRun = ref<PayrollRun | null>(null);
const formError = ref('');
const bulkError = ref('');
const bulkPeriod = ref(new Date().toISOString().slice(0, 7));
const bulkDept = ref('');

const form = reactive({ employeeId: '', period: new Date().toISOString().slice(0, 7), basicSalary: 0, allowances: 0, deductions: 0, taxAmount: 0 });

const previewNet = computed(() => Math.max(0, (form.basicSalary + form.allowances) - form.deductions - form.taxAmount));

const AVATAR_COLORS = ['#6366f1','#8b5cf6','#06b6d4','#10b981','#f59e0b','#ef4444','#ec4899','#14b8a6','#3b82f6','#f97316'];
const avatarColor = (n: string) => AVATAR_COLORS[(n?.charCodeAt(0) ?? 0) % AVATAR_COLORS.length];
const initials = (f?: string, l?: string) => `${f?.[0] ?? ''}${l?.[0] ?? ''}`.toUpperCase();

const STATUS_BADGE: Record<string, string> = {
  DRAFT: 'bg-amber-50 text-amber-700 border-amber-300',
  PROCESSED: 'bg-blue-50 text-blue-700 border-blue-300',
  APPROVED: 'bg-emerald-50 text-emerald-700 border-emerald-300',
};
const statusBadge = (s: string) => STATUS_BADGE[s] ?? 'bg-slate-100 text-slate-500 border-slate-200';
const statusLabelFull = (s: string) => ({ DRAFT: '⏳ Draft', PROCESSED: '📋 Diproses', APPROVED: '✅ Disetujui' }[s] ?? s);

const deptList = computed(() => [...new Set(runs.value.map(r => r.employee?.department).filter(Boolean))]);
const statusCount = (s: string) => runs.value.filter(r => r.status === s).length;

const totalGross = computed(() => runs.value.reduce((s, r) => s + Number(r.grossPay), 0));
const totalNet = computed(() => runs.value.reduce((s, r) => s + Number(r.netPay), 0));
const totalTax = computed(() => runs.value.reduce((s, r) => s + Number(r.taxAmount), 0));
const totalDeductions = computed(() => runs.value.reduce((s, r) => s + Number(r.deductions), 0));

const filteredRuns = computed(() => {
  let list = runs.value;
  if (filterStatus.value) list = list.filter(r => r.status === filterStatus.value);
  if (filterDept.value) list = list.filter(r => r.employee?.department === filterDept.value);
  if (search.value.trim()) {
    const q = search.value.toLowerCase();
    list = list.filter(r =>
      (r.employee?.firstName?.toLowerCase().includes(q)) ||
      (r.employee?.lastName?.toLowerCase().includes(q))
    );
  }
  return list;
});

const MONTHS = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
const formatDate = (iso: string) => { const d = new Date(iso); return `${String(d.getDate()).padStart(2,'0')} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`; };
const formatRupiah = (n: number) => {
  if (n >= 1_000_000_000) return `Rp${(n/1_000_000_000).toFixed(2)}M`;
  if (n >= 1_000_000) return `Rp${(n/1_000_000).toFixed(1)}jt`;
  return `Rp${n.toLocaleString('id-ID')}`;
};
const fmtRp = (n: number|string) => {
  const v = Number(n);
  if (v >= 1_000_000) return `Rp${(v/1_000_000).toFixed(1)}jt`;
  return `Rp${v.toLocaleString('id-ID')}`;
};
const fmtRpFull = (n: number|string) => `Rp ${Number(n).toLocaleString('id-ID')}`;

const load = async () => {
  loading.value = true;
  try {
    const [runRes, empRes] = await Promise.all([
      api.get('/hris/payroll', { params: { period: filterPeriod.value } }),
      api.get('/hris/employees'),
    ]);
    runs.value = runRes.data?.runs ?? runRes.runs ?? [];
    employees.value = (empRes.data?.employees ?? empRes.employees ?? []).filter((e: any) => e.status === 'ACTIVE' && e.salary);
  } catch (e) { console.warn(e); }
  finally { loading.value = false; }
};

const openSlip = (run: PayrollRun) => { slipRun.value = run; };
const openCreate = () => {
  form.employeeId = ''; form.period = filterPeriod.value;
  form.basicSalary = 0; form.allowances = 2_400_000; form.deductions = 0; form.taxAmount = 0;
  formError.value = '';
  formDialog.value = true;
};
const openBulk = () => { bulkPeriod.value = filterPeriod.value; bulkDept.value = ''; bulkError.value = ''; bulkDialog.value = true; };

const prefillSalary = () => {
  const emp = employees.value.find(e => e.id === form.employeeId);
  if (emp?.salary) {
    form.basicSalary = Number(emp.salary);
    form.allowances = 2_400_000;
    form.deductions = Math.round(form.basicSalary * 0.04); // BPJS 4%
    form.taxAmount = 0;
    recalc();
  }
};

const recalc = () => {
  // Auto calc PPh21 TER approximately
  const gross = form.basicSalary + form.allowances;
  form.taxAmount = Math.round(gross * 0.05); // simplified for UI
};

const submit = async () => {
  saving.value = true; formError.value = '';
  try {
    await api.post('/hris/payroll', {
      employeeId: form.employeeId, period: form.period,
      basicSalary: form.basicSalary, allowances: form.allowances,
      deductions: form.deductions, taxAmount: form.taxAmount,
    });
    formDialog.value = false;
    await load();
  } catch (e: any) { formError.value = e?.response?.data?.message ?? 'Gagal menyimpan'; }
  finally { saving.value = false; }
};

const approve = async (run: PayrollRun) => {
  approving.value = true;
  try {
    const payDate = new Date().toISOString();
    await api.post(`/hris/payroll/${run.id}/approve`, { payDate });
    slipRun.value = null;
    await load();
  } catch (e) { console.warn(e); }
  finally { approving.value = false; }
};

const generateBulk = async () => {
  bulkLoading.value = true; bulkError.value = '';
  try {
    let emps = employees.value;
    if (bulkDept.value) emps = emps.filter(e => e.department === bulkDept.value);
    let count = 0;
    for (const emp of emps) {
      try {
        const basic = Number(emp.salary) || 0;
        const allow = 2_400_000 + (basic >= 20_000_000 ? 500_000 : 0);
        const deduct = Math.round(basic * 0.04);
        const tax = Math.round((basic + allow) * 0.05);
        await api.post('/hris/payroll', { employeeId: emp.id, period: bulkPeriod.value, basicSalary: basic, allowances: allow, deductions: deduct, taxAmount: tax });
        count++;
      } catch (e) { /* skip duplicates */ }
    }
    bulkDialog.value = false;
    filterPeriod.value = bulkPeriod.value;
    await load();
  } catch (e: any) { bulkError.value = e?.response?.data?.message ?? 'Gagal generate payroll'; }
  finally { bulkLoading.value = false; }
};

const printSlip = () => window.print();

watch(filterPeriod, load);
onMounted(load);
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@media print {
  .space-y-6 > *:not(.max-w-lg) { display: none !important; }
  .max-w-lg { box-shadow: none !important; position: static !important; }
}
</style>