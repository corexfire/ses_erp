<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-6 shadow-sm border-l-4 border-l-indigo-600 relative overflow-hidden">
      <div class="absolute right-[-15px] top-[-15px] opacity-5 pointer-events-none">
        <i class="pi pi-users text-[150px] text-indigo-900"></i>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:items-start gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="pi pi-users text-indigo-700"></i> Data Karyawan (Employee Master)
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
            Master data SDM perusahaan F&B — mulai dari Direksi, Produksi, QC, Gudang, Penjualan, Keuangan, IT, hingga R&D. Lengkap dengan struktur manajerial, gaji, dan status kepegawaian.
          </div>
        </div>
        <Button label="+ Tambah Karyawan" size="small" icon="pi pi-user-plus"
          class="bg-indigo-700 text-white border-none font-bold shadow-sm hover:bg-indigo-800 shrink-0"
          @click="openCreate" />
      </div>
    </div>

    <!-- KPI Stats -->
    <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
      <div class="bg-indigo-50 border border-indigo-200 rounded-xl p-4 shadow-sm col-span-2 md:col-span-1">
        <div class="text-3xl font-black text-indigo-700">{{ employees.length }}</div>
        <div class="text-xs font-bold text-indigo-600 mt-1 uppercase tracking-widest">Total Karyawan</div>
      </div>
      <div class="bg-white border rounded-xl p-4 shadow-sm">
        <div class="text-3xl font-black text-emerald-600">{{ activeCount }}</div>
        <div class="text-xs font-bold text-slate-500 mt-1 uppercase tracking-widest">Aktif</div>
      </div>
      <div class="bg-white border rounded-xl p-4 shadow-sm">
        <div class="text-3xl font-black text-rose-500">{{ resignedCount }}</div>
        <div class="text-xs font-bold text-slate-500 mt-1 uppercase tracking-widest">Keluar</div>
      </div>
      <div class="bg-white border rounded-xl p-4 shadow-sm">
        <div class="text-lg font-black text-slate-700">{{ formatRupiah(avgSalary) }}</div>
        <div class="text-xs font-bold text-slate-500 mt-1 uppercase tracking-widest">Gaji Rata-rata</div>
      </div>
      <div class="bg-white border rounded-xl p-4 shadow-sm">
        <div class="text-3xl font-black text-slate-600">{{ deptList.length }}</div>
        <div class="text-xs font-bold text-slate-500 mt-1 uppercase tracking-widest">Departemen</div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white border rounded-xl p-4 shadow-sm space-y-3">
      <div class="flex flex-wrap gap-3 items-center">
        <InputText v-model="search" placeholder="Cari nama / nomor / jabatan..." class="w-64 text-sm" />
        <select v-model="filterDept" class="border rounded-lg px-3 py-2 text-sm font-semibold h-10 outline-none focus:border-indigo-500">
          <option value="">Semua Departemen</option>
          <option v-for="d in deptList" :key="d">{{ d }}</option>
        </select>
        <select v-model="filterStatus" class="border rounded-lg px-3 py-2 text-sm font-semibold h-10 outline-none focus:border-indigo-500">
          <option value="">Semua Status</option>
          <option value="ACTIVE">Aktif</option>
          <option value="RESIGNED">Keluar</option>
          <option value="ON_LEAVE">Cuti Panjang</option>
        </select>
        <div class="flex items-center gap-2 ml-auto">
          <button @click="viewMode='table'" :class="viewMode==='table'?'bg-indigo-700 text-white':'bg-slate-100 text-slate-600'" class="rounded-lg px-3 py-2 text-[11px] font-black transition">
            <i class="pi pi-list"></i> Tabel
          </button>
          <button @click="viewMode='card'" :class="viewMode==='card'?'bg-indigo-700 text-white':'bg-slate-100 text-slate-600'" class="rounded-lg px-3 py-2 text-[11px] font-black transition">
            <i class="pi pi-th-large"></i> Kartu
          </button>
          <Button severity="secondary" size="small" :disabled="loading" icon="pi pi-refresh" @click="load" outlined class="h-10 w-10" />
        </div>
      </div>
      <div class="text-xs text-slate-500 font-medium">Menampilkan {{ filteredEmployees.length }} dari {{ employees.length }} karyawan</div>
    </div>

    <!-- Table View -->
    <div v-if="viewMode === 'table' && !loading" class="rounded-xl border bg-white shadow-sm overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-indigo-900 text-left text-[11px] text-white uppercase tracking-widest font-bold">
          <tr>
            <th class="px-5 py-3 w-28">NIK</th>
            <th class="px-4 py-3">Nama Karyawan</th>
            <th class="px-4 py-3 border-l">Departemen</th>
            <th class="px-4 py-3 border-l">Jabatan / Posisi</th>
            <th class="px-4 py-3 border-l text-center w-24">Manager</th>
            <th class="px-4 py-3 border-l text-right w-32">Gaji Pokok</th>
            <th class="px-4 py-3 border-l text-center w-28">Tgl Masuk</th>
            <th class="px-4 py-3 border-l text-center w-24">Status</th>
            <th class="px-4 py-3 border-l text-center w-20">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="emp in filteredEmployees" :key="emp.id"
            class="border-t transition hover:bg-indigo-50/20 cursor-pointer"
            :class="emp.status !== 'ACTIVE' ? 'opacity-50 bg-slate-50/40' : ''"
            @click="openDetail(emp)">
            <td class="px-5 py-3 align-middle">
              <span class="font-mono font-black text-indigo-700 text-xs bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">{{ emp.employeeNo }}</span>
            </td>
            <td class="px-4 py-3 align-middle">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-full flex items-center justify-center font-black text-xs text-white shrink-0"
                  :style="{ backgroundColor: avatarColor(emp.firstName) }">
                  {{ initials(emp.firstName, emp.lastName) }}
                </div>
                <div>
                  <div class="font-black text-slate-800 text-sm">{{ emp.firstName }} {{ emp.lastName ?? '' }}</div>
                  <div class="text-[10px] text-slate-400 font-medium">{{ emp.email }}</div>
                </div>
              </div>
            </td>
            <td class="px-4 py-3 border-l align-middle">
              <span class="text-[10px] font-black px-2 py-0.5 rounded-full border" :class="deptColor(emp.department)">
                {{ emp.department ?? '—' }}
              </span>
            </td>
            <td class="px-4 py-3 border-l align-middle text-sm font-medium text-slate-700">{{ emp.position ?? '—' }}</td>
            <td class="px-4 py-3 border-l text-center align-middle text-xs text-slate-500">
              <span v-if="emp.manager" class="font-semibold text-slate-700">{{ emp.manager.firstName }}</span>
              <span v-else class="italic text-slate-400">—</span>
            </td>
            <td class="px-4 py-3 border-l text-right align-middle">
              <span class="font-black font-mono text-sm text-slate-700">{{ emp.salary ? formatRupiah(Number(emp.salary)) : '—' }}</span>
            </td>
            <td class="px-4 py-3 border-l text-center align-middle text-xs text-slate-600">
              {{ formatDate(emp.hireDate) }}
            </td>
            <td class="px-4 py-3 border-l text-center align-middle">
              <span :class="statusBadge(emp.status)" class="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border">
                {{ emp.status }}
              </span>
            </td>
            <td class="px-4 py-3 border-l text-center align-middle">
              <Button label="Edit" size="small" outlined
                class="text-[9px] h-7 px-2 font-bold text-indigo-600 border-indigo-200 hover:bg-indigo-700 hover:text-white"
                @click.stop="openEdit(emp)" />
            </td>
          </tr>
          <tr v-if="filteredEmployees.length === 0">
            <td colspan="9" class="py-16 text-center text-slate-400 italic">Tidak ada karyawan ditemukan.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Card View -->
    <div v-if="viewMode === 'card' && !loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div v-for="emp in filteredEmployees" :key="emp.id"
        class="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md cursor-pointer transition"
        :class="emp.status !== 'ACTIVE' ? 'opacity-60' : ''"
        @click="openDetail(emp)">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center font-black text-base text-white shrink-0"
            :style="{ backgroundColor: avatarColor(emp.firstName) }">
            {{ initials(emp.firstName, emp.lastName) }}
          </div>
          <div class="min-w-0">
            <div class="font-black text-slate-800 truncate">{{ emp.firstName }} {{ emp.lastName ?? '' }}</div>
            <div class="text-[10px] text-slate-400 font-mono mt-0.5">{{ emp.employeeNo }}</div>
          </div>
        </div>
        <div class="mt-3 pt-3 border-t space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-black px-2 py-0.5 rounded-full border" :class="deptColor(emp.department)">{{ emp.department }}</span>
            <span :class="statusBadge(emp.status)" class="px-2 py-0.5 rounded-full text-[9px] font-black uppercase border">{{ emp.status }}</span>
          </div>
          <div class="text-xs font-semibold text-slate-600 truncate">{{ emp.position }}</div>
          <div class="flex justify-between items-center pt-1">
            <div class="text-xs font-black text-indigo-700">{{ emp.salary ? formatRupiah(Number(emp.salary)) : '—' }}</div>
            <div class="text-[10px] text-slate-400">{{ emp.manager ? emp.manager.firstName : 'Direct Report' }}</div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="loading" class="py-16 text-center text-slate-400">
      <i class="pi pi-spinner pi-spin mr-2 text-indigo-600"></i> Memuat data karyawan...
    </div>

    <!-- Detail Drawer / Modal -->
    <div v-if="detailEmployee" class="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm" @click.self="detailEmployee = null">
      <div class="w-full max-w-lg h-full bg-white shadow-2xl flex flex-col overflow-y-auto animate-slide-in-right">
        <div class="p-5 border-b flex items-center justify-between" :style="{ borderLeftWidth: '4px', borderLeftColor: avatarColor(detailEmployee.firstName), background: 'linear-gradient(to right, #eef2ff, #fff)' }">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl text-white shrink-0"
              :style="{ backgroundColor: avatarColor(detailEmployee.firstName) }">
              {{ initials(detailEmployee.firstName, detailEmployee.lastName) }}
            </div>
            <div>
              <div class="font-black text-xl text-slate-800">{{ detailEmployee.firstName }} {{ detailEmployee.lastName ?? '' }}</div>
              <div class="text-sm text-slate-500 font-medium">{{ detailEmployee.position }}</div>
              <div class="text-[10px] font-mono text-slate-400 mt-0.5">{{ detailEmployee.employeeNo }}</div>
            </div>
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-100 w-8 h-8 rounded-full font-bold shrink-0" @click="detailEmployee = null">✕</button>
        </div>
        <div class="p-5 space-y-5 flex-1">
          <!-- Identitas -->
          <div class="space-y-3">
            <div class="text-[11px] font-black text-indigo-700 uppercase tracking-widest">📋 Data Pribadi & Pekerjaan</div>
            <div class="grid grid-cols-2 gap-3">
              <div class="bg-slate-50 rounded-lg p-3">
                <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Email</div>
                <div class="text-xs font-semibold text-slate-700 break-all">{{ detailEmployee.email }}</div>
              </div>
              <div class="bg-slate-50 rounded-lg p-3">
                <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Phone</div>
                <div class="text-xs font-semibold text-slate-700">{{ detailEmployee.phone ?? '—' }}</div>
              </div>
              <div class="bg-slate-50 rounded-lg p-3">
                <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Departemen</div>
                <div class="text-xs font-black text-indigo-700">{{ detailEmployee.department ?? '—' }}</div>
              </div>
              <div class="bg-slate-50 rounded-lg p-3">
                <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Status</div>
                <span :class="statusBadge(detailEmployee.status)" class="px-2 py-0.5 rounded-full text-[9px] font-black uppercase border">{{ detailEmployee.status }}</span>
              </div>
              <div class="bg-slate-50 rounded-lg p-3">
                <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Tgl Masuk</div>
                <div class="text-xs font-semibold text-slate-700">{{ formatDate(detailEmployee.hireDate) }}</div>
              </div>
              <div class="bg-indigo-50 rounded-lg p-3 border border-indigo-100">
                <div class="text-[9px] font-black text-indigo-500 uppercase tracking-widest mb-0.5">Gaji Pokok</div>
                <div class="text-sm font-black text-indigo-900">{{ detailEmployee.salary ? formatRupiahFull(Number(detailEmployee.salary)) : '—' }}</div>
              </div>
            </div>
          </div>
          <!-- Manager -->
          <div v-if="detailEmployee.manager" class="space-y-2">
            <div class="text-[11px] font-black text-indigo-700 uppercase tracking-widest">👤 Atasan Langsung</div>
            <div class="flex items-center gap-3 bg-slate-50 rounded-xl p-3 border">
              <div class="w-9 h-9 rounded-full flex items-center justify-center font-black text-xs text-white shrink-0"
                :style="{ backgroundColor: avatarColor(detailEmployee.manager.firstName) }">
                {{ initials(detailEmployee.manager.firstName, detailEmployee.manager.lastName) }}
              </div>
              <div>
                <div class="font-black text-sm text-slate-800">{{ detailEmployee.manager.firstName }} {{ detailEmployee.manager.lastName ?? '' }}</div>
                <div class="text-xs text-slate-500">{{ detailEmployee.manager.position }}</div>
              </div>
            </div>
          </div>
          <!-- Reports -->
          <div v-if="detailEmployee.reports?.length" class="space-y-2">
            <div class="text-[11px] font-black text-indigo-700 uppercase tracking-widest">👥 Bawahan Langsung ({{ detailEmployee.reports.length }})</div>
            <div v-for="r in detailEmployee.reports" :key="r.id" class="flex items-center gap-2 py-1.5 border-b border-slate-100 last:border-0">
              <div class="w-7 h-7 rounded-full flex items-center justify-center font-black text-[10px] text-white shrink-0"
                :style="{ backgroundColor: avatarColor(r.firstName) }">
                {{ initials(r.firstName, r.lastName) }}
              </div>
              <div>
                <div class="text-xs font-black text-slate-800">{{ r.firstName }} {{ r.lastName ?? '' }}</div>
                <div class="text-[10px] text-slate-400">{{ r.position }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="p-4 border-t bg-slate-50 flex gap-2">
          <Button label="Edit Data" icon="pi pi-pencil" size="small" class="bg-indigo-700 text-white border-none font-bold flex-1" @click="openEdit(detailEmployee)" />
          <Button v-if="detailEmployee.status === 'ACTIVE'" label="Nonaktifkan" size="small" outlined class="text-[10px] font-bold text-rose-600 border-rose-200 hover:bg-rose-600 hover:text-white" @click="deactivate(detailEmployee)" />
        </div>
      </div>
    </div>

    <!-- Create / Edit Dialog -->
    <div v-if="formDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div class="w-full max-w-2xl rounded-2xl border bg-white shadow-2xl flex flex-col max-h-[90vh] animate-fade-in-up">
        <div class="p-5 border-b bg-slate-50 flex justify-between items-center rounded-t-2xl">
          <div class="text-lg font-black text-slate-800 flex items-center gap-2">
            <i class="pi pi-user-plus text-indigo-700"></i>
            {{ editId ? 'Edit Data Karyawan' : 'Tambah Karyawan Baru' }}
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-100 w-8 h-8 rounded-full font-bold" @click="formDialog = false">✕</button>
        </div>

        <div class="p-6 overflow-y-auto space-y-5">
          <!-- Identitas -->
          <div>
            <div class="text-[11px] font-black text-indigo-700 uppercase tracking-widest mb-3">👤 Identitas Karyawan</div>
            <div class="grid grid-cols-3 gap-3">
              <div class="space-y-1.5">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">NIK <span class="text-red-500">*</span></label>
                <input v-model="form.employeeNo" :disabled="!!editId || saving" class="w-full border rounded-lg px-3 py-2 text-sm font-mono font-black text-indigo-700 outline-none focus:border-indigo-500 shadow-inner disabled:opacity-60" placeholder="EMP-102" />
              </div>
              <div class="space-y-1.5">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Nama Depan <span class="text-red-500">*</span></label>
                <input v-model="form.firstName" :disabled="saving" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-indigo-500 shadow-inner" placeholder="Ahmad" />
              </div>
              <div class="space-y-1.5">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Nama Belakang</label>
                <input v-model="form.lastName" :disabled="saving" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-indigo-500 shadow-inner" placeholder="Fauzi" />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3 mt-3">
              <div class="space-y-1.5">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Email <span class="text-red-500">*</span></label>
                <input type="email" v-model="form.email" :disabled="saving" class="w-full border rounded-lg px-3 py-2 text-sm font-medium text-slate-800 outline-none focus:border-indigo-500 shadow-inner" placeholder="nama@seserp.co.id" />
              </div>
              <div class="space-y-1.5">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">No. HP</label>
                <input v-model="form.phone" :disabled="saving" class="w-full border rounded-lg px-3 py-2 text-sm font-medium text-slate-800 outline-none focus:border-indigo-500 shadow-inner" placeholder="0812XXXXXXXX" />
              </div>
            </div>
          </div>

          <!-- Pekerjaan -->
          <div>
            <div class="text-[11px] font-black text-indigo-700 uppercase tracking-widest mb-3">💼 Data Pekerjaan</div>
            <div class="grid grid-cols-2 gap-3">
              <div class="space-y-1.5">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Departemen</label>
                <select v-model="form.department" :disabled="saving" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-indigo-500 shadow-inner">
                  <option value="">-- Pilih Departemen --</option>
                  <option v-for="d in DEPARTMENTS" :key="d">{{ d }}</option>
                </select>
              </div>
              <div class="space-y-1.5">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Jabatan / Posisi</label>
                <input v-model="form.position" :disabled="saving" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-indigo-500 shadow-inner" placeholder="Operator Mesin Senior" />
              </div>
              <div class="space-y-1.5">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Atasan Langsung</label>
                <select v-model="form.managerId" :disabled="saving" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-indigo-500 shadow-inner">
                  <option value="">-- Lapor langsung (tanpa atasan) --</option>
                  <option v-for="m in managerOptions" :key="m.id" :value="m.id">
                    {{ m.employeeNo }} — {{ m.firstName }} {{ m.lastName || '' }} ({{ m.position }})
                  </option>
                </select>
              </div>
              <div class="space-y-1.5">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Status Kepegawaian</label>
                <select v-model="form.status" :disabled="saving" class="w-full border rounded-lg px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-indigo-500 shadow-inner">
                  <option value="ACTIVE">Aktif</option>
                  <option value="PROBATION">Masa Percobaan</option>
                  <option value="ON_LEAVE">Cuti Panjang</option>
                  <option value="RESIGNED">Mengundurkan Diri</option>
                  <option value="TERMINATED">PHK</option>
                </select>
              </div>
              <div class="space-y-1.5">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tanggal Masuk</label>
                <input type="date" v-model="form.hireDate" :disabled="saving" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-indigo-500 shadow-inner" />
              </div>
              <div class="space-y-1.5">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Gaji Pokok (Rp)</label>
                <input type="number" v-model.number="form.salary" :disabled="saving" class="w-full border rounded-lg px-3 py-2 text-sm font-black font-mono text-indigo-700 outline-none focus:border-indigo-500 shadow-inner" placeholder="8500000" />
              </div>
            </div>
          </div>

          <div v-if="formError" class="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 border border-red-200">{{ formError }}</div>
        </div>

        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
          <Button label="Batal" severity="secondary" :disabled="saving" @click="formDialog = false" class="bg-white border text-slate-700 font-bold px-5" />
          <Button :label="editId ? 'Simpan Perubahan' : 'Daftarkan Karyawan'"
            :loading="saving" :disabled="!form.employeeNo || !form.firstName || !form.email"
            @click="submit" class="bg-indigo-700 border-none text-white font-bold px-6" icon="pi pi-check" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Manager = { id: string; firstName: string; lastName?: string; position?: string; employeeNo: string; };
type Employee = {
  id: string; employeeNo: string; firstName: string; lastName?: string;
  email: string; phone?: string; department?: string; position?: string;
  hireDate?: string; status: string; salary?: string | number;
  managerId?: string; manager?: Manager; reports?: Employee[];
};

const api = useApi();
const employees = ref<Employee[]>([]);
const loading = ref(false);
const saving = ref(false);
const search = ref('');
const filterDept = ref('');
const filterStatus = ref('');
const viewMode = ref<'table' | 'card'>('table');
const formDialog = ref(false);
const detailEmployee = ref<Employee | null>(null);
const editId = ref('');
const formError = ref('');

const form = reactive({
  employeeNo: '', firstName: '', lastName: '', email: '', phone: '',
  department: '', position: '', managerId: '', status: 'ACTIVE',
  hireDate: '', salary: '' as string | number,
});

const DEPARTMENTS = ['Direksi', 'Produksi', 'Kualitas & QC', 'Gudang & Logistik', 'Penjualan', 'Pemasaran', 'Keuangan & Akuntansi', 'HR & GA', 'IT & ERP', 'R&D & Inovasi', 'Pengadaan'];

const DEPT_COLORS: Record<string, string> = {
  'Direksi': 'bg-slate-900 text-white border-slate-800',
  'Produksi': 'bg-blue-50 text-blue-800 border-blue-300',
  'Kualitas & QC': 'bg-emerald-50 text-emerald-800 border-emerald-300',
  'Gudang & Logistik': 'bg-amber-50 text-amber-800 border-amber-300',
  'Penjualan': 'bg-rose-50 text-rose-800 border-rose-300',
  'Pemasaran': 'bg-pink-50 text-pink-800 border-pink-300',
  'Keuangan & Akuntansi': 'bg-indigo-50 text-indigo-800 border-indigo-300',
  'HR & GA': 'bg-violet-50 text-violet-800 border-violet-300',
  'IT & ERP': 'bg-cyan-50 text-cyan-800 border-cyan-300',
  'R&D & Inovasi': 'bg-teal-50 text-teal-800 border-teal-300',
  'Pengadaan': 'bg-orange-50 text-orange-800 border-orange-300',
};
const deptColor = (d?: string) => DEPT_COLORS[d ?? ''] ?? 'bg-slate-100 text-slate-600 border-slate-200';

const STATUS_BADGE: Record<string, string> = {
  ACTIVE: 'bg-emerald-50 text-emerald-700 border-emerald-300',
  PROBATION: 'bg-amber-50 text-amber-700 border-amber-300',
  ON_LEAVE: 'bg-blue-50 text-blue-700 border-blue-300',
  RESIGNED: 'bg-slate-100 text-slate-500 border-slate-300',
  TERMINATED: 'bg-rose-50 text-rose-700 border-rose-300',
};
const statusBadge = (s: string) => STATUS_BADGE[s] ?? 'bg-slate-100 text-slate-500 border-slate-200';

const AVATAR_COLORS = ['#6366f1','#8b5cf6','#06b6d4','#10b981','#f59e0b','#ef4444','#ec4899','#14b8a6','#3b82f6','#f97316'];
const avatarColor = (name: string) => AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
const initials = (f: string, l?: string) => `${f[0] ?? ''}${l?.[0] ?? ''}`.toUpperCase();

const activeCount = computed(() => employees.value.filter(e => e.status === 'ACTIVE').length);
const resignedCount = computed(() => employees.value.filter(e => ['RESIGNED','TERMINATED'].includes(e.status)).length);
const avgSalary = computed(() => {
  const actives = employees.value.filter(e => e.salary && e.status === 'ACTIVE');
  if (!actives.length) return 0;
  return actives.reduce((s, e) => s + Number(e.salary), 0) / actives.length;
});
const deptList = computed(() => [...new Set(employees.value.map(e => e.department).filter(Boolean))]);
const managerOptions = computed(() => employees.value.filter(e => e.status === 'ACTIVE' && e.id !== editId.value));

const filteredEmployees = computed(() => {
  let list = employees.value;
  if (filterDept.value) list = list.filter(e => e.department === filterDept.value);
  if (filterStatus.value) list = list.filter(e => e.status === filterStatus.value);
  if (search.value.trim()) {
    const q = search.value.toLowerCase();
    list = list.filter(e =>
      e.firstName.toLowerCase().includes(q) ||
      (e.lastName ?? '').toLowerCase().includes(q) ||
      e.employeeNo.toLowerCase().includes(q) ||
      (e.position ?? '').toLowerCase().includes(q) ||
      (e.email ?? '').toLowerCase().includes(q)
    );
  }
  return list;
});

const MONTHS_ID = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
const formatDate = (iso?: string) => {
  if (!iso) return '—';
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2,'0')} ${MONTHS_ID[d.getMonth()]} ${d.getFullYear()}`;
};
const formatRupiah = (n: number) => {
  if (n >= 1_000_000) return `Rp${(n / 1_000_000).toFixed(1)} jt`;
  return `Rp${n.toLocaleString('id-ID')}`;
};
const formatRupiahFull = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

const load = async () => {
  loading.value = true;
  try {
    const res = await api.get('/hris/employee');
    employees.value = res.data?.employees ?? res.employees ?? [];
  } catch (e) { console.warn(e); }
  finally { loading.value = false; }
};

const openDetail = (emp: Employee) => { detailEmployee.value = emp; };

const openCreate = () => {
  editId.value = '';
  form.employeeNo = ''; form.firstName = ''; form.lastName = ''; form.email = '';
  form.phone = ''; form.department = ''; form.position = ''; form.managerId = '';
  form.status = 'ACTIVE'; form.hireDate = new Date().toISOString().slice(0, 10); form.salary = '';
  formError.value = '';
  formDialog.value = true;
};

const openEdit = (emp: Employee) => {
  editId.value = emp.id;
  form.employeeNo = emp.employeeNo; form.firstName = emp.firstName; form.lastName = emp.lastName ?? '';
  form.email = emp.email; form.phone = emp.phone ?? ''; form.department = emp.department ?? '';
  form.position = emp.position ?? ''; form.managerId = emp.managerId ?? '';
  form.status = emp.status; form.hireDate = emp.hireDate?.slice(0, 10) ?? '';
  form.salary = emp.salary ? Number(emp.salary) : '';
  formError.value = '';
  detailEmployee.value = null;
  formDialog.value = true;
};

const submit = async () => {
  saving.value = true; formError.value = '';
  try {
    const payload = {
      employeeNo: form.employeeNo, firstName: form.firstName, lastName: form.lastName || undefined,
      email: form.email, phone: form.phone || undefined,
      department: form.department || undefined, position: form.position || undefined,
      managerId: form.managerId || undefined, status: form.status,
      hireDate: form.hireDate ? new Date(form.hireDate).toISOString() : undefined,
      salary: form.salary ? Number(form.salary) : undefined,
    };
    if (editId.value) {
      await api.post(`/hris/employee/${editId.value}`, payload);
    } else {
      await api.post('/hris/employee', payload);
    }
    formDialog.value = false;
    await load();
  } catch (e: any) { formError.value = e?.response?.data?.message ?? 'Gagal menyimpan karyawan'; }
  finally { saving.value = false; }
};

const deactivate = async (emp: Employee) => {
  try {
    await api.post(`/hris/employee/${emp.id}`, { status: 'RESIGNED' });
    detailEmployee.value = null;
    await load();
  } catch (e) { console.warn(e); }
};

onMounted(load);
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
.animate-slide-in-right { animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes slideInRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
</style>